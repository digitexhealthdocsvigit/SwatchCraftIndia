import React from 'react';

const QualityCertifications: React.FC = () => {
  const certs = [
    { title: 'Export-Grade QC', subtitle: 'Documented Quality Checks', icon: '🛡️' },
    { title: 'Established 2011', subtitle: 'Managed OEM Solutions', icon: '🏛️' },
    { title: 'Multi-Stage Inspection', subtitle: 'Centralised Quality Verification', icon: '🔍' },
    { title: 'Dedicated Coordination', subtitle: 'Thane-Bhiwandi Export Hub', icon: '📞' },
  ];

  return (
    <section className="py-12 px-4 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f] uppercase tracking-widest text-sm mb-2">
            Centralised Quality Coordination
          </h2>
          <div className="w-12 h-0.5 bg-[#8B6F47] mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {certs.map((cert, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="text-3xl mb-3 opacity-80">{cert.icon}</div>
              <h3 className="font-bold text-[#1e3a5f] text-sm mb-1">{cert.title}</h3>
              <p className="text-gray-600 text-[11px] font-semibold uppercase tracking-wider">
                {cert.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityCertifications;
