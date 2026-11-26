/* =====================================================================
   Abysse Academy · contenu FR · Schémas animés (1.6)
   Constructeurs génériques : étapes (flow), cycle, zones de profondeur,
   profil de plongée, bulles, manomètre, palanquée, oreille, signes, MOD.
   Les animations ne démarrent que quand le schéma est visible (.in)
   et sont coupées si l'utilisateur réduit les animations.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const fig = (vb, body, cap) => `<figure class="diagram anim"><svg viewBox="${vb}" role="img" aria-label="${esc(cap)}">${body}</svg><figcaption>${cap}</figcaption></figure>`;
  const wrap = (s, n) => { const L = []; let cur = ""; String(s).split(" ").forEach(x => { if ((cur + " " + x).trim().length > n && cur) { L.push(cur.trim()); cur = x; } else cur += " " + x; }); if (cur.trim()) L.push(cur.trim()); return L; };
  const lines = (x, y, arr, cls, lh) => `<text x="${x}" y="${y}" class="${cls}">${arr.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("")}</text>`;

  /* Étapes numérotées, de haut en bas, qui apparaissent l'une après l'autre. */
  const flow = (steps, cap) => {
    let y = 10; const rows = steps.map(([title, det], i) => {
      const d = det ? wrap(det, 52) : [], h = 30 + d.length * 18, g = `<g class="an-step" style="--i:${i}">
        <circle cx="24" cy="${y + 14}" r="14" class="d-pri"/><text x="24" y="${y + 19}" class="t-num" text-anchor="middle">${i + 1}</text>
        <text x="50" y="${y + 19}" class="d-strong">${esc(title)}</text>${d.length ? lines(50, y + 40, d, "d-text", 18) : ""}</g>
        ${i < steps.length - 1 ? `<line x1="24" y1="${y + 30}" x2="24" y2="${y + h + 2}" class="s-pri an-dash" stroke-width="2"/>` : ""}`;
      y += h + 4; return g; }).join("");
    return fig(`0 0 520 ${y + 4}`, rows, cap);
  };
  /* Un cycle qui tourne : 3 à 5 étapes autour d'une idée centrale. */
  const cycle = (items, center, cap) => {
    const n = items.length, cx = 260, cy = 150, R = 108;
    const nodes = items.map((t, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n, x = cx + R * Math.cos(a) * 1.55, y = cy + R * Math.sin(a);
      return `<g class="an-step" style="--i:${i}"><rect x="${x - 72}" y="${y - 19}" width="144" height="38" rx="19" class="d-surf s-pri" stroke-width="2"/>
        <text x="${x}" y="${y + 5}" class="d-strong" text-anchor="middle">${esc(t)}</text></g>`; }).join("");
    return fig("0 0 520 300", `<ellipse cx="${cx}" cy="${cy}" rx="${R * 1.55}" ry="${R}" fill="none" class="s-pri an-ring" stroke-width="2" stroke-dasharray="8 10"/>
      ${lines(cx, cy - 4, wrap(center, 22), "t-acc mid", 18)}${nodes}`, cap);
  };
  /* Bandes de profondeur 0-60 m (qui peut aller où). */
  const zones = (rows, cap) => {
    const X = d => 120 + d / 60 * 380, h = rows.length * 34 + 44;
    return fig(`0 0 520 ${h}`, `${[0, 6, 12, 20, 40, 60].map(d => `<line x1="${X(d)}" x2="${X(d)}" y1="6" y2="${h - 30}" class="s-line" stroke-dasharray="3 4"/><text x="${X(d)}" y="${h - 10}" class="d-text" text-anchor="middle">${d}${d === 60 ? " m" : ""}</text>`).join("")}
      ${rows.map(([lab, to, cls, note], i) => { const y = 12 + i * 34; return `<text x="6" y="${y + 17}" class="d-strong">${esc(lab)}</text>
        <rect x="${X(0)}" y="${y}" width="${X(to) - X(0)}" height="22" rx="11" class="${cls || "d-pri"} grow-bar" style="animation-delay:${i * .12}s"/>
        ${(() => { const w = X(to) - X(0), inside = w > (note || "").length * 8 + 16; return `<text x="${inside ? X(to) - 10 : X(to) + 8}" y="${y + 16}" class="${inside ? "t-on" : "d-text"}" text-anchor="${inside ? "end" : "start"}">${esc(note || "")}</text>`; })()}`; }).join("")}`, cap);
  };
  /* Profil de plongée avec un plongeur qui le parcourt. */
  const profile = (o, cap) => {
    const k = 150 / (o.depth || 40), yS = 30, yB = yS + o.depth * k, yP = yS + (o.palier || 0) * k;
    const pts = o.palier ? `M20 ${yS} L110 ${yB} L300 ${yB} L420 ${yP} L470 ${yP} L500 ${yS}` : `M20 ${yS} L110 ${yB} L320 ${yB} L500 ${yS}`;
    return fig("0 0 520 220", `<line x1="10" x2="510" y1="${yS}" y2="${yS}" class="s-pri" stroke-width="2"/><text x="12" y="${yS - 10}" class="d-text">surface</text>
      <path d="${pts}" fill="none" class="s-acc an-draw" stroke-width="3" stroke-linejoin="round"/>
      <text x="62" y="${(yS + yB) / 2}" class="d-text" text-anchor="end">${esc(o.down || "descente")}</text>
      <text x="${o.palier ? 205 : 215}" y="${yB + 22}" class="d-text" text-anchor="middle">${esc(o.bottom || "")}</text>
      <text x="${o.palier ? 372 : 420}" y="${(yB + yP) / 2 - 6}" class="t-gold">${esc(o.up || "remontée lente")}</text>
      ${o.palier ? `<text x="445" y="${yP + 22}" class="t-ok" text-anchor="middle">${esc(o.stop || "palier " + o.palier + " m")}</text>` : ""}
      <circle r="7" class="d-gold an-move"><animateMotion dur="9s" repeatCount="indefinite" path="${pts}"/></circle>`, cap);
  };
  /* Bulles : remontée lente vs rapide. */
  const bubbles = (cap, left, right) => {
    const bub = (x0, n, big) => Array.from({ length: n }, (_, i) => `<circle cx="${x0 + (i * 37) % 170}" cy="${170 - (i * 23) % 60}" r="${big ? 4 + (i % 4) * 2.5 : 2 + (i % 2)}" class="${big ? "d-bad" : "d-pri"} an-bub" style="--i:${i}"/>`).join("");
    return fig("0 0 520 210", `<rect x="20" y="40" width="220" height="150" rx="16" class="d-soft"/><rect x="280" y="40" width="220" height="150" rx="16" class="d-soft"/>
      <text x="130" y="28" class="t-ok" text-anchor="middle">${esc(left)}</text><text x="390" y="28" class="t-bad" text-anchor="middle">${esc(right)}</text>
      ${bub(45, 6, false)}${bub(305, 14, true)}`, cap);
  };
  /* Manomètre : l'aiguille descend, les repères parlent. */
  const gauge = (marks, cap) => {
    const cx = 260, cy = 200, r = 160, P = b => { const a = Math.PI * (1 - b / 200); return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; };
    const arc = (b1, b2, cls) => { const [x1, y1] = P(b1), [x2, y2] = P(b2); return `<path d="M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}" fill="none" class="${cls}" stroke-width="14" stroke-linecap="round"/>`; };
    return fig("-70 0 660 236", `${arc(0, 50, "s-bad")}${arc(50, 100, "s-gold")}${arc(100, 200, "s-ok")}
      ${[0, 50, 100, 150, 200].map(b => { const [x, y] = P(b + 0.01), [x2, y2] = [cx + (x - cx) * .8, cy + (y - cy) * .8]; return `<text x="${x2}" y="${y2 + 4}" class="d-text" text-anchor="middle">${b}</text>`; }).join("")}
      ${marks.map(([b, t, cls], i) => { const [x, y] = P(b), [x3, y3] = [cx + (x - cx) * 1.13, cy + (y - cy) * 1.13]; return `<circle cx="${x}" cy="${y}" r="7" class="d-surf ${cls ? cls.replace("t-", "s-") : "s-pri"}" stroke-width="3"/><text x="${x3}" y="${y3}" class="${cls || "t-pri"}" text-anchor="${b > 110 ? "start" : b < 90 ? "end" : "middle"}">${esc(t)}</text>`; }).join("")}
      <g class="an-needle"><line x1="${cx}" y1="${cy}" x2="${cx + r - 34}" y2="${cy}" class="s-acc" stroke-width="5" stroke-linecap="round"/></g><circle cx="${cx}" cy="${cy}" r="10" class="d-acc"/>
      <text x="${cx}" y="${cy + 30}" class="d-text" text-anchor="middle">bar</text>`, cap);
  };
  /* Palanquée : le guide devant, tout le monde à portée de vue. */
  const team = (names, cap) => {
    const pos = [[90, 105], [240, 55], [240, 150], [400, 55], [400, 150]].slice(0, names.length);
    return fig("0 0 520 220", `${pos.slice(1).map(([x, y], i) => { const [fx, fy] = i < 2 ? pos[0] : pos[i - 1]; return `<line x1="${fx}" y1="${fy}" x2="${x}" y2="${y}" class="s-pri an-dash" stroke-width="2" stroke-dasharray="6 6"/>`; }).join("")}
      ${pos.map(([x, y], i) => `<g class="an-step" style="--i:${i}"><circle cx="${x}" cy="${y}" r="24" class="${i ? "d-pri" : "d-gold"}"/><text x="${x}" y="${y + 5}" class="t-num" text-anchor="middle">${i ? "P" + i : "G"}</text>
        <text x="${x}" y="${y + 44}" class="d-text" text-anchor="middle">${esc(names[i])}</text>
        ${[0, 1, 2].map(j => `<circle cx="${x + 18 + j * 4}" cy="${y - 26}" r="${2 + j}" class="d-soft s-pri an-bub" style="--i:${i + j}"/>`).join("")}</g>`).join("")}`, cap);
  };
  /* L'oreille : le tympan, la trompe d'Eustache, le « pop ». */
  const ear = cap => fig("0 0 520 230", `<rect x="20" y="78" width="130" height="54" rx="12" class="d-soft"/><text x="85" y="66" class="d-text" text-anchor="middle">conduit (eau)</text>
    <text x="32" y="110" class="d-text">eau pousse →</text>
    <path d="M160 52 Q182 105 160 158" fill="none" class="s-acc an-tymp" stroke-width="5"/><text x="166" y="38" class="t-acc" text-anchor="middle">tympan</text>
    <ellipse cx="250" cy="105" rx="62" ry="46" class="d-soft"/><text x="250" y="102" class="d-text" text-anchor="middle">oreille</text><text x="250" y="120" class="d-text" text-anchor="middle">moyenne</text>
    <path d="M290 138 Q340 190 470 196" fill="none" class="s-pri" stroke-width="10" stroke-linecap="round"/>
    <path d="M470 196 Q340 190 290 138" fill="none" class="s-gold an-dash" stroke-width="3" stroke-dasharray="6 8"/>
    <text x="320" y="222" class="t-pri">trompe d’Eustache</text><text x="480" y="186" class="t-gold" text-anchor="end">air</text><text x="470" y="170" class="d-text" text-anchor="end">gorge</text>`, cap);
  /* Échanges de signes : question → réponse. */
  const signs = (pairs, cap) => fig(`0 0 520 ${pairs.length * 56 + 10}`, pairs.map(([a, b], i) => { const y = 10 + i * 56;
    return `<g class="an-step" style="--i:${i}"><rect x="10" y="${y}" width="230" height="42" rx="14" class="d-soft"/><text x="125" y="${y + 26}" class="d-strong" text-anchor="middle">${esc(a)}</text>
      <line x1="248" y1="${y + 21}" x2="272" y2="${y + 21}" class="s-acc" stroke-width="3"/><path d="M272 ${y + 14} L284 ${y + 21} L272 ${y + 28}" class="d-acc"/>
      <rect x="290" y="${y}" width="220" height="42" rx="14" class="d-surf s-pri" stroke-width="2"/><text x="400" y="${y + 26}" class="t-pri" text-anchor="middle">${esc(b)}</text></g>`; }).join(""), cap);
  /* MOD : profondeur maximale selon le mélange et la Pp O₂ limite. */
  const mod = cap => { const mixes = [21, 32, 36, 40], X = d => 110 + d / 70 * 390, md = (pp, f) => (pp / (f / 100) - 1) * 10;
    return fig("0 0 520 250", `${[0, 10, 20, 30, 40, 50, 60, 70].map(d => `<line x1="${X(d)}" x2="${X(d)}" y1="8" y2="214" class="s-line" stroke-dasharray="3 4"/><text x="${X(d)}" y="236" class="d-text" text-anchor="middle">${d}${d === 70 ? " m" : ""}</text>`).join("")}
      ${mixes.map((f, i) => { const y = 14 + i * 50, a = md(1.4, f), b = md(1.6, f); return `<text x="6" y="${y + 24}" class="d-strong">${f === 21 ? "Air 21 %" : "Nx " + f + " %"}</text>
        <rect x="${X(0)}" y="${y}" width="${X(b) - X(0)}" height="16" rx="8" class="d-gold grow-bar"/><rect x="${X(0)}" y="${y + 20}" width="${X(a) - X(0)}" height="16" rx="8" class="d-pri grow-bar" style="animation-delay:${i * .12}s"/>
        <text x="${X(b) - 8}" y="${y + 12}" class="t-on" text-anchor="end">${Math.floor(b)} m · 1,6</text><text x="${X(a) - 8}" y="${y + 32}" class="t-on" text-anchor="end">${Math.floor(a)} m · 1,4</text>`; }).join("")}`, cap); };

  C.addDiagrams({
    "fl-bapteme": () => flow([["Briefing à terre", "Signes OK / problème / monter, respirer calmement, oreilles."], ["Équipement", "Le moniteur règle tout : gilet, lest, bouteille."], ["En surface", "Tête dans l’eau, tu respires sur le détendeur sans bouger."], ["Descente lente", "Tu équilibres tes oreilles tous les mètres, sans attendre."], ["Balade", "Le moniteur gère ta profondeur, toi tu regardes."], ["Remontée et débrief", "Tu respires normalement et tu racontes ce que tu as vu."]], "Le baptême, étape par étape : chaque étape s’allume à son tour."),
    "ear": () => ear("En descendant, l’eau pousse le tympan vers l’intérieur. En soufflant nez pincé, l’air remonte la trompe d’Eustache et le remet droit : c’est le « pop »."),
    "sg-n1": () => signs([["OK ?", "OK"], ["Ça ne va pas + oreille", "On remonte d’un mètre"], ["Je suis sur la réserve", "On commence à remonter"], ["Plus d’air", "Mon détendeur de secours"], ["On remonte", "On remonte ensemble"]], "Un signe appelle toujours une réponse. Sans réponse, on répète et on se rapproche."),
    "fl-n1secu": () => flow([["Gilet", "Il gonfle et se vide ? Inflateur branché ?"], ["Lest", "Bien placé, largable d’une main."], ["Robinet et air", "Bouteille ouverte, manomètre plein (≈ 200 bar)."], ["Détendeurs", "Principal et secours respirent sans goût ni bruit."], ["Signes revus", "OK, problème, réserve, plus d’air, on remonte."]], "La vérification entre équipiers avant de s’immerger (« check » du binôme)."),
    "fl-n1acc": () => flow([["Je sens un souci", "Oreille, masque, froid, souffle court…"], ["Je m’arrête", "Je ne continue pas en espérant que ça passe."], ["Je signale", "Signe « ça ne va pas » puis je montre où."], ["On agit ensemble", "Remonter un peu, souffler, se stabiliser, écourter."]], "Le réflexe N1 face à tout problème : s’arrêter, signaler, agir ensemble."),
    "cy-circu": () => cycle(["Poumons", "Cœur gauche", "Organes", "Cœur droit"], "Le sang transporte O₂, CO₂ et azote", "La circulation : le sang se charge en oxygène dans les poumons, le distribue aux organes, puis revient chargé en CO₂ (et en azote en plongée)."),
    "bub-add": () => bubbles("Pourquoi remonter lentement : à gauche, l’azote quitte le corps en petites bulles que les poumons filtrent ; à droite, une remontée rapide forme de grosses bulles qui bloquent la circulation.", "remontée lente", "remontée rapide"),
    "zn-regles": () => zones([["Baptême", 6, "d-acc", "avec un moniteur"], ["N1", 20, "d-ok", "encadré (PE20)"], ["N2", 40, "d-pri", "autonome 20, encadré 40"], ["N3", 60, "d-gold", "autonome 60 (PA60)"]], "Les espaces de profondeur de chaque niveau (FFESSM, Code du sport) : à faire valider par ton moniteur."),
    "pr-pa20": () => profile({ depth: 20, palier: 3, down: "descente", bottom: "fond : 20 m maximum", up: "≈ 10-15 m/min", stop: "palier 3 m" }, "Une plongée autonome N2 typique : descente maîtrisée, fond limité à 20 m, remontée lente et palier de sécurité."),
    "fl-rifap": () => flow([["Protéger", "Sortir de l’eau, se mettre à l’abri, éviter un 2ᵉ accident."], ["Examiner", "Conscience, respiration, signes (douleur, fourmillements…)."], ["Alerter", "VHF 16 en mer, 15 ou 112 à terre. Message complet."], ["Secourir", "Oxygène au plus tôt, PLS ou réanimation, eau à boire."], ["Surveiller et transmettre", "Noter l’heure, les signes, la fiche d’évacuation."]], "La chaîne des secours du RIFAP : chaque maillon compte."),
    "fl-alerte": () => flow([["Qui", "Ton nom, le club ou le bateau, un numéro de rappel."], ["Où", "Site, position GPS, point de rendez-vous."], ["Quoi", "Accident de plongée, nombre de victimes."], ["État", "Conscience, respiration, signes et heure d’apparition."], ["Déjà fait", "Oxygène depuis quelle heure, gestes en cours."], ["Ne pas raccrocher", "C’est le secours qui met fin à l’appel."]], "Le message d’alerte, dans l’ordre."),
    "gg-o2": () => gauge([[200, "plein", "t-ok"], [100, "moitié", "t-gold"], [50, "prévoir la relève", "t-bad"]], "Bouteille d’oxygène : on surveille la pression pour savoir combien de minutes il reste (volume × pression ÷ débit)."),
    "fl-vict": () => flow([["Elle répond ?", "Non : elle est inconsciente. Appeler à l’aide."], ["Libérer les voies aériennes", "Bascule prudente de la tête, menton levé."], ["Elle respire ?", "Regarder, écouter, sentir pendant 10 secondes."], ["Oui : PLS", "Oxygène, alerte, surveillance toutes les minutes."], ["Non : réanimation", "Alerte, compressions et insufflations, défibrillateur."]], "Face à une victime inconsciente : la décision se prend en quelques secondes."),
    "fl-cas": () => flow([["Je vois", "Ce qui se passe, l’heure, les paramètres de plongée."], ["Je protège", "Sortir de l’eau, allonger, couvrir."], ["J’oxygène", "Masque haute concentration, 15 L/min."], ["J’alerte", "Message complet, fiche d’évacuation."], ["Je surveille", "Conscience, respiration, évolution des signes."]], "Le fil commun de tous les cas pratiques."),
    "cy-peda": () => cycle(["Expliquer", "Montrer", "Faire faire", "Corriger", "Répéter"], "Un seul objectif observable", "La boucle pédagogique : on recommence jusqu’à ce que le geste soit sûr et calme."),
    "fl-seance": () => flow([["Objectif", "Ce que l’élève saura faire, observable."], ["Briefing", "Déroulement, signes, sécurité, que faire si…"], ["Échauffement", "Un geste déjà acquis pour se mettre en confiance."], ["Exercices", "Du simple au complexe, une correction à la fois."], ["Retour au calme", "Balade ou jeu, sans difficulté."], ["Débriefing", "L’élève parle d’abord, puis on complète et on note."]], "Le fil d’une séance d’enseignement."),
    "fl-stress": () => flow([["Je repère", "Yeux écarquillés, respiration rapide, gestes saccadés."], ["Je contacte", "Main sur l’épaule ou le gilet, regard dans les yeux."], ["Je stabilise", "Gilet, position, on s’arrête."], ["Je fais expirer", "Signe « on souffle », je montre une longue expiration."], ["Je décide", "Continuer calmement ou remonter doucement ensemble."]], "Gérer le stress d’un débutant avant qu’il ne devienne panique."),
    "cy-com": () => cycle(["Signe clair", "Réponse", "Vérification", "Encouragement"], "Se comprendre sans parler", "Communiquer sous l’eau : un signe appelle une réponse, on vérifie et on valorise."),
    "cy-role": () => cycle(["Accueillir", "Enseigner", "Protéger", "Rendre compte"], "L’initiateur au service de l’élève", "Les quatre missions de l’initiateur, sous l’autorité d’un moniteur."),
    "gg-n3": () => gauge([[200, "départ", "t-ok"], [130, "demi-tour", "t-pri"], [70, "début de remontée", "t-gold"], [50, "réserve", "t-bad"]], "Gérer son air en autonomie : on fixe à l’avance les pressions de demi-tour, de remontée et de réserve (exemple, à adapter)."),
    "bub-n3": () => bubbles("Après la plongée, les tissus rendent leur azote. Lentement : des micro-bulles filtrées par les poumons. Trop vite : des bulles qui grossissent et bloquent des vaisseaux (ADD).", "désaturation normale", "ADD"),
    "team-n4": () => team(["Guide", "Débutant", "Débutant", "Plongeur", "Plongeur"], "La palanquée encadrée : le guide garde tout le monde à portée de vue et règle le rythme sur le plus faible."),
    "gg-n4": () => gauge([[200, "départ", "t-ok"], [120, "demi-tour", "t-pri"], [60, "remontée", "t-gold"]], "La palanquée vit au rythme de celui qui consomme le plus : c’est son manomètre qui fixe le demi-tour."),
    "fl-assist": () => flow([["Contrôler", "Une prise ferme, face à face ou de côté."], ["Faire respirer", "Détendeur en bouche, partage d’air si besoin."], ["Remonter", "Vitesse lente, gilets gérés, expiration surveillée."], ["En surface", "Flottabilité positive, signe de détresse, tracter."], ["Prendre en charge", "Sortie de l’eau, puis gestes du RIFAP."]], "La remontée assistée, de la prise en charge à la surface."),
    "fl-orga": () => flow([["Le DP organise", "Site, horaires, matériel de secours, fiche de sécurité."], ["Il compose les palanquées", "Niveaux, aptitudes, guides."], ["Il fixe les paramètres", "Profondeur et durée maximales."], ["Les palanquées plongent", "Guide ou autonomes, dans ce cadre."], ["Retour et contrôle", "Paramètres notés, tout le monde est là."]], "Une plongée en club, du point de vue de l’organisation."),
    "cy-ens20": () => cycle(["Objectif", "Démonstration", "Essai", "Correction", "Validation"], "Les gestes sûrs à 6 m avant 20 m", "Enseigner jusqu’à 20 m : on ne descend que lorsque le geste est automatique plus haut."),
    "zn-cadre": () => zones([["N2", 20, "d-pri", "autonome jusqu’à 20 m"], ["N3", 40, "d-gold", "autonome 20-40 m"], ["N3", 60, "d-gold", "autonome 40-60 m"], ["Guide N4", 40, "d-ok", "guide jusqu’à 40 m"]], "Le cadre du N3 : autonome jusqu’à 60 m, toujours sous l’autorité d’un directeur de plongée. À faire valider par ton moniteur."),
    "pr-n4deco": () => profile({ depth: 40, palier: 3, down: "descente groupée", bottom: "du plus profond…", up: "…vers le moins profond", stop: "palier ensemble" }, "Le profil conduit par le guide : on commence profond, on remonte par étapes, sans yo-yo, et tout le monde fait le palier le plus long."),
    "bub-n4": () => bubbles("Le guide ne voit pas les bulles, mais il voit leurs effets : fatigue anormale, douleur, fourmillements après la plongée. Il observe ses plongeurs après la sortie.", "plongeur en forme", "signes à surveiller"),
    "cy-eval": () => cycle(["Observer", "Valoriser", "Corriger", "Valider"], "Des critères connus à l’avance", "Évaluer pour faire progresser : un point observé à la fois, une correction à la fois."),
    "fl-nx": () => flow([["Calibrer l’analyseur", "À l’air libre, il doit lire 21 %."], ["Analyser son bloc", "Soi-même, robinet entrouvert, lecture stable."], ["Étiqueter", "% d’O₂, MOD, date, nom."], ["Régler l’ordinateur", "Même % d’O₂ et Pp O₂ maximale choisie."], ["Plonger sous la MOD", "Et garder les bonnes habitudes de remontée."]], "Le nitrox en pratique, du gonflage à la plongée."),
    "mod": () => mod("Profondeur maximale (MOD) selon le mélange : plus il y a d’oxygène, moins on peut descendre. Barre dorée : Pp O₂ limite 1,6 bar ; barre turquoise : 1,4 bar (valeurs arrondies vers le bas)."),
    "fl-piscine": () => flow([["Respirer sur le détendeur", "Debout, puis à genoux, puis allongé."], ["Masque", "Vidage partiel, puis total."], ["Détendeur", "Lâcher, retrouver, reprendre, purger."], ["Palmer", "En surface, puis immergé."], ["Oreilles et descente", "Équilibrer en descendant le long du bord."], ["Stabilisation et signes", "Le gilet, puis « ça ne va pas » et « plus d’air »."]], "Une progression classique en piscine (à adapter à chaque élève)."),
    "zn-orga": () => zones([["Baptême", 6, "d-acc", "avec un moniteur"], ["E1", 6, "d-acc", "enseigne 0-6 m"], ["E2", 20, "d-ok", "enseigne 0-20 m"], ["Guide N4", 40, "d-pri", "guide 0-40 m"]], "Qui encadre ou enseigne où (repères à faire valider par ton moniteur).")
  });

  /* Rattache un schéma aux thèmes qui n'en avaient pas. */
  const DIAG = { "d-bapteme": "fl-bapteme", "n1-signes": "sg-n1", "n1-secu": "fl-n1secu", "n1-accidents": "fl-n1acc", physio: "cy-circu", accidents: "bub-add", regles: "zn-regles", pa20: "pr-pa20",
    "r-role": "fl-rifap", "r-alerte": "fl-alerte", "r-o2": "gg-o2", "r-vict": "fl-vict", "r-cas": "fl-cas", "e2-role": "cy-role", "e2-peda": "cy-peda", "e2-seance": "fl-seance", "e2-secu": "fl-stress", "e2-com": "cy-com", "e1-piscine": "fl-piscine",
    "n3-autonomie": "gg-n3", "n3-accidents": "bub-n3", "n3-cadre": "zn-cadre", "n3-physio": "cy-circu", "n4-guide": "team-n4", "n4-air": "gg-n4", "n4-assistance": "fl-assist", "n4-orga": "fl-orga", "n4-deco": "pr-n4deco", "n4-physio": "bub-n4",
    "e2-enseigner20": "cy-ens20", "e2-securite": "fl-stress", "e2-evaluer": "cy-eval", "nx-pratique": "fl-nx" };
  Object.keys(DIAG).forEach(id => { const m = C.byId[id]; if (m && !m.diagram) m.diagram = DIAG[id]; });
})();
