import React, { useState } from 'react';
import { ViewState } from '../App.tsx';
import { Download, ShieldCheck, Globe, Star } from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductUpholstery: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const thumbnails = [
    { label: "Hero View", src: "https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?auto=format&fit=crop&w=800&q=80" },
    { label: "Velvet Set", src: "https://images.unsplash.com/photo-1520183802803-06f731a2059f?auto=format&fit=crop&w=800&q=80" },
    { label: "Detail Finish", src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80" },
    { label: "Production", src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" }
  ];

  const pricingTiers = [
    { qty: "1-5 pieces (sample)", price: "₹300", best: "Quality testing" },
    { qty: "10-25 pieces", price: "₹150-200", best: "Small designers" },
    { qty: "50-100 pieces", price: "₹85-100", best: "Standard orders" },
    { qty: "100-500 pieces", price: "₹70-85", best: "Growing brands" },
    { qty: "500+ pieces", price: "₹60-80", best: "Bulk export" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Upholstery Swatch Books</span>
        </div>
      </nav>

      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-2xl relative group">
            <img 
              src={thumbnails[activeThumb].src} 
              alt="Upholstery Swatch Book" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6 bg-gold text-navy text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Premium Export Quality</div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {thumbnails.map((thumb, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveThumb(idx)} 
                className={`aspect-square rounded-xl border-2 overflow-hidden transition-all ${activeThumb === idx ? 'border-gold ring-4 ring-gold/10' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={thumb.src} alt={thumb.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gold mb-6">
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-2">Trusted by 500+ Global Brands</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 leading-none uppercase tracking-tighter">Premium Upholstery Books</h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">World-class fabric presentation for high-end furniture manufacturers and international exporters. Durable binding, precise labeling, and luxury finish.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-gray-400 text-[9px] font-black uppercase mb-1">Starting from</p>
                <p className="text-3xl font-black text-navy leading-none">₹70 <span className="text-[10px] text-gray-400">/ pc</span></p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col justify-center">
                <button onClick={() => setIsPricingModalOpen(true)} className="text-teal font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-gold transition-colors">
                  <Globe className="w-3 h-3" /> View Global Rates
                </button>
             </div>
          </div>

          <div className="flex flex-col gap-4">
            <button onClick={() => onNavigate('contact-page')} className="w-full bg-navy text-white font-black py-6 rounded-2xl shadow-xl hover:bg-gold transition-all text-lg uppercase tracking-widest">Get Technical RFQ</button>
            <button 
              onClick={() => onDownload('Upholstery Spec Sheet')}
              className="text-gray-400 text-[10px] font-black underline uppercase tracking-widest hover:text-navy transition-colors text-center flex items-center justify-center gap-2"
            >
              <Download className="w-3 h-3" /> Download High-Res Specs (PDF)
            </button>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-3 gap-6">
             <div className="flex flex-col items-center text-center">
                <ShieldCheck className="w-6 h-6 text-teal mb-2" />
                <p className="text-[8px] font-black text-gray-400 uppercase">ISO 9001:2015</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <Globe className="w-6 h-6 text-teal mb-2" />
                <p className="text-[8px] font-black text-gray-400 uppercase">Global Export</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <Star className="w-6 h-6 text-teal mb-2" />
                <p className="text-[8px] font-black text-gray-400 uppercase">Premium Build</p>
             </div>
          </div>
        </div>
      </section>

      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-navy/90 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-xl w-full shadow-2xl relative">
            <button onClick={() => setIsPricingModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-navy">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-black text-navy mb-8 uppercase tracking-widest border-b border-gray-100 pb-4">Volume Pricing Breakdown</h3>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                  <tr><th className="p-4 text-left">Quantity Tier</th><th className="p-4 text-left">Price (Est.)</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-bold">
                  {pricingTiers.map((tier, i) => (
                    <tr key={i} className="hover:bg-white transition-colors">
                      <td className="p-4 text-navy">{tier.qty} <span className="text-[9px] text-gray-400 ml-2">({tier.best})</span></td>
                      <td className="p-4 font-black text-gold text-lg">{tier.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-[9px] text-gray-400 font-bold uppercase italic leading-relaxed">* Standard A4 format with 40 swatches. Custom specs may vary. Export shipping not included.</p>
            <button onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }} className="w-full bg-teal text-white font-black py-4 rounded-xl mt-8 shadow-lg uppercase tracking-widest text-[10px]">Generate Final Quote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpholstery;