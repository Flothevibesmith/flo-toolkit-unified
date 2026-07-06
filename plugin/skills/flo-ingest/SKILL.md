---
name: flo-ingest
description: Turn course materials (PDFs, slides, notes, books, articles) into grounded, exam-prioritized notes plus recall items filed into the course ledger. Use when the user says "read this for me", "summarize", "citește asta", "rezumă", "fă-mi notițe", or drops course files asking for notes.
---

# Ingest

Mirror the student's language. Confirm the course before filing anything ("This
looks like [course] — right?"). Read the course ledger first if it exists; no
study/ folder → offer flo-setup.

A plain summary is a LOW-value study artifact — retrieval practice is what makes
material stick. So the real deliverables here are the **recall items and the
exam-prioritized map**; the notes are the scaffold to them, not the point.

1. **Sanity-check inputs:** unreadable, duplicate, or off-syllabus files → say so
   before working. State a rough time/quota estimate for large inputs (plan in the
   ledger header, default pro); offer the lighter version.
2. **Long materials (books, long articles, big decks) — never one-shot them.** If
   the material plausibly exceeds a clean single pass:
   - Process in reading-order chunks (chapter / ~15–20 slides / section at a time).
   - Carry a **compact running outline** forward between chunks — one line per
     covered section: its page-anchor + a one-clause gist. The outline (not the full
     prior text) is what survives into the next chunk, so late context isn't lost.
     On the plugin tier, persist it to `study/<course>/ingest-<scope>.outline.md`
     with a `covered: true|false` flag per section — flip to `true` only when that
     chunk's notes+anchors are actually written, never on optimism.
   - Synthesize final notes from the outline plus re-opened anchors, not from memory
     of chunk 1. State coverage honestly ("Covered pp. 1–120; point me at Ch. 7 for
     depth") — never imply full coverage of a doc you only partly read.
3. **Triage before you summarize.** Rank topics by the evidence the materials expose
   — `(frequency across materials | syllabus/objective emphasis | past-exam signal)`,
   the topic-map tags in `${CLAUDE_PLUGIN_ROOT}/context/LEDGER-FORMAT.md`. Spend depth
   proportional to rank: high-value topics get worked notes, low-value gets a
   one-line "mentioned, low emphasis". Banner it "ranked from your materials only —
   your professor may differ". This prioritized map is the thing the student can't
   build themselves.
4. **Ground every claim with a RESOLVABLE anchor, and label inference.** Each claim's
   pointer names the smallest locator the source exposes — slide number, PDF page,
   §heading, figure/table label; if the source has no locators, a short verbatim
   quote (3–6 words) the student can Ctrl-F. A pointer that can't be resolved back to
   a spot is not a citation. Three states, never blurred: **on-page (anchored) / my
   inference ("(my read, not stated outright)") / outside your materials (tagged)**.
5. **Verify against the SOURCE, not against yourself.** Before sending, check each
   date/definition/formula against its anchored span (an external check — re-reading
   your own text proves nothing). Fix or drop anything that doesn't hold.
6. **Recall items are the deliverable.** Emit the natural number of recall-format
   items the high-value topics demand (quality-passed, capped by the deck format) —
   at least one per high-triage topic, not an arbitrary "8". Quality gate before
   filing: every item answerable from memory alone · every answer traceable to an
   `src:` anchor · no item asserts a fact absent from its cited span · no duplicate
   cue. File only on pass.
7. **Update the files yourself:** append items and topic updates to
   `study/ledger-<course>.md` (schema + caps per the format doc); save the deck to
   `study/<course>/deck-<scope>.md`; bump `last-updated`.
8. **Close the loop, concretely:** ask the student to explain one key idea back in
   two sentences; name one gap before praising. The closing recap names the
   weak/high-value topics **by name** and what's due — not generic praise. Stamp
   saved artifacts "Flo's Toolkit v1.1 (plugin)"; close with the one-line footer
   ("▸ [course] · exam in N days · M due · say 'quiz me' (5 min)").
