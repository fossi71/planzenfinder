// Pflanzenfinder Service Worker
// Ermöglicht Offline-Nutzung und schnelles Laden

const CACHE_NAME = 'pflanzenfinder-v3';
const OFFLINE_URLS = [
  '/index.html',
  '/manifest.json',
];

// Externe Ressourcen cachen (Leaflet, Fonts)
const EXTERNAL_CACHE = 'pflanzenfinder-ext-v1';
const EXTERNAL_URLS = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap',
];

// ── INSTALL: Alle wichtigen Dateien cachen ──
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => {
        console.log('[SW] App-Dateien werden gecacht...');
        return cache.addAll(OFFLINE_URLS);
      }),
      caches.open(EXTERNAL_CACHE).then(cache => {
        console.log('[SW] Externe Ressourcen werden gecacht...');
        return Promise.allSettled(
          EXTERNAL_URLS.map(url => 
            fetch(url, { mode: 'no-cors' })
              .then(response => cache.put(url, response))
              .catch(() => console.log('[SW] Konnte nicht cachen:', url))
          )
        );
      })
    ]).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: Alte Caches aufräumen ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== EXTERNAL_CACHE)
          .map(key => {
            console.log('[SW] Alter Cache wird gelöscht:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Cache-First für App, Network-First für Karten-Tiles ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // OpenStreetMap Kartenkacheln: Network-First, dann Cache
  if (url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open('osm-tiles-v1').then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // App-Dateien & externe Bibliotheken: Cache-First
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // Nur gültige Antworten cachen
          if (!response || response.status !== 200) return response;
          
          const clone = response.clone();
          const cacheName = url.origin !== location.origin ? EXTERNAL_CACHE : CACHE_NAME;
          caches.open(cacheName).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // Offline-Fallback: Haupt-App zurückgeben
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// ── SYNC: Hintergrund-Sync (für spätere Erweiterungen) ──
self.addEventListener('sync', event => {
  if (event.tag === 'sync-plants') {
    console.log('[SW] Hintergrund-Sync: Pflanzen synchronisieren');
  }
});

// ── NOTIFICATION: Push-Benachrichtigungen (Ernte-Erinnerungen) ──
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/index.html#kalender')
  );
});
