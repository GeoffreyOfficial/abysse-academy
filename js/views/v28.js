/* =====================================================================
   2.8.0 · Retours après un vol (hors ligne) et parcours guidé.
   - Hors ligne : bandeau clair tant qu'il n'y a pas de réseau (progression
     gardée sur l'appareil, synchro Google au retour), synchro automatique
     dès que le réseau revient.
   - « Lu » veut dire lu : un thème validé au test de positionnement ou
     d'un niveau déjà obtenu n'est plus affiché comme lu.
   - Chaque thème en 3 étapes : 1 Lire, 2 S'entraîner (quiz du thème à
     50 % ou plus), 3 Gardien. Le gardien attend les deux premières.
   - Plus de réponses à taper : toutes les valeurs chiffrées, pas seulement
     les calculs générés (80 % des cas, hors duel).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, T = AA.tutor, Q = AA.quiz, GM = AA.games, V = AA.views, fx = AA.fx, ui = AA.ui, esc = u.esc;
  if (!T || !Q) return;
  const S = () => AA.S;
  const inArt = () => !!(window.claude && window.claude.use);

  /* ---------- Hors ligne ---------- */
  const netbar = () => {
    let b = document.getElementById("netbar");
    const off = !navigator.onLine;
    if (!off) { if (b) b.remove(); return; }
    const linked = !!(AA.sync && AA.sync.linked && AA.sync.linked());
    const txt = inArt() ? t("nb.art") : linked ? t("nb.sync") : t("nb.local");
    if (!b) { b = document.createElement("button"); b.id = "netbar"; b.type = "button"; b.setAttribute("role", "status"); b.onclick = () => AA.netSheet && AA.netSheet(); document.body.appendChild(b); }
    b.innerHTML = `${AA.icon("offline")}<span><b>${t("nb.t")}</b> · ${txt}</span>`;
  };
  AA.netbar = netbar;
  addEventListener("offline", netbar);
  addEventListener("online", () => {
    netbar();
    const sy = AA.sync;
    if (sy && sy.linked && sy.linked() && sy.possible && sy.possible()) {
      setTimeout(() => sy.now(false).then(ok => { if (ok) fx.toast(t("nb.syncedT"), t("nb.syncedS"), "refresh"); }), 1500);
    }
  });
  setTimeout(netbar, 300);

  /* ---------- « Lu » = vraiment lu ---------- */
  const placed = mid => !!(S().placed || {})[mid];
  const cert = mid => { const m = C.byId[mid]; return !!(m && AA.path && AA.path.certified(m.world)); };
  /* Réparation unique : les cours marqués lus par l'ancienne migration (étoiles 2.0) sans quiz ni lecture réelle. */
  T.fixRead = () => {
    const s = S(); if (s.v28read) return 0; let n = 0;
    Object.keys(s.read || {}).forEach(mid => { const r = s.read[mid]; if (r && r.e && r.mig && !r.x && !(s.themes || {})[mid]) { delete r.e; delete r.mig; n++; } });
    s.v28read = 1; return n;
  };
  const state0 = T.state;
  T.state = mid => {
    const st = state0(mid);
    if (S().unlockAll || T.explicitRead(mid)) return st;
    if (cert(mid)) return "cert";
    if (placed(mid)) return "placed";
    return st === "toread" ? st : "toread";
  };
  const chip0 = T.chip;
  T.chip = mid => T.state(mid) === "placed" ? `<span class="chip tu-st st-placed">${AA.icon("check")} ${t("tu.st.placed")}</span>` : chip0(mid);
  const wi0 = T.worldInfo;
  T.worldInfo = wid => { const I = wi0(wid); I.read = I.l.filter(m => T.explicitRead(m.id)).length; return I; };

  /* ---------- Trois étapes par thème ---------- */
  T.steps = mid => {
    const read = T.explicitRead(mid), train = G.stars(mid) >= 1, guard = !!(GM && GM.miniWon && GM.miniWon(mid));
    const free = !!S().unlockAll || cert(mid) || placed(mid);
    return { read, train, guard, free, ready: free || (read && train), next: !read ? "read" : !train ? "train" : !guard ? "guard" : null };
  };
  T.stepsHtml = (mid, compact) => {
    const s = T.steps(mid), m = C.byId[mid]; if (!m) return "";
    const it = (k, n, done, ic) => {
      const cls = `tu3 ${done ? "done" : s.next === k ? "next" : "todo"}${k === "guard" && !s.ready && !done ? " lock" : ""}`;
      const lab = `<span class="tu3-n">${done ? AA.icon("check") : n}</span><span class="tu3-l">${t("st3." + k)}</span>`;
      if (compact) return `<span class="${cls}">${lab}</span>`;
      const href = k === "read" ? `#/lesson/${mid}` : k === "guard" ? `#/gardien/${mid}` : "";
      return href ? `<a class="${cls}" href="${href}">${lab}${AA.icon(k === "guard" && !s.ready && !done ? "lock" : ic)}</a>` : `<button class="${cls}" data-st3quiz="${mid}">${lab}${AA.icon(ic)}</button>`;
    };
    const parts = [it("read", 1, s.read, "book"), it("train", 2, s.train, "play"), it("guard", 3, s.guard, "swords")];
    if (compact) return `<span class="tu3s" aria-label="${t("st3.aria")}">${parts.join('<i class="tu3-j"></i>')}</span>`;
    const hint = s.next ? t("st3.h." + s.next) + (s.next !== "read" && s.free && !s.read ? " " + t("st3.free") : "") : t("st3.h.done");
    return `<section class="card tu3-card"><p class="eyebrow">${t("st3.title")}</p><div class="tu3s big">${parts.join('<i class="tu3-j"></i>')}</div><p class="small muted" style="margin:var(--sp-2) 0 0">${hint}</p></section>`;
  };
  document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("[data-st3quiz]"); if (!b) return; const m = C.byId[b.dataset.st3quiz]; if (m) { fx.sfx.tap(); Q.module(m); } });
  const wrap = (name, fn) => { const v = V[name]; if (!v) return; const r = v.render; v.render = function (el, args) { const out = r.call(this, el, args); try { fn(el, args || []); } catch (e) { console.error(e); } return out; }; };
  /* Cours : chaque thème montre ses 3 étapes. */
  wrap("cours", el => {
    u.$$(".tu-step:not(.exam) .tu-step-a", el).forEach(a => { const mid = (a.getAttribute("href") || "").split("/")[2]; const b = u.$(".tu-step-b", a); if (mid && b && !u.$(".tu3s", b)) b.insertAdjacentHTML("beforeend", T.stepsHtml(mid, true)); });
  });
  /* Page du cours : les 3 étapes en tête. */
  wrap("lesson", (el, [id]) => {
    if (!C.byId[id] || u.$(".tu3-card", el)) return;
    const h = u.$(".pagehead", el); if (h) h.insertAdjacentHTML("afterend", T.stepsHtml(id));
    u.$$(".gm-lg", el).forEach(a => { if (!T.steps(id).ready) a.remove(); });
  });
  /* Carte : « fait » seulement si vraiment lu ; le gardien n'apparaît que quand il est prêt. */
  wrap("map", el => {
    u.$$(".spot", el).forEach(sp => { const b = u.$(".node[data-id]", sp); if (!b) return; const id = b.dataset.id, real = T.explicitRead(id) || cert(id) || !!S().unlockAll;
      b.classList.toggle("done", real); b.classList.toggle("placed", !real && placed(id));
      const gc = u.$(".gm-gchip", sp); if (gc && !T.steps(id).ready) gc.remove(); });
  });
  /* Espace Jeux : gardiens verrouillés tant que les 2 premières étapes ne sont pas faites. */
  wrap("jeux", el => {
    u.$$(".gm-g[href^='#/gardien/']", el).forEach(a => { const id = a.getAttribute("href").split("/")[2], s = T.steps(id); if (!s.ready && !s.guard) { a.classList.remove("ready"); a.classList.add("lock"); } });
  });
  /* Gardien : écran d'attente qui dit quoi faire d'abord. */
  if (V.gardien) {
    const g0 = V.gardien.render;
    V.gardien.render = function (el, args) {
      const mid = (args || [])[0], m = C.byId[mid], s = m && T.steps(mid), live = GM.battle && GM.battle();
      if (!m || s.ready || s.guard || (live && live.def && live.def.mid === mid)) return g0.call(this, el, args);
      el.innerHTML = `${ui.head(t("gm.guardOf", { t: esc(m.title) }), "cours/" + m.world)}
        <section class="card st3-lock"><span class="medal">${AA.icon("lock")}</span><h2 class="h3">${t("st3.lockT")}</h2><p class="small muted">${t("st3.lockS")}</p></section>
        ${T.stepsHtml(mid)}`;
    };
  }
  const acts0 = T.actions;
  T.actions = () => acts0().filter(a => a.k !== "mini" || (() => { const m = C.modules.find(x => a.t === t("gm.a.mini", { t: x.title })); return !m || T.steps(m.id).ready; })());

  /* ---------- Réponses à taper ---------- */
  const ct0 = Q.canType;
  const LISTY = /parmi|lequel|laquelle|lesquel|ces valeurs|n[’']est pas|ne .{1,30} pas|faux|incorrect|intrus/i;
  Q.canType = q => !!q && (ct0(q) || (!q.gen && !q.proc && !LISTY.test(q.q || "") && ct0(Object.assign({}, q, { calc: true }))));
  Q.typeRate = .8;

  const st0 = AA.router.start;
  AA.router.start = function () { try { if (T.fixRead()) AA.store.save(true); } catch (e) {} const out = st0.apply(this, arguments); try { netbar(); } catch (e) {} return out; };
})();

/* =====================================================================
   2.8.0 · Aventure du boss sur la carte, calculatrice de plongée.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, Q = AA.quiz, GM = AA.games, V = AA.views, fx = AA.fx, esc = u.esc;
  if (!Q) return;

  /* ---------- Carte : l'aventure qui mène au boss, juste avant lui ---------- */
  if (V.map) {
    const m0 = V.map.render;
    V.map.render = function (el, args) {
      const out = m0.call(this, el, args);
      try {
        const bs = u.$(".bossspot", el), wid = (args && args[0]) || G.goalWorld(), s = C.storyById && C.storyById["boss-" + wid];
        if (bs && s && !u.$(".questspot", el)) {
          const rec = (AA.S.story || {})[s.id] || {}, done = !!rec.done, started = !done && rec.node && rec.node !== s.start;
          const cls = done ? "done" : "cur";
          bs.insertAdjacentHTML("beforebegin", `<div class="spot questspot" data-depth="${bs.dataset.depth || 0}"><a class="node quest ${cls}" href="#/story/${s.id}" aria-label="${esc(s.title)}">${AA.icon("scroll")}</a>
            <div class="info"><small>${t("qm.eyebrow")}</small><b>${esc(s.title)}</b><span>${done ? t("qm.done") : started ? `<span style="color:var(--primary)">${t("qm.resume")}</span>` : `<span style="color:var(--primary)">${t("qm.todo")}</span>`}</span></div></div>`);
        }
      } catch (e) { console.error(e); }
      return out;
    };
  }

  /* ---------- Calculatrice ---------- */
  const OPS = { "+": [1, (a, b) => a + b], "−": [1, (a, b) => a - b], "×": [2, (a, b) => a * b], "÷": [2, (a, b) => a / b] };
  /* Évalue sans eval : nombres, + − × ÷, parenthèses, %, x², √. */
  Q.calcEval = src => {
    const s = String(src).replace(/,/g, ".").replace(/\*/g, "×").replace(/\//g, "÷").replace(/-/g, "−").replace(/\s+/g, "");
    const toks = []; let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (/[\d.]/.test(ch)) { let j = i; while (j < s.length && /[\d.]/.test(s[j])) j++; const v = parseFloat(s.slice(i, j)); if (!isFinite(v)) return null; toks.push(v); i = j; continue; }
      if (ch === "−" && (!toks.length || (typeof toks[toks.length - 1] === "string" && toks[toks.length - 1] !== ")" && toks[toks.length - 1] !== "²" && toks[toks.length - 1] !== "%"))) { toks.push("neg"); i++; continue; }
      if ("+−×÷()√²%".includes(ch)) { toks.push(ch); i++; continue; }
      return null;
    }
    const out = [], st = [];
    const prec = o => o === "neg" || o === "√" ? 3 : OPS[o] ? OPS[o][0] : 0;
    for (const k of toks) {
      if (typeof k === "number") out.push(k);
      else if (k === "²" || k === "%") out.push(k);
      else if (k === "neg" || k === "√") st.push(k);
      else if (k === "(") st.push(k);
      else if (k === ")") { while (st.length && st[st.length - 1] !== "(") out.push(st.pop()); if (!st.length) return null; st.pop(); if (st.length && (st[st.length - 1] === "√" || st[st.length - 1] === "neg")) out.push(st.pop()); }
      else { while (st.length && st[st.length - 1] !== "(" && prec(st[st.length - 1]) >= prec(k)) out.push(st.pop()); st.push(k); }
    }
    while (st.length) { const o = st.pop(); if (o === "(") return null; out.push(o); }
    const v = [];
    for (const k of out) {
      if (typeof k === "number") v.push(k);
      else if (k === "²") { if (!v.length) return null; v.push(v.pop() ** 2); }
      else if (k === "%") { if (!v.length) return null; v.push(v.pop() / 100); }
      else if (k === "neg") { if (!v.length) return null; v.push(-v.pop()); }
      else if (k === "√") { if (!v.length) return null; const a = v.pop(); if (a < 0) return null; v.push(Math.sqrt(a)); }
      else { if (v.length < 2) return null; const b = v.pop(), a = v.pop(); v.push(OPS[k][1](a, b)); }
    }
    return v.length === 1 && isFinite(v[0]) ? v[0] : null;
  };
  const fmt = x => { if (x == null) return "—"; const r = Math.round(x * 1e6) / 1e6; return String(r).replace(".", ","); };
  const KEYS = ["C", "(", ")", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ",", "⌫", "=", "√", "x²", "%", "Ans"];
  let expr = "", ans = null;
  const panel = () => document.getElementById("divecalc");
  AA.calc = {
    open() {
      if (panel()) return;
      const p = document.createElement("section"); p.id = "divecalc"; p.className = "dcalc"; p.setAttribute("role", "dialog"); p.setAttribute("aria-label", t("cx.title"));
      const fish = Array.from({ length: 5 }, (_, i) => `<span class="dc-fish f${i}">${AA.creature(["damsel", "wrasse", "fish", "bream", "damsel"][i], [["#F2C230", "#2B6FD6", "#F07A3A"], ["#E8763A", "#2BA8C8", "#F3C64A"], ["#C9D2D8", "#3A4650", "#9AA6AE"], ["#B8C4CC", "#14202A", "#8C9BA5"], ["#2BA8C8", "#1E3A46", "#F3C64A"]][i])}</span>`).join("");
      p.innerHTML = `<div class="dc-sea" aria-hidden="true">${fish}<i class="dc-b b1"></i><i class="dc-b b2"></i><i class="dc-b b3"></i><i class="dc-b b4"></i></div>
        <div class="dc-top"><b>${AA.icon("calc")} ${t("cx.title")}</b><button class="iconbtn" id="dcx" aria-label="${t("cx.close")}">${AA.icon("close")}</button></div>
        <div class="dc-lcd" aria-live="polite"><span class="dc-expr" id="dcexpr">&nbsp;</span><span class="dc-res" id="dcres">0</span><span class="dc-unit">${t("cx.lcd")}</span></div>
        <div class="dc-keys">${KEYS.map(k => `<button class="dc-k ${/[0-9,]/.test(k) ? "n" : k === "=" ? "eq" : k === "C" ? "c" : "op"}" data-k="${k}">${k}</button>`).join("")}</div>
        <button class="btn block sm" id="dcins" hidden>${AA.icon("check")} ${t("cx.insert")}</button>`;
      document.body.appendChild(p);
      const show = () => { const v = Q.calcEval(expr.replace(/Ans/g, ans == null ? "0" : "(" + ans + ")")); u.$("#dcexpr").textContent = expr ? expr : " "; u.$("#dcres").textContent = expr ? fmt(v) : fmt(ans == null ? 0 : ans); AA.calc._v = v; const nin = document.getElementById("numv"); u.$("#dcins").hidden = !(nin && !nin.disabled && (v != null || ans != null)); };
      p.addEventListener("click", e => {
        const b = e.target.closest("[data-k]"); if (!b) return; const k = b.dataset.k; fx.sfx && fx.sfx.tap && fx.sfx.tap();
        if (k === "C") expr = "";
        else if (k === "⌫") expr = expr.replace(/(Ans|.)$/, "");
        else if (k === "=") { const v = Q.calcEval(expr.replace(/Ans/g, ans == null ? "0" : "(" + ans + ")")); if (v != null) { ans = v; expr = ""; p.classList.remove("bubbleup"); void p.offsetWidth; p.classList.add("bubbleup"); } else { const l = u.$("#dcres"); l.classList.add("shake"); setTimeout(() => l.classList.remove("shake"), 400); } }
        else if (k === "x²") expr += "²";
        else if (k === "√") expr += "√(";
        else expr += k;
        show();
      });
      u.$("#dcx").onclick = () => AA.calc.close();
      u.$("#dcins").onclick = () => { const v = expr ? AA.calc._v : ans, nin = document.getElementById("numv"); if (nin && v != null) { nin.value = fmt(v); nin.dispatchEvent(new Event("input", { bubbles: true })); try { nin.focus({ preventScroll: true }); } catch (e) {} AA.calc.close(); } };
      addEventListener("keydown", AA.calc._key);
      show();
    },
    close() { const p = panel(); if (p) p.remove(); removeEventListener("keydown", AA.calc._key); },
    _key(e) { const p = panel(); if (!p || e.target.id === "numv") return; const map = { "/": "÷", "*": "×", "-": "−", "+": "+", Enter: "=", Backspace: "⌫", Escape: "x", ".": ",", ",": ",", "(": "(", ")": ")" }; const k = /^[0-9]$/.test(e.key) ? e.key : map[e.key]; if (!k) return; e.preventDefault(); if (k === "x") return AA.calc.close(); const b = p.querySelector(`[data-k="${k}"]`); if (b) b.click(); }
  };
  /* Question qui demande un calcul : propositions chiffrées ou calcul généré. */
  Q.needsCalc = q => !!q && !q.proc && (!!q.calc || !!q.gen || (Q.canType && Q.canType(q) && /\d/.test(q.q || "")));
  const btn = () => `<button class="chip dc-open" id="dcopen" type="button">${AA.icon("calc")} ${t("cx.open")}</button>`;
  if (V.quiz) {
    const q0 = V.quiz.render;
    V.quiz.render = function (el, args) {
      const out = q0.call(this, el, args);
      try { const c = AA.ctx || {}, it = c.items && c.items[c.idx], h = u.$(".qhead", el);
        if (it && h && Q.needsCalc(it.q) && c.mode !== "duel" && c.mode !== "rduel" && !u.$("#dcopen", el)) { h.insertAdjacentHTML("afterend", `<div class="qactions cx-row">${btn()}</div>`); u.$("#dcopen", el).onclick = () => AA.calc.open(); }
        else if (!it || !Q.needsCalc(it.q)) AA.calc.close();
      } catch (e) {}
      return out;
    };
  }
  /* Combats : même bouton sous la question. */
  new MutationObserver(() => {
    const box = document.getElementById("btQbox"); if (!box || u.$("#dcopen", box)) return;
    const b = GM && GM.battle && GM.battle(), qs = GM && GM.qs ? GM.qs() : [], q = b ? qs[b.i] : null;
    if (q && Q.needsCalc(q)) { const h = u.$(".bt-q, h2, h3", box); (h || box.firstElementChild || box).insertAdjacentHTML("afterend", `<div class="qactions cx-row">${btn()}</div>`); u.$("#dcopen", box).onclick = () => AA.calc.open(); }
  }).observe(document.documentElement, { childList: true, subtree: true });
  addEventListener("hashchange", () => { if (!/^#\/(quiz|boss|gardien)/.test(location.hash)) AA.calc.close(); });
})();
