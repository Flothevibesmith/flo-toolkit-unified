# Evidence Memo — v1 Prioritization of Jobs-to-be-Done
**Project:** Two-tier Claude academic assistant (claude.ai pack + Claude Code plugin) · **Date:** 2026-07-02
**Question:** How should study & memory, reading & research, writing, and planning & routines be prioritized for v1?
**Evidence hygiene:** Findings marked *verified* passed adversarial source-checking; *unverified-strong* findings are treated as plausible; the retracted Wang & Fan meta-analysis (g=0.867) is excluded entirely per its retraction note (Nature HSSC, 2025).

---

## 1. Ranking and scoring

### Criteria and weights

| Criterion | Weight | Rationale |
|---|---|---|
| **Usage prevalence** — what students actually do with AI | **0.40** | Productivity-first product in a saturated market (95% of UK undergrads already use AI — HEPI 2026, verified); v1 must land where demand already exists or it won't be adopted at all. |
| **Learning/outcome impact** — what the science says works | **0.30** | Responsibility sits with the student, but the product's durable value (and its defense against "AI made me worse" evidence) depends on delivering outcomes, not just outputs. |
| **Differentiation opportunity** — what competitors leave open | **0.30** | Near-saturation adoption means "the market contest [is] about workflow depth rather than access" (verified synthesis of HEPI 2026 + Pew 2026); a student-built tool cannot win on model access or polish. |

### Scores (1–5, evidence-anchored)

| Job | Usage (0.40) | Impact (0.30) | Differentiation (0.30) | **Weighted** | **Rank** |
|---|---|---|---|---|---|
| **Study & memory systems** | 4 | 5 | 5 | **4.6** | **1** |
| **Reading & research** | 5 | 3 | 2 | **3.5** | **2** (tie, broken below) |
| **Planning & routines** | 2 | 4 | 5 | **3.5** | **3** (tie, broken below) |
| **Writing** | 3 | 3 | 1 | **2.4** | **4** |

**Score justifications:**

- **Study & memory — Usage 4:** "Explaining concepts" is the #1 assessment use everywhere it's measured: 58% → 61% of UK undergrads (HEPI 2025, 2026 — both *verified*), 56.5% in the German national survey (von Garrel & Mayer 2023, N=6,311), 80.3% of AI-using Middlebury students (Contractor & Reyes 2025), and 56% of global GenAI users primarily use it "to better understand subjects" (Chegg 2025, N=11,706). Not a 5 because *explicit* self-quizzing/retrieval use is rare — it's seldom even a survey category, and in observed Claude usage "Remembering"-level work is 1.8% of conversations (Anthropic 2025, *verified*).
- **Study & memory — Impact 5:** The strongest causal evidence in the entire base. Retrieval practice beats restudy at g≈0.50 (Rowland 2014; Adesope 2017), with the classic crossover *verified* against the primary paper (Roediger & Karpicke 2006: 61% vs 40% at one week). Spacing: 259/271 comparisons favor spaced practice, 62.2% vs 32.8% at 8–30-day retention (Cepeda et al. 2006, *verified*). Spaced retrieval combined: g=0.74 (Latimier et al. 2021, *verified*). Distributed practice and practice testing top both the Dunlosky et al. (2013) utility ranking and the Donoghue & Hattie (2021) effect-size ranking (d=0.85, d=0.74). Anki users score 6.2–12.9% higher on med-school exams (UCF cohort data, 2025). And a scaffolded AI tutor doubled learning gains vs expert active-learning teaching in an authentic RCT (Kestin et al. 2025, N=194).
- **Study & memory — Differentiation 5:** All three identified market gaps converge here: no incumbent keeps longitudinal mastery state across sessions (GAP 1); no incumbent runs unattended ingest→deck→quiz pipelines (GAP 2 — ChatGPT Tasks is beta, capped at 10–15, no file access); every incumbent's learning mode is a bypassable toggle (GAP 3 — OpenAI concedes Study Mode has "no guardrails" against switching it off). Anki has the evidence but a severe UX burden (82.1% of med students find it overwhelming) and its AI addons require bring-your-own API keys. Quizlet retired Q-Chat in June 2025. *(Caveat: gap findings are moderate-strength synthesis, unverified.)*
- **Reading & research — Usage 5:** Summarising articles is the #2 UK assessment use (48% → 49%, HEPI 2025/2026, *verified*); information search is the #1 global use (69%, Digital Education Council 2024, N=3,839); ~40% of US teens summarize articles/books/videos with chatbots (Pew 2026). The single highest-prevalence cluster in the data.
- **Reading & research — Impact 3:** Mixed. Self-explanation prompts during reading yield g=0.55 (Bisra et al. 2018), and *constructing* concept maps beats receiving them (g=0.72 vs 0.43, Schroeder et al. 2018). But summarization itself is a *low-utility* technique (Dunlosky et al. 2013), and the failure-mode evidence bites hardest here: ChatGPT-mediated research lowered reasoning quality vs web search despite feeling easier (Stadler et al. 2024), and chatbot explanations inflate the illusion of explanatory depth (2024/2025, weak-rated).
- **Reading & research — Differentiation 2:** NotebookLM dominates with a generous free tier and ~17M+ MAU (moderate-strength, unverified). Its documented weaknesses (no cross-notebook memory, shallow synthesis) are real but are better exploited *through* the study-memory persistence layer than by competing head-on.
- **Planning & routines — Usage 2:** Real but secondary: "structure my thoughts" 39% (HEPI 2026), workload organization a top-3 self-reported benefit globally (41%, Chegg 2025). Only 17% of US students turn to GenAI first when stuck — people (84%) dominate help-seeking (Tyton 2025) — and no survey shows planning as a top-3 use.
- **Planning & routines — Impact 4:** Implementation intentions: d=0.65 for goal attainment (Gollwitzer & Sheeran 2006, k=94). Planning prompts raised MOOC completion 29% (Yeomans & Reich 2017). Critically, Blasiman et al. (2017) locate the core student failure in the intention–behavior gap — students *know* what works and plan to do it, then cram — which is precisely what routines address. Docked one point because time management → achievement is correlational only (r=.262, Aeon et al. 2021).
- **Planning & routines — Differentiation 5:** The emptiest competitive space: ChatGPT Tasks is the only scheduler and is capped/beta/file-blind; Notion AI moved to $20/user/mo Business tier, out of student range; Khanmigo is K-12-anchored. Claude Code's native cron/hooks/subagents are a structural advantage no incumbent matches (GAP 2, moderate-strength).
- **Writing — Usage 3:** Mid-tier and *declining as a share*: grammar checking 42–58% (DEC 2024; Chegg 2025), drafting-with-editing 25%, direct AI-text inclusion 12% (HEPI 2026, *verified*); text generation fell 64% → 56% for general use (HEPI 2026, *verified*).
- **Writing — Impact 3:** Feedback works — automated writing feedback g=0.55, rising to 0.66 with sustained use (Fleckenstein et al. 2023); self-assessment against criteria ES=0.62 (Graham et al. 2015, K-8 caveat). But *generation* is where harm concentrates: essay scores up with no knowledge gain plus "metacognitive laziness" (Fan et al. 2024/2025, N=117 RCT), and the MIT "cognitive debt" EEG findings (Kosmyna et al. 2025, preprint, small N).
- **Writing — Differentiation 1:** Grammarly is entrenched (25–37% usage), every chatbot drafts, and the misconduct exposure is worst here: 53% of students fear cheating accusations (HEPI 2025, *verified*), proven AI-misconduct cases tripled to 5.1/1,000 UK students (Guardian FOI 2025).

### Tie-break: Reading & research (#2) over Planning & routines (#3)

Both score 3.5; the ranking is weight-sensitive (a usage-heavier weighting favors reading & research; an impact/differentiation-heavier one favors planning). Reading & research takes #2 on two grounds: (a) it is the **acquisition wedge** — summarising is the #2 thing students already do, so it's the on-ramp that feeds documents into the study-memory loop; (b) the locked roadmap already stages automation (pipelines → memory → scheduled routines), meaning planning & routines *naturally matures* into full strength at stage 3, so v1 needs only a thin planning layer (plan generation with implementation-intention structure) rather than the full job.

**Bottom line:** v1 = study & memory as the core loop, reading & research as the intake funnel into it, planning as a thin scaffold that grows with the automation roadmap, and writing scoped to *feedback-only* (no differentiated drafting product).

---

## 2. The usage-vs-effectiveness tension — and what it means for a productivity-first product

**The tension, stated plainly:** what students most *do* with AI (get explanations, get summaries, get answers) is largely what the learning science rates *low-utility or harmful*, and what the science rates most effective (spaced retrieval practice) is what students almost *never* do.

- Students' revealed preference is passive intake: summarization is a top-2 use (HEPI 2026, *verified*) yet a low-utility technique (Dunlosky 2013); rereading is the default strategy for 83.6% of students while only 11% self-test (Karpicke et al. 2009); ~47% of student Claude conversations are Direct answer-seeking and Remembering-level use is 1.8% (Anthropic 2025, *verified*).
- The harm is causal, not hypothetical: unguardrailed GPT access made Turkish students 17% *worse* on unassisted exams than never having AI, and guardrails eliminated the harm (Bastani et al., PNAS 2025, *verified*). The mechanism is answer-copying, not misinformation (67% of first interactions asked for the answer — *verified*).
- Students cannot self-correct because they cannot *feel* the loss: harmed students didn't perceive worse performance, and guardrailed students believed they improved when they hadn't (Bastani et al., *verified*); ChatGPT lowers felt effort while degrading reasoning (Stadler 2024); self-perceived LLM benefit exceeds actual benefit (Lehmann et al. 2024/2025).

**Implication for a productivity-first stance.** Productivity-first is defensible — students' own stated motives are time-saving (51%) and quality (50%) (HEPI 2025, *verified*), and refusing to produce work just sends users back to ChatGPT (50% would keep using AI even if banned — Tyton 2024). But the evidence forbids two naive readings of it:

1. **Don't rely on user virtue.** Voluntary learning modes fail by design — they're toggles students switch off (OpenAI's own admission re: Study Mode), and the perception-gap evidence shows students won't notice they need them. The correct posture is **productive outputs that leave learning artifacts behind by default**: every summary the tool produces also emits a question deck; every explanation updates a mastery ledger; the *default path* routes through one retrieval attempt before the full answer (deferred assistance improved both work quality and engagement — arXiv 2026, moderate). Small architectural frictions demonstrably shift behavior (disabling copy-paste reduced solution-seeking — Lehmann et al.).
2. **Don't moralize; instrument.** Responsibility sits with the student, so the product's job is to make the learning cost/benefit *visible* (assisted vs. unassisted performance, review streaks, calibration checks), not to block output. The Bastani result shows guardrail *design* — not restriction — eliminates harm while preserving the productivity win.

This resolves the tension in favor of the ranking above: study & memory is where "what students want" (explanations — #1 use) and "what works" (retrieval + spacing — top effect sizes) can be *joined in one workflow*, which no toggle-based incumbent does.

---

## 3. Discipline differences that matter for a mixed cohort

- **Claude's current student base is radically CS/STEM-skewed:** CS is 38.6% of student conversations vs 5.4% of US bachelor's degrees; business (8.9% vs 18.6%), humanities (6.4% vs 12.5%), and health (5.5% vs 13.1%) are heavily underrepresented (Anthropic 2025, *verified*). The Claude Code power tier will over-serve CS by default; the zero-install claude.ai pack is what reaches everyone else — it cannot be an afterthought.
- **Interaction styles differ:** CS/engineering/natural-science students lean Collaborative; humanities, business, and health split more evenly between Collaborative and Direct answer-seeking (Anthropic 2025, *verified*) — so anti-offloading defaults matter *more* for non-STEM users.
- **The "humanities lag" is not universal:** German national data shows arts/humanities adoption (73.4%) nearly matching engineering (75.3%), but with different purposes — literature research, translation, text analysis (von Garrel & Mayer 2023). Yet at Middlebury, literature (48.6%) and languages (57.4%) trail natural sciences (91.1%) by 30–40 points (Contractor & Reyes 2025). Read this as: humanities demand exists but is *task-shaped differently* (reading & research and writing-feedback jobs), and UK data shows Arts & Humanities students feel most under-supported in AI skills (HEPI 2026).
- **Health/medical students** skew to information lookup and translation (84.4% / 59.0%, Chinese medical cohort 2025) and are the heaviest spaced-repetition users anywhere (94% Anki use among UCF med students) — the single best-fit segment for the study-memory core.
- **Policy context dominates behavior:** AI use drops from 52.4% (unrestricted) to 13.4% (prohibited) across courses (Contractor & Reyes 2025) — a mixed cohort needs *per-course policy awareness*, not one global stance.

---

## 4. Design implications for the two-tier product

**Core loop (both tiers): intake → artifact → scheduled retrieval.**
1. **Every comprehension output doubles as a study input.** Summaries/explanations auto-generate retrieval items; mastery state persists in human-readable memory files (per-course ledgers, error logs) — this operationalizes GAP 1 and the g=0.74 spaced-retrieval evidence (Latimier 2021, *verified*).
2. **Uniform spacing is fine; don't over-engineer scheduling.** Expanding intervals showed no average advantage over uniform (g=0.034 ns, Latimier 2021, *verified*) — a simple scheduler captures most of the value, ideal for v1.
3. **Quiz-before-answer as the default path, answer always reachable.** Matches productivity-first while implementing the only design pattern shown to eliminate AI learning harm (Bastani, *verified*) and the deferred-assistance result. Never a hard block — that just loses users to ChatGPT.
4. **Make the student construct; the AI scaffolds.** Prefer "draft your explanation, I'll critique" over finished artifacts where learning is the goal: self-generated explanations beat received ones (Bisra 2018), constructed concept maps beat pre-made (g=0.72 vs 0.43, Schroeder 2018).
5. **Show calibration.** Periodic no-help checks and predicted-vs-actual score displays, because students demonstrably cannot perceive AI-induced loss (Bastani, *verified*; Lehmann).
6. **Writing = feedback engine, not drafting engine.** Criteria-based feedback and self-assessment rubrics (g≈0.55–0.62), designed for *sustained* use across drafts (effects: g=0.66 for >2 sessions vs 0.18 for one-off — Fleckenstein 2023). This also sidesteps the misconduct exposure (53% fear accusations — HEPI 2025, *verified*).
7. **Planning as implementation intentions, not timetables.** If-then plans (d=0.65, Gollwitzer & Sheeran 2006) tied to material ("after Tuesday's lecture, review deck X"); avoid rigid time-slot plans, which *predicted failure* in the MOOC field experiment (Yeomans & Reich 2017). Scheduled routines (roadmap stage 3) directly attack the intention–behavior gap (Blasiman 2017).
8. **Per-course policy profiles.** A lightweight "what's allowed in this course" setting that shapes outputs and citation trails — usage swings 37.8pp with policy (Contractor & Reyes 2025), and legitimacy/accuracy are the top adoption deterrents (HEPI 2025, *verified*).

**Tier-specific.**
- *Novice tier (claude.ai pack):* pre-built prompts/skills that encode good prompting — novices iterate opportunistically and overgeneralize from single failures (Zamfirescu-Pereira et al., CHI 2023); zero-config matters because 89.9% of students don't even know free premium tools exist (Middlebury 2025). Plan-aware behavior: only 11.3% pay for any AI service, so the free-tier experience must degrade gracefully (shorter decks, batched reviews) rather than paywall the learning loop.
- *Power tier (Claude Code plugin):* pipelines (ingest lecture PDFs → update decks → surface weak items), versioned memory files in the user's repo, cron-based exam-countdown routines — the GAP 2 space with effectively no incumbent. Expect early adopters to be CS-heavy; design memory formats so novice-tier users inherit the same artifacts without the tooling.

**Failure modes the design must defend against (ranked by evidence strength):**
1. **Answer-copying crutch use** — the verified causal harm mechanism (Bastani). Defense: quiz-first defaults, deferred assistance, friction on verbatim extraction.
2. **Perceived-learning illusion** — verified (Bastani); students feel fine while getting worse. Defense: calibration checks, unassisted-performance tracking.
3. **Metacognitive offloading** — better artifacts, no knowledge gain (Fan et al.); cognitive-ease trap in research tasks (Stadler). Defense: student-constructs-first patterns, effort-visible workflows.
4. **Misconduct exposure** — rising proven cases, 94% of AI text undetected in one audit (Guardian FOI 2025; moderate). Defense: policy profiles, provenance/citation logs, feedback-not-ghostwriting writing scope.
5. **Toggle bypass** — every incumbent's failure (GAP 3). Defense: workflow-level architecture, not a mode switch.
6. **Trust-destroying billing/dark patterns** — the category-wide complaint (Quizlet, Mindgrasp 2.0 Trustpilot, StudyFetch; moderate). Defense: transparent plan-aware limits, no trial traps.
7. **Dependency/outage fragility** — NotebookLM students panicking during outages (moderate). Defense: local, portable, human-readable artifacts (decks/ledgers usable without the service).

---

## 5. Confidence and gaps

**High confidence (verified against primary sources):** UK usage prevalence and task rankings (HEPI 2025/2026); the retrieval-practice and spacing effects (Roediger & Karpicke 2006; Cepeda 2006; Latimier 2021); the guardrail/crutch/perception findings (Bastani et al., PNAS 2025); Claude's discipline skew and 47%-Direct pattern (Anthropic 2025); Claude for Education positioning.

**Moderate confidence:** global surveys (DEC 2024, Chegg 2025 — strong-rated but unverified); the competitive-landscape specifics and all three GAP claims (moderate-rated syntheses, partly sourced from vendor pages and review blogs); writing-feedback effect sizes (Graham et al. is K-8); planning-prompt effects (single field experiment).

**Low confidence / use with care:** Gerlich's AI-use↔critical-thinking correlations (cross-sectional, self-report); MIT "cognitive debt" (preprint, N=54, contested); illusion-of-explanatory-depth studies (weak-rated); Turbo AI/Thea user counts (self-reported). One internal inconsistency noted in HEPI 2025 (summarising baseline "a third" vs Figure 2's 24%) — immaterial to the ranking.

**Missing evidence that could change the ranking:**
- **No causal study of an AI-integrated spaced-repetition workflow** — the core v1 bet extrapolates from (a) retrieval/spacing science and (b) AI-tutor RCTs, but nothing tests the combination.
- **No willingness-to-pay or retention data for the target cohort** — only 11.3% of Middlebury students pay for AI; whether the study-memory job converts free users is unknown.
- **Romanian/CEE student data is thin and IT-skewed** — directly relevant if the builder's local cohort is the first user base; the open Figshare dataset (DOI 10.6084/m9.figshare.29488523.v2) is an unexploited secondary-analysis opportunity.
- **No evidence on non-CS students adopting Claude Code-style tooling** — the power tier's addressable share of a mixed cohort is a guess.
- **Planning-feature efficacy inside AI assistants is untested** — implementation-intention evidence predates LLM assistants; the MOOC result may not transfer.
- **Long-run outcomes** — every AI-learning study measures ≤1 semester; nothing on cumulative effects across a degree.

**Recommended v1 allocation:** ~50% study & memory (core loop + persistence), ~25% reading & research (intake pipeline feeding the loop), ~15% planning (implementation-intention scaffold, routine-ready), ~10% writing (feedback skills only). Revisit after first-cohort telemetry, especially quiz-first path completion vs bypass rates — the single metric that tests the whole thesis.