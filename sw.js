/* Coach Concept - Service Worker V0.5.6.4
   Network-first for app files to prevent an older deployment from being pinned in cache.
   Offline fallback retains a cached app shell. Does not touch localStorage, IndexedDB,
   Supabase data, or cross-origin requests. */
const CB_CACHE = 'coach-concept-shell-v0.5.6.4';
const CB_PREFIX = 'coach-concept-shell-';
const ASSETS = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', event => {
 self.skipWaiting();
 event.waitUntil((async () => {
  const cache = await caches.open(CB_CACHE);
  await Promise.allSettled(ASSETS.map(async path => {
   try {
    const response = await fetch(new Request(path, {cache: 'reload'}));
    if(response.ok && response.type === 'basic') await cache.put(path, response);
   } catch (_) { /* Offline: no interference with installation */ }
  }));
 })());
});

self.addEventListener('activate', event => {
 event.waitUntil((async () => {
  const names = await caches.keys();
  await Promise.all(names.filter(name => name.startsWith(CB_PREFIX) && name !== CB_CACHE).map(name => caches.delete(name)));
  await self.clients.claim();
 })());
});

self.addEventListener('fetch', event => {
 const request = event.request;
 if(request.method !== 'GET') return;
 const url = new URL(request.url);
 if(url.origin !== self.location.origin) return;
 const path = url.pathname;
 // Critical: always fetch version information and worker from network, never the app cache.
 if(path.endsWith('/version.json') || path.endsWith('/sw.js')) {
  event.respondWith(fetch(new Request(request, {cache: 'no-store'})));
  return;
 }
 const isNavigation = request.mode === 'navigate';
 const isShell = /\/(index\.html|manifest\.webmanifest|cloud-config\.js)$/.test(path);
 if(!isNavigation && !isShell) return;
 event.respondWith((async () => {
  const cache = await caches.open(CB_CACHE);
  const key = isNavigation ? './index.html' : path.endsWith('/index.html') ? './index.html' : path.endsWith('/manifest.webmanifest') ? './manifest.webmanifest' : './cloud-config.js';
  try {
   const fresh = await fetch(new Request(request, {cache: 'no-store'}));
   if(fresh.ok && fresh.type === 'basic') await cache.put(key, fresh.clone());
   return fresh;
  } catch(err) {
   const fallback = await cache.match(key);
   if(fallback) return fallback;
   throw err;
  }
 })());
});
