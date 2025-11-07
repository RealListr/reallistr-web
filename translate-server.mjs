// translate-server.mjs
import express from "express";
const app = express();

// CORS (handles OPTIONS preflight)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

app.use(express.json());

// Minimal echo translator so we can verify end-to-end first
app.post("/translate", (req, res) => {
  const { texts = [] } = req.body || {};
  // Just return the input; wiring first, real translation later
  res.json({ translations: texts.map(String) });
});

app.listen(8787, () => console.log("Translate server running on :8787"));
