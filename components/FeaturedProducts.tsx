import React from 'react';
import { ViewState } from '../App.tsx';
import { LOCAL_IMAGES } from '../config/mediaAssets';

const products = [
  {
    id: 'wallpaper-catalog',
    title: 'Wallpaper Catalog Manufacturing',
    badge: 'MOQ: 50 books',
    desc: 'Oversized 45×45 cm & 50×50 cm hardbound wallcovering repeat books with full-color printed interior room-scene visualizer sheets for 300–500+ GSM vinyl, non-woven & grasscloth collections.',
    specs: ['Oversized 45×45 & 50×50 cm', 'Room-Scene Visualizer Leaves', '300–500+ GSM Vinyl & Non-Woven', 'Screw-Post & Buckram Spine'],
    moq: '50 Books',
    leadTime: '21-28 days',
    image: LOCAL_IMAGES.wallpaperBook,
    alt: 'Custom Hardbound Wallpaper Catalog Book with Room-Scene Separator Pages - SamplingHub Thane-Bhiwandi',
    target: 'product-wallpaper-catalog',
  },
  {
    id: 'upholstery',
    title: 'Upholstery Swatch Books',
    badge: 'MOQ: 50 books',
    desc: 'Hardbound or screw-post albums showcasing 20–60 upholstery fabric samples with 3mm kappa board covers, foil branding, and anti-fray pinking.',
    specs: ['Hardbound & Screw-Post', '20-60 fabric capacity', 'Custom foil stamping', 'White-label options'],
    moq: '50 Books',
    leadTime: '21-28 days',
    image: LOCAL_IMAGES.upholsteryBook,
    alt: 'Custom Hardbound Upholstery Swatch Book Manufacturer Thane-Bhiwandi, Maharashtra',
    target: 'product-upholstery',
  },
  {
    id: 'curtain',
    title: 'Curtain Fabric Albums',
    badge: 'MOQ: 40 albums',
    desc: 'Oversized A3+ albums designed for window treatment collections. Features full-drop cascade hangers, room-scene dividers, and protective covers.',
    specs: ['A3/A3+ Large Format', '30-50 swatches', 'Full-drop cascades', 'Showroom durable'],
    moq: '40 Albums',
    leadTime: '24-30 days',
    image: LOCAL_IMAGES.curtainAlbum,
    alt: 'Large Format Curtain Fabric Album Manufacturer for Wholesalers',
    target: 'product-curtain',
  },
  {
    id: 'waterfall',
    title: 'Waterfall Swatch Cards',
    badge: 'MOQ: 100 units',
    desc: 'Cascading multi-colorway presentation systems allowing buyers to view all pattern repeats and shade variations at a single glance.',
    specs: ['25mm-35mm stepped drops', '10-80 cascaded swatches', 'Book-fold or hanger top', 'Export air-freight friendly'],
    moq: '100 Units',
    leadTime: '14-21 days',
    image: LOCAL_IMAGES.waterfallHanger,
    alt: 'Cascading Waterfall Fabric & Wallcovering Sample Drops',
    target: 'product-waterfall',
  },
  {
    id: 'hanger',
    title: 'Fabric Hanger Swatches',
    badge: 'MOQ: 100 hangers',
    desc: 'Showroom display solutions with full-drop fabric or wallcovering samples mounted on heavy-duty headers with chrome or brass hooks.',
    specs: ['Chrome/Brass Swivel Hooks', '3mm Kappa Header Cards', 'Concealed Screw-Posts', 'Showroom rack ready'],
    moq: '100 Hangers',
    leadTime: '18-25 days',
    image: LOCAL_IMAGES.waterfallHanger,
    alt: 'Showroom Waterfall Fabric Swatch Hangers with Custom Header Cards',
    target: 'product-hanger',
  },
  {
    id: 'ring',
    title: 'Ring Swatch Sample Sets',
    badge: 'MOQ: 75 sets',
    desc: 'Portable metal-ring feeler sets and swatch fan decks engineered for field sales representatives and showroom consultations.',
    specs: ['Nickel/Brass Ring Sets', 'Brass Eyelet Reinforced', 'Mailable & Portable', 'Barcode Back Labels'],
    moq: '75 Sets',
    leadTime: '18-24 days',
    image: LOCAL_IMAGES.ringSwatchSet,
    alt: 'Portable Ring-Bound Fabric Swatch Set - SamplingHub',
    target: 'product-ring',
  },
  {
    id: 'cards',
    title: 'Sample Cards & Storyboards',
    badge: 'MOQ: 200 cards',
    desc: 'Precision die-cut 400 GSM rigid cards and multi-fold storyboards with mounted fabric memo swatches for trade mailers and collections.',
    specs: ['350-400 GSM Art Card', 'Bi-Fold & Tri-Fold', 'Die-Cut Swatch Windows', 'Foil Stamped Branding'],
    moq: '200 Cards',
    leadTime: '12-18 days',
    image: LOCAL_IMAGES.sampleCardsStoryboard,
    alt: 'Precision Die-Cut Fabric Sample Memo Cards & Storyboards - SamplingHub',
    target: 'product-cards',
  },
];

const FeaturedProducts: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
  return (
    <section className="py-24 px-4 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 uppercase tracking-tighter">
            Premium Fabric &amp; Wallpaper Presentation
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            Export-quality wallpaper catalogs, upholstery swatch books, waterfall hangers, and showroom displays manufactured in Thane-Bhiwandi for global brands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col group cursor-pointer"
              onClick={() => onNavigate(product.target as ViewState)}
            >
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-6 left-6 bg-gold text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  {product.badge}
                </div>
              </div>
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-navy mb-4 group-hover:text-gold transition-colors uppercase tracking-tight">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed font-medium flex-grow">
                  {product.desc}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 items-center">
                  <div>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Lead Time</p>
                    <p className="text-xs font-black text-navy">{product.leadTime}</p>
                  </div>
                  <span className="text-teal font-black text-[10px] uppercase tracking-widest flex items-center justify-end group-hover:text-gold transition-colors">
                    View Specs →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
