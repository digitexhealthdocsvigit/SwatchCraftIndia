import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { isSharedStorageConfigured, sendKvPipeline } from './auth.ts';

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
export const RFQ_INDEX_KEY = 'samplinghub:rfqs_index';
export const RFQ_LEGACY_KEY = 'samplinghub:rfqs';

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

/**
 * Fetches all RFQs using the atomic sorted set index (samplinghub:rfqs_index).
 * Performs automatic forward-migration from legacy monolithic key (samplinghub:rfqs) if index is uninitialized.
 */
export async function getAllRFQsAsync(): Promise<StoredRFQ[]> {
  if (isSharedStorageConfigured()) {
    try {
      // 1. Fetch all RFQ IDs from the atomic sorted set index (ordered newest first)
      const indexRes = await sendKvPipeline([['ZREVRANGE', RFQ_INDEX_KEY, 0, -1]]);
      let ids: string[] = [];

      if (indexRes && Array.isArray(indexRes[0])) {
        ids = indexRes[0].map(String);
      }

      // 2. If index has records, fetch all entities in parallel pipeline
      if (ids.length > 0) {
        const getCmds = ids.map((id) => ['GET', `samplinghub:rfq:${id}`]);
        const recordsRes = await sendKvPipeline(getCmds);

        if (recordsRes && Array.isArray(recordsRes)) {
          const rfqs: StoredRFQ[] = [];
          for (let i = 0; i < recordsRes.length; i++) {
            const raw = recordsRes[i];
            if (!raw) continue;
            try {
              const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
              if (parsed && typeof parsed.id === 'string' && typeof parsed.fullName === 'string') {
                rfqs.push(parsed);
              }
            } catch {
              // Skip malformed records safely
            }
          }
          if (rfqs.length > 0) {
            memoryStore = rfqs;
            saveToFile();
            return memoryStore;
          }
        }
      }

      // 3. Migration / Seeding check:
      // If index was empty, check if legacy monolithic key 'samplinghub:rfqs' exists
      const legacyRes = await sendKvPipeline([['GET', RFQ_LEGACY_KEY]]);
      if (legacyRes && legacyRes[0]) {
        try {
          const parsedLegacy = typeof legacyRes[0] === 'string' ? JSON.parse(legacyRes[0]) : legacyRes[0];
          if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
            // Forward-migrate each legacy record into an individual key + index
            const migratePipeline: any[][] = [];
            for (const r of parsedLegacy) {
              const score = new Date(r.submittedAt).getTime() || Date.now();
              migratePipeline.push(['SET', `samplinghub:rfq:${r.id}`, JSON.stringify(r)]);
              migratePipeline.push(['ZADD', RFQ_INDEX_KEY, score, r.id]);
            }
            await sendKvPipeline(migratePipeline);
            memoryStore = parsedLegacy;
            saveToFile();
            return memoryStore;
          }
        } catch {
          // Fall through to seed
        }
      }

      // 4. Initial Seed if storage is completely empty
      if (legacyRes && legacyRes[0] === null && ids.length === 0) {
        const seedPipeline: any[][] = [];
        for (const r of SEED_RFQS) {
          const score = new Date(r.submittedAt).getTime() || Date.now();
          seedPipeline.push(['SET', `samplinghub:rfq:${r.id}`, JSON.stringify(r)]);
          seedPipeline.push(['ZADD', RFQ_INDEX_KEY, score, r.id]);
        }
        // Also maintain legacy key for rollback compatibility
        seedPipeline.push(['SET', RFQ_LEGACY_KEY, JSON.stringify(SEED_RFQS)]);
        await sendKvPipeline(seedPipeline);
        memoryStore = [...SEED_RFQS];
        saveToFile();
        return memoryStore;
      }
    } catch {
      // Fall back to local file/memory
    }
  }

  loadFromFile();
  return memoryStore;
}

/**
 * Creates and persists a new RFQ.
 * Writes to an isolated individual key (samplinghub:rfq:<id>) and atomically registers the ID
 * in the sorted set index (samplinghub:rfqs_index), eliminating read-modify-write lost-update races.
 */
export async function addRFQAsync(
  rfqData: Omit<StoredRFQ, 'id' | 'submittedAt' | 'status'>
): Promise<StoredRFQ> {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = `RFQ-${new Date().getFullYear()}-${timestamp.toString().slice(-4)}${randomSuffix}`;
  const record: StoredRFQ = {
    ...rfqData,
    id,
    submittedAt: new Date(timestamp).toISOString(),
    status: 'New',
    internalNotes: [],
  };

  memoryStore = [record, ...memoryStore];
  saveToFile();

  if (isSharedStorageConfigured()) {
    try {
      await sendKvPipeline([
        ['SET', `samplinghub:rfq:${id}`, JSON.stringify(record)],
        ['ZADD', RFQ_INDEX_KEY, timestamp, id],
      ]);
    } catch {
      // Non-fatal fallback
    }
  }

  return record;
}

/**
 * Updates a single RFQ atomically by its isolated key without affecting other RFQ entries.
 */
export async function updateRFQStatusAsync(
  id: string,
  updates: Partial<Pick<StoredRFQ, 'status' | 'internalNotes' | 'estimatedValueUsd' | 'partnerAssigned'>>
): Promise<StoredRFQ | null> {
  let existing: StoredRFQ | null = null;

  if (isSharedStorageConfigured()) {
    try {
      const res = await sendKvPipeline([['GET', `samplinghub:rfq:${id}`]]);
      if (res && res[0]) {
        existing = typeof res[0] === 'string' ? JSON.parse(res[0]) : res[0];
      }
    } catch {
      // Fall back to memory
    }
  }

  if (!existing) {
    loadFromFile();
    const found = memoryStore.find((r) => r.id === id);
    if (!found) return null;
    existing = found;
  }

  const updatedRecord: StoredRFQ = {
    ...existing,
    ...updates,
  };

  const idx = memoryStore.findIndex((r) => r.id === id);
  if (idx !== -1) {
    memoryStore[idx] = updatedRecord;
  } else {
    memoryStore = [updatedRecord, ...memoryStore];
  }
  saveToFile();

  if (isSharedStorageConfigured()) {
    try {
      await sendKvPipeline([['SET', `samplinghub:rfq:${id}`, JSON.stringify(updatedRecord)]]);
    } catch {
      // Non-fatal fallback
    }
  }

  return updatedRecord;
}

/**
 * Deletes an RFQ atomically from its isolated key and removes its ID from the index.
 */
export async function deleteRFQAsync(id: string): Promise<boolean> {
  loadFromFile();
  const initialLen = memoryStore.length;
  memoryStore = memoryStore.filter((r) => r.id !== id);
  saveToFile();

  if (isSharedStorageConfigured()) {
    try {
      const delRes = await sendKvPipeline([
        ['DEL', `samplinghub:rfq:${id}`],
        ['ZREM', RFQ_INDEX_KEY, id],
      ]);
      return Boolean(delRes && delRes[0]);
    } catch {
      // Non-fatal fallback
    }
  }

  return memoryStore.length !== initialLen;
}

// Synchronous exports for local backwards compatibility
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
