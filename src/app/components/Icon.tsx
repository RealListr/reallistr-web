import React from "react";

export type IconName =
  | "bed" | "car" | "bath"
  | "solar" | "plug" | "ruler" | "home" | "bolt"
  | "map-pin" | "info" | "bar-chart";

type Props = {
  name: IconName;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
};

export default function Icon({ name, size = 24, style, className }: Props) {
  const merged: React.CSSProperties = {
    color: "rgba(17,24,39,0.70)", // ghost on light bg
    ...style,
  };
  const ref = `#icon-${name}`;
  return (
    <svg width={size} height={size} style={merged} className={className} aria-hidden="true">
      {/* Safari reliability: provide BOTH href and xlinkHref */}
      {/* @ts-ignore - xlinkHref is valid for older UAs */}
      <use href={ref} xlinkHref={ref} />
    </svg>
  );
}
