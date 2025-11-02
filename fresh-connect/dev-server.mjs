import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5176;

const send = (res, code, body, type = 'text/html') => {
  res.writeHead(code, { 'Content-Type': type });
  res.end(body);
};

const readJSON = async (file) =>
  JSON.parse(await fs.readFile(path.join(__dirname, 'data', file), 'utf8').catch(() => '[]'));

const writeJSON = async (file, obj) =>
  fs.writeFile(path.join(__dirname, 'data', file), JSON.stringify(obj, null, 2), 'utf8');

const serveJSON = async (file, res) => {
  try {
    const raw = await fs.readFile(path.join(__dirname, 'data', file), 'utf8');
    return send(res, 200, raw, 'application/json');
  } catch (e) {
    return send(res, 500, JSON.stringify({ ok: false, error: String(e) }), 'application/json');
  }
};

const parseBody = async (req) => new Promise((resolve) => {
  let data = '';
  req.on('data', chunk => { data += chunk; if (data.length > 1e6) req.destroy(); });
  req.on('end', () => {
    try { resolve(JSON.parse(data || '{}')); }
    catch { resolve({}); }
  });
});

const server = http.createServer(async (req, res) => {
  console.log(new Date().toISOString(), req.method, req.url);
  try {
    // ======= API: READ =======
    if (req.url.startsWith('/api/agents') && req.method === 'GET') {
      // /api/agents or /api/agents/:id
      const m = req.url.match(/^\/api\/agents\/([^\/\?\#]+)/);
      if (m) {
        const id = decodeURIComponent(m[1]);
        const rows = await readJSON('agents.json');
        const one = rows.find(x => String(x.id) === String(id));
        return send(res, 200, JSON.stringify(one || null), 'application/json');
      }
      return serveJSON('agents.json', res);
    }
    if (req.url.startsWith('/api/finance')   && req.method === 'GET') return serveJSON('finance.json', res);
    if (req.url.startsWith('/api/insurance') && req.method === 'GET') return serveJSON('insurance.json', res);
    if (req.url.startsWith('/api/energy')    && req.method === 'GET') return serveJSON('energy.json', res);

    // ======= API: CREATE / UPSERT =======
    if (req.url === '/api/agents' && req.method === 'POST') {
      const body = await parseBody(req);
      const rows = await readJSON('agents.json');
      const id = body.id || `a${Date.now()}`;
      const row = {
        id,
        address: body.address || '',
        suburb: body.suburb || '',
        state: body.state || '',
        price: body.price != null ? Number(body.price) : null
      };
      const idx = rows.findIndex(x => String(x.id) === String(id));
      if (idx >= 0) rows[idx] = row; else rows.push(row);
      await writeJSON('agents.json', rows);
      return send(res, 200, JSON.stringify({ ok: true, saved: row }), 'application/json');
    }

    // ======= API: UPDATE =======
    if (req.url.match(/^\/api\/agents\/[^\/\?\#]+$/) && req.method === 'PUT') {
      const id = decodeURIComponent(req.url.split('/').pop());
      const body = await parseBody(req);
      const rows = await readJSON('agents.json');
      const idx = rows.findIndex(x => String(x.id) === String(id));
      if (idx < 0) return send(res, 404, JSON.stringify({ ok: false, error: 'not found' }), 'application/json');
      rows[idx] = { ...rows[idx], ...body, id };
      await writeJSON('agents.json', rows);
      return send(res, 200, JSON.stringify({ ok: true, saved: rows[idx] }), 'application/json');
    }

    // ======= API: DELETE =======
    if (req.url.match(/^\/api\/agents\/[^\/\?\#]+$/) && req.method === 'DELETE') {
      const id = decodeURIComponent(req.url.split('/').pop());
      const rows = await readJSON('agents.json');
      const next = rows.filter(x => String(x.id) !== String(id));
      await writeJSON('agents.json', next);
      return send(res, 200, JSON.stringify({ ok: true, deleted: id }), 'application/json');
    }

    // ======= PAGES (top-level routes render index.html) =======
    if (
      req.url === '/' || req.url === '/index.html' ||
      req.url === '/agents' || req.url === '/finance' ||
      req.url === '/insurance' || req.url === '/energy'
    ) {
      const html = await fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8');
      return send(res, 200, html, 'text/html; charset=utf-8');
    }

    // ======= STATIC FILES (strip query string) =======
    {
      const u = new URL(req.url, 'http://localhost');
      const pathname = u.pathname; // e.g. /agent.html
      const rel = pathname === '/' ? '/index.html' : pathname.replace(/^\/+/, '');
      const filePath = path.join(__dirname, 'public', rel);

      if (filePath.startsWith(path.join(__dirname, 'public'))) {
        try {
          const body = await fs.readFile(filePath);
          const type =
            filePath.endsWith('.js')   ? 'application/javascript' :
            filePath.endsWith('.css')  ? 'text/css' :
            filePath.endsWith('.html') ? 'text/html; charset=utf-8' :
            'text/plain';
          return send(res, 200, body, type);
        } catch (e) {
          // fall through to 404
        }
      }
    }

    return send(res, 404, 'Not found', 'text/plain');
  } catch (e) {
    return send(res, 500, JSON.stringify({ ok: false, error: String(e) }), 'application/json');
  }
});

server.listen(PORT, () => {
  console.log(`Portal (Lite) running: http://localhost:${PORT}/`);
});
