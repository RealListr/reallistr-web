import Image from "next/image";
import { User2 } from "lucide-react";

export type Agent = { id: string; name: string; role?: string; avatarUrl?: string };

export default function AgentsRow({
  agents,
  onOpenSheet,
}: {
  agents: Agent[];
  onOpenSheet: () => void;
}) {
  const shown = agents.slice(0, 3);
  const overflow = Math.max(0, agents.length - shown.length);

  return (
    <div className="flex items-center gap-2">
      {shown.map((a) => (
        <div key={a.id} className="grid h-[36px] w-[36px] place-items-center rounded-full bg-neutral-100 overflow-hidden">
          {a.avatarUrl ? (
            <Image src={a.avatarUrl} alt={a.name} width={36} height={36} />
          ) : (
            <User2 className="h-5 w-5 text-neutral-500" strokeWidth={1.5} />
          )}
        </div>
      ))}
      {overflow > 0 && (
        <button
          onClick={onOpenSheet}
          className="h-[36px] rounded-full border border-neutral-200 px-2 text-[12px] text-neutral-700"
          aria-label="Show all agents"
        >
          +{overflow}
        </button>
      )}
    </div>
  );
}
