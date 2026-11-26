/* Abysse Academy · contenu FR · Mode histoire
   Une aventure = des scènes (nodes). Chaque scène a une profondeur (le fond
   marin s'adapte), un texte et des choix. Un choix : t (texte), ok (1 bon,
   0 mauvais), e (explication), m (cours lié), go (scène suivante ; pour un
   mauvais choix, par défaut on reste sur la scène pour réessayer).
   Une scène avec end:true termine l'aventure.
   unlock : condition (comme les trophées). Les personnages sont inventés. */
AA.content.addStory({
  id: "anse", world: "n2", icon: "dive", title: "L’Anse aux Mérous", sub: "Ta première sortie en autonomie à 20 m, avec Sam.",
  unlock: null, start: "s1", cast: { lou: "Lou, directrice de plongée", sam: "Sam, ton binôme" },
  nodes: {
    s1: { depth: 0, scene: "Sur le bateau, 9 h. La mer est calme, l’eau à 19 °C.", who: "lou", text: "Vous plongez en autonomie, Sam et toi : 20 mètres maximum, 40 minutes. Préparez votre plongée et venez me l’annoncer.", q: "Avant de vous équiper, qu’est-ce que vous préparez ensemble ?",
      choices: [
        { t: "Le plan complet : profondeur max, durée, réserve, signes, conduite si on se perd.", ok: 1, e: "En autonomie, la palanquée prépare tout elle-même et l’annonce au DP. Si vous vous perdez de vue, vous appliquez ce que vous avez convenu.", m: "pa20", go: "s2" },
        { t: "Juste l’heure de retour au bateau, le reste se décide sous l’eau.", ok: 0, e: "Sous l’eau, on communique mal : tout ce qui compte (réserve, signes, séparation) se décide AVANT.", m: "pa20" },
        { t: "Rien : chacun a son ordinateur, il gère.", ok: 0, e: "L’ordinateur calcule la décompression, pas l’organisation de la palanquée. Le plan reste votre travail.", m: "pa20" } ] },
    s2: { depth: 0, scene: "Sam vérifie son bloc : 12 litres, 200 bar.", who: "sam", text: "On descend à 20 m. Tu te souviens quelle pression on aura là-bas ?", q: "La pression absolue à 20 m en mer ?",
      choices: [
        { t: "3 bar", ok: 1, e: "1 bar d’air au-dessus de l’eau + 2 bar d’eau (20 m) = 3 bar.", m: "pression", go: "s3" },
        { t: "2 bar", ok: 0, e: "Ça, c’est la pression de l’eau seule (relative). Il manque le bar de l’atmosphère.", m: "pression" },
        { t: "20 bar", ok: 0, e: "On ajoute 1 bar tous les 10 m, pas 1 bar par mètre.", m: "pression" } ] },
    s3: { depth: 5, scene: "Descente le long du mouillage. À 5 m, ton oreille gauche coince.", text: "Une petite douleur, de plus en plus nette.", q: "Que fais-tu ?",
      choices: [
        { t: "Je remonte d’un mètre, j’équilibre doucement, puis je reprends la descente.", ok: 1, e: "On ne force jamais : on remonte un peu pour réduire l’écart de pression, on équilibre en douceur, on redescend lentement.", m: "accidents", go: "s4" },
        { t: "Je souffle très fort nez pincé jusqu’à ce que ça passe.", ok: 0, e: "Un Valsalva forcé peut blesser l’oreille interne. Douceur et anticipation.", m: "accidents" },
        { t: "Je continue, ça va passer avec la profondeur.", ok: 0, e: "Plus tu descends, plus l’écart augmente : c’est le barotraumatisme assuré.", m: "accidents" } ] },
    s4: { depth: 12, scene: "12 m. Sous toi, un grand herbier de posidonie. Tu descends un peu trop vite.", text: "Tes palmes vont bientôt toucher l’herbier.", q: "Comment te stabilises-tu ?",
      choices: [
        { t: "Petite injection dans le gilet, puis réglage fin avec la respiration.", ok: 1, e: "Le gilet corrige le gros, le poumon-ballast affine. Et on protège l’herbier, nurserie de la Méditerranée.", m: "archimede", go: "s5" },
        { t: "Je palme fort vers le haut, au ras du fond.", ok: 0, e: "Palmer près du fond soulève le sable et abîme l’herbier, et ça fatigue (CO₂).", m: "environnement" },
        { t: "Je vide complètement mon gilet pour me poser.", ok: 0, e: "Vider le gilet te fait couler encore plus : c’est l’inverse de ce qu’il faut.", m: "archimede" } ] },
    s5: { depth: 20, scene: "20 m. Un mérou vous observe depuis sa faille.", who: "sam", text: "Sam rit dans son détendeur, te montre le mérou… puis un rocher… puis il ne répond plus à ton signe « ça va ? ».", q: "Ton analyse ?",
      choices: [
        { t: "Possible narcose : je le prends par le bras et on remonte de quelques mètres en l’observant.", ok: 1, e: "La narcose (azote sous pression) donne euphorie et erreurs. Elle s’atténue en remontant de quelques mètres.", m: "accidents", go: "s6" },
        { t: "Il s’amuse, je le laisse faire.", ok: 0, e: "Un équipier qui ne répond plus aux signes, c’est une alerte. En autonomie, vous êtes responsables l’un de l’autre.", m: "accidents" },
        { t: "On descend un peu voir si ça passe.", ok: 0, e: "Plus profond = plus d’azote = narcose plus forte. On remonte.", m: "dalton" } ] },
    s6: { depth: 16, scene: "16 m. Sam va mieux, il te fait le signe « ça va ». Ton manomètre affiche 110 bar.", text: "Tu te demandes pourquoi l’air descend si vite.", q: "Tu respires 20 L/min en surface. Combien au fond, à 20 m ?",
      choices: [
        { t: "60 L/min", ok: 1, e: "20 L/min × 3 bar = 60 L/min. À 20 m, chaque inspiration prend trois fois plus d’air qu’en surface.", m: "materiel", go: "s7" },
        { t: "20 L/min", ok: 0, e: "La consommation se multiplie par la pression absolue (loi de Mariotte).", m: "mariotte" },
        { t: "40 L/min", ok: 0, e: "Tu as multiplié par la pression relative (2). Il faut la pression absolue (3).", m: "pression" } ] },
    s7: { depth: 14, scene: "14 m. Sam se tourne vers toi, main à plat qui tranche la gorge : plus d’air.", who: "sam", text: "Ses yeux sont grands ouverts derrière le masque.", q: "Réaction ?",
      choices: [
        { t: "Je lui donne mon octopus, on se tient, et on remonte ensemble à vitesse contrôlée.", ok: 1, e: "Donner de l’air d’abord, se tenir pour ne pas se séparer, puis remontée contrôlée. Ça se travaille à l’entraînement.", m: "pa20", go: "s8" },
        { t: "Je lui fais signe de remonter vite tout seul.", ok: 0, e: "Une remontée seule et rapide expose à la surpression pulmonaire et à l’ADD. On reste ensemble.", m: "accidents" },
        { t: "Je vérifie d’abord son manomètre.", ok: 0, e: "Il n’a plus d’air : chaque seconde compte. L’air d’abord, les vérifications ensuite.", m: "pa20" } ] },
    s8: { depth: 5, scene: "5 m. Vous êtes stables, Sam respire sur ton octopus. Ton ordinateur demande un palier de sécurité.", text: "Le bateau est à 50 m, vous êtes en pleine eau.", q: "Que faites-vous ?",
      choices: [
        { t: "On fait le palier, je surveille Sam et l’air, et je lance le parachute pour signaler notre position.", ok: 1, e: "Palier tenu, surveillance de l’équipier, et parachute pour que la surface sache où vous êtes.", m: "deco", go: "s9" },
        { t: "On sort tout de suite à cause de l’incident.", ok: 0, e: "Rien ne presse à ce stade : vous avez de l’air. Sauter le palier ajoute un risque d’accident.", m: "deco" },
        { t: "On reste à 3 m pour économiser l’air.", ok: 0, e: "On respecte la profondeur demandée par la table ou l’ordinateur.", m: "deco" } ] },
    s9: { depth: 0, scene: "Sur le bateau, 20 minutes plus tard.", who: "sam", text: "« J’ai une douleur bizarre dans l’épaule, et je suis super fatigué. »", q: "Que fais-tu ?",
      choices: [
        { t: "Je préviens Lou tout de suite : après un incident et une remontée stressante, c’est peut-être un accident de désaturation.", ok: 1, e: "Douleur, fatigue anormale après une plongée : on pense ADD. Alerte du DP, oxygène selon le protocole, surveillance.", m: "r-alerte", go: "end" },
        { t: "Je lui masse l’épaule, ça doit être le bloc.", ok: 0, e: "Ne jamais banaliser un signe après une plongée. Mieux vaut une fausse alerte qu’un accident non traité.", m: "accidents" },
        { t: "On replonge 10 minutes pour « recompresser ».", ok: 0, e: "Jamais. Le traitement d’un ADD se fait en caisson, après oxygène et transport. Replonger aggrave tout.", m: "accidents" } ] },
    end: { depth: 0, end: true, title: "Retour au port", text: "Lou a donné de l’oxygène à Sam et appelé les secours par précaution. Bilan : il va bien. Au débriefing, elle te dit : « Vous aviez préparé, vous êtes restés ensemble, tu as donné l’alerte. C’est exactement ça, l’autonomie. »" }
  }
});

AA.content.addStory({
  id: "recif", world: "rifap", icon: "buoy", title: "Alerte au récif", sub: "Un plongeur remonte en difficulté. Tu es le premier à réagir.",
  unlock: { k: "story", id: "anse" }, start: "r1", cast: { lou: "Lou, directrice de plongée" },
  nodes: {
    r1: { depth: 0, scene: "Bateau, fin d’après-midi. Un plongeur fait surface à 20 m du bateau.", text: "Il agite le bras, puis sa tête bascule en arrière.", q: "Ta première action ?",
      choices: [
        { t: "Je donne l’alerte au bateau en criant, et je prépare l’intervention en me protégeant.", ok: 1, e: "Alerter tout de suite mobilise le DP et les secours. On intervient sans se mettre en danger soi-même.", m: "r-role", go: "r2" },
        { t: "Je saute à l’eau sans rien dire.", ok: 0, e: "Personne ne sait que tu interviens, et toi-même tu peux devenir une deuxième victime.", m: "r-role" },
        { t: "J’attends de voir s’il se reprend.", ok: 0, e: "Chaque minute compte en cas d’accident. On réagit dès le doute.", m: "r-role" } ] },
    r2: { depth: 0, scene: "Il est hissé à bord. Il ne répond pas quand on lui parle, mais il respire.", text: "", q: "Que fais-tu de lui ?",
      choices: [
        { t: "Position latérale de sécurité, puis oxygène et surveillance de sa respiration.", ok: 1, e: "Inconscient qui respire : PLS pour protéger les voies aériennes, oxygène selon le protocole, surveillance continue.", m: "r-vict", go: "r3" },
        { t: "Je le laisse sur le dos et je lui donne à boire.", ok: 0, e: "On ne fait jamais boire une personne inconsciente : risque d’étouffement.", m: "r-vict" },
        { t: "Je commence le massage cardiaque.", ok: 0, e: "Il respire : pas de massage. La RCP, c’est quand il n’y a plus de respiration normale.", m: "r-vict" } ] },
    r3: { depth: 0, scene: "Lou prend la radio.", who: "lou", text: "J’ai besoin que tu me prépares le message pour les secours.", q: "Le message contient…",
      choices: [
        { t: "Qui appelle, où on est, ce qui s’est passé, l’état de la victime, les gestes faits.", ok: 1, e: "Un message court et complet fait gagner du temps aux secours. Les numéros et canaux à utiliser sont à connaître avant la sortie.", m: "r-alerte", go: "r4" },
        { t: "Juste « accident de plongée, venez vite ».", ok: 0, e: "Sans position ni état de la victime, les secours perdent du temps.", m: "r-alerte" },
        { t: "Le nom du club et l’heure de la plongée.", ok: 0, e: "Ça ne suffit pas pour organiser l’intervention.", m: "r-alerte" } ] },
    r4: { depth: 0, scene: "Dix minutes plus tard. Il ouvre les yeux, encore très fatigué.", text: "« C’est bon, je vais bien, enlevez-moi ce masque. »", q: "Et l’oxygène ?",
      choices: [
        { t: "On continue l’oxygène et la surveillance jusqu’à la prise en charge par les secours.", ok: 1, e: "Une amélioration ne veut pas dire guérison. On garde l’oxygène et on transmet aux secours.", m: "r-o2", go: "r5" },
        { t: "On arrête, il dit qu’il va bien.", ok: 0, e: "Les signes peuvent revenir ou s’aggraver. On ne s’arrête pas sur une impression.", m: "r-o2" } ] },
    r5: { depth: 0, scene: "Arrivée des secours.", text: "", q: "Que leur donnes-tu ?",
      choices: [
        { t: "L’heure de l’alerte, les gestes faits, l’évolution, et ses paramètres de plongée (ordinateur).", ok: 1, e: "Les paramètres de plongée et l’historique aident le médecin à choisir le traitement.", m: "r-vict", go: "rend" },
        { t: "Rien, ils ont l’habitude.", ok: 0, e: "La transmission fait partie du secours : ce que tu as observé est précieux.", m: "r-vict" } ] },
    rend: { depth: 0, end: true, title: "Chaîne des secours", text: "Grâce à une alerte rapide et à l’oxygène, le plongeur a été pris en charge dans les meilleures conditions. Lou : « Protéger, alerter, secourir, transmettre. Tu as tenu toute la chaîne. »" }
  }
});

AA.content.addStory({
  id: "bapteme", world: "e1", icon: "teach", title: "Ton premier baptême", sub: "Tu encadres Nour, qui n’a jamais respiré sous l’eau.",
  unlock: { k: "story", id: "recif" }, start: "b1", cast: { nour: "Nour, qui fait son baptême" },
  nodes: {
    b1: { depth: 0, scene: "Plage, matin. Nour est souriante mais serre fort les bretelles de son gilet.", who: "nour", text: "Je suis un peu stressée… Je dois savoir quoi ?", q: "Ton briefing ?",
      choices: [
        { t: "Court et rassurant : trois signes (ça va, ça ne va pas, monter), on respire calmement, je m’occupe du reste.", ok: 1, e: "Un baptême, c’est peu d’informations, très claires. Le plaisir et la confiance passent avant tout.", m: "e2-com", go: "b2" },
        { t: "Je lui explique Mariotte et les barotraumatismes pour qu’elle comprenne.", ok: 0, e: "Trop d’informations augmente le stress. On garde la théorie pour plus tard.", m: "e2-peda" },
        { t: "Pas besoin, on verra sous l’eau.", ok: 0, e: "Sous l’eau, on ne peut plus expliquer. Les signes s’apprennent avant.", m: "e2-com" } ] },
    b2: { depth: 2, scene: "À 2 m. Nour respire vite, ses yeux cherchent la surface.", text: "", q: "Que fais-tu ?",
      choices: [
        { t: "Je la tiens, je lui montre de souffler lentement, on reste là le temps qu’elle se calme.", ok: 1, e: "On stabilise, on rassure, on ralentit la respiration. Si ça ne passe pas, on remonte sans en faire un échec.", m: "e2-secu", go: "b3" },
        { t: "On descend vite, elle va oublier son stress en voyant les poissons.", ok: 0, e: "Descendre avec un stress non réglé, c’est risquer la panique.", m: "e2-secu" } ] },
    b3: { depth: 4, scene: "À 4 m, tout va bien. Nour a mal à l’oreille.", text: "Elle te montre son oreille en grimaçant.", q: "Ta réaction ?",
      choices: [
        { t: "On remonte un peu, je lui montre le geste pour équilibrer, on reprend doucement.", ok: 1, e: "Même réflexe que pour toi, mais c’est toi qui guides et qui contrôles la profondeur.", m: "e2-seance", go: "b4" },
        { t: "Je continue la descente, elle s’habituera.", ok: 0, e: "On ne force jamais une oreille, encore moins chez un débutant.", m: "accidents" } ] },
    b4: { depth: 0, scene: "Retour sur la plage, Nour rayonne.", who: "nour", text: "C’était incroyable ! J’ai vu une pieuvre !", q: "Comment finis-tu ?",
      choices: [
        { t: "Un débriefing positif : ce qu’elle a réussi, ce qu’elle a vu, et l’envie de revenir.", ok: 1, e: "Le débriefing ancre le souvenir. On valorise, on donne envie de continuer.", m: "e2-com", go: "bend" },
        { t: "Je liste tout ce qu’elle a mal fait pour qu’elle progresse.", ok: 0, e: "Pour un baptême, l’objectif est le plaisir et la sécurité, pas la performance.", m: "e2-peda" } ] },
    bend: { depth: 0, end: true, title: "Une nouvelle plongeuse", text: "Nour s’inscrit au Niveau 1 la semaine suivante. Ton moniteur te glisse : « Calme, clair, attentif. Tu as l’œil d’un initiateur. »" }
  }
});
