# Fail fast
set -e

# Patch: hover-expand + pin for the left nav (Option 2+)
cat > src/components/dashboard/RealListrDashboardDarkPreview.tsx <<'EOF'
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import {
  MoreVertical,
  Image as ImageIcon,
  Users,
  Settings,
  WalletCards,
  Rocket,
  Sparkles,
  BarChart3,
  Pin,
  PinOff
} from "lucide-react";

/**
 * REAL LISTR – DARK DASHBOARD (Option 2+: Hover-Expand + Pin)
 */

const NAV = [
  { id: "wallet", label: "Wallet & Leads", icon: WalletCards },
  { id: "campaigns", label: "Campaign Builder", icon: Rocket },
  { id: "social", label: "Social Distribution", icon: Rocket },
  { id: "creator", label: "Creator & Experiential", icon: Sparkles },
  { id: "analytics", label: "Analytics & Reports", icon: BarChart3 },
  { id: "team", label: "Team View", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export default function RealListrDashboardDarkPreview() {
  const [active, setActive] = useState<string>("wallet");
  const [agentConnectOpen, setAgentConnectOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("prop_101");

  // NEW: nav hover + pin
  const [navHovered, setNavHovered] = useState(false);
  const [navPinned, setNavPinned] = useState(false);
  const navExpanded = navPinned || navHovered;

  const properties = [
    { id: "prop_101", addr: "12 King St, Newtown NSW", img: "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1200&auto=format&fit=crop" },
    { id: "prop_102", addr: "55 Market Rd, Richmond VIC", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop" },
    { id: "prop_103", addr: "8 Harbour Ave, Southport QLD", img: "https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1200&auto=format&fit=crop" },
  ];

  return (
    <div className="min-h-screen w-full text-slate-100">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          {/* Logo top-left */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/10 ring-1 ring-white/15" />
            <span className="text-lg font-semibold tracking-wide">RealListr</span>
          </div>
          <Separator orientation="vertical" className="mx-3 h-6 bg-white/10" />
          {/* Property selector with images */}
          <div className="hidden items-center gap-2 sm:flex">
            <ImageIcon className="h-4 w-4 text-white/60" />
            <select
              className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-slate-100 outline-none"
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.addr}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button className="bg-white/10 text-slate-100 hover:bg-white/20" onClick={() => setActive("campaigns")}>
            + New Campaign
          </Button>
          <Button aria-label="Agents Connect" title="Agents Connect" className="bg-transparent hover:bg-white/10 p-2" onClick={() => setAgentConnectOpen(true)}>
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Shell: compact rail + main (grid col size reacts to expanded state) */}
      <div
        className={`mx-auto grid max-w-[1400px] grid-cols-1 transition-[grid-template-columns] duration-200 md:grid-cols-[${navExpanded ? "220px" : "72px"}_minmax(0,1fr)]`}
      >
        {/* Left Nav (hover expands; pin persists) */}
        <aside
          className="hidden border-r border-white/10 md:block"
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        >
          <nav className="sticky top-0 h-[calc(100vh-48px)] p-2">
            <div className="mb-2 flex items-center justify-end px-1">
              <button
                onClick={() => setNavPinned((p) => !p)}
                className={`inline-flex items-center gap-2 rounded-lg border border-white/10 px-2 py-1 text-xs transition
                  ${navExpanded ? "bg-white/10 hover:bg-white/15" : "bg-transparent hover:bg-white/5"}`}
                title={navPinned ? "Unpin menu" : "Pin menu"}
                aria-pressed={navPinned}
              >
                {navPinned ? <Pin className="h-3.5 w-3.5" /> : <PinOff className="h-3.5 w-3.5" />}
                {navExpanded && <span>{navPinned ? "Pinned" : "Pin"}</span>}
              </button>
            </div>

            <ScrollArea className="h-[calc(100%-40px)]">
              <div className="flex flex-col gap-2">
                {NAV.map((item) => {
                  const Active = active === item.id;
                  return (
                    <button
                      key={item.id}
                      className={[
                        "group relative flex items-center rounded-xl px-2 py-2 transition",
                        Active ? "bg-white/10 ring-1 ring-white/15" : "hover:bg-white/5",
                        navExpanded ? "justify-start gap-3" : "h-10 w-10 justify-center"
                      ].join(" ")}
                      onClick={() => setActive(item.id)}
                      aria-label={item.label}
                      title={navExpanded ? undefined : item.label}
                    >
                      <item.icon className={`h-4 w-4 ${Active ? "text-white" : "text-white/70"}`} />
                      {navExpanded && <span className="text-sm">{item.label}</span>}
                      {item.id === "wallet" && (
                        <span className="absolute -right-1 -top-1 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-400/90 ring-2 ring-[#0b0d12]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </nav>
        </aside>

        {/* Content */}
        <main className="p-4 md:p-6">
          {active === "wallet" && <WalletPanel />}
          {active === "campaigns" && <CampaignsPanel selectedProperty={selectedProperty} properties={properties} />}
          {active === "social" && <SocialPanel />}
          {active === "creator" && <CreatorPanel />}
          {active === "analytics" && <AnalyticsPanel />}
          {active === "team" && <TeamPanel />}
          {active === "settings" && <SettingsPanel />}
        </main>
      </div>

      {/* Agents Connect (password) */}
      <Dialog open={agentConnectOpen}>
        <DialogContent className="border-white/10 bg-[#0f1218] text-slate-100">
          <DialogHeader>
            <DialogTitle>Agents Connect</DialogTitle>
            <DialogDescription className="text-slate-400">
              Private access for agents & agencies. Enter your credentials to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Email" />
            <Input type="password" placeholder="Password" />
          </div>
          <DialogFooter>
            <Button className="w-full">Sign In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ---------------- Wallet & Leads ---------------- */
function WalletPanel() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Wallet & Leads</h1>
          <p className="text-sm text-slate-400">Your balances, subscriptions and quick top-ups.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25">Top Up Leads</Button>
          <Button className="bg-white/10 text-slate-100 hover:bg-white/20">View Orders</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Valuation Leads" value="48" hint="Leads available" accent="emerald" />
        <StatCard title="Finance Leads" value="14" hint="Leads available" accent="sky" />
        <StatCard title="Insurance Leads" value="22" hint="Leads available" accent="violet" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subscription</CardTitle>
            <CardDescription className="text-slate-400">Pro • $449/mo • Renews Nov 5</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Button className="bg-white/10 text-slate-100 hover:bg-white/20">Manage Plan</Button>
              <Button className="bg-blue-600 ring-1 ring-blue-400/30 shadow-[0_0_30px_rgba(56,189,248,.15)]">Upgrade to Elite</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ad Credits</CardTitle>
            <CardDescription className="text-slate-400">2 credits available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Button className="bg-white/10 text-slate-100 hover:bg-white/20">Use Credit</Button>
              <Button>Buy Credits</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Projected ROI</CardTitle>
            <CardDescription className="text-slate-400">Based on last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-emerald-300">+212%</div>
            <p className="mt-1 text-xs text-slate-400">Tip: Add +$250 to boost reach by ~12,000 impressions.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <ActivityRow label="Lead Pack Purchase" meta="Valuation • +28" />
            <ActivityRow label="Premier Ad Package" meta="Ad credit • +1" />
            <ActivityRow label="Lead Assigned" meta="Valuation • −1" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  hint,
  accent,
}: {
  title: string;
  value: string;
  hint: string;
  accent?: "emerald" | "sky" | "violet";
}) {
  const ring =
    accent === "emerald" ? "ring-emerald-400/30" : accent === "sky" ? "ring-sky-400/30" : "ring-violet-400/30";
  const glow =
    accent === "emerald" ? "from-emerald-500/20" : accent === "sky" ? "from-sky-500/20" : "from-violet-500/20";
  return (
    <Card className={`relative overflow-hidden ring-1 ${ring}`}>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glow} via-transparent to-transparent`} />
      <CardHeader>
        <CardTitle className="text-sm text-slate-300">{title}</CardTitle>
        <CardDescription className="text-4xl font-semibold text-slate-100">{value}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-slate-400">{hint}</div>
      </CardContent>
    </Card>
  );
}

function ActivityRow({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[rgb(var(--card))] px-3 py-2 text-sm">
      <div className="text-slate-200">{label}</div>
      <div className="text-slate-400">{meta}</div>
    </div>
  );
}

/* ---------------- Campaigns ---------------- */
function CampaignsPanel({ selectedProperty, properties }: any) {
  const prop = properties.find((p: any) => p.id === selectedProperty);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Campaign Builder</h1>
        <Button>Boost This Listing</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Selected Property</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg border border-white/10">
                <img src={prop.img} className="h-full w-full object-cover" alt="property" />
              </div>
              <div>
                <div className="text-lg font-medium">{prop.addr}</div>
                <div className="text-xs text-slate-400">4 campaigns • $4,250 spent • 19 leads</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Budget</CardTitle>
            <CardDescription className="text-slate-400">Allocate spend for this campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">$2,500</div>
            <p className="text-xs text-slate-400">Est. reach: 42,000</p>
            <Button className="mt-3 w-full">Allocate Budget</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Smart Suggestions</CardTitle>
          <CardDescription className="text-slate-400">Based on similar listings in your area</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Suggestion label="+ $250 for ~12k more impressions" />
          <Suggestion label="Add TikTok for 4.5× engagement" />
          <Suggestion label="Threads boost +$99" />
        </CardContent>
      </Card>
    </div>
  );
}

function Suggestion({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[rgb(var(--card))] px-3 py-2 text-sm">
      <span className="text-slate-200">{label}</span>
      <Button className="bg-white/10 text-slate-100 hover:bg-white/20">Apply</Button>
    </div>
  );
}

/* ---------------- Social ---------------- */
function SocialPanel() {
  const rows = [
    { name: "Facebook / Instagram", spend: 800, reach: 18000 },
    { name: "LinkedIn", spend: 300, reach: 4000 },
    { name: "TikTok", spend: 400, reach: 7000 },
    { name: "Threads", spend: 200, reach: 3000 },
    { name: "X (Twitter)", spend: 250, reach: 3500 },
    { name: "Google Display (GDN)", spend: 550, reach: 6500 },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Social Distribution</h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Spend</th>
                <th className="px-4 py-3">Est. Reach</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-t border-white/10">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">${r.spend}</td>
                  <td className="px-4 py-3">{r.reach.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Button>Adjust</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Creator & Experiential ---------------- */
function CreatorPanel() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Creator & Experiential</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Property Influencer Shorts</CardTitle>
            <CardDescription className="text-slate-400">15–45s vertical content – tagged to listing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Price on request</div>
            <div className="mt-3 flex gap-2">
              <Button className="bg-white/10 text-slate-100 hover:bg-white/20">Request Quote</Button>
              <Button>Brief Creator</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Shopping Centre Walkthrough Display</CardTitle>
            <CardDescription className="text-slate-400">Looped short-form on retail screens + QR</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Price on request</div>
            <div className="mt-3 flex gap-2">
              <Button className="bg-white/10 text-slate-100 hover:bg-white/20">Request Locations</Button>
              <Button>Get Quote</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- Analytics ---------------- */
function AnalyticsPanel() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics & Reports</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Funnel (Last 30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3 text-center">
              <FunnelStep label="Impressions" value="42,000" />
              <FunnelStep label="Clicks" value="8,300" />
              <FunnelStep label="Leads" value="412" />
              <FunnelStep label="Conversions" value="38" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Client Reports</CardTitle>
            <CardDescription className="text-slate-400">Branded: Powered by RealListr</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate PDF</Button>
            <Button className="mt-2 w-full bg-white/10 text-slate-100 hover:bg-white/20">Export CSV</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FunnelStep({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[rgb(var(--card))] p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

/* ---------------- Team ---------------- */
function TeamPanel() {
  const rows = [
    { name: "Jane Liu", leads: 19, spend: 3250 },
    { name: "Aaron Kim", leads: 15, spend: 2850 },
    { name: "Sophie Tran", leads: 12, spend: 1980 },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Team View</h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Leads</th>
                <th className="px-4 py-3">Spend</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-t border-white/10">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.leads}</td>
                  <td className="px-4 py-3">${r.spend.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Button>Assign Budget</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Settings ---------------- */
function SettingsPanel() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Billing & Payments</CardTitle>
          <CardDescription className="text-slate-400">Stripe / Airwallex integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button>Connect Stripe</Button>
            <Button className="bg-white/10 text-slate-100 hover:bg-white/20">Connect Airwallex</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
EOF

echo "✅ Hover-expand + Pin applied. If Vite isn't running: npm run dev -- --host --port 5173 && gp url 5173"
