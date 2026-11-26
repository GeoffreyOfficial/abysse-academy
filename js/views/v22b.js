/* =====================================================================
   Abysse Academy 2.2 · la flamme (série) et le Club
   - Série : calendrier lu de gauche à droite (semaines du lundi au
     dimanche), flamme qui grandit et change de couleur par palier,
     célébration à chaque palier atteint.
   - Club : parcours guidé en 3 étapes, podium, titres rigolos, duels,
     codes à coller. Toujours sans serveur (codes AAC1 / AAD1 de 1.9).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, ui = AA.ui, fx = AA.fx, S = () => AA.S;

  /* ======================= LA FLAMME ======================= */
  const MILES = [3, 7, 14, 30, 60, 100, 365];
  /* Paliers visuels : min = série minimale, k = clé du nom. */
  const TIERS = [
    { min: 0, k: "off" }, { min: 1, k: "spark" }, { min: 3, k: "small" }, { min: 7, k: "camp" },
    { min: 14, k: "blaze" }, { min: 30, k: "blue" }, { min: 60, k: "violet" }, { min: 100, k: "gold" }, { min: 365, k: "sun" }
  ];
  const tierOf = n => { let i = 0; TIERS.forEach((x, k) => { if (n >= x.min) i = k; }); return i; };
  const FL = (AA.flame = {});
  FL.tierOf = tierOf; FL.MILES = MILES;
  FL.best = () => {
    const d = [...new Set(S().days || [])].sort(); let best = 0, run = 0, prev = "";
    d.forEach(x => { run = prev && u.addDays(1, prev) === x ? run + 1 : 1; prev = x; if (run > best) best = run; });
    return Math.max(best, G.streak());
  };
  /* Flamme dessinée : 3 couches, braises et anneaux selon le palier. */
  FL.svg = (n, cls) => {
    const ti = tierOf(n), emb = [0, 0, 3, 5, 7, 9, 11, 13, 16][ti];
    return `<span class="fl fl-t${ti} ${cls || ""}" aria-hidden="true">
      ${ti >= 4 ? `<i class="fl-rays"></i>` : ""}${ti >= 2 ? `<i class="fl-halo"></i>` : ""}${ti >= 7 ? `<i class="fl-ring"></i>` : ""}
      <svg viewBox="0 0 100 120"><path class="fl-a" d="M50 4C62 28 88 44 86 76c-2 26-20 40-36 40S16 102 14 76c-2-24 16-36 24-56 4 14 8 20 12 24 0-14-2-28 0-40z"/>
      <path class="fl-b" d="M50 36c10 18 22 30 20 50-2 18-12 24-20 24s-18-6-20-22c-1-14 8-24 12-36 3 8 6 12 8 14 1-10 0-20 0-30z"/>
      <path class="fl-c" d="M50 70c6 10 10 18 8 28-2 8-6 10-8 10-4 0-8-4-8-10 0-8 4-14 8-28z"/></svg>
      ${Array.from({ length: emb }, (_, i) => `<b class="fl-e" style="--x:${(i * 37) % 80 - 40}px;--d:${(1.4 + (i % 4) * 0.35).toFixed(2)}s;--w:${(i * 0.23 % 1.6).toFixed(2)}s"></b>`).join("")}
      ${ti >= 5 ? `<i class="fl-orbit"><b></b><b></b><b></b></i>` : ""}</span>`;
  };

  /* Calendrier : 5 semaines, lundi → dimanche, lu de gauche à droite et de haut en bas. */
  const cal = () => {
    const days = new Set(S().days || []), today = u.today(), st = G.streak();
    const wd = (new Date().getDay() + 6) % 7, start = u.addDays(-(wd + 28));
    const lastLit = days.has(today) ? today : u.addDays(-1);
    const cur = new Set(Array.from({ length: st }, (_, i) => u.addDays(-i, lastLit)));
    const DN = t("fl.dows").split(",");
    const cells = Array.from({ length: 35 }, (_, i) => {
      const d = u.addDays(i, start), fut = d > today, on = days.has(d), c = cur.has(d);
      const nx = u.addDays(1, d), chain = c && cur.has(nx) && i % 7 !== 6;
      return `<i class="${on ? "on" : ""} ${c ? "cur" : ""} ${chain ? "chain" : ""} ${d === today ? "today" : ""} ${fut ? "fut" : ""}" style="--i:${i}" title="${d}">${+d.slice(8)}${c ? `<b>${AA.icon("flame")}</b>` : ""}</i>`;
    }).join("");
    return `<div class="fl-cal" role="img" aria-label="${t("fl.calA", { n: st })}">${DN.map(x => `<span>${x}</span>`).join("")}${cells}</div>`;
  };

  const hud0 = AA.hudSheet;
  AA.hudSheet = kind => {
    if (kind !== "streak") return hud0(kind);
    const s = S(), st = G.streak(), ti = tierOf(st), doneToday = (s.days || []).includes(u.today());
    const next = MILES.find(m => m > st), prevM = [...MILES].reverse().find(m => m <= st) || 0, best = FL.best();
    const nt = next ? TIERS[tierOf(next)] : null;
    const close = ui.sheet(`<div class="help-sheet stack fl-sheet fl-s${ti}">
      <div class="fl-hero">${FL.svg(st, "big")}<div class="fl-num"><b id="flN">0</b><span>${t(st === 1 ? "fl.day1" : "fl.days")}</span></div>
        <p class="fl-name">${t("fl.t." + TIERS[ti].k)}</p></div>
      <p class="center fl-msg">${st ? (doneToday ? t("fl.okToday") : t("fl.todo")) : t("fl.zero")}</p>
      ${next ? `<div class="fl-next"><div class="row between small"><span>${t("fl.next", { n: next - st, name: t("fl.t." + nt.k) })}</span><b class="mono">${st}/${next}</b></div>${ui.bar((st - prevM) / (next - prevM), "var(--accent)")}</div>` : `<p class="center small"><b>${t("fl.maxed")}</b></p>`}
      <div class="fl-miles">${MILES.map(m => `<span class="${st >= m ? "got" : ""} ${m === next ? "nx" : ""}">${FL.svg(st >= m ? m : 0, "mini")}<b>${m}</b></span>`).join("")}</div>
      <h4 class="fl-h">${t("fl.calT")}</h4>${cal()}
      <p class="xs muted center" style="margin:0">${t("fl.calS")}</p>
      <div class="fl-stats"><div><b class="mono">${st}</b><span class="xs muted">${t("fl.now")}</span></div><div><b class="mono">${best}</b><span class="xs muted">${t("fl.best")}</span></div><div><b class="mono">${(s.days || []).length}</b><span class="xs muted">${t("fl.total")}</span></div></div>
      <div class="prose">${C.help.streak.html}</div>${doneToday ? "" : `<button class="btn block" data-hx>${AA.icon("play")} ${t("hud.keep")}</button>`}</div>`, t("help.what"));
    const b = u.$("[data-hx]"); if (b) b.onclick = () => { close(); AA.tutor ? AA.tutor.session() : AA.goTo("five"); };
    /* Compteur qui monte, puis célébration d'un palier jamais fêté. */
    const nEl = u.$("#flN"), dur = Math.min(1200, 250 + st * 40), t0 = performance.now();
    const step = now => { const k = Math.min(1, (now - t0) / dur); if (nEl) nEl.textContent = Math.round(st * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
    if (prevM && (s.flCel || 0) < prevM) {
      s.flCel = prevM; AA.store.save();
      setTimeout(() => {
        const h = u.$(".fl-hero"); if (!h) return;
        h.insertAdjacentHTML("beforeend", `<div class="fl-cel">${t("fl.cel", { n: prevM })}</div>`); h.classList.add("party");
        fx.sfx.badge(); fx.buzz([30, 40, 60]);
        [0, 250, 500].forEach((d, i) => setTimeout(() => fx.burstAt(h, 26 + i * 8, ["#FFB347", "#FF4D6D", "#5CC8FF"][i]), d));
      }, Math.min(1300, dur + 100));
    }
  };

  /* Premier point du jour : la flamme s'allume (toast cliquable) et la pastille s'anime. */
  const mark0 = G.markDay;
  G.markDay = function () {
    const had = (S().days || []).includes(u.today()), r = mark0.apply(this, arguments);
    if (!had && (S().days || []).includes(u.today())) {
      const st = G.streak(), m = MILES.includes(st);
      setTimeout(() => {
        try {
          fx.toast(t(m ? "fl.toastM" : "fl.toastT", { n: st }), t(m ? "fl.toastMS" : "fl.toastS", { name: t("fl.t." + TIERS[tierOf(st)].k) }), "flame", () => AA.hudSheet("streak"));
          const p = u.$('#topbar [data-hud="streak"]'); if (p) { p.classList.remove("lit"); void p.offsetWidth; p.classList.add("lit"); }
        } catch (e) {}
      }, 400);
    }
    return r;
  };
  /* Pastille du haut : couleur et lueur selon le palier. */
  const hudBar0 = ui.hud;
  ui.hud = function () {
    const r = hudBar0.apply(this, arguments);
    const p = u.$('#topbar [data-hud="streak"]'); if (p) { const st = G.streak(); p.dataset.tier = tierOf(st); if (!(S().days || []).includes(u.today()) && st) p.classList.add("cold"); }
    return r;
  };

  /* ======================= LE CLUB ======================= */
  const V = AA.v19; if (!V) return;
  const Q = AA.quiz;
  const clean = (s, n) => String(s == null ? "" : s).replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, n || 20);
  const num = (x, a, b) => { x = Number(x); return isFinite(x) ? u.clamp(Math.round(x), a, b) : a; };
  const vst = () => { V.myCard(); const v = S().v19; v.clx = v.clx && typeof v.clx === "object" ? v.clx : {}; return v; };
  const res = e => !e.opp ? null : e.me.r > e.opp.r || (e.me.r === e.opp.r && e.me.s < e.opp.s) ? 1 : e.me.r === e.opp.r && e.me.s === e.opp.s ? 0 : -1;
  const COLS = ["#FF8A5B", "#5CC8FF", "#7BE0A6", "#FFD23F", "#C46BFF", "#FF5C8A", "#4FD1C5", "#F6AD55"];
  const bub = (m, cls) => { const n = clean(m.n) || "?", c = COLS[u.seedOf("cl" + (m.id || n)) % COLS.length]; return `<span class="clb ${cls || ""}" style="--c:${c}">${m.me && AA.avatar ? AA.avatar.mine("clb-av") : u.esc([...n][0].toUpperCase())}</span>`; };
  const duelVs = e => {
    const a = e.me, b = e.opp, w = res(e);
    return `<div class="cl-vs ${w > 0 ? "win" : w < 0 ? "lose" : ""}"><div><b>${u.esc(a.n)}</b><span class="big2">${a.r}/${e.n}</span><span class="xs muted">${u.mmss(a.s)}</span></div><span class="cl-x">${AA.icon("swords")}</span><div><b>${u.esc(b.n)}</b><span class="big2">${b.r}/${e.n}</span><span class="xs muted">${u.mmss(b.s)}</span></div></div>
      <p class="center"><b>${t(w > 0 ? "cl.youWin" : w < 0 ? "cl.youLose" : "cl.draw")}</b></p>`;
  };
  const canLink = () => /^https?:$/.test(location.protocol) && !AA.BUNDLED && !(window.claude && window.claude.use);
  const codeBox = (code, kind) => `<div class="cl-box"><textarea class="input mono cl-ta" readonly rows="2" aria-label="${t("cl.code")}">${u.esc(code)}</textarea>
    <div class="row" style="gap:var(--sp-2)"><button class="btn gold grow" data-clshare="${kind}" data-code="${u.esc(code)}">${AA.icon("share")} ${t("cl2.sendCard")}</button><button class="btn ghost" data-clcopy data-code="${u.esc(code)}">${AA.icon("save")} ${t("cl.copy")}</button></div><p class="xs muted cl-msg" role="status" style="margin:0"></p></div>`;
  /* Envoyer sa carte coche l'étape 1. */
  document.addEventListener("click", e => { const b = e.target.closest(".cl2-card [data-clshare],.cl2-card [data-clcopy]"); if (!b) return; const v = vst(); if (!v.clx.sent) { v.clx.sent = 1; AA.store.save(); setTimeout(() => AA.router.name === "club" && refreshSteps(), 1500); } });
  let refreshSteps = () => {};

  const say = (out, h) => { if (out) { out.innerHTML = h; out.scrollIntoView({ block: "nearest", behavior: "smooth" }); } };
  const handleCode = (txt, el) => {
    const r = V.decode(txt), out = u.$("#clout", el), bad = k => { fx.sfx.bad(); say(out, `<div class="callout trap"><span class="eyebrow">${t("cl.errT")}</span>${t(k)}</div>`); };
    if (!r.ok) return bad(r.err);
    if (r.kind === "card") {
      const err = V.addCard(r.data); if (err) return bad(err);
      fx.sfx.up(); fx.burstAt(out, 24, "#FFD23F");
      say(out, `<div class="callout check"><span class="eyebrow">${t("cl.cardOk")}</span>${t("cl2.cardOkS", { n: u.esc(clean(r.data.n)) })}</div>`);
      setTimeout(() => { if (AA.router.name === "club") { AA.ctx.clSort = AA.ctx.clSort || "x"; AA.router.go("club"); } }, 1100); return;
    }
    const d = r.data, v = vst();
    if (!d.i || !Array.isArray(d.q) || !d.a) return bad("cl.errBad");
    d.a = { n: clean(d.a.n) || "?", r: num(d.a.r, 0, 99), s: num(d.a.s, 0, 99999) };
    if (d.b) d.b = { n: clean(d.b.n) || "?", r: num(d.b.r, 0, 99), s: num(d.b.s, 0, 99999) };
    const mine = v.duels.find(x => x.i === d.i && x.role === "a");
    if (mine && d.b) { mine.opp = d.b; AA.store.save(); fx.sfx.up(); if (res(mine) > 0) fx.burstAt(out, 30, "#7BE0A6"); say(out, `<div class="card stack">${duelVs(mine)}</div>`); return; }
    if (mine) return say(out, `<div class="callout info"><span class="eyebrow">${t("cl.ownT")}</span>${t("cl.own")}</div>`);
    const played = v.duels.find(x => x.i === d.i && x.role === "b");
    if (played) return say(out, `<div class="card stack">${duelVs(played)}<p class="small muted center" style="margin:0">${t("cl.already")}</p></div>`);
    const w = C.worldById[d.w];
    say(out, `<div class="card stack cl-chal"><p class="eyebrow">${t("cl.chalT")}</p><h3>${t("cl.chal", { n: u.esc(d.a.n) })}</h3><p class="small muted" style="margin:0">${t("cl.chalS", { n: d.q.length, w: w ? u.esc(w.short) : "?" })}</p><button class="btn block" id="clplay">${AA.icon("play")} ${t("cl.accept")}</button></div>`);
    u.$("#clplay", el).onclick = () => V.startDuel(d.w, d);
  };

  const SORTS = { x: "cl.rkXp", wx: "cl.rkWeek", s: "cl2.rkStreak", e: "cl.rkExam" };
  const val = (m, k) => k === "e" ? (m.e ? u.num(m.e, 1) + "/20" : "—") : k === "s" ? t("cl2.nDays", { n: m.s || 0 }) : u.num(m[k] || 0, 0) + " XP";
  /* Titres rigolos : le premier de chaque critère (s'il y a au moins 2 plongeurs). */
  const TITLES = [["x", "cl2.ti.x"], ["wx", "cl2.ti.wx"], ["s", "cl2.ti.s"], ["e", "cl2.ti.e"]];

  AA.view("club", {
    tab: "profile", depth: 30,
    render(el, [kind, code]) {
      const s = S(), v = vst(), me = Object.assign({ me: 1 }, V.myCard()), wk = V.week().id;
      const sortK = SORTS[AA.ctx.clSort] ? AA.ctx.clSort : "x";
      const mem = Object.values(v.club.members).map(m => Object.assign({}, m, { wx: m.wk === wk ? m.wx : 0 }));
      const all = mem.concat([me]), n = all.length;
      const rows = all.slice().sort((a, b) => (b[sortK] || 0) - (a[sortK] || 0) || (b.x || 0) - (a.x || 0));
      const titles = {}; if (n >= 2) TITLES.forEach(([k, key]) => { const top = all.slice().sort((a, b) => (b[k] || 0) - (a[k] || 0))[0]; if (top && top[k]) (titles[top.id] = titles[top.id] || []).push(t(key)); });
      const myPos = rows.findIndex(r => r.me), above = myPos > 0 ? rows[myPos - 1] : null;
      const worlds = V.duelWorlds(), dw = AA.ctx.clWorld && worlds.some(w => w.id === AA.ctx.clWorld) ? AA.ctx.clWorld : (worlds.find(w => w.id === Q.examWorld()) || worlds[0] || {}).id;
      const duels = v.duels.slice().reverse(), tally = [1, 0, -1].map(k => v.duels.filter(e => res(e) === k).length);
      const steps = [!!v.clx.sent, mem.length > 0, v.duels.length > 0], nDone = steps.filter(Boolean).length;
      const lv = G.levelOf(s.xp), best = (s.exams || []).filter(e => e.full).reduce((m, e) => Math.max(m, e.score), 0);
      const share = t("club.shareText", { l: lv.l, rank: lv.rank, xp: s.xp, best, apnee: s.apnee });
      const gap = above ? (sortK === "e" ? null : (above[sortK] || 0) - (me[sortK] || 0)) : null;
      const STEP = [["share", "cl2.s1", "cl2.s1S", "#clcard"], ["users", "cl2.s2", "cl2.s2S", "#clpaste"], ["swords", "cl2.s3", "cl2.s3S", "#clduel"]];
      const pod = rows.slice(0, 3), podOrder = pod.length === 3 ? [pod[1], pod[0], pod[2]] : pod.length === 2 ? [pod[1], pod[0]] : pod;

      el.innerHTML = `${ui.head(t("prof.club"), "profile", AA.helpBtn("club"))}
      <section class="card cl2-hero">
        <div class="cl2-fishes" aria-hidden="true">${AA.creature ? ["fish", "turtle", "ray"].map((sh, i) => `<span class="cl2-f f${i}">${AA.creature(sh, [COLS[i], COLS[i + 3], "#fff"], "")}</span>`).join("") : ""}</div>
        <div class="cl2-hd"><span class="medal">${AA.icon("users")}</span><div class="grow" style="min-width:0">
          <p class="eyebrow">${t("cl2.myClub")}</p>
          <label class="cl2-name"><input class="input" id="clname" maxlength="30" value="${u.esc(v.club.name)}" placeholder="${t("cl2.nameP")}" aria-label="${t("cl.clubName")}">${AA.icon("edit")}</label>
          <p class="small muted" style="margin:0">${t(n === 1 ? "cl2.alone" : "cl2.count", { n })}${n > 1 ? " · " + t("cl2.yourPos", { p: myPos === 0 ? "1er" : (myPos + 1) + "e" }) : ""}</p></div></div>
        <div class="cl2-steps" role="list">${STEP.map(([ic, k, ks, href], i) => `<a class="cl2-step ${steps[i] ? "done" : ""} ${!steps[i] && steps.indexOf(false) === i ? "now" : ""}" href="${href}" data-jump="${href}" role="listitem"><span class="cl2-dot">${steps[i] ? AA.icon("check") : i + 1}</span><span class="grow"><b>${t(k)}</b><span class="xs muted">${t(ks)}</span></span></a>`).join("")}</div>
        <div class="row between xs muted"><span>${nDone === 3 ? t("cl2.allDone") : t("cl2.stepsN", { n: nDone })}</span><button class="linkbtn xs" id="clhow">${t("cl2.how")}</button></div>
      </section>
      <div class="cl-grid cl2-grid">
      <section class="card stack cl-rank" id="clrank">
        <div class="row between"><h3>${AA.icon("trophy")} ${t("cl.rankT")}</h3></div>
        <div class="ex-worlds cl-seg" role="tablist">${Object.keys(SORTS).map(k => `<button class="chip ex-w ${k === sortK ? "on" : ""}" style="--wc:var(--gold)" data-sort="${k}" role="tab" aria-selected="${k === sortK}">${t(SORTS[k])}</button>`).join("")}</div>
        ${n >= 2 ? `<div class="cl2-pod">${podOrder.map(m => { const i = rows.indexOf(m); return `<div class="cl2-pl p${i + 1} ${m.me ? "me" : ""}">${bub(m, "lg")}<b class="cl2-pn">${u.esc(clean(m.n))}</b><span class="xs mono">${val(m, sortK)}</span><span class="cl2-step-b">${["🥇", "🥈", "🥉"][i]}</span></div>`; }).join("")}</div>
          ${above && gap != null ? `<p class="cl2-chase small">${AA.icon("target")} ${gap > 0 ? t("cl2.chase", { d: sortK === "s" ? t("cl2.nDays", { n: gap }) : u.num(gap, 0) + " XP", n: u.esc(clean(above.n)) }) : t("cl2.tie", { n: u.esc(clean(above.n)) })}</p>` : myPos === 0 ? `<p class="cl2-chase small lead">${AA.icon("trophy")} ${t("cl2.lead")}</p>` : ""}` :
        `<div class="cl2-empty">${bub(me, "lg")}<div><b>${t("cl2.emptyT")}</b><p class="small muted" style="margin:0">${t("cl2.emptyS")}</p></div></div>`}
        <ol class="cl-list">${rows.map((m, i) => `<li class="${m.me ? "me" : ""}" style="--i:${i}"><span class="cl-pos">${i < 3 && n > 1 ? ["🥇", "🥈", "🥉"][i] : i + 1}</span>${bub(m)}<span class="cl-nm"><b>${u.esc(m.n)}${m.me ? ` <span class="chip cl-you">${t("cl.you")}</span>` : ""}</b><span class="xs muted">${t("cl.lv", { l: m.l })}${m.s ? " · " + t("cl.streak", { n: m.s }) : ""}${!m.me && m.t ? " · " + t("cl.upd", { d: new Date(m.t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) }) : ""}</span>${(titles[m.id] || []).length ? `<span class="cl2-tis">${titles[m.id].map(x => `<span class="cl2-ti">${x}</span>`).join("")}</span>` : ""}</span>
          <span class="cl-val mono">${val(m, sortK)}</span>${m.me ? "" : `<button class="btn ghost sm" data-rm="${u.esc(m.id)}" aria-label="${t("common.remove")} ${u.esc(m.n)}">${AA.icon("x")}</button>`}</li>`).join("")}</ol>
        <div class="cl2-card" id="clcard"><p class="eyebrow">${AA.icon("share")} ${t("cl2.cardT")}</p><p class="small muted" style="margin:0">${t("cl2.cardS")}</p>${codeBox(V.encode("AAC1", V.myCard()), "c")}</div>
      </section>
      <div class="stack-lg">
      <section class="card stack" id="clpaste"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal">${AA.icon("download")}</span><div class="grow"><h3>${t("cl2.pasteT")}</h3><p class="small muted" style="margin:0">${t("cl2.pasteS")}</p></div></div>
        <textarea class="input mono" id="clin" rows="3" placeholder="${t("cl2.pasteP")}" aria-label="${t("cl.pasteT")}">${code ? u.esc(code) : ""}</textarea>
        <div class="row" style="gap:var(--sp-2)"><button class="btn grow" id="clgo">${AA.icon("check")} ${t("cl.read")}</button>${navigator.clipboard && navigator.clipboard.readText ? `<button class="btn ghost" id="clpst">${AA.icon("download")} ${t("cl2.pasteBtn")}</button>` : ""}</div><div id="clout"></div></section>
      <section class="card stack" id="clduel"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal">${AA.icon("swords")}</span><div class="grow"><h3>${t("cl.rduel")}</h3><p class="small muted" style="margin:0">${t("cl2.duelS")}</p></div></div>
        ${v.duels.length ? `<div class="cl2-tally"><span class="w"><b>${tally[0]}</b>${t("cl2.wins")}</span><span><b>${tally[1]}</b>${t("cl2.draws")}</span><span class="l"><b>${tally[2]}</b>${t("cl2.losses")}</span></div>` : ""}
        <p class="xs muted" style="margin:0">${t("cl2.pickW")}</p>
        <div class="ex-worlds">${worlds.map(w => `<button class="chip ex-w ${w.id === dw ? "on" : ""}" data-dw="${w.id}" style="--wc:var(${w.color})" aria-pressed="${w.id === dw}">${u.esc(w.short)}</button>`).join("")}</div>
        <button class="btn block" id="clnew" ${dw ? "" : "disabled"}>${AA.icon("play")} ${t("cl2.newDuel", { w: u.esc((C.worldById[dw] || {}).short || "") })}</button>
        <ol class="cl2-how3 xs">${["cl2.d1", "cl2.d2", "cl2.d3"].map(k => `<li>${t(k)}</li>`).join("")}</ol>
        ${duels.length ? `<details class="cl-more" ${duels.some(e => !e.opp) ? "open" : ""}><summary>${t("cl2.hist", { n: duels.length })}</summary><div class="cl-recent">${duels.slice(0, 12).map(e => { const r = res(e); return `<div class="cl-r"><span class="small"><b>${e.opp ? u.esc(e.opp.n) : t("cl.waiting")}</b> · ${u.esc((C.worldById[e.w] || {}).short || "")} · <span class="muted">${u.esc(e.d ? new Date(e.d + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : "")}</span></span><span class="mono small">${e.me.r}${e.opp ? " – " + e.opp.r : ""}/${e.n}</span><span class="chip ${r > 0 ? "ok" : r < 0 ? "warn" : ""}">${r == null ? t("cl.pending") : t(r > 0 ? "cl.w" : r < 0 ? "cl.l" : "cl.d")}</span></div>`; }).join("")}</div></details>` : ""}</section>
      <section class="card stack"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal">${AA.icon("phone")}</span><div class="grow"><h3>${t("cl2.localT")}</h3><p class="small muted" style="margin:0">${t("club.duelS")}</p></div></div>
        <div class="calc-grid"><input class="input" id="p1" placeholder="${t("club.p1")}" maxlength="20" value="${u.esc(s.profile.name)}" aria-label="${t("club.p1")}"><input class="input" id="p2" placeholder="${t("club.p2")}" maxlength="20" aria-label="${t("club.p2")}"></div>
        <button class="btn ghost block" id="duel">${AA.icon("play")} ${t("club.start")}</button></section>
      <section class="card stack"><h3>${t("club.shareT")}</h3><p class="small muted" style="margin:0">${t("club.shareS")}</p>
        <div class="out" id="sharetxt">${u.esc(share)}</div><button class="btn ghost block" id="share">${AA.icon("share")} ${t("club.share")}</button><p class="small muted" id="sharemsg" role="status"></p></section>
      </div></div>
      <p class="xs muted cl2-priv">${AA.icon("shield")} <span>${t("cl.privacy")}</span></p>`;

      refreshSteps = () => AA.router.refresh();
      u.$$("[data-jump]", el).forEach(a => a.onclick = e => { e.preventDefault(); const x = u.$(a.dataset.jump, el); if (x) { x.scrollIntoView({ behavior: "smooth", block: "start" }); x.classList.remove("cl2-flash"); void x.offsetWidth; x.classList.add("cl2-flash"); const f = u.$("textarea:not([readonly]),button", x); if (a.dataset.jump === "#clpaste" && f) setTimeout(() => f.focus({ preventScroll: true }), 400); } });
      u.$("#clhow").onclick = () => ui.sheet(`<div class="help-sheet stack"><div class="help-ic">${AA.icon("users")}</div><h3>${t("cl2.howT")}</h3><ol class="cl2-howl">${[["cl2.h1", "cl2.h1S"], ["cl2.h2", "cl2.h2S"], ["cl2.h3", "cl2.h3S"], ["cl2.h4", "cl2.h4S"]].map(([a, b]) => `<li><b>${t(a)}</b><span class="small muted">${t(b)}</span></li>`).join("")}</ol><p class="xs muted">${t("cl.privacy")}</p><button class="btn ghost block" data-no>${t("help.ok")}</button></div>`, t("cl2.howT"));
      u.$$("[data-sort]", el).forEach(b => b.onclick = () => { AA.ctx.clSort = b.dataset.sort; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-dw]", el).forEach(b => b.onclick = () => { AA.ctx.clWorld = b.dataset.dw; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-rm]", el).forEach(b => b.onclick = () => { const m = v.club.members[b.dataset.rm]; if (m && !confirmRm(b)) return; delete v.club.members[b.dataset.rm]; AA.store.save(); AA.router.refresh(); });
      u.$("#clnew").onclick = () => dw && V.startDuel(dw);
      u.$("#clgo").onclick = () => handleCode(u.$("#clin").value, el);
      const pst = u.$("#clpst"); if (pst) pst.onclick = async () => { try { const x = await navigator.clipboard.readText(); u.$("#clin").value = x; handleCode(x, el); } catch (e) { u.$("#clin").focus(); } };
      const nm = u.$("#clname"); nm.onchange = () => { v.club.name = clean(nm.value, 30); AA.store.save(); fx.sfx.tap(); };
      nm.onkeydown = e => { if (e.key === "Enter") nm.blur(); };
      u.$("#duel").onclick = () => AA.quiz.duel(u.$("#p1").value.trim() || t("club.p1"), u.$("#p2").value.trim() || t("club.p2"));
      u.$("#share").onclick = async () => {
        const m = u.$("#sharemsg"), url = canLink() ? location.origin + location.pathname : "";
        if (navigator.share) { try { await navigator.share({ title: t("app.name"), text: share, url: url || undefined }); m.textContent = t("club.shared"); } catch (e) {} }
        else if (navigator.clipboard) navigator.clipboard.writeText(share + (url ? " " + url : "")).then(() => (m.textContent = t("club.copied")), () => (m.textContent = t("club.copyFail")));
        else m.textContent = t("club.copyFail");
      };
      if ((kind === "d" || kind === "c") && code && !AA.ctx.clDone) { AA.ctx.clDone = code; setTimeout(() => { handleCode(code, el); const x = u.$("#clpaste", el); if (x) x.scrollIntoView({ block: "start" }); }, 50); }
    }
  });
  /* Retirer quelqu'un : deuxième appui pour confirmer (pas de fenêtre bloquante). */
  const confirmRm = b => { if (b.dataset.sure) return true; b.dataset.sure = 1; b.classList.add("sure"); b.innerHTML = t("cl2.sure"); setTimeout(() => { if (b.isConnected) { delete b.dataset.sure; b.classList.remove("sure"); b.innerHTML = AA.icon("x"); } }, 2500); return false; };
})();
