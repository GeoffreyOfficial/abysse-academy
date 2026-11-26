/* =====================================================================
   Abysse Academy · réinitialiser son profil (en 3 étapes, exprès lentes)
   1. Ce qui sera effacé, et l'offre de télécharger une sauvegarde.
   2. Case « j'ai compris » + ce qui arrive au Google Drive.
   3. Taper EFFACER, puis un bouton qui ne s'active qu'après 5 secondes.
   Une copie « avant réinitialisation » reste dans Sauvegarde > Copies de secours.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, fx = { sfx: { ok: () => AA.fx.sfx.ok() }, buzz: p => AA.fx.buzz(p), toast: (...a) => AA.fx.toast(...a) };
  const WORD = () => t("rs.word");

  AA.resetFlow = () => {
    const S = AA.S, G = AA.game, C = AA.content, lv = G.levelOf(S.xp);
    const sum = [
      [t("rs.l.xp"), `${S.xp} XP · ${t("prof.level", { l: lv.l, rank: u.esc(lv.rank) })}`],
      [t("rs.l.themes"), Object.keys(S.themes).length],
      [t("rs.l.trophies"), Object.keys(S.badges).length + " / " + C.badges.length],
      [t("rs.l.aqua"), Object.keys(S.aqua).length + " / " + C.creatures.length],
      [t("rs.l.cards"), Object.keys(S.cards).length],
      [t("rs.l.exams"), S.exams.length]
    ];
    let step = 1, timer = null;
    const linked = AA.sync && AA.sync.linked();
    const body = () => {
      const dots = `<div class="rs-steps" aria-hidden="true">${[1, 2, 3].map(i => `<i class="${i <= step ? "on" : ""}"></i>`).join("")}</div>`;
      if (step === 1) return `${dots}<div class="rs-warn">${AA.icon("info")}<div><b>${t("rs.t1")}</b><p>${t("rs.s1")}</p></div></div>
        <div class="tbl"><table>${sum.map(([k, v]) => `<tr><td>${k}</td><td class="mono">${v}</td></tr>`).join("")}</table></div>
        <button class="btn block" id="rsdl">${AA.icon("save")} ${t("rs.download")}</button>
        <button class="btn ghost block" data-no>${t("rs.keep")}</button>
        <button class="linkbtn danger" id="rsnext">${t("rs.continue")}</button>`;
      if (step === 2) return `${dots}<div class="rs-warn">${AA.icon("info")}<div><b>${t("rs.t2")}</b><p>${t("rs.s2")}</p></div></div>
        ${linked ? `<p class="callout"><span class="eyebrow">Google Drive</span>${t("rs.drive")}</p>` : ""}
        <label class="rs-check"><input type="checkbox" id="rsok"> <span>${t("rs.understand")}</span></label>
        <button class="btn ghost block" data-no>${t("rs.keep")}</button>
        <button class="btn block danger" id="rsnext" disabled>${t("rs.continue")}</button>`;
      return `${dots}<div class="rs-warn">${AA.icon("info")}<div><b>${t("rs.t3")}</b><p>${t("rs.s3", { w: WORD() })}</p></div></div>
        <input class="input center mono" id="rsword" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="${WORD()}" aria-label="${t("rs.s3", { w: WORD() })}">
        <button class="btn ghost block" data-no>${t("rs.keep")}</button>
        <button class="btn block danger" id="rsgo" disabled>${t("rs.final")}</button>`;
    };
    const close = AA.ui.sheet(`<h3 style="margin:0 2.5rem var(--sp-3) 0">${t("rs.title")}</h3><div id="rsbody" class="stack"></div>`, t("rs.title"));
    const root = document.getElementById("rsbody");
    const draw = () => {
      clearInterval(timer);
      root.innerHTML = body();
      const nx = u.$("#rsnext", root);
      if (step === 1) {
        u.$("#rsdl", root).onclick = () => { AA.S.profile.backupAt = u.today(); AA.pwa.saveFile("abysse-academy-" + u.today() + ".json", AA.store.exportText(), m => fx.toast(t("rs.dlT"), m, "save")); };
        nx.onclick = () => { step = 2; fx.buzz(30); draw(); };
      } else if (step === 2) {
        u.$("#rsok", root).onchange = e => { nx.disabled = !e.target.checked; };
        nx.onclick = () => { step = 3; fx.buzz([30, 40, 30]); draw(); };
      } else {
        const inp = u.$("#rsword", root), go = u.$("#rsgo", root);
        let left = 0;
        const check = () => {
          const okWord = inp.value.trim().toUpperCase() === WORD();
          clearInterval(timer);
          if (!okWord) { go.disabled = true; go.textContent = t("rs.final"); return; }
          left = 5; go.disabled = true; go.textContent = t("rs.wait", { n: left });
          timer = setInterval(() => { left--; if (left > 0) go.textContent = t("rs.wait", { n: left }); else { clearInterval(timer); go.disabled = false; go.textContent = t("rs.final"); } }, 1000);
        };
        inp.oninput = check; inp.focus();
        go.onclick = async () => {
          if (go.disabled || inp.value.trim().toUpperCase() !== WORD()) return;
          go.disabled = true; clearInterval(timer);
          if (AA.sync && AA.sync.linked()) AA.sync.disconnect();
          await AA.store.reset();
          close(); AA.ctx = {}; AA.ui.applyTheme(); AA.a11y.apply(); AA.ui.hud();
          fx.toast(t("rs.doneT"), t("rs.doneS"), "refresh");
          AA.router.go("welcome", {}, true);
        };
      }
    };
    draw();
  };
})();
