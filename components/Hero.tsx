import React from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<Props> = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
        <div className="z-10 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e3a5f] leading-tight mb-6">
            Premium Fabric Swatch Book <span className="text-[#8B6F47]">Manufacturer in Mumbai</span>, India
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl mx-auto lg:mx-0">
            Indian manufacturer of export-ready fabric sample albums with premium presentation, reliable delivery timelines, and white-label branding options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-[#0d7377] hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
            >
              Request Export Quote
            </button>
            <button 
              onClick={() => onNavigate('products-overview')}
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-bold py-4 px-8 rounded-lg transition-all"
            >
              View Our Products
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="w-full aspect-[4/3] bg-[#f3f4f6] rounded-2xl flex items-center justify-center border border-[#e5e7eb] relative overflow-hidden shadow-2xl">
            <div className="flex flex-col items-center text-gray-600 group-hover:text-[#8B6F47] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-semibold px-4 text-center">Premium upholstery fabric swatch book with custom branding by SwatchCraft India</span>
            </div>
            <div className="absolute bottom-0 right-0 bg-[#8B6F47] text-white px-6 py-3 rounded-tl-2xl font-bold shadow-lg">
              Export Quality
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f9fafb] -z-10 transform skew-x-[-15deg] translate-x-1/2"></div>
    </section>
  );
};

export default Hero;