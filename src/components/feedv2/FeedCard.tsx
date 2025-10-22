'use client';
type Item = { id:string; title:string; price:number; address:string; image?:string; badges?:string[] };

export default function FeedCard({ item }: { item: Item }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
      <div className="h-[260px] sm:h-[300px] xl:h-[340px] bg-neutral-100 overflow-hidden">
        <img
          src={item.image || 'https://picsum.photos/seed/fallback/1200/800'}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold">{item.title}</h3>
        <p className="text-sm text-neutral-600">{item.address}</p>
        <p className="mt-2 text-lg font-bold">${item.price.toLocaleString()}</p>
        {item.badges?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.badges.map(b => (
              <span key={b} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">{b}</span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
