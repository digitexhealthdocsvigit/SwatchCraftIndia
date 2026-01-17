
import React from 'react';

const galleryItems = [
  { title: "Manufacturing Floor", category: "Facility", placeholder: "Cutting & Binding Area" },
  { title: "Premium Upholstery Set", category: "Product", placeholder: "Custom Hardbound Album" },
  { title: "Precision Labeling", category: "Process", placeholder: "Branding Details" },
  { title: "Export Packaging", category: "Shipping", placeholder: "International Cargo Prep" },
  { title: "Curtain Hanger Line", category: "Product", placeholder: "Showroom Display Samples" },
  { title: "Sample Testing Lab", category: "Quality", placeholder: "Fabric Durability Check" }
];

const Gallery: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Production Excellence</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A glimpse into our state-of-the-art manufacturing facility in Mumbai where precision meets craft.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl aspect-square bg-gray-100 border border-gray-100 transition-all hover:shadow-2xl">
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 group-hover:text-gold transition-colors p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs uppercase font-bold tracking-widest block mb-1">{item.category}</span>
                <span className="text-sm font-medium text-gray-400">{item.placeholder}</span>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 translate-y-4 group-hover:translate-y-0 transform">
                <h4 className="text-white text-xl font-bold mb-2">{item.title}</h4>
                <div className="w-10 h-0.5 bg-gold mb-4"></div>
                <button className="text-gold text-xs font-bold uppercase tracking-widest border border-gold px-4 py-2 rounded hover:bg-gold hover:text-navy transition-all">
                  View Detail
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
