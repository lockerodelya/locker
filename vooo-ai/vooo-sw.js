// vooo-sw.js - Vooo AI Service Worker
const CACHE_NAME = 'vooo-ai-v1';
const urlsToCache = [
  '/vooo-ai/',
  '/vooo-ai/index.html',
  '/vooo-ai/vooo_puzzle_engine.js',
  '/vooo-ai/vooo-json/vooo_quick_math.json',
  '/vooo-ai/images/vooo-logo.jpg'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
