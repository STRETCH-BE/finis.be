/**
 * Service Worker for Finis Website
 * Version: 1.0.0
 * Features: Offline support, caching strategy, performance optimization
 */

const CACHE_NAME = 'finis-v1.0.0';
const RUNTIME_CACHE = 'finis-runtime-v1';

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/solutions.html',
    '/realizations.html',
    '/style.css',
    '/script.js',
    '/images/logo.png',
    // Add your critical assets here
];

// Cache strategies
const CACHE_STRATEGIES = {
    // Cache first, fallback to network
    cacheFirst: async (request) => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            // Update cache in background
            fetch(request).then(response => {
                if (response && response.status === 200) {
                    cache.put(request, response.clone());
                }
            });
            return cachedResponse;
        }
        
        try {
            const networkResponse = await fetch(request);
            if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        } catch (error) {
            return cachedResponse || caches.match('/offline.html');
        }
    },
    
    // Network first, fallback to cache
    networkFirst: async (request) => {
        const cache = await caches.open(RUNTIME_CACHE);
        
        try {
            const networkResponse = await fetch(request);
            if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        } catch (error) {
            const cachedResponse = await cache.match(request);
            return cachedResponse || caches.match('/offline.html');
        }
    },
    
    // Stale while revalidate
    staleWhileRevalidate: async (request) => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cachedResponse = await cache.match(request);
        
        const fetchPromise = fetch(request).then(response => {
            if (response && response.status === 200) {
                cache.put(request, response.clone());
            }
            return response;
        });
        
        return cachedResponse || fetchPromise;
    }
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Install complete');
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Install failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => {
                        // Delete old caches
                        return cacheName.startsWith('finis-') && 
                               cacheName !== CACHE_NAME && 
                               cacheName !== RUNTIME_CACHE;
                    })
                    .map(cacheName => {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => {
            console.log('Service Worker: Activation complete');
            // Take control of all clients immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // Determine caching strategy based on request type
    let responsePromise;
    
    if (request.destination === 'document' || 
        request.mode === 'navigate') {
        // HTML pages - network first
        responsePromise = CACHE_STRATEGIES.networkFirst(request);
        
    } else if (request.destination === 'style' || 
               request.destination === 'script') {
        // CSS and JS - stale while revalidate
        responsePromise = CACHE_STRATEGIES.staleWhileRevalidate(request);
        
    } else if (request.destination === 'image') {
        // Images - cache first
        responsePromise = CACHE_STRATEGIES.cacheFirst(request);
        
    } else if (request.destination === 'font') {
        // Fonts - cache first with long expiry
        responsePromise = CACHE_STRATEGIES.cacheFirst(request);
        
    } else {
        // Default - stale while revalidate
        responsePromise = CACHE_STRATEGIES.staleWhileRevalidate(request);
    }
    
    event.respondWith(responsePromise);
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
});

// Sync contact form data when connection is restored
async function syncContactForm() {
    try {
        const cache = await caches.open('form-data');
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            const formData = await response.json();
            
            // Send to server
            const serverResponse = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (serverResponse.ok) {
                // Remove from cache if successful
                await cache.delete(request);
                
                // Notify client
                const clients = await self.clients.matchAll();
                clients.forEach(client => {
                    client.postMessage({
                        type: 'FORM_SYNC_SUCCESS',
                        data: formData
                    });
                });
            }
        }
    } catch (error) {
        console.error('Form sync failed:', error);
    }
}

// Push notifications (if implemented)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update from Finis',
        icon: '/images/icon-192.png',
        badge: '/images/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Project',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Finis Acoustic Architecture', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        // Open specific page
        event.waitUntil(
            clients.openWindow('/realizations.html')
        );
    } else {
        // Open homepage
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for client communication
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        const urlsToCache = event.data.payload;
        caches.open(RUNTIME_CACHE).then(cache => {
            cache.addAll(urlsToCache);
        });
    }
});

// Periodic background sync (Chrome only)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-cache') {
        event.waitUntil(updateCache());
    }
});

// Update cache with latest content
async function updateCache() {
    const cache = await caches.open(CACHE_NAME);
    
    try {
        // Update critical pages
        const pagesToUpdate = [
            '/',
            '/solutions.html',
            '/realizations.html'
        ];
        
        for (const page of pagesToUpdate) {
            const response = await fetch(page);
            if (response && response.status === 200) {
                await cache.put(page, response);
            }
        }
        
        console.log('Cache updated successfully');
    } catch (error) {
        console.error('Cache update failed:', error);
    }
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
    const startTime = performance.now();
    
    event.waitUntil(
        (async () => {
            const response = await event.request;
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            // Log slow requests
            if (duration > 1000) {
                console.warn(`Slow request: ${event.request.url} took ${duration}ms`);
            }
            
            // Send performance data to analytics
            if (self.registration.sync) {
                self.registration.sync.register('analytics-sync');
            }
        })()
    );
});
