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
    { label: "Main View", src: "https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?auto=format&fit=crop&w=400&q=60" },
    { label: "Bi-Fold", src: "https://images.unsplash.com/photo-1523366952726-2615433d7d74?auto=format&fit=crop&w=400&q=60" },
    { label: "Tri-Fold", src: "https://images.unsplash.com/photo-1505569127510-bde15360d7f6?auto=format&fit=crop&w=400&q=60" },
    { label: "Palette", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=60" }
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
            <img src={thumbnails[activeThumb].src} alt="Waterfall swatch card product presentation" loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
            <div className="absolute top-8 left-8 bg-teal text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">#1 Exporter Choice</div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {thumbnails.map((thumb, idx) => (
              <button key={idx} onClick={() => setActiveThumb(idx)} className={`aspect-square rounded-2xl border-2 overflow-hidden transition-all ${activeThumb === idx ? 'border-[#8B6F47] scale-95 shadow-inner' : 'border-transparent opacity-60'}`}>
                <img src={thumb.src} alt={thumb.label} loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 tracking-tighter uppercase leading-tight">Waterfall Swatch Cards</h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium italic">"Show 40% more fabric in 50% less space. The modern standard for international fabric presentation and air-freight efficiency."</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
             <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                <p className="text-[11px] text-gray-600 font-black uppercase mb-1">Starting from</p>
                <p className="text-3xl font-black text-navy leading-none">₹70 <span className="text-[11px] text-gray-600 uppercase font-bold">/ unit</span></p>
             </div>
             <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex flex-col justify-center">
                <p className="text-[11px] text-gray-600 font-black uppercase mb-1">Standard Lead Time</p>
                <p className="text-3xl font-black text-navy leading-none">15-21d</p>
             </div>
          </div>

          <div className="flex flex-col gap-4">
            <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-6 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">Get Custom Waterfall Quote</button>
            <button 
              onClick={() => onDownload('Waterfall Engineering Specs')}
              className="text-gray-600 text-[11px] font-black underline uppercase tracking-widest hover:text-navy transition-colors text-center flex items-center justify-center gap-2"
            >
              <Download className="w-3 h-3" /> Download Engineering Spec (PDF)
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
             <div className="flex flex-col items-center">
                <Layers className="w-6 h-6 text-[#8B6F47] mb-2" />
                <span className="text-[11px] font-black text-gray-600 uppercase">Space Optimized</span>
             </div>
             <div className="flex flex-col items-center">
                <Zap className="w-6 h-6 text-[#8B6F47] mb-2" />
                <span className="text-[11px] font-black text-gray-600 uppercase">Rapid Sample</span>
             </div>
             <div className="flex flex-col items-center">
                <TrendingUp className="w-6 h-6 text-[#8B6F47] mb-2" />
                <span className="text-[11px] font-black text-gray-600 uppercase">Sales Focused</span>
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy mb-12 text-center uppercase tracking-tighter">Technical Specifications</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-xl">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-100">
                {waterfallSpecs.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-black text-navy text-[11px] uppercase tracking-widest bg-gray-50/50 w-1/3">{row.s}</td>
                    <td className="p-6 text-gray-600 font-bold text-sm">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductWaterfall;