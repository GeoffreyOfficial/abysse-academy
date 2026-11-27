/* =====================================================================
   Abysse Academy 2.9 · confort et ambiance
   - Sauvegarde : copie locale aussi en quittant l'appli, rappel d'export
     hebdomadaire (si Google Drive n'est pas lié), mode récupération
     quand les données de l'appareil sont abîmées.
   - Transitions plus douces, boutons qui rebondissent à la validation.
   - Brevet blanc : salle d'examen (annonce, temps qui file, poissons),
     certificat imprimable à la fin.
   - Cursus en carte marine : sondes, profondeur qui augmente par niveau.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, ui = AA.ui, fx = AA.fx, V = AA.views, st = AA.store, C = AA.content;

  /* ---------- Mode récupération ---------- */
  const RAWK = "abysse-academy-corrupt";
  const ls0 = st.loadSync;
  st.loadSync = () => {
    let raw = null; try { raw = localStorage.getItem(st.KEY); } catch (e) {}
    let r; try { r = ls0(); } catch (e) { AA.S = st.FRESH(); r = "fresh"; }
    if (raw && r === "fresh") { st.bad = raw; hold = true; try { localStorage.setItem(RAWK, raw); } catch (e) {} }
    return r;
  };
  /* Tant que la copie de l'appareil (IndexedDB) n'a pas été lue, on n'écrit rien : un état vierge
     ne doit jamais écraser la bonne copie. */
  let hold = false;
  const save0 = st.save;
  st.save = function () { if (hold) return; return save0.apply(this, arguments); };
  const la0 = st.loadAsync;
  st.loadAsync = async () => {
    let changed = false; hold = false;
    try { changed = await la0(); } catch (e) {}
    if (st.bad) {
      if (changed && AA.S.xp > 0) { done(); setTimeout(() => fx.toast(t("rec.okT"), t("rec.okS", { xp: AA.S.xp }), "save"), 600); }
      else setTimeout(() => AA.recover.sheet(), 500);
    }
    return changed;
  };
  const done = () => { st.bad = null; try { localStorage.removeItem(RAWK); } catch (e) {} };
  const rawText = () => { if (st.bad) return st.bad; try { return localStorage.getItem(RAWK) || ""; } catch (e) { return ""; } };
  AA.recover = {
    sheet() {
      const close = ui.sheet(`<div class="stack rec-sheet"><div class="rec-ic">${AA.icon("shield")}</div><h3>${t("rec.t")}</h3><p class="small">${t("rec.s")}</p>
        <div class="stack" id="recsnaps"><p class="xs muted">${t("rec.looking")}</p></div>
        <a class="btn ghost block" href="#/backup" id="recimp">${AA.icon("upload")} ${t("rec.import")}</a>
        <button class="btn ghost block" id="recraw">${AA.icon("download")} ${t("rec.raw")}</button>
        <button class="btn ghost block" id="recfresh">${AA.icon("refresh")} ${t("rec.fresh")}</button>
        <p class="xs muted">${t("rec.note")}</p></div>`, t("rec.t"));
      const box = u.$("#recsnaps");
      st.snapshots().then(list => {
        if (!box) return;
        box.innerHTML = list.length ? list.map(s => `<button class="btn block" data-snap="${u.esc(s.key)}">${AA.icon("refresh")} ${t("rec.snap", { d: u.esc(s.date), xp: s.xp })}</button>`).join("") : `<p class="xs muted">${t("rec.noSnap")}</p>`;
        u.$$("[data-snap]", box).forEach(b => b.onclick = async () => {
          const ok = await st.restoreSnapshot(b.dataset.snap);
          if (ok) { done(); close(); AA.ui.applyTheme && AA.ui.applyTheme(); AA.router.refresh(); fx.toast(t("rec.okT"), t("rec.okS", { xp: AA.S.xp }), "save"); }
          else fx.toast(t("rec.failT"), t("rec.failS"), "info");
        });
      }).catch(() => { if (box) box.innerHTML = `<p class="xs muted">${t("rec.noSnap")}</p>`; });
      u.$("#recimp").onclick = () => close();
      u.$("#recraw").onclick = () => AA.pwa.saveFile("abysse-academy-donnees-abimees-" + u.today() + ".txt", rawText(), m => fx.toast(t("rec.rawT"), m, "download"));
      u.$("#recfresh").onclick = () => ui.confirm(t("rec.freshQ"), t("rec.freshYes"), () => { done(); close(); });
    },
    pending: () => !!st.bad
  };
  /* Copie locale aussi quand on quitte l'appli (une par jour, les 5 dernières). */
  document.addEventListener("visibilitychange", () => { if (document.hidden && AA.S && AA.S.xp) { try { st.snapshot().catch(() => {}); } catch (e) {} } });

  /* ---------- Rappel d'export hebdomadaire ---------- */
  const exportDue = () => {
    const S = AA.S, P = S.profile, today = u.today();
    if (!S.xp || (AA.sync && AA.sync.linked && AA.sync.linked())) return false;
    if (P.exportNag && P.exportNag > today) return false;
    const ref = P.backupAt || S.createdAt || today;
    return ref <= u.addDays(-7);
  };
  AA.exportDue = exportDue;
  const exportNow = msgEl => {
    const S = AA.S, txt = st.exportText(), name = "abysse-academy-" + (S.profile.name ? S.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" : "") + u.today() + ".json";
    S.profile.backupAt = u.today(); st.save();
    AA.pwa.saveFile(name, txt, m => { if (msgEl) msgEl.textContent = m; });
  };
  AA.exportNow = exportNow;
  if (V.home) {
    const r0 = V.home.render;
    V.home.render = function (el, args) {
      const out = r0.call(this, el, args);
      if (!u.$("#drivecard", el) && !u.$("#expcard", el) && exportDue()) {
        const P = AA.S.profile, h = u.$(".hello", el);
        const html = `<section class="card drive-card exp-card" id="expcard"><div class="drive-ic">${AA.icon("save")}</div><div class="stack" style="gap:6px">
          <b class="h4">${t("exw.t")}</b><p class="small" style="margin:0">${t(P.backupAt ? "exw.s" : "exw.never", { d: P.backupAt ? (u.fmtDate ? u.fmtDate(P.backupAt) : P.backupAt) : "" })}</p>
          <div class="row"><button class="btn sm" id="expnow">${AA.icon("download")} ${t("exw.now")}</button><button class="btn ghost sm" id="explater">${t("dr.later")}</button></div><p class="xs muted" id="expmsg" style="margin:0"></p></div></section>`;
        if (h) h.insertAdjacentHTML("afterend", html); else el.insertAdjacentHTML("afterbegin", html);
        u.$("#expnow", el).onclick = () => { exportNow(u.$("#expmsg", el)); fx.sfx.ok(); setTimeout(() => { const c = u.$("#expcard"); if (c) c.remove(); }, 1600); };
        u.$("#explater", el).onclick = () => { P.exportNag = u.addDays(3); st.save(); fx.toast(t("dr.snoozeT"), t("dr.snoozeS", { n: 3 }), "calendar"); const c = u.$("#expcard"); if (c) c.remove(); };
      }
      return out;
    };
  }

  /* ---------- Boutons qui rebondissent ---------- */
  const motionOk = () => AA.S.profile.motion !== false && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.addEventListener("click", e => {
    const b = e.target.closest(".btn, .choice, .chip[data-ew], .gm-tile, .g29-opt"); if (!b || !motionOk()) return;
    b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
    setTimeout(() => b.classList.remove("bump"), 420);
  }, true);

  /* ---------- Brevet blanc : salle d'examen et certificat ---------- */
  const mention = s => s >= 16 ? "tb" : s >= 14 ? "b" : s >= 12 ? "ab" : s >= 10 ? "ok" : "no";
  const hallFish = () => {
    const sh = ["fish", "wrasse", "bream", "damsel", "seahorse", "turtle"];
    return `<div class="ex-hall" aria-hidden="true">${[0, 1, 2, 3].map(i => `<span class="exf exf${i}">${AA.creature(sh[(i * 2 + new Date().getDate()) % sh.length])}</span>`).join("")}<i class="exb b1"></i><i class="exb b2"></i><i class="exb b3"></i></div>`;
  };
  AA.hallFish = hallFish;
  const certData = c => {
    const S = AA.S, last = (S.exams || [])[S.exams.length - 1] || {}, w = C.worldById[c.world || "n2"] || {};
    return { name: S.profile.name || t("home.diver"), score: last.score != null ? last.score : 0, date: last.date || u.today(), lv: w.title || "", short: w.short || "", full: !!c.full };
  };
  const certHtml = d => {
    const m = mention(d.score);
    return `<div class="cert-in"><div class="cert-top"><span class="cert-seal">${AA.icon("trophy")}</span><div><p class="cert-k">${t("cert.kicker")}</p><h3 class="cert-h">${t(m === "no" ? "cert.partT" : "cert.title")}</h3></div></div>
      <p class="cert-line">${t("cert.line", { name: u.esc(d.name) })}</p>
      <p class="cert-lv"><b>${u.esc(d.lv)}</b> · ${t(d.full ? "mode.examFull" : "mode.examQuick")}</p>
      <div class="cert-score"><b>${u.num(d.score, 1)}</b><span>/ 20</span></div>
      <p class="cert-m m-${m}">${t("cert.m." + m)}</p>
      <p class="cert-date">${t("cert.date", { d: u.fmtDate ? u.fmtDate(d.date) : d.date })}</p>
      <div class="cert-fish" aria-hidden="true">${AA.creature("fish", ["#12a7b0", "#ff7a59", "#f2c14e"])}${AA.creature("seahorse", ["#f2a541", "#e0603a", "#ffe08a"])}${AA.creature("turtle", ["#3a9a6a", "#8fd19e", "#e8c26a"])}</div>
      <p class="cert-foot">${t("cert.foot")}</p></div>`;
  };
  const CERT_CSS = `*{box-sizing:border-box}body{margin:0;padding:12mm;font:12pt/1.4 Georgia,serif;color:#0b2a3a;background:#fff}
    .cert-in{border:3px double #0b7f86;border-radius:6mm;padding:10mm;text-align:center;background:linear-gradient(#f4fbfc,#e2f2f4)}
    .cert-top{display:flex;gap:4mm;align-items:center;justify-content:center}.cert-seal svg{width:16mm;height:16mm;color:#c59500}
    .cert-k{margin:0;font:700 9pt system-ui;letter-spacing:.15em;text-transform:uppercase;color:#0b7f86}.cert-h{margin:1mm 0;font-size:22pt}
    .cert-line{font-size:14pt}.cert-score b{font-size:34pt}.cert-score span{font-size:14pt;color:#555}.cert-m{font:700 13pt system-ui;color:#0b7f86}
    .cert-fish{display:flex;justify-content:center;gap:6mm;margin:4mm 0}.cert-fish svg{width:22mm;height:auto}.cert-foot,.cert-date{font-size:9pt;color:#555}@page{margin:10mm}`;
  const certDoc = d => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${u.esc(t("cert.title"))}</title><style>${CERT_CSS}</style></head><body>${certHtml(d)}</body></html>`;
  AA.cert = { html: certHtml, doc: certDoc, mention };
  if (V.quiz) {
    const q0 = V.quiz.render;
    V.quiz.render = function (el, args) {
      const out = q0.call(this, el, args), c = AA.ctx;
      if (!c || c.mode !== "exam") return out;
      el.classList.add("exam-amb");
      if (!u.$(".ex-hall", el)) el.insertAdjacentHTML("beforeend", hallFish());
      if (c.timeTotal == null) c.timeTotal = c.timeLeft;
      if (!c.done) {
        const tm = u.$("#tmr", el);
        if (tm && !u.$(".ex-tbar", el)) {
          const card = u.$(".qcard", el) || el.firstElementChild;
          if (card) card.insertAdjacentHTML("beforebegin", `<div class="ex-tbar" role="progressbar" aria-label="${t("cert.timeLeft")}" aria-valuemin="0" aria-valuemax="100"><i></i><span class="xs">${t("cert.hall")}</span></div>`);
        }
        const upd = () => { const b = u.$(".ex-tbar", el); if (!b || !AA.ctx || AA.ctx !== c) return false; const p = Math.max(0, Math.min(1, c.timeLeft / (c.timeTotal || 1))); b.firstElementChild.style.width = (p * 100).toFixed(1) + "%"; b.classList.toggle("low", p < .15); b.setAttribute("aria-valuenow", Math.round(p * 100)); return true; };
        upd(); clearInterval(c.tbar); c.tbar = setInterval(() => { if (!upd() || c.done) clearInterval(c.tbar); }, 1000);
        if (!c.introShown) {
          c.introShown = true;
          const ov = document.createElement("div"); ov.className = "ex-intro"; ov.setAttribute("role", "status");
          ov.innerHTML = `<div class="ex-intro-in"><p class="eyebrow">${t("cert.kicker")}</p><h2>${u.esc(c.title || "")}</h2><p>${t("cert.intro", { n: c.items.length, m: Math.round((c.timeTotal || 0) / 60) })}</p><p class="small">${t("cert.intro2")}</p></div>`;
          document.body.appendChild(ov);
          setTimeout(() => ov.classList.add("out"), 2300); setTimeout(() => ov.remove(), 2900);
        }
      } else if (!u.$(".cert", el)) {
        const d = certData(c), rep = u.$(".ex-report", el);
        const html = `<section class="card cert">${certHtml(d)}<div class="row cert-acts"><button class="btn sm" id="certp">${AA.icon("download")} ${t("cert.print")}</button><button class="btn ghost sm" id="certd">${AA.icon("save")} ${t("cert.dl")}</button></div></section>`;
        if (rep) rep.insertAdjacentHTML("beforebegin", html); else el.insertAdjacentHTML("beforeend", html);
        const dl = () => AA.pwa.saveFile("abysse-certificat-" + d.date + ".html", certDoc(d), m => fx.toast(t("cert.dlT"), m, "save"));
        u.$("#certd", el).onclick = dl;
        u.$("#certp", el).onclick = () => { try { const f = document.createElement("iframe"); f.className = "print-frame"; f.setAttribute("aria-hidden", "true"); document.body.appendChild(f); f.srcdoc = certDoc(d); f.onload = () => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { dl(); } setTimeout(() => f.remove(), 60000); }; } catch (e) { dl(); } };
        if (mention(d.score) !== "no") try { fx.burstAt(u.$(".cert-seal", el), 30, "rgba(242,193,78,.9)"); } catch (e) {}
      }
      return out;
    };
  }

  /* ---------- Cursus en carte marine ---------- */
  const SOUND = { decouverte: "0–6 m", n1: "0–20 m", n2: "0–40 m", n3: "0–60 m", n4: "rd.guide", e2: "rd.teach", mf: "rd.train" };
  const ROSE = `<svg class="rd-rose" viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" stroke-opacity=".35"/><circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-dasharray="2 3"/><path d="M30 4 34 30 30 56 26 30Z" fill="currentColor" fill-opacity=".55"/><path d="M4 30 30 26 56 30 30 34Z" fill="currentColor" fill-opacity=".3"/><text x="30" y="13" text-anchor="middle" font-size="8" fill="currentColor">N</text></svg>`;
  if (V.cursus) {
    const c0 = V.cursus.render;
    V.cursus.render = function (el, args) {
      const out = c0.call(this, el, args), r = u.$(".road", el);
      if (r && !r.classList.contains("chart")) {
        r.classList.add("chart");
        r.insertAdjacentHTML("afterbegin", `<li class="rd-legend" aria-hidden="true">${ROSE}<span class="xs">${t("rd.chart")}</span></li>`);
        u.$$(":scope > .rd-step", r).forEach((li, i) => {
          li.style.setProperty("--i", i);
          const id = (u.$(".rd-node", li) || {}).dataset ? u.$(".rd-node", li).dataset.id : "";
          const s = SOUND[id]; if (!s) return;
          const dot = u.$(":scope > .rd-node .rd-txt", li);
          if (dot) dot.insertAdjacentHTML("beforeend", `<span class="rd-sound">${AA.icon("dive")} ${/^rd\./.test(s) ? t(s) : s}</span>`);
        });
      }
      return out;
    };
  }
})();
