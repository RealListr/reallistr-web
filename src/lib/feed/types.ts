export type FeedKind = 'for-you' | 'nearby' | 'following';

export interface Agent {
  id: string;
  name: string;
  brokerage: string;
}

export interface Listing {
  id: string;
  priceAED: number;
  beds: number;
  baths: number;
  cars: number;
  type: 'Home' | 'Apartment' | 'Townhouse' | 'Villa';
  address: string;
  suburb: string;
  tags: string[];
  hero: string | null;
  agent: Agent;
  createdAt: string;   // ISO
}

export interface PageResult<T> {
  items: T[];
  nextCursor: string | null;
}
