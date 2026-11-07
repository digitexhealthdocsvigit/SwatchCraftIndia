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
    <g transform="translate(360, 175)">
      <rect x="0" y="20" width="230" height="310" rx="8" fill="#102136" stroke="#c9a86a" stroke-width="2.5"/>
      <rect x="18" y="40" width="194" height="270" rx="4" fill="#1e3a5f" stroke="#c9a86a" stroke-width="1" stroke-opacity="0.4"/>
      <rect x="230" y="20" width="250" height="310" rx="8" fill="#f8f6f2" stroke="#c9a86a" stroke-width="2.5"/>
      <rect x="255" y="48" width="200" height="42" rx="3" fill="#d9cfc1" stroke="#8B6F47" stroke-width="1"/>
      <rect x="255" y="98" width="200" height="42" rx="3" fill="#b7a68e" stroke="#8B6F47" stroke-width="1"/>
      <rect x="255" y="148" width="200" height="42" rx="3" fill="#8B6F47" stroke="#1e3a5f" stroke-width="1"/>
      <rect x="255" y="198" width="200" height="42" rx="3" fill="#0d7377" stroke="#1e3a5f" stroke-width="1"/>
      <rect x="255" y="248" width="200" height="42" rx="3" fill="#1e3a5f" stroke="#c9a86a" stroke-width="1"/>
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
  heroShowcase: '/images/hero-main-showcase.jpg',
  wallpaperBook: '/images/wallpaper-catalog-book.jpg',
  wallpaperRollDisplay: '/images/wallpaper-roll-display.jpg',
  upholsteryBook: '/images/upholstery-swatch-book.jpg',
  curtainAlbum: '/images/curtain-fabric-album.jpg',
  waterfallHanger: '/images/waterfall-hanger.jpg',
  ringSwatchSet: '/images/ring-swatch-set.jpg',
  sampleCardsStoryboard: '/images/sample-cards-storyboard.jpg',
} as const;

export const HERO_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.heroShowcase,
    alt: 'SamplingHub Manufacturing Plant - Thane Bhiwandi, Maharashtra Swatch Book Factory',
    caption: 'SamplingHub Thane-Bhiwandi 6,000 Sq Ft Precision Manufacturing Plant & Automated Bookbinding Lines',
    fallbackTitle: 'SamplingHub Manufacturing Facility',
    fallbackSubtitle: 'THANE-BHIWANDI, MAHARASHTRA • EXPORT PRODUCTION',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Hardbound Wallpaper Catalog Book with Room-Scene Visualizer Sheet - SamplingHub Thane-Bhiwandi',
    caption: 'Oversized 45×45 cm Hardbound Wallpaper Catalog with Full-Color Room-Scene Visualizer Sheet',
    fallbackTitle: 'Hardbound Wallpaper Catalog Book',
    fallbackSubtitle: 'OVERSIZED 45×45 CM & 50×50 CM REPEAT BOOKS',
  },
];

export const WALLPAPER_CATALOG_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Hardbound Wallpaper Catalog Book with Room-Scene Visualizer Sheet - SamplingHub Thane-Bhiwandi',
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
    src: LOCAL_IMAGES.upholsteryBook,
    alt: 'Custom Hardbound Upholstery Swatch Book with Layered Boucle & Velvet Swatches - SamplingHub',
    caption: '3mm Rigid Kappa Board Upholstery Album with Cascading Multi-Color Boucle, Chenille & Velvet Leaves',
    fallbackTitle: 'Hardbound Upholstery Swatch Book',
    fallbackSubtitle: '3MM KAPPA BOARD • SCREW-POST & BUCKRAM BINDING',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.heroShowcase,
    alt: 'Precision Cutting & Bookbinding Assembly for Upholstery Books at SamplingHub Thane-Bhiwandi',
    caption: 'High-Volume Precision Cutting, Anti-Fray Pinking & Artisan Bookbinding at Thane-Bhiwandi Plant',
    fallbackTitle: 'Factory Assembly & Inspection',
    fallbackSubtitle: 'THANE-BHIWANDI • 21-DAY EXPORT PRODUCTION',
  },
];

export const CURTAIN_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.curtainAlbum,
    alt: 'Large-Format Post-Bound Curtain Fabric Album with Full-Drop Sheer & Drapery Swatches - SamplingHub',
    caption: 'Oversized A3+ Post-Bound Album with Full-Drop Sheers, Jacquards & Blackout Drapery Leaves',
    fallbackTitle: 'Curtain & Drapery Catalog Album',
    fallbackSubtitle: 'SHEER, BLACKOUT & JACQUARD DRAPERY COLLECTIONS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.heroShowcase,
    alt: 'Commercial Drapery Album Assembly Line - SamplingHub Thane-Bhiwandi',
    caption: 'Artisan Bookbinding & Hardware Attachment for Heavy Commercial Drapery Collections',
    fallbackTitle: 'Showroom Drapery Portfolio Album',
    fallbackSubtitle: 'HEAVY-DUTY BRASS SCREW-POST ARCHITECTURE',
  },
];

export const WATERFALL_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.waterfallHanger,
    alt: 'SamplingHub Custom Waterfall Swatch Hanger with Metal Hook and Header Card',
    caption: 'Cascading Tiered Waterfall Hanger with Custom Foil-Stamped Header Card & Pinned Swatches',
    fallbackTitle: 'Waterfall Hanger & Cascade System',
    fallbackSubtitle: '25MM–35MM STEPPED DROPS • REINFORCED HEADER CARD',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.heroShowcase,
    alt: 'Multi-Colorway Waterfall Assembly at SamplingHub Maharashtra Plant',
    caption: 'Automated Guillotine Repeat Cutting & Multi-Drop Waterfall Mounting Lines',
    fallbackTitle: 'Waterfall Showroom Display System',
    fallbackSubtitle: 'CHROME SWIVEL HOOK • EXPORT FINISH',
  },
];

export const HANGER_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.waterfallHanger,
    alt: 'Chrome Swivel Hook Fabric Hanger with Branded Navy & Gold Header - SamplingHub',
    caption: 'Full-Drop Showroom Hanger with Branded 3mm Kappa Header Card and Anti-Fray Pinked Swatches',
    fallbackTitle: 'Commercial Fabric Hanger Headers',
    fallbackSubtitle: 'CHROME SWIVEL HOOKS • CONCEALED SCREW-POST CLAMP',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.heroShowcase,
    alt: 'Hanger Sample Header Production at Thane-Bhiwandi Facility',
    caption: 'Custom Header Board Lamination, Die-Cutting & Rivet Fastening for Global Textile Showrooms',
    fallbackTitle: 'Branded Header Card & Hook System',
    fallbackSubtitle: '3MM KAPPA BOARD HEADER • FOIL-STAMPED BRANDING',
  },
];

export const RING_SWATCH_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.ringSwatchSet,
    alt: 'Portable Heavy-Duty Chrome Ring Swatch Set with Printed Spec Label - SamplingHub',
    caption: 'Chrome Split-Ring Swatch Fan Deck with Brass Eyelet Reinforcement and Technical Specification Labels',
    fallbackTitle: 'Heavy-Duty Ring Swatch Sets',
    fallbackSubtitle: '25MM–75MM NICKEL & BRASS RINGS • BRASS EYELETS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.sampleCardsStoryboard,
    alt: 'Portable Swatch Kits & Marketing Storyboard Set - SamplingHub',
    caption: 'Coordinated Sales Representative Travel Kits & Die-Cut Swatch Folders',
    fallbackTitle: 'Indexed Feelers & Ring Fans',
    fallbackSubtitle: 'PINKED OR OVERLOCKED EDGES • BARCODE BACK-LABELS',
  },
];

export const SAMPLE_CARDS_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.sampleCardsStoryboard,
    alt: 'SamplingHub Die-Cut Swatch Cards & Multi-Fold Sample Storyboards',
    caption: 'Rigid 400 GSM Art Card Swatch Cards with Precision Die-Cut Windows and Collection Storytelling',
    fallbackTitle: 'Custom Swatch Cards & Shade Cards',
    fallbackSubtitle: '350–400 GSM ART CARD • BI-FOLD & TRI-FOLD FOLDERS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.ringSwatchSet,
    alt: 'Portable Fabric Swatch Cards & Ring Kit Presentation - SamplingHub',
    caption: 'High-Converting Trade Mailer Cards and Field Rep Presentation Kits Manufactured in Thane-Bhiwandi',
    fallbackTitle: 'Die-Cut Window & Waterfall Shade Cards',
    fallbackSubtitle: 'MATTE/VELVET LAMINATION • METALLIC FOIL STAMPING',
  },
];

export const MEDIA_ASSETS = {
  hero: HERO_MEDIA,
  wallpaperCatalog: WALLPAPER_CATALOG_MEDIA,
  upholstery: UPHOLSTERY_MEDIA,
  curtain: CURTAIN_MEDIA,
  waterfall: WATERFALL_MEDIA,
  hanger: HANGER_MEDIA,
  ringSwatch: RING_SWATCH_MEDIA,
  sampleCards: SAMPLE_CARDS_MEDIA,
  portfolio: HERO_MEDIA,
  factory: HERO_MEDIA,
} as const;
