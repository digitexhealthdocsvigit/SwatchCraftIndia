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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e3a5f] mb-6">
            30+ Years of Fabric Presentation Excellence
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From a small Mumbai workshop to India's leading export-quality swatch book manufacturer serving global textile brands.
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

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1e3a5f] mb-8">Our Journey</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded in 1994, SwatchCraft India began as a family-owned sampling workshop in Mumbai. Over three decades, we've evolved into India's premier manufacturer of premium upholstery and curtain fabric swatch books, serving furniture brands, textile mills, and interior designers across India, Europe, USA, and UAE.
              </p>
              <p>
                What started with simple fabric samples has grown into a complete presentation solutions provider with specialized expertise in export-quality manufacturing, custom branding, and reliable delivery timelines.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-8 text-center uppercase tracking-widest text-sm">Milestones</h3>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#c9a86a]/30">
                {[
                  { year: "1994", event: "Company founded in Mumbai as a sampling workshop" },
                  { year: "2005", event: "Expanded operations to cater to initial export markets" },
                  { year: "2010", event: "Achieved ISO 9001 quality certification" },
                  { year: "2015", event: "Reached milestone of serving 15+ countries globally" },
                  { year: "2020", event: "Modern 6,000 sq ft facility expansion in Mumbai" },
                  { year: "2025", event: "Surpassed 500+ unique fabric collections manufactured" }
                ].map((milestone, idx) => (
                  <div key={idx} className="flex items-start relative pl-8 group">
                    <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-[#c9a86a] rounded-full z-10 group-hover:bg-[#c9a86a] transition-colors"></div>
                    <div>
                      <span className="block text-sm font-bold text-[#c9a86a] mb-1">{milestone.year}</span>
                      <p className="text-sm text-gray-500 font-medium">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] text-center mb-16">Why Leading Fabric Brands Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "State-of-the-Art Facility",
                desc: "6,000 sq ft manufacturing facility in Mumbai equipped with modern binding machinery and QC systems.",
                icon: "🏭"
              },
              {
                title: "Expert Craftsmanship",
                desc: "50+ skilled artisans with expertise in fabric handling and precision binding for global standards.",
                icon: "👥"
              },
              {
                title: "Quality Certified",
                desc: "ISO 9001:2015 certified processes and GST registered exporter with full documentation support.",
                icon: "📜"
              },
              {
                title: "Global Reach",
                desc: "Serving clients in India, Italy, France, Turkey, USA, and UAE with proven export expertise.",
                icon: "🌐"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="text-lg font-bold text-[#1e3a5f] mb-3">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 bg-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl mb-6">⏱️</div>
              <h4 className="text-xl font-bold mb-4">Reliability</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                21-28 day production timelines with 98% on-time delivery record. We understand export schedules matter.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-6">⭐</div>
              <h4 className="text-xl font-bold mb-4">Quality First</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Every swatch book undergoes multiple quality checkpoints. Your fabric samples represent your brand.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-6">🤝</div>
              <h4 className="text-xl font-bold mb-4">Partnership</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                We're not just a supplier—we're your fabric presentation partner. Custom solutions and white-label branding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] mb-8">Ready to Work with India's Leading Manufacturer?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-[#0d7377] text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-opacity-90 transition-all"
            >
              Request Factory Visit
            </button>
            <button 
              onClick={() => onNavigate('contact-page')}
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] px-10 py-4 rounded-xl font-bold hover:bg-[#1e3a5f] hover:text-white transition-all"
            >
              Get Export Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;