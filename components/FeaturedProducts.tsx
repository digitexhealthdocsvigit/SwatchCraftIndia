import React from 'react';
import { ViewState } from '../App.tsx';

const products = [
  {
    id: 'upholstery',
    title: "Upholstery Swatch Books",
    badge: "MOQ: 50 books",
    desc: "Hardbound or ring-bound albums showcasing 20-60 upholstery fabric samples with professional labels and branding.",
    specs: ["Hardbound & Ring-bound", "20-60 fabric capacity", "Custom logo printing", "White-label options"],
    moq: "50 Books",
    leadTime: "21-28 days",
    image: "https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?auto=format&fit=crop&w=800&q=80",
    alt: "Custom Hardbound Upholstery Swatch Book Manufacturer Mumbai",
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
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    alt: "Large Format Curtain Fabric Album Manufacturer for Wholesalers",
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
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    alt: "Showroom Waterfall Fabric Swatch Hangers with Custom Header Cards",
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
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    alt: "Portable Ring-Bound Fabric Swatch Set for Sales Representatives",
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
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    alt: "Precision Die-Cut Fabric Sample Memo Cards for Mailers",
    target: 'product-cards'
  }
];

const FeaturedProducts: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
  return (
    <section className="py-24 px-4 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 uppercase tracking-tighter">
            Premium Fabric Presentation
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Export-quality fabric sample books, waterfall hangers, and showroom displays for global textile and furniture brands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col group cursor-pointer"
              onClick={() => onNavigate(product.target as ViewState)}
            >
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-6 left-6 bg-gold text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  {product.badge}
                </div>
              </div>
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-navy mb-4 group-hover:text-gold transition-colors uppercase tracking-tight">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium flex-grow">
                  {product.desc}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 items-center">
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Lead Time</p>
                    <p className="text-xs font-black text-navy">{product.leadTime}</p>
                  </div>
                  <span className="text-teal font-black text-[10px] uppercase tracking-widest flex items-center justify-end group-hover:text-gold transition-colors">
                    View Specs →
                  </span>
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
