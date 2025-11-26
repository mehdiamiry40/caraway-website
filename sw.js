const CACHE_VERSION = 'v3';
const CACHE_NAME = `caraway-${CACHE_VERSION}`;
const OFFLINE_URL = './offline.html';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './logo.svg',
  './images/hero-car.jpg',
  './manifest.json',
  './offline.html',
  './faq.html',
  './blog/ultimate-guide-cash-for-cars-brisbane.html',
  './blog/5-reasons-local-cash-for-cars-brisbane.html',
  './blog/cash-for-cars-vs-private-sale.html',
  './blog/10-tips-maximize-cash-for-cars-price.html',
  './blog/what-paperwork-needed-cash-for-cars.html',
  './blog/how-to-sell-damaged-car-cash-for-cars.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
          return null;
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'worker') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(
    caches.match(request).then(response => response || fetch(request))
  );
});

function staleWhileRevalidate(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request).then(response => {
      const fetchPromise = fetch(request).then(networkResponse => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
      }).catch(() => response);
      return response || fetchPromise;
    });
  });
}

function cacheFirst(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request).then(response => {
      if (response) {
        return response;
      }
      return fetch(request).then(networkResponse => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
      });
    }).catch(() => caches.match(OFFLINE_URL));
  });
}
