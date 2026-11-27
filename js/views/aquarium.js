/* =====================================================================
   Abysse Academy · aquarium personnel et antre des boss
   L'aquarium grandit avec le niveau (bocal → océan), se décore à la main
   (mode « Décorer » : glisser, agrandir, retourner, masquer), change de
   fond et de sol, passe en mode nuit, et ses habitants se nourrissent.
   Réglages dans S.aquaCfg = { bg, floor, night, dec: {id: {x, y, s, f, off}}, hide: {id}, nick: {id} }.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, ui = AA.ui;

  /* ---------- Décors (viewBox 0 0 100 100, posés sur le bas) ---------- */
  const sway = (i, d) => `class="aq-sway" style="animation-delay:-${i * .4}s;animation-duration:${d || 4}s"`;
  const DECOR = {
    rock: [22, () => `<path d="M6 100c2-30 26-46 46-36 16-14 40-4 42 22l2 14z" fill="#5E6B73"/><path d="M30 78c8-6 18-6 24 0M60 70c6-4 14-3 18 2" stroke="#7A8890" stroke-width="3" fill="none"/>`],
    grass: [14, () => [12, 26, 40, 54, 68, 82].map((x, i) => `<path ${sway(i)} d="M${x} 100c-8-30 8-50 0-86" stroke="#3F8F5A" stroke-width="6" fill="none" stroke-linecap="round"/>`).join("")],
    gorgon: [16, () => `<g stroke="#D9402B" stroke-width="4" fill="none" stroke-linecap="round" ${sway(0, 6)}><path d="M50 100V60M50 76L30 50M50 66l24-28M30 50l-10-18M74 38l6-18M38 56l2-24M62 50l12-6M30 50l-14 2"/></g>`],
    amphora: [10, () => `<g transform="translate(50 62) rotate(-60)"><path d="M0 -30c-14 0-18 12-18 26s10 30 18 38c8-8 18-24 18-38S14 -30 0 -30z" fill="#B5673A"/><path d="M-7 -38h14v10h-14zM-10 -28c-12 0-12 14 0 14M10 -28c12 0 12 14 0 14" stroke="#8E4E2A" stroke-width="3" fill="#B5673A"/></g>`],
    anchor: [12, () => `<g stroke="#7A8690" stroke-width="7" fill="none" stroke-linecap="round" transform="translate(50 56) rotate(14)"><circle cx="0" cy="-34" r="7"/><path d="M0 -27v62M-18 -10h36M-28 18c6 18 20 22 28 22s22-4 28-22"/></g>`],
    wreck: [34, () => `<path d="M4 98l14-40h70l10 40z" fill="#3B3026"/><path d="M40 58V14l30 26z" fill="#4A3D30"/><path d="M40 14v44" stroke="#2A2118" stroke-width="3"/><circle cx="36" cy="80" r="6" fill="#1E1812"/><circle cx="58" cy="80" r="6" fill="#1E1812"/><circle cx="78" cy="80" r="5" fill="#1E1812"/>`],
    chest: [12, () => `<g transform="translate(8 58)"><rect width="84" height="42" rx="6" fill="#8A5A2A"/><path d="M0 10c0-24 84-24 84 0" fill="#A06C34"/><rect x="36" y="12" width="12" height="16" rx="2" fill="#FFC857"/><circle cx="92" cy="2" r="4" fill="#FFC857" class="glint"/></g>`],
    shells: [10, () => `<path d="M10 100c0-16 10-24 20-24s20 8 20 24z" fill="#F2D4C2"/><path d="M30 76v24M20 80l4 20M40 80l-4 20" stroke="#D9A88E" stroke-width="2"/><path d="M58 100c2-12 10-18 18-18 10 0 14 8 14 18z" fill="#E8C07A"/><path d="M62 94c6-8 16-10 22-2" stroke="#C99A4E" stroke-width="2" fill="none"/>`],
    anemone: [12, () => `<ellipse cx="50" cy="96" rx="26" ry="6" fill="#8E3B5A"/>${Array.from({ length: 9 }, (_, i) => `<path ${sway(i, 3)} d="M${22 + i * 7} 96c-4-18 6-28 ${(i - 4) * 3} ${-40 - (i % 3) * 8}" stroke="#F07AA8" stroke-width="5" fill="none" stroke-linecap="round"/>`).join("")}`],
    urchins: [12, () => [[24, 92, 12], [56, 90, 14], [82, 94, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2A1830"/>${Array.from({ length: 12 }, (_, k) => { const a = k / 12 * 6.283; return `<path d="M${x} ${y}l${(Math.cos(a) * r * 1.8).toFixed(1)} ${(Math.sin(a) * r * 1.8 - 2).toFixed(1)}" stroke="#4A2A55" stroke-width="2"/>`; }).join("")}`).join("")],
    coral: [14, () => `<path d="M8 100c0-40 20-56 42-56s42 16 42 56z" fill="#E59A6A"/>${[0, 1, 2, 3, 4].map(i => `<path d="M${16 + i * 4} ${96 - i * 9}c10-8 20 8 30 0s20 8 30 0" stroke="#B86A3C" stroke-width="3" fill="none"/>`).join("")}`],
    lantern: [7, () => `<path d="M50 6v14" stroke="#7A6A50" stroke-width="4"/><rect x="28" y="20" width="44" height="66" rx="10" fill="#3B3026"/><rect x="36" y="30" width="28" height="46" rx="6" fill="#FFD36E" class="aq-glow"/><rect x="24" y="86" width="52" height="14" rx="4" fill="#3B3026"/>`],
    column: [10, () => `<path d="M20 100h60v-10H20zM26 90h48V30l-8 6-8-10-8 12-8-8-8 10-8-6z" fill="#D8D0BE"/><path d="M36 88V40M50 88V36M64 88V40" stroke="#B5AC96" stroke-width="3"/>`],
    clam: [12, () => `<path d="M6 100c4-26 20-36 44-36s40 10 44 36z" fill="#7FA9B8"/><path d="M6 100c10-8 26-12 44-12s34 4 44 12" fill="#4FD2C8"/><path d="M18 92l6-24M34 88l4-26M50 86V60M66 88l-4-26M82 92l-6-24" stroke="#5E8A99" stroke-width="3"/>`],
    helmet: [12, () => `<path d="M14 100v-14h72v14z" fill="#8E6A2A"/><circle cx="50" cy="52" r="36" fill="#C9963A"/><circle cx="50" cy="52" r="16" fill="#1E3A46" stroke="#E8C46A" stroke-width="5"/><circle cx="20" cy="56" r="8" fill="#1E3A46" stroke="#E8C46A" stroke-width="3"/><circle cx="80" cy="56" r="8" fill="#1E3A46" stroke="#E8C46A" stroke-width="3"/><path d="M42 44l8-6" stroke="#9FD8E8" stroke-width="3" opacity=".7"/>`],
    kelp: [14, () => [20, 46, 72].map((x, i) => `<path ${sway(i, 7)} d="M${x} 100c-14-30 14-50 0-80s10-16 4-20" stroke="#5E7A2A" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse ${sway(i, 7)} cx="${x + 8}" cy="${40 + i * 6}" rx="8" ry="4" fill="#6E8B3D"/>`).join("")],
    arch: [30, () => `<path d="M2 100V50C2 20 22 8 50 8s48 12 48 42v50H74V56c0-14-10-24-24-24S26 42 26 56v44z" fill="#4E5A62"/><path d="M8 60c6-20 18-30 36-34M70 30c10 4 18 12 22 24" stroke="#62707A" stroke-width="4" fill="none"/>`],
    statue: [14, () => `<path d="M20 100h60V86H20z" fill="#9AA6AE"/><path d="M30 86c0-20 8-30 20-30s20 10 20 30z" fill="#B8C2C8"/><circle cx="50" cy="38" r="16" fill="#B8C2C8"/><path d="M40 30c4-12 16-12 20 0" stroke="#9AA6AE" stroke-width="3" fill="none"/><path d="M44 40h3M53 40h3" stroke="#7E8A92" stroke-width="2.5"/>`],
    lighthouse: [9, () => `<path d="M30 100l8-70h24l8 70z" fill="#E8EEF2"/><path d="M33 76h34l2 12H31zM36 50h28l2 10H34z" fill="#D9402B"/><rect x="36" y="16" width="28" height="14" rx="3" fill="#FFD36E" class="aq-glow"/><path d="M34 16l16-12 16 12z" fill="#2A3A46"/>`],
    fan: [16, () => `<g stroke="#9B5FD0" stroke-width="3" fill="none" stroke-linecap="round" ${sway(1, 5)}><path d="M50 100V70"/>${Array.from({ length: 11 }, (_, i) => { const a = (-75 + i * 15) * Math.PI / 180; return `<path d="M50 72Q${(50 + Math.sin(a) * 22).toFixed(1)} ${(72 - Math.cos(a) * 30).toFixed(1)} ${(50 + Math.sin(a) * 42).toFixed(1)} ${(72 - Math.cos(a) * 58).toFixed(1)}"/>`; }).join("")}<path d="M20 50c10-8 50-8 60 0M14 34c14-12 58-12 72 0" stroke-width="2" opacity=".7"/></g>`],
    cave: [32, () => `<path d="M0 100C2 56 22 30 52 30s46 24 48 70z" fill="#4E5A62"/><path d="M26 100c0-24 10-40 26-40s24 16 24 40z" fill="#0E1820"/><path d="M12 70c8-18 20-28 34-30M66 42c12 6 20 16 24 30" stroke="#62707A" stroke-width="4" fill="none"/><circle cx="44" cy="84" r="2" fill="#FFD36E" opacity=".8"/><circle cx="56" cy="84" r="2" fill="#FFD36E" opacity=".8"/>`],
    oyster: [11, () => `<path d="M8 100c4-20 20-30 42-30s38 10 42 30z" fill="#8C8C7A"/><path d="M10 84c10-30 28-46 44-46 14 0 30 12 36 30" fill="#A6A690" stroke="#7A7A68" stroke-width="2"/><circle cx="50" cy="86" r="8" fill="#F4F1EA"/><circle cx="47" cy="83" r="2.5" fill="#fff" class="glint"/>`],
    castle: [20, () => `<path d="M14 100V44h8v-8h8v8h8v-8h8v8h8v-8h8v8h8v-8h8v8h4v56z" fill="#8A7E6A"/><path d="M40 100V74c0-8 20-8 20 0v26z" fill="#1E1812"/><rect x="24" y="56" width="8" height="12" rx="4" fill="#1E1812"/><rect x="68" y="56" width="8" height="12" rx="4" fill="#1E1812"/><path d="M14 60h72M14 82h22M64 82h22" stroke="#6E6454" stroke-width="2"/><path d="M80 44c6-10 4-22-2-30" stroke="#3F8F5A" stroke-width="4" fill="none" ${sway(2)}/>`],
    sub: [18, () => `<g transform="rotate(-8 50 70)"><ellipse cx="50" cy="72" rx="40" ry="18" fill="#F2C230"/><rect x="40" y="42" width="22" height="18" rx="6" fill="#E0AE1E"/><path d="M52 42V30h8" stroke="#8A7A50" stroke-width="3" fill="none"/><circle cx="34" cy="72" r="7" fill="#9FD8E8" stroke="#B88A10" stroke-width="3"/><circle cx="54" cy="72" r="7" fill="#9FD8E8" stroke="#B88A10" stroke-width="3"/><path d="M90 72l8-10v20z" fill="#B88A10"/></g>`],
    diver: [10, () => `<path d="M30 100h40l-4-8H34z" fill="#5E6B73"/><rect x="40" y="46" width="20" height="46" rx="8" fill="#2A3A46"/><rect x="58" y="50" width="10" height="30" rx="4" fill="#C9D2D8"/><circle cx="50" cy="36" r="12" fill="#2A3A46"/><rect x="42" y="30" width="16" height="9" rx="3" fill="#9FD8E8"/><path d="M40 56l-12 14M60 58l10-16" stroke="#2A3A46" stroke-width="6" stroke-linecap="round"/><path d="M44 92v-6M56 92v-6" stroke="#F2C230" stroke-width="6"/>`],
    flag: [9, () => `<path d="M30 100V12" stroke="#C9D2D8" stroke-width="5"/><path d="M32 14h30v40H32z" fill="#F4F6F8"/><path d="M62 14h30l-14 20 14 20H62z" fill="#1F4FA8"/><ellipse cx="30" cy="98" rx="14" ry="4" fill="#5E6B73"/>`],
    tank: [9, () => `<g transform="rotate(-70 50 80)"><rect x="34" y="24" width="32" height="70" rx="16" fill="#C9D2D8"/><rect x="34" y="40" width="32" height="8" fill="#F2C230"/><rect x="44" y="12" width="12" height="14" rx="3" fill="#7A8690"/><path d="M50 12V4h12" stroke="#4A5560" stroke-width="4" fill="none"/></g>`],
    bubbler: [6, () => `<ellipse cx="50" cy="94" rx="30" ry="8" fill="#5E6B73"/><rect x="38" y="80" width="24" height="12" rx="4" fill="#7A8890"/>`]
  };
  const BUBBLY = { bubbler: 1, clam: 1, diver: 1, tank: 1 };
  const decorOk = d => G.met(d.test);
  const cfg = () => { const c = AA.S.aquaCfg || (AA.S.aquaCfg = {}); c.dec = c.dec || {}; c.hide = c.hide || {}; c.nick = c.nick || {}; return c; };
  const defPos = (d, i) => ({ x: [8, 70, 30, 52, 86, 62, 18, 40, 76, 24, 92, 46, 12, 58, 34, 82, 4, 66, 28, 50][i % 20], y: [0, 2, 0, 1, 3, 0, 2, 1][i % 8], s: 1, f: 0 });
  const tierOf = l => { let k = 0; C.aquaTiers.forEach((x, i) => { if (l >= x.lvl) k = i; }); return k; };
  const nameOf = f => (cfg().nick[f.id] || f.name);

  function tankHtml(edit) {
    const S = AA.S, c = cfg(), lv = G.levelOf(S.xp).l, tier = C.aquaTiers[tierOf(lv)];
    const got = C.creatures.filter(f => S.aqua[f.id]), shown = got.filter(f => !c.hide[f.id]).slice(0, tier.max), r = u.seeded(u.seedOf("aq" + got.length));
    const fishes = shown.map((f, i) => {
      const y = 8 + r() * 58, dur = 14 + r() * 16, dl = -r() * dur, dir = r() < .5 ? "l" : "r", s = f.shape;
      const bottom = s === "star" || s === "crab" || s === "sponge" || s === "nudi", float = s === "jelly" || s === "seahorse";
      const cls = bottom ? "aq-bottom" : float ? "aq-float" : "aq-swim " + dir;
      const style = (bottom ? `left:${6 + (i * 37) % 82}%` : float ? `left:${10 + r() * 75}%;top:${y}%;animation-duration:${6 + r() * 4}s` : `top:${y}%;animation-duration:${dur}s;animation-delay:${dl}s`) + `;--sz:${tier.size}`;
      return `<button class="aq-fish ${cls}" data-f="${f.id}" style="${style}" aria-label="${u.esc(nameOf(f))}">${AA.creature(f.shape, f.c)}</button>`;
    }).join("");
    const decs = C.decor.map((d, i) => [d, i]).filter(([d]) => decorOk(d) && !(c.dec[d.id] || {}).off).map(([d, i]) => {
      const p = Object.assign(defPos(d, i), c.dec[d.id] || {}), k = DECOR[d.kind] || DECOR.rock;
      return `<div class="aq-dec ${edit ? "edit" : ""}" data-d="${d.id}" style="left:${p.x}%;bottom:${p.y}%;width:${(k[0] * p.s).toFixed(1)}%;z-index:${1 + Math.round(10 - p.y)}" ${edit ? `tabindex="0" role="button" aria-label="${u.esc(d.name)}"` : ""}><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet" style="${p.f ? "transform:scaleX(-1)" : ""}" aria-hidden="true">${k[1]()}</svg>${BUBBLY[d.kind] ? `<span class="aq-col">${[0, 1, 2, 3, 4].map(j => `<i style="animation-delay:-${j * .7}s"></i>`).join("")}</span>` : ""}</div>`;
    }).join("");
    const glow = c.night && tierOf(lv) >= 4 ? `<div class="aq-biolum">${Array.from({ length: 16 }, (_, i) => `<i style="left:${(i * 53) % 97}%;top:${(i * 31) % 80 + 5}%;animation-delay:-${i * .6}s"></i>`).join("")}</div>` : "";
    const plankton = tierOf(lv) >= 2 ? `<div class="aq-plankton">${Array.from({ length: 14 }, (_, i) => `<i style="left:${(i * 41) % 98}%;top:${(i * 23) % 90}%;animation-delay:-${i * 1.3}s"></i>`).join("")}</div>` : "";
    return `<div class="tank bg-${c.bg || "med"} floor-${c.floor || "sand"} tier-${tierOf(lv)} ${c.night ? "night" : ""} ${edit ? "editing" : ""}" id="tank">
      <div class="tank-light" aria-hidden="true"></div>${plankton}
      ${got.length ? "" : `<p class="tank-empty">${t("aqua.empty")}</p>`}
      <div class="aq-floor" aria-hidden="true"></div>${decs}${fishes}${glow}<div class="aq-food" id="food"></div>
      <button class="aq-fs iconbtn" id="aqfs" aria-label="${t("aq2.full")}">${AA.icon("expand")}</button></div>`;
  }

  AA.view("aquarium", {
    tab: "profile", depth: 8,
    leave() { if (!/^#\/aquarium/.test(location.hash) && AA.ctx) AA.ctx.aqEdit = false; },
    render(el, [focus]) {
      const S = AA.S, c = cfg(), lv = G.levelOf(S.xp).l, ti = tierOf(lv), tier = C.aquaTiers[ti], nextT = C.aquaTiers[ti + 1];
      const got = C.creatures.filter(f => S.aqua[f.id]), dec = C.decor.filter(decorOk);
      const edit = !!AA.ctx.aqEdit, tab = AA.ctx.aqTab || "look", fedToday = S.fedOn === u.today();
      const tabs = [["look", "palette", t("aq2.tLook")], ["decor", "shell", t("aq2.tDecor")], ["fish", "fish", t("aq2.tFish")], ["grow", "trophy", t("aq2.tGrow")]];
      let panel = "";
      if (tab === "look") panel = `
        <p class="eyebrow">${t("aq2.bg")}</p><div class="aq-swatches">${C.aquaBgs.map(b => { const ok = lv >= b.lvl; return `<button class="aq-bgsw bg-${b.id}" data-bg="${b.id}" aria-pressed="${(c.bg || "med") === b.id}" ${ok ? "" : "disabled"}><i></i><b>${u.esc(b.name)}</b><span>${ok ? "" : AA.icon("lock") + " " + t("ava.lvl", { l: b.lvl })}</span></button>`; }).join("")}</div>
        <p class="eyebrow">${t("aq2.floor")}</p><div class="seg">${C.aquaFloors.map(f => `<button data-floor="${f.id}" aria-pressed="${(c.floor || "sand") === f.id}" ${lv >= f.lvl ? "" : "disabled"}>${lv >= f.lvl ? "" : "🔒 "}${u.esc(f.name)}</button>`).join("")}</div>
        <p class="eyebrow">${t("aq2.light")}</p><div class="seg"><button data-night="0" aria-pressed="${!c.night}">☀ ${t("aq2.day")}</button><button data-night="1" aria-pressed="${!!c.night}">☾ ${t("aq2.night")}</button></div>
        ${ti < 4 ? `<p class="xs muted">${t("aq2.nightHint")}</p>` : ""}`;
      else if (tab === "decor") panel = `
        <p class="small muted" style="margin:0">${t("aq2.decorS", { n: dec.length, tot: C.decor.length })}</p>
        <div class="aq-declist">${C.decor.map(d => { const ok = decorOk(d), on = ok && !(c.dec[d.id] || {}).off; return `<div class="aq-decrow ${ok ? "" : "off"}"><span class="aq-decic"><svg viewBox="0 0 100 100" aria-hidden="true">${(DECOR[d.kind] || DECOR.rock)[1]()}</svg></span><span class="grow"><b>${u.esc(d.name)}</b><span class="xs muted">${ok ? (on ? t("aq2.placed") : t("aq2.stored")) : AA.icon("lock") + " " + u.esc(d.how || "")}</span></span>${ok ? `<label class="switch"><input type="checkbox" data-dt="${d.id}" ${on ? "checked" : ""} aria-label="${u.esc(d.name)}"><i></i></label>` : ""}</div>`; }).join("")}</div>
        <button class="btn ghost sm" id="aqresetpos">${AA.icon("refresh")} ${t("aq2.resetPos")}</button>`;
      else if (tab === "fish") panel = got.length ? `
        <p class="small muted" style="margin:0">${t("aq2.fishS", { n: Math.min(tier.max, got.filter(f => !c.hide[f.id]).length), max: tier.max >= 99 ? "∞" : tier.max })}</p>
        <div class="aq-declist">${got.map(f => `<div class="aq-decrow"><button class="aq-decic" data-f="${f.id}" aria-label="${u.esc(nameOf(f))}">${AA.creature(f.shape, f.c)}</button><span class="grow"><b>${u.esc(nameOf(f))}</b>${c.nick[f.id] ? `<span class="xs muted">${u.esc(f.name)}</span>` : ""}</span><button class="btn ghost sm" data-nick="${f.id}" aria-label="${t("aq2.rename")}">${AA.icon("edit")}</button><label class="switch"><input type="checkbox" data-ft="${f.id}" ${c.hide[f.id] ? "" : "checked"} aria-label="${u.esc(nameOf(f))}"><i></i></label></div>`).join("")}</div>` : `<p class="muted">${t("aqua.empty")}</p>`;
      else panel = `
        <div class="aq-tiers">${C.aquaTiers.map((x, i) => `<div class="${i <= ti ? "on" : ""} ${i === ti ? "here" : ""}"><b>${u.esc(x.name)}</b><span>${t("ava.lvl", { l: x.lvl })}</span><span class="xs">${AA.i18n.raw("aq2.tierPerks")[i]}</span></div>`).join("")}</div>
        ${nextT ? `<p class="small">${t("aq2.nextTier", { name: u.esc(nextT.name), l: nextT.lvl })}</p>` : `<p class="small">${t("aq2.maxTier")}</p>`}`;
      el.innerHTML = `${ui.head(t("aqua.title"), "profile", `<span class="chip gold">${got.length} / ${C.creatures.length}</span>`)}
        <div class="aq-layout"><div class="aq-main">
          <div class="aq-tierbar"><span class="chip">${AA.icon("fish")} ${u.esc(tier.name)}</span><span class="xs muted">${t("aq2.tierS", { n: Math.min(tier.max, got.length), max: tier.max >= 99 ? "∞" : tier.max })}</span></div>
          ${tankHtml(edit)}
          <div class="aq-actions">
            <button class="btn ${fedToday ? "ghost" : ""} sm" id="aqfeed">${AA.icon("sparkle")} ${t("aq2.feed")}${fedToday ? "" : " · +5 XP"}</button>
            <button class="btn ${edit ? "gold" : "ghost"} sm" id="aqedit" aria-pressed="${edit}">${AA.icon(edit ? "check" : "edit")} ${edit ? t("aq2.done") : t("aq2.decorate")}</button>
          </div>
          ${edit ? `<div class="aq-edithint" id="aqhint">${t("aq2.editHint")}</div><div class="aq-tools" id="aqtools" hidden><b id="aqsel"></b><button class="btn ghost sm" data-tool="smaller" aria-label="${t("aq2.smaller")}">−</button><button class="btn ghost sm" data-tool="bigger" aria-label="${t("aq2.bigger")}">+</button><button class="btn ghost sm" data-tool="flip">${t("aq2.flip")}</button><button class="btn ghost sm" data-tool="hide">${t("aq2.hide")}</button></div>` : ""}
        </div>
        <div class="aq-side card">
          <div class="seg aq-tabs" role="tablist">${tabs.map(([id, ic, l]) => `<button role="tab" data-tab="${id}" aria-selected="${tab === id}" aria-pressed="${tab === id}">${AA.icon(ic)} <span>${l}</span></button>`).join("")}</div>
          <div class="stack" style="margin-top:var(--sp-3)">${panel}</div>
        </div></div>
        <div class="section-title"><h3>${t("aqua.collection")}</h3><span class="xs muted">${t("aqua.tap")}</span></div>
        <div class="aq-grid">${C.creatures.map(f => { const ok = !!S.aqua[f.id]; return `<button class="aq-card ${ok ? "" : "off"}" data-f="${f.id}">${AA.creature(f.shape, ok ? f.c : ["var(--surface-3)", "var(--surface-3)", "var(--surface-3)"])}<b>${ok ? u.esc(nameOf(f)) : "?"}</b><span>${ok ? t("aqua.since", { d: S.aqua[f.id] }) : u.esc(f.how)}</span></button>`; }).join("")}</div>`;

      const save = () => AA.store.save();
      const open = id => {
        if (AA.ctx.aqEdit) return;
        const f = C.creatures.find(x => x.id === id); if (!f) return;
        const ok = !!S.aqua[f.id]; fx.sfx.flip();
        const close = ui.sheet(`<div class="aq-sheet">${AA.creature(f.shape, ok ? f.c : ["var(--surface-3)", "var(--surface-3)", "var(--surface-3)"])}<h3>${ok ? u.esc(nameOf(f)) : t("aqua.unknown")}</h3>
          ${ok ? `${c.nick[f.id] ? `<p class="xs muted" style="margin:0">${u.esc(f.name)}</p>` : ""}<p>${u.esc(f.fact)}</p><p class="xs muted">${t("aqua.since", { d: S.aqua[f.id] })} · ${t("aqua.how", { how: u.esc(f.how) })}</p>
            <div class="row" style="justify-content:center"><input class="input" id="nickin" maxlength="18" placeholder="${t("aq2.nickPh")}" value="${u.esc(c.nick[f.id] || "")}" style="max-width:14rem"><button class="btn sm" id="nickok">${t("aq2.rename")}</button></div>` : `<p class="muted">${t("aqua.toUnlock", { how: u.esc(f.how) })}</p>`}</div>`, f.name);
        const nb = u.$("#nickok"); if (nb) nb.onclick = () => { const v = u.$("#nickin").value.trim(); if (v) c.nick[f.id] = v; else delete c.nick[f.id]; save(); close(); AA.router.refresh(); };
      };
      u.on(el, "click", "[data-f]", (e, b) => open(b.dataset.f));
      u.on(el, "click", "[data-tab]", (e, b) => { AA.ctx.aqTab = b.dataset.tab; fx.sfx.tap(); AA.router.refresh(); });
      u.on(el, "click", "[data-bg]", (e, b) => { c.bg = b.dataset.bg; save(); fx.sfx.tap(); AA.router.refresh(); });
      u.on(el, "click", "[data-floor]", (e, b) => { c.floor = b.dataset.floor; save(); fx.sfx.tap(); AA.router.refresh(); });
      u.on(el, "click", "[data-night]", (e, b) => { c.night = b.dataset.night === "1"; save(); fx.sfx.tap(); AA.router.refresh(); });
      u.on(el, "change", "[data-dt]", (e, b) => { const d = c.dec[b.dataset.dt] = c.dec[b.dataset.dt] || {}; d.off = !b.checked; save(); AA.router.refresh(); });
      u.on(el, "change", "[data-ft]", (e, b) => { if (b.checked) delete c.hide[b.dataset.ft]; else c.hide[b.dataset.ft] = 1; save(); AA.router.refresh(); });
      u.on(el, "click", "[data-nick]", (e, b) => open(b.dataset.nick));
      const rp = u.$("#aqresetpos"); if (rp) rp.onclick = () => { Object.keys(c.dec).forEach(k => { const o = c.dec[k].off; c.dec[k] = o ? { off: true } : {}; }); save(); AA.router.refresh(); };
      u.$("#aqedit").onclick = () => { AA.ctx.aqEdit = !edit; if (!edit) AA.ctx.aqTab = "decor"; fx.sfx.tap(); AA.router.refresh(); };
      u.$("#aqfeed").onclick = () => {
        const tank = u.$("#tank"), food = u.$("#food"); if (!tank) return;
        food.innerHTML = Array.from({ length: 16 }, (_, i) => `<i style="left:${20 + Math.random() * 60}%;animation-delay:${(Math.random() * .8).toFixed(2)}s"></i>`).join("");
        tank.classList.add("fed"); fx.sfx.ok(); setTimeout(() => { tank.classList.remove("fed"); food.innerHTML = ""; }, 4200);
        if (S.fedOn !== u.today() && got.length) { S.fedOn = u.today(); G.addXp(5, u.$("#aqfeed")); save(); fx.toast(t("aq2.fedT"), t("aq2.fedS"), "fish"); const fb = u.$("#aqfeed"); fb.classList.add("ghost"); fb.lastChild.textContent = " " + t("aq2.feed"); }
      };
      const fs = u.$("#aqfs"); if (fs) fs.onclick = () => { const tk = u.$("#tank"); if (document.fullscreenElement) document.exitFullscreen(); else if (tk.requestFullscreen) tk.requestFullscreen().catch(() => {}); };

      /* Mode décorer : glisser pour déplacer, outils pour la taille, le sens et masquer. */
      if (edit) {
        const tank = u.$("#tank"); let sel = null;
        const pick = node => { u.$$(".aq-dec.sel", tank).forEach(x => x.classList.remove("sel")); sel = node; if (!node) { u.$("#aqtools").hidden = true; return; } node.classList.add("sel"); u.$("#aqtools").hidden = false; const d = C.decor.find(x => x.id === node.dataset.d); u.$("#aqsel").textContent = d ? d.name : ""; };
        const P = id => { const i = C.decor.findIndex(x => x.id === id); return c.dec[id] = Object.assign(defPos(C.decor[i], i), c.dec[id] || {}); };
        tank.addEventListener("pointerdown", e => {
          const node = e.target.closest(".aq-dec"); if (!node) { pick(null); return; }
          e.preventDefault(); pick(node); node.setPointerCapture(e.pointerId);
          const R = tank.getBoundingClientRect(), p = P(node.dataset.d), sx = e.clientX, sy = e.clientY, x0 = p.x, y0 = p.y;
          const move = ev => { p.x = u.clamp(x0 + (ev.clientX - sx) / R.width * 100, -5, 95); p.y = u.clamp(y0 - (ev.clientY - sy) / R.height * 100, 0, 30); node.style.left = p.x + "%"; node.style.bottom = p.y + "%"; node.style.zIndex = 1 + Math.round(10 - p.y); };
          const up = () => { node.removeEventListener("pointermove", move); node.removeEventListener("pointerup", up); node.removeEventListener("pointercancel", up); p.x = Math.round(p.x * 10) / 10; p.y = Math.round(p.y * 10) / 10; save(); };
          node.addEventListener("pointermove", move); node.addEventListener("pointerup", up); node.addEventListener("pointercancel", up);
        });
        tank.addEventListener("keydown", e => {
          const node = e.target.closest(".aq-dec"); if (!node) return; const p = P(node.dataset.d), st = e.shiftKey ? 5 : 1;
          const k = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, st], ArrowDown: [0, -st] }[e.key]; if (!k) return;
          e.preventDefault(); pick(node); p.x = u.clamp(p.x + k[0], -5, 95); p.y = u.clamp(p.y + k[1], 0, 30); node.style.left = p.x + "%"; node.style.bottom = p.y + "%"; save();
        });
        u.$("#aqtools").addEventListener("click", e => {
          const b = e.target.closest("[data-tool]"); if (!b || !sel) return; const id = sel.dataset.d, p = P(id), k = (DECOR[C.decor.find(x => x.id === id).kind] || DECOR.rock)[0];
          if (b.dataset.tool === "bigger") p.s = Math.min(2, Math.round((p.s + .15) * 100) / 100);
          if (b.dataset.tool === "smaller") p.s = Math.max(.5, Math.round((p.s - .15) * 100) / 100);
          if (b.dataset.tool === "flip") { p.f = p.f ? 0 : 1; u.$("svg", sel).style.transform = p.f ? "scaleX(-1)" : ""; }
          if (b.dataset.tool === "hide") { p.off = true; save(); AA.router.refresh(); return; }
          sel.style.width = (k * p.s).toFixed(1) + "%"; save(); fx.sfx.tap();
        });
      }
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
