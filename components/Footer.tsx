import React from 'react';
import { ViewState } from '../App.tsx';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-b border-gray-800 pb-20">
        <div>
          <div className="flex flex-col mb-8 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-2xl font-bold tracking-tight text-white">Sampling<span className="text-[#c9a86a]">Hub</span></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">Premium Sample Manufacturing</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 font-medium">
            Established in 2011, SamplingHub (Digitex Studio) is an OEM fabric sampling solutions provider operating through a network of specialised manufacturing partners with centralised engineering, quality inspection, and export coordination from Thane Bhiwandi, PIN: 421302, Maharashtra, India.
          </p>
          <div className="flex space-x-4">
             {['linkedin', 'instagram', 'facebook'].map(s => <div key={s} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#8B6F47] transition-all cursor-pointer"><span className="text-[10px] font-black uppercase tracking-tighter text-gray-300">{s.slice(0,2)}</span></div>)}
          </div>
        </div>

        <div>
          <h3 className="text-[#c9a86a] font-bold uppercase tracking-widest text-[11px] mb-8">Company</h3>
          <ul className="space-y-4 text-sm text-gray-300 font-medium">
            <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">About Us Heritage</button></li>
            <li><button onClick={() => onNavigate('process-detail')} className="hover:text-white transition-colors text-left">Manufacturing Process</button></li>
            <li><button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors text-left">Portfolio & Gallery</button></li>
            <li><button onClick={() => onNavigate('blog-hub')} className="hover:text-white transition-colors text-left">Resources & Blog</button></li>
            <li><button onClick={() => onNavigate('export-markets-page')} className="hover:text-white transition-colors text-left">Export Markets</button></li>
            <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors text-left">Pricing Guide</button></li>
            <li className="pt-2 border-t border-gray-800/80">
              <button 
                onClick={() => onNavigate('admin-login')} 
                className="text-[#c9a86a] hover:text-white transition-colors text-left font-bold flex items-center text-xs tracking-wider uppercase group"
                title="Staff & Management Access"
              >
                <span className="mr-2 group-hover:scale-110 transition-transform">🔒</span> Admin Login
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#c9a86a] font-bold uppercase tracking-widest text-[11px] mb-8">Products</h3>
          <ul className="space-y-4 text-sm text-gray-300 font-medium">
            <li><button onClick={() => onNavigate('products-overview')} className="hover:text-white transition-colors text-left font-black">View All Products</button></li>
            <li><button onClick={() => onNavigate('product-wallpaper-catalog')} className="hover:text-white transition-colors text-left font-black text-[#c9a86a]">Wallpaper Catalog Books</button></li>
            <li><button onClick={() => onNavigate('product-waterfall')} className="hover:text-white transition-colors text-left font-black text-[#149297]">Waterfall Swatch Cards</button></li>
            <li><button onClick={() => onNavigate('product-upholstery')} className="hover:text-white transition-colors text-left">Upholstery Swatch Books</button></li>
            <li><button onClick={() => onNavigate('product-curtain')} className="hover:text-white transition-colors text-left">Curtain Fabric Albums</button></li>
            <li><button onClick={() => onNavigate('product-hanger')} className="hover:text-white transition-colors text-left">Fabric Hanger Swatches</button></li>
            <li><button onClick={() => onNavigate('product-ring')} className="hover:text-white transition-colors text-left">Ring Swatch Sets</button></li>
            <li><button onClick={() => onNavigate('product-cards')} className="hover:text-white transition-colors text-left">Sample Cards & Storyboards</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#c9a86a] font-bold uppercase tracking-widest text-[11px] mb-8">Contact Info</h3>
          <div className="space-y-6 text-sm text-gray-300">
            <div className="flex items-start"><span className="mr-3">📧</span><span className="font-bold text-white">digitex.studio@gmail.com</span></div>
            <div className="flex items-start"><span className="mr-3">📱</span><span className="font-bold text-white">WhatsApp: +91 90049 62871</span></div>
            <div className="flex items-start"><span className="mr-3">📍</span><span>Thane Bhiwandi, PIN: 421302, Maharashtra, India</span></div>
            <button onClick={() => onNavigate('contact-page')} className="bg-[#0d7377] text-white w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest mt-4 shadow-xl hover:bg-[#8B6F47] transition-all">Email RFQ Now</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
        <p>© 2026 SamplingHub (Digitex Studio). All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6 mt-6 md:mt-0 items-center">
          <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
          <span className="text-gray-700 hidden sm:inline">•</span>
          <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Service</button>
          <span className="text-gray-700 hidden sm:inline">•</span>
          <button 
            onClick={() => onNavigate('admin-login')} 
            className="text-gray-300 hover:text-[#c9a86a] transition-colors border-b border-dotted border-gray-600 pb-0.5 tracking-wider"
          >
            Staff Portal
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
