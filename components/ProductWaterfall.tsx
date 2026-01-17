import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductWaterfall: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const [activeThumb, setActiveThumb] = useState(0);

  const thumbnails = [
    { label: "Main View", placeholder: "High-impact waterfall swatch card displaying a cascade of 40 fabric colors" },
    { label: "Side Profile", placeholder: "Thin profile view showing tiered layering of waterfall swatches" },
    { label: "Header Detail", placeholder: "Custom branded header with foil stamping for waterfall card" },
    { label: "Mailing View", placeholder: "Waterfall card folded into standard A4 envelope for mailing" }
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

  const pricingTiers = [
    { qty: "1-10 pieces (sample)", price: "₹450", best: "Prototyping" },
    { qty: "50-100 pieces", price: "₹95-120", best: "Small launches" },
    { qty: "100-500 pieces", price: "₹80-95", best: "Standard Export" },
    { qty: "500+ pieces", price: "₹70-80", best: "Mass Distribution" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Waterfall Swatch Cards</span>
        </div>
      </nav>

      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="aspect-[4/3] bg-gray-50 rounded-[3rem] flex items-center justify-center border border-gray-100 overflow-hidden relative group">
            <div className="text-center text-gray-300 group-hover:text-gold transition-all duration-500 p-10">
              <p className="font-bold uppercase tracking-widest text-sm leading-relaxed">{thumbnails[activeThumb].placeholder}</p>
            </div>
            <div className="absolute top-8 left-8 bg-teal text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Exporter's Favorite</div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {thumbnails.map((thumb, idx) => (
              <button key={idx} onClick={() => setActiveThumb(idx)} className={`aspect-square bg-gray-50 rounded-2xl border-2 flex items-center justify-center overflow-hidden transition-all ${activeThumb === idx ? 'border-gold scale-95 shadow-inner' : 'border-transparent opacity-60'}`}>
                <div className="text-[7px] font-black text-gray-400 uppercase leading-tight px-1">{thumb.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 tracking-tighter uppercase leading-none">Waterfall Swatch Cards</h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium italic">"Show 40% more fabric in 50% less space. The preferred format for air-freight efficiency."</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Starting from</p>
                <p className="text-3xl font-black text-navy leading-none">₹70 <span className="text-[10px] text-gray-400 uppercase">/ unit</span></p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Standard Lead Time</p>
                <p className="text-3xl font-black text-navy leading-none">15-21d</p>
             </div>
          </div>

          <div className="flex flex-col gap-4">
            <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-6 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">Get Waterfall RFQ</button>
            <button 
              onClick={() => onDownload('Waterfall Engineering Specs')}
              className="text-gray-400 text-[10px] font-black underline uppercase tracking-widest hover:text-navy transition-colors text-center"
            >
              Download Engineering Spec (PDF)
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-navy mb-12 text-center uppercase tracking-widest">Technical Specifications</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-50">
                {waterfallSpecs.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold text-navy text-sm uppercase tracking-wider bg-gray-50/50 w-1/3">{row.s}</td>
                    <td className="p-6 text-gray-500 font-medium text-sm">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Volume Pricing Matrix</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {pricingTiers.map((tier, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 text-center hover:border-gold transition-all group">
                <p className="text-[10px] text-gray-400 font-black uppercase mb-4 tracking-widest">{tier.best}</p>
                <p className="text-sm font-bold text-navy mb-2">{tier.qty}</p>
                <p className="text-3xl font-black text-gold mb-2">{tier.price}</p>
                <p className="text-[9px] text-gray-300 font-bold uppercase">per unit</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductWaterfall;