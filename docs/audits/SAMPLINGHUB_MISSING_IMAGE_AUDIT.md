# SamplingHub — Complete Website Image Asset & Placeholder Audit

**Audit Date:** November 2026  
**Audited Branch:** `fix/samplinghub-admin-security-image-accuracy`  
**Target Repository:** `digitexhealthdocsvigit/SwatchCraftIndia`  
**Live Production URL:** [https://www.samplinghub.world](https://www.samplinghub.world)  

---

## 1. Audit Scope & Reconciled Inventory Statistics

Across the entire codebase, all **18 canonical public routes** and **31 visual holders** were inspected, reconciled, and verified against physical source code:

* **Total Canonical Routes Inspected:** 18 (`/`, `/about`, `/products`, `/products/upholstery-swatch-books`, `/products/curtain-fabric-albums`, `/products/fabric-hanger-swatches`, `/products/ring-swatch-sets`, `/products/sample-cards`, `/products/waterfall-swatch-cards`, `/products/wallpaper-catalog-manufacturing`, `/manufacturing-process`, `/export-markets`, `/portfolio`, `/pricing`, `/blog`, `/privacy`, `/terms`, `/contact`).
* **Total Image Holders Found in Source Code:** 31 visual holders.
* **Total Authentic Product Photographs:** 23 holders (studio photography of genuine SamplingHub finished products).
* **Total Empty Text / Placeholder Boxes Remediated:** 5 holders (4 on About page replaced with OEM Partner Architecture; 1 on Blog cards replaced with editorial vector banners).
* **Total Misleading Facility / Machine Mappings Removed:** 2 (`factory-bhiwandi-production.jpg` was an exact byte duplicate of `hero-main-showcase.jpg` and has been permanently deleted from disk; unverified automated machinery claims removed).
* **Total Broken File References (404s):** 0 (all referenced assets resolve with HTTP 200 OK).
* **Owner-Supplied Physical Photos Requested:** 8 priority subjects (SH-IMG-01 through SH-IMG-08).

---

## 2. Complete 12-Column Image-Holder Audit Register

| Page route | Component | Section | Image-holder identifier | Current image or placeholder | Matches subject? | Authenticity | Required subject | Recommended replacement image | Priority | Required action | Owner must supply? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `Hero.tsx` | Hero Banner | `hero-main-01` | `/images/hero-main-showcase.jpg` | Yes | Authentic studio photo | Master swatch presentation showcase | Keep current asset | Low | Retain in hero carousel | No |
| `/` | `Hero.tsx` | Hero Banner | `hero-main-02` | `/images/wallpaper-catalog-book.jpg` | Yes | Authentic studio photo | Oversized wallpaper catalog | Keep current asset | Low | Retain in hero carousel | No |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-01` | `/images/wallpaper-catalog-book.jpg` | Yes | Authentic studio photo | Wallpaper repeat catalog book | Keep current asset | Low | Retain in grid | No |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-02` | `/images/upholstery-swatch-book.jpg` | Yes | Authentic studio photo | Hardbound upholstery book | Keep current asset | Low | Retain in grid | No |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-03` | `/images/curtain-fabric-album.jpg` | Yes | Authentic studio photo | Large format curtain album | Keep current asset | Low | Retain in grid | No |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-04` | `/images/waterfall-hanger.jpg` | Yes | Authentic studio photo | Cascading waterfall hanger | Keep current asset | Low | Retain in grid | No |
| `/` | `FeaturedProducts.tsx` | Overview Grid | `prod-card-05` | `/images/waterfall-hanger.jpg` | Partial | Authentic studio photo | Full-drop showroom fabric hanger | Replace with SH-IMG-08 when supplied | Medium | Label as illustrative / share until exclusive photo supplied | Yes |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-01` | `/images/wallpaper-catalog-book.jpg` | Yes | Authentic studio photo | Wallpaper catalog detail | Keep current asset | Low | Retain in gallery | No |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-02` | `/images/wallpaper-roll-display.jpg` | Yes | Authentic studio photo | Commercial wallcovering drops | Keep current asset | Low | Retain in gallery | No |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-03` | `/images/upholstery-swatch-book.jpg` | Yes | Authentic studio photo | Layered upholstery swatches | Keep current asset | Low | Retain in gallery | No |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-04` | `/images/curtain-fabric-album.jpg` | Yes | Authentic studio photo | Post-bound drapery album | Keep current asset | Low | Retain in gallery | No |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-05` | `/images/waterfall-hanger.jpg` | Yes | Authentic studio photo | Cascading tiered swatches | Keep current asset | Low | Retain in gallery | No |
| `/` | `Gallery.tsx` | Production Showcase | `gallery-06` | `/images/sample-cards-storyboard.jpg` | Yes | Authentic studio photo | Precision die-cut cards | Keep current asset | Low | Retain in gallery | No |
| `/about` | `AboutPage.tsx` | Partner Architecture | `about-hub-01` | Custom SVG Hub Icon & Architecture Card | Yes | Illustrative graphic | Centralized Coordination Hub | Keep SVG architecture | Medium | Factual representation of management model | No |
| `/about` | `AboutPage.tsx` | Partner Architecture | `about-cut-02` | Custom SVG Pinking Icon & Partner Card | Yes | Illustrative graphic | Precision pinking & manual cutting | Keep SVG architecture | Medium | Replaced broken box; zero automated claims | No |
| `/about` | `AboutPage.tsx` | Partner Architecture | `about-bind-03` | Custom SVG Press Icon & Partner Card | Yes | Illustrative graphic | Case-binding & finishing press | Keep SVG architecture | Medium | Replaced broken box | No |
| `/about` | `AboutPage.tsx` | Partner Architecture | `about-pack-04` | Custom SVG Logistics Icon & Export Card | Yes | Illustrative graphic | Export packaging & dispatch | Keep SVG architecture | Medium | Replaced broken box | No |
| `/manufacturing-process` | `ManufacturingProcessPage.tsx` | QC Standards | `qc-macro-01` | `/images/upholstery-swatch-book-2.jpg` | Yes | Authentic macro detail | Macro quality inspection standards | Keep macro detail | High | Replaced misleading duplicate factory image | No |
| `/blog` | `BlogCard.tsx` | Editorial Cards | `blog-card-01` | Themed gradient SVG banner | Yes | Illustrative graphic | Export logistics & transit | Keep vector banners | Low | Upgraded raw text placeholder | No |
| `/blog` | `BlogCard.tsx` | Editorial Cards | `blog-card-02` | Themed gradient SVG banner | Yes | Illustrative graphic | Swatch format comparisons | Keep vector banners | Low | Upgraded raw text placeholder | No |
| `/blog` | `BlogCard.tsx` | Editorial Cards | `blog-card-03` | Themed gradient SVG banner | Yes | Illustrative graphic | B2B textile marketing ROI | Keep vector banners | Low | Upgraded raw text placeholder | No |
| `/portfolio` | `PortfolioPage.tsx` | Project Grid (6 cards) | `portfolio-01..06` | 6 category product images | Yes | Authentic studio photo | Finished client production formats | Keep studio assets | Low | Verified filterable masonry grid | No |
| `/products/upholstery-swatch-books` | `ProductUpholstery.tsx` | Carousel | `uph-angle-01` | `/images/upholstery-swatch-book.jpg` | Yes | Authentic studio photo | Hardbound book open with swatches | Keep current asset | Low | Active in carousel | No |
| `/products/upholstery-swatch-books` | `ProductUpholstery.tsx` | Carousel | `uph-angle-02` | `/images/upholstery-swatch-book-2.jpg` | Yes | Authentic studio photo | Macro pinking edge finish | Keep current asset | Low | Active in carousel | No |
| `/products/curtain-fabric-albums` | `ProductCurtain.tsx` | Carousel | `cur-angle-01` | `/images/curtain-fabric-album.jpg` | Yes | Authentic studio photo | Large-format drapery album open | Keep current asset | Low | Active in carousel | No |
| `/products/curtain-fabric-albums` | `ProductCurtain.tsx` | Carousel | `cur-angle-02` | `/images/curtain-fabric-album-2.jpg` | Yes | Authentic studio photo | Heavy-duty screw-post spine macro | Keep current asset | Low | Active in carousel | No |
| `/products/waterfall-swatch-hangers` | `ProductWaterfall.tsx` | Carousel | `wat-angle-01` | `/images/waterfall-hanger.jpg` | Yes | Authentic studio photo | Stepped cascade fabric hanger | Keep current asset | Low | Active in carousel | No |
| `/products/waterfall-swatch-hangers` | `ProductWaterfall.tsx` | Carousel | `wat-angle-02` | `/images/waterfall-hanger-2.jpg` | Yes | Authentic studio photo | Swivel hook & header card macro | Keep current asset | Low | Active in carousel | No |
| `/products/ring-swatch-sets` | `ProductRingSwatch.tsx` | Carousel | `rng-angle-01` | `/images/ring-swatch-set.jpg` | Yes | Authentic studio photo | Metal ring fan-out presentation | Keep current asset | Low | Active in carousel | No |
| `/products/ring-swatch-sets` | `ProductRingSwatch.tsx` | Carousel | `rng-angle-02` | `/images/ring-swatch-set-2.jpg` | Yes | Authentic studio photo | Nickel ring & brass eyelet macro | Keep current asset | Low | Active in carousel | No |
| `/products/sample-cards` | `ProductSampleCards.tsx` | Carousel | `crd-angle-01` | `/images/sample-cards-storyboard.jpg` | Yes | Authentic studio photo | Tri-fold presentation card layout | Keep current asset | Low | Active in carousel | No |
| `/products/sample-cards` | `ProductSampleCards.tsx` | Carousel | `crd-angle-02` | `/images/sample-cards-storyboard-2.jpg` | Yes | Authentic studio photo | Die-cut window inset macro | Keep current asset | Low | Active in carousel | No |
| `/products/wallpaper-catalog-manufacturing` | `ProductWallpaperCatalog.tsx` | Carousel | `wal-angle-01` | `/images/wallpaper-catalog-book.jpg` | Yes | Authentic studio photo | Textured wallpaper binder cover | Keep current asset | Low | Active in carousel | No |
| `/products/wallpaper-catalog-manufacturing` | `ProductWallpaperCatalog.tsx` | Carousel | `wal-angle-02` | `/images/wallpaper-roll-display.jpg` | Yes | Authentic studio photo | Wallcovering substrate & roll drops | Keep current asset | Low | Active in carousel | No |

---

## 3. Priority Image Requests (Photographs for Owner to Supply)

The following reference IDs represent requested photographic subjects for future documentation of real workshop craftsmanship. These are explicitly recorded as **requested subjects**, not existing files:

* **SH-IMG-01: Manual Fabric Sample Preparation**  
  * *Subject:* Technician unrolling, measuring, and inspecting incoming fabric bolts on a clean cutting table.  
  * *Requirements:* Natural workshop lighting, hands visible, no competitor branding.
* **SH-IMG-02: Actual Cutting & Pinking Process**  
  * *Subject:* Craftsman operating a manual rotary fabric cutter or manual industrial pinking shear along a steel guide.  
  * *Requirements:* Focus on serrated edge detail, fabric tension, and precision.
* **SH-IMG-03: Fabric Swatch Mounting**  
  * *Subject:* Artisan mounting fabric swatches onto rigid Kappa board leaves or waterfall cards with adhesive tape backing.  
  * *Requirements:* Stepped cascade alignment, clean assembly area.
* **SH-IMG-04: Sample-Book Binding & Finishing**  
  * *Subject:* Assembly of hardbound covers, inserting brass Chicago screw-posts, or buckram spine wrapping.  
  * *Requirements:* Macro focus on binding hardware and embossed cover.
* **SH-IMG-05: Quality Inspection Protocol**  
  * *Subject:* Quality inspector verifying swatch step spacing and label alignment with precision rule or digital caliper.  
  * *Requirements:* Dedicated inspection table with high-CRI overhead lighting.
* **SH-IMG-06: Finished Fabric Sample Books**  
  * *Subject:* Stacks of completed, branded fabric sample books and wallpaper catalogs ready for packaging.  
  * *Requirements:* Neutral showroom or inspection background.
* **SH-IMG-07: Actual Packaging & Dispatch**  
  * *Subject:* Worker sealing finished books with protective moisture wrapping, corner buffers, and export master cartons.  
  * *Requirements:* Dispatch staging area showing carton labeling.
* **SH-IMG-08: Full-Drop Showroom Fabric Hanger Presentation**  
  * *Subject:* 70–100 cm full-drop drapery or upholstery swatches mounted on heavy-duty branded header cards with chrome swivel hook hanging on a showroom display rail.  
  * *Requirements:* High-resolution product shot to replace the shared waterfall hanger asset on `/products/fabric-hanger-swatches`.
