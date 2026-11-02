# Handoff · MIGA-1 (batches A and B)

Direction id: `page-is-the-object` (`design/taste/direction.json`, dealt, 0 redraws). Design system: `design/DESIGN.md` (Airbnb). Fonts: Barlow Condensed 700 / Barlow 400-500-600 (Google Fonts link in `rondas.md`). Palette and layout per section: `specs/MIGA-1-landing/rondas.md` `## Direction`.
Run the rounds with `--brand design/taste/direction.json`.

References (not committed): `specs/MIGA-1-landing/ref/` (brightland, oryzo; sheets `sheet-390.jpg`, `sheet-1440.jpg`). Oryzo's motion could not be measured (exit null twice); brightland's is in `ref/motion.json`.

## Assets (`src/modules/landing/presentation/assets/`, jpg, 180-242 KB, one warm balance, warmth spread 4.8)

| File | Size | Use |
| --- | --- | --- |
| `sourdough-loaf.jpg` | 1400x1050 | hero background (`object-position: 28% 40%`, loaf at left/top) |
| `sourdough-crumb.jpg` | 1200x1200 | list section plate (square) |
| `facturas-quince-cream-coconut.jpg` | 1400x1050 | list section plate and footer stamp (3:4 crop) |
| `facturas-assorted-rolls.jpg` | 1400x1050 | list section plate |
| `hands-kneading-dough.jpg` | 1400x935 | how-to-order section |
| `bakery-interior-counter.jpg` | 1400x1050 | where-it-is section, full-bleed behind the visit card |

Credits: `specs/MIGA-1-landing/CREDITS.md` (CC BY and CC BY-SA: the footer must carry the credits line). None is Miga's own place.
No illustrated map was made (ASM-05): a map of invented streets drawn by hand would be a guess at real geography. If wanted, build it in the page as an inline SVG schematic labelled «esquema, sin escala» with flat shapes in `--ground`/`--paper` (Thames as one bar, one cross street, a pin); the card works without it.

## Notes
- `.gitignore` gained `specs/*/ref/`, `specs/*/ref-*/`, `specs/*/rondas/`.
- Today in the mock is Saturday 7 November 2026 (open day, dough of Thursday 5 = 48 h).
