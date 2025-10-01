'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Property } from '@/data/properties';

type ListingType = 'sale' | 'rental' | 'commercial' | 'any';

type FilterBarProps = {
  data: Property[];
  onFilter: (rows: Property[]) => void;
};

// Locally widen Property to include optional location fields (no `any`)
type PropertyWithLocation = Property & {
  suburb?: string;
  city?: string;
};

export default function FilterBar({ data, onFilter }: FilterBarProps) {
  const [query, setQuery] = useState<string>('');
  const [listingType, setListingType] = useState<ListingType>('any');
  const [minBeds, setMinBeds] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const onMinBedsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value.trim();
    setMinBeds(v === '' ? undefined : Math.max(0, Number(v)));
  };

  const onMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value.trim();
    setMaxPrice(v === '' ? undefined : Math.max(0, Number(v)));
  };

  const onListingTypeChange = (v: ListingType | string) => {
    const next: ListingType =
      v === 'sale' || v === 'rental' || v === 'commercial' || v === 'any'
        ? v
        : 'any';
    setListingType(next);
  };

  const getHaystack = (p: Property): string => {
    const pl = p as PropertyWithLocation; // typed, not `any`
    return [p.title, pl.suburb, pl.city].filter(Boolean).join(' ').toLowerCase();
  };

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter((p) => {
      const hay = getHaystack(p);

      const matchesText = q === '' || hay.includes(q);
      const matchesType = listingType === 'any' || p.type === listingType;
      const matchesBeds =
        minBeds === undefined || (typeof p.beds === 'number' && p.beds >= minBeds);
      const matchesPrice =
        maxPrice === undefined || (typeof p.price === 'number' && p.price <= maxPrice);

      return matchesText && matchesType && matchesBeds && matchesPrice;
    });
  }, [data, listingType, maxPrice, minBeds, query]);

  useEffect(() => {
    onFilter(rows);
  }, [rows, onFilter]);

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input
        type="text"
        placeholder="Search suburb, city, title…"
        value={query}
        onChange={onQueryChange}
        className="h-10 rounded-lg border px-3"
      />

      <select
        value={listingType}
        onChange={(e) => onListingTypeChange(e.currentTarget.value)}
        className="h-10 rounded-lg border px-3 bg-background"
      >
        <option value="any">Any type</option>
        <option value="sale">For Sale</option>
        <option value="rental">For Rent</option>
        <option value="commercial">Commercial</option>
      </select>

      <input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder="Min beds"
        value={minBeds ?? ''}
        onChange={onMinBedsChange}
        className="h-10 rounded-lg border px-3"
      />

      <input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder="Max price"
        value={maxPrice ?? ''}
        onChange={onMaxPriceChange}
        className="h-10 rounded-lg border px-3"
      />
    </section>
  );
}
