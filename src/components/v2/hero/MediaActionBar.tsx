'use client';
import { IcImage, IcShort, IcPod, IcInfo, IcFacts } from '@/components/icons/rl-icons';

type Item = {
  key: 'images'|'shorts'|'pods'|'info'|'facts';
  label: string;
  onClick: () => void;
  active?: boolean;
};
export default function MediaActionBar({ items }: { items: Item[] }) {
  const icon = (k: Item['key']) => {
    const common = 'mx-auto';
    switch(k){
      case 'images': return <IcImage className={common} />;
      case 'shorts': return <IcShort className={common} />;
      case 'pods':   return <IcPod className={common} />;
      case 'info':   return <IcInfo className={common} />;
      case 'facts':  return <IcFacts className={common} />;
    }
  };
  return (
    <nav className="flex items-center gap-2">
      {items.map(it => (
        <button
          key={it.key}
          onClick={it.onClick}
          className={`flex min-w-[72px] flex-col items-center rounded-full px-3 py-2 text-xs
            ${it.active ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          aria-label={it.label}
        >
          <span className="h-6 w-6">{icon(it.key)}</span>
          <span className="mt-1">{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
