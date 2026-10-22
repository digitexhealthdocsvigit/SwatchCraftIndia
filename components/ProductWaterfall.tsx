import React, { useState } from 'react';
import { ViewState } from '../App.tsx';
import { Download, Layers, TrendingUp, Zap } from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductWaterfall: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const [activeThumb, setActiveThumb] = useState(0);

  const thumbnails = [
    { 
      label: "Main View", 
      src: "https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?auto=format&fit=crop&w=800&q=80",
      alt: "Custom Cascading Waterfall Fabric Swatch Card Manufacturer Mumbai"
    },
    { 
      label: "Bi-Fold", 
      src: "https://images.unsplash.com/photo-1520183802803-06f731a2059f?auto=format&fit=crop&w=800&q=80",
      alt: "Bi-Fold Waterfall Swatch Presentation Card with Fabric Codes"
    },
    { 
      label: "Tri-Fold", 
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
      alt: "Tri-Fold Textile Swatch Storyboard with Coordinated Colors"
    },
    { 
      label: "Palette", 
      src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=800&q=80",
      alt: "Cascading Tiered Fabric Palette on High GSM Cardstock"
    }
  ];

  const waterfallSpecs = [
    { s: "Format", d: "Cascading Tiered (Waterfall)" },
    { s: "Standard Width", d: "150mm, 200mm, 250mm" },
    { s: "Fabric Visibility", d: "1-inch (25mm) exposure per swatch" },
    { s: "Capacity", d: "20-60 samples per card" },
    { s: "Backing", d: "Rigid 400 GSM high-density cardstock" },
    { s: "Edge Finish", d: "Pinked or straight-cut with anti-fray" },
    { s: "Branding", d: "Full-color offset or screen printing" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-black uppercase tracking-widest text-gray-600">
          <button onClick={() => onNavigate('home')} className="hover:text-[#8B6F47] transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-[#8B6F47] transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy uppercase font-bold">Waterfall Swatch Cards</span>
        </div>
      </nav>

      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="aspect-[4/3] bg-gray-50 rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl relative group">
            <img 
              src={thumbnails[activeThumb].src} 
              alt={thumbnails[activeThumb].alt} 
              loading="lazy" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
            />
            <div className="absolute top-8 left-8 bg-teal text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              #1 Exporter Choice
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {thumbnails.map((thumb, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveThumb(idx)} 
                className={`aspect-square rounded-2xl border-2 overflow-hidden transition-all ${
                  activeThumb === idx ? 'border-[#8B6F47] scale-95 shadow-inner ring-2 ring-[#8B6F47]/20' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={thumb.src} alt={thumb.alt} loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 tracking-tighter uppercase leading-tight">
            Waterfall Swatch Cards
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium italic">
            "Show 40% more fabric in 50% less space. The modern standard for international fabric presentation and air-freight efficiency."
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-navy font-black text-2xl block mb-1">500+</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Units Daily Capacity</span>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[#8B6F47] font-black text-2xl block mb-1">14-21</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Days Export Delivery</span>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#1e3a5f]">Technical Details</h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100 text-xs">
              {waterfallSpecs.map((spec, i) => (
                <div key={i} className="flex justify-between p-3.5 hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-[#1e3a5f] uppercase tracking-wider">{spec.s}</span>
                  <span className="text-gray-600 font-medium">{spec.d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('contact-page')} 
              className="flex-1 bg-[#1e3a5f] hover:bg-[#0d7377] text-white font-black py-4 px-8 rounded-xl shadow-xl transition-all uppercase tracking-widest text-xs"
            >
              Request Waterfall Sample Quote
            </button>
            <button 
              onClick={() => onDownload('Waterfall Swatch Card Technical Matrix')} 
              className="border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white font-black py-4 px-6 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Spec Sheet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductWaterfall;
