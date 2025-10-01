'use client';
import type { Pod } from '@/types/media';

export default function PodsRail({ items }: { items: Pod[] }) {
  if (!items?.length) return null;
  return (
    <section className="mx-auto mt-8 max-w-6xl">
      <h3 className="mb-3 text-sm font-medium">ListrPods</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map(p => (
          <div key={p.id} className="rounded-xl border p-3">
            <div className="text-sm font-medium">{p.title}</div>
            <div className="mt-2 text-xs text-gray-500">{p.author ?? 'Agent'}</div>
            <audio className="mt-3 w-full" controls preload="none">
              <source src={p.src} />
              Your browser does not support audio.
            </audio>
          </div>
        ))}
      </div>
    </section>
  );
}
