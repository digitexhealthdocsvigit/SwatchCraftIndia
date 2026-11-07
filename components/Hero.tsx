import React from 'react';
import { ViewState } from '../App.tsx';
import { ProductMediaCarousel } from './ProductMediaCarousel';
import { HERO_MEDIA } from '../config/mediaAssets';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<Props> = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.35fr_1fr] gap-12 items-center">
        <div className="z-10 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e3a5f] leading-tight mb-6">
            Custom Fabric Swatch Book &amp; Wallpaper Catalog{' '}
            <span className="text-[#8B6F47]">Manufacturer in Thane-Bhiwandi, Maharashtra</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
            Maharashtra-based manufacturer of export-ready wallpaper catalog books, upholstery fabric sample albums, waterfall hangers, and rigid swatch cards with white-label branding and 21–28 day export delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => onNavigate('contact-page')}
              className="bg-[#0d7377] hover:bg-[#084b4e] text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
            >
              Request Export Quote
            </button>
            <button
              onClick={() => onNavigate('product-wallpaper-catalog')}
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-bold py-4 px-8 rounded-lg transition-all"
            >
              Wallpaper Catalogs
            </button>
          </div>
        </div>

        <div className="relative">
          <ProductMediaCarousel
            items={HERO_MEDIA}
            badge="Export Quality • Thane-Bhiwandi"
          />
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f9fafb] -z-10 transform skew-x-[-15deg] translate-x-1/2"></div>
    </section>
  );
};

export default Hero;
