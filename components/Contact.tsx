
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-6">Get a Global Quote</h2>
            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
              Partner with SwatchCraft India for your next collection. We provide comprehensive samples, competitive pricing, and global logistics support.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm mr-4 shrink-0 text-navy">📍</div>
                <div>
                  <h4 className="font-bold text-navy mb-1 uppercase tracking-wider text-sm">Main Office & Factory</h4>
                  <p className="text-gray-500 text-sm">Andheri East, Mumbai, Maharashtra 400069, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm mr-4 shrink-0 text-navy">📧</div>
                <div>
                  <h4 className="font-bold text-navy mb-1 uppercase tracking-wider text-sm">Inquiries</h4>
                  <p className="text-gray-500 text-sm font-medium">info@swatchcraftindia.com</p>
                  <p className="text-gray-400 text-xs">Response time: &lt; 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm mr-4 shrink-0 text-navy">💬</div>
                <div>
                  <h4 className="font-bold text-navy mb-1 uppercase tracking-wider text-sm">Direct WhatsApp</h4>
                  <p className="text-gray-500 text-sm font-medium">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-navy text-white rounded-2xl shadow-xl">
              <h4 className="font-bold mb-2">Export Fast Track</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                For international buyers: Please specify your preferred sea/air port and currency (USD/EUR) for faster technical quote generation.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Company Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" placeholder="Acme Textiles Ltd" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Work Email</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" placeholder="john@company.com" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Requirement Type</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all">
                  <option>Upholstery Swatch Books</option>
                  <option>Curtain Fabric Albums</option>
                  <option>Fabric Hangers</option>
                  <option>Ring Sets</option>
                  <option>Other / Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Estimated Quantity</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" placeholder="e.g. 100 sets" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                <textarea rows={4} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" placeholder="Describe your project details..."></textarea>
              </div>

              <button type="submit" className="w-full bg-teal text-white font-bold py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition-all transform hover:-translate-y-1">
                Send Request for Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
