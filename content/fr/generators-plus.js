/* Abysse Academy · contenu FR · Calculs dynamiques des nouveaux niveaux
   Chaque générateur fabrique une question différente à chaque fois. */
(function () {
  const u = AA.u, G = AA.game, R = u.rand, PK = u.pick, N = u.num, M = (...a) => G.mkCalc(...a);
  AA.content.addGenerators({
    n1pabs: { m: "n1-physique", make: () => { const d = PK([5, 10, 15, 20]); return M(`Pression totale (absolue) à ${d} m en mer ?`, 1 + d / 10, [d / 10, 2 + d / 10, d], ` bar`, `1 bar d’air + ${d}/10 = ${N(d / 10)} bar d’eau → ${N(1 + d / 10)} bar.`, 1); } },
    n1vol: { m: "n1-physique", make: () => { const v = PK([2, 3, 4, 6]), d = PK([10, 20]); const p = 1 + d / 10, up = Math.random() < .5;
      return up ? M(`Un ballon de ${v} L à ${d} m remonte en surface. Son volume ?`, v * p, [v, v / p, v * d], ` L`, `À ${d} m : ${N(p)} bar. En surface : 1 bar. Pression ÷ ${N(p)} → volume × ${N(p)} : ${N(v * p)} L.`, 1)
        : M(`Un ballon de ${v} L en surface descend à ${d} m. Son volume ?`, v / p, [v * p, v, v / 2 + 1], ` L`, `La pression est multipliée par ${N(p)} → le volume est divisé par ${N(p)} : ${N(v / p)} L.`); } },
    n3narc: { m: "n3-gaz", make: () => { const d = R(6, 12) * 5; const p = 1 + d / 10; return M(`Pp N₂ de l’air à ${d} m ?`, p * .79, [d / 10 * .79, p * .21, p], ` bar`, `P abs = 1 + ${d}/10 = ${N(p)} bar. Pp N₂ = ${N(p)} × 0,79 = ${N(p * .79)} bar.`); } },
    n3ppo2: { m: "n3-gaz", make: () => { const d = R(6, 12) * 5; const p = 1 + d / 10; return M(`Pp O₂ de l’air à ${d} m ?`, p * .21, [d / 10 * .21, p * .79, 1.6], ` bar`, `P abs = ${N(p)} bar. Pp O₂ = ${N(p)} × 0,21 = ${N(p * .21)} bar${p * .21 > 1.4 ? " : proche de la limite !" : "."}`); } },
    n3air: { m: "n3-autonomie", make: () => { const V = PK([12, 15, 18]), c = PK([15, 18, 20, 25]), d = PK([30, 40, 45, 50, 55]); const p = 1 + d / 10, b = c * p / V;
      return M(`Bloc ${V} L, conso ${c} L/min en surface, à ${d} m. Combien de bar par minute environ ?`, b, [c / V, c * d / 10 / V, b * 2], ` bar/min`, `Conso au fond = ${c} × ${N(p)} = ${N(c * p)} L/min. ÷ ${V} L = ${N(b, 1)} bar par minute.`, 1); } },
    n4pal: { m: "n4-air", make: () => { const V = PK([12, 15]), d = PK([20, 25, 30, 35, 40]), c1 = PK([15, 18]), c2 = PK([22, 25, 28]), P0 = 200, Pr = PK([70, 80, 100]); const p = 1 + d / 10, t = Math.floor((P0 - Pr) * V / (c2 * p));
      return M(`Palanquée à ${d} m, blocs ${V} L à ${P0} bar. Plongeur A : ${c1} L/min en surface, plongeur B : ${c2} L/min. Remontée prévue à ${Pr} bar. Au bout de combien de minutes au fond environ ?`, t, [Math.floor((P0 - Pr) * V / (c1 * p)), Math.floor((P0 - Pr) * V / (c2 * d / 10)), Math.floor(P0 * V / (c2 * p))], ` min`, `On se règle sur le plus gros consommateur (B). Air utilisable = (${P0} − ${Pr}) × ${V} = ${(P0 - Pr) * V} L. Conso de B au fond = ${c2} × ${N(p)} = ${N(c2 * p)} L/min. ${(P0 - Pr) * V} ÷ ${N(c2 * p)} ≈ ${t} min.`, 0); } },
    nxmod: { m: "nx-base", make: () => { const o = PK([28, 30, 32, 34, 36, 40]), lim = PK([1.4, 1.6]); const d = (lim / (o / 100) - 1) * 10;
      return M(`Profondeur maximale (MOD) d’un nitrox ${o} % avec une Pp O₂ max de ${N(lim)} bar ?`, Math.floor(d), [Math.floor(lim / (o / 100) * 10), Math.floor((1.6 / .21 - 1) * 10), Math.floor(d) + 5], ` m`, `${N(lim)} ÷ ${N(o / 100)} = ${N(lim / (o / 100))} bar absolu. − 1 bar d’air = ${N(lim / (o / 100) - 1)} bar d’eau. × 10 ≈ ${Math.floor(d)} m (on arrondit vers le bas).`, 0); } },
    nxead: { m: "nx-base", make: () => { const o = PK([32, 36]), d = PK([20, 25, 30]); const p = 1 + d / 10, e = (p * (1 - o / 100) / .79 - 1) * 10;
      return M(`Profondeur équivalente air (EAD) d’un nitrox ${o} % à ${d} m ?`, Math.round(e), [d, Math.round(e) + 6, Math.round(d * o / 100)], ` m`, `P abs = ${N(p)} bar. Azote du mélange = ${N(p)} × ${N(1 - o / 100)} = ${N(p * (1 - o / 100))} bar. Même azote à l’air : ÷ 0,79 = ${N(p * (1 - o / 100) / .79)} bar absolu → (${N(p * (1 - o / 100) / .79)} − 1) × 10 ≈ ${Math.round(e)} m.`, 0); } },
    nxbest: { m: "nx-securite", make: () => { const d = PK([20, 25, 30, 35, 40]), lim = PK([1.4, 1.6]); const p = 1 + d / 10, o = Math.floor(lim / p * 100);
      return M(`Plongée prévue à ${d} m, Pp O₂ max ${N(lim)} bar. Pourcentage d’O₂ maximal du mélange ?`, o, [Math.floor(lim / (d / 10) * 100), 21, o + 6], ` %`, `${N(lim)} ÷ ${N(p)} = ${N(lim / p, 3)} → ${o} % au maximum (on arrondit vers le bas).`, 0); } }
  });
})();
