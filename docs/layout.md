**English** · [Tiếng Việt](layout.vi.md)

# Repository layout

Each skill follows the [Agent Skills specification](https://agentskills.io/specification). The four hosts share one set of skills and use their own manifests at the repository root, following the multi-host layout of [Superpowers](https://github.com/obra/superpowers). Layout documentation lives in `docs/`, as it does in [pstack](https://github.com/cursor/plugins/tree/main/pstack). The Claude marketplace metadata follows the [official Claude plugin directory](https://github.com/anthropics/claude-plugins-official).

```text
.
├── README.md / README.vi.md     # Installation and skill index
├── CONTRIBUTING.md             # Local checks and contribution steps
├── docs/                       # Repository documentation
├── skills/
│   └── <skill-name>/
│       ├── SKILL.md            # Entry point that hosts discover
│       └── references/
│           └── vi.md           # Vietnamese instructions loaded on request
├── scripts/                    # Shared CLI, examples and tests
├── research/                   # Sources and timestamps from the talks
├── .agents/plugins/            # Codex marketplace
├── .codex-plugin/              # Codex manifest
├── .claude-plugin/             # Claude Code manifest and marketplace
├── .antigravity-plugin/        # Antigravity manifest
├── gemini-extension.json       # Gemini CLI extension manifest
├── plugin.json                 # Portable plugin manifest
└── .github/workflows/          # Package checks and verification evidence
```

Use the same name for the skill directory and its `name` field. In the English `SKILL.md`, state when an agent should use the skill in the `description` field. Link directly to `references/vi.md` for Vietnamese requests. Update both readme indexes when you add a skill.

The package check reads the skill frontmatter, checks the translation links, and verifies that the host manifests and marketplace entries describe the same package. See the commands in [Contributing](../CONTRIBUTING.md).
