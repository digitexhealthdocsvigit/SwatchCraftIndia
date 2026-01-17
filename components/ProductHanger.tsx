
import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductHanger: React.FC<Props> = ({ onNavigate }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const thumbnails = [
    { id: 0, label: "Main Display", placeholder: "Fabric hangers displayed on showroom wall" },
    { id: 1, label: "Chrome Detail", placeholder: "Close-up of metal chrome hanger with branded header" },
    { id: 2, label: "Wooden Hanger", placeholder: "Wooden hanger with fabric swatch" },
    { id: 3, label: "Coordination", placeholder: "Multiple hangers showing color coordination" },
    { id: 4, label: "Retail Setup", placeholder: "Retail display setup with hangers" }
  ];

  const specs = [
    { label: "Product Type", value: "Fabric Hanger Swatch Display" },
    { label: "Hanger Material", value: "Metal (chrome, matte black, brushed nickel) or Natural wood" },
    { label: "Hanger Size", value: "Standard: 12-15 inches wide, Premium: 18 inches" },
    { label: "Swatch Size", value: "Standard: 15x15cm, Large: 20x20cm, Custom sizes available" },
    { label: "Header Card", value: "Printed cardstock (300 GSM) with logo and fabric information" },
    { label: "Attachment Method", value: "Professional stitching or fabric-safe clips" },
    { label: "Hook Type", value: "Swivel hook for easy wall mounting" },
    { label: "Label Options", value: "Fabric code, composition, care symbols, price tags" },
    { label: "Customization", value: "Logo, brand colors, QR codes, collection themes" },
    { label: "Best For", value: "Showrooms, retail displays, trade show booths, furniture stores" },
    { label: "MOQ", value: "100 hangers per style" },
    { label: "Sample MOQ", value: "5-10 pieces for display testing" },
    { label: "Lead Time", value: "18-25 days after fabric receipt" },
    { label: "Packaging", value: "Individual poly bags, export cartons with dividers" }
  ];

  const styles = [
    {
      title: "STYLE 1: Chrome Metal Hangers",
      placeholder: "Polished chrome hanger with fabric",
      desc: "Professional polished chrome finish for luxury showrooms",
      features: ["Mirror-finish chrome plating", "Rust-resistant coating", "Smooth edges (no fabric snagging)", "Swivel hook for easy hanging", "Weight capacity: Up to 500g fabric"],
      bestFor: "High-end furniture stores, luxury fabric showrooms",
      price: "₹22-25/set"
    },
    {
      title: "STYLE 2: Matte Black Metal Hangers",
      placeholder: "Matte black hanger with modern aesthetic",
      desc: "Contemporary matte black finish for modern showroom aesthetics",
      features: ["Powder-coated matte finish", "Scratch-resistant surface", "Minimalist design", "Perfect for dark/bold fabrics", "Sleek professional appearance"],
      bestFor: "Modern furniture brands, contemporary design studios",
      price: "₹20-23/set"
    },
    {
      title: "STYLE 3: Natural Wood Hangers",
      placeholder: "Wooden hanger with rustic appeal",
      desc: "Premium wooden hangers for classic and traditional showrooms",
      features: ["Solid wood construction (pine or hardwood)", "Natural wood grain finish", "Eco-friendly option", "Warm, traditional aesthetic", "Can be stained in custom colors"],
      bestFor: "Traditional furniture stores, heritage brands, eco-conscious brands",
      price: "₹25-30/set"
    }
  ];

  const headerOptions = [
    { title: "Simple Logo Header", placeholder: "Clean header with logo only", content: "Company logo, collection name", size: "10x15cm", print: "Full color, matte lamination" },
    { title: "Detailed Info Header", placeholder: "Header with full details", content: "Logo, fabric code, composition, care, price", size: "12x18cm", print: "Full color + barcode/QR" },
    { title: "Seasonal Collection", placeholder: "Themed header for seasons", content: "Collection artwork, season, year, logo", size: "15x20cm", print: "Premium finish + UV coating" },
    { title: "Minimal Tag Style", placeholder: "Small tag design", content: "Fabric code and logo only", size: "5x8cm", print: "Simple 2-color print" }
  ];

  const attachmentMethods = [
    { title: "Professional Stitching", placeholder: "Close-up of stitched attachment", desc: "Permanent fabric attachment with industrial stitching", bestFor: "Long-term showroom displays", pros: "Most secure, professional, durable", process: "Fabric folded over bar and stitched" },
    { title: "Fabric-Safe Clips", placeholder: "Clip attachment system", desc: "Removable clips allow fabric changes without damage", bestFor: "Frequently updated collections", pros: "Reusable, easy swapping, no damage", process: "Spring-loaded clips hold fabric" },
    { title: "Adhesive Mounting", placeholder: "Adhesive backing", desc: "Fabric swatch adhered to rigid card then hung", bestFor: "Lightweight fabrics, promos", pros: "Flat presentation, space-efficient", process: "Mounted on card, card attached to hanger" }
  ];

  const useCases = [
    { title: "Furniture Showrooms", icon: "🛋️", desc: "Wall-mounted hanger displays create browsable fabric libraries. Customers can easily see and touch options.", order: "200-500 hangers" },
    { title: "Retail Curtain Stores", icon: "🏪", desc: "Vertical display maximizes wall space for extensive ranges. Side-by-side comparison of colors.", order: "150-300 hangers" },
    { title: "Trade Show Booths", icon: "🏗️", desc: "Portable hanger displays for trade show backdrop walls. Professional presentation that's easy to transport.", order: "50-100 hangers" },
    { title: "Sales Rep Kits", icon: "💼", desc: "Compact hanger sets for mobile sales teams. Can be transported in garment bags.", order: "20-50 hangers" },
    { title: "Designer Studios", icon: "📐", desc: "Organized fabric library for consultations. Clients can browse while designer coordinates colors.", order: "100-200 hangers" }
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
    { q: "What if my fabrics are different sizes?", a: "We accommodate custom swatch sizes. Specify dimensions when ordering." },
    { q: "Can header cards be double-sided?", a: "Yes, we print double-sided headers (fabric info front, care instructions back)." },
    { q: "Do you provide the wall mounting rails?", a: "Rails available separately or we can recommend standard retail display systems." },
    { q: "How do I update fabrics seasonally?", a: "Order hangers with clip attachment for easy fabric swapping, or order new complete sets." },
    { q: "Can swatches be removed for customer takeaway?", a: "We can design tear-off swatches or provide extra unmounted samples." },
    { q: "What's the weight limit per hanger?", a: "Metal hangers: up to 500g, Wooden hangers: up to 300g." },
    { q: "Do you ship internationally?", a: "Yes, we export hanger displays worldwide with proper packaging." }
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav className="pt-24 pb-6 px-4 max-w-7xl mx-auto text-xs font-semibold uppercase tracking-wider text-gray-400">
        <div className="flex items-center space-x-2">
          <button onClick={() => onNavigate('home')} className="hover:text-navy transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-navy transition-colors">Products</button>
          <span>/</span>
          <span className="text-navy">Fabric Hanger Swatches</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 overflow-hidden relative group cursor-zoom-in">
              <div className="text-center text-gray-300 group-hover:text-gold transition-colors">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-bold uppercase tracking-widest px-8">{thumbnails[activeThumb].placeholder}</p>
              </div>
              <div className="absolute top-4 left-4 bg-teal text-white text-[10px] font-bold px-3 py-1 rounded-full">
                Best for Showrooms
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {thumbnails.slice(1).map((thumb, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveThumb(thumb.id)}
                  className={`aspect-square bg-gray-50 rounded-lg border-2 flex items-center justify-center p-2 transition-all ${activeThumb === thumb.id ? 'border-gold shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <div className="text-[7px] font-black text-gray-400 text-center leading-tight uppercase">{thumb.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-navy leading-tight mb-4">
              Fabric Hanger Swatches - Professional Showroom Display
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Wall-mount fabric display solutions for showrooms, retail stores, and trade shows. Maximize presentation impact without clutter.
            </p>

            <div className="flex items-center space-x-2 mb-8">
              <div className="flex text-gold">
                {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">4.7/5 (45 reviews)</span>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                "Metal (chrome, matte black) or wooden options",
                "Pre-attached swatches (15x15cm or 20x20cm)",
                "Branded header cards with collection info",
                "Easy wall-mount display system",
                "Perfect for visual merchandising"
              ].map((f, i) => (
                <li key={i} className="flex items-center text-navy font-semibold text-sm">
                  <span className="w-5 h-5 bg-teal/10 text-teal rounded-full flex items-center justify-center mr-3 text-[10px]">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Price Tier Starts At</p>
                  <p className="text-3xl font-black text-navy">₹18 <span className="text-sm font-medium text-gray-500">/ set</span></p>
                  <p className="text-xs font-bold text-gold mt-1 uppercase tracking-widest">Bulk Export Pricing Available</p>
                  <button onClick={() => setShowPricingModal(true)} className="text-teal text-xs font-bold underline mt-4 hover:text-navy transition-colors">
                    View Wholesale Pricing
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-center shadow-sm">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase">MOQ</span>
                    <span className="text-xs font-bold text-navy">100 Hangers</span>
                  </div>
                  <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-center shadow-sm">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase">Lead Time</span>
                    <span className="text-xs font-bold text-navy">18-25 Days</span>
                  </div>
                  <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-center shadow-sm">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase">Sample</span>
                    <span className="text-xs font-bold text-navy">₹80 / set</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => onNavigate('contact-page')}
                className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg tracking-wider"
              >
                Request Bulk Quote
              </button>
              <a 
                href="https://wa.me/910000000000"
                className="w-full border-2 border-[#25D366] text-[#25D366] font-black py-4 rounded-xl flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-xs tracking-widest"
              >
                WhatsApp for Showroom Setup
              </a>
              <button className="text-gray-400 text-[10px] font-bold underline text-center uppercase tracking-widest">
                Download Display Guide PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-navy mb-8 text-center uppercase tracking-widest">Technical Specifications</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {specs.map((s, i) => (
                  <tr key={i}>
                    <td className="p-4 bg-gray-50/50 font-bold text-navy w-1/3 border-r border-gray-100">{s.label}</td>
                    <td className="p-4 text-gray-600">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Style Options */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest">Choose Your Display Style</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {styles.map((style, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
              <div className="aspect-video bg-gray-50 rounded-xl mb-6 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase text-[9px] group-hover:text-gold transition-colors text-center px-4">
                {style.placeholder}
              </div>
              <h3 className="text-xl font-bold text-navy mb-4 leading-tight">{style.title}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">{style.desc}</p>
              <ul className="space-y-2 mb-8">
                {style.features.map((f, j) => (
                  <li key={j} className="text-xs text-navy font-semibold flex items-center">
                    <span className="w-1 h-1 bg-gold rounded-full mr-2"></span> {f}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-gray-50 mt-auto">
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Best For: {style.bestFor}</p>
                <p className="text-gold font-black text-lg">{style.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Header Cards */}
      <section className="py-24 px-4 bg-[#1a2849] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Branded Header Cards</h2>
          <p className="text-gray-400 mb-16 uppercase tracking-widest text-xs font-bold">White-label branding options for your collections</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {headerOptions.map((opt, i) => (
              <div key={i} className="space-y-6 group">
                <div className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-6 text-white/20 group-hover:border-gold/50 transition-colors">
                  <div className="text-[10px] font-black uppercase tracking-tighter text-center">{opt.placeholder}</div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{opt.title}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{opt.content}</p>
                  <p className="text-[10px] text-gold font-black uppercase tracking-widest">{opt.size} • {opt.print}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attachment Methods */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-navy text-center mb-16">Professional Fabric Mounting</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {attachmentMethods.map((m, i) => (
            <div key={i} className="flex flex-col">
              <div className="aspect-video bg-gray-50 border border-gray-100 rounded-2xl mb-8 flex items-center justify-center text-gray-300 text-[10px] font-black uppercase text-center px-4">
                {m.placeholder}
              </div>
              <h4 className="text-xl font-bold text-navy mb-4">{m.title}</h4>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{m.desc}</p>
              <div className="space-y-4 mb-8 flex-grow">
                <div>
                  <p className="text-[10px] text-gold font-black uppercase tracking-widest mb-1">Pros</p>
                  <p className="text-xs text-navy font-bold">{m.pros}</p>
                </div>
                <div>
                  <p className="text-[10px] text-teal font-black uppercase tracking-widest mb-1">Process</p>
                  <p className="text-xs text-gray-500">{m.process}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Best Use Case</p>
                <p className="text-xs text-navy font-black">{m.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Perfect Display Solutions For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {useCases.map((use, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-teal transition-all text-center group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{use.icon}</div>
                <h5 className="font-bold text-navy text-base mb-3 leading-tight">{use.title}</h5>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-6">{use.desc}</p>
                <div className="pt-4 border-t border-gray-50">
                  <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Typical Order</p>
                  <p className="text-xs font-bold text-teal">{use.order}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems & Organization */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-2xl font-black text-navy mb-12 uppercase tracking-widest">Complete Wall Display Solutions</h2>
            <div className="space-y-8">
              {[
                { title: "Configuration 1: Single Row Display", placeholder: "Single row of hangers on wall", specs: "One rail system (20-30 hangers), 6-8 ft wall space required. Best for small boutiques." },
                { title: "Configuration 2: Multi-Tier Display", placeholder: "Multiple rows of hangers", specs: "3-4 rail system (60-120 hangers), staggered heights. Best for full collections." },
                { title: "Configuration 3: Rotating Display Stand", placeholder: "Free-standing rotating rack", specs: "Floor stand (40-60 hangers), 3x3 ft footprint. Best for trade shows." }
              ].map((cfg, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-32 h-20 bg-gray-50 rounded-xl shrink-0 flex items-center justify-center border border-gray-100 text-gray-300 text-[7px] font-black uppercase group-hover:border-gold transition-colors text-center px-2">{cfg.placeholder}</div>
                  <div>
                    <h4 className="font-bold text-navy mb-2">{cfg.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{cfg.specs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-navy mb-12 uppercase tracking-widest">Organize Your Fabric Display</h2>
            <div className="grid grid-cols-2 gap-8">
              {[
                { title: "Color Gradient", icon: "🌈", desc: "Arrange light to dark for visually stunning libraries." },
                { title: "Collection Grouping", icon: "📁", desc: "Organize by seasonal collection themes." },
                { title: "Fabric Categories", icon: "🧵", desc: "Group similar textures (e.g. all velvets together)." },
                { title: "Price Point Zones", icon: "🏷️", desc: "Section by price range for quick client navigation." }
              ].map((strat, i) => (
                <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-3xl mb-4">{strat.icon}</div>
                  <h4 className="font-bold text-navy text-sm mb-2">{strat.title}</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{strat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-widest">Volume Pricing for Hanger Swatches</h2>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
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
                    <td className="p-6 text-gray-500">{p.invest}</td>
                    <td className="p-6 italic text-gray-400">{p.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">USA Pricing</p>
              <p className="text-lg font-black text-navy">$1.50 - $2.50 <span className="text-[10px] text-gray-400">/ set</span></p>
              <p className="text-[9px] font-bold text-gold mt-1">Direct Ship NY/LA/Miami</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">EU Pricing</p>
              <p className="text-lg font-black text-navy">€1.40 - €2.30 <span className="text-[10px] text-gray-400">/ set</span></p>
              <p className="text-[9px] font-bold text-gold mt-1">Genoa/Rotterdam/Hamburg</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">UAE Pricing</p>
              <p className="text-lg font-black text-navy">AED 6 - AED 9 <span className="text-[10px] text-gray-400">/ set</span></p>
              <p className="text-[9px] font-bold text-gold mt-1">Jebel Ali / Sharjah Ports</p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-teal/5 rounded-2xl border border-teal/10">
            <h5 className="font-black text-teal text-xs uppercase tracking-widest mb-4">Add-On Services</h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center text-xs font-bold text-navy"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Wall mounting hardware kit: +₹5/hanger</div>
              <div className="flex items-center text-xs font-bold text-navy"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Professional installation guide: Free</div>
              <div className="flex items-center text-xs font-bold text-navy"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Custom rail system design: Quote on request</div>
              <div className="flex items-center text-xs font-bold text-navy"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> On-site installation (Mumbai area): ₹5,000+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-24 uppercase tracking-widest text-sm">Hanger Swatch Manufacturing Process</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-100 -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12">
              {[
                { s: 1, t: "Design Approval", d: "Days 1-3", icon: "📧" },
                { s: 2, t: "Hanger Preparation", d: "Days 4-8", icon: "🛠️" },
                { s: 3, t: "Fabric Processing", d: "Days 9-15", icon: "✂️" },
                { s: 4, t: "Header Card Printing", d: "Days 10-14", icon: "🖨️" },
                { s: 5, t: "Assembly", d: "Days 16-22", icon: "🤝" },
                { s: 6, t: "Packaging", d: "Days 23-25", icon: "📦" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:border-gold group-hover:scale-110 transition-all duration-300 relative z-10">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gold text-white text-[10px] font-black flex items-center justify-center rounded-full border-4 border-white shadow-sm">{step.s}</div>
                  </div>
                  <h4 className="font-bold text-navy text-sm mb-1">{step.t}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Examples */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Real Showroom Transformations</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { client: "Luxury Furnishings, Delhi", before: "Fabric swatches in folders on counter", after: "250 organized chrome hangers. Sales conversion up 25%.", icon: "🏢" },
              { client: "Window World, Bangalore", before: "Messy fabric samples in drawers", after: "Multi-tier matte black display for 400+ fabrics. Capacity tripled.", icon: "🏬" },
              { client: "Export Textiles India, Mumbai", before: "Bulky fabric books on table for shows", after: "80 wooden hangers on portable system. Lead gen up 60%.", icon: "🚢" }
            ].map((ex, i) => (
              <div key={i} className="flex flex-col h-full bg-white rounded-3xl border border-gray-100 p-8 shadow-sm group hover:-translate-y-2 transition-all">
                <div className="aspect-video bg-gray-50 border border-dashed border-gray-200 rounded-2xl mb-8 flex items-center justify-center text-gray-300 text-[8px] font-black uppercase text-center px-4 group-hover:border-gold transition-colors">Before / After Case Study: {ex.client}</div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy/5 rounded-xl flex items-center justify-center text-xl">{ex.icon}</div>
                  <h4 className="font-black text-navy text-sm">{ex.client}</h4>
                </div>
                <div className="space-y-4 flex-grow">
                  <div className="flex gap-4">
                    <span className="text-[9px] font-black text-red-400 uppercase tracking-widest mt-1">Before</span>
                    <p className="text-xs text-gray-500 italic">{ex.before}</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[9px] font-black text-teal uppercase tracking-widest mt-1">After</span>
                    <p className="text-xs text-navy font-bold">{ex.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-4 max-w-5xl mx-auto overflow-x-auto">
        <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest">Why SwatchCraft Hanger Swatches?</h2>
        <table className="w-full bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
              <th className="p-6 text-left border-r border-white/10">Feature</th>
              <th className="p-6 text-left border-r border-white/10 bg-gold/20 text-gold">SwatchCraft India</th>
              <th className="p-6 text-left border-r border-white/10">DIY Solution</th>
              <th className="p-6 text-left">Import from China</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm font-medium text-navy">
            {[
              { f: "Cost per hanger", s: "₹18-25", diy: "₹30-40 (materials)", c: "₹15-20" },
              { f: "Lead Time", s: "18-25 days", diy: "Immediate (but labor)", c: "35-50 days" },
              { f: "Quality Control", s: "Professional QC", diy: "Variable", c: "Inconsistent" },
              { f: "Customization", s: "Full branding", diy: "Limited", c: "Limited" },
              { f: "Attachment Quality", s: "Industrial stitching", diy: "Manual/amateur", c: "Variable" },
              { f: "MOQ", s: "100 pieces", diy: "1+ (time-consuming)", c: "500-1000 pieces" },
              { f: "Consistency", s: "Perfect matching", diy: "Varies per batch", c: "Often varies" }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-6 border-r border-gray-100 font-bold bg-gray-50/50">{row.f}</td>
                <td className="p-6 border-r border-gray-100 bg-gold/[0.03] font-black text-teal">{row.s}</td>
                <td className="p-6 border-r border-gray-100 text-gray-400 italic">{row.diy}</td>
                <td className="p-6 text-gray-500">{row.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Technical FAQ */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest">Technical FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-navy leading-tight pr-8">{faq.q}</span>
                  <span className={`text-gold transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-black text-navy mb-12 uppercase tracking-widest text-center">Complete Your Showroom Experience</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Upholstery Swatch Books", price: "₹70", icon: "📚", view: 'product-upholstery' },
            { title: "Ring Swatch Sets", price: "₹20", icon: "💍", view: 'product-ring' },
            { title: "Sample Cards", price: "₹15", icon: "🏷️", view: 'product-cards' }
          ].map((prod, i) => (
            <button key={i} onClick={() => onNavigate(prod.view as ViewState)} className="flex items-center gap-6 p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-xl hover:border-gold transition-all text-left group">
              <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-gold/10 group-hover:scale-110 transition-all">{prod.icon}</div>
              <div>
                <h4 className="font-bold text-navy mb-1 leading-tight">{prod.title}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">From <span className="text-gold font-black">{prod.price}</span> per set</p>
                <p className="text-[9px] font-bold text-teal mt-2 uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-block">View Details →</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-teal py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Transform Your Showroom Display Today</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto font-medium">
            Get a custom quote for branded fabric hanger swatches designed specifically for your space and collections.
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
          <p className="mt-12 text-white/40 text-[10px] font-bold uppercase tracking-widest">Free display layout consultation for orders 200+ hangers</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Simple Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm" onClick={() => setShowPricingModal(false)}></div>
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowPricingModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-black text-navy mb-8 uppercase tracking-widest">Wholesale Pricing Guide</h3>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="p-4 text-left">Quantity</th>
                    <th className="p-4 text-left">Price/Hanger</th>
                    <th className="p-4 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-navy">
                  {pricingTiers.map((p, i) => (
                    <tr key={i}>
                      <td className="p-4 font-bold">{p.qty}</td>
                      <td className="p-4 font-black text-gold text-lg">{p.price}</td>
                      <td className="p-4 text-gray-500 italic">{p.ideal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-8 text-[10px] text-gray-400 leading-relaxed italic">
              * Final pricing depends on hanger material (Chrome vs Wood), header card customization (foil/UV), and total swatch count. Export shipping extra. Free design mockup for orders over 200 units.
            </p>
            <button 
              onClick={() => { setShowPricingModal(false); onNavigate('contact-page'); }}
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
