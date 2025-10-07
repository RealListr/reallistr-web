"use client";
import QuotesButton from "./QuotesButton";

/** Floating Quotes mount shown on every page (desktop + mobile FAB) */
export default function FloatingQuotesMount() {
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
