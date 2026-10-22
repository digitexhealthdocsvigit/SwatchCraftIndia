import React from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const projects = [
  {
    title: "Italian Luxury Velvet Series",
    client: "Premium Furniture Italy",
    category: "Upholstery Swatch Books",
    image: "https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?auto=format&fit=crop&w=800&q=80",
    alt: "Custom Hardbound Velvet Upholstery Swatch Book with Gold Foil Stamping"
  },
  {
    title: "Dubai Hotel Curtain Range",
    client: "Urban Textiles LLC",
    category: "Curtain Fabric Albums",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    alt: "A3 Large Format Curtain Fabric Album for Hospitality Projects"
  },
  {
    title: "Modern Showroom Hanger System",
    client: "Delhi Design Studio",
    category: "Waterfall Hangers",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    alt: "Chrome Swivel Waterfall Swatch Hangers for Textile Showrooms"
  },
  {
    title: "Sales Rep Portable Kit",
    client: "Global Fabrics US",
    category: "Ring Swatch Sets",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    alt: "Portable Ring-Bound Swatch Fan Decks with Custom Labeling"
  },
  {
    title: "Seasonal Marketing Lookbook",
    client: "HomeStyle Europe",
    category: "Sample Cards",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    alt: "Precision Die-Cut Fabric Sample Storyboards for Mailers"
  },
  {
    title: "Bespoke Leatherette Collection",
    client: "Boutique Interiors UK",
    category: "Custom Hardbound",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
    alt: "Textured Leatherette Fabric Swatch Binder with Debossed Logo"
  }
];

const PortfolioPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="pt-32 pb-16 bg-[#1e3a5f] text-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#8B6F47] font-black uppercase tracking-[0.3em] text-[10px] mb-4 inline-block bg-white/10 px-4 py-1.5 rounded-full">
            Export Manufacturing Track Record
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Our Production Portfolio</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-medium">
            Over 500 fabric swatch collections manufactured in our Mumbai plant for premier international brands across USA, EU, and UAE.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 rounded-[2.5rem] overflow-hidden border border-gray-100 mb-6 relative shadow-sm group-hover:shadow-2xl transition-all">
                <img 
                  src={p.image} 
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white text-[11px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {p.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">{p.title}</h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{p.client}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-navy mb-4 uppercase tracking-tighter">
            Ready to Manufacture Your Fabric Collection?
          </h2>
          <p className="text-gray-600 font-medium mb-8">
            Send your swatch dimensions, binding preferences, or existing reference photos for a free technical prototype consultation.
          </p>
          <button 
            onClick={() => onNavigate('contact-page')} 
            className="bg-teal text-white font-black py-5 px-12 rounded-2xl shadow-xl hover:bg-navy transition-all uppercase tracking-widest text-xs"
          >
            Request Technical Quote & Prototype
          </button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
