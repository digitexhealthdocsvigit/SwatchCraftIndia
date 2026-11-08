import {
  setMockKvHandler,
  isSharedStorageConfigured,
} from '../api/_lib/auth.ts';
import {
  getAllRFQsAsync,
  addRFQAsync,
  updateRFQStatusAsync,
  deleteRFQAsync,
  RFQ_INDEX_KEY,
  RFQ_LEGACY_KEY,
  RFQ_MIGRATION_LOCK,
  RFQ_MIGRATION_STATUS_KEY,
} from '../api/_lib/store.ts';

async function runFailureInjectionTests() {
  console.log('--- STARTING RFQ ATOMICITY & FAILURE-INJECTION TESTS ---\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, name, details = '') {
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} - ${details}`);
      failed++;
    }
  }

  const remoteKvStore = new Map();
  const remoteZSetStore = new Map();

  function mockKvPipeline(commands) {
    return Promise.resolve(
      commands.map(([cmd, ...args]) => {
        if (cmd === 'GET') {
          return remoteKvStore.get(args[0]) ?? null;
        }
        if (cmd === 'SET') {
          const [key, val, ...rest] = args;
          if (rest.includes('NX') && remoteKvStore.has(key)) {
            return null;
          }
          remoteKvStore.set(key, String(val));
          return 'OK';
        }
        if (cmd === 'DEL') {
          const existed = remoteKvStore.delete(args[0]);
          return existed ? 1 : 0;
        }
        if (cmd === 'ZADD') {
          const [key, score, member] = args;
          let list = remoteZSetStore.get(key) || [];
          list = list.filter((e) => e.member !== String(member));
          list.push({ member: String(member), score: Number(score) });
          list.sort((a, b) => b.score - a.score);
          remoteZSetStore.set(key, list);
          return 1;
        }
        if (cmd === 'ZREVRANGE') {
          const [key, start, stop] = args;
          const list = remoteZSetStore.get(key) || [];
          const startIdx = parseInt(start, 10);
          const stopIdx = parseInt(stop, 10);
          const sliced = stopIdx === -1 ? list.slice(startIdx) : list.slice(startIdx, stopIdx + 1);
          return sliced.map((e) => e.member);
        }
        if (cmd === 'ZREM') {
          const [key, member] = args;
          let list = remoteZSetStore.get(key) || [];
          const origLen = list.length;
          list = list.filter((e) => e.member !== String(member));
          remoteZSetStore.set(key, list);
          return origLen !== list.length ? 1 : 0;
        }
        if (cmd === 'EVAL') {
          const script = args[0];
          // Lua unlock script
          if (script.includes("redis.call('get', KEYS[1]) == ARGV[1]")) {
            const lockKey = args[2];
            const token = args[3];
            if (remoteKvStore.get(lockKey) === token) {
              remoteKvStore.delete(lockKey);
              return 1;
            }
            return 0;
          }
          // Lua add RFQ script
          if (script.includes('ZADD')) {
            const rfqKey = args[2];
            const indexKey = args[3];
            const val = args[4];
            const score = Number(args[5]);
            const member = String(args[6]);
            remoteKvStore.set(rfqKey, String(val));
            let list = remoteZSetStore.get(indexKey) || [];
            list = list.filter((e) => e.member !== member);
            list.push({ member, score });
            list.sort((a, b) => b.score - a.score);
            remoteZSetStore.set(indexKey, list);
            return 1;
          }
          // Lua delete RFQ script
          if (script.includes('ZREM')) {
            const rfqKey = args[2];
            const indexKey = args[3];
            const member = String(args[4]);
            remoteKvStore.delete(rfqKey);
            let list = remoteZSetStore.get(indexKey) || [];
            list = list.filter((e) => e.member !== member);
            remoteZSetStore.set(indexKey, list);
            return 1;
          }
          return 1;
        }
        return null;
      })
    );
  }

  process.env.UPSTASH_REDIS_REST_URL = 'https://mock-samplinghub-upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'mock-upstash-token-2026';
  setMockKvHandler(mockKvPipeline);

  // -------------------------------------------------------------------------
  // Test 1: Self-Healing Orphaned Index Entry
  // -------------------------------------------------------------------------
  const orphanId = 'RFQ-2026-GHOST-ORPHAN';
  let initialIndex = remoteZSetStore.get(RFQ_INDEX_KEY) || [];
  initialIndex.push({ member: orphanId, score: Date.now() });
  remoteZSetStore.set(RFQ_INDEX_KEY, initialIndex);
  remoteKvStore.set(RFQ_MIGRATION_STATUS_KEY, 'done');
  assert(remoteKvStore.has(`samplinghub:rfq:${orphanId}`) === false, 'Orphan entity key is missing');

  const rfqsAfterOrphan = await getAllRFQsAsync();
  assert(!rfqsAfterOrphan.some((r) => r.id === orphanId), 'Orphaned ID excluded from returned RFQ list');
  await new Promise((r) => setTimeout(r, 20));
  const cleanIndex = remoteZSetStore.get(RFQ_INDEX_KEY) || [];
  assert(!cleanIndex.some((e) => e.member === orphanId), 'Self-healing: Orphaned index entry automatically pruned from ZSET');

  // -------------------------------------------------------------------------
  // Test 2: Atomic Lua Success
  // -------------------------------------------------------------------------
  const successSubmission = await addRFQAsync({
    fullName: 'Verified Buyer',
    companyName: 'Atomic Textiles Ltd',
    email: 'atomic@buyer.com',
    productType: 'Hardbound Book',
    quantity: '150 Units',
  });
  assert(Boolean(successSubmission.id), 'Atomic Lua RFQ creation succeeded with ID');
  assert(remoteKvStore.has(`samplinghub:rfq:${successSubmission.id}`), 'Atomic write created entity key in Redis');
  const indexList = remoteZSetStore.get(RFQ_INDEX_KEY) || [];
  assert(indexList.some((e) => e.member === successSubmission.id), 'Atomic write added ID to sorted set index');

  // -------------------------------------------------------------------------
  // Test 3: Atomic Fail-Closed on Lua Failure (No Silent Non-Atomic Fallback)
  // -------------------------------------------------------------------------
  setMockKvHandler((commands) => {
    return Promise.resolve(
      commands.map(([cmd]) => {
        if (cmd === 'EVAL') return null; // EVAL rejected or failed
        return null;
      })
    );
  });

  let threwOnEvalFailure = false;
  try {
    await addRFQAsync({
      fullName: 'Fail Closed Buyer',
      companyName: 'Failsafe Corp',
      email: 'failsafe@corp.com',
      productType: 'Sample Card',
      quantity: '500 Units',
    });
  } catch {
    threwOnEvalFailure = true;
  }
  assert(threwOnEvalFailure, 'CRIT: addRFQAsync fails closed when Lua transaction fails (no silent non-atomic fallback)');

  // -------------------------------------------------------------------------
  // Test 4: Redis Timeout Handling
  // -------------------------------------------------------------------------
  setMockKvHandler(() => Promise.resolve(null)); // Network timeout returns null
  let threwOnTimeout = false;
  try {
    await addRFQAsync({
      fullName: 'Timeout Buyer',
      companyName: 'Timeout Corp',
      email: 'timeout@corp.com',
      productType: 'Sample Card',
      quantity: '500 Units',
    });
  } catch {
    threwOnTimeout = true;
  }
  assert(threwOnTimeout, 'CRIT: addRFQAsync fails closed with exception on Redis timeout');

  // -------------------------------------------------------------------------
  // Test 5: Unsupported Command Response Handling
  // -------------------------------------------------------------------------
  setMockKvHandler((commands) => {
    return Promise.resolve(commands.map(() => 'ERR unknown command'));
  });
  let threwOnUnsupported = false;
  try {
    await addRFQAsync({
      fullName: 'Unsupported Command Buyer',
      companyName: 'Unsupported Corp',
      email: 'unsupported@corp.com',
      productType: 'Waterfall Hanger',
      quantity: '200 Units',
    });
  } catch {
    threwOnUnsupported = true;
  }
  assert(threwOnUnsupported, 'CRIT: addRFQAsync fails closed on unsupported Redis command response');

  // Restore normal mock
  setMockKvHandler(mockKvPipeline);

  // -------------------------------------------------------------------------
  // Test 6: Idempotent Submission / Retry after Ambiguous Timeout
  // -------------------------------------------------------------------------
  const submissionToRetry = await addRFQAsync({
    fullName: 'Retry Test Buyer',
    companyName: 'Retry Fabric Ltd',
    email: 'retry@buyer.com',
    productType: 'Swatch Book',
    quantity: '100 Units',
  });
  assert(Boolean(submissionToRetry.id), 'Initial submission succeeded with ID');

  // Retry with same ID
  const retriedSubmission = await addRFQAsync({
    ...submissionToRetry,
    id: submissionToRetry.id,
  });
  assert(retriedSubmission.id === submissionToRetry.id, 'Retry preserves identical RFQ ID');

  const afterRetry = await getAllRFQsAsync();
  const matchingRecords = afterRetry.filter((r) => r.id === submissionToRetry.id);
  assert(matchingRecords.length === 1, 'Idempotent retry: Retrying identical submission does not duplicate RFQ in index or list');

  // -------------------------------------------------------------------------
  // Test 7: Distributed Migration Lock with Unique Token and Completion Marker
  // -------------------------------------------------------------------------
  remoteKvStore.clear();
  remoteZSetStore.clear();

  const legacyBatch = [
    {
      id: 'RFQ-LEGACY-A',
      fullName: 'Legacy User A',
      companyName: 'Company A',
      email: 'a@company.com',
      productType: 'Hanger',
      quantity: '50 Units',
      submittedAt: new Date().toISOString(),
      status: 'New',
    },
    {
      id: 'RFQ-LEGACY-B',
      fullName: 'Legacy User B',
      companyName: 'Company B',
      email: 'b@company.com',
      productType: 'Book',
      quantity: '100 Units',
      submittedAt: new Date().toISOString(),
      status: 'Qualified',
    },
  ];
  remoteKvStore.set(RFQ_LEGACY_KEY, JSON.stringify(legacyBatch));

  // Simulate two instances triggering getAllRFQsAsync simultaneously
  const [migrationRes1, migrationRes2] = await Promise.all([
    getAllRFQsAsync(),
    getAllRFQsAsync(),
  ]);

  assert(migrationRes1.length >= 2, 'Instance 1 successfully migrated records');
  assert(migrationRes2.length >= 2, 'Instance 2 successfully received migrated records');
  assert(remoteKvStore.has('samplinghub:rfq:RFQ-LEGACY-A'), 'Record A migrated to individual key');
  assert(remoteKvStore.has('samplinghub:rfq:RFQ-LEGACY-B'), 'Record B migrated to individual key');
  assert(remoteKvStore.get(RFQ_MIGRATION_STATUS_KEY) === 'done', 'CRIT: Migration status marker set to done');
  assert(remoteKvStore.has(RFQ_LEGACY_KEY), 'Legacy data preserved intact (never deleted)');
  assert(!remoteKvStore.has(RFQ_MIGRATION_LOCK), 'Distributed migration lock released cleanly');

  // -------------------------------------------------------------------------
  // Test 8: Safe Unlock - Expired Lock Cannot Be Removed by Former Owner
  // -------------------------------------------------------------------------
  remoteKvStore.set(RFQ_MIGRATION_LOCK, 'TOKEN_B');
  const unlockResult = await mockKvPipeline([
    ['EVAL', "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end", 1, RFQ_MIGRATION_LOCK, 'TOKEN_A'],
  ]);
  assert(unlockResult[0] === 0, 'CRIT: Expired lock token rejected by unlock script');
  assert(remoteKvStore.get(RFQ_MIGRATION_LOCK) === 'TOKEN_B', 'CRIT: Another process lock was NOT deleted by stale unlock');

  // -------------------------------------------------------------------------
  // Test 9: Interrupted Migration Recovery (Resumes and Completes)
  // -------------------------------------------------------------------------
  // Simulate migration crash midway: Record A was written, but B was not, and migration status is NOT done
  remoteKvStore.clear();
  remoteZSetStore.clear();
  remoteKvStore.set(RFQ_LEGACY_KEY, JSON.stringify(legacyBatch));
  // Record A written into index partially
  let partialZSet = [{ member: 'RFQ-LEGACY-A', score: Date.now() }];
  remoteZSetStore.set(RFQ_INDEX_KEY, partialZSet);
  remoteKvStore.set('samplinghub:rfq:RFQ-LEGACY-A', JSON.stringify(legacyBatch[0]));
  // Notice: RFQ_MIGRATION_STATUS_KEY is NOT set, simulating crash before completion!

  const resumedMigration = await getAllRFQsAsync();
  assert(resumedMigration.length === 2, 'Interrupted migration safely resumed and completed both records');
  assert(remoteKvStore.has('samplinghub:rfq:RFQ-LEGACY-B'), 'Previously unmigrated Record B successfully written');
  assert(remoteKvStore.get(RFQ_MIGRATION_STATUS_KEY) === 'done', 'Migration status marked done after recovery');

  // -------------------------------------------------------------------------
  // Test 10: Deduplication of Duplicate Legacy IDs
  // -------------------------------------------------------------------------
  remoteKvStore.clear();
  remoteZSetStore.clear();
  const duplicateLegacy = [
    { id: 'RFQ-DUP-01', fullName: 'First Copy', companyName: 'Corp', email: 'dup@corp.com', productType: 'Book', quantity: '10', submittedAt: new Date().toISOString(), status: 'New' },
    { id: 'RFQ-DUP-01', fullName: 'Updated Copy', companyName: 'Corp', email: 'dup@corp.com', productType: 'Book', quantity: '20', submittedAt: new Date().toISOString(), status: 'Qualified' },
  ];
  remoteKvStore.set(RFQ_LEGACY_KEY, JSON.stringify(duplicateLegacy));

  const deduplicated = await getAllRFQsAsync();
  const dupEntries = deduplicated.filter((r) => r.id === 'RFQ-DUP-01');
  assert(dupEntries.length === 1, 'Legacy duplicate IDs gracefully deduplicated into single key without error');
  assert(dupEntries[0].quantity === '20', 'Latest version retained during deduplication');

  // -------------------------------------------------------------------------
  // Test 11: Migration Polling Coordination (>150ms Delay)
  // -------------------------------------------------------------------------
  remoteKvStore.clear();
  remoteZSetStore.clear();
  remoteKvStore.set(RFQ_LEGACY_KEY, JSON.stringify(legacyBatch));
  // Instance 1 holds the lock
  remoteKvStore.set(RFQ_MIGRATION_LOCK, 'MIGRATING_INSTANCE_TOKEN');

  // Simulate Instance 1 finishing migration asynchronously after 180ms
  setTimeout(() => {
    legacyBatch.forEach((r) => {
      remoteKvStore.set(`samplinghub:rfq:${r.id}`, JSON.stringify(r));
    });
    let list = legacyBatch.map((r, i) => ({ member: r.id, score: Date.now() + i }));
    remoteZSetStore.set(RFQ_INDEX_KEY, list);
    remoteKvStore.set(RFQ_MIGRATION_STATUS_KEY, 'done');
    remoteKvStore.delete(RFQ_MIGRATION_LOCK);
  }, 180);

  // Instance 2 encounters the lock, polls with backoff (>150ms), and receives full migrated records
  const coordinatedRead = await getAllRFQsAsync();
  assert(coordinatedRead.length === 2, 'Polling instance waited >150ms and received full migrated records');
  assert(coordinatedRead.some((r) => r.id === 'RFQ-LEGACY-A'), 'Polled read contains Record A');
  assert(coordinatedRead.some((r) => r.id === 'RFQ-LEGACY-B'), 'Polled read contains Record B');

  // -------------------------------------------------------------------------
  // Test 12: Concurrent Submission during Migration
  // -------------------------------------------------------------------------
  const concurrentNew = await addRFQAsync({
    fullName: 'Concurrent Submitter',
    companyName: 'Realtime Textiles',
    email: 'realtime@textiles.com',
    productType: 'Curtain Album',
    quantity: '300 Units',
  });
  assert(Boolean(concurrentNew.id), 'Submission during migration succeeded with unique ID');
  assert(remoteKvStore.has(`samplinghub:rfq:${concurrentNew.id}`), 'Concurrent submission entity exists in Redis');

  // -------------------------------------------------------------------------
  // Test 13: Atomic Deletion Fail-Closed
  // -------------------------------------------------------------------------
  const toDelete = await addRFQAsync({
    fullName: 'Delete Test',
    companyName: 'Delete Corp',
    email: 'del@corp.com',
    productType: 'Book',
    quantity: '50',
  });
  assert(remoteKvStore.has(`samplinghub:rfq:${toDelete.id}`), 'Record to delete exists in Redis');

  const delSuccess = await deleteRFQAsync(toDelete.id);
  assert(delSuccess === true, 'Atomic delete succeeded');
  assert(!remoteKvStore.has(`samplinghub:rfq:${toDelete.id}`), 'Deleted record removed from Redis');
  const indexAfterDel = remoteZSetStore.get(RFQ_INDEX_KEY) || [];
  assert(!indexAfterDel.some((e) => e.member === toDelete.id), 'Deleted record removed from index');

  // -------------------------------------------------------------------------
  // Test 14: Redis Outage and Recovery
  // -------------------------------------------------------------------------
  setMockKvHandler(() => Promise.resolve(null));
  const outageRead = await getAllRFQsAsync();
  assert(Array.isArray(outageRead) && outageRead.length > 0, 'Under Redis outage, read falls back to local memory without crashing');

  setMockKvHandler(mockKvPipeline);
  const recoveredRead = await getAllRFQsAsync();
  assert(Array.isArray(recoveredRead) && recoveredRead.length > 0, 'Full service restored immediately upon Redis recovery');

  // -------------------------------------------------------------------------
  // Test 15: Atomic Update (Lua EVAL) & Fail-Closed on Redis Write Failure
  // -------------------------------------------------------------------------
  const toUpdate = await addRFQAsync({
    fullName: 'Update Test',
    companyName: 'Update Corp',
    email: 'upd@corp.com',
    productType: 'Book',
    quantity: '75',
  });
  const updatedOk = await updateRFQStatusAsync(toUpdate.id, { status: 'Won', estimatedValueUsd: 12500 });
  assert(updatedOk && updatedOk.status === 'Won' && updatedOk.estimatedValueUsd === 12500, 'Atomic Lua update succeeded');

  // Simulate Redis EVAL failure during update
  setMockKvHandler((commands) =>
    Promise.resolve(
      commands.map(([cmd, ...args]) => {
        if (cmd === 'GET') return remoteKvStore.get(args[0]) ?? null;
        if (cmd === 'EVAL') return 0; // Simulate Lua transaction failure
        return 'OK';
      })
    )
  );
  let updateFailedClosed = false;
  try {
    await updateRFQStatusAsync(toUpdate.id, { status: 'Lost' });
  } catch {
    updateFailedClosed = true;
  }
  assert(updateFailedClosed, 'CRIT: updateRFQStatusAsync failed closed when Redis Lua EVAL returned 0');

  setMockKvHandler(mockKvPipeline);
  const verifyUnchanged = JSON.parse(remoteKvStore.get(`samplinghub:rfq:${toUpdate.id}`));
  assert(verifyUnchanged.status === 'Won', 'CRIT: Record status remained Won after failed update');

  // -------------------------------------------------------------------------
  // Test 16: Empty Index After Deleting All RFQs Does Not Re-Migrate Legacy Key
  // -------------------------------------------------------------------------
  const allCurrent = await getAllRFQsAsync();
  for (const r of allCurrent) {
    await deleteRFQAsync(r.id);
  }
  const afterDeletingAll = await getAllRFQsAsync();
  assert(afterDeletingAll.length === 0, 'CRIT: Deleting all RFQs when migration is done returns [] without re-migrating legacy key');

  // Cleanup
  process.env.NODE_ENV = 'test';
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  setMockKvHandler(null);

  console.log(`\n--- FAILURE-INJECTION TEST RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) process.exit(1);
}

runFailureInjectionTests().catch((err) => {
  console.error('Fatal failure-injection test error:', err);
  process.exit(1);
});
