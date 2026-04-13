import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function MapView({ entities, location }) {
  const center = location ? [location.lat, location.lng] : [51.505, -0.09]; // fallback to london

  const getSafeUrl = (app) => {
    const url = app['site-plan-url'] || app['planning-permission-history'];
    if (!url) return null;
    return url.startsWith('http://') || url.startsWith('https://') ? url : null;
  };

  const parsePoint = (pointStr) => {
    if (!pointStr) return null;
    // format: POINT (-0.125622 51.5164)
    const match = pointStr.match(/POINT\s*\(\s*([-.\d]+)\s+([-.\d]+)\s*\)/i);
    if (match) {
      const lng = parseFloat(match[1]);
      const lat = parseFloat(match[2]);
      return [lat, lng];
    }
    return null;
  };

  return (
    <div className="w-full h-[600px] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 z-0">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {entities?.map((app, index) => {
          const coords = parsePoint(app.point) || (app.point ? parsePoint(app.geometry) : null);
          if (!coords) return null;
          
          return (
            <Marker key={app.entity || index} position={coords}>
              <Popup>
                <div className="max-w-xs font-sans text-sm p-1">
                  <div className="font-bold text-gray-900 mb-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {app.notes || app.description || 'No details available'}
                  </div>
                  {(app['address-text'] || app['site-address']) && (
                    <div className="text-gray-500 mb-2 truncate">
                      {app['address-text'] || app['site-address']}
                    </div>
                  )}
                  {app.reference && (
                    <div className="text-xs text-gray-400 font-mono mb-2 uppercase font-bold tracking-tight">Ref: {app.reference}</div>
                  )}
                  {getSafeUrl(app) && (
                    <a 
                      href={getSafeUrl(app)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-3 py-1 bg-[#01bf8f] !text-white rounded font-bold hover:bg-[#02a97e] transition-colors"
                    >
                      View Details
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
