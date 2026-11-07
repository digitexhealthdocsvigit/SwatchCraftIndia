import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('docs/screenshots/live_production');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const BASE_URL = 'https://www.samplinghub.world';

const PAGES = [
  '/',
  '/about',
  '/products',
  '/portfolio',
  '/manufacturing-process',
  '/export-markets',
  '/contact',
  '/admin',
  '/admin/login',
];

async function checkRoutes() {
  console.log('=== CHECKING LIVE PRODUCTION HTTP ROUTES ===');
  for (const p of PAGES) {
    try {
      const res = await fetch(`${BASE_URL}${p}`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      console.log(`[HTTP ${res.status}] ${p}`);
    } catch (err) {
      console.error(`[ERROR] ${p}:`, err.message);
    }
  }

  console.log('\n=== CHECKING LIVE PRODUCTION API ENDPOINTS ===');
  try {
    const rfqsRes = await fetch(`${BASE_URL}/api/admin/rfqs`);
    console.log(`[API ${rfqsRes.status}] GET /api/admin/rfqs (Unauthenticated)`);

    const sessionRes = await fetch(`${BASE_URL}/api/admin/session`);
    console.log(`[API ${sessionRes.status}] GET /api/admin/session (Unauthenticated)`);

    const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@invalid.com', password: 'badpassword' }),
    });
    console.log(`[API ${loginRes.status}] POST /api/admin/login (Invalid credentials)`);
  } catch (err) {
    console.error('API probe error:', err);
  }
}

const SCREENSHOT_TARGETS = [
  { name: 'prod_01_homepage_desktop_1920.png', path: '/', width: 1920, height: 1080 },
  { name: 'prod_02_portfolio_desktop_1920.png', path: '/portfolio', width: 1920, height: 1080 },
  { name: 'prod_03_manufacturing_process_desktop_1920.png', path: '/manufacturing-process', width: 1920, height: 1080 },
  { name: 'prod_04_products_desktop_1366.png', path: '/products', width: 1366, height: 768 },
  { name: 'prod_05_homepage_mobile_390.png', path: '/', width: 390, height: 844 },
  { name: 'prod_06_portfolio_mobile_375.png', path: '/portfolio', width: 375, height: 667 },
  { name: 'prod_07_admin_login_desktop.png', path: '/admin', width: 1440, height: 900 },
  { name: 'prod_08_manufacturing_tablet_768.png', path: '/manufacturing-process', width: 768, height: 1024 },
];

async function captureScreenshots() {
  console.log('\n=== CAPTURING REAL LIVE PRODUCTION SCREENSHOTS ===');
  for (const t of SCREENSHOT_TARGETS) {
    const targetUrl = `${BASE_URL}${t.path}`;
    const outFile = path.join(outDir, t.name);
    console.log(`Capturing ${t.name} (${t.width}x${t.height}) from ${targetUrl}...`);
    await new Promise((resolve) => {
      const args = [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        `--window-size=${t.width},${t.height}`,
        `--screenshot=${outFile}`,
        '--virtual-time-budget=5000',
        targetUrl,
      ];
      execFile(CHROME_PATH, args, (err) => {
        if (err) console.error(`Error capturing ${t.name}:`, err);
        else console.log(`✓ Successfully saved ${t.name}`);
        resolve();
      });
    });
  }
}

async function main() {
  await checkRoutes();
  await captureScreenshots();
  console.log('\nAll live production verifications completed!');
}

main().catch(console.error);
