// Nombre del caché (puedes cambiarlo)
const CACHE_NAME = 'mi-pwa-cache-v1';

// El evento 'install' es necesario para que el navegador lo detecte
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
});

// El evento 'fetch' es OBLIGATORIO para que salga el botón de instalar
self.addEventListener('fetch', (event) => {
  // Responde con el recurso de la red (mínimo necesario)
  event.respondWith(fetch(event.request));
});
