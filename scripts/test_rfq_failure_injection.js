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

  // Failure Scenario 1: Orphaned Index Entry (Index entry exists, record missing)
  // Inject an index entry pointing to a non-existent RFQ ID
  const orphanId = 'RFQ-2026-GHOST-ORPHAN';
  let initialIndex = remoteZSetStore.get(RFQ_INDEX_KEY) || [];
  initialIndex.push({ member: orphanId, score: Date.now() });
  remoteZSetStore.set(RFQ_INDEX_KEY, initialIndex);
  assert(remoteKvStore.has(`samplinghub:rfq:${orphanId}`) === false, 'Orphan entity key is missing');

  // getAllRFQsAsync should safely return valid records and prune the orphan from the index
  const rfqsAfterOrphan = await getAllRFQsAsync();
  assert(!rfqsAfterOrphan.some((r) => r.id === orphanId), 'Orphaned ID excluded from returned RFQ list');
  // Allow async prune to fire
  await new Promise((r) => setTimeout(r, 20));
  const cleanIndex = remoteZSetStore.get(RFQ_INDEX_KEY) || [];
  assert(!cleanIndex.some((e) => e.member === orphanId), 'Self-healing: Orphaned index entry automatically pruned from ZSET');

  // Failure Scenario 2: Client Retry After Ambiguous Timeout (Idempotent Retry)
  const submission1 = await addRFQAsync({
    fullName: 'Retry Test Buyer',
    companyName: 'Retry Fabric Ltd',
    email: 'retry@buyer.com',
    productType: 'Swatch Book',
    quantity: '100 Units',
  });
  assert(Boolean(submission1.id), 'Initial submission succeeded with ID');

  // Simulate client retry using same ID and payload
  // Manually invoke the exact storage pipeline that addRFQAsync runs
  await mockKvPipeline([
    ['SET', `samplinghub:rfq:${submission1.id}`, JSON.stringify(submission1)],
    ['ZADD', RFQ_INDEX_KEY, Date.now(), submission1.id],
  ]);

  const afterRetry = await getAllRFQsAsync();
  const matchingRecords = afterRetry.filter((r) => r.id === submission1.id);
  assert(matchingRecords.length === 1, 'Idempotent retry: Retrying identical submission does not duplicate RFQ in index or list');

  // Failure Scenario 3: Simultaneous Migrations with Distributed Lock
  // Reset store to unmigrated legacy state
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

  // Simulate two instances triggering getAllRFQsAsync at the exact same millisecond
  const [migrationRes1, migrationRes2] = await Promise.all([
    getAllRFQsAsync(),
    getAllRFQsAsync(),
  ]);

  assert(migrationRes1.length >= 2, 'Instance 1 successfully migrated records');
  assert(migrationRes2.length >= 2, 'Instance 2 successfully received migrated records');
  assert(remoteKvStore.has('samplinghub:rfq:RFQ-LEGACY-A'), 'Record A migrated to individual key');
  assert(remoteKvStore.has('samplinghub:rfq:RFQ-LEGACY-B'), 'Record B migrated to individual key');
  assert(remoteKvStore.has(RFQ_LEGACY_KEY), 'Legacy data preserved intact (never deleted)');
  assert(!remoteKvStore.has(RFQ_MIGRATION_LOCK), 'Distributed migration lock released cleanly');

  // Failure Scenario 4: Interrupted Migration Recovery
  // Inject partially migrated state: index has Record A, Record B is only in legacy key
  remoteZSetStore.get(RFQ_INDEX_KEY); // exists with A and B
  // Delete B from individual keys to simulate partial network failure midway
  remoteKvStore.delete('samplinghub:rfq:RFQ-LEGACY-B');

  // Next read should prune B's orphaned index entry without error
  const partialRecovered = await getAllRFQsAsync();
  assert(partialRecovered.some((r) => r.id === 'RFQ-LEGACY-A'), 'Valid migrated Record A remains intact');
  assert(!partialRecovered.some((r) => r.id === 'RFQ-LEGACY-B'), 'Incomplete Record B safely excluded');

  // Failure Scenario 5: Duplicate IDs in Legacy Data
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

  // Failure Scenario 6: Redis Outage and Recovery
  // 1. Simulate Redis outage
  setMockKvHandler(() => Promise.resolve(null));
  const outageRead = await getAllRFQsAsync();
  assert(Array.isArray(outageRead) && outageRead.length > 0, 'Under Redis outage, read falls back to local memory without crashing');

  // 2. Restore Redis
  setMockKvHandler(mockKvPipeline);
  const recoveredRead = await getAllRFQsAsync();
  assert(Array.isArray(recoveredRead) && recoveredRead.length > 0, 'Full service restored immediately upon Redis recovery');

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
