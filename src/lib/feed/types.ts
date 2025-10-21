export type FeedKind = 'for-you' | 'nearby' | 'following';

export type FeedItem = {
  id: string;
  title: string;
  price?: string;
  address?: string;
  description?: string;
  badges?: string[];
  media?: { thumbUrl?: string }[];
};

export type FeedPage = {
  items: FeedItem[];
  page: number;
  hasMore: boolean;
  kind: FeedKind;
};
