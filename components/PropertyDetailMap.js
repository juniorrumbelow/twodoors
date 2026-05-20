import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

export default function PropertyDetailMap({ location }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!location?.lat || !location?.lng) return null;

  const center = { lat: location.lat, lng: location.lng };

  if (!isLoaded) {
    return <div className="w-full h-[350px] rounded-3xl bg-[#f5f1ea] border border-gray-100" />;
  }

  return (
    <div className="w-full h-[350px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={15}
        options={{ scrollwheel: false, streetViewControl: false, mapTypeControl: false }}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}
