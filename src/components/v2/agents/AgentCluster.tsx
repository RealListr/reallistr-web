'use client';

import Image from 'next/image';
import type { AgentLite } from '@/types/media';

type Props = {
  items: AgentLite[];
  className?: string;
};

export default function AgentCluster({ items, className }: Props) {
  const base = "flex items-center gap-3";
  return (
    <section className={className ? `${base} ${className}` : base} aria-label="Agents">
      {items.map(a => (
        <div key={a.id} className="flex items-center gap-2">
          <Image
            src={a.avatar ?? '/placeholders/agent.jpg'}
            alt={a.name ?? 'Agent'}
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <div className="text-sm font-medium">{a.name ?? 'Agent'}</div>
            <div className="text-xs text-muted-foreground">{a.role ?? 'Listing Agent'}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
