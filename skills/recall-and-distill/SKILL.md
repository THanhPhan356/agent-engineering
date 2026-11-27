---
name: recall-and-distill
description: "Recover working context and distill recurring corrections from chats, PRs and code into a guardrail, CLI or small reusable skill. Dùng để lấy lại ngữ cảnh và rút skill từ corrections."
---

For requests in Vietnamese, follow the [Vietnamese instructions](references/vi.md). Use the requested language for the response.

# Recall and distill corrections

## Recover working context

1. Establish topic, repository, time range and which chats or PRs are in scope. Use supported history tools or material supplied by the user to read the relevant passages.
2. Compare prior intent and decisions with the current code, commits, issues and tests. Separate accepted decisions, experiments, superseded decisions and open questions. Remove unrelated or private material from the handoff.
3. Return a brief with goal, rationale, current state, source pointers, last verification, next action and decisions still pending. Name unavailable sources.

## Build a reusable skill from corrections

1. For each intervention, capture the agent's action, the correction, intended behavior, applicable situation and counterexample. Group repeated mistakes or decisions.
2. Pick an effective home. Encode enforceable rules in code, types, lint or CI. Put deterministic steps into a CLI or codemod. Keep judgment-dependent steps in the skill.
3. Document purpose, triggers, inputs, procedure and expected evidence. Use precise domain words. Verify against one previous case and one out-of-scope case before relying on the skill.
4. Remove instructions the evidence shows are redundant. Combine skills when they cover different stages. Lauren suggests Matt Pocock's Wayfinder as a complement to Poteto Mode. Preserve attribution for each part.

Return the working brief or a table connecting corrections, causes, controls and evidence. [Timestamped evidence](../../research/en/evidence.md#recall).
