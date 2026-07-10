# Memory-persistence verification (plugin tier) — 2026-07-07

**Scope.** Structural verification of the plugin-tier persistence mechanism
(ADR-0017/ADR-0024). This is **not** a live two-session claude.ai memory test — that
one (fresh Project, memory on, day-1 vs day-2 recall) is owner/runtime and remains
open on the gate. What is verified here is the *file-backed* persistence the plugin
tier uses: skills write per-course ledgers into `study/`, and the SessionStart hook
reads them back into a new session's context.

## The persistence contract (as designed)

| Component | Role | Path it uses |
|-----------|------|--------------|
| `flo-setup` SKILL | creates workspace + ledger | writes `study/ledger-<course-slug>.md` (step 3) |
| `flo-quiz` / other skills | maintain state | read `study/ledger-<course>.md`, then edit it after the session |
| `standing-rules.md` | always-on rule | "Per-course ledgers live in `study/ledger-<course>.md`" |
| `session-start.js` hook | re-injects state each session | reads `study/`, filters `/^ledger-.*\.md$/`, injects header+Topics+Unsaved-deltas excerpt |

The three writers and the one reader all name the **same location and pattern**
(`study/ledger-<slug>.md`), so the reader keys on what the writers produce. The hook
anchors to `CLAUDE_PROJECT_DIR || cwd` (F7); skills anchor to `study/` in the project
folder. Consistent.

## What I did

1. **Read the contract** across `flo-setup`, `flo-quiz`, `flo-check`,
   `standing-rules.md`, `LEDGER-FORMAT.md`, and `session-start.js` — confirmed writer
   paths == reader path and filename pattern == hook regex.
2. **Simulated a write.** Authored `study/ledger-micro.md` in a synthetic project
   dir, formatted exactly as flo-quiz would leave it after a session (header with
   plan/exam/last-updated, Topics active, Items active, Unsaved deltas, Archive, all
   four append-only streams, CANARY final line) — 1,185 bytes.
3. **Executed a fresh read.** Ran `session-start.js` with `CLAUDE_PROJECT_DIR` set to
   that dir (simulating a new session opening in the workspace).

## What the read produced (observed)

- Injected `standing-rules.md` in full, then
  `---- study/ledger-micro.md (EXCERPT ONLY …) ----` followed by the ledger
  **header + `## Topics (active)` + `## Unsaved deltas`**.
- **Correctly excluded** `## Items (active)` and every append-only stream
  (`## Archive`, `## Usage log`, `## Session history`, `## Error log`,
  `## Calibration log`) — matching the excerpt bound in the source (skip on `## Items`,
  resume on `## Unsaved deltas`, hard break on `## Archive`).
- Appended the schema pointer line to `LEDGER-FORMAT.md`. Exit 0.

Negative paths also executed: no `study/` dir → **empty output, exit 0** (silent);
unreadable `standing-rules.md` → **visible `[flo-toolkit] WARNING …` and exit 0**
(never blocks a session).

## What this PROVES

- The hook reads state from exactly where the skills write it; the filename pattern
  the skills emit is matched by the hook regex; the workspace gate, excerpt bounding,
  budget guard, and fail-visible behavior all execute as specified.
- A ledger written in the documented format **survives into a new session's context**
  as a bounded, correctly-scoped excerpt — i.e. the file-backed persistence carrier
  works structurally, on Windows + Node, end to end for the read half.

## What this does NOT prove

- **Not** that an LLM actually writes a well-formed ledger — the write step was
  authored by me by hand as the skill *would*; skill write-fidelity (correct fields,
  respecting stream caps/rollups, CANARY discipline) is an LLM-behavior test, not run
  here.
- **Not** the claude.ai novice-tier persistence, which rides **project memory**, not
  files (ADR-0017). The load-bearing day-1→day-2 memory-recall test with memory as
  the only carrier, plus the memory-OFF fallback (30-second rebuild + export), is
  still owner/runtime and **remains open** on the gate.
- **Not** hook firing inside a real Claude Code / Cowork session (only the script was
  executed directly), and **not** the large-ledger overflow behavior against the
  9,000-char guard.
