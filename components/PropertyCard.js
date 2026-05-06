import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useFavourites } from "../context/FavouritesContext";
import { getAgentUrl } from "../utils/formatters";

export default function PropertyCard({ property }) {
  const router = useRouter();
  const { user } = useAuth();
  const { isFavourite, toggleFavourite } = useFavourites();
  const favourited = isFavourite(property.id);

  const handleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }
    toggleFavourite(property.id);
  };

  return (
    <Link
      href={`/property/${property.id}`}
      className={`group flex flex-col bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${property.isBoosted ? "border-[#f13053] ring-1 ring-[#f13053]/20" : "border-gray-100"}`}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        {property.isBoosted && (
          <div className="absolute top-3 left-3 bg-[#f13053] text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            FEATURED
          </div>
        )}
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-bold text-gray-900 shadow-sm pointer-events-none">
          £{property.price.toLocaleString()}
        </div>

        {/* Favourite button */}
        <button
          onClick={handleFavourite}
          aria-label={favourited ? "Remove from favourites" : "Add to favourites"}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-colors"
            viewBox="0 0 24 24"
            fill={favourited ? "#f13053" : "none"}
            stroke={favourited ? "#f13053" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-[#f13053] transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-1">
          {property.address}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 font-medium mb-4">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {property.bedrooms} Bed
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14v3a3 3 0 01-3 3H8a3 3 0 01-3-3v-3zM7 6V5a1 1 0 112 0v1h6V5a1 1 0 112 0v1a2 2 0 01-2 2H9a2 2 0 01-2-2z"
              />
            </svg>
            {property.bathrooms} Bath
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
              <Image
                src={property.agent.logo}
                alt={property.agent.name}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">
                {property.agent.name}
              </span>
              {property.agent.branchName && (
                <span className="text-[10px] text-gray-400 font-medium leading-tight">
                  {property.agent.branchName}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
