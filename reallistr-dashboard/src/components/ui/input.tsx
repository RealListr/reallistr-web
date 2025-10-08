import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-md border border-white/10 bg-[rgb(var(--card))] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";
export default Input;
