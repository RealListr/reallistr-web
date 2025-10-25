'use client';
import { create } from 'zustand';

export type MediaItem = { kind: 'image' | 'video'; src: string; alt?: string };

type State = {
  open: boolean;
  items: MediaItem[];
  index: number;
  openLightbox: (items: MediaItem[], index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
};

export const useMediaStore = create<State>((set, get) => ({
  open: false,
  items: [],
  index: 0,
  openLightbox: (items, index) => set({ open: true, items, index }),
  close: () => set({ open: false }),
  next: () => {
    const { items, index } = get();
    if (items.length) set({ index: (index + 1) % items.length });
  },
  prev: () => {
    const { items, index } = get();
    if (items.length) set({ index: (index - 1 + items.length) % items.length });
  },
}));
