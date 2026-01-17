import React, { useState } from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductRingSwatch: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const thumbnails = [
    { label: "Main View", placeholder: "Ring swatch set being flipped through by hand" },
    { label: "Case Detail", placeholder: "Compact ring swatch set in protective case" },
    { label: "Mechanism", placeholder: "Close-up of metal ring binding mechanism" },
    { label: "Fanned Swatches", placeholder: "Multiple fabric swatches fanned out" },
    { label: "Presentation", placeholder: "Sales rep presenting swatches to client" }
  ];

  const specs = [
    { label: "Product Type", value: "Ring-Bound Fabric Sample Set" },
    { label: "Binding", value: "Metal ring mechanism (2-ring or 3-ring)" },
    { label: "Ring Size", value: "25mm, 32mm, or 38mm diameter" },
    { label: "Swatch Capacity", value: "20-40 fabric samples (expandable)" },
    { label: "Swatch Size", value: "Standard: 10x10cm, Large: 12x12cm, Custom available" },
    { label: "MOQ", value: "75 sets per collection" },
    { label: "Lead Time", value: "15-20 days after fabric receipt" },
  ];

  const pricingTiers = [
    { q: "5-10 (Sample)", p: "₹80", i: "₹400-800" },
    { q: "25-50", p: "₹35-45", i: "₹875-2,250" },
    { q: "75-100 (MOQ)", p: "₹20-25", i: "₹1,500-2,500" },
    { q: "100-500", p: "₹18-22", i: "₹1,800-11,000" },
    { q: "500+ (Export)", p: "₹15-18", i: "₹7,500+" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy uppercase">Ring Swatch Sample Sets</span>
        </div>
      </nav>

      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div 
              className="aspect-[4/3] bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200 overflow-hidden relative group cursor-zoom-in"
              onClick={() => setIsZoomOpen(true)}
            >
              <div className="text-center text-gray-300 group-hover:text-gold transition-colors p-8">
                <svg className="w-20 h-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-bold uppercase tracking-widest text-sm">{thumbnails[activeThumb].placeholder}</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {thumbnails.map((thumb, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveThumb(idx)} 
                  className={`aspect-square bg-gray-50 rounded-xl border-2 flex items-center justify-center transition-all ${activeThumb === idx ? 'border-gold ring-4 ring-gold/10' : 'border-transparent hover:border-gray-200'}`}
                >
                  <div className="text-[7px] font-black text-gray-400 text-center uppercase leading-tight px-1">{thumb.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="bg-teal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-6 shadow-sm">Perfect for Sales Teams</span>
            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
              Ring Swatch Sample Sets - Portable Fabric Presentation Kits
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              Compact, durable sample sets designed for mobile sales teams and trade show presentations.
            </p>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 leading-none">Starting from</p>
              <p className="text-3xl font-black text-navy leading-none mt-2">₹20 <span className="text-sm font-bold text-gray-400">/ set</span></p>
              <button onClick={() => setIsPricingModalOpen(true)} className="text-teal text-xs font-bold underline mt-4 hover:text-navy transition-colors inline-block">View Volume Discounts</button>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">
                Request Quote for Sales Team
              </button>
              <button 
                onClick={() => onDownload('Ring Swatch Spec Sheet')}
                className="text-gray-400 text-[10px] font-bold underline uppercase tracking-widest hover:text-navy transition-colors text-center"
              >
                Download Product Specifications
              </button>
            </div>
          </div>
        </div>
      </section>

      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-navy/80 flex items-center justify-center p-4 z-[100] animate-fadeIn backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsPricingModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-black text-navy mb-8 uppercase tracking-widest">Volume Discounts Guide</h3>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="p-4 text-left">Quantity</th>
                    <th className="p-4 text-left">Price/Set</th>
                    <th className="p-4 text-left">Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-4 font-bold text-navy">{row.q}</td>
                      <td className="p-4 font-black text-gold">{row.p}</td>
                      <td className="p-4 text-gray-600 font-medium">{row.i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button 
              onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }}
              className="w-full bg-teal text-white font-black py-4 rounded-xl mt-8 shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-xs"
            >
              Get Custom Sales Team RFQ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRingSwatch;