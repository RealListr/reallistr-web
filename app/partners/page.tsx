async function getPartners() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/partners`, { cache: "no-store" })
    .catch(() => null);
  if (!res || !res.ok) return [];
  return res.json();
}

export default async function PartnersPage() {
  const partners = await getPartners();
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-extrabold mb-2">Partner Console</h1>
      <p className="text-neutral-600 mb-4">Private scaffold — for finance & insurance partners.</p>
      <section className="rounded-2xl border border-neutral-200 bg-white p-4">
        <h2 className="mb-2 text-[15px] font-semibold">Registered Partners</h2>
        {partners.length === 0 ? (
          <div className="text-[13px] text-neutral-600">No partners yet.</div>
        ) : (
          <ul className="space-y-2">
            {partners.map((p:any) => (
              <li key={p.id} className="flex items-center justify-between text-[13px]">
                <span className="text-neutral-900">{p.company}</span>
                <span className="text-neutral-500">{p.vertical} · {p.geo?.join(", ")}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
