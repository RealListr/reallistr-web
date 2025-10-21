'use client';
export default function FeedCard({ item }: { item: any }) {
  const title = item?.title ?? 'Untitled';
  const desc  = item?.description ?? '';
  const id    = item?.id ?? crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="mb-2 text-base font-semibold line-clamp-1">{title}</div>
      <div className="text-sm text-neutral-600 line-clamp-2">{desc}</div>
      <div className="mt-3 text-[10px] text-neutral-400">#{id}</div>
    </article>
  );
}
