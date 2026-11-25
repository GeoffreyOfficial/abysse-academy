/* =====================================================================
   Abysse Academy · version installable (PWA) et fichiers
   - Service worker : hors ligne, mise à jour proposée par un toast.
   - Installation : bouton natif (Android/Chrome) ou mode d'emploi (iPhone).
   - Téléchargement de fichiers : lien direct, ou capacité « downloads »
     quand l'appli tourne dans un artefact claude.ai.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t;
  const pwa = (AA.pwa = {});
  let deferred = null;
  const standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const inArtifact = () => !!(window.claude && window.claude.use);

  addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; if (AA.router && AA.router.name === "settings") AA.router.refresh(); });

  pwa.saveFile = async (name, text, msg) => {
    if (inArtifact()) {
      try { const d = await window.claude.use("downloads"); if (d) { await d.save({ filename: name, data: text }); msg && msg(t("set.fileOffered")); return; } } catch (e) { msg && msg(e && e.code === "viewer_declined" ? t("set.fileCancel") : t("set.fileFail")); return; }
    }
    try {
      const b = new Blob([text], { type: name.endsWith(".html") ? "text/html" : "application/json" }), url = URL.createObjectURL(b);
      const a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000); msg && msg(t("set.fileDone"));
    } catch (e) { msg && msg(t("set.fileFail")); }
  };

  pwa.wireSettings = msg => {
    const b = u.$("#dlapp"); if (!b) return;
    if (standalone()) { b.innerHTML = AA.icon("check") + " " + t("set.installed"); b.disabled = true; return; }
    if (deferred) {
      b.onclick = async () => { deferred.prompt(); const r = await deferred.userChoice; deferred = null; msg(r.outcome === "accepted" ? t("set.installOk") : t("set.installNo")); };
      return;
    }
    if (inArtifact() || location.protocol === "file:") {
      /* Pas de service worker possible ici : on propose le fichier HTML autonome. */
      b.innerHTML = AA.icon("download") + " " + t("set.dlHtml");
      b.onclick = () => pwa.saveFile("abysse-academy.html", "<!doctype html>\n" + (AA.OFFLINE_HTML || document.documentElement.outerHTML), msg);
      return;
    }
    b.onclick = () => msg(isIOS ? t("set.howIOS") : t("set.howAndroid"));
  };

  pwa.init = () => {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol) || inArtifact()) return;
    navigator.serviceWorker.register("sw.js").then(reg => {
      const ask = w => AA.fx.toast(t("pwa.updateT"), t("pwa.updateS"), "sparkle", () => w.postMessage("skipWaiting"));
      if (reg.waiting && navigator.serviceWorker.controller) ask(reg.waiting);
      reg.addEventListener("updatefound", () => { const w = reg.installing; w && w.addEventListener("statechange", () => { if (w.state === "installed" && navigator.serviceWorker.controller) ask(w); }); });
      setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
    }).catch(() => {});
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (!reloaded) { reloaded = true; location.reload(); } });
  };
})();
