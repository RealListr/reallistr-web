import * as React from "react";
export function Tabs({ children }: { children: React.ReactNode }) { return <div>{children}</div>; }
export function TabsList({ children }: { children: React.ReactNode }) { return <div className="inline-flex rounded-md border border-white/10 bg-[rgb(var(--card))] p-1">{children}</div>; }
export function TabsTrigger({ children }: { children: React.ReactNode }) { return <button className="px-3 py-1 text-sm">{children}</button>; }
export function TabsContent({ children }: { children: React.ReactNode }) { return <div className="mt-2">{children}</div>; }
