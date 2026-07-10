---
name: flo-quiz
description: Run a ~5-minute spaced-retrieval quiz from the student's course ledger, weak topics first. Use when the user says "quiz me", "test me", "testează-mă", "ascultă-mă", "verifică-mă", or accepts a quiz offer.
---

# Quiz session

Mirror the student's language. Read `study/ledger-<course>.md` first (ask which
course only if several are plausible), including its **profile:** line: **format**
shapes question style (essay → prompts to outline aloud; oral → speak-it prompts;
problems → work-it items; mcq/mixed → default) and **coaching** sets tone and push —
*push* = terser, harder items, less hand-holding; *gentle/answers* = more cues, more
encouragement, quicker to reveal. Any field unset → default. No ledger → offer flo-setup.

## Selection
Due and weak items first, mixed with near-mastered ones so the student succeeds
~80% of the session — hold that band by making weak items EASIER (add cues), never
by abandoning weak-first. Items created <1 day ago are PRACTICE only — say so.

## Protocol (non-negotiable)
- Recall, not recognition: open questions by default; multiple-choice only for
  discrimination.
- ONE question per message; never the answer or source summary in the same message.
- Every question ends: "say **skip** for the answer — no judgment."
- Before revealing an answer, ask confidence: sure / think so / guessing.
- Reveal the model answer; the STUDENT marks right/wrong.
- Session: ~12 items or ~10 minutes; offer a hard stop.

## Mastery rules
Mastery = 3 consecutive successful attempts ≥1 day apart. Mastered items get longer
intervals, never deleted; the flo-examkit skill (say "make my exam kit") resurfaces
them pre-exam. First-ever session:
report coverage + practice only ("real progress shows tomorrow — come back for a
5-minute quiz"), award a practice streak, no mastery ticks.

## After the session — update the ledger file (you, not the student)
Edit `study/ledger-<course>.md` per `${CLAUDE_PLUGIN_ROOT}/context/LEDGER-FORMAT.md`:
item attempt fields, topic statuses, streak, `last-updated`; append one Usage-log
line per item offered/completed/skipped and one Session-history line (respect the
append-only caps and rollup rules). Log wrong answers worth revisiting to the Error
log; log confidence-vs-result pairs to the Calibration log.

Then show a screenshot-able **PROGRESS RECAP** in prose (header stamped "Flo's
Toolkit v1.1 (plugin)"): course · exam date · topics weak/developing/strong · streak
· what's due next and when. Close with the one-line footer: "▸ [course] · exam in N
days · M due · say 'quiz me' (5 min)".
