// sw.js - Service Worker for Odelya (Enhanced Version)
// Version: 4.2 (Matches pwainstall.js v4.2)

const CACHE_NAME = 'odelya-cache-v4.2';
const RUNTIME_CACHE = 'odelya-runtime-v4.2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/images/logo2.jpg',
  '/images/pwa-icon-192x192.png',
  '/images/pwa-icon-512x512.png',
  '/cloud-storage.html', 
  '/it-services.html',
  '/contact.html',
  '/about.html',
  '/privacy-policy.html',
  '/security.html',
  '/user-login.html',
  '/user-plan.html',
  '/pwainstall.js',
  '/aichatbot.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ====== INSTALL ======
self.addEventListener('install', event => {
  console.log('📦 Service Worker: Installing v4...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Service Worker: Caching essential files');
        
        // Cache essential files with error handling
        const cachePromises = urlsToCache.map(url => {
          return cache.add(url).catch(error => {
            console.log(`⚠️ Failed to cache: ${url}`, error);
            return Promise.resolve(); // Don't fail entire install
          });
        });
        
        return Promise.all(cachePromises);
      })
      .then(() => {
        console.log('📦 Service Worker: Installation complete');
        return self.skipWaiting(); // Activate immediately
      })
      .catch(error => {
        console.error('❌ Service Worker: Installation failed', error);
      })
  );
});

// ====== ACTIVATE ======
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Activating v4...');
  
  const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE];
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log(`🗑️ Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Claim all clients immediately
      self.clients.claim(),
      
      // Notify all clients about update
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'SW_UPDATED',
            version: '4.0',
            cacheName: CACHE_NAME
          });
        });
      })
    ])
    .then(() => {
      console.log('✅ Service Worker: v4 activated successfully');
    })
  );
});

// ====== FETCH ======
self.addEventListener('fetch', event => {
  // Skip non-GET requests and browser extensions
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.startsWith('safari-extension://')) {
    return;
  }
  
  // Skip if it's a browser sync request
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }
  
  // Handle different strategies based on URL
  const url = new URL(event.request.url);
  
  // Strategy 1: Cache First for static assets
  if (url.origin === self.location.origin && 
      (url.pathname.endsWith('.jpg') || 
       url.pathname.endsWith('.png') ||
       url.pathname.endsWith('.css') ||
       url.pathname.endsWith('.js'))) {
    event.respondWith(cacheFirstStrategy(event));
    return;
  }
  
  // Strategy 2: Network First for HTML pages
  if (url.origin === self.location.origin &&
      url.pathname.endsWith('.html')) {
    event.respondWith(networkFirstStrategy(event));
    return;
  }
  
  // Strategy 3: Stale-While-Revalidate for API calls (future use)
  // Default: Network with cache fallback
  event.respondWith(networkWithCacheFallback(event));
});

// ====== CACHE STRATEGIES ======

// Strategy: Cache First (for static assets)
function cacheFirstStrategy(event) {
  return caches.match(event.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        // Update cache in background
        fetchAndCache(event.request);
        return cachedResponse;
      }
      
      // Not in cache, fetch and cache
      return fetchAndCache(event.request);
    })
    .catch(() => {
      // If everything fails, return offline fallback
      return offlineFallback(event.request);
    });
}

// Strategy: Network First (for HTML pages)
function networkFirstStrategy(event) {
  return fetch(event.request)
    .then(networkResponse => {
      // Cache the fresh response
      const responseClone = networkResponse.clone();
      caches.open(RUNTIME_CACHE)
        .then(cache => cache.put(event.request, responseClone));
      return networkResponse;
    })
    .catch(() => {
      // Network failed, try cache
      return caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return offline page
          return caches.match('/offline.html')
            .then(offlineResponse => offlineResponse || 
              new Response('You are offline. Please check your connection.', {
                headers: {'Content-Type': 'text/html'}
              }));
        });
    });
}

// Strategy: Network with Cache Fallback (default)
function networkWithCacheFallback(event) {
  return fetch(event.request)
    .then(networkResponse => {
      // Cache successful responses
      if (networkResponse.status === 200) {
        const responseClone = networkResponse.clone();
        caches.open(RUNTIME_CACHE)
          .then(cache => cache.put(event.request, responseClone));
      }
      return networkResponse;
    })
    .catch(() => {
      // Network failed, try cache
      return caches.match(event.request)
        .then(cachedResponse => {
          return cachedResponse || 
            new Response('Network error. Please check your connection.', {
              status: 408,
              headers: {'Content-Type': 'text/plain'}
            });
        });
    });
}

// Helper: Fetch and cache
function fetchAndCache(request) {
  return fetch(request)
    .then(response => {
      // Don't cache non-successful responses
      if (!response || response.status !== 200) {
        return response;
      }
      
      const responseToCache = response.clone();
      caches.open(CACHE_NAME)
        .then(cache => cache.put(request, responseToCache));
      
      return response;
    });
}

// Helper: Offline fallback
function offlineFallback(request) {
  const url = new URL(request.url);
  
  if (url.pathname.endsWith('.jpg') || url.pathname.endsWith('.png')) {
    // Return placeholder image for images
    return new Response(
      '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="100" height="100" fill="#f0f0f0"/>' +
      '<text x="50" y="50" text-anchor="middle" fill="#666" font-family="Arial">Image</text>' +
      '</svg>',
      {headers: {'Content-Type': 'image/svg+xml'}}
    );
  }
  
  // Generic offline response
  return new Response(
    'You are offline. Some content may not be available.',
    {headers: {'Content-Type': 'text/plain'}}
  );
}

// ====== MESSAGE HANDLING ======
self.addEventListener('message', event => {
  console.log('📨 Service Worker: Message received', event.data);
  
  switch(event.data.action) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
      
    case 'clearCache':
      caches.delete(CACHE_NAME)
        .then(() => {
          event.ports[0].postMessage({success: true});
        });
      break;
      
    case 'getCacheInfo':
      caches.open(CACHE_NAME)
        .then(cache => cache.keys())
        .then(keys => {
          event.ports[0].postMessage({
            count: keys.length,
            version: '4.0'
          });
        });
      break;
  }
});

// ====== PERIODIC BACKGROUND SYNC (Future Feature) ======
// self.addEventListener('periodicsync', event => {
//   if (event.tag === 'update-check') {
//     console.log('Checking for updates in background...');
//     // You can add update checking logic here
//   }
// });

// ====== ERROR HANDLING ======
self.addEventListener('error', error => {
  console.error('❌ Service Worker Error:', error);
});

// Console log when worker loads
console.log('✅ Odelya Service Worker v4.0 loaded successfully');
