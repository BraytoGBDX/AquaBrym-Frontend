// public/service-worker.js

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/app.jsx', 
        '/index.html',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// En tu archivo service-worker.js

self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),  // El mensaje del push
    icon: '/icono-192x192.png',  // Icono que se muestra en la notificación
    badge: '/icono-512x512.png',  // Imagen de badge para la notificación
  };

  event.waitUntil(
    self.registration.showNotification('Notificación Push', options)
  );
});

