import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductUpholstery: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const thumbnails = [
    { label: "Main View", placeholder: "Hardbound upholstery swatch book displaying 40 velvet and linen fabric samples" },
    { label: "Binding", placeholder: "Close-up of premium ring-bound mechanism on upholstery fabric album" },
    { label: "Labels", placeholder: "Custom fabric code labels for upholstery samples" },
    { label: "Stacked", placeholder: "Bulk production of hardbound fabric sample books" },
    { label: "Branding", placeholder: "Custom logo embossing on upholstery swatch book cover" }
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
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy uppercase">Upholstery Swatch Books</span>
        </div>
      </nav>

      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="aspect-[4/3] bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200 overflow-hidden relative group">
            <div className="text-center text-gray-300 group-hover:text-gold transition-all duration-500 p-10">
              <p className="font-bold uppercase tracking-widest text-sm">{thumbnails[activeThumb].placeholder}</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {thumbnails.map((thumb, idx) => (
              <button key={idx} onClick={() => setActiveThumb(idx)} className={`aspect-square bg-gray-50 rounded-xl border-2 flex items-center justify-center overflow-hidden ${activeThumb === idx ? 'border-gold' : 'border-transparent'}`}>
                <div className="text-[7px] font-black text-gray-400 uppercase leading-tight px-1">{thumb.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight uppercase tracking-tighter">Premium Upholstery Books</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">Professional sample presentation for high-end furniture manufacturers.</p>
          
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase mb-1">Starting from</p>
                <p className="text-3xl font-black text-navy leading-none">₹70 <span className="text-xs text-gray-400">/ pc</span></p>
              </div>
              <button onClick={() => setIsPricingModalOpen(true)} className="text-teal font-black text-[10px] uppercase tracking-widest underline">Full Pricing Guide</button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">Get Custom RFQ</button>
            <button 
              onClick={() => onDownload('Upholstery Spec Sheet')}
              className="text-gray-400 text-[10px] font-black underline uppercase tracking-widest hover:text-navy transition-colors text-center"
            >
              Download Technical Spec Sheet (PDF)
            </button>
          </div>
        </div>
      </section>

      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-navy/80 flex items-center justify-center p-4 z-[100] animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative">
            <button onClick={() => setIsPricingModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-navy">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-black text-navy mb-8 uppercase tracking-widest">Upholstery Volume Rates</h3>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                  <tr><th className="p-4 text-left">Quantity</th><th className="p-4 text-left">Price/Unit</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((tier, i) => (
                    <tr key={i}><td className="p-4 font-bold text-navy">{tier.qty}</td><td className="p-4 font-black text-gold text-lg">{tier.price}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }} className="w-full bg-teal text-white font-black py-4 rounded-xl mt-8 shadow-lg uppercase tracking-widest text-[10px]">Get Final Quote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpholstery;