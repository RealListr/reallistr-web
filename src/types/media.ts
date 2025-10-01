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
