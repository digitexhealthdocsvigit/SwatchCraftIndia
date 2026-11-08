import React from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  type: 'privacy' | 'terms';
  onNavigate: (view: ViewState) => void;
}

const LegalPage: React.FC<Props> = ({ type }) => {
  const content =
    type === 'privacy'
      ? {
          title: 'Privacy Policy',
          intro:
            'SamplingHub (Digitex Studio) respects your privacy. This policy explains how we collect and protect your B2B inquiry data.',
          sections: [
            {
              t: '1. Data Collection',
              c: 'We collect information such as name, email, and company details through our RFQ form to provide accurate technical specifications and quotations.',
            },
            {
              t: '2. Use of Information',
              c: 'Your data is used solely for project consultation, order coordination, and export documentation.',
            },
            {
              t: '3. Security',
              c: 'All B2B inquiry data is stored securely. We do not share your proprietary collection details with unauthorized third parties.',
            },
          ],
        }
      : {
          title: 'Terms of Service',
          intro:
            'General commercial terms for managed OEM fabric sampling and international export coordination provided by SamplingHub (Digitex Studio).',
          sections: [
            {
              t: '1. Order Minimums',
              c: 'Upholstery books and wallpaper catalogs require a standard minimum of 50 units. Curtain albums require 40 units. Sample prototypes are billed per specification.',
            },
            {
              t: '2. Payment Terms',
              c: 'Standard terms: 30% advance deposit upon order confirmation, 70% balance payment prior to export dispatch or against shipping documents.',
            },
            {
              t: '3. Production Schedules',
              c: 'Production and dispatch timelines are project-based and confirmed upon fabric receipt, technical specification review, and prototype approval.',
            },
          ],
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
            <p className="text-gray-400 text-xs italic">SamplingHub (Digitex Studio) • Thane Bhiwandi, PIN: 421302, Maharashtra, India</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
