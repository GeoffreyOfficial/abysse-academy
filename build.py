#!/usr/bin/env python3
"""Abysse Academy · construction

  python3 build.py

Produit, à partir de js/manifest.js :
  - index.html            la page de l'appli (fichiers séparés, pour GitHub Pages)
  - sw.js                 le service worker, avec la liste des fichiers à mettre en cache
  - dist/abysse-academy.html   la même appli en UN seul fichier (polices incluses),
                               à ouvrir hors ligne ou à publier comme artefact.
Aucune dépendance : Python 3 suffit.
"""
import base64, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent
man = (ROOT / "js/manifest.js").read_text(encoding="utf-8")
FILES = json.loads(re.search(r"var AA_FILES = (\{.*?\});", man, re.S).group(1)
                   .replace("css:", '"css":').replace("js:", '"js":'))
VERSION = re.search(r'AA\.VERSION = "([^"]+)"', (ROOT / "js/core/ns.js").read_text(encoding="utf-8")).group(1)

HEAD = """<!doctype html>
<html lang="fr" data-aa-theme="abysse">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Abysse Academy</title>
<meta name="description" content="Apprendre la plongée en jouant : cours, quiz, révisions espacées. N2, PA20, RIFAP, initiateur.">
<meta name="theme-color" content="#050E1A">
<meta name="color-scheme" content="dark light">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Abysse">
{links}
<script>/* Thème appliqué avant l'affichage pour éviter un flash de couleurs. */
try{{var s=JSON.parse(localStorage.getItem("abysse-academy")||"null");if(s&&s.profile&&s.profile.theme)document.documentElement.dataset.aaTheme=s.profile.theme;}}catch(e){{}}</script>
{styles}
</head>
<body>
<canvas id="bubbles" aria-hidden="true"></canvas>
<div class="shell">
  <header id="topbar" class="topbar"></header>
  <main id="view" tabindex="-1"></main>
</div>
<div id="tabbar" class="tabbar"></div>
<noscript><p style="padding:24px;font-family:sans-serif">Abysse Academy a besoin de JavaScript.</p></noscript>
{scripts}
</body>
</html>
"""

def write(rel, text):
    p = ROOT / rel; p.parent.mkdir(parents=True, exist_ok=True); p.write_text(text, encoding="utf-8"); return p

# 1. index.html (fichiers séparés, versionnés pour le cache du navigateur)
links = "\n".join([
    '<link rel="manifest" href="manifest.webmanifest">',
    '<link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32.png">',
    '<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">',
    '<link rel="preload" href="assets/fonts/Unbounded-80da0c63.woff2" as="font" type="font/woff2" crossorigin>',
    '<link rel="preload" href="assets/fonts/Figtree-dab710cf.woff2" as="font" type="font/woff2" crossorigin>'])
styles = "\n".join(f'<link rel="stylesheet" href="{c}?v={VERSION}">' for c in FILES["css"])
scripts = "\n".join(f'<script src="{j}?v={VERSION}"></script>' for j in FILES["js"])
write("index.html", HEAD.format(links=links, styles=styles, scripts=scripts))

# 2. sw.js
assets = ["./", "index.html", "manifest.webmanifest"] + [f"{f}?v={VERSION}" for f in FILES["css"] + FILES["js"]]
assets += sorted(str(p.relative_to(ROOT)) for p in (ROOT / "assets").rglob("*") if p.is_file() and p.suffix in (".woff2", ".png", ".svg"))
sw = (ROOT / "sw.template.js").read_text(encoding="utf-8").replace("__VERSION__", VERSION).replace("__ASSETS__", json.dumps(assets, indent=1))
write("sw.js", sw)

# 3. dist/abysse-academy.html (un seul fichier)
def font_inline(css, base):
    def rep(m):
        f = base / m.group(1)
        return "url(data:font/woff2;base64," + base64.b64encode(f.read_bytes()).decode() + ")"
    return re.sub(r"url\(([^)]+\.woff2)\)", rep, css)
css = ""
for c in FILES["css"]:
    txt = (ROOT / c).read_text(encoding="utf-8")
    if c.endswith("fonts.css"): txt = font_inline(txt, (ROOT / c).parent)
    css += f"/* {c} */\n{txt}\n"
js = "window.AA={BUNDLED:true};\n" + "".join(f"\n/* {j} */\n" + (ROOT / j).read_text(encoding="utf-8").replace("</script", "<\\/script") for j in FILES["js"])
single = HEAD.format(links="", styles=f"<style>\n{css}</style>", scripts=f"<script>\n{js}\n</script>")
p = write("dist/abysse-academy.html", single)
# 4. dist/artifact.html : même contenu, sans squelette (la page claude.ai fournit doctype, head, body)
art = single.split("<head>",1)[1]
art = art.replace("</head>\n<body>","").replace("</body>\n</html>","")
art = re.sub(r'<meta name="viewport"[^>]*>\n', '', art).replace('<meta charset="utf-8">\n','')
art = art.replace("<title>Abysse Academy</title>", '<title>Abysse Academy</title>\n<meta name="claude:viewport-fit-sides" content="cover">')
write("dist/artifact.html", art.strip()+"\n")
print(f"Abysse Academy v{VERSION} : index.html, sw.js ({len(assets)} fichiers en cache), {p.relative_to(ROOT)} ({p.stat().st_size // 1024} Ko)")
