import type { FeedKind, Listing, PageResult } from './types';

function seededRand(seed: number) {
  let x = seed || 123456789;
  return () => {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return ((x >>> 0) % 1_000_000) / 1_000_000;
  };
}

function pad(n: number, w = 2) { return n.toString().padStart(w, '0'); }

function makeListing(rand: () => number, i: number): Listing {
  const prices = [1850000, 2450000, 3200000, 4250000, 5650000, 7400000];
  const suburbs = ['Downtown', 'Marina', 'Parina', 'JLT', 'Al Barsha', 'Palm Jumeirah'];
  const types: Listing['type'][] = ['Home', 'Apartment', 'Townhouse', 'Villa'];

  const priceAED = prices[Math.floor(rand() * prices.length)];
  const suburb = suburbs[Math.floor(rand() * suburbs.length)];
  const type = types[Math.floor(rand() * types.length)];
  const beds = 1 + Math.floor(rand() * 5);
  const baths = Math.max(1, Math.min(4, beds - 1 + Math.floor(rand() * 2)));
  const cars = Math.floor(rand() * 3);
  const tagsPool = ['Solar', 'EV Charger', 'New', 'Renovated', 'Corner', 'Sea View', 'Furnished'];
  const tagCount = 1 + Math.floor(rand() * 3);
  const tags = Array.from({ length: tagCount }).map(() => tagsPool[Math.floor(rand() * tagsPool.length)]);

  const agentId = `ag_${pad(Math.floor(rand() * 9999), 4)}`;
  const agent: Listing['agent'] = {
    id: agentId,
    name: `Aisha Patel ${pad(Math.floor(rand() * 90)+10, 2)}`,
    brokerage: ['Luxe Realty', 'Harbor & Co', 'Prime Estates'][Math.floor(rand() * 3)]
  };

  const id = `ls_${pad(i, 4)}_${pad(Math.floor(rand()*9999),4)}`;
  const createdAt = new Date(Date.now() - Math.floor(rand()*1000*60*60*24*14)).toISOString();

  return {
    id,
    priceAED,
    beds,
    baths,
    cars,
    type,
    address: `${1 + Math.floor(rand() * 120)} ${['One JLT','Bay Ave','Zayed Rd','Harbor Walk'][Math.floor(rand()*4)]}`,
    suburb,
    tags,
    hero: null,
    agent,
    createdAt
  };
}

export async function loadMockPage(kind: FeedKind, cursor: string | null, pageSize = 12): Promise<PageResult<Listing>> {
  const pageIndex = cursor ? parseInt(cursor, 10) : 0;
  const rand = seededRand( (kind.charCodeAt(0) * 1_000 + pageIndex * 10_000) ^ 0xA11CE );
  const base = pageIndex * pageSize;
  const items = Array.from({ length: pageSize }, (_, j) => makeListing(rand, base + j));
  const nextCursor = pageIndex >= 7 ? null : String(pageIndex + 1);
  await new Promise(r => setTimeout(r, 250 + Math.floor(rand()*200)));
  return { items, nextCursor };
}
