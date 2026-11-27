---
name: agent-friendly-codebase
description: "Turn recurring agent mistakes into one paved path backed by boundaries, types, static analysis and CI. Dùng để thiết kế codebase dễ sửa đúng cho agent."
---

For requests in Vietnamese, follow the [Vietnamese instructions](references/vi.md). Use the requested language for the response.

# Make the easiest path correct

1. Start with a recurring failure from a PR, conversation or incident. Identify the observed behavior, violated invariant, a real example, and the precedent agents keep copying. Find a valid example to make easier to follow.
2. Choose the strongest practical layer. Make the preferred pattern easy to discover. Use data structures, API design, types and module boundaries to make invalid states harder to express. Use lint, compiler, dependency graph and CI for mechanically detectable violations. Use AGENTS.md, rules, skills or BugBot for contextual guidance, and reserve human review for judgment.
3. Prove that a valid case passes and the invalid case fails. Include a diagnostic that points to the canonical route and attach the check to an existing entry point.
4. When violations already exist, stop new ones where the project supports it. Group existing violations, migrate them in batches and preserve behavior callers rely on.

## Dune example

Lauren describes colocated features, React routes, transcript cards, the VM host and the client as components with deliberate boundaries. Dependency checks in CI prevent forbidden imports between Electron main and renderer. The approximate frame intervals at 60 Hz and 120 Hz motivate that boundary. Runtime traces still measure jank. Dune banned comments where copied workaround rationales had become a recurring problem. Apply the underlying lesson to the precedents in the current repository.

For TypeScript projects that lack a checker, place the [boundary configuration](../../scripts/examples/boundaries.json) in the project, point it at the actual tsconfig, and run `boundaries`. Check a direct violation, one through a barrel and an accepted import. Use the returned path to guide the fix. [CLI usage](../../scripts/README.md)

Deliver the failure, layer, canonical path, rerun command and valid/invalid results. [Timestamped evidence](../../research/en/evidence.md#environment).
