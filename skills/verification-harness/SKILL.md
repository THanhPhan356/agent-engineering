---
name: verification-harness
description: "Build a ControlGlass-style verification harness with a repeatable CLI, feature map, browser evidence, CPU profiles and heap snapshots. Dùng để agent tự chạy app và thu bằng chứng."
---

For requests in Vietnamese, follow the [Vietnamese instructions](references/vi.md). Use the requested language for the response.

# Build a ControlGlass-style verification loop

1. Pick one real user behavior or reproducible bug. Write down the input, starting state, actions, observable signal and pass condition. For vague reports, use the feature map to find plausible routes and check them in the app.
2. Find how the project already launches the app, tests it and captures artifacts. Reuse its CLI. When agents keep rebuilding a sequence, encode that sequence in a repository script and document the exact command after testing it from a clean state.
3. Drive the app the way a user would. Use Playwright or CDP for browser/Electron surfaces and the project's CLI or HTTP checks for other surfaces. Standardize launch, readiness, fixtures, route or window selection, evidence capture and teardown. Isolate ports, profiles and data when running concurrently. Let agents interpret traces and decide what to fix.
4. Reproduce before editing. Repeat the same journey after editing and check adjacent behavior. If the environment or fixture prevents reproduction, record the blocker and the scope of any substitute check.
5. Report correctness, performance and implementation quality separately. An assertion or observed state supports behavior, a baseline supports performance, and repository constraints and review support quality. A successful recording only covers the journey that ran.

## Maintain a feature map

Keep it next to the verification code or skill. For each feature, record the names users use, the route or shortcut, enabling conditions, fixture, stable control or selector, actions, success signal, code path, and last verified date or commit. Update it from current code and a live run when the UI changes. Use an existing maintenance routine if the project already has one.

## Run the bundled CLI

For an HTTP app without a harness, adapt the [feature map example](../../scripts/examples/feature-map.json). Run `list` to validate the map, then `verify` with the actual test URL. The CLI writes `report.json`, a screenshot and a trace. Add `--cpu`, `--heap` or `--video` when you need the corresponding artifact. Prefer the project's existing path when available. [CLI usage](../../scripts/README.md)

| Question | Evidence |
|---|---|
| Did the action or state transition occur? | Command and assertion, with before/after screenshot or video where useful |
| Where did jank, hangs or high CPU come from? | Trace or CPU profile tied to the scenario, action and commit |
| Is there a possible memory leak? | Heap snapshots taken at comparable points in the same reproduction loop |
| Did an API or backend operation work? | Request, fixture, response and observable state through a supported entry point |

Return the rerun command, environment, before/after result, artifact paths and what the scenario did not cover. When creating a harness, also show the feature-map location and a successful CLI run.

[Timestamped evidence](../../research/en/evidence.md#verification).
