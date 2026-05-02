import React from 'react';
import Link from 'next/link';

export default function PropertyMapCard({ property, isPopup = false }) {
  return (
    <Link 
      href={`/property/${property.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-sans overflow-hidden block group cursor-pointer transition-all duration-300 ${isPopup ? 'w-48 m-[-14px]' : 'w-full bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1'}`}
    >
      <div className={`relative ${isPopup ? 'h-24' : 'h-48'}`}>
        <img 
          src={property.images[0] || property.mainImage} 
          alt={property.title} 
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105" 
        />
        {!isPopup && property.isBoosted && (
          <div className="absolute top-3 left-3 bg-[#01bf8f] text-white text-[10px] font-black px-2 py-1 rounded shadow-sm z-10">
            FEATURED
          </div>
        )}
      </div>
      <div className="p-3">
        <div className={`font-black text-gray-900 ${isPopup ? 'text-sm mb-0.5' : 'text-lg mb-1'}`}>
          {property.priceText || `£${property.price.toLocaleString()}`}
        </div>
        <div className={`text-gray-500 font-medium line-clamp-1 ${isPopup ? 'text-[10px] mb-2' : 'text-sm mb-4'}`}>
          {property.title}
        </div>
        <div className={`font-black text-[#01bf8f] ${isPopup ? 'text-[10px]' : 'text-sm'}`}>
          View Details
        </div>
      </div>
    </Link>
  );
}
