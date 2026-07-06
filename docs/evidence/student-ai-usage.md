# Evidence Base — Student AI Usage & Learning Science

**Produced:** 2026-07-02 · **Method:** 22-agent research workflow (ADR-0007): five
parallel sweep facets (usage surveys, discipline differences, learning science,
failure modes, competitive landscape) → adversarial verification of load-bearing
claims → synthesis → independent committee critique.
**Volume:** 84 findings (51 rated strong); 15 load-bearing claims adversarially
checked against primary sources — **15/15 survived**; 36 strong findings pass through
flagged *unverified*. One retracted meta-analysis (Wang & Fan, g=0.867) excluded.

## Contents

| File | What it is |
|---|---|
| [prioritization-memo.md](prioritization-memo.md) | The v1 jobs-to-be-done ranking with scoring, tension analysis, discipline notes, and design implications |
| [committee-critique.md](committee-critique.md) | Independent completeness critic's 12 ranked attacks on the memo |
| [findings.json](findings.json) | All 84 raw findings with sources, strength ratings, and verification verdicts |

## Headline result

**v1 priority: (1) Study & memory systems — core loop · (2) Reading & research —
intake funnel · (3) Planning & routines — thin scaffold that matures with the
automation roadmap · (4) Writing — feedback engine only.**
Recommended effort allocation ≈ 50 / 25 / 15 / 10. Full scoring in the memo; adopted
with amendments as ADR-0009.

## Critique disposition (the defense record)

Every committee attack gets a disposition: **Resolved** (answered by data),
**Accepted** (valid — becomes a risk, requirement, or backlog item), or
**Contested** (we argue back, on the record).

| # | Attack (abridged) | Disposition |
|---|---|---|
| 1 | Study & memory's Usage=4 double-counts: it scores the *demanded* behavior (explanations), not the *sold* behavior (retrieval, used by ~2–11%) | **Accepted as reframe, ranking stands.** The product thesis is precisely a *conversion* play: meet the #1 demanded behavior, emit retrieval artifacts from it. Under the critic's rescoring, S&M (~3.4–3.8) and R&R (~3.5) form a joint top cluster — which is exactly what the blueprint builds (S&M core + R&R intake as one loop). The conversion hypothesis is explicitly unproven; the quiz-first completion-vs-bypass metric is its test (ADR-0009). |
| 2 | Zero primary research on the actual first cohort; all prevalence data foreign | **Partially resolved post-hoc.** Discovery rounds A–D (interview log, 2026-07-02) collected first-party cohort data: failure points (distraction, passive rereading, can't triage material — *not* late starting), AI habits (one-liners, summarize-and-stop, copy-paste), assessment mix (essays + closed-book exams), materials mostly digital, ~90% already on Claude Pro. Remaining gap → backlog: structured sit-down observations of 2–3 friends before build (OQ-1 stories still owed). |
| 3 | Bastani et al. (quiz-first cornerstone) is Turkish *high-school math* — transferability to university/mixed-discipline unflagged | **Accepted.** Quiz-first stays as default (cheap if it doesn't transfer, high value if it does) but is demoted from "verified causal" to "verified in adjacent population." Local calibration checks in the product measure whether the pattern holds in our cohort. |
| 4 | All three Differentiation-5 scores rest on unverified vendor pages; one incumbent release could erase the gaps | **Accepted** → risk R-10 + quarterly incumbent scan. Contingency position: the moat is persistence + cross-surface integration depth, not any single feature. |
| 5 | Retrieval-practice effect sizes assume human-authored items; LLM-generated flashcard quality literature never searched | **Accepted** → risk R-11 + design requirement: item-quality pass (self-critique, duplicate/hallucination filter, user flagging) in every deck pipeline; literature check added to design-phase reading list. |
| 6 | Testing-effect boundary conditions (complex materials, higher-order tasks) unexplored | **Accepted, scoped.** v1 retrieval targets factual/conceptual layers; essay-level mastery routes to the writing-feedback engine; complex materials get self-explanation prompts, not raw flashcards. |
| 7 | GDPR / EU AI Act exposure for mastery ledgers and telemetry — unexamined, Romania-based builder | **Accepted** → risk R-09 + hard constraints: local-first, user-owned human-readable files; no remote telemetry (ADR-0012 already chose local counters); formal review gate before public release. |
| 8 | "Answer always reachable" is itself a bypassable toggle; adherence assumed, not evidenced | **Contested in part.** Unlike incumbent mode-toggles, artifacts persist regardless of bypass (the deck exists even if the quiz is skipped) — the design's value doesn't zero out on bypass. But the adherence concern is valid → risk R-12; dropout/desirable-difficulties literature on the reading list; bypass rate is the honest headline metric. |
| 9 | Uneven standards: Anki correlational cohort feeds Impact=5 while planning was docked for correlational evidence | **Accepted.** UCF Anki stat demoted to anecdote. Impact=5 stands on the RCT/meta-analytic base alone (Roediger & Karpicke; Cepeda; Latimier; Adesope; Kestin) — which it does. |
| 10 | Grad students, working students, disabilities, Romanian-language quiz quality unexamined | **Accepted** → backlog. Romanian-language item quality becomes a pre-launch test gate (interacts with ADR-0010 language policy). |
| 11 | Help-seeking is social (84% ask people first); solo-tool thesis never confronted | **Accepted, design hook.** Group features stay out of v1, but all artifacts are shareable files by design — decks and ledgers can travel through the group chats where the cohort already lives (Round A: phone-first socials). |
| 12 | Both tiers presuppose Claude access in a cohort where ~11% pay for AI | **Resolved for the first cohort:** Round C data — ~90% of the owner's friends are already on Claude Pro, few free, few/none Max. The attack retains force for the *general public* tier → free-tier graceful degradation remains a requirement (ADR-0005). |

## Standing obligations created by this evidence base

1. Quarterly incumbent re-scan; annual survey-cycle re-check of the ranking (ADR-0007).
2. Pre-build: observe 2–3 friends studying (the owed OQ-1 stories).
3. Pre-launch gates: Romanian item-quality test; GDPR review.
4. Reading list for design phase: LLM-generated question validity; spaced-repetition
   dropout/adherence; desirable-difficulties abandonment.
