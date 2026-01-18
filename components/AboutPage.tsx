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
          <span className="text-[#8B6F47] font-black uppercase tracking-[0.3em] text-[11px] mb-4 inline-block bg-white px-4 py-2 rounded-full shadow-sm">Established 1994</span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1e3a5f] mb-6 tracking-tighter leading-none uppercase">
            Heritage Meets <br/> Fabric Innovation
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            From a precision workshop in Mumbai to India’s leading export-quality manufacturer, we redefine fabric presentation.
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
              SwatchCraft India is a premium fabric swatch manufacturer based in Mumbai, serving B2B exporters, interior designers, and wholesale buyers globally. We specialize in elevating the presentation of upholstery and curtain fabrics through world-class craftsmanship and innovative design.
            </p>
            <p>
              Our heritage spans over 30 years of manufacturing excellence. Founded to address the critical gap in the Indian market for high-quality, export-standard fabric samples, SwatchCraft has grown into a trusted partner for global textile brands. We recognized early on that for a textile exporter, the swatch book is the most vital sales tool—it is the silent ambassador of their brand on a buyer's desk in Milan, Paris, or New York.
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
          <h2 className="text-3xl font-black text-navy text-center mb-16 uppercase tracking-tighter">Manufacturing Infrastructure</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-navy mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">Our Mumbai Facility</h3>
               <ul className="space-y-6">
                 {[
                   { t: "Precision Cutting Suite", d: "Equipped with high-speed automated fabric cutters for 100% fray-free pinking and straight cuts." },
                   { t: "Climate-Controlled Storage", d: "Ensures fabric integrity and prevents moisture damage for sensitive European silks and velvets." },
                   { t: "In-House Printing & Embossing", d: "Custom branding executed on-site for immediate quality control and logo accuracy." },
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
            <div className="grid grid-cols-2 gap-4">
               {[
                 "Facility Exterior - Mumbai Hub",
                 "Automated Cutting Machine",
                 "Binding Station (Hardbound)",
                 "Export Packaging Zone"
               ].map((label, i) => (
                 <div key={i} className="aspect-square bg-gray-200 rounded-3xl flex items-center justify-center text-center p-6 border border-gray-300 hover:border-[#8B6F47] transition-colors">
                    <p className="text-[11px] font-black text-gray-600 uppercase tracking-widest">{label}</p>
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
               { year: '1994', event: 'Founded in Mumbai workshop' },
               { year: '2005', event: 'First EU Export Order' },
               { year: '2010', event: 'ISO Quality Certification' },
               { year: '2018', event: 'Waterfall Format Innovation' },
               { year: '2023', event: 'Facility Expansion to 6000 SQ FT' },
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
          <p className="text-gray-700 text-lg mb-12 font-medium">Join 500+ global brands who trust SwatchCraft India for their premium sample presentations.</p>
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