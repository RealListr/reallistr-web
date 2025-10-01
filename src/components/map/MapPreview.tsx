'use client';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapPreviewProps = { lat: number; lng: number; height?: number | string };

export default function MapPreview({ height = '300px' }: MapPreviewProps) {
  // TODO: wire up react-map-gl after prod is stable
  return (
    <div
      className="w-full rounded-xl border text-sm text-muted-foreground flex items-center justify-center"
      style={{ height }}
    >
      Map preview temporarily unavailable
    </div>
  );
}
