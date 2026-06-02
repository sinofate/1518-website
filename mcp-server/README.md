# 1518 起名网 · MCP Server

把 1518 网站里**真实的**起名/测名引擎（五格剖象 + 八字 + 81 数理 + 行业适配 + 工商/商标预查）暴露成 **Agent 可调用**的 MCP 工具。这是 `/.well-known/mcp.json` 里那套"planned"工具的可运行实现——网站从"AI 可读"升级为"AI 可调用"。

算法**与站点同源，不漂移**：`scripts/extract-data.mjs` 从 `../assets/*.js` 字节级抽取数理/笔画/行业表（`src/engine/data.js`）并同步一份站点姓名引擎副本（`src/engine/site-name-engine.js`）。姓名工具在 Node 沙箱里**直接执行站点 `name-engine.js`**，评分按构造与网站逐项一致、随站点升级自动同步；公司工具按站点 `diagnose()` 同一公式移植并经样本回归核对。八字走与站点同款的 `lunar-javascript`。

**康熙笔画库已扩到约 2 万字**（`scripts/build-kangxi.mjs` 从 Unihan 14.0 `kRSKangXi` + OpenCC 简繁映射 + GBK 字集推导，回灌 `../assets/kangxi-strokes.js` 与 `src/engine/kangxi-db.js`，站点/MCP 共用）。详见根目录 `README.md` 的「批次2 详解」。`npm run build-kangxi` 重新生成（需联网，`CHARSET=gb2312` 出精简版）。

> 校验样本：`王小明 1990-06-15 午时` → 五格 `5/7/11/9/15`、八字 `庚午壬午辛亥甲午`、综合 `77` 分，与网站逐项一致（见 `npm test`）。

## 工具一览

| 工具 | 说明 | 算法真实性 |
|---|---|---|
| `run_name_test` | 姓名五格/三才/八字/喜用/音律 | ✅ 真实（同站点引擎 + lunar 排盘）|
| `run_company_name_test` | 公司全称/商号数理 + 行业适配 + 禁限词 | ✅ 真实（81 数理 + 10 行业库）|
| `run_zodiac_lookup` | 生肖/干支/纳音 + 六合三合六冲六害 | ✅ 真实（lunar + 固定关系表）|
| `run_company_registry_precheck` | 行政区划/组织形式/禁限词/敏感行业预审 | ✅ 本地规则（非官方核名）|
| `run_trademark_precheck` | 商标显著性/通用词/禁用条款预审 | ✅ 本地规则（非商标检索）|
| `search_1518_content` | 站内栏目检索 | ✅ |
| `list_1518_tools` / `get_1518_tool_schema` | 工具发现与 Schema | ✅ |

所有结果均带 `disclaimer` / `accuracy` 字段，明确"传统文化参考、非确定性预测"，缺字按 10 画估算时会在 `accuracy.strokesEstimated` 显式标注（不静默出错）。

## 安装与运行

```bash
cd mcp-server
npm install
npm test            # 15 项校验：引擎parity + stdio 端到端 MCP 往返

npm start           # stdio 传输（给 Claude Desktop / Claude Code）
npm run start:http  # HTTP 传输：POST http://localhost:8787/mcp（PORT 可改）
```

### 接入 Claude Code（stdio）

```bash
claude mcp add 1518-naming -- node /ABS/PATH/1518-website/mcp-server/src/server.js
```

或项目根放 `.mcp.json`：

```json
{
  "mcpServers": {
    "1518-naming": { "command": "node", "args": ["/ABS/PATH/1518-website/mcp-server/src/server.js"] }
  }
}
```

### 接入 Claude Desktop（stdio）

编辑 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "1518-naming": { "command": "node", "args": ["/ABS/PATH/1518-website/mcp-server/src/server.js"] }
  }
}
```

## 部署成 `https://www.1518.com/mcp`

`src/http.js` 是无状态 Streamable HTTP 实现，可放任意 Node 主机/容器后用反代把 `/mcp` 指过去。GitHub Pages 是纯静态、**跑不了**这个服务，需要一台能跑 Node 的机器（小 VPS / Serverless 容器即可）。

上线后再把站点 `/.well-known/mcp.json` 的 `status` 从 `planned` 改成 `live`、`recommendedEndpoint` 指向真实地址——**在真正可访问之前不要改**，保持与站点现有的"诚实边界"一致。

## 结构

```
mcp-server/
├── src/
│   ├── server.js        # stdio 入口
│   ├── http.js          # HTTP 入口（/mcp，可部署）
│   ├── build-server.js  # McpServer 工厂（两个入口共用）
│   ├── tools.js         # 工具注册表（zod schema + handler）
│   └── engine/          # name / company / zodiac / registry / strokes / data(自动生成)
├── scripts/extract-data.mjs   # 从站点 assets 抽取数据表
└── test/smoke.mjs       # 端到端测试
```
