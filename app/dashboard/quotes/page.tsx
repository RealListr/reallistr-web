"use client";
import { useState } from "react";

export default function QuotesTestPage() {
  const [status, setStatus] = useState<null | string>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Submitting…");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      address: form.get("address"),
      services: Array.from(form.getAll("services")),
      segment: form.get("segment"),
    };
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    setStatus(res.ok ? `OK → leadId: ${json.leadId}` : `Error ${res.status}: ${json.message || "failed"}`);
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-extrabold mb-2">Quotes — Internal Test</h1>
      <p className="text-neutral-600 mb-4">Posts to <code>/api/quotes</code>. Production remains OFF.</p>

      <form onSubmit={submit} className="space-y-3 max-w-lg rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <input name="name" placeholder="Full name" className="rounded-lg border px-3 py-2 text-sm" required />
          <input name="phone" placeholder="Phone" className="rounded-lg border px-3 py-2 text-sm" />
          <input name="email" placeholder="Email" className="rounded-lg border px-3 py-2 text-sm sm:col-span-2" />
          <input name="address" placeholder="Property address" className="rounded-lg border px-3 py-2 text-sm sm:col-span-2" />
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="services" value="valuation" /> Valuation
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="services" value="finance" /> Finance
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="services" value="insurance" /> Insurance
          </label>
        </div>

        <div className="flex gap-4 text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="segment" value="domestic" defaultChecked /> Domestic
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="segment" value="commercial" /> Commercial
          </label>
        </div>

        <button className="rounded-full border border-neutral-200 px-4 py-2 text-[14px] font-medium text-emerald-700">
          Send request
        </button>

        {status && <div className="text-sm pt-2">{status}</div>}
      </form>
    </div>
  );
}
