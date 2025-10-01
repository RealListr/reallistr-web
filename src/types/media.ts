export type Short = {
  id: string;
  title?: string;
  thumb?: string;      // image URL for tile
  videoUrl: string;    // youtube/embed or mp4
  creator?: string;
  durationSec?: number;
};

export type Pod = {
  id: string;
  title: string;
  src: string;         // audio URL
  author?: string;
  durationSec?: number;
};

export type AgentLite = {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  phone?: string;
  email?: string;
};
