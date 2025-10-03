import { Icon, type IconName, type Tone } from "./Icon";
type Props = { icon: IconName; label: string; tone?: Tone; size?: number; className?: string; };
export function IconButton({ icon, label, tone="ghostOnDark", size=24, className="" }: Props) {
  return (
    <button aria-label={label}
      className={`inline-flex items-center justify-center rounded-full p-2 hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${className}`}
      type="button">
      <Icon name={icon} tone={tone} size={size} />
    </button>
  );
}
