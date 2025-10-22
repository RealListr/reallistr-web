import { NextResponse } from 'next/server';
import { z } from 'zod';
const Query = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(50).default(20),
  tab: z.enum(['for-you','nearby','following']).default('for-you'),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  beds: z.coerce.number().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = Query.parse(Object.fromEntries(searchParams));

  const useMock = process.env.FEED_USE_MOCK === '1';

  const data = useMock ? await mockFetch(q) : await dbFetch(q);
  return NextResponse.json({
    items: data.items,
    nextPage: data.nextPage, // null when done
  });
}

// ---- adapters ----
async function mockFetch({ page, pageSize }: any) {
  const from = (page-1)*pageSize, to = from + pageSize;
  const items = Array.from({ length: pageSize }, (_, i) => {
    const n = from + i + 1;
    return {
      id: `mock-${n}`,
      title: `Listing #${n}`,
      price: 500000 + n*1500,
      address: `${n} Market St`,
      summary: 'Spacious 2–4 br · updated kitchen · great light',
      imageUrl: `https://picsum.photos/seed/${n}/1200/675`,
      badges: ['for youfeatured'],
    };
  });
  return { items, nextPage: page < 10 ? page+1 : null };
}

async function dbFetch(q: any) {
  // TODO: swap in your Drizzle/Supabase query, keep the return shape
  // Filter by q.tab/minPrice/maxPrice/beds
  return mockFetch(q); // temporary pass-through until DB wired
}
