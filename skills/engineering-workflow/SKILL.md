---
name: engineering-workflow
description: "Apply Lauren Tan's engineering workflow: build a minimal verification loop, improve the environment, and choose what to do before expanding autonomy. Dùng để tìm vòng verification và điểm nghẽn trong repo."
---

For requests in Vietnamese, follow the [Vietnamese instructions](references/vi.md). Use the requested language for the response.

# Agent Engineering

Apply these methods when coding agents need to make and verify changes themselves. Return a concrete recommendation for the repository or a verified change.

## Mental models

- **The smallest loop.** Pick one real user journey and give the agent a way to run it and observe the result. Then let it iterate on fixes and measurements.
- **The codebase is memory.** Agents extend what they see. Improve the canonical path and data/API constraints first. Use linting, compiler checks and CI next, then rules and skills for decisions that need context.
- **Earn trust before scaling.** Use repeated evidence and reversibility to decide how much autonomy to grant. The operator remains responsible for the outcome.
- **Use deterministic tools.** Put repeatable steps in a CLI or codemod. Leave reasoning to agents and goals, product judgment and approval to the people responsible for them.

## Procedure

1. Establish intent, target behavior, a checkable finish condition and the available authority.
2. Find the repository's existing run command and measurements. When a human is still running the app or fetching screenshots, close a verification loop for one journey first.
3. Pick the skill that addresses the bottleneck. Read its instructions before proceeding and combine skills when the task actually needs them.
4. Run one evidence-producing iteration. Record conditions, outcome, artifacts and the next decision owner. Move recurring corrections to the strongest practical layer.
5. Expand to parallel tasks, event sources and collaborative workflows as the loop earns trust. For hard-to-reverse changes, keep the decision with a human and state the limits of verification.

| Bottleneck | Skill |
|---|---|
| Agents cannot drive the app or interpret a vague report | [verification-harness](../verification-harness/SKILL.md) |
| Jank, slowness, a suspected leak, or a metric needs improvement | [performance-hillclimb](../performance-hillclimb/SKILL.md) |
| An invariant spans retries, states or interactions | [formal-verification](../formal-verification/SKILL.md) |
| A bug fix, feature, prototype or refactor needs evidence | [engineering-playbooks](../engineering-playbooks/SKILL.md) |
| Changes repeatedly violate the same rule | [agent-friendly-codebase](../agent-friendly-codebase/SKILL.md) |
| Several symptoms may share a root cause | [codebase-gardening](../codebase-gardening/SKILL.md) |
| Context disappears between sessions or corrections keep recurring | [recall-and-distill](../recall-and-distill/SKILL.md) |
| A human keeps transferring reports from other tools to coding agents | [coordinate-agent-loops](../coordinate-agent-loops/SKILL.md) |
| A candidate needs an independent verifier or a merge decision | [verify-and-ship](../verify-and-ship/SKILL.md) |
| A PM, designer and engineer need to decide from a running prototype | [product-iteration](../product-iteration/SKILL.md) |

## Evidence and limitations

- The Michelin kitchen analogy illustrates training, tools and responsibility for the end result. Use domain terms that clarify what to observe or decide.
- A runtime test supports the behavior exercised. Code structure, performance and release risk call for their own evidence and checks.
- The public material describes ControlGlass, Dune and Grok Bot workflows at a high level. Treat PR counts as anecdotes about the reported environment.
- Lauren credits Karpathy's AutoResearch for hill climbing, Netflix for managing through context, and GStack and Matt Pocock's work for ideas she adapted to her own toolkit.

[Timestamped evidence](../../research/en/evidence.md) · [Assessment](../../research/en/appraisal.md)
