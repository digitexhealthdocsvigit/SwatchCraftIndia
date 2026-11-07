import React from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const AboutPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-[#f9fafb] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-[#8B6F47] font-black uppercase tracking-[0.3em] text-[11px] mb-4 inline-block bg-white px-4 py-2 rounded-full shadow-sm">Established 2011</span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1e3a5f] mb-6 tracking-tighter leading-none uppercase">
            Heritage Meets <br/> Fabric Innovation
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Centralised engineering, specialized OEM manufacturing partner network, and rigorous quality inspection coordinated from Thane Bhiwandi, PIN: 421302, Maharashtra, India.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid)" />
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e3a5f" strokeWidth="0.5"/>
              </pattern>
            </defs>
          </svg>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg text-gray-700 leading-relaxed font-medium space-y-10">
            <p>
              SamplingHub (Digitex Studio) is an India-based OEM fabric sampling solutions provider specialising in customised fabric sample books, swatch cards, waterfall hangers, sample headers, and wallpaper catalogs. Operating through a dedicated network of specialised manufacturing partners, we provide centralised product development, structural engineering, quality inspection, and international export dispatch from Thane Bhiwandi, PIN: 421302, Maharashtra, India.
            </p>
            <p>
              Established in 2011, SamplingHub was founded to bridge the gap between Indian textile capabilities and international export sampling standards. As an OEM partner, we combine specialized fabrication capacities with strict centralized quality control. We recognize that for a textile exporter, the swatch book is the most vital sales asset—the silent ambassador of their brand on an international buyer's desk in Frankfurt, High Point, or Dubai.
            </p>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200 text-center hover:border-[#8B6F47] transition-colors">
              <p className="text-4xl font-black text-navy mb-2 leading-none">3,000+</p>
              <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">Units Produced / Month</p>
            </div>
            <div className="bg-navy text-white p-10 rounded-3xl text-center shadow-xl hover:bg-[#8B6F47] transition-all duration-500 group">
              <p className="text-4xl font-black text-[#8B6F47] group-hover:text-white mb-2 leading-none">15-20</p>
              <p className="text-[11px] text-gray-300 font-bold uppercase tracking-widest">Day Delivery Advantage</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200 text-center hover:border-[#8B6F47] transition-colors">
              <p className="text-4xl font-black text-navy mb-2 leading-none">15+</p>
              <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">Global Markets Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Managed OEM Infrastructure &amp; Quality Control</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-navy mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">Centralised Project &amp; Quality Hub</h3>
               <ul className="space-y-6">
                 {[
                   { t: "Precision Cutting Suite", d: "Equipped with high-speed automated fabric cutters for 100% fray-free pinking and straight cuts." },
                   { t: "Climate-Controlled Storage", d: "Ensures fabric integrity and prevents moisture damage for sensitive European silks and velvets." },
                   { t: "Precision Branding & Debossing", d: "Custom branding executed under strict quality control for foil registration and logo accuracy." },
                   { t: "Triple-Layer QC Station", d: "Every book passes through three stages of manual inspection before export packaging." }
                 ].map((inf, i) => (
                   <li key={i} className="flex gap-4">
                      <span className="w-6 h-6 bg-[#8B6F47] text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-1">{i+1}</span>
                      <div>
                        <h4 className="font-bold text-navy text-sm uppercase tracking-tight mb-1">{inf.t}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">{inf.d}</p>
                      </div>
                   </li>
                 ))}
               </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Thane Bhiwandi Coordination Hub",
                  sub: "Central Quality & Export Office",
                  icon: (
                    <svg className="w-6 h-6 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  ),
                  desc: "Order management, technical specifications, and international export logistics coordination."
                },
                {
                  label: "Automated Pinking & Cutting",
                  sub: "Specialised OEM Partner Unit",
                  icon: (
                    <svg className="w-6 h-6 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L12 12m0 0l-2.879-2.879a3 3 0 10-4.242 4.242L12 12"/>
                    </svg>
                  ),
                  desc: "High-speed computerized pinking knives and automated straight-cut shearing for anti-fray swatch leaves."
                },
                {
                  label: "Precision Case-Binding Press",
                  sub: "Specialised OEM Partner Unit",
                  icon: (
                    <svg className="w-6 h-6 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                  ),
                  desc: "3mm–4mm rigid Kappa board casing, buckram spine wrap, and hot-foil metallic debossing."
                },
                {
                  label: "Export QC & Moisture Barrier Packaging",
                  sub: "Central Dispatch Protocol",
                  icon: (
                    <svg className="w-6 h-6 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  ),
                  desc: "Individual shrink-wrapping, corner guards, and palletized sea/air freight packing."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#8B6F47] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-[#8B6F47]/10 rounded-xl flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#8B6F47] block mb-1">{item.sub}</span>
                    <h4 className="text-sm font-black text-navy uppercase tracking-tight mb-2">{item.label}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section className="py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-navy uppercase tracking-widest text-sm mb-2">Our Evolution</h2>
            <div className="w-12 h-1 bg-[#8B6F47] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
             {[
               { year: '2011', event: 'Founded in Thane-Bhiwandi' },
               { year: '2014', event: 'First EU Export Partnership' },
               { year: '2017', event: 'OEM Partner Network Formed' },
               { year: '2020', event: 'Multi-Tier Quality Inspection Protocol' },
               { year: '2023', event: 'Oversized Wallpaper Line Introduced' },
               { year: '2025', event: 'Global Hub Strategy Launch' }
             ].map((m, i) => (
               <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center shadow-sm hover:scale-105 transition-transform group">
                  <p className="text-[#8B6F47] font-black text-lg mb-1">{m.year}</p>
                  <p className="text-[11px] text-gray-600 font-bold uppercase leading-tight">{m.event}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 bg-gray-50 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-[#1e3a5f] mb-8 tracking-tighter uppercase leading-none">Ready to Export <span className="text-[#8B6F47]">Quality?</span></h2>
          <p className="text-gray-700 text-lg mb-12 font-medium">Join 500+ global brands who trust SamplingHub (Digitex Studio) for their premium sample presentations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('contact-page')} className="bg-[#0d7377] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 transition-all">Request Export Quote</button>
            <button onClick={() => onNavigate('pricing')} className="border-2 border-[#1e3a5f] text-[#1e3a5f] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#1e3a5f] hover:text-white transition-all">View Volume Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
