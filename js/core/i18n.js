/* =====================================================================
   Abysse Academy · traduction de l'interface
   AA.t("clé", {var}) renvoie le texte de la langue active, sinon le
   français. Un texte peut être :
   - une chaîne avec {var} : "Bonjour {name}"
   - un pluriel : {one:"{n} carte", other:"{n} cartes"} (choisi avec vars.n)
   - une fonction (vars) => chaîne
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA;
  const dicts = {};
  const i18n = (AA.i18n = {
    lang: "fr",
    locale: "fr-FR",
    fallback: "fr",
    add(lang, dict) { dicts[lang] = Object.assign(dicts[lang] || {}, dict); },
    has(lang) { return !!dicts[lang]; },
    set(lang) {
      const l = AA.LANGS.find(x => x.id === lang) || AA.LANGS[0];
      i18n.lang = l.id; i18n.locale = l.locale;
      document.documentElement.lang = l.id;
    },
    raw(key) {
      const d = dicts[i18n.lang] || {}, f = dicts[i18n.fallback] || {};
      return key in d ? d[key] : f[key];
    }
  });
  const fill = (s, v) => String(s).replace(/\{(\w+)\}/g, (m, k) => (v && k in v ? v[k] : m));
  AA.t = function (key, vars) {
    let s = i18n.raw(key);
    if (s == null) return key;
    if (typeof s === "function") return s(vars || {});
    if (typeof s === "object") {
      const n = vars && vars.n != null ? Number(vars.n) : 1;
      const rule = new Intl.PluralRules(i18n.locale).select(n);
      s = s[rule] != null ? s[rule] : s.other;
    }
    return fill(s, vars);
  };
})();
