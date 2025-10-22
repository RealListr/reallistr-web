import { NextResponse } from 'next/server';
const shorts = Array.from({length:12}).map((_,i)=>({
  id: String(1000+i),
  title: `Tour #${i+1}`,
  creator: i%2? 'Luxe Realty' : 'Harbor Estates',
  avatarUrl: '',
  videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  coverImageUrl: `https://picsum.photos/seed/short${i}/720/1280`,
  durationSec: 12 + i
}));
export async function GET(){ return NextResponse.json(shorts); }
