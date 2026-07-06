# Documentation Index — AI Academic Assistant Toolset

> **Purpose of this file:** entry point for any human or AI session resuming this project
> with zero prior context. Read this, then `00-charter.md`, then the decision log.
> Nothing in this project should require conversational memory to reconstruct.

## Methodology

This project is documented to a defend-it-before-a-hostile-committee standard, per the
owner's explicit instruction (2026-07-02). Concretely:

1. **Every design choice gets a decision-log entry** (ADR format: context, options,
   decision, justification, consequences, revisit triggers). No silent decisions.
2. **Load-bearing claims cite evidence.** Empirical claims about students, learning, or
   the market must trace to a source in `evidence/`, with verification status noted.
3. **Documents are self-contained.** A future session with no memory of this
   conversation must be able to continue the work from the docs alone.
4. **Superseded decisions are marked, never deleted.** The history of being wrong is
   part of the record.

## Map

| Path | What it is | Status |
|---|---|---|
| [00-charter.md](00-charter.md) | Vision, users, product shape, success criteria | Living |
| [decisions/decision-log.md](decisions/decision-log.md) | All architecture/design decisions (ADR format) | Living |
| [discovery/interview-log.md](discovery/interview-log.md) | Founder interview: every question, its rationale, the answer | Complete (rounds 1–2) |
| [discovery/open-questions.md](discovery/open-questions.md) | Unanswered questions blocking or shaping design | Awaiting answers |
| [evidence/student-ai-usage.md](evidence/student-ai-usage.md) | Evidence base front page: method, headline result, critique dispositions | Complete |
| [evidence/prioritization-memo.md](evidence/prioritization-memo.md) | Full v1 ranking memo (scoring, tensions, design implications) | Complete |
| [evidence/committee-critique.md](evidence/committee-critique.md) | Independent critic's 12 ranked attacks on the memo | Complete |
| [evidence/findings.json](evidence/findings.json) | All 84 raw findings with sources and verification verdicts | Complete |
| [design/v1-blueprint.md](design/v1-blueprint.md) | v1 product design (rev 3): core loop, capability matrix, components, milestones | **Cleared for M1 build** |
| [design/design-review.md](design/design-review.md) | Full adversarial review of rev 1 (8 lenses; verdict FLAWED) | Record |
| [design/delta-review-1.md](design/delta-review-1.md) | Delta review of rev 2 (NOT CLEARED: B1–B4 + 10 conditions) | Record |
| [design/review-dispositions.md](design/review-dispositions.md) | Disposition of all 29 findings + delta re-check verdicts | Complete |
| [design/m1-gate-checklist.md](design/m1-gate-checklist.md) | Executable M1 gate: build-time verifications + friend gate + drills | **Next up** |
| [risks/risk-register.md](risks/risk-register.md) | Known risks, severity, mitigations | Living |
| `../product/novice/` | **M1 deliverables**: instruction-pack.md (v1.1, 7,443/8,000 chars), SETUP.md (self-contained), CHEATSHEET.md, WHAT-IS-THIS.md | Built — untested |
| `../product/formats/LEDGER-FORMAT.md` | Canonical artifact spec: ledger schema, recaps, receipts, decks, sharing classes | Built — untested |
| `../product/runbooks/novice-tier.md` | Repair runbook + golden-session smoke test + update procedure | Built |
| `../plugin/` + `../.claude-plugin/` | **M2 deliverables**: installable plugin (8 skills, SessionStart hook, standing rules) + same-repo marketplace | Built — untested |
| `../product/power/INSTALL.md` | Plugin install guide: Desktop GUI, terminal, Cowork path + degradation story | Built |
| `../README.md` (repo root) | Public marketplace front page | Built |

## Project state (update on every significant step)

- **2026-07-02 (a)** — Project initiated. Discovery interview rounds 1–2 complete;
  foundational decisions ADR-0001…0008. Evidence workflow launched. Open questions issued.
- **2026-07-02 (b)** — Discovery COMPLETE: all open questions answered (rounds A–D);
  evidence workflow landed (84 findings, 15/15 verified claims survived); committee
  critique disposed point-by-point; ADR-0009…0013 logged; charter and risk register
  updated with first-cohort facts (~90% on Claude Pro — the competitor is unaugmented
  Claude itself). **v1 design blueprint drafted** (`design/v1-blueprint.md`).
- **2026-07-02 (c)** — Blueprint owner-reviewed: name locked **Flo's Toolkit**
  (ADR-0014), command set locked at five with `/explain` added (ADR-0015), M1 scope
  approved as drafted, full multi-agent adversarial design review commissioned.
- **2026-07-02 (d)** — Cohort story recorded (`discovery/cohort-story.md`, failure
  mechanisms F1–F3). **Adversarial design review returned verdict FLAWED** (8 lenses,
  61 findings → 7 critical / 16 major / 6 minor; `design/design-review.md`): the
  novice tier rested on two nonexistent platform capabilities (no Project-knowledge
  write path; no Pro template sharing) and the retrieval leg had no cue. **Blueprint
  rewritten as rev 2** with all findings disposed (`design/review-dispositions.md`):
  student-executed save ritual, guided self-verifying setup, cue layer (footer +
  .ics + delay discipline), retrieval-fidelity/calibration/grounding/ledger-schema
  specs, Cowork middle tier, consolidated M1 gate. ADR-0003/0012 amended; R-13 added;
  R-09 checklist written.
- **2026-07-02 (e)** — Delta review: rev 2 NOT CLEARED (B1–B4 + 10 conditions). Rev 3
  resolved all; bounded re-check **CLEARED** (all residuals landed, incl. log-stream
  rollup rules that saved the cold-budget arithmetic). **M1 BUILT** in
  `product/`: instruction pack (6,594/8,000 chars, written to the §5F budget),
  self-contained SETUP.md, LEDGER-FORMAT.md, cheat sheet, repair runbook +
  golden-session smoke test. Next: owner executes
  [design/m1-gate-checklist.md](design/m1-gate-checklist.md) — build-time
  verifications first (ten-minute reality test on a second account, .ics check,
  Cowork probe, adherence test), then the two-friend gate.
- **2026-07-02 (f)** — **v1.1, owner-directed (ADR-0016–0018), blueprint rev 4:**
  (1) PromptForge — vague messages auto-trigger 6–10 tap-answer clarifying questions
  → improved prompt → A/B/C confirm (dissent on intensity recorded; gate measures
  tolerance); (2) manual save ritual **abolished** — persistence rides claude.ai
  project-scoped memory, curated by PROGRESS RECAP emissions; ledger file demoted to
  on-demand export; receipts to fallback; setup gains "enable Memory" as Step 1;
  (3) always-on scope — every message routed, GENERAL COACHING default lane. Pack
  v1.1 = 7,443/8,000 chars; SETUP/CHEATSHEET/WHAT-IS-THIS/runbook/golden-session all
  regenerated. Rev-3 clearance partially superseded → **memory-persistence
  build-time test is now the load-bearing gate item** (fail → rev-3 ritual returns
  or Desktop tier becomes default).
- **2026-07-02 (g)** — **M2 BUILT (ADR-0019):** the repo is now an installable
  plugin marketplace. `/plugin marketplace add <repo>` + `/plugin install
  flo-toolkit@flo-toolkit` delivers 8 skills (five jobs + forge + setup +
  diagnostics), a SessionStart hook injecting standing rules + ledger hot state in
  `study/` folders (silent elsewhere), and file-backed ledgers Claude writes itself
  — no memory dependency, item-level precision restored. Cowork strategy:
  skills-complete/hook-enhancement, so any subset Cowork loads still works; the
  Cowork empirical test is on the gate checklist (M2 section). Repo-root README +
  [power INSTALL guide](../product/power/INSTALL.md) written. Adversarial plugin
  review launched. **Repo still uncommitted — first commit recommended.**
- **2026-07-02 (h)** — **Plugin review returned FIX FIRST**
  ([design/plugin-review.md](design/plugin-review.md): 4 lenses, 35 deduplicated
  findings, blockers B1–B5). **All file-level fixes applied** (F2–F35):
  `.gitattributes` (CRLF bomb), hook rewritten (cwd anchor, 9K budget guard,
  excerpt-only awk, visible failure, matcher+timeout+exec form), marketplace schema
  cleaned, flo-check verdicts made conditional with hook-status line, v1.0→v1.1
  template drift fixed everywhere, tier-neutral format prose, sharing/canary/cost
  rules restored to plugin, study/-guards on all writing skills, duplicate-workspace
  pre-check, INSTALL rewritten (real command flow, Git-for-Windows prereq, honest
  two-part Cowork test + lost-features list, local-path fallback). SETUP.md
  regenerated (pack 7,454/8,000 — "consecutive" restored per blueprint).
  **Remaining blocker: B1 — repo has no commits and no GitHub remote; nothing is
  installable until published.** Gate items unchanged (live-install checks).
- **2026-07-06 (i)** — **MERGE with the Overmind harness project (ADR-0020).** This
  repo (`flo-toolkit-unified`) is a fresh copy of the Flo's Toolkit base (git history
  and the bulky export dropped) into which *proven, compatible* knowledge from a
  separately-evaluated Claude-Code harness was incorporated as a knowledge donor.
  See [merge/MERGE-PLAN.md](merge/MERGE-PLAN.md) for the full transfer table. New
  ADRs **0020–0025**: merge governance; **PromptForge enriched** with verbatim-quote
  + unstated-decision discipline (the owner's new input-improvement focus, ADR-0021);
  **grounding upgraded + power-tier cross-model verification** (ADR-0022, from the
  eval finding that self-written checks share the code's blind spots); **research
  pipeline recognized as the Reading&research engine** (ADR-0023); **bash hook
  superseded by a cross-platform Node exec-form hook** (ADR-0024 — fixes the whole
  plugin-review cross-platform cluster; behavior-parity tested, plugin validates);
  **capability matrix amended** for claude.ai Skills upload + in-app plugin Directory
  ("Add from a repository") + `claude plugin validate` (ADR-0025 — resolves the open
  "command vehicle" question and the stale install-path findings). Excluded on both
  projects' evidence: heavy orchestration (differential oracle, long-haul engine,
  best-of-2) — behavioral discipline pays, orchestration doesn't. **No Flo gate was
  closed by the merge** — all owed gates (M1 checklist, memory-persistence test,
  Cowork test, repo publication, friend observations, reading list) remain open.
