import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Film, Image as ImageIcon } from 'lucide-react';
import { MediaItem, createStudioPlaceholderSvg } from '../config/mediaAssets';

interface ProductMediaCarouselProps {
  items: MediaItem[];
  badge?: string;
  aspectClassName?: string;
}

export const ProductMediaCarousel: React.FC<ProductMediaCarouselProps> = ({
  items,
  badge,
  aspectClassName = 'aspect-[4/3]',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [failedSrcs, setFailedSrcs] = useState<Record<string, boolean>>({});

  if (!items || items.length === 0) return null;

  const safeIndex = activeIndex >= items.length ? 0 : activeIndex;
  const currentItem = items[safeIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const resolveImageSrc = (item: MediaItem) => {
    if (failedSrcs[item.src]) {
      return createStudioPlaceholderSvg(
        item.fallbackTitle || item.alt,
        item.fallbackSubtitle || 'SAMPLING HUB • THANE-BHIWANDI MANUFACTURING',
        item.caption || 'Custom B2B Swatch Book & Catalog Manufacturing'
      );
    }
    return item.src;
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative ${aspectClassName} bg-navy/5 rounded-xl overflow-hidden shadow-lg border border-gray-200 group ${
          currentItem.type === 'image' ? 'cursor-zoom-in' : ''
        }`}
        onClick={() => {
          if (currentItem.type === 'image') {
            setIsZoomed(!isZoomed);
          }
        }}
      >
        {currentItem.type === 'video' ? (
          <video
            key={currentItem.src}
            src={currentItem.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={resolveImageSrc(currentItem)}
            alt={currentItem.alt}
            onError={() =>
              setFailedSrcs((prev) => ({
                ...prev,
                [currentItem.src]: true,
              }))
            }
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105'
            }`}
          />
        )}

        {/* Top-Right Zoom / Media Type Indicator */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-navy shadow-sm pointer-events-none">
          {currentItem.type === 'video' ? (
            <Film className="w-5 h-5 text-teal" />
          ) : (
            <ZoomIn className="w-5 h-5" />
          )}
        </div>

        {/* Optional Top-Left Badge */}
        {badge && (
          <div className="absolute top-4 left-4 bg-navy/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {badge}
          </div>
        )}

        {/* Prev / Next Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous product visual"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-navy shadow-md flex items-center justify-center transition-all opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next product visual"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-navy shadow-md flex items-center justify-center transition-all opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Caption Bar */}
        {currentItem.caption && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy/90 via-navy/65 to-transparent px-4 pt-6 pb-3 text-white pointer-events-none">
            <p className="text-xs sm:text-sm font-medium leading-snug text-gray-100">
              {currentItem.caption}
            </p>
          </div>
        )}
      </div>

      {/* Thumbnail Strip + Slide Counter */}
      {items.length > 1 && (
        <div className="flex items-center justify-between gap-3">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 flex-1">
            {items.map((item, idx) => (
              <button
                key={`${item.src}-${idx}`}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setIsZoomed(false);
                }}
                aria-label={`View media ${idx + 1}: ${item.alt}`}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  safeIndex === idx
                    ? 'border-gold ring-2 ring-gold/25 scale-[1.02]'
                    : 'border-gray-200 hover:border-navy/40 opacity-80 hover:opacity-100'
                }`}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-navy flex flex-col items-center justify-center text-white p-1">
                    <Film className="w-5 h-5 text-gold mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Video</span>
                  </div>
                ) : (
                  <img
                    src={resolveImageSrc(item)}
                    alt={item.alt}
                    onError={() =>
                      setFailedSrcs((prev) => ({
                        ...prev,
                        [item.src]: true,
                      }))
                    }
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-charcoal/70 bg-softgray px-3 py-1.5 rounded-full border border-gray-200">
            <ImageIcon className="w-3.5 h-3.5 text-gold" />
            <span>
              {safeIndex + 1} / {items.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
