import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ProductSampleCards: React.FC<Props> = ({ onNavigate }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const thumbnails = [
    { label: "Main View", placeholder: "Fabric storyboard showing coordinated collection" },
    { label: "Arrangement", placeholder: "Multiple sample cards arranged showing color story" },
    { label: "Stock Detail", placeholder: "Close-up of premium cardstock with fabric swatches" },
    { label: "Marketing", placeholder: "Marketing storyboard with mood imagery" },
    { label: "Mailing", placeholder: "Flat sample cards for mailing" }
  ];

  const specs = [
    { label: "Product Type", value: "Fabric Sample Card / Storyboard" },
    { label: "Card Size Options", value: "A5 (148x210mm), A4 (210x297mm), Postcard (10x15cm), Custom" },
    { label: "Backing Material", value: "300-400 GSM rigid cardstock" },
    { label: "Finish Options", value: "Matte lamination, UV coating, soft-touch coating" },
    { label: "Swatches per Card", value: "3-8 fabric samples (customizable layout)" },
    { label: "Swatch Size", value: "5x5cm to 10x10cm (varies by design)" },
    { label: "Swatch Attachment", value: "Adhesive mounting or stitched" },
    { label: "Printing", value: "Full-color CMYK, high-resolution offset" },
    { label: "Design Elements", value: "Logo, collection name, color palette, mood images, fabric codes" },
    { label: "Customization", value: "Complete custom design or template-based" },
    { label: "Mailing-Ready", value: "Yes, fits standard envelopes" },
    { label: "MOQ", value: "200 cards per design" },
    { label: "Sample MOQ", value: "10-20 cards for approval" },
    { label: "Lead Time", value: "12-18 days (design + production)" },
    { label: "Packaging", value: "Stacked in protective cartons, optional individual sleeves" }
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
          <span className="text-navy uppercase">Sample Cards & Storyboards</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Gallery */}
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
              <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
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
          <div>
            <span className="bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-6 shadow-sm">Perfect for Marketing</span>
            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
              Sample Cards & Fabric Storyboards
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              Professional fabric sample cards showing color stories, texture ranges, and design inspiration for seasonal launches.
            </p>
            
            <div className="flex items-center space-x-2 mb-8">
              <div className="flex text-gold text-lg">★★★★★</div>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">4.6/5 (22 reviews)</span>
            </div>

            <ul className="space-y-4 mb-10 text-sm font-medium text-navy">
              {[
                { icon: "📄", text: "Flat cards showing 3-8 fabric swatches per card" },
                { icon: "🛡️", text: "Rigid backing board (300-400 GSM cardstock)" },
                { icon: "📅", text: "Perfect for lookbooks, marketing, and seasonal launches" },
                { icon: "✉️", text: "Mailable format for sending to buyers worldwide" },
                { icon: "📸", text: "High-quality printing with collection mood imagery" }
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-3">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 leading-none">Starting from</p>
                  <p className="text-3xl font-black text-navy leading-none mt-2">₹15 <span className="text-sm font-bold text-gray-400">/ card</span></p>
                  <p className="text-gold text-[10px] font-bold mt-4 uppercase tracking-widest">Volume Pricing Available</p>
                  <button onClick={() => setIsPricingModalOpen(true)} className="text-teal text-xs font-bold underline mt-2 hover:text-navy transition-colors inline-block">View Marketing Pack Pricing</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">MOQ</span>
                    <span className="text-navy font-bold text-xs uppercase whitespace-nowrap">200 Cards</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Lead Time</span>
                    <span className="text-navy font-bold text-xs uppercase whitespace-nowrap">12-18 Days</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest">Sample</span>
                    <span className="text-navy font-bold text-xs uppercase whitespace-nowrap">₹50 / Card</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white font-black py-5 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">
                Request Marketing Quote
              </button>
              <a href="https://wa.me/910000000000" className="border-2 border-[#25D366] text-[#25D366] font-bold py-4 rounded-xl text-center hover:bg-[#25D366] hover:text-white transition-all text-xs uppercase tracking-widest flex items-center justify-center">
                <span className="mr-2">💬</span> WhatsApp for Design Consultation
              </a>
              <button className="text-gray-400 text-[10px] font-bold underline uppercase tracking-widest hover:text-navy transition-colors text-center">
                Download Design Templates (AI/PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy mb-12 text-center uppercase tracking-widest text-sm">Technical Specifications</h2>
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

      {/* Product Types Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-navy text-center mb-16">Choose Your Card Style</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { type: "Color Story Cards", desc: "Showcase harmonious color combinations from your collection.", apps: "Interior designers love these for color matching with client projects.", price: "₹18-22", img: "Card showing color palette" },
              { type: "Texture Storyboards", desc: "Display the range of textures and patterns within a collection.", apps: "Furniture retailers use these in catalogs and on websites.", price: "₹20-25", img: "Card showing textures" },
              { type: "Minimal Sample Cards", desc: "Simple, cost-effective cards with essential fabric information.", apps: "Perfect for mass distribution at trade shows - 500 cards fits in one box.", price: "₹12-15", img: "Minimal card design" },
              { type: "Premium Storyboards", desc: "High-end marketing pieces with photography and narrative copy.", apps: "Design magazines feature these in editorial product reviews.", price: "₹30-40", img: "Luxury story card" }
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col group hover:shadow-xl transition-all">
                <div className="aspect-square bg-white rounded-2xl mb-8 flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-[9px] group-hover:text-gold transition-colors text-center px-4 leading-tight">
                  {card.img}
                </div>
                <h4 className="text-xl font-black text-navy mb-4 leading-tight uppercase tracking-tighter">{card.type}</h4>
                <p className="text-gray-500 text-xs mb-6 leading-relaxed flex-grow">{card.desc}</p>
                <div className="pt-6 border-t border-gray-200">
                   <p className="text-[9px] text-teal font-black uppercase mb-1">Price per card:</p>
                   <p className="text-gold font-black text-xl">{card.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Options Section */}
      <section className="py-24 px-4 bg-navy text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-widest text-sm">Standard and Custom Sizes</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Postcard", s: "10x15cm", sw: "3-4 small", c: "₹12-15", b: "Mass distribution" },
              { t: "A5 Standard", s: "148x210mm", sw: "4-6 medium", c: "₹18-22", b: "General marketing" },
              { t: "A4 Premium", s: "210x297mm", sw: "6-8 large", c: "₹25-30", b: "High-end presentations" },
              { t: "Custom", s: "Bespoke", sw: "8+ swatches", c: "Quote", b: "Wall displays" }
            ].map((size, i) => (
              <div key={i} className="text-center group">
                <div className="aspect-[1/1.41] bg-white/5 border border-white/10 rounded-xl mb-6 flex items-center justify-center p-4 group-hover:border-gold transition-colors">
                   <div className="w-full h-full border border-dashed border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                     {size.t}
                   </div>
                </div>
                <h5 className="font-bold text-gold text-lg mb-1">{size.t}</h5>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-4 font-medium">{size.s}</p>
                <p className="text-xs font-bold text-white mb-1 uppercase tracking-tighter">{size.sw} swatches</p>
                <p className="text-gray-500 text-[9px] uppercase tracking-widest">Best for: {size.b}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Finish Options Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Professional Finishing Touches</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { t: "Matte Lamination", d: "Elegant, non-reflective finish. Fingprint resistant.", cost: "Included", best: "Classic Brands" },
              { t: "Gloss Lamination", d: "High-shine vibrant colors. Protective coating.", cost: "Included", best: "Modern Collections" },
              { t: "Soft-Touch", d: "Velvety matte coating for luxury tactile experience.", cost: "+₹3-5", best: "Premium Brands" },
              { t: "Spot UV", d: "Selective gloss highlights on logos or patterns.", cost: "+₹5-8", best: "Design-Forward" },
              { t: "Embossing", d: "Raised elements for premium tactile branding.", cost: "+₹8-12", best: "Heritage Labels" }
            ].map((f, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col group hover:border-gold transition-colors">
                <h5 className="font-bold text-navy text-base mb-4 leading-tight">{f.t}</h5>
                <p className="text-gray-500 text-[11px] leading-relaxed mb-6 flex-grow">{f.d}</p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gold font-black text-xs uppercase tracking-widest">{f.cost}</p>
                  <p className="text-gray-400 text-[9px] uppercase font-bold mt-1">Best for: {f.best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Service Tiers Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Complete Design Flexibility</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Tier 1: Template", d: "Choose from 10+ pre-designed layouts. Includes logo/fabric labeling.", fee: "FREE with 200+", time: "2-3 Days" },
              { t: "Tier 2: Semi-Custom", d: "Our designers create layout based on your existing brand guidelines.", fee: "₹2,000-5,000", time: "5-7 Days" },
              { t: "Tier 3: Full Custom", d: "Storytelling with mood imagery, narrative copy, and luxury graphics.", fee: "₹8,000-15,000", time: "10-14 Days" },
              { t: "Tier 4: Print-Ready", d: "Send us your final PDFs (300 DPI) and we manufacture directly.", fee: "₹0", time: "0 Days" }
            ].map((tier, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all">
                <h4 className="font-bold text-navy text-lg mb-4 pb-4 border-b border-gray-50">{tier.t}</h4>
                <p className="text-gray-500 text-xs leading-relaxed mb-8 flex-grow">{tier.d}</p>
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase"><span className="text-gray-400">Design Fee:</span><span className="text-teal">{tier.fee}</span></div>
                   <div className="flex justify-between text-[10px] font-black uppercase"><span className="text-gray-400">Timeline:</span><span className="text-navy">{tier.time}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Perfect Marketing Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: "📅", t: "Seasonal Launches", d: "Announce new collections to buyers with coordinated color stories. Mail 4-6 weeks before season." },
              { icon: "🏗️", t: "Trade Show Handouts", d: "Memorable takeaway materials for booth visitors that showcase range without catalog weight." },
              { icon: "📸", t: "Press & Media Kits", d: "Send hero pieces to design magazines and bloggers. High tangibility increases editorial interest." },
              { icon: "📽️", t: "Buyer Presentations", d: "Professional sales tools for retail meetings. Leave behind for decision-makers to reference." },
              { icon: "✉️", t: "Customer Mailings", d: "Direct mail campaigns to architects with high perceived value. 5x higher engagement than email." },
              { icon: "📱", t: "Social Media Content", d: "Styled photography of cards for Instagram/Pinterest. Consistent brand aesthetic for posts." }
            ].map((use, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform">{use.icon}</div>
                <div>
                   <h5 className="font-bold text-navy text-xl mb-2">{use.t}</h5>
                   <p className="text-gray-500 text-sm leading-relaxed">{use.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-widest text-sm">Volume Pricing for Sample Cards</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-12">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="p-6 text-left">Quantity</th>
                  <th className="p-6 text-left">Price per Card</th>
                  <th className="p-6 text-left">Total Investment</th>
                  <th className="p-6 text-left">Design Fee</th>
                  <th className="p-6 text-left">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-navy">
                {[
                  { q: "10-50 (sample)", p: "₹50-60", t: "₹500-3,000", d: "Free Template", b: "Testing/Approval" },
                  { q: "100-200", p: "₹25-30", t: "₹2,500-6,000", d: "Free Template", b: "Small Launches" },
                  { q: "200-500 (MOQ)", p: "₹18-22", t: "₹3,600-11,000", d: "Free/₹2K Custom", b: "Standard Campaigns" },
                  { q: "500-1000", p: "₹15-18", t: "₹7,500-18,000", d: "Free/₹5K Custom", b: "Large Distribution" },
                  { q: "1000+", p: "₹12-15", t: "₹12,000+", d: "₹5K+ Custom", b: "Major Campaigns" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors uppercase tracking-tighter">
                    <td className="p-6 font-bold">{row.q}</td>
                    <td className="p-6 font-black text-gold text-lg">{row.p}</td>
                    <td className="p-6 text-gray-500">{row.t}</td>
                    <td className="p-6 text-teal font-black">{row.d}</td>
                    <td className="p-6 italic text-gray-400">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-center bg-white p-8 rounded-3xl border border-gray-100">
             <div><p className="text-[10px] text-gray-400 font-bold uppercase mb-2">USA Marketing Pack</p><p className="font-black text-navy text-2xl">$1.20 - $2.50 <span className="text-xs font-medium text-gray-400">/ set</span></p></div>
             <div><p className="text-[10px] text-gray-400 font-bold uppercase mb-2">EU Marketing Pack</p><p className="font-black text-navy text-2xl">€1.10 - €2.30 <span className="text-xs font-medium text-gray-400">/ set</span></p></div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Section */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-navy text-center mb-24 uppercase tracking-widest">Manufacturing Process Timeline</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { s: 1, t: "Concept", d: "Days 1-5", sub: "Brief & selection" },
                { s: 2, t: "Development", d: "Days 3-8", sub: "Layout & imagery" },
                { s: 3, t: "Final Approval", d: "Days 6-10", sub: "Proofing & files" },
                { s: 4, t: "Printing", d: "Days 11-14", sub: "Offset & QC" },
                { s: 5, t: "Mounting", d: "Days 13-16", sub: "Precision stick" },
                { s: 6, t: "Packaging", d: "Days 17-18", sub: "QC & Stacking" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:border-gold group-hover:scale-110 transition-all duration-300 relative z-10">
                    <span className="text-gold font-black">{step.s}</span>
                  </div>
                  <h4 className="font-bold text-navy text-sm mb-1 leading-tight">{step.t}</h4>
                  <p className="text-gold text-[10px] font-black uppercase mb-2 tracking-widest">{step.d}</p>
                  <p className="text-[10px] text-gray-400 italic font-medium">{step.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Guidelines Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Creating Effective Sample Cards</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { t: "1. Clear Hierarchy", d: "Collection name largest, fabrics focus, supporting info small and organized." },
              { t: "2. Color Harmony", d: "Neutral backgrounds let fabric stand out. Avoid clashing colors. Test proofs first." },
              { t: "3. Typography", d: "Max 2-3 readable fonts. Sans-serif for modern, serif for traditional brands." },
              { t: "4. Swatch Layout", d: "Grid for clean looks, staggered for creative flair. Leave 5mm breathing room." },
              { t: "5. Info Balance", d: "Essential codes and logos only. Avoid overload - keep it clean and readable." },
              { t: "6. Finish Match", d: "Matte for classic, Soft-touch for luxury, Spot UV for design-forward collections." }
            ].map((guide, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <h5 className="font-bold text-navy mb-4 border-b border-gray-50 pb-4">{guide.t}</h5>
                <p className="text-gray-500 text-xs leading-relaxed font-medium uppercase tracking-tight">{guide.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Sample Card Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { c: "Global Textiles Ltd.", s: "Needed 400 cards for Frankfurt trade show.", r: "120 inquiries (34% response), 18x ROI.", q: "The cards made us look major. Buyers kept them months later." },
              { c: "Urban Living Furniture", s: "Spring launch to 250 retail partners.", r: "78% open rate, 45% pre-orders, 15% sales increase.", q: "Retailers loved the visual storytelling." },
              { c: "Studio Aesthetics", s: "Presentation materials for luxury projects.", r: "80% approval on first pitch, brand perception elevated.", q: "Clients see these and immediately trust our expertise." }
            ].map((story, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition-all">
                <div className="mb-6">
                  <div className="flex text-gold text-xs font-bold mb-4">★★★★★</div>
                  <h4 className="text-2xl font-black text-navy mb-2 leading-tight uppercase tracking-tighter">{story.c}</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6 leading-tight italic">"{story.s}"</p>
                </div>
                <div className="space-y-4 flex-grow">
                  <div><p className="text-[10px] text-gray-400 font-black uppercase mb-1">Results</p><p className="text-xs text-navy font-bold leading-relaxed">{story.r}</p></div>
                </div>
                <div className="mt-10 pt-8 border-t border-gray-200"><p className="text-gray-500 italic text-[11px] leading-relaxed">"{story.q}"</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Comparison Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Cards vs. Other Marketing</h2>
          <table className="w-full bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <th className="p-6 text-left border-r border-white/10">Method</th>
                <th className="p-6 text-left border-r border-white/10 bg-gold/20 text-gold">Sample Cards</th>
                <th className="p-6 text-left border-r border-white/10">Digital Email</th>
                <th className="p-6 text-left border-r border-white/10">Catalog Print</th>
                <th className="p-6 text-left">Trade Show Booth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px] font-bold text-navy">
              {[
                { f: "Cost/Impression", s: "₹15-30", d: "₹0.50", c: "₹100-300", t: "₹1000+" },
                { f: "Response Rate", s: "20-35%", d: "2-5%", c: "15-25%", t: "Varies" },
                { f: "Tangibility", s: "High", d: "None", c: "High", t: "Medium" },
                { f: "Memorability", s: "Excellent", d: "Poor", c: "Good", t: "Good" },
                { f: "Best Use", s: "B2B Leads", d: "Mass outreach", c: "Deep info", t: "Face-to-face" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors uppercase tracking-tight">
                  <td className="p-6 border-r border-gray-100 bg-gray-50/50">{row.f}</td>
                  <td className="p-6 border-r border-gray-100 bg-gold/[0.03] text-teal font-black">{row.s}</td>
                  <td className="p-6 border-r border-gray-100 text-gray-500 font-medium">{row.d}</td>
                  <td className="p-6 border-r border-gray-100 text-gray-400 italic">{row.c}</td>
                  <td className="p-6 text-gray-500 font-medium">{row.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">"Sample cards combine tangibility with cost-effectiveness"</p>
        </div>
      </section>

      {/* Technical FAQ */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Technical FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Can you print my custom design?", a: "Yes, provide print-ready PDF (300 DPI, CMYK) or our designers can create for you." },
              { q: "What's the minimum order?", a: "200 cards per design for cost-effectiveness, but samples available for testing." },
              { q: "Can I order different designs in one batch?", a: "Yes, minimum 100 per unique design allowed in a combined order." },
              { q: "Do you provide mailing envelopes?", a: "Yes, we can source and custom-brand envelopes for your campaign." },
              { q: "What file format do you need?", a: "Print-ready PDF, 300 DPI, CMYK color mode, with 3mm bleed margin." },
              { q: "Can cards be folded?", a: "Yes, we can add fold scores to create bi-fold or greeting card storyboards." },
              { q: "What if I want more swatches later?", a: "Order updated cards - no setup fee if the print design remains unchanged." },
              { q: "Can you ship internationally?", a: "Yes, we ship worldwide. Lightweight cards have low international shipping costs." },
              { q: "Do you offer rush production?", a: "Yes, 8-10 day rush service available for a 20% premium." },
              { q: "Can I get a physical sample first?", a: "Yes, order 10-20 samples for approval before committing to bulk run." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-white transition-colors group"
                >
                  <span className="font-bold text-navy group-hover:text-gold transition-colors pr-8 leading-snug">{faq.q}</span>
                  <span className={`text-gold transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-gray-500 text-[11px] leading-relaxed border-t border-gray-200 pt-4 font-medium uppercase tracking-tight">
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
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl font-black text-navy mb-12 uppercase tracking-widest">Complete Your Marketing Kit</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 'product-upholstery', title: "Upholstery Swatch Books", price: "₹70", icon: "📚", sub: "For showrooms" },
              { id: 'product-ring', title: "Ring Swatch Sets", price: "₹20", icon: "💍", sub: "Portable kits" },
              { title: "Premium Presentation Boxes", price: "₹150", icon: "🎁", sub: "Gift-quality packs", ext: true }
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
      <section className="bg-teal py-24 px-4 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10 text-white">
          <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight">Launch Your Collection with Professional Sample Cards</h2>
          <p className="text-white/80 text-lg mb-12 font-medium max-w-2xl mx-auto leading-relaxed italic">
            "Request a custom quote with design consultation today and get a free design mockup with your order of 200+ cards."
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-navy text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-navy transition-all uppercase tracking-widest text-xs"
            >
              Request Quote & Design Consultation
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">
              Order Sample Pack (10 cards)
            </button>
          </div>
          <div className="mt-12 flex justify-center">
             <span className="bg-gold text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg animate-bounce">Free design mockup with orders 200+</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 bg-navy/95 z-[200] flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="max-w-5xl w-full aspect-[4/3] bg-gray-100 rounded-3xl flex flex-col items-center justify-center border border-white/10 relative shadow-2xl">
             <div className="text-center text-gray-400 uppercase tracking-widest font-black text-xl px-12 leading-relaxed">
               {thumbnails[activeThumb].placeholder}
               <p className="text-[10px] text-gold mt-4">Full Screen Marketing Visual</p>
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

export default ProductSampleCards;