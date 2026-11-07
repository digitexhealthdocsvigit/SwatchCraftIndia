import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Returns true if all three required environment variables are set:
 * ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_SESSION_SECRET.
 * Fails safely: does NOT activate hardcoded default credentials in production.
 */
export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL &&
    process.env.ADMIN_PASSWORD_HASH &&
    process.env.ADMIN_SESSION_SECRET
  );
}

export function getConfiguredAdminEmail(): string {
  const email = process.env.ADMIN_EMAIL;
  if (!email) {
    throw new Error('ADMIN_EMAIL environment variable is not configured on the server.');
  }
  return email.trim().toLowerCase();
}

export function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET environment variable is not configured on the server.');
  }
  return secret;
}

export function getExpectedPasswordDigest(): string {
  const digest = process.env.ADMIN_PASSWORD_HASH;
  if (!digest) {
    throw new Error('ADMIN_PASSWORD_HASH environment variable is not configured on the server.');
  }
  return digest;
}

/**
 * Standard scrypt password hashing (RFC 7914 / NIST SP 800-132).
 * Uses work factors N=16384, r=8, p=1, keylen=64, and a 16-byte random salt.
 * Encoded format: $scrypt$N=16384,r=8,p=1$<salt-hex>$<hash-hex>
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const N = 16384;
  const r = 8;
  const p = 1;
  const keylen = 64;
  const derivedKey = crypto.scryptSync(password, salt, keylen, { N, r, p });
  return `$scrypt$N=${N},r=${r},p=${p}$${salt}$${derivedKey.toString('hex')}`;
}

/**
 * Verifies a password against an encoded scrypt hash using timing-safe buffer comparison.
 */
export function verifyPassword(password: string, encodedHash: string): boolean {
  if (!encodedHash || typeof encodedHash !== 'string') return false;

  if (encodedHash.startsWith('$scrypt$')) {
    const parts = encodedHash.split('$');
    // Format: $scrypt$N=16384,r=8,p=1$<salt>$<hash>
    if (parts.length !== 5) return false;
    const paramsStr = parts[2];
    const salt = parts[3];
    const expectedHashHex = parts[4];

    let N = 16384;
    let r = 8;
    let p = 1;

    paramsStr.split(',').forEach((param) => {
      const [k, v] = param.split('=');
      if (k === 'N') N = parseInt(v, 10);
      if (k === 'r') r = parseInt(v, 10);
      if (k === 'p') p = parseInt(v, 10);
    });

    try {
      const derivedKey = crypto.scryptSync(password, salt, 64, { N, r, p });
      const bufDerived = Buffer.from(derivedKey.toString('hex'), 'utf8');
      const bufExpected = Buffer.from(expectedHashHex, 'utf8');

      if (bufDerived.length !== bufExpected.length) return false;
      return crypto.timingSafeEqual(bufDerived, bufExpected);
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * Rate limiting: tracks failed login attempts by IP.
 * NOTE: On serverless platforms (e.g. Vercel), this Map is scoped to the active serverless instance.
 * For distributed multi-region rate-limiting across ephemeral instances, a shared store
 * (such as Vercel KV or Upstash Redis) is required.
 */
const loginRateLimitMap = new Map<string, { attempts: number; resetAt: number }>();

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    loginRateLimitMap.set(ip, { attempts: 1, resetAt: now + 15 * 60 * 1000 }); // 15-minute window
    return { allowed: true };
  }

  if (record.attempts >= 5) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.attempts += 1;
  return { allowed: true };
}

export function resetLoginRateLimit(ip: string): void {
  loginRateLimitMap.delete(ip);
}

/**
 * Verifies email and password against server configuration.
 * Uses timing-safe comparisons for both identifier and hash verification.
 */
export function verifyCredentials(identifier: string, pass: string): boolean {
  if (!isAuthConfigured()) {
    return false;
  }
  const configuredEmail = getConfiguredAdminEmail();
  const inputEmail = identifier.trim().toLowerCase();

  const bufInputEmail = Buffer.from(inputEmail, 'utf8');
  const bufConfigEmail = Buffer.from(configuredEmail, 'utf8');

  if (
    bufInputEmail.length !== bufConfigEmail.length ||
    !crypto.timingSafeEqual(bufInputEmail, bufConfigEmail)
  ) {
    return false;
  }

  const expectedHash = getExpectedPasswordDigest();
  return verifyPassword(pass, expectedHash);
}

/**
 * Session Expiry Policy:
 * Exactly 24 hours (86,400,000 ms), synchronized with cookie Max-Age=86400.
 */
export const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function generateSessionToken(email: string): string {
  const secretKey = getSessionSecret();
  const jti = crypto.randomBytes(16).toString('hex');
  const expiry = Date.now() + SESSION_EXPIRY_MS;
  const payload = Buffer.from(JSON.stringify({ email, jti, expiry })).toString('base64url');
  const signature = crypto.createHmac('sha256', secretKey).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

/**
 * Server-side session revocation tracking.
 * Scoped to active instance; pruned automatically when tokens reach expiration time.
 */
const revokedTokenJtis = new Map<string, number>();

function pruneRevokedTokens(): void {
  const now = Date.now();
  for (const [jti, expiry] of revokedTokenJtis.entries()) {
    if (now > expiry) {
      revokedTokenJtis.delete(jti);
    }
  }
}

export function revokeSessionToken(token: string | undefined): void {
  if (!token || typeof token !== 'string') return;
  const parts = token.split('.');
  if (parts.length !== 2) return;
  try {
    const data = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (data.jti && data.expiry) {
      revokedTokenJtis.set(data.jti, data.expiry);
      pruneRevokedTokens();
    }
  } catch {
    // Ignore invalid JSON payload
  }
}

export function isTokenRevoked(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return true;
    const data = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (data.jti && revokedTokenJtis.has(data.jti)) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export function verifySessionToken(token: string | undefined): { valid: boolean; email?: string } {
  if (!token || typeof token !== 'string') return { valid: false };
  if (!isAuthConfigured()) return { valid: false };

  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [payload, signature] = parts;
  try {
    const secretKey = getSessionSecret();
    const expectedSig = crypto.createHmac('sha256', secretKey).update(payload).digest('base64url');

    const bufSig = Buffer.from(signature, 'utf8');
    const bufExpected = Buffer.from(expectedSig, 'utf8');

    if (bufSig.length !== bufExpected.length) return { valid: false };
    if (!crypto.timingSafeEqual(bufSig, bufExpected)) return { valid: false };

    if (isTokenRevoked(token)) {
      return { valid: false };
    }

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.expiry || Date.now() > data.expiry) {
      return { valid: false };
    }
    return { valid: true, email: data.email };
  } catch {
    return { valid: false };
  }
}

export function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const name = parts.shift()?.trim();
    if (name) {
      list[name] = decodeURIComponent(parts.join('=').trim());
    }
  });

  return list;
}

/**
 * Strict same-origin & authorised origin CORS validator.
 * Replaces wildcard CORS with authorized whitelist.
 */
const ALLOWED_ORIGINS = [
  'https://www.samplinghub.world',
  'https://samplinghub.world',
  'https://swatch-craft-india.vercel.app',
];

export function handleCors(req: IncomingMessage, res: ServerResponse): boolean {
  const origin = req.headers.origin;
  const isDev = process.env.NODE_ENV !== 'production' && process.env.VERCEL_ENV !== 'production';

  let isAllowed = false;
  if (origin) {
    if (ALLOWED_ORIGINS.includes(origin)) {
      isAllowed = true;
    } else if (
      isDev &&
      (/^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin))
    ) {
      isAllowed = true;
    }
  }

  if (isAllowed && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true; // handled preflight
  }

  return false;
}
