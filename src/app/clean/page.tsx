'use client';
export const dynamic = 'force-dynamic';

import dynamic from 'next/dynamic';

// Prevent server from evaluating feed.tsx entirely
const FeedClean = dynamic(() => import('./feed'), { ssr: false });

export default function Page() {
  return <FeedClean />;
}
