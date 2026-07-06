# v1 Design Blueprint — Flo's Toolkit · **Revision 4**

**Date:** 2026-07-02 (rev 4, same day) · **Status:** rev 1 FLAWED
([design-review.md](design-review.md)) → rev 2 NOT CLEARED
([delta-review-1.md](delta-review-1.md): blocking items B1–B4 + 10 conditions) →
rev 3 CLEARED by bounded re-check → **rev 4: owner-directed changes (ADR-0016–0018):
PromptForge on vague messages, project-memory persistence replacing the save ritual,
always-on scope.** Rev 4 partially supersedes the cleared B2/B3 mechanisms; the M1
gate inherits verification (memory-persistence build-time test).
**Finding dispositions:** [review-dispositions.md](review-dispositions.md). Rev 1 is
preserved in git history; per ADR-0001 nothing is silently deleted.
**Rev-2 headline changes:** novice-tier persistence redesigned around a
student-executed save ritual (C1); onboarding redesigned as a guided setup page with
self-verifying install (C2); a cue layer added so retrieval actually fires (C3);
retrieval-fidelity, calibration, grounding, and ledger-schema specs added (C4–C7);
capability matrix re-verified against July-2026 platform reality (MJ6); consolidated
M1 gate adopted (MJ16); citations corrected (MJ13, MN4–6).

---

## 1. Design thesis (unchanged in substance; citations corrected per MJ13)

Students already ask AI for explanations and summaries — the top two assessed-work
uses in the UK survey series (HEPI 2025/26, verified) and the #1 comprehension use in
the German and Chegg surveys — and our cohort already pays for Claude Pro (~90%,
owner estimate, OQ-7; confirm per-friend at M1). The product does not create demand
and does not require switching. It **intercepts the behavior students already
exhibit, on the tool they already pay for, and makes every output leave a durable
learning artifact behind** — the persistence + workflow depth no incumbent currently
ships (evidence GAPs 1–3, moderate-strength snapshot under quarterly re-scan, R-10).

One sentence for a friend: *"You already use Claude — this makes it remember your
progress and what matters for your exams, turn everything you ask into exam prep,
and do whole jobs in one command."* (Wording carries the F1 mental model: it keeps
your course map and progress, **not your files** — re-attach files for detail
questions; the assistant routes such questions to a graceful re-attach ask.)

## 2. The core loop — rev 2, with the two missing legs installed

```
INTAKE ──────► FORGE ──────► ARTIFACT ──────► MEMORY ──────► CUE ──────► RETRIEVAL
materials /    clarify if     answer +         PROGRESS       footer,     delayed quiz,
any message    vague, 6-10    retrieval        RECAP auto-    .ics,       calibration,
(always-on,    taps, confirm  items +          captured by    due items   countdown
ADR-0018)      (ADR-0016)     grounding        project mem.   (C3)        sessions
        ▲                                      (ADR-0017)                      │
        └──────────────── weak/due topics steer next intake ◄──────────────────┘
```

Loop rules (defaults, never blocks — ADR-0004 amendment):

1. **Every comprehension output doubles as study input** — summaries and topic maps
   emit retrieval items; `/explain` answers **first**, then appends exactly one
   atomic item (<15 s, answerable inline) plus a one-line offer (MJ2 re-scoping).
   Quiz-first applies only in declared review contexts: `/quiz`, post-`/ingest`
   offers, countdown sessions — and **every quiz-first message prints its bypass
   verbatim**: "say **skip** for the answer — no judgment."
2. **Grounding by default (C6):** claims about course material carry inline pointers
   to source file/section; anything not derivable from uploads is tagged **"outside
   your materials"**; `/ingest` and `/examkit` end with an automatic self-check over
   their own high-stakes claims (dates, definitions, formulas). The student never
   needs to know the word "hallucination" to be protected from one.
3. **Retrieval fidelity (C4):** default item format is **cued recall**; items
   delivered one at a time, answer withheld until the student responds, never in the
   same message as the source summary; quality criterion #4: "answerable only from
   memory, not by matching visible wording." Multiple-choice only where
   discrimination is the goal, never the majority.
4. **Delay discipline (C3/C7):** items are quizzable immediately for practice, but
   mastery updates only from attempts ≥1 day after creation. Same-session quizzing is
   labeled practice, not progress — this is what separates the product from a
   fluency-illusion generator. M1 claims retrieval practice (g≈0.50); the full
   spaced-retrieval claim (g=0.74) is earned only where a real scheduler exists.
5. **Calibration protocol (C5):** per-item confidence collected *before* the answer
   is revealed; grading by answer-key **self-scoring** (Claude shows the model
   answer, the student marks it — the lenient-judge role moves to the student);
   checks run only on material ≥2 days old; a large gap triggers action, not
   commentary (topics auto-join the weak list, next `/quiz` opens with them);
   predicted/actual pairs logged in the ledger (bet 3's longitudinal data).
6. **The felt experience is engineered (MJ12, arithmetic fixed per B4):** the ~80%
   in-session success band is **controlling**; the 70/30 weak/due-strong mix is
   advisory only, and the band is held by adjusting scaffolding *within* weak topics
   (easier cue formats first, harder as they strengthen) rather than by abandoning
   weak-first steering. Every session ends with a concrete, screenshot-able progress
   delta; **cold start is honest**: the first session's delta reports coverage and
   practice ("6 topics mapped · 12 items practiced — real progress shows tomorrow:
   come back for a 5-minute quiz"), never mastery; never-attempted items default
   **due-weak**; same-session practice earns a distinct non-mastery reward token (a
   practice streak, not a mastery tick). Calibration is framed as a skill trending
   upward; sessions are bounded (~10 min / ~12 items, hard stop offered); per-ingest
   emission caps and a one-command amnesty ("reset my reviews to what matters for the
   next exam") prevent the review-debt spiral. **Retirement means interval extension,
   never deletion**: "mastered" = 3 consecutive successful delayed attempts; retired
   items are resurfaced by `/examkit` pre-exam.

## 3. Persistence & distribution on the novice tier — the honest version

**Rev 4 (ADR-0017): project memory is the carrier; nobody saves anything.** C1's
platform fact stands — Claude cannot write Project knowledge — but claude.ai's
project-scoped memory (per-Project, automatic, user-viewable/editable, cross-device;
verified against Anthropic help docs 2026-07-02) removes the need for a student
write loop. Mechanism: the pack emits a plain-prose **PROGRESS RECAP** at quiz end,
exam-kit end, and session close (format spec §0) — visible progress for the student,
dense capture material for memory; sessions open by recalling state. The precise
ledger below demotes to **on-demand export** ("export my progress") and the
tier-migration vehicle; phone receipts demote to fallback (memory is cross-device).
Trade-off on the record: memory is lossy and not under our control — item-level SRS
precision degrades to topic-level on this tier; setup gains an "enable memory" step;
the M1 gate gains the memory-persistence test that now carries what the rev-3
clearance covered. **If that test fails, fall back to the rev-3 ritual below or
promote the Desktop tier to default.**

**Rev-3 mechanism — retained for the export format, the Desktop/plugin tiers, and
as the memory-off fallback.** Who writes the ledger there: the student, not Claude
(C1 — verified against platform docs, July 2026):

- **One emission policy (B2), defined here and nowhere else.** Light interactions
  (`/explain`, quick Q&A) **accumulate deltas** — no ledger block is emitted. The
  complete updated ledger is emitted only at: session close, `/quiz` completion,
  `/examkit` completion, or an explicit *"save"*. The status footer carries the
  unsaved-delta count ("3 unsaved changes — say *save*"). The save itself is framed
  honestly: *copy the block, then in Project knowledge delete the old ledger file and
  paste this as its replacement — about 20 seconds, 4 steps* — drilled once,
  identical forever. Ledger emission is a named cost driver in the M1 cost-class
  measurement.
- **Hot/cold ledger split (B2).** The ledger holds a **hot section** (~1.5K-token
  budget: active exam window — due items at item level with their attempt fields,
  current weak topics, deltas) and a **cold archive** (~1K: completed topics rolled
  up to one-line aggregates). Rotation rule: when an exam passes or a topic is
  mastered, its item-level entries roll up into a topic aggregate. Item-level detail
  therefore exists only for the ~40–60 currently active items, never for a whole
  300-item course — the formats spec re-runs this arithmetic explicitly and the
  2.5K/course cap holds by construction, not hope.
- **Staleness is self-announcing.** The ledger carries a `last-updated` header; every
  session opens with Claude stating ledger age and, if stale, offering "paste your
  latest ledger or say *rebuild*."
- **Mobile emits receipts, not saves (B3).** Phone quiz sessions end with a ~10-line
  **quiz receipt** (course · date · items attempted · self-scored results ·
  confidence) the student copies or screenshots; the next laptop session opens by
  asking for phone receipts and folds them into the save. This preserves exactly the
  delayed attempts that are allowed to update mastery. If no receipt survives, phone
  quizzing counts as practice only — stated in the footer, never silently dropped.
  Device bias is a named measurement caveat (§7).
- **Redundant hot fields.** Where the account's memory feature is on, Claude is
  instructed to remember exam dates and top weak topics, so a stale file degrades
  gracefully. Best-effort, documented, never load-bearing.
- **Recovery.** A rebuild-from-artifacts path ("paste any decks/maps you still have")
  and a snapshot habit (keep last week's file until the new one works) are in the
  runbook and the ledger header itself.

**Distribution: a guided setup page, not a shared Project** (C2 — Project sharing is
Team/Enterprise-only; the cohort is individual Pro). Setup is a first-class product
component: one self-contained page of ordered copy-blocks with per-surface
screenshots; laptop-only, declared; ~10-minute target. The instruction pack is
**self-verifying**: its first taught behavior is *"say `check my setup`"* — Claude
replies with the pack version and a functional checklist, catching mis-pastes in
message 1. "Unaided" is operationally defined (link sent by text, no contact until
success or give-up; give-up point = the primary bug). Custom skills on Pro are
evaluated during the M1 build as a sturdier command vehicle; the instruction pack is
the baseline.

**Project topology (MJ8): one Project — "Your Studies"** — with per-course ledger
files. Course detection on every upload with confirmation; explicit course context at
session start and switches; `/ingest`/`/examkit` run input sanity checks (unreadable
scan, duplicate, syllabus mismatch → say so).

**Lean-project rule (MJ4):** Project knowledge permanently holds only ledgers, the
semester map, and topic maps (≈2.5K-token budget per course ledger, enforced by the
hot/cold split above). Raw materials are ingested in-chat and their distillates
written to the ledger; raw files are not retained in knowledge — keeping the Project
out of silent RAG-mode degradation. **RAG canary (delta condition 7):** the ledger
ends with a fixed canary paragraph; before any ledger-reading command, Claude checks
the canary is visible and, if not, prints a fixed warning line ("I may be seeing only
part of your ledger — results may be incomplete"). M1 tests that forced degradation
is announced, not silent.

## 4. Capability matrix — re-verified July 2026 (MJ6; supersedes rev 1 §3)

| Capability | claude.ai Project (novice) | Claude Desktop / Cowork (middle) | Claude Code plugin (power) |
|---|---|---|---|
| Delivery | Guided setup page + self-verifying instruction pack | Same pack + local folder access | Plugin: skills, agents, hooks |
| Ledger writes | **Student-executed save ritual** | **Auto-maintained local files** — dissolves C1 for anyone who installs the desktop app | Versioned files in repo |
| Commands | Instruction-pack routing (+ skills if M1 evaluation passes) | Same | Slash-command skills |
| Cues/scheduling | Status footer + **.ics export** (phone is the scheduler) + session-start due items | Same + local reminders where available | SessionStart hooks ("open Claude Code in an exam window → countdown surfaces first") + .ics. **No exam-critical reminder rides a fire-may-skip scheduler.** |
| Usage log (ADR-0012 as amended) | Append-only event lines in ledger (`date · command · offered/completed/bypassed`) — counts derived by counting lines | Same, auto-written | Same, auto-written |
| Sharing | **SHAREABLE artifacts only** (see §6 taxonomy) via chat-paste format | Same + files | Same + files |
| **Enforcement nature (B1c)** | **Probabilistic** — instruction adherence, with documented long-chat decay; backstopped by the ≥80% adherence gate | Mixed — instructions + real files | **Deterministic** — hooks/skills execute regardless of attention |

The middle tier is new in rev 2: Cowork/Desktop is the cheapest honest fix to C1 for
willing friends, using the *same instruction pack and artifact formats* — one design,
three surfaces, no second codebase. M1 ships the novice tier; a one-course Cowork
prototype of the ledger write-loop runs during M1 as a feasibility probe (MJ6).

## 5. v1 component inventory (allocation per ADR-0009: 50/25/15/10)

### A. Study & memory (~50%)
- **Course ledger** — now a **specified format**, not prose (C7): canonical schema doc
  (`product/formats/artifact-formats.md`, shipped at M1) with required sections, key
  names, worked example; **append-only** error log, session history, and usage log
  (rewrites add lines, never regenerate); per-item fields `{created, last_attempt,
  delay, self_graded_result, confidence}`; mastery computed only from delayed
  self-scored attempts, decaying toward "due" after 7 days stale; structural
  keys/headings always English, content mirrors the student (resolves the ADR-0010
  collision, MJ15). Header: version stamp, `last-updated`, "Personal — share
  deliberately" (MJ14), and the F1 mental-model line ("this file is your course map
  and progress — not your course files; re-attach files for detail questions"). **Health check**: "check my ledger" validates the schema in
  plain language — step one of every repair runbook.
- **Deck emitter** — retrieval-fidelity spec (§2 rule 3) + R-11 quality pass +
  emission caps ranked by triage (MJ12).
- **Explain** (`/explain` · "explain this to me") — answers first; one atomic item
  appended, **drawn from a due ledger topic when one exists** (spacing the item);
  when none exists, the fresh item is practice-only — exempt from §2 rule 3 delivery
  constraints and from mastery updates (delta condition 4). Ledger delta accumulates
  toward the next save (§3 emission policy — no ledger block from light commands).
- **Quiz** (`/quiz` · "quiz me") — bounded session (~10 min/~12 items), 70/30
  weak/due-strong mix (advisory — the §2 rule 6 success band is controlling), one
  item at a time, self-scored, ends with the progress delta.
  **Phone-native by design**: pure conversational turns, zero file access, 5-item
  batches, no save requests on mobile (MJ11).
- **Exam kit** (`/examkit` · "make my exam kit") — opens with an **input-sufficiency
  stage** (coverage report against syllabus/semester map: "12 topics listed; your
  uploads cover 7 — missing X, Y, Z; proceed or add?"); topic map **shows its
  evidence per topic** with confidence labels and an honest banner when unweighted;
  coverage-complete decks with priority *ordering* so a wrong ranking costs
  efficiency, not coverage (MJ9); chunked by design with quota seams and an opening
  time-and-quota estimate (MJ3); emits the countdown **.ics** — *build-time
  verification required: if claude.ai file creation can't ship a working .ics, the
  designed fallback is a plain dated list the student adds to their calendar
  manually; phone-import step on the setup page either way (delta condition 8)*;
  **<48h cram branch**: skips the countdown, emits a triaged cram sequence (MJ12).
- **Calibration check** — per §2 rule 5.

### B. Reading & research (~25%)
- **Ingest** (`/ingest` · "read this for me") — in-chat ingestion (lean-project
  rule), structured notes at chosen depth + ledger distillate + capped deck items;
  grounded per §2 rule 2. Summaries never arrive alone.
- **Self-explanation** — default next turn after `/ingest` (decline, not opt-in);
  offered-vs-attempted tallied next to bypass rate; evaluator names one gap before
  praise (MN3).

### C. Planning (~15%)
- **Semester map** — syllabi → deadline/exam calendar (ledger + .ics).
- **If-then plans** — the *student authors* one plan at onboarding, anchored to an
  existing weekly event, and sets the matching phone reminder themselves; the d=0.65
  citation attaches at stage 3 where cue delivery is real, not to M1 (C3).
- **First session = starter kit** (MJ3): one course, 1–3 files → triaged topic map +
  one small deck + a 3-question quiz. Honestly ~5 minutes, demonstrates the whole
  loop. Full `/examkit` is advertised session two.

### D. Writing (~10%)
- **Rubric-based draft feedback ships in the M1 instruction pack as an unnamed
  default behavior** (MJ10 — ADR-0015 defers the *command*, not the instruction-layer
  behavior; ADR-0003 demands every-message impact). `/feedback` becomes a named
  command with the writing slice. Success framed as cross-assignment improvement;
  effect sizes tagged unverified-strong; L2 subgroup (g=0.72) noted — direct support
  for Romanian students writing English (MN5). `/quiz` emits essay-appropriate
  retrieval formats (argument reconstruction, outline-the-answer) for essay-assessed
  courses.

### E. Cross-cutting
- **Onboarding — split into core and drip (delta condition 2).** **Minute-one core
  teaches exactly four concepts:** setup, "check my setup", the save ritual, and the
  starter kit. Everything else — entry habit if-then, Project pinning, phone
  walkthrough, gather checklist, training-toggle sentence (MJ14), the F1 mental-model
  line, the de-programming curriculum (OQ-2) — arrives as **contextual drip** at the
  moment it's relevant (first phone session teaches pinning; first `/examkit`
  re-surfaces the gather checklist). Total first-contact time — not setup alone — is
  an M1 gate measurement. Setup page prints the expected `check my setup` reply
  **verbatim** ("Flo's Toolkit v___ + checklist — if you see anything else, step 3
  failed"), and the §8 ten-minute reality test includes a deliberate mis-paste
  negative case and times one full save round-trip (delta condition 5).
- **Intent routing (MJ7)** — instruction-pack table mapping fuzzy English AND
  Romanian phrasings → commands, confirm-and-teach replies ("Building your exam kit —
  next time just say *make my exam kit*"); standing "what can you do" alias; one-line
  menu at each new conversation; artifacts self-advertise the next command in their
  footers.
- **Status footer (C3), salience-modulated (delta condition 1)** — the **full** footer
  (course · exam countdown · due items · quiz offer · unsaved-delta count) appears
  only on state change and at session boundaries; inside quiz blocks it is
  suppressed entirely; otherwise a minimal marker. Per-message chrome is part of the
  MJ5 adherence gate's scripted measurement, and the M1 friend debrief includes a
  footer-noticing probe (do they still see it in week two?).
- **One diagnostic front door (delta condition 6)** — "is it working?" (intent-routed)
  runs setup, ledger, and toolkit checks as one umbrella; `check my setup` /
  `check my ledger` / `/checkup` remain internal names in the runbooks.
- **Plan-aware behavior (ADR-0005)** — cost classes measured on a realistic course at
  M1 (not vibes); heavy commands open with estimates and offer lighter variants;
  chunking seams respect the 5-hour window (MJ3).
- **Artifact taxonomy (MJ14)** — **SHAREABLE** (stripped decks, topic/semester maps;
  chat-paste format emitted alongside canonical .md) vs **PERSONAL** (ledger, error
  log, calibration, usage log; never emitted in share format; export strips personal
  annotations by default).
- **Versioned, self-diagnosing template (MJ15)** — version string in the pack and
  stamped into every artifact header; `/checkup` ("is my toolkit working?") runs a
  fixed checklist and emits a paste-able report for repair sessions; documented
  2-minute update procedure announced via the group chat; golden transcripts in the
  repo as behavioral fixtures; monthly/after-platform-change golden-session smoke
  test (5–8 prompts, expected behaviors, logged), piggybacked on the quarterly
  incumbent scan; repair runbooks use synthetic fixtures first (MN2).

### F. The instruction pack — budget, ranking, overflow (B1; a design decision, not a build task)

Working budget **8,000 characters**, allocated per standing behavior and ranked by
load-bearing order. **Overflow policy: cut from the bottom, never squeeze the top**;
per-command depth moves to on-demand expansion prompts hosted on the setup page
("advanced cards"), or into custom skills if the M1 evaluation passes.

| Rank | Behavior | Budget (chars) |
|---|---|---|
| 1 | Save ritual + emission policy + staleness announcement (§3) | 900 |
| 2 | Grounding by default + self-check pass (§2 r2) | 700 |
| 3 | Quiz protocol: fidelity, delay discipline, self-scoring, session container, success band (§2 r3–6) | 1,200 |
| 4 | Cue layer: modulated footer + due-item surfacing + receipts ask (§2, §3) | 600 |
| 5 | Intent routing incl. Romanian + confirm-and-teach + menu (MJ7) | 900 |
| 6 | Command definitions: starter kit, /examkit sufficiency stage, /ingest, /explain | 1,700 |
| 7 | Ledger schema reference + health check + RAG canary check (§3, C7) | 700 |
| 8 | Identity, version, language mirroring, diagnostics front door | 500 |
| 9 | Plan-aware cost behavior (ADR-0005) | 400 |
| 10 | Feedback-on-drafts default behavior (MJ10) | 400 |
| — | **Total** | **8,000** |

The pack is written to this table; the table is enforced at the MJ5 adherence gate
(scripted 15-turn session, ≥80% on ranks 1–4 specifically). Tier enforcement
asymmetry is stated in §4: this entire layer is probabilistic on the novice tier and
deterministic only on the power tier.

## 6. Milestones and the consolidated M1 gate (MJ16)

| M | Increment | Gate (summary — full list below for M1) |
|---|---|---|
| M1 | Novice-tier pack: setup page, instruction pack, ledger schema, starter kit, /explain /ingest /quiz /examkit + feedback behavior | **Consolidated gate below** |
| M2 | Claude Code plugin (same components as skills, unattended ingest) + Cowork middle-tier validation | Fresh-session repair from runbooks alone; cross-tier ledger round-trip |
| M3 | Memory maturity: weak-topic steering validated, calibration data flowing, usage-log data from ≥5 friends; **revisit expanding vs uniform spacing** (MN4 — expanding schedules gain value at many exposures) | Event-log reliability re-verified at scale; bypass falsification threshold armed |
| M4 | Stage-3 routines (SessionStart + .ics patterns) + public release prep | R-09 checklist executed (now falsifiable); Romanian grounding gate; intended-purpose statement; marketplace hygiene |

**Consolidated M1 gate** — all must pass, each traced to a finding:
setup from link alone, unaided, <10 min, self-check passes in message 1 (C2) ·
second session on a different day, Claude knows the course without re-uploads (C1) ·
ledger current after one week unsupervised (C1) · one unprompted return within 7 days
(C3) · sampled items meet the retrieval-fidelity spec (C4) · zero unlabeled
ungrounded claims in a sampled kit (C6) · usage-log lines reliably written across N
sessions (MJ1) · all four commands reached via natural phrasings incl. Romanian, zero
coaching (MJ7) · two real courses, one Project, ledgers uncrossed (MJ8) · kit checked
against exam ground truth (MJ9) · gate friends span the assessment mix, ≥1
essay-heavy (MJ10) · one phone-only quiz + one artifact shared from a phone (MJ11) ·
one image-heavy 100+ page Romanian PDF in the test set · instruction adherence ≥80%
over a scripted 15-turn session incl. per-message chrome budget (MJ5, delta cond. 1) ·
forced RAG-mode degradation is announced, not silent (MJ4) · break-and-repair drill:
corrupt a ledger + mangle an instruction block, fresh session + runbooks recover
(MJ15) · training-toggle disclosure present (MJ14) · 10-minute debrief per gate
friend ("show me your last three chats") incl. footer-noticing probe (MJ1, delta
cond. 1) · **phone-quiz receipt survives the round-trip into a laptop save** (B3) ·
**total first-contact time measured**, not setup alone (delta cond. 2) · .ics (or
fallback) imports on a phone (delta cond. 8) · **one-week in-Project chat-fraction
observation for both friends** (MJ11, restored per delta cond. 9).

## 7. Falsifiable bets — instruments repaired

1. **Conversion bet** — measured by **bypass events per context** (quiz session vs
   appended item; week-1 vs steady state), from the append-only usage log; artifact
   *use* measured separately from artifact existence. **Pre-registered falsification
   threshold: sustained bypass >60% over 2 weeks → R-12 redesign toward the
   deferred-assistance pattern.** Novice-tier numbers carry known compliant-user bias
   until M3 plugin data exists — stated, not hidden (MJ1).
2. **Item-quality bet** (R-11 + C4) — tested against the retrieval-fidelity spec at
   the M1 gate; **blocking inputs to the M1 build**: the LLM question-validity
   literature (promoted from reading list) and the SRS-dropout/desirable-difficulties
   literature (MJ12 pull-forward, delta cond. 10).
3. **Transfer bet** — Bastani et al. is **verified-adjacent** (Turkish high-school
   math): harmed students did not perceive worse performance *in the one RCT that
   measured it*; our bypassable variant is directly supported only by
   moderate-strength deferred-assistance evidence (arXiv 2026) and is itself under
   test via bet 1. Calibration logs test transfer locally (MJ13 rewording).
4. **Moat bet** — quarterly incumbent scan (R-10); golden-session smoke test doubles
   as the platform-drift detector (MJ15; R-05).

Retention metric: "active in N of last 4 weeks, exam-calendar adjusted" — weekly raw
counts misread an exam-cyclical cohort (MJ1). Fortnightly owner-initiated counter
ask; non-response pre-registered as churn. **Measurement caveats:** novice-tier
compliant-user bias (MJ1) **and device bias** — phone sessions reach the record only
via receipts, so mobile-heavy users under-appear in mastery data (B3).

**Pre-committed decision boundary (delta review, residual-risk section):** the whole
critical path on the novice tier rides probabilistic instruction adherence. **If M1
gates fail on adherence rather than on spec defects, the response is tier migration
(deterministic skills / Cowork / hooks), not another instruction-pack rewrite.**
Written down now, while nobody is attached to the outcome.

## 8. Next actions

1. ~~Adversarial design review~~ — FLAWED; 29 findings disposed
   ([review-dispositions.md](review-dispositions.md)).
2. ~~Delta review of rev 2~~ — NOT CLEARED (B1–B4 + 10 conditions,
   [delta-review-1.md](delta-review-1.md)); **rev 3 resolves B1–B4 (§3 emission
   policy + hot/cold split; §5F budget table; B3 receipts; §2 r6 arithmetic) and
   lands conditions 1–10 in text or named M1 deliverables.**
3. **Bounded re-check of rev 3** — B1–B4 only, plus spot-check that conditions 1–10
   appear (per the chair's prescription; no full re-review).
4. M1 build: setup page, instruction pack (written to the §5F table), artifact-formats
   spec (incl. hot/cold arithmetic for a 300-item course, receipt format, RAG canary),
   cheat sheet, starter ledger, runbooks + golden transcripts. Ten-minute reality test
   (C2, with mis-paste negative case and timed save round-trip) and Cowork write-loop
   probe (MJ6) run during the build.
