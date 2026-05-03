import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function PopupCard({ property }) {
  return (
    <Link
      href={`/property/${property.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block font-sans overflow-hidden group cursor-pointer"
    >
      <div className="relative h-44 w-[280px]">
        <Image
          src={property.images?.[0] || property.mainImage}
          alt={property.title}
          fill
          sizes="280px"
          className="object-cover"
        />
        {property.isBoosted && (
          <div className="absolute top-2.5 left-2.5 bg-[#f13053] text-white text-[10px] font-black px-2 py-1 rounded shadow-sm">
            FEATURED
          </div>
        )}
      </div>
      <div className="px-5 py-4 bg-white">
        <div className="text-sm font-black text-gray-900 leading-tight">
          {property.priceText || `£${property.price.toLocaleString()}`}
        </div>
        <p className="text-xs font-semibold text-gray-700 line-clamp-1">{property.title}</p>
        <p className="text-[11px] text-gray-400 line-clamp-1 mb-2">{property.address}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-gray-500 font-semibold">
            <span>{property.bedrooms} Bed</span>
            <span className="text-gray-300">·</span>
            <span>{property.bathrooms} Bath</span>
          </div>
          <span className="text-xs font-black text-[#f13053] group-hover:underline">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PropertyMapCard({ property, isPopup = false, onHover, onLeave }) {
  if (isPopup) return <PopupCard property={property} />;

  return (
    <Link
      href={`/property/${property.id}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => onHover?.(property.id)}
      onMouseLeave={() => onLeave?.()}
      className="font-sans overflow-hidden block group cursor-pointer transition-all duration-300 w-full bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative h-48">
        <Image
          src={property.images?.[0] || property.mainImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
        />
        {property.isBoosted && (
          <div className="absolute top-3 left-3 bg-[#f13053] text-white text-[10px] font-black px-2 py-1 rounded shadow-sm z-10">
            FEATURED
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="font-black text-gray-900 text-lg mb-1">
          {property.priceText || `£${property.price.toLocaleString()}`}
        </div>
        <div className="text-gray-500 font-medium line-clamp-1 text-xs mb-1">
          {property.title}
        </div>
        <p className="text-gray-400 text-xs mb-3 line-clamp-1">{property.address}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-3">
          <span>{property.bedrooms} Bed</span>
          <span className="text-gray-300">·</span>
          <span>{property.bathrooms} Bath</span>
        </div>
        <div className="font-black text-[#f13053] text-sm">
          View Details
        </div>
      </div>
    </Link>
  );
}
