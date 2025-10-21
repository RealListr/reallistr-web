"use client";

/**
 * Temporary stub to unblock builds.
 * Replace with the real QuotesSheet once we re-enable Quotes.
 */
export const QuotesSheet = () => null;
export default QuotesSheet;

/** Optional flag hook some code paths may look for */
export function useQuotesFlag() {
  return { enabled: false };
}
