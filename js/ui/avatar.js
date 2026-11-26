/* =====================================================================
   Abysse Academy · avatar qui évolue avec le niveau
   AA.avatar.svg(avatar, niveau, cls) renvoie le dessin (SVG, viewBox 100).
   avatar = { kind: "diver" | "creature" | "letter", skin, hair, hairC, suit, id }
   Évolutions (niveaux 1, 3, 5, 7, 9) : le plongeur s'équipe peu à peu,
   le cadre passe de l'eau claire au bronze, à l'argent, à l'or puis aux
   abysses. Les compagnons (content/fr/companions.js) évoluent en 5 formes
   avec chacune son nom, sa taille et ses couleurs, jusqu'à la forme légendaire.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u;
  const A = (AA.avatar = {});

  A.STAGES = [1, 3, 5, 7, 9];
  A.SKINS = ["#F6D7BE", "#E6B48C", "#C08457", "#8A5634", "#5A3622"];
  A.HAIRC = ["#2A1C14", "#6E4423", "#C99A3E", "#B4492A", "#DCD8CF"];
  A.SUITS = ["#1E7FA8", "#16384F", "#D9472B", "#2E9E6A", "#7A4FD1", "#E59A12"];
  A.HAIRS = 4; /* court, long, chignon, ras */
  const RING = ["#5CC8D8", "#C27D42", "#C9D4DB", "#F2C14E", ""];
  const WATER = [["#8FE3EE", "#1C8DB0"], ["#6FCFE3", "#15739A"], ["#4DAFD0", "#0E5578"], ["#2E86B0", "#0A3352"], ["#1D4F80", "#070F2A"]];

  A.stage = l => { let s = 0; A.STAGES.forEach((min, i) => { if (l >= min) s = i; }); return s; };
  A.next = l => A.STAGES.find(min => min > l) || null;
  A.get = () => Object.assign({ kind: "diver", skin: 1, hair: 0, hairC: 0, suit: 0, id: "" }, AA.S.profile.avatar || {});
  A.level = () => AA.game.levelOf(AA.S.xp).l;
  A.mine = cls => A.svg(A.get(), A.level(), cls);

  let uid = 0;
  A.svg = (av, level, cls) => {
    const st = A.stage(level || 1), k = "av" + (++uid), w = WATER[st];
    const defs = `<defs><clipPath id="${k}c"><circle cx="50" cy="50" r="45"/></clipPath>
      <radialGradient id="${k}w" cx="50%" cy="18%" r="90%"><stop offset="0" stop-color="${w[0]}"/><stop offset="1" stop-color="${w[1]}"/></radialGradient>
      <linearGradient id="${k}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7DF0FF"/><stop offset=".5" stop-color="#9B6CFF"/><stop offset="1" stop-color="#F2C14E"/></linearGradient></defs>`;
    let inner = "";
    if (av.kind === "creature") inner = creature(av, st);
    else if (av.kind === "letter") inner = letter(av);
    else inner = diver(av, st);
    const bub = [[24, 30, 2.2], [30, 20, 1.4], [76, 26, 1.8]].slice(0, 1 + st % 3).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="1"/>`).join("");
    const glow = st >= 4 ? `<circle cx="50" cy="50" r="48" fill="none" stroke="url(#${k}a)" stroke-width="2" opacity=".55" class="ava-glow"/>${[[12, 22], [88, 30], [16, 80], [86, 78]].map(([x, y]) => `<path d="M${x} ${y - 4}l1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2z" fill="#FFE08A"/>`).join("")}` : "";
    const stars = st ? `<g transform="translate(50 93)">${Array.from({ length: st }, (_, i) => `<path transform="translate(${(i - (st - 1) / 2) * 9} 0)" d="M0 -4l1.2 2.6 2.8.3-2.1 1.9.6 2.8L0 2.2l-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z" fill="${st >= 3 ? "#F2C14E" : "#fff"}" stroke="#0A2233" stroke-width=".6"/>`).join("")}</g>` : "";
    return `<svg class="ava ava-s${st} ${cls || ""}" viewBox="0 0 100 100" aria-hidden="true">${defs}
      <circle cx="50" cy="50" r="45" fill="url(#${k}w)"/>
      <g clip-path="url(#${k}c)">${bub}${inner}</g>
      <circle cx="50" cy="50" r="45.5" fill="none" stroke="${RING[st] || `url(#${k}a)`}" stroke-width="${3 + st * .6}"/>${glow}${stars}</svg>`;
  };

  function letter(av) {
    const n = (AA.S.profile.name || "?").trim().slice(0, 1).toUpperCase() || "?";
    return `<circle cx="50" cy="50" r="45" fill="${A.SUITS[av.suit] || A.SUITS[0]}" opacity=".85"/><text x="50" y="64" text-anchor="middle" font-size="42" font-weight="800" fill="#fff" font-family="var(--font-display),sans-serif">${u.esc(n)}</text>`;
  }

  /* ---------- Compagnons qui évoluent ---------- */
  const hex = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ""); return m ? [0, 2, 4].map(i => parseInt(m[1].substr(i, 2), 16)) : null; };
  const mix = (a, b, k) => { const x = hex(a), y = hex(b); if (!x || !y) return a; return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, "0")).join(""); };
  A.comps = () => AA.content.companions || [];
  /* Ancien choix (créature de l'aquarium) : on prend le compagnon de même forme. */
  A.comp = id => { const L = A.comps(); let f = L.find(c => c.id === id); if (!f) { const cr = (AA.content.creatures || []).find(c => c.id === id); f = cr && L.find(c => c.shape === cr.shape); } return f || L[0]; };
  A.colorsAt = (f, st) => st === 0 ? f.c.map(x => mix(x, "#FFFFFF", .45)) : st === 1 ? f.c.map(x => mix(x, "#FFFFFF", .18)) : st === 2 ? f.c : st === 3 ? f.c.map((x, i) => mix(x, f.L[i], .45)) : f.L;
  A.formName = (av, l) => { const st = A.stage(l); if (av.kind === "creature") { const f = A.comp(av.id); return f ? f.n[st] : ""; } return AA.i18n.raw("ava.stages")[st]; };
  function creature(av, st) {
    const f = A.comp(av.id); if (!f) return "";
    const s = [.42, .52, .62, .7, .78][st], cols = A.colorsAt(f, st), svg = AA.creature(f.shape, cols).replace(/^<svg[^>]*>|<\/svg>$/g, "");
    const top = 52 - 40 * s, gid = "cg" + (++uid);
    let o = `<path d="M6 92q44-14 88 0v10H6z" fill="#E9D7A8" opacity=".5"/>`;
    if (st >= 3) o += `<defs><radialGradient id="${gid}"><stop offset="0" stop-color="${f.L[1]}" stop-opacity=".55"/><stop offset="1" stop-color="${f.L[1]}" stop-opacity="0"/></radialGradient></defs><circle cx="50" cy="52" r="${30 + st * 3}" fill="url(#${gid})" class="ava-glow"/>`;
    if (st === 0) o += `<circle cx="50" cy="52" r="24" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.55)" stroke-width="1.2"/><path d="M38 40a14 14 0 0 1 10-6" stroke="rgba(255,255,255,.8)" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    o += `<g transform="translate(${50 - 60 * s} ${52 - 40 * s}) scale(${s})">${svg}</g>`;
    if (st >= 2) o += `<path d="M${50 - 6} ${top + 2}l3 -5 3 5 3 -5 3 5" fill="none" stroke="${st >= 3 ? "#F2C14E" : "rgba(255,255,255,.7)"}" stroke-width="1.6" stroke-linejoin="round" opacity="${st >= 4 ? 0 : .9}"/>`;
    if (st >= 4) o += `<path d="M40 ${top - 1}l3-9 4 6 3-8 3 8 4-6 3 9z" fill="#F2C14E" stroke="#8E5A00" stroke-width=".8"/><circle cx="50" cy="${top - 9}" r="1.6" fill="#FFF3C4"/>`;
    return o;
  }
  /* Grande scène d'évolution (une fois par nouvelle forme), comme dans les jeux. */
  A.checkEvolution = () => {
    const S = AA.S, l = A.level(), st = A.stage(l);
    if (S.evoSeen == null) { S.evoSeen = st; AA.store.save(true); return; }
    if (st <= S.evoSeen) return;
    const av = A.get(), from = A.STAGES[S.evoSeen], name0 = A.formName(av, from), name1 = A.formName(av, l);
    S.evoSeen = st; AA.store.save(true);
    setTimeout(() => {
      AA.ui.sheet(`<div class="evo-scene"><p class="eyebrow">${AA.t("ava.evoT")}</p>
        <div class="evo-stage"><div class="evo-old">${A.svg(av, from, "xl")}</div><div class="evo-new">${A.svg(av, l, "xl")}</div><div class="evo-flash"></div></div>
        <h3>${AA.t("ava.evoS", { a: u.esc(name0), b: u.esc(name1) })}</h3><p class="small muted">${AA.t("ava.evoLvl", { l })}</p>
        <button class="btn block" data-no>${AA.icon("check")} ${AA.t("ava.evoOk")}</button></div>`, AA.t("ava.evoT"));
      AA.fx.sfx.up(); AA.fx.burst(innerWidth / 2, innerHeight / 2, 50, "rgba(242,193,78,.9)");
    }, 400);
  };

  function diver(av, st) {
    const skin = A.SKINS[av.skin] || A.SKINS[1], hc = A.HAIRC[av.hairC] || A.HAIRC[0], suit = A.SUITS[av.suit] || A.SUITS[0];
    const hood = st >= 3, mask = st >= 1, reg = st >= 2;
    let o = "";
    /* bouteille derrière l'épaule */
    if (reg) o += `<rect x="16" y="52" width="14" height="44" rx="7" fill="#F0B73A"/><rect x="20" y="46" width="6" height="8" rx="2" fill="#7A8A94"/><path d="M23 47h-6" stroke="#7A8A94" stroke-width="3" stroke-linecap="round"/>`;
    /* cheveux longs (derrière) */
    if (!hood && av.hair === 1) o += `<path d="M33 44c-2 16 0 26 4 32h26c4-6 6-16 4-32z" fill="${hc}"/>`;
    /* corps */
    o += `<path d="M14 104c0-24 16-36 36-36s36 12 36 36z" fill="${suit}"/><path d="M40 70l10 14 10-14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3"/>`;
    if (st >= 4) o += `<path d="M22 86c10-6 18-8 28-8s18 2 28 8" fill="none" stroke="#F2C14E" stroke-width="2.5"/>`;
    if (reg) o += `<path d="M30 72l8 28M70 72l-8 28" stroke="#111B22" stroke-width="5" stroke-linecap="round"/><rect x="64" y="84" width="10" height="7" rx="2" fill="#111B22"/>`;
    o += `<rect x="44" y="58" width="12" height="12" rx="4" fill="${skin}"/>`;
    /* cagoule */
    if (hood) o += `<ellipse cx="50" cy="45" rx="19" ry="21" fill="#15232E"/>`;
    o += `<ellipse cx="50" cy="46" rx="15" ry="17" fill="${skin}"/>`;
    /* coiffures */
    if (!hood) o += [
      `<path d="M35 42c0-12 7-17 15-17s15 5 15 17c-4-5-9-8-15-8s-11 3-15 8z" fill="${hc}"/>`,
      `<path d="M34 46c-1-14 6-21 16-21s17 7 16 21c-3-7-9-11-16-11s-13 4-16 11z" fill="${hc}"/>`,
      `<circle cx="50" cy="24" r="7" fill="${hc}"/><path d="M35 42c0-12 7-17 15-17s15 5 15 17c-4-5-9-8-15-8s-11 3-15 8z" fill="${hc}"/>`,
      `<path d="M36 38c2-8 8-12 14-12s12 4 14 12c-4-3-9-4-14-4s-10 1-14 4z" fill="${hc}" opacity=".55"/>`
    ][av.hair] || "";
    if (hood) o += `<path d="M31 40c2-12 10-19 19-19s17 7 19 19c-5-6-11-9-19-9s-14 3-19 9z" fill="#15232E"/>`;
    /* yeux, bouche */
    const eyes = `<circle cx="44" cy="45" r="2.1" fill="#0B1620"/><circle cx="56" cy="45" r="2.1" fill="#0B1620"/>`;
    if (mask) {
      o += `<path d="M34 44h32" stroke="#0B1620" stroke-width="2.5"/><rect x="36.5" y="38" width="27" height="14" rx="5" fill="rgba(170,235,255,.55)" stroke="#0B1620" stroke-width="2.6"/>${eyes}<path d="M41 40.5l5 0" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>`;
    } else {
      o += `${eyes}<path d="M34 33h32" stroke="#0B1620" stroke-width="2"/><rect x="38" y="28" width="24" height="9" rx="4" fill="rgba(170,235,255,.55)" stroke="#0B1620" stroke-width="2.2"/>`;
    }
    if (reg) o += `<circle cx="50" cy="58" r="5" fill="#2B3A44"/><circle cx="50" cy="58" r="2" fill="#7A8A94"/><path d="M45 59c-8 2-14 0-20-8" fill="none" stroke="#2B3A44" stroke-width="2.5"/>`;
    else if (mask) o += `<path d="M47 57c2 2 5 2 7 0" fill="none" stroke="#7A3B2E" stroke-width="1.8" stroke-linecap="round"/><path d="M54 57h6c2 0 3-1 3-3V22" fill="none" stroke="#1B2A33" stroke-width="3" stroke-linecap="round"/><rect x="60.5" y="17" width="5" height="7" rx="2" fill="#FF7A3A"/>`;
    else o += `<path d="M45 56c3 3 7 3 10 0" fill="none" stroke="#7A3B2E" stroke-width="2" stroke-linecap="round"/><circle cx="40" cy="52" r="2.4" fill="#FF9A8A" opacity=".45"/><circle cx="60" cy="52" r="2.4" fill="#FF9A8A" opacity=".45"/>`;
    /* phare frontal */
    if (hood) o += `<path d="M58 28l30-12v20z" fill="rgba(255,240,170,.28)"/><rect x="52" y="24" width="10" height="7" rx="2.5" fill="#E8EEF2" stroke="#0B1620" stroke-width="1.4"/>`;
    return o;
  }

  /* ---------- Choisir son avatar ---------- */
  A.picker = onDone => {
    const t = AA.t, S = AA.S, lv = A.level();
    let cur = A.get();
    const sw = (key, arr) => `<div class="ava-sw" data-k="${key}">${arr.map((c, i) => `<button class="dot-sw" data-v="${i}" style="--c:${c}" aria-pressed="${cur[key] === i}" aria-label="${i + 1}"></button>`).join("")}</div>`;
    const body = () => `
      <div class="ava-pick">
        <div class="ava-prev">${A.svg(cur, lv, "xl")}</div>
        <div class="seg" role="group">${["diver", "creature", "letter"].map(k => `<button data-kind="${k}" aria-pressed="${cur.kind === k}">${t("ava.kind." + k)}</button>`).join("")}</div>
        ${cur.kind === "diver" ? `
          <p class="eyebrow">${t("ava.hair")}</p><div class="ava-opts">${Array.from({ length: A.HAIRS }, (_, i) => `<button class="ava-opt" data-hair="${i}" aria-pressed="${cur.hair === i}" aria-label="${AA.i18n.raw("ava.hairs")[i]}">${A.svg(Object.assign({}, cur, { hair: i }), 1)}</button>`).join("")}</div>
          <p class="eyebrow">${t("ava.hairC")}</p>${sw("hairC", A.HAIRC)}
          <p class="eyebrow">${t("ava.skin")}</p>${sw("skin", A.SKINS)}
          <p class="eyebrow">${t("ava.suit")}</p>${sw("suit", A.SUITS)}` : ""}
        ${cur.kind === "creature" ? `<p class="small muted" style="margin:0">${t("ava.compS", { n: A.comps().length })}</p>
          <div class="ava-comps">${A.comps().map(c => `<button class="ava-comp" data-cid="${c.id}" aria-pressed="${A.comp(cur.id) === c}">${A.svg({ kind: "creature", id: c.id }, lv)}<span>${u.esc(c.n[A.stage(lv)])}</span></button>`).join("")}</div>` : ""}
        ${cur.kind === "letter" ? `<p class="eyebrow">${t("ava.suit")}</p>${sw("suit", A.SUITS)}` : ""}
        <p class="eyebrow">${t("ava.evo")}</p>
        <div class="ava-evo">${A.STAGES.map((min, i) => `<div class="${lv >= min ? "" : "off"} ${A.stage(lv) === i ? "here" : ""}">${A.svg(cur, min)}<b>${t("ava.lvl", { l: min })}</b><span>${u.esc(A.formName(cur, min))}</span></div>`).join("")}</div>
        <button class="btn block" id="avok">${AA.icon("check")} ${t("ava.save")}</button>
      </div>`;
    const close = AA.ui.sheet(`<h3 style="margin:0 2.5rem var(--sp-3) 0">${t("ava.title")}</h3><div id="avbody">${body()}</div>`, t("ava.title"));
    const root = document.getElementById("avbody");
    const redraw = () => { root.innerHTML = body(); };
    root.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.id === "avok") { S.profile.avatar = cur; AA.store.save(true); AA.fx.sfx.ok(); close(); onDone && onDone(); return; }
      if (b.dataset.kind) { cur.kind = b.dataset.kind; if (cur.kind === "creature" && !A.comps().some(c => c.id === cur.id)) cur.id = A.comp(cur.id).id; }
      else if (b.dataset.hair) cur.hair = +b.dataset.hair;
      else if (b.dataset.cid) cur.id = b.dataset.cid;
      else if (b.dataset.v) cur[b.parentNode.dataset.k] = +b.dataset.v;
      else return;
      AA.fx.sfx.tap(); redraw();
    });
  };
})();
