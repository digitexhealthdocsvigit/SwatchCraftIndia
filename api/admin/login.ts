import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  verifyCredentials,
  generateSessionToken,
  checkLoginRateLimit,
  resetLoginRateLimit,
} from '../_lib/auth.js';

interface RequestWithBody extends IncomingMessage {
  body?: any;
}

function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

export default async function handler(req: RequestWithBody, res: ServerResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
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

  const payload = req.body || (await parseJsonBody(req));
  const { email, password } = payload || {};

  if (!email || !password) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Missing email or password' }));
    return;
  }

  const isValid = verifyCredentials(String(email), String(password));
  if (!isValid) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid credentials. Access Denied.' }));
    return;
  }

  // Successful login: reset rate limiter
  resetLoginRateLimit(ip);

  const token = generateSessionToken(String(email));

  // Set HttpOnly cookie
  const isProd = process.env.NODE_ENV === 'production';
  const cookieFlags = [
    `samplinghub_admin_token=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=604800', // 7 days
    isProd ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');

  res.setHeader('Set-Cookie', cookieFlags);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      success: true,
      token,
      user: {
        email: String(email).trim().toLowerCase(),
        role: 'superadmin',
      },
    })
  );
}
