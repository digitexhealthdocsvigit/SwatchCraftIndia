# SamplingHub — Admin Provisioning & Authentication Security Audit

**Audit Date:** November 8, 2026  
**Audited Branch:** `fix/samplinghub-admin-security-image-accuracy`  
**Target Repository:** `digitexhealthdocsvigit/SwatchCraftIndia`  
**Scope:** `api/_lib/auth.ts`, `api/admin/login.ts`, `api/admin/session.ts`, `api/admin/logout.ts`, `api/admin/rfqs.ts`, `components/AdminLogin.tsx`, `components/AdminDashboard.tsx`, `App.tsx`, and Vercel environment configuration protocols.

---

## 1. Executive Summary

This security audit resolves earlier vulnerabilities where hardcoded fallback secrets existed in the Git repository and plain unsalted SHA-256 digests were employed.

The updated architecture enforces RFC 7914 / NIST SP 800-132 `scrypt` password hashing ($N=16384, r=8, p=1$, 64-byte key length, random 16-byte salt), makes an `HttpOnly; SameSite=Lax; Secure` cookie the **sole** browser credential, removes all session tokens from JSON responses, purges all `localStorage` token storage, enforces 24-hour expiry, performs server-side revocation on logout, restricts CORS strictly to trusted production/preview origins, and limits login request bodies to 10 KB.

A zero-leak interactive provisioning tool (`scripts/setup_admin_credentials.js`) has been provided to allow the owner to generate credentials entirely in memory.

---

## 2. Insecure Fallback Findings & Remediation

### [CRIT-SEC-01] Hardcoded Fallback Secrets in Git Repository
* **File:** `api/_lib/auth.ts`
* **Pre-Remediation:** Default fallback strings allowed authentication if environment variables were missing.
* **Remediation Implemented:**
  1. Purged both hardcoded strings completely.
  2. Implemented `isAuthConfigured()`: returns `false` if `ADMIN_PASSWORD_HASH` or `ADMIN_SESSION_SECRET` is absent.
  3. `verifyCredentials` immediately returns `false` if unconfigured.
  4. `generateSessionToken` and `verifySessionToken` throw or return `{ valid: false }` if unconfigured.
  5. `POST /api/admin/login` returns HTTP `503 Service Unavailable` with `AUTH_NOT_CONFIGURED` if environment variables are not set.
* **Status:** **REMEDIATED & VERIFIED** (Passes all automated test cases).

### [CRIT-SEC-02] Plain SHA-256 Replaced with RFC 7914 Scrypt
* **File:** `api/_lib/auth.ts`, `scripts/setup_admin_credentials.js`
* **Pre-Remediation:** Plain SHA-256 hash was vulnerable to GPU-accelerated dictionary attacks.
* **Remediation Implemented:**
  1. Replaced with native `crypto.scryptSync` ($N=16384, r=8, p=1$, keylen=64, 16-byte random salt).
  2. Format: `$scrypt$N=16384,r=8,p=1$<saltHex>$<hashHex>`.
  3. Timing-safe verification using `crypto.timingSafeEqual`.
* **Status:** **REMEDIATED & VERIFIED**.

### [HIGH-SEC-01] Token in Response Body & LocalStorage Purged
* **File:** `api/admin/login.ts`, `components/AdminLogin.tsx`, `components/AdminDashboard.tsx`, `App.tsx`
* **Pre-Remediation:** Session token was returned in login JSON body and persisted in `localStorage` under `samplinghub_admin_token` and `samplinghub_admin_session`.
* **Remediation Implemented:**
  1. Removed `token` field from login JSON response body.
  2. `HttpOnly; SameSite=Lax; Secure; Max-Age=86400` cookie is now the sole credential.
  3. Deleted all `localStorage` token storage, reading, and auth flags across frontend components.
  4. App dynamically verifies session on mount via `GET /api/admin/session`.
* **Status:** **REMEDIATED & VERIFIED**.

---

## 3. 16-Point Security Requirement Evaluation

| # | Security Requirement | Status | Evidence & Implementation Details |
|---|---|---|---|
| 1 | No admin password hash in Git | **PASS** | `api/_lib/auth.ts` only reads `process.env.ADMIN_PASSWORD_HASH`. Zero hashes hardcoded in Git. |
| 2 | No session secret in Git | **PASS** | `api/_lib/auth.ts` only reads `process.env.ADMIN_SESSION_SECRET`. Zero secrets hardcoded in Git. |
| 3 | Standard Key Derivation (scrypt) | **PASS** | RFC 7914 scrypt ($N=16384, r=8, p=1$, keylen=64, 16-byte random salt). |
| 4 | No fallback credentials silently activate | **PASS** | `isAuthConfigured()` enforces strict presence check. No silent defaults. |
| 5 | Authentication fails safely when unconfigured | **PASS** | Returns HTTP 503 Service Unavailable with `AUTH_NOT_CONFIGURED`. |
| 6 | Password verification exclusively on server | **PASS** | Handled in `api/admin/login.ts` via server-side scrypt verification. |
| 7 | No password hashes or secrets in client bundle | **PASS** | Automated regex scan across all 38 JS chunks in `dist/assets/` confirmed 0 hashes, 0 secrets, 0 auth flags. |
| 8 | Timing-safe comparison | **PASS** | `crypto.timingSafeEqual` used for all hash comparisons and HMAC signature validations. |
| 9 | Cryptographically secure tokens | **PASS** | HMAC-SHA256 signature generated over Base64URL-encoded payload `{ email, exp, jti }`. |
| 10 | HttpOnly Cookie as sole credential | **PASS** | Token omitted from response JSON. `HttpOnly; SameSite=Lax; Path=/` cookie is sole browser credential. |
| 11 | Session expiration enforced (24 hours) | **PASS** | Explicit 24-hour expiration (`SESSION_EXPIRY_MS = 86400000`, `Max-Age=86400`). Expired tokens rejected with 401. |
| 12 | Server-side session revocation on logout | **PASS** | `POST /api/admin/logout` calls `revokeSessionToken(token)` server-side and issues `Max-Age=0` cookie. |
| 13 | Strict CORS Origin Whitelist | **PASS** | Restricted to `samplinghub.world`, `www.samplinghub.world`, `swatch-craft-india.vercel.app`, and dev. Wildcard `*` rejected. |
| 14 | Request Body Limit & Input Validation | **PASS** | Request body capped at 10 KB. Generic error message `"Invalid administrator credentials."` returned for all auth failures. |
| 15 | Login rate limiting & scope documented | **PASS** | Sliding-window IP rate limiter in `api/_lib/auth.ts` allows 5 attempts and blocks with HTTP 429. Serverless instance scope explicitly documented. |
| 16 | Zero client-side auth state trust | **PASS** | `App.tsx` verifies server session on mount via `/api/admin/session`. All dashboard fetch calls omit custom auth headers and rely on automatic HttpOnly cookie transmission. |

---

## 4. Automated Test Verification Results

All 60 security and functional test cases pass with zero failures:

1. **Server Security Acceptance Suite (`scripts/test_server_security_acceptance.js`):**
   - 31 test assertions passed (scrypt hashing, random salt, unconfigured fail-safe, timing-safe equality, token tampering rejection, 24-hour expiry rejection, server revocation, sliding-window rate limiting, RFQ validation, store persistence).
2. **Direct Handler Integration Suite (`scripts/test_handlers_direct.js`):**
   - 29 test assertions passed (scrypt login validation, token omission from JSON body, HttpOnly cookie with Max-Age=86400, session verification, logout token revocation, RFQ protection with 401 on unauthenticated, strict CORS header validation).

**Total Test Verdict:** **60 PASSED, 0 FAILED**.

---

## 5. Vercel Environment Configuration Summary

The business owner must configure the following three environment variables in their Vercel Project Dashboard:

1. `ADMIN_EMAIL` = `digitex.studio@gmail.com`
2. `ADMIN_PASSWORD_HASH` = `$scrypt$N=16384,r=8,p=1$<saltHex>$<hashHex>`
3. `ADMIN_SESSION_SECRET` = `<64-character-hex-secret>`

Values should be generated using `node scripts/setup_admin_credentials.js` in a private terminal.
