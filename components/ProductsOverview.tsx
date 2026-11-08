import React from 'react';
import { ViewState } from '../App.tsx';
import { LOCAL_IMAGES } from '../config/mediaAssets';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const productCategories: Array<{
  name: string;
  items: Array<{ name: string; moq: string; lead: string; use: string; target: ViewState }>;
}> = [
  {
    name: 'Hardbound & Oversized Catalogs',
    items: [
      {
        name: 'Wallpaper Catalog Manufacturing (45×45 / 50×50 cm)',
        moq: '50 Books',
        lead: 'Confirmed on Spec Review',
        use: 'Wallcovering Brands & Room-Scene Repeat Books',
        target: 'product-wallpaper-catalog',
      },
      {
        name: 'Upholstery Swatch Books',
        moq: '50 Books',
        lead: 'Confirmed on Spec Review',
        use: 'Furniture & Furnishing Showrooms',
        target: 'product-upholstery',
      },
      {
        name: 'Curtain Fabric Albums',
        moq: '40 Albums',
        lead: 'Confirmed on Spec Review',
        use: 'Wholesale Drapery & Window Displays',
        target: 'product-curtain',
      },
    ],
  },
  {
    name: 'Showroom Cascades & Portable Systems',
    items: [
      {
        name: 'Waterfall Swatch Cards',
        moq: '100 Units',
        lead: 'Confirmed on Spec Review',
        use: 'Multi-Colorway Fabric & Wallpaper Cascades',
        target: 'product-waterfall',
      },
      {
        name: 'Fabric Hanger Swatches',
        moq: '100 Hangers',
        lead: 'Confirmed on Spec Review',
        use: 'Showroom Hanging Racks',
        target: 'product-hanger',
      },
      {
        name: 'Ring Swatch Sets',
        moq: '75 Sets',
        lead: 'Confirmed on Spec Review',
        use: 'Field Sales Representative Kits',
        target: 'product-ring',
      },
      {
        name: 'Sample Cards & Shade Folders',
        moq: '200 Cards',
        lead: 'Confirmed on Spec Review',
        use: 'Trade Mailers & Architectural Binders',
        target: 'product-cards',
      },
    ],
  },
];

const ProductsOverview: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2849] mb-6">
            Fabric &amp; Wallpaper Presentation Solutions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Compare our full range of custom wallpaper catalogs, upholstery swatch books, waterfall hangers, and shade cards delivered through our managed OEM network coordinated from Thane Bhiwandi, PIN: 421302, Maharashtra, India.
          </p>
        </div>
      </section>

      {/* Featured Product Cards */}
      <section className="pb-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div
            onClick={() => onNavigate('product-wallpaper-catalog')}
            className="group cursor-pointer rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition flex flex-col sm:flex-row bg-softgray"
          >
            <div className="sm:w-1/2 aspect-[4/3] sm:aspect-auto overflow-hidden bg-navy/5">
              <img
                src={LOCAL_IMAGES.wallpaperBook}
                alt="Custom Hardbound Wallpaper Catalog Book with Room-Scene Separator Pages - SamplingHub Thane-Bhiwandi"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-teal/10 text-teal text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Featured Line • MOQ 50 Books
                </span>
                <h2 className="text-2xl font-black text-navy mb-3 group-hover:text-gold transition">
                  Wallpaper Catalog Manufacturing
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Oversized 45×45 cm &amp; 50×50 cm post-bound and buckram hardbound books with full-color room-scene visualizer sheets for 300–500+ GSM wallcoverings.
                </p>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-teal group-hover:text-navy">
                Explore Wallpaper Catalogs →
              </span>
            </div>
          </div>

          <div
            onClick={() => onNavigate('product-waterfall')}
            className="group cursor-pointer rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition flex flex-col sm:flex-row bg-softgray"
          >
            <div className="sm:w-1/2 aspect-[4/3] sm:aspect-auto overflow-hidden bg-navy/5">
              <img
                src={LOCAL_IMAGES.waterfallHanger}
                alt="SamplingHub Custom Waterfall Swatch Hanger with Metal Hook and Header Card"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="sm:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-gold/20 text-navy text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Showroom Drops • MOQ 100 Units
                </span>
                <h2 className="text-2xl font-black text-navy mb-3 group-hover:text-gold transition">
                  Waterfall &amp; Full-Drop Hanger Systems
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Precision-stepped waterfall cascades and full-drop showroom hangers engineered for upholstery, drapery, and textured wallcovering collections.
                </p>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-teal group-hover:text-navy">
                Explore Waterfall Systems →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <h2 className="text-2xl font-bold text-[#1a2849] mb-8">Detailed Comparison</h2>
          <table className="w-full bg-white rounded-2xl shadow-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#1e3a5f] text-white">
                <th className="p-4 text-left">Product Name</th>
                <th className="p-4 text-left">MOQ</th>
                <th className="p-4 text-left">Lead Time</th>
                <th className="p-4 text-left">Primary Use Case</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productCategories.flatMap((cat) => cat.items).map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-[#1a2849]">
                    <button
                      onClick={() => onNavigate(item.target)}
                      className="hover:text-[#0d7377] text-left transition-colors"
                    >
                      {item.name}
                    </button>
                  </td>
                  <td className="p-4 text-gray-600">{item.moq}</td>
                  <td className="p-4 text-gray-600">{item.lead}</td>
                  <td className="p-4 text-gray-600 italic">{item.use}</td>
                  <td className="p-4 text-center space-x-4">
                    <button
                      onClick={() => onNavigate(item.target)}
                      className="text-[#1e3a5f] font-bold text-sm hover:underline"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => onNavigate('contact-page')}
                      className="text-[#0d7377] font-bold text-sm hover:underline"
                    >
                      Get Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1a2849] mb-6">Endless Customization</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We offer white-label branding, custom screw-post and buckram binding mechanisms, full-color printed interior room-scene visualizer sheets, and imported 3mm–4mm kappa boards wrapped in washable buckram or PU leatherette.
            </p>
            <ul className="space-y-4">
              {[
                'Custom Logo Embossing, Blind Debossing & Gold/Silver Foil Stamping',
                'Heavy-Duty Screw-Post, Concealed Rivet & Hardbound Buckram Spines',
                'Full-Color Printed Interior Room-Scene Visualizer Separator Pages',
                'Bespoke Oversized Dimensions (45×45 cm, 50×50 cm, A3+) for Global Export',
              ].map((opt, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#8B6F47] rounded-full mr-3"></span>
                  {opt}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 aspect-[4/3] bg-gray-100">
            <img
              src={LOCAL_IMAGES.upholsteryBook}
              alt="Custom Hardbound Upholstery Swatch Book with Layered Fabric Swatches - SamplingHub"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e3a5f] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Need a Tailored Solution?</h2>
          <button
            onClick={() => onNavigate('contact-page')}
            className="bg-[#8B6F47] text-white px-10 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
          >
            Start Your Technical Discussion
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsOverview;
