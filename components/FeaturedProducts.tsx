import React from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const products = [
  {
    id: 'upholstery',
    title: "Upholstery Swatch Books",
    badge: "Most Popular",
    desc: "Hardbound or ring-bound albums showcasing 20-60 upholstery fabric samples with professional labels and branding.",
    specs: ["Formats: Hardbound, Ring-bound", "Capacity: 20-60 samples", "Materials: Velvet, Linen, Jacquard", "White-label branding options"],
    moq: "50 Books",
    leadTime: "21-28 days",
    placeholder: "Upholstery Swatch Book",
    target: 'product-upholstery'
  },
  {
    id: 'curtain',
    title: "Curtain Fabric Albums",
    desc: "Oversized A3+ albums designed for window treatment collections. Features detachable pages and protective sleeves.",
    specs: ["Size: A3 or custom large format", "Capacity: 30-50 swatches", "Detachable pages included", "Ideal for wholesalers"],
    moq: "40 Albums",
    leadTime: "24-30 days",
    placeholder: "Curtain Fabric Album",
    target: 'product-curtain'
  },
  {
    id: 'hanger',
    title: "Fabric Hanger Swatches",
    desc: "Showroom display solutions with fabric swatches mounted on metal or wooden hangers with branded headers.",
    specs: ["Hangers: Chrome, Wood, Matte Black", "Swatch size: 15x15cm or 20x20cm", "Custom printed header cards", "Retail display ready"],
    moq: "100 Hangers",
    leadTime: "18-25 days",
    placeholder: "Fabric Hangers",
    target: 'product-hanger'
  },
  {
    id: 'ring',
    title: "Ring Swatch Sample Sets",
    desc: "Compact, portable kits perfect for sales representatives. Metal ring binding allows easy flipping and removal.",
    specs: ["Binding: Heavy-duty metal ring", "Swatch size: 10x10cm or 12x12cm", "Capacity: 20-40 samples", "Labled codes & case option"],
    moq: "75 Sets",
    leadTime: "15-20 days",
    placeholder: "Ring Swatch Sets",
    target: 'product-ring'
  },
  {
    id: 'cards',
    title: "Sample Cards & Storyboards",
    desc: "Marketing-ready fabric cards showing color stories and collection themes. High-GSM rigid cardstock backing.",
    specs: ["Card size: A5, A4, or custom", "3-8 fabric swatches per card", "300-400 GSM cardstock", "Matte or UV coating"],
    moq: "200 Cards",
    leadTime: "12-18 days",
    placeholder: "Sample Cards",
    target: 'product-cards'
  },
  {
    id: 'custom',
    title: "Custom Solutions",
    desc: "Bespoke fabric presentation solutions. From unique binding to special dimensions - we build to your spec.",
    specs: ["Custom binding mechanisms", "Special dimensions supported", "Fabric consultation included", "Expert design support"],
    moq: "Custom Quote",
    leadTime: "Varies",
    placeholder: "Bespoke Consulting",
    isCustom: true,
    target: 'contact-page'
  }
];

const FeaturedProducts: React.FC<Props> = ({ onNavigate }) => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Premium Fabric Sample Presentation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">Specialized manufacturing for high-end upholstery and curtain fabric collections.</p>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group border border-gray-100 ${product.isCustom ? 'bg-[#0d7377]/5' : ''}`}>
              <div 
                className="aspect-[4/3] bg-gray-100 flex items-center justify-center p-6 border-b border-gray-100 relative overflow-hidden cursor-pointer"
                onClick={() => onNavigate(product.target as ViewState)}
              >
                <div className="text-center text-gray-400 group-hover:text-gold transition-colors z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-xs font-semibold uppercase">{product.placeholder}</span>
                </div>
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full z-20 shadow-sm">
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-[#0d7377] text-white text-[10px] font-bold px-3 py-1 rounded-full z-20 shadow-sm">
                  MOQ: {product.moq}
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-navy mb-3">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                  {product.desc}
                </p>
                
                <ul className="mb-6 space-y-1">
                  {product.specs.map((spec, sidx) => (
                    <li key={sidx} className="text-xs text-gray-500 flex items-center">
                      <span className="w-1 h-1 bg-gold rounded-full mr-2"></span>
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                   <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Lead Time: <span className="text-navy">{product.leadTime}</span>
                   </div>
                   <button 
                    onClick={() => onNavigate(product.target as ViewState)}
                    className="text-[#0d7377] font-bold text-xs uppercase tracking-wider hover:text-gold transition-colors flex items-center"
                  >
                    View Details 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;