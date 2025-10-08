export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${className || "bg-white/10 text-slate-200"}`}>{children}</span>;
}
export default Badge;
