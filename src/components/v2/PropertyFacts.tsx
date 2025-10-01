'use client';

import { type ReactNode } from 'react';
import { Bed, Bath, Ruler, Car } from 'lucide-react';

type IconKey = 'size' | 'bed' | 'bath' | 'car';
export type Fact = {
  label: string;
  value: string;
  icon?: IconKey | ReactNode; // <- allow custom node too
};

type Props = {
  facts: Fact[];
  className?: string;
};

function renderIcon(icon?: IconKey | ReactNode) {
  if (!icon) return null;
  if (typeof icon !== 'string') return <span className="text-muted-foreground">{icon}</span>;
  switch (icon) {
    case 'bed':
      return <Bed className="h-4 w-4 text-muted-foreground" aria-hidden />;
    case 'bath':
      return <Bath className="h-4 w-4 text-muted-foreground" aria-hidden />;
    case 'size':
      return <Ruler className="h-4 w-4 text-muted-foreground" aria-hidden />;
    case 'car':
      return <Car className="h-4 w-4 text-muted-foreground" aria-hidden />;
    default:
      return null;
  }
}

export default function PropertyFacts({ facts, className }: Props) {
  return (
    <section className={className ?? ''} aria-label="Property facts">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {facts.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-xl border p-3"
          >
            {renderIcon(f.icon)}
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {f.label}
              </div>
              <div className="truncate text-sm font-medium">{f.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
