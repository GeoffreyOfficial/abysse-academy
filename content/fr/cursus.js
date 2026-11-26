/* =====================================================================
   Abysse Academy · le cursus des brevets (FFESSM) et ses équivalences
   Chaque niveau : pour qui, accès, prérogatives, examen, équivalences.
   Les âges et conditions exactes changent parfois : tout est « à faire
   valider par ton moniteur » (voir aussi C.validate). Corriger ici.
   Espaces d'évolution (Code du sport) : 0-6 m, 0-12 m, 0-20 m, 0-40 m, 0-60 m.
   PE = plongée encadrée (avec un guide), PA = plongée autonome (sans guide).
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  C.cursus = [
    { id: "decouverte", lv: "Baptême", world: "decouverte", line: "plongeur", tag: "Découverte",
      who: "Tout le monde, sans expérience. Premier contact avec la plongée.",
      access: "Aucun brevet. Un moniteur te tient la main pendant toute la plongée.",
      can: "Plonger avec un moniteur, en général jusqu’à 6 m.",
      exam: "Pas d’examen : on découvre.",
      eq: [["ANMP", "Baptême"], ["CMAS", "Baptême"], ["ISO", "—"]] },
    { id: "n1", lv: "Niveau 1", world: "n1", line: "plongeur", tag: "PE20",
      who: "Débutant qui veut plonger régulièrement, accompagné.",
      access: "À partir de 14 ans environ (plus jeune avec des brevets enfants). Certificat médical.",
      can: "Plonger <b>encadré</b> (avec un guide) jusqu’à <b>20 m</b> (PE20).",
      exam: "Formation pratique en piscine puis en milieu naturel, petites connaissances théoriques (signes, oreilles, sécurité).",
      eq: [["ANMP", "Niveau 1"], ["CMAS", "Plongeur 1 étoile"], ["ISO 24801-1", "Plongeur encadré"]] },
    { id: "n2", lv: "Niveau 2", world: "n2", line: "plongeur", tag: "PA20 · PE40",
      who: "Plongeur N1 qui veut devenir <b>autonome</b> à faible profondeur et descendre plus bas encadré.",
      access: "N1, environ 16 ans. Certificat médical.",
      can: "<b>Autonome</b> jusqu’à <b>20 m</b> (PA20) avec d’autres plongeurs autonomes ; <b>encadré</b> jusqu’à <b>40 m</b> (PE40).",
      exam: "Épreuves pratiques (remontées, assistance, autonomie) et un <b>écrit</b> : physique (pressions, volumes, flottabilité), accidents, décompression, matériel, réglementation.",
      eq: [["ANMP", "Niveau 2"], ["CMAS", "Plongeur 2 étoiles"], ["ISO 24801-2", "Plongeur autonome"]] },
    { id: "rifap", lv: "RIFAP", world: "rifap", line: "secours", tag: "Secours",
      who: "Tout plongeur qui veut savoir réagir face à un accident de plongée.",
      access: "En général à partir du N1 ou du N2. Souvent exigé pour le N3, le N4 et l’initiateur.",
      can: "Porter secours : sortir la victime de l’eau, alerter, oxygéner, surveiller.",
      exam: "Mises en situation pratiques : alerte, oxygénothérapie, position d’attente, bilan.",
      eq: [["Secourisme", "Complète le PSC1, ne le remplace pas"]] },
    { id: "nitrox", lv: "Nitrox", world: "nitrox", line: "qualif", tag: "Qualification",
      who: "Plongeur qui veut respirer un mélange plus riche en oxygène (moins d’azote).",
      access: "Nitrox de base dès le N1 ; nitrox confirmé à partir du N2.",
      can: "Plonger au nitrox dans les limites de son niveau, en respectant la PpO₂ maximale.",
      exam: "Calculs (profondeur maximale, profondeur équivalente), analyse du mélange, pratique.",
      eq: [["ANMP", "Nitrox"], ["CMAS", "Nitrox"], ["ISO 11107", "Plongeur nitrox"]] },
    { id: "n3", lv: "Niveau 3", world: "n3", line: "plongeur", tag: "PA60",
      who: "Plongeur N2 expérimenté qui veut être <b>autonome jusqu’à 60 m</b>.",
      access: "N2, 18 ans, expérience de plongées en autonomie. RIFAP souvent demandé.",
      can: "<b>Autonome</b> jusqu’à <b>60 m</b> (PA60), avec un directeur de plongée présent sur le site.",
      exam: "Pratique en profondeur, organisation de la plongée en autonomie, théorie approfondie : gaz, narcose, décompression, matériel, réglementation.",
      eq: [["ANMP", "Niveau 3"], ["CMAS", "Plongeur 3 étoiles"], ["ISO 24801-2", "Plongeur autonome (au-delà)"]] },
    { id: "e1", lv: "Initiateur (E1)", world: "e1", line: "encadrant", tag: "Enseigne 0-6 m",
      who: "Plongeur qui veut <b>enseigner</b> en piscine et en milieu protégé.",
      access: "Au moins N2, environ 16 à 18 ans, RIFAP, stage pédagogique en club.",
      can: "Enseigner en piscine et en milieu naturel protégé jusqu’à <b>6 m</b>, sous l’autorité d’un moniteur.",
      exam: "Stage en situation, séances pédagogiques évaluées, connaissances sur la pédagogie et la sécurité.",
      eq: [["ANMP", "Moniteur ANMP niveau initial"], ["CMAS", "Moniteur 1 étoile (partiel)"]] },
    { id: "n4", lv: "N4 · Guide de palanquée", world: "n4", line: "encadrant", tag: "Guide jusqu’à 40 m",
      who: "Plongeur N3 qui veut <b>guider</b> des palanquées.",
      access: "N3, 18 ans, RIFAP, solide expérience.",
      can: "<b>Guider</b> des plongeurs (en général jusqu’à 40 m) et plonger autonome jusqu’à 60 m.",
      exam: "Épreuves physiques, conduite de palanquée, assistance, théorie (physiologie, décompression, réglementation, matériel).",
      eq: [["ANMP", "Guide de palanquée"], ["CMAS", "Plongeur 3 étoiles + encadrement"], ["ISO 24801-3", "Plongeur guide (Dive leader)"]] },
    { id: "e2", lv: "E2 (initiateur + guide)", world: "e2", line: "encadrant", tag: "Enseigne 0-20 m",
      who: "Guide de palanquée et initiateur qui veut enseigner plus profond.",
      access: "N4 et initiateur, stage pédagogique.",
      can: "Enseigner jusqu’à <b>20 m</b>, sous l’autorité d’un moniteur.",
      exam: "Validation en club et en stage selon le cursus fédéral.",
      eq: [["ANMP", "Encadrant 20 m"], ["Suite", "MF1 (E3) puis MF2 (E4)"]] },
    { id: "mf", lv: "MF1 puis MF2", world: "", line: "encadrant", tag: "Moniteur",
      who: "Pour aller plus loin : moniteur fédéral.",
      access: "E2 ou N4 + initiateur, stages et examens fédéraux.",
      can: "MF1 (E3) : enseigner jusqu’à 40 m et diriger des plongées. MF2 (E4) : jusqu’à 60 m et former des moniteurs.",
      exam: "Examens fédéraux (hors de cette appli pour l’instant).",
      eq: [["État", "BPJEPS / DEJEPS plongée (moniteurs professionnels)"], ["ISO 24802", "Moniteur de plongée"]] }
  ];
  C.cursusById = {}; C.cursus.forEach(c => (C.cursusById[c.id] = c));
  /* Étiquette courte par monde : « Pour qui · Quel examen ». */
  C.levelTag = wid => { const c = C.cursusById[wid]; return c ? { lv: c.lv, tag: c.tag, who: c.who, exam: c.exam } : null; };
})();
