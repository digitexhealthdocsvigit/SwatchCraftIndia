import React from 'react';

const ValueProps: React.FC = () => {
  const props = [
    {
      title: "Predictable Timelines",
      description: "We understand export schedules matter. Our standard 21-28 day production timeline includes quality checks and export packaging with tracking for international shipments.",
      badge: "On-Time Delivery Record: 98%",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#0d7377]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "#1 Presentation Quality",
      description: "Premium hardbound albums, professional ring binding, printed fabric labels, composition tags, and custom branding. Your samples represent your brand - we make them exceptional.",
      badge: "ISO 9001 Certified",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#c9a86a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Export Partnership",
      description: "Complete export documentation support, multi-currency pricing (USD/EUR/INR), international shipping expertise, and understanding of regional quality standards.",
      badge: "Serving EU, USA, UAE Since 2015",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#0d7377]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] text-center mb-16">Why Leading Fabric Brands Choose SwatchCraft India</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop, idx) => (
            <div key={idx} className="bg-[#f8f9fa] p-10 rounded-2xl border border-gray-100 hover:shadow-xl transition-all flex flex-col h-full">
              <div className="mb-8">{prop.icon}</div>
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">{prop.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{prop.description}</p>
              <div className="inline-block bg-[#0d7377]/10 text-[#0d7377] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {prop.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;