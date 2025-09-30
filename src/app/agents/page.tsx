import AppShell from '@/components/shell/AppShell';
import { AgentCard } from '@/components/cards/AgentCard';

export default function AgentsPage() {
  const agents = [
    { handle: 'westley', name: 'Westley Buhagiar', brandName: 'Commercial Interactive', listingsCount: 12 }
  ];
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-4">Agents</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((a) => (
          <AgentCard key={a.handle} {...a} adSlot={<span className="text-xs text-neutral-500">Ad space (controlled)</span>} />
        ))}
      </div>
    </AppShell>
  );
}
