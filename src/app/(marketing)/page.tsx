import AppShell from '@/components/shell/AppShell';
import Link from 'next/link';

export default function HomePage() {
  return (
    <AppShell>
      <section className="py-8">
        <h1 className="text-3xl font-semibold">RealListr</h1>
        <p className="text-neutral-600 mt-2">Explore properties for Sale, Rentals, and Commercial listings.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/properties" className="bg-black text-white px-4 py-2 rounded-full">Browse Properties</Link>
          <Link href="/agents" className="px-4 py-2 rounded-full border">Find Agents</Link>
        </div>
      </section>
    </AppShell>
  );
}

export const dynamic = 'force-dynamic'
