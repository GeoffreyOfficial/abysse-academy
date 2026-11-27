/* Abysse Academy · contenu FR · Aventures 2.4
   Une aventure complète par niveau et par rôle : baptisé, encadré, autonome,
   plongeur profond, guide, initiateur, moniteur, secouriste, nitrox.
   Un mauvais choix avec « go » mène à sa conséquence : on peut se rattraper
   (scène alt) ou l'aventure finit mal (end + bad), avec l'explication et une
   reprise juste avant l'erreur. Les personnages et les sites sont inventés.
   Les valeurs réglementaires suivent le Code du sport et la FFESSM au moment
   de l'écriture : « À faire valider » auprès de ton moniteur. */
(function () {
  const C = AA.content;
  const O = (t, e, m, go) => ({ t, ok: 1, e, m, go });
  const X = (t, e, m, go) => (go ? { t, ok: 0, e, m, go } : { t, ok: 0, e, m });

  /* ---------- Découverte : le baptême en mer ---------- */
  C.addStory({
    id: "bapt-mer", world: "decouverte", role: "Baptisé", icon: "wave", xp: 80, title: "Premières bulles en mer", sub: "Ton baptême depuis le bateau, avec Karim, ton moniteur.",
    unlock: null, start: "a1", cast: { karim: "Karim, moniteur", ines: "Inès, ta sœur" },
    nodes: {
      a1: { depth: 0, scene: "Sur le ponton, 10 h. Soleil, eau à 21 °C.", who: "karim", text: "Avant de t’équiper, dis-moi s’il y a quelque chose que je dois savoir sur ta santé.", q: "Tu as eu un gros rhume la semaine dernière et ton nez est encore un peu bouché. Que réponds-tu ?",
        choices: [
          X("Je préfère ne pas en parler, sinon il risque d’annuler mon baptême.", "Un nez bouché empêche souvent d’équilibrer les oreilles. Le moniteur doit le savoir pour décider, et il préfère décaler qu’abîmer une oreille.", "d-oreilles"),
          O("Je lui parle de mon rhume et du nez bouché, il décidera avec moi.", "Le moniteur a besoin de tout savoir pour ta sécurité. Ici, le nez se débouche bien en surface : il te fera descendre très doucement.", "d-oreilles", "a2"),
          X("Je lui dis que tout va bien, un rhume guéri ne compte plus vraiment.", "Les sinus et la trompe d’Eustache restent souvent enflammés quelques jours. C’est justement l’info dont il a besoin.", "d-oreilles") ] },
      a2: { depth: 0, scene: "Karim te tend un masque.", who: "karim", text: "Vérifie qu’il est à ta taille.", q: "Comment le vérifies-tu ?",
        choices: [
          X("Je serre la sangle au maximum pour qu’aucune goutte d’eau ne puisse entrer.", "Trop serré, il marque le visage et fuit même davantage. Un bon masque tient presque seul.", "d-materiel"),
          X("Je choisis le plus grand modèle, il donne un champ de vision plus large.", "Un masque trop grand laisse entrer l’eau. La taille se choisit sur ton visage, pas sur le champ de vision.", "d-materiel"),
          O("Je le pose sans la sangle et j’inspire par le nez : il doit tenir seul.", "C’est le test classique : s’il reste collé quand tu inspires par le nez, il est étanche. La sangle sert juste à le maintenir.", "d-materiel", "a3") ] },
      a3: { depth: 0, scene: "Dans l’eau, tenue par Karim, la tête sous la surface.", text: "Tu entends ta respiration, fort. Ton cœur accélère un peu.", q: "Que fais-tu ?",
        choices: [
          X("J’enlève le détendeur pour reprendre une vraie bouffée d’air frais.", "Sans détendeur, la tête dans l’eau, tu bois la tasse. Le détendeur donne de l’air normal : c’est seulement le bruit qui surprend.", "d-bapteme", "a3b"),
          O("Je souffle longuement par la bouche, puis j’inspire calmement.", "Souffler d’abord, longtemps : c’est ce qui calme le rythme. Le bruit des bulles devient vite rassurant.", "d-bapteme", "a4"),
          X("Je respire vite et fort, pour être sûre d’avoir assez d’air.", "Respirer vite fatigue et augmente l’impression de manquer. On fait l’inverse : expiration longue, inspiration tranquille.", "d-bapteme") ] },
      a3b: { depth: 0, alt: true, scene: "Tu as bu la tasse et tu tousses.", who: "karim", text: "Karim te tient, te remet le détendeur en bouche et te regarde dans les yeux. « Doucement. Souffle. »", q: "Et maintenant ?",
        choices: [
          X("Je lui fais tout de suite le signe « ça va » pour ne pas le décevoir.", "On fait « ça va » seulement quand c’est vrai. Le moniteur a besoin d’un signe honnête pour décider.", "d-bapteme"),
          O("Je souffle longuement, puis je fais « ça va » quand c’est vrai.", "Bien rattrapé. Tu as compris qu’on garde le détendeur et que l’air arrive normalement.", "d-bapteme", "a4"),
          X("Je lui fais signe de tout arrêter, j’ai compris que ce n’est pas pour moi.", "C’est possible, mais un incident comme ça se passe souvent en dix secondes. Essaie d’abord de respirer calmement avec lui.", "d-bapteme") ] },
      a4: { depth: 2, scene: "Karim te fait descendre le long d’un rocher.", text: "À 2 m, tu sens une légère pression dans les oreilles.", q: "Que fais-tu ?",
        choices: [
          O("Je pince le nez et je souffle doucement, puis je recommence souvent.", "On équilibre tôt et souvent, avant d’avoir mal. Toujours en douceur.", "d-oreilles", "a5"),
          X("J’attends d’avoir mal, comme ça je sais que c’est vraiment nécessaire.", "Attendre la douleur, c’est déjà trop tard : l’écart de pression est grand et plus difficile à rattraper.", "d-oreilles"),
          X("J’ai déjà équilibré en surface, c’est fait pour toute la descente.", "La pression augmente à chaque mètre : il faut équilibrer pendant toute la descente.", "d-oreilles") ] },
      a5: { depth: 4, scene: "4 m. L’oreille droite passe, la gauche reste bloquée et commence à faire mal.", q: "Que fais-tu ?",
        choices: [
          X("Je souffle très fort, nez pincé, pour que ça passe d’un coup.", "Un Valsalva en force peut léser l’oreille. On remonte un peu au lieu de forcer.", "d-oreilles", "a5bad"),
          X("Je continue de descendre derrière Karim sans rien montrer, ça va passer.", "Plus tu descends, plus l’écart augmente : c’est le barotraumatisme assuré. Il faut prévenir.", "d-oreilles"),
          O("Je montre mon oreille à Karim, on remonte d’un mètre et je réessaie.", "En remontant un peu, l’écart diminue et l’oreille se débloque plus facilement. Karim adapte la descente.", "d-oreilles", "a6") ] },
      a5bad: { depth: 0, end: true, bad: true, retry: "a5", title: "Baptême écourté", text: "Une douleur vive, un vertige : Karim te ramène en surface. Le médecin parlera d’un barotraumatisme de l’oreille. Quelques semaines sans plonger.",
        why: "Forcer sur une oreille bloquée crée une surpression brutale. Il fallait signaler, remonter un peu et réessayer doucement.", learn: ["On équilibre tôt, souvent et doucement.", "Oreille bloquée : on remonte d’un mètre, on ne force jamais.", "Toujours prévenir le moniteur par signe."] },
      a6: { depth: 5, scene: "5 m. Karim fait un rond avec le pouce et l’index.", text: "Il attend ta réponse.", q: "Tout va bien. Quel signe fais-tu ?",
        choices: [
          X("Le pouce levé, comme on fait à terre pour dire que c’est super.", "Sous l’eau, le pouce levé veut dire « on remonte ». C’est le piège le plus courant du baptême.", "n1-signes"),
          O("Le même rond pouce-index, pour répondre que tout va bien.", "Le rond, c’est « ça va ». Le pouce levé veut dire « on remonte ».", "n1-signes", "a7"),
          X("Un hochement de tête, il voit très bien mon visage à travers le masque.", "Sous l’eau, on se comprend par des signes nets et convenus. Un mouvement de tête est trop flou.", "n1-signes") ] },
      a7: { depth: 6, scene: "6 m. Un herbier de posidonie, un oursin violet, un poulpe qui se cache.", text: "Tu as très envie de toucher.", q: "Que fais-tu ?",
        choices: [
          X("Je ramène une petite étoile de mer en souvenir pour la montrer à Inès.", "Les animaux et les plantes restent dans l’eau. Une étoile de mer sortie de l’eau meurt.", "n1-milieu"),
          X("Je caresse doucement l’oursin, il ne pique pas s’il ne bouge pas.", "Les piquants d’oursin cassent dans la peau et s’infectent. On regarde, on ne touche pas.", "n1-milieu"),
          O("Je regarde de près sans toucher, palmes loin du fond.", "Regarder sans toucher protège le milieu et te protège aussi : piquants, brûlures, coupures.", "n1-milieu", "a8") ] },
      a8: { depth: 4, scene: "Karim lève le pouce : on remonte.", text: "Tu as encore de l’air plein les poumons après une grande inspiration.", q: "Comment remontes-tu ?",
        choices: [
          O("Doucement, avec Karim, en respirant normalement tout le long.", "En remontant, l’air des poumons se dilate : on respire normalement pour qu’il s’échappe. Jamais d’apnée en remontant.", "d-bapteme", "a9"),
          X("Je bloque ma respiration pour garder l’air jusqu’en surface.", "Bloquer sa respiration en remontant est la seule vraie faute grave du baptême : l’air se dilate dans les poumons.", "n1-physique", "a8bad"),
          X("Je palme vite vers la lumière pour retrouver Inès plus tôt.", "Une remontée rapide est dangereuse. Karim règle la vitesse, tu le suis.", "d-bapteme") ] },
      a8bad: { depth: 0, end: true, bad: true, retry: "a8", title: "Karim t’arrête net", text: "Karim a vu tes joues gonflées : il te tient fermement, te fait souffler et remonte très lentement. Rien de grave cette fois, mais il t’explique le danger en surface.",
        why: "L’air dans les poumons se dilate quand la pression baisse (loi de Mariotte). En bloquant ta respiration, tu risques la surpression pulmonaire, même à quelques mètres.", learn: ["Jamais d’apnée en remontant.", "Respirer normalement, c’est laisser sortir l’air qui se dilate.", "Le moniteur règle la vitesse : on le suit."] },
      a9: { depth: 0, scene: "Sur le bateau, une heure plus tard.", who: "ines", text: "Alors, c’était comment ? Tu fais une drôle de tête.", q: "Ton oreille gauche reste un peu bouchée. Que fais-tu ?",
        choices: [
          X("Je ne dis rien à Karim, ça partira tout seul cette nuit.", "C’est souvent vrai, mais le moniteur doit le savoir, et une douleur qui dure se fait voir par un médecin.", "d-oreilles"),
          X("Je fais encore quelques Valsalva très forts pour la déboucher.", "Forcer sur une oreille irritée peut l’aggraver. Douceur, et un avis médical si ça dure.", "d-oreilles"),
          O("Je le dis à Karim, et un médecin vérifie si ça dure.", "Une gêne qui persiste après la plongée se signale. Le médecin vérifie le tympan avant la prochaine plongée.", "d-oreilles", "end") ] },
      end: { depth: 0, end: true, title: "Tu veux recommencer !", text: "Karim note ton baptême dans ton carnet. « Tu as bien respiré, tu as prévenu pour l’oreille, et tu n’as rien touché. Tu as le bon état d’esprit pour le Niveau 1. »",
        learn: ["Tout dire au moniteur, même un rhume.", "Équilibrer tôt et en douceur ; remonter un peu si ça bloque.", "Le rond = ça va ; le pouce levé = on remonte.", "Jamais d’apnée en remontant."] }
    }
  });

  /* ---------- N1 : encadré en mer ---------- */
  C.addStory({
    id: "n1-mer", world: "n1", role: "Plongeur encadré (N1)", icon: "users", xp: 80, title: "Le sec des Gorgones", sub: "Ta première vraie plongée en mer, encadrée par Maëlle, avec Paul.",
    unlock: null, start: "b1", cast: { maelle: "Maëlle, guide de palanquée", paul: "Paul, N1 comme toi" },
    nodes: {
      b1: { depth: 0, scene: "Sur le bateau. Ton bloc est sanglé, détendeur monté.", text: "Maëlle te demande de vérifier ton matériel avant de t’équiper.", q: "Que vérifies-tu ?",
        choices: [
          X("Que le bloc est bien attaché au bateau ; le gonflage a été fait et vérifié ce matin.", "Gonflé ne veut pas dire ouvert ni en état. Chacun vérifie son air et ses détendeurs.", "n1-secu"),
          X("Je garde le bloc fermé jusqu’à l’eau pour ne pas perdre d’air.", "Un bloc fermé à la mise à l’eau, c’est la panne d’air dès la première inspiration.", "n1-secu"),
          O("J’ouvre le bloc, je lis la pression et je respire sur les deux détendeurs.", "Pression lue, deux détendeurs testés, gilet qui gonfle : tu sais que tout fonctionne avant de sauter.", "n1-secu", "b2") ] },
      b2: { depth: 0, scene: "Briefing.", who: "maelle", text: "18 mètres maximum, 40 minutes, on revient avec au moins 50 bar. Vous restez près de moi.", q: "Quel est ton rôle dans cette palanquée ?",
        choices: [
          O("Rester près de Maëlle, surveiller Paul et lui montrer mon manomètre.", "Encadré ne veut pas dire passif : tu suis le guide, tu surveilles ton binôme et tu donnes ton air quand on te le demande.", "n1-secu", "b3"),
          X("Profiter du paysage un peu à l’écart ; c’est elle qui gère la sécurité.", "Le guide est responsable, mais il compte sur toi : rester près, surveiller ton binôme, répondre aux signes.", "n1-secu"),
          X("Gérer mon parcours avec mon ordinateur, je suis certifié maintenant.", "Le N1 plonge encadré jusqu’à 20 m (À faire valider) : c’est le guide qui choisit le parcours.", "n1-secu") ] },
      b3: { depth: 0, scene: "Assis sur le boudin du bateau, dos à la mer.", text: "Maëlle compte « trois, deux, un ».", q: "Juste avant la bascule arrière ?",
        choices: [
          X("Je gonfle mon gilet à fond et je saute en avant pour mieux voir.", "Sur un semi-rigide, on bascule en arrière. Et c’est la main sur le masque qui compte, pas le saut.", "n1-secu"),
          O("Une main sur le masque et le détendeur, je vérifie que derrière c’est libre.", "La main protège masque et détendeur au choc, et on évite de tomber sur quelqu’un.", "n1-secu", "b4"),
          X("Je mettrai le détendeur en bouche une fois dans l’eau, pour ne pas le cogner.", "Détendeur en bouche avant de basculer : sinon tu arrives dans l’eau sans air, la tête en bas.", "n1-secu") ] },
      b4: { depth: 4, scene: "Descente le long du bout. Paul est sous toi.", text: "Il s’arrête et se tient l’oreille.", q: "Que fais-tu ?",
        choices: [
          X("Je lui fais signe de continuer, ça finit toujours par passer.", "Continuer à descendre aggrave l’écart de pression. Il faut le dire au guide et attendre.", "n1-accidents"),
          X("Je descends rejoindre Maëlle pour ne pas perdre la palanquée.", "Laisser son binôme en difficulté, c’est l’inverse de la palanquée. On reste ensemble.", "n1-secu"),
          O("Je reste à côté de Paul et j’attire l’attention de Maëlle.", "Rester avec son binôme et prévenir le guide : elle va le faire remonter un peu pour équilibrer.", "n1-accidents", "b5") ] },
      b5: { depth: 15, scene: "15 m. Les gorgones rouges. Eau à 16 °C.", text: "Ça fait 20 minutes. Tu frissonnes de plus en plus.", q: "Que fais-tu ?",
        choices: [
          O("Je fais le signe « j’ai froid » à Maëlle.", "Le froid fatigue, fait consommer plus et favorise l’accident de désaturation. Le guide raccourcit la plongée.", "n1-accidents", "b6"),
          X("Je palme plus fort pour me réchauffer, sans déranger personne.", "Palmer fort augmente la consommation et l’essoufflement. Il faut prévenir.", "n1-accidents"),
          X("J’attends la fin : il ne reste qu’une vingtaine de minutes.", "Vingt minutes à grelotter, c’est beaucoup. Le guide doit savoir pour décider.", "n1-accidents") ] },
      b6: { depth: 16, scene: "16 m. Tu regardes ton manomètre sans qu’on te le demande.", text: "L’aiguille est sur 50 bar.", q: "Que fais-tu ?",
        choices: [
          X("J’attends que Maëlle me demande, pour ne pas interrompre la plongée.", "La réserve se signale tout de suite : c’est elle qui permet la remontée.", "n1-secu", "b6b"),
          O("Je fais tout de suite le signe « réserve » à Maëlle.", "50 bar, c’est la réserve annoncée au briefing : on prévient sans attendre, et la palanquée remonte.", "n1-secu", "b7"),
          X("Je respire moins souvent pour faire durer mon air jusqu’à la fin.", "Retenir sa respiration crée de l’essoufflement. On signale, on ne triche pas avec l’air.", "n1-physique") ] },
      b6b: { depth: 16, alt: true, scene: "Cinq minutes plus tard.", who: "maelle", text: "Maëlle te demande ta pression. Tu lui montres : 30 bar. Elle fait aussitôt signe : on remonte.", q: "Comment réagis-tu ?",
        choices: [
          X("Je remonte vite devant tout le monde pour sortir avant de manquer d’air.", "Une remontée rapide expose à la surpression pulmonaire. Il reste de l’air : on remonte avec le guide, calmement.", "n1-physique"),
          X("Je propose de rester encore un peu, il me reste quand même 30 bar.", "30 bar, c’est sous la réserve. On remonte maintenant.", "n1-secu"),
          O("Je reste contre elle, je respire normalement et je remonte à son rythme.", "Bien rattrapé. La prochaine fois, signale la réserve dès que tu l’atteins.", "n1-secu", "b7") ] },
      b7: { depth: 8, scene: "Remontée. Maëlle te tient par la sangle.", text: "Ton gilet commence à te tirer vers le haut.", q: "Que fais-tu ?",
        choices: [
          X("Je gonfle un peu plus le gilet pour me laisser porter doucement vers la surface.", "L’air du gilet se dilate en remontant : en ajouter, c’est partir en remontée « ballon ».", "n1-physique", "b7bad"),
          O("Je purge un peu le gilet et je remonte lentement, à son rythme.", "En remontant, l’air du gilet se dilate : on purge régulièrement pour garder une remontée lente.", "n1-physique", "b8"),
          X("Je palme vers le haut pour rester au niveau de Maëlle.", "Le problème vient du gilet qui se dilate : c’est lui qu’il faut purger.", "n1-physique") ] },
      b7bad: { depth: 0, end: true, bad: true, retry: "b7", title: "Remontée en ballon", text: "Tu files vers la surface, Maëlle ne peut pas te retenir. En surface, elle t’oblige à rester au calme et prévient la directrice de plongée pour te surveiller.",
        why: "L’air se dilate quand la pression baisse : un gilet qu’on gonfle en remontant t’emporte. Remontée trop rapide = risque de surpression pulmonaire et d’accident de désaturation.", learn: ["En remontant, on purge le gilet.", "La vitesse se règle sur le guide.", "Une remontée rapide se signale toujours au DP."] },
      b8: { depth: 3, scene: "Palier de sécurité de quelques minutes à 3 m.", text: "Paul monte, descend, remonte.", q: "Et toi, comment tiens-tu le palier ?",
        choices: [
          X("Je m’accroche au bout du mouillage avec les deux mains pour ne plus bouger.", "Tenir le bout aide, mais la vraie technique, c’est la respiration et un gilet bien réglé.", "n1-physique"),
          X("Je remonte en surface attendre, le palier de sécurité est facultatif.", "Recommandé, pas obligatoire, mais on ne quitte jamais sa palanquée pour sortir seul.", "n1-secu"),
          O("Je me stabilise avec la respiration et je reste au niveau de Maëlle.", "Poumon ballast : inspirer fait monter un peu, expirer fait descendre. Et on reste groupés.", "n1-physique", "b9") ] },
      b9: { depth: 0, scene: "Surface. Le bateau est à 30 m. Paul est essoufflé.", q: "Que faites-vous ?",
        choices: [
          O("Gilets gonflés, détendeur ou tuba en bouche, on fait signe au bateau.", "En surface, on flotte d’abord (gilet), on respire sans boire la tasse, puis on signale et on attend.", "n1-secu", "end"),
          X("On retire les gilets pour nager plus vite jusqu’au bateau.", "Sans gilet, on ne flotte plus. On gonfle et on attend le bateau.", "n1-secu"),
          X("Paul enlève son masque pour mieux respirer, je fais comme lui.", "Sans masque, les vagues arrivent dans le nez et on boit la tasse. On garde le masque.", "n1-secu") ] },
      end: { depth: 0, end: true, title: "Une palanquée qui fonctionne", text: "Au débriefing, Maëlle sourit : « Tu as pensé à Paul, tu as signalé le froid et la réserve. Tu es un vrai équipier. »",
        learn: ["Vérifier son air et ses deux détendeurs avant l’eau.", "Signaler froid, oreille et réserve tout de suite.", "Purger le gilet en remontant.", "En surface : gilet gonflé, masque gardé."] }
    }
  });

  /* ---------- N2 : autonome dans le courant ---------- */
  C.addStory({
    id: "n2-courant", world: "n2", role: "Plongeur autonome (N2)", icon: "compass", xp: 90, title: "La dérive du Cap Rouge", sub: "Autonomie à 20 m avec Jade, quand le courant se lève.",
    unlock: null, start: "c1", cast: { marc: "Marc, directeur de plongée", jade: "Jade, ta binôme N2" },
    nodes: {
      c1: { depth: 0, scene: "Bateau au mouillage. Le bout tire fort vers l’est.", who: "marc", text: "Il y a du courant aujourd’hui. Vous êtes en autonomie : 20 m maxi, 45 min. Présentez-moi votre plan.", q: "Dans quel sens partez-vous ?",
        choices: [
          X("Avec le courant, pour garder des forces au retour.", "Le retour se ferait alors à contre-courant, fatigués et avec moins d’air. C’est l’inverse qu’il faut.", "pa20"),
          O("Face au courant, pour revenir avec lui vers le mouillage.", "On dépense ses forces au début, quand on est frais et qu’on a de l’air. Le retour se fait porté.", "pa20", "c2"),
          X("Perpendiculaire au courant, comme ça il ne joue sur aucun des deux trajets.", "Le courant te fera dériver quand même. On part face à lui pour revenir porté.", "pa20") ] },
      c2: { depth: 0, scene: "Marc regarde vos équipements.", who: "marc", text: "Vous avez de quoi vous signaler si vous sortez loin du bateau ?", q: "Que réponds-tu ?",
        choices: [
          X("Pas besoin, on remontera forcément le long du mouillage.", "Avec du courant, rater le mouillage arrive vite. Le parachute de palier est indispensable.", "pa20"),
          O("Oui, un parachute avec son dévidoir, et on sait tous les deux le lancer.", "Un parachute bien lancé au palier montre ta position au bateau, même loin du mouillage.", "pa20", "c3"),
          X("Oui, une lampe flash puissante, ça se voit de très loin même en plein jour.", "Une lampe aide la nuit. En plein jour, on se signale avec un parachute bien visible.", "pa20") ] },
      c3: { depth: 3, scene: "Mise à l’eau. Le courant te tire déjà loin du bateau en surface.", q: "Comment descendez-vous ?",
        choices: [
          O("Le long du bout, en le tenant, et on se regroupe au fond.", "Le bout te guide et t’empêche de dériver pendant la descente.", "pa20", "c4"),
          X("En pleine eau, chacun à son rythme, rendez-vous à 20 m.", "En pleine eau, le courant vous sépare et vous éloigne du mouillage.", "pa20"),
          X("On attend en surface que le courant faiblisse avant de descendre.", "En surface, vous dérivez encore plus vite. On descend le long du bout.", "pa20") ] },
      c4: { depth: 20, scene: "20 m. Ton ordinateur affiche 21,5 m.", who: "jade", text: "Jade te montre une murène plus bas, vers 26 m, et commence à descendre.", q: "Que fais-tu ?",
        choices: [
          X("Je la suis quelques mètres, juste le temps de voir la murène.", "La limite fixée est 20 m en autonomie (À faire valider) : elle protège de la narcose et de la décompression.", "regles", "c4b"),
          X("Je reste à 20 m et je la regarde descendre, elle connaît ses limites.", "En autonomie, vous êtes responsables l’un de l’autre : on ne laisse pas son binôme dépasser.", "pa20"),
          O("Je la retiens d’un signe ferme : 20 m, c’est la limite annoncée.", "En autonomie, le plan annoncé au DP est le contrat. Le binôme se rappelle les limites.", "regles", "c5") ] },
      c4b: { depth: 26, alt: true, scene: "26 m. La murène est magnifique.", text: "Tu te sens léger, un peu euphorique. Jade rit dans son détendeur.", q: "Que faites-vous ?",
        choices: [
          X("On profite encore une minute, c’est juste une narcose légère.", "La narcose altère le jugement : on ne la sent jamais aussi forte qu’elle est. On remonte.", "dalton"),
          O("On remonte au-dessus de 20 m ensemble et on vérifie nos paramètres.", "Bien rattrapé : remonter de quelques mètres fait passer la narcose. Vous le signalerez au DP.", "dalton", "c5"),
          X("On descend un peu plus pour s’habituer à la profondeur.", "Plus profond = plus d’azote = narcose plus forte.", "dalton") ] },
      c5: { depth: 18, scene: "18 m. Le courant forcit. Vous palmez fort sans avancer.", q: "Que faites-vous ?",
        choices: [
          X("On palme encore plus fort en pleine eau pour passer la pointe.", "Lutter contre le courant mène à l’essoufflement. On utilise le relief.", "physio"),
          O("On se rapproche du fond, à l’abri des rochers, et on fait demi-tour.", "Près du fond, le courant est plus faible. Faire demi-tour plus tôt, c’est garder de l’air et des forces.", "physio", "c6"),
          X("On se laisse porter par le courant, le bateau viendra nous chercher en surface à la fin.", "Vous risquez de sortir très loin du bateau. Mieux vaut faire demi-tour tant que c’est possible.", "pa20") ] },
      c6: { depth: 18, scene: "Derrière un rocher.", who: "jade", text: "Jade respire très vite, à petites bouffées. Elle te fait signe qu’elle est essoufflée.", q: "Que fais-tu ?",
        choices: [
          X("On remonte vite vers la surface pour qu’elle respire mieux.", "Remonter vite en plein essoufflement, c’est le risque de surpression pulmonaire.", "accidents", "c6bad"),
          O("Je la fais s’arrêter, s’accrocher et souffler longuement.", "L’essoufflement vient d’un excès de CO₂. On arrête l’effort et on souffle longuement pour l’évacuer.", "physio", "c7"),
          X("Je lui donne mon octopus, elle doit manquer d’air.", "Elle a de l’air : c’est l’expiration qui est trop courte. Le remède, c’est l’arrêt et l’expiration longue.", "physio") ] },
      c6bad: { depth: 0, end: true, bad: true, retry: "c6", title: "Sortie en catastrophe", text: "Vous jaillissez en surface loin du bateau. Jade tousse, a mal dans la poitrine. Marc déclenche l’alerte et l’oxygène.",
        why: "En essoufflement, on expire mal : une remontée rapide avec des poumons pleins expose à la surpression pulmonaire. Il fallait d’abord arrêter l’effort et souffler.", learn: ["Essoufflement : arrêt, appui, expiration longue.", "On ne remonte qu’une fois la respiration calmée.", "Le courant se gère avec le relief, pas avec les jambes."] },
      c7: { depth: 15, scene: "15 m. Jade respire calmement. Vous comparez vos manomètres.", text: "Toi : 90 bar. Jade : 60 bar.", q: "Que faites-vous ?",
        choices: [
          O("On commence le retour : la plus basse pression décide pour la palanquée.", "La palanquée se règle sur celui qui a le moins d’air. Il faut garder de quoi remonter et faire le palier.", "pa20", "c8"),
          X("On continue un peu : j’ai encore 90 bar, je peux lui en donner.", "Ton air est ta réserve de secours, pas un supplément. On gère avec celui qui a le moins.", "pa20"),
          X("On continue jusqu’à ce que Jade arrive à 50 bar pile, puis on remonte tranquillement.", "À 50 bar, il faut déjà être en route : remontée, palier et imprévus consomment.", "materiel") ] },
      c8: { depth: 5, scene: "5 m. Le mouillage est introuvable. Vous dérivez.", q: "Que faites-vous ?",
        choices: [
          X("On redescend chercher le mouillage au fond tant qu’on a de l’air.", "Chercher au fond use l’air et le temps. Le palier se fait là où vous êtes.", "pa20"),
          X("On saute le palier pour se montrer plus vite en surface.", "Le palier de sécurité est recommandé, et rien ne presse : le parachute vous signale.", "deco"),
          O("On lance le parachute et on fait le palier en dérivant.", "Le parachute signale votre position, et vous faites le palier tranquillement en dérivant ensemble.", "deco", "c9") ] },
      c9: { depth: 0, scene: "Surface. Le bateau est à 300 m, il vous a vus.", q: "En attendant le bateau ?",
        choices: [
          X("On nage vers la côte à 500 m, en laissant le parachute.", "Sans parachute, on vous perd de vue. Et nager contre le courant épuise.", "pa20"),
          O("Gilets gonflés, ensemble, parachute bien haut, et on attend.", "En surface : flotter, rester groupés, rester visibles. C’est le bateau qui vient à vous.", "pa20", "end"),
          X("On se sépare un peu pour être repérés de deux endroits à la fois.", "Séparés, vous êtes plus difficiles à récupérer. On reste ensemble.", "pa20") ] },
      end: { depth: 0, end: true, title: "Récupérés au large", text: "Marc vous récupère : « Le courant a forci plus que prévu. Vous avez fait demi-tour, géré l’essoufflement et lancé le parachute. C’est ça, être autonome. »",
        learn: ["Partir face au courant, revenir avec lui.", "La plus basse pression décide pour la palanquée.", "Essoufflement : arrêt et expiration longue.", "Parachute au palier si on rate le mouillage."] }
    }
  });

  /* ---------- N3 : autonome en profondeur ---------- */
  C.addStory({
    id: "n3-tombant", world: "n3", role: "Plongeur autonome (N3)", icon: "gauge", xp: 100, title: "Le tombant des Cinquante", sub: "Plongée autonome à 50 m avec Lina et Rémi. Gaz, narcose, froid.",
    unlock: null, start: "d1", cast: { lina: "Lina, N3", remi: "Rémi, N3", dp: "Odile, directrice de plongée" },
    nodes: {
      d1: { depth: 0, scene: "Préparation. Blocs de 15 L à 230 bar, deux premiers étages chacun.", who: "dp", text: "Vous êtes autonomes jusqu’à 50 m. Quelle est votre règle d’air ?", q: "Quelle règle choisissez-vous ?",
        choices: [
          X("Remonter à 50 bar comme à 20 m : la règle de réserve reste la même quelle que soit la profondeur.", "À 50 m, on consomme beaucoup plus : 50 bar au fond ne suffisent peut-être pas pour remonter, faire les paliers et aider.", "n3-autonomie"),
          O("Une pression de retour qui couvre la remontée, les paliers et un équipier.", "En profondeur, on calcule la réserve : remontée, paliers et partage d’air avec un équipier en panne.", "n3-autonomie", "d2"),
          X("On remontera à l’alarme de l’ordinateur, il est réglé pour ça.", "L’alarme est une aide. La pression de retour se décide et s’annonce avant, pour toute la palanquée.", "n3-autonomie") ] },
      d2: { depth: 0, scene: "Rémi fait ses calculs sur son ardoise.", who: "remi", text: "Je consomme 20 litres par minute en surface. Et à 50 m ?", q: "Sa consommation au fond ?",
        choices: [
          X("100 L/min", "Tu as multiplié par la pression relative (5 bar). Il faut la pression absolue : 6 bar.", "n3-physique"),
          X("70 L/min", "La consommation se multiplie par la pression absolue : 20 × 6.", "n3-physique"),
          O("120 L/min", "20 L/min × 6 bar (pression absolue à 50 m) = 120 L/min. Un bloc se vide six fois plus vite qu’en surface.", "n3-physique", "d3") ] },
      d3: { depth: 40, scene: "Descente rapide le long du tombant. 40 m.", text: "Lina fixe le bleu, la main immobile sur le tombant. Elle met longtemps à répondre au « ça va ».", q: "Que fais-tu ?",
        choices: [
          O("Je lui prends le bras, on remonte de quelques mètres et on observe.", "Réponse lente et regard fixe : narcose possible. Quelques mètres plus haut, elle s’atténue.", "n3-accidents", "d4"),
          X("On continue jusqu’à 50 m, la narcose s’atténue en s’habituant.", "La narcose dépend de la profondeur : elle ne passe pas en continuant à descendre.", "n3-accidents"),
          X("Je la laisse se reprendre seule pendant que je surveille Rémi.", "Une équipière narcosée ne se surveille pas de loin : contact, remontée de quelques mètres.", "n3-accidents") ] },
      d4: { depth: 45, scene: "45 m. Lina va mieux. Vous comparez les ordinateurs.", text: "Celui de Rémi annonce plus de paliers que le tien.", q: "Lequel suivez-vous ?",
        choices: [
          X("Le mien, il est plus récent et je l’ai mieux réglé.", "On ne choisit pas l’ordinateur qui arrange. La palanquée suit le plus pénalisant.", "n3-deco"),
          O("Celui de Rémi : le plus pénalisant décide pour toute la palanquée.", "Les ordinateurs calculent différemment. Toute la palanquée suit celui qui demande le plus de paliers.", "n3-deco", "d5"),
          X("On fait la moyenne des deux ordinateurs pour ne pas rallonger inutilement les paliers.", "Une moyenne n’a aucun sens pour la décompression. On suit le plus pénalisant.", "n3-deco") ] },
      d5: { depth: 45, scene: "Eau à 13 °C. Le détendeur de Rémi se met en débit continu.", text: "Un torrent de bulles. Il te regarde.", q: "Que fait la palanquée ?",
        choices: [
          X("Il respire dessus en le tenant entrouvert jusqu’à la fin de la plongée.", "Possible quelques secondes, mais à 45 m le bloc se vide très vite. Il faut fermer le robinet en panne.", "n3-materiel"),
          O("Il ferme le robinet de ce premier étage et passe sur son second détendeur.", "Deux premiers étages indépendants servent exactement à ça. On fait la fin de plongée prévue, sans profondeur en plus.", "n3-materiel", "d6"),
          X("On remonte tout de suite, en direct, sans faire de paliers.", "Le débit continu ne justifie pas de sauter les paliers : c’est un ADD presque assuré.", "n3-deco", "d5bad") ] },
      d5bad: { depth: 0, end: true, bad: true, retry: "d5", title: "Paliers sautés", text: "En surface, une heure plus tard, Rémi ne sent plus ses jambes. Odile lance l’alerte et l’oxygène. Il part en caisson.",
        why: "Après 45 m, l’azote dissous doit sortir doucement, pendant les paliers. Le débit continu se règle en fermant le premier étage en panne ; on garde la remontée et les paliers prévus.", learn: ["Deux premiers étages : on ferme celui qui est en panne.", "Un incident ne fait jamais sauter les paliers.", "Prévoir un bloc ou des détendeurs adaptés à l’eau froide."] },
      d6: { depth: 30, scene: "Remontée vers les paliers.", q: "À quelle vitesse ?",
        choices: [
          X("Celle du plus rapide d’entre nous, pour rester groupés.", "On se règle sur l’ordinateur et sur le plus lent, pas sur le plus rapide.", "n3-deco"),
          X("Vite jusqu’au premier palier : avant celui-ci, l’azote dissous ne pose pas de problème.", "La vitesse compte sur toute la remontée. Trop vite, on fabrique des bulles avant même le palier.", "n3-deco"),
          O("Lente et régulière, comme l’indique l’ordinateur, encore plus près de la surface.", "La remontée fait partie de la décompression. Près de la surface, la pression change le plus vite en proportion.", "n3-deco", "d7") ] },
      d7: { depth: 6, scene: "Palier. Il reste 9 minutes à faire.", who: "lina", text: "Lina te montre son manomètre : 40 bar. Elle grelotte.", q: "Que faites-vous ?",
        choices: [
          O("Je partage mon air avec elle au palier et on lance le parachute.", "Elle respire sur ton octopus, vous finissez les paliers ensemble, et le parachute alerte la surface.", "n3-autonomie", "d8"),
          X("Elle sort seule, il ne lui reste que quelques minutes de palier.", "Sortir avec des paliers non faits, seule, c’est cumuler deux risques. On partage l’air.", "n3-deco"),
          X("On réduit tous les paliers de moitié pour qu’elle tienne avec son air.", "Les paliers ne se négocient pas. C’est l’air qu’on partage.", "n3-deco") ] },
      d8: { depth: 0, scene: "Sur le bateau.", who: "remi", text: "On refait 40 m cet après-midi ?", q: "Que décidez-vous ?",
        choices: [
          X("On garde 40 m, l’ordinateur gère très bien la plongée successive.", "L’ordinateur calcule, mais il ne connaît ni le froid ni les incidents. On prévoit plus doux.", "n3-deco"),
          O("Une plongée plus douce et moins profonde, toujours avec l’ordinateur.", "Après une plongée profonde, froide et agitée, on choisit une successive plus courte et moins profonde.", "n3-deco", "d9"),
          X("On plonge l’après-midi à 50 m pour finir le tombant qu’on n’a pas vu.", "Une successive plus profonde que la première charge encore plus en azote : on fait l’inverse.", "n3-deco") ] },
      d9: { depth: 0, scene: "Une demi-heure plus tard.", who: "lina", text: "J’ai des démangeaisons sur le ventre, et des marbrures violettes.", q: "Que fais-tu ?",
        choices: [
          X("Ce sont sûrement des piqûres de méduse, on met du vinaigre et on surveille.", "Démangeaisons et marbrures après une plongée profonde : on pense d’abord accident de désaturation cutané.", "n3-accidents"),
          X("Un bain chaud au port pour relancer la circulation.", "Pas de bain chaud : on traite comme un ADD, oxygène et alerte.", "n3-accidents"),
          O("Je pense à un ADD cutané : oxygène, alerte d’Odile, surveillance.", "Les marbrures sont une forme d’ADD qui peut évoluer. Oxygène, alerte, transport selon l’avis médical.", "n3-accidents", "end") ] },
      end: { depth: 0, end: true, title: "Décisions de N3", text: "Lina est traitée à temps et récupère sans séquelle. Odile conclut : « Gaz calculés, narcose repérée, panne gérée, paliers tenus. Vous avez été autonomes jusqu’au bout. »",
        learn: ["À 50 m, on consomme 6 fois plus qu’en surface.", "Narcose : on remonte de quelques mètres.", "Débit continu : fermer le premier étage en panne.", "Le plus pénalisant des ordinateurs décide."] }
    }
  });

  /* ---------- N4 : guide de palanquée ---------- */
  C.addStory({
    id: "n4-guide", world: "n4", role: "Guide de palanquée (N4)", icon: "flag", xp: 110, title: "Guide d’un jour", sub: "Tu emmènes trois N1 sur l’épave. Ils comptent sur toi.",
    unlock: null, start: "g1", cast: { claire: "Claire, directrice de plongée", theo: "Théo, N1", anna: "Anna, N1", sofiane: "Sofiane, N1" },
    nodes: {
      g1: { depth: 0, scene: "Sur le bateau.", who: "claire", text: "Tu prends Anna, Théo et Sofiane, trois N1. 20 m maximum, 40 minutes.", q: "Avant de t’équiper, que fais-tu ?",
        choices: [
          X("Je vérifie seulement ma bouteille et mon gilet, chacun gère son propre matériel.", "Le guide vérifie que sa palanquée est prête : niveau, expérience, matériel, état du jour.", "n4-guide"),
          O("Je fais connaissance : expérience, dernière plongée, matériel, forme du jour.", "Savoir qui tu emmènes te permet d’adapter le parcours et de repérer celui qu’il faudra surveiller de plus près.", "n4-guide", "g2"),
          X("Je regarde leurs cartes de niveau, le reste les regarde.", "La carte dit ce qu’ils peuvent faire, pas comment ils vont aujourd’hui ni depuis quand ils n’ont pas plongé.", "n4-guide") ] },
      g2: { depth: 0, scene: "Briefing.", text: "Théo n’a pas plongé depuis deux ans. Anna a un gilet neuf.", q: "Que dois contenir ton briefing ?",
        choices: [
          X("Les poissons qu’on va voir et le plan de l’épave, pour qu’ils en profitent.", "C’est bien pour la motivation, mais il manque l’essentiel : paramètres, signes, conduite en cas de problème.", "n4-guide"),
          X("Mes paliers et ma consommation, pour qu’ils sachent quand me suivre.", "Ce sont leurs paramètres à eux qui comptent : pression de retour, profondeur, signes.", "n4-guide"),
          O("Profondeur, durée, pression de retour, signes, et quoi faire si on se perd.", "Un briefing de guide pose les limites et prépare les incidents. Les N1 doivent savoir quoi faire sans toi.", "n4-guide", "g3") ] },
      g3: { depth: 0, scene: "En surface, à côté du bateau.", text: "Théo respire vite et serre ton bras.", q: "Que fais-tu ?",
        choices: [
          O("Je reste avec lui, je le rassure et on descend quand il respire calmement.", "Un plongeur stressé en surface sera stressé au fond. On prend deux minutes : c’est de la sécurité.", "n4-assistance", "g4"),
          X("Je le fais descendre tout de suite en le tenant, sous l’eau ça va passer tout seul.", "Le stress augmente souvent sous l’eau. On ne descend qu’avec un plongeur calme.", "n4-assistance"),
          X("Je l’envoie sur le bateau sans lui demander son avis.", "Ça peut être la bonne décision, mais d’abord on essaie de l’apaiser et on décide avec lui.", "n4-guide") ] },
      g4: { depth: 15, scene: "15 m, sur l’épave.", q: "Comment places-tu ta palanquée ?",
        choices: [
          X("Derrière moi en file, je me retourne de temps en temps.", "Derrière toi, tu ne les vois pas. Un incident peut durer longtemps avant que tu le remarques.", "n4-guide"),
          O("À côté ou juste devant moi, dans mon champ de vision.", "Le guide voit toujours sa palanquée et vérifie chacun souvent, surtout Théo.", "n4-guide", "g5"),
          X("Libres autour de l’épave, je les regroupe pour la remontée.", "Des N1 encadrés restent avec leur guide pendant toute la plongée.", "n4-guide") ] },
      g5: { depth: 18, scene: "18 m.", text: "Anna monte sans le vouloir : déjà 4 m au-dessus de vous, elle tâtonne sur son gilet neuf.", q: "Que fais-tu ?",
        choices: [
          X("Je fais signe aux autres d’attendre et je la regarde : elle va gérer.", "Une remontée non contrôlée ne se règle pas seule. Le guide intervient vite.", "n4-assistance", "g5bad"),
          X("Je fonce sous elle et je la pousse vers le bas par les palmes.", "On la saisit et on purge son gilet. La pousser par les palmes ne freine pas une remontée.", "n4-assistance"),
          O("Je la rattrape, je la saisis et je purge son gilet pour freiner.", "Vite, mais en gardant un œil sur les deux autres : tu purges et tu ralentis. Puis tu regroupes.", "n4-assistance", "g6") ] },
      g5bad: { depth: 0, end: true, bad: true, retry: "g5", title: "Anna remonte seule", text: "Anna arrive en surface en quelques secondes. Tu dois remonter les deux autres pour la rejoindre. Claire la met sous oxygène par précaution.",
        why: "Un plongeur en remontée incontrôlée ne peut souvent plus s’arrêter : le gilet se dilate. Le guide intervient tout de suite, puis regroupe sa palanquée.", learn: ["Remontée incontrôlée : saisir et purger.", "Gilet neuf = le faire essayer avant la plongée.", "Tout incident de remontée se signale au DP."] },
      g6: { depth: 18, scene: "Palanquée regroupée.", text: "Sofiane te fait le signe : plus d’air.", q: "Que fais-tu ?",
        choices: [
          X("Je lui donne mon octopus et je laisse les deux autres finir le tour.", "On ne disperse jamais la palanquée pendant un incident. Tout le monde remonte.", "n4-assistance"),
          O("Je lui donne mon octopus, je le tiens, je regroupe et on remonte tous.", "Air d’abord, contact ensuite, palanquée regroupée, remontée contrôlée.", "n4-assistance", "g7"),
          X("Je fais passer l’octopus de Théo à Sofiane, il est plus près de lui.", "Théo est N1 et nerveux. C’est le guide qui donne son air et qui contrôle la remontée.", "n4-assistance") ] },
      g7: { depth: 5, scene: "5 m. Tu tiens Sofiane. Anna et Théo dérivent un peu.", q: "Pendant le palier ?",
        choices: [
          X("Je raccourcis le palier pour limiter la dérive.", "La dérive se gère avec le parachute et le regroupement, pas en coupant le palier.", "n4-deco"),
          X("Je fais remonter Anna et Théo d’abord, ensemble, et je reste au palier avec Sofiane.", "On ne fait pas sortir des N1 seuls. La palanquée sort ensemble.", "n4-guide"),
          O("Parachute lancé, tous regroupés autour de moi, je surveille air et signes.", "Le parachute te signale, le regroupement te permet de surveiller les quatre.", "n4-guide", "g8") ] },
      g8: { depth: 0, scene: "À bord.", who: "claire", text: "Alors, cette plongée ?", q: "Que lui dis-tu ?",
        choices: [
          O("La panne d’air et le gilet d’Anna, avec heures et profondeurs, et je surveille.", "Le DP doit tout savoir pour surveiller, compléter la fiche de sécurité et décider de la suite.", "n4-resp", "end"),
          X("Rien de particulier : tout s’est bien fini, personne n’est blessé, inutile de l’inquiéter.", "Un incident sans blessé se signale quand même : des signes peuvent apparaître plus tard.", "n4-resp"),
          X("J’en parlerai au débriefing de fin de semaine, avec tout le monde.", "Le DP a besoin de l’info maintenant, pour surveiller les plongeurs concernés.", "n4-resp") ] },
      end: { depth: 0, end: true, title: "Une palanquée ramenée", text: "Claire note tout sur la fiche. « Tu les as vus, tu as réagi vite, et tu me dis tout. C’est exactement ce que j’attends d’un guide. »",
        learn: ["Connaître sa palanquée avant l’eau.", "Les garder dans son champ de vision.", "Remontée incontrôlée : saisir et purger.", "Tout incident se dit au DP, tout de suite."] }
    }
  });

  /* ---------- E1 : initiateur en piscine ---------- */
  C.addStory({
    id: "e1-piscine", world: "e1", role: "Initiateur (E1)", icon: "teach", xp: 100, title: "Le mardi soir des débutants", sub: "Ta première séance d’initiateur en piscine, sous la responsabilité d’Hélène.",
    unlock: null, start: "p1", cast: { helene: "Hélène, monitrice responsable", lea: "Léa, débutante", tom: "Tom, débutant" },
    nodes: {
      p1: { depth: 0, scene: "Bord du bassin, 20 h.", who: "helene", text: "Je te confie trois débutants. L’objectif du jour : vider son masque.", q: "Comment prépares-tu ta séance ?",
        choices: [
          X("Je montre toutes les techniques de vidage d’un coup pour gagner du temps.", "Trop d’infos à la fois, rien ne reste. Un objectif, des étapes, une technique.", "e1-cours"),
          O("Un objectif, des étapes simples, le matériel prêt et ma place dans l’eau.", "Une séance se prépare : objectif, progression, matériel, sécurité. Tu sais où tu vas.", "e1-cours", "p2"),
          X("Je verrai sur place selon leur forme, c’est plus naturel.", "S’adapter, oui, mais à partir d’un plan. Sans plan, on improvise la sécurité aussi.", "e1-cours") ] },
      p2: { depth: 0, scene: "Les trois débutants t’attendent dans le petit bain.", q: "Comment présentes-tu le geste ?",
        choices: [
          X("Je l’explique au bord pendant vingt minutes, avec tous les détails.", "Les débutants retiennent peu d’un long discours. Ils retiennent ce qu’ils voient et ce qu’ils font.", "e1-apprendre"),
          X("Je les laisse essayer seuls dans le grand bain, on apprend en se trompant.", "Essayer, oui, mais dans un cadre sûr et après une démonstration.", "e1-apprendre"),
          O("Je montre lentement, j’explique pourquoi en une phrase, puis ils essaient.", "Démonstration, explication courte, essai : c’est la base d’un apprentissage efficace.", "e1-apprendre", "p3") ] },
      p3: { depth: 2, scene: "2 m. Léa laisse entrer l’eau dans son masque.", text: "Elle panique, gestes rapides, et pousse sur ses palmes vers le haut.", q: "Que fais-tu ?",
        choices: [
          O("Je la tiens doucement, regard dans les yeux, je lui montre de souffler par le nez.", "Contact, calme, consigne simple. Si ça ne passe pas, on remonte ensemble, calmement.", "e1-exercices", "p4"),
          X("Je la laisse remonter seule au bord et je continue l’exercice avec les deux autres au fond.", "Un élève qui panique ne remonte jamais seul : on l’accompagne, et on ne laisse pas les autres sans surveillance.", "e1-public", "p3b"),
          X("Je lui retire son masque pour qu’elle voie que ce n’est pas grave.", "Retirer le masque d’une élève qui panique la met encore plus en difficulté.", "e1-exercices") ] },
      p3b: { depth: 0, alt: true, scene: "Léa est au bord, en larmes. Tom et Lucas sont seuls au fond.", q: "Que fais-tu ?",
        choices: [
          X("Je reste avec Léa jusqu’à la fin, les deux autres continuent seuls.", "Des débutants seuls au fond, même en piscine, ce n’est pas possible.", "e1-cadre"),
          O("Je fais remonter les deux autres, je rassure Léa, et on reprend en petit fond.", "Bien rattrapé : tout le monde regroupé, puis l’exercice reprend là où Léa a pied.", "e1-public", "p4"),
          X("J’appelle Hélène pour qu’elle prenne Léa en charge et je replonge vite rejoindre les autres.", "Hélène peut aider, mais tes deux élèves sont seuls au fond pendant ce temps. On regroupe d’abord.", "e1-cadre") ] },
      p4: { depth: 2, scene: "Le groupe reprend l’exercice.", q: "Où te places-tu ?",
        choices: [
          X("Derrière eux, pour ne pas les gêner du regard.", "Derrière, tu ne vois ni leurs yeux ni leurs gestes, et ils ne voient pas tes signes.", "e1-exercices"),
          O("Face à eux, à portée de main, en voyant tout le groupe.", "Face à eux, tu vois tout le monde, tu montres le geste et tu peux intervenir tout de suite.", "e1-exercices", "p5"),
          X("Au bord, debout, pour avoir une vue d’ensemble du bassin.", "Du bord, tu ne peux pas intervenir vite. L’initiateur est dans l’eau avec ses élèves.", "e1-exercices") ] },
      p5: { depth: 2, scene: "Tom vide son masque tête baissée. L’eau reste dedans.", q: "Comment corriges-tu ?",
        choices: [
          X("Je lui dis devant le groupe que c’est faux et je passe au suivant.", "Corriger sans montrer la solution ni encourager décourage. On valorise l’essai et on montre.", "e1-apprendre"),
          O("Je valorise l’essai, je montre la tête relevée, et il recommence.", "Une correction : un point positif, un seul conseil précis, un nouvel essai.", "e1-apprendre", "p6"),
          X("Je ne corrige pas, il trouvera tout seul avec le temps.", "Sans correction, il prend une mauvaise habitude. Un conseil précis fait gagner beaucoup de temps.", "e1-apprendre") ] },
      p6: { depth: 0, scene: "Hélène arrive avec un garçon de 10 ans.", who: "helene", text: "Hugo veut essayer avec ton groupe.", q: "Comment fais-tu ?",
        choices: [
          X("La même séance que les adultes, avec les mêmes consignes : les règles sont pareilles pour tous.", "Un enfant n’apprend pas comme un adulte : concentration plus courte, froid plus vite, matériel adapté.", "e1-public"),
          X("Je le laisse jouer en surface pendant que les adultes travaillent.", "Il est venu pour plonger : on l’intègre avec une séance adaptée, sous surveillance.", "e1-public"),
          O("Matériel à sa taille, consignes courtes et ludiques, séance plus courte, petit fond.", "Les enfants : matériel adapté, jeu, séances courtes, faible profondeur (règles enfants : À faire valider).", "e1-public", "p7") ] },
      p7: { depth: 2, scene: "Fin d’exercice.", who: "tom", text: "On peut aller voir la fosse à 6 mètres ?", q: "Que réponds-tu ?",
        choices: [
          O("Pas ce soir : on reste dans l’espace et la profondeur prévus par Hélène.", "L’initiateur travaille dans le cadre fixé par le moniteur responsable, dans ses prérogatives (À faire valider).", "e1-cadre", "p8"),
          X("Oui, c’est la piscine, il n’y a aucun risque.", "Même en piscine, la pression agit sur les oreilles, et ce n’était pas prévu.", "e1-cadre", "p7bad"),
          X("Oui, mais seulement avec Tom, il est le plus à l’aise du groupe.", "Laisser le groupe pour emmener un seul élève plus profond, c’est sortir du cadre et de la surveillance.", "e1-cadre") ] },
      p7bad: { depth: 0, end: true, bad: true, retry: "p7", title: "Séance arrêtée", text: "Dans la fosse, Léa a mal aux oreilles et remonte vite. Hélène arrête ta séance et t’explique ce qui ne va pas.",
        why: "Tes élèves n’avaient jamais dépassé 2 m. En descendant à 6 m sans préparation, tu sors du cadre fixé et tu les exposes au barotraumatisme.", learn: ["On reste dans le cadre fixé par le responsable.", "Une nouvelle profondeur se prépare.", "L’initiateur garde toujours son groupe ensemble."] },
      p8: { depth: 0, scene: "Bord du bassin.", q: "Comment termines-tu ?",
        choices: [
          X("Je liste toutes leurs erreurs pour qu’ils les corrigent la prochaine fois.", "Une liste d’erreurs décourage. On valorise le progrès et on donne une seule piste.", "e1-cours"),
          O("Je leur demande leur ressenti, je souligne un progrès et l’étape suivante.", "Un bon bilan : ils parlent d’abord, tu valorises, tu annonces la suite.", "e1-cours", "p9"),
          X("Pas de bilan, on a déjà fini un peu en retard.", "Le bilan est court mais indispensable : c’est là que la séance s’ancre.", "e1-cours") ] },
      p9: { depth: 0, scene: "Vestiaire.", who: "helene", text: "Raconte-moi ta séance.", q: "Que lui dis-tu ?",
        choices: [
          X("Que tout s’est très bien passé, pour ne pas l’inquiéter.", "Hélène est responsable : elle doit connaître la panique de Léa pour suivre l’élève.", "e1-cadre"),
          X("Uniquement ce qui a raté pendant la séance, pour qu’elle me donne des conseils précis.", "Dis aussi ce qui a marché : c’est utile pour la suite du groupe et pour toi.", "e1-cadre"),
          O("Ce qui a marché, la panique de Léa, et ce que je propose la prochaine fois.", "Un compte rendu honnête et des propositions : c’est comme ça qu’on progresse comme initiateur.", "e1-cadre", "end") ] },
      end: { depth: 0, end: true, title: "Une vraie séance", text: "Hélène : « Tu as préparé, montré, corrigé avec bienveillance, et tu es resté dans le cadre. Mardi prochain, on travaille le lâcher-reprise d’embout. »",
        learn: ["Un objectif par séance.", "Démonstration, explication courte, essai.", "Face aux élèves, à portée de main.", "On reste dans le cadre fixé par le responsable."] }
    }
  });

  /* ---------- E2 : moniteur en mer ---------- */
  C.addStory({
    id: "e2-mer", world: "e2", role: "Moniteur (E2)", icon: "shield", xp: 110, title: "Deux N1 au sec de la Tortue", sub: "Tu enseignes en mer à Clara et Yanis, puis tu dois évaluer.",
    unlock: null, start: "m1", cast: { bastien: "Bastien, directeur de plongée", clara: "Clara, élève N1", yanis: "Yanis, élève N1" },
    nodes: {
      m1: { depth: 0, scene: "Préparation de la séance.", text: "Objectif : lâcher et reprendre l’embout, puis respirer sur l’octopus d’un équipier, à 6 m.", q: "Comment construis-tu la séance ?",
        choices: [
          X("Les deux exercices en même temps, à 6 m, pour qu’ils voient tout de suite le lien entre les deux.", "Deux nouveautés à la fois, c’est trop. On enchaîne : une compétence maîtrisée, puis la suivante.", "e2-n1mer"),
          X("Toute la séance en pleine eau à 15 m, pour être en conditions réelles.", "Une nouvelle compétence s’apprend près d’un fond, peu profond. Les conditions réelles viennent ensuite.", "e2-n1mer"),
          O("Un exercice à la fois, près d’un fond, démonstration puis essai, avec un signe d’arrêt.", "Progression, fond proche, démonstration, signe d’arrêt : l’élève apprend en sécurité.", "e2-n1mer", "m2") ] },
      m2: { depth: 0, scene: "Avant de partir.", who: "bastien", text: "Tu pars où, avec qui ?", q: "Que lui annonces-tu ?",
        choices: [
          O("Objectif, zone, profondeur, durée et heure de retour, et le niveau des élèves.", "Le DP organise la sécurité de toutes les palanquées : il a besoin de ces infos.", "e2-orga", "m3"),
          X("L’heure de retour seulement, il connaît déjà mes élèves.", "Zone et profondeur comptent aussi : c’est là qu’on te cherchera en cas de problème.", "e2-orga"),
          X("Je lui demande de choisir lui-même les exercices et la zone, c’est lui le directeur de plongée.", "Le DP organise, le moniteur conçoit sa séance. Tu lui présentes ton plan.", "e2-orga") ] },
      m3: { depth: 6, scene: "6 m, à genoux sur le sable.", text: "Clara lâche l’embout et ne le retrouve plus. Elle tâtonne derrière son épaule.", q: "Que fais-tu ?",
        choices: [
          X("Je la fais remonter, elle reprendra l’embout en surface.", "Remonter sans air, c’est le danger qu’on veut justement éviter. On reprend l’embout au fond.", "e2-exmer"),
          O("Je lui montre le balayage du bras, mon octopus prêt à lui donner.", "Tu guides le bon geste et tu gardes la solution d’air prête : elle apprend sans être en danger.", "e2-exmer", "m4"),
          X("Je lui remets l’embout moi-même, à chaque essai, pour aller plus vite.", "Elle ne saura pas le faire seule. On guide le geste, on n’agit à sa place qu’en cas de besoin.", "e2-peda") ] },
      m4: { depth: 6, scene: "Tu es avec Clara.", text: "Du coin de l’œil, tu vois Yanis qui monte doucement, à 4 m déjà.", q: "Que fais-tu ?",
        choices: [
          X("Je finis avec Clara, Yanis saura bien redescendre.", "Un élève qui monte seul peut ne plus savoir s’arrêter. Le moniteur surveille tout le groupe.", "e2-securite", "m4bad"),
          O("Je ramène Yanis d’un geste, puis je reprends avec Clara.", "Le moniteur voit toujours tous ses élèves : on règle l’urgence la plus grave, et on reprend.", "e2-securite", "m5"),
          X("Je confie Clara à Yanis et je pars voir ce qui se passe.", "Deux élèves ne se surveillent pas l’un l’autre : c’est toi qui gardes le groupe ensemble.", "e2-securite") ] },
      m4bad: { depth: 0, end: true, bad: true, retry: "m4", title: "Yanis en surface", text: "Yanis arrive seul en surface, surpris, détendeur hors de la bouche. Bastien le récupère et met fin à ta séance.",
        why: "Un N1 en formation ne doit jamais quitter le fond sans toi. Le moniteur garde tous ses élèves dans son champ de vision et intervient sur le danger le plus grave en premier.", learn: ["Le groupe reste dans ton champ de vision.", "On traite d’abord le danger le plus grave.", "Tout incident se signale au DP."] },
      m5: { depth: 6, scene: "Fin des exercices.", who: "bastien", text: "Au retour, Bastien te demandera si Clara valide la compétence. Elle a réussi deux fois sur trois.", q: "Que lui diras-tu ?",
        choices: [
          X("Je la valide : elle est très motivée et elle a réussi au moins une fois.", "La motivation ne suffit pas : on valide une compétence reproduite de façon fiable.", "e2-evaluer"),
          O("Pas encore : elle a réussi deux fois sur trois, à revoir avant de valider.", "Une évaluation dit ce qu’on a observé. Une compétence de sécurité doit être fiable avant d’être validée.", "e2-evaluer", "m6"),
          X("Je la valide pour ne pas la décourager, elle progressera ensuite.", "Une validation de complaisance la met en danger plus tard. On l’encourage autrement.", "e2-evaluer") ] },
      m6: { depth: 12, scene: "Petite exploration à 12 m. Le courant monte.", text: "Clara respire vite et fort.", q: "Que fais-tu ?",
        choices: [
          O("J’arrête le groupe à l’abri, elle souffle longuement, on repart avec le courant.", "Essoufflement : arrêt, abri, expiration longue. On repart dans le sens le plus facile.", "e2-securite", "m7"),
          X("On accélère pour sortir vite de la zone de courant.", "Accélérer, c’est plus d’effort et plus de CO₂ : l’essoufflement empire.", "e2-securite"),
          X("Je lui donne mon octopus tout de suite, elle doit être en panne d’air avec cet effort.", "Elle a de l’air : c’est l’expiration qui manque. On arrête l’effort.", "e2-securite") ] },
      m7: { depth: 3, scene: "Palier de sécurité.", text: "Clara et Yanis ont des ordinateurs. Celui de Yanis affiche un palier de 2 minutes que tu n’avais pas prévu.", q: "Que faites-vous ?",
        choices: [
          X("On sort, mon ordinateur n’impose rien et c’est moi le moniteur.", "La palanquée suit l’ordinateur le plus pénalisant, même si c’est celui d’un élève.", "e2-securite"),
          X("Yanis fait son palier seul, Clara et moi sortons.", "On ne sépare pas une palanquée d’élèves. Tout le monde reste.", "e2-securite"),
          O("Toute la palanquée fait le palier demandé par l’ordinateur de Yanis.", "L’ordinateur le plus pénalisant décide pour tout le monde.", "e2-securite", "m8") ] },
      m8: { depth: 0, scene: "À bord.", who: "yanis", text: "J’ai mal au front, au-dessus des yeux.", q: "Que fais-tu ?",
        choices: [
          X("C’est sûrement le masque trop serré, je lui donne un antidouleur et on n’en parle plus.", "Douleur frontale après la plongée : possible barotraumatisme des sinus. On le note et on prévient.", "e2-incidents"),
          O("Je préviens Bastien, je note l’incident, pas de nouvelle plongée sans avis.", "Barotraumatisme des sinus possible : on signale, on note, on fait voir un médecin si ça persiste.", "e2-incidents", "m9"),
          X("On en reparlera la semaine prochaine si ça dure.", "Le DP doit savoir maintenant, et Yanis ne doit pas replonger aujourd’hui.", "e2-incidents") ] },
      m9: { depth: 0, scene: "Débriefing avec les élèves.", q: "Comment le mènes-tu ?",
        choices: [
          X("Je leur détaille tout ce qui n’allait pas pour qu’ils progressent vite.", "Un débriefing qui ne parle que des erreurs décourage. Ressenti, réussites, une piste, la suite.", "e2-evaluer"),
          X("Je les félicite chaleureusement, tout s’est bien passé, et on se retrouve la semaine prochaine.", "Ils ont besoin de savoir ce qui reste à travailler, et pourquoi.", "e2-evaluer"),
          O("Leur ressenti, ce qu’ils ont réussi, ce qui reste à travailler, la prochaine étape.", "Ressenti, réussites, axes de progrès, suite du cursus : chacun repart en sachant où il en est.", "e2-evaluer", "end") ] },
      end: { depth: 0, end: true, title: "Moniteur, pas seulement plongeur", text: "Bastien : « Séance construite, groupe surveillé, évaluation honnête, incident signalé. C’est le métier. »",
        learn: ["Une compétence à la fois, près d’un fond.", "Tous les élèves dans le champ de vision.", "On valide ce qui est fiable, pas ce qui est espéré.", "Incident = DP prévenu, noté, pas de replongée."] }
    }
  });

  /* ---------- RIFAP : le malaise au port ---------- */
  C.addStory({
    id: "rifap-port", world: "rifap", role: "Secouriste (RIFAP)", icon: "o2", xp: 100, title: "Le malaise du ponton", sub: "Quarante minutes après la plongée, Didier ne se sent pas bien.",
    unlock: null, start: "r1", cast: { nadia: "Nadia, directrice de plongée", didier: "Didier, 55 ans", eric: "Éric, binôme de Didier" },
    nodes: {
      r1: { depth: 0, scene: "Au port, 40 minutes après une plongée à 32 m.", who: "didier", text: "J’ai des fourmis dans les jambes… et je me sens faible.", q: "Que fais-tu ?",
        choices: [
          X("Je lui conseille de marcher un peu pour relancer la circulation.", "L’effort aggrave un accident de désaturation. On met au repos, allongé.", "r-vict"),
          O("Je l’allonge, je préviens Nadia et je pense accident de désaturation.", "Fourmillements et faiblesse après une plongée : on pense ADD jusqu’à preuve du contraire.", "r-vict", "r2"),
          X("Je lui dis de s’asseoir dans sa voiture au frais en attendant.", "Seul dans sa voiture, personne ne le surveille. On l’allonge et on prévient le DP.", "r-vict") ] },
      r2: { depth: 0, scene: "Nadia t’apporte la bouteille d’oxygène.", q: "Comment l’utilises-tu ?",
        choices: [
          X("Avec des lunettes nasales, à faible débit, pour économiser la bouteille.", "Il faut une forte concentration : masque à haute concentration et débit élevé (débit exact : À faire valider).", "r-o2"),
          X("Seulement s’il commence à avoir du mal à respirer.", "Dans un accident de plongée, l’oxygène se donne tout de suite, même s’il respire bien.", "r-o2"),
          O("Masque à haute concentration, débit élevé, tout de suite.", "L’oxygène pur aide à éliminer l’azote et limite les lésions. Plus tôt il est donné, mieux c’est.", "r-o2", "r3") ] },
      r3: { depth: 0, scene: "Didier est sous oxygène.", who: "nadia", text: "Tu passes l’alerte pendant que je reste avec lui ?", q: "Qui appelles-tu ?",
        choices: [
          O("Le 15 (ou le 112) : accident de plongée, signes, heure, profil, gestes faits.", "À terre, le 15 ou le 112 vous met en lien avec un médecin régulateur. En mer, c’est le CROSS par VHF canal 16.", "r-alerte", "r4"),
          X("Sa famille d’abord, pour qu’elle vienne vite le chercher et l’emmène elle-même aux urgences.", "Un transport en voiture fait perdre du temps et l’oxygène. Le médecin régulateur décide du transport.", "r-alerte"),
          X("Le club voisin qui a un caisson, pour qu’ils le prennent directement.", "Le caisson se décide par la régulation médicale, qui organise aussi le transport.", "r-alerte") ] },
      r4: { depth: 0, scene: "Au téléphone.", text: "Le médecin régulateur te pose des questions.", q: "Que lui donnes-tu en priorité ?",
        choices: [
          X("Son nom, son adresse et le nom de son médecin traitant.", "Utile ensuite, mais le médecin a d’abord besoin du profil de plongée et des signes.", "r-bilan"),
          O("Profondeur, durée, paliers, ordinateur, signes et heure de leur début.", "Le profil et l’heure d’apparition des signes orientent le diagnostic et le traitement.", "r-bilan", "r5"),
          X("Le nom du club et de la directrice de plongée, et le numéro de sa licence.", "Ce sont des infos administratives. La régulation a besoin de l’état de la victime et du profil.", "r-bilan") ] },
      r5: { depth: 0, scene: "Didier est bien conscient.", who: "didier", text: "J’ai soif.", q: "Que fais-tu ?",
        choices: [
          X("Je ne lui donne surtout pas à boire, quelle que soit la situation.", "S’il est bien conscient et sans nausée, boire de l’eau par petites gorgées est conseillé (À faire valider).", "r-acc"),
          O("De l’eau plate par petites gorgées, s’il est bien conscient et sans nausée.", "L’hydratation aide la circulation. Seulement s’il est conscient et ne vomit pas.", "r-acc", "r6"),
          X("Une boisson bien fraîche et gazeuse, pour le réveiller un peu.", "On donne de l’eau plate, pas une boisson gazeuse.", "r-acc") ] },
      r6: { depth: 0, scene: "Dix minutes plus tard.", text: "Didier ne répond plus quand tu l’appelles. Il respire.", q: "Que fais-tu ?",
        choices: [
          X("Je le laisse allongé sur le dos, au calme, et je cours chercher les secours au bout du quai.", "Une victime inconsciente sur le dos peut s’étouffer avec sa langue ou en vomissant.", "r-vict", "r6bad"),
          X("Je commence tout de suite les compressions thoraciques.", "Il respire : pas de compressions. La position latérale protège ses voies aériennes.", "r-rcp"),
          O("PLS, oxygène maintenu, et je rappelle pour signaler l’aggravation.", "Inconscient qui respire : PLS, oxygène, nouvel appel. La régulation adapte les secours.", "r-vict", "r7") ] },
      r6bad: { depth: 0, end: true, bad: true, retry: "r6", title: "Voies aériennes bouchées", text: "Quand tu reviens, Didier a vomi et respire très mal. Nadia le met en PLS en urgence ; les secours arrivent, inquiets.",
        why: "Une personne inconsciente sur le dos peut s’étouffer : la langue tombe en arrière, les vomissements vont dans les poumons. On ne la laisse jamais seule.", learn: ["Inconscient qui respire : PLS.", "On ne laisse jamais la victime seule.", "Toute aggravation se signale à la régulation."] },
      r7: { depth: 0, scene: "Les pompiers arrivent.", q: "Que leur transmets-tu ?",
        choices: [
          X("Qu’il a fait une plongée ce matin et qu’il est sous oxygène, ils sauront le reste à l’hôpital.", "Sans détails, l’équipe perd du temps. Profil, heures, gestes et évolution doivent suivre la victime.", "r-sortie"),
          O("La fiche d’évacuation : profil, heure des signes, oxygène depuis quand, évolution.", "La fiche suit la victime jusqu’au caisson : le médecin sait tout ce qui s’est passé.", "r-sortie", "r8"),
          X("Son ordinateur seulement, tout est dedans.", "L’ordinateur aide, mais pas pour les signes, les heures et les gestes faits : la fiche est indispensable.", "r-sortie") ] },
      r8: { depth: 0, scene: "Didier part vers le caisson.", who: "eric", text: "J’ai fait exactement la même plongée que lui. Je replonge cet après-midi ?", q: "Que lui dis-tu ?",
        choices: [
          X("Oui, il n’a aucun signe, c’est que tout va bien pour lui.", "Même profil, même risque : des signes peuvent apparaître plusieurs heures après.", "r-acc"),
          X("Rentre chez toi te reposer, tu n’as plus rien à faire ici.", "Seul chez lui, personne ne le surveille. Il reste sous surveillance et on le signale.", "r-acc"),
          O("Non : même profil, même risque. Tu restes surveillé et on le signale.", "Le binôme d’un accidenté est aussi à risque : pas de plongée, surveillance, signalement à la régulation.", "r-acc", "end") ] },
      end: { depth: 0, end: true, title: "Les bons gestes, dans l’ordre", text: "Le lendemain, Nadia a des nouvelles : Didier récupère bien après le caisson. « L’oxygène tôt, l’alerte précise, la PLS au bon moment. Tu as fait la différence. »",
        learn: ["Signe après une plongée = ADD jusqu’à preuve du contraire.", "Oxygène tout de suite, fort débit.", "Alerte : 15 ou 112 à terre, CROSS en mer.", "Inconscient qui respire : PLS."] }
    }
  });

  /* ---------- Nitrox : l’épave au mélange ---------- */
  C.addStory({
    id: "nx-epave", world: "nitrox", role: "Plongeur Nitrox", icon: "mol", xp: 100, title: "L’épave au Nitrox", sub: "Ton premier Nitrox sur une épave à 30 m, avec Malik qui plonge à l’air.",
    unlock: null, start: "x1", cast: { malik: "Malik, ton binôme à l’air", sarah: "Sarah, gonfleuse du club" },
    nodes: {
      x1: { depth: 0, scene: "Local de gonflage. Ton bloc est étiqueté « Nitrox 32 % ».", who: "sarah", text: "Ton bloc est prêt.", q: "Que fais-tu ?",
        choices: [
          X("Je fais confiance à l’étiquette : Sarah a analysé ce matin.", "Chaque plongeur analyse lui-même son bloc avant de plonger, et le note.", "nx-pratique"),
          X("J’analyse un bloc sur deux seulement, puisqu’ils viennent tous du même remplissage.", "Chaque bloc peut être différent. On analyse le sien, à chaque fois.", "nx-pratique"),
          O("J’analyse moi-même mon bloc, je note le résultat et je signe le registre.", "L’analyse personnelle est la règle : tu sais exactement ce que tu respires.", "nx-pratique", "x2") ] },
      x2: { depth: 0, scene: "L’analyseur affiche 33 %.", q: "Comment règles-tu ton ordinateur ?",
        choices: [
          O("Sur 33 %, la valeur que j’ai mesurée.", "On règle l’ordinateur sur la valeur analysée : c’est elle qui sert au calcul de l’oxygène.", "nx-pratique", "x3"),
          X("Sur 32 %, l’écart d’un point ne change pas grand-chose.", "Sous-estimer l’oxygène fausse la profondeur maximale. On règle ce qu’on a mesuré.", "nx-pratique"),
          X("Sur 21 %, comme de l’air, pour garder plus de marge.", "Régler « air » avec du nitrox sous-estime l’oxygène : l’ordinateur ne t’alertera pas à la bonne profondeur.", "nx-securite") ] },
      x3: { depth: 0, scene: "Ton ardoise. Pp O₂ maximale retenue par le club : 1,6 bar (À faire valider), 1,4 bar conseillé.", q: "Ta profondeur maximale avec 33 % ?",
        choices: [
          X("40 m, la valeur classique pour un Nitrox 32 %.", "Avec 33 % : 1,6 / 0,33 ≈ 4,85 bar, soit environ 38 m. Ton mélange est un peu plus riche.", "nx-calculs"),
          O("Environ 38 m à 1,6 bar, et je vise plutôt 32 m à 1,4 bar.", "Pabs = Pp O₂ / FO₂ : 1,6 / 0,33 ≈ 4,85 bar (≈ 38 m) ; 1,4 / 0,33 ≈ 4,2 bar (≈ 32 m).", "nx-calculs", "x4"),
          X("48 m, en ajoutant la marge habituelle de l’air.", "On ne part pas de l’air : la limite vient de la pression partielle d’oxygène.", "nx-calculs") ] },
      x4: { depth: 0, scene: "Sur le bateau.", who: "malik", text: "Avec ton Nitrox, tu n’auras pas de narcose, toi.", q: "Que lui réponds-tu ?",
        choices: [
          X("Oui, moins d’azote : aucune narcose avec un Nitrox à 32 %.", "L’oxygène est probablement narcotique aussi. On considère la narcose comme à l’air à même profondeur.", "nx-toxo"),
          O("Pas vraiment : on la considère comme à l’air, l’oxygène compte aussi.", "Le Nitrox ne protège pas de la narcose. Son intérêt, c’est moins d’azote pour la décompression.", "nx-toxo", "x5"),
          X("Oui, mais seulement en dessous de 30 m, là où l’azote commence à vraiment compter.", "Aucune règle de ce genre. On la considère comme à l’air.", "nx-toxo") ] },
      x5: { depth: 0, scene: "Plan de plongée.", text: "Toi au Nitrox, Malik à l’air.", q: "Comment gérez-vous la palanquée ?",
        choices: [
          X("Chacun suit son propre ordinateur, quitte à remonter à des moments un peu différents.", "Une palanquée reste ensemble. Elle suit les limites les plus strictes des deux.", "nx-securite"),
          O("Son ordinateur à l’air pour la déco, ma profondeur max pour la profondeur.", "On combine : la décompression la plus pénalisante (l’air) et la profondeur la plus limitée (ton Nitrox).", "nx-securite", "x6"),
          X("On suit le mien, le Nitrox donne plus de temps à tous les deux.", "Malik respire de l’air : son azote compte. Ton ordinateur ne le protège pas.", "nx-securite") ] },
      x6: { depth: 30, scene: "30 m. Un couloir de l’épave descend vers 37 m.", text: "Ton ordinateur bipe : Pp O₂ élevée.", q: "Que fais-tu ?",
        choices: [
          X("Je reste juste le temps d’une photo, la limite a déjà une marge.", "La marge sert aux imprévus, pas à la photo. L’alarme Pp O₂ veut dire : on remonte.", "nx-toxo", "x6b"),
          X("Je descends encore un peu pour voir si l’alarme se coupe seule.", "Plus profond = plus d’oxygène. On remonte au-dessus de la limite.", "nx-toxo"),
          O("Je remonte au-dessus de ma limite, on reste sur le haut de l’épave.", "On respecte la profondeur maximale calculée : l’hyperoxie peut provoquer une crise convulsive sans prévenir.", "nx-toxo", "x7") ] },
      x6b: { depth: 37, alt: true, scene: "37 m.", text: "Ta vision se rétrécit, tes lèvres tremblent.", q: "Que fais-tu ?",
        choices: [
          O("Je remonte de quelques mètres, Malik me tient, on met fin à la plongée.", "Signes d’hyperoxie : on remonte tout de suite et on termine la plongée. Le DP sera prévenu.", "nx-toxo", "x7"),
          X("Je respire plus lentement pour consommer moins d’oxygène.", "Ce n’est pas la quantité respirée qui compte, c’est la Pp O₂ : il faut remonter.", "nx-toxo"),
          X("Je continue la photo en tenant fort l’épave pour ne pas tomber.", "Ces signes peuvent précéder une convulsion. On remonte immédiatement.", "nx-toxo") ] },
      x7: { depth: 0, scene: "Après la plongée.", text: "Ton ordinateur affiche une exposition à l’oxygène (SNC %) plus élevée que d’habitude.", q: "Et pour la plongée suivante ?",
        choices: [
          X("Ce chiffre ne compte que pour les plongées techniques.", "L’exposition à l’oxygène s’additionne entre les plongées : elle compte aussi en loisir.", "nx-toxo"),
          O("J’en tiens compte : plus long intervalle, ou moins profond.", "L’exposition à l’oxygène se cumule et baisse avec le temps en surface.", "nx-toxo", "x8"),
          X("Je replonge au même endroit, le compteur se remet à zéro au bateau.", "Le compteur redescend lentement, pas instantanément. Il faut l’intégrer au plan.", "nx-toxo") ] },
      x8: { depth: 0, scene: "L’après-midi.", who: "sarah", text: "Il me reste un bloc à 40 % pour toi.", q: "Que vérifies-tu ?",
        choices: [
          X("Rien de nouveau : même plan qu’au 32 %, seul le temps sans palier change.", "La profondeur maximale baisse beaucoup avec 40 % : environ 25 m à 1,4 bar.", "nx-calculs"),
          X("Que la bouteille est bien pleine et bien fermée, le pourcentage est déjà écrit sur l’étiquette.", "On analyse, on vérifie sa qualification et on recalcule la profondeur maximale.", "nx-pratique"),
          O("Ma qualification pour ce mélange, l’analyse, et la profondeur max : environ 25 m à 1,4 bar.", "1,4 / 0,40 = 3,5 bar, soit 25 m. Vérifie aussi que ta qualification couvre ce pourcentage (À faire valider).", "nx-confirme", "end") ] },
      end: { depth: 0, end: true, title: "Le Nitrox maîtrisé", text: "Malik : « Je pensais que le Nitrox, c’était juste plus de temps. Tu as tout analysé, tout recalculé. » Sarah te tend le registre signé.",
        learn: ["On analyse son bloc et on règle l’ordinateur sur la mesure.", "Profondeur max (m) = (Pp O₂ max ÷ FO₂ − 1) × 10.", "Le Nitrox ne protège pas de la narcose.", "L’exposition à l’oxygène se cumule."] }
    }
  });

  /* Rôles des aventures existantes */
  [["anse", "Plongeur autonome (N2)"], ["recif", "Secouriste (RIFAP)"], ["bapteme", "Moniteur de baptême"]].forEach(([id, r]) => { if (C.storyById[id]) C.storyById[id].role = r; });

  /* Trophées des aventures */
  C.addBadges([
    { id: "story5", icon: "scroll", name: "Conteur des profondeurs", desc: "Finir 5 aventures", test: { k: "story", n: 5 } },
    { id: "story12", icon: "trophy", name: "Toutes les vies du plongeur", desc: "Finir les 12 aventures", test: { k: "story", n: 12 } }
  ]);
})();
