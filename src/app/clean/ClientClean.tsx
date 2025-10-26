'use client';
import dynamic from 'next/dynamic';

// Load whichever export exists from ./feed (named or default), on the client only
const FeedClean = dynamic(async () => {
  const m: any = await import('./feed');
  return (m.FeedClean ?? m.default ?? m.Feed ?? Object.values(m).find((v:any)=>typeof v==='function')) as any;
}, { ssr: false });

export default function ClientClean() {
  return <FeedClean />;
}
