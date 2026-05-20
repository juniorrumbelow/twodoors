import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView, InfoWindow } from '@react-google-maps/api';
import PropertyCard from './PropertyCard';

const NORWICH_CENTER = { lat: 52.6309, lng: 1.2974 };

function PriceBadge({ property, highlighted, onClick }) {
  const price = property.priceText || `£${Math.round(property.price / 1000)}k`;
  return (
    <div
      onClick={onClick}
      style={{
        transform: highlighted ? 'translate(-50%, -100%) scale(1.25)' : 'translate(-50%, -100%) scale(1)',
        display: 'inline-block',
        background: highlighted ? '#fff' : '#2E3B2E',
        color: highlighted ? '#2E3B2E' : '#fff',
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

export default function PropertyMap({ properties, centerLocation, hoveredId }) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = '.gm-style-iw-chr { display: none !important; } .gm-style-iw, .gm-style-iw-d { overflow: visible !important; }';
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

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
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-gray-300 z-0">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={13}
        options={{ scrollwheel: true, streetViewControl: false, mapTypeControl: false, clickableIcons: false }}
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
    </div>
  );
}
