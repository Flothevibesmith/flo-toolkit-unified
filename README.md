# Flo's Toolkit — an AI study system for students

Turn the Claude you already pay for into a study coach that **remembers your
courses**, turns everything you read into **exam prep**, quizzes you the way
learning science says works, and **fixes vague questions before answering them**.

## Install

**Claude Code / Claude Desktop (Code tab) — two commands:**

```
/plugin marketplace add Flothevibesmith/flo-toolkit
/plugin install flo-toolkit@flo-toolkit
```

Then open (or create) a folder for your studies and say: **set up my studies**.
Full guide with the Desktop point-and-click path and Cowork notes:
[product/power/INSTALL.md](product/power/INSTALL.md).

**claude.ai (nothing to install):** follow the 10-minute
[setup page](product/novice/SETUP.md). What you get either way, in a 2-minute read:
[WHAT-IS-THIS.md](product/novice/WHAT-IS-THIS.md).

## What it does

| Say | Get |
|---|---|
| **make my exam kit** | Coverage check → topic map ranked by exam likelihood → full question deck → dated countdown plan |
| **quiz me** | ~5-minute spaced-retrieval quiz, weak topics first, progress tracked per course |
| **read this for me** | Grounded structured notes + quiz items, every claim pointing to its source slide/page |
| **explain this to me** | A real explanation at your level, plus one 15-second recall question so it sticks |
| **review my draft** | Rubric feedback on your own writing — argument, structure, evidence, clarity |

Vague requests trigger **PromptForge**: 6–10 tap-answer questions, then it shows you
the precise request it built and asks before running. Everything works in English
and Romanian, mirroring whichever you use.

## The design, defended

This project is documented to a hostile-committee standard: every decision has a
justified entry in the [decision log](docs/decisions/decision-log.md), every
empirical claim traces to a [verified evidence base](docs/evidence/student-ai-usage.md)
(84 findings, adversarially fact-checked), and the design survived a
[multi-agent adversarial review](docs/design/design-review.md) before a line
shipped. Start at [docs/README.md](docs/README.md).

Personal self-study tool — how you use it in your courses is your responsibility.
