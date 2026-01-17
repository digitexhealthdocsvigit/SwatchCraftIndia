import React, { useState } from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductHanger: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const thumbnails = [
    { label: "Main View", placeholder: "Fabric hangers displayed on showroom wall" },
    { label: "Chrome Hook", placeholder: "Close-up of metal chrome hanger with branded header" },
    { label: "Wooden Set", placeholder: "Wooden hanger with fabric swatch" },
    { label: "Color Story", placeholder: "Multiple hangers showing color coordination" },
    { label: "Showroom", placeholder: "Retail display setup with hangers" }
  ];

  const specs = [
    { s: "Product Type", d: "Fabric Hanger Swatch Display" },
    { s: "Hanger Material", d: "Metal (chrome, matte black, brushed nickel) or Natural wood" },
    { s: "Hanger Size", d: "Standard: 12-15 inches wide, Premium: 18 inches" },
    { s: "Swatch Size", d: "Standard: 15x15cm, Large: 20x20cm, Custom sizes available" },
    { s: "Header Card", d: "Printed cardstock (300 GSM) with logo and fabric information" },
    { s: "Attachment Method", d: "Professional stitching or fabric-safe clips" },
    { s: "Hook Type", d: "Swivel hook for easy wall mounting" },
    { s: "Label Options", d: "Fabric code, composition, care symbols, price tags" },
    { s: "Customization", d: "Logo, brand colors, QR codes, collection themes" },
    { s: "Best For", d: "Showrooms, retail displays, trade show booths, furniture stores" },
    { s: "MOQ", d: "100 hangers per style" },
    { s: "Sample MOQ", d: "5-10 pieces for display testing" },
    { s: "Lead Time", d: "18-25 days after fabric receipt" },
    { s: "Packaging", d: "Individual poly bags, export cartons with dividers" }
  ];

  const styles = [
    { title: "Chrome Metal Hangers", img: "Polished chrome hanger with fabric", desc: "Professional polished chrome finish for luxury showrooms", features: ["Mirror-finish chrome plating", "Rust-resistant coating", "Smooth edges (no fabric snagging)", "Swivel hook for easy hanging", "Weight capacity: Up to 500g fabric"], best: "High-end furniture stores, luxury fabric showrooms", price: "₹22-25/set" },
    { title: "Matte Black Metal Hangers", img: "Matte black hanger with modern aesthetic", desc: "Contemporary matte black finish for modern showroom aesthetics", features: ["Powder-coated matte finish", "Scratch-resistant surface", "Minimalist design", "Perfect for dark/bold fabrics", "Sleek professional appearance"], best: "Modern furniture brands, contemporary design studios", price: "₹20-23/set" },
    { title: "Natural Wood Hangers", img: "Wooden hanger with rustic appeal", desc: "Premium wooden hangers for classic and traditional showrooms", features: ["Solid wood construction (pine or hardwood)", "Natural wood grain finish", "Eco-friendly option", "Warm, traditional aesthetic", "Can be stained in custom colors"], best: "Traditional furniture stores, heritage brands, eco-conscious brands", price: "₹25-30/set" }
  ];

  const headerOptions = [
    { title: "Simple Logo Header", img: "Clean header with logo only", content: "Company logo, collection name", size: "10x15cm", print: "Full color, matte lamination" },
    { title: "Detailed Info Header", img: "Header with full details", content: "Logo, fabric code, composition, care symbols, price", size: "12x18cm", print: "Full color with optional barcode/QR code" },
    { title: "Seasonal Collection", img: "Themed header for seasons", content: "Collection theme artwork, season, year, logo", size: "15x20cm (oversized)", print: "Premium finish with UV coating" },
    { title: "Minimal Tag Style", img: "Small tag design", content: "Fabric code and logo only", size: "5x8cm (compact)", print: "Simple 2-color print" }
  ];

  const attachmentMethods = [
    { title: "Professional Stitching", img: "Close-up of stitched attachment", desc: "Permanent fabric attachment with industrial stitching", best: "Long-term showroom displays", pros: "Most secure, professional appearance, durable", proc: "Fabric folded over hanger bar and stitched with color-matched thread" },
    { title: "Fabric-Safe Clips", img: "Clip attachment system", desc: "Removable clips allow fabric changes without damage", best: "Frequently updated collections, rental samples", pros: "Reusable hangers, easy fabric swapping, no fabric damage", proc: "Spring-loaded clips hold fabric securely without marks" },
    { title: "Adhesive Mounting", img: "Adhesive backing", desc: "Fabric swatch adhered to rigid card then hung", best: "Lightweight fabrics, promotional displays", pros: "Flat presentation, space-efficient", proc: "Swatch mounted on card backing, card attached to hanger" }
  ];

  const pricingTiers = [
    { qty: "5-10 (sample)", price: "₹80", invest: "₹400-800", ideal: "Display testing" },
    { qty: "25-50", price: "₹35-45", invest: "₹875-2,250", ideal: "Small stores" },
    { qty: "100 (MOQ)", price: "₹22-25", invest: "₹2,200-2,500", ideal: "Standard showroom" },
    { qty: "500+", price: "₹18-22", invest: "₹9,000-11,000", ideal: "Multi-location chains" },
    { qty: "1000+", price: "₹15-18", invest: "₹15,000-18,000", ideal: "Export distributors" }
  ];

  const faqs = [
    { q: "Can I order mixed hanger styles in one order?", a: "Yes, we can mix chrome, matte black, and wood in single orders (minimum 25 per style)." },
    { q: "What if my fabrics are different sizes?", a: "We accommodate custom swatch sizes. Specify dimensions when ordering and we will adjust the header card size accordingly." },
    { q: "Can header cards be double-sided?", a: "Yes, we print double-sided headers (fabric info front, care instructions or brand story on back)." },
    { q: "Do you provide the wall mounting rails?", a: "Rails are available separately or we can recommend standard retail display systems that fit our hook designs." },
    { q: "How do I update fabrics seasonally?", a: "Order hangers with clip attachment for easy fabric swapping, or order new complete sets for permanent displays." },
    { q: "Can swatches be removed for customer takeaway?", a: "We can design tear-off swatches or provide extra unmounted samples for takeaway purposes." },
    { q: "What's the weight limit per hanger?", a: "Metal hangers: up to 500g, Wooden hangers: up to 300g. Suitable for almost all upholstery weights." },
    { q: "Do you ship internationally?", a: "Yes, we export hanger displays worldwide with protective export-grade packaging." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy uppercase">Fabric Hanger Swatches</span>
        </div>
      </nav>

      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div 
              className={`aspect-[4/3] bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200 overflow-hidden relative group transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <div className={`text-center transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'} text-gray-300 group-hover:text-gold p-8`}>
                <svg className="w-20 h-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-bold uppercase tracking-widest text-sm">{thumbnails[activeThumb].placeholder}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {thumbnails.slice(1).map((thumb, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveThumb(idx + 1)} 
                  className={`aspect-square bg-gray-50 rounded-xl border-2 flex items-center justify-center transition-all ${activeThumb === idx + 1 ? 'border-gold ring-4 ring-gold/10' : 'border-transparent hover:border-gray-200'}`}
                >
                  <div className="text-[7px] font-black text-gray-400 text-center uppercase leading-tight px-1">{thumb.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="mb-6">
              <span className="bg-teal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-4 shadow-sm">Best for Showrooms</span>
              <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
                Fabric Hanger Swatches - Professional Showroom Display
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Wall-mount fabric display solutions for showrooms, retail stores, and trade shows. Maximize presentation impact and customer interaction.
              </p>
              
              <ul className="space-y-4 mb-10 text-sm font-semibold text-navy">
                {[
                  { icon: "🛠️", t: "Metal or wooden hanger options" },
                  { icon: "📏", t: "Pre-attached swatches (15x15cm or 20x20cm)" },
                  { icon: "🏷️", t: "Branded header cards with fabric codes" },
                  { icon: "📐", t: "Easy wall-mount display system" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-3">{item.icon}</span> {item.t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 leading-none">Starting from</p>
              <p className="text-3xl font-black text-navy leading-none mt-2">₹18 <span className="text-sm font-bold text-gray-400">/ set</span></p>
              <button onClick={() => setIsPricingModalOpen(true)} className="text-teal text-xs font-bold underline mt-4 hover:text-navy transition-colors inline-block">View Wholesale Pricing</button>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">
                Request Bulk Quote
              </button>
              <button 
                onClick={() => onDownload('Hanger Display Guide')}
                className="text-gray-400 text-[10px] font-bold underline uppercase tracking-widest hover:text-navy transition-colors text-center"
              >
                Download Display Guide PDF
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
            <h3 className="text-2xl font-black text-navy mb-8 uppercase tracking-widest">Wholesale Pricing Guide</h3>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="p-4 text-left">Quantity</th>
                    <th className="p-4 text-left">Price/Hanger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-4 font-bold text-navy">{row.qty}</td>
                      <td className="p-4 font-black text-gold">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button 
              onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }}
              className="w-full bg-teal text-white font-black py-4 rounded-xl mt-8 shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-xs"
            >
              Get Custom RFQ Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHanger;