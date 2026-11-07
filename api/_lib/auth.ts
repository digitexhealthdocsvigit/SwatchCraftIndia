import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
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
 * Fails safely on malformed or unsupported hash formats.
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
 * Anti-spoofing client IP extractor.
 * Prioritizes platform-verified edge headers (Vercel Edge `x-vercel-forwarded-for` and reverse proxy `x-real-ip`)
 * over raw client-controlled `x-forwarded-for` headers to prevent header injection attacks.
 */
export function getClientIp(req: IncomingMessage): string {
  const vercelIp = req.headers['x-vercel-forwarded-for'];
  if (typeof vercelIp === 'string' && vercelIp.trim()) {
    return vercelIp.split(',')[0].trim();
  }

  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    const parts = forwarded.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[0];
  }

  return req.socket?.remoteAddress || '127.0.0.1';
}

/* -------------------------------------------------------------------------- */
/*                 DISTRIBUTED STORAGE & SERVERLESS KV ENGINE                 */
/* -------------------------------------------------------------------------- */

const REVOCATION_FILE = path.join(os.tmpdir(), 'samplinghub_revocations.json');
const RATELIMIT_FILE = path.join(os.tmpdir(), 'samplinghub_ratelimit.json');

/**
 * Optional managed cloud KV helper (Vercel KV / Upstash Redis REST API).
 * Enables multi-region distributed synchronization with zero added dependencies.
 */
async function sendKvPipeline(commands: any[][]): Promise<any[] | null> {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);
    const res = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const json = (await res.json()) as any[];
    return json.map((entry) => entry?.result);
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                  DISTRIBUTED & DURABLE RATE LIMITING                       */
/* -------------------------------------------------------------------------- */

interface RateLimitRecord {
  attempts: number;
  resetAt: number;
}

const memoryRateLimitMap = new Map<string, RateLimitRecord>();

function loadDurableRateLimits(): Map<string, RateLimitRecord> {
  try {
    if (fs.existsSync(RATELIMIT_FILE)) {
      const content = fs.readFileSync(RATELIMIT_FILE, 'utf8');
      const data = JSON.parse(content) as Record<string, RateLimitRecord>;
      const now = Date.now();
      const map = new Map<string, RateLimitRecord>();
      for (const [key, val] of Object.entries(data)) {
        if (val.resetAt > now) {
          map.set(key, val);
        }
      }
      return map;
    }
  } catch {
    // Ignore fallback
  }
  return new Map<string, RateLimitRecord>();
}

function saveDurableRateLimits(map: Map<string, RateLimitRecord>): void {
  try {
    const obj: Record<string, RateLimitRecord> = {};
    const now = Date.now();
    for (const [key, val] of map.entries()) {
      if (val.resetAt > now) {
        obj[key] = val;
      }
    }
    fs.writeFileSync(RATELIMIT_FILE, JSON.stringify(obj), 'utf8');
  } catch {
    // Ignore fallback
  }
}

/**
 * Rate Limits:
 * - IP Limit: Max 5 attempts per 15-minute window
 * - Account Limit: Max 10 attempts across all IPs per 15-minute window (prevents distributed botnet brute force)
 */
export async function checkLoginRateLimit(
  targetKey: string,
  type: 'ip' | 'account' = 'ip'
): Promise<{ allowed: boolean; retryAfterSeconds?: number; limitType?: 'ip' | 'account' }> {
  const maxAttempts = type === 'ip' ? 5 : 10;
  const windowMs = 15 * 60 * 1000;
  const now = Date.now();
  const key = `rate:${type}:${targetKey}`;

  // 1. Check Cloud KV if available
  const cloudRes = await sendKvPipeline([['GET', key]]);
  if (cloudRes && cloudRes[0] !== null) {
    const attempts = parseInt(cloudRes[0], 10);
    if (attempts >= maxAttempts) {
      // Query TTL
      const ttlRes = await sendKvPipeline([['TTL', key]]);
      const remainingSeconds = ttlRes && typeof ttlRes[0] === 'number' && ttlRes[0] > 0 ? ttlRes[0] : 900;
      return { allowed: false, retryAfterSeconds: remainingSeconds, limitType: type };
    }
  }

  // 2. Check local durable file & memory cache
  const durableMap = loadDurableRateLimits();
  const record = durableMap.get(key) || memoryRateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    return { allowed: true };
  }

  if (record.attempts >= maxAttempts) {
    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds, limitType: type };
  }

  return { allowed: true };
}

export async function recordFailedLogin(targetKey: string, type: 'ip' | 'account' = 'ip'): Promise<void> {
  const windowMs = 15 * 60 * 1000;
  const now = Date.now();
  const key = `rate:${type}:${targetKey}`;

  // 1. Cloud KV increment with TTL
  await sendKvPipeline([
    ['INCR', key],
    ['EXPIRE', key, 900],
  ]);

  // 2. Local durable file & memory store
  const durableMap = loadDurableRateLimits();
  const existing = durableMap.get(key) || memoryRateLimitMap.get(key);

  if (!existing || now > existing.resetAt) {
    const newRecord: RateLimitRecord = { attempts: 1, resetAt: now + windowMs };
    durableMap.set(key, newRecord);
    memoryRateLimitMap.set(key, newRecord);
  } else {
    existing.attempts += 1;
    durableMap.set(key, existing);
    memoryRateLimitMap.set(key, existing);
  }

  saveDurableRateLimits(durableMap);
}

export async function resetLoginRateLimit(targetKey: string, type: 'ip' | 'account' = 'ip'): Promise<void> {
  const key = `rate:${type}:${targetKey}`;
  await sendKvPipeline([['DEL', key]]);
  const durableMap = loadDurableRateLimits();
  durableMap.delete(key);
  memoryRateLimitMap.delete(key);
  saveDurableRateLimits(durableMap);
}

/* -------------------------------------------------------------------------- */
/*             SESSION CREDENTIAL VERIFICATION & LIFECYCLE                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                 DISTRIBUTED SERVERLESS SESSION REVOCATION                  */
/* -------------------------------------------------------------------------- */

const memoryRevokedJtis = new Map<string, number>();

function loadDurableRevocations(): Map<string, number> {
  try {
    if (fs.existsSync(REVOCATION_FILE)) {
      const data = fs.readFileSync(REVOCATION_FILE, 'utf8');
      const parsed = JSON.parse(data) as Record<string, number>;
      const now = Date.now();
      const map = new Map<string, number>();
      for (const [jti, exp] of Object.entries(parsed)) {
        if (exp > now) {
          map.set(jti, exp);
        }
      }
      return map;
    }
  } catch {
    // Ignore fallback
  }
  return new Map<string, number>();
}

function saveDurableRevocations(map: Map<string, number>): void {
  try {
    const obj: Record<string, number> = {};
    const now = Date.now();
    for (const [jti, exp] of map.entries()) {
      if (exp > now) {
        obj[jti] = exp;
      }
    }
    fs.writeFileSync(REVOCATION_FILE, JSON.stringify(obj), 'utf8');
  } catch {
    // Ignore fallback
  }
}

/**
 * Revokes a session token across serverless instances and persistent storage.
 */
export async function revokeSessionToken(token: string | undefined): Promise<void> {
  if (!token || typeof token !== 'string') return;
  const parts = token.split('.');
  if (parts.length !== 2) return;

  try {
    const data = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (data.jti && data.expiry) {
      const jti = data.jti;
      const expiry = data.expiry;
      const remainingSeconds = Math.max(1, Math.ceil((expiry - Date.now()) / 1000));

      // 1. Cloud KV Revocation Entry with TTL
      await sendKvPipeline([['SETEX', `revoked:${jti}`, remainingSeconds, '1']]);

      // 2. Local durable file persistence
      const durableMap = loadDurableRevocations();
      durableMap.set(jti, expiry);
      saveDurableRevocations(durableMap);

      // 3. Fast memory cache
      memoryRevokedJtis.set(jti, expiry);
    }
  } catch {
    // Ignore invalid JSON payload
  }
}

/**
 * Checks if a session token has been revoked across Cloud KV, durable file store, or memory.
 */
export async function isTokenRevoked(token: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return true;
    const data = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (!data.jti) return true;
    const jti = data.jti;
    const now = Date.now();

    // 1. Check in-memory L1 cache
    const memExp = memoryRevokedJtis.get(jti);
    if (memExp && memExp > now) {
      return true;
    }

    // 2. Check durable file store
    const durableMap = loadDurableRevocations();
    const fileExp = durableMap.get(jti);
    if (fileExp && fileExp > now) {
      memoryRevokedJtis.set(jti, fileExp);
      return true;
    }

    // 3. Check Cloud KV
    const cloudRes = await sendKvPipeline([['GET', `revoked:${jti}`]]);
    if (cloudRes && cloudRes[0] !== null) {
      memoryRevokedJtis.set(jti, data.expiry || now + 86400000);
      return true;
    }

    return false;
  } catch {
    return true;
  }
}

export async function verifySessionToken(
  token: string | undefined
): Promise<{ valid: boolean; email?: string }> {
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

    // Check expiration before checking revocation store
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.expiry || Date.now() > data.expiry) {
      return { valid: false };
    }

    // Check distributed revocation
    const revoked = await isTokenRevoked(token);
    if (revoked) {
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
