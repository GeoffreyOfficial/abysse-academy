/* Abysse Academy · contenu FR · Monde RIFAP
   Format : voir CONTRIBUTING.md. Le HTML des cours utilise les classes
   callout ex / trap / check, formula, tbl (voir css/app.css). */
AA.content.module({
  id: "r-role", world: "rifap", depth: "Récif 1", icon: "buoy",
  title: "Le RIFAP",
  sub: "À quoi il sert, ce qu’il contient",
  essentiel: `
<p>Le RIFAP te forme à <b>réagir face à un accident de plongée</b>, de l’eau jusqu’à l’arrivée des secours.</p>
<ul><li><b>Dans l’eau</b> : reconnaître un plongeur en difficulté, l’aider, le remonter, le tracter en surface.</li>
<li><b>Hors de l’eau</b> : sortir la victime, l’installer, l’oxygéner, alerter, surveiller, transmettre les informations.</li>
<li>Il complète le secourisme général (PSC1) avec ce qui est propre à la plongée : <b>oxygène</b>, signes d’ADD, fiche d’évacuation.</li></ul>
<div class="formula">Protéger → Examiner → Alerter → Secourir (oxygène) → Surveiller</div><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Le RIFAP (Réactions et Intervention Face à un Accident de Plongée) se valide en pratique avec un formateur. Il est en général demandé avant d’entrer en formation initiateur et pour le N4 : fais confirmer les prérequis et le protocole exact (oxygène, gestes de secourisme) par ton club.</div>
`,
  approfondir: `
<h3>La chaîne des secours</h3>
<p>Chaque maillon compte : <b>reconnaître</b> l’accident, <b>alerter</b>, <b>agir</b> (gestes de premiers secours, oxygène), <b>transmettre</b> aux secours (bilan, paramètres de plongée). Un maillon cassé ralentit tout le reste.</p>
<h3>Ton rôle sur un site de plongée</h3>
<ul><li>Sortir la victime de l’eau et la mettre en sécurité, avec l’aide des autres.</li>
<li>Mettre en œuvre l’oxygène et les gestes de base.</li><li>Aider le directeur de plongée : alerte, matériel, informations, gestion du groupe.</li></ul>
<h3>Te protéger d’abord</h3><p>Un sauveteur qui se met en danger fait deux victimes. On évalue la situation (houle, courant, bateau, hélice) avant d’agir.</p><div class="callout check"><span class="eyebrow">À valider avec ton formateur</span>Les gestes de secours suivent des recommandations qui évoluent. Seule une formation pratique avec un formateur valide tes gestes.</div>
`,
  memo: [
    ["Chaîne","Reconnaître, alerter, agir, transmettre."],
    ["Priorité","Se protéger, protéger, puis secourir."],
    ["Pratique","Le RIFAP se valide en pratique, avec un formateur."]
  ],
  moniteur: ["Quand puis-je passer le RIFAP au club ?","Qui sont les formateurs secourisme du club ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"RIFAP signifie…","c":["Réactions et Intervention Face à un Accident de Plongée","Règlement International des Fédérations","Remontée Individuelle Frein Air Palier","Réseau d’Information"],"a":0,"e":"C’est la compétence secours propre à la plongée."},
    {"q":"Le RIFAP couvre…","c":["uniquement les gestes dans l’eau","l’eau et la prise en charge hors de l’eau jusqu’aux secours","seulement l’alerte","la mécanique des détendeurs"],"a":1,"e":"De la détection sous l’eau à la transmission aux secours."},
    {"q":"Quel produit est au cœur du RIFAP ?","c":["L’aspirine","L’oxygène","Le café","Le sucre"],"a":1,"e":"L’oxygène est le premier traitement d’un accident de plongée."},
    {"q":"Dans quel ordre agir ?","c":["Alerter, puis protéger","Protéger, examiner, alerter, secourir, surveiller","Secourir puis protéger","Surveiller seulement"],"a":1,"e":"On évite le suraccident d’abord, puis on évalue, on alerte et on agit."},
    {"q":"Pourquoi le RIFAP est-il utile avant l’initiateur ?","c":["Pour le tampon sur le carnet","Un enseignant doit savoir porter secours à ses élèves","Ce n’est pas utile","Pour plonger plus profond"],"a":1,"e":"Encadrer, c’est aussi être capable d’intervenir. Prérequis exacts à confirmer."}
  ]
});

AA.content.module({
  id: "r-alerte", world: "rifap", depth: "Récif 2", icon: "phone",
  title: "Alerter",
  sub: "Numéros, message, informations",
  essentiel: `
<h3>Qui appeler</h3><div class="tbl"><table><tr><th>Où</th><th>Numéro</th></tr><tr><td>En mer</td><td>VHF canal 16 ou 196 (CROSS)</td></tr><tr><td>À terre</td><td>15 (SAMU) ou 112</td></tr></table></div>
<h3>Le message d’alerte</h3><ol><li>Qui appelle, d’où, et un numéro pour rappeler.</li><li>Où : position précise (site, GPS, nom du bateau).</li><li>Quoi : accident de plongée, nombre de victimes.</li><li>État de la victime : conscience, respiration, signes.</li><li>Ce qui est déjà fait : oxygène depuis quelle heure.</li><li>Ne raccrocher que quand on te le dit.</li></ol>
<h3>À préparer pour les secours</h3><p>La <b>fiche d’évacuation</b> : identité, paramètres de la plongée (profondeur, durée, paliers, ordinateur), heure des premiers signes, gestes faits.</p><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Le RIFAP (Réactions et Intervention Face à un Accident de Plongée) se valide en pratique avec un formateur. Il est en général demandé avant d’entrer en formation initiateur et pour le N4 : fais confirmer les prérequis et le protocole exact (oxygène, gestes de secourisme) par ton club.</div>
`,
  approfondir: `
<h3>Préparer l’alerte avant d’en avoir besoin</h3>
<p>Le numéro, le nom du site, la position GPS, le canal VHF : tout doit être connu avant la plongée. Le DP l’a sur la fiche de sécurité.</p>
<h3>Le message type</h3><ol><li>Qui tu es et d’où tu appelles (bateau, club, position).</li><li>Ce qui s’est passé (accident de plongée, nombre de victimes).</li><li>L’état de chaque victime (conscience, respiration, signes).</li><li>Ce qui a été fait (oxygène depuis quelle heure).</li><li>Les paramètres de plongée (profondeur, durée, paliers, heure de sortie).</li></ol>
<p>On ne raccroche que quand l’interlocuteur le demande.</p><div class="callout check"><span class="eyebrow">À valider avec ton formateur</span>Les gestes de secours suivent des recommandations qui évoluent. Seule une formation pratique avec un formateur valide tes gestes.</div>
`,
  memo: [
    ["En mer","VHF canal 16 (ou 196 au téléphone) : le CROSS."],
    ["À terre","15 (SAMU) ou 112."],
    ["Message","Qui, où, quoi, état, gestes faits, paramètres de plongée."]
  ],
  moniteur: ["Quels numéros et canaux utilise-t-on sur nos sites habituels ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"En mer, accident de plongée : tu appelles…","c":["le 17","le CROSS : VHF 16 ou 196","le club","le 18 uniquement"],"a":1,"e":"Le CROSS coordonne les secours en mer et l’accès au caisson."},
    {"q":"Qui raccroche en premier ?","c":["Toi, pour gagner du temps","Le secours, quand il te le dit","Personne","Peu importe"],"a":1,"e":"Le régulateur peut avoir des questions ou des consignes."},
    {"q":"Que dire dans l’alerte ?","c":["Seulement « venez vite »","Qui, où, quoi, état de la victime, gestes déjà faits","Le prix du bateau","Ton niveau de plongée"],"a":1,"e":"Un message complet fait gagner du temps."},
    {"q":"La fiche d’évacuation contient…","c":["les paramètres de plongée et l’heure des signes","le menu du midi","la licence uniquement","rien d’utile"],"a":0,"e":"Le médecin du caisson en a besoin."},
    {"q":"À terre, tu appelles…","c":["le 15 ou le 112","le 196","le 3615","la mairie"],"a":0,"e":"SAMU (15) ou numéro d’urgence européen (112)."}
  ]
});

AA.content.module({
  id: "r-o2", world: "rifap", depth: "Récif 3", icon: "o2",
  title: "Oxygène et surveillance",
  sub: "Débit, masque, bilan",
  essentiel: `
<ul><li>Tout signe après une plongée = <b>oxygène au plus tôt</b>, sans attendre d’être sûr.</li>
<li>Victime qui respire : <b>masque à haute concentration</b>, débit élevé (≈ 15 L/min).</li>
<li>Victime qui ne respire pas : insufflations avec un ballon (BAVU) relié à l’oxygène, dans le cadre de la réanimation.</li>
<li>Calculer l’<b>autonomie de la bouteille d’O₂</b> : volume × pression ÷ débit.</li>
<li>Faire boire de l’<b>eau plate</b> si la victime est consciente et n’a pas de nausées.</li>
<li>Surveiller et noter l’évolution (conscience, respiration, signes) toutes les quelques minutes.</li></ul>
<div class="callout ex"><span class="eyebrow">Exemple chiffré</span>Bouteille d’O₂ de 5 L à 200 bar, débit 15 L/min.
<pre>Volume d’O₂ = 5 × 200 = 1 000 L
Autonomie = 1 000 / 15 ≈ 66 min</pre></div>
<div class="callout trap"><span class="eyebrow">Sécurité</span>Oxygène et corps gras ne font pas bon ménage (risque d’incendie). Pas de flamme, pas de graisse sur les raccords.</div><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Le RIFAP (Réactions et Intervention Face à un Accident de Plongée) se valide en pratique avec un formateur. Il est en général demandé avant d’entrer en formation initiateur et pour le N4 : fais confirmer les prérequis et le protocole exact (oxygène, gestes de secourisme) par ton club.</div>
`,
  approfondir: `
<h3>Calculer l’autonomie d’une bouteille d’oxygène</h3>
<div class="formula">Autonomie (min) = volume (L) × pression (bar) ÷ débit (L/min)</div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré</span>Bouteille de 5 L à 200 bar, débit 15 L/min :<pre>5 × 200 = 1 000 L ; 1 000 / 15 ≈ 66 min</pre>Si l’évacuation prend plus longtemps, il faut prévoir une deuxième bouteille.</div>
<h3>Inhaler ou insuffler</h3><ul><li><b>Victime qui respire</b> : masque à haute concentration, fort débit.</li><li><b>Victime qui ne respire pas</b> : insufflations au ballon (avec réserve d’oxygène), en plus du massage cardiaque.</li></ul>
<h3>Sécurité de l’oxygène</h3><p>Pas de graisse ni de flamme près du matériel, on ouvre doucement, on surveille la pression restante.</p><div class="callout check"><span class="eyebrow">À valider avec ton formateur</span>Les gestes de secours suivent des recommandations qui évoluent. Seule une formation pratique avec un formateur valide tes gestes.</div>
`,
  memo: [
    ["Autonomie","Volume × pression ÷ débit."],
    ["Débit","Fort débit (≈ 15 L/min) au masque haute concentration."],
    ["Sécurité","Ni graisse, ni flamme."]
  ],
  moniteur: ["Quel matériel d’oxygénothérapie a le club et comment le vérifier ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Quand donner de l’oxygène après une plongée ?","c":["Seulement si on est sûr de l’ADD","Dès le moindre signe suspect","Jamais avant le médecin","Après 2 h"],"a":1,"e":"Au moindre doute. L’oxygène ne fait pas de mal dans ce cas, attendre si."},
    {"q":"Victime consciente qui respire : quel matériel ?","c":["Masque à haute concentration, débit élevé","Lunettes à oxygène 2 L/min","Rien","Un détendeur de plongée"],"a":0,"e":"Masque haute concentration ≈ 15 L/min (protocole à confirmer)."},
    {"q":"Bouteille d’O₂ de 5 L à 200 bar, débit 15 L/min. Autonomie ?","c":["≈ 13 min","≈ 66 min","≈ 200 min","≈ 33 min"],"a":1,"e":"5 × 200 = 1 000 L ; 1 000 / 15 ≈ 66 min."},
    {"q":"Peut-on graisser un raccord d’oxygène ?","c":["Oui, pour l’étanchéité","Non, risque d’incendie","Avec de l’huile d’olive","Seulement en hiver"],"a":1,"e":"Les corps gras au contact de l’oxygène sous pression peuvent s’enflammer."},
    {"q":"Pendant l’attente des secours…","c":["on surveille et on note l’évolution","on laisse la victime seule","on enlève l’oxygène toutes les 5 min","on la fait marcher"],"a":0,"e":"La surveillance permet de signaler une aggravation."},
    {"q": "Bouteille d’O₂ de 5 L à 200 bar, débit 15 L/min. Autonomie ?", "c": ["≈ 30 min", "≈ 66 min", "≈ 13 min", "≈ 200 min"], "a": 1, "e": "5 × 200 = 1 000 L ; 1 000 / 15 ≈ 66 min.", "lvl": 2}
  ]
});

AA.content.module({
  id: "r-vict", world: "rifap", depth: "Récif 4", icon: "heart",
  title: "Victime inconsciente",
  sub: "PLS, réanimation, noyade",
  essentiel: `
<h3>Évaluer</h3><ul><li>Elle répond ? Non : <b>inconsciente</b>. Libérer les voies aériennes (bascule de la tête).</li><li>Elle respire normalement ? Regarder, écouter, sentir, 10 secondes.</li></ul>
<h3>Agir</h3><div class="tbl"><table><tr><th>Situation</th><th>Réaction</th></tr>
<tr><td>Inconsciente, respire</td><td>Position latérale de sécurité, oxygène, alerte, surveillance.</td></tr>
<tr><td>Inconsciente, ne respire pas</td><td>Alerte, réanimation cardio-pulmonaire (compressions et insufflations), défibrillateur dès que possible, oxygène sur le ballon.</td></tr></table></div>
<h3>Noyade</h3><p>Chez un noyé, le manque d’oxygène est la cause principale : les protocoles commencent souvent par des <b>insufflations</b> avant les compressions.</p>
<div class="callout check"><span class="eyebrow">Pratique obligatoire</span>Ces gestes s’apprennent sur mannequin avec un formateur. Les rythmes et le nombre d’insufflations suivent les recommandations en vigueur : fais-les valider en formation.</div><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Le RIFAP (Réactions et Intervention Face à un Accident de Plongée) se valide en pratique avec un formateur. Il est en général demandé avant d’entrer en formation initiateur et pour le N4 : fais confirmer les prérequis et le protocole exact (oxygène, gestes de secourisme) par ton club.</div>
`,
  approfondir: `
<h3>Le bilan, dans l’ordre</h3><ol><li><b>Conscience</b> : réagit-elle à la voix, au toucher ?</li><li><b>Respiration</b> : libérer les voies aériennes, regarder, écouter, sentir ≈ 10 s.</li><li><b>Signes</b> : douleur, fourmillements, vertiges, difficulté à respirer, peau.</li></ol>
<h3>La réanimation</h3><ul><li>Compressions thoraciques au centre de la poitrine, environ 100 à 120 par minute, en alternance avec des insufflations.</li><li>Défibrillateur dès qu’il est disponible : il guide à la voix.</li><li>Après une noyade, les recommandations prévoient souvent des insufflations initiales, car la cause est le manque d’oxygène.</li></ul><div class="callout check"><span class="eyebrow">À valider avec ton formateur</span>Les gestes de secours suivent des recommandations qui évoluent. Seule une formation pratique avec un formateur valide tes gestes.</div>
`,
  memo: [
    ["Inconsciente, respire","PLS, oxygène, alerte, surveillance."],
    ["Ne respire pas","Alerte, réanimation, défibrillateur, oxygène."],
    ["Noyade","Cause : manque d’oxygène. Insufflations essentielles."]
  ],
  moniteur: ["Peut-on s’entraîner sur mannequin au club ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Victime inconsciente qui respire : position ?","c":["Assise","Position latérale de sécurité","Debout","Sur le ventre"],"a":1,"e":"La PLS garde les voies aériennes libres. Plus oxygène et surveillance."},
    {"q":"Victime inconsciente qui ne respire pas :","c":["PLS et attente","Alerte et réanimation cardio-pulmonaire, défibrillateur au plus vite","Lui donner à boire","La mettre dans l’eau"],"a":1,"e":"Chaque minute compte."},
    {"q":"Pour vérifier la respiration, on prend environ…","c":["1 seconde","10 secondes","1 minute","5 minutes"],"a":1,"e":"Regarder, écouter, sentir pendant une dizaine de secondes."},
    {"q":"Chez un noyé, la cause principale de l’arrêt est souvent…","c":["un problème cardiaque pur","le manque d’oxygène","le froid seul","la narcose"],"a":1,"e":"D’où l’importance des insufflations dans les protocoles noyade."},
    {"q":"Où apprend-on vraiment ces gestes ?","c":["Dans une appli","Sur mannequin avec un formateur","En lisant une fois","En regardant une vidéo"],"a":1,"e":"L’appli aide à mémoriser. La validation est pratique."}
  ]
});
