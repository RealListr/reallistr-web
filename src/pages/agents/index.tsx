'use client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InviteAgentForm, { Invite } from '@/components/InviteAgentForm';

export default function AgentsConnectionCentre() {
  const { query } = useRouter();
  const propertyId = Array.isArray(query.propertyId) ? query.propertyId[0] : query.propertyId;
  const [invites, setInvites] = useState<Invite[]>([]);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Agents Connection Centre</h1>
        {propertyId && (
          <p className="text-sm text-neutral-600 mt-1">
            Context: property <span className="font-mono">{propertyId}</span>
          </p>
        )}
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 p-4 bg-white">
          <h2 className="font-semibold mb-2">Invite an agent</h2>
          <InviteAgentForm onAdd={(invite) => setInvites((prev) => [invite, ...prev])} />
        </div>

        <div className="rounded-xl border border-neutral-200 p-4 bg-white">
          <h2 className="font-semibold mb-2">Recent invites</h2>
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
      </section>
    </main>
  );
}
