/* =====================================================================
   Abysse Academy 2.2 · onglet Carte, jeux, gardiens et boss final
   - Onglet « Carte » à part ; aller-retour Carte ↔ Cours (le bouton retour
     d'un cours ramène là d'où l'on vient).
   - Gardiens : un mini-boss par cours lu (4 PV, 3 vies). Boss final par
     niveau (tous les cours lus) : intro cinématique, 3 phases, attaques,
     coups critiques, explosion finale.
   - Mini-jeux : Paires (mot ↔ définition) et Vrai ou faux express.
   Tout ne porte que sur les cours lus ; chaque réponse de combat passe par
   G.record (notions, révisions espacées) et le barème XP 2.0.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, Q = AA.quiz, ui = AA.ui, fx = AA.fx, T = AA.tutor, V = AA.views;
  const S = () => AA.S, esc = u.esc;
  const GM = (AA.games = {});
  const reduced = () => AA.a11y && AA.a11y.reduced && AA.a11y.reduced();
  const store = () => { const s = S(); s.minis = s.minis || {}; s.boss = s.boss || {}; s.games = s.games || {}; return s; };
  const hash = str => { let h = 7; for (const ch of String(str)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };

  /* ---------- Onglet Carte et allers-retours ---------- */
  ui.TABS = [["home", "home"], ["cours", "book"], ["map", "map"], ["train", "train"], ["progres", "chart"], ["profile", "user"]];
  ["map", "boss", "gardien"].forEach(n => { if (V[n]) V[n].tab = "map"; });
  ["jeux", "paires", "vraifaux"].forEach(n => { if (V[n]) V[n].tab = "train"; });
  GM.from = "cours";
  const wrap = (name, fn) => { const v = V[name]; if (!v) return; const r = v.render; v.render = (el, args) => { r(el, args); try { fn(el, args || []); } catch (e) { console.error(e); } }; };

  /* ---------- Gardiens et boss : définitions ---------- */
  GM.mini = mid => {
    const m = C.byId[mid]; if (!m) return null;
    const L = (C.companions || []).filter(x => x.shape !== "sponge"), f = L.length ? L[(C.modules.indexOf(m) * 7) % L.length] : { shape: "fish", c: null, n: ["Gardien", "Gardien", "Gardien"] };
    return { kind: "mini", id: mid, mid, wid: m.world, name: f.n[2] || f.n[1], title: t("gm.guardOf", { t: m.title }), shape: f.shape, colors: f.c, glow: (f.L || f.c || [])[1], hp: 4, lives: 3, intro: t("gm.introMini"), back: "map/" + m.world };
  };
  GM.final = wid => {
    const w = C.worldById[wid]; if (!w || !w.boss || w.soon) return null; const b = w.boss;
    return { kind: "boss", id: wid, wid, name: b.name, title: w.title, depth: b.depth, shape: b.creature, colors: ["#2B1A3D", "#E94F6A", "#7A2BD1"], glow: "#FF4D6D", hp: Math.max(8, Math.min(14, b.hp || 10)), lives: 5, intro: b.intro, win: b.win, back: "map/" + wid };
  };
  GM.miniWon = mid => !!((store().minis[mid] || {}).won);
  GM.bossWon = wid => !!((store().boss[wid] || {}).won);
  GM.toRead = wid => C.inWorld(wid).filter(m => !T.isRead(m.id));
  G.bossOpen = wid => GM.toRead(wid).length === 0 || (AA.path && AA.path.mode(wid) === "review");

  /* Questions : cours lus seulement ; lacunes, erreurs et questions jamais vues d'abord. */
  const qsOf = mods => mods.flatMap(m => m.quiz.filter(q => q.lvl !== 2 && q.c && q.c.length > 1));
  const pickQs = (pool, n) => {
    const s = S(), gapN = new Set(T.gaps().map(g => g.id));
    const pr = q => (gapN.has(T.notionOf(q)) ? 0 : s.errors[q.id] ? 1 : s.seen[q.id] === undefined ? 2 : 3) + Math.random() * 1.5 + (AA.quiz.recentPen ? AA.quiz.recentPen(q) * 3 : 0);
    const sorted = pool.slice().sort((a, b) => pr(a) - pr(b)); const out = [];
    /* 2.7.1 : sans remise (avant, un petit thème faisait revenir les mêmes questions). */
    const seen = new Set();
    sorted.forEach(q => { const k = AA.quiz.key(q); if (out.length < n && !seen.has(k)) { seen.add(k); out.push(q); } });
    return u.shuffle(out);
  };

  /* ---------- Combat ---------- */
  let B = null;
  const clearT = () => { if (B && B.timers) { B.timers.forEach(clearTimeout); B.timers = []; } };
  const later = (fn, ms) => { const id = setTimeout(fn, reduced() ? Math.min(ms, 200) : ms); if (B) B.timers.push(id); return id; };
  GM.begin = def => {
    const mods = def.kind === "mini" ? [C.byId[def.mid]] : C.inWorld(def.wid).filter(m => T.isRead(m.id));
    /* 2.9.1 : le gardien d’un thème puise aussi dans les questions d’approfondissement (moins de répétitions). */
    let pool = def.kind === "mini" ? mods.flatMap(m => m.quiz.filter(q => q.c && q.c.length > 1)) : qsOf(mods); if (!pool.length) return T.needAny(def.wid);
    /* Gardien d'un petit thème : on complète avec les autres thèmes lus du niveau, sans répéter. */
    const need = def.hp + def.lives + 3;
    if (new Set(pool.map(AA.quiz.key)).size < need && def.kind === "mini") { const more = qsOf(C.inWorld(def.wid).filter(m => m.id !== def.mid && T.isRead(m.id))); pool = pool.concat(u.shuffle(more).slice(0, need * 2)); }
    clearT();
    B = { def, qs: pickQs(pool, def.hp + def.lives + 3), i: 0, hp: def.hp, lives: def.lives, combo: 0, phase: 1, answers: [], picked: null, done: false, won: false, xp: 0, timers: [], fresh: true };
    B.order = B.qs.map(q => u.shuffle(q.c.map((_, k) => k)));
    AA.router.refresh();
  };
  const arena = def => {
    const sh = def.shape, cr = AA.creature(sh, def.colors, "bt-cr");
    const bub = Array.from({ length: 14 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--d:${4 + (i * 7) % 6}s;--s:${4 + (i * 5) % 9}px;--l:${(i * 13) % 5}s"></i>`).join("");
    return `<div class="bt-arena k-${def.kind} ph1" id="btA" style="--glow:${def.glow || "#5CE1E6"}">
      <div class="bt-bg" aria-hidden="true"><div class="bt-rays"></div><div class="bt-bub">${bub}</div><div class="bt-floor"></div></div>
      <div class="bt-hud"><div class="grow"><div class="row between"><b class="bt-name">${esc(def.name)}</b><span class="bt-pv mono" id="btPv"></span></div><div class="bt-hp" id="btHp">${Array.from({ length: def.hp }, () => "<i></i>").join("")}</div></div><span class="chip xs bt-ph" id="btPh" ${def.kind === "boss" ? "" : "hidden"}>Phase 1</span></div>
      <div class="bt-boss" id="btBoss"><div class="bt-aura"></div><div class="bt-flip">${cr}</div>${def.kind === "boss" ? `<div class="bt-embers">${"<i></i>".repeat(8)}</div>` : ""}</div>
      <div class="bt-me" id="btMe">${AA.avatar.mine("bt-ava")}<div class="bt-lives" id="btLives" aria-label="${t("gm.lives")}"></div></div>
      <div class="bt-combo" id="btCombo" hidden></div>
      <div class="bt-flash" id="btFlash"></div></div>`;
  };
  const hud = () => {
    const A = u.$("#btA"); if (!A || !B) return;
    u.$$("#btHp i", A).forEach((x, k) => x.classList.toggle("off", k >= B.hp));
    u.$("#btPv", A).textContent = `${B.hp} / ${B.def.hp} ${t("gm.pv")}`;
    u.$("#btLives", A).innerHTML = Array.from({ length: B.def.lives }, (_, k) => `<span class="${k < B.lives ? "" : "off"}">${AA.icon("heart")}</span>`).join("");
    const cb = u.$("#btCombo", A); cb.hidden = B.combo < 2; cb.textContent = t("gm.combo", { n: B.combo });
    A.classList.toggle("ph2", B.phase === 2); A.classList.toggle("ph3", B.phase === 3);
    const ph = u.$("#btPh", A); if (ph) ph.textContent = "Phase " + B.phase;
  };
  const qPanel = () => {
    const q = B.qs[B.i], ord = B.order[B.i];
    return `<div class="bt-q" id="btQ"><p class="xs muted bt-qn">${C.byId[q.m] ? esc(C.byId[q.m].title) : ""} · ${B.i + 1}</p><h2 class="bt-qt">${esc(q.q)}</h2>
      <div class="bt-ch">${ord.map((ci, k) => `<button class="choice bt-c" data-ci="${ci}"><span class="kbd">${k + 1}</span><span class="grow">${esc(q.c[ci])}</span></button>`).join("")}</div><button class="btn ghost sm bt-dk" id="btDk">${AA.icon("doubt")} ${t("quiz.dk")}</button><div id="btFb" aria-live="polite"></div></div>`;
  };
  const center = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  const spawn = (A, cls, html, x, y, extra) => { const ar = A.getBoundingClientRect(), d = document.createElement("div"); d.className = cls; d.innerHTML = html || ""; d.style.left = (x - ar.left) + "px"; d.style.top = (y - ar.top) + "px"; Object.entries(extra || {}).forEach(([k, v]) => d.style.setProperty(k, v)); A.appendChild(d); setTimeout(() => d.remove(), 1600); return d; };
  const shake = (el, cls = "shake") => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 600); };

  function answer(ci, btn) {
    if (!B || B.picked != null || B.done) return;
    const q = B.qs[B.i], ok = ci === q.a; B.picked = ci;
    const prev = G.qPrev(q); G.record(q, ok, false, ci < 0 ? null : ci);
    if (!String(q.id).startsWith("tab-")) { if (ok) delete S().errors[q.id]; else S().errors[q.id] = (S().errors[q.id] || 0) + 1; }
    B.answers.push({ q, ok, picked: ci });
    const dkb = u.$("#btDk"); if (dkb) dkb.remove();
    u.$$(".bt-c").forEach(b => { b.disabled = true; const c = +b.dataset.ci; if (c === q.a) b.classList.add("good"); else if (c === ci) b.classList.add("bad"); });
    const A = u.$("#btA"), boss = u.$("#btBoss"), me = u.$("#btMe"), fb = u.$("#btFb");
    if (ok) {
      B.combo++; const crit = B.combo >= 3 && B.combo % 3 === 0, dmg = Math.min(B.hp, crit ? 2 : 1);
      const xp = G.answerXp(q, prev, { mode: "boss", combo: B.combo }); B.xp += xp; G.addXp(xp, btn);
      fx.sfx.ok(); fx.buzz(15);
      if (A && boss && me) {
        const [x0, y0] = center(me), [x1, y1] = center(boss);
        spawn(A, "bt-shot" + (crit ? " crit" : ""), "<i></i><i></i><i></i>", x0, y0, { "--dx": (x1 - x0) + "px", "--dy": (y1 - y0) + "px" });
        later(() => { shake(boss, "hit"); spawn(A, "bt-dmg" + (crit ? " crit" : ""), crit ? `−${dmg} · ${t("gm.crit")}` : `−${dmg}`, x1, y1 - 30); fx.burst(x1, y1, crit ? 34 : 16, crit ? "rgba(255,210,90,.95)" : "rgba(120,240,255,.9)"); if (crit) shake(A); B.pend = 0; B.hp -= dmg; checkPhase(); hud(); if (B.hp <= 0) win(); }, 420); B.pend = dmg;
      } else { B.hp -= dmg; if (B.hp <= 0) win(); }
      fb.innerHTML = `<p class="callout ok bt-fb"><b>${t(crit ? "gm.crit" : "gm.hit")}</b>${q.e ? `<span class="small">${esc(q.e)}</span>` : ""}</p>`;
    } else {
      B.combo = 0; B.lives--; fx.sfx.bad(); fx.buzz([40, 40, 60]);
      if (A && boss && me) {
        boss.classList.add("lunge"); setTimeout(() => boss.classList.remove("lunge"), 700);
        const [x0, y0] = center(boss), [x1, y1] = center(me);
        later(() => { spawn(A, "bt-wave", "", x0, y0, { "--dx": (x1 - x0) + "px", "--dy": (y1 - y0) + "px" }); }, 180);
        later(() => { shake(A); shake(me, "hurt"); const fl = u.$("#btFlash"); if (fl) shake(fl, "red"); hud(); if (B.lives <= 0) lose(); }, 560);
      } else if (B.lives <= 0) lose();
      fb.innerHTML = `<p class="callout warn bt-fb"><b>${t(ci < 0 ? "gm.dk" : "gm.miss")}</b> <span>${t("gm.answerWas", { a: esc(q.c[q.a]) })}</span>${q.e ? `<span class="small">${esc(q.e)}</span>` : ""}</p>`;
    }
    hud();
    if (!B.done) {
      fb.insertAdjacentHTML("beforeend", `<button class="btn block" id="btNext">${t("gm.next")} ${AA.icon("next")}</button>`);
      const nb = u.$("#btNext"); nb.onclick = next; nb.focus({ preventScroll: true });
      /* Sur téléphone, on montre l'explication et « Suivant » une fois l'attaque jouée. */
      if (innerWidth < 1100) later(() => { if (nb.isConnected) nb.scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" }); }, 750);
      if (ok) later(() => { if (B && B.picked != null && !B.done && u.$("#btNext")) next(); }, 2600);
    }
    AA.store.save();
  }
  function next() {
    if (!B || B.done) return; clearT();
    /* 2.10 : « Suivant » pressé avant l’impact, le coup compte quand même. */
    if (B.pend) { B.hp -= B.pend; B.pend = 0; checkPhase(); hud(); }
    if (B.hp <= 0) return win();
    if (B.lives <= 0) return lose();
    B.i++; B.picked = null;
    if (B.i >= B.qs.length) return end(false, true);
    const box = u.$("#btQbox"); if (!box) return AA.router.refresh();
    box.innerHTML = qPanel(); bindQ(); box.scrollIntoView && innerWidth < 1100 && u.$("#btA") && window.scrollTo({ top: Math.max(0, u.$("#btA").offsetTop - 60), behavior: reduced() ? "auto" : "smooth" });
  }
  function checkPhase() {
    if (B.def.kind !== "boss") return;
    const k = B.hp / B.def.hp, ph = k <= 1 / 3 ? 3 : k <= 2 / 3 ? 2 : 1;
    if (ph > B.phase && B.hp > 0) {
      B.phase = ph; const A = u.$("#btA"); if (!A) return;
      const bn = document.createElement("div"); bn.className = "bt-banner"; bn.innerHTML = `<b>${t(ph === 2 ? "gm.phase2" : "gm.phase3")}</b>`; A.appendChild(bn); setTimeout(() => bn.remove(), 2200);
      shake(A); fx.sfx.alarm(); fx.buzz([60, 40, 60]);
    }
  }
  function win() { if (B.done) return; later(() => end(true), 50); const boss = u.$("#btBoss"); if (boss) boss.classList.add("ko"); }
  function lose() { if (B.done) return; const me = u.$("#btMe"); if (me) me.classList.add("ko"); const boss = u.$("#btBoss"); if (boss) boss.classList.add("laugh"); later(() => end(false), 50); }
  function end(won, fled) {
    if (!B || B.done) return; B.done = true; B.won = won; B.fled = !!fled; clearT();
    const s = store(), d = B.def, good = B.answers.filter(a => a.ok).length, pct = Math.round(good / Math.max(1, B.answers.length) * 100);
    const rec = (d.kind === "mini" ? s.minis : s.boss)[d.id] || { best: 0, tries: 0, won: "" };
    rec.tries = (rec.tries || 0) + 1; rec.best = Math.max(rec.best || 0, won ? pct : 0);
    let bonus = 0;
    if (won) { const first = !rec.won; if (first) rec.won = u.today(); bonus = first ? (d.kind === "mini" ? 40 : 200) : rec.day !== u.today() ? (d.kind === "mini" ? 10 : 40) : 0; rec.day = u.today(); }
    (d.kind === "mini" ? s.minis : s.boss)[d.id] = rec; B.bonus = bonus;
    if (bonus) { B.xp += bonus; G.addXp(bonus); }
    AA.store.save(true); G.checkBadges();
    const A = u.$("#btA");
    if (won && A && !reduced()) {
      const boss = u.$("#btBoss"); if (boss) { const [x, y] = center(boss); fx.burst(x, y, 60, "rgba(255,215,120,.95)"); setTimeout(() => fx.burst(x, y, 40, "rgba(120,240,255,.9)"), 250); }
      const fl = u.$("#btFlash"); if (fl) shake(fl, "white");
      fx.sfx.up(); setTimeout(() => fx.sfx.badge(), 500);
      setTimeout(() => { if (u.$("#btA")) AA.router.refresh(); }, 1500);
    } else { if (!won) fx.sfx.bad(); setTimeout(() => { if (u.$("#btA")) AA.router.refresh(); }, A && !reduced() ? 1100 : 0); }
  }
  function bindQ() {
    u.$$(".bt-c").forEach(b => b.onclick = () => answer(+b.dataset.ci, b));
    const dk = u.$("#btDk"); if (dk) dk.onclick = () => answer(-1, dk);
  }
  document.addEventListener("keydown", e => {
    if (!B || B.done || !u.$("#btA") || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || u.$(".sheet-wrap")) return;
    if (/^[1-4]$/.test(e.key) && B.picked == null) { const b = u.$$(".bt-c")[+e.key - 1]; if (b) { e.preventDefault(); answer(+b.dataset.ci, b); } }
    else if (e.key === "Enter" && B.picked != null && u.$("#btNext") && document.activeElement !== u.$("#btNext")) { e.preventDefault(); next(); }
  });

  const introHtml = def => {
    const s = store(), rec = (def.kind === "mini" ? s.minis : s.boss)[def.id], mods = def.kind === "mini" ? [C.byId[def.mid]] : C.inWorld(def.wid);
    const locked = def.kind === "mini" ? !T.isRead(def.mid) : !G.bossOpen(def.wid), left = def.kind === "boss" ? GM.toRead(def.wid) : [];
    return `<div class="bt-intro k-${def.kind}" style="--glow:${def.glow || "#5CE1E6"}">
      <div class="bt-stage"><div class="bt-bg" aria-hidden="true"><div class="bt-rays"></div><div class="bt-floor"></div></div>
        <div class="bt-rise"><div class="bt-aura"></div><div class="bt-flip">${AA.creature(def.shape, def.colors, "bt-cr")}</div>${def.kind === "boss" ? `<div class="bt-embers">${"<i></i>".repeat(8)}</div>` : ""}</div>
        <p class="bt-slam">${def.kind === "boss" ? t("gm.introBoss") : esc(def.intro)}</p></div>
      <div class="bt-card card"><p class="eyebrow">${def.kind === "boss" ? esc(def.title) + (def.depth ? " · " + esc(def.depth) : "") : esc(def.title)}</p><h1 class="bt-h">${esc(def.name)}</h1>
        ${def.kind === "boss" ? `<p class="muted">${esc(def.intro)}</p>` : ""}
        <p class="small">${t("gm.rules", { hp: def.hp, l: def.lives })}</p>
        ${rec && rec.won ? `<p class="chip gold">${AA.icon("trophy")} ${t("gm.guardWon")} · ${t("gm.best", { p: rec.best })}</p>` : ""}
        ${locked ? `<p class="callout warn">${def.kind === "mini" ? t("gm.toRead") : t("gm.lockFinal", { n: left.length })}</p><a class="btn block" href="#/lesson/${(def.kind === "mini" ? C.byId[def.mid] : left[0] || mods[0]).id}">${AA.icon("book")} ${t("tu.needBtn", { t: esc((def.kind === "mini" ? C.byId[def.mid] : left[0] || mods[0]).title) })}</a>`
          : `<button class="btn block bt-go" id="btGo">${AA.icon("swords")} ${rec && rec.won ? t("gm.refight") : t("gm.go")}</button>`}
        <a class="btn ghost block" href="#/${def.back}">${t("gm.flee")}</a></div></div>`;
  };
  const resultHtml = () => {
    const d = B.def, good = B.answers.filter(a => a.ok).length, pct = Math.round(good / Math.max(1, B.answers.length) * 100);
    const wrong = B.answers.filter(a => !a.ok), gaps = [...new Set(wrong.map(a => T.notionOf(a.q)).filter(n => n && T.isGap(n)))];
    return `<section class="card bt-res ${B.won ? "won" : "lost"}" style="--glow:${d.glow || "#5CE1E6"}">
      <div class="bt-res-art ${B.won ? "calm" : ""}">${B.won ? `<div class="bt-crown">${AA.icon("trophy")}</div>` : ""}<div class="bt-flip">${AA.creature(d.shape, d.colors, "bt-cr")}</div></div>
      <p class="eyebrow">${esc(d.name)}</p><h1>${B.won ? t("gm.wonT") : B.fled ? t("gm.fledT") : t("gm.lostT")}</h1>
      <p class="muted">${B.won ? (d.kind === "mini" ? t("gm.wonMini", { t: esc(C.byId[d.mid].title) }) : esc(d.win || "")) : B.fled ? t("gm.fledS", { n: B.hp }) : t("gm.lostS")}</p>
      <div class="row center bt-stats"><span class="chip">${t("gm.accuracy", { p: pct })}</span><span class="chip gold">+${B.xp} XP</span>${B.bonus ? `<span class="chip ok">${t("gm.xpWon", { n: B.bonus })}</span>` : ""}</div>
      <div class="stack"><button class="btn block" id="btAgain">${AA.icon("refresh")} ${t("gm.again")}</button>
      ${gaps[0] ? `<button class="btn ghost block" data-tufix="${gaps[0]}">${AA.icon("buoy")} ${t("gm.fixGap")}</button>` : ""}
      <a class="btn ghost block" href="#/${d.back}">${AA.icon("map")} ${t("gm.backMap")}</a><a class="btn ghost block" href="#/jeux/${d.wid}">${AA.icon("swords")} ${t("gm.backHub")}</a></div></section>
      ${wrong.length ? `<div class="section-title"><h3>${t("gm.review")}</h3></div><div class="review gm-rv">${wrong.map(a => `<div class="rv"><b>${esc(a.q.q)}</b><span class="small">${AA.icon("check")} ${esc(a.q.c[a.q.a])}</span>${a.q.e ? `<span class="xs muted">${esc(a.q.e)}</span>` : ""}<a class="small" href="#/lesson/${a.q.m}">${esc(C.byId[a.q.m].title)}</a></div>`).join("")}</div>` : ""}`;
  };
  function renderBattle(el, def) {
    if (!def) { el.innerHTML = ui.empty("swords", t("search.none"), ""); return; }
    if (B && B.def.id === def.id && B.def.kind === def.kind) {
      B.paused = false;
      if (B.done) { el.innerHTML = `<div class="bt-wrap">${resultHtml()}</div>`; u.$("#btAgain", el).onclick = () => { fx.sfx.tap(); GM.begin(def); }; return; }
      el.innerHTML = `<div class="bt-wrap fight">${arena(def)}<div class="bt-qbox" id="btQbox">${qPanel()}</div></div>`;
      hud(); bindQ();
      if (B.picked != null) { const q = B.qs[B.i]; B.picked = null; /* rechargement : on reprend à la question suivante */ B.i++; if (B.i >= B.qs.length) return end(false, true); u.$("#btQbox").innerHTML = qPanel(); bindQ(); }
      if (B.fresh) { B.fresh = false; const A = u.$("#btA", el); if (A && !reduced()) { A.classList.add("enter"); setTimeout(() => A.classList.remove("enter"), 1400); } if (def.kind === "boss") { fx.sfx.alarm(); fx.buzz([80, 60, 80]); } }
      return;
    }
    el.innerHTML = `<div class="bt-wrap">${introHtml(def)}</div>`;
    if (def.kind === "boss" && !reduced()) { fx.buzz([40, 30, 40]); }
    const go = u.$("#btGo", el); if (go) { go.onclick = () => { fx.sfx.up(); GM.begin(def); }; if (matchMedia("(pointer:fine)").matches) go.focus({ preventScroll: true }); }
  }
  AA.view("gardien", { tab: "map", depth: 20, render(el, [mid]) { GM.from = GM.from || "map"; renderBattle(el, GM.mini(mid)); } });
  AA.view("boss", { tab: "map", depth: 45, render(el, [wid]) { renderBattle(el, GM.final(wid || G.goalWorld())); } });
  addEventListener("hashchange", () => { if (B && !/^#\/(gardien|boss)\//.test(location.hash)) { clearT(); if (!B.done && !B.paused) B = null; } });
  /* 2.6.2 : combat en cours (pour la garde de session et la reprise). */
  GM.battle = () => (B && !B.done ? { def: B.def, i: B.i, n: B.qs.length, hp: B.hp, lives: B.lives, paused: !!B.paused, started: B.answers.length > 0 || !B.fresh } : null);
  GM.qs = () => (B ? B.qs.slice() : []);
  GM.pause = () => { if (B && !B.done) B.paused = true; };
  GM.drop = () => { clearT(); B = null; };
  GM.pairsLive = () => !!(P && !P.done && P.moves > 0);
  GM.vfLive = () => !!(VF && VF.phase === "play" && VF.timer);
  GM.vfDrop = () => { if (VF && VF.timer) clearInterval(VF.timer); VF = null; };

  /* ---------- Paires ---------- */
  const shortTxt = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1).replace(/[\s,;:.]+\S*$/, "") + "…" : s; };
  const pairPool = () => {
    const read = new Set(C.modules.filter(m => T.isRead(m.id)).map(m => m.id)), out = [], seen = new Set();
    C.glossary.forEach(g => { if (g.m && read.has(g.m) && !seen.has(g.t.toLowerCase())) { seen.add(g.t.toLowerCase()); out.push({ a: g.t, b: shortTxt(g.d, 90), m: g.m }); } });
    C.modules.forEach(m => { if (read.has(m.id)) (m.memo || []).forEach(([a, b]) => { if (a.length <= 34 && !seen.has(a.toLowerCase()) && b) { seen.add(a.toLowerCase()); out.push({ a, b: shortTxt(b, 90), m: m.id }); } }); });
    return out;
  };
  let P = null;
  GM.paires = () => {
    const pool = pairPool(); if (pool.length < 4) return null;
    const pairs = u.shuffle(pool).slice(0, 6), cards = u.shuffle(pairs.flatMap((p, i) => [{ i, side: "a", txt: p.a }, { i, side: "b", txt: p.b }]));
    P = { pairs, cards, open: [], found: new Set(), moves: 0, miss: 0, t0: 0, done: false, lock: false };
    return P;
  };
  AA.view("paires", {
    tab: "train", depth: 6,
    render(el) {
      if (!P || P.done && P.shown) { if (!GM.paires()) { el.innerHTML = `${ui.head(t("gm.paires"), "jeux")}${ui.empty("cards", t("gm.paires"), t("gm.needRead"))}`; return; } }
      const s = store(), best = (s.games.paires || {}).best;
      const draw = () => {
        if (!/^#\/paires/.test(location.hash)) return;
        if (P.done) {
          P.shown = true; const sec = Math.round((P.t1 - P.t0) / 1000), g = s.games.paires = s.games.paires || { n: 0 };
          if (!P.saved) { P.saved = true; g.n = (g.n || 0) + 1; g.best = g.best ? Math.min(g.best, P.moves) : P.moves; const dd = g.d === u.today() ? (g.dn || 0) : 0; P.xp = dd < 3 ? 15 + (P.miss === 0 ? 10 : 0) : 0; g.d = u.today(); g.dn = dd + 1; if (P.xp) G.addXp(P.xp); AA.store.save(true); G.checkBadges(); }
          el.innerHTML = `${ui.head(t("gm.paires"), "jeux")}<section class="card center gm-end"><div class="medal" style="margin:0 auto">${AA.icon("cards")}</div><h2>${t("gm.p.done")}</h2>
            <p class="muted">${t("gm.p.moves", { n: P.moves })} · ${t("gm.p.time", { s: sec })}${P.miss === 0 ? " · " + t("gm.p.perfect") : ""}</p><p>${P.xp ? `<span class="chip gold">${t("gm.p.xp", { n: P.xp })}</span>` : `<span class="xs muted">${t("gm.p.noXp")}</span>`}</p>
            <div class="stack"><button class="btn block" id="pAgain">${AA.icon("refresh")} ${t("gm.again")}</button><a class="btn ghost block" href="#/jeux">${t("gm.backHub")}</a></div></section>
            <div class="section-title"><h3>${t("gm.review")}</h3></div><div class="review gm-rv">${P.pairs.map(p => `<div class="rv"><b>${esc(p.a)}</b><span class="small">${esc(p.b)}</span><a class="small" href="#/lesson/${p.m}">${esc(C.byId[p.m].title)}</a></div>`).join("")}</div>`;
          u.$("#pAgain", el).onclick = () => { fx.sfx.tap(); GM.paires(); AA.router.refresh(); };
          return;
        }
        el.innerHTML = `${ui.head(t("gm.paires"), "jeux", `<span class="chip">${t("gm.p.moves", { n: P.moves })}</span>`)}<p class="muted">${t("gm.pairesS")}${best ? " · " + t("gm.bestScore", { n: t("gm.p.moves", { n: best }) }) : ""}</p>
          <div class="pg-grid">${P.cards.map((c, k) => { const up = P.found.has(c.i) || P.open.includes(k); return `<button class="pg-card ${up ? "up" : ""} ${P.found.has(c.i) ? "ok" : ""} side-${c.side}" data-k="${k}" aria-label="${up ? esc(c.txt) : t("gm.paires") + " " + (k + 1)}" ${P.found.has(c.i) ? "disabled" : ""}><span class="pg-in"><span class="pg-back">${AA.icon("wave")}</span><span class="pg-front"><small>${t(c.side === "a" ? "gm.p.term" : "gm.p.def")}</small>${esc(c.txt)}</span></span></button>`; }).join("")}</div>`;
        u.$$(".pg-card", el).forEach(b => b.onclick = () => flip(+b.dataset.k, b));
      };
      const flip = (k, b) => {
        if (P.lock || P.open.includes(k) || P.found.has(P.cards[k].i)) return;
        if (!P.t0) P.t0 = Date.now();
        fx.sfx.flip(); P.open.push(k); b.classList.add("up");
        if (P.open.length < 2) return;
        P.moves++; const [a, c] = P.open.map(x => P.cards[x]);
        if (a.i === c.i && a.side !== c.side) {
          P.found.add(a.i); P.open = []; fx.sfx.ok(); fx.burstAt(b, 16, "rgba(61,220,151,.85)");
          if (P.found.size === P.pairs.length) { P.done = true; P.t1 = Date.now(); setTimeout(() => { fx.sfx.up(); draw(); }, 500); } else setTimeout(draw, 350);
        } else {
          P.miss++; P.lock = true; fx.sfx.bad(); u.$$(".pg-card.up:not(.ok)", el).forEach(x => shake(x));
          setTimeout(() => { P.open = []; P.lock = false; draw(); }, 950);
        }
      };
      draw();
    }
  });

  /* ---------- Vrai ou faux express ---------- */
  let VF = null;
  const vfItem = pool => {
    const q = u.pick(pool), truth = Math.random() < .5, wrong = q.c.map((_, k) => k).filter(k => k !== q.a);
    return { q, truth, ci: truth ? q.a : u.pick(wrong) };
  };
  AA.view("vraifaux", {
    tab: "train", depth: 8,
    render(el) {
      const pool = qsOf(C.modules.filter(m => T.isRead(m.id))).filter(q => q.c.length >= 2 && !/laquelle|lequel|lesquel|quelle affirmation|toutes|aucune|faux \?|n’est pas|n'est pas/i.test(q.q) && !q.c.some(c => /toutes|aucune|les deux/i.test(c)));
      if (pool.length < 5) { el.innerHTML = `${ui.head(t("gm.vf"), "jeux")}${ui.empty("bolt", t("gm.vf"), t("gm.needRead"))}`; return; }
      const s = store(), g = s.games.vf = s.games.vf || {};
      if (!VF || VF.shown) VF = { phase: "ready" };
      const stop = () => { clearInterval(VF.timer); VF.timer = null; };
      const here = () => /^#\/vraifaux/.test(location.hash);
      const draw = () => {
        if (!here()) return stop();
        if (VF.phase === "ready") {
          el.innerHTML = `${ui.head(t("gm.vf"), "jeux")}<section class="card center gm-end"><div class="medal" style="margin:0 auto">${AA.icon("bolt")}</div><h2>${t("gm.vf")}</h2><p class="muted">${t("gm.vf.rules")}</p>${g.best ? `<p class="chip gold">${t("gm.bestScore", { n: g.best })}</p>` : ""}<button class="btn block" id="vfGo">${AA.icon("play")} ${t("gm.vf.start")}</button></section>`;
          u.$("#vfGo", el).onclick = () => { fx.sfx.up(); VF = { phase: "play", end: Date.now() + 60000, good: 0, n: 0, combo: 0, mist: [], cur: vfItem(pool) }; VF.timer = setInterval(() => { if (!here()) return stop(); const left = VF.end - Date.now(); const bar = u.$("#vfBar", el); if (bar) bar.style.width = Math.max(0, left / 600) + "%"; const tx = u.$("#vfT", el); if (tx) tx.textContent = Math.ceil(Math.max(0, left) / 1000) + " s"; if (left <= 0) { stop(); VF.phase = "end"; fx.sfx.alarm(); draw(); } }, 200); draw(); };
          return;
        }
        if (VF.phase === "end") {
          VF.shown = true;
          if (!VF.saved) { VF.saved = true; VF.rec = !g.best || VF.good > g.best; g.best = Math.max(g.best || 0, VF.good); const dx = g.d === u.today() ? (g.dx || 0) : 0, gain = Math.max(0, Math.min(VF.good, 40 - dx)); VF.xp = gain; g.d = u.today(); g.dx = dx + gain; if (gain) G.addXp(gain); AA.store.save(true); G.checkBadges(); }
          el.innerHTML = `${ui.head(t("gm.vf"), "jeux")}<section class="card center gm-end"><div class="medal" style="margin:0 auto">${AA.icon("timer")}</div><h2>${t("gm.vf.end")}</h2><div class="big gm-big">${VF.good}</div><p class="muted">${t("gm.vf.res", { n: VF.good, t: VF.n })}</p>
            ${VF.rec && VF.good ? `<p class="chip gold">${AA.icon("trophy")} ${t("gm.vf.record")}</p>` : ""}<p>${VF.xp ? `<span class="chip gold">+${VF.xp} XP</span>` : `<span class="xs muted">${t("gm.vf.xpCap")}</span>`}</p>
            <div class="stack"><button class="btn block" id="vfAgain">${AA.icon("refresh")} ${t("gm.again")}</button><a class="btn ghost block" href="#/jeux">${t("gm.backHub")}</a></div></section>
            ${VF.mist.length ? `<div class="section-title"><h3>${t("gm.vf.mist")}</h3></div><div class="review gm-rv">${VF.mist.slice(0, 12).map(it => `<div class="rv"><b>${esc(it.q.q)}</b><span class="small">${AA.icon("check")} ${esc(it.q.c[it.q.a])}</span><a class="small" href="#/lesson/${it.q.m}">${esc(C.byId[it.q.m].title)}</a></div>`).join("")}</div>` : ""}`;
          u.$("#vfAgain", el).onclick = () => { VF = { phase: "ready" }; draw(); };
          return;
        }
        const it = VF.cur;
        el.innerHTML = `${ui.head(t("gm.vf"), "jeux", `<span class="chip gold mono" id="vfT">60 s</span>`)}
          <div class="bar vf-bar"><i id="vfBar" style="width:${Math.max(0, (VF.end - Date.now()) / 600)}%"></i></div>
          <div class="row between vf-score"><span>${t("gm.vf.score")} <b>${VF.good}</b></span>${VF.combo >= 3 ? `<span class="chip ok">${t("gm.combo", { n: VF.combo })}</span>` : ""}</div>
          <div class="card vf-card" id="vfCard"><p class="xs muted">${esc(C.byId[it.q.m].title)}</p><p class="vf-q">${esc(it.q.q)}</p><p class="vf-a">${AA.icon("next")} ${esc(it.q.c[it.ci])}</p><div class="vf-fb" id="vfFb"></div></div>
          <div class="vf-btns"><button class="btn vf-no" data-v="0">${AA.icon("x")} ${t("gm.vf.false")}</button><button class="btn vf-yes" data-v="1">${AA.icon("check")} ${t("gm.vf.true")}</button></div>`;
        const card = u.$("#vfCard", el);
        u.$$("[data-v]", el).forEach(b => b.onclick = () => pick(b.dataset.v === "1"));
        if (AA.gest && AA.gest.swipe) AA.gest.swipe(card, { left: () => pick(false), right: () => pick(true) });
      };
      const pick = v => {
        if (VF.phase !== "play" || VF.lock) return;
        const it = VF.cur, ok = v === it.truth; VF.n++; VF.lock = true;
        const card = u.$("#vfCard", el), fb = u.$("#vfFb", el);
        if (ok) { VF.good++; VF.combo++; fx.sfx.ok(); card && card.classList.add(v ? "go-r" : "go-l"); }
        else { VF.combo = 0; VF.mist.push(it); fx.sfx.bad(); fx.buzz(30); if (card) shake(card); if (fb) fb.innerHTML = `<span class="small">${t("gm.answerWas", { a: esc(it.q.c[it.q.a]) })}</span>`; }
        setTimeout(() => { VF.lock = false; if (VF.phase !== "play") return; VF.cur = vfItem(pool); draw(); }, ok ? 260 : 1100);
      };
      VF.key = e => { if (VF.phase !== "play" || !here()) return; if (e.key === "ArrowRight") { e.preventDefault(); pick(true); } else if (e.key === "ArrowLeft") { e.preventDefault(); pick(false); } };
      draw();
    }
  });
  document.addEventListener("keydown", e => { if (VF && VF.key && AA.router.name === "vraifaux") VF.key(e); });
  addEventListener("hashchange", () => { if (VF && VF.timer && !/^#\/vraifaux/.test(location.hash)) { clearInterval(VF.timer); VF = null; } });

  /* ---------- Hub « Jeux et boss » ---------- */
  AA.view("jeux", {
    tab: "train", depth: 10,
    render(el, [wid0]) {
      const wid = C.worldById[wid0] && !C.worldById[wid0].soon ? wid0 : G.goalWorld(), w = C.worldById[wid], mods = C.inWorld(wid), s = store(), fd = GM.final(wid);
      const left = GM.toRead(wid);
      el.innerHTML = `${ui.head(t("gm.hubT"), "train")}<p class="muted">${t("gm.hubS")}</p>
        <section class="gm-minis"><a class="gm-tile" href="#/paires"><span class="medal">${AA.icon("cards")}</span><span class="grow"><b>${t("gm.paires")}</b><span class="small muted">${t("gm.pairesS")}</span><span class="xs">${(s.games.paires || {}).best ? t("gm.bestScore", { n: t("gm.p.moves", { n: s.games.paires.best }) }) : t("gm.noBest")}</span></span></a>
          <a class="gm-tile" href="#/vraifaux"><span class="medal">${AA.icon("bolt")}</span><span class="grow"><b>${t("gm.vf")}</b><span class="small muted">${t("gm.vfS")}</span><span class="xs">${(s.games.vf || {}).best ? t("gm.bestScore", { n: s.games.vf.best }) : t("gm.noBest")}</span></span></a></section>
        <div class="tu-wstrip sr-lvs gm-ws">${C.worlds.filter(x => !x.soon && C.inWorld(x.id).length).map(x => `<a class="chip" href="#/jeux/${x.id}" aria-pressed="${x.id === wid}">${esc(x.short)}</a>`).join("")}</div>
        ${fd ? `<a class="card gm-final ${GM.bossWon(wid) ? "won" : left.length ? "lock" : "ready"}" href="#/boss/${wid}" style="--glow:${fd.glow}"><div class="gm-final-art"><div class="bt-flip">${AA.creature(fd.shape, fd.colors, "bt-cr")}</div></div><div class="grow"><p class="eyebrow">${t("gm.final")} · ${esc(w.short)}</p><h2>${esc(fd.name)}</h2><p class="small muted">${left.length ? t("gm.lockFinal", { n: left.length }) : GM.bossWon(wid) ? t("gm.guardWon") + " · " + t("gm.best", { p: s.boss[wid].best }) : t("gm.finalReady")}</p><span class="btn sm ${left.length ? "ghost" : ""}">${AA.icon("swords")} ${GM.bossWon(wid) ? t("gm.refight") : t("gm.fight")}</span></div></a>` : ""}
        <div class="section-title"><h3>${t("gm.guards")}</h3></div><p class="small muted">${t("gm.guardsS")}</p>
        <div class="gm-guards">${mods.map(m => { const d = GM.mini(m.id), rd = T.isRead(m.id), won = GM.miniWon(m.id);
          return `<a class="gm-g ${won ? "won" : rd ? "ready" : "lock"}" href="#/gardien/${m.id}"><span class="gm-g-art">${AA.creature(d.shape, rd ? d.colors : ["#33465a", "#2a3a4a", "#3d5266"], "")}${won ? `<span class="gm-crown">${AA.icon("trophy")}</span>` : ""}</span><span class="grow"><b>${esc(d.name)}</b><span class="xs muted">${esc(m.title)}</span><span class="xs ${rd ? "" : "muted"}">${won ? t("gm.guardWon") + " · " + t("gm.best", { p: s.minis[m.id].best }) : rd ? t("gm.ready") : t("gm.toRead")}</span></span></a>`; }).join("")}</div>`;
    }
  });

  /* ---------- Raccords : Entraîner, Carte, Cours, cours lu, tuteur ---------- */
  wrap("train", el => {
    const head = u.$(".pagehead", el) || el.firstElementChild; if (!head || u.$(".gm-entry", el)) return;
    head.insertAdjacentHTML("afterend", `<a class="card gm-entry" href="#/jeux"><span class="medal">${AA.icon("swords")}</span><span class="grow"><b>${t("gm.tile")}</b><span class="small muted">${t("gm.tileS")}</span></span>${AA.icon("next")}</a>`);
    /* Ce qui n'est pas faisable maintenant : grisé, non cliquable, avec la raison et ce qui le débloque. */
    const s = S(), today = u.today(), anyRead = C.modules.some(m => G.inPlay(m));
    const dq = G.qDue ? G.qDue().length : 0;
    const nextSrs = Object.entries(s.qsrs || {}).filter(([id, r]) => r && r.due > today && C.qById[id] && G.inPlay(C.qById[id].m)).map(([, r]) => r.due).sort()[0];
    const nErr = Object.keys(s.errors).filter(id => C.qById[id] && G.inPlay(C.qById[id].m)).length;
    const nDoubt = Object.keys(s.doubt).filter(id => C.qById[id] && G.inPlay(C.qById[id].m)).length;
    const hasCalc = anyRead && G.genKeys().some(k => G.inPlay(C.generators[k].m));
    const hasCards = anyRead && C.cards.some(c => G.inPlay(c.m));
    const read0 = t("gm.why.read");
    const why = {
      tutor: anyRead ? "" : read0, five: anyRead ? "" : read0, apnee: anyRead ? "" : read0,
      examfull: anyRead ? "" : read0, examquick: anyRead ? "" : read0,
      srs: !anyRead ? read0 : dq ? "" : nextSrs ? t("gm.why.srsNext", { d: u.fmtDate(nextSrs) }) : t("gm.why.srs"),
      flash: hasCards ? "" : anyRead ? t("gm.why.flash") : read0,
      errors: !anyRead ? read0 : nErr ? "" : t("gm.why.errors"),
      doubt: !anyRead ? read0 : nDoubt ? "" : t("gm.why.doubt"),
      calcs: hasCalc ? "" : anyRead ? t("gm.why.calcs") : read0
    };
    let off = 0;
    u.$$(".tile[data-t]", el).forEach(tl => {
      const w = why[tl.dataset.t]; if (!w) return; off++;
      tl.classList.add("off"); tl.setAttribute("aria-disabled", "true"); tl.setAttribute("tabindex", "-1");
      const b = u.$(".badge", tl); if (b) b.remove();
      tl.insertAdjacentHTML("beforeend", `<span class="tile-why">${AA.icon("lock")} ${esc(w)}</span>`);
    });
    if (off) { const st = u.$(".section-title", el); if (st && !u.$(".gm-offnote", el)) st.insertAdjacentHTML("afterend", `<p class="xs muted gm-offnote">${AA.icon("info")} ${t("gm.why.note")}</p>`); }
  });
  /* Une tuile grisée ne lance rien (le « ? » reste utilisable). */
  document.addEventListener("click", e => {
    const tl = e.target.closest(".tile.off"); if (!tl || e.target.closest("[data-help]")) return;
    e.preventDefault(); e.stopPropagation(); fx.buzz(20); tl.classList.remove("nudge"); void tl.offsetWidth; tl.classList.add("nudge");
  }, true);
  wrap("map", (el, [wid0]) => {
    GM.from = "map";
    const w = C.worldById[wid0] || C.worldById[G.goalWorld()];
    el.insertAdjacentHTML("afterbegin", `<div class="pagehead gm-maphead"><h1 class="pagetitle">${t("gm.mapT")}</h1><a class="btn ghost sm" href="#/cours/${w.id}">${AA.icon("book")} ${t("gm.mapList")}</a></div>`);
    /* Progression de la carte = cours lus (les étoiles n'existent plus). */
    const readOf = id => { const l = C.inWorld(id); return [l.filter(m => T.isRead(m.id)).length, l.length]; };
    u.$$(".wchip[data-w]", el).forEach(ch => { const [r, n] = readOf(ch.dataset.w), sp = u.$("span.xs", ch), ring = u.$(".wring", ch); if (ring) ring.style.setProperty("--p", n ? r / n : 0); if (sp && !AA.path.certified(ch.dataset.w) && /\d+\/\d+/.test(sp.textContent)) sp.textContent = r + "/" + n; });
    const wh = u.$(".worldhead", el), [rd0, nn] = readOf(w.id);
    if (wh) {
      const row = u.$(".row.between.small", wh), bar = row && row.nextElementSibling;
      if (row) row.innerHTML = `<span>${AA.icon("book")} ${t("gm.readN", { n: rd0, t: nn })}</span><span class="muted">${GM.bossWon(w.id) ? t("gm.guardWon") : G.bossOpen(w.id) ? t("gm.finalReady") : ""}</span>`;
      if (bar && bar.classList.contains("bar")) { const i = bar.querySelector("i"); if (i) i.style.width = (nn ? rd0 / nn * 100 : 0) + "%"; }
    }
    const nxt = T.nextToRead(w.id);
    u.$$(".spot", el).forEach(sp => {
      const b = u.$(".node[data-id]", sp), info = u.$(".info", sp); if (!b || !info) return; const id = b.dataset.id, rd = T.isRead(id);
      b.classList.toggle("done", rd); b.classList.toggle("cur", !!nxt && nxt.id === id);
      const st = info.querySelector(".stars"); if (st) st.remove();
      if (rd) info.insertAdjacentHTML("beforeend", ` <a class="chip xs gm-gchip ${GM.miniWon(id) ? "gold" : "pri"}" href="#/gardien/${id}">${AA.icon(GM.miniWon(id) ? "trophy" : "swords")} ${t(GM.miniWon(id) ? "gm.guardWon" : "gm.guard")}</a>`);
    });
    const bn = u.$("#bossnode", el); if (bn) { const open = G.bossOpen(w.id), won = GM.bossWon(w.id); bn.classList.toggle("cur", open && !won); bn.classList.toggle("done", won); bn.classList.toggle("lock", !open && !won); }
  });
  wrap("cours", (el, [wid0]) => {
    GM.from = "cours";
    u.$$(".pagehead a[href^='#/map/']", el).forEach(a => a.remove());
  });
  wrap("lesson", (el, [id]) => {
    const m = C.byId[id]; if (!m) return;
    const back = u.$(".pagehead a.closebtn", el); if (back) back.setAttribute("href", GM.from === "map" ? "#/map/" + m.world : "#/cours/" + m.world);
    const rc = u.$("#tuRead.done .row", el);
    if (rc && !u.$(".gm-lg", rc)) rc.insertAdjacentHTML("afterbegin", `<a class="btn sm ghost gm-lg" href="#/gardien/${id}">${AA.icon(GM.miniWon(id) ? "trophy" : "swords")} ${t(GM.miniWon(id) ? "gm.guardWon" : "gm.guard")}</a>`);
  });
  const acts0 = T.actions;
  T.actions = () => {
    const out = acts0(), wid = G.goalWorld();
    try {
      const W = C.worldById[wid], mods = C.inWorld(wid);
      if (W && W.boss && G.bossOpen(wid) && !GM.bossWon(wid)) out.splice(Math.min(1, out.length), 0, { k: "boss", ic: "swords", t: t("gm.a.boss", { w: W.short }), s: t("gm.a.bossS"), run: () => AA.router.go("boss/" + wid) });
      const m = mods.find(x => T.isRead(x.id) && !GM.miniWon(x.id) && ["ok", "master", "learning", "review"].includes(T.state(x.id)));
      if (m) out.splice(Math.min(2, out.length), 0, { k: "mini", ic: "swords", t: t("gm.a.mini", { t: m.title }), s: t("gm.a.miniS"), run: () => AA.router.go("gardien/" + m.id) });
    } catch (e) { console.error(e); }
    return out;
  };

  /* ---------- Trophées ---------- */
  const cond0 = G.cond;
  G.cond = c => {
    const s = store();
    switch (c.k) {
      case "gmMini": return [Object.values(s.minis).filter(r => r && r.won).length, c.n === "all" ? C.modules.length : c.n];
      case "gmBoss": return [Object.values(s.boss).filter(r => r && r.won).length, c.n];
      case "gmBossW": return [(s.boss[c.w] || {}).won ? 1 : 0, 1];
      case "gmPaires": return [(s.games.paires || {}).n || 0, c.n];
      case "gmVF": return [(s.games.vf || {}).best || 0, c.n];
      default: return cond0(c);
    }
  };
})();
