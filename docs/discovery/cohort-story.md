# Cohort Story — the composite failure pattern (OQ-1 delivery)

**Recorded:** 2026-07-02 · **Source:** owner, near-verbatim — "the general story I hear
all the time and it fits my friends' stories." Composite rather than individual
observations; individual sit-down observations remain a nice-to-have for M1 testing.

## The story as told

Friends use AI mostly via claude.ai. They constantly upload documents into individual
conversations and therefore lose context over time. They don't prompt for adversarial
review, so information gets hallucinated or is never confirmed by any source. Their
summaries are mediocre and not focused on the exam, because they don't even know what
to upload — and most give very vague, short prompts.

## Decomposed: three failure mechanisms → three design obligations

| # | Observed mechanism | Root cause | Design obligation (M1) |
|---|---|---|---|
| F1 | **Context loss** — same docs re-uploaded per conversation; every chat starts from zero | They don't use claude.ai **Projects** at all; no persistence layer in their workflow | The ledger/Project architecture is the direct fix — and onboarding must treat *one-time Project setup* as THE critical step, not an optional nicety. First-session success = the second conversation already knows their course. |
| F2 | **Unverified output** — no adversarial-review prompting; hallucinations uncaught, claims never source-checked | Novices don't know verification is *their* job, let alone how to ask for it | **Source-grounding rules baked into the Project instructions** (new requirement, not yet in blueprint §4): answers about course material cite where in the uploaded materials each claim comes from; claims from outside the materials are labeled as such; a standing "verify this" behavior is available in plain language. The user should never need to know the *word* "hallucination" to be protected from one. |
| F3 | **Mid, exam-unfocused summaries** — wrong/incomplete inputs, vague two-line prompts | They don't know what to upload or what to ask for | The `/examkit` triage already targets this; add a **gather checklist** to onboarding (syllabus, slides, seminar notes, past exams if legal) and design all five commands so that *vague input still yields structured output* — the command encodes the prompt engineering so the student doesn't have to. |

## Why this matters for the thesis

The story independently confirms the project's core claim (the gap is workflow skill,
not model capability) and — importantly — shows the cohort's pain is upstream of
studying itself: **their AI workflow fails before any learning technique gets a
chance.** F1–F3 are all solved by packaging, which is precisely what a toolkit can
ship. It also hands the review panel a concrete test: does the blueprint, as designed,
actually eliminate F1, F2, and F3 for a student who changes nothing about their own
behavior?
