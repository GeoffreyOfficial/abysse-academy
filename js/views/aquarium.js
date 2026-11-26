/* =====================================================================
   Abysse Academy · aquarium personnel et antre des boss
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, ui = AA.ui;

  /* ---------- Décors du fond de l'aquarium (viewBox 0 0 400 120) ---------- */
  const DECOR = {
    sand: () => `<path d="M0 96c60-10 120 6 200-2s140-8 200 2v24H0z" fill="#D9C08A" opacity=".9"/><path d="M0 104c80-6 160 6 240 0s120-4 160 2v14H0z" fill="#C9AE74"/>`,
    rock: () => `<path d="M24 104c2-20 24-30 44-22 14-10 34-4 36 14l2 8z" fill="#5E6B73"/><path d="M300 104c4-14 20-20 34-14 10-6 24 0 24 14z" fill="#4E5A62"/>`,
    grass: () => [130, 140, 150, 160, 350, 360].map((x, i) => `<path class="kelp" style="animation-delay:-${i * .5}s" d="M${x} 104c-6-20 6-34 0-56" stroke="#3F8F5A" stroke-width="5" fill="none" stroke-linecap="round"/>`).join(""),
    gorgon: () => `<g stroke="#D9402B" stroke-width="3" fill="none" stroke-linecap="round"><path d="M270 104v-30M270 84l-12-14M270 78l14-16M258 70l-6-12M284 62l4-12M264 72l2-14"/></g>`,
    amphora: () => `<g transform="translate(196 76) rotate(-70)"><path d="M0 0c-8 0-10 6-10 14s6 18 10 22c4-4 10-14 10-22S8 0 0 0z" fill="#B5673A"/><path d="M-4 -4h8v6h-8zM-6 2c-6 0-6 8 0 8M6 2c6 0 6 8 0 8" stroke="#8E4E2A" stroke-width="2" fill="#B5673A"/></g>`,
    anchor: () => `<g stroke="#7A8690" stroke-width="4" fill="none" stroke-linecap="round" transform="translate(90 70) rotate(18)"><circle cx="0" cy="-10" r="4"/><path d="M0 -6v34M-10 4h20M-16 20c4 10 12 12 16 12s12-2 16-12"/></g>`,
    wreck: () => `<path d="M300 100l10-26h70l10 26z" fill="#3B3026" opacity=".9"/><path d="M330 74v-30l16 14z" fill="#4A3D30"/><circle cx="330" cy="88" r="4" fill="#1E1812"/><circle cx="352" cy="88" r="4" fill="#1E1812"/>`,
    chest: () => `<g transform="translate(40 86)"><rect width="34" height="18" rx="3" fill="#8A5A2A"/><path d="M0 4c0-10 34-10 34 0" fill="#A06C34"/><rect x="14" y="6" width="6" height="7" rx="1" fill="#FFC857"/><circle cx="40" cy="2" r="2" fill="#FFC857" class="glint"/></g>`
  };
  const decorSvg = got => `<svg class="aq-decor" viewBox="0 0 400 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${C.decor.filter(d => got(d)).map(d => (DECOR[d.kind] || (() => ""))()).join("")}</svg>`;
  const decorOk = d => G.met(d.test);

  AA.view("aquarium", {
    tab: "profile", depth: 8,
    render(el, [focus]) {
      const S = AA.S, got = C.creatures.filter(f => S.aqua[f.id]), r = u.seeded(u.seedOf("aq" + got.length));
      const fishes = got.map((f, i) => {
        const y = 10 + r() * 62, dur = 14 + r() * 16, dl = -r() * dur, dir = r() < .5 ? "l" : "r", s = f.shape;
        const bottom = s === "star" || s === "crab" || s === "sponge" || s === "nudi", float = s === "jelly" || s === "seahorse";
        const cls = bottom ? "aq-bottom" : float ? "aq-float" : "aq-swim " + dir;
        const style = bottom ? `left:${8 + (i * 37) % 80}%` : float ? `left:${10 + r() * 75}%;top:${y}%;animation-duration:${6 + r() * 4}s` : `top:${y}%;animation-duration:${dur}s;animation-delay:${dl}s`;
        return `<button class="aq-fish ${cls}" data-f="${f.id}" style="${style}" aria-label="${u.esc(f.name)}">${AA.creature(f.shape, f.c)}</button>`;
      }).join("");
      const dec = C.decor.filter(decorOk);
      el.innerHTML = `${ui.head(t("aqua.title"), "profile", `<span class="chip gold">${got.length} / ${C.creatures.length}</span>`)}
        <p class="muted">${t("aqua.intro")}</p>
        <div class="tank" id="tank">${fishes || `<p class="tank-empty">${t("aqua.empty")}</p>`}${decorSvg(decorOk)}<div class="tank-light" aria-hidden="true"></div></div>
        <div class="section-title"><h3>${t("aqua.collection")}</h3><span class="xs muted">${t("aqua.tap")}</span></div>
        <div class="aq-grid">${C.creatures.map(f => { const ok = !!S.aqua[f.id]; return `<button class="aq-card ${ok ? "" : "off"}" data-f="${f.id}">${AA.creature(f.shape, ok ? f.c : ["var(--surface-3)", "var(--surface-3)", "var(--surface-3)"])}<b>${ok ? u.esc(f.name) : "?"}</b><span>${ok ? t("aqua.since", { d: S.aqua[f.id] }) : u.esc(f.how)}</span></button>`; }).join("")}</div>
        <div class="section-title"><h3>${t("aqua.decor")}</h3><span class="xs muted">${dec.length} / ${C.decor.length}</span></div>
        <div class="row">${C.decor.map(d => `<span class="chip ${decorOk(d) ? "ok" : ""}">${decorOk(d) ? AA.icon("check") : AA.icon("lock")} ${u.esc(d.name)}</span>`).join("")}</div>`;
      const open = id => {
        const f = C.creatures.find(x => x.id === id); if (!f) return;
        const ok = !!S.aqua[f.id]; fx.sfx.flip();
        ui.sheet(`<div class="aq-sheet">${AA.creature(f.shape, ok ? f.c : ["var(--surface-3)", "var(--surface-3)", "var(--surface-3)"])}<h3>${ok ? u.esc(f.name) : t("aqua.unknown")}</h3>
          ${ok ? `<p>${u.esc(f.fact)}</p><p class="xs muted">${t("aqua.since", { d: S.aqua[f.id] })} · ${t("aqua.how", { how: u.esc(f.how) })}</p>` : `<p class="muted">${t("aqua.toUnlock", { how: u.esc(f.how) })}</p>`}</div>`, f.name);
      };
      u.on(el, "click", "[data-f]", (e, b) => open(b.dataset.f));
      if (focus) setTimeout(() => open(focus), 300);
    }
  });

  /* ---------- Antre du boss ---------- */
  AA.view("boss", {
    tab: "map", guard: ([w]) => !!(C.worldById[w] && C.worldById[w].boss), fallback: "map", depth: 45,
    render(el, [wid]) {
      const w = C.worldById[wid], b = w.boss, open = G.bossOpen(wid), rec = AA.S.boss[wid], left = G.bossLeft(wid);
      el.innerHTML = `${ui.head(t("boss.eyebrow"), "map/" + wid)}
        <section class="card boss-intro" style="--wc:var(${w.color})">
          <div class="bossart big">${AA.creature(b.creature, null, "boss-cr")}</div>
          <p class="eyebrow" style="color:var(--wc)">${u.esc(w.short)} · ${u.esc(b.depth || "")}</p><h1>${u.esc(b.name)}</h1>
          <p>${u.esc(b.intro)}</p>
          <ul class="boss-rules"><li>${AA.icon("swords")} ${t("boss.ruleHp", { n: b.hp })}</li><li>${AA.icon("gauge")} ${t("boss.ruleAir")}</li><li>${AA.icon("exam")} ${t("boss.ruleN", { n: b.n })}</li></ul>
          ${rec ? `<p class="small muted">${rec.won ? t("boss.wonOn", { d: rec.won, n: rec.best }) : t("boss.tries", { n: rec.tries, best: rec.best })}</p>` : ""}
          ${open ? `<button class="btn accent block" id="fight">${AA.icon("swords")} ${rec && rec.won ? t("boss.again") : t("boss.fight")}</button>`
            : `<div class="callout trap"><span class="eyebrow">${t("boss.locked")}</span>${t("boss.needAll", { n: left.length })}<div class="row" style="margin-top:8px">${left.map(m => `<a class="chip" href="#/lesson/${m.id}">${u.esc(m.title)}</a>`).join("")}</div></div>`}
        </section>`;
      const f = u.$("#fight"); if (f) f.onclick = () => { fx.sfx.alarm(); fx.buzz([40, 60, 40]); AA.quiz.boss(wid); };
    }
  });
})();
