import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ tag: "reallistr-web:stable-rail", now: new Date().toISOString() });
}
