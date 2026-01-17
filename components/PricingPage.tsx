import React from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const pricingData = [
  { name: "Upholstery Swatch Books", rate: "₹70-100 / pc", moq: "50 Books", ideal: "Furniture Showrooms" },
  { name: "Curtain Fabric Albums", rate: "₹100-140 / pc", moq: "40 Albums", ideal: "Wholesalers" },
  { name: "Fabric Hanger Swatches", rate: "₹18-25 / pc", moq: "100 Hangers", ideal: "Retail Display" },
  { name: "Ring Swatch Sets", rate: "₹20-30 / set", moq: "75 Sets", ideal: "Sales Rep Kits" },
  { name: "Sample Cards", rate: "₹12-18 / card", moq: "200 Cards", ideal: "Mailings" }
];

const PricingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="pt-32 pb-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-6">Transparent Volume Pricing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Get the most competitive B2B rates for premium fabric presentation directly from India's leading manufacturer.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-navy text-white text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="p-8">Product Line</th>
                <th className="p-8">Volume Rate</th>
                <th className="p-8">Standard MOQ</th>
                <th className="p-8">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pricingData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-8 font-bold text-navy">{row.name}</td>
                  <td className="p-8 font-black text-gold text-lg">{row.rate}</td>
                  <td className="p-8 text-gray-500 font-medium">{row.moq}</td>
                  <td className="p-8 italic text-gray-400 text-sm">{row.ideal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center px-8">
           <div>
             <h3 className="text-2xl font-bold text-navy mb-4">Export Pricing (USD/EUR)</h3>
             <p className="text-gray-500 leading-relaxed mb-6">
                For international clients, we provide multi-currency pricing inclusive of export documentation. We accept Wire Transfer (T/T), Letter of Credit (L/C), and Wise.
             </p>
             <button onClick={() => onNavigate('contact-page')} className="text-teal font-black text-xs uppercase tracking-widest flex items-center hover:translate-x-2 transition-transform">
               Request Export Price List <span className="ml-2">→</span>
             </button>
           </div>
           <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-4 tracking-widest">Sample Policy</p>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                 "We provide 1-5 sample pieces for quality evaluation before bulk production. Sample costs are adjustable against your subsequent bulk order over 500 units."
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;