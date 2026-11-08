import React from 'react';
import { ViewState } from '../App.tsx';
import { LOCAL_IMAGES } from '../config/mediaAssets';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const projects = [
  {
    title: 'Botanical & Room-Scene Wallpaper Book',
    client: 'European Wallcovering Editor',
    category: 'Wallpaper Catalog Manufacturing',
    image: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Hardbound Wallpaper Catalog Book with Room-Scene Separator Pages - SamplingHub Thane-Bhiwandi',
  },
  {
    title: 'Commercial Damask & Geometric Wallcoverings',
    client: 'Hospitality Decor Distributor UAE',
    category: 'Wallcovering Sample Drops',
    image: LOCAL_IMAGES.wallpaperRollDisplay,
    alt: 'Commercial Wallcovering & Textured Wallpaper Sample Drops Display',
  },
  {
    title: 'Italian Luxury Velvet & Jacquard Series',
    client: 'Upholstery & Furniture Editor (EU)',
    category: 'Upholstery Swatch Books',
    image: LOCAL_IMAGES.upholsteryBook,
    alt: 'Custom Hardbound Velvet & Boucle Upholstery Swatch Book - SamplingHub',
  },
  {
    title: 'Dubai Hotel Drapery & Curtain Range',
    client: 'Hospitality Drapery Distributor (UAE)',
    category: 'Curtain Fabric Albums',
    image: LOCAL_IMAGES.curtainAlbum,
    alt: 'Large Format Post-Bound Curtain Fabric Album for Hospitality Projects',
  },
  {
    title: 'Showroom Multi-Drop Cascade System',
    client: 'Architectural Textile Showroom',
    category: 'Waterfall Hangers',
    image: LOCAL_IMAGES.waterfallHanger,
    alt: 'Chrome Swivel Waterfall Swatch Hangers for Textile Showrooms',
  },
  {
    title: 'Precision Sample Cards & Storyboards',
    client: 'Commercial Interior Specifier (UK)',
    category: 'Sample Cards',
    image: LOCAL_IMAGES.sampleCardsStoryboard,
    alt: 'Precision Die-Cut Fabric Sample Storyboards and Presentation Cards',
  },
];

const PortfolioPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen pb-20 w-full overflow-x-hidden">
      <section className="pt-28 pb-16 bg-[#1e3a5f] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#c9a86a] font-black uppercase tracking-[0.3em] text-[10px] mb-4 inline-block bg-white/10 px-4 py-1.5 rounded-full">
            Export Manufacturing Track Record
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight break-words max-w-4xl mx-auto">
            Our Production Portfolio
          </h1>
          <p className="text-gray-200 max-w-3xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
            Custom fabric and wallpaper swatch presentation systems coordinated through our managed OEM partner network for international textile brands across USA, EU, UK, and UAE.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer" onClick={() => onNavigate('contact-page')}>
              <div className="aspect-[4/3] bg-gray-100 rounded-[2.5rem] overflow-hidden border border-gray-100 mb-6 relative shadow-sm group-hover:shadow-2xl transition-all">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white text-[11px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {p.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">
                {p.title}
              </h3>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{p.client}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-navy mb-4 uppercase tracking-tighter">
            Ready to Manufacture Your Wallpaper or Fabric Collection?
          </h2>
          <p className="text-gray-600 font-medium mb-8">
            Send your swatch dimensions, binding preferences, or existing reference photos for a free technical prototype consultation.
          </p>
          <button
            onClick={() => onNavigate('contact-page')}
            className="bg-teal text-white font-black py-5 px-12 rounded-2xl shadow-xl hover:bg-navy transition-all uppercase tracking-widest text-xs"
          >
            Request Technical Quote &amp; Prototype
          </button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
