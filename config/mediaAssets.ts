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
  heroShowcase: '/images/wallpaper-catalog-book.jpg',
  inspectionQC: '/images/upholstery-swatch-book-2.jpg',
  factoryBhiwandi: '/images/upholstery-swatch-book-2.jpg',
  wallpaperBook: '/images/wallpaper-catalog-book.jpg',
  wallpaperRollDisplay: '/images/wallpaper-roll-display.jpg',
  upholsteryBook: '/images/upholstery-swatch-book.jpg',
  upholsteryBookAngle2: '/images/upholstery-swatch-book-2.jpg',
  curtainAlbum: '/images/curtain-fabric-album.jpg',
  curtainAlbumAngle2: '/images/curtain-fabric-album-2.jpg',
  waterfallHanger: '/images/waterfall-hanger.jpg',
  waterfallHangerAngle2: '/images/waterfall-hanger-2.jpg',
  ringSwatchSet: '/images/ring-swatch-set.jpg',
  ringSwatchSetAngle2: '/images/ring-swatch-set-2.jpg',
  sampleCardsStoryboard: '/images/sample-cards-storyboard.jpg',
  sampleCardsStoryboardAngle2: '/images/sample-cards-storyboard-2.jpg',
} as const;

export const HERO_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.heroShowcase,
    alt: 'SamplingHub OEM Production Coordination - Thane Bhiwandi, Maharashtra Swatch Book Operations',
    caption: 'Custom Hardbound Wallpaper & Fabric Swatch Books — SamplingHub (Digitex Studio) OEM Presentation Systems',
    fallbackTitle: 'SamplingHub OEM Coordination Hub',
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
  {
    type: 'image',
    src: LOCAL_IMAGES.upholsteryBook,
    alt: 'Custom Hardbound Upholstery Swatch Book with Layered Boucle & Velvet Swatches - SamplingHub',
    caption: 'Luxury Hardbound Upholstery Album with Cascading Multi-Color Swatches & Gold Foil Stamping',
    fallbackTitle: 'Hardbound Upholstery Swatch Book',
    fallbackSubtitle: '3MM KAPPA BOARD • SCREW-POST & BUCKRAM BINDING',
  },
];

export const WALLPAPER_CATALOG_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Hardbound Wallpaper Catalog Book with Room-Scene Visualizer Sheet - SamplingHub Thane-Bhiwandi',
    caption: 'Angle #1: Oversized 45×45 cm Hardbound Wallpaper Catalog with Full-Color Room-Scene Visualizer Sheet & Stepped Coordinate Swatches',
    fallbackTitle: 'Hardbound Wallpaper Catalog Book',
    fallbackSubtitle: 'OVERSIZED 45×45 CM & 50×50 CM REPEAT BOOKS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Commercial Wallcovering & Textured Wallpaper Sample Drops Display',
    caption: 'Angle #2: Heavy-Duty 300–500+ GSM Textured Vinyl, Damask, Botanical & Geometric Wallcovering Sample Drops',
    fallbackTitle: 'Commercial Wallcovering Sample Drops',
    fallbackSubtitle: '300–500+ GSM VINYL, NON-WOVEN & EMBOSSED WALLCOVERINGS',
  },
];

export const UPHOLSTERY_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.upholsteryBook,
    alt: 'Angle #1: Custom Hardbound Upholstery Swatch Book with Layered Boucle & Velvet Swatches - SamplingHub',
    caption: 'Angle #1: 3mm Rigid Kappa Board Upholstery Album with Cascading Multi-Color Boucle, Chenille & Velvet Leaves',
    fallbackTitle: 'Hardbound Upholstery Swatch Book (Showcase)',
    fallbackSubtitle: '3MM KAPPA BOARD • SCREW-POST & BUCKRAM BINDING',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.upholsteryBookAngle2,
    alt: 'Angle #2: Macro Construction Detail - Upholstery Book Spine & Pinking Finish',
    caption: 'Angle #2: Macro Construction & Binding Detail Showing Precision Anti-Fray Pinking Cuts & Gold Border Finish',
    fallbackTitle: 'Upholstery Book Binding Detail (Macro)',
    fallbackSubtitle: 'PRECISION PINKING • RIGID SPINES',
  },
];

export const CURTAIN_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.curtainAlbum,
    alt: 'Angle #1: Large-Format Post-Bound Curtain Fabric Album with Full-Drop Sheer & Drapery Swatches - SamplingHub',
    caption: 'Angle #1: Oversized A3+ Post-Bound Album with Full-Drop Sheers, Jacquards & Blackout Drapery Leaves',
    fallbackTitle: 'Curtain & Drapery Catalog Album (Showcase)',
    fallbackSubtitle: 'SHEER, BLACKOUT & JACQUARD DRAPERY COLLECTIONS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.curtainAlbumAngle2,
    alt: 'Angle #2: Macro Detail - Curtain Album Heavy-Duty Chicago Screw-Post Spine',
    caption: 'Angle #2: Macro Detail Showing Heavy-Duty Concealed Brass Chicago Screw-Posts & Reinforced Buckram Spine',
    fallbackTitle: 'Curtain Album Screw-Post Binding (Macro)',
    fallbackSubtitle: 'HEAVY-DUTY BRASS SCREW-POST ARCHITECTURE',
  },
];

export const WATERFALL_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.waterfallHanger,
    alt: 'Angle #1: SamplingHub Custom Waterfall Swatch Hanger with Metal Hook and Header Card',
    caption: 'Angle #1: Cascading Tiered Waterfall Hanger with Custom Foil-Stamped Header Card & Pinned Swatches',
    fallbackTitle: 'Waterfall Hanger & Cascade System (Showcase)',
    fallbackSubtitle: '25MM–35MM STEPPED DROPS • REINFORCED HEADER CARD',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.waterfallHangerAngle2,
    alt: 'Angle #2: Macro Detail - Chrome Swivel Hook & Header Card Fastening',
    caption: 'Angle #2: Macro Detail of Chrome Swivel Hook Fastening, Custom Foil Branding & 3mm Rigid Header Board',
    fallbackTitle: 'Waterfall Header Construction Detail (Macro)',
    fallbackSubtitle: 'CHROME SWIVEL HOOK • EXPORT FINISH',
  },
];

export const HANGER_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.waterfallHanger,
    alt: 'Angle #1: Chrome Swivel Hook Fabric Hanger with Branded Navy & Gold Header - SamplingHub',
    caption: 'Angle #1: Full-Drop Showroom Hanger with Branded 3mm Kappa Header Card and Anti-Fray Pinked Swatches',
    fallbackTitle: 'Commercial Fabric Hanger Headers (Showcase)',
    fallbackSubtitle: 'CHROME SWIVEL HOOKS • CONCEALED SCREW-POST CLAMP',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.waterfallHangerAngle2,
    alt: 'Angle #2: Macro Construction - Hanger Clamp & Swivel Mechanism',
    caption: 'Angle #2: Macro Detail of Heavy-Gauge Chrome Hook, Riveted Clamp & Showroom Hardware',
    fallbackTitle: 'Hanger Clamp & Swivel Mechanism (Macro)',
    fallbackSubtitle: '3MM KAPPA BOARD HEADER • FOIL-STAMPED BRANDING',
  },
];

export const RING_SWATCH_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.ringSwatchSet,
    alt: 'Angle #1: Portable Heavy-Duty Chrome Ring Swatch Set with Printed Spec Label - SamplingHub',
    caption: 'Angle #1: Chrome Split-Ring Swatch Fan Deck with Brass Eyelet Reinforcement and Technical Specification Labels',
    fallbackTitle: 'Heavy-Duty Ring Swatch Sets (Showcase)',
    fallbackSubtitle: '25MM–75MM NICKEL & BRASS RINGS • BRASS EYELETS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.ringSwatchSetAngle2,
    alt: 'Angle #2: Macro Detail - Nickel Split-Ring Mechanism & Brass Eyelet Punch',
    caption: 'Angle #2: Macro Detail of Split-Ring Mechanism, Clean Eyelet Fastening & Fabric Labeling Registration',
    fallbackTitle: 'Ring Binding Mechanism Detail (Macro)',
    fallbackSubtitle: 'PINKED OR OVERLOCKED EDGES • BARCODE BACK-LABELS',
  },
];

export const SAMPLE_CARDS_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.sampleCardsStoryboard,
    alt: 'Angle #1: SamplingHub Die-Cut Swatch Cards & Multi-Fold Sample Storyboards',
    caption: 'Angle #1: Rigid 400 GSM Art Card Swatch Cards with Precision Die-Cut Windows and Collection Storytelling',
    fallbackTitle: 'Custom Swatch Cards & Shade Cards (Showcase)',
    fallbackSubtitle: '350–400 GSM ART CARD • BI-FOLD & TRI-FOLD FOLDERS',
  },
  {
    type: 'image',
    src: LOCAL_IMAGES.sampleCardsStoryboardAngle2,
    alt: 'Angle #2: Macro Detail - Precision Die-Cut Windows & Swatch Mounting Alignment',
    caption: 'Angle #2: Macro Detail of Die-Cut Beveled Windows, Flush Fabric Insets & Hot-Foil Brand Lettering',
    fallbackTitle: 'Die-Cut Window & Finishing Detail (Macro)',
    fallbackSubtitle: 'MATTE/VELVET LAMINATION • METALLIC FOIL STAMPING',
  },
];

export const FACTORY_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: LOCAL_IMAGES.inspectionQC,
    alt: 'Macro Inspection: Anti-Fray Pinking Cuts & Swatch Registration - SamplingHub',
    caption: 'Macro Inspection & Finishing Quality Control — Precision Pinking, Board Alignment & Export Packing',
    fallbackTitle: 'OEM Partner Production & Quality Inspection',
    fallbackSubtitle: 'MANAGED OEM NETWORK • STRUCTURED EXPORT DISPATCH',
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
  factory: FACTORY_MEDIA,
  portfolio: HERO_MEDIA,
} as const;
