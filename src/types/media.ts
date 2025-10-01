export type Short = {
  id: string | number;
  title?: string;
  thumb?: string;   // thumbnail image
  href?: string;    // link to open (e.g., /v2/p/[id] or external)
  videoUrl?: string; // optional (YT/Vimeo/file); not all shorts have this yet
  duration?: number;
};

export type Pod = {
  id: string | number;
  title?: string;
  href?: string;    // page/deeplink to play
  src?: string;     // optional audio file/stream url
  duration?: number;
};

export type AgentLite = {
  id: string | number;
  name: string;
  avatar?: string;
  role?: string;
  href?: string;
};
