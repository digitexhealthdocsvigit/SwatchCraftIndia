import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import TrustBar from './components/TrustBar.tsx';
import ValueProps from './components/ValueProps.tsx';
import FeaturedProducts from './components/FeaturedProducts.tsx';
import ProcessTimeline from './components/ProcessTimeline.tsx';
import ExportMarkets from './components/ExportMarkets.tsx';
import Gallery from './components/Gallery.tsx';
import Testimonials from './components/Testimonials.tsx';
import QualityCertifications from './components/QualityCertifications.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import AboutPage from './components/AboutPage.tsx';
import ProductsOverview from './components/ProductsOverview.tsx';
import ManufacturingProcessPage from './components/ManufacturingProcessPage.tsx';
import ProductUpholstery from './components/ProductUpholstery.tsx';
import ProductCurtain from './components/ProductCurtain.tsx';
import ProductHanger from './components/ProductHanger.tsx';
import ProductRingSwatch from './components/ProductRingSwatch.tsx';
import ProductSampleCards from './components/ProductSampleCards.tsx';
import ProductWaterfall from './components/ProductWaterfall.tsx';
import ExportMarketsPage from './components/ExportMarketsPage.tsx';
import BlogHub from './components/BlogHub.tsx';
import BlogPost from './components/BlogPost.tsx';
import PortfolioPage from './components/PortfolioPage.tsx';
import LegalPage from './components/LegalPage.tsx';
import PricingPage from './components/PricingPage.tsx';
import GoogleBusinessProfile from './components/GoogleBusinessProfile.tsx';
import OutreachTemplates from './components/OutreachTemplates.tsx';
import LeadCaptureModal from './components/LeadCaptureModal.tsx';
import NotFound from './components/NotFound.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import WhatsAppFloatingCTA from './components/WhatsAppFloatingCTA.tsx';

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
  | 'product-waterfall'
  | 'export-markets-page'
  | 'blog-hub'
  | 'blog-post-1'
  | 'blog-post-2'
  | 'blog-post-3'
  | 'blog-post-4'
  | 'portfolio'
  | 'privacy'
  | 'terms'
  | 'pricing'
  | 'gbp-strategy'
  | 'outreach-templates'
  | 'not-found'
  | 'admin-login'
  | 'admin-dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [activeAsset, setActiveAsset] = useState('Catalogue');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('swatchcraft_admin_session') === 'true';
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const navigateTo = (view: ViewState) => {
    if (view === 'admin-dashboard' && !isAuthenticated) {
      setCurrentView('admin-login');
    } else {
      setCurrentView(view);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('swatchcraft_admin_session', 'true');
    setCurrentView('admin-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('swatchcraft_admin_session');
    setCurrentView('home');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home': return (
        <>
          <Hero onNavigate={navigateTo} />
          <TrustBar />
          <div id="process"><ValueProps /><ProcessTimeline /></div>
          
          {/* SEO Content Section for Word Count Compliance (300+ Words) */}
          <section className="py-24 px-4 bg-white border-y border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black text-[#1e3a5f] mb-8 uppercase tracking-tighter">
                Global Leaders in Fabric Swatch Manufacturing
              </h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed font-medium space-y-6">
                <p>
                  SwatchCraft India stands as Mumbai's most trusted partner for fabric presentation solutions. Since 1994, we have dedicated our craft to producing the highest quality upholstery and curtain fabric swatch books for the international B2B market. Our specialized facility in Andheri East, Mumbai, integrates advanced automated cutting technology with time-honored bookbinding techniques to ensure every sample set we produce meets stringent global quality standards.
                </p>
                <p>
                  As a certified ISO 9001:2015 manufacturer, we understand the complexities of the textile export industry. We provide end-to-end support for fabric brands, including technical consultation on binding mechanisms, custom branding through foil stamping and embossing, and complete export logistics. Our standard 21-day express production timeline ensures that your sales teams in Europe, North America, and the Middle East receive their collection updates without the lengthy delays common with other international suppliers.
                </p>
                <p>
                  From large-format curtain albums that showcase the full elegance of a drape to compact waterfall swatch cards optimized for air-freight efficiency, SwatchCraft India offers a diverse range of products. Each is designed to be a durable, professional tool that helps furniture manufacturers and wholesalers close sales faster. Our white-label services allow you to maintain full brand consistency across your entire global distribution network.
                </p>
                <p>
                  Our commitment to zero-defect quality control means every book is manually inspected before dispatch. Whether you need a small batch of 50 luxury hardbound albums for a boutique collection or 5,000 waterfall cards for a national marketing campaign, our Mumbai facility delivers consistent excellence with transparent pricing and real-time tracking for every shipment.
                </p>
                <div className="pt-6">
                  <button onClick={() => navigateTo('about')} className="text-[#0d7377] font-black uppercase tracking-widest text-[11px] border-b-2 border-[#0d7377] pb-1 hover:text-[#8B6F47] hover:border-[#8B6F47] transition-all">
                    Discover Our Manufacturing Heritage →
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div id="products"><FeaturedProducts onNavigate={navigateTo} /></div>
          <QualityCertifications />
          <div id="export-markets" onClick={() => navigateTo('export-markets-page')} className="cursor-pointer"><ExportMarkets /></div>
          <div id="gallery" onClick={() => navigateTo('portfolio')} className="cursor-pointer"><Gallery /></div>
          <Testimonials />
          <div id="contact"><Contact /></div>
        </>
      );
      case 'about': return <AboutPage onNavigate={navigateTo} />;
      case 'products-overview': return <ProductsOverview onNavigate={navigateTo} />;
      case 'process-detail': return <ManufacturingProcessPage onNavigate={navigateTo} />;
      case 'product-upholstery': return <ProductUpholstery onNavigate={navigateTo} onDownload={(a) => { setActiveAsset(a); setIsLeadModalOpen(true); }} />;
      case 'product-curtain': return <ProductCurtain onNavigate={navigateTo} onDownload={(a) => { setActiveAsset(a); setIsLeadModalOpen(true); }} />;
      case 'product-hanger': return <ProductHanger onNavigate={navigateTo} onDownload={(a) => { setActiveAsset(a); setIsLeadModalOpen(true); }} />;
      case 'product-ring': return <ProductRingSwatch onNavigate={navigateTo} onDownload={(a) => { setActiveAsset(a); setIsLeadModalOpen(true); }} />;
      case 'product-cards': return <ProductSampleCards onNavigate={navigateTo} onDownload={(a) => { setActiveAsset(a); setIsLeadModalOpen(true); }} />;
      case 'product-waterfall': return <ProductWaterfall onNavigate={navigateTo} onDownload={(a) => { setActiveAsset(a); setIsLeadModalOpen(true); }} />;
      case 'export-markets-page': return <ExportMarketsPage onNavigate={navigateTo} />;
      case 'blog-hub': return <BlogHub onNavigate={navigateTo} />;
      case 'blog-post-1': return <BlogPost postId={1} onNavigate={navigateTo} />;
      case 'blog-post-2': return <BlogPost postId={2} onNavigate={navigateTo} />;
      case 'blog-post-3': return <BlogPost postId={3} onNavigate={navigateTo} />;
      case 'blog-post-4': return <BlogPost postId={4} onNavigate={navigateTo} />;
      case 'portfolio': return <PortfolioPage onNavigate={navigateTo} />;
      case 'privacy': return <LegalPage type="privacy" onNavigate={navigateTo} />;
      case 'terms': return <LegalPage type="terms" onNavigate={navigateTo} />;
      case 'pricing': return <PricingPage onNavigate={navigateTo} onDownload={(a) => { setActiveAsset(a); setIsLeadModalOpen(true); }} />;
      case 'gbp-strategy': return <GoogleBusinessProfile onNavigate={navigateTo} />;
      case 'outreach-templates': return <OutreachTemplates onNavigate={navigateTo} />;
      case 'admin-login': return <AdminLogin onLogin={handleLoginSuccess} onNavigate={navigateTo} />;
      case 'admin-dashboard': return <AdminDashboard onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'contact-page': return <div className="pt-20"><Contact /></div>;
      case 'not-found': return <NotFound onNavigate={navigateTo} />;
      default: return <NotFound onNavigate={navigateTo} />;
    }
  };

  const isAdminView = ['admin-login', 'admin-dashboard'].includes(currentView);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isAdminView && <Header onNavigate={navigateTo} currentView={currentView} />}
      <main className="flex-grow">{renderContent()}</main>
      {!isAdminView && <Footer onNavigate={navigateTo} />}
      
      <LeadCaptureModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
        assetName={activeAsset} 
      />

      {/* Sticky High-Converting Floating WhatsApp CTA Engine */}
      <WhatsAppFloatingCTA phoneNumber="919004962871" />
    </div>
  );
};

export default App;
