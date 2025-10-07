"use client";
import QuotesButton from "./QuotesButton";

/**
 * Floating Quotes mount:
 * - Always visible on desktop (bottom-right)
 * - On mobile, appears over content; 'withinMedia' style for compact FAB
 * - Non-invasive: safe to include globally from app/layout.tsx
 */
export default function FloatingQuotesMount() {
  // You can pass real address/listingId later from context/store
  const address = "Preview address";
  const listingId = "preview-listing";
  return (
    <div className="fixed right-4 bottom-4 z-[60]">
      <div className="hidden sm:block">
        <QuotesButton address={address} listingId={listingId} />
      </div>
      <div className="sm:hidden">
        <QuotesButton withinMedia address={address} listingId={listingId} />
      </div>
    </div>
  );
}
