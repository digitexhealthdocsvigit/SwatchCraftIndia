import crypto from 'node:crypto';
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
} from '../api/_lib/store.ts';

async function runConcurrencyTests() {
  console.log('--- STARTING RFQ SHARED STORAGE CONCURRENCY & INTEGRITY TESTS ---\n');
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

  // Set up mock distributed KV engine with artificial jitter to simulate real async network concurrency
  const remoteKvStore = new Map();
  const remoteZSetStore = new Map();

  function mockKvPipeline(commands) {
    // Inject random micro-delay to simulate actual concurrent network latency
    const delay = Math.floor(2 + Math.random() * 8);
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = commands.map(([cmd, ...args]) => {
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
          return null;
        });
        resolve(results);
      }, delay);
    });
  }

  // Activate mock storage
  process.env.UPSTASH_REDIS_REST_URL = 'https://mock-samplinghub-upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'mock-upstash-token-2026';
  setMockKvHandler(mockKvPipeline);

  assert(isSharedStorageConfigured() === true, 'Shared KV configured via Upstash environment variables');

  // Test 1: Forward-migration from legacy monolithic array
  const legacyRfqs = [
    {
      id: 'RFQ-LEGACY-001',
      fullName: 'Legacy Buyer 1',
      companyName: 'Legacy Textiles UK',
      email: 'buyer1@legacytextiles.co.uk',
      productType: 'Waterfall Hangers',
      quantity: '200 Units',
      submittedAt: new Date(Date.now() - 3600000).toISOString(),
      status: 'Qualified',
    },
    {
      id: 'RFQ-LEGACY-002',
      fullName: 'Legacy Buyer 2',
      companyName: 'Milano Fabric Srl',
      email: 'buyer2@milanofabric.it',
      productType: 'Swatch Books',
      quantity: '150 Units',
      submittedAt: new Date(Date.now() - 7200000).toISOString(),
      status: 'New',
    },
  ];

  remoteKvStore.set(RFQ_LEGACY_KEY, JSON.stringify(legacyRfqs));
  assert(remoteZSetStore.has(RFQ_INDEX_KEY) === false, 'Index is initially uninitialized');

  const migratedRfqs = await getAllRFQsAsync();
  assert(migratedRfqs.length >= 2, 'getAllRFQsAsync migrates and returns legacy records');
  assert(remoteZSetStore.has(RFQ_INDEX_KEY) === true, 'Migration created sorted set index');
  assert(remoteKvStore.has('samplinghub:rfq:RFQ-LEGACY-001'), 'Migrated RFQ 1 to individual key');
  assert(remoteKvStore.has('samplinghub:rfq:RFQ-LEGACY-002'), 'Migrated RFQ 2 to individual key');
  assert(remoteKvStore.has(RFQ_LEGACY_KEY), 'Rollback safety: legacy monolithic key preserved intact');

  // Test 2: Multiple simultaneous overlapping RFQ submissions (Stress Concurrency Test)
  const initialCount = (await getAllRFQsAsync()).length;
  const CONCURRENT_SUBMISSIONS = 12;

  const simultaneousSubmissions = Array.from({ length: CONCURRENT_SUBMISSIONS }).map((_, i) =>
    addRFQAsync({
      fullName: `Concurrent Buyer ${i + 1}`,
      companyName: `Global Importer ${i + 1} LLC`,
      email: `buyer${i + 1}@globalimporter.com`,
      productType: 'Hardbound Swatch Books',
      quantity: `${100 * (i + 1)} Units`,
      exportMarket: i % 2 === 0 ? 'European Union' : 'United States',
    })
  );

  const createdRecords = await Promise.all(simultaneousSubmissions);
  assert(createdRecords.length === CONCURRENT_SUBMISSIONS, 'All 12 concurrent submissions resolved');

  // Verify all unique IDs
  const createdIds = new Set(createdRecords.map((r) => r.id));
  assert(
    createdIds.size === CONCURRENT_SUBMISSIONS,
    'CRIT: Zero ID collision: All 12 concurrently created RFQs have unique identifiers'
  );

  // Read back all RFQs and verify none was lost
  const postSubmissionRfqs = await getAllRFQsAsync();
  assert(
    postSubmissionRfqs.length === initialCount + CONCURRENT_SUBMISSIONS,
    `CRIT: Zero Lost Updates: Storage count strictly increased from ${initialCount} to ${initialCount + CONCURRENT_SUBMISSIONS}`
  );

  for (const created of createdRecords) {
    const found = postSubmissionRfqs.some((r) => r.id === created.id);
    assert(found, `Concurrent record ${created.id} successfully retrieved without being overwritten`);
  }

  // Test 3: Concurrent status updates on distinct RFQs
  const targetA = createdRecords[0].id;
  const targetB = createdRecords[1].id;

  const concurrentUpdates = await Promise.all([
    updateRFQStatusAsync(targetA, { status: 'Under Review', estimatedValueUsd: 15000 }),
    updateRFQStatusAsync(targetB, { status: 'Quotation Sent', estimatedValueUsd: 28000 }),
  ]);

  assert(concurrentUpdates[0]?.status === 'Under Review', 'Target A updated concurrently without interference');
  assert(concurrentUpdates[1]?.status === 'Quotation Sent', 'Target B updated concurrently without interference');

  // Test 4: Concurrent deletion of RFQ A while creating RFQ C
  const targetToDelete = createdRecords[2].id;
  const [deleteResult, newCreated] = await Promise.all([
    deleteRFQAsync(targetToDelete),
    addRFQAsync({
      fullName: 'New Buyer During Delete',
      companyName: 'Live Ops Ltd',
      email: 'live@liveops.com',
      productType: 'Waterfall Hanger',
      quantity: '50 Units',
    }),
  ]);

  assert(deleteResult === true, 'Concurrent deletion succeeded');
  assert(Boolean(newCreated && newCreated.id), 'Concurrent creation during deletion succeeded');

  const afterDeleteRfqs = await getAllRFQsAsync();
  assert(!afterDeleteRfqs.some((r) => r.id === targetToDelete), 'Deleted record is removed from storage');
  assert(afterDeleteRfqs.some((r) => r.id === newCreated.id), 'Simultaneously created record is present');

  // Test 5: Safe handling of malformed records
  // Insert a corrupt JSON string into one RFQ key
  remoteKvStore.set('samplinghub:rfq:CORRUPT-KEY', 'NOT_VALID_JSON_}{[');
  const indexList = remoteZSetStore.get(RFQ_INDEX_KEY);
  indexList.push({ member: 'CORRUPT-KEY', score: Date.now() + 1000 });

  const rfqsWithCorrupt = await getAllRFQsAsync();
  assert(Array.isArray(rfqsWithCorrupt), 'getAllRFQsAsync safely skips corrupt record without throwing');
  assert(!rfqsWithCorrupt.some((r) => r.id === 'CORRUPT-KEY'), 'Malformed record cleanly excluded');

  // Test 6: Network Outage and Fail-Closed Behavior
  setMockKvHandler(() => Promise.resolve(null)); // Simulate network drop
  const fallbackRfqs = await getAllRFQsAsync();
  assert(Array.isArray(fallbackRfqs) && fallbackRfqs.length > 0, 'Falls back safely to local memory cache under Redis outage');

  // Restore mock handler
  setMockKvHandler(mockKvPipeline);

  // Clean up environment
  process.env.NODE_ENV = 'test';
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  setMockKvHandler(null);

  console.log(`\n--- CONCURRENCY & INTEGRITY TEST RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) process.exit(1);
}

runConcurrencyTests().catch((err) => {
  console.error('Fatal concurrency test execution error:', err);
  process.exit(1);
});
