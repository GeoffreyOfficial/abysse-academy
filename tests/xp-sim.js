/* Simulation du barème XP 2.0 (node tests/xp-sim.js table). Doit rester alignée sur G.needFor et les gains de game.js / v20.js. */
/* Simulation d'un élève « sans brevet → E2 » avec le barème XP 2.0.
   Usage : node xpsim.js [minutes par jour] [jours actifs par semaine] */
const WORLDS = [["decouverte", 3, 23], ["n1", 5, 40], ["n2", 11, 174], ["rifap", 5, 40], ["nitrox", 3, 31], ["n3", 7, 70], ["e1", 6, 41], ["n4", 6, 46], ["e2", 3, 31]];
const XP = { newOk: 10, spaced: 7, recent: 4, same: 1, combo: 2, read: 25, eclair: 15, notion: 15, master: 25, gap: 30, examPass: 150, examDay: 30, session: 20, streak: [10, 20, 30], modDay: 15, palier: 25, examQ: 5 };
const INT = [0, 1, 3, 7, 16, 35, 70];
function sim(M, daysPerWeek, maxDays, needFn) {
  let rnd = 7; const R = () => ((rnd = (rnd * 16807) % 2147483647) / 2147483647);
  const mods = []; WORLDS.forEach(([w, nm, nq]) => { for (let i = 0; i < nm; i++) { const n = Math.round(nq / nm) ; mods.push({ w, qs: Array.from({ length: n }, () => ({ box: 0, due: 0, okEver: false, last: -99 })), read: false, pal: 0 }); } });
  const worldsDone = new Set(), passed = new Set(); let allReadDay = -1, allPassDay = -1, masDay = -1; let xp = 0, streak = 0, day = 0, log = [], nWon = new Set(), nMas = new Set(), lastExam = -99;
  const acc = q => q.okEver ? Math.min(.97, .8 + q.box * .04) : .68;
  const answer = (q, d, mod, exam) => {
    const ok = R() < acc(q);
    if (ok) {
      const gap = d - q.last; xp += exam ? XP.examQ : !q.okEver ? XP.newOk : gap >= 3 ? XP.spaced : gap >= 1 ? XP.recent : XP.same;
      q.okEver = true; q.box = Math.min(6, q.box + 1); q.due = d + INT[q.box];
    } else { q.box = 0; q.due = d + 1; }
    q.last = d; return ok;
  };
  const notionCheck = () => mods.forEach((m, mi) => { for (let k = 0; k < m.qs.length; k += 4) { const g = m.qs.slice(k, k + 4), id = mi + ":" + k;
    if (!nWon.has(id) && g.every(q => q.box >= 2)) { nWon.add(id); xp += XP.notion; }
    if (!nMas.has(id) && g.every(q => q.box >= 4)) { nMas.add(id); xp += XP.master; } } });
  var total = mods.reduce((a, m) => a + m.qs.length, 0);
  for (day = 0; day < maxDays; day++) {
    if (day % 7 >= daysPerWeek) { streak = 0; log.push(xp); continue; }
    let t = M, ans = 0; streak++;
    const readMods = mods.filter(m => m.read);
    // séance du tuteur : révisions dues d'abord
    const due = []; readMods.forEach(m => m.qs.forEach(q => { if (q.due <= day && q.last >= 0) due.push([q, m]); }));
    due.sort((a, b) => a[0].due - b[0].due);
    let sess = 0; while (t >= 1 && due.length && sess < (mods.some(m => !m.read) ? Math.max(8, M * .4) : M)) { const [q, m] = due.shift(); answer(q, day, m); t--; ans++; sess++; }
    if (sess >= 8) xp += XP.session;
    // lire + quiz
    while (t >= 1) {
      const next = mods.find(m => !m.read); if (!next) break;
      next.prog = (next.prog || 0) + t; if (next.prog < 12) { t = 0; break; } t = next.prog - 12;
      next.read = true; xp += XP.read;
      let good = 0; next.qs.slice(0, 3).forEach(q => { if (answer(q, day, next)) good++; }); t -= 3; ans += 3; if (good === 3) xp += XP.eclair;
      let g2 = 0; next.qs.forEach(q => { if (answer(q, day, next)) g2++; t -= 1; ans++; }); t = Math.max(0, t);
      const pct = g2 / next.qs.length; const pal = pct >= 1 ? 3 : pct >= .8 ? 2 : pct >= .5 ? 1 : 0; if (pal > next.pal) { xp += (pal - next.pal) * XP.palier; next.pal = pal; } if (pct >= .6) xp += XP.modDay;
    }
    // examen blanc quand un monde est entièrement lu
    WORLDS.forEach(([w]) => { const ms = mods.filter(m => m.w === w); if (ms.every(m => m.read) && !passed.has(w) && t >= 0 && day - lastExam >= 3) {
      const qs = ms.flatMap(m => m.qs); let g = 0; for (let i = 0; i < Math.min(40, qs.length); i++) { if (answer(qs[Math.floor(R() * qs.length)], day, null, true)) g++; }
      t -= 40; ans += 40; lastExam = day; xp += XP.examDay; if (g / Math.min(40, qs.length) >= .75) { passed.add(w); xp += XP.examPass; } } });
    // révisions libres avec le temps restant (questions les plus anciennes)
    const pool = readMods.flatMap(m => m.qs).sort((a, b) => a.last - b.last); let k = 0; while (t >= 1 && k < pool.length && !mods.some(m => !m.read)) { answer(pool[k++], day, null); t--; ans++; }
    if (ans >= 10) xp += streak >= 30 ? XP.streak[2] : streak >= 7 ? XP.streak[1] : XP.streak[0];
    notionCheck(); log.push(xp); if (allReadDay < 0 && mods.every(m => m.read)) allReadDay = day + 1; if (allPassDay < 0 && passed.size === WORLDS.length) allPassDay = day + 1; if (masDay < 0 && nMas.size >= .9 * Math.ceil(total / 4)) masDay = day + 1;
  }
  const allRead = log.findIndex((_, d) => false);
  return { allReadDay, allPassDay, masDay, log, mods, passed, nWon: nWon.size, nMas: nMas.size, total };
}
module.exports = { sim, XP };
const needFor = l => Math.round((100 + 40 * (l - 1) + (+process.env.K || 1.5) * (l - 1) * (l - 1)) / 10) * 10;
const levelOf = xp => { let l = 1, base = 0; while (xp >= base + needFor(l)) { base += needFor(l); l++; } return l; };
const xpFor = L => { let x = 0; for (let l = 1; l < L; l++) x += needFor(l); return x; };
module.exports.levelOf = levelOf; module.exports.xpFor = xpFor;
if (require.main === module) {
  if (process.argv[2] === "table") {
    const paces = [[10, 7], [20, 7], [40, 7], [20, 4]], runs = paces.map(([m, d]) => sim(m, d, 1460));
    console.log("Niveau | XP total | " + paces.map(([m, d]) => m + " min × " + d + " j/sem").join(" | "));
    const fmt = d => d < 0 ? "> 4 ans" : d < 60 ? d + " j" : d < 730 ? (d / 30.4).toFixed(1).replace(".", ",") + " mois" : (d / 365).toFixed(1).replace(".", ",") + " ans";
    [2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].forEach(L => console.log(L + " | " + xpFor(L) + " | " + runs.map(r => fmt(r.log.findIndex(x => x >= xpFor(L)) + (r.log.findIndex(x => x >= xpFor(L)) < 0 ? 0 : 1))).join(" | ")));
    runs.forEach((r, i) => console.log(paces[i].join("/"), "tout lu j", r.allReadDay, "examens j", r.allPassDay, "90 % maîtrisé j", r.masDay, "niveau à ce moment", levelOf(r.log[r.masDay - 1] || 0), "niveau à 1 an", levelOf(r.log[364])));
    process.exit(0);
  }

  const M = +process.argv[2] || 20, dpw = +process.argv[3] || 7, r = sim(M, dpw, 730);
  [1, 7, 14, 30, 60, 90, 120, 180, 240, 365, 540, 730].forEach(d => console.log("jour", d, "XP", r.log[d - 1]));
  console.log("tout lu j", r.allReadDay, "tous examens j", r.allPassDay, "90% notions maîtrisées j", r.masDay); console.log("notions", r.nWon, r.nMas, "examens", [...r.passed].join(","));
}
