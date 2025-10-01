'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
};
export default function SlideDrawer({ title, open, onClose, children, width=420 }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (typeof window === 'undefined') return null;
  return createPortal(
    <>
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 h-dvh bg-white shadow-xl border-l transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width }}
        role="dialog" aria-modal="true" aria-label={title}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h3 className="text-sm font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded px-2 py-1 text-sm hover:bg-gray-100">Close</button>
        </header>
        <div className="p-4 overflow-y-auto h-[calc(100dvh-56px)]">{children}</div>
      </aside>
    </>,
    document.body
  );
}
