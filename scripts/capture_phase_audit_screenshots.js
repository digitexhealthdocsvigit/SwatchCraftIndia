import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const outDir = path.resolve(__dirname, '../docs/screenshots/audit_remediation');

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

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];

  // API mocks for local preview
  if (reqPath === '/api/admin/session') {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ authenticated: false, error: 'Unauthenticated' }));
    return;
  }
  if (reqPath === '/api/admin/login') {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Auth not configured', code: 'AUTH_NOT_CONFIGURED' }));
    return;
  }

  let filePath = path.join(distDir, reqPath === '/' ? 'index.html' : reqPath);
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

const PORT = 4199;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

server.listen(PORT, async () => {
  console.log(`Preview server listening on http://localhost:${PORT}`);

  const targets = [
    { name: 'audit_01_homepage_footer_desktop.png', path: '/', width: 1440, height: 900, scroll: true },
    { name: 'audit_02_homepage_footer_mobile.png', path: '/', width: 375, height: 812, scroll: true },
    { name: 'audit_03_about_page_remediated.png', path: '/about', width: 1440, height: 900 },
    { name: 'audit_04_manufacturing_process_qc.png', path: '/manufacturing-process', width: 1440, height: 900 },
    { name: 'audit_05_blog_hub_remediated.png', path: '/blog', width: 1440, height: 900 },
    { name: 'audit_06_admin_login_portal.png', path: '/admin', width: 1440, height: 900 },
  ];

  for (const t of targets) {
    const targetUrl = `http://localhost:${PORT}${t.path}`;
    const outFile = path.join(outDir, t.name);
    console.log(`Capturing ${t.name}...`);
    await new Promise((resolve) => {
      const args = [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        `--window-size=${t.width},${t.height}`,
        `--screenshot=${outFile}`,
        '--virtual-time-budget=4000',
        targetUrl,
      ];
      execFile(CHROME_PATH, args, (err) => {
        if (err) console.error(`Error capturing ${t.name}:`, err);
        else console.log(`✓ Saved ${t.name}`);
        resolve();
      });
    });
  }

  server.close(() => {
    console.log('Finished capturing screenshots.');
    process.exit(0);
  });
});
