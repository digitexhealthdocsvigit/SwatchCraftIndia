import React from 'react';
import { ViewState } from '../App';

const products = [
  {
    id: 'upholstery',
    title: "Upholstery Swatch Books",
    badge: "MOQ: 50 books",
    desc: "Hardbound or ring-bound albums showcasing 20-60 upholstery fabric samples with professional labels and branding.",
    specs: ["Hardbound & Ring-bound", "20-60 fabric capacity", "Custom logo printing", "White-label options"],
    moq: "50 Books",
    leadTime: "21-28 days",
    placeholder: "Hardbound upholstery swatch book displaying 40 velvet and linen fabric samples",
    target: 'product-upholstery'
  },
  {
    id: 'curtain',
    title: "Curtain Fabric Albums",
    badge: "MOQ: 40 albums",
    desc: "Oversized A3+ albums designed for window treatment collections. Features detachable pages and protective sleeves.",
    specs: ["A3/A3+ Large Format", "30-50 swatches", "Detachable pages", "Transparent sleeves"],
    moq: "40 Albums",
    leadTime: "24-30 days",
    placeholder: "A3 large format curtain fabric album showing sheer and blackout samples",
    target: 'product-curtain'
  },
  {
    id: 'hanger',
    title: "Fabric Hanger Swatches",
    badge: "MOQ: 100 hangers",
    desc: "Showroom display solutions with fabric swatches mounted on metal or wooden hangers with branded headers.",
    specs: ["Chrome/Wood/Black", "Custom header cards", "Wall-mount ready", "Showroom optimized"],
    moq: "100 Hangers",
    leadTime: "18-25 days",
    placeholder: "Professional chrome fabric hanger swatches displayed on showroom wall",
    target: 'product-hanger'
  },
  {
    id: 'ring',
    title: "Ring Swatch Sets",
    badge: "MOQ: 75 sets",
    desc: "Compact, portable kits perfect for sales representatives. Metal ring binding allows easy flipping and removal.",
    specs: ["Metal ring binding", "Portable sales kits", "Fits in briefcase", "Easy flip mechanism"],
    moq: "75 Sets",
    leadTime: "15-20 days",
    placeholder: "Compact ring-bound fabric swatch set being flipped through by sales representative",
    target: 'product-ring'
  },
  {
    id: 'cards',
    title: "Sample Cards & Storyboards",
    badge: "MOQ: 200 cards",
    desc: "Marketing-ready fabric cards showing color stories and collection themes. High-GSM rigid cardstock backing.",
    specs: ["A5/A4 Storyboards", "3-8 swatches per card", "Mailable format", "Collection marketing"],
    moq: "200 Cards",
    leadTime: "12-18 days",
    placeholder: "A5 fabric sample card showing 6 coordinated upholstery fabric swatches",
    target: 'product-cards'
  }
];

const FeaturedProducts: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
  return (
    <section className="py-24 px-4 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 uppercase tracking-tighter">Premium Fabric Presentation</h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">Export-quality fabric sample books and showroom displays for global furniture brands.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col group">
              <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-8 border-b border-gray-100 relative cursor-pointer" onClick={() => onNavigate(product.target as ViewState)}>
                <div className="text-center text-gray-300 group-hover:text-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-widest px-8 block leading-relaxed">{product.placeholder}</span>
                </div>
                <div className="absolute top-6 left-6 bg-gold text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">{product.badge}</div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-navy mb-4 group-hover:text-gold transition-colors uppercase tracking-tight">{product.title}</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium flex-grow">{product.desc}</p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Lead Time</p>
                    <p className="text-xs font-black text-navy">{product.leadTime}</p>
                  </div>
                  <button onClick={() => onNavigate(product.target as ViewState)} className="text-teal font-black text-[10px] uppercase tracking-widest flex items-center justify-end hover:text-gold transition-colors">
                    View Specs →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;