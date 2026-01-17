import React from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductWaterfall: React.FC<Props> = ({ onNavigate }) => {
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

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/3] bg-gray-100 rounded-[3rem] border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 font-black uppercase text-center px-12 leading-relaxed">
             [ High Impact Visual: Waterfall Swatch Card Arrangement ]
          </div>
          <div>
            <span className="bg-teal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-6">Exporter's Favorite</span>
            <h1 className="text-4xl md:text-6xl font-black text-navy mb-8 tracking-tighter leading-none">Waterfall Swatch Cards</h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
              The modern standard for international fabric presentation. Waterfall cards display your entire collection color story in a single, high-impact cascade.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">MOQ</p>
                  <p className="text-navy font-black">200 Units</p>
               </div>
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Lead Time</p>
                  <p className="text-navy font-black">15-21 Days</p>
               </div>
            </div>
            <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all uppercase tracking-widest text-sm">Request Waterfall Card RFQ</button>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-navy mb-12">Technical Advantages</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { t: "Space Efficient", d: "40% more samples in the same footprint as books." },
                 { t: "Lightweight", d: "Reduces international air freight costs by 30-50%." },
                 { t: "Instant View", d: "Full collection visible without flipping pages." }
               ].map((adv, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                   <h4 className="font-black text-gold text-lg mb-4">{adv.t}</h4>
                   <p className="text-xs text-gray-500 leading-relaxed font-medium">{adv.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default ProductWaterfall;