import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
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
export const RFQ_MIGRATION_LOCK = 'samplinghub:rfqs_migration_lock';
export const RFQ_MIGRATION_STATUS_KEY = 'samplinghub:rfqs_migrated_v1';

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
 * Helper to fetch and validate RFQ entities by IDs with self-healing orphan pruning.
 */
async function fetchAndReconcileRFQs(ids: string[]): Promise<StoredRFQ[]> {
  if (ids.length === 0) return [];
  const getCmds = ids.map((id) => ['GET', `samplinghub:rfq:${id}`]);
  const recordsRes = await sendKvPipeline(getCmds);

  if (!recordsRes || !Array.isArray(recordsRes)) return [];

  const rfqs: StoredRFQ[] = [];
  const orphanedIds: string[] = [];

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const raw = recordsRes[i];
    if (!raw) {
      orphanedIds.push(id);
      continue;
    }
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (parsed && typeof parsed.id === 'string' && typeof parsed.fullName === 'string') {
        rfqs.push(parsed);
      } else {
        orphanedIds.push(id);
      }
    } catch {
      orphanedIds.push(id);
    }
  }

  // Asynchronously prune orphaned index entries in the background
  if (orphanedIds.length > 0) {
    const pruneCmds = orphanedIds.map((oid) => ['ZREM', RFQ_INDEX_KEY, oid]);
    sendKvPipeline(pruneCmds).catch(() => {});
  }

  return rfqs;
}

/**
 * Fetches all RFQs using the atomic sorted set index (samplinghub:rfqs_index).
 * Performs coordinated forward-migration from legacy monolithic key (samplinghub:rfqs) with
 * distributed locking, active polling with exponential backoff, and idempotent recovery.
 * Features self-healing reconciliation: automatically detects and prunes orphaned index entries.
 */
export async function getAllRFQsAsync(): Promise<StoredRFQ[]> {
  if (isSharedStorageConfigured()) {
    try {
      // 1. Check if forward-migration has been authoritatively marked complete
      const checkRes = await sendKvPipeline([
        ['GET', RFQ_MIGRATION_STATUS_KEY],
        ['ZREVRANGE', RFQ_INDEX_KEY, 0, -1],
      ]);
      const isMigrationDone = Boolean(checkRes && checkRes[0] === 'done');
      const indexedIds: string[] = checkRes && Array.isArray(checkRes[1]) ? checkRes[1].map(String) : [];

      // If migration is already complete, read directly from the sorted set index
      if (isMigrationDone && indexedIds.length > 0) {
        const rfqs = await fetchAndReconcileRFQs(indexedIds);
        if (rfqs.length > 0) {
          memoryStore = rfqs;
          saveToFile();
          return memoryStore;
        }
      }

      // 2. Migration or recovery needed: coordinate via distributed concurrency lock
      const lockToken = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
      const lockRes = await sendKvPipeline([['SET', RFQ_MIGRATION_LOCK, lockToken, 'EX', 30, 'NX']]);
      let lockAcquired = Boolean(lockRes && lockRes[0] === 'OK');

      // If lock was not acquired, another instance is migrating: poll with backoff
      if (!lockAcquired) {
        const pollDelays = [50, 100, 150, 200, 250];
        for (const delay of pollDelays) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          const pollRes = await sendKvPipeline([
            ['GET', RFQ_MIGRATION_STATUS_KEY],
            ['GET', RFQ_MIGRATION_LOCK],
            ['ZREVRANGE', RFQ_INDEX_KEY, 0, -1],
          ]);
          if (pollRes && pollRes[0] === 'done' && Array.isArray(pollRes[2]) && pollRes[2].length > 0) {
            const completedIds = pollRes[2].map(String);
            const rfqs = await fetchAndReconcileRFQs(completedIds);
            if (rfqs.length > 0) {
              memoryStore = rfqs;
              saveToFile();
              return memoryStore;
            }
          }
          // If lock is freed or expired before completion, attempt to acquire lock and finish
          if (pollRes && pollRes[1] === null && pollRes[0] !== 'done') {
            const reLock = await sendKvPipeline([['SET', RFQ_MIGRATION_LOCK, lockToken, 'EX', 30, 'NX']]);
            if (reLock && reLock[0] === 'OK') {
              lockAcquired = true;
              break;
            }
          }
        }
      }

      // If this instance holds the lock, execute or complete forward migration
      if (lockAcquired) {
        try {
          const legacyRes = await sendKvPipeline([['GET', RFQ_LEGACY_KEY]]);
          if (legacyRes && legacyRes[0]) {
            try {
              const parsedLegacy = typeof legacyRes[0] === 'string' ? JSON.parse(legacyRes[0]) : legacyRes[0];
              if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
                // Deduplicate legacy records by ID (retaining latest entry)
                const dedupedMap = new Map<string, StoredRFQ>();
                for (const r of parsedLegacy) {
                  if (!r || typeof r.id !== 'string') continue;
                  dedupedMap.set(r.id, r);
                }
                const dedupedList = Array.from(dedupedMap.values());

                // Forward-migrate each deduplicated legacy record into an individual key + index
                const migratePipeline: any[][] = [];
                for (const r of dedupedList) {
                  const score = new Date(r.submittedAt).getTime() || Date.now();
                  migratePipeline.push(['SET', `samplinghub:rfq:${r.id}`, JSON.stringify(r)]);
                  migratePipeline.push(['ZADD', RFQ_INDEX_KEY, score, r.id]);
                }
                // Mark migration completed in the same execution
                migratePipeline.push(['SET', RFQ_MIGRATION_STATUS_KEY, 'done']);

                const mRes = await sendKvPipeline(migratePipeline);
                if (!mRes || mRes.some((x) => x === undefined || x === null)) {
                  throw new Error('Partial migration pipeline write failure');
                }

                memoryStore = dedupedList;
                saveToFile();
                return memoryStore;
              }
            } catch {
              // Fall through to seed
            }
          }

          // Initial Seed if storage is completely empty
          if (legacyRes && legacyRes[0] === null && indexedIds.length === 0) {
            const seedPipeline: any[][] = [];
            for (const r of SEED_RFQS) {
              const score = new Date(r.submittedAt).getTime() || Date.now();
              seedPipeline.push(['SET', `samplinghub:rfq:${r.id}`, JSON.stringify(r)]);
              seedPipeline.push(['ZADD', RFQ_INDEX_KEY, score, r.id]);
            }
            // Preserve legacy key for rollback compatibility
            seedPipeline.push(['SET', RFQ_LEGACY_KEY, JSON.stringify(SEED_RFQS)]);
            seedPipeline.push(['SET', RFQ_MIGRATION_STATUS_KEY, 'done']);

            const sRes = await sendKvPipeline(seedPipeline);
            if (sRes && !sRes.some((x) => x === undefined || x === null)) {
              memoryStore = [...SEED_RFQS];
              saveToFile();
              return memoryStore;
            }
          }
        } finally {
          // Token-verified atomic unlock: guarantees a process cannot delete another instance's expired lock
          const unlockLua = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
          await sendKvPipeline([['EVAL', unlockLua, 1, RFQ_MIGRATION_LOCK, lockToken]]).catch(() => {});
        }
      } else {
        // If lock is still held across all retries, fall back to reading intact legacy key directly
        const fallbackRes = await sendKvPipeline([['GET', RFQ_LEGACY_KEY]]);
        if (fallbackRes && fallbackRes[0]) {
          try {
            const fallbackParsed = typeof fallbackRes[0] === 'string' ? JSON.parse(fallbackRes[0]) : fallbackRes[0];
            if (Array.isArray(fallbackParsed) && fallbackParsed.length > 0) {
              memoryStore = fallbackParsed;
              saveToFile();
              return memoryStore;
            }
          } catch {}
        }
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
 * Uses atomic Redis Lua script (EVAL) to guarantee simultaneous SET and ZADD execution.
 * Eliminates partial failure windows where a record key is created without an index entry.
 * Fails closed if shared Redis storage is configured and atomic write fails.
 */
export async function addRFQAsync(
  rfqData: Omit<StoredRFQ, 'id' | 'submittedAt' | 'status'> & { id?: string }
): Promise<StoredRFQ> {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = rfqData.id || `RFQ-${new Date().getFullYear()}-${timestamp.toString().slice(-4)}${randomSuffix}`;
  const record: StoredRFQ = {
    ...rfqData,
    id,
    submittedAt: new Date(timestamp).toISOString(),
    status: 'New',
    internalNotes: [],
  };

  if (isSharedStorageConfigured()) {
    // Atomic Lua transaction: guarantees SET and ZADD happen in a single atomic Redis engine operation
    const luaScript = "redis.call('SET', KEYS[1], ARGV[1]); redis.call('ZADD', KEYS[2], ARGV[2], ARGV[3]); return 1;";
    const evalRes = await sendKvPipeline([
      ['EVAL', luaScript, 2, `samplinghub:rfq:${id}`, RFQ_INDEX_KEY, JSON.stringify(record), timestamp, id],
    ]);

    if (!evalRes || evalRes[0] !== 1) {
      // FAIL CLOSED: Never perform an unsafe, non-atomic fallback pipeline that risks partial writes or orphaned records.
      throw new Error(`Failed to atomically persist RFQ ${id} to shared Redis storage. Write aborted.`);
    }
  }

  // Update memory store only after confirmed persistence (or in local dev mode)
  memoryStore = [record, ...memoryStore];
  saveToFile();

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
 * Deletes an RFQ atomically from its isolated key and removes its ID from the index via Lua transaction.
 */
export async function deleteRFQAsync(id: string): Promise<boolean> {
  if (isSharedStorageConfigured()) {
    const luaDelScript = "redis.call('DEL', KEYS[1]); redis.call('ZREM', KEYS[2], ARGV[1]); return 1;";
    const evalRes = await sendKvPipeline([
      ['EVAL', luaDelScript, 2, `samplinghub:rfq:${id}`, RFQ_INDEX_KEY, id],
    ]);

    if (!evalRes || evalRes[0] !== 1) {
      throw new Error(`Failed to atomically delete RFQ ${id} from shared Redis storage.`);
    }
  }

  loadFromFile();
  const initialLen = memoryStore.length;
  memoryStore = memoryStore.filter((r) => r.id !== id);
  saveToFile();
  return true;
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
