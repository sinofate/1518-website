# 1518 AI Development Governance

This document defines how Codex, Claude Code, Symphony, and human maintainers should coordinate work on the 1518 website.

## Source Of Truth

`README.md` is the primary project contract. It defines:

- product positioning
- current technology stack
- file responsibilities
- coding rules
- algorithm boundaries
- validation commands
- documentation update rules
- deployment notes

If a code change makes README.md inaccurate, the change is incomplete.

## Recommended Roles

### Symphony

Symphony should act as the work orchestrator:

- read tasks from the tracker
- create one isolated workspace per task
- launch Codex for implementation
- require validation evidence before handoff
- leave work ready for human review

The included `WORKFLOW.md` is written for Symphony's current Linear-compatible tracker model. If GitHub Issues should become the tracker, add or adopt a GitHub Issues tracker adapter before expecting Symphony to poll GitHub directly.

### Codex

Codex should be the main implementation agent:

- make scoped code changes
- run local validation
- update README.md and docs when rules require it
- prepare PR-ready handoff notes

### Claude Code

Claude Code should be used as a companion reviewer and planner:

- review UI/copy/algorithm plans before implementation
- compare behavior against README.md
- review PRs for product consistency and documentation gaps
- propose follow-up tasks instead of expanding active scope

Claude Code and Codex should not edit the same uncommitted workspace at the same time. Use separate branches or separate task workspaces.

### Human Maintainer

The maintainer should decide:

- which tasks are approved for implementation
- whether a PR preserves the 1518 product direction
- whether validation evidence is sufficient
- when to merge

## Task Intake Standard

Every task should include:

- objective
- affected area
- acceptance criteria
- required validation
- documentation impact
- any known boundary or risk

Use `.github/ISSUE_TEMPLATE/1518-task.yml` for GitHub tasks. If using Linear with Symphony, copy the same fields into Linear issue descriptions.

## Branching Standard

Use short descriptive branches:

```text
codex/<area>-<short-task>
claude/<area>-<short-task>
```

Examples:

```text
codex/company-report-boundaries
codex/mobile-nav-i18n
claude/readme-consistency-review
```

## Review Standard

Every PR should answer:

- What changed?
- Why does it fit the README-defined product direction?
- Which files changed?
- Which validation commands passed?
- Which manual flows were checked?
- Was README.md or docs updated?
- Are all traditional culture and official-data boundaries still conservative?

Use `.github/pull_request_template.md` for this checklist.

## Symphony Setup Notes

The current upstream Symphony specification is Linear-first. To use it with this GitHub repository:

1. Keep GitHub as the code and documentation source of truth.
2. Use Linear as the task queue, or implement a GitHub Issues tracker adapter.
3. Set `SYMPHONY_LINEAR_PROJECT_SLUG` and `LINEAR_API_KEY` in the Symphony runtime environment if using Linear.
4. Start Symphony with this repository's `WORKFLOW.md`.
5. Keep max concurrent agents conservative until the validation loop is reliable.

Recommended initial concurrency:

```yaml
agent:
  max_concurrent_agents: 3
```

Increase only after several PRs show clean isolation, validation, and documentation discipline.

## Do Not Do

- Do not let two agents modify the same local checkout at once.
- Do not merge agent code without validation evidence.
- Do not introduce frameworks or build tooling casually.
- Do not let task scope expand without creating a follow-up issue.
- Do not leave README.md stale.
- Do not let measurement, naming, astrology, registry, trademark, or legal outputs sound more certain than the data supports.

