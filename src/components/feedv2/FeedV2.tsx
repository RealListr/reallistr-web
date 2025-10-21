'use client';
import TopTabs from './TopTabs';
import FeedList from './FeedList';

export default function FeedV2() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <h1 className="mb-2 text-2xl font-extrabold">RealListr</h1>
      <p className="mb-4 text-sm text-neutral-500">Feed V2 (preview-only)</p>
      <TopTabs />
      <FeedList />
    </div>
  );
}
