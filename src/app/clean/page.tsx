import NextDynamic from 'next/dynamic';

// keep the route dynamic so the server never evaluates feed.tsx
export const dynamic = 'force-dynamic';

// DO NOT SSR the client chunk
const ClientClean = NextDynamic(() => import('./ClientClean'), { ssr: false });

export default function Page() {
  return <ClientClean />;
}
