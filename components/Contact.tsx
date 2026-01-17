import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const faqs = [
    {
      q: "What is your minimum order quantity (MOQ)?",
      a: "Our standard MOQ is 100 units for standard products like upholstery books and waterfall cards. Custom branding and bespoke design projects may have different requirements. Contact our technical team for volume flexibility."
    },
    {
      q: "How long does production take?",
      a: "Standard lead time is 2-3 weeks for waterfall formats and 3-4 weeks for traditional hardbound books. We offer an expedited rush service with a guaranteed 15-20 day delivery for seasonal launches."
    },
    {
      q: "Do you offer white-label manufacturing?",
      a: "Yes! We specialize in complete white-label manufacturing. This includes your custom logos, branded covers, personalized fabric labels, and export-compliant packaging with no SwatchCraft branding."
    },
    {
      q: "What is your MOQ pricing vs international suppliers?",
      a: "At 500+ units, our pricing ranges from ₹70-120 per unit ($0.90-$1.50). We offer the 'Sweet Spot' of China-competitive pricing with USA-standard quality and European-level documentation."
    },
    {
      q: "Can you handle international shipping and logistics?",
      a: "Absolutely. We manage the entire export process: commercial documentation (COO, Invoice, PL), moisture-proof export packaging, and carrier coordination (DHL, FedEx, Sea Freight) to Europe, USA, and Asia."
    },
    {
      q: "What fabric swatch formats do you offer?",
      a: "We offer 6 primary formats: Traditional Swatch Books, Curtain Sample Albums, Waterfall Bi-fold Cards, Waterfall Tri-fold Cards, Fabric Hanger Swatches, and fully custom tailored solutions."
    },
    {
      q: "Are your products export-certified for EU/USA?",
      a: "Yes, all our products meet EU and USA import compliance standards. We are ISO 9001 certified and use sustainable, durable materials that withstand international transit and professional use."
    },
    {
      q: "Can I order a single sample before committing?",
      a: "We encourage quality testing! You can order 1-5 sample units at retail pricing to evaluate binding and printing quality before proceeding with a bulk export order."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (formStatus === 'success') {
    return (
      <div className="pt-32 pb-24 px-4 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100 shadow-xl animate-fadeIn">
          <div className="w-24 h-24 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-6 uppercase tracking-tighter leading-none">RFQ Received <br/> Successfully!</h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
            Thank you for reaching out to SwatchCraft India. Our technical team is reviewing your requirements. You will receive a detailed PDF quote via email and a WhatsApp follow-up within 24 business hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setFormStatus('idle')} className="bg-navy text-white font-black py-4 px-10 rounded-xl hover:bg-teal transition-all uppercase tracking-widest text-[10px]">Send Another Inquiry</button>
            <button className="border-2 border-navy text-navy font-black py-4 px-10 rounded-xl hover:bg-navy hover:text-white transition-all uppercase tracking-widest text-[10px]">Download Catalog</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 inline-block bg-white px-4 py-2 rounded-full shadow-sm">24-Hour RFQ Turnaround</span>
          <h1 className="text-4xl md:text-6xl font-black text-[#1a2849] mb-4 tracking-tighter uppercase leading-none">
            Get Your Custom <br/> Quote Today
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
            Direct from Mumbai facility. ISO certified manufacturing for global fabric brands.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16">
            <h2 className="text-2xl font-black text-[#1a2849] mb-12 uppercase tracking-widest">Request a Technical Quote</h2>
            
            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="space-y-8">
                <h3 className="text-[10px] font-black text-[#d4a574] uppercase tracking-[0.3em] flex items-center">
                   <span className="w-8 h-8 rounded-full bg-[#d4a574]/10 flex items-center justify-center mr-3 text-[10px]">01</span>
                   Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name*</label>
                    <input type="text" required placeholder="Your full name" className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-3 focus:outline-none focus:border-gold transition-all font-bold text-navy" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Name*</label>
                    <input type="text" required placeholder="Your brand or company" className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-3 focus:outline-none focus:border-gold transition-all font-bold text-navy" />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-[10px] font-black text-[#d4a574] uppercase tracking-[0.3em] flex items-center">
                   <span className="w-8 h-8 rounded-full bg-[#d4a574]/10 flex items-center justify-center mr-3 text-[10px]">02</span>
                   Product Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Type*</label>
                    <select required className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-3 focus:outline-none focus:border-gold transition-all font-bold text-navy appearance-none">
                      <option value="">Select Product</option>
                      <option>Waterfall Bi-fold Cards</option>
                      <option>Waterfall Tri-fold Cards</option>
                      <option>Upholstery Swatch Books</option>
                      <option>Curtain Fabric Albums</option>
                      <option>Fabric Hanger Swatches</option>
                      <option>Ring Swatch Sets</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Volume*</label>
                    <select required className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-3 focus:outline-none focus:border-gold transition-all font-bold text-navy appearance-none">
                      <option value="">Select Quantity</option>
                      <option>1-10 pieces (Samples)</option>
                      <option>100-500 units (Standard)</option>
                      <option>500-2000 units (Export)</option>
                      <option>2000+ units (Wholesale)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className={`w-full text-white font-black py-6 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 text-lg uppercase tracking-widest ${formStatus === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-navy hover:bg-gold'}`}
                >
                  {formStatus === 'submitting' ? 'Processing RFQ...' : 'Get Technical Quote'}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-navy rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden">
              <h2 className="text-xl font-black mb-8 uppercase tracking-widest text-gold">Direct Access</h2>
              <div className="space-y-10 relative z-10">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 mr-4 border border-white/10">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <p className="text-gold font-black text-[10px] uppercase tracking-widest mb-1">Direct WhatsApp</p>
                    <p className="font-bold text-xl leading-tight mb-4">+91 90049 62871</p>
                    <a href="https://wa.me/919004962871" target="_blank" className="bg-[#25D366] text-white text-[10px] font-black px-6 py-2.5 rounded-xl hover:opacity-90 transition-all uppercase tracking-widest inline-block shadow-lg">Chat Now</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 mr-4 border border-white/10">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-gold font-black text-[10px] uppercase tracking-widest mb-1">Email Inquiry</p>
                    <p className="font-bold text-lg leading-tight">digitex.studio@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold/10 rounded-full"></div>
            </div>

            <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100">
               <h4 className="text-navy font-black uppercase tracking-widest text-xs mb-6">Mumbai Showroom</h4>
               <div className="space-y-4">
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Unit 4A, Textile Hub, Sector 12,<br/>Andheri East, Mumbai, Maharashtra 400069</p>
                  <button className="text-teal font-black text-[10px] uppercase tracking-widest flex items-center hover:translate-x-2 transition-transform">Get Directions →</button>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-black text-[#1a2849] uppercase tracking-widest text-sm mb-4">Frequently Asked Questions</h2>
             <div className="w-12 h-1 bg-gold mx-auto"></div>
             <p className="text-gray-400 mt-4 text-xs font-bold uppercase tracking-widest">Optimized for B2B Export Inquiries</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none group-hover:bg-gray-50 transition-colors"
                >
                  <span className="font-black text-[#1a2849] group-hover:text-gold transition-colors pr-8 leading-tight text-sm uppercase tracking-tight">{faq.q}</span>
                  <span className={`text-gold transform transition-transform duration-500 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === idx ? 'max-h-[500px]' : 'max-h-0'}`}>
                   <div className="px-8 pb-8 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-6 font-medium">
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