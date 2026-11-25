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
    else if (replace) { history.replaceState(null, "", url); R.render(); }
    else location.hash = url;
  };
  R.back = fallback => { if (history.length > 1 && R.prev) history.back(); else R.go(fallback || "home"); };
  R.render = () => {
    const { name, args } = R.parse();
    let v = views[name];
    if (!v) { R.go("home", undefined, true); return; }
    if (v.guard && !v.guard(args)) { R.go(v.fallback || "home", undefined, true); return; }
    if (!AA.S.profile.onboarded && name !== "welcome") { R.go("welcome", undefined, true); return; }
    if (current && current.leave) try { current.leave(); } catch (e) {}
    R.prev = current; current = v; R.name = name;
    AA.ui.frame(v);
    const el = document.getElementById("view");
    el.innerHTML = ""; el.className = "view-enter";
    v.render(el, args);
    AA.ui.hud();
    requestAnimationFrame(() => { window.scrollTo(0, (v.keepScroll && R.scroll[location.hash]) || 0); });
    const h = el.querySelector("h1,h2"); if (h && !v.immersive) { h.setAttribute("tabindex", "-1"); }
  };
  R.scroll = {};
  R.refresh = () => { const y = window.scrollY; R.render(); requestAnimationFrame(() => window.scrollTo(0, y)); };
  addEventListener("scroll", () => { R.scroll[location.hash] = window.scrollY; }, { passive: true });
  R.start = () => { addEventListener("hashchange", R.render); R.render(); };
})();
