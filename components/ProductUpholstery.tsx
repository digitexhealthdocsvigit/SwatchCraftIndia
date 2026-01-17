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
    { label: "Main View", placeholder: "Hardbound upholstery swatch book displaying 40 velvet and linen fabric samples" },
    { label: "Binding", placeholder: "Close-up of premium ring-bound mechanism on upholstery fabric album" },
    { label: "Labels", placeholder: "Custom fabric code labels for upholstery samples" },
    { label: "Stacked", placeholder: "Bulk production of hardbound fabric sample books" },
    { label: "Branding", placeholder: "Custom logo embossing on upholstery swatch book cover" }
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
              Professional fabric presentation for furniture manufacturers and showrooms. Custom upholstery fabric swatch books with premium binding.
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
              { title: "Cover Design", options: "Logo printing, brand colors, embossing, foil stamping", img: "Custom logo embossing on upholstery swatch book cover" },
              { title: "Labeling", options: "Fabric codes, composition, care instructions, QR codes", img: "Fabric composition tags and code labels for samples" },
              { title: "Binding & Layout", options: "Ring mechanism, post-bound, hardcover, custom layouts", img: "Variety of binding options for upholstery fabric sample books" }
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="aspect-video bg-white rounded-2xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[10px] group-hover:text-gold transition-colors text-center px-4">
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
          <h2 className="text-3xl md:text-4xl font-black text-center mb-20">Perfect For Furniture Brands</h2>
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
          <p className="mt-8 text-center text-gray-400 text-[11px] font-medium leading-relaxed max-w-2xl mx-auto uppercase tracking-wider">
             ISO Certified Upholstery Sample Book Manufacturer since 1994
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

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-20 uppercase tracking-widest text-sm">Trusted by Global Brands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "SwatchCraft's upholstery books transformed our sales presentations. The quality is exceptional and delivery was exactly on schedule.", n: "Rajesh Kapoor", c: "Premium Furniture Co., Delhi" },
              { q: "We export to Europe and needed export-grade presentation. SwatchCraft delivered perfectly—our buyers were impressed.", n: "Maria Santos", c: "Textile Exporter, Mumbai" },
              { q: "Fast turnaround, excellent customization, and great pricing. We've reordered 3 times already.", n: "Aisha Verma", c: "Interior Designer, Bangalore" }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-sm relative group hover:shadow-xl transition-all h-full">
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

      {/* Final CTA Section */}
      <section className="bg-navy py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Ready to Order Premium Upholstery Swatch Books?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            "Get your custom quote within 24 hours from India's leading fabric catalogue printing specialist"
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>

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
            <h3 className="text-2xl font-black text-navy mb-8">Upholstery Book Pricing Table</h3>
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