import AppShell from '@/components/shell/AppShell';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-2">
          <nav className="rounded-xl border p-3 text-sm space-y-1">
            <a className="block rounded-lg px-3 py-2 hover:bg-neutral-50" href="/dash">Overview</a>
            <a className="block rounded-lg px-3 py-2 hover:bg-neutral-50" href="/dash/properties">Properties</a>
            <a className="block rounded-lg px-3 py-2 hover:bg-neutral-50" href="/dash/media">Media Library</a>
            <a className="block rounded-lg px-3 py-2 hover:bg-neutral-50" href="/dash/settings">Settings</a>
          </nav>
        </aside>
        <section className="lg:col-span-3">{children}</section>
      </div>
    </AppShell>
  );
}
