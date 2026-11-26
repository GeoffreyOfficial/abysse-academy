/* =====================================================================
   Abysse Academy · compléments des cours (1.4)
   - Schémas animés réutilisés par les nouveaux mondes (même physique).
   - Calculs « exemple pas à pas » rattachés aux thèmes sans générateur propre.
   Les exemples sont tirés au hasard à chaque ouverture : jamais les mêmes
   chiffres que dans le quiz.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  const DIAG = { "n1-physique": "pression", "d-oreilles": "pression", "n3-gaz": "dalton", "nx-base": "dalton", "nx-securite": "dalton", "n3-deco": "deco", "n3-materiel": "materiel", "d-materiel": "materiel", "n1-milieu": "environnement" };
  Object.keys(DIAG).forEach(id => { const m = C.byId[id]; if (m && !m.diagram) m.diagram = DIAG[id]; });
  /* Générateurs « cousins » pour les exemples (clé = module, valeur = générateurs existants). */
  C.exampleGens = { "d-oreilles": ["n1pabs"], "n3-deco": ["n3ppo2"], "n4-guide": ["n4pal"], "n3-autonomie": ["n3air"], "n1-secu": ["n1pabs"] };
})();
