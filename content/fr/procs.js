/* =====================================================================
   Abysse Academy 2.5 · procédures d'urgence « remets les gestes dans
   l'ordre ». Chaque procédure : la situation (q), les bons gestes dans
   l'ordre (steps ; un tableau dans steps = gestes dont l'ordre est libre),
   des gestes tentants mais faux (extra) mélangés dans la liste, et
   l'explication (e). Les procédures varient selon les structures :
   tout est marqué « À faire valider » avec ton moniteur.
   Ne jamais réordonner ni supprimer : la progression est attachée à l'id.
   ===================================================================== */
(function () {
  "use strict";
  const C = window.AA.content;
  const V = " À faire valider avec ton moniteur : le détail peut varier selon ta structure et le briefing du DP.";
  const P = [
    /* ---------- Découverte ---------- */
    { id: "proc-dec-oreille", m: "d-oreilles", title: "Mal à l’oreille à la descente",
      q: "Pendant ton baptême, à 3 m, ton oreille te fait mal et la douleur augmente. Remets les bons gestes dans l’ordre.",
      steps: ["Faire signe « ça ne va pas » au moniteur en montrant l’oreille", "Arrêter de descendre", "Remonter d’un mètre avec le moniteur", "Équilibrer doucement (Valsalva léger, déglutir)", "Reprendre la descente lentement en équilibrant souvent"],
      extra: ["Souffler très fort dans le nez pinché jusqu’à ce que ça passe", "Continuer la descente : la douleur part toute seule", "Remonter seul à la surface sans prévenir", "Retirer le détendeur pour expliquer le problème"],
      e: "On prévient, on s’arrête, on remonte un peu pour soulager, puis on équilibre en douceur. Forcer peut abîmer le tympan ; si la douleur persiste, on arrête la plongée." },
    { id: "proc-dec-eau", m: "d-materiel", title: "De l’eau dans le détendeur",
      q: "Pendant ton baptême, tu avales un peu d’eau et tu as envie de tousser. Remets les bons gestes dans l’ordre.",
      steps: ["Garder le détendeur en bouche", "Tousser dans le détendeur", "Appuyer sur le bouton de purge pour chasser l’eau", "Reprendre une respiration lente et ample", "Faire signe « OK » au moniteur quand c’est passé"],
      extra: ["Retirer le détendeur pour tousser plus facilement", "Bloquer sa respiration pour ne plus avaler d’eau", "Remonter seul en palmant vite", "Retirer le masque pour se moucher"],
      e: "On peut tousser dans le détendeur : il reste en bouche. La purge chasse l’eau, puis on reprend une respiration calme et on rassure le moniteur." },

    /* ---------- N1 ---------- */
    { id: "proc-n1-air", m: "n1-secu", title: "Panne d’air avec ton moniteur",
      q: "À 15 m, tu n’arrives plus à respirer : ton manomètre est presque à zéro. Ton moniteur est près de toi. Remets les bons gestes dans l’ordre.",
      steps: ["Faire le signe « je n’ai plus d’air » au moniteur", "Prendre la source de secours qu’il te présente", "Respirer calmement sur cette source", "Te tenir à lui (sangle ou bras) face à face", "Remonter avec lui à la vitesse qu’il impose, sans lâcher l’embout", "En surface, gonfler ton gilet et rester avec lui"],
      extra: ["Remonter seul le plus vite possible", "Gonfler ton gilet au fond pour remonter plus vite", "Prendre le détendeur d’un autre plongeur sans prévenir", "Retenir ta respiration pendant la remontée", "Lâcher ton détendeur avant d’avoir l’autre source en main"],
      e: "Le signe d’abord, puis la source de secours, une respiration calme et une remontée contrôlée par l’encadrant. Ne jamais bloquer sa respiration en remontant : risque de surpression pulmonaire." },
    { id: "proc-n1-perte", m: "n1-secu", title: "Tu perds ta palanquée",
      q: "Dans une eau trouble, tu ne vois plus ta palanquée. Remets les bons gestes dans l’ordre.",
      steps: [["Faire un tour sur toi-même pour regarder autour", "Chercher les bulles des autres plongeurs"], "Attendre environ une minute à l’endroit où tu es", "Remonter lentement, sans dépasser la vitesse de remontée", "En surface, gonfler ton gilet", "Te signaler au bateau et attendre ta palanquée"],
      extra: ["Descendre plus profond pour les retrouver", "Partir seul à la palme dans une direction", "Remonter le plus vite possible", "Continuer la plongée seul jusqu’à la fin prévue"],
      e: "La procédure de perte est annoncée au briefing : on cherche, on attend un peu, puis on remonte calmement pour se retrouver en surface." + V },
    { id: "proc-n1-crampe", m: "n1-accidents", title: "Une crampe au mollet",
      q: "Sous l’eau, une crampe te bloque le mollet. Remets les bons gestes dans l’ordre.",
      steps: ["Arrêter de palmer", "Prévenir ton encadrant (signe « crampe »)", "Attraper le bout de ta palme", "Tirer la palme vers toi pour étirer le mollet", "Masser doucement le muscle", "Repartir en palmant plus souplement"],
      extra: ["Palmer plus fort pour faire passer la crampe", "Retirer ta palme et la laisser tomber", "Remonter seul tout de suite en surface", "Te tenir au fond en appuyant sur le pied"],
      e: "On arrête l’effort, on prévient, on étire le muscle en tirant la pointe de la palme, puis on repart en palmant plus souplement." },

    /* ---------- N2 ---------- */
    { id: "proc-n2-assist", m: "accidents", title: "Ton binôme ne se sent pas bien",
      q: "À 20 m, ton camarade te fait signe qu’il ne se sent pas bien. Remets les bons gestes dans l’ordre.",
      steps: ["Aller vers lui et capter son regard", "L’attraper de la main gauche (sangle ou gilet)", "Lui signifier que tu prends en charge la situation", "Gonfler un peu son gilet pour amorcer la remontée", "Ajuster avec ton gilet si besoin", "Remonter doucement en purgeant pour garder la vitesse", "Surveiller son état et son expiration pendant la remontée", "En surface, gonfler son gilet et le maintenir tête hors de l’eau", "Alerter le bateau (signe de détresse)"],
      extra: ["Le laisser remonter seul et le suivre des yeux", "Remonter très vite pour gagner du temps", "Gonfler les deux gilets au maximum dès le fond", "Lui retirer son détendeur pour qu’il respire mieux", "L’attraper par la palme pour le tirer", "Lui demander de faire seul un palier de sécurité"],
      e: "On établit le contact, on tient la victime de la main gauche, on annonce la prise en charge, on remonte en contrôlant la vitesse avec la purge, on surveille, puis en surface : flottabilité, voies aériennes hors de l’eau et alerte." + V },
    { id: "proc-n2-air", m: "pa20", title: "Panne d’air en autonomie",
      q: "À 18 m en autonomie, ton binôme te fait le signe « plus d’air ». Remets les bons gestes dans l’ordre.",
      steps: ["Lui présenter ta source de secours", "Le saisir face à face (sangle ou gilet)", "Vérifier qu’il respire bien sur ta source", "Annoncer la remontée par signe", "Remonter ensemble en contrôlant la vitesse avec les gilets", "Faire le palier de sécurité si l’air restant le permet", "En surface, gonfler son gilet et se signaler au bateau"],
      extra: ["Lui dire de remonter seul en expirant", "Échanger vos blocs au fond", "Remonter le plus vite possible", "Lui donner ton détendeur principal et partir chercher de l’aide", "Gonfler son gilet à fond pour qu’il monte seul"],
      e: "La source de secours d’abord, un contact solide, puis une remontée contrôlée à deux. Le palier de sécurité se fait seulement si l’air le permet." + V },
    { id: "proc-n2-perte", m: "regles", title: "Tu perds ton binôme en autonomie",
      q: "Plongée en autonomie à 25 m : tu ne vois plus ton binôme. Remets les bons gestes dans l’ordre.",
      steps: [["Faire un tour d’horizon complet", "Chercher ses bulles ou sa lampe"], "Attendre environ une minute sur place", "Remonter à vitesse normale", "Faire le palier de sécurité si possible", "En surface, chercher ses bulles et te signaler au bateau", "Prévenir le directeur de plongée"],
      extra: ["Descendre plus profond pour le retrouver", "Continuer la plongée seul comme prévu", "Remonter très vite pour donner l’alerte", "Partir à sa recherche dans la direction de l’ancre"],
      e: "La procédure de perte se décide au briefing. Le principe : chercher, attendre un peu, remonter normalement et se retrouver en surface, puis prévenir le DP." + V },
    { id: "proc-n2-essouf", m: "physio", title: "Ton binôme est essoufflé",
      q: "À 25 m, ton binôme respire vite et fort, il palme contre le courant. Remets les bons gestes dans l’ordre.",
      steps: ["Lui faire signe de s’arrêter de palmer", ["Te stabiliser près de lui", "L’attraper pour l’aider à s’immobiliser"], "Lui montrer une expiration longue et lente", "Remonter de quelques mètres avec lui si ça ne passe pas", "Une fois calmé, terminer la plongée tranquillement"],
      extra: ["Lui dire de respirer plus vite", "Accélérer pour rejoindre le mouillage", "Remonter directement en surface à toute vitesse", "Continuer la plongée à la même profondeur"],
      e: "On coupe l’effort, on s’immobilise, on insiste sur l’expiration. Remonter un peu réduit la densité du gaz et soulage. On termine calmement." },

    /* ---------- RIFAP ---------- */
    { id: "proc-rif-surface", m: "r-vict", title: "Plongeur inanimé en surface",
      q: "Un plongeur remonte et reste inanimé en surface, face dans l’eau. Tu es à côté. Remets les bons gestes dans l’ordre.",
      steps: ["Lever le bras pour alerter le bateau", "Le retourner face vers le ciel", "Gonfler son gilet", "Lui sortir les voies aériennes de l’eau (retirer le détendeur)", "Le tracter vers le bateau, tête hors de l’eau", "Le hisser à bord avec l’équipe", "Faire le bilan : conscience, respiration"],
      extra: ["Attendre qu’il reprenne conscience dans l’eau", "Le redescendre pour faire un palier", "Lui donner à boire dès qu’il est à bord", "Retirer son gilet pour le tracter plus vite", "Nager seul vers le bateau chercher de l’aide"],
      e: "Alerter, retourner, flottabilité, voies aériennes libres, tracter, sortir de l’eau, puis bilan. La suite dépend du bilan (RCP, oxygène)." + V },
    { id: "proc-rif-rcp", m: "r-rcp", title: "Arrêt cardiaque sur le bateau",
      q: "Sur le bateau, la victime ne répond pas et ne respire pas normalement. Remets les bons gestes dans l’ordre.",
      steps: ["Vérifier la conscience (lui parler, le stimuler)", "Libérer les voies aériennes (bascule de la tête)", "Vérifier la respiration (10 secondes au plus)", "Faire alerter les secours et apporter le défibrillateur", "Commencer les compressions thoraciques (30)", "Alterner avec 2 insufflations, avec oxygène si possible", "Poser le défibrillateur dès qu’il arrive et suivre ses consignes"],
      extra: ["Le mettre en position latérale de sécurité", "Attendre l’arrivée des secours avant de masser", "Surélever ses jambes et attendre", "Lui donner de l’eau sucrée", "Arrêter le massage pour vérifier le pouls toutes les 30 secondes"],
      e: "Conscience, libération des voies aériennes, respiration, alerte, puis massage cardiaque 30/2 et défibrillateur au plus tôt. La PLS est pour une victime inconsciente qui respire." + V },
    { id: "proc-rif-add", m: "r-cas", title: "Suspicion d’accident de décompression",
      q: "30 min après la plongée, un plongeur se plaint de fourmillements dans un bras et d’une grande fatigue. Remets les bons gestes dans l’ordre.",
      steps: ["L’installer au repos, allongé, à l’abri", ["Lui donner de l’oxygène à fort débit", "Faire alerter les secours (VHF 16 en mer, 15 ou 112 à terre)"], "Faire le bilan : signes, heure, profil de plongée", "Lui faire boire de l’eau par petites gorgées s’il est conscient", "Surveiller et noter l’évolution des signes", "Transmettre la fiche et le profil aux secours", "Surveiller aussi son binôme"],
      extra: ["Le remettre à l’eau pour refaire un palier", "Attendre de voir si ça passe avant d’appeler", "Lui faire bouger le bras pour tester sa force", "Lui servir un café chaud et sucré", "Le ramener chez lui en voiture"],
      e: "Repos, oxygène et alerte sans attendre, puis bilan, hydratation si conscient et surveillance. Le binôme a fait la même plongée : on le surveille aussi." + V },

    /* ---------- Nitrox ---------- */
    { id: "proc-nx-prepa", m: "nx-pratique", title: "Préparer un bloc Nitrox",
      q: "Avant une plongée au Nitrox, tu prépares ton bloc. Remets les bons gestes dans l’ordre.",
      steps: ["Analyser toi-même le mélange avec un analyseur étalonné", "Comparer avec le pourcentage annoncé", "Noter le pourcentage sur le bloc et le registre, puis signer", ["Calculer ta profondeur maximale (PpO₂ retenue)", "Régler ton ordinateur sur le pourcentage analysé"], "Annoncer pourcentage et profondeur maximale à ton binôme et au DP"],
      extra: ["Te fier à l’étiquette de la station sans analyser", "Analyser le mélange après la plongée", "Prendre le bloc de ton binôme sans vérifier", "Régler ton ordinateur sur 21 % pour aller plus vite", "Calculer la profondeur maximale avec une PpO₂ de 2 bar"],
      e: "Chaque plongeur analyse son propre bloc, compare, note et signe. Ensuite : profondeur maximale, réglage de l’ordinateur, et annonce à la palanquée." + V },
    { id: "proc-nx-hyperox", m: "nx-toxo", title: "Signes d’hyperoxie au fond",
      q: "À 32 m au Nitrox, ton binôme a des contractions des lèvres et semble confus. Remets les bons gestes dans l’ordre.",
      steps: ["Le saisir immédiatement", "Lui maintenir le détendeur en bouche", "Remonter de quelques mètres pour baisser la PpO₂", "Annoncer la fin de la plongée", "Remonter avec lui en contrôlant la vitesse et en le surveillant", "En surface, le maintenir tête hors de l’eau et alerter"],
      extra: ["Descendre un peu pour le calmer", "Lui retirer son détendeur pour qu’il respire mieux", "Le laisser se reposer au fond quelques minutes", "Continuer la plongée en restant plus près de lui"],
      e: "Ces signes peuvent annoncer une crise. On tient la victime et son détendeur, on baisse la PpO₂ en remontant un peu, et on termine la plongée sous surveillance." + V },

    /* ---------- N3 ---------- */
    { id: "proc-n3-debit", m: "n3-materiel", title: "Détendeur en débit continu",
      q: "À 35 m en autonomie, ton détendeur principal se met en débit continu. Remets les bons gestes dans l’ordre.",
      steps: ["Garder l’embout et respirer en laissant fuir l’excès par les lèvres", "Prévenir ton binôme par signe", "Passer sur ton détendeur de secours", "Fermer la sortie du détendeur en débit continu (ou la faire fermer)", "Annoncer la fin de la plongée", "Remonter ensemble à vitesse contrôlée, paliers selon l’ordinateur", "Signaler l’incident au DP"],
      extra: ["Recracher le détendeur et retenir ta respiration", "Remonter très vite avant que le bloc soit vide", "Continuer la plongée en surveillant le manomètre", "Taper le détendeur sur un rocher pour le débloquer"],
      e: "On garde l’embout : on peut respirer dans un débit continu. Ensuite : prévenir, changer de source, couper la sortie qui fuit et remonter en gérant les paliers." + V },
    { id: "proc-n3-narcose", m: "n3-accidents", title: "Ton binôme est narcosé",
      q: "À 45 m, ton binôme ne répond plus à tes signes, le regard fixe. Remets les bons gestes dans l’ordre.",
      steps: ["Le saisir fermement", "Remonter de quelques mètres avec lui", "Vérifier qu’il répond à nouveau (signe OK)", "Rester moins profond pour la suite de la plongée", "Écourter la plongée si les signes reviennent"],
      extra: ["Descendre pour voir s’il te suit", "Le laisser pour aller chercher le reste de la palanquée", "Lui retirer son masque pour le réveiller", "Remonter seul pour donner l’alerte"],
      e: "La narcose diminue en remontant un peu. On tient la victime, on remonte, on vérifie qu’elle répond, puis on reste moins profond ou on termine." },
    { id: "proc-n3-brief", m: "n3-autonomie", title: "Préparer une plongée autonome à 40 m",
      q: "Tu prépares une plongée autonome à 40 m avec deux équipiers. Remets les bons gestes dans l’ordre.",
      steps: [["Fixer la profondeur et la durée maximales", "Fixer la pression de retour et la réserve", "Convenir des signes et de la procédure de perte"], "Faire valider le plan par le DP", "Vérifier le matériel les uns des autres", "S’immerger ensemble au signal"],
      extra: ["Laisser chacun choisir sa profondeur au fond", "Décider de la réserve pendant la plongée", "Se mettre à l’eau sans prévenir le DP", "Ne vérifier que son propre matériel"],
      e: "En autonomie, le plan se décide avant : limites, réserve, signes et procédure de perte. Le DP valide, puis vérification croisée du matériel et immersion ensemble." + V },

    /* ---------- E1 (initiateur) ---------- */
    { id: "proc-e1-panique", m: "e1-piscine", title: "Élève qui panique en piscine",
      q: "En piscine, à 3 m, ton élève débutant panique et veut retirer son détendeur. Remets les bons gestes dans l’ordre.",
      steps: ["Le saisir face à face", "Maintenir son détendeur en bouche avec ta main", "Le rassurer par le regard et le contact", "Remonter avec lui en douceur en lui faisant expirer", "En surface, lui faire prendre appui au bord et le rassurer", "Faire le point avec lui sur ce qui s’est passé"],
      extra: ["Le laisser remonter seul", "Lui dire de bloquer sa respiration", "Continuer l’exercice pour qu’il s’habitue", "Lui retirer le détendeur pour qu’il respire en surface plus vite"],
      e: "Contact, détendeur maintenu en bouche, réassurance, remontée en douceur avec expiration. Ensuite on analyse avec l’élève avant de reprendre." },
    { id: "proc-e1-demo", m: "e1-exercices", title: "Enseigner le lâcher d’embout",
      q: "Tu enseignes le lâcher et la reprise d’embout à un débutant. Remets les étapes dans l’ordre.",
      steps: ["Expliquer l’exercice au sec et les signes utilisés", "Faire une démonstration lente devant l’élève", "Le faire réaliser en le tenant", "Corriger ce qui ne va pas", "Lui faire répéter jusqu’à l’aisance", "Le féliciter et faire le bilan"],
      extra: ["Le faire essayer avant toute explication", "Faire la démonstration en allant vite pour qu’il la mémorise", "Le laisser seul faire l’exercice dès la première fois", "Corriger uniquement en fin de séance"],
      e: "Expliquer, démontrer, faire faire en sécurité, corriger, répéter, valoriser : c’est la trame d’une séance réussie." },

    /* ---------- N4 (guide de palanquée) ---------- */
    { id: "proc-n4-panique", m: "n4-assistance", title: "Plongeur qui panique",
      q: "Tu es guide : à 20 m, un plongeur de ta palanquée panique et veut remonter vite. Remets les bons gestes dans l’ordre.",
      steps: ["Le saisir face à face", "Contrôler son gilet (purge) pour empêcher une remontée rapide", "Vérifier qu’il a son détendeur et respire", "Le rassurer par le regard et le contact", "Faire signe aux autres de se regrouper", "Remonter avec toute la palanquée à vitesse contrôlée", "En surface, gonfler son gilet et alerter le bateau"],
      extra: ["Le laisser remonter et le surveiller d’en bas", "Le tenir par la palme pour le freiner", "Gonfler son gilet pour aller plus vite", "Envoyer un autre plongeur le raccompagner"],
      e: "Saisir, bloquer la remontée rapide, vérifier la respiration, rassurer, puis gérer toute la palanquée. Le guide ne laisse personne seul." + V },
    { id: "proc-n4-perte", m: "n4-guide", title: "Un plongeur a disparu",
      q: "Tu es guide : un plongeur de ta palanquée a disparu. Remets les bons gestes dans l’ordre.",
      steps: ["Regrouper le reste de la palanquée", ["Faire un tour d’horizon", "Chercher ses bulles ou sa lampe"], "Attendre environ une minute sur place", "Remonter avec toute la palanquée à vitesse normale", "En surface, chercher ses bulles et alerter le bateau", "Laisser le DP organiser les recherches"],
      extra: ["Laisser la palanquée pour chercher seul", "Descendre plus profond pour le retrouver", "Continuer la plongée en espérant le croiser", "Envoyer deux plongeurs le chercher pendant que tu continues"],
      e: "Le guide garde sa palanquée groupée, cherche, attend un peu puis remonte avec tout le monde. Les recherches s’organisent depuis la surface." + V },

    /* ---------- E2 ---------- */
    { id: "proc-e2-remontee", m: "e2-incidents", title: "Remontée rapide d’un élève",
      q: "En mer à 15 m, ton élève N1 part vers la surface, gilet trop gonflé. Remets les bons gestes dans l’ordre.",
      steps: ["Le rattraper par la sangle ou le gilet", "Purger son gilet", "Vérifier qu’il expire", "Stabiliser puis regrouper tes autres élèves", "Remonter calmement avec toute la palanquée", "Faire le bilan et surveiller l’apparition de signes", "Informer le DP"],
      extra: ["Le laisser remonter, il sera attendu en surface", "Gonfler ton propre gilet pour le suivre", "Lui dire de retenir sa respiration", "Reprendre la plongée sans rien dire"],
      e: "Freiner la remontée, faire expirer, regrouper les autres élèves, remonter calmement puis surveiller : une remontée rapide peut causer une surpression pulmonaire ou un accident de décompression." + V },
    { id: "proc-e2-air", m: "e2-securite", title: "Panne d’air d’un élève en palanquée",
      q: "Tu es moniteur à 18 m avec trois élèves. L’un d’eux fait le signe « plus d’air ». Remets les bons gestes dans l’ordre.",
      steps: ["Lui donner ta source de secours", "Le saisir face à face", "Faire signe aux autres élèves de se regrouper", "Annoncer la remontée", "Remonter toute la palanquée à vitesse contrôlée", "Faire le palier de sécurité si l’air le permet", "Signaler l’incident au DP"],
      extra: ["Envoyer un élève lui donner son octopus", "Le remonter seul et laisser les autres au fond", "Lui demander de remonter en expirant", "Continuer la plongée en partageant l’air"],
      e: "Air d’abord, contact, puis on garde toute la palanquée. Un moniteur ne laisse jamais des élèves seuls au fond." + V }
  ];
  const lab = s => (Array.isArray(s) ? s.join(" + ") : s);
  P.forEach(p => { p.type = "order"; p.proc = true; p.c = [p.steps.map(lab).join(" → "), "Un autre enchaînement"]; p.a = 0; });
  C.procs = (C.procs || []).concat(P);
  const b0 = C.build;
  C.build = function () { const r = b0.apply(this, arguments); C.procs.forEach(p => { if (C.byId[p.m]) p.world = C.byId[p.m].world; C.qById[p.id] = p; }); return r; };
  if (C.qById) C.procs.forEach(p => { if (C.byId[p.m]) p.world = C.byId[p.m].world; C.qById[p.id] = p; });
})();
