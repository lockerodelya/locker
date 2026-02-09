// vooo-sw.js - Vooo AI Service Worker
const CACHE_NAME = 'vooo-ai-v1';
const urlsToCache = [
  '/vooo-ai/',
  '/vooo-ai/index.html',
  '/vooo-ai/pwainstall.js', // Added this (it must be cached!)
  '/vooo-ai/manifest.json', // Added this
  '/vooo-ai/vooo_puzzle_engine.js',
  '/vooo-ai/vooo-json/vooo_quick_math.json',
  '/vooo-ai/images/vooo-logo.jpg'
];

// Install event - Forgiving Version
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Using map so that one 404 error doesn't kill the whole PWA
      return Promise.all(
        urlsToCache.map(url => {
          return cache.add(url).catch(error => {
            console.error('PWA: Failed to cache file:', url, error);
          });
        })
      );
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
