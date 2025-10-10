"use client";
import { useState } from "react";
import DashNav from "../../../components/DashNav";
export default function QuotesTest() {
  const [status,setStatus]=useState("");
  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setStatus("Submitting…");
    const f=new FormData(e.currentTarget);
    const payload={
      name:f.get("name"), phone:f.get("phone"), email:f.get("email"),
      address:f.get("address"), services:Array.from(f.getAll("services")), segment:f.get("segment")
    };
    const res=await fetch("/api/quotes",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
    const j=await res.json().catch(()=>({}));
    setStatus(res.ok?`OK → leadId: ${j.leadId||"demo"}`:`Error ${res.status}: ${j.message||"failed"}`);
  }
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Quotes — Internal Test</h1>
      <DashNav />
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" placeholder="Name" className="w-full border rounded px-3 py-2" />
        <input name="phone" placeholder="Phone" className="w-full border rounded px-3 py-2" />
        <input name="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input name="address" placeholder="Address" className="w-full border rounded px-3 py-2" />
        <div className="flex gap-4 text-sm">
          <label><input type="checkbox" name="services" value="valuation" /> Valuation</label>
          <label><input type="checkbox" name="services" value="finance" /> Finance</label>
          <label><input type="checkbox" name="services" value="insurance" /> Insurance</label>
        </div>
        <div className="flex gap-6 text-sm">
          <label><input type="radio" name="segment" value="domestic" defaultChecked /> Domestic</label>
          <label><input type="radio" name="segment" value="commercial" /> Commercial</label>
        </div>
        <button className="rounded-full border px-4 py-2">Send request</button>
      </form>
      <p className="mt-3 text-sm">{status}</p>
    </main>
  );
}
