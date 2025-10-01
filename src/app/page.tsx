'use client';
import Link from "next/link";
export default function HomePage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">RealListr — v2 Experience</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Next-gen property search with conversational filters, dynamic cards, and a global-ready layout.
      </p>
      <div className="flex gap-4">
        <Link href="/v2/properties" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
          Browse Properties
        </Link>
        <Link href="/v2/dashboard" className="px-6 py-3 border rounded-lg hover:bg-gray-100">
          Go to Dashboard
        </Link>
      </div>
      <footer className="mt-16 text-sm text-muted-foreground">© RealListr</footer>
    </main>
  );
}
