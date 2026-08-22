// Sajilo Builder Service Worker
// Version Control & Lifecycle Management
const PWA_VERSION = 'v1.1.0';
const CACHE_NAME = `sajilo-builder-${PWA_VERSION}`;
const IMAGE_CACHE = `sajilo-images-${PWA_VERSION}`;

const PRECACHE_SHELL = [
  '/',
  '/en',
  '/ne',
  '/en/about',
  '/en/services',
  '/en/equipment-rental',
  '/en/projects',
  '/en/contact',
  '/en/blog',
  '/ne/about',
  '/ne/services',
  '/ne/equipment-rental',
  '/ne/projects',
  '/ne/contact',
  '/ne/blog',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/site.webmanifest',
];

// Install: Cache critical app shell and skip waiting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_SHELL))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('[PWA] Precache warning:', err))
  );
});

// Activate: Purge obsolete caches and claim all clients
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, IMAGE_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !currentCaches.includes(key))
            .map((key) => {
              console.log('[PWA] Deleting obsolete cache:', key);
              return caches.delete(key);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Listen for messages from client (e.g. SKIP_WAITING / GET_VERSION)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: PWA_VERSION });
  }
});

// Fetch: Optimized caching strategy per asset type
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Ignore cross-origin non-http(s)
  if (!url.protocol.startsWith('http')) return;

  // 1. Images: Cache-First with network fallback
  if (
    url.pathname.startsWith('/assets/images/') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg')
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request)
            .then((response) => {
              if (response.ok && response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => cached || caches.match('/favicon.svg'));
        })
      )
    );
    return;
  }

  // 2. Next.js Static Chunks (immutable hashes): Cache-First
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response.ok && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // 3. Navigation / HTML pages: Network-First with Stale Cache Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && url.origin === self.location.origin) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => {
            if (cached) return cached;
            return caches.match('/en');
          })
        )
    );
    return;
  }

  // 4. Other same-origin GET requests: Stale-While-Revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse.ok && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
  }
});
