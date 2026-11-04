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
            <span className="text-2xl font-bold tracking-tight text-white">SwatchCraft <span className="text-[#c9a86a]">India</span></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400">Premium Sample Manufacturing</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 font-medium">
            Established in 1994, SwatchCraft specializes in manufacturing premium fabric swatch books for global brands. ISO 9001 certified, exporting to 15+ countries.
          </p>
          <div className="flex space-x-4">
             {['linkedin', 'instagram', 'facebook'].map(s => <div key={s} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#8B6F47] transition-all cursor-pointer"><span className="text-[10px] font-black uppercase tracking-tighter text-gray-300">{s.slice(0,2)}</span></div>)}
          </div>
        </div>

        <div>
          <h3 className="text-[#c9a86a] font-bold uppercase tracking-widest text-[11px] mb-8">Company</h3>
          <ul className="space-y-4 text-sm text-gray-300 font-medium">
            <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">About Us Heritage</button></li>
            <li><button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors text-left">Portfolio & Gallery</button></li>
            <li><button onClick={() => onNavigate('blog-hub')} className="hover:text-white transition-colors text-left">Resources & Blog</button></li>
            <li><button onClick={() => onNavigate('export-markets-page')} className="hover:text-white transition-colors text-left">Export Markets</button></li>
            <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors text-left">Pricing Guide</button></li>
          </ul>
          <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
            <h3 className="text-[#c9a86a] font-bold uppercase tracking-widest text-[11px]">Technical</h3>
            <ul className="space-y-2">
              <li className="pt-2"><button onClick={() => onNavigate('admin-login')} className="text-[10px] text-[#c9a86a] font-black uppercase tracking-widest flex items-center gap-1 hover:underline">🔐 Admin Technical Portal</button></li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-[#c9a86a] font-bold uppercase tracking-widest text-[11px] mb-8">Products</h3>
          <ul className="space-y-4 text-sm text-gray-300 font-medium">
            <li><button onClick={() => onNavigate('products-overview')} className="hover:text-white transition-colors text-left font-black">View All Products</button></li>
            <li><button onClick={() => onNavigate('product-waterfall')} className="hover:text-white transition-colors text-left font-black text-[#149297]">Waterfall Swatch Cards</button></li>
            <li><button onClick={() => onNavigate('product-upholstery')} className="hover:text-white transition-colors text-left">Upholstery Swatch Books</button></li>
            <li><button onClick={() => onNavigate('product-curtain')} className="hover:text-white transition-colors text-left">Curtain Fabric Albums</button></li>
            <li><button onClick={() => onNavigate('product-hanger')} className="hover:text-white transition-colors text-left">Fabric Hanger Swatches</button></li>
            <li><button onClick={() => onNavigate('product-ring')} className="hover:text-white transition-colors text-left">Ring Swatch Sets</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#c9a86a] font-bold uppercase tracking-widest text-[11px] mb-8">Contact Info</h3>
          <div className="space-y-6 text-sm text-gray-300">
            <div className="flex items-start"><span className="mr-3">📧</span><span className="font-bold text-white">digitex.studio@gmail.com</span></div>
            <div className="flex items-start"><span className="mr-3">📱</span><span className="font-bold text-white">WhatsApp: +91 90049 62871</span></div>
            <div className="flex items-start"><span className="mr-3">📍</span><span>Mumbai, Maharashtra, India</span></div>
            <button onClick={() => onNavigate('contact-page')} className="bg-[#0d7377] text-white w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest mt-4 shadow-xl hover:bg-[#8B6F47] transition-all">Email RFQ Now</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        <p>© 2025 SwatchCraft India. All rights reserved.</p>
        <div className="flex space-x-8 mt-6 md:mt-0 items-center">
          <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
          <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
