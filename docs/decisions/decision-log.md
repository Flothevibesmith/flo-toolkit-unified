# Decision Log

ADR format. Statuses: **Accepted** | **Superseded by ADR-XXXX** | **Proposed**.
Superseded entries are never deleted. Every entry lists a *revisit trigger* — the
observable condition under which the decision should be re-examined.

---

## ADR-0001 — Documentation methodology: defense-grade, self-contained

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (interview R1-Q3 clarification)

**Context.** The owner wants rigor "such that I can best tweak it later and have
meaningful data from prior research in absence of old context." Two forces: (a) the
owner will iterate on this project across many AI sessions that share no memory;
(b) the owner wants every choice justified to a hostile-committee standard.

**Options considered.** (1) Informal notes as we go — rejected: does not survive
context loss, invites silent decisions. (2) Full academic apparatus with formal
citations — heavyweight but matches the stated bar. (3) Lightweight ADR log only —
insufficient for empirical claims about students/learning.

**Decision.** ADR log for all decisions + a verified evidence base for all empirical
claims + self-contained docs with a resumption entry point (`docs/README.md`).

**Consequences.** Slower to write; every future session must maintain the log; the
docs double as the portfolio artifact (success criterion 3).
**Revisit trigger:** documentation overhead visibly delays shipping to first users.

---

## ADR-0002 — Audience: both tiers from day one

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (interview R1-Q1)

**Context.** The motivating users are AI-novice friends; the owner is a power user.
Designing for novices only caps the ceiling; designing for the owner first risks the
novice version never shipping (the historical default for developer-built tools).

**Options considered.** Novices-first; owner-first; both tiers; general public first.

**Decision.** Both tiers from day one: a guided novice mode and an advanced mode
sharing one core.

**Justification.** The owner accepts the doubled design surface. The two tiers also
serve the adoption funnel: novices taste value with zero install, graduates move to
the plugin.

**Consequences.** Every feature needs a "what does this look like on each tier?"
answer; testing surface doubles; a capability matrix (which features exist on which
surface) becomes a required design artifact.
**Revisit trigger:** if maintaining two tiers delays a usable v1 beyond one semester,
cut to novice tier first (it serves the motivating users).

---

## ADR-0003 — Delivery: hybrid across all Claude surfaces

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (interview R1-Q2, custom answer)

**Context.** "Installable" and "fire and forget" mean different things per surface.
Claude Code offers skills/agents/hooks/scheduled routines; claude.ai offers zero
install but no local tools or background automation.

**Options considered.** Claude Code plugin only; claude.ai pack only; hosted MCP
server; hybrid.

**Decision.** Hybrid: a Claude Code **plugin** (the power tier) + a claude.ai
**zero-install pack** (the novice tier), with the explicit owner requirement that the
claude.ai tier "have meaningful impact on every message they send" — i.e., it works
through always-active instruction/context architecture (Projects, custom instructions,
styles), not through a folder of prompts the student must remember to use.

**Rejected: hosted MCP server** as the primary vehicle — the owner has no hosting
budget, and asking novices to run a local server is the worst installability option
for this audience. (MCP may still appear later as an optional component.)

**Consequences.** One shared design language across surfaces; a capability matrix per
surface; the zero-install pack's "every message" requirement makes prompt/context
architecture a core discipline of this project, equal in status to plugin code.
**Revisit trigger:** Anthropic platform changes that materially expand or restrict
what claude.ai Projects / custom instructions can do.

**Amendment (2026-07-02, design review MJ6/C1/C2).** The revisit trigger fired before
M1: verification against July-2026 platform reality found restrictions the original
matrix ignored (Claude cannot write Project knowledge; no Project sharing on
individual Pro; silent RAG-mode retrieval at scale) and expansions it predated
(custom skills on Pro plans; Cowork GA on Desktop). The decision stands — hybrid
across surfaces — but the matrix was rewritten (blueprint rev 2 §4) and a **middle
tier added**: Claude Desktop/Cowork, where ledger files can be auto-maintained
locally with the same instruction pack and artifact formats. Standing defense: the
monthly golden-session smoke test (blueprint §5E) is the platform-drift detector.

---

## ADR-0004 — Integrity stance: productivity-first

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (interview R2-Q1, after re-framing)

**Context.** The single most attackable design choice. Question as posed: what does
the assistant do when a student asks it to produce gradeable work?

**Options considered.** Learning-first (refuses ghostwriting; recommended by the
interviewer); dual-mode with guardrails; productivity-first; per-course policy config.

**Decision (owner).** Productivity-first: the assistant drafts and solves what it is
asked; responsibility sits with the student.

**Recorded dissent / mitigation (interviewer).** Learning-first was recommended
because (a) it is defensible to any university, (b) it differentiates from raw
chatbots, (c) it aligns with the project's own success metric of making friends *more
capable*. The owner chose utility. To keep the choice defensible, the following
mitigations are design requirements, not options:
1. Onboarding states plainly that course AI policies vary and compliance is the
   student's responsibility (one sentence, not a legal wall).
2. The toolset ships **no cheating-specific features** (nothing designed for proctored
   or in-exam contexts).
3. Learning-oriented modes exist and are *good* — the productivity stance sets the
   floor of what's permitted, not the ceiling of what's offered. The evidence base
   (failure-modes facet) informs how the product nudges toward durable learning
   without refusing work.

**Consequences.** Reputational exposure logged as risk R-01. The "nudge without
refusing" design becomes a first-class problem for the design phase.
**Revisit trigger:** any real integrity incident traced to the tool; or university
policy environment in the owner's institution hardening.

**Amendment (2026-07-02, post-discovery OQ-6).** Owner's position, near-verbatim:
students have been warned of the consequences of unethical use; the owner is not
responsible for their actions; no limits should be imposed — limits create friction
rather than preventing misuse; misusers are accountable themselves, outside project
scope. Interpretation adopted: **no moral gatekeeping or policing** anywhere in the
product. Learning-forward *defaults* (e.g., quiz-first with instant bypass, artifacts
emitted alongside answers) are retained as product design, not policy enforcement —
they survive this stance because they never block or lecture. The evidence memo's
finding that guardrail *design* (not restriction) eliminates learning harm while
preserving productivity (Bastani et al., PNAS 2025, verified) makes these two
positions compatible rather than contradictory.

---

## ADR-0005 — Plan-aware resource management as a product feature

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (interview R2-Q2, custom answer)

**Context.** Student plans range from free claude.ai to paid tiers; rate limits and
token budgets are invisible to novices, who hit walls without understanding why.

**Decision (owner, near-verbatim).** The toolset determines what plan the student is
on, plans token usage and output quality around it, and communicates expectations in
the message when relevant — maximizing what each plan can deliver.

**Technical reality check (constraint, not objection).** Neither claude.ai nor Claude
Code exposes an API for "what plan is this user on." Therefore: plan is **asked once
during onboarding** and stored (memory/Project context), with graceful behavior when
unknown. Adaptation levers: response depth, artifact size, how work is chunked, when
to warn ("this pipeline is quota-heavy — lighter version?"), and which features are
recommended per plan.

**Consequences.** Onboarding must capture plan; every heavy feature declares a cost
class; the novice tier gets rate-limit literacy content ("why did Claude stop?").
**Revisit trigger:** platform ships plan/quota introspection, making detection real.

**Amendment (2026-07-02, post-discovery OQ-7).** The first cohort is ~90% Claude
**Pro** — plan-aware defaults therefore center on Pro limits, not free-tier limits.
Free-tier graceful degradation (shorter decks, batched reviews) remains a requirement
for the general-public tier, where paid access cannot be assumed (evidence: only
~11.3% of surveyed US students pay for any AI service — Middlebury 2025, unverified).

---

## ADR-0006 — Automation model: staged (pipelines → memory → routines)

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (interview R2-Q3)

**Context.** "Fire and forget" can mean one-command unattended pipelines, ambient
persistent memory, or clock-driven scheduled routines. Each has different trust,
platform, and plan requirements.

**Decision.** All three, staged in order: **(1) one-command pipelines** (student
initiates, tool completes an entire job unattended), **(2) ambient memory** (courses,
deadlines, weak topics persist across sessions), **(3) scheduled routines** (digests,
exam countdowns). Rationale for the order: each stage builds trust and infrastructure
for the next; pipelines deliver value on day one with the simplest mental model;
routines are the most platform- and plan-constrained (hardest on the free tier).

**Consequences.** v1 design centers on pipeline UX ("drop a syllabus, get a semester
kit"); the memory schema designed in stage 2 must be anticipated in stage 1 outputs
(pipelines should emit memory-ready artifacts).
**Revisit trigger:** evidence memo showing planning/routines is the dominant unmet
need would promote stage 3.

---

## ADR-0007 — v1 scope decided by evidence, not intuition

**Date:** 2026-07-02 · **Status:** Accepted (process); scope decision **pending evidence** · **Decided by:** owner (interview R1-Q4)

**Context.** Four candidate jobs-to-be-done: study & memory systems; reading &
research; writing; planning & routines. The owner explicitly declined to pick by gut:
"find what students in different studies are using AI the most for and based on the
evidence choose."

**Decision.** A research workflow (5 facets: usage surveys, discipline differences,
learning science, failure modes, competitive landscape; adversarial verification of
load-bearing claims; synthesized prioritization memo) produces the ranking. Criteria:
usage prevalence × learning/outcome impact × differentiation opportunity. Output:
`evidence/student-ai-usage.md`.

**Consequences.** v1 scope is traceable to named sources; the same evidence base
feeds the failure-mode defenses required by ADR-0004.
**Revisit trigger:** each new annual survey cycle (HEPI, DEC, etc.) — re-check the
ranking yearly.

---

## ADR-0008 — Success metrics

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (interview R2-Q4)

**Decision.** Three success criteria at ~6 months: (1) friends genuinely using it
weekly (behavior change, not installs); (2) public open-source adoption; (3)
portfolio-grade documentation. **Monetization is a non-goal** — no telemetry,
licensing, or brand decisions should be made for business reasons at this stage.

**Consequences.** "Weekly friend usage" implies we need some honest usage signal from
tier-1 users (mechanism TBD — cannot be invasive; see open questions); open-source
implies public repo hygiene from the start (git initialized 2026-07-02).
**Revisit trigger:** owner's interest in the business path changes.

---

## ADR-0009 — v1 scope: study & memory core, reading intake, thin planning, feedback-only writing

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** evidence process (owner-delegated per ADR-0007), with committee-critique amendments

**Context.** The evidence workflow (84 findings, 15/15 verified claims surviving
adversarial checking; full record in `evidence/`) scored the four candidate jobs on
usage prevalence (0.40), learning impact (0.30), and differentiation (0.30).

**Decision.** v1 ranking and effort allocation:
1. **Study & memory systems — ~50%** (weighted 4.6): the core loop. Strongest causal
   evidence in the base (retrieval g≈0.50, spaced retrieval g=0.74 — Latimier 2021,
   verified) and all three competitive gaps (persistence, pipelines, non-toggle
   architecture) converge here.
2. **Reading & research — ~25%** (3.5): the intake funnel. Highest-prevalence cluster
   (summarising #2 UK use, verified) but a low-utility technique in isolation — so it
   feeds the study loop rather than standing alone against NotebookLM.
3. **Planning & routines — ~15%** (3.5): thin implementation-intention scaffold
   (d=0.65, Gollwitzer & Sheeran 2006) that matures into full strength at automation
   stage 3 (ADR-0006).
4. **Writing — ~10%** (2.4): **feedback engine only** (g≈0.55–0.66, Fleckenstein
   2023); no differentiated drafting product — Grammarly-entrenched space with the
   worst misconduct exposure. Under the productivity-first stance (ADR-0004) Claude
   itself still drafts when asked; we simply build no *drafting-specific* tooling.

**Amendments accepted from the committee critique** (dispositions in
`evidence/student-ai-usage.md`): the #1 ranking is honestly a *conversion hypothesis*
(demanded explanations → emitted retrieval artifacts) since revealed usage of
retrieval itself is ~2–11%; Bastani et al. is verified-in-adjacent-population, not in
ours; differentiation gaps are a mid-2025 snapshot requiring quarterly re-scan; the
UCF Anki correlational stat is demoted to anecdote.

**Consequences.** The single thesis-testing metric is **quiz-first completion vs
bypass rate**. Deck-generation pipelines require an item-quality pass (R-11).
**Revisit trigger:** annual survey cycle; any incumbent shipping persistent mastery
state; cohort bypass rate showing the conversion hypothesis failing.

---

## ADR-0010 — Language: English default, always mirror the student

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (OQ-5b)

**Decision.** Default working language is English; the assistant always mirrors the
language the student writes in (Romanian → Romanian, mixed → mixed). Zero
configuration required.
**Consequences.** Romanian-language output quality (especially generated quiz items)
is a pre-launch test gate — committee critique #10. Cohort materials are mostly
digital and courses assess in essays + closed-book exams (OQ-4/5), so bilingual
robustness matters most in deck generation and feedback rubrics.
**Revisit trigger:** first cohort feedback on Romanian output quality.

---

## ADR-0011 — Maintainer model: Claude-repairable machinery only

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (OQ-9: "ask Claude to fix it")

**Context.** The owner will not debug code independently; when something breaks, the
realistic repair path is describing the problem to a fresh Claude session.

**Decision.** The architecture may contain real machinery (skills, hooks, scripts,
scheduled routines) **iff** every component is repairable by a Claude session with no
conversational memory, using only the repository. Operationally: each component ships
a repair runbook (what it does, how to tell it's broken, where its state lives, how to
test a fix); no component may depend on undocumented external state.

**Justification.** This converts the ADR-0001 documentation standard from an academic
virtue into the literal maintenance strategy — the docs are the maintainer.
**Consequences.** Slightly more docs per component; a "repairability review" joins the
definition-of-done.
**Revisit trigger:** owner's own coding capacity grows (they may take over).

---

## ADR-0012 — Measurement: local anonymous counters, no remote telemetry

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (OQ-13)

**Decision.** The tool counts its own invocations **locally**; counters are
user-visible and shared only by the user's own choice. No remote telemetry, no
phoning home.
**Justification.** Owner chose anonymous counters over ask-and-watch; local-only
implementation reconciles that choice with GDPR exposure (R-09) and the
no-monetization stance (ADR-0008). Success criterion #1 ("friends using weekly") is
measured by friends voluntarily sharing counter screenshots/numbers — consistent with
a cohort the owner personally knows.
**Consequences.** A tiny counting mechanism joins every tier (a memory-file tally in
the plugin; lightweight self-report in the zero-install pack); it must itself be
Claude-repairable (ADR-0011).
**Revisit trigger:** public-release scale makes voluntary sharing statistically useless.

**Amendment (2026-07-02, design review MJ1/MN1).** Renamed **"local, voluntary
self-reported counters"** — identified screenshots from named friends are not
anonymous, and the mislabel was the attackable part. Implementation changed from a
running integer (unauditable, corruptible in LLM rewrites) to an **append-only event
log** (`date · command · offered/completed/bypassed`), counts derived by counting
lines. All measurement remains strictly local and voluntary; nothing remote survived
review. Known compliant-user bias on the novice tier is stated, not hidden.

---

## ADR-0013 — Timeline: quality-gated milestones, no calendar deadline

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (OQ-12)

**Decision.** No deadline; ship when it meets the bar. **Mitigation for the known
mortality risk of deadline-less student projects:** work is structured as quality-gated
milestones, and *every milestone must end with something friends can actually use* —
no six-month dark periods. The October 2026 semester start is noted as a natural
launch moment, not a commitment.
**Consequences.** Milestone definitions become part of the design blueprint; progress
is measured in shipped increments, not calendar burn.
**Revisit trigger:** two consecutive milestones without a usable increment.

---

## ADR-0014 — Product name: Flo's Toolkit

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (blueprint review, custom answer over "Study OS")

**Decision.** The product is named **Flo's Toolkit**.

**Justification (owner's implicit, recorded by interviewer).** For the first cohort
the name is literally true — it is Flo's toolkit, recommended person-to-person, and a
personal name carries trust that a generic brand can't. Personal-brand naming also
matches success criterion 3 (portfolio piece with the owner's name on it).

**Recorded consideration for M4 (public release).** The name says nothing about
studying to a stranger browsing a marketplace. Mitigation, not a rename: always ship
with a descriptive subtitle — *"Flo's Toolkit — an AI study system for students"* —
and revisit discoverability data at M4.
**Revisit trigger:** M4 public-release preparation.

---

## ADR-0015 — Flagship command set: five commands

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (blueprint review)

**Decision.** v1 ships five named commands, each with a plain-language alias:
`/explain` ("explain this to me"), `/ingest` ("read this for me"), `/quiz` ("quiz
me"), `/examkit` ("make my exam kit"), `/feedback` ("review my draft").

**Justification.** `/explain` was added to the interviewer's proposed four because
explaining is the #1 student AI use in every surveyed population (HEPI 2025/26
verified; von Garrel & Mayer 2023; Chegg 2025) — giving the dominant behavior a named
handle makes the conversion play (explanation → ledger + retrieval items) explicit
and discoverable rather than implicit.
**Consequences.** Five is the ceiling for the novice command surface; any sixth
command must displace one. M1 template implements `/explain`, `/ingest`, `/quiz`,
`/examkit` (feedback arrives with the writing slice per ADR-0009 allocation — M1
scope approved without it).
**Revisit trigger:** friend usage showing a command unused or a missing verb.

---

## ADR-0016 — PromptForge: auto-triggered prompt improvement on vague messages

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner (v1.1 direction, near-verbatim requirements)

**Context.** Owner requirement: whenever a message is "even remotely vague," the
assistant auto-triggers a clarification battery of **at least 6–10 questions** in
click-to-answer style, then writes the improved prompt out, then confirms via one
more choice question before executing. Rationale: the cohort demonstrably writes
vague two-line prompts (cohort-story F3) and won't learn prompting on their own.

**Platform reality (constraint, not objection).** claude.ai chat renders no real
buttons. The closest physical equivalent: numbered questions with lettered options
and a starred default, answered with a tap-short code ("1b 2a"), partial answers
(silence = default), or the single word "defaults". This is what ships.

**Decision.** FORGE behavior in the instruction pack: substantive + vague → one
message with 6–10 multiple-choice questions (course, goal, scope, level, format,
depth, deadline, success criterion — only what can't be inferred; inferences shown
as defaults) → improved prompt printed in a quote block → one confirm question
(A: run · B: adjust · C: just answer the original) → execute on approval. Never
forge twice for one task, never inside an already-forged task, never on quiz
answers or emotional messages.

**Recorded dissent (interviewer).** A 6–10-question gate on "even remotely vague"
messages is heavy for this cohort; the behavior-adoption lens predicts abandonment
risk. Owner's call stands. **Mitigation:** "defaults" as a one-word escape, C as an
always-present bypass, and a new M1 gate metric: forge completion vs abandonment vs
C-bypass rate. If friends consistently bypass, intensity is re-tuned from data, not
argument.
**Revisit trigger:** M1 forge-abandonment data.

---

## ADR-0017 — Automated persistence: project memory replaces the manual save ritual

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner ("I don't want my friends writing anything anywhere")

**Context.** Owner rejects the student-executed save ritual outright: 90% of
students won't realize a message is the session's last; the rest won't care. He is
right that the ritual's failure mode is structural, not motivational. Meanwhile
claude.ai now provides **project-scoped memory** — per-Project, automatic,
user-viewable/editable, available on web/desktop/mobile (verified via Anthropic help
center + memory announcement, 2026-07-02).

**Decision.** The novice tier's persistence carrier becomes **platform project
memory**, curated by the pack: at quiz end, exam-kit end, and session close the
assistant emits a compact plain-prose PROGRESS RECAP (course, exam date, topic
states, streak, next due) — dual-purpose: visible progress for the student, dense
material for memory capture. Session start recalls known state in one line. The
precise ledger file demotes to an **optional export/backup** ("export my progress")
for tier migration and power users. Phone receipts demote to fallback-only (memory
is cross-device on one account).

**Honest trade-offs (on the record).** (a) Memory is a lossy, summarized channel not
under our control — item-level spaced-repetition precision degrades to topic-level +
recent-items on this tier; full precision lives in the export file and the
Desktop/plugin tiers. (b) Memory must be enabled in the friend's settings — setup
gains an "enable memory" step. (c) This partially supersedes the cleared rev-3
B2/B3 design (emission policy, receipts); the delta-review clearance no longer
covers persistence — **the M1 gate inherits the burden** via a new build-time test:
fresh Project, two sessions on different days, session 2 must know session 1's quiz
results with memory as the only carrier.
**Revisit trigger:** the build-time memory test failing → fall back to rev-3 save
ritual or promote the Desktop tier to default.

---

## ADR-0018 — Always-on scope: the toolkit acts on every message

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner ("I need this to work with me on every message")

**Context.** v1.0's behaviors clustered around five commands; between commands the
assistant behaved near-generic. Owner requires toolkit behavior on every message —
which is also what ADR-0003 promised ("meaningful impact on every message").

**Decision.** The pack's routing becomes a per-message pipeline: (1) intent routing —
five named jobs plus *general study coaching* as the default lane, so no message
falls through to generic-chatbot behavior; (2) forge check (ADR-0016); (3) grounding
always; (4) where sensible, every substantive study answer carries one recall offer.
The five commands remain the named handles, not the boundary of behavior.
**Consequences.** Larger standing-behavior load per message — the §5F budget is
rebalanced (save ritual's 900 chars freed by ADR-0017 fund the forge); long-chat
adherence risk rises, measured at the existing 15-turn gate.
**Revisit trigger:** adherence gate failing on the always-on additions.

---

## ADR-0019 — M2 plugin architecture: same-repo marketplace, study-folder state, skills-complete/hook-enhancement

**Date:** 2026-07-02 · **Status:** Accepted · **Decided by:** owner ("build it such that it also works on Cowork") + interviewer architecture

**Context.** Install mechanics verified against official docs (2026-07-02): two-step
marketplace flow (`/plugin marketplace add` + `/plugin install`, deliberately no
one-liner — trust gate); Desktop app has a GUI plugin manager; plugins bundle
skills/agents/hooks/monitors but **cannot ship a CLAUDE.md**; **Cowork plugin
support is undocumented** — the requirement "works on Cowork" cannot be guaranteed
by any install path, only by architecture.

**Decisions.**
1. **Same-repo marketplace:** this repo carries `.claude-plugin/marketplace.json`
   pointing at `./plugin` — publishing the repo publishes the store.
2. **Study-folder convention:** a `study/` directory marks a folder as a study
   workspace; all state (per-course ledgers, decks, plans) lives there as plain
   markdown per LEDGER-FORMAT.md, written by Claude itself — the plugin tier needs
   no memory feature and no save ritual, restoring item-level SRS precision.
   Outside study folders the plugin is **silent** (user-scope install must not
   pollute unrelated projects).
3. **Skills-complete / hook-enhancement (the Cowork strategy):** every skill is
   self-sufficient — reads its ledger, carries its own protocol, works with zero
   hook support. The SessionStart hook (inject standing rules + ledger hot state)
   only upgrades between-skill, always-on behavior. Whatever subset of the plugin
   system Cowork loads, nothing breaks — and all three surfaces (claude.ai export
   files, Desktop, Code) read/write the same artifact formats, so the `study/`
   folder is the cross-surface source of truth.
4. **Eight skills:** flo-setup, flo-forge, flo-explain, flo-ingest, flo-quiz,
   flo-examkit, flo-feedback, flo-check — the five jobs + forge + onboarding +
   diagnostics/export. Prefixed to avoid namespace collisions.

**Known risks accepted.** Hook is `bash` — needs verification on Windows (Git Bash
ships with Claude Code; gate item). CLAUDE.md gap means always-on behavior depends
on the hook where it fires and on skill descriptions where it doesn't. Cowork
behavior is empirical until Anthropic documents it (gate item).
**Revisit trigger:** Cowork plugin docs appearing; hook failing on Windows at gate.
**Amended 2026-07-06 (ADR-0024):** the bash hook is superseded by a cross-platform
Node exec-form hook. **Amended 2026-07-06 (ADR-0019 note / merge):** the `study/`
ledger files ARE the plugin tier's file-based memory; the donor "vault memory"
concept (capture/retrieval reflexes) folds in here, power-tier only — never the
novice tier, where Claude cannot write Project knowledge (ADR-0017).

---

## ADR-0020 — Merge with the Overmind harness: donor-into-product

**Date:** 2026-07-06 · **Status:** Accepted · **Decided by:** owner ("merge the 2 projects into one and incorporate all the knowledge that is relevant from this project into that one")

**Context.** A separate, heavily-evaluated project ("Overmind") built and *measured* a Claude-Code harness: honesty/anti-fabrication discipline, spec-audit input-clarification, file-based vault memory, a research-depth pipeline, cross-platform Node hooks, claude.ai Skills-upload + in-app plugin-Directory platform facts (post-dating this corpus), and a body of before/after evals. Its headline empirical result: **behavioral discipline reliably lifts a weak model; heavy multi-agent orchestration does not, and sometimes backfires.** That is the same conclusion Flo's Toolkit reached from the student-UX side (R-11/R-12, the adherence gate, the "migrate tiers, don't rewrite prose" boundary).

**Options considered.** (1) Fold Flo's Toolkit into Overmind — rejected: Overmind is a generic dev harness, Flo is the actual product with a locked evidence base and audience. (2) Rebuild fresh from both — rejected: discards Flo's cleared design + verified evidence. (3) **Donor-into-product:** Flo's Toolkit is canonical; Overmind contributes only *proven, compatible* knowledge, each graft costed against Flo's constraints and logged as its own ADR.

**Decision.** Adopt option 3. The full mapping lives in `docs/merge/MERGE-PLAN.md`. Governing rules: (a) a **behavioral rule** may live on both tiers; a **mechanism** only on the power tier (never a novice dependency); (b) nothing that becomes policing/refusal (ADR-0004); (c) nothing that adds remote telemetry (ADR-0012); (d) heavy orchestration is excluded on the strength of *both* projects' evidence.

**Consequences.** New capability and refreshed platform facts enter without disturbing the cleared design or the owed gates. The decision log and evidence-base methodology (ADR-0001) are preserved; Overmind's own doc/config format is not imported.
**Revisit trigger:** a graft is found to violate a locked ADR at build/gate time; or the owner decides the product should diverge from Flo's original scope.

---

## ADR-0021 — PromptForge enriched with spec-audit input discipline

**Date:** 2026-07-06 · **Status:** Accepted · **Decided by:** owner ("start focusing on how we can improve the input the human is giving")

**Context.** Overmind's measured wins were disproportionately about *input quality*: a dedicated narrow pass that clarifies the request before working, and a **verbatim-quote rule** that cut fabrication from 1→0 (paraphrasing a requirement is where hallucination enters). Flo already has PromptForge (ADR-0016) as its input-clarification gate. The owner's new focus is precisely this lever.

**Decision.** Enrich `flo-forge` (both tiers) without adding a second gate: (1) when a request references an assignment/rubric/prompt the student pasted, **quote the exact requirement text verbatim** in the improved prompt rather than paraphrasing it; (2) add an **unstated-decisions surfacing** step — name the choices the student left open (scope, format, depth, what "done" means) as starred defaults, so a silent guess never becomes a hidden assumption. Both fold into the existing 6–10 question flow and the A/B/C confirm — no new turn, no second forge.

**Consequences.** Novice tier: costed against the §5F forge budget (rank 5, ~900 chars) — the additions are terse rules, not new sections. "Never forge twice per task" (ADR-0016) is unchanged. Power tier: `flo-forge` skill body carries the fuller discipline.
**Revisit trigger:** forge-completion-vs-bypass gate data (ADR-0016) shows the added discipline raises abandonment.

---

## ADR-0022 — Grounding upgraded; cross-model verification (power tier)

**Date:** 2026-07-06 · **Status:** Accepted · **Decided by:** interviewer, from Overmind evals

**Context.** Overmind proved (a) verbatim quoting kills fabrication and (b) **self-written checks share the code's blind spots** — a model that verifies its own work with its own tests produces confident false passes; only a *different* model catches them. Flo's grounding rule is currently a single silent self-re-check; its item-quality pass (R-11) is likewise self-judged.

**Decision.** (1) **Both tiers:** the grounding rule becomes explicit — every material-derived claim carries a source pointer or is labeled "outside your materials"; the self-check names what it could NOT verify rather than asserting all-clear. (2) **Power tier only:** for high-stakes generated artifacts (exam-kit decks, ingest item sets), `flo-check`'s "is it working?" and the item-quality pass MAY spawn a fresh-context cross-model verifier (different model, sees only the deck + the source, not the generator's reasoning). Novice tier has no subagents, so it keeps the budget-bound behavioral self-check.

**Consequences.** No policing — this checks *the toolkit's own output* for grounding/quality, never the student's intent (ADR-0004 preserved). Power-tier verification is opt-in and quota-aware (R-06).
**Revisit trigger:** cross-model verification proves too quota-heavy at gate, or item-quality data shows the self-check already suffices.

---

## ADR-0023 — Research-depth pipeline = the Reading & research engine (power tier)

**Date:** 2026-07-06 · **Status:** Accepted · **Decided by:** interviewer, from the evidence-base method

**Context.** Overmind's research pipeline (3–5 angles incl. a contrarian one, source tiering primary>secondary>blogs, primary-source verbatim verification) is *structurally identical* to the 22-agent workflow that produced Flo's own verified evidence base (ADR-0007). Flo's Reading & research tier (25% of v1) and its standing "quarterly incumbent re-scan" need exactly this.

**Decision.** Recognize the research pipeline as the reusable engine for (a) the Reading & research facet in the power tier, and (b) the recurring incumbent/evidence re-scans — **power tier only** (it is heavy multi-agent orchestration; the novice tier gets the behavioral residue: "check a contrarian source, tier your sources, cite primaries," within budget). Ships opt-in with a documented cost class (R-06).

**Consequences.** No new methodology is invented; the evidence-base discipline is reused. Heavy orchestration stays off the novice tier per both projects' evals.
**Revisit trigger:** the pipeline's cost outweighs its lift on student-scale research at gate.

---

## ADR-0024 — Cross-platform Node hook supersedes the bash hook

**Date:** 2026-07-06 · **Status:** Accepted · **Decided by:** interviewer, resolving plugin-review B2/F2/F6/F7/F21/F22

**Context.** The plugin review flagged the `bash` `session-start.sh` for CRLF risk (B2), Windows-without-Git-Bash silent death, cwd/matcher/timeout defects, and payload-cap handling. Overmind shipped and validated a **Node exec-form hook** pattern: `{"type":"command","command":"node","args":["${CLAUDE_PLUGIN_ROOT}/hooks/x.js"]}` — shell-independent (runs on Windows PowerShell or Git Bash), no CRLF exposure, built-in path handling, fail-safe (errors exit 0), and it passes `claude plugin validate`.

**Decision.** Reimplement the SessionStart hook as a dependency-free Node script in exec form, preserving the exact behavior ADR-0019 specifies (silent outside `study/`; inject standing rules + ledger hot-state inside, under the char cap). Keep the skills-complete/hook-enhancement law: the hook remains a pure enhancement, never a dependency.

**Consequences.** Fixes the entire cross-platform hook finding cluster in one move; adds a Node-on-PATH assumption (already true wherever Claude Code runs). The `.gitattributes` CRLF fix stays as belt-and-suspenders.
**Revisit trigger:** a target surface lacks Node on PATH; or Anthropic changes the hook exec-form schema.

---

## ADR-0025 — Capability-matrix amendment: Skills upload, in-app Directory, validate, eval method

**Date:** 2026-07-06 · **Status:** Accepted · **Decided by:** owner (screenshots confirming claude.ai Directory) + verified platform research

**Context.** ADR-0003's matrix and the plugin review's "not verifiable from docs" list were written against a July-2026 snapshot that has since moved. Verified (owner screenshots + research, 2026-07-06): **claude.ai web now has an in-app Directory** with Skills / Connectors / Plugins and **"Add marketplace → Add from a repository"** (paste `owner/repo`); **claude.ai supports uploading a Skill** (`.zip`, auto-invoked, account-wide); `claude plugin validate` exists; the community plugin-directory submission path exists. Mobile shows Connectors only.

**Decision.** Amend the capability matrix with these rows and consequences: (1) the still-open "command vehicle" question (§3) resolves toward **installable skills/plugins**, not only a pasted instruction block — a claude.ai user can now *install* Flo's Toolkit via the Directory (paste the repo) or upload the skill, not just paste the pack; (2) INSTALL's Option-A GUI finding (B5) is updated to the real Directory flow; (3) the eval method (hidden-oracle before/after + honesty metric, grader drives the real artifact) becomes new rows in the golden-session smoke test and M1 gate readings — local-only per ADR-0012.

**Consequences.** Opens a lower-friction novice install path than the pasted pack (still preserved as the no-install fallback). Every one of these facts must be re-verified at build via the "ten-minute reality test" (MJ6) — they are treated as current-but-perishable, not permanent.
**Revisit trigger:** any of these platform features changes (R-05 platform-evolution risk); the mobile Directory gaining plugin support.

---

## ADR-0026 — flo-ingest & flo-explain overhaul: grounding trichotomy, long-doc fidelity, exam triage

**Date:** 2026-07-06 · **Status:** Accepted · **Decided by:** owner ("summarising materials… and the ones you feed slides in with little to no context… a main point we have to improve considerably") + a verified deep-research pass (`docs/design/ingest-explain-improvement-spec.md`)

**Context.** Explaining concepts (~61%) and summarizing (~49%) are the #1–2 student uses, and hallucination is the #1 trust deterrent (HEPI, verified). The prior skills were grounded and close-loop but under-specified where it matters: (a) the pointer was asserted, not required to *resolve*; (b) the self-check was "silently re-check your own…" — bare self-reflection, which does NOT improve accuracy and can degrade it (Overmind F15); (c) summaries defaulted to page-ordered prose (a low-utility artifact; retrieval is the high-utility one — Dunlosky/Roediger); (d) no long-document strategy existed; (e) flo-explain had only a two-bucket model (on-source vs outside-materials), forcing a slide's *inference* to masquerade as fact or be dropped — the exact fabrication risk for low-context slides.

**Decision.** Adopt the improvement spec. Load-bearing changes: (1) **grounding trichotomy** both tiers — every claim is on-page (resolvable pointer / 3–6 word quote), my inference (tagged), or outside your materials (tagged); (2) **ask before you guess + "can't tell from this slide"** in flo-explain — never fabricate the missing lecture; (3) **verify against the SOURCE, not yourself** — external check replaces bare self-reflection (F15/F13); (4) **long-material handling** — bounded chunks + carried page-anchored running outline (power tier persists it to a file), honest coverage statements; (5) **exam triage + retrieval-first** — rank topics by the existing (frequency|syllabus|past-exam) tags, spend depth by rank, recall items become the primary deliverable.

**Consequences.** Tightens grounding-by-default, targets the two verified top failure modes, adds no orchestration (prompt/skill rules + existing file writes). Novice additions fit the budget (pack 7,997/8,000; SETUP.md copy-block regenerated byte-identical per F26). Two runnable evals specified (ambiguous-slide fabrication probe; long-doc tracer-fact + decoy fidelity) as regression gates.
**Revisit trigger:** the ambiguous-slide fabrication rate or long-doc late-fact recall fails its eval; the trichotomy proves too heavy for the novice budget at gate.
