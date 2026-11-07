import React from 'react';

const steps = [
  { step: 1, title: "RFQ Received", icon: "📧", desc: "Share requirements via email or WhatsApp (+91 90049 62871)" },
  { step: 2, title: "Technical Discussion", icon: "📄", desc: "Finalize specs, binding, branding (2-3 days)" },
  { step: 3, title: "Prototype Approval", icon: "✅", desc: "Digital mockup or sample approval (3-5 days)" },
  { step: 4, title: "Production", icon: "🏭", desc: "Manufacturing with QC (12-18 days)" },
  { step: 5, title: "Export Dispatch", icon: "🚢", desc: "Packaging & international air shipping" }
];

const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] mb-4">Our Manufacturing Process</h2>
          <div className="w-24 h-1 bg-[#8B6F47] mx-auto"></div>
        </div>

        <div className="relative mt-20">
          {/* Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative">
            {steps.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:border-[#8B6F47] group-hover:scale-110 transition-all duration-300 relative z-10">
                  {item.icon}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#8B6F47] text-white text-xs font-bold flex items-center justify-center rounded-full">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 max-w-[200px] leading-snug font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
