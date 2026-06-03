import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView, InfoWindow } from '@react-google-maps/api';
import PropertyCard from './PropertyCard';

const NORWICH_CENTER = { lat: 52.6309, lng: 1.2974 };
const NORFOLK_BOUNDS = { north: 53.0, south: 52.3, west: 0.28, east: 1.78 };

function PriceBadge({ property, highlighted, onClick }) {
  const price = property.priceText || `£${Math.round(property.price / 1000)}k`;
  const featured = property.isBoosted;
  const baseColor = featured ? '#fc3559' : '#2E3B2E';
  return (
    <div
      onClick={onClick}
      style={{
        transform: highlighted ? 'translate(-50%, -100%) scale(1.25)' : 'translate(-50%, -100%) scale(1)',
        display: 'inline-block',
        background: highlighted ? '#fff' : baseColor,
        color: highlighted ? baseColor : '#fff',
        padding: '4px 10px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: '900',
        whiteSpace: 'nowrap',
        boxShadow: highlighted ? '0 6px 20px rgba(0,0,0,0.45)' : '0 2px 6px rgba(0,0,0,0.2)',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        cursor: 'pointer',
        transition: 'transform 0.15s, background 0.15s, color 0.15s, box-shadow 0.15s',
      }}
    >
      {price}
    </div>
  );
}

export default function PropertyMap({ properties, centerLocation, hoveredId, onSearchArea }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showSearchHere, setShowSearchHere] = useState(false);
  const [isOutsideNorfolk, setIsOutsideNorfolk] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = '.gm-style-iw-chr { display: none !important; } .gm-style-iw, .gm-style-iw-d { overflow: visible !important; }';
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const handleLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMapMoved = useCallback(() => {
    if (!mapRef.current) return;
    const centre = mapRef.current.getCenter();
    if (!centre) return;
    const lat = centre.lat();
    const lng = centre.lng();
    const outside =
      lat < NORFOLK_BOUNDS.south ||
      lat > NORFOLK_BOUNDS.north ||
      lng < NORFOLK_BOUNDS.west ||
      lng > NORFOLK_BOUNDS.east;
    setIsOutsideNorfolk(outside);
    setShowSearchHere(!outside);
  }, []);

  const handleZoomIn = useCallback(() => {
    if (!mapRef.current) return;
    mapRef.current.setZoom(mapRef.current.getZoom() + 1);
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!mapRef.current) return;
    mapRef.current.setZoom(mapRef.current.getZoom() - 1);
  }, []);

  const handleBackToNorfolk = useCallback(() => {
    if (!mapRef.current) return;
    mapRef.current.panTo(NORWICH_CENTER);
    mapRef.current.setZoom(11);
    setIsOutsideNorfolk(false);
    setShowSearchHere(false);
  }, []);

  const handleSearchHere = useCallback(() => {
    if (!mapRef.current || !onSearchArea) return;
    const bounds = mapRef.current.getBounds();
    if (!bounds) return;
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    onSearchArea({
      north: ne.lat(),
      south: sw.lat(),
      east: ne.lng(),
      west: sw.lng(),
    });
    setShowSearchHere(false);
  }, [onSearchArea]);

  const center = centerLocation ?? NORWICH_CENTER;
  const selectedProperty = properties?.find(p => p.id === selectedId);

  if (!isLoaded) {
    return <div className="w-full h-full rounded-2xl bg-[#f5f1ea] border border-gray-200" />;
  }

  // Render highlighted marker last so it sits on top in the DOM
  const withLocation = properties?.filter(p => p.location) ?? [];
  const nonHighlighted = withLocation.filter(p => p.id !== hoveredId);
  const highlighted = withLocation.filter(p => p.id === hoveredId);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-gray-300 z-0 relative">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={13}
        options={{ disableDefaultUI: true, scrollwheel: true, clickableIcons: false }}
        onLoad={handleLoad}
        onDragEnd={handleMapMoved}
        onZoomChanged={handleMapMoved}
      >
        {[...nonHighlighted, ...highlighted].map((property) => (
          <OverlayView
            key={property.id}
            position={{ lat: property.location.lat, lng: property.location.lng }}
            mapPaneName="overlayMouseTarget"
          >
            <PriceBadge
              property={property}
              highlighted={property.id === hoveredId}
              onClick={() => setSelectedId(prev => prev === property.id ? null : property.id)}
            />
          </OverlayView>
        ))}

        {selectedProperty?.location && (
          <InfoWindow
            position={{ lat: selectedProperty.location.lat, lng: selectedProperty.location.lng }}
            onCloseClick={() => setSelectedId(null)}
            options={{ disableAutoPan: false }}
          >
            <div style={{ width: 240 }}>
              <PropertyCard property={selectedProperty} isPopup={true} onClose={() => setSelectedId(null)} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <div className="absolute bottom-6 right-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          aria-label="Zoom in"
          className="w-11 h-11 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          aria-label="Zoom out"
          className="w-11 h-11 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
        </button>
      </div>

      {showSearchHere && !isOutsideNorfolk && onSearchArea && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <button
            onClick={handleSearchHere}
            className="pointer-events-auto bg-white text-gray-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all"
          >
            Search this area
          </button>
        </div>
      )}

      {isOutsideNorfolk && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center gap-2">
          <div className="pointer-events-auto bg-white text-gray-700 text-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
            We&apos;re not here yet — we&apos;re focused on Norfolk
          </div>
          <button
            onClick={handleBackToNorfolk}
            className="pointer-events-auto bg-[#2E3B2E] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg hover:bg-[#3d4f3d] active:scale-95 transition-all"
          >
            Back to Norfolk
          </button>
        </div>
      )}
    </div>
  );
}
