import type { IncomingMessage, ServerResponse } from 'node:http';
import { parseCookies, verifySessionToken, handleCors } from '../_lib/auth.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handleCors(req, res)) {
    return;
  }

  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies.samplinghub_admin_token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : undefined;

  const tokenToVerify = cookieToken || bearerToken;
  const result = await verifySessionToken(tokenToVerify);

  res.setHeader('Content-Type', 'application/json');
  if (!result.valid) {
    res.statusCode = 401;
    res.end(
      JSON.stringify({
        authenticated: false,
        error: result.error || 'Unauthorized or expired session',
      })
    );
    return;
  }

  res.statusCode = 200;
  res.end(
    JSON.stringify({
      authenticated: true,
      user: {
        email: result.email,
        role: 'admin',
      },
    })
  );
}
