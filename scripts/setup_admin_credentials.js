#!/usr/bin/env node

/**
 * SamplingHub — Secure First Administrator Credential Generator
 * 
 * This tool allows the business owner to choose an administrator email address
 * they control, create their private superadministrator password locally, and
 * generate the required Vercel environment variables using RFC 7914 scrypt.
 * 
 * SECURITY GUARANTEES:
 * 1. The plaintext password is NEVER stored on disk, logged, or committed to Git.
 * 2. Inputs are masked in the terminal with asterisks.
 * 3. A standard scrypt password hash is computed using a 16-byte random salt.
 * 4. A cryptographically strong HMAC-SHA256 session secret is generated on the fly.
 * 5. The resulting configuration keys are output directly to the terminal for the owner
 *    to paste into their Vercel Environment Variables dashboard.
 */

import crypto from 'node:crypto';
import readline from 'node:readline';

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });
}

function askHiddenQuestion(query) {
  return new Promise((resolve) => {
    process.stdout.write(query);
    const stdin = process.stdin;
    const wasRaw = stdin.isRaw;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    let password = '';

    const onData = (ch) => {
      ch = String(ch);
      switch (ch) {
        case '\n':
        case '\r':
        case '\u0004':
          stdin.setRawMode(wasRaw);
          stdin.pause();
          stdin.removeListener('data', onData);
          process.stdout.write('\n');
          resolve(password);
          break;
        case '\u0003': // Ctrl+C
          stdin.setRawMode(wasRaw);
          stdin.pause();
          process.stdout.write('\nAborted.\n');
          process.exit(1);
          break;
        case '\u0008':
        case '\x7f': // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          password += ch;
          process.stdout.write('*');
          break;
      }
    };

    stdin.on('data', onData);
  });
}

async function main() {
  console.log('\n================================================================');
  console.log('   SAMPLINGHUB — FIRST ADMINISTRATOR ACCOUNT SETUP GENERATOR    ');
  console.log('================================================================\n');
  console.log('This script will generate your private admin credentials for:');
  console.log('https://www.samplinghub.world/admin\n');

  // Step 1: Owner-Chosen Administrator Email
  let adminEmail = '';
  while (!adminEmail) {
    const emailInput = await askQuestion('Enter your Administrator Email address: ');
    if (emailInput && emailInput.includes('@') && emailInput.includes('.')) {
      adminEmail = emailInput.toLowerCase().trim();
    } else {
      console.log('Please enter a valid email address (e.g., owner@samplinghub.world or your chosen address).\n');
    }
  }

  // Step 2: Password with masking
  console.log('\nEnter your private administrator password.');
  console.log('(Input is masked with asterisks and will NOT be written to any file):');
  const pass1 = await askHiddenQuestion('Enter Password: ');

  if (!pass1 || pass1.length < 8) {
    console.error('\n[ERROR] Password must be at least 8 characters in length for security.');
    process.exit(1);
  }

  const pass2 = await askHiddenQuestion('Confirm Password: ');

  if (pass1 !== pass2) {
    console.error('\n[ERROR] Passwords do not match. Please run the script again.');
    process.exit(1);
  }

  // Step 3: Compute standard RFC 7914 scrypt password hash with 16-byte random salt
  const salt = crypto.randomBytes(16).toString('hex');
  const N = 16384;
  const r = 8;
  const p = 1;
  const keylen = 64;
  const derivedKey = crypto.scryptSync(pass1, salt, keylen, { N, r, p });
  const passwordHash = `$scrypt$N=${N},r=${r},p=${p}$${salt}$${derivedKey.toString('hex')}`;

  // Step 4: Generate a high-entropy 64-character hex session secret
  const sessionSecret = crypto.randomBytes(32).toString('hex');

  console.log('\n================================================================');
  console.log('           ADMIN CREDENTIALS GENERATED SUCCESSFULLY             ');
  console.log('================================================================\n');
  console.log(`Configured Administrator Email:  ${adminEmail}\n`);
  console.log('Add the following THREE environment variables to your Vercel Project:');
  console.log('(Go to: Vercel Dashboard -> SwatchCraftIndia -> Settings -> Environment Variables)\n');
  console.log('----------------------------------------------------------------');
  console.log('VARIABLE 1:');
  console.log('Name:   ADMIN_EMAIL');
  console.log(`Value:  ${adminEmail}`);
  console.log('Target: Production, Preview, Development (Select all 3)');
  console.log('----------------------------------------------------------------');
  console.log('VARIABLE 2:');
  console.log('Name:   ADMIN_PASSWORD_HASH');
  console.log(`Value:  ${passwordHash}`);
  console.log('Target: Production, Preview, Development (Select all 3)');
  console.log('----------------------------------------------------------------');
  console.log('VARIABLE 3:');
  console.log('Name:   ADMIN_SESSION_SECRET');
  console.log(`Value:  ${sessionSecret}`);
  console.log('Target: Production, Preview, Development (Select all 3)');
  console.log('----------------------------------------------------------------\n');
  console.log('NEXT STEPS:');
  console.log('1. Copy VARIABLE 1, 2, and 3 into your Vercel Project Settings.');
  console.log('2. Redeploy the latest commit in Vercel to activate the new environment variables.');
  console.log(`3. Navigate to https://www.samplinghub.world/admin and log in with ${adminEmail}`);
  console.log('   using the private password you just created.\n');
}

main().catch((err) => {
  console.error('\nFatal error generating credentials:', err);
  process.exit(1);
});
