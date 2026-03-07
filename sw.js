// sw.js - Service Worker for Odelya + Vooo AI
// Version: 6.0
// ⭐ IMPORTANT: Bump CACHE_VERSION number every time you update any file

const CACHE_VERSION  = '5.0';   // ⭐ CHANGE THIS every time you update files
const CACHE_NAME     = 'odelya-cache-v' + CACHE_VERSION;
const RUNTIME_CACHE  = 'odelya-runtime-v' + CACHE_VERSION;

// ── Files to pre-cache on install ──
// Only truly static files that rarely change
const urlsToCache = [
    '/',
    '/manifest.json',
    '/favicon.ico',
    '/images/logo2.jpg',
    '/images/pwa-icon-192x192.png',
    '/images/pwa-icon-512x512.png',
    '/vooo-ai',
    '/vooo-ai/images/vooo-logo.jpg',
    '/vooo-ai/images/vooo-192.png',
    '/vooo-ai/images/vooo-512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ── Files that should ALWAYS be fetched fresh from network ──
// Add any file here that you update frequently
const ALWAYS_NETWORK = [
    '/vooo-ai/vooo-ai.html',
    '/vooo-ai/vooo-config.js',
    '/vooo-ai/pwavooo.js',
    '/vooo-ai/voooai-tracker.js',
    '/vooo-ai/vooo-ai-control.js',
    '/vooo-ai/vooosignup.html',
    '/vooo-ai/vooologin.html',
    '/vooo-ai/vooodashboard.html',
    '/vooo-ai/vooopricing.html',
    '/vooo-ai/voooreset.html',
    '/vooo-ai/vooonusrpy.html',
];

// ====== INSTALL ======
self.addEventListener('install', event => {
    console.log('📦 SW: Installing v' + CACHE_VERSION);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                const cachePromises = urlsToCache.map(url =>
                    cache.add(url).catch(err => {
                        console.warn('⚠️ Failed to pre-cache:', url, err);
                        return Promise.resolve();
                    })
                );
                return Promise.all(cachePromises);
            })
            .then(() => {
                console.log('📦 SW: Install complete v' + CACHE_VERSION);
                return self.skipWaiting(); // Activate immediately
            })
            .catch(err => console.error('❌ SW Install failed:', err))
    );
});

// ====== ACTIVATE ======
self.addEventListener('activate', event => {
    console.log('🚀 SW: Activating v' + CACHE_VERSION);
    event.waitUntil(
        Promise.all([
            // ── Delete ALL old caches ──
            caches.keys().then(cacheNames =>
                Promise.all(
                    cacheNames.map(name => {
                        if (name !== CACHE_NAME && name !== RUNTIME_CACHE) {
                            console.log('🗑️ SW: Deleting old cache:', name);
                            return caches.delete(name);
                        }
                    })
                )
            ),
            self.clients.claim()
        ]).then(() => {
            console.log('✅ SW: v' + CACHE_VERSION + ' activated');
            // Notify all open tabs about the update
            self.clients.matchAll().then(clients =>
                clients.forEach(client =>
                    client.postMessage({ type: 'SW_UPDATED', version: CACHE_VERSION })
                )
            );
        })
    );
});

// ====== FETCH ======
self.addEventListener('fetch', event => {
    // Skip non-GET, extensions, and Firebase/API calls
    if (event.request.method !== 'GET') return;
    if (event.request.url.startsWith('chrome-extension://')) return;
    if (event.request.url.startsWith('safari-extension://')) return;
    if (event.request.url.includes('firestore.googleapis.com')) return;
    if (event.request.url.includes('firebase')) return;
    if (event.request.url.includes('googleapis.com')) return;
    if (event.request.url.includes('razorpay')) return;
    if (event.request.url.includes('googletagmanager')) return;
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

    const url = new URL(event.request.url);

    // ── Always fetch fresh for frequently updated files ──
    const alwaysNetwork = ALWAYS_NETWORK.some(path =>
        url.pathname === path || url.pathname === path.replace('.html', '')
    );
    if (alwaysNetwork) {
        event.respondWith(networkFirstStrategy(event));
        return;
    }

    // ── Images: Cache First (they rarely change) ──
    if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|ico|svg)$/i)) {
        event.respondWith(cacheFirstStrategy(event));
        return;
    }

    // ── Font Awesome and other CDN CSS: Cache First ──
    if (url.origin !== self.location.origin) {
        event.respondWith(cacheFirstStrategy(event));
        return;
    }

    // ── HTML pages: Network First (so updates reach users) ──
    if (url.pathname.endsWith('.html') ||
        !url.pathname.includes('.') ) {
        event.respondWith(networkFirstStrategy(event));
        return;
    }

    // ── JS and CSS files: Network First (so your code updates work) ──
    if (url.pathname.match(/\.(js|css)$/i)) {
        event.respondWith(networkFirstStrategy(event));
        return;
    }

    // ── Default: Network with cache fallback ──
    event.respondWith(networkWithCacheFallback(event));
});

// ====== STRATEGIES ======

// Network First — always tries network, falls back to cache
function networkFirstStrategy(event) {
    return fetch(event.request)
        .then(response => {
            if (response && response.status === 200) {
                const clone = response.clone();
                caches.open(RUNTIME_CACHE)
                    .then(cache => cache.put(event.request, clone));
            }
            return response;
        })
        .catch(() =>
            caches.match(event.request).then(cached =>
                cached || new Response('You are offline. Please check your connection.', {
                    status: 503,
                    headers: { 'Content-Type': 'text/html' }
                })
            )
        );
}

// Cache First — serves from cache, updates cache in background
function cacheFirstStrategy(event) {
    return caches.match(event.request)
        .then(cached => {
            if (cached) {
                // Update in background silently
                fetch(event.request).then(response => {
                    if (response && response.status === 200) {
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, response));
                    }
                }).catch(() => {});
                return cached;
            }
            return fetchAndCache(event.request);
        })
        .catch(() => offlineFallback(event.request));
}

// Network with cache fallback
function networkWithCacheFallback(event) {
    return fetch(event.request)
        .then(response => {
            if (response && response.status === 200) {
                const clone = response.clone();
                caches.open(RUNTIME_CACHE)
                    .then(cache => cache.put(event.request, clone));
            }
            return response;
        })
        .catch(() =>
            caches.match(event.request).then(cached =>
                cached || new Response('Network error. Please check your connection.', {
                    status: 408,
                    headers: { 'Content-Type': 'text/plain' }
                })
            )
        );
}

// Fetch and store in cache
function fetchAndCache(request) {
    return fetch(request).then(response => {
        if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME)
                .then(cache => cache.put(request, clone));
        }
        return response;
    });
}

// Offline fallback for images
function offlineFallback(request) {
    const url = new URL(request.url);
    if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return new Response(
            '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
            '<rect width="100" height="100" fill="#f0f0f0"/>' +
            '<text x="50" y="55" text-anchor="middle" fill="#999" font-family="Arial" font-size="12">Offline</text>' +
            '</svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
        );
    }
    return new Response('You are offline.', {
        headers: { 'Content-Type': 'text/plain' }
    });
}

// ====== MESSAGE HANDLING ======
self.addEventListener('message', event => {
    switch (event.data && event.data.action) {
        case 'skipWaiting':
            self.skipWaiting();
            break;
        case 'clearCache':
            Promise.all([
                caches.delete(CACHE_NAME),
                caches.delete(RUNTIME_CACHE)
            ]).then(() => {
                if (event.ports[0]) event.ports[0].postMessage({ success: true });
            });
            break;
        case 'getCacheInfo':
            caches.open(CACHE_NAME)
                .then(cache => cache.keys())
                .then(keys => {
                    if (event.ports[0]) event.ports[0].postMessage({
                        count: keys.length,
                        version: CACHE_VERSION
                    });
                });
            break;
    }
});

// ====== ERROR HANDLING ======
self.addEventListener('error', err => console.error('❌ SW Error:', err));

console.log('✅ Odelya + Vooo AI Service Worker v' + CACHE_VERSION + ' loaded');
