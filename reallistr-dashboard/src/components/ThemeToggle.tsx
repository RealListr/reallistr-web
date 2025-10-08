export default function ThemeToggle() {
  return (
    <select
      aria-label="Theme"
      className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs"
      defaultValue="dark"
      onChange={(e) => {
        document.body.classList.remove("theme-dim", "theme-light");
        const v = e.target.value;
        if (v !== "dark") document.body.classList.add(v);
      }}
    >
      <option value="dark">Dark</option>
      <option value="theme-dim">Dim</option>
      <option value="theme-light">Light</option>
    </select>
  );
}
