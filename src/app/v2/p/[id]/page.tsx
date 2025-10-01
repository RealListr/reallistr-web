'use client';
import AppFrame from '@/components/v2/AppFrame';
import { useParams } from 'next/navigation';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <AppFrame>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Property — {id}</h1>
        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-medium">Overview</h2>
            <p className="text-neutral-700">Placeholder details. v2 will plug real data, AI summaries, and map preview.</p>
          </div>
          <aside className="rounded-2xl border p-4">
            <div className="font-medium">Contact Agent</div>
            <p className="text-sm text-neutral-600">Lead form placeholder</p>
          </aside>
        </div>
      </div>
    </AppFrame>
  );
}
