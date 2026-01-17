
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
    { label: "Hand Flipped", placeholder: "Ring swatch set being flipped through by hand" },
    { label: "Compact Case", placeholder: "Compact ring swatch set in protective case" },
    { label: "Binding Detail", placeholder: "Close-up of metal ring binding mechanism" },
    { label: "Fanned Out", placeholder: "Multiple fabric swatches fanned out" },
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
      title: "Landscape Ring Set",
      placeholder: "Landscape ring set open",
      dims: "15x11cm (A6 landscape)",
      swatch: "12x10cm",
      cap: "20-30 swatches",
      best: ["Wide fabric swatches", "Horizontal pattern display", "Modern collections"],
      features: ["Lies flat when open", "Easy one-handed flipping", "Compact width for bags"],
      price: "₹20-25"
    },
    {
      title: "Portrait Ring Set",
      placeholder: "Portrait ring set",
      dims: "11x15cm (A6 portrait)",
      swatch: "10x12cm",
      cap: "25-35 swatches",
      best: ["Vertical fabric orientation", "Traditional presentation", "Curtain collections"],
      features: ["Standard ring binder format", "Easier to add/remove pages", "Stackable storage"],
      price: "₹18-23"
    },
    {
      title: "Mini Travel Set",
      placeholder: "Compact mini set",
      dims: "10x10cm (square compact)",
      swatch: "8x8cm",
      cap: "15-20 swatches",
      best: ["Ultra-portable carry", "Quick color references", "Pocket-sized convenience"],
      features: ["Fits in jacket pocket", "Lightweight (150g)", "Perfect for quick meetings"],
      price: "₹15-20"
    }
  ];

  const successStories = [
    {
      title: "Story 1: National Furniture Chain",
      company: "Premium Home Furnishings (100+ stores)",
      challenge: "200 sales reps needed portable fabric samples",
      solution: "200 ring sets with 40 upholstery swatches each",
      results: ["Sales cycle shortened by 25%", "Order accuracy improved 40%", "Annual fabric sample cost reduced 60%"],
      quote: "Ring sets transformed our sales process. Reps love the portability and clients love the organized presentation."
    },
    {
      title: "Story 2: Export Trading Company",
      company: "Global Textile Exports, Mumbai",
      challenge: "Needed cost-effective sample sets for 50+ international buyers",
      solution: "150 custom-branded ring sets shipped globally",
      results: ["Shipping costs reduced 70% vs. books", "45% increase in repeat orders", "Professional brand perception boost"],
      quote: "Perfect for export. Lightweight shipping saves thousands annually."
    }
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
          <span className="text-navy">Ring Swatch Sample Sets</span>
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
            <span className="bg-navy text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-6">Perfect for Sales Teams</span>
            <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
              Ring Swatch Sample Sets - Portable Fabric Presentation Kits
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Compact, durable sample sets designed for mobile sales teams and trade show presentations.
            </p>
            
            <div className="flex items-center space-x-2 mb-8">
              <div className="flex text-gold text-lg font-bold">★★★★★</div>
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
                Download Product Specifications (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table Section */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-navy mb-12 text-center uppercase tracking-widest">Product Specifications</h2>
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
          <h2 className="text-3xl md:text-4xl font-black text-navy text-center mb-16">Choose Your Ideal Format</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {formats.map((format, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-gold transition-all flex flex-col group shadow-sm hover:shadow-xl">
                <div className="aspect-[4/3] bg-white rounded-2xl mb-8 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-[9px] group-hover:text-gold border border-gray-100 text-center px-4 leading-relaxed transition-colors">
                  {format.placeholder}
                </div>
                <h4 className="text-xl font-bold text-navy mb-2 leading-tight">{format.title}</h4>
                <div className="text-xs text-gray-500 mb-6 flex flex-wrap gap-x-4 gap-y-2 font-medium">
                  <span><strong className="text-navy">Dims:</strong> {format.dims}</span>
                  <span><strong className="text-navy">Capacity:</strong> {format.cap}</span>
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

      {/* Success Stories Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-widest text-sm">Customer Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {successStories.map((story, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
                <div className="mb-6">
                  <div className="flex text-gold text-lg font-bold mb-4">★★★★★</div>
                  <h4 className="text-2xl font-black text-navy mb-2 leading-tight">{story.title}</h4>
                  <p className="text-teal font-bold text-xs uppercase tracking-widest mb-6">{story.company}</p>
                </div>
                <div className="space-y-6 flex-grow">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">The Challenge</p>
                    <p className="text-sm text-gray-600 italic leading-relaxed">{story.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Key Results</p>
                    <ul className="space-y-2">
                       {story.results.map((res, j) => (
                         <li key={j} className="text-xs font-bold text-navy flex items-center">
                           <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 shrink-0"></span> {res}
                         </li>
                       ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-gray-50">
                  <p className="text-gray-500 italic text-sm leading-relaxed">"{story.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical FAQ */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Technical FAQ</h2>
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
              <div key={idx} className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-white transition-colors"
                >
                  <span className="font-bold text-navy leading-tight pr-8">{faq.q}</span>
                  <span className={`text-gold transform transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-200 pt-4 font-medium">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-navy py-24 px-4 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Equip Your Sales Team with Professional Ring Swatch Sets</h2>
          <p className="text-white/80 text-lg mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            Request a custom quote for branded portable sample kits tailored to your sales team's needs.
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
          <p className="mt-12 text-gold font-black uppercase tracking-[0.2em] text-[10px] animate-pulse">
            Free shipping on orders 200+ sets
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
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
            <h3 className="text-2xl font-black text-navy mb-8 uppercase tracking-widest">Wholesale Pricing Guide</h3>
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
            <p className="mt-8 text-[10px] text-gray-400 leading-relaxed italic text-center">
              * Add-ons: Protective vinyl case (+₹10-15), Divider tabs (+₹5), Custom rigid box (+₹20-25).
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
    </div>
  );
};

export default ProductRingSwatch;
