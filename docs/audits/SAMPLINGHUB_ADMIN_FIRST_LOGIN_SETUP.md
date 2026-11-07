# SamplingHub — Owner First Administrator Account Setup Guide

This guide enables the business owner to securely establish their private superadministrator login credentials for **SamplingHub (Digitex Studio)** without sharing passwords with developers, coding agents, or committing them to Git.

---

## 1. Designated Administrator Account

* **Authorized Admin Email:** `digitex.studio@gmail.com` (configurable via `ADMIN_EMAIL`)
* **Admin Login URL:** [https://www.samplinghub.world/admin](https://www.samplinghub.world/admin)
* **Access Level:** Superadministrator (Export RFQ CRM & OEM Engineering Coordination)
* **Session Lifecycle:** 24-hour active session (`Max-Age=86400`), transmitted exclusively via an `HttpOnly; SameSite=Lax; Secure` cookie. Zero credentials or tokens are stored in browser `localStorage`.

---

## 2. Interactive Credential Generator

We have provided an interactive Node.js credential generator in your workspace:
[`scripts/setup_admin_credentials.js`](file:///c:/Users/Sanika/Downloads/Sample%20Swatch%20book/scripts/setup_admin_credentials.js)

### Cryptographic & Security Features:
* **Zero Disk Storage:** Plaintext passwords, generated hashes, and HMAC secrets are NEVER saved to any file, log, or shell history. All computations occur purely in process memory.
* **Terminal Masking:** Character inputs are masked with asterisks (`*`) in real-time.
* **Standard Scrypt Key Derivation (RFC 7914 / NIST SP 800-132):**
  - Algorithm: `scrypt`
  - CPU/Memory Cost ($N$): `16384`
  - Block Size ($r$): `8`
  - Parallelization ($p$): `1`
  - Salt: Cryptographically random 16-byte salt (generated via `crypto.randomBytes(16)`)
  - Output Key Length: `64` bytes
  - Standard Serialized Format: `$scrypt$N=16384,r=8,p=1$<saltHex>$<hashHex>`
* **HMAC Session Secret:** Generates a 64-character (256-bit) high-entropy cryptographic HMAC-SHA256 session secret.

---

## 3. Step-by-Step Provisioning Instructions

### Step 1: Run the Generator in Terminal
Open your terminal in the workspace root and run:
```bash
node scripts/setup_admin_credentials.js
```

### Step 2: Enter Your Private Password
1. When prompted for the Admin Identifier, press **Enter** to accept `digitex.studio@gmail.com` (or specify your preferred administrator email).
2. Type your private superadministrator password (minimum 8 characters) and press **Enter**.
3. Re-type the password to confirm and press **Enter**.

### Step 3: Copy the Generated Environment Variables
The script will output three keys directly to your terminal screen:
```
KEY 1:
Name:   ADMIN_EMAIL
Value:  digitex.studio@gmail.com
Target: Production, Preview, Development

KEY 2:
Name:   ADMIN_PASSWORD_HASH
Value:  $scrypt$N=16384,r=8,p=1$<16-byte-salt-hex>$<64-byte-hash-hex>
Target: Production, Preview, Development

KEY 3:
Name:   ADMIN_SESSION_SECRET
Value:  <64-character-hex-secret>
Target: Production, Preview, Development
```

### Step 4: Add to Vercel Project Dashboard
1. Log into your [Vercel Dashboard](https://vercel.com).
2. Select the **SwatchCraftIndia** project.
3. Navigate to **Settings** → **Environment Variables**.
4. Add `ADMIN_EMAIL` with value `digitex.studio@gmail.com`. Check **Production**, **Preview**, and **Development**.
5. Add `ADMIN_PASSWORD_HASH` with the generated `$scrypt$...` value. Check **Production**, **Preview**, and **Development**.
6. Add `ADMIN_SESSION_SECRET` with the generated secret value. Check **Production**, **Preview**, and **Development**.
7. Click **Save**.

### Step 5: Redeploy to Activate
In Vercel, navigate to **Deployments**, click the `...` menu on the latest deployment, and select **Redeploy**.

### Step 6: Log In
1. Visit [https://www.samplinghub.world/admin](https://www.samplinghub.world/admin) (or click the **🔒 Admin Login** link in the footer).
2. Enter your administrator email (`digitex.studio@gmail.com`).
3. Enter the private password you created in Step 2.
4. Click **Authenticate & Enter**.
5. The server issues an `HttpOnly; SameSite=Lax; Secure` cookie valid for 24 hours. The login response contains only `{ success: true, email: "..." }` and zero tokens.
