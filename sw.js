/* Abysse Academy · service worker (généré par build.py à partir de sw.template.js)
   - Pages : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
   - Fichiers : cache d'abord. Le nom du cache change à chaque version. */
const VERSION = "abysse-academy-1.0.0";
const ASSETS = [
 "./",
 "index.html",
 "manifest.webmanifest",
 "assets/fonts/fonts.css?v=1.0.0",
 "css/tokens.css?v=1.0.0",
 "css/app.css?v=1.0.0",
 "js/core/ns.js?v=1.0.0",
 "js/core/i18n.js?v=1.0.0",
 "js/core/store.js?v=1.0.0",
 "js/core/content.js?v=1.0.0",
 "js/ui/icons.js?v=1.0.0",
 "js/core/fx.js?v=1.0.0",
 "js/core/game.js?v=1.0.0",
 "js/core/router.js?v=1.0.0",
 "js/ui/ui.js?v=1.0.0",
 "js/core/pwa.js?v=1.0.0",
 "js/views/home.js?v=1.0.0",
 "js/views/learn.js?v=1.0.0",
 "js/views/quiz.js?v=1.0.0",
 "js/views/train.js?v=1.0.0",
 "js/views/lab.js?v=1.0.0",
 "js/views/profile.js?v=1.0.0",
 "locales/fr.js?v=1.0.0",
 "content/fr/worlds.js?v=1.0.0",
 "content/fr/n2.js?v=1.0.0",
 "content/fr/rifap.js?v=1.0.0",
 "content/fr/e1.js?v=1.0.0",
 "content/fr/cards.js?v=1.0.0",
 "content/fr/computer.js?v=1.0.0",
 "content/fr/scenarios.js?v=1.0.0",
 "content/fr/generators.js?v=1.0.0",
 "content/fr/diagrams.js?v=1.0.0",
 "content/fr/progress.js?v=1.0.0",
 "js/app.js?v=1.0.0",
 "assets/fonts/Figtree-c15953e5.woff2",
 "assets/fonts/Figtree-dab710cf.woff2",
 "assets/fonts/JetBrainsMono-480c0625.woff2",
 "assets/fonts/JetBrainsMono-ba16536d.woff2",
 "assets/fonts/Unbounded-06f2e4ae.woff2",
 "assets/fonts/Unbounded-80da0c63.woff2",
 "assets/icons/apple-touch-icon.png",
 "assets/icons/favicon-32.png",
 "assets/icons/icon-192.png",
 "assets/icons/icon-512.png",
 "assets/icons/icon-maskable-512.png",
 "assets/icons/logo.svg"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS))); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "skipWaiting") self.skipWaiting(); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put("index.html", cp)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
    return r;
  })));
});
