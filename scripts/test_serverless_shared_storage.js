import crypto from 'node:crypto';
import {
  isAuthConfigured,
  isSharedStorageConfigured,
  isProduction,
  hashPassword,
  verifyPassword,
  generateSessionToken,
  verifySessionToken,
  revokeSessionToken,
  isTokenRevoked,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginRateLimit,
  setMockKvHandler,
  SESSION_EXPIRY_MS,
} from '../api/_lib/auth.ts';
import {
  getAllRFQsAsync,
  addRFQAsync,
  updateRFQStatusAsync,
  deleteRFQAsync,
} from '../api/_lib/store.ts';

async function runSharedStorageTests() {
  console.log('--- SERVERLESS SHARED STORAGE & FAIL-CLOSED SECURITY TESTS ---\n');
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

  // 1. Missing shared storage in production cannot silently activate fallback
  process.env.NODE_ENV = 'production';
  process.env.ADMIN_EMAIL = 'digitex.studio@gmail.com';
  process.env.ADMIN_PASSWORD_HASH = hashPassword('TestSecretPass123!');
  process.env.ADMIN_SESSION_SECRET = 'a'.repeat(64);
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  setMockKvHandler(null);

  assert(isProduction() === true, 'Environment correctly recognized as production');
  assert(isSharedStorageConfigured() === false, 'isSharedStorageConfigured returns false when KV is absent');
  assert(
    isAuthConfigured() === false,
    'CRIT: isAuthConfigured fails closed in production when shared KV store is missing'
  );

  // 2. Setup mock shared KV store (simulating an external Upstash/Vercel KV server)
  const remoteKvStore = new Map();
  const remoteTtlStore = new Map();

  function mockKvPipeline(commands) {
    return Promise.resolve(
      commands.map(([cmd, ...args]) => {
        if (cmd === 'GET') {
          return remoteKvStore.get(args[0]) ?? null;
        }
        if (cmd === 'SET') {
          const [key, val] = args;
          remoteKvStore.set(key, String(val));
          return 'OK';
        }
        if (cmd === 'SETEX') {
          const [key, ttlSeconds, val] = args;
          remoteKvStore.set(key, String(val));
          remoteTtlStore.set(key, Date.now() + parseInt(ttlSeconds, 10) * 1000);
          return 'OK';
        }
        if (cmd === 'INCR') {
          const key = args[0];
          const curr = parseInt(remoteKvStore.get(key) || '0', 10);
          const next = curr + 1;
          remoteKvStore.set(key, String(next));
          return next;
        }
        if (cmd === 'EVAL') {
          // Lua script simulation for atomic INCR + conditional EXPIRE
          // args: [script, numkeys, key, expireSeconds]
          const key = args[2];
          const expireSec = parseInt(args[3], 10);
          const curr = parseInt(remoteKvStore.get(key) || '0', 10);
          const next = curr + 1;
          remoteKvStore.set(key, String(next));
          if (next === 1) {
            remoteTtlStore.set(key, Date.now() + expireSec * 1000);
          }
          return next;
        }
        if (cmd === 'TTL') {
          const key = args[0];
          const exp = remoteTtlStore.get(key);
          if (!exp) return -1;
          const remaining = Math.max(0, Math.ceil((exp - Date.now()) / 1000));
          return remaining;
        }
        if (cmd === 'EXPIRE') {
          const [key, seconds] = args;
          remoteTtlStore.set(key, Date.now() + parseInt(seconds, 10) * 1000);
          return 1;
        }
        if (cmd === 'DEL') {
          remoteKvStore.delete(args[0]);
          remoteTtlStore.delete(args[0]);
          return 1;
        }
        return null;
      })
    );
  }

  // Configure production with shared KV active
  process.env.KV_REST_API_URL = 'https://mock-samplinghub-kv.upstash.io';
  process.env.KV_REST_API_TOKEN = 'mock-auth-token-samplinghub-2026';
  setMockKvHandler(mockKvPipeline);

  assert(isSharedStorageConfigured() === true, 'isSharedStorageConfigured returns true with KV configured');
  assert(isAuthConfigured() === true, 'isAuthConfigured returns true with credentials + shared KV in production');

  // 3. Shared session revocation across simulated independent instances
  // Instance A creates a token
  const testEmail = 'digitex.studio@gmail.com';
  const token = generateSessionToken(testEmail);
  const verifyRes = await verifySessionToken(token);
  assert(verifyRes.valid === true, 'Valid token verified against shared store');

  // Instance A logs out: calls revokeSessionToken
  const revokeRes = await revokeSessionToken(token);
  assert(revokeRes.success === true, 'revokeSessionToken reports success to shared KV');

  // Check that the key was written to the remote KV store
  const parts = token.split('.');
  const tokenPayload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
  assert(
    remoteKvStore.has(`revoked:${tokenPayload.jti}`),
    'Revocation jti successfully written to remote KV store'
  );

  // 4. Instance B (different instance) verifies the token and rejects it
  const verifyInstanceB = await verifySessionToken(token);
  assert(verifyInstanceB.valid === false, 'Independent instance B rejects revoked token from shared store');
  assert(verifyInstanceB.error === 'Token has been revoked', 'Reports correct revocation reason');

  // 5. Positive-only cache test: Ensure cache cannot override newer revocation
  const token2 = generateSessionToken(testEmail);
  const parts2 = token2.split('.');
  const payload2 = JSON.parse(Buffer.from(parts2[0], 'base64url').toString('utf8'));

  // First verification is valid
  const firstCheck = await verifySessionToken(token2);
  assert(firstCheck.valid === true, 'Initial verification succeeds');

  // Another instance revokes directly in shared store
  remoteKvStore.set(`revoked:${payload2.jti}`, '1');

  // This instance must check remote store and NOT trust memory for validity
  const secondCheck = await verifySessionToken(token2);
  assert(secondCheck.valid === false, 'Positive-only cache correctly consults shared store on subsequent checks');

  // 6. Distributed Rate Limiting via atomic Lua EVAL
  const testIp = '203.0.113.195';
  await resetLoginRateLimit(testIp, 'ip');

  // 5 concurrent/sequential attempts across instances
  for (let i = 1; i <= 5; i++) {
    const check = await checkLoginRateLimit(testIp, 'ip');
    assert(check.allowed === true, `Attempt ${i} allowed before limit`);
    const record = await recordFailedLogin(testIp, 'ip');
    assert(record.success === true, `Attempt ${i} recorded`);
  }

  // 6th attempt must be blocked
  const ipBlocked = await checkLoginRateLimit(testIp, 'ip');
  assert(ipBlocked.allowed === false, '6th concurrent attempt blocked across instances');
  assert(typeof ipBlocked.retryAfterSeconds === 'number', 'Returns valid retryAfterSeconds');

  // 8. Fixed expiration window: Verify expiration is NOT reset on subsequent failed attempts
  const initialTtl = remoteTtlStore.get(`rate:ip:${testIp}`);
  await recordFailedLogin(testIp, 'ip'); // 7th attempt
  const subsequentTtl = remoteTtlStore.get(`rate:ip:${testIp}`);
  assert(initialTtl === subsequentTtl, 'Expiration is fixed from initial attempt and NOT reset on subsequent attempts');

  // 9. Shared RFQ Store cross-instance tests
  const initialRfqs = await getAllRFQsAsync();
  assert(Array.isArray(initialRfqs) && initialRfqs.length > 0, 'Shared RFQ store initialized and fetched');
  assert(remoteKvStore.has('samplinghub:rfqs'), 'RFQs backed to shared KV key "samplinghub:rfqs"');

  const newRfq = await addRFQAsync({
    fullName: 'Test Buyer',
    companyName: 'Global Fabrics Ltd',
    email: 'buyer@globalfabrics.com',
    productType: 'Hardbound Swatch Books',
    quantity: '500 Units',
  });
  assert(newRfq.id.startsWith('RFQ-'), 'New RFQ generated with formatted ID');

  const updatedRfqs = await getAllRFQsAsync();
  assert(updatedRfqs.some((r) => r.id === newRfq.id), 'Newly added RFQ visible across instances in shared store');

  const updatedStatus = await updateRFQStatusAsync(newRfq.id, { status: 'Qualified', estimatedValueUsd: 12000 });
  assert(updatedStatus?.status === 'Qualified', 'RFQ status updated to Qualified in shared store');

  const deleted = await deleteRFQAsync(newRfq.id);
  assert(deleted === true, 'RFQ successfully deleted from shared store');
  const postDeleteRfqs = await getAllRFQsAsync();
  assert(!postDeleteRfqs.some((r) => r.id === newRfq.id), 'Deleted RFQ removed from shared KV store');

  // 10. Store failure produces safe fail-closed response in production
  // Simulate KV outage in production
  setMockKvHandler(() => Promise.resolve(null)); // returns null on network outage
  const token3 = generateSessionToken(testEmail);

  const verifyUnderOutage = await verifySessionToken(token3);
  assert(
    verifyUnderOutage.valid === false,
    'CRIT: Under shared KV outage, session verification fails closed in production'
  );

  const revokeUnderOutage = await revokeSessionToken(token3);
  assert(
    revokeUnderOutage.success === false,
    'CRIT: Under shared KV outage, logout revocation reports failure (fail-closed)'
  );

  // Restore mock handler
  setMockKvHandler(mockKvPipeline);

  // Reset to dev mode for remaining tests
  process.env.NODE_ENV = 'test';
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  setMockKvHandler(null);

  console.log(`\n--- SHARED STORAGE TEST RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) process.exit(1);
}

runSharedStorageTests().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
