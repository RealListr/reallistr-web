'use client';
export default function FeedCardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/60 shadow-sm p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-full bg-black/10 animate-pulse" />
        <div className="flex-1">
          <div className="h-3 w-24 bg-black/10 rounded animate-pulse mb-1" />
          <div className="h-2 w-40 bg-black/10 rounded animate-pulse" />
        </div>
        <div className="h-6 w-20 bg-black/10 rounded-full animate-pulse" />
      </div>
      <div className="h-48 w-full rounded-xl bg-black/10 animate-pulse mb-3" />
      <div className="flex gap-3">
        <div className="h-6 w-12 bg-black/10 rounded animate-pulse" />
        <div className="h-6 w-12 bg-black/10 rounded animate-pulse" />
        <div className="h-6 w-12 bg-black/10 rounded animate-pulse" />
      </div>
    </div>
  );
}
