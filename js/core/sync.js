/* =====================================================================
   Abysse Academy · synchronisation Google Drive (sans serveur)
   - Un seul fichier « abysse-academy-sauvegarde.json » dans le Drive
     (droit drive.file : l'appli ne voit QUE les fichiers qu'elle a créés).
   - Connexion avec Google Identity Services (jeton d'une heure).
   - À chaque synchro : on lit la copie du Drive, on FUSIONNE avec la copie
     locale (AA.store.merge : le plus avancé gagne), puis on renvoie le tout.
   - Identifiant client : AA.CONFIG.googleClientId (js/core/ns.js), ou saisi
     dans l'écran Sauvegarde (gardé sur l'appareil).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u;
  const sy = (AA.sync = {});
  const KEY = "abysse-sync", FILE = "abysse-academy-sauvegarde.json";
  const SCOPE = "https://www.googleapis.com/auth/drive.file";
  const API = "https://www.googleapis.com/drive/v3/files", UP = "https://www.googleapis.com/upload/drive/v3/files";
  const ls = { get: () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }, set: o => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} } };
  let st = ls.get(), client = null, busy = null;
  const listeners = [];
  sy.on = f => listeners.push(f);
  const emit = () => listeners.forEach(f => { try { f(sy.status()); } catch (e) {} });

  sy.clientId = () => (st.clientId || (AA.CONFIG && AA.CONFIG.googleClientId) || "").trim();
  sy.setClientId = id => { st.clientId = String(id || "").trim(); ls.set(st); client = null; emit(); };
  /* Pas de synchro dans l'artefact claude.ai ni en fichier local : l'adresse n'est pas autorisée chez Google. */
  sy.possible = () => /^https?:$/.test(location.protocol) && !(window.claude && window.claude.use) && !AA.BUNDLED;
  sy.linked = () => !!st.linked;
  sy.tokenOk = () => !!(st.token && st.exp > Date.now() + 60e3);
  sy.status = () => ({ possible: sy.possible(), hasId: !!sy.clientId(), linked: sy.linked(), tokenOk: sy.tokenOk(), last: st.last || 0, err: st.err || "", busy: !!busy, email: st.email || "" });

  const loadGis = () => new Promise((res, rej) => {
    if (window.google && google.accounts && google.accounts.oauth2) return res();
    const s = document.createElement("script"); s.src = "https://accounts.google.com/gsi/client"; s.async = true;
    s.onload = () => res(); s.onerror = () => rej(new Error("gis")); document.head.appendChild(s);
  });
  /* Demande un jeton. interactive=false : silencieux si possible (déjà autorisé). */
  const token = interactive => new Promise(async (res, rej) => {
    try { await loadGis(); } catch (e) { return rej(e); }
    if (!client) client = google.accounts.oauth2.initTokenClient({ client_id: sy.clientId(), scope: SCOPE, callback: () => {} });
    client.callback = r => {
      if (r.error) return rej(new Error(r.error));
      st.token = r.access_token; st.exp = Date.now() + (r.expires_in || 3600) * 1000; st.linked = true; ls.set(st); res(st.token);
    };
    client.error_callback = e => rej(new Error(e && e.type || "popup"));
    client.requestAccessToken({ prompt: interactive && !st.linked ? "consent" : "" });
  });
  const api = async (url, opt = {}) => {
    const r = await fetch(url, Object.assign({}, opt, { headers: Object.assign({ Authorization: "Bearer " + st.token }, opt.headers || {}) }));
    if (r.status === 401) { st.token = ""; ls.set(st); throw new Error("auth"); }
    if (!r.ok) throw new Error("http " + r.status);
    return r;
  };
  const findFile = async () => {
    if (st.fileId) return st.fileId;
    const r = await api(`${API}?q=${encodeURIComponent(`name='${FILE}' and trashed=false`)}&fields=files(id,modifiedTime)&orderBy=modifiedTime desc`);
    const j = await r.json(); st.fileId = j.files && j.files[0] ? j.files[0].id : ""; ls.set(st); return st.fileId;
  };
  const pull = async () => {
    const id = await findFile(); if (!id) return null;
    try { const r = await api(`${API}/${id}?alt=media`); return AA.store.parse(await r.text()); }
    catch (e) { if (/404/.test(e.message)) { st.fileId = ""; ls.set(st); return null; } throw e; }
  };
  const push = async () => {
    const body = AA.store.exportText(), id = await findFile();
    if (id) { await api(`${UP}/${id}?uploadType=media`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body }); return; }
    const b = "aa" + Date.now(), meta = JSON.stringify({ name: FILE, mimeType: "application/json" });
    const multi = `--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${b}\r\nContent-Type: application/json\r\n\r\n${body}\r\n--${b}--`;
    const r = await api(`${UP}?uploadType=multipart&fields=id`, { method: "POST", headers: { "Content-Type": "multipart/related; boundary=" + b }, body: multi });
    st.fileId = (await r.json()).id; ls.set(st);
  };

  /* Synchronisation complète. interactive : l'utilisateur a touché un bouton (fenêtre Google permise). */
  sy.now = (interactive) => {
    if (busy) return busy;
    if (!sy.possible() || !sy.clientId()) return Promise.resolve(false);
    busy = (async () => {
      emit();
      try {
        if (!sy.tokenOk()) { if (!interactive && !st.linked) return false; await token(interactive); }
        const remote = await pull(), before = JSON.stringify([AA.S.xp, Object.keys(AA.S.stats).length, AA.S.savedAt]);
        if (remote) { AA.S = AA.store.merge(AA.S, remote); AA.S.profile.onboarded = true; AA.store.save(true, true); }
        await push();
        st.last = Date.now(); st.err = ""; ls.set(st);
        const changed = remote && before !== JSON.stringify([AA.S.xp, Object.keys(AA.S.stats).length, AA.S.savedAt]);
        if (changed && AA.router) { AA.ui.applyTheme(); AA.a11y.apply(); AA.router.refresh(); }
        return true;
      } catch (e) {
        st.err = e.message || "?"; ls.set(st);
        return false;
      } finally { busy = null; emit(); }
    })();
    return busy;
  };
  sy.connect = () => sy.now(true);
  sy.disconnect = () => {
    try { if (st.token && window.google) google.accounts.oauth2.revoke(st.token, () => {}); } catch (e) {}
    st = { clientId: st.clientId }; ls.set(st); emit();
  };

  /* Synchro automatique : au démarrage, 20 s après une modification, et quand on quitte l'appli. */
  let tm = null;
  sy.init = () => {
    if (!sy.possible() || !sy.linked() || !sy.clientId()) return;
    if (sy.tokenOk()) sy.now(false);
    AA.store.onSave(fromSync => { if (fromSync === true || !sy.tokenOk()) return; clearTimeout(tm); tm = setTimeout(() => sy.now(false), 20000); });
    document.addEventListener("visibilitychange", () => { if (document.hidden && sy.tokenOk()) { clearTimeout(tm); sy.now(false); } else if (!document.hidden && sy.tokenOk() && Date.now() - (st.last || 0) > 60e3) sy.now(false); });
  };
})();
