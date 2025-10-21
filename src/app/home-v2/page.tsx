'use client';
import FeedV2 from '@/components/feedv2/FeedV2';

export default function HomeV2() {
  return <FeedV2 />;
}

// Disable SSG/ISR; render on request to avoid prerender crashes
export const dynamic = 'force-dynamic';
export const revalidate = 0;
