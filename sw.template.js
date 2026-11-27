/* Abysse Academy · service worker (généré par build.py à partir de sw.template.js)
   - Pages : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
   - Fichiers : cache d'abord. Le nom du cache change à chaque version. */
const VERSION = "abysse-academy-__VERSION__";
const ASSETS = __ASSETS__;
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS))); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "skipWaiting") self.skipWaiting(); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  if (req.mode === "navigate") {
    /* 2.8 : réseau d'abord, mais 3 s maximum (avion, wifi sans internet) ; sinon la copie en cache.
       On ne garde que des pages valides (jamais une erreur 404 ou un portail captif). */
    const cached = () => caches.match("index.html", { ignoreSearch: true }).then(h => h || caches.match("./", { ignoreSearch: true }));
    const net = fetch(req).then(r => { if (r.ok && r.type === "basic") { const cp = r.clone(); caches.open(VERSION).then(c => c.put("index.html", cp)); } return r.ok ? r : cached().then(h => h || r); });
    const slow = new Promise(res => setTimeout(res, 3000)).then(cached);
    e.respondWith(new Promise(res => {
      let done = false; const fin = r => { if (!done && r) { done = true; res(r); } };
      net.then(fin, () => cached().then(h => fin(h || Response.error())));
      slow.then(h => { if (h) fin(h); });
    }));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: /\.(woff2?|png|svg|webmanifest)$/.test(url.pathname) }).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
    return r;
  })));
});
