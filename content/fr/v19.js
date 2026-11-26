/* Abysse Academy · contenu FR · 1.9
   Briefing de palanquée simulé, atelier plongées successives, nouveaux cas
   du mode ordinateur, défis de la semaine, événements de saison.
   Rien ici ne reproduit de valeurs de table : les majorations de l’atelier
   sont des valeurs d’exercice inventées. */
(function () {
  const C = AA.content;

  /* ---------- Briefing de palanquée ---------- */
  C.brief = {
    sites: [
      { id: "tombant", n: "Tombant des Gorgones", deep: 45, hz: "Le tombant plonge vite : on surveille la profondeur en permanence, et on ne dépasse pas le maximum annoncé.", see: "gorgones rouges, corb, langoustes dans les failles" },
      { id: "epave", n: "Épave du vieux chalutier", deep: 32, hz: "On ne rentre pas dans l’épave. Attention aux tôles coupantes et aux bouts de filet.", see: "congres, rascasses, bancs de sars autour de la coque" },
      { id: "plateau", n: "Plateau des posidonies", deep: 22, hz: "Fond plat et sans repère : on dérive vite loin de la palanquée sans s’en rendre compte. On reste groupés.", see: "herbier, seiches, hippocampes avec de la chance" },
      { id: "sec", n: "Sec du large", deep: 38, hz: "Courant possible : descente le long du bout, début de plongée face au courant, retour au mouillage.", see: "barracudas, dentis, anémones encroûtantes" },
      { id: "calanque", n: "Calanque abritée", deep: 25, hz: "Trafic de bateaux en surface : remontée près de la paroi, et parachute de palier si on remonte loin du bateau.", see: "poulpes, nudibranches, mérous juvéniles" }
    ],
    /* conditions : texte affiché, et question propre à la condition */
    conds: [
      { id: "courant", n: "Courant moyen en surface", q: "Il y a du courant. Comment descendez-vous ?", c: ["Le long du bout de mouillage, en commençant la plongée face au courant", "Chacun descend où il veut et on se retrouve au fond", "Dos au courant, pour aller plus loin sans effort", "Sans descendre au bout : on se laisse porter"], e: "Face au courant à l’aller, le retour se fait courant dans le dos, quand on a moins d’air. Le bout évite de se faire emporter pendant la descente." },
      { id: "visi", n: "Visibilité réduite, 3 à 5 m", q: "La visibilité est de 3 à 5 m. Que précises-tu ?", c: ["On se rapproche, on garde le contact visuel en permanence, les binômes sont bien définis", "Rien de spécial, chacun suit le guide de loin", "On s’écarte pour mieux voir chacun", "On plonge plus profond, l’eau y est plus claire"], e: "Avec peu de visibilité, une palanquée se perd en quelques secondes. Distance courte, contact visuel, et une lampe aide à se repérer." },
      { id: "froid", n: "Eau à 14 °C", q: "L’eau est à 14 °C. Quel point ajoutes-tu ?", c: ["Le signe « j’ai froid », et on écourte la plongée si quelqu’un le fait", "Rien : le froid ne change rien", "On reste plus longtemps pour se réchauffer en palmant", "On descend plus vite pour finir plus tôt"], e: "Le froid fatigue, augmente la consommation d’air et favorise l’ADD. On le signale, et on écourte sans hésiter." },
      { id: "calme", n: "Mer calme, bonne visibilité", q: "Mer calme et belle visibilité. Que rappelles-tu quand même ?", c: ["De rester groupés : avec une belle visibilité, on a tendance à s’écarter", "Rien, tout va bien", "Que chacun peut faire sa propre plongée", "Qu’on peut dépasser la durée prévue"], e: "Les bonnes conditions rendent la palanquée moins vigilante : les écarts augmentent. Le rappel reste utile." }
    ],
    /* ce que doit contenir un briefing (k : clé, t : texte, w : pourquoi) */
    items: [
      { k: "site", t: "Le site : relief, intérêts, dangers", w: "Chacun sait où il va et ce qu’il faut éviter." },
      { k: "param", t: "Les paramètres fixés par le DP : profondeur maxi et durée", w: "Ce sont les limites communes de la palanquée." },
      { k: "air", t: "La gestion de l’air : mi-pression, réserve, à qui on l’annonce", w: "L’air est la première cause de fin de plongée : on fixe les seuils avant." },
      { k: "orga", t: "L’organisation : qui guide, les positions, les binômes", w: "Chacun sait qui suivre et qui surveiller." },
      { k: "deroul", t: "Le déroulement : descente, itinéraire, demi-tour, remontée", w: "Pas de surprise sous l’eau, chacun anticipe." },
      { k: "signes", t: "Le rappel des signes utilisés", w: "Les signes varient un peu selon les clubs : on se met d’accord." },
      { k: "incident", t: "La conduite à tenir en cas de perte de palanquée ou de problème", w: "En cas de souci, chacun réagit pareil, sans improviser." },
      { k: "secu", t: "La remontée : vitesse, palier de sécurité ou obligatoire", w: "C’est le moment le plus à risque pour l’ADD." },
      { k: "eau", t: "La mise à l’eau et le retour au bateau", w: "Évite les bousculades et les plongeurs isolés en surface." }
    ],
    wrong: [
      { t: "Le récit de ta plus belle plongée", w: "Sympa au bar, mais ça allonge le briefing et on retient moins l’essentiel." },
      { t: "Laisser chacun choisir sa profondeur maxi", w: "Les paramètres sont communs : fixés par le DP, et limités par le plongeur le moins qualifié." },
      { t: "Promettre qu’on verra un mérou", w: "On présente ce qu’on peut voir, sans promesse : on ne veut pas que quelqu’un parte le chercher seul." },
      { t: "Le prix des plongées de la semaine", w: "Hors sujet : le briefing sert la sécurité et la plongée." },
      { t: "Dire qu’on improvisera l’itinéraire en bas", w: "L’itinéraire et le demi-tour se décident avant : sous l’eau on communique mal." }
    ],
    /* plan courant, dans l’ordre */
    plan: [
      { k: "site", t: "Site et conditions" },
      { k: "param", t: "Paramètres : profondeur, durée, air" },
      { k: "orga", t: "Organisation de la palanquée" },
      { k: "deroul", t: "Mise à l’eau et déroulement" },
      { k: "incident", t: "Signes et incidents" },
      { k: "eau", t: "Remontée et retour au bateau" }
    ],
    lost: { q: "« Et si on se perd ? »", c: ["On cherche environ une minute en tournant sur soi et en regardant les bulles, puis on remonte en respectant la vitesse et le palier, et on se retrouve en surface", "On continue la visite seul et on se retrouve au bateau", "On attend au fond que le guide revienne", "On remonte le plus vite possible pour prévenir le bateau"], e: "C’est la procédure la plus répandue. La durée de recherche varie selon les clubs : vérifie celle du tien." },
    who: { q: "Un plongeur demande qui décide de la profondeur et de la durée.", c: ["Le directeur de plongée (DP), dans la limite des prérogatives de chacun", "Le guide, seul", "Le plongeur le plus expérimenté", "Chacun, selon sa forme du jour"], e: "Le DP fixe les paramètres de chaque palanquée. Le guide les annonce et les fait respecter." },
    note: "Prérogatives FFESSM : N1 encadré jusqu’à 20 m, N2 encadré jusqu’à 40 m et autonome jusqu’à 20 m. Mi-pression et réserve : règles courantes, vérifie celles de ton club. À faire valider par ton moniteur."
  };

  /* ---------- Atelier plongées successives ---------- */
  C.succNote = "Les majorations de cet atelier sont des valeurs d’exercice, inventées. Pour une vraie plongée, lis toujours ta table officielle ou suis ton ordinateur. Règles de la MN90 : intervalle de moins de 15 min = consécutive, de 15 min à 12 h = successive, plus de 12 h = isolée. À faire valider par ton moniteur.";

  /* ---------- Défis de la semaine (3 tirés chaque lundi) ---------- */
  C.weekly = [
    { id: "w-ans", k: "ans", n: 150, t: "Répondre à 150 questions", ic: "exam", go: "train" },
    { id: "w-ok", k: "ok", n: 100, t: "Donner 100 bonnes réponses", ic: "check", go: "train" },
    { id: "w-calc", k: "calcOk", n: 20, t: "Réussir 20 calculs", ic: "calc", go: "train" },
    { id: "w-flash", k: "flash", n: 60, t: "Revoir 60 cartes mémo", ic: "cards", go: "flash" },
    { id: "w-days", k: "days", n: 5, t: "Venir 5 jours différents", ic: "calendar", go: "daily" },
    { id: "w-exam", k: "exam", n: 1, t: "Passer un examen blanc", ic: "exam", go: "examen" },
    { id: "w-brief", k: "brief", n: 2, t: "Réussir 2 briefings de palanquée", ic: "chat", go: "brief" },
    { id: "w-succ", k: "succ", n: 3, t: "Résoudre 3 plongées successives sans faute", ic: "table", go: "succ" },
    { id: "w-pc", k: "pc", n: 2, t: "Faire 2 séries du mode ordinateur", ic: "watch", go: "pc" },
    { id: "w-duel", k: "duel", n: 1, t: "Jouer un duel, sur place ou à distance", ic: "swords", go: "club" },
    { id: "w-xp", k: "xp", n: 600, t: "Gagner 600 XP", ic: "bolt", go: "train" },
    { id: "w-srs", k: "srs", n: 30, t: "Répondre à 30 questions à revoir (révisions espacées)", ic: "brain", go: "srs" }
  ];

  /* ---------- Événements de saison (dates MM-JJ, chaque année) ---------- */
  C.events = [
    { id: "fosse", from: "11-01", to: "11-30", ic: "dive", color: "--primary", title: "Saison des fosses", text: "L’hiver, on s’entraîne en fosse et on révise la théorie. Réponds à 200 questions avant la fin du mois.", goal: { k: "ans", n: 200 }, xp: 150 },
    { id: "avent", from: "12-01", to: "12-24", ic: "calendar", color: "--gold", title: "Calendrier de l’Avent des abysses", text: "Une case par jour : viens au moins 12 jours d’ici le 24 décembre pour ouvrir le coffre.", goal: { k: "days", n: 12 }, xp: 200 },
    { id: "hiver", from: "01-02", to: "02-28", ic: "calc", color: "--world-e2", title: "Défi d’hiver : les calculs", text: "Pendant l’hiver, réussis 60 calculs : Mariotte, flottabilité, consommation, tables.", goal: { k: "calcOk", n: 60 }, xp: 200 },
    { id: "reprise", from: "03-01", to: "04-30", ic: "chat", color: "--ok", title: "Reprise de saison", text: "Avant les premières plongées en mer, réussis 4 briefings de palanquée.", goal: { k: "brief", n: 4 }, xp: 180 },
    { id: "printemps", from: "05-01", to: "06-20", ic: "watch", color: "--primary", title: "Printemps des ordinateurs", text: "Fais 5 séries du mode ordinateur et 5 plongées successives pour préparer les sorties.", goal: { k: "succ", n: 5 }, xp: 180 },
    { id: "grandbleu", from: "06-21", to: "08-31", ic: "sun", color: "--accent", title: "Le grand bleu", text: "L’été, garde le rythme : passe 3 examens blancs pour arriver prêt à la rentrée.", goal: { k: "exam", n: 3 }, xp: 200 },
    { id: "rentree", from: "09-01", to: "10-15", ic: "users", color: "--gold", title: "Rentrée du club", text: "Défie les copains du club : joue 3 duels, sur place ou à distance.", goal: { k: "duel", n: 3 }, xp: 150 },
    { id: "abysses", from: "10-16", to: "10-31", ic: "fish", color: "--world-e2", title: "Nuit des abysses", text: "Revois 80 cartes mémo avant la fin du mois.", goal: { k: "flash", n: 80 }, xp: 150 }
  ];

  /* ---------- Trophées ---------- */
  C.addBadges([
    { id: "brief1", icon: "chat", name: "Briefeur", desc: "Réussir un briefing de palanquée", test: { k: "v19", f: "brief", n: 1 } },
    { id: "succ1", icon: "table", name: "Maître des successives", desc: "Résoudre 5 plongées successives sans faute", test: { k: "v19", f: "succ", n: 5 } },
    { id: "week1", icon: "trophy", name: "Semaine parfaite", desc: "Terminer les 3 défis d’une semaine", test: { k: "v19", f: "weeks", n: 1 } },
    { id: "event1", icon: "sparkle", name: "De saison", desc: "Terminer un événement de saison", test: { k: "v19", f: "events", n: 1 } },
    { id: "rduel1", icon: "swords", name: "Duel à distance", desc: "Jouer un duel à distance avec un code", test: { k: "v19", f: "rduel", n: 1 } }
  ]);

  /* ---------- Mode ordinateur : nouveaux cas (ajoutés à la fin) ---------- */
  C.addComputer([
    { scr: { d: "0.0", max: "24.0", t: "0", alarm: "DESAT 14h", bar: 0, tank: 200 }, q: "En surface après la plongée, l’écran affiche « DESAT 14h ». Qu’est-ce que ça veut dire ?", c: ["Il faudra environ 14 h pour éliminer l’azote en excès", "Tu dois faire 14 h de palier", "Ta batterie tient encore 14 h", "Tu ne peux plus plonger pendant 14 jours"], a: 0, e: "C’est le temps de désaturation estimé : ton corps garde de l’azote. Une 2e plongée reste possible, mais elle sera plus courte sans palier." },
    { scr: { d: "0.0", max: "30.0", t: "0", alarm: "NO FLY 22h", bar: 0, tank: 200 }, q: "Ton avion décolle dans 16 h. L’écran affiche « NO FLY 22h ».", c: ["Tu pars quand même, la cabine est pressurisée", "Tu décales le vol, ou tu aurais dû arrêter de plonger plus tôt", "Tu fais un palier en surface pour gagner du temps", "Tu éteins l’ordinateur pour effacer l’alerte"], a: 1, e: "En cabine, la pression est plus faible qu’au niveau de la mer : voler trop tôt augmente le risque d’ADD. Respecte l’interdiction de vol affichée et les consignes de ton club." },
    { scr: { d: "20.1", max: "20.4", t: "9", ndl: "18", bar: 1, tank: 170 }, q: "2e plongée de la journée, à 20 m. Ce matin, à la même profondeur, ton NDL était bien plus long. Pourquoi ?", c: ["L’ordinateur est en panne", "L’eau est plus froide, c’est tout", "Il reste de l’azote de la 1re plongée : l’ordinateur en tient compte", "Tu respires trop vite"], a: 2, e: "C’est l’azote résiduel : l’ordinateur raccourcit la durée sans palier. C’est l’équivalent de la majoration quand tu utilises la table." },
    { scr: { d: "0.0", max: "0.0", t: "0", alarm: "BATT LOW", bar: 0, tank: 200 }, q: "Sur le bateau, avant de t’équiper : « BATT LOW ».", c: ["Tu plonges, ça tiendra bien une heure", "Tu l’éteins pendant la plongée pour économiser", "Tu le prêtes à ton binôme", "Tu changes ou recharges la batterie avant, sinon tu préviens le DP"], a: 3, e: "Un ordinateur qui s’éteint en plongée te prive de la profondeur, de la durée et des paliers. On règle le problème avant de se mettre à l’eau." },
    { scr: { d: "0.0", max: "0.0", t: "0", bar: 0, tank: 200, dual: { ndl2: "0 plongée en mémoire" } }, q: "Ton binôme a remis son ordinateur à zéro entre les deux plongées.", c: ["Son ordinateur ignore la 1re plongée : il ne doit pas s’y fier pour la 2e, on prévient le DP", "C’est mieux, il repart à neuf", "Il suffit de descendre un peu moins", "On fera la moyenne de vos deux ordinateurs"], a: 0, e: "Remis à zéro, l’ordinateur croit que tu n’as pas plongé : il est trop optimiste. La palanquée suit le plus pénalisant, et le DP décide." },
    { scr: { d: "20.6", max: "20.8", t: "14", ndl: "25", bar: 0, alarm: "MAX DEPTH", tank: 150 }, q: "Tu plonges en autonomie, 20 m maxi. L’alarme de profondeur que tu as réglée à 20 m sonne.", c: ["Tu la coupes et tu continues", "Tu remontes de quelques mètres et tu préviens ton binôme", "Tu descends voir plus bas puisque tout va bien", "Tu remontes directement en surface"], a: 1, e: "Régler l’alarme sur sa profondeur maxi est une bonne habitude. Quand elle sonne, on corrige calmement, sans remontée brutale." },
    { scr: { d: "8.0", max: "22.0", t: "27", ndl: "35", bar: 0, tank: 110 }, q: "Vous êtes remontés de 22 à 8 m pour chercher le bateau. Ton binôme veut redescendre à 20 m.", c: ["Bonne idée, le NDL est large", "Oui, si on redescend vite", "Non : ces allers-retours (profil en yoyo) augmentent le risque d’ADD", "Oui, si l’ordinateur ne bipe pas"], a: 2, e: "Le profil en yoyo favorise la formation de bulles. On organise la plongée pour ne pas redescendre après être remonté." },
    { scr: { d: "9.2", max: "38.0", t: "30", stop: "6 m · 2'", deco: true, bar: 2, tank: 90 }, q: "L’écran affiche un palier obligatoire « 6 m · 2' ».", c: ["Tu fais tout à 3 m, c’est plus confortable", "Tu t’arrêtes à 6 m, juste en dessous, pendant 2 min, puis tu suis le palier suivant", "Tu fais 2 min n’importe où entre 0 et 10 m", "Tu le sautes et tu rallonges celui de 3 m"], a: 1, e: "Le palier se fait à la profondeur indiquée, juste en dessous si besoin, jamais au-dessus. L’ordinateur affiche ensuite le palier suivant." },
    { scr: { d: "0.0", max: "34.0", t: "0", alarm: "LOCK 24h", bar: 0, tank: 70 }, q: "Après une remontée trop rapide et un palier omis, l’ordinateur est verrouillé pour 24 h.", c: ["Tu plonges l’après-midi avec l’ordinateur d’un copain", "Tu replonges pour refaire le palier", "Pas d’autre plongée, tu surveilles l’apparition de signes et tu préviens le DP", "Tu le remets à zéro"], a: 2, e: "Le verrouillage signale un profil dangereux. Surveille fatigue, douleurs ou fourmillements : oxygène et alerte au moindre signe." },
    { scr: { d: "3.0", max: "35.0", t: "38", stop: "3 m · 6'", deco: true, bar: 1, tank: 40, alarm: "TANK" }, q: "Palier obligatoire de 6 min à 3 m, et il te reste 40 bar.", c: ["Tu sors sans finir le palier", "Tu préviens ton binôme, tu restes près de lui et tu fais le palier, avec son octopus si besoin", "Tu fais le palier à 6 m, ça ira plus vite", "Tu finis seul pour ne pas déranger"], a: 1, e: "Le palier obligatoire reste prioritaire. Ton binôme peut te donner de l’air : c’est pour ça qu’on remonte ensemble et qu’on fixe la réserve au briefing." },
    { scr: { d: "0.0", max: "25.0", t: "0", alarm: "SURF 0:45", bar: 0, tank: 200 }, q: "Sur le bateau, l’écran indique « SURF 0:45 ».", c: ["Le temps restant avant d’avoir le droit de replonger", "Le temps passé en surface depuis la sortie, c’est ton intervalle", "Ta durée de plongée", "Ta réserve d’air"], a: 1, e: "C’est l’intervalle de surface. Avec la table, c’est lui qui sert à lire l’azote résiduel avant une plongée successive." },
    { scr: { d: "28.0", max: "28.5", t: "22", stop: "3 m · 1'", deco: true, bar: 0, tank: 120 }, q: "Un palier obligatoire vient d’apparaître alors que la plongée était prévue sans palier.", c: ["Tu restes pour voir s’il disparaît", "Tu l’ignores, il n’était pas prévu", "Tu préviens la palanquée, vous remontez et vous faites ce palier", "Tu descends un peu pour le faire disparaître"], a: 2, e: "Tu as dépassé la courbe de sécurité. On n’essaie pas d’« effacer » le palier : on remonte calmement et on le fait." }
  ]);

  /* ---------- Aide ---------- */
  Object.assign(C.help, {
    brief: { t: "Le briefing de palanquée", ic: "chat", go: "brief", goL: "Faire un briefing",
      html: `<p>Avant chaque plongée, le guide (ou le binôme en autonomie) fait un briefing. Ici, tu prépares celui d’une plongée tirée au hasard : site, conditions, palanquée.</p><p>En 3 étapes : choisir ce qu’il faut dire, le mettre dans l’ordre, puis répondre aux questions de la palanquée. À la fin, tu obtiens un briefing modèle à relire.</p>` },
    succ: { t: "L’atelier plongées successives", ic: "table", go: "succ", goL: "Ouvrir l’atelier",
      html: `<p>Chaque cas te fait dérouler la méthode, étape par étape : type de plongée, groupe de plongée successive (GPS), azote résiduel, majoration, durée et profondeur pour lire la 2e plongée.</p><p>Les majorations sont des valeurs d’exercice : la vraie valeur se lit toujours dans ta table.</p>` },
    week: { t: "Défis de la semaine et événements", ic: "trophy", go: "quests", goL: "Voir les défis",
      html: `<p>Chaque lundi, 3 nouveaux défis. Chacun rapporte 50 XP, et les 3 réussis donnent un bonus de 100 XP.</p><p>Selon la période de l’année, un événement de saison propose un objectif plus long et une récompense.</p>` },
    club: { t: "Le club : duels et classement", ic: "users", go: "club", goL: "Ouvrir le club",
      html: `<p><b>Duel sur place</b> : à deux sur le même téléphone. <b>Duel à distance</b> : tu joues 10 questions, puis tu envoies le code (ou le lien) à un ami. Il joue les mêmes questions et te renvoie son code de réponse.</p><p><b>Classement du club</b> : chacun partage sa carte de score. Rien ne passe par un serveur : tout reste sur les téléphones.</p>` }
  });
})();
