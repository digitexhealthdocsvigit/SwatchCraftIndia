import React from 'react';

const Testimonials: React.FC = () => {
  const buyerProfiles = [
    {
      quote:
        'Hardbound and screw-post swatch books engineered for furniture manufacturers and fabric editors requiring durable 3mm–4mm Kappa board covers, custom foil stamping, and anti-fray pinked swatches.',
      company: 'Upholstery & Furniture Editors',
      location: 'European & North American Showroom Collections',
    },
    {
      quote:
        'Large-format A3+ curtain albums, oversized 45×45 cm wallpaper repeat books, and stepped waterfall hangers coordinated with full export documentation for international distribution.',
      company: 'Drapery & Wallcovering Distributors',
      location: 'UK, EU & Middle East (GCC) Hospitality Projects',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] mb-4">
            Built for International Textile &amp; Wallcovering Buyers
          </h2>
          <div className="w-24 h-1 bg-[#8B6F47] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {buyerProfiles.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-2xl relative border border-gray-100">
              <p className="text-gray-700 text-lg mb-6 relative z-10 leading-relaxed">
                {item.quote}
              </p>
              <div>
                <h3 className="font-bold text-[#1e3a5f] uppercase tracking-wide text-base">
                  {item.company}
                </h3>
                <span className="text-sm text-[#8B6F47] font-semibold">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
