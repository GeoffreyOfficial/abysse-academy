/* =====================================================================
   Abysse Academy · mode histoire (moteur 2.4)
   Liste des aventures (#/story), groupées par niveau, et lecture d'une
   aventure (#/story/<id>).
   - Bon choix du premier coup = 1 point ; étoiles = points / décisions prises.
   - Mauvais choix sans « go » : explication puis on réessaie.
   - Mauvais choix avec « go » : on voit la conséquence (scène suivante),
     qui peut se rattraper… ou finir mal (end:true, bad:true, why, retry).
   - Chaque première décision nourrit le tuteur (maîtrise par notion).
   Champs d'une aventure : id, world, role, icon, title, sub, unlock, start,
   cast, nodes. Une fin : end, title, text, learn (liste), bad, why, retry.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, ui = AA.ui;
  const open = s => !s.unlock || AA.S.unlockAll || G.met(s.unlock);
  /* Longueur du chemin principal (on suit les bons choix jusqu'à une fin). */
  const mainLen = s => {
    if (s._len) return s._len;
    let id = s.start, n = 0; const seen = new Set();
    while (s.nodes[id] && !s.nodes[id].end && !seen.has(id)) { seen.add(id); n++; const ok = (s.nodes[id].choices || []).find(c => c.ok); id = ok && ok.go; }
    return (s._len = n || 1);
  };
  const starsOf = (score, made) => { const r = made ? score / made : 0; return r >= 1 ? 3 : r >= .7 ? 2 : 1; };

  AA.view("story", {
    tab: "train",
    depth: args => { const c = AA.ctx.story; if (args[0] && c && c.id === args[0]) { const s = C.storyById[c.id]; return (s.nodes[c.node] || {}).depth || 0; } return 6; },
    immersive: false,
    render(el, [id]) {
      if (id && C.storyById[id] && open(C.storyById[id])) return play(el, C.storyById[id]);
      const S = AA.S, done = C.stories.filter(s => (S.story[s.id] || {}).done).length;
      const card = s => {
        const ok = open(s), r = S.story[s.id] || {}, w = C.worldById[s.world] || {}, n = mainLen(s);
        return `<button class="card story-card ${ok ? "" : "off"} ${r.done ? "done" : ""}" data-s="${s.id}" style="--wc:var(${w.color || "--primary"})" ${ok ? "" : "aria-disabled=\"true\""}>
            <span class="medal">${AA.icon(ok ? s.icon : "lock")}</span>
            <span class="grow"><span class="eyebrow">${u.esc(s.role || w.short || "")}</span><b>${u.esc(s.title)}</b><span class="small muted">${ok ? u.esc(s.sub) : t("story.locked")}</span>
            ${r.done ? `<span class="row" style="margin-top:6px">${AA.stars(r.stars || 0)}<span class="xs muted">${t("story.best", { n: Math.min(r.best || 0, n), tot: n })}</span></span>` : r.node && r.node !== s.start ? `<span class="chip pri" style="margin-top:6px">${t("story.resume")}</span>` : `<span class="xs muted st-len">${t("story.len", { n })}</span>`}</span>
            ${AA.icon("next")}</button>`;
      };
      const groups = C.worlds.map(w => ({ w, list: C.stories.filter(s => s.world === w.id) })).filter(g => g.list.length);
      el.innerHTML = `${ui.head(t("story.title"), "train")}<p class="muted">${t("story.intro")}</p>
        <div class="row st-sum"><span class="chip">${AA.icon("scroll")} ${t("story.count", { n: done, tot: C.stories.length })}</span></div>
        ${groups.map(g => `<h3 class="st-group" style="--wc:var(${g.w.color || "--primary"})"><span>${u.esc(g.w.title || g.w.short || g.w.id)}</span><span class="xs muted">${g.list.filter(s => (S.story[s.id] || {}).done).length}/${g.list.length}</span></h3>
          <div class="stack">${g.list.map(card).join("")}</div>`).join("")}`;
      u.on(el, "click", "[data-s]", (e, b) => { const s = C.storyById[b.dataset.s]; if (!open(s)) { fx.sfx.bad(); fx.toast(t("story.lockedT"), t("story.locked"), "lock"); return; } fx.sfx.tap(); AA.router.go("story/" + s.id); });
    }
  });

  /* Le tuteur apprend aussi des aventures : on lui passe la scène comme une question. */
  function feedTutor(s, id, n, ok) {
    try {
      const good = n.choices.find(c => c.ok) || {}, m = good.m || (n.choices.find(c => c.m) || {}).m;
      if (!m || !AA.tutor || !AA.tutor.note) return;
      AA.tutor.note({ id: "story:" + s.id + ":" + id, m, q: (n.text || "") + " " + n.q, c: [good.t], a: 0, e: good.e }, ok);
    } catch (e) { /* le tuteur est facultatif */ }
  }

  function play(el, s) {
    const S = AA.S, rec = S.story[s.id] || (S.story[s.id] = { node: s.start, tries: 0 });
    let c = AA.ctx.story;
    if (!c || c.id !== s.id) c = AA.ctx.story = { id: s.id, node: rec.done || !s.nodes[rec.node] ? s.start : rec.node, score: rec.done ? 0 : rec.score || 0, made: rec.done ? 0 : rec.made || 0, missed: {}, decided: {}, fb: null, steps: rec.done ? 0 : rec.steps || 0 };
    const n = s.nodes[c.node], w = C.worldById[s.world] || {}, total = mainLen(s);
    AA.scene.set(n.depth || 0);
    const who = n.who && s.cast ? s.cast[n.who] : "";
    const learn = n.learn && n.learn.length ? `<div class="st-learn"><p class="eyebrow">${t("story.learn")}</p><ul>${n.learn.map(x => `<li>${u.esc(x)}</li>`).join("")}</ul></div>` : "";

    if (n.end && n.bad) {
      if (!c.savedBad) { c.savedBad = true; rec.node = n.retry && s.nodes[n.retry] ? n.retry : s.start; rec.score = c.score; rec.made = c.made; rec.steps = c.steps; rec.bad = (rec.bad || 0) + 1; AA.store.save(); fx.sfx.bad(); fx.buzz([60, 40, 60]); }
      el.innerHTML = `${ui.head(u.esc(s.title), "story")}<section class="card result stack-lg story-end bad" style="--wc:var(${w.color || "--primary"})">
        <p class="eyebrow">${t("story.badEnd")}</p><h2>${u.esc(n.title)}</h2><div class="rstars">${[1, 2, 3].map(() => AA.star(false)).join("")}</div>
        <p>${u.esc(n.text)}</p>
        ${n.why ? `<div class="callout trap"><span class="eyebrow">${t("story.why")}</span><p>${u.esc(n.why)}</p></div>` : ""}${learn}
        <div class="stack">${n.retry && s.nodes[n.retry] ? `<button class="btn block" id="stretry">${AA.icon("back")} ${t("story.retryFrom")}</button>` : ""}
        <button class="btn ${n.retry ? "ghost" : ""} block" id="replay">${AA.icon("refresh")} ${t("story.replay")}</button><a class="btn ghost block" href="#/story">${t("story.others")}</a></div></section>`;
      const rb = u.$("#stretry");
      if (rb) rb.onclick = () => { c.node = n.retry; c.fb = null; c.savedBad = false; rec.node = c.node; AA.store.save(); AA.router.go("story/" + s.id, undefined, true); window.scrollTo(0, 0); };
      u.$("#replay").onclick = () => { AA.ctx.story = null; Object.assign(rec, { node: s.start, score: 0, made: 0, steps: 0 }); AA.store.save(); AA.router.refresh(); };
      return;
    }
    if (n.end) {
      const stars = starsOf(c.score, c.made);
      if (!c.saved) {
        c.saved = true; const first = !rec.done;
        Object.assign(rec, { done: u.today(), node: s.start, best: Math.max(rec.best || 0, c.score), stars: Math.max(rec.stars || 0, stars), tries: (rec.tries || 0) + 1, score: 0, made: 0, steps: 0 });
        AA.store.save(); if (first) G.addXp(s.xp || 60); fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight * .4, 50, "rgba(255,200,87,.9)"); G.checkBadges();
      }
      el.innerHTML = `${ui.head(u.esc(s.title), "story")}<section class="card result stack-lg story-end" style="--wc:var(${w.color || "--primary"})">
        <p class="eyebrow">${t("story.end")}</p><h2>${u.esc(n.title)}</h2><div class="rstars">${[1, 2, 3].map(k => AA.star(k <= stars)).join("")}</div>
        <p>${u.esc(n.text)}</p>${learn}<p class="small muted">${t("story.score", { n: c.score, tot: c.made })}</p>
        <div class="stack"><button class="btn block" id="replay">${AA.icon("refresh")} ${t("story.replay")}</button><a class="btn ghost block" href="#/story">${t("story.others")}</a></div></section>`;
      u.$("#replay").onclick = () => { AA.ctx.story = null; rec.node = s.start; AA.router.refresh(); };
      return;
    }
    const fb = c.fb, step = c.steps + 1;
    const fch = fb ? n.choices[fb.i] : null, conseq = fb && !fb.ok && fch.go;
    el.innerHTML = `<div class="pagehead"><a class="closebtn" href="#/story" aria-label="${t("nav.back")}">${AA.icon("back")}</a><span class="eyebrow grow">${u.esc(s.title)} · ${n.alt ? t("story.alt") : t("story.step", { n: Math.min(step, total), tot: total })}</span>
        <span class="chip">${AA.icon("gauge")} ${n.depth ? "−" + n.depth + " m" : t("story.surface")}</span>${AA.a11y.button("#stx", t("a11y.listen"))}</div>
      <div class="st-prog" aria-hidden="true"><i style="width:${Math.round(Math.min(1, c.steps / total) * 100)}%"></i></div>
      <section class="story-scene ${n.alt ? "alt" : ""}" style="--wc:var(${w.color || "--primary"})" id="stx">
        <p class="story-set">${u.esc(n.scene || "")}</p>
        ${n.text ? `<div class="story-say ${who ? "" : "narr"}">${who ? `<span class="eyebrow">${u.esc(who)}</span>` : ""}<p>${u.esc(n.text)}</p></div>` : ""}
        <h2 class="story-q">${u.esc(n.q)}</h2>
      </section>
      <div class="stack story-choices">${n.choices.map((ch, i) => {
        const st = fb && fb.i === i ? (ch.ok ? "good" : "wrong") : fb && fb.ok && ch.ok ? "good" : "";
        const lock = fb && (fb.ok || conseq);
        return `<button class="choice st-choice ${st}" data-i="${i}" ${lock ? "disabled" : ""}><span class="k">${"ABCD"[i]}</span><span>${u.esc(ch.t)}</span><span class="mk">${st ? AA.icon(st === "good" ? "check" : "x") : ""}</span></button>`;
      }).join("")}</div>
      ${fb ? `<div class="feedback ${fb.ok ? "ok" : "bad"}" role="status"><h4>${fb.ok ? t("story.good") : t("story.bad")}</h4><p>${u.esc(fch.e)}</p>
        ${fch.m && C.byId[fch.m] ? `<a class="small" href="#/lesson/${fch.m}">${t("result.toLesson", { title: u.esc(C.moduleTitle(fch.m)) })}</a>` : ""}</div>
        ${fb.ok ? `<button class="btn block" id="stnext" style="margin-top:var(--sp-3)">${t("story.continue")} ${AA.icon("next")}</button>`
          : conseq ? `<button class="btn warn block" id="stnext" style="margin-top:var(--sp-3)">${t("story.conseq")} ${AA.icon("next")}</button>` : `<p class="small muted center">${t("story.retry")}</p>`}` : ""}`;
    u.$$(".st-choice", el).forEach(b => b.onclick = () => {
      const i = +b.dataset.i, ch = n.choices[i];
      if (c.fb && (c.fb.ok || n.choices[c.fb.i].go)) return;
      c.fb = { i, ok: !!ch.ok };
      if (!c.decided[c.node]) { c.decided[c.node] = true; c.made++; feedTutor(s, c.node, n, !!ch.ok); }
      if (ch.ok) { if (!c.missed[c.node]) { c.score++; G.addXp(10, b); } fx.sfx.ok(); fx.burstAt(b, 16, "rgba(61,220,151,.85)"); }
      else { c.missed[c.node] = true; fx.sfx.bad(); fx.buzz([40, 40, 40]); }
      G.markDay(); AA.store.save(); AA.router.refresh();
      const f = u.$(".feedback"); if (f) f.scrollIntoView({ behavior: AA.a11y.reduced() ? "auto" : "smooth", block: "nearest" });
    });
    const nx = u.$("#stnext");
    if (nx) { nx.focus({ preventScroll: true }); nx.onclick = () => { const ch = n.choices[c.fb.i]; c.node = ch.go || c.node; c.fb = null; c.steps++; Object.assign(rec, { node: c.node, score: c.score, made: c.made, steps: c.steps }); AA.store.save(); AA.router.go("story/" + s.id, undefined, true); window.scrollTo(0, 0); }; }
  }
})();
