import React from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const detailedSteps = [
  {
    title: "1. Specification & RFQ",
    duration: "24-48 Hours",
    details: "We analyze your fabric types, target book dimensions, and branding requirements to provide a technical quote.",
    icon: "📋"
  },
  {
    title: "2. Technical Mockup",
    duration: "2-3 Days",
    details: "Our design team creates a digital or physical prototype for binding mechanism and layout approval.",
    icon: "✏️"
  },
  {
    title: "3. Precision Production",
    duration: "12-18 Days",
    details: "Fabrics are precision-cut, labeled, and bound in our Mumbai facility using high-end automation.",
    icon: "🏭"
  },
  {
    title: "4. Multi-Stage Quality Check",
    duration: "2-3 Days",
    details: "Each book is manually inspected for labeling accuracy, binding strength, and overall finish.",
    icon: "🛡️"
  },
  {
    title: "5. Export Logistics",
    duration: "1-2 Days (Dispatch)",
    details: "Books are packed in export-grade cartons with corner protection and dispatched via sea or air freight.",
    icon: "🚢"
  }
];

const ManufacturingProcessPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2849] mb-6">The SwatchCraft Process</h1>
          <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
            From initial enquiry to international dispatch, we maintain complete transparency and rigorous quality control at every stage of manufacturing.
          </p>
        </div>
      </section>

      {/* Steps List */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-12">
          {detailedSteps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-8 items-start hover:shadow-md transition-all">
              <div className="text-4xl bg-gray-50 p-6 rounded-2xl shrink-0">{step.icon}</div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#1a2849]">{step.title}</h3>
                  <span className="text-xs font-bold text-[#d4a574] uppercase tracking-widest">{step.duration}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{step.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QC Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
             <div className="bg-gray-100 aspect-square rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-300">
               <p className="text-gray-400">Quality Inspection Facility Photos Placeholder</p>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-extrabold text-[#1a2849] mb-6">Our Zero-Defect Quality Standards</h2>
            <div className="space-y-6">
              {[
                { t: "Swatch Alignment", d: "Precise vertical and horizontal alignment for a clean professional look." },
                { t: "Label Accuracy", d: "Double-verified fabric composition and code labels." },
                { t: "Binding Durability", d: "Stress-testing of ring and hardbound mechanisms." }
              ].map((qc, i) => (
                <div key={i}>
                  <h4 className="font-bold text-[#1a2849] mb-1">{qc.t}</h4>
                  <p className="text-sm text-gray-500">{qc.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1e3a5f] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-8">Partner with Export Specialists</h2>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-[#0d7377] text-white px-10 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
            >
              Request a Technical Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManufacturingProcessPage;