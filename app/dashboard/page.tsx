import DashNav from "@/components/DashNav";
export default function Dashboard() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Agent Dashboard</h1>
      <DashNav />
      <ul className="space-y-3 text-[15px]">
        <li className="text-neutral-700">• Listings/Leads coming soon.</li>
        <li><a className="underline" href="/dashboard/quotes">Quotes tester</a></li>
        <li><a className="underline" href="/dashboard/billing">Billing stub</a></li>
      </ul>
    </main>
  );
}
