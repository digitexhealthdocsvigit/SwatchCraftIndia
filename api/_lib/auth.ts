import crypto from 'node:crypto';

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

// Rate limiting in-memory map: IP -> { attempts: number, resetAt: number }
const loginRateLimitMap = new Map<string, { attempts: number; resetAt: number }>();

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    loginRateLimitMap.set(ip, { attempts: 1, resetAt: now + 15 * 60 * 1000 }); // 15 minute window
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

export function verifyCredentials(identifier: string, pass: string): boolean {
  if (!isAuthConfigured()) {
    return false;
  }
  const configuredEmail = getConfiguredAdminEmail();
  const inputEmail = identifier.trim().toLowerCase();

  // Strict identifier check against configured administrator email
  if (inputEmail !== configuredEmail) {
    return false;
  }

  const expectedDigest = getExpectedPasswordDigest();
  const digestWithEmail = crypto.createHash('sha256').update(`${inputEmail}:${pass}`).digest('hex');
  const digestPure = crypto.createHash('sha256').update(pass).digest('hex');

  const bufExpected = Buffer.from(expectedDigest, 'utf8');
  const bufWithEmail = Buffer.from(digestWithEmail, 'utf8');
  const bufPure = Buffer.from(digestPure, 'utf8');

  const matchWithEmail =
    bufWithEmail.length === bufExpected.length &&
    crypto.timingSafeEqual(bufWithEmail, bufExpected);

  const matchPure =
    bufPure.length === bufExpected.length &&
    crypto.timingSafeEqual(bufPure, bufExpected);

  return matchWithEmail || matchPure;
}

export function generateSessionToken(email: string): string {
  const secretKey = getSessionSecret();
  const expiry = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const payload = Buffer.from(JSON.stringify({ email, expiry })).toString('base64url');
  const signature = crypto.createHmac('sha256', secretKey).update(payload).digest('base64url');
  return `${payload}.${signature}`;
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
