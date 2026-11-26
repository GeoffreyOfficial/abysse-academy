/* =====================================================================
   Abysse Academy 2.1 · recherche repensée
   - Index : cours, passages (chaque intertitre), notions du tuteur,
     « À retenir », glossaire, flashcards, questions, outils et écrans.
   - Tolérante : accents, majuscules, pluriels, fautes de frappe (distance
     d'édition), synonymes de plongée (content/fr/search2.js).
   - Résultats groupés par type avec un meilleur résultat en aperçu,
     filtres par type et par niveau, statut lu / à lire, lien direct vers
     le passage (le cours défile jusqu'à l'intertitre et surligne le mot).
   - Clavier : Ctrl K ou / partout, flèches, Entrée, Échap.
   AA.search.run(q) garde son ancien contrat (liste d'éléments triés).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, fx = AA.fx, ui = AA.ui, G = AA.game;
  const S = AA.search, esc = u.esc;
  const base = s => String(s || "").toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, "'");
  /* Mot ramené à une forme simple : pluriels, finales courantes. */
  const stem = w => w.length > 4 && /(aux)$/.test(w) ? w.slice(0, -3) + "al" : w.length > 3 && /[sx]$/.test(w) ? w.slice(0, -1) : w;
  const toks = s => base(s).replace(/[^a-z0-9']+/g, " ").split(/[\s']+/).filter(Boolean);
  const N = s => " " + toks(s).map(stem).join(" ") + " ";
  const strip = html => { const d = document.createElement("div"); d.innerHTML = html || ""; u.$$("figure,svg,[data-diagram]", d).forEach(n => n.remove()); return d.textContent.replace(/\s+/g, " ").trim(); };
  const T = () => AA.tutor;
  const isRead = mid => !T() || T().isRead(mid);

  /* ---------- Index ---------- */
  let index = null, vocab = null, synIdx = null;
  const sectionsOf = (html, mid, tab) => {
    const d = document.createElement("div"); d.innerHTML = html || ""; u.$$("figure,svg,[data-diagram]", d).forEach(n => n.remove());
    const out = []; let cur = null;
    Array.from(d.childNodes).forEach(nd => {
      if (nd.nodeType === 1 && /^H[234]$/.test(nd.tagName)) { cur = { h: nd.textContent.trim(), txt: "" }; out.push(cur); }
      else if (cur) cur.txt += " " + (nd.textContent || "");
    });
    return out.filter(x => x.h).map(x => ({ h: x.h, txt: x.txt.replace(/\s+/g, " ").trim(), mid, tab }));
  };
  S.build = () => {
    index = [];
    const add = (type, title, text, go, extra) => {
      const it = Object.assign({ type, title, text: text || "", go }, extra || {});
      if (it.m && !it.w && C.byId[it.m]) it.w = C.byId[it.m].world;
      it.nt = N(title); it.n = N(title + " " + (it.alt || "") + " " + it.text);
      index.push(it);
    };
    C.modules.forEach(m => {
      add("lesson", m.title, (m.sub || "") + " · " + strip(m.essentiel), "lesson/" + m.id, { m: m.id, icon: m.icon || "book" });
      sectionsOf(m.essentiel, m.id, "essentiel").concat(m.approfondir ? sectionsOf(m.approfondir, m.id, "approfondir") : [])
        .forEach(s => add("section", s.h, s.txt, "lesson/" + m.id + "/" + s.tab, { m: m.id, sec: s.h, icon: s.tab === "approfondir" ? "layers" : "book" }));
      (m.memo || []).forEach(([a, b]) => add("memo", a, b, "lesson/" + m.id + "/memo", { m: m.id, hl: a, icon: "bulb" }));
      if (T()) T().notions(m.id).filter(n => !n.gen && C.notions && C.notions[m.id]).forEach(n => add("notion", n.t, m.title, "lesson/" + m.id, { m: m.id, nid: n.id, icon: "target", alt: n.hl || "" }));
    });
    C.glossary.forEach(g => add("gloss", g.t, g.d, "glossary/" + g.id, { gid: g.id, m: g.m, alt: (g.alt || []).join(" "), icon: "book" }));
    C.cards.forEach(c => add("card", c.f, c.b, "flash/" + c.m, { m: c.m, icon: "cards" }));
    C.questions.forEach(q => add("question", q.q, q.c[q.a] + " · " + (q.e || ""), "lesson/" + q.m, { m: q.m, q, icon: "doubt" }));
    /* Outils : les fiches d'aide qui mènent à un écran encore présent. */
    const live = k => { const v = AA.views[k.split("/")[0]]; if (!v) return false; try { return !v.guard || v.guard([]) !== false; } catch (e) { return true; } };
    const seen = new Set();
    Object.keys(C.help || {}).forEach(k => {
      const h = C.help[k]; if (!h || !h.go || !live(h.go) || seen.has(h.go)) return; seen.add(h.go);
      add("tool", h.t, strip(h.html), h.go, { icon: h.ic || "compass" });
    });
    [["examen", "sr.b.exam", "exam"], ["glossary", "sr.b.gloss", "book"], ["cours", "sr.b.cours", "book"], ["progres", "sr.b.progres", "chart"], ["fiches", "sr.b.fiches", "download"], ["settings", "nav.settings", "gear"], ["backup", "sr.b.backup", "save"]]
      .forEach(([go, k, ic]) => { if (live(go) && !seen.has(go)) { seen.add(go); add("tool", t(k), "", go, { icon: ic }); } });
    /* Vocabulaire pour corriger les fautes. */
    vocab = new Map(); index.forEach(it => it.n.trim().split(" ").forEach(w => { if (w.length >= 4) vocab.set(w, (vocab.get(w) || 0) + 1); }));
    synIdx = (C.synonyms || []).map(g => g.map(x => N(x).trim()));
    return index;
  };

  /* ---------- Requête : termes, synonymes, fautes ---------- */
  const dist = (a, b, max) => {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j), pp = null;
    for (let i = 1; i <= a.length; i++) {
      const cur = [i]; let best = i;
      for (let j = 1; j <= b.length; j++) {
        let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (pp && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, pp[j - 2] + 1);
        cur.push(v); if (v < best) best = v;
      }
      if (best > max) return max + 1; pp = prev; prev = cur;
    }
    return prev[b.length];
  };
  const has = (n, alt) => alt.length <= 3 ? n.includes(" " + alt + " ") : n.includes(alt);
  S.parse = q => {
    if (!index) S.build();
    let rest = N(q); const terms = [];
    /* 1. groupes de synonymes (expressions de plusieurs mots d'abord) */
    synIdx.forEach(g => {
      const hit = g.slice().sort((a, b) => b.length - a.length).find(x => rest.includes(" " + x + " "));
      if (hit) { rest = rest.replace(" " + hit + " ", " "); terms.push({ label: hit, alts: [hit], syn: g.filter(x => x !== hit), fz: [] }); }
    });
    /* 2. mots restants (au moins 2 lettres) + corrections */
    rest.trim().split(" ").filter(w => w.length > 1).forEach(w => {
      const tm = { label: w, alts: [w], syn: [], fz: [] };
      const known = w.length < 4 || [...vocab.keys()].some(v => v.includes(w));
      if (!known) {
        const max = w.length >= 7 ? 2 : 1;
        tm.fz = [...vocab.entries()].map(([v, f]) => [v, dist(w, v, max), f]).filter(x => x[1] <= max).sort((a, b) => a[1] - b[1] || b[2] - a[2]).slice(0, 4).map(x => x[0]);
        /* une correction peut tomber dans un groupe de synonymes */
        tm.fz.forEach(v => { const g = synIdx.find(gr => gr.includes(v)); if (g) g.forEach(x => { if (x !== v && !tm.syn.includes(x)) tm.syn.push(x); }); });
      }
      terms.push(tm);
    });
    return terms;
  };
  const W = { gloss: 58, lesson: 55, notion: 50, tool: 46, section: 44, memo: 38, card: 22, question: 14 };
  S.query = (q, opts) => {
    opts = opts || {};
    const terms = S.parse(q); if (!terms.length) return { list: [], terms };
    const phrase = N(q).trim(), goal = G.goalWorld();
    const scoreIt = (it, need) => {
      let sc = W[it.type] || 10, got = 0;
      for (const tm of terms) {
        let m = 0;
        if (tm.alts.some(a => has(it.nt, a))) m = 3; else if (tm.alts.some(a => has(it.n, a))) m = 2;
        else if (tm.syn.some(a => has(it.nt, a))) m = 2.2; else if (tm.syn.some(a => has(it.n, a))) m = 1.4;
        else if (tm.fz.some(a => has(it.nt, a))) m = 1.8; else if (tm.fz.some(a => has(it.n, a))) m = 1;
        if (m) { got++; sc += m * 12; if (m === 3 && tm.alts.some(a => it.nt.startsWith(" " + a))) sc += 14; }
      }
      if (got < need) return 0;
      if (phrase.length > 2 && it.nt.includes(phrase)) sc += 40; else if (phrase.length > 2 && it.n.includes(phrase)) sc += 10;
      if (it.w === goal) sc += 8;
      if (it.type === "question" && it.m && !isRead(it.m)) sc -= 6;
      return sc;
    };
    const run = need => index.map(it => [scoreIt(it, need), it]).filter(x => x[0] > 0);
    let res = run(terms.length), partial = false;
    if (!res.length && terms.length > 1) { res = run(Math.ceil(terms.length / 2)); partial = res.length > 0; }
    let list = res.sort((a, b) => b[0] - a[0]).map(x => x[1]);
    if (opts.lv && opts.lv !== "all") list = list.filter(it => it.w === opts.lv || (!it.w && it.type === "tool"));
    const fuzzy = terms.some(tm => tm.fz.length && !list.slice(0, 5).some(it => tm.alts.some(a => has(it.n, a))));
    return { list, terms, partial, fuzzy };
  };
  /* Ancien contrat : liste triée d'éléments. */
  S.run = (q, max = 40) => S.query(q).list.slice(0, max);
  /* Termes à surligner : mots tapés, corrections et synonymes réellement présents. */
  const hlTerms = (terms, it) => {
    const out = [];
    terms.forEach(tm => tm.alts.concat(tm.fz, tm.syn).forEach(a => { if (it ? has(it.n, a) : true) out.push(a); }));
    return out;
  };
  S.snippet2 = (text, words, len = 160) => {
    const T0 = String(text || ""), map = []; let nb = "";
    /* texte normalisé caractère par caractère, avec correspondance des positions */
    for (let i = 0; i < T0.length; i++) { const c = base(T0[i]).replace(/[^a-z0-9]/g, " ") || " "; for (const ch of c.slice(0, 1)) { nb += ch; map.push(i); } }
    const hits = [];
    /* Une expression se surligne en entier ; les mots très courts seulement s'ils sont tapés seuls. */
    words.forEach(w => { [w].forEach(x => { if (x.length < 2) return; let k = -1; while ((k = nb.indexOf(x, k + 1)) >= 0) { if (x.length <= 3 && (/[a-z0-9]/.test(nb[k - 1] || " ") || /[a-z0-9]/.test(nb[k + x.length] || " "))) continue; let e = k + x.length; while (e < nb.length && /[a-z]/.test(nb[e]) && e - k < x.length + 3) e++; hits.push([k, e]); } }); });
    hits.sort((a, b) => a[0] - b[0]);
    const first = hits.length ? hits[0][0] : 0, a = Math.max(0, first - 50), b = Math.min(T0.length, a + len);
    let out = "", last = a;
    hits.forEach(([s, e]) => { const S0 = map[s], E0 = (map[e - 1] || 0) + 1; if (S0 < last || E0 > b) return; out += esc(T0.slice(last, S0)) + "<mark>" + esc(T0.slice(S0, E0)) + "</mark>"; last = E0; });
    return (a > 0 ? "… " : "") + out + esc(T0.slice(last, b)) + (b < T0.length ? " …" : "");
  };

  /* ---------- Arrivée dans un cours : défiler jusqu'au passage ---------- */
  S.goTo = (it, q) => {
    /* Passage : on défile jusqu'à l'intertitre (sans surligner tout le cours). */
    const ctx = it.sec ? { sec: it.sec } : { hl: it.hl || q };
    if (it.type === "notion" && T()) return T().openNotion(it.nid);
    if (it.type === "gloss") return AA.gloss.open(it.gid);
    AA.router.go(it.go, ctx);
  };
  S.toSection = (root, sec) => {
    if (!root || !sec) return null; const k = N(sec);
    const h = u.$$("h2,h3,h4", root).find(x => N(x.textContent) === k); if (!h) return null;
    h.classList.add("sr-flash"); setTimeout(() => h.classList.remove("sr-flash"), 2400);
    return h;
  };

  /* ---------- Écran ---------- */
  const st = { q: "", f: "all", lv: "all" };
  const FILTERS = { all: null, lesson: ["lesson", "section", "memo"], notion: ["notion"], gloss: ["gloss"], tool: ["tool"], card: ["card"], question: ["question"] };
  const GROUPS = ["lesson", "section", "notion", "gloss", "memo", "tool", "card", "question"];
  const wTag = w => w && C.worldById[w] ? `<span class="chip xs sr-lv">${esc(C.worldById[w].short || C.worldById[w].title)}</span>` : "";
  const readTag = it => it.m && T() && ["section", "notion", "memo"].includes(it.type) ? (isRead(it.m) ? "" : `<span class="chip xs warn">${t("tu.st.toread")}</span>`) : "";
  const ctxLine = it => it.m && it.type !== "lesson" && C.byId[it.m] ? esc(C.byId[it.m].title) : "";
  const row = (it, i, words) => {
    if (it.type === "question") {
      const q = it.q, rd = isRead(q.m);
      return `<details class="sr-row sr-q" data-i="${i}"><summary data-sr tabindex="0"><span class="ric">${AA.icon("doubt")}</span><span class="grow"><span class="sr-eb">${t("sr.g.question")} · ${ctxLine(it)} ${wTag(it.w)}</span><b>${S.snippet2(it.title, words, 220)}</b></span><span class="sr-chev">${AA.icon("next")}</span></summary>
        <div class="sr-ans">${rd ? "" : `<p class="xs muted">${t("sr.unreadQ")}</p>`}<p><b>${AA.icon("check")} ${esc(q.c[q.a])}</b></p>${q.e ? `<p class="small muted">${esc(q.e)}</p>` : ""}<button class="btn ghost sm" data-open="${i}">${AA.icon("book")} ${t("sr.course")}</button></div></details>`;
    }
    const sub = it.type === "notion" ? `${esc(C.byId[it.m].title)}` : S.snippet2(it.text, words, it.type === "tool" ? 120 : 170);
    const nchip = it.type === "notion" && T() ? `<span class="chip xs">${t("tu.n." + T().nState(it.nid))}</span>` : it.type === "lesson" && T() ? T().chip(it.m) : "";
    return `<a class="sr-row" href="#/${esc(it.go || "")}" data-open="${i}" data-sr><span class="ric">${AA.icon(it.icon || "book")}</span><span class="grow"><span class="sr-eb">${t("sr.g." + it.type)}${ctxLine(it) && it.type !== "notion" ? " · " + ctxLine(it) : ""} ${wTag(it.w)} ${readTag(it)}</span><b>${S.snippet2(it.title, words, 120)}</b>${sub ? `<span class="small muted sr-sub">${sub}</span>` : ""}${nchip ? `<span class="sr-chips">${nchip}</span>` : ""}</span></a>`;
  };
  const bestCard = (it, i, words) => {
    let art = `<span class="medal">${AA.icon(it.icon || "book")}</span>`, body = "", btns = "";
    const rd = it.m ? isRead(it.m) : true;
    if (it.type === "gloss") {
      const g = C.glossById[it.gid];
      if (g && g.art && g.art.startsWith("cr:")) art = `<span class="sr-art">${AA.creature(g.art.slice(3), null, "gl-cr")}</span>`;
      body = `<p>${S.snippet2(g ? g.d : it.text, words, 320)}</p>${g && g.alt && g.alt.length ? `<p class="xs muted">${t("gloss.alt")} ${g.alt.map(esc).join(", ")}</p>` : ""}`;
      btns = `<button class="btn" data-open="${i}">${AA.icon("book")} ${t("sr.sheet")}</button>${g && g.m && C.byId[g.m] ? `<a class="btn ghost" href="#/lesson/${g.m}" data-hlq>${esc(C.byId[g.m].title)}</a>` : ""}`;
    } else if (it.type === "lesson") {
      const m = C.byId[it.m];
      body = `<p class="muted">${esc(m.sub || "")}</p><p class="small">${S.snippet2(it.text, words, 240)}</p><div class="row">${T() ? T().chip(m.id) : ""}${wTag(it.w)}</div>`;
      btns = `<button class="btn" data-open="${i}">${AA.icon("book")} ${t("sr.read")}</button>${rd ? `<button class="btn ghost" data-tuquiz="${m.id}">${AA.icon("play")} ${t("sr.quiz")}</button>` : ""}`;
    } else if (it.type === "notion") {
      body = `<p class="muted">${esc(C.byId[it.m].title)} ${wTag(it.w)} ${T() ? `<span class="chip xs">${t("tu.n." + T().nState(it.nid))}</span>` : ""}</p>`;
      btns = `<button class="btn" data-open="${i}">${AA.icon("book")} ${t("sr.passage")}</button>${rd && T() ? `<button class="btn ghost" data-tudrill="${it.nid}">${AA.icon("target")} ${t("sr.drill")}</button>` : `<span class="chip warn">${t("sr.readFirst")}</span>`}`;
    } else if (it.type === "question") {
      const q = it.q;
      body = `<details class="sr-reveal"><summary class="btn ghost sm">${t("sr.answer")}</summary><p><b>${esc(q.c[q.a])}</b></p>${q.e ? `<p class="small muted">${esc(q.e)}</p>` : ""}</details>`;
      btns = `<button class="btn ghost" data-open="${i}">${AA.icon("book")} ${t("sr.course")}</button>`;
    } else {
      body = `<p class="small">${S.snippet2(it.text, words, 260)}</p>${it.m ? `<p class="xs muted">${ctxLine(it)} ${wTag(it.w)} ${readTag(it)}</p>` : ""}`;
      btns = `<button class="btn" data-open="${i}">${AA.icon(it.type === "section" ? "book" : "next")} ${t(it.type === "section" || it.type === "memo" ? "sr.passage" : "sr.open")}</button>`;
    }
    return `<section class="card sr-best"><p class="eyebrow">${t("sr.best")} · ${t("sr.g." + it.type)}</p><div class="sr-best-h">${art}<h2>${S.snippet2(it.title, words, 160)}</h2></div>${body}<div class="row sr-btns">${btns}</div></section>`;
  };

  AA.view("search", {
    tab: null, depth: 10,
    render(el, [arg]) {
      if (arg != null && arg !== "") st.q = decodeURIComponent(arg);
      const pc = matchMedia("(pointer:fine)").matches;
      const goal = G.goalWorld(), worlds = C.worlds.filter(w => !w.soon);
      const wrap = document.createElement("div"); wrap.className = "srch";
      wrap.innerHTML = `${ui.head(t("search.title"), "home")}
        <div class="sr-top">
          <div class="searchbox sr-box"><span>${AA.icon("search")}</span><input class="input" id="sq" type="search" enterkeyhint="search" autocomplete="off" spellcheck="false" placeholder="${t(pc ? "sr.phPc" : "sr.ph")}" value="${esc(st.q)}" aria-label="${t("search.title")}" aria-controls="sres"><button class="iconbtn sr-x" id="sx" aria-label="${t("sr.clear")}" ${st.q ? "" : "hidden"}>${AA.icon("close")}</button></div>
          <div class="sr-filters"><div class="seg sr-types" id="sf" role="group"></div>
          <div class="sr-lvs" role="group" aria-label="${t("sr.lvLabel")}"><button class="chip" data-lv="all" aria-pressed="${st.lv === "all"}">${t("sr.lvAll")}</button>${worlds.map(w => `<button class="chip" data-lv="${w.id}" aria-pressed="${st.lv === w.id}">${esc(w.short || w.title)}${w.id === goal ? " ★" : ""}</button>`).join("")}</div></div>
        </div>
        <div id="sres" class="sr-res" aria-live="polite"></div>`;
      el.innerHTML = ""; el.appendChild(wrap);
      const inp = u.$("#sq", wrap), res = u.$("#sres", wrap), sf = u.$("#sf", wrap), sx = u.$("#sx", wrap);
      let shown = [];
      const remember = () => { const q = st.q.trim(); if (q.length < 2) return; const a = (AA.S.searches || []).filter(x => x !== q); a.push(q); AA.S.searches = a.slice(-12); AA.store.save(); };
      const drawTypes = counts => {
        sf.innerHTML = Object.keys(FILTERS).map(k => `<button data-f="${k}" aria-pressed="${st.f === k}">${t("sr.f." + k)}${counts && counts[k] != null ? ` <span class="sr-n">${counts[k]}</span>` : ""}</button>`).join("");
      };
      const home = () => {
        drawTypes(null);
        const rec = (AA.S.searches || []).slice(-8).reverse(), sug = AA.i18n.raw("search.suggest") || [];
        const gaps = T() ? T().gaps().slice(0, 3) : [], nx = T() ? T().nextToRead(goal) : null;
        const tiles = [["glossary", "sr.b.gloss", "book"], ["cours", "sr.b.cours", "book"], ["examen", "sr.b.exam", "exam"], ["flash", "sr.b.flash", "cards"], ["fiches", "sr.b.fiches", "download"], ["progres", "sr.b.progres", "chart"]].filter(x => AA.views[x[0]]);
        res.innerHTML = `${gaps.length || nx ? `<section class="sr-sec"><h3 class="sr-h">${t("sr.forYou")}</h3><div class="sr-chips">${nx ? `<a class="chip pri" href="#/lesson/${nx.id}">${AA.icon("book")} ${t("sr.next", { t: esc(nx.title) })}</a>` : ""}${gaps.map(g => `<button class="chip warn" data-tunotion="${g.id}">${AA.icon("target")} ${t("sr.gap", { n: esc(g.n.t) })}</button>`).join("")}</div></section>` : ""}
          ${rec.length ? `<section class="sr-sec"><div class="row between"><h3 class="sr-h">${t("sr.recent")}</h3><button class="btn ghost sm" id="srclr">${t("sr.clear")}</button></div><div class="sr-chips">${rec.map(x => `<button class="chip" data-q="${esc(x)}">${AA.icon("refresh")} ${esc(x)}</button>`).join("")}</div></section>` : ""}
          <section class="sr-sec"><h3 class="sr-h">${t("sr.ideas")}</h3><div class="sr-chips">${sug.map(x => `<button class="chip pri" data-q="${esc(x)}">${esc(x)}</button>`).join("")}</div></section>
          <section class="sr-sec"><h3 class="sr-h">${t("sr.browse")}</h3><div class="sr-browse">${tiles.map(([go, k, ic]) => `<a class="sr-tile" href="#/${go}"><span class="ric">${AA.icon(ic)}</span><b>${t(k)}</b></a>`).join("")}</div></section>
          <p class="xs muted sr-tip">${AA.icon("bulb")} ${t("sr.tip")}${pc ? "<br>" + t("sr.tipPc") : ""}</p>`;
        const c = u.$("#srclr", res); if (c) c.onclick = () => { AA.S.searches = []; AA.store.save(); home(); };
      };
      const draw = () => {
        const q = inp.value.trim(); st.q = q; sx.hidden = !q;
        if (q.length < 2) { shown = []; return home(); }
        const R = S.query(q, { lv: st.lv }), all = R.list;
        const counts = {}; Object.keys(FILTERS).forEach(k => { counts[k] = FILTERS[k] ? all.filter(it => FILTERS[k].includes(it.type)).length : all.length; });
        drawTypes(counts);
        const list = FILTERS[st.f] ? all.filter(it => FILTERS[st.f].includes(it.type)) : all;
        shown = list;
        const words = hlTerms(R.terms);
        if (!list.length) {
          const did = [...new Set(R.terms.flatMap(tm => tm.fz))].slice(0, 4);
          res.innerHTML = `<div class="card soft center empty sr-empty"><div class="medal" style="margin:0 auto 10px">${AA.icon("search")}</div><h3>${t("sr.noneT", { q: esc(q) })}</h3><p class="muted">${t("sr.noneS")}</p>
            ${did.length ? `<p class="small">${t("sr.did")}</p><div class="sr-chips center">${did.map(x => `<button class="chip pri" data-q="${esc(x)}">${esc(x)}</button>`).join("")}</div>` : ""}
            <div class="row center" style="margin-top:var(--sp-3)">${st.f !== "all" || st.lv !== "all" ? `<button class="btn" id="srall">${t("sr.noFilters")}</button>` : ""}<a class="btn ghost" href="#/glossary">${t("sr.b.gloss")}</a></div></div>`;
          const b = u.$("#srall", res); if (b) b.onclick = () => { st.f = "all"; st.lv = "all"; u.$$("[data-lv]", wrap).forEach(x => x.setAttribute("aria-pressed", x.dataset.lv === "all")); draw(); };
          return;
        }
        const syn = [...new Set(R.terms.flatMap(tm => tm.syn))].filter(x => all.slice(0, 20).some(it => has(it.n, x))).slice(0, 4);
        let html = `<div class="sr-meta">${R.partial ? `<p class="small">${t("sr.partial")}</p>` : ""}${R.fuzzy ? `<p class="small">${t("sr.fuzzy", { q: esc([...new Set(R.terms.flatMap(tm => tm.fz.length ? [tm.fz[0]] : [tm.label]))].join(" ")) })}</p>` : ""}<p class="xs muted">${t("search.count", { n: list.length })}${syn.length ? " · " + t("sr.syn", { s: esc(syn.join(", ")) }) : ""}</p></div>`;
        html += bestCard(list[0], 0, words);
        if (st.f === "all") {
          const grp = g => {
            const items = list.map((it, i) => [it, i]).filter(([it, i]) => i > 0 && it.type === g); if (!items.length) return "";
            const f = Object.keys(FILTERS).find(k => FILTERS[k] && FILTERS[k].includes(g)), lim = g === "question" || g === "card" ? 3 : 4;
            return `<section class="sr-grp"><div class="row between sr-grp-h"><h3 class="sr-h">${t("sr.g." + g)} <span class="sr-n">${items.length}</span></h3>${items.length > lim ? `<button class="btn ghost sm" data-f="${f}">${t("sr.more", { n: items.length })}</button>` : ""}</div><div class="sr-list">${items.slice(0, lim).map(([it, i]) => row(it, i, hlTerms(R.terms, it))).join("")}</div></section>`;
          };
          /* Questions en pleine largeur sous les autres groupes (réponse dépliable). */
          html += `<div class="sr-groups">${GROUPS.filter(g => g !== "question").map(grp).join("")}</div>${grp("question")}`;
        } else {
          html += `<div class="sr-list sr-flat">${list.slice(1, 80).map((it, k) => row(it, k + 1, hlTerms(R.terms, it))).join("")}</div>`;
        }
        res.innerHTML = html;
      };
      const open = i => { const it = shown[i]; if (!it) return; remember(); fx.sfx.tap(); S.goTo(it, st.q); };
      inp.oninput = u.debounce(draw, 110);
      inp.onkeydown = e => {
        if (e.key === "Enter") { e.preventDefault(); remember(); if (shown.length) open(0); }
        else if (e.key === "ArrowDown") { e.preventDefault(); const f = u.$("[data-sr], .sr-best .btn", res); if (f) f.focus(); }
        else if (e.key === "Escape" && inp.value) { e.preventDefault(); e.stopPropagation(); inp.value = ""; draw(); }
      };
      sx.onclick = () => { inp.value = ""; draw(); inp.focus(); };
      res.addEventListener("keydown", e => {
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
        const items = u.$$("[data-sr], .sr-best .btn", res), k = items.indexOf(document.activeElement); if (k < 0) return;
        e.preventDefault(); const n = items[k + (e.key === "ArrowDown" ? 1 : -1)]; if (n) n.focus(); else if (e.key === "ArrowUp") inp.focus();
      });
      wrap.addEventListener("click", e => {
        const q = e.target.closest("[data-q]"); if (q) { inp.value = q.dataset.q; draw(); remember(); inp.focus(); return; }
        const f = e.target.closest("[data-f]"); if (f) { st.f = f.dataset.f; draw(); window.scrollTo({ top: 0 }); return; }
        const lv = e.target.closest("[data-lv]"); if (lv) { st.lv = lv.dataset.lv; u.$$("[data-lv]", wrap).forEach(x => x.setAttribute("aria-pressed", x === lv)); draw(); return; }
        const o = e.target.closest("[data-open]"); if (o) { e.preventDefault(); open(+o.dataset.open); return; }
        if (e.target.closest("[data-hlq]")) { remember(); AA.ctx.hl = st.q; return; }
        if (e.target.closest("[data-tuquiz],[data-tudrill],[data-tunotion],.sr-tile,a.chip")) remember();
      });
      draw();
      if (pc || !st.q) setTimeout(() => { inp.focus({ preventScroll: true }); const L = inp.value.length; try { inp.setSelectionRange(L, L); } catch (e) {} }, 80);
    }
  });
  /* L'index dépend du contenu et du tuteur : on le refait si le contenu change (langue, ajouts). */
  S.reset = () => { index = null; };
})();
