import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Data directories
const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// Utility
function file(name) {
  const f = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(f)) fs.writeFileSync(f, "[]");
  return f;
}
function read(name) {
  return JSON.parse(fs.readFileSync(file(name), "utf8"));
}
function write(name, data) {
  fs.writeFileSync(file(name), JSON.stringify(data, null, 2));
}

// ---- Generic CRUD factory ----
function registerAPI(name) {
  const route = `/api/${name}`;
  app.get(route, (req, res) => res.json(read(name)));
  app.post(route, (req, res) => {
    const list = read(name);
    const item = req.body;
    if (!item.id) item.id = Date.now().toString();
    const i = list.findIndex(x => x.id === item.id);
    if (i >= 0) list[i] = item; else list.unshift(item);
    write(name, list);
    res.json({ ok: true });
  });
  app.delete(`${route}/:id`, (req, res) => {
    const list = read(name);
    write(name, list.filter(x => x.id !== req.params.id));
    res.json({ ok: true });
  });
}

registerAPI("agents");
registerAPI("finance");
registerAPI("insurance");
registerAPI("energy");

app.listen(PORT, () => {
  console.log(`✅ RealListr Connect Centre running at http://localhost:${PORT}`);
});
app.get("/api/feed", (req, res) => {
  res.json(read("agents"));  // mirrors agents as public feed
});
