# SamplingHub — Admin Security & Authorization Audit

**Audit Date:** November 2026  
**Audited Commit:** `a8c388c`  
**Target Repository:** `digitexhealthdocsvigit/SwatchCraftIndia`  
**Scope:** `api/_lib/auth.ts`, `api/admin/*`, `components/AdminLogin.tsx`, `components/AdminDashboard.tsx`, `App.tsx`, and environment configurations.

---

## 1. Executive Summary

This audit evaluated the authentication, authorization, token lifecycle, session security, and API exposure across the SamplingHub administrative stack.

While serverless endpoints (`/api/admin/login`, `/api/admin/session`, `/api/admin/rfqs`) properly check authorization headers and set `HttpOnly` cookies, **significant architectural vulnerabilities exist on the frontend and in fallback configuration**.

---

## 2. Vulnerability Log & Detailed Findings

### [SEC-01] Client-Side Credential Digest & Verification Exposed in Public Bundle
* **Severity:** **CRITICAL**
* **Affected File:** `components/AdminLogin.tsx` (Lines 10–19, 56–60)
* **Evidence:**
  ```typescript
  const EXPECTED_CREDENTIAL_DIGEST =
    '3732f1f3631cc628d9e17e5486db110ab515c09d458280f82cc2cc6a29252fd2';

  // Client-side cryptographic verification fallback
  const normalized = `${email.trim().toLowerCase()}:${pass}`;
  const hash = await sha256Hex(normalized);
  if (hash === EXPECTED_CREDENTIAL_DIGEST) {
    onLogin();
  }
  ```
* **Business Impact:** Any attacker can inspect the client-side JavaScript chunk (`AdminLogin-BMQx3ZZO.js`), reverse the SHA-256 hash or manipulate `onLogin()` in browser memory to gain access to administrative UI components.
* **Remediation:** Remove `EXPECTED_CREDENTIAL_DIGEST` and all client-side hash verification completely. The frontend form must only submit credentials to `/api/admin/login` and rely strictly on server response.
* **Status:** Remediated on audit branch.

---

### [SEC-02] Insecure Client-Side Admin Route Guarding
* **Severity:** **HIGH**
* **Affected File:** `App.tsx` (Lines 121–123, 138–140)
* **Evidence:**
  ```typescript
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('samplinghub_admin_session') === 'true';
  });
  ```
* **Business Impact:** Any user can open their browser developer tools, execute `localStorage.setItem('samplinghub_admin_session', 'true')`, and navigate directly to the admin dashboard screen without valid server authentication.
* **Remediation:** Do not trust a raw boolean in `localStorage`. On component mount, call `/api/admin/session` using the stored session token / cookie. If the API returns 401, immediately reset local state and redirect to `/admin-login`.
* **Status:** Remediated on audit branch.

---

### [SEC-03] Hardcoded Fallback Secrets in Serverless Auth Helper
* **Severity:** **HIGH**
* **Affected File:** `api/_lib/auth.ts` (Lines 3–10)
* **Evidence:**
  ```typescript
  const SECRET_KEY =
    process.env.ADMIN_SESSION_SECRET ||
    'samplinghub-b2b-export-secret-key-mumbai-thane-2026';

  const EXPECTED_DIGEST =
    process.env.ADMIN_PASSWORD_HASH ||
    '3732f1f3631cc628d9e17e5486db110ab515c09d458280f82cc2cc6a29252fd2';
  ```
* **Business Impact:** If environment variables `ADMIN_SESSION_SECRET` or `ADMIN_PASSWORD_HASH` are not configured in Vercel project settings, fallback keys hardcoded in Git are active, allowing token forgery.
* **Remediation:** Fail securely: If `ADMIN_SESSION_SECRET` or `ADMIN_PASSWORD_HASH` is undefined in production, reject authentication requests with a 500 configuration error rather than falling back to public default strings.
* **Status:** Remediated on audit branch.

---

### [SEC-04] Timing Attack Vulnerability in Signature and Hash Verification
* **Severity:** **MEDIUM**
* **Affected File:** `api/_lib/auth.ts` (Lines 15, 32)
* **Evidence:**
  ```typescript
  return hash === EXPECTED_DIGEST;
  if (signature !== expectedSig) return { valid: false };
  ```
* **Business Impact:** Standard JavaScript string equality operators (`===` and `!==`) terminate early upon comparing the first non-matching byte, leaking timing clues to remote attackers attempting to brute-force hashes or HMAC signatures.
* **Remediation:** Use `crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))` for all credential hash and HMAC signature comparisons.
* **Status:** Remediated on audit branch.

---

### [SEC-05] Missing Login Rate Limiting
* **Severity:** **MEDIUM**
* **Affected File:** `api/admin/login.ts`
* **Evidence:** No rate limiter, IP-based delay, or exponential backoff exists.
* **Business Impact:** Attackers can send automated high-concurrency brute-force requests to `/api/admin/login`.
* **Remediation:** Introduce an in-memory or Redis/KV rate-limiting window (e.g. maximum 5 failed attempts per 15-minute window per IP).
* **Status:** Remediated on audit branch.

---

## 3. Server Authorization Testing Verification

Direct testing was performed against the live production deployment (`https://www.samplinghub.world`):

| Test Case | Method & URL | Credentials / Header | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| Unauthenticated RFQ Read | `GET /api/admin/rfqs` | None | `401 Unauthorized` | `{"error":"Unauthorized: Admin session required"}` (401) | **PASS** |
| Unauthenticated Session Check | `GET /api/admin/session` | None | `401 Unauthorized` | `{"authenticated":false}` (401) | **PASS** |
| Invalid Login Attempt | `POST /api/admin/login` | Bad email/password | `401 Unauthorized` | `{"error":"Invalid credentials. Access Denied."}` (401) | **PASS** |
| Authorized RFQ Retrieval | `GET /api/admin/rfqs` | Bearer Token | `200 OK` | `{"success":true,"count":3,"rfqs":[...]}` (200) | **PASS** |
| Cookie-Based Auth | `GET /api/admin/rfqs` | `Cookie: samplinghub_admin_token=...` | `200 OK` | `{"success":true,"count":3,"rfqs":[...]}` (200) | **PASS** |
