'use client';
import { PlaySquare, Mic, ImageIcon, Info } from 'lucide-react';

type Props = {
  shortsCount?: number;
  podsCount?: number;
  onShorts?: () => void;
  onPods?: () => void;
  onInfo?: () => void;
  onMap?: () => void;
};

export default function ActionFabStack({
  shortsCount = 0,
  podsCount = 0,
  onShorts,
  onPods,
  onInfo,
  onMap,
}: Props) {
  const Chip = ({
    children,
    onClick,
    label,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    label: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm shadow-sm backdrop-blur transition hover:shadow-md"
      aria-label={label}
    >
      {children}
    </button>
  );

  return (
    <div className="pointer-events-auto absolute bottom-5 right-5 z-20 flex flex-col items-end gap-2">
      <Chip onClick={onInfo} label="Property info">
        <Info className="h-5 w-5" /> Info
      </Chip>
      <Chip onClick={onShorts} label="Open ListrShorts">
        <PlaySquare className="h-5 w-5" /> {shortsCount} Shorts
      </Chip>
      <Chip onClick={onPods} label="Open ListrPods">
        <Mic className="h-5 w-5" /> {podsCount} Pods
      </Chip>
      <Chip onClick={onMap} label="Open map">
        <ImageIcon className="h-5 w-5 rotate-90" /> Map
      </Chip>
    </div>
  );
}
