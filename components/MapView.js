import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const LONDON_CENTER = { lat: 51.505, lng: -0.09 };

const parsePoint = (pointStr) => {
  if (!pointStr) return null;
  // format: POINT (-0.125622 51.5164)
  const match = pointStr.match(/POINT\s*\(\s*([-.\d]+)\s+([-.\d]+)\s*\)/i);
  if (!match) return null;
  return { lat: parseFloat(match[2]), lng: parseFloat(match[1]) };
};

const getSafeUrl = (app) => {
  const url = app['site-plan-url'] || app['planning-permission-history'];
  if (!url) return null;
  return url.startsWith('http://') || url.startsWith('https://') ? url : null;
};

export default function MapView({ entities, location }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const center = location ? { lat: location.lat, lng: location.lng } : LONDON_CENTER;

  if (!isLoaded) {
    return <div className="w-full h-[600px] rounded-[2rem] bg-[#f5f1ea] border border-gray-100" />;
  }

  const selectedApp = selectedIndex !== null ? entities?.[selectedIndex] : null;
  const selectedCoords = selectedApp
    ? parsePoint(selectedApp.point) || parsePoint(selectedApp.geometry)
    : null;

  return (
    <div className="w-full h-[600px] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 z-0">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={13}
        options={{ scrollwheel: false }}
      >
        {entities?.map((app, index) => {
          const coords = parsePoint(app.point) || parsePoint(app.geometry);
          if (!coords) return null;
          return (
            <Marker
              key={app.entity || index}
              position={coords}
              onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
            />
          );
        })}

        {selectedApp && selectedCoords && (
          <InfoWindow
            position={selectedCoords}
            onCloseClick={() => setSelectedIndex(null)}
          >
            <div className="max-w-xs font-sans text-sm p-1">
              <div
                className="font-bold text-gray-900 mb-1"
                style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {selectedApp.notes || selectedApp.description || 'No details available'}
              </div>
              {(selectedApp['address-text'] || selectedApp['site-address']) && (
                <div className="text-gray-500 mb-2 truncate">
                  {selectedApp['address-text'] || selectedApp['site-address']}
                </div>
              )}
              {selectedApp.reference && (
                <div className="text-xs text-gray-400 font-mono mb-2 uppercase font-bold tracking-tight">
                  Ref: {selectedApp.reference}
                </div>
              )}
              {getSafeUrl(selectedApp) && (
                <a
                  href={getSafeUrl(selectedApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 py-1 bg-[#7a9c72] text-white rounded font-bold hover:bg-[#02a97e] transition-colors"
                >
                  View Details
                </a>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
