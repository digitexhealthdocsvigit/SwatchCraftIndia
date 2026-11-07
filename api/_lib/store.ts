import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface StoredRFQ {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  productType: string;
  quantity: string;
  exportMarket?: string;
  specifications?: string;
  attachments?: Array<{ name: string; type: string; sizeFormatted: string }>;
  submittedAt: string;
  status: 'New' | 'Under Review' | 'Qualified' | 'Quotation Sent' | 'Won' | 'Lost';
  estimatedValueUsd?: number;
  internalNotes?: string[];
  partnerAssigned?: string;
}

const SEED_RFQS: StoredRFQ[] = [
  {
    id: 'RFQ-2026-9041',
    fullName: 'Marco Moretti',
    companyName: 'Moretti Tessuti Milano',
    email: 'm.moretti@morettitessuti.it',
    phone: '+39 02 8945 2201',
    productType: 'Hardbound Wallpaper Catalogs',
    quantity: '120 Units (45x45 cm)',
    exportMarket: 'European Union (Italy)',
    specifications: 'Heavy 420 GSM embossed vinyl sheets with room-scene visualizer separator sheets, gold debossed linen covers.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    status: 'Under Review',
    estimatedValueUsd: 14500,
    internalNotes: ['Sample rolls arriving from Como next week for repeat registration test.'],
    partnerAssigned: 'Unit A - Precision Bookbinding',
  },
  {
    id: 'RFQ-2026-8874',
    fullName: 'Sarah Jenkins',
    companyName: 'HighPoint Architectural Fabrics LLC',
    email: 's.jenkins@highpointfabrics.com',
    phone: '+1 336 884 9200',
    productType: 'Upholstery Swatch Books',
    quantity: '250 Units',
    exportMarket: 'United States',
    specifications: '3mm Kappa board, navy buckram with matte silver foil, 4-tier waterfall layout inside.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    status: 'Quotation Sent',
    estimatedValueUsd: 19800,
    internalNotes: ['Commercial invoice sent with DDP air freight via FedEx.'],
    partnerAssigned: 'Unit B - Automated Pinking & Mounting',
  },
  {
    id: 'RFQ-2026-7612',
    fullName: 'Tariq Al-Mansoor',
    companyName: 'Emirates Interior Furnishings Dubai',
    email: 'tariq@emiratesfurnishings.ae',
    phone: '+971 4 332 9918',
    productType: 'Cascading Waterfall Hangers',
    quantity: '800 Units',
    exportMarket: 'United Arab Emirates',
    specifications: 'Custom curved plastic hooks with brushed brass finish and full-color 400 GSM header cards.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    status: 'New',
    estimatedValueUsd: 11200,
    internalNotes: ['Requested sample swatch hook express to Jebel Ali.'],
  },
];

const TMP_FILE = path.join(os.tmpdir(), 'samplinghub_rfqs.json');

// In-memory cache across serverless warm starts
let memoryStore: StoredRFQ[] = [...SEED_RFQS];

function loadFromFile() {
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = fs.readFileSync(TMP_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryStore = parsed;
      }
    }
  } catch {
    // Fall back to memoryStore
  }
}

function saveToFile() {
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(memoryStore, null, 2), 'utf8');
  } catch {
    // Non-fatal if tmp write fails in restricted sandbox
  }
}

// Initial attempt to load from disk
loadFromFile();

export function getAllRFQs(): StoredRFQ[] {
  loadFromFile();
  return memoryStore;
}

export function addRFQ(rfqData: Omit<StoredRFQ, 'id' | 'submittedAt' | 'status'>): StoredRFQ {
  loadFromFile();
  const id = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const record: StoredRFQ = {
    ...rfqData,
    id,
    submittedAt: new Date().toISOString(),
    status: 'New',
    internalNotes: [],
  };
  memoryStore = [record, ...memoryStore];
  saveToFile();
  return record;
}

export function updateRFQStatus(
  id: string,
  updates: Partial<Pick<StoredRFQ, 'status' | 'internalNotes' | 'estimatedValueUsd' | 'partnerAssigned'>>
): StoredRFQ | null {
  loadFromFile();
  const index = memoryStore.findIndex((r) => r.id === id);
  if (index === -1) return null;

  memoryStore[index] = {
    ...memoryStore[index],
    ...updates,
  };
  saveToFile();
  return memoryStore[index];
}

export function deleteRFQ(id: string): boolean {
  loadFromFile();
  const initialLen = memoryStore.length;
  memoryStore = memoryStore.filter((r) => r.id !== id);
  if (memoryStore.length !== initialLen) {
    saveToFile();
    return true;
  }
  return false;
}
