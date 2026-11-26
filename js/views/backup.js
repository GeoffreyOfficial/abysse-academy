/* =====================================================================
   Abysse Academy · sauvegarde, synchronisation et transfert
   1. Sauvegarde automatique sur l'appareil (localStorage + IndexedDB).
   2. Synchronisation Google Drive (js/core/sync.js) entre téléphone et PC.
   3. Transfert sans compte : fichier ou lien/code à ouvrir sur l'autre appareil.
   4. Copies de secours quotidiennes (5 derniers jours).
   À l'import, on propose FUSIONNER (le meilleur des deux) ou REMPLACER.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, fx = AA.fx, ui = AA.ui, st = AA.store;
  const ago = ms => { if (!ms) return t("bk.never"); const s = Math.round((Date.now() - ms) / 1000); return s < 60 ? t("bk.now") : s < 3600 ? t("bk.min", { n: Math.round(s / 60) }) : s < 86400 ? t("bk.hour", { n: Math.round(s / 3600) }) : new Date(ms).toLocaleDateString(AA.i18n.locale); };
  const appUrl = () => /^https?:/.test(location.href) && !(window.claude && window.claude.use) ? location.href.split("#")[0] : "https://geoffreyofficial.github.io/abysse-academy/";

  /* Fenêtre de choix avant d'importer : comparaison des deux sauvegardes. */
  function askImport(o, msg) {
    const a = st.summary(AA.S), b = st.summary(o), row = (k, x, y) => `<tr><td>${k}</td><td class="mono">${x}</td><td class="mono">${y}</td></tr>`;
    const close = ui.sheet(`<div class="stack"><h3>${t("bk.importT")}</h3>
      <div class="tbl"><table><tr><th></th><th>${t("bk.here")}</th><th>${t("bk.there")}</th></tr>
        ${row("XP", a.xp, b.xp)}${row(t("bk.themes"), a.themes, b.themes)}${row(t("bk.answers"), a.answers, b.answers)}${row(t("bk.saved"), a.saved ? a.saved.toLocaleString(AA.i18n.locale) : "—", b.saved ? b.saved.toLocaleString(AA.i18n.locale) : "—")}</table></div>
      <button class="btn block" id="imerge">${AA.icon("transfer")} ${t("bk.merge")}</button><p class="xs muted" style="margin:-6px 0 0">${t("bk.mergeS")}</p>
      <button class="btn ghost block" id="ireplace">${t("bk.replace")}</button></div>`, t("bk.importT"));
    const done = mode => { AA.S = mode === "merge" ? st.merge(AA.S, o) : o; AA.S.profile.onboarded = true; st.save(true); AA.ui.applyTheme(); AA.a11y.apply(); AA.game.checkBadges(); close(); fx.sfx.up(); msg && msg(t("set.restored", { xp: AA.S.xp })); AA.router.refresh(); };
    u.$("#imerge").onclick = () => done("merge"); u.$("#ireplace").onclick = () => done("replace");
  }
  AA.backup = { askImport };

  AA.view("backup", {
    tab: "profile", depth: 4,
    render(el) {
      const S = AA.S, sy = AA.sync.status();
      el.innerHTML = `${ui.head(t("bk.title"), "settings")}
        <section class="card"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal ok">${AA.icon("save")}</span><div class="grow"><h3>${t("bk.autoT")}</h3><p class="small muted" style="margin:2px 0 0">${t("bk.autoS", { when: ago(S.savedAt) })}</p></div></div>
          <p class="xs muted" id="persist"></p></section>

        <section class="card" style="margin-top:var(--sp-4)" id="drive"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal">${AA.icon("transfer")}</span><div class="grow"><h3>${t("bk.driveT")}</h3><p class="small muted" style="margin:2px 0 0">${t("bk.driveS")}</p></div></div>
          <div id="drivebox" style="margin-top:var(--sp-3)"></div></section>

        <section class="card" style="margin-top:var(--sp-4)"><h3>${t("bk.sendT")}</h3><p class="small muted">${t("bk.sendS")}</p>
          <div class="stack"><button class="btn block" id="sendfile">${AA.icon("share")} ${t("bk.sendFile")}</button>
          <button class="btn ghost block" id="sendlink">${AA.icon("transfer")} ${t("bk.sendLink")}</button>
          <textarea class="input mono xs" id="linkbox" rows="3" readonly hidden></textarea></div></section>

        <section class="card" style="margin-top:var(--sp-4)"><h3>${t("bk.recvT")}</h3><p class="small muted">${t("bk.recvS")}</p>
          <div class="stack"><label class="btn ghost block" for="imp">${AA.icon("upload")} ${t("set.import")}</label><input type="file" id="imp" accept=".json,application/json,text/plain" hidden>
          <textarea class="input mono xs" id="pastebox" rows="3" placeholder="${t("bk.pastePh")}"></textarea><button class="btn ghost block" id="paste">${t("set.restore")}</button></div></section>

        <section class="card" style="margin-top:var(--sp-4)"><h3>${t("bk.snapT")}</h3><p class="small muted">${t("bk.snapS")}</p><div id="snaps" class="stack"></div></section>
        <p class="small center" id="bkmsg" role="status" style="margin-top:var(--sp-4)"></p>`;
      const msg = s => { const m = u.$("#bkmsg"); if (m) m.textContent = s; };

      /* Stockage durable */
      if (navigator.storage && navigator.storage.persisted) navigator.storage.persisted().then(p => { const e = u.$("#persist"); if (e) e.textContent = p ? t("bk.persistOk") : t("bk.persistNo"); }).catch(() => {});

      /* Google Drive */
      const drive = () => {
        const s = AA.sync.status(), box = u.$("#drivebox"); if (!box) return;
        if (!s.possible) { box.innerHTML = `<p class="callout"><span class="eyebrow">${t("bk.driveHere")}</span>${t("bk.driveOnly")} <a href="${appUrl()}" target="_blank" rel="noopener">${u.esc(appUrl().replace(/^https:\/\//, ""))}</a></p>`; return; }
        box.innerHTML = s.linked
          ? `<div class="row between"><span class="chip ${s.err ? "warn" : "ok"}">${AA.icon(s.err ? "info" : "check")} ${s.err ? t("bk.driveErr") : t("bk.driveOn")}</span><span class="xs muted">${t("bk.driveLast", { when: ago(s.last) })}</span></div>
             ${s.err ? `<p class="xs muted">${t("bk.driveErrS")} (${u.esc(s.err)})</p>` : ""}
             <div class="row" style="margin-top:var(--sp-3)"><button class="btn grow" id="dsync" ${s.busy ? "disabled" : ""}>${AA.icon("refresh")} ${s.busy ? t("bk.syncing") : t("bk.syncNow")}</button><button class="btn ghost" id="doff">${t("bk.driveOff")}</button></div>`
          : `<button class="btn block" id="don" ${s.hasId ? "" : "disabled"}>${AA.icon("transfer")} ${t("bk.driveConnect")}</button>
             <p class="xs muted">${t("bk.drivePriv")}</p>`;
        box.innerHTML += `<details class="xs" style="margin-top:var(--sp-3)"><summary class="muted">${t("bk.advanced")}</summary><label class="xs muted" for="cid">${t("bk.clientId")}</label><input class="input mono xs" id="cid" value="${u.esc(AA.sync.clientId())}" spellcheck="false"><p class="xs muted">${t("bk.clientIdS")}</p></details>`;
        const on = u.$("#don"); if (on) on.onclick = async () => { msg(t("bk.syncing")); const ok = await AA.sync.connect(); msg(ok ? t("bk.syncOk", { xp: AA.S.xp }) : t("bk.syncFail")); if (ok) { fx.sfx.up(); AA.sync.init(); } drive(); };
        const sn = u.$("#dsync"); if (sn) sn.onclick = async () => { const ok = await AA.sync.now(true); msg(ok ? t("bk.syncOk", { xp: AA.S.xp }) : t("bk.syncFail")); if (ok) fx.sfx.ok(); drive(); };
        const of = u.$("#doff"); if (of) of.onclick = () => ui.confirm(t("bk.driveOffQ"), t("bk.driveOff"), () => { AA.sync.disconnect(); drive(); });
        u.$("#cid").onchange = e => { AA.sync.setClientId(e.target.value); drive(); };
      };
      drive(); if (!AA.backup.wired) { AA.backup.wired = true; AA.sync.on(() => { if (AA.router.name === "backup") AA.backup.redraw && AA.backup.redraw(); }); }
      AA.backup.redraw = drive;

      /* Envoyer */
      const fname = "abysse-academy-" + (S.profile.name ? S.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" : "") + u.today() + ".json";
      u.$("#sendfile").onclick = async () => {
        const txt = st.exportText(); S.profile.backupAt = u.today(); st.save();
        try {
          const f = new File([txt], fname, { type: "application/json" });
          if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: t("app.name") }); msg(t("bk.shared")); return; }
        } catch (e) { if (e && e.name === "AbortError") return; }
        AA.pwa.saveFile(fname, txt, msg);
      };
      u.$("#sendlink").onclick = async () => {
        const code = await st.toCodeAsync(), link = appUrl() + "#/import/" + code, box = u.$("#linkbox");
        box.hidden = false; box.value = link; box.select();
        if (navigator.share && matchMedia("(pointer:coarse)").matches) { try { await navigator.share({ title: t("app.name"), text: t("bk.linkText"), url: link }); msg(t("bk.shared")); return; } catch (e) { if (e && e.name === "AbortError") return; } }
        if (navigator.clipboard) navigator.clipboard.writeText(link).then(() => msg(t("bk.linkCopied", { n: Math.round(link.length / 100) / 10 })), () => msg(t("set.selectCopy"))); else msg(t("set.selectCopy"));
      };
      /* Recevoir */
      u.$("#imp").onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = async () => { const o = st.parse(r.result) || await st.fromCodeAsync(r.result); o ? askImport(o, msg) : msg(t("set.invalid")); }; r.readAsText(f); e.target.value = ""; };
      u.$("#paste").onclick = async () => { const v = u.$("#pastebox").value.trim(); if (!v) return; const o = st.parse(v) || await st.fromCodeAsync(v); o ? askImport(o, msg) : msg(t("set.invalid")); };
      /* Copies de secours */
      st.snapshots().then(list => {
        const box = u.$("#snaps"); if (!box) return;
        box.innerHTML = list.length ? list.map(s => `<div class="dq"><span class="ck">${AA.icon("calendar")}</span><span><b class="small">${s.reset ? t("rs.snapLabel") + " · " : ""}${s.date}</b><span class="xs muted"> · ${s.xp} XP</span></span><button class="btn ghost sm" data-snap="${s.key}">${t("bk.restore")}</button></div>`).join("") : `<p class="xs muted">${t("bk.noSnap")}</p>`;
        u.on(box, "click", "[data-snap]", (e, b) => ui.confirm(t("bk.restoreQ"), t("bk.restore"), async () => { if (await st.restoreSnapshot(b.dataset.snap)) { msg(t("set.restored", { xp: AA.S.xp })); AA.ui.applyTheme(); AA.router.refresh(); } }));
      }).catch(() => {});
    }
  });

  /* Lien de transfert : #/import/<code> → on demande quoi faire. */
  AA.view("import", {
    tab: "profile",
    render(el, args) {
      const code = args.join("/");
      el.innerHTML = ui.head(t("bk.importT"), "home") + `<section class="card center"><p>${t("bk.reading")}</p></section>`;
      st.fromCodeAsync(code).then(o => {
        history.replaceState(null, "", "#/backup");
        if (!o) { el.innerHTML = ui.head(t("bk.importT"), "home") + ui.empty("info", t("set.invalid"), t("bk.badLink")); return; }
        AA.router.go("backup", undefined, true);
        setTimeout(() => askImport(o, s => fx.toast(s, "", "check")), 200);
      });
    }
  });
})();
