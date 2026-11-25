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
  const SCHEMA = 2;

  const FRESH = () => ({
    schema: SCHEMA, savedAt: 0, createdAt: u.today(),
    profile: { name: "", goal: "n2", dailyGoal: 20, theme: "abysse", lang: "fr", sound: true, haptics: true, onboarded: false, examDate: "", imported: false },
    xp: 0, days: [], themes: {}, stats: {}, seen: {}, last: {}, errors: {}, doubt: {}, exams: [],
    cards: {}, table: [], daily: {}, scen: {}, simOk: 0, flashCount: 0, duels: 0, apnee: 0, bestCombo: 0, rescued: 0,
    badges: {}, claimed: {}, real: {}, dayc: {}, keepDone: false, keepDay: "", qod: "",
    read: {}, notes: {}, unlockAll: false
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
      put: (k, v) => { if (!db) return; try { db.transaction("kv", "readwrite").objectStore("kv").put(v, k); } catch (e) {} }
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
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    return changed;
  };

  let t = null;
  store.save = (now) => {
    AA.S.savedAt = Date.now();
    lsSet(KEY, AA.S);
    clearTimeout(t);
    const put = () => DB.put("state", u.clone(AA.S));
    if (now === true) put(); else t = setTimeout(put, 200);
    store.listeners.forEach(f => { try { f(); } catch (e) {} });
  };
  store.onSave = f => store.listeners.push(f);

  store.reset = () => {
    const keep = AA.S.profile;
    AA.S = FRESH();
    AA.S.profile = Object.assign(FRESH().profile, { theme: keep.theme, lang: keep.lang, sound: keep.sound, haptics: keep.haptics, name: keep.name, onboarded: true });
    store.save(true);
  };
  store.exportText = () => JSON.stringify(Object.assign({ app: "abysse-academy", version: AA.VERSION }, AA.S));
  store.importText = txt => {
    let o; try { o = JSON.parse(txt); } catch (e) { return false; }
    if (!valid(o)) return false;
    AA.S = migrate(o); AA.S.profile.onboarded = true; store.save(true);
    return true;
  };
  store.toCode = () => btoa(unescape(encodeURIComponent(store.exportText())));
  store.fromCode = code => { try { return store.importText(decodeURIComponent(escape(atob(code.trim())))); } catch (e) { return false; } };
})();
