# Evidence from the three videos

English · [Tiếng Việt](../evidence.md)

| ID | Primary video | Transcript cross-check |
|---|---|---|
| A | [Lauren Tan's talk on X, September 21, 2026 UTC](https://x.com/poteto/status/2102050467505430555) | [YouTube replay](https://www.youtube.com/watch?v=NjoZoUm85x0) · [Timestamped transcript](https://www.textpurr.com/transcript/how-i-shipped-2000-prs-last-month-trusting-ai-agentsgrok-botlauren-tan) |
| B | [Matt Pocock interview, October 2, 2026](https://www.youtube.com/watch?v=MN9dGgmLyso) | [English–Chinese transcript](https://aipodcast.jasonlin.tech/e/laurentan-mattpoco-2026/) · [Speaker/timestamp cross-check](https://mwolf.dev/library/live-poteto-creator-of-pstack-on-shipping-1-000-s-of-pr-s-a-month-at-spacex/analysis) · [Transcript of the edited replay](https://sozai.app/transcript/lauren-tan-30-ai-agents-ship-prs/) |
| C | [YC Lightcone, November 14, 2026](https://www.youtube.com/watch?v=y1-9yeYLJUo) | [YC episode page](https://www.ycombinator.com/library/n0-the-rise-of-ai-coworkers) · [Speaker-tagged transcript](https://ulisten.ai/channels/y-combinator/the-rise-of-ai-coworkers_y1-9yeYLJUo/transcript) |

A links to the replay. B uses timestamps from the original interview because the edited replay cuts roughly half a minute at the start. C links to the YC video. Third-party transcripts can misidentify names and overlapping speakers. Tool names were checked against the public pstack repository. The notes paraphrase the sources reviewed on November 26, 2026.

## Trust

| Timestamp | Observation | Application |
|---|---|---|
| [A · 00:09](https://www.youtube.com/watch?v=NjoZoUm85x0&t=9s), [A · 04:14](https://www.youtube.com/watch?v=NjoZoUm85x0&t=254s), [B · 01:58](https://www.youtube.com/watch?v=MN9dGgmLyso&t=118s) | The PR count is a reported outcome. Her work began with a single closely supervised agent and with manually operating DevTools. | engineering-workflow |
| [A · 00:56](https://www.youtube.com/watch?v=NjoZoUm85x0&t=56s), [B · 11:18–14:17](https://www.youtube.com/watch?v=MN9dGgmLyso&t=678s) | The Michelin kitchen analogy focuses on craft and responsibility for the result. Tooling, training and the division of work change what the lead can delegate. | engineering-workflow, coordinate-agent-loops |
| [A · 05:59–06:44](https://www.youtube.com/watch?v=NjoZoUm85x0&t=359s), [A · 35:15–37:09](https://www.youtube.com/watch?v=NjoZoUm85x0&t=2115s) | Scale beyond a few agents after building trust in the environment. Human interventions indicate where to improve it. | engineering-workflow |

## Verification

| Timestamp | Observation | Application |
|---|---|---|
| [A · 02:57–03:52](https://www.youtube.com/watch?v=NjoZoUm85x0&t=177s), [A · 07:11–08:37](https://www.youtube.com/watch?v=NjoZoUm85x0&t=431s) | She initially took traces and heap snapshots manually. ControlGlass lets an agent drive the app via the Chrome DevTools Protocol. | verification-harness |
| [A · 09:01–10:15](https://www.youtube.com/watch?v=NjoZoUm85x0&t=541s), [B · 20:32–22:47](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1232s) | Use a shared CLI to launch, drive and collect evidence. B mentions Playwright and CDP as ways to avoid rebuilding scripts in every session. | verification-harness |
| [A · 10:15–12:02](https://www.youtube.com/watch?v=NjoZoUm85x0&t=615s), [B · 18:53](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1133s) | A feature map connects a vague screenshot or phrase with known features, shortcuts and controls. Keep it with the skill in the repository and maintain it automatically where practical. | verification-harness |
| [A · 12:33–14:18](https://www.youtube.com/watch?v=NjoZoUm85x0&t=753s), [C · 40:23–42:00](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2423s) | Write, run, observe and fix is the smallest loop. Behavioral correctness, speed and code quality require different evidence. | verification-harness, engineering-workflow |

[Public pstack verification skill](https://github.com/cursor/plugins/blob/main/pstack/skills/create-verification-skill/SKILL.md).

## Performance

| Timestamp | Observation | Application |
|---|---|---|
| [A · 03:24–04:14](https://www.youtube.com/watch?v=NjoZoUm85x0&t=204s), [A · 14:18](https://www.youtube.com/watch?v=NjoZoUm85x0&t=858s) | Use traces and measured results to find and improve hotspots. She describes fixing and measuring in a loop at Cursor. | performance-hillclimb |
| [B · 16:14–18:53](https://www.youtube.com/watch?v=MN9dGgmLyso&t=974s) | Score progress with a measurable signal, drawing on Karpathy's AutoResearch. Verification closes the feedback loop. | performance-hillclimb |

## Formal

| Timestamp | Observation | Application |
|---|---|---|
| [A · 07:43–08:24](https://www.youtube.com/watch?v=NjoZoUm85x0&t=463s) | Lean and TLA+ illustrate formal verification at the harder end of the spectrum. Runtime verification skills already offered practical benefits. | formal-verification |
| [B · 56:28–58:58](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3388s) | Verifiability of one-way doors depends on the domain. She mentions Bend and combining code with proofs as possible future directions. | formal-verification, verify-and-ship |

## Playbooks

| Timestamp | Observation | Application |
|---|---|---|
| [A · 13:18–14:18](https://www.youtube.com/watch?v=NjoZoUm85x0&t=798s), [C · 27:05–28:35](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1625s) | PStack and Poteto Mode encode engineering workflows. A names debugging, feature development and prototyping. C describes an internal Lauren Mode used by cloud agents and teammates. | engineering-playbooks, engineering-workflow |
| [B · 06:50–09:23](https://www.youtube.com/watch?v=MN9dGgmLyso&t=410s) | Domain expertise and precise wording matter for expressing intent. TDD and tautological tests come up in the discussion with Matt. | engineering-playbooks, recall-and-distill |
| [B · 21:20–24:33](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1280s) | Encode repeatable operations in CLIs and codemods and leave judgment to the agent. | verification-harness, engineering-playbooks |
| [C · 43:56](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2636s) | She says she has stopped using plan mode in her current workflow. The plugin still establishes intent and a checkable finish condition. | engineering-workflow |

The current [public pstack catalog](https://github.com/cursor/plugins/blob/main/pstack/README.md) cross-checks names and implementation details. The video corpus determines which concepts this plugin attributes to the talks.

## Environment

| Timestamp | Observation | Application |
|---|---|---|
| [A · 15:39–18:23](https://www.youtube.com/watch?v=NjoZoUm85x0&t=939s), [A · 36:22–37:09](https://www.youtube.com/watch?v=NjoZoUm85x0&t=2182s), [C · 45:45–47:38](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2745s) | Invest first in the codebase, architecture and invalid states, then static analysis. Layer contextual rules, BugBot and skills over those. Style guides and human review cover more selective cases. | agent-friendly-codebase |
| [A · 18:56–21:35](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1136s), [B · 28:44–31:16](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1724s) | Agents copy precedents. Dune provides canonical routes, conventions and boundaries for people and agents with limited context. | agent-friendly-codebase |
| [A · 23:08–25:14](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1388s) | Comments justifying workarounds spread an unwanted pattern in Dune's context. Lauren proposes a gardener, a single paved path and lint to limit the spread of debt. | agent-friendly-codebase, codebase-gardening |
| [A · 26:42–29:47](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1602s), [C · 48:40–49:47](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2920s) | Colocate features and separate execution surfaces. A dependency checker prevents forbidden Electron main/renderer imports. Runtime traces measure frame delays. | agent-friendly-codebase |
| [C · 50:37–51:51](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=3037s) | Lauren reports a token budget different from many teams. Review cost and transferability need local measurement. | engineering-workflow, verify-and-ship |

## Gardening

| Timestamp | Observation | Application |
|---|---|---|
| [A · 24:28–26:13](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1468s), [B · 45:51–46:43](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2751s) | Gardening finds bad precedents, stops their growth and removes older instances. Some PRs were gardening work. | codebase-gardening |
| [B · 47:17–48:30](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2837s) | A routine records React footguns in a document. Reviewing a batch helps identify shared causes. | codebase-gardening |

## Recall

| Timestamp | Observation | Application |
|---|---|---|
| [B · 01:00:35–01:03:01](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3635s) | Past chats reveal recurring corrections that can become skills or lint. Recall carries decisions and context to a new session. | recall-and-distill |
| [B · 01:03:52–01:04:37](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3832s), [C · 27:34–28:19](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1654s) | Smaller skills can suffice as models handle more detail. Build a personal toolkit and combine appropriate pieces from other authors. | recall-and-distill |

[Public Recall skill](https://github.com/cursor/plugins/blob/main/pstack/skills/recall/SKILL.md). Wayfinder is Matt Pocock's tool.

## Orchestration

| Timestamp | Observation | Application |
|---|---|---|
| [A · 32:33–34:41](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1953s), [B · 35:08–38:33](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2108s) | The outer loop gathers reports, alerts and context. The inner loop reproduces and fixes from a snapshot of intent. Examples include Slack, Sentry, Datadog, PlanetScale, Linear and X. | coordinate-agent-loops |
| [B · 40:49–44:22](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2449s), [C · 42:59–43:11](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2579s) | Lauren borrows context-oriented management from Netflix. Grok Bot routines hand events to Cursor Projects, whose coordinators can group common causes and dispatch workers. | coordinate-agent-loops |
| [C · 06:49–07:04](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=409s), [C · 12:14](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=734s), [C · 15:54–16:07](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=954s) | Organize specialist and team bots to fit the team. Lauren describes owners, managers and collaborators, alongside open authentication and authorization questions. | coordinate-agent-loops |
| [C · 17:43–19:30](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1063s), [C · 32:17–32:44](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1937s) | A lead bot can forward feedback to workers. An engineering bot can ask a data specialist about impact in Slack. Shared engineering bots and private assistants have different places to work. | coordinate-agent-loops |
| [C · 41:45–43:11](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2505s) | A metric alert can trigger a worker to use the same tools and independently reproduce the issue on its own machine after the verification loop has earned trust. | coordinate-agent-loops |

## Release

| Timestamp | Observation | Application |
|---|---|---|
| [B · 49:31–50:27](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2971s), [B · 53:37–54:37](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3217s) | Sample PRs and check commit history in the morning. Course-correct, revert or encode a recurring constraint when the evidence calls for it. | verify-and-ship |
| [B · 51:57–53:37](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3117s) | Full Autopilot uses verifiers to run the app, explore interactions, find regressions and rerun after fixes. Tune the number of verifiers to the budget. | verify-and-ship |
| [C · 44:34–46:10](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2674s) | Interrogate can use different model families. Lauren reduced adversarial review to limit cost and reduce the risk of optimizing for feedback unrelated to intent. | verify-and-ship |
| [B · 56:28](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3388s), [C · 47:38](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2858s) | Verifiability affects autonomy. Sensitive infrastructure, databases and deployment may still call for a human. | verify-and-ship |
| [C · 53:46–54:10](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=3226s) | Roman describes Sandy fixing small issues from feedback. Lauren confirms the example of a 3 a.m. automated release in her team's environment. | verify-and-ship |

[Interrogate](https://github.com/cursor/plugins/blob/main/pstack/skills/interrogate/SKILL.md) · [pstack's overnight guide](https://github.com/cursor/plugins/blob/main/pstack/docs/guide/07-overnight.md).

## Product

| Timestamp | Observation | Application |
|---|---|---|
| [C · 23:18–26:48](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1398s) | Lauren iterated on a feature with colleagues and a PM in one Slack thread. The cloud agent ran in a VM and returned screenshots and videos. | product-iteration |
| [C · 54:14–55:05](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=3254s) | Roman describes dogfooding before shipping UX changes. Lauren emphasizes human judgment, taste and a deliberately designed user experience. | product-iteration |
| [C · 58:24–59:37](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=3504s) | Lauren also discusses communicating and telling stories about work. This is career advice outside the plugin's engineering procedures. | Scope note |
