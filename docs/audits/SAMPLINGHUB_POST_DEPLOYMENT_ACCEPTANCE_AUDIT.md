# SamplingHub — Post-Deployment Acceptance, Security & Data Integrity Audit

**Target Repository:** `digitexhealthdocsvigit/SwatchCraftIndia`  
**GitHub URL:** [https://github.com/digitexhealthdocsvigit/SwatchCraftIndia](https://github.com/digitexhealthdocsvigit/SwatchCraftIndia)  
**Production URL:** [https://www.samplinghub.world](https://www.samplinghub.world)  
**Hosting Environment:** Vercel (Edge Network + Serverless Functions)  
**Audited Commit SHA:** `a8c388c`  
**Audit Branch:** `audit/phase2-post-deployment-acceptance`  
**Date of Audit:** November 2026  
**Auditor:** Antigravity Independent Security & QA Engineering  

---

## 1. Executive Summary

An independent, evidence-based post-deployment audit was conducted following the restoration and feature updates reported in commit `a8c388c`.

### Acceptance Decision: **CONDITIONAL ACCEPTANCE WITH CRITICAL REMEDIATION REQUIRED**

While the visual design and stylesheet build pipeline have been successfully restored (resolving the zero-CSS crash and delivering 20/20 responsive routes with multi-angle photography), **the administrative and data storage layers cannot be certified as production-safe without immediate remediation**.

### Critical Evidence-Backed Findings:
1. **Ephemeral RFQ Storage (Data Loss Risk):** Inquiries submitted via `/api/rfq/submit` are saved only to `os.tmpdir()` (`/tmp`) and in-memory variables within ephemeral serverless function instances. Testing on the live production deployment confirmed that an RFQ submitted via `/api/rfq/submit` was **not visible** to the admin API on a subsequent invocation because separate serverless containers do not share memory or temporary disk storage.
2. **Client-Side Auth Bypass & Secret Leak:** `AdminLogin.tsx` exposes `EXPECTED_CREDENTIAL_DIGEST` in the compiled client-side JavaScript bundle and contains a client-side verification fallback. In `App.tsx`, administrative route access is gated purely by `localStorage.getItem('samplinghub_admin_session') === 'true'`, allowing any user to view dashboard screens without server authentication.
3. **Unverified Partner & Buyer Data:** The OEM Partner Register (4 units) and Global Buyers Directory (5 accounts) in `AdminDashboard.tsx` consist of hardcoded demonstration fixtures that have not been verified against actual business agreements.
4. **Export Pro-Forma Landed DDP Disclaimers:** The calculator claims "Est. Total Landed (DDP)" based on crude static weight multipliers without destination tariff/VAT calculations or carrier quotes.

---

## 2. Comprehensive Acceptance Matrix

| Area | Result | Actual Evidence | Remaining Action |
|---|---|---|---|
| **Git and Release Integrity** | **VERIFIED** | HEAD commit on `main` is `a8c388c`. Complete diff of 25 files verified. Branch `audit/phase2-post-deployment-acceptance` created. | Maintain branch isolation; never push unreviewed fixes directly to `main`. |
| **Authentication** | **FAILED** | Server-side verification works in `/api/admin/login`, but `AdminLogin.tsx` retains a client-side fallback hash in the public JS bundle. Login has no rate limiting. | Remove client hash from frontend bundle; enforce strict server-only auth; add rate limiting. |
| **API Authorization** | **VERIFIED (PARTIAL)** | Live probe of `GET /api/admin/rfqs` returned `401 Unauthorized` without token, and `200 OK` with valid Bearer token. However, `AdminDashboard.tsx` does not redirect on 401. | Enforce client-side route ejection when `/api/admin/session` or `/api/admin/rfqs` returns 401. |
| **RFQ Permanent Storage** | **FAILED (CRITICAL)** | `api/_lib/store.ts` uses `os.tmpdir()`. Production test submission `RFQ-2026-2347` was lost between serverless lambda warm starts and failed to appear in `GET /api/admin/rfqs`. | Connect to durable database (PostgreSQL / Supabase / Vercel KV) or reliable webhook forwarder. |
| **CRM Functionality** | **VERIFIED (PARTIAL)** | Search, filter, status update, note logging, and partner assignment UI works in browser state, but updates do not persist across serverless recycles. | Persist CRM workflow updates to a permanent database. |
| **Partner Register Accuracy** | **REQUIRES CONFIRMATION** | 4 OEM partner units (Unit A, B, C, D) are hardcoded demonstration fixtures. | Label as sample records pending management confirmation; allow editable partner configuration. |
| **Export Calculator** | **REQUIRES REMEDIATION** | Claims "Est. Total Landed (DDP)" using flat $7.50/kg air and $2.20/kg sea formulas without destination duties or VAT. | Rebrand as "Indicative Benchmark Estimate", add legal disclaimer, and provide editable assumption register. |
| **Public Website Routes** | **VERIFIED** | Automated live probe of all 20 canonical routes returned `HTTP 200 OK` with valid HTML and title tags. | Maintain regular uptime monitoring. |
| **RFQ / Contact Forms** | **VERIFIED** | Form submission triggers `/api/rfq/submit` (`HTTP 201 Created`), FormSubmit email handoff, and local backup. | Secure persistent database storage for the serverless endpoint. |
| **Visual Restoration** | **VERIFIED** | Inter typography (300-900), brand colors (`#1e3a5f`, `#8B6F47`, `#0d7377`), spacing, and multi-angle carousels match design specs. | Continue automated regression checks. |
| **SEO and Metadata** | **VERIFIED** | `index.html` JSON-LD schema, canonical tags, `sitemap.xml`, and `robots.txt` live and returning `HTTP 200`. | Submit fresh sitemap to Google Search Console. |
| **Production Deployment** | **VERIFIED** | Vercel production deployment matches commit `a8c388c`. Live CSS bundle (`index-BTGv3YkG.css`) is 54.15 kB. | Fix security & storage flaws on audit branch before tagging release. |

---

## 3. High-Priority Issues Requiring Immediate Action

1. **[ISSUE-SEC-01] Remove Client-Side Password Digest:** Delete `EXPECTED_CREDENTIAL_DIGEST` and client-side fallback hash verification from `components/AdminLogin.tsx`.
2. **[ISSUE-DAT-01] Implement Durable RFQ Storage:** Transition `api/_lib/store.ts` from ephemeral serverless `/tmp` to a persistent data store or verified webhook service.
3. **[ISSUE-SEC-02] Server-Guarded Admin Route:** Update `App.tsx` and `AdminDashboard.tsx` to verify session token via `/api/admin/session` on initial load and eject to login if unauthenticated.
4. **[ISSUE-BIZ-01] Label Demonstration Data:** Clearly mark `OEM_PARTNERS` and `GLOBAL_BUYERS` in `AdminDashboard.tsx` as demonstration fixtures until confirmed by business management.
5. **[ISSUE-CAL-01] Calculator Disclaimers:** Clarify that export calculator figures are indicative benchmark estimates and do not constitute confirmed carrier quotations or guaranteed landed DDP costs.
