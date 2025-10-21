import FeedV2 from '@/components/feedv2/FeedV2';
// Render on demand to avoid prerender issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomeV2() {
  return <FeedV2 />;
}
