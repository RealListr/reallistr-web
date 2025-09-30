import AppShell from '@/components/shell/AppShell';
import Image from 'next/image';

export default function AgentProfilePage() {
  return (
    <AppShell>
      <div className="flex items-center gap-6 mb-6">
        <div className="relative h-24 w-24 rounded-full overflow-hidden">
          <Image src="https://picsum.photos/seed/avatar/256/256" alt="" fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Westley Buhagiar</h1>
          <div className="text-neutral-600">Commercial Interactive</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium mb-3">Listings</h2>
          <div className="rounded-xl border p-6 text-sm text-neutral-600">No listings yet.</div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-xl border p-4">
            <div className="text-xs text-neutral-500 mb-2">Sponsored</div>
            <div className="rounded-lg h-28 bg-neutral-100 flex items-center justify-center text-neutral-500 text-sm">Agent-controlled ad slot</div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
