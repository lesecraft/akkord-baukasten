// Minimaler Service Worker: cached die App-Hülle, damit die PWA offline
// startet und Android/Chrome sie als "installierbar" erkennt.
// Cache-Name bei Änderungen an den Assets hochzählen (v1 -> v2 ...),
// damit Nutzer:innen automatisch die neue Version bekommen.
const CACHE_NAME = 'akkord-baukasten-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-any-192.png',
  './icons/icon-any-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first, mit Netzwerk-Fallback (und Nachcachen frischer Antworten).
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
