export const flags = {
  quotes: (process.env.RL_ENABLE_QUOTES ?? "false") === "true",
  subs:   (process.env.RL_ENABLE_SUBS   ?? "false") === "true",
  ads:    (process.env.RL_ENABLE_ADS    ?? "false") === "true",
  segments: (process.env.RL_SEGMENTS ?? "domestic").split(",").map(s=>s.trim()),
};
