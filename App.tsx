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
import ProductWaterfall from './components/ProductWaterfall';
import ExportMarketsPage from './components/ExportMarketsPage';
import BlogHub from './components/BlogHub';
import BlogPost from './components/BlogPost';
import PortfolioPage from './components/PortfolioPage';
import LegalPage from './components/LegalPage';
import PricingPage from './components/PricingPage';
import GoogleBusinessProfile from './components/GoogleBusinessProfile';
import OutreachTemplates from './components/OutreachTemplates';
import LeadCaptureModal from './components/LeadCaptureModal';
import NotFound from './components/NotFound';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    setCurrentView('admin-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home': return (
        <>
          <Hero onNavigate={navigateTo} />
          <TrustBar />
          <div id="process"><ValueProps /><ProcessTimeline /></div>
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
      default: return <NotFound onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!['admin-login', 'admin-dashboard'].includes(currentView) && <Header onNavigate={navigateTo} currentView={currentView} />}
      <main className="flex-grow">{renderContent()}</main>
      {!['admin-login', 'admin-dashboard'].includes(currentView) && <Footer onNavigate={navigateTo} />}
      
      <LeadCaptureModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
        assetName={activeAsset} 
      />

      <a href="https://wa.me/919004962871" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform" aria-label="Contact on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.041-.54c1.017.544 2.021.829 3.269.831 3.177 0 5.765-2.587 5.765-5.766 0-3.18-2.587-5.794-5.794zm3.976 8.167c-.145.407-.847.742-1.18.809-.323.066-.747.109-1.18-.066-.313-.128-.703-.281-1.213-.501-2.144-.925-3.516-3.056-3.623-3.203-.107-.145-.88-1.164-.88-2.227 0-1.064.534-1.586.747-1.802.213-.218.467-.272.623-.272.156 0 .311.014.444.02.145.007.339-.053.53.408.197.479.663 1.612.721 1.725.058.114.098.246.02.408-.078.162-.117.262-.234.397-.117.133-.247.298-.351.4-.114.112-.234.234-.103.459.131.225.5 1.016 1.246 1.611.854.757 1.574.991 1.795 1.101.221.11.351.093.481-.062.13-.156.559-.65.707-.872.148-.223.296-.187.498-.112.202.075 1.282.604 1.503.716.221.112.369.167.424.262.054.095.054.551-.114.958z"/></svg>
      </a>
    </div>
  );
};

export default App;