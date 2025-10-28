'use client';

import { useEffect, useState } from 'react';
import InviteAgentForm, { Invite } from '@/components/InviteAgentForm';

export default function AgentsModal({
  open,
  onClose,
  propertyId,
}: {
  open: boolean;
  onClose: () => void;
  propertyId?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
      style={{ backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.25)' }}
    >
      <div
        className="mx-auto mt-14 w-[92%] max-w-2xl rounded-2xl bg-white shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <div>
            <h2 className="text-xl font-bold">Agents Connection Centre</h2>
            {propertyId && (
              <p className="text-xs text-neutral-600">
                Context: property <span className="font-mono">{propertyId}</span>
              </p>
            )}
          </div>
          <button
            className="p-2 rounded-full hover:bg-neutral-100"
            aria-label="Close"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="grid gap-6 md:grid-cols-2 p-5">
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold mb-2">Invite an agent</h3>
            <InviteAgentForm onAdd={(invite) => setInvites((prev) => [invite, ...prev])} />
          </div>

          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold mb-2">Recent invites</h3>
            {invites.length === 0 ? (
              <p className="text-sm text-neutral-600">No invites yet.</p>
            ) : (
              <ul className="divide-y divide-neutral-200">
                {invites.map((inv) => (
                  <li key={inv.id} className="py-3">
                    <p className="font-medium leading-tight">{inv.name}</p>
                    <p className="text-sm text-neutral-600">{inv.email}</p>
                    {inv.message && <p className="text-sm text-neutral-700 mt-1">{inv.message}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
