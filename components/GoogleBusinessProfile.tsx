import React from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const GoogleBusinessProfile: React.FC<Props> = ({ onNavigate }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard! You can now paste this into your Google Business Manager.');
  };

  const products = [
    { n: "Upholstery Swatch Books", d: "Professional upholstery fabric sample books with 20-40 custom-selected fabrics. MOQ: 100 units, ₹70-100/unit. 2-3 week production. Perfect for furniture showrooms and exporters. Custom branding available." },
    { n: "Curtain Sample Albums", d: "Premium curtain and drapery sample albums with 40-60 fabrics per unit. MOQ: 100 units, ₹100-140/unit. Professional binding, ideal for interior designers and luxury brands. Export-ready quality." },
    { n: "Waterfall Bi-fold Cards", d: "Innovative waterfall format showing 20-30 samples in cascading design. Compact, professional, 40% more samples than traditional books. MOQ: 100 units, ₹80-120/unit. Unique to India market." },
    { n: "Waterfall Tri-fold Cards", d: "Premium tri-fold waterfall format with 40-50 samples. Perfect for trade shows and luxury clients. MOQ: 100 units, ₹100-150/unit. Portable, professional, impressive." },
    { n: "Fabric Hanger Swatches", d: "Portable hanger-card format with 8-12 fabrics. MOQ: 100 units, ₹18-40/unit. Ideal for sales reps and retail displays. Budget-friendly professional presentation." },
    { n: "Custom Swatch Solutions", d: "Tailored swatch solutions for unique requirements. White-label available. Custom sizing, formats, branding. Contact for custom quote. No MOQ for custom projects." }
  ];

  const posts = [
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
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 border-b border-gray-100 pb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-navy text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Internal Resource</span>
            <span className="text-gray-400 font-bold text-xs uppercase">Marketing Dashboard 2025</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-navy leading-tight tracking-tighter mb-4">
            Google Business <span className="text-gold">Profile Strategy</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">Content optimized for: "fabric sample supplier India" | "custom swatch books Mumbai"</p>
        </header>

        <div className="grid gap-20">
          {/* Company Overview Section */}
          <section className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 relative group">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-navy uppercase tracking-widest border-l-4 border-gold pl-6">Google Business Description</h2>
              <button 
                onClick={() => copyToClipboard('SwatchCraft India is Mumbai’s premier B2B fabric swatch manufacturer, serving global textile exporters, interior designers, and wholesale buyers. With over 10 years of manufacturing excellence, we bridge the gap between Indian quality and global presentation standards. Our primary competitive advantage is speed: while international competitors quote 45-60 day turnarounds, SwatchCraft delivers premium, export-ready samples in just 15-20 days. We are India’s pioneer in Waterfall Swatch Card manufacturing, a format that displays 40% more fabric in a compact, air-freight friendly cascade. Our diverse range includes hardbound upholstery swatch books, large-format curtain albums, and portable ring swatch sets. We offer tiered MOQ pricing (₹70-120 per unit), ensuring value for both boutique designer launches and mass-market export requirements. SwatchCraft handles complete export documentation and logistics for EU and USA compliance, providing a seamless white-label experience for your brand. Visit our Sector 12, Andheri East showroom or request a custom quote via WhatsApp for 24-hour turnaround on your RFQ.')}
                className="text-[10px] font-black text-teal uppercase tracking-widest hover:underline"
              >
                Copy All (250 Words)
              </button>
            </div>
            <div className="prose prose-sm text-gray-600 leading-relaxed font-medium bg-white p-8 rounded-2xl border border-gray-200">
               SwatchCraft India is Mumbai’s premier B2B fabric swatch manufacturer, serving global textile exporters, interior designers, and wholesale buyers. With over 10 years of manufacturing excellence, we bridge the gap between Indian quality and global presentation standards. Our primary competitive advantage is speed: while international competitors quote 45-60 day turnarounds, SwatchCraft delivers premium, export-ready samples in just 15-20 days. 
               <br/><br/>
               We are India’s pioneer in Waterfall Swatch Card manufacturing, a format that displays 40% more fabric in a compact, air-freight friendly cascade. Our diverse range includes hardbound upholstery swatch books, large-format curtain albums, and portable ring swatch sets. We offer tiered MOQ pricing (₹70-120 per unit), ensuring value for both boutique designer launches and mass-market export requirements. SwatchCraft handles complete export documentation and logistics for EU and USA compliance, providing a seamless white-label experience for your brand. Visit our Sector 12, Andheri East showroom or request a custom quote via WhatsApp for 24-hour turnaround on your RFQ.
            </div>
          </section>

          {/* Posts Calendar */}
          <section>
            <h2 className="text-2xl font-black text-navy uppercase tracking-widest border-l-4 border-gold pl-6 mb-8">12-Month Content Calendar</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {posts.map((post, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start group">
                  <p className="text-gray-500 text-xs font-medium pr-4 leading-relaxed">{post}</p>
                  <button onClick={() => copyToClipboard(post)} className="text-[9px] font-black text-gold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Copy</button>
                </div>
              ))}
            </div>
          </section>

          {/* Product Descriptions */}
          <section>
            <h2 className="text-2xl font-black text-navy uppercase tracking-widest border-l-4 border-gold pl-6 mb-8">Product Catalog Content</h2>
            <div className="space-y-4">
              {products.map((p, i) => (
                <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 group">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-navy uppercase tracking-widest text-sm">{p.n}</h4>
                    <button onClick={() => copyToClipboard(`${p.n}: ${p.d}`)} className="text-[10px] font-black text-teal uppercase opacity-0 group-hover:opacity-100 transition-opacity">Copy Description</button>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Attributes & Hours */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy text-white p-10 rounded-[3rem]">
              <h3 className="text-gold font-black uppercase tracking-widest text-xs mb-6">Business Attributes</h3>
              <ul className="grid grid-cols-2 gap-4">
                {['Supports local businesses', 'Offers consultations', 'Offers free quotes', 'Accepts online orders', 'Accepts phone orders', 'Offers delivery', 'LGBTQ-friendly', 'Fast service'].map(a => (
                  <li key={a} className="flex items-center text-[10px] font-bold uppercase"><span className="text-gold mr-2">✓</span> {a}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
              <h3 className="text-navy font-black uppercase tracking-widest text-xs mb-6">Business Hours (IST)</h3>
              <ul className="space-y-2 text-xs font-bold text-gray-500 uppercase">
                <li className="flex justify-between"><span>Monday-Friday</span> <span className="text-navy font-black">9:00 AM - 6:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span className="text-navy font-black">10:00 AM - 4:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span className="text-red-500">Closed</span></li>
              </ul>
              <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-[9px] font-black text-gold uppercase mb-1">Status Alert</p>
                <p className="text-[10px] text-gray-400 font-medium leading-tight">Hours inclusive of online consultations via WhatsApp. Availability for EU/USA time zone calls by appointment.</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-20 text-center">
           <button onClick={() => onNavigate('home')} className="bg-navy text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all">Back to Dashboard</button>
        </footer>
      </div>
    </div>
  );
};

export default GoogleBusinessProfile;