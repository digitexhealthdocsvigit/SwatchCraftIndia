
import { 
  Star, CheckCircle2, MessageCircle, Download, Briefcase, 
  Monitor, Layout, Factory, Globe, ShieldCheck, Zap, 
  ChevronRight, ArrowRight, HelpCircle, X, Maximize2, 
  Layers, Settings, Package, TrendingUp, Archive, PenTool, Smartphone, Award, ClipboardList, Box, Ruler,
  // Fix: Added missing History icon import from lucide-react
  History
} from 'lucide-react';
import { useGlobalSettings } from './GlobalSettingsContext.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductRingSwatch: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const { formatPrice } = useGlobalSettings();
  const [activeThumb, setActiveThumb] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const thumbnails = [
    { label: "Main View", src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", placeholder: "Ring swatch set being flipped through by hand" },
    { label: "Case Detail", src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80", placeholder: "Compact ring swatch set in protective case" },
    { label: "Mechanism", src: "https://images.unsplash.com/photo-1520183802803-06f731a2059f?auto=format&fit=crop&w=800&q=80", placeholder: "Close-up of metal ring binding mechanism" },
    { label: "Fanned Swatches", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", placeholder: "Multiple fabric swatches fanned out" },
    { label: "Presentation", src: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80", placeholder: "Sales rep presenting swatches to client" }
  ];

  const pricingTiers = [
    { q: "5-10 (sample)", p: 80, i: 800, best: "Testing quality" },
    { q: "25-50", p: 40, i: 2000, best: "Small sales teams" },
    { q: "75-100 (MOQ)", p: 23, i: 2300, best: "Single sales team" },
    { q: "100-500", p: 20, i: 10000, best: "Multi-location teams" },
    { q: "500+ (export)", p: 17, i: 8500, best: "Distributor networks" }
  ];

  const faqs = [
    { q: "Can I mix different fabric types in one ring set?", a: "Yes, you can include upholstery, curtain, and other fabrics in one set for a comprehensive coordinated presentation." },
    { q: "How many swatches can one ring set hold?", a: "Standard sets hold 30-40 swatches comfortably. Maximum capacity is 50 swatches with our larger 38mm ring mechanisms." },
    { q: "Are replacement rings available?", a: "Yes, we supply replacement ring mechanisms separately for ₹20-30 per set if you wish to reuse covers." },
    { q: "Can individual pages/swatches be reordered?", a: "Absolutely. We can manufacture and ship individual replacement swatches to keep your team's kits up-to-date." },
    { q: "What if I need to update fabrics seasonally?", a: "Simply order new swatches with pre-punched holes. Your team can remove old fabrics and add new ones in minutes." },
    { q: "Can customers take swatches out?", a: "Yes, the rings are designed for easy opening, allowing customers to remove swatches for tactile inspection or color matching." },
    { q: "Do you provide blank sets for me to add my own fabrics?", a: "Yes, we sell blank ring sets consisting of custom branded covers and the ring mechanism only." },
    { q: "What's the minimum order for custom branding?", a: "Our MOQ for full custom branding (logo, brand colors, etc.) is 75 sets per collection." },
    { q: "Can I get mixed sizes in one order?", a: "Yes, you can mix landscape, portrait, and mini sizes in a single order with a minimum of 25 per style." },
    { q: "Do you offer rush production?", a: "Yes, we offer a 10-12 day rush production service for an additional 15% cost over standard rates." }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Ring Swatch Sample Sets</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Product Gallery */}
          <div className="space-y-6">
            <div 
              className="aspect-[4/3] bg-gray-100 rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-2xl relative cursor-zoom-in group"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img 
                src={thumbnails[activeThumb].src} 
                alt={thumbnails[activeThumb].placeholder} 
                className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              />
              <div className="absolute top-8 left-8 bg-[#d4a574] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Perfect for Sales Teams</div>
              {!isZoomed && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                  <Maximize2 className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-3">
              {thumbnails.map((thumb, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveThumb(idx)} 
                  className={`aspect-square rounded-2xl border-2 overflow-hidden transition-all ${activeThumb === idx ? 'border-[#d4a574] ring-4 ring-gold/10 scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={thumb.src} alt={thumb.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div>
            <div className="flex items-center gap-2 text-[#d4a574] mb-6">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
               <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-2">4.8/5 (37 reviews)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e3a5f] mb-4 leading-none uppercase tracking-tighter">Ring Swatch Sample Sets</h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium italic">"Compact, durable sample sets designed for mobile sales teams and trade show presentations."</p>
            
            <div className="space-y-4 mb-10">
              {[
                "Compact ring-bound format fits in briefcase or travel bag",
                "Capacity: 20-40 fabric swatches per set",
                "Durable metal ring binding for easy flipping",
                "Individual swatches can be removed for customer inspection",
                "Available in landscape or portrait orientation"
              ].map((item, i) => (
                <div key={i} className="flex items-center text-[#1e3a5f] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#0d7377] mr-3 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 mb-10">
              <p className="text-gray-400 text-[9px] font-black uppercase mb-1 leading-none">Starting from</p>
              <p className="text-3xl font-black text-[#1e3a5f] leading-none mt-2">{formatPrice(20)} <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ set for 100+ units</span></p>
              <p className="text-xs text-[#0d7377] font-bold mt-3 uppercase tracking-tighter">Bulk Pricing for Sales Team Orders</p>
              <button 
                onClick={() => setIsPricingModalOpen(true)}
                className="text-[#0d7377] font-black text-[10px] uppercase tracking-widest mt-4 flex items-center gap-1 hover:text-[#d4a574] transition-colors underline decoration-2 underline-offset-4"
              >
                View Volume Discounts <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="bg-[#1e3a5f]/5 px-4 py-2 rounded-xl text-[10px] font-black text-[#1e3a5f] uppercase tracking-widest">MOQ: 75 sets</div>
              <div className="bg-[#1e3a5f]/5 px-4 py-2 rounded-xl text-[10px] font-black text-[#1e3a5f] uppercase tracking-widest">Lead Time: 15-20 days</div>
              <div className="bg-[#1e3a5f]/5 px-4 py-2 rounded-xl text-[10px] font-black text-[#1e3a5f] uppercase tracking-widest">Sample: {formatPrice(80)}/set</div>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="w-full bg-[#0d7377] text-white font-black py-6 rounded-2xl shadow-xl hover:bg-[#1e3a5f] transition-all text-lg uppercase tracking-widest">Request Quote for Sales Team</button>
              <a href="https://wa.me/919004962871" className="w-full border-2 border-[#25D366] text-[#25D366] font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white transition-all text-sm uppercase tracking-widest">
                <MessageCircle className="w-5 h-5" /> WhatsApp for Quick Quote
              </a>
              <button onClick={() => onDownload('Ring Swatch Specifications')} className="text-gray-400 text-[10px] font-black underline uppercase tracking-widest hover:text-[#1e3a5f] transition-colors text-center mt-2">
                Download Product Specifications
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specifications Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-[#1e3a5f] mb-12 text-center uppercase tracking-tighter">Technical Specifications</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <tbody className="divide-y divide-gray-100">
                {[
                  { s: "Product Type", d: "Ring-Bound Fabric Sample Set" },
                  { s: "Binding", d: "Metal ring mechanism (2-ring or 3-ring)" },
                  { s: "Ring Size", d: "25mm, 32mm, or 38mm diameter" },
                  { s: "Swatch Capacity", d: "20-40 fabric samples (expandable)" },
                  { s: "Swatch Size", d: "Standard: 10x10cm, Large: 12x12cm, Custom available" },
                  { s: "Orientation", d: "Landscape or Portrait" },
                  { s: "Cover Material", d: "Heavy-duty cardstock, vinyl, or leatherette" },
                  { s: "Page Material", d: "200 GSM cardstock or plastic sleeves" },
                  { s: "Label Options", d: "Fabric codes, QR codes, pricing tags" },
                  { s: "Weight", d: "200-400g (ultra-portable)" },
                  { s: "MOQ", d: "75 sets per collection" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-8 font-black text-[#1e3a5f] text-[11px] uppercase tracking-widest w-1/3 bg-gray-50/50">{row.s}</td>
                    <td className="py-5 px-8 text-sm text-gray-600 font-medium">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Format Options */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a5f] text-center mb-16 uppercase tracking-tighter">Choose Your Ideal Format</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                t: "Landscape Ring Set", 
                i: "[Landscape ring set open]", 
                specs: ["15x11cm (A6 landscape)", "Swatch: 12x10cm", "20-30 swatches"], 
                best: ["Wide fabric swatches", "Horizontal patterns"],
                feats: ["Lies flat when open", "Easy one-handed flipping"],
                p: 20
              },
              { 
                t: "Portrait Ring Set", 
                i: "[Portrait ring set]", 
                specs: ["11x15cm (A6 portrait)", "Swatch: 10x12cm", "25-35 swatches"], 
                best: ["Vertical orientation", "Curtain collections"],
                feats: ["Standard binder format", "Stackable storage"],
                p: 18
              },
              { 
                t: "Mini Travel Set", 
                i: "[Compact mini set]", 
                specs: ["10x10cm (square compact)", "Swatch: 8x8cm", "15-20 swatches"], 
                best: ["Ultra-portable carry", "Quick color references"],
                feats: ["Fits in jacket pocket", "Lightweight (150g)"],
                p: 15
              }
            ].map((format, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3.5rem] border border-gray-100 group flex flex-col hover:border-[#d4a574] transition-all duration-500 h-full">
                <div className="aspect-square bg-white rounded-3xl mb-8 flex items-center justify-center text-gray-300 font-black text-[10px] uppercase tracking-widest text-center px-10 border border-gray-100">{format.i}</div>
                <h4 className="text-2xl font-black text-[#1e3a5f] mb-6 uppercase tracking-tight">{format.t}</h4>
                
                <div className="mb-6">
                  <h5 className="text-[9px] font-black text-[#d4a574] uppercase tracking-widest mb-3">Specifications</h5>
                  <ul className="space-y-2">
                    {format.specs.map((s, idx) => <li key={idx} className="text-xs font-bold text-[#1e3a5f] flex items-center gap-2"><Zap className="w-3 h-3 text-[#0d7377]" /> {s}</li>)}
                  </ul>
                </div>

                <div className="mb-6 flex-grow">
                   <h5 className="text-[9px] font-black text-[#d4a574] uppercase tracking-widest mb-3">Best For</h5>
                   <div className="flex flex-wrap gap-2">
                      {format.best.map((b, idx) => <span key={idx} className="bg-white px-3 py-1 rounded-full text-[9px] font-bold text-gray-500 uppercase border border-gray-100">{b}</span>)}
                   </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-2xl font-black text-[#1e3a5f]">{formatPrice(format.p)} <span className="text-[10px] font-bold text-gray-400">/ starting price</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ring Binding Options */}
      <section className="py-24 px-4 bg-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tighter text-[#d4a574]">Durable Binding Systems</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { t: "Standard 2-Ring", i: "[2-ring mechanism]", d: "Simple, reliable mechanism. Easy swatch addition/removal. Compact profile.", cap: "Up to 30 swatches", best: "Standard collections" },
              { t: "Heavy-Duty 3-Ring", i: "[3-ring mechanism]", d: "Extra stability for larger sets. Professional appearance and premium feel.", cap: "Up to 40+ swatches", best: "Premium brands" },
              { t: "Clip Ring System", i: "[Clip ring detail]", d: "Snap-open/snap-close rings. Quick page changes. Sales team friendly.", cap: "Up to 35 swatches", best: "Frequently updated" }
            ].map((type, i) => (
              <div key={i} className="flex flex-col h-full bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-colors">
                <div className="aspect-video bg-white/10 rounded-2xl mb-8 flex items-center justify-center text-white/20 font-black text-[9px] uppercase">{type.i}</div>
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight text-white">{type.t}</h4>
                <p className="text-gray-400 text-sm font-medium mb-8 flex-grow leading-relaxed">{type.d}</p>
                <div className="pt-6 border-t border-white/10">
                   <p className="text-[9px] font-black text-[#d4a574] uppercase tracking-widest">Capacity: {type.cap}</p>
                   <p className="text-xs font-bold text-white mt-1 uppercase">{type.best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a5f] text-center mb-16 uppercase tracking-tighter">Complete Branding Customization</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { t: "Cover Design", d: "Logo (embossed/printed), brand colors, premium materials.", icon: <Archive className="w-10 h-10" />, i: "[Custom covers]" },
              { t: "Swatch Labeling", d: "Fabric codes, composition, care symbols, price tags.", icon: <PenTool className="w-10 h-10" />, i: "[Labeled swatches]" },
              { t: "Index/Dividers", d: "Color-coded tabs for collection separators.", icon: <Layers className="w-10 h-10" />, i: "[Dividers]" },
              { t: "Protective Case", d: "Vinyl zippered case with branded logo embossing.", icon: <Smartphone className="w-10 h-10" />, i: "[Zippered case]" },
              { t: "Insert Cards", d: "Business card pockets and care instruction sheets.", icon: <ClipboardList className="w-10 h-10" />, i: "[Insert cards]" }
            ].map((opt, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all">
                 <div className="text-[#0d7377] mb-6 flex justify-center">{opt.icon}</div>
                 <h4 className="font-black text-[#1e3a5f] uppercase text-sm mb-3 tracking-tight">{opt.t}</h4>
                 <p className="text-gray-500 text-[11px] leading-relaxed font-medium">{opt.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a5f] mb-16 uppercase tracking-tighter">Designed For Mobile Professionals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Briefcase className="w-10 h-10" />, title: "Sales Representatives", desc: "Ultra-portable kits for designer visits. Sales teams report 35% faster decision-making.", ord: "20-50 units", roi: "Close projects 20% faster" },
              { icon: <Monitor className="w-10 h-10" />, title: "Trade Show Exhibitors", desc: "Compact booth usage. Professional brand image that stands out from competitors.", ord: "30-60 units", roi: "Generate 2x more qualified leads" },
              { icon: <Layers className="w-10 h-10" />, title: "Interior Designers", desc: "Organized by style or project. Clients love the tactile interaction and convenience.", ord: "10-25 units", roi: "Present 30 fabrics in 2 mins" },
              { icon: <Factory className="w-10 h-10" />, title: "Furniture Manufacturer Reps", desc: "Show full upholstery ranges compactly with manufacturer white-label identity.", ord: "50-100 units", roi: "+30% average order value" },
              { icon: <Globe className="w-10 h-10" />, title: "Fabric Exporters", desc: "Lightweight for international shipping. Customs-friendly format that buyers keep.", ord: "100-200 units", roi: "Win 40% more export contracts" }
            ].map((use, i) => (
              <div key={i} className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex flex-col h-full group hover:shadow-2xl transition-all text-center">
                <div className="text-[#0d7377] mb-6 flex justify-center group-hover:scale-110 transition-transform">{use.icon}</div>
                <h4 className="font-black text-[#1e3a5f] mb-4 uppercase text-lg leading-tight">{use.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8 flex-grow">{use.desc}</p>
                <div className="pt-6 border-t border-gray-50 flex flex-col gap-2">
                   <p className="text-[10px] text-[#0d7377] font-black uppercase tracking-widest">ROI: {use.roi}</p>
                   <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Typical Order: {use.ord}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Swatch Mounting Options */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a5f] text-center mb-16 uppercase tracking-tighter">Flexible Swatch Systems</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { 
                t: "Punched Fabric Swatches", 
                i: "[Swatches with punched holes]", 
                d: "Direct fabric mounting with reinforced holes. Maximum tactile authenticity.",
                pros: ["Tactile feel", "Lightweight", "Authentic touch"],
                best: "Durable fabrics, premium brands"
              },
              { 
                t: "Plastic Sleeve Protection", 
                i: "[Fabric in clear sleeves]", 
                d: "Swatches protected in clear plastic sleeves. Removable for customer inspection.",
                pros: ["Fabric protection", "Cleaner look", "Reusable sleeves"],
                best: "Delicate fabrics, trade shows"
              },
              { 
                t: "Cardstock Mounted Swatches", 
                i: "[Fabric glued to cards]", 
                d: "Adhered to punched cardstock pages. Rigid structure with printed info space.",
                pros: ["Neat presentation", "Rigid structure", "Detailed info"],
                best: "Permanent references, showrooms"
              }
            ].map((method, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-[16/10] bg-gray-50 rounded-[3rem] border border-gray-100 flex items-center justify-center text-gray-300 font-black text-[9px] uppercase px-12 text-center">{method.i}</div>
                <h4 className="text-2xl font-black text-[#1e3a5f] uppercase tracking-tight">{method.t}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{method.d}</p>
                <ul className="space-y-2">
                   {method.pros.map((p, idx) => <li key={idx} className="flex items-center text-[10px] font-black text-[#1e3a5f] uppercase"><ShieldCheck className="w-4 h-4 text-[#0d7377] mr-2" /> {p}</li>)}
                </ul>
                <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10">
                   <p className="text-[9px] font-black text-[#d4a574] uppercase tracking-widest mb-1">Best For</p>
                   <p className="text-xs font-bold text-[#1e3a5f]">{method.best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-[#1e3a5f] text-center mb-12 uppercase tracking-tighter">Volume Pricing for Ring Swatch Sets</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-xl">
             <table className="w-full text-left font-bold text-[#1e3a5f] text-sm border-collapse">
                <thead className="bg-[#1e3a5f] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th className="p-8">Order Quantity</th>
                    <th className="p-8">Price per Set</th>
                    <th className="p-8">Total Investment</th>
                    <th className="p-8">Ideal For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((tier, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-8 uppercase tracking-widest text-[10px] text-gray-400">{tier.q}</td>
                      <td className="p-8 text-[#d4a574] text-lg font-black">{formatPrice(tier.p)}</td>
                      <td className="p-8 font-medium text-[#1e3a5f]/50">{formatPrice(tier.i)}+</td>
                      <td className="p-8 text-[10px] font-black uppercase tracking-widest text-[#1e3a5f]">{tier.best}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-[#d4a574] font-black uppercase text-[10px] tracking-widest mb-1">USA Export</p>
                <p className="text-sm font-bold text-[#1e3a5f]">$1.20 - $2.00 per set</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-[#d4a574] font-black uppercase text-[10px] tracking-widest mb-1">Europe Export</p>
                <p className="text-sm font-bold text-[#1e3a5f]">€1.10 - €1.80 per set</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-[#d4a574] font-black uppercase text-[10px] tracking-widest mb-1">UAE Export</p>
                <p className="text-sm font-bold text-[#1e3a5f]">AED 5 - 8 per set</p>
             </div>
          </div>

          <div className="mt-16 bg-[#1e3a5f] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <h4 className="text-xl font-black mb-8 uppercase tracking-tighter text-[#d4a574]">Available Add-On Options</h4>
             <ul className="grid sm:grid-cols-2 gap-6 text-[11px] font-bold uppercase tracking-widest">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0d7377]" /> Protective Vinyl Case (+{formatPrice(15)})</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0d7377]" /> Extra Swatches (+{formatPrice(3)}/pc)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0d7377]" /> Collection Divider Tabs (+{formatPrice(5)})</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0d7377]" /> Business Card Pocket (+{formatPrice(3)})</li>
             </ul>
          </div>
        </div>
      </section>

      {/* Manufacturing Timeline */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#1e3a5f] mb-16 uppercase tracking-tighter leading-none">Manufacturing Timeline</h2>
          <div className="relative">
             <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
               {[
                 { t: "Design & Approval", d: "Days 1-3", i: <Settings className="w-6 h-6" /> },
                 { t: "Materials Prep", d: "Days 4-7", i: <Layout className="w-6 h-6" /> },
                 { t: "Fabric Processing", d: "Days 8-12", i: <Zap className="w-6 h-6" /> },
                 { t: "Final Assembly", d: "Days 13-17", i: <ShieldCheck className="w-6 h-6" /> },
                 { t: "QC & Dispatch", d: "Days 18-20", i: <Package className="w-6 h-6" /> }
               ].map((step, i) => (
                 <div key={i} className="flex flex-col items-center group">
                   <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[#0d7377] mb-6 group-hover:bg-[#d4a574] group-hover:text-white transition-all shadow-sm">
                     {step.i}
                   </div>
                   <h4 className="font-black text-[#1e3a5f] uppercase text-xs mb-1 tracking-widest">{step.t}</h4>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">{step.d}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Sales Team Benefits */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a5f] mb-16 uppercase tracking-tighter">Why Sales Teams Love Ring Swatch Sets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { s: "80% lighter", t: "Lightweight Portability", d: "Carry 3-4 full collection sets easily in a standard briefcase without strain." },
              { s: "< 5 minutes", t: "Quick Updates", d: "Add or remove swatches as collections change seasonally with minimal effort." },
              { s: "100% tactile", t: "Customer Interaction", d: "Swatches are easily removable for tactile inspection, allowing for higher engagement." },
              { s: "2 minutes", t: "Organized Presentation", d: "Present 30+ fabrics efficiently during quick consultations with indexed tabs." },
              { s: "200+ uses", t: "Rugged Durability", d: "Metal rings and reinforced covers handle daily travel and repeated presentations." },
              { s: "70% cheaper", t: "Cost-Effective", d: "Equip your entire national sales team affordably compared to hard-bound books." }
            ].map((feat, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:border-[#d4a574] transition-all flex flex-col items-center text-center">
                 <p className="text-[#d4a574] font-black text-2xl mb-2 tracking-tighter">{feat.s}</p>
                 <h4 className="text-lg font-black text-[#1e3a5f] mb-3 uppercase tracking-tight">{feat.t}</h4>
                 <p className="text-gray-500 text-xs font-medium leading-relaxed">{feat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-[#1e3a5f] text-center mb-12 uppercase tracking-tighter">Ring Sets vs. Other Presentation Methods</h2>
          <table className="w-full bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-xl text-left border-collapse min-w-[700px]">
            <thead className="bg-[#1e3a5f] text-white text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-6">Feature</th>
                <th className="p-6 text-center">Ring Swatch Sets</th>
                <th className="p-6 text-center">Hardbound Books</th>
                <th className="p-6 text-center">Loose Swatches</th>
                <th className="p-6 text-center">Hanger Displays</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold text-[#1e3a5f] text-xs text-center">
              {[
                { f: "Portability", r: "★★★★★", h: "★★★", l: "★★", d: "★" },
                { f: "Cost", r: "₹20-25", h: "₹85-100", l: "₹5-10", d: "₹22-25" },
                { f: "Organization", r: "★★★★★", h: "★★★★", l: "★", d: "★★★★" },
                { f: "Updateability", r: "★★★★★", h: "★★", l: "★★★★★", d: "★★★" },
                { f: "Travel-Friendly", r: "★★★★★", h: "★★★", l: "★★", d: "★" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 bg-gray-50/50 uppercase tracking-widest text-[9px] text-left">{row.f}</td>
                  <td className="p-6 text-[#0d7377] font-black">{row.r}</td>
                  <td className="p-6 text-gray-400">{row.h}</td>
                  <td className="p-6 text-gray-400">{row.l}</td>
                  <td className="p-6 text-gray-400">{row.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-8 text-center text-xs font-bold text-[#1e3a5f]/40 uppercase tracking-widest">Best for sales reps, travel, and high-frequency updates.</p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a5f] mb-16 uppercase tracking-tighter">Customer Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                c: "National Furniture Chain", 
                q: "Ring sets transformed our sales process. Reps love the portability and clients love the organized presentation.", 
                r: ["Sales cycle cut by 25%", "Costs reduced 60%"],
                n: "Premium Home Furnishings"
              },
              { 
                c: "Export Trading Company", 
                q: "Perfect for export. Lightweight shipping saves thousands annually. Professional brand perception boost.", 
                r: ["Shipping costs -70%", "+45% repeat orders"],
                n: "Global Textile Exports"
              },
              { 
                c: "Interior Design Firm", 
                q: "Clients are impressed with our organization. Ring sets make us look like pros in every home meeting.", 
                r: ["Meeting time -30%", "+28% closing rate"],
                n: "Urban Spaces Design"
              }
            ].map((story, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex flex-col h-full shadow-sm text-left">
                 <div className="flex text-[#d4a574] mb-6">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div>
                 <p className="text-gray-600 text-sm italic font-medium leading-relaxed mb-8 flex-grow">"{story.q}"</p>
                 <div className="mb-6 space-y-2">
                    {story.r.map((r, idx) => <p key={idx} className="text-[10px] font-black text-[#0d7377] uppercase flex items-center gap-2"><ArrowRight className="w-3 h-3" /> {r}</p>)}
                 </div>
                 <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                    <h5 className="font-black text-[#1e3a5f] uppercase text-[10px]">{story.n}</h5>
                    <Award className="w-4 h-4 text-[#d4a574]" />
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care & Maintenance Guide */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#1e3a5f] mb-16 uppercase tracking-tighter">Keeping Your Ring Sets in Top Condition</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Regular Cleaning", d: "Wipe covers with damp cloth. Clean rings with dry cloth to prevent any rust buildup.", i: <History className="w-6 h-6" /> },
              { t: "Fabric Protection", d: "Keep swatches in sleeves for delicate fabrics and avoid prolonged direct sunlight.", i: <ShieldCheck className="w-6 h-6" /> },
              { t: "Mechanism Care", d: "Open rings gently and check for alignment quarterly. Don't overload beyond capacity.", i: <Settings className="w-6 h-6" /> },
              { t: "Secure Storage", d: "Store flat or upright. Keep away from moisture and stack no more than 10 sets high.", i: <Package className="w-6 h-6" /> }
            ].map((tip, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full group hover:border-[#d4a574] transition-colors text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-[#d4a574] mb-6 group-hover:bg-[#d4a574] group-hover:text-white transition-all mx-auto">{tip.i}</div>
                <h5 className="font-bold text-[#1e3a5f] uppercase text-sm mb-3 tracking-tight">{tip.t}</h5>
                <p className="text-gray-500 text-[11px] leading-relaxed font-medium">{tip.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#1e3a5f] mb-12 uppercase tracking-tighter leading-none">Technical FAQ</h2>
          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none hover:bg-white transition-colors"
                >
                  <span className="font-black text-[#1e3a5f] uppercase tracking-widest text-sm leading-tight">{faq.q}</span>
                  <HelpCircle className={`w-6 h-6 text-[#d4a574] transform transition-transform duration-500 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-8 pb-8 text-gray-500 text-sm leading-relaxed border-t border-gray-200 pt-6 font-medium animate-fadeIn">
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
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#1e3a5f] mb-16 uppercase tracking-tighter leading-none">Complete Your Presentation Kit</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { t: "Upholstery Swatch Books", p: 70, target: 'product-upholstery', d: "For permanent showroom displays", icon: <Box className="w-5 h-5 text-[#d4a574]" /> },
              { t: "Fabric Hanger Swatches", p: 18, target: 'product-hanger', d: "Wall displays for retail stores", icon: <Ruler className="w-5 h-5 text-[#d4a574]" /> },
              { t: "Sample Cards & Storyboards", p: 15, target: 'product-cards', d: "High-impact marketing cards", icon: <ClipboardList className="w-5 h-5 text-[#d4a574]" /> }
            ].map((prod, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 group shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                <div className="aspect-video bg-gray-50 rounded-2xl mb-6 flex items-center justify-center text-gray-200 font-black text-[9px] uppercase tracking-widest text-center px-6">Product Visual</div>
                <div className="flex items-center gap-3 mb-2">
                   {prod.icon}
                   <h4 className="text-lg font-black text-[#1e3a5f] uppercase tracking-tight group-hover:text-[#d4a574] transition-colors">{prod.t}</h4>
                </div>
                <p className="text-gray-400 text-[10px] font-bold uppercase mb-6 flex-grow">{prod.d}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                   <span className="text-[10px] font-black text-[#1e3a5f] uppercase tracking-widest">From {formatPrice(prod.p)}</span>
                   <button onClick={() => onNavigate(prod.target as ViewState)} className="text-[#0d7377] font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1">View Product <ChevronRight className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#1e3a5f] py-24 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden flex items-center justify-center">
           <div className="w-[150%] h-[150%] grid grid-cols-12 gap-8 transform rotate-12 opacity-30">
             {[...Array(48)].map((_, i) => <div key={i} className="bg-white/20 rounded-full h-full aspect-square"></div>)}
           </div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-tight">Equip Your Sales Team for Success</h2>
          <p className="text-white/80 text-lg mb-12 font-medium">Request a custom quote for branded portable sample kits and start winning more accounts.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => onNavigate('contact-page')} className="bg-[#0d7377] text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-[#1e3a5f] transition-all uppercase tracking-widest text-xs">Get Sales Team Quote</button>
            <button onClick={() => onDownload('Sample Ring Pack')} className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">Order 10 Sample Sets ({formatPrice(800)})</button>
          </div>
          <div className="mt-8 flex justify-center items-center gap-3">
             <span className="bg-[#d4a574] text-[#1e3a5f] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">Limited Offer</span>
             <p className="text-xs font-bold text-white/60 uppercase">Free shipping on orders over 200 sets</p>
          </div>
        </div>
      </section>

      {/* Pricing Modal */}
      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-[#1e3a5f]/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsPricingModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-[#1e3a5f] transition-colors"><X className="w-8 h-8" /></button>
            <div className="p-12">
               <h3 className="text-2xl font-black text-[#1e3a5f] uppercase tracking-widest mb-10 border-b border-gray-100 pb-4 text-center">Ring Swatch Price Matrix</h3>
               <table className="w-full text-left font-bold text-[#1e3a5f] text-sm">
                 <thead className="bg-[#1e3a5f]/5 text-[9px] font-black uppercase tracking-widest">
                   <tr><th className="p-4">Quantity Tier</th><th className="p-4 text-right">Price per Unit</th><th className="p-4 text-right">Ideal For</th></tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {pricingTiers.map((tier, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 uppercase tracking-widest text-[10px] text-gray-400">{tier.q}</td>
                        <td className="p-4 text-right font-black text-[#d4a574] text-lg">{formatPrice(tier.p)}</td>
                        <td className="p-4 text-right text-[#1e3a5f]/50 text-[10px] font-black uppercase">{tier.best}</td>
                      </tr>
                    ))}
                 </tbody>
               </table>
               <div className="mt-8 p-6 bg-teal/5 rounded-2xl border border-teal/10">
                  <h5 className="font-black text-[#0d7377] uppercase text-[10px] mb-2 tracking-widest">Add-On Services</h5>
                  <ul className="text-[10px] font-bold text-gray-500 uppercase space-y-2">
                    <li className="flex justify-between"><span>Vinyl Case</span> <span>+{formatPrice(15)}/set</span></li>
                    <li className="flex justify-between"><span>Extra Swatches</span> <span>+{formatPrice(3)}/pc</span></li>
                    <li className="flex justify-between"><span>Custom Rigid Box</span> <span>+{formatPrice(25)}/set</span></li>
                  </ul>
               </div>
               <button onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }} className="w-full bg-[#1e3a5f] text-white font-black py-5 rounded-2xl mt-12 uppercase tracking-widest text-xs shadow-xl">Get Team Pricing Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60]">
        <button onClick={() => onNavigate('contact-page')} className="w-full bg-[#0d7377] text-white font-black py-5 rounded-2xl shadow-2xl uppercase tracking-widest text-sm">Request Sales Kit Quote</button>
      </div>
    </div>
  );
};

export default ProductRingSwatch;
