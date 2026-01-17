import React, { useState } from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  postId: number;
  onNavigate: (view: ViewState) => void;
}

const BlogPost: React.FC<Props> = ({ postId, onNavigate }) => {
  // Related Posts Logic
  const getRelatedPosts = (currentId: number) => {
    const allPosts = [
      { id: 1, target: 'blog-post-1' as ViewState, title: "Choosing Fabric Swatch Formats", tag: "Strategy" },
      { id: 2, target: 'blog-post-2' as ViewState, title: "Global MOQ Pricing Guide", tag: "Pricing" },
      { id: 3, target: 'blog-post-3' as ViewState, title: "Waterfall Card Advantages", tag: "Innovation" },
      { id: 4, target: 'blog-post-4' as ViewState, title: "Export Documentation Checklist", tag: "Logistics" }
    ];
    return allPosts.filter(p => p.id !== currentId).slice(0, 3);
  };

  const related = getRelatedPosts(postId);

  // Custom components for blog content
  const ROIBox = () => {
    const [qty, setQty] = useState(100);
    const cost = qty >= 500 ? 75 : 95;
    return (
      <div className="bg-navy p-8 rounded-3xl text-white my-12 shadow-2xl relative overflow-hidden">
        <h4 className="text-xl font-black mb-6 text-gold uppercase tracking-tighter">B2B ROI Calculator (Standard Upholstery)</h4>
        <div className="grid sm:grid-cols-2 gap-8 relative z-10">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Select Target Quantity:</label>
            <div className="flex gap-2">
              {[100, 500, 1000].map(q => (
                <button key={q} onClick={() => setQty(q)} className={`px-4 py-2 rounded-xl font-bold text-xs uppercase transition-all ${qty === q ? 'bg-gold text-navy' : 'bg-white/10 text-white hover:bg-white/20'}`}>{q}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Cost / Unit</p>
              <p className="text-2xl font-black">₹{cost}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Total Budget</p>
              <p className="text-2xl font-black">₹{(qty * cost).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <p className="text-[9px] text-gray-500 italic mt-6">*India domestic rates. At 500+ MOQ, you save ~25% per unit compared to entry tier.</p>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>
    );
  };

  const postsData = {
    1: {
      tag: "Strategy",
      readTime: "12 min",
      date: "Jan 22, 2025",
      title: "How to Choose the Right Fabric Swatch Format for Your Export Business",
      author: "SwatchCraft Editorial",
      content: (
        <>
          <p className="text-xl font-bold text-navy/80 leading-relaxed mb-10">
            For global fabric exporters, the first physical interaction a buyer has with your brand is often through a swatch. But choosing the wrong format can lead to ignored samples and wasted marketing budget.
          </p>
          
          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 1: Traditional Swatch Books vs. Waterfall Cards</h2>
          <p className="mb-8 leading-relaxed">
            While hardbound books look premium for showroom displays, they present significant challenges for the export market—primarily weight and accessibility. Waterfall cards offer a tiered arrangement that allows buyers to see 40% more of the collection at a single glance.
          </p>
          
          <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-12 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <tr><th className="p-6">Feature</th><th className="p-6">Swatch Books</th><th className="p-6">Waterfall Cards</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-navy">
                <tr><td className="p-6">Portability</td><td className="p-6 text-gray-500">Medium (Bulky)</td><td className="p-6 text-teal">Excellent (Flat)</td></tr>
                <tr><td className="p-6">Cost per unit</td><td className="p-6 text-gray-500">₹85 - ₹110</td><td className="p-6 text-teal">₹60 - ₹80</td></tr>
                <tr><td className="p-6">Production Time</td><td className="p-6 text-gray-500">24-30 Days</td><td className="p-6 text-teal">15-21 Days</td></tr>
                <tr><td className="p-6">Samples Shown</td><td className="p-6 text-gray-500">20-40 (Page-based)</td><td className="p-6 text-teal">40-60 (Instant view)</td></tr>
              </tbody>
            </table>
          </div>

          <blockquote className="border-l-8 border-gold bg-gold/5 p-10 rounded-3xl italic text-gray-600 mb-12">
            "We switched our European catalog to waterfall cards and saw repeat orders double within one season. The portability allowed our buyers to keep the samples in their active project files."
            <footer className="mt-4 text-navy font-black not-italic uppercase tracking-widest text-[10px]">— Senior Exporter, Mumbai Textile Hub</footer>
          </blockquote>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 2: MOQ & Pricing Tiers</h2>
          <p className="mb-8 leading-relaxed font-medium">
            Scaling your sampling is critical. At 500+ MOQ, Indian manufacturers like SwatchCraft can offer pricing that competes directly with China while maintaining European quality standards. At 500+ MOQ, you typically save 25% per unit.
          </p>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 3: Production Timeline & Delivery</h2>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-12">
            <h4 className="text-xs font-black text-gold uppercase mb-6 tracking-widest">Delivery Timeline by Supplier (Custom Order)</h4>
            <div className="space-y-4">
               {[
                 { region: "India (SwatchCraft)", time: "15 Days", status: "Competitive Advantage" },
                 { region: "China (Standard)", time: "45 Days", status: "Lagging" },
                 { region: "USA (Domestic)", time: "25 Days", status: "Premium/Slow" }
               ].map((r, i) => (
                 <div key={i} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                   <span className="font-bold text-navy">{r.region}</span>
                   <span className="font-black text-teal">{r.time}</span>
                   <span className="text-[10px] font-black uppercase text-gray-400">{r.status}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-teal/5 p-12 rounded-[3rem] border border-teal/10 mb-12">
            <h4 className="text-xl font-black text-navy mb-4 uppercase tracking-tighter">Case Study: European Success</h4>
            <p className="text-gray-600 leading-relaxed font-medium italic">
              "How SwatchCraft's 15-day delivery helped a German upholstery importer capture 3 new wholesale accounts in a single trade show cycle using streamlined waterfall formats."
            </p>
          </div>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 5: Waterfall Format Deep Dive</h2>
          <p className="mb-10 leading-relaxed">
            The Waterfall layout allows for a tiered arrangement where only 1-inch of each fabric is shown in a cascade. This psychology works because it provides the full color story in a single glance. Data shows customers choosing waterfall see a 50-60% repeat order rate vs 30-40% traditional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
             <button onClick={() => onNavigate('product-waterfall')} className="bg-teal text-white font-black py-4 px-10 rounded-xl hover:opacity-90 transition-all shadow-lg text-xs uppercase tracking-widest">View Waterfall Specifications</button>
             <button onClick={() => onNavigate('contact-page')} className="bg-navy text-white font-black py-4 px-10 rounded-xl hover:opacity-90 transition-all shadow-lg text-xs uppercase tracking-widest">Get Free Sample</button>
          </div>
        </>
      )
    },
    2: {
      tag: "Pricing",
      readTime: "15 min",
      date: "Jan 20, 2025",
      title: "MOQ Pricing Breakdown: How India Competes with China & USA in 2025",
      author: "Market Analysis Team",
      content: (
        <>
          <p className="text-xl font-bold text-navy/80 leading-relaxed mb-10">
            2025 marks a turning point in global fabric sampling. As labor costs rise in China and the USA remains prohibitively expensive for mass sampling, India has emerged as the "Sweet Spot" for B2B brands.
          </p>
          
          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 1: What is MOQ and Why It Matters</h2>
          <p className="mb-8 leading-relaxed">
            MOQ (Minimum Order Quantity) dictates your setup cost amortization. In fabric sampling, higher volumes don't just reduce price; they drastically increase your sales reach by allowing you to saturate more designer studios.
          </p>

          <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-12 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[400px]">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <tr><th className="p-6">Quantity Tier</th><th className="p-6">Unit Price (Est.)</th><th className="p-6">Margin Impact</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-navy text-xs">
                <tr><td className="p-6">1 Piece (Proto)</td><td className="p-6">₹500</td><td className="p-6 text-red-500">Zero Margin</td></tr>
                <tr><td className="p-6">50 Pieces (Entry)</td><td className="p-6">₹95</td><td className="p-6 text-gray-500">High Overhead</td></tr>
                <tr><td className="p-6">100 Pieces (Standard)</td><td className="p-6">₹85</td><td className="p-6 text-teal">Growth Ready</td></tr>
                <tr className="bg-gold/10"><td className="p-6 text-gold">500+ Pieces (Export)</td><td className="p-6 text-gold">₹70 - ₹75</td><td className="p-6 text-gold font-black">MAX ROI</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 2: Global Pricing Matrix</h2>
          <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-12 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <tr><th className="p-6">Region</th><th className="p-6">Avg Cost (MOQ)</th><th className="p-6">Lead Time</th><th className="p-6">Quality Score</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-navy">
                <tr><td className="p-6">China</td><td className="p-6 text-gray-500">$0.85 - $1.20</td><td className="p-6">45 Days</td><td className="p-6">Standard</td></tr>
                <tr className="bg-gold/10"><td className="p-6 text-gold font-black">India (SwatchCraft)</td><td className="p-6 text-gold font-black">$0.96 - $1.14</td><td className="p-6 text-teal">15-21 Days</td><td className="p-6 text-teal">Premium</td></tr>
                <tr><td className="p-6">USA</td><td className="p-6 text-gray-500">$5.00 - $15.00</td><td className="p-6">25 Days</td><td className="p-6">High</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 3: ROI Calculator</h2>
          <ROIBox />

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 4: India's Sweet Spot</h2>
          <p className="mb-10 leading-relaxed">
            SwatchCraft positioning: "China cost + USA quality + India speed". We offer ₹70-80 per unit at 500 MOQ = $0.96-1.14 which is competitive with China while offering 3-day customer response times instead of 2-week delays.
          </p>

          <button onClick={() => onNavigate('pricing')} className="bg-gold text-navy font-black py-4 px-10 rounded-xl hover:opacity-90 transition-all shadow-lg text-xs uppercase tracking-widest mb-12">View Full Pricing Guide</button>
        </>
      )
    },
    3: {
      tag: "Innovation",
      readTime: "10 min",
      date: "Jan 18, 2025",
      title: "Why Waterfall Swatch Cards are Winning Over Traditional Sample Books",
      author: "Design Team",
      content: (
        <>
          <p className="text-xl font-bold text-navy/80 leading-relaxed mb-10">
            In 2025, top fabric exporters are switching formats. The "Waterfall" layout isn't just a design choice—it's a high-conversion sales strategy that captures trade show leads and retail attention.
          </p>
          
          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 1: The Waterfall Advantage Explained</h2>
          <div className="grid sm:grid-cols-2 gap-10 mb-12">
             <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex flex-col items-center justify-center p-6 border border-gray-200">
                <span className="text-[9px] font-black text-gray-400 uppercase mb-4">[Visual: Bulky Traditional Book]</span>
                <p className="text-xs text-gray-500 font-bold text-center leading-tight">Requires page-flipping. Hides half the collection from view at any given time.</p>
             </div>
             <div className="aspect-[4/3] bg-teal/5 rounded-2xl flex flex-col items-center justify-center p-6 border border-teal/10">
                <span className="text-[9px] font-black text-teal uppercase mb-4">[Visual: Sleek Waterfall Card]</span>
                <p className="text-xs text-navy font-bold text-center leading-tight">Instant color story. 40% more visible samples in less footprint than a binder.</p>
             </div>
          </div>

          <blockquote className="border-l-8 border-teal bg-teal/5 p-10 rounded-3xl italic text-gray-600 mb-12">
            "Our trade show booth finally stands out. The waterfall cards allow buyers to take a full collection color story home in their laptop bag."
            <footer className="mt-4 text-navy font-black not-italic uppercase tracking-widest text-[10px]">— Export Director, HomeStyle Italy</footer>
          </blockquote>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 2: Format Recommendation by Business Type</h2>
          <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-12 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <tr><th className="p-6">Business Type</th><th className="p-6">Recommended Format</th><th className="p-6">Primary Impact</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-navy text-xs">
                <tr><td className="p-6">Sales Reps</td><td className="p-6">Hanger Card</td><td className="p-6 text-teal">Ultra-Portable</td></tr>
                <tr><td className="p-6">Showrooms</td><td className="p-6">Bi-fold Waterfall</td><td className="p-6 text-teal">Browsability</td></tr>
                <tr><td className="p-6">Trade Shows</td><td className="p-6">Tri-fold Storyboard</td><td className="p-6 text-teal">Lead Capture</td></tr>
              </tbody>
            </table>
          </div>

          <button onClick={() => onNavigate('product-waterfall')} className="bg-teal text-white font-black py-4 px-10 rounded-xl hover:opacity-90 transition-all shadow-lg text-xs uppercase tracking-widest mb-12">Order Waterfall Sample Kit</button>
        </>
      )
    },
    4: {
      tag: "Logistics",
      readTime: "18 min",
      date: "Jan 15, 2025",
      title: "The Complete Export Checklist: Packaging, Shipping & Documentation for EU/USA",
      author: "Export Operations",
      content: (
        <>
          <p className="text-xl font-bold text-navy/80 leading-relaxed mb-10">
            Export compliance is the difference between a sample on a designer's desk and a sample stuck in customs. This roadmap ensures your fabric presentations reach international buyers smoothly.
          </p>
          
          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 1: Documentation Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
             {[
               { t: "Commercial Invoice", d: "Detailed HS codes per sample type for accurate duty assessment." },
               { t: "Packing List", d: "Precise dimensions and weights for shipping quote accuracy." },
               { t: "Certificate of Origin", d: "Crucial for EU tariff advantages under Indian origin schemes." },
               { t: "IGST/GST Proof", d: "Essential for claiming Indian export tax credits." }
             ].map((doc, i) => (
               <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex gap-4">
                  <span className="w-8 h-8 bg-teal/10 text-teal rounded-full flex items-center justify-center font-black text-xs shrink-0">{i+1}</span>
                  <div><h5 className="font-bold text-navy text-sm mb-1">{doc.t}</h5><p className="text-gray-500 text-[10px] leading-relaxed font-medium">{doc.d}</p></div>
               </div>
             ))}
          </div>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 2: Shipping Options Matrix</h2>
          <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-12 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <tr><th className="p-6">Method</th><th className="p-6">Transit Time</th><th className="p-6">Avg Cost (20kg)</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-navy text-xs">
                <tr><td className="p-6">Air (DHL Express)</td><td className="p-6 text-teal">3-5 Days</td><td className="p-6">$120 - $160</td></tr>
                <tr><td className="p-6">Sea (Container)</td><td className="p-6 text-gray-500">30-45 Days</td><td className="p-6">$40 - $60</td></tr>
                <tr><td className="p-6">Courier Hybrid</td><td className="p-6 text-navy">7-10 Days</td><td className="p-6">$80 - $100</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gold/10 p-12 rounded-[3rem] border border-gold/20 mb-12 text-center">
            <h4 className="text-xl font-black text-navy mb-4 uppercase tracking-tighter">Download Export Checklist PDF</h4>
            <p className="text-gray-600 mb-8 text-sm">Get our internal 15-point document check to ensure 0% customs delays in 2025.</p>
            <button className="bg-navy text-white font-black py-4 px-10 rounded-xl hover:opacity-90 transition-all text-xs uppercase tracking-widest">Download PDF Checklist</button>
          </div>

          <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white font-black py-5 px-12 rounded-2xl shadow-xl hover:bg-navy transition-all text-lg uppercase tracking-widest w-full sm:w-auto">Get Your Export Quote</button>
        </>
      )
    }
  };

  const post = postsData[postId as keyof typeof postsData];

  return (
    <div className="bg-white min-h-screen">
      {/* Article Navigation */}
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('blog-hub')} className="hover:text-gold transition-colors">Resources</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy uppercase">Article</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-20">
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-gold text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">{post.tag}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.date} • {post.readTime} Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-navy leading-tight mb-10 tracking-tighter">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 py-8 border-y border-gray-100">
            <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center text-white font-black text-xl">SC</div>
            <div>
              <p className="text-sm font-black text-navy uppercase tracking-widest">By {post.author}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Verified Fabric Presentation Specialist</p>
            </div>
            <div className="ml-auto hidden sm:flex gap-3">
               {['ln', 'tw', 'wa'].map(s => <div key={s} className="w-10 h-10 border border-gray-100 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-300 hover:border-gold hover:text-gold cursor-pointer transition-all uppercase">{s}</div>)}
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
          {post.content}
        </div>

        {/* Share Section (Mobile) */}
        <div className="sm:hidden flex items-center justify-center gap-4 py-12 border-t border-gray-100">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-4">Share this guide:</p>
           {['linkedin', 'whatsapp', 'twitter'].map(s => <div key={s} className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[10px] font-black text-navy border border-gray-100 uppercase">{s.slice(0,2)}</div>)}
        </div>

        {/* Related Posts Section */}
        <section className="mt-24 pt-20 border-t border-gray-100">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-12 text-center">Continue Mastering Fabric Sampling</h4>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((p, i) => (
              <button 
                key={i} 
                onClick={() => onNavigate(p.target)} 
                className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 text-left group hover:border-gold transition-all flex flex-col h-full hover:shadow-xl"
              >
                <div className="text-[10px] font-black text-gold uppercase mb-3 group-hover:translate-x-1 transition-transform">{p.tag}</div>
                <h5 className="font-bold text-navy mb-8 leading-snug flex-grow">{p.title}</h5>
                <span className="text-[10px] font-black text-navy uppercase tracking-widest border-b-2 border-navy/10 pb-1 group-hover:border-gold transition-all inline-block">Read Article →</span>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-20 bg-navy p-12 rounded-[3rem] text-center text-white relative overflow-hidden">
          <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight">Ready to Optimize Your Sampling Strategy?</h3>
          <p className="text-gray-400 mb-10 font-medium max-w-xl mx-auto">Get a technical consultation and pricing breakdown tailored to your destination market within 24 hours.</p>
          <button 
            onClick={() => onNavigate('contact-page')}
            className="bg-gold text-navy font-black py-5 px-12 rounded-2xl hover:scale-105 transition-all shadow-2xl uppercase tracking-widest text-xs"
          >
            Start Technical RFQ
          </button>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;