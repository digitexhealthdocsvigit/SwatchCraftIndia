import React, { useState } from 'react';
import { ViewState } from '../App.tsx';
import { 
  Star, CheckCircle2, MessageCircle, Download, Sofa, Store, 
  Monitor, Briefcase, Ruler, Zap, ShieldCheck, Globe, 
  ChevronRight, ArrowRight, HelpCircle, X, Factory, Layers, Trash2
} from 'lucide-react';
import { useGlobalSettings } from './GlobalSettingsContext.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductHanger: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const { formatPrice } = useGlobalSettings();
  const [activeImg, setActiveImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const images = [
    { src: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80", alt: "Fabric hangers displayed on showroom wall" },
    { src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80", alt: "Close-up of metal chrome hanger with branded header" },
    { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", alt: "Wooden hanger with fabric swatch" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", alt: "Multiple hangers showing color coordination" },
    { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", alt: "Retail display setup with hangers" }
  ];

  const pricingTiers = [
    { qty: "5-10 (sample)", price: 80, invest: 800, ideal: "Display testing" },
    { qty: "25-50", price: 40, invest: 2000, ideal: "Small stores" },
    { qty: "100 (MOQ)", price: 23, invest: 2300, ideal: "Standard showroom" },
    { qty: "500+", price: 20, invest: 10000, ideal: "Multi-location chains" },
    { qty: "1000+", price: 18, invest: 18000, ideal: "Export distributors" }
  ];

  const faqs = [
    { q: "Can I order mixed hanger styles in one order?", a: "Yes, we can mix chrome, matte black, and wood in single orders (minimum 25 per style)." },
    { q: "What if my fabrics are different sizes?", a: "We accommodate custom swatch sizes. Standard is 15x15cm, but specify your dimensions when ordering." },
    { q: "Can header cards be double-sided?", a: "Yes, we print double-sided headers (fabric info front, care instructions back) for a professional look." },
    { q: "Do you provide the wall mounting rails?", a: "Rails are available separately or we can recommend standard retail display systems that fit our hangers." },
    { q: "How do I update fabrics seasonally?", a: "Order hangers with clip attachment for easy fabric swapping, or order new complete sets for a fresh look." },
    { q: "Can swatches be removed for customer takeaway?", a: "We can design tear-off swatches or provide extra unmounted samples for your customers." },
    { q: "What's the weight limit per hanger?", a: "Metal hangers: up to 500g, Wooden hangers: up to 300g per unit." },
    { q: "Do you ship internationally?", a: "Yes, we export hanger displays worldwide with export-grade packaging to prevent damage during transit." }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="pt-24 pb-4 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Fabric Hanger Swatches</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Product Gallery */}
          <div className="space-y-6">
            <div 
              className="aspect-[4/3] bg-gray-100 rounded-[3rem] overflow-hidden border border-gray-200 shadow-2xl relative cursor-zoom-in group"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img 
                src={images[activeImg].src} 
                alt={images[activeImg].alt} 
                className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              />
              <div className="absolute top-8 left-8 bg-gold text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Best for Showrooms</div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImg(idx)} 
                  className={`aspect-square rounded-2xl border-2 overflow-hidden transition-all ${activeImg === idx ? 'border-gold ring-4 ring-gold/10 scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-6">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
               <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-2">4.7/5 (45 reviews)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy mb-4 leading-none uppercase tracking-tighter">Fabric Hanger Swatches</h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">Wall-mount fabric display solutions for showrooms, retail stores, and trade shows.</p>
            
            <div className="space-y-4 mb-10">
              {[
                "Metal (chrome, matte black) or wooden hanger options",
                "Pre-attached fabric swatches (15x15cm or 20x20cm)",
                "Branded header cards with collection information",
                "Easy wall-mount display system",
                "Perfect for visual merchandising and showroom walls"
              ].map((item, i) => (
                <div key={i} className="flex items-center text-navy font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal mr-3 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 mb-10">
              <p className="text-gray-400 text-[9px] font-black uppercase mb-1">Wholesale Direct Price</p>
              <p className="text-3xl font-black text-navy leading-none mt-2">Starting from {formatPrice(18)} <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ set for 100+ units</span></p>
              <p className="text-xs text-teal font-bold mt-3">Bulk Export Pricing Available</p>
              <button 
                onClick={() => setShowPricingModal(true)}
                className="text-teal font-black text-[10px] uppercase tracking-widest mt-4 flex items-center gap-1 hover:text-gold transition-colors"
              >
                View Wholesale Pricing <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="bg-navy/5 px-4 py-2 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest">MOQ: 100 Hangers</div>
              <div className="bg-navy/5 px-4 py-2 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest">Lead Time: 18-25 Days</div>
              <div className="bg-navy/5 px-4 py-2 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest">Sample: {formatPrice(80)}/set</div>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-6 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">Request Bulk Quote</button>
              <a href="https://wa.me/919004962871" className="w-full border-2 border-[#25D366] text-[#25D366] font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white transition-all text-sm uppercase tracking-widest">
                <MessageCircle className="w-5 h-5" /> WhatsApp for Showroom Setup
              </a>
              <button onClick={() => onDownload('Hanger Display Guide')} className="text-gray-400 text-[10px] font-black underline uppercase tracking-widest hover:text-navy transition-colors text-center mt-2">
                Download Display Guide PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specifications Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy mb-12 text-center uppercase tracking-tighter">Technical Specifications</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-100">
                {[
                  { s: "Product Type", d: "Fabric Hanger Swatch Display" },
                  { s: "Hanger Material", d: "Metal (chrome, matte black, brushed nickel) or Natural wood" },
                  { s: "Hanger Size", d: "Standard: 12-15 inches wide, Premium: 18 inches" },
                  { s: "Swatch Size", d: "Standard: 15x15cm, Large: 20x20cm, Custom sizes available" },
                  { s: "Header Card", d: "Printed cardstock (300 GSM) with logo and fabric information" },
                  { s: "Attachment Method", d: "Professional stitching or fabric-safe clips" },
                  { s: "Hook Type", d: "Swivel hook for easy wall mounting" },
                  { s: "Label Options", d: "Fabric code, composition, care symbols, price tags" },
                  { s: "Best For", d: "Showrooms, retail displays, trade show booths, furniture stores" },
                  { s: "Lead Time", d: "18-25 days after fabric receipt" },
                  { s: "Packaging", d: "Individual poly bags, export cartons with dividers" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-8 font-black text-navy text-[11px] uppercase tracking-widest w-1/3 bg-gray-50/50">{row.s}</td>
                    <td className="py-5 px-8 text-sm text-gray-600 font-medium">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Style Options */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Choose Your Display Style</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { t: "Chrome Metal Hangers", d: "Professional polished chrome finish for luxury showrooms", f: ["Mirror-finish chrome plating", "Rust-resistant coating", "Smooth edges (no snagging)", "Swivel hook", "Up to 500g capacity"], p: 22, i: "[Chrome hanger visual]" },
              { t: "Matte Black Metal", d: "Contemporary matte black finish for modern showroom aesthetics", f: ["Powder-coated matte finish", "Scratch-resistant surface", "Minimalist design", "Perfect for dark fabrics", "Sleek professional appearance"], p: 20, i: "[Matte black visual]" },
              { t: "Natural Wood Hangers", d: "Premium wooden hangers for classic and traditional showrooms", f: ["Solid wood construction", "Natural wood grain finish", "Eco-friendly option", "Warm, traditional aesthetic", "Custom stains available"], p: 25, i: "[Wooden hanger visual]" }
            ].map((style, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3.5rem] border border-gray-100 group flex flex-col hover:border-gold transition-all duration-500">
                <div className="aspect-square bg-white rounded-3xl mb-8 flex items-center justify-center text-gray-300 font-black text-[10px] uppercase tracking-widest text-center px-10 border border-gray-100">{style.i}</div>
                <h4 className="text-2xl font-black text-navy mb-4 uppercase tracking-tight">{style.t}</h4>
                <p className="text-gray-500 text-sm font-medium mb-8 flex-grow leading-relaxed">{style.d}</p>
                <ul className="space-y-3 mb-10">
                  {style.f.map((feat, idx) => (
                    <li key={idx} className="flex items-center text-[10px] font-black text-navy uppercase tracking-widest opacity-70">
                       <ShieldCheck className="w-4 h-4 text-teal mr-2 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Pricing from</p>
                  <p className="text-2xl font-black text-navy">{formatPrice(style.p)}-{formatPrice(style.p + 5)} <span className="text-xs text-gray-400">/ set</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Header Card Customization */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Branded Header Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Simple Logo Header", d: "Company logo, collection name. 10x15cm. Full color, matte lamination.", i: "[Logo header mockup]" },
              { t: "Detailed Info Header", d: "Logo, fabric code, composition, care symbols, price. 12x18cm. Barcodes ready.", i: "[Detailed header mockup]" },
              { t: "Seasonal Collection", d: "Themed artwork, season, year, logo. 15x20cm oversized. Premium finish.", i: "[Seasonal header mockup]" },
              { t: "Minimal Tag Style", d: "Fabric code and logo only. 5x8cm compact. Simple 2-color print.", i: "[Tag style mockup]" }
            ].map((opt, i) => (
              <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 text-center flex flex-col h-full shadow-sm group hover:shadow-xl transition-all">
                <div className="aspect-video bg-gray-50 rounded-2xl mb-6 flex items-center justify-center text-gray-300 font-black text-[9px] uppercase px-4 leading-relaxed">{opt.i}</div>
                <h5 className="font-black text-navy uppercase text-sm mb-3 tracking-widest">{opt.t}</h5>
                <p className="text-gray-500 text-[11px] leading-relaxed font-medium flex-grow">{opt.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attachment Methods */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Professional Fabric Mounting</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { t: "Professional Stitching", d: "Permanent fabric attachment with industrial stitching. Best for long-term secure displays. Fabric folded over bar and stitched with matched thread.", i: "[Stitched attachment visual]" },
              { t: "Fabric-Safe Clips", d: "Removable clips allow seasonal fabric swapping without damage. Perfect for frequently updated collections or rental samples.", i: "[Clip attachment visual]" },
              { t: "Adhesive Mounting", d: "Fabric swatch adhered to rigid card then hung. Best for lightweight fabrics or promotional displays. Ensures flat, space-efficient presentation.", i: "[Adhesive mounting visual]" }
            ].map((method, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-video bg-gray-100 rounded-[3rem] border border-gray-100 flex items-center justify-center text-gray-300 font-black text-[9px] uppercase px-8 text-center">{method.i}</div>
                <h4 className="text-xl font-black text-navy uppercase tracking-tight">{method.t}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{method.d}</p>
                <div className="flex gap-2">
                   <span className="bg-teal/10 text-teal text-[9px] font-black px-3 py-1 rounded-full uppercase">Standard</span>
                   <span className="bg-gold/10 text-gold text-[9px] font-black px-3 py-1 rounded-full uppercase">Professional</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Perfect Display Solutions For</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: <Sofa className="w-10 h-10" />, title: "Furniture Showrooms", desc: "Wall-mounted libraries for tactile browsing. Orders: 200-500 units." },
              { icon: <Store className="w-10 h-10" />, title: "Retail Curtain Stores", desc: "Vertical display maximizes wall space for comparing textures. Orders: 150-300 units." },
              { icon: <Monitor className="w-10 h-10" />, title: "Trade Show Booths", desc: "Portable backdrop wall displays. Easy transport. Orders: 50-100 units." },
              { icon: <Briefcase className="w-10 h-10" />, title: "Sales Rep Kits", desc: "Compact hanger sets in garment bags for client meetings. Orders: 20-50 units." },
              { icon: <Ruler className="w-10 h-10" />, title: "Designer Studios", desc: "Organized library for professional consultations. Orders: 100-200 units." }
            ].map((use, i) => (
              <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm text-center flex flex-col h-full hover:shadow-xl transition-all">
                <div className="text-teal mb-6 flex justify-center">{use.icon}</div>
                <h4 className="font-black text-navy mb-4 uppercase text-sm leading-tight tracking-tight">{use.title}</h4>
                <p className="text-gray-500 text-[11px] leading-relaxed font-medium flex-grow">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Display System Options */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Complete Wall Display Solutions</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { t: "Single Row Display", i: "[Single row visual]", s: ["One rail system (20-30 hangers)", "6-8 feet wall space", "Height: 5-6ft from floor", "Best for small boutiques"] },
              { t: "Multi-Tier Display", i: "[Multi-tier visual]", s: ["3-4 rail system (60-120 hangers)", "8-10 feet wall space", "Heights: 4ft, 5.5ft, 7ft", "Full collection display"] },
              { t: "Rotating Display Stand", i: "[Rotating stand visual]", s: ["Floor stand (40-60 hangers)", "Footprint: 3x3 feet", "360-degree rotation", "Best for trade shows"] }
            ].map((conf, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-[4/3] bg-gray-50 rounded-[3rem] border border-gray-100 flex items-center justify-center text-gray-300 font-black text-[9px] uppercase">{conf.i}</div>
                <h4 className="text-xl font-black text-navy uppercase tracking-tight">{conf.t}</h4>
                <ul className="space-y-3">
                  {conf.s.map((spec, j) => (
                    <li key={j} className="flex items-start text-xs font-bold text-gray-500 uppercase tracking-widest">
                       <Zap className="w-3 h-3 text-gold mr-2 mt-0.5 shrink-0" /> {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Strategies */}
      <section className="py-24 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Organize Your Fabric Display</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Color Gradient", d: "Arrange fabrics from light to dark for visually stunning showroom displays.", i: "[Color gradient visual]" },
              { t: "Collection Grouping", d: "Organize by seasonal collection with header separators for easy navigation.", i: "[Collection group visual]" },
              { t: "Fabric Type Zones", d: "Group similar textures (all velvets, all linens) for category comparisons.", i: "[Texture zones visual]" },
              { t: "Price Point Zones", d: "Arrange by price range to help customers find suitable budget options quickly.", i: "[Price zones visual]" }
            ].map((strat, i) => (
              <div key={i} className="flex flex-col h-full group">
                 <div className="aspect-video bg-white rounded-3xl mb-6 border border-gray-100 shadow-sm flex items-center justify-center text-[9px] font-black text-gray-300 uppercase px-6 text-center leading-relaxed group-hover:border-gold transition-colors">{strat.i}</div>
                 <h5 className="text-lg font-black text-navy mb-3 uppercase tracking-tight">{strat.t}</h5>
                 <p className="text-gray-500 text-xs font-medium leading-relaxed flex-grow">{strat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-tighter">Volume Pricing for Hanger Swatches</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-xl">
             <table className="w-full text-left font-bold text-navy text-sm border-collapse">
                <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th className="p-8">Order Quantity</th>
                    <th className="p-8">Price per Hanger</th>
                    <th className="p-8">Total Investment</th>
                    <th className="p-8">Ideal For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((tier, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-8 uppercase tracking-widest text-[10px] text-gray-400">{tier.qty}</td>
                      <td className="p-8 text-gold text-lg font-black">{formatPrice(tier.price)}</td>
                      <td className="p-8 font-medium text-navy/50">{formatPrice(tier.invest)}+</td>
                      <td className="p-8 text-[10px] font-black uppercase tracking-widest text-navy">{tier.ideal}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-gold font-black uppercase text-[10px] tracking-widest mb-1">USA Export</p>
                <p className="text-sm font-bold text-navy">$1.50 - $2.50 per set</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-gold font-black uppercase text-[10px] tracking-widest mb-1">Europe Export</p>
                <p className="text-sm font-bold text-navy">€1.40 - €2.30 per set</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-gold font-black uppercase text-[10px] tracking-widest mb-1">UAE Export</p>
                <p className="text-sm font-bold text-navy">AED 6 - 9 per set</p>
             </div>
          </div>

          <div className="mt-16 bg-navy text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <h4 className="text-xl font-black mb-6 uppercase tracking-tighter text-gold">Available Add-On Services</h4>
             <ul className="grid sm:grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-widest">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-teal" /> Wall Hardware Kit (+{formatPrice(5)}/pc)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-teal" /> Custom Rail System Design</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-teal" /> Mumbai Installation Service</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-teal" /> Pro Installation Guide (Free)</li>
             </ul>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Manufacturing Process Timeline</h2>
          <div className="relative">
             <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
               {[
                 { s: "Step 1", t: "Design Approval", d: "Days 1-3", i: "🎨" },
                 { s: "Step 2", t: "Hanger Prep", d: "Days 4-8", i: "🛠️" },
                 { s: "Step 3", t: "Fabric Processing", d: "Days 9-15", i: "✂️" },
                 { s: "Step 4", t: "Card Printing", d: "Days 10-14", i: "🖨️" },
                 { s: "Step 5", t: "Final Assembly", d: "Days 16-22", i: "🧵" },
                 { s: "Step 6", t: "Packaging", d: "Days 23-25", i: "📦" }
               ].map((step, i) => (
                 <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 text-center shadow-sm hover:scale-105 transition-transform group">
                   <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-gold transition-colors">{step.i}</div>
                   <p className="text-gold font-black text-[9px] uppercase tracking-widest mb-1">{step.s}</p>
                   <h4 className="font-bold text-navy text-xs mb-1 leading-tight">{step.t}</h4>
                   <p className="text-gray-400 font-bold text-[9px] uppercase">{step.d}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Customer Examples */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Real Showroom Transformations</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { c: "Premium Furniture Store", b: "[Folders on counter]", a: "[Wall display w/ chrome]", s: "250 installed. Sales up 25%.", client: "Luxury Furnishings, Delhi" },
              { c: "Curtain Retail Chain", b: "[Messy drawers]", a: "[Multi-tier matte black]", s: "400 units. Capacity up 400 fabrics.", client: "Window World, Bangalore" },
              { c: "Trade Show Booth", b: "[Books on table]", a: "[Wooden hanger backdrop]", s: "80 units. Leads up 60% per show.", client: "Export Textiles India, Mumbai" }
            ].map((ex, i) => (
              <div key={i} className="space-y-6">
                <div className="grid grid-cols-2 gap-2 aspect-[16/10]">
                   <div className="bg-gray-100 rounded-2xl flex items-center justify-center text-[7px] font-black text-gray-400 uppercase p-4 text-center">BEFORE: {ex.b}</div>
                   <div className="bg-teal/5 rounded-2xl flex items-center justify-center text-[7px] font-black text-teal uppercase p-4 text-center border border-teal/20">AFTER: {ex.a}</div>
                </div>
                <div>
                   <h4 className="text-xl font-black text-navy uppercase tracking-tight">{ex.c}</h4>
                   <p className="text-gold font-black text-[10px] uppercase tracking-widest mt-1 mb-4">{ex.client}</p>
                   <p className="text-gray-500 text-sm font-medium leading-relaxed italic">{ex.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-tighter">Why SwatchCraft Hanger Swatches?</h2>
          <table className="w-full bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-xl text-left border-collapse min-w-[600px]">
            <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-6">Feature</th>
                <th className="p-6">SwatchCraft</th>
                <th className="p-6">DIY Solution</th>
                <th className="p-6">Import (China)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold text-navy text-xs">
              {[
                { f: "Cost per unit", s: "₹18-25", d: "₹30-40 (materials)", c: "₹15-20" },
                { f: "Lead Time", s: "18-25 Days", d: "Immediate (high labor)", c: "35-50 Days" },
                { f: "Quality Control", s: "Professional QC", d: "Variable", c: "Inconsistent" },
                { f: "Customization", s: "Full Branding", d: "Extremely Limited", c: "Basic/Limited" },
                { f: "Attachment", s: "Industrial Stitch", d: "Manual/Amateur", c: "Variable/Weak" },
                { f: "MOQ", s: "100 pieces", d: "1+ (but slow)", c: "500-1000 pieces" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 bg-gray-50/50 w-1/4 uppercase tracking-widest text-[9px]">{row.f}</td>
                  <td className="p-6 text-teal font-black">{row.s}</td>
                  <td className="p-6 text-gray-400">{row.d}</td>
                  <td className="p-6 text-gray-400">{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-tighter">Technical FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none hover:bg-white transition-colors"
                >
                  <span className="font-black text-navy uppercase tracking-widest text-sm">{faq.q}</span>
                  <HelpCircle className={`w-6 h-6 text-gold transform transition-transform duration-500 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-6 font-medium animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Complete Your Presentation Kit</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Upholstery Swatch Books", p: 70, target: 'product-upholstery', d: "For portable presentations" },
              { t: "Ring Swatch Sets", p: 20, target: 'product-ring', d: "For sales representatives" },
              { t: "Sample Cards", p: 15, target: 'product-cards', d: "For takeaway samples" }
            ].map((prod, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 group shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                <div className="aspect-video bg-gray-50 rounded-2xl mb-6 flex items-center justify-center text-gray-200 font-black text-[9px] uppercase tracking-widest text-center px-6">Product Visual</div>
                <h4 className="text-lg font-black text-navy mb-1 uppercase tracking-tight group-hover:text-gold transition-colors">{prod.t}</h4>
                <p className="text-gray-400 text-[10px] font-bold uppercase mb-6 flex-grow">{prod.d}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                   <span className="text-[10px] font-black text-navy uppercase tracking-widest">From {formatPrice(prod.p)}</span>
                   <button onClick={() => onNavigate(prod.target as ViewState)} className="text-teal font-black text-[10px] uppercase tracking-widest hover:underline">View Product →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-teal py-24 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden flex items-center justify-center">
           <div className="w-[150%] h-[150%] grid grid-cols-12 gap-8 transform rotate-12 opacity-30">
             {[...Array(48)].map((_, i) => <div key={i} className="bg-white/20 rounded-full h-full aspect-square"></div>)}
           </div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-tight">Transform Your Showroom Display Today</h2>
          <p className="text-white/80 text-lg mb-12 font-medium">Request a custom quote for branded fabric hanger swatches and professional installation guides.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => onNavigate('contact-page')} className="bg-navy text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-navy transition-all uppercase tracking-widest text-xs">Get Showroom Quote</button>
            <button onClick={() => onDownload('Sample Hanger Pack')} className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">Order Sample Set ({formatPrice(400)})</button>
          </div>
          <p className="mt-8 text-[10px] text-white/60 font-black uppercase tracking-widest">Free display layout consultation for orders over 200 hangers</p>
        </div>
      </section>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-navy/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <button onClick={() => setShowPricingModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-navy transition-colors"><X className="w-8 h-8" /></button>
            <div className="p-12">
               <h3 className="text-2xl font-black text-navy uppercase tracking-widest mb-10 border-b border-gray-100 pb-4 text-center">Hanger Wholesale Price Matrix</h3>
               <table className="w-full text-left font-bold text-navy text-sm">
                 <thead className="bg-navy/5 text-[9px] font-black uppercase tracking-widest">
                   <tr><th className="p-4">Quantity Tier</th><th className="p-4 text-right">Price per Unit</th><th className="p-4 text-right">Investment</th></tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {pricingTiers.map((tier, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 uppercase tracking-widest text-[10px] text-gray-400">{tier.qty}</td>
                        <td className="p-4 text-right font-black text-gold text-lg">{formatPrice(tier.price)}</td>
                        <td className="p-4 text-right text-navy/50">{formatPrice(tier.invest)}</td>
                      </tr>
                    ))}
                 </tbody>
               </table>
               <div className="mt-8 p-6 bg-teal/5 rounded-2xl border border-teal/10">
                  <h5 className="font-black text-teal uppercase text-[10px] mb-2 tracking-widest">Optional Services</h5>
                  <ul className="text-[10px] font-bold text-gray-500 uppercase space-y-2">
                    <li className="flex justify-between"><span>Wall Hardware Kit</span> <span>+ {formatPrice(5)}/hanger</span></li>
                    <li className="flex justify-between"><span>Custom Rail Design</span> <span>Quote on Request</span></li>
                    <li className="flex justify-between"><span>Mumbai Installation</span> <span>{formatPrice(5000)}+</span></li>
                  </ul>
               </div>
               <button onClick={() => { setShowPricingModal(false); onNavigate('contact-page'); }} className="w-full bg-navy text-white font-black py-5 rounded-2xl mt-12 uppercase tracking-widest text-xs shadow-xl">Start Technical RFQ Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60]">
        <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-2xl uppercase tracking-widest text-sm">Request Showroom Quote</button>
      </div>
    </div>
  );
};

export default ProductHanger;