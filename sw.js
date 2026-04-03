// SlyOS Service Worker — offline-first caching
const CACHE = 'slyos-v1';

// App shell — cached on install
const SHELL = [
  '/',
  '/index.html',
  '/slyos-sdk-patched.js',
];

// ── Install: pre-cache the shell ──────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL))
  );
  self.skipWaiting();
});

// ── Activate: delete old caches ───────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: cache-first for everything except HF model weights ─────────────────
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Only handle GET over http(s)
  if (e.request.method !== 'GET') return;
  if (!url.startsWith('http')) return;

  // HuggingFace model files — transformers.js manages its own IndexedDB cache,
  // let it pass through; trying to re-cache multi-GB blobs here would exhaust
  // Cache Storage on most devices.
  if (url.includes('huggingface.co') || url.includes('hf.co')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      // Serve from cache immediately if available
      if (cached) {
        // Background revalidate for CDN assets (stale-while-revalidate)
        const bg = fetch(e.request).then(res => {
          if (res && res.status === 200 && res.type !== 'opaque') {
            caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          }
          return res;
        }).catch(() => {});
        return cached;
      }

      // Not in cache — fetch, then store
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'error') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => {
        // Offline and not in cache — return the shell for navigation requests
        if (e.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
