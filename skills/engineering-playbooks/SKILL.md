---
name: engineering-playbooks
description: "Route debugging, features, prototypes and refactors through a Poteto Mode-inspired playbook with explicit intent and runtime evidence. Dùng khi cần một playbook kỹ thuật cụ thể."
---

For requests in Vietnamese, follow the [Vietnamese instructions](SKILL.vi.md). Use the requested language for the response.

# Pick an engineering playbook

Identify the goal, what the repository already tells you, the pass condition, and the facts you can verify without asking. Turn an ambiguous request into a concrete case. Use domain terms with shared meaning. For example, TDD is valuable when it gives you a failure that reflects supported behavior, such as a regression test through the real entry point.

| Task | Procedure |
|---|---|
| Investigation | Trace from the entry point to relevant code. Check runtime behavior or history when the question requires it. Return the conclusion, evidence and open questions. |
| Bug fix | Reproduce through the real path and establish the cause. When a stable regression test is cheap, show that it fails before fixing. Fix the cause and rerun the original scenario. |
| Feature | State behavior and acceptance. Set the data shape, caller and existing canonical path. Build a runnable slice and verify it with artifacts. |
| Prototype | Pick the question to settle and run the smallest experiment that can answer it. Report assumptions, production cost and what can be discarded. |
| Refactor | Capture existing behavior and caller contracts. Change the shape or boundary, apply a repository codemod where deterministic, and verify the original path. |
| Performance | Capture before/after traces and use [performance-hillclimb](../performance-hillclimb/SKILL.md). |

Put stable mechanics in reusable commands or codemods. Keep judgment in the playbook and discover implementation details from the current code. Follow the repository's established route where it has one.

Return the change, rerun command, evidence, remaining uncertainties and decisions still needed. The talks name the workflow categories. This table is a shorter implementation cross-checked against public pstack documentation. [Timestamped evidence](../../research/en/evidence.md#playbooks).
