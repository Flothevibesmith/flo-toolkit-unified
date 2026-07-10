# M1 gate — disk-checkable results, 2026-07-07

Run of every [m1-gate-checklist.md](design/m1-gate-checklist.md) item that can be
decided from the repo on disk (no live claude.ai / Cowork / friend sessions). M1 =
the claude.ai instruction-pack tier. Runtime and owner-gated items are listed at the
bottom as **N/A (not disk-checkable)** so the gate's coverage is honest.

Commands were run this session; outputs quoted. A failed item is a finding, not an
embarrassment (checklist §head).

## 1. Static artifact checks (instruction-pack tier)

| # | Gate item | Check run | Result |
|---|-----------|-----------|--------|
| S1 | Instruction-pack within character budget (≤8,000; decision-log records 7,997/8,000) | `wc -m product/novice/instruction-pack.md` → **7997** | **PASS** (7,997 ≤ 8,000; matches decision-log (g)) |
| S2 | LEDGER-FORMAT two copies byte-identical (F26) | `diff product/formats/LEDGER-FORMAT.md plugin/context/LEDGER-FORMAT.md` → no diff, exit 0 | **PASS** |
| S3 | SETUP.md embedded instruction copy-block byte-identical to `instruction-pack.md` (F26) | Extracted the 4-backtick block; normalized-newline compare → identical | **PASS** |
| S4 | SETUP.md embedded ledger copy-block byte-identical to `LEDGER-FORMAT.md` (F26) | Same method → identical | **PASS** |
| S5 | Required instruction-pack sections present | Read pack: Memory · PromptForge · Grounding · Quizzing · Every-message pipeline · The five jobs · Footer · Sharing & backup · Cost awareness · diagnostics (check my setup / is it working) | **PASS** (all present) |
| S6 | Version stamp consistent = v1.1 | pack, both SETUP blocks, LEDGER-FORMAT, standing-rules all "v1.1"; `plugin.json` version `1.1.0`; marketplace names `flo-toolkit@flo-toolkit` | **PASS** |
| S7 | Diagnostics string exact & tier-correct | pack: `"Flo's Toolkit v1.1 — setup OK"`; plugin standing-rules/flo-check: `"Flo's Toolkit v1.1 (plugin) — setup OK"` | **PASS** (the `(plugin)` suffix is an intended tier diff, not drift) |
| S8 | Ledger CANARY present verbatim | Present in both LEDGER-FORMAT copies and the SETUP ledger block | **PASS** |
| S9 | Install docs point at the real repo | `README.md`, `product/power/INSTALL.md`, `plugin.json` homepage, `marketplace.json` all → `Flothevibesmith/flo-toolkit-unified` / `flo-toolkit@flo-toolkit` | **PASS** (structural; remote existence not verified — no network check of GitHub done) |
| S10 | Plugin manifests well-formed | `.claude-plugin/marketplace.json` + `plugin/.claude-plugin/plugin.json` parse; have name/source/version/author | **PASS** (structural; `claude plugin validate` NOT run — no Claude CLI in this environment) |
| S11 | Skill set matches documented count | `plugin/skills/` holds **9** folders (flo-advisor, flo-check, flo-examkit, flo-explain, flo-feedback, flo-forge, flo-ingest, flo-quiz, flo-setup); checklist + decision-log say "**8** skills" | **FLAG — see Findings** |

## 2. SessionStart hook — structural behavior (executed with `node`)

The hook (`plugin/scripts/session-start.js`) is disk-executable, so its paths were
run directly against a synthetic project dir. This is the memory-persistence
**read** path (see the separate persistence note for the write-then-read simulation).

| # | Behavior | Check | Result |
|---|----------|-------|--------|
| H1 | Silent outside a study workspace (ADR-0019) | No `study/` dir → output length 0, exit 0 | **PASS** |
| H2 | Inside `study/`: injects standing rules + ledger excerpt | Emits standing-rules.md + `---- study/ledger-micro.md (EXCERPT ONLY …)` | **PASS** |
| H3 | Excerpt bounded to header + Topics + Unsaved deltas | `## Items` and all append-only streams (Archive/Usage/Session/Error/Calibration) correctly excluded | **PASS** |
| H4 | Broken install fails visibly, never blocks | Unreadable `standing-rules.md` → `[flo-toolkit] WARNING … install may be broken`, exit 0 | **PASS** |
| H5 | Hook filename regex matches skill-written ledger | `/^ledger-.*\.md$/` matches flo-setup's `ledger-<slug>.md` | **PASS** |
| H6 | 9,000-char hard budget guard present (F3) | Slice at 9,000 in source; not exceeded by fixture | **PASS** (guard present; large-ledger overflow not stress-tested) |

## 3. N/A — not decidable from disk (runtime / owner / friend)

Listed so the gate's real coverage is not overstated. These remain **open**:
local install test · hook live on Windows · hook live on macOS · file-write loop
(flo-setup→quiz live) · **COWORK test** (owner) · cross-surface round-trip ·
publish test · forge dry-run · ten-minute reality test · `.ics` capability check ·
Cowork write-loop probe · adherence test · RAG-mode canary test · every friend-gate
row · destructive break-and-repair drill · all pre-registered reading measurements.
The **memory-persistence build-time test** and the **R-11 reading list** are handled
as separate deliverables this session (structural verification and a cited docs file,
respectively).

## 4. Findings

- **F-M1a (S11 — skill count drift, medium).** The gate checklist ("all 8 skills
  appear") and decision-log (g) both say **8** skills, but the plugin now ships
  **9** — `flo-advisor` was added in the 2026-07-06 merge (ADR-0020, the honest-
  advisor donor) after the "8 skills" line was written. This is a real
  stale-count inconsistency, but it is **not trivially fixable**: the correct fix
  depends on owner intent — either bump the gate/decision-log to "9 skills
  (incl. flo-advisor)", or decide flo-advisor is out of the M1/M2 gate scope. **Not
  edited** per the task's "only fix trivial inconsistencies" rule; flagged for the
  owner. Everything else about flo-advisor is internally consistent (valid SKILL.md,
  `study/`-guarded writes).

No other disk-checkable gate item failed.
