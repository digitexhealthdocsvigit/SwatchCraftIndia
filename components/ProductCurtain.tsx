import React, { useState } from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductCurtain: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const thumbnails = [
    { label: "Main View", placeholder: "Large-format curtain album open showing sheer fabrics" },
    { label: "Detachable Page", placeholder: "Close-up of detachable page mechanism" },
    { label: "Textures", placeholder: "Various curtain textures - sheer, blackout, embroidered" },
    { label: "Branded Cover", placeholder: "Album with branded cover" },
    { label: "Collection", placeholder: "Multiple albums for different collections" }
  ];

  const specs = [
    { s: "Product Type", d: "Curtain Fabric Sample Album" },
    { s: "Format", d: "Large format (A3, A3+, Custom oversized)" },
    { s: "Swatch Capacity", d: "30-50 curtain fabric samples" },
    { s: "Standard Sizes", d: "A3 (297x420mm), A3+ (330x483mm), Custom up to A2" },
    { s: "Cover Material", d: "Premium cardstock, leatherette, fabric-covered" },
    { s: "Page Type", d: "Detachable pages with transparent sleeves" },
    { s: "Binding Options", d: "Post-bound, spiral, ring mechanism" },
    { s: "Sleeve Material", d: "Crystal-clear PVC, fabric-safe, anti-static" },
    { s: "Label Options", d: "Collection headers, fabric codes, care symbols" },
    { s: "Customization", d: "Logo, brand colors, collection themes" },
    { s: "Fabric Types", d: "Sheer, voile, blackout, jacquard, embroidered, linen, polyester" },
    { s: "MOQ", d: "40 albums per collection" },
    { s: "Sample MOQ", d: "1-3 pieces for testing" },
    { s: "Lead Time", d: "24-30 days after fabric receipt" },
    { s: "Export Packaging", d: "Individual shrink wrap, protective cartons" }
  ];

  const fabricTypes = [
    { title: "Sheer Fabrics", img: "Sheer voile fabric sample", desc: "Transparent sleeves preserve delicate sheers without crushing or marking" },
    { title: "Blackout Curtains", img: "Heavy blackout fabric", desc: "Sturdy pages support heavy blackout fabrics up to 400 GSM" },
    { title: "Jacquard Weaves", img: "Jacquard pattern detail", desc: "Large format displays intricate jacquard patterns effectively" },
    { title: "Embroidered Fabrics", img: "Embroidery detail", desc: "Protective sleeves prevent snagging of embroidered work" },
    { title: "Linen & Cotton", img: "Natural fiber curtain", desc: "Natural fabric mounting without adhesive damage" },
    { title: "Printed Curtains", img: "Printed pattern", desc: "A3+ format shows full design repeats and color gradients" }
  ];

  const customizationCards = [
    { title: "Cover & Branding", img: "Custom branded cover examples", options: ["Company logo printing/embossing", "Brand colors and design themes", "Collection name headers", "Seasonal collection artwork"] },
    { title: "Page Layout Options", img: "Different page layouts", options: ["Single large swatch per page", "Multiple swatches comparison", "Coordinated fabric sets per page", "Custom grid arrangements"] },
    { title: "Labeling & Info", img: "Label examples", options: ["Fabric name and code", "Composition and weight", "Care instructions & symbols", "QR codes to online catalog"] },
    { title: "Special Features", img: "Special features", options: ["Detachable pages for takeaway", "Color story dividers", "Mood board inserts", "Pocket pages for extra materials"] }
  ];

  const pricingTiers = [
    { qty: "1-5 albums (sample)", price: "₹500", investment: "₹500-2,500", best: "Quality evaluation" },
    { qty: "10-25 albums", price: "₹200-300", investment: "₹2,000-7,500", best: "Small showrooms" },
    { qty: "40-100 albums (MOQ)", price: "₹120-140", investment: "₹4,800-14,000", best: "Standard orders" },
    { qty: "100-500 albums", price: "₹100-120", investment: "₹10,000-60,000", best: "Multiple collections" },
    { qty: "500+ albums (export)", price: "₹90-110", investment: "₹45,000+", best: "Bulk export, distributors" }
  ];

  const faqs = [
    { q: "Can you handle very delicate sheer fabrics?", a: "Yes, we use anti-static sleeves and gentle handling processes specifically for sheers and voiles." },
    { q: "What's the maximum fabric weight you can accommodate?", a: "Up to 600 GSM for heavy blackout and velvet curtains with reinforced pages." },
    { q: "Do sleeves affect fabric color appearance?", a: "Our crystal-clear PVC is color-neutral and UV-resistant to maintain true fabric color." },
    { q: "Can pages be reused with different fabrics?", a: "Yes, sleeves are designed for multiple fabric changes without damage." },
    { q: "What if I need to add pages later?", a: "Post-bound albums allow easy page addition. We can supply additional blank pages." },
    { q: "Do you provide seasonal collection updates?", a: "Yes, order additional pages with new fabrics to update existing albums." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Curtain Fabric Albums</span>
        </div>
      </nav>

      <section className="py-12 px-4 lg:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div 
              className={`aspect-[4/3] bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200 overflow-hidden relative group transition-all duration-500 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <div className={`text-center transition-all duration-500 ${isZoomed ? 'scale-150' : 'scale-100'} text-gray-300 group-hover:text-gold`}>
                <svg className="w-20 h-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-bold uppercase tracking-widest text-sm">{thumbnails[activeThumb].placeholder}</p>
              </div>
              <div className="absolute bottom-6 right-6 bg-gold text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-lg">
                {isZoomed ? 'Exit Zoom' : 'Click to Zoom'}
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-3">
              {thumbnails.map((thumb, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveThumb(idx)}
                  className={`aspect-square bg-gray-50 rounded-xl border-2 flex items-center justify-center transition-all overflow-hidden ${activeThumb === idx ? 'border-gold ring-4 ring-gold/10' : 'border-transparent hover:border-gray-200'}`}
                >
                  <div className="text-[7px] font-black text-gray-400 text-center uppercase leading-tight px-1">
                    {thumb.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="bg-navy text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Large Format Premium</span>
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                <span className="text-gray-400 text-[10px] font-bold ml-2 uppercase tracking-tighter">4.9/5 (28 reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
              Curtain Fabric Albums - Large Format Presentation
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Professional sample albums for window treatment manufacturers and home textile brands.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Oversized format (A3 or larger) for full fabric drape visibility",
                "Capacity: 30-50 curtain fabric swatches",
                "Detachable pages for customer selection",
                "Transparent protective sleeves for delicate fabrics",
                "Suitable for sheer, blackout, jacquard, and embroidery"
              ].map((item, i) => (
                <div key={i} className="flex items-center text-navy font-medium">
                  <span className="w-6 h-6 bg-teal/10 text-teal rounded-full flex items-center justify-center mr-4 text-xs font-bold">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Price per album</p>
                  <p className="text-3xl font-black text-navy leading-none">Starting from ₹100</p>
                  <p className="text-gold text-xs font-bold mt-2">Request Quote for Export Pricing</p>
                  <button 
                    onClick={() => setIsPricingModalOpen(true)}
                    className="text-teal text-xs font-bold underline mt-2 hover:text-navy transition-colors"
                  >
                    View Complete Pricing Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">MOQ</span>
                    <span className="text-navy font-bold text-xs">40 Albums</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Lead Time</span>
                    <span className="text-navy font-bold text-xs">24-30 Days</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Sample</span>
                    <span className="text-navy font-bold text-xs">₹500/pc</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => onNavigate('contact-page')}
                className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all transform hover:-translate-y-1 text-lg tracking-wider"
              >
                Request Custom Quote
              </button>
              <a 
                href="https://wa.me/910000000000"
                className="w-full border-2 border-[#25D366] text-[#25D366] font-bold py-4 rounded-xl flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-xs uppercase tracking-widest"
              >
                WhatsApp for Quick Questions
              </a>
              <button 
                onClick={() => onDownload('Curtain Spec Sheet')}
                className="text-gray-400 text-xs font-bold underline hover:text-navy transition-colors text-center"
              >
                Download Product Spec Sheet
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy mb-12 text-center">Technical Specifications</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-100">
                {specs.map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-navy w-1/3 bg-gray-50 group-hover:bg-white">{row.s}</td>
                    <td className="py-4 px-6 text-gray-600">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-navy text-center mb-16">Perfect for All Curtain Fabric Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {fabricTypes.map((type, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 group hover:shadow-xl transition-all">
                <div className="aspect-square bg-white rounded-2xl mb-6 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[10px] group-hover:text-gold transition-colors text-center p-4">
                  {type.img}
                </div>
                <h4 className="text-lg font-bold text-navy mb-2">{type.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-navy text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 uppercase tracking-widest text-sm">Complete White-Label Customization</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customizationCards.map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="aspect-video bg-white/10 rounded-xl mb-6 flex items-center justify-center text-white/30 font-bold uppercase text-[10px] tracking-widest text-center px-4">
                  {card.img}
                </div>
                <h4 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">{card.title}</h4>
                <ul className="space-y-2">
                  {card.options.map((opt, j) => (
                    <li key={j} className="text-gray-400 text-[10px] flex items-start">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2 mt-1"></span>
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-16">Ideal For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { icon: "🏭", title: "Curtain Manufacturers", desc: "Showcase seasonal collections to retailers with professional presentation that displays full drape." },
              { icon: "📦", title: "Home Textile Exporters", desc: "Export-ready albums for trade shows. Perfect for presenting ranges to EU and US markets." },
              { icon: "📐", title: "Interior Design Studios", desc: "Presentation kits with detachable pages allowing customers to take swatches home for matching." },
              { icon: "🏪", title: "Showrooms & Retailers", desc: "Display albums for walk-in customers. Large format enables self-service browsing with luxury feel." }
            ].map((use, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-gold transition-all">
                <div className="text-4xl mb-6 text-center">{use.icon}</div>
                <h4 className="text-xl font-bold text-navy mb-4">{use.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Showcase Your Curtain Collections?</h2>
          <p className="text-white/80 text-lg mb-12">
            Get a custom quote for large-format curtain albums with your branding and specific layout requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-teal text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-navy transition-all uppercase tracking-widest text-xs"
            >
              Request Custom Quote
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">
              Order Sample Album (₹500)
            </button>
          </div>
        </div>
      </section>

      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-navy/80 flex items-center justify-center p-4 z-[100] animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsPricingModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-black text-navy mb-8">Curtain Album Pricing Guide</h3>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="p-4 text-left">Order Quantity</th>
                    <th className="p-4 text-left">Price per Album</th>
                    <th className="p-4 text-left">Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((tier, i) => (
                    <tr key={i}>
                      <td className="p-4 font-bold text-navy">{tier.qty}</td>
                      <td className="p-4 font-black text-gold text-lg">{tier.price}</td>
                      <td className="p-4 text-gray-600 font-medium">{tier.investment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button 
              onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }}
              className="w-full bg-teal text-white font-black py-4 rounded-xl mt-8 shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-xs"
            >
              Get Custom RFQ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCurtain;