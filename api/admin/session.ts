import type { IncomingMessage, ServerResponse } from 'node:http';
import { parseCookies, verifySessionToken } from '../_lib/auth.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies.samplinghub_admin_token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : undefined;

  const tokenToVerify = cookieToken || bearerToken;
  const result = verifySessionToken(tokenToVerify);

  res.setHeader('Content-Type', 'application/json');
  if (!result.valid) {
    res.statusCode = 401;
    res.end(JSON.stringify({ authenticated: false, error: 'Unauthorized or expired session' }));
    return;
  }

  res.statusCode = 200;
  res.end(
    JSON.stringify({
      authenticated: true,
      user: {
        email: result.email,
        role: 'superadmin',
      },
    })
  );
}
