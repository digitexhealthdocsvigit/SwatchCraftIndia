import React from 'react';
import { ViewState } from '../App';

interface Props {
  type: 'privacy' | 'terms';
  onNavigate: (view: ViewState) => void;
}

const LegalPage: React.FC<Props> = ({ type, onNavigate }) => {
  const content = type === 'privacy' ? {
    title: "Privacy Policy",
    intro: "SwatchCraft India respects your privacy. This policy explains how we collect and protect your data.",
    sections: [
      { t: "1. Data Collection", c: "We collect information such as name, email, and company details through our RFQ form to provide accurate manufacturing quotes." },
      { t: "2. Use of Information", c: "Your data is used solely for project consultation, order fulfillment, and export documentation." },
      { t: "3. Security", c: "All B2B data is encrypted and stored securely. We do not share your proprietary collection details with third parties." }
    ]
  } : {
    title: "Terms of Service",
    intro: "General terms for B2B manufacturing and international export services provided by SwatchCraft India.",
    sections: [
      { t: "1. Order Minimums", c: "Upholstery books require a minimum of 50 units. Curtain albums require 40 units. Sample pieces are billed at a flat rate." },
      { t: "2. Payment Terms", c: "Standard terms: 30% advance deposit, 70% balanced payment before export dispatch or against documents." },
      { t: "3. Lead Times", c: "Production timelines (21-28 days) begin after fabric receipt and artwork approval." }
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="pt-32 pb-16 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black text-navy mb-4">{content.title}</h1>
          <p className="text-gray-600 font-medium">{content.intro}</p>
        </div>
      </section>
      
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {content.sections.map((s, i) => (
            <div key={i}>
              <h3 className="text-xl font-bold text-navy mb-4">{s.t}</h3>
              <p className="text-gray-600 leading-relaxed">{s.c}</p>
            </div>
          ))}
          <div className="pt-12 border-t border-gray-100">
             <p className="text-gray-400 text-xs italic">Last updated: January 20, 2025</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;