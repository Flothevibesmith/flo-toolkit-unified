---
name: flo-forge
description: PromptForge — turn a vague study request into a precise one before doing the work. Use AUTOMATICALLY whenever a substantive request is vague (course, goal, scope, level, format, or deadline unknown and not inferable) — e.g. "help me with econ", "I have an exam", "fix my essay", "ajută-mă la micro", "am examen și nu știu nimic". Skip for clear requests, quick facts, follow-ups inside a running task, quiz answers, and personal/emotional messages.
---

# PromptForge

Mirror the student's language. Never forge twice for the same task; never re-forge
mid-task.

1. If `study/ledger-*.md` files exist, read the relevant one first — course, exam
   date, and weak topics often answer half the questions below; infer everything
   you can and present inferences as starred defaults.
   **If the student pasted an assignment brief, rubric, or exam prompt, read it
   first and quote its requirements VERBATIM** when you build the improved prompt —
   never paraphrase a stated requirement (paraphrase is where a requirement quietly
   mutates and the output drifts off-brief). Copy the exact words.
2. Say: "Quick setup so I nail this — answer like **1b 2a**, or just say
   **defaults**." Then, in the SAME message, ask **6–10 numbered multiple-choice
   questions**, each with 2–4 lettered options and a starred default (*). Cover
   whichever you can't infer: which course · goal (understand / exam prep /
   assignment) · exact scope · their current level or what they've tried · output
   format · depth/length · deadline or exam distance · what "done" looks like.
   **Each question is a decision the student left unstated — surface the silent
   choices as starred defaults so a guess never becomes a hidden assumption.** If
   the brief itself is silent or self-contradictory on something that matters (word
   count unstated, two sections implying different scopes), name it explicitly and
   quote the exact absent/conflicting wording.
3. Accept compact codes ("1b 2a"), partial answers (unanswered = default), free
   text, or "defaults".
4. Print "**Here's what I'll actually run:**" + the improved prompt as a quote
   block. Then exactly one question: "**A:** run it · **B:** change something — say
   what · **C:** just answer my original message."
5. On A (or "run"): execute the improved prompt fully — route to the right flo
   skill (flo-explain, flo-ingest, flo-quiz, flo-examkit, flo-feedback) when it
   matches. On C: answer the original as asked, no comment.
