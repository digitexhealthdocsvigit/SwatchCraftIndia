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

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Products', id: 'products-overview' },
    { name: 'Process', id: 'process-detail' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Resources', id: 'blog-hub' },
    { name: 'Contact', id: 'contact-page' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex flex-col cursor-pointer" onClick={() => onNavigate('home')}>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1a2849]">
            SwatchCraft <span className="text-[#d4a574]">India</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-gray-500">Premium Sample Manufacturing</span>
        </div>

        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewState)}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                currentView === item.id ? 'text-[#d4a574]' : 'text-[#1a2849] hover:text-[#d4a574]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <button onClick={() => onNavigate('pricing')} className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-navy mr-4 hover:text-gold transition-colors">Pricing</button>
          <a href="https://wa.me/910000000000" className="hidden sm:flex bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest py-2.5 px-6 rounded-lg hover:opacity-90 transition-all shadow-sm">WhatsApp Quote</a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[#1a2849] p-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg></button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full w-full shadow-2xl">
          <div className="p-6 space-y-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { onNavigate(item.id as ViewState); setMobileMenuOpen(false); }} className={`block w-full text-left py-3 text-sm font-bold uppercase tracking-widest border-b border-gray-50 ${currentView === item.id ? 'text-[#d4a574]' : 'text-[#1a2849]'}`}>{item.name}</button>
            ))}
            <button onClick={() => { onNavigate('pricing'); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-sm font-bold uppercase tracking-widest border-b border-gray-50 text-navy">Pricing Guide</button>
            <div className="pt-4 flex flex-col space-y-3">
              <a href="https://wa.me/910000000000" className="bg-[#25D366] text-white text-center font-bold py-4 rounded-xl text-xs uppercase tracking-widest">WhatsApp Quote</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;