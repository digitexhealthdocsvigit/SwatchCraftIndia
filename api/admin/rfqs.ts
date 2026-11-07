import type { IncomingMessage, ServerResponse } from 'node:http';
import { parseCookies, verifySessionToken, handleCors } from '../_lib/auth.js';
import { getAllRFQs, updateRFQStatus, deleteRFQ } from '../_lib/store.js';

interface RequestWithBody extends IncomingMessage {
  body?: any;
}

function parseJsonBody(req: IncomingMessage, maxBytes = 51200): Promise<any> {
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
  if (handleCors(req, res)) {
    return;
  }

  // Auth verification: verify cookie or Authorization header
  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies.samplinghub_admin_token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : undefined;
  const authResult = await verifySessionToken(cookieToken || bearerToken);

  if (!authResult.valid) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: authResult.error ? `Unauthorized: ${authResult.error}` : 'Unauthorized: Admin session required',
      })
    );
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    const rfqs = getAllRFQs();
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        success: true,
        count: rfqs.length,
        rfqs,
      })
    );
    return;
  }

  if (req.method === 'PATCH') {
    let body: any;
    try {
      body = req.body || (await parseJsonBody(req));
    } catch {
      res.statusCode = 413;
      res.end(JSON.stringify({ error: 'Payload too large' }));
      return;
    }

    const { id, status, estimatedValueUsd, internalNote, internalNotes, partnerAssigned } = body;
    if (!id || typeof id !== 'string') {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Missing or invalid RFQ id' }));
      return;
    }

    const resolvedNotes: string[] | undefined = Array.isArray(internalNotes)
      ? internalNotes.filter((n: any) => typeof n === 'string')
      : typeof internalNote === 'string' && internalNote.trim()
        ? [internalNote.trim()]
        : undefined;

    const updated = updateRFQStatus(id, {
      status,
      estimatedValueUsd: typeof estimatedValueUsd === 'number' ? estimatedValueUsd : undefined,
      internalNotes: resolvedNotes,
      partnerAssigned: typeof partnerAssigned === 'string' ? partnerAssigned : undefined,
    });

    if (!updated) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'RFQ not found' }));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, rfq: updated }));
    return;
  }

  if (req.method === 'DELETE') {
    let body: any;
    try {
      body = req.body || (await parseJsonBody(req));
    } catch {
      res.statusCode = 413;
      res.end(JSON.stringify({ error: 'Payload too large' }));
      return;
    }

    const { id } = body;
    if (!id || typeof id !== 'string') {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Missing or invalid RFQ id' }));
      return;
    }

    const deleted = deleteRFQ(id);
    if (!deleted) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'RFQ not found' }));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, message: `RFQ ${id} deleted` }));
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method not allowed' }));
}
