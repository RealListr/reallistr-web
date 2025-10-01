'use client';
import Link from 'next/link';

type CardProps = {
  id: string;
  title: string;
  price: string;
  address: string;
  imageUrl?: string;
  meta?: string;
};

export default function PropertyCard({ id, title, price, address, imageUrl, meta }: CardProps) {
  return (
    <Link href={`/v2/p/${id}`} className="group overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md">
      <div className="aspect-[16/9] bg-neutral-100">
        {imageUrl ? <img src={imageUrl} alt={title} className="h-full w-full object-cover" /> : null}
      </div>
      <div className="space-y-1 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="line-clamp-1 font-medium">{title}</h3>
          <span className="whitespace-nowrap text-sm font-semibold">{price}</span>
        </div>
        <p className="line-clamp-1 text-sm text-neutral-600">{address}</p>
        {meta ? <p className="text-xs text-neutral-500">{meta}</p> : null}
      </div>
    </Link>
  );
}
