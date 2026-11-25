/* =====================================================================
   Abysse Academy · carte des mondes et cours en couches
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx;

  /* ---------- Carte ---------- */
  AA.view("map", {
    tab: "map", keepScroll: true,
    render(el, [wid]) {
      const w = C.worldById[wid] || C.worldById[G.goalWorld()];
      const list = C.inWorld(w.id), open = G.worldOpen(w);
      const starsGot = u.sum(list.map(m => G.stars(m.id))), starsMax = list.length * 3;
      const cur = list.findIndex(m => G.unlocked(m) && G.stars(m.id) < 1);
      el.innerHTML = `<h1 class="sr">${t("tab.map")}</h1>
        <div class="seg" role="tablist" aria-label="${t("map.worlds")}">${C.worlds.map(x => `<button role="tab" data-w="${x.id}" aria-pressed="${x.id === w.id}" aria-selected="${x.id === w.id}">${!G.worldOpen(x) ? "🔒 " : ""}${u.esc(x.short)}</button>`).join("")}</div>
        <section class="worldhead" style="--wc:var(${w.color});margin-top:var(--sp-4)">
          <p class="eyebrow">${t("map.world")} ${C.worlds.indexOf(w) + 1}</p><h2>${u.esc(w.title)}</h2><p class="muted" style="margin:6px 0 12px">${u.esc(w.sub)}</p>
          ${w.soon ? "" : `<div class="row between small"><span>${AA.icon("star")} ${starsGot} / ${starsMax}</span><span class="muted">${t("map.done", { n: list.filter(m => G.stars(m.id) >= 1).length, tot: list.length })}</span></div>${AA.ui.bar(starsGot / Math.max(1, starsMax))}`}
          ${!open && !w.soon ? `<p class="chip warn" style="margin-top:12px">${AA.icon("lock")} ${u.esc(G.lockReason(list[0]))}</p>` : ""}
        </section>
        ${w.soon ? soon(w) : `${w.surface ? `<div class="surface-line">${u.esc(w.surface)}</div>` : ""}<div class="map" style="--wc:var(${w.color})"><svg class="rope" aria-hidden="true"></svg>
          ${list.map((m, i) => {
            const ok = G.unlocked(m), st = G.stars(m.id), stale = G.isStale(m.id), cls = !ok ? "lock" : st >= 1 ? "done" : "";
            const info = i === cur ? `<span style="color:var(--wc)">${t("map.next")}</span>` : stale ? `<span style="color:var(--accent)">${t("map.stale")}</span>` : u.esc(m.sub);
            return `<div class="spot ${i % 2 ? "r" : ""}"><button class="node ${cls} ${i === cur ? "cur" : ""}" data-id="${m.id}" aria-label="${u.esc(m.title)}${ok ? "" : " · " + t("map.locked")}">${AA.icon(ok ? m.icon : "lock")}${stale ? `<span class="stale" aria-hidden="true">!</span>` : ""}</button>
              <div class="info"><small>${u.esc(m.depth)}</small><b>${u.esc(m.title)}</b><span>${info}</span><br>${AA.stars(st)}</div></div>`;
          }).join("")}</div>`}`;
      u.$$("[data-w]", el).forEach(b => b.onclick = () => { fx.sfx.tap(); AA.router.go("map/" + b.dataset.w, undefined, true); });
      u.$$(".node", el).forEach(b => b.onclick = () => {
        const m = C.byId[b.dataset.id];
        if (!G.unlocked(m)) { fx.sfx.bad(); fx.buzz(30); b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 400); fx.toast(t("map.locked"), G.lockReason(m), "lock", () => AA.router.go("lesson/" + m.id)); return; }
        fx.sfx.tap(); AA.router.go("lesson/" + m.id);
      });
      requestAnimationFrame(() => u.$$(".map", el).forEach(rope));
    }
  });
  function soon(w) {
    return `<section class="card soft stack" style="margin-top:var(--sp-4)"><h3>${t("map.soonT")}</h3><p class="muted">${t("map.soonS")}</p>
      <ul class="path">${AA.i18n.raw("map.soonList").map(x => `<li><span></span><span><b>${x[0]}</b><span>${x[1]}</span></span></li>`).join("")}</ul></section>`;
  }
  function rope(map) {
    const svg = u.$(".rope", map); const mr = map.getBoundingClientRect();
    const pts = u.$$(".node", map).map(n => { const r = n.getBoundingClientRect(); return [r.left - mr.left + r.width / 2, r.top - mr.top + r.height / 2]; });
    if (!pts.length) return;
    svg.setAttribute("viewBox", `0 0 ${mr.width} ${mr.height}`);
    let d = `M${pts[0][0]} -14 L${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], my = (y0 + y1) / 2; d += ` C${x0} ${my} ${x1} ${my} ${x1} ${y1}`; }
    svg.innerHTML = `<path d="${d}"/>`;
  }
  addEventListener("resize", u.debounce(() => { if (AA.router.name === "map") u.$$(".map").forEach(rope); }, 150));

  /* ---------- Cours ---------- */
  const TABS = ["essentiel", "approfondir", "memo", "moniteur"];
  AA.view("lesson", {
    tab: "map",
    guard: ([id]) => !!C.byId[id],
    fallback: "map",
    render(el, [id, tabArg]) {
      const m = C.byId[id], w = C.worldById[m.world], S = AA.S, list = C.inWorld(m.world), i = list.indexOf(m);
      const tab = TABS.includes(tabArg) ? tabArg : "essentiel";
      const ok = G.unlocked(m), st = G.stars(m.id), read = S.read[m.id] || {}, note = S.notes[m.id] || { text: "", ok: "" };
      const deepQ = m.quiz.filter(q => q.lvl === 2).length, gens = G.genKeys(m.id).length;
      const acc = G.moduleAcc(m.id);
      let body = "";
      if (tab === "essentiel") body = `${m.diagram && C.diagrams[m.diagram] ? C.diagrams[m.diagram]() : ""}<div class="prose">${m.essentiel}</div>${readBtn("e", read.e)}`;
      else if (tab === "approfondir") body = m.approfondir ? `<p class="callout"><span class="eyebrow">${t("lesson.deepIntro")}</span>${t("lesson.deepIntroS")}</p><div class="prose">${m.approfondir}</div>${readBtn("a", read.a)}` : AA.ui.empty("layers", t("lesson.noDeepT"), t("lesson.noDeepS"));
      else if (tab === "memo") body = m.memo.length ? `<div class="memo">${m.memo.map(([a, b]) => `<div><b>${u.esc(a)}</b><span class="muted">${u.esc(b)}</span></div>`).join("")}</div>
          <p class="small muted" style="margin-top:var(--sp-4)">${t("lesson.memoHint")}</p><a class="btn ghost block" href="#/flash/${m.id}">${AA.icon("cards")} ${t("lesson.memoCards")}</a>` : AA.ui.empty("bulb", t("lesson.noMemoT"), "");
      else body = `<p class="muted">${t("lesson.coachIntro")}</p>
          ${m.moniteur.length ? `<div class="stack">${m.moniteur.map((q, k) => `<div class="coachq"><span>${u.esc(q)}</span><button class="btn ghost sm" data-addq="${k}">${AA.icon("plus")} ${t("lesson.add")}</button></div>`).join("")}</div>` : ""}
          <div class="field" style="margin-top:var(--sp-5)"><label for="note">${t("lesson.myNotes")}</label><textarea class="input" id="note" rows="6" placeholder="${t("lesson.notesPh")}">${u.esc(note.text)}</textarea><span class="xs muted" id="notesaved"></span></div>
          <label class="setting"><span class="grow"><b>${t("lesson.validated")}</b><span>${note.ok ? t("lesson.validatedOn", { d: note.ok }) : t("lesson.validatedS")}</span></span><span class="switch"><input type="checkbox" id="valid" ${note.ok ? "checked" : ""}><i></i></span></label>`;

      el.innerHTML = `
        <div class="pagehead"><a class="closebtn" href="#/map/${m.world}" aria-label="${t("nav.back")}">${AA.icon("back")}</a><span class="eyebrow grow">${u.esc(w.short)} · ${i + 1}/${list.length}</span>${AA.stars(st)}</div>
        <header class="lesson-hero" style="--wc:var(${w.color})">
          <div class="row" style="gap:var(--sp-4);flex-wrap:nowrap"><span class="ic">${AA.icon(m.icon)}</span><div class="grow"><p class="eyebrow" style="color:var(--wc)">${u.esc(m.depth)}</p><h1 style="font-size:var(--fs-2xl)">${u.esc(m.title)}</h1><p class="muted" style="margin:4px 0 0">${u.esc(m.sub)}</p></div></div>
          <div class="row" style="margin-top:var(--sp-4)">
            <span class="chip ${read.e ? "ok" : ""}">${AA.icon("book")} ${read.e ? t("lesson.readOk") : t("lesson.toRead")}</span>
            ${acc != null ? `<span class="chip">${AA.icon("target")} ${Math.round(acc * 100)} %</span>` : ""}
            ${note.ok ? `<span class="chip gold">${AA.icon("check")} ${t("lesson.coachOk")}</span>` : ""}
            ${G.isStale(m.id) ? `<span class="chip warn">${AA.icon("refresh")} ${t("map.stale")}</span>` : ""}
          </div>
        </header>
        ${!ok ? `<div class="callout trap"><span class="eyebrow">${t("map.locked")}</span>${u.esc(G.lockReason(m))} ${t("lesson.lockedRead")}</div>` : ""}
        <div class="seg lesson-tabs" role="tablist" style="margin-top:var(--sp-4)">${TABS.map(k => `<button role="tab" data-tab="${k}" aria-pressed="${k === tab}" aria-selected="${k === tab}">${t("lesson.tab." + k)}</button>`).join("")}</div>
        <article class="card lesson-body" style="margin-top:var(--sp-3)">${body}</article>
        <div class="row between lesson-nav">${i > 0 ? `<a class="btn ghost sm" href="#/lesson/${list[i - 1].id}">${AA.icon("back")} ${u.esc(list[i - 1].title)}</a>` : "<span></span>"}${i < list.length - 1 ? `<a class="btn ghost sm" href="#/lesson/${list[i + 1].id}">${u.esc(list[i + 1].title)} ${AA.icon("next")}</a>` : ""}</div>
        <div class="sticky-cta"><div class="card glass">
          <button class="btn grow" id="dive" ${ok ? "" : "disabled"}>${AA.icon("play")} ${tab === "approfondir" && deepQ ? t("lesson.diveDeep", { n: deepQ }) : t("lesson.dive", { n: Math.min(10, m.quiz.length) })}</button>
          ${gens ? `<button class="btn gold sm" id="calc" ${ok ? "" : "disabled"} aria-label="${t("lesson.calcs")}">${AA.icon("calc")}</button>` : ""}
        </div></div>`;
      u.$$("[data-diagram]", el).forEach(f => { const d = C.diagrams[f.dataset.diagram]; if (d) f.outerHTML = d(); });
      u.$$("[data-tab]", el).forEach(b => b.onclick = () => { fx.sfx.tap(); AA.router.go("lesson/" + m.id + "/" + b.dataset.tab, undefined, true); });
      u.$("#dive").onclick = () => AA.quiz.module(m, tab === "approfondir" && deepQ > 0);
      const cb = u.$("#calc"); if (cb) cb.onclick = () => AA.quiz.calcs(m.id, 6, t("quiz.calcsOf", { title: m.title }));
      const rb = u.$("[data-read]", el);
      if (rb) rb.onclick = () => {
        const k = rb.dataset.read, first = !(S.read[m.id] || {})[k]; S.read[m.id] = Object.assign({}, S.read[m.id], { [k]: u.today() });
        G.dayc().read++; G.markDay(); AA.store.save(); if (first) G.addXp(k === "a" ? 10 : 5, rb); fx.sfx.ok(); G.checkBadges(); AA.router.refresh();
      };
      const ta = u.$("#note");
      if (ta) {
        const save = u.debounce(() => { S.notes[m.id] = Object.assign({}, S.notes[m.id], { text: ta.value }); AA.store.save(); const s = u.$("#notesaved"); if (s) s.textContent = t("lesson.saved"); }, 400);
        ta.oninput = save;
        u.$$("[data-addq]", el).forEach(b => b.onclick = () => { const q = m.moniteur[+b.dataset.addq]; if (!ta.value.includes(q)) { ta.value = (ta.value ? ta.value.trim() + "\n" : "") + "• " + q; save(); fx.sfx.tap(); b.disabled = true; } });
        u.$("#valid").onchange = e => { S.notes[m.id] = Object.assign({ text: ta.value }, S.notes[m.id], { ok: e.target.checked ? u.today() : "" }); AA.store.save(); if (e.target.checked) { fx.sfx.badge(); G.addXp(10, e.target); } G.checkBadges(); AA.router.refresh(); };
      }
    }
  });
  const readBtn = (k, done) => `<div class="readdone">${done === u.today() ? `<span class="chip ok">${AA.icon("check")} ${t("lesson.readToday")}</span>`
    : done ? `<button class="btn ghost block" data-read="${k}">${AA.icon("refresh")} ${t("lesson.markReread")}</button><span class="xs muted">${t("lesson.readOn", { d: done })}</span>`
    : `<button class="btn ghost block" data-read="${k}">${AA.icon("check")} ${t(k === "a" ? "lesson.markDeep" : "lesson.markRead")} <span class="chip gold">+${k === "a" ? 10 : 5} XP</span></button>`}</div>`;
})();
