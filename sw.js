/*
 * Service worker for FergeWeb: lagrer selve appen (index.html, ikon og app-beskrivelse),
 * så den kan åpnes uten nett etter første besøk.
 *
 * Strategi: alltid nett først, så man får nyeste versjon når det er dekning. Hver vellykket
 * henting oppdaterer den lagrede kopien. Uten nett brukes den lagrede kopien.
 * Kall til Entur går utenom; avgangene lagres av appen selv (localStorage).
 */
const CACHE = "fergeweb";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

// Første gang: lagre appen med en gang, og ta over uten å vente på at gamle faner lukkes
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const req = event.request;
  // bare appens egne filer; Entur og annet går rett til nettet
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req);
      if (res.ok) {
        // ?samband=… i adressen: lagre som selve siden, så alle samband kan åpnes uten nett
        const key = req.mode === "navigate" ? "index.html" : req;
        await cache.put(key, res.clone());
      }
      return res;
    } catch (err) {
      const hit = req.mode === "navigate"
        ? await cache.match("index.html")
        : await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      throw err;
    }
  })());
});
