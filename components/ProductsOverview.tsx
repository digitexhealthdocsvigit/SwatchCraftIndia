import React from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const productCategories = [
  {
    name: "Standard Swatch Books",
    items: [
      { name: "Upholstery Swatch Books", moq: "50 Books", lead: "21-28 Days", use: "Furniture Showrooms" },
      { name: "Ring Swatch Sets", moq: "75 Sets", lead: "15-20 Days", use: "Sales Rep Kits" }
    ]
  },
  {
    name: "Large Format Albums",
    items: [
      { name: "Curtain Fabric Albums", moq: "40 Albums", lead: "24-30 Days", use: "Wholesale Displays" },
      { name: "Sample Cards", moq: "200 Cards", lead: "12-18 Days", use: "Mailing Campaigns" }
    ]
  }
];

const ProductsOverview: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2849] mb-6">Fabric Presentation Solutions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Compare our full range of fabric swatch books and catalogues designed for international upholstery and curtain brands.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <h2 className="text-2xl font-bold text-[#1a2849] mb-8">Detailed Comparison</h2>
          <table className="w-full bg-white rounded-2xl shadow-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#1e3a5f] text-white">
                <th className="p-4 text-left">Product Name</th>
                <th className="p-4 text-left">MOQ</th>
                <th className="p-4 text-left">Lead Time</th>
                <th className="p-4 text-left">Primary Use Case</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productCategories.flatMap(cat => cat.items).map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-[#1a2849]">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.moq}</td>
                  <td className="p-4 text-gray-600">{item.lead}</td>
                  <td className="p-4 text-gray-600 italic">{item.use}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => onNavigate('contact-page')}
                      className="text-[#0d7377] font-bold text-sm hover:underline"
                    >
                      Get Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1a2849] mb-6">Endless Customization</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We offer white-label branding, custom binding mechanisms, and a variety of cover materials including premium fabrics, synthetic leathers, and high-GSM papers.
            </p>
            <ul className="space-y-4">
              {[
                "Custom Logo Embossing & Foil Stamping",
                "Wide Range of Binding Mechanisms",
                "Variable Swatch Capacity (20-100+)",
                "Bespoke Dimensions for Export Needs"
              ].map((opt, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#d4a574] rounded-full mr-3"></span>
                  {opt}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 aspect-video rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-400">
              <svg className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Custom Swatch Book Samples Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e3a5f] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Need a Tailored Solution?</h2>
          <button 
            onClick={() => onNavigate('contact-page')}
            className="bg-[#d4a574] text-white px-10 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
          >
            Start Your Technical Discussion
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsOverview;