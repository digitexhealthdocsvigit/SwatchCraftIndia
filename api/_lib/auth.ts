import crypto from 'node:crypto';

const SECRET_KEY =
  process.env.ADMIN_SESSION_SECRET ||
  'samplinghub-b2b-export-secret-key-mumbai-thane-2026';

// Expected admin credentials
const EXPECTED_DIGEST =
  process.env.ADMIN_PASSWORD_HASH ||
  '3732f1f3631cc628d9e17e5486db110ab515c09d458280f82cc2cc6a29252fd2';

export function verifyCredentials(identifier: string, pass: string): boolean {
  const normalized = `${identifier.trim().toLowerCase()}:${pass}`;
  const hash = crypto.createHash('sha256').update(normalized).digest('hex');
  return hash === EXPECTED_DIGEST;
}

export function generateSessionToken(email: string): string {
  const expiry = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const payload = Buffer.from(JSON.stringify({ email, expiry })).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): { valid: boolean; email?: string } {
  if (!token || typeof token !== 'string') return { valid: false };
  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [payload, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('base64url');
  if (signature !== expectedSig) return { valid: false };

  try {
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
