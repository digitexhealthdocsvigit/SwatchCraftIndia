import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is your minimum order quantity (MOQ)?",
      a: "Our standard MOQ is 50 pieces for upholstery swatch books and 40 pieces for curtain albums. However, we can provide samples (1-10 pieces) for quality evaluation."
    },
    {
      q: "How long does production take?",
      a: "Standard production timeline is 21-28 days after fabric receipt and artwork approval. For urgent orders, we offer expedited 15-20 day service."
    },
    {
      q: "Do you provide samples before bulk orders?",
      a: "Yes! We can manufacture 1-5 sample pieces so you can evaluate quality before committing to larger orders."
    },
    {
      q: "What customization options are available?",
      a: "Full white-label branding including custom logos, covers, header cards, fabric labels, and binding types. We work with your brand guidelines."
    },
    {
      q: "How do I send my fabrics for manufacturing?",
      a: "For India orders, courier to our Mumbai facility. For export clients, we arrange pickup or you can ship directly. We provide detailed fabric submission guidelines after quote confirmation."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2849] mb-4">
            Get Your Custom Quote in 24 Hours
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below or reach us directly via WhatsApp for immediate assistance
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
          
          {/* LEFT COLUMN: RFQ Form */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-[#1a2849] mb-8">Request a Detailed Quote</h2>
            
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              {/* Section 1: Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-[#d4a574] uppercase tracking-widest flex items-center">
                   <span className="w-6 h-6 rounded-full bg-[#d4a574]/10 flex items-center justify-center mr-2 text-[10px]">1</span>
                   Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Full Name*</label>
                    <input type="text" required placeholder="Your full name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Company Name*</label>
                    <input type="text" required placeholder="Your brand or company" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Email Address*</label>
                    <input type="email" required placeholder="email@company.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">WhatsApp Number*</label>
                    <div className="flex">
                      <select className="bg-gray-100 border border-gray-200 rounded-l-xl px-2 py-3 text-xs focus:outline-none">
                        <option>+91 (IN)</option>
                        <option>+1 (US)</option>
                        <option>+39 (IT)</option>
                        <option>+33 (FR)</option>
                        <option>+971 (UAE)</option>
                        <option>Other</option>
                      </select>
                      <input type="tel" required placeholder="98765 43210" className="w-full bg-gray-50 border border-gray-200 border-l-0 rounded-r-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Country*</label>
                    <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all">
                      <option value="">Select Country</option>
                      <option>India</option>
                      <option>USA</option>
                      <option>Italy</option>
                      <option>France</option>
                      <option>Turkey</option>
                      <option>UAE</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Product Requirements */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-[#d4a574] uppercase tracking-widest flex items-center">
                   <span className="w-6 h-6 rounded-full bg-[#d4a574]/10 flex items-center justify-center mr-2 text-[10px]">2</span>
                   Product Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Product Type*</label>
                    <select multiple className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all min-h-[160px]">
                      <option>Upholstery Swatch Books</option>
                      <option>Curtain Fabric Albums</option>
                      <option>Fabric Hanger Swatches</option>
                      <option>Ring Swatch Sets</option>
                      <option>Sample Cards & Storyboards</option>
                      <option>Custom Solution</option>
                    </select>
                    <p className="text-[10px] text-gray-400 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-700">Estimated Quantity*</label>
                      <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all">
                        <option value="">Select Quantity Range</option>
                        <option>1-10 pieces (Sample order)</option>
                        <option>10-50 pieces</option>
                        <option>50-100 pieces (Standard MOQ)</option>
                        <option>100-500 pieces</option>
                        <option>500-1000 pieces (Bulk Export)</option>
                        <option>1000+ pieces (Volume wholesale)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-700">Number of Fabric Swatches per Book</label>
                      <input type="number" placeholder="e.g. 40" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-sm font-semibold text-gray-700 block">Customization Required</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        "Custom logo/branding",
                        "Specific binding type",
                        "Special labeling",
                        "Custom dimensions",
                        "Other (specify below)"
                      ].map((item) => (
                        <label key={item} className="flex items-center space-x-2 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0d7377] focus:ring-[#0d7377]" />
                          <span className="text-xs text-gray-600 group-hover:text-[#1a2849] transition-colors">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Timeline & Additional Details */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-[#d4a574] uppercase tracking-widest flex items-center">
                   <span className="w-6 h-6 rounded-full bg-[#d4a574]/10 flex items-center justify-center mr-2 text-[10px]">3</span>
                   Timeline & Additional Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Target Delivery Date</label>
                    <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">How did you hear about us?</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all">
                      <option>Google Search</option>
                      <option>IndiaMART</option>
                      <option>LinkedIn</option>
                      <option>Referral</option>
                      <option>Trade Show</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Additional Requirements</label>
                    <textarea rows={4} placeholder="Describe your specific requirements, fabric types, or other technical specifications..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d7377]/20 focus:border-[#0d7377] transition-all"></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50">
                <p className="text-[11px] text-gray-400 mb-6 italic">
                  "We respect your privacy. Your information will only be used to provide you with a quote and will never be shared with third parties."
                </p>
                <button type="submit" className="w-full bg-[#0d7377] text-white font-extrabold py-5 rounded-2xl shadow-xl hover:bg-[#0d7377]/90 transition-all transform hover:-translate-y-1 text-lg tracking-wide">
                  Get My Custom Quote
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Contact Information */}
          <div className="space-y-8">
            {/* Reach Us Directly Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
              <h2 className="text-xl font-bold text-[#1a2849] mb-8">Reach Us Directly</h2>
              
              <div className="space-y-8">
                {/* WhatsApp */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.041-.54c1.017.544 2.021.829 3.269.831 3.177 0 5.765-2.587 5.765-5.766 0-3.18-2.587-5.794-5.787-5.794zm3.976 8.167c-.145.407-.847.742-1.18.809-.323.066-.747.109-1.18-.066-.313-.128-.703-.281-1.213-.501-2.144-.925-3.516-3.056-3.623-3.203-.107-.145-.88-1.164-.88-2.227 0-1.064.534-1.586.747-1.802.213-.218.467-.272.623-.272.156 0 .311.014.444.02.145.007.339-.053.53.408.197.479.663 1.612.721 1.725.058.114.098.246.02.408-.078.162-.117.262-.234.397-.117.133-.247.298-.351.4-.114.112-.234.234-.103.459.131.225.58 1.016 1.246 1.611.854.757 1.574.991 1.795 1.101.221.11.351.093.481-.062.13-.156.559-.65.707-.872.148-.223.296-.187.498-.112.202.075 1.282.604 1.503.716.221.112.369.167.424.262.054.095.054.551-.114.958z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1a2849] font-bold text-lg leading-none">+91 98765 43210</p>
                    <p className="text-gray-500 text-xs mt-1 mb-4 font-medium italic">Fastest response - typically within 2 hours</p>
                    <a href="https://wa.me/910000000000" target="_blank" className="inline-block bg-[#25D366] text-white text-[11px] font-extrabold px-6 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-md uppercase tracking-wider">
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#1a2849]/5 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-5 h-5 text-[#1a2849]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1a2849] font-bold text-base">info@swatchcraftindia.com</p>
                    <p className="text-gray-400 text-[10px] mt-0.5 italic">Export inquiries: export@swatchcraftindia.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#d4a574]/10 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-5 h-5 text-[#d4a574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1a2849] font-bold text-base">+91 22 2345 6789</p>
                    <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">Mon-Sat, 9 AM - 6 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Address Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
              <h2 className="text-xl font-bold text-[#1a2849] mb-6">Visit Our Facility</h2>
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-[#1a2849] font-bold text-sm mb-1 uppercase tracking-wider">Factory & Studio</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    SwatchCraft India<br />
                    Unit 4A, Textile Hub, Sector 12<br />
                    Andheri East, Mumbai 400069<br />
                    Maharashtra, India
                  </p>
                </div>
                {/* Map Placeholder */}
                <div className="w-full h-40 bg-gray-100 rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden group">
                  <div className="text-center text-gray-300">
                    <svg className="w-10 h-10 mx-auto mb-2 opacity-30" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest block">Google Maps Placeholder</span>
                  </div>
                </div>
                <button className="w-full border-2 border-[#1a2849] text-[#1a2849] font-extrabold py-3 rounded-xl hover:bg-[#1a2849] hover:text-white transition-all text-xs uppercase tracking-widest shadow-sm">
                  Get Directions
                </button>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-[#1a2849] rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-[#d4a574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold">Our Response Promise</h2>
              </div>
              <ul className="space-y-4 text-sm text-gray-300 relative z-10">
                <li className="flex items-start">
                  <span className="text-[#d4a574] font-bold mr-3">•</span>
                  Email RFQs: Within 24 business hours
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] font-bold mr-3">•</span>
                  WhatsApp messages: Within 2-4 hours
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] font-bold mr-3">•</span>
                  Sample requests: 48-hour dispatch
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] font-bold mr-3">•</span>
                  Export quotes: Full docs within 48h
                </li>
              </ul>
              {/* Abstract decorative shape */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full pointer-events-none"></div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "500+", sub: "Collections Made" },
                { label: "15+", sub: "Countries Served" },
                { label: "98%", sub: "On-Time Delivery" },
                { label: "ISO", sub: "9001:2015 Certified" }
              ].map((badge) => (
                <div key={badge.sub} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-md text-center group hover:-translate-y-1 transition-transform">
                  <p className="text-[#d4a574] font-black text-xl leading-none mb-1">{badge.label}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-tight">{badge.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#1a2849] text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group transition-colors hover:bg-gray-50"
                >
                  <span className="font-bold text-[#1a2849] group-hover:text-[#d4a574] transition-colors pr-8 leading-snug">{faq.q}</span>
                  <span className={`text-[#d4a574] transform transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === idx ? 'max-h-[300px]' : 'max-h-0'}`}>
                   <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;