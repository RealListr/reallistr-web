'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Home from './home-v2/page';
export default Home;

export default function Root() {
  const router = useRouter();
  useEffect(() => { router.replace('/home-v2/dev'); }, [router]);
  return null;
}
