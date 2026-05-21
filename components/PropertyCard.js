import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FavouriteButton from './FavouriteButton';

function PopupCard({ property, onClose }) {
  return (
    <div className="relative font-sans">
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
        className="block overflow-hidden group cursor-pointer"
      >
        <div className="relative h-44 w-full min-w-[180px]">
          <Image
            src={property.images?.[0] || property.mainImage}
            alt={property.title}
            fill
            sizes="280px"
            className="object-cover"
          />
          {property.isBoosted && (
            <div className="absolute top-2.5 left-2.5 bg-[#7a9c72] text-white text-[10px] font-black px-2 py-1 rounded shadow-sm">
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

  if (isPopup) return <PopupCard property={property} onClose={onClose} />;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/property/${property.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/property/${property.id}`)}
      onMouseEnter={() => onHover?.(property.id)}
      onMouseLeave={() => onLeave?.()}
      className="font-sans block group cursor-pointer transition-all duration-300 w-full bg-white hover:-translate-y-1"
    >
      <div className="relative h-48 rounded-[20px] overflow-hidden">
        <Image
          src={property.images?.[0] || property.mainImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {property.isBoosted && (
          <div className="absolute top-3 left-3 bg-[#7a9c72] text-white text-[10px] font-black px-2 py-1 rounded shadow-sm z-10">
            FEATURED
          </div>
        )}
        <FavouriteButton propertyId={property.id} className="absolute top-3 right-3 z-10" />
      </div>
      <div className="p-3">
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
