# Follow-up research for Agent Engineering

English · [Tiếng Việt](../follow-up.md)

## Four updates in priority order

| Priority | Evidence | Repository change and acceptance check |
|---|---|---|
| 1. Evidence with the PR | Lauren describes reviewing outputs from the actual run, including screenshots, videos, diagrams and formal results. Playwright traces retain actions, UI snapshots and requests. | This update adds a smoke test that saves artifacts for both the broken and working checkout. A GitHub Actions workflow stores the bundle and includes the tested commit in the job summary. [AI Engineer, 09:40](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=580s) · [Trace Viewer](https://playwright.dev/docs/trace-viewer) · [GitHub Actions artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data) |
| 2. Feature-map upkeep | pstack checks the map against source and exercises each feature live. It checks app health again after a failed drive and preserves evidence at its recorded location. | Add a preflight and feature audit that distinguish stale maps, harness failures, unavailable environments and actual regressions. Check a stale selector and a simulated HTTP 503 and retain the failed run. This update adds an option for slower pages. [Maintain verification skill](https://github.com/cursor/plugins/blob/main/pstack/skills/maintain-verification-skill/SKILL.md) |
| 3. A decision log | pstack links decisions, rationale, evidence and result. Rejected experiments also help a reviewer follow a hill climb. | Record accepted, rejected and reverted changes in an append-only log. Verify that each entry points to its report or trace and that inconclusive measurements are reported as such. [Show me your work](https://github.com/cursor/plugins/blob/main/pstack/skills/show-me-your-work/SKILL.md) |
| 4. A statechart with a counterexample | Lauren uses statecharts to review user-visible states and transitions. A model covers only the stated properties. | Start with a duplicate order after retrying a timeout. The broken model must produce a path to a bad state. After fixing the invariant, rerun the checker and exercise an equivalent scenario through the real CLI. [AI Engineer, 10:50](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=650s) · [Statechart](https://github.com/cursor/plugins/blob/main/pstack/skills/statechart/SKILL.md) |

## How to evaluate the result

SWT-Bench measures whether tests reproduce a defect by failing before a fix and passing after it. The smoke test uses the same checkout assertion in both fixture states and pairs a forbidden import with a permitted example. These checks cover specific behavior. [SWT-Bench, NeurIPS 2024](https://proceedings.neurips.cc/paper_files/paper/2024/hash/94f093b41fc2666376fb1f667fe282f3-Abstract-Conference.html)

Lauren reports roughly 11,000 team PRs in one month and a relative revert rate of about 0.5%. The talk does not isolate the contribution of individual techniques. Track runnable scenarios, fail-to-pass cases, usable artifacts and verified import boundaries in this repository. [AI Engineer, 13:32](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=812s)

[Run the smoke tests](../../scripts/README.md#run-the-verification-smoke-tests)
