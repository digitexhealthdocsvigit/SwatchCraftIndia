import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductUpholstery: React.FC<Props> = ({ onNavigate }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const thumbnails = [
    { label: "Main View", placeholder: "Upholstery swatch book open on desk" },
    { label: "Binding", placeholder: "Close-up of binding" },
    { label: "Labels", placeholder: "Fabric label detail" },
    { label: "Stacked", placeholder: "Multiple books stacked" },
    { label: "Branding", placeholder: "Custom branding example" }
  ];

  const specs = [
    { s: "Product Type", d: "Upholstery Fabric Swatch Book" },
    { s: "Binding Options", d: "Hardbound, Ring-bound, Post-bound" },
    { s: "Swatch Capacity", d: "20-60 fabric samples" },
    { s: "Standard Sizes", d: "A4 (210x297mm), A5 (148x210mm), Custom" },
    { s: "Cover Material", d: "300 GSM cardstock, leatherette, or custom" },
    { s: "Label Options", d: "Printed fabric codes, composition tags, care instructions" },
    { s: "Customization", d: "Logo printing, custom covers, header cards" },
    { s: "Fabric Types", d: "Velvet, linen, jacquard, chenille, polyester, cotton" },
    { s: "MOQ", d: "50 books per collection" },
    { s: "Sample MOQ", d: "1-5 pieces for testing" },
    { s: "Lead Time", d: "21-28 days after fabric receipt" },
    { s: "Export Packaging", d: "Shrink-wrapped, corner protection, carton labeling" }
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
      {/* Breadcrumb */}
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Upholstery Swatch Books</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 lg:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Product Gallery */}
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
                  <div className="text-[8px] font-black text-gray-400 text-center uppercase leading-tight px-1">
                    {thumb.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="bg-navy text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular Product</span>
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                <span className="text-gray-400 text-[10px] font-bold ml-2 uppercase tracking-tighter">4.8/5 (32 reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
              Premium Upholstery Swatch Books
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Professional fabric presentation for furniture manufacturers and showrooms.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Hardbound, ring-bound, or post-bound formats",
                "Capacity: 20-60 fabric swatches",
                "Custom logo and branding",
                "Professional fabric code labels",
                "Export-quality finishing"
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
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Price per unit</p>
                  <p className="text-3xl font-black text-navy leading-none">Starting from ₹70</p>
                  <p className="text-gold text-xs font-bold mt-2">Request Quote for Volume Pricing</p>
                  <button 
                    onClick={() => setIsPricingModalOpen(true)}
                    className="text-teal text-xs font-bold underline mt-2 hover:text-navy transition-colors"
                  >
                    View Full Pricing Table
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">MOQ</span>
                    <span className="text-navy font-bold text-xs">50 Books</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Lead Time</span>
                    <span className="text-navy font-bold text-xs">21-28 Days</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Sample</span>
                    <span className="text-navy font-bold text-xs">₹300/pc</span>
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
              <button className="text-gray-400 text-xs font-bold underline hover:text-navy transition-colors text-center">
                Download Product Spec Sheet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table Section */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy mb-12 text-center">Product Specifications</h2>
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

      {/* Customization Options Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Full White-Label Customization</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Cover Design", options: "Logo printing, brand colors, embossing, foil stamping", img: "Custom cover examples" },
              { title: "Labeling", options: "Fabric codes, composition, care instructions, QR codes", img: "Label examples" },
              { title: "Binding & Layout", options: "Ring mechanism, post-bound, hardcover, custom layouts", img: "Binding types" }
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="aspect-video bg-white rounded-2xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[10px] group-hover:text-gold transition-colors">
                  {card.img}
                </div>
                <h4 className="text-xl font-bold text-navy mb-4">{card.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{card.options}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-navy text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-20">Perfect For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🛋️", title: "Furniture Manufacturers", desc: "Showcase your upholstery fabric range to retailers and B2B clients with professional presentation" },
              { icon: "🎨", title: "Interior Designers", desc: "Portable sample kits for client presentations and project specifications" },
              { icon: "🏢", title: "Fabric Wholesalers", desc: "Sales tools for your distribution network and international buyers" },
              { icon: "🌐", title: "Export Brands", desc: "Export-ready presentation for trade shows and international markets" }
            ].map((use, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-6">{use.icon}</div>
                <h4 className="text-xl font-bold mb-4">{use.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Construction Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Materials & Construction</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Cover Options", items: ["300 GSM premium cardstock", "Leatherette (various colors)", "Fabric-covered boards", "Custom materials on request"] },
              { title: "Binding Mechanisms", items: ["3-ring D-ring binder", "4-ring mechanism", "Post-bound screw system", "Hardbound spine"] },
              { title: "Interior Pages", items: ["Transparent protective sleeves", "Fabric-safe mounting", "Easy swatch replacement", "Optional detachable pages"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-black text-gold uppercase tracking-widest mb-8 border-b-2 border-gold/10 pb-4">{col.title}</h4>
                <ul className="space-y-4">
                  {col.items.map((it, j) => (
                    <li key={j} className="flex items-start text-gray-600 text-sm font-medium">
                      <span className="w-1.5 h-1.5 bg-teal rounded-full mt-1.5 mr-3 shrink-0"></span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section Table */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Transparent Volume Pricing</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="p-6 text-left">Order Quantity</th>
                  <th className="p-6 text-left">Price per Unit</th>
                  <th className="p-6 text-left">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pricingTiers.map((tier, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold text-navy">{tier.qty}</td>
                    <td className="p-6 font-black text-gold text-xl">{tier.price}</td>
                    <td className="p-6 text-gray-500 italic">{tier.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-center text-gray-400 text-[11px] font-medium leading-relaxed max-w-2xl mx-auto">
            Note: "Prices vary based on customization, binding type, and swatch count. Request a detailed quote for your specific requirements."
          </p>
          <div className="mt-10 flex justify-center">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-teal text-white px-12 py-4 rounded-xl font-black shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-xs"
            >
              Get My Custom Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Timeline */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-24 uppercase tracking-widest text-sm">Upholstery Book Manufacturing Process</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12">
              {[
                { s: "Step 1", t: "Fabric Receipt & Inspection", d: "Day 0" },
                { s: "Step 2", t: "Design Approval", d: "Days 1-3" },
                { s: "Step 3", t: "Fabric Preparation", d: "Days 4-7" },
                { s: "Step 4", t: "Assembly & Binding", d: "Days 8-18" },
                { s: "Step 5", t: "QC & Packaging", d: "Days 19-21" },
                { s: "Step 6", t: "Dispatch", d: "Days 21-28" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-gold font-black shadow-sm group-hover:border-gold group-hover:scale-110 transition-all duration-300 relative z-10 mb-6">
                    {i+1}
                  </div>
                  <h5 className="text-[10px] font-black text-navy uppercase tracking-widest mb-1">{step.s}</h5>
                  <p className="text-sm font-bold text-gray-900 leading-tight mb-2 h-10 flex items-center justify-center px-2">{step.t}</p>
                  <p className="text-gold text-[10px] font-black">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-20 uppercase tracking-widest text-sm">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "SwatchCraft's upholstery books transformed our sales presentations. The quality is exceptional and delivery was exactly on schedule.", n: "Rajesh Kapoor", c: "Premium Furniture Co., Delhi" },
              { q: "We export to Europe and needed export-grade presentation. SwatchCraft delivered perfectly—our buyers were impressed.", n: "Maria Santos", c: "Textile Exporter, Mumbai" },
              { q: "Fast turnaround, excellent customization, and great pricing. We've reordered 3 times already.", n: "Aisha Verma", c: "Interior Designer, Bangalore" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm relative group hover:shadow-xl transition-all h-full">
                <span className="text-6xl text-gold/10 absolute top-4 left-4 font-serif">"</span>
                <div className="flex text-gold text-xs mb-6">★★★★★</div>
                <p className="text-gray-600 italic text-sm mb-8 leading-relaxed relative z-10 font-medium">{t.q}</p>
                <div className="mt-auto">
                  <h6 className="font-black text-navy text-sm uppercase tracking-wider">{t.n}</h6>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{t.c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-black text-navy mb-12 uppercase tracking-widest text-center">Complete Your Fabric Presentation</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Curtain Fabric Albums", price: "₹120", placeholder: "Curtain Album" },
              { title: "Fabric Hanger Swatches", price: "₹45", placeholder: "Fabric Hangers" },
              { title: "Sample Cards & Storyboards", price: "₹15", placeholder: "Sample Cards" }
            ].map((p, i) => (
              <div key={i} className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all cursor-pointer">
                <div className="aspect-[4/3] bg-white rounded-xl mb-6 flex items-center justify-center text-gray-300 font-black uppercase text-[10px] group-hover:text-gold transition-colors">
                  {p.placeholder}
                </div>
                <h4 className="font-bold text-navy mb-2">{p.title}</h4>
                <p className="text-gray-400 text-xs mb-6 uppercase tracking-widest font-bold">Starts from {p.price}</p>
                <button 
                  onClick={() => onNavigate('products-overview')}
                  className="text-teal text-[10px] font-black uppercase tracking-widest group-hover:text-navy"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-navy py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Ready to Order Premium Upholstery Swatch Books?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            "Get your custom quote within 24 hours"
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-teal text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-teal transition-all text-lg"
            >
              Request Quote
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all text-lg">
              Download Spec Sheet
            </button>
          </div>
        </div>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 shadow-2xl z-[60] flex gap-3">
        <button 
          onClick={() => onNavigate('contact-page')}
          className="flex-grow bg-teal text-white font-black py-4 rounded-xl shadow-lg active:scale-95 transition-all uppercase tracking-widest text-xs"
        >
          Request Quote
        </button>
      </div>

      {/* Pricing Modal */}
      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-navy/80 flex items-center justify-center p-4 z-[100] animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative">
            <button 
              onClick={() => setIsPricingModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-black text-navy mb-8">Full Pricing Table</h3>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="p-4 text-left">Order Quantity</th>
                    <th className="p-4 text-left">Price per Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((tier, i) => (
                    <tr key={i}>
                      <td className="p-4 font-bold text-navy">{tier.qty}</td>
                      <td className="p-4 font-black text-gold text-lg">{tier.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-xs text-gray-500 italic leading-relaxed">
              * Final pricing depends on binding type, cover material, and total swatch count. Contact our export team for a formal quote.
            </p>
            <button 
              onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }}
              className="w-full bg-teal text-white font-black py-4 rounded-xl mt-8 shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-xs"
            >
              Get Custom Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpholstery;