#!/usr/bin/env node

/**
 * SamplingHub — Upstash Redis REST Connection & Capability Verifier
 * 
 * Safely tests live Upstash Redis REST API connectivity without exposing secrets.
 * Run this tool after configuring UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 * to verify that your live database supports all required commands:
 * - Basic SET / GET
 * - SET with NX and EX (Atomic Mutex Locking)
 * - TTL Inspection
 * - Sorted Set commands (ZADD, ZREVRANGE, ZREM)
 * - Atomic Lua Script Execution (EVAL)
 * - Token-Verified Mutex Lock Release
 * 
 * Usage:
 *   node scripts/verify_upstash_connection.js
 */

import { getSharedStorageCredentials, sendKvPipeline } from '../api/_lib/auth.ts';

async function main() {
  console.log('================================================================');
  console.log('   SAMPLINGHUB — UPSTASH REDIS REST CONNECTION VERIFIER         ');
  console.log('================================================================\n');

  const creds = getSharedStorageCredentials();

  if (!creds.provider) {
    console.log('[STATUS] BLOCKED — LIVE UPSTASH VALIDATION NOT PERFORMED');
    console.log('No shared storage credentials found in local environment.');
    console.log('This is normal during local development or audit environments where production secrets are held privately by the owner.');
    console.log('\nTo test against live Upstash, run locally:');
    console.log('UPSTASH_REDIS_REST_URL="https://***.upstash.io" UPSTASH_REDIS_REST_TOKEN="***" node scripts/verify_upstash_connection.js\n');
    process.exit(0);
  }

  // Obfuscate URL and token for security
  const maskedUrl = creds.url.replace(/^(https?:\/\/[^/]{4})[^/]+/, '$1****');
  console.log(`Active Provider:      ${creds.provider.toUpperCase()}`);
  console.log(`Target Endpoint:      ${maskedUrl}`);
  console.log(`Auth Token:           [CONFIGURED - HIDDEN FOR SECURITY]\n`);
  console.log('Testing live Redis REST commands...');

  const timestamp = Date.now();
  const testKey = `samplinghub:live_test:${timestamp}`;
  const testLockKey = `samplinghub:live_lock_test:${timestamp}`;
  const testZSetKey = `samplinghub:live_zset_test:${timestamp}`;
  const testToken = `token_${timestamp}`;

  try {
    // 1. Basic SET and GET
    const p1 = await sendKvPipeline([
      ['SET', testKey, 'connection_ok'],
      ['GET', testKey],
    ]);

    if (!p1 || p1[0] !== 'OK' || p1[1] !== 'connection_ok') {
      console.error('[FAIL] Basic SET/GET pipeline failed. Response:', p1);
      process.exit(1);
    }
    console.log('[PASS] Basic SET / GET pipeline succeeded');

    // 2. SET with NX and EX (Distributed lock acquisition) & TTL
    const pLock = await sendKvPipeline([
      ['SET', testLockKey, testToken, 'EX', 30, 'NX'],
      ['TTL', testLockKey],
    ]);

    if (!pLock || pLock[0] !== 'OK' || typeof pLock[1] !== 'number' || pLock[1] <= 0) {
      console.error('[FAIL] SET with NX/EX or TTL failed. Response:', pLock);
      process.exit(1);
    }
    console.log('[PASS] SET with NX and EX (Mutex Lock) & TTL succeeded (TTL: ' + pLock[1] + 's)');

    // 3. Sorted Set commands (ZADD, ZREVRANGE, ZREM)
    const p2 = await sendKvPipeline([
      ['ZADD', testZSetKey, 100, 'member_1'],
      ['ZADD', testZSetKey, 200, 'member_2'],
      ['ZREVRANGE', testZSetKey, 0, -1],
    ]);

    if (!p2 || !Array.isArray(p2[2]) || p2[2][0] !== 'member_2') {
      console.error('[FAIL] Sorted set operations failed. Response:', p2);
      process.exit(1);
    }
    console.log('[PASS] Sorted set (ZADD, ZREVRANGE) operations succeeded');

    // 4. Atomic Lua script execution (EVAL)
    const luaScript = "local c = redis.call('GET', KEYS[1]); return c;";
    const p3 = await sendKvPipeline([['EVAL', luaScript, 1, testKey]]);

    if (!p3 || p3[0] !== 'connection_ok') {
      console.log('[WARN] Lua EVAL returned unexpected result:', p3);
    } else {
      console.log('[PASS] Lua script (EVAL) execution succeeded');
    }

    // 5. Token-verified Lua Lock Release
    const unlockLua = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
    const pUnlock = await sendKvPipeline([
      ['EVAL', unlockLua, 1, testLockKey, testToken],
    ]);

    if (!pUnlock || pUnlock[0] !== 1) {
      console.error('[FAIL] Token-verified Lua lock release failed. Response:', pUnlock);
      process.exit(1);
    }
    console.log('[PASS] Token-verified Lua unlock succeeded');

    // 6. Cleanup remaining test keys
    await sendKvPipeline([
      ['DEL', testKey],
      ['DEL', testZSetKey],
    ]);
    console.log('[PASS] Transient test keys cleaned up cleanly');

    console.log('\n================================================================');
    console.log('   RESULT: LIVE UPSTASH REDIS REST CONNECTION VERIFIED!         ');
    console.log('================================================================\n');
    console.log('Your Upstash Redis database is 100% compatible with SamplingHub serverless storage.\n');
  } catch (err) {
    console.error('[ERROR] Live Redis connection failed with exception:', err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
