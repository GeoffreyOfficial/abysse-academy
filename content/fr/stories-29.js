/* Abysse Academy · contenu FR · Aventure 2.9 : la plongée guidée
   Une plongée complète, du briefing à la sortie, encadrée par une guide
   de palanquée jusqu'à 30 m (prérogative PE40 du N2). La profondeur de
   chaque scène suit la plongée : la lumière baisse en descendant.
   Personnages et site inventés. « À faire valider » auprès de ton moniteur. */
(function () {
  const C = AA.content;
  const O = (t, e, m, go) => ({ t, ok: 1, e, m, go });
  const X = (t, e, m, go) => (go ? { t, ok: 0, e, m, go } : { t, ok: 0, e, m });

  C.addStory({
    id: "n2-guidee", world: "n2", role: "Plongeur encadré à 30 m (N2)", icon: "dive", xp: 90, title: "La plongée guidée", sub: "Une plongée complète au Sec des Mérous avec Léa, guide de palanquée.",
    unlock: null, start: "g1", cast: { lea: "Léa, guide de palanquée", tom: "Tom, ton binôme N2" },
    nodes: {
      g1: { depth: 0, scene: "Sur le bateau, 9 h. Mer belle, eau à 19 °C.", who: "lea", text: "Le Sec des Mérous : 30 m maximum, 45 minutes, retour au mouillage. Des questions ?", q: "Que fais-tu ?",
        choices: [
          X("Rien : elle connaît le site et je la suivrai de toute façon.", "Même encadré, tu dois connaître le plan : profondeur, durée, signes et conduite à tenir si on se perd.", "regles"),
          O("Je lui fais préciser ce qu’on fait si on se perd de vue.", "La conduite en cas de perte se décide avant la plongée : sous l’eau, on communique mal.", "regles", "g2"),
          X("Je demande si on pourra descendre un peu plus bas que prévu.", "La profondeur maximale est fixée par la guide selon vos niveaux et les conditions : elle ne se négocie pas.", "regles") ] },
      g2: { depth: 0, scene: "Tom et toi vous équipez côte à côte.", who: "tom", text: "On fait les vérifications avant de sauter ?", q: "Que vérifiez-vous ensemble ?",
        choices: [
          X("Juste le manomètre : le reste a été contrôlé au club ce matin.", "Un robinet refermé ou un direct system débranché, ça arrive : on vérifie juste avant de sauter.", "materiel"),
          X("Rien pour l’instant, on contrôlera le lestage à la descente.", "Les vérifications se font en surface, avant de descendre : sous l’eau, il est trop tard.", "materiel"),
          O("Bloc ouvert, gilet qui gonfle et purge, détendeurs qui respirent.", "Robinet, gilet, détendeur principal et source de secours : la vérification croisée évite les mauvaises surprises.", "materiel", "g3") ] },
      g3: { depth: 3, scene: "Descente le long du bout, à 3 m.", text: "Ton oreille droite coince, elle fait de plus en plus mal.", q: "Que fais-tu ?",
        choices: [
          O("Je m’arrête, je remonte d’un mètre et je réessaie doucement.", "En remontant un peu, l’écart de pression diminue et l’oreille se débloque plus facilement.", "accidents", "g4"),
          X("Je souffle très fort, nez pincé, pour que ça passe d’un coup.", "Un Valsalva en force peut léser l’oreille. On remonte un peu au lieu de forcer.", "accidents", "g3bad"),
          X("Je continue à suivre Léa, ça finira par passer en bas.", "Plus tu descends, plus l’écart augmente. Il faut s’arrêter et prévenir la guide.", "accidents") ] },
      g3bad: { depth: 0, end: true, bad: true, retry: "g3", title: "Plongée annulée", text: "Une douleur vive, puis un vertige : Léa te ramène en surface. Le médecin parlera d’un barotraumatisme de l’oreille.",
        why: "Forcer sur une oreille bloquée crée une surpression brutale. Il fallait s’arrêter, remonter un peu et réessayer doucement.", learn: ["On équilibre tôt et souvent, sans forcer.", "Oreille bloquée : on remonte d’un mètre et on prévient la guide."] },
      g4: { depth: 20, scene: "20 m. Un gros mérou sous une roche.", who: "tom", text: "Tom s’approche et tend la main vers lui.", q: "Que fais-tu ?",
        choices: [
          X("Je le laisse faire : ce mérou a l’habitude des plongeurs.", "Toucher un animal le stresse et peut te blesser. On observe à distance.", "environnement"),
          O("Je l’arrête d’un signe : on regarde sans toucher.", "Un bon plongeur ne touche ni la faune ni la flore : c’est aussi ta sécurité.", "environnement", "g5"),
          X("Je m’approche aussi pour faire une photo de tout près.", "S’approcher trop près dérange l’animal et abîme les fonds avec les palmes.", "environnement") ] },
      g5: { depth: 30, scene: "30 m, au pied du sec.", text: "Tu te sens léger et euphorique, tout te fait rire.", q: "Que fais-tu ?",
        choices: [
          X("J’en profite pour m’éloigner un peu et explorer le tombant.", "L’euphorie est un signe de narcose : s’éloigner seul est justement l’erreur qu’elle provoque.", "accidents"),
          X("Je respire plus vite pour chasser cette sensation bizarre.", "Respirer vite augmente le gaz carbonique, qui renforce la narcose.", "accidents"),
          O("Je le signale à Léa et on remonte de quelques mètres.", "La narcose diminue dès qu’on remonte un peu. On la signale toujours à la guide.", "accidents", "g6") ] },
      g6: { depth: 25, scene: "25 m. Léa demande la pression à chacun.", text: "Ton manomètre affiche 100 bar.", q: "Que lui réponds-tu ?",
        choices: [
          O("Je lui montre ma pression avec le signe vu au briefing.", "La guide gère l’air de toute la palanquée : elle a besoin d’une réponse exacte.", "pa20", "g7"),
          X("Je lui fais « ça va » : ma pression, c’est mon affaire.", "La guide décide du retour selon l’air de chacun : sans réponse précise, elle ne peut pas le faire.", "pa20"),
          X("J’annonce 150 bar pour pouvoir continuer la balade.", "Mentir sur sa pression, c’est risquer la panne d’air de toute la palanquée.", "pa20") ] },
      g7: { depth: 15, scene: "Retour vers le mouillage, 15 m.", text: "Tu te retournes : Tom n’est plus derrière toi.", q: "Que fais-tu ?",
        choices: [
          X("Je pars seul le chercher derrière la grosse roche.", "En partant seul, la palanquée se perd une deuxième fois. On prévient la guide.", "regles", "g7bad"),
          O("Je préviens Léa tout de suite d’un signe.", "La guide est responsable de la palanquée : c’est elle qui organise la recherche.", "regles", "g8"),
          X("Je continue derrière Léa, elle compte la palanquée.", "Chacun surveille ses équipiers : si tu as vu qu’il manque, tu le dis tout de suite.", "regles") ] },
      g7bad: { depth: 0, end: true, bad: true, retry: "g7", title: "Deux plongeurs perdus", text: "Derrière la roche, personne. Tu te retrouves seul. Tu remontes et attends en surface. Tom, lui, avait retrouvé Léa : c’est toi qu’on cherche.",
        why: "Partir seul transforme une perte en deux. Le bon réflexe : prévenir la guide, qui applique la procédure annoncée au briefing.", learn: ["Perte de palanquée : on applique la procédure du briefing.", "En plongée encadrée, on prévient la guide avant tout."] },
      g8: { depth: 10, scene: "Léa lance la remontée.", text: "Ton ordinateur bipe : tu montes trop vite.", q: "Que fais-tu ?",
        choices: [
          X("Je gonfle un peu mon gilet pour rester au niveau de Léa.", "L’air du gilet se dilate en montant : tu accélères encore. Il faut purger.", "mariotte"),
          O("Je purge mon gilet et je cale ma vitesse sur celle de Léa.", "En remontée, on purge au fur et à mesure : la vitesse reste maîtrisée.", "mariotte", "g9"),
          X("Je palme vers le haut, Léa est déjà au-dessus de moi.", "Palmer vers la surface accélère la remontée. On reste avec la guide, à sa vitesse.", "deco") ] },
      g9: { depth: 5, scene: "5 m. Léa annonce un palier de sécurité de trois minutes.", text: "La houle te fait un peu monter et descendre.", q: "Que fais-tu pendant le palier ?",
        choices: [
          X("Je monte à 2 m, c’est plus confortable avec la houle.", "Le palier se fait à la profondeur annoncée : à 2 m, il perd son intérêt.", "deco"),
          X("Je dépasse Léa pour finir le palier au plus près de la surface.", "On ne dépasse pas la guide : la palanquée fait son palier ensemble.", "deco"),
          O("Je reste stable face à Léa et Tom en surveillant mon ordinateur.", "Stable, ensemble, à la profondeur prévue : un palier réussi.", "deco", "g10") ] },
      g10: { depth: 0, scene: "Surface. Le bateau est à 30 m.", text: "Le soleil, les vagues. Tom lève le pouce.", q: "Que fais-tu en arrivant ?",
        choices: [
          O("Gilet gonflé, détendeur en bouche, je reste avec la palanquée.", "On garde masque et détendeur jusqu’au bateau et on reste groupés : la mer peut surprendre.", "pa20", "end"),
          X("J’enlève tout de suite mon masque pour mieux respirer.", "Masque et détendeur restent en place jusqu’au bateau : une vague peut arriver.", "pa20"),
          X("Je nage seul vers l’échelle pour monter le premier.", "La palanquée reste groupée jusqu’au bateau, sous l’œil de la guide.", "pa20") ] },
      end: { depth: 0, end: true, title: "Une plongée guidée réussie", text: "Au débriefing, Léa sourit : « Tu as tout signalé : ton oreille, la narcose, Tom. Tu as respecté le plan. Tu es prêt pour les plongées à 30 m. »",
        learn: ["Connaître le plan, même encadré.", "Tout signaler à la guide : oreille, narcose, perte d’un équipier.", "Remontée : on purge le gilet, on garde la vitesse de la guide.", "En surface : gilet gonflé, détendeur en bouche, palanquée groupée."] }
    }
  });
})();
