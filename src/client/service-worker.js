const VERSION = "v0.0.4";
const CACHE_NAME = `shopin-ico-web-${VERSION}`;
const urlsToCache = [
 "/",
 "/static/main.bundle.css",
 "/static/shopin-ico-web.browser.js"
];

self.addEventListener("install", event => {
 event.waitUntil(
  caches.open(CACHE_NAME)
  .then(cache => cache.addAll(urlsToCache))
 );
});

self.addEventListener("activate", event => {
 event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
 event.respondWith(
  caches.match(event.request, { ignoreSearch: true }).then(response => {
   return response || fetch(event.request);
  })
 );
});
