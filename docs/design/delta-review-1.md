# Closing Memo — Delta Review, Rev 2 Blueprint

**From:** Committee chair · **Re:** `docs/design/v1-blueprint.md` vs `docs/design/design-review.md` · **Date:** 2026-07-02

## 1. Verdict: NOT CLEARED

One lens (platform-feasibility) fails outright on MJ5, and the three lenses jointly surfaced a cluster of **internal contradictions that make the instruction pack unwritable as specified** — a builder starting today would have to invent design decisions the blueprint refuses to make. The fixes are cheap and fully specified below; this needs **one bounded rev 3 pass, re-checked on the four blocking items only**, not another full review.

### Blocking items (design-level, must land in rev 3)

**B1 — Instruction-budget economy (MJ5, carried from rev 1, now worse).** Rev 2 roughly tripled the standing-behavior inventory while never establishing the budget it spends from. Required: (a) a per-behavior character budget in §8 as a design decision, not a "build-time task"; (b) the load-bearing ranking moved from the disposition table into §8 with an explicit overflow policy (what gets cut or moved to on-demand expansion/skills); (c) the tier enforcement asymmetry — probabilistic instructions vs deterministic hooks/skills — stated in §3/§4.

**B2 — Ledger economy (three mutually contradictory mechanisms).** §3's 2.5K-token cap, §5A's append-only schema, and §3's full-ledger re-emission per command cannot coexist; the arithmetic blows the cap within weeks and the save block grows forever. Required: one emission policy defined once in §3 (light commands accumulate deltas; full ledger only at session close, /quiz//examkit completion, or "save"; footer carries unsaved-delta count); a hot/cold ledger split with per-section budgets and a rotation/rollup rule in the formats spec; the arithmetic re-run for a 300-item course in the spec itself; ledger emission listed as a cost driver in the M1 cost-class measurement. Reconcile §5A's /explain wording, and replace "one atomic action" with the honest 4–5-step save reality.

**B3 — Mobile data path ("mobile never saves" has no carrier).** "Fold into your next laptop session" is load-bearing on a channel §3 itself declares non-load-bearing, and it silently loses exactly the delayed attempts that are the only ones allowed to update mastery. Required: either the ~10-line phone quiz-receipt (copy/screenshot, ingested at next laptop save, prompted for at laptop session start) or an honest practice-only declaration in §2 rule 4 and the footer. Either way: device-bias caveat added to §7's measurement caveats, and a phone-quiz→laptop-save survival round-trip added to the M1 gate.

**B4 — Retrieval-loop arithmetic (MJ12 residue + cold start).** §2 rule 6's ~80% success band and §5A's 70/30 weak/due-strong mix are mutually unsatisfiable. Required: success band controlling, numeric mix advisory, target held via scaffolding level within weak topics. Plus cold-start semantics in §2: first-session delta reports coverage/practice honestly with the next-day return cue; never-attempted items default due-weak; same-session compliance gets a distinct non-mastery reward token. Plus one sentence fixing retirement: interval extension, never deletion; "mastered" = N consecutive successful delayed attempts; /examkit resurfaces retired items pre-exam.

### Build-time conditions (spec/prose-level; land in rev 3 text or the M1 formats/setup deliverables — no re-review needed)

1. **Footer salience modulation (§5E):** full footer only on state change and session boundaries; suppressed inside quiz blocks; per-message chrome budget added to the MJ5 15-turn adherence gate; footer-noticing probe in the M1 friend debrief.
2. **Onboarding split (§5E):** minute-one core capped at 4 taught concepts (setup, check-my-setup, save ritual, starter kit); everything else moved to contextual drip; total first-contact time (not setup alone) in the M1 gate.
3. **F1 mental model:** "I keep your course map and progress, not your files — re-attach for detail questions" in onboarding + ledger header; graceful re-attach routing for detail questions; §1 pitch reworded to "remember your progress and what matters for your exams."
4. **/explain item source:** draw the appended item from a due ledger topic (preferred) or explicitly exempt it from rule 3 / mastery updates.
5. **Setup verification:** setup page prints the expected reply verbatim ("Flo's Toolkit v___ + checklist — anything else means step 3 failed"); deliberate mis-paste negative case added to the §8 ten-minute reality test, which must also time one full save round-trip.
6. **Diagnostic consolidation:** one umbrella "is it working?" intent-router entry running setup/ledger/toolkit checks; three names internal-only.
7. **RAG-degradation detection:** section-presence canary paragraph in §3/formats spec (pre-read presence check before ledger-reading commands, fixed warning line); assign its ~2 lines in the MJ5 ranking.
8. **.ics:** verify at build whether arbitrary extensions ship; otherwise the plain-dates fallback is the design; phone-import step on setup page + M1 gate check.
9. **Restore the dropped MJ11 gate item:** one-week in-Project chat-fraction observation for both friends.
10. **Record hygiene:** MN4 expanding-schedule caveat written into the §6 M3 row; MJ12's SRS-dropout literature pull-forward written into §7 blocking inputs/§8 (currently exists only in the disposition table — the exact drift class MJ13 was about).

## 2. Confirmed resolved

C1, C2, C3, C4, C5, C7, MJ1 (via schema, per detectors), MJ2, MJ3, MJ4, MJ6, MJ7, MJ8, MJ9, MJ13. Partially resolved — mechanisms landed, residue folded above: MJ11 (B/condition 9), MJ12 (B4), MN4 (condition 10).

## 3. Unresolved / new — disposition

MJ5 → B1 (sole outright fail). All fifteen new flaws raised across the three lenses trace to five roots and are fully absorbed by B1–B4 and the ten conditions; none requires new architecture, new bets, or new milestones. The rev 3 re-check should verify only B1–B4 plus spot-check that conditions 1–10 appear in the text or are assigned to a named M1 deliverable.

## 4. Residual risk

Even after rev 3, the entire critical path — save ritual, cue layer, grounding, delay discipline — is enforced through probabilistic instruction adherence with documented long-chat decay, and the cue layer must fire deepest into long chats, exactly where decay bites; B1 caps the spend but cannot change the channel's nature. The M1 gates (15-turn scripted adherence ≥80%, week-unsupervised ledger currency, phone round-trip survival, in-Project chat fraction) are the honest backstop, and the committee is knowingly deferring three empirical unknowns to them: real cohort adherence under vague two-line prompts, Pro-quota economics under the reconciled emission policy, and whether a state-modulated footer retains cue salience past week two. If the M1 gates fail on adherence rather than on spec defects, the correct response is tier migration (deterministic hooks/skills), not another instruction-pack rewrite — that decision boundary should be written down now, while nobody is attached to the outcome.

---

## Appendix: per-lens re-check detail

```json
[
    {
        "lens":  "platform-feasibility",
        "verdict":  "fail",
        "resolved":  [
                         "C1",
                         "C2",
                         "MJ3",
                         "MJ4",
                         "MJ6"
                     ],
        "unresolved":  [
                           {
                               "id":  "MJ5",
                               "why":  "Name-checked, not resolved in the design text. The fix demanded a per-behavior character budget, a load-bearing ranking, and moving per-command depth to on-demand expansion or skills; rev 2 contains none of these — §8 defers the budget to a \u0027build-time task\u0027, the ranking exists only in the disposition table, and skills are merely \u0027evaluated during the M1 build\u0027. Meanwhile rev 2 roughly triples the standing-behavior inventory the pack must enforce: status footer on every response (§5E), full-ledger save-block emission per command (§3), staleness announcement, grounding tags + self-check passes (§2 r2), retrieval-fidelity protocol (§2 r3), delay discipline (§2 r4), calibration protocol (§2 r5), session architecture (§2 r6), bilingual intent-routing table + confirm-and-teach + per-conversation menu (§5E), course detection + input sanity checks (§3), unnamed feedback default (§5D), self-explanation default (§5B), artifact taxonomy + dual chat-paste/.md formats, version stamping, /checkup. Every critical fix (C1 save ritual, C3 footer cue, C6 grounding) is enforced solely through the channel MJ5 established as overdrawn at ~10 behaviors with known long-chat decay — and the cue layer must fire deepest into long chats, exactly where decay bites. The attack\u0027s specific demand that §3/§4 state the tier enforcement asymmetry (probabilistic instructions vs deterministic hooks/skills) is also still unstated; only the ≥80% 15-turn gate item was adopted. Gap: the blueprint spends heavily from a budget it never establishes, and the design decision of what gets cut or moved on overflow does not exist."
                           }
                       ],
        "new_flaws":  [
                          {
                              "title":  "Ledger arithmetic does not close: 2.5K-token cap vs append-only C7 schema vs per-command full re-emission",
                              "severity":  "major",
                              "attack":  "Three rev-2 mechanisms are mutually contradictory as specified. §3 caps each course ledger at ~2.5K tokens (lean-project rule, MJ4). §5A requires append-only error log, session history, and usage log (\u0027rewrites add lines, never regenerate\u0027) plus per-item fields {created, last_attempt, delay, self_graded_result, confidence} and logged calibration pairs. A semester course accumulates 100–300 deck items (~2–9K tokens of item records alone) plus one usage-log line per invocation plus session history — the schema blows the cap within weeks, and append-only forbids pruning. Whichever constraint wins, a fix regresses: exceed the cap and the lean-project rule (MJ4) erodes back toward RAG risk while the student\u0027s paste burden grows; prune and the mastery/measurement layer (C7) and event log (MJ1/ADR-0012) lose their history. Worse, §3 makes Claude re-emit the complete ledger after every command, so quota cost grows linearly with ledger size — a growing 2.5K+ token block re-generated per command on the shared Pro 5-hour window MJ3 promised to protect, and a growing verbatim-reproduction task that is exactly the high-loss LLM rewrite operation C7 identified (append-only is only append-only by instruction adherence, which MJ5 says decays).",
                              "proposed_fix":  "In the artifact-formats spec (an M1 deliverable), split the ledger into a HOT file (weak topics, due queue, exam dates, current mastery — hard-capped, re-emitted per save) and a COLD archive artifact (usage log, session history, error log, item history — append-only, emitted only on explicit archive events, e.g. weekly), with stated per-section token budgets and an archival rule. Re-run the arithmetic for a realistic 300-item course in the spec itself. Emission policy: full hot ledger on session close or \u0027save\u0027; archive block only when it changed."
                          },
                          {
                              "title":  "Mobile review results have no save path — \u0027fold into your next laptop session\u0027 names a mechanism that does not exist on the novice tier",
                              "severity":  "major",
                              "attack":  "§3 declares \u0027Mobile never saves. Phone sessions are review-only; deltas are folded into the next laptop session.\u0027 On claude.ai there is no cross-conversation carrier for those deltas: the next laptop session is a different conversation, and the only candidate channel — the memory feature — is one §3 itself classifies as \u0027best-effort, documented, never load-bearing.\u0027 The folding promise is load-bearing on that non-load-bearing channel. This bites hardest exactly where rev 2 points the cohort: phone-native /quiz (MJ11) sessions are the delayed (≥1 day) attempts that are the ONLY attempts allowed to update mastery under delay discipline (§2 rule 4) — so the product\u0027s designated review surface produces mastery data that silently evaporates, and the C1 gate item \u0027ledger current after one week unsupervised\u0027 can pass while every mobile session\u0027s results are lost.",
                              "proposed_fix":  "Give mobile sessions a save-lite: /quiz on phone ends with a ~10-line chat-paste DELTA block (\u0027send this to yourself; paste it at your next laptop save\u0027) that the laptop-session save ritual ingests — or honestly declare mobile sessions practice-only (no mastery effect) in §2 rule 4 and in the footer. Add a phone-quiz→laptop-save round-trip to the M1 gate; the current phone gate item tests quiz + share but never the data\u0027s survival."
                          },
                          {
                              "title":  "Save-emission policy is internally contradictory (§3 vs §5A) and its quota cost is unbudgeted",
                              "severity":  "minor",
                              "attack":  "§3: \u0027Every command ends by re-emitting the complete, updated ledger.\u0027 §5A /explain: \u0027ledger topic update in the next save\u0027 — deferral. Taken per §3, every casual /explain (the #1-volume command) ends with a 2.5K+ token ledger block, cluttering the answer-first experience MJ2 just fixed and burning the Pro window MJ3 just protected; taken per §5A, \u0027every command\u0027 is false and the pack needs a policy the blueprint doesn\u0027t state. The M1 cost-class measurement (§5E) does not list ledger re-emission as a cost driver.",
                              "proposed_fix":  "Define the emission policy once in §3: light commands (/explain) update state lazily; full ledger emitted on session close, on /quiz//examkit completion, or on \u0027save\u0027. Include ledger-emission overhead in the M1 per-command cost-class measurement."
                          },
                          {
                              "title":  ".ics export is asserted as a reliable novice-tier cue channel but is not a documented claude.ai output format",
                              "severity":  "minor",
                              "attack":  "§4\u0027s novice row and §5A /examkit treat the .ics as a zero-cost scheduler leg of the C3 cue layer. Anthropic\u0027s file-creation feature documents docx/xlsx/pptx/pdf/png as creatable formats (support.claude.com article 12111783); .ics is unlisted, the feature is a settings-gated capability, and the fallback — a raw text code block the student must save-as .ics — is beyond this cohort, on a phone, by the blueprint\u0027s own cohort story. Additionally /examkit runs on the laptop (declared), so even a successful .ics must cross devices before the phone becomes the scheduler; no setup-page step or M1 gate item covers phone import.",
                              "proposed_fix":  "Verify at build whether the sandbox emits arbitrary extensions (it may — the underlying tool writes files via code); if not, ship the fallback as the design: a plain \u0027add these 3 dates\u0027 block with per-OS one-line instructions and a Google Calendar path. Add a phone-import step to the setup page and an M1 gate check (\u0027countdown event visible in the friend\u0027s phone calendar\u0027)."
                          },
                          {
                              "title":  "The RAG-degradation announcement has no specified detection mechanism",
                              "severity":  "minor",
                              "attack":  "The MJ4 gate item (\u0027forced RAG-mode degradation is announced, not silent\u0027) is adopted, but nothing in §2–§5 says HOW the pack detects retrieval mode — and Claude cannot introspect it; a naive builder writes \u0027announce when in RAG mode\u0027, which the model cannot know, and the gate fails late. The only workable mechanism is a section-presence canary: project instructions (always fully resident, never RAG\u0027d) require Claude to confirm it can see all required ledger sections before /quiz or /examkit and warn if any is missing. That mechanism appears nowhere.",
                              "proposed_fix":  "One paragraph in §3 or the formats spec: the ledger schema enumerates its required sections; the pack mandates a pre-read presence check before any command that reads the ledger, with a fixed warning line when sections are missing. Costs ~2 lines of the instruction budget; assign it in the MJ5 ranking."
                          },
                          {
                              "title":  "\u0027check my setup\u0027 cannot catch the mis-paste it targets unless the expected reply is printed on the setup page",
                              "severity":  "minor",
                              "attack":  "§3 claims the self-verifying pack catches mis-pastes in message 1. But the canonical mis-paste (instruction block pasted into the chat box, or truncated paste) means the pack is NOT installed — so nothing answers \u0027check my setup\u0027 with a version string; the student gets a plausible generic reply and no signal anything is wrong. The verification expectation must live OUTSIDE the pack, on the setup page, which §3 does not state.",
                              "proposed_fix":  "One sentence in §3/the setup page: \u0027Claude should reply with: Flo\u0027s Toolkit v___ plus a checklist. If it doesn\u0027t say a version number, redo step 3.\u0027 The C2 gate item then tests the page, not the pack."
                          }
                      ]
    },
    {
        "lens":  "learning-science",
        "verdict":  "pass-with-notes",
        "resolved":  [
                         "C3",
                         "C4",
                         "C5",
                         "C7",
                         "MJ2",
                         "MJ9",
                         "MJ13"
                     ],
        "unresolved":  [
                           {
                               "id":  "MJ12",
                               "why":  "Nine of the fix\u0027s ten components are genuinely present (progress delta, caps, retirement, amnesty, bounded sessions, \u003c48h cram branch, calibration reframing), but the centerpiece is self-contradictory as specified: §2 rule 6 mandates ~80% in-session success via interleaving while §5A mandates a 70/30 weak/due-strong quiz mix. The arithmetic cannot hold — with weak items at ~45-60% success and strong at ~90%, a 70/30 mix yields ~58-69% session success; hitting 80% requires inverting the mix to roughly 30/70, which silently abandons the weak-topics-first steering the whole loop diagram runs on. Both numbers originate in the original review\u0027s own fixes (MJ12 fix #1 and C7 fix (c)); rev 2\u0027s job was to reconcile them into one coherent /quiz spec and it transcribed both instead — an implementer cannot satisfy §2 rule 6 and §5A simultaneously, so the failure-density problem MJ12 named is not actually fixed. The reconciliation exists and is cheap: hold the success target by scaffolding level within weak topics (easier cued prompts first, harder free-recall as the topic strengthens) rather than by displacing weak topics with strong ones; make the numeric mix advisory, the success band controlling. Separately, the demanded pull-forward of the SRS-dropout literature to pre-M1 exists only in the disposition table — it appears neither in §7\u0027s blocking inputs (where the analogous C4 literature promotion does appear) nor in §8\u0027s build actions, so the record claims a commitment the blueprint does not carry."
                           },
                           {
                               "id":  "MN4",
                               "why":  "The rev-2 headline and disposition table both claim MN4 corrected, and uniform spacing is indeed kept (the 7-day rule, consistent with Latimier\u0027s g=0.034 ns null on expanding vs uniform in the memo). But the caveat the finding asked to carry — expanding schedules gain value at many exposures, revisit at M3 — appears nowhere in rev 2: not in §2 rule 4, not in the §6 M3 milestone row. One sentence in the M3 row fixes it; as written this is a disposition pointing at text that does not exist, the exact record-drift class MJ13 was about."
                           }
                       ],
        "new_flaws":  [
                          {
                              "title":  "Phone retrieval writes nothing: mobile-never-saves guts the delayed-attempt, calibration, and bypass-event channels on the cohort\u0027s primary review surface",
                              "severity":  "major",
                              "attack":  "Rev 2 makes /quiz phone-native by design (§5A, per MJ11) and simultaneously rules \u0027Mobile never saves\u0027 (§3), with deltas \u0027folded into the next laptop session (\"I\u0027ll fold this into your next save\")\u0027. On claude.ai, chats share no state, and §3 itself declares the memory feature \u0027best-effort... never load-bearing\u0027 — so \u0027I\u0027ll fold this in\u0027 is a promise the platform cannot keep, the same class of fiction C1 was cited for in rev 1. Consequences compound across three repaired findings: phone sessions are precisely where delayed (\u003e=1 day) attempts happen, yet their self-scored results never reach the mastery fields (§5A), their confidence pairs never reach the calibration log (rule 5 says pairs are \u0027logged in the ledger\u0027), and their usage-log lines never reach the append-only event log — so the thesis metric (bypass events, §7 bet 1) is systematically blind on the surface where quick bypasses are most likely. §7 states a compliant-user bias but not this device bias. Weak-topic steering and readiness end up computed from laptop-only attempts while the design\u0027s own cohort story says most retrieval happens on phones.",
                              "proposed_fix":  "Give the phone session a transport artifact that is not a save: every phone quiz ends with a one-line \u0027quiz receipt\u0027 (date · course · right/wrong per topic · confidence gaps · offered/completed/bypassed) framed as copy-or-screenshot — a 10-second act, unlike the full ledger round-trip — and every laptop session-start asks \u0027any phone quizzes since your last save? paste or read them off\u0027 as part of the staleness announcement. Alternatively, declare phone quizzes practice-only honestly in §2 rule 4 and accept losing the delayed-attempt channel there. Either way, add device bias to §7\u0027s stated measurement caveats and to the M1 phone-gate test (the phone-only quiz should be checked for whether its data survives into the next laptop save)."
                          },
                          {
                              "title":  "Cold start: the reward engine and delay discipline collide exactly where habit formation is decided",
                              "severity":  "major",
                              "attack":  "In week 1 no item has a \u003e=1-day attempt, so no \u0027due-strong\u0027 pool exists for rule 6\u0027s interleave — early sessions are structurally all-weak, putting failure density at its worst during the fragile onboarding window MJ12 was about. Simultaneously rule 4 labels the starter kit\u0027s 3-question quiz (§5C) \u0027practice, not progress\u0027, so the session-end progress delta (\u0027readiness 61% → 66%\u0027) — the MJ12 reward and the ADR-0012 screenshot artifact — is either absent at the single most conversion-critical moment or fabricated from same-session fluency, i.e., the exact illusion the product exists to destroy, relocated into the reward channel. Rule 4 also quietly nullifies MJ2\u0027s fix (c) (instant visible reward for compliance): the /explain appended item is same-session by definition and can never produce a mastery tick. The blueprint specifies no cold-start behavior anywhere; items created but never attempted have no defined weak/due status.",
                              "proposed_fix":  "Specify cold-start semantics in §2: (a) first-session delta reports coverage and practice honestly (\u00276 topics mapped, 3 practiced — your first real readiness score unlocks tomorrow: say quiz me then\u0027), which converts delay discipline into a built-in next-day return cue and directly serves the C3 unprompted-return gate item; (b) until a due-strong pool exists, hold session success via scaffolding level on weak topics, not via a nonexistent strong slice; (c) give same-session compliance a distinct non-mastery reward token (practice streak / items-banked count) so rules 1, 4, and 6 stop contradicting each other; (d) define the status of never-attempted items (default: due-weak)."
                          },
                          {
                              "title":  "Auto-retirement vs 7-day decay-to-due: retirement semantics undefined, re-opening C7\u0027s \u0027spacing eliminated for learned items\u0027",
                              "severity":  "minor",
                              "attack":  "§5A decays every item toward \u0027due\u0027 after 7 days stale; rule 6 auto-retires \u0027mastered\u0027 items. These cannot both govern the same item: if retirement removes items from rotation, mastered material permanently exits the spacing loop — the original C7 attack verbatim, which the 70/30 due-strong mix was added to prevent; if retirement does not remove them, the review-debt cap it exists for is not achieved. No criterion for \u0027mastered\u0027 is given, and no re-entry rule before an exam.",
                              "proposed_fix":  "One sentence in §5A: retirement = interval extension, never deletion — a retired item leaves the weekly due cycle but is resurfaced once in the pre-exam window by /examkit\u0027s triage; \u0027mastered\u0027 = N consecutive successful delayed self-scored attempts (pick N=2 or 3 and write it down); the amnesty command remains the only true removal path."
                          },
                          {
                              "title":  "/explain\u0027s appended item violates the retrieval-fidelity spec by construction",
                              "severity":  "minor",
                              "attack":  "Rule 1 appends the atomic retrieval item in the same message as the explanation it tests; rule 3, two lines below, forbids items \u0027in the same message as the source summary\u0027 and adds quality criterion #4, \u0027answerable only from memory, not by matching visible wording.\u0027 The appended item is answerable by re-reading the paragraph directly above it — recognition wearing a quiz costume, the exact C4 failure mode — and rev 2 ships this contradiction between adjacent numbered rules. Both clauses originate in the review\u0027s own fixes (MJ2 and C4); rev 2 was supposed to reconcile them.",
                              "proposed_fix":  "Either (preferred) draw the appended item from a due topic in the ledger rather than from the just-explained content — turning it into a genuine spaced-retrieval touch and a second cue-layer channel at zero extra cost — or explicitly exempt the /explain item in rule 3 as labeled practice, excluded from mastery updates and from criterion #4, so an implementer knows which rule wins."
                          },
                          {
                              "title":  "The always-on status footer is a cue designed to extinguish",
                              "severity":  "minor",
                              "attack":  "§5E puts an identical one-line footer on every response. Constant, invariant cues habituate to invisibility within days (banner blindness) — the cue layer C3 depends on decays into wallpaper precisely for the heaviest users. Inside bounded quiz sessions it also misfires: each one-item-at-a-time turn (rule 3) ends with \u0027...say quiz me\u0027 during a quiz, and having every message end in a status line dilutes the salience of the end-of-session progress delta that rule 6 stakes the reward on.",
                              "proposed_fix":  "Make the footer state-dependent rather than constant: full footer at session start and session end, suppressed inside a declared quiz block (the session container and closing delta replace it), and mid-session only when something changed or something is newly due. This keeps the ADR-0003 every-message lever available while preserving cue salience; add footer-noticing to the M1 friend debrief (\u0027what does the last line of Claude\u0027s messages say?\u0027) as a cheap extinction probe."
                          }
                      ]
    },
    {
        "lens":  "novice-ux",
        "verdict":  "pass-with-notes",
        "resolved":  [
                         "C1",
                         "C2",
                         "MJ7",
                         "MJ8",
                         "MJ12"
                     ],
        "unresolved":  [
                           {
                               "id":  "MJ11",
                               "why":  "The design mechanisms all landed (phone-native /quiz with zero file access and no mobile save requests, chat-paste share format, declared device posture, pin + entry-habit if-then, phone walkthrough), but the original fix had TWO gate observations and rev 2 kept only one. The consolidated M1 gate (§6) tests \u0027one phone-only quiz + one artifact shared from a phone\u0027 and silently drops \u0027observe what fraction of the two friends\u0027 university chats over one week actually start in the Project.\u0027 That dropped item is the detector for the single most load-bearing novice-UX failure mode MJ11 named: the existing reflex is \u0027open a new chat,\u0027 every habitual slip lands outside the Project (no instructions, no footer, no cue layer, no usage log), and is experienced as inconsistent magic. Rev 2 installs the habit but never measures whether it holds; the \u0027show me your last three chats\u0027 debrief is tagged MJ1 and samples far too few chats to estimate a slip rate. Fix: restore the one-week in-Project chat-fraction observation to the M1 gate."
                           }
                       ],
        "new_flaws":  [
                          {
                              "title":  "Save-ritual trigger set is self-contradictory across §3 and §5A",
                              "severity":  "major",
                              "attack":  "§3 commands \u0027Every command ends by re-emitting the complete, updated ledger as one copy block\u0027 — but §5A\u0027s /explain spec says \u0027ledger topic update in the next save,\u0027 implying /explain does NOT re-emit. Both cannot be true, and each branch fails differently: if every command re-emits, the cohort\u0027s highest-frequency ask (a vague one-line /explain) ends with a ~2.5K-token state dump after every answer — the wall-of-pipes experience that gets the pack abandoned; if only some commands re-emit, the ritual is no longer \u0027one atomic action, drilled once, identical forever\u0027 and cannot be taught as THE save button. Nothing defines behavior when one chat contains three commands (three dumps?) or when a session ends mid-quiz. The builder cannot write the instruction pack without resolving this — it is a fix-before-build item despite the major label. Note also that \u0027one atomic action\u0027 oversells the claude.ai reality: the actual save is copy block, then open Project knowledge, delete the old ledger file, paste as new content — a 4-5 step navigation the F1 cohort has never performed. The gate detectors (staleness announcement, week-unsupervised test) make the bet honest, but the ten-minute reality test currently covers setup only, not one full save round-trip.",
                              "proposed_fix":  "Define the trigger set in §3: exactly one save block per conversation, emitted at session close (quiz end, /examkit completion, \u0027done for now\u0027) or on demand via \u0027save now\u0027; all other commands accumulate deltas and the status footer carries an unsaved-delta count (\u00273 unsaved updates — say save when you\u0027re done\u0027). Reconcile §5A\u0027s /explain wording to reference this rule. Replace \u0027one atomic action\u0027 with the honest step count, and extend the §8 ten-minute reality test to include timing one full save round-trip on a second Pro account."
                          },
                          {
                              "title":  "Append-only sections vs the 2.5K ledger budget vs a hand-copied paste — unbounded growth with no rotation",
                              "severity":  "major",
                              "attack":  "Rev 2 simultaneously specifies (a) append-only sections that may never lose lines (§5A: error log, session history, usage log — \u0027rewrites add lines, never regenerate\u0027), (b) a ≈2.5K-token per-course ledger budget (§3 lean-project rule), and (c) a student who hand-copies the entire ledger at every save. One usage-log line per invocation across a semester is hundreds of lines: either the budget bursts, or Claude silently drops old lines during re-emission — violating append-only and invisibly corrupting the MJ1 metric channel, the exact C7-class corruption the schema exists to prevent — or the save paste grows until partial-selection and clipboard errors shred it. As experienced: the \u0027save button\u0027 block gets visibly longer every week, the one thing a drilled ritual must never do. No rotation, archival, or rollup rule exists anywhere in §3, §5A, or the formats spec.",
                              "proposed_fix":  "Add a rotation rule to product/formats/artifact-formats.md: the ledger carries only the current fortnight of usage-log/session-history lines plus a monthly rollup line; at rollover, older lines move to a separate archive artifact (\u0027keep it or bin it — the counts are summarized\u0027). \u0027check my ledger\u0027 verifies append-only sections never shrank except via a documented rollup line, and the M1 usage-log gate item tests across the rollover boundary."
                          },
                          {
                              "title":  "Unmodulated chrome: the every-message footer plus the session-open stack trains banner blindness on the cue channel",
                              "severity":  "major",
                              "attack":  "Rev 2 stacks standing chrome on every touchpoint: a status footer on every response (§5E), a session-open stack (explicit course context §3 + ledger-age announcement §3 + due-item surfacing §2 rule 4 + one-line menu §5E), /explain\u0027s appended item plus offer (§2 rule 1), grounding tags (rule 2), and the save block. For a cohort defined by vague two-line prompts, the actual answer is now sandwiched in furniture; and an identical footer repeated on all ~24 turns of a quiz session is a textbook habituation gradient — the student learns to skip the last line of every message, which is precisely the line C3 chose as the retrieval-cue carrier. The cue layer dies not by absence (rev 1\u0027s flaw) but by wallpaper. The repetitions also spend scarce MJ5 pack budget and adherence probability on their lowest-value instances. The original panel prescribed the footer lever; rev 2 adopted it at maximum frequency with zero salience design, which is what separates a cue from noise.",
                              "proposed_fix":  "Specify salience modulation in §5E: the footer prints in full only on state change (new due items, countdown crossing a threshold, unsaved deltas) and at session boundaries; it is suppressed inside an active quiz block (the session IS the cue satisfied) and compresses to nothing when state is unchanged. Merge the four session-open behaviors into one two-line opener. Add a per-message chrome budget (answer first; at most N appended lines) as a testable requirement in the MJ5 scripted 15-turn adherence gate."
                          },
                          {
                              "title":  "Onboarding aggregation overload: ~13 distinct teachings crammed into a first contact gated at 10 minutes",
                              "severity":  "major",
                              "attack":  "Count what first contact now teaches: multi-step Project setup, \u0027check my setup\u0027, the save ritual, the snapshot habit, pin-the-Project plus the entry-habit if-then, the phone walkthrough, the gather checklist, authoring a study if-then plan plus setting the matching phone reminder, the plan question (ADR-0005), the training-toggle/performance-history sentence (MJ14), the AI-policy sentence (ADR-0004), the command menu, and the OQ-2 de-programming curriculum — thirteen teachings, before the §5C starter kit that must also run (~5 min) to demonstrate the loop. Each rev-2 fix was individually correct; their aggregation into a single onboarding is an emergent flaw the original review never priced. The \u003c10-minute gate item covers setup only — nothing budgets or sequences total first-contact load for a cohort documented as abandoning anything requiring sustained procedure. Likely outcome: a friend who technically passes the setup gate and retains only \u0027it talks a lot,\u0027 with the save ritual — the one habit that must survive — diluted among twelve others.",
                              "proposed_fix":  "Split §5E onboarding into a minute-one core (setup, check-my-setup, save ritual, starter kit — the four things without which nothing works; explicitly cap at 4 taught concepts) and a contextual drip for everything else: gather checklist when /examkit\u0027s sufficiency stage asks for it, if-then plan offered after the first successful quiz, phone walkthrough on first mobile message, snapshot habit in the ledger header text, toggle/policy sentences on the setup page footer. Add total first-contact time (setup + starter kit + core teachings) to the M1 gate, not setup time alone."
                          },
                          {
                              "title":  "The lean-project rule half-resurrects F1 and makes the §1 pitch sentence overpromise",
                              "severity":  "major",
                              "attack":  "The lean-project rule (§3) keeps raw materials out of Project knowledge — correct against RAG degradation — but it quietly reinstates the cohort\u0027s defining failure: in session 3, \u0027explain slide 30 of lecture 6\u0027 hits a Project that no longer holds lecture 6, so the student is back to re-uploading documents per conversation, the exact F1 behavior the product exists to end. §1\u0027s one-sentence pitch (\u0027makes it remember your courses\u0027) and §2 rule 2\u0027s grounding pointers (which cite source files absent from later chats) both overpromise against this reality. No design sentence tells the student what Claude keeps (course map, progress, distillates) versus forgets (the files themselves), so the mismatch is discovered as betrayal at a moment of need — by a cohort that never verifies and will either trust an ungrounded answer about lecture 6 or conclude the product is broken.",
                              "proposed_fix":  "Add the mental-model sentence to onboarding and the ledger header (\u0027I keep your course map and progress, not your files — re-attach a file for detail questions\u0027). Give the intent router a graceful detail-question behavior (\u0027that\u0027s from Lecture 6 — re-attach it and I\u0027ll pull the exact slide\u0027) instead of an \u0027outside your materials\u0027 tag that reads as amnesia. Require /ingest distillates to be sufficient for the topic-level questions the ledger claims to cover. Reword the §1 pitch: \u0027remember your courses\u0027 → \u0027remember your progress and what matters for your exams.\u0027"
                          },
                          {
                              "title":  "Three near-synonymous diagnostic phrases for a recall-limited cohort",
                              "severity":  "minor",
                              "attack":  "\u0027check my setup\u0027 (§3), \u0027check my ledger\u0027 (§5A), and \u0027/checkup — is my toolkit working\u0027 (§5E) are three overlapping diagnostics shipped to a cohort whose documented ceiling is recalling zero commands — MJ7\u0027s own premise. A confused novice with a broken toolkit, at the highest-stress diagnostic moment, must pick the right one of three.",
                              "proposed_fix":  "One umbrella entry in the intent-routing table (\u0027is it working?\u0027 / \u0027something\u0027s broken\u0027 → run setup, ledger, and toolkit checks in order, report once). Keep the three internal names for runbooks only."
                          },
                          {
                              "title":  "The setup self-check is forgeable by sycophancy unless the expected reply is printed",
                              "severity":  "minor",
                              "attack":  "The self-verifying install assumes \u0027check my setup\u0027 fails loudly on a mis-paste — but a Claude that never received the pack (instructions pasted into the chat box, truncated paste, wrong field) will still improvise a reassuring answer to that phrase (\u0027Everything looks good!\u0027). To an F2-cohort novice who never verifies, sycophantic improvisation is indistinguishable from a passing check. The check is only unforgeable if the student knows the exact token to expect, and §3 never says the setup page teaches the negative case.",
                              "proposed_fix":  "The setup page prints the expected reply verbatim next to the final step: \u0027Claude must answer with *Flo\u0027s Toolkit v1.x* plus a checklist — anything else means step 3 failed; redo it.\u0027 Add the negative case (deliberate mis-paste, then \u0027check my setup\u0027) to the §8 ten-minute reality test."
                          }
                      ]
    }
]
```