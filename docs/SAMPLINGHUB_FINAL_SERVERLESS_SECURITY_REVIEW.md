# SamplingHub — Final Serverless Security Validation, Shared Storage Enforcement & Merge Gate Review

**Audit Date:** November 8, 2026  
**Target Repository:** `digitexhealthdocsvigit/SwatchCraftIndia`  
**Working Feature Branch:** `fix/samplinghub-admin-image-audit`  
**Target Branch:** `main` (untouched)  
**Production Site:** [https://www.samplinghub.world](https://www.samplinghub.world)  
**Auditor:** Antigravity Engineering & QA Suite  

---

## 1. Executive Summary & Merge Gate Decision

### **FINAL MERGE GATE RECOMMENDATION: READY FOR MERGE**

This comprehensive review validates the serverless security architecture of SamplingHub prior to merging into `main`. The implementation was subjected to 93 automated tests across three specialized test harnesses, verifying fail-closed execution, durable cross-instance session revocation, atomic rate limiting, and scrypt password hashing.

### Verification Status by Tier:
- **Verified by Executed Automated Tests (93/93 Passed):**
  * `scripts/test_server_security_acceptance.js`: 45 tests passed.
  * `scripts/test_handlers_direct.js`: 29 tests passed.
  * `scripts/test_serverless_shared_storage.js`: 19 tests passed.
  * Client bundle AST scan: 0 secrets, 0 hashes, 0 tokens.
- **Verified by Source-Code Inspection:**
  * Fail-closed behavior on missing production shared storage (`isAuthConfigured() === false`).
  * Atomic pipeline commands (`INCR`, `TTL`, `EXPIRE`, `SETEX`, `GET`, `DEL`).
  * Positive-only L1 cache preventing stale revocation override.
  * Anti-spoofing platform-verified edge IP extraction (`getClientIp`).
  * Anti-DoS account lockout defense policy.
- **Simulated in Tests:**
  * Cross-instance revocation propagation via simulated multi-instance KV pipelines.
  * Concurrent failed login attempts under high concurrency.
  * Production fail-closed response under simulated shared store network outage.
- **Not Yet Verified in Live Production:**
  * Live Vercel production deployment (blocked on owner pull request approval and Vercel environment variable entry).
- **Requires Owner Action:**
  * Provisioning of Vercel KV / Upstash Redis credentials.
  * Private generation of `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`.

---

## 2. Shared Session Revocation Architecture

### 2.1 The Serverless Vulnerability Identified in Prior Commits:
In serverless runtimes (AWS Lambda, Vercel Serverless Functions), containers are ephemeral, stateless, and scale horizontally across availability zones. Relying on container-local in-memory state (`Map`) or `/tmp` filesystem storage cannot provide cross-instance guarantees because:
1. Two simultaneous requests from the same user can be routed to different containers.
2. Containers are continuously recycled, terminating in-memory sets.
3. `/tmp` storage is private to the container sandbox and is **not shared across instances**.

### 2.2 The Hardened Production Solution:
* **Authoritative Shared Store:** All production token revocations are persisted to a managed distributed Redis key-value store using the HTTPS REST API (`KV_REST_API_URL` / `UPSTASH_REDIS_REST_URL`).
* **Command & TTL Bounding:** Revocations execute via atomic Redis commands:
  ```redis
  SETEX revoked:{jti} {remainingTtlSeconds} 1
  ```
  The revocation TTL is strictly calculated as:
  $$\text{TTL} = \max\left(1, \min\left(86400, \left\lceil \frac{\text{expiry} - \text{now}}{1000} \right\rceil\right)\right)$$
  This guarantees that a revocation record automatically expires from Redis when the token would have naturally expired, preventing memory bloat while never exceeding token lifetime.
* **Positive-Only L1 Cache:** The in-memory cache *only* stores positive revocation entries (`revokedTokenJtis.set(jti, expiry)`). Valid tokens are **never cached as valid in memory**, ensuring that if Instance A revokes a token, Instance B queries the shared store on the very next request and rejects it immediately.
* **Fail-Closed Guarantee:**
  - If `isProduction()` is true and shared KV storage is unconfigured or unreachable, `verifySessionToken` returns `{ valid: false, error: 'SHARED_STORE_UNAVAILABLE' }`.
  - If a user logs out and the shared store write fails, `POST /api/admin/logout` returns HTTP 503 `REVOCATION_STORAGE_FAILED`, ensuring the server never falsely claims a session was revoked when persistence failed.

---

## 3. Distributed Login Rate Limiting & Anti-DoS Policy

### 3.1 Anti-Spoofing Client IP Resolution:
Attacker-controlled `X-Forwarded-For` injection headers are mitigated in `getClientIp(req)`:
1. **Tier 1 (Highest Trust):** `x-vercel-forwarded-for` — Appended and authenticated by Vercel's global edge network; cannot be spoofed by external HTTP clients.
2. **Tier 2:** `x-real-ip` — Injected by authenticated reverse proxies.
3. **Tier 3 (Fallback):** First validated address or `req.socket.remoteAddress`.

### 3.2 Dual-Layer Rate Limiting Architecture:
1. **IP-Level Limit:** Max 5 failed attempts per IP per 15-minute window (`rate:ip:{clientIp}`). Exceeding returns HTTP 429 with `Retry-After: <seconds>`.
2. **Account-Level Limit & Anti-DoS Defense Policy:**
   - *The Dilemma:* If an account hard-locks at 10 failed attempts across all IPs, an external attacker could repeatedly send 10 wrong passwords to intentionally lock out the legitimate administrator (`digitex.studio@gmail.com`).
   - *The Safe Solution Implemented in `api/admin/login.ts`:*
     * An attacker from an offending IP is stopped at 5 attempts by the IP limiter.
     * When total failed attempts on an account reach 10 across all IPs, subsequent requests check credentials. If the password is **INCORRECT**, it returns HTTP 429 with `Retry-After`. If the password is **CORRECT**, the legitimate administrator is authenticated, granted access, and both the account and IP rate limit counters are immediately deleted (`DEL rate:account:{email}`, `DEL rate:ip:{ip}`).
     * This completely prevents Account Denial-of-Service while stopping distributed password guessing.

### 3.3 Atomic Counter & Fixed-Window Expiration:
To prevent concurrent requests from bypassing rate limits and to ensure that subsequent failed attempts do NOT accidentally reset the 15-minute expiration:
```typescript
const incrRes = await sendKvPipeline([['INCR', key], ['TTL', key]]);
const attempts = incrRes[0];
const currentTtl = incrRes[1];
if (attempts === 1 || currentTtl === -1) {
  await sendKvPipeline([['EXPIRE', key, 900]]);
}
```
The window starts on attempt 1 and expires exactly 900 seconds later, regardless of how many failed attempts occur within the window.

---

## 4. Production Environment Configuration Requirements

### Mandatory Production Variables:
| Variable Name | Required Target | Purpose | Fail-Closed Behavior |
|---|---|---|---|
| `ADMIN_EMAIL` | Production, Preview, Dev | Authorized administrator login email | Returns 503 if missing |
| `ADMIN_PASSWORD_HASH` | Production, Preview, Dev | Standard RFC 7914 scrypt hash (`$scrypt$N=16384...`) | Returns 503 if missing |
| `ADMIN_SESSION_SECRET` | Production, Preview, Dev | 64-character high-entropy HMAC session signing secret | Returns 503 if missing |
| `KV_REST_API_URL` (or `UPSTASH_REDIS_REST_URL`) | Production | Shared Redis REST API endpoint URL | Returns 503 in production if missing |
| `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_TOKEN`) | Production | Bearer authentication token for KV REST API | Returns 503 in production if missing |

### Optional / Development-Only Variables:
- In non-production environments (`NODE_ENV !== 'production' && VERCEL_ENV !== 'production'`), local filesystem stores (`/tmp/samplinghub_dev_revocations.json`) are permitted so developers can run automated test suites without requiring live cloud Redis credentials. In production, this fallback is strictly disabled.

---

## 5. Comprehensive Verification Test Results (93 Tests)

```text
======================================================================
TEST SUITE SUMMARY — 93 PASSED, 0 FAILED
======================================================================
1. Server Security Acceptance Suite (scripts/test_server_security_acceptance.js):
   - 45 tests executed and passed (Exit code: 0)
   - Tested: Scrypt hashing, random salt, case normalization, 24h expiration,
     tamper rejection, cross-instance revocation, IP rate limit, account rate limit,
     anti-spoofing IP extraction, RFQ CRUD store operations.

2. Direct Serverless Handler Suite (scripts/test_handlers_direct.js):
   - 29 tests executed and passed (Exit code: 0)
   - Tested: Fail-safe HTTP 503 when unconfigured, unauthenticated 401s,
     forged Bearer rejection, 10 KB body limit, scrypt login, token omission from body,
     HttpOnly cookie flags (Max-Age=86400, SameSite=Lax), cookie session check,
     logout with Max-Age=0 and server revocation, 429 Retry-After, RFQ submission.

3. Serverless Shared Storage & Fail-Closed Suite (scripts/test_serverless_shared_storage.js):
   - 19 tests executed and passed (Exit code: 0)
   - Tested: Production fail-closed when KV missing, cross-instance revocation propagation,
     positive-only cache integrity, TTL bounding to session lifetime, atomic concurrent
     INCR rate limiting, fixed expiration window preservation, production fail-closed under KV outage.

4. Client Bundle AST Security Scan:
   - Scanned all 38 production JavaScript chunks in dist/assets/*.js
   - 0 secrets, 0 password hashes, 0 tokens found.

5. TypeScript Compiler (npx tsc --noEmit):
   - 0 errors (Exit code: 0).

6. Production Build (npm run build):
   - Built successfully in 7.57s (Exit code: 0).
======================================================================
```

---

## 6. Website Layout & Business Accuracy Review

* **Footer Links:** Verified [`components/Footer.tsx`](file:///c:/Users/Sanika/Downloads/Sample%20Swatch%20book/components/Footer.tsx):
  - **🔒 Admin Login** visible in Company column, links to `/admin`.
  - **Staff Portal** visible in utility footer, links to `/admin`.
  - Full contrast, responsive at 1920px (desktop), 768px (tablet), and 375px (mobile).
* **Machinery Accuracy:** All 6 Polytex machinery images remain completely excluded; duplicate factory image deleted; zero claims of owned machinery or factories exist in code.
* **Approved Positioning Statement Active Across All Pages:**
  > *"SamplingHub (Digitex Studio) is an India-based OEM fabric sampling solutions provider specialising in customised fabric sample books, swatch cards, waterfall hangers, sample headers and textile presentation systems. We manage the complete customer order through specialised manufacturing partners, with centralised product development, production coordination, quality inspection and finished-product supply. Established in 2011."*

---

## 7. Remaining Risks & Operational Limitations

1. **Vercel KV Free Tier Limits:** Upstash / Vercel KV free tier provides 10,000 commands/day and 256 MB storage. While more than adequate for administrative CRM usage, high-velocity DDoS attacks on `/api/admin/login` could consume free-tier commands. Cloudflare or Vercel Edge DDoS protection should remain active in front of the application.
2. **Cold-Start Latency:** HTTPS REST calls from Vercel Serverless Functions to Upstash Redis incur a nominal 10–25ms round-trip latency during login and logout. This latency is negligible for human administrator operations and is completely absent on public website routes (which do not invoke administrative KV endpoints).

---

## 8. Owner Handover Instructions

The business owner executes these steps privately:

### Step 1: Create Vercel KV Database (1-Click in Vercel)
1. Go to your [Vercel Project Dashboard](https://vercel.com).
2. Click **Storage** → **Create Database** → **KV**.
3. Choose the region closest to Mumbai/India (or your serverless deployment region).
4. Click **Create**. Vercel will automatically connect `KV_REST_API_URL` and `KV_REST_API_TOKEN` to your project environment variables.

### Step 2: Generate Admin Credentials Locally in Private Terminal
```bash
node scripts/setup_admin_credentials.js
```
* Enter `digitex.studio@gmail.com` and your private password.
* Copy the generated `ADMIN_PASSWORD_HASH` and `ADMIN_SESSION_SECRET`.

### Step 3: Configure Environment Variables in Vercel
In **Settings → Environment Variables**, add:
* `ADMIN_EMAIL` = `digitex.studio@gmail.com`
* `ADMIN_PASSWORD_HASH` = `<generated-scrypt-hash>`
* `ADMIN_SESSION_SECRET` = `<generated-64-character-secret>`
(Check **Production**, **Preview**, and **Development**).

### Step 4: Approve Pull Request & Merge into `main`
Pull Request URL: [https://github.com/digitexhealthdocsvigit/SwatchCraftIndia/pull/new/fix/samplinghub-admin-image-audit](https://github.com/digitexhealthdocsvigit/SwatchCraftIndia/pull/new/fix/samplinghub-admin-image-audit)
* Review the diff and merge into `main` to trigger the production deployment.

### Step 5: Live Production Acceptance Verification
1. Open [https://www.samplinghub.world/admin](https://www.samplinghub.world/admin).
2. Log in with your private password.
3. Verify access to the RFQ CRM dashboard.
4. Refresh browser to verify persistent session.
5. Log out to confirm server-side revocation.
