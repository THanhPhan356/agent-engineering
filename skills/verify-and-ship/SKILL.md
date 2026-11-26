---
name: verify-and-ship
description: "Verify a candidate, use independent reviewers selectively, assess one-way doors, and sample shipped PRs. Dùng để review, chuẩn bị merge và audit sau merge."
---

For requests in Vietnamese, follow the [Vietnamese instructions](SKILL.vi.md). Use the requested language for the response.

# Verify, review and ship

## Before release

1. Classify reversibility, impact, preconditions and harness maturity. For high-impact migrations, permissions, data and infrastructure changes, give the evidence to the responsible person. Work within the user's and repository's authority for reversible changes.
2. Run required checks and the real user journey on the proposed candidate. For work that merits it, use independent verifiers or other model families if supported. Give them the main path, grounded edge cases and adjacent behavior to check. In Lauren's description, fuzzing includes actively using the application in the test environment to look for regressions.
3. Keep findings with a scenario, observable issue, reproduction and impact on intent. Filter out preferences and unsupported findings. Rerun verification on a changed candidate. Scale review with consequence and signal because review can overfit and consume substantial tokens.
4. Use Full Autopilot as an advanced workflow when scope, checks, recovery and authority are clear. Follow the repository's merge, publishing and deployment rules. Until the conditions hold, return the candidate for review.
5. For an authorized unattended run, write a verifiable finish condition, permissions, limits, exit conditions and how to resume. Use a separate worktree or cloud checkout where available. Log decisions, candidate revisions, checks and artifacts. When progress stalls, preserve state and explain the blocker.

## After shipping

Sample across kinds and risk levels. Review artifacts and code where useful. Revert or fix through the project's procedure when evidence calls for it. Convert recurring mistakes into a lint check, invariant, harness check or updated skill. Candidate-specific rechecks, sampling details and stop conditions adapt the talks for practical use.

Report the verified revision, evidence, open findings, risk and the next decision owner. [Timestamped evidence](../../research/en/evidence.md#release).

For changes with observable behavior, keep the evidence somewhere reviewers can open after the session or CI run. Link actual screenshots, traces or reports, label the exact candidate tested, and report artifacts that are missing. For this repository's verification CLI, use the [smoke test and artifact instructions](../../scripts/README.md#run-the-verification-smoke-tests).
