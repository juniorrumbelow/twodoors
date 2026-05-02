import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import PropertyMapCard from './PropertyMapCard';

export default function PropertyMap({ properties, centerLocation }) {
  const center = centerLocation ? [centerLocation.lat, centerLocation.lng] : [52.6309, 1.2974]; // fallback to norwich

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-gray-200 z-0 bg-gray-50">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties?.map((property) => {
          if (!property.location) return null;
          
          return (
            <Marker key={property.id} position={[property.location.lat, property.location.lng]}>
              <Popup>
                <PropertyMapCard property={property} isPopup={true} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
