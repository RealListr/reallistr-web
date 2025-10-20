"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return null;
  if (!authed) return <AuthScreen />;
  return <>{children}</>;
}

function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");

  const onLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  const onRegister = async () => {
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
  };

  const onLogout = async () => { await supabase.auth.signOut(); };

  return (
    <div className="p-6 text-white">
      <h2 className="mb-3 text-xl">RealListr — Sign in</h2>
      <div className="mb-2">
        <input className="rounded bg-white/10 p-2" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mb-2">
        <input className="rounded bg-white/10 p-2" placeholder="Password" type="password"
          value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {error && <div className="mb-2 text-rose-300 text-sm">{error}</div>}
      <div className="flex gap-2">
        {mode === "login" ? (
          <>
            <button className="rounded bg-blue-600 px-3 py-2 text-sm" onClick={onLogin}>Log in</button>
            <button className="rounded bg-slate-600 px-3 py-2 text-sm" onClick={() => setMode("register")}>Create account</button>
          </>
        ) : (
          <>
            <button className="rounded bg-emerald-600 px-3 py-2 text-sm" onClick={onRegister}>Register</button>
            <button className="rounded bg-slate-600 px-3 py-2 text-sm" onClick={() => setMode("login")}>Back to login</button>
          </>
        )}
        <button className="ml-auto rounded bg-slate-700 px-3 py-2 text-xs" onClick={onLogout}>Sign out</button>
      </div>
    </div>
  );
}
