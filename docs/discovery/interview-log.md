# Discovery Interview Log

**Date:** 2026-07-02 · **Format:** structured multiple-choice rounds (with free-text
override) + open-ended written questions. Each question records *why it was asked* —
the design fork it resolves — so future readers can judge whether the fork was framed
fairly.

## Round 1 — Foundational forks

### Q1. Who is "user #1"?
**Why asked:** every downstream choice (onboarding, jargon level, install path)
inherits from this. The classic failure is building for oneself and never shipping the
novice version.
**Options:** novice friends first (recommended) / owner first / both tiers / general public.
**Answer:** **Both tiers from day one.** → ADR-0002.

### Q2. Delivery vehicle?
**Why asked:** the biggest technical fork; determines what "installable" and "fire and
forget" can even mean. Claude Code = full automation, install friction; claude.ai =
zero install, no background automation; hosted MCP = infrastructure the owner can't fund.
**Options:** Claude Code plugin (recommended) / claude.ai zero-install pack / MCP server / hybrid staged.
**Answer (custom):** both the plugin and the zero-install pack; users should be able
to use **all 3 methods of using Claude** to the fullest; the claude.ai tier must have
**"meaningful impact on every message they send."** → ADR-0003.
**Interviewer note:** "all 3 methods" interpreted as claude.ai apps / Claude Desktop /
Claude Code — flagged for confirmation in open-questions.

### Q3. Academic-integrity stance? *(first attempt)*
**Why asked:** the most attackable public choice; retrofitting ethics is far costlier
than deciding upfront.
**Answer:** owner understood this as being about *build rigor*, answered: high rigor,
meaningful data from prior research, docs usable "in absence of old context."
**Disposition:** answer captured as ADR-0001 (documentation methodology); the intended
question re-asked in Round 2 with clearer framing. Logged as an interviewer framing
error — the question conflated product ethics with project ethics.

### Q4. v1 scope among four jobs-to-be-done?
**Why asked:** scope discipline; four candidate JTBD (study & memory / reading &
research / writing coaching / planning & routines) cannot all be v1.
**Answer (custom):** don't ask me — **find what students across disciplines actually
use AI for most and choose from evidence.** → ADR-0007; research workflow commissioned.

## Round 2 — Stances and constraints

### Q5. Integrity stance, re-asked ("if your friend pastes an essay prompt and says 'write this', what happens?")
**Options:** learning-first (recommended) / dual-mode with guardrails / productivity-first / per-course policy.
**Answer:** **Productivity-first.** → ADR-0004, including the interviewer's recorded
dissent and the three mandatory mitigations.

### Q6. Cost reality of the user base?
**Why asked:** Claude Code effectively requires a paid plan; claude.ai has a free
tier; students are cost-sensitive. The answer bounds each tier's ceiling.
**Answer (custom):** determine the student's plan, budget token usage and quality
around it, and communicate expectations proactively — maximize each plan. → ADR-0005
(with the technical caveat that plan must be asked, not detected — no such API exists).

### Q7. What does "fire and forget" mean concretely?
**Why asked:** three different automation architectures hide behind the phrase.
**Answer:** **All three, staged** — pipelines → ambient memory → scheduled routines. → ADR-0006.

### Q8. Success at ~6 months? (multi-select)
**Why asked:** sets what gets measured and optimized; a business goal would change
telemetry/licensing choices *now*.
**Answer:** friends genuinely using it weekly + public open-source adoption +
portfolio/CV piece. **Not selected:** seed of a business. → ADR-0008.

## Round 3 — Open-ended, delivered as quick-response cards (answered 2026-07-02)

At the owner's request the 13 open-ended questions (+1 split-out language question)
were re-delivered as multiple-choice cards with free-text override, in four batches by
lens: psychologist (OQ-1–3), education (OQ-4–6), Claude-master (OQ-7–10), business/meta
(OQ-9 re-ask, OQ-11–13). One framing miss occurred (OQ-9 was not understood as first
worded) and was re-asked in behavioral terms ("if it breaks, what would you actually
do?") — same protocol as the Round-1 ethics question: re-ask, never guess.

Full answers and their consequences: [open-questions.md](open-questions.md).
Headline findings: the cohort's study failure is session quality and triage, not
procrastination onset; all three novice-AI failure patterns present; ~90% of friends
already on Claude Pro (the competitor is unaugmented Claude itself); no deadline —
quality-gated milestones; anonymous local usage counters for measurement.
