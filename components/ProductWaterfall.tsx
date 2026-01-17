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
          <span className="text-navy uppercase tracking-tighter">Waterfall Swatch Cards</span>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/3] bg-gray-100 rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 font-black uppercase text-center px-12 leading-relaxed group hover:border-gold transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-6 opacity-30 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
             </svg>
             <span className="text-sm">High Impact Visual: Waterfall Swatch Card Arrangement showing tiered cascade of 40+ samples</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-teal text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">Exporter's Priority Choice</span>
              <span className="text-gold font-black text-[10px] uppercase tracking-[0.2em]">India Exclusive Format</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-navy mb-8 tracking-tighter leading-none">Waterfall Swatch Cards</h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
              The modern standard for international fabric presentation. Waterfall cards display your entire collection color story in a single, high-impact cascade, showing 40% more fabric in 50% less space.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-widest">MOQ Advantage</p>
                  <p className="text-navy font-black text-xl">100 Units</p>
                  <p className="text-[9px] text-teal font-bold uppercase mt-2">Flexible for Proto</p>
               </div>
               <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-widest">Lead Time</p>
                  <p className="text-navy font-black text-xl">15-21 Days</p>
                  <p className="text-[9px] text-gold font-bold uppercase mt-2">Beat China Timing</p>
               </div>
            </div>
            <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-6 rounded-2xl shadow-2xl hover:bg-navy transition-all uppercase tracking-[0.2em] text-sm">Request Waterfall Quote</button>
          </div>
        </div>
      </section>

      {/* Technical Narrative Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
         <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-16 text-center tracking-tighter uppercase">Why Exporters Are <span className="text-gold">Switching</span></h2>
            <div className="grid md:grid-cols-3 gap-12">
               {[
                 { t: "Space Optimization", d: "Waterfall layouts allow for a tiered arrangement where only 1-inch of each fabric is shown in a cascade. This displays the full color story in one glance without page flipping.", i: "📐" },
                 { t: "Air Freight Savings", d: "Flat-packable and significantly lighter than hardbound books. Reduce your international shipping costs to EU and USA by up to 45%.", i: "✈️" },
                 { t: "Higher Conversion", d: "Buyers report 50% faster decision-making when seeing the entire texture range at once. Preferred by interior designers for project moodboards.", i: "📈" }
               ].map((adv, i) => (
                 <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col group hover:-translate-y-2 transition-all">
                   <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{adv.i}</div>
                   <h4 className="font-black text-navy text-xl mb-4 leading-tight uppercase tracking-tighter">{adv.t}</h4>
                   <p className="text-xs text-gray-500 leading-relaxed font-medium">{adv.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-white">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-navy mb-12 text-center uppercase tracking-widest border-b border-gray-100 pb-8">Waterfall vs Traditional Albums</h2>
            <div className="space-y-8">
               {[
                 { l: "Visibility", w: "100% of collection visible instantly", t: "5-10% visible (requires flipping)" },
                 { l: "Weight", w: "250g - 400g (Lightweight)", t: "800g - 1.5kg (Bulky)" },
                 { l: "Cost", w: "₹70 - ₹95 per unit", t: "₹120 - ₹160 per unit" },
                 { l: "Setup Time", w: "10 Days", t: "20 Days" }
               ].map((row, i) => (
                 <div key={i} className="grid grid-cols-3 gap-4 items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{row.l}</span>
                    <div className="bg-teal/5 p-4 rounded-xl border border-teal/10 text-center text-teal font-bold text-xs">{row.w}</div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center text-gray-400 font-bold text-xs">{row.t}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-24 px-4 text-center text-white relative overflow-hidden">
         <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl font-black mb-8 leading-none">Ready to Modernize Your Sampling?</h2>
            <p className="text-gray-400 text-lg mb-12 font-medium">Join global brands like StyleItaly and HomeLux who have switched to SwatchCraft Waterfalls.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button onClick={() => onNavigate('contact-page')} className="bg-gold text-navy font-black py-4 px-12 rounded-xl hover:scale-105 transition-all uppercase tracking-widest text-xs">Start Technical RFQ</button>
               <a href="https://wa.me/919004962871" className="border-2 border-white/20 text-white font-black py-4 px-12 rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">WhatsApp Specialist</a>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>
    </div>
  );
};

export default ProductWaterfall;