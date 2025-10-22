export type FeedKind = 'for-you' | 'nearby' | 'following';

export type FeedItem = {
  id: string;
  title: string;
  price: number;
  address: string;
  image?: string;
  badges?: string[];
};

const addr = (i:number) => `${100+i} Market St`;
const title = (i:number) => `Listing #${i}`;
const price = (i:number) => 500_000 + i * 1_500;

// simple unsplash pics (safe to hotlink)
const img = (i:number) =>
  `https://images.unsplash.com/photo-15${(10+i)%99}000000-000000000000?auto=format&fit=crop&w=1200&q=60`;

export function getMockPage(kind: FeedKind, page: number, pageSize=20) {
  const items: FeedItem[] = Array.from({length: pageSize}, (_, idx) => {
    const n = page*pageSize + idx + 1;
    return {
      id: `mock-${n}`,
      title: title(n),
      price: price(n),
      address: addr(n),
      image: img(n),
      badges: (n % 3 === 0) ? ['featured','new'] : (n % 2 === 0) ? ['new'] : []
    };
  });
  // stop after a few pages
  const hasMore = page < 4;
  return { items, hasMore };
}
