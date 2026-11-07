# SamplingHub — Complete Website Image Asset & Placeholder Audit

**Audit Date:** November 7, 2026  
**Audited Branch:** `feat/samplinghub-admin-provisioning-image-audit`  
**Target Repository:** `digitexhealthdocsvigit/SwatchCraftIndia`  
**Live Production URL:** [https://www.samplinghub.world](https://www.samplinghub.world)  

---

## 1. Audit Summary Statistics

* **Total Pages Inspected:** 18 canonical views (Homepage, About, Products Overview, Manufacturing Process, Portfolio, Blog Hub, Individual Blog Articles, Export Markets, Pricing, Contact, and 7 Product Category Pages).
* **Total Image Holders Found Across Codebase:** 31 visual holders.
* **Total Correctly Loaded Real Product Photos:** 23 holders.
* **Total Empty Text/Box Placeholders Found:** 5 holders (4 on About Page, 1 on Blog Cards).
* **Total Broken References / File Errors:** 0 (all referenced files resolve to existing paths).
* **Total Incorrect / Misleading Facility Mappings:** 2 (`factory-bhiwandi-production.jpg` was an exact duplicate of `hero-main-showcase.jpg`; Fabric Hanger shared with Waterfall Hanger).
* **Total Fixed in Current Feature Branch:** 6 visual holders (About Page architecture grid, QC macro inspection mapping, Blog editorial banners).
* **Total Requiring Authentic Owner/Partner Photography:** 2 (Dedicated full-drop showroom hanger photos, authentic partner facility photos).

---

## 2. Complete Discovered Image Register

| ID | Page | Section / Image Holder | Expected Image | Current Status | Source File | Recommended Action | Priority |
|---|---|---|---|---|---|---|---|
| **IMG-001** | Homepage (`/`) | Hero Carousel Item 1 | Studio swatch presentation showcase | **Correct Image Loaded** | `components/Hero.tsx` | Uses `hero-main-showcase.jpg` (1.26 MB). Authentic studio photo. | Low |
| **IMG-002** | Homepage (`/`) | Hero Carousel Item 2 | Hardbound Wallpaper Catalog Book | **Correct Image Loaded** | `components/Hero.tsx` | Uses `wallpaper-catalog-book.jpg` (315 kB). Authentic product photo. | Low |
| **IMG-003** | Homepage (`/`) | Hero Carousel Item 3 | Upholstery Swatch Book | **Correct Image Loaded** | `components/Hero.tsx` | Uses `upholstery-swatch-book.jpg` (744 kB). Authentic product photo. | Low |
| **IMG-004** | Homepage (`/`) | Featured Products Grid (7 cards) | 7 main product presentation cards | **Correct Image Loaded** | `components/FeaturedProducts.tsx` | All 7 cards mapped to valid studio assets in `LOCAL_IMAGES`. | Low |
| **IMG-005** | Homepage (`/`) | Visual Gallery (6 cards) | 6 product showcase cards | **Correct Image Loaded** | `components/Gallery.tsx` | All 6 cards mapped to valid studio assets in `LOCAL_IMAGES`. | Low |
| **IMG-006** | About (`/about`) | Infrastructure Hub Grid (4 boxes) | 4 facility & machinery visual boxes | **Empty Placeholder Defect (Remediated)** | `components/AboutPage.tsx` | Replaced 4 blank grey boxes with high-spec OEM Architecture & Process Flow diagram. | **Critical** |
| **IMG-007** | Manufacturing Process (`/manufacturing-process`) | QC Standards Section | Quality inspection activity / macro detail | **Incorrect Mapping Defect (Remediated)** | `components/ManufacturingProcessPage.tsx` | Replaced duplicated `factory-bhiwandi-production.jpg` with authentic macro pinking photo `upholstery-swatch-book-2.jpg`. | **High** |
| **IMG-008** | Manufacturing Process (`/manufacturing-process`) | Process Steps (5 items) | Step illustrations / graphics | **Icon Representation** | `components/ManufacturingProcessPage.tsx` | Uses clean emoji icons (`📐`, `✂️`, `📚`, `🛡️`, `🚢`). Fully functional. | Medium |
| **IMG-009** | Portfolio (`/portfolio`) | Production Portfolio Grid (6 projects) | 6 international client project cards | **Correct Image Loaded** | `components/PortfolioPage.tsx` | Mapped to 6 distinct local studio photography assets in `LOCAL_IMAGES`. | Low |
| **IMG-010** | Products Overview (`/products`) | Featured Line 1 (Wallpaper) | Wallpaper Catalog Book | **Correct Image Loaded** | `components/ProductsOverview.tsx` | Uses `wallpaper-catalog-book.jpg`. | Low |
| **IMG-011** | Products Overview (`/products`) | Featured Line 2 (Waterfall) | Waterfall Swatch Hanger | **Correct Image Loaded** | `components/ProductsOverview.tsx` | Uses `waterfall-hanger.jpg`. | Low |
| **IMG-012** | Products Overview (`/products`) | Customization Spotlight | Upholstery Album | **Correct Image Loaded** | `components/ProductsOverview.tsx` | Uses `upholstery-swatch-book.jpg`. | Low |
| **IMG-013** | Blog Hub (`/blog`) | Blog Post Cards (6 cards) | Editorial topic header visuals | **Empty Placeholder Defect (Remediated)** | `components/BlogCard.tsx` | Replaced raw `[ Featured Image: {tag} ]` text with elegant topic gradient banners & SVG icons. | **High** |
| **IMG-014** | Product: Wallpaper Catalog | Multi-Angle Carousel (Angle 1 & 2) | Oversized album + wallcovering drops | **Correct Image Loaded** | `components/ProductWallpaperCatalog.tsx` | Uses `wallpaper-catalog-book.jpg` & `wallpaper-roll-display.jpg`. | Low |
| **IMG-015** | Product: Upholstery Swatch Books | Multi-Angle Carousel (Angle 1 & 2) | Showcase + macro pinking detail | **Correct Image Loaded** | `components/ProductUpholstery.tsx` | Uses `upholstery-swatch-book.jpg` & `upholstery-swatch-book-2.jpg`. | Low |
| **IMG-016** | Product: Curtain Fabric Albums | Multi-Angle Carousel (Angle 1 & 2) | Showcase + screw-post spine macro | **Correct Image Loaded** | `components/ProductCurtain.tsx` | Uses `curtain-fabric-album.jpg` & `curtain-fabric-album-2.jpg`. | Low |
| **IMG-017** | Product: Waterfall Swatch Cards | Multi-Angle Carousel (Angle 1 & 2) | Cascading drops + swivel hook macro | **Correct Image Loaded** | `components/ProductWaterfall.tsx` | Uses `waterfall-hanger.jpg` & `waterfall-hanger-2.jpg`. | Low |
| **IMG-018** | Product: Fabric Hanger Swatches | Multi-Angle Carousel (Angle 1 & 2) | Full-drop showroom hanger | **Shared Asset Association** | `components/ProductHanger.tsx` | Currently shares `waterfall-hanger.jpg`. Requires dedicated showroom hanger photo. | Medium |
| **IMG-019** | Product: Ring Swatch Sets | Multi-Angle Carousel (Angle 1 & 2) | Fan deck + split-ring eyelet macro | **Correct Image Loaded** | `components/ProductRingSwatch.tsx` | Uses `ring-swatch-set.jpg` & `ring-swatch-set-2.jpg`. | Low |
| **IMG-020** | Product: Sample Cards & Storyboards | Multi-Angle Carousel (Angle 1 & 2) | Die-cut cards + window inset macro | **Correct Image Loaded** | `components/ProductSampleCards.tsx` | Uses `sample-cards-storyboard.jpg` & `sample-cards-storyboard-2.jpg`. | Low |

---

## 3. Prioritised Asset-Request List (For Owner & Manufacturing Partners)

To replace shared product assets with 100% exclusive photography, the following authentic photographs should be collected:

1. **[REQ-IMG-01] Dedicated Full-Drop Showroom Fabric Hangers (Priority: Medium)**
   * **Subject:** 70–100 cm full-drop fabric swatch hanger hanging on a showroom rack with custom branded navy/gold header card.
   * **Target File:** `public/images/showroom-fabric-hanger.jpg`
   * **Target Component:** `components/ProductHanger.tsx` and `components/FeaturedProducts.tsx`.
2. **[REQ-IMG-02] Authentic Partner Facility / Precision Machinery Photos (Priority: Optional/Phase 5)**
   * **Subject:** High-speed automated pinking knife in operation, Kappa board casing-in machine, or export pallet packing.
   * **Compliance Condition:** Must be genuinely supplied by an authorized manufacturing partner with explicit permission. Must be captioned as "Manufacturing Partner Production Unit".
   * **Target Component:** `components/ManufacturingProcessPage.tsx` and `components/AboutPage.tsx`.
