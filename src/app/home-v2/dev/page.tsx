import dynamic from 'next/dynamic';
const FeedV2 = dynamic(() => import('@/components/feedv2/FeedV2'), { ssr: false });

export default function HomeV2Preview() {
  return <FeedV2 />;
}
