import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductSampleCards: React.FC<Props> = ({ onNavigate }) => {
  const [activeThumb, setActiveThumb] = useState(0);

  const thumbnails = [
    { label: "Main View", placeholder: "Color story fabric sample card" },
    { label: "Rigid Detail", placeholder: "High-GSM rigid cardstock edge" },
    { label: "Mailing", placeholder: "Sample card in branded envelope" },
    { label: "Storyboard", placeholder: "Large multi-swatch storyboard" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Sample Cards & Storyboards</span>
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
            <span className="bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">Marketing Tool</span>
            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">Sample Cards & Storyboards</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">Marketing-ready fabric cards showing color stories and collection themes. High-GSM rigid cardstock backing for premium flat presentations.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { l: "MOQ", v: "200 Cards" },
                { l: "Lead Time", v: "12-18 Days" },
                { l: "Stock", v: "300-450 GSM Board" },
                { l: "Best For", v: "Mailing & Storyboards" }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{item.l}</p>
                  <p className="text-navy font-bold">{item.v}</p>
                </div>
              ))}
            </div>

            <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all mb-4">Request Export RFQ</button>
            <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Available with Matte, Gloss, or Spot UV finishes</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">The Power of Color Stories</h2>
          <div className="space-y-8">
             <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center font-black shrink-0">1</div>
                <p className="text-gray-600 leading-relaxed">Present 3-8 coordinated fabrics on a single card to showcase a curated design palette or interior theme.</p>
             </div>
             <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center font-black shrink-0">2</div>
                <p className="text-gray-600 leading-relaxed">Export-friendly lightweight design reduces shipping costs for large-scale international mailing campaigns.</p>
             </div>
             <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center font-black shrink-0">3</div>
                <p className="text-gray-600 leading-relaxed">Full-color branding area for high-resolution imagery and detailed technical specifications of the fabric range.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSampleCards;