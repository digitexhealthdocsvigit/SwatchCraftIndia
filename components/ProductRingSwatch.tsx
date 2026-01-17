import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductRingSwatch: React.FC<Props> = ({ onNavigate }) => {
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
    { label: "Orientation", value: "Landscape or Portrait" },
    { label: "Cover Material", value: "Heavy-duty cardstock, vinyl, or leatherette" },
    { label: "Page Material", value: "200 GSM cardstock or plastic sleeves" },
    { label: "Customization", value: "Logo, company name, collection branding" },
    { label: "Label Options", value: "Fabric codes, QR codes, pricing tags" },
    { label: "Protective Case", value: "Optional vinyl zippered case" },
    { label: "Weight", value: "200-400g (ultra-portable)" },
    { label: "Dimensions", value: "Landscape: 15x11cm, Portrait: 11x15cm, Custom" },
    { label: "MOQ", value: "75 sets per collection" },
    { label: "Sample MOQ", value: "5-10 sets for testing" },
    { label: "Lead Time", value: "15-20 days after fabric receipt" },
    { label: "Packaging", value: "Individual poly bags or protective cases" }
  ];

  const formats = [
    {
      title: "FORMAT 1: Landscape Ring Set",
      placeholder: "Landscape ring set open",
      dims: "15x11cm (A6 landscape)",
      swatch: "12x10cm",
      cap: "20-30 swatches",
      best: ["Wide fabric swatches", "Horizontal pattern display", "Modern contemporary collections"],
      features: ["Lies flat when open", "Easy one-handed flipping", "Compact width for bags"],
      price: "₹20-25"
    },
    {
      title: "FORMAT 2: Portrait Ring Set",
      placeholder: "Portrait ring set",
      dims: "11x15cm (A6 portrait)",
      swatch: "10x12cm",
      cap: "25-35 swatches",
      best: ["Vertical fabric orientation", "Traditional swatch presentation", "Curtain fabric collections"],
      features: ["Standard ring binder format", "Easier to add/remove pages", "Stackable storage"],
      price: "₹18-23"
    },
    {
      title: "FORMAT 3: Mini Travel Set",
      placeholder: "Compact mini set",
      dims: "10x10cm (square compact)",
      swatch: "8x8cm",
      cap: "15-20 swatches",
      best: ["Ultra-portable carry", "Quick color references", "Pocket-sized convenience"],
      features: ["Fits in jacket pocket", "Lightweight (150g)", "Perfect for quick meetings"],
      price: "₹15-20"
    }
  ];

  const bindingSystems = [
    { title: "Standard 2-Ring Binding", placeholder: "2-ring mechanism", size: "25mm or 32mm", features: ["Simple, reliable mechanism", "Easy swatch addition/removal", "Compact profile", "Budget-friendly option"], cap: "Up to 30 swatches", best: "Standard fabric collections" },
    { title: "Heavy-Duty 3-Ring Binding", placeholder: "3-ring mechanism", size: "32mm or 38mm", features: ["Extra stability for larger sets", "Professional appearance", "Better page alignment", "Premium feel"], cap: "Up to 40+ swatches", best: "Extensive collections, premium brands" },
    { title: "Clip Ring System", placeholder: "Clip ring detail", size: "Variable", features: ["Quick page changes", "No threading required", "Sales team friendly", "Easy customer removal for inspection"], cap: "Up to 35 swatches", best: "Frequently updated collections" }
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
          <span className="text-navy uppercase">Ring Swatch Sample Sets</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Product Gallery */}
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

          {/* RIGHT: Product Details */}
          <div>
            <span className="bg-teal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-6 shadow-sm">Perfect for Sales Teams</span>
            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
              Ring Swatch Sample Sets - Portable Fabric Presentation Kits
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              Compact, durable sample sets designed for mobile sales teams and trade show presentations.
            </p>
            
            <div className="flex items-center space-x-2 mb-8">
              <div className="flex text-gold text-lg">★★★★★</div>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">4.8/5 (37 reviews)</span>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                "Compact ring-bound format fits in briefcase or travel bag",
                "Capacity: 20-40 fabric swatches per set",
                "Durable metal ring binding for easy flipping",
                "Individual swatches can be removed for customer inspection",
                "Available in landscape or portrait orientation"
              ].map((item, i) => (
                <li key={i} className="flex items-start text-navy font-semibold text-sm">
                  <span className="w-5 h-5 bg-teal/10 text-teal rounded-full flex items-center justify-center mr-3 text-[10px] shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 leading-none">Starting from</p>
                  <p className="text-3xl font-black text-navy leading-none mt-2">₹20 <span className="text-sm font-bold text-gray-400">/ set</span></p>
                  <p className="text-gold text-[10px] font-bold mt-4 uppercase tracking-widest">Bulk Pricing for Sales Team Orders</p>
                  <button onClick={() => setIsPricingModalOpen(true)} className="text-teal text-xs font-bold underline mt-2 hover:text-navy transition-colors inline-block">View Volume Discounts</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">MOQ</span>
                    <span className="text-navy font-bold text-xs uppercase">75 sets</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Lead Time</span>
                    <span className="text-navy font-bold text-xs uppercase">15-20 Days</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Sample</span>
                    <span className="text-navy font-bold text-xs uppercase">₹80 / Set</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">
                Request Quote for Sales Team
              </button>
              <a href="https://wa.me/910000000000" className="border-2 border-[#25D366] text-[#25D366] font-bold py-4 rounded-xl text-center hover:bg-[#25D366] hover:text-white transition-all text-xs uppercase tracking-widest flex items-center justify-center">
                <span className="mr-2">💬</span> WhatsApp for Quick Quote
              </a>
              <button className="text-gray-400 text-[10px] font-bold underline uppercase tracking-widest hover:text-navy transition-colors text-center">
                Download Product Specifications
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specifications Section */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-12 text-center uppercase tracking-widest">Technical Specifications</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-100">
                {specs.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-navy w-1/3 bg-gray-50/50">{row.label}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Format Options Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Choose Your Ideal Format</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {formats.map((format, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-gold transition-all flex flex-col group shadow-sm hover:shadow-xl">
                <div className="aspect-[4/3] bg-white rounded-2xl mb-8 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-[9px] group-hover:text-gold border border-gray-100 text-center px-4 leading-relaxed transition-colors">
                  {format.placeholder}
                </div>
                <h4 className="text-xl font-bold text-navy mb-2 leading-tight">{format.title}</h4>
                <div className="text-xs text-gray-500 mb-6 flex flex-wrap gap-x-4 gap-y-2 font-medium">
                  <span><strong className="text-navy font-black">Dims:</strong> {format.dims}</span>
                  <span><strong className="text-navy font-black">Capacity:</strong> {format.cap}</span>
                </div>
                <div className="space-y-2 mb-8 flex-grow">
                   <p className="text-[10px] text-gold font-black uppercase tracking-widest mb-3">Key Features:</p>
                   {format.features.map((f, j) => (
                     <li key={j} className="text-[11px] text-navy font-bold flex items-center list-none">
                       <span className="w-1.5 h-1.5 bg-teal rounded-full mr-2 shrink-0"></span> {f}
                     </li>
                   ))}
                </div>
                <div className="pt-6 border-t border-gray-200">
                   <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Price Range:</p>
                   <p className="text-gold font-black text-xl">{format.price} <span className="text-[10px] text-gray-400">/ set</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Durable Binding Systems Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Durable Binding Systems</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {bindingSystems.map((sys, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col group h-full">
                <div className="aspect-video bg-gray-50 rounded-xl mb-6 flex items-center justify-center text-gray-300 font-black uppercase text-[8px] group-hover:text-gold transition-colors">
                  {sys.placeholder}
                </div>
                <h4 className="text-xl font-bold text-navy mb-2">{sys.title}</h4>
                <p className="text-gold font-black text-[10px] uppercase tracking-widest mb-4">Ring Dia: {sys.size}</p>
                <ul className="space-y-2 mb-8 flex-grow">
                  {sys.features.map((f, j) => (
                    <li key={j} className="text-xs text-gray-500 font-medium flex items-center"><span className="w-1 h-1 bg-teal rounded-full mr-2 shrink-0"></span>{f}</li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-50">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Capacity: {sys.cap}</p>
                  <p className="text-navy font-bold text-[11px] leading-tight">Best for: {sys.best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Customization Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Complete Branding Customization</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { t: "Cover Design", img: "Various custom covers", opts: ["Logo (embossed/printed)", "Brand colors", "Collection name", "QR codes", "Premium materials"] },
              { t: "Swatch Labeling", img: "Labeled swatch examples", opts: ["Fabric code & name", "Composition %", "Care symbols", "Price codes", "Color variants"] },
              { t: "Index/Dividers", img: "Collection dividers", opts: ["Color-coded tabs", "Collection separators", "Seasonal tabs", "Material: Plastic/Card"] },
              { t: "Protective Case", img: "Zippered case", opts: ["Vinyl zippered case", "Elastic band closure", "Velcro flap case", "Branded embossing"] },
              { t: "Insert Cards", img: "Business card insert", opts: ["Business card pocket", "Company info sheet", "Care instructions", "Order form insert"] }
            ].map((cust, i) => (
              <div key={i} className="text-center group">
                <div className="aspect-square bg-gray-50 border border-gray-100 rounded-3xl mb-6 flex items-center justify-center text-gray-300 font-black uppercase text-[7px] group-hover:border-gold transition-colors p-6 leading-tight">
                  {cust.img}
                </div>
                <h5 className="font-bold text-navy text-sm mb-3">{cust.t}</h5>
                <ul className="text-left space-y-1">
                  {cust.opts.map((opt, j) => (
                    <li key={j} className="text-[10px] text-gray-400 flex items-start"><span className="text-gold mr-1.5">•</span> {opt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed For Mobile Professionals (Use Cases) */}
      <section className="py-24 px-4 bg-[#1a2849] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-widest text-sm">Designed For Mobile Professionals</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: "💼", t: "Sales Representatives", s: "Field sales teams visiting furniture stores", b: ["Ultra-portable", "Durable for daily use", "Professional look"], roi: "35% faster decision-making" },
              { icon: "🏗️", t: "Trade Show Exhibitors", s: "Industry trade show booth traffic", b: ["Compact booth usage", "Multiple sets available", "Easy to transport"], roi: "2x more qualified leads" },
              { icon: "📐", t: "Interior Designers", s: "Client consultations and presentations", b: ["Organized by style", "Color coordination", "Removable swatches"], roi: "Close projects 20% faster" },
              { icon: "🏭", t: "Manufacturer Reps", s: "Meeting with retailers and distributors", b: ["Show full upholstery range", "Updated seasonally", "Manufacturer identity"], roi: "30% increase in order value" },
              { icon: "🌍", t: "Fabric Exporters", s: "International client meetings & shipping", b: ["Lightweight for air ship", "Customs-friendly", "Professional format"], roi: "Win 40% more export contracts" }
            ].map((use, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors flex flex-col h-full">
                <div className="text-4xl mb-6">{use.icon}</div>
                <h5 className="font-bold text-lg mb-2 leading-tight">{use.t}</h5>
                <p className="text-gray-400 text-[10px] italic mb-4 leading-tight">"{use.s}"</p>
                <ul className="space-y-1.5 mb-6 flex-grow">
                   {use.b.map((li, j) => (
                     <li key={j} className="text-[10px] text-gray-300 flex items-center font-medium"><span className="w-1 h-1 bg-teal rounded-full mr-2 shrink-0"></span>{li}</li>
                   ))}
                </ul>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-1">ROI:</p>
                  <p className="text-gold font-black text-[11px]">{use.roi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Swatch Systems (Mounting Options) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-20 uppercase tracking-widest text-sm">Flexible Swatch Systems</h2>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { t: "Method 1: Punched Fabric Swatches", img: "Swatches with punched holes", desc: "Direct fabric mounting with reinforced holes", pros: "Tactile feel, authentic touch, lightweight", cons: "Fabric edges may fray over time", best: "Durable fabrics, authentic presentation", proc: "Cut to size → Edge finish → Metal punch → Direct ring mount" },
              { t: "Method 2: Plastic Sleeve Protection", img: "Fabric in clear sleeves", desc: "Swatches protected in clear plastic sleeves", pros: "Fabric protection, cleaner appearance, reusable", cons: "Slightly bulkier, less tactile", best: "Delicate fabrics, long-term use, trade shows", proc: "Welded sleeves → Fabric insert → Punched for rings" },
              { t: "Method 3: Cardstock Mounted Swatches", img: "Fabric glued to cards", desc: "Swatches adhered to punched cardstock pages", pros: "Neat presentation, space for info, rigid", cons: "Not removable, less tactile", best: "Permanent reference sets, showroom use", proc: "Glued to 200 GSM card → Printed info → Card punch" }
            ].map((method, i) => (
              <div key={i} className="flex flex-col h-full group">
                <div className="aspect-square bg-gray-50 rounded-3xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[9px] text-center px-8 leading-relaxed group-hover:border-gold transition-colors">
                  {method.img}
                </div>
                <h4 className="text-xl font-black text-navy mb-4 leading-tight">{method.t}</h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow italic font-medium">"{method.desc}"</p>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4 mb-6">
                  <div><p className="text-[10px] text-teal font-black uppercase mb-1">Pros:</p><p className="text-navy font-bold text-xs">{method.pros}</p></div>
                  <div><p className="text-[10px] text-red-400 font-black uppercase mb-1">Cons:</p><p className="text-gray-500 font-bold text-xs">{method.cons}</p></div>
                </div>
                <div className="pt-6 border-t border-gray-100 text-left">
                   <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 leading-tight">Best For: {method.best}</p>
                   <p className="text-[9px] text-gray-400 leading-relaxed font-medium uppercase tracking-tighter mt-4 italic">{method.proc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Volume Pricing for Ring Swatch Sets</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-12">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="p-6 text-left">Order Quantity</th>
                  <th className="p-6 text-left">Price per Set</th>
                  <th className="p-6 text-left">Total Investment</th>
                  <th className="p-6 text-left">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-navy">
                {[
                  { q: "5-10 (sample)", p: "₹80", t: "₹400-800", b: "Testing quality" },
                  { q: "25-50", p: "₹35-45", t: "₹875-2,250", b: "Small sales teams" },
                  { q: "75-100 (MOQ)", p: "₹20-25", t: "₹1,500-2,500", b: "Single sales team" },
                  { q: "100-500", p: "₹18-22", t: "₹1,800-11,000", b: "Multi-location teams" },
                  { q: "500+ (export)", p: "₹15-18", t: "₹7,500+", b: "Distributor networks" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold">{row.q}</td>
                    <td className="p-6 font-black text-gold text-lg">{row.p}</td>
                    <td className="p-6 text-gray-500">{row.t}</td>
                    <td className="p-6 text-teal font-black italic">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-gold transition-colors">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">USA Pricing</p>
              <p className="text-xl font-black text-navy">$1.20-2.00 <span className="text-[10px] text-gray-400">/ set</span></p>
              <p className="text-[9px] font-bold text-gold mt-1 uppercase tracking-tighter">MOQ 500+</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-gold transition-colors">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">Europe Pricing</p>
              <p className="text-xl font-black text-navy">€1.10-1.80 <span className="text-[10px] text-gray-400">/ set</span></p>
              <p className="text-[9px] font-bold text-gold mt-1 uppercase tracking-tighter">MOQ 500+</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-gold transition-colors">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">UAE Pricing</p>
              <p className="text-xl font-black text-navy">AED 5-8 <span className="text-[10px] text-gray-400">/ set</span></p>
              <p className="text-[9px] font-bold text-gold mt-1 uppercase tracking-tighter">MOQ 500+</p>
            </div>
          </div>

          <div className="p-8 bg-teal/5 rounded-3xl border border-teal/10">
            <h5 className="font-black text-teal text-xs uppercase tracking-widest mb-6 text-center underline underline-offset-4 decoration-2">Add-On Options & Pricing</h5>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { l: "Protective vinyl case", p: "+₹10-15/set" },
                { l: "Extra swatches (>cap)", p: "+₹2-3/swatch" },
                { l: "Divider tabs", p: "+₹5/set" },
                { l: "Business card pocket", p: "+₹3/set" },
                { l: "Custom rigid box", p: "+₹20-25/set" }
              ].map((opt, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-bold text-navy border-b border-teal/10 pb-2">
                  <span className="text-gray-500">{opt.l}</span>
                  <span className="text-gold">{opt.p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Timeline Section */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-navy text-center mb-24 uppercase tracking-widest text-sm">Manufacturing Timeline</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
              {[
                { s: 1, t: "Design & Approval", d: "Days 1-3", info: ["Cover design mockup", "Labeling format", "Ring selection"] },
                { s: 2, t: "Materials Preparation", d: "Days 4-7", info: ["Cover printing/emboss", "Sleeve/Card cutting", "Mechanism procurement"] },
                { s: 3, t: "Fabric Processing", d: "Days 8-12", info: ["Cutting to size", "Edge finishing", "Hole punching (direct)"] },
                { s: 4, t: "Assembly", d: "Days 13-17", info: ["Swatch mounting", "Label attachment", "Binding assembly"] },
                { s: 5, t: "QC & Packaging", d: "Days 18-20", info: ["Each set inspection", "Individual case packing", "Export boxing"] }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:border-gold group-hover:scale-110 transition-all duration-300 relative z-10">
                    <span className="text-gold font-black">{step.s}</span>
                  </div>
                  <h4 className="font-bold text-navy text-sm mb-1 leading-tight">{step.t}</h4>
                  <p className="text-gold text-[10px] font-black uppercase mb-4 tracking-widest">{step.d}</p>
                  <ul className="space-y-1">
                    {step.info.map((li, j) => (
                      <li key={j} className="text-[9px] text-gray-400 leading-tight font-medium uppercase">{li}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Sales Teams Love Ring Swatch Sets */}
      <section className="py-24 px-4 bg-navy text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-widest text-sm">Why Sales Teams Love Ring Swatch Sets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Lightweight Portability", s: "80% lighter than traditional books", d: "Carry 3-4 sets easily in a standard laptop briefcase or travel bag." },
              { t: "Quick Updates", s: "Update swatches in <5 minutes", d: "Easily add/remove individual swatches as collections change seasonally." },
              { t: "Customer Interaction", s: "Swatches removable for inspection", d: "Clients can handle specific fabrics without damaging the entire set." },
              { t: "Organized Presentation", s: "Present 30 fabrics in 2 minutes", d: "Indexed organization speeds up client consultations and matching." },
              { t: "Durability", s: "Withstand 200+ presentations", d: "Metal rings and reinforced covers are built to handle daily rigors." },
              { t: "Cost-Effective", s: "70% cheaper than hard-bound", d: "Equip your entire sales team affordably without breaking the budget." }
            ].map((ben, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors flex flex-col h-full group">
                <p className="text-gold font-black text-[10px] uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{ben.s}</p>
                <h4 className="text-xl font-bold mb-4 leading-tight">{ben.t}</h4>
                <p className="text-gray-400 text-xs leading-relaxed flex-grow">{ben.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 px-4 max-w-5xl mx-auto overflow-x-auto">
        <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Ring Sets vs. Other Methods</h2>
        <table className="w-full bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
              <th className="p-6 text-left border-r border-white/10">Feature</th>
              <th className="p-6 text-left border-r border-white/10 bg-gold/20 text-gold">Ring Swatch Sets</th>
              <th className="p-6 text-left border-r border-white/10">Hardbound Books</th>
              <th className="p-6 text-left border-r border-white/10">Loose Swatches</th>
              <th className="p-6 text-left">Hanger Displays</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs font-bold text-navy">
            {[
              { f: "Portability", s: "★★★★★ Excellent", h: "★★★ Good", l: "★★ Poor", d: "★ Very Poor" },
              { f: "Cost (approx)", s: "₹20-25", h: "₹85-100", l: "₹5-10", d: "₹22-25" },
              { f: "Organization", s: "★★★★★ Excellent", h: "★★★★ Very Good", l: "★ Poor", d: "★★★★ Very Good" },
              { f: "Updateability", s: "★★★★★ Easy", h: "★★ Difficult", l: "★★★★★ Easy", d: "★★★ Moderate" },
              { f: "Professional Look", s: "★★★★ Very Good", h: "★★★★★ Excellent", l: "★★ Fair", d: "★★★★★ Excellent" },
              { f: "Travel-Friendly", s: "★★★★★ Excellent", h: "★★★ Good", l: "★★ Poor", d: "★ Very Poor" }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors uppercase tracking-tighter">
                <td className="p-6 border-r border-gray-100 bg-gray-50/50">{row.f}</td>
                <td className="p-6 border-r border-gray-100 bg-gold/[0.03] text-teal font-black">{row.s}</td>
                <td className="p-6 border-r border-gray-100 text-gray-500">{row.h}</td>
                <td className="p-6 border-r border-gray-100 text-gray-400 italic">{row.l}</td>
                <td className="p-6 text-gray-500">{row.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 flex justify-center">
           <p className="bg-navy text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg">Best for: Sales Reps & International Travel</p>
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Customer Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Story 1: National Furniture Chain",
                company: "Premium Home Furnishings (100+ stores)",
                challenge: "200 sales reps needed portable fabric samples across regional hubs",
                solution: "200 ring sets with 40 upholstery swatches each and branded cases",
                results: ["Sales cycle shortened by 25%", "Order accuracy improved 40%", "Annual sample cost reduced 60%"],
                quote: "Ring sets transformed our sales process. Reps love the portability and clients love the organized presentation."
              },
              {
                title: "Story 2: Export Trading Company",
                company: "Global Textile Exports, Mumbai",
                challenge: "Needed cost-effective sample sets for 50+ international buyers via air freight",
                solution: "150 custom-branded ring sets shipped globally in lightweight format",
                results: ["Shipping costs reduced 70% vs. bound books", "45% increase in repeat orders", "Professional brand boost"],
                quote: "Perfect for export. Lightweight shipping saves thousands annually while looking world-class."
              },
              {
                title: "Story 3: Interior Design Firm",
                company: "Urban Spaces Design, Bangalore",
                challenge: "5 designers needed organized, portable fabric libraries for luxury home visits",
                solution: "25 ring sets organized by style (modern, traditional, eclectic, etc.)",
                results: ["Client meeting time reduced 30%", "Project closing rate up 28%", "Professional client impression"],
                quote: "Clients are impressed with our organization. Ring sets make us look like pros during home visits."
              }
            ].map((story, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition-all duration-500">
                <div className="mb-6">
                  <div className="flex text-gold text-lg font-bold mb-4">★★★★★</div>
                  <h4 className="text-xl font-black text-navy mb-1 leading-tight uppercase tracking-tighter">{story.title}</h4>
                  <p className="text-teal font-black text-[9px] uppercase tracking-widest mb-6">{story.company}</p>
                </div>
                <div className="space-y-6 flex-grow">
                  <div><p className="text-[10px] text-gray-400 font-black uppercase mb-1">Challenge:</p><p className="text-xs text-gray-600 italic leading-relaxed">{story.challenge}</p></div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Results:</p>
                    <ul className="space-y-2">
                       {story.results.map((res, j) => (
                         <li key={j} className="text-[10px] font-bold text-navy flex items-center"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 shrink-0"></span> {res}</li>
                       ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col h-24">
                  <p className="text-gray-500 italic text-[11px] leading-relaxed flex-grow">"{story.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care & Maintenance Guide */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm text-center">Keeping Your Ring Sets in Top Condition</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { t: "Regular Cleaning", items: ["Wipe covers with damp cloth", "Avoid harsh chemicals on vinyl", "Clean rings with dry cloth", "Store in cool, dry place"] },
              { t: "Fabric Protection", items: ["Use sleeves for delicate fabrics", "Avoid prolonged sunlight", "Handle with clean hands", "Replace damaged swatches"] },
              { t: "Mechanism Care", items: ["Open/close rings gently", "Check for loose rings quarterly", "Replace worn mechanisms", "Don't overload beyond cap"] },
              { t: "Storage", items: ["Store flat or upright (not bent)", "Use protective case when travel", "Keep away from moisture", "Stack no more than 10 high"] }
            ].map((tip, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-teal transition-colors">
                <h5 className="font-black text-navy text-sm mb-6 pb-2 border-b border-gray-200">{tip.t}</h5>
                <ul className="space-y-3">
                  {tip.items.map((it, j) => (
                    <li key={j} className="text-[11px] text-gray-500 font-medium flex items-start"><span className="text-teal mr-2 shrink-0">✔</span>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Technical FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Can I mix different fabric types in one ring set?", a: "Yes, you can include upholstery, curtain, and other fabrics in one set." },
              { q: "How many swatches can one ring set hold?", a: "Standard: 30-40 swatches comfortably, Maximum: 50 with larger rings." },
              { q: "Are replacement rings available?", a: "Yes, we supply replacement ring mechanisms for ₹20-30 per set." },
              { q: "Can individual pages/swatches be reordered?", a: "Yes, order additional swatches to add to existing sets." },
              { q: "What if I need to update fabrics seasonally?", a: "Simply order new swatches with holes punched, remove old ones, add new ones." },
              { q: "Can customers take swatches out?", a: "Yes, designed for easy swatch removal and inspection." },
              { q: "Do you provide blank sets for me to add my own fabrics?", a: "Yes, we sell blank ring sets with covers and rings only." },
              { q: "What's the minimum order for custom branding?", a: "75 sets for full custom branding (logo, colors, etc.)." },
              { q: "Can I get mixed sizes in one order?", a: "Yes, mix landscape, portrait, and mini sizes (minimum 25 per style)." },
              { q: "Do you offer rush production?", a: "Yes, 10-12 day rush available for +15% cost." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors group"
                >
                  <span className="font-bold text-navy group-hover:text-gold transition-colors pr-8 leading-snug">{faq.q}</span>
                  <span className={`text-gold transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4 font-medium uppercase tracking-tight">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-black text-navy mb-12 uppercase tracking-widest text-center">Complete Your Showroom Experience</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 'product-upholstery', title: "Hardbound Swatch Books", price: "₹70", icon: "📚", sub: "For permanent showrooms" },
              { id: 'product-hanger', title: "Hanger Swatches", price: "₹18", icon: "🧥", sub: "Wall displays for retail" },
              { title: "Protective Vinyl Cases", price: "₹150", icon: "📁", sub: "Premium kit protection", ext: true }
            ].map((prod, i) => (
              <button 
                key={i} 
                onClick={() => !prod.ext && onNavigate(prod.id as ViewState)} 
                className={`flex items-center gap-6 p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-xl hover:border-gold transition-all text-left group ${prod.ext ? 'cursor-default' : ''}`}
              >
                <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-gold/10 group-hover:scale-110 transition-all">{prod.icon}</div>
                <div>
                  <h4 className="font-bold text-navy mb-1 leading-tight">{prod.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{prod.sub}</p>
                  <p className="text-[9px] font-bold text-gold mt-2 uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-block">From {prod.price} {!prod.ext && '→'}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-navy py-24 px-4 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10 text-white">
          <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight">Equip Your Sales Team with Professional Ring Swatch Sets</h2>
          <p className="text-white/80 text-lg mb-12 font-medium max-w-2xl mx-auto leading-relaxed italic">
            "Request a custom quote for branded portable sample kits tailored to your sales team's specific travel and presentation needs."
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-teal text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-navy transition-all uppercase tracking-widest text-xs"
            >
              Get Sales Team Quote
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">
              Order 10 Sample Sets
            </button>
          </div>
          <p className="mt-12 text-gold font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Free shipping on orders 200+ sets</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Pricing Modal */}
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
                    <th className="p-4 text-left">Total Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { q: "5-10 (Sample)", p: "₹80", i: "₹400-800" },
                    { q: "25-50", p: "₹35-45", i: "₹875-2,250" },
                    { q: "75-100 (MOQ)", p: "₹20-25", i: "₹1,500-2,500" },
                    { q: "100-500", p: "₹18-22", i: "₹1,800-11,000" },
                    { q: "500+ (Export)", p: "₹15-18", i: "₹7,500+" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-4 font-bold text-navy">{row.q}</td>
                      <td className="p-4 font-black text-gold">{row.p}</td>
                      <td className="p-4 text-gray-600 font-medium">{row.i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-8 text-[10px] text-gray-400 leading-relaxed italic text-center uppercase tracking-tight">
              * Add-ons: Protective vinyl case (+₹10-15), Divider tabs (+₹5), Business card pocket (+₹3), Custom rigid box (+₹20-25).
            </p>
            <button 
              onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }}
              className="w-full bg-teal text-white font-black py-4 rounded-xl mt-8 shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-xs"
            >
              Get Custom Sales Team RFQ
            </button>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 bg-navy/95 z-[200] flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="max-w-5xl w-full aspect-[4/3] bg-gray-100 rounded-3xl flex flex-col items-center justify-center border border-white/10 relative shadow-2xl">
             <div className="text-center text-gray-400 uppercase tracking-widest font-black text-xl px-12 leading-relaxed">
               {thumbnails[activeThumb].placeholder}
               <p className="text-[10px] text-gold mt-4">Full Screen Product Visualization</p>
             </div>
             <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRingSwatch;