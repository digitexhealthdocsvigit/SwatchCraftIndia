import React from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const GoogleBusinessProfile: React.FC<Props> = ({ onNavigate }) => {
  const sections = [
    {
      id: "company-overview",
      title: "Company Overview (GBP Description)",
      copy: "SwatchCraft India is Mumbai’s premier B2B fabric swatch manufacturer, serving global textile exporters, interior designers, and wholesale buyers. With over 10 years of manufacturing excellence, we bridge the gap between Indian quality and global presentation standards. Our primary competitive advantage is speed: while international competitors quote 45-60 day turnarounds, SwatchCraft delivers premium, export-ready samples in just 15-20 days. \n\nWe are India’s pioneer in Waterfall Swatch Card manufacturing, a format that displays 40% more fabric in a compact, air-freight friendly cascade. Our diverse range includes hardbound upholstery swatch books, large-format curtain albums, and portable ring swatch sets. We offer tiered MOQ pricing (₹70-120 per unit), ensuring value for both boutique designer launches and mass-market export requirements. SwatchCraft handles complete export documentation and logistics for EU and USA compliance, providing a seamless white-label experience for your brand. Visit our Sector 12, Andheri East showroom or request a custom quote via WhatsApp for 24-hour turnaround on your RFQ."
    },
    {
      id: "services",
      title: "Services List",
      items: [
        { 
          name: "FABRIC SWATCH BOOKS (Custom Design)", 
          desc: "Complete end-to-end manufacturing of hardbound and ring-bound fabric sample albums. Includes custom cover embossing, professional fabric code labeling, and ISO-standard quality checks. MOQ: 100+ units. Lead time: 2-4 weeks. Best for furniture showrooms and textile mill presentations."
        },
        { 
          name: "WATERFALL SWATCH CARDS (Exclusive)", 
          desc: "Innovative cascading fabric displays unique to the Indian market. Displays 40% more samples than traditional formats at the same cost. Premium positioning for fabric exporters aiming for European and USA markets. Compact, lightweight, and high-impact. Lead time: 2-3 weeks."
        },
        { 
          name: "EXPORT LOGISTICS & DOCUMENTATION", 
          desc: "Comprehensive support for international fabric exporters. Includes custom export-grade packaging for moisture protection, commercial invoicing, Certificate of Origin (COO), and DHL/FedEx coordination for EU/USA compliance. We handle the complexity of B2B sample shipping."
        }
      ]
    },
    {
      id: "posts",
      title: "12-Month Post Calendar",
      items: [
        "JAN: 📢 New Waterfall Format Alert! Now available: Waterfall Tri-fold cards with 40-50 fabric samples. Perfect for trade shows. 15-day delivery. Contact for samples!",
        "FEB: 💡 MOQ Pricing Tip: Ordering 500+ units? You save 25% per unit + free custom branding. Get your volume quote today.",
        "MAR: ✈️ Export-Ready: All our swatch books meet EU & USA import standards. Packaged professionally. Documentation support included.",
        "APR: 🎯 Case Study: European importer increased repeat orders by 58% after switching to our waterfall format. Success story inside!",
        "MAY: ⏰ Speed Update: Our 15-20 day delivery beats China's 45 days. Waterfall format ready in 2-3 weeks.",
        "JUN: 🏆 Award: SwatchCraft recognized as India's premier fabric swatch innovator. First waterfall format manufacturer in India!",
        "JUL: 📚 Blog Post: Complete MOQ Pricing Guide - India vs China vs USA. What you need to know for profitability.",
        "AUG: 🎨 Design Tip: Professional swatch presentation increases customer confidence by 40%. Waterfall format = instant upgrade.",
        "SEP: 📦 Packaging Excellence: Our export packaging optimized for moisture protection. International standards compliant.",
        "OCT: 🌍 New Market: Now shipping to 12+ countries. Your fabric samples, professionally presented, on time, every time.",
        "NOV: 💰 Bulk Discount Alert: Orders over 2000 units qualify for additional 15% discount. Contact sales team.",
        "DEC: 🤝 Partnership Opportunity: White-label manufacturing available. Custom branding, your logo, our excellence."
      ]
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-12 border-b border-gray-100 pb-8">
          <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 inline-block bg-gray-50 px-4 py-2 rounded-full">Internal Marketing Resource</span>
          <h1 className="text-4xl font-black text-navy uppercase tracking-tighter">GBP Content Strategy 2025</h1>
          <p className="text-gray-500 mt-4 font-medium italic">Use this page to set up and manage your SwatchCraft India Google Business Profile.</p>
        </header>

        <div className="space-y-16">
          {sections.map((section) => (
            <section key={section.id} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-xl font-black text-navy uppercase tracking-widest">{section.title}</h2>
                {section.copy && (
                  <button 
                    onClick={() => handleCopy(section.copy || "")}
                    className="text-[10px] font-black text-teal uppercase tracking-widest hover:underline"
                  >
                    Copy All
                  </button>
                )}
              </div>

              {section.copy && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200 text-sm leading-relaxed text-gray-600 font-medium whitespace-pre-wrap">
                  {section.copy}
                </div>
              )}

              {section.items && (
                <div className="space-y-4">
                  {section.items.map((item: any, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-navy uppercase text-sm">{typeof item === 'string' ? item.split(':')[0] : item.name}</h4>
                        <button 
                          onClick={() => handleCopy(typeof item === 'string' ? item : `${item.name}\n${item.desc}`)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-black text-gold uppercase"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {typeof item === 'string' ? item.split(':').slice(1).join(':') : item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          <section className="bg-navy p-10 rounded-[3rem] text-white">
            <h2 className="text-xl font-black mb-8 uppercase tracking-widest text-gold border-b border-white/10 pb-4">Required Photo Assets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Waterfall Fanned Out', 'Upholstery Book Detail', 'Team at Work', 'Export Packaging', 'Office Entrance', 'Fabric Macro Shot', 'Full Lineup', 'ISO Certificate Display'].map((ph, i) => (
                <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-white/50">{ph}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-gray-400 italic">Tip: Upload 1-2 new photos every month to maintain "Active" status on Google Maps.</p>
          </section>
        </div>

        <footer className="mt-20 text-center">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-navy text-white px-12 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl"
          >
            Back to Website
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GoogleBusinessProfile;