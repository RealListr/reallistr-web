import * as React from "react";

export function Dialog({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">{children}</div>;
}
export function DialogContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`w-full max-w-md rounded-xl border border-white/10 bg-[#0f1218] p-4 text-slate-100 ${className}`}>{children}</div>;
}
export function DialogHeader({ children }: { children: React.ReactNode }) { return <div className="mb-2">{children}</div>; }
export function DialogTitle({ children }: { children: React.ReactNode }) { return <div className="text-lg font-semibold">{children}</div>; }
export function DialogDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`text-sm text-slate-400 ${className}`}>{children}</div>; }
export function DialogFooter({ children }: { children: React.ReactNode }) { return <div className="mt-3">{children}</div>; }
export default Dialog;
