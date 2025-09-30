'use client';
import Link from 'next/link';
import { Home, Building2, Users } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/75 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-6">
        <Link href="/" className="font-semibold tracking-tight text-xl">RealListr</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/properties" className="inline-flex items-center gap-2 hover:opacity-80"><Home size={16}/> Properties</Link>
          <Link href="/agents" className="inline-flex items-center gap-2 hover:opacity-80"><Users size={16}/> Agents</Link>
          <Link href="/dash" className="ml-auto ms-auto inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-full hover:opacity-90"><Building2 size={16}/> Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
