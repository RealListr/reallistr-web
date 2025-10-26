'use client';
import FeedClean from './feed-shim';

// Resilient pick: works with default OR named exports from ./feed
// -ignore
const FeedComp:any = (FeedModule as any).FeedClean
  || (FeedModule as any).default
  || (FeedModule as any).Feed
  || (Object.values(FeedModule).find(v => typeof v === 'function'));
export default function ClientClean() {
  return <FeedComp />;
}
