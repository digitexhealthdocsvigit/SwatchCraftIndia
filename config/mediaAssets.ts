export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

/**
 * Generates a high-contrast studio B2B SVG data URI fallback when a local
 * image file in /public/images/ has not yet been uploaded to disk.
 */
export function createStudioPlaceholderSvg(
  title: string,
  subtitle = 'SAMPLING HUB • THANE-BHIWANDI MANUFACTURING',
  specLine = 'Export-Grade Architectural Swatch & Sample System'
): string {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeSub = subtitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeSpec = specLine.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e3a5f"/>
        <stop offset="55%" stop-color="#152943"/>
        <stop offset="100%" stop-color="#0d7377"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#c9a86a"/>
        <stop offset="100%" stop-color="#8B6F47"/>
      </linearGradient>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" stroke-width="0.6" stroke-opacity="0.07"/>
      </pattern>
    </defs>
    <rect width="1200" height="900" fill="url(#bg)"/>
    <rect width="1200" height="900" fill="url(#grid)"/>
    <rect x="60" y="60" width="1080" height="780" rx="18" fill="none" stroke="url(#gold)" stroke-width="2" stroke-opacity="0.55"/>
    <!-- Architectural Swatch Book Mockup Graphic -->
    <g transform="translate(360, 175)">
      <rect x="0" y="20" width="230" height="310" rx="8" fill="#102136" stroke="#c9a86a" stroke-width="2.5"/>
      <rect x="18" y="40" width="194" height="270" rx="4" fill="#1e3a5f" stroke="#c9a86a" stroke-width="1" stroke-opacity="0.4"/>
      <rect x="230" y="20" width="250" height="310" rx="8" fill="#f8f6f2" stroke="#c9a86a" stroke-width="2.5"/>
      <!-- Cascading Swatch Drops -->
      <rect x="255" y="48" width="200" height="42" rx="3" fill="#d9cfc1" stroke="#8B6F47" stroke-width="1"/>
      <rect x="255" y="98" width="200" height="42" rx="3" fill="#b7a68e" stroke="#8B6F47" stroke-width="1"/>
      <rect x="255" y="148" width="200" height="42" rx="3" fill="#8B6F47" stroke="#1e3a5f" stroke-width="1"/>
      <rect x="255" y="198" width="200" height="42" rx="3" fill="#0d7377" stroke="#1e3a5f" stroke-width="1"/>
      <rect x="255" y="248" width="200" height="42" rx="3" fill="#1e3a5f" stroke="#c9a86a" stroke-width="1"/>
      <!-- Spine -->
      <rect x="222" y="16" width="16" height="318" rx="4" fill="url(#gold)"/>
    </g>
    <text x="600" y="590" text-anchor="middle" fill="#c9a86a" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="4">${safeSub}</text>
    <text x="600" y="650" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="40" font-weight="700">${safeTitle}</text>
    <text x="600" y="705" text-anchor="middle" fill="#d1fae5" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="500">${safeSpec}</text>
    <rect x="460" y="745" width="280" height="42" rx="21" fill="#ffffff" fill-opacity="0.1" stroke="#c9a86a" stroke-width="1"/>
    <text x="600" y="772" text-anchor="middle" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="600" letter-spacing="1.5">CUSTOM B2B OEM PRODUCTION</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const LOCAL_IMAGES = {
  wallpaperBook: '/images/wallpaper-catalog-book.jpg',
  wallpaperRollDisplay: '/images/wallpaper-roll-display.jpg',
  upholsteryBook: '/images/upholstery-swatch-book.jpg',
  curtainCatalog: '/images/curtain-fabric-catalog.jpg',
  waterfallHanger: '/images/waterfall-hanger-sample.jpg',
  fabricHanger: '/images/fabric-hanger-header.jpg',
  ringSwatchSet: '/images/ring-swatch-set.jpg',
  sampleCardFolder: '/images/sample-card-folder.jpg',
} as const;

export const WALLPAPER_CATALOG_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Hardbound Wallpaper Catalog Book with Room-Scene Separator Pages - SamplingHub Thane-Bhiwandi',
    caption: 'Oversized 45×45 cm Hardbound Wallpaper Catalog with Full-Color Room-Scene Visualizer Sheet & Stepped Coordinate Swatches',
    fallbackTitle: 'Hardbound Wallpaper Catalog Book',
    fallbackSubtitle: 'OVERSIZED 45×45 CM & 50×50 CM REPEAT BOOKS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Commercial Wallcovering & Textured Wallpaper Sample Drops Display',
    caption: 'Heavy-Duty 300–500+ GSM Textured Vinyl, Damask, Botanical & Geometric Wallcovering Sample Drops',
    fallbackTitle: 'Commercial Wallcovering Sample Drops',
    fallbackSubtitle: '300–500+ GSM VINYL, NON-WOVEN & EMBOSSED WALLCOVERINGS',
  },
];

export const UPHOLSTERY_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Hardbound Upholstery & Furnishing Swatch Book - SamplingHub Thane-Bhiwandi',
    caption: '3mm Imported Kappa Board Hardbound Swatch Book with Room-Scene Index & Layered Fabric Leaves',
    fallbackTitle: 'Hardbound Upholstery Swatch Book',
    fallbackSubtitle: '3MM KAPPA BOARD • SCREW-POST & BUCKRAM BINDING',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Textured Furnishing, Jacquard & Heavy Weave Sample Display Drops',
    caption: 'Multi-Collection Heavy Jacquard, Chenille, Boucle & Textured Furnishing Presentation Display',
    fallbackTitle: 'Heavy Upholstery Texture Cascade',
    fallbackSubtitle: '300–600 GSM JACQUARD, BOUCLE & VELVET SWATCHES',
  },
];

export const CURTAIN_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Drapery, Curtain & Wallcovering Full-Drop Cascade Presentation - SamplingHub',
    caption: 'Full-Drop Drapery, Sheer & Coordinated Wallcovering Cascade Presentation for Showroom Evaluation',
    fallbackTitle: 'Curtain & Drapery Catalog Display',
    fallbackSubtitle: 'SHEER, BLACKOUT & JACQUARD DRAPERY COLLECTIONS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Hardbound Drapery & Interior Furnishing Album with Room-Scene Divider',
    caption: 'Hardbound Showroom Album with Full-Color Interior Room-Scene Visualizer & Coordinate Swatch Strips',
    fallbackTitle: 'Showroom Drapery Portfolio Album',
    fallbackSubtitle: 'ROOM-SCENE VISUALIZER • ANTI-FRAY PINKING CUTS',
  },
];

export const WATERFALL_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Cascading Waterfall Sample Drops for Multi-Colorway Collections - SamplingHub',
    caption: 'Multi-Drop Cascading Presentation Showing Pattern Repeat, Texture & Colorway Harmony',
    fallbackTitle: 'Waterfall Hanger & Cascade System',
    fallbackSubtitle: '25MM–35MM STEPPED DROPS • REINFORCED HEADER CARD',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Stepped Waterfall Swatch Assembly Inside Hardcover Presentation Book',
    caption: 'Precision Stepped Waterfall Swatch Strips Mounted with Non-Yellowing Japanese Acrylic Adhesive',
    fallbackTitle: 'Book-Style Folded Waterfall Album',
    fallbackSubtitle: 'PROTECTIVE HARDCOVER • EXPORT SHOWROOM FORMAT',
  },
];

export const HANGER_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Showroom Hanging Fabric & Wallcovering Drop Display - SamplingHub',
    caption: 'Full-Drop Showroom Hanging Samples for Feel, Drape, Repeat & Light-Transmission Testing',
    fallbackTitle: 'Commercial Fabric Hanger Headers',
    fallbackSubtitle: 'CHROME SWIVEL HOOKS • CONCEALED SCREW-POST CLAMP',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Coordinated Catalog & Showroom Header Presentation System',
    caption: 'Coordinated Collection Header & Room-Scene Presentation System Manufactured in Thane-Bhiwandi',
    fallbackTitle: 'Branded Header Card & Hook System',
    fallbackSubtitle: '3MM KAPPA BOARD HEADER • FOIL-STAMPED BRANDING',
  },
];

export const RING_SWATCH_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Multi-Texture Swatch Drops & Portable Colorway Collection - SamplingHub',
    caption: 'Complete Colorway & Texture Range Engineered for Field Sales Reps and Interior Designers',
    fallbackTitle: 'Heavy-Duty Ring Swatch Sets',
    fallbackSubtitle: '25MM–75MM NICKEL & BRASS RINGS • BRASS EYELETS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Indexed Collection Swatches with Printed Specification Header',
    caption: 'Die-Cut & Pinked Swatch Leaves Paired with Printed Technical Specification Headers',
    fallbackTitle: 'Indexed Feelers & Ring Fans',
    fallbackSubtitle: 'PINKED OR OVERLOCKED EDGES • BARCODE BACK-LABELS',
  },
];

export const SAMPLE_CARDS_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Printed Tri-Fold & Bi-Fold Swatch Card Book with Room Visualizer - SamplingHub',
    caption: 'High-Definition Offset Printed Room-Scene Visualizer Paired with Precision-Mounted Swatch Windows',
    fallbackTitle: 'Custom Swatch Cards & Shade Cards',
    fallbackSubtitle: '350–400 GSM ART CARD • BI-FOLD & TRI-FOLD FOLDERS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Multi-Shade Textile & Wallcovering Collection Swatch Series',
    caption: 'Color-Accurate Multi-Shade Presentation Engineered for High-Volume Trade Mailers & Showrooms',
    fallbackTitle: 'Die-Cut Window & Waterfall Shade Cards',
    fallbackSubtitle: 'MATTE/VELVET LAMINATION • METALLIC FOIL STAMPING',
  },
];
