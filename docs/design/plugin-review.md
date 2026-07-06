# M2 Adversarial Review — Committee Closing Report

**Panel:** platform-schema, hook-crossplatform, pack-consistency, cowork-ux · **Date:** 2026-07-02

## 1. Verdict: FIX FIRST

The design is sound; the shipping artifact is not installable and the always-on layer has two independent failure modes that hit the primary audience (Windows students, multi-course students) on day one. Blocking items before gate:

- **B1.** Repo unpublished — every install path 404s (F1)
- **B2.** No `.gitattributes` — CRLF will break the hook script on first Windows clone (F2)
- **B3.** SessionStart payload exceeds the 10,000-char cap at 2+ courses — flagship feature silently degrades for the heaviest users (F3)
- **B4.** flo-check emits "setup OK" unconditionally — the gate test itself is a tautology (F8)
- **B5.** INSTALL Option A (Desktop GUI) describes a flow the docs don't support (F4)

## 2. Convergence note

Independent agreement across lenses (no shared context):

- **Repo does not exist** — platform-schema + cowork-ux, both critical.
- **v1.0/v1.1 version drift in LEDGER-FORMAT templates** — flagged by **all four lenses**; pack-consistency showed it makes flo-check validation unsatisfiable. Promoted to major.
- **Hook dies silently on Windows without Git Bash** — platform-schema, hook-crossplatform, cowork-ux.
- **Canary is structurally excluded from the hook's injected excerpt** — hook-crossplatform + pack-consistency, independently concluding it trains the model to ignore the tripwire.
- **`2>/dev/null` masks a missing standing-rules.md** — hook-crossplatform + cowork-ux.
- **Always-on behaviors exist only in the hook and vanish on hook-less surfaces** — pack-consistency + cowork-ux.
- **Phantom `/examkit` command** — platform-schema + cowork-ux.

Two lenses voted flawed, two sound-with-changes; the split maps exactly to whether the lens touched the install/hook path (broken) or the content (fixable).

## 3. Findings (deduplicated, ranked)

### Critical

**F1. Nothing is installable.** `floreanandrei/flo-toolkit` returns 404; local repo has zero commits and no remote; `plugin.json` homepage is the same dead link. *(platform-schema, cowork-ux)*
**Fix:** Commit and push as public `floreanandrei/flo-toolkit` (layout is already correct). Until published, docs must use `/plugin marketplace add <local-path>`. Add INSTALL fallback: ZIP download + local-path add.

**F2. CRLF time bomb.** No `.gitattributes`; authoring machine has `core.autocrlf=true`; a Windows clone checks out `session-start.sh` with CRLF → bash syntax error, and `exit 0\r` feeds error noise into unrelated projects. *(hook-crossplatform)*
**Fix:** Before first commit, add `.gitattributes` at repo root: `*.sh text eol=lf`.

**F3. SessionStart stdout blows the 10,000-char cap at 2+ courses.** Whole injection (standing rules included) degrades to a file-path preview for exactly the heaviest users. *(hook-crossplatform)*
**Fix:** In `plugin/scripts/session-start.sh`, print per-ledger only header + active-topics table + unsaved deltas (widen awk terminator per F20); add total-budget guard (`head -c 9000` + "run flo-check for full state" tail line).

### Major

**F4. Desktop Option A install flow is not the documented UI.** No GUI path exists for adding a third-party marketplace; "user scope" chooser unverified. *(platform-schema, cowork-ux)*
**Fix:** Rewrite `product/power/INSTALL.md` Option A: type `/plugin marketplace add floreanandrei/flo-toolkit` in the Code-tab prompt box first, then + → Plugins → Add plugin. Phrase scope conditionally ("if it asks, pick user"). Add recovery line: "Can't find Plugins? Type /plugin in the prompt box."

**F5. `version` declared in three places** (plugin.json, marketplace entry, marketplace metadata) — doc-warned anti-pattern; also pins updates during active development. *(platform-schema)*
**Fix:** Delete `version` from both spots in `.claude-plugin/marketplace.json`; plugin.json is the single authority.

**F6. No SessionStart matcher** — full payload re-injected on every resume and every auto-compact (compaction feedback loop). *(hook-crossplatform)*
**Fix:** Add `"matcher": "startup|clear|compact"` to `plugin/hooks/hooks.json`.

**F7. Hook resolves `study/` against volatile cwd**, not the project root — hot state vanishes exactly at compact time. *(hook-crossplatform)*
**Fix:** First line of `session-start.sh` after shebang: `cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0`.

**F8. flo-check "setup OK" is unconditional** and has no hook-status line — broken installs pass the INSTALL verification. *(cowork-ux)*
**Fix:** In `flo-check/SKILL.md`, three conditional verdicts (setup OK / plugin OK no study folder / partial — always-on rules not loaded) + 5th diagnostic line "always-on rules: loaded/not loaded". Update INSTALL step 4 to match.

**F9. `2>/dev/null` masks missing standing-rules / unset CLAUDE_PLUGIN_ROOT** — sessions run rule-less with zero signal. *(hook-crossplatform, cowork-ux)*
**Fix:** In `session-start.sh`, guard: if standing-rules.md unreadable, echo a `[flo-toolkit] WARNING … reinstall` line; drop the `2>/dev/null`.

**F10. Mastery rule silently tightened.** Plugin says "3 **consecutive** successful attempts"; canonical pack says "3 successful attempts" — cross-tier ledger divergence. *(pack-consistency)*
**Fix:** Delete "consecutive" in `plugin/skills/flo-quiz/SKILL.md:26` (or change both tiers deliberately + version bump — they may not disagree).

**F11. SHAREABLE vs PERSONAL rules absent from the plugin** — "share my progress" pastes the PERSONAL ledger including error/calibration logs. *(pack-consistency)*
**Fix:** Add the sharing paragraph to `plugin/context/standing-rules.md`; add "Personal — share deliberately" to flo-check's export section.

**F12. v1.0/v1.1 version drift.** LEDGER-FORMAT templates (lines 27, 71, 81) stamp v1.0 under a v1.1 spec/plugin; flo-check validation cannot pass both. *(all four lenses)*
**Fix:** Bump the three template strings to v1.1 in `product/formats/LEDGER-FORMAT.md` AND `plugin/context/LEDGER-FORMAT.md` in the same commit (copies must stay byte-identical).

**F13. Canary defeated.** The hook's awk cuts the file above `## Archive`, so the required CANARY line never appears in injected context; plugin also lacks the pre-read canary check. *(hook-crossplatform, pack-consistency)*
**Fix:** Add to standing-rules grounding: read the file and confirm the final CANARY before any ledger task; hook excerpt is context only. End each hook excerpt with "EXCERPT — read the file before writing to it." Scope the canary wording in LEDGER-FORMAT to full-file operations.

**F14. plugin LEDGER-FORMAT carries novice-tier prose** ("lives in Project knowledge", receipts-when-memory-unavailable, claude.ai deck footer) that invites the plugin tier to stop auto-maintaining the ledger. *(pack-consistency, cowork-ux)*
**Fix:** Make the canonical file tier-neutral (three edits per pack-consistency finding 5), re-copy to plugin.

**F15. INSTALL Cowork section overclaims** ("identifies ⇒ everything works") and never lists what dies with the hook; fallback instruction pack unlinked. *(cowork-ux)*
**Fix:** Two-part test (unprompted greeting = hook; exact flo-check string = skills); explicit lost-features list; link the pack path.

**F16. flo-ingest — the quota-heaviest flow — has no cost-estimate step** (rule is hook-only). *(cowork-ux, pack-consistency)*
**Fix:** Add estimate/lighter-version line before flo-ingest step 2; qualify INSTALL's "Session awareness" with "(when the session hook runs)".

**F17. flo-feedback and flo-explain write into `study/` with no existence guard** — creates ledgers in random folders, violating ADR-0019. *(cowork-ux)*
**Fix:** One guard line each: no study/ → skip filing, offer flo-setup.

**F18. Wrong-folder split-brain.** Opening the parent of study/ (or study/ itself) → silent hook, then flo-setup creates a duplicate workspace. *(cowork-ux)*
**Fix:** flo-setup pre-create check for `../study`, `*/study`, cwd == study, or stray `ledger-*.md`; point the student at the existing workspace instead of creating.

**F19. Artifact-visible standing rules (version stamp, footer) exist only in the hook.** *(pack-consistency, cowork-ux)*
**Fix:** Duplicate the stamp + footer lines into flo-quiz, flo-examkit, flo-ingest, flo-check; document the coaching lane as hook-only in INSTALL.

### Minor

**F20.** awk terminator keys only on `## Archive` — widen to `## (Archive|Usage log|Session history|Error log|Calibration log)`; make `## Archive` required-even-if-empty in the spec. *(hook)*
**F21.** No hook timeout (600s default; OneDrive hangs) — add `"timeout": 10` in hooks.json. *(hook)*
**F22.** Windows-without-Git-Bash: hook silently dead under PowerShell fallback — add Git for Windows prerequisite to INSTALL; pairs with F8's hook-status line. Also switch hooks.json to exec form (`"command": "bash", "args": [...]`) per plugins-reference guidance. *(platform, hook, cowork)*
**F23.** Hook stdout references LEDGER-FORMAT.md by unresolvable relative path — echo `${CLAUDE_PLUGIN_ROOT}/context/LEDGER-FORMAT.md` from the script. *(platform)*
**F24.** Phantom `/examkit` in flo-quiz/SKILL.md:28 — replace with "the flo-examkit skill (say 'make my exam kit')". *(platform, cowork)*
**F25.** marketplace.json uses legacy `metadata` placement — move description top-level. *(platform)*
**F26.** No sync mechanism for the duplicated LEDGER-FORMAT — add diff check or edit-there-then-recopy header comment in both copies. *(pack)*
**F27.** Dropped routing phrases: 'citește asta' absent from entire plugin; 'funcționează?'/any-language missing from flo-check; several EN/RO phrases missing from standing-rules — restore (~15 words). *(pack)*
**F28.** Cost rule loses "keep outputs concise; suggest a fresh session per big job" — append to standing-rules. *(pack)*
**F29.** 'what do you remember?' undefined on plugin — one line in standing-rules or flo-check. *(pack)*
**F30.** Exam-kit chunks lack per-chunk PROGRESS RECAP — add to flo-examkit step. *(pack)*
**F31.** Claude-plan question only in flo-setup; add to flo-examkit starter kit "if the ledger header lacks one". *(pack)*
**F32.** INSTALL Option B shows slash commands before saying to start `claude` — number the steps. *(cowork)*
**F33.** flo-forge description has no concrete trigger phrases — add vague-ask examples (EN + RO). *(cowork)*
**F34.** INSTALL says "five commands", ships eight — drop the number. *(cowork)*
**F35.** Setup nudge in session-start.sh targets a near-unreachable state — repurpose per F18 or delete. *(cowork)*

## 4. Fix now vs. verify at gate

**Fix in files now:** F1 (publish + doc fallback), F2, F3, F5–F7, F9–F14, F16–F35, and the doc rewrites in F4/F8/F15/F19.

**Verify at gate (live install only):**
- Clean-machine install from the published marketplace (Option A click path and scope prompt on current Desktop build; Option B CLI flow) — F1, F4.
- Fresh Windows clone: `session-start.sh` checks out LF and executes under Git Bash — F2.
- Hook fires and injects on startup/clear/compact but not resume; payload stays under 10K with a realistic 4–6-course workspace — F3, F6.
- Cowork: does the SessionStart hook run at all? flo-check's "always-on rules" line reports correctly — F8, F15.
- Skill triggering: Romanian phrases route; flo-forge fires on vague asks; flo-check enumerates skills — F27, F33.
- Hook-dead machine (no Git Bash): failure is visible via flo-check, not silent — F22.

## 5. Not verifiable from docs

- Whether Cowork executes SessionStart hooks at all (no doc either way; entire degradation story rests on this).
- The current Desktop build's actual Plugins GUI (menu items, scope chooser) — docs describe only "Add plugin".
- Whether a skill can reliably detect "standing rules present in context this session" (F8's proposed diagnostic) — plausible, untested.
- Real ledger sizes vs. the spec's token arithmetic (F3's cap math uses spec maxima, not field data).
- Marketplace version-resolution behavior live (F5) — reasoned from docs only.