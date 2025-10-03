#!/usr/bin/env bash
set -euo pipefail

LAYOUT="app/layout.tsx"
SPRITE_COMP="app/components/IconsSprite.tsx"

if [ ! -f "$LAYOUT" ]; then
  echo "❌ $LAYOUT not found. This script is for Next.js App Router."
  echo "   If you use Pages Router, tell me and I'll give a _document.tsx script."
  exit 1
fi

if [ ! -f "$SPRITE_COMP" ]; then
  echo "❌ $SPRITE_COMP not found. Run the previous installer first or create IconsSprite.tsx."
  exit 1
fi

cp "$LAYOUT" "$LAYOUT.bak.icons"

# 1) Add import (respect 'use client' if present)
if ! grep -q "IconsSprite" "$LAYOUT"; then
  if grep -q "^['\"]use client['\"];$" "$LAYOUT"; then
    # insert after 'use client';
    awk 'NR==1{print; getline; if($0=="\"use client\";"||$0=="'\''use client'\'';"){print; print "import IconsSprite from \"./components/IconsSprite\";"; next} }1' "$LAYOUT" > "$LAYOUT.tmp" \
      || sed -i '1a import IconsSprite from "./components/IconsSprite";' "$LAYOUT"
  else
    sed -i '1i import IconsSprite from "./components/IconsSprite";' "$LAYOUT"
  fi
fi

# 2) Insert <IconsSprite /> right after the first <body ...> opening tag
if ! grep -q "<IconsSprite" "$LAYOUT"; then
  sed -i '0,/<body[^>]*>/ s//&\
        <IconsSprite \/>/' "$LAYOUT"
fi

echo "✅ Wired IconsSprite into $LAYOUT"
echo "   Backup saved to: $LAYOUT.bak.icons"
echo "Next:"
echo "  - Start dev server:  npm run dev"
echo "  - You can now use <Icon/> and <IconButton/> in your TSX files."
