import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    env: process.env.VERCEL_ENV || "unknown",
    RL_ENABLE_QUOTES: process.env.RL_ENABLE_QUOTES || "undefined",
    RL_ENABLE_SUBS: process.env.RL_ENABLE_SUBS || "undefined",
  });
}
