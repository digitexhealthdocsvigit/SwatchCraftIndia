import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  isAuthConfigured,
  verifyCredentials,
  generateSessionToken,
  checkLoginRateLimit,
  resetLoginRateLimit,
  handleCors,
} from '../_lib/auth.js';

interface RequestWithBody extends IncomingMessage {
  body?: any;
}

function parseJsonBody(req: IncomingMessage, maxBytes = 10240): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    let bytesReceived = 0;

    req.on('data', (chunk) => {
      bytesReceived += chunk.length;
      if (bytesReceived > maxBytes) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}

export default async function handler(req: RequestWithBody, res: ServerResponse) {
  // Enforce strict CORS policy
  if (handleCors(req, res)) {
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Failsafe configuration check: reject if environment variables are missing
  if (!isAuthConfigured()) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error:
          'Admin authentication is not configured on the server. Please configure ADMIN_EMAIL, ADMIN_PASSWORD_HASH, and ADMIN_SESSION_SECRET in Vercel project environment variables.',
        code: 'AUTH_NOT_CONFIGURED',
      })
    );
    return;
  }

  // Rate limit check
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const rateCheck = checkLoginRateLimit(ip);
  if (!rateCheck.allowed) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds || 900));
    res.end(
      JSON.stringify({
        error: `Too many login attempts. Please wait ${rateCheck.retryAfterSeconds} seconds before retrying.`,
      })
    );
    return;
  }

  let payload: any;
  try {
    payload = req.body || (await parseJsonBody(req));
  } catch {
    res.statusCode = 413;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Payload too large. Maximum allowed size is 10 KB.' }));
    return;
  }

  const { email, password } = payload || {};

  // Strict input type and length validation
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password ||
    email.length > 254 ||
    password.length > 256
  ) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid request payload.' }));
    return;
  }

  const isValid = verifyCredentials(email, password);
  if (!isValid) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    // Generic error message to prevent account enumeration
    res.end(JSON.stringify({ error: 'Invalid administrator credentials.' }));
    return;
  }

  // Successful login: reset rate limiter for this IP
  resetLoginRateLimit(ip);

  // Generate 24-hour cryptographically signed session token
  const token = generateSessionToken(email.trim().toLowerCase());

  // Set HttpOnly, Secure session cookie as the SOLE browser credential
  const isProd =
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL_ENV === 'production' ||
    process.env.VERCEL === '1';

  const cookieFlags = [
    `samplinghub_admin_token=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=86400', // Exactly 24 hours
    isProd ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');

  res.setHeader('Set-Cookie', cookieFlags);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  // NOTE: Token is NOT returned in response body. The HttpOnly cookie is the sole credential.
  res.end(
    JSON.stringify({
      success: true,
      user: {
        email: email.trim().toLowerCase(),
        role: 'admin',
      },
    })
  );
}
