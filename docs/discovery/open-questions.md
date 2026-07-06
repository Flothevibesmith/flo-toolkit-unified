# Open Questions — Round 3 (open-ended) — ANSWERED 2026-07-02

Issued and answered 2026-07-02 via quick-response cards (owner's preferred format).
Answers recorded verbatim or near-verbatim; consequences propagated to the charter,
decision log, and risk register. Items still owed are marked ⏳.

## Psychologist's lens — the real users

**OQ-1. Where does exam prep fall apart?**
**A:** Distraction & phone · passive rereading · not knowing what matters.
*Notably NOT selected: starting too late.* The cohort's failure is not procrastination
onset but **session quality and triage** — they show up and study badly. This shifts
design weight from "get started" nudges toward in-session structure (active recall,
material triage/exam-likelihood ranking).
✅ *Delivered 2026-07-02 as a composite story — see [cohort-story.md](cohort-story.md):
context loss from per-conversation re-uploads (no Projects use), zero verification
behavior (hallucinations uncaught), exam-unfocused summaries from vague prompts and
wrong inputs. Individual sit-down observations remain a nice-to-have for M1 testing.*

**OQ-2. What does their AI use actually look like?**
**A:** All three failure patterns — Google-style one-liners, "summarize this" and
stop, copy-paste the assignment. Confirms the project's core thesis: the gap is
prompting/workflow skill, not tool access. These three patterns define the onboarding
curriculum's "before" state.

**OQ-3. Digital habitat?**
**A:** Laptop + Google Docs/Office for study **and** phone-first socials. Two homes:
study happens at the laptop; life happens on the phone. Artifacts must be shareable
into group chats (see critique #11 disposition); claude.ai mobile matters for review
sessions, laptop for pipelines.

## Education lens — the academic context

**OQ-4. Assessment mix?**
**A:** Essays & reports + closed-book exams. Both retrieval practice (exams) and the
writing-feedback engine (essays) have a bound target. Problem sets and presentations
not dominant — worked-example tooling deprioritized for v1.

**OQ-5. Materials digital?**
**A:** Mostly digital (slides/PDFs on portals). Pipelines can ingest directly on day
one; no capture step required for v1.

**OQ-5b. Language default?**
**A:** English-first in mind, but mirror the student. → ADR-0010: default English,
always mirror the language the student writes in; Romanian output quality is a
pre-launch test gate (critique #10).

**OQ-6. University AI policies?**
**A (owner, near-verbatim):** Not a concern — students have been warned of the
consequences of unethical use; the owner will not be held responsible for their
actions; no limits should be imposed on students since limits mostly create friction
rather than preventing misuse; those who misuse it are accountable themselves, outside
this project's scope of interest.
→ Recorded as an amendment to ADR-0004. Distinction preserved in design: no *moral
gatekeeping or policing*, per owner; learning-forward defaults (quiz-first with
instant bypass) are product design, not policy enforcement, and survive this stance.

## Claude-master lens — technical ground truth

**OQ-7. Friends' Claude accounts?**
**A:** ~90% already on paid **Pro** plans; very few free; few-to-none Max.
Major finding — it upends two assumptions: (a) the adoption funnel does not start at
"create an account"; it starts at "get more out of what you already pay for";
(b) plan-aware defaults center on Pro, not free (ADR-0005 amendment). It also
dissolves committee critique #12 for the first cohort.

**OQ-8. Device mix?**
**A:** All four — Windows laptops, MacBooks, phone-primary, tablets/iPads. Full-matrix
support for the zero-install tier; plugin tier ships Windows+Mac install docs from
day one.

**OQ-9. Maintainer capacity?** *(re-asked in plain words after a framing miss)*
**A:** "Ask Claude to fix it." → ADR-0011: machinery is permitted **iff** every
component is repairable by a fresh Claude session using only the repository's docs —
each component ships with a repair runbook. The defense-grade documentation standard
(ADR-0001) is thus also the maintenance strategy.

**OQ-10. "All 3 methods of using Claude"?**
**A:** Confirmed — claude.ai (web/mobile), Claude Desktop, Claude Code. ADR-0003
stands as written.

## Business lens — positioning

**OQ-11. Incumbent tools?**
**A:** Mostly claude.ai Pro itself. The competitor is not ChatGPT or Quizlet — it is
**unaugmented Claude**. Positioning writes itself: *an upgrade layer on the
subscription they already pay for* — switching cost ≈ zero, which neutralizes the
usual habit-beating problem. (No switching hypothesis needed; there is no switch.)

**OQ-12. Timeline?**
**A:** No deadline — quality first. → ADR-0013: quality-gated milestones instead of
calendar deadlines; mortality risk of deadline-less projects mitigated by requiring
every milestone to end in something friends can actually use.

## Meta

**OQ-13. Measuring weekly use?**
**A:** Anonymous usage counters. → ADR-0012: local, user-visible counters with opt-in
sharing; no remote telemetry (GDPR constraint R-09 and ADR-0008's no-monetization
stance both reinforced).
