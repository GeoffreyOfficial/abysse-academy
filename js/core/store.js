/* =====================================================================
   Abysse Academy · sauvegarde
   - État unique AA.S, sauvé dans localStorage (lecture immédiate) et
     IndexedDB (copie durable). La copie la plus récente (savedAt) gagne.
   - Le schéma est versionné : chaque évolution ajoute une migration.
   - Reprise automatique de l'ancienne appli « Ardoise N2 ».
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u;
  const KEY = "abysse-academy";
  const LEGACY_KEY = "ardoise-n2-v1";
  const SCHEMA = 4;

  const FRESH = () => ({
    schema: SCHEMA, savedAt: 0, createdAt: u.today(),
    profile: { name: "", goal: "n2", dailyGoal: 20, theme: "abysse", lang: "fr", sound: true, haptics: true, onboarded: false, examDate: "", imported: false,
      textSize: 1, cvd: false, voiceRate: 1, gestures: true, motion: true, scene: true, backupAt: "", avatar: null, driveNag: "", driveNagN: 0,
      level: "", dives: 0, placeAsk: false },
    xp: 0, days: [], themes: {}, stats: {}, seen: {}, last: {}, errors: {}, doubt: {}, exams: [],
    cards: {}, table: [], daily: {}, scen: {}, simOk: 0, flashCount: 0, duels: 0, apnee: 0, bestCombo: 0, rescued: 0,
    badges: {}, claimed: {}, real: {}, dayc: {}, keepDone: false, keepDay: "", qod: "",
    read: {}, notes: {}, unlockAll: false,
    /* v3 (Abysse Academy 1.1) */
    wrong: {}, aqua: {}, boss: {}, story: {}, five: 0, glossSeen: {}, searches: [],
    /* 1.1.1 */
    qodAns: null, pcBest: 0, pcRuns: 0,
    /* 1.2 */
    aquaCfg: {}, fedOn: "", evoSeen: null,
    /* 1.3 : parcours libre (niveaux obtenus, révision, passés, positionnement) */
    certs: {}, path: {}, placed: {}, placeDone: {}
  });

  /* Migrations : de la version N vers N+1. Ajoute la suivante ici. */
  const MIGRATIONS = {
    /* 1 = Ardoise N2 (pas de champ schema) → 2 = Abysse Academy */
    1: o => {
      const n = Object.assign(FRESH(), o);
      n.profile = Object.assign(FRESH().profile, {
        name: o.pseudo || "", sound: o.sound !== false, examDate: o.examDate || "", imported: true, onboarded: false
      });
      ["pseudo", "sound", "examDate"].forEach(k => delete n[k]);
      n.schema = 2;
      return n;
    },
    /* 2 → 3 : nouveaux champs (aquarium, boss, histoire, erreurs détaillées, accessibilité).
       Les valeurs par défaut viennent de FRESH ; rien n'est perdu. */
    2: o => Object.assign(o, { schema: 3 }),
    /* 3 → 4 : parcours pour tous les niveaux. Un profil existant venait d'une appli
       pensée pour un N1 qui prépare le N2 : on le garde tel quel (N1 obtenu, N2 visé). */
    3: o => {
      o.profile = o.profile || {};
      if (o.profile.onboarded && !o.profile.level) {
        o.profile.level = "n1"; o.certs = Object.assign({ decouverte: o.createdAt || u.today(), n1: o.createdAt || u.today() }, o.certs || {});
        o.path = Object.assign({ decouverte: "review", n1: "review" }, o.path || {});
        if (!o.profile.goal) o.profile.goal = "n2";
      }
      o.schema = 4; return o;
    }
  };
  function migrate(o) {
    if (!o || typeof o !== "object") return null;
    let v = o.schema || 1;
    while (v < SCHEMA) { o = MIGRATIONS[v](o); v = o.schema; }
    const base = FRESH();
    const out = Object.assign(base, o);
    out.profile = Object.assign(FRESH().profile, o.profile || {});
    return out;
  }
  const valid = o => o && typeof o === "object" && typeof o.xp === "number";

  /* ---------- IndexedDB minimaliste ---------- */
  function idb(name) {
    let db = null;
    const open = () => new Promise(res => {
      try {
        const r = indexedDB.open(name, 1);
        r.onupgradeneeded = () => r.result.createObjectStore("kv");
        r.onsuccess = () => { db = r.result; res(db); };
        r.onerror = r.onblocked = () => res(null);
      } catch (e) { res(null); }
    });
    return {
      open,
      get: k => new Promise(res => { if (!db) return res(null); try { const q = db.transaction("kv").objectStore("kv").get(k); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); } catch (e) { res(null); } }),
      put: (k, v) => { if (!db) return; try { db.transaction("kv", "readwrite").objectStore("kv").put(v, k); } catch (e) {} },
      del: k => { if (!db) return; try { db.transaction("kv", "readwrite").objectStore("kv").delete(k); } catch (e) {} }
    };
  }
  const DB = idb(KEY);
  const lsGet = k => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

  const store = (AA.store = { KEY, SCHEMA, FRESH, migrate, listeners: [] });
  AA.S = FRESH();

  /* Lecture synchrone au démarrage (localStorage), puis IndexedDB en tâche de fond. */
  store.loadSync = () => {
    const cur = lsGet(KEY);
    if (valid(cur)) { AA.S = migrate(cur); return "local"; }
    const old = lsGet(LEGACY_KEY);
    if (valid(old)) { AA.S = migrate(old); store.save(true); return "legacy"; }
    return "fresh";
  };
  store.loadAsync = async () => {
    await DB.open();
    let changed = false;
    const st = await DB.get("state");
    if (valid(st) && (st.savedAt || 0) > (AA.S.savedAt || 0)) { AA.S = migrate(st); changed = true; }
    else if (!valid(st) && AA.S.xp === 0 && !AA.S.profile.onboarded) {
      /* Ancienne appli installée : sa copie IndexedDB peut être plus récente que localStorage. */
      const L = idb("ardoise-n2"); await L.open();
      const old = await L.get("state");
      if (valid(old) && old.xp > 0) { AA.S = migrate(old); changed = true; }
    }
    store.save(true);
    store.snapshot().catch(() => {});
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    return changed;
  };

  /* Copies de secours automatiques : une par jour, les 5 dernières, dans IndexedDB. */
  store.snapshot = async name => {
    if (!AA.S.xp) return;
    const key = "snap-" + (name ? name + "-" : "") + u.today(), list = (await DB.get("snaps")) || [];
    DB.put(key, u.clone(AA.S));
    if (!list.includes(key)) { list.push(key); list.sort(); while (list.length > 5) DB.del(list.shift()); DB.put("snaps", list); }
  };
  store.snapshots = async () => {
    await DB.open(); const list = (await DB.get("snaps")) || [], out = [];
    for (const k of list.slice().reverse()) { const v = await DB.get(k); if (valid(v)) out.push({ key: k, date: k.slice(5).replace(/^reset-/, ""), reset: /^snap-reset-/.test(k), xp: v.xp, savedAt: v.savedAt }); }
    return out;
  };
  store.restoreSnapshot = async key => { const v = await DB.get(key); if (!valid(v)) return false; AA.S = migrate(v); AA.S.profile.onboarded = true; store.save(true); return true; };

  let t = null;
  store.save = (now, quiet) => {
    AA.S.savedAt = Date.now();
    lsSet(KEY, AA.S);
    clearTimeout(t);
    const put = () => DB.put("state", u.clone(AA.S));
    if (now === true) put(); else t = setTimeout(put, 200);
    store.listeners.forEach(f => { try { f(quiet); } catch (e) {} });
  };
  store.onSave = f => store.listeners.push(f);

  /* Réinitialisation complète : une copie de secours « avant réinitialisation »
     est gardée dans IndexedDB (récupérable dans Sauvegarde), puis on repart
     de zéro, accueil compris. Seuls le thème et la langue sont gardés. */
  store.reset = async () => {
    const keep = AA.S.profile;
    try { await store.snapshot("reset"); } catch (e) {}
    AA.S = FRESH();
    AA.S.profile = Object.assign(FRESH().profile, { theme: keep.theme, lang: keep.lang, textSize: keep.textSize, cvd: keep.cvd });
    store.save(true);
  };
  store.exportText = () => JSON.stringify(Object.assign({ app: "abysse-academy", version: AA.VERSION }, AA.S));
  store.parse = txt => { let o; try { o = typeof txt === "string" ? JSON.parse(txt) : txt; } catch (e) { return null; } return valid(o) ? migrate(o) : null; };
  /* mode : "replace" (remplace tout) ou "merge" (garde le meilleur des deux). */
  store.importText = (txt, mode) => {
    const o = store.parse(txt); if (!o) return false;
    AA.S = mode === "merge" ? store.merge(AA.S, o) : o; AA.S.profile.onboarded = true; store.save(true);
    return true;
  };

  /* Fusion de deux sauvegardes (deux téléphones utilisés tour à tour).
     Règle : pour chaque élément, on garde le plus avancé ; à égalité, le plus récent. */
  store.merge = (a, b) => {
    const [o, n] = (a.savedAt || 0) >= (b.savedAt || 0) ? [b, a] : [a, b]; /* n = la plus récente */
    const r = u.clone(n), max = (x, y) => Math.max(x || 0, y || 0);
    ["simOk", "flashCount", "duels", "apnee", "bestCombo", "rescued", "five", "pcBest", "pcRuns"].forEach(k => (r[k] = max(o[k], n[k])));
    r.days = Array.from(new Set((o.days || []).concat(n.days || []))).sort().slice(-400);
    r.xp = max(o.xp, n.xp);
    const byKey = (k, pick) => { r[k] = Object.assign({}, o[k] || {}); Object.entries(n[k] || {}).forEach(([id, v]) => { r[k][id] = r[k][id] == null ? v : pick(r[k][id], v); }); };
    byKey("themes", (x, y) => ({ best: max(x.best, y.best), tries: max(x.tries, y.tries) }));
    byKey("stats", (x, y) => (y.n >= x.n ? y : x));
    byKey("cards", (x, y) => (y.box >= x.box ? y : x));
    byKey("last", (x, y) => (y > x ? y : x));
    byKey("boss", (x, y) => ({ best: max(x.best, y.best), won: x.won || y.won, tries: max(x.tries, y.tries) }));
    byKey("certs", (x, y) => (x < y ? x : y));
    byKey("placed", (x, y) => (x > y ? x : y));
    byKey("placeDone", (x, y) => ((y.pct || 0) >= (x.pct || 0) ? y : x));
    byKey("path", (x, y) => y);
    byKey("story", (x, y) => ((y.done || 0) >= (x.done || 0) ? y : x));
    byKey("wrong", (x, y) => { const z = Object.assign({}, x); Object.entries(y).forEach(([c, v]) => (z[c] = max(z[c], v))); return z; });
    ["seen", "errors", "doubt", "daily", "scen", "badges", "claimed", "real", "read", "notes", "aqua", "glossSeen"].forEach(k => byKey(k, (x, y) => y));
    r.exams = (o.exams || []).concat(n.exams || []).filter((e, i, A) => A.findIndex(f => f.date === e.date && f.score === e.score && f.full === e.full) === i).slice(-100);
    r.table = (n.table && n.table.length ? n.table : o.table) || [];
    r.unlockAll = !!(o.unlockAll || n.unlockAll);
    return migrate(r);
  };

  /* Code de transfert : JSON compressé (deflate) puis base64 URL. Préfixe AA3.
     Les anciens codes (base64 simple) restent acceptés. */
  const b64u = bytes => { let s = ""; bytes.forEach(b => (s += String.fromCharCode(b))); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  const unb64u = str => { const s = atob(str.replace(/-/g, "+").replace(/_/g, "/")); return Uint8Array.from(s, c => c.charCodeAt(0)); };
  const pipe = async (data, stream) => new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(stream)).arrayBuffer());
  store.canCompress = typeof CompressionStream === "function";
  store.toCodeAsync = async () => {
    const txt = store.exportText();
    if (store.canCompress) try { return "AA3." + b64u(await pipe(new TextEncoder().encode(txt), new CompressionStream("deflate-raw"))); } catch (e) {}
    return store.toCode();
  };
  store.fromCodeAsync = async code => {
    code = String(code || "").trim().replace(/^.*#\/import\//, "").replace(/\s+/g, "");
    if (code.startsWith("AA3.")) {
      try { const bytes = await pipe(unb64u(code.slice(4)), new DecompressionStream("deflate-raw")); return store.parse(new TextDecoder().decode(bytes)); } catch (e) { return null; }
    }
    try { return store.parse(decodeURIComponent(escape(atob(code)))); } catch (e) { return null; }
  };
  store.toCode = () => btoa(unescape(encodeURIComponent(store.exportText())));
  store.fromCode = code => { try { return store.importText(decodeURIComponent(escape(atob(code.trim())))); } catch (e) { return false; } };
  /* Résumé lisible d'une sauvegarde, pour comparer avant d'importer. */
  store.summary = o => ({ xp: o.xp || 0, themes: Object.keys(o.themes || {}).length, answers: Object.values(o.stats || {}).reduce((a, v) => a + v.n, 0), saved: o.savedAt ? new Date(o.savedAt) : null, name: (o.profile && o.profile.name) || "" });
})();
