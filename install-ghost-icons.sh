#!/usr/bin/env bash
set -euo pipefail

APP_DIR="app"
LAYOUT="$APP_DIR/layout.tsx"
COMP_DIR="$APP_DIR/components"
PUB_DIR="public/icons"

if [ ! -f "$LAYOUT" ]; then
  echo "❌ $LAYOUT not found. This script is for Next.js App Router projects."
  echo "   If your layout file is elsewhere, edit the LAYOUT path at the top and re-run."
  exit 1
fi

mkdir -p "$COMP_DIR" "$PUB_DIR"

# sprite
cat > "$PUB_DIR/sprite.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/><line x1="12" y1="10" x2="12" y2="16"/><circle cx="12" cy="7" r="1"/>
  </symbol>
  <symbol id="icon-play" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="6" width="16" height="12" rx="2"/><polygon points="10,9 16,12 10,15"/>
  </symbol>
  <symbol id="icon-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="5" width="6" height="12" rx="3"/><path d="M5 12a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="20"/><line x1="9" y1="20" x2="15" y2="20"/>
  </symbol>
  <symbol id="icon-map-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21s-6-5-6-10a6 6 0 1 1 12 0c0 5-6 10-6 10z"/><circle cx="12" cy="11" r="2.75"/>
  </symbol>
  <symbol id="icon-bed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 18v-5a3 3 0 0 1 3-3h11a2 2 0 0 1 2 2v6"/><path d="M7 10h5a3 3 0 0 1 3 3v5"/><line x1="4" y1="18" x2="20" y2="18"/>
  </symbol>
  <symbol id="icon-bath" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="12" width="16" height="5" rx="2.5"/><path d="M8 12V9"/><path d="M8 9c0-2 2-3 4-3"/><line x1="6" y1="17" x2="6" y2="19"/><line x1="18" y1="17" x2="18" y2="19"/>
  </symbol>
  <symbol id="icon-car" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 16l1.5-4a2 2 0 0 1 1.9-1.4H15.6a2 2 0 0 1 1.9 1.4L19 16"/><path d="M7 16h10"/><circle cx="8.5" cy="17.5" r="1.5"/><circle cx="15.5" cy="17.5" r="1.5"/><path d="M8 10l2-3h4l2 3"/>
  </symbol>
  <symbol id="icon-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 5h6l5 5-8 8-5-5V5z"/><circle cx="13.5" cy="8.5" r="1.25"/>
  </symbol>
  <symbol id="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="6"/><line x1="16.5" y1="16.5" x2="20" y2="20"/>
  </symbol>
  <symbol id="icon-filter" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 6h16"/><path d="M7 12h10"/><path d="M10 18h4"/>
  </symbol>
  <symbol id="icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21s-7-6-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5-7 11-7 11z"/>
  </symbol>
  <symbol id="icon-bookmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"/>
  </symbol>
  <symbol id="icon-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 16.5v2a2 2 0 0 1-2.2 2c-3.2-.4-6.3-1.9-8.7-4.3s-3.9-5.5-4.3-8.7A2 2 0 0 1 8 4h2l1.5 3-2 2a12 12 0 0 0 7.5 7.5l2-2 3 1.5z"/>
  </symbol>
  <symbol id="icon-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 8l9 7 9-7"/>
  </symbol>
  <symbol id="icon-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="3" y1="10" x2="21" y2="10"/>
  </symbol>
  <symbol id="icon-share" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="6" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="12" r="2"/><line x1="7.7" y1="10.7" x2="10.3" y2="7.3"/><line x1="13.7" y1="7.3" x2="16.3" y2="10.7"/>
  </symbol>
</svg>
SVG

# components
cat > "$COMP_DIR/IconsSprite.tsx" <<'TSX'
export default function IconsSprite() {
  return (
    <div style={{ display: "none" }} aria-hidden="true" dangerouslySetInnerHTML={{
      __html: require("fs").readFileSync("public/icons/sprite.svg", "utf8")
    }} />
  );
}
TSX

cat > "$COMP_DIR/Icon.tsx" <<'TS'
type Tone = "ghost" | "ghostOnDark" | "disabled" | "solid";
export function Icon({
  name,
  size = 24,
  tone = "ghost",
  className = "",
}: {
  name:
    | "info" | "play" | "mic" | "map-pin" | "bed" | "bath" | "car" | "tag"
    | "search" | "filter" | "heart" | "bookmark" | "phone" | "mail"
    | "calendar" | "share";
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    ghost: "text-gray-900/60 hover:text-gray-900/100",
    ghostOnDark: "text-white/70 hover:text-white/100 drop-shadow",
    disabled: "text-gray-400/40",
    solid: "text-gray-900",
  };
  return (
    <svg width={size} height={size} className={`${tones[tone]} transition-colors ${className}`} aria-hidden="true">
      <use href={`#icon-${name}`} />
    </svg>
  );
}
TS

cat > "$COMP_DIR/IconButton.tsx" <<'TS'
import { Icon } from "./Icon";
export function IconButton({
  icon,
  label,
  tone = "ghostOnDark",
  size = 24,
  className = "",
}: {
  icon: React.ComponentProps<typeof Icon>["name"];
  label: string;
  tone?: React.ComponentProps<typeof Icon>["tone"];
  size?: number;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-full p-2 hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${className}`}
      type="button"
    >
      <Icon name={icon} tone={tone as any} size={size} />
    </button>
  );
}
TS

# inject import + <IconsSprite />
cp "$LAYOUT" "$LAYOUT.bak.icons"
if ! grep -q "IconsSprite" "$LAYOUT"; then
  sed -i '1i import IconsSprite from "./components/IconsSprite";' "$LAYOUT"
fi
sed -i '0,/<body[^>]*>/ s//&\
        <IconsSprite \/>/' "$LAYOUT"

echo "✅ Ghost icons installed."
echo "   - public/icons/sprite.svg"
echo "   - app/components/{IconsSprite.tsx, Icon.tsx, IconButton.tsx}"
echo "   - Injected <IconsSprite /> into app/layout.tsx (backup at app/layout.tsx.bak.icons)"
