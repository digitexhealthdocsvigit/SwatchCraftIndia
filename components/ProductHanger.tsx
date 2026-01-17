
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
    { label: "Chrome Detail", placeholder: "Close-up of metal chrome hanger with branded header" },
    { label: "Wooden Option", placeholder: "Wooden hanger with fabric swatch" },
    { label: "Color Coordination", placeholder: "Multiple hangers showing color coordination" },
    { label: "Retail Setup", placeholder: "Retail display setup with hangers" }
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
    {
      id: "chrome",
      name: "Chrome Metal Hangers",
      placeholder: "Polished chrome hanger with fabric",
      desc: "Professional polished chrome finish for luxury showrooms",
      features: ["Mirror-finish chrome plating", "Rust-resistant coating", "Smooth edges (no snagging)", "Swivel hook system", "Weight capacity: 500g"],
      best: "High-end furniture stores",
      price: "₹22-25/set"
    },
    {
      id: "matte",
      name: "Matte Black Metal Hangers",
      placeholder: "Matte black hanger with modern aesthetic",
      desc: "Contemporary matte black finish for modern showroom aesthetics",
      features: ["Powder-coated matte finish", "Scratch-resistant surface", "Minimalist design", "Perfect for bold fabrics", "Sleek professional appearance"],
      best: "Modern furniture brands",
      price: "₹20-23/set"
    },
    {
      id: "wood",
      name: "Natural Wood Hangers",
      placeholder: "Wooden hanger with rustic appeal",
      desc: "Premium wooden hangers for classic and traditional showrooms",
      features: ["Solid wood construction", "Natural wood grain finish", "Eco-friendly option", "Warm, traditional aesthetic", "Custom staining available"],
      best: "Heritage brands",
      price: "₹25-30/set"
    }
  ];

  const pricingTiers = [
    { qty: "5-10 (sample)", price: "₹80", total: "₹400-800", ideal: "Display testing" },
    { qty: "25-50", price: "₹35-45", total: "₹875-2,250", ideal: "Small stores" },
    { qty: "100 (MOQ)", price: "₹22-25", total: "₹2,200-2,500", ideal: "Standard showroom" },
    { qty: "500+", price: "₹18-22", total: "₹9,000-11,000", ideal: "Multi-location chains" },
    { qty: "1000+", price: "₹15-18", total: "₹15,000-18,000", ideal: "Export distributors" }
  ];

  const faqItems = [
    { q: "Can I order mixed hanger styles in one order?", a: "Yes, we can mix chrome, matte black, and wood in single orders, provided you meet the minimum of 25 per style." },
    { q: "What if my fabrics are different sizes?", a: "We accommodate custom swatch sizes perfectly. Please specify your dimensions when requesting a quote." },
    { q: "Can header cards be double-sided?", a: "Yes, we print double-sided headers (fabric info on front, care instructions or brand story on back) at a small additional cost." },
    { q: "Do you provide the wall mounting rails?", a: "Rails are available separately. We can recommend standard retail display systems or custom-build rail systems for you." },
    { q: "How do I update fabrics seasonally?", a: "Order hangers with our clip attachment system for easy fabric swapping, or order new complete sets for permanent displays." },
    { q: "Can swatches be removed for customer takeaway?", a: "We can design tear-off swatches or provide extra unmounted samples to go with your hangers." },
    { q: "What's the weight limit per hanger?", a: "Metal hangers support up to 500g, while wooden hangers are best suited for fabrics up to 300g." },
    { q: "Do you ship internationally?", a: "Yes, we export hanger displays worldwide with specialized protective packaging to prevent damage during transit." }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="pt-28 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Fabric Hanger Swatches</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 lg:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Product Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-gray-100 rounded-3xl flex flex-col items-center justify-center border border-gray-200 overflow-hidden relative group">
              <div className="text-center text-gray-300 group-hover:text-gold transition-colors p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-bold uppercase tracking-widest text-sm mb-2">{thumbnails[activeThumb].placeholder}</p>
                <p className="text-[10px] text-gray-400">Zoom enabled on click</p>
              </div>
              <div className="absolute top-4 left-4 bg-teal text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                Best for Showrooms
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

          {/* RIGHT: Product Details */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="bg-navy text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Retail Choice</span>
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                <span className="text-gray-400 text-[10px] font-bold ml-2 uppercase tracking-tighter">4.7/5 (45 reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
              Fabric Hanger Swatches - Professional Showroom Display
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Wall-mount fabric display solutions for showrooms, retail stores, and trade shows. Maximize floor space while providing a tactile experience.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Metal (chrome, matte black) or wooden hanger options",
                "Pre-attached fabric swatches (15x15cm or 20x20cm)",
                "Branded header cards with collection information",
                "Easy wall-mount display system",
                "Perfect for visual merchandising and showroom walls"
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
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Starting from</p>
                  <p className="text-3xl font-black text-navy leading-none">₹18 <span className="text-sm text-gray-400">/ set</span></p>
                  <p className="text-gold text-xs font-bold mt-2">Bulk Export Pricing Available</p>
                  <button 
                    onClick={() => setIsPricingModalOpen(true)}
                    className="text-teal text-xs font-bold underline mt-2 hover:text-navy transition-colors"
                  >
                    View Wholesale Pricing
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">MOQ</span>
                    <span className="text-navy font-bold text-xs">100 Hangers</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Lead Time</span>
                    <span className="text-navy font-bold text-xs">18-25 Days</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Sample</span>
                    <span className="text-navy font-bold text-xs">₹80/pc</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => onNavigate('contact-page')}
                className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all transform hover:-translate-y-1 text-lg tracking-wider"
              >
                Request Bulk Quote
              </button>
              <a 
                href="https://wa.me/910000000000"
                className="w-full border-2 border-[#25D366] text-[#25D366] font-bold py-4 rounded-xl flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-xs uppercase tracking-widest"
              >
                WhatsApp for Showroom Setup
              </a>
              <button className="text-gray-400 text-xs font-bold underline hover:text-navy transition-colors text-center">
                Download Display Guide PDF
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

      {/* Hanger Style Options */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Choose Your Display Style</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {styles.map((style) => (
              <div key={style.id} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all group flex flex-col">
                <div className="aspect-video bg-white rounded-2xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[10px] group-hover:text-gold transition-colors text-center px-4">
                  {style.placeholder}
                </div>
                <h4 className="text-xl font-bold text-navy mb-2">{style.name}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{style.desc}</p>
                <div className="space-y-2 mb-8">
                  {style.features.map((f, i) => (
                    <div key={i} className="flex items-center text-xs font-bold text-navy/70">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span> {f}
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-gray-200 mt-auto">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Best for: {style.best}</p>
                  <p className="text-xl font-black text-navy">{style.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Header Card Customization */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy mb-16 uppercase tracking-widest text-sm">Branded Header Cards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Simple Logo Header", placeholder: "Clean header with logo only", detail: "Logo + Collection name. 10x15cm. Full color, matte lamination." },
              { title: "Detailed Info Header", placeholder: "Header with full details", detail: "Logo + Code + Comp + Care + Price. 12x18cm. Full color + QR." },
              { title: "Seasonal Collection", placeholder: "Themed header for seasons", detail: "Artwork + Season/Year. 15x20cm oversized. UV coating." },
              { title: "Minimal Tag Style", placeholder: "Small tag design", detail: "Code + Logo only. 5x8cm compact. 2-color print." }
            ].map((opt, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="aspect-video w-full bg-white border border-gray-200 rounded-2xl mb-4 flex items-center justify-center text-gray-300 font-black uppercase text-[8px] tracking-tighter px-4 text-center">
                  {opt.placeholder}
                </div>
                <h5 className="font-bold text-navy text-sm mb-1">{opt.title}</h5>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed px-4">{opt.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Swatch Attachment Methods */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Professional Fabric Mounting</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Method 1: Professional Stitching", 
                img: "Close-up of stitched attachment", 
                desc: "Permanent fabric attachment with industrial stitching. Most secure and durable.",
                pros: ["Professional appearance", "Long-term display", "Most durable"],
                process: "Fabric folded over hanger bar and stitched with color-matched thread."
              },
              { 
                title: "Method 2: Fabric-Safe Clips", 
                img: "Clip attachment system", 
                desc: "Removable clips allow fabric changes without damage. Reusable hangers.",
                pros: ["Easy fabric swapping", "No permanent damage", "Cost effective over time"],
                process: "Spring-loaded clips hold fabric securely without leaving marks."
              },
              { 
                title: "Method 3: Adhesive Mounting", 
                img: "Adhesive backing", 
                desc: "Fabric swatch adhered to rigid card then hung. Best for lightweight fabrics.",
                pros: ["Flat presentation", "Space-efficient", "Good for cards"],
                process: "Swatch mounted on card backing, card attached to hanger bar."
              }
            ].map((method, i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-square bg-gray-50 rounded-3xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[9px] text-center px-4">
                  {method.img}
                </div>
                <h4 className="text-xl font-bold text-navy mb-4 leading-tight">{method.title}</h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{method.desc}</p>
                <div className="space-y-2 mb-6">
                  {method.pros.map((p, j) => (
                    <div key={j} className="flex items-center text-xs font-bold text-teal">
                      <span className="w-1.5 h-1.5 bg-teal rounded-full mr-2"></span> {p}
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-auto">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">The Process</p>
                  <p className="text-xs text-navy/70 leading-relaxed italic">{method.process}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-navy text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-20">Perfect Display Solutions For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              { icon: "🛋️", title: "Furniture Showrooms", desc: "Wall-mounted displays create browsable fabric libraries. Typical Order: 200-500 hangers." },
              { icon: "🏪", title: "Retail Curtain Stores", desc: "Vertical display maximizes wall space for extensive ranges. Typical Order: 150-300 hangers." },
              { icon: "🏗️", title: "Trade Show Booths", desc: "Portable displays for backdrop walls. Professional and easy to transport. Typical: 50-100 hangers." },
              { icon: "💼", title: "Sales Rep Kits", desc: "Compact hanger sets for mobile teams. Transported in garment bags. Typical: 20-50 hangers." },
              { icon: "📐", title: "Interior Designers", desc: "Organized library for designer consultations. Clients can browse easily. Typical: 100-200 hangers." }
            ].map((use, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors text-center flex flex-col h-full">
                <div className="text-4xl mb-6">{use.icon}</div>
                <h4 className="text-lg font-bold mb-4 leading-tight">{use.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed flex-grow">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Display System Options */}
      <section className="py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Complete Wall Display Solutions</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Config 1: Single Row", 
                img: "Single row of hangers on wall", 
                specs: ["One rail system (20-30 hangers)", "6-8 feet wall space required", "Best for: Small showrooms, focused collections"] 
              },
              { 
                title: "Config 2: Multi-Tier", 
                img: "Multiple rows of hangers", 
                specs: ["3-4 rail system (60-120 hangers)", "8-10 feet wall space required", "Best for: Full collections, large showrooms"] 
              },
              { 
                title: "Config 3: Rotating Stand", 
                img: "Free-standing rotating rack", 
                specs: ["Floor stand (40-60 hangers)", "Footprint: 3x3 feet", "Best for: Trade shows, boutique stores"] 
              }
            ].map((cfg, i) => (
              <div key={i} className="group">
                <div className="aspect-video bg-gray-50 rounded-2xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[9px] group-hover:text-gold transition-colors text-center px-4">
                  {cfg.img}
                </div>
                <h4 className="text-xl font-bold text-navy mb-4">{cfg.title}</h4>
                <div className="space-y-2">
                  {cfg.specs.map((s, j) => (
                    <p key={j} className="text-xs text-gray-500 flex items-center">
                      <span className="w-1 h-1 bg-gold rounded-full mr-2"></span> {s}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Strategies */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Organize Your Fabric Display</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Color Gradient", img: "Hangers arranged by color spectrum", desc: "Arrange light to dark or by family for visual impact." },
              { title: "Collection Grouping", img: "Grouped by collection", desc: "Organize by seasons or fabric types with separators." },
              { title: "Fabric Categories", img: "Organized by texture", desc: "Group similar fabrics (e.g. all velvets together)." },
              { title: "Price Point Zones", img: "Organized by price", desc: "Help budget-conscious customers find options quickly." }
            ].map((strat, i) => (
              <div key={i} className="text-center group">
                <div className="aspect-square bg-white border border-gray-200 rounded-3xl mb-6 flex items-center justify-center text-gray-300 font-black uppercase text-[8px] tracking-widest group-hover:text-gold transition-colors p-4 text-center">
                  {strat.img}
                </div>
                <h5 className="font-bold text-navy text-sm mb-2">{strat.title}</h5>
                <p className="text-[10px] text-gray-400 leading-relaxed font-medium">{strat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-widest text-sm">Volume Pricing for Hanger Swatches</h2>
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
                    <td className="p-6 text-gray-600">{p.total}</td>
                    <td className="p-6 text-gray-500 italic">{p.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100"><p className="text-[10px] text-gray-400 font-black mb-1 uppercase tracking-widest">USA</p><p className="font-bold text-navy">$1.50-2.50 per set</p></div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100"><p className="text-[10px] text-gray-400 font-black mb-1 uppercase tracking-widest">Europe</p><p className="font-bold text-navy">€1.40-2.30 per set</p></div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100"><p className="text-[10px] text-gray-400 font-black mb-1 uppercase tracking-widest">UAE</p><p className="font-bold text-navy">AED 6-9 per set</p></div>
          </div>
          <div className="mt-12 p-8 bg-teal/5 rounded-3xl border border-teal/10">
            <h5 className="font-black text-teal text-xs uppercase tracking-widest mb-4">Available Add-On Services</h5>
            <ul className="grid sm:grid-cols-2 gap-4 text-xs font-bold text-navy/70">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Wall mounting hardware kit: +₹5/hanger</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Professional installation guide: Free</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> On-site installation (Mumbai): ₹5,000+</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Custom rail system design: On Request</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-24 px-4 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-24 uppercase tracking-widest text-sm">Hanger Swatch Production Timeline</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white -translate-y-1/2 -z-10 shadow-inner"></div>
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

      {/* Customer Examples */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Real Showroom Transformations</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Premium Furniture Store", client: "Luxury Furnishings, Delhi", before: "Fabric swatches in folders on counter", after: "Organized wall display with chrome hangers", stats: "250 installed. Conversion up 25%." },
              { title: "Curtain Retail Chain", client: "Window World, Bangalore", before: "Messy fabric samples in drawers", after: "Multi-tier matte black hanger display", stats: "400 installed. Capacity for 400+ fabrics." },
              { title: "Trade Show Booth", client: "Export Textiles India, Mumbai", before: "Bulky fabric books on table", after: "Portable backdrop with wooden hangers", stats: "80 hangers. Lead gen up 60%." }
            ].map((ex, i) => (
              <div key={i} className="flex flex-col group">
                <div className="aspect-video bg-gray-100 rounded-3xl mb-8 flex flex-col items-center justify-center border border-gray-200 text-gray-300 font-bold uppercase tracking-widest text-[9px] group-hover:border-gold transition-all text-center px-6">
                  <p className="mb-2">Before/After Comparison Photo</p>
                  <p className="text-[7px] text-gray-400">Visualization: {ex.title}</p>
                </div>
                <h4 className="font-bold text-navy text-lg mb-2">{ex.title}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase mb-4">{ex.client}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-medium text-gray-500 leading-relaxed"><span className="text-red-400 font-black mr-2">BEFORE:</span> {ex.before}</p>
                  <p className="text-xs font-bold text-navy leading-relaxed"><span className="text-teal font-black mr-2">AFTER:</span> {ex.after}</p>
                </div>
                <div className="mt-auto bg-gold/5 p-3 rounded-xl border border-gold/10 text-center">
                  <p className="text-[10px] font-black text-gold uppercase tracking-tighter">{ex.stats}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-gray-50 overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-widest text-sm">Why Choice SwatchCraft?</h2>
          <table className="w-full text-sm border-collapse rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-6 text-left">Feature</th>
                <th className="p-6 text-left border-b border-gold bg-gold/5 text-gold">SwatchCraft India</th>
                <th className="p-6 text-left">DIY Solution</th>
                <th className="p-6 text-left">Import from China</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 font-medium">
              {[
                { f: "Cost per hanger", s: "₹18-25", d: "₹30-40 (materials)", c: "₹15-20" },
                { f: "Lead Time", s: "18-25 days", d: "Immediate (labor heavy)", c: "35-50 days" },
                { f: "Quality Control", s: "Professional QC", d: "Variable", c: "Inconsistent" },
                { f: "Customization", s: "Full white-label", d: "Limited", c: "Basic only" },
                { f: "Consistent Sourcing", s: "Permanent designs", d: "Stock varies", c: "Batch variations" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 border-b border-gray-50 font-bold text-navy">{row.f}</td>
                  <td className="p-6 border-b border-gold/20 bg-gold/[0.02] text-teal font-black">{row.s}</td>
                  <td className="p-6 border-b border-gray-50 italic text-gray-400">{row.d}</td>
                  <td className="p-6 border-b border-gray-50">{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-widest text-sm">Technical FAQ</h2>
          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-white transition-colors"
                >
                  <span className="font-bold text-navy pr-8 leading-snug">{faq.q}</span>
                  <span className={`text-gold transform transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === idx ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-white pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-black text-navy mb-12 text-center uppercase tracking-widest">Complete Your Fabric Presentation Kit</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 'product-upholstery', title: "Upholstery Swatch Books", price: "From ₹70/unit", desc: "For portable presentations" },
              { id: 'product-ring', title: "Ring Swatch Sets", price: "From ₹20/unit", desc: "For sales representatives" },
              { id: 'product-cards', title: "Sample Cards", price: "From ₹15/unit", desc: "For takeaway samples" }
            ].map((p, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col items-center text-center">
                <div className="aspect-square w-24 bg-gray-50 rounded-2xl mb-6 flex items-center justify-center text-gray-300 font-black uppercase text-[8px] group-hover:text-gold transition-colors">
                  Product Icon
                </div>
                <h4 className="font-bold text-navy text-base mb-1">{p.title}</h4>
                <p className="text-gray-400 text-[10px] font-bold uppercase mb-4 tracking-widest">{p.desc}</p>
                <p className="text-gold font-black text-xs mb-6 uppercase tracking-widest">{p.price}</p>
                <button 
                  onClick={() => onNavigate(p.id as ViewState)}
                  className="text-teal font-black text-[10px] uppercase tracking-widest hover:text-navy transition-colors flex items-center"
                >
                  View Product 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-teal py-24 px-4 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Transform Your Showroom Display Today</h2>
          <p className="text-white/80 text-lg mb-12 font-medium">
            Request a custom quote for branded fabric hanger swatches tailored to your collection.
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
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Pricing Modal */}
      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-navy/80 flex items-center justify-center p-4 z-[100] animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsPricingModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-black text-navy mb-8">Wholesale Pricing Guide</h3>
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
                  {pricingTiers.map((tier, i) => (
                    <tr key={i}>
                      <td className="p-4 font-bold text-navy">{tier.qty}</td>
                      <td className="p-4 font-black text-gold">{tier.price}</td>
                      <td className="p-4 text-gray-600 font-medium">{tier.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-xs text-gray-500 italic leading-relaxed">
              * Final pricing depends on hanger material, header customization, and fabric mounting method. Export shipping extra.
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

export default ProductHanger;
