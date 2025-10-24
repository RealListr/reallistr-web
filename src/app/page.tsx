// server component (no "use client" here)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import FeedClean from './clean/feed';

export default function Page() {
  return <FeedClean />;
}
