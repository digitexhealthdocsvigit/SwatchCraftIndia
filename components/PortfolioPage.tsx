import React from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const projects = [
  { title: "Italian Luxury Velvet Series", client: "Premium Furniture Italy", img: "Custom hardbound upholstery swatch book with embossed logo for luxury furniture brand" },
  { title: "Dubai Hotel Curtain Range", client: "Urban Textiles LLC", img: "Large format curtain album A3 size with 50 fabric samples for European textile exporter" },
  { title: "Modern Showroom Hanger System", client: "Delhi Design Studio", img: "Chrome fabric hanger display system for premium furniture showroom Delhi" },
  { title: "Sales Rep Portable Kit", client: "Global Fabrics US", img: "Ring swatch sets with branded covers for international sales team" },
  { title: "Seasonal Marketing Lookbook", client: "HomeStyle India", img: "A5 fabric sample card showing 6 coordinated upholstery fabric swatches" },
  { title: "Bespoke Leatherette Collection", client: "Boutique Interiors", img: "Textured leatherette sample book with foil stamped branding" }
];

const PortfolioPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="pt-32 pb-16 bg-navy text-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Our Portfolio</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
            Showcasing over 500 collections manufactured for global textile brands and furniture designers.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-square bg-gray-100 rounded-[2.5rem] border border-gray-100 mb-6 flex items-center justify-center text-gray-300 font-bold uppercase text-[9px] text-center p-10 leading-relaxed group-hover:border-gold group-hover:bg-gray-50 transition-all">
                {p.img}
              </div>
              <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">{p.title}</h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{p.client}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-navy mb-8">Ready to Add Your Collection to Our Wall?</h2>
          <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white font-black py-5 px-12 rounded-2xl shadow-xl hover:bg-navy transition-all uppercase tracking-widest">
            Request Quote for Your Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;