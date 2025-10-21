export const dynamic = "force-dynamic";
export const revalidate = 0;

import { createClient } from "@supabase/supabase-js";

export default async function Callback() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env vars aren’t present (e.g., build time), render a safe placeholder.
  if (!url || !anon) {
    return (
      <div style={{padding:24}}>
        <h1>Auth Callback</h1>
        <p>Supabase env vars are not configured in this environment.</p>
      </div>
    );
  }

  const supabase = createClient(url, anon);
  // … your real callback logic can go here later …
  return (
    <div style={{padding:24}}>
      <h1>Auth Callback</h1>
      <p>Supabase ready.</p>
    </div>
  );
}
