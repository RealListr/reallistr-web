"use client";
export default function SignInPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-neutral-50 p-6">
      <div className="max-w-sm w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold mb-2 text-neutral-900">Sign in</h1>
        <p className="text-sm text-neutral-600 mb-6">Dev-only entry. Click continue to access private routes.</p>
        <a
          href="/api/dev-login?to=/dashboard"
          className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-4 py-2 text-[14px] font-semibold text-emerald-700 hover:bg-emerald-50"
        >
          Continue (dev)
        </a>
        <div className="mt-4 text-xs text-neutral-500">
          Trouble? Visit <code>/api/health</code> or <code>/api/flags</code>.
        </div>
      </div>
    </main>
  );
}
