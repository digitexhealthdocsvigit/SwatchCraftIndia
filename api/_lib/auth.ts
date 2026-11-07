import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

/* -------------------------------------------------------------------------- */
/*                       ENVIRONMENT & CONFIGURATION                          */
/* -------------------------------------------------------------------------- */

export function isProduction(): boolean {
  return (
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL_ENV === 'production' ||
    process.env.VERCEL === '1'
  );
}

/**
 * Returns true if managed shared KV storage (Vercel KV or Upstash Redis) is configured.
 */
export function isSharedStorageConfigured(): boolean {
  const hasKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  const hasUpstash = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  return hasKv || hasUpstash;
}

/**
 * Returns true if all three required credential variables are configured.
 * In production, also requires shared storage (Vercel KV / Upstash Redis) to fail closed
 * against insecure instance-local or temporary filesystem fallbacks.
 */
export function isAuthConfigured(): boolean {
  const hasAuthVars = Boolean(
    process.env.ADMIN_EMAIL &&
    process.env.ADMIN_PASSWORD_HASH &&
    process.env.ADMIN_SESSION_SECRET
  );
  if (!hasAuthVars) return false;

  // In production, shared KV storage is strictly mandatory to guarantee cross-instance revocation and rate limiting
  if (isProduction() && !isSharedStorageConfigured()) {
    return false;
  }

  return true;
}

export function getAuthConfigStatus(): {
  configured: boolean;
  isProduction: boolean;
  sharedStorageConfigured: boolean;
  missingVars: string[];
} {
  const missing: string[] = [];
  if (!process.env.ADMIN_EMAIL) missing.push('ADMIN_EMAIL');
  if (!process.env.ADMIN_PASSWORD_HASH) missing.push('ADMIN_PASSWORD_HASH');
  if (!process.env.ADMIN_SESSION_SECRET) missing.push('ADMIN_SESSION_SECRET');

  const sharedStorage = isSharedStorageConfigured();
  if (isProduction() && !sharedStorage) {
    missing.push('KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)');
  }

  return {
    configured: missing.length === 0,
    isProduction: isProduction(),
    sharedStorageConfigured: sharedStorage,
    missingVars: missing,
  };
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

/* -------------------------------------------------------------------------- */
/*                       PASSWORD HASHING (SCRYPT)                            */
/* -------------------------------------------------------------------------- */

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
 * Fails safely on malformed or unsupported hash formats (e.g. legacy plain SHA-256).
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

export interface KvResponse<T = any> {
  success: boolean;
  data: T | null;
  error?: string;
}

// Optional mock for testing independent instances without live internet
let mockKvHandler: ((commands: any[][]) => Promise<any[] | null>) | null = null;

export function setMockKvHandler(handler: ((commands: any[][]) => Promise<any[] | null>) | null): void {
  mockKvHandler = handler;
}

/**
 * Managed cloud KV helper (Vercel KV / Upstash Redis REST API).
 * Enables multi-region distributed synchronization with zero added dependencies.
 */
export async function sendKvPipeline(commands: any[][]): Promise<any[] | null> {
  if (mockKvHandler) {
    return mockKvHandler(commands);
  }

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

// Development/testing-only local stores (never authoritative in production)
const devMemoryRateLimitMap = new Map<string, RateLimitRecord>();
const DEV_RATELIMIT_FILE = path.join(os.tmpdir(), 'samplinghub_dev_ratelimit.json');

function loadDevRateLimits(): Map<string, RateLimitRecord> {
  try {
    if (fs.existsSync(DEV_RATELIMIT_FILE)) {
      const content = fs.readFileSync(DEV_RATELIMIT_FILE, 'utf8');
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
    // Ignore dev fallback
  }
  return new Map<string, RateLimitRecord>();
}

function saveDevRateLimits(map: Map<string, RateLimitRecord>): void {
  try {
    const obj: Record<string, RateLimitRecord> = {};
    const now = Date.now();
    for (const [key, val] of map.entries()) {
      if (val.resetAt > now) {
        obj[key] = val;
      }
    }
    fs.writeFileSync(DEV_RATELIMIT_FILE, JSON.stringify(obj), 'utf8');
  } catch {
    // Ignore dev fallback
  }
}

/**
 * Checks whether an IP or Account has exceeded its rate limit.
 * Uses atomic Redis pipeline operations [INCR, TTL] so concurrent requests cannot bypass limits,
 * and expiration is set only on initial failure (never reset accidentally on subsequent attempts).
 * In production, fails closed if shared KV is unavailable.
 */
export async function checkLoginRateLimit(
  targetKey: string,
  type: 'ip' | 'account' = 'ip'
): Promise<{ allowed: boolean; retryAfterSeconds?: number; limitType?: 'ip' | 'account'; error?: string }> {
  const maxAttempts = type === 'ip' ? 5 : 10;
  const key = `rate:${type}:${targetKey}`;

  // 1. Shared Cloud KV Check (Production & Configured Environments)
  if (isSharedStorageConfigured()) {
    // Fetch current count and TTL
    const cloudRes = await sendKvPipeline([['GET', key], ['TTL', key]]);
    if (cloudRes === null) {
      // In production, if shared store fails, fail closed!
      if (isProduction()) {
        return { allowed: false, retryAfterSeconds: 900, limitType: type, error: 'RATE_LIMIT_STORE_UNAVAILABLE' };
      }
    } else {
      const countVal = cloudRes[0];
      const ttlVal = cloudRes[1];
      const attempts = countVal !== null ? parseInt(countVal, 10) : 0;
      const ttlSeconds = typeof ttlVal === 'number' && ttlVal > 0 ? ttlVal : 900;

      if (attempts >= maxAttempts) {
        return { allowed: false, retryAfterSeconds: ttlSeconds, limitType: type };
      }
      return { allowed: true };
    }
  }

  // 2. Production check: If in production without shared storage, fail closed
  if (isProduction()) {
    return { allowed: false, retryAfterSeconds: 900, limitType: type, error: 'RATE_LIMIT_STORE_UNAVAILABLE' };
  }

  // 3. Development / Test Mode fallback
  const now = Date.now();
  const devMap = loadDevRateLimits();
  const record = devMap.get(key) || devMemoryRateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    return { allowed: true };
  }

  if (record.attempts >= maxAttempts) {
    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds, limitType: type };
  }

  return { allowed: true };
}

/**
 * Atomically increments failed attempts and sets fixed 900s TTL only on the first attempt.
 */
export async function recordFailedLogin(
  targetKey: string,
  type: 'ip' | 'account' = 'ip'
): Promise<{ success: boolean; attempts: number }> {
  const key = `rate:${type}:${targetKey}`;

  if (isSharedStorageConfigured()) {
    // Atomic INCR + TTL check
    const incrRes = await sendKvPipeline([['INCR', key], ['TTL', key]]);
    if (incrRes && typeof incrRes[0] === 'number') {
      const attempts = incrRes[0];
      const currentTtl = incrRes[1];
      // If key is new (attempts === 1) or has no expiration (-1), set 15-minute fixed TTL
      if (attempts === 1 || currentTtl === -1) {
        await sendKvPipeline([['EXPIRE', key, 900]]);
      }
      return { success: true, attempts };
    }

    if (isProduction()) {
      return { success: false, attempts: 0 };
    }
  }

  if (isProduction()) {
    return { success: false, attempts: 0 };
  }

  // Development fallback
  const now = Date.now();
  const devMap = loadDevRateLimits();
  const existing = devMap.get(key) || devMemoryRateLimitMap.get(key);

  let newAttempts = 1;
  if (!existing || now > existing.resetAt) {
    const newRecord: RateLimitRecord = { attempts: 1, resetAt: now + 15 * 60 * 1000 };
    devMap.set(key, newRecord);
    devMemoryRateLimitMap.set(key, newRecord);
  } else {
    existing.attempts += 1;
    newAttempts = existing.attempts;
    devMap.set(key, existing);
    devMemoryRateLimitMap.set(key, existing);
  }

  saveDevRateLimits(devMap);
  return { success: true, attempts: newAttempts };
}

export async function resetLoginRateLimit(targetKey: string, type: 'ip' | 'account' = 'ip'): Promise<void> {
  const key = `rate:${type}:${targetKey}`;
  if (isSharedStorageConfigured()) {
    await sendKvPipeline([['DEL', key]]);
  }
  const devMap = loadDevRateLimits();
  devMap.delete(key);
  devMemoryRateLimitMap.delete(key);
  saveDevRateLimits(devMap);
}

/* -------------------------------------------------------------------------- */
/*             SESSION CREDENTIAL VERIFICATION & LIFECYCLE                   */
/* -------------------------------------------------------------------------- */

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

// Positive-only L1 memory cache (caches ONLY revoked tokens, never valid ones)
const memoryPositiveRevokedJtis = new Map<string, number>();

// Development/testing-only local file (never authoritative in production)
const DEV_REVOCATION_FILE = path.join(os.tmpdir(), 'samplinghub_dev_revocations.json');

function loadDevRevocations(): Map<string, number> {
  try {
    if (fs.existsSync(DEV_REVOCATION_FILE)) {
      const data = fs.readFileSync(DEV_REVOCATION_FILE, 'utf8');
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
    // Ignore dev fallback
  }
  return new Map<string, number>();
}

function saveDevRevocations(map: Map<string, number>): void {
  try {
    const obj: Record<string, number> = {};
    const now = Date.now();
    for (const [jti, exp] of map.entries()) {
      if (exp > now) {
        obj[jti] = exp;
      }
    }
    fs.writeFileSync(DEV_REVOCATION_FILE, JSON.stringify(obj), 'utf8');
  } catch {
    // Ignore dev fallback
  }
}

/**
 * Revokes a session token across serverless instances and persistent storage.
 * In production, writes to Cloud KV and returns { success: false } if the shared store fails,
 * ensuring logout never falsely reports revocation.
 */
export async function revokeSessionToken(
  token: string | undefined
): Promise<{ success: boolean; error?: string }> {
  if (!token || typeof token !== 'string') return { success: false, error: 'Invalid token' };
  const parts = token.split('.');
  if (parts.length !== 2) return { success: false, error: 'Malformed token' };

  try {
    const data = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (!data.jti || !data.expiry) return { success: false, error: 'Missing token metadata' };

    const jti = data.jti;
    const now = Date.now();
    // Revocation TTL is strictly capped to remaining token lifetime (never exceeds SESSION_EXPIRY_MS)
    const remainingSeconds = Math.max(1, Math.min(
      Math.ceil(SESSION_EXPIRY_MS / 1000),
      Math.ceil((data.expiry - now) / 1000)
    ));

    // 1. Shared Cloud KV Persistence
    if (isSharedStorageConfigured()) {
      const kvRes = await sendKvPipeline([['SETEX', `revoked:${jti}`, remainingSeconds, '1']]);
      if (kvRes === null) {
        if (isProduction()) {
          return { success: false, error: 'Failed to write revocation to shared KV store' };
        }
      } else {
        // Cache positive revocation in L1 memory
        memoryPositiveRevokedJtis.set(jti, data.expiry);
        return { success: true };
      }
    }

    // 2. Production check: If in production without shared storage, fail closed
    if (isProduction()) {
      return { success: false, error: 'Shared KV storage is required in production' };
    }

    // 3. Development / Test Mode fallback
    const devMap = loadDevRevocations();
    devMap.set(jti, data.expiry);
    saveDevRevocations(devMap);
    memoryPositiveRevokedJtis.set(jti, data.expiry);
    return { success: true };
  } catch {
    return { success: false, error: 'Invalid token payload' };
  }
}

/**
 * Checks if a session token has been revoked across Cloud KV, durable dev store, or memory.
 * Uses positive-only caching so a valid token is NEVER cached as valid across instances.
 * In production, fails closed if the shared KV store is unreachable.
 */
export async function isTokenRevoked(token: string): Promise<{ revoked: boolean; error?: string }> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return { revoked: true, error: 'Malformed token' };
    const data = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (!data.jti) return { revoked: true, error: 'Missing token jti' };
    const jti = data.jti;
    const now = Date.now();

    // 1. Check positive-only L1 memory cache (fast microsecond rejection of known revoked tokens)
    const memExp = memoryPositiveRevokedJtis.get(jti);
    if (memExp && memExp > now) {
      return { revoked: true };
    }

    // 2. Query Shared Cloud KV (Authoritative in Production)
    if (isSharedStorageConfigured()) {
      const cloudRes = await sendKvPipeline([['GET', `revoked:${jti}`]]);
      if (cloudRes === null) {
        if (isProduction()) {
          // Fail closed in production if KV is down
          return { revoked: true, error: 'SHARED_STORE_UNAVAILABLE' };
        }
      } else if (cloudRes[0] !== null) {
        // Token was found in shared revocation registry: cache positively in L1
        memoryPositiveRevokedJtis.set(jti, data.expiry || now + 86400000);
        return { revoked: true };
      } else {
        return { revoked: false };
      }
    }

    // 3. Production check: fail closed if production lacks shared store
    if (isProduction()) {
      return { revoked: true, error: 'SHARED_STORE_UNAVAILABLE' };
    }

    // 4. Development / Test Mode fallback
    const devMap = loadDevRevocations();
    const fileExp = devMap.get(jti);
    if (fileExp && fileExp > now) {
      memoryPositiveRevokedJtis.set(jti, fileExp);
      return { revoked: true };
    }

    return { revoked: false };
  } catch {
    return { revoked: true, error: 'Invalid token payload' };
  }
}

export async function verifySessionToken(
  token: string | undefined
): Promise<{ valid: boolean; email?: string; error?: string }> {
  if (!token || typeof token !== 'string') return { valid: false, error: 'Missing token' };
  if (!isAuthConfigured()) return { valid: false, error: 'Authentication unconfigured' };

  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false, error: 'Malformed token' };

  const [payload, signature] = parts;
  try {
    const secretKey = getSessionSecret();
    const expectedSig = crypto.createHmac('sha256', secretKey).update(payload).digest('base64url');

    const bufSig = Buffer.from(signature, 'utf8');
    const bufExpected = Buffer.from(expectedSig, 'utf8');

    if (bufSig.length !== bufExpected.length) return { valid: false, error: 'Invalid signature length' };
    if (!crypto.timingSafeEqual(bufSig, bufExpected)) return { valid: false, error: 'Invalid signature' };

    // Check expiration before checking revocation store
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.expiry || Date.now() > data.expiry) {
      return { valid: false, error: 'Session expired' };
    }

    // Check distributed revocation across shared store
    const revocationStatus = await isTokenRevoked(token);
    if (revocationStatus.revoked) {
      return { valid: false, error: revocationStatus.error || 'Token has been revoked' };
    }

    return { valid: true, email: data.email };
  } catch {
    return { valid: false, error: 'Invalid token payload' };
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

/* -------------------------------------------------------------------------- */
/*                                    CORS                                    */
/* -------------------------------------------------------------------------- */

const ALLOWED_ORIGINS = [
  'https://www.samplinghub.world',
  'https://samplinghub.world',
  'https://swatch-craft-india.vercel.app',
];

export function handleCors(req: IncomingMessage, res: ServerResponse): boolean {
  const origin = req.headers.origin;
  const isDev = !isProduction();

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
