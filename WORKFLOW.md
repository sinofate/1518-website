---
tracker:
  kind: linear
  project_slug: "$SYMPHONY_LINEAR_PROJECT_SLUG"
  active_states:
    - Todo
    - In Progress
    - Rework
  terminal_states:
    - Done
    - Closed
    - Cancelled
    - Canceled
    - Duplicate
polling:
  interval_ms: 30000
workspace:
  root: ~/code/1518-symphony-workspaces
hooks:
  after_create: |
    git clone https://github.com/sinofate/1518-website.git .
  before_run: |
    git fetch origin main
agent:
  max_concurrent_agents: 3
  max_turns: 12
codex:
  command: codex app-server
  thread_sandbox: workspace-write
  turn_sandbox_policy:
    type: workspaceWrite
    networkAccess: true
---

You are working on 1518.com, a Chinese naming, name-testing, company-name-testing, and traditional culture calculation website.

The repository README.md is the authoritative project contract. Read it before making changes and keep it synchronized whenever functionality, positioning, architecture, algorithms, deployment, or operating instructions change.

Issue context:

- Identifier: {{ issue.identifier }}
- Title: {{ issue.title }}
- Current status: {{ issue.state }}
- Labels: {{ issue.labels }}
- URL: {{ issue.url }}

Description:

{% if issue.description %}
{{ issue.description }}
{% else %}
No description provided.
{% endif %}

## Operating Principles

1. Work only inside the current Symphony workspace.
2. Do not overwrite uncommitted user or agent changes. Start with `git status --short`.
3. Treat README.md as the source of truth for product positioning, file ownership, validation, and collaboration rules.
4. Preserve the current static-site architecture: HTML, CSS, and vanilla JavaScript. Do not introduce a build system, framework, TypeScript, or large dependency unless the issue explicitly requires a technology change.
5. Preserve the 1518 brand: Chinese-first, authority-forward, restrained classic red/white visual language, direct access to name test and company name test.
6. Do not claim traditional culture calculations are deterministic life, medical, legal, financial, or commercial advice.
7. Do not fabricate precision. If birth date, birth hour, official registry data, trademark data, ephemeris data, or full dictionary data is missing, show boundaries and confidence.
8. If changing user-facing Chinese text that appears in English mode, update `assets/i18n.js`.
9. If changing JS/CSS assets, update the resource version query strings in `index.html` or `about.html`.
10. If changing algorithms, update the relevant docs under `docs/`.
11. If changing company registration, trademark, or official data-source logic, update `docs/registration-api-integration.md`.
12. If changing project structure, workflow, setup, feature list, or deployment rules, update README.md.

## File Routing

- Visual layout, mobile behavior, navigation, reports: `assets/styles.css`, `index.html`, `about.html`
- Main page behavior, SEO routes, report rendering: `assets/app.js`
- Name testing: `assets/name-engine.js`, then `assets/app.js`
- Company name testing: `assets/company-name-test.js`, then `assets/columns-tools.js`
- Brand,生肖,星座,号码,车牌,扩展栏目: `assets/columns-tools.js`
- Chinese/English mode: `assets/i18n.js`
- SEO and agent-readable files: `index.html`, `about.html`, `llms.txt`, `llms-full.txt`, `.well-known/*.json`, `robots.txt`, `sitemap.xml`
- Long-running handoff notes: `docs/00_压缩断点续作卡.md`

## Required Workflow

1. Read README.md and the issue description.
2. Run:

   ```bash
   git status --short
   git log --oneline -5
   ```

3. Identify the smallest file set needed for the issue.
4. Reproduce or inspect the current behavior before editing.
5. Make scoped changes.
6. Run validation based on touched files.
7. Update README.md and docs when required by the rules above.
8. Leave a clear final report with:
   - what changed
   - why it changed
   - validation commands and results
   - files requiring human review

## Validation Matrix

Always run:

```bash
git diff --check
```

Run JS syntax checks for every changed JS file:

```bash
node --check assets/app.js
node --check assets/name-engine.js
node --check assets/company-name-test.js
node --check assets/columns-tools.js
node --check assets/i18n.js
```

For UI or copy changes, start the local server and inspect the affected pages:

```bash
python3 -m http.server 8158
```

Check:

- `http://127.0.0.1:8158/`
- `http://127.0.0.1:8158/?lang=en` when English-facing text or layout changes
- `http://127.0.0.1:8158/about.html` when authority, algorithm, or boundary language changes

For mobile-facing changes, verify no horizontal overflow at 390px width.

For name algorithm changes, run or adapt the README sample regression for `王小明` and confirm:

- 天格 5
- 人格 7
- 地格 11
- 外格 9
- 总格 15
- no fabricated bazi when birth date/hour is missing

## Handoff Standard

Do not mark work as complete unless:

- code changes are scoped and committed or ready for review
- validation has been run and recorded
- README.md remains accurate
- relevant docs remain accurate
- user-facing boundaries remain conservative
- the final summary is reviewable by a human maintainer

