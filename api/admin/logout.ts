import type { IncomingMessage, ServerResponse } from 'node:http';
import { parseCookies, revokeSessionToken, handleCors } from '../_lib/auth.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handleCors(req, res)) {
    return;
  }

  // Revoke session token server-side if present
  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies.samplinghub_admin_token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : undefined;

  const tokenToRevoke = cookieToken || bearerToken;
  if (tokenToRevoke) {
    revokeSessionToken(tokenToRevoke);
  }

  // Clear HttpOnly cookie
  res.setHeader(
    'Set-Cookie',
    'samplinghub_admin_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ success: true, message: 'Logged out successfully' }));
}
