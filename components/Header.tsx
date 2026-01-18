import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../App.tsx';
import { useGlobalSettings, Currency } from './GlobalSettingsContext.tsx';
import { ChevronDown, Box, Layout, Ruler, Scissors, ClipboardList, Menu, X, Plus, Minus } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const { currency, setCurrency } = useGlobalSettings();
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDesktopProductsOpen(false);
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
    { name: 'Sample Cards & Storyboards', id: 'product-cards', icon: <ClipboardList className="w-4 h-4" /> }
  ];

  const handleNav = (id: string) => {
    onNavigate(id as ViewState);
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
    setDesktopProductsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex flex-col cursor-pointer shrink-0" onClick={() => handleNav('home')}>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-[#1e3a5f]">
            SwatchCraft <span className="text-[#d4a574]">India</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">Premium Sample Manufacturing</span>
        </div>

        <nav className="hidden lg:block flex-grow">
          <ul className="flex items-center justify-center space-x-1 xl:space-x-2">
            <li>
              <button 
                onClick={() => handleNav('home')}
                className={`px-3 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors ${currentView === 'home' ? 'text-[#0d7377]' : 'text-[#1e3a5f] hover:text-[#0d7377]'}`}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNav('about')}
                className={`px-3 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors ${currentView === 'about' ? 'text-[#0d7377]' : 'text-[#1e3a5f] hover:text-[#0d7377]'}`}
              >
                About
              </button>
            </li>

            <li 
              ref={dropdownRef}
              className="relative group"
              onMouseEnter={() => setDesktopProductsOpen(true)}
              onMouseLeave={() => setDesktopProductsOpen(false)}
            >
              <button 
                className={`px-3 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1 ${
                  currentView.startsWith('product-') ? 'text-[#0d7377]' : 'text-[#1e3a5f] hover:text-[#0d7377]'
                }`}
              >
                Products <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${desktopProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`absolute top-full left-0 w-72 bg-white shadow-2xl rounded-xl border border-gray-100 py-4 transition-all duration-200 origin-top ${
                  desktopProductsOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                }`}
              >
                {productLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`w-full text-left px-6 py-3 text-[12px] font-bold uppercase tracking-widest flex items-center gap-3 transition-all ${
                      currentView === link.id ? 'bg-[#0d7377] text-white' : 'text-[#1e3a5f] hover:bg-gray-50 hover:text-[#0d7377]'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </li>

            <li>
              <button onClick={() => handleNav('process-detail')} className={`px-3 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors ${currentView === 'process-detail' ? 'text-[#0d7377]' : 'text-[#1e3a5f] hover:text-[#0d7377]'}`}>Manufacturing Process</button>
            </li>
            <li>
              <button onClick={() => handleNav('export-markets-page')} className={`px-3 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors ${currentView === 'export-markets-page' ? 'text-[#0d7377]' : 'text-[#1e3a5f] hover:text-[#0d7377]'}`}>Export Markets</button>
            </li>
            <li>
              <button onClick={() => handleNav('portfolio')} className={`px-3 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors ${currentView === 'portfolio' ? 'text-[#0d7377]' : 'text-[#1e3a5f] hover:text-[#0d7377]'}`}>Gallery</button>
            </li>
            <li>
              <button onClick={() => handleNav('contact-page')} className={`px-3 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors ${currentView === 'contact-page' ? 'text-[#0d7377]' : 'text-[#1e3a5f] hover:text-[#0d7377]'}`}>Contact</button>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 xl:gap-4 shrink-0">
          <a 
            href="https://wa.me/919004962871" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden md:flex bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest py-3 px-5 rounded-xl hover:opacity-90 transition-all shadow-md items-center gap-2"
          >
            WhatsApp Quote
          </a>
          <button 
            onClick={() => handleNav('contact-page')} 
            className="hidden sm:flex bg-[#0d7377] text-white text-[10px] font-black uppercase tracking-widest py-3 px-5 rounded-xl hover:bg-[#1e3a5f] transition-all shadow-md"
          >
            Email RFQ
          </button>
          
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[#1e3a5f] p-2">
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full w-full shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="p-6 space-y-2">
            {['home', 'about'].map(id => (
               <button key={id} onClick={() => handleNav(id)} className="block w-full text-left py-4 text-[14px] font-bold uppercase tracking-widest border-b border-gray-50 text-[#1e3a5f]">{id}</button>
            ))}
            <div className="border-b border-gray-50">
               <button onClick={() => setMobileProductsOpen(!mobileProductsOpen)} className="flex items-center justify-between w-full text-left py-4 text-[14px] font-bold uppercase tracking-widest text-[#1e3a5f]">
                 Products {mobileProductsOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
               </button>
               {mobileProductsOpen && (
                 <div className="pl-6 pb-4 space-y-4 pt-2">
                   {productLinks.map((link) => (
                     <button key={link.id} onClick={() => handleNav(link.id)} className={`flex items-center gap-3 w-full text-left text-[13px] font-bold uppercase tracking-widest ${currentView === link.id ? 'text-[#0d7377]' : 'text-gray-500'}`}>{link.name}</button>
                   ))}
                 </div>
               )}
            </div>
            <button onClick={() => handleNav('process-detail')} className="block w-full text-left py-4 text-[14px] font-bold uppercase tracking-widest border-b border-gray-50 text-[#1e3a5f]">Manufacturing Process</button>
            <button onClick={() => handleNav('export-markets-page')} className="block w-full text-left py-4 text-[14px] font-bold uppercase tracking-widest border-b border-gray-50 text-[#1e3a5f]">Export Markets</button>
            <button onClick={() => handleNav('portfolio')} className="block w-full text-left py-4 text-[14px] font-bold uppercase tracking-widest border-b border-gray-50 text-[#1e3a5f]">Gallery</button>
            <button onClick={() => handleNav('contact-page')} className="block w-full text-left py-4 text-[14px] font-bold uppercase tracking-widest border-b border-gray-50 text-[#1e3a5f]">Contact</button>
            <div className="pt-8 flex flex-col space-y-4">
              <a href="https://wa.me/919004962871" className="bg-[#25D366] text-white text-center font-black py-5 rounded-2xl text-[10px] uppercase tracking-widest">WhatsApp Quote</a>
              <button onClick={() => handleNav('contact-page')} className="bg-[#0d7377] text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-widest">Email RFQ Now</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;