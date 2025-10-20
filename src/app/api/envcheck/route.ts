import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return NextResponse.json({
    supabaseUrl: url,
    anonKeyStartsWith: key.slice(0, 12),
    anonKeyLength: key.length,
    loaded: Boolean(url && key),
  });
}
