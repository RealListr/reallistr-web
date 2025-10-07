"use client";
import { useState } from "react";

export type QuotesPayload = {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  services?: string[];
  segment?: string | null;
  listingId?: string | null;
};

export default function QuotesSheet({
  open, onOpenChange, prefill,
  comingSoon=false
}: {
  open: boolean;
  onOpenChange: (v:boolean)=>void;
  prefill?: Partial<QuotesPayload>;
  comingSoon?: boolean;
}) {
  const [status,setStatus] = useState<string>("");

  async function onSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (comingSoon) { setStatus("Quotes are coming soon."); return; }
    setStatus("Submitting…");
    const f = new FormData(e.currentTarget);
    const payload: QuotesPayload = {
      name: f.get("name"), phone: f.get("phone"), email: f.get("email"),
      address: f.get("address"),
      services: Array.from(f.getAll("services") || [] as any),
      segment: f.get("segment"),
      listingId: prefill?.listingId ?? null,
    };
    const res = await fetch("/api/quotes", {
      method:"POST", headers:{ "content-type":"application/json" },
      body: JSON.stringify(payload),
    });
    const j = await res.json().catch(()=>({}));
    if (res.ok) {
      setStatus(`Request sent — leadId: ${j.leadId || "demo"}`);
    } else {
      setStatus(`Error ${res.status}: ${j.message || "failed"}`);
    }
  }

  return (
    <div className={`${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed inset-0 z-[60] transition-opacity`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={()=>onOpenChange(false)} />
      {/* Panel: desktop right drawer, mobile bottom sheet */}
      <div className="
        absolute right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-xl
        md:rounded-none md:translate-y-0
        rounded-t-2xl bottom-0 md:bottom-auto
        md:animate-none
        transition-transform
        translate-y-0 md:translate-x-0
      ">
        <div className="p-5 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Get quotes for this property</h2>
            <button onClick={()=>onOpenChange(false)} className="rounded-full px-3 py-1 text-sm border">Close</button>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            {comingSoon ? "Feature is disabled in this environment." : "We’ll share your details with selected providers."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-3">
          <input name="name" defaultValue={prefill?.name ?? ""} placeholder="Full name" className="w-full border rounded px-3 py-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="phone" defaultValue={prefill?.phone ?? ""} placeholder="Phone" className="border rounded px-3 py-2" />
            <input name="email" defaultValue={prefill?.email ?? ""} placeholder="Email" className="border rounded px-3 py-2" />
          </div>
          <input name="address" defaultValue={prefill?.address ?? ""} placeholder="Address" className="w-full border rounded px-3 py-2" />

          <div className="flex flex-wrap gap-6 text-sm">
            <label className="inline-flex items-center gap-2"><input type="checkbox" name="services" value="valuation" /> Valuation</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" name="services" value="finance" /> Finance</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" name="services" value="insurance" /> Insurance</label>
          </div>
          <div className="flex gap-6 text-sm">
            <label className="inline-flex items-center gap-2"><input type="radio" name="segment" value="domestic" defaultChecked /> Domestic</label>
            <label className="inline-flex items-center gap-2"><input type="radio" name="segment" value="commercial" /> Commercial</label>
          </div>

          <button className="rounded-full border px-4 py-2 font-medium text-emerald-700 hover:bg-emerald-50">
            Send request
          </button>
          {status && <div className="text-sm pt-2">{status}</div>}
        </form>
      </div>
    </div>
  );
}
