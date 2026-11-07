import React from 'react';
import { LOCAL_IMAGES } from '../config/mediaAssets';

const galleryItems = [
  {
    title: 'Hardbound Wallpaper Catalogs',
    category: 'Wallcoverings',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Hardbound Wallpaper Catalog Book with Room-Scene Separator Pages - SamplingHub Thane-Bhiwandi',
  },
  {
    title: 'Commercial Wallcovering Drops',
    category: 'Showroom Cascades',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Commercial Wallcovering & Textured Wallpaper Sample Drops Display',
  },
  {
    title: 'Upholstery Book Binding',
    category: 'Upholstery',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Hardbound Fabric Swatch Book Manufacturer Thane-Bhiwandi Plant',
  },
  {
    title: 'Curtain Presentation Albums',
    category: 'Curtains & Drapery',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'A3 Large Format Curtain Drapery Fabric Album for Exporters',
  },
  {
    title: 'Cascading Waterfall Cards',
    category: 'Waterfall Systems',
    src: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Tiered Waterfall Fabric & Wallcovering Swatch Palette on Rigid Cardstock',
  },
  {
    title: 'Room-Scene Visualizer Binders',
    category: 'Custom Branding',
    src: LOCAL_IMAGES.wallpaperBook,
    alt: 'Luxury Buckram Swatch Album with Full-Color Room-Scene Visualizer Sheet',
  },
];

const Gallery: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#8B6F47] font-black uppercase tracking-[0.4em] text-[11px] mb-4 inline-block">
            Visual Standards
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-navy mb-4 uppercase tracking-tighter leading-none">
            Production Excellence
          </h2>
          <div className="w-16 h-1 bg-[#8B6F47] mx-auto mb-8"></div>
          <p className="text-gray-700 max-w-2xl mx-auto font-medium text-lg">
            A glimpse into our 6,000 sq ft manufacturing facility in Thane-Bhiwandi, Maharashtra, where precision bookbinding meets world-class textile and wallcovering presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[2.5rem] aspect-square bg-gray-100 transition-all hover:shadow-2xl cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-8 translate-y-4 group-hover:translate-y-0 backdrop-blur-sm">
                <span className="text-[#8B6F47] text-[11px] font-black uppercase tracking-[0.3em] mb-4">
                  {item.category}
                </span>
                <h3 className="text-white text-2xl font-black mb-6 uppercase tracking-tighter leading-tight">
                  {item.title}
                </h3>
                <div className="w-10 h-0.5 bg-white/20 mb-8"></div>
                <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-navy transition-all">
                  Request Case Study
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
