import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {
  isAuthConfigured,
  verifyCredentials,
  hashPassword,
  verifyPassword,
  generateSessionToken,
  verifySessionToken,
  revokeSessionToken,
  isTokenRevoked,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginRateLimit,
  getClientIp,
  parseCookies,
  SESSION_EXPIRY_MS,
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
  delete process.env.ADMIN_EMAIL;
  delete process.env.ADMIN_PASSWORD_HASH;
  delete process.env.ADMIN_SESSION_SECRET;
  assert(isAuthConfigured() === false, 'isAuthConfigured returns false when env vars are missing');
  assert(verifyCredentials('any@user.com', 'pass') === false, 'verifyCredentials returns false when unconfigured');

  // 1. Password hashing test: standard RFC 7914 scrypt
  const testEmail = 'digitex.studio@gmail.com';
  const testPass = 'OwnerExportAccess2026!';
  const scryptHash = hashPassword(testPass);

  assert(scryptHash.startsWith('$scrypt$N=16384,r=8,p=1$'), 'scrypt produces standard formatted hash with N=16384, r=8, p=1');
  assert(verifyPassword(testPass, scryptHash) === true, 'verifyPassword accepts correct password with scrypt hash');
  assert(verifyPassword('WrongPass2026!', scryptHash) === false, 'verifyPassword rejects incorrect password with scrypt hash');
  assert(verifyPassword('', scryptHash) === false, 'verifyPassword rejects empty password');

  // Configure server environment with scrypt hash
  const testSecret = 'samplinghub-test-session-secret-high-entropy-64-character-string';
  process.env.ADMIN_EMAIL = testEmail;
  process.env.ADMIN_PASSWORD_HASH = scryptHash;
  process.env.ADMIN_SESSION_SECRET = testSecret;

  assert(isAuthConfigured() === true, 'isAuthConfigured returns true when test secrets are set');

  // 2. verifyCredentials tests
  const badCreds = verifyCredentials('attacker@fake.com', 'wrongpassword');
  assert(!badCreds, 'Rejects invalid credentials');

  const goodCreds = verifyCredentials(testEmail, testPass);
  assert(goodCreds === true, 'Accepts valid configured administrator credentials');

  // Case insensitive email check
  const mixedCaseCreds = verifyCredentials('DiGiTeX.StUdIo@gmail.com', testPass);
  assert(mixedCaseCreds === true, 'Normalizes email case insensitively');

  // Test timingSafeEqual handles different lengths safely
  const shortCreds = verifyCredentials('a', 'b');
  assert(!shortCreds, 'Handles short credentials safely');

  // 3. Session token creation & verification
  assert(SESSION_EXPIRY_MS === 86400000, 'Session expiry is explicitly set to 24 hours (86,400,000 ms)');
  const token = generateSessionToken(testEmail);
  assert(typeof token === 'string' && token.includes('.'), 'Generates valid signed session token');

  const verified = await verifySessionToken(token);
  assert(verified.valid === true && verified.email === testEmail, 'Verifies authentic token correctly');

  // Tampered signature rejection
  const [p, s] = token.split('.');
  const tamperedSig = s.slice(0, -4) + 'abcd';
  const forgedToken = `${p}.${tamperedSig}`;
  const verifyForged = await verifySessionToken(forgedToken);
  assert(verifyForged.valid === false, 'Rejects forged HMAC signature token');

  // Expired token rejection
  const expiredPayload = Buffer.from(
    JSON.stringify({ email: testEmail, expiry: Date.now() - 10000 })
  ).toString('base64url');
  const expiredSig = crypto.createHmac('sha256', testSecret).update(expiredPayload).digest('base64url');
  const expiredToken = `${expiredPayload}.${expiredSig}`;
  const verifyExpired = await verifySessionToken(expiredToken);
  assert(verifyExpired.valid === false, 'Rejects expired session token');

  // 4. Server-side session revocation on logout
  const initialRevoked = await isTokenRevoked(token);
  assert(initialRevoked === false, 'Token is not revoked initially');
  await revokeSessionToken(token);
  const postLogoutRevoked = await isTokenRevoked(token);
  assert(postLogoutRevoked === true, 'Token is marked revoked after logout');
  const verifyPostLogout = await verifySessionToken(token);
  assert(verifyPostLogout.valid === false, 'verifySessionToken rejects server-revoked token');

  // 4.1 Cross-instance session revocation persistence test
  // Verify that revocation survives by reading from the durable store file
  const revocationFile = path.join(os.tmpdir(), 'samplinghub_revocations.json');
  assert(fs.existsSync(revocationFile), 'Durable revocation store file exists on disk');
  const fileContent = JSON.parse(fs.readFileSync(revocationFile, 'utf8'));
  const tokenData = JSON.parse(Buffer.from(p, 'base64url').toString('utf8'));
  assert(Boolean(fileContent[tokenData.jti]), 'Token jti is durably persisted in shared revocation store');

  // 5. Distributed IP Rate limiting tests
  const testIp = '198.51.100.42';
  await resetLoginRateLimit(testIp, 'ip');
  for (let i = 1; i <= 5; i++) {
    const res = await checkLoginRateLimit(testIp, 'ip');
    assert(res.allowed === true, `Rate limit attempt #${i} is allowed for IP`);
    await recordFailedLogin(testIp, 'ip');
  }
  const blocked = await checkLoginRateLimit(testIp, 'ip');
  assert(blocked.allowed === false, '6th attempt is blocked with 429 Retry-After for IP');
  assert(typeof blocked.retryAfterSeconds === 'number', 'Returns retryAfterSeconds integer');

  // 5.1 Distributed Account-based Rate limiting test (protects against multi-IP botnet credential stuffing)
  const targetAccount = 'victim.admin@samplinghub.world';
  await resetLoginRateLimit(targetAccount, 'account');
  for (let i = 1; i <= 10; i++) {
    const res = await checkLoginRateLimit(targetAccount, 'account');
    assert(res.allowed === true, `Account rate limit attempt #${i} allowed`);
    await recordFailedLogin(targetAccount, 'account');
  }
  const accountBlocked = await checkLoginRateLimit(targetAccount, 'account');
  assert(accountBlocked.allowed === false, '11th attempt on target account is blocked across all IPs');

  // 5.2 Anti-spoofing client IP resolution test
  const mockReqVercel = {
    headers: {
      'x-vercel-forwarded-for': '203.0.113.195, 10.0.0.1',
      'x-forwarded-for': '1.2.3.4, 5.6.7.8',
    },
    socket: { remoteAddress: '127.0.0.1' },
  };
  const resolvedIp = getClientIp(mockReqVercel);
  assert(resolvedIp === '203.0.113.195', 'getClientIp prioritizes platform-verified Vercel edge IP over client header');

  // 6. Cookie parsing
  const cookieStr = 'other=xyz; samplinghub_admin_token=abc123token; session_id=987';
  const parsed = parseCookies(cookieStr);
  assert(parsed.samplinghub_admin_token === 'abc123token', 'Parses session token from Cookie header correctly');

  // 7. RFQ Store tests
  const initialRfqs = getAllRFQs();
  assert(Array.isArray(initialRfqs) && initialRfqs.length > 0, `Initial RFQs present (${initialRfqs.length} records)`);

  const initialCount = initialRfqs.length;
  const newRfq = addRFQ({
    fullName: 'David Hassel',
    companyName: 'Bavarian Interior Textiles GmbH',
    email: 'd.hassel@bavariantextiles.de',
    productType: 'Hardbound Wallpaper Catalogs',
    quantity: '300 Units',
    exportMarket: 'Germany',
  });
  assert(newRfq.id && newRfq.id.startsWith('RFQ-'), 'Creates new RFQ record with valid ID');

  const afterAdd = getAllRFQs();
  assert(afterAdd.length === initialCount + 1, 'RFQ count increased by 1 in storage');

  const updated = updateRFQStatus(newRfq.id, { status: 'Quotation Sent', estimatedValueUsd: 14500 });
  assert(updated && updated.status === 'Quotation Sent' && updated.estimatedValueUsd === 14500, 'Updates RFQ status and estimated value');

  console.log(`\n--- RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
