import Link from "next/link";
export default function DashNav() {
  const item = "rounded-full border px-3 py-1 text-[13px] hover:bg-neutral-50";
  return (
    <nav className="mb-4 flex gap-2">
      <Link className={item} href="/dashboard">Dashboard</Link>
      <Link className={item} href="/dashboard/quotes">Quotes</Link>
      <Link className={item} href="/dashboard/billing">Billing</Link>
      <span className="flex-1" />
      <Link className={item} href="/">← Back to RealListr</Link>
    </nav>
  );
}
