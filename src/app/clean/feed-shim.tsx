/* Auto-generated shim to normalize exports from ./feed */
import * as M from './feed';

const pick =
  // Prefer explicit named
  (M as any).FeedClean ||
  (M as any).Feed ||
  // Then default
  (M as any).default ||
  // Otherwise first function export
  (Object.values(M).find(v => typeof v === 'function'));

export default function FeedClean(props: any) {
  const C: any = pick || (() => null);
  return <C {...props} />;
}
