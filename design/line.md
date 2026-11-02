# Project design line

Values are declared as custom properties in the `:root` of `src/modules/landing/presentation/styles.css` (the line names this file instead of `design/tokens.css`: the project has one screen and one stylesheet). Everything else uses them with `var(--…)`. Components of the set: `design/components/`.

## 1. References

- **brightland** (drink-food, award level): one flat colour per module, burgundy as a field, a product row of title, meta and right-aligned price; taken as structure and colour logic.
- **oryzo** (lateral): one object fills the viewport and answers the scroll; taken as the hero stage whose photo drifts with `animation-timeline: view()`.
- **Airbnb DESIGN.md** (`design/DESIGN.md`): photo-first listing row, 48 px+ buttons, one radius.
Captures live in `specs/MIGA-1-landing/ref/`.

## 2. Direction

Neighbours of Villa Crespo on a phone, for a minute: they scan today's list, press one button and walk to Thames 1050. The page is the paper ticket from the counter: perforated list, order slip, back of the card. It avoids the cream-and-terracotta bakery cliché and soft serifs; its own voice is a hard condensed display in capitals and a two-ink print job (burgundy and pink). Direction id: `page-is-the-object`.
Invention 6, density 5, expression 8 (showcase register: a landing with one stage and one list).

## 3. Tokens

Place: `:root` of `src/modules/landing/presentation/styles.css`.
- Colour (dealt sheet `design/taste/direction.json`): `--ground`, `--surface`, `--ink`, `--accent`, `--accent-ink`, `--paper`, `--paper-ink`, `--paper-muted`, `--paper-hover`, `--focus`.
- Space: `--space-0..10` (2 4 8 12 16 24 32 48 64 96 20 px); radius `--radius-1` 8 px and `--radius-pill`.
- Motion by use: `--dur-fast` 100 ms (press), `--dur-hover` 160 ms, `--dur-1` 220 ms (reveal, bar), `--dur-reveal` 400 ms, `--dur-hero` 600 ms (load), `--stagger` 30 ms; one curve `--ease-out`. Only `transform` and `opacity` move.

## 4. Typography

Barlow Condensed 700 for display (h1, h2, group titles), uppercase, leading .9 on h1/h2 and 1.15 on single-line titles, tracking -.02em. Barlow 400 for body, 500 for emphasis, 600 for prices and buttons. Steps: `--step-small` 16, `--step-body` 18, `--step-lead` 24, `--step-group` 32 (40 from 768), `--step-head` clamp 40 to 88 px. `tabular-nums` on prices, hours and dates.

## 5. The system: primitives, components and patterns

The page is one surface, hand-built because it is a single static landing without a framework: `.btn` (`--accent` solid, `--ink` on paper, `--block`), `.link-arrow`, `.ticket` (paper, perforated edges, rows with a dot leader), `.slip` (zigzag cut, inverted foot), `.plate` (photo tipped in on paper), `.chip`, `.hours__row`, `.visit__card`, `.back__panel`, `.orderbar` (phone only). Hover is wrapped in `@media (hover: hover)`; the press is `scale(.98)` at `--dur-fast`; the focus ring is 2 px `--focus` (`--ground` on paper); a visually hidden `.sr-only` element gives a list its accessible name through `aria-labelledby`.

## 6. State changes of the screen

| Change | Trigger | Feedback | Kind | Token | Reduced |
|---|---|---|---|---|---|
| Load | page open | photo scale 1.08 to 1, h1 lines rise from a mask, card rises | expressive | `--dur-hero` | content visible at once, no transform |
| Section enters | scroll (IntersectionObserver) | translateY 8 px to 0, ticket rows cascade 30 ms each | productive | `--dur-1`, `--stagger` | no transform |
| Order bar | hero CTA leaves the viewport | bar slides up | productive | `--dur-1` | no transform |
| Anchor jump | click on `#…` | smooth scroll | productive | n/a | instant jump |

## 7. Signature interactions

The hero photo drifts with the scroll (`view()` timeline); the ticket rows land in cascade.

## 8. Data states

Static page: no loading, empty or error state. Without script the content, the order bar and the hours table are all visible.

## 9. Voice

Voseo, plural (the bakery speaks): «Pedí por WhatsApp», «Retirá y pagá». Buttons are verb and object. Prices as `$5.200`, hours as «8 a 20».

## 10. How it is extended

A new value goes into the `:root` with a line of what it is for. A new piece copies the closest component above, with its states.
