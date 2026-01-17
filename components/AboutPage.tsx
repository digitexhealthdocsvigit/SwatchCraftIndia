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
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1e3a5f] mb-6 tracking-tighter leading-none uppercase">
            Heritage Meets <br/> Fabric Innovation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
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

      {/* Narrative Section (The 500-Word Version) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg text-gray-600 leading-relaxed font-medium space-y-10">
            <p>
              SwatchCraft India is a premium fabric swatch manufacturer based in Mumbai, serving B2B exporters, interior designers, and wholesale buyers globally. We specialize in elevating the presentation of upholstery and curtain fabrics through world-class craftsmanship and innovative design.
            </p>
            <p>
              Our heritage spans over 10 years of manufacturing excellence. Founded to address the critical gap in the Indian market for high-quality, export-standard fabric samples, SwatchCraft has grown into a trusted partner for global textile brands. We recognized early on that for a textile exporter, the swatch book is the most vital sales tool—it is the silent ambassador of their brand on a buyer's desk in Milan, Paris, or New York.
            </p>
            <p>
              Innovation is at our core. We are proud to be the <strong>first and only manufacturer in India</strong> to introduce the Waterfall format innovation—a cascading sample layout that allows brands to display 40% more fabrics in a lighter, more compact format. This innovation has been instrumental in helping our clients reduce international shipping costs while simultaneously increasing their collection visibility at global trade shows like Heimtextil and Maison&Objet.
            </p>
            <p>
              Our primary competitive advantage is our localized speed and India-based quality advantage. While international buyers often face 45-day lead times from overseas suppliers, SwatchCraft leverages its Mumbai-based facility to deliver premium, export-ready samples in just 15-20 days. This speed-to-market allows our clients to capitalize on seasonal trends before they fade and respond to RFQs with unprecedented agility.
            </p>
            <p>
              Today, with a production capacity of 3000+ units per month and ISO certifications for quality management, our team of manufacturing, export, and design experts continues to push the boundaries of fabric presentation. From tiered MOQ pricing (₹70-120 per unit) to complete white-label documentation support, SwatchCraft India is your partner in world-class textile marketing. We remain committed to helping global brands present their textures, colors, and patterns with the world-class professionalism they deserve.
            </p>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 text-center hover:border-gold transition-colors">
              <p className="text-4xl font-black text-navy mb-2 leading-none">3,000+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Units Produced / Month</p>
            </div>
            <div className="bg-navy text-white p-10 rounded-3xl text-center shadow-xl hover:bg-gold transition-all duration-500">
              <p className="text-4xl font-black text-gold group-hover:text-white mb-2 leading-none">15-20</p>
              <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Day Delivery Advantage</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 text-center hover:border-gold transition-colors">
              <p className="text-4xl font-black text-navy mb-2 leading-none">15+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Markets Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-navy uppercase tracking-widest text-sm mb-2">Our Evolution</h2>
            <div className="w-12 h-1 bg-gold mx-auto"></div>
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
               <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 text-center shadow-sm hover:scale-105 transition-transform">
                  <p className="text-gold font-black text-lg mb-1">{m.year}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase leading-tight">{m.event}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 bg-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-[#1e3a5f] mb-8 tracking-tighter uppercase leading-none">Ready to Export <span className="text-gold">Quality?</span></h2>
          <p className="text-gray-500 text-lg mb-12 font-medium">Join 500+ global brands who trust SwatchCraft India for their premium sample presentations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-[#0d7377] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all"
            >
              Request Export Quote
            </button>
            <button 
              onClick={() => onNavigate('pricing')}
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#1e3a5f] hover:text-white transition-all"
            >
              View Volume Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;