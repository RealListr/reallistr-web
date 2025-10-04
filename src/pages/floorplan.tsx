"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function FloorplanRoute(){
  const r = useRouter();
  useEffect(()=>{ try{ window.dispatchEvent(new CustomEvent("open-floor-plan",{detail:{src:"/images/floorplan-demo.svg"}})); }catch{} r.replace("/"); },[r]);
  return null;
}
