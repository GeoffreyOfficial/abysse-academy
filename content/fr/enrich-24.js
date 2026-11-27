/* =====================================================================
   Abysse Academy 2.4 · Cours enrichis
   Un exemple concret (situation réelle, chiffres, décision) pour chaque
   thème qui n'en avait pas, et parfois « le piège » à éviter.
   Notions du tuteur pour Découverte et N1.
   On ajoute à la fin des cours, on ne réécrit rien. Aucune valeur MN90.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  const ex = (title, h) => `<div class="callout ex"><span class="eyebrow">Exemple · ${title}</span>${h}</div>`;
  const trap = h => `<div class="callout trap"><span class="eyebrow">Le piège</span>${h}</div>`;
  const add = (id, html) => C.extend(id, { essentiel: `<h3>En situation</h3>` + html });

  /* ---------- N2 ---------- */
  add("physio", ex("l’essoufflement", "<p>Tu palmes contre le courant à 20 m. Ta respiration devient courte et rapide, tu as l’impression de manquer d’air alors que ton bloc est plein. Ce n’est pas l’oxygène qui manque : c’est le <b>CO₂</b> qui s’accumule, parce que tu n’expires plus assez. Remède : tu t’arrêtes, tu t’accroches, et tu <b>souffles longuement</b>. En une minute, le rythme redescend.</p>")
    + trap("<p>Inspirer plus fort pour « avoir plus d’air » aggrave l’essoufflement. C’est l’expiration qu’il faut allonger.</p>"));
  add("accidents", ex("après la plongée", "<p>Une heure après une plongée à 35 m, Hugo dit qu’il a « l’épaule qui tire » et qu’il est très fatigué. Il pense à un faux mouvement en portant son bloc. Toi, tu penses <b>ADD</b> : douleur articulaire et fatigue anormale après une plongée. Tu préviens le DP, il est mis sous <b>oxygène</b>, l’alerte est donnée. Au caisson, le médecin confirme un ADD articulaire, traité à temps.</p>")
    + trap("<p>Le déni : « c’est rien, ça va passer ». Le moindre signe après une plongée se signale. Une fausse alerte ne coûte rien, un ADD non traité peut laisser des séquelles.</p>"));
  add("materiel", ex("le calcul d’autonomie", "<p>Bloc de 12 L gonflé à 200 bar : 12 × 200 = <b>2 400 L</b> d’air détendu. Tu gardes 50 bar de réserve (600 L) : il te reste 1 800 L utilisables. À 20 m (3 bar), avec 20 L/min en surface, tu consommes 60 L/min : environ <b>30 minutes</b> au fond, avant de devoir remonter. Un calcul simple qui explique pourquoi le manomètre se regarde souvent.</p>"));
  add("regles", ex("le jour J", "<p>Tu arrives dans un club que tu ne connais pas, avec ta carte N2. Le DP te demande ta carte, ton certificat médical, ta licence (assurance) et ton carnet. Il te place en autonomie avec un autre N2, <b>20 m maximum</b>, ou encadré plus profond avec un guide. C’est lui qui décide, en fonction de ton expérience et des conditions du jour.</p>")
    + `<div class="callout trap"><span class="eyebrow">À faire valider</span><p>Profondeurs exactes en autonomie et en encadré pour le N2 selon le Code du sport en vigueur.</p></div>`);
  add("pa20", ex("la perte de binôme", "<p>À 15 m, dans une eau trouble, tu ne vois plus Léo. Vous aviez convenu au briefing : <b>tour d’horizon d’une minute</b> sur place, en regardant aussi vers le haut (ses bulles), puis <b>remontée</b> lente avec palier de sécurité. En surface, tu le retrouves qui fait pareil, à 20 m de toi. Vous signalez au bateau. La plongée est terminée : on ne redescend pas.</p>"));

  /* ---------- N3 ---------- */
  add("n3-deco", ex("la journée à deux plongées", "<p>Le matin, 40 m. L’après-midi, prévu : 35 m. Au déjeuner, ton ordinateur indique encore plusieurs heures de désaturation. Tu choisis une seconde plongée <b>moins profonde</b> (25 m), plus courte, avec un palier de sécurité long. Tu respectes l’ordre classique : le plus profond d’abord, le moins profond ensuite. Le soir, tu ne prends pas l’avion.</p>"));
  add("n3-baro", ex("le sinus bloqué", "<p>À 8 m, une douleur au-dessus de l’œil droit, comme un coup de couteau. C’est le <b>sinus frontal</b> qui n’arrive pas à s’équilibrer, souvent après un rhume. Tu remontes d’un ou deux mètres : la douleur baisse. Si elle revient en redescendant, la plongée s’arrête là. Forcer peut provoquer un saignement du sinus.</p>")
    + trap("<p>Prendre un décongestionnant pour « passer quand même » : son effet peut cesser pendant la plongée et bloquer l’air à la remontée. Avis médical d’abord.</p>"));
  add("n3-tables", ex("lire une table sans recopier les chiffres", "<p>Ta plongée : 31 m maximum, 22 minutes. Tu ne lis pas la ligne 30 m : tu prends la <b>profondeur juste supérieure</b>. Pour la durée, idem : la ligne <b>juste supérieure</b> à 22 min. Tu lis les paliers et la lettre de groupe. Toujours arrondir du côté de la sécurité.</p>"));
  add("n3-speciales", ex("la dérivante", "<p>Courant de 1 nœud. Le bateau vous largue en amont, vous descendez <b>ensemble</b> et vite, pour ne pas vous disperser. Une bouée de surface tenue par le guide montre votre position. À la fin, palier en pleine eau en dérivant, parachute levé. Le bateau suit la bouée et vous récupère en aval. Celui qui lâche le groupe se retrouve seul, loin : on reste serrés.</p>"));
  add("n3-bloc", ex("lire les marquages", "<p>Sur l’ogive : « PS 230 bar », « PE 345 bar », une date d’épreuve, « 15 L ». Le bloc se gonfle au maximum à <b>230 bar</b> (pression de service) ; 345 bar est la pression d’épreuve, testée lors de la requalification, jamais pour plonger. Si la date de requalification est dépassée, le bloc ne se gonfle pas.</p>"));

  /* ---------- N4 ---------- */
  add("n4-accidents", ex("trier les signes", "<p>Trois plongeurs, trois plaintes après la même plongée. Paul a mal à l’oreille et des vertiges dès la descente : <b>barotraumatisme</b> (mécanique). Inès s’est sentie euphorique à 38 m, ça a disparu en remontant : <b>narcose</b> (toxicité). Marc a des fourmillements dans la jambe 30 minutes après la sortie : <b>ADD</b> (biophysique). Le guide ne pose pas le diagnostic : il repère, il protège, il alerte.</p>"));
  add("n4-modeles", ex("deux ordinateurs, deux réponses", "<p>Même plongée, même palanquée : un ordinateur affiche 3 minutes de palier, l’autre aucun. L’un utilise un modèle plus prudent, ou un facteur de prudence plus élevé. Aucun n’est « faux ». Le guide fait suivre à toute la palanquée <b>le plus pénalisant</b>.</p>"));
  add("n4-materiel", ex("le givrage", "<p>Eau à 11 °C, 40 m. Un équipier gonfle longuement son gilet : son premier étage refroidit brutalement et se met en <b>débit continu</b>. Il ferme le robinet de ce premier étage et passe sur son second détendeur, indépendant. Les inflateurs longs et les purges brutales en eau froide sont à éviter.</p>"));
  add("n4-resp", ex("l’incident sans blessé", "<p>Un de tes plongeurs est remonté seul trop vite, sans signe d’accident. Tu le signales au DP, qui le note sur la fiche de sécurité et le fait surveiller. Si des signes apparaissent plus tard, tout est traçable : profil, heure, décisions. Signaler, c’est protéger le plongeur… et toi.</p>"));

  /* ---------- E1 ---------- */
  add("e1-cursus", ex("compétence, pas exercice", "<p>L’exercice « vider son masque » n’est pas un but en soi. La compétence, c’est : <b>« retrouver la vision sous l’eau sans remonter »</b>. Elle est acquise quand l’élève le fait seul, calmement, à n’importe quel moment de la plongée, pas seulement quand tu lui demandes au fond de la piscine.</p>"));
  add("e1-apprendre", ex("le bon retour", "<p>Au lieu de « non, c’est pas ça », tu dis : « Bien, tu as gardé ton calme. Cette fois, <b>relève la tête</b> en soufflant par le nez. » Un point positif, une seule consigne précise, un nouvel essai. L’élève sait quoi changer.</p>"));
  add("e1-exercices", ex("la sécurité dans un exercice", "<p>Lâcher-reprise d’embout à 2 m. Avant : signe d’arrêt convenu, ton octopus prêt. Pendant : tu es face à l’élève, à portée de main, et tu le regardes dans les yeux. Si quelque chose ne va pas, tu lui donnes de l’air d’abord, tu remontes ensemble ensuite.</p>"));
  add("e1-cours", ex("un cours de 15 minutes", "<p>Sujet : pourquoi on équilibre ses oreilles. <b>Accroche</b> (1 min) : une bouteille d’eau vide qui s’écrase au fond. <b>Explication</b> (8 min) : la pression augmente, l’air de l’oreille se comprime, le tympan se creuse. <b>Pratique</b> (4 min) : chacun montre la manœuvre. <b>Bilan</b> (2 min) : trois questions pour vérifier.</p>"));
  add("e1-public", ex("l’adulte anxieux", "<p>Sophie, 45 ans, a peur de « ne plus pouvoir respirer ». Tu commences avec la tête dans l’eau en surface, debout, là où elle a pied. Tu lui laisses le temps, tu l’encourages à chaque étape réussie, et c’est elle qui donne le signal pour descendre. Le progrès se mesure en confiance, pas en mètres.</p>"));
  add("e1-cadre", ex("qui décide ?", "<p>Mardi soir, piscine : le moniteur responsable t’attribue trois débutants et le petit bain. Un élève te demande d’aller dans la fosse. Ce n’est pas prévu : tu restes dans le cadre fixé et tu en parles au responsable après la séance. L’initiateur agit sous l’autorité d’un moniteur, dans ses prérogatives.</p>")
    + `<div class="callout trap"><span class="eyebrow">À faire valider</span><p>Prérogatives exactes de l’initiateur (lieu, profondeur, niveaux d’élèves) selon le Code du sport et la FFESSM.</p></div>`);

  /* ---------- E2 ---------- */
  add("e2-n1mer", ex("de la piscine à la mer", "<p>En piscine, ton élève vide son masque sans souci. En mer, avec la houle, l’eau à 17 °C et un fond à 6 m, il panique au premier essai. C’est normal : le milieu ajoute du stress. Tu reprends près d’un fond, en eau calme, et tu redonnes une démonstration. La compétence acquise en piscine doit être <b>reconstruite</b> en mer.</p>"));
  add("e2-orga", ex("la feuille du DP", "<p>Avant de partir, tu annonces : « Clara et Yanis, N1 en formation, objectif lâcher-reprise et octopus, zone du sec Est, 6 à 12 m, 35 min, retour 11 h 10. » Le DP l’inscrit sur la fiche de sécurité. Si tu n’es pas de retour, on sait où chercher.</p>"));
  add("e2-exmer", ex("où placer l’exercice", "<p>Tu fais les exercices <b>au début</b> de la plongée, près d’un fond de sable à 6 m, quand les élèves ont froid le moins et de l’air le plus. L’exploration vient ensuite, comme une récompense. L’inverse, c’est faire travailler des élèves fatigués, froids, avec peu d’air.</p>"));
  add("e2-incidents", ex("après l’incident", "<p>Yanis est remonté trop vite après avoir lâché son embout. En surface, il dit que tout va bien. Tu préviens le DP, il est surveillé, tu notes ce qui s’est passé. Au débriefing, tu lui expliques calmement, sans le culpabiliser, et tu adaptes la séance suivante.</p>"));

  /* ---------- RIFAP ---------- */
  add("r-bilan", ex("le bilan en 30 secondes", "<p>Victime allongée sur le pont. <b>Conscience</b> : « Tu m’entends ? Serre-moi la main. » Elle répond. <b>Respiration</b> : régulière. <b>Circulation</b> : pas de saignement important. Puis le complémentaire : où as-tu mal, depuis quand, profil de plongée, palier fait ? Et tu recommences régulièrement : un bilan qui change, c’est une info pour les secours.</p>"));
  add("r-rcp", ex("l’enchaînement", "<p>La victime ne répond pas et ne respire pas normalement. Tu fais alerter et apporter le défibrillateur. Tu commences <b>30 compressions</b> au centre de la poitrine, puis <b>2 insufflations</b>. Le défibrillateur arrive : tu l’allumes et tu suis ses consignes, en reprenant les compressions dès qu’il le dit. Tu ne t’arrêtes qu’à l’arrivée des secours ou si elle reprend une respiration normale.</p>"));
  add("r-sortie", ex("sortir d’un semi-rigide", "<p>La victime est en surface contre le boudin. Tu gonfles son gilet, tu lui retires les plombs et le bloc dans l’eau. Deux personnes à bord la saisissent sous les bras, une troisième aide dans l’eau, et on la fait passer d’un mouvement, en gardant la tête protégée. Puis : bilan, oxygène, alerte.</p>"));
  add("r-acc", ex("le déni", "<p>« Non, non, c’est rien, j’ai dû me cogner. » Marc a des fourmillements dans le bras et refuse l’oxygène. Tu insistes calmement : « Ça ne coûte rien, et si c’est un accident de plongée, chaque minute compte. » Tu préviens le DP. Le déni est un signe fréquent : il ne doit pas retarder les secours.</p>"));

  /* ---------- Nitrox ---------- */
  add("nx-calculs", ex("la MOD pas à pas", "<p>Nitrox 36 %, Pp O₂ max 1,4 bar. Pression absolue max = 1,4 ÷ 0,36 = <b>3,89 bar</b>. Profondeur = (3,89 − 1) × 10 = <b>28,9 m</b>, arrondie prudemment à <b>28 m</b>. On arrondit toujours vers le moins profond pour la MOD.</p>"));
  add("nx-toxo", ex("les signes d’alerte", "<p>À 34 m avec un Nitrox 40 %, un plongeur voit son champ de vision se rétrécir et ses lèvres trembler. Ce sont des signes possibles de toxicité neurologique de l’oxygène, qui peuvent précéder une <b>crise convulsive</b>. On remonte immédiatement de quelques mètres et on termine la plongée. Mieux : on ne dépasse jamais la MOD.</p>"));
  add("nx-confirme", ex("le changement de gaz", "<p>En fin de plongée, à 6 m, tu passes sur un bloc à 80 % d’oxygène pour accélérer la décompression. Avant de respirer dessus, la palanquée vérifie : bon bloc, bonne profondeur (sous sa MOD), bon détendeur, et l’ordinateur basculé sur ce gaz. Se tromper de gaz en profondeur peut provoquer une crise hyperoxique.</p>")
    + `<div class="callout trap"><span class="eyebrow">À faire valider</span><p>Mélanges et usages autorisés au Nitrox confirmé selon la FFESSM.</p></div>`);

  /* ---------- Découverte et N1 : un exemple de plus ---------- */
  add("n1-physique", ex("le gilet qui change", "<p>À 3 m, tu es bien équilibré. Tu descends à 15 m sans toucher à ton gilet : tu deviens de plus en plus lourd, parce que l’air du gilet et le néoprène s’écrasent. Tu ajoutes un peu d’air. En remontant, c’est l’inverse : l’air se dilate, tu purges régulièrement pour ne pas partir vers la surface.</p>"));
  add("n1-secu", ex("la panne d’air", "<p>À 12 m, Paul te fait le signe « plus d’air ». Tu lui tends ton octopus, vous vous tenez par la sangle du gilet, et tu le montres au guide. La palanquée remonte ensemble, lentement. C’est un geste qu’on travaille en piscine pour qu’il devienne automatique.</p>"));

  /* ---------- Notions du tuteur : Découverte et N1 ---------- */
  C.notions = Object.assign(C.notions || {}, {
    "d-bapteme": [["deroul", "Le déroulement du baptême", "bapteme|moniteur|age|enfant|certificat|tenu", "Le baptême"], ["resp", "Respirer avec un détendeur", "respir|detendeur|bouche|souffl|bulle", "Respirer"], ["prof", "La profondeur du baptême", "profond|metre|6 m|surface", "Profondeur"], ["souci", "Si ça ne va pas", "signe|souci|peur|remonte|probleme|panique", "Un souci"]],
    "d-materiel": [["masque", "Le masque", "masque|nez|buee|sangle|vitre", "Masque"], ["bloc", "La bouteille", "bouteille|bloc|bar|air comprime|oxygene", "Bouteille"], ["detendeur", "Le détendeur", "detendeur|embout|octopus|deuxieme etage", "Détendeur"], ["gilet", "Le gilet et le lest", "gilet|lest|plomb|flott|combinaison", "Gilet"]],
    "d-oreilles": [["equil", "Équilibrer ses oreilles", "oreille|equilibr|valsalva|pince|tympan|deglut", "Oreilles"], ["bloque", "Si ça bloque", "bloque|douleur|mal|force|remonte", "Si ça bloque"], ["masque", "Le masque et le nez", "masque|plaque|souffl.*nez", "Masque"], ["calme", "Rester calme", "calme|stress|lent|panique|peur", "Calme"]],
    "n1-signes": [["ok", "« Ça va » et « ça ne va pas »", "ca va|rond|pouce.*index|oscille|ca ne va pas", "Ça va"], ["haut", "Monter, descendre", "pouce|monte|descend|remonte", "Pouce en haut"], ["air", "Panne d’air et réserve", "gorge|plus d.air|reserve|mi-pression|50 bar|manometre", "Main sur la gorge"], ["autres", "Froid, essoufflement, stop", "froid|essouffl|stop|ensemble|regarde|lampe", "Main qui oscille"]],
    "n1-physique": [["press", "La pression augmente avec la profondeur", "pression|bar|10 m|absolue|profond", "La règle"], ["air", "L’air se comprime et se dilate", "volume|comprim|dilat|ballon|mariotte|poumon", "L’air"], ["gilet", "Le gilet et la flottabilité", "gilet|flott|leste|purge|poumon ballast|archimede", "Le gilet"], ["zone", "La zone des premiers mètres", "premiers metres|0.10|surface|zone|double", "La zone sensible"]],
    "n1-accidents": [["oreille", "Les oreilles et le masque", "oreille|tympan|sinus|masque|plaqu", "Oreilles"], ["essouf", "L’essoufflement", "essouffl|co2|effort|souffl|courant", "Essoufflé"], ["froid", "Le froid", "froid|frisson|hypotherm|temperature", "Froid"], ["remontee", "La remontée et ses risques", "remont|apnee|surpression|bloque.*respir|vite|add|desatur", "Remontée"]],
    "n1-secu": [["n1", "Ce que permet le N1", "n1|20 m|encadre|guide|prerogat", "N1"], ["palan", "La palanquée", "palanquee|binome|equipier|ensemble|groupe", "Palanquée"], ["panne", "La panne d’air", "panne|plus d.air|octopus|partag|reserve", "Panne d’air"], ["remontee", "Remonter et sortir", "remont|vitesse|palier|surface|bateau|bulles", "Remontée"]],
    "n1-milieu": [["regle", "Regarder sans toucher", "touch|ramass|nourri|regarde|souvenir", "Règle"], ["stab", "Se stabiliser au-dessus du fond", "stabil|fond|palme|sable|ras", "Stabilisation"], ["posi", "La posidonie", "posidonie|herbier|plante|nurserie", "Posidonie"], ["dang", "Les espèces à connaître", "rascasse|vive|oursin|meduse|murene|pique|venin|brul", "Rascasse"]]
  });
})();

/* 2.4 : les schémas en étapes deviennent du HTML (lisible sur mobile, même
   animation étape par étape). Les schémas sont construits à l'affichage,
   donc ce remplacement s'applique à tous les cours. */
(function () {
  "use strict";
  const D = AA.content.dgb; if (!D) return;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  D.flowSvg = D.flow;
  D.flow = (steps, cap) => `<figure class="diagram anim hflow-fig"><ol class="hflow" role="list">${steps.map(([title, det], i) =>
    `<li style="--i:${i}"><span class="hf-n">${i + 1}</span><span class="hf-b"><b>${esc(title)}</b>${det ? `<span>${esc(det)}</span>` : ""}</span></li>`).join("")}</ol><figcaption>${cap}</figcaption></figure>`;
})();
