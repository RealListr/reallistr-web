'use client';

import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/dash" className="text-2xl font-extrabold tracking-tight">
          RealListr
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dash" className="hover:underline">Home</Link>
          <Link href="/map" className="hover:underline">Map</Link>
        </nav>
      </div>
    </header>
  );
}
