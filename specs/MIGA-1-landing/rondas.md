# Rondas · MIGA-1

References captured with `design-round.mjs --ref` into `specs/MIGA-1-landing/ref/` (not committed): `drink-food-brightland` and `lateral-oryzo`, 9 frames per width each (1440 and 390) plus one inner page, contact sheets `ref/sheet-1440.jpg` and `ref/sheet-390.jpg`. A second try for oryzo's motion (`ref-oryzo-retry/`) ended again with `motion-audit exit null`: oryzo's movement is read from its frames, not measured. brightland's motion is measured in `ref/motion.json`.

## Direction

**Direction id:** `page-is-the-object` (dealt, 3 options, seed 917312566, 0 redraws; sheet `design/taste/direction.json`). The other two options (`one-motif`, `split-stage`) were left because a bakery has no single shape that is its own (every bakery is a round loaf) and a fixed half-photo competes with the list, which is the page's work. Design system: `design/DESIGN.md` (Airbnb: photo-first, a listing row of title, meta and a right-aligned price, 48 px buttons, one radius; chosen because the public is neighbours on a phone who scan a list and press one button, and it is not a food brand).

**Concept.** On this page, the paper ticket you take from Miga's counter becomes the page itself: the day's list is the ticket (perforated, stamped with the date and the 48 hours the dough waited), the order is the slip you send by WhatsApp, and the visit card and the footer are its back.
Competitor test: another bakery's ticket does not carry «masa del jueves, horno del sábado, 48 h» nor Thames 1050; the sentence fails for the bakery two streets away.

**Live thing.** «Abierto ahora / Abre mañana a las 8» chip computed in the browser from the real hours (`Intl` with `America/Argentina/Buenos_Aires`), shown beside the hours table. Without script the static table stands alone. It never blocks reading.

**Surface.** The pink paper of the pastry box and the counter ticket, on burgundy ground. Three components that express it:
1. **Ticket** (list of the day): filled `--paper` panel, no outline; edges perforated by a row of 4 px round dots (radial-gradient, `--ground` coloured) on left and right, a notch half-circle at the top; figures in Barlow tabular, leader of 4 px dots between name and price.
2. **Slip** (how to order and hours): `--paper` panel with straight top and zigzag bottom cut by `clip-path: polygon(...)` (12 teeth at 390, 24 at 1440); last row inverted (burgundy bar, pink type).
3. **Back of the card** (visit and footer): `--paper` panel on photo or ground, top edge of semicircle scallops (6 at 390, 12 at 1440), a 3:4 photo «stamp» 64 px (390) / 88 px (1440) with a 6 px paper margin.
No border anywhere, no shadow at rest, no gradient, one radius `--radius-1: 8px` (buttons, photos), tickets have the shaped edges instead.

**Trait matrix** (what gives the references their level, and how it is measured here)

| Trait | From | Measured on this screen |
| --- | --- | --- |
| A display with character and a palette with an owner: a hard condensed face in capitals and a two-ink print job (burgundy + pink), not cream and terracotta | brightland (serif display on a burgundy field, one flat colour per section) | h1 >= 88 px at 1440 and >= 40 px at 390, Barlow Condensed 700 uppercase, leading 0.9; only `--ground`, `--paper`, photos on screen; `palette:` rows of `design-round` pass; grayscale L gap 0.575 between CTA and ground |
| Real imagery of the thing, one treatment, one light | brightland (every module is a real photo, never a drawn object) and oryzo (one object fills the viewport) | 6 photos, warmth spread 4.8 (`asset-audit`), hero photo >= 100 % width at 1440, `broken images` 0, no text on a photo (scrim not needed: text lives on opaque paper) |
| One object that answers the scroll | oryzo (a single cork coaster rotates and scales across pinned frames, text changes around it) | the hero loaf photo holds 1 viewport on a sticky stage while the ticket header slides over it; `transform: scale(1 -> 1.08)` linked to scroll with `animation-timeline: view()` (fallback: static), max 1 held stage of 2 screens |

**Taken and not taken.** brightland: the product-grid structure and its row of «title, meta, price», the burgundy as a field of colour, generous photo cards; not its serif/script faces, not its carousels or e-commerce chrome. oryzo: the single-object stage, the large short statement, the dark ground where one warm thing glows; not its 3D model, its dark-brown palette, or its all-caps microcopy blocks.

**Motion grammar.** brightland measured (`ref/motion.json`): interactive transitions 200 ms `ease-in-out` (nav links, summary) and 100 ms `ease` (floating buttons, hover scale 1.1), stagger 0 ms, no entrances on scroll, no cursor reaction beyond hover. oryzo read from frames: object rotation/scale linked to scroll, text swaps by line. For Miga (card: `tokens`, `behavior`): 
- easing `cubic-bezier(.22,1,.36,1)` (`--ease-out`), base duration 220 ms (`--dur-1`), hero wave 600 ms in total (`--dur-hero`);
- load: photo `scale(1.08) -> 1` over 600 ms, h1 lines revealed by `translateY(100%) -> 0` inside an `overflow: hidden` line mask, 80 ms between lines, card and CTA fade/translate 12 px last (delay 280 ms);
- view: each section enters once (IntersectionObserver, `opacity 0 -> 1`, `translateY(16px) -> 0`, 400 ms); ticket rows in cascade, `animation-delay: calc(var(--i) * 40ms)`, 11 rows = 440 ms;
- cursor: rows `:hover` background to `--paper-hover` 160 ms; buttons `:hover` translateY(-1px), `:active` scale(.98) 100 ms, focus ring 2 px `--focus` offset 2; WhatsApp CTA press: scale .98 at 100 ms, then a 150 ms tick (check mark replaces the label glyph) before the link opens;
- reduced motion: no transforms, no delays, content visible at once;
- idle: none.

### Type (self-hosted is not required; Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
```
- Display: **Barlow Condensed 700**, tracking -0.02em, leading 0.9, uppercase for statements (h1, h2), mixed case for item titles. 
- Text: **Barlow 400** body, **500** emphasis, **600** for prices and buttons; leading 1.5; `font-variant-numeric: tabular-nums` on prices, hours and dates.
- Body never under 16 px on a phone (taste rule); small step 13 px.

### Palette (dealt, `design/taste/direction.json`; OKLCH L measured with `.claude/reference/color.md` method)
```css
:root {
  --ground: #3d0012;       /* L 0.230 C 0.092 h 11  page background, text on paper, CTA label */
  --surface: #4d0519;      /* L 0.273 C 0.102 h 12  second ground (footer band, dark rows) */
  --ink: #ff99d3;          /* L 0.805 C 0.140 h 346 text on ground */
  --muted: #c77aa0;        /* L 0.673 C 0.107 h 349 secondary text on ground */
  --accent: #ff99d3;       /* L 0.805  CTA fill on ground (one CTA fill, no variants) */
  --accent-ink: #3d0012;   /* L 0.230  CTA label */
  --paper: #ff99d3;        /* the ticket paper = the pink, same L 0.805 */
  --paper-ink: #3d0012;    /* text on paper */
  --paper-muted: #6b1b36;  /* L 0.362 C 0.114 h 4  secondary text on paper */
  --paper-hover: #ffb0de;  /* row hover on paper, L 0.85 */
  --focus: #ffd1ea;        /* L 0.907 focus ring on ground; on paper the ring is --ground */
}
```
Checks: **grayscale** ground L .230 / surface .273 / paper .805 / muted .673 / paper-muted .362: three clear steps, the order of importance survives in grey. **Contrast** (WCAG): ink on ground 8.9, muted on ground 5.57, ink on surface 7.95, muted on surface 4.97, accent-ink on accent 8.9, paper-ink on paper 8.9, paper-muted on paper 5.86 (all >= 4.5; CTA label 8.9). **CTA**: fill L .805 against ground L .230 = gap .575 (>= .4). On paper, the CTA inverts to a `--ground` fill with `--ink` label, same L ladder. **Proportion**: ~55 % ground, ~30 % paper, ~15 % photos and accent; the accent as a fill appears only on the CTA, the sticky bar and the stamp frames.
Spacing tokens: `--space-1..9` = 4 8 12 16 24 32 48 64 96; radius `--radius-1: 8px`; durations `--dur-1: 220ms`, `--dur-fast: 100ms`, `--dur-hero: 600ms`; `--ease-out: cubic-bezier(.22,1,.36,1)`.
Type tokens (dealt): `--step-small: clamp(.8125rem,.79rem + .1vw,.875rem)`, `--step-body: clamp(1.0625rem,1rem + .25vw,1.1875rem)`, `--step-lead: clamp(1.25rem,1.1rem + .7vw,1.625rem)`, `--step-head: clamp(2.5rem,1.2rem + 5vw,5.5rem)`.

### Copy (voice: la panadería habla en plural, voseo; headlines <= 2 lines)
- h1: **Pan de masa madre / de 48 horas** (two lines, capitals). Sentence: «Horneamos hogazas con 48 horas de fermentación, en Villa Crespo. Pedí por WhatsApp y retirá en el local.»
- Primary CTA: **Pedir por WhatsApp** (secondary link in hero: «Ver la lista de hoy», anchor).
- H2s: «Hoy en el mostrador» · «Cómo pedir» · «Horarios» · «Dónde queda».
- Ticket header: «Miga · Sábado 7 de noviembre» and stamp line «Masa del jueves 5, horno del sábado 7: 48 h». (today = Saturday 7 November 2026, an open day.)
- Panes (6): Hogaza de masa madre $5.200 · Hogaza integral $5.600 · Pan de centeno y semillas $6.100 · Pan de campo $4.800 · Baguette de masa madre $2.800 · Focaccia de romero, porción $3.400.
- Facturas (5): Medialuna de manteca $900 · Vigilante de membrillo $1.100 · Cañoncito de dulce de leche $1.300 · Palmerita glaseada $1.200 · Bola de fraile con crema $1.400. Each row: name (Barlow 500, 18-20 px), a one-line detail in `--paper-muted` 14-15 px (e.g. «1 kg, corteza oscura»), price right.
- Steps (slip, verbs not numbers): **Elegí** «lo que quieras de la lista de hoy» · **Mandá el WhatsApp** «con tu nombre y a qué hora pasás» · **Retirá y pagá** «en el local, se paga al retirar». Inverted last row: «Retiro en el local, sin envío».
- WhatsApp link: `https://wa.me/5491100000000?text=Hola%20Miga!%20Quiero%20pedir%20para%20retirar%3A%20` (example number, ASM-03).
- Hours: Martes a sábado 8 a 20 · Domingo 8 a 14 · Lunes cerrado. Chip: «Abierto ahora · cierra a las 20» / «Cerrado · abre martes a las 8».
- Address: Thames 1050, Villa Crespo, CABA. «Cómo llegar» → `https://www.google.com/maps/search/?api=1&query=Thames+1050+Villa+Crespo+Buenos+Aires`.
- Footer sign-off: «Hasta mañana, vecino.» + «Si te falta algo del día, escribinos.» Imprint (13 px): «Miga · Panadería de masa madre · Thames 1050, Villa Crespo, CABA». Credits line: «Fotos: Agelaia, Angel Ganev, Shixart1985, Horacio Cambeiro, Kgbo, Wikimedia Commons (CC BY / CC BY-SA); no son del local.»
- `<html lang="es-AR">`.

### Layout, section by section (mobile first; margins 16 px at 390, 32 px from 768, content max-width 1200 centred at 1440)

Page ground `--ground`. A sticky mini header is not used: no nav bar (one page, five blocks); a wordmark «MIGA» (Barlow Condensed 700, 28 px) sits top-left over the hero photo, and from 768 a text link «Pedir por WhatsApp» top-right.

**1 · Hero (id `inicio`)**
- 390: `min-height: 100svh`. Photo `sourdough-loaf.jpg` fills it (`object-fit: cover; object-position: 28% 40%`; `filter: brightness(.7)`). The pink card (`--paper`, 8 px radius, 24 px padding) is at the bottom, 16 px margins, ~58 svh tall: h1 at 40-44 px (`--step-head`) two lines, the sentence at 17-18 px (`--paper-muted` is not used here, `--paper-ink`), then the CTA full width 56 px high (`--ground` fill, `--ink` label, «Pedir por WhatsApp» with a small chat glyph from the repo's icons, inline SVG outline 20 px), under it the text link «Ver la lista de hoy». Facts line above the CTA in Barlow 500: «Thames 1050 · mar a sáb 8-20 · dom 8-14». The wordmark floats at top-left, 24 px from the top.
- 1440: 100svh photo, `object-position: 30% 50%`. Card centred, columns 4-10 (about 790 px wide, ~62 % of the height), padding 48 px. The h1 is the card's headline, 88 px (`--step-head` max 5.5rem), two lines; below it a two-column row: left the sentence (30ch, 20 px), right the facts as three short lines; at the bottom edge: CTA 56 px high (auto width, 8 px radius) left, text link right. The photo shows to the left and right of the card, so the loaf's dark crust stays visible at the left of the viewport.
- Scroll: the hero stage is `position: sticky; top: 0` inside a 150 vh wrapper; photo `scale(1 -> 1.08)` linked to scroll; the card translates up 12 px and fades only at the end (optional enhancement, `@supports (animation-timeline: view())`).

**2 · Hoy en el mostrador (id `lista`) — the ticket**
- 390: H2 «Hoy en el mostrador» at 40 px, two lines at most, top-left, 64 px above. Then the ticket full width minus 32 px: top header row (shop name left, date right, 13-14 px caps), the stamp line «Masa del jueves 5, horno del sábado 7: 48 h» in an inverted bar 44 px tall (`--ground` bar, `--ink` text), then group heading «Panes» (Barlow Condensed 700, 28 px, 28 px above) and 6 rows, then «Facturas» and 5 rows; each row min-height 56 px, name 18 px left, dot leader, price 18 px/600 right, detail below the name 14-15 px. A final row: «Pedí por WhatsApp» link inside the ticket (`--ground` button, full width, 56 px). Perforation dots left and right edge; 8 px notch at top. Below the ticket, a two-column strip of two photos (`facturas-quince-cream-coconut.jpg`, `facturas-assorted-rolls.jpg`, 4:5 crops, 8 px radius, 8 px gap) 
- 1440: two columns. Columns 1-5: H2 (88 px two lines) + a 30ch paragraph «Horneamos todos los días y lo que se termina, se termina.» + photo `sourdough-crumb.jpg` square 420 px, offset down by 48 px, overlapping the ticket's left edge by 24 px (tipped-in plate). Columns 7-11: the ticket, 480 px wide, the two photos of facturas placed as plates under it, 2 columns of 232 px. Ticket rows 56 px, so the list (11 rows + 2 headings + header) is ~980 px tall; the section is ~1200 px tall.
- Entrance: ticket drops in once (`translateY(16px) -> 0`, 400 ms) and the rows cascade at 40 ms each.

**3 · Cómo pedir (id `pedir`) — the slip**
- 390: H2 «Cómo pedir» 40 px; one line «Se retira en el local, sin envío.» 17 px; the slip full width minus 32 px: three blocks, each a bold heading (Barlow Condensed 700, 28 px: «Elegí», «Mandá el WhatsApp», «Retirá y pagá») with the line of detail under it at 17 px and, at the right of the heading, a 4 px dot leader to a simple word-time («primero», «después», «al final»); inverted last row (44 px bar): «Retiro en el local, sin envío. Pagás al retirar». Zigzag bottom, 12 teeth. Under the slip, the primary CTA full width, `--accent` fill on the ground («Pedir por WhatsApp»).
- 1440: H2 and 30ch paragraph at columns 1-5, the slip 460 px at columns 7-11, top-aligned with the H2; the CTA sits under the paragraph (left column), auto width. A photo `hands-kneading-dough.jpg` fills columns 1-5 under the CTA at 4:3 (the dough waiting, the idea of the 48 h).

**4 · Horarios (id `horarios`)**
- 390: H2 «Horarios» 40 px. A `--surface` band (full bleed, 32 px padding) holds the chip «Abierto ahora · cierra a las 20» (pill 8 px radius, 44 px high, ink on `--ground`, a 8 px dot: green is not in the palette, so the dot is `--ink` filled when open and an outlined ring when closed) and three rows of days left and times right in Barlow tabular 20 px, 56 px each (Martes a sábado 8 a 20 · Domingo 8 a 14 · Lunes cerrado, the current day's row inverted: `--paper` fill).
- 1440: two columns: H2 + chip on the left (cols 1-5), the three rows as a ticket slip 460 px on the right (cols 7-11); the section is ~420 px tall, on the `--surface` band. Nothing else (the section is short on purpose).

**5 · Dónde queda (id `donde`) — visit card on a photograph**
- 390: `bakery-interior-counter.jpg` 100vw x 70svh (`object-position: 50% 60%`), the card spans 16 px margins and overlaps the photo's bottom by 80 px: «Thames 1050» (Barlow Condensed 700, 36 px), «Villa Crespo, Buenos Aires (CABA)» 17 px, «Retirás acá. No hacemos envíos.» 16 px, and a full-width 56 px button «Cómo llegar» (`--ground` fill, `--ink` label) opening Google Maps. Under the card, 32 px below: the static schematic map (optional, see handoff) at full width.
- 1440: photo 100vw x 100svh; card 380 px, padding 32 px, `position: sticky; top: 60px` at the upper right (60 px from the edges); the photo's counter stays left and clear of the card. The schematic map sits as a second plate on the card, under the button (or left bottom of the photo, 280 px) if it exists; without it the card is address + hours extract + button.

**6 · Footer — back of the card (id `contacto`)**
- 390: full width `--paper` panel on `--ground`, six scallops across its top edge, sign-off «Hasta mañana, vecino.» 32 px Barlow Condensed, two message lines at 16 px, address lines at 17 px each a 48 px-high link (WhatsApp, Cómo llegar, Thames 1050), stamp photo (`facturas-quince-cream-coconut.jpg` crop 3:4) 64 px wide top-right, imprint 13 px centred, credits line 13 px centred below. Bottom padding 96 px so the sticky bar never covers it.
- 1440: panel columns 2-11, 420 px tall, twelve scallops (~100 px), two halves: left sign-off and message, right the four link lines at 18 px with 12 px gaps, stamp 88 px top-right. Imprint and credits at the foot, centred, 13 px.

**7 · Sticky WhatsApp bar (390 to 767 px only)**
- `position: fixed; bottom: 0; left: 0; right: 0`, height 72 px + `env(safe-area-inset-bottom)`, `--ground` background, a 1 px top edge of `--surface` is not allowed (no thin rules): separate with the 16 px of padding and the colour step to the page. Holds one button: `--accent` fill, `--accent-ink` label «Pedir por WhatsApp», full width minus 32 px, 56 px high, within thumb reach. It appears once the hero CTA leaves the viewport (IntersectionObserver, `translateY(100%) -> 0`, 220 ms); with no script it is visible from the start. Page gets `padding-bottom: 88px` on mobile. At 768 and up it is hidden and the top-right link of the hero stays (sticky text link in a 56 px header strip appearing after the hero).

**Responsive classes.** 390 single column as above; 768: margins 32, ticket and slip centred max 560, hours and list keep one column, photos in 3 columns; 1024: columns 1-5 / 7-11 begin here (the two-column composition), hero card ~60 % width; 1440: as described, sections change their columns between 390 and 1440 in 4 of 6 blocks (list, how, horarios, dónde). Touch targets >= 44 px (rows and buttons 56), nothing is hover-only, body 17-19 px.

**Imagery map** (all in `src/modules/landing/presentation/assets/`): hero `sourdough-loaf.jpg` · list plate `sourdough-crumb.jpg` + `facturas-quince-cream-coconut.jpg` + `facturas-assorted-rolls.jpg` · how `hands-kneading-dough.jpg` · where `bakery-interior-counter.jpg` · footer stamp `facturas-quince-cream-coconut.jpg` (reused crop). Always `width`, `height`, `alt` that says what the picture shows, `loading="lazy"` except the hero.

## Log of rounds

(the rounds are written after the screen exists)

## Round 1

Judged at 390 first (`rondas/r1/390x844`), then 1440, against `ref/sheet-390.jpg` and `ref/sheet-1440.jpg`. Renderer: NVIDIA RTX 2060 via D3D11 (not software). Deviations kept from the Direction: static «abierto» chip (poc, Saturday), WhatsApp CTA opens directly, one-screen hero whose photo drifts with `animation-timeline: view()`. The page declares no grain (`--grain none`: paper and photos are the texture).

1. **Character.** Reference: brightland owns one flat colour per module and its action is a solid on that colour. Mine had a pink hero card with a burgundy button: a button the sheet does not know (`brand: primary action` 0.579, `page background` 0.067) and the ink-on-pink look of the ticket repeated in the first frame. Changed: hero card is `--ground` on the photo with pink type and the pink `--accent` CTA (button solid pink with burgundy type, as the dealt sheet says); the pink paper is kept for ticket, slip, plates and footer, so the first screen and the list now read as two pieces of stationery. Notch of the ticket and teeth of the slip moved from `mask` to a background layer and a pseudo-element (nothing masks live text any more).
2. **Hierarchy and typography.** h1 88 px at 1440 (ratio 4.63, leading 0.9, tracking -0.02) and 40 px at 390 already stand; the hero facts wrapped with a stray «·» at the start of the second line at 390: dots removed, the three facts are spaced by a 24 px gap. Slip foot bar now 56 px (was 44, text sat low) and flush with the teeth; imprint and credits (they were the longest text and sat on paper, so the gate read the page background as pink) moved out of the paper panel onto the ground in `--muted` (5.57:1).
3. **Depth and colour.** Photos were pasted bare on the ground (`pasted boxes` 4 at every width): each plate now has a 8 px `--paper` margin like a print tipped into the ticket (0 now). `repeated images` 1: the footer stamp reused the facturas photo, removed (0 now). Ground 55 % / paper 30 % / photos kept; no shadow, no gradient.
4. **Composition.** 390: visit card overlap and order CTA keep the thumb path; `visit` bottom padding 64 to 24 and footer top 48 to 32 to shorten the void at the end of the page (frame 6 empty 86 %: the flat pink footer panel counts as empty, a taste flag, picture judged against brightland's footer: not poorer, left). Hero card at 1440 is 820 px wide (57 % of the width), covers the loaf's face: left as is, the crust shows left and right of it. Frames 2 and 4 at 390 (ticket rows, 9-10 competing elements) are a list: intent is the list, not chased.
5. **Motion and states.** Compare (ref brightland, mine): hover 100 ms ease vs 167 ms ease-out (mine slower than the ref's floating buttons; kept at the Direction's 160-220), press none vs 83 ms, entrance on scroll none vs 220 ms ease-out (transform 8 px, no stagger on sections, 30 ms stagger on 11 ticket rows), carousels of the ref (6700 ms round-trip) have no counterpart. Reveals are transform-only now (no opacity 0 state), so content is never invisible waiting for the observer, and `scroll-behavior: smooth` moved from CSS to a click handler in `main.js`, because a smooth scroll made the gate sample pixels while text was still moving (contrast and text-over-image rows with ground-on-ground readings). Reduced motion unchanged (transforms off).

**Rows, before to after (390 / 1440, round `r1`, log `rondas/r1.log` to `r1d.log`)**
- `brand:` primary action 0.579 to 0 · page background 0.067 to 0 (390, 1440, 1280, 1024; 768 still reads 0.067 in one run: its longest sampled text lands on the paper in that capture).
- broken images 0, alt text painted 0, tap targets under 44: 0, inputs under 16 px: 0, overflow none at 390 (all passed before and after).
- pasted boxes 4 to 0, repeated images 1 to 0, grain declared none (pass), console 404 gone (the 404 was the missing footer stamp request path of the first run: 0 errors after).
- `palette: text contrast` and `text over images`: 8 / 8 at 390 and 5 / 10 at 1440 before; after the motion fix 4 / 3 at 390 and varying between runs at 1440: readings like `#3d0012 on #3d0012` are text rects measured while a transform was still running, not real pairs (every pair is ink or paper-ink on its own surface at 5.6 to 8.9:1). Not at 0 in the last run: open.

**Open (not fixable in the presentation files)**
- `palette: CTA separation` and `accent reserved` (6 controls): the dealt sheet sets ink, accent and paper to the same pink `#ff99d3`, so the CTA never differs from the body text and every pink word counts as accent.
- `image file width >= shown x 2`: the hero and counter photos are 1400 px wide, 2880 needed at 1440 (assets batch).
- `load waves` 0: the load animation is CSS keyframes (photo scale, h1 line mask, card rise: 600 ms), the audit reports no waves; the 0/600/2000 ms captures show the sequence.
- LCP flag at 1440 (`sourdough-crumb` lazy) appeared in the last run only.

## Round 2

Judged at 390 (`rondas/r2/390x844`, `final-390.png`) then 1440 (`final-1440.png`) against `ref/sheet-390.jpg` and `ref/sheet-1440.jpg`. The look of round 1 is kept (palette, type, ticket, slip, photos); this round fixes structure, tokens, motion hygiene and boxes. Renderer: GPU. The hero frames at 390 and 1440 are identical to round 1 in composition: h1 40 / 88 px, leading 0.9, two lines.

1. **Character.** The traits of `## Direction` (ticket, slip, back of the card, two inks) are untouched. A heading's leading stays 0.9 (the condensed capitals set tight, as brightland's) and the box now carries the glyphs instead of loosening the leading: `.h2` and the hero lines have `padding-block: var(--space-3)` (hero lines `--space-5`) with the same negative margin; the hero `h1` is a grid so the negative margins do not collapse and the two lines keep their pitch. Single-line titles (`ticket__group`, `slip__head`, `visit__street`, `back__bye`, wordmark) go from leading 1 to 1.15 (about 4 px).
2. **Hierarchy and typography.** `design/line.md` written (sections 1 to 5; values stay in the `:root` of `styles.css`). Hand-written spaces become tokens: `.04em` to box padding on tokens, `2px` to `--space-0` (2 px, new), `1.05em` of the dot leader to `--space-10` (20 px, new). The hero facts and the slip are named by `aria-labelledby` pointing to a `.sr-only` span with the exact text («Datos del local», «Pasos para pedir»); `<!DOCTYPE html>`; the 11 inline `--i` are `:nth-child` rules. html-validate: clean.
3. **Depth and colour.** Unchanged on purpose (ground / paper / photos, no shadow). The hero loaf gets `<link rel="preload" as="image" fetchpriority="high">`.
4. **Composition.** `overflow.mjs` at 320, 390 and 1280 with real and 1.4x pseudo-localized text: 20 findings before, 0 now, including the three headings asked (`#horarios-title`, `#donde-title`, `.back__bye`). `.order__grid`, `.list__grid` and `.list__ticket-col` get `minmax(0, 1fr)` and `.slip__head` wraps: the page scrolled sideways by 19 px at 390 with longer text (a grid track grown by its min-content).
5. **Motion and states.** `motion-audit`: 4 failing to 0 (2 non-failing no-feedback on two links that only underline). The button icon hover animated layout (rotate and scale of an svg changes its box: 4 `layout-animated` errors): now `translateX(var(--space-1))`; `.btn`, `.link-arrow`, `.row`, footer links and `.topbar__order` hover live inside `@media (hover: hover)`, the press stays on `.btn:hover:active`. Compare (ref brightland, mine): hover none vs 167 ms ease-out, press none vs 83 ms, entrance 6700 ms round-trip carousel vs 167 ms ease-out, no stagger on sections and 30 ms on the 11 rows; durations unchanged from round 1.

**Open**
- Lazy LCP: `design-round` reads a below-the-fold lazy image as the LCP (the crumb at 1440, the hands at 390) because it scrolls before the check; making them eager only changed the row to «eager, hidden at t0», so they stay `loading="lazy"` with `decoding="async"`.
- `palette: CTA separation` and `accent reserved` (dealt sheet: ink, accent and paper are one pink), `image file width >= shown x 2` (assets), `load waves` (CSS keyframes, one wave of 600 ms): as in round 1.
- `palette: text contrast` 5 and `text over images` 3 in one run: readings taken while a transform ran (same cause as round 1); every real pair is 5.6 to 8.9:1.
