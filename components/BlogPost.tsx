import React from 'react';
import { ViewState } from '../App';

interface Props {
  postId: number;
  onNavigate: (view: ViewState) => void;
}

const BlogPost: React.FC<Props> = ({ postId, onNavigate }) => {
  // Related Posts Logic
  const getRelatedPosts = (currentId: number) => {
    const allPosts = [
      { id: 1, target: 'blog-post-1' as ViewState, title: "Fabric Swatch Format Selection" },
      { id: 2, target: 'blog-post-2' as ViewState, title: "Global MOQ Pricing Guide" },
      { id: 3, target: 'blog-post-3' as ViewState, title: "Waterfall Card Advantages" },
      { id: 4, target: 'blog-post-4' as ViewState, title: "Export Documentation Checklist" }
    ];
    return allPosts.filter(p => p.id !== currentId).slice(0, 3);
  };

  const related = getRelatedPosts(postId);

  const posts = {
    1: {
      tag: "Strategy",
      readTime: "12 min",
      date: "Jan 22, 2025",
      title: "How to Choose the Right Fabric Swatch Format for Your Export Business",
      author: "SwatchCraft Editorial",
      content: (
        <>
          <p className="text-xl font-bold text-navy/80 leading-relaxed mb-10">
            For global fabric exporters, the physical sample is the most powerful sales tool in the arsenal. However, many brands struggle with presentation formats that are either too bulky to ship or too flimsy to impress. Choosing the right format is not just about aesthetics—it's a critical logistics and sales decision.
          </p>
          
          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 1: Traditional Swatch Books vs. Waterfall Cards</h2>
          <p className="mb-8 leading-relaxed">
            Traditional hardbound swatch books have long been the industry standard for permanent showroom displays. However, as the industry moves towards faster sampling and lower shipping weights, the Waterfall Swatch Card has emerged as the exporter's preferred format.
          </p>
          
          <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-12">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="p-6">Feature</th>
                  <th className="p-6">Swatch Books</th>
                  <th className="p-6">Waterfall Cards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-navy">
                <tr><td className="p-6">Unit Cost</td><td className="p-6 text-gray-500">₹85 - ₹110</td><td className="p-6 text-teal">₹60 - ₹80</td></tr>
                <tr><td className="p-6">Production Time</td><td className="p-6 text-gray-500">24-30 Days</td><td className="p-6 text-teal">15-21 Days</td></tr>
                <tr><td className="p-6">Samples Shown</td><td className="p-6 text-gray-500">20-40 (Page-based)</td><td className="p-6 text-teal">40-60 (Instant view)</td></tr>
                <tr><td className="p-6">Portability</td><td className="p-6 text-gray-500">Heavy / Bulk</td><td className="p-6 text-teal">Lightweight / Flat</td></tr>
              </tbody>
            </table>
          </div>

          <blockquote className="border-l-8 border-gold bg-gold/5 p-10 rounded-3xl italic text-gray-600 mb-12">
            "We switched our entire European collection to waterfall cards last season. Not only did we save 30% on air freight, but we also doubled our repeat order rate as buyers found the format much easier to store in their project folders."
            <footer className="mt-4 text-navy font-black not-italic uppercase tracking-widest text-[10px]">— Head of Export, Premium Textiles India</footer>
          </blockquote>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 2: MOQ & Pricing Tiers</h2>
          <p className="mb-8">Volume significantly impacts the per-unit cost of sampling. For a startup brand, a 100-piece MOQ is accessible, but larger exporters should aim for 500+ pieces to leverage significant economies of scale.</p>
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h4 className="font-bold text-navy mb-2">100 Piece MOQ</h4>
              <p className="text-sm text-gray-500">Higher overhead per unit. Best for limited edition launches or market testing.</p>
            </div>
            <div className="bg-teal/5 p-8 rounded-3xl border border-teal/10">
              <h4 className="font-bold text-teal mb-2">500+ Piece Tier</h4>
              <p className="text-sm text-navy font-bold">"Save 25% per unit compared to base MOQ. Optimized for international shipping containers."</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 3: Production Timeline Comparison</h2>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-12">
            <h4 className="text-xs font-black text-gold uppercase mb-6 tracking-widest">Global Delivery Timeline (Standard Order)</h4>
            <div className="space-y-4">
               {[
                 { region: "India (SwatchCraft)", time: "15 Days", status: "Competitive Advantage" },
                 { region: "USA (Domestic)", time: "25 Days", status: "Premium Service" },
                 { region: "China (Export)", time: "45 Days", status: "Logistics Delay" }
               ].map((r, i) => (
                 <div key={i} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
                   <span className="font-bold text-navy">{r.region}</span>
                   <span className="font-black text-teal">{r.time}</span>
                   <span className="text-[10px] font-black uppercase text-gray-400">{r.status}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-navy p-12 rounded-[3rem] border border-white/10 mb-12">
            <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Case Study: European Importer's Success</h4>
            <p className="text-gray-400 leading-relaxed font-medium">
              A German importer required 500 samples in 15 days to coincide with a major upholstery contract pitch. SwatchCraft's rapid 15-day manufacturing and express air freight captured 3 new wholesale accounts that had previously rejected bulky traditional catalogs from competitors.
            </p>
          </div>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 5: Waterfall Format Deep Dive</h2>
          <p className="mb-8">Waterfall cards allow for a tiered arrangement where only 1-inch of each fabric is shown in a cascade. This psychology works because it provides the full color story in a single glance without overwhelming the buyer. Data shows that customers choosing waterfall formats see a 50-60% repeat order rate compared to just 30-40% for traditional formats.</p>

          <button onClick={() => onNavigate('product-waterfall')} className="bg-gold text-navy font-black py-4 px-10 rounded-xl hover:scale-105 transition-all uppercase tracking-widest text-xs mb-10">Explore Waterfall Cards</button>
        </>
      )
    },
    2: {
      tag: "Pricing",
      readTime: "15 min",
      date: "Jan 20, 2025",
      title: "The Complete Guide to MOQ Pricing: India vs China vs USA (2025)",
      author: "Market Analysis Team",
      content: (
        <>
          <p className="text-xl font-bold text-navy/80 leading-relaxed mb-10">
            For 2025, the global textile industry is recalibrating. As buyers move away from the massive MOQs of China and the high premiums of the USA, India has occupied the 'Sweet Spot' of B2B manufacturing.
          </p>
          
          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 1: What is MOQ and Why It Matters</h2>
          <p className="mb-8">Minimum Order Quantity (MOQ) is the lowest number of units a manufacturer will produce. In fabric sampling, MOQs dictate your scalability. Higher volume allows the manufacturer to distribute setup costs across more units, lowering your per-sample investment.</p>
          
          <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-12">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                <tr><th className="p-6">Quantity</th><th className="p-6">Avg Cost/Unit (India)</th><th className="p-6">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-navy">
                <tr><td className="p-6">1 Piece</td><td className="p-6">₹300 - ₹500</td><td className="p-6 text-gray-400 italic">Prototype only</td></tr>
                <tr><td className="p-6">50 Pieces</td><td className="p-6">₹85 - ₹100</td><td className="p-6 text-gray-400 italic">Market entry</td></tr>
                <tr><td className="p-6">100 Pieces</td><td className="p-6">₹75 - ₹90</td><td className="p-6 text-gray-400 italic">Standard launch</td></tr>
                <tr className="bg-gold/10"><td className="p-6 text-gold">500+ Pieces</td><td className="p-6 text-gold">₹60 - ₹80</td><td className="p-6 text-gold font-black italic">Profit Margin Maxed</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 2: China Pricing Reality</h2>
          <p className="mb-8">While China often offers prices as low as $0.85 per unit, the hidden costs—45-day sea freight, quality variation, and 1,000+ MOQ requirements—frequently negate the initial savings. Our research shows a price vs. quality matrix where China scores high on price but low on reliability for premium brands.</p>

          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 3: USA Market Premium</h2>
          <p className="mb-8">Manufacturers like VIP Samples in the USA charge between $5 and $15 per unit. This premium covers domestic labor and high service levels but is often unsustainable for international wholesale distribution. India's Sweet Spot positioning offers $1.14 per unit quality that matches the USA at 1/10th the cost.</p>

          <div className="bg-teal/5 p-12 rounded-[3rem] border border-teal/10 mb-12 text-center">
            <h4 className="text-2xl font-black text-navy mb-4 uppercase tracking-tighter">Interactive ROI Analysis</h4>
            <div className="grid grid-cols-2 gap-10">
               <div><p className="text-[10px] font-black text-gray-400 mb-2 uppercase">Order: 100 Units</p><p className="text-3xl font-black text-navy">₹9,000 Total</p><p className="text-[10px] text-gray-500 mt-2 font-bold">Reach: 100 Buyers</p></div>
               <div><p className="text-[10px] font-black text-teal mb-2 uppercase">Order: 500 Units</p><p className="text-3xl font-black text-teal">₹35,000 Total</p><p className="text-[10px] text-teal/60 mt-2 font-bold">Reach: 500 Buyers (22% Savings/Unit)</p></div>
            </div>
          </div>
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
              In 2025, the most successful fabric exporters aren't carrying heavy books—they're carrying waterfall cards. This format has taken over European and American trade shows for a simple reason: impact.
            </p>
            
            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 1: The Waterfall Advantage</h2>
            <div className="grid grid-cols-2 gap-12 mb-12">
               <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-bold uppercase text-[9px] text-center px-4">[Visual: Bulky Traditional Book]</div>
                  <p className="text-xs text-gray-500 font-bold">Traditional: Hidden samples, heavy binding, 1-per-page.</p>
               </div>
               <div className="space-y-4">
                  <div className="aspect-square bg-teal/5 border border-teal/10 rounded-2xl flex items-center justify-center text-teal font-bold uppercase text-[9px] text-center px-4">[Visual: Streamlined Waterfall Card]</div>
                  <p className="text-xs text-teal font-bold">Waterfall: Instant color spectrum, 40% more visible samples.</p>
               </div>
            </div>

            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 2: Production Efficiency</h2>
            <p className="mb-8">Waterfall cards require no manual binding labor, which drastically reduces production costs and lead times. By eliminating the spine and hard-cover assembly, we can deliver orders 7-10 days faster than traditional books.</p>

            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 4: Use Cases by Customer</h2>
            <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-12">
               <table className="w-full text-left text-sm">
                 <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                   <tr><th className="p-6">Customer Type</th><th className="p-6">Recommended Format</th></tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 font-bold text-navy">
                   <tr><td className="p-6">Sales Reps</td><td className="p-6">Hanger Card (Ultra-portable)</td></tr>
                   <tr><td className="p-6">Showrooms</td><td className="p-6">Bi-fold Waterfall (Permanent)</td></tr>
                   <tr><td className="p-6">Trade Shows</td><td className="p-6">Tri-fold Storyboard (Impact)</td></tr>
                 </tbody>
               </table>
            </div>
            
            <blockquote className="border-l-8 border-teal bg-teal/5 p-10 rounded-3xl italic text-gray-600 mb-12">
              "Our trade show booth finally stands out. The waterfall cards allow buyers to take a full collection color story home in their laptop bag. Our repeat order rate jumped from 35% to 58%."
            </blockquote>
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
              For new Indian exporters, international logistics is the biggest hurdle. A missing document can result in samples being stuck in customs for weeks, killing your collection launch.
            </p>
            
            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 1: Documentation Requirements</h2>
            <ul className="space-y-4 mb-12">
               {[
                 { t: "Commercial Invoice", d: "Detailed customs value declaration per sample type." },
                 { t: "Certificate of Origin", d: "Crucial for EU tariff benefits under Indian origin schemes." },
                 { t: "Phytosanitary Certificate", d: "Required for certain natural jute or cotton fibers in some countries." },
                 { t: "GST/IGST Invoice", d: "Essential for claiming Indian export credits." }
               ].map((item, i) => (
                 <li key={i} className="flex gap-6 items-start bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <span className="text-teal font-black text-xl">0{i+1}</span>
                    <div><h5 className="font-bold text-navy">{item.t}</h5><p className="text-xs text-gray-500">{item.d}</p></div>
                 </li>
               ))}
            </ul>

            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 2: Packaging Standards</h2>
            <p className="mb-8">For 45-day ocean freight, 4-ply minimum corrugated boxes are required. Interior moisture protection using silica gel and shrink wrapping is non-negotiable. Optimizing packaging density can save between ₹50-100 per shipment in volumetric weight charges via DHL/FedEx.</p>

            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 pt-6">Section 3: Shipping Options Matrix</h2>
            <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-12">
               <table className="w-full text-left text-sm">
                 <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-widest">
                   <tr><th className="p-6">Method</th><th className="p-6">Speed</th><th className="p-6">Cost/kg</th></tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 font-bold text-navy">
                   <tr><td className="p-6">Air (Express)</td><td className="p-6 text-teal">3-5 Days</td><td className="p-6">$50 - $80</td></tr>
                   <tr><td className="p-6">Courier Hybrid</td><td className="p-6 text-navy">7-10 Days</td><td className="p-6">$30 - $60</td></tr>
                   <tr><td className="p-6">Sea (Container)</td><td className="p-6 text-red-500">30-45 Days</td><td className="p-6">$200 (Flat 20kg)</td></tr>
                 </tbody>
               </table>
            </div>

            <div className="bg-gold/5 p-12 rounded-[3rem] border border-gold/10 text-center">
              <h4 className="text-xl font-black text-navy mb-4 uppercase tracking-tighter">Download Export Checklist PDF</h4>
              <p className="text-gray-600 mb-8 text-sm">Get our internal 15-point document check to ensure 0% customs delays.</p>
              <button className="bg-navy text-white font-black py-4 px-10 rounded-xl hover:bg-gold transition-all text-xs uppercase tracking-widest">Download PDF Guide</button>
            </div>
          </>
        )
    }
  };

  const post = posts[postId as keyof typeof posts];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('blog-hub')} className="hover:text-gold transition-colors">Resources</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Article</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-20">
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-gold text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{post.tag}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.date} • {post.readTime} Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-navy leading-tight mb-10 tracking-tighter">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 py-8 border-y border-gray-100">
            <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center text-white font-black">SC</div>
            <div>
              <p className="text-sm font-black text-navy uppercase tracking-widest">Authored by {post.author}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Certified Sampling Specialists</p>
            </div>
            <div className="ml-auto flex gap-2">
               {['li', 'tw', 'wa'].map(s => <div key={s} className="w-10 h-10 border border-gray-100 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-300 hover:border-gold hover:text-gold cursor-pointer transition-all uppercase">{s}</div>)}
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
          {post.content}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-navy p-12 rounded-[3rem] text-center text-white relative overflow-hidden">
          <h3 className="text-2xl md:text-3xl font-black mb-6">Ready to Optimize Your Sampling Strategy?</h3>
          <p className="text-gray-400 mb-10 font-medium max-w-xl mx-auto">Get a technical consultation and pricing breakdown for your destination market within 24 hours.</p>
          <button 
            onClick={() => onNavigate('contact-page')}
            className="bg-gold text-navy font-black py-5 px-12 rounded-2xl hover:scale-105 transition-all shadow-2xl uppercase tracking-widest text-xs"
          >
            Schedule Consultation
          </button>
        </div>

        {/* Related Posts */}
        <section className="mt-24 pt-20 border-t border-gray-100">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10 text-center">Continue Reading</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <button 
                key={i} 
                onClick={() => onNavigate(p.target)} 
                className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 text-left group hover:border-gold transition-all flex flex-col h-full"
              >
                <h5 className="font-bold text-navy mb-4 flex-grow">{p.title}</h5>
                <span className="text-[10px] font-black text-navy uppercase tracking-widest border-b-2 border-navy/10 pb-1 group-hover:border-gold transition-all inline-block">Read Article →</span>
              </button>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogPost;