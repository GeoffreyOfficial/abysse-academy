/* =====================================================================
   Abysse Academy 2.10 · combats et aventures épiques
   Combats (boss et gardiens) :
   - entrée en scène cinématique (bandes noires, nom qui s'abat, rugissement),
   - barre de vie continue avec dégâts « fantômes », entailles à chaque coup,
     attaques nommées du boss, provocations à chaque phase, alerte quand il
     ne te reste qu'une vie, aura de combo,
   - écran de victoire (« VICTOIRE », rayons, butin) ou de défaite.
   Aventures :
   - l'aventure du boss est OBLIGATOIRE pour l'affronter (sauf boss déjà
     vaincu ou mode « tout débloquer »),
   - chapitres annoncés à chaque scène, la silhouette du boss rôde dans les
     quêtes et grossit à l'approche,
   - « Ton aventure » sur l'accueil, section Aventures dans Jeux, lien depuis
     le cursus.
   Les effets visuels suivent « Réduire les animations » ; les sons épiques
   ne jouent qu'avec l'ambiance « Complète » (jamais en « Discrète » ou
   « Coupée »). Les surcouches ne captent jamais les clics.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, GM = AA.games, V = AA.views, fx = AA.fx, esc = u.esc;
  if (!GM || !V.boss) return;
  const reduced = () => (AA.a11y && AA.a11y.reduced ? AA.a11y.reduced() : false);
  const full = () => (AA.S.profile.amb || "full") === "full";

  /* ---------- Sons épiques (synthétisés) ---------- */
  const play = seq => {
    if (!full()) return; const ac = fx.audio && fx.audio(); if (!ac) return;
    try { const t0 = ac.currentTime + .01;
      seq.forEach(([f0, f1, d, st, type, vol]) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = type || "sawtooth";
        o.frequency.setValueAtTime(f0, t0 + st); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + st + d);
        g.gain.setValueAtTime(.0001, t0 + st); g.gain.exponentialRampToValueAtTime(vol || .12, t0 + st + .04); g.gain.exponentialRampToValueAtTime(.0001, t0 + st + d);
        o.connect(g).connect(ac.destination); o.start(t0 + st); o.stop(t0 + st + d + .05); }); } catch (e) {}
  };
  const SND = {
    roar: () => play([[140, 45, 1.1, 0, "sawtooth", .14], [95, 38, 1.2, .08, "square", .07], [220, 70, .7, .02, "triangle", .06]]),
    slash: crit => play(crit ? [[1800, 220, .22, 0, "triangle", .12], [900, 110, .35, .05, "sawtooth", .08], [60, 40, .4, .1, "sine", .2]] : [[1400, 300, .16, 0, "triangle", .1]]),
    attack: () => play([[300, 60, .5, 0, "sawtooth", .1], [120, 50, .6, .1, "square", .06]]),
    fanfare: () => play([[523, 523, .18, 0, "triangle", .12], [659, 659, .18, .16, "triangle", .12], [784, 784, .18, .32, "triangle", .12], [1047, 1047, .6, .48, "triangle", .14], [262, 262, .9, .48, "sine", .1]]),
    defeat: () => play([[392, 196, .5, 0, "triangle", .1], [294, 147, .7, .35, "triangle", .1]])
  };
  AA.epicSnd = SND;

  const ATTACKS = ["Tourbillon d’azote", "Vague de froid", "Nuage d’encre", "Courant traître", "Morsure des profondeurs", "Piège à bulles", "Narcose hypnotique", "Remontée sauvage", "Coup de houle", "Brouillard de vase"];
  const TAUNTS2 = ["Tu crois connaître tes paliers ?", "Les abysses ne pardonnent pas l’à-peu-près.", "Ta réserve fond, plongeur…"];
  const TAUNTS3 = ["Dernier souffle ! Montre ce que tu sais !", "Tu ne remonteras pas sans prouver ton niveau !", "Je suis le gardien de ces profondeurs !"];
  AA.epic = { ATTACKS, TAUNTS2, TAUNTS3 };

  /* ---------- Combats ---------- */
  let lastQs = null;
  const defOf = (name, args) => {
    try { if (name === "boss") { const w = (args && args[0]) || G.goalWorld(); return GM.final(w); } return GM.mini((args && args[0]) || ""); } catch (e) { return null; }
  };
  const fly = (A, cls, html, ms) => { const d = document.createElement("div"); d.className = cls; d.setAttribute("aria-hidden", "true"); d.innerHTML = html || ""; A.appendChild(d); setTimeout(() => d.remove(), ms || 1600); return d; };
  const cinematic = (A, def) => {
    const boss = def.kind === "boss";
    const d = fly(A, "ep-cine " + (boss ? "k-boss" : "k-mini") + (reduced() ? " rm" : ""), `<i class="ep-bar top"></i><i class="ep-bar bot"></i><div class="ep-cine-in"><p class="ep-kick">${t(boss ? "ep.kickBoss" : "ep.kickMini")}</p><b class="ep-name">${esc(def.name)}</b>${def.title || def.depth ? `<span class="ep-sub">${esc([def.title, def.depth].filter(Boolean).join(" · "))}</span>` : ""}</div>`, reduced() ? 1100 : 2300);
    d.setAttribute("role", "status");
    A.classList.add("ep-entering"); setTimeout(() => A.classList.remove("ep-entering"), 2200);
    SND.roar(); fx.buzz && fx.buzz([80, 60, 120]);
  };
  const decorate = (el, name, args) => {
    const A = u.$("#btA", el); if (!A || A.dataset.ep) return;
    A.dataset.ep = "1"; A.classList.add("ep-arena");
    const def = defOf(name, args) || {};
    /* Barre de vie continue */
    const hud = u.$(".bt-hud .grow", A);
    if (hud) hud.insertAdjacentHTML("beforeend", `<div class="ep-hp" aria-hidden="true"><i class="ghost"></i><i class="fill"></i></div>`);
    const pv = u.$("#btPv", A);
    const upd = () => { const m = (pv && pv.textContent || "").match(/(\d+)\s*\/\s*(\d+)/); if (!m) return; const p = Math.max(0, +m[1] / +m[2]) * 100, bar = u.$(".ep-hp", A); if (!bar) return;
      bar.querySelector(".fill").style.width = p + "%"; setTimeout(() => { const g = bar.querySelector(".ghost"); if (g) g.style.width = p + "%"; }, 450); bar.classList.toggle("low", p <= 34); };
    if (pv) new MutationObserver(upd).observe(pv, { childList: true, characterData: true, subtree: true });
    upd();
    /* Coups, attaques, phases, vies */
    new MutationObserver(muts => muts.forEach(mu => mu.addedNodes.forEach(n => {
      if (!n.classList) return;
      if (n.classList.contains("bt-dmg")) {
        const crit = n.classList.contains("crit"); SND.slash(crit);
        fly(A, "ep-slash" + (crit ? " crit" : ""), "<i></i><i></i>", 900);
        if (crit) fly(A, "ep-crit", `<b>${t("ep.crit")}</b>`, 1300);
      } else if (n.classList.contains("bt-wave")) {
        SND.attack();
        fly(A, "ep-atk", `<span class="xs">${esc(def.name || "")}</span><b>${esc(u.pick(ATTACKS))} !</b>`, 1500);
      }
    }))).observe(A, { childList: true });
    let ph = 1;
    new MutationObserver(() => {
      const p = A.classList.contains("ph3") ? 3 : A.classList.contains("ph2") ? 2 : 1;
      if (p > ph) { ph = p; setTimeout(() => fly(A, "ep-taunt", `<b>${esc(def.name || "")}</b><span>« ${esc(u.pick(p === 3 ? TAUNTS3 : TAUNTS2))} »</span>`, 2600), 700); }
    }).observe(A, { attributes: true, attributeFilter: ["class"] });
    const lv = u.$("#btLives", A);
    const danger = () => { const n = u.$$("#btLives span:not(.off)", A).length; A.classList.toggle("ep-danger", n === 1); };
    if (lv) new MutationObserver(danger).observe(lv, { childList: true, subtree: true, attributes: true });
    const cb = u.$("#btCombo", A);
    if (cb) new MutationObserver(() => { const m = cb.textContent.match(/\d+/); A.classList.toggle("ep-fire", !cb.hidden && m && +m[0] >= 3); }).observe(cb, { childList: true, characterData: true, subtree: true, attributes: true });
    /* Entrée en scène, une fois par combat */
    const qs = GM.qs ? GM.qs() : null;
    if (qs && qs !== lastQs) { lastQs = qs; cinematic(A, def); }
  };
  const resultFx = (el, name, args) => {
    const r = u.$(".bt-res", el); if (!r || r.dataset.ep) return;
    r.dataset.ep = "1"; const won = r.classList.contains("won"), def = defOf(name, args) || {};
    r.insertAdjacentHTML("afterbegin", `<div class="ep-res ${won ? "win" : "ko"}" aria-hidden="true"><i class="ep-rays"></i><b>${t(won ? "ep.win" : "ep.ko")}</b><span>${esc(won ? t("ep.winS", { n: def.name || "" }) : t("ep.koS"))}</span></div>`);
    (won ? SND.fanfare : SND.defeat)();
  };
  ["boss", "gardien"].forEach(name => {
    const v = V[name]; if (!v) return; const r0 = v.render;
    v.render = function (el, args) {
      const out = r0.call(this, el, args);
      try { decorate(el, name, args); resultFx(el, name, args);
        const st = u.$(".bt-stage", el); if (st && !st.dataset.ep) { st.dataset.ep = "1"; st.classList.add("ep-stage"); }
      } catch (e) { console.error(e); }
      return out;
    };
  });

  /* ---------- L'aventure du boss est obligatoire ---------- */
  const quest = wid => C.storyById["boss-" + wid];
  const bo = G.bossOpen;
  /* Niveau déjà obtenu (mode révision ou certifié) : pas d'aventure imposée. */
  const held = wid => { try { return !!AA.path && (AA.path.mode(wid) !== "learn" || AA.path.certified(wid)); } catch (e) { return false; } };
  G.bossOpen = wid => bo(wid) && (!!AA.S.unlockAll || G.questDone(wid) || GM.bossWon(wid) || held(wid));
  G.questNeeded = wid => !!quest(wid) && !AA.S.unlockAll && !G.questDone(wid) && !GM.bossWon(wid) && !held(wid);
  {
    const r0 = V.boss.render;
    V.boss.render = function (el, args) {
      const out = r0.call(this, el, args);
      try {
        const wid = (args && args[0]) || G.goalWorld(), s = quest(wid), card = u.$(".bt-card", el);
        if (s && card && G.questNeeded(wid) && !u.$(".ep-lock", card)) {
          const go = u.$("#btGo", card); if (go) go.remove();
          const has = u.$(".bt-quest", card);
          const left = GM.toRead(wid).length;
          card.insertAdjacentHTML("afterbegin", `<div class="ep-lock callout warn"><b>${AA.icon("lock")} ${t("ep.lockT")}</b><span>${t("ep.lockS", { t: esc(s.title) })}</span></div>`);
          if (!has) { const fl = u.$$("a.btn.ghost", card).pop(); const html = `<a class="btn block bt-quest gold" href="#/story/${s.id}">${AA.icon("scroll")} ${t("bq.go")} · ${esc(s.title)}</a>`; if (fl) fl.insertAdjacentHTML("beforebegin", html); else card.insertAdjacentHTML("beforeend", html); }
          if (left) card.querySelector(".ep-lock span").insertAdjacentHTML("beforeend", " " + t("ep.lockRead", { n: left }));
        }
      } catch (e) { console.error(e); }
      return out;
    };
  }

  /* ---------- Aventures épiques ---------- */
  const sRec = id => ((AA.S.story || {})[id] || {});
  let lastNode = "";
  if (V.story) {
    const r0 = V.story.render;
    V.story.render = function (el, args) {
      const out = r0.call(this, el, args);
      try {
        const sid = args && args[0], s = sid && C.storyById[sid], sc = u.$(".story-scene", el), c = AA.ctx && AA.ctx.story;
        if (s && sc && c) {
          const n = s.nodes[c.node] || {}, isQ = /^boss-/.test(s.id), depth = n.depth || 0;
          sc.classList.add("ep-scene"); sc.style.setProperty("--dp", Math.min(1, depth / 40).toFixed(2));
          if (isQ) {
            const w = C.worldById[s.world], fd = GM.final(s.world), prog = Math.min(1, (c.steps + 1) / Math.max(1, Object.values(s.nodes).filter(x => !x.end && !x.alt).length));
            if (fd && !u.$(".ep-lurk", sc)) sc.insertAdjacentHTML("afterbegin", `<div class="ep-lurk" aria-hidden="true" style="--p:${prog.toFixed(2)};--glow:${fd.glow || "#5CE1E6"}">${AA.creature(fd.shape, fd.colors, "bt-cr")}</div>`);
            sc.classList.add("ep-quest");
            if (w && !u.$(".ep-qtag", el)) sc.insertAdjacentHTML("beforebegin", `<p class="ep-qtag">${AA.icon("swords")} ${t("ep.questTag", { n: esc(fd ? fd.name : "") })}</p>`);
          }
          const key = s.id + ":" + c.node;
          if (key !== lastNode && !c.fb) {
            lastNode = key; const k = c.steps + 1;
            const d = document.createElement("div"); d.className = "ep-chap" + (reduced() ? " rm" : ""); d.setAttribute("aria-hidden", "true");
            d.innerHTML = `<span>${t("ep.chap", { n: k })}</span><b>${depth ? "−" + depth + " m" : t("story.surface")}</b>`;
            sc.appendChild(d); setTimeout(() => d.remove(), 1700);
          }
        }
        const nb = u.$(".st-boss", el); if (nb) nb.classList.add("ep-pulse");
        /* Liste des aventures : les quêtes des boss en tête de chaque niveau */
        u.$$(".st-group + .stack", el).forEach(st => { const qs = u.$$("[data-s^='boss-']", st); qs.forEach(b => { b.classList.add("ep-qcard"); st.prepend(b); }); });
      } catch (e) { console.error(e); }
      return out;
    };
  }

  /* ---------- Aventures plus présentes ---------- */
  const nextAdv = wid => {
    const w = wid || G.goalWorld(), q = quest(w);
    if (q && !sRec(q.id).done && !GM.bossWon(w)) return { s: q, boss: true, w };
    const s = C.stories.find(x => x.world === w && !/^boss-/.test(x.id) && !sRec(x.id).done && (!x.unlock || AA.S.unlockAll || G.met(x.unlock)));
    return s ? { s, w } : null;
  };
  AA.epic.nextAdv = nextAdv;
  const advCard = a => {
    const fd = GM.final(a.w), r = sRec(a.s.id), started = r.steps > 0 && !r.done;
    return `<section class="card ep-adv ${a.boss ? "boss" : ""}" id="epadv" style="--glow:${(fd && fd.glow) || "#5CE1E6"}">
      ${a.boss && fd ? `<div class="ep-adv-art" aria-hidden="true">${AA.creature(fd.shape, fd.colors, "bt-cr")}</div>` : `<div class="ep-adv-art ic" aria-hidden="true">${AA.icon(a.s.icon || "scroll")}</div>`}
      <div class="stack" style="gap:6px"><p class="eyebrow">${t(a.boss ? "ep.advBoss" : "ep.adv")}</p><b class="h4">${esc(a.s.title)}</b>
        <p class="small" style="margin:0">${a.boss && fd ? t("ep.advBossS", { n: esc(fd.name) }) : esc(a.s.sub || "")}</p>
        <a class="btn sm ${a.boss ? "gold" : ""}" href="#/story/${a.s.id}">${AA.icon("scroll")} ${t(started ? "ep.advResume" : "ep.advGo")}</a></div></section>`;
  };
  if (V.home) {
    const r0 = V.home.render;
    V.home.render = function (el, args) {
      const out = r0.call(this, el, args);
      try { if (!u.$("#epadv", el)) { const a = nextAdv(); if (a) { const anchor = u.$(".tu-next", el) || u.$(".five-cta", el) || u.$(".today", el); if (anchor) anchor.insertAdjacentHTML("afterend", advCard(a)); } } } catch (e) { console.error(e); }
      return out;
    };
  }
  if (V.jeux) {
    const r0 = V.jeux.render;
    V.jeux.render = function (el, args) {
      const out = r0.call(this, el, args);
      try {
        if (!u.$(".ep-advs", el)) {
          const wid = C.worldById[args && args[0]] && !C.worldById[args[0]].soon ? args[0] : G.goalWorld(), list = C.stories.filter(s => s.world === wid).sort((a, b) => (/^boss-/.test(b.id)) - (/^boss-/.test(a.id)));
          if (list.length) {
            const html = `<div class="section-title ep-advs"><h3>${t("ep.advsT")}</h3><a class="small" href="#/story">${t("ep.advsAll")}</a></div>
              <section class="gm-minis ep-advlist">${list.map(s => { const r = sRec(s.id), boss = /^boss-/.test(s.id);
                return `<a class="gm-tile ${boss ? "ep-qtile" : ""}" href="#/story/${s.id}"><span class="medal">${AA.icon(boss ? "swords" : s.icon || "scroll")}</span><span class="grow"><b>${esc(s.title)}</b><span class="small muted">${boss ? t("ep.questOf") : esc(s.role || "")}</span><span class="xs">${r.done ? "✓ " + t("ep.done") : r.steps ? t("ep.inProgress") : t("ep.notYet")}</span></span></a>`; }).join("")}</section>`;
            const anchor = u.$(".gm-final", el); if (anchor) anchor.insertAdjacentHTML("afterend", html); else { const m = u.$(".gm-minis", el); if (m) m.insertAdjacentHTML("beforebegin", html); }
          }
        }
      } catch (e) { console.error(e); }
      return out;
    };
  }
  if (V.cursus) {
    const r0 = V.cursus.render;
    V.cursus.render = function (el, args) {
      const out = r0.call(this, el, args);
      try {
        const add = () => { const d = u.$(".cur-detail", el); if (!d || u.$(".ep-curadv", d)) return; const id = (u.$(".rd-node.on", el) || {}).dataset; const cid = id && id.id, c = cid && C.cursusById[cid];
          const n = c && c.world ? C.stories.filter(s => s.world === c.world).length : 0;
          if (n) { const acts = u.$(".cd-acts", d); const html = `<a class="btn ghost sm ep-curadv" href="#/jeux/${c.world}">${AA.icon("scroll")} ${t("ep.curAdv", { n })}</a>`; if (acts) acts.insertAdjacentHTML("beforeend", html); else d.insertAdjacentHTML("beforeend", `<div class="row">${html}</div>`); } };
        add(); if (!el._epCur) { el._epCur = new MutationObserver(() => { if (AA.router.name === "cursus") add(); }); el._epCur.observe(el, { childList: true, subtree: true }); }
      } catch (e) { console.error(e); }
      return out;
    };
  }
})();
