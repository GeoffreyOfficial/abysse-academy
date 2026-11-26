/* =====================================================================
   Abysse Academy · mode histoire
   Liste des aventures (#/story) et lecture d'une aventure (#/story/<id>).
   Chaque bon choix du premier coup = 1 point ; le fond marin suit la
   profondeur de la scène ; les mauvais choix expliquent puis on réessaie.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, ui = AA.ui;
  const open = s => !s.unlock || AA.S.unlockAll || G.met(s.unlock);
  const decisions = s => Object.values(s.nodes).filter(n => !n.end).length;

  AA.view("story", {
    tab: "train",
    depth: args => { const c = AA.ctx.story; if (args[0] && c && c.id === args[0]) { const s = C.storyById[c.id]; return (s.nodes[c.node] || {}).depth || 0; } return 6; },
    immersive: false,
    render(el, [id]) {
      if (id && C.storyById[id] && open(C.storyById[id])) return play(el, C.storyById[id]);
      const S = AA.S;
      el.innerHTML = `${ui.head(t("story.title"), "train")}<p class="muted">${t("story.intro")}</p>
        <div class="stack" style="margin-top:var(--sp-4)">${C.stories.map(s => {
          const ok = open(s), r = S.story[s.id] || {}, w = C.worldById[s.world] || {}, n = decisions(s);
          return `<button class="card story-card ${ok ? "" : "off"}" data-s="${s.id}" style="--wc:var(${w.color || "--primary"})" ${ok ? "" : "aria-disabled=\"true\""}>
            <span class="medal">${AA.icon(ok ? s.icon : "lock")}</span>
            <span class="grow"><span class="eyebrow">${u.esc(w.short || "")}</span><b>${u.esc(s.title)}</b><span class="small muted">${ok ? u.esc(s.sub) : t("story.locked")}</span>
            ${r.done ? `<span class="row" style="margin-top:6px">${AA.stars(r.stars || 0)}<span class="xs muted">${t("story.best", { n: r.best || 0, tot: n })}</span></span>` : r.node && r.node !== s.start ? `<span class="chip pri" style="margin-top:6px">${t("story.resume")}</span>` : ""}</span>
            ${AA.icon("next")}</button>`;
        }).join("")}</div>`;
      u.on(el, "click", "[data-s]", (e, b) => { const s = C.storyById[b.dataset.s]; if (!open(s)) { fx.sfx.bad(); fx.toast(t("story.lockedT"), t("story.locked"), "lock"); return; } fx.sfx.tap(); AA.router.go("story/" + s.id); });
    }
  });

  function play(el, s) {
    const S = AA.S, rec = S.story[s.id] || (S.story[s.id] = { node: s.start, tries: 0 });
    let c = AA.ctx.story;
    if (!c || c.id !== s.id) c = AA.ctx.story = { id: s.id, node: rec.done || !s.nodes[rec.node] ? s.start : rec.node, score: rec.done ? 0 : rec.score || 0, missed: {}, fb: null };
    const n = s.nodes[c.node], w = C.worldById[s.world] || {}, total = decisions(s);
    AA.scene.set(n.depth || 0);
    const who = n.who && s.cast ? s.cast[n.who] : "";
    const step = Object.keys(s.nodes).indexOf(c.node) + 1;
    if (n.end) {
      const stars = c.score >= total ? 3 : c.score >= total - 2 ? 2 : 1;
      if (!c.saved) {
        c.saved = true; const first = !rec.done;
        Object.assign(rec, { done: u.today(), node: s.start, best: Math.max(rec.best || 0, c.score), stars: Math.max(rec.stars || 0, stars), tries: (rec.tries || 0) + 1, score: 0 });
        AA.store.save(); if (first) G.addXp(60); fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight * .4, 50, "rgba(255,200,87,.9)"); G.checkBadges();
      }
      el.innerHTML = `${ui.head(u.esc(s.title), "story")}<section class="card result stack-lg story-end" style="--wc:var(${w.color || "--primary"})">
        <p class="eyebrow">${t("story.end")}</p><h2>${u.esc(n.title)}</h2><div class="rstars">${[1, 2, 3].map(k => AA.star(k <= stars)).join("")}</div>
        <p>${u.esc(n.text)}</p><p class="small muted">${t("story.score", { n: c.score, tot: total })}</p>
        <div class="stack"><button class="btn block" id="replay">${AA.icon("refresh")} ${t("story.replay")}</button><a class="btn ghost block" href="#/story">${t("story.others")}</a></div></section>`;
      u.$("#replay").onclick = () => { AA.ctx.story = null; rec.node = s.start; AA.router.refresh(); };
      return;
    }
    const fb = c.fb;
    el.innerHTML = `<div class="pagehead"><a class="closebtn" href="#/story" aria-label="${t("nav.back")}">${AA.icon("back")}</a><span class="eyebrow grow">${u.esc(s.title)} · ${t("story.step", { n: step, tot: Object.keys(s.nodes).length - 1 })}</span>
        <span class="chip">${AA.icon("gauge")} ${n.depth ? "−" + n.depth + " m" : t("story.surface")}</span>${AA.a11y.button("#stx", t("a11y.listen"))}</div>
      <section class="story-scene" style="--wc:var(${w.color || "--primary"})" id="stx">
        <p class="story-set">${u.esc(n.scene || "")}</p>
        ${n.text ? `<div class="story-say ${who ? "" : "narr"}">${who ? `<span class="eyebrow">${u.esc(who)}</span>` : ""}<p>${u.esc(n.text)}</p></div>` : ""}
        <h2 class="story-q">${u.esc(n.q)}</h2>
      </section>
      <div class="stack story-choices">${n.choices.map((ch, i) => {
        const st = fb && fb.i === i ? (ch.ok ? "good" : "wrong") : fb && fb.ok && ch.ok ? "good" : "";
        return `<button class="choice st-choice ${st}" data-i="${i}" ${fb && fb.ok ? "disabled" : ""}><span class="k">${"ABCD"[i]}</span><span>${u.esc(ch.t)}</span><span class="mk">${st ? AA.icon(st === "good" ? "check" : "x") : ""}</span></button>`;
      }).join("")}</div>
      ${fb ? `<div class="feedback ${fb.ok ? "ok" : "bad"}" role="status"><h4>${fb.ok ? t("story.good") : t("story.bad")}</h4><p>${u.esc(n.choices[fb.i].e)}</p>
        ${n.choices[fb.i].m && C.byId[n.choices[fb.i].m] ? `<a class="small" href="#/lesson/${n.choices[fb.i].m}">${t("result.toLesson", { title: u.esc(C.moduleTitle(n.choices[fb.i].m)) })}</a>` : ""}</div>
        ${fb.ok ? `<button class="btn block" id="stnext" style="margin-top:var(--sp-3)">${t("story.continue")} ${AA.icon("next")}</button>` : `<p class="small muted center">${t("story.retry")}</p>`}` : ""}`;
    u.$$(".st-choice", el).forEach(b => b.onclick = () => {
      const i = +b.dataset.i, ch = n.choices[i];
      if (c.fb && c.fb.ok) return;
      c.fb = { i, ok: !!ch.ok };
      if (ch.ok) { if (!c.missed[c.node]) { c.score++; G.addXp(10, b); } fx.sfx.ok(); fx.burstAt(b, 16, "rgba(61,220,151,.85)"); }
      else { c.missed[c.node] = true; fx.sfx.bad(); fx.buzz([40, 40, 40]); }
      G.markDay(); AA.store.save(); AA.router.refresh();
      const f = u.$(".feedback"); if (f) f.scrollIntoView({ behavior: AA.a11y.reduced() ? "auto" : "smooth", block: "nearest" });
    });
    const nx = u.$("#stnext");
    if (nx) { nx.focus({ preventScroll: true }); nx.onclick = () => { const ch = n.choices[c.fb.i]; c.node = ch.go || c.node; c.fb = null; rec.node = c.node; rec.score = c.score; AA.store.save(); AA.router.go("story/" + s.id, undefined, true); window.scrollTo(0, 0); }; }
  }
})();
