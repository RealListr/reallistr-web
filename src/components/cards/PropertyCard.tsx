import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type PropertyCardProps = {
  slug: string;
  title: string;
  price?: string;
  suburb?: string;
  beds?: number; baths?: number; cars?: number;
  heroUrl: string;
  listingType: 'sale'|'rental'|'commercial';
  adSlot?: React.ReactNode;
}

export function PropertyCard(props: PropertyCardProps) {
  const { slug, title, price, suburb, beds, baths, cars, heroUrl, listingType, adSlot } = props;
  return (
    <Link href={`/p/${slug}`} className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative aspect-[16/10]">
        <Image src={heroUrl} alt={title} fill className="object-cover" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="secondary" className="bg-white/90">{listingType}</Badge>
          {price && <Badge className="bg-black text-white">{price}</Badge>}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <p className="text-sm text-neutral-600 line-clamp-1">{suburb}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-neutral-600">
          {beds != null && <span>{beds} bd</span>}
          {baths != null && <span>{baths} ba</span>}
          {cars != null && <span>{cars} car</span>}
        </div>
        {adSlot && <div className="mt-4">{adSlot}</div>}
      </div>
    </Link>
  );
}
