'use client';
import { ReactNode } from 'react';
import TopNav from '@/components/nav/TopNav';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-neutral-900">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
    </div>
  );
}
