import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductHanger: React.FC<Props> = ({ onNavigate }) => {
  const [activeThumb, setActiveThumb] = useState(0);

  const thumbnails = [
    { label: "Main View", placeholder: "Fabric hanger swatches in showroom" },
    { label: "Header Detail", placeholder: "Branded wooden header card" },
    { label: "Hooks", placeholder: "Chrome and matte black hook options" },
    { label: "Waterfall", placeholder: "Waterfall layout display" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Fabric Hanger Swatches</span>
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
            <span className="bg-navy text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">Showroom Display Essential</span>
            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">Fabric Hanger Swatches</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">Showroom display solutions with fabric swatches mounted on premium metal or wooden hangers with branded headers.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { l: "MOQ", v: "100 Hangers" },
                { l: "Lead Time", v: "18-25 Days" },
                { l: "Hook Types", v: "Chrome, Wood, Black" },
                { l: "Sizes", v: "15x15cm, 20x20cm, Custom" }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{item.l}</p>
                  <p className="text-navy font-bold">{item.v}</p>
                </div>
              ))}
            </div>

            <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all mb-4">Request Custom Quote</button>
            <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Ideal for high-end curtain and upholstery retailers</p>
          </div>
        </div>
      </section>

      {/* Construction Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Header & Mounting Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h4 className="font-bold text-navy text-xl mb-4">Wooden Headers</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">Premium teak or mahogany finish with laser-engraved logos. Perfect for luxury boutique showrooms.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h4 className="font-bold text-navy text-xl mb-4">Cardstock Headers</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">400 GSM rigid cardstock with full-color offset printing and UV coating for mass retail distribution.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h4 className="font-bold text-navy text-xl mb-4">Hook Variations</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">Choose from heavy-duty chrome hooks, brushed nickel, or minimalist matte black to match your store interior.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductHanger;