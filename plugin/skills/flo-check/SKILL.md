---
name: flo-check
description: Diagnose the toolkit and export progress. Use when the user says "check my setup", "is it working?", "funcționează?", "merge?", "export my progress", "what do you remember?", or reports the toolkit behaving strangely, in any language.
---

# Diagnostics & export

Mirror the student's language.

## "check my setup"
Verdict is CONDITIONAL — never claim OK without checking:
- flo skills loaded AND `study/` exists AND standing rules present in this session →
  "**Flo's Toolkit v1.1 (plugin) — setup OK**"
- skills loaded, no `study/` folder here → "**Flo's Toolkit v1.1 (plugin) — plugin
  OK, no study folder in this location**" (offer flo-setup, and check for a
  workspace nearby: `../study`, `*/study`).
- skills loaded but no standing rules / session greeting appeared → "**Flo's Toolkit
  v1.1 (plugin) — partial: always-on rules not loaded (hook didn't run)**" — skills
  still work fully when called.
Then 5 lines: skills available (list the flo-* skills you can see) / study folder
found yes-no / ledgers listed / always-on rules: loaded or not loaded / say
**make my exam kit** to start.
"what do you remember?" → summarize the ledgers in plain words; invite corrections.

## "is it working?"
Run and report pass/fail per check:
1. **Setup check** — as above.
2. **Ledger check** — validate each `study/ledger-*.md` against
   `${CLAUDE_PLUGIN_ROOT}/context/LEDGER-FORMAT.md`: header fields, HOT/COLD
   sections, stream caps respected, CANARY present. Report problems in plain words
   and offer to repair the file (fix structure, never invent progress data).
3. **Toolkit check** — one sample recall question + one grounded claim with pointer.

## "export my progress"
Emit the complete ledger file(s) verbatim in a copy block — they are already the
portable format; mention they can be re-attached in any Claude surface (claude.ai
Project, Desktop, Code) to migrate or back up. Exports are PERSONAL ("share
deliberately") — for sharing with classmates, offer the SHAREABLE deck/map variants
instead.

## Known failure modes (check in this order)
Skills respond but no memory of past sessions → is there a `study/` folder in THIS
directory? (State is per-folder; they may be in the wrong folder.) · Ledger stale →
was the last session ended abruptly? Rebuild the tail from `study/<course>/` decks.
· Standing behaviors absent between skill calls → the SessionStart hook may not
have fired (normal in some surfaces; skills still work fully).
