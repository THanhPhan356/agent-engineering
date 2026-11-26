# Assessment and limitations

English · [Tiếng Việt](../appraisal.md)

## Corpus and method

The [three videos](evidence.md) are the primary corpus. Distilly produced the Work Skill from source-grounded methods and decisions. K-Dense's Scientific Critical Thinking workflow informed the distinction between self-reports, demonstrated procedures, inferences and unmeasured outcomes. Public pstack documentation helps verify names and implementation details. Multiple transcripts of one video still represent one underlying source. [K-Dense Scientific Agent Skills](https://github.com/K-Dense-AI/scientific-agent-skills)

| Question | Observation | Evidence limit |
|---|---|---|
| Where does the smallest loop begin? | A, B and C put running the app and observing the outcome before expanding autonomy. | One successful run covers the tested case. Code quality and performance require appropriate additional checks. |
| Where should recurring corrections live? | All three prioritize code and static analysis. B describes buffering React footguns. | Restructuring costs, suitable rules and debt migration depend on the repository. |
| How much review is useful? | B uses verifiers and later sampling. C uses Interrogate selectively and retains human involvement for sensitive work. | The corpus lacks controlled estimates of each layer's effect, review cost and ideal sampling rate. |
| What does the PR count measure? | A's talk says roughly 2,000, while its post says 2,500. A host cites a higher figure in C. | The counting method and time windows lack independent PR data. Use the figures as anecdotes. |
| Does the setup transfer directly? | B describes expensive verification. C notes Lauren's unusual token budget. | Teams need to measure local cost, reliability and reversibility. |

## Implementation decisions

- Each method has a timestamp and clear attribution. Output formats, fixtures, risk checks, sampling and rollback adapt those methods for everyday use.
- ControlGlass, Dune and Grok Bot's internal setup are described publicly in outline. The plugin uses the host's available tools and the project's harness and permissions. Roles can run sequentially where parallel infrastructure is unavailable.
- Dune's comment restriction and Lauren's choice to skip plan mode came from particular environments. Dogfooding and permission examples are assigned to the speaker who describes them.
- The Work Skill covers observable methods. A person's private decisions and speech style are out of scope.
- The original X page returned 403 in the research tool. The replay and public transcripts supported the spoken content. Slide-only and demo-only details remain unverified.

## Scenario checks

| Scenario | Expected workflow |
|---|---|
| An agent repeatedly asks for a screenshot | Give it a reusable run path and feature map and demonstrate a reproduction before increasing concurrency. |
| Timing looks good while checkout fails | Assert the real behavior through the supported entry point and report correctness and timing independently. |
| Heavy work repeatedly reaches the renderer | Add the dependency boundary, check allowed and forbidden imports, and use a runtime trace to measure effect. |
| Verifiers report concerns outside intent | Require reproduction and actual impact, then address recurring relevant cases in the environment. |
| The candidate is a hard-to-reverse migration | Escalate to the release owner with the invariant, evidence, risks and recovery options. |
| Product priorities change in Slack | Clarify the owner and intent in the same thread and supply the next artifact for a human decision. |
