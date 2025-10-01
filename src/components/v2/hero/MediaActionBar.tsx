'use client';

import { Info, Video, Mic } from 'lucide-react';

type MediaActionBarProps = {
  onInfo: () => void;
  shortsCount: number;
  podsCount: number;
};

export default function MediaActionBar({
  onInfo,
  shortsCount,
  podsCount,
}: MediaActionBarProps) {
  return (
    <div className="mt-3 flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={onInfo}
        className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm hover:bg-accent"
        aria-label="Property information"
      >
        <Info className="size-4" />
        <span className="hidden sm:inline">Info</span>
      </button>

      <div
        className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm"
        aria-label="ListrShorts count"
      >
        <Video className="size-4" />
        <span className="font-medium">{shortsCount}</span>
        <span className="hidden sm:inline text-muted-foreground">Shorts</span>
      </div>

      <div
        className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm"
        aria-label="ListrPods count"
      >
        <Mic className="size-4" />
        <span className="font-medium">{podsCount}</span>
        <span className="hidden sm:inline text-muted-foreground">Pods</span>
      </div>
    </div>
  );
}
