---
name: formal-verification
description: "Check a targeted invariant for retries, state machines, or concurrency when runtime examples leave important states uncovered. Dùng để kiểm chứng invariant khó bao phủ bằng test."
---

For requests in Vietnamese, follow the [Vietnamese instructions](SKILL.vi.md). Use the requested language for the response.

# Choose a formal check when it earns its cost

Start with an empirical check if it can answer the decision. Consider modeling when a high-value invariant has to hold across multiple states, steps or actors and concrete runs leave significant gaps.

1. State one invariant in domain terms, with pass/fail examples, initial state and environment assumptions. For example, retrying an order with the same idempotency key after a timeout creates at most one order.
2. Model the part of the state machine or data structure necessary for that invariant. Prefer a tool the team supports, such as TLA+ for transitions or Lean for a suitable proof. Record the abstraction and what lies outside it.
3. Run the checker or proof. Preserve a readable counterexample and use it to probe the implementation. Report the tool, code revision, explored bounds or proof assumptions and actual result. Say when the model has yet to run.
4. Tie the invariant to a runtime test or repository check to detect drift between model and code. Keep hard-to-reverse decisions with the responsible person.

Lauren placed formal methods at a more demanding end of verification and described possible roles for Lean, TLA+ and code-with-proof systems. This procedure is a practical adaptation. The talks leave broad applicability and production invariants open. [Timestamped evidence](../../research/en/evidence.md#formal).
