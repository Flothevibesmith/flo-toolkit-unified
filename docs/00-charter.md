# Project Charter — AI Academic Assistant Toolset

**Owner:** Andrei Florean (student; project initiator and product owner)
**Started:** 2026-07-02
**Status:** Discovery → Design

## Problem statement

University students with no AI literacy extract roughly Google-search-level value from
frontier AI tools. The gap between what a novice gets from Claude and what a skilled
operator gets is enormous, and it is a *packaging* problem, not a capability problem:
the capability already exists; novices lack the prompting skill, the workflow design,
and the persistence/automation layer to reach it.

## Vision

A publicly available, easily installable toolset that closes that gap — making Claude
act as a best-in-class academic assistant out of the box, tuned to the real needs and
limitations of students. Two interaction styles, per the owner's framing:

- **"Fire and forget":** automation that does whole jobs without supervision —
  one-command pipelines, persistent memory, scheduled routines (staged in that order,
  see ADR-0006).
- **"Special calls":** named tools/skills a student invokes deliberately for specific
  jobs (e.g., turn this PDF into an exam-prep kit).

## Users — two tiers from day one (ADR-0002)

| Tier | Who | Surface |
|---|---|---|
| **Novice** | Students with zero AI knowledge (the owner's friends — the motivating users) | Zero-install pack for claude.ai; guided onboarding; no jargon |
| **Power** | The owner and students willing to install tooling | Claude Code plugin: skills, agents, hooks, scheduled routines |

Both tiers share one design language and one knowledge core. The product must have
**meaningful impact on every message** even on claude.ai (owner's requirement) — i.e.,
the zero-install tier is not a demo, it is a real product shaped through project
instructions/styles/prompt architecture.

**Interpretation to confirm:** "all 3 methods of using Claude" = claude.ai (web +
mobile apps), Claude Desktop (Cowork), and Claude Code. Flagged in open-questions.

## Stances (decided; see decision log for full reasoning)

1. **Productivity-first integrity stance** (ADR-0004): the assistant produces work when
   asked; responsibility sits with the student. Mitigations documented in the risk
   register — this is the project's largest reputational exposure.
2. **Plan-aware resource management** (ADR-0005): the toolset establishes which Claude
   plan the student is on, budgets token usage and output depth accordingly, and
   proactively communicates expectations ("this will use a lot of your quota — want the
   lighter version?"). Treats rate-limit literacy as a first-class product feature.
3. **Evidence-based feature prioritization** (ADR-0007): v1 scope among the four
   candidate jobs-to-be-done (study & memory, reading & research, writing, planning &
   routines) is decided by the evidence base in `evidence/`, not by intuition.

## Success criteria (~6 months, chosen by owner)

1. **Behavior change:** friends genuinely using it weekly — measured by real habitual
   use, not installs.
2. **Public adoption:** open-source release with external users.
3. **Portfolio artifact:** the documentation itself is exhibit-grade.

Explicit **non-goal** for now: monetization.

## First cohort — observed facts (discovery rounds A–D, 2026-07-02)

- **Access:** ~90% already on Claude **Pro**; few free; few-to-none Max. The
  competitor is *unaugmented Claude itself* — positioning is "an upgrade layer on the
  subscription they already pay for," so switching cost ≈ zero.
- **Study failure mode:** session quality and triage, not procrastination onset —
  distraction, passive rereading, and not knowing what matters; they do *not* mainly
  start too late.
- **AI failure mode:** all three novice patterns — Google-style one-liners,
  summarize-and-stop, copy-paste the assignment.
- **Context:** essays + closed-book exams dominate assessment; materials mostly
  digital; laptop (Docs/Office) for study, phone-first for life; devices span
  Windows/Mac/phone/tablet; language = English default, always mirror the student
  (ADR-0010).

## Constraints

- Owner is a student: near-zero infrastructure budget; no hosted servers (rules out
  hosted-MCP-only architectures — see interview log, round 1 Q2).
- First cohort is Pro-dominant (above); the general-public tier must still degrade
  gracefully on free plans (ADR-0005 amendment).
- Maintenance reality: the owner repairs by asking Claude — all machinery must be
  Claude-repairable from repo docs alone (ADR-0011).
- No calendar deadline; quality-gated milestones, each ending in something usable
  (ADR-0013). October 2026 semester start is a natural launch moment, not a promise.
- The toolset must survive Claude platform evolution (features shift under us —
  risk register R-05).
