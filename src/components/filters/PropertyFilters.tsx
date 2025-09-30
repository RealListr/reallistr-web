'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type FilterValues = {
  listingType: 'sale'|'rental'|'commercial'|'any';
  beds?: number; baths?: number; cars?: number;
  suburb?: string;
};

export default function PropertyFilters({ onChange }: { onChange: (f: FilterValues) => void }) {
  const [listingType, setListingType] = useState<FilterValues['listingType']>('sale');
  const [suburb, setSuburb] = useState('');
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <Select value={listingType} onValueChange={(v: 'sale' | 'rental' | 'commercial' | 'any') => { setListingType(v); onChange({ listingType: v }); }}>
        <SelectTrigger><SelectValue placeholder="Type"/></SelectTrigger>
        <SelectContent>
          <SelectItem value="sale">For Sale</SelectItem>
          <SelectItem value="rental">Rentals</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="any">Any</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="Suburb" value={suburb} onChange={(e) => { setSuburb(e.target.value); onChange({ listingType, suburb: e.target.value }); }} />
    </div>
  );
}
