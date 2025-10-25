'use client';
import { create } from 'zustand';
import type { MediaItem } from '@/types/media';

type MediaState = {
  open: boolean;
  items: MediaItem[];
  at: number;
  openAt: (items: MediaItem[], at: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
};

export const useMediaStore = create<MediaState>((set, get) => ({
  open: false,
  items: [],
  at: 0,
  openAt: (items, at) => set({ items, at, open: true }),
  close: () => set({ open: false }),
  next: () => set(s => ({ at: (s.at + 1) % Math.max(1, s.items.length) })),
  prev: () => set(s => ({ at: (s.at - 1 + Math.max(1, s.items.length)) % Math.max(1, s.items.length) })),
}));
