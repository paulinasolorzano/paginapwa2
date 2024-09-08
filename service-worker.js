const cacheName = 'todo-cache-v1';
const assets = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/images/icon-192.png',
    '/images/icon-512.png'
];

// Instalación del Service Worker y cacheo de los archivos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assets);
        })
    );
});

// Activación del Service Worker y manejo de versiones anteriores
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(thisCache => {
                    if (thisCache !== cacheName) {
                        return caches.delete(thisCache);
                    }
                })
            );
        })
    );
});

// Intercepción de las solicitudes para servir desde el caché
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
