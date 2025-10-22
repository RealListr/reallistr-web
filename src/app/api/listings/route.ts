import { NextResponse } from 'next/server';

// 🧠 Temporary in-memory listings (RealListr format)
let listings = [
  {
    id: '1',
    agent: 'Aisha Patel',
    agency: 'Luxe Realty',
    address: 'One JLT, Jumeirah Lake Towers',
    price: 'AED 4,250,000',
    beds: 4,
    baths: 2,
    cars: 2,
    tags: ['Home', 'Land Size m²', 'Solar & wattage', 'EV Charger'],
    inspection: 'Sat 11:15–11:45am',
    area: 'JLT',
  },
];

// 🟢 GET: return listings
export async function GET() {
  return NextResponse.json(listings);
}

// 🔵 POST: add new listing
export async function POST(req: Request) {
  const body = await req.json();
  const newListing = {
    id: Date.now().toString(),
    agent: body.agent || 'Unnamed Agent',
    agency: body.agency || 'Independent Realty',
    address: body.address || 'Unknown Address',
    price: body.price || 'AED 0',
    beds: body.beds || 0,
    baths: body.baths || 0,
    cars: body.cars || 0,
    tags: body.tags?.split(',').map((t: string) => t.trim()) || [],
    inspection: body.inspection || 'By Appointment',
    area: body.area || 'Dubai',
  };
  listings.unshift(newListing);
  return NextResponse.json({ success: true, listings });
}