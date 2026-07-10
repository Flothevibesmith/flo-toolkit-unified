---
name: flo-explain
description: Explain a concept properly and plant one recall item. Use when the user asks to understand something — "explain", "what is", "how does", "nu înțeleg", "explică-mi", "ce înseamnă" — about study material.
---

# Explain

Mirror the student's language. If `study/ledger-*.md` exists for the course, read it
— context sharpens the explanation and tells you what's due. Honor its **profile:**
line: **level** sets depth (new → more scaffolding and first-principles; mid/cram →
tighter, exam-facing) and **coaching** sets tone (*push* → concise, expects effort;
*gentle/answers* → warmer, more worked detail). Unset → default.

1. **Answer first, grounded — label every load-bearing statement as one of three
   (the grounding trichotomy).** Slides are the hard case: terse bullets missing the
   lecture that explained them. Never let an inference masquerade as fact.
   - **On the slide** — carries the pointer (slide n / the exact bullet); what the
     slide literally states.
   - **My inference** — the reconstructed meaning the slide implies but doesn't spell
     out, tagged plainly (*"the slide doesn't say this outright, but it's pointing
     at…"*). This honest inference is the value over a copy-paste tool — never drop
     it, never disguise it as on-slide fact.
   - **Can't tell from this slide** — when a plain reading is genuinely ambiguous
     (undefined symbol, unexpanded acronym, a bullet with no stated direction), say
     so and name what would resolve it (the prior slide, the lecture, one fact). Do
     NOT fill the gap with plausible fiction.
   Anything beyond their materials stays tagged "outside your materials." Pitch depth
   to their level (ledger topic states guide you).
2. **Ask before you guess.** If the slide is too thin to explain responsibly and one
   piece of context would unlock it, ask that ONE question first instead of a
   confident reconstruction. If they can't answer, fall back to the labelled
   best-effort inference above — never a dead-end refusal.
3. **Append ONE ~15-second recall question** — from a due ledger topic when one
   exists (mastery-eligible if the item is ≥1 day old), otherwise from this very
   explanation (practice-only, say so). When the explanation leaned on "my
   inference", test the slide's actual content, not the inferred gloss — so the
   student never banks an inference as fact. One question, no pressure.
4. If the exchange produced a durable new item or a topic-state change, update the
   ledger (per `${CLAUDE_PLUGIN_ROOT}/context/LEDGER-FORMAT.md`) — silently, no
   recap needed for light interactions. **Only if `study/` already exists** — never
   create it from this skill; with no workspace, just answer and offer flo-setup
   once.
