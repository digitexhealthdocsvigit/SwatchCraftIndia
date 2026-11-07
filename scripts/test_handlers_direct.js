import { EventEmitter } from 'node:events';
import crypto from 'node:crypto';
import loginHandler from '../api/admin/login.ts';
import sessionHandler from '../api/admin/session.ts';
import rfqsHandler from '../api/admin/rfqs.ts';
import logoutHandler from '../api/admin/logout.ts';
import submitHandler from '../api/rfq/submit.ts';
import {
  resetLoginRateLimit,
  generateSessionToken,
  hashPassword,
} from '../api/_lib/auth.ts';

// Lightweight mock request/response harness for testing serverless handlers directly
class MockRequest extends EventEmitter {
  constructor(options = {}) {
    super();
    this.method = options.method || 'GET';
    this.url = options.url || '/';
    this.headers = options.headers || {};
    this.body = options.body;
    this.socket = { remoteAddress: '127.0.0.1' };
  }
}

class MockResponse extends EventEmitter {
  constructor() {
    super();
    this.statusCode = 200;
    this.headers = {};
    this.body = '';
  }

  setHeader(name, value) {
    this.headers[name.toLowerCase()] = value;
  }

  getHeader(name) {
    return this.headers[name.toLowerCase()];
  }

  writeHead(statusCode, headers) {
    this.statusCode = statusCode;
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        this.setHeader(k, v);
      }
    }
  }

  end(chunk) {
    if (chunk) {
      this.body += typeof chunk === 'string' ? chunk : chunk.toString();
    }
    this.emit('finish');
  }
}

async function invoke(handler, reqOptions) {
  return new Promise((resolve) => {
    const req = new MockRequest(reqOptions);
    const res = new MockResponse();

    res.on('finish', () => {
      let json = null;
      try {
        json = JSON.parse(res.body);
      } catch {
        json = null;
      }
      resolve({
        status: res.statusCode,
        headers: res.headers,
        body: res.body,
        json,
      });
    });

    // Execute handler
    handler(req, res);

    if (reqOptions.body) {
      req.emit('data', JSON.stringify(reqOptions.body));
    }
    req.emit('end');
  });
}

async function run() {
  console.log('--- DIRECT SERVERLESS HANDLER INTEGRATION TESTS ---\n');
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

  // 0. Fail-safe configuration test: When env vars are absent, returns 503
  delete process.env.ADMIN_EMAIL;
  delete process.env.ADMIN_PASSWORD_HASH;
  delete process.env.ADMIN_SESSION_SECRET;
  const res0 = await invoke(loginHandler, {
    method: 'POST',
    url: '/api/admin/login',
    headers: { 'content-type': 'application/json' },
    body: { email: 'digitex.studio@gmail.com', password: 'somepassword' },
  });
  assert(res0.status === 503, 'Unconfigured environment variables return 503 Service Unavailable');
  assert(res0.json?.code === 'AUTH_NOT_CONFIGURED', 'Returns code AUTH_NOT_CONFIGURED');

  // Now configure test environment variables with standard scrypt
  const testEmail = 'digitex.studio@gmail.com';
  const testPass = 'SuperSecret2026!';
  const scryptHash = hashPassword(testPass);
  process.env.ADMIN_EMAIL = testEmail;
  process.env.ADMIN_PASSWORD_HASH = scryptHash;
  process.env.ADMIN_SESSION_SECRET = 'test-session-secret-key-64-character-entropy-samplinghub-2026';

  // 1. Unauthenticated session check
  const res1 = await invoke(sessionHandler, { method: 'GET', url: '/api/admin/session' });
  assert(res1.status === 401, 'Unauthenticated /api/admin/session returns 401');
  assert(res1.json?.authenticated === false, 'Session response payload indicates authenticated: false');

  // 2. Unauthenticated RFQ list
  const res2 = await invoke(rfqsHandler, { method: 'GET', url: '/api/admin/rfqs' });
  assert(res2.status === 401, 'Unauthenticated /api/admin/rfqs returns 401');

  // 3. Invalid Bearer token
  const res3 = await invoke(rfqsHandler, {
    method: 'GET',
    url: '/api/admin/rfqs',
    headers: { authorization: 'Bearer bad.token.here' },
  });
  assert(res3.status === 401, 'Forged Bearer token returns 401');

  // 4. Bad credentials on login
  await resetLoginRateLimit('127.0.0.1', 'ip');
  await resetLoginRateLimit('wrong@admin.com', 'account');
  const res4 = await invoke(loginHandler, {
    method: 'POST',
    url: '/api/admin/login',
    headers: { 'content-type': 'application/json' },
    body: { email: 'wrong@admin.com', password: 'wrongpassword' },
  });
  assert(res4.status === 401, 'Invalid credentials returns 401');
  assert(res4.json?.error === 'Invalid administrator credentials.', 'Returns generic error message');

  // 5. Missing email/password on login
  const res5 = await invoke(loginHandler, {
    method: 'POST',
    url: '/api/admin/login',
    headers: { 'content-type': 'application/json' },
    body: {},
  });
  assert(res5.status === 400, 'Empty login payload returns 400');

  // 6. Valid login with configured credentials (scrypt verified)
  const resLoginSuccess = await invoke(loginHandler, {
    method: 'POST',
    url: '/api/admin/login',
    headers: { 'content-type': 'application/json' },
    body: { email: testEmail, password: testPass },
  });
  assert(resLoginSuccess.status === 200, 'Valid login with configured credentials returns 200');
  assert(resLoginSuccess.json?.success === true, 'Login returns success: true');
  assert(resLoginSuccess.json?.token === undefined, 'Login does NOT expose session token in response body');
  assert(resLoginSuccess.json?.user?.email === testEmail, 'Login returns authenticated user email');

  // Check Set-Cookie flags
  const setCookie = resLoginSuccess.headers['set-cookie'];
  assert(Boolean(setCookie && setCookie.includes('HttpOnly')), 'Sets HttpOnly session cookie');
  assert(Boolean(setCookie && setCookie.includes('Max-Age=86400')), 'Sets 24-hour cookie Max-Age=86400');
  assert(Boolean(setCookie && setCookie.includes('SameSite=Lax')), 'Sets SameSite=Lax flag');

  const tokenMatch = setCookie?.match(/samplinghub_admin_token=([^;]+)/);
  const cookieToken = tokenMatch ? tokenMatch[1] : '';
  assert(Boolean(cookieToken), 'Extracted cookie session token');

  // 7. Session check using HttpOnly Cookie
  const res6 = await invoke(sessionHandler, {
    method: 'GET',
    url: '/api/admin/session',
    headers: { cookie: `samplinghub_admin_token=${cookieToken}` },
  });
  assert(res6.status === 200, 'Valid Cookie /api/admin/session returns 200');
  assert(res6.json?.authenticated === true && res6.json?.user?.email === testEmail, 'Returns authenticated user object');

  // 8. RFQ retrieval using HttpOnly Cookie
  const res7 = await invoke(rfqsHandler, {
    method: 'GET',
    url: '/api/admin/rfqs',
    headers: { cookie: `samplinghub_admin_token=${cookieToken}` },
  });
  assert(res7.status === 200, 'Valid Cookie /api/admin/rfqs returns 200');
  assert(Array.isArray(res7.json?.rfqs) && res7.json?.rfqs.length > 0, 'Returns RFQ list array');

  // 9. Logout handler revokes session & clears cookie
  const res8 = await invoke(logoutHandler, {
    method: 'POST',
    url: '/api/admin/logout',
    headers: { cookie: `samplinghub_admin_token=${cookieToken}` },
  });
  assert(res8.status === 200, 'POST /api/admin/logout returns 200');
  assert(res8.headers['set-cookie']?.includes('Max-Age=0'), 'Logout clears cookie with Max-Age=0');

  // 10. Verify that revoked token is rejected
  const resRevoked = await invoke(sessionHandler, {
    method: 'GET',
    url: '/api/admin/session',
    headers: { cookie: `samplinghub_admin_token=${cookieToken}` },
  });
  assert(resRevoked.status === 401, 'Revoked session token is rejected with 401 on server');

  // 11. Rate limiting blocks after 5 failed attempts from an IP
  await resetLoginRateLimit('127.0.0.1', 'ip');
  await resetLoginRateLimit('test@admin.com', 'account');
  for (let i = 0; i < 5; i++) {
    await invoke(loginHandler, {
      method: 'POST',
      url: '/api/admin/login',
      headers: { 'content-type': 'application/json' },
      body: { email: 'test@admin.com', password: 'bad' },
    });
  }
  const res10 = await invoke(loginHandler, {
    method: 'POST',
    url: '/api/admin/login',
    headers: { 'content-type': 'application/json' },
    body: { email: 'test@admin.com', password: 'bad' },
  });
  assert(res10.status === 429, '6th failed login attempt blocked with 429 Too Many Requests');
  assert(Boolean(res10.headers['retry-after']), 'Includes Retry-After response header');
  await resetLoginRateLimit('127.0.0.1', 'ip');
  await resetLoginRateLimit('test@admin.com', 'account');

  // 12. Public RFQ submission
  const res11 = await invoke(submitHandler, {
    method: 'POST',
    url: '/api/rfq/submit',
    headers: { 'content-type': 'application/json' },
    body: {
      fullName: 'Giovanni Rossi',
      companyName: 'Rossi Tessuti Milano',
      email: 'g.rossi@rossitessuti.it',
      productType: 'Hardbound Wallpaper Catalogs',
      quantity: '200 Sets',
      exportMarket: 'Italy',
    },
  });
  assert(res11.status === 201, 'POST /api/rfq/submit valid payload returns 201');
  assert(res11.json?.rfq?.id?.startsWith('RFQ-'), 'Created RFQ ID returned in response');

  // 13. Public RFQ submission with invalid/missing fields
  const res12 = await invoke(submitHandler, {
    method: 'POST',
    url: '/api/rfq/submit',
    headers: { 'content-type': 'application/json' },
    body: {
      fullName: 'Incomplete Entry',
    },
  });
  assert(res12.status === 400, 'POST /api/rfq/submit missing required fields returns 400');

  console.log(`\n--- SERVERLESS HANDLER RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
