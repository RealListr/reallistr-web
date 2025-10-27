'use client';
import { useEffect, useRef, useState } from 'react';

const Ic = {
  Users: () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm-8 1c-2.33 0-7 1.17-7 3v2h7v-2c0-.71.24-1.37.65-1.94A8.2 8.2 0 0 1 8 14Z" fill="currentColor"/></svg>,
  Card:  () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2Zm0 4h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" fill="currentColor"/></svg>,
  Shield:() => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2 4 5v6c0 5 3.6 9.7 8 11 4.4-1.3 8-6 8-11V5Z" fill="currentColor"/></svg>,
  Bolt:  () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M11 21 19 10h-5l3-8-8 11h5Z" fill="currentColor"/></svg>,
  Grid:  () => <svg viewBox="0 0 24 24" className="w-5 h-5"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>,
};

export default function ConnectMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Connect"
        onClick={() => setOpen(v=>!v)}
        className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center hover:bg-neutral-50"
      ><Ic.Grid/></button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-xl border border-neutral-200 bg-white shadow-lg p-2 z-30">
          <div className="px-2 py-1 text-[12px] text-neutral-500">Lead requests</div>
          <a href="/connect/agents"    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Users/>  <span className="text-sm">Agents</span></a>
          <a href="/connect/finance"   className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Card/>   <span className="text-sm">Finance</span></a>
          <a href="/connect/insurance" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Shield/> <span className="text-sm">Insurance</span></a>
          <a href="/connect/energy"    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Bolt/>   <span className="text-sm">Energy</span></a>
        </div>
      )}
    </div>
  );
}
