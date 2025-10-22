import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.error('[client-log]', JSON.stringify(payload));
  } catch (e) {
    console.error('[client-log] bad payload', e);
  }
  return NextResponse.json({ ok: true });
}
export function clientLog(event: string, payload: any = {}) {
  if (typeof window === 'undefined') return;
  fetch('/api/client-log', { method: 'POST', body: JSON.stringify({ event, payload }) });
}
