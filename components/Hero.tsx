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
            Custom Fabric Swatch Book & Presentation Folder <span className="text-[#8B6F47]">Manufacturer in Thane-Bhiwandi, Maharashtra</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
            Maharashtra-based manufacturer of export-ready fabric sample albums, waterfall hangers, and rigid swatch cards with premium presentation, reliable delivery timelines, and white-label branding options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => onNavigate('contact-page')}
              className="bg-[#0d7377] hover:bg-[#084b4e] text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
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
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 relative overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?auto=format&fit=crop&w=800&q=80" 
              alt="Premium Fabric Swatch Book Manufacturer in Thane-Bhiwandi, Maharashtra"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 right-0 bg-[#8B6F47] text-white px-6 py-3 rounded-tl-2xl font-bold shadow-lg text-sm">
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
