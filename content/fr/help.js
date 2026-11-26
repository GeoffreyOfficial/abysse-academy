/* =====================================================================
   Abysse Academy · aide intégrée (boutons « ? ») et sources
   - AA.content.help[clé] = { t, ic, html, go, goL }
       t    : titre de la fiche
       ic   : icône
       html : explication (HTML simple)
       go   : écran ou action à ouvrir (« daily », « five », « flash »…)
       goL  : libellé du bouton d'action
   - AA.content.sources : références générales, par domaine.
   - AA.content.sourceMap : domaine(s) de chaque module (par défaut, celui du monde).
   Pour corriger un texte : modifier ce fichier, puis `python3 build.py`.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  C.help = {
    flash: { t: "Les flashcards", ic: "cards", go: "flash", goL: "Réviser mes cartes",
      html: `<p>Une <b>flashcard</b> est une petite carte à deux faces : une <b>question</b> devant, la <b>réponse</b> derrière.</p>
        <ol><li>Lis la question et réponds <b>dans ta tête</b>.</li><li>Touche « Voir la réponse ».</li><li>Dis honnêtement si tu savais : <b>« Je savais »</b> ou <b>« À revoir »</b>.</li></ol>
        <p>L’appli range chaque carte dans une <b>boîte</b> : une carte bien sue revient dans 1, puis 3, 7, 14, 30 jours. Une carte ratée revient tout de suite. C’est la <b>répétition espacée</b> : tu révises juste avant d’oublier.</p>` },
    daily: { t: "La plongée du jour", ic: "play", go: "daily", goL: "Lancer la plongée du jour",
      html: `<p>Une série de <b>10 questions choisies pour toi</b> : tes erreurs récentes, tes doutes, ton thème le plus faible, des rappels anciens et 2 calculs.</p><p>Fais-la une fois par jour : c’est la façon la plus efficace de progresser (+30 XP la première fois).</p>` },
    five: { t: "Le mode 5 minutes", ic: "timer", go: "five", goL: "Lancer 5 minutes",
      html: `<p>Un mélange rapide de cartes, d’erreurs et de nouveautés, qui s’arrête tout seul au bout de 5 minutes. Idéal dans les transports ou en attendant le bateau.</p>` },
    quests: { t: "Les quêtes", ic: "flag", go: "quests", goL: "Voir mes quêtes",
      html: `<p><b>Quêtes du jour</b> : 3 petits objectifs qui changent chaque jour. <b>Touche une quête pour la faire</b> : l’appli t’emmène au bon endroit.</p>
        <p>Quand la barre est pleine, va dans <b>Profil › Quêtes</b> et touche <b>+20 XP</b> pour récupérer ta récompense. Les 3 quêtes faites = bonus de 30 XP.</p>
        <p><b>Chapitres</b> : les grandes étapes de ton parcours (N2, RIFAP, Initiateur…), à finir sur plusieurs semaines.</p>` },
    streak: { t: "La flamme : ta série", ic: "flame", go: "daily", goL: "Garder ma série",
      html: `<p>La flamme compte les <b>jours d’affilée</b> où tu as répondu à au moins une question.</p><p>Un seul quiz, une seule carte ou la question du jour suffit à la garder allumée. Si tu sautes un jour, elle repart de zéro.</p>` },
    xp: { t: "L’éclair : tes points d’expérience (XP)", ic: "bolt", go: "profile", goL: "Voir mon niveau",
      html: `<p>Chaque bonne réponse, chaque quête et chaque étoile te rapporte des <b>XP</b>. Ils font monter ton <b>niveau</b> de joueur (pas ton niveau de plongée !).</p>
        <p>Le niveau fait évoluer ton <b>avatar</b>, agrandit ton <b>aquarium</b> et débloque des décors.</p>
        <ul><li>Bonne réponse : +10 XP (plus en combo)</li><li>Étoile gagnée : +25 XP</li><li>Quête : +20 XP</li><li>Plongée du jour : +30 XP</li></ul>` },
    cursus: { t: "Le cursus des brevets", ic: "layers", go: "cursus", goL: "Voir le cursus",
      html: `<p>Le chemin des niveaux FFESSM : <b>N1 → N2 → N3</b> pour plonger, <b>RIFAP</b> pour secourir, <b>Initiateur, N4, E2</b> pour encadrer. Pour chaque niveau : pour qui, conditions d’accès, ce qu’il permet, l’examen et les équivalences (ANMP, CMAS, ISO).</p>` },
    countdown: { t: "Le compte à rebours", ic: "calendar", go: "settings", goL: "Changer la date",
      html: `<p>Le nombre de jours avant ton examen, si tu as indiqué sa date. Tu peux la changer dans les réglages.</p>` },
    exam: { t: "L’examen blanc", ic: "exam", go: "examquick", goL: "Examen rapide",
      html: `<p>Une épreuve chronométrée <b>sans correction pendant l’épreuve</b>, comme le jour J, sur le monde que tu vises. Tu reçois une note sur 20 et le détail par thème à la fin.</p><p>Le format exact de ton examen est à confirmer avec ton moniteur.</p>` },
    doubt: { t: "Les doutes", ic: "doubt", go: "train", goL: "S’entraîner",
      html: `<p>Pendant un quiz, touche <b>« J’hésite »</b> (ou appuie longuement sur une réponse) quand tu n’es pas sûr. Même si tu réponds juste, la question reviendra : une bonne réponse au hasard n’est pas une connaissance.</p>` },
    calcs: { t: "La salle des calculs", ic: "calc", go: "train", goL: "S’entraîner",
      html: `<p>Des calculs <b>tirés au hasard</b> à chaque fois (pressions, volumes, autonomie, pressions partielles…) : jamais deux fois les mêmes chiffres. Chaque correction explique la méthode pas à pas.</p>` },
    apnee: { t: "Le défi apnée", ic: "timer", go: "apnee", goL: "Relever le défi",
      html: `<p>60 secondes pour répondre juste au plus de questions possible. Chaque erreur te coûte 5 secondes d’air.</p>` },
    duel: { t: "Le duel", ic: "users", go: "club", goL: "Lancer un duel",
      html: `<p>Deux joueurs sur le même téléphone répondent chacun leur tour aux mêmes questions. Parfait entre élèves au club.</p>` },
    pc: { t: "Le mode ordinateur", ic: "watch", go: "pc", goL: "Ouvrir",
      html: `<p>Des écrans d’ordinateur de plongée à lire : profondeur, durée, palier, alarmes. Tu dois dire ce qu’il faut faire.</p>` },
    scen: { t: "Les scénarios d’accident", ic: "heart", go: "scen", goL: "Ouvrir",
      html: `<p>Une situation réelle (essoufflement, panne d’air, malaise…) : tu choisis les bons gestes, dans le bon ordre.</p>` },
    tables: { t: "L’atelier des tables", ic: "table", go: "tables", goL: "Ouvrir",
      html: `<p>Saisis la table de décompression de <b>ton club</b> pour t’entraîner à la lire. L’appli ne reproduit pas les tables officielles : c’est la tienne qui compte.</p>` },
    calc: { t: "La calculette de plongée", ic: "calc", go: "calc", goL: "Ouvrir",
      html: `<p>Des outils pour vérifier un calcul : pression, volume, autonomie, pressions partielles.</p>` },
    example: { t: "Les exemples pas à pas", ic: "bulb", go: "calcs", goL: "S’entraîner aux calculs",
      html: `<p>Chaque exemple est <b>tiré au hasard</b> : touche « Un autre exemple » pour changer les chiffres. Essaie d’abord seul, puis touche « Voir la solution » pour suivre chaque étape et comprendre <b>pourquoi</b> on la fait.</p><p>Les quiz utilisent d’autres chiffres : apprendre la méthode, pas la réponse.</p>` },
    stars: { t: "Les étoiles", ic: "star", go: "map", goL: "Voir la carte",
      html: `<p>Chaque thème se termine par un quiz : <b>1 étoile</b> à 50 %, <b>2</b> à 80 %, <b>3</b> à 100 %. Une étoile ouvre le thème suivant (en mode « Apprendre »).</p><p>Quand tous les thèmes d’un monde ont une étoile, le <b>boss</b> du monde se réveille.</p>` },
    map: { t: "La carte", ic: "map", go: "parcours", goL: "Gérer mon parcours",
      html: `<p>Chaque <b>monde</b> est un niveau de plongée (Découverte, N1, N2…). Tu descends de thème en thème, comme une vraie plongée : plus tu avances, plus c’est profond.</p>
        <ul><li><b>Bulle qui clignote</b> : ton prochain thème.</li><li><b>Or</b> : thème réussi (au moins 1 étoile).</li><li><b>Cadenas</b> : finis le thème d’avant, ou passe ce monde en « Réviser » dans « Mon parcours ».</li><li><b>« ! » orange</b> : thème à réviser (pas revu depuis longtemps).</li><li><b>Boss</b> en bas : le défi final du monde.</li></ul>` },
    parcours: { t: "Mon parcours", ic: "compass", go: "parcours", goL: "Ouvrir Mon parcours",
      html: `<p>Pour chaque monde, tu choisis :</p><ul><li><b>Apprendre</b> : cours complets, les thèmes s’ouvrent un par un.</li><li><b>Réviser</b> : tout est ouvert, les cours commencent par « À retenir ».</li><li><b>Passer</b> : le monde sort de tes révisions, sans bloquer la suite.</li></ul><p>« J’ai obtenu ce niveau » marque un brevet réel. Le <b>test de positionnement</b> valide ce que tu sais déjà.</p>` },
    stale: { t: "Thèmes à réviser", ic: "refresh", go: "stale", goL: "Réviser maintenant",
      html: `<p>Un thème réussi mais <b>pas revu depuis longtemps</b> risque de s’oublier. L’appli te le signale avec un « ! » orange. Une courte révision suffit à le remettre à jour.</p>` },
    errors: { t: "Mode sauvetage", ic: "buoy", go: "errors", goL: "Sauver mes erreurs",
      html: `<p>Reprend les questions que tu as ratées. Chaque erreur corrigée rapporte un bonus de XP. Une question disparaît de la liste quand tu y réponds juste.</p>` },
    mistakes: { t: "Erreurs fréquentes", ic: "brain", go: "mistakes", goL: "Voir les pièges",
      html: `<p>Les pièges classiques de l’examen, avec <b>ta</b> statistique sur chacun. Touche un piège pour l’expliquer et t’entraîner dessus.</p>` },
    qod: { t: "La question du jour", ic: "sun",
      html: `<p>Une question tirée chaque jour parmi tes thèmes ouverts. Réponds directement sur l’accueil : +15 XP si c’est juste. Ta réponse est gardée jusqu’au lendemain.</p>` },
    validate: { t: "« À faire valider par ton moniteur »", ic: "check", go: "valider", goL: "Voir la liste",
      html: `<p>Il n’y a <b>rien à faire dans l’appli</b>. C’est la liste des points que l’appli ne peut pas garantir : format exact de ton examen, version des tables, règles de ton club…</p><p>Montre-la à ton moniteur. Quand il a confirmé un point, coche-le : il passe en vert. S’il te dit autre chose, touche « Signaler » pour qu’on corrige l’appli.</p>` },
    boss: { t: "Les boss", ic: "swords", go: "train", goL: "S’entraîner",
      html: `<p>À la fin de chaque monde, un boss te pose une série de questions sur tout le monde. Chaque bonne réponse lui retire un point de vie ; chaque erreur te coûte de l’air. Le battre ouvre souvent le monde suivant.</p>` },
    aquarium: { t: "L’aquarium", ic: "fish", go: "aquarium", goL: "Ouvrir l’aquarium",
      html: `<p>Chaque espèce rencontrée dans les cours et les aventures rejoint ton aquarium. Ton niveau l’agrandit et débloque des décors. Nourris tes poissons une fois par jour : +5 XP.</p>` },
    story: { t: "Les aventures", ic: "scroll", go: "story", goL: "Jouer une aventure",
      html: `<p>Des histoires de plongée où <b>tu choisis</b> quoi faire. Chaque choix est expliqué : une bonne façon de vérifier que tu sais appliquer le cours en situation.</p>` },
    sim: { t: "Le simulateur", ic: "gauge", go: "sim", goL: "Ouvrir le simulateur",
      html: `<p>Pilote une plongée : descente, remontée, paliers. L’appli surveille ta vitesse, ton air et ta saturation. Touche <b>Pause</b> (ou Espace) à tout moment pour réfléchir.</p><p>Modèle pédagogique simplifié : il ne remplace ni tes tables ni ton ordinateur.</p>` },
    reports: { t: "Signaler un problème", ic: "flag", go: "reports", goL: "Mes signalements",
      html: `<p>Une erreur, une explication pas claire, une source à vérifier ? Touche <b>« Signaler »</b> sur un cours ou une question.</p><p>Tes signalements sont gardés dans <b>Profil › Mes signalements</b>. Exporte-les en un fichier et envoie-le : chaque signalement indique exactement quel texte corriger.</p>` },
    sources: { t: "D’où viennent les cours ?", ic: "book", go: "sources", goL: "Toutes les sources",
      html: `<p>Les cours s’appuient sur les <b>textes officiels</b> (Code du sport), les <b>référentiels des fédérations</b> (FFESSM, ANMP) et des <b>ouvrages de référence</b> en physique et médecine de plongée.</p><p>Ce sont des sources générales : les règles évoluent. En cas de doute, la version en vigueur et ton moniteur ont toujours raison. Les points incertains sont marqués « à faire valider par ton moniteur ».</p>` }
  };

  /* Sources générales, par domaine. Pas de citation inventée : on renvoie au document de référence. */
  C.sources = {
    reg: { t: "Réglementation", list: [
      ["Code du sport, partie réglementaire : établissements organisant la plongée subaquatique (articles A322-71 et suivants, annexes III-14 et suivantes)", "https://www.legifrance.gouv.fr", "Aptitudes, espaces d’évolution, encadrement, matériel obligatoire."],
      ["FFESSM : manuel de formation technique (MFT) et cursus des brevets", "https://ffessm.fr", "Contenus et prérogatives des niveaux, RIFAP, initiateur, E2."],
      ["ANMP : cursus et standards de formation", "https://www.anmp-plongee.com", "Équivalences N1 ANMP et cursus associatifs."] ] },
    phys: { t: "Physique de la plongée", list: [
      ["Lois des gaz : Boyle-Mariotte, Dalton, Henry ; principe d’Archimède", "", "Physique générale, identique dans tous les manuels de plongée."],
      ["FFESSM : contenus théoriques des niveaux 1 à 4 (commission technique nationale)", "https://ffessm.fr", "Exemples de calculs attendus à l’examen."] ] },
    med: { t: "Médecine et accidents", list: [
      ["FFESSM : commission médicale et de prévention nationale", "https://medical.ffessm.fr", "Accidents de plongée, contre-indications, conduite à tenir."],
      ["DAN Europe : ressources de prévention", "https://www.daneurope.org", "Accidents de décompression, oxygénothérapie, prévention."],
      ["RIFAP : référentiel de la FFESSM", "https://ffessm.fr", "Alerte, oxygénation, gestes de premiers secours."] ] },
    deco: { t: "Décompression et tables", list: [
      ["Tables MN90 (Marine nationale) et procédures fédérales", "", "Les valeurs des tables ne sont pas reproduites ici : saisis la table de ton club dans l’atelier."],
      ["Manuels de ton ordinateur de plongée", "", "Chaque modèle a son algorithme : suis toujours son manuel."] ] },
    gear: { t: "Matériel", list: [
      ["Fiches techniques des fabricants et règles d’inspection des blocs (requalification, inspection visuelle)", "", "Fréquences à faire confirmer par ton club : elles dépendent des règles en vigueur."] ] },
    env: { t: "Milieu et biologie", list: [
      ["DORIS : données d’observations pour la reconnaissance et l’identification de la faune et la flore subaquatiques (FFESSM)", "https://doris.ffessm.fr", "Espèces, risques (piqûres, morsures), protection."] ] },
    teach: { t: "Pédagogie", list: [
      ["FFESSM : cursus initiateur et E2, guide de l’enseignant", "https://ffessm.fr", "Organisation d’une séance, progression, sécurité."] ] },
    nx: { t: "Nitrox", list: [
      ["FFESSM et ANMP : qualifications nitrox", "https://ffessm.fr", "PpO₂ maximale, analyse du mélange, profondeur maximale."],
      ["Lois de Dalton (pressions partielles)", "", "Calculs de MOD et de profondeur équivalente."] ] }
  };
  /* Domaine(s) par module : par mot-clé de l'identifiant, sinon par monde. */
  C.sourceRules = [
    [/regl|prerog|orga|secu|guide|autonomie|n1-secu|pa20|cadre/, ["reg"]],
    [/pression|flott|archi|dalton|henry|gaz|phys|optique|acoust|vol/, ["phys"]],
    [/accid|baro|adb|dcs|rifap|oxy|alerte|secour|sant|oreill|essouf|noyade/, ["med"]],
    [/table|deco|desat|palier|ordi/, ["deco"]],
    [/mater|equip|bloc|detend|gilet/, ["gear"]],
    [/milieu|faune|flore|bio|environ/, ["env"]],
    [/ensei|pedag|e1-|e2-/, ["teach"]],
    [/^nx-/, ["nx", "phys"]]
  ];
  C.sourcesFor = m => {
    const out = new Set();
    C.sourceRules.forEach(([re, ks]) => { if (re.test(m.id)) ks.forEach(k => out.add(k)); });
    if (m.sources) m.sources.forEach(k => out.add(k));
    if (!out.size) out.add(m.world === "e1" || m.world === "e2" ? "teach" : m.world === "rifap" ? "med" : "reg");
    return [...out].filter(k => C.sources[k]);
  };
})();

/* 1.7 : aides des nouveautés */
Object.assign(AA.content.help, {
  srs: { t: "Les révisions espacées", ic: "brain", go: "srs", goL: "Réviser maintenant",
    html: `<p>Chaque question que tu as déjà vue a maintenant une <b>date de retour</b>.</p><ul><li>Bonne réponse sans doute : elle revient dans 2, puis 4, 9, 20 et 45 jours.</li><li>Erreur ou doute : elle revient <b>dès demain</b>.</li></ul><p>Tu révises juste avant d’oublier : c’est la méthode la plus efficace pour retenir longtemps. La plongée du jour commence aussi par ces questions.</p>` },
  explain: { t: "Explique-moi", ic: "play",
    html: `<p>Quand tu te trompes, touche <b>« Explique-moi »</b> : un mini-cours de 30 secondes s’ouvre, en 4 ou 5 étapes animées. La notion, le schéma, la méthode, le piège dans lequel tu es tombé, et ce qu’il faut retenir.</p><p>Tu peux mettre en pause, revenir en arrière ou ouvrir le cours complet.</p>` },
  carnet: { t: "Le carnet de validation", ic: "teach", go: "carnet", goL: "Ouvrir mon carnet",
    html: `<p>Quand ton moniteur a vu avec toi un thème (en cours, en piscine ou en mer), il peut le <b>valider</b> : son nom, la date et une remarque.</p><p>Le thème porte alors une coche dans la carte et dans le cours. Tu peux partager ou télécharger ton carnet pour le montrer au club.</p><p class="small">Le carnet est une aide pour suivre ta formation : il ne remplace pas le livret officiel de ta fédération.</p>` },
  net: { t: "Hors ligne et sauvegarde", ic: "shield",
    html: `<p>Ta progression est enregistrée <b>sur l’appareil</b> à chaque réponse, et une copie de secours est faite chaque jour. Sans réseau, l’appli continue de fonctionner normalement.</p>` }
});
