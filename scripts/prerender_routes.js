#!/usr/bin/env node

/**
 * Build-time static route prerenderer for Vite + React + Vercel.
 * Generates route-specific HTML files in dist/ for every valid route plus dist/404.html,
 * guaranteeing that Googlebot and HTTP clients receive unique titles, descriptions,
 * self-referencing canonicals, Open Graph tags, robots directives, and JSON-LD
 * directly in the initial HTML response without waiting for client JS hydration.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  ROUTE_SEO_REGISTRY,
  NOT_FOUND_SEO_CONFIG,
  APPROVED_COMPANY_POSITIONING,
} from '../utils/seoMetadata.ts';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderRouteHtml(templateHtml, config) {
  let html = templateHtml;

  const safeTitle = escapeHtml(config.title);
  const safeDesc = escapeHtml(config.description);
  const safeRobots = escapeHtml(config.robots);
  const safeOgType = escapeHtml(config.ogType);
  const safeOgImage = escapeHtml(config.ogImage);

  // 1. Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);

  // 2. Replace <meta name="title">
  html = html.replace(
    /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="title" content="${safeTitle}">`
  );

  // 3. Replace <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${safeDesc}">`
  );

  // 4. Replace <meta name="robots">
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${safeRobots}">`
  );

  // 5. Replace Open Graph tags
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${safeOgType}">`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${safeOgImage}" />`
  );

  if (config.canonical) {
    const safeCanonical = escapeHtml(config.canonical);
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${safeCanonical}">`
    );
    // Ensure exactly one <link rel="canonical">
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\s*/gi, '');
    html = html.replace(
      /(<link\s+rel="icon"[^>]*>)/i,
      `<link rel="canonical" href="${safeCanonical}" />\n    $1`
    );
  } else {
    html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>\s*/gi, '');
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\s*/gi, '');
  }

  // 6. Replace JSON-LD structured data
  if (config.jsonLd) {
    const jsonString = JSON.stringify(config.jsonLd, null, 2);
    html = html.replace(
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${jsonString}\n    </script>`
    );
  } else {
    html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
  }

  // 7. Replace initial pre-rendered semantic <div id="root"> content for non-root routes
  if (config.path !== '/') {
    const safeH1 = escapeHtml(config.h1);
    const safeLead = escapeHtml(config.leadText);
    const safePositioning = escapeHtml(APPROVED_COMPANY_POSITIONING);
    const rootBlock = `<div id="root">
      <header>
        <h1>${safeH1}</h1>
      </header>
      <main>
        <section>
          <p>${safeLead}</p>
          <p>${safePositioning}</p>
          <p>Registered Office &amp; Central Dispatch Coordination Hub: Thane Bhiwandi, PIN: 421302, Maharashtra, India.</p>
        </section>
      </main>
    </div>`;
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, rootBlock);
  }

  return html;
}

function main() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const baseIndexFile = path.join(distDir, 'index.html');

  if (!fs.existsSync(baseIndexFile)) {
    console.error('[PRERENDER] dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(baseIndexFile, 'utf8');
  let generatedCount = 0;

  for (const [routePath, config] of Object.entries(ROUTE_SEO_REGISTRY)) {
    const routeHtml = renderRouteHtml(templateHtml, config);

    if (routePath === '/') {
      fs.writeFileSync(baseIndexFile, routeHtml, 'utf8');
      generatedCount++;
      continue;
    }

    const relPath = routePath.replace(/^\/+/, '');
    const routeDir = path.join(distDir, relPath);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
    fs.writeFileSync(path.join(distDir, `${relPath}.html`), routeHtml, 'utf8');
    generatedCount++;
  }

  // Generate dist/404.html for real HTTP 404 responses on unknown routes
  const notFoundHtml = renderRouteHtml(templateHtml, NOT_FOUND_SEO_CONFIG);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');
  generatedCount++;

  console.log(`[PRERENDER] Successfully generated ${generatedCount} route-specific HTML documents (including dist/404.html).`);
}

main();
