/* =====================================================================
   Abysse Academy · recherche globale et glossaire illustré
   - AA.search.run(texte) cherche dans les cours, le glossaire, les cartes
     et les questions (sans tenir compte des accents ni des majuscules).
   - AA.gloss.open(id) ouvre la fiche d'un terme ; AA.gloss.link(el) rend
     les termes du glossaire cliquables dans un cours.
   Raccourcis clavier : « / » ou Ctrl+K ouvrent la recherche.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, fx = AA.fx, ui = AA.ui;
  const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, "'");
  const strip = html => { const d = document.createElement("div"); d.innerHTML = html || ""; u.$$("figure,svg", d).forEach(n => n.remove()); return d.textContent.replace(/\s+/g, " ").trim(); };

  /* ---------- Index ---------- */
  const S = (AA.search = {});
  let index = null;
  S.build = () => {
    index = [];
    const add = (type, title, text, go, extra) => index.push(Object.assign({ type, title, text, go, n: norm(title + " " + text), nt: norm(title) }, extra || {}));
    C.modules.forEach(m => {
      add("lesson", m.title, m.sub + " · " + strip(m.essentiel), "lesson/" + m.id, { m: m.id, icon: m.icon });
      if (m.approfondir) add("deep", m.title, strip(m.approfondir), "lesson/" + m.id + "/approfondir", { m: m.id, icon: "layers" });
      if (m.memo.length) add("memo", m.title, m.memo.map(x => x[0] + " : " + x[1]).join(" · "), "lesson/" + m.id + "/memo", { m: m.id, icon: "bulb" });
    });
    C.glossary.forEach(g => add("gloss", g.t, (g.alt || []).join(", ") + " · " + g.d, "glossary/" + g.id, { gid: g.id, icon: "book" }));
    C.cards.forEach(c => add("card", c.f, c.b, "flash/" + c.m, { m: c.m, icon: "cards" }));
    C.questions.forEach(q => add("question", q.q, q.c[q.a] + " · " + q.e, "lesson/" + q.m, { m: q.m, icon: "doubt" }));
    C.stories.forEach(s => add("story", s.title, s.sub, "story/" + s.id, { icon: "scroll" }));
    return index;
  };
  const W = { gloss: 6, lesson: 5, deep: 3, memo: 4, card: 2, story: 2, question: 1 };
  S.run = (q, max = 40) => {
    if (!index) S.build();
    const terms = norm(q).split(/\s+/).filter(x => x.length > 1); if (!terms.length) return [];
    return index.map(it => {
      if (!terms.every(x => it.n.includes(x))) return null;
      let sc = W[it.type] * 10; terms.forEach(x => { if (it.nt.includes(x)) sc += 25; if (it.nt.startsWith(x)) sc += 15; });
      return [sc, it];
    }).filter(Boolean).sort((a, b) => b[0] - a[0]).slice(0, max).map(x => x[1]);
  };
  /* Extrait autour du premier mot trouvé, mots surlignés. */
  S.snippet = (text, q, len = 150) => {
    const terms = norm(q).split(/\s+/).filter(x => x.length > 1), n = norm(text);
    let i = Math.min(...terms.map(x => { const k = n.indexOf(x); return k < 0 ? 1e9 : k; })); if (i === 1e9) i = 0;
    const a = Math.max(0, i - 50), part = text.slice(a, a + len), np = norm(part);
    let out = "", last = 0; const hits = [];
    terms.forEach(x => { let k = -1; while ((k = np.indexOf(x, k + 1)) >= 0) hits.push([k, k + x.length]); });
    hits.sort((x, y) => x[0] - y[0]).forEach(([s, e]) => { if (s < last) return; out += u.esc(part.slice(last, s)) + "<mark>" + u.esc(part.slice(s, e)) + "</mark>"; last = e; });
    return (a > 0 ? "… " : "") + out + u.esc(part.slice(last)) + (a + len < text.length ? " …" : "");
  };
  /* Surligne un mot dans un élément (utilisé à l'arrivée dans un cours). */
  S.mark = (root, q) => {
    const terms = norm(q).split(/\s+/).filter(x => x.length > 2); if (!terms.length || !root) return null;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let first = null; const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(nd => {
      if (nd.parentNode.closest("mark,button,svg")) return;
      const nt = norm(nd.data); const x = terms.find(z => nt.includes(z)); if (!x) return;
      const k = nt.indexOf(x), r = document.createRange(); r.setStart(nd, k); r.setEnd(nd, k + x.length);
      const m = document.createElement("mark"); m.className = "hl"; try { r.surroundContents(m); if (!first) first = m; } catch (e) {}
    });
    return first;
  };

  const TYPES = ["all", "lesson", "gloss", "card", "question"];
  AA.view("search", {
    tab: null, depth: 10,
    render(el, [arg]) {
      const st = AA.ctx.searchState || (AA.ctx.searchState = { q: arg || "", f: "all" });
      if (arg && arg !== st.q) st.q = arg;
      el.innerHTML = `${ui.head(t("search.title"), "home")}
        <div class="searchbox"><span>${AA.icon("search")}</span><input class="input" id="sq" type="search" enterkeyhint="search" autocomplete="off" placeholder="${t("search.ph")}" value="${u.esc(st.q)}" aria-label="${t("search.title")}"><kbd class="kbd">/</kbd></div>
        <div class="seg" id="sf" style="margin-top:var(--sp-3)">${TYPES.map(k => `<button data-f="${k}" aria-pressed="${st.f === k}">${t("search.f." + k)}</button>`).join("")}</div>
        <div id="sres" aria-live="polite"></div>`;
      const inp = u.$("#sq"), res = u.$("#sres");
      const draw = () => {
        const q = inp.value.trim(); st.q = q;
        if (q.length < 2) {
          const rec = (AA.S.searches || []).slice(-6).reverse(), sug = AA.i18n.raw("search.suggest") || [];
          res.innerHTML = `${rec.length ? `<div class="section-title"><h3>${t("search.recent")}</h3></div><div class="row">${rec.map(x => `<button class="chip" data-q="${u.esc(x)}">${AA.icon("refresh")} ${u.esc(x)}</button>`).join("")}</div>` : ""}
            <div class="section-title"><h3>${t("search.ideas")}</h3></div><div class="row">${sug.map(x => `<button class="chip pri" data-q="${u.esc(x)}">${u.esc(x)}</button>`).join("")}</div>
            <a class="card glossary-cta" href="#/glossary"><span class="medal">${AA.icon("book")}</span><span class="grow"><b>${t("gloss.title")}</b><span class="small muted">${t("gloss.cta", { n: C.glossary.length })}</span></span>${AA.icon("next")}</a>`;
          return;
        }
        let list = S.run(q, 80); if (st.f !== "all") list = list.filter(it => st.f === "lesson" ? /lesson|deep|memo|story/.test(it.type) : it.type === st.f);
        res.innerHTML = list.length ? `<p class="xs muted" style="margin:var(--sp-3) 0">${t("search.count", { n: list.length })}</p><div class="results">${list.map(it => `<a class="result" href="#/${it.go}" data-hl="${u.esc(q)}"><span class="ric">${AA.icon(it.icon || "book")}</span><span class="grow"><span class="eyebrow">${t("search.t." + it.type)}${it.m && it.type !== "lesson" ? " · " + u.esc(C.moduleTitle(it.m)) : ""}</span><b>${S.snippet(it.title, q, 90)}</b><span class="small muted">${S.snippet(it.text, q)}</span></span></a>`).join("")}</div>`
          : ui.empty("search", t("search.none"), t("search.noneS"));
      };
      const remember = () => { const q = inp.value.trim(); if (q.length < 2) return; const a = (AA.S.searches || []).filter(x => x !== q); a.push(q); AA.S.searches = a.slice(-12); AA.store.save(); };
      inp.oninput = u.debounce(draw, 120);
      inp.onkeydown = e => { if (e.key === "Enter") { remember(); const f = u.$(".result", res); if (f) f.focus(); } };
      u.on(el, "click", "[data-q]", (e, b) => { inp.value = b.dataset.q; draw(); inp.focus(); });
      u.on(el, "click", "[data-f]", (e, b) => { st.f = b.dataset.f; u.$$("#sf button").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); });
      u.on(el, "click", ".result", (e, a) => { remember(); AA.ctx.hl = a.dataset.hl; });
      draw();
      if (matchMedia("(pointer:fine)").matches || !st.q) setTimeout(() => inp.focus({ preventScroll: true }), 80);
    }
  });

  /* ---------- Glossaire ---------- */
  const G = (AA.gloss = {});
  const art = (g, big) => {
    if (g.art && g.art.startsWith("cr:")) return AA.creature(g.art.slice(3), null, "gl-cr");
    return `<span class="gl-art ${big ? "big" : ""}">${AA.icon(g.art || "book")}</span>`;
  };
  G.open = id => {
    const g = C.glossById[id]; if (!g) return;
    if (!AA.S.glossSeen[id]) { AA.S.glossSeen[id] = u.today(); AA.store.save(); AA.game.checkBadges(); }
    const m = g.m && C.byId[g.m];
    ui.sheet(`<div class="gl-sheet">${art(g, true)}<p class="eyebrow">${t("gloss.term")}</p><h3>${u.esc(g.t)}</h3>${g.alt && g.alt.length ? `<p class="xs muted">${t("gloss.alt")} ${g.alt.map(u.esc).join(", ")}</p>` : ""}
      <p>${u.esc(g.d)}</p>${g.dg && C.diagrams[g.dg] ? `<div class="gl-dg">${C.diagrams[g.dg]()}</div>` : ""}
      <div class="row">${AA.a11y.button(".gl-sheet > p:not(.eyebrow)", t("a11y.listen"))}${m ? `<a class="btn ghost sm" href="#/lesson/${m.id}">${AA.icon("book")} ${u.esc(m.title)}</a>` : ""}</div>
      ${g.see && g.see.length ? `<p class="eyebrow" style="margin-top:var(--sp-4)">${t("gloss.see")}</p><div class="row">${g.see.filter(x => C.glossById[x]).map(x => `<button class="chip pri" data-gl="${x}">${u.esc(C.glossById[x].t)}</button>`).join("")}</div>` : ""}</div>`, g.t);
  };
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-gl]"); if (!b) return;
    e.preventDefault(); const sh = b.closest(".sheet-wrap"); if (sh) sh.remove();
    fx.sfx.tap(); G.open(b.dataset.gl);
  });
  /* Termes cliquables dans un cours : la première occurrence de chaque terme. */
  let re = null, byWord = null;
  G.link = root => {
    if (!root || !C.glossary.length) return;
    if (!re) {
      byWord = {}; const words = [];
      C.glossary.forEach(g => [g.t].concat(g.alt || []).forEach(w => { if (w.length < 3 || /^[A-Z0-9₂]{2,4}$/.test(w) && w.length < 3) return; byWord[norm(w)] = g.id; words.push(w); }));
      words.sort((a, b) => b.length - a.length);
      re = new RegExp("(^|[^\\p{L}])(" + words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")(?=$|[^\\p{L}])", "iu");
    }
    const done = new Set(), walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(nd => {
      if (nd.parentNode.closest("h1,h2,h3,h4,pre,a,button,.formula,figure,svg,mark,.gl,th")) return;
      let node = nd, guard = 0;
      while (node && guard++ < 6) {
        const m = re.exec(node.data); if (!m) break;
        const id = byWord[norm(m[2])], start = m.index + m[1].length;
        if (!id || done.has(id)) { const rest = node.splitText(start + m[2].length); node = rest; continue; }
        done.add(id);
        const mid = node.splitText(start), after = mid.splitText(m[2].length);
        const b = document.createElement("button"); b.className = "gl"; b.dataset.gl = id; b.textContent = mid.data; b.setAttribute("aria-label", t("gloss.define", { t: mid.data }));
        mid.replaceWith(b); node = after;
      }
    });
  };

  AA.view("glossary", {
    tab: null, depth: 6,
    render(el, [id]) {
      const st = AA.ctx.glossState || (AA.ctx.glossState = { q: "" }), seen = Object.keys(AA.S.glossSeen).length;
      el.innerHTML = `${ui.head(t("gloss.title"), "search", `<span class="chip">${seen} / ${C.glossary.length}</span>`)}
        <p class="muted">${t("gloss.intro")}</p>
        <div class="searchbox"><span>${AA.icon("search")}</span><input class="input" id="gq" type="search" placeholder="${t("gloss.ph")}" value="${u.esc(st.q)}" aria-label="${t("gloss.ph")}"></div>
        <nav class="az" id="az" aria-label="${t("gloss.az")}"></nav><div id="glist"></div>`;
      const draw = () => {
        const q = norm(u.$("#gq").value.trim()); st.q = u.$("#gq").value;
        const list = C.glossary.filter(g => !q || norm(g.t + " " + (g.alt || []).join(" ") + " " + g.d).includes(q));
        const groups = {}; list.forEach(g => { const L = norm(g.t)[0].toUpperCase(); (groups[L] = groups[L] || []).push(g); });
        u.$("#az").innerHTML = Object.keys(groups).map(L => `<a href="#gl-${L}" data-az="${L}">${L}</a>`).join("");
        u.$("#glist").innerHTML = list.length ? Object.entries(groups).map(([L, gs]) => `<h3 class="az-h" id="gl-${L}">${L}</h3><div class="gl-grid">${gs.map(g => `<button class="gl-card ${AA.S.glossSeen[g.id] ? "seen" : ""}" data-gl="${g.id}">${art(g)}<span class="grow"><b>${u.esc(g.t)}</b><span class="small muted">${u.esc(g.d.length > 92 ? g.d.slice(0, 90) + "…" : g.d)}</span></span></button>`).join("")}</div>`).join("") : ui.empty("book", t("search.none"), "");
      };
      u.$("#gq").oninput = u.debounce(draw, 100);
      u.on(el, "click", "[data-az]", (e, a) => { e.preventDefault(); const h = u.$("#gl-" + a.dataset.az); if (h) h.scrollIntoView({ behavior: AA.a11y.reduced() ? "auto" : "smooth" }); });
      draw();
      if (id) setTimeout(() => G.open(id), 200);
    }
  });

  document.addEventListener("keydown", e => {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || u.$(".sheet-wrap")) return;
    if (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) { e.preventDefault(); if (AA.router.name === "search") u.$("#sq").focus(); else AA.router.go("search"); }
  });
})();
