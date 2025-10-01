'use client';
import SlideDrawer from '@/components/v2/drawers/SlideDrawer';
import dynamic from 'next/dynamic';

const MapPreview = dynamic(() => import('./MapPreview'), { ssr: false });

export default function MapDrawer({
  open,
  onOpenChange,
  lat,
  lng,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  lat: number;
  lng: number;
}) {
  return (
    <SlideDrawer open={open} onOpenChange={onOpenChange} title="Location" widthClass="w-[520px]">
      <MapPreview lat={lat} lng={lng} height={420} />
      <div className="mt-3 text-xs text-muted-foreground">Tip: Use two fingers to pan.</div>
    </SlideDrawer>
  );
}
