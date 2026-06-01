# 1518.com 网站开发项目

1518.com 是一个面向中文用户的起名、测名和传统文化测算工具站。当前版本为静态前端实现，重点完成首页核心测算入口、姓名测试、公司名测试、品牌测试、个人起名、公司起名、移动端访问、SEO、Agent 可读文件和 GitHub 部署基础。

## 项目定位

- 目标域名：`1518.com`
- 项目类型：静态网站，可部署到 GitHub Pages、Cloudflare Pages、Nginx 或对象存储静态托管
- 核心体验：首页直接进入“姓名测试”和“公司名测试”，减少用户跳转成本
- 品牌定位：深耕在线测评 20 年，千万用户验证的权威姓名测试网站
- 产品顾问：孔力（又名孔令森），易医合参实战派易学顾问

## 当前功能

### 核心测算

- 姓名测试：五格数理、三才配置、八字喜用、用字五行、音韵节奏、生肖参考、常用度和测算置信度
- 公司名测试：公司全称、商号简称、所属行业、组织形式、行业适配、传播识别和风险扣分
- 品牌名测试：传播力、品类联想、数理参考、受众匹配和商标预查提醒
- 个人起名：按姓氏、性别、出生时间、五行补益和用字风险生成候选名
- 公司起名：按行业、地域、关键词和组织后缀生成候选公司名
- 品牌起名：按品类、用户、气质和商标类别生成候选品牌名

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

- 中文主站
- 英文模式，Slogan 为 `I Ching · Decide Your Path`
- 移动端无横向溢出检查
- 手机端主导航和副导航分层展示

### SEO 与 Agent 友好

- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `llms-full.txt`
- `ai-readiness.json`
- `mcp.json`
- `/.well-known/agent-tools.json`

这些文件用于帮助搜索引擎、AI Agent 和自动化工具理解站点入口、工具 schema、输入字段、输出结构和测算边界。

## 目录结构

```text
.
├── index.html
├── about.html
├── assets
│   ├── app.js
│   ├── columns-tools.js
│   ├── company-name-test.js
│   ├── i18n.js
│   ├── name-engine.js
│   ├── styles.css
│   └── vendor
│       └── lunar.js
├── docs
│   ├── algorithm-depth-upgrade-20260602.md
│   ├── algorithm-qa-report-20260602.md
│   ├── authority-visual-agent-upgrade-20260602.md
│   ├── registration-api-integration.md
│   └── references
├── llms.txt
├── llms-full.txt
├── robots.txt
└── sitemap.xml
```

## 本地预览

在项目根目录启动任意静态服务器即可：

```bash
python3 -m http.server 8158
```

然后访问：

```text
http://127.0.0.1:8158/
```

英文模式可访问：

```text
http://127.0.0.1:8158/?lang=en
```

## GitHub 部署

当前仓库：

```text
https://github.com/sinofate/1518-website
```

如果启用 GitHub Pages，建议设置：

- Source：Deploy from a branch
- Branch：`main`
- Folder：`/root`

启用后访问地址通常为：

```text
https://sinofate.github.io/1518-website/
```

如果绑定正式域名 `1518.com`，需要在 GitHub Pages 中配置 Custom domain，并在域名 DNS 添加相应记录。

## 测算准确性说明

当前版本已经把测算准确性提升到静态站可实现范围内的较高水平：

- 姓名测试不再用默认日期伪造八字
- 缺少出生日期或时辰时，八字项自动降为保守参考
- 报告显示测算置信度
- 五格数理使用本地康熙笔画库和常用字补充库
- 生僻字、估算笔画、重复字、负面字义、生肖偏旁冲突会影响评分
- 公司名会自动抽取商号简称，避免把地域、行业词、组织形式混入商号格
- 公司和品牌测算加入显著性、限制词、通用词、长度、行业适配和注册预查风险

仍需注意：传统姓名学、易经数理、生肖、星座、风水、号码测算等内容属于传统文化和民俗参考，不构成法律、医学、财务、商业决策或人生决策建议。

## 注册核验与真实数据源

当前静态站已提供本地预审规则和官方核验入口，但没有直接连接工商、商标或企业数据库。

建议下一阶段接入：

- 国家企业信用信息公示系统相关查询入口
- 国家市场监管总局企业名称申报系统
- 国家知识产权局商标检索系统
- 合规第三方企业数据接口
- 合规第三方商标近似检索接口

正式工商核名、商标注册和法律可注册性，必须以官方申报、检索和审查结果为准。

## 质量验证

已进行过的主要验证：

- JS 语法检查
- JSON / XML 可访问性检查
- 手机端与 PC 端浏览器回归
- 移动端无横向溢出检查
- 英文导航排版检查
- Agent 文件可访问检查
- 姓名测试样本回归：`王小明` 五格为 `5 / 7 / 11 / 9 / 15`

常用检查命令：

```bash
node --check assets/app.js
node --check assets/name-engine.js
node --check assets/company-name-test.js
node --check assets/columns-tools.js
node --check assets/i18n.js
git diff --check
```

## 后续路线

- 接入全量康熙字典笔画库
- 接入多音字、拼音、方言谐音和避讳库
- 接入字义库、诗词出处库和名人同名库
- 接入工商名称近似检索和商标近似检索
- 接入真实域名可用性查询
- 完善英文站全部栏目文案
- 接入真实星历库后再输出完整星盘
- 建立后端 API、数据库和用户报告保存能力

## 版权与边界

本项目代码和页面结构为当前开发版本原创实现。若未来迁移原站内容、素材、数据库或历史用户数据，需要确认相应授权和合规边界。

测算内容仅作为传统文化参考和命名灵感工具，不替代专业意见。
