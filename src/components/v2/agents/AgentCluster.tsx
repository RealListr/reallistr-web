'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { AgentLite } from '@/types/media';

export default function AgentCluster({ agents }: { agents: AgentLite[] }) {
  const [active, setActive] = useState<AgentLite|null>(null);
  if (!agents?.length) return null;
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex -space-x-2">
        {agents.slice(0,4).map(a => (
          <button key={a.id} className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white shadow"
                  onClick={()=>setActive(a)} aria-label={`Agent ${a.name}`}>
            <Image src={a.avatar ?? '/avatar.svg'} alt={a.name} fill className="object-cover" />
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed bottom-24 right-6 z-40 w-72 rounded-2xl border bg-white p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image src={active.avatar ?? '/avatar.svg'} alt={active.name} fill className="object-cover" />
            </div>
            <div>
              <div className="text-sm font-medium">{active.name}</div>
              <div className="text-xs text-gray-500">{active.role ?? 'Agent'}</div>
            </div>
          </div>
          <div className="mt-3 grid gap-2">
            {active.phone && <a className="rounded bg-black px-3 py-2 text-center text-xs text-white" href={`tel:${active.phone}`}>Call</a>}
            {active.email && <a className="rounded border px-3 py-2 text-center text-xs" href={`mailto:${active.email}`}>Email</a>}
          </div>
          <button className="mt-3 w-full rounded px-2 py-1 text-xs hover:bg-gray-100" onClick={()=>setActive(null)}>Close</button>
        </div>
      )}
    </>
  );
}
