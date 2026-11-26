/* =====================================================================
   Abysse Academy · confort et accessibilité
   - Taille du texte (tout est en rem : on change la taille de base).
   - Mode daltonien : vert/rouge remplacés par bleu/orange (attribut
     data-aa-cvd, voir tokens.css), formes ✓ ✗ conservées.
   - Animations réduites (réglage de l'appli ou du téléphone).
   - Lecture vocale des cours et des questions (speechSynthesis, voix
     du téléphone : fonctionne hors ligne si la voix est installée).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u;
  const A = (AA.a11y = {});
  A.SIZES = [0.9, 1, 1.12, 1.25, 1.4];

  A.apply = () => {
    const p = AA.S.profile, root = document.documentElement;
    root.style.setProperty("--ts", String(p.textSize || 1));
    if (p.cvd) root.dataset.aaCvd = "1"; else delete root.dataset.aaCvd;
    root.classList.toggle("reduce-motion", A.reduced());
  };
  A.reduced = () => AA.S.profile.motion === false || matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Lecture vocale ---------- */
  const synth = window.speechSynthesis;
  A.canSpeak = !!(synth && window.SpeechSynthesisUtterance);
  let voice = null, queue = [], onEnd = null, speaking = false;
  const pickVoice = () => {
    if (!A.canSpeak) return null;
    const lang = (AA.i18n.locale || "fr-FR").slice(0, 2), vs = synth.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith(lang));
    return vs.find(v => v.localService && /premium|enhanced|amélioré/i.test(v.name)) || vs.find(v => v.localService) || vs[0] || null;
  };
  if (A.canSpeak) { voice = pickVoice(); synth.onvoiceschanged = () => (voice = pickVoice()); }

  /* Découpe en phrases : plus fiable sur mobile (les longues lectures s'arrêtent sinon). */
  const chunks = txt => String(txt).replace(/\s+/g, " ").match(/[^.!?;:]+[.!?;:]*\s*/g) || [];
  /* Lit le texte d'un élément HTML (ignore les boutons et les schémas). */
  A.textOf = el => {
    const c = el.cloneNode(true);
    u.$$("button,svg,figure,.readdone,script,style", c).forEach(n => n.remove());
    u.$$("li,p,h1,h2,h3,h4,tr,div", c).forEach(n => n.append(". "));
    return c.textContent.replace(/(\.\s*){2,}/g, ". ").replace(/\s+/g, " ").trim();
  };
  A.speak = (text, done) => {
    if (!A.canSpeak) return false;
    A.stop();
    queue = chunks(text); onEnd = done || null; speaking = true; next();
    return true;
  };
  function next() {
    if (!speaking) return;
    const s = queue.shift();
    if (!s) { speaking = false; const f = onEnd; onEnd = null; f && f(); return; }
    const ut = new SpeechSynthesisUtterance(s.trim());
    ut.lang = AA.i18n.locale || "fr-FR"; if (voice) ut.voice = voice;
    ut.rate = AA.S.profile.voiceRate || 1;
    ut.onend = next; ut.onerror = () => { speaking = false; };
    synth.speak(ut);
  }
  A.stop = () => { speaking = false; queue = []; onEnd = null; if (A.canSpeak) synth.cancel(); };
  A.pause = () => A.canSpeak && synth.pause();
  A.resume = () => A.canSpeak && synth.resume();
  A.isSpeaking = () => speaking;

  /* Bouton « écouter » réutilisable : data-speak="sélecteur" lit cet élément. */
  A.button = (target, label) => A.canSpeak ? `<button class="iconbtn speak" data-speak="${target}" aria-label="${label || AA.t("a11y.listen")}" aria-pressed="false">${AA.icon("sound")}</button>` : "";
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-speak]"); if (!b) return;
    if (b.getAttribute("aria-pressed") === "true") { A.stop(); b.setAttribute("aria-pressed", "false"); return; }
    u.$$("[data-speak][aria-pressed=true]").forEach(x => x.setAttribute("aria-pressed", "false"));
    const el = u.$(b.dataset.speak); if (!el) return;
    b.setAttribute("aria-pressed", "true");
    A.speak(A.textOf(el), () => b.setAttribute("aria-pressed", "false"));
  });
  /* On coupe la voix en changeant d'écran. */
  addEventListener("hashchange", () => A.stop());
})();
