export default function SignIn() {
  return (
    <main className="min-h-screen grid place-items-center bg-neutral-50 p-6">
      <div className="max-w-sm w-full rounded-2xl border border-neutral-200 bg-white p-6">
        <h1 className="text-2xl font-extrabold mb-2">Sign in</h1>
        <p className="text-sm text-neutral-600 mb-6">Dev-only entry for preview.</p>
        <a
          href="/api/dev-login?to=/dashboard"
          className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-[14px]"
        >
          Continue (dev)
        </a>
      </div>
    </main>
  );
}
