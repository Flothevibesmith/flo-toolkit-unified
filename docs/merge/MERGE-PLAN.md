# Merge plan — Flo's Toolkit ⨝ Overmind harness knowledge

**Date:** 2026-07-06 · **Direction:** Flo's Toolkit is the **product** (canonical base); the Overmind harness project is a **knowledge donor**. Nothing from Flo's Toolkit is discarded; Overmind contributes only what is *proven* and *compatible with the locked ADRs*.

**Governing principle (the load-bearing asymmetry).** Flo's Toolkit already discovered, independently, the single most important thing Overmind's evals proved: **behavioral discipline pays off; heavy orchestration does not** (Flo: R-11/R-12, the ≥80% adherence gate, "don't keep rewriting the pack → migrate tiers"; Overmind: measured evals where P4/P8/P9 orchestration lost to solo Haiku, while honesty/disclosure/research-depth/memory disciplines reliably helped). **These two projects are the same thesis reached from opposite ends.** So Overmind's contribution is almost entirely at the *behavioral/discipline* layer, and — where it needs machinery — **only in the power tier (Claude Code plugin)**, never as a novice-tier dependency.

**The tier law that constrains every graft** (Flo blueprint §4, ADR-0019): novice tier (claude.ai) = probabilistic, 8,000-char instruction budget, no filesystem, no hooks; power tier (Claude Code plugin) = deterministic hooks/skills, real `study/` files. **A behavioral rule can live on both tiers; a mechanism can live only on the power tier.**

---

## Knowledge-transfer table

| Overmind finding (proven) | Where it lands in Flo's Toolkit | Tier | Constraint it must respect | ADR |
|---|---|---|---|---|
| **Spec-audit / input-clarification** (narrow passes; verbatim-quote rule cut fabrication 1→0; ambiguity ledger surfaces silent decisions) | **Enriches `flo-forge` (PromptForge)** — the input-improvement centerpiece. Adds: quote the assignment/rubric *verbatim* when clarifying (never paraphrase requirements); surface unstated decisions the student didn't specify. | both | Single forge gate only (ADR-0016 "never forge twice"); novice within the 900-char forge budget (§5F rank 5) | ADR-0021 |
| **Honesty gate / anti-fabrication** (verbatim quoting killed fabrication; no claim without evidence) | Upgrades the **Grounding** rule (instruction-pack + standing-rules) from a single silent re-check to a *named-source-or-labeled* discipline; feeds `flo-ingest`/`flo-examkit` item-quality (R-11). | both | Never becomes policing/refusal (ADR-0004 productivity-first) | ADR-0022 |
| **Cross-model verification** (self-written tests share the code's blind spots → confident false passes; a *different* model must confirm high-stakes output) | **Power tier only:** `flo-check`'s "is it working?" and the item-quality pass may spawn a fresh-context verifier for high-stakes decks/exam-kits. Novice tier keeps the budget-bound self-check (no subagents there). | power | Novice tier cannot spawn agents — behavioral self-check only | ADR-0022 |
| **Research-depth pipeline** (contrarian angle + source tiering + primary-source verification; depth 3→9) | Is the **reusable engine** behind the Reading & research tier (evidence facet, 25%) *and* the standing "quarterly incumbent re-scan" (ADR-0007) — recognized as the same 22-agent method that built Flo's evidence base, not new scope. | power | Heavy — power tier only; must respect quota/cost class | ADR-0023 |
| **Vault memory** (file-based, wikilinks, capture/retrieval reflexes; 8/8 recall proven) | Maps onto the **plugin tier's `study/` ledger files** (ADR-0019), which already ARE a file-based memory. Contributes: the capture-reflex discipline and cross-project profile idea. **Does NOT apply to novice tier** (Claude can't write Project knowledge — ADR-0017). | power | Local-first, human-readable, no telemetry (ADR-0012, R-09); memory is "never load-bearing" on novice (delta-review B-lane) | — (folded into ADR-0019 note) |
| **Node exec-form hooks** (cross-platform: no CRLF risk, `${CLAUDE_PLUGIN_ROOT}` path resolution, fail-safe, validated by `claude plugin validate`) | Replaces/augments the `bash` `session-start.sh` — directly fixes plugin-review B2 (CRLF), F2/F6/F7/F21/F22 (hook cross-platform cluster). | power | Skills-complete/hook-enhancement (ADR-0019): hook stays optional, never a dependency | ADR-0024 |
| **Platform facts** (claude.ai now has **Skills upload** *and* an **in-app plugin Directory with "Add from a repository"**; the plugin community-directory submission path; `claude plugin validate`) | **Amends the capability matrix** (ADR-0003 / blueprint §4) — post-dates the corpus's July-2026 snapshot. Resolves the open "command vehicle" question (§3) and the install-path findings (INSTALL B5, plugin-review §5). | all | Must be re-verified at build via the "ten-minute reality test" (MJ6) — treated as new matrix rows, not settled | ADR-0021, ADR-0025 |
| **Eval methodology** (before/after with a hidden objective oracle + honesty metric; grader drives the real artifact) | Becomes the measurement engine for Flo's **golden-session smoke test** (novice-tier.md 12-row table) and the M1 gate readings — new rows, not a parallel framework. | both | Local-only, no telemetry (ADR-0012) | ADR-0025 |
| **"Off-by-default" toggle discipline** (every scaffold ships behind a toggle carrying its weakness-assumption; `/audit` retires stale ones) | Reinforces Flo's own revisit-trigger and tier-migration discipline. The heavy Overmind mechanisms (research pipeline, cross-model verify) ship **opt-in** in the power tier. | power | — | ADR-0023 |

---

## What is explicitly NOT merged (honest exclusions)

- **P4 differential oracle, P8 long-haul engine, P9 best-of-2** — Overmind's own evals showed these did not pay off on small-model / well-specified tasks and sometimes backfired (broken deliverable, dressed-up false pass). They contradict Flo's lean-tier law and its "don't add orchestration" instinct. Excluded from the product; the *lessons* (cross-model beats self-verification; check the deliverable loads) are kept as behavioral rules.
- **Overmind's own docs/config format** — Flo's ADR + evidence-base methodology (ADR-0001) is preserved; Overmind's `config.json`/`forgeprompt.md` structure is not imported (would fork the doc standard).
- **A second clarification gate** — spec-audit does not become a rival to PromptForge; it *enriches* the one forge gate (ADR-0016 constraint).

## Open items this merge inherits (unchanged, still owed)

All of Flo's pre-existing gates remain open and binding: the M1 gate checklist (unrun), the memory-persistence test (ADR-0017, determines the novice persistence mechanism), the Cowork empirical test, repo publication (B1 — nothing installable yet), the owed friend-observation stories, and the pre-M1 reading list (R-11 item-quality literature). **The merge adds capability and resolves stale platform facts; it does not close any of Flo's owed gates.**
