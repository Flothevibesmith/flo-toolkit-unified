#!/usr/bin/env node
// Flo's Toolkit — SessionStart hook (cross-platform Node, ADR-0024).
// Injects standing rules + a bounded ledger excerpt when (and only when) the
// project folder is a study workspace. Silent everywhere else (ADR-0019).
// Skills do NOT depend on this hook — it is an always-on enhancement only.
// Node exec-form runs identically on Windows (PowerShell/Git Bash), macOS, Linux;
// no CRLF exposure (B2), no shell-availability assumption. Any error exits 0 so a
// broken hook never blocks a session. Preserves the bash hook's behavior exactly:
// anchor to project root (F7), study/-gated, standing-rules-or-warning (F9),
// header+topics+unsaved-deltas excerpt only (F3/F20), hard 9000-char budget (F3).
'use strict';
const fs = require('fs');
const path = require('path');

function safe(fn, fb) { try { return fn(); } catch { return fb; } }

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || path.join(__dirname, '..');
const studyDir = path.join(root, 'study');

// Study-workspace gate: silent outside a study folder.
if (!safe(() => fs.statSync(studyDir).isDirectory(), false)) process.exit(0);

const parts = [];

// Standing rules — or a visible warning if the install is broken (never fail silently).
const rulesPath = path.join(pluginRoot, 'context', 'standing-rules.md');
const rules = safe(() => fs.readFileSync(rulesPath, 'utf8'), null);
parts.push(rules != null ? rules
  : '[flo-toolkit] WARNING: standing-rules.md not readable — the plugin install may be broken. Run flo-check; reinstall if needed.');

// Ledger excerpts: header + Topics + Unsaved deltas only; stop before item-level
// detail and all append-only streams to stay far under the 10K SessionStart cap.
const ledgers = safe(() => fs.readdirSync(studyDir).filter((f) => /^ledger-.*\.md$/.test(f)), []);
for (const f of ledgers.sort()) {
  const full = safe(() => fs.readFileSync(path.join(studyDir, f), 'utf8'), '');
  if (!full) continue;
  const lines = full.split('\n');
  const excerpt = [];
  let skip = false;
  for (const line of lines) {
    if (/^## Items/.test(line)) skip = true;
    else if (/^## Unsaved deltas/.test(line)) skip = false;
    else if (/^## (Archive|Usage log|Session history|Error log|Calibration log)/.test(line)) break;
    if (!skip) excerpt.push(line);
  }
  parts.push('---- study/' + f + ' (EXCERPT ONLY — read the full file before writing to it) ----\n' + excerpt.join('\n'));
}

let out = parts.join('\n\n');
if (out.length > 9000) out = out.slice(0, 9000); // hard budget (F3)
out += '\n\nLedger schema: ' + rulesPath.replace(/standing-rules\.md$/, 'LEDGER-FORMAT.md') + ' — for full state, run flo-check.';

process.stdout.write(out);
process.exit(0);
