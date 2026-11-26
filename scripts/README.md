# Agent Engineering CLI

English · [Tiếng Việt](README.vi.md)

The CLI requires Node.js 20 or later. The target repository supplies the feature map, test fixtures and the command that starts its app.

## Install dependencies

From a local checkout or the installed plugin directory, run `npm ci --prefix scripts`. For browser automation, either run `node scripts/node_modules/playwright/cli.js install chromium` or pass `--channel msedge` or `--channel chrome` to use an installed browser. For video recording, run `node scripts/node_modules/playwright/cli.js install ffmpeg` once. `list` and `compare` only require Node.js.

## Verify a web journey

Copy the [feature-map example](examples/feature-map.json) to the target repository. Change the route, selectors, fixture data and assertion to match the real app, then start the app in a test environment. Run these commands from the target project. Set `cli` to an absolute path to the plugin's script.

```bash
cli="/path/to/agent-engineering/scripts/agent-engineering.mjs"
node "$cli" list .agent-engineering/feature-map.json
node "$cli" verify .agent-engineering/feature-map.json checkout --base-url http://localhost:3000 --out .agent-engineering/evidence/checkout-after --channel chrome --cpu
```

Each run gets a new browser context and writes a screenshot and trace. The command writes one `report.json` for the run set. Add `--heap` for a final heap snapshot or `--video` for a WebM. Supported actions are `click`, `fill`, `press`, `expectVisible` and `expectText`. The last matches a case-sensitive substring in a visible element. Use test data because artifacts can contain rendered content.

The default browser timeout is 8,000 ms per operation. Use `--timeout-ms 30000` for a slower app and record the change when comparing runs.

## Run the verification smoke tests

From the plugin checkout, install dependencies as above and run `npm --prefix scripts run smoke -- --out /absolute/path/to/new-evidence-folder`. To use an installed Edge on Windows, add `--channel msedge`. The suite serves a local checkout fixture, runs the same assertion with and without the defect, and checks a TypeScript dependency boundary. It leaves `summary.md`, screenshots, Playwright traces and JSON reports in the output folder.

On GitHub, open **Checks → Verification evidence** and follow the evidence link in the job summary. Download the bundle and open a trace with `node scripts/node_modules/playwright/cli.js show-trace /path/to/trace.zip`. [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)

## Compare performance

Run the same feature with `--runs 5` on baseline and candidate. Match the browser, build mode, fixtures and machine, and choose a new output directory each time. Add `"measure": "checkout-submit"` to the feature when the app records a matching `performance.measure`. With no named measure, the CLI times the journey from navigation through the last assertion.

```bash
node "$cli" compare .agent-engineering/evidence/baseline/report.json .agent-engineering/evidence/candidate/report.json --min-percent 5
```

The verdict is `improved`, `regressed` or `inconclusive`. The threshold is the largest of the minimum percentage and twice the median absolute deviation (MAD) on either side, expressed in milliseconds. Use the verdict with traces and knowledge of the test conditions.

## Check import boundaries

Copy the [boundary example](examples/boundaries.json) to the project root and set its paths.

```bash
node "$cli" boundaries agent-boundaries.json
```

The checker resolves imports using the TypeScript configuration and prints one dependency chain per file crossing a forbidden boundary. It follows imports, re-exports and literal `import()` or `require()` calls in the TypeScript program. Type-only imports, computed module names and bundler-only aliases are outside its coverage. Exit code `1` means verification failed or a boundary was violated. Exit code `2` means a setup, dependency or configuration error.
