// SlyOS Local Server — run with: node serve-local.js
// Then open http://localhost:3000 in your browser
// Works fully offline after the first visit (models cached by the browser)

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain',
};

const server = http.createServer((req, res) => {
  // Required headers for WebAssembly + SharedArrayBuffer
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  res.setHeader('Access-Control-Allow-Origin', '*');

  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext = path.extname(filePath).toLowerCase();

  // Security: stay within ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback to index.html for SPA navigation
      fs.readFile(path.join(ROOT, 'index.html'), (err2, html) => {
        if (err2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║   SlyOS Demo — Local Server          ║');
  console.log('  ║                                      ║');
  console.log(`  ║   http://localhost:${PORT}              ║`);
  console.log('  ║                                      ║');
  console.log('  ║   Works offline after first visit.   ║');
  console.log('  ║   Press Ctrl+C to stop.              ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
});
