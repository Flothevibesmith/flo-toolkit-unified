# Risk Register

Severity = impact × likelihood, judged qualitatively (H/M/L). Mitigations that are
*design requirements* (not options) are marked ⚑.

| ID | Risk | Sev. | Notes & mitigations |
|---|---|---|---|
| R-01 | **Integrity exposure.** Productivity-first stance (ADR-0004) + owner's name on a public tool → reputational/institutional blowback if the tool is framed as a cheating aid. | H | ⚑ Onboarding policy notice; ⚑ no cheating-specific features; ⚑ strong learning modes offered alongside. Positioning language matters as much as behavior. |
| R-02 | **Over-reliance harming the friends it's meant to help.** Evidence (Bastani et al. 2024 et al. — see evidence base) shows unscaffolded AI help can *reduce* learning while feeling helpful. The product could make friends' grades or skills worse. | H | ⚑ Failure-modes facet of the evidence base feeds concrete "nudge without refusing" designs (stage-appropriate scaffolds, retrieval prompts after delivered work). This is the psychologist-lens core risk. |
| R-03 | **Novice onboarding dropout.** Tier-1 users abandon during first contact (account creation, install, first prompt). | H | Zero-install tier exists precisely for this; first-session experience must deliver value in < 5 minutes; watch real friends onboard (OQ-1). |
| R-04 | **Two-tier surface area** exceeds a single student maintainer's capacity. | M | ADR-0002 revisit trigger: if v1 slips beyond a semester, cut to novice tier. Shared core, thin surface adapters. |
| R-05 | **Platform drift.** Claude features (Projects, skills, scheduling, memory) evolve under the toolset; docs and features silently rot. | M | Capability matrix records which platform feature each product feature depends on; yearly evidence refresh (ADR-0007) doubles as platform re-check. |
| R-06 | **Quota walls.** Free/low-tier users hit rate limits mid-task and blame the product. | M | ADR-0005 plan-aware budgeting; heavy features declare cost class; rate-limit literacy in onboarding. |
| R-07 | **Privacy.** Ambient memory (ADR-0006 stage 2) stores course data, weaknesses, schedules — sensitive for students. | M | Memory contents user-visible and user-editable; no telemetry (ADR-0008); measurement via consent (OQ-13). |
| R-08 | **Evidence base goes stale.** Student AI usage is shifting yearly; 2024-25 surveys may misrank the JTBD by 2027. | L | Annual re-check trigger in ADR-0007. |
| R-09 | **GDPR / EU AI Act exposure** (committee critique #7). Mastery ledgers, error logs, and performance histories are personal data; education AI sits near the AI Act's high-risk orbit; builder is EU-based. | M | ⚑ Local-first, user-owned, human-readable files; ⚑ no remote telemetry (ADR-0012); no processing of *other* students' data by default; formal review gate before public release. |
| R-10 | **Incumbent roadmap erases differentiation** (critique #4). One OpenAI/Google release (persistent mastery state, file-aware tasks) could close the gaps the v1 bet rests on. | M | Quarterly incumbent scan (standing obligation, evidence base); fallback moat = persistence + cross-surface integration depth, not any single feature. |
| R-11 | **LLM-generated quiz-item quality** (critique #5). All cited retrieval effect sizes used human-authored items; hallucinated or miscalibrated flashcards could void the core loop's value. | H | ⚑ Item-quality pass in every deck pipeline (self-critique, duplicate/hallucination filter, user flagging); Romanian-language item quality is a pre-launch gate (ADR-0010); literature check on LLM question validity in design phase. |
| R-12 | **Retrieval-loop adherence** (critique #8). Students bypass the quiz-first default the way 67% ask for answers first; the conversion hypothesis (ADR-0009) may fail. | H | Bypass rate is the headline metric, watched from first pilot; artifacts persist even on bypass (value doesn't zero out); dropout/desirable-difficulties literature on the design reading list. |

| R-13 | **Novice-tier ledger staleness & corruption** (design review C1/C7). The persistence layer depends on a student-executed save ritual; LLM full-file rewrites can silently corrupt state. | H | ⚑ Save ritual as THE drilled onboarding behavior; ⚑ staleness self-announcing (last-updated header, session-start age check); ⚑ append-only high-loss sections; ⚑ schema doc + "check my ledger" health check; recovery path + snapshot habit; Cowork middle tier as the structural fix for willing friends; M1 gate: ledger current after one week unsupervised. |

**Amendments 2026-07-02 (post-discovery):** R-01 — owner explicitly locates misuse
accountability with students (OQ-6, ADR-0004 amendment); positioning language remains
the residual exposure. R-03 — largely defused for the first cohort: ~90% already on
Claude Pro, so onboarding starts inside a product they already use; risk persists for
the general-public tier. R-06 — recentered on Pro limits per ADR-0005 amendment.

**Amendments 2026-07-02 (post-design-review):** R-05 — the trigger FIRED pre-M1 (see
ADR-0003 amendment); mitigation upgraded from "capability matrix" to a monthly
golden-session smoke test as an active drift detector. R-09 — checklist now exists
and is executable: [r09-privacy-checklist.md](r09-privacy-checklist.md). R-11 —
extended into a retrieval-fidelity spec (blueprint §2 rule 3); LLM question-validity
literature is a blocking M1 input. R-12 — falsification threshold pre-registered
(sustained bypass >60% over 2 weeks → deferred-assistance redesign); SRS-dropout
literature pulled forward to pre-M1.
