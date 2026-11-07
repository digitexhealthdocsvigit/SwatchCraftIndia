import crypto from 'node:crypto';
import {
  isAuthConfigured,
  verifyCredentials,
  generateSessionToken,
  verifySessionToken,
  checkLoginRateLimit,
  resetLoginRateLimit,
  parseCookies,
} from '../api/_lib/auth.ts';
import { getAllRFQs, addRFQ, updateRFQStatus } from '../api/_lib/store.ts';

async function runTests() {
  console.log('--- STARTING ADMIN SECURITY & INTEGRITY TESTS ---\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  // 0. Fail-safe unconfigured check
  delete process.env.ADMIN_PASSWORD_HASH;
  delete process.env.ADMIN_SESSION_SECRET;
  assert(isAuthConfigured() === false, 'isAuthConfigured returns false when env vars are missing');
  assert(verifyCredentials('any@user.com', 'pass') === false, 'verifyCredentials returns false when unconfigured');

  // Now configure test secrets
  const testEmail = 'digitex.studio@gmail.com';
  const testPass = 'OwnerExportAccess2026!';
  const testHash = crypto.createHash('sha256').update(`${testEmail}:${testPass}`).digest('hex');
  const testSecret = 'samplinghub-test-session-secret-high-entropy-64-character-string';
  process.env.ADMIN_PASSWORD_HASH = testHash;
  process.env.ADMIN_SESSION_SECRET = testSecret;

  assert(isAuthConfigured() === true, 'isAuthConfigured returns true when test secrets are set');

  // 1. Password verification on server with timing-safe comparison
  const badCreds = verifyCredentials('attacker@fake.com', 'wrongpassword');
  assert(!badCreds, 'Rejects invalid credentials');

  const goodCreds = verifyCredentials(testEmail, testPass);
  assert(goodCreds === true, 'Accepts valid configured administrator credentials');

  // Case insensitive email check
  const mixedCaseCreds = verifyCredentials('DiGiTeX.StUdIo@gmail.com', testPass);
  assert(mixedCaseCreds === true, 'Normalizes email case insensitively');

  // Test timingSafeEqual handles different lengths without throw
  const shortCreds = verifyCredentials('a', 'b');
  assert(!shortCreds, 'Handles short credentials safely');

  // 2. Token generation and verification
  const token = generateSessionToken(testEmail);
  assert(typeof token === 'string' && token.includes('.'), 'Generates valid signed session token');

  const verified = verifySessionToken(token);
  assert(verified.valid === true && verified.email === testEmail, 'Verifies authentic token correctly');

  // 3. Forged token rejection
  const forgedToken = token.slice(0, -4) + 'abcd';
  const forgedResult = verifySessionToken(forgedToken);
  assert(forgedResult.valid === false, 'Rejects forged HMAC signature token');

  // 4. Expired token rejection
  const expiredPayload = Buffer.from(JSON.stringify({
    email: testEmail,
    expiry: Date.now() - 1000 * 60, // expired 1 min ago
  })).toString('base64url');
  const expiredSig = crypto.createHmac('sha256', testSecret).update(expiredPayload).digest('base64url');
  const expiredToken = `${expiredPayload}.${expiredSig}`;

  const expiredResult = verifySessionToken(expiredToken);
  assert(expiredResult.valid === false, 'Rejects expired session token');

  // 5. Rate limiting verification
  const testIp = '192.168.1.100';
  resetLoginRateLimit(testIp);
  for (let i = 1; i <= 4; i++) {
    const check = checkLoginRateLimit(testIp);
    assert(check.allowed === true, `Rate limit attempt #${i} is allowed`);
  }
  // 5th attempt
  const fifth = checkLoginRateLimit(testIp);
  assert(fifth.allowed === true, '5th attempt is allowed');

  // 6th attempt should be blocked
  const sixth = checkLoginRateLimit(testIp);
  assert(sixth.allowed === false && sixth.retryAfterSeconds > 0, '6th attempt is blocked with 429 Retry-After');
  resetLoginRateLimit(testIp);

  // 6. Cookie parsing
  const cookieStr = 'samplinghub_admin_token=' + token + '; other_cookie=value123';
  const parsedCookies = parseCookies(cookieStr);
  assert(parsedCookies.samplinghub_admin_token === token, 'Parses session token from Cookie header correctly');

  // 7. RFQ Store operations
  const initialCount = getAllRFQs().length;
  assert(initialCount >= 3, `Initial RFQs present (${initialCount} records)`);

  const newRfq = addRFQ({
    fullName: 'Test Export Buyer',
    companyName: 'Test Corp London',
    email: 'buyer@testcorp.co.uk',
    productType: 'Waterfall Hangers',
    quantity: '500 Units',
    exportMarket: 'United Kingdom',
    specifications: 'Custom swatch mounting test',
  });
  assert(newRfq && newRfq.id.startsWith('RFQ-'), 'Creates new RFQ record with valid ID');

  const afterAddCount = getAllRFQs().length;
  assert(afterAddCount === initialCount + 1, 'RFQ count increased by 1 in storage');

  const updated = updateRFQStatus(newRfq.id, {
    status: 'Qualified',
    estimatedValueUsd: 8500,
  });
  assert(updated?.status === 'Qualified' && updated?.estimatedValueUsd === 8500, 'Updates RFQ status and estimated value');

  console.log(`\n--- RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
