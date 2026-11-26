/* =====================================================================
   Abysse Academy 2.3 · N3 complet
   Six thèmes ajoutés (physique appliquée, barotraumatismes, tables et
   procédures, orientation, plongées particulières, bloc et gonflage),
   cours existants allongés, 16 questions par thème, notions du tuteur.
   Règle : aucune valeur de table MN90 recopiée. Les points
   réglementaires sont marqués « à faire valider par ton moniteur ».
   Questions : on ajoute à la fin, on ne réordonne jamais.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content, D = C.dgb || {};
  const VAL = `<div class="callout trap"><span class="eyebrow">À faire valider</span>`;

  /* ---------- Schémas ---------- */
  if (D.flow) C.addDiagrams({
    "n3-relevage": () => D.flow([["Poids apparent", "Poids − (volume × densité de l’eau). C’est ce que le parachute doit porter."], ["Volume au fond", "Autant de litres d’air que de kilos à compenser."], ["Air pris au bloc", "Volume au fond × pression absolue = litres « surface »."], ["Bar consommés", "Litres surface ÷ volume du bloc."], ["À la remontée", "L’air se dilate : le parachute ouvert en bas purge l’excès."]], "Méthode du relevage au parachute : de la masse de l’objet aux bar pris dans ton bloc."),
    "n3-baro": () => D.flow([["Descente", "Oreilles, sinus, masque : les cavités se « vident » de pression. On équilibre tôt."], ["Au fond", "Dents abîmées, plombages : une petite bulle sous un soin peut faire mal."], ["Remontée", "L’air se dilate : poumons, estomac, intestins, sinus et oreilles doivent laisser sortir l’air."], ["Après", "Douleur, vertiges, saignement : on le signale, on ne replonge pas."]], "Les barotraumatismes au fil de la plongée : à la descente, l’air manque dans les cavités ; à la remontée, il doit sortir."),
    "n3-compas": () => D.flow([["Viser", "Ligne de foi dans l’axe du corps, compas à plat."], ["Caler la couronne", "Les repères de la couronne encadrent l’aiguille."], ["Suivre", "Garder l’aiguille dans les repères en palmant, compter les cycles."], ["Retour", "Demi-tour : cap + 180° (ou − 180°), on recale la couronne."], ["Vérifier", "Relief, profondeur, ombre du soleil confirment la route."]], "Naviguer au compas : un aller-retour simple sur un cap."),
    "n3-nuit": () => D.signs([["Cercle avec la lampe", "Ça va"], ["Lampe agitée de haut en bas", "Ça ne va pas, attention"], ["Lampe balancée vite à gauche à droite", "Urgence, viens vite"], ["Éclairer sa main pour signer", "Signes classiques lisibles"], ["Ne jamais viser le visage", "On éclaire le sol devant l’autre"]], "Communiquer de nuit : signes à la lampe (conventions courantes, à revoir au briefing)."),
    "n3-bloc": () => D.flow([["Marquages", "Pression de service, pression d’épreuve, date d’épreuve, volume."], ["Inspection visuelle", "Contrôle intérieur et extérieur, au moins chaque année en club."], ["Requalification", "Épreuve périodique par un organisme habilité."], ["Gonflage", "Air sec et propre, bloc dans l’eau ou ventilé, sans dépasser la pression de service."], ["Usage", "Robinet ouvert à fond puis un quart de tour, transport calé, stockage avec un peu de pression."]], "La vie d’un bloc : marquages, contrôles et gonflage (périodicités à faire valider)."),
    "n3-tables": () => D.flow([["Paramètres", "Profondeur maxi atteinte, durée depuis le début de la descente jusqu’au départ du fond."], ["Lecture", "Ligne de profondeur égale ou juste supérieure, durée égale ou juste supérieure."], ["Paliers", "Profondeur et durée lues, vitesse de remontée respectée."], ["Groupe", "La lettre de fin de plongée sert pour une successive."], ["Cas particuliers", "Remontée rapide, palier interrompu, altitude, avion : procédures de la table."]], "Utiliser une table : toujours arrondir du côté de la sécurité."),
    "n3-henry": () => D.bubbles("Loi de Henry : plus la pression partielle d’azote est forte, plus il s’en dissout dans le sang et les tissus. À la remontée, la pression baisse : l’azote ressort, doucement s’il en a le temps.", "désaturation contrôlée", "sursaturation critique")
  });

  /* ---------- Nouveaux thèmes ---------- */
  C.module({
    id: "n3-physique", world: "n3", depth: "−30 m", icon: "scale",
    title: "Physique appliquée N3",
    sub: "Relevage, flottabilité, Henry, vision et son",
    diagram: "n3-relevage",
    essentiel: `
<p>Au N3, la physique sert à <b>décider</b> : combien d’air mettre dans un parachute, comment évolue ta flottabilité, pourquoi les bulles se forment. Les calculs de l’examen se résolvent avec quatre lois.</p>
<div class="tbl"><table><tr><th>Loi</th><th>Ce qu’elle dit</th><th>Usage N3</th></tr>
<tr><td>Archimède</td><td>Un corps immergé reçoit une poussée égale au poids du volume d’eau déplacé.</td><td>Lestage, relevage, poumon-ballast.</td></tr>
<tr><td>Mariotte</td><td>P × V = constante (à température constante).</td><td>Consommation, autonomie, gilet et parachute.</td></tr>
<tr><td>Dalton</td><td>Pp = P absolue × fraction du gaz.</td><td>Narcose, toxicité de l’O₂, nitrox.</td></tr>
<tr><td>Henry</td><td>Le gaz dissous est proportionnel à sa pression partielle.</td><td>Saturation, décompression.</td></tr></table></div>
<h3>Le relevage au parachute</h3>
<p>On ne soulève pas le poids réel, mais le <b>poids apparent</b> : poids réel − poussée. En mer, la poussée vaut volume × 1,03.</p>
<div class="callout ex"><span class="eyebrow">Exemple</span>Ancre de 50 kg, volume 15 L, à 30 m en mer. Poussée ≈ 15 × 1,03 ≈ 15,5 kg. Poids apparent ≈ 34,5 kg : il faut ≈ <b>35 L d’air au fond</b>. À 30 m (4 bar), ces 35 L représentent 35 × 4 = <b>140 L</b> « surface ». Avec un bloc de 12 L : 140 ÷ 12 ≈ <b>12 bar</b> pris dans ton bloc.</div>
<p>À la remontée, l’air du parachute <b>se dilate</b> : l’objet accélère. Un parachute ouvert en bas laisse échapper l’excès ; un ballon fermé peut partir comme une fusée. On reste <b>à côté</b>, jamais dessous, et on ne s’y accroche pas.</p>
<h3>Ta flottabilité change pendant la plongée</h3>
<ul><li><b>Le néoprène s’écrase</b> en descendant : tu deviens plus lourd au fond, tu compenses au gilet.</li>
<li><b>Le bloc s’allège</b> en se vidant : l’air pèse environ 1,3 g par litre. Un 15 L qui passe de 200 à 50 bar perd 2 250 L d’air, soit ≈ <b>3 kg</b>. Ton lest doit permettre le palier en fin de plongée, bloc presque vide.</li>
<li><b>Eau douce</b> : moins dense que la mer, elle porte moins : on retire du lest.</li></ul>
<h3>Vision et son sous l’eau</h3>
<p>À travers le masque, les objets paraissent <b>plus proches (environ ¾ de la distance) et plus gros (environ 4/3)</b>. Les couleurs disparaissent avec la profondeur : le <b>rouge d’abord</b>, puis l’orange et le jaune ; il reste le bleu et le vert. Le son va environ <b>4 à 5 fois plus vite</b> dans l’eau (≈ 1 500 m/s) : on l’entend bien, mais on ne sait pas d’où il vient.</p>`,
    approfondir: `
<h3>Henry : pourquoi on désature</h3>
<p>À une pression partielle donnée, un tissu finit par contenir une quantité fixe d’azote : il est <b>saturé</b>. En descendant, la Pp N₂ augmente : les tissus se chargent (<b>sous-saturation</b>, ils absorbent). En remontant, elle baisse : les tissus contiennent plus d’azote que l’équilibre (<b>sursaturation</b>) et le rendent. Tant que cette sursaturation reste modérée, l’azote part par le sang et les poumons. Au-delà d’un seuil critique, des <b>bulles</b> se forment : c’est l’ADD. Les tables et ordinateurs servent à rester sous ce seuil.</p>
<h3>Charles et le gonflage</h3>
<p>À volume constant, la pression d’un gaz varie avec la température absolue (en kelvins). Un bloc gonflé chaud perd de la pression en refroidissant dans l’eau : 200 bar à 40 °C (313 K) deviennent ≈ 184 bar à 15 °C (288 K). À l’inverse, un bloc plein laissé au soleil monte en pression.</p>
<h3>Le poumon-ballast</h3>
<p>Tes poumons varient d’environ 3 à 4 L entre une expiration et une inspiration profondes : c’est ±3 à 4 kg de poussée. Le gilet règle le gros, la respiration affine.</p>`,
    memo: [["Poids apparent", "Poids réel − volume × densité de l’eau."], ["Relevage", "Litres au fond = kilos à porter ; × P abs = litres surface ; ÷ volume du bloc = bar."], ["Bloc qui se vide", "≈ 1,3 g par litre d’air : un 15 L de 200 à 50 bar ≈ 3 kg plus léger."], ["Henry", "Gaz dissous proportionnel à sa Pp : on charge en descendant, on rend en remontant."], ["Vision", "Plus proche (¾), plus gros (4/3), rouge perdu en premier."], ["Son", "≈ 1 500 m/s : entendu, mais pas localisé."]],
    moniteur: ["Quelle méthode de relevage pratique-t-on au club, et avec quel parachute ?", "Quel lestage vérifier en fin de plongée, bloc presque vide ?"],
    quiz: [
      { q: "Objet de 40 kg, volume 10 L, en mer (1,03). Poids apparent environ ?", c: ["≈ 30 kg", "≈ 29,7 kg", "≈ 40 kg", "≈ 50 kg"], a: 1, e: "Poussée = 10 × 1,03 = 10,3 kg. 40 − 10,3 = 29,7 kg : il faut ≈ 30 L d’air au fond. Le piège : oublier la densité de l’eau de mer." },
      { q: "Il faut 30 L d’air dans un parachute à 20 m. Combien de litres « surface » cela prend-il au bloc ?", c: ["30 L", "60 L", "90 L", "600 L"], a: 2, e: "À 20 m, P abs = 3 bar : 30 × 3 = 90 L détendus. Le piège : multiplier par la pression relative (2) au lieu de l’absolue." },
      { q: "90 L d’air « surface » pris dans un bloc de 15 L : combien de bar perds-tu ?", c: ["6 bar", "9 bar", "15 bar", "1,5 bar"], a: 0, e: "90 ÷ 15 = 6 bar." },
      { q: "Pendant la remontée d’un objet au parachute ouvert en bas, que se passe-t-il ?", c: ["L’air se comprime, l’objet ralentit", "L’air se dilate, l’excès s’échappe par le bas", "Le volume ne change pas", "L’air se dilate et le parachute éclate"], a: 1, e: "Mariotte : l’air se dilate en montant. Un parachute ouvert purge l’excès, ce qui limite l’emballement." },
      { q: "Où te places-tu pendant un relevage ?", c: ["Sous l’objet, pour le guider", "À côté, sans t’accrocher au parachute", "Accroché au parachute pour le freiner", "Au-dessus, pour le tirer"], a: 1, e: "S’il s’emballe ou retombe, tu ne dois être ni dessous ni accroché : remontée incontrôlée assurée." },
      { q: "Un bloc de 12 L passe de 200 à 50 bar. Tu es plus léger d’environ…", c: ["1 kg", "2,3 kg", "3,5 kg", "0,5 kg"], a: 1, e: "150 bar × 12 L = 1 800 L d’air, × 1,3 g ≈ 2,3 kg. Ton lest doit en tenir compte pour le palier." },
      { q: "Pourquoi te sens-tu plus lourd au fond qu’en surface, sans rien changer ?", c: ["Le bloc est plus plein au fond", "Le néoprène s’écrase et déplace moins d’eau", "L’eau est plus dense au fond", "Les poumons se remplissent d’azote"], a: 1, e: "La combinaison contient des bulles de gaz : elles s’écrasent avec la pression, le volume diminue, la poussée aussi." },
      { q: "À travers le masque, une roche à 4 m paraît à environ…", c: ["5,3 m", "4 m", "3 m", "2 m"], a: 2, e: "Les objets paraissent plus proches, environ aux ¾ de leur distance : 4 × ¾ = 3 m. Et plus gros (environ 4/3)." },
      { q: "Quelle couleur disparaît en premier avec la profondeur ?", c: ["Le jaune", "Le vert", "Le rouge", "Le bleu"], a: 2, e: "L’eau absorbe d’abord les grandes longueurs d’onde : rouge, puis orange, puis jaune. Une lampe rend les couleurs." },
      { q: "Pourquoi a-t-on du mal à savoir d’où vient un bruit de moteur sous l’eau ?", c: ["Le son va beaucoup plus vite dans l’eau", "Le son va moins vite dans l’eau", "Le masque bloque le son", "L’eau absorbe les aigus"], a: 0, e: "≈ 1 500 m/s : il arrive aux deux oreilles presque en même temps, le cerveau ne peut pas comparer. On s’en méfie et on remonte près du bout ou de la paroi." },
      { q: "La loi de Henry dit que la quantité de gaz dissous dans un liquide est proportionnelle…", c: ["à la température du liquide", "à la pression partielle du gaz", "au volume du liquide", "à la profondeur, indépendamment du gaz"], a: 1, e: "C’est la pression partielle qui compte : à l’air, la Pp N₂ = P abs × 0,79." },
      { q: "Pendant la descente, tes tissus sont…", c: ["en sursaturation : ils rendent l’azote", "en sous-saturation : ils absorbent l’azote", "saturés dès les dix premiers mètres", "vides d’azote jusqu’au fond"], a: 1, e: "La Pp N₂ augmente : il y a plus d’azote autour qu’à l’intérieur, les tissus se chargent." },
      { q: "Un bloc gonflé à 230 bar à 47 °C (320 K) est plongé à 15 °C (288 K). Pression environ ?", c: ["≈ 230 bar", "≈ 207 bar", "≈ 74 bar", "≈ 255 bar"], a: 1, e: "Loi de Charles (en kelvins) : 230 × 288 ÷ 320 ≈ 207 bar. Le piège : calculer avec des degrés Celsius." },
      { q: "Tu passes de la mer à un lac avec le même équipement. Ton lest…", c: ["augmente un peu", "diminue un peu", "ne change pas", "dépend de la profondeur du lac"], a: 1, e: "L’eau douce est moins dense (1 contre 1,03) : elle porte moins, on retire un peu de lest." },
      { q: "Entre expiration et inspiration profondes, la poussée de tes poumons varie d’environ…", c: ["0,5 kg", "1 kg", "3 à 4 kg", "10 kg"], a: 2, e: "Le volume pulmonaire varie de 3 à 4 L : autant de kilos de poussée. C’est le poumon-ballast." },
      { q: "On remplit un parachute de 20 L au fond à 40 m. Quel volume aurait cet air en surface ?", c: ["40 L", "80 L", "100 L", "20 L"], a: 2, e: "40 m : P abs = 5 bar. 20 × 5 = 100 L : d’où l’importance d’un parachute ouvert qui purge en remontant." }
    ]
  });

  C.module({
    id: "n3-baro", world: "n3", depth: "−15 m", icon: "lungs",
    title: "Barotraumatismes",
    sub: "Oreilles, sinus, dents, ventre, poumons",
    diagram: "n3-baro",
    essentiel: `
<p>Un <b>barotraumatisme</b> est une lésion causée par une différence de pression entre une cavité d’air du corps et l’eau autour. Toutes les cavités rigides ou semi-rigides sont concernées : oreilles, sinus, dents, masque, poumons, estomac et intestins.</p>
<h3>À la descente : l’air manque</h3>
<ul><li><b>Oreille moyenne</b> : le tympan est poussé vers l’intérieur. Si la trompe d’Eustache ne s’ouvre pas : douleur, puis possible rupture du tympan (vertige brutal quand l’eau froide entre). <b>Prévention</b> : équilibrer tôt et souvent, ne jamais forcer, remonter d’un mètre si ça bloque.</li>
<li><b>Sinus</b> : douleur au front ou aux joues, parfois saignement du nez. Un rhume bouche les canaux : on ne plonge pas.</li>
<li><b>Placage de masque</b> : le masque aspire le visage, yeux rouges. On souffle un peu par le nez.</li></ul>
<h3>À la remontée : l’air doit sortir</h3>
<ul><li><b>Surpression pulmonaire</b> : l’accident le plus grave. Air bloqué dans les poumons à la remontée (apnée, panique, toux, spasme) : les alvéoles se déchirent. Signes : douleur thoracique, toux, crachats sanglants, gêne respiratoire, parfois signes neurologiques (bulles dans les artères). <b>Urgence vitale</b> : oxygène, alerte, position semi-assise si la victime est consciente et gênée pour respirer.</li>
<li><b>Estomac et intestins</b> : les gaz se dilatent. Douleurs, ballonnements. On évite les boissons gazeuses et les repas lourds avant de plonger.</li>
<li><b>Dents</b> : une bulle d’air sous un soin ou une carie peut faire très mal, en descente comme en remontée. Contrôle dentaire régulier.</li>
<li><b>Oreille à la remontée</b> : l’air sort en général seul. Si une oreille se « débloque » plus tard que l’autre : vertige alterno-barique. On s’arrête, on se tient au bout, ça passe.</li></ul>
<h3>Oreille interne : danger du Valsalva forcé</h3>
<p>Souffler très fort nez pincé contre une trompe bloquée peut léser l’oreille interne : vertiges, sifflements, baisse d’audition. Signes à prendre au sérieux : <b>oxygène et avis médical</b>, car ils peuvent ressembler à un ADD de l’oreille interne.</p>`,
    approfondir: `
<h3>Pourquoi la zone 0-10 m est la plus dangereuse</h3>
<p>La pression double entre 0 et 10 m : un poumon plein d’air à 10 m qui remonte bloqué voit son volume doubler. Entre 30 et 40 m, la variation n’est que de 25 %. C’est pour cela que les exercices près de la surface (remontées, lâcher de détendeur) demandent la plus grande vigilance.</p>
<h3>Les manœuvres d’équilibrage</h3>
<ul><li><b>Valsalva</b> : nez pincé, on souffle doucement. Simple, mais à ne pas forcer.</li>
<li><b>Frenzel</b> : nez pincé, glotte fermée, la langue pousse l’air vers l’arrière. Plus doux.</li>
<li><b>Béance tubaire volontaire</b> (BTV) : ouvrir les trompes par les muscles du voile du palais, sans souffler. Ça s’apprend.</li>
<li><b>Déglutition, mouvements de mâchoire</b> : aident souvent.</li></ul>`,
    memo: [["Barotraumatisme", "Écart de pression entre une cavité d’air et l’eau."], ["Descente", "Oreilles, sinus, masque : équilibrer tôt, jamais forcer."], ["Remontée", "Poumons, ventre : l’air doit sortir. Ne jamais bloquer."], ["Surpression pulmonaire", "Douleur thoracique, crachats sanglants : O₂, alerte, urgence vitale."], ["Valsalva forcé", "Risque d’oreille interne : vertiges, sifflements → O₂ et médecin."], ["0-10 m", "La pression double : zone la plus à risque."]],
    moniteur: ["Quelle manœuvre d’équilibrage me conseilles-tu de travailler ?", "Que fait-on au club en cas de vertige à la remontée ?"],
    quiz: [
      { q: "À quel moment le barotraumatisme de l’oreille moyenne est-il le plus fréquent ?", c: ["À la remontée", "À la descente", "Au palier", "En surface après la plongée"], a: 1, e: "En descendant, la pression extérieure augmente plus vite que dans l’oreille : il faut y faire entrer de l’air." },
      { q: "Pendant la descente, une douleur au front apparaît, avec un peu de sang dans le masque. On pense à…", c: ["une surpression pulmonaire", "un barotraumatisme des sinus", "un placage de masque", "une rupture du tympan"], a: 1, e: "Douleur frontale ou des joues et saignement du nez : sinus mal ventilés, souvent à cause d’un rhume." },
      { q: "Le tympan se rompt à 8 m. Quel signe est typique ?", c: ["Une euphorie soudaine et des rires", "Un vertige brutal quand l’eau froide entre", "Des crachats sanglants en surface", "Une douleur au coude après la plongée"], a: 1, e: "L’eau froide dans l’oreille moyenne perturbe l’équilibre : vertige violent. On se tient, on remonte doucement avec le binôme." },
      { q: "Lequel provoque le plus souvent une surpression pulmonaire ?", c: ["Une descente trop rapide sans équilibrer", "Un blocage respiratoire à la remontée", "Un effort important au fond", "Une plongée longue et profonde"], a: 1, e: "Panique, toux, apnée volontaire : l’air dilaté ne peut pas sortir et déchire les alvéoles." },
      { q: "Douleur thoracique et crachats sanglants juste après une remontée en panique. Conduite ?", c: ["Repos, et on voit demain", "Oxygène, alerte, surveillance", "Redescendre à 3 m pour recompresser", "Faire tousser fort pour dégager"], a: 1, e: "Urgence vitale : oxygène au masque haute concentration, alerte des secours, surveillance." },
      { q: "Tu souffles très fort nez pincé, puis apparaissent vertiges et sifflement d’oreille. Risque ?", c: ["Placage de masque", "Lésion de l’oreille interne", "Narcose", "Barotraumatisme des sinus"], a: 1, e: "Un Valsalva forcé peut léser l’oreille interne. Oxygène et avis médical : les signes ressemblent à un ADD vestibulaire." },
      { q: "À la remontée, une oreille se débouche bien après l’autre et tout tourne. C’est…", c: ["un ADD vestibulaire", "un vertige alterno-barique", "une narcose", "une hypothermie"], a: 1, e: "La différence de pression entre les deux oreilles donne un vertige bref. On s’arrête, on se tient, ça passe en général vite." },
      { q: "Pourquoi éviter les boissons gazeuses avant une plongée ?", c: ["Elles déshydratent avant la plongée", "Les gaz de l’intestin se dilatent en remontant", "Elles augmentent la sensibilité à la narcose", "Elles gênent l’équilibrage des oreilles"], a: 1, e: "Mariotte encore : le gaz du ventre se dilate en remontant, douleurs et ballonnements." },
      { q: "Une dent fait très mal à la remontée. Cause probable ?", c: ["Le froid sur l’émail", "Une bulle d’air sous un soin ou une carie", "Une sinusite", "La morsure trop forte de l’embout"], a: 1, e: "L’air piégé sous un plombage se dilate. Contrôle chez le dentiste avant de replonger." },
      { q: "Tes yeux sont rouges après la plongée et le masque te serrait au fond. Tu as eu…", c: ["une conjonctivite", "un placage de masque", "une surpression pulmonaire", "un barotraumatisme des sinus"], a: 1, e: "Le volume d’air du masque diminue en descendant : il aspire le visage. On souffle un peu par le nez." },
      { q: "Dans quelle tranche le volume d’un poumon bloqué varie-t-il le plus à la remontée ?", c: ["De 40 à 30 m", "De 30 à 20 m", "De 20 à 10 m", "De 10 m à la surface"], a: 3, e: "De 2 à 1 bar, le volume double : c’est près de la surface que le risque de surpression est le plus grand." },
      { q: "La manœuvre de Frenzel consiste à…", c: ["souffler fort nez pincé, bouche fermée", "pousser l’air avec la langue, nez pincé", "avaler plusieurs fois de suite", "bâiller sans souffler ni pincer le nez"], a: 1, e: "Plus douce que le Valsalva : c’est la langue qui pousse l’air vers les trompes." },
      { q: "Tu as un rhume léger le matin d’une plongée à 40 m. Le plus prudent ?", c: ["Plonger avec un spray nasal", "Ne pas plonger", "Plonger en restant à 20 m", "Plonger en équilibrant plus fort"], a: 1, e: "Trompes et sinus mal ventilés : barotraumatismes, et un spray peut cesser d’agir au fond, bloquant la remontée." },
      { q: "Une surpression pulmonaire peut aussi donner des signes neurologiques, parce que…", c: ["la narcose s’ajoute à l’accident", "des bulles d’air passent dans les artères", "le CO₂ s’accumule dans le sang", "l’oxygène devient toxique en surface"], a: 1, e: "Les alvéoles déchirées laissent passer de l’air dans la circulation : il peut boucher une artère du cerveau." },
      { q: "Ton oreille ne passe pas à 3 m malgré deux essais doux. Tu…", c: ["continues en soufflant plus fort", "remontes un peu et réessaies doucement", "descends vite pour passer le cap", "attends à 3 m que ça passe seul"], a: 1, e: "Réduire l’écart en remontant d’un mètre ou deux, puis équilibrer en douceur. Si ça ne passe pas : on n’insiste pas." },
      { q: "Victime consciente d’une surpression pulmonaire, gênée pour respirer. Position conseillée ?", c: ["Allongée à plat, jambes surélevées", "Semi-assise, sous oxygène", "En PLS sous oxygène", "Debout pour mieux respirer"], a: 1, e: "Consciente et gênée pour respirer : semi-assise, oxygène, alerte. La PLS, c’est pour un inconscient qui respire." }
    ]
  });

  C.module({
    id: "n3-tables", world: "n3", depth: "−40 m", icon: "table",
    title: "Tables : procédures et cas",
    sub: "Lire, arrondir, remontée rapide, altitude, avion",
    diagram: "n3-tables",
    essentiel: `
<p>L’examen N3 te demande de <b>planifier</b> une plongée avec paliers et de savoir réagir quand elle ne se passe pas comme prévu. Ici on travaille la <b>méthode</b> ; les valeurs se lisent sur <b>ta table officielle</b>.</p>
<h3>Les paramètres</h3>
<ul><li><b>Profondeur</b> : la profondeur maximale atteinte, même un court instant.</li>
<li><b>Durée</b> : du début de la descente au <b>départ du fond</b> (début de la remontée).</li>
<li><b>Arrondi</b> : si la valeur exacte n’existe pas, on prend la <b>ligne juste supérieure</b> (profondeur et durée). Toujours du côté de la sécurité.</li></ul>
<h3>La remontée</h3>
<p>Vitesse imposée par la table jusqu’au premier palier, paliers à la profondeur indiquée (repère : la poitrine), vitesse plus lente entre paliers et jusqu’à la surface. La <b>durée totale de remontée</b> (DTR) sert à prévoir l’air nécessaire.</p>
<h3>Successives et consécutives</h3>
<p>Fin de 1ʳᵉ plongée : un <b>groupe</b> (lettre). Pendant l’intervalle, l’azote résiduel baisse. Pour la 2ᵉ plongée : azote résiduel + profondeur → une <b>majoration</b> en minutes à ajouter à la durée réelle. Intervalle trop court : <b>une seule plongée</b> (profondeur la plus grande, durées additionnées). Intervalle très long : plongée isolée.</p>
<h3>Quand ça ne se passe pas comme prévu</h3>
<ul><li><b>Remontée trop rapide</b> : la table prévoit une procédure (redescendre si c’est possible sans danger, paliers majorés). Si on ne peut pas : oxygène, surveillance, pas de nouvelle plongée.</li>
<li><b>Palier interrompu</b> (incident, air) : procédure de la table, ou en surface oxygène et surveillance.</li>
<li><b>Plongée plus profonde ou plus longue que prévu</b> : on relit la table avec les vrais paramètres, et l’air doit suivre.</li></ul>
${VAL}Intervalles, vitesses et procédures exactes dépendent de la table utilisée (MN90 ou autre) : lis-les sur ta table officielle et fais-les valider par ton moniteur.</div>`,
    approfondir: `
<h3>Altitude</h3>
<p>Au-dessus d’environ 300 m d’altitude, la pression en surface est plus faible : le rapport entre pression au fond et pression en surface est <b>plus grand</b> qu’en mer pour la même profondeur. Les tables « mer » ne conviennent plus : on utilise une méthode altitude (tables spécifiques, profondeur fictive, ordinateur en mode altitude). Monter en altitude juste après une plongée (col, route de montagne) pose le même problème que l’avion.</p>
<h3>L’avion après la plongée</h3>
<p>La cabine est pressurisée à une altitude équivalente de 1 800 à 2 400 m environ : la pression baisse, l’azote restant peut former des bulles. On respecte le délai conseillé par l’ordinateur ou par les recommandations (souvent au moins 12 h après une plongée simple, plus après plusieurs jours ou des paliers).</p>
<h3>Table et ordinateur ensemble</h3>
<p>L’ordinateur suit ton profil réel et donne souvent plus de temps sans palier que la table, qui suppose que tu es resté au maximum tout le temps. Mais s’il tombe en panne, la table et une montre plus un profondimètre te ramènent. En palanquée, on suit le plus pénalisant.</p>`,
    memo: [["Profondeur", "La maxi atteinte, même un instant."], ["Durée", "Du début de la descente au départ du fond."], ["Arrondi", "Ligne juste supérieure, profondeur et durée."], ["Successive", "Groupe → azote résiduel → majoration ajoutée à la durée."], ["Consécutive", "Intervalle trop court : une seule plongée."], ["Altitude, avion", "Pression de surface plus basse : méthode adaptée, délai avant de monter."]],
    moniteur: ["Quelle procédure de remontée rapide appliquons-nous avec notre table ?", "Quel délai avant l’avion retient-on au club ?"],
    quiz: [
      { q: "Tu as atteint 33 m une minute, puis passé le reste à 25 m. Quelle profondeur utilises-tu dans la table ?", c: ["25 m", "29 m, la moyenne", "33 m, arrondie à la ligne supérieure", "30 m, la ligne la plus proche"], a: 2, e: "La table travaille avec la profondeur maximale, arrondie à la ligne égale ou supérieure. L’ordinateur, lui, suit le profil réel." },
      { q: "La durée de plongée à utiliser dans la table se compte…", c: ["de l’immersion à la sortie de l’eau", "du début de la descente au départ du fond", "de l’arrivée au fond au départ du fond", "du début de la descente au premier palier"], a: 1, e: "Elle s’arrête quand on quitte le fond pour remonter. La remontée et les paliers ne comptent pas dans cette durée." },
      { q: "Ta durée exacte n’existe pas dans la table. Tu prends…", c: ["la durée juste inférieure", "la durée juste supérieure", "la plus proche", "la moyenne des deux"], a: 1, e: "Toujours l’arrondi du côté de la sécurité." },
      { q: "À quoi sert la lettre de groupe donnée en fin de plongée ?", c: ["À choisir la vitesse de remontée", "À calculer une plongée successive", "À fixer la durée du palier", "À noter le niveau du plongeur"], a: 1, e: "Elle mesure l’azote restant : avec l’intervalle, on en tire l’azote résiduel puis la majoration." },
      { q: "La majoration d’une plongée successive s’ajoute…", c: ["à la profondeur", "à la durée réelle de la 2ᵉ plongée", "à la durée de l’intervalle", "au palier de 3 m"], a: 1, e: "Durée fictive = durée réelle + majoration. On lit ensuite la table avec cette durée et la profondeur de la 2ᵉ plongée." },
      { q: "Deux plongées séparées d’un intervalle trop court pour une successive. On calcule…", c: ["deux plongées isolées, sans majoration", "une successive avec la majoration maximale", "une seule : profondeur maxi, durées additionnées", "la 2ᵉ plongée seule, la plus récente"], a: 2, e: "C’est une plongée consécutive : le corps n’a pas eu le temps de désaturer, on les traite comme une seule." },
      { q: "La DTR, c’est…", c: ["la durée totale de la plongée", "la durée totale de remontée, paliers compris", "la durée du palier le plus long", "la durée de remontée jusqu’au 1er palier"], a: 1, e: "Elle sert à prévoir l’air de la remontée : DTR × conso moyenne × pression moyenne." },
      { q: "Remontée trop rapide sans pouvoir redescendre (plus d’air). En surface, on…", c: ["replonge vite avec un autre bloc", "donne l’O₂, surveille, pas d’autre plongée", "attend une heure puis replonge à 6 m", "fait un palier de 3 m en apnée"], a: 1, e: "On traite comme un risque d’ADD : oxygène, surveillance, DP prévenu, pas de nouvelle plongée." },
      { q: "Pourquoi les tables « mer » ne conviennent-elles pas dans un lac de montagne ?", c: ["L’eau douce est plus dense", "La pression en surface est plus faible", "L’eau y est toujours plus froide", "La narcose y est plus forte"], a: 1, e: "Le rapport pression fond / surface est plus grand pour une même profondeur : il faut une méthode altitude." },
      { q: "Pourquoi éviter la route d’un col juste après une plongée en mer ?", c: ["À cause du mal des transports", "La pression baisse en altitude, comme en avion", "Le froid du col favorise les crampes", "Ça ne pose problème qu’après 3 plongées"], a: 1, e: "Monter en altitude, c’est faire baisser la pression ambiante : l’azote restant peut former des bulles." },
      { q: "Pendant une plongée prévue à 30 m, tu descends à 36 m. Pour la remontée, tu…", c: ["suis la table à 30 m, c’était prévu", "relis la table avec 36 m (ligne supérieure)", "fais la moyenne entre 30 et 36 m", "ajoutes 6 minutes au palier"], a: 1, e: "On calcule avec les vrais paramètres. Et on vérifie que l’air suffit pour la nouvelle remontée." },
      { q: "Au palier, quelle partie du corps est à la profondeur indiquée ?", c: ["Les palmes", "La poitrine", "Le masque", "L’ordinateur au poignet, peu importe la position"], a: 1, e: "Ce sont les poumons qui comptent : la poitrine à la profondeur du palier." },
      { q: "Pourquoi l’ordinateur donne-t-il souvent plus de temps sans palier que la table ?", c: ["Il est moins prudent que la table", "Il suit le profil réel, pas le maxi", "Il ne compte pas le temps de descente", "Il ignore l’azote des plongées passées"], a: 1, e: "La table suppose le pire profil (carré). L’ordinateur suit chaque mètre réel." },
      { q: "En palanquée, deux ordinateurs ne donnent pas le même palier. On suit…", c: ["le moins pénalisant", "le plus pénalisant", "celui du guide", "la table, par défaut"], a: 1, e: "On reste ensemble et on prend la marge la plus grande." },
      { q: "Ton ordinateur tombe en panne au fond, tu as une table. Il te faut aussi…", c: ["rien d’autre", "une montre et un profondimètre", "un compas", "un manomètre de secours"], a: 1, e: "Sans profondeur ni durée, la table ne sert à rien : c’est pourquoi on plonge avec un moyen de secours." },
      { q: "Un palier a été interrompu par un incident. Ce qu’on fait dépend…", c: ["de l’ordinateur du guide uniquement", "de la procédure de ta table et de la situation", "de la durée de la plongée seulement", "de la profondeur du palier seulement"], a: 1, e: "Les tables prévoient des procédures. En surface, on surveille et on donne l’oxygène au moindre signe." }
    ]
  });

  C.module({
    id: "n3-orientation", world: "n3", depth: "−20 m", icon: "compass",
    title: "Orientation et navigation",
    sub: "Compas, repères naturels, retour au bateau",
    diagram: "n3-compas",
    essentiel: `
<p>En autonomie, c’est toi qui ramènes ta palanquée au bateau. On combine <b>le compas</b> et <b>les repères naturels</b>, préparés au briefing.</p>
<h3>Le compas</h3>
<ul><li><b>Ligne de foi</b> : le trait qui indique la direction de marche. Elle doit être dans l’axe de ton corps.</li>
<li><b>Aiguille</b> : elle montre le nord magnétique. Le compas doit rester <b>à plat</b>, loin des objets métalliques (lampe, couteau, autre compas).</li>
<li><b>Couronne mobile</b> : on la tourne pour que ses repères encadrent l’aiguille. Pour garder le cap, on garde l’aiguille entre les repères.</li></ul>
<h3>Les parcours types</h3>
<ul><li><b>Aller-retour</b> : on part sur un cap, on revient sur le cap + 180° (ou − 180° s’il dépasse 360°). Exemple : aller 70°, retour 250°.</li>
<li><b>Carré</b> : quatre branches à 90°, même nombre de cycles de palmes par branche.</li>
<li><b>Triangle</b> : trois branches à 120°.</li></ul>
<p>Pour la distance, on compte les <b>cycles de palmes</b> (un battement de chaque jambe) ou on utilise le temps. Chacun étalonne sa propre valeur sur une distance connue.</p>
<h3>Les repères naturels</h3>
<ul><li><b>Le relief</b> : tombant, roche caractéristique, épave, câble.</li>
<li><b>La profondeur</b> : en général, le fond remonte vers la côte.</li>
<li><b>Les rides de sable</b> : souvent parallèles à la côte, formées par la houle.</li>
<li><b>La lumière</b> : la direction du soleil, plus clair vers la surface.</li>
<li><b>Le courant</b> : à l’aller face au courant, retour courant dans le dos (quand l’air est plus bas).</li></ul>
<div class="callout ex"><span class="eyebrow">Exemple</span>Mouillage sur un sec. Briefing : « On part au 180° le long du tombant, demi-tour à 130 bar, retour au 360° en remontant le relief, le bout est sur le plateau à 12 m. »</div>`,
    approfondir: `
<h3>Corriger la dérive</h3>
<p>Un courant latéral te déporte : en suivant ton cap à la lettre, tu arrives à côté du point visé. On compense en visant légèrement contre le courant, ou en utilisant un repère du fond comme cible intermédiaire.</p>
<h3>Si on ne retrouve pas le mouillage</h3>
<p>On ne cherche pas jusqu’à la réserve : on fait le palier en pleine eau avec le <b>parachute de palier</b> pour signaler la palanquée, et on attend le bateau en surface, groupés, bien visibles.</p>
<h3>Préparer sa navigation</h3>
<p>Au briefing : cap d’aller, repères, pression ou temps de demi-tour, profondeur du mouillage, que faire si on le rate. Le compas se règle <b>en surface</b>, avant la descente, en visant le point de départ.</p>`,
    memo: [["Ligne de foi", "Dans l’axe du corps, compas à plat."], ["Retour", "Cap + 180° (ou − 180°)."], ["Distance", "Cycles de palmes étalonnés, ou temps."], ["Repères", "Relief, profondeur, rides de sable, lumière, courant."], ["Courant", "Aller face au courant, retour courant dans le dos."], ["Mouillage raté", "Palier au parachute, groupés, on attend le bateau."]],
    moniteur: ["Peut-on faire un exercice d’orientation au compas en piscine ou en mer ?", "Combien de cycles de palmes fais-je sur 50 m ?"],
    quiz: [
      { q: "Ton cap aller est 70°. Quel cap pour revenir ?", c: ["110°", "250°", "290°", "160°"], a: 1, e: "Retour = cap + 180° = 250°. Le piège : soustraire à 180° (110°) ou ajouter 90° (160°)." },
      { q: "Ton cap aller est 300°. Cap retour ?", c: ["480°", "120°", "60°", "210°"], a: 1, e: "300 + 180 = 480, qui dépasse 360 : 480 − 360 = 120°. Ou directement 300 − 180." },
      { q: "La ligne de foi du compas doit être…", c: ["dirigée vers le nord", "dans l’axe de ton corps", "perpendiculaire à ton corps", "alignée sur l’aiguille"], a: 1, e: "Elle donne ta direction de marche. C’est la couronne qu’on aligne sur l’aiguille." },
      { q: "Pourquoi tenir le compas loin de ta lampe en aluminium et de ton couteau ?", c: ["Pour ne pas rayer la vitre du compas", "Le fer et les aimants dévient l’aiguille", "Pour mieux le lire sous la lampe", "La lumière de la lampe fausse l’aiguille"], a: 1, e: "Le métal ferreux, les aimants et les autres compas perturbent l’aiguille. Un compas penché frotte aussi." },
      { q: "Un parcours en carré au compas, c’est…", c: ["quatre branches à 90°, même distance", "quatre branches à 120°", "un aller-retour répété deux fois", "quatre branches à 45° autour du mouillage"], a: 0, e: "On tourne de 90° à chaque branche, en gardant le même nombre de cycles de palmes." },
      { q: "Le fond remonte et la lumière augmente. En général, cela indique…", c: ["le large", "la direction de la côte", "un courant fort", "une zone plus profonde"], a: 1, e: "Le fond remonte vers la côte dans la plupart des sites : un repère simple pour le retour." },
      { q: "Les rides du sable sont souvent…", c: ["perpendiculaires à la côte", "parallèles à la côte", "orientées nord-sud", "sans lien avec la côte"], a: 1, e: "Elles sont formées par la houle qui arrive vers la côte : leurs crêtes lui sont souvent parallèles. À confirmer avec d’autres repères." },
      { q: "Avec un courant, on commence la plongée…", c: ["courant dans le dos", "face au courant", "perpendiculaire au courant", "en surface, porté par le courant"], a: 1, e: "Le retour se fait alors courant dans le dos, quand l’air est plus bas et la fatigue plus grande." },
      { q: "Pour estimer la distance parcourue, le plus fiable est…", c: ["l’impression de fatigue dans les jambes", "les cycles de palmes étalonnés", "la profondeur atteinte sur le trajet", "la pression d’air consommée"], a: 1, e: "Chacun étalonne sur une distance connue (par exemple 50 m) son nombre de cycles. Le temps aide aussi." },
      { q: "Quand règle-t-on la couronne du compas pour le cap d’aller ?", c: ["Au fond, une fois la descente finie", "En surface, en visant la direction voulue", "Au bateau, la veille, sur la carte", "Jamais : on suit seulement l’aiguille"], a: 1, e: "On vise la direction en surface (ou au pied du mouillage) et on cale la couronne avant de partir." },
      { q: "Un courant latéral te déporte vers la droite. Pour atteindre ton point, tu…", c: ["suis le cap exact", "vises un peu à gauche du cap", "vises un peu à droite du cap", "remontes pour voir le bateau"], a: 1, e: "On corrige contre la dérive, ou on se sert d’un repère du fond comme cible." },
      { q: "Vous ne retrouvez pas le mouillage et l’air baisse. Le mieux ?", c: ["Chercher le bout jusqu’à la réserve", "Palier au parachute, puis attendre groupés", "Remonter chacun de son côté pour chercher", "Suivre le fond plus longtemps vers la côte"], a: 1, e: "Le parachute signale la palanquée pendant le palier. En surface : groupés, visibles, on attend le bateau." },
      { q: "Au briefing de navigation, on annonce au minimum…", c: ["cap d’aller, repères, demi-tour, et si on rate le bout", "le cap d’aller seulement, le reste se voit au fond", "le cap d’aller et la faune qu’on va voir", "la profondeur maxi et la durée seulement"], a: 0, e: "Tout ce qui permet à chacun de revenir et de réagir pareil si on se perd." },
      { q: "Pour suivre un cap, tu gardes…", c: ["l’aiguille entre les repères de la couronne", "la ligne de foi pointée vers le nord", "la couronne alignée sur la ligne de foi", "l’aiguille alignée sur la ligne de foi"], a: 0, e: "Une fois la couronne calée, il suffit de garder l’aiguille dans ses repères en avançant dans l’axe de la ligne de foi." },
      { q: "Parcours en triangle équilatéral : à chaque angle, tu tournes de…", c: ["60°", "90°", "120°", "180°"], a: 2, e: "Trois branches, 3 × 120° = 360°. Le piège : 60° est l’angle intérieur, pas le changement de cap." },
      { q: "Tu entends un bateau sans le voir. Que fais-tu au palier ?", c: ["Tu remontes vite pour te montrer", "Tu restes au palier, près du bout ou du parachute", "Tu cherches d’où vient le bruit", "Tu descends de quelques mètres pour l’éviter"], a: 1, e: "Sous l’eau on ne localise pas le son. Le parachute signale ta position ; on remonte près du bout ou de la paroi." }
    ]
  });

  C.module({
    id: "n3-speciales", world: "n3", depth: "−25 m", icon: "wave",
    title: "Plongées particulières",
    sub: "Nuit, dérive, eau froide, étranger, épaves",
    diagram: "n3-nuit",
    essentiel: `
<p>Autonome jusqu’à 60 m, tu vas découvrir d’autres conditions. Chacune ajoute <b>un risque</b> et demande <b>une préparation</b>.</p>
<h3>De nuit</h3>
<ul><li>Lampe principale <b>et</b> lampe de secours, chargées. Un feu ou bâton lumineux sur le bloc pour être repéré.</li>
<li>Signes à la lampe : cercle = ça va ; lampe agitée = ça ne va pas ; on éclaire sa main pour les signes classiques. <b>Jamais</b> dans les yeux.</li>
<li>Site connu, parcours court, palanquée serrée, bateau éclairé, repère lumineux au mouillage.</li>
<li>Si on perd la palanquée : on masque sa lampe contre soi, on cherche la lueur des autres, puis procédure habituelle.</li></ul>
<h3>Dérivante</h3>
<p>On se laisse porter par le courant ; le bateau suit les bulles ou une <b>bouée de surface</b> tenue par le guide. Descente rapide et groupée, palanquée serrée, parachute obligatoire pour la remontée en pleine eau.</p>
<h3>Eau froide</h3>
<p>Risque de <b>givrage</b> du détendeur (débit continu), d’hypothermie, de narcose et de consommation accrues. Détendeur adapté, deux sorties indépendantes, combinaison étanche ou semi-étanche, plongée écourtée.</p>
<h3>À l’étranger</h3>
<p>Ce sont les <b>règles locales</b> qui s’appliquent. On présente sa carte de niveau (équivalences CMAS : le N3 correspond en général à 3 étoiles), son carnet, parfois une assurance. Les structures étrangères imposent souvent leurs limites (profondeur, durée, guide obligatoire).</p>
<h3>Épaves et grottes</h3>
<p>Observer une épave de l’extérieur fait partie de la plongée loisir. <b>Pénétrer</b> dans une épave ou une grotte demande une formation spécifique : risque de se perdre, de soulever le sédiment, de rester coincé, sans accès direct à la surface.</p>`,
    approfondir: `
<h3>La plongée sous glace et en altitude</h3>
<p>Elles cumulent les difficultés : froid, accès unique à la surface, pression atmosphérique plus faible. Elles se font en club, avec une organisation dédiée (ligne de vie, méthode altitude).</p>
<h3>Plongée du bord</h3>
<p>Pas de bateau pour te récupérer : on repère la sortie, les vagues, le chemin du retour, et on garde de l’air pour revenir en surface en palmant si besoin.</p>
<h3>Prévenir le froid</h3>
<p>Une cagoule et des gants épais changent tout. Un plongeur qui frissonne ou devient maladroit sous l’eau doit remonter : le froid aggrave la narcose et le risque d’ADD.</p>`,
    memo: [["Nuit", "Deux lampes, feu sur le bloc, cercle = OK, jamais dans les yeux."], ["Dérive", "Bouée de surface ou parachute, descente groupée, palanquée serrée."], ["Eau froide", "Givrage, deux sorties indépendantes, plongée écourtée."], ["Étranger", "Règles locales ; carte de niveau, carnet, assurance."], ["Épave, grotte", "Pénétration = formation spécifique."], ["Du bord", "Repérer sortie et vagues, garder de l’air pour revenir."]],
    moniteur: ["Quels signes à la lampe utilisons-nous au club ?", "Quelles équivalences internationales a mon niveau, et que dois-je emporter en voyage ?"],
    quiz: [
      { q: "De nuit, ton binôme décrit un cercle avec sa lampe. Il dit…", c: ["« ça va »", "« ça ne va pas »", "« on remonte »", "« viens vite »"], a: 0, e: "C’est l’équivalent lumineux du signe OK. Une lampe agitée signale un problème." },
      { q: "De nuit, pour signer « réserve », tu…", c: ["agites la lampe de haut en bas vers lui", "éclaires ta main et fais le signe habituel", "éteins et rallumes la lampe trois fois", "éclaires son masque pour attirer l’attention"], a: 1, e: "On éclaire sa propre main : les signes classiques restent lisibles, sans éblouir." },
      { q: "Le matériel minimum pour une plongée de nuit ?", c: ["Une lampe très puissante et un compas lumineux", "Lampe principale, lampe de secours, repère lumineux", "Une lampe et un parachute de palier lumineux", "Un bâton lumineux et une lampe de poche étanche"], a: 1, e: "Une lampe peut tomber en panne : la lampe de secours est indispensable. Le repère lumineux permet d’être vu." },
      { q: "Tu perds ta palanquée de nuit. Une technique courante ?", c: ["Éclairer très fort dans toutes les directions", "Masquer ta lampe et chercher la lueur des autres", "Rester sur place lampe éteinte jusqu’au retour", "Remonter tout de suite sans chercher"], a: 1, e: "Ta lumière masquée, tu repères mieux celle des autres. Puis procédure habituelle si tu ne les vois pas." },
      { q: "En plongée dérivante, le bateau repère la palanquée grâce…", c: ["au bruit des détendeurs", "à la bouée de surface tenue par le guide", "à la position GPS de l’ordinateur", "aux feux du bateau"], a: 1, e: "La bouée (ou les bulles) indique la position. À la remontée, chaque palanquée lance son parachute." },
      { q: "Pourquoi une descente rapide et groupée en dérivante ?", c: ["Pour économiser l’air pendant la descente", "Pour ne pas être dispersés par le courant", "Pour arriver au fond avant la narcose", "Pour suivre le bateau qui avance"], a: 1, e: "Dans le courant, quelques secondes d’écart suffisent à séparer la palanquée." },
      { q: "En eau à 8 °C, ton détendeur se met en débit continu. Cause probable ?", c: ["Un bloc trop gonflé", "Le givrage du mécanisme", "Un tuyau percé", "Un excès d’azote"], a: 1, e: "La détente de l’air refroidit fortement le mécanisme : la glace bloque le clapet ouvert. Deux sorties indépendantes permettent de fermer celle qui fuit." },
      { q: "Tu plonges en Égypte avec ta carte N3. Quelles règles s’appliquent ?", c: ["Toujours le Code du sport français", "Les règles locales et celles du centre", "Celles de la CMAS uniquement", "Aucune règle particulière"], a: 1, e: "Le Code du sport s’applique en France. À l’étranger : règles du pays et du centre, souvent plus strictes en profondeur." },
      { q: "En général, le N3 FFESSM correspond à…", c: ["CMAS 1 étoile", "CMAS 2 étoiles", "CMAS 3 étoiles", "CMAS moniteur"], a: 2, e: "Équivalence courante : N1 ≈ 1 étoile, N2 ≈ 2 étoiles, N3 ≈ 3 étoiles. À faire confirmer selon la carte." },
      { q: "Peut-on entrer dans une épave lors d’une plongée N3 classique ?", c: ["Oui, si elle est grande et bien éclairée", "Non : il faut une formation spécifique", "Oui, avec une lampe de secours en plus", "Oui, si on reste à moins de 5 m de l’entrée"], a: 1, e: "Se perdre, soulever le sédiment, rester coincé, pas d’accès direct à la surface : formation et matériel dédiés." },
      { q: "Pourquoi écourter une plongée en eau froide ?", c: ["L’eau froide est plus dense, on coule", "Le froid augmente conso, narcose et risque d’ADD", "Le bloc se vide plus lentement au froid", "Le détendeur respire mieux en eau froide"], a: 1, e: "Le froid fatigue, fait consommer plus et ralentit la désaturation. On écourte au premier frisson." },
      { q: "Plongée du bord avec vagues. On prépare surtout…", c: ["le cap pour rejoindre le bateau", "l’endroit de sortie et le chemin du retour", "une descente plus rapide et groupée", "un lest plus lourd contre les vagues"], a: 1, e: "Pas de bateau pour te récupérer : on repère la sortie et on garde de l’air pour revenir." },
      { q: "De nuit, on évite d’éclairer…", c: ["le fond", "le visage des autres", "sa main", "l’ordinateur"], a: 1, e: "Éblouir quelqu’un sous l’eau lui fait perdre ses repères pendant de longues secondes." },
      { q: "Le parachute de palier en dérivante sert surtout…", c: ["à descendre plus vite le long du bout", "à signaler la palanquée pendant le palier", "à remonter un objet trouvé au fond", "à tenir la bouée de surface du guide"], a: 1, e: "Sans bout ni paroi, il sert de repère de palier et signale la position au bateau." },
      { q: "Ce qui rend une plongée sous glace particulière ?", c: ["Une narcose plus forte qu’en mer", "Un seul accès à la surface, et le froid", "Une eau plus salée sous la glace", "L’absence totale de lumière"], a: 1, e: "On ne peut pas remonter n’importe où : ligne de vie et organisation spécifique." },
      { q: "En voyage, que présenter au centre de plongée ?", c: ["Seulement son passeport et sa licence", "Carte de niveau, carnet, certificat ou assurance", "Seulement son ordinateur pour l’historique", "Rien : on y refait toujours une plongée test"], a: 1, e: "Le carnet prouve ton expérience récente ; la carte, ton niveau. Certains centres demandent un certificat médical ou une assurance." }
    ]
  });

  C.module({
    id: "n3-bloc", world: "n3", depth: "−10 m", icon: "tank",
    title: "Bloc, gonflage et contrôles",
    sub: "Marquages, TIV, requalification, robinetterie",
    diagram: "n3-bloc",
    essentiel: `
<p>Un bloc de plongée contient de l’air à 200 ou 230 bar : bien utilisé, il est très sûr ; mal entretenu, il peut éclater. Le N3 sait le lire, le contrôler et le gonfler correctement.</p>
<h3>Les marquages</h3>
<ul><li><b>Pression de service</b> (PS) : la pression de gonflage à ne pas dépasser (ex. 200 ou 230 bar).</li>
<li><b>Pression d’épreuve</b> (PE) : la pression utilisée pour l’essai en usine et aux requalifications, plus élevée que la PS (souvent 1,5 × PS).</li>
<li><b>Volume</b> en litres (capacité en eau), <b>date des épreuves</b>, numéro, fabricant, poinçons.</li></ul>
<h3>Les contrôles</h3>
<ul><li><b>Inspection visuelle</b> (TIV en club) : intérieur et extérieur, filetage, corrosion. En club, au moins <b>une fois par an</b>.</li>
<li><b>Requalification périodique</b> : réépreuve hydraulique et inspection par un organisme habilité, à intervalles réglementaires.</li>
<li>Après un choc, une chute, un échauffement ou de l’eau à l’intérieur : contrôle avant de le regonfler.</li></ul>
<h3>Robinetterie</h3>
<p>Deux raccords courants : <b>étrier</b> (international) et <b>DIN</b> (vissé, plus résistant, fréquent en eau froide). Un robinet à <b>deux sorties</b> permet deux détendeurs indépendants. On ouvre <b>à fond</b>, puis on revient d’un quart de tour (ou selon le fabricant).</p>
<h3>Gonflage</h3>
<ul><li>Air <b>sec et propre</b> : filtres du compresseur entretenus, prise d’air loin des gaz d’échappement (risque de monoxyde de carbone).</li>
<li>Gonflage <b>lent</b>, bloc refroidi (dans l’eau ou ventilé) : il chauffe en se remplissant.</li>
<li>On ne dépasse jamais la PS. On ne gonfle pas un bloc dont l’épreuve est périmée.</li></ul>
${VAL}La périodicité exacte de la requalification et l’organisation du TIV dépendent de la réglementation en vigueur et du matériel : fais-les valider par ton moniteur ou le responsable matériel du club.</div>`,
    approfondir: `
<h3>Pourquoi l’eau dans un bloc est dangereuse</h3>
<p>Un bloc en acier rouille de l’intérieur : la paroi s’affaiblit sans que rien ne se voie dehors. On ne vide jamais complètement un bloc : quelques bar empêchent l’humidité d’entrer. On le stocke debout, au frais, robinet fermé.</p>
<h3>Acier ou aluminium</h3>
<p>L’acier est plus lourd et plus fin à volume égal ; l’aluminium, plus épais, flotte davantage quand il se vide (attention au lestage en fin de plongée). Les deux demandent les mêmes précautions.</p>
<h3>Le transport</h3>
<p>Bloc calé couché ou maintenu debout, robinet protégé. Dans une voiture en été, la température monte : la pression aussi.</p>`,
    memo: [["PS", "Pression de service : on ne la dépasse jamais."], ["PE", "Pression d’épreuve, plus élevée (souvent 1,5 × PS)."], ["TIV", "Inspection visuelle, au moins chaque année en club."], ["Requalification", "Épreuve périodique par un organisme habilité."], ["Gonflage", "Air sec, prise d’air propre, gonflage lent, bloc refroidi."], ["Stockage", "Jamais vide : quelques bar contre l’humidité."]],
    moniteur: ["Qui fait le TIV au club, et puis-je y participer ?", "Quelle périodicité de requalification s’applique à nos blocs ?"],
    quiz: [
      { q: "Sur un bloc, « PS 200 bar » signifie…", c: ["la pression d’épreuve du bloc", "la pression de service, maxi au gonflage", "la pression de réserve conseillée", "la pression d’éclatement du bloc"], a: 1, e: "C’est la pression de gonflage maximale. La pression d’épreuve est plus élevée." },
      { q: "Un bloc PS 200 bar a souvent une pression d’épreuve de…", c: ["200 bar", "250 bar", "300 bar", "400 bar"], a: 2, e: "Souvent 1,5 × PS. Ça ne veut pas dire qu’on peut gonfler à 300 bar !" },
      { q: "Le TIV, c’est…", c: ["un test de pression hydraulique", "une inspection visuelle intérieure et extérieure", "un contrôle du robinet et du détendeur", "une pesée du bloc vide pour la corrosion"], a: 1, e: "Il cherche la corrosion, les défauts de filetage, les chocs. La réépreuve hydraulique, c’est la requalification." },
      { q: "Un bloc est tombé du bateau sur le pont. Avant de le regonfler…", c: ["on le regonfle doucement", "on le fait contrôler", "on vérifie juste le robinet", "on le gonfle à la moitié de la PS"], a: 1, e: "Un choc peut fragiliser la paroi ou le robinet : contrôle avant tout gonflage." },
      { q: "Pourquoi ne jamais vider complètement un bloc ?", c: ["Pour garder une réserve d’urgence", "Pour que l’humidité n’entre pas et ne le corrode", "Parce que le robinet s’abîme quand il est vide", "Pour qu’il reste assez lourd en fin de plongée"], a: 1, e: "L’eau à l’intérieur fait rouiller l’acier sans que ça se voie : quelques bar empêchent l’entrée d’air humide." },
      { q: "Pourquoi la prise d’air d’un compresseur doit-elle être loin d’un moteur ?", c: ["Pour éviter le bruit et la chaleur", "Pour ne pas aspirer de monoxyde de carbone", "Pour que l’air aspiré soit plus froid", "Pour que les filtres durent plus longtemps"], a: 1, e: "Le CO des gaz d’échappement se retrouverait dans le bloc : sous pression, il est très toxique." },
      { q: "Pourquoi gonfler lentement, bloc dans l’eau ?", c: ["Pour pouvoir mettre plus d’air", "Le bloc chauffe en se remplissant", "Pour tester l’étanchéité du robinet", "Pour éviter le givrage du compresseur"], a: 1, e: "La compression chauffe le gaz. En refroidissant, la pression baisse : un gonflage lent et refroidi est plus juste et plus sûr." },
      { q: "Raccord DIN ou étrier : le DIN est…", c: ["moins résistant, mais plus simple", "vissé dans le robinet, plus résistant", "réservé aux mélanges nitrox", "interdit dans les clubs en France"], a: 1, e: "Le DIN se visse et supporte mieux les fortes pressions et les chocs : courant en eau froide et en technique." },
      { q: "Intérêt d’un robinet à deux sorties ?", c: ["Gonfler le bloc deux fois plus vite", "Brancher deux détendeurs indépendants", "Brancher deux manomètres différents", "Diviser la pression de sortie par deux"], a: 1, e: "Si un détendeur givre ou fuit, on ferme sa sortie et on respire sur l’autre." },
      { q: "Peut-on gonfler un bloc dont la date de requalification est dépassée ?", c: ["Oui, si le TIV est récent", "Non", "Oui, à la moitié de la PS", "Oui, s’il a l’air en bon état"], a: 1, e: "Épreuve périmée : le bloc ne doit pas être gonflé tant qu’il n’est pas requalifié." },
      { q: "Un bloc plein oublié dans une voiture au soleil…", c: ["perd de la pression", "monte en pression", "ne change pas", "se vide lentement"], a: 1, e: "Loi de Charles : la température monte, la pression aussi. On ne laisse pas un bloc au soleil." },
      { q: "Un bloc aluminium, par rapport à un acier de même volume…", c: ["est plus léger et flotte davantage vide", "est plus lourd", "supporte une PS plus haute", "ne rouille jamais, donc sans contrôle"], a: 0, e: "Paroi plus épaisse, moins dense : il remonte plus en fin de plongée. Il se contrôle comme un acier." },
      { q: "Ouvrir son robinet, c’est…", c: ["un demi-tour suffit", "à fond, puis revenir d’un quart de tour", "à fond et forcer", "juste assez pour que l’air passe"], a: 1, e: "Ouvert à fond, il ne s’ouvre pas plus ; le quart de tour évite de le bloquer. Suis la consigne du fabricant." },
      { q: "Le volume gravé sur un bloc (ex. 12 L) correspond…", c: ["à l’air qu’il contient", "à sa capacité en eau", "à sa masse en kg", "à l’air à 200 bar"], a: 1, e: "C’est le volume intérieur. L’air contenu se calcule : 12 L × 200 bar = 2 400 L détendus." },
      { q: "Un plongeur sent une odeur bizarre en respirant sur son bloc. Il…", c: ["plonge quand même", "ne l’utilise pas et le signale", "le vide un peu et plonge", "ajoute de l’air frais"], a: 1, e: "Odeur ou goût anormal : air possiblement pollué (huile, CO). On ne plonge pas avec." },
      { q: "Le stockage d’un bloc se fait…", c: ["vide, robinet ouvert pour sécher", "avec un peu de pression, au frais", "plein, prêt pour la prochaine fois", "couché dans l’eau pour le refroidir"], a: 1, e: "Quelques bar pour éviter l’humidité, à l’abri de la chaleur, robinet fermé." }
    ]
  });

  /* ---------- Thèmes existants : compléments et questions jusqu’à 16 ---------- */
  C.extend("n3-gaz", { quiz: [
    { q: "Pp O₂ de l’air à 45 m environ ?", c: ["0,95 bar", "1,16 bar", "1,26 bar", "1,47 bar"], a: 1, e: "P abs = 5,5 bar ; 5,5 × 0,21 ≈ 1,16 bar." }
  ] });

  C.extend("n3-deco", { quiz: [
    { q: "Un compartiment de période 20 min est à moitié chargé au bout de…", c: ["10 min", "20 min", "40 min", "60 min"], a: 1, e: "La période est le temps pour faire la moitié du chemin vers la saturation." },
    { q: "Après 3 périodes, un compartiment a fait environ quelle part du chemin vers la saturation ?", c: ["50 %", "75 %", "87,5 %", "100 %"], a: 2, e: "50 %, puis 75 %, puis 87,5 % : on n’atteint jamais tout à fait 100 %, on considère la saturation atteinte après environ 6 périodes." },
    { q: "Les compartiments « courts » (périodes courtes)…", c: ["se chargent et se vident vite", "se chargent vite et se vident lentement", "ne comptent qu’en apnée", "ne se chargent jamais"], a: 0, e: "Ce sont eux qui imposent souvent les premiers paliers profonds lors des plongées courtes et profondes." },
    { q: "Pourquoi un effort important juste après la plongée est-il déconseillé ?", c: ["Il refroidit", "Il favorise la formation de bulles", "Il augmente la narcose", "Il fatigue les muscles seulement"], a: 1, e: "L’effort agite les tissus et peut faire grossir les micro-bulles : on range le matériel calmement." }
  ] });

  C.extend("n3-autonomie", {
    essentiel: `
<h3>Le plan d’air en 4 lignes</h3>
<ol><li>Air disponible = (pression de départ − réserve) × volume du bloc.</li><li>Conso au fond = conso surface × P absolue.</li><li>Air de remontée : DTR × conso × pression moyenne de la remontée, plus une marge.</li><li>Demi-tour : quand il reste l’air du retour + la remontée + la marge.</li></ol>`,
    quiz: [
      { q: "Bloc 12 L, 200 bar, réserve 50 bar. Air utilisable avant la réserve ?", c: ["1 800 L", "2 400 L", "600 L", "1 200 L"], a: 0, e: "(200 − 50) × 12 = 1 800 L." },
      { q: "Conso 20 L/min en surface. À 40 m, en une minute tu tires du bloc…", c: ["80 L", "100 L", "60 L", "800 L"], a: 1, e: "P abs = 5 bar : 20 × 5 = 100 L/min." },
      { q: "Ton binôme consomme bien plus que toi. Le demi-tour se cale sur…", c: ["toi", "lui", "la moyenne", "le guide du bateau"], a: 1, e: "La palanquée vit au rythme de celui qui vide son bloc le plus vite." },
      { q: "Pourquoi garder une marge d’air en plus de la réserve ?", c: ["Pour pouvoir prolonger la plongée si tout va bien", "Pour un imprévu : partage d’air, palier allongé, courant", "Pour rendre un bloc avec de la pression au club", "Pour garder une bonne flottabilité au palier"], a: 1, e: "Un partage d’air double la consommation : la marge, c’est ce qui permet de rentrer ensemble." },
      { q: "En autonomie à 2, ton binôme ne répond plus à tes signes. Première action ?", c: ["Continuer : il est autonome, il gère", "Le rejoindre, contact physique, évaluer", "Remonter seul prévenir le bateau", "Lui refaire le signe et attendre"], a: 1, e: "Contact et évaluation d’abord : narcose, essoufflement, panne ? Puis on agit ensemble." }
    ]
  });

  C.extend("n3-accidents", {
    approfondir: `
<h3>Les formes d’ADD</h3>
<ul><li><b>Ostéo-articulaire</b> : douleur d’une articulation (épaule, coude, genou), qui ne cède pas au repos.</li>
<li><b>Cutané</b> : démangeaisons, marbrures de la peau.</li>
<li><b>Neurologique</b> : fourmillements, faiblesse d’un membre, troubles de la vue ou de la parole, troubles urinaires. Les plus graves.</li>
<li><b>Vestibulaire</b> (oreille interne) : vertiges, nausées, vomissements.</li>
<li><b>Pulmonaire</b> (rare) : toux, gêne respiratoire.</li></ul>
<p>Tous se traitent pareil sur place : <b>oxygène, alerte, eau plate si conscient, surveillance</b>, puis caisson.</p>`,
    quiz: [
      { q: "Fourmillements dans une jambe 30 min après la plongée : forme probable d’ADD ?", c: ["Cutanée", "Neurologique", "Ostéo-articulaire", "Vestibulaire"], a: 1, e: "Fourmillements, faiblesse, troubles sensitifs : atteinte neurologique, la plus grave." },
      { q: "Vertiges et vomissements après une plongée sans incident de remontée. On pense…", c: ["mal de mer seulement", "ADD vestibulaire", "narcose tardive", "insolation"], a: 1, e: "Après une plongée, on pense ADD avant de penser mal de mer : oxygène et avis médical." },
      { q: "Le monoxyde de carbone dans un bloc vient le plus souvent…", c: ["d’un reste d’eau dans le bloc", "d’une prise d’air du compresseur polluée", "d’un détendeur mal réglé qui chauffe", "d’un bloc gonflé trop vite et trop chaud"], a: 1, e: "Gaz d’échappement aspirés ou huile surchauffée dans le compresseur. Maux de tête, malaise, lèvres rouges." },
      { q: "L’hypothermie se reconnaît d’abord à…", c: ["une euphorie et des rires", "des frissons, puis des gestes maladroits", "une douleur au coude ou à l’épaule", "une toux et une gêne respiratoire"], a: 1, e: "Le corps se défend en frissonnant ; ensuite les gestes deviennent lents et maladroits. On remonte." },
      { q: "Face à toute suspicion d’ADD, le geste commun à toutes les formes ?", c: ["Le massage doux de la zone douloureuse", "L’oxygène au masque haute concentration", "La réimmersion au palier de 3 m", "Un antidouleur et beaucoup d’eau"], a: 1, e: "Oxygène, alerte, eau plate si conscient, surveillance : c’est la même conduite pour toutes les formes." }
    ]
  });

  C.extend("n3-materiel", {
    essentiel: `
<h3>Le 1er et le 2e étage</h3>
<p>Le <b>1er étage</b> réduit la haute pression du bloc à une <b>moyenne pression</b> (environ 8 à 10 bar au-dessus de la pression ambiante). Le <b>2e étage</b> délivre l’air <b>à la pression ambiante</b>, à la demande. Un 1er étage <b>compensé</b> donne une moyenne pression stable quelle que soit la pression du bloc : la respiration reste facile même bloc presque vide.</p>`,
    quiz: [
      { q: "Le 1er étage d’un détendeur délivre…", c: ["l’air à la pression ambiante, à la demande", "une moyenne pression, ≈ 8 à 10 bar au-dessus", "l’air directement à la pression du bloc", "l’air à 1 bar, quelle que soit la profondeur"], a: 1, e: "Il réduit la haute pression ; c’est le 2e étage qui donne l’air à la pression ambiante." },
      { q: "Intérêt d’un 1er étage compensé ?", c: ["Il consomme moins d’air au fond", "Moyenne pression stable, bloc presque vide", "Il ne peut jamais givrer en eau froide", "Il permet de se passer d’octopus"], a: 1, e: "Respiration aussi facile à 50 bar qu’à 200 bar." },
      { q: "Le flexible du direct system est branché sur…", c: ["la haute pression", "la moyenne pression", "le 2e étage", "le manomètre"], a: 1, e: "Comme les 2e étages, il prend la moyenne pression. Le manomètre est sur la haute pression." },
      { q: "Ton manomètre est branché sur…", c: ["une sortie moyenne pression du 1er étage", "la sortie haute pression du 1er étage", "le 2e étage, côté embout", "l’inflateur du gilet"], a: 1, e: "Il mesure la pression du bloc, donc la haute pression." },
      { q: "Après la plongée en mer, le détendeur…", c: ["se range tel quel", "se rince à l’eau douce, capuchon en place", "se rince sans capuchon pour sécher", "se graisse à l’huile"], a: 1, e: "L’eau douce enlève le sel ; le capuchon empêche l’eau d’entrer dans le 1er étage." },
      { q: "Une lampe de plongée de jour sert surtout à…", c: ["éclairer tout le parcours devant soi", "voir dans les failles et rendre les couleurs", "signaler sa position au bateau", "remplacer le parachute de palier"], a: 1, e: "Sous quelques mètres, les rouges disparaissent : la lampe les rend. Elle sert aussi à regarder dans les trous." },
      { q: "Pourquoi un ordinateur de secours ou une montre et un profondimètre ?", c: ["Pour comparer les deux et choisir le plus favorable", "Pour finir la plongée en sécurité en cas de panne", "Pour pouvoir plonger plus longtemps sans palier", "Pour que le binôme puisse suivre le même calcul"], a: 1, e: "La redondance : une panne ne doit pas te mettre en danger." }
    ]
  });

  C.extend("n3-cadre", {
    essentiel: `
<h3>Ce qui t’accompagne en tant qu’autonome</h3>
<ul><li><b>Certificat médical</b> d’absence de contre-indication, selon la réglementation fédérale en vigueur.</li>
<li><b>Licence fédérale</b> avec son assurance responsabilité civile (dommages causés aux autres).</li>
<li><b>Assurance individuelle accident</b> conseillée : elle couvre tes propres dommages (rapatriement, caisson…).</li>
<li><b>Carnet de plongée</b> : la preuve de ton expérience.</li></ul>
<h3>Qui fait quoi</h3>
<p>La <b>FFESSM</b> forme et délivre les brevets ; les clubs et structures organisent les plongées ; le <b>directeur de plongée</b> fixe les paramètres sur le site. La <b>CMAS</b> donne les équivalences internationales.</p>
${VAL}Les durées de validité du certificat médical et les garanties d’assurance changent : vérifie les règles actuelles auprès de ton club.</div>`,
    quiz: [
      { q: "La responsabilité civile couvre…", c: ["tes propres blessures et soins", "les dommages que tu causes à d’autres", "le vol ou la perte de ton matériel", "le caisson hyperbare en cas d’ADD"], a: 1, e: "Elle est comprise dans la licence. Tes propres dommages relèvent d’une assurance individuelle accident." },
      { q: "Une assurance individuelle accident est conseillée car elle couvre…", c: ["les dommages que tu causes aux autres", "tes propres frais : rapatriement, soins, caisson", "les dégâts sur le bateau du club", "exactement la même chose que la licence"], a: 1, e: "La RC protège les autres ; l’individuelle te protège toi." },
      { q: "Qui délivre ton brevet N3 ?", c: ["Le Code du sport, directement", "La FFESSM, via ses moniteurs", "Le directeur de plongée du jour", "La CMAS, seule compétente"], a: 1, e: "La fédération forme et certifie ; la CMAS donne une équivalence internationale." },
      { q: "À quoi sert le carnet de plongée ?", c: ["À rien d’officiel, c’est un souvenir", "À prouver ton expérience et suivre tes plongées", "À remplacer la carte de niveau à l’étranger", "À calculer tes plongées successives"], a: 1, e: "Les centres le demandent souvent, surtout à l’étranger ou pour une plongée exigeante." },
      { q: "Sur le site, l’autonome N3 reste sous l’autorité…", c: ["de personne, il est autonome", "du directeur de plongée", "du pilote du bateau", "du plus ancien de la palanquée"], a: 1, e: "Autonome dans l’eau, mais dans le cadre fixé par le DP." },
      { q: "La CMAS sert surtout à…", c: ["organiser les plongées en France", "donner des équivalences internationales", "délivrer les certificats médicaux", "contrôler les blocs"], a: 1, e: "Carte double face : niveau FFESSM et équivalence CMAS." },
      { q: "Un plongeur N3 peut-il encadrer un N1 ?", c: ["Oui, jusqu’à 20 m de profondeur", "Non : il faut être guide (N4) ou plus", "Oui, s’il a plus de 100 plongées", "Oui, mais en piscine seulement"], a: 1, e: "Le N3 est autonome, pas encadrant. Le guide de palanquée (N4) encadre." },
      { q: "Avant une plongée autonome profonde, le DP peut exiger…", c: ["rien de plus que la carte N3 et le carnet", "une expérience récente, un matériel adapté, un plan", "un mélange nitrox pour toute la palanquée", "un deuxième bloc complet pour chacun"], a: 1, e: "Il adapte les paramètres à l’expérience et aux conditions : c’est son rôle." },
      { q: "Les équivalences entre fédérations…", c: ["sont automatiques dans tous les pays du monde", "existent, mais chaque structure fixe ses règles", "n’existent pas entre fédérations différentes", "ne concernent que le premier niveau"], a: 1, e: "Un centre peut demander un test ou limiter la profondeur malgré l’équivalence." },
      { q: "Ton certificat médical a expiré. Pour plonger en club…", c: ["ce n’est pas grave pour un plongeur N3", "il faut en refaire un selon la règle en vigueur", "le carnet de plongée à jour suffit", "la licence de l’année en cours suffit"], a: 1, e: "Sans certificat valable, pas de plongée en structure. Vérifie les règles actuelles de durée." }
    ]
  });

  C.extend("n3-physio", {
    essentiel: `
<h3>La thermorégulation</h3>
<p>L’eau conduit la chaleur environ <b>25 fois</b> mieux que l’air : on se refroidit vite, même en eau tempérée. Le corps réagit en resserrant les vaisseaux de la peau (vasoconstriction) et en frissonnant. Le froid fait <b>uriner</b> davantage (diurèse d’immersion) : on se déshydrate, ce qui favorise l’ADD.</p>
<h3>La ventilation</h3>
<p>Une respiration lente et profonde ventile mieux les alvéoles qu’une respiration courte et rapide, qui ventile surtout l’<b>espace mort</b> (trachée, bronches, tuyaux). D’où le réflexe : <b>expirer longuement</b>.</p>`,
    quiz: [
      { q: "L’eau refroidit le corps environ…", c: ["2 fois plus vite que l’air", "25 fois plus vite que l’air", "aussi vite que l’air", "100 fois plus vite que l’air"], a: 1, e: "Conductivité bien plus forte : même à 24 °C, on finit par avoir froid." },
      { q: "Pourquoi a-t-on envie d’uriner en plongée ?", c: ["On avale un peu d’eau de mer en plongée", "Le froid et l’immersion font produire plus d’urine", "Le gilet et le lest compriment la vessie", "C’est seulement psychologique, lié au stress"], a: 1, e: "Le sang se concentre vers le centre du corps : les reins éliminent plus. On se déshydrate : on boit avant et après." },
      { q: "Respirer court et vite ventile surtout…", c: ["les alvéoles", "l’espace mort", "le sang", "l’estomac"], a: 1, e: "L’air reste dans les voies et le tuyau : le CO₂ s’élimine mal. Expiration longue !" },
      { q: "Le stimulus principal de l’envie de respirer est…", c: ["le manque d’oxygène", "la hausse du CO₂", "la pression de l’eau", "l’azote"], a: 1, e: "C’est le CO₂ qui déclenche la respiration : d’où le danger de l’hyperventilation avant une apnée." },
      { q: "En profondeur, l’air plus dense…", c: ["se respire plus facilement qu’en surface", "demande plus d’effort et favorise l’essoufflement", "contient moins d’oxygène qu’en surface", "réchauffe les poumons à chaque inspiration"], a: 1, e: "Plus dense, il circule moins bien dans les voies aériennes : on respire lentement, sans effort." },
      { q: "La déshydratation favorise…", c: ["la narcose", "l’ADD", "la surpression pulmonaire", "le placage de masque"], a: 1, e: "Un sang plus épais élimine moins bien l’azote. On boit de l’eau avant et après la plongée." },
      { q: "Les échanges gazeux entre air et sang se font…", c: ["dans les bronches", "dans les alvéoles", "dans le cœur", "dans la trachée"], a: 1, e: "Paroi très fine, énorme surface : l’O₂ passe dans le sang, le CO₂ et l’azote en sortent." },
      { q: "Le foramen ovale perméable, c’est…", c: ["une malformation de l’oreille moyenne", "une communication entre les oreillettes du cœur", "une petite lésion d’une alvéole du poumon", "une maladie du sang qui favorise les bulles"], a: 1, e: "Fréquente et sans gêne d’habitude, elle peut laisser passer des bulles vers les artères : certains ADD neurologiques." },
      { q: "Pour lutter contre le froid avant qu’il s’installe, le plus efficace ?", c: ["Palmer plus fort au fond pour se chauffer", "Cagoule, gants, combinaison adaptée", "Boire un café bien chaud juste avant", "Rester plus profond, où l’eau est stable"], a: 1, e: "La tête et les mains perdent beaucoup de chaleur. L’effort, lui, augmente la consommation et le CO₂." },
      { q: "Un plongeur qui frissonne au palier…", c: ["finit son palier, puis se réchauffe et le signale", "sort sans finir le palier pour se réchauffer", "peut replonger une fois réchauffé", "n’a rien de grave, c’est normal au palier"], a: 0, e: "On ne saute pas le palier, mais on le signale, on le surveille et pas d’autre plongée s’il est très refroidi." }
    ]
  });

  /* ---------- Flashcards ---------- */
  C.addCards([
    { id: "x3-p1", m: "n3-physique", f: "Relevage : de la masse aux bar pris au bloc", b: "Poids apparent (L au fond) × P abs = L surface ; ÷ volume du bloc = bar." },
    { id: "x3-p2", m: "n3-physique", f: "Loi de Henry", b: "Gaz dissous proportionnel à sa Pp : on se charge en descendant, on rend en remontant." },
    { id: "x3-p3", m: "n3-physique", f: "Vision à travers le masque", b: "Plus proche (≈ ¾), plus gros (≈ 4/3), rouge perdu en premier." },
    { id: "x3-b1", m: "n3-baro", f: "Surpression pulmonaire : cause et signes", b: "Blocage à la remontée. Douleur thoracique, crachats sanglants, signes neuro. O₂, alerte." },
    { id: "x3-b2", m: "n3-baro", f: "Vertige alterno-barique", b: "Les deux oreilles ne se vident pas en même temps à la remontée : on s’arrête, ça passe." },
    { id: "x3-b3", m: "n3-baro", f: "Valsalva forcé", b: "Risque d’oreille interne : vertiges, sifflements → O₂ et avis médical." },
    { id: "x3-t1", m: "n3-tables", f: "Paramètres d’une table", b: "Profondeur maxi atteinte ; durée du début de descente au départ du fond ; arrondi supérieur." },
    { id: "x3-t2", m: "n3-tables", f: "Altitude et avion", b: "Pression de surface plus faible : méthode altitude, délai avant de monter." },
    { id: "x3-o1", m: "n3-orientation", f: "Cap retour", b: "Cap aller + 180° (ou − 180° si on dépasse 360°)." },
    { id: "x3-o2", m: "n3-orientation", f: "Mouillage raté", b: "Palier en pleine eau au parachute, groupés, on attend le bateau." },
    { id: "x3-s1", m: "n3-speciales", f: "Nuit : équipement et signes", b: "Deux lampes, repère lumineux ; cercle = OK ; jamais dans les yeux." },
    { id: "x3-s2", m: "n3-speciales", f: "Eau froide", b: "Givrage → débit continu : fermer la sortie, passer sur l’autre détendeur." },
    { id: "x3-k1", m: "n3-bloc", f: "PS et PE", b: "PS : gonflage maxi. PE : épreuve, plus haute (souvent 1,5 × PS)." },
    { id: "x3-k2", m: "n3-bloc", f: "TIV et requalification", b: "TIV : inspection visuelle, au moins annuelle en club. Requalification : épreuve périodique." }
  ]);

  /* ---------- Notions du tuteur (N3) ---------- */
  C.notions = Object.assign(C.notions || {}, {
    "n3-gaz": [["pp", "Calculer une pression partielle", "pp|pression partielle|\\d+ ?bar|x ?0,|fraction|absolue", "Pp"], ["narcose", "Narcose : signes et conduite", "narcose|ivresse|azote|rit|relit|euphor|angoiss|quelques metres", "narcose"], ["o2", "Toxicité de l’oxygène", "oxygene|o2|paul bert|lorrain|convuls|1,6|66 m|hyperox", "oxygène"], ["co2", "CO₂ et effort", "co2|effort|essouffl|dense|carbon", "CO₂"]],
    "n3-deco": [["resid", "Azote résiduel et successives", "residuel|successive|groupe|majoration|intervalle", "résiduel"], ["consec", "Plongées consécutives", "consecutiv|seule plongee|trop court", "consécutive"], ["ordi", "Ordinateurs en palanquée", "ordinateur|penalisant|profil", "ordinateur"], ["modele", "Compartiments et périodes", "compartiment|periode|haldane|tissu|sature", "compartiment"]],
    "n3-autonomie": [["conso", "Consommation au fond", "consomm|l/min|x ?\\d|bar par minute|pression absolue", "consommation"], ["plan", "Plan d’air et demi-tour", "demi-tour|reserve|marge|plan|retour|autonomie", "demi-tour"], ["perte", "Perte de palanquée", "perdu|perte|recherche|minute|surface", "perte"], ["dp", "Paramètres fixés par le DP", "directeur|dp|parametres|fixe", "directeur"]],
    "n3-accidents": [["add", "ADD : formes et signes", "add|desaturation|douleur|fourmill|marbrure|vertige|articul|neurolog|cutane|vestib", "ADD"], ["secours", "Conduite à tenir", "oxygene|alerte|caisson|eau plate|surveill", "oxygène"], ["prev", "Facteurs favorisants", "effort|froid|hydrat|avion|yoyo|favoris", "favorise"], ["autres", "CO, froid, essoufflement", "monoxyde|co\\b|hypotherm|frisson|essouffl", "hypothermie"]],
    "n3-materiel": [["det", "Détendeur : étages et pressions", "etage|moyenne pression|compense|haute pression|ambiante|manometre|direct", "étage"], ["redond", "Redondance", "redondan|deux sorties|secours|panne|isoler", "redondance"], ["acc", "Parachute, lampe, outil", "parachute|lampe|outil|coupant|couleur", "parachute"]],
    "n3-cadre": [["prerog", "Prérogatives et espaces", "60 m|pa60|prerogativ|espace|0-6|encadr|autonome", "60 m"], ["orga", "Organisation et DP", "directeur|compose|federation|ffessm|cmas|equivalen|brevet", "directeur"], ["assur", "Assurance, certificat, carnet", "assurance|responsabilite|certificat|carnet|licence", "assurance"]],
    "n3-physio": [["froid", "Froid et déshydratation", "froid|chaleur|25 fois|urin|deshydrat|frisson|cagoule", "froid"], ["ventil", "Ventilation et CO₂", "ventil|espace mort|expir|co2|dense|alveol|respir", "espace mort"], ["coeur", "Circulation et foramen ovale", "foramen|coeur|oreillette|sang|circulation|pression partielle", "foramen"]],
    "n3-physique": [["relev", "Relevage au parachute", "relevage|parachute|ancre|objet|poids apparent", "relevage"], ["flott", "Flottabilité pendant la plongée", "neoprene|s.ecrase|leger|lest|eau douce|poumon|bloc .*(vide|passe)", "flottabilité"], ["henry", "Loi de Henry et saturation", "henry|dissous|satur|tissu", "Henry"], ["vision", "Vision, couleurs et son", "vision|masque|paraît|parait|couleur|rouge|son|bruit|1 500", "Vision"], ["charles", "Température et pression", "charles|kelvin|temperat|°c|soleil|chaud", "Charles"]],
    "n3-baro": [["oreille", "Oreilles et équilibrage", "oreille|tympan|valsalva|frenzel|equilibr|trompe|vertige", "Oreille"], ["sinus", "Sinus, masque, dents, ventre", "sinus|front|masque|dent|plombage|gazeuse|intestin|ventre", "Sinus"], ["sp", "Surpression pulmonaire", "surpression|poumon|thorac|crachat|bloqu|alveol", "Surpression"], ["zone", "La zone 0-10 m", "0 et 10|surface|double|10 m a la surface|proche", "0-10 m"]],
    "n3-tables": [["param", "Paramètres et arrondis", "profondeur max|duree|arrondi|ligne|superieur|depart du fond", "Profondeur"], ["succ", "Successives et consécutives", "successive|consecutiv|groupe|majoration|intervalle", "Successives"], ["incid", "Remontée rapide et palier interrompu", "rapide|interrompu|incident|procedure|plus profond", "Remontée trop rapide"], ["alti", "Altitude, avion, ordinateur", "altitude|avion|col|lac|ordinateur|panne", "Altitude"]],
    "n3-orientation": [["compas", "Utiliser le compas", "compas|ligne de foi|couronne|aiguille|metal", "compas"], ["caps", "Caps et parcours types", "cap|180|retour|carre|triangle|°", "parcours"], ["reperes", "Repères naturels et distance", "repere|relief|sable|lumiere|cycles|distance|fond remonte", "repères"], ["courant", "Courant et mouillage", "courant|mouillage|derive|bout|parachute|bateau", "courant"]],
    "n3-speciales": [["nuit", "Plongée de nuit", "nuit|lampe|lumin|eclair|cercle", "De nuit"], ["derive", "Plongée dérivante", "derivant|bouee|courant|groupee", "Dérivante"], ["froid", "Eau froide et glace", "froid|givr|glace|debit continu", "Eau froide"], ["voyage", "Étranger et équivalences", "etranger|egypte|cmas|etoile|carnet|centre|locales", "étranger"], ["epave", "Épaves, grottes, bord", "epave|grotte|penetr|bord|vague", "Épaves"]],
    "n3-bloc": [["marq", "Marquages PS et PE", "ps|pe|service|epreuve|grave|volume|marquage", "Pression de service"], ["ctrl", "TIV et requalification", "tiv|inspection|requalif|choc|perime|controle", "TIV"], ["gonfl", "Gonflage et qualité de l’air", "gonfl|compresseur|monoxyde|odeur|chauffe|soleil", "Gonflage"], ["robi", "Robinetterie et stockage", "din|etrier|robinet|sortie|stock|vide|alumin", "DIN"]]
  });
})();
