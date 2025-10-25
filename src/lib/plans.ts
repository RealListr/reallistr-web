import type { PlanTier } from '@/types/media';

export const PLAN_LIMITS: Record<PlanTier, { images: number; videos: number; cuts: number; lightbox: boolean }> = {
  lite:   { images: 8,  videos: 1, cuts: 0,  lightbox: false },
  active: { images: 18, videos: 1, cuts: 4,  lightbox: true  },
  pro:    { images: 30, videos: 4, cuts: 10, lightbox: true  },
};
