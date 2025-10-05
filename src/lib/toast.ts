let holder: HTMLDivElement | null = null;

export function showToast(msg: string) {
  if (typeof document === "undefined") return;
  if (!holder) {
    holder = document.createElement("div");
    holder.style.position = "fixed";
    holder.style.right = "20px";
    holder.style.bottom = "20px";
    holder.style.zIndex = "9999";
    holder.style.display = "flex";
    holder.style.flexDirection = "column";
    holder.style.gap = "10px";
    document.body.appendChild(holder);
  }
  const el = document.createElement("div");
  el.textContent = msg;
  Object.assign(el.style, {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
    fontSize: "13px",
    color: "#0f172a",
    background: "rgba(255,255,255,.95)",
    border: "1px solid rgba(148,163,184,.35)",
    borderRadius: "999px",
    padding: "10px 14px",
    boxShadow: "0 10px 24px rgba(15,23,42,.12)",
    transform: "translateY(16px)",
    opacity: "0",
    transition: "opacity .18s ease, transform .18s ease",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  } as CSSStyleDeclaration);
  holder!.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    setTimeout(() => el.remove(), 220);
  }, 1800);
}
