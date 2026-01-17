
import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductCurtain: React.FC<Props> = ({ onNavigate }) => {
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
      {/* Breadcrumb */}
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Curtain Fabric Albums</span>
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

      {/* Fabric Types Showcase Section */}
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

      {/* Customization Options Section */}
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

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-navy text-center mb-16">Ideal For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🏭", title: "Curtain Manufacturers", desc: "Showcase seasonal collections to retailers with professional presentation that displays full drape." },
              { icon: "📦", title: "Home Textile Exporters", desc: "Export-ready albums for trade shows. Perfect for presenting ranges to EU and US markets." },
              { icon: "📐", title: "Interior Design Studios", desc: "Presentation kits with detachable pages allowing customers to take swatches home for matching." },
              { icon: "🏪", title: "Showrooms & Retailers", desc: "Display albums for walk-in customers. Large format enables self-service browsing with luxury feel." }
            ].map((use, i) => (
              <div key={i} className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-gold transition-all">
                <div className="text-4xl mb-6">{use.icon}</div>
                <h4 className="text-xl font-bold text-navy mb-4">{use.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size & Format Options */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Available Formats</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="p-6 text-left">Format</th>
                  <th className="p-6 text-left">Dimensions</th>
                  <th className="p-6 text-left">Swatch Size</th>
                  <th className="p-6 text-left">Best For</th>
                  <th className="p-6 text-left">Price Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-navy font-medium">
                {[
                  { f: "A3 Standard", d: "297x420mm", s: "Up to 250x300mm", b: "Standard collections", p: "₹100-120/unit" },
                  { f: "A3+ Large", d: "330x483mm", s: "Up to 280x400mm", b: "Premium presentation", p: "₹120-140/unit" },
                  { f: "Custom Oversized", d: "Up to A2", s: "Custom large", b: "Luxury segment", p: "₹150-180/unit" },
                  { f: "Landscape Format", d: "Custom", s: "Wide fabric", b: "Modern collections", p: "₹110-130/unit" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-black">{row.f}</td>
                    <td className="p-6 text-gray-600">{row.d}</td>
                    <td className="p-6 text-gray-600">{row.s}</td>
                    <td className="p-6 text-gray-500 italic">{row.b}</td>
                    <td className="p-6 font-black text-gold">{row.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">Prices for MOQ 100+. Custom sizes available on request.</p>
        </div>
      </section>

      {/* Album Construction Details */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-navy text-center mb-16">Premium Construction for Delicate Fabrics</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Protective Sleeves", img: "Sleeve detail close-up", items: ["Anti-static PVC prevents fabric cling", "UV-resistant to prevent fading", "Scratch-resistant crystal clarity", "Welded edges (no adhesives)"] },
              { title: "Page Mechanism", img: "Page binding mechanism", items: ["Detachable pages with secure binding", "Post-bound screws for easy changes", "Reinforced holes prevent tearing", "Optional easel-back for display"] },
              { title: "Cover & Spine", img: "Cover variations", items: ["2mm rigid high-density board", "Padded leatherette or fabric covering", "Reinforced protection corners", "Custom foil stamping/embossing"] }
            ].map((sec, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase text-[10px] tracking-widest text-center px-4">
                  {sec.img}
                </div>
                <h4 className="text-xl font-bold text-navy">{sec.title}</h4>
                <ul className="space-y-3">
                  {sec.items.map((it, j) => (
                    <li key={j} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-teal rounded-full mr-3 mt-1.5 shrink-0"></span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Volume Pricing for Curtain Albums</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="p-6 text-left">Order Quantity</th>
                  <th className="p-6 text-left">Price per Album</th>
                  <th className="p-6 text-left">Total Investment</th>
                  <th className="p-6 text-left">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-navy">
                {pricingTiers.map((tier, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold">{tier.qty}</td>
                    <td className="p-6 font-black text-gold text-lg">{tier.price}</td>
                    <td className="p-6 text-gray-600">{tier.investment}</td>
                    <td className="p-6 text-gray-500 italic">{tier.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white rounded-2xl border border-gray-100"><p className="text-[10px] text-gray-400 font-black mb-1 uppercase">USA</p><p className="font-bold text-navy">$6-8 per album</p></div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100"><p className="text-[10px] text-gray-400 font-black mb-1 uppercase">Europe</p><p className="font-bold text-navy">€5.50-7.50 per album</p></div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100"><p className="text-[10px] text-gray-400 font-black mb-1 uppercase">UAE</p><p className="font-bold text-navy">AED 25-35 per album</p></div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Timeline */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-24 uppercase tracking-widest text-sm">Production Roadmap - Curtain Albums</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { s: "Step 1", t: "Design Approval", d: "Days 1-4" },
                { s: "Step 2", t: "Fabric Receipt", d: "Days 5-7" },
                { s: "Step 3", t: "Sleeve Prep", d: "Days 8-12" },
                { s: "Step 4", t: "Fabric Mounting", d: "Days 13-22" },
                { s: "Step 5", t: "Album Assembly", d: "Days 23-26" },
                { s: "Step 6", t: "Dispatch", d: "Days 27-30" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-gold font-black shadow-sm group-hover:border-gold group-hover:scale-110 transition-all duration-300 relative z-10 mb-6">
                    {i+1}
                  </div>
                  <h5 className="text-[10px] font-black text-navy uppercase tracking-widest mb-1">{step.s}</h5>
                  <p className="text-xs font-bold text-gray-900 leading-tight mb-2 h-10 flex items-center justify-center px-2">{step.t}</p>
                  <p className="text-gold text-[10px] font-black">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-20">Trusted by Leading Curtain Brands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "The large format makes a huge difference in our showroom. Customers can truly see the fabric drape and texture. Sales have increased 30%.", n: "Priya Sharma", c: "Elite Window Fashions, Mumbai" },
              { q: "We export to Dubai and needed premium presentation for luxury hotels. SwatchCraft's albums with gold embossing perfectly matched our image.", n: "Ahmed Al-Mansouri", c: "Arabian Home Textiles, Sharjah" },
              { q: "Detachable pages are genius! Customers take swatches home, and we don't lose the entire album. Lead time was exactly as promised.", n: "Aisha Verma", c: "Design Studio, Bangalore" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm relative group hover:shadow-xl transition-all flex flex-col h-full">
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

      {/* Comparison with Competitors */}
      <section className="py-24 px-4 bg-white overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-widest text-sm">Why Choose SwatchCraft?</h2>
          <table className="w-full text-sm border-collapse rounded-3xl overflow-hidden border border-gray-100">
            <thead className="bg-gray-50 text-navy text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-6 text-left border-b border-gray-100">Feature</th>
                <th className="p-6 text-left border-b border-gold bg-gold/5">SwatchCraft India</th>
                <th className="p-6 text-left border-b border-gray-100">China Suppliers</th>
                <th className="p-6 text-left border-b border-gray-100">USA Suppliers</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 font-medium">
              {[
                { f: "Price (MOQ 500+)", s: "₹90-110 / $6-8", c: "$5-7", u: "$8-12" },
                { f: "Lead Time", s: "24-30 days", c: "35-50 days", u: "25-35 days" },
                { f: "Customization", s: "Full white-label", c: "Limited options", u: "Full custom" },
                { f: "MOQ", s: "40 albums", c: "500 albums", u: "100 albums" },
                { f: "Fabric Handling", s: "Expert (30+ years)", c: "Standard", u: "Expert" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 border-b border-gray-50 font-bold text-navy">{row.f}</td>
                  <td className="p-6 border-b border-gold/20 bg-gold/[0.02] text-teal font-black">{row.s}</td>
                  <td className="p-6 border-b border-gray-50">{row.c}</td>
                  <td className="p-6 border-b border-gray-50">{row.u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical FAQ (Curtain-Specific) */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Technical FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-navy leading-tight">{faq.q}</span>
                  <span className={`text-gold transform transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
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
          <p className="mt-10 text-white/40 text-[10px] font-bold uppercase tracking-widest">Free design mockup with quotes over ₹10,000</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Pricing Modal */}
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
            <p className="mt-6 text-xs text-gray-500 italic leading-relaxed">
              * Final pricing depends on format size, sleeve quantity, and customization level. Export pricing varies based on current shipping rates.
            </p>
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
