export type ListingType = 'sale' | 'rental' | 'commercial';
export type Property = {
  id: string;
  title: string;
  price: number;          // AUD (mock)
  beds: number;
  baths: number;
  area: number;           // m²
  type: ListingType;
  city: string;
  country: string;
  image: string;
  agent: { name: string; id: string; };
};

export const PROPERTIES: Property[] = [
  {
    id: 'p-1001',
    title: 'Harbour-view Apartment',
    price: 1250000,
    beds: 2, baths: 2, area: 98,
    type: 'sale',
    city: 'Sydney', country: 'AU',
    image: '/placeholders/apt-1.svg',
    agent: { name: 'Westley Buhagiar', id: 'a-westley' },
  },
  {
    id: 'p-1002',
    title: 'Modern Family Home',
    price: 850000,
    beds: 4, baths: 3, area: 220,
    type: 'sale',
    city: 'Melbourne', country: 'AU',
    image: '/placeholders/house-1.svg',
    agent: { name: 'Westley Buhagiar', id: 'a-westley' },
  },
  {
    id: 'p-1003',
    title: 'CBD Office – Level 12',
    price: 950,        // per week (mock)
    beds: 0, baths: 2, area: 480,
    type: 'commercial',
    city: 'Brisbane', country: 'AU',
    image: '/placeholders/office-1.svg',
    agent: { name: 'Westley Buhagiar', id: 'a-westley' },
  },
  {
    id: 'p-1004',
    title: 'Beachfront Rental',
    price: 1200,       // per week (mock)
    beds: 3, baths: 2, area: 140,
    type: 'rental',
    city: 'Gold Coast', country: 'AU',
    image: '/placeholders/apt-2.svg',
    agent: { name: 'Westley Buhagiar', id: 'a-westley' },
  }
];
