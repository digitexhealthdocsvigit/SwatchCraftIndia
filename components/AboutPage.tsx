import React from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const AboutPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 inline-block bg-white px-4 py-2 rounded-full shadow-sm">Established 1994</span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1e3a5f] mb-6 tracking-tighter leading-none">
            Heritage Meets <br/> Fabric Innovation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            From a sampling workshop to India’s premier export-quality manufacturer, we redefine how the world touches fabric.
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

      {/* Narrative Section (The 500-Word Narrative Update) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_400px] gap-20">
          <div className="space-y-10">
            <div className="prose prose-lg text-gray-600 leading-relaxed font-medium">
              <h2 className="text-3xl font-black text-navy uppercase tracking-widest text-sm border-l-4 border-gold pl-6 mb-8">Our B2B Heritage & Innovation</h2>
              <p>
                SwatchCraft India stands at the intersection of traditional craftsmanship and modern manufacturing logistics. Founded in 1994, our journey began with a single vision: to elevate the physical presentation of India’s rich textile heritage for a global audience. Today, we are recognized as a premium fabric swatch manufacturer based in Mumbai, serving a sophisticated clientele of B2B exporters, luxury interior designers, and wholesale textile brands across Europe, the USA, and Asia.
              </p>
              <p>
                We realized early on that in the high-stakes world of international textile trade, the sample is often the only physical advocate for your brand. Our innovation story is rooted in solving the "Export Dilemma"—how to show more fabric without increasing shipping weight. This led us to become the first and leading manufacturer of the <strong>Waterfall Swatch Card</strong> in India. This high-impact format displays 40% more samples than traditional books in a compact, air-freight friendly cascade that has revolutionized how Indian exporters present their collections at trade shows like Heimtextil and Maison&Objet.
              </p>
              <p>
                Our competitive advantage is built on the triad of <strong>Speed, Quality, and Compliance</strong>. While international buyers often face 45-60 day delays from Chinese suppliers, our localized Mumbai facility leverages high-speed automation and skilled artisans to deliver premium, export-ready albums in just 15-20 days. This rapid turnaround allows our clients to capture seasonal trends before they fade. Every book produced at SwatchCraft undergoes a multi-stage inspection process, ensuring zero-defect labeling and binding that meets the rigorous ISO 9001 standards.
              </p>
              <p>
                As a dedicated export partner, we don't just manufacture books; we manage complexity. We provide comprehensive documentation support—including commercial invoices, packing lists, and Certificates of Origin—ensuring smooth customs clearance in EU and USA ports. Whether you are a boutique design firm in Bangalore or a major furniture manufacturer in Milan, SwatchCraft India is your partner in world-class fabric presentation.
              </p>
            </div>
            <div className="flex gap-4">
               <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-navy transition-all">Start Collaboration</button>
               <button onClick={() => onNavigate('portfolio')} className="border-2 border-navy text-navy px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-navy hover:text-white transition-all">View Our Work</button>
            </div>
          </div>
          
          <div className="space-y-12">
             <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 text-center relative group">
                <p className="text-4xl font-black text-navy mb-2 leading-none">3,000+</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-8">Units Produced Monthly</p>
                <div className="space-y-4 text-left">
                   {['Europe (Italy, France, Germany)', 'USA (LA, Miami, NY Ports)', 'Middle East (Dubai, GCC)', 'Domestic Luxury Hubs'].map(m => (
                     <div key={m} className="flex items-center text-xs font-bold text-navy"><span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span> {m}</div>
                   ))}
                </div>
                <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-5 transition-opacity rounded-[3rem] pointer-events-none"></div>
             </div>
             
             <div className="bg-navy text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <h4 className="text-gold font-black uppercase tracking-widest text-xs mb-6">Quality Core</h4>
                <ul className="space-y-6">
                   <li className="flex items-start gap-4">
                      <span className="text-xl">🛡️</span>
                      <div><p className="font-bold text-sm leading-tight">ISO 9001:2015</p><p className="text-[10px] text-gray-400 uppercase mt-1">Quality Management System</p></div>
                   </li>
                   <li className="flex items-start gap-4">
                      <span className="text-xl">📦</span>
                      <div><p className="font-bold text-sm leading-tight">Export Compliant</p><p className="text-[10px] text-gray-400 uppercase mt-1">EU/USA Documentation Support</p></div>
                   </li>
                   <li className="flex items-start gap-4">
                      <span className="text-xl">🏭</span>
                      <div><p className="font-bold text-sm leading-tight">6000 SQ FT Facility</p><p className="text-[10px] text-gray-400 uppercase mt-1">Mumbai Production Hub</p></div>
                   </li>
                </ul>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Milestone Roadmap */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-navy uppercase tracking-widest text-sm mb-2">Our Evolution</h2>
            <div className="w-12 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
             {[
               { year: '1994', event: 'Founded in Mumbai workshop' },
               { year: '2005', event: 'First Export Order (Italy)' },
               { year: '2010', event: 'ISO Quality Certification' },
               { year: '2018', event: 'Waterfall Format Launch' },
               { year: '2023', event: 'Automated Binding Expansion' },
               { year: '2025', event: 'Global Hub Strategy' }
             ].map((m, i) => (
               <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 text-center hover:border-gold transition-colors shadow-sm">
                  <p className="text-gold font-black text-lg mb-1">{m.year}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase leading-tight">{m.event}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 bg-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-[#1e3a5f] mb-8 tracking-tighter">Ready to Export Quality?</h2>
          <p className="text-gray-500 text-lg mb-12 font-medium">Join 500+ global brands who trust SwatchCraft India for their premium sample presentations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-[#0d7377] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all"
            >
              Request Technical Quote
            </button>
            <button 
              onClick={() => onNavigate('pricing')}
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#1e3a5f] hover:text-white transition-all"
            >
              View Volume Pricing
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50 rounded-full translate-x-1/2 -translate-y-1/2 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-full -translate-x-1/2 translate-y-1/2 -z-10"></div>
      </section>
    </div>
  );
};

export default AboutPage;