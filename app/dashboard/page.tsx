import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Agent Dashboard</h1>
      <ul className="space-y-3">
        <li><Link className="underline" href="/dashboard/quotes">Quotes tester</Link></li>
        <li><Link className="underline" href="/dashboard/billing">Billing stub</Link></li>
      </ul>
    </main>
  );
}
