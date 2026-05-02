import React from 'react';
import Link from 'next/link';
import { getAgentUrl } from '../utils/formatters';

export default function PropertyCard({ property }) {
  return (
    <Link 
      href={`/property/${property.id}`}
      className={`group flex flex-col bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${property.isBoosted ? 'border-[#01bf8f] ring-1 ring-[#01bf8f]/20' : 'border-gray-100'}`}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        {property.isBoosted && (
          <div className="absolute top-3 left-3 bg-[#01bf8f] text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            FEATURED
          </div>
        )}
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-bold text-gray-900 shadow-sm pointer-events-none">
          £{property.price.toLocaleString()}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-[#01bf8f] transition-colors">{property.title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-1">{property.address}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 font-medium mb-4">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            {property.bedrooms} Bed
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
            {property.bathrooms} Bath
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img src={property.agent.logo} alt={property.agent.name} className="w-6 h-6 rounded-full border border-gray-200" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">{property.agent.name}</span>
              {property.agent.branchName && (
                <span className="text-[10px] text-gray-400 font-medium leading-tight">{property.agent.branchName}</span>
              )}
            </div>
          </div>
          <div className="text-[#01bf8f] text-sm font-bold">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}

