/* =====================================================================
   Abysse Academy 2.9 · contenus des mises en situation (mini-jeux)
   Chasse aux erreurs, signes sous l'eau, incidents en direct.
   Personnages et sites inventés. Contenus « À faire valider » par ton
   moniteur : les signes et les conduites à tenir peuvent varier selon
   les clubs et les fédérations.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  const G = (C.games29 = {});

  /* ---------- Chasse aux erreurs : [texte, danger ?, explication, module] ---------- */
  G.scenes = [
    { id: "pont", title: "Sur le bateau, avant la mise à l’eau", art: "boat", sub: "Palanquée autonome PA20 : toi, Jade et Paul.",
      items: [
        ["Le robinet du bloc de Paul n’est ouvert que d’un quart de tour.", 1, "Un robinet à peine ouvert peut limiter le débit en profondeur : on l’ouvre complètement avant la mise à l’eau.", "materiel"],
        ["Jade a dormi trois heures après une soirée très arrosée.", 1, "Fatigue et alcool favorisent l’accident de désaturation et la narcose. Elle doit le dire au DP, qui décidera.", "accidents"],
        ["Paul n’a pas d’ordinateur et compte suivre celui de Jade.", 1, "En autonomie, chacun doit pouvoir contrôler sa propre plongée et sa remontée (ordinateur, ou tables avec montre et profondimètre).", "regles"],
        ["La palanquée n’a fixé aucune pression de demi-tour.", 1, "Sans pression de retour décidée avant, on rentre trop tard. On la fixe au briefing de palanquée.", "pa20"],
        ["Personne n’a de parachute de palier dans la palanquée.", 1, "Sans moyen de se signaler, une palanquée qui fait surface loin du bateau est difficile à repérer.", "pa20"],
        ["Le DP a annoncé le site, la profondeur maxi et l’heure de sortie.", 0, "C’est le rôle du directeur de plongée : tout va bien ici.", "regles"],
        ["Ton masque est rincé et passé au produit désembuant.", 0, "Bonne préparation : un masque qui ne s’embue pas, c’est plus de confort et de sécurité.", "materiel"],
        ["Le gilet de Jade gonfle et se purge normalement au test.", 0, "Le test du gilet avant de sauter fait partie des vérifications : rien à signaler.", "materiel"],
        ["La mer est calme et le courant est annoncé faible.", 0, "Conditions favorables : rien de dangereux ici.", "environnement"],
        ["Chacun a sa source de secours bien visible sur la poitrine.", 0, "La source de secours doit être accessible et repérable : c’est parfait.", "materiel"]
      ] },
    { id: "fond", title: "Au fond, à 18 m", art: "reef", sub: "Vous êtes trois en autonomie, limite fixée à 20 m.",
      items: [
        ["Ton manomètre affiche 70 bar et la palanquée s’éloigne encore.", 1, "La pression de retour est dépassée : il fallait déjà faire demi-tour pour garder la réserve.", "pa20"],
        ["Jade est restée en arrière, hors de vue depuis une minute.", 1, "La palanquée se perd de vue : on s’arrête, on se regroupe, ou on applique la procédure de perte.", "regles"],
        ["Tu palmes fort contre le courant et ton souffle s’accélère.", 1, "C’est le début de l’essoufflement : on s’arrête, on expire longuement, on s’abrite du courant.", "physio"],
        ["Ton ordinateur affiche 24 m alors que la limite est de 20 m.", 1, "En PA20, la limite est de 20 m : on remonte au-dessus et on le signale à la palanquée.", "regles"],
        ["Paul s’accroche au corail pour mieux se stabiliser.", 1, "Le corail est fragile et parfois urticant : on se stabilise au gilet et au poumon.", "environnement"],
        ["Vous échangez le signe « ça va » toutes les quelques minutes.", 0, "Se surveiller régulièrement, c’est exactement ce qu’on attend d’une palanquée autonome.", "pa20"],
        ["Ton gilet est un peu gonflé, tu restes bien équilibré.", 0, "Bonne flottabilité : pas d’effort inutile, pas de contact avec le fond.", "archimede"],
        ["Un mérou vous observe de loin, sans s’approcher.", 0, "On l’observe sans le toucher ni le nourrir : aucune raison de s’inquiéter.", "environnement"],
        ["Vous longez le tombant en gardant le bateau du bon côté.", 0, "Bonne orientation : vous savez où se trouve le mouillage.", "pa20"],
        ["L’ordinateur indique encore quinze minutes sans palier.", 0, "Information normale : vous restez dans la courbe de sécurité.", "deco"]
      ] },
    { id: "remontee", title: "Pendant la remontée", art: "ascent", sub: "Fin de plongée en autonomie, il reste 80 bar.",
      items: [
        ["Tu remontes plus vite que tes plus petites bulles.", 1, "Vitesse trop rapide : on purge le gilet et on ralentit. L’ordinateur sonnerait aussi.", "deco"],
        ["Tu bloques ta respiration sur les derniers mètres.", 1, "C’est là que le volume d’air change le plus : risque de surpression pulmonaire. On expire.", "accidents"],
        ["L’ordinateur demande un palier et tu fais surface sans le faire.", 1, "Un palier obligatoire sauté expose à un accident de désaturation : on le fait jusqu’au bout.", "deco"],
        ["Jade remonte seule pendant que tu termines ta photo.", 1, "La palanquée remonte ensemble : on ne laisse jamais son binôme seul.", "pa20"],
        ["Ton gilet est gonflé à fond à 10 m pour monter plus vite.", 1, "Le gilet se dilate en montant : remontée incontrôlée assurée. On le purge au fur et à mesure.", "mariotte"],
        ["Tu purges ton gilet régulièrement pour garder la vitesse.", 0, "C’est le bon geste : l’air du gilet se dilate pendant la remontée.", "mariotte"],
        ["Vous faites trois minutes de palier de sécurité vers 5 m.", 0, "Le palier de sécurité est recommandé même sans palier obligatoire.", "deco"],
        ["Tu regardes vers la surface et tournes sur toi-même en sortant.", 0, "Tour d’horizon avant de sortir : on repère bateaux et obstacles.", "pa20"],
        ["Vous restez face à face pendant toute la remontée.", 0, "Face à face, chacun surveille l’autre : c’est parfait.", "pa20"],
        ["Tu lèves un bras au-dessus de la tête sur les derniers mètres.", 0, "Le bras levé protège la tête d’une coque ou d’un obstacle en surface.", "pa20"]
      ] }
  ];

  /* ---------- Signes sous l'eau : [geste, sens] ---------- */
  G.signs = [
    ["Pouce et index forment un anneau, les autres doigts tendus.", "Tout va bien"],
    ["Main ouverte à plat, qui oscille de droite à gauche.", "Quelque chose ne va pas"],
    ["Poing fermé, pouce tendu vers le haut.", "On remonte"],
    ["Poing fermé, pouce tendu vers le bas.", "On descend"],
    ["Poing fermé, montré devant le masque.", "Je suis sur la réserve"],
    ["Tranchant de la main qui passe devant la gorge.", "Je n’ai plus d’air"],
    ["Main à plat qui monte et descend devant la poitrine.", "Je suis essoufflé"],
    ["Bras croisés, les mains frottent le haut des bras.", "J’ai froid"],
    ["Index qui montre l’oreille, puis main qui oscille.", "J’ai un problème d’oreille"],
    ["Main à plat, paume vers le bas, qui reste immobile.", "On reste à cette profondeur"],
    ["En surface, bras en arc, la main posée sur la tête.", "Tout va bien en surface"],
    ["En surface, bras tendu qui s’agite de haut en bas.", "Détresse : venez me chercher"],
    ["De nuit, la lampe décrit un cercle lent.", "Tout va bien (de nuit)"],
    ["De nuit, la lampe s’agite vite de gauche à droite.", "Problème (de nuit)"]
  ];
  G.signsModule = "n1-signes";

  /* ---------- Incidents en direct ---------- */
  const O = (t, e) => ({ t, ok: 1, e }), X = (t, e, s) => ({ t, ok: 0, e, s: s || 25 });
  G.incidents = [
    { id: "air", title: "Panne d’air à 18 m", m: "pa20", sub: "Palanquée autonome, toi et Jade. Ton manomètre : 120 bar.", depth: 18,
      steps: [
        { scene: "Jade arrive vers toi et fait le signe « plus d’air », les yeux écarquillés.", q: "Que fais-tu tout de suite ?", air: 120,
          c: [X("Je lui montre la surface pour qu’elle remonte en expirant.", "Une remontée seule et sans air, c’est le risque de surpression et de panique. Tu as de l’air : partage-le.", 35),
              O("Je lui présente ma source de secours et je la saisis par le gilet.", "La source de secours d’abord, et un contact solide pour ne pas vous séparer."),
              X("Je regarde d’abord son manomètre pour comprendre la panne.", "Chaque seconde compte : on donne de l’air avant de chercher la cause.")] },
        { scene: "Elle respire sur ton détendeur, vite et fort.", q: "Et maintenant ?", air: 112,
          c: [X("Je lance la remontée tout de suite, il faut sortir d’ici.", "Remonter avec quelqu’un qui hyperventile, c’est risquer qu’il lâche le détendeur. On stabilise d’abord."),
              X("Je lâche son gilet pour lui faire le signe « ça va ».", "Ne jamais lâcher la victime : le contact la rassure et évite la séparation."),
              O("Je la tiens face à moi et j’attends que son souffle se calme.", "Face à face, tu vérifies qu’elle respire bien sur ta source avant d’annoncer la remontée.")] },
        { scene: "Son souffle ralentit. Ton manomètre : 100 bar pour deux.", q: "Comment remontez-vous ?", air: 100, d: 18,
          c: [O("Ensemble, en réglant la vitesse avec la purge des gilets.", "Une remontée à deux, contrôlée, en restant face à face."),
              X("Je gonfle son gilet à fond pour qu’elle monte devant moi.", "Un gilet gonflé à fond, c’est une remontée en ballon et un détendeur arraché.", 35),
              X("En palmant fort, chacun à son rythme vers la surface.", "Chacun à son rythme, vous vous séparez et elle n’a plus d’air.")] },
        { scene: "À 5 m. Pas de palier obligatoire. Il reste 60 bar pour deux.", q: "Que décides-tu ?", air: 60, d: 5,
          c: [X("On saute le palier : après une panne d’air, on sort tout de suite.", "Pas toujours : si l’air restant le permet, le palier de sécurité est une protection en plus."),
              O("Un court palier de sécurité, si l’air restant le permet.", "Avec 60 bar à deux, quelques minutes à 5 m restent possibles. On surveille le manomètre."),
              X("On reste dix minutes à 5 m pour bien désaturer.", "À deux sur une bouteille, l’air fond vite : un palier trop long t’expose à ta propre panne.")] },
        { scene: "Surface. Le bateau est à 50 m.", q: "Que fais-tu ?", air: 45, d: 0,
          c: [X("On nage vers le bateau sans prévenir, il n’est pas loin.", "On sécurise et on se signale d’abord : le bateau doit savoir qu’il y a eu un incident."),
              X("J’enlève mon masque pour lui demander tout de suite ce qui s’est passé.", "Le débriefing viendra au bateau. En surface, flottabilité et signalement d’abord."),
              O("Je gonfle son gilet, je reste près d’elle et j’alerte le bateau.", "Flottabilité, contact, alerte : le bateau vient vous chercher et le DP est informé.")] }
      ],
      learn: ["Donner de l’air d’abord, comprendre après.", "Contact solide et face à face pendant toute la remontée.", "Palier de sécurité seulement si l’air le permet."] },
    { id: "courant", title: "Courant fort au retour", m: "environnement", sub: "Fin de plongée à 15 m, le mouillage est loin. Toi et Jade.", depth: 15,
      steps: [
        { scene: "Le courant forcit : vous palmez sans avancer. Jade respire vite.", q: "Ta première réaction ?", air: 90,
          c: [X("On palme plus fort pour rejoindre le mouillage avant d’être épuisés.", "Lutter contre le courant mène tout droit à l’essoufflement. On s’arrête d’abord.", 35),
              X("On monte tout de suite en pleine eau pour nager en surface.", "Une remontée improvisée sans palier ni plan, c’est ajouter un risque au premier."),
              O("On s’arrête et on se plaque près du fond, à l’abri d’un rocher.", "Le courant est plus faible près du fond et derrière les reliefs : on souffle à l’abri.")] },
        { scene: "À l’abri. Jade souffle encore fort.", q: "Comment l’aides-tu ?", air: 82,
          c: [O("Je lui montre une longue expiration et je la tiens immobile.", "L’expiration longue fait baisser le gaz carbonique : c’est la clé de l’essoufflement."),
              X("Je lui fais signe d’inspirer à fond pour se calmer.", "Inspirer à fond n’aide pas : c’est l’expiration longue qui fait sortir le gaz carbonique."),
              X("Je lui fais signe de reprendre la route vers le mouillage.", "Repartir avant d’avoir récupéré, c’est relancer l’essoufflement.")] },
        { scene: "Jade va mieux. Le mouillage est à 80 m, contre le courant. Ton manomètre : 70 bar.", q: "Que décidez-vous ?", air: 70,
          c: [X("On attend ici que le courant faiblisse, même si l’air baisse.", "Le courant peut durer : attendre en consommant, c’est te priver de ta réserve."),
              O("On remonte ensemble, à vitesse contrôlée, le parachute prêt.", "On renonce au mouillage : remontée normale, palier, et le bateau viendra vous chercher."),
              X("On repart contre le courant en restant en pleine eau.", "En pleine eau, le courant est encore plus fort : épuisement garanti.")] },
        { scene: "Pendant le palier, vous dérivez avec le courant.", q: "Que fais-tu ?", air: 55, d: 5,
          c: [X("On finit le palier plus profond pour moins dériver.", "Le palier se fait à la profondeur prévue : la dérive n’est pas un danger si on est repérés."),
              O("J’envoie le parachute de palier pour que le bateau nous suive.", "Le parachute signale votre position pendant toute la dérive : le bateau vous suit."),
              X("On abrège le palier pour retrouver le bateau plus vite.", "Abréger le palier pour gagner du temps, c’est échanger un problème contre un accident.")] },
        { scene: "Surface, loin du bateau. La mer s’est formée.", q: "Que faites-vous ?", air: 45, d: 0,
          c: [O("Gilets gonflés, on reste ensemble et on se signale au bateau.", "Ensemble et visibles : le parachute levé, le bateau vous rejoint."),
              X("On se sépare pour nager vers la côte et gagner du temps.", "Séparés, vous êtes deux fois plus difficiles à repérer et à secourir."),
              X("On retire les blocs pour nager plus facilement vers lui.", "Le bloc et le gilet gonflé sont ta flottabilité : on garde tout et on attend le bateau.")] }
      ],
      learn: ["Courant fort : on s’arrête, on s’abrite, on ne lutte pas.", "Essoufflement : expiration longue, immobilité.", "Parachute de palier : on reste visible pendant la dérive."] }
  ];
})();
