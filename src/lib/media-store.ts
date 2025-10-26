'use client';
import { create } from 'zustand';

export type MediaItem = { kind: 'image' | 'video'; src: string; alt?: string };

type MediaState = {
  items: MediaItem[];
  index: number | null;
  openAt: (index: number, items: MediaItem[]) => void;
  next: () => void;
  prev: () => void;
  close: () => void;
};

export const useMediaStore = create<MediaState>((set, get) => ({
  items: [],
  index: null,
  openAt: (index, items) => set({ items, index }),
  next: () => {
    const { index, items } = get();
    if (index === null || !items.length) return;
    set({ index: (index + 1) % items.length });
  },
  prev: () => {
    const { index, items } = get();
    if (index === null || !items.length) return;
    set({ index: (index - 1 + items.length) % items.length });
  },
  close: () => set({ index: null }),
}));
