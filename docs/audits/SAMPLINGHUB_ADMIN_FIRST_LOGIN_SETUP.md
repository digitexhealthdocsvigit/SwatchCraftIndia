# SamplingHub — Owner First Administrator Account Setup Guide

This guide enables the business owner to securely establish their private superadministrator login credentials for **SamplingHub (Digitex Studio)** without sharing passwords with developers, coding agents, or committing them to Git.

---

## 1. Designated Administrator Account

* **Authorized Admin Email:** `digitex.studio@gmail.com`
* **Admin Login URL:** [https://www.samplinghub.world/admin](https://www.samplinghub.world/admin)
* **Access Level:** Superadministrator (Export RFQ CRM & OEM Engineering Coordination)

---

## 2. Interactive Credential Generator

We have created an interactive Node.js credential generator in your workspace:
[`scripts/setup_admin_credentials.js`](file:///c:/Users/Sanika/Downloads/Sample%20Swatch%20book/scripts/setup_admin_credentials.js)

### Security Features:
* **Zero Disk Storage:** Plaintext passwords are NEVER saved to any file, log, or shell history.
* **Terminal Masking:** Character inputs are masked with asterisks (`*`) in real-time.
* **Modern Cryptography:** Generates a SHA-256 digest of `digitex.studio@gmail.com:your_password` and a 64-character high-entropy cryptographic HMAC session secret.

---

## 3. Step-by-Step Provisioning Instructions

### Step 1: Run the Generator in PowerShell or Terminal
Open your terminal in the workspace root and run:
```bash
node scripts/setup_admin_credentials.js
```

### Step 2: Enter Your Private Password
1. When prompted for the Admin Identifier, press **Enter** to accept `digitex.studio@gmail.com`.
2. Type your private superadministrator password (minimum 8 characters) and press **Enter**.
3. Re-type the password to confirm and press **Enter**.

### Step 3: Copy the Generated Environment Variables
The script will output two keys directly to your screen:
```
KEY 1:
Name:   ADMIN_PASSWORD_HASH
Value:  <your-generated-sha256-hash>
Target: Production, Preview, Development

KEY 2:
Name:   ADMIN_SESSION_SECRET
Value:  <your-generated-64-character-hex-secret>
Target: Production, Preview, Development
```

### Step 4: Add to Vercel Project Dashboard
1. Log into your [Vercel Dashboard](https://vercel.com).
2. Select the **SwatchCraftIndia** project.
3. Navigate to **Settings** → **Environment Variables**.
4. Add `ADMIN_PASSWORD_HASH` with the generated hash value. Check **Production**, **Preview**, and **Development**.
5. Add `ADMIN_SESSION_SECRET` with the generated secret value. Check **Production**, **Preview**, and **Development**.
6. Click **Save**.

### Step 5: Redeploy to Activate
In Vercel, navigate to **Deployments**, click the `...` menu on the latest deployment, and select **Redeploy**.

### Step 6: Log In
1. Visit [https://www.samplinghub.world/admin](https://www.samplinghub.world/admin).
2. Enter `digitex.studio@gmail.com`.
3. Enter the private password you created in Step 2.
4. Click **Authenticate & Enter**.
