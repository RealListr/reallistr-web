"use client";
import * as React from "react";
import QuotesSheet from "./QuotesSheet";

type Props = {
  address?: string;
  listingId?: string;
  withinMedia?: boolean;
  variant?: "icon" | "pill";
};

/** Compact trigger for Quotes modal. Default = icon ghost button */
export default function QuotesButton({
  address,
  listingId,
  withinMedia,
  variant = "icon",
}: Props) {
  const [open, setOpen] = React.useState(false);

  const base = "inline-flex items-center justify-center";
  const iconCls =
    "w-[34px] h-[34px] rounded-full border border-neutral-200 bg-white/90 hover:bg-neutral-50";
  const pillCls =
    "rounded-full border border-neutral-200 px-3 py-1.5 text-[13px] font-medium text-neutral-700 hover:bg-neutral-50";

  function Glyph() {
    // simple “quotes”/speech double-bubble glyph
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 12h5v5H7z" fill="none" stroke="#334155" strokeWidth="1.5" />
        <path d="M12 7h5v5h-5z" fill="none" stroke="#334155" strokeWidth="1.5" />
      </svg>
    );
  }

  const Button =
    variant === "icon" ? (
      <button
        type="button"
        aria-label="Get quotes"
        className={`${base} ${iconCls}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <Glyph />
      </button>
    ) : (
      <button
        type="button"
        className={`${base} ${pillCls}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <span className="mr-2"><Glyph /></span> Quotes
      </button>
    );

  return (
    <>
      {Button}
      <QuotesSheet
        open={open}
        onClose={() => setOpen(false)}
        presetAddress={address}
        presetListingId={listingId}
      />
    </>
  );
}
