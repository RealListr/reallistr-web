"use client";
import { useState, useEffect } from "react";
import { BadgeDollarSign } from "lucide-react";
import QuotesSheet from "./QuotesSheet";
import { useQuotesFlag } from "./useQuotesFlag";

export default function QuotesButton({
  address, listingId, withinMedia=false
}: {
  address?: string;
  listingId?: string | number;
  /** when true, also render a mobile FAB pinned inside a relative media container */
  withinMedia?: boolean;
}) {
  const [open,setOpen] = useState(false);
  const enabled = useQuotesFlag(); // null|boolean
  const comingSoon = enabled === false;

  // Ghost button for the action row
  const RowBtn = (
    <button
      type="button"
      onClick={()=>setOpen(true)}
      className="hidden sm:inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1.5 text-[14px] hover:bg-neutral-50"
      aria-label="Get quotes"
      title="Get quotes"
    >
      <BadgeDollarSign className="h-[18px] w-[18px]" />
      <span>Quotes</span>
    </button>
  );

  // Mobile floating FAB (auto-hides on sm+; expect parent to be relative)
  const Fab = withinMedia ? (
    <button
      type="button"
      onClick={()=>setOpen(true)}
      aria-label="Get quotes"
      className="sm:hidden absolute bottom-3 right-3 z-20 h-11 w-11 rounded-full border border-neutral-300 bg-white/95 backdrop-blur shadow-md flex items-center justify-center"
    >
      <BadgeDollarSign className="h-[20px] w-[20px]" />
    </button>
  ) : null;

  return (
    <>
      {RowBtn}
      {Fab}
      <QuotesSheet
        open={open}
        onOpenChange={setOpen}
        prefill={{ address, listingId: String(listingId ?? "") }}
        comingSoon={comingSoon}
      />
    </>
  );
}
