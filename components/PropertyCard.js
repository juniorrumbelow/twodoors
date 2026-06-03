import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FavouriteButton from './FavouriteButton';

function ImageCarousel({ images, sizes, className }) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const prev = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  const dot = useCallback((e, i) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(i);
  }, []);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ width: `${total * 100}%`, transform: `translateX(-${(index / total) * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="relative h-full" style={{ width: `${100 / total}%` }}>
              <Image src={src} alt="" fill sizes={sizes} className={className} />
            </div>
          ))}
        </div>
      </div>
      {total > 1 && (
        <>
          <div className="absolute left-0 top-0 h-full w-12 z-10" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            {index > 0 && (
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
          </div>
          <div className="absolute right-0 top-0 h-full w-12 z-10" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            {index < total - 1 && (
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => dot(e, i)}
                aria-label={`Image ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function PopupCard({ property, onClose }) {
  const images = property.images?.length ? property.images : [property.mainImage];

  return (
    <div className="relative font-sans group">
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
        <FavouriteButton propertyId={property.id} />
        {onClose && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <Link
        href={`/property/${property.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden cursor-pointer"
      >
        <div className="relative h-44 w-full min-w-[180px]">
          <ImageCarousel
            images={images}
            sizes="280px"
            className="object-cover"
          />
          {property.isBoosted && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-[#fc3559] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 6.9H22l-5.8 4.3 2.2 6.8L12 16l-6.4 4 2.2-6.8L2 8.9h7.6z" />
              </svg>
              FEATURED
            </div>
          )}
        </div>
        <div className="px-5 py-4 bg-white">
          <div className="text-sm font-black text-gray-900 leading-tight mb-1">
            {property.priceText || `£${property.price.toLocaleString()}`}
          </div>
          <p className="text-xs font-semibold text-gray-700 line-clamp-1 mb-2">{property.title}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-semibold">
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            <span>·</span>
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function PropertyCard({ property, isPopup = false, onClose, onHover, onLeave }) {
  const router = useRouter();
  const images = property.images?.length ? property.images : [property.mainImage];

  if (isPopup) return <PopupCard property={property} onClose={onClose} />;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/property/${property.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/property/${property.id}`)}
      onMouseEnter={() => onHover?.(property.id)}
      onMouseLeave={() => onLeave?.()}
      className={`font-sans block group cursor-pointer w-full bg-white ${
        property.isBoosted
          ? 'rounded-[24px] p-1.5 ring-2 ring-[#fc3559] shadow-lg shadow-[#fc3559]/25 transition-shadow hover:shadow-xl hover:shadow-[#fc3559]/40'
          : ''
      }`}
    >
      <div className="relative h-48 rounded-[20px] overflow-hidden">
        <ImageCarousel
          images={images}
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
        {property.isBoosted && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#fc3559] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 6.9H22l-5.8 4.3 2.2 6.8L12 16l-6.4 4 2.2-6.8L2 8.9h7.6z" />
            </svg>
            FEATURED
          </div>
        )}
        <FavouriteButton propertyId={property.id} className="absolute top-3 right-3 z-10" />
      </div>
      <div className={property.isBoosted ? 'px-2 py-3' : 'p-3'}>
        <div className="font-black text-gray-900 text-lg mb-1">
          {property.priceText || `£${property.price.toLocaleString()}`}
        </div>
        <div className="text-gray-500 font-medium line-clamp-1 text-sm mb-1">
          {property.title}
        </div>
        <p className="text-gray-400 text-xs mb-3 line-clamp-1">{property.address}</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          <span>·</span>
          <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
        </div>
      </div>
    </div>
  );
}
