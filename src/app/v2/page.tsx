'use client';
import Link from 'next/link';
import AppFrame from '@/components/v2/AppFrame';

export default function V2Home() {
  return (
    <AppFrame>
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">RealListr — v2 Experience</h1>
        <p className="max-w-2xl text-neutral-600">
          Next-gen property search with conversational filters, dynamic cards, and a global-ready layout.
        </p>
        <div className="flex gap-3">
          <Link href="/v2/properties" className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50">
            Browse Properties
          </Link>
          <Link href="/dash" className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50">
            Go to Dashboard
          </Link>
        </div>
      </section>
    </AppFrame>
  );
}
