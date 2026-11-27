/* Abysse Academy 2.5 · Quêtes des gardiens
   Une aventure par niveau qui mène jusqu'au boss final : il faut la vivre
   pour pouvoir l'affronter. bossIntro s'affiche avant le combat, epilogue
   après la victoire. Personnages et lieux inventés. */
(function () {
  const C = AA.content;
  const O = (t, e, m, go) => ({ t, ok: 1, e, m, go });
  const X = (t, e, m, go) => (go ? { t, ok: 0, e, m, go } : { t, ok: 0, e, m });
  const Q = s => C.addStory(Object.assign({ role: "Quête du gardien", icon: "swords", xp: 50, unlock: null, start: "q1" }, s));

  Q({ id: "boss-decouverte", world: "decouverte", boss: "decouverte", title: "Le défi du poulpe", sub: "Ta deuxième plongée découverte. Un poulpe t’observe…",
    cast: { karim: "Karim, moniteur" },
    bossIntro: "Au fond de la crique, entre deux pierres, le poulpe t’a suivi du regard toute la plongée. Il change de couleur : il veut voir si tu as retenu les bases.",
    epilogue: "Le poulpe file se cacher dans sa jarre en lâchant un petit nuage d’encre. Karim rit : « Il t’a adopté. Le Niveau 1 t’attend. »",
    nodes: {
      q1: { depth: 0, scene: "La crique, 10 h. Karim te tend ton détendeur.", who: "karim", text: "Aujourd’hui, on va jusqu’à la jarre du poulpe. Montre-moi d’abord comment tu me dis que ça va.", q: "Quel signe fais-tu ?",
        choices: [
          X("Le pouce levé, bien visible devant le masque.", "Le pouce levé veut dire « on remonte ». Pour « ça va », c’est le rond pouce-index.", "n1-signes"),
          O("Le rond avec le pouce et l’index.", "Le rond pouce-index, c’est « ça va ». On le répète au briefing pour être sûrs.", "n1-signes", "q2"),
          X("La main à plat qui bascule doucement.", "La main qui oscille veut dire « ça ne va pas ».", "n1-signes") ] },
      q2: { depth: 2, scene: "2 m. Ça appuie sur tes oreilles.", q: "Que fais-tu ?",
        choices: [
          X("J’attends d’avoir vraiment mal pour être sûr d’en avoir besoin.", "On équilibre avant d’avoir mal, souvent, dès les premiers mètres.", "d-oreilles"),
          X("Je descends plus vite pour passer cette zone désagréable.", "Plus vite, c’est plus d’écart de pression. On descend doucement en équilibrant.", "d-oreilles"),
          O("Je pince le nez et je souffle doucement.", "Nez pincé, souffle léger, souvent : l’air passe derrière le tympan.", "d-oreilles", "q3") ] },
      q3: { depth: 4, scene: "4 m. Un filet d’eau entre dans ton masque.", q: "Comment le vides-tu ?",
        choices: [
          O("Je souffle par le nez en tenant le haut du masque.", "L’air chasse l’eau par le bas. Tête légèrement relevée, et c’est fait.", "d-materiel", "q4"),
          X("Je retire le masque pour le remettre bien en place.", "Retirer le masque n’est pas nécessaire : on le vide en soufflant par le nez.", "d-materiel"),
          X("Je fais signe à Karim que je veux remonter le vider en surface.", "On peut le vider sous l’eau sans remonter : souffle par le nez, haut du masque tenu.", "d-materiel") ] },
      q4: { depth: 4, scene: "Devant toi, une jarre ancienne. Deux yeux dorés te fixent.", text: "Le poulpe sort un bras, curieux.", q: "Que fais-tu ?",
        choices: [
          X("Je tends doucement la main pour qu’il vienne la toucher.", "On ne touche pas : on le stresse et on peut se blesser. On observe.", "n1-milieu"),
          O("Je reste à distance, immobile, et je l’observe.", "Rester calme et à distance : il sort souvent de lui-même par curiosité.", "n1-milieu", "q5"),
          X("Je fais tourner la jarre pour le voir en entier.", "On ne déplace rien : la jarre est sa maison.", "n1-milieu") ] },
      q5: { depth: 3, scene: "Karim montre le haut avec le pouce.", q: "Comment remontes-tu ?",
        choices: [
          X("En gardant mon souffle pour arriver avec de l’air en réserve.", "Jamais d’apnée en remontant : l’air se dilate dans les poumons.", "d-bapteme"),
          X("En palmant vite vers la lumière pour sortir avant Karim.", "Le moniteur règle la vitesse : on remonte doucement avec lui.", "d-bapteme"),
          O("Doucement, avec Karim, en respirant normalement.", "On respire normalement et on suit le rythme du moniteur.", "d-bapteme", "end") ] },
      end: { depth: 4, end: true, boss: "decouverte", title: "Le poulpe te défie", text: "En remontant, tu vois le poulpe changer de couleur, du brun au rouge vif. Karim te fait signe : il te lance un défi. Prêt ?",
        learn: ["Rond pouce-index = ça va ; pouce levé = on remonte.", "On équilibre tôt et doucement.", "On observe sans toucher."] }
    } });

  Q({ id: "boss-n1", world: "n1", boss: "n1", title: "Le passage du crabe", sub: "Avec Maëlle, vers la grotte du crabe géant.",
    cast: { maelle: "Maëlle, guide de palanquée" },
    bossIntro: "Au fond de la faille, à 20 m, un crabe immense ferme le passage vers le large. Il agite ses pinces : signes, pression, sécurité, il veut tout vérifier.",
    epilogue: "Le crabe recule de côté et libère le passage. Maëlle te serre la main en surface : « Tu es prêt pour le Niveau 2. »",
    nodes: {
      q1: { depth: 0, scene: "Sur le bateau.", who: "maelle", text: "On va à la faille du crabe, 20 m maximum. Ton bloc est prêt ?", q: "Que vérifies-tu ?",
        choices: [
          X("Qu’il est bien attaché ; il a été gonflé et contrôlé ce matin.", "On ouvre, on lit la pression et on respire sur les deux détendeurs.", "n1-secu"),
          O("Je l’ouvre, je lis la pression, je respire sur les deux détendeurs.", "C’est le contrôle de base avant chaque plongée.", "n1-secu", "q2"),
          X("Je le garde fermé jusqu’à la mise à l’eau pour économiser l’air.", "Un bloc fermé, c’est la panne d’air à la première inspiration.", "n1-secu") ] },
      q2: { depth: 10, scene: "10 m.", who: "maelle", text: "Maëlle te demande : à 20 m, quelle sera la pression ?", q: "Ta réponse ?",
        choices: [
          X("2 bar", "C’est la pression de l’eau seule. Il faut ajouter le bar de l’atmosphère.", "n1-physique"),
          X("20 bar", "1 bar tous les 10 m, pas par mètre.", "n1-physique"),
          O("3 bar", "1 bar d’air + 2 bar d’eau = 3 bar absolus.", "n1-physique", "q3") ] },
      q3: { depth: 18, scene: "18 m. Ton gilet te fait couler un peu.", q: "Que fais-tu ?",
        choices: [
          O("Une petite injection dans le gilet, puis je règle avec la respiration.", "L’air du gilet s’écrase en descendant : on en ajoute un peu.", "n1-physique", "q4"),
          X("Je palme vers le haut pour rester au même niveau.", "Palmer fatigue et consomme : c’est le gilet qui corrige.", "n1-physique"),
          X("Je vide le gilet pour me poser au fond près de la faille.", "Vider le gilet te ferait couler encore plus, sur la vie fixée.", "n1-milieu") ] },
      q4: { depth: 20, scene: "20 m. Ton manomètre affiche 50 bar.", q: "Que fais-tu ?",
        choices: [
          X("J’attends que Maëlle me demande ma pression pour ne pas la déranger.", "La réserve se signale tout de suite, sans attendre.", "n1-secu"),
          O("Je fais le signe « réserve » à Maëlle.", "La réserve se signale tout de suite : la palanquée remonte.", "n1-secu", "q5"),
          X("Je respire moins pour faire durer l’air jusqu’au crabe.", "Retenir sa respiration crée de l’essoufflement.", "n1-accidents") ] },
      q5: { depth: 8, scene: "Remontée. Ton gilet te tire vers le haut.", q: "Que fais-tu ?",
        choices: [
          X("Je palme vers le bas pour garder la même vitesse que Maëlle.", "Le gilet se dilate : il faut le purger.", "n1-physique"),
          X("Je gonfle un peu plus pour remonter sans effort.", "C’est la remontée en ballon assurée.", "n1-physique"),
          O("Je purge un peu le gilet, et je remonte au rythme de Maëlle.", "En remontant, l’air du gilet se dilate : on purge régulièrement.", "n1-physique", "end") ] },
      end: { depth: 20, end: true, boss: "n1", title: "Le crabe bloque la faille", text: "La plongée suivante, tu retournes à la faille. Le crabe est là, pinces levées. Maëlle sourit derrière son masque : c’est ton examen.",
        learn: ["3 bar à 20 m.", "La réserve se signale tout de suite.", "On purge le gilet en remontant."] }
    } });

  Q({ id: "boss-n2", world: "n2", boss: "n2", title: "Vers le grand bleu", sub: "Ta préparation pour rencontrer le Gardien des 40 mètres.",
    cast: { lou: "Lou, directrice de plongée", sam: "Sam, ton binôme N2" },
    bossIntro: "Au pied du tombant, à 40 m, une ombre immense se détache du bleu. Le Gardien, un mérou centenaire, te fixe. Physique, physiologie, calculs, règles : il ne laisse passer que ceux qui savent.",
    epilogue: "Le Gardien s’écarte lentement et retourne dans sa faille. Lou t’attend en surface : « Le grand bleu t’est ouvert. RIFAP et N3, à toi de choisir. »",
    nodes: {
      q1: { depth: 0, scene: "Le bateau. Lou déplie la carte du tombant.", who: "lou", text: "Pour aller voir le Gardien, il faut descendre à 40 m, encadré. D’abord, la pression là-bas ?", q: "Pression absolue à 40 m en mer ?",
        choices: [
          X("4 bar", "C’est la pression relative. Avec l’atmosphère : 5 bar.", "pression"),
          O("5 bar", "1 bar d’air + 4 bar d’eau = 5 bar.", "pression", "q2"),
          X("40 bar", "On ajoute 1 bar par 10 m.", "pression") ] },
      q2: { depth: 0, scene: "Sam fait ses calculs.", who: "sam", text: "Je consomme 20 L/min en surface. À 40 m ?", q: "Sa consommation au fond ?",
        choices: [
          X("80 L/min", "Tu as multiplié par la pression relative (4). Il faut l’absolue : 5.", "mariotte"),
          X("60 L/min", "Ce serait vrai à 20 m (3 bar). À 40 m : 5 bar.", "mariotte"),
          O("100 L/min", "20 × 5 bar = 100 L/min. Le bloc se vide cinq fois plus vite.", "mariotte", "q3") ] },
      q3: { depth: 38, scene: "38 m. Le tombant plonge dans le bleu.", text: "Sam rit, te montre un poisson… puis le vide, l’air absent.", q: "Ton analyse ?",
        choices: [
          O("Narcose possible : je le prends par le bras, on remonte de quelques mètres.", "La narcose dépend de la Pp N₂ : elle s’atténue en remontant.", "dalton", "q4"),
          X("Il s’amuse, je le laisse profiter de la vue.", "Un équipier qui ne répond plus normalement, c’est une alerte.", "accidents"),
          X("On descend encore pour voir si ça passe en s’habituant.", "Plus profond = narcose plus forte.", "dalton") ] },
      q4: { depth: 30, scene: "30 m. Ton ordinateur et celui de Sam ne disent pas la même chose.", q: "Lequel suivez-vous ?",
        choices: [
          X("Celui qui donne le plus de temps : c’est le plus récent.", "La palanquée suit le plus pénalisant, pas le plus arrangeant.", "n2-ordi"),
          O("Celui qui demande le plus de paliers : le plus pénalisant.", "C’est la règle de la palanquée.", "n2-ordi", "q5"),
          X("On fait la moyenne pour ne pas trop rallonger.", "Une moyenne n’a pas de sens pour la décompression.", "deco") ] },
      q5: { depth: 3, scene: "Palier. Le Gardien vous a suivis du regard.", who: "lou", text: "En surface, Lou te pose une dernière question.", q: "Qui fixe les paramètres d’une palanquée autonome de N2 ?",
        choices: [
          X("Les plongeurs eux-mêmes, puisqu’ils sont autonomes.", "Ils préparent la plongée, mais dans le cadre fixé par le DP.", "regles"),
          X("Le plus expérimenté de la palanquée, selon son carnet.", "C’est le directeur de plongée qui fixe le cadre.", "regles"),
          O("Le directeur de plongée.", "Le DP fixe profondeur et durée ; la palanquée s’organise dedans.", "regles", "end") ] },
      end: { depth: 40, end: true, boss: "n2", title: "Le Gardien vous attend", text: "Le lendemain, Lou te confie : « Le Gardien ne laisse passer que ceux qui maîtrisent tout le N2. Aujourd’hui, c’est ton tour. »",
        learn: ["5 bar à 40 m, consommation × 5.", "Narcose : on remonte de quelques mètres.", "On suit l’ordinateur le plus pénalisant."] }
    } });

  Q({ id: "boss-rifap", world: "rifap", boss: "rifap", title: "La trousse du récif", sub: "Un plongeur en difficulté, et une murène qui garde la trousse de secours.",
    cast: { nadia: "Nadia, directrice de plongée" },
    bossIntro: "La trousse de secours a glissé au fond du récif. La murène s’est enroulée autour. Alerte, oxygène, bilan : prouve que tu sais réagir sans hésiter, et elle te la rendra.",
    epilogue: "La murène dénoue sa queue et retourne dans son trou. Tu remontes la trousse : le monde Initiateur t’ouvre ses portes.",
    nodes: {
      q1: { depth: 0, scene: "Sur le bateau. Un plongeur remonte, pâle, et s’effondre sur le pont.", q: "Premier réflexe ?",
        choices: [
          X("Je lui retire sa combinaison pour qu’il respire mieux.", "D’abord la sécurité et l’alerte : on prévient le DP et on fait le bilan.", "r-vict"),
          O("Je préviens Nadia et je vérifie s’il répond et s’il respire.", "Alerter le DP et commencer le bilan vital : conscience, respiration.", "r-bilan", "q2"),
          X("Je lui donne de l’eau tout de suite pour le réhydrater.", "Jamais à boire avant d’avoir fait le bilan.", "r-acc") ] },
      q2: { depth: 0, scene: "Il répond, il respire. Il a mal à la poitrine.", q: "Que fais-tu ?",
        choices: [
          X("Je le fais marcher sur le pont pour qu’il se réchauffe.", "L’effort aggrave un accident de plongée : repos, allongé.", "r-vict"),
          X("J’attends de voir si ça passe avant d’utiliser l’oxygène.", "L’oxygène se donne tout de suite, sans attendre.", "r-o2"),
          O("Oxygène au masque à haute concentration, tout de suite.", "Douleur après une plongée : on pense accident, oxygène immédiatement.", "r-o2", "q3") ] },
      q3: { depth: 0, scene: "Nadia te demande d’alerter.", q: "En mer, qui appelles-tu ?",
        choices: [
          O("Le CROSS, par la VHF canal 16.", "En mer, le CROSS coordonne les secours (à terre : 15 ou 112).", "r-alerte", "q4"),
          X("Le club, pour qu’ils préparent une voiture au port.", "Les secours se déclenchent par le CROSS ou le 15 / 112.", "r-alerte"),
          X("Sa famille, pour qu’elle sache où l’emmener.", "On appelle d’abord les secours.", "r-alerte") ] },
      q4: { depth: 0, scene: "Il ne répond plus, mais il respire.", q: "Que fais-tu ?",
        choices: [
          X("Je commence les compressions thoraciques sans attendre.", "Il respire : pas de compressions. PLS et oxygène.", "r-rcp"),
          O("PLS, oxygène, et je signale l’aggravation.", "Inconscient qui respire : PLS, on protège ses voies aériennes.", "r-vict", "q5"),
          X("Je le laisse sur le dos et je vais chercher de l’aide à l’avant.", "On ne laisse jamais seule une victime inconsciente.", "r-vict") ] },
      q5: { depth: 0, scene: "L’hélicoptère arrive.", q: "Que transmets-tu ?",
        choices: [
          X("Son ordinateur, tout y est enregistré automatiquement.", "L’ordinateur aide, mais il faut aussi les signes, les heures et les gestes faits.", "r-sortie"),
          X("Son nom et le nom de son club, pour la suite.", "La priorité : profil, signes, heures, gestes.", "r-sortie"),
          O("La fiche : profil, heure des signes, oxygène depuis quand, évolution.", "La fiche suit la victime jusqu’au caisson.", "r-sortie", "end") ] },
      end: { depth: 6, end: true, boss: "rifap", title: "La murène et la trousse", text: "Le plongeur est évacué à temps. En voulant ranger le matériel, tu vois la trousse glisser dans le récif. Une murène s’enroule autour, et te fixe.",
        learn: ["Alerter et faire le bilan.", "Oxygène tout de suite.", "Inconscient qui respire : PLS."] }
    } });

  Q({ id: "boss-n3", world: "n3", boss: "n3", title: "L’épave du Congre", sub: "Autonome au pied du tombant, vers l’épave des 60 mètres.",
    cast: { lina: "Lina, N3" },
    bossIntro: "Sous la proue de l’épave, à 60 m, un congre énorme sort la tête. Narcose, gaz, décompression : il attend que tu gardes la tête froide.",
    epilogue: "Le congre rentre dans l’épave. Lina et toi faites vos paliers en riant dans vos détendeurs. Le monde N4 est ouvert.",
    nodes: {
      q1: { depth: 0, scene: "Préparation. Bloc de 15 L à 230 bar.", who: "lina", text: "On vise l’épave, puis on remonte le long du tombant. Notre règle d’air ?", q: "Que retenez-vous ?",
        choices: [
          X("50 bar comme d’habitude, la profondeur ne change rien.", "En profondeur, on consomme beaucoup plus : la réserve doit couvrir remontée, paliers et équipier.", "n3-autonomie"),
          O("Une pression de retour qui couvre remontée, paliers et partage d’air.", "On calcule la réserve pour la profondeur prévue.", "n3-autonomie", "q2"),
          X("L’alarme de l’ordinateur, il connaît notre consommation.", "La pression de retour se décide avant, ensemble.", "n3-autonomie") ] },
      q2: { depth: 50, scene: "50 m. Tout semble lent, les pensées aussi.", q: "Que fais-tu ?",
        choices: [
          O("Je le signale à Lina et on reste au-dessus, sans descendre plus.", "Narcose : on ne descend pas plus, on peut remonter de quelques mètres.", "n3-accidents", "q3"),
          X("Je continue vers l’épave, ça passe en s’habituant.", "La narcose ne passe pas en descendant.", "n3-accidents"),
          X("Je retiens ma respiration pour mieux me concentrer.", "Retenir sa respiration augmente le CO₂, qui aggrave la narcose.", "n3-physio") ] },
      q3: { depth: 55, scene: "L’épave. Une porte ouverte vers les cales.", q: "On y entre ?",
        choices: [
          X("Oui, juste la tête, ce n’est pas vraiment entrer.", "Pénétrer une épave demande une formation et un matériel spécifiques.", "n3-speciales"),
          X("Oui, avec une lampe, la porte est assez large.", "Sans formation ni fil d’Ariane, on reste dehors.", "n3-speciales"),
          O("Non : la pénétration d’épave demande une formation spécifique.", "On regarde de l’extérieur, en sécurité.", "n3-speciales", "q4") ] },
      q4: { depth: 30, scene: "Remontée.", q: "Ton ordinateur annonce plus de paliers que celui de Lina. Que faites-vous ?",
        choices: [
          O("Toute la palanquée suit le mien, le plus pénalisant.", "Le plus pénalisant décide pour tous.", "n3-deco", "q5"),
          X("On suit celui de Lina, elle est plus expérimentée que moi.", "L’expérience ne change pas le calcul.", "n3-deco"),
          X("Chacun fait ses paliers, on se retrouve en surface.", "La palanquée reste ensemble.", "n3-deco") ] },
      q5: { depth: 6, scene: "Palier. Le froid te gagne.", q: "Que fais-tu ?",
        choices: [
          X("Je raccourcis le palier, le froid est plus dangereux.", "On ne coupe pas un palier obligatoire.", "n3-deco"),
          O("Je fais tout le palier, en bougeant un peu, et je le signale à Lina.", "On garde les paliers ; le froid se signale et se note pour la suite.", "n3-deco", "end"),
          X("Je remonte à 3 m, il fait plus chaud près de la surface.", "On fait le palier à la profondeur demandée.", "n3-deco") ] },
      end: { depth: 60, end: true, boss: "n3", title: "Le congre sort de l’épave", text: "Le lendemain, vous redescendez. Cette fois, sous la proue, deux yeux brillent. Le congre de l’épave te regarde.",
        learn: ["Réserve calculée pour la profondeur.", "Pas de pénétration sans formation.", "Le plus pénalisant décide."] }
    } });

  Q({ id: "boss-e1", world: "e1", boss: "e1", title: "La séance de l’île", sub: "Ta séance d’initiateur, sous l’œil d’une raie.",
    cast: { helene: "Hélène, monitrice responsable" },
    bossIntro: "Pendant ta séance dans le lagon, une raie immense tourne autour de ton groupe. Préparer, conduire, sécuriser : elle t’observe comme une examinatrice.",
    epilogue: "La raie s’éloigne en battant lentement des ailes. Hélène signe ton carnet : « Tu sais transmettre. »",
    nodes: {
      q1: { depth: 0, scene: "Bord du lagon.", who: "helene", text: "Trois débutants, un objectif : lâcher et reprendre l’embout.", q: "Comment prépares-tu ?",
        choices: [
          O("Un objectif, des étapes, le matériel prêt et ma place.", "Une séance se prépare.", "e1-cours", "q2"),
          X("Je montre tout au bord en détail, puis ils plongent seuls.", "Démonstration courte, puis essai avec toi à côté.", "e1-apprendre"),
          X("Je verrai sur place selon leur humeur.", "On s’adapte, mais à partir d’un plan.", "e1-cours") ] },
      q2: { depth: 2, scene: "2 m.", q: "Comment présentes-tu le geste ?",
        choices: [
          X("Je l’explique longuement avant qu’ils essaient.", "Ils retiennent ce qu’ils voient et font.", "e1-apprendre"),
          O("Démonstration lente, une phrase pour le pourquoi, puis essai.", "La base d’un apprentissage efficace.", "e1-apprendre", "q3"),
          X("Je les laisse essayer sans montrer, pour qu’ils trouvent seuls.", "On montre d’abord.", "e1-apprendre") ] },
      q3: { depth: 2, scene: "Une élève ne retrouve plus son embout.", q: "Que fais-tu ?",
        choices: [
          X("Je la fais remonter, elle le reprendra en surface.", "On reprend l’embout au fond, avec de l’air de secours prêt.", "e1-exercices"),
          X("Je lui laisse chercher seule, c’est comme ça qu’on apprend.", "Tu guides et tu gardes de l’air prêt.", "e1-exercices"),
          O("Je lui montre le balayage du bras, mon octopus prêt.", "Guider le geste, avec la solution d’air prête.", "e1-exercices", "q4") ] },
      q4: { depth: 2, scene: "Un élève veut aller voir plus loin, vers le tombant.", q: "Que réponds-tu ?",
        choices: [
          O("On reste dans la zone prévue par Hélène.", "L’initiateur reste dans le cadre fixé.", "e1-cadre", "q5"),
          X("D’accord, mais seulement lui et moi, les autres attendent.", "On ne laisse pas le groupe.", "e1-cadre"),
          X("D’accord, puisque tout le monde est à l’aise aujourd’hui.", "Ce n’était pas prévu ni dans tes prérogatives.", "e1-cadre") ] },
      q5: { depth: 0, scene: "Fin de séance.", q: "Comment termines-tu ?",
        choices: [
          X("Je liste toutes leurs erreurs pour la prochaine fois.", "On valorise, une piste, la suite.", "e1-cours"),
          X("Pas de bilan, ils sont fatigués.", "Le bilan est court mais indispensable.", "e1-cours"),
          O("Leur ressenti, un progrès de chacun, la prochaine étape.", "Un bilan qui ancre la séance.", "e1-cours", "end") ] },
      end: { depth: 6, end: true, boss: "e1", title: "La raie s’approche", text: "Hélène te propose de mener seul la séance suivante, pour ta validation. Au fond du lagon, la raie est revenue.",
        learn: ["Un objectif par séance.", "Démonstration, essai, correction.", "Rester dans le cadre fixé."] }
    } });

  Q({ id: "boss-n4", world: "n4", boss: "n4", title: "Les barracudas du large", sub: "Tu guides trois plongeurs vers le banc de barracudas.",
    cast: { claire: "Claire, directrice de plongée" },
    bossIntro: "Au large, à 40 m, le banc de barracudas tourne autour de ta palanquée comme un tourbillon d’argent. Rôle du guide, air, assistance : garde tout le monde en sécurité.",
    epilogue: "Le banc s’ouvre et laisse passer ta palanquée. Claire : « Tu les as ramenés tous les trois, calmes et ravis. Le monde E2 t’attend. »",
    nodes: {
      q1: { depth: 0, scene: "Claire te confie trois N2 pour aller voir les barracudas.", q: "Ton briefing contient…",
        choices: [
          X("Le spectacle à voir et la meilleure place pour les photos.", "Il manque l’essentiel : paramètres, signes, conduite à tenir.", "n4-guide"),
          O("Profondeur, durée, pression de retour, signes, conduite si perte.", "Le briefing prépare les incidents.", "n4-guide", "q2"),
          X("Ma consommation et mes paliers, pour qu’ils me suivent.", "Ce sont leurs paramètres qui comptent.", "n4-guide") ] },
      q2: { depth: 35, scene: "35 m. Le banc arrive.", q: "Où places-tu ta palanquée ?",
        choices: [
          O("Devant ou à côté de moi, dans mon champ de vision.", "Le guide voit toujours sa palanquée.", "n4-guide", "q3"),
          X("Libres autour du banc, chacun à son rythme.", "On reste groupés avec le guide.", "n4-guide"),
          X("Derrière moi en file, pour ne pas effrayer les poissons.", "Derrière toi, tu ne les vois pas.", "n4-guide") ] },
      q3: { depth: 35, scene: "Deux plongeurs ont 120 bar, le troisième 70.", q: "Que décides-tu ?",
        choices: [
          X("On continue, celui à 70 bar partagera avec les autres.", "On se règle sur le plus bas.", "n4-air"),
          X("J’envoie celui à 70 bar remonter seul, les autres restent.", "On ne sépare pas la palanquée.", "n4-air"),
          O("Toute la palanquée commence le retour.", "Le plus bas décide pour tous.", "n4-air", "q4") ] },
      q4: { depth: 20, scene: "Un plongeur part en remontée rapide.", q: "Que fais-tu ?",
        choices: [
          O("Je le rattrape, je purge son gilet et je freine.", "Intervenir vite, puis regrouper.", "n4-assistance", "q5"),
          X("Je le regarde : il saura s’arrêter seul.", "Une remontée incontrôlée ne s’arrête pas seule.", "n4-assistance"),
          X("Je lâche les autres pour le suivre jusqu’en surface.", "On freine, puis on regroupe.", "n4-assistance") ] },
      q5: { depth: 0, scene: "À bord.", q: "Que dis-tu à Claire ?",
        choices: [
          X("Rien de spécial, tout s’est bien fini.", "Un incident se signale même sans blessé.", "n4-resp"),
          O("L’incident de remontée, avec heure et profondeur.", "Le DP doit savoir pour surveiller.", "n4-resp", "end"),
          X("J’en parlerai demain au débriefing général.", "Le DP doit le savoir maintenant.", "n4-resp") ] },
      end: { depth: 40, end: true, boss: "n4", title: "Le banc t’encercle", text: "Le lendemain, Claire te confie une nouvelle palanquée. Au large, le banc de barracudas t’attend.",
        learn: ["Briefing complet.", "Le plus bas en air décide.", "Remontée incontrôlée : saisir et purger."] }
    } });

  Q({ id: "boss-e2", world: "e2", boss: "e2", title: "Le poisson-lune du large", sub: "Ta séance de moniteur en mer, observée par un géant.",
    cast: { bastien: "Bastien, directeur de plongée" },
    bossIntro: "Pendant ta séance, un poisson-lune immense s’approche, calme, et observe chacun de tes gestes. Objectif, démonstration, sécurité : enseigne comme un pro.",
    epilogue: "Le poisson-lune repart vers le large. Bastien : « Tu as parcouru tout le chemin, de ta première bulle à moniteur. Bravo. »",
    nodes: {
      q1: { depth: 0, scene: "Deux élèves N1 en mer.", q: "Comment construis-tu la séance ?",
        choices: [
          X("Toute la séance à 15 m, pour les conditions réelles.", "Une nouvelle compétence s’apprend près d’un fond, peu profond.", "e2-n1mer"),
          O("Une compétence à la fois, près d’un fond à 6 m.", "Progression et sécurité d’abord.", "e2-n1mer", "q2"),
          X("Deux exercices en même temps pour gagner du temps.", "Une nouveauté à la fois.", "e2-n1mer") ] },
      q2: { depth: 0, scene: "Avant de partir.", q: "Que dis-tu à Bastien ?",
        choices: [
          O("Objectif, zone, profondeur, durée, heure de retour, élèves.", "Le DP organise la sécurité de tous.", "e2-orga", "q3"),
          X("L’heure de retour, le reste il le connaît.", "La zone compte aussi : c’est là qu’on te cherchera.", "e2-orga"),
          X("Je lui demande de choisir les exercices.", "Tu conçois ta séance et tu la présentes.", "e2-orga") ] },
      q3: { depth: 6, scene: "Un élève monte sans s’en rendre compte.", q: "Que fais-tu ?",
        choices: [
          X("Je finis avec l’autre élève, il redescendra seul.", "On traite d’abord le danger le plus grave.", "e2-securite"),
          X("Je laisse les deux élèves s’entraider pendant que je réfléchis.", "Tu gardes le groupe en main.", "e2-securite"),
          O("Je le ramène d’un geste, puis je reprends l’exercice.", "Le moniteur voit tout le groupe.", "e2-securite", "q4") ] },
      q4: { depth: 6, scene: "L’exercice réussit deux fois sur trois.", q: "Tu valides ?",
        choices: [
          X("Oui : elle est motivée, ça viendra.", "On valide ce qui est fiable.", "e2-evaluer"),
          O("Pas encore : à revoir avant de valider.", "Une compétence de sécurité doit être fiable.", "e2-evaluer", "q5"),
          X("Oui, pour ne pas la décourager.", "Une validation de complaisance met en danger plus tard.", "e2-evaluer") ] },
      q5: { depth: 0, scene: "En surface, un élève a mal au sinus.", q: "Que fais-tu ?",
        choices: [
          O("Je préviens Bastien, je note, pas de replongée sans avis.", "Incident signalé, noté, suivi.", "e2-incidents", "end"),
          X("Un antidouleur et on replonge l’après-midi.", "On ne replonge pas sans avis.", "e2-incidents"),
          X("On en reparle la semaine prochaine si ça dure.", "Le DP doit le savoir maintenant.", "e2-incidents") ] },
      end: { depth: 20, end: true, boss: "e2", title: "Le géant observe", text: "La semaine suivante, pour ta dernière séance d’évaluation, le poisson-lune est revenu. Il tourne lentement autour de ton groupe.",
        learn: ["Une compétence à la fois.", "Tout le groupe dans ton champ de vision.", "On valide ce qui est fiable."] }
    } });
})();
