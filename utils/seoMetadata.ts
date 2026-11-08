export const PREFERRED_ORIGIN = 'https://www.samplinghub.world';

export const APPROVED_COMPANY_POSITIONING =
  'SamplingHub (Digitex Studio) is an India-based OEM fabric sampling solutions provider specialising in customised fabric sample books, swatch cards, waterfall hangers, sample headers and textile presentation systems. We manage the complete customer order through specialised manufacturing partners, with centralised product development, production coordination, quality inspection and finished-product supply. Established in 2011.';

export interface RouteSeoConfig {
  path: string;
  view: string;
  title: string;
  description: string;
  canonical: string | null;
  robots: 'index, follow' | 'noindex, follow' | 'noindex, nofollow';
  inSitemap: boolean;
  changefreq?: 'weekly' | 'monthly';
  priority?: string;
  ogType: 'website' | 'product' | 'article';
  ogImage: string;
  h1: string;
  leadText: string;
  jsonLd: Record<string, any> | null;
}

const ORGANIZATION_NODE = {
  '@type': 'Organization',
  '@id': `${PREFERRED_ORIGIN}/#organization`,
  name: 'SamplingHub',
  alternateName: ['SamplingHub', 'SamplingHub.world', 'Digitex Studio'],
  legalName: 'Digitex Studio',
  foundingDate: '2011',
  url: `${PREFERRED_ORIGIN}/`,
  logo: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
  image: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
  description: APPROVED_COMPANY_POSITIONING,
  telephone: '+919004962871',
  email: 'digitex.studio@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Thane Bhiwandi',
    addressLocality: 'Bhiwandi',
    addressRegion: 'Maharashtra',
    postalCode: '421302',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+919004962871',
      contactType: 'Sales / B2B Inquiry',
      contactOption: 'WhatsAppAvailable',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
};

function buildProductSchema(params: {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string | string[];
  url: string;
  price: string;
  moqValue: number;
  moqUnit: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_NODE,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${PREFERRED_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${PREFERRED_ORIGIN}/products` },
          { '@type': 'ListItem', position: 3, name: params.name, item: params.url },
        ],
      },
      {
        '@type': 'Product',
        '@id': `${PREFERRED_ORIGIN}/#${params.id}`,
        name: params.name,
        category: params.category,
        description: params.description,
        image: params.image,
        brand: {
          '@type': 'Brand',
          name: 'SamplingHub',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: params.price,
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          url: params.url,
          seller: {
            '@id': `${PREFERRED_ORIGIN}/#organization`,
          },
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            value: params.moqValue,
            unitText: params.moqUnit,
          },
        },
      },
    ],
  };
}

function buildWebPageSchema(path: string, title: string, description: string, pageType = 'WebPage') {
  const url = path === '/' ? `${PREFERRED_ORIGIN}/` : `${PREFERRED_ORIGIN}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_NODE,
      {
        '@type': pageType,
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: {
          '@id': `${PREFERRED_ORIGIN}/#website`,
        },
        about: {
          '@id': `${PREFERRED_ORIGIN}/#organization`,
        },
      },
    ],
  };
}

export const ROUTE_SEO_REGISTRY: Record<string, RouteSeoConfig> = {
  '/': {
    path: '/',
    view: 'home',
    title: 'Custom Fabric Swatch Books & Wallpaper Catalogs | SamplingHub OEM Solutions',
    description:
      'SamplingHub (Digitex Studio) is an India-based OEM fabric sampling solutions provider for custom wallpaper catalogs, upholstery swatch books, waterfall hangers & sample cards. Established in 2011.',
    canonical: `${PREFERRED_ORIGIN}/`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '1.0',
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'Custom Fabric Swatch Book & Wallpaper Catalog OEM Sampling Solutions',
    leadText: APPROVED_COMPANY_POSITIONING,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_NODE,
        {
          '@type': 'WebSite',
          '@id': `${PREFERRED_ORIGIN}/#website`,
          url: `${PREFERRED_ORIGIN}/`,
          name: 'SamplingHub (Digitex Studio)',
          publisher: { '@id': `${PREFERRED_ORIGIN}/#organization` },
        },
      ],
    },
  },
  '/about': {
    path: '/about',
    view: 'about',
    title: 'About SamplingHub (Digitex Studio) | Managed OEM Fabric Sampling Provider',
    description:
      'Learn how SamplingHub (Digitex Studio), established in 2011 in Thane Bhiwandi, Maharashtra, manages custom fabric sample book and wallpaper catalog orders through specialised manufacturing partners.',
    canonical: `${PREFERRED_ORIGIN}/about`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'monthly',
    priority: '0.8',
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/upholstery-swatch-book.jpg`,
    h1: 'About SamplingHub (Digitex Studio) — Managed OEM Fabric Sampling Solutions',
    leadText: APPROVED_COMPANY_POSITIONING,
    jsonLd: buildWebPageSchema(
      '/about',
      'About SamplingHub (Digitex Studio) | Managed OEM Fabric Sampling Provider',
      APPROVED_COMPANY_POSITIONING,
      'AboutPage'
    ),
  },
  '/products': {
    path: '/products',
    view: 'products-overview',
    title: 'Custom Fabric Sample Books, Waterfall Hangers & Swatch Cards | SamplingHub',
    description:
      'Explore SamplingHub OEM textile presentation products: wallpaper repeat catalogs, upholstery swatch books, curtain fabric albums, waterfall hangers, ring swatch sets, and shade cards.',
    canonical: `${PREFERRED_ORIGIN}/products`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'Fabric & Wallpaper Presentation Solutions',
    leadText:
      'Compare our full range of custom wallpaper catalogs, upholstery swatch books, curtain albums, waterfall hangers, ring swatch sets, and sample cards coordinated from Thane Bhiwandi, Maharashtra, India.',
    jsonLd: buildWebPageSchema(
      '/products',
      'Custom Fabric Sample Books, Waterfall Hangers & Swatch Cards | SamplingHub',
      'Overview of custom OEM textile and wallcovering sample presentation systems by SamplingHub (Digitex Studio).',
      'CollectionPage'
    ),
  },
  '/products/wallpaper-catalog-manufacturing': {
    path: '/products/wallpaper-catalog-manufacturing',
    view: 'product-wallpaper-catalog',
    title: 'Custom Wallpaper Catalog Books & Wallcovering Sample Albums | SamplingHub',
    description:
      'Oversized 45x45 cm and 50x50 cm custom hardbound and post-bound wallpaper catalog books with room-scene visualizer sheets for vinyl, non-woven & textured wallcoverings. MOQ 50 books.',
    canonical: `${PREFERRED_ORIGIN}/products/wallpaper-catalog-manufacturing`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
    ogType: 'product',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'Custom Wallpaper Catalog & Wallcovering Sample Book Solutions',
    leadText:
      'Oversized 45×45 cm and 50×50 cm hardbound and screw-post wallpaper catalog books with full-color printed interior room-scene visualizer sheets for 300–500+ GSM wallcoverings.',
    jsonLd: buildProductSchema({
      id: 'product-wallpaper-catalog',
      name: 'Custom Wallpaper Catalog & Sample Book Solutions',
      category: 'Wallcovering Sample Books',
      description:
        'Oversized 45x45 cm and 50x50 cm hardbound and screw-post wallpaper catalog books with printed interior room-scene visualizer sheets for 300-500+ GSM wallcoverings.',
      image: [
        `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
        `${PREFERRED_ORIGIN}/images/wallpaper-roll-display.jpg`,
      ],
      url: `${PREFERRED_ORIGIN}/products/wallpaper-catalog-manufacturing`,
      price: '120.00',
      moqValue: 50,
      moqUnit: 'Books',
    }),
  },
  '/products/upholstery-swatch-books': {
    path: '/products/upholstery-swatch-books',
    view: 'product-upholstery',
    title: 'Custom Upholstery Fabric Swatch Books & Hardbound Sample Albums | SamplingHub',
    description:
      'Custom hardbound and post-bound upholstery fabric swatch books with 3mm kappa board covers, foil stamping, and pinked fabric leaves for furniture brands and fabric editors. MOQ 50 books.',
    canonical: `${PREFERRED_ORIGIN}/products/upholstery-swatch-books`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
    ogType: 'product',
    ogImage: `${PREFERRED_ORIGIN}/images/upholstery-swatch-book.jpg`,
    h1: 'Custom Upholstery Fabric Swatch Books',
    leadText:
      'Export-grade hardbound and screw-post upholstery swatch books engineered with 3mm rigid kappa board covers, custom foil branding, and anti-fray pinked fabric swatches.',
    jsonLd: buildProductSchema({
      id: 'product-upholstery',
      name: 'Custom Upholstery Fabric Swatch Books',
      category: 'Fabric Sample Books',
      description:
        'Export-grade hardbound and ring-bound upholstery fabric swatch books with custom foil stamping, debossed logos, and showroom-durable covers.',
      image: `${PREFERRED_ORIGIN}/images/upholstery-swatch-book.jpg`,
      url: `${PREFERRED_ORIGIN}/products/upholstery-swatch-books`,
      price: '70.00',
      moqValue: 50,
      moqUnit: 'Books',
    }),
  },
  '/products/curtain-fabric-albums': {
    path: '/products/curtain-fabric-albums',
    view: 'product-curtain',
    title: 'Large-Format Curtain & Drapery Fabric Sample Albums | SamplingHub',
    description:
      'Oversized A3 and A3+ post-bound curtain and drapery fabric albums for sheer, blackout, and jacquard window treatment collections with custom white-label covers. MOQ 40 albums.',
    canonical: `${PREFERRED_ORIGIN}/products/curtain-fabric-albums`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
    ogType: 'product',
    ogImage: `${PREFERRED_ORIGIN}/images/curtain-fabric-album.jpg`,
    h1: 'Large-Format Curtain & Drapery Fabric Albums',
    leadText:
      'Oversized A3 and A3+ curtain presentation albums engineered to showcase full-drop drapery, sheer, blackout, and jacquard collections.',
    jsonLd: buildProductSchema({
      id: 'product-curtain',
      name: 'Curtain & Drapery Fabric Albums',
      category: 'Drapery Presentation Binders',
      description:
        'Large-format hardbound and post-bound curtain sample albums engineered for drapery, sheer, and blackout fabrics.',
      image: `${PREFERRED_ORIGIN}/images/curtain-fabric-album.jpg`,
      url: `${PREFERRED_ORIGIN}/products/curtain-fabric-albums`,
      price: '100.00',
      moqValue: 40,
      moqUnit: 'Albums',
    }),
  },
  '/products/waterfall-swatch-cards': {
    path: '/products/waterfall-swatch-cards',
    view: 'product-waterfall',
    title: 'Waterfall Fabric Swatch Cards & Stepped Colorway Cascades | SamplingHub',
    description:
      'Cascading multi-colorway waterfall swatch cards and bi-fold textile presentation folders on rigid 400 GSM board for fabric wholesalers and export collections. MOQ 100 units.',
    canonical: `${PREFERRED_ORIGIN}/products/waterfall-swatch-cards`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
    ogType: 'product',
    ogImage: `${PREFERRED_ORIGIN}/images/waterfall-hanger.jpg`,
    h1: 'Waterfall Swatch Cards & Multi-Colorway Cascades',
    leadText:
      'Precision-stepped waterfall fabric swatch cards allowing buyers to compare pattern repeats and shade variations at a single glance.',
    jsonLd: buildProductSchema({
      id: 'product-waterfall-hangers',
      name: 'Waterfall Swatch Cards & Cascades',
      category: 'Textile Waterfall Cards',
      description:
        'Cascading waterfall fabric swatch cards with stepped drops and custom printed header cards for showroom and export presentation.',
      image: `${PREFERRED_ORIGIN}/images/waterfall-hanger.jpg`,
      url: `${PREFERRED_ORIGIN}/products/waterfall-swatch-cards`,
      price: '18.00',
      moqValue: 100,
      moqUnit: 'Units',
    }),
  },
  '/products/fabric-hanger-swatches': {
    path: '/products/fabric-hanger-swatches',
    view: 'product-hanger',
    title: 'Showroom Fabric Hanger Swatches & Custom Sample Headers | SamplingHub',
    description:
      'Full-drop showroom fabric hanger swatches with chrome or brass swivel hooks, concealed screw-post clamps, and 3mm rigid branded header cards. MOQ 100 hangers.',
    canonical: `${PREFERRED_ORIGIN}/products/fabric-hanger-swatches`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
    ogType: 'product',
    ogImage: `${PREFERRED_ORIGIN}/images/waterfall-hanger-2.jpg`,
    h1: 'Commercial Showroom Fabric Hanger Swatches',
    leadText:
      'Full-drop fabric and wallcovering showroom hangers mounted on reinforced 3mm kappa board header cards with chrome or brass swivel hooks.',
    jsonLd: buildProductSchema({
      id: 'product-fabric-hangers',
      name: 'Showroom Fabric Hanger Swatches & Headers',
      category: 'Textile Showroom Hangers',
      description:
        'Full-drop fabric hanger swatches with heavy-duty metal swivel hooks and branded rigid header cards for showroom racks.',
      image: `${PREFERRED_ORIGIN}/images/waterfall-hanger-2.jpg`,
      url: `${PREFERRED_ORIGIN}/products/fabric-hanger-swatches`,
      price: '18.00',
      moqValue: 100,
      moqUnit: 'Hangers',
    }),
  },
  '/products/ring-swatch-sets': {
    path: '/products/ring-swatch-sets',
    view: 'product-ring',
    title: 'Portable Ring Swatch Sets & Fabric Feeler Fan Decks | SamplingHub',
    description:
      'Portable metal-ring fabric swatch sets with brass eyelet reinforcement, pinked edges, and printed barcode specification labels for field sales teams. MOQ 75 sets.',
    canonical: `${PREFERRED_ORIGIN}/products/ring-swatch-sets`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
    ogType: 'product',
    ogImage: `${PREFERRED_ORIGIN}/images/ring-swatch-set.jpg`,
    h1: 'Portable Ring Swatch Sample Sets',
    leadText:
      'Compact split-ring fabric swatch sets and feeler decks with brass eyelet reinforcement and specification back-labels for sales representatives.',
    jsonLd: buildProductSchema({
      id: 'product-ring-sets',
      name: 'Portable Ring Swatch Sets',
      category: 'Ring Bound Swatch Sets',
      description:
        'Compact swatch fan decks bound with chrome or brass split rings, eyelets, and fabric specification tags.',
      image: `${PREFERRED_ORIGIN}/images/ring-swatch-set.jpg`,
      url: `${PREFERRED_ORIGIN}/products/ring-swatch-sets`,
      price: '20.00',
      moqValue: 75,
      moqUnit: 'Sets',
    }),
  },
  '/products/sample-cards': {
    path: '/products/sample-cards',
    view: 'product-cards',
    title: 'Custom Fabric Sample Cards, Shade Cards & Storyboards | SamplingHub',
    description:
      'Precision die-cut 350-400 GSM rigid fabric sample cards, shade cards, and multi-fold storyboards for textile mailers and collection launches. MOQ 200 cards.',
    canonical: `${PREFERRED_ORIGIN}/products/sample-cards`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
    ogType: 'product',
    ogImage: `${PREFERRED_ORIGIN}/images/sample-cards-storyboard.jpg`,
    h1: 'Custom Fabric Sample Cards & Storyboards',
    leadText:
      'Precision die-cut 350–400 GSM rigid cardstock sample cards and multi-fold storyboards for direct mailers and architectural binders.',
    jsonLd: buildProductSchema({
      id: 'product-sample-cards',
      name: 'Textile Sample Memo Cards & Storyboards',
      category: 'Fabric Swatch Cards',
      description:
        'Precision die-cut fabric sample cards and storyboards with custom branding and fabric specifications.',
      image: `${PREFERRED_ORIGIN}/images/sample-cards-storyboard.jpg`,
      url: `${PREFERRED_ORIGIN}/products/sample-cards`,
      price: '12.00',
      moqValue: 200,
      moqUnit: 'Cards',
    }),
  },
  '/manufacturing-process': {
    path: '/manufacturing-process',
    view: 'process-detail',
    title: 'Managed OEM Swatch Book Production & Quality Inspection Process | SamplingHub',
    description:
      'Discover SamplingHub’s 5-stage managed OEM production workflow: CAD prototyping, manual pinking & cutting, rigid kappa board binding, multi-stage QC inspection, and export packing.',
    canonical: `${PREFERRED_ORIGIN}/manufacturing-process`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'monthly',
    priority: '0.8',
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/upholstery-swatch-book-2.jpg`,
    h1: 'The SamplingHub Managed OEM Production & Quality Control Process',
    leadText:
      'From initial specification review to international export dispatch, SamplingHub coordinates every stage of production across specialised partner units with centralised quality inspection.',
    jsonLd: buildWebPageSchema(
      '/manufacturing-process',
      'Managed OEM Swatch Book Production & Quality Inspection Process | SamplingHub',
      '5-stage managed OEM fabric sampling workflow coordinated from Thane Bhiwandi, Maharashtra, India.'
    ),
  },
  '/export-markets': {
    path: '/export-markets',
    view: 'export-markets-page',
    title: 'Global Textile Sample Book Export & Logistics (EU, USA, UK, UAE) | SamplingHub',
    description:
      'International export coordination for custom fabric swatch books and wallpaper catalogs to Europe, USA, UK, and GCC markets with full commercial invoice, packing list, and COO documentation.',
    canonical: `${PREFERRED_ORIGIN}/export-markets`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'monthly',
    priority: '0.8',
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'International Export Coordination for Fabric & Wallpaper Sample Books',
    leadText:
      'Serving textile editors, furniture manufacturers, and wallcovering distributors across international markets with complete export documentation and air/sea freight coordination.',
    jsonLd: buildWebPageSchema(
      '/export-markets',
      'Global Textile Sample Book Export & Logistics (EU, USA, UK, UAE) | SamplingHub',
      'International export documentation, packaging, and air/sea logistics coordination from Thane Bhiwandi, Maharashtra, India.'
    ),
  },
  '/portfolio': {
    path: '/portfolio',
    view: 'portfolio',
    title: 'Fabric Swatch Book & Wallpaper Catalog Production Portfolio | SamplingHub',
    description:
      'Browse SamplingHub’s portfolio of custom wallpaper repeat books, velvet & boucle upholstery swatch albums, curtain binders, waterfall hangers, and die-cut sample cards.',
    canonical: `${PREFERRED_ORIGIN}/portfolio`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'monthly',
    priority: '0.7',
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'SamplingHub OEM Production Portfolio',
    leadText:
      'Representative showcase of custom fabric and wallpaper presentation systems delivered through our managed OEM partner network.',
    jsonLd: buildWebPageSchema(
      '/portfolio',
      'Fabric Swatch Book & Wallpaper Catalog Production Portfolio | SamplingHub',
      'Showcase of custom wallpaper repeat books, upholstery swatch albums, curtain binders, waterfall hangers, and sample cards.',
      'CollectionPage'
    ),
  },
  '/pricing': {
    path: '/pricing',
    view: 'pricing',
    title: 'B2B Volume Pricing & MOQ Guide for Custom Swatch Books | SamplingHub',
    description:
      'Indicative B2B volume pricing and MOQ tiers for custom wallpaper catalogs, upholstery swatch books, curtain albums, waterfall hangers, ring sets, and fabric sample cards.',
    canonical: `${PREFERRED_ORIGIN}/pricing`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'monthly',
    priority: '0.8',
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/upholstery-swatch-book.jpg`,
    h1: 'Transparent B2B Volume Pricing & MOQ Matrix',
    leadText:
      'Review indicative B2B volume pricing tiers across all 7 custom fabric and wallcovering sample presentation lines.',
    jsonLd: buildWebPageSchema(
      '/pricing',
      'B2B Volume Pricing & MOQ Guide for Custom Swatch Books | SamplingHub',
      'Indicative B2B volume pricing and minimum order quantities for custom fabric sample books and wallpaper catalogs.'
    ),
  },
  '/blog': {
    path: '/blog',
    view: 'blog-hub',
    title: 'Textile Sampling & Swatch Book Engineering Insights | SamplingHub Blog',
    description:
      'Technical articles and B2B guides on fabric swatch book construction, wallpaper catalog binding, pinking vs overlocking, and international textile sample logistics.',
    canonical: `${PREFERRED_ORIGIN}/blog`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'weekly',
    priority: '0.7',
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'Textile Sampling & Bookbinding Technical Resource Hub',
    leadText:
      'Engineering guides on swatch book binding mechanics, anti-fray fabric cutting, and international B2B sample presentation.',
    jsonLd: buildWebPageSchema(
      '/blog',
      'Textile Sampling & Swatch Book Engineering Insights | SamplingHub Blog',
      'Technical articles and B2B guides on fabric swatch book construction and wallpaper catalog binding.',
      'Blog'
    ),
  },
  '/contact': {
    path: '/contact',
    view: 'contact-page',
    title: 'Contact SamplingHub & Request B2B Export Quote | Thane Bhiwandi, India',
    description:
      'Submit a custom RFQ for fabric swatch books, wallpaper catalogs, waterfall hangers, or sample cards. Registered business office: Thane Bhiwandi, PIN: 421302, Maharashtra, India.',
    canonical: `${PREFERRED_ORIGIN}/contact`,
    robots: 'index, follow',
    inSitemap: true,
    changefreq: 'monthly',
    priority: '0.8',
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'Request Technical Export Quote & Consultation',
    leadText:
      'Connect with SamplingHub (Digitex Studio) in Thane Bhiwandi, PIN: 421302, Maharashtra, India for custom fabric sample book and wallpaper catalog specifications.',
    jsonLd: buildWebPageSchema(
      '/contact',
      'Contact SamplingHub & Request B2B Export Quote | Thane Bhiwandi, India',
      'Contact SamplingHub (Digitex Studio) in Thane Bhiwandi, PIN: 421302, Maharashtra, India for custom B2B fabric sampling inquiries.',
      'ContactPage'
    ),
  },
  '/privacy': {
    path: '/privacy',
    view: 'privacy',
    title: 'Privacy Policy | SamplingHub (Digitex Studio)',
    description:
      'Privacy Policy governing B2B RFQ submissions, client specification files, and contact data handled by SamplingHub (Digitex Studio).',
    canonical: `${PREFERRED_ORIGIN}/privacy`,
    robots: 'noindex, follow',
    inSitemap: false,
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'Privacy Policy — SamplingHub (Digitex Studio)',
    leadText:
      'SamplingHub (Digitex Studio) respects your privacy and protects all B2B inquiry and specification data.',
    jsonLd: null,
  },
  '/terms': {
    path: '/terms',
    view: 'terms',
    title: 'Terms of Service | SamplingHub (Digitex Studio)',
    description:
      'Standard B2B commercial terms, minimum order quantities, and export dispatch terms for SamplingHub (Digitex Studio).',
    canonical: `${PREFERRED_ORIGIN}/terms`,
    robots: 'noindex, follow',
    inSitemap: false,
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'Terms of Service — SamplingHub (Digitex Studio)',
    leadText:
      'General B2B commercial terms for managed OEM fabric sampling and international export orders.',
    jsonLd: null,
  },
  '/admin': {
    path: '/admin',
    view: 'admin-dashboard',
    title: 'Admin Dashboard & CRM | SamplingHub Management Portal',
    description: 'Internal RFQ management, partner coordination, and CRM dashboard for SamplingHub (Digitex Studio).',
    canonical: null,
    robots: 'noindex, nofollow',
    inSitemap: false,
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'SamplingHub Admin Dashboard & CRM',
    leadText: 'Authorized management portal for SamplingHub (Digitex Studio) RFQ and OEM partner coordination.',
    jsonLd: null,
  },
  '/admin/login': {
    path: '/admin/login',
    view: 'admin-login',
    title: 'Staff & Partner Portal Login | SamplingHub Security Gateway',
    description: 'Authorized staff and partner authentication portal for SamplingHub (Digitex Studio).',
    canonical: null,
    robots: 'noindex, nofollow',
    inSitemap: false,
    ogType: 'website',
    ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
    h1: 'Staff & Partner Portal Authentication',
    leadText: 'Authorized access for SamplingHub (Digitex Studio) management and OEM coordination.',
    jsonLd: null,
  },
};

export const NOT_FOUND_SEO_CONFIG: RouteSeoConfig = {
  path: '/404',
  view: 'not-found',
  title: '404 Page Not Found | SamplingHub (Digitex Studio)',
  description:
    'The requested page or product specification could not be found on SamplingHub (Digitex Studio). Return to our primary fabric and wallpaper sampling catalog.',
  canonical: null,
  robots: 'noindex, nofollow',
  inSitemap: false,
  ogType: 'website',
  ogImage: `${PREFERRED_ORIGIN}/images/wallpaper-catalog-book.jpg`,
  h1: '404 — Resource Not Found',
  leadText:
    'The requested URL does not exist on SamplingHub (Digitex Studio). Please navigate to our homepage or product catalog.',
  jsonLd: null,
};

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const stripped = pathname.split('?')[0].split('#')[0];
  return stripped.length > 1 && stripped.endsWith('/') ? stripped.slice(0, -1) : stripped;
}

export function getSeoConfigForPath(pathname: string, viewOverride?: string): RouteSeoConfig {
  if (viewOverride === 'not-found') {
    return NOT_FOUND_SEO_CONFIG;
  }
  if (viewOverride === 'admin-dashboard') {
    return ROUTE_SEO_REGISTRY['/admin'];
  }
  if (viewOverride === 'admin-login') {
    return ROUTE_SEO_REGISTRY['/admin/login'];
  }
  if (viewOverride === 'gbp-strategy' || viewOverride === 'outreach-templates') {
    return {
      ...NOT_FOUND_SEO_CONFIG,
      title: 'Internal Marketing Tool | SamplingHub',
      robots: 'noindex, nofollow',
      canonical: null,
    };
  }
  if (viewOverride && viewOverride.startsWith('blog-post-')) {
    return {
      ...ROUTE_SEO_REGISTRY['/blog'],
      title: `Technical Article (${viewOverride.replace('blog-post-', '#')}) | SamplingHub Blog`,
    };
  }
  const normalized = normalizePathname(pathname);
  return ROUTE_SEO_REGISTRY[normalized] ?? NOT_FOUND_SEO_CONFIG;
}

/**
 * Synchronizes document.head metadata on client-side route transitions.
 * Ensures zero duplicate canonical tags and removes canonical on 404/admin routes.
 */
export function applyClientSeoMetadata(pathname: string, currentView?: string): void {
  if (typeof document === 'undefined') return;
  const config = getSeoConfigForPath(pathname, currentView);

  document.title = config.title;

  const setMeta = (selector: string, attrName: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('meta[name="title"]', 'name', 'title', config.title);
  setMeta('meta[name="description"]', 'name', 'description', config.description);
  setMeta('meta[name="robots"]', 'name', 'robots', config.robots);
  setMeta('meta[property="og:type"]', 'property', 'og:type', config.ogType);
  setMeta('meta[property="og:title"]', 'property', 'og:title', config.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', config.description);
  setMeta('meta[property="og:image"]', 'property', 'og:image', config.ogImage);
  if (config.canonical) {
    setMeta('meta[property="og:url"]', 'property', 'og:url', config.canonical);
  } else {
    const ogUrl = document.head.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.remove();
  }

  // Deduplicate and synchronize <link rel="canonical">
  const existingCanonicals = Array.from(document.head.querySelectorAll('link[rel="canonical"]'));
  if (!config.canonical) {
    existingCanonicals.forEach((el) => el.remove());
  } else {
    if (existingCanonicals.length > 1) {
      existingCanonicals.slice(1).forEach((el) => el.remove());
    }
    let canonicalEl = existingCanonicals[0] as HTMLLinkElement | undefined;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', config.canonical);
  }

  // Synchronize JSON-LD script block
  const existingLd = Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'));
  if (!config.jsonLd) {
    existingLd.forEach((el) => el.remove());
  } else {
    if (existingLd.length > 1) {
      existingLd.slice(1).forEach((el) => el.remove());
    }
    let ldEl = existingLd[0] as HTMLScriptElement | undefined;
    if (!ldEl) {
      ldEl = document.createElement('script');
      ldEl.type = 'application/ld+json';
      document.head.appendChild(ldEl);
    }
    ldEl.textContent = JSON.stringify(config.jsonLd);
  }
}
