---
name: performance-hillclimb
description: "Improve performance with an empirical hill-climb loop: choose a metric, trace, establish a baseline, change one variable, and remeasure. Dùng để tối ưu theo baseline và trace."
---

For requests in Vietnamese, follow the [Vietnamese instructions](SKILL.vi.md). Use the requested language for the response.

# Hill climb with evidence

1. Fix the user journey, fixture, environment, build mode and trace capture. Choose one primary metric, its direction, and the user-visible outcome it represents. Record correctness requirements and metrics that must stay within bounds.
2. Repeat the baseline enough to observe variation. Record the commit, environment, individual runs and a suitable summary statistic. Improve the test setup first if noise hides the signal.
3. Use a trace, profile, heap snapshot or instrumentation to identify a hotspot. Write down one falsifiable hypothesis, the smallest useful change and its expected effect.
4. Make one change and rerun the same scenario. Keep it when the gain repeats, exceeds relevant variation and preserves guardrails. Undo an unsuccessful experimental change without touching unrelated work. Use the accepted result as the next baseline.
5. Stop when the target is reached, the budget is exhausted, no credible hypothesis remains, or the test cannot resolve a difference. Report gains only under comparable conditions.

Deliver the question, metric, baseline, final result, uncertainty or measurement limits, traces and an experiment log. Distinguish a microbenchmark from user-visible performance.

For a web feature map, use `verify --runs 5` on baseline and candidate with matching settings. Prefer a named `performance.measure` when available. Run `compare` on the two `report.json` files to check scenario and environment and report median, MAD and a verdict. Inspect the trace and correctness guardrails before keeping the change. [CLI usage](../../scripts/README.md)

The comparison and budget choices are this plugin's implementation. Lauren credits Karpathy's AutoResearch as inspiration for the scored loop. [Timestamped evidence](../../research/en/evidence.md#performance).
