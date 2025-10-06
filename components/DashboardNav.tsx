"use client";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { key: "listings", label: "Listings" },
  { key: "leads",    label: "Leads" },
  { key: "billing",  label: "Billing" },
  { key: "settings", label: "Settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const active = (new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")).get("tab") || "listings";

  return (
    <div className="mb-4 flex gap-2">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => router.push(`/dashboard?tab=${t.key}`)}
          className={`rounded-full border px-3 py-1.5 text-[13px] ${active===t.key ? "border-neutral-900 text-neutral-900 font-semibold" : "border-neutral-200 text-neutral-600"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
