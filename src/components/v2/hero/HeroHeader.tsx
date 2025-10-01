'use client';
import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
  hero?: string;
  address: string;
  suburb?: string;
  priceLabel?: string;
  status?: 'SALE' | 'RENTAL';
  children?: ReactNode; // top-right overlay (agents, etc.)
};

export default function HeroHeader({
  hero = '/images/hero-fallback.jpg',
  address,
  suburb,
  priceLabel,
  status,
  children,
}: Props) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-black/60">
      <div className="relative h-[58vh] min-h-[420px] w-full">
        <Image
          src={hero}
          alt={address}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="pointer-events-none absolute right-4 top-4 z-20">
        {children}
      </div>

      <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {status && <span className="uppercase tracking-wide">{status}</span>}
          {suburb && <span className="opacity-70">•</span>}
          {suburb && <span>{suburb}</span>}
        </div>
        <div className="text-2xl font-semibold text-white drop-shadow-sm">{address}</div>
        {priceLabel && (
          <div className="inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
            {priceLabel}
          </div>
        )}
      </div>
    </section>
  );
}
