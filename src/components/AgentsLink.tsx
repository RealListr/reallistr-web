import Link from "next/link";

'use client';

export default function AgentsLink({
  onClick,
  className = '',
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label="Agents"
      onClick={onClick}
      className={`p-2 rounded-full hover:bg-neutral-100 ${className}`}
    >
      {/* Ghost users icon (stroke only, no fill) */}
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
        <path d="M8 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 12Z" />
        <path d="M2 21v-1.5C2 16.5 6 15 8 15s6 1.5 6 4.5V21" />
        <path d="M22 21v-1.5c0-3-3.5-3.75-5-3.75-1.7 0-3.43.45-4.5 1.6" />
      </svg>
    </button>
  );
}

