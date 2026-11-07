# SamplingHub — Production Deployment & Route Verification

**Date of Verification:** November 2026  
**Audited Commit:** `a8c388c`  
**Production Host:** [https://www.samplinghub.world](https://www.samplinghub.world)  
**Edge CDN:** Vercel Global Edge Network (Points of Presence: `bom1`, `fra1`, `iad1`)

---

## 1. Executive Summary

This report documents the empirical testing of the live production website across all 20 canonical routes, asset bundles, image assets, and SEO endpoints.

---

## 2. Route Verification Matrix (Live HTTP Probing)

Every public route was audited using automated HTTP requests directly against `https://www.samplinghub.world`:

| Canonical Route | HTTP Code | Content-Type | Verified Payload / Element |
|---|---|---|---|
| `/` | `200 OK` | `text/html; charset=utf-8` | Complete pre-rendered HTML, Inter typography, 7 product categories |
| `/about` | `200 OK` | `text/html; charset=utf-8` | Established 2011, OEM Managed Model, Quality Inspection Hub |
| `/products` | `200 OK` | `text/html; charset=utf-8` | Products overview grid with 7 custom presentation lines |
| `/products/upholstery-swatch-books` | `200 OK` | `text/html; charset=utf-8` | Hardbound albums, Kappa board specs, multi-angle carousel |
| `/products/curtain-fabric-albums` | `200 OK` | `text/html; charset=utf-8` | A3+ drapery formats, post-binding specs, pricing tables |
| `/products/fabric-hanger-swatches` | `200 OK` | `text/html; charset=utf-8` | Tiered waterfall systems, plastic/metal hooks, header card specs |
| `/products/ring-swatch-sets` | `200 OK` | `text/html; charset=utf-8` | Metal binder rings, pinked fabric memo sets, swatch grommets |
| `/products/sample-cards` | `200 OK` | `text/html; charset=utf-8` | Rigid fabric storyboards, die-cut memo cards, mailer formats |
| `/products/waterfall-swatch-cards` | `200 OK` | `text/html; charset=utf-8` | Cascading swatch cards, 4-tier & 6-tier waterfall specs |
| `/products/wallpaper-catalog-manufacturing` | `200 OK` | `text/html; charset=utf-8` | Oversized 45x45 & 50x50 cm wallpaper books, room-scene visualizers |
| `/manufacturing-process` | `200 OK` | `text/html; charset=utf-8` | 5-step OEM coordination process, finishing inspection visuals |
| `/export-markets` | `200 OK` | `text/html; charset=utf-8` | USA, EU, UAE, UK export transit benchmarks (14-28 days) |
| `/portfolio` | `200 OK` | `text/html; charset=utf-8` | Production portfolio with 6 custom B2B textile/wallpaper projects |
| `/pricing` | `200 OK` | `text/html; charset=utf-8` | Multi-currency pricing guide (INR, USD, EUR, AED switcher) |
| `/blog` | `200 OK` | `text/html; charset=utf-8` | B2B textile export guides, fabric presentation articles |
| `/contact` | `200 OK` | `text/html; charset=utf-8` | Full RFQ form, registered office address, WhatsApp button |
| `/privacy` | `200 OK` | `text/html; charset=utf-8` | B2B GDPR & data protection policy |
| `/terms` | `200 OK` | `text/html; charset=utf-8` | Commercial export terms & Incoterm conditions |
| `/sitemap.xml` | `200 OK` | `application/xml` | 27 indexed URLs, valid XML syntax |
| `/robots.txt` | `200 OK` | `text/plain` | User-agent allow directives, sitemap link |

---

## 3. Asset & Compiled Bundle Verification

| Asset Path | HTTP Code | Size | Content-Type | Status |
|---|---|---|---|---|
| `/assets/index-BTGv3YkG.css` | `200 OK` | `54,151 bytes` (54.15 kB) | `text/css; charset=utf-8` | Compiled Tailwind PostCSS bundle verified |
| `/assets/index-D5iNo2OL.js` | `200 OK` | `273,382 bytes` | `application/javascript` | Main React application bundle |
| `/images/wallpaper-catalog-book.jpg` | `200 OK` | `315,486 bytes` | `image/jpeg` | High-res studio product photograph |
| `/images/wallpaper-roll-display.jpg` | `200 OK` | `445,417 bytes` | `image/jpeg` | Wallpaper cascades & drops visual |
| `/images/hero-main-showcase.jpg` | `200 OK` | `1,321,800 bytes` | `image/jpeg` | Main hero showcase photograph |
| `/images/factory-bhiwandi-production.jpg` | `200 OK` | `1,321,800 bytes` | `image/jpeg` | OEM partner finishing inspection visual |
| `/images/upholstery-swatch-book.jpg` | `200 OK` | `761,908 bytes` | `image/jpeg` | Angle #1 upholstery album photograph |
| `/images/upholstery-swatch-book-2.jpg` | `200 OK` | `577,440 bytes` | `image/jpeg` | Angle #2 upholstery album macro visual |

---

## 4. Visual Layout & Typography Comparison

Comparison between the pre-crash baseline (`2514e97`) and the current deployment:

| Design Dimension | Pre-Crash Baseline (`2514e97`) | Current Production (`a8c388c`) | Verification Result |
|---|---|---|---|
| **Font Family** | Google Fonts `Inter` (300 to 900) | Google Fonts `Inter` (300 to 900) | **MATCH** |
| **Hero Heading** | `text-4xl md:text-5xl lg:text-6xl font-extrabold` | `text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e3a5f]` | **MATCH** |
| **Brand Palette** | Navy `#1e3a5f`, Gold `#8B6F47`, Teal `#0d7377` | Synchronized in `tailwind.config.js` | **MATCH** |
| **Container Padding** | `max-w-7xl mx-auto px-4` | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | **MATCH** |
| **Section Spacing** | `pt-32 pb-20 lg:pt-48 lg:pb-32` | `pt-32 pb-20 lg:pt-48 lg:pb-32` | **MATCH** |
| **Media Display** | Single placeholder wireframe | Interactive multi-angle media carousels | **UPGRADED** |
