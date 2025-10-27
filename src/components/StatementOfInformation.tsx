'use client';
export default function StatementOfInformation() {
  // Minimal permanent floating card (bottom-right)
  return (
    <aside className="fixed z-40 right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] w-[320px] max-w-[90vw] rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur shadow-lg p-4">
      <h3 className="font-semibold">Statement of Information</h3>
      <p className="text-sm text-neutral-700 mt-1">
        Required for Victoria residential property. Includes indicative selling price,
        three comparable properties, and median price for the suburb.
      </p>
      <ul className="mt-3 text-sm text-neutral-800 list-disc pl-4">
        <li>Indicative price: <strong>$X–$Y</strong></li>
        <li>Comparables: <span className="text-neutral-600">Links / IDs</span></li>
        <li>Median suburb price: <span className="text-neutral-600">$…</span></li>
      </ul>
      <a href="/soi/vic/example.pdf" className="inline-block mt-3 text-sm underline">Download PDF</a>
    </aside>
  );
}
