/* Abysse Academy · contenu FR · Monde Initiateur (E1)
   Format : voir CONTRIBUTING.md. Le HTML des cours utilise les classes
   callout ex / trap / check, formula, tbl (voir css/app.css). */
AA.content.module({
  id: "e2-role", world: "e1", depth: "Île 1", icon: "teach",
  title: "Le rôle de l’initiateur",
  sub: "Prérogatives, responsabilités, posture",
  essentiel: `
<p>L’initiateur est le <b>premier niveau d’enseignant</b> de la FFESSM. Il apprend à transmettre ce qu’il sait faire.</p>
<ul><li>Il enseigne en milieu protégé (piscine, fosse) et en milieu naturel en zone <b>0 à 6 m</b>, sous l’autorité d’un moniteur ou d’un directeur de plongée.</li>
<li>Titulaire du N4 (guide de palanquée), il devient <b>E2</b> et peut enseigner plus profond (jusqu’à 20 m, selon la réglementation en vigueur).</li>
<li>Il prépare des élèves aux premiers brevets et participe à la vie du club : baptêmes, piscine, sorties.</li></ul>
<h3>La posture</h3>
<ul><li><b>Exemplaire</b> : un élève copie ce qu’il voit, matériel et comportement compris.</li>
<li><b>Bienveillant et exigeant</b> : on encourage, mais on ne laisse pas passer un geste de sécurité mal fait.</li>
<li><b>Responsable</b> : la sécurité de l’élève passe avant l’exercice.</li></ul><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Ce monde prépare l’esprit initiateur. Les prérogatives et le contenu exact de la formation sont fixés par la FFESSM et ta commission technique : fais valider par ton moniteur ou ton formateur.</div>
`,
  approfondir: `
<h3>Ce qu’on attend d’un initiateur</h3><ul><li>Faire découvrir et faire progresser des plongeurs débutants, en sécurité.</li><li>Montrer l’exemple : matériel, ponctualité, respect du milieu.</li><li>Rendre compte au moniteur responsable.</li></ul><h3>Le parcours</h3><p>La formation initiateur combine théorie (pédagogie, sécurité, organisation), pratique en piscine et en milieu naturel, et un stage. Les conditions d’accès et le contenu exact sont fixés par la fédération.</p><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Conditions d’accès (âge, niveau), durée et contenu de la formation initiateur dans ta commission technique.</div>
`,
  memo: [
    ["Rôle","Enseigner en zone 0 à 6 m, sous l’autorité d’un moniteur ou DP."],
    ["Posture","Exemplaire, bienveillant, exigeant sur la sécurité."]
  ],
  moniteur: ["Quelles sont les conditions pour entrer en formation initiateur au club ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"L’initiateur est avant tout…","c":["un guide de palanquée","un premier niveau d’enseignant","un directeur de plongée","un secouriste"],"a":1,"e":"C’est le premier échelon d’enseignant de la FFESSM."},
    {"q":"En milieu naturel, l’initiateur (E1) enseigne en zone…","c":["0 à 6 m","0 à 20 m","0 à 40 m","sans limite"],"a":0,"e":"Zone 0 à 6 m, sous l’autorité d’un moniteur ou DP (à confirmer selon la réglementation en vigueur)."},
    {"q":"Pour devenir E2, l’initiateur doit en plus être…","c":["N3","Guide de palanquée (N4)","moniteur fédéral","N2 depuis 1 an"],"a":1,"e":"Hypothèse courante : initiateur + N4 = E2. À faire confirmer."},
    {"q":"Ton élève voit que tu ne vérifies jamais ton manomètre. Le risque ?","c":["Aucun","Il copiera ce comportement","Il te dénoncera","Il plongera mieux"],"a":1,"e":"L’exemplarité fait partie de l’enseignement : on transmet aussi ce qu’on montre sans le dire."},
    {"q":"Ton élève réussit presque l’exercice mais oublie de purger son gilet en remontant. Tu…","c":["valides quand même","le félicites pour le reste et fais refaire en insistant sur la purge","l’humilies devant le groupe","arrêtes les cours"],"a":1,"e":"Bienveillant et exigeant : on valorise le progrès, mais un geste de sécurité doit être acquis."},
    {"q":"Si la sécurité de l’élève et la fin de l’exercice entrent en conflit…","c":["on finit l’exercice","la sécurité passe d’abord","on demande à l’élève","on improvise"],"a":1,"e":"Toujours. On interrompt, on sécurise, on reprend plus tard."}
  ]
});

AA.content.module({
  id: "e2-peda", world: "e1", depth: "Île 2", icon: "bulb",
  title: "Pédagogie",
  sub: "Objectifs, démonstration, retour",
  essentiel: `
<p>Enseigner, c’est faire passer l’élève de « je ne sais pas » à « je sais faire seul ». Une méthode simple marche très bien :</p>
<div class="formula">Expliquer → Montrer → Faire faire → Corriger → Répéter</div>
<h3>Un bon objectif</h3><p>Il dit <b>ce que l’élève saura faire</b>, de façon <b>observable</b> : « vider son masque à 3 m sans remonter », pas « comprendre le masque ».</p>
<h3>La démonstration</h3><ul><li>Lente, décomposée, face à l’élève, dans de bonnes conditions de visibilité.</li><li>Une seule chose à la fois. On montre le geste juste, pas les erreurs.</li></ul>
<h3>Le retour (feedback)</h3><ul><li>Immédiat, précis, positif d’abord : « Ton expiration était parfaite. Cette fois, garde la tête droite. »</li><li>Un seul point de correction à la fois.</li></ul>
<h3>La progression</h3><p>Du simple au complexe, du connu à l’inconnu, du statique au dynamique, de la piscine au milieu naturel.</p>
<div class="callout ex"><span class="eyebrow">Exemple</span>Lâcher et reprise d’embout : d’abord à genoux en piscine, puis en pleine eau stabilisé, puis en palmant, puis en milieu naturel.</div><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Ce monde prépare l’esprit initiateur. Les prérogatives et le contenu exact de la formation sont fixés par la FFESSM et ta commission technique : fais valider par ton moniteur ou ton formateur.</div>
`,
  approfondir: `
<h3>Un objectif bien écrit</h3><p>Il dit <b>ce que l’élève saura faire</b>, dans quelles conditions, et comment on le vérifie. « Vider son masque à 3 m, sans remonter, trois fois de suite » vaut mieux que « savoir vider son masque ».</p><h3>Montrer, faire faire, corriger</h3><ol><li>Démonstration lente et exagérée, au bon endroit.</li><li>L’élève essaie, toi tu observes une seule chose à la fois.</li><li>Retour : ce qui va, un point à corriger, et on recommence.</li></ol><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Le vocabulaire pédagogique attendu dans ta formation.</div>
`,
  memo: [
    ["Objectif","Observable, avec conditions et critère de réussite."],
    ["Retour","Positif, précis, un point à la fois."]
  ],
  moniteur: ["Peux-tu m’observer pendant une séance et me faire un retour ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Lequel est un objectif bien formulé ?","c":["Comprendre le vidage de masque","Vider son masque à 3 m sans remonter","Être à l’aise sous l’eau","Aimer la plongée"],"a":1,"e":"Il est observable et précis : on peut vérifier s’il est atteint."},
    {"q":"Une bonne démonstration est…","c":["rapide pour ne pas perdre de temps","lente, décomposée, bien visible","faite dans le dos de l’élève","accompagnée de toutes les erreurs possibles"],"a":1,"e":"L’élève doit voir et comprendre chaque étape."},
    {"q":"Combien de points corriger à la fois ?","c":["Tous","Un seul","Trois","Aucun, l’élève trouvera"],"a":1,"e":"Trop de corrections noient l’élève. On corrige le plus important d’abord."},
    {"q":"Quelle progression est la plus logique ?","c":["Milieu naturel puis piscine","Du complexe au simple","Du simple au complexe, du statique au dynamique","Au hasard"],"a":2,"e":"On construit sur ce qui est acquis."},
    {"q":"Le bon ordre pour enseigner un geste ?","c":["Faire faire, puis expliquer","Expliquer, montrer, faire faire, corriger","Montrer seulement","Corriger avant d’expliquer"],"a":1,"e":"Expliquer → Montrer → Faire faire → Corriger → Répéter."},
    {"q":"Un bon retour commence de préférence par…","c":["ce qui ne va pas","ce qui était réussi","une note","un silence"],"a":1,"e":"Un retour positif d’abord garde la motivation et rend la correction mieux acceptée."}
  ]
});

AA.content.module({
  id: "e2-seance", world: "e1", depth: "Île 3", icon: "plan",
  title: "Organiser une séance",
  sub: "Avant, pendant, après",
  essentiel: `
<h3>Avant</h3><ul><li>Fixer <b>un objectif</b> adapté au niveau de l’élève.</li><li>Préparer le matériel, le lieu, le temps disponible.</li><li><b>Briefing</b> : objectif, déroulement, signes utilisés, consignes de sécurité, que faire en cas de problème.</li></ul>
<h3>Pendant</h3><ul><li>Toujours <b>garder le contact visuel</b> et rester à portée de main.</li><li>Observer, corriger, adapter (froid, stress, fatigue). Savoir écourter.</li></ul>
<h3>Après</h3><ul><li><b>Débriefing</b> : faire parler l’élève d’abord (« Qu’as-tu ressenti ? »), puis compléter.</li><li>Noter les acquis et la suite dans le carnet ou la fiche de progression.</li></ul>
<div class="callout ex"><span class="eyebrow">Exemple de briefing en 6 points</span><pre>1. Objectif : vidage de masque à 3 m
2. Déroulement : descente au bout, stabilisation, démo, à toi
3. Signes : OK, problème, monter, descendre
4. Sécurité : je te tiens, on reste ensemble
5. Si problème : signe, on remonte ensemble doucement
6. Questions ?</pre></div><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Ce monde prépare l’esprit initiateur. Les prérogatives et le contenu exact de la formation sont fixés par la FFESSM et ta commission technique : fais valider par ton moniteur ou ton formateur.</div>
`,
  approfondir: `
<h3>Le fil d’une séance</h3><p>Briefing à terre, mise à l’eau, échauffement, exercices du plus simple au plus difficile, retour au calme, débriefing. On prévoit un exercice plus facile en cas de difficulté et un plus difficile si tout va bien.</p>
`,
  memo: [
    ["Avant","Objectif, matériel, briefing."],
    ["Après","Débriefing, carnet, rendre compte."]
  ],
  moniteur: [],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Que contient un bon briefing ?","c":["Seulement la profondeur","Objectif, déroulement, signes, sécurité, conduite en cas de problème","Une blague","Les résultats de l’examen"],"a":1,"e":"L’élève doit savoir ce qu’il va faire et comment réagir."},
    {"q":"Pendant l’exercice, l’initiateur doit…","c":["s’éloigner pour laisser l’élève seul","garder le contact visuel et rester à portée","regarder la faune","nager devant sans se retourner"],"a":1,"e":"La surveillance permanente est la première règle de sécurité."},
    {"q":"Au débriefing, on commence par…","c":["donner la liste des erreurs","faire parler l’élève sur son ressenti","passer à autre chose","noter l’élève"],"a":1,"e":"L’élève prend conscience de ce qu’il a fait, puis on complète."},
    {"q":"L’élève a froid et rate tout. Tu…","c":["insistes jusqu’à réussite","écourtes et reprends une autre fois","le grondes","augmentes la difficulté"],"a":1,"e":"Le froid et la fatigue empêchent d’apprendre et augmentent les risques."},
    {"q":"Après la séance, il est utile de…","c":["ne rien noter","noter acquis et suite de la progression","effacer le carnet","changer d’élève"],"a":1,"e":"Le suivi permet à n’importe quel enseignant du club de reprendre la progression."},
    {"q":"L’objectif d’une séance doit être…","c":["identique pour tous","adapté au niveau de l’élève","le plus difficile possible","secret"],"a":1,"e":"Trop facile, il s’ennuie. Trop dur, il échoue et se décourage."}
  ]
});

AA.content.module({
  id: "e2-secu", world: "e1", depth: "Île 4", icon: "shield",
  title: "Sécurité et baptême",
  sub: "Zone 0 à 6 m, stress, incidents",
  essentiel: `
<h3>Le baptême</h3><ul><li>Accueillir, rassurer, poser des questions simples sur la santé (une contre-indication évidente = pas de baptême).</li><li>Expliquer 3 choses seulement : respirer par la bouche normalement, équilibrer les oreilles, les signes OK / problème / monter.</li><li>Sous l’eau : <b>tenir la personne</b>, gérer son gilet et sa profondeur, surveiller son visage et sa respiration.</li></ul>
<h3>Reconnaître le stress</h3><p>Yeux écarquillés, respiration rapide, gestes saccadés, envie de remonter vite. Réponse : contact, calme, regard, stabiliser, faire expirer longuement, remonter <b>doucement</b> si besoin.</p>
<h3>Incidents fréquents</h3><div class="tbl"><table><tr><th>Incident</th><th>Réaction</th></tr>
<tr><td>Douleur d’oreille</td><td>Remonter un peu, équilibrer, ne pas forcer.</td></tr>
<tr><td>Eau dans le masque</td><td>S’arrêter, rassurer, aider au vidage ou remonter.</td></tr>
<tr><td>Lâcher d’embout</td><td>Remettre l’embout, faire expirer.</td></tr>
<tr><td>Panique</td><td>Tenir fermement, contrôler la remontée, ne jamais lâcher.</td></tr></table></div>
<div class="callout trap"><span class="eyebrow">Même à 3 m</span>Une remontée en bloquant sa respiration peut causer une surpression pulmonaire. C’est en faible profondeur que les variations de volume sont les plus fortes.</div><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Ce monde prépare l’esprit initiateur. Les prérogatives et le contenu exact de la formation sont fixés par la FFESSM et ta commission technique : fais valider par ton moniteur ou ton formateur.</div>
`,
  approfondir: `
<h3>Anticiper</h3><p>Un débutant peut paniquer sans prévenir. On garde le contact visuel (et souvent physique), on contrôle sa flottabilité, on reste prêt à le remonter calmement.</p>
`,
  memo: [
    ["Baptême","Respirer, équilibrer, 3 signes."],
    ["Stress","Yeux écarquillés, respiration rapide, gestes brusques."]
  ],
  moniteur: [],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Combien de consignes donner avant un baptême ?","c":["Le moins possible : l’essentiel","Tout le manuel N1","Aucune","Les tables MN90"],"a":0,"e":"Respiration, oreilles, signes. Trop d’informations augmentent le stress."},
    {"q":"Pendant un baptême, qui gère le gilet et la profondeur ?","c":["Le baptisé","L’encadrant","Personne","Le pilote du bateau"],"a":1,"e":"Le baptisé ne sait pas encore le faire : l’encadrant le tient et gère tout."},
    {"q":"Signes de stress chez un élève ?","c":["Respiration lente et calme","Yeux écarquillés, respiration rapide, gestes saccadés","Il fait OK","Il regarde les poissons"],"a":1,"e":"Il faut réagir tôt, avant la panique."},
    {"q":"Ton élève panique à 4 m et veut remonter. Tu…","c":["le laisses filer","le tiens et contrôles une remontée lente en le faisant expirer","le forces à rester au fond","remontes seul chercher de l’aide"],"a":1,"e":"Ne jamais lâcher. Remontée contrôlée, expiration : risque de surpression même à faible profondeur."},
    {"q":"Pourquoi la zone 0 à 6 m demande-t-elle une vigilance particulière ?","c":["Il y a plus de poissons","Les variations de volume y sont les plus fortes","L’eau y est plus froide","On n’y voit rien"],"a":1,"e":"De 0 à 10 m la pression double : risques de barotraumatisme et de surpression."},
    {"q":"Douleur d’oreille pendant un baptême ?","c":["Descendre pour forcer","Remonter un peu et équilibrer doucement","Faire un Valsalva très fort","Ignorer"],"a":1,"e":"On ne force jamais une oreille."}
  ]
});

AA.content.module({
  id: "e2-com", world: "e1", depth: "Île 5", icon: "chat",
  title: "Communiquer et motiver",
  sub: "Signes, consignes, élève en difficulté",
  essentiel: `
<h3>Sous l’eau</h3><ul><li>Des <b>signes simples, revus au briefing</b>. Un signe doit appeler une réponse (OK → OK).</li><li>Se placer <b>face à l’élève</b>, à sa hauteur, dans la lumière.</li></ul>
<h3>En surface</h3><ul><li>Consignes courtes, verbes d’action : « Expire en remontant » plutôt que « Il ne faut pas bloquer ».</li><li>Vérifier la compréhension : faire reformuler.</li></ul>
<h3>Élève en difficulté</h3><ul><li>Chercher la cause : peur, matériel, technique, fatigue ?</li><li>Revenir à l’étape précédente réussie, puis avancer en plus petits pas.</li><li>Valoriser chaque progrès.</li></ul>
<div class="callout check"><span class="eyebrow">Astuce</span>Explique une fiche de l’Ardoise à quelqu’un en deux minutes. Si tu bloques, c’est que tu peux encore mieux la comprendre.</div><div class="callout check"><span class="eyebrow">Hypothèse à valider</span>Ce monde prépare l’esprit initiateur. Les prérogatives et le contenu exact de la formation sont fixés par la FFESSM et ta commission technique : fais valider par ton moniteur ou ton formateur.</div>
`,
  approfondir: `
<h3>Vérifier qu’on a compris</h3><p>Faire reformuler, faire montrer le signe, poser une question ouverte. Un « oui » ne prouve pas que la consigne est comprise.</p>
`,
  memo: [
    ["Consigne","Courte, positive, montrée."],
    ["Vérifier","Reformulation ou démonstration par l’élève."]
  ],
  moniteur: [],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Tu fais OK à ton élève. Il doit…","c":["ne rien faire","répondre OK (ou un signe de problème)","remonter","te tenir la main"],"a":1,"e":"Un signe appelle une réponse : sinon tu ne sais pas s’il va bien."},
    {"q":"Quelle consigne est la mieux formulée ?","c":["Ne bloque pas ta respiration","Expire en remontant","Évite de ne pas expirer","Attention aux poumons"],"a":1,"e":"Une consigne positive et active est plus facile à appliquer sous stress."},
    {"q":"Pour vérifier qu’une consigne est comprise…","c":["demander « C’est compris ? »","faire reformuler l’élève","répéter plus fort","ne rien faire"],"a":1,"e":"« Oui » ne prouve rien. La reformulation, si."},
    {"q":"Un élève bloque sur un exercice. Première chose ?","c":["Chercher la cause","Passer à l’exercice suivant","Le noter absent","Faire l’exercice à sa place"],"a":0,"e":"Peur, matériel, technique, fatigue : la solution dépend de la cause."},
    {"q":"Sous l’eau, pour montrer un geste, tu te places…","c":["derrière l’élève","face à lui, à sa hauteur","au-dessus de lui","loin pour qu’il voie tout"],"a":1,"e":"Il doit voir ton visage et tes mains clairement."},
    {"q":"L’élève échoue encore. Tu…","c":["reviens à la dernière étape réussie et avances par petits pas","augmentes la difficulté","abandonnes","t’énerves"],"a":0,"e":"Réussir redonne confiance et permet d’avancer."}
  ]
});
