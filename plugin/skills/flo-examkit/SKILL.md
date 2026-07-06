---
name: flo-examkit
description: Build a complete exam-prep kit from the student's materials — triaged topic map, full question deck, dated countdown plan. Use when the user says "make my exam kit", "exam kit", "am examen", "pregătește-mă de examen", "help me pass", or names an approaching exam.
---

# Exam kit

Mirror the student's language. Read the course ledger first; no study/ folder →
run flo-setup inline, then continue. FIRST-EVER use → offer the STARTER KIT
instead: 1 course, up to 3 files → mini topic map + 8-item deck + 3-question quiz →
"that's the whole loop — full exam kit next session."

1. **Coverage check first:** compare uploads/`study/<course>/` contents against the
   syllabus or semester map — "syllabus lists N topics; your files cover K —
   missing: … Proceed or add files?"
2. **Estimate:** "~X min, quota-heavy; lighter version available." (Plan is in the
   ledger header.)
3. **Output** (chunk across turns if large; update the ledger after each chunk and
   end each chunk with a short PROGRESS RECAP):
   - **Topic map ranked by exam likelihood**, per-topic evidence tags (frequency |
     syllabus emphasis | past-exam) and confidence labels; if no past exams, banner:
     "ranked from your materials only — your professor may differ." Save to
     `study/<course>/topic-map.md`.
   - **Complete priority-ordered deck**, all covered topics, recall-format items
     with source pointers, quality-passed (no duplicates/hallucinations). Save to
     `study/<course>/deck-exam.md`; file the items into the ledger.
   - **Dated countdown plan** as if-then sessions tied to material ("after Tuesday's
     lecture → 10-min quiz on deck section X"), not rigid timetables. Save to
     `study/<course>/plan.md`; also emit a `.ics` only if you can produce a valid
     file — otherwise the dated list IS the plan.
4. Exam <48h → skip the countdown; emit a triaged cram sequence.
5. Update the ledger (topics, items, `last-updated`, logs) and end with the
   PROGRESS RECAP (header stamped "Flo's Toolkit v1.1 (plugin)") + the one-line
   footer. If the ledger header lacks a plan value, ask which Claude plan they're
   on and record it.
