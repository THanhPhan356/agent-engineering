# Contributing

Start with the [repository layout](docs/layout.md) or its [Vietnamese edition](docs/layout.vi.md). Update both language versions when changing a skill or its installation instructions. Keep changes based on the talks linked to the relevant [source and timestamp](research/en/evidence.md).

Run these checks from the repository root with Node.js 22.

```sh
npm ci --prefix scripts
npm --prefix scripts run check:package
npm --prefix scripts run lint
```

For CLI changes, follow the [browser smoke test instructions](scripts/README.md#run-the-verification-smoke-tests). For installation changes, try the affected [host's install command](README.md#install) from a local checkout. GitHub Actions publishes smoke evidence in the **Verification evidence** run.
