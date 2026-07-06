# R-09 Privacy & Compliance Checklist (executable gate — written per MJ14)

Purpose: make the M4 "GDPR review" gate falsifiable. Under ADR-0011 this checklist is
the runbook — a fresh Claude session executes it mechanically and each item passes or
fails. M1–M3 items are marked; the rest bind at M4 (public release). Legal posture
context: during M1–M3 users are friends processing their own study data (household
sphere); the exposure that matters starts at public distribution.

## Data inventory (M1)
- [ ] Per-tier data map exists and is honest: novice-tier ledgers live in Anthropic's
      cloud (claude.ai Project knowledge) under consumer terms; Desktop/Code tiers
      hold local files. No "local-first" claim anywhere it isn't true.
- [ ] Ledger contents enumerated: mastery states, error log, calibration pairs,
      usage-log events, exam dates. Nothing else collected, ever.
- [ ] No data about *other* students is processed by default (group features out of scope).

## Disclosure & consent (M1)
- [ ] Onboarding contains the one-sentence training-toggle pointer and notes the
      ledger stores performance history. Register per ADR-0004: informative, not a
      legal wall.
- [ ] Counter language says "local, voluntary self-reported" — the word "anonymous"
      appears nowhere (identified screenshots from named friends are not anonymous).

## Sharing surfaces (M1)
- [ ] Artifact taxonomy enforced: SHAREABLE (stripped decks, topic/semester maps) vs
      PERSONAL (ledger, error log, calibration, usage log).
- [ ] Ledger first line reads "Personal — share deliberately."
- [ ] Share/export paths strip personal annotations by default.
- [ ] Repair runbooks instruct: synthetic fixtures first; strip the error log if a
      real ledger must be shared in a debug session.

## Public release (M4)
- [ ] Intended-purpose statement published: "a personal self-study tool; not for
      institutional evaluation, admission, grading, or proctoring."
- [ ] Marketing-language rule applied: never "grading"/"assessing students."
- [ ] Explicit EU AI Act disposition on the record: Annex III 3(b) analysis hinging
      on intended purpose; documented why-no-conformity-assessment note (a free
      personal prompt-pack is not an institutional evaluation system — gold-plating
      is the symmetric error).
- [ ] README privacy note: what's stored, where, by whom, how to delete (delete the
      Project / the files).
- [ ] Aggregates only in portfolio/publicity material; no identified friend data.
