import Link from "next/link";

/** Small top-right icon that links to /agents */
export default function AgentsLink({ className = "" }: { className?: string }) {
  return (
    <Link href="/agents" aria-label="Agents" className={className}>
      {/* Inline "users" icon (no extra deps) */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
        <path d="M16 11a4 4 0 1 0-3.999-4A4 4 0 0 0 16 11ZM8 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 12Z" />
        <path d="M2 19.5C2 16.462 6.03 15 8 15s6 1.462 6 4.5V21H2ZM22 21h-6v-1.5c0-1.49-.565-2.59-1.515-3.375C15.777 15.423 17.73 15 19 15c2.09 0 5 1.038 5 3.75V21Z" />
      </svg>
    </Link>
  );
}
