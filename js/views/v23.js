/* =====================================================================
   Abysse Academy 2.3 · « Explique-moi » refait
   - Plus aucun défilement automatique : l'élève avance avec Suite / Retour
     (boutons, flèches du clavier, glissement du doigt).
   - Chaque mini-cours part de LA question ratée : ta réponse, la bonne,
     un schéma « situation → ce qui se passe → donc » construit pour cette
     question, puis le passage du cours qui traite exactement ce point
     (avec son schéma s'il en a un), la méthode de calcul si besoin, et
     l'essentiel à retenir.
   - Pas de grand vide : chaque étape a un contenu, le schéma est toujours
     affiché quand il existe.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, ui = AA.ui, fx = AA.fx, Q = AA.quiz;
  const S = () => AA.S;

  const STOP = new Set("les des une est que qui par sur pas son ses aux mes tes ton mon ils elle car ont fut sera peu bien non oui avec dans pour avec plus elle elles sont quand cette etre fait faire quoi quel quelle quels quelles leur leurs mais donc ainsi aussi comme tout tous toute toutes entre chez sans sous vers apres avant depuis encore meme moins tres peut doit avoir cela celui celle ceux votre notre vous nous elle-meme lorsque alors parce chaque autre autres combien environ seulement toujours jamais rien".split(" "));
  const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const words = s => new Set((norm(s).match(/[a-z0-9₂]{3,}/g) || []).filter(w => !STOP.has(w)).map(w => w.replace(/(es|s|x)$/, "")));
  const overlap = (a, b) => { let n = 0; a.forEach(w => { if (b.has(w)) n++; }); return n; };
  const reOk = re => { try { return new RegExp(re, "i"); } catch (e) { return null; } };
  const txt = h => { const d = document.createElement("div"); d.innerHTML = h || ""; return d.textContent.replace(/\s+/g, " ").trim(); };
  const short = (s, n) => (s.length > n ? s.slice(0, s.lastIndexOf(" ", n - 1)) + "…" : s);

  /* Découpe un cours en passages (un passage = un intertitre et ce qui suit). */
  function sections(m) {
    const out = [];
    [["essentiel", m.essentiel], ["approfondir", m.approfondir]].forEach(([tab, html]) => {
      if (!html) return;
      const d = document.createElement("div"); d.innerHTML = html;
      let cur = { title: tab === "essentiel" ? m.title : "", tab, nodes: [] };
      Array.from(d.children).forEach(n => {
        if (n.tagName === "H3") { if (cur.nodes.length) out.push(cur); cur = { title: n.textContent.trim(), tab, nodes: [] }; }
        else if (!(n.classList.contains("callout") && /valider|hypoth/i.test(n.textContent))) cur.nodes.push(n);
      });
      if (cur.nodes.length) out.push(cur);
    });
    return out;
  }

  /* Le passage du cours qui répond le mieux à la question. */
  function bestSection(q, m, qw) {
    const secs = sections(m); if (!secs.length) return null;
        /* La notion qui colle le mieux : d'abord l'énoncé, puis la bonne réponse, puis l'explication. */
    const parts = [norm(q.q), norm(q.c[q.a]), norm(q.e)];
    let notion = null, ns = 0;
    (C.notions && C.notions[m.id] || []).forEach(n => { const r = reOk(n[2]); if (!r) return; const sc = (r.test(parts[0]) ? 4 : 0) + (r.test(parts[1]) ? 2 : 0) + (r.test(parts[2]) ? 1 : 0); if (sc > ns) { ns = sc; notion = n; } });
    const nre = notion ? reOk(notion[2]) : null;
    let best = null, bs = -1;
    secs.forEach((s, i) => {
      const body = s.nodes.map(n => n.textContent).join(" ");
      let sc = overlap(qw, words(body)) + 2 * overlap(qw, words(s.title));
      if (nre && nre.test(norm(s.title + " " + body))) sc += 2;
      if (s.tab === "approfondir") sc -= 0.5;
      s.i = i; s.sc = sc;
      if (sc > bs) { bs = sc; best = s; }
    });
    return { sec: bs > 0 ? best : secs[0], notion, score: bs };
  }

  /* Garde l'essentiel d'un passage : quelques blocs, listes raccourcies. */
  function trim(sec) {
    let len = 0, diag = null; const keep = [];
    for (const n of sec.nodes) {
      const dd = n.matches && n.matches("[data-diagram]") ? n : n.querySelector && n.querySelector("[data-diagram]");
      if (dd) { if (!diag) diag = dd.dataset.diagram; continue; }
      if (len > 520) break;
      const c = n.cloneNode(true);
      if (c.tagName === "UL" || c.tagName === "OL") Array.from(c.children).slice(5).forEach(li => li.remove());
      keep.push(c.outerHTML); len += c.textContent.length;
    }
    return { html: keep.join(""), diag };
  }

  /* Schéma propre à la question : la situation, ce qui se passe, donc… */
  function whyDiagram(q) {
    const e = String(q.e || "").split(/Piège\s*:/)[0].trim();
    const sit = q.q.trim();
    const rows = [[t("exp2.sit"), sit, ""], [t("exp2.why"), e || q.c[q.a], ""], [t("exp2.so"), q.c[q.a], "ok"]];
    return `<ol class="exp-flow" aria-label="${u.esc(t("exp2.cap"))}">${rows.map(([h, x, c], k) => `<li class="${c}" style="--i:${k}"><span class="n">${k + 1}</span><div><b>${u.esc(h)}</b><p>${u.esc(x)}</p></div></li>`).join("")}</ol>`;
  }

  const diagHtml = key => { const f = key && C.diagrams[key]; if (!f) return ""; try { return f(); } catch (e) { return ""; } };

  AA.explainMe = (q, picked) => {
    const m = C.byId[q.m]; if (!m) return; fx.sfx.flip && fx.sfx.flip();
    const me = Q.methodFor ? Q.methodFor(q) : null, pf = Q.pitfallFor ? Q.pitfallFor(q) : null;
    const qw = words(q.q + " " + q.c[q.a] + " " + q.e);
    const trap = (String(q.e || "").match(/Piège\s*:\s*(.+)$/) || [])[1];
    const bs = bestSection(q, m, qw), sec = bs && bs.sec, tr = sec ? trim(sec) : { html: "", diag: null };
    /* Schéma du passage, sinon schéma du thème s'il parle de la même chose. */
    let diag = tr.diag ? diagHtml(tr.diag) : "";
    if (!diag && m.diagram) { const h = diagHtml(m.diagram), dw = words(txt(h) + " " + ((h.match(/aria-label="([^"]*)"/) || [])[1] || ""));
      const isIntro = sec && sec.i === 0, tw = words((sec ? sec.title : "") + " " + q.q);
      if (h && (isIntro ? overlap(qw, dw) >= 2 : overlap(tw, dw) >= 2)) diag = h; }
    const memo = (m.memo || []).map(x => [x, overlap(qw, words(x[0] + " " + x[1]))]).sort((a, b) => b[1] - a[1]);
    const top = memo.length ? memo[0][1] : 0;
    const memoTop = (top > 0 ? memo.filter(x => x[1] > 0 && x[1] === top) : memo).slice(0, 2).map(x => x[0]);
    const wrong = picked != null && picked !== q.a;

    const steps = [
      [t("exp2.s1"), "target", `<p class="exp-q">${u.esc(q.q)}</p>${Q.context ? Q.context(q, true) : ""}
        ${wrong ? `<p class="exp-bad">${AA.icon("x")}<span>${t("exp.youPicked")} <b>${u.esc(q.c[picked])}</b></span></p>` : ""}
        <p class="exp-a">${AA.icon("check")}<span>${t("exp2.good")} <b>${u.esc(q.c[q.a])}</b></span></p>
        ${trap || pf ? `<div class="callout trap exp-trap"><span class="eyebrow">${t("exp.s4")}</span>${u.esc(trap || pf.why)}</div>` : ""}`],
      [t("exp2.s2"), "eye", `${whyDiagram(q)}${pf && pf.fix ? `<p class="exp-fix"><b>${t("ex.fix")}</b> ${u.esc(pf.fix)}</p>` : ""}`],
      sec && (tr.html || diag) ? [t("exp2.s3"), "book", `<h3>${u.esc(sec.title || m.title)}</h3>${diag}<div class="prose exp-prose">${tr.html}</div>`] : null,
      me ? [t("exp.s3"), "brain", `<p class="small muted">${u.esc(me.title)}</p><ol class="ex-steps">${me.steps.map(s => `<li>${s}</li>`).join("")}</ol>`] : null,
      [t("exp.s5"), "star", `<div class="memo">${memoTop.map(([a, b]) => `<div><b>${u.esc(a)}</b><span class="muted">${u.esc(b)}</span></div>`).join("")}</div>
        ${bs && bs.notion ? `<p class="small muted exp-notion">${AA.icon("bulb")} ${t("exp2.notion")} <b>${u.esc(bs.notion[1])}</b></p>` : ""}
        <button class="btn ghost sm block" id="expSec">${AA.icon("book")} ${t("exp2.readSec")}</button>`]
    ].filter(Boolean);

    const close = ui.sheet(`<div class="exp-sheet exp2"><div class="exp-bars" role="tablist">${steps.map((s, k) => `<button class="exp-dot" data-k="${k}" aria-label="${u.esc(s[0])}"><b></b></button>`).join("")}</div>
      <div class="exp-body" aria-live="polite"></div>
      <div class="row exp-nav"><button class="btn ghost sm" id="expP">${AA.icon("back")} ${t("exp2.prev")}</button><button class="btn sm grow" id="expN"></button></div>
      <div class="row exp-end"><a class="btn ghost sm" href="#/lesson/${m.id}">${AA.icon("book")} ${t("ex.fullLesson")}</a><button class="btn ghost sm" data-no>${t("ex.backQuiz")}</button></div></div>`, t("exp.title"));
    const root = document.querySelector(".exp-sheet"); if (!root) return;
    const body = root.querySelector(".exp-body"), dots = root.querySelectorAll(".exp-dot"), P = root.querySelector("#expP"), N = root.querySelector("#expN");
    let i = 0;
    const show = (dir) => {
      const [h, ic, html] = steps[i];
      body.innerHTML = `<div class="exp-step ${dir < 0 ? "back" : ""}"><p class="eyebrow">${AA.icon(ic)} ${h} · ${i + 1}/${steps.length}</p>${html}</div>`;
      body.querySelectorAll(".diagram").forEach(d => { d.classList.add("anim"); requestAnimationFrame(() => d.classList.add("in")); });
      if (AA.gloss && AA.gloss.link) body.querySelectorAll(".prose").forEach(p => { try { AA.gloss.link(p); } catch (e) {} });
      dots.forEach((d, k) => { d.classList.toggle("done", k < i); d.classList.toggle("on", k === i); d.setAttribute("aria-current", k === i ? "step" : "false"); });
      P.disabled = i === 0;
      N.innerHTML = i === steps.length - 1 ? `${AA.icon("check")} ${t("exp.done")}` : `${t("exp.next")} ${AA.icon("next")}`;
      const sb = body.querySelector("#expSec"); if (sb) sb.onclick = () => { if (sec) { AA.ctx.sec = sec.title; AA.ctx.hl = bs.notion ? bs.notion[3] : null; } close(); AA.router.go("lesson/" + m.id + "/" + (sec ? sec.tab : "essentiel")); };
      const sh = root.closest(".sheet"); if (sh) sh.scrollTop = 0;
    };
    const go = k => { if (k < 0 || k >= steps.length || k === i) return; const dir = k > i ? 1 : -1; i = k; fx.sfx.tap && fx.sfx.tap(); show(dir); };
    P.onclick = () => go(i - 1);
    N.onclick = () => { if (i === steps.length - 1) close(); else go(i + 1); };
    dots.forEach(d => d.onclick = () => go(+d.dataset.k));
    const key = e => { if (!document.body.contains(root)) return document.removeEventListener("keydown", key); if (e.key === "ArrowRight") go(i + 1); else if (e.key === "ArrowLeft") go(i - 1); };
    document.addEventListener("keydown", key);
    let x0 = null, y0 = null;
    body.addEventListener("pointerdown", e => { x0 = e.clientX; y0 = e.clientY; });
    body.addEventListener("pointerup", e => { if (x0 == null) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(i + (dx < 0 ? 1 : -1)); });
    show(1);
    S().explained = (S().explained || 0) + 1; AA.store.save(false, true);
  };
  AA.explainMe._v = 2;
  AA.explainMe._parts = { sections, bestSection, words };
})();
