/* =====================================================================
   Abysse Academy · démarrage
   1. lit la sauvegarde, 2. charge une autre langue si choisie,
   3. indexe le contenu, 4. affiche, 5. complète avec IndexedDB.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA;
  /* Copie de la page pour la version hors ligne téléchargeable (artefact). */
  if (AA.BUNDLED) AA.OFFLINE_HTML = document.documentElement.outerHTML;

  const loadScript = src => new Promise(res => { const s = document.createElement("script"); s.src = src; s.onload = s.onerror = res; document.head.appendChild(s); });

  async function boot() {
    AA.store.loadSync();
    const lang = AA.LANGS.find(l => l.id === AA.S.profile.lang) || AA.LANGS[0];
    /* Une langue autre que le français charge ses fichiers par-dessus : mêmes id, textes traduits. */
    if (lang.files && !AA.BUNDLED) for (const f of lang.files) await loadScript(f);
    AA.i18n.set(lang.id);
    AA.content.build();
    AA.ui.applyTheme();
    AA.a11y.apply();
    AA.fx.initBubbles();
    AA.router.start();
    AA.game.checkBadges();
    AA.store.loadAsync().then(changed => { if (changed) { AA.ui.applyTheme(); AA.a11y.apply(); AA.router.refresh(); } AA.sync.init(); });
    AA.pwa.init();
    /* Indicateur hors ligne discret. */
    const net = () => document.documentElement.classList.toggle("offline", !navigator.onLine);
    addEventListener("online", net); addEventListener("offline", net); net();
    document.documentElement.classList.add("ready");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
