import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
export function createApp() {
  return http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'same-origin');
    const respond = (status, text) => { res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(req.method === 'HEAD' ? undefined : text); };
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (pathname.includes('\\') || pathname.includes('\0')) return respond(400, 'Invalid path');
      const admin = /^\/(admin-panal|admin)(\/|$)/i.test(pathname);
      if (!['GET', 'HEAD'].includes(req.method)) {
        res.setHeader('Allow', 'GET, HEAD');
        return respond(405, 'Method not allowed');
      }
      if (admin && !pathname.startsWith('/admin/')) {
        const suffix = pathname.replace(/^\/(admin-panal|admin)\/?/i, '');
        res.writeHead(308, { Location: `/admin/${suffix}` });
        return res.end();
      }
      const relative = admin ? pathname.slice('/admin/'.length) : pathname.replace(/^\/(user-panal\/)?/, '');
      const file = relative || 'index.html';
      // Explicit public roots: never expose credentials, source, or config files.
      const allowed = admin
        ? /^(index\.html|css\/[\w/-]+\.css|js\/[\w/-]+\.js)$/
        : /^(index\.html|pages\/[\w-]+\.html|css\/[\w/-]+\.css|js\/[\w/-]+\.js|assets\/images\/[\w.-]+\.(png|jpe?g|svg|ico))$/;
      if (!allowed.test(file)) return respond(404, 'Not found');
      const directory = resolve(root, admin ? 'admin-panal' : 'user-panal');
      const target = resolve(directory, file);
      if (!target.startsWith(directory + sep)) return respond(404, 'Not found');
      const body = await readFile(target);
      res.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream' });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) {
      respond(error instanceof URIError ? 400 : error.code === 'ENOENT' ? 404 : 500, 'Unable to serve this request');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  createApp().listen(3000, '127.0.0.1', () => {
    console.log('Odhniya listening at http://localhost:3000');
  });
}

