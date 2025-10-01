'use client';
import { useMemo, useState } from 'react';
import type { Property } from '@/data/properties';

type Props = {
  data: Property[];
  onFilter: (rows: Property[]) => void;
};

export default function FilterBar({ data, onFilter }: Props) {
  const [q, setQ] = useState('');
  const [type, setType] = useState<'any' | Property['type']>('any');
  const [beds, setBeds] = useState<'any' | 1 | 2 | 3 | 4>('any');
  const [price, setPrice] = useState<[number, number]>([0, 5_000_000]); // $ or $/wk

  const filtered = useMemo(() => {
    const qlc = q.trim().toLowerCase();
    return data.filter((p) => {
      if (type !== 'any' && p.type !== type) return false;
      if (beds !== 'any' && p.beds < beds) return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      if (qlc) {
        const hay =
          (p.title + ' ' + p.address + ' ' + p.city).toLowerCase();
        if (!hay.includes(qlc)) return false;
      }
      return true;
    });
  }, [q, type, beds, price, data]);

  // Push results up whenever filters change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => onFilter(filtered), [filtered]);

  return (
    <section className="grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Search */}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search address, city, title"
        className="h-10 rounded-lg border px-3 outline-none"
      />

      {/* Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value as any)}
        className="h-10 rounded-lg border px-3"
      >
        <option value="any">Any type</option>
        <option value="sale">For Sale</option>
        <option value="rental">For Rent</option>
        <option value="commercial">Commercial</option>
      </select>

      {/* Beds */}
      <select
        value={beds as any}
        onChange={(e) =>
          setBeds(e.target.value === 'any' ? 'any' : (parseInt(e.target.value, 10) as any))
        }
        className="h-10 rounded-lg border px-3"
      >
        <option value="any">Any beds</option>
        <option value="1">1+ bed</option>
        <option value="2">2+ beds</option>
        <option value="3">3+ beds</option>
        <option value="4">4+ beds</option>
      </select>

      {/* Price quick range */}
      <select
        className="h-10 rounded-lg border px-3"
        onChange={(e) => {
          const v = e.target.value;
          if (v === 'any') setPrice([0, 5_000_000]);
          else if (v === 'low') setPrice([0, 1000]);          // for rentals
          else if (v === 'mid') setPrice([1000, 3000]);       // for rentals
          else if (v === 'sale1') setPrice([0, 1_000_000]);   // for sale
          else if (v === 'sale2') setPrice([1_000_000, 5_000_000]);
        }}
        defaultValue="any"
      >
        <option value="any">Any price</option>
        <option value="low">Rent ≤ $1k/wk</option>
        <option value="mid">Rent $1k–3k/wk</option>
        <option value="sale1">Sale ≤ $1m</option>
        <option value="sale2">Sale $1m–$5m</option>
      </select>
    </section>
  );
}
