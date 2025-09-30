'use client';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapPreviewProps = { lat: number; lng: number; height?: number | string };
export default function MapPreview({ lat, lng, height = 260 }: MapPreviewProps) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ height }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ longitude: lng, latitude: lat, zoom: 14 }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl position="top-left" />
        <Marker longitude={lng} latitude={lat} />
      </Map>
    </div>
  );
}
