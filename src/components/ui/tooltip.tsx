import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={150} skipDelayDuration={250}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

/** Root with flicker-proof defaults */
export function Tooltip({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipPrimitive.Root disableHoverableContent {...props}>
      {children}
    </TooltipPrimitive.Root>
  );
}

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 12, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "pointer-events-none select-none rounded-2xl border border-black/5 bg-white px-3.5 py-2 text-sm text-zinc-900 shadow-[0_12px_40px_rgba(0,0,0,0.12)] will-change-[transform,opacity]",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";
