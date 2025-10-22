import { NextResponse } from 'next/server';

let listings = [
  {
    id: '1',
    agent: 'Aisha Patel',
    agency: 'Luxe Realty',
    agentAvatarUrl: '',
    agencyLogoUrl: '',
    address: 'One JLT, Jumeirah Lake Towers',
    price: 'AED 4,250,000',
    beds: 4,
    baths: 2,
    cars: 2,
    propertyType: 'Home',         // maps to icon row
    landSizeSqm: 0,               // number
    solarWattage: 0,              // number (watts)
    evCharger: 'None',            // None | Type 1 | Type 2 | CCS | CHAdeMO
    grassType: 'None',            // None | Real | Artificial
    tags: ['Home', 'Land Size m²', 'Solar & wattage', 'EV Charger'],
    inspection: 'Sat 11:15–11:45am',
    area: 'JLT',
    imageUrl: '',
    videoUrl: '',
  },
];

export async function GET() {
  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newListing = {
    id: Date.now().toString(),
    agent: body.agent || 'Unnamed Agent',
    agency: body.agency || 'Independent Realty',
    agentAvatarUrl: body.agentAvatarUrl || '',
    agencyLogoUrl: body.agencyLogoUrl || '',
    address: body.address || 'Unknown Address',
    price: body.price || 'AED 0',
    beds: Number(body.beds || 0),
    baths: Number(body.baths || 0),
    cars: Number(body.cars || 0),
    propertyType: body.propertyType || 'Home',
    landSizeSqm: Number(body.landSizeSqm || 0),
    solarWattage: Number(body.solarWattage || 0),
    evCharger: body.evCharger || 'None',
    grassType: body.grassType || 'None',
    tags: Array.isArray(body.tags)
      ? body.tags
      : (body.tags || '')
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean),
    inspection: body.inspection || 'By Appointment',
    area: body.area || '',
    imageUrl: body.imageUrl || '',
    videoUrl: body.videoUrl || '',
  };
  listings.unshift(newListing);
  return NextResponse.json({ success: true, listings });
}
