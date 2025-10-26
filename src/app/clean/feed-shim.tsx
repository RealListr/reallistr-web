/* Normalizes exports from './feed' so ClientClean always works */
import * as M from './feed';
const pick =
  (M as any).FeedClean ||
  (M as any).Feed ||
  (M as any).default ||
  (Object.values(M).find(v => typeof v === 'function'));
export default function FeedClean(props: any) {
  const C: any = pick || (() => null);
  return <C {...props} />;
}
