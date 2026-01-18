import React from 'react';

const galleryItems = [
  { title: "Upholstery Precision", category: "Upholstery", src: "https://images.unsplash.com/photo-1520183802803-06f731a2059f?auto=format&fit=crop&w=600&q=80" },
  { title: "Curtain Excellence", category: "Curtains", src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" },
  { title: "Waterfall Palette", category: "Waterfall", src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=600&q=80" },
  { title: "Retail Displays", category: "Hangers", src: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80" },
  { title: "Marketing Kits", category: "Sample Cards", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80" },
  { title: "Luxury Binding", category: "Custom", src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80" }
];

const Gallery: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#8B6F47] font-black uppercase tracking-[0.4em] text-[11px] mb-4 inline-block">Visual Standards</span>
          <h2 className="text-4xl md:text-5xl font-black text-navy mb-4 uppercase tracking-tighter leading-none">Production Excellence</h2>
          <div className="w-16 h-1 bg-[#8B6F47] mx-auto mb-8"></div>
          <p className="text-gray-700 max-w-2xl mx-auto font-medium text-lg">
            A glimpse into our 6,000 sq ft manufacturing facility in Mumbai where precision meets world-class textile presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[2.5rem] aspect-square bg-gray-100 transition-all hover:shadow-2xl cursor-pointer">
              <img 
                src={item.src} 
                alt={item.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-8 translate-y-4 group-hover:translate-y-0 backdrop-blur-sm">
                <span className="text-[#8B6F47] text-[11px] font-black uppercase tracking-[0.3em] mb-4">{item.category}</span>
                <h4 className="text-white text-2xl font-black mb-6 uppercase tracking-tighter leading-tight">{item.title}</h4>
                <div className="w-10 h-0.5 bg-white/20 mb-8"></div>
                <button className="text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-navy transition-all">
                  Request Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;