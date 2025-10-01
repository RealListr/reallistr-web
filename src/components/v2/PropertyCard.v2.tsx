import Image from 'next/image';
import Link from 'next/link';
import { IcShort, IcPod } from '@/components/icons/rl-icons';
import type { Property } from '@/data/properties';

export default function PropertyCardV2({ p }: { p: Property }) {
  const hero = p.images?.[0] ?? '/placeholder.svg';
  const price = p.type === 'rental'
    ? `$${(p.price ?? 0).toLocaleString()}/wk`
    : `$${(p.price ?? 0).toLocaleString()}`;
  return (
    <Link href={`/v2/p/${p.id}`} className="group block overflow-hidden rounded-2xl border shadow-sm hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image src={hero} alt={p.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" sizes="(min-width:1024px) 33vw, 100vw" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide">{p.type.toUpperCase()}</div>
        <div className="absolute right-3 top-3 rounded-full bg-black/85 px-2 py-0.5 text-[11px] font-medium text-white">{price}</div>
        <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-white/90 px-2 py-1 text-[11px]">
          {!!p.shorts?.length && (<span className="inline-flex items-center gap-1"><IcShort className="h-4 w-4"/>{p.shorts.length}</span>)}
          {!!p.pods?.length && (<span className="inline-flex items-center gap-1"><IcPod className="h-4 w-4"/>{p.pods.length}</span>)}
        </div>
      </div>
      <div className="p-3">
        <div className="line-clamp-1 text-sm font-semibold">{p.title}</div>
        <div className="mt-1 text-xs text-gray-600">{p.suburb}</div>
        <div className="mt-2 flex gap-3 text-xs text-gray-700">
          <span>{p.beds} bd</span><span>{p.baths} ba</span><span>{p.cars} car</span>
        </div>
      </div>
    </Link>
  );
}
