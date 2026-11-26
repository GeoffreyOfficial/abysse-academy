/* =====================================================================
   Abysse Academy · carte des mondes et cours en couches
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx;

  /* ---------- Carte ----------
     Plongée verticale : la corde relie les thèmes, un plongeur descend
     jusqu'au thème en cours, les décors défilent en parallaxe et le fond
     s'assombrit avec la profondeur lue au centre de l'écran. */
  AA.view("map", {
    tab: "map", keepScroll: true,
    depth: ([wid]) => { const w = C.worldById[wid] || C.worldById[G.goalWorld()]; const l = C.inWorld(w.id); return l.length ? AA.scene.depthOf(l[0]) * .5 : 0; },
    render(el, [wid]) {
      const w = C.worldById[wid] || C.worldById[G.goalWorld()];
      const list = C.inWorld(w.id), open = G.worldOpen(w);
      const starsGot = u.sum(list.map(m => G.stars(m.id))), starsMax = list.length * 3;
      const cur = list.findIndex(m => G.unlocked(m) && G.stars(m.id) < 1);
      const boss = w.boss && !w.soon, bossOpen = boss && G.bossOpen(w.id), bossRec = (AA.S.boss || {})[w.id];
      el.innerHTML = `<h1 class="sr">${t("tab.map")}</h1>
        <div class="wstrip" role="tablist" aria-label="${t("map.worlds")}">${C.worlds.filter(x => !x.soon).map(x => { const l = C.inWorld(x.id), got = l.filter(mm => G.stars(mm.id) >= 1).length, op = G.worldOpen(x), md = AA.path.mode(x.id);
          return `<button role="tab" class="wchip ${op ? "" : "lock"} m-${md}" data-w="${x.id}" aria-pressed="${x.id === w.id}" aria-selected="${x.id === w.id}" style="--wc:var(${x.color})"><span class="wring" style="--p:${l.length ? got / l.length : 0}">${AA.icon(op ? x.icon : "lock")}</span><b>${u.esc(x.short)}</b><span class="xs">${AA.path.certified(x.id) ? "✓ " + t("map.got") : md === "skip" ? t("path.m.skip") : got + "/" + l.length}</span></button>`; }).join("")}</div>
        <div class="map-layout"><aside class="map-side">
        <section class="worldhead" style="--wc:var(${w.color});margin-top:var(--sp-4)">
          <div class="row between"><p class="eyebrow" style="margin:0">${t("map.world")} ${C.worlds.indexOf(w) + 1}</p>${AA.helpBtn("map")}</div><h2>${u.esc(w.title)}</h2><p class="muted" style="margin:6px 0 12px">${u.esc(w.sub)}</p>${w.soon ? "" : AA.levelBadge(w.id)}
          ${w.soon ? "" : `<div class="row between small"><span>${AA.icon("star")} ${starsGot} / ${starsMax}</span><span class="muted">${t("map.done", { n: list.filter(m => G.stars(m.id) >= 1).length, tot: list.length })}</span></div>${AA.ui.bar(starsGot / Math.max(1, starsMax))}`}
          ${!open && !w.soon ? `<p class="chip warn" style="margin-top:12px">${AA.icon("lock")} ${u.esc(G.worldLockReason(w))}</p>` : ""}
          ${w.soon ? "" : modeBanner(w, open)}
        </section>
        ${w.soon ? "" : `<nav class="modlist desk-only" aria-label="${t("map.list")}">${list.map((m, k) => { const okk = G.unlocked(m), s2 = G.stars(m.id); return `<a class="ml-row ${k === cur ? "cur" : ""} ${okk ? "" : "lock"}" href="#/lesson/${m.id}"><span class="ml-ic">${AA.icon(okk ? m.icon : "lock")}</span><span class="grow"><b>${u.esc(m.title)}</b><span class="xs muted">${u.esc(m.depth)} · ${u.esc(m.sub)}</span></span>${AA.stars(s2)}</a>`; }).join("")}
          ${boss ? `<a class="ml-row boss" href="#/boss/${w.id}"><span class="ml-ic">${AA.icon("swords")}</span><span class="grow"><b>${u.esc(w.boss.name)}</b><span class="xs muted">${bossRec && bossRec.won ? t("boss.beaten", { n: bossRec.best }) : bossOpen ? t("boss.ready") : t("boss.lockedS")}</span></span></a>` : ""}</nav>`}
        </aside><div class="map-main">
        ${w.soon ? soon(w) : `${w.surface ? `<div class="surface-line">${u.esc(w.surface)}</div>` : ""}<div class="map" data-world="${w.id}" style="--wc:var(${w.color})">
          <div class="para far" data-k=".22" aria-hidden="true"></div><div class="para mid" data-k=".1" aria-hidden="true"></div><div class="fauna" aria-hidden="true"></div><div class="sunrays" aria-hidden="true"></div>
          <svg class="rope" aria-hidden="true"></svg>
          ${list.map((m, i) => {
            const ok = G.unlocked(m), st = G.stars(m.id), stale = G.isStale(m.id), cls = !ok ? "lock" : st >= 1 ? "done" : "";
            const info = i === cur ? `<span style="color:var(--wc)">${t("map.next")}</span>` : stale ? `<span style="color:var(--accent)">${t("map.stale")}</span>` : u.esc(m.sub);
            return `<div class="spot ${i % 2 ? "r" : ""}" data-depth="${AA.scene.depthOf(m)}" data-label="${u.esc(m.depth)}"><button class="node ${cls} ${i === cur ? "cur" : ""}" data-id="${m.id}" aria-label="${u.esc(m.title)}${ok ? "" : " · " + t("map.locked")}">${AA.icon(ok ? m.icon : "lock")}${stale ? `<span class="stale" aria-hidden="true">!</span>` : ""}</button>
              <div class="info"><small>${u.esc(m.depth)}</small><b>${u.esc(m.title)}</b><span>${info}</span><br>${AA.stars(st)}</div></div>`;
          }).join("")}
          ${boss ? `<div class="spot bossspot" data-depth="${AA.scene.depthOf(list[list.length - 1]) + 5}" data-label="${u.esc(w.boss.depth || "")}"><button class="node boss ${bossRec && bossRec.won ? "done" : bossOpen ? "cur" : "lock"}" id="bossnode" aria-label="${u.esc(w.boss.name)}">${AA.icon(bossOpen || (bossRec && bossRec.won) ? "swords" : "lock")}</button>
            <div class="info"><small>${t("boss.eyebrow")}</small><b>${u.esc(w.boss.name)}</b><span>${bossRec && bossRec.won ? t("boss.beaten", { n: bossRec.best }) : bossOpen ? `<span style="color:var(--accent)">${t("boss.ready")}</span>` : t("boss.lockedS")}</span></div></div>` : ""}
          <button class="diver" id="diver" aria-label="${t("map.diver")}" hidden>${diverSvg()}</button>
        </div>`}
        ${w.soon ? "" : `<div class="depthchip" id="depthchip" aria-hidden="true">${AA.icon("gauge")}<b>${u.esc(list[0] ? list[0].depth : "")}</b></div>`}</div></div>`;
      u.$$("[data-w]", el).forEach(b => b.onclick = () => { fx.sfx.tap(); AA.router.go("map/" + b.dataset.w, undefined, true); });
      u.$$(".node[data-id]", el).forEach(b => b.onclick = () => {
        const m = C.byId[b.dataset.id];
        if (!G.unlocked(m)) { fx.sfx.bad(); fx.buzz(30); b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 400); fx.toast(t("map.locked"), G.lockReason(m), "lock", () => AA.router.go("lesson/" + m.id)); return; }
        fx.sfx.tap(); AA.router.go("lesson/" + m.id);
      });
      const rs = u.$("#wresume"); if (rs) rs.onclick = () => { AA.path.setMode(w.id, AA.path.certified(w.id) ? "review" : "learn"); AA.store.save(); fx.sfx.up(); AA.router.refresh(); };
      const bn = u.$("#bossnode"); if (bn) bn.onclick = () => { fx.sfx.tap(); AA.router.go("boss/" + w.id); };
      const dv = u.$("#diver"); if (dv) dv.onclick = () => { const m = list[cur >= 0 ? cur : list.length - 1]; if (m) AA.router.go("lesson/" + m.id); };
      requestAnimationFrame(() => u.$$(".map", el).forEach(m => { rope(m); decor(m); fauna(m); placeDiver(m, w, list, cur); onScroll(); }));
      const ws = u.$(".wstrip [aria-pressed=true]", el); if (ws) { const st = ws.parentElement; st.scrollLeft = ws.offsetLeft - (st.clientWidth - ws.offsetWidth) / 2; }
    }
  });
  /* Bandeau du parcours libre : révision, passé, obtenu, ou « déjà ce niveau ? ». */
  function modeBanner(w, open) {
    const P = AA.path, mode = P.mode(w.id), cert = (AA.S.certs || {})[w.id];
    const chips = `${cert ? `<span class="chip ok">${AA.icon("check")} ${t("path.got", { d: u.fmtDate(cert) })}</span>` : ""}${mode === "review" ? `<span class="chip">${AA.icon("refresh")} ${t("path.m.review")}</span>` : ""}`;
    if (mode === "skip") return `<div class="mode-banner skip"><p class="small" style="margin:0">${t("map.skipS")}</p><div class="row"><button class="btn sm" id="wresume">${AA.icon("play")} ${t("map.resume")}</button><a class="btn ghost sm" href="#/parcours">${t("path.manage")}</a></div></div>`;
    if (mode === "review") return `<div class="mode-banner"><div class="row">${chips}</div><p class="xs muted" style="margin:0">${t("map.reviewS")}</p></div>`;
    if (!open) return `<p class="xs" style="margin:10px 0 0">${t("map.already")} <a href="#/parcours">${t("path.manage")}</a></p>`;
    return chips ? `<div class="row" style="margin-top:10px">${chips}</div>` : "";
  }
  /* ---------- Lisibilité des cours (1.4) ---------- */
  const readMin = m => Math.max(1, Math.round(((m.essentiel || "") + (m.approfondir || "")).replace(/<[^>]+>/g, " ").split(/\s+/).length / 200));
  /* Sommaire des sous-titres (à partir de 3). */
  const toc = html => {
    const hs = []; html.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, (_, x) => hs.push(x.replace(/<[^>]+>/g, "")));
    return hs.length >= 3 ? `<nav class="toc" aria-label="${t("lesson.toc")}"><span class="eyebrow">${t("lesson.toc")}</span><div class="toc-list">${hs.map((h, i) => `<button class="chip" data-toc="${i}">${u.esc(h)}</button>`).join("")}</div></nav>` : "";
  };
  /* Exemple pas à pas : un calcul tiré au hasard, avec la méthode. Jamais les chiffres du quiz. */
  const exKeys = m => { const own = G.genKeys(m.id); return own.length ? own : (C.exampleGens && C.exampleGens[m.id] || []).filter(k => C.generators[k]); };
  const exampleCard = m => exKeys(m).length ? `<section class="example-card" id="exbox" aria-live="polite"></section>` : "";
  function drawExample(m) {
    const box = u.$("#exbox"); if (!box) return;
    const keys = exKeys(m), q = G.gen(u.pick(keys)); if (!q) { box.remove(); return; }
    const me = AA.quiz.methodFor(q);
    box.innerHTML = `<div class="row between"><span class="eyebrow">${AA.icon("bulb")} ${t("ex2.title")}</span>${AA.helpBtn("example")}</div>
      <p class="ex-q">${u.esc(q.q)}</p><p class="xs muted" style="margin:0">${t("ex2.try")}</p>
      <div class="ex-sol" hidden>${me ? `<ol class="ex-steps">${me.steps.map((s, i) => `<li style="--i:${i}">${s}</li>`).join("")}</ol>` : ""}
        <div class="callout ok"><span class="eyebrow">${t("ex2.result")}</span><b>${u.esc(q.c[q.a])}</b><p class="small" style="margin:6px 0 0">${u.esc(q.e)}</p></div>${me && me.tip ? `<p class="small"><b>${t("ex.fix")}</b> ${me.tip}</p>` : ""}</div>
      <div class="row"><button class="btn sm" id="exshow">${AA.icon("eye")} ${t("ex2.show")}</button><button class="btn ghost sm" id="exnew">${AA.icon("refresh")} ${t("ex2.other")}</button></div>`;
    u.$("#exshow").onclick = () => { u.$(".ex-sol", box).hidden = false; u.$("#exshow").remove(); AA.fx.sfx.flip(); };
    u.$("#exnew").onclick = () => { AA.fx.sfx.tap(); box.classList.remove("swap"); void box.offsetWidth; box.classList.add("swap"); drawExample(m); };
  }
  /* Animations d'apparition, sommaire cliquable, barre de lecture, exemple, signalement. */
  function enhance(el, m) {
    const body = u.$(".lesson-body", el); if (!body) return;
    drawExample(m);
    const hs = u.$$(".prose h3", body);
    u.$$("[data-toc]", el).forEach(b => b.onclick = () => { const h = hs[+b.dataset.toc]; if (h) h.scrollIntoView({ behavior: AA.a11y.reduced() ? "auto" : "smooth", block: "start" }); });
    u.$$("[data-rep]", el).forEach(b => b.onclick = () => AA.report({ type: "lesson", m: m.id, tab: b.dataset.rep }));
    if (!AA.a11y.reduced() && "IntersectionObserver" in window) {
      const items = u.$$(".prose > *, .diagram, .memo > div, .example-card", body);
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
      items.forEach(x => { x.classList.add("reveal"); io.observe(x); });
    }
    let bar = u.$("#readbar"); if (!bar) { bar = document.createElement("div"); bar.id = "readbar"; bar.setAttribute("aria-hidden", "true"); document.body.appendChild(bar); }
    const upd = () => { if (AA.router.name !== "lesson") { bar.style.transform = "scaleX(0)"; removeEventListener("scroll", upd); return; } const r = body.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / Math.max(1, r.height))); bar.style.transform = `scaleX(${p})`; };
    addEventListener("scroll", upd, { passive: true }); upd();
  }
  function soon(w) {
    return `<section class="card soft stack" style="margin-top:var(--sp-4)"><h3>${t("map.soonT")}</h3><p class="muted">${t("map.soonS")}</p>
      <ul class="path">${AA.i18n.raw("map.soonList").map(x => `<li><span><b>${x[0]}</b><span>${x[1]}</span></span></li>`).join("")}</ul></section>`;
  }
  /* Le plongeur (vue de profil, tête vers la droite). */
  const diverSvg = () => `<svg viewBox="0 0 64 40" aria-hidden="true"><g class="dv-body">
    <rect x="18" y="9" width="22" height="8" rx="4" class="dv-tank"/>
    <path d="M14 20c4-5 18-6 30-3l6 2c3 1 3 5 0 6l-8 1c-10 1-22 1-28-1z" class="dv-suit"/>
    <circle cx="50" cy="19" r="6" class="dv-head"/><rect x="51" y="15" width="7" height="5" rx="2" class="dv-mask"/>
    <path d="M14 21L3 16M14 25L2 28" class="dv-fin"/><path d="M5 13l-4 4 6 1zM4 26l-3 5 6-1z" class="dv-fins"/></g>
    <g class="dv-bub"><circle cx="58" cy="9" r="2"/><circle cx="61" cy="3" r="1.4"/></g></svg>`;
  let ropePath = null, ropeStops = [];
  function rope(map) {
    const svg = u.$(".rope", map); const mr = map.getBoundingClientRect();
    const pts = u.$$(".node", map).map(n => { const r = n.getBoundingClientRect(); return [r.left - mr.left + r.width / 2, r.top - mr.top + r.height / 2]; });
    if (!pts.length) return;
    svg.setAttribute("viewBox", `0 0 ${mr.width} ${mr.height}`);
    let d = `M${pts[0][0]} -14 L${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], my = (y0 + y1) / 2; d += ` C${x0} ${my} ${x1} ${my} ${x1} ${y1}`; }
    svg.innerHTML = `<path d="${d}"/><path class="rope-done" d="${d}"/>`;
    ropePath = u.$("path", svg);
    /* Longueur de corde à chaque nœud (pour faire descendre le plongeur). */
    const L = ropePath.getTotalLength(); ropeStops = [];
    let k = 0;
    for (let l = 0; l <= L && k < pts.length; l += 2) { const p = ropePath.getPointAtLength(l); if (Math.hypot(p.x - pts[k][0], p.y - pts[k][1]) < 3) { ropeStops.push(l); k++; } }
    while (ropeStops.length < pts.length) ropeStops.push(L);
  }
  /* Décors en parallaxe : falaises, algues, coraux. Tirage stable par monde. */
  /* Faune animée : bancs de poissons, méduses, tortue, bulles des thèmes en cours. */
  function fauna(map) {
    const box = u.$(".fauna", map); if (!box) return;
    const H = map.offsetHeight, r = u.seeded(u.seedOf(map.dataset.world + "fauna")), out = [];
    const fish = (y, s, d, dir, c) => `<svg class="fz fish ${dir}" viewBox="0 0 40 20" style="top:${y}px;width:${s}px;animation-duration:${d}s;animation-delay:${(-r() * d).toFixed(1)}s;color:${c}"><path d="M4 10c6-7 18-8 26 0-8 8-20 7-26 0z" fill="currentColor"/><path d="M30 10l8-6v12z" fill="currentColor"/><circle cx="10" cy="8.5" r="1.3" fill="#001"/></svg>`;
    const cols = ["var(--wc)", "var(--gold)", "var(--primary)", "var(--accent)"];
    for (let y = 80; y < H - 80; y += 160 + r() * 140) {
      const n = 1 + Math.floor(r() * 3), dir = r() < .5 ? "ltr" : "rtl", d = 18 + r() * 16, c = cols[Math.floor(r() * cols.length)];
      for (let k = 0; k < n; k++) out.push(fish(y + k * 14, 18 + r() * 14, d, dir, c));
    }
    for (let y = H * .45; y < H - 60; y += 380 + r() * 200) out.push(`<svg class="fz jelly" viewBox="0 0 30 40" style="top:${y}px;left:${8 + r() * 80}%;animation-delay:${(-r() * 6).toFixed(1)}s"><path d="M3 16a12 12 0 0 1 24 0z" fill="currentColor" opacity=".75"/><path d="M7 16c0 8-2 14 0 20M12 16c0 8 2 14 0 22M18 16c0 8-2 14 0 22M23 16c0 8 2 14 0 20" stroke="currentColor" fill="none" opacity=".6"/></svg>`);
    if (H > 900) out.push(`<svg class="fz turtle" viewBox="0 0 60 36" style="top:${H * .3}px;animation-delay:${(-r() * 30).toFixed(1)}s"><ellipse cx="30" cy="18" rx="16" ry="11" fill="currentColor"/><circle cx="50" cy="16" r="5" fill="currentColor"/><path d="M18 9l-10-7M18 27l-10 7M40 9l6-6M40 27l6 6" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M22 12l8 6 8-6M22 24l8-6 8 6" stroke="rgba(0,0,0,.25)" fill="none"/></svg>`);
    box.innerHTML = out.join("");
    u.$$(".node.cur", map).forEach(n => { if (!u.$(".bub", n)) n.insertAdjacentHTML("beforeend", `<span class="bub" aria-hidden="true"><i></i><i></i><i></i></span>`); });
  }
  function decor(map) {
    const H = map.offsetHeight, wid = map.dataset.world, r = u.seeded(u.seedOf(wid + "deco"));
    const cliff = (side, amp, step) => { let d = side ? `M100 0` : `M0 0`; for (let y = 0; y <= H; y += step) { const x = amp * (.4 + r() * .6); d += ` L${side ? 100 - x : x} ${y}`; } return d + (side ? ` L100 ${H}Z` : ` L0 ${H}Z`); };
    const kelp = (x, y, h) => `<path class="kelp" d="M${x} ${y} q${-3 + r() * 6} ${-h / 3} ${r() * 3} ${-h / 2} t${-2 + r() * 4} ${-h / 2}" style="animation-delay:${(-r() * 4).toFixed(2)}s"/>`;
    const coral = (x, y) => `<g class="coral" transform="translate(${x} ${y})"><path d="M0 0v-14M0 -6l-5 -6M0 -9l5 -5M-5 -12v-4M5 -14v-3"/></g>`;
    let far = `<svg viewBox="0 0 100 ${H}" preserveAspectRatio="none"><path class="cliff" d="${cliff(0, 9, 60)}"/><path class="cliff" d="${cliff(1, 9, 70)}"/></svg>`;
    let mid = `<svg viewBox="0 0 100 ${H}" preserveAspectRatio="none">`;
    for (let y = 120; y < H; y += 170 + r() * 120) { const left = r() < .5, x = left ? 2 + r() * 6 : 92 + r() * 6; mid += r() < .6 ? kelp(x, y, 50 + r() * 50) : coral(x, y); }
    mid += `</svg>`;
    u.$(".para.far", map).innerHTML = far; u.$(".para.mid", map).innerHTML = mid;
  }
  function pointAt(l) { const p = ropePath.getPointAtLength(l), q = ropePath.getPointAtLength(Math.max(0, l - 6)); return { x: p.x, y: p.y, a: Math.atan2(p.y - q.y, p.x - q.x) * 180 / Math.PI }; }
  function placeDiver(map, w, list, cur) {
    const dv = u.$("#diver", map); if (!dv || !ropePath) return;
    const target = cur >= 0 ? cur : list.length - 1, key = "aa-diver-" + w.id;
    let from = -1; try { const v = sessionStorage.getItem(key); from = v == null ? -1 : +v; } catch (e) {}
    try { sessionStorage.setItem(key, target); } catch (e) {}
    const stop = i => Math.max(0, (ropeStops[Math.min(i, ropeStops.length - 1)] || 0) - 52), l0 = from < 0 ? 0 : stop(from), l1 = stop(target);
    dv.hidden = false;
    /* Corde parcourue : surlignée jusqu'au plongeur. */
    const done = u.$(".rope-done", map), L = ropePath.getTotalLength();
    const put = l => { const p = pointAt(l), ang = Math.max(-40, Math.min(110, p.a)); dv.style.transform = `translate(${p.x - 32}px, ${p.y - 20}px) rotate(${(ang - 90) * .35}deg)`; if (done) { done.style.strokeDasharray = `${l} ${L}`; } };
    if (AA.a11y.reduced() || l0 === l1) { put(l1); return; }
    const t0 = performance.now(), dur = Math.min(2600, 700 + Math.abs(l1 - l0) * 1.2);
    put(l0);
    const step = t => { const k = Math.min(1, (t - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; put(l0 + (l1 - l0) * e); if (k < 1 && AA.router.name === "map") requestAnimationFrame(step); else dv.classList.add("idle"); };
    requestAnimationFrame(step);
  }
  /* Parallaxe et profondimètre liés au défilement. */
  function onScroll() {
    if (AA.router.name !== "map") return;
    const map = u.$(".map"); if (!map) return;
    const mr = map.getBoundingClientRect(), y = innerHeight * .5;
    u.$$(".para", map).forEach(p => { p.style.transform = `translate3d(0, ${(-mr.top * +p.dataset.k).toFixed(1)}px, 0)`; });
    const spots = u.$$(".spot", map); if (!spots.length) return;
    const cs = spots.map(s => { const r = s.getBoundingClientRect(); return { c: r.top + r.height / 2, d: +s.dataset.depth, l: s.dataset.label }; });
    let d = cs[0].d * (y < cs[0].c ? Math.max(0, 1 - (cs[0].c - y) / 400) : 1), lab = cs[0].l;
    for (let i = 0; i < cs.length - 1; i++) if (y >= cs[i].c && y < cs[i + 1].c) { const k = (y - cs[i].c) / (cs[i + 1].c - cs[i].c); d = cs[i].d + (cs[i + 1].d - cs[i].d) * k; lab = k < .5 ? cs[i].l : cs[i + 1].l; }
    if (y >= cs[cs.length - 1].c) { d = cs[cs.length - 1].d; lab = cs[cs.length - 1].l; }
    AA.scene.set(d);
    const chip = u.$("#depthchip b"); if (chip) chip.textContent = /\d/.test(lab) ? "−" + Math.round(d) + " m" : lab;
  }
  addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
  addEventListener("resize", u.debounce(() => { if (AA.router.name === "map") u.$$(".map").forEach(m => { rope(m); decor(m); const dv = u.$("#diver", m); if (dv) dv.hidden = true; }); }, 150));

  /* ---------- Cours ---------- */
  const TABS = ["essentiel", "approfondir", "memo", "moniteur"];
  AA.view("lesson", {
    tab: "map",
    depth: ([id]) => AA.scene.depthOf(C.byId[id]),
    guard: ([id]) => !!C.byId[id],
    fallback: "map",
    render(el, [id, tabArg]) {
      const m = C.byId[id], w = C.worldById[m.world], S = AA.S, list = C.inWorld(m.world), i = list.indexOf(m);
      /* En révision, le cours s'ouvre sur « À retenir » (cours allégé). */
      const tab = TABS.includes(tabArg) ? tabArg : AA.path.mode(m.world) === "review" && m.memo.length ? "memo" : "essentiel";
      const ok = G.unlocked(m), st = G.stars(m.id), read = S.read[m.id] || {}, note = S.notes[m.id] || { text: "", ok: "" };
      const deepQ = m.quiz.filter(q => q.lvl === 2).length, gens = G.genKeys(m.id).length;
      const acc = G.moduleAcc(m.id);
      let body = "";
      const tail = `${AA.sourcesHtml(m)}<div class="row lesson-tools">${AA.reportBtn(`data-rep="${tab}"`)}</div>`;
      if (tab === "essentiel") body = `${toc(m.essentiel)}${m.diagram && C.diagrams[m.diagram] ? C.diagrams[m.diagram]() : ""}<div class="prose">${m.essentiel}</div>${exampleCard(m)}${readBtn("e", read.e)}${tail}`;
      else if (tab === "approfondir") body = m.approfondir ? `<p class="callout"><span class="eyebrow">${t("lesson.deepIntro")}</span>${t("lesson.deepIntroS")}</p>${toc(m.approfondir)}<div class="prose">${m.approfondir}</div>${exampleCard(m)}${readBtn("a", read.a)}${tail}` : AA.ui.empty("layers", t("lesson.noDeepT"), t("lesson.noDeepS"));
      else if (tab === "memo") body = m.memo.length ? `<div class="memo">${m.memo.map(([a, b]) => `<div><b>${u.esc(a)}</b><span class="muted">${u.esc(b)}</span></div>`).join("")}</div>
          <p class="small muted" style="margin-top:var(--sp-4)">${t("lesson.memoHint")}</p><a class="btn ghost block" href="#/flash/${m.id}">${AA.icon("cards")} ${t("lesson.memoCards")}</a>` : AA.ui.empty("bulb", t("lesson.noMemoT"), "");
      else body = `<p class="muted">${t("lesson.coachIntro")}</p>
          ${m.moniteur.length ? `<div class="stack">${m.moniteur.map((q, k) => `<div class="coachq"><span>${u.esc(q)}</span><button class="btn ghost sm" data-addq="${k}">${AA.icon("plus")} ${t("lesson.add")}</button></div>`).join("")}</div>` : ""}
          <div class="field" style="margin-top:var(--sp-5)"><label for="note">${t("lesson.myNotes")}</label><textarea class="input" id="note" rows="6" placeholder="${t("lesson.notesPh")}">${u.esc(note.text)}</textarea><span class="xs muted" id="notesaved"></span></div>
          <label class="setting"><span class="grow"><b>${t("lesson.validated")}</b><span>${note.ok ? t("lesson.validatedOn", { d: note.ok }) : t("lesson.validatedS")}</span></span><span class="switch"><input type="checkbox" id="valid" ${note.ok ? "checked" : ""}><i></i></span></label>`;

      el.innerHTML = `
        <div class="pagehead"><a class="closebtn" href="#/map/${m.world}" aria-label="${t("nav.back")}">${AA.icon("back")}</a><span class="eyebrow grow">${u.esc(w.short)} · ${i + 1}/${list.length}</span>${AA.levelBadge(m.world, true)}${AA.stars(st)}</div>
        <header class="lesson-hero" style="--wc:var(${w.color})">
          <div class="row" style="gap:var(--sp-4);flex-wrap:nowrap"><span class="ic">${AA.icon(m.icon)}</span><div class="grow"><p class="eyebrow" style="color:var(--wc)">${u.esc(m.depth)}</p><h1 style="font-size:var(--fs-2xl)">${u.esc(m.title)}</h1><p class="muted" style="margin:4px 0 0">${u.esc(m.sub)}</p></div></div>
          <div class="row" style="margin-top:var(--sp-4)">
            <span class="chip ${read.e ? "ok" : ""}">${AA.icon("book")} ${read.e ? t("lesson.readOk") : t("lesson.toRead")}</span>
            <span class="chip">${AA.icon("timer")} ${t("lesson.readTime", { n: readMin(m) })}</span>
            ${acc != null ? `<span class="chip">${AA.icon("target")} ${Math.round(acc * 100)} %</span>` : ""}
            ${note.ok ? `<span class="chip gold">${AA.icon("check")} ${t("lesson.coachOk")}</span>` : ""}
            ${G.isStale(m.id) ? `<span class="chip warn">${AA.icon("refresh")} ${t("map.stale")}</span>` : ""}
            <span class="grow"></span>${tab !== "moniteur" ? AA.a11y.button(".lesson-body", t("a11y.listenLesson")) : ""}
          </div>
        </header>
        ${!ok ? `<div class="callout trap"><span class="eyebrow">${t("map.locked")}</span>${u.esc(G.lockReason(m))} ${t("lesson.lockedRead")}</div>` : ""}
        <div class="lesson-layout"><div class="lesson-main">
        <div class="seg lesson-tabs" role="tablist" style="margin-top:var(--sp-4)">${TABS.map(k => `<button role="tab" data-tab="${k}" aria-pressed="${k === tab}" aria-selected="${k === tab}">${t("lesson.tab." + k)}</button>`).join("")}</div>
        <article class="card lesson-body" style="margin-top:var(--sp-3)">${body}</article>
        <div class="row between lesson-nav">${i > 0 ? `<a class="btn ghost sm" href="#/lesson/${list[i - 1].id}">${AA.icon("back")} ${u.esc(list[i - 1].title)}</a>` : "<span></span>"}${i < list.length - 1 ? `<a class="btn ghost sm" href="#/lesson/${list[i + 1].id}">${u.esc(list[i + 1].title)} ${AA.icon("next")}</a>` : ""}</div>
        </div><aside class="lesson-side">
        <section class="card side-card desk-only"><p class="eyebrow">${u.esc(w.short)} · ${t("lesson.inWorld")}</p>
          ${list.map((x, k) => `<a class="ml-row ${x.id === m.id ? "cur" : ""} ${G.unlocked(x) ? "" : "lock"}" href="#/lesson/${x.id}"><span class="ml-ic">${AA.icon(G.unlocked(x) ? x.icon : "lock")}</span><span class="grow"><b>${u.esc(x.title)}</b></span>${AA.stars(G.stars(x.id))}</a>`).join("")}</section>
        ${m.memo.length && tab !== "memo" ? `<section class="card side-card desk-only"><p class="eyebrow">${t("lesson.tab.memo")}</p><div class="memo mini">${m.memo.slice(0, 5).map(([a, b]) => `<div><b>${u.esc(a)}</b><span class="small muted">${u.esc(b)}</span></div>`).join("")}</div></section>` : ""}
        <div class="sticky-cta"><div class="card glass">
          <button class="btn grow" id="dive" ${ok ? "" : "disabled"}>${AA.icon("play")} ${tab === "approfondir" && deepQ ? t("lesson.diveDeep", { n: deepQ }) : t("lesson.dive", { n: Math.min(10, m.quiz.length) })}</button>
          ${gens ? `<button class="btn gold sm" id="calc" ${ok ? "" : "disabled"} aria-label="${t("lesson.calcs")}">${AA.icon("calc")}</button>` : ""}
        </div></div></aside></div>`;
      u.$$("[data-diagram]", el).forEach(f => { const d = C.diagrams[f.dataset.diagram]; if (d) f.outerHTML = d(); });
      u.$$(".prose", el).forEach(p => AA.gloss.link(p));
      enhance(el, m);
      if (AA.ctx.hl) { const first = AA.search.mark(u.$(".lesson-body", el), AA.ctx.hl); AA.ctx.hl = null; if (first) setTimeout(() => first.scrollIntoView({ block: "center", behavior: AA.a11y.reduced() ? "auto" : "smooth" }), 120); }
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
