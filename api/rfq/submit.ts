import type { IncomingMessage, ServerResponse } from 'node:http';
import { addRFQAsync } from '../_lib/store.js';

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

function sanitize(input: any): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 1000);
}

export default async function handler(req: RequestWithBody, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

  const payload = req.body || (await parseJsonBody(req));

  const fullName = sanitize(payload.fullName);
  const companyName = sanitize(payload.companyName);
  const email = sanitize(payload.email).toLowerCase();
  const phone = sanitize(payload.phone);
  const productType = sanitize(payload.productType);
  const quantity = sanitize(payload.quantity);
  const exportMarket = sanitize(payload.exportMarket);
  const specifications = sanitize(payload.specifications);
  const attachments = Array.isArray(payload.attachments) ? payload.attachments.slice(0, 5) : [];

  // Validation
  if (!fullName || !email || !productType || !quantity) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'Missing mandatory fields: fullName, email, productType, and quantity are required.',
      })
    );
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Please provide a valid email address.' }));
    return;
  }

  const rfqRecord = await addRFQAsync({
    fullName,
    companyName: companyName || fullName,
    email,
    phone,
    productType,
    quantity,
    exportMarket: exportMarket || 'International Export',
    specifications,
    attachments,
  });

  res.statusCode = 201;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      success: true,
      message: 'RFQ received and logged with export engineering team.',
      rfq: rfqRecord,
    })
  );
}
