export type Property = {
  id: string;
  title: string;
  type: 'sale' | 'rental' | 'commercial';
  price: number;         // weekly for rental, total for sale
  beds: number;
  baths: number;
  area: number;          // m²
  address: string;
  image: string;         // public/ path
  city: string;
};

export const PROPERTIES: Property[] = [
  {
    id: 'p-101',
    title: 'Harbourside 2BR Apartment',
    type: 'rental',
    price: 950, // $/wk
    beds: 2,
    baths: 1,
    area: 78,
    address: '12 Wharf St, Sydney NSW',
    image: '/placeholders/apt-1.svg',
    city: 'Sydney',
  },
  {
    id: 'p-102',
    title: 'Modern Family Home',
    type: 'sale',
    price: 1850000,
    beds: 4,
    baths: 2,
    area: 210,
    address: '45 Koala Ave, Brisbane QLD',
    image: '/placeholders/house-1.svg',
    city: 'Brisbane',
  },
  {
    id: 'p-103',
    title: 'CBD Office Suite',
    type: 'commercial',
    price: 3500000,
    beds: 0,
    baths: 2,
    area: 760,
    address: '101 Collins St, Melbourne VIC',
    image: '/placeholders/office-1.svg',
    city: 'Melbourne',
  },
  {
    id: 'p-104',
    title: 'Beachside 1BR',
    type: 'rental',
    price: 680,
    beds: 1,
    baths: 1,
    area: 55,
    address: '8 Ocean Rd, Gold Coast QLD',
    image: '/placeholders/apt-2.svg',
    city: 'Gold Coast',
  },
];
