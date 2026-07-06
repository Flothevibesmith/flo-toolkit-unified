# Flo's Toolkit — Plugin Install (Claude Code / Desktop / Cowork)

The plugin gives you everything the claude.ai version has, plus: **Claude maintains
your progress files itself** — real files in a `study/` folder you can see — and
deterministic commands that load the same way every time.

**No prerequisites beyond Claude itself.** The session hook is a cross-platform Node
script (ADR-0024), so it runs on Windows, macOS, and Linux without Git for Windows or
any shell — Node ships wherever Claude Code runs. (Skills work regardless of the hook;
the hook only adds the automatic session greeting.)

> **Until the repo is published on GitHub**, replace
> `floreanandrei/flo-toolkit` below with the local folder path of the repo (or the
> unzipped download): `/plugin marketplace add C:\path\to\flo-toolkit`.

## Option A0 — claude.ai in the browser (no install app needed)
claude.ai now has an in-app **Directory**. In claude.ai: open the **Directory →
Plugins → Add marketplace → Add from a repository**, type `floreanandrei/flo-toolkit`
(if it says "couldn't load the repository list", just type `owner/repo` and continue),
then click **+** on **flo-toolkit** to add it. Its skills become available account-wide
— then open/create a studies folder and say **set up my studies**. (Mobile shows
Connectors only; add the plugin on web/desktop and it follows you to mobile.)
*Note: claude.ai has no hooks, so the skills run but the automatic session greeting
doesn't — every skill still works fully when called.*

## Option A — Claude Desktop app
1. Install the Claude Desktop app and open the **Code** tab.
2. In the prompt box, type: `/plugin marketplace add floreanandrei/flo-toolkit`
   (one-time — this is Claude's trust gate; there's deliberately no shortcut).
3. Then type: `/plugin install flo-toolkit@flo-toolkit` — if it asks for a scope,
   pick **user** (available everywhere, once, forever). You can also click **+** in
   the prompt box → **Plugins** to browse what's installed. Can't find Plugins?
   Type `/plugin` in the prompt box.
4. Create a folder somewhere sensible (e.g., `Documents/Studies`), open it in the
   Code tab, and type: **set up my studies**.
5. Verify: type **check my setup** — you want exactly
   "**Flo's Toolkit v1.1 (plugin) — setup OK**". Any other verdict → it tells you
   what's missing and how to fix it.

## Option B — terminal (Claude Code)
1. Open a terminal in your studies folder and start `claude`.
2. Type: `/plugin marketplace add floreanandrei/flo-toolkit`
3. Type: `/plugin install flo-toolkit@flo-toolkit`
4. Say **set up my studies**, then verify with **check my setup**.

## Cowork (Desktop's agent mode)
Cowork's plugin support isn't officially documented, so test it once — install via
Option A first, then point a Cowork session at your Studies folder and run the
**two-part check**:
1. Did it greet you with your courses/exam unprompted? → the session hook runs:
   everything works, including the always-on coaching between commands.
2. No greeting, but **check my setup** answers with the exact toolkit string? →
   skills work fully when called. What you lose without the hook: the automatic
   session greeting, ambient coaching between commands, and the footer — the five
   jobs, PromptForge, quizzes, and automatic progress files all still work.
3. Neither? → use the Code tab (same folder, same files), or paste the claude.ai
   instruction pack ([product/novice/instruction-pack.md](../novice/instruction-pack.md))
   into the Cowork conversation as a fallback.

Either way your `study/` folder is the single source of truth — all surfaces read
and write the same files, and a claude.ai "export my progress" file drops straight
into it.

## How it's different from the claude.ai version
- **Progress is real files** — `study/ledger-<course>.md` per course, plus decks
  and plans in `study/<course>/`. Claude updates them itself after every quiz and
  exam kit. Readable, portable, yours.
- **Deterministic commands** — installed skills, not pasted prose.
- **Session awareness** (when the session hook runs) — opening a chat in your
  studies folder greets you with where you left off and what's due.

Commands, same as everywhere: **set up my studies** · **make my exam kit** ·
**quiz me** · **read this for me** · **explain this to me** · **review my draft** ·
**export my progress** · **is it working?**
