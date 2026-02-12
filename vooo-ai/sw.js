// sw.js - Vooo AI Service Worker
const CACHE_NAME = 'vooo-math-v2';
const urlsToCache = [
  '/vooo-ai',
  '/vooo-ai.html',
  '/vooo-ai/pwainstall.js',
  '/vooo-ai/manifest.json',
  '/vooo-ai/vooo_puzzle_engine.js',
  
  // Math level JSON files
  '/vooo-ai/vooo-json/math_toddler.json',
  '/vooo-ai/vooo-json/math_beginner.json',
  '/vooo-ai/vooo-json/math_elementary.json',
  '/vooo-ai/vooo-json/math_intermediate.json',
  '/vooo-ai/vooo-json/math_advanced.json',
  '/vooo-ai/vooo-json/math_expert.json',
  '/vooo-ai/vooo-json/math_scholar.json',
  '/vooo-ai/vooo-json/math_genius.json',
  
  '/vooo-ai/images/vooo-logo.jpg'
];

// Install event
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('SW: Caching app shell');
      return cache.addAll([
        '/vooo-ai',
        '/vooo-ai.html',
        '/vooo-ai/pwainstall.js',
        '/vooo-ai/manifest.json',
        '/vooo-ai/vooo_puzzle_engine.js',
        '/vooo-ai/images/vooo-logo.jpg'
      ]);
    })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  
  // Handle API/JSON requests
  if (url.pathname.includes('/vooo-json/')) {
    event.respondWith(
      networkFirstThenCache(event.request)
    );
    return;
  }

  // For all other requests
  event.respondWith(
    cacheFirst(event.request)
  );
});

// Network first strategy (for JSON data)
async function networkFirstThenCache(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('SW: Serving JSON from cache', request.url);
      return cachedResponse;
    }
    throw error;
  }
}

// Cache first strategy (for static assets)
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return offline page or fallback
    if (request.destination === 'document') {
      return caches.match('/vooo-ai.html');
    }
    throw error;
  }
}

// Optional: Push notifications
self.addEventListener('push', event => {
  const options = {
    body: 'New math challenge available! 🧠',
    icon: '/vooo-ai/images/vooo-logo.jpg',
    badge: '/vooo-ai/images/vooo-logo.jpg',
    vibrate: [100, 50, 100],
    data: {
      url: '/vooo-ai/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Vooo Math Puzzles', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('/vooo-ai/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/vooo-ai/');
      }
    })
  );
});
