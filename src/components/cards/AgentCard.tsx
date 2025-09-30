import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type AgentCardProps = {
  handle: string;
  name: string;
  brandName?: string;
  avatarUrl?: string;
  listingsCount?: number;
  adSlot?: React.ReactNode;
}

export function AgentCard({ handle, name, brandName, avatarUrl, listingsCount, adSlot }: AgentCardProps) {
  return (
    <div className="rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="p-4 flex items-center gap-4">
        <div className="relative h-14 w-14 rounded-full overflow-hidden">
          <Image src={avatarUrl || "/placeholder-avatar.png"} alt={name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <Link href={`/a/${handle}`} className="font-semibold hover:opacity-80">{name}</Link>
          {brandName && <div className="text-xs text-neutral-600">{brandName}</div>}
        </div>
        {typeof listingsCount === 'number' && (
          <Badge variant="secondary">{listingsCount} listings</Badge>
        )}
      </div>
      {adSlot && <div className="border-t p-4 bg-neutral-50">{adSlot}</div>}
    </div>
  );
}
