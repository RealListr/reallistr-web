export default function DashHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border p-4">Views</div>
        <div className="rounded-xl border p-4">Leads</div>
        <div className="rounded-xl border p-4">Listings</div>
      </div>
    </div>
  );
}
