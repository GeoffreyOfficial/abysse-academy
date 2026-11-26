/* =====================================================================
   Abysse Academy · espace de noms et outils
   Tout le code vit sous window.AA. Pas de build : chaque fichier est un
   simple script chargé dans l'ordre (voir js/manifest.js).
   ===================================================================== */
(function () {
  "use strict";
  const AA = (window.AA = window.AA || {});
  AA.VERSION = "2.2.6";
  AA.NAME = "Abysse Academy";

  /* Réglages de déploiement. googleClientId : identifiant client OAuth « Application Web »
     (console.cloud.google.com), pour la synchronisation Google Drive. Même identifiant que l'appli Budget :
     l'origine https://geoffreyofficial.github.io y est déjà autorisée. Voir README. */
  AA.CONFIG = { googleClientId: "846329946315-b0akqn39adk8t9ufn7o99iqmu11les54.apps.googleusercontent.com" };

  /* Thèmes visuels : l'id correspond à [data-aa-theme] dans css/tokens.css.
     Les couleurs de l'aperçu servent aux pastilles des réglages. */
  AA.THEMES = [
    { id: "abysse", preview: ["#050E1A", "#3EE6D8", "#FF7A59"], dark: true, meta: "#050E1A" },
    { id: "lagon", preview: ["#EAF5F7", "#0A97A8", "#E85A33"], dark: false, meta: "#EAF5F7" },
    { id: "corail", preview: ["#140A14", "#FF8C6B", "#5EE0C8"], dark: true, meta: "#140A14" },
    { id: "contraste", preview: ["#000000", "#00F0FF", "#FFE14D"], dark: true, meta: "#000000" }
  ];

  /* Langues disponibles : ajoute une entrée ici et les fichiers
     locales/<code>.js + content/<code>/*.js (voir CONTRIBUTING.md). */
  AA.LANGS = [{ id: "fr", name: "Français", locale: "fr-FR" }];

  const u = (AA.u = {});
  u.$ = (sel, root) => (root || document).querySelector(sel);
  u.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  u.esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  u.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  u.pick = a => a[Math.floor(Math.random() * a.length)];
  u.rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  u.clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  u.sum = a => a.reduce((x, y) => x + y, 0);
  u.dstr = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  u.today = () => u.dstr(new Date());
  u.addDays = (n, from) => { const d = from ? new Date(from + "T12:00:00") : new Date(); d.setDate(d.getDate() + n); return u.dstr(d); };
  u.daysBetween = (a, b) => Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 864e5);
  /* Nombre formaté selon la langue (virgule en français). */
  u.num = (x, d = 2) => Number(x).toLocaleString(AA.i18n ? AA.i18n.locale : "fr-FR", { maximumFractionDigits: d });
  u.mmss = s => Math.floor(s / 60) + ":" + String(Math.max(0, s) % 60).padStart(2, "0");
  /* Graine stable pour le jour : même tirage toute la journée. */
  u.seedOf = str => String(str).split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  u.seeded = seed => { let s = seed || 1; return () => (s = (s * 9301 + 49297) % 233280) / 233280; };
  u.debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  u.clone = o => JSON.parse(JSON.stringify(o));
  /* Délégation d'événements : on(root, "click", "[data-go]", fn). */
  u.on = (root, type, sel, fn) => root.addEventListener(type, e => { const t = e.target.closest(sel); if (t && root.contains(t)) fn(e, t); });
})();
