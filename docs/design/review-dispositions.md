# Design Review — Finding Dispositions

## Delta review of rev 2 → rev 3 (2026-07-02)

Rev 2 was **NOT CLEARED** ([delta-review-1.md](delta-review-1.md)): blocking items
B1–B4 + 10 conditions. Rev 3 resolved all four blocking items (B1 → blueprint §5F
budget table + §4 enforcement row; B2 → §3 emission policy + hot/cold split; B3 → §3
phone receipts; B4 → §2 rule 6 arithmetic) and landed conditions 1–10. **Bounded
re-check (two hostile verifiers, chair-prescribed scope): CLEARED** — B1, B2, B3, B4
and all ten conditions PASS. Four non-blocking residuals, all landed: "advisory"
qualifier added to §5A's 70/30; F1 line added to the ledger header spec; course
detection + share emission consciously budgeted in the pack; **append-only log
streams given hot/cold assignment, per-stream line caps, and rollup rules in
LEDGER-FORMAT.md** (without which the cold budget failed arithmetically within a
semester — the re-check's best catch).

## Rev 1 → rev 2 (2026-07-02)

**Date:** 2026-07-02 · Review: [design-review.md](design-review.md) (verdict FLAWED).
Per ADR-0001 every finding gets a disposition. All 7 criticals and 16 majors:
**Accepted — incorporated in blueprint rev 2** at the sections below. Minors:
accepted as noted. The committee's three discarded sub-arguments: **concurred** (they
relitigated locked ADRs; the retained novel material was incorporated).

| Finding | Disposition → blueprint rev 2 location |
|---|---|
| C1 ledger write path | Accepted → §3 save ritual, staleness self-announcement, mobile-never-saves, recovery; honest "student-executed" statement; M1 gate items |
| C2 no template sharing | Accepted → §3 guided setup page, self-verifying pack ("check my setup"), operational "unaided"; ten-minute reality test in §8 |
| C3 retrieval never fires | Accepted → §2 cue layer (status footer, .ics, self-authored if-then, delay discipline); g=0.74 claim downgraded to g≈0.50 for M1 (§2 rule 4, §5C) |
| C4 retrieval fidelity | Accepted → §2 rule 3 spec; R-11 extended; LLM question-validity literature promoted to blocking input (§7 bet 2) |
| C5 calibration uncalibrated | Accepted → §2 rule 5 protocol (pre-answer confidence, self-scoring, ≥2-day material, action-not-commentary, logged pairs) |
| C6 grounding absent | Accepted → §2 rule 2 "grounding by default"; M1 gate zero-unlabeled-claims; Romanian grounding gate at M4 |
| C7 ledger schema/semantics | Accepted → §5A specified format: schema doc, append-only sections, item fields, delayed-attempt mastery, 7-day staleness decay, 70/30 quiz mix, health check, recovery |
| MJ1 metric channel | Accepted → append-only event log; per-context bypass; fortnightly ask; churn pre-registration; qualitative debriefs; bias stated (§4 matrix, §7) |
| MJ2 quiz-first mis-scope | Accepted → /explain answers first + one atomic item; bypass word "skip" printed verbatim; falsification threshold pre-registered (§2 rule 1, §7 bet 1) |
| MJ3 5-minute promise / quota | Accepted → starter kit first session; /examkit chunked with estimates and quota seams; cost classes measured not vibed (§5C, §5E) |
| MJ4 RAG-mode degradation | Accepted → lean-project rule, ledger token budget, announced-degradation gate test (§3, §6) |
| MJ5 instruction pack limits | Accepted → pack budgeted and ranked by load-bearing order; ≥80% adherence gate over scripted session; on-demand expansion (§5E, §6; build-time task) |
| MJ6 stale capability matrix | Accepted → §4 rewritten from July-2026 verification; Cowork middle tier added; SessionStart+.ics routines; no fire-may-skip exam reminders; ADR-0003 amendment logged |
| MJ7 command discoverability | Accepted → intent routing incl. Romanian, confirm-and-teach, menu, self-advertising artifacts; Romanian natural-phrasing gate test (§5E, §6) |
| MJ8 multi-course topology | Accepted → one Project "Your Studies", per-course ledgers, course detection + confirmation, input sanity checks (§3) |
| MJ9 triage overconfidence | Accepted → input-sufficiency stage, per-topic evidence + confidence labels, coverage-complete ordering, ground-truth gate check (§5A) |
| MJ10 essays unserved at M1 | Accepted → feedback behavior in M1 instructions (unnamed), essay-format retrieval items, gate friends span assessment mix (§5D, §6) |
| MJ11 phone-first mismatch | Accepted → device posture declared per flow; phone-native /quiz; chat-paste share format; pinned-Project entry habit; phone gate tests (§3, §5A, §5E, §6) |
| MJ12 no reward / review debt | Accepted → §2 rule 6 adoption architecture (80% success interleave, progress delta, caps, retirement, amnesty, bounded sessions, <48h cram branch); SRS-dropout literature pulled pre-M1 |
| MJ13 citation drift | Accepted → §1 qualifier restored; Bastani labeled verified-adjacent with corrected wording; deferred-assistance citation added (§7 bet 3) |
| MJ14 privacy honesty | Accepted → two-class artifact taxonomy; honest data-residency (persistence §3 is explicit that ledgers live in Anthropic's cloud on the novice tier); training-toggle onboarding sentence; R-09 checklist written now ([../risks/r09-privacy-checklist.md](../risks/r09-privacy-checklist.md)); intended-purpose statement at M4 |
| MJ15 unversioned prose template | Accepted → versioned self-diagnosing template, /checkup, update procedure, golden transcripts + smoke test, canonical artifact spec, cross-tier round-trip from M2 (§5E, §6) |
| MJ16 M1 gate rewrite | Accepted → consolidated gate adopted in full (§6) |
| MN1 "anonymous" mislabel | Accepted → ADR-0012 amended: "local, voluntary self-reported counters"; aggregates only in portfolio docs |
| MN2 synthetic repair fixtures | Accepted → runbook template rule (§5E) |
| MN3 self-explanation uptake | Accepted → default-next-turn decline-not-opt-in; offered-vs-attempted tallied (§5B) |
| MN4 Latimier caveat | Accepted → uniform spacing kept for v1; expanding-schedule revisit noted for M3 |
| MN5 Fleckenstein hygiene | Accepted → §5D rewording, unverified-strong tag, L2 subgroup noted |
| MN6 status-tag restoration | Accepted → memo tag convention applied through rev 2; "~90% (owner estimate)" restored; per-friend plan confirmation added to M1 |
