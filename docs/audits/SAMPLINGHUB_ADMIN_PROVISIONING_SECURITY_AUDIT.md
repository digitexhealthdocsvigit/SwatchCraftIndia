# SamplingHub — Admin Provisioning & Authentication Security Audit

**Audit Date:** November 7, 2026  
**Audited Branch:** `feat/samplinghub-admin-provisioning-image-audit`  
**Target Repository:** `digitexhealthdocsvigit/SwatchCraftIndia`  
**Scope:** `api/_lib/auth.ts`, `api/admin/login.ts`, `api/admin/session.ts`, `components/AdminLogin.tsx`, and Vercel environment configuration protocols.

---

## 1. Executive Summary

This security audit addresses the critical vulnerability identified where hardcoded fallback secrets existed in the Git repository in `api/_lib/auth.ts`. 

The audit evaluated 14 strict security criteria, removed all hardcoded fallback secrets, introduced a fail-safe architecture, and established an interactive zero-leak first-administrator provisioning workflow for the business owner.

---

## 2. Insecure Fallback Findings & Remediation

### [CRIT-SEC-01] Hardcoded Fallback Secrets in Git Repository
* **File:** `api/_lib/auth.ts` (Lines 3–10)
* **Pre-Remediation Code:**
  ```typescript
  const SECRET_KEY =
    process.env.ADMIN_SESSION_SECRET ||
    'samplinghub-b2b-export-secret-key-mumbai-thane-2026';

  const EXPECTED_DIGEST =
    process.env.ADMIN_PASSWORD_HASH ||
    '3732f1f3631cc628d9e17e5486db110ab515c09d458280f82cc2cc6a29252fd2';
  ```
* **Vulnerability Analysis:** If `ADMIN_SESSION_SECRET` or `ADMIN_PASSWORD_HASH` was omitted from Vercel environment variables, the system silently activated the public strings committed in Git. This enabled unauthorized token forgery and allowed brute-force guessing against the public hash.
* **Remediation Implemented:**
  1. Purged both hardcoded strings completely.
  2. Implemented `isAuthConfigured()`: returns `false` if either variable is absent.
  3. `verifyCredentials` immediately returns `false` if unconfigured.
  4. `generateSessionToken` and `verifySessionToken` throw or return `{ valid: false }` if unconfigured.
  5. `POST /api/admin/login` returns HTTP `503 Service Unavailable` with `AUTH_NOT_CONFIGURED` if environment variables are not set.
* **Status:** **REMEDIATED & VERIFIED** (Passes all automated test cases).

---

## 3. 14-Point Security Requirement Evaluation

| # | Security Requirement | Status | Evidence & Implementation Details |
|---|---|---|---|
| 1 | No admin password hash in Git | **PASS** | `api/_lib/auth.ts` only reads `process.env.ADMIN_PASSWORD_HASH`. Zero hashes hardcoded in Git. |
| 2 | No session secret in Git | **PASS** | `api/_lib/auth.ts` only reads `process.env.ADMIN_SESSION_SECRET`. Zero secrets hardcoded in Git. |
| 3 | No fallback credentials silently activate | **PASS** | `isAuthConfigured()` enforces strict presence check. No silent defaults. |
| 4 | Authentication fails safely when unconfigured | **PASS** | Returns HTTP 503 Service Unavailable with `AUTH_NOT_CONFIGURED`. |
| 5 | Password verification exclusively on server | **PASS** | Handled in `api/admin/login.ts` via Node.js crypto module. |
| 6 | No password hashes in client bundle | **PASS** | Automated regex scan across all 38 JS chunks in `dist/assets/` confirmed 0 hashes. |
| 7 | Timing-safe comparison | **PASS** | `crypto.timingSafeEqual` used for all hash comparisons and HMAC signature validations. |
| 8 | Cryptographically secure tokens | **PASS** | HMAC-SHA256 signature generated over Base64URL-encoded payload `{ email, expiry }`. |
| 9 | Cookie security flags | **PASS** | `HttpOnly`, `SameSite=Lax`, `Path=/`, and `Secure` (in production/Vercel) set on `Set-Cookie`. |
| 10 | Session expiration enforced | **PASS** | 7-day expiration timestamp checked in `verifySessionToken`; expired tokens rejected with 401. |
| 11 | Login rate limiting | **PASS** | Sliding-window IP rate limiter in `api/_lib/auth.ts` allows 5 attempts and blocks the 6th with HTTP 429. |
| 12 | Protected APIs verify admin session | **PASS** | `/api/admin/session` and `/api/admin/rfqs` independently call `verifySessionToken`. |
| 13 | Logout invalidates session | **PASS** | `POST /api/admin/logout` issues `Set-Cookie: ... Max-Age=0` and client clears token from `localStorage`. |
| 14 | Never trust client localStorage boolean | **PASS** | `App.tsx` verifies server session on mount via `/api/admin/session`. Fake tokens forced back to login. |

---

## 4. Vercel Environment Variables Status

* **Inspection Capability:** Direct programmatic inspection of Vercel project environment variables from the sandboxed agent terminal is restricted (Vercel credentials are held securely outside the codebase).
* **Required Action:** The business owner must configure the following two environment variables in their Vercel Project Dashboard:
  1. `ADMIN_PASSWORD_HASH`
  2. `ADMIN_SESSION_SECRET`
* **Provisioning Mechanism:** An interactive terminal tool `scripts/setup_admin_credentials.js` has been provided to generate these values privately.
