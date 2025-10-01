'use client';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AppFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-neutral-900">
      <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/v2" className="font-semibold">RealListr</Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/v2/properties" className="hover:underline">Properties</Link>
            <Link href="/agents" className="hover:underline">Agents</Link>
            <Link href="/dash" className="hover:underline">Dashboard</Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
      <footer className="mx-auto max-w-6xl p-6 text-xs text-neutral-500">© RealListr</footer>
    </div>
  );
}
