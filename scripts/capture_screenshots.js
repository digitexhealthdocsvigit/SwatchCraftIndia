import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const outDir = path.resolve(__dirname, '../docs/screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

// Create local SPA static server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/api/admin/session') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ authenticated: true, user: { email: 'admin@swatchcraft.com', role: 'superadmin' } }));
    return;
  }
  if (reqPath === '/api/admin/rfqs') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      count: 3,
      rfqs: [
        {
          id: 'RFQ-2026-9041',
          fullName: 'Marco Moretti',
          companyName: 'Moretti Tessuti Milano',
          email: 'm.moretti@morettitessuti.it',
          productType: 'Hardbound Wallpaper Catalogs',
          quantity: '120 Units (45x45 cm)',
          exportMarket: 'European Union (Italy)',
          submittedAt: new Date().toISOString(),
          status: 'Under Review',
          estimatedValueUsd: 14500,
        },
      ],
    }));
    return;
  }

  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const PORT = 4188;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

server.listen(PORT, async () => {
  console.log(`Preview server listening on http://localhost:${PORT}`);

  const targets = [
    { name: '01_homepage_desktop.png', path: '/', width: 1440, height: 900 },
    { name: '02_portfolio_desktop.png', path: '/portfolio', width: 1440, height: 900 },
    { name: '03_manufacturing_process_desktop.png', path: '/manufacturing-process', width: 1440, height: 900 },
    { name: '04_products_desktop.png', path: '/products', width: 1440, height: 900 },
    { name: '05_homepage_mobile.png', path: '/', width: 375, height: 812 },
    { name: '06_portfolio_mobile.png', path: '/portfolio', width: 375, height: 812 },
    { name: '07_admin_login.png', path: '/admin', width: 1440, height: 900 },
  ];

  for (const t of targets) {
    const outFile = path.join(outDir, t.name);
    const targetUrl = `http://localhost:${PORT}${t.path}`;
    console.log(`Capturing ${t.name} from ${targetUrl}...`);

    await new Promise((resolve) => {
      const args = [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        `--window-size=${t.width},${t.height}`,
        `--screenshot=${outFile}`,
        '--virtual-time-budget=3000',
        targetUrl,
      ];
      execFile(CHROME_PATH, args, (err) => {
        if (err) console.error(`Error capturing ${t.name}:`, err);
        else console.log(`✓ Saved ${t.name}`);
        resolve();
      });
    });
  }

  // Target 8: Admin Dashboard (inject localStorage token before render)
  // Let's create an html wrapper that sets localStorage and redirects to /admin
  const authHtmlPath = path.join(distDir, '_auth_inject.html');
  fs.writeFileSync(
    authHtmlPath,
    `<!DOCTYPE html><html><body><script>
      localStorage.setItem('samplinghub_admin_token', 'audit-test-session-token');
      localStorage.setItem('samplinghub_admin_session', 'true');
      window.location.href = '/admin';
    </script></body></html>`
  );

  const t8 = { name: '08_admin_dashboard.png', path: '/_auth_inject.html', width: 1440, height: 900 };
  const outFile8 = path.join(outDir, t8.name);
  console.log(`Capturing ${t8.name}...`);
  await new Promise((resolve) => {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      `--window-size=${t8.width},${t8.height}`,
      `--screenshot=${outFile8}`,
      '--virtual-time-budget=4000',
      `http://localhost:${PORT}${t8.path}`,
    ];
    execFile(CHROME_PATH, args, (err) => {
      if (err) console.error(`Error capturing ${t8.name}:`, err);
      else console.log(`✓ Saved ${t8.name}`);
      resolve();
    });
  });

  if (fs.existsSync(authHtmlPath)) {
    fs.unlinkSync(authHtmlPath);
  }

  server.close(() => {
    console.log('Finished capturing all 8 screenshots.');
    process.exit(0);
  });
});
