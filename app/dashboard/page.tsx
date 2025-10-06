import DashboardNav from "../../components/DashboardNav";

function Section({ title, children }: { title:string; children:React.ReactNode }) {
  return (
    <section className="mb-6 rounded-2xl border border-neutral-200 bg-white p-4">
      <h2 className="mb-2 text-[15px] font-semibold">{title}</h2>
      <div className="text-[13px] text-neutral-600">{children}</div>
    </section>
  );
}

export default function DashboardPage({ searchParams }: { searchParams?: { tab?: string } }) {
  const tab = searchParams?.tab ?? "listings";
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-extrabold mb-2">Agent Dashboard</h1>
      <p className="text-neutral-600 mb-4">Private scaffold — public site remains unchanged.</p>
      <DashboardNav />
      {tab === "listings" && (
        <Section title="Your Listings">
          No listings yet. This will show draft/live status, open-for-inspection slots, and leads per listing.
        </Section>
      )}
      {tab === "leads" && (
        <Section title="Leads">
          Leads from quotes and contact forms will land here with quick reply actions.
        </Section>
      )}
      {tab === "billing" && (
        <Section title="Billing">
          Connect to Stripe subscriptions. (Disabled until <code>RL_ENABLE_SUBS=true</code>.)
        </Section>
      )}
      {tab === "settings" && (
        <Section title="Settings">
          Agency profile, agent seats, notifications, and compliance preferences.
        </Section>
      )}
    </div>
  );
}
