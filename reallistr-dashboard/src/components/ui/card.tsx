import * as React from "react";
export function Card({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-xl border border-white/10 bg-[rgb(var(--card))] ${className}`} {...props} />;
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) { return <div className="p-4 pb-2" {...props} />; }
export function CardTitle(props: React.HTMLAttributes<HTMLDivElement>) { return <div className="text-base font-semibold" {...props} />; }
export function CardDescription(props: React.HTMLAttributes<HTMLDivElement>) { return <div className="text-xs text-slate-400" {...props} />; }
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) { return <div className="p-4" {...props} />; }
export default Card;
