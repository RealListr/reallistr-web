"use client";
import { useState } from "react";

type Plan = { id:string; name:string; price:string; features:string[] };
const plans: Plan[] = [
  { id:"basic",    name:"Basic",    price:"AED 199/mo", features:["1 agent","10 listings","Standard support"] },
  { id:"pro",      name:"Pro",      price:"AED 499/mo", features:["5 agents","50 listings","Priority support"] },
  { id:"business", name:"Business", price:"AED 999/mo", features:["Unlimited agents","Unlimited listings","SLA support"] },
];

export default function Billing() {
  const [msg, setMsg] = useState<string>("");

  async function checkout(plan: string) {
    setMsg("Starting checkout…");
    const res = await fetch("/api/billing", { method: "POST" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return setMsg(`Disabled (${res.status}) — flip RL_ENABLE_SUBS in Vercel to enable`);
    setMsg(`OK — redirect to: ${json.checkoutUrl}`);
    // window.location.href = json.checkoutUrl; // when wired to Stripe
  }

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-extrabold mb-2">Subscriptions</h1>
      <p className="text-neutral-600 mb-4">Private scaffold — uses <code>/api/billing</code>. Production is OFF until we enable the flag.</p>

      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map(p => (
          <div key={p.id} className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-neutral-900 text-2xl font-extrabold my-2">{p.price}</div>
            <ul className="text-sm text-neutral-600 mb-4 list-disc pl-5">
              {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <button
              onClick={() => checkout(p.id)}
              className="rounded-full border border-neutral-200 px-4 py-2 text-[14px] font-medium text-emerald-700 hover:bg-emerald-50"
            >
              Choose {p.name}
            </button>
          </div>
        ))}
      </div>

      {msg && <div className="mt-4 text-sm">{msg}</div>}
    </main>
  );
}
