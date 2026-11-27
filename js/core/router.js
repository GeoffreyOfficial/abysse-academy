/* =====================================================================
   Abysse Academy · navigation
   Routes en hash (#/carte/n2) : le bouton retour du téléphone marche,
   et chaque écran a une adresse. Une vue se déclare avec :
     AA.view("nom", { tab:"home", immersive:false, render(el, args){…}, leave(){…} })
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA;
  const views = (AA.views = {});
  let current = null;
  AA.view = (name, def) => (views[name] = Object.assign({ tab: null, immersive: false }, def));
  AA.ctx = {}; /* état en mémoire d'un écran en cours (quiz, simulateur…) */

  const R = (AA.router = {});
  R.parse = () => {
    const h = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    const [name, ...args] = h.split("/").filter(Boolean);
    return { name: name || "home", args };
  };
  /* go("lesson/pression") ; go("quiz", {…}) passe un contexte en mémoire. */
  R.go = (path, ctx, replace) => {
    if (ctx !== undefined) AA.ctx = ctx || {};
    const url = "#/" + path;
    if (location.hash === url) R.render();
    else if (replace) { history.replaceState(null, "", url); stack[stack.length - 1] = url; R.render("tab"); }
    else location.hash = url;
  };
  R.back = fallback => { if (history.length > 1 && R.prev) history.back(); else R.go(fallback || "home"); };
  /* Sens de navigation (pour l'animation) : retour si l'on revient à l'écran précédent. */
  const stack = [];
  const direction = () => {
    const h = location.hash || "#/home";
    if (stack[stack.length - 2] === h) { stack.pop(); return "back"; }
    if (stack[stack.length - 1] !== h) stack.push(h);
    if (stack.length > 50) stack.shift();
    return "fwd";
  };
  /* Changement d'écran animé : View Transitions si dispo, sinon animation CSS. */
  const onHash = () => {
    const dir = direction(), v = views[R.parse().name], tabSwitch = v && current && v.tab && current.tab && v.tab !== current.tab && !v.immersive && !current.immersive;
    const kind = tabSwitch ? "tab" : dir;
    const root = document.documentElement;
    const reduce = AA.a11y && AA.a11y.reduced();
    /* 1.6 : même écran (carte d'un autre monde, onglet d'un cours) : pas de capture
       d'écran complète (lente sur PC et grand écran), juste un rendu direct et un fondu léger. */
    if (v && current === v) { R.render("same"); return; }
    if (document.startViewTransition && !reduce) {
      root.dataset.vt = kind;
      try { const tr = document.startViewTransition(() => R.render(kind, true)); [tr.ready, tr.updateCallbackDone].forEach(p => p.catch(() => {})); tr.finished.catch(() => {}).then(() => delete root.dataset.vt); return; } catch (e) {}
    }
    R.render(kind);
  };
  R.render = (kind, vt) => {
    if (typeof kind !== "string") kind = "";
    const { name, args } = R.parse();
    let v = views[name];
    if (!v) { R.go("home", undefined, true); return; }
    if (v.guard && !v.guard(args)) { R.go(v.fallback || "home", undefined, true); return; }
    if (!AA.S.profile.onboarded && !["welcome", "import", "backup"].includes(name)) { R.go("welcome", undefined, true); return; }
    if (current && current.leave) try { current.leave(); } catch (e) {}
    R.prev = current; current = v; R.name = name;
    AA.ui.frame(v);
    /* Conteneur neuf à chaque écran : les écouteurs d'un écran précédent
       ne doivent jamais réagir aux clics du suivant. */
    const old = document.getElementById("view"), el = old.cloneNode(false); old.replaceWith(el);
    el.className = kind && !vt ? "view-enter view-" + kind : "";
    v.render(el, args);
    if (AA.scene) AA.scene.set(typeof v.depth === "function" ? v.depth(args) : v.depth != null ? v.depth : 5);
    AA.ui.hud();
    requestAnimationFrame(() => { window.scrollTo(0, (v.keepScroll && R.scroll[location.hash]) || 0); });
    const h = el.querySelector("h1,h2"); if (h && !v.immersive) { h.setAttribute("tabindex", "-1"); }
  };
  R.scroll = {};
  R.refresh = () => { const y = window.scrollY; R.render(); requestAnimationFrame(() => window.scrollTo(0, y)); };
  addEventListener("scroll", () => { R.scroll[location.hash] = window.scrollY; }, { passive: true });
  /* 2.6.2 : garde de session. Écouteur posé avant ceux des écrans : R.hold peut
     annuler un changement d'écran (retour système, onglet, lien) pendant un
     quiz, un combat ou une aventure, pour proposer « Pause » ou « Quitter ». */
  addEventListener("hashchange", e => { try { if (R.hold && R.hold()) e.stopImmediatePropagation(); } catch (err) { /* garde facultative */ } });
  R.start = () => { addEventListener("hashchange", onHash); direction(); R.render("tab"); };
})();
