import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'edge'; // fast

export async function POST(req: Request) {
  // Expect: multipart/form-data with field "file"
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'no file' }, { status: 400 });

  const blob = await put(`reallistr/${Date.now()}-${file.name}`, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ url: blob.url });
}
