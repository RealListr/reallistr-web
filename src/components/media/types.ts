export type Plan = 'lite' | 'active' | 'pro';

export type MediaAsset =
  | { kind: 'image'; src: string; alt?: string }
  | { kind: 'video'; src: string; poster?: string; durationSec?: number };

export const planCaps = {
  lite:   { images: 8,  videos: 1, cuts: 0,  lightbox: false },
  active: { images: 18, videos: 1, cuts: 4,  lightbox: true  },
  pro:    { images: 30, videos: 4, cuts: 10, lightbox: true  },
} as const;
