"use client";

import Link from "next/link";
import { Home, Calendar as CalendarIcon, Search, Bell, User } from "lucide-react";

export function TabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto grid max-w-4xl grid-cols-5">
        <Link href="/" className="flex items-center justify-center p-3"><Home className="h-6 w-6" /></Link>
        <Link href="/search" className="flex items-center justify-center p-3"><Search className="h-6 w-6" /></Link>
        <Link href="/calendar" className="flex items-center justify-center p-3"><CalendarIcon className="h-6 w-6" /></Link>
        <Link href="/alerts" className="flex items-center justify-center p-3"><Bell className="h-6 w-6" /></Link>
        <Link href="/me" className="flex items-center justify-center p-3"><User className="h-6 w-6" /></Link>
      </div>
    </nav>
  );
}
