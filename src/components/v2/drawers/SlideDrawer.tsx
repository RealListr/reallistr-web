'use client';

import { X } from 'lucide-react';
import { type ReactNode, useEffect } from 'react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  side?: 'right' | 'left';
  widthClass?: string; // e.g. "w-[420px]"
  className?: string;
  children: ReactNode;
};

export default function SlideDrawer({
  open,
  onOpenChange,
  title,
  side = 'right',
  widthClass = 'w-full sm:w-[420px]',
  className,
  children,
}: Props) {
  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  const sideClasses =
    side === 'right'
      ? 'right-0 translate-x-full data-[open=true]:translate-x-0'
      : 'left-0 -translate-x-full data-[open=true]:translate-x-0';

  return (
    <div data-open={open} className="fixed inset-0 z-40 pointer-events-none">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => onOpenChange(false)}
        className={`absolute inset-0 bg-black/40 opacity-0 transition-opacity data-[open=true]:opacity-100 ${
          open ? 'pointer-events-auto' : ''
        }`}
        data-open={open}
      />
      {/* Panel */}
      <section
        role="dialog"
        aria-modal="true"
        data-open={open}
        className={`absolute top-0 h-full bg-background shadow-xl transition-transform duration-300 pointer-events-auto ${sideClasses} ${widthClass} ${className ?? ''}`}
      >
        <header className="flex items-center justify-between border-b p-4">
          <h3 className="text-base font-medium">{title ?? ''}</h3>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex size-8 items-center justify-center rounded-md border hover:bg-accent"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="overflow-auto p-4">{children}</div>
      </section>
    </div>
  );
}
