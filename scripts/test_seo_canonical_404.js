/**
 * Automated Verification Suite for Prompt 16:
 * Technical SEO Repair, Canonicals, Real 404 Responses, Redirects, Sitemap & Public Content Accuracy
 *
 * Run via: npx tsx scripts/test_seo_canonical_404.js
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import {
  PREFERRED_ORIGIN,
  ROUTE_SEO_REGISTRY,
  NOT_FOUND_SEO_CONFIG,
  applyClientSeoMetadata,
} from '../utils/seoMetadata.ts';

const ROUTES_LIST = Object.values(ROUTE_SEO_REGISTRY);
const SITEMAP_INDEXABLE_ROUTES = ROUTES_LIST.filter((r) => r.inSitemap);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('================================================================================');
console.log('SAMPLINGHUB — TECHNICAL SEO, CANONICAL, 404, REDIRECT & CLAIMS VERIFICATION');
console.log('================================================================================\n');

// ---------------------------------------------------------------------------
// 1. Verify vercel.json Redirects, API Rewrites, and Explicit Route Rewrites
// ---------------------------------------------------------------------------
console.log('[1/6] Verifying vercel.json redirect and rewrite rules...');
const vercelConfig = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'vercel.json'), 'utf8'));

assert(Array.isArray(vercelConfig.redirects), 'vercel.json has redirects array');
const nonWwwRedirect = vercelConfig.redirects.find(
  (r) =>
    r.destination === 'https://www.samplinghub.world/:path*' &&
    (r.permanent === true || r.statusCode === 301) &&
    Array.isArray(r.has) &&
    r.has.some((h) => h.type === 'host' && h.value === 'samplinghub.world')
);
assert(Boolean(nonWwwRedirect), '301 permanent redirect from samplinghub.world to https://www.samplinghub.world/:path* is present');

// Ensure no redirect loop (www.samplinghub.world must not redirect to itself)
const loopRedirect = vercelConfig.redirects.find(
  (r) => Array.isArray(r.has) && r.has.some((h) => h.type === 'host' && h.value === 'www.samplinghub.world')
);
assert(!loopRedirect, 'No redirect loop exists on www.samplinghub.world host');

// Check rewrites
assert(Array.isArray(vercelConfig.rewrites), 'vercel.json has rewrites array');
const apiRewrite = vercelConfig.rewrites.find((r) => r.source === '/api/(.*)' && r.destination === '/api/$1');
assert(Boolean(apiRewrite), 'API rewrite /api/(.*) -> /api/$1 is preserved');

const catchAllSpaRewrite = vercelConfig.rewrites.find(
  (r) => r.source.includes('(?!api/)') || r.source === '/(.*)' || r.source === '/:path*'
);
assert(!catchAllSpaRewrite, 'Legacy catch-all SPA rewrite to /index.html has been removed (prevents soft-404s)');

// Every non-root known route must have an explicit rewrite in vercel.json
for (const route of ROUTES_LIST) {
  if (route.path === '/') continue;
  const matchingRewrite = vercelConfig.rewrites.find(
    (r) => r.source === route.path && r.destination === `${route.path}/index.html`
  );
  assert(
    Boolean(matchingRewrite),
    `vercel.json has explicit rewrite for valid route ${route.path} -> ${route.path}/index.html`
  );
}

// ---------------------------------------------------------------------------
// 2. Verify Pre-Rendered HTML Files in dist/ (Unique Titles, Descriptions, Canonicals, JSON-LD)
// ---------------------------------------------------------------------------
console.log('[2/6] Verifying pre-rendered static HTML files in dist/...');
assert(fs.existsSync(DIST_DIR), 'dist/ directory exists');

const seenTitles = new Map();
const seenDescriptions = new Map();
const seenCanonicals = new Map();

function countMatches(str, regex) {
  const m = str.match(regex);
  return m ? m.length : 0;
}

for (const route of ROUTES_LIST) {
  const relFile = route.path === '/' ? 'index.html' : `${route.path.replace(/^\//, '')}/index.html`;
  const fullPath = path.join(DIST_DIR, relFile);
  assert(fs.existsSync(fullPath), `Pre-rendered HTML file exists for ${route.path} (${relFile})`);
  if (!fs.existsSync(fullPath)) continue;

  const html = fs.readFileSync(fullPath, 'utf8');

  // Title uniqueness & accuracy
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(Boolean(titleMatch), `${route.path} has a <title> tag`);
  const titleText = titleMatch ? titleMatch[1].trim() : '';
  assert(titleText.length > 10, `${route.path} has non-empty <title>`);
  assert(!seenTitles.has(titleText), `${route.path} has a unique <title> (not shared with ${seenTitles.get(titleText)})`);
  seenTitles.set(titleText, route.path);

  // Meta description uniqueness & accuracy
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
  assert(Boolean(descMatch), `${route.path} has <meta name="description">`);
  const descText = descMatch ? descMatch[1].trim() : '';
  assert(descText.length > 30, `${route.path} has descriptive <meta name="description">`);
  assert(
    !seenDescriptions.has(descText),
    `${route.path} has a unique <meta name="description"> (not shared with ${seenDescriptions.get(descText)})`
  );
  seenDescriptions.set(descText, route.path);

  // Robots tag
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"\s*\/?>/i);
  assert(Boolean(robotsMatch) && robotsMatch[1] === route.robots, `${route.path} has robots="${route.robots}"`);

  // Canonical tag rules
  const canonicalCount = countMatches(html, /<link\s+rel="canonical"/gi);
  if (route.canonical) {
    assert(canonicalCount === 1, `${route.path} has exactly 1 <link rel="canonical"> tag (found ${canonicalCount})`);
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/i);
    const canonicalHref = canonicalMatch ? canonicalMatch[1] : '';
    assert(
      canonicalHref === route.canonical,
      `${route.path} self-referencing canonical matches ${route.canonical} (got ${canonicalHref})`
    );
    assert(
      canonicalHref.startsWith('https://www.samplinghub.world'),
      `${route.path} canonical uses https://www.samplinghub.world`
    );
    if (route.path !== '/') {
      assert(
        canonicalHref !== 'https://www.samplinghub.world/' && canonicalHref !== 'https://www.samplinghub.world',
        `Non-home route ${route.path} does NOT point canonical to homepage`
      );
    }
    assert(
      !seenCanonicals.has(canonicalHref),
      `${route.path} has a unique canonical URL (not shared with ${seenCanonicals.get(canonicalHref)})`
    );
    seenCanonicals.set(canonicalHref, route.path);

    // Open Graph URL alignment
    const ogUrlMatch = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"\s*\/?>/i);
    assert(
      Boolean(ogUrlMatch) && ogUrlMatch[1] === route.canonical,
      `${route.path} og:url matches canonical ${route.canonical}`
    );
  } else {
    assert(canonicalCount === 0, `Non-indexable route ${route.path} has 0 <link rel="canonical"> tags (found ${canonicalCount})`);
  }

  // JSON-LD structured data validation
  const jsonLdMatch = html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
  if (route.jsonLd) {
    assert(Boolean(jsonLdMatch), `${route.path} includes JSON-LD structured data script`);
    if (jsonLdMatch) {
      let parsedJsonLd = null;
      try {
        parsedJsonLd = JSON.parse(jsonLdMatch[1]);
      } catch (err) {
        assert(false, `${route.path} JSON-LD is valid JSON: ${err.message}`);
      }
      if (parsedJsonLd) {
        const jsonStr = JSON.stringify(parsedJsonLd);
        assert(!jsonStr.includes('deliveryLeadTime'), `${route.path} JSON-LD contains no unverified deliveryLeadTime claims`);
        assert(!jsonStr.includes('"foundingDate":"2005"'), `${route.path} JSON-LD contains no conflicting 2005 foundingDate`);
        assert(!jsonStr.includes('"foundingDate":"2015"'), `${route.path} JSON-LD contains no conflicting 2015 foundingDate`);
      }
    }
  } else {
    assert(!jsonLdMatch, `Non-indexable utility/admin route ${route.path} omits JSON-LD structured data`);
  }
}

// Verify dist/404.html
const dist404Path = path.join(DIST_DIR, '404.html');
assert(fs.existsSync(dist404Path), 'dist/404.html exists for unknown route responses');
if (fs.existsSync(dist404Path)) {
  const html404 = fs.readFileSync(dist404Path, 'utf8');
  const canonicalCount404 = countMatches(html404, /<link\s+rel="canonical"/gi);
  assert(canonicalCount404 === 0, 'dist/404.html has 0 <link rel="canonical"> tags (not canonicalized to /)');
  const robots404 = html404.match(/<meta\s+name="robots"\s+content="([^"]*)"\s*\/?>/i);
  assert(Boolean(robots404) && robots404[1] === 'noindex, nofollow', 'dist/404.html has robots="noindex, nofollow"');
}

// ---------------------------------------------------------------------------
// 3. Verify Vercel Routing Emulation (HTTP 200 vs HTTP 404 vs HTTP 301)
// ---------------------------------------------------------------------------
console.log('[3/6] Testing HTTP status codes, canonicals, and redirects via Vercel routing engine...');

function simulateVercelRequest(requestPath, host = 'www.samplinghub.world') {
  const urlObj = new URL(requestPath, `https://${host}`);
  const pathname = urlObj.pathname;

  // 1. Evaluate vercel.json host redirects
  for (const rule of vercelConfig.redirects || []) {
    const hostCond = (rule.has || []).find((h) => h.type === 'host');
    if (hostCond && hostCond.value === host) {
      const status = rule.statusCode || (rule.permanent ? 301 : 307);
      const location = rule.destination.replace('/:path*', `${pathname}${urlObj.search}`);
      return { status, headers: { location }, body: '' };
    }
  }

  // 2. Evaluate explicit vercel.json rewrites & static files
  let targetRelPath = null;
  if (pathname === '/') {
    targetRelPath = 'index.html';
  } else {
    const normalized = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const rewriteRule = (vercelConfig.rewrites || []).find((r) => r.source === normalized);
    if (rewriteRule) {
      targetRelPath = rewriteRule.destination.replace(/^\//, '');
    } else {
      const candidate = path.join(DIST_DIR, normalized.replace(/^\//, ''));
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        targetRelPath = normalized.replace(/^\//, '');
      }
    }
  }

  if (targetRelPath) {
    const fileOnDisk = path.join(DIST_DIR, targetRelPath);
    if (fs.existsSync(fileOnDisk) && fs.statSync(fileOnDisk).isFile()) {
      return {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
        body: fs.readFileSync(fileOnDisk, 'utf8'),
      };
    }
  }

  // 3. Fall through to dist/404.html with real HTTP 404
  const body404 = fs.existsSync(dist404Path) ? fs.readFileSync(dist404Path, 'utf8') : 'Not Found';
  return {
    status: 404,
    headers: { 'content-type': 'text/html; charset=utf-8' },
    body: body404,
  };
}

// Test all 20 valid routes -> HTTP 200
for (const route of ROUTES_LIST) {
  const resp = simulateVercelRequest(route.path, 'www.samplinghub.world');
  assert(resp.status === 200, `GET ${route.path} returns HTTP 200 (got ${resp.status})`);
  if (route.canonical) {
    assert(
      resp.body.includes(`<link rel="canonical" href="${route.canonical}" />`),
      `GET ${route.path} response body contains self-referencing canonical ${route.canonical}`
    );
  } else {
    assert(
      !resp.body.includes('rel="canonical"'),
      `GET non-canonical route ${route.path} omits <link rel="canonical">`
    );
  }
}

// Test trailing-slash tolerance on valid routes -> HTTP 200
const trailingSlashResp = simulateVercelRequest('/about/', 'www.samplinghub.world');
assert(trailingSlashResp.status === 200, 'GET /about/ returns HTTP 200');

// Test unknown routes -> HTTP 404 (NOT 200)
const unknownUrls = [
  '/nonexistent-random-page-998877',
  '/products/unknown-swatch-book',
  '/old-removed-page',
  '/random/deep/unknown/route',
];
for (const badPath of unknownUrls) {
  const resp = simulateVercelRequest(badPath, 'www.samplinghub.world');
  assert(resp.status === 404, `GET unknown route ${badPath} returns HTTP 404 (got ${resp.status})`);
  assert(!resp.body.includes('rel="canonical"'), `GET 404 route ${badPath} does NOT emit a canonical tag`);
  assert(resp.body.includes('noindex, nofollow'), `GET 404 route ${badPath} includes noindex, nofollow`);
}

// Test non-www host redirect -> HTTP 301 to https://www.samplinghub.world/...
const redirectResp = simulateVercelRequest('/products/upholstery-swatch-books', 'samplinghub.world');
assert(redirectResp.status === 301, `Host samplinghub.world returns HTTP 301 (got ${redirectResp.status})`);
assert(
  redirectResp.headers.location === 'https://www.samplinghub.world/products/upholstery-swatch-books',
  'Host samplinghub.world redirects directly to https://www.samplinghub.world/products/upholstery-swatch-books'
);

// ---------------------------------------------------------------------------
// 4. Verify Client-Side SPA Head Manager (applyClientSeoMetadata)
// ---------------------------------------------------------------------------
console.log('[4/6] Testing client-side SPA head synchronization across all ViewStates...');

class MockElement {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.attrs = new Map();
    this.textContent = '';
    this.removed = false;
  }
  setAttribute(k, v) {
    this.attrs.set(k, String(v));
  }
  getAttribute(k) {
    return this.attrs.get(k) ?? null;
  }
  remove() {
    this.removed = true;
    mockHeadElements = mockHeadElements.filter((el) => el !== this);
  }
}

let mockHeadElements = [];
globalThis.document = {
  title: '',
  head: {
    appendChild(el) {
      mockHeadElements.push(el);
      return el;
    },
    querySelector(selector) {
      return globalThis.document.querySelector(selector);
    },
    querySelectorAll(selector) {
      return globalThis.document.querySelectorAll(selector);
    },
  },
  createElement(tag) {
    return new MockElement(tag);
  },
  querySelector(selector) {
    return globalThis.document.querySelectorAll(selector)[0] || null;
  },
  querySelectorAll(selector) {
    if (selector === 'link[rel="canonical"]') {
      return mockHeadElements.filter((e) => e.tagName === 'LINK' && e.getAttribute('rel') === 'canonical');
    }
    const metaName = selector.match(/^meta\[name="([^"]+)"\]$/);
    if (metaName) {
      return mockHeadElements.filter((e) => e.tagName === 'META' && e.getAttribute('name') === metaName[1]);
    }
    const metaProp = selector.match(/^meta\[property="([^"]+)"\]$/);
    if (metaProp) {
      return mockHeadElements.filter((e) => e.tagName === 'META' && e.getAttribute('property') === metaProp[1]);
    }
    if (selector === 'script[type="application/ld+json"]') {
      return mockHeadElements.filter(
        (e) => e.tagName === 'SCRIPT' && e.getAttribute('type') === 'application/ld+json'
      );
    }
    return [];
  },
};

for (const route of ROUTES_LIST) {
  applyClientSeoMetadata(route.path, route.view);
  assert(globalThis.document.title === route.title, `Client SPA transition to ${route.view} sets document.title`);
  const canonicalLinks = globalThis.document.querySelectorAll('link[rel="canonical"]');
  if (route.canonical) {
    assert(
      canonicalLinks.length === 1 && canonicalLinks[0].getAttribute('href') === route.canonical,
      `Client SPA transition to ${route.view} maintains single canonical=${route.canonical}`
    );
  } else {
    assert(
      canonicalLinks.length === 0,
      `Client SPA transition to ${route.view} removes canonical link (0 canonicals)`
    );
  }
}

// Test transition from an indexable page to 'not-found'
applyClientSeoMetadata('/', 'home');
applyClientSeoMetadata('/nonexistent-page', 'not-found');
assert(
  globalThis.document.title === NOT_FOUND_SEO_CONFIG.title,
  `Client SPA transition to 'not-found' sets 404 title`
);
assert(
  globalThis.document.querySelectorAll('link[rel="canonical"]').length === 0,
  `Client SPA transition to 'not-found' removes canonical link`
);

// ---------------------------------------------------------------------------
// 5. Verify Sitemap & robots.txt Consistency
// ---------------------------------------------------------------------------
console.log('[5/6] Verifying public/sitemap.xml and public/robots.txt...');
const sitemapXml = fs.readFileSync(path.join(ROOT_DIR, 'public/sitemap.xml'), 'utf8');
const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

assert(
  locMatches.length === SITEMAP_INDEXABLE_ROUTES.length,
  `public/sitemap.xml has ${SITEMAP_INDEXABLE_ROUTES.length} indexable URLs (found ${locMatches.length})`
);

const expectedSitemapUrls = new Set(SITEMAP_INDEXABLE_ROUTES.map((r) => r.canonical));
for (const url of locMatches) {
  assert(url.startsWith(PREFERRED_ORIGIN), `Sitemap URL ${url} uses preferred canonical domain ${PREFERRED_ORIGIN}`);
  assert(expectedSitemapUrls.has(url), `Sitemap URL ${url} corresponds to a valid index,follow route`);
  assert(!url.includes('/admin'), `Sitemap excludes admin route: ${url}`);
  assert(!url.includes('/privacy') && !url.includes('/terms'), `Sitemap excludes noindex legal route: ${url}`);
}

const robotsTxt = fs.readFileSync(path.join(ROOT_DIR, 'public/robots.txt'), 'utf8');
assert(
  robotsTxt.includes('Sitemap: https://www.samplinghub.world/sitemap.xml'),
  'public/robots.txt references Sitemap: https://www.samplinghub.world/sitemap.xml'
);
assert(robotsTxt.includes('Disallow: /api/'), 'public/robots.txt disallows /api/');

// ---------------------------------------------------------------------------
// 6. Verify Public Business-Claim Accuracy Across Public Source & HTML
// ---------------------------------------------------------------------------
console.log('[6/6] Scanning public source files for prohibited or unverified claims...');

const prohibitedPhrases = [
  'Premium Sofa Group',
  'Urban Textiles LLC',
  'Rajesh Kapoor',
  'Maria Santos',
  'Priya Sharma',
  'Ahmed Al-Mansouri',
  'Zero-Defect Quality Control',
  '100% Inspection',
  '100% QC',
  'Guaranteed B2B turnaround within 24 hours',
  '40-50% Lower Costs',
  '40% cost savings',
  '$5,000-15,000 saved annually',
  '21-28 day express delivery',
  'Export to 15+ Countries',
  '15+ Countries',
  'Since 2005',
  'Since 2015',
  'Join 500+ global brands',
  '1000+ Export Orders',
  '95% Retention',
  'Sales have increased 30%',
  'Sales up 25%',
  'Leads up 60% per show',
  'Sales cycle cut by 25%',
  'Shipping costs -70%',
];

const componentsDir = path.join(ROOT_DIR, 'components');
const publicFilesToScan = [
  path.join(ROOT_DIR, 'index.html'),
  path.join(ROOT_DIR, 'utils/seoMetadata.ts'),
  path.join(ROOT_DIR, 'scripts/prerender_routes.js'),
  ...fs
    .readdirSync(componentsDir)
    .filter((f) => f.endsWith('.tsx') && !f.startsWith('Admin'))
    .map((f) => path.join(componentsDir, f)),
];

for (const filePath of publicFilesToScan) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relName = path.relative(ROOT_DIR, filePath);
  for (const phrase of prohibitedPhrases) {
    assert(
      !content.includes(phrase),
      `Public file ${relName} does not contain unverified claim "${phrase}"`
    );
  }
}

// Verify approved positioning facts are present
const aboutContent = fs.readFileSync(path.join(componentsDir, 'AboutPage.tsx'), 'utf8');
assert(
  aboutContent.includes('SamplingHub (Digitex Studio)') && aboutContent.includes('2011'),
  'AboutPage.tsx includes approved SamplingHub (Digitex Studio) and 2011 establishment positioning'
);

// Verify zero secret leakage in compiled client JS bundles
const assetsDir = path.join(DIST_DIR, 'assets');
const jsBundles = fs.readdirSync(assetsDir).filter((f) => f.endsWith('.js'));
const secretPatterns = [
  'EXPECTED_CREDENTIAL_DIGEST',
  'ADMIN_PASSWORD_HASH',
  'ADMIN_SESSION_SECRET',
  'UPSTASH_REDIS_REST_TOKEN',
  'KV_REST_API_TOKEN',
  '$scrypt$',
];
for (const bundleFile of jsBundles) {
  const bundleContent = fs.readFileSync(path.join(assetsDir, bundleFile), 'utf8');
  for (const pat of secretPatterns) {
    assert(!bundleContent.includes(pat), `Client bundle ${bundleFile} does not leak secret marker ${pat}`);
  }
}

console.log('\n================================================================================');
console.log(`VERIFICATION SUMMARY: ${passed} passed, ${failed} failed`);
console.log('================================================================================');

if (failed > 0) {
  process.exit(1);
}
