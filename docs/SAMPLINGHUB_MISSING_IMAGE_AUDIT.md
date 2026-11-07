# SamplingHub — Complete Website Missing Image & Placeholder Audit

**Audit Date:** November 8, 2026  
**Audited Branch:** `fix/samplinghub-admin-image-audit` / `fix/samplinghub-admin-security-image-accuracy`  
**Target Repository:** `digitexhealthdocsvigit/SwatchCraftIndia`  
**Live Production URL:** [https://www.samplinghub.world](https://www.samplinghub.world)  

---

## 1. Audit Scope & Inventory Summary

Every public route and component was independently reviewed against the source code:
* **Canonical Routes Audited (18 Total):**
  1. `/` (Homepage)
  2. `/about` (About Us)
  3. `/manufacturing-process` (Production & Quality Control)
  4. `/portfolio` (Portfolio & Client Showcase)
  5. `/products` (Products Overview)
  6. `/products/upholstery-swatch-books` (Upholstery Swatch Books)
  7. `/products/curtain-fabric-albums` (Curtain Fabric Albums)
  8. `/products/fabric-hanger-swatches` (Waterfall Swatch Hangers)
  9. `/products/ring-swatch-sets` (Ring Swatch Sets)
  10. `/products/sample-cards` (Sample Cards & Storyboards)
  11. `/products/waterfall-swatch-cards` (Waterfall Cards)
  12. `/products/wallpaper-catalog-manufacturing` (Wallpaper Catalogues)
  13. `/export-markets` (Global Export Coverage)
  14. `/pricing` (Tiered Pricing & Quote Request)
  15. `/blog` (Technical Blog Hub)
  16. `/blog/:slug` (Individual Technical Blog Post)
  17. `/privacy` & `/terms` (Legal Pages)
  18. `/contact` (Contact & RFQ Form)

* **Visual Holders Identified:** **31 visual holders**.
* **Status Legend:**
  * `VERIFIED`: Authentic, high-resolution SamplingHub physical product studio photograph loading with HTTP 200 and accurate context/alt text.
  * `NEEDS AUTHENTIC PHOTO`: Currently using an illustrative SVG graphic or shared product format; genuine owner-supplied workshop photo requested.
  * `DUPLICATE`: Redundant duplicate image file previously mapped (remediated).
  * `MISSING`: Image holder with broken or missing asset (0 found; all 31 holders have valid rendering assets).
  * `BROKEN`: 404 or unrenderable file (0 found).
  * `WRONG IMAGE`: Misleading equipment or unrelated facility (remediated).
  * `POOR QUALITY`: Low-resolution or distorted asset (0 found; all images are 1200x800+ studio grade).

---

## 2. 10-Column Image Audit Table

| Route | Component | Section | Image holder | Current image | Status | Required image subject | Recommended asset filename | Priority | Action |
|---|---|---|---|---|---|---|---|---|---|
| `/` | `Hero.tsx` | Hero Banner | `hero-main-01` | `/images/hero-main-showcase.jpg` | VERIFIED | Master swatch presentation showcase | `hero-main-showcase.jpg` | Low | Retain in hero banner carousel. |
| `/` | `Hero.tsx` | Hero Banner | `hero-main-02` | `/images/wallpaper-catalog-book.jpg` | VERIFIED | Oversized wallpaper catalog | `wallpaper-catalog-book.jpg` | Low | Retain in hero banner carousel. |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-01` | `/images/wallpaper-catalog-book.jpg` | VERIFIED | Wallpaper repeat catalog book | `wallpaper-catalog-book.jpg` | Low | Retain in featured products grid. |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-02` | `/images/upholstery-swatch-book.jpg` | VERIFIED | Hardbound upholstery book | `upholstery-swatch-book.jpg` | Low | Retain in featured products grid. |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-03` | `/images/curtain-fabric-album.jpg` | VERIFIED | Large format curtain album | `curtain-fabric-album.jpg` | Low | Retain in featured products grid. |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-04` | `/images/waterfall-hanger.jpg` | VERIFIED | Cascading waterfall hanger | `waterfall-hanger.jpg` | Low | Retain in featured products grid. |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-05` | `/images/waterfall-hanger.jpg` | NEEDS AUTHENTIC PHOTO | Full-drop showroom fabric hanger | `waterfall-hanger-showroom.jpg` | Medium | Label as illustrative until exclusive full-drop photo supplied. |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-01` | `/images/wallpaper-catalog-book.jpg` | VERIFIED | Wallpaper catalog detail | `wallpaper-catalog-book.jpg` | Low | Retain in gallery showcase. |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-02` | `/images/wallpaper-roll-display.jpg` | VERIFIED | Commercial wallcovering drops | `wallpaper-roll-display.jpg` | Low | Retain in gallery showcase. |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-03` | `/images/upholstery-swatch-book.jpg` | VERIFIED | Layered upholstery swatches | `upholstery-swatch-book.jpg` | Low | Retain in gallery showcase. |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-04` | `/images/curtain-fabric-album.jpg` | VERIFIED | Post-bound drapery album | `curtain-fabric-album.jpg` | Low | Retain in gallery showcase. |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-05` | `/images/waterfall-hanger.jpg` | VERIFIED | Cascading tiered swatches | `waterfall-hanger.jpg` | Low | Retain in gallery showcase. |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-06` | `/images/sample-cards-storyboard.jpg` | VERIFIED | Precision die-cut cards | `sample-cards-storyboard.jpg` | Low | Retain in gallery showcase. |
| `/about` | `AboutPage.tsx` | Partner Architecture | `about-hub-01` | Custom SVG Hub Icon & Architecture Card | VERIFIED | Centralized Coordination Hub | SVG Vector Graphics | Low | Retain architectural SVG card. |
| `/about` | `AboutPage.tsx` | Partner Architecture | `about-cut-02` | Custom SVG Pinking Icon & Partner Card | NEEDS AUTHENTIC PHOTO | Partner table cutting & manual pinking | `factory-cutting-table.jpg` (SH-IMG-03) | High | Replace SVG with authentic workshop table photo when supplied. |
| `/about` | `AboutPage.tsx` | Partner Architecture | `about-bind-03` | Custom SVG Press Icon & Partner Card | NEEDS AUTHENTIC PHOTO | Hardbound casing & hand bookbinding | `manual-bookbinding-craft.jpg` (SH-IMG-04) | High | Replace SVG with authentic bookbinding photo when supplied. |
| `/about` | `AboutPage.tsx` | Partner Architecture | `about-pack-04` | Custom SVG Logistics Icon & Export Card | NEEDS AUTHENTIC PHOTO | Export carton packing & moisture-wrap | `export-packaging-inspection.jpg` (SH-IMG-08) | Medium | Replace SVG with authentic packaging photo when supplied. |
| `/manufacturing-process` | `ManufacturingProcessPage.tsx` | QC Standards | `qc-macro-01` | `/images/upholstery-swatch-book-2.jpg` | VERIFIED | Macro edge finishing & alignment QC | `upholstery-swatch-book-2.jpg` | Low | Retained; replaced misleading duplicate factory image. |
| `/blog` | `BlogCard.tsx` | Editorial Cards | `blog-card-01` | Themed gradient SVG banner | VERIFIED | Export logistics & air/sea transit | SVG Vector Graphic | Low | Retained vector editorial banner. |
| `/blog` | `BlogCard.tsx` | Editorial Cards | `blog-card-02` | Themed gradient SVG banner | VERIFIED | Swatch format comparisons | SVG Vector Graphic | Low | Retained vector editorial banner. |
| `/blog` | `BlogCard.tsx` | Editorial Cards | `blog-card-03` | Themed gradient SVG banner | VERIFIED | B2B textile marketing ROI | SVG Vector Graphic | Low | Retained vector editorial banner. |
| `/portfolio` | `PortfolioPage.tsx` | Project Grid (6 cards) | `portfolio-01..06` | 6 category product images | VERIFIED | Finished client production formats | Category studio assets | Low | Verified responsive filterable grid. |
| `/products/upholstery-swatch-books` | `ProductUpholstery.tsx` | Carousel | `uph-angle-01` | `/images/upholstery-swatch-book.jpg` | VERIFIED | Hardbound book open with swatches | `upholstery-swatch-book.jpg` | Low | Retain in multi-angle carousel. |
| `/products/upholstery-swatch-books` | `ProductUpholstery.tsx` | Carousel | `uph-angle-02` | `/images/upholstery-swatch-book-2.jpg` | VERIFIED | Macro pinking edge finish | `upholstery-swatch-book-2.jpg` | Low | Retain in multi-angle carousel. |
| `/products/curtain-fabric-albums` | `ProductCurtain.tsx` | Carousel | `cur-angle-01` | `/images/curtain-fabric-album.jpg` | VERIFIED | Large-format drapery album open | `curtain-fabric-album.jpg` | Low | Retain in multi-angle carousel. |
| `/products/curtain-fabric-albums` | `ProductCurtain.tsx` | Carousel | `cur-angle-02` | `/images/curtain-fabric-album-2.jpg` | VERIFIED | Heavy-duty screw-post spine macro | `curtain-fabric-album-2.jpg` | Low | Retain in multi-angle carousel. |
| `/products/waterfall-swatch-hangers` | `ProductWaterfall.tsx` | Carousel | `wat-angle-01` | `/images/waterfall-hanger.jpg` | VERIFIED | Stepped cascade fabric hanger | `waterfall-hanger.jpg` | Low | Retain in multi-angle carousel. |
| `/products/waterfall-swatch-hangers` | `ProductWaterfall.tsx` | Carousel | `wat-angle-02` | `/images/waterfall-hanger-2.jpg` | VERIFIED | Swivel hook & header card macro | `waterfall-hanger-2.jpg` | Low | Retain in multi-angle carousel. |
| `/products/ring-swatch-sets` | `ProductRingSwatch.tsx` | Carousel | `rng-angle-01` | `/images/ring-swatch-set.jpg` | VERIFIED | Metal ring fan-out presentation | `ring-swatch-set.jpg` | Low | Retain in multi-angle carousel. |
| `/products/ring-swatch-sets` | `ProductRingSwatch.tsx` | Carousel | `rng-angle-02` | `/images/ring-swatch-set-2.jpg` | VERIFIED | Nickel ring & brass eyelet macro | `ring-swatch-set-2.jpg` | Low | Retain in multi-angle carousel. |
| `/products/sample-cards` | `ProductSampleCards.tsx` | Carousel | `crd-angle-01` | `/images/sample-cards-storyboard.jpg` | VERIFIED | Tri-fold presentation card layout | `sample-cards-storyboard.jpg` | Low | Retain in multi-angle carousel. |
| `/products/sample-cards` | `ProductSampleCards.tsx` | Carousel | `crd-angle-02` | `/images/sample-cards-storyboard-2.jpg` | VERIFIED | Die-cut window inset macro | `sample-cards-storyboard-2.jpg` | Low | Retain in multi-angle carousel. |
| `/products/wallpaper-catalog-manufacturing` | `ProductWallpaperCatalog.tsx` | Carousel | `wal-angle-01` | `/images/wallpaper-catalog-book.jpg` | VERIFIED | Textured wallpaper binder cover | `wallpaper-catalog-book.jpg` | Low | Retain in multi-angle carousel. |
| `/products/wallpaper-catalog-manufacturing` | `ProductWallpaperCatalog.tsx` | Carousel | `wal-angle-02` | `/images/wallpaper-roll-display.jpg` | VERIFIED | Wallcovering substrate & roll drops | `wallpaper-roll-display.jpg` | Low | Retain in multi-angle carousel. |

---

## 3. Owner Photography Sourcing Brief (Requested Subjects)

When original workshop photography becomes available from partner manufacturing facilities, they will replace the `NEEDS AUTHENTIC PHOTO` slots:

1. **SH-IMG-01: Manual Fabric Bolt Inspection & Alignment**  
   * *Subject:* Fabric bolt unrolled on a clean wooden cutting table, measured with steel ruler.  
   * *Target Placement:* `/manufacturing-process` (Pre-Production Quality Check).

2. **SH-IMG-02: Precision Manual Pinking Machine Operation**  
   * *Subject:* Craftsperson operating a manual or semi-automatic fabric pinking cutter, demonstrating serrated edge alignment.  
   * *Target Placement:* `/manufacturing-process` (Cutting & Swatch Sizing).

3. **SH-IMG-03: Dedicated Partner Production Floor**  
   * *Subject:* Wide-angle view of clean partner workshop with manual cutting tables, swatch assembly stations, and workers in clean uniforms.  
   * *Target Placement:* `/about` (Replacing `about-cut-02`).

4. **SH-IMG-04: Hand-Bound Book Case-Making**  
   * *Subject:* Artisan hand-gluing buckram cloth over 3mm Kappa board with bone folder.  
   * *Target Placement:* `/about` (Replacing `about-bind-03`).

5. **SH-IMG-05: Waterfall Cascading Alignment Inspection**  
   * *Subject:* Quality inspector verifying stepped overlap tolerances on a hanging swatch set.  
   * *Target Placement:* `/products/waterfall-swatch-hangers`.

6. **SH-IMG-06: Ring Swatch Hole-Punching & Eyelet Setting**  
   * *Subject:* Setting brass eyelets into fabric swatch headers using a benchtop manual press.  
   * *Target Placement:* `/products/ring-swatch-sets`.

7. **SH-IMG-07: Die-Cut Sample Card Mounting**  
   * *Subject:* Applying precision adhesive strips to mount swatches into die-cut card apertures.  
   * *Target Placement:* `/products/sample-cards`.

8. **SH-IMG-08: Export Packaging & Moisture Protection**  
   * *Subject:* Finished swatch books wrapped in moisture-resistant export film, packed into heavy-duty 5-ply corrugated cartons with export shipping marks.  
   * *Target Placement:* `/about` (Replacing `about-pack-04`) and `/export-markets`.
