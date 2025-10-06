"use client";
import { X } from "lucide-react";
import type { Agent } from "./AgentsRow";

export default function AgentsSheet({
  open,
  onClose,
  agents,
  agencyName,
}: {
  open: boolean;
  onClose: () => void;
  agents: Agent[];
  agencyName?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[14px] font-semibold text-neutral-900">{agencyName ?? "Agents"}</div>
          <button aria-label="Close" onClick={onClose}>
            <X className="h-5 w-5 text-neutral-600" />
          </button>
        </div>
        <ul className="space-y-3">
          {agents.map((a) => (
            <li key={a.id} className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="truncate text-[14px] font-medium text-neutral-900">{a.name}</div>
                {a.role && <div className="text-[12px] text-neutral-500">{a.role}</div>}
              </div>
              <div className="flex gap-2">
                <button className="rounded-full border border-neutral-200 px-2.5 py-1 text-[12px]">Message</button>
                <button className="rounded-full border border-neutral-200 px-2.5 py-1 text-[12px]">Call</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
