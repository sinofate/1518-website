# 1518.com 网站开发项目

1518.com 是一个面向中文用户的起名、测名和传统文化测算工具站。当前版本为静态前端实现，重点完成首页核心测算入口、姓名测试、公司名测试、每日宜忌、黄道吉日、品牌测试、个人起名、公司起名、移动端访问、SEO、Agent 可读文件和 GitHub 部署基础。

本文档是本项目的开发说明和协作规范。后续使用 Claude Code、Codex 或人工方式修改源代码时，都应优先阅读并同步维护本文档。

## 项目定位

- 目标域名：`1518.com`
- GitHub 仓库：`https://github.com/sinofate/1518-website`
- 项目类型：静态网站，可部署到 GitHub Pages、Cloudflare Pages、Nginx 或对象存储静态托管
- 核心体验：首页直接进入“姓名测试”和“公司名测试”，减少用户跳转成本
- 品牌定位：深耕在线测评 20 年，千万用户验证的权威姓名测试网站
- 产品顾问：孔力（又名孔令森），易医合参实战派易学顾问
- 当前技术栈：HTML、CSS、原生 JavaScript，无构建工具、无打包流程

## 快速开始

```bash
git clone https://github.com/sinofate/1518-website.git
cd 1518-website
python3 -m http.server 8158
```

访问中文站：

```text
http://127.0.0.1:8158/
```

访问英文模式：

```text
http://127.0.0.1:8158/?lang=en
```

## 项目结构

```text
.
├── index.html
├── about.html
├── assets
│   ├── app.js
│   ├── columns-tools.js
│   ├── company-name-test.js
│   ├── i18n.js
│   ├── kangxi-strokes.js        # 生成文件：约2万字康熙笔画共用表（window.KANGXI_DB）
│   ├── name-engine.js
│   ├── styles.css
│   └── vendor
│       └── lunar.js
├── docs
│   ├── 00_压缩断点续作卡.md
│   ├── algorithm-depth-upgrade-20260602.md
│   ├── algorithm-qa-report-20260602.md
│   ├── authority-visual-agent-upgrade-20260602.md
│   ├── competitor-column-plan.md
│   ├── registration-api-integration.md
│   └── references
├── mcp-server                   # 独立 Node 子项目：把测算引擎暴露为 Agent 可调用的 MCP 工具
│   ├── scripts                  # build-kangxi.mjs（生成字库）、extract-data.mjs（从站点 assets 同步数据）
│   ├── src                      # server.js/http.js 入口、engine/* 引擎、tools.js 工具注册
│   ├── data                     # kangxi-report.json 生成报告
│   └── test                     # smoke.mjs 端到端测试
├── .well-known
│   ├── agent-tools.json
│   ├── ai-readiness.json
│   └── mcp.json
├── llms.txt
├── llms-full.txt
├── robots.txt
├── sitemap.xml
└── README.md
```

> 静态站只依赖 `assets/**`（含 `kangxi-strokes.js`），可独立运行；`mcp-server/` 为可选的 Agent 调用层，不参与站点静态托管。

## 文件职责

### 页面文件

- `index.html`：主站首页和所有工具入口。脚本版本号也在这里更新。
- `about.html`：关于我们、权威证明、算法说明、数据源边界和顾问信息。

### 样式与交互

- `assets/styles.css`：全站视觉系统、响应式布局、logo、导航、表单、报告页、移动端适配。
- `assets/i18n.js`：中英文切换、英文导航、英文占位符、英文模式特殊布局。

### 测算算法

- `assets/name-engine.js`：姓名测试核心引擎，包含五格数理、康熙笔画、三才、八字、用字五行、用字风险和测算置信度。笔画查找顺序为「内联康熙表 → `window.KANGXI_DB` → 估算」。
- `assets/company-name-test.js`：首页公司名测试，包含行业池、商号自动抽取、行业适配、风险扣分、报告生成。笔画查找同样接入 `window.KANGXI_DB`。
- `assets/kangxi-strokes.js`：**生成文件**（由 `mcp-server/scripts/build-kangxi.mjs` 产出），定义 `window.KANGXI_DB` 约 2 万字康熙笔画共用表，覆盖 GBK 字集。`index.html` 在引擎脚本前加载它，缺失时引擎自动回退到估算，站点仍可独立运行。不要手改，改数据请重跑生成脚本。
- `assets/columns-tools.js`：扩展栏目工具，包括每日宜忌、黄道吉日、个人起名、公司起名、品牌起名、品牌测试、生肖、星座、号码、车牌等。
- `assets/app.js`：页面初始化、SEO 路由、首页表单、姓名报告渲染、通用 UI 行为。
- `assets/vendor/lunar.js`：第三方农历/八字库。不要直接修改，除非明确升级 vendor 版本并记录来源。

### MCP Server（可选 Agent 调用层）

- `mcp-server/`：独立 Node 子项目，把姓名/公司/生肖/工商商标预查等暴露为 Agent 可调用的 MCP 工具（`/.well-known/mcp.json` 里"planned"工具的可运行实现）。**不属于静态站运行时**，站点不依赖它。
- 数据一致性：姓名引擎在 Node 沙箱中**直接执行站点 `assets/name-engine.js`**（`extract-data.mjs` 同步的副本），评分与站点逐项一致、不会漂移；公司引擎按同一公式移植并经样本回归核对。
- 字库共用：`build-kangxi.mjs` 生成 `assets/kangxi-strokes.js` 与 `mcp-server/src/engine/kangxi-db.js` 同一张表，站点与 MCP 共用。
- 详细使用/部署见 `mcp-server/README.md`。

### SEO、Agent 和部署文件

- `robots.txt`：搜索引擎抓取规则。
- `sitemap.xml`：站点地图。
- `llms.txt`：给 LLM/Agent 的简版站点说明。
- `llms-full.txt`：给 LLM/Agent 的完整站点说明。
- `.well-known/agent-tools.json`：机器可读工具 schema。
- `.well-known/ai-readiness.json`：AI 可读性评估和站点元信息。
- `.well-known/mcp.json`：MCP/Agent 工具说明。

### 文档文件

- `docs/algorithm-depth-upgrade-20260602.md`：算法升级记录。
- `docs/algorithm-qa-report-20260602.md`：算法 QA 和样本回归记录。
- `docs/registration-api-integration.md`：工商/商标真实数据源接入方案。
- `docs/authority-visual-agent-upgrade-20260602.md`：权威性、视觉和 Agent 升级记录。
- `docs/00_压缩断点续作卡.md`：长任务续作卡，记录当前状态和下一步。

## 当前功能

### 核心测算

- 姓名测试：五格数理、三才配置、八字喜用、用字五行、音韵节奏、生肖参考、常用度和测算置信度。
- 公司名测试：公司全称、商号简称、所属行业、组织形式、行业适配、传播识别和风险扣分。
- 品牌名测试：传播力、品类联想、数理参考、受众匹配和商标预查提醒。
- 每日宜忌：读取黄历宜忌、农历干支、冲煞、吉神凶煞、方位和时辰，并结合用户八字喜用生成行动建议。
- 黄道吉日：面向结婚、开业、签约、搬家等重要事项，在候选日期中结合黄历宜忌、冲煞、吉神凶煞、八字喜用和吉时排序。
- 个人起名：按姓氏、性别、出生时间、五行补益和用字风险生成候选名。
- 公司起名：按行业、地域、关键词和组织后缀生成候选公司名。
- 品牌起名：按品类、用户、气质和商标类别生成候选品牌名。

### 扩展栏目

- 周公解梦
- 生肖查询
- 生肖配对
- 星座查询
- 星座配对
- 生日密码
- 风水查询
- 血型分析
- 血型配对
- 五运六气
- 测手机号
- 车牌测算

### 多语言与移动端

- 中文主站。
- 英文模式，Slogan 为 `I Ching · Decide Your Path`。
- 移动端无横向溢出检查。
- 手机端主导航和副导航分层展示。

## 编码规范

### 通用规范

- 不引入构建工具，除非项目明确升级技术栈。
- 不引入大型框架。当前项目应保持静态 HTML/CSS/JS 可直接托管。
- 保持文件编码为 UTF-8。
- 中文文案使用中文标点；代码标识符使用英文。
- 修改已有功能时，优先沿用当前文件中的函数风格和数据结构。
- 不直接复制第三方网站长篇文案、图片、代码或数据库内容。
- 所有测算内容必须保留传统文化参考边界，不包装成绝对预测。

### HTML 规范

- 首页核心顺序保持：姓名测试 -> 公司名测试 -> 其他栏目。
- 导航结构修改时，同步检查中文主导航、英文主导航、副导航和移动端显示。
- 新增脚本或样式后，必须在 `index.html` 中更新版本号，避免浏览器缓存旧文件。
- `about.html` 中的顾问信息、权威说明和算法边界要与首页口径一致。

### CSS 规范

- 全站视觉变量集中在 `assets/styles.css` 顶部 `:root`。
- 卡片圆角保持克制，当前主要使用 `6px` 到 `8px`。
- 避免大面积单一紫色、蓝紫渐变、装饰性光球和无意义背景元素。
- 移动端必须防止横向溢出。
- 英文导航要保持一行展示，避免按钮文字重叠。
- 改 logo 时必须保留 `1518.com` 和 Slogan 的品牌识别。

### JavaScript 规范

- 使用原生 JavaScript，不使用 TypeScript、不使用打包器。
- 业务数据优先放在对应模块顶部常量中。
- 测算函数要尽量保持纯函数输入输出，便于样本回归。
- 不要用随机数生成核心评分。若需辅助分，必须可解释、可复现。
- 不要在缺少用户输入时伪造精确结果。例如缺少出生日期或时辰时，不得生成四柱八字。
- 输出报告要说明依据、置信度或边界。

### 算法规范

- 姓名测试以 `assets/name-engine.js` 为核心，其他模块应尽量调用它，而不是另写一套姓名评分。
- 公司名测试应区分公司全称、商号简称、行业词、地域和组织形式。
- 品牌测试应重点看显著性、品类联想、通用词风险、长度、读写记忆度和商标预查。
- 手机号和车牌测算应以数字结构、尾号、重复号、顺逆连号和数理为主，不得输出现实风险预测。
- 星座查询当前只输出太阳星座。未接入真实星历、时区、经纬度和宫位制前，不得输出上升、月亮、宫位和相位。
- 工商核名、商标注册、法律可注册性必须提示以官方申报、检索和审查结果为准。

### i18n 规范

- 中文是主语言，英文由 `assets/i18n.js` 转换。
- 新增中文文案后，如果英文站会展示，必须在 `i18n.js` 中补充翻译。
- 英文导航优先短词，避免移动端换行或重叠。
- 英文日期输入在英文模式下使用 `YYYY-MM-DD` 占位，不显示中文日期占位。

## Claude Code 协作规范

Claude Code 参与修改源代码时，请遵守以下流程：

1. 先阅读本 `README.md`。
2. 根据任务类型定位文件：
   - 改视觉：优先看 `assets/styles.css`、`index.html`。
   - 改姓名测试：优先看 `assets/name-engine.js`、`assets/app.js`。
   - 改公司名测试：首页看 `assets/company-name-test.js`，栏目页看 `assets/columns-tools.js`。
   - 改每日宜忌、黄道吉日、品牌、生肖、星座、号码等栏目：看 `assets/columns-tools.js`。
   - 改中英文：看 `assets/i18n.js`。
   - 改 SEO/Agent：看 `index.html`、`about.html`、`llms.txt`、`llms-full.txt`、`.well-known/ai-readiness.json`、`.well-known/mcp.json`、`.well-known/agent-tools.json`、`sitemap.xml`。
3. 修改前先确认 `git status --short`，不要覆盖他人未提交改动。
4. 修改后必须跑对应检查命令。
5. 若改了 JS/CSS，需要更新 `index.html` 或 `about.html` 中对应资源版本号。
6. 若改变算法、数据源、部署方式或项目结构，必须同步更新本 README。
7. 若改变算法准确性，必须同步更新 `docs/algorithm-depth-upgrade-20260602.md` 或 `docs/algorithm-qa-report-20260602.md`。
8. 若改变工商/商标数据源逻辑，必须同步更新 `docs/registration-api-integration.md`。
9. 提交信息使用清晰英文短句，例如 `Improve name scoring confidence`。

## AI 开发管理

本仓库已加入用于 Codex、Claude Code 和 Symphony 协作的管理文件：

- `WORKFLOW.md`：Symphony/Codex 工作流说明。它把本 README 设为项目最高优先级事实源，并规定任务执行、验证、文档同步和交付标准。
- `docs/AI_DEVELOPMENT_GOVERNANCE.md`：AI 开发治理说明，定义 Symphony、Codex、Claude Code 和人工维护者的分工。
- `.github/ISSUE_TEMPLATE/1518-task.yml`：GitHub 任务模板，用于把需求写成 AI 可执行任务。
- `.github/pull_request_template.md`：PR 模板，用于检查 README、文档、验证命令、移动端、英文模式和传统文化/官方数据边界。

当前上游 Symphony 规格默认使用 Linear 作为任务追踪入口。如果后续使用 Symphony 统一调度本项目，建议先保持 GitHub 作为代码与文档事实源，Linear 作为任务队列；若希望完全使用 GitHub Issues 作为任务入口，需要为 Symphony 增加 GitHub Issues tracker adapter。

## 常用操作

### 查看状态

```bash
git status --short
git log --oneline -5
```

### 本地启动

```bash
python3 -m http.server 8158
```

### 访问页面

```text
http://127.0.0.1:8158/
http://127.0.0.1:8158/?lang=en
http://127.0.0.1:8158/about.html
```

### JS 语法检查

```bash
node --check assets/app.js
node --check assets/name-engine.js
node --check assets/company-name-test.js
node --check assets/columns-tools.js
node --check assets/i18n.js
```

### Diff 格式检查

```bash
git diff --check
```

### 搜索代码

```bash
rg "关键词"
rg -n "函数名|文案|选择器" assets index.html about.html
rg --files
```

### 移动端截图检查

```bash
mkdir -p /tmp/1518-check
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --no-first-run \
  --no-default-browser-check \
  --user-data-dir=/tmp/1518-check/profile \
  --window-size=390,844 \
  --screenshot=/tmp/1518-check/home-mobile.png \
  "http://127.0.0.1:8158/?t=mobile-check"
```

英文移动端：

```bash
mkdir -p /tmp/1518-check-en
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --no-first-run \
  --no-default-browser-check \
  --user-data-dir=/tmp/1518-check-en/profile \
  --window-size=390,844 \
  --screenshot=/tmp/1518-check-en/home-mobile-en.png \
  "http://127.0.0.1:8158/?lang=en&t=mobile-check"
```

### 样本回归

姓名测试关键样本：

- 输入：`王小明`
- 期望五格：`天格 5 / 人格 7 / 地格 11 / 外格 9 / 总格 15`
- 缺少出生日期或时辰时，不应生成四柱八字。

可用 Node 做轻量检查：

```bash
node <<'NODE'
const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync('assets/name-engine.js', 'utf8');
const context = {
  window: {
    NameSharedData: {
      NUMEROLOGY: {},
      LEVELS: {},
      COMMON_STROKES: { 小: 3 }
    }
  },
  console
};
vm.runInNewContext(code, context);
const r = context.window.NameEngine.build({
  fullName: '王小明',
  birthDate: '',
  birthHour: '',
  birthPlace: ''
});
console.log({
  sky: r.sky,
  person: r.person,
  earth: r.earth,
  outer: r.outer,
  total: r.totalGrid,
  bazi: !!r.bazi,
  confidence: r.confidence
});
NODE
```

### 提交和推送

```bash
git add README.md assets/name-engine.js
git commit -m "Improve project documentation"
git push
```

提交前请确保：

- `git diff --check` 通过。
- 修改过的 JS 文件都通过 `node --check`。
- 改动涉及 UI 时，至少检查一次手机端。
- 改动涉及英文站时，检查 `?lang=en`。
- 改动涉及算法时，更新相关 docs。
- 改动涉及缓存资源时，更新脚本或样式版本号。

## GitHub Pages 部署

如果启用 GitHub Pages，建议设置：

- Source：Deploy from a branch
- Branch：`main`
- Folder：`/root`

启用后访问地址通常为：

```text
https://sinofate.github.io/1518-website/
```

如果绑定正式域名 `1518.com`，需要在 GitHub Pages 中配置 Custom domain，并在域名 DNS 添加相应记录。

## 资源版本号规则

本项目没有构建工具，所以通过查询参数控制浏览器缓存。

示例：

```html
<script src="./assets/name-engine.js?v=accuracy-90-20260602"></script>
<link rel="stylesheet" href="./assets/styles.css?v=visual-premium-20260602">
```

修改以下文件后建议更新版本号：

- `assets/styles.css`
- `assets/app.js`
- `assets/name-engine.js`
- `assets/company-name-test.js`
- `assets/columns-tools.js`
- `assets/i18n.js`

版本号建议格式：

```text
功能名-日期
```

例如：

```text
accuracy-90-20260602
visual-premium-20260602
```

## 测算准确性说明

当前版本已经把测算准确性提升到静态站可实现范围内的较高水平：

- 姓名测试不再用默认日期伪造八字。
- 缺少出生日期或时辰时，八字项自动降为保守参考。
- 报告显示测算置信度。
- 五格数理使用本地康熙笔画库和常用字补充库。
- 生僻字、估算笔画、重复字、负面字义、生肖偏旁冲突会影响评分。
- 公司名会自动抽取商号简称，避免把地域、行业词、组织形式混入商号格。
- 公司和品牌测算加入显著性、限制词、通用词、长度、行业适配和注册预查风险。

仍需注意：传统姓名学、易经数理、生肖、星座、风水、号码测算等内容属于传统文化和民俗参考，不构成法律、医学、财务、商业决策或人生决策建议。

## 注册核验与真实数据源

当前静态站已提供本地预审规则和官方核验入口，但没有直接连接工商、商标或企业数据库。

建议下一阶段接入：

- 国家企业信用信息公示系统相关查询入口。
- 国家市场监管总局企业名称申报系统。
- 国家知识产权局商标检索系统。
- 合规第三方企业数据接口。
- 合规第三方商标近似检索接口。

正式工商核名、商标注册和法律可注册性，必须以官方申报、检索和审查结果为准。

## 质量检查清单

每次修改完成后，根据改动范围选择检查：

```bash
node --check assets/app.js
node --check assets/name-engine.js
node --check assets/company-name-test.js
node --check assets/columns-tools.js
node --check assets/i18n.js
git diff --check
```

人工检查：

- 首页是否仍然优先展示姓名测试和公司名测试。
- 中文导航是否保持 5 个主按钮。
- 英文主导航是否保持一行展示。
- 手机端是否无横向溢出。
- Logo 是否显示 `1518.com` 和 Slogan `权威测名网站`。
- 页面底部是否保留权威标注。
- 测算结果是否有边界说明。
- Agent 文件是否仍可访问。

## 后续路线

- 接入全量康熙字典笔画库。
- 接入多音字、拼音、方言谐音和避讳库。
- 接入字义库、诗词出处库和名人同名库。
- 接入工商名称近似检索和商标近似检索。
- 接入真实域名可用性查询。
- 完善英文站全部栏目文案。
- 接入真实星历库后再输出完整星盘。
- 建立后端 API、数据库和用户报告保存能力。

## 版权与边界

本项目代码和页面结构为当前开发版本原创实现。若未来迁移原站内容、素材、数据库或历史用户数据，需要确认相应授权和合规边界。

测算内容仅作为传统文化参考和命名灵感工具，不替代专业意见。
