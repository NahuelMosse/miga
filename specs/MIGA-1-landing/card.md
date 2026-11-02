# MIGA-1 · landing de Miga

status: proposed
cap: 300 min
sources: BRIEF.txt (texto entregado por quien lanzó la card, sin Jira)
not_read: none · no hay card en Jira, adjuntos, marca, fotos propias, número de WhatsApp, dirección ni lista de precios reales

## Specs

- S1 · "Landing de «Miga», panadería de masa madre en Villa Crespo (CABA)."
- S2 · "Muestra los panes y facturas del día con precio"
- S3 · "los horarios del local"
- S4 · "cómo hacer un pedido para retirar (por WhatsApp)"
- S5 · "y dónde queda."
- S6 · "Público: vecinos del barrio, 25 a 60 años, mayormente desde el celular."
- MIGA-1-ASM-01 · la lista del día es fija en la página (mock): 6 panes y 5 facturas con precio en pesos inventado y una fecha de «hoy» escrita; no hay carga diaria ni backend · S2
- MIGA-1-ASM-02 · horarios inventados: martes a sábado 8 a 20, domingo 8 a 14, lunes cerrado · S3
- MIGA-1-ASM-03 · el pedido es un enlace `wa.me` a un número de ejemplo (+54 9 11 0000-0000) con un mensaje precargado, más tres pasos escritos (elegí, mandá el WhatsApp, retirá y pagá en el local); no hay carrito ni el mensaje se arma desde la lista · S4
- MIGA-1-ASM-04 · se retira en el local, sin envío; se paga al retirar · S4
- MIGA-1-ASM-05 · dirección inventada en Villa Crespo (Thames 1050, CABA), con un enlace «Cómo llegar» a Google Maps y un mapa ilustrado estático; sin mapa embebido de terceros · S5
- MIGA-1-ASM-06 · una sola página en castellano rioplatense con voseo, diseñada desde 390 px; el pedido por WhatsApp queda al alcance del pulgar en el celular (barra fija abajo) · S6
- MIGA-1-ASM-07 · las fotos son de bancos libres (Unsplash/Pexels) de pan de masa madre y facturas, en lugar de fotos propias del local · S1, S2
- MIGA-1-ASM-08 · la referencia visual sale de la galería del kit (no hay marca ni diseño): brightland.co como referencia del género y oryzo.ai como lateral · S1
- MIGA-1-ASM-09 · la cifra de la oferta es inventada y verificable en el local: 48 horas de fermentación por hogaza · S1
- MIGA-1-ASM-10 · la página se publica como sitio estático en GitHub Pages, bajo la subruta `/miga/` del dominio de la cuenta: todo recurso propio (CSS, JS, fotos) se pide por ruta relativa y carga desde esa subruta · S1, S6
- MIGA-1-ASM-11 · en lugar del mapa ilustrado que nombra MIGA-1-ASM-05, la sección «Dónde queda» muestra una foto del mostrador con su texto alternativo, la calle como título y el barrio; no hay mapa, ni dibujado ni embebido · S5

## Tasks

- T1 · S1,S2,S3,S4,S5,S6,MIGA-1-ASM-01,MIGA-1-ASM-02,MIGA-1-ASM-03,MIGA-1-ASM-04,MIGA-1-ASM-05,MIGA-1-ASM-06,MIGA-1-ASM-07,MIGA-1-ASM-08,MIGA-1-ASM-09 · src/modules/landing/presentation/index.html (presentation), src/modules/landing/presentation/styles.css (presentation), src/modules/landing/presentation/main.js (presentation), src/modules/landing/presentation/assets/bakery-interior-counter.jpg (presentation), src/modules/landing/presentation/assets/facturas-assorted-rolls.jpg (presentation), src/modules/landing/presentation/assets/facturas-quince-cream-coconut.jpg (presentation), src/modules/landing/presentation/assets/hands-kneading-dough.jpg (presentation), src/modules/landing/presentation/assets/sourdough-crumb.jpg (presentation), src/modules/landing/presentation/assets/sourdough-loaf.jpg (presentation), capturas/miga-390.png, capturas/miga-1440.png (the poc's full-page captures), design/line.md, apps/e2e/miga-landing.spec.mjs, apps/e2e/steps/load.json, apps/e2e/serve.mjs, playwright.config.mjs, eslint.config.mjs, package.json, package-lock.json, .gitignore, design/DESIGN.md, design/taste/direction.json · tests: apps/e2e/miga-landing.spec.mjs "la portada presenta a Miga, panadería de masa madre en Villa Crespo @MIGA-1-S1"; apps/e2e/miga-landing.spec.mjs "la lista del día muestra panes y facturas, cada uno con su precio @MIGA-1-S2"; apps/e2e/miga-landing.spec.mjs "la lista es fija: 6 panes, 5 facturas en pesos y la fecha de hoy escrita @MIGA-1-ASM-01"; apps/e2e/miga-landing.spec.mjs "la página muestra los horarios del local @MIGA-1-S3"; apps/e2e/miga-landing.spec.mjs "horarios: martes a sábado 8 a 20, domingo 8 a 14, lunes cerrado @MIGA-1-ASM-02"; apps/e2e/miga-landing.spec.mjs "cómo pedir para retirar por WhatsApp @MIGA-1-S4"; apps/e2e/miga-landing.spec.mjs "cada botón de pedido abre wa.me al +54 9 11 0000-0000 con el mensaje precargado, y hay tres pasos @MIGA-1-ASM-03"; apps/e2e/miga-landing.spec.mjs "se retira y se paga en el local, sin envío @MIGA-1-ASM-04"; apps/e2e/miga-landing.spec.mjs "la página dice dónde queda el local @MIGA-1-S5"; apps/e2e/miga-landing.spec.mjs "Thames 1050 con el enlace «Cómo llegar» a Google Maps y sin mapa embebido @MIGA-1-ASM-05"; apps/e2e/miga-landing.spec.mjs "a 390 px la página entra sin desborde y los controles miden 44 px o más @MIGA-1-S6"; apps/e2e/miga-landing.spec.mjs "a 390 px el pedido queda en una barra fija abajo al bajar, y la página habla con voseo @MIGA-1-ASM-06"; apps/e2e/miga-landing.spec.mjs "todas las fotos cargan y tienen texto alternativo @MIGA-1-ASM-07"; apps/e2e/miga-landing.spec.mjs "la oferta dice 48 horas de fermentación por hogaza @MIGA-1-ASM-09"; apps/e2e/miga-landing.spec.mjs "la dirección visual toma brightland.co como referencia y oryzo.ai como lateral @MIGA-1-ASM-08"
  reuses: design/components/components.css btn, topbar (the same names the page's styles.css already defines in main; the page does not load the set, its published artifact is only the presentation folder; no catalog port: the motion is the page's own CSS)
  reuses: src/modules/landing/presentation/index.html the poc page as built (sections hero, lista, pedir, horarios, donde and the order bar); the tests drive it as is
- T3 · S1 · design/components/components.css (presentation), design/components/tokens.css (presentation), design/components/primitives.css (presentation) · tests: apps/e2e/miga-landing.spec.mjs "la portada presenta a Miga, panadería de masa madre en Villa Crespo @MIGA-1-S1"
  new: design/components/ does not exist; its three stylesheets copied as is from .claude/templates/components/ for the cards that follow (the scripts, gallery and motion ports are not taken: the page uses none)
- T4 · MIGA-1-ASM-11 · apps/e2e/miga-visit.spec.mjs · tests: apps/e2e/miga-visit.spec.mjs "dónde queda: foto del mostrador con texto alternativo, la calle y el barrio, sin mapa @MIGA-1-ASM-11"
- T2 · MIGA-1-ASM-10 · .github/workflows/pages.yml, apps/e2e/miga-landing.spec.mjs · tests: apps/e2e/miga-landing.spec.mjs "servida bajo /miga/, cada recurso propio es relativo y carga @MIGA-1-ASM-10"
  new: no deploy exists in the repo (Glob .github/**); the workflow uses the stack's default actions (configure-pages, upload-pages-artifact, deploy-pages) over src/modules/landing/presentation only

## Changes to existing behavior

- none · the page keeps its content and look; the card adds its tests, the gate's tooling and the Pages deploy

## Look

- ref: https://brightland.co · https://oryzo.ai
- ref-genre: drink-food
- behavior: load · el hero entra en una sola ola: foto con un leve zoom de salida, titular por líneas, 600 ms en total
- behavior: view · cada sección entra una vez al verla; la lista del día en cascada de 40 ms por fila
- behavior: cursor · las filas y botones responden a hover, foco y presión; el CTA de WhatsApp responde al tocarlo
- behavior: order · el CTA abre WhatsApp con el mensaje precargado; en el celular vive en una barra fija abajo
- tokens: mood cálido, artesanal, de barrio · genre drink-food · spacing 4 8 12 16 24 32 48 64 96 · easing out cubic-bezier(.22,1,.36,1) 220 ms
- copy: 48 horas de fermentación por hogaza · habla la panadería en primera persona plural («horneamos»)

## Gate

```
suite: npx playwright test
lint: npx eslint apps/e2e playwright.config.mjs eslint.config.mjs
app: node apps/e2e/serve.mjs
probe load: node .claude/tools/app.mjs probe apps/e2e/steps/load.json --axe --contrast "h1,.row__price,.btn--accent" --out .validation/probe/load
overflow: node .claude/tools/overflow.mjs
motion: node .claude/tools/motion-audit.mjs $APP_URL
```

## Log

- L1 · Landing de «Miga», panadería de masa madre en Villa Crespo (CABA). Muestra los panes y facturas del día con precio, los horarios del local, cómo hacer un pedido para retirar (por WhatsApp) y dónde queda. Público: vecinos del barrio, 25 a 60 años, mayormente desde el celular.
- L2 · 2026-11-02 · round 1 · hero card on ground with accent CTA (brand rows 0), photos framed as paper plates and footer stamp removed, transform-only reveals and click-driven smooth scroll
- L3 · 2026-11-02 · round 2 · footer and order slip set on the ground and surface, header order button in the accent, two-column composition from 768 (brand page background holds at every width)
- L4 · 2026-11-02 · declared · MIGA-1-ASM-08 · the reference is a design input, not a behavior of the page: the capture rounds in rondas.md compare against it, no browser test can tell it
- L5 · 2026-11-02 · RED · the page exists since poc: the 16 tagged tests characterize it and pass at their commit; there is no new behavior to fail first
- L6 · 2026-11-02 · closing: MIGA-1-ASM-05 names an illustrated static map; the page shows a photo of the counter in its place and no third-party map, the look kept as revised in 58124f2
- L7 · 2026-11-02 · risk escalated to high by the diff: the whole component catalog was copied into design/components/ (shared scripts not in Tasks); trimmed to its three stylesheets, the escalation stands and the plan judge runs
- L8 · 2026-11-02 · L4 no longer holds: MIGA-1-ASM-08 is tagged by a test that reads the ref line of card.md and rondas.md (it measures the declaration, not the page) · judge ACT-03
- L9 · 2026-11-02 · round 2 · overflow of headings fixed without clipping, tokens for hand-written spaces, hover gated and icon no longer animates layout, html-validate clean, design/line.md
- L10 · 2026-11-02 · closing: I-set and I-tokens stay failed after two gate rounds: the bar asks the page composed from design/components/ (a back-office set) and loading its stylesheets, and the copied set itself writes durations by hand; the user ordered the look kept as is, so composing from the set is a redesign a person decides
- L11 · 2026-11-02 · closing: focus could not run: the page has no form, so no probe step leaves a role=alert to look at
- L12 · 2026-11-02 · closing: publish could not run from this worktree: published by export (the repo without .claude/ and CLAUDE.md) to a public GitHub repo by order of the user
