import React, { useState } from 'react';
import { useRFQ } from '../hooks/useRFQ.ts';
import VideoPhotoRFQ, { RFQAttachment } from './VideoPhotoRFQ.tsx';
import { MessageCircle, Send, CheckCircle2, ShieldCheck, Clock, Globe2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { submitRFQ, loading, success, resetStatus } = useRFQ();

  // Form State for dynamic WhatsApp prefill & Video RFQ attachments
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [productType, setProductType] = useState('Upholstery Swatch Books');
  const [quantity, setQuantity] = useState('100-500');
  const [exportMarket, setExportMarket] = useState('United States & Canada');
  const [specifications, setSpecifications] = useState('');
  const [attachments, setAttachments] = useState<RFQAttachment[]>([]);

  const faqs = [
    { q: "What is your minimum order quantity (MOQ)?", a: "Our standard MOQ starts at 50 units for hardbound upholstery swatch books, 40 units for curtain albums, and 100 units for waterfall cards. Custom pilot batches can also be accommodated." },
    { q: "How long does export production take?", a: "Standard lead time is 14-21 days for waterfall cards and hangers, and 21-28 days for hardbound upholstery and curtain albums after fabric swatch receipt." },
    { q: "Do you offer white-label manufacturing with custom branding?", a: "Yes! Complete white-label manufacturing with your logo, metallic foil stamping (gold, silver, rose gold), custom debossing, silk-screen printing, and branded cover fabrics." },
    { q: "Can you handle international shipping & customs clearance?", a: "Absolutely. We manage end-to-end export logistics: commercial invoices, certificates of origin, export pallet packaging, and air/sea express delivery to USA, EU, UK, and UAE." },
    { q: "Can I send photos or videos of our current swatch books for an exact match?", a: "Yes! Use the Video & Photo RFQ tool below to attach reference photos or record a 30-second video of your existing sample books." }
  ];

  // Generate formatted WhatsApp message summarizing selected product specs
  const generateWhatsAppMessage = (): string => {
    const lines = [
      `*B2B Fabric Sample Book RFQ - Sampling Hub / SwatchCraft India*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Buyer:* ${fullName || 'International Buyer'}`,
      `🏢 *Company:* ${companyName || 'Not Specified'}`,
      `✉️ *Email:* ${email || 'Not Specified'}`,
      phone ? `📞 *Phone/WA:* ${phone}` : '',
      `📦 *Product:* ${productType}`,
      `📊 *Quantity:* ${quantity} units`,
      `🌐 *Destination:* ${exportMarket}`,
      specifications ? `📝 *Specs/Notes:* ${specifications}` : '',
      attachments.length > 0 
        ? `📎 *Media Attached:* ${attachments.length} reference file(s) (${attachments.map(a => a.type).join(', ')})` 
        : '📎 *Media Reference:* Ready to send photos/video via WhatsApp',
      `━━━━━━━━━━━━━━━━━━━━`,
      `📍 *Factory:* Mumbai, India (ISO 9001:2015)`,
      `_Submitted via samplinghub.world RFQ Engine_`
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleShareToWhatsApp = () => {
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/919004962871?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitRFQ({
      fullName,
      companyName,
      email,
      phone,
      productType,
      quantity,
      exportMarket,
      specifications,
      attachments: attachments.map(a => ({
        name: a.name,
        type: a.type,
        sizeFormatted: a.sizeFormatted
      }))
    });
  };

  if (success) {
    return (
      <div className="pt-32 pb-24 px-4 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100 shadow-xl animate-fadeIn">
          <div className="w-24 h-24 bg-[#0d7377] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3a5f] mb-6 uppercase tracking-tighter leading-none">
            RFQ Received Successfully!
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed font-medium">
            Thank you, <span className="font-bold text-[#1e3a5f]">{fullName || 'partner'}</span>. Our Mumbai technical export engineering team has received your inquiry for <span className="font-bold text-[#8B6F47]">{productType}</span> ({quantity} units).
          </p>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 max-w-md mx-auto mb-10 shadow-sm text-left text-xs space-y-2 text-gray-600">
            <div className="flex items-center gap-2 text-[#0d7377] font-bold">
              <Clock className="w-4 h-4" /> Guaranteed B2B turnaround within 24 hours
            </div>
            <div className="flex items-center gap-2 text-[#1e3a5f] font-bold">
              <Globe2 className="w-4 h-4" /> Export destination: {exportMarket}
            </div>
            {attachments.length > 0 && (
              <div className="text-gray-500">
                📎 {attachments.length} reference file(s) logged with your ticket.
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleShareToWhatsApp}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-4 px-8 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" /> Speed Up on WhatsApp (+91 90049 62871)
            </button>
            <button
              onClick={resetStatus}
              className="bg-[#1e3a5f] text-white font-black py-4 px-8 rounded-xl hover:bg-[#0d7377] transition-all uppercase tracking-widest text-xs"
            >
              Submit Another RFQ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white" id="rfq-form">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[#8B6F47] font-black uppercase tracking-[0.25em] text-[10px]">
              Direct From Mumbai Facility • ISO 9001:2015 Certified
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1e3a5f] mb-4 tracking-tighter uppercase leading-none">
            Request Export Quote & Technical Specs
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            21-28 day international delivery to USA, European Union, UAE & UK. Attach sample references or record a video walk-through below.
          </p>
        </div>
      </section>

      {/* Main RFQ Form Section */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12">
          {/* LEFT: Complete Interactive Form */}
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-14">
            <form className="space-y-10" onSubmit={handleSubmit}>
              {/* Buyer Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white text-[10px] font-black flex items-center justify-center">1</span>
                  <h2 className="text-xs font-black uppercase tracking-widest text-[#1e3a5f]">
                    Contact & Company Details
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 px-3 py-3 focus:border-[#8B6F47] transition-all font-bold text-[#1e3a5f] outline-none rounded-t-lg"
                      placeholder="e.g. Marcus Vance"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">
                      Work Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 px-3 py-3 focus:border-[#8B6F47] transition-all font-bold text-[#1e3a5f] outline-none rounded-t-lg"
                      placeholder="e.g. marcus@furnituredesign.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">
                      Company / Brand Name *
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 px-3 py-3 focus:border-[#8B6F47] transition-all font-bold text-[#1e3a5f] outline-none rounded-t-lg"
                      placeholder="e.g. Vance Luxury Living"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">
                      WhatsApp / Phone (With Country Code)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 px-3 py-3 focus:border-[#8B6F47] transition-all font-bold text-[#1e3a5f] outline-none rounded-t-lg"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Product Specifications & Order Requirements */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white text-[10px] font-black flex items-center justify-center">2</span>
                  <h2 className="text-xs font-black uppercase tracking-widest text-[#1e3a5f]">
                    Product Line & Quantities
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="productType" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">
                      Product Line *
                    </label>
                    <select
                      id="productType"
                      name="productType"
                      required
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 px-2 font-bold text-[#1e3a5f] outline-none rounded-t-lg text-sm"
                    >
                      <option value="Upholstery Swatch Books">Upholstery Swatch Books (MOQ 50)</option>
                      <option value="Curtain Fabric Albums">Curtain Fabric Albums (MOQ 40)</option>
                      <option value="Waterfall Swatch Hangers">Waterfall Swatch Hangers (MOQ 100)</option>
                      <option value="Ring Swatch Sets">Ring Swatch Sets (MOQ 75)</option>
                      <option value="Sample Cards">Textile Sample Cards (MOQ 200)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="quantity" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">
                      Target Quantity *
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 px-2 font-bold text-[#1e3a5f] outline-none rounded-t-lg text-sm"
                    >
                      <option value="50-100">50 - 100 units (Standard Tier)</option>
                      <option value="100-500">100 - 500 units (Showroom Tier)</option>
                      <option value="500+">500+ units (Export / Volume Discount)</option>
                      <option value="1000+">1,000+ units (Global Rollout Tier)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="exportMarket" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">
                      Export Destination *
                    </label>
                    <select
                      id="exportMarket"
                      name="exportMarket"
                      required
                      value={exportMarket}
                      onChange={(e) => setExportMarket(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 px-2 font-bold text-[#1e3a5f] outline-none rounded-t-lg text-sm"
                    >
                      <option value="United States & Canada">United States & Canada</option>
                      <option value="European Union & UK">European Union & UK</option>
                      <option value="UAE & Middle East">UAE & Middle East</option>
                      <option value="Australia & New Zealand">Australia & New Zealand</option>
                      <option value="Domestic India">Domestic India</option>
                      <option value="Other International">Other International</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="specifications" className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">
                    Custom Specifications / Branding Notes
                  </label>
                  <textarea
                    id="specifications"
                    name="specifications"
                    rows={3}
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    placeholder="Provide details such as: number of fabrics per book, book dimensions (A4, A5, custom), cover fabric preference, logo foil color (gold/silver), or packaging requirements."
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:border-[#8B6F47] transition-all font-medium text-sm text-[#1e3a5f] outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Video RFQ & Photo Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white text-[10px] font-black flex items-center justify-center">3</span>
                  <h2 className="text-xs font-black uppercase tracking-widest text-[#1e3a5f]">
                    Visual Reference (Photo Upload & 30s Video RFQ)
                  </h2>
                </div>

                <VideoPhotoRFQ
                  attachments={attachments}
                  onChange={setAttachments}
                  maxFiles={5}
                />
              </div>

              {/* Action Buttons: Submit RFQ + Share Quote to WhatsApp */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Primary Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1e3a5f] hover:bg-[#0d7377] text-white font-black py-5 px-6 rounded-2xl shadow-xl transition-all text-sm uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Submitting Technical RFQ...' : 'Submit Technical RFQ'}
                  </button>

                  {/* Share Quote to WhatsApp Button */}
                  <button
                    type="button"
                    onClick={handleShareToWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-5 px-6 rounded-2xl shadow-xl transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    Share Quote to WhatsApp
                  </button>
                </div>

                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  🔒 ISO 9001:2015 NDA Protected • Direct Mumbai factory response within 24 hours
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT: Factory & Technical Support Panel */}
          <div className="space-y-8">
            <div className="bg-[#1e3a5f] rounded-[3rem] p-10 text-white shadow-xl space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B6F47] block mb-2">
                  Direct Factory Contact
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
                  Mumbai Export Headquarters
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 text-xl">
                    📱
                  </div>
                  <div>
                    <p className="text-[#8B6F47] font-black text-[10px] uppercase tracking-wider mb-0.5">
                      Direct WhatsApp Hotline
                    </p>
                    <a
                      href="https://wa.me/919004962871"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-xl hover:text-[#8B6F47] transition-colors"
                    >
                      +91 90049 62871
                    </a>
                    <p className="text-[10px] text-gray-300">Available 9am - 8pm IST (Mon-Sat)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 text-xl">
                    📧
                  </div>
                  <div>
                    <p className="text-[#8B6F47] font-black text-[10px] uppercase tracking-wider mb-0.5">
                      Technical Export Inquiries
                    </p>
                    <p className="font-bold text-base text-white">digitex.studio@gmail.com</p>
                    <p className="text-[10px] text-gray-300">Send detailed CAD, specs, and tenders</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 text-xl">
                    🏭
                  </div>
                  <div>
                    <p className="text-[#8B6F47] font-black text-[10px] uppercase tracking-wider mb-0.5">
                      Manufacturing Facility
                    </p>
                    <p className="font-bold text-sm text-white">
                      Andheri East, Mumbai, Maharashtra 400069, India
                    </p>
                    <p className="text-[10px] text-gray-300">6,000 sq ft Bookbinding & Die-Cutting Plant</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <ShieldCheck className="w-4 h-4 text-[#8B6F47]" />
                  <span>ISO 9001:2015 Certified Production</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  <span>Door-to-Door Air Cargo via DHL / FedEx</span>
                </div>
              </div>
            </div>

            {/* Quick Export Spec Card */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-[2.5rem] p-8 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#1e3a5f]">
                Export Delivery Benchmarks
              </h4>
              <div className="space-y-3 text-xs text-gray-600 font-medium">
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span>USA & Canada:</span>
                  <span className="font-bold text-[#1e3a5f]">21-25 Days</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span>EU & United Kingdom:</span>
                  <span className="font-bold text-[#1e3a5f]">21-28 Days</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span>UAE & Middle East:</span>
                  <span className="font-bold text-[#1e3a5f]">14-18 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Sample Prototype:</span>
                  <span className="font-bold text-[#8B6F47]">7-10 Days Express</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#1e3a5f] text-center mb-12 uppercase tracking-widest">
            Technical & Export FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-8 text-left font-black text-[#1e3a5f] text-sm uppercase flex justify-between items-center transition-colors hover:bg-gray-50"
                >
                  {faq.q} <span aria-hidden="true" className="text-lg">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-8 pb-8 text-gray-600 text-sm leading-relaxed font-medium animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
