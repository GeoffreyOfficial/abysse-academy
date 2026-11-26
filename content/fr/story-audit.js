/* =====================================================================
   Abysse Academy 2.2.5 · aventures plus exigeantes
   Avant : la bonne réaction était toujours la première et la plus longue,
   et les autres paraissaient absurdes. Ici, chaque mauvais choix est une
   erreur qu'un vrai plongeur pourrait faire, de longueur comparable, et la
   place de la bonne réponse varie d'une scène à l'autre (fixe, pour que la
   progression d'une aventure reste lisible).
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  /* [texte, ok, explication, module] ; la bonne réponse garde son « go ». */
  const P = {
    anse: {
      s1: [
        ["Profondeur, durée, réserve, signes et conduite si on se perd.", 1, "En autonomie, la palanquée prépare tout elle-même et l’annonce au DP. Si vous vous perdez de vue, vous appliquez ce que vous avez convenu.", "pa20"],
        ["Profondeur, durée et pression de demi-tour, le reste on connaît.", 0, "Il manque les signes et surtout la conduite à tenir en cas de séparation : c’est AVANT qu’on la décide, sous l’eau on communique mal.", "pa20"],
        ["On suit l’ordinateur le plus prudent, on fixe juste le parcours.", 0, "L’ordinateur gère la décompression, pas l’organisation : réserve, signes et séparation restent votre plan.", "pa20"],
        ["Le parcours, la durée et le signal de retour au bateau.", 0, "Sans profondeur maxi, réserve ni procédure de séparation, le plan est incomplet.", "pa20"]
      ],
      s2: [
        ["2 bar", 0, "Ça, c’est la pression de l’eau seule (relative). Il manque le bar de l’atmosphère.", "pression"],
        ["3 bar", 1, "1 bar d’air au-dessus de l’eau + 2 bar d’eau (20 m) = 3 bar.", "pression"],
        ["2,5 bar", 0, "La pression augmente de 1 bar tous les 10 m : 1 + 2 = 3 bar, pas de demi-bar ici.", "pression"],
        ["4 bar", 0, "4 bar, c’est à 30 m. À 20 m : 1 bar d’atmosphère + 2 bar d’eau = 3 bar.", "pression"]
      ],
      s3: [
        ["Je m’arrête, je souffle un peu plus fort nez pincé, puis je repars.", 0, "Souffler plus fort contre une oreille bloquée peut blesser l’oreille interne. On remonte un peu d’abord.", "accidents"],
        ["Je déglutis plusieurs fois en continuant à descendre doucement.", 0, "Continuer à descendre augmente l’écart de pression : la douleur va empirer.", "accidents"],
        ["Je remonte d’un mètre, j’équilibre doucement, puis je redescends.", 1, "On ne force jamais : on remonte un peu pour réduire l’écart de pression, on équilibre en douceur, on redescend lentement.", "accidents"]
      ],
      s4: [
        ["Je vide un peu mon gilet et je me pose doucement sur le sable.", 0, "Vider le gilet te fait couler encore plus, et se poser sur l’herbier l’abîme.", "archimede"],
        ["J’inspire à fond et je bloque pour remonter au-dessus.", 0, "On ne bloque jamais sa respiration sous l’eau. Le poumon-ballast se règle avec des cycles amples, pas en apnée.", "archimede"],
        ["Petite injection dans le gilet, puis réglage fin à la respiration.", 1, "Le gilet corrige le gros, le poumon-ballast affine. Et on protège l’herbier, nurserie de la Méditerranée.", "archimede"],
        ["Je palme vers le haut pour me décoller, sans toucher au gilet.", 0, "Palmer près du fond soulève le sable et abîme l’herbier, et ça fatigue (CO₂). Le gilet sert à ça.", "environnement"]
      ],
      s5: [
        ["Je lui refais « ça va ? » de plus près et j’attends sa réponse.", 0, "Il ne répond déjà plus : attendre laisse la narcose s’installer. On agit en remontant de quelques mètres.", "accidents"],
        ["Possible narcose : je le tiens et on remonte de quelques mètres.", 1, "La narcose (azote sous pression) donne euphorie et erreurs. Elle s’atténue en remontant de quelques mètres.", "accidents"],
        ["Possible narcose : je le tiens et on remonte direct en surface.", 0, "Remonter de quelques mètres suffit à faire passer la narcose. Une remontée directe ajoute un risque inutile.", "accidents"]
      ],
      s6: [
        ["40 L/min", 0, "Tu as multiplié par la pression relative (2). Il faut la pression absolue (3).", "pression"],
        ["20 L/min", 0, "La consommation se multiplie par la pression absolue (loi de Mariotte).", "mariotte"],
        ["80 L/min", 0, "80 L/min, c’est à 30 m (4 bar). À 20 m : 20 × 3 = 60 L/min.", "mariotte"],
        ["60 L/min", 1, "20 L/min × 3 bar = 60 L/min. À 20 m, chaque inspiration prend trois fois plus d’air qu’en surface.", "materiel"]
      ],
      s7: [
        ["Je lui donne mon octopus, on se tient et on remonte ensemble.", 1, "Donner de l’air d’abord, se tenir pour ne pas se séparer, puis remontée contrôlée. Ça se travaille à l’entraînement.", "pa20"],
        ["Je lui donne mon octopus, puis on finit la plongée tranquillement.", 0, "Une panne d’air, c’est fin de plongée : on remonte ensemble, à vitesse contrôlée, sans prolonger.", "pa20"],
        ["Je lui montre de remonter en expirant, je le suis juste derrière.", 0, "La remontée sans air est le dernier recours : ton octopus est là. Et une remontée rapide expose à la surpression pulmonaire.", "accidents"],
        ["Je lui passe mon détendeur principal et je prends l’octopus.", 0, "Ça se pratique dans certaines écoles, mais dans le cursus français on donne l’octopus : moins de manipulations, moins de risque.", "pa20"]
      ],
      s8: [
        ["On fait le palier en surveillant Sam et l’air, parachute lancé.", 1, "Palier tenu, surveillance de l’équipier, et parachute pour que la surface sache où vous êtes.", "deco"],
        ["On raccourcit le palier à une minute : on a eu un incident.", 0, "Rien ne presse à ce stade : vous avez de l’air. Raccourcir le palier ajoute un risque d’accident.", "deco"],
        ["On fait le palier, puis on lance le parachute en arrivant en surface.", 0, "Le parachute sert justement à signaler la palanquée PENDANT le palier, avant que le bateau vous cherche.", "deco"]
      ],
      s9: [
        ["C’est sans doute le bloc : on surveille et on en reparle ce soir.", 0, "Ne jamais banaliser un signe après une plongée. Mieux vaut une fausse alerte qu’un accident non traité.", "accidents"],
        ["Je préviens Lou tout de suite : ça peut être un accident de désaturation.", 1, "Douleur, fatigue anormale après une plongée : on pense ADD. Alerte du DP, oxygène selon le protocole, surveillance.", "r-alerte"],
        ["Je lui donne de l’eau et de l’aspirine, puis on surveille.", 0, "Boire est utile, mais on ne traite pas seul : alerte du DP et oxygène d’abord. L’aspirine n’est pas un geste du RIFAP.", "r-cas"],
        ["On replonge dix minutes à 6 m pour « recompresser ».", 0, "Jamais. Le traitement d’un ADD se fait en caisson, après oxygène et transport. Replonger aggrave tout.", "accidents"]
      ]
    },
    recif: {
      r1: [
        ["Je saute à l’eau tout de suite pour l’atteindre au plus vite.", 0, "Personne ne sait que tu interviens, et toi-même tu peux devenir une deuxième victime. On alerte d’abord.", "r-role"],
        ["J’alerte le bateau en criant et je prépare l’intervention à l’abri.", 1, "Alerter tout de suite mobilise le DP et les secours. On intervient sans se mettre en danger soi-même.", "r-role"],
        ["J’appelle le CROSS d’abord, puis je vais le chercher.", 0, "Le CROSS viendra, mais d’abord on alerte ceux qui sont là (bateau, DP) pour agir tout de suite.", "r-alerte"]
      ],
      r2: [
        ["PLS, puis oxygène et surveillance de sa respiration.", 1, "Inconscient qui respire : PLS pour protéger les voies aériennes, oxygène selon le protocole, surveillance continue.", "r-vict"],
        ["Sur le dos, tête basculée, oxygène au masque et surveillance.", 0, "Sur le dos, un inconscient peut s’étouffer (langue, vomissements). S’il respire : PLS.", "r-vict"],
        ["Massage cardiaque et défibrillateur, puis oxygène.", 0, "Il respire : pas de massage. La RCP, c’est quand il n’y a plus de respiration normale.", "r-vict"],
        ["Assis contre le bord, oxygène au masque, on lui parle.", 0, "Un inconscient ne se met jamais assis : il peut s’effondrer et s’étouffer. PLS.", "r-vict"]
      ],
      r3: [
        ["Accident de plongée, notre position GPS, et « venez vite ».", 0, "La position est essentielle, mais sans l’état de la victime ni les gestes faits, les secours ne peuvent pas s’organiser.", "r-alerte"],
        ["L’état de la victime et les gestes faits, ils trouveront le bateau.", 0, "Sans position, les secours perdent un temps précieux en mer.", "r-alerte"],
        ["Qui appelle, où, ce qui s’est passé, l’état de la victime, les gestes.", 1, "Un message court et complet fait gagner du temps aux secours. Les numéros et canaux à utiliser sont à connaître avant la sortie.", "r-alerte"]
      ],
      r4: [
        ["On baisse le débit d’oxygène puisqu’il va mieux.", 0, "Une amélioration ne veut pas dire guérison. On garde le débit élevé jusqu’aux secours.", "r-o2"],
        ["On continue l’oxygène et la surveillance jusqu’aux secours.", 1, "Une amélioration ne veut pas dire guérison. On garde l’oxygène et on transmet aux secours.", "r-o2"],
        ["On enlève le masque quelques minutes, puis on le remet.", 0, "Interrompre l’oxygène fait perdre son bénéfice. On le garde en continu.", "r-o2"]
      ],
      r5: [
        ["Son niveau, son matériel et le nom de son club.", 0, "Ça peut servir, mais le médecin a d’abord besoin de l’heure, des gestes, de l’évolution et des paramètres de plongée.", "r-vict"],
        ["L’heure de l’alerte, ce qu’il a dit et son état actuel.", 0, "Il manque les gestes faits et les paramètres de plongée (ordinateur), essentiels pour le traitement.", "r-vict"],
        ["L’heure, les gestes faits, l’évolution et ses paramètres de plongée.", 1, "Les paramètres de plongée et l’historique aident le médecin à choisir le traitement.", "r-vict"]
      ]
    },
    bapteme: {
      b1: [
        ["Les signes de base, les oreilles, le gilet et le palier, pour être prête.", 0, "Trop d’informations augmente le stress. Le gilet et la profondeur, c’est toi qui les gères.", "e2-peda"],
        ["Trois signes, respirer calmement, et je m’occupe du reste.", 1, "Un baptême, c’est peu d’informations, très claires. Le plaisir et la confiance passent avant tout.", "e2-com"],
        ["Pourquoi la pression monte et pourquoi il faut équilibrer.", 0, "Expliquer la physique rassure rarement un débutant stressé. On garde la théorie pour plus tard.", "e2-peda"]
      ],
      b2: [
        ["On descend doucement, voir les poissons va la détendre.", 0, "Descendre avec un stress non réglé, c’est risquer la panique.", "e2-secu"],
        ["Je la tiens, je lui montre de souffler lentement, on attend.", 1, "On stabilise, on rassure, on ralentit la respiration. Si ça ne passe pas, on remonte sans en faire un échec.", "e2-secu"],
        ["On remonte tout de suite et on arrête le baptême.", 0, "Ce n’est pas forcément fini : on stabilise d’abord, on rassure, et on remonte seulement si ça ne passe pas.", "e2-secu"]
      ],
      b3: [
        ["On remonte un peu, je lui montre le geste, on reprend doucement.", 1, "Même réflexe que pour toi, mais c’est toi qui guides et qui contrôles la profondeur.", "e2-seance"],
        ["Je lui montre de pincer le nez et souffler, sans changer de profondeur.", 0, "À cette profondeur l’écart est déjà là : on remonte un peu pour que l’équilibrage passe en douceur.", "accidents"],
        ["Je continue doucement, en lui faisant signe d’avaler.", 0, "On ne force jamais une oreille, encore moins chez un débutant : on remonte un peu.", "accidents"]
      ],
      b4: [
        ["Ce qu’elle a réussi, puis les deux erreurs à corriger la prochaine fois.", 0, "Pour un baptême, l’objectif est le plaisir et la sécurité, pas la correction. On garde les erreurs pour la formation.", "e2-peda"],
        ["On remplit sa fiche de baptême et on fixe la date du niveau 1.", 0, "Ça viendra peut-être, mais d’abord un vrai débriefing : ce qu’elle a ressenti, réussi, vu.", "e2-com"],
        ["Débriefing positif : ce qu’elle a réussi, vu, et l’envie de revenir.", 1, "Le débriefing ancre le souvenir. On valorise, on donne envie de continuer.", "e2-com"]
      ]
    }
  };
  Object.keys(P).forEach(sid => {
    const s = C.storyById[sid]; if (!s) return;
    Object.keys(P[sid]).forEach(nid => {
      const n = s.nodes[nid]; if (!n || !n.choices) return;
      const good = n.choices.find(c => c.ok); if (!good) return;
      n.choices = P[sid][nid].map(([t, ok, e, m]) => (ok ? { t, ok: 1, e, m, go: good.go } : { t, ok: 0, e, m }));
    });
  });

  /* Scénarios d'accident (Labo) : [texte, bon, explication], bonne réponse à une place variable. */
  const SC = {
    s1: [
      [["Une tendinite réveillée par le port du bloc", 0, "Une douleur de tendon ne donne pas de fourmillements. Signes neurologiques après plongée = ADD jusqu’à preuve du contraire."], ["Il a eu froid et la circulation revient", 0, "Le froid peut aggraver, mais des fourmillements localisés avec grande fatigue évoquent un ADD."], ["Suspicion d’accident de désaturation", 1, "Oui : même paliers respectés, un ADD reste possible."]],
      [["Tu l’allonges et lances l’oxygène à haut débit", 1, "L’O₂ est le geste numéro un."], ["Tu le fais boire beaucoup et tu le surveilles", 0, "Boire de l’eau plate aide, mais l’oxygène passe d’abord."], ["Tu l’assois au chaud et lui donnes de l’aspirine", 0, "L’aspirine n’est pas un geste du secourisme plongée : oxygène et alerte d’abord."]],
      [["Tu préviens le DP, qui décidera s’il faut appeler", 0, "Le DP doit être prévenu, mais l’alerte des secours ne doit pas attendre : VHF 16 ou 196."], ["Tu appelles le 15 depuis ton téléphone", 0, "À terre c’est le bon numéro. En mer, on passe par le CROSS (VHF 16 ou 196) qui coordonne l’évacuation."], ["Tu alertes : VHF canal 16 ou 196", 1, "Le CROSS organise l’évacuation vers un caisson."]],
      [["Oxygène jusqu’à ce qu’il aille mieux, puis repos à l’ombre", 0, "On maintient l’O₂ jusqu’à la prise en charge, même s’il va mieux."], ["Eau plate, couverture, surveillance, heure et paramètres notés", 1, "Ces infos seront précieuses pour le médecin."], ["Tu le fais marcher un peu pour relancer la circulation", 0, "Pas d’effort : il favorise les bulles."]]
    ],
    s2: [
      [["Tu lui montres la surface et la suis en expirant", 0, "Une remontée sans air depuis 18 m est très dangereuse : ton octopus est là."], ["Tu lui donnes ton octopus et tu la tiens", 1, "Air d’abord, et contact pour éviter qu’elle s’échappe."], ["Tu lui donnes ton octopus et tu lui montres son mano", 0, "Le contact (la tenir) passe avant : un plongeur sans air peut paniquer et partir vers la surface."]],
      [["Remontée contrôlée ensemble, en vous tenant", 1, "Tu gères la flottabilité pour deux, vitesse lente."], ["Vous rejoignez le guide pour qu’il gère la remontée", 0, "Pas de détour : tu respires pour deux, la remontée commence maintenant."], ["Vous finissez le parcours à 10 m, puis vous remontez", 0, "Une panne d’air met fin à la plongée : on remonte."]],
      [["Tu gonfles un peu ton gilet pour suivre son rythme", 0, "Ça accélère encore plus : on purge, on ne gonfle pas."], ["Tu purges et freines, palmes en opposition si besoin", 1, "Mariotte : plus vous montez, plus vous accélérez. On purge tôt."], ["Tu la laisses filer et tu continues à ton rythme", 0, "Elle respire sur ton octopus : vous restez ensemble."]],
      [["Gonfler les gilets, signaler, rendre compte au DP, surveiller", 1, "Puis on cherche la cause : manomètre pas consulté ?"], ["Gonfler les gilets et rentrer au bateau sans en parler", 0, "Il faut rendre compte et surveiller l’apparition de signes."], ["Gonfler les gilets, puis vérifier son mano pour comprendre", 0, "Comprendre viendra après : d’abord signaler au bateau et prévenir le DP."]]
    ],
    s3: [
      [["Une narcose qui lui fait perdre ses moyens", 0, "À 25 m, la narcose est possible, mais respiration rapide et sensation de manquer d’air après un effort évoquent l’essoufflement."], ["Un essoufflement", 1, "Effort + profondeur + détendeur sollicité : le CO₂ s’accumule."], ["Un détendeur en panne", 0, "Le détendeur donne de l’air : c’est l’effort qui fait monter le CO₂."]],
      [["Palmer fort pour sortir du courant rapidement", 0, "Plus d’effort = plus de CO₂."], ["Lui donner ton octopus pour qu’il ait plus d’air", 0, "Il a de l’air : le problème est le CO₂. Il faut arrêter l’effort et expirer."], ["Stopper l’effort, s’abriter, l’aider à expirer longuement", 1, "Casser le cercle vicieux du CO₂."]],
      [["Remonter de quelques mètres ensemble, en contrôlant", 1, "La pression baisse, la respiration devient plus facile."], ["Rester sur place jusqu’à ce que ça passe", 0, "S’il ne récupère pas, on remonte un peu : l’air moins dense se respire mieux."], ["Remonter directement en surface au plus vite", 0, "Une remontée rapide ajoute un risque d’accident. Quelques mètres suffisent souvent."]]
    ],
    s4: [
      [["Un accident de décompression", 0, "Après une remontée rapide glotte fermée, la douleur thoracique évoque d’abord une surpression pulmonaire."], ["Un essoufflement qui dure", 0, "La douleur thoracique après une remontée rapide est un signe d’alerte, pas un simple essoufflement."], ["Une surpression pulmonaire", 1, "Remontée glotte fermée : l’air dilaté lèse les poumons."]],
      [["Le sortir de l’eau, oxygène, alerte", 1, "Urgence vitale."], ["Le sortir de l’eau, le faire tousser, surveiller", 0, "C’est une urgence vitale : oxygène et alerte sans attendre."], ["Le sortir de l’eau, l’allonger, appeler son médecin", 0, "On alerte les secours (CROSS ou 15), pas son médecin traitant, et on donne l’oxygène."]],
      [["Faire les exercices plus profond, loin de la surface", 0, "Plus profond ne règle rien : c’est à la remontée que le risque existe."], ["Expiration à la remontée, surveillance de près vers la surface", 1, "La zone 0 à 10 m est la plus risquée pour les poumons."], ["Limiter la vitesse de remontée à 6 m/min", 0, "La vitesse compte pour l’ADD, mais la surpression vient d’abord d’une expiration bloquée."]]
    ]
  };
  Object.keys(SC).forEach(id => { const s = C.scenById[id]; if (!s) return; SC[id].forEach((c, i) => { if (s.steps[i]) s.steps[i].c = c; }); });

  /* Briefing simulé : distracteurs crédibles. */
  const B = C.brief;
  if (B) {
    if (B.wrong) B.wrong = [
      { t: "Laisser chacun choisir sa profondeur maxi", w: "Les paramètres sont communs : fixés par le DP, et limités par le plongeur le moins qualifié." },
      { t: "Dire qu’on improvisera l’itinéraire en bas", w: "L’itinéraire et le demi-tour se décident avant : sous l’eau on communique mal." },
      { t: "Le détail de la faune qu’on va sûrement voir", w: "On peut en dire un mot, mais promettre un animal pousse certains à partir le chercher seuls." },
      { t: "La pression de réserve de chacun selon son bloc", w: "La réserve est la même pour toute la palanquée, pas propre à chaque bloc." },
      { t: "Laisser l’ordinateur de chacun gérer la remontée", w: "La palanquée remonte ensemble, en suivant l’ordinateur le plus pénalisant." },
      { t: "Le réglage de l’ordinateur de chacun", w: "Utile à vérifier avant, mais pas le cœur du briefing : on parle déroulement et sécurité." }
    ];
    if (B.lost) B.lost.c = ["Recherche 1 min, puis remontée normale et rendez-vous en surface", "Recherche 3 min au fond, puis on remonte chacun de son côté", "On remonte au palier et on attend la palanquée là", "On attend au fond, sur place, que le guide revienne"];
    const CO = {
      courant: ["Au bout de mouillage, début de plongée face au courant", "Au bout de mouillage, début de plongée dos au courant", "En pleine eau, groupés, puis face au courant au fond", "Au bout de mouillage, puis on suit le courant tout du long"],
      visi: ["On se rapproche, contact visuel permanent, binômes définis", "On garde les distances habituelles, chacun suit le guide", "On remonte de quelques mètres pour avoir plus de lumière", "On se tient tous par la main pendant toute la plongée"],
      froid: ["Le signe « j’ai froid », et on écourte si quelqu’un le fait", "Le signe « j’ai froid », et on palme plus pour se réchauffer", "On garde la durée prévue, mais on fait un palier plus long", "On reste moins profond, la durée prévue ne change pas"],
      calme: ["De rester groupés : on a tendance à s’écarter", "Qu’on peut allonger un peu la durée prévue", "Qu’on peut descendre un peu plus que prévu", "Que chaque binôme peut choisir son itinéraire"]
    };
    (B.conds || []).forEach(c => { if (CO[c.id] && c.c && c.c.length === CO[c.id].length) c.c = CO[c.id]; });
    if (B.who) B.who.c = ["Le directeur de plongée, selon les prérogatives", "Le guide, selon le niveau de chacun", "Le plus qualifié de la palanquée", "Le DP pour la profondeur, le guide pour la durée"];
  }
})();
