import React from 'react';

const ExportMarkets: React.FC = () => {
  const markets = [
    {
      title: "European Brands",
      flags: ["🇮🇹", "🇫🇷", "🇹🇷", "🇩🇪", "🇪🇸"],
      desc: "10+ years exporting to EU markets. Understanding of high European quality standards and documentation.",
      bullets: [
        "Competitive EUR pricing",
        "Commercial Invoice & Packing Lists",
        "Certificate of Origin support",
        "Ports: Rotterdam, Hamburg, Genoa"
      ],
      link: "Export to Europe Info"
    },
    {
      title: "USA Market",
      flags: ["🇺🇸"],
      desc: "Cost-effective manufacturing for the US. Quality matching US expectations with time zone-friendly support.",
      bullets: [
        "40% cost savings vs. domestic",
        "Direct shipping to LA, NY, Miami",
        "DDP and FOB shipping options",
        "Time zone-friendly communication"
      ],
      link: "USA Buyers Guide"
    },
    {
      title: "Middle East (GCC)",
      flags: ["🇦🇪", "🇸🇦", "🇶🇦"],
      desc: "Fast delivery to Dubai and GCC countries. Specialized in regional design preferences and documentation.",
      bullets: [
        "Quick shipping to Dubai & Jeddah",
        "Arabic documentation support",
        "T/T, LC, PayPal accepted",
        "Fast 7-10 day air freight"
      ],
      link: "Middle East Export Details"
    }
  ];

  return (
    <section className="py-24 px-4 bg-[#1e3a5f]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Serving Global Textile Markets Since 2015</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Export-ready manufacturing with complete documentation and shipping support</p>
          <div className="w-24 h-1 bg-[#c9a86a] mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {markets.map((market, idx) => (
            <div key={idx} className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="flex space-x-2 text-2xl mb-6">
                {market.flags.map((f, i) => <span key={i}>{f}</span>)}
              </div>
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">{market.title}</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {market.desc}
              </p>
              <ul className="space-y-2 mb-8 flex-grow">
                {market.bullets.map((bullet, bidx) => (
                  <li key={bidx} className="text-xs text-gray-500 flex items-start">
                    <span className="text-[#0d7377] mr-2">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <button className="text-[#0d7377] font-bold text-sm flex items-center hover:underline decoration-2 underline-offset-4">
                {market.link} 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExportMarkets;