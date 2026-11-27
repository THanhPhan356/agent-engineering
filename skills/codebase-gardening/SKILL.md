---
name: codebase-gardening
description: "Scan for recurring codebase footguns, buffer findings, group root causes, prevent growth and clean up examples agents copy. Dùng để gom và xử lý anti-pattern lặp lại."
---

For requests in Vietnamese, follow the [Vietnamese instructions](references/vi.md). Use the requested language for the response.

# Garden the codebase

## Scan and buffer

1. Select a recognizable footgun and scan scope. For example, look for a React pattern that repeatedly leaves state out of sync. Identify a good example for comparison.
2. Add the first pass to a buffer with file or commit, symptom, observable consequence, suspected cause and confidence. Group duplicates while preserving evidence. Handle urgent incidents through the repository's incident process.
3. Review a batch on the team's cadence. Cluster cases by root cause and the standard they need. Use runtime evidence for behavior-related clusters. Prefer a systemic fix that covers the cluster.

## Prevent and clean up

- Stop new instances through a canonical path, types, lint or CI. Use [agent-friendly-codebase](../agent-friendly-codebase/SKILL.md) to choose the layer. Where supported, scope a rule to new violations while existing cases are migrated.
- Clean up the precedents most likely to spread. Use a tested codemod for deterministic changes and recheck existing behavior. Fix examples, fixtures or workaround notes that are contributing to repetition.
- Record the enforcing rule, remaining cases and exceptions that need judgment. Update the buffer with verified work. Set up a standing routine only within the scope the user authorized.

Deliver the clusters, one genuine example per priority cluster and a specific environment-level fix. [Timestamped evidence](../../research/en/evidence.md#gardening).
