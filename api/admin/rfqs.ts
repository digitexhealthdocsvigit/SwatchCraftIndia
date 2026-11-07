import type { IncomingMessage, ServerResponse } from 'node:http';
import { parseCookies, verifySessionToken } from '../_lib/auth.js';
import { getAllRFQs, updateRFQStatus, deleteRFQ } from '../_lib/store.js';

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Auth verification
  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies.samplinghub_admin_token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : undefined;
  const authResult = verifySessionToken(cookieToken || bearerToken);

  if (!authResult.valid) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Unauthorized: Admin session required' }));
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
    const payload = req.body || (await parseJsonBody(req));
    const { id, status, internalNote, estimatedValueUsd, partnerAssigned } = payload;

    if (!id) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Missing rfq ID' }));
      return;
    }

    const rfqs = getAllRFQs();
    const existing = rfqs.find((r) => r.id === id);
    if (!existing) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'RFQ not found' }));
      return;
    }

    const updatedNotes = internalNote
      ? [...(existing.internalNotes || []), internalNote]
      : existing.internalNotes;

    const updated = updateRFQStatus(id, {
      status: status || existing.status,
      internalNotes: updatedNotes,
      estimatedValueUsd:
        estimatedValueUsd !== undefined ? Number(estimatedValueUsd) : existing.estimatedValueUsd,
      partnerAssigned: partnerAssigned || existing.partnerAssigned,
    });

    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, rfq: updated }));
    return;
  }

  if (req.method === 'DELETE') {
    const payload = req.body || (await parseJsonBody(req));
    const { id } = payload;
    if (!id) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Missing rfq ID' }));
      return;
    }

    const removed = deleteRFQ(id);
    res.statusCode = removed ? 200 : 404;
    res.end(JSON.stringify({ success: removed }));
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method not allowed' }));
}
