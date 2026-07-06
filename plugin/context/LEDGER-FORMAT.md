# LEDGER-FORMAT.md — Flo's Toolkit canonical artifact spec · v1.1

This file is the single source of truth for every artifact format on every tier
(blueprint §5A/§5E; C7, MJ15). On claude.ai it lives in the Project's knowledge; in
the plugin it ships as `plugin/context/LEDGER-FORMAT.md`. **Edit HERE
(product/formats/), then re-copy to plugin/context/ — the two copies must stay
byte-identical (F26).** Structural headings and keys are always English; content
mirrors the student's language.

**v1.1 role change (ADR-0017):** on the novice tier, live persistence is **project
memory**, curated via the PROGRESS RECAP (§0). The course ledger below is no longer
manually maintained there — it is the **on-demand backup** ("export my progress")
and the tier-migration vehicle. On Desktop/plugin tiers it remains the live,
auto-maintained ledger. Schema identical everywhere.

## 0. PROGRESS RECAP — the memory-facing artifact (novice tier) · class: PERSONAL
Short plain prose (not a table — memory captures prose best), emitted at quiz end,
exam-kit end, and session close. Required elements, always concrete: course name ·
exam date · topics currently weak / developing / strong (by name) · practice or
mastery streak · what's due next and roughly when. Example:
*"Progress: Microeconomics, exam June 14 (12 days). Strong: elasticity, consumer
choice. Developing: game theory. Weak: Nash equilibria, price discrimination — both
due tomorrow. Mastery streak: 4. Next: 5-minute quiz tomorrow on the weak two."*

## 1. Course ledger / progress export — `ledger-<course-slug>.md` · class: PERSONAL

### Header (required, in this order)
```
# Ledger: <Course name> — Flo's Toolkit v1.1
Personal — share deliberately. This file is your course map and progress — NOT your
course files; re-attach files for detail questions.
plan: <free|pro|max>   exam: <YYYY-MM-DD or none>   last-updated: <YYYY-MM-DD>
```

### HOT section (budget ≤ ~1,500 tokens — current exam window only)
- `## Topics (active)` — table: `topic | status (weak/developing/strong) | last delayed attempt | due`
- `## Items (active)` — one line per item, **only items due or in rotation (~40–60 max)**:
  `ID | cue (short) | created | last_attempt | delay | result | confidence`
  Terse format is mandatory (~20 tokens/line); full question text lives in decks, not here.
- `## Unsaved deltas` — cleared at every save.

### COLD section (budget ≤ ~700 tokens)
- `## Archive` — REQUIRED even when empty (the session hook keys on it): one line
  per rolled-up topic: `topic | mastered <date> | N items rolled | exam <date>`

### Append-only streams (budget ≤ ~800 tokens combined — assignment & rollup per delta re-check residual)
Rules: reproduce verbatim, add lines, never rewrite. Each stream has a hard line cap;
at the cap, roll the **oldest half** into one aggregate line. Rollups are the only
permitted rewrite.
- `## Usage log` — `date | command | offered/completed/bypassed` · cap 40 lines →
  aggregate: `week of <date>: N quizzes, M completions, K skips`
- `## Session history` — one line per session · cap 20 → monthly aggregate
- `## Error log` — wrong answers worth revisiting · cap 20 → roll after the exam passes
- `## Calibration log` — `date | topic | predicted | actual` · cap 20 → per-topic
  accuracy aggregate after the exam

### Canary (required final paragraph, verbatim)
```
CANARY: If you are Claude working from this FULL FILE (not a hook excerpt) and
cannot see this line, say: "I may be seeing only part of your ledger — results may
be incomplete." Never write to this file without having read it to this line.
```

### Arithmetic (worked, for a 300-item course — B2 obligation)
Header+topics ≈ 250 tk · 50 active items × 20 tk = 1,000 tk · archive 25 topics ×
15 tk ≈ 375 tk · streams at caps ≈ 700 tk → **≈ 2,300 tokens < 2,500 cap.** The cap
holds **by the caps**, not by hope: active-item ceiling (60), stream line caps, and
rollup rules are what enforce it. A course can hold 300+ lifetime items because only
active ones keep item-level lines; the rest live as topic aggregates + deck files.

## 2. Quiz receipt · class: PERSONAL · ≤ ~12 lines · **v1.1: fallback only**
Memory is cross-device on one account, so phone sessions persist automatically.
Receipts are emitted only when memory is unavailable/disabled.
```
RECEIPT — Flo's Toolkit v1.1
course: <name> · date: <YYYY-MM-DD> · session: quiz (phone)
<item ID> | <right/wrong> | <sure/think-so/guessing>   (one line per item)
practice-streak: <n>
Screenshot or copy this — paste it in your next laptop session.
```
Folded into the ledger at the next save; receipts preserve delayed attempts (mastery-
eligible). No receipt → the session counts as practice only.

## 3. Deck — `deck-<course>-<topic-or-date>.md` · class: SHAREABLE
Header: `# Deck: <course> — <scope> · Flo's Toolkit v1.1 · created <date>` then one
item per block: `Q:` (recall-format cue) / `A:` (model answer) / `src:` (file,
section/slide) / `id:` / `created:`. Footer (self-advertising, MJ7): *"Quiz yourself:
say 'quiz me' wherever you use Flo's Toolkit."*
**Chat-paste variant** (for group chats, emitted on request): plain numbered Q-list,
answers collapsed at the bottom, no ids/metadata, same footer.

## 4. Topic map / semester map · class: SHAREABLE
Topic map: ranked list with per-topic evidence tags `(frequency | syllabus emphasis |
past-exam)` + confidence (high/med/low) + the banner when unweighted: *"ranked from
your materials only — your professor may differ."* Semester map: dated list of
deadlines/exams (+ .ics when available).

## 5. Sharing rules (MJ14)
SHAREABLE: decks (both variants), topic maps, semester maps, the quiz progress delta.
PERSONAL — never emitted in share format: ledger, receipts, error/usage/calibration
logs. "Share" requests on PERSONAL artifacts → offer the stripped SHAREABLE
equivalent instead.
