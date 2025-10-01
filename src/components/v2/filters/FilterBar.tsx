'use client';
import { useState, useMemo } from 'react';
import type { ListingType, Property } from '@/data/properties';

export type Filters = {
  type: ListingType | 'any';
  minBeds: number;
  maxPrice: number | null;
};

export default function FilterBar({
  data,
  onFilter,
}: {
  data: Property[];
  onFilter: (out: Property[]) => void;
}) {
  const [f, setF] = useState<Filters>({ type: 'any', minBeds: 0, maxPrice: null });

  const filtered = useMemo(() => {
    return data.filter(p => {
      if (f.type !== 'any' && p.type !== f.type) return false;
      if (p.beds < f.minBeds) return false;
      if (f.maxPrice != null && p.price > f.maxPrice) return false;
      return true;
    });
  }, [data, f]);

  useMemo(() => onFilter(filtered), [filtered, onFilter]);

  return (
    <div className="flex flex-wrap gap-3 rounded-2xl border p-3">
      <select
        className="rounded-lg border px-3 py-2 text-sm"
        value={f.type}
        onChange={e => setF(v => ({ ...v, type: e.target.value as Filters['type'] }))}
      >
        <option value="any">Any type</option>
        <option value="sale">For Sale</option>
        <option value="rental">For Rent</option>
        <option value="commercial">Commercial</option>
      </select>

      <select
        className="rounded-lg border px-3 py-2 text-sm"
        value={f.minBeds}
        onChange={e => setF(v => ({ ...v, minBeds: Number(e.target.value) }))}
      >
        <option value="0">Any beds</option>
        <option value="1">1+ beds</option>
        <option value="2">2+ beds</option>
        <option value="3">3+ beds</option>
        <option value="4">4+ beds</option>
      </select>

      <select
        className="rounded-lg border px-3 py-2 text-sm"
        value={String(f.maxPrice ?? '')}
        onChange={e =>
          setF(v => ({ ...v, maxPrice: e.target.value ? Number(e.target.value) : null }))
        }
      >
        <option value="">No price cap</option>
        <option value="750000">$750k</option>
        <option value="1000000">$1.0m</option>
        <option value="1500000">$1.5m</option>
      </select>
    </div>
  );
}
