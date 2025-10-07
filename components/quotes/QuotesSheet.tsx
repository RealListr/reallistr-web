"use client";
import * as React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  presetAddress?: string;
  presetListingId?: string;
};

export default function QuotesSheet({
  open,
  onClose,
  presetAddress,
  presetListingId,
}: Props) {
  const refCard = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function stop(e: React.MouseEvent) {
    e.stopPropagation();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: f.get("name"),
      phone: f.get("phone"),
      email: f.get("email"),
      address: f.get("address"),
      services: Array.from(f.getAll("services")),
      segment: f.get("segment") ?? "domestic",
      listingId: presetListingId ?? undefined,
    };

    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(`Error ${res.status}: ${j.message || "failed"}`);
      return;
    }
    alert(`Request sent ✅  (leadId: ${j.leadId || "demo"})`);
    onClose();
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] flex items-end md:items-center justify-center md:justify-end"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={refCard}
        onClick={stop}
        className="m-3 md:m-6 w-full max-w-[360px] rounded-2xl border border-neutral-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
          <div className="text-[15px] font-semibold">Get quotes for this property</div>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-full border border-neutral-200 hover:bg-neutral-50"
            aria-label="Close"
          >
            <span className="text-neutral-700">×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <input
              name="name"
              placeholder="Full name"
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                name="phone"
                placeholder="Phone"
                className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              />
              <input
                name="email"
                placeholder="Email"
                className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              />
            </div>
            <input
              name="address"
              defaultValue={presetAddress}
              placeholder="Property address"
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            />

            <div className="flex flex-wrap items-center gap-4 text-sm pt-1">
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

            <div className="flex items-center gap-6 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="segment" value="domestic" defaultChecked /> Domestic
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="segment" value="commercial" /> Commercial
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="rounded-full border border-emerald-600 px-4 py-2 text-[14px] font-medium text-emerald-700 hover:bg-emerald-50"
            >
              Send request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
