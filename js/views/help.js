/* =====================================================================
   Abysse Academy · aide, orientation, sources et signalements
   - AA.help(clé) : fiche d'explication (contenu dans content/fr/help.js).
   - AA.helpBtn(clé) : petit bouton « ? » à placer à côté d'un titre.
   - AA.goTo(cible) : ouvre un écran ou lance une action (quiz du jour…).
   - AA.game.questGo(test) : où aller pour faire une quête.
   - AA.ui.intro(clé) : bandeau « Comment ça marche » au premier passage.
   - AA.report(cible) : signaler un problème sur un cours ou une question.
     Les signalements (S.reports) s'exportent en JSON depuis « Mes signalements ».
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, ui = AA.ui;
  const fx = () => AA.fx;

  /* ---------- Aller quelque part ---------- */
  AA.goTo = go => {
    if (!go) return;
    const Q = AA.quiz;
    const acts = {
      daily: () => Q.daily(), five: () => Q.five(), errors: () => Q.errors(), apnee: () => Q.apnee(),
      stale: () => { if (G.staleList().length) Q.stale(); else { const m = oldest(); AA.router.go(m ? "lesson/" + m.id : "map"); } },
      next: () => { const m = G.nextModule(); AA.router.go(m ? "lesson/" + m.id : "map"); },
      examquick: () => Q.exam(false), examfull: () => Q.exam(true), srs: () => Q.srs()
    };
    if (typeof go === "function") return go();
    if (acts[go]) return acts[go]();
    AA.router.go(go);
  };
  const oldest = () => C.modules.filter(m => G.stars(m.id) >= 1 && G.inPlay(m)).sort((a, b) => (G.lastSeen(a.id) || "").localeCompare(G.lastSeen(b.id) || ""))[0];

  /* Quête → action. Renvoie [cible, libellé] ou null. */
  G.questGo = c => {
    if (!c) return null;
    const next = () => { const m = G.nextModule(); return m ? "lesson/" + m.id : "map"; };
    const DAY = { ans: "daily", ok: "daily", flash: "flash", scen: "scen", apnee: "apnee", read: "next", five: "five", sim: "sim", calc: "calc" };
    switch (c.k) {
      case "day": return DAY[c.f] || "daily";
      case "dailyDone": case "combo": case "streak": case "level": case "xp": case "answers": case "accuracy": case "daily": return "daily";
      case "keepToday": case "keep": return "stale";
      case "stars": return c.m ? "lesson/" + c.m : next();
      case "modulesDone": case "perfect": case "read": return "next";
      case "deep": { const m = G.nextModule(); return m ? "lesson/" + m.id + "/approfondir" : "map"; }
      case "validated": { const m = G.nextModule(); return m ? "lesson/" + m.id + "/moniteur" : "map"; }
      case "worldStars": case "noStale": return "map/" + c.w;
      case "scen": case "scenAll": return "scen";
      case "table": return "tables";
      case "exam": return c.full ? "examfull" : "examquick";
      case "apnee": return "apnee";
      case "rescued": return "errors";
      case "flash": case "boxes": return "flash";
      case "sim": return "sim";
      case "duel": return "club";
      case "boss": return "boss/" + c.w;
      case "bossAny": return "train";
      case "story": return c.id ? "story/" + c.id : "story";
      case "five": return "five";
      case "gloss": return "glossary";
      case "aqua": return "aquarium";
      case "chapter": return "quests";
      default: return null;
    }
  };

  /* ---------- Fiches d'aide ---------- */
  AA.help = key => {
    const h = (C.help || {})[key]; if (!h) return;
    const close = ui.sheet(`<div class="help-sheet stack"><div class="help-ic">${AA.icon(h.ic || "info")}</div><h3>${u.esc(h.t)}</h3><div class="prose">${h.html}</div>
      ${h.go ? `<button class="btn block" data-hgo>${AA.icon("next")} ${u.esc(h.goL || t("help.go"))}</button>` : ""}
      <button class="btn ghost block" data-no>${t("help.ok")}</button></div>`, h.t);
    const b = u.$("[data-hgo]"); if (b) b.onclick = () => { close(); AA.goTo(h.go); };
    if (AA.gloss && AA.gloss.link) { const p = u.$(".help-sheet .prose"); if (p) try { AA.gloss.link(p); } catch (e) {} }
  };
  AA.helpBtn = (key, extra) => `<button class="helpbtn ${extra || ""}" data-help="${key}" aria-label="${t("help.what")} ${u.esc(((C.help || {})[key] || {}).t || "")}">?</button>`;
  document.addEventListener("click", e => { const b = e.target.closest("[data-help]"); if (!b) return; e.preventDefault(); e.stopPropagation(); fx() && fx().sfx.tap(); AA.help(b.dataset.help); }, true);

  /* Bandeau d'explication au premier passage sur un écran (fermable, « ? » pour le revoir). */
  ui.intro = key => {
    const h = (C.help || {})[key], seen = AA.S.introSeen || {}; if (!h || seen[key]) return "";
    return `<div class="intro-card" data-intro="${key}"><span class="help-ic sm">${AA.icon(h.ic || "info")}</span><div class="grow"><b>${t("help.first")} ${u.esc(h.t)}</b><span class="small">${firstPara(h.html)}</span>
      <div class="row"><button class="btn sm" data-help="${key}">${t("help.more")}</button><button class="btn ghost sm" data-introok="${key}">${t("help.gotIt")}</button></div></div></div>`;
  };
  const firstPara = html => { const m = /<p>([\s\S]*?)<\/p>/.exec(html); return m ? m[1] : ""; };
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-introok]"); if (!b) return;
    const S = AA.S; S.introSeen = S.introSeen || {}; S.introSeen[b.dataset.introok] = 1; AA.store.save();
    const c = b.closest(".intro-card"); if (c) { c.classList.add("bye"); setTimeout(() => c.remove(), 250); }
  });

  /* ---------- Compteurs du haut : flamme, éclair, compte à rebours ---------- */
  AA.hudSheet = kind => {
    const S = AA.S, lv = G.levelOf(S.xp), st = G.streak();
    if (kind === "xp") {
      const close = ui.sheet(`<div class="help-sheet stack"><div class="help-ic gold">${AA.icon("bolt")}</div><h3>${t("hud.xpT", { xp: S.xp })}</h3>
        <p>${t("hud.xpLvl", { l: lv.l, rank: u.esc(lv.rank) })}</p>${ui.bar(lv.into / lv.need, "var(--gold)")}<p class="small muted">${t("prof.toNext", { n: lv.need - lv.into })}${lv.nextRank ? " · " + t("hud.nextRank", { l: lv.nextRank }) : ""}</p>
        <div class="prose">${C.help.xp.html}</div><button class="btn block" data-hx="daily">${AA.icon("play")} ${t("hud.earn")}</button><a class="btn ghost block" href="#/profile">${t("hud.seeProfile")}</a></div>`, t("help.what"));
      u.$("[data-hx]").onclick = () => { close(); AA.tutor ? AA.tutor.session() : AA.goTo("daily"); };
    } else if (kind === "streak") {
      const days = new Set(S.days || []), cells = Array.from({ length: 14 }, (_, i) => u.addDays(i - 13));
      const doneToday = days.has(u.today());
      const close = ui.sheet(`<div class="help-sheet stack"><div class="help-ic fire">${AA.icon("flame")}</div><h3>${t("hud.streakT", { n: st })}</h3>
        <p>${doneToday ? t("hud.streakOk") : t("hud.streakTodo")}</p>
        <div class="streak-cal" aria-label="${t("hud.last14")}">${cells.map(d => `<i class="${days.has(d) ? "on" : ""} ${d === u.today() ? "today" : ""}" title="${d}"></i>`).join("")}</div><p class="xs muted center">${t("hud.last14")}</p>
        <div class="prose">${C.help.streak.html}</div>${doneToday ? "" : `<button class="btn block" data-hx>${AA.icon("play")} ${t("hud.keep")}</button>`}</div>`, t("help.what"));
      const b = u.$("[data-hx]"); if (b) b.onclick = () => { close(); AA.tutor ? AA.tutor.session() : AA.goTo("five"); };
    } else AA.help(kind);
  };

  /* ---------- Signaler un problème ---------- */
  const KINDS = ["wrong", "unclear", "source", "typo", "idea"];
  /* Fichier(s) à corriger : le cours de base, et son complément « deep-* » (1.5) s'il existe. */
  const DEEP = { n3: "deep-n3", n4: "deep-n4", e2: "deep-n4", nitrox: "deep-n4", rifap: "deep-rifap-e1", e1: "deep-rifap-e1", n1: "deep-rifap-e1", decouverte: "deep-rifap-e1" };
  const fileOf = (world, gen) => gen ? "content/fr/generators*.js ou deep-*.js (générateur " + gen + ")" : "content/fr/" + ({ nitrox: "n4", e2: "n4" }[world] || world) + ".js" + (DEEP[world] ? " + content/fr/" + DEEP[world] + ".js" : "");
  /* cible : { type: "lesson", m, tab } ou { type: "question", q } */
  AA.report = target => {
    const o = { kind: "wrong" };
    let label = "", ref = "", text = "", world = "", gen = "";
    if (target.type === "question") {
      const q = target.q, m = C.byId[q.m]; world = m ? m.world : ""; gen = q.gen || "";
      ref = q.gen ? "gen:" + q.gen : q.id; label = t("rep.onQ", { m: m ? m.title : "" });
      text = q.q + "\n" + q.c.map((c, i) => (i === q.a ? "✓ " : "· ") + c).join("\n") + "\n→ " + q.e;
    } else {
      const m = C.byId[target.m]; world = m.world; ref = m.id + (target.tab ? "/" + target.tab : ""); label = t("rep.onL", { m: m.title, tab: t("lesson.tab." + (target.tab || "essentiel")) });
      text = m.title;
    }
    const body = () => `<p class="eyebrow">${t("rep.title")}</p><h3>${u.esc(label)}</h3>
      <div class="chips-wrap">${KINDS.map(k => `<button class="chip ${o.kind === k ? "on" : ""}" data-rk="${k}" aria-pressed="${o.kind === k}">${t("rep.k." + k)}</button>`).join("")}</div>
      <div class="field"><label for="repn">${t("rep.noteQ")}</label><textarea class="input" id="repn" rows="4" maxlength="1500" placeholder="${t("rep.notePh")}">${u.esc(o.note || "")}</textarea></div>
      <button class="btn block" id="repok">${AA.icon("flag")} ${t("rep.send")}</button><p class="xs muted center">${t("rep.where")}</p>`;
    const close = ui.sheet(`<div class="stack rep-sheet" id="repbody">${body()}</div>`, t("rep.title"));
    const wire = () => {
      u.$$("#repbody [data-rk]").forEach(b => b.onclick = () => { o.note = u.$("#repn").value; o.kind = b.dataset.rk; u.$("#repbody").innerHTML = body(); wire(); });
      u.$("#repok").onclick = () => {
        const S = AA.S; S.reports = S.reports || [];
        S.reports.push({ id: Date.now().toString(36), d: u.today(), v: AA.VERSION, kind: o.kind, type: target.type, ref, world, file: fileOf(world, gen), label, text, note: u.$("#repn").value.trim() });
        AA.store.save(); close(); fx().sfx.up();
        fx().toast(t("rep.okT"), t("rep.okS", { n: S.reports.length }), "flag", () => AA.router.go("reports"));
      };
    };
    wire();
  };
  AA.reportBtn = (attrs, cls) => `<button class="linkbtn rep-btn ${cls || ""}" ${attrs}>${AA.icon("flag")} ${t("rep.btn")}</button>`;

  const exportText = list => list.map((r, i) => `## ${i + 1}. ${t("rep.k." + r.kind)} · ${r.label}\n- Réf. : ${r.ref} (${r.file})\n- Date : ${r.d}, v${r.v}\n- Remarque : ${r.note || "—"}\n\n${r.text}\n`).join("\n");
  AA.view("reports", {
    tab: "profile", depth: 3,
    render(el) {
      const S = AA.S, list = S.reports || [];
      el.innerHTML = `${ui.head(t("rep.list"), "profile", AA.helpBtn("reports"))}
        <p class="muted">${t("rep.listS")}</p>
        ${list.length ? `<div class="row" style="margin:var(--sp-3) 0"><button class="btn" id="repx">${AA.icon("download")} ${t("rep.export")}</button><button class="btn ghost" id="repc">${AA.icon("share")} ${t("rep.copy")}</button></div><p class="small" id="repmsg" role="status"></p>
        <div class="stack">${list.slice().reverse().map(r => `<section class="card rep-item"><div class="row between"><span class="chip">${t("rep.k." + r.kind)}</span><span class="xs muted">${u.fmtDate ? u.fmtDate(r.d) : r.d}</span></div>
          <b>${u.esc(r.label)}</b>${r.note ? `<p class="small" style="margin:0">${u.esc(r.note)}</p>` : ""}<p class="xs muted mono" style="margin:0">${u.esc(r.ref)}</p>
          <div class="row">${r.type === "lesson" ? `<a class="btn ghost sm" href="#/lesson/${u.esc(r.ref)}">${t("rep.open")}</a>` : ""}<button class="btn ghost sm danger" data-rdel="${r.id}">${t("rep.del")}</button></div></section>`).join("")}</div>
        <button class="btn ghost block" id="repall" style="margin-top:var(--sp-4)">${t("rep.clear")}</button>`
        : ui.empty("flag", t("rep.noneT"), t("rep.noneS"))}`;
      const msg = s => { const m = u.$("#repmsg"); if (m) m.textContent = s; };
      const x = u.$("#repx"); if (x) x.onclick = () => AA.pwa.saveFile("abysse-signalements-" + u.today() + ".json", JSON.stringify({ app: "abysse-academy", version: AA.VERSION, exported: u.today(), reports: list }, null, 2), msg);
      const c = u.$("#repc"); if (c) c.onclick = async () => {
        const txt = "Signalements Abysse Academy\n\n" + exportText(list);
        if (navigator.share) { try { await navigator.share({ title: t("rep.list"), text: txt }); return; } catch (e) {} }
        try { await navigator.clipboard.writeText(txt); msg(t("club.copied")); } catch (e) { msg(t("club.copyFail")); }
      };
      u.$$("[data-rdel]", el).forEach(b => b.onclick = () => { S.reports = list.filter(r => r.id !== b.dataset.rdel); AA.store.save(); AA.router.refresh(); });
      const all = u.$("#repall"); if (all) all.onclick = () => ui.confirm(t("rep.clearQ"), t("rep.clear"), () => { S.reports = []; AA.store.save(); AA.router.refresh(); });
    }
  });

  /* ---------- Sources ---------- */
  AA.sourcesHtml = m => `<details class="sources"><summary>${AA.icon("book")} ${t("src.title")}</summary>
    ${C.sourcesFor(m).map(k => { const s = C.sources[k]; return `<p class="eyebrow">${u.esc(s.t)}</p><ul>${s.list.map(([a, url, why]) => `<li>${url ? `<a href="${url}" target="_blank" rel="noopener">${u.esc(a)}</a>` : u.esc(a)}<br><span class="xs muted">${u.esc(why)}</span></li>`).join("")}</ul>`; }).join("")}
    <p class="xs muted">${t("src.note")}</p></details>`;
  AA.view("sources", {
    tab: "profile", depth: 3,
    render(el) {
      el.innerHTML = `${ui.head(t("src.page"), "profile")}<div class="prose">${C.help.sources.html}</div>
        ${Object.values(C.sources).map(s => `<section class="card" style="margin-top:var(--sp-3)"><h3>${u.esc(s.t)}</h3><ul class="src-list">${s.list.map(([a, url, why]) => `<li>${url ? `<a href="${url}" target="_blank" rel="noopener">${u.esc(a)}</a>` : `<b>${u.esc(a)}</b>`}<br><span class="small muted">${u.esc(why)}</span></li>`).join("")}</ul></section>`).join("")}
        <a class="btn ghost block" style="margin-top:var(--sp-4)" href="#/valider">${AA.icon("check")} ${t("set.validate")}</a>`;
    }
  });

  /* ---------- À faire valider par ton moniteur ---------- */
  AA.view("valider", {
    tab: "profile", depth: 3,
    render(el) {
      const S = AA.S; S.validOk = S.validOk || {};
      const n = C.validate.filter(([a]) => S.validOk[a]).length;
      el.innerHTML = `${ui.head(t("set.validate"), "profile", AA.helpBtn("validate"))}
        <div class="callout"><span class="eyebrow">${t("val.whatT")}</span>${t("val.whatS")}</div>
        <div class="row between" style="margin:var(--sp-3) 0"><b>${t("val.count", { n, tot: C.validate.length })}</b><button class="btn ghost sm" id="valshare">${AA.icon("share")} ${t("val.share")}</button></div>
        ${ui.bar(n / Math.max(1, C.validate.length), "var(--ok)")}
        <div class="stack" style="margin-top:var(--sp-3)">${C.validate.map(([a, b]) => `<label class="setting val-item ${S.validOk[a] ? "ok" : ""}"><span class="grow"><b>${u.esc(a)}</b><span>${u.esc(b)}</span>${S.validOk[a] ? `<span class="xs" style="color:var(--ok)">${t("val.okOn", { d: u.fmtDate(S.validOk[a]) })}</span>` : ""}</span><span class="switch"><input type="checkbox" data-val="${u.esc(a)}" ${S.validOk[a] ? "checked" : ""}><i></i></span></label>`).join("")}</div>
        <p class="small muted" style="margin-top:var(--sp-4)">${t("val.diff")}</p>
        <div class="row"><a class="btn ghost" href="#/reports">${AA.icon("flag")} ${t("rep.list")}</a><a class="btn ghost" href="#/sources">${AA.icon("book")} ${t("src.page")}</a></div>
        <p class="small" id="valmsg" role="status"></p>`;
      u.$$("[data-val]", el).forEach(i => i.onchange = () => { if (i.checked) S.validOk[i.dataset.val] = u.today(); else delete S.validOk[i.dataset.val]; AA.store.save(); if (i.checked) fx().sfx.ok(); AA.router.refresh(); });
      u.$("#valshare").onclick = async () => {
        const txt = t("val.shareHead") + "\n\n" + C.validate.map(([a, b]) => `${S.validOk[a] ? "✓" : "☐"} ${a} : ${b}`).join("\n");
        if (navigator.share) { try { await navigator.share({ title: t("set.validate"), text: txt }); return; } catch (e) {} }
        try { await navigator.clipboard.writeText(txt); u.$("#valmsg").textContent = t("club.copied"); } catch (e) { u.$("#valmsg").textContent = t("club.copyFail"); }
      };
    }
  });
})();
