import React from 'react';

const galleryItems = [
  { title: "Manufacturing Floor", category: "Facility", placeholder: "6000 sq ft fabric swatch book manufacturing facility Mumbai" },
  { title: "Premium Upholstery Set", category: "Product", placeholder: "Custom hardbound upholstery swatch book with embossed logo" },
  { title: "Precision Labeling", category: "Process", placeholder: "5-step fabric swatch book manufacturing process timeline" },
  { title: "Export Packaging", category: "Shipping", placeholder: "Export-grade packaging of fabric swatch books for international shipping" },
  { title: "Curtain Hanger Line", category: "Product", placeholder: "Professional chrome fabric hanger swatches for showroom wall" },
  { title: "Sample Testing Lab", category: "Quality", placeholder: "ISO 9001:2015 certification for swatch book manufacturing quality" }
];

const Gallery: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4 uppercase tracking-tighter">Production Excellence</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            A glimpse into our state-of-the-art manufacturing facility in Mumbai where precision meets craft. Serving 15+ countries since 2005.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-3xl aspect-square bg-gray-100 border border-gray-100 transition-all hover:shadow-2xl cursor-pointer">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 group-hover:text-gold transition-colors p-10 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] block mb-2">{item.category}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-tight leading-relaxed">{item.placeholder}</span>
              </div>
              
              <div className="absolute inset-0 bg-navy/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-8 translate-y-4 group-hover:translate-y-0">
                <h4 className="text-white text-2xl font-black mb-4 uppercase tracking-tighter leading-tight">{item.title}</h4>
                <div className="w-12 h-1 bg-gold mb-6"></div>
                <button className="text-gold text-[10px] font-black uppercase tracking-[0.2em] border-2 border-gold px-6 py-3 rounded-xl hover:bg-gold hover:text-navy transition-all">
                  View Case Study
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