/* Abysse Academy · contenu FR · Calculs générés
   Chaque générateur fabrique une question aux chiffres toujours nouveaux.
   m = module lié (le calcul n’est proposé que si ce module est ouvert).
   M(question, bonne réponse, [leurres], unité, explication, décimales). */
(function () {
  const u = AA.u, G = AA.game, R = u.rand, PK = u.pick, N = u.num, M = G.mkCalc;
  /* Profondeurs des lignes de la table MN90, utilisées seulement pour la méthode « ligne immédiatement supérieure ». À vérifier sur ta table. */
  const MN90_DEPTHS = [6,8,10,12,15,18,20,22,25,28,30,32,35,38,40,42,45,48,50,52,55,58,60];
  AA.content.addGenerators({
  pabs: { m: "pression", make: () => {const d=R(3,45);return M(`Pression absolue à ${d} m en mer ?`,1+d/10,[d/10,d/10+2,1+d],` bar`,`P abs = 1 + ${d}/10 = ${N(1+d/10)} bar.`);} },
  prof: { m: "pression", make: () => {const p=R(15,55)/10;const d=(p-1)*10;return M(`À quelle profondeur la pression absolue vaut-elle ${N(p)} bar en mer ?`,d,[p*10,d+10,d-5],` m`,`${N(p)} − 1 = ${N(p-1)} bar d’eau → ${N(d)} m.`,0);} },
  alti: { m: "pression", make: () => {const pa=PK([0.9,0.85,0.8,0.75]),d=R(1,4)*5;return M(`Lac en altitude, P atm = ${N(pa)} bar. Pression absolue à ${d} m (1 bar/10 m) ?`,pa+d/10,[1+d/10,d/10,pa*d/10],` bar`,`${N(pa)} + ${d}/10 = ${N(pa+d/10)} bar.`);} },
  ballon: { m: "mariotte", make: () => {const v=R(2,10),d=PK([10,20,30,40]);const p=1+d/10;return M(`Un ballon de ${v} L à ${d} m remonte en surface. Son volume ?`,v*p,[v*d/10,v/p,v*(p+1)],` L`,`${N(p)} × ${v} = 1 × V → V = ${N(v*p)} L.`);} },
  descente: { m: "mariotte", make: () => {const v=R(4,12),d=PK([10,20,30,40]);const p=1+d/10;return M(`Un ballon de ${v} L en surface est descendu à ${d} m. Son volume ?`,v/p,[v*p,v/(d/10),v/2],` L`,`1 × ${v} = ${N(p)} × V → V = ${N(v/p)} L.`);} },
  conso: { m: "mariotte", make: () => {const c=PK([15,18,20,22,25]),d=R(1,8)*5;const p=1+d/10;return M(`Tu consommes ${c} L/min en surface. Combien à ${d} m ?`,c*p,[c*d/10,c+d,c*(p+1)],` L/min`,`${c} × ${N(p)} = ${N(c*p)} L/min.`,1);} },
  autonomie: { m: "mariotte", make: () => {const V=PK([10,12,15]),P=PK([200,210,230]),Rv=50,c=PK([15,20,25]),d=PK([10,15,20,25,30]);const p=1+d/10,air=V*(P-Rv),t=air/(c*p);
  return M(`Bloc ${V} L à ${P} bar, réserve ${Rv} bar, conso ${c} L/min en surface. Autonomie à ${d} m ?`,Math.floor(t),[Math.floor(V*P/(c*p)),Math.floor(air/(c*d/10)),Math.floor(air/c)],` min`,`(${P} − ${Rv}) × ${V} = ${air} L. Conso au fond = ${c} × ${N(p)} = ${N(c*p)} L/min. ${air} / ${N(c*p)} ≈ ${N(t,1)} min (on arrondit en dessous).`,0);} },
  pression_bloc: { m: "mariotte", make: () => {const V=PK([10,12,15]),c=PK([15,20]),d=PK([10,20,30]),t=R(2,5)*5;const used=c*(1+d/10)*t/V;
  return M(`Bloc ${V} L. Tu restes ${t} min à ${d} m en consommant ${c} L/min en surface. Combien de bar consommés ?`,Math.round(used),[Math.round(c*t/V),Math.round(c*(d/10)*t/V),Math.round(used*V/10)],` bar`,`Air = ${c} × ${N(1+d/10)} × ${t} = ${N(c*(1+d/10)*t,0)} L → ÷ ${V} L ≈ ${Math.round(used)} bar.`,0);} },
  lest: { m: "archimede", make: () => {const m=R(75,100),v=m+R(2,7),sea=Math.random()<.6;const rho=sea?1.03:1;const need=v*rho-m;
  return M(`Plongeur équipé : ${m} kg pour ${v} L, en ${sea?"mer (densité 1,03)":"eau douce"}. Lest nécessaire pour être équilibré ?`,need,[v-m+(sea?0:2),need+3,(v*1.03-m)+(sea?2:0)],` kg`,`Poussée = ${v} × ${N(rho)} = ${N(v*rho)} kg. ${m} − ${N(v*rho)} = ${N(m-v*rho)} kg → lest ≈ ${N(need,1)} kg.`,1);} },
  relevage: { m: "archimede", make: () => {const m=R(20,60),v=R(5,15);const pa=m-v*1.03;return M(`Objet de ${m} kg et ${v} L en mer. Volume d’air à mettre dans le parachute au fond pour l’équilibrer (≈ 1 L d’air = 1,03 kg de poussée) ?`,pa/1.03,[m/1.03,m-v,pa*1.5],` L`,`Poids apparent = ${m} − ${v} × 1,03 = ${N(pa)} kg → ≈ ${N(pa/1.03,1)} L d’air.`,1);} },
  ppo2: { m: "dalton", make: () => {const d=R(1,9)*5,o=PK([21,32,36]);const p=1+d/10;return M(`Pp O₂ à ${d} m avec un mélange à ${o} % d’O₂ ?`,p*o/100,[d/10*o/100,p*(1-o/100),o/100],` bar`,`${N(p)} × ${N(o/100)} = ${N(p*o/100)} bar.`);} },
  ppn2: { m: "dalton", make: () => {const d=R(2,8)*5;const p=1+d/10;return M(`Pp N₂ de l’air à ${d} m ?`,p*.79,[d/10*.79,p*.21,p],` bar`,`${N(p)} × 0,79 = ${N(p*.79)} bar.`);} },
  maxo2: { m: "dalton", make: () => {const o=PK([21,28,32,36,40]),lim=PK([1.6,1.4]);const d=(lim/(o/100)-1)*10;return M(`Profondeur maximale pour une Pp O₂ de ${N(lim)} bar avec ${o} % d’O₂ ?`,Math.floor(d),[Math.floor(lim/(o/100)*10),Math.floor(d)+10,Math.floor((lim*(o/100))*100)],` m`,`P abs max = ${N(lim)} / ${N(o/100)} = ${N(lim/(o/100))} bar → (${N(lim/(o/100))} − 1) × 10 ≈ ${N(d,1)} m.`,0);} },
  co: { m: "dalton", make: () => {const d=R(2,6)*10,pc=PK([0.1,0.05,0.2]);const p=1+d/10;return M(`Air pollué à ${N(pc)} % de CO. À ${d} m, l’effet équivaut en surface à…`,pc*p,[pc,pc*d/10,pc*2],` %`,`Pp × ${N(p)} : ${N(pc)} % × ${N(p)} = ${N(pc*p)} % équivalent surface.`);} },
  ligne: { m: "deco", make: () => {let d;do{d=R(7,59)}while(MN90_DEPTHS.includes(d));const L=MN90_DEPTHS.find(x=>x>=d);const i=MN90_DEPTHS.indexOf(L);
  return M(`Profondeur maxi ${d} m. Quelle ligne de la table MN90 lis-tu ?`,L,[MN90_DEPTHS[i-1]||L-3,MN90_DEPTHS[i+1]||L+3,d],` m`,`On prend toujours la profondeur immédiatement supérieure : ${L} m. (Liste des profondeurs à vérifier sur ta table.)`,0);} },
  remontee: { m: "deco", make: () => {const d=PK([20,25,30,35,40]),p3=R(1,9),p6=d>=30?R(0,4):0;const first=p6?6:3;const t=(d-first)/15+(p6?p6+0.5:0)+p3+0.5;
  return M(`Remontée depuis ${d} m (MN90 : 15 m/min jusqu’au 1er palier, 6 m/min ensuite). La table t’indique ${p6?p6+" min à 6 m et ":""}${p3} min à 3 m. Durée totale de remontée (DTR) environ ?`,Math.round(t*2)/2,[Math.round((d/15+p3+p6)*2)/2,p3+p6,Math.round((d/6+p3+p6)*2)/2],` min`,`Fond → ${first} m : ${d-first}/15 ≈ ${N((d-first)/15,1)} min.${p6?` Palier 6 m : ${p6} min, puis 6 → 3 m : 0,5 min.`:""} Palier 3 m : ${p3} min. 3 m → surface : 0,5 min. Total ≈ ${N(t,1)} min.`,1);} },
  consec: { m: "deco", make: () => {const d1=R(3,6)*5,d2=R(2,5)*5,t1=R(2,5)*5,t2=R(2,5)*5,i=R(5,14);return M(`1re plongée ${d1} m / ${t1} min, intervalle ${i} min, 2e plongée ${d2} m / ${t2} min. Quelle durée retiens-tu pour la table ?`,t1+t2,[t2,Math.max(t1,t2),t1+t2+i],` min`,`Intervalle < 15 min : plongée consécutive. Profondeur = ${Math.max(d1,d2)} m, durée = ${t1} + ${t2} = ${t1+t2} min.`,0);}}
  });
})();
