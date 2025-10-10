import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Users, Settings, WalletCards, Rocket, Sparkles, BarChart3 } from "lucide-react";

const NAV = [
  { id: "wallet", label: "Wallet & Leads", icon: WalletCards },
  { id: "campaigns", label: "Campaign Builder", icon: Rocket },
  { id: "creator", label: "Creator & Experiential", icon: Sparkles },
  { id: "analytics", label: "Analytics & Reports", icon: BarChart3 },
  { id: "team", label: "Team View", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export default function RealListrDashboardDarkPreview() {
  const [active, setActive] = useState<string>("wallet");

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_800px_at_10%_-10%,#0f172a,transparent),radial-gradient(1000px_600px_at_90%_-10%,#0b1324,transparent),#0b0d12] text-slate-100">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/10 ring-1 ring-white/15" />
            <span className="text-lg font-semibold tracking-wide">RealListr</span>
          </div>
          <Separator orientation="vertical" className="mx-3 h-6 bg-white/10" />
          <span className="text-sm text-white/60">Demo Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-white/10 text-slate-100 hover:bg-white/20" onClick={() => setActive("campaigns")}>
            + New Campaign
          </Button>
          <Button aria-label="Agents Connect" className="bg-transparent hover:bg-white/10 p-2">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Shell */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
        {/* Left Nav (compact) */}
        <aside className="hidden border-r border-white/10 md:block">
          <nav className="sticky top-0 h-[calc(100vh-48px)] p-3">
            <ScrollArea className="h-full">
              <div className="space-y-1">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                      active === item.id ? "bg-white/10 ring-1 ring-white/15" : "hover:bg-white/5"
                    }`}
                    onClick={() => setActive(item.id)}
                  >
                    <item.icon className="h-4 w-4 text-white/70" />
                    <span>{item.label}</span>
                    {item.id === "wallet" && <Badge className="ml-auto bg-emerald-500/15 text-emerald-300">Live</Badge>}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </nav>
        </aside>

        {/* Content */}
        <main className="p-4 md:p-6">{active === "wallet" ? <WalletPanel /> : <Placeholder name={active} />}</main>
      </div>
    </div>
  );
}

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
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">Subscription</CardTitle>
            <CardDescription className="text-slate-400">Pro • $449/mo • Renews Nov 5</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Button className="bg-white/10 text-slate-100 hover:bg-white/20">Manage Plan</Button>
            <Button className="bg-blue-600">Upgrade to Elite</Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">Ad Credits</CardTitle>
            <CardDescription className="text-slate-400">2 credits available</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Button className="bg-white/10 text-slate-100 hover:bg-white/20">Use Credit</Button>
            <Button>Buy Credits</Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
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

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
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
    <Card className={`relative overflow-hidden border-white/10 bg-white/5 ring-1 ${ring}`}>
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
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
      <div className="text-slate-200">{label}</div>
      <div className="text-slate-400">{meta}</div>
    </div>
  );
}

function Placeholder({ name }: { name: string }) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="text-base capitalize">{name.replace("-", " ")}</CardTitle>
        <CardDescription className="text-slate-400">Coming soon in this demo.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-300">
          This is a trimmed preview so we stay fast and stable. Wallet is fully styled; other sections are placeholders.
        </p>
      </CardContent>
    </Card>
  );
}
