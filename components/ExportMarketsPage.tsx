import React, { useState } from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const ExportMarketsPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { label: "15+ Countries Served" },
    { label: "1000+ Export Orders Fulfilled" },
    { label: "10+ Years Export Experience" },
    { label: "95% International Customer Retention" }
  ];

  const advantages = [
    {
      title: "Cost Advantage",
      icon: "🏷️",
      stat: "40-50% Lower Costs",
      desc: "Competitive manufacturing costs compared to USA/Europe while maintaining premium quality standards"
    },
    {
      title: "Quality Standards",
      icon: "📜",
      stat: "ISO 9001:2015",
      desc: "International quality certifications and export-grade finishing that meets European and American standards"
    },
    {
      title: "Faster Delivery",
      icon: "🚢",
      stat: "15-25 Days to Europe/USA",
      desc: "Strategic Mumbai location enables faster shipping than China (30-45 days) to Western markets"
    },
    {
      title: "English Communication",
      icon: "💬",
      stat: "Fluent English Team",
      desc: "Easy communication, quick email responses, and understanding of international business practices"
    }
  ];

  const documentation = [
    { title: "Commercial Invoice", icon: "📄", desc: "Detailed invoicing for customs clearance" },
    { title: "Packing List", icon: "📦", desc: "Complete itemized packing documentation" },
    { title: "Certificate of Origin", icon: "📜", desc: "Indian origin certification for preferential tariffs" },
    { title: "Shipping Bill", icon: "🚢", desc: "Export declaration documents" },
    { title: "Quality Certificate", icon: "🛡️", desc: "Quality assurance certification" },
    { title: "Custom Documentation", icon: "📂", desc: "Any additional docs required by destination country" }
  ];

  const faqs = [
    { q: "What is your export MOQ?", a: "Standard 50-100 pieces, flexible for samples." },
    { q: "How do I send my fabrics for manufacturing?", a: "We arrange courier pickup or you ship directly to our Mumbai facility." },
    { q: "What export documentation do you provide?", a: "Complete set: commercial invoice, packing list, COO, quality certificate." },
    { q: "Can you handle customs clearance?", a: "We provide all documents; you handle import customs (or we can recommend freight forwarder)." },
    { q: "What if I need urgent delivery?", a: "Express air freight available: 3-7 days to most countries." },
    { q: "Do you provide samples before bulk export order?", a: "Yes, we ship 1-5 samples via DHL/FedEx for quality evaluation." }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 bg-gray-50 overflow-hidden">
        {/* Subtle World Map Pattern Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <pattern id="world-map" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#1a2849" />
            </pattern>
            <rect width="1000" height="1000" fill="url(#world-map)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 leading-tight">
            Exporting Quality Fabric <br /> Presentations Since 2005
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-16 font-medium">
            Serving furniture manufacturers and textile brands in 15+ countries with reliable delivery and complete export documentation.
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <p className="text-navy font-black text-xl md:text-2xl mb-1 group-hover:text-gold transition-colors">{stat.label.split(' ')[0]}</p>
                <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">{stat.label.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Export from India Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-navy text-center mb-16">Why Global Brands Choose Indian Manufacturing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:border-gold transition-all duration-300 group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{adv.icon}</div>
                <p className="text-gold font-black text-xl mb-2">{adv.stat}</p>
                <h4 className="text-navy font-bold text-xl mb-4 leading-tight">{adv.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Europe Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <h2 className="text-3xl font-black text-navy">European Market Expertise</h2>
            <div className="flex gap-2 text-2xl">
              <span>🇮🇹</span><span>🇫🇷</span><span>🇹🇷</span><span>🇩🇪</span><span>🇪🇸</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="aspect-video bg-gray-200 rounded-3xl flex items-center justify-center border border-gray-300 overflow-hidden text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                [European furniture showroom display]
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy mb-4">Serving European Furniture & Textile Brands</h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Over 10 years of export experience to European markets with understanding of EU quality expectations, design preferences, and documentation requirements.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Competitive EUR pricing (€4-8 per unit at MOQ 500+)",
                    "Complete export documentation (Inv, PL, COO)",
                    "Shipping to major ports: Rotterdam, Hamburg, Genoa",
                    "FOB Mumbai or CIF destination port options",
                    "Understanding of European design trends",
                    "Packaging compliant with EU requirements"
                  ].map((b, i) => (
                    <li key={i} className="flex items-start text-sm font-medium text-navy">
                      <span className="text-teal font-black mr-2">✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h5 className="font-black text-gold text-xs uppercase tracking-widest mb-6">Popular Products for EU</h5>
                <ul className="space-y-4 text-sm text-gray-600 font-medium">
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-navy rounded-full mr-3"></span> Hardbound upholstery swatch books (luxury)</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-navy rounded-full mr-3"></span> Large-format curtain albums (A3+)</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-navy rounded-full mr-3"></span> Custom embossed covers with brand logos</li>
                </ul>
                <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Lead Time</p>
                    <p className="text-xs font-bold text-navy">21-28d Production + 15-20d Shipping</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Payment</p>
                    <p className="text-xs font-bold text-navy">T/T, LC, PayPal, Wise</p>
                  </div>
                </div>
              </div>
              <button onClick={() => onNavigate('contact-page')} className="w-full bg-navy text-white font-black py-4 rounded-xl shadow-lg hover:bg-teal transition-all uppercase tracking-widest text-xs">
                Request EU Export Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* USA Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <h2 className="text-3xl font-black text-navy">Cost-Effective Solutions for American Buyers</h2>
            <div className="text-2xl">🇺🇸</div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8 lg:order-2">
              <div className="aspect-video bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200 overflow-hidden text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                [American furniture store display]
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy mb-4">Premium Quality at India Pricing</h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We help American furniture manufacturers and fabric wholesalers reduce sampling costs by 40-50% while maintaining quality standards comparable to domestic suppliers.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "USD pricing: $4-8 per unit (MOQ 500+)",
                    "Direct shipping to LA, NY, Miami ports",
                    "DDP (Delivered Duty Paid) options available",
                    "Time zone-friendly communication (<12h response)",
                    "Scheduled Zoom calls for project discussions",
                    "Sample shipment via DHL/FedEx (3-5 days)"
                  ].map((b, i) => (
                    <li key={i} className="flex items-start text-sm font-medium text-navy">
                      <span className="text-teal font-black mr-2">✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-8 lg:order-1">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h5 className="font-black text-gold text-xs uppercase tracking-widest mb-6">Why USA Brands Choose Us</h5>
                <ul className="space-y-6">
                  <li>
                    <p className="text-navy font-bold text-sm">Cost Savings</p>
                    <p className="text-gray-500 text-xs italic">"$5,000-15,000 saved annually vs domestic manufacturing"</p>
                  </li>
                  <li>
                    <p className="text-navy font-bold text-sm">Quality Match</p>
                    <p className="text-gray-500 text-xs italic">"Comparable to VIP Samples, Harris Sample Book quality"</p>
                  </li>
                  <li>
                    <p className="text-navy font-bold text-sm">Smaller MOQs</p>
                    <p className="text-gray-500 text-xs italic">"50 piece MOQ vs industry standard 500+"</p>
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Shipping Timeline</p>
                    <p className="text-xs font-bold text-navy">21-28d Production | 25-35d Ocean</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Payment</p>
                    <p className="text-xs font-bold text-navy">30% Advance, 70% Before Ship</p>
                  </div>
                </div>
              </div>
              <button onClick={() => onNavigate('contact-page')} className="w-full border-2 border-navy text-navy font-black py-4 rounded-xl shadow-md hover:bg-navy hover:text-white transition-all uppercase tracking-widest text-xs">
                Get USA Pricing Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Middle East Section */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black text-navy">Fast Delivery to GCC Countries</h2>
            <div className="flex gap-2 text-2xl">
              <span>🇦🇪</span><span>🇸🇦</span><span>🇶🇦</span><span>🇴🇲</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="aspect-video bg-gray-200 rounded-3xl flex items-center justify-center border border-gray-300 overflow-hidden text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                [Dubai luxury showroom display]
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy mb-4">Specialized in UAE & Saudi Markets</h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Quick shipping to Dubai and GCC countries with understanding of regional design preferences and quality expectations for luxury furniture and textile markets.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Fastest delivery: 12-18 days to Dubai/Jeddah",
                    "AED/SAR pricing available",
                    "Experience with high-end luxury segment",
                    "Arabic documentation support available",
                    "Regular shipments to Dubai textile markets",
                    "Sharjah and Riyadh distribution networks"
                  ].map((b, i) => (
                    <li key={i} className="flex items-start text-sm font-medium text-navy">
                      <span className="text-teal font-black mr-2">✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h5 className="font-black text-gold text-xs uppercase tracking-widest mb-6">Popular in Middle East</h5>
                <ul className="space-y-4 text-sm text-gray-600 font-medium">
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-navy rounded-full mr-3"></span> Premium hardbound albums with gold accents</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-navy rounded-full mr-3"></span> Large-format curtain books for luxury interiors</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-navy rounded-full mr-3"></span> Custom branded covers with Arabic text options</li>
                </ul>
                <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Shipping Options</p>
                    <p className="text-xs font-bold text-navy">Sea (Jebel Ali): 12-15d | Air: 3-5d</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Terms</p>
                    <p className="text-xs font-bold text-navy">T/T, LC, Trade Credit</p>
                  </div>
                </div>
              </div>
              <button onClick={() => onNavigate('contact-page')} className="w-full bg-[#d4a574] text-white font-black py-4 rounded-xl shadow-lg hover:bg-navy transition-all uppercase tracking-widest text-xs">
                Request Middle East Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Export Documentation Section */}
      <section className="py-24 px-4 bg-navy text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16">Complete Export Support</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {documentation.map((doc, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{doc.icon}</div>
                <h4 className="text-lg font-bold mb-2 leading-tight">{doc.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping & Logistics Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Reliable International Shipping</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Packaging */}
            <div className="space-y-6">
              <div className="aspect-square bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase text-[10px] tracking-widest">
                [Export-grade packaging]
              </div>
              <h4 className="text-xl font-bold text-navy">Export-Grade Packaging</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Shrink-wrapped cartons</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Corner protection</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Moisture-resistant wrapping</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Clear labeling in English</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Pallet packing for large orders</li>
              </ul>
            </div>
            {/* Partners */}
            <div className="space-y-6">
              <div className="aspect-square bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase text-[10px] tracking-widest">
                [Shipping container]
              </div>
              <h4 className="text-xl font-bold text-navy">Trusted Logistics Partners</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Lines: MSC, Maersk, CMA CGM</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Air: DHL, FedEx, Aramex</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Freight forwarding support</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Real-time tracking provided</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal rounded-full mr-3"></span> Insurance options available</li>
              </ul>
            </div>
            {/* Timelines */}
            <div className="space-y-6">
              <div className="aspect-square bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100 text-gray-300 font-bold uppercase text-[10px] tracking-widest">
                [Timeline graphic]
              </div>
              <h4 className="text-xl font-bold text-navy">Transparent Timelines</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li className="flex justify-between"><span>Production</span> <span className="text-navy font-bold">21-28 days</span></li>
                <li className="flex justify-between"><span>Europe</span> <span className="text-navy font-bold">+15-20 days</span></li>
                <li className="flex justify-between"><span>USA</span> <span className="text-navy font-bold">+25-35 days</span></li>
                <li className="flex justify-between"><span>Middle East</span> <span className="text-navy font-bold">+12-18 days</span></li>
                <li className="flex justify-between"><span>Express Air</span> <span className="text-navy font-bold">+3-7 days</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Table Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Export Pricing Comparison</h2>
          <table className="w-full bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden text-sm">
            <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="p-6 text-left">Destination</th>
                <th className="p-6 text-left">Standard Shipping</th>
                <th className="p-6 text-left">Express Air</th>
                <th className="p-6 text-left">Lead Time</th>
                <th className="p-6 text-left">Price Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-navy">
              {[
                { d: "Europe (EU)", s: "$150-300/CBM", e: "$5-8/kg", l: "15-20 days", p: "40% vs USA suppliers" },
                { d: "USA", s: "$200-350/CBM", e: "$6-9/kg", l: "25-35 days", p: "45% vs domestic" },
                { d: "UAE/GCC", s: "$100-200/CBM", e: "$4-6/kg", l: "12-18 days", p: "30% vs Europe" },
                { d: "Asia-Pacific", s: "$80-150/CBM", e: "$3-5/kg", l: "10-15 days", p: "35% vs regional" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-black">{row.d}</td>
                  <td className="p-6 text-gray-600">{row.s}</td>
                  <td className="p-6 text-gray-600">{row.e}</td>
                  <td className="p-6 text-gray-600">{row.l}</td>
                  <td className="p-6 text-teal font-black">{row.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment Terms Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16">Flexible International Payment Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "T/T (Wire Transfer)", d: "Most common for bulk orders. 30% advance, 70% before shipment. No extra fees." },
              { t: "Letter of Credit (LC)", d: "Accepted for orders >$10,000. At sight or usance LC. Preferred for first-time large buyers." },
              { t: "PayPal / Wise", d: "Perfect for sample orders. Instant confirmation. Small transaction fees apply." },
              { t: "Trade Credit", d: "Available for established customers (3+ orders). Net 30-60 days terms based on history." }
            ].map((p, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col h-full hover:border-gold transition-colors">
                <h4 className="font-bold text-navy mb-4 leading-tight">{p.t}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Export FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-navy leading-tight">{faq.q}</span>
                  <span className={`text-gold transform transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-teal py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Ready to Start Your First Export Order?</h2>
          <p className="text-white/80 text-lg mb-12 font-medium">
            Request a custom export quote with shipping costs and timeline tailored to your location.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-navy text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-white hover:text-navy transition-all uppercase tracking-widest text-xs"
            >
              Request Export Quote
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs">
              Download Export Guide PDF
            </button>
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>
    </div>
  );
};

export default ExportMarketsPage;