export type Short = {
  id?: string | number;     // optional
  title?: string;
  thumb?: string;           // thumbnail image
  href?: string;            // link to open (internal/external)
  videoUrl?: string;        // optional player source
  duration?: number;
};

export type Pod = {
  id?: string | number;     // optional
  title?: string;
  href?: string;            // deeplink to play / detail
  src?: string;             // optional audio stream/file
  duration?: number;
};

export type AgentLite = {
  id?: string | number;     // optional (seed may not have it)
  name: string;
  avatar?: string;
  role?: string;
  href?: string;
};
export type MediaKind = 'image' | 'video' | 'cut'; // cut = ListrCut (short)

export type MediaItem = {
  id: string;
  kind: MediaKind;
  src: string;           // public URL
  thumb?: string;        // small preview (optional)
  alt?: string;
  w?: number;            // natural width  (optional)
  h?: number;            // natural height (optional)
  durationSec?: number;  // videos/cuts only (optional)
};

export type PlanTier = 'lite' | 'active' | 'pro';
