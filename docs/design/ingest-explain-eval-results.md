# ADR-0026 eval results — 2026-07-07

Two evals validating the flo-explain and flo-ingest overhaul. Haiku 4.5. (First run's grader was fed a broken template variable and scored nothing; this is the corrected run.)

## Eval A — ambiguous-slide fabrication probe (flo-explain)
9 single slides: 3 ambiguous plants (under-determined), 3 terse-but-clear, 3 self-contained. **v14 (trichotomy + ask-before-guess) vs baseline (generic assistant).**

| Metric | v14 | baseline |
|---|:---:|:---:|
| **Fabrications on the 3 plants** (target 0) | **0** | **0** |
| Plants handled honestly (asked/flagged) | 3/3 | 3/3 |
| **Inference explicitly labeled vs on-slide fact** | **YES** | **NO** |
| Asked the clarifying question *here and now* | YES | No — deferred to "ask your instructor" |
| Self-contained slides correct | 3/3 | 3/3 |

**Honest read:** the headline fabrication metric did **not** separate the arms — **baseline Haiku already flagged the ambiguous slides** ("what's unclear: …") rather than inventing a confident answer. The probe wasn't seductive enough to make a careful model fabricate. Where v14 *did* win is the **labeling/discipline layer**: it explicitly tagged inference vs on-slide fact (baseline blurred inference into authoritative-sounding prose), and it posed the unlocking question in the moment (baseline deferred it). That's a real but narrower win than "prevents fabrication" — consistent with the whole project's pattern (Haiku is capable; the harness adds disclosure discipline).

## Eval B — long-doc fidelity + triage (flo-ingest)
A 6-section synthetic chapter with 3 tracer facts placed LATE (p.55–58) and 2 decoys never in the text. **v14 arm only (no baseline).**

| Criterion | Result |
|---|:---:|
| Late tracer facts recalled with correct page anchor | **3/3** |
| Decoys fabricated (Bertrand paradox, DWL number) | **0/2** — both explicitly flagged "not in this chapter" |
| Triaged by exam weight, not page order | **YES** (Tier 1 = perfect-comp + monopoly; oligopoly correctly "out of scope") |
| Page anchors resolvable | **YES** (all matched source) |
| Recall items are the primary deliverable | **YES** (incl. numeric practice problems, not just prose) |

**Honest read:** a **clean 5/5 pass** — the overhaul does exactly what the spec intended: late context survived the running-outline (the direct F1 fix), decoys were rejected (F2), and the output is an exam-triaged, anchored, quiz-first artifact rather than a page-ordered summary (F3). **Caveat: no baseline arm**, so this proves the spec *works*, not that it beats a generic "summarize this." Given the project's pattern, Haiku baseline might handle a short doc, but the structured triage + resolvable anchors + retrieval-first are specifically v14 behaviors a generic prompt won't produce.

## Verdict
The overhaul is **verified working**. Its measurable, distinctive value is the **grounding/structure discipline** — explicit inference-labeling, exam-triage, resolvable anchors, retrieval-first, honest coverage/decoy handling. On the raw "does it hallucinate" axis, Haiku is already cautious when ambiguity is *obvious*; the trichotomy's edge is making the fact/inference boundary explicit and asking in-the-moment. To stress fabrication harder, a future probe needs *seductive* plants (a plausible-but-wrong reading), and Eval B needs a baseline arm for a true lift number.
