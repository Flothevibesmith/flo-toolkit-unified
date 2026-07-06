# Adversarial Design Review — Flo's Toolkit v1 Blueprint

**Review record** · Committee synthesis of 8 independent lenses · 2026-07-02
**Subject:** `docs/design/v1-blueprint.md` (owner-reviewed 2026-07-02) against locked constraints in `docs/decisions/decision-log.md` (ADR-0001–0015)
**Lens verdicts:** novice-ux **flawed** · learning-science *sound-with-changes* · platform-feasibility **flawed** · privacy-gdpr *sound-with-changes* · cohort-fit **flawed** · maintainability **flawed** · behavior-adoption *sound-with-changes* · claim-verification *sound-with-changes*

---

## 1. Overall verdict: **FLAWED** — do not begin the M1 build against this blueprint

**The one sentence the builder must hear:** The novice tier — the only tier M1 ships, and the tier 100% of the first cohort lives on — is built on two platform capabilities that do not exist (Claude cannot write to claude.ai Project knowledge, and individual Pro accounts cannot receive a Project by shared link), so the core loop's persistence layer and the "zero-install" onboarding are both fiction until redesigned.

This is not a condemnation of the thesis. The design thesis (intercept existing behavior, leave durable artifacts, quiz-first without gatekeeping) survives every lens; no lens attacked the locked ADRs and won. What is flawed is the **mechanical realization on the launch tier**: the blueprint's §3 capability matrix asserts mechanisms the platform does not provide, the loop's RETRIEVAL leg has no trigger, and the single thesis-testing metric has no reliable collection channel. Every one of these is fixable at design-time cost — prose, schemas, and gate criteria, not new machinery. The blueprint should be revised and re-passed through its own gates before M1 build begins.

Note also: **ADR-0003's revisit trigger has already fired before a line of M1 exists** — "Anthropic platform changes that materially expand or restrict what claude.ai Projects can do." Both directions apply: restrictions the matrix ignores (no ledger write path, no template sharing, RAG-mode retrieval) and expansions it predates (custom skills on Pro, Cowork GA). Re-running the capability matrix against July-2026 platform reality is a blocking pre-M1 action.

---

## 2. Convergence map (dedupe)

Independent lenses, working blind to each other, converged repeatedly. Convergence is signal — these are the load-bearing defects:

| Converged flaw | Lenses that found it independently |
|---|---|
| Novice-tier ledger has no write path (Claude cannot update Project knowledge) | novice-ux, platform-feasibility, cohort-fit, maintainability, behavior-adoption — **5 of 8 lenses**, 5 separate critical/major findings |
| "One shared link → copy a Project template" does not exist on individual Pro plans | novice-ux, platform-feasibility, cohort-fit — **3 lenses, all critical** |
| The RETRIEVAL leg of the loop has no trigger/cue/scheduler on the novice tier | learning-science, cohort-fit, behavior-adoption — **3 lenses** |
| The thesis metric (bypass rate) has no reliable measurement channel and is survivorship-biased by construction | claim-verification, maintainability, cohort-fit, behavior-adoption, (label defect: privacy) — **5 lenses** |
| Quiz-first is mis-scoped (interposed on demand-driven /explain) and its bypass word is unprinted | novice-ux, behavior-adoption, learning-science |
| /examkit triage is confident output from unvalidated/insufficient inputs | learning-science, cohort-fit |
| Phone-first cohort, laptop-shaped flows | novice-ux, cohort-fit, behavior-adoption |
| The M1 gate tests one-shot pipeline completion, not persistence, repair, exam-fit, device mix, or metric reliability | raised in some form by **7 of 8 lenses** |
| Bastani citation drift (verified-adjacent demotion not carried into §2) | learning-science, claim-verification |

The deduplicated findings below merge 40 raw findings into 7 critical, 13 major, and 6 minor items.

---

## 3. CRITICAL — must fix before M1 build begins

### C1. The ledger has no write path on the novice tier — the core loop's persistence layer is fiction where M1 ships
**Lenses:** novice-ux, platform-feasibility, cohort-fit, maintainability, behavior-adoption (all independently; strongest convergence in the review)

**Attack.** §3 claims novice-tier ledger = "Project knowledge docs, updated via commands." Claude on claude.ai cannot create, edit, or replace Project knowledge files (confirmed against Anthropic's own help docs by the feasibility lens). Every "ledger update" is actually: Claude prints a new ledger → student downloads/copies → deletes old file → re-uploads — after every session, forever, performed by a cohort *defined* by doing zero manual persistence (cohort-story F1: they don't use Projects at all). Cascade: the ledger goes stale silently → "the second conversation already knows their course" (the F1 test) fails → weak-topics-first quizzing (§4A) and "weak topics steer next intake" (§2) read dead state → the ADR-0012 self-tally counter dies with it → the M3 gate's data channel dies with that. The blueprint calls the ledger "the product's soul" and never names who performs the write. On the phone — the designated review surface (OQ-3) — the round-trip is effectively impossible.

**Fix (composite of all five lenses).** Redesign novice-tier persistence explicitly before M1: (a) collapse all state changes into **one atomic end-of-session artifact** — every command ends by re-emitting the full ledger with an always-identical one-line replace instruction; onboarding drills this as THE ritual, framed as "save your progress," never required on mobile (mobile deltas fold into the next laptop session); (b) make staleness **self-announcing** — ledger carries a last-updated header; Project instructions require Claude to open every session stating ledger age and offering "paste the latest or say rebuild"; (c) evaluate claude.ai project-scoped memory as a redundant carrier for the few hot fields (exam date, top weak topics) so a stale file degrades gracefully — and document the decision either way; (d) document a rebuild-from-artifacts recovery path; (e) state honestly in §3 that novice-tier ledger updates are *student-executed, not command-executed*. Add to the M1 gate: one friend returns on a different day and Claude demonstrably knows their course without re-uploads; ledger still current after one week unsupervised.

### C2. The onboarding distribution mechanism does not exist: no shareable Project templates on individual Pro plans
**Lenses:** novice-ux, platform-feasibility, cohort-fit (all critical)

**Attack.** §3/§4E promise "one shared link → copy a Project template (zero install)." Project sharing is a Team/Enterprise feature; the cohort is ~90% individual Pro (OQ-7). The real path is five-plus manual steps (create Project → paste a multi-thousand-character instruction block into the right field → upload starter files → gather materials) performed by users who have never opened Projects, at minute one of lowest trust — with classic failure modes (pasting instructions into the chat box, truncated paste) that produce a silently non-functional install. The M1 gate word "unaided" is currently scored against a setup flow that was never designed, and the fallback (Flo hand-holds his two friends) means the gate would measure Flo, not the product.

**Fix.** Run the ten-minute reality test first (hand a Project to a second Pro account; record every step). Then design setup as a first-class M1 component: a single self-contained onboarding page of ordered copy-blocks with per-surface screenshots; a **self-verifying instruction pack** whose first behavior is "say *check my setup*" so a mis-paste is caught in message 1; laptop-only setup declared, phone declared review-only; evaluate claude.ai custom skills (uploadable on Pro) as the more reliable command vehicle. Define "unaided" operationally: link sent by text, no other contact until success or give-up, give-up point recorded as the primary bug. Add a separate M1 sub-gate: friend reaches a working Project from the link alone in under 10 minutes.

### C3. The loop's RETRIEVAL leg never fires: no scheduler, no cue, no re-entry mechanism — yet §1 claims the spaced-retrieval effect (g=0.74)
**Lenses:** learning-science, cohort-fit, behavior-adoption

**Attack.** Spacing presupposes a scheduler; §3 honestly marks scheduled routines "✗" on the novice tier, and routines arrive at M4 on a tier novice friends will never install. Nothing substitutes: no calendar artifact, no reminder step, no session-start surfacing of due items. The natural M1 flow (emit deck → quiz it in the same session) is **massed practice** — Roediger & Karpicke's verified crossover predicts inflated immediate scores recorded as mastery, manufacturing the exact fluency illusion the product exists to destroy. The AI-authored if-then plans (§4C, d=0.65) cannot serve as the cue: the effect requires self-generated plans plus a delivered trigger, and a line in an unopened file is inert. Weekly-use success criterion #1 is structurally unreachable without a cue; /examkit's episodic shape (Romanian exam clusters) guarantees dead zones the metric will misread as churn.

**Fix.** Build a **cue layer inside what the novice tier can actually do**: (1) Project instructions end *every* response with a one-line ledger status footer ("Analiza II: exam in 9 days · 4 weak topics · say *quiz me* for 5 minutes") — this uses the ADR-0003 every-message lever the design already owns, as an offer, never a block (ADR-0004-compatible); (2) /examkit's countdown emits a phone-importable **.ics calendar file** — the student's phone becomes the scheduler, at zero quota; (3) onboarding has the student author and *set* one if-then plan themselves, anchored to an existing weekly event, with the matching phone reminder — and strip the d=0.65 citation from the M1 feature (re-attach at stage 3 where cue delivery is real); (4) **delay discipline in the ledger**: items are quizzable immediately for practice but update mastery only from attempts ≥1 day after generation; every session opens by surfacing due items. Downgrade §1's claim for M1 from spaced retrieval (g=0.74) to retrieval practice (g≈0.50) with spacing dependent on session-start prompts. Gate addition: one friend returns for an unprompted second session within 7 days; track median generation-to-first-attempt gap.

### C4. No retrieval-fidelity spec: the item-quality pass filters hallucinations, not recognition items
**Lens:** learning-science

**Attack.** Every borrowed effect size comes from recall-format testing; the blueprint never specifies item format anywhere. R-11's pass (self-critique, dedupe, hallucination filter) is all accuracy, zero retrieval demand. The LLM default — multiple-choice paraphrases presented directly under the visible summary — is cued re-reading wearing a quiz costume. The M1 gate ("item-quality pass working") can pass while every item is retrieval-inert, certifying a product that fails its own theory.

**Fix.** Extend R-11 into a retrieval-fidelity spec, testable at M1: default format is **cued recall** (free-recall prompts for conceptual topics; multiple-choice only where discrimination is the goal, never majority); questions delivered one at a time, answers withheld until response, **never in the same message as the source summary**; add a fourth quality criterion — "answerable only from memory, not by matching wording visible in current context." Promote the flagged reading-list item (LLM question validity) to a blocking input.

### C5. The calibration check — the designated defense against the verified "can't feel the loss" harm — is itself uncalibrated
**Lens:** learning-science

**Attack.** As specified ("short unassisted self-test with predicted-vs-actual display") it fails four ways: Claude grades the "actual" (LLM grading is lenient/sycophantic → the gap shrinks artificially and the instrument certifies the illusion it exists to puncture); "unassisted" is unenforceable in a Project full of materials; prediction timing is unspecified (immediate global judgments measure processing fluency, the very bias under test); and nothing happens when the gap is large — under the ADR-0004 no-lecturing constraint it's a dashboard widget. §6 bet 3 (the transfer bet) rests entirely on this instrument.

**Fix.** Specify the protocol: item-level confidence collected **before** each answer is revealed; grading by **answer-key self-scoring** (Claude shows the model answer, the student marks right/wrong — Anki-style, moving the lenient-judge role to the student against a concrete criterion); checks only on material ≥2 days old; a fixed non-judgmental consequence (large gap → topics auto-move to the weak list and open the next /quiz — action, not commentary, which survives the no-moralizing constraint); predicted/actual pairs logged in the ledger so bet 3 has longitudinal data.

### C6. F2 (blind trust, zero verification) is unaddressed: the source-grounding obligation is absent from the blueprint it was flagged for
**Lens:** cohort-fit

**Attack.** Cohort-story flags the F2 fix as "new requirement, not yet in blueprint §4" — and the same-day owner-reviewed blueprint still omits it. The only anti-hallucination machinery (R-11) covers quiz items; the actual F2 surface — explanations, summaries, /examkit topic maps consumed as course truth — ships with no grounding rules. The cohort-story's own remedy ("a verify-this behavior is *available*") fails its own zero-behavior-change test: a cohort with no verification behavior never invokes an available behavior. Romanian↔English translation (ADR-0010 mirroring) adds hallucination surface the Romanian gate doesn't currently cover.

**Fix.** Add a §4E cross-cutting component, **"Grounding by default"**: (a) claims about course material carry inline pointers to source file/section; (b) anything not derivable from uploads is visibly tagged "outside your materials"; (c) /ingest and /examkit end with an automatic self-check pass over their own high-stakes claims (dates, definitions, formulas) — performed by default, not offered. M1 gate: zero unlabeled ungrounded claims in a sampled exam kit; extend the Romanian pre-launch gate to grounding fidelity.

### C7. The ledger has no schema, no measurement semantics, no validator, and no recovery path — corruption is monotonic and invisible
**Lenses:** maintainability (schema/corruption), learning-science (measurement layer)

**Attack.** The ledger is rewritten by an LLM on effectively every interaction, conditioning only on its own previous rewrite — errors compound monotonically (dropped error-log entries, hallucinated mastery, mangled dates, silent truncation) with no ground truth and no fsck the non-technical owner could run. Simultaneously, the blueprint never defines how a quiz response becomes a mastery update: no rubric, no lapse definition, no decay, no distinction between a 5-minute and a 1-week retention interval — so "weak topics first" steers *away* from recently-inflated topics and retires "strong" topics from rotation, eliminating spacing for learned items. ADR-0011's runbook model is unsatisfiable against undefined canonical state: a repair-session Claude cannot distinguish corruption from content.

**Fix.** Make the ledger a specified, checkable format — this is a file-format decision, cheap now, breaking later: (a) a canonical **ledger schema doc** in the repo (required sections, key names, date formats, worked example) referenced verbatim by both tiers; (b) high-loss sections **append-only** (error log, session history, usage log) — rewrites add lines, never regenerate them; (c) each item carries `{created, last_attempt, delay_of_attempt, self_graded_result, confidence}`; mastery computed only from delayed (≥1 day) self-scored attempts and decaying toward "due" with staleness (a crude 7-day rule beats none); /quiz mixes weak-first **plus** due strong items (~70/30); (d) a **ledger health check** command (schema validation in plain language) as step one of every repair runbook; (e) documented rebuild-from-artifacts recovery; snapshot habit ("keep last week's file until the new one works").

---

## 4. MAJOR — must fix before the M1 gate / before friends' hands

### MJ1. The single thesis-testing number cannot be trusted as designed: no bypass-event channel, an unauditable running integer, and survivorship bias by construction
**Lenses:** claim-verification, maintainability, cohort-fit, behavior-adoption (+ privacy on labeling — see MN1)

**Attack.** §6/ADR-0009 stake the project on quiz-first completion vs bypass rate, but the only specified instrument is an invocation self-tally line — a running integer an LLM is asked to increment during full-file rewrites (miscounts, clobbers, resets; corruption indistinguishable from data). Bypass *events* are a finer-grained signal no section defines. The channel is gated on the manual ledger sync (C1), and the students most likely to bypass are least likely to do ledger hygiene — so the number biases optimistic on exactly the metric the conversion bet dies by. Voluntary sharing samples only the retained, so churn — the event criterion #1 exists to detect — is invisible. Onboarding-annoyance bypasses (see MJ2) further contaminate steady-state readings. "Weekly" is also the wrong shape for an exam-cyclical cohort.

**Fix (keeps ADR-0012 fully intact).** Never store a running integer; **store events**: an append-only usage-log section, one line per invocation (`date · command · items offered/completed/bypassed`), written by Claude into the ledger block it already re-emits (students transport it, never author it); counts are derived by counting lines — recountable and auditable. Instrument bypass separately per context (quiz session vs appended item) and per week-1 vs steady state. Add "tally reliably written across N test sessions" to the M1 gate. For M1–M2 treat the metric as qualitative too: a 10-minute debrief per gate friend ("show me your last three chats"). Standing fortnightly owner-initiated counter ask with non-response pre-registered as churn; retention defined as "active in N of last 4 weeks, exam-calendar adjusted"; tally records last-session date so screenshots reveal gaps. Flag in §6.1 that novice-tier numbers carry known compliant-user bias until M3 plugin data exists.

### MJ2. Quiz-first is mis-scoped and its bypass word is unprinted — the default reads as a block exactly where the conversion play lives
**Lenses:** novice-ux, behavior-adoption, learning-science (distinct from disposed critique #8 — see §6 Discards)

**Attack.** §2 says "answer always one word away" — *which word* appears nowhere in the blueprint; an undiscoverable bypass is functionally a block, violating the owner's own ADR-0004 amendment. And the scope is wrong: interposing a quiz on /explain — the #1 demanded behavior and the stated conversion play — greets stressed answer-seekers with an obstacle at the moment of need, teaching "the toolkit makes Claude worse." Bastani's guardrail lived inside an expected tutoring context; here it ambushes a productivity ask. Friction asymmetry (one word to escape, effort to comply) plus instant reward is a textbook habituation gradient for the bypass itself.

**Fix.** (a) Scope quiz-first to declared review contexts (/quiz, post-/ingest offers, countdown sessions); /explain answers **first**, then appends exactly one atomic retrieval item (<15 s, answerable inline) plus a one-line offer; (b) every quiz-first message prints its bypass verbatim ("say **skip** for the answer — no judgment"), token recorded in the instruction pack and runbook; (c) equalize friction and reward compliance instantly (visible mastery tick); (d) pre-commit a falsification threshold for bet 1 (e.g., sustained bypass >60% over 2 weeks → trigger the R-12 redesign toward the deferred-assistance pattern) and measure **artifact use** (decks actually quizzed) separately from artifact existence, so the "artifacts persist anyway" defense becomes checkable.

### MJ3. "Exam kit in 5 minutes" is a broken first-session promise, and the architecture maximizes cost on the quota pool it promises to optimize
**Lenses:** novice-ux, platform-feasibility

**Attack.** The flagship heavy pipeline is the *first* command a novice runs, on materials they haven't gathered (F3), on a shared Pro 5-hour window that a semester of slide PDFs will chew through — while ADR-0005 requires heavy commands to warn and downshift, contradicting the 5-minute-flagship framing. Meanwhile the design maximizes every cost driver at once (knowledge re-sent per message, verbose multi-artifact outputs, long chats); Anthropic's own usage guidance says minimize both. Predictable outcome: a truncated half-kit and a rate-limit wall at the highest-churn moment, inverting the "get more out of what you already pay for" pitch.

**Fix.** First session = **starter kit**: one course, 1–3 files, producing a triaged topic map + one small deck + a 3-question quiz — honestly ~5 minutes and demonstrates the whole loop. Full /examkit becomes advertised session two, chunked by design (one conversation per materials batch, ledger as accumulator, explicit "stop here, resume after your window resets" seams), opening with an honest time-and-quota estimate. Pre-flight materials checklist lives on the onboarding page. Measure per-command usage weight on a realistic course project and publish cost classes from data, not vibes.

### MJ4. RAG-mode silently degrades ledger reads at exactly the usage pattern /ingest encourages — adopt the lean-project rule
**Lens:** platform-feasibility

**Attack.** Projects auto-switch to retrieval mode as knowledge grows (no opt-out; field evidence shows activation by file count with partial-fragment retrieval and silent threshold changes). Ledger + syllabus + ~10 lecture PDFs plausibly crosses it, after which /quiz may read a fragment of the ledger and /examkit hallucinates coverage — no error signal, to users who never verify (F2).

**Fix.** Hard design rule in §4: **Project knowledge stays lean** — permanently only the ledger, semester map, and topic map; raw materials are ingested in-chat and their distillates written to the ledger, raw files not retained in knowledge; ledger capped at a stated token budget. M1 gate test: deliberately push a test project into RAG mode and verify degradation is *announced*, not silent.

### MJ5. The instruction pack is a scarce probabilistic resource being treated as an enforcement layer
**Lens:** platform-feasibility

**Attack.** §3 loads ~10 standing behaviors into project instructions with a practical ~8K-character budget, no deterministic enforcement (claude.ai has no hooks), and known decay of standing side-tasks deep into long chats — quiz sessions are long chats. The tiers therefore differ not just in features but in whether the loop's rules are *enforced at all*, which §3 never states.

**Fix.** Budget the pack (character count per behavior), rank by load-bearing order (quiz-first + artifact emission + grounding first), move per-command depth into on-demand expansion prompts or custom skills. Add a numeric M1 adherence test: scripted 15-turn session; measure emission, citation-labeling, and mirroring rates; pass threshold (≥80%) published in the runbook so regressions are detectable by a fresh session (ADR-0011).

### MJ6. The §3 capability matrix is stale in both directions — re-run it against July 2026 before M1
**Lens:** platform-feasibility (two findings merged)

**Attack.** (1) Stage-3 routines misdescribe the platform: Claude Code hooks have **no time-based triggers**; desktop scheduled tasks skip (not queue) when the laptop sleeps — an exam countdown that silently skips exam week is the worst possible trust failure. (2) The matrix predates custom skills on all claude.ai plans (a better command surface than resident instructions) and Cowork GA on all paid plans — the only zero-code surface where the ledger can be auto-maintained as a real local file, which would dissolve C1 for every friend willing to install the desktop app and collapse two codebases into one.

**Fix.** Blocking pre-M1 action: re-verify every matrix row. Rewrite routines honestly around **SessionStart hooks** ("whenever you open Claude Code in an exam window, the countdown surfaces first" — deterministic, no scheduler) plus the .ics export (C3) as the reliable countdown channel; never build exam-critical reminders on fire-may-skip substrates. Prototype the ledger write-loop in **Cowork** for one course and evaluate a three-tier structure (claude.ai Project → Cowork+plugin laptop default → Claude Code power tier) before committing M1 to Projects-only.

### MJ7. Five commands with no surface: recall-only, English-only discoverability in an empty chat box
**Lens:** novice-ux

**Attack.** No slash-menu or autocomplete exists on claude.ai; the novice must *recall* aliases, but the cohort's documented input is vague one-liners — often in Romanian, which the English-only aliases don't match despite ADR-0010's mirroring mandate. No intent router, no help affordance, no fallback is designed; ADR-0003's "meaningful impact on every message" decays into "impact on messages matching five English strings."

**Fix.** In the instruction pack, as testable requirements: an intent-routing table (fuzzy English AND Romanian phrasings → commands) with confirm-and-teach ("Building your exam kit — next time just say *make my exam kit*"); a standing "what can you do" alias and a one-line menu at each new conversation; self-advertising artifacts (deck footers name the next command). M1 test: a friend accomplishes all four commands using only natural phrasings, in Romanian, zero coaching.

### MJ8. Multi-course topology is undesigned: one Project or five, and what happens when materials collide
**Lens:** novice-ux

**Attack.** "One file per course" but no answer to one-Project-vs-many. Per-course Projects multiply the fragile setup by 4–6; one shared Project needs course-routing and disambiguation logic that appears nowhere — yet wrong/misplaced inputs are a *defining* cohort failure (F3), so mis-filed PDFs silently corrupt the wrong ledger.

**Fix.** Decide now: recommend **one Project ("Your Studies")** with per-course ledger files (amortizes setup once). Instruction pack additions: course detection on every upload with confirmation; explicit course context at session/switch points; input sanity checks in /ingest and /examkit (unreadable scan, duplicate, syllabus mismatch → say so). M1 test: a friend with two real courses, one Project, ledgers stay uncrossed.

### MJ9. /examkit's "what matters" triage is a confident metacognitive takeover fed by unvalidated, unchecked inputs
**Lenses:** learning-science, cohort-fit (converged)

**Attack.** The cohort cannot triage (OQ-1) and will trust the map completely (F2) — but the ranking has no grounding spec (past exams optional, syllabi may lack weighting), and /examkit has no input-sufficiency stage: fed six weeks of slides and no syllabus in December (the gather checklist being a one-time onboarding artifact), it confidently triages an incomplete corpus — F3 wearing a structured costume, worse because structure launders incompleteness. On closed-book exams, confident misprioritization is the highest-damage failure available, and the M1 gate measures completion, not exam-fit.

**Fix.** (a) Input sufficiency as a pipeline stage: cross-check received materials against the syllabus/semester map, open with a coverage report ("syllabus lists 12 topics; uploads cover 7 — missing X, Y, Z; proceed or add files?"), re-emitting the gather checklist at that moment. (b) The topic map **shows its evidence per topic** (frequency, syllabus emphasis, past-exam appearance) with confidence labels and an honest banner when unweighted ("ranked by coverage in your materials only — your professor may differ"). (c) Default to coverage-complete decks with priority *ordering*, so wrong ranking costs efficiency, not coverage. (d) M1 gate: kits checked against ground truth (past exam or post-exam retro: "did the exam surprise you where the kit deprioritized?").

### MJ10. Half the cohort's assessment mix (essays) is unserved at M1, and the gate can't notice
**Lens:** cohort-fit

**Attack.** OQ-4/5: essays + closed-book exams. ADR-0015 legitimately defers /feedback — but critique #6's disposition routes essay-level mastery to a component that won't exist at M1, while the weekly-usage metric is judged during exactly that window. Two flashcard-friendly STEM friends can pass the gate and ship a design unfit for half the cohort.

**Fix (within the five-command ceiling).** (1) Put rubric-based draft-feedback *behavior* into M1 Project instructions as an unnamed default (ADR-0015 defers the command, not the instruction-layer behavior; ADR-0003 demands every-message impact anyway); (2) /quiz emits essay-appropriate retrieval formats (argument reconstruction, "outline the answer to this past-exam question") for essay-assessed courses; (3) require the M1 gate's two friends to span the assessment mix (≥1 essay-heavy/humanities).

### MJ11. Phone-first cohort, laptop-shaped product — and the viral artifact is illegible on the viral medium
**Lenses:** cohort-fit, novice-ux, behavior-adoption

**Attack.** Every concrete M1 flow (multi-file intake, ledger round-trip, template setup, markdown decks) is desktop-shaped; the one context where spaced retrieval fits the cohort's life (phone, bus, 10 minutes pre-seminar) gets zero design sentences; and the critique-#11 sharing mechanism ships as raw `.md` — pipes-and-hashes text in WhatsApp. No M1 gate step touches a phone. Separately, the existing reflex is "open a new chat," which lands *outside* the Project — every habitual slip means no instructions, no artifacts, no tally, experienced as inconsistent magic.

**Fix.** Declare device posture per flow in §3: setup/intake are laptop moments (say so); /quiz and shared artifacts must be phone-native — pure conversational turns with zero file access, short batches (5 items, one at a time), no ledger-write requests on mobile (defer: "I'll fold this into your next laptop session"), and a chat-paste artifact format emitted alongside canonical `.md`. Onboarding installs the entry habit explicitly: pin/bookmark the Project, locate it in the mobile app, and close with the if-then rule "anything about uni → start in the Project." M1 gate: one friend completes a quiz session and shares one artifact entirely from a phone; observe what fraction of the two friends' university chats over one week actually start in the Project.

### MJ12. The habit loop has no reward and no relief valve: weak-first failure density, no completion moment, and an unbounded review-debt spiral
**Lens:** behavior-adoption (three findings merged)

**Attack.** As experienced: /quiz deliberately front-loads the items the student will fail (success rate far below the ~85% optimum), calibration periodically announces they're worse than they think, no session-end payoff exists anywhere in §4 — and every output auto-emits items with no cap, budget, retirement, or amnesty, reproducing the Anki abandonment spiral and handing a triage-blind cohort (OQ-1) an untriaged card mountain. The dropout literature is knowingly parked on the unread list while M1 ships the aversive behavior. There is also no session container at all — nothing bounds a study block for a cohort whose #1 stated failure is distraction — and no <48h compressed-runway mode for the night-before panic that is the highest-leverage word-of-mouth moment.

**Fix.** Specify the adoption architecture as an M1 deliverable: (1) interleave weak with near-mastered items to hold in-session success near 80%; (2) every quiz ends with a concrete progress delta ("2 topics shaky → solid; readiness 61% → 66%") as a screenshot-able artifact — the reward doubles as the ADR-0012 sharing mechanism; (3) calibration framed as a skill trending upward, never raw overconfidence exposure; (4) deck hygiene in R-11: per-ingest emission caps ranked by examkit's own triage, fixed session budget (~10 min/~12 items, never a raw due-count), auto-retirement of mastered items, one-command backlog amnesty ("reset my reviews to what matters for the next exam"); (5) "quiz me" opens a declared bounded block with a hard stop; (6) /examkit grows a <48h branch: skip the countdown, emit a triaged cram sequence. Pull the SRS-dropout literature review forward to pre-M1.

### MJ13. Citation drift: the blueprint contradicts its own evidence dispositions in its two most load-bearing sentences
**Lenses:** claim-verification, learning-science (converged on Bastani)

**Attack.** (a) §1's "#1 and #2 uses in **every** survey" is falsified by the project's own findings.json (holds only for the UK assessed-work ranking; DEC 2024 and Anthropic 2025 rank differently) — the memo's careful qualifier was silently dropped. (b) §2 rule 4 cites Bastani as "verified" with the universalized "cannot feel" wording, contradicting rule 2's own "verified-adjacent," ADR-0009's demotion, and the verifier's explicit correction. (c) Rule 2's "implements the only design pattern shown to eliminate AI learning harm" claims equivalence to a guardrail Bastani never tested with a bypass — the bypass *is* the deviation, supported only by moderate-strength deferred-assistance evidence the blueprint doesn't cite. A hostile examiner armed with the project's own evidence base sinks the thesis's first sentence; ADR-0001's defense-grade standard makes this self-inflicted.

**Fix.** Three wording changes, no design change: restore the memo's qualifier in §1/§4A ("top two assessed-work uses in the UK series; #1 comprehension use in the German and Chegg surveys"); label both Bastani uses verified-adjacent and reword rule 4 to the verified form ("harmed students did not perceive worse performance in the one RCT that measured it — calibration checks make the loss visible and test transfer, bet 3"); reword rule 2 to "adapts the guardrail principle… our bypassable variant is directly supported only by moderate-strength deferred-assistance evidence (arXiv 2026) and is itself under test via the bypass metric (R-12)," adding that citation.

### MJ14. Privacy honesty and compliance-gate content: "local-first" is false on the launch tier, shareable artifacts carry performance dossiers, the AI Act half of critique #7 vanished, and the M4 "GDPR review" cannot fail
**Lens:** privacy-gdpr (four findings merged; lens verdict sound-with-changes — these are honesty-of-record and design-taxonomy fixes, not legality problems)

**Attack.** (a) R-09's mitigation "local-first, user-owned files" is contradicted by §3: novice-tier ledgers — a *new*, concentrated performance dossier that wouldn't otherwise exist — live in Anthropic's cloud under consumer training terms (default-on for Pro), unmentioned anywhere. (b) "Any artifact can be shared into a group chat" conflates share-safe decks with the ledger's error-log/mastery/counter payload — the design actively invites accidental disclosure of "what I'm bad at" into the group taking the same exam. (c) Critique #7 named GDPR **and** the EU AI Act; the AI Act half was dropped without a disposition (an ADR-0001 violation) — exposure is narrow (Annex III 3(b) hinges on intended purpose) and the cheap defense is an intended-purpose statement the blueprint doesn't plan; equally, any conformity-assessment/DPO gold-plating for a free student prompt-pack would be paranoia. (d) The M4 gate "GDPR review (R-09)" has no checklist; under ADR-0011 it will be a fresh Claude session reassuring itself — a gate that cannot fail, the exact failure mode ADR-0013 guards against elsewhere. (M4 *timing* is correct and defended: M1–M3 users are friends processing their own data.)

**Fix.** (a) Replace the claim with an honest two-tier data-residency statement; add one onboarding sentence (ADR-0004 register) pointing at the training toggle and noting the ledger stores performance history; "training-toggle disclosure present" joins the M1 checklist. (b) Two-class artifact taxonomy — SHAREABLE (stripped decks, topic/semester maps) vs PERSONAL (ledger, error log, calibration, counter); export path strips personal annotations by default; ledger carries a first-line "Personal — share deliberately" header; counter moves out of the ledger's shareable body. Near-zero cost (template text). (c) M4 additions: a one-paragraph intended-purpose statement ("personal self-study tool; not for institutional evaluation, admission, or proctoring"), a marketing-language rule (never "grading"/"assessing students"), an explicit AI Act disposition on the record, and a documented why-no-conformity-assessment note. (d) Write the one-page R-09 checklist **now** (per-tier data inventory, sharing-surface audit, README privacy note, toggle disclosure, intended-purpose statement, counter labeling) — the checklist *is* the runbook, executable mechanically by a fresh session.

### MJ15. The M1 template is unversioned, undiagnosable, unupdatable prose — and platform/model drift has a named trigger but no detector
**Lens:** maintainability (three findings merged)

**Attack.** ADR-0011's runbook model fits plugin scripts, not a prose template: failures are behavioral and probabilistic, the repair session can't see the deployed (possibly truncated) instance, the installed base forks from the repo the day ten friends copy it, and the failure report is "something feels off." Meanwhile ADR-0003's revisit trigger (platform changes) has no observation mechanism — the canary is a confused friend weeks later, and "ask a fresh Claude" means asking the changed model to diagnose its own drift with no recorded baseline. §3's "identical artifact formats across tiers" is asserted with no canonical spec, so plugin metadata needs and language mirroring guarantee divergence, and no milestone ever round-trips a novice ledger through the plugin.

**Fix.** Treat the template as versioned, self-describing software: version string in the instructions **and** stamped into every emitted artifact header; a `/checkup` self-diagnostic ("is my toolkit working?" — fixed checklist, paste-able report) giving repair sessions structured input; a documented 2-minute update procedure announced via the group chat the cohort already lives in; golden transcripts committed as behavioral fixtures. Add a monthly/after-platform-change **golden-session smoke test** (5–8 prompts with expected behaviors), logged in the repo, piggybacked on the existing quarterly incumbent scan; record the model/date each runbook was last verified against. Promote the artifact format to a first-class component: one canonical spec doc (ledger + deck schemas; structural keys/headings always English, content mirrors the student — resolving the ADR-0010 collision) referenced by both tiers, with a cross-tier round-trip test at every gate from M2.

### MJ16. Cross-cutting: rewrite the M1 gate — as written it can pass while F1 survives, F3 survives, the metric is dead, and the runbooks are decorative
**Lenses:** convergent demand from 7 of 8 lenses

**Attack.** "2 friends complete a real exam kit unaided; item-quality pass working" is a one-shot, single-session, single-device, completion-not-quality test. It never touches persistence (the actual thesis), setup-from-cold, retrieval fidelity, exam-fit, tally reliability, phones, Romanian, or repairability — the novice tier gets the *least* verification despite having the most invisible failure modes.

**Fix — consolidated M1 gate (each item traced above):** friend completes setup from the link alone, no help, <10 min (C2) · setup self-check passes in message 1 (C2) · second session on a different day, Claude knows the course without re-uploads (C1) · ledger current after one week unsupervised (C1) · one unprompted return within 7 days (C3) · retrieval-fidelity criteria met by sampled items (C4) · zero unlabeled ungrounded claims in a sampled kit (C6) · usage-log lines reliably written across N sessions (MJ1) · all four commands reached via natural phrasings incl. Romanian (MJ7) · two-course/one-Project ledgers uncrossed (MJ8) · kit checked against exam ground truth (MJ9) · friends span the assessment mix (MJ10) · one phone-only quiz + share (MJ11) · one image-heavy 100+ page Romanian PDF in the test set (platform limits) · instruction-adherence ≥80% over a scripted 15-turn session (MJ5) · RAG-mode degradation announced, not silent (MJ4) · break-and-repair drill: corrupt one ledger, mangle one instruction block, fresh session + runbooks must recover (MJ15) · training-toggle disclosure present (MJ14).

---

## 5. MINOR — backlog (fix cheaply, before M4 at latest)

- **MN1. Rename "anonymous counters" (privacy).** Identified screenshots from named friends are not anonymous. Rename in ADR-0012/blueprint to "local, voluntary self-reported counters"; publish only aggregates in portfolio docs. Legal posture is fine; the label is the bug a hostile reader will quote.
- **MN2. Synthetic repair fixtures (privacy × maintainability).** The "ask Claude to fix it" flow will exfiltrate real ledgers into debug sessions. One line in the runbook template: reproduce with the shipped synthetic fixture first; strip the error log if a real ledger is ever needed.
- **MN3. Self-explanation uptake (learning-science).** An opt-in "explain it back" offer to a summarize-and-stop cohort will see ~zero uptake, unmeasured. Make it the default next turn after /ingest (decline, not opt in), tally offered-vs-attempted next to bypass rate, and give the evaluator a name-one-gap-before-praise rubric.
- **MN4. Latimier caveat (claim-verification).** Keep uniform spacing for v1, but carry the verifier's caveat: expanding schedules gain value at many exposures — revisit at M3.
- **MN5. Fleckenstein hygiene (claim-verification).** Tag unverified-strong; "0.18 for 1–2 sessions," not "one-off"; frame /feedback's success as cross-assignment improvement ("your next essay"); add the L2 subgroup (g=0.72) — free cohort-specific support for Romanian students writing English.
- **MN6. Systematic status-tag restoration (claim-verification).** Adopt the memo's tag convention throughout the blueprint; rename "the verified evidence base" to "the evidence base (15 verified load-bearing claims)"; hedge §1's GAP sentence to match §6 bet 4; restore "~90% (owner estimate, OQ-7)" and confirm each friend's actual plan during the owed friend-story collection (one extra question).

---

## 6. Discarded findings and sub-arguments (relitigation of locked decisions)

Per the review charter, findings that merely relitigate locked ADR decisions without demonstrating internal contradiction were discarded. The committee discarded **no finding in its entirety** — every submitted finding either exposed an internal contradiction, a platform fact, or an undesigned mechanism. Three **sub-arguments** were discarded:

1. **"Students will bypass quiz-first" as a standalone objection** (threads within the learning-science and behavior-adoption quiz-first findings). Adherence risk was litigated in critique #8 and accepted as R-12 with the bypass metric as its watchdog (ADR-0009). The committee retained only the *new* material: the unprinted bypass word (an internal contradiction with the ADR-0004 amendment), the /explain scoping error, the missing falsification threshold, and metric contamination — all preserved in MJ2/MJ1.
2. **Any implied strengthening of measurement beyond ADR-0012** (local, voluntary, no telemetry — locked). All retained fixes in MJ1 operate strictly inside those constraints (event logs the user transports; owner-initiated voluntary asks). Nothing proposing remote signal survived.
3. **Any move of the GDPR/AI Act review earlier than M4.** The privacy lens itself defended M4 timing (household exemption during the friends phase); demanding an M1 compliance workup would be the gold-plating error the lens warned against. Retained: writing the checklist content *now* so the M4 gate is falsifiable (MJ14) — that is gate design, not a schedule change.

Also noted for the record: no lens attacked ADR-0004 (productivity-first), ADR-0014 (name), ADR-0015 (five commands), or ADR-0013 (no deadline) head-on, and the committee found the blueprint's compliance with those decisions genuine. The flaws are execution-layer, not stance-layer.

---

## 7. What the panel could not assess (honest limits)

- **No empirical contact with the cohort.** All eight lenses reasoned from OQ answers, the cohort story, and the discovery record; the 2–3 owed friend stories (blueprint §7.2) had not arrived. Every prediction about what friends "will do" is inference from documented traits, not observation. The M1 gate additions are designed precisely to convert these inferences into data.
- **Platform facts are time-stamped, not future-proof.** Feasibility claims (no Project-knowledge write path, no Pro template sharing, RAG thresholds, skills availability, Cowork capabilities, hook event lists, quota mechanics) were verified against documentation and field reports as of July 2026. Anthropic has changed several of these surfaces silently before; the ten-minute reality tests (C2, MJ6) and the golden-session smoke ritual (MJ15) are the standing defense, and each should be re-run at build time rather than trusted from this record.
- **No lens could test actual LLM behavior.** Instruction-adherence rates, item-format defaults, grading leniency, ledger-rewrite fidelity, and Romanian output quality were assessed from known model tendencies, not from runs of the actual instruction pack — which does not yet exist. The numeric adherence and fidelity gates proposed above are the substitute; their thresholds are provisional until first measurements exist.
- **Effect-size transfer is untestable pre-launch.** Whether LLM-generated items carry human-item effect sizes (bet 2), whether guardrail benefits transfer to this cohort (bet 3), and whether the conversion hypothesis holds (bet 1) remain open bets by the blueprint's own honest accounting; the panel could only verify that the *instruments* for those bets were broken as designed (C4, C5, MJ1) and propose repairs — it cannot pre-judge the bets themselves.
- **The panel saw the blueprint and decision log, not the repo.** Runbook quality, evidence-base internals beyond what findings quoted, and the discovery documents were assessed through the lenses' excerpts; any divergence between those excerpts and the underlying files should be checked during blueprint revision.

**Disposition requested of the builder:** revise the blueprint against C1–C7 and MJ6 (the blocking pre-M1 items), adopt the consolidated M1 gate (MJ16), record dispositions for every finding in the evidence base per ADR-0001, and re-submit the revised §2–§5 for a focused delta review before the M1 build begins.