'use client';
import Image from 'next/image';
import type { AgentLite } from '@/types/media';

export default function AgentCluster({
  items,
  onOpen,
  className,
}: {
  items: AgentLite[];
  onOpen?: () => void;
  className?: string;
}) {
  if (!items?.length) return null;
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm backdrop-blur hover:shadow ${className ?? ''}`}
      aria-label="View agents"
    >
      <div className="flex -space-x-2">
        {items.slice(0, 3).map((a, i) => (
          <div key={String(a.id ?? i)} className="relative h-8 w-8 overflow-hidden rounded-full border">
            <Image
              src={a.avatar ?? '/avatars/agent.png'}
              alt={a.name}
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
        ))}
      </div>
      <span className="text-sm">{items.length} agent{items.length > 1 ? 's' : ''}</span>
    </button>
  );
}
