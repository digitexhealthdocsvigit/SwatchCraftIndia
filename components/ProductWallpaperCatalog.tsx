import React, { useState } from 'react';
import {
  Check,
  Download,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Layers,
  BookOpen,
  ShieldCheck,
  Sparkles,
  FileText,
  X,
  MessageCircle,
} from 'lucide-react';
import { useGlobalSettings } from './GlobalSettingsContext';
import { ProductMediaCarousel } from './ProductMediaCarousel';
import { WALLPAPER_CATALOG_MEDIA, LOCAL_IMAGES } from '../config/mediaAssets';

interface ProductWallpaperCatalogProps {
  onNavigate: (page: string) => void;
  onDownload: (assetName: string) => void;
}

export const ProductWallpaperCatalog: React.FC<ProductWallpaperCatalogProps> = ({
  onNavigate,
  onDownload,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const { formatPrice } = useGlobalSettings();

  const whatsappInquiryUrl = `https://wa.me/919004962871?text=${encodeURIComponent(
    'Hello Sampling Hub (Thane-Bhiwandi), I would like an export quote for Custom Wallpaper Catalog Manufacturing.\n\n• Product: Oversized Hardbound Wallpaper Catalog Books (45x45 cm / 50x50 cm)\n• Wallcovering Weight: 300–500+ GSM Vinyl / Non-Woven / Embossed\n• Features: Full-color Room-Scene Visualizer Sheets + Stepped Coordinate Swatches\n• Estimated Quantity: [Please specify, MOQ 50 books]'
  )}`;

  const specs = [
    {
      label: 'Standard Catalog Sizes',
      value: 'Oversized 45x45 cm, 50x50 cm, and custom wide-width repeat albums with full-color printed interior room-scene visualizer sheets and die-cut window frames',
    },
    {
      label: 'Cover Board Construction',
      value: '3mm–4mm imported rigid kappa board wrapped in washable buckram, linen, or PU leatherette with gold/silver hot-foil stamping, blind debossing, and metal corner protectors',
    },
    {
      label: 'Cover Wrap Materials',
      value: 'Washable Acrylic-Coated Buckram, Textured Linen, Imported PU Leatherette, or Soft-Touch Laminated Print',
    },
    {
      label: 'Binding Systems',
      value: 'Heavy-Duty Screw-Post (Post-Bound), Hardbound Buckram Bookbinding, & Concealed Rivet Systems engineered for 300–500+ GSM vinyl, non-woven, grasscloth, and embossed wallcoverings',
    },
    {
      label: 'Supported Wallcovering Weights',
      value: '300 GSM to 500+ GSM Heavy Vinyl, Non-Woven, Grasscloth, Textile Wallcovering & Deep Embossed Foil',
    },
    {
      label: 'Interior Room-Scene Sheets',
      value: '250–300 GSM Matte/Satin Art Paper with High-Resolution Offset Room-Scene Photography & Die-Cut Overlays',
    },
    {
      label: 'Sample Capacity',
      value: '40 – 90 Full-Repeat Wallpaper Sheets + Stepped Coordinate Border & Colorway Waterfall Strips',
    },
    {
      label: 'Branding & Finishing',
      value: 'Gold/Silver Hot-Foil Stamping, Blind Debossing, Spot UV, Heavy-Duty Brass/Nickel Corner Protectors & Carry Cord',
    },
    {
      label: 'Back-of-Sheet Labeling',
      value: 'Custom Printed Technical Spec Stickers (Roll Width, Pattern Repeat, Match Type, Fire Rating, Washability Icons)',
    },
    {
      label: 'Minimum Order Quantity (MOQ)',
      value: '50 Books per Collection Title',
    },
    {
      label: 'Production Lead Time',
      value: '21–28 Business Days from Thane Bhiwandi, PIN: 421302, Maharashtra, India Facility',
    },
    {
      label: 'Export Packaging',
      value: 'Individual Shrink-Wrap + Foam Corner Guards + 5-Ply Master Corrugated Export Cartons on Fumigated Pallets',
    },
  ];

  const faqs = [
    {
      q: 'How do you prevent heavy 400–500 GSM vinyl and grasscloth wallpaper catalogs from spine splitting?',
      a: 'Oversized wallcovering books exert immense torque on the spine when flipped in showrooms. We engineer our wallpaper catalogs using 3mm to 4mm high-density imported kappa board paired with concealed heavy-gauge steel/brass screw-posts (Chicago screws) and reinforced buckram spine hinges. Each wallpaper leaf is precision-creased near the binding margin so pages open flat without stressing the spine.',
    },
    {
      q: 'Can you print and bind full-color interior room-scene visualizer sheets between wallpaper patterns?',
      a: 'Yes! As shown in our showroom catalog photography, we produce high-definition offset-printed room-scene separator sheets (250–300 GSM art paper with matte or anti-scuff lamination) and bind them directly ahead of each pattern group or stepped coordinate strip—allowing buyers and interior designers to visualize the wallcovering installed in a real room alongside the physical textured sample.',
    },
    {
      q: 'How do you display multiple colorway coordinates without making the catalog too heavy to lift?',
      a: 'We combine a full-page hero sheet (e.g., 45×45 cm or 50×50 cm showing the full pattern repeat) with a stepped waterfall cascade of colorway strips on the facing or underlying page. This lets buyers inspect the full scale of the damask, botanical, or geometric motif once, while comparing 5 to 12 colorway variants in a compact footprint.',
    },
    {
      q: 'Do you handle precision cutting, pinking, and international wallpaper symbol back-labeling?',
      a: 'Absolutely. You can ship roll stock directly to our Thane-Bhiwandi facility. We guillotine-cut rolls to exact repeat registration, apply custom printed specification labels on the reverse of every sheet (including EN 233 / ASTM washability, peelability, lightfastness, pattern match icons, and barcode), and assemble the complete catalog ready for global distribution.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-softgray border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-xs text-charcoal/70 space-x-2">
            <button onClick={() => onNavigate('home')} className="hover:text-navy transition">
              Home
            </button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => onNavigate('products-overview')} className="hover:text-navy transition">
              Products
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-navy font-semibold">Wallpaper Catalog Manufacturing</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-softgray to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Reusable Media Carousel (60% -> 7 cols) */}
            <div className="lg:col-span-7">
              <ProductMediaCarousel
                items={WALLPAPER_CATALOG_MEDIA}
                badge="Export-Grade Wallcovering Albums"
              />
            </div>

            {/* Right Column: Details (40% -> 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-block bg-teal/10 text-teal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  Commercial & Residential Wallcoverings
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-navy leading-tight font-serif">
                  Custom Wallpaper Catalog & Sample Book Manufacturing
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex text-gold">{'★★★★★'}</div>
                <span className="text-sm font-semibold text-charcoal">
                  4.9/5 (42 wallcovering brands & distributors)
                </span>
              </div>

              {/* Specs List */}
              <ul className="space-y-3 border-y border-gray-200 py-6">
                {[
                  'Oversized 45×45 cm & 50×50 cm formats engineered for full wallpaper pattern repeats',
                  'Full-color printed interior room-scene visualizer sheets + stepped coordinate waterfalls',
                  'Heavy-duty screw-post & 3mm–4mm rigid kappa board spine for 300–500+ GSM vinyl & grasscloth',
                  'Precision repeat registration cutting, EN/ASTM symbol back-labeling & metal corner guards',
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-charcoal">
                    <Check className="w-5 h-5 text-teal mr-3 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing & MOQ */}
              <div className="bg-softgray p-5 rounded-xl border border-gray-200 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-charcoal/70 font-medium">Wholesale Direct Price</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-navy font-mono">
                      Starting from {formatPrice(120)}
                    </span>
                    <span className="text-xs text-charcoal/70 block">/book (for 100+ units)</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between text-xs text-charcoal/80">
                  <span>
                    <strong>MOQ:</strong> 50 books
                  </span>
                  <span>
                    <strong>Lead Time:</strong> 21–28 days (Thane-Bhiwandi)
                  </span>
                </div>
              </div>

              {/* Primary CTA Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onNavigate('contact-page')}
                  className="w-full bg-gold hover:bg-[#b89558] text-navy font-bold py-4 px-6 rounded-lg shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center text-base"
                >
                  Request Export Quote <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3.5 px-6 rounded-lg shadow-md transition flex items-center justify-center text-sm"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Direct Inquiry (+91 90049 62871)
                </a>
                <button
                  onClick={() => onDownload('Wallpaper Catalog Spec Sheet')}
                  className="w-full bg-white hover:bg-gray-50 text-navy border-2 border-navy font-bold py-3 px-6 rounded-lg transition flex items-center justify-center text-sm"
                >
                  <Download className="w-4 h-4 mr-2" /> Download Wallpaper Catalog Spec Sheet (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Detailed Description */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-6 font-serif">
            Showroom-Grade Wallpaper & Wallcovering Catalogs Built for Heavy Commercial Repeat Books
          </h2>
          <div className="prose prose-lg text-charcoal/80 space-y-6 leading-relaxed">
            <p>
              Unlike standard textile folders, a wallpaper catalog must showcase wide-scale architectural repeats, delicate embossed reliefs, and metallic inks while enduring thousands of showroom flips. At our <strong>Thane Bhiwandi, PIN: 421302, Maharashtra, India</strong> production facility, we manufacture oversized hardbound wallpaper books designed specifically for residential wallpaper editors, hospitality wallcovering specifiers, and international home decor distributors.
            </p>
            <p>
              Our binding lines process everything from <strong>300–500+ GSM commercial Type II vinyl and acoustic non-wovens</strong> to delicate natural sisal, grasscloth, and flocked damask wallcoverings. Every sheet is guillotine-cut in strict pattern repeat registration so vertical drops and horizontal matches align cleanly from leaf to leaf.
            </p>
            <p>
              To maximize showroom conversion, we integrate <strong>full-color offset-printed interior room-scene visualizer pages</strong> directly into the binding sequence—pairing lifestyle photography of the installed wallpaper with stepped coordinate border strips and textured primary sheets, exactly as required by leading European, US, and Middle Eastern wallcovering houses.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications Table */}
      <section className="py-16 bg-softgray">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy font-serif mb-3">
              B2B Technical Specifications
            </h2>
            <p className="text-charcoal/70">
              Engineered for heavy 300–500+ GSM wallcovering collections and global export transit
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {specs.map((spec, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-1 md:grid-cols-3 p-4 sm:px-6 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-softgray/50'
                  }`}
                >
                  <div className="font-semibold text-navy text-sm md:col-span-1">{spec.label}</div>
                  <div className="text-charcoal/80 text-sm md:col-span-2 mt-1 md:mt-0">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Binding & Interior Page Architecture */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy font-serif mb-3">
              Binding Systems & Interior Page Architecture
            </h2>
            <p className="text-charcoal/70">
              Purpose-built structures for oversized wallcovering repeat books and showroom displays
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Layers,
                title: 'Heavy-Duty Screw-Post Spine',
                desc: 'Concealed brass or nickel Chicago screw-posts anchored through reinforced 4mm kappa board hinges—built to hold 60–90 sheets of 500 GSM vinyl without tearing.',
              },
              {
                icon: BookOpen,
                title: 'Room-Scene Visualizer Leaves',
                desc: 'Full-color printed interior room-scene separator sheets (as featured in our catalog showcase) that help retail buyers visualize scale, lighting, and furniture pairing.',
              },
              {
                icon: Sparkles,
                title: 'Stepped Coordinate Waterfalls',
                desc: 'Precision-stepped colorway and companion border strips mounted alongside full-repeat master sheets so designers can compare entire color families at a glance.',
              },
              {
                icon: ShieldCheck,
                title: 'Washable Buckram & Metal Corners',
                desc: '3mm–4mm imported rigid board wrapped in washable buckram or PU leatherette with gold/silver hot-foil stamping, blind debossing, and protective metal corners.',
              },
            ].map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-12 h-12 bg-navy/5 rounded-lg flex items-center justify-center text-gold mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{opt.title}</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{opt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Ideal For / Use Cases */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold font-serif mb-3">
              Engineered for Global Wallcovering Brands & Editors
            </h2>
            <p className="text-gray-300">
              Trusted by architectural wallcovering manufacturers, OEM mills, and interior distribution networks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Residential Wallpaper Editors & Brands',
                desc: 'Launch seasonal damask, botanical, geometric, and kids’ wallpaper collections with luxury room-scene separator pages and color-coordinated waterfall strips.',
              },
              {
                title: 'Commercial & Hospitality Type II Vinyl Suppliers',
                desc: 'Showcase heavy 400–500+ GSM fire-rated contract wallcoverings, acoustic textiles, and embossed murals for hotel, healthcare, and corporate architects.',
              },
              {
                title: 'Wallcovering Roll Mills & Export Converters',
                desc: 'Ship bulk master rolls to our Thane-Bhiwandi plant for turnkey repeat-registration sheeting, back-label printing, and export-ready bookbinding.',
              },
              {
                title: 'Home Decor Retail Chains & Design Franchises',
                desc: 'Equip 50 to 1,000+ dealer showrooms simultaneously with durable, standardized catalog books protected by washable buckram covers and steel corner guards.',
              },
            ].map((useCase, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-gold mb-2 flex items-center">
                  <Check className="w-5 h-5 mr-2 text-teal shrink-0" />
                  {useCase.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed pl-7">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Pricing Structure */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy font-serif mb-3">
              Volume Pricing Structure
            </h2>
            <p className="text-charcoal/70">
              Factory-direct wholesale tiers from our Thane-Bhiwandi manufacturing unit
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-navy text-white text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold">Order Volume</th>
                    <th className="p-4 font-semibold">Price Per Book</th>
                    <th className="p-4 font-semibold">Production Lead Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  <tr className="hover:bg-softgray/50">
                    <td className="p-4 font-medium text-navy">50 – 99 books</td>
                    <td className="p-4 font-mono font-bold text-charcoal">
                      {formatPrice(148)} – {formatPrice(165)} / book
                    </td>
                    <td className="p-4 text-charcoal/80">21 business days</td>
                  </tr>
                  <tr className="hover:bg-softgray/50 bg-gold/5">
                    <td className="p-4 font-medium text-navy flex items-center">
                      100 – 249 books
                      <span className="ml-2 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Popular
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-navy">
                      {formatPrice(125)} – {formatPrice(142)} / book
                    </td>
                    <td className="p-4 text-charcoal/80">21–24 business days</td>
                  </tr>
                  <tr className="hover:bg-softgray/50">
                    <td className="p-4 font-medium text-navy">250 – 499 books</td>
                    <td className="p-4 font-mono font-bold text-charcoal">
                      {formatPrice(112)} – {formatPrice(124)} / book
                    </td>
                    <td className="p-4 text-charcoal/80">24–28 business days</td>
                  </tr>
                  <tr className="hover:bg-softgray/50">
                    <td className="p-4 font-medium text-navy">500+ books</td>
                    <td className="p-4 font-mono font-bold text-teal">
                      Custom Export Enterprise Quote
                    </td>
                    <td className="p-4 text-charcoal/80">28 business days (Staggered Dispatch Available)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-charcoal/60 text-center italic mb-8">
            *Final pricing depends on book dimensions (e.g., 45×45 cm vs. 50×50 cm), sheet count, number of printed room-scene visualizer inserts, and foil-stamping complexity.
          </p>
          <div className="text-center">
            <button
              onClick={() => setShowPricingModal(true)}
              className="inline-flex items-center justify-center bg-navy hover:bg-navy/90 text-white font-bold py-3 px-8 rounded-lg shadow transition text-sm"
            >
              <FileText className="w-4 h-4 mr-2" /> View Complete Wallpaper Catalog Price Matrix
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Matrix Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 md:p-8 shadow-2xl relative my-8 max-h-[90vh] flex flex-col">
            <button
              onClick={() => setShowPricingModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-navy transition p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <div className="inline-block bg-gold/20 text-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                B2B Wholesale Guide
              </div>
              <h3 className="text-2xl font-bold text-navy font-serif">
                Complete Price Matrix: Wallpaper Catalog Manufacturing
              </h3>
              <p className="text-sm text-charcoal/70">
                Estimated unit pricing based on catalog footprint, page count, and room-scene visualizer inserts.
              </p>
            </div>

            <div className="overflow-y-auto flex-grow pr-2 space-y-6">
              <div>
                <h4 className="font-bold text-navy mb-3 text-sm uppercase tracking-wider border-b pb-2">
                  1. Standard 45×45 cm Hardbound Catalog (3.5mm Board + Buckram + Screw-Post)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm border border-gray-200">
                    <thead>
                      <tr className="bg-softgray text-navy">
                        <th className="p-3 border border-gray-200">Wallpaper Sheets</th>
                        <th className="p-3 border border-gray-200">50–99 Units</th>
                        <th className="p-3 border border-gray-200">100–249 Units</th>
                        <th className="p-3 border border-gray-200">250–499 Units</th>
                        <th className="p-3 border border-gray-200">500+ Units</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3 font-medium border border-gray-200">40–50 Sheets</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(135)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(120)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(108)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(96)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium border border-gray-200">51–70 Sheets</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(152)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(134)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(120)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(108)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium border border-gray-200">71–90 Sheets</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(168)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(148)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(132)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(118)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-navy mb-3 text-sm uppercase tracking-wider border-b pb-2">
                  2. Oversized 50×50 cm / 53×53 cm Full-Width Repeat Catalog (4mm Board + PU Leatherette)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm border border-gray-200">
                    <thead>
                      <tr className="bg-softgray text-navy">
                        <th className="p-3 border border-gray-200">Wallpaper Sheets</th>
                        <th className="p-3 border border-gray-200">50–99 Units</th>
                        <th className="p-3 border border-gray-200">100–249 Units</th>
                        <th className="p-3 border border-gray-200">250–499 Units</th>
                        <th className="p-3 border border-gray-200">500+ Units</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3 font-medium border border-gray-200">40–50 Sheets</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(158)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(140)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(126)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(114)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium border border-gray-200">51–70 Sheets</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(176)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(156)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(140)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(126)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium border border-gray-200">71–90 Sheets</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(195)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(172)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(154)}</td>
                        <td className="p-3 font-mono border border-gray-200">{formatPrice(138)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-navy mb-3 text-sm uppercase tracking-wider border-b pb-2">
                  3. Custom Add-Ons & Room-Scene Visualizers
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-softgray/50 rounded-lg border border-gray-200 flex justify-between items-center">
                    <span>Full-Color Room-Scene Insert Sheet</span>
                    <span className="font-mono font-bold text-navy">+{formatPrice(6)} / sheet</span>
                  </div>
                  <div className="p-3 bg-softgray/50 rounded-lg border border-gray-200 flex justify-between items-center">
                    <span>Brass / Nickel Corner Protectors (4 pcs)</span>
                    <span className="font-mono font-bold text-navy">+{formatPrice(8)} / book</span>
                  </div>
                  <div className="p-3 bg-softgray/50 rounded-lg border border-gray-200 flex justify-between items-center">
                    <span>Braided Showroom Carry Handle Cord</span>
                    <span className="font-mono font-bold text-navy">+{formatPrice(10)} / book</span>
                  </div>
                  <div className="p-3 bg-softgray/50 rounded-lg border border-gray-200 flex justify-between items-center">
                    <span>Back-of-Sheet Spec Label Printing & Application</span>
                    <span className="font-mono font-bold text-navy">+{formatPrice(1.5)} / sheet</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-charcoal/60">
                *All prices are EXW Thane-Bhiwandi, Maharashtra, India. Export sea/air freight calculated upon RFQ.
              </p>
              <div className="flex space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setShowPricingModal(false);
                    onNavigate('contact-page');
                  }}
                  className="flex-1 sm:flex-none bg-gold hover:bg-[#b89558] text-navy font-bold py-2.5 px-6 rounded-lg shadow transition text-sm"
                >
                  Request Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 6: FAQ Accordion */}
      <section className="py-16 bg-softgray">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy font-serif mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-charcoal/70">
              Everything you need to know about manufacturing wallpaper & wallcovering sample books
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-navy text-base pr-4">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-gold shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 pt-2 text-charcoal/80 text-sm leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Related Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy font-serif mb-3">
              Complementary Sampling Systems
            </h2>
            <p className="text-charcoal/70">
              Coordinate your wallcovering books with matching drapery & upholstery presentations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Upholstery Swatch Books',
                desc: 'Heavy-duty screw-post and hardbound albums for coordinated furnishing fabrics.',
                img: LOCAL_IMAGES.wallpaperBook,
                link: 'product-upholstery',
              },
              {
                title: 'Curtain & Drapery Catalogs',
                desc: 'Full-drop cascade albums for sheer, blackout, and jacquard window coverings.',
                img: LOCAL_IMAGES.wallpaperRollDisplay,
                link: 'product-curtain',
              },
              {
                title: 'Waterfall Hanger Samples',
                desc: 'Showroom rack cascades for multi-colorway textile and wallcovering lines.',
                img: LOCAL_IMAGES.wallpaperRollDisplay,
                link: 'product-waterfall',
              },
            ].map((prod, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={prod.img}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy mb-2">{prod.title}</h3>
                  <p className="text-sm text-charcoal/70 mb-4">{prod.desc}</p>
                  <button
                    onClick={() => onNavigate(prod.link)}
                    className="text-teal font-semibold text-sm flex items-center hover:text-navy transition"
                  >
                    View Specifications <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-[#152943] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">
            Ready to Manufacture Your Next Wallpaper Collection Catalog?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Send us your roll count, sheet dimensions (45×45 cm or 50×50 cm), and room-scene insert requirements for a factory-direct export quotation within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact-page')}
              className="w-full sm:w-auto bg-gold hover:bg-[#b89558] text-navy font-bold py-4 px-10 rounded-lg shadow-xl transition transform hover:-translate-y-1 text-lg"
            >
              Request Export Quote →
            </button>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-4 px-8 rounded-lg shadow-xl transition flex items-center justify-center text-base"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Direct (+91 90049 62871)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductWallpaperCatalog;

