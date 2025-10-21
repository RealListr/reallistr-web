export type FeedItem = {
  id: string;
  title: string;
  description?: string;
  price?: string;
  address?: string;
  tags?: string[];
};

export function mockPage(page: number, kind: 'for-you'|'nearby'|'following') {
  // 20 items per page
  const items: FeedItem[] = Array.from({ length: 20 }).map((_, i) => {
    const n = page * 20 + i + 1;
    return {
      id: `${kind}-${n}`,
      title: `Listing #${n}`,
      description: `Spacious 2–4 br • updated kitchen • great light`,
      price: `$${(500_000 + n * 1500).toLocaleString()}`,
      address: `${100 + (n % 80)} Market St`,
      tags: [kind.replace('-', ' '), n % 3 === 0 ? 'new' : 'featured']
    };
  });

  return {
    items,
    page,
    hasMore: page < 4, // 5 pages total for preview
  };
}
