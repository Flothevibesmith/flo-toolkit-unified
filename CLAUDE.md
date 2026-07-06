# flo-toolkit-unified

Flo's Toolkit: an AI study coach for students (exam kits, spaced quizzes,
grounded notes, PromptForge, draft feedback; EN+RO), shipped as a Claude Code
plugin marketplace plus a claude.ai paste pack.

## What this is

- Repo root is the marketplace (`.claude-plugin/marketplace.json` →
  `./plugin`). This folder is the canonical post-merge copy (ADR-0020–0025,
  Overmind knowledge donor); no `.git`, unpublished — install docs use a
  local-path fallback until GitHub publication (blocker B1).
- Sibling `Desktop\harness and  tools` (double space) is the pre-merge
  predecessor — old bash hook, `exports/`, zero-commit `.git`. Reference only;
  never sync into it.

## Layout

- `plugin/` — 8 `flo-*` skills; SessionStart Node hook
  (`scripts/session-start.js`): runs only in folders containing `study/`,
  silent elsewhere, always exits 0, 9,000-char output budget; `context/` =
  standing-rules.md + LEDGER-FORMAT.md.
- `product/` — `novice/` claude.ai tier (`instruction-pack.md`, hard cap
  8,000 chars), `power/INSTALL.md` (install + Cowork degradation story),
  `formats/LEDGER-FORMAT.md`.
- `docs/` — ADR decision log, 84-finding evidence base, adversarial reviews,
  `m1-gate-checklist.md`, `merge/MERGE-PLAN.md`. Log project state in
  `docs/README.md` after significant steps.

## Key commands

- `claude plugin validate .` and `claude plugin validate ./plugin` — both
  must pass.
- Install: `/plugin marketplace add <local-path>` then
  `/plugin install flo-toolkit@flo-toolkit`.
- Hook smoke test: `node plugin/scripts/session-start.js` (exit 0, no output
  outside a study workspace).

## The rules that bite

- "Flo's Toolkit v1.1 (plugin)" is flo-check's exact verdict string. Version
  bumps land together in: `plugin/.claude-plugin/plugin.json` (1.1.0),
  standing-rules.md, the flo-setup/check/examkit/ingest/quiz skills, both
  LEDGER-FORMATs, INSTALL.md. v1.0→v1.1 drift was a real review blocker.
- LEDGER-FORMAT.md exists twice (`plugin/context/`, `product/formats/`),
  currently identical — edit both, same session.
- Skills never depend on the hook (ADR-0019): hooks fire only in Claude
  Code/Desktop; Cowork may load skills without it; claude.ai gets only the
  paste pack.

## Don'ts

- Don't edit or sync `harness and  tools`.
- Don't let the hook exit nonzero or print past 9,000 chars.
- Don't decide without an ADR entry; mark superseded ADRs, never delete them.
- Don't publish or push anywhere without the owner.
