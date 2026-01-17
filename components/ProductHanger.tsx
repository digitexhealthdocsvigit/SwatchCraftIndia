import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductHanger: React.FC<Props> = ({ onNavigate }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const thumbnails = [
    { label: "Main View", placeholder: "Fabric hangers displayed on showroom wall" },
    { label: "Chrome Detail", placeholder: "Metal chrome hanger with branded header" },
    { label: "Wooden Hanger", placeholder: "Wooden hanger with fabric swatch" },
    { label: "Coordination", placeholder: "Multiple hangers showing color coordination" },
    { label: "Retail Setup", placeholder: "Retail display setup with hangers" }
  ];

  const specs = [
    { s: "Product Type", d: "Fabric Hanger Swatch Display" },
    { s: "Hanger Material", d: "Metal (chrome, matte black, brushed nickel) or Natural wood" },
    { s: "Hanger Size", d: "Standard: 12-15 inches wide, Premium: 18 inches" },
    { s: "Swatch Size", d: "Standard: 15x15cm, Large: 20x20cm, Custom sizes available" },
    { s: "Header Card", d: "Printed cardstock (300 GSM) with logo and fabric info" },
    { s: "Attachment Method", d: "Professional stitching or fabric-safe clips" },
    { s: "Hook Type", d: "Swivel hook for easy wall mounting" },
    { s: "Label Options", d: "Fabric code, composition, care symbols, price tags" },
    { s: "Customization", d: "Logo, brand colors, QR codes, collection themes" },
    { s: "Best For", d: "Showrooms, retail displays, trade shows, furniture stores" },
    { s: "MOQ", d: "100 hangers per style" },
    { s: "Lead Time", d: "18-25 days after fabric receipt" },
    { s: "Packaging", d: "Individual poly bags, export cartons with dividers" }
  ];

  const pricingTiers = [
    { qty: "5-10 (sample)", price: "₹80", invest: "₹400-800", use: "Display testing" },
    { qty: "25-50", price: "₹35-45", invest: "₹875-2,250", use: "Small stores" },
    { qty: "100 (MOQ)", price: "₹22-25", invest: "₹2,200-2,500", use: "Standard showroom" },
    { qty: "500+", price: "₹18-22", invest: "₹9,000-11,000", use: "Retail chains" },
    { qty: "1000+", price: "₹15-18", invest: "₹15,000-18,000", use: "Export distributors" }
  ];

  const faqs = [
    { q: "Can I order mixed hanger styles in one order?", a: "Yes, we can mix chrome, matte black, and wood in single orders (minimum 25 per style)." },
    { q: "What if my fabrics are different sizes?", a: "We accommodate custom swatch sizes. Please specify exact dimensions when requesting a quote." },
    { q: "Can header cards be double-sided?", a: "Yes, we print double-sided headers (fabric info on front, care instructions on back) as standard." },
    { q: "Do you provide the wall mounting rails?", a: "Rails are available separately or we can recommend standard retail display systems that fit our hooks." },
    { q: "How do I update fabrics seasonally?", a: "Order hangers with our clip attachment system for easy fabric swapping, or order new complete sets." },
    { q: "Can swatches be removed for customer takeaway?", a: "We can design tear-off swatches or provide extra unmounted samples for this purpose." },
    { q: "What's the weight limit per hanger?", a: "Metal hangers support up to 500g, while wooden hangers are best for up to 300g fabrics." },
    { q: "Do you ship internationally?", a: "Yes, we export hanger displays worldwide with specialized protective packaging and full documentation." }
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
          <span className="text-navy uppercase">Fabric Hanger Swatches</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 lg:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200 overflow-hidden relative group">
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

          {/* Details */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <span className="bg-teal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-4">Best for Showrooms</span>
              <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
                Fabric Hanger Swatches - Professional Showroom Display
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Wall-mount fabric display solutions for showrooms, retail stores, and trade shows. Designed to maximize tactile browsing and visual merchandising impact.
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                {[
                  "Metal (chrome, matte black) or wood",
                  "15x15cm or 20x20cm swatches",
                  "Branded header cards",
                  "Easy wall-mount system",
                  "Perfect for visual merchandising",
                  "Custom logo & colors"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-navy font-semibold text-sm">
                    <span className="w-5 h-5 bg-teal/10 text-teal rounded-full flex items-center justify-center mr-3 text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Starting from</p>
                  <p className="text-3xl font-black text-navy leading-none">₹18 <span className="text-sm text-gray-400 font-bold">/ set</span></p>
                  <button 
                    onClick={() => setIsPricingModalOpen(true)}
                    className="text-teal text-xs font-bold underline mt-2 hover:text-navy transition-colors block"
                  >
                    View Wholesale Pricing
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">MOQ</span>
                    <span className="text-navy font-bold text-xs">100 hangers</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Lead Time</span>
                    <span className="text-navy font-bold text-xs">18-25 days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">
                Request Bulk Quote
              </button>
              <a href="https://wa.me/910000000000" className="border-2 border-[#25D366] text-[#25D366] font-bold py-4 rounded-xl text-center hover:bg-[#25D366] hover:text-white transition-all text-xs uppercase tracking-widest">
                WhatsApp for Showroom Setup
              </a>
              <button className="text-gray-400 text-xs font-bold underline hover:text-navy transition-colors text-center">
                Download Display Guide PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specification Table */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy mb-12 text-center">Technical Specifications</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-100">
                {specs.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-navy w-1/3 bg-gray-50">{row.s}</td>
                    <td className="py-4 px-6 text-gray-600">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hanger Style Options */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-navy text-center mb-16">Choose Your Display Style</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "STYLE 1: Chrome Metal", 
                placeholder: "Polished chrome hanger with fabric",
                desc: "Professional polished chrome finish for luxury showrooms.", 
                features: ["Mirror-finish chrome plating", "Rust-resistant coating", "Smooth snag-free edges", "Swivel hook", "Weight capacity: 500g"],
                best: "High-end furniture stores",
                price: "₹22-25/set"
              },
              { 
                title: "STYLE 2: Matte Black", 
                placeholder: "Matte black hanger with modern aesthetic",
                desc: "Contemporary finish for modern showroom aesthetics.", 
                features: ["Powder-coated matte finish", "Scratch-resistant", "Minimalist design", "Perfect for bold fabrics", "Sleek professional look"],
                best: "Contemporary design studios",
                price: "₹20-23/set"
              },
              { 
                title: "STYLE 3: Natural Wood", 
                placeholder: "Wooden hanger with rustic appeal",
                desc: "Premium wooden hangers for classic and traditional showrooms.", 
                features: ["Solid wood (pine/hardwood)", "Natural wood grain", "Eco-friendly option", "Warm, traditional feel", "Stainable in custom colors"],
                best: "Traditional furniture stores",
                price: "₹25-30/set"
              }
            ].map((style, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-gold transition-all flex flex-col group">
                <div className="aspect-[4/3] bg-white rounded-2xl mb-8 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-[9px] group-hover:text-gold border border-gray-100 text-center px-4">
                  {style.placeholder}
                </div>
                <h4 className="text-xl font-bold text-navy mb-4 leading-tight">{style.title}</h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">{style.desc}</p>
                <ul className="space-y-2 mb-8">
                  {style.features.map((f, j) => (
                    <li key={j} className="text-xs text-navy font-medium flex items-center">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span> {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-200">
                   <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Best For: {style.best}</p>
                   <p className="text-gold font-black text-lg">{style.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Header Card Customization */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black text-navy mb-16">Branded Header Cards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Simple Logo", img: "Clean header with logo only", details: "Company logo + Collection name. 10x15cm. Matte lamination." },
              { name: "Detailed Info", img: "Header with full details", details: "Logo + Code + Composition + Care + Price. 12x18cm. Barcodes." },
              { name: "Seasonal Theme", img: "Themed header for seasons", details: "Full artwork + Season/Year. 15x20cm oversized. UV coating." },
              { name: "Minimal Tag", img: "Small tag design", details: "Fabric code + Logo only. 5x8cm compact. 2-color print." }
            ].map((opt, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm group">
                <div className="aspect-video bg-gray-50 rounded-xl mb-4 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-[8px] group-hover:text-gold transition-colors text-center px-2 border border-gray-100">
                  {opt.img}
                </div>
                <h5 className="font-bold text-navy mb-2">{opt.name}</h5>
                <p className="text-gray-500 text-[10px] leading-relaxed">{opt.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attachment Methods */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Professional Fabric Mounting</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                method: "Method 1: Professional Stitching", 
                img: "Close-up of stitched attachment", 
                desc: "Permanent attachment with industrial stitching.", 
                pros: "Most secure, professional, durable.",
                process: "Fabric folded over bar and stitched with color-matched thread."
              },
              { 
                method: "Method 2: Fabric-Safe Clips", 
                img: "Clip attachment system", 
                desc: "Removable clips for fabric changes without damage.", 
                pros: "Reusable hangers, easy swapping, no damage.",
                process: "Spring-loaded clips hold fabric securely without marks."
              },
              { 
                method: "Method 3: Adhesive Mounting", 
                img: "Adhesive backing", 
                desc: "Fabric swatch adhered to rigid card then hung.", 
                pros: "Flat presentation, space-efficient.",
                process: "Swatch mounted on card backing, card attached to hanger."
              }
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-full aspect-square bg-gray-50 rounded-3xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[9px]">
                  {m.img}
                </div>
                <h4 className="text-xl font-bold text-navy mb-4">{m.method}</h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{m.desc}</p>
                <div className="bg-teal/5 p-4 rounded-xl w-full">
                  <p className="text-[10px] text-teal font-black uppercase tracking-widest mb-1">Process</p>
                  <p className="text-gray-500 text-xs font-medium">{m.process}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-navy text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">Perfect Display Solutions For</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: "🛋️", title: "Furniture Showrooms", desc: "Wall displays create browsable libraries. Typical order: 200-500 sets." },
              { icon: "🏬", title: "Retail Stores", desc: "Vertical display maximizes wall space for curtains. Typical order: 150-300 sets." },
              { icon: "🏗️", title: "Trade Shows", desc: "Portable backdrop walls. Professional and easy setup. Typical: 50-100 sets." },
              { icon: "💼", title: "Sales Teams", desc: "Compact sets transported in garment bags for client meetings. Typical: 20-50 sets." },
              { icon: "📐", title: "Design Studios", desc: "Organized library for color coordination consultations. Typical: 100-200 sets." }
            ].map((use, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors text-center flex flex-col">
                <div className="text-4xl mb-6">{use.icon}</div>
                <h4 className="text-lg font-bold mb-4 leading-tight">{use.title}</h4>
                <p className="text-gray-400 text-[10px] leading-relaxed flex-grow">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Display System Options */}
      <section className="py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Complete Wall Display Solutions</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Configuration 1: Single Row", 
                img: "Single row of hangers on wall", 
                specs: ["One rail system (20-30 hangers)", "6-8 ft wall space required", "Best for small showrooms"] 
              },
              { 
                title: "Configuration 2: Multi-Tier", 
                img: "Multiple rows of hangers", 
                specs: ["3-4 rail system (60-120 hangers)", "8-10 ft wall space required", "Best for full collections"] 
              },
              { 
                title: "Configuration 3: Rotating Stand", 
                img: "Free-standing rotating rack", 
                specs: ["Floor stand (40-60 hangers)", "3x3 ft footprint", "Best for trade shows/boutiques"] 
              }
            ].map((cfg, i) => (
              <div key={i} className="group">
                <div className="aspect-video bg-gray-50 rounded-2xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[8px] group-hover:text-gold transition-colors text-center px-4">
                  {cfg.img}
                </div>
                <h4 className="text-xl font-bold text-navy mb-4 leading-tight">{cfg.title}</h4>
                <ul className="space-y-2">
                   {cfg.specs.map((s, j) => (
                     <li key={j} className="text-gray-500 text-xs flex items-center">
                       <span className="w-1 h-1 bg-gold rounded-full mr-2"></span> {s}
                     </li>
                   ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Strategies */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Organize Your Fabric Display</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Color Gradient", img: "Hangers arranged by color spectrum", desc: "Arrange fabrics from light to dark or by family for visual impact." },
              { title: "Collection Grouping", img: "Grouped by collection", desc: "Organize by seasons or fabric types with header separators." },
              { title: "Fabric Categories", img: "Organized by texture", desc: "Group similar textures (e.g. all velvets together) for easy comparison." },
              { title: "Price Point Zones", img: "Organized by price", desc: "Arrange by ranges to help budget-conscious customers find options quickly." }
            ].map((strat, i) => (
              <div key={i} className="text-center">
                <div className="aspect-square bg-white rounded-3xl mb-6 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[8px] p-4 text-center">
                  {strat.img}
                </div>
                <h5 className="font-bold text-navy mb-2 text-sm">{strat.title}</h5>
                <p className="text-gray-500 text-[10px] leading-relaxed">{strat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Volume Pricing for Hanger Swatches</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="p-6 text-left">Order Quantity</th>
                  <th className="p-6 text-left">Price per Hanger</th>
                  <th className="p-6 text-left">Total Investment</th>
                  <th className="p-6 text-left">Ideal For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-navy">
                {pricingTiers.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold">{p.qty}</td>
                    <td className="p-6 font-black text-gold text-lg">{p.price}</td>
                    <td className="p-6 text-gray-600">{p.invest}</td>
                    <td className="p-6 italic text-gray-400">{p.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100"><p className="text-[10px] text-gray-400 font-black mb-1 uppercase">USA</p><p className="font-bold text-navy">$1.50-2.50 / set</p></div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100"><p className="text-[10px] text-gray-400 font-black mb-1 uppercase">Europe</p><p className="font-bold text-navy">€1.40-2.30 / set</p></div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100"><p className="text-[10px] text-gray-400 font-black mb-1 uppercase">UAE</p><p className="font-bold text-navy">AED 6-9 / set</p></div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Timeline */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-24 uppercase tracking-widest text-sm">Hanger Swatch Manufacturing Process</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { s: "Step 1", t: "Design Approval", d: "Days 1-3" },
                { s: "Step 2", t: "Hanger Prep", d: "Days 4-8" },
                { s: "Step 3", t: "Fabric Processing", d: "Days 9-15" },
                { s: "Step 4", t: "Header Printing", d: "Days 10-14" },
                { s: "Step 5", t: "Assembly", d: "Days 16-22" },
                { s: "Step 6", t: "Packaging", d: "Days 23-25" }
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

      {/* Showroom Transformations */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Real Showroom Transformations</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                client: "Luxury Furnishings, Delhi", 
                before: "Fabric swatches in folders on counter", 
                after: "Organized wall display with chrome hangers", 
                stats: "250 installed. Sales conversion up 25%." 
              },
              { 
                client: "Window World, Bangalore", 
                before: "Messy fabric samples in drawers", 
                after: "Multi-tier matte black hanger display", 
                stats: "400 installed. Capacity for 400+ fabrics." 
              },
              { 
                client: "Export Textiles India, Mumbai", 
                before: "Bulky fabric books on tables", 
                after: "Portable backdrop with wooden hangers", 
                stats: "80 hangers. Lead gen up 60% at shows." 
              }
            ].map((ex, i) => (
              <div key={i} className="space-y-6 flex flex-col">
                <div className="aspect-video bg-gray-200 rounded-3xl flex items-center justify-center text-gray-400 font-bold uppercase text-[9px] tracking-widest p-4 text-center border border-gray-300">
                  Before/After Visual: {ex.client}
                </div>
                <h4 className="font-bold text-navy">{ex.client}</h4>
                <div className="space-y-2 flex-grow">
                   <p className="text-xs font-medium text-gray-500"><span className="text-red-400 font-black mr-2">BEFORE:</span> {ex.before}</p>
                   <p className="text-xs font-bold text-navy"><span className="text-teal font-black mr-2">AFTER:</span> {ex.after}</p>
                </div>
                <p className="text-[10px] font-black text-gold uppercase tracking-widest">{ex.stats}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-white overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-widest text-sm">Why SwatchCraft Hanger Swatches?</h2>
          <table className="w-full text-sm border-collapse rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <thead className="bg-gray-50 text-navy text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-6 text-left border-b border-gray-100">Feature</th>
                <th className="p-6 text-left border-b border-gold bg-gold/5">SwatchCraft</th>
                <th className="p-6 text-left border-b border-gray-100">DIY Solution</th>
                <th className="p-6 text-left border-b border-gray-100">Import from China</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 font-medium">
              {[
                { f: "Cost per hanger", s: "₹18-25", d: "₹30-40 (mat)", c: "₹15-20" },
                { f: "Lead Time", s: "18-25 days", d: "Immediate (labor)", c: "35-50 days" },
                { f: "Quality Control", s: "Professional QC", d: "Variable", c: "Inconsistent" },
                { f: "Customization", s: "Full branding", d: "Limited", c: "Limited" },
                { f: "Consistency", s: "Perfect matching", d: "Varies per batch", c: "Often varies" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 border-b border-gray-50 font-bold text-navy">{row.f}</td>
                  <td className="p-6 border-b border-gold/20 bg-gold/[0.02] text-teal font-black">{row.s}</td>
                  <td className="p-6 border-b border-gray-50 italic">{row.d}</td>
                  <td className="p-6 border-b border-gray-50">{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical FAQ */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-widest text-sm">Technical FAQ</h2>
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
      <section className="bg-teal py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Transform Your Showroom Display Today</h2>
          <p className="text-white/80 text-lg mb-12 font-medium">
            Request a custom quote for branded fabric hanger swatches designed for your unique collection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-navy text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-navy transition-all uppercase tracking-widest text-xs"
            >
              Get Showroom Quote
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">
              Order Sample Set (₹400)
            </button>
          </div>
          <p className="mt-10 text-white/40 text-[10px] font-bold uppercase tracking-widest">Free display layout consultation for orders 200+ hangers</p>
        </div>
        {/* Abstract shape */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Wholesale Pricing Modal */}
      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-navy/80 flex items-center justify-center p-4 z-[100] animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsPricingModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-black text-navy mb-8">Wholesale Pricing Guide</h3>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="p-4 text-left">Order Quantity</th>
                    <th className="p-4 text-left">Price per Hanger</th>
                    <th className="p-4 text-left">Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((tier, i) => (
                    <tr key={i}>
                      <td className="p-4 font-bold text-navy">{tier.qty}</td>
                      <td className="p-4 font-black text-gold text-lg">{tier.price}</td>
                      <td className="p-4 text-gray-600 font-medium">{tier.invest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-xs text-gray-500 italic leading-relaxed">
              * Prices are per complete hanger set (hanger + printed header + mounted fabric). GST and shipping additional. Custom sizes may vary pricing.
            </p>
            <button 
              onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }}
              className="w-full bg-teal text-white font-black py-4 rounded-xl mt-8 shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-xs"
            >
              Request Custom RFQ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHanger;