import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function PropertyDetailMap({ location }) {
  if (!location?.lat || !location?.lng) return null;

  const center = [location.lat, location.lng];

  return (
    <div className="w-full h-[350px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
      <MapContainer center={center} zoom={15} scrollWheelZoom={false} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} />
      </MapContainer>
    </div>
  );
}
