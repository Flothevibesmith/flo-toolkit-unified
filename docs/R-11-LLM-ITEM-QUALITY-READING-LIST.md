# R-11 reading list — LLM-generated quiz-item quality & validity

**Status:** pre-M1 blocking input (risk-register R-11; review-dispositions C4; blueprint
§7 bet 2). Compiled 2026-07-07.

## Why this list exists (verbatim provenance)

R-11 is a HIGH risk in [risks/risk-register.md](risks/risk-register.md):

> **R-11 — LLM-generated quiz-item quality (critique #5).** All cited retrieval
> effect sizes used human-authored items; hallucinated or miscalibrated flashcards
> could void the core loop's value. Mitigation: item-quality pass in every deck
> pipeline (self-critique, duplicate/hallucination filter, user flagging);
> Romanian-language item quality is a pre-launch gate (ADR-0010); **literature check
> on LLM question validity in design phase.**

The design review escalated it (review-dispositions.md, row "C4 retrieval fidelity"):

> Accepted → §2 rule 3 spec; R-11 extended; **LLM question-validity literature
> promoted to blocking input (§7 bet 2).**

And the disposition that opened the gap (evidence/student-ai-usage.md, critique #5):

> Accepted → risk R-11 + design requirement: item-quality pass … **literature check
> added to design-phase reading list.**

This file is that reading list. The 84-finding evidence base
([evidence/findings.json](evidence/findings.json)) covers usage surveys,
discipline differences, competitive landscape, failure modes, and the
retrieval/spacing learning science — but contains **zero** findings on whether an
LLM can author valid retrieval items. That is exactly the hole R-11 names. The
sources below fill it.

## The headline the literature returns

**Raw LLM item output is not safe to quiz on without a validation pass — which
vindicates R-11's mitigation rather than relaxing it.** The most on-point study
(An et al. 2025) rejected roughly **two-thirds** of GPT-generated retrieval
questions in QC even while the surviving items lifted quiz accuracy 73%→89%. The
health-professions network meta-analysis (Riehm et al. 2026) finds **only GPT-4**
reaches human parity on relevance/clarity/distractor quality, and only at VERY LOW
evidence certainty; weaker models (Llama 2, GPT-3.5) fall short on distractors.
Psychometric parity is achievable (Crk & Gultepe 2026) but **conditional on
expert-validated prompting** — i.e. a human-in-the-loop or an equivalent automated
gate. Every source converges on the same design consequence: **the item-quality
pass is load-bearing, not optional, and "item-quality pass working" must be tested
for retrieval fidelity, not just accuracy (C4).**

## Reading list

Grouped by what each source feeds. `verified` = citation fetched and confirmed this
session; `listed` = surfaced by web search, URL real, citation details not
individually fetched — confirm before quoting.

### A. Foundational — automatic question generation (AQG) quality & evaluation
| # | Source | Feeds | Note |
|---|--------|-------|------|
| A1 | Kurdi, Leo, Parsia, Sattler & Al-Emari (2020), "A Systematic Review of Automatic Question Generation for Educational Purposes," *Int. J. of Artificial Intelligence in Education* 30(1):121–204. https://eric.ed.gov/?id=EJ1247652 | item-quality pass; C4 | The canonical pre-LLM baseline. Documents how little AQG work controlled item difficulty or harmonised evaluation metrics — the exact discipline our pass must add. `verified` |
| A2 | "Exploring quality criteria and evaluation methods in automated question generation: a comprehensive survey" (2024), *Education and Information Technologies*, Springer. https://link.springer.com/article/10.1007/s10639-024-12771-3 | item-quality pass criteria | Updates Kurdi into the LLM era; catalogues the quality criteria/eval methods our self-critique pass should encode. `listed` |

### B. Directly on-point — LLM retrieval-practice items & student learning
| # | Source | Feeds | Note |
|---|--------|-------|------|
| B1 | An, Liu, Acharya & Hashmi (Drexel, 2025), "Enhancing Student Learning with LLM-Generated Retrieval Practice Questions: An Empirical Study in Data Science Courses," arXiv:2507.05629. https://arxiv.org/html/2507.05629v1 | R-11 core; C4; M1 gate design | **The single most relevant paper.** LLM retrieval questions lifted weekly accuracy 73%→89% (p<0.0001, r=0.59) — BUT ~2/3 of generated questions were rejected in QC for factual errors, hallucinated concepts, hint-laden stems, ambiguous answers, trivia. "Human verification and validation is indispensable." `verified` |
| B2 | "Investigating Student Ratings with Features of Automatically Generated Questions: A Large-Scale Analysis using Data from Natural Learning Contexts," EDM 2024. https://educationaldatamining.org/edm2024/proceedings/2024.EDM-long-papers.16/index.html | flagging loop; adoption | Which item features drive student ratings in the wild — informs the "user flagging" arm of the pass. `listed` |

### C. Psychometric / docimological quality vs human items
| # | Source | Feeds | Note |
|---|--------|-------|------|
| C1 | Riehm, Nanji, Lakhani, et al. (2026), "The use of large language models in generating multiple choice questions for health professions education: A systematic review and network meta-analysis," *PLoS One* 21(1):e0340277. https://pmc.ncbi.nlm.nih.gov/articles/PMC12758716/ | model-choice; item-quality pass | 15 studies, 5 LLMs. Only GPT-4 comparable to humans on relevance/clarity/distractor quality (all VERY LOW certainty); GPT-3.5 & Llama 2 weaker on distractors. Sets the "which model is even a candidate" floor. `verified` |
| C2 | Crk & Gultepe (2026), "Evaluating the instrumental quality of LLM-generated assessment items," *Frontiers in Education* 11. https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1837523/full | item-quality pass; CS-subject confidence | Zero-shot **expert-validated** GPT-4 MCQs reached psychometric equivalence (difficulty, discrimination, reliability) to human items in an OS course. Parity is real but conditional on the validation step. `verified` |
| C3 | "Docimological Quality Analysis of LLM-Generated Multiple Choice Questions in Computer Science and Medicine" (2024), *SN Computer Science*, Springer. https://link.springer.com/article/10.1007/s42979-024-02963-6 | psychometric criteria | Docimological (test-theory) scoring of generated MCQs across two domains. `listed` |
| C4 | "Assessing LLM-generated vs. expert-created clinical anatomy MCQs: a student perception-based comparative study," *Medical Education Online* (2025). https://www.tandfonline.com/doi/full/10.1080/10872981.2025.2554678 | flagging; perceived quality | Student-perception axis (realism, clarity, distractor quality, cognitive depth). `listed` |

### D. Distractor generation & automated QC (build the pass with these)
| # | Source | Feeds | Note |
|---|--------|-------|------|
| D1 | "Assessing the Quality of Multiple-Choice Questions Using GPT-4 and Rule-Based Methods" (2023), arXiv:2307.08161. https://arxiv.org/pdf/2307.08161 | item-quality pass architecture | An automated QC screen combining LLM-judge + rules — a concrete blueprint for the self-critique/dedupe/hallucination filter. `listed` |
| D2 | "Exploring Automated Distractor Generation for Math MCQs via LLMs" (2024), arXiv:2404.02124. https://arxiv.org/pdf/2404.02124 | distractor quality | Plausibility vs. cue-elimination scoring of distractors. `listed` |
| D3 | "Improving Automated Distractor Generation for Math MCQs with Overgenerate-and-rank" (2024), arXiv:2405.05144. https://arxiv.org/pdf/2405.05144 | deck emitter | Overgenerate-and-rank is directly usable in the deck emitter to raise distractor quality. `listed` |

### E. Automation-vs-agency (retrieval fidelity & adoption, C4)
| # | Source | Feeds | Note |
|---|--------|-------|------|
| E1 | "'I Spend All My Energy Preparing': Balancing AI Automation and Agency for Self-Regulated Learning in SmartFlash" (2026), arXiv:2602.14431. https://arxiv.org/pdf/2602.14431 | C4; adoption/§7 | The desirable-difficulties tension: auto-generated flashcards can strip the productive effort that makes retrieval work. Argues for the "answerable only from memory" criterion. `listed` |

## What this closes and what it does not

- **Closes:** the R-11 "literature check … in design phase" obligation and the §7
  bet-2 blocking-input requirement — the design phase now has a cited evidence base
  for the item-quality pass and the retrieval-fidelity spec.
- **Does NOT close:** the *Romanian-language* item-quality gate (ADR-0010) — none of
  these sources test Romanian generation; that remains a pre-launch empirical gate,
  not a literature question. B1/C1/C2 should also be re-verified against the running
  item-quality pass once the 20-item sample (M1 "item-quality sample") is generated.
- **Not yet folded into findings.json.** These are newly compiled and live here as a
  reading list; promote the load-bearing three (B1, C1, C2) into the 84-finding base
  with verdicts if the owner wants them under the same verification discipline.
