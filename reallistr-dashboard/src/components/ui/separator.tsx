export function Separator({ className = "" }: { className?: string }) {
  return <div className={`bg-white/10 ${className || "h-px w-full"}`} />;
}
export default Separator;
