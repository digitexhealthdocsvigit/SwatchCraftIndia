import React from 'react';

const TrustBar: React.FC = () => {
  const items = [
    { icon: '⏱️', text: '21-28 Day Production' },
    { icon: '🌍', text: 'Export to 15+ Countries' },
    { icon: '🏆', text: '10+ Years Experience' },
    { icon: '🏭', text: 'MOQ: 50 Books' },
  ];

  return (
    <div className="bg-[#f8f9fa] py-8 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-center lg:justify-start space-x-4 group border-r border-gray-200 last:border-r-0 h-full">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-[#2c3e50] text-sm font-bold tracking-wide group-hover:text-[#c9a86a] transition-colors">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;