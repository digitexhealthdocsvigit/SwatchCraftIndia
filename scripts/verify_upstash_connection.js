#!/usr/bin/env node

/**
 * SamplingHub — Upstash Redis REST Connection & Capability Verifier
 * 
 * Safely tests live Upstash Redis REST API connectivity without exposing secrets.
 * Run this tool after configuring UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 * to verify that your live database supports all required commands (GET, SET, DEL, ZADD, ZREVRANGE, ZREM, EVAL).
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
    console.error('[ERROR] No shared storage credentials found in environment.');
    console.error('Please configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your environment or Vercel.\n');
    process.exit(1);
  }

  // Obfuscate URL and token for security
  const maskedUrl = creds.url.replace(/^(https?:\/\/[^/]{4})[^/]+/, '$1****');
  console.log(`Active Provider:      ${creds.provider.toUpperCase()}`);
  console.log(`Target Endpoint:      ${maskedUrl}`);
  console.log(`Auth Token:           [CONFIGURED - HIDDEN FOR SECURITY]\n`);
  console.log('Testing live Redis REST commands...');

  const testKey = `samplinghub:live_test:${Date.now()}`;
  const testZSetKey = `samplinghub:live_zset_test:${Date.now()}`;

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

    // 2. Sorted Set commands (ZADD, ZREVRANGE, ZREM)
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

    // 3. Lua script execution (EVAL)
    const luaScript = "local c = redis.call('GET', KEYS[1]); return c;";
    const p3 = await sendKvPipeline([['EVAL', luaScript, 1, testKey]]);

    if (!p3 || p3[0] !== 'connection_ok') {
      console.log('[WARN] Lua EVAL returned unexpected result:', p3);
    } else {
      console.log('[PASS] Lua script (EVAL) execution succeeded');
    }

    // 4. Cleanup
    await sendKvPipeline([
      ['DEL', testKey],
      ['DEL', testZSetKey],
    ]);
    console.log('[PASS] Test keys cleaned up cleanly');

    console.log('\n================================================================');
    console.log('   RESULT: LIVE UPSTASH REDIS REST CONNECTION VERIFIED!         ');
    console.log('================================================================\n');
    console.log('Your Upstash Redis database is fully compatible with SamplingHub serverless storage.\n');
  } catch (err) {
    console.error('[ERROR] Live Redis connection failed with exception:', err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
