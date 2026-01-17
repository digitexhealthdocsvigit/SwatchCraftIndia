
import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
  // Added missing onDownload prop
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

  const useCases = [
    { title: "Furniture Showrooms", icon: "🛋️", desc: "Wall-mounted hanger displays create browsable fabric libraries. Customers can easily see and touch options while maintaining organization.", order: "200-500 hangers" },
    { title: "Retail Curtain Stores", icon: "🏪", desc: "Vertical display maximizes wall space for extensive curtain fabric ranges. Easy for customers to compare colors side-by-side.", order: "150-300 hangers" },
    { title: "Trade Show Booths", icon: "🏗️", desc: "Portable hanger displays for trade show backdrop walls. Professional presentation that's easy to transport and set up.", order: "50-100 hangers" },
    { title: "Sales Rep Kits", icon: "💼", desc: "Compact hanger sets for mobile sales teams. Can be transported in garment bags for client meetings.", order: "20-50 hangers" },
    { title: "Interior Designers", icon: "📐", desc: "Organized fabric library for designer consultations. Clients can browse while designer coordinates colors.", order: "100-200 hangers" }
  ];

  const organization = [
    { title: "Color Gradient", img: "Hangers arranged by color spectrum", desc: "Arrange fabrics from light to dark or by color family for visually stunning displays that help customers find colors." },
    { title: "Collection Grouping", img: "Grouped by collection", desc: "Organize by seasonal collections or fabric types with header separators for easy navigation." },
    { title: "Fabric Type Categories", img: "Organized by texture", desc: "Group similar fabrics: all velvets together, all linens together, making it easy for customers to compare textures." },
    { title: "Price Point Zones", img: "Organized by price", desc: "Arrange by price ranges with clear section dividers to help budget-conscious customers find suitable options quickly." }
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

  const steps = [
    { s: "Step 1", t: "Design Approval", d: "Days 1-3", info: "Header card mockup & style finalization" },
    { s: "Step 2", t: "Hanger Prep", d: "Days 4-8", info: "Metal finishing or wood staining" },
    { s: "Step 3", t: "Fabric Processing", d: "Days 9-15", info: "Cutting & edge finishing (serging)" },
    { s: "Step 4", t: "Printing", d: "Days 10-14", info: "Full-color header card production" },
    { s: "Step 5", t: "Assembly", d: "Days 16-22", info: "Fabric & header card attachment" },
    { s: "Step 6", t: "Packaging", d: "Days 23-25", info: "Individual wrapping & export boxing" }
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
      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Gallery */}
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
              {!isZoomed && (
                <div className="absolute bottom-6 right-6 bg-gold text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg pointer-events-none uppercase tracking-widest">
                  Click to Zoom
                </div>
              )}
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

          {/* Details */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <span className="bg-teal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-4 shadow-sm">Best for Showrooms</span>
              <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
                Fabric Hanger Swatches - Professional Showroom Display
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Wall-mount fabric display solutions for showrooms, retail stores, and trade shows. Maximize presentation impact and customer interaction.
              </p>
              <div className="flex items-center space-x-2 mb-8">
                <div className="flex text-gold text-lg">★★★★★</div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">4.7/5 (45 reviews)</span>
              </div>
              
              <ul className="space-y-4 mb-10">
                {[
                  { icon: "🛠️", t: "Metal (chrome, matte black) or wooden hanger options" },
                  { icon: "📏", t: "Pre-attached fabric swatches (15x15cm or 20x20cm)" },
                  { icon: "🏷️", t: "Branded header cards with collection information" },
                  { icon: "📐", t: "Easy wall-mount display system" },
                  { icon: "✨", t: "Perfect for visual merchandising and showroom walls" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-navy font-semibold text-sm group">
                    <span className="w-8 h-8 bg-teal/10 text-teal rounded-lg flex items-center justify-center mr-4 text-sm group-hover:bg-teal group-hover:text-white transition-colors">{item.icon}</span>
                    {item.t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 leading-none">Starting from</p>
                  <p className="text-3xl font-black text-navy leading-none mt-2">₹18 <span className="text-sm font-bold text-gray-400">/ set</span></p>
                  <p className="text-gold text-[10px] font-bold mt-4 uppercase tracking-widest">Bulk Export Pricing Available</p>
                  <button onClick={() => setIsPricingModalOpen(true)} className="text-teal text-xs font-bold underline mt-2 hover:text-navy transition-colors inline-block">View Wholesale Pricing</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">MOQ</span>
                    <span className="text-navy font-bold text-xs">100 hangers</span>
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
              <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">
                Request Bulk Quote
              </button>
              <a href="https://wa.me/910000000000" className="border-2 border-[#25D366] text-[#25D366] font-bold py-4 rounded-xl text-center hover:bg-[#25D366] hover:text-white transition-all text-xs uppercase tracking-widest flex items-center justify-center">
                <span className="mr-2">💬</span> WhatsApp for Showroom Setup
              </a>
              {/* Added onClick to trigger onDownload */}
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

      {/* Specifications Table */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy mb-12 text-center uppercase tracking-widest text-sm">Product Specifications</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-100">
                {specs.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-navy w-1/3 bg-gray-50/50">{row.s}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hanger Style Options */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Choose Your Display Style</h2>
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto">Different finishes to match your showroom aesthetic and brand positioning.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {styles.map((style, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-gold transition-all flex flex-col group shadow-sm hover:shadow-2xl">
                <div className="aspect-[4/3] bg-white rounded-2xl mb-8 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-[9px] group-hover:text-gold border border-gray-100 text-center px-4 leading-relaxed transition-colors">
                  {style.img}
                </div>
                <h4 className="text-xl font-bold text-navy mb-4 leading-tight">{style.title}</h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">{style.desc}</p>
                <div className="space-y-2 mb-8 text-left">
                  {style.features.map((f, j) => (
                    <li key={j} className="text-[11px] text-navy font-bold flex items-center list-none">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span> {f}
                    </li>
                  ))}
                </div>
                <div className="pt-6 border-t border-gray-200 text-left">
                   <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Best For:</p>
                   <p className="text-navy font-bold text-xs mb-4 leading-relaxed">{style.best}</p>
                   <p className="text-gold font-black text-xl">{style.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Header Card Customization */}
      <section className="py-24 px-4 bg-navy text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">Branded Header Cards</h2>
            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">White-label options to showcase your brand identity</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {headerOptions.map((opt, i) => (
              <div key={i} className="space-y-6 group">
                <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-6 text-white/20 group-hover:border-gold transition-colors text-center text-[10px] font-black uppercase tracking-tighter">
                  {opt.img}
                </div>
                <div>
                  <h5 className="font-bold text-lg mb-2 text-gold leading-tight">{opt.title}</h5>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{opt.content}</p>
                  <p className="text-gray-500 text-[9px] uppercase tracking-tighter font-medium">{opt.size} • {opt.print}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Swatch Attachment Methods */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-20 uppercase tracking-widest text-sm">Professional Fabric Mounting</h2>
          <div className="grid md:grid-cols-3 gap-16">
            {attachmentMethods.map((method, i) => (
              <div key={i} className="flex flex-col h-full group">
                <div className="aspect-square bg-gray-50 rounded-3xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[9px] text-center px-8 leading-relaxed group-hover:border-gold transition-colors">
                  {method.img}
                </div>
                <h4 className="text-xl font-black text-navy mb-4 leading-tight">{method.title}</h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">{method.desc}</p>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                  <div>
                    <p className="text-[10px] text-gold font-black uppercase mb-1">Pros:</p>
                    <p className="text-navy font-bold text-xs">{method.pros}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-teal font-black uppercase mb-1">Process:</p>
                    <p className="text-gray-500 text-xs italic leading-relaxed">{method.proc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Perfect Display Solutions For</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {useCases.map((use, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col text-center hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl">
                <div className="text-4xl mb-6">{use.icon}</div>
                <h5 className="font-bold text-navy text-base mb-3 leading-tight">{use.title}</h5>
                <p className="text-gray-500 text-[11px] leading-relaxed mb-6 flex-grow">{use.desc}</p>
                <div className="pt-4 border-t border-gray-50">
                  <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Typical Order:</p>
                  <p className="text-teal font-black text-xs">{use.order}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Display Systems & Organization */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-2xl font-black text-navy mb-12 uppercase tracking-widest">Complete Wall Display Solutions</h2>
            <div className="space-y-12">
               {[
                 { t: "Configuration 1: Single Row Display", p: "Single row of hangers on wall", s: ["One rail system with 20-30 hangers", "Space required: 6-8 feet wall space", "Best for: Small showrooms, focused collections"] },
                 { t: "Configuration 2: Multi-Tier Display", p: "Multiple rows of hangers", s: ["3-4 rail system with 60-120 hangers total", "Space required: 8-10 feet wall space", "Best for: Full collection displays, large showrooms"] },
                 { t: "Configuration 3: Rotating Display Stand", p: "Free-standing rotating rack", s: ["Floor stand with 40-60 hangers", "Footprint: 3x3 feet", "Best for: Trade shows, boutique stores, temporary setups"] }
               ].map((cfg, i) => (
                 <div key={i} className="flex gap-8 group">
                   <div className="w-40 h-24 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 font-black uppercase text-[8px] border border-gray-100 group-hover:border-gold transition-colors text-center px-4 leading-tight">{cfg.p}</div>
                   <div>
                     <h4 className="font-bold text-navy mb-4 leading-tight">{cfg.t}</h4>
                     <ul className="space-y-1">
                        {cfg.s.map((li, j) => (
                          <li key={j} className="text-xs text-gray-500 flex items-center font-medium"><span className="w-1 h-1 bg-gold rounded-full mr-2"></span>{li}</li>
                        ))}
                     </ul>
                   </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
            <h2 className="text-2xl font-black text-navy mb-12 uppercase tracking-widest text-center">Organize Your Fabric Display</h2>
            <div className="grid grid-cols-2 gap-8">
              {organization.map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="aspect-square bg-white border border-gray-200 rounded-3xl mb-6 flex items-center justify-center text-gray-300 font-black uppercase text-[7px] group-hover:border-gold transition-colors p-4 leading-tight">{item.img}</div>
                  <h5 className="font-bold text-sm text-navy mb-2 leading-tight">{item.title}</h5>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Volume Pricing for Hanger Swatches</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
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
                {pricingTiers.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold">{row.qty}</td>
                    <td className="p-6 font-black text-gold text-lg">{row.price}</td>
                    <td className="p-6 text-gray-500 italic">{row.invest}</td>
                    <td className="p-6 text-teal font-black">{row.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">USA Pricing</p>
              <p className="text-xl font-black text-navy">$1.50-2.50 <span className="text-[10px] text-gray-400">/ set</span></p>
              <p className="text-[9px] font-bold text-gold mt-1 uppercase tracking-tighter">MOQ 500+</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">Europe Pricing</p>
              <p className="text-xl font-black text-navy">€1.40-2.30 <span className="text-[10px] text-gray-400">/ set</span></p>
              <p className="text-[9px] font-bold text-gold mt-1 uppercase tracking-tighter">MOQ 500+</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">UAE Pricing</p>
              <p className="text-xl font-black text-navy">AED 6-9 <span className="text-[10px] text-gray-400">/ set</span></p>
              <p className="text-[9px] font-bold text-gold mt-1 uppercase tracking-tighter">MOQ 500+</p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-teal/5 rounded-3xl border border-teal/10">
            <h5 className="font-black text-teal text-xs uppercase tracking-widest mb-6 text-center">Add-On Services Available</h5>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center text-xs font-bold text-navy"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3 shrink-0"></span> Wall mounting hardware kit: +₹5/hanger</div>
              <div className="flex items-center text-xs font-bold text-navy"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3 shrink-0"></span> Professional installation guide: Free</div>
              <div className="flex items-center text-xs font-bold text-navy"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3 shrink-0"></span> Custom rail system design: Quote on request</div>
              <div className="flex items-center text-xs font-bold text-navy"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3 shrink-0"></span> On-site installation (Mumbai area): ₹5,000-15,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Timeline */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-navy text-center mb-24 uppercase tracking-widest">Manufacturing Process Timeline</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:border-gold group-hover:scale-110 transition-all duration-300 relative z-10">
                    <span className="text-gold font-black">{step.s.replace('Step ','')}</span>
                  </div>
                  <h4 className="font-bold text-navy text-sm mb-1 leading-tight">{step.t}</h4>
                  <p className="text-gold text-[10px] font-black uppercase mb-4 tracking-widest">{step.d}</p>
                  <p className="text-[10px] text-gray-400 leading-tight font-medium px-4">{step.info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real Showroom Transformations */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Real Showroom Transformations</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { client: "Luxury Furnishings, Delhi", before: "Fabric swatches in folders on counter", after: "Organized wall display with chrome hangers", stats: ["250 chrome hangers installed", "Customer browsing time increased 40%", "Sales conversion up 25%"] },
              { client: "Window World, Bangalore", before: "Messy fabric samples in drawers", after: "Multi-tier matte black hanger display", stats: ["400 matte black hangers across 3 walls", "Showroom capacity increased to 400+ fabrics", "Customer satisfaction improved significantly"] },
              { client: "Export Textiles India, Mumbai", before: "Fabric books on table for shows", after: "Portable backdrop with wooden hangers", stats: ["80 wooden hangers on portable system", "Lead generation increased 60% at shows", "Professional brand perception boost"] }
            ].map((ex, i) => (
              <div key={i} className="flex flex-col h-full bg-white rounded-3xl border border-gray-100 p-8 shadow-sm group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <div className="aspect-video bg-gray-100 border border-dashed border-gray-200 rounded-2xl mb-8 flex items-center justify-center text-gray-300 text-[8px] font-black uppercase text-center px-4 group-hover:border-gold transition-colors leading-tight">Before / After Visual: {ex.client}</div>
                <div className="mb-6 flex-grow">
                  <h4 className="font-black text-navy text-lg mb-4">{ex.client}</h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex gap-4">
                      <span className="text-[9px] font-black text-red-400 uppercase tracking-widest mt-1 shrink-0">Before</span>
                      <p className="text-xs text-gray-500 italic leading-relaxed">{ex.before}</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[9px] font-black text-teal uppercase tracking-widest mt-1 shrink-0">After</span>
                      <p className="text-xs text-navy font-bold leading-relaxed">{ex.after}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-50 space-y-2">
                  {ex.stats.map((s, j) => (
                    <p key={j} className="text-[10px] text-gray-500 font-bold flex items-center"><span className="w-1 h-1 bg-gold rounded-full mr-2"></span> {s}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SwatchCraft Comparison */}
      <section className="py-24 px-4 max-w-5xl mx-auto overflow-x-auto">
        <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm text-center">Why SwatchCraft Hanger Swatches?</h2>
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
              { f: "Cost per hanger", s: "₹18-25", d: "₹30-40 (materials)", c: "₹15-20" },
              { f: "Lead Time", s: "18-25 days", d: "Immediate (but labor)", c: "35-50 days" },
              { f: "Quality Control", s: "Professional QC", d: "Variable", c: "Inconsistent" },
              { f: "Customization", s: "Full branding", d: "Limited", c: "Limited" },
              { f: "Attachment Quality", s: "Industrial stitching", d: "Manual/amateur", c: "Variable" },
              { f: "Header Cards", s: "Included, printed", d: "Separate cost", c: "Basic only" },
              { f: "MOQ", s: "100 pieces", d: "1+ (time-consuming)", c: "500-1000 pieces" },
              { f: "Consistency", s: "Perfect matching", d: "Varies per batch", c: "Often varies" }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-6 border-r border-gray-100 font-bold bg-gray-50/50">{row.f}</td>
                <td className="p-6 border-r border-gray-100 bg-gold/[0.02] font-black text-teal">{row.s}</td>
                <td className="p-6 border-r border-gray-100 text-gray-400 italic">{row.d}</td>
                <td className="p-6 text-gray-500">{row.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Technical FAQ */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Technical FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-navy leading-tight pr-8">{faq.q}</span>
                  <span className={`text-gold transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4 font-medium">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-black text-navy mb-12 uppercase tracking-widest text-center">Complete Your Fabric Presentation Kit</h2>
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
              <h4 className="font-bold text-navy text-base mb-1 leading-tight">{p.title}</h4>
              <p className="text-gray-400 text-[10px] font-bold uppercase mb-4 tracking-widest">{p.desc}</p>
              <p className="text-gold font-black text-xs mb-6 uppercase tracking-widest">{p.price}</p>
              <button 
                onClick={() => onNavigate(p.id as ViewState)}
                className="text-teal font-black text-[10px] uppercase tracking-widest hover:text-navy transition-colors flex items-center group-hover:translate-x-1"
              >
                View Product 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-teal py-24 px-4 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Transform Your Showroom Display Today</h2>
          <p className="text-white/80 text-lg mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            Request a custom quote for branded fabric hanger swatches designed specifically for your space and collection.
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Wholesale Pricing Modal */}
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
                    <th className="p-4 text-left">Total Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-4 font-bold text-navy">{row.qty}</td>
                      <td className="p-4 font-black text-gold">{row.price}</td>
                      <td className="p-4 text-gray-600 font-medium">{row.invest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-8 text-[10px] text-gray-400 leading-relaxed italic">
              * Final pricing depends on hanger material selection (Chrome vs Wood), header card customization (foil/UV), and total swatch count. Export shipping extra. Free design mockup for orders over 200 units.
            </p>
            <button 
              onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }}
              className="w-full bg-teal text-white font-black py-4 rounded-xl mt-8 shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-xs"
            >
              Get Custom RFQ Now
            </button>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-navy/95 z-[200] flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
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

export default ProductHanger;
