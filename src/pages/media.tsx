"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function MediaRoute() {
  const router = useRouter();
  useEffect(() => {
    try { window.dispatchEvent(new Event("toggle-media-panel")); } catch {}
    router.replace("/");
  }, [router]);
  return null;
}
