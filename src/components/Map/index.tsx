import React from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CardUnstyled from '../CardUnstyled/CardUnstyled';

export type Markers = {
  lat: number;
  lon: number;
  name: string;
};

export interface MapProps {
  markers: Markers[];
  mapCenter?: LatLngExpression | undefined;
}

export default function Map({ markers, mapCenter }: MapProps) {
  React.useEffect(() => {
    const map = L.map('map', {
      center: mapCenter,
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    markers.forEach((marker) => {
      L.marker([marker.lat, marker.lon]).addTo(map).bindPopup(marker.name);
    });

    return () => {
      map.remove();
    };
  }, [mapCenter, markers]);
  return (
    <CardUnstyled
      cardBodyStyle="flex p-3 flex-row items-center"
      cardStyle="flex rounded-xl shadow-xl h-[800px]"
    >
      <div id="map" className="h-full w-full shadow-lg"></div>
    </CardUnstyled>
  );
}
