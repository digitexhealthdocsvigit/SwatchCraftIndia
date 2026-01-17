import React from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const GoogleBusinessProfile: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-12 border-b border-gray-100 pb-8 text-center">
          <span className="bg-navy text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest mb-4 inline-block shadow-lg">Internal Marketing Resource</span>
          <h1 className="text-4xl md:text-5xl font-black text-navy leading-tight uppercase tracking-tighter">GBP Content Strategy 2025</h1>
          <p className="text-gray-400 mt-4 font-bold uppercase tracking-widest text-xs">Targeting: "Fabric sample supplier India" | "Custom swatch books Mumbai"</p>
        </header>

        <section className="space-y-16">
          {/* Company Overview */}
          <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <h2 className="text-xl font-black text-navy mb-6 uppercase tracking-widest border-b border-navy/10 pb-4 flex justify-between">
               Company Overview (250 Words)
               <span className="text-gold text-[10px]">Google Business Description</span>
            </h2>
            <div className="prose prose-sm text-gray-600 leading-relaxed font-medium bg-white p-8 rounded-2xl border border-gray-100">
               SwatchCraft India is Mumbai’s premier B2B fabric swatch manufacturer, serving global textile exporters, interior designers, and wholesale buyers. With over 10 years of manufacturing excellence, we bridge the gap between Indian quality and global presentation standards. 
               <br/><br/>
               Our primary competitive advantage is speed: while international competitors often quote 45-60 day turnarounds, SwatchCraft delivers premium, export-ready samples in just 15-20 days. We are India’s pioneer in Waterfall Swatch Card manufacturing, a format that displays 40% more fabric in a compact, lightweight design optimized for international air freight. 
               <br/><br/>
               Our diverse range includes hardbound upholstery swatch books, large-format curtain albums, and portable ring swatch sets. We offer tiered MOQ pricing ranging from ₹70-120 per unit, ensuring value for both boutique designer launches and mass-market export requirements. SwatchCraft handles complete export documentation and logistics for EU and USA compliance, providing a seamless white-label experience for your brand. 
               <br/><br/>
               Trusted by brands across Italy, Germany, and the United States, our Mumbai facility is equipped for high-precision binding, professional labeling, and zero-defect quality control. Visit our Sector 12, Andheri East showroom or request a custom quote via WhatsApp for 24-hour turnaround on your RFQ.
            </div>
            <button className="mt-6 text-[10px] font-black text-teal uppercase tracking-widest hover:underline" onClick={() => {navigator.clipboard.writeText('SwatchCraft India is Mumbai’s premier B2B fabric swatch manufacturer...')}}>Copy to Clipboard</button>
          </div>

          {/* Services Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-navy uppercase tracking-tighter">Services List (Search Optimized)</h2>
            <div className="grid gap-6">
               {[
                 { 
                   name: "FABRIC SWATCH BOOKS (Custom Design)", 
                   desc: "Complete end-to-end manufacturing of hardbound and ring-bound fabric sample albums. Features include custom cover embossing, professional fabric code labeling, and ISO-standard quality checks. MOQ: 100+ units. Lead time: 2-4 weeks. Best for furniture showrooms and textile mill presentations."
                 },
                 { 
                   name: "WATERFALL SWATCH CARDS (Exclusive)", 
                   desc: "Innovative cascading fabric displays unique to the Indian market. Displays 40% more samples than traditional formats at the same cost. Premium positioning for fabric exporters aiming for European and USA markets. Compact, lightweight, and high-impact. Lead time: 2-3 weeks."
                 },
                 { 
                   name: "EXPORT LOGISTICS & DOCUMENTATION", 
                   desc: "Comprehensive support for international fabric exporters. Includes custom export-grade packaging for moisture protection, commercial invoicing, Certificate of Origin (COO), and DHL/FedEx coordination for EU/USA compliance. We handle the complexity of B2B sample shipping."
                 }
               ].map((s, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h4 className="font-black text-navy text-sm mb-2 uppercase tracking-widest text-gold">{s.name}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{s.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Posts Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-navy uppercase tracking-tighter">12-Month Content Calendar (Posts)</h2>
            <div className="bg-navy text-white p-10 rounded-[3rem] shadow-xl">
               <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { m: "JAN", t: "📢 New Waterfall Format Alert!", c: "Waterfall Tri-fold cards with 40-50 fabric samples. Perfect for trade shows. 15-day delivery." },
                    { m: "FEB", t: "💡 MOQ Pricing Tip", c: "Ordering 500+ units? You save 25% per unit + free custom branding. Get your volume quote today." },
                    { m: "MAR", t: "✈️ Export-Ready Compliance", c: "Our swatch books meet EU & USA standards. Professional packaging + documentation support included." },
                    { m: "APR", t: "🎯 Case Study: Sales Boost", c: "European importer increased repeat orders by 58% after switching to our waterfall format." },
                    { m: "MAY", t: "⏰ Speed Advantage", c: "15-20 day delivery beats China's 45 days. Rapid prototyping for seasonal fabric collections." },
                    { m: "JUN", t: "🏆 Industry Recognition", c: "SwatchCraft recognized as India's premier fabric swatch innovator. First waterfall format manufacturer!" }
                  ].map((p, i) => (
                    <div key={i} className="border-b border-white/10 pb-4 last:border-0">
                       <span className="text-gold font-black text-[10px] uppercase mb-1 block">{p.m}</span>
                       <h5 className="font-bold text-sm mb-1 leading-tight">{p.t}</h5>
                       <p className="text-[10px] text-gray-400 leading-relaxed italic">"{p.c}"</p>
                    </div>
                  ))}
               </div>
               <p className="mt-10 text-center text-gold/50 text-[10px] font-bold uppercase tracking-widest italic">Repeat cycle or rotate with customer project photos for months 7-12</p>
            </div>
          </div>

          {/* Photo Guidelines */}
          <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
             <h2 className="text-xl font-black text-navy mb-8 uppercase tracking-widest">Required Photo Assets</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Waterfall Fanned Out', 'Upholstery Book Detail', 'Team at Work', 'Export Packaging', 'Production Floor', 'Fabric Macro Shot', 'Office Entrance', 'Full Product Lineup'].map((ph, i) => (
                  <div key={i} className="aspect-square bg-white border border-gray-200 rounded-2xl flex items-center justify-center p-4 text-center group hover:border-gold transition-colors">
                     <span className="text-[10px] font-black text-gray-300 group-hover:text-gold uppercase tracking-tighter leading-tight">{ph}</span>
                  </div>
                ))}
             </div>
             <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">Shoot in 4:3 Aspect Ratio | Natural Light | Clean Backgrounds</p>
          </div>

          {/* Business Hours */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between py-10 border-y border-gray-100">
             <div>
                <h3 className="font-black text-navy text-xl uppercase tracking-tighter mb-2">Business Hours</h3>
                <p className="text-sm text-gray-500 font-medium">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                <p className="text-sm text-gray-500 font-medium">Sat: 10:00 AM - 4:00 PM IST | Sun: Closed</p>
             </div>
             <div className="flex flex-wrap gap-2 justify-center">
                {['Consultations', 'Free Quotes', 'Online Orders', 'On-Site Pickup', 'Fast Service', 'ISO 9001'].map(a => (
                  <span key={a} className="bg-teal/10 text-teal text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">{a}</span>
                ))}
             </div>
          </div>
        </section>

        <footer className="mt-20 text-center">
           <button onClick={() => onNavigate('home')} className="bg-navy text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all">Back to Dashboard</button>
        </footer>
      </div>
    </div>
  );
};

export default GoogleBusinessProfile;