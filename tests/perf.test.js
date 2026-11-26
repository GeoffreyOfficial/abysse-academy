#!/usr/bin/env node
/* =====================================================================
   Abysse Academy · fluidité
   Images par seconde pendant les transitions, la carte, le simulateur
   et un quiz enchaîné, sur un téléphone moyen simulé (processeur ×4 plus
   lent) et sur PC. Signale toute image de plus de 50 ms.
   node tests/perf.test.js
   ===================================================================== */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("@playwright/test")); }
const ROOT = path.resolve(__dirname, ".."), PORT = 8794, URL = `http://localhost:${PORT}/`;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(ROOT, p); if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
const startMeter = p => p.evaluate(() => { window.__fr = []; let last = performance.now(); const tick = t => { window.__fr.push(t - last); last = t; if (window.__fr.length < 100000 && !window.__stop) requestAnimationFrame(tick); }; window.__stop = false; requestAnimationFrame(tick); });
const stopMeter = p => p.evaluate(() => { window.__stop = true; const f = window.__fr.slice(2), tot = f.reduce((a, b) => a + b, 0); return { fps: Math.round(f.length / (tot / 1000)), worst: Math.round(Math.max(0, ...f)), janky: f.filter(x => x > 50).length, frames: f.length }; });

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const b = await chromium.launch(); const rows = [];
  try {
    for (const [label, w, h, slow] of (process.env.PCONLY ? [["PC 1440p", 2560, 1440, 1]] : [["téléphone (CPU ×4 plus lent)", 390, 844, 4], ["PC 1440p", 2560, 1440, 1]])) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage(); if (process.env.NOSCENE) await p.addInitScript(() => (window.__noScene = 1)); if (process.env.PERFCSS) await p.addInitScript(css => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s); }), process.env.PERFCSS);
      await p.goto(URL); await p.waitForFunction(() => window.AA && AA.router && AA.router.name);
      await p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Perf"; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; S.unlockAll = true; S.xp = 3000; if (window.__noScene) S.profile.scene = false; AA.store.save(); });
      await p.reload(); await p.waitForFunction(() => document.documentElement.classList.contains("ready")); await p.waitForTimeout(500);
      const cdp = await ctx.newCDPSession(p); if (slow > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: slow });
      const run = async (name, fn) => { await startMeter(p); await fn(); const r = await stopMeter(p); rows.push(Object.assign({ device: label, name }, r)); };
      await run("onglets enchaînés", async () => { for (const r of ["home", "map/n2", "train", "lab", "profile", "home", "map/n3", "quests"]) { await p.evaluate(r => (location.hash = "#/" + r), r); await p.waitForTimeout(450); } });
      await run("carte : changer de niveau", async () => { await p.evaluate(() => (location.hash = "#/map/n2")); await p.waitForTimeout(600); for (const x of ["n3", "n4", "n1", "n2", "rifap"]) { await p.evaluate(x => { const c = document.querySelector(`[data-w="${x}"], .wchip[data-wid="${x}"]`); c ? c.click() : (location.hash = "#/map/" + x); }, x); await p.waitForTimeout(500); } });
      await run("carte : défilement", async () => { await p.evaluate(() => (location.hash = "#/map/n2")); await p.waitForTimeout(500); for (let i = 0; i < 12; i++) { await p.mouse.wheel(0, 260); await p.waitForTimeout(80); } for (let i = 0; i < 12; i++) { await p.mouse.wheel(0, -260); await p.waitForTimeout(80); } });
      await run("cours : défilement et schémas animés", async () => { await p.evaluate(() => (location.hash = "#/lesson/n3-deco/essentiel")); await p.waitForTimeout(500); for (let i = 0; i < 16; i++) { await p.mouse.wheel(0, 300); await p.waitForTimeout(70); } });
      await run("quiz : 8 réponses", async () => { await p.evaluate(() => AA.quiz.module(AA.content.byId.pression)); await p.waitForTimeout(400); for (let i = 0; i < 8; i++) { const c = await p.$(".choice:not([disabled])"); if (c) await c.click(); await p.waitForTimeout(250); const n = await p.$("#nextq"); if (n) await n.click(); await p.waitForTimeout(250); } });
      await run("simulateur en marche", async () => { await p.evaluate(() => (location.hash = "#/sim")); await p.waitForTimeout(400); const s = await p.$("#spp"); if (s) await s.click().catch(() => {}); await p.waitForTimeout(2500); });
      await run("panneaux : ouvrir et fermer", async () => { await p.evaluate(() => (location.hash = "#/home")); await p.waitForTimeout(400); for (let i = 0; i < 4; i++) { await p.click("button.pill.fire").catch(() => {}); await p.waitForTimeout(300); await p.keyboard.press("Escape"); await p.waitForTimeout(200); } });
      await ctx.close();
    }
  } finally { await b.close(); server.close(); }
  rows.forEach(r => console.log(`${r.fps < 45 || r.janky > 2 ? "  ⚠" : "  ✓"} ${r.device} · ${r.name} : ${r.fps} images/s, pire image ${r.worst} ms, ${r.janky} saccade(s)`));
})().catch(e => { console.error(e); server.close(); process.exit(1); });
