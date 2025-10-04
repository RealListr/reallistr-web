"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function MediaRoute(){
  const r = useRouter();
  useEffect(()=>{ try{ (window as any).__openMediaPanel?.(); }catch{} r.replace("/"); },[r]);
  return null;
}
