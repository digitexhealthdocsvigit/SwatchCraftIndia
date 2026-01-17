import React from 'react';

const QualityCertifications: React.FC = () => {
  const certs = [
    { title: "ISO 9001:2015", subtitle: "Quality Management Certified", icon: "🛡️" },
    { title: "GST Registered", subtitle: "Official Indian Exporter", icon: "🏛️" },
    { title: "100% Inspection", subtitle: "Zero-Defect Quality Control", icon: "🔍" },
    { title: "Dedicated Support", subtitle: "Direct Export Logistics", icon: "📞" }
  ];

  return (
    <section className="py-12 px-4 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-navy uppercase tracking-widest text-sm mb-2">Quality You Can Trust</h3>
          <div className="w-12 h-0.5 bg-gold mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {certs.map((cert, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="text-3xl mb-3 opacity-80">{cert.icon}</div>
              <h4 className="font-bold text-navy text-sm mb-1">{cert.title}</h4>
              <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">{cert.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityCertifications;