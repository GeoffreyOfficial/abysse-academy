/* =====================================================================
   Abysse Academy · contenu FR · Audit des cours (1.6)
   Après l'audit de tous les thèmes : chaque cours reçoit une partie
   « Approfondir » avec un exemple concret et un piège, chaque thème a
   ses flashcards, et les explications trop courtes du quiz disent
   maintenant le POURQUOI. Les questions ne sont jamais réordonnées.
   Tout ce qui touche aux règles reste « à faire valider par ton moniteur ».
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  const X = (id, html) => C.extend(id, { approfondir: html });

  /* ---------- Découverte ---------- */
  X("d-bapteme", `<h3>Ce que tu vas ressentir</h3><p>Les premières respirations sur le détendeur surprennent : l’air est sec, un peu frais, et il faut <b>souffler</b> autant qu’on inspire. Au bout d’une minute, le rythme vient tout seul. Le bruit des bulles, c’est toi qui respires : bon signe.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Léa sent une petite gêne dans l’oreille à 2 m. Elle fait le signe « ça ne va pas », montre son oreille. Le moniteur la remonte d’un mètre, elle souffle doucement nez pincé : « pop », la gêne disparaît, la balade continue.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Retenir sa respiration pour « économiser l’air ». C’est l’inverse : on respire lentement et complètement, sans jamais bloquer.</div>`);
  X("d-materiel", `<h3>Comment le matériel travaille ensemble</h3><p>La bouteille contient l’air à environ 200 bar : bien trop fort pour tes poumons. Le <b>détendeur</b> fait le travail en deux temps : un premier étage sur la bouteille abaisse la pression, le deuxième étage (dans ta bouche) te donne l’air à la pression de l’eau qui t’entoure, seulement quand tu inspires.</p>
    <p>Le <b>gilet</b> et le <b>lest</b> se répondent : le lest t’aide à descendre, le gilet compense en profondeur quand la combinaison s’écrase.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Un bloc de 12 L gonflé à 200 bar contient environ 12 × 200 = 2 400 litres d’air détendu. En surface, tu respires environ 20 L par minute : de quoi tenir longtemps… mais en profondeur, chaque respiration en prend davantage.</div>
    <div class="callout check"><span class="eyebrow">À vérifier avant de plonger</span>Masque étanche, bouteille ouverte, manomètre plein, détendeur qui respire bien, gilet qui gonfle et se vide.</div>`);
  X("d-oreilles", `<figure data-diagram="ear"></figure><h3>Pourquoi l’oreille a mal</h3><p>Derrière le tympan, il y a une petite cavité pleine d’air. En descendant, l’eau pousse sur le tympan de l’extérieur. Si l’air derrière ne suit pas, le tympan se creuse : c’est la douleur. En soufflant doucement nez pincé, tu envoies de l’air par la <b>trompe d’Eustache</b> : la pression s’équilibre des deux côtés.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Entre la surface et 3 m, la pression passe de 1 à 1,3 bar : +30 %. C’est près de la surface que la variation est la plus forte, d’où l’intérêt d’équilibrer dès le premier mètre.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Forcer très fort quand ça bloque. On remonte un peu, on recommence doucement. Une oreille forcée peut se blesser.</div>`);

  /* ---------- Niveau 1 ---------- */
  X("n1-signes", `<h3>Bien signer</h3><p>Un signe se fait <b>lentement</b>, <b>devant le masque</b> de l’autre, et on attend la réponse. La nuit ou en eau trouble, on éclaire sa main avec la lampe. Si l’autre ne répond pas, on se rapproche et on recommence : un signe sans réponse n’a pas été compris.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Ton guide te fait « OK ? ». Tu as froid. Tu ne réponds pas « OK » pour faire plaisir : tu fais « ça ne va pas », puis tu croises les bras en frissonnant. Il décide d’écourter. C’est exactement ce qu’il fallait faire.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Confondre « pouce vers le haut » et « ça va ». Sous l’eau, le pouce levé veut dire « on remonte ».</div>
    <p class="small muted">Les signes peuvent varier légèrement d’un club à l’autre : on les revoit toujours au briefing.</p>`);
  X("n1-physique", `<h3>La pression, partout dans ta plongée</h3><p>Une seule règle (+1 bar tous les 10 m) explique tout ce que tu fais sous l’eau. L’air se comprime en descendant (masque qui serre, oreilles, gilet qui se dégonfle) et se dilate en remontant (gilet qui gonfle tout seul, air des poumons).</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Ton gilet contient 2 L d’air à 20 m (3 bar). En remontant à 10 m (2 bar), ce volume devient 2 × 3 ÷ 2 = 3 L, et 6 L en surface. Sans purger, tu accélères tout seul vers la surface : c’est pour ça qu’on purge pendant la remontée.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Penser que c’est au fond que tout change le plus. C’est près de la surface que la pression varie le plus en proportion : 0 à 10 m, elle double.</div>`);
  X("n1-accidents", `<h3>Prévenir vaut mieux que guérir</h3><p>Presque tous les petits soucis du N1 ont une cause simple : la pression non équilibrée (oreilles, sinus, masque), l’effort (essoufflement) ou le froid. On les prévient avant de plonger : bonne forme, pas de rhume, bonne combinaison, rythme calme.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Tom palme fort contre le courant et sent qu’il n’arrive plus à « avoir assez d’air ». Il s’arrête, s’accroche à un rocher, souffle longuement trois fois, fait le signe « essoufflé ». Le guide attend avec lui que tout redevienne calme.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Garder un souci pour soi en espérant qu’il passe. Un petit souci signalé tôt reste petit.</div>`);
  X("n1-secu", `<h3>La panne d’air, pas à pas</h3><p>Elle se prévient : on regarde son manomètre souvent, et on annonce sa pression au guide. Si elle arrive quand même, on reste calme : on a encore un peu d’air dans les poumons pour faire le signe.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>À 15 m, l’air de Sam devient dur à aspirer. Il fait le signe « plus d’air » au guide. Le guide lui présente son détendeur de secours, Sam le prend, purge, respire, puis ils remontent ensemble en se tenant, lentement, sans lâcher la palanquée.</div>
    <div class="callout check"><span class="eyebrow">Réflexes à retenir</span>Manomètre souvent · rester groupés · remonter lentement · jamais bloquer sa respiration en remontant · palier de sécurité si le guide le demande.</div>`);
  X("n1-milieu", `<h3>Plonger sans laisser de trace</h3><p>La meilleure protection du milieu, c’est une bonne <b>stabilisation</b> : un plongeur bien lesté, qui ne touche pas le fond, n’abîme rien. On se tient à distance des parois, on regarde où vont ses palmes, on ne poursuit pas les animaux.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Tu vois un poulpe dans un trou. Tu te poses au-dessus du sable à un mètre, sans bouger. Au bout d’une minute, il sort un bras, puis deux : la patience montre bien plus que la poursuite.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Prendre une posidonie pour une algue : c’est une plante à fleurs protégée, qui abrite toute une vie. On ne l’arrache pas et on n’y jette pas l’ancre.</div>`);

  /* ---------- RIFAP ---------- */
  X("r-alerte", `<div class="callout ex"><span class="eyebrow">Exemple de message</span>« Ici le bateau <i>Mistral</i>, club des Calanques, je rappelle au 06… Nous sommes à la pointe Est de l’île, position GPS 43° 12’ N, 5° 20’ E. Accident de plongée, une victime, consciente, douleur à l’épaule et fourmillements depuis 10 h 40. Elle est sous oxygène depuis 10 h 45. »</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Raccrocher trop vite. C’est le secours qui termine l’appel : il peut avoir besoin d’une précision.</div>`);
  X("r-vict", `<div class="callout ex"><span class="eyebrow">Exemple</span>Un plongeur est sorti de l’eau, il ne répond pas. Tu bascules sa tête en arrière, menton levé, et tu regardes, écoutes, sens pendant 10 secondes : il respire. Tu le mets en PLS, sous oxygène, et tu fais alerter. Toutes les minutes, tu vérifies qu’il respire toujours.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Prendre des « gasps » (respirations rares et bruyantes) pour une respiration normale. Dans le doute, on considère qu’elle ne respire pas et on réanime.</div>`);
  X("r-cas", `<h3>Trois réflexes communs à tous les cas</h3><p>Quel que soit l’accident, on retrouve le même fil : protéger, examiner, alerter, oxygéner, surveiller. Ce qui change, c’est l’ordre de priorité. Une victime qui ne respire pas passe avant tout le reste ; une douleur après plongée se traite comme un ADD jusqu’à preuve du contraire.</p>
    <div class="callout ex"><span class="eyebrow">Cas 4 · à toi</span>Une heure après la plongée, Paul dit qu’il a « la jambe engourdie ». Il pense à une mauvaise position. Ton réflexe : penser ADD neurologique, l’allonger, oxygène 15 L/min, eau plate s’il n’a pas de nausée, alerte avec ses paramètres, et noter l’heure exacte des premiers signes.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Attendre « pour voir si ça passe ». L’oxygène se donne au moindre doute, le plus tôt possible.</div>`);

  /* ---------- Initiateur (E1) ---------- */
  X("e2-role", `<div class="callout ex"><span class="eyebrow">Exemple</span>Un samedi en piscine, l’initiateur accueille deux enfants pour un baptême, vérifie avec le moniteur responsable qu’il a bien les bons blocs, fait son briefing en trois points, puis rend compte en fin de séance : « Tous deux à l’aise, Inès a eu un peu mal à l’oreille, on a remonté et ça s’est réglé. »</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Agir seul hors de ses prérogatives (profondeur, public) pour « rendre service ». L’initiateur agit toujours dans le cadre fixé par le moniteur.</div>`);
  X("e2-peda", `<div class="callout ex"><span class="eyebrow">Exemple de retour</span>« Ton vidage de masque était calme, bravo. Cette fois, regarde vers le haut en soufflant. » Un point positif, une seule correction, une consigne courte avec un verbe d’action.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Montrer ce qu’il ne faut pas faire. L’élève retient l’image : on montre toujours le bon geste.</div>`);
  X("e2-seance", `<h3>Préparer le plan B</h3><p>Une bonne séance prévoit toujours un <b>exercice plus simple</b> (si l’élève bloque) et un <b>exercice plus difficile</b> (si tout va vite). On garde du temps pour le retour au calme et le débriefing.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Objectif : lâcher et reprendre le détendeur à 3 m. Plan B : le faire d’abord à genoux à 1 m. Plan C : enchaîner avec le passage sur le détendeur de secours. Fin : balade de 5 minutes, puis débriefing à terre.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Enchaîner les exercices sans débriefing. Sans retour, l’élève ne sait pas ce qu’il a réussi.</div>`);
  X("e2-secu", `<h3>Le baptême, en sécurité</h3><p>Pendant un baptême, l’initiateur fait tout pour l’autre : il tient la personne, gère son gilet, sa profondeur, son air, et surveille son visage. Le baptisé n’a qu’à respirer et regarder.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>À 3 m, le baptisé respire vite et ses yeux s’agrandissent. Tu t’arrêtes, tu le tiens face à toi, tu fais le signe « on souffle » en expirant lentement toi-même. Sa respiration se calme : vous continuez, plus près de la surface.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Descendre plus profond « parce que ça se passe bien ». Le baptême reste dans l’espace prévu, en général jusqu’à 6 m.</div>`);
  X("e2-com", `<h3>Motiver</h3><p>Un élève revient s’il a <b>réussi quelque chose</b> et s’il l’a su. On fixe des étapes courtes, on souligne chaque progrès précis, et on termine sur une réussite.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Au lieu de « C’était bien », dis : « Aujourd’hui tu as vidé ton masque trois fois sans remonter : la semaine dernière, tu n’y arrivais pas. » L’élève sait exactement ce qu’il a gagné.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Croire qu’un « oui » veut dire « j’ai compris ». Fais reformuler ou montrer.</div>`);
  X("e1-piscine", `<h3>Pourquoi cet ordre ?</h3><p>On construit sur ce qui est acquis : d’abord respirer calmement (sinon rien d’autre ne marche), ensuite gérer ce qui peut faire peur (masque, détendeur), puis se déplacer, puis descendre. La stabilisation vient quand l’élève est détendu.</p>
    <div class="callout ex"><span class="eyebrow">Exemple de séance</span>20 min : respiration à genoux, vidage partiel puis total, jeu du « relais du lest ». Débriefing : « Qu’est-ce qui a été le plus facile ? Le plus difficile ? » Noter sur la fiche de progression.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Les apnées répétées en fin de séance, quand l’élève est fatigué : on les évite.</div>`);

  /* ---------- Niveau 3 ---------- */
  X("n3-autonomie", `<div class="callout ex"><span class="eyebrow">Exemple de planification</span>Bloc 15 L à 200 bar, plongée prévue à 40 m, conso 20 L/min. On fixe : demi-tour à 130 bar, début de remontée au plus tard à 70 bar, réserve 50 bar en surface. Chacun de la palanquée annonce ses pressions : c’est le premier qui atteint un repère qui déclenche l’étape.</div>`);
  X("n3-accidents", `<h3>Les facteurs qu’on peut maîtriser</h3><p>On ne choisit pas son âge, mais on choisit de bien dormir, de boire de l’eau, de ne pas faire d’effort violent après la plongée, d’éviter les profils en yo-yo, de respecter la vitesse de remontée et le palier de sécurité, et d’attendre avant de prendre l’avion ou de monter en altitude.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Après deux plongées à 40 m, Marc porte seul les blocs jusqu’au camion. Une heure plus tard, il a mal au coude. L’effort à glotte fermée et la charge en azote sont deux facteurs : on pense ADD et on applique la conduite à tenir (oxygène, eau, alerte).</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Croire qu’un ordinateur qui n’a pas « mis de palier » protège à 100 %. Des ADD arrivent aussi sans faute de procédure.</div>`);
  X("n3-materiel", `<h3>La redondance, dans la pratique</h3><p>Chaque élément vital a son « plan B » : deux détendeurs indépendants, deux moyens de connaître profondeur et temps, une lampe de secours, un outil coupant accessible des deux mains. On s’entraîne à fermer un robinet et à passer sur l’autre détendeur.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>À 45 m en eau froide, le détendeur principal de Nina se met en débit continu (givrage). Elle passe sur son second détendeur, son binôme ferme le robinet du premier, et la palanquée entame une remontée calme.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Un parachute de palier jamais sorti. Il faut s’entraîner à le gonfler sans remonter avec lui.</div>`);
  X("n3-cadre", `<div class="callout ex"><span class="eyebrow">Exemple</span>Trois N3 veulent plonger sur une épave à 52 m. Le DP accepte, fixe 52 m et 20 minutes maximum, vérifie que chacun a un ordinateur et un parachute, et note les heures d’immersion et de sortie sur la fiche de sécurité.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>« Autonome » ne veut pas dire « sans règle » : c’est le DP qui fixe les paramètres, et la palanquée les respecte.</div>`);
  X("n3-physio", `<div class="callout ex"><span class="eyebrow">Exemple</span>À 50 m, Hugo palme vite pour suivre. L’air est dense, il respire court, le CO₂ s’accumule : il s’essouffle, et l’essoufflement aggrave la narcose. La palanquée s’arrête, Hugo expire longuement, puis tout le monde reprend à un rythme lent.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Respirer « petit » pour économiser l’air. C’est le meilleur moyen de garder le CO₂ : l’expiration doit être longue et complète.</div>`);

  /* ---------- Niveau 4 (guide de palanquée) ---------- */
  X("n4-guide", `<div class="callout ex"><span class="eyebrow">Exemple de briefing</span>« On descend le long du tombant jusqu’à 25 m, 35 minutes maximum. Je suis devant, Julie et Marc derrière moi, à portée de main. Vous me donnez votre pression à 100 bar. Demi-tour à 120 bar pour le premier. Palier de 3 minutes à 5 m. Si on se perd : une minute de recherche, puis on remonte. »</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Se placer trop loin devant. Le guide se retourne souvent et adapte sa vitesse au plus lent.</div>`);
  X("n4-air", `<h3>Le calcul du guide</h3><p>Le guide repère le plus gros consommateur dès les premières minutes et raisonne sur <b>lui</b>. Il prévoit l’air de la remontée et du palier, plus une marge pour un partage d’air (deux plongeurs sur un bloc).</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>À 25 m (3,5 bar), Léo consomme 25 L/min en surface : 87,5 L/min, soit environ 7,3 bar par minute dans un 12 L. Pour 5 minutes de retour, il lui faut ≈ 36 bar, plus la remontée, le palier et la marge : le guide fixe le demi-tour bien avant que Léo n’arrive à 100 bar.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Raisonner sur sa propre consommation. Un guide calme consomme souvent moins que ses plongeurs.</div>`);
  X("n4-assistance", `<h3>Pourquoi le contrôle passe avant tout</h3><p>Un plongeur en difficulté peut faire des gestes brusques, lâcher son détendeur ou remonter seul. La première chose est donc de <b>le tenir</b> (gilet ou épaule) et de garder son détendeur en bouche. Ensuite seulement, on remonte, à vitesse lente, en gérant les deux gilets.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>À 20 m, Anne ne répond plus aux signes et fixe le vide (narcose ou essoufflement). Tu la saisis par le gilet face à toi, tu vérifies qu’elle respire sur son détendeur, tu fais signe aux autres de suivre, puis vous remontez de quelques mètres : souvent, tout rentre dans l’ordre.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Oublier le reste de la palanquée pendant l’assistance.</div>`);
  X("n4-orga", `<h3>Le matériel de secours, en pratique</h3><p>Sur le site, le DP s’assure qu’il y a un moyen d’alerter, de l’oxygène en quantité suffisante avec un masque adapté, une trousse de secours, de l’eau, une couverture et de quoi remplir la fiche d’évacuation. Il connaît les numéros et le caisson le plus proche.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Avant le départ du bateau, le DP vérifie la pression de la bouteille d’oxygène : 5 L à 180 bar, soit 900 L. À 15 L/min, cela donne une heure d’oxygène : suffisant pour attendre les secours sur ce site proche du port.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Les valeurs réglementaires (taille des palanquées, profondeurs, matériel) changent parfois : on se réfère aux textes en vigueur et à son moniteur.</div>`);
  X("n4-deco", `<div class="callout ex"><span class="eyebrow">Exemple</span>Fin de plongée à 30 m : le guide remonte la palanquée à 15 m sur le tombant, puis 10 m, puis 5 m, en regardant les ordinateurs de chacun. Celui de Clara demande 4 minutes à 3 m, les autres 1 minute : tout le monde fait 4 minutes ensemble.</div>`);
  X("n4-physio", `<h3>Lire les signes chez les autres</h3><p>Le guide ne sent pas ce que ressentent ses plongeurs : il doit le voir. Un plongeur qui s’arrête souvent, se tient l’oreille, palme vite, ne répond plus aux signes, frissonne ou tient mal sa profondeur est un plongeur qui a un problème.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Après la plongée, Karim est pâle, silencieux, et dit « je suis juste fatigué ». Le guide ne s’en contente pas : il lui pose des questions précises (douleurs ? fourmillements ? vertiges ?) et prévient le DP. Au moindre doute : oxygène.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Croire que le plongeur dira tout seul qu’il va mal. Beaucoup minimisent leurs signes.</div>`);

  /* ---------- E2 ---------- */
  X("e2-enseigner20", `<h3>Pourquoi apprendre d’abord peu profond</h3><p>À 6 m, l’élève a du temps, la remontée est courte et l’air dure longtemps. À 20 m, un geste raté coûte plus cher : plus d’air consommé, narcose possible chez certains, remontée plus longue. On ne descend que lorsque le geste est <b>automatique</b> plus haut.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Objectif : « remonter de 10 m à 3 m à vitesse lente, en gérant son gilet seul ». D’abord de 6 à 3 m, guidé par la main. Puis seul. Puis de 10 à 3 m. On valide quand c’est réussi trois fois, calmement.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Valider après une seule réussite. Une compétence se montre plusieurs fois.</div>`);
  X("e2-securite", `<h3>Contrôler sans étouffer</h3><p>L’enseignant reste <b>à portée de main</b> et regarde les yeux et la respiration de l’élève, mais le laisse faire. Il intervient tôt, calmement, par un contact et un signe, plutôt que tard et dans l’urgence.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Exercice d’échange d’embout à 10 m : avant de commencer, tu vérifies que l’élève a plus de 100 bar, tu te places face à lui en tenant son gilet, et tu gardes ton détendeur de secours prêt.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Les remontées répétées (yo-yo) pendant une séance : elles augmentent le risque d’ADD.</div>`);
  X("e2-evaluer", `<h3>Un bon critère se voit</h3><p>On évalue ce qui est <b>observable</b> : une vitesse, un arrêt, un geste, un signe. « Il est à l’aise » ne se mesure pas ; « il s’arrête à 3 m sans repère et reste stable 30 secondes » se mesure.</p>
    <div class="callout ex"><span class="eyebrow">Exemple de fiche</span>Vidage de masque à 6 m — réussi si : reste stable, ne remonte pas, souffle par le nez en tenant le haut du masque, reprend une respiration calme. Réussi 3 fois sur 3 séances → validé dans le carnet.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Corriger tout à la fois. On choisit la correction la plus importante pour la sécurité.</div>`);

  /* ---------- Nitrox ---------- */
  X("nx-base", `<h3>Pourquoi moins d’azote change tout</h3><p>À une même profondeur, un nitrox 32 % fait respirer 68 % d’azote au lieu de 79 %. Le corps en absorbe moins : à profil égal, on garde plus de marge (ou on peut rester un peu plus longtemps sans palier). En échange, l’oxygène atteint plus vite sa limite : la profondeur maximale baisse.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>À 30 m (4 bar), Pp N₂ à l’air : 4 × 0,79 = 3,16 bar. Au nitrox 32 % : 4 × 0,68 = 2,72 bar. C’est comme si tu respirais de l’air à environ 24 m (profondeur équivalente air).</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Croire que le nitrox supprime la narcose ou permet de plonger plus profond : c’est l’inverse pour la profondeur.</div>`);
  X("nx-securite", `<figure data-diagram="mod"></figure><h3>Lire le schéma</h3><p>Pour chaque mélange, la barre montre jusqu’où on peut descendre sans dépasser la Pp O₂ limite. Plus il y a d’oxygène, plus la barre est courte. Avec une limite de 1,4 bar, on garde plus de marge qu’avec 1,6.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>Plongée prévue à 28 m. Nitrox 36 % : MOD à 1,4 bar ≈ 28,9 m. C’est juste : on préférera un 32 % (MOD ≈ 33 m) pour garder de la marge.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Arrondir la MOD vers le haut. On arrondit toujours vers le bas.</div>`);
  X("nx-pratique", `<h3>Pourquoi tant de vérifications</h3><p>Un bloc nitrox ressemble à un bloc d’air. Si on se trompe de mélange ou de réglage, l’ordinateur calcule faux et la MOD n’est plus la bonne. L’analyse, l’étiquette et le réglage de l’ordinateur sont trois barrières contre la même erreur.</p>
    <div class="callout ex"><span class="eyebrow">Exemple</span>L’analyseur lit 21,0 % à l’air, puis 33,2 % sur ton bloc. Tu notes « 33 % · MOD 32 m (1,4) · date · ton nom », tu règles l’ordinateur sur 33 % et 1,4 bar. La plongée prévue à 30 m passe.</div>
    <div class="callout trap"><span class="eyebrow">Piège</span>Laisser l’ordinateur sur « air » ou sur le mélange de la veille.</div>`);

  /* ---------- Flashcards des thèmes qui n'en avaient pas ---------- */
  const K = (m, list) => list.map(([f, b], i) => ({ id: "x6-" + m + "-" + i, m, f, b }));
  C.addCards([].concat(
    K("d-bapteme", [["Que fait le baptisé pendant la plongée ?", "Il respire calmement et regarde : le moniteur gère tout le reste."], ["Pourquoi ne jamais bloquer sa respiration en remontant ?", "L’air des poumons se dilate : il doit pouvoir sortir."], ["Les 3 signes du baptême ?", "OK · ça ne va pas · on remonte."]]),
    K("d-materiel", [["À quoi sert le détendeur ?", "Donner l’air de la bouteille à la pression de l’eau, quand on inspire."], ["Bloc 12 L à 200 bar : combien d’air ?", "≈ 2 400 L (12 × 200)."], ["Gilet et lest : qui fait quoi ?", "Le lest aide à descendre, le gilet compense en profondeur."]]),
    K("d-oreilles", [["Comment équilibrer ses oreilles ?", "Nez pincé, bouche fermée, souffler doucement : le « pop »."], ["Quand équilibrer ?", "Dès la surface, puis tous les mètres, avant d’avoir mal."], ["Ça bloque : que faire ?", "Remonter un peu, réessayer doucement, prévenir. Ne jamais forcer."]]),
    K("n1-signes", [["Pouce vers le haut sous l’eau ?", "« On remonte » (pas « ça va »)."], ["Main tranchante sur la gorge ?", "« Je n’ai plus d’air »."], ["Un signe sans réponse ?", "On se rapproche et on recommence."]]),
    K("n1-physique", [["Pression absolue à 20 m ?", "3 bar (1 d’air + 2 d’eau)."], ["Un ballon de 1 L en surface, à 10 m ?", "½ L : la pression a doublé."], ["Où la pression varie le plus en proportion ?", "Entre 0 et 10 m : elle double."]]),
    K("n1-accidents", [["Masque qui serre en descendant ?", "Souffler un peu d’air par le nez dans le masque."], ["Essoufflé : que faire ?", "S’arrêter, s’accrocher, expirer longuement, signaler."], ["Enrhumé : on plonge ?", "Non : sinus et oreilles risquent de ne pas s’équilibrer."]]),
    K("n1-secu", [["Prérogative du N1 ?", "Plonger encadré jusqu’à 20 m (PE20), à faire valider."], ["Panne d’air : la réaction ?", "Signe « plus d’air », détendeur de secours, remontée ensemble."], ["Vitesse de remontée ?", "Lente, ≈ 10-15 m/min selon les procédures."]]),
    K("n1-milieu", [["La posidonie est…", "une plante à fleurs protégée (pas une algue)."], ["Meilleure protection du fond ?", "Une bonne stabilisation : ne rien toucher."], ["Rascasse ?", "Épines venimeuses : on regarde sans toucher."]]),
    K("r-role", [["RIFAP, ça veut dire ?", "Réactions et Intervention Face à un Accident de Plongée."], ["La chaîne des secours ?", "Protéger, examiner, alerter, secourir, surveiller."], ["Que complète le RIFAP ?", "Le secourisme général (PSC1), avec ce qui est propre à la plongée."]]),
    K("r-cas", [["Douleur après une plongée ?", "Penser ADD : oxygène, eau, alerte, surveiller."], ["Victime inconsciente qui respire ?", "PLS, oxygène, alerte, surveillance."], ["Quand donner l’oxygène ?", "Au moindre doute, le plus tôt possible."]]),
    K("e2-role", [["Où enseigne l’initiateur (E1) ?", "Piscine, fosse et milieu naturel 0-6 m, sous l’autorité d’un moniteur."], ["Sa posture ?", "Exemplaire, bienveillant et exigeant, responsable."], ["À qui rend-il compte ?", "Au moniteur ou au DP responsable."]]),
    K("e2-com", [["Un bon signe sous l’eau…", "appelle toujours une réponse."], ["Consigne efficace ?", "Courte, avec un verbe d’action : « Expire en remontant »."], ["Vérifier la compréhension ?", "Faire reformuler ou faire montrer."]]),
    K("e1-piscine", [["Premier geste en piscine ?", "Respirer calmement sur le détendeur."], ["Pourquoi des jeux ?", "Travailler les gestes sans stress."], ["À éviter en fin de séance ?", "Les apnées prolongées."]]),
    K("n3-gaz", [["Pp O₂ de l’air à 60 m ?", "7 × 0,21 ≈ 1,47 bar."], ["Pourquoi la narcose augmente en profondeur ?", "La Pp d’azote augmente avec la pression."], ["Pp N₂ de l’air à 30 m ?", "4 × 0,79 ≈ 3,16 bar."]]),
    K("n3-deco", [["Plongées consécutives ?", "Intervalle trop court : on compte une seule plongée."], ["Azote résiduel ?", "L’azote qui reste après une plongée, pris en compte pour la suivante."], ["Remontée trop rapide ?", "Suivre la procédure prévue (paliers majorés si possible) et surveiller."]]),
    K("n3-autonomie", [["Conso à 40 m pour 20 L/min en surface ?", "20 × 5 = 100 L/min."], ["Les 3 pressions à fixer avant ?", "Demi-tour, début de remontée, réserve."], ["Incident à 50 m : l’ordre ?", "Respirer, se stabiliser, réfléchir, agir."]]),
    K("n3-accidents", [["ADD : origine ?", "Des bulles d’azote formées quand on désature trop vite."], ["Signe d’ADD neurologique ?", "Fourmillements, faiblesse d’un membre, troubles de la vue ou de la parole."], ["Conduite à tenir ?", "Oxygène, eau plate, alerte, surveillance, fiche d’évacuation."]]),
    K("n3-materiel", [["La redondance, c’est…", "avoir un plan B pour chaque élément vital."], ["Détendeur qui givre ?", "Passer sur l’autre détendeur, fermer le robinet du premier."], ["À quoi sert le parachute de palier ?", "Se signaler et tenir un palier en pleine eau."]]),
    K("n3-cadre", [["Le N3 est autonome jusqu’à…", "60 m (PA60), sous l’autorité d’un DP."], ["Qui fixe les paramètres ?", "Le directeur de plongée."], ["Matériel exigé en autonomie ?", "De quoi connaître sa profondeur et son temps, et de quoi se signaler (à faire valider)."]]),
    K("n3-physio", [["Pourquoi respirer est plus dur en profondeur ?", "L’air est plus dense."], ["Bonne ventilation ?", "Expiration longue et complète, inspiration calme."], ["Effort et froid…", "modifient la circulation et donc l’azote."]]),
    K("n4-guide", [["Le guide règle le rythme sur…", "le plongeur le plus faible."], ["Les 3 temps du guide ?", "Avant (briefing), pendant (surveiller), après (débrief)."], ["Qui fixe le cadre du guide ?", "Le directeur de plongée."]]),
    K("n4-air", [["Qui fixe le demi-tour ?", "Le plus gros consommateur."], ["Partage d’air : conséquence ?", "Deux plongeurs sur un bloc : la conso double."], ["Conso 25 L/min à 30 m ?", "25 × 4 = 100 L/min."]]),
    K("n4-assistance", [["Première action d’une assistance ?", "Contrôler le plongeur et sa respiration."], ["En surface ?", "Flottabilité positive, signe de détresse, tracter."], ["Ne pas oublier…", "le reste de la palanquée."]]),
    K("n4-orga", [["Rôle du DP ?", "Organiser, composer les palanquées, fixer les paramètres, déclencher les secours."], ["Matériel de secours sur site ?", "Alerte, oxygène, trousse, eau, fiche d’évacuation."], ["Où trouver les règles ?", "Code du sport et fédération : textes en vigueur."]]),
    K("n4-deco", [["Paliers différents dans la palanquée ?", "On suit l’ordinateur le plus pénalisant, tous ensemble."], ["Profil conseillé ?", "Du plus profond vers le moins profond."], ["Pourquoi éviter le yo-yo ?", "Les montées et descentes répétées favorisent les bulles."]]),
    K("n4-physio", [["Quand surveiller un ADD ?", "Après la sortie, pendant les minutes et heures qui suivent."], ["Narcose chez un plongeur ?", "Comportement inhabituel, ne répond plus aux signes."], ["Hypothermie ?", "Frissons, gestes maladroits : on écourte."]]),
    K("e2-enseigner20", [["L’E2 enseigne jusqu’à…", "20 m, sous l’autorité d’un moniteur (à faire valider)."], ["Quand descendre plus profond ?", "Quand le geste est automatique plus haut."], ["Une compétence est acquise quand…", "elle est réussie calmement, plusieurs fois."]]),
    K("e2-securite", [["Signes de stress ?", "Regard fixe, respiration rapide, gestes désordonnés."], ["Où se place l’enseignant ?", "À portée de main, face à l’élève."], ["Élève qui a froid ?", "On écourte la séance."]]),
    K("e2-evaluer", [["Un bon critère est…", "observable."], ["Combien de corrections à la fois ?", "Une, la plus importante pour la sécurité."], ["Quand débriefer ?", "Juste après la séance, au calme."]]),
    K("nx-base", [["MOD : formule ?", "(Pp O₂ max ÷ %O₂ − 1) × 10."], ["MOD du nitrox 32 % à 1,4 bar ?", "≈ 33 m."], ["Intérêt du nitrox ?", "Moins d’azote : plus de marge à profil égal."]]),
    K("nx-securite", [["Meilleur mélange pour 30 m à 1,4 bar ?", "1,4 ÷ 4 = 35 % au maximum."], ["Dépasser la MOD expose à…", "la toxicité de l’oxygène (convulsions)."], ["On arrondit la MOD…", "vers le bas."]]),
    K("nx-pratique", [["Avant d’analyser son bloc ?", "Calibrer l’analyseur à l’air (21 %)."], ["Sur l’étiquette ?", "% d’O₂, MOD, date, nom."], ["Ordinateur réglé sur air au nitrox ?", "Il ne surveille pas la Pp O₂ : on le règle sur le bon mélange."]])
  ));

  /* ---------- Explications qui disent le pourquoi ---------- */
  const fix = (qid, patch) => { const k = qid.lastIndexOf("-"), m = C.byId[qid.slice(0, k)], q = m && m.quiz[+qid.slice(k + 1)]; if (q) Object.assign(q, typeof patch === "string" ? { e: patch } : patch); };
  const E = {
    "n1-physique-0": "1 bar d’air au-dessus de la surface + 1 bar pour 10 m d’eau = 2 bar. C’est pour ça qu’à 10 m tout volume d’air est déjà divisé par deux.",
    "pression-0": "P abs = 1 bar (atmosphère) + 30 ÷ 10 = 3 bar d’eau, soit 4 bar. On n’oublie jamais le 1 bar de l’air : le manomètre de profondeur, lui, ne le compte pas.",
    "pression-5": "On retire d’abord l’atmosphère : 3,5 − 1 = 2,5 bar d’eau. Chaque bar d’eau vaut 10 m : 2,5 × 10 = 25 m.",
    "mariotte-0": "P × V reste constant. À 20 m, P = 3 bar : 3 × 6 = 18. En surface (1 bar), V = 18 L. Le volume triple : c’est pourquoi on ne remonte jamais en bloquant sa respiration.",
    "mariotte-2": "On respire le même volume dans les poumons, mais l’air y est 4 fois plus comprimé à 30 m (4 bar) : 20 × 4 = 80 L/min tirés du bloc.",
    "dalton-0": "Pp = P abs × proportion. À 40 m, P abs = 5 bar ; l’oxygène fait 21 % de l’air : 5 × 0,21 = 1,05 bar.",
    "dalton-1": "On cherche la pression où 21 % font 1,6 bar : 1,6 ÷ 0,21 ≈ 7,6 bar absolus, soit 6,6 bar d’eau → ≈ 66 m. Au-delà, l’oxygène de l’air devient toxique.",
    "dalton-8": "Pp = P abs × proportion : si on descend (P abs ↑) ou si le mélange est plus riche (proportion ↑), la pression partielle augmente.",
    "deco-9": "Temps = distance ÷ vitesse : 3 m ÷ 6 m/min = 0,5 min = 30 s. Cette dernière remontée est lente car c’est là que les bulles grossissent le plus vite.",
    "regles-11": "Le directeur de plongée (DP) connaît le site, les niveaux et les conditions : c’est lui qui compose les palanquées et fixe profondeur et durée maximales.",
    "pa20-1": "Une palanquée autonome compte au plus 3 plongeurs (à faire valider) : au-delà, on se surveille mal et on se perd plus facilement.",
    "environnement-13": "La lumière change de direction en passant de l’eau au verre puis à l’air du masque : tout paraît environ 4/3 plus gros et plus proche qu’en réalité.",
    "r-alerte-2": "Qui, où, quoi, état, gestes faits : avec un message complet, le secours peut envoyer les bons moyens sans rappeler pour demander.",
    "r-alerte-3": "Profondeur, durée, paliers, heure des signes : ces informations permettent au médecin et au caisson de choisir le bon traitement.",
    "r-o2-2": "Volume d’O₂ = 5 × 200 = 1 000 L. À 15 L/min, 1 000 ÷ 15 ≈ 66 min. Si l’évacuation est plus longue, il faut une autre bouteille.",
    "r-o2-6": "Volume d’O₂ = 5 × 150 = 750 L. À 15 L/min : 750 ÷ 15 = 50 min. Une bouteille pas pleine dure moins longtemps : on vérifie sa pression avant la sortie.",
    "r-vict-1": "Sans respiration, le cerveau manque d’oxygène en quelques minutes : alerte, compressions, insufflations et défibrillateur dès que possible.",
    "r-vict-6": "La PLS met la victime sur le côté : la langue ne bloque pas la gorge et un vomissement s’écoule dehors au lieu d’aller dans les poumons.",
    "r-vict-7": "Une dizaine de secondes suffit pour voir si la poitrine se soulève normalement. Plus long, on perd du temps si elle ne respire pas.",
    "e2-peda-3": "On construit sur ce qui est acquis : d’abord un geste simple et immobile, ensuite en mouvement, puis enchaîné avec d’autres.",
    "e2-secu-2": "Ce sont les signes d’un stress qui monte. En réagissant tôt (contact, calme, expiration), on évite qu’il devienne de la panique.",
    "e2-secu-5": "Remonter d’un mètre diminue la pression sur le tympan ; on réessaie doucement. Forcer peut blesser l’oreille.",
    "n3-gaz-6": "À 60 m, P abs = 7 bar ; 7 × 0,21 ≈ 1,47 bar. On approche de la limite de 1,6 bar : c’est une des raisons pour lesquelles l’air s’arrête à 60 m en loisir.",
    "n3-gaz-9": "P abs à 35 m = 1 + 3,5 = 4,5 bar ; 4,5 × 0,21 ≈ 0,95 bar.",
    "n3-gaz-14": "P abs à 25 m = 3,5 bar ; l’azote fait 79 % : 3,5 × 0,79 ≈ 2,77 bar. C’est cette Pp d’azote qui explique la narcose.",
    "n3-autonomie-8": "En profondeur, l’affolement consomme beaucoup d’air et pousse à l’erreur. Respirer et se stabiliser d’abord donne le temps de réfléchir.",
    "n4-air-2": "20 L/min en surface × 4 bar à 30 m = 80 L/min. Dans un bloc de 12 L, 80 ÷ 12 ≈ 6,7 bar par minute.",
    "n4-air-7": "20 L/min × 3 bar (20 m) × 10 min = 600 L. Dans un 12 L : 600 ÷ 12 = 50 bar, à garder en plus de la remontée et du palier.",
    "n4-orga-5": "Le guide conduit la palanquée dans le cadre fixé par le DP (profondeur, durée) : il ne peut pas le dépasser de lui-même.",
    "e2-enseigner20-8": "Une réussite isolée peut être de la chance. Réussi plusieurs fois et calmement, le geste est vraiment acquis.",
    "e2-securite-7": "Monter et redescendre plusieurs fois (yo-yo) favorise la formation de bulles : on organise les exercices pour l’éviter.",
    "e2-securite-8": "Le froid fatigue, ralentit les gestes et favorise l’ADD : mieux vaut une séance courte qu’un incident.",
    "nx-base-1": "MOD : 1,6 ÷ 0,32 = 5 bar absolus, soit 4 bar d’eau → 40 m. Au-delà, la Pp O₂ dépasserait 1,6 bar.",
    "nx-base-7": "Arrondir vers le bas garde la Pp O₂ sous la limite. Vers le haut, on la dépasserait de quelques centièmes.",
    "nx-securite-1": "À 30 m, P abs = 4 bar. 1,4 ÷ 4 = 0,35 : au-delà de 35 % d’O₂, la Pp O₂ dépasserait 1,4 bar à 30 m.",
    "nx-securite-4": "La MOD est calculée pour que la Pp O₂ ne dépasse pas la limite choisie : au-delà, le risque de toxicité de l’oxygène augmente.",
    "n4-deco-2": "La palanquée reste groupée : on suit celui qui a le plus long palier, sinon on laisserait un plongeur seul.",
    "n4-deco-3": "On commence profond et on termine plus haut : le corps se désature progressivement, sans recomprimer des bulles déjà formées.",
    "e2-evaluer-1": "L’élève ne peut travailler qu’un point à la fois : on choisit le plus important pour la sécurité.",
    "e2-evaluer-3": "On ne voit bien qu’une chose à la fois : la respiration, puis la position, puis le geste.",
    "e2-evaluer-8": "Un progrès reconnu motive et l’élève sait exactement quel geste refaire.",
    "nx-pratique-3": "Tout le monde peut vérifier le mélange avant la plongée : l’étiquette évite qu’un bloc soit pris pour un autre.",
    "e1-piscine-1": "Le jeu fait oublier la difficulté : l’élève répète les gestes sans stress, et il a envie de revenir.",
    "e1-piscine-4": "Fatigué, on contrôle moins bien sa respiration : les apnées prolongées deviennent dangereuses (syncope)."
  };
  Object.keys(E).forEach(k => fix(k, E[k]));
  /* r-o2-5 était un doublon exact de r-o2-2 : remplacé par une variante (même id). */
  fix("r-o2-5", { q: "Bouteille d’O₂ de 3 L à 200 bar, débit 15 L/min. Autonomie environ ?", c: ["40 min", "66 min", "20 min", "90 min"], a: 0,
    e: "3 × 200 = 600 L d’oxygène ; 600 ÷ 15 = 40 min. Une petite bouteille se vide vite : on prévoit une relève si l’évacuation est longue." });

  /* Exemples pas à pas pour des thèmes sans générateur propre (générateurs cousins). */
  Object.assign(C.exampleGens = C.exampleGens || {}, { "d-materiel": ["autonomie"], "d-bapteme": ["n1vol"], "n1-accidents": ["n1vol"], pa20: ["conso", "autonomie"], accidents: ["ballon"], physio: ["co"],
    "n3-cadre": ["n3prof"], "n3-physio": ["n3narc"], "n3-accidents": ["remontee"], "n3-materiel": ["n3air"], "n4-deco": ["remontee"], "n4-physio": ["n3narc"], "n4-assistance": ["n4pal"], "n4-orga": ["ro2"],
    "nx-pratique": ["nxmod", "nxbest"], "r-cas": ["ro2"], "r-alerte": ["ro2"], regles: ["prof"] });
})();
