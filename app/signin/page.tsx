import Link from "next/link";

export default function SignIn() {
  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <p className="text-neutral-600 mb-6">Dev-only entry for preview.</p>
      <Link href="/dashboard" className="inline-block rounded-full border px-4 py-2 hover:bg-neutral-50">
        Continue (dev)
      </Link>
    </main>
  );
}
