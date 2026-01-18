import React, { useState } from 'react';
import { useRFQ } from '../hooks/useRFQ.ts';

const Contact: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { submitRFQ, loading, success, resetStatus } = useRFQ();

  const faqs = [
    { q: "What is your minimum order quantity (MOQ)?", a: "Our standard MOQ is 100 units for standard products like upholstery books and waterfall cards. Custom branding and bespoke design projects may have different requirements." },
    { q: "How long does production take?", a: "Standard lead time is 2-3 weeks for waterfall formats and 3-4 weeks for traditional hardbound books." },
    { q: "Do you offer white-label manufacturing?", a: "Yes! We specialize in complete white-label manufacturing with your custom logos and branded covers." },
    { q: "Can you handle international shipping?", a: "Absolutely. We manage the entire export process: commercial documentation, export packaging, and carrier coordination." }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submitRFQ({
      fullName: formData.get('fullName') as string,
      companyName: formData.get('companyName') as string,
      email: formData.get('email') as string,
      productType: formData.get('productType') as string,
      quantity: formData.get('quantity') as string,
    });
  };

  if (success) {
    return (
      <div className="pt-32 pb-24 px-4 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100 shadow-xl animate-fadeIn">
          <div className="w-24 h-24 bg-teal text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-6 uppercase tracking-tighter leading-none">RFQ Received!</h2>
          <p className="text-gray-700 text-lg mb-10 leading-relaxed font-medium">
            Thank you for reaching out. Our technical team is reviewing your requirements. You will receive a quote via email within 24 business hours.
          </p>
          <button onClick={resetStatus} className="bg-navy text-white font-black py-4 px-10 rounded-xl hover:bg-teal transition-all uppercase tracking-widest text-[11px]">Send New RFQ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white" id="rfq-form">
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#8B6F47] font-black uppercase tracking-[0.3em] text-[11px] mb-4 inline-block bg-white px-4 py-2 rounded-full shadow-sm">24-Hour B2B Turnaround</span>
          <h1 className="text-4xl md:text-6xl font-black text-[#1a2849] mb-4 tracking-tighter uppercase leading-none">Get Your Custom Quote</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">Direct from Mumbai facility. ISO certified manufacturing.</p>
        </div>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16">
            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">FULL NAME*</label>
                    <input id="fullName" name="fullName" type="text" required className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-3 focus:border-[#8B6F47] transition-all font-bold text-navy outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">WORK EMAIL*</label>
                    <input id="email" name="email" type="email" required className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-3 focus:border-[#8B6F47] transition-all font-bold text-navy outline-none" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">COMPANY NAME*</label>
                  <input id="companyName" name="companyName" type="text" required className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-3 focus:border-[#8B6F47] transition-all font-bold text-navy outline-none" placeholder="Brand Name" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="productType" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">PRODUCT*</label>
                  <select id="productType" name="productType" required className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 font-bold text-navy outline-none">
                    <option value="Waterfall Cards">Waterfall Cards</option>
                    <option value="Swatch Books">Swatch Books</option>
                    <option value="Curtain Albums">Curtain Albums</option>
                    <option value="Hanger Sets">Hanger Sets</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">QUANTITY*</label>
                  <select id="quantity" name="quantity" required className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 font-bold text-navy outline-none">
                    <option value="50-100">50-100 units</option>
                    <option value="100-500">100-500 units</option>
                    <option value="500+">500+ (Export Tier)</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-navy text-white font-black py-6 rounded-2xl shadow-xl hover:bg-[#8B6F47] transition-all text-lg uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? 'Sending Request...' : 'Get Technical Quote'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-navy rounded-[3rem] p-10 text-white shadow-xl">
              <h2 className="text-xl font-black mb-8 uppercase tracking-widest text-[#8B6F47]">Direct Support</h2>
              <div className="space-y-10">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-4"><span>📱</span></div>
                  <div>
                    <p className="text-[#8B6F47] font-black text-[11px] uppercase mb-1">WhatsApp</p>
                    <p className="font-bold text-xl">+91 90049 62871</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-4"><span>📧</span></div>
                  <div>
                    <p className="text-[#8B6F47] font-black text-[11px] uppercase mb-1">Email</p>
                    <p className="font-bold text-lg">digitex.studio@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-navy text-center mb-12 uppercase tracking-widest">Technical FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-8 text-left font-black text-navy text-sm uppercase flex justify-between items-center transition-colors hover:bg-gray-50">
                  {faq.q} <span aria-hidden="true">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && <div className="px-8 pb-8 text-gray-600 text-sm leading-relaxed font-medium animate-fadeIn">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;