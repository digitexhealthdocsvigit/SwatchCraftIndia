import React, { useState } from 'react';
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
  | 'export-markets-page';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

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
      case 'contact-page':
        return (
          <div className="pt-20">
            <Contact />
          </div>
        );
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
            <div id="gallery">
                <Gallery />
            </div>
            <Testimonials />
            <div id="contact">
                <Contact />
            </div>
            
            {/* Final CTA Section */}
            <section className="bg-[#1e3a5f] py-20 px-4">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                  Ready to Create Premium Fabric Presentations?
                </h2>
                <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                  Get a detailed quote customized for your swatch book requirements and target market.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button 
                    onClick={() => navigateTo('contact-page')}
                    className="bg-white text-[#0d7377] font-bold py-4 px-12 rounded-xl transition-all shadow-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    <span className="mr-2">📧</span> Email Your RFQ
                  </button>
                  <a 
                    href="https://wa.me/910000000000" 
                    className="bg-[#25D366] hover:bg-opacity-90 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg flex items-center justify-center"
                  >
                    <span className="mr-2">💬</span> WhatsApp Us Now
                  </a>
                </div>
                <p className="text-gray-400 text-xs mt-8 font-medium uppercase tracking-widest">
                  Typical response time: 12-24 hours | Free consultation for export orders
                </p>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header onNavigate={navigateTo} currentView={currentView} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/910000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.041-.54c1.017.544 2.021.829 3.269.831 3.177 0 5.765-2.587 5.765-5.766 0-3.18-2.587-5.794-5.787-5.794zm3.976 8.167c-.145.407-.847.742-1.18.809-.323.066-.747.109-1.18-.066-.313-.128-.703-.281-1.213-.501-2.144-.925-3.516-3.056-3.623-3.203-.107-.145-.88-1.164-.88-2.227 0-1.064.534-1.586.747-1.802.213-.218.467-.272.623-.272.156 0 .311.014.444.02.145.007.339-.053.53.408.197.479.663 1.612.721 1.725.058.114.098.246.02.408-.078.162-.117.262-.234.397-.117.133-.247.298-.351.4-.114.112-.234.234-.103.459.131.225.58 1.016 1.246 1.611.854.757 1.574.991 1.795 1.101.221.11.351.093.481-.062.13-.156.559-.65.707-.872.148-.223.296-.187.498-.112.202.075 1.282.604 1.503.716.221.112.369.167.424.262.054.095.054.551-.114.958z"/>
        </svg>
      </a>
    </div>
  );
};

export default App;