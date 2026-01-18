import React, { useState } from 'react';
import { ViewState } from '../App.tsx';
import { Star, CheckCircle2, Factory, Globe, Layout, Store, ChevronRight, Download, MessageCircle, X, HelpCircle } from 'lucide-react';
import { useGlobalSettings } from './GlobalSettingsContext.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const ProductCurtain: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const { formatPrice } = useGlobalSettings();
  const [activeImg, setActiveImg] = useState(0);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const images = [
    { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", alt: "Large-format curtain album open showing sheer fabrics" },
    { src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80", alt: "Close-up of detachable page mechanism" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", alt: "Various curtain textures - sheer, blackout, embroidered" },
    { src: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80", alt: "Album with branded cover" },
    { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", alt: "Multiple albums for different collections" }
  ];

  const faqs = [
    { q: "Can you handle very delicate sheer fabrics?", a: "Yes, we use anti-static sleeves and gentle handling processes specifically for sheers and voiles" },
    { q: "What's the maximum fabric weight you can accommodate?", a: "Up to 600 GSM for heavy blackout and velvet curtains with reinforced pages" },
    { q: "Do sleeves affect fabric color appearance?", a: "Our crystal-clear PVC is color-neutral and UV-resistant to maintain true fabric color" },
    { q: "Can pages be reused with different fabrics?", a: "Yes, sleeves are designed for multiple fabric changes without damage" },
    { q: "What if I need to add pages later?", a: "Post-bound albums allow easy page addition. We can supply additional blank pages." },
    { q: "Do you provide seasonal collection updates?", a: "Yes, order additional pages with new fabrics to update existing albums" }
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
          <span className="text-navy uppercase">Curtain Fabric Albums</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Product Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-gray-100 rounded-[3rem] overflow-hidden border border-gray-200 shadow-2xl relative group cursor-zoom-in">
              <img src={images[activeImg].src} alt={images[activeImg].alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-8 left-8 bg-gold text-navy text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Large Format Premium</div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImg(idx)} 
                  className={`aspect-square rounded-2xl border-2 overflow-hidden transition-all ${activeImg === idx ? 'border-gold ring-4 ring-gold/10' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-6">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
               <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-2">4.9/5 (28 reviews)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy mb-4 leading-none uppercase tracking-tighter">Curtain Fabric Albums - Large Format</h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">Professional sample albums for window treatment manufacturers and home textile brands</p>
            
            <div className="space-y-4 mb-10">
              {[
                "Oversized format (A3 or larger) for full fabric drape visibility",
                "Capacity: 30-50 curtain fabric swatches",
                "Detachable pages for customer selection",
                "Transparent protective sleeves for delicate fabrics",
                "Suitable for sheer, blackout, jacquard, and embroidered curtains"
              ].map((item, i) => (
                <div key={i} className="flex items-center text-navy font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal mr-3 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 mb-10">
              <p className="text-gray-400 text-[9px] font-black uppercase mb-1 leading-none">Export Tier Pricing</p>
              <p className="text-3xl font-black text-navy leading-none mt-2">Starting from {formatPrice(100)} <span className="text-[10px] text-gray-400 font-bold uppercase">/ pc for 100+ units</span></p>
              <button 
                onClick={() => setShowPricingModal(true)}
                className="text-teal font-black text-[10px] uppercase tracking-widest mt-4 flex items-center gap-1 hover:text-gold transition-colors"
              >
                View Complete Pricing Guide <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="bg-navy/5 px-4 py-2 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest">MOQ: 40 albums</div>
              <div className="bg-navy/5 px-4 py-2 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest">Lead Time: 24-30 days</div>
              <div className="bg-navy/5 px-4 py-2 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest">Sample: {formatPrice(500)}/pc</div>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-6 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest">Request Custom Quote</button>
              <a href="https://wa.me/919004962871" className="w-full border-2 border-[#25D366] text-[#25D366] font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white transition-all text-sm uppercase tracking-widest">
                <MessageCircle className="w-5 h-5" /> WhatsApp for Quick Questions
              </a>
              <button onClick={() => onDownload('Curtain Fabric Album Spec Sheet')} className="text-gray-400 text-[10px] font-black underline uppercase tracking-widest hover:text-navy transition-colors text-center">
                Download Product Spec Sheet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specifications Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy mb-12 text-center uppercase tracking-tighter">Album Specifications</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-100">
                {[
                  { s: "Format", d: "Large format (A3, A3+, Custom oversized)" },
                  { s: "Swatch Capacity", d: "30-50 curtain fabric samples" },
                  { s: "Standard Sizes", d: "A3 (297x420mm), A3+ (330x483mm), Custom up to A2" },
                  { s: "Page Type", d: "Detachable pages with transparent sleeves" },
                  { s: "Sleeve Material", d: "Crystal-clear PVC, fabric-safe, anti-static" },
                  { s: "Label Options", d: "Collection headers, fabric codes, care symbols" },
                  { s: "Fabric Types", d: "Sheer, voile, blackout, jacquard, embroidered, linen, polyester" },
                  { s: "MOQ", d: "40 albums per collection" },
                  { s: "Lead Time", d: "24-30 days after fabric receipt" },
                  { s: "Export Packaging", d: "Individual shrink wrap, protective cartons" }
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

      {/* Fabric Types Showcase Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Perfect for All Curtain Fabric Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { t: "Sheer Fabrics", d: "Transparent sleeves preserve delicate sheers without crushing or marking", i: "[Sheer voile sample]" },
              { t: "Blackout Curtains", d: "Sturdy pages support heavy blackout fabrics up to 400 GSM", i: "[Heavy blackout fabric]" },
              { t: "Jacquard Weaves", d: "Large format displays intricate jacquard patterns effectively", i: "[Jacquard pattern detail]" },
              { t: "Embroidered Fabrics", d: "Protective sleeves prevent snagging of embroidered work", i: "[Embroidery detail]" },
              { t: "Linen & Cotton", d: "Natural fabric mounting without adhesive damage", i: "[Natural fiber curtain]" },
              { t: "Printed Curtains", d: "A3+ format shows full design repeats and color gradients", i: "[Printed pattern]" }
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex flex-col items-center text-center">
                 <div className="aspect-square w-full bg-white rounded-2xl mb-8 flex items-center justify-center text-[9px] font-black text-gray-300 uppercase tracking-widest px-4">{card.i}</div>
                 <h4 className="text-lg font-black text-navy mb-3 uppercase tracking-tight">{card.t}</h4>
                 <p className="text-gray-500 text-xs font-medium leading-relaxed">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Options Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Complete White-Label Customization</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Cover & Branding", o: ["Company logo printing", "Brand color themes", "Collection headers", "Seasonal artwork"], i: "[Custom cover examples]" },
              { t: "Page Layouts", o: ["Single large swatch", "Multi-swatch comparison", "Coordinated fabric sets", "Custom grid layouts"], i: "[Different page layouts]" },
              { t: "Labeling", o: ["Fabric name and code", "Composition & weight", "Care instructions", "QR codes to catalog"], i: "[Label examples]" },
              { t: "Special Features", o: ["Detachable takeaway pages", "Color story dividers", "Mood board inserts", "Pocket pages"], i: "[Special features]" }
            ].map((card, i) => (
              <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm h-full">
                <div className="aspect-video bg-gray-50 rounded-2xl mb-6 flex items-center justify-center text-[8px] font-black text-gray-300 uppercase px-4 text-center">{card.i}</div>
                <h4 className="text-lg font-black text-navy mb-6 uppercase tracking-tight">{card.t}</h4>
                <ul className="space-y-3">
                  {card.o.map((opt, j) => (
                    <li key={j} className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-gold rounded-full"></span> {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Ideal For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Factory className="w-10 h-10" />, title: "Curtain Mfrs", desc: "Showcase your seasonal collections with professional large-format presentation displaying full drape." },
              { icon: <Globe className="w-10 h-10" />, title: "Home Exporters", desc: "Export-ready albums for international trade shows. Perfect for presenting window treatment ranges to global markets." },
              { icon: <Layout className="w-10 h-10" />, title: "Design Studios", desc: "Client presentation kits with detachable pages allowing customers to take swatches home for decision-making." },
              { icon: <Store className="w-10 h-10" />, title: "Showrooms", desc: "Display albums for walk-in customers. Large format enables self-service browsing with luxury presentation." }
            ].map((use, i) => (
              <div key={i} className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 text-center">
                <div className="text-teal mb-6 flex justify-center">{use.icon}</div>
                <h4 className="text-xl font-black text-navy mb-4 uppercase tracking-tight">{use.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Formats Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-tighter">Available Formats</h2>
          <table className="w-full bg-white rounded-[2.5rem] overflow-hidden shadow-xl text-left border-collapse min-w-[700px]">
            <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-8">Format</th>
                <th className="p-8">Dimensions</th>
                <th className="p-8">Swatch Size</th>
                <th className="p-8">Best For</th>
                <th className="p-8">Price Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold text-navy text-xs">
              {[
                { f: "A3 Standard", d: "297x420mm", s: "Up to 250x300mm", b: "Standard collections", p: `₹100-120/unit` },
                { f: "A3+ Large", d: "330x483mm", s: "Up to 280x400mm", b: "Premium presentation", p: `₹120-140/unit` },
                { f: "Custom Oversized", d: "Up to A2", s: "Custom swatches", b: "Luxury segment", p: `₹150-180/unit` },
                { f: "Landscape", d: "Custom", s: "Wide display", b: "Modern collections", p: `₹110-130/unit` }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-8 font-black">{row.f}</td>
                  <td className="p-8 text-gray-500">{row.d}</td>
                  <td className="p-8 text-gray-500">{row.s}</td>
                  <td className="p-8 text-teal uppercase tracking-widest text-[9px]">{row.b}</td>
                  <td className="p-8 text-gold font-black">{row.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-8 text-center text-[10px] font-black text-gray-400 uppercase italic">"Prices for MOQ 100+. Custom sizes available on request."</p>
        </div>
      </section>

      {/* Album Construction Details */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
           {[
             { t: "Crystal-Clear Protection", d: ["Anti-static PVC prevents cling", "UV-resistant to prevent fading", "Easy insertion/removal", "Welded edges (no adhesive)"], i: "[Sleeve detail close-up]" },
             { t: "Flexible Page System", d: ["Detachable pages with binding", "Post-bound screws for adding", "Reinforced holes (anti-tear)", "Pages lie flat when open"], i: "[Page binding mechanism]" },
             { t: "Durable Professional Covers", d: ["2mm rigid board backing", "Padded leatherette or fabric", "Reinforced corners", "Custom foil stamping"], i: "[Cover variations]" }
           ].map((item, i) => (
             <div key={i} className="space-y-8">
               <div className="aspect-square bg-gray-50 rounded-[3rem] flex items-center justify-center text-[10px] font-black text-gray-300 uppercase p-12 text-center border border-gray-100">{item.i}</div>
               <h4 className="text-xl font-black text-navy uppercase tracking-tight">{item.t}</h4>
               <ul className="space-y-4">
                 {item.d.map((feat, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-500">
                     <CheckCircle2 className="w-4 h-4 text-teal" /> {feat}
                   </li>
                 ))}
               </ul>
             </div>
           ))}
        </div>
      </section>

      {/* Competitor Comparison Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-tighter">Why Choose SwatchCraft for Curtain Albums?</h2>
          <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-xl overflow-x-auto">
            <table className="w-full text-left font-bold text-xs uppercase tracking-widest">
               <thead className="bg-navy text-white text-[9px]">
                 <tr>
                    <th className="p-6">Feature</th>
                    <th className="p-6">SwatchCraft India</th>
                    <th className="p-6">China Suppliers</th>
                    <th className="p-6">USA Suppliers</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 text-navy">
                  <tr><td className="p-6 bg-gray-50/50">Price (MOQ 500+)</td><td className="p-6 text-teal">₹90-110 / $6-8</td><td className="p-6">$5-7</td><td className="p-6">$8-12</td></tr>
                  <tr><td className="p-6 bg-gray-50/50">Lead Time</td><td className="p-6 text-teal">24-30 days</td><td className="p-6">35-50 days</td><td className="p-6">25-35 days</td></tr>
                  <tr><td className="p-6 bg-gray-50/50">Customization</td><td className="p-6 text-teal">Full white-label</td><td className="p-6 text-gray-400">Limited</td><td className="p-6">Full custom</td></tr>
                  <tr><td className="p-6 bg-gray-50/50">Fabric Handling</td><td className="p-6 text-teal">Expert (30+ years)</td><td className="p-6 text-gray-400">Standard</td><td className="p-6">Expert</td></tr>
                  <tr><td className="p-6 bg-gray-50/50">Communication</td><td className="p-6 text-teal">English Fluent</td><td className="p-6 text-gray-400">Language Barrier</td><td className="p-6">Native</td></tr>
               </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Trusted by Leading Curtain Brands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "The large format makes a huge difference in our showroom. Customers can truly see the fabric drape and texture. Sales have increased 30% since we switched to SwatchCraft albums.", n: "Priya Sharma", c: "Elite Window Fashions, Mumbai" },
              { q: "We export to Dubai and needed premium presentation for luxury hotels. SwatchCraft's albums with gold embossing perfectly matched our brand image.", n: "Ahmed Al-Mansouri", c: "Arabian Home Textiles, Sharjah" },
              { q: "Detachable pages are genius! Customers take swatches home, and we don't lose the entire album. Lead time was exactly as promised.", n: "Interior Designer", c: "Design Studio, Bangalore" }
            ].map((test, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex flex-col h-full shadow-sm">
                <div className="flex text-gold mb-6">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-gray-600 text-sm italic font-medium leading-relaxed mb-8 flex-grow">"{test.q}"</p>
                <div>
                  <h5 className="font-black text-navy text-sm uppercase mb-1">{test.n}</h5>
                  <p className="text-gold font-black text-[9px] uppercase tracking-widest">{test.c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical FAQ */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12 uppercase tracking-tighter">Technical FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="font-black text-navy uppercase tracking-widest text-sm">{faq.q}</span>
                  <HelpCircle className={`w-6 h-6 text-gold transform transition-transform duration-500 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-6 font-medium animate-fadeIn">
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
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
           {/* Abstract curtain pattern */}
           <div className="w-[200%] h-full grid grid-cols-20 gap-4 opacity-30 transform -skew-x-12">
             {[...Array(20)].map((_, i) => <div key={i} className="bg-white/20 h-full w-4"></div>)}
           </div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-tight">Ready to Showcase Your Curtain Collections Professionally?</h2>
          <p className="text-gray-400 text-lg mb-12 font-medium">Get a custom quote for large-format curtain albums with your branding.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-navy transition-all uppercase tracking-widest text-xs">Request Custom Quote</button>
            <button onClick={() => onDownload('Full Curtain Album Spec Sheet')} className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">Order Sample Album ({formatPrice(500)})</button>
          </div>
          <p className="mt-8 text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Free design mockup with quotes over {formatPrice(10000)}</p>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60]">
        <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-5 rounded-2xl shadow-2xl uppercase tracking-widest text-sm">Request Technical Quote</button>
      </div>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-navy/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-3xl overflow-hidden shadow-2xl relative">
            <button onClick={() => setShowPricingModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-navy transition-colors"><X className="w-8 h-8" /></button>
            <div className="p-12">
               <h3 className="text-2xl font-black text-navy uppercase tracking-widest mb-10 border-b border-gray-100 pb-4">Volume Pricing for Curtain Albums</h3>
               <div className="overflow-x-auto">
                 <table className="w-full text-left font-bold text-navy text-xs">
                   <thead className="text-[10px] text-gray-400 uppercase tracking-widest">
                     <tr><th className="py-4">Quantity</th><th className="py-4">Price / Album</th><th className="py-4">Total</th><th className="py-4">Ideal For</th></tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      <tr><td className="py-4">1-5 Sample Pack</td><td className="py-4 text-gold font-black">{formatPrice(500)}</td><td className="py-4 text-gray-400">---</td><td className="py-4 text-gray-400">Evaluation</td></tr>
                      <tr><td className="py-4">10-25 Units</td><td className="py-4 text-gold font-black">{formatPrice(200)}-{formatPrice(300)}</td><td className="py-4 text-gray-400">---</td><td className="py-4 text-gray-400">Small Designers</td></tr>
                      <tr><td className="py-4">40-100 Units (MOQ)</td><td className="py-4 text-gold font-black">{formatPrice(120)}-{formatPrice(140)}</td><td className="py-4 text-gray-400">---</td><td className="py-4 text-gray-400">Standard Orders</td></tr>
                      <tr><td className="py-4">100-500 Units</td><td className="py-4 text-gold font-black">{formatPrice(100)}-{formatPrice(120)}</td><td className="py-4 text-gray-400">---</td><td className="py-4 text-gray-400">Multiple Series</td></tr>
                      <tr><td className="py-4">500+ Export Bulk</td><td className="py-4 text-teal font-black">{formatPrice(90)}-{formatPrice(110)}</td><td className="py-4 text-gray-400">---</td><td className="py-4 text-gray-400">Bulk Distribution</td></tr>
                   </tbody>
                 </table>
               </div>
               
               <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8 mt-4">
                  <div className="text-center"><p className="text-[9px] text-gray-400 font-black uppercase mb-1">USA Export</p><p className="text-sm font-black text-navy">$6-8 / unit</p></div>
                  <div className="text-center"><p className="text-[9px] text-gray-400 font-black uppercase mb-1">EU Export</p><p className="text-sm font-black text-navy">€5.50-7.50 / unit</p></div>
                  <div className="text-center"><p className="text-[9px] text-gray-400 font-black uppercase mb-1">UAE Export</p><p className="text-sm font-black text-navy">AED 25-35 / unit</p></div>
               </div>

               <button onClick={() => onNavigate('contact-page')} className="w-full bg-teal text-white font-black py-5 rounded-2xl mt-12 uppercase tracking-widest text-xs shadow-xl">Request Technical RFQ Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCurtain;