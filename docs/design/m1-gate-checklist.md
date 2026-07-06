# M1 + M2 Gate Checklist — executable (blueprint §6, consolidated per MJ16 + delta conditions)

## M2 build-time verifications (plugin tier — owner, ADR-0019)
- [ ] **Local install test:** `claude plugin install` from the local repo (or
      `/plugin marketplace add` with the local path) on THIS machine; `flo-check`
      answers with the exact v1.1 (plugin) string; all 8 skills appear.
- [ ] **Hook on Windows:** SessionStart hook fires in a folder WITH `study/`
      (rules + hot state injected) and stays silent in a folder WITHOUT it.
- [ ] **Hook on macOS** (any friend's MacBook): same two checks.
- [ ] **File-write loop:** run flo-setup → starter kit → flo-quiz end-to-end;
      verify Claude created and updated `study/ledger-*.md` correctly per
      LEDGER-FORMAT.md (caps, streams, canary) with zero manual edits.
- [ ] **COWORK TEST (the owner's requirement):** install via Desktop, open the
      studies folder in Cowork, run `check my setup` + one quiz. Record exactly
      which of: skills load / hook fires / files written. Any subset → confirm the
      graceful-degradation story in INSTALL.md matches reality; none → Code tab is
      the documented path, INSTALL.md updated accordingly.
- [ ] **Cross-surface round-trip:** `export my progress` from a claude.ai session →
      drop the file into `study/` → plugin picks it up; and the reverse.
- [ ] **Publish test:** push to GitHub, install from the public marketplace on a
      second machine with the two documented commands, timed.


Two gate friends required, spanning the assessment mix (≥1 essay-heavy). Confirm each
friend's actual Claude plan during recruitment (MN6). Record everything; a failed
item is a finding, not an embarrassment.

## Build-time verifications (owner, before friends touch it)
- [ ] **MEMORY-PERSISTENCE TEST (ADR-0017 — now carries the persistence design):**
      fresh Project, memory enabled, run a starter kit + quiz on day 1; on day 2+,
      new chat — Claude must know the course, exam date, and quiz results with
      memory as the only carrier. Also test the memory-OFF fallback path (pack must
      offer the 30-second rebuild + export). **Fail → rev-3 save ritual returns or
      Desktop tier becomes default.**
- [ ] **Forge dry-run (ADR-0016):** send 5 deliberately vague prompts; forge must
      trigger with 6–10 lettered questions + starred defaults, accept "1b 2a" and
      "defaults", print the improved prompt, and honor A/B/C. Send 3 clear prompts;
      forge must NOT trigger.
- [ ] **Ten-minute reality test (C2):** hand SETUP.md to a second Pro account; record
      every step + timing; include one deliberate mis-paste (instructions into chat)
      — Step 4 must catch it; time one full save round-trip.
- [ ] **.ics check (delta cond. 8):** can claude.ai emit a working .ics? If not,
      plain dated list is the design — update pack/SETUP wording accordingly.
- [ ] **Cowork write-loop probe (MJ6):** one course in Claude Desktop/Cowork — can
      the ledger be auto-maintained as a local file with the same pack?
- [ ] **Adherence test (MJ5):** scripted 15-turn session; measure emission, grounding
      tags, mirroring, footer discipline; ≥80% on §5F ranks 1–4; log in golden-log.
- [ ] **RAG-mode test (MJ4):** overload a test Project until retrieval mode engages;
      canary warning must fire — degradation announced, not silent.
- [ ] **Blocking literature (bet 2):** LLM question-validity + SRS-dropout notes
      filed in evidence/ before friends start.
- [ ] **Item-quality sample:** 20 generated items vs the retrieval-fidelity spec
      (C4): recall-format share, no same-message answers, "answerable only from
      memory" criterion.

## Friend gate (per friend unless noted)
- [ ] Setup from the link alone, unaided, <10 min; self-check passes in message 1 (C2)
- [ ] Total first-contact time measured — setup + starter kit (delta cond. 2)
- [ ] Second session, different day: Claude knows the course, no re-uploads (C1)
- [ ] Ledger still current after one week unsupervised (C1)
- [ ] One unprompted return within 7 days (C3)
- [ ] All four commands reached via natural phrasings incl. Romanian, zero coaching (MJ7)
- [ ] Two real courses, one Project, ledgers uncrossed (MJ8)
- [ ] Exam kit checked against ground truth — past exam, or post-exam retro: "did the
      exam surprise you where the kit deprioritized?" (MJ9)
- [ ] One phone-only quiz; receipt survives the round-trip into a laptop save (B3)
- [ ] One artifact shared into a group chat from a phone, chat-paste variant (MJ11)
- [ ] One-week in-Project chat fraction observed — how many uni chats start in the
      Project? (MJ11/cond. 9)
- [ ] Zero unlabeled ungrounded claims in a sampled exam kit (C6)
- [ ] Usage-log lines written reliably across N sessions (MJ1)
- [ ] One test set includes an image-heavy 100+ page Romanian PDF
- [ ] Training-toggle disclosure seen in onboarding (MJ14)
- [ ] 10-min debrief: "show me your last three chats" + footer-noticing probe (MJ1/cond. 1)

## Destructive drills (owner, on the synthetic fixture)
- [ ] Break-and-repair: corrupt a ledger + mangle an instruction block; a fresh
      Claude session + runbooks alone must recover both (MJ15)

## Pre-registered readings (write down BEFORE looking)
- Bypass rate expectation and the falsification threshold: sustained >60% over 2
  weeks → R-12 tier/pattern redesign, not a pack rewrite (§7)
- Median generation-to-first-attempt gap (C3 delay discipline working?)
- **Forge tolerance (ADR-0016 dissent test):** completion vs "defaults" vs C-bypass
  vs abandonment rate per friend-week. Sustained majority C/abandonment → intensity
  re-tune from data.
- **Memory fidelity drift:** week 2, compare Claude's recalled topic states against
  the friend's own account — does memory hold what the recaps planted?
