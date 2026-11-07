import { EventEmitter } from 'node:events';
import loginHandler from '../api/admin/login.ts';
import sessionHandler from '../api/admin/session.ts';
import logoutHandler from '../api/admin/logout.ts';
import rfqsHandler from '../api/admin/rfqs.ts';
import submitHandler from '../api/rfq/submit.ts';
import { generateSessionToken, resetLoginRateLimit } from '../api/_lib/auth.ts';

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
  writeHead(code, headers) {
    this.statusCode = code;
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        this.setHeader(k, v);
      }
    }
  }
  end(chunk) {
    if (chunk) this.body += chunk;
    this.emit('finish');
  }
}

class MockRequest extends EventEmitter {
  constructor({ method = 'GET', url = '/', headers = {}, body = null } = {}) {
    super();
    this.method = method;
    this.url = url;
    this.headers = headers;
    this.socket = { remoteAddress: '127.0.0.1' };
    this._payload = body;
  }
  send() {
    process.nextTick(() => {
      if (this._payload) {
        this.emit('data', typeof this._payload === 'string' ? this._payload : JSON.stringify(this._payload));
      }
      this.emit('end');
    });
  }
}

async function invoke(handler, { method = 'GET', url = '/', headers = {}, body = null }) {
  const req = new MockRequest({ method, url, headers, body });
  const res = new MockResponse();
  const finished = new Promise((resolve) => res.on('finish', resolve));
  req.send();
  await handler(req, res);
  await finished;
  let json = null;
  try {
    json = JSON.parse(res.body);
  } catch {}
  return { status: res.statusCode, headers: res.headers, body: res.body, json };
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
  resetLoginRateLimit('127.0.0.1');
  const res4 = await invoke(loginHandler, {
    method: 'POST',
    url: '/api/admin/login',
    headers: { 'content-type': 'application/json' },
    body: { email: 'wrong@admin.com', password: 'wrongpassword' },
  });
  assert(res4.status === 401, 'Invalid credentials returns 401');

  // 5. Missing email/password on login
  const res5 = await invoke(loginHandler, {
    method: 'POST',
    url: '/api/admin/login',
    headers: { 'content-type': 'application/json' },
    body: {},
  });
  assert(res5.status === 400, 'Empty login payload returns 400');

  // 6. Valid Bearer token session check
  const validToken = generateSessionToken('admin@samplinghub.world');
  const res6 = await invoke(sessionHandler, {
    method: 'GET',
    url: '/api/admin/session',
    headers: { authorization: `Bearer ${validToken}` },
  });
  assert(res6.status === 200, 'Valid Bearer token /api/admin/session returns 200');
  assert(res6.json?.authenticated === true && res6.json?.user?.email === 'admin@samplinghub.world', 'Returns authenticated user object');

  // 7. Valid Bearer token RFQ retrieval
  const res7 = await invoke(rfqsHandler, {
    method: 'GET',
    url: '/api/admin/rfqs',
    headers: { authorization: `Bearer ${validToken}` },
  });
  assert(res7.status === 200, 'Valid Bearer token /api/admin/rfqs returns 200');
  assert(Array.isArray(res7.json?.rfqs) && res7.json?.rfqs.length > 0, 'Returns RFQ list array');

  // 8. Valid Cookie token RFQ retrieval
  const res8 = await invoke(rfqsHandler, {
    method: 'GET',
    url: '/api/admin/rfqs',
    headers: { cookie: `samplinghub_admin_token=${validToken}` },
  });
  assert(res8.status === 200, 'Valid HttpOnly Cookie token /api/admin/rfqs returns 200');

  // 9. Logout handler
  const res9 = await invoke(logoutHandler, { method: 'POST', url: '/api/admin/logout' });
  assert(res9.status === 200, 'POST /api/admin/logout returns 200');
  assert(res9.headers['set-cookie']?.includes('Max-Age=0'), 'Logout clears cookie with Max-Age=0');

  // 10. Rate limiting blocks after 5 failed attempts
  resetLoginRateLimit('127.0.0.1');
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
  resetLoginRateLimit('127.0.0.1');

  // 11. Public RFQ submission
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

  // 12. Public RFQ submission with invalid/missing fields
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
