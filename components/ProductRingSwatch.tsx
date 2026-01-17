import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductRingSwatch: React.FC<Props> = ({ onNavigate }) => {
  const [activeThumb, setActiveThumb] = useState(0);

  const thumbnails = [
    { label: "Main View", placeholder: "Ring swatch set in sales representative bag" },
    { label: "Mechanism", placeholder: "Heavy duty metal ring detail" },
    { label: "Swapping", placeholder: "Easy swatch removal process" },
    { label: "Packaging", placeholder: "Custom branded storage case" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Ring Swatch Sample Sets</span>
        </div>
      </nav>

      <section className="py-12 px-4 lg:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200 overflow-hidden text-gray-300 font-bold uppercase tracking-widest text-sm">
              {thumbnails[activeThumb].placeholder}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((thumb, idx) => (
                <button key={idx} onClick={() => setActiveThumb(idx)} className={`aspect-square bg-gray-50 rounded-xl border-2 flex items-center justify-center ${activeThumb === idx ? 'border-gold' : 'border-transparent'}`}>
                   <div className="text-[8px] font-black text-gray-400 text-center uppercase p-1">{thumb.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="bg-[#0d7377] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">Sales Team Essential</span>
            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">Ring Swatch Sample Sets</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">Compact, portable kits perfect for sales representatives. Metal ring binding allows easy flipping and removal of swatches during client presentations.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { l: "MOQ", v: "75 Sets" },
                { l: "Lead Time", v: "15-20 Days" },
                { l: "Ring Sizes", v: "2-inch, 3-inch D-rings" },
                { l: "Capacity", v: "20-40 Fabric Samples" }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{item.l}</p>
                  <p className="text-navy font-bold">{item.v}</p>
                </div>
              ))}
            </div>

            <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all mb-4">Get Sample Pricing</button>
            <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Available with custom-printed fabric code labels</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-navy text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-12">Designed for the Road</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white/5 p-8 rounded-3xl">
               <div className="text-4xl mb-4">🏃</div>
               <h4 className="font-bold text-xl mb-2">Ultra Portable</h4>
               <p className="text-gray-400 text-sm">Lightweight design that fits easily into standard laptop bags and carry-on luggage.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl">
               <div className="text-4xl mb-4">🔄</div>
               <h4 className="font-bold text-xl mb-2">Modular System</h4>
               <p className="text-gray-400 text-sm">Add or remove individual samples as collections change without reprinting the whole set.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl">
               <div className="text-4xl mb-4">🛡️</div>
               <h4 className="font-bold text-xl mb-2">Durable Binding</h4>
               <p className="text-gray-400 text-sm">Reinforced fabric eyelets prevent tearing during heavy use by busy sales representatives.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductRingSwatch;