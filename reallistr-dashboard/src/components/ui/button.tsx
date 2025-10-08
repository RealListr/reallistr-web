import * as React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "secondary" | "ghost" };
export function Button({ className="", variant, ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition";
  const styles = variant==="secondary"
    ? "bg-white/10 text-slate-100 hover:bg-white/20"
    : variant==="ghost"
    ? "bg-transparent hover:bg-white/10"
    : "bg-blue-600 hover:bg-blue-700 text-white";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
export default Button;
