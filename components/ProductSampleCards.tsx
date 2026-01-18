import React, { useState } from 'react';
import { ViewState } from '../App.tsx';
import { 
  Star, CheckCircle2, MessageCircle, Download, Briefcase, 
  Layout, Globe, Zap, ChevronRight, HelpCircle, X, 
  Maximize2, Layers, PenTool, ClipboardList, Box, Ruler, TrendingUp, Award
} from 'lucide-react';
import { useGlobalSettings } from './GlobalSettingsContext.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductSampleCards: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const { formatPrice } = useGlobalSettings();
  const [activeThumb, setActiveThumb] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const thumbnails = [
    { label: "Main View", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", placeholder: "Fabric storyboard showing coordinated collection" },
    { label: "Arrangement", src: "https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?auto=format&fit=crop&w=800&q=80", placeholder: "Multiple sample cards arranged showing color story" },
    { label: "Stock Detail", src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80", placeholder: "Close-up of premium cardstock with fabric swatches" },
    { label: "Marketing", src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", placeholder: "Marketing storyboard with mood imagery" },
    { label: "Mailing", src: "https://images.unsplash.com/photo-1520183802803-06f731a2059f?auto=format&fit=crop&w=800&q=80", placeholder: "Flat sample cards for mailing" }
  ];

  const pricingTiers = [
    { q: "10-50 (sample)", p: 60, i: 600, best: "Launch testing" },
    { q: "100-200", p: 25, i: 2500, best: "Small launches" },
    { q: "200-500 (MOQ)", p: 18, i: 3600, best: "Standard campaigns" },
    { q: "500-1000", p: 15, i: 7500, best: "Large distribution" },
    { q: "1000+ (export)", p: 12, i: 12000, best: "Major marketing push" }
  ];

  const faqs = [
    { q: "What cardstock thickness do you use?", a: "We exclusively use 350-400 GSM rigid ivory board or recycled grey-back cardstock for maximum durability during shipping." },
    { q: "Can I have custom-shaped fabric swatches?", a: "Yes, we can die-cut fabric swatches into circles, hexagons, or custom brand-aligned shapes for an additional fee." },
    { q: "Do you handle the card design?", a: "We provide AI/PDF templates for your designers, or our in-house team can create a layout for you for ₹2,500 per collection." },
    { q: "Are these cards suitable for international mailing?", a: "Absolutely. They are designed to fit in standard A5 or A4 envelopes and are lightweight (under 50g) to minimize postage costs." },
    { q: "What is the maximum number of swatches per card?", a: "On an A4 card, we can comfortably fit up to 12 swatches (3x3cm). On A5, we recommend 4-6 for a clean look." }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-[#8B6F47] transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-[#8B6F47] transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Sample Cards & Storyboards</span>
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
              <div className="absolute top-8 left-8 bg-[#8B6F47] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Perfect for Marketing</div>
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
                  className={`aspect-square rounded-2xl border-2 overflow-hidden transition-all ${activeThumb === idx ? 'border-[#8B6F47] ring-4 ring-[#8B6F47]/10 scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={thumb.src} alt={thumb.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div>
            <div className="flex items-center gap-2 text-[#8B6F47] mb-6">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
               <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-2">4.9/5 (52 reviews)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e3a5f] mb-4 leading-none uppercase tracking-tighter">Sample Cards & Storyboards</h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium italic">"The highest-converting marketing tool for textile brands. Showcase collection color stories in a lightweight, mailable format."</p>
            
            <div className="space-y-4 mb-10">
              {[
                "Premium 350+ GSM rigid cardstock backing",
                "High-resolution collection & lifestyle imagery printing",
                "3-12 fabric swatches per card (cascading or grid)",
                "Full white-label branding and collection narratives",
                "Optimized for air-freight and direct mail campaigns"
              ].map((item, i) => (
                <div key={i} className="flex items-center text-[#1e3a5f] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#0d7377] mr-3 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 mb-10">
              <p className="text-gray-400 text-[9px] font-black uppercase mb-1 leading-none">Starting from</p>
              <p className="text-3xl font-black text-[#1e3a5f] leading-none mt-2">{formatPrice(15)} <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ card for 1000+ units</span></p>
              <p className="text-xs text-[#0d7377] font-bold mt-3 uppercase tracking-tighter">Volume Discounts for Exporters</p>
              <button 
                onClick={() => setIsPricingModalOpen(true)}
                className="text-[#0d7377] font-black text-[10px] uppercase tracking-widest mt-4 flex items-center gap-1 hover:text-[#8B6F47] transition-colors underline decoration-2 underline-offset-4"
              >
                View Marketing Pack Pricing <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="bg-[#1e3a5f]/5 px-4 py-2 rounded-xl text-[10px] font-black text-[#1e3a5f] uppercase tracking-widest">MOQ: 200 Cards</div>
              <div className="bg-[#1e3a5f]/5 px-4 py-2 rounded-xl text-[10px] font-black text-[#1e3a5f] uppercase tracking-widest">Lead Time: 12-18 Days</div>
              <div className="bg-[#1e3a5f]/5 px-4 py-2 rounded-xl text-[10px] font-black text-[#1e3a5f] uppercase tracking-widest">Sample: {formatPrice(60)}/card</div>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="w-full bg-[#0d7377] text-white font-black py-6 rounded-2xl shadow-xl hover:bg-[#1e3a5f] transition-all text-lg uppercase tracking-widest">Request Marketing Quote</button>
              <a href="https://wa.me/919004962871" className="w-full border-2 border-[#25D366] text-[#25D366] font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white transition-all text-sm uppercase tracking-widest">
                <MessageCircle className="w-5 h-5" /> WhatsApp for Quick RFQ
              </a>
              <button onClick={() => onDownload('Sample Card Design Templates')} className="text-gray-400 text-[10px] font-black underline uppercase tracking-widest hover:text-[#1e3a5f] transition-colors text-center mt-2">
                Download Design Templates (AI/PDF)
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
                  { s: "Product Type", d: "Fabric Sample Card / Storyboard" },
                  { s: "Backing Material", d: "350-400 GSM Rigid Ivory Board / Recycled Board" },
                  { s: "Card Sizes", d: "A5 (148x210mm), A4 (210x297mm), Custom Square (15x15cm)" },
                  { s: "Swatch Capacity", d: "3-12 fabric samples (depending on card size)" },
                  { s: "Printing", d: "High-resolution Offset or Digital CMYK printing" },
                  { s: "Finish", d: "Matte, Gloss, or Soft-Touch Lamination available" },
                  { s: "Fabric Mounting", d: "Eco-friendly industrial adhesive (fabric-safe)" },
                  { s: "Label Options", d: "Integrated printing on card or individual fabric stickers" },
                  { s: "Edge Finish", d: "Straight-cut or Die-cut rounded corners" },
                  { s: "Weight", d: "30-60g (Highly mailable)" },
                  { s: "MOQ", d: "200 cards per collection" }
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

      {/* Layout Options */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a5f] text-center mb-16 uppercase tracking-tighter">Visual Layout Styles</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                t: "The Color Cascade", 
                i: "[Visual: Cascading swatches]", 
                specs: ["Waterfall arrangement", "Maximum color visibility", "6-10 swatches"], 
                best: ["Coordinated palettes", "Texture gradients"],
                feats: ["Impactful presentation", "Space efficient"],
                p: 18
              },
              { 
                t: "The Grid Storyboard", 
                i: "[Visual: Grid layout]", 
                specs: ["Mood imagery + Swatches", "Narrative focused", "4-6 swatches"], 
                best: ["Seasonal launches", "Collection themes"],
                feats: ["Design heavy", "Premium feel"],
                p: 22
              },
              { 
                t: "The Compact Mailable", 
                i: "[Visual: Small postcard]", 
                specs: ["A6 / Postcard size", "Ultra-lightweight", "3-4 swatches"], 
                best: ["Direct mail marketing", "Quick references"],
                feats: ["Postage friendly", "Bulk distribution"],
                p: 12
              }
            ].map((format, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3.5rem] border border-gray-100 group flex flex-col hover:border-[#8B6F47] transition-all duration-500 h-full">
                <div className="aspect-square bg-white rounded-3xl mb-8 flex items-center justify-center text-gray-300 font-black text-[10px] uppercase tracking-widest text-center px-10 border border-gray-100">{format.i}</div>
                <h4 className="text-2xl font-black text-[#1e3a5f] mb-6 uppercase tracking-tight">{format.t}</h4>
                
                <div className="mb-6">
                  <h5 className="text-[9px] font-black text-[#8B6F47] uppercase tracking-widest mb-3">Layout Specs</h5>
                  <ul className="space-y-2">
                    {format.specs.map((s, idx) => <li key={idx} className="text-xs font-bold text-[#1e3a5f] flex items-center gap-2"><Zap className="w-3 h-3 text-[#0d7377]" /> {s}</li>)}
                  </ul>
                </div>

                <div className="mb-6 flex-grow">
                   <h5 className="text-[9px] font-black text-[#8B6F47] uppercase tracking-widest mb-3">Ideal For</h5>
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

      {/* Customization Options */}
      <section className="py-24 px-4 bg-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tighter text-[#8B6F47]">Premium Finish Options</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { t: "Soft-Touch Lamination", i: "[Visual: Velvet texture card]", d: "Luxury velvety finish that prevents fingerprints and adds a premium weight.", cap: "High-end brands", best: "Designer collections" },
              { t: "Spot UV Branding", i: "[Visual: Glossy logo on matte]", d: "Highlight your logo with high-gloss spot UV over a matte card surface.", cap: "Visual impact", best: "Exhibition handouts" },
              { t: "Gold Foil Accents", i: "[Visual: Foil stamping]", d: "Metallic gold or silver foil stamping for collection names and logos.", cap: "Prestige look", best: "Export markets" }
            ].map((type, i) => (
              <div key={i} className="flex flex-col h-full bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-colors">
                <div className="aspect-video bg-white/10 rounded-2xl mb-8 flex items-center justify-center text-white/20 font-black text-[9px] uppercase">{type.i}</div>
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight text-white">{type.t}</h4>
                <p className="text-gray-400 text-sm font-medium mb-8 flex-grow leading-relaxed">{type.d}</p>
                <div className="pt-6 border-t border-white/10">
                   <p className="text-[9px] font-black text-[#8B6F47] uppercase tracking-widest">Target: {type.cap}</p>
                   <p className="text-xs font-bold text-white mt-1 uppercase">{type.best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a5f] mb-16 uppercase tracking-tighter">Strategic Marketing Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="w-10 h-10" />, title: "International Marketing", desc: "Lightweight cards drastically reduce air-freight costs for global collection launches.", ord: "1000-2000 units", roi: "90% shipping savings vs books" },
              { icon: <Briefcase className="w-10 h-10" />, title: "Showroom Handouts", desc: "Professional takeaway samples for visiting designers to keep in their active project files.", ord: "200-500 units", roi: "+40% recall vs business cards" },
              { icon: <Layers className="w-10 h-10" />, title: "Direct Mail Campaigns", desc: "Sized to fit standard envelopes. The most effective way to update your top 500 customers.", ord: "500-1000 units", roi: "Reach 5x more buyers per budget" },
              { icon: <PenTool className="w-10 h-10" />, title: "Moodboard Inclusion", desc: "Designed to be pinned or taped to design moodboards during client consultations.", ord: "200-400 units", roi: "Stay 'Top-of-Mind' in projects" },
              { icon: <Award className="w-10 h-10" />, title: "Trade Show Lead Capture", desc: "Impressive handouts for high-value booth visitors that look better than standard brochures.", ord: "500-800 units", roi: "Convert 25% more booth traffic" }
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

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-[#1e3a5f] text-center mb-12 uppercase tracking-tighter">Volume Pricing Matrix</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-xl">
             <table className="w-full text-left font-bold text-[#1e3a5f] text-sm border-collapse">
                <thead className="bg-[#1e3a5f] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th className="p-8">Order Quantity</th>
                    <th className="p-8">Price per Card</th>
                    <th className="p-8">Total Investment</th>
                    <th className="p-8">Ideal For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTiers.map((tier, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-8 uppercase tracking-widest text-[10px] text-gray-400">{tier.q}</td>
                      <td className="p-8 text-[#8B6F47] text-lg font-black">{formatPrice(tier.p)}</td>
                      <td className="p-8 font-medium text-[#1e3a5f]/50">{formatPrice(tier.i)}+</td>
                      <td className="p-8 text-[10px] font-black uppercase tracking-widest text-[#1e3a5f]">{tier.best}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-[#8B6F47] font-black uppercase text-[10px] tracking-widest mb-1">USA Export</p>
                <p className="text-sm font-bold text-[#1e3a5f]">$0.85 - $1.15 per card</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-[#8B6F47] font-black uppercase text-[10px] tracking-widest mb-1">Europe Export</p>
                <p className="text-sm font-bold text-[#1e3a5f]">€0.80 - €1.10 per card</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-[#8B6F47] font-black uppercase text-[10px] tracking-widest mb-1">UAE Export</p>
                <p className="text-sm font-bold text-[#1e3a5f]">AED 3 - 5 per card</p>
             </div>
          </div>

          <div className="mt-16 bg-[#1e3a5f] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <h4 className="text-xl font-black mb-8 uppercase tracking-tighter text-[#8B6F47]">Branding & Add-Ons</h4>
             <ul className="grid sm:grid-cols-2 gap-6 text-[11px] font-bold uppercase tracking-widest">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0d7377]" /> Soft-Touch Lamination (+{formatPrice(3)})</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0d7377]" /> Spot UV Gloss (+{formatPrice(2)})</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0d7377]" /> Custom Die-Cutting (+{formatPrice(4)})</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0d7377]" /> Layout Design Service ({formatPrice(2500)})</li>
             </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#1e3a5f] mb-12 uppercase tracking-tighter leading-none">Technical FAQ</h2>
          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="font-black text-[#1e3a5f] uppercase tracking-widest text-sm leading-tight">{faq.q}</span>
                  <HelpCircle className={`w-6 h-6 text-[#8B6F47] transform transition-transform duration-500 ${activeFaq === idx ? 'rotate-180' : ''}`} />
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

      {/* Final CTA Section */}
      <section className="bg-navy py-24 px-4 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-tight">Elevate Your Collection Launch</h2>
          <p className="text-gray-400 text-lg mb-12 font-medium">Request a custom quote for branded fabric storyboards and start reaching more designers globally.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => onNavigate('contact-page')} className="bg-[#0d7377] text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-navy transition-all uppercase tracking-widest text-xs">Request Marketing RFQ</button>
            <button onClick={() => onDownload('Sample Marketing Pack')} className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">Order 10 Sample Cards ({formatPrice(600)})</button>
          </div>
          <div className="mt-8 flex justify-center items-center gap-3">
             <span className="bg-[#8B6F47] text-[#1e3a5f] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">Global Shipping</span>
             <p className="text-xs font-bold text-white/60 uppercase">Delivery to EU/USA in 15-18 days</p>
          </div>
        </div>
      </section>

      {/* Pricing Modal */}
      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-[#1e3a5f]/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsPricingModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-[#1e3a5f] transition-colors"><X className="w-8 h-8" /></button>
            <div className="p-12">
               <h3 className="text-2xl font-black text-[#1e3a5f] uppercase tracking-widest mb-10 border-b border-gray-100 pb-4 text-center">Sample Card Price List</h3>
               <table className="w-full text-left font-bold text-[#1e3a5f] text-sm">
                 <thead className="bg-[#1e3a5f]/5 text-[9px] font-black uppercase tracking-widest">
                   <tr><th className="p-4">Quantity</th><th className="p-4 text-right">Price per Card</th><th className="p-4 text-right">Usage</th></tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {pricingTiers.map((tier, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 uppercase tracking-widest text-[10px] text-gray-400">{tier.q}</td>
                        <td className="p-4 text-right font-black text-[#8B6F47] text-lg">{formatPrice(tier.p)}</td>
                        <td className="p-4 text-right text-[#1e3a5f]/50 text-[10px] font-black uppercase">{tier.best}</td>
                      </tr>
                    ))}
                 </tbody>
               </table>
               <div className="mt-8 p-6 bg-teal/5 rounded-2xl border border-teal/10">
                  <h5 className="font-black text-[#0d7377] uppercase text-[10px] mb-2 tracking-widest">Technical Add-Ons</h5>
                  <ul className="text-[10px] font-bold text-gray-500 uppercase space-y-2">
                    <li className="flex justify-between"><span>Recycled Grey-back Stock</span> <span>- {formatPrice(2)} discount</span></li>
                    <li className="flex justify-between"><span>Double-sided Printing</span> <span>+ {formatPrice(4)}</span></li>
                    <li className="flex justify-between"><span>Custom Shape Swatches</span> <span>Quote on request</span></li>
                  </ul>
               </div>
               <button onClick={() => { setIsPricingModalOpen(false); onNavigate('contact-page'); }} className="w-full bg-[#1e3a5f] text-white font-black py-5 rounded-2xl mt-12 uppercase tracking-widest text-xs shadow-xl">Start Technical Discussion</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60]">
        <button onClick={() => onNavigate('contact-page')} className="w-full bg-[#0d7377] text-white font-black py-5 rounded-2xl shadow-2xl uppercase tracking-widest text-sm">Request Marketing Quote</button>
      </div>
    </div>
  );
};

export default ProductSampleCards;
