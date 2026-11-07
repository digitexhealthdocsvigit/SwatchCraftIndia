import React from 'react';
import { ViewState } from '../App.tsx';
import { LOCAL_IMAGES } from '../config/mediaAssets.ts';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const detailedSteps = [
  {
    title: "1. Specification & CAD Prototyping",
    duration: "2-3 Days",
    details: "We analyze fabric weights, repeat dimensions, and cover requirements to build technical CAD prototypes and digital layouts.",
    icon: "📐"
  },
  {
    title: "2. Manual Cutting & Anti-Fray Pinking",
    duration: "3-5 Days",
    details: "Bulk fabric rolls are measured, sheeted, and edge-finished using specialized serrated pinking shears and precision cutters to eliminate fraying.",
    icon: "✂️"
  },
  {
    title: "3. Rigid Board Casing & Screw-Post Binding",
    duration: "5-7 Days",
    details: "3mm–4mm European Kappa board covers are wrapped in premium buckram or laminated paper with custom metallic foil stamping.",
    icon: "📚"
  },
  {
    title: "4. Multi-Stage Quality Inspection (QC)",
    duration: "2-3 Days",
    details: "Each sample book is individually verified for swatch alignment, label serialisation, screw tension, and edge finish.",
    icon: "🛡️"
  },
  {
    title: "5. Export Packaging & Global Dispatch",
    duration: "1-2 Days (Dispatch)",
    details: "Books are moisture-sealed in protective shrink-wrap with reinforced corner guards and packed for global air or sea freight.",
    icon: "🚢"
  }
];

const ManufacturingProcessPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-white pt-8 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2849] mb-6">The SamplingHub Process</h1>
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
                  <span className="text-xs font-bold text-[#8B6F47] uppercase tracking-widest">{step.duration}</span>
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
             <div className="overflow-hidden rounded-3xl shadow-lg border border-gray-100 relative aspect-square">
               <img
                 src={LOCAL_IMAGES.upholsteryBookAngle2}
                 alt="Macro Quality Inspection: Precision Anti-Fray Pinking Cuts & Swatch Registration - SamplingHub"
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-4 left-4 right-4 bg-[#1e3a5f]/95 text-white p-4 rounded-2xl text-xs backdrop-blur-sm border border-white/10 shadow-lg">
                 <span className="text-[#c9a86a] font-black uppercase tracking-widest block text-[10px] mb-1">
                   Inspection Standard • Macro Verification
                 </span>
                 Precision zig-zag pinking cuts, zero fabric fraying, and exact 3mm Kappa board casing alignment verified across 100% of finished collections.
               </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-[#8B6F47] font-black uppercase tracking-[0.3em] text-[11px] mb-3 block">
              Multi-Stage Verification Protocol
            </span>
            <h2 className="text-3xl font-extrabold text-[#1a2849] mb-6">Our High-Specification Quality Standards</h2>
            <div className="space-y-6">
              {[
                { t: "Swatch Alignment & Step Accuracy", d: "Cascaded and stepped swatch leaves verified with precision calipers for uniform millimeter spacing." },
                { t: "Fabric Serialization & Code Labeling", d: "Double-checked barcode serialisation, composition breakdown, and pattern repeat codes." },
                { t: "Structural Binding & Screw Durability", d: "Stress-testing of brass Chicago screw-posts, rivets, split rings, and reinforced buckram spines." },
                { t: "Moisture-Barrier Export Packing", d: "Heavy-duty poly shrink-wrap, impact-resistant corner buffers, and double-wall corrugated cartons." }
              ].map((qc, i) => (
                <div key={i} className="border-l-2 border-[#8B6F47] pl-4">
                  <h4 className="font-bold text-[#1a2849] mb-1">{qc.t}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{qc.d}</p>
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
              className="bg-[#0d7377] text-white px-10 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all uppercase tracking-wider text-xs"
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
