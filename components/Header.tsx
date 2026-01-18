import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../App.tsx';
import { useGlobalSettings, Currency, Language } from './GlobalSettingsContext.tsx';
import { ChevronDown, Box, Layout, Layers, Ruler, Scissors, ClipboardList, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currency, setCurrency, language, setLanguage } = useGlobalSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productLinks = [
    { name: 'Upholstery Swatch Books', id: 'product-upholstery', icon: <Box className="w-4 h-4" /> },
    { name: 'Curtain Fabric Albums', id: 'product-curtain', icon: <Layout className="w-4 h-4" /> },
    { name: 'Fabric Hanger Swatches', id: 'product-hanger', icon: <Ruler className="w-4 h-4" /> },
    { name: 'Ring Swatch Sample Sets', id: 'product-ring', icon: <Scissors className="w-4 h-4" /> },
    { name: 'Sample Cards & Storyboards', id: 'product-cards', icon: <ClipboardList className="w-4 h-4" /> },
    { name: 'Waterfall Swatch Cards', id: 'product-waterfall', icon: <Layers className="w-4 h-4" /> },
  ];

  const mainNavItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
  ];

  const secondaryNavItems = [
    { name: 'Process', id: 'process-detail' },
    { name: 'Export', id: 'export-markets-page' },
    { name: 'Gallery', id: 'portfolio' },
    { name: 'Contact', id: 'contact-page' }
  ];

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setProductsOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex flex-col cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1a2849]">
            SwatchCraft <span className="text-[#d4a574]">India</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-gray-500">Premium Sample Manufacturing</span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center space-x-6 flex-grow justify-center">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as ViewState)}
              className={`text-xs font-bold uppercase tracking-widest transition-colors px-2 py-1 ${
                currentView === item.id ? 'text-[#d4a574]' : 'text-[#1a2849] hover:text-[#d4a574]'
              }`}
            >
              {item.name}
            </button>
          ))}

          {/* PRODUCTS DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            ref={dropdownRef}
          >
            <button
              aria-haspopup="true"
              aria-expanded={productsOpen}
              className={`text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1 px-2 py-1 ${
                currentView.startsWith('product-') ? 'text-[#d4a574]' : 'text-[#1a2849] hover:text-[#d4a574]'
              }`}
            >
              Products <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {productsOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-2xl rounded-2xl border border-gray-100 py-4 animate-fadeIn overflow-hidden">
                {productLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id as ViewState)}
                    className={`w-full text-left px-6 py-3 text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 transition-all ${
                      currentView === link.id ? 'bg-[#0d7377] text-white' : 'text-[#1a2849] hover:bg-gray-50 hover:text-[#d4a574]'
                    }`}
                  >
                    <span className={currentView === link.id ? 'text-white' : 'text-[#0d7377]'}>{link.icon}</span>
                    {link.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {secondaryNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as ViewState)}
              className={`text-xs font-bold uppercase tracking-widest transition-colors px-2 py-1 ${
                currentView === item.id ? 'text-[#d4a574]' : 'text-[#1a2849] hover:text-[#d4a574]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* CTA & SETTINGS */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="hidden xl:flex items-center bg-gray-100/50 p-1 rounded-lg border border-gray-200">
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent text-[10px] font-black text-navy px-2 py-1 outline-none appearance-none cursor-pointer hover:text-gold"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="AED">AED</option>
            </select>
          </div>

          <a href="https://wa.me/919004962871" target="_blank" rel="noopener noreferrer" className="hidden sm:flex bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest py-2.5 px-5 rounded-lg hover:opacity-90 transition-all shadow-sm">
            WhatsApp Quote
          </a>
          <button 
            onClick={() => handleNavClick('contact-page')} 
            className="hidden sm:flex bg-[#0d7377] text-white text-[10px] font-black uppercase tracking-widest py-2.5 px-5 rounded-lg hover:opacity-90 transition-all shadow-sm"
          >
            Email RFQ
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-[#1a2849] p-2"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full w-full shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="p-6 space-y-2">
            {mainNavItems.map(item => (
              <button key={item.id} onClick={() => handleNavClick(item.id as ViewState)} className={`block w-full text-left py-4 text-sm font-bold uppercase tracking-widest border-b border-gray-50 ${currentView === item.id ? 'text-[#d4a574]' : 'text-[#1a2849]'}`}>{item.name}</button>
            ))}
            
            {/* Mobile Products Submenu */}
            <div className="border-b border-gray-50">
               <button 
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center justify-between w-full text-left py-4 text-sm font-bold uppercase tracking-widest text-[#1a2849]"
               >
                 Products <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`} />
               </button>
               {productsOpen && (
                 <div className="pl-4 pb-4 space-y-4 pt-2">
                   {productLinks.map((link) => (
                     <button 
                       key={link.id} 
                       onClick={() => handleNavClick(link.id as ViewState)} 
                       className={`flex items-center gap-3 w-full text-left text-xs font-bold uppercase tracking-widest ${currentView === link.id ? 'text-[#0d7377]' : 'text-gray-500'}`}
                     >
                       <span className="shrink-0">{link.icon}</span>
                       {link.name}
                     </button>
                   ))}
                 </div>
               )}
            </div>

            {secondaryNavItems.map((item) => (
              <button key={item.id} onClick={() => handleNavClick(item.id as ViewState)} className={`block w-full text-left py-4 text-sm font-bold uppercase tracking-widest border-b border-gray-50 ${currentView === item.id ? 'text-[#d4a574]' : 'text-[#1a2849]'}`}>{item.name}</button>
            ))}
            
            <div className="pt-6 flex flex-col space-y-3">
              <a href="https://wa.me/919004962871" className="bg-[#25D366] text-white text-center font-bold py-4 rounded-xl text-xs uppercase tracking-widest">WhatsApp Quote</a>
              <button onClick={() => handleNavClick('contact-page')} className="bg-[#0d7377] text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest">Email RFQ</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;