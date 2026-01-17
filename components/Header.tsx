import React, { useState, useEffect } from 'react';
import { ViewState } from '../App';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', id: 'home', type: 'view' },
    { name: 'About Us', id: 'about', type: 'view' },
    { name: 'Products', id: 'products-overview', type: 'view' },
    { name: 'Manufacturing', id: 'process-detail', type: 'view' },
    { name: 'Gallery', id: 'gallery', type: 'section' },
    { name: 'Contact', id: 'contact-page', type: 'view' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col cursor-pointer" onClick={() => onNavigate('home')}>
          <span className={`text-xl md:text-2xl font-bold tracking-tight text-[#1a2849]`}>
            SwatchCraft <span className="text-[#d4a574]">India</span>
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500">Premium Sample Manufacturing</span>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.type === 'view') onNavigate(item.id as ViewState);
                else scrollToSection(item.id);
              }}
              className={`text-sm font-semibold transition-colors ${
                (currentView === item.id) ? 'text-[#d4a574]' : 'text-[#1a2849] hover:text-[#d4a574]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center space-x-3">
          <a 
            href="https://wa.me/910000000000" 
            className="hidden sm:flex bg-[#25D366] text-white text-xs font-bold py-2 px-4 rounded hover:opacity-90 transition-all shadow-sm"
          >
            WhatsApp Quote
          </a>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#1a2849] p-2 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full w-full shadow-xl">
          <div className="p-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.type === 'view') onNavigate(item.id as ViewState);
                  else scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-lg font-medium border-b border-gray-50 ${
                  currentView === item.id ? 'text-[#d4a574]' : 'text-[#1a2849]'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <a href="https://wa.me/910000000000" className="bg-[#25D366] text-white text-center font-bold py-3 rounded">WhatsApp Us</a>
              <a href="mailto:info@swatchcraftindia.com" className="bg-[#0d7377] text-white text-center font-bold py-3 rounded">Email RFQ</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;