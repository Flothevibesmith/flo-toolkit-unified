# Flo's Toolkit — Improvement Spec: flo-ingest & flo-explain

**Scope:** two capabilities — (A) `flo-ingest` (grounded notes + quiz from course materials) and (B) `flo-explain` (low-context slide explanation). Grounded in the current SKILL.md files, `LEDGER-FORMAT.md v1.1`, the Overmind harness research (`RESEARCH-FINDINGS.md`), and the student-behavior/learning-science evidence base (`docs/evidence/findings.json`, verified verdicts where marked). Tier markers: **[both tiers]** = behavioral rule that fits the 8000-char novice pack AND the plugin; **[power tier]** = file-backed/deterministic mechanism, plugin only.

Design law respected throughout: grounding-by-default is already product law; never becomes policing; local-first, no telemetry; **heavy orchestration doesn't pay on novice — favor behavioral technique over pipeline** (Overmind F1/F4: fan-out is a token-budget decision, single-lead by default for non-parallelizable work; F16: bloated instructions *degrade* adherence, so every novice-tier line must pass "would removing this cause a mistake?").

---

## 1. What's weak now

The current skills are already grounded and close-loop, which is ahead of the market — but they under-specify the exact three things students most want and most distrust. This is the highest-leverage surface: **explaining concepts (61%) and summarising (49%) are the #1 and #2 student uses** (HEPI 2026, verified high), and **hallucination is the #1–2 deterrent to trusting an assistant at all** (51% "fear false results," HEPI 2025, verified high). flo-ingest/flo-explain sit exactly on the product's load-bearing surface.

**F2 (hallucination) — the attribution discipline is asserted, not operationalized.**
- flo-ingest says "every claim carrying a source pointer … silently re-check." flo-explain says "claims … carry a pointer." But neither defines *what a citation must resolve to*, or what to do when a claim can't be grounded but feels true. The direct competitor's failure is instructive and beatable: NotebookLM's inline citations are described as **"guesses," a ~13% hallucination rate in one test**, yet it "mostly regurgitates exact language without interpretive depth" (ACM DIS 2025, findings.json competitive-landscape). So the two failure poles are named for us: **fabricated citations** at one end, **lifeless copy-paste** at the other. Current skills guard neither pole explicitly.
- The re-check is **"silent" and self-only.** Overmind F15 (verified, the strongest academic constraint): **intrinsic self-correction without external feedback does not improve accuracy and often degrades it** (GPT-4 95.5%→89.0% after two reflection rounds). A "silently re-check your own dates/defs/formulas" step is exactly bare self-reflection against no external check — it is the weakest possible verification and may hurt. It must be re-cast as a *check against the source text*, which is external, not a reflection.

**F3 (summaries are "mid," not exam-focused) — the artifact is a low-utility artifact by default.**
- flo-ingest produces "structured notes at the asked depth" then "up to 8 quiz items." But **summarization ranks LOW-utility and rereading LOWEST** in the canonical technique review (Dunlosky 2013; Donoghue & Hattie 2021 summarization d=0.44, near the floor), while **practice testing and distributed practice rank HIGH** (retrieval d=0.74; Roediger & Karpicke verified high). A skill whose headline output is a summary is optimizing the weakest lever. The notes aren't the value — the retrieval items are — yet notes are primary and quiz is a capped afterthought ("up to 8").
- "Ranked by importance" is undefined. The topic-map schema already carries real triage signal — `(frequency | syllabus emphasis | past-exam)` evidence tags — but flo-ingest never computes or uses it to decide *what to summarize hard vs skip*. Students themselves can't judge what to upload or what matters (findings.json: novices "overgeneralize from one attempt," don't know what's exam-relevant). The skill must supply the triage the student can't.
- **"Mid" is partly an illusion problem.** Chatbot-mediated explanations *inflate* felt understanding while producing *worse* actual explanations (Illusion of Explanatory Depth, findings.json). A summary that reads smoothly is the exact trap. The antidote is already half-built (close-the-loop) but applies only as a *next-turn* nicety, not as a property of the artifact.

**F1 (context loss over long conversations / long materials) — no long-document strategy exists at all.**
- Both skills silently assume the material fits in context. flo-ingest's only nod to size is "state a rough time/quota estimate and offer the lighter version." There is **no map-reduce, no running outline, no page-anchor discipline** for a book/long article/large deck that exceeds the window. This is the literal F1 failure: mid-way through a long doc the model loses the early context and either drops it or fabricates continuity. Overmind's validated long-horizon techniques (F18, verified: compaction + **structured note-taking to files outside the context window** + fresh-context passes) map directly onto this gap but are unused here. On novice tier the file-backed version isn't available, so the behavioral fallback (bounded chunk + carry a compact running outline) must carry it.

**flo-explain specifically — no vocabulary for "I'm inferring."**
- It has a two-way split: grounded claim (pointer) vs "outside your materials." A **slide** is the adversarial case: terse bullets, missing the lecture that explained them. The honest reconstruction of a slide's meaning is *neither* a sourced quote *nor* outside-materials trivia — it's **inference from the slide.** With only two buckets, the model must file inference as if it were on-slide fact (fabrication) or refuse (unhelpful). The missing third bucket — **"can't tell from this slide alone"** — is exactly what beats the competitor and what the RCT tutor did right: the Harvard AI-tutor that *outperformed active-learning class* worked because **expert step-by-step solutions were embedded to prevent hallucination** and it was **instructed not to give away what it shouldn't** (Kestin 2025, verified strong). Grounding + honest "I can't tell, here's what I'd need" IS the winning design, not a limitation.

---

## 2. flo-ingest improvements

### (a) Long-material handling — map-reduce / running outline / page-anchor

**[both tiers] R-I1 — Page-anchor discipline (the citation must resolve).**
Every claim's pointer must name the **smallest locator the source exposes**: slide number, PDF page, §heading, or figure/table label — never just the filename. If the material has no stable locators (bare prose), anchor to a **short verbatim quote (3–6 words)** the student can Ctrl-F. A pointer that can't be resolved back to a specific spot is not a citation. *(Directly attacks the NotebookLM "citations are guesses" failure, findings.json; operationalizes F2.)*

**[both tiers] R-I2 — Bounded chunk + running outline for anything that won't fit.**
When the material plausibly exceeds a clean single pass (long book/article/large deck), do NOT attempt one pass. Instead:
1. **Map:** process in reading-order chunks (e.g. chapter / ~15–20 slides / section at a time).
2. Maintain a **compact running outline** carried forward between chunks — one line per covered section with its page-anchor and a one-clause gist (this is the novice-tier stand-in for Overmind's "structured note-taking to files outside the window," F18). The outline, not the full prior text, is what survives into the next chunk.
3. **Reduce:** synthesize final notes *from the outline plus re-opened anchors*, not from memory of chunk 1.
4. State coverage honestly at the end: "Covered pp. 1–120; if you need Ch. 7 in depth, point me at it." Never silently imply full coverage of a doc you only partially read. *(Overmind F6, verified: the dominant long-run failure is **declaring victory prematurely** — coverage must be stated, not assumed.)*

**[power tier] R-I3 — File-backed running outline + partial-progress ledger.**
Persist the running outline to `study/<course>/ingest-<scope>.outline.md` as chunks complete, so a long ingest survives a context reset and resumes (Overmind F18 compaction + note-to-file; F5 initializer/incremental pattern). Each outline line carries `covered: true|false` (F6: `passes:false`-style default — a section is `false` until its notes+anchors are actually written, flips only when the chunk is genuinely processed, never on optimism). This is deterministic and file-backed — do NOT emulate it on novice tier (no filesystem; and the machinery would blow the 8000-char budget for near-zero gain — Overmind F1/F16).

### (b) Exam-focused triage — so the summary isn't "mid"

**[both tiers] R-I4 — Triage before you summarize; depth follows exam-value, not page order.**
Before writing notes, rank topics by the evidence the materials actually expose, reusing the existing topic-map tags: **`(frequency across materials | syllabus/learning-objective emphasis | past-exam signal)`**. Spend depth proportional to rank: high-value topics get worked notes; low-value gets a one-line "mentioned, low emphasis." Say the ranking is *from their materials only* ("your professor may differ" — existing topic-map banner). This turns an undifferentiated summary (low-utility, d=0.44) into a **prioritized exam map**, the thing students can't build themselves. *(Dunlosky/Donoghue&Hattie; the triage signal already exists in LEDGER-FORMAT §4 — this rule makes ingest USE it.)*

**[both tiers] R-I5 — Retrieval is the deliverable; notes are the scaffold.**
Reframe output priority: the **quiz items are the primary artifact**, notes are the map to them. Lift the quiz from "up to 8" to **the natural number the high-value topics demand** (still quality-passed, still capped by the deck format), and ensure every high-triage topic yields at least one recall item. Rationale to bake into the behavior: practice testing is HIGH-utility (d=0.74) and students **default to rereading and almost never self-test** (Karpicke 2009: only 11% practise retrieval) — so the artifact must *hand them* the retrieval they won't generate. *(This is also the anti-"mid" move: a smooth summary triggers the Illusion of Explanatory Depth; a stack of questions they can't yet answer does not.)*

**[both tiers] R-I6 — One exam-focused closing line, concrete.**
Keep close-the-loop, but make the recap name **the weak/high-value topics by name and what's due**, not generic praise-then-gap. (Already the PROGRESS RECAP shape in LEDGER-FORMAT §0 — this just binds ingest's closing line to it.)

### (c) Source-attribution discipline

**[both tiers] R-I7 — Re-check against the SOURCE, not against yourself; and mark inference.**
Replace "silently re-check your own dates/defs/formulas" with: **before sending, verify each date/definition/formula against the anchored source span** — an external check, not reflection. Anything you state that is *not* directly on the page but is your synthesis/inference gets an explicit **"(my read, not stated outright)"** tag, distinct from the existing "outside your materials" tag. Three states, never blurred: **on-page (anchored) / my inference (tagged) / outside your materials (tagged).** *(Overmind F15, verified: bare self-reflection doesn't improve accuracy — the check must be against external text. F13: deterministic/checkable feedback beats fuzzy self-judgment.)*

**[power tier] R-I8 — Quality-pass as a checkable gate, not a vibe.**
The existing "quality pass before filing" becomes an explicit pre-write checklist the skill must pass: (1) every item answerable from memory alone; (2) every `A:` traceable to an `src:` anchor; (3) no item asserts a fact absent from the cited span; (4) no duplicate cue. File only on pass; on fail, fix the item or drop it. *(Overmind F13 "deterministic rules-based feedback first"; F12: don't over-block on style — these four are correctness gates only.)* Novice tier states these as a short "before you file, confirm" line, not a machine gate.

---

## 3. flo-explain improvements — low-context slide explanation

The core change is a **trichotomy replacing the current binary**, plus **ask-before-guessing**. Both are cheap in characters, which matters for the 8000-char budget.

**[both tiers] R-E1 — The on-slide / my-inference / can't-tell trichotomy.**
When explaining from slides (or any low-context source), label every load-bearing statement as one of three:
- **On the slide** — carries the pointer (slide n / the exact bullet). Say what the slide literally states.
- **My inference** — the reconstructed lecture meaning the slide implies but doesn't spell out. Tagged plainly: *"the slide doesn't say this outright, but it's almost certainly pointing at…"* This is the value-add over a copy-paste tool (beats NotebookLM's "regurgitates exact language"), delivered honestly (beats its "citations are guesses").
- **Can't tell from this slide** — when a plain reading is genuinely ambiguous or the slide omits what's needed, say so and say **what would resolve it** (the prior slide, the lecture, one clarifying fact). Do not fill the gap with plausible fiction.

This replaces the current two-bucket model (grounded pointer vs "outside your materials"), which forces inference to masquerade as fact or be dropped. *(Anti-F2. Mirrors the winning-tutor design — Kestin 2025 verified strong: embedded-correct-content + honest withholding beat a class; and the RCT's expert-solution grounding is precisely "don't fabricate the step you don't have.")*

**[both tiers] R-E2 — Ask before you guess (one question, not a refusal).**
If the slide is too thin to explain responsibly and one piece of context would unlock it, **ask that one question first** rather than producing a confident reconstruction. Keep it to a single question; if the student can't answer, fall back to the labelled best-effort inference from R-E1 (never a dead-end refusal). *(findings.json failure-modes: novices overgeneralize and mis-scope; a targeted question is the cheapest correction. Ask-before-guess is the anti-fabrication reflex F2 needs, and it's ~1 sentence of budget.)*

**[both tiers] R-E3 — Keep the answer-first, grounded posture and the single recall question, but pitch inference-heavy explanations lower-confidence in tone.** When an explanation is mostly R-E1 "my inference," the appended recall question should test the *slide's actual content*, not the inferred gloss — so a student never banks an inference as fact. *(Anti-Illusion-of-Explanatory-Depth, findings.json.)*

**[power tier] R-E4 — none needed beyond ledger writes already specified.** flo-explain's value here is behavioral (the trichotomy + ask-first); no file mechanism buys additional grounding, and adding pipeline here would violate the no-heavy-orchestration finding (Overmind F1/F4). The only power-tier touch is the existing silent ledger update for durable items — unchanged.

**Budget note (8000-char novice pack):** R-E1+R-E2+R-E3 are ~4–5 sentences total. To stay under budget, they should be authored as **one shared "grounding trichotomy" block referenced by both** flo-ingest (R-I7) and flo-explain (R-E1) — the on-page/inference/can't-tell distinction is identical, so it's written once and costs once (Overmind F16: minimal, high-signal, no duplication).

---

## 4. Measurable evals

Both are runnable today as prompt-level fixtures (no infra), scored deterministically or by a single rubric'd judge in a **fresh context** (Overmind F11 verified: verifier sees only output + criteria, never the generation reasoning; F13: prefer checkable rules over fuzzy judging).

**Eval A — flo-explain anti-fabrication (the ambiguous-slide probe).**
- **Fixture:** a set of ~15 single slides. ~1/3 are **plants** whose plain reading is genuinely ambiguous or under-specified (a bare bullet like "Elasticity → revenue?" with no direction stated; an acronym never expanded on the slide; a formula with an undefined symbol). ~1/3 are clear-but-terse (inference legitimately needed). ~1/3 are self-contained (no inference needed).
- **Pass criteria (deterministic):** (1) on **plant** slides, the response either asks the unlocking question (R-E2) or labels a **can't-tell** (R-E1) — scored FAIL if it states a confident direction the slide doesn't support; (2) every load-bearing statement carries exactly one of the three labels; (3) zero un-anchored claims presented as on-slide fact. **Headline metric: fabrication rate on plant slides** (target: →0, vs the ~13% competitor baseline). Secondary: inference-labeling precision on the terse set (it should add inference, not refuse).

**Eval B — flo-ingest long-doc fidelity + triage.**
- **Fixture:** one long document (a ~100–150pp book chapter set or long article) that exceeds a single clean pass, seeded with **3 "tracer" facts placed late** (e.g. a definition on p.95, a formula on p.130) and **2 decoys** (plausible-sounding facts that are NOT in the doc).
- **Pass criteria:** (1) **Late-fact recall:** all 3 tracer facts appear in the notes/quiz with a **correct page-anchor** (tests R-I1/R-I2 — that late context survived the running-outline, not dropped — the direct F1 test). (2) **No-fabrication:** neither decoy appears as a sourced claim; any related statement is tagged inference/outside (R-I7). (3) **Anchor resolvability:** sample 10 pointers; each must resolve to the claimed span (auto-checkable by string match). (4) **Triage fidelity:** the topic ranking matches a human-marked answer key of what the doc emphasizes (frequency/heading weight), scored as rank correlation — proves the summary is exam-prioritized, not page-ordered (R-I4). **Headline metric: late-fact anchored-recall rate** (F1) and **decoy-fabrication rate** (F2), both target 0 misses / 0 fabrications.

Re-run both as a regression gate whenever the shared grounding block or either skill changes (Overmind F8, verified: harness assumptions go stale — re-test that each rule still earns its budget).

---

## 5. Buildability & constraint check

Every rule above is a **prompt/skill-text change or a file-write already within the plugin's existing model** — nothing needs new orchestration:
- Novice additions total roughly one shared trichotomy block + ~6 short rules (R-I1/2/4/5/6/7, R-E1/2/3), authored once and cross-referenced, well inside the 8000-char shared budget; each passes Overmind F16's "would removing this cause a mistake?" test (they target the two named, verified top failure modes).
- Power-tier mechanisms (R-I3 file-backed outline, R-I8 checkable gate) are file-writes and checklists, not agent fan-out — consistent with Overmind F1/F4 (single-lead for non-parallelizable work; fan-out only pays for genuinely parallel research) and the owner's proven "no heavy orchestration on novice" finding.
- Nothing here polices the student, adds telemetry, or weakens grounding-by-default — it *tightens* grounding (trichotomy, anchor-resolvability, external-source re-check replacing bare self-reflection per Overmind F15) and adds the exam-triage + long-doc fidelity the research says students most need and most distrust.

**Files referenced (absolute):**
- `C:\Users\Florean Andrei\Desktop\flo-toolkit-unified\plugin\skills\flo-ingest\SKILL.md`
- `C:\Users\Florean Andrei\Desktop\flo-toolkit-unified\plugin\skills\flo-explain\SKILL.md`
- `C:\Users\Florean Andrei\Desktop\flo-toolkit-unified\plugin\context\LEDGER-FORMAT.md` (deck `src:` + topic-map evidence tags reused by R-I1/R-I4)
- `C:\Users\Florean Andrei\Desktop\flo-toolkit-unified\docs\evidence\findings.json` and `C:\Users\Florean Andrei\Desktop\fable 5 grade harness\RESEARCH-FINDINGS.md` (evidence cited inline)