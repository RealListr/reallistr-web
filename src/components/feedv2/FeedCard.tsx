'use client';
import ImageSafe from './media/ImageSafe';

type Item = {
  id: string;
  title: string;
  price: number;
  address: string;
  image?: string;
  badges?: string[];
};

export default function FeedCard({ item }: { item: Item }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
      <div className="relative aspect-[16/10] bg-neutral-100">
        <ImageSafe src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{item.address}</p>
        <p className="mt-2 text-base font-bold">$
          {item.price.toLocaleString()}
        </p>
        {item.badges?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.badges.map((b) => (
              <span key={b} className="rounded-full border px-2 py-0.5 text-xs text-neutral-600">
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
