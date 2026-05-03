import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import PropertyMapCard from './PropertyMapCard';

function createIcon(property, highlighted) {
  const price = property.priceText || `£${Math.round(property.price / 1000)}k`;
  const bg = highlighted ? '#111827' : '#f13053';
  const shadow = highlighted
    ? '0 4px 14px rgba(0,0,0,0.35)'
    : '0 2px 6px rgba(0,0,0,0.2)';
  return L.divIcon({
    className: '',
    html: `<div style="
      display: inline-block;
      transform: translate(-50%, -100%);
      background: ${bg};
      color: #fff;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 900;
      white-space: nowrap;
      box-shadow: ${shadow};
      font-family: ui-sans-serif, system-ui, sans-serif;
      cursor: pointer;
      transition: background 0.15s, box-shadow 0.15s;
    ">${price}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export default function PropertyMap({ properties, centerLocation, hoveredId }) {
  const center = centerLocation
    ? [centerLocation.lat, centerLocation.lng]
    : [52.6309, 1.2974];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-gray-200 z-0 bg-gray-50">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties?.map((property) => {
          if (!property.location) return null;
          const highlighted = property.id === hoveredId;
          return (
            <Marker
              key={property.id}
              position={[property.location.lat, property.location.lng]}
              icon={createIcon(property, highlighted)}
              zIndexOffset={highlighted ? 1000 : 0}
            >
              <Popup minWidth={280} maxWidth={280} className="property-popup">
                <PropertyMapCard property={property} isPopup={true} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
