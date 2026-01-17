import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ValueProps from './components/ValueProps';
import FeaturedProducts from './components/FeaturedProducts';
import ProcessTimeline from './components/ProcessTimeline';
import ExportMarkets from './components/ExportMarkets';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import QualityCertifications from './components/QualityCertifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ProductsOverview from './components/ProductsOverview';
import ManufacturingProcessPage from './components/ManufacturingProcessPage';
import ProductUpholstery from './components/ProductUpholstery';
import ProductCurtain from './components/ProductCurtain';
import ProductHanger from './components/ProductHanger';
import ProductRingSwatch from './components/ProductRingSwatch';
import ProductSampleCards from './components/ProductSampleCards';
import ExportMarketsPage from './components/ExportMarketsPage';
import BlogHub from './components/BlogHub';
import BlogPost from './components/BlogPost';
import PortfolioPage from './components/PortfolioPage';
import LegalPage from './components/LegalPage';
import PricingPage from './components/PricingPage';

export type ViewState = 
  | 'home' 
  | 'about' 
  | 'products-overview' 
  | 'process-detail' 
  | 'contact-page' 
  | 'product-upholstery' 
  | 'product-curtain'
  | 'product-hanger'
  | 'product-ring'
  | 'product-cards'
  | 'export-markets-page'
  | 'blog-hub'
  | 'blog-post'
  | 'portfolio'
  | 'privacy'
  | 'terms'
  | 'pricing';

const SEO_CONFIG: Record<ViewState, { title: string; description: string; h1: string }> = {
  'home': {
    title: "Fabric Swatch Book Manufacturer India | SwatchCraft",
    description: "Indian manufacturer of premium upholstery & curtain fabric swatch books for global textile brands. Export-ready, 21-28 day delivery. MOQ 50 books.",
    h1: "Custom Upholstery & Curtain Swatch Books for Global Textile Brands"
  },
  'about': {
    title: "About SwatchCraft India | 30+ Years Fabric Swatch Expertise",
    description: "Established in 1994, SwatchCraft is Mumbai's leading fabric swatch book manufacturer. ISO 9001 certified, exporting to 15+ countries. 30+ years expertise.",
    h1: "30+ Years of Fabric Presentation Excellence"
  },
  'products-overview': {
    title: "Fabric Presentation Solutions | Compare Swatch Books | SwatchCraft",
    description: "Explore our full range of swatch books, hangers, and ring sets. Compare MOQ and lead times for global upholstery and curtain brands.",
    h1: "Our Complete Product Range"
  },
  'process-detail': {
    title: "Our Manufacturing Process | Quality Swatch Books | SwatchCraft",
    description: "5-step fabric swatch book manufacturing: RFQ to export dispatch. ISO 9001 quality control. 21-28 day production. Complete transparency. Mumbai, India facility.",
    h1: "Our Proven Manufacturing Process"
  },
  'contact-page': {
    title: "Contact SwatchCraft India | Get Custom Swatch Book Quote",
    description: "Request a custom quote for fabric swatch books, curtain albums, or hanger displays. 24-hour response time. WhatsApp: +91-XXXXXX. Mumbai, Maharashtra, India.",
    h1: "Get Your Custom Quote in 24 Hours"
  },
  'product-upholstery': {
    title: "Upholstery Swatch Books | MOQ 50 | 21-28 Day Delivery India",
    description: "Hardbound & ring-bound upholstery swatch books for furniture brands. 20-60 fabric capacity. Custom branding. MOQ 50 books. Export to Europe, USA, UAE. ₹70-100/pc.",
    h1: "Premium Upholstery Swatch Books"
  },
  'product-curtain': {
    title: "Curtain Fabric Albums | Large Format | A3+ Size | SwatchCraft",
    description: "Large-format curtain fabric albums for window treatment brands. A3/A3+ size, 30-50 swatches. Detachable pages. MOQ 40 albums. Export quality. ₹100-120/piece.",
    h1: "Curtain Fabric Albums - Large Format Presentation"
  },
  'product-hanger': {
    title: "Fabric Hanger Swatches | Showroom Display | SwatchCraft",
    description: "Metal & wooden fabric hanger swatches for showroom walls. Chrome, matte black, natural wood. Branded headers. MOQ 100 hangers. Perfect for retail display.",
    h1: "Fabric Hanger Swatches - Professional Showroom Display"
  },
  'product-ring': {
    title: "Ring Swatch Sets | Portable Fabric Kits | SwatchCraft India",
    description: "Compact ring-bound fabric swatch sets for sales teams. 20-40 swatches. Metal ring binding. Fits in briefcase. MOQ 75 sets. Perfect for trade shows. ₹20-25/set.",
    h1: "Ring Swatch Sample Sets - Portable Fabric Presentation Kits"
  },
  'product-cards': {
    title: "Fabric Sample Cards & Storyboards | Marketing | SwatchCraft",
    description: "Marketing fabric sample cards with 3-8 swatches. Color stories, storyboards, lookbooks. Perfect for mailings, trade shows, buyer presentations. MOQ 200 cards.",
    h1: "Sample Cards & Fabric Storyboards - Collection Marketing Materials"
  },
  'export-markets-page': {
    title: "Export Fabric Swatch Books | India to EU/USA/UAE | SwatchCraft",
    description: "Export fabric swatch books from India to Europe, USA, UAE. Complete documentation. 15-35 day delivery. FOB/CIF terms. Serving 15+ countries since 2005. Mumbai.",
    h1: "Exporting Quality Fabric Presentations Since 2005"
  },
  'blog-hub': {
    title: "Blog & Resources | Fabric Swatch Guides | SwatchCraft",
    description: "Expert guides on fabric swatch books, upholstery sampling, curtain presentations. Tips for furniture brands, textile exporters, interior designers. Free resources.",
    h1: "Fabric Presentation Guides & Resources"
  },
  'blog-post': {
    title: "How to Choose Upholstery Swatch Books | Complete Guide 2025",
    description: "Complete guide to choosing upholstery swatch books: binding types, capacity, customization, MOQ. For furniture manufacturers & textile brands. Expert tips.",
    h1: "How to Choose the Right Upholstery Swatch Books for Your Fabric Collection"
  },
  'portfolio': {
    title: "Portfolio & Gallery | Past Projects | SwatchCraft India",
    description: "View our portfolio of fabric swatch books, curtain albums, hanger displays. 500+ collections manufactured. Client work from India, Europe, USA. Quality showcase.",
    h1: "Our Portfolio: 500+ Collections Manufactured"
  },
  'privacy': {
    title: "Privacy Policy | SwatchCraft India Fabric Samples",
    description: "SwatchCraft India privacy policy. How we collect, use, and protect customer information. GDPR compliant. Data security for B2B inquiries.",
    h1: "Privacy Policy"
  },
  'terms': {
    title: "Terms of Service | SwatchCraft India Manufacturing",
    description: "SwatchCraft India terms of service. MOQ policies, lead times, payment terms, shipping, returns. B2B fabric swatch book manufacturing terms.",
    h1: "Terms of Service"
  },
  'pricing': {
    title: "Pricing Guide | Fabric Swatch Book Costs | SwatchCraft",
    description: "Transparent pricing for fabric swatch books. Upholstery: ₹70-100/pc. Curtain albums: ₹100-140/pc. Volume discounts. Sample orders available. Request custom quote.",
    h1: "Transparent Volume Pricing"
  }
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  useEffect(() => {
    // Dynamic Title and Meta Update
    const config = SEO_CONFIG[currentView];
    if (config) {
      document.title = config.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', config.description);
      }
    }

    // Advanced Dynamic Schema Injection
    const existingSchemas = document.querySelectorAll('.dynamic-schema');
    existingSchemas.forEach(s => s.remove());

    const schemas: any[] = [];

    // 1. LocalBusiness Schema (Always present for About/Contact)
    if (['about', 'contact-page', 'home'].includes(currentView)) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "SwatchCraft India",
        "@id": "https://swatchcraftindia.com",
        "url": "https://swatchcraftindia.com",
        "telephone": "+91-XXXXXXXXXX",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Unit 4A, Textile Hub, Sector 12, Andheri East",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400069",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.0760",
          "longitude": "72.8777"
        }
      });
    }

    // 2. FAQ Schema for Home
    if (currentView === 'home') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the minimum order quantity (MOQ)?",
            "acceptedAnswer": { "@type": "Answer", "text": "50 pieces for upholstery swatch books and 40 pieces for curtain albums." }
          },
          {
            "@type": "Question",
            "name": "How long does production take?",
            "acceptedAnswer": { "@type": "Answer", "text": "Standard production timeline is 21-28 days after fabric receipt." }
          }
        ]
      });
    }

    // 3. Product Schema for Specific Pages
    if (currentView === 'product-upholstery') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Premium Upholstery Swatch Books",
        "description": "Hardbound and ring-bound upholstery fabric swatch books for furniture manufacturers. MOQ 50 books.",
        "brand": { "@type": "Brand", "name": "SwatchCraft India" },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "70",
          "highPrice": "100"
        }
      });
    }

    // 4. Breadcrumb Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://swatchcraftindia.com" },
        { "@type": "ListItem", "position": 2, "name": currentView.replace('-', ' '), "item": `https://swatchcraftindia.com/${currentView}` }
      ]
    });

    schemas.forEach(s => {
      const script = document.createElement('script');
      script.className = 'dynamic-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(s);
      document.head.appendChild(script);
    });

  }, [currentView]);

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'products-overview':
        return <ProductsOverview onNavigate={navigateTo} />;
      case 'process-detail':
        return <ManufacturingProcessPage onNavigate={navigateTo} />;
      case 'product-upholstery':
        return <ProductUpholstery onNavigate={navigateTo} />;
      case 'product-curtain':
        return <ProductCurtain onNavigate={navigateTo} />;
      case 'product-hanger':
        return <ProductHanger onNavigate={navigateTo} />;
      case 'product-ring':
        return <ProductRingSwatch onNavigate={navigateTo} />;
      case 'product-cards':
        return <ProductSampleCards onNavigate={navigateTo} />;
      case 'export-markets-page':
        return <ExportMarketsPage onNavigate={navigateTo} />;
      case 'blog-hub':
        return <BlogHub onNavigate={navigateTo} />;
      case 'blog-post':
        return <BlogPost onNavigate={navigateTo} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={navigateTo} />;
      case 'privacy':
        return <LegalPage type="privacy" onNavigate={navigateTo} />;
      case 'terms':
        return <LegalPage type="terms" onNavigate={navigateTo} />;
      case 'pricing':
        return <PricingPage onNavigate={navigateTo} />;
      case 'contact-page':
        return <div className="pt-20"><Contact /></div>;
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={navigateTo} />
            <TrustBar />
            <div id="process">
                <ValueProps />
                <ProcessTimeline />
            </div>
            <div id="products">
                <FeaturedProducts onNavigate={navigateTo} />
            </div>
            <QualityCertifications />
            <div id="export-markets" onClick={() => navigateTo('export-markets-page')} className="cursor-pointer">
                <ExportMarkets />
            </div>
            <div id="gallery" onClick={() => navigateTo('portfolio')} className="cursor-pointer">
                <Gallery />
            </div>
            <Testimonials />
            <div id="contact">
                <Contact />
            </div>
            <section className="bg-[#1e3a5f] py-20 px-4">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                  Ready to Create Premium Fabric Presentations?
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button onClick={() => navigateTo('contact-page')} className="bg-white text-[#0d7377] font-bold py-4 px-12 rounded-xl hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center">
                    <span className="mr-2">📧</span> Email Your RFQ
                  </button>
                  <a href="https://wa.me/910000000000" className="bg-[#25D366] text-white font-bold py-4 px-12 rounded-xl hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center">
                    <span className="mr-2">💬</span> WhatsApp Us Now
                  </a>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header onNavigate={navigateTo} currentView={currentView} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onNavigate={navigateTo} />
      <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center" aria-label="Contact on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.041-.54c1.017.544 2.021.829 3.269.831 3.177 0 5.765-2.587 5.765-5.766 0-3.18-2.587-5.794-5.787-5.794zm3.976 8.167c-.145.407-.847.742-1.18.809-.323.066-.747.109-1.18-.066-.313-.128-.703-.281-1.213-.501-2.144-.925-3.516-3.056-3.623-3.203-.107-.145-.88-1.164-.88-2.227 0-1.064.534-1.586.747-1.802.213-.218.467-.272.623-.272.156 0 .311.014.444.02.145.007.339-.053.53.408.197.479.663 1.612.721 1.725.058.114.098.246.02.408-.078.162-.117.262-.234.397-.117.133-.247.298-.351.4-.114.112-.234.234-.103.459.131.225.58 1.016 1.246 1.611.854.757 1.574.991 1.795 1.101.221.11.351.093.481-.062.13-.156.559-.65.707-.872.148-.223.296-.187.498-.112.202.075 1.282.604 1.503.716.221.112.369.167.424.262.054.095.054.551-.114.958z"/></svg>
      </a>
    </div>
  );
};

export default App;