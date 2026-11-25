/* Abysse Academy · contenu FR · Schémas
   Un schéma = une fonction qui renvoie une <figure class="diagram">.
   Couleurs uniquement par classes (d-pri, s-line, t-acc… dans app.css),
   pour suivre le thème. Dans un cours, <figure data-diagram="clé"></figure>
   insère le schéma à cet endroit ; module.diagram le place en tête. */
(function () {
  const fig = (vb, body, cap, label) => `<figure class="diagram"><svg viewBox="${vb}" role="img" aria-label="${label || cap}">${body}</svg><figcaption>${cap}</figcaption></figure>`;
  const arrow = (x1, y1, x2, y2, cls) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" stroke-width="2"/>`;
  AA.content.addDiagrams({
    pression: () => fig("0 0 520 210", [0, 1, 2, 3, 4].map(i => {
      const y = 16 + i * 38, w = 60 + i * 80;
      return `<text x="6" y="${y + 16}" class="d-text">${i * 10} m</text><rect x="56" y="${y}" width="${w}" height="24" rx="8" class="${i ? "d-pri" : "d-soft"}" opacity="${1 - i * .12}"/><text x="${64 + w}" y="${y + 16}" class="d-strong">${i + 1} bar</text>`;
    }).join("") + `<text x="330" y="30" class="t-acc">+1 bar tous les 10 m</text>`,
      "Pression absolue en mer : +1 bar tous les 10 m. La pression double entre 0 et 10 m."),

    mariotte: () => fig("0 0 520 190", [[0, 1], [10, 2], [20, 3], [30, 4], [40, 5]].map(([d, p], i) => {
      const x = 55 + i * 100, r = 36 / Math.sqrt(p);
      return `<circle cx="${x}" cy="74" r="${r}" class="d-acc" opacity=".9"/><line x1="${x}" y1="${74 + r}" x2="${x}" y2="${96}" class="s-muted"/><text x="${x}" y="130" text-anchor="middle" class="d-strong">${d} m</text><text x="${x}" y="148" text-anchor="middle" class="d-text">${p} bar</text><text x="${x}" y="168" text-anchor="middle" class="t-gold">V${p === 1 ? "" : "/" + p}</text>`;
    }).join(""), "Le même ballon de la surface à 40 m : pression × 5, volume ÷ 5."),

    archimede: () => fig("0 0 520 210", `<rect x="200" y="74" width="120" height="60" rx="16" class="d-surf s-pri" stroke-width="2"/><text x="260" y="109" text-anchor="middle" class="d-strong">plongeur</text>
      ${arrow(260, 70, 260, 24, "s-ok")}<path d="M250 28l10-16 10 16z" class="d-ok"/><text x="276" y="30" class="t-ok">Poussée = volume × densité</text>
      ${arrow(260, 138, 260, 184, "s-bad")}<path d="M250 180l10 16 10-16z" class="d-bad"/><text x="276" y="192" class="t-bad">Poids réel</text>
      <text x="10" y="96" class="d-text">Poussée &gt; poids</text><text x="10" y="114" class="d-strong">il remonte</text>
      <text x="380" y="96" class="d-text">Poids &gt; poussée</text><text x="380" y="114" class="d-strong">il coule</text>`,
      "Deux forces s’opposent. Se stabiliser, c’est les rendre égales."),

    dalton: () => fig("0 0 520 170", [[0, 1], [40, 5]].map(([d, p], i) => {
      const y = 22 + i * 72, W = 440 * p / 5;
      return `<text x="6" y="${y + 20}" class="d-strong">${d} m</text><rect x="60" y="${y}" width="${W * .21}" height="30" rx="4" class="d-acc"/><rect x="${60 + W * .21}" y="${y}" width="${W * .79}" height="30" rx="4" class="d-pri"/><text x="62" y="${y + 48}" class="t-acc">O₂ ${(p * .21).toFixed(2).replace(".", ",")}</text><text x="${Math.max(66 + W * .21, 190)}" y="${y + 48}" class="t-pri">N₂ ${(p * .79).toFixed(2).replace(".", ",")} bar</text>`;
    }).join(""), "Toujours 21 % d’O₂ et 79 % de N₂, mais à 40 m chaque pression partielle est 5 fois plus grande."),

    periode: () => {
      const X = t => 50 + t * 70, Y = v => 150 - v * 1.25; let d = "";
      for (let t = 0; t <= 6; t += .1) d += (t ? "L" : "M") + X(t).toFixed(1) + " " + Y(100 * (1 - Math.pow(.5, t))).toFixed(1);
      return fig("0 0 520 180", `<line x1="50" y1="150" x2="480" y2="150" class="s-line"/><line x1="50" y1="25" x2="480" y2="25" class="s-line" stroke-dasharray="4 4"/><text x="6" y="29" class="d-text">100 %</text><text x="6" y="154" class="d-text">0 %</text>
        <path d="${d}" fill="none" class="s-pri" stroke-width="3"/>
        ${[[1, 50], [2, 75], [3, 87.5], [6, 98]].map(([t, v]) => `<circle cx="${X(t)}" cy="${Y(v)}" r="5" class="d-gold"/><text x="${X(t)}" y="${Y(v) - 10}" text-anchor="middle" class="t-gold">${String(v).replace(".", ",")} %</text><text x="${X(t)}" y="170" text-anchor="middle" class="d-text">${t} T</text>`).join("")}`,
        "Chargement d’un tissu en azote : la moitié du chemin à chaque période (T).");
    },

    deco: () => fig("0 0 520 220", `<line x1="40" y1="30" x2="510" y2="30" class="s-pri" stroke-dasharray="4 4"/><text x="4" y="34" class="d-text">0 m</text>
      <line x1="40" y1="70" x2="510" y2="70" class="s-line"/><text x="4" y="74" class="d-text">3 m</text><text x="4" y="174" class="d-text">fond</text>
      <path d="M40 30 L90 170 L300 170 L380 70 L450 70 L480 30" fill="none" class="s-acc" stroke-width="4" stroke-linejoin="round"/>
      <text x="140" y="160" class="d-strong">durée de plongée</text><line x1="40" y1="196" x2="300" y2="196" class="s-gold" stroke-width="2"/><text x="90" y="212" class="t-gold">immersion → début de la remontée</text>
      <text x="300" y="118" class="t-pri">15 à 17 m/min</text><text x="392" y="62" class="t-ok">palier</text><text x="440" y="22" class="t-pri">6 m/min</text>`,
      "Profil d’une plongée à la table : descente, fond, remontée, palier à 3 m, puis surface lentement."),

    materiel: () => fig("0 0 540 120", [["Bloc", "200 bar", "acc"], ["1er étage", "MP ≈ +9 bar", "gold"], ["2e étage", "P ambiante", "pri"], ["Toi", "à la demande", "ok"]].map(([a, b, c], i) => {
      const x = 6 + i * 134;
      return `<rect x="${x}" y="30" width="112" height="58" rx="12" class="d-surf s-${c}" stroke-width="2"/><text x="${x + 56}" y="55" text-anchor="middle" class="d-strong">${a}</text><text x="${x + 56}" y="74" text-anchor="middle" class="t-${c}">${b}</text>${i < 3 ? `<line x1="${x + 114}" y1="59" x2="${x + 128}" y2="59" class="s-muted" stroke-width="2"/><path d="M${x + 127} 54l6 5-6 5z" class="d-text"/>` : ""}`;
    }).join(""), "Le trajet de l’air : la pression baisse à chaque étape jusqu’à celle qui t’entoure."),

    environnement: () => fig("0 0 520 150", [["#E63946", "rouge", "≈ 5 m"], ["#F4A261", "orange", "≈ 15 m"], ["#FFD166", "jaune", "≈ 25 m"], ["#3DDC97", "vert", "plus bas"], ["#1CB5C9", "bleu", "reste"]].map(([c, n, d], i) => {
      const x = 10 + i * 102;
      return `<rect x="${x}" y="18" width="92" height="60" rx="12" fill="${c}" opacity="${i < 4 ? 1 - i * .12 : 1}"/><text x="${x + 46}" y="102" text-anchor="middle" class="d-strong">${n}</text><text x="${x + 46}" y="122" text-anchor="middle" class="d-text">${d}</text>`;
    }).join(""), "L’eau absorbe les couleurs dans cet ordre : profondeur où chacune disparaît à peu près (indicatif, selon l’eau et le soleil)."),

    douziemes: () => fig("0 0 520 170", [1, 2, 3, 3, 2, 1].map((v, i) => {
      const x = 40 + i * 76, h = v * 34;
      return `<rect x="${x}" y="${140 - h}" width="56" height="${h}" rx="6" class="${v === 3 ? "d-acc" : "d-pri"}"/><text x="${x + 28}" y="${132 - h}" text-anchor="middle" class="d-strong">${v}/12</text><text x="${x + 28}" y="160" text-anchor="middle" class="d-text">${i ? (i + 1) + "e" : "1re"} h</text>`;
    }).join(""), "Règle des douzièmes : la mer monte (ou descend) surtout pendant les 3e et 4e heures, quand le courant est le plus fort.")
  });
})();
