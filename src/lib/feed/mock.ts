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

// Guaranteed image URL (no 404): seed-based Picsum
const img = (i:number) =>
  `https://picsum.photos/seed/reallistr-${i}/1200/800`;

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
  const hasMore = page < 4; // a few pages
  return { items, hasMore };
}
