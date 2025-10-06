export default function SignInPage() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-sm w-full rounded-2xl border border-neutral-200 p-6 bg-white">
        <h1 className="text-xl font-bold mb-2">Sign in</h1>
        <p className="text-sm text-neutral-600 mb-4">
          Placeholder sign-in. In dev, use the button below to enter the dashboard.
        </p>
        <a
          href="/api/dev-login?to=/dashboard"
          className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-[14px] font-medium text-emerald-700"
        >
          Continue (dev)
        </a>
      </div>
    </div>
  );
}
