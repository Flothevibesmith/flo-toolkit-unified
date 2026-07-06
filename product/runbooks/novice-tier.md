# Runbook — Novice Tier (claude.ai Project template) · Flo's Toolkit v1.0

Audience: a fresh Claude session with zero memory, helping the owner repair a
friend's install (ADR-0011). Read this whole file first. **Always reproduce problems
with the synthetic fixture below before asking for a real ledger; if a real ledger is
ever needed, have the student delete the Error log section first** (MN2).

## What this component is
Prose instructions (`product/novice/instruction-pack.md`, **v1.1**, 7,443/8,000
chars) pasted into a claude.ai Project's Instructions field, plus `LEDGER-FORMAT.md`
in Project knowledge. **State lives in claude.ai project memory** (ADR-0017),
curated via PROGRESS RECAP emissions — Claude cannot write Project knowledge, and
the student saves nothing; the ledger file is an on-demand export/backup only.
Requires the friend's Memory setting ON (SETUP Step 1). Enforcement is
probabilistic: failures are behavioral ("it stopped doing X"), not crashes.
**v1.1 additions:** PromptForge (6–10 lettered questions on vague requests,
"defaults"/A-B-C protocol, ADR-0016) and always-on scope (every message routed,
GENERAL COACHING default lane, ADR-0018).

### Repair 0 — "it forgot everything" (v1.1's most likely new failure)
Check in order: (1) Memory setting off or never enabled → SETUP Step 1; (2) chats
happening OUTSIDE the Project (memory is project-scoped — retrain the habit, pin the
Project); (3) memory on but state thin → run one quiz to completion so a PROGRESS
RECAP lands, verify recall next day; (4) persistent → use "export my progress" +
re-attach as stopgap, and log it: if this recurs across friends, ADR-0017's revisit
trigger has fired (fall back to save ritual or Desktop tier).

## Diagnosis — always start here
Have the student type **`is it working?`** and paste you the full reply.
- No version number / chatty answer → instructions aren't installed → Repair 1.
- Setup OK but "LEDGER-FORMAT.md: no" → knowledge file missing → re-add per SETUP
  Step 3.
- Ledger check fails → Repair 2.
- All checks pass but behavior is off → Repair 3.

## Repair 1 — instructions not active
Cause: pasted into chat instead of the Instructions box, truncated paste, or
accidental edit. Fix: re-run SETUP Steps 2 + 4. Verify the paste's LAST line matches
the pack's last line (truncation check).

## Repair 2 — broken ledger
Symptoms: staleness never announced, wrong due items, quiz reads dead topics,
"check my ledger" reports structure problems.
1. Validate against LEDGER-FORMAT.md: header fields present? HOT/COLD/stream
   sections present? CANARY as final paragraph? Stream caps respected?
2. Most common corruptions: streams rewritten instead of appended (compare lengths
   with the student's previous snapshot — they keep last week's file), missing
   canary, `last-updated` not updating (save ritual being skipped — retrain the
   habit, not the file).
3. Recovery: rebuild from artifacts — "paste any decks, maps, or receipts you still
   have" → regenerate a fresh ledger per format; mastery resets to `developing` for
   topics with evidence, `weak` otherwise. Honest reset beats corrupted precision.

## Repair 3 — behavior drift (platform/model changed under us)
Run the golden session below against a test Project. Compare with the last logged
run in `golden-log.md`. If ≥2 behaviors regressed: platform drift — check budget
headroom (1,406 chars) to reinforce the failing behavior in the pack; bump version;
run the update procedure. **If reinforcement doesn't restore adherence, do NOT keep
rewriting the pack — that's the pre-committed tier-migration boundary (blueprint §7):
move the friend to Cowork/Desktop or the plugin.**

## Golden session (smoke test — run monthly and after any platform change; log results)
| # | Prompt | Expected |
|---|---|---|
| 1 | `check my setup` | Exact string "Flo's Toolkit v1.1 — setup OK" + 4 lines incl. memory status |
| 2 | (new chat) `salut, ce știi să faci?` | Romanian reply, one-line five-phrase menu |
| 3 | upload any PDF + `fă-mi notițe` | Course confirmation BEFORE notes; source pointers; ≤8 items; explain-back ask next turn |
| 4 | `quiz me` | One question per message, no answer in same message, confidence asked, "say **skip**" printed |
| 5 | `skip` | Answer revealed, no judgment |
| 6 | end the quiz | PROGRESS RECAP in prose (course, exam date, topic states, streak, next due) — no save instruction, no ledger block |
| 7 | ask a fact clearly outside uploaded materials | "outside your materials" tag |
| 8 | (vague) `help me with econ` | FORGE: 6–10 lettered questions + starred defaults + "1b 2a / defaults" line; then improved prompt + A/B/C |
| 9 | reply `defaults` then `A` | Improved prompt executed fully, no re-forge |
| 10 | (clear) `explain price elasticity from lecture 3 in 5 bullets` | NO forge — direct grounded answer + one recall question |
| 11 | (next day, new chat) `where were we?` | Recall from memory: course, exam date, quiz results — without any file re-attach |
| 12 | `export my progress` | Full ledger file per LEDGER-FORMAT.md, canary included |
Log: date · model · pass/fail per row → `product/runbooks/golden-log.md`.

## Update procedure (~2 min for a friend)
1. Owner edits `instruction-pack.md`, bumps version (v1.0 → v1.1), regenerates
   SETUP.md copy-blocks, commits.
2. Announce in the group chat: "Toolkit update: re-copy block 1 from the setup page
   into your Project Instructions (replace everything). 2 minutes."
3. Friend verifies with `check my setup` — the version number confirms the update.

## Synthetic fixture
A fake course ledger for reproduction tests (never use real friend data):
create `ledger-testology.md` per LEDGER-FORMAT.md with: 3 topics (one weak, one
developing, one strong), 6 active items with varied `created` dates (2 due), streams
each holding 2 lines, plan: pro, exam 21 days out, canary present.
