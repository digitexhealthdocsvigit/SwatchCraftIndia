import React from 'react';
import { ViewState } from '../App.tsx';
import { useGlobalSettings } from './GlobalSettingsContext.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
  onDownload: (asset: string) => void;
}

const pricingData = [
  { name: "Upholstery Swatch Books", baseRate: 70, maxRate: 100, unit: "pc", moq: "50 Books", ideal: "Furniture Showrooms" },
  { name: "Curtain Fabric Albums", baseRate: 100, maxRate: 140, unit: "pc", moq: "40 Albums", ideal: "Wholesalers" },
  { name: "Fabric Hanger Swatches", baseRate: 18, maxRate: 25, unit: "pc", moq: "100 Hangers", ideal: "Retail Display" },
  { name: "Ring Swatch Sets", baseRate: 20, maxRate: 30, unit: "set", moq: "75 Sets", ideal: "Sales Rep Kits" },
  { name: "Sample Cards", baseRate: 12, maxRate: 18, unit: "card", moq: "200 Cards", ideal: "Mailings" }
];

const PricingPage: React.FC<Props> = ({ onNavigate, onDownload }) => {
  const { formatPrice, currency } = useGlobalSettings();

  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="pt-32 pb-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-teal font-black text-[10px] uppercase tracking-[0.3em] mb-4 inline-block">B2B Volume Discounts</span>
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 tracking-tight uppercase tracking-tighter">Transparent Global Pricing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed mb-8">
            India's most competitive B2B rates for premium fabric presentation.
          </p>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <span className="text-[10px] font-black text-navy uppercase tracking-widest">Live Rates in {currency}</span>
          </div>
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
                  <td className="p-8 font-black text-gold text-lg whitespace-nowrap">
                    {formatPrice(row.baseRate)}-{formatPrice(row.maxRate)} / {row.unit}
                  </td>
                  <td className="p-8 text-gray-500 font-medium">{row.moq}</td>
                  <td className="p-8 italic text-gray-400 text-sm">{row.ideal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center px-8">
           <div>
             <h3 className="text-2xl font-black text-navy mb-4 uppercase tracking-tighter">Export Price Matrix</h3>
             <p className="text-gray-500 leading-relaxed mb-8 font-medium">
                Download our comprehensive 2025 B2B Price Matrix including air-freight estimates and currency conversion charts for EU and USA markets.
             </p>
             <button 
                onClick={() => onDownload('Full Price Matrix')}
                className="bg-navy text-white px-10 py-5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center hover:bg-gold transition-all shadow-lg"
             >
               Download B2B Matrix (PDF)
             </button>
           </div>
           <div className="bg-teal text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
              <p className="text-[10px] text-teal-200 font-black uppercase mb-4 tracking-widest">Lead Generation Policy</p>
              <p className="text-lg font-bold italic relative z-10">
                 "100% of sample development costs are credited back against your bulk export order over 500 units."
              </p>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;