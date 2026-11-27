<p align="center">
  <strong>English</strong> · <a href="README.vi.md">Tiếng Việt</a>
</p>

<h1 align="center">Agent Engineering</h1>

Eleven engineering skills and a shared executable CLI for building verification loops, improving agent-facing codebases, and deciding when to expand autonomy. The workflows draw on three public Lauren Tan videos. This independent implementation links back to [Lauren's pstack project](https://github.com/cursor/plugins/tree/main/pstack).

[Install](#install) · [Choose a skill](#choose-a-skill) · [CLI](#run-the-tools) · [Repository layout](docs/layout.md) · [Contributing](CONTRIBUTING.md)

## Install

Choose the host you use. All four hosts load the same skills. English is the default, and requests in Vietnamese use the corresponding Vietnamese instructions.

| Host | Install | Start |
|---|---|---|
| Codex | `codex plugin marketplace add THanhPhan356/agent-engineering`, then `codex plugin add agent-engineering@agent-engineering-marketplace` | `$engineering-workflow` |
| Claude Code | `claude plugin marketplace add THanhPhan356/agent-engineering`, then `claude plugin install agent-engineering@agent-engineering-marketplace` | `/agent-engineering:engineering-workflow` |
| Google Antigravity | `agy plugin install https://github.com/THanhPhan356/agent-engineering` | `/engineering-workflow` |
| Gemini CLI | `gemini extensions install https://github.com/THanhPhan356/agent-engineering` | Ask Gemini to use `engineering-workflow` |

For a local checkout, pass the checkout path to the marketplace, Antigravity or Gemini CLI install command. Claude Code also accepts `claude --plugin-dir <checkout>` for session testing. [Codex](https://developers.openai.com/plugins/build/plugins) · [Claude Code](https://code.claude.com/docs/en/plugins/create-marketplace) · [Antigravity](https://antigravity.google/docs/plugins) · [Gemini CLI](https://geminicli.com/docs/extensions/)

If Antigravity on Windows reports `Access is denied` when installing from a Git checkout, export the plugin with `git archive --format=zip -o <path-to-zip> HEAD`, extract it into a fresh folder, and pass that folder to `agy plugin install`.

Try `verification-harness` with “Reproduce the checkout flow and save a before-and-after trace.” Use the invocation style for your host from the table.

## Choose a skill

| Skill | Use it to |
|---|---|
| [engineering-workflow](skills/engineering-workflow/SKILL.md) | Find the smallest useful loop and decide what to invest in first |
| [verification-harness](skills/verification-harness/SKILL.md) | Let agents run the app and capture reproducible evidence |
| [performance-hillclimb](skills/performance-hillclimb/SKILL.md) | Improve a metric through traces and controlled iterations |
| [formal-verification](skills/formal-verification/SKILL.md) | Check an invariant that runtime examples leave uncovered |
| [engineering-playbooks](skills/engineering-playbooks/SKILL.md) | Pick a workflow for a bug, feature, prototype or refactor |
| [agent-friendly-codebase](skills/agent-friendly-codebase/SKILL.md) | Encode recurring corrections in structure, types, lint or CI |
| [codebase-gardening](skills/codebase-gardening/SKILL.md) | Group footguns, prevent new instances and remove old precedents |
| [recall-and-distill](skills/recall-and-distill/SKILL.md) | Recover working context and turn repeated corrections into reusable workflows |
| [coordinate-agent-loops](skills/coordinate-agent-loops/SKILL.md) | Route signals through a coordinator to coding agents |
| [verify-and-ship](skills/verify-and-ship/SKILL.md) | Verify a candidate, assess release risk and sample shipped work |
| [product-iteration](skills/product-iteration/SKILL.md) | Make product decisions together from a working demo |

## Run the tools

- `list` validates a feature map and lists its scenarios.
- `verify` drives a real web journey and records a report, screenshot and trace. CPU profiles, heap snapshots and video are optional.
- `compare` compares measurements from matching baseline and candidate scenarios.
- `boundaries` checks TypeScript runtime dependencies, including paths through intermediate modules.

The scripts need Node.js 20 or later. Install the pinned dependencies in a local checkout or the plugin directory before running browser verification or TypeScript checks. [CLI setup and examples](scripts/README.md)

The repository's [smoke tests](scripts/README.md#run-the-verification-smoke-tests) save screenshots, traces and JSON for both the broken and working checkout. The **Verification evidence** workflow links the bundle from its GitHub Actions job summary.

## Evidence

[Timestamped evidence](research/en/evidence.md) maps each method to the talks. [Assessment and limitations](research/en/appraisal.md) explains the limits of the evidence and how the workflows were adapted. [Distilly research notes](research/en/README.md) cover the source tracks and checks. Each target project supplies its own fixtures, connectors, CI and release permissions.

[Follow-up research](research/en/follow-up.md) covers PR evidence, feature-map upkeep, decision logs and statecharts.
