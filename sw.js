// sw.js - Service Worker for Odelya (NO PUSH NOTIFICATIONS)
const CACHE_NAME = 'odelya-cache-v3.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/logo2.jpg',
  '/cloud-storage.html', 
  '/it-services.html',
  '/contact.html',
  '/about.html',
  '/privacy-policy.html',
  '/security.html',
  '/user-login.html',
  '/aichatbot.js'
];

// INSTALL - Cache essential files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE - Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// FETCH - Serve from cache or network
self.addEventListener('fetch', event => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if found
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        // Fetch from network
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache the new resource
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        });
      })
      .catch(() => {
        // If both cache and network fail, you could show offline page
        return new Response('You are offline. Please check your connection.');
      })
  );
});

// Auto update when new content is available
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Force update when new version is detected
self.addEventListener('activate', event => {
  console.log('Service Worker: New version activated');
  
  // Claim clients immediately
  event.waitUntil(
    self.clients.claim().then(() => {
      // Notify all clients about update
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'UPDATE_AVAILABLE'
          });
        });
      });
    })
  );
});

// NO PUSH NOTIFICATIONS HERE
// NO BACKGROUND SYNC HERE
// NO PERIODIC SYNC HERE
