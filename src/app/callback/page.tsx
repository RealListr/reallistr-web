"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/auth/supabaseClient"; // adjust if your client path differs

export default function AuthCallback() {
  const router = useRouter();
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.exchangeCodeForSession().finally(() => router.replace("/"));
  }, [router]);
  return <p style={{color:"#fff",padding:16}}>Completing sign-in…</p>;
}
