"use client";
export default function Billing() {
  function choose(plan:string){
    alert(`OK — redirect to: #todo (plan=${plan})`);
  }
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Billing — Stub</h1>
      <div className="flex gap-3">
        <button onClick={()=>choose("basic")} className="rounded-full border px-4 py-2">Basic</button>
        <button onClick={()=>choose("pro")} className="rounded-full border px-4 py-2">Pro</button>
      </div>
    </main>
  );
}
