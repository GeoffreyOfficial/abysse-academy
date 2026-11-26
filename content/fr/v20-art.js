/* =====================================================================
   Abysse Academy 2.0 · illustrations animées
   - Signes de plongée animés (cours N1 « Signes et communication »).
   - Le détendeur et ses flexibles, octopus en jaune (cours Matériel).
   - Le gilet stabilisateur, le manomètre et la réserve.
   - Faune et flore de Méditerranée (cours Environnement).
   Les animations s'arrêtent si l'utilisateur réduit les animations.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, C = AA.content;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const SK = "#F2C7A0", SL = "#8A5A3C", SUIT = "#1F3242";

  /* ---------- Main stylisée (boîte 100 × 110, poignet en bas) ---------- */
  const finger = (i, up) => { const x = 28 + i * 11, y = up ? 12 + [6, 0, 3, 10][i] : 42; return `<rect x="${x}" y="${y}" width="10" height="${up ? 52 - y + 8 : 16}" rx="5" fill="${SK}" stroke="${SL}" stroke-width="1.6"/>`; };
  const palm = `<rect x="26" y="48" width="46" height="42" rx="12" fill="${SK}" stroke="${SL}" stroke-width="1.6"/>`;
  const sleeve = `<rect x="32" y="86" width="34" height="22" rx="4" fill="${SUIT}"/>`;
  const thumbSide = `<rect x="8" y="52" width="26" height="10" rx="5" fill="${SK}" stroke="${SL}" stroke-width="1.6" transform="rotate(-28 30 57)"/>`;
  const thumbUp = `<rect x="15" y="16" width="11" height="44" rx="5.5" fill="${SK}" stroke="${SL}" stroke-width="1.6"/>`;
  const thumbAcross = `<rect x="24" y="56" width="34" height="10" rx="5" fill="${SK}" stroke="${SL}" stroke-width="1.6"/>`;
  const flat = () => sleeve + [0, 1, 2, 3].map(i => finger(i, true)).join("") + palm + thumbSide;
  const fist = thumb => sleeve + palm + [0, 1, 2, 3].map(i => finger(i, false)).join("") + (thumb === "up" ? thumbUp : thumbAcross);
  const okHand = () => sleeve + [1, 2, 3].map(i => finger(i, true)).join("") + palm +
    `<circle cx="24" cy="40" r="11" fill="none" stroke="${SL}" stroke-width="10"/><circle cx="24" cy="40" r="11" fill="none" stroke="${SK}" stroke-width="7"/>`;
  const head = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="17" fill="${SUIT}"/><rect x="${cx - 13}" y="${cy - 8}" width="26" height="12" rx="5" fill="#9fd8e8" stroke="#0d1b26" stroke-width="2"/>`;
  const sign = (svg, name, meaning, answer) => `<div class="sg-card"><svg viewBox="0 0 120 120" role="img" aria-label="${esc(name)} : ${esc(meaning)}">${svg}</svg>
    <b>${esc(meaning)}</b><span class="sg-how">${esc(name)}</span><span class="sg-ans">→ ${esc(answer)}</span></div>`;
  const at = (x, y, s, inner, cls) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls || ""}">${inner}</g></g>`;

  C.addDiagrams({
    "signes-anim": () => `<figure class="diagram tu-art sg-grid-fig"><div class="sg-grid">
      ${sign(at(10, 5, 1, okHand(), "sg-pulse"), "Pouce et index en rond", "« Ça va »", "Même signe")}
      ${sign(at(10, 5, 1, flat(), "sg-wob"), "Main à plat qui oscille", "« Ça ne va pas »", "On montre où (oreille, masque…)")}
      ${sign(at(10, 5, 1, fist("up"), "sg-up"), "Pouce vers le haut", "« On remonte »", "Même signe, on remonte ensemble")}
      ${sign(`<g transform="rotate(180 60 60)">${at(10, 5, 1, fist("up"), "sg-up")}</g>`, "Pouce vers le bas", "« On descend »", "Signe « ça va »")}
      ${sign(`${head(60, 26)}<rect x="50" y="42" width="20" height="14" fill="${SK}"/><path d="M22 120c0-30 18-62 38-62s38 32 38 62z" fill="${SUIT}"/>
        <g class="sg-slide"><g transform="translate(96 40) rotate(90) scale(.42)">${flat()}</g></g>`, "Main tranchant sur la gorge", "« Je n’ai plus d’air »", "Donner son détendeur de secours")}
      ${sign(`<g class="sg-a">${at(10, 5, 1, fist("across"))}</g><g class="sg-b">${at(10, 5, 1, flat())}</g>`, "Poing qui s’ouvre et se ferme devant la poitrine", "« Je suis sur la réserve »", "On remonte")}
      ${sign(`<g class="sg-push"><g transform="translate(6 100) rotate(-90) scale(.9)">${flat()}</g></g><path d="M0 112h120" stroke="var(--line)" stroke-dasharray="4 4"/>`, "Main à plat, paume vers le bas", "« Stop, on reste ici »", "Signe « ça va »")}
      ${sign(`<path d="M18 120c0-34 18-70 42-70s42 36 42 70z" fill="${SUIT}"/>${head(60, 30)}<g class="sg-tap"><g transform="translate(46 62) scale(.4)">${fist("across")}</g></g>`, "Poing tapé sur la poitrine", "« Je suis essoufflé »", "On s’arrête, on aide")}
      ${sign(`<path class="sg-wave" d="M0 84q15-8 30 0t30 0 30 0 30 0V120H0z" fill="var(--primary)" opacity=".35"/>${head(60, 66)}
        <path d="M44 70C30 40 50 22 60 46" stroke="${SUIT}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M76 70C90 40 70 22 60 46" stroke="${SUIT}" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="60" cy="44" r="5" fill="${SK}"/>`, "En surface : bras en rond au-dessus de la tête", "« Ça va » (en surface)", "Le bateau te voit")}
      </div><figcaption>Les signes de base, animés. Un signe se fait lentement, devant le masque de l’autre, et appelle toujours une réponse. Attention : sous l’eau, le pouce levé veut dire « on remonte », pas « ça va ».</figcaption></figure>`,

    "eq-detendeur": () => {
      const items = [
        [44, "#16232e", "Deuxième étage", "Celui que tu respires : il donne l’air à la pression ambiante.", "reg"],
        [114, "#F2C230", "Octopus (jaune)", "Détendeur de secours : tu le donnes à ton équipier en panne d’air.", "reg"],
        [184, "#16232e", "Direct system", "Gonfle le gilet (moyenne pression).", "inf"],
        [254, "#16232e", "Manomètre", "Indique l’air qui reste dans le bloc (haute pression).", "gauge"]
      ];
      const draw = (k, y, col) => k === "reg" ? `<circle cx="292" cy="${y}" r="17" fill="${col}" stroke="#0b141b" stroke-width="2"/><rect x="270" y="${y - 6}" width="12" height="12" rx="3" fill="#33444f"/><circle cx="296" cy="${y}" r="7" fill="none" stroke="${col === "#F2C230" ? "#7a5c00" : "#4c6070"}" stroke-width="2"/>`
        : k === "inf" ? `<rect x="276" y="${y - 12}" width="30" height="24" rx="6" fill="${col}" stroke="#4c6070" stroke-width="2"/><circle cx="286" cy="${y}" r="4" class="d-pri"/><circle cx="298" cy="${y}" r="4" class="d-acc"/>`
        : `<circle cx="292" cy="${y}" r="18" fill="#f4f7f9" stroke="#16232e" stroke-width="4"/><path d="M292 ${y}l-9 -9" stroke="#c4302b" stroke-width="3" stroke-linecap="round" class="eq-needle"/><path d="M279 ${y + 9}a16 16 0 0 1 -3 -6" stroke="#c4302b" stroke-width="3" fill="none"/>`;
      const hose = (y, col, i) => `<path d="M104 46C180 46 190 ${y} 270 ${y}" fill="none" stroke="${col === "#F2C230" ? "#d9a800" : "#2b3a46"}" stroke-width="${i === 3 ? 4 : 6}" stroke-linecap="round"/>
        <path class="eq-flow" style="animation-delay:-${i * .4}s" d="M104 46C180 46 190 ${y} 270 ${y}" fill="none" stroke="var(--primary)" stroke-width="2" stroke-dasharray="3 12" stroke-linecap="round"/>`;
      return `<figure class="diagram tu-art"><svg viewBox="0 0 620 300" role="img" aria-label="Le détendeur : premier étage sur le bloc et quatre flexibles">
        <rect x="40" y="70" width="64" height="216" rx="30" class="d-soft" stroke="var(--line)" stroke-width="2"/><text x="72" y="190" class="d-strong" text-anchor="middle">Bloc</text><text x="72" y="208" class="d-text" text-anchor="middle">200 bar</text>
        <rect x="62" y="50" width="20" height="22" rx="3" fill="#8a96a0"/><circle cx="72" cy="56" r="9" fill="none" stroke="#c4302b" stroke-width="4"/>
        <rect x="56" y="28" width="48" height="30" rx="8" fill="#b8c2ca" stroke="#5d6b75" stroke-width="2"/><text x="80" y="18" class="d-strong" text-anchor="middle">1er étage</text>
        ${items.map(([y, col], i) => hose(y, col, i)).join("")}
        ${items.map(([y, col, t, s, k]) => `${draw(k, y, col)}<text x="322" y="${y - 4}" class="d-strong">${esc(t)}</text>${wrapText(322, y + 13, s, 30)}`).join("")}
      </svg><figcaption>Le premier étage, vissé sur le robinet du bloc, fait baisser la pression ; quatre flexibles en partent. L’octopus est jaune pour qu’on le trouve tout de suite : c’est celui que tu donnes à ton équipier.</figcaption></figure>`;
    },

    "eq-gilet": () => `<figure class="diagram tu-art"><svg viewBox="0 0 700 320" role="img" aria-label="Le gilet stabilisateur et ses commandes"><g transform="translate(110 0)">
      <g class="eq-vest"><path d="M190 40c20-20 70-20 90 0l14 40c10 30 12 80 6 140-2 30-20 50-60 52-40-2-58-22-60-52-6-60-4-110 6-140z" fill="#21485e" stroke="#0f2a38" stroke-width="3"/>
        <path d="M206 60c10-12 48-12 58 0l8 28c6 30 6 80 2 120-2 22-16 34-39 35-23-1-37-13-39-35-4-40-4-90 2-120z" fill="#2b5d78"/></g>
      <rect x="196" y="150" width="34" height="34" rx="6" fill="#16232e"/><rect x="240" y="150" width="34" height="34" rx="6" fill="#16232e"/>
      <rect x="200" y="196" width="70" height="10" rx="4" fill="#0f2a38"/>
      <path d="M200 52c-30 10-40 40-36 80" fill="none" stroke="#16232e" stroke-width="7" stroke-linecap="round"/><rect x="152" y="128" width="26" height="34" rx="6" fill="#16232e"/><circle cx="160" cy="140" r="4" class="d-pri"/><circle cx="170" cy="152" r="4" class="d-acc"/>
      <circle cx="274" cy="50" r="7" class="d-acc"/><circle cx="246" cy="254" r="7" class="d-acc"/></g>
      <g class="t-lab">
        <path d="M262 145H160" class="s-line" stroke-width="1.5"/><text x="8" y="128" class="d-strong">Direct system</text><text x="8" y="144" class="d-text">bleu : gonfler</text><text x="8" y="158" class="d-text">rouge : purger</text>
        <path d="M391 50H440" class="s-line" stroke-width="1.5"/><text x="446" y="46" class="d-strong">Purge rapide (haute)</text><text x="446" y="62" class="d-text">on tire : l’air sort en haut</text>
        <path d="M363 254H440" class="s-line" stroke-width="1.5"/><text x="446" y="250" class="d-strong">Purge basse</text><text x="446" y="266" class="d-text">tête en bas : vider le gilet</text>
        <path d="M384 168H440" class="s-line" stroke-width="1.5"/><text x="446" y="164" class="d-strong">Poches à lest largables</text><text x="446" y="180" class="d-text">se lâchent d’une main</text>
        <path d="M380 201H440" class="s-line" stroke-width="1.5"/><text x="446" y="212" class="d-strong">Sangle ventrale</text>
        <path d="M316 80H190" class="s-line" stroke-width="1.5"/><text x="8" y="76" class="d-strong">Sangles d’épaules</text><text x="8" y="92" class="d-text">bloc fixé dans le dos</text>
      </g></svg><figcaption>Le gilet stabilisateur : on le gonfle par petites touches avec le direct system, on le vide par une purge placée au point le plus haut. Les poches à lest se lâchent d’une main en cas de besoin.</figcaption></figure>`,

    "eq-manometre": () => {
      const P = (v, r) => { const a = (-120 + 240 * v / 300) * Math.PI / 180; return [(130 + r * Math.sin(a)).toFixed(1), (130 - r * Math.cos(a)).toFixed(1)]; };
      const arc = (v0, v1, r) => { const [x0, y0] = P(v0, r), [x1, y1] = P(v1, r); return `M${x0} ${y0}A${r} ${r} 0 ${v1 - v0 > 150 ? 1 : 0} 1 ${x1} ${y1}`; };
      const ticks = [0, 50, 100, 150, 200, 250, 300].map(v => { const [a, b] = P(v, 92), [c, d] = P(v, 80), [tx, ty] = P(v, 66); return `<path d="M${a} ${b}L${c} ${d}" stroke="#16232e" stroke-width="3"/><text x="${tx}" y="${(+ty + 5).toFixed(1)}" class="eq-gt" text-anchor="middle">${v}</text>`; }).join("");
      return `<figure class="diagram tu-art"><svg viewBox="0 0 560 270" role="img" aria-label="Manomètre : de 200 bar à la réserve">
        <circle cx="130" cy="130" r="112" fill="#16232e"/><circle cx="130" cy="130" r="100" fill="#f4f7f9"/>
        <path d="${arc(0, 50, 92)}" stroke="#d6402b" stroke-width="12" fill="none"/><path d="${arc(50, 100, 92)}" stroke="#f2b632" stroke-width="12" fill="none"/>
        ${ticks}<text x="130" y="190" class="eq-gt" text-anchor="middle">bar</text>
        <g class="eq-gneedle"><path d="M130 130L130 46" stroke="#16232e" stroke-width="5" stroke-linecap="round"/></g><circle cx="130" cy="130" r="9" fill="#16232e"/>
        <text x="270" y="60" class="d-strong">Au départ : bloc plein</text><text x="270" y="78" class="d-text">souvent 200 bar ou plus</text>
        <text x="270" y="122" class="d-strong t-gold">Zone jaune</text><text x="270" y="140" class="d-text">on prévoit le retour, on prévient</text>
        <text x="270" y="184" class="d-strong t-acc">Zone rouge : la réserve</text><text x="270" y="202" class="d-text">souvent 50 bar : signe « réserve »,</text><text x="270" y="218" class="d-text">on remonte en gardant cette marge</text>
      </svg><figcaption>Regarde ton manomètre souvent et annonce ta pression à ton guide. Les seuils exacts (retour, réserve) se fixent au briefing.</figcaption></figure>`;
    },

    "faune-med": () => {
      const sp = [
        ["grouper", ["#6B4E32", "#E8D8B0", "#4E3622"], "Mérou brun", "Protégé. Curieux, il vit plus de 50 ans.", "Protégé"],
        ["scorpion", ["#B7472A", "#6E2A1A", "#D9785C"], "Rascasse", "Camouflée sur la roche : épines venimeuses.", "Ne pas toucher"],
        ["octopus", ["#C0704E", "#8E4630", "#C0704E"], "Poulpe", "Change de couleur en un instant, trois cœurs.", ""],
        ["moray", ["#6B4A2E", "#F0D27A", "#4A3220"], "Murène", "Ouvre la bouche pour respirer. Doigts loin de son trou.", "Peut mordre"],
        ["jelly", ["#D58FD0", "#F2B8EE", "#FFE2FB"], "Pélagie", "Méduse fréquente certains étés.", "Urticante"],
        ["ray", ["#B89A6A", "#3A2A1A", "#8C7450"], "Raie torpille", "Posée sur le sable, elle peut envoyer une décharge.", "Électrique"],
        ["seahorse", ["#D9A441", "#9C6B1E", "#F2D38A"], "Hippocampe", "Le mâle porte les œufs. Accroché aux herbiers.", "Fragile"],
        ["wrasse", ["#2FA37A", "#3A6FD8", "#F07A3A"], "Girelle paon", "Très colorée, elle dort enfouie dans le sable.", ""]
      ];
      const art = (s, c) => AA.creature ? AA.creature(s, c, "fa-art") : "";
      const posi = `<svg class="creature fa-art" viewBox="0 0 120 80" aria-hidden="true">${[20, 34, 48, 62, 76, 90].map((x, i) => `<path class="fa-leaf" style="animation-delay:-${i * .4}s" d="M${x} 80c0-30 ${i % 2 ? 6 : -6}-50 ${i % 2 ? 10 : -4}-70" stroke="#3f8f4a" stroke-width="7" fill="none" stroke-linecap="round"/>`).join("")}<path d="M10 80h100" stroke="#6b5a3a" stroke-width="6"/></svg>`;
      return `<figure class="diagram tu-art"><div class="fa-grid">
        <div class="fa-card">${posi}<b>Posidonie</b><span>Plante à fleurs (pas une algue) : herbier qui abrite la vie et protège les plages.</span><em class="chip xs warn">Protégée : pas d’ancre</em></div>
        ${sp.map(([s, c, n, f, tag]) => `<div class="fa-card">${art(s, c)}<b>${esc(n)}</b><span>${esc(f)}</span>${tag ? `<em class="chip xs ${/Protégé|Fragile/.test(tag) ? "ok" : "warn"}">${esc(tag)}</em>` : ""}</div>`).join("")}
      </div><figcaption>Quelques rencontres en Méditerranée. On regarde, on ne touche pas, on ne nourrit pas : on reste stable au-dessus du fond.</figcaption></figure>`;
    }
  });
  /* Texte sur plusieurs lignes dans un SVG. */
  function wrapText(x, y, s, n) {
    const L = []; let cur = ""; String(s).split(" ").forEach(w => { if ((cur + " " + w).trim().length > n && cur) { L.push(cur.trim()); cur = w; } else cur += " " + w; }); if (cur.trim()) L.push(cur.trim());
    return `<text x="${x}" y="${y}" class="d-text">${L.map((l, i) => `<tspan x="${x}" dy="${i ? 15 : 0}">${esc(l)}</tspan>`).join("")}</text>`;
  }

  /* Rattachement aux cours (à la fin de l'Essentiel). */
  const add = (id, title, d) => C.extend(id, { essentiel: `<h3>${title}</h3><div data-diagram="${d}"></div>` });
  add("n1-signes", "Les signes, en mouvement", "signes-anim");
  add("d-materiel", "Le détendeur et ses flexibles", "eq-detendeur");
  add("materiel", "Le détendeur et ses flexibles", "eq-detendeur");
  add("materiel", "Le gilet stabilisateur", "eq-gilet");
  add("materiel", "Lire son manomètre", "eq-manometre");
  add("pa20", "Surveiller son air", "eq-manometre");
  add("n1-milieu", "Qui vas-tu croiser ?", "faune-med");
  add("environnement", "Faune et flore en images", "faune-med");
})();
