'use client';
type MapPreviewProps = { lat: number; lng: number; height?: number | string };
export default function MapPreview({ height = 260 }: MapPreviewProps) {
  return (
    <div className="rounded-2xl border flex items-center justify-center text-sm text-muted-foreground" style={{ height }}>
      Map preview temporarily unavailable
    </div>
  );
}
