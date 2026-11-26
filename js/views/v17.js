/* =====================================================================
   Abysse Academy 1.7
   - Révisions espacées sur toutes les questions (S.qsrs)
   - « Explique-moi » : mini-cours animé de 30 s après une erreur
   - Hors ligne garanti : indicateur d'état, sauvegarde automatique
   - Carnet de validation : un moniteur valide un thème (nom, date)
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, ui = AA.ui, fx = AA.fx;
  const S = () => AA.S;
  const plus = (d, n) => { const x = new Date(d + "T12:00:00"); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };

  /* ---------- Révisions espacées (toutes les questions) ----------
     Boîte 0 à 5. Bonne réponse sans doute : boîte suivante, retour dans
     2, 4, 9, 20 puis 45 jours. Erreur ou doute : boîte 0, retour demain.
     Les questions déjà vues avant la 1.7 sont reprises depuis leur date. */
  G.Q_DAYS = [1, 2, 4, 9, 20, 45];
  G.qState = id => { const s = S(), r = (s.qsrs || {})[id]; if (r) return r; const l = s.last[id]; if (!l) return null; const ok = s.seen[id] === 1; return { b: ok ? 1 : 0, due: plus(l, ok ? 2 : 1) }; };
  G.qSrs = (q, ok, doubt) => {
    if (!q || !C.qById[q.id] || q.calc || q.gen) return;
    const s = S(); s.qsrs = s.qsrs || {}; const r = Object.assign({ b: 0 }, G.qState(q.id) || {});
    if (ok && !doubt) r.b = Math.min(5, (r.b || 0) + 1); else r.b = 0;
    r.due = plus(u.today(), G.Q_DAYS[r.b] || 1); r.t = Date.now(); s.qsrs[q.id] = r;
  };
  const rec = G.record;
  G.record = (q, ok, doubt, picked) => { rec(q, ok, doubt, picked); try { G.qSrs(q, ok, doubt); } catch (e) {} };
  G.qDue = () => { const d = u.today(); return C.questions.filter(q => G.inPlay(q.m)).map(q => [q, G.qState(q.id)]).filter(([, r]) => r && r.due <= d).sort((a, b) => a[1].due.localeCompare(b[1].due) || a[1].b - b[1].b).map(x => x[0]); };
  G.qMemory = () => { const b = [0, 0, 0, 0, 0, 0]; let n = 0; C.questions.forEach(q => { const r = G.qState(q.id); if (r) { b[Math.min(5, r.b || 0)]++; n++; } }); return { b, n, due: G.qDue().length }; };
  /* La plongée du jour commence par les questions qui arrivent à échéance. */
  const ds = G.dailySet;
  G.dailySet = () => {
    const base = ds(), due = G.qDue().slice(0, 4), ids = new Set(due.map(q => q.id));
    const rest = base.filter(q => !ids.has(q.id)), calcs = rest.filter(q => q.gen || q.calc), qs = rest.filter(q => !(q.gen || q.calc));
    return u.shuffle(due.concat(qs).slice(0, 8)).concat(calcs);
  };
  const Q = AA.quiz;
  Q.srs = () => { const qs = G.qDue(); if (!qs.length) { fx.toast(t("srs.noneT"), t("srs.noneS"), "check"); return; } Q.start("srs", u.shuffle(qs.slice(0, 15)), { title: t("mode.srs"), back: "train" }); };
  const rs = Q.restart; Q.restart = c => (c && c.mode === "srs" ? Q.srs() : rs(c));
  const SRSB = ["srs.box0", "srs.box1", "srs.box2", "srs.box3", "srs.box4", "srs.box5"];
  document.addEventListener("click", e => { if (e.target.closest("[data-srsgo]")) { e.preventDefault(); Q.srs(); } });
  AA.srsCard = () => { const m = G.qMemory(), tot = m.b.reduce((a, b) => a + b, 0) || 1;
    return `<section class="card srs-card"><div class="row" style="justify-content:space-between;align-items:baseline"><h3>${t("srs.memT")}</h3>${AA.helpBtn ? AA.helpBtn("srs") : ""}</div>
      <p class="small muted">${t("srs.memS", { n: m.n, due: m.due })}</p>
      <div class="srs-bars">${m.b.map((n, i) => `<div><i style="height:${Math.max(4, n / tot * 100)}%"></i><b>${n}</b><span>${t(SRSB[i])}</span></div>`).join("")}</div>
      ${m.due ? `<button class="btn block" data-srsgo>${AA.icon("refresh")} ${t("srs.go", { n: Math.min(15, m.due) })}</button>` : `<p class="small center">${AA.icon("check")} ${t("srs.upToDate")}</p>`}</section>`; };

  /* ---------- « Explique-moi » : mini-cours animé (≈ 30 s) ---------- */
  const firstPara = h => { const d = document.createElement("div"); d.innerHTML = h || ""; const p = Array.from(d.querySelectorAll("p")).find(x => x.textContent.trim().length > 40); const s = (p || d).textContent.trim().replace(/\s+/g, " "); return s.length > 320 ? s.slice(0, s.lastIndexOf(" ", 310)) + "…" : s; };
  const words = s => new Set(String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").match(/[a-z0-9₂]{4,}/g) || []);
  AA.explainMe = (q, picked) => {
    const m = C.byId[q.m]; if (!m) return; fx.sfx.flip && fx.sfx.flip();
    const me = Q.methodFor(q), pf = Q.pitfallFor(q), qw = words(q.q + " " + q.c[q.a] + " " + q.e);
    const memo = (m.memo || []).map(x => [x, [...words(x[0] + " " + x[1])].filter(w => qw.has(w)).length]).sort((a, b) => b[1] - a[1]).slice(0, 3).map(x => x[0]);
    const steps = [
      [t("exp.s1"), "book", `<h3>${u.esc(m.title)}</h3><p>${u.esc(firstPara(m.essentiel))}</p>`],
      m.diagram && C.diagrams[m.diagram] ? [t("exp.s2"), "eye", C.diagrams[m.diagram]()] : null,
      me ? [t("exp.s3"), "brain", `<p class="small muted">${u.esc(me.title)}</p><ol class="ex-steps">${me.steps.map(s => `<li>${s}</li>`).join("")}</ol>`]
        : [t("exp.s3b"), "brain", `<p class="exp-q">${u.esc(q.q)}</p><p class="exp-a">${AA.icon("check")} ${u.esc(q.c[q.a])}</p><p>${u.esc(q.e)}</p>`],
      [t("exp.s4"), "info", `${picked != null && picked !== q.a ? `<p class="exp-bad">${AA.icon("x")} ${t("exp.youPicked")} <b>${u.esc(q.c[picked])}</b></p>` : ""}${pf ? `<p><b>${u.esc(pf.title)}</b></p><p>${u.esc(pf.why)}</p><p><b>${t("ex.fix")}</b> ${u.esc(pf.fix)}</p>` : `<p>${t("exp.trapGen", { a: u.esc(q.c[q.a]) })}</p>`}`],
      memo.length ? [t("exp.s5"), "star", `<div class="memo">${memo.map(([a, b]) => `<div><b>${u.esc(a)}</b><span class="muted">${u.esc(b)}</span></div>`).join("")}</div>`] : null
    ].filter(Boolean);
    const DUR = 6500;
    const close = ui.sheet(`<div class="exp-sheet"><div class="exp-bars">${steps.map(() => `<i><b></b></i>`).join("")}</div>
      <div class="exp-body" aria-live="polite"></div>
      <div class="row exp-nav"><button class="btn ghost sm" id="expP" aria-label="${t("exp.prev")}">${AA.icon("back")}</button><button class="btn ghost sm" id="expK" aria-label="${t("exp.pause")}">${AA.icon("pause")}</button><button class="btn sm grow" id="expN">${t("exp.next")} ${AA.icon("next")}</button></div>
      <div class="row exp-end"><a class="btn ghost sm" href="#/lesson/${m.id}">${AA.icon("book")} ${t("ex.fullLesson")}</a><button class="btn ghost sm" data-no>${t("ex.backQuiz")}</button></div></div>`, t("exp.title"));
    const root = document.querySelector(".exp-sheet"); if (!root) return;
    let i = 0, timer = null, paused = AA.a11y && AA.a11y.reduced(), start = 0, left = DUR;
    const bars = root.querySelectorAll(".exp-bars b"), body = root.querySelector(".exp-body");
    const tick = () => { if (!document.body.contains(root)) return stop(); if (paused) return; const p = Math.min(1, 1 - (left - (performance.now() - start)) / DUR); bars[i].style.width = p * 100 + "%"; if (p >= 1) go(i + 1); else timer = requestAnimationFrame(tick); };
    const stop = () => cancelAnimationFrame(timer);
    const show = () => { const [h, ic, html] = steps[i]; body.innerHTML = `<div class="exp-step"><p class="eyebrow">${AA.icon(ic)} ${h} · ${i + 1}/${steps.length}</p>${html}</div>`;
      body.querySelectorAll(".diagram").forEach(d => d.classList.add("in")); bars.forEach((b, k) => (b.style.width = k < i ? "100%" : "0%"));
      root.querySelector("#expN").innerHTML = i === steps.length - 1 ? `${AA.icon("check")} ${t("exp.done")}` : `${t("exp.next")} ${AA.icon("next")}`; left = DUR; start = performance.now(); stop(); if (!paused) timer = requestAnimationFrame(tick); };
    const go = k => { if (k >= steps.length) { bars[i].style.width = "100%"; stop(); return; } i = Math.max(0, k); show(); };
    root.querySelector("#expP").onclick = () => go(i - 1);
    root.querySelector("#expN").onclick = () => { if (i === steps.length - 1) close(); else go(i + 1); };
    const kb = root.querySelector("#expK"); kb.onclick = () => { paused = !paused; kb.innerHTML = AA.icon(paused ? "play" : "pause"); if (!paused) { start = performance.now() - (DUR - left); left = DUR; timer = requestAnimationFrame(tick); } else { left = DUR - (performance.now() - start); stop(); } };
    if (paused) kb.innerHTML = AA.icon("play");
    show();
    S().explained = (S().explained || 0) + 1; AA.store.save(false, true);
  };

  /* ---------- Hors ligne et sauvegarde ---------- */
  AA.net = { last: 0 };
  const inArt = () => !!(window.claude && window.claude.use);
  AA.netSheet = async () => {
    const on = navigator.onLine, sw = !!(navigator.serviceWorker && navigator.serviceWorker.controller);
    let cached = false; try { cached = !!(window.caches && (await caches.keys()).some(k => /abysse/i.test(k))); } catch (e) {}
    let snaps = []; try { snaps = await AA.store.snapshots(); } catch (e) {}
    const when = S().savedAt ? new Date(S().savedAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "—";
    const row = (ok, title, sub) => `<div class="net-row ${ok ? "ok" : "warn"}">${AA.icon(ok ? "check" : "info")}<div><b>${title}</b><span class="small muted">${sub}</span></div></div>`;
    const close = ui.sheet(`<div class="help-sheet stack"><div class="help-ic">${AA.icon(on ? "shield" : "offline")}</div><h3>${t(on ? "net.onT" : "net.offT")}</h3>
      ${row(true, t("net.saveT", { h: when }), t("net.saveS"))}
      ${inArt() ? row(false, t("net.artT"), t("net.artS")) : row(sw || cached, t(sw || cached ? "net.offOkT" : "net.offNoT"), t(sw || cached ? "net.offOkS" : "net.offNoS"))}
      ${row(snaps.length > 0, t("net.snapT", { n: snaps.length }), snaps[0] ? t("net.snapS", { d: u.fmtDate ? u.fmtDate(snaps[0].date) : snaps[0].date }) : t("net.snapNone"))}
      ${row(!!(S().profile.driveAt || (AA.sync && AA.sync.linked && AA.sync.linked())), t("net.driveT"), t("net.driveS"))}
      <button class="btn block" id="snapnow">${AA.icon("save")} ${t("net.snapNow")}</button><a class="btn ghost block" href="#/backup">${t("net.more")}</a></div>`, t("net.title"));
    const b = document.getElementById("snapnow"); if (b) b.onclick = async () => { AA.store.save(true); await AA.store.snapshot("manuel"); fx.toast(t("net.snapDoneT"), t("net.snapDoneS"), "save"); close(); };
  };
  const hs = AA.hudSheet; AA.hudSheet = k => (k === "net" ? AA.netSheet() : hs(k));
  const setNet = () => { const p = document.querySelector(".pill.net"); if (p) { p.innerHTML = AA.icon(navigator.onLine ? "shield" : "offline"); p.classList.toggle("off", !navigator.onLine); } };
  addEventListener("offline", () => { setNet(); fx.toast(t("net.offT"), t("net.offToast"), "offline"); });
  addEventListener("online", () => { setNet(); fx.toast(t("net.onT"), t("net.onToast"), "shield"); });
  /* Sauvegarde automatique : à chaque réponse (déjà), et en quittant ou en cachant l'appli,
     avec une copie de secours du jour mise à jour. */
  /* On n'écrit en quittant que s'il reste une écriture différée (base de données) en attente. */
  let dirty = false; const sv = AA.store.save;
  AA.store.save = (now, quiet) => { sv(now, quiet); dirty = now !== true; };
  const flush = () => { if (!dirty) return; dirty = false; try { sv(true, true); AA.store.snapshot().catch(() => {}); } catch (e) {} };
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(); });
  addEventListener("pagehide", flush);
  setInterval(() => { if (document.visibilityState === "visible" && S().profile.onboarded) AA.store.snapshot().catch(() => {}); }, 10 * 60 * 1000);
  AA.store.onSave(quiet => { if (quiet) return; const p = document.querySelector(".pill.net"); if (p) { p.classList.remove("saved"); void p.offsetWidth; p.classList.add("saved"); } });

  /* ---------- Carnet de validation par un moniteur ---------- */
  AA.instr = mid => (S().instr || {})[mid] || null;
  AA.instrChip = mid => { const v = AA.instr(mid);
    return v ? `<button class="chip ok instr-chip" data-instr="${mid}" title="${t("instr.byT", { by: u.esc(v.by), d: u.fmtDate ? u.fmtDate(v.d) : v.d })}">${AA.icon("check")} ${t("instr.ok")}</button>`
      : `<button class="chip instr-chip" data-instr="${mid}">${AA.icon("teach")} ${t("instr.ask")}</button>`; };
  AA.instrSheet = (mid, after) => {
    const m = C.byId[mid]; if (!m) return; const v = AA.instr(mid), last = S().profile.instrLast || "";
    const close = ui.sheet(`<div class="help-sheet stack instr-sheet"><div class="help-ic">${AA.icon("teach")}</div><h3>${t("instr.title")}</h3><p class="small muted">${u.esc(C.worldById[m.world].short)} · <b>${u.esc(m.title)}</b></p>
      <p class="small">${t("instr.how")}</p>
      ${v ? `<div class="callout check"><span class="eyebrow">${t("instr.ok")}</span>${t("instr.byT", { by: u.esc(v.by), d: u.fmtDate ? u.fmtDate(v.d) : v.d })}${v.note ? `<br><span class="small">${u.esc(v.note)}</span>` : ""}</div>` : ""}
      <label class="field"><span>${t("instr.name")}</span><input id="iname" maxlength="60" autocomplete="off" value="${u.esc(v ? v.by : last)}" placeholder="${t("instr.namePh")}"></label>
      <label class="field"><span>${t("instr.date")}</span><input id="idate" type="date" value="${v ? v.d : u.today()}" max="${u.today()}"></label>
      <label class="field"><span>${t("instr.note")}</span><input id="inote" maxlength="140" autocomplete="off" value="${u.esc(v && v.note || "")}" placeholder="${t("instr.notePh")}"></label>
      <button class="btn block" id="isave">${AA.icon("check")} ${t(v ? "instr.update" : "instr.save")}</button>
      ${v ? `<button class="btn ghost block" id="idel">${t("instr.remove")}</button>` : ""}</div>`, t("instr.title"));
    const done = () => { close(); AA.store.save(); if (after) after(); else AA.router.refresh(); };
    document.getElementById("isave").onclick = () => { const by = document.getElementById("iname").value.trim(); if (!by) { document.getElementById("iname").focus(); fx.toast(t("instr.needName"), "", "info"); return; }
      S().instr = S().instr || {}; S().instr[mid] = { by, d: document.getElementById("idate").value || u.today(), note: document.getElementById("inote").value.trim(), t: Date.now() }; S().profile.instrLast = by;
      fx.sfx.up && fx.sfx.up(); fx.toast(t("instr.doneT"), m.title, "teach"); done(); };
    const del = document.getElementById("idel"); if (del) del.onclick = () => { delete S().instr[mid]; done(); };
  };
  document.addEventListener("click", e => { const b = e.target.closest("[data-instr]"); if (b) { e.preventDefault(); e.stopPropagation(); AA.instrSheet(b.dataset.instr); } }, true);
  AA.instrText = () => { const L = [t("instr.title") + " · " + (S().profile.name || "") + " · " + u.today(), ""];
    C.worlds.filter(w => !w.soon).forEach(w => { const ms = C.inWorld(w.id), ok = ms.filter(m => AA.instr(m.id)); if (!ok.length) return; L.push(w.short + " (" + ok.length + "/" + ms.length + ")");
      ok.forEach(m => { const v = AA.instr(m.id); L.push("  ✓ " + m.title + " — " + v.by + ", " + v.d + (v.note ? " (" + v.note + ")" : "")); }); L.push(""); });
    return L.join("\n"); };
  AA.view("carnet", {
    tab: "profile", depth: 2,
    render(el) {
      const ws = C.worlds.filter(w => !w.soon), all = C.modules.length, n = C.modules.filter(m => AA.instr(m.id)).length;
      el.innerHTML = `${ui.head(t("instr.view"), "profile")}<p class="muted">${t("instr.intro")}</p>
        <div class="row" style="flex-wrap:wrap;gap:8px;margin:var(--sp-3) 0"><span class="chip ok">${t("instr.count", { n, all })}</span><button class="btn ghost sm" id="ishare">${AA.icon("share")} ${t("instr.share")}</button><button class="btn ghost sm" id="idl">${AA.icon("download")} ${t("instr.dl")}</button></div>
        <div class="carnet">${ws.map(w => { const ms = C.inWorld(w.id), k = ms.filter(m => AA.instr(m.id)).length; return `<section class="card carnet-w" style="--wc:var(${w.color})"><div class="row" style="justify-content:space-between"><h3>${u.esc(w.short)}</h3><span class="chip ${k === ms.length ? "ok" : ""}">${k}/${ms.length}</span></div>
          ${ms.map(m => { const v = AA.instr(m.id); return `<div class="carnet-row ${v ? "ok" : ""}"><span class="grow"><b>${u.esc(m.title)}</b><span class="xs muted">${v ? t("instr.byT", { by: u.esc(v.by), d: u.fmtDate ? u.fmtDate(v.d) : v.d }) : t("instr.notYet")}</span></span><button class="btn ${v ? "ghost" : ""} sm" data-instr="${m.id}">${v ? AA.icon("edit") : AA.icon("check")} ${t(v ? "instr.edit" : "instr.validate")}</button></div>`; }).join("")}</section>`; }).join("")}</div>
        <div class="callout"><span class="eyebrow">${t("common.validate")}</span>${t("instr.note2")}</div>`;
      const txt = AA.instrText();
      u.$("#ishare", el).onclick = async () => { try { if (navigator.share) await navigator.share({ title: t("instr.view"), text: txt }); else { await navigator.clipboard.writeText(txt); fx.toast(t("instr.copied"), "", "check"); } } catch (e) {} };
      u.$("#idl", el).onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" })); a.download = "abysse-carnet-validation.txt"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); };
    }
  });
})();
