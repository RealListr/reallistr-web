'use client';
import { useState } from 'react';
import { PROPERTIES, type Property } from '@/data/properties';
import FilterBar from '@/components/v2/filters/FilterBar';
import PropertyCard from '@/components/v2/PropertyCard';

export default function V2PropertiesPage() {
  const [rows, setRows] = useState<Property[]>(PROPERTIES);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Browse Properties</h1>
      <FilterBar data={PROPERTIES} onFilter={setRows} />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((p) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>
    </main>
  );
}
