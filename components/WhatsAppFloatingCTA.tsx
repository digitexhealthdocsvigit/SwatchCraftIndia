import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';

interface Props {
  phoneNumber?: string;
}

const WhatsAppFloatingCTA: React.FC<Props> = ({ phoneNumber = '919004962871' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  const quickPrompts = [
    {
      title: "Request Export Catalog & Price List",
      desc: "Get 2026 B2B volume pricing & PDF catalog",
      msg: "Hello SwatchCraft India / Sampling Hub! Please share your latest export catalog and B2B volume pricing guide for international orders."
    },
    {
      title: "Quick MOQ & Lead Time Inquiry",
      desc: "50 pcs MOQ | 21-day express delivery to US/EU/UAE",
      msg: "Hi! I want to check MOQ and export lead times for custom fabric swatch books shipped to my country."
    },
    {
      title: "Custom Sample Book Consultation",
      desc: "Send swatch specs or photos for technical review",
      msg: "Hello! I would like to consult on custom binding, foil stamping, and sizing for our upcoming fabric collection swatch books."
    }
  ];

  const handleOpenWhatsApp = (customMsg?: string) => {
    const text = customMsg || selectedPrompt || "Hello SwatchCraft India! I am interested in custom fabric swatch books / sampling books for my business. Please share your catalog and export quote.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick-Chat Card */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#0d7377] p-5 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close WhatsApp chat panel"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-inner">
                  🧵
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25D366] border-2 border-[#1e3a5f] rounded-full"></span>
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-wider text-white flex items-center gap-1.5">
                  Sampling Hub Factory
                  <ShieldCheck className="w-4 h-4 text-[#8B6F47]" />
                </h3>
                <p className="text-[11px] text-gray-200 font-medium">Export Technical Team • Mumbai, India</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span className="text-[10px] text-[#25D366] font-bold uppercase tracking-widest">Typically replies in 15 mins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 bg-gray-50/60 space-y-4">
            <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm text-xs text-gray-700 leading-relaxed font-medium">
              👋 Hi! Welcome to <span className="font-bold text-[#1e3a5f]">SwatchCraft India / Sampling Hub</span>. Select an inquiry below or chat directly with our Mumbai export specialists:
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Quick B2B Inquiries</p>
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(q.msg)}
                  className="w-full text-left p-3 rounded-2xl bg-white hover:bg-gray-100/80 border border-gray-100 hover:border-gray-200 transition-all flex items-start gap-2.5 group shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#8B6F47] group-hover:scale-110 transition-transform mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#1e3a5f] group-hover:text-[#0d7377] transition-colors">{q.title}</p>
                    <p className="text-[10px] text-gray-400 font-medium truncate">{q.desc}</p>
                  </div>
                  <Send className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#25D366] transition-colors mt-1 shrink-0" />
                </button>
              ))}
            </div>

            {/* Direct Action Button */}
            <button
              onClick={() => handleOpenWhatsApp()}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp (+91 90049 62871)
            </button>
          </div>
        </div>
      )}

      {/* Floating CTA Pill / Button */}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-gray-100 text-xs font-bold text-[#1e3a5f] hover:text-[#0d7377] hover:shadow-2xl transition-all group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping"></span>
            <span>Need Export Quote? Chat on WhatsApp</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group"
          aria-label="Toggle WhatsApp B2B Help"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:opacity-0"></span>
          {isOpen ? (
            <X className="w-7 h-7 relative z-10" />
          ) : (
            <svg
              className="w-7 h-7 relative z-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.041-.54c1.017.544 2.021.829 3.269.831 3.177 0 5.765-2.587 5.765-5.766 0-3.18-2.587-5.794-5.794zm3.976 8.167c-.145.407-.847.742-1.18.809-.323.066-.747.109-1.18-.066-.313-.128-.703-.281-1.213-.501-2.144-.925-3.516-3.056-3.623-3.203-.107-.145-.88-1.164-.88-2.227 0-1.064.534-1.586.747-1.802.213-.218.467-.272.623-.272.156 0 .311.014.444.02.145.007.339-.053.53.408.197.479.663 1.612.721 1.725.058.114.098.246.02.408-.078.162-.117.262-.234.397-.117.133-.247.298-.351.4-.114.112-.234.234-.103.459.131.225.5 1.016 1.246 1.611.854.757 1.574.991 1.795 1.101.221.11.351.093.481-.062.13-.156.559-.65.707-.872.148-.223.296-.187.498-.112.202.075 1.282.604 1.503.716.221.112.369.167.424.262.054.095.054.551-.114.958z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default WhatsAppFloatingCTA;
