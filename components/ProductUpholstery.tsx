import React, { useState } from 'react';
import { ViewState } from '../App.tsx';
import { Star, CheckCircle2, Sofa, Ruler, Warehouse, Globe, Zap, Download, MessageCircle, ChevronRight, X } from 'lucide-react';
import { useGlobalSettings } from './GlobalSettingsContext.tsx';
import { ProductMediaCarousel } from './ProductMediaCarousel';
import { UPHOLSTERY_MEDIA, LOCAL_IMAGES } from '../config/mediaAssets';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductUpholstery: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const { formatPrice } = useGlobalSettings();
  const [showPricingModal, setShowPricingModal] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="pt-24 pb-4 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('products-overview')} className="hover:text-gold transition-colors">Products</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Upholstery Swatch Books</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Product Gallery */}
          <ProductMediaCarousel items={UPHOLSTERY_MEDIA} badge="Most Popular Product" />

          {/* RIGHT: Product Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-gold mb-6">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
               <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest ml-2">4.8/5 (32 reviews)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy mb-4 leading-none uppercase tracking-tighter">Premium Upholstery Swatch Books</h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">Professional fabric presentation for furniture manufacturers and showrooms</p>
            
            <div className="space-y-4 mb-10">
              {[
                "Hardbound, ring-bound, or post-bound formats",
                "Capacity: 20-60 fabric swatches",
                "Custom logo and branding",
                "Professional fabric code labels",
                "Export-quality finishing"
              ].map((item, i) => (
                <div key={i} className="flex items-center text-navy font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal mr-3 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 mb-8">
              <p className="text-gray-500 text-[9px] font-black uppercase mb-1">Standard Pricing</p>
              <p className="text-3xl font-black text-navy leading-none">Starting from {formatPrice(70)} <span className="text-[10px] text-gray-500 uppercase font-bold">/ piece for 100+ units</span></p>
              <p className="text-xs text-gray-500 font-bold mt-2">Request Quote for Volume Pricing</p>
              <button 
                onClick={() => setShowPricingModal(true)}
                className="text-teal font-black text-[10px] uppercase tracking-widest mt-4 flex items-center gap-1 hover:text-gold transition-colors"
              >
                View Full Pricing Table <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="bg-navy/5 px-4 py-2 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest">MOQ: 50 books</div>
              <div className="bg-navy/5 px-4 py-2 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest">Schedule: Confirmed on Review</div>
              <div className="bg-navy/5 px-4 py-2 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest">Sample: {formatPrice(300)}/piece</div>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-6 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">Request Custom Quote</button>
              <a href="https://wa.me/919004962871" className="w-full border-2 border-[#25D366] text-[#25D366] font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white transition-all text-sm uppercase tracking-widest">
                <MessageCircle className="w-5 h-5" /> WhatsApp for Quick Questions
              </a>
              <button onClick={() => onDownload('Upholstery Swatch Book Spec Sheet')} className="text-gray-500 text-[10px] font-black underline uppercase tracking-widest hover:text-navy transition-colors text-center">
                Download Product Spec Sheet
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
                  { s: "Product Type", d: "Upholstery Fabric Swatch Book" },
                  { s: "Binding Options", d: "Hardbound, Ring-bound, Post-bound" },
                  { s: "Swatch Capacity", d: "20-60 fabric samples" },
                  { s: "Standard Sizes", d: "A4 (210x297mm), A5 (148x210mm), Custom" },
                  { s: "Cover Material", d: "300 GSM cardstock, leatherette, or custom" },
                  { s: "Label Options", d: "Printed fabric codes, composition tags, care instructions" },
                  { s: "Customization", d: "Logo printing, custom covers, header cards" },
                  { s: "Fabric Types", d: "Velvet, linen, jacquard, chenille, polyester, cotton" },
                  { s: "MOQ", d: "50 books per collection" },
                  { s: "Sample MOQ", d: "1-5 pieces for testing" },
                  { s: "Lead Time", d: "Project-based schedule confirmed after fabric receipt and spec approval" },
                  { s: "Export Packaging", d: "Shrink-wrapped, corner protection, carton labeling" }
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

      {/* Customization Options Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Full White-Label Customization</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Cover Design", l: "Logo printing, brand colors, embossing, foil stamping", desc: "[Custom cover examples]" },
              { t: "Labeling", l: "Fabric codes, composition, care instructions, QR codes", desc: "[Label examples]" },
              { t: "Binding & Layout", l: "Ring mechanism, post-bound, hardcover, custom layouts", desc: "[Binding types]" }
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 group hover:border-gold transition-colors">
                <div className="aspect-square bg-white rounded-2xl mb-8 flex items-center justify-center text-gray-400 font-black text-[10px] uppercase tracking-widest text-center px-4">{card.desc}</div>
                <h3 className="text-xl font-black text-navy mb-4 uppercase tracking-tight">{card.t}</h3>
                <p className="text-gray-600 text-xs font-bold uppercase tracking-widest leading-relaxed">{card.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Perfect For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Sofa className="w-10 h-10" />, title: "Furniture Mfrs", desc: "Showcase your upholstery fabric range to retailers and B2B clients with professional presentation." },
              { icon: <Ruler className="w-10 h-10" />, title: "Interior Designers", desc: "Portable sample kits for client presentations and project specifications." },
              { icon: <Warehouse className="w-10 h-10" />, title: "Wholesalers", desc: "Sales tools for your distribution network and international buyers." },
              { icon: <Globe className="w-10 h-10" />, title: "Export Brands", desc: "Export-ready presentation for trade shows and international markets." }
            ].map((use, i) => (
              <div key={i} className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center">
                <div className="text-teal mb-6 flex justify-center">{use.icon}</div>
                <h3 className="text-xl font-black text-navy mb-4 uppercase tracking-tight">{use.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Materials & Construction</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-gold font-black uppercase text-[11px] tracking-[0.3em] mb-6">Cover Options</h3>
              <ul className="space-y-4 text-sm font-bold text-navy">
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> 300 GSM premium cardstock</li>
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> Leatherette (various colors)</li>
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> Fabric-covered boards</li>
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> Custom materials on request</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold font-black uppercase text-[11px] tracking-[0.3em] mb-6">Binding Mechanisms</h3>
              <ul className="space-y-4 text-sm font-bold text-navy">
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> 3-ring D-ring binder</li>
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> 4-ring mechanism</li>
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> Post-bound screw system</li>
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> Hardbound spine</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold font-black uppercase text-[11px] tracking-[0.3em] mb-6">Interior Pages</h3>
              <ul className="space-y-4 text-sm font-bold text-navy">
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> Transparent protective sleeves</li>
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> Fabric-safe mounting</li>
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> Easy swatch replacement</li>
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-teal" /> Optional detachable pages</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Transparent Volume Pricing</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-xl">
             <table className="w-full text-left">
                <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="p-8">Order Quantity</th>
                    <th className="p-8">Price per Unit</th>
                    <th className="p-8">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-bold text-navy text-xs">
                  {[
                    { q: "1-5 pieces (sample)", p: formatPrice(300), b: "Quality testing" },
                    { q: "10-25 pieces", p: `${formatPrice(150)}-${formatPrice(200)}`, b: "Small designers" },
                    { q: "50-100 pieces", p: `${formatPrice(85)}-${formatPrice(100)}`, b: "Standard orders" },
                    { q: "100-500 pieces", p: `${formatPrice(70)}-${formatPrice(85)}`, b: "Growing brands" },
                    { q: "500+ pieces", p: `${formatPrice(60)}-${formatPrice(80)}`, b: "Bulk export" }
                  ].map((tier, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-8">{tier.q}</td>
                      <td className="p-8 text-gold text-lg font-black">{tier.p}</td>
                      <td className="p-8 text-gray-500 uppercase tracking-widest text-[10px] font-black">{tier.b}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
          <p className="text-center text-[11px] text-gray-500 font-bold uppercase mt-8 italic">"Prices vary based on customization, binding type, and swatch count. Request a detailed quote for your specific requirements."</p>
          <div className="flex justify-center mt-10">
            <button onClick={() => onNavigate('contact-page')} className="bg-navy text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gold transition-all">Get My Custom Pricing</button>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Manufacturing Timeline</h2>
          <div className="relative">
             <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2"></div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
               {[
                 { s: "Step 1", t: "Fabric Receipt", d: "Stage 1" },
                 { s: "Step 2", t: "Design Approval", d: "Stage 2" },
                 { s: "Step 3", t: "Fabric Cutting", d: "Stage 3" },
                 { s: "Step 4", t: "Assembly", d: "Stage 4" },
                 { s: "Step 5", t: "Quality Control", d: "Stage 5" },
                 { s: "Step 6", t: "Dispatch", d: "Stage 6" }
               ].map((step, i) => (
                 <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 text-center shadow-sm hover:scale-105 transition-transform group">
                   <p className="text-gold font-black text-[9px] uppercase tracking-widest mb-1 group-hover:text-teal transition-colors">{step.s}</p>
                   <h3 className="font-bold text-navy text-sm mb-1 leading-tight">{step.t}</h3>
                   <p className="text-gray-500 font-bold text-[10px] uppercase">{step.d}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Commercial B2B Applications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "Structured hardbound upholstery books keep multi-weight chenille, boucle, and velvet collections organised for commercial showroom presentations.", n: "Furniture & Upholstery Brands", c: "Showroom & Distributor Kits" },
              { q: "Export-ready packaging and shade-lot verification help textile exporters distribute coordinated fabric collections to international trade buyers.", n: "Home Textile Exporters", c: "International Trade & Sourcing" },
              { q: "Custom spine branding, technical specification tables, and protective edge finishes support repeat seasonal collection launches.", n: "Interior Specification Studios", c: "Hospitality & Contract Projects" }
            ].map((test, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 flex flex-col h-full shadow-sm">
                <div className="flex text-gold mb-6">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-gray-600 text-sm italic font-medium leading-relaxed mb-8 flex-grow">"{test.q}"</p>
                <div>
                  <h3 className="font-black text-navy text-sm uppercase mb-1">{test.n}</h3>
                  <p className="text-gold font-black text-[9px] uppercase tracking-widest">{test.c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Complete Your Fabric Presentation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Wallpaper Catalog Books", p: "120", target: 'product-wallpaper-catalog', img: LOCAL_IMAGES.wallpaperBook },
              { t: "Curtain Fabric Albums", p: "100", target: 'product-curtain', img: LOCAL_IMAGES.curtainAlbum },
              { t: "Fabric Hanger Swatches", p: "18", target: 'product-hanger', img: LOCAL_IMAGES.waterfallHanger }
            ].map((prod, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 group">
                <div className="aspect-video bg-white rounded-2xl mb-6 overflow-hidden">
                  <img src={prod.img} alt={prod.t} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                </div>
                <h3 className="text-lg font-black text-navy mb-4 uppercase tracking-tight group-hover:text-gold transition-colors">{prod.t}</h3>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                   <span className="text-[10px] font-black text-gray-500 uppercase">From {formatPrice(Number(prod.p))}</span>
                   <button onClick={() => onNavigate(prod.target as ViewState)} className="text-teal font-black text-[10px] uppercase tracking-widest hover:underline">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-navy py-24 px-4 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-tight">Ready to Order Premium Upholstery Swatch Books?</h2>
          <p className="text-gray-300 text-lg mb-12 font-medium">Request a custom technical quotation. Export coordination from Thane-Bhiwandi, Maharashtra.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-gold transition-all uppercase tracking-widest text-xs">Request Technical Quote</button>
            <button onClick={() => onDownload('Full Upholstery Guide')} className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">Download Catalog (PDF)</button>
          </div>
        </div>
      </section>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-navy/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 relative animate-fadeIn shadow-2xl">
            <button onClick={() => setShowPricingModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-navy"><X className="w-6 h-6" /></button>
            <h3 className="text-2xl font-black text-navy uppercase tracking-tighter mb-6">Upholstery Book Pricing</h3>
            <div className="divide-y divide-gray-100 text-sm font-bold text-navy mb-8">
              <div className="py-3 flex justify-between"><span>50-100 units</span> <span className="text-gold">{formatPrice(85)} - {formatPrice(100)} / pc</span></div>
              <div className="py-3 flex justify-between"><span>100-250 units</span> <span className="text-gold">{formatPrice(75)} - {formatPrice(85)} / pc</span></div>
              <div className="py-3 flex justify-between"><span>250-500 units</span> <span className="text-gold">{formatPrice(70)} - {formatPrice(75)} / pc</span></div>
              <div className="py-3 flex justify-between"><span>500+ units (Export Tier)</span> <span className="text-teal font-black">{formatPrice(60)} - {formatPrice(70)} / pc</span></div>
            </div>
            <button onClick={() => { setShowPricingModal(false); onNavigate('contact-page'); }} className="w-full bg-navy text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-gold transition-colors">Request Written Quote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpholstery;
