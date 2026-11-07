import React from 'react';

const Testimonials: React.FC = () => {
  const feedback = [
    {
      quote: "The quality of the hardbound swatch books exceeded our expectations. Our European dealers are impressed with the presentation.",
      company: "Premium Sofa Group",
      location: "Furniture Manufacturer, Italy"
    },
    {
      quote: "Reliable partner for our curtain collections. The ring binding is durable and the finish is impeccable. Fast delivery to UAE.",
      company: "Urban Textiles LLC",
      location: "Curtain Wholesaler, Dubai"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-[#8B6F47] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {feedback.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-2xl relative border border-gray-100">
              <span className="text-6xl text-[#8B6F47]/20 absolute top-4 left-4 font-serif">"</span>
              <p className="text-gray-700 italic text-lg mb-6 relative z-10 pt-4">
                {item.quote}
              </p>
              <div>
                <h3 className="font-bold text-[#1e3a5f] uppercase tracking-wide text-base">{item.company}</h3>
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
