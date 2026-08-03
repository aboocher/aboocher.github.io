# Math 150 Standards Practice Pages — Progress & Handoff

Context doc for continuing this work in a fresh conversation. Paste/attach this file and say
"continue building standard practice pages, pick up where PROGRESS.md leaves off."

## Project

Site: `math150/math150-standards-ledger.html` is the course hub for a standards-based-grading
Calculus I course — grade estimator, grade thresholds, and an accordion **Standards Directory**
linking to one practice-bank page per standard at `math150/standards/<CODE>.html`.

Source material: the teacher's real quizzes live in
`math150/standards/OurQuizzes/Math150_Fall2026 (1)/<Folder>/`, one `.tex` file per quiz version
(e.g. `G1v1.tex`...`G1v5.tex`). These are the ground truth for what each standard actually tests —
read all versions for a standard before writing its practice page, since the ledger's one-line
description is sometimes incomplete or slightly off (this happened with G1: the ledger just said
"function notation and simplification," but the real quizzes also test composition/decomposition
in depth).

There's also a flat, older, duplicate copy of the G1 quizzes directly in `OurQuizzes/` — ignore it,
the nested `Math150_Fall2026 (1)/` folder is the authoritative, complete source.

## Status

| Code | Status | Source quiz versions | Notes |
|---|---|---|---|
| G1 | ✅ Done | v1–v5 | Function notation, composition/decomposition, simplifying expressions |
| G2 | ✅ Done | v1–v5 | Slope/intercepts, writing equations, parallel/perpendicular |
| G3 | ✅ Done | v1 only | SOH-CAH-TOA ratios, sketching triangles from a ratio, 30-60-90/45-45-90 special triangles, exact values at special angles, applications |
| G4 | ✅ Done | v1 only | Unit circle trig: reference angles/ASTC signs, coordinates on the circle, all six functions at special angles, mixed applications |
| L1 | ⬜ Next up | v1 only | Limits from graphs |
| L3 | ⬜ Todo | v1–v9 | Limits algebraically, level 1 |
| L4 | ⬜ Todo | v1 only | Limits algebraically, level 2 |
| L5 | ⬜ Todo | v1 only | Limits involving infinity (no L'Hôpital) |
| D1 | ⬜ Todo | v1 only | Definition of the derivative, rate of change |
| D2 | ⬜ Todo | **No source found** | f/f′/f″ relationships — will need to build from ledger description alone, or ask user for source |
| D3 | ⬜ Todo | **No source found** | Continuity/differentiability — same as above |
| D4 | ⬜ Todo | v1 only | Basic derivative rules, tangent lines |
| D5 | ⬜ Todo | v1 only | Trig/inverse trig/exp/log derivatives |
| D6 | ⬜ Todo | v1 only | Product and Quotient Rules |
| D7 | ⬜ Todo | v1 only | Chain Rule |
| A1 | ⬜ Todo | v1 only | L'Hôpital's Rule with justification |
| A2 | ⬜ Todo | v1 only | Implicit differentiation, tangent lines |
| A3 | ⬜ Todo | **No source found** | Applied optimization, level 1 |
| A4 | ⬜ Todo | **No source found** | Critical numbers, extrema |
| I1 | ⬜ Todo | v1 only | Basic antiderivatives |
| I2 | ⬜ Todo | v1 only | Harder antiderivatives (algebraic rewriting/geometry) |
| I3 | ⬜ Todo | v1 only | Riemann sums / rectangles |
| I4 | ⬜ Todo | v1 only | Projectile motion, displacement, total distance |
| I5 | ⬜ Todo | **No source found** | Definite integrals via geometric area formulas |
| I6 | ⬜ Todo | v1 (folder `I8_FTC`) | ⚠️ numbering mismatch — source folder is named `I8`, not `I6`. Confirm this is really I6 before building. |
| I7 | ⬜ Todo | v1 (folder `I9_Usub`) | ⚠️ same mismatch — source folder is `I9`, confirm it's really I7. |
| E1, E2, E3, E6 | ⏸ On hold | none found | Optional/additional topics track — no quiz sources provided yet, lower priority |
| LC, DC, AC, IC | ➖ Out of scope | — | Capstones roll into the course percentage grade, not the standards-mastery tracker — user confirmed these do **not** get practice pages here |

Legend: ✅ done · ⬜ not started · ⏸ paused/waiting on source material · ➖ intentionally excluded

**When you hit a "No source found" standard**, don't invent problems from nothing — ask the user
whether quiz files exist elsewhere, or whether to build from the ledger's one-line description only.

## Established page template (follow exactly — copy `G2.html` as the starting point)

Structure, in order:
1. Back link to `../math150-standards-ledger.html`
2. Header: eyebrow "Standard Practice Bank" + `<h1>CODE: Title</h1>`
3. Plain intro block: one sentence stating problem count, then a bullet list of key
   pitfalls/reminders for that standard (no box/border around it)
4. `<h2>Problems</h2>` — problems grouped under `<h3 class="group-label">` subtopic headers,
   each problem a plain flex row: number + text + small "↓ solution" jump-link (id=`p<N>`)
5. `<h2>Solutions</h2>` — same grouping and numbering, each with "↑ problem" jump-link (id=`s<N>`),
   solution text is step-by-step and dimmer color (`.sol .body-text`)

Hard constraints from user feedback (do not reintroduce these):
- **No difficulty badges or filter buttons** (Warm-Up/Quiz/Challenge labels were removed entirely)
- **No boxed "card" styling** per problem — it read as visually distracting. Plain list only.
- Still *order* problems roughly easy→hard within each topic group, just don't label it.

Other conventions:
- Same CSS variables/fonts as existing pages (Fraunces + Inter + IBM Plex Mono),
  MathJax for inline math (`$...$`), `html{scroll-behavior:smooth;}` for the jump links.
- **Color scheme (as of 2026-08-03, applied to ledger + G1 + G2 + G3):** light/warm "happy"
  palette, not the original dark forest+gold theme. Copy the `:root` block from `G3.html`
  verbatim for new pages: `--bg:#fff8ee`, `--card:#fff`, `--ink:#332944`, `--ink-dim:#6d6079`,
  `--ink-faint:#a598ab`, `--core:#c9451f` (deep coral — used for text/borders, contrast-checked
  against the cream background), `--core-soft:#ff6b4a` (vibrant coral — decorative fills only,
  fails text contrast, never use for text), `--teal:#16816f` (secondary accent, used for
  diagram "object" lines). Body gets the two-radial-gradient wash (coral top-left, teal
  top-right) over `--bg`, see any G-page's `body{}` rule. The ledger additionally has
  `--optional` and `--grade-a..f` — reuse those exact values if a future page needs them.
- **Diagrams:** add inline SVG figures wherever a visual genuinely clarifies the problem
  (right-triangle trig, unit-circle angles, graphs of functions/lines, etc.) — don't force
  them where they don't help (pure algebra manipulation doesn't need a picture). See `G3.html`
  for the established pattern: `.fig-wrap` (single centered figure) / `.fig-row` (side-by-side
  panels), `.tri-edge`/`.tri-mark`/`.tri-arc`/`.tri-theta`/`.tri-lbl`/`.tri-lbl-dim`/`.tri-cap`
  CSS classes, `.tri-edge-accent` + `.kite-fill` for application-problem pictograms. For
  "sketch this from a ratio" problems, show a blank/`?`-labeled figure in the problem and the
  same figure fully labeled in the matching solution. Always give diagrams an `aria-label`.
- 20–30 **original** problems per standard — same style/difficulty as the real quizzes, not
  copies of the actual quiz numbers.
- Include story/word problems where they fit the topic naturally (encouraged by user, worked
  well for G1 composition and G2 linear modeling).
- Every solution must be worked by hand and double-checked before writing — arithmetic errors
  are worse than a boring problem.
- **Dollar signs in prose (currency) must be escaped as `\$`, never bare `$`.** A bare `$10` in
  running text opens a MathJax math region that doesn't close until the next literal `$`
  anywhere later on the page, silently mangling everything in between (and a stray `%` inside
  that runaway region acts as a LaTeX comment, eating even more). This bit G1 and G2 — both
  fixed 2026-08-03. Before shipping a page, verify delimiter parity: count unescaped `$` and
  confirm it's even (a python one-liner stripping `\$` first, then `str.count('$') % 2`).
- After building a page: sanity-check HTML tag balance (div/p/a/svg open vs close counts via a
  quick python/grep pass) *and* `$` parity, then `open <file>.html` so the user can review it
  in-browser.
- **Pause after each standard for feedback before starting the next one.** This is an explicit
  process requirement, not just good practice — the user wants to review one at a time.

## Known open issues (not blocking, but worth remembering)

- Several standards (D2, D3, A3, A4, I5) have no quiz source in the folder — flagged above.
- I6/I7 source folders are numbered I8/I9 — likely just a renumbering during the term, but
  unconfirmed; double check before building those two.
- G1 and G2 were built before the color-scheme/diagram conventions above existed. Their content
  is correct but they haven't been retrofitted with diagrams (G1 doesn't really need any; G2
  could benefit from a line-graph SVG in the "Applications" group — ask the user if desired).
- `math150/full-matrix.html` (built 2026-08-03) fills the previously-dead banner link. It derives
  a 5×5 "core standards passed" × "course %" grade cross-tab straight from the estimator's JS in
  the ledger (`calculateGrade()`) — each axis is graded independently against the same thresholds
  (90/80/70/60 for %, 23/21/19/17 for core) and the cell takes the *worse* of the two letters. If
  the estimator's thresholds ever change, this matrix must be regenerated to match (also update
  the optional-topics-boost footnote, which currently reflects the 85%-with-3-optionals rule).
