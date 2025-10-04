import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

type Props = {
  trigger: React.ReactNode;     // your icon button
  label: string;                // e.g. "Solar"
  value?: string | number;      // e.g. "Installed"
  className?: string;
};

export default function QuickFact({ trigger, label, value, className }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {/* click only, no hover; button itself handles hover styles */}
        {trigger}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="left"
          align="center"
          sideOffset={12}
          collisionPadding={12}
          avoidCollisions
          className={cn(
            "pointer-events-auto select-none rounded-2xl border border-black/5 bg-white px-3.5 py-2 text-sm text-zinc-900 shadow-[0_12px_40px_rgba(0,0,0,0.12)] will-change-[transform,opacity]",
            className
          )}
        >
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-zinc-900" />
            <div className="font-medium">{label}</div>
            {value ? <div className="ml-4 text-zinc-500">{String(value)}</div> : null}
          </div>
          <Popover.Arrow className="fill-white drop-shadow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
