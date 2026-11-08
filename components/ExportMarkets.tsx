import React from 'react';

const ExportMarkets: React.FC = () => {
  const markets = [
    {
      title: 'European Brands',
      flags: ['🇮🇹', '🇫🇷', '🇹🇷', '🇩🇪', '🇪🇸'],
      desc: 'Coordinated export supply for EU textile editors and furniture brands with full customs documentation.',
      bullets: [
        'Multi-currency EUR pricing',
        'Commercial Invoice & Packing Lists',
        'Certificate of Origin support',
        'Ports: Rotterdam, Hamburg, Genoa',
      ],
      link: 'Export to Europe Info',
    },
    {
      title: 'USA Market',
      flags: ['🇺🇸'],
      desc: 'Custom OEM fabric and wallcovering sample presentations tailored for North American wholesalers and showrooms.',
      bullets: [
        'Tiered B2B volume pricing',
        'Air & sea freight to LA, NY, Miami',
        'FOB and CIF shipping options',
        'Responsive English communication',
      ],
      link: 'USA Buyers Guide',
    },
    {
      title: 'Middle East (GCC)',
      flags: ['🇦🇪', '🇸🇦', '🇶🇦'],
      desc: 'Dedicated export logistics to Dubai and GCC hospitality and interior furnishing distributors.',
      bullets: [
        'Direct air & sea freight to Dubai & Jeddah',
        'Bilingual documentation support',
        'T/T, LC, PayPal accepted',
        'Coordinated DHL / FedEx / sea dispatch',
      ],
      link: 'Middle East Export Details',
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#1e3a5f]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Serving Global Textile Markets Since 2011
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Managed OEM sampling solutions with complete export documentation and international freight coordination
          </p>
          <div className="w-24 h-1 bg-[#c9a86a] mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {markets.map((market, idx) => (
            <div
              key={idx}
              className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex space-x-2 text-2xl mb-6">
                {market.flags.map((f, i) => (
                  <span key={i}>{f}</span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">{market.title}</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">{market.desc}</p>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
