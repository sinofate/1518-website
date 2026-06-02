// Smoke test: engine parity + real end-to-end MCP round-trip over stdio.
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { analyzeName } from "../src/engine/name.js";

const here = dirname(fileURLToPath(import.meta.url));
const serverPath = resolve(here, "../src/server.js");
let pass = 0;
const ok = (label) => { console.log("  ✓", label); pass++; };

// ---- 1. Engine parity with the live site (QA-report sample) ----
console.log("Engine parity:");
const wxm = analyzeName({ fullName: "王小明", reportGender: "男", birthDate: "1990-06-15", birthHour: "午时", birthPlace: "上海" });
const gridNums = wxm.grids.map((g) => g.number);
assert.deepEqual(gridNums, [5, 7, 11, 9, 15], `五格应为 5/7/11/9/15，实际 ${gridNums}`);
ok(`五格 ${gridNums.join("/")} 与站点一致`);
const pillars = wxm.bazi.pillars.map((p) => p.value).join(" ");
assert.equal(pillars, "庚午 壬午 辛亥 甲午", `八字应为 庚午壬午辛亥甲午，实际 ${pillars}`);
ok(`八字 ${pillars} 与站点一致`);
assert.equal(wxm.bazi.shengxiao, "马"); ok("生肖 马");
assert.equal(wxm.total, 79, `综合评分应为 79，实际 ${wxm.total}`); ok(`综合评分 ${wxm.total}（与站点逐项一致）`);

// 康熙大字库覆盖：玥/翔 原本缺字按 10 画估算，现应命中字库且五格正确
const lyx = analyzeName({ fullName: "林玥翔", reportGender: "女", birthDate: "2000-08-08", birthHour: "辰时" });
assert.deepEqual(lyx.grids.map((g) => g.number), [9, 17, 21, 13, 29]);
assert.equal(lyx.accuracy.strokesEstimated.length, 0, `林玥翔 不应有缺字，实际 ${lyx.accuracy.strokesEstimated}`);
ok(`林玥翔 五格 ${lyx.grids.map((g) => g.number).join("/")}，玥/翔 命中字库（缺字 0）`);

// 不伪造：缺出生日期/时辰时不排八字
const nb = analyzeName({ fullName: "王小明", reportGender: "男" });
assert.equal(nb.bazi, null, "缺生辰时 bazi 应为 null（不伪造四柱）");
ok(`缺生辰 -> 不排八字（bazi=null），评分 ${nb.total}`);

// ---- 2. End-to-end MCP round-trip ----
console.log("MCP server (stdio round-trip):");
const client = new Client({ name: "smoke", version: "1.0.0" });
const transport = new StdioClientTransport({ command: process.execPath, args: [serverPath] });
await client.connect(transport);

const { tools } = await client.listTools();
assert.ok(tools.length >= 8, `expected >=8 tools, got ${tools.length}`);
ok(`listTools -> ${tools.length} tools: ${tools.map((t) => t.name).join(", ")}`);

const call = async (name, args) => {
  const r = await client.callTool({ name, arguments: args });
  assert.ok(!r.isError, `${name} returned error: ${r.content?.[0]?.text}`);
  return JSON.parse(r.content[0].text);
};

const nameRes = await call("run_name_test", { fullName: "王小明", reportGender: "男", birthDate: "1990-06-15", birthHour: "午时" });
assert.deepEqual(nameRes.grids.map((g) => g.number), [5, 7, 11, 9, 15]);
ok(`run_name_test -> 评分 ${nameRes.total} (${nameRes.grade})`);

// 公司名测试 + 商号自动抽取（不传 shortName -> 应推出「未来」），与站点一致 total=93
const co = await call("run_company_name_test", { companyName: "北京未来智能科技有限公司", industry: "ai" });
assert.equal(co.shortName, "未来", `商号应自动抽取为 未来，实际 ${co.shortName}`);
assert.equal(co.shortNameInferred, true);
assert.equal(co.totalScore, 93, `公司综合评分应为 93（与站点一致），实际 ${co.totalScore}`);
ok(`run_company_name_test -> ${co.totalScore} 分，商号「${co.shortName}」(自动抽取)，总格 ${co.fullName.number}数(${co.fullName.title})`);

const zod = await call("run_zodiac_lookup", { year: 1990 });
assert.equal(zod.animal, "马"); assert.equal(zod.nayin, "路旁土");
ok(`run_zodiac_lookup 1990 -> ${zod.animal} ${zod.ganZhi} 纳音${zod.nayin} 六冲${zod.relations.六冲}`);

const reg = await call("run_company_registry_precheck", { name: "中国宇宙银行" });
assert.ok(reg.flags.some((f) => f.code === "forbidden_word"));
ok(`run_company_registry_precheck -> ${reg.verdict}（命中禁限词/敏感行业）`);

const tm = await call("run_trademark_precheck", { name: "优选科技", trademarkClass: "35" });
ok(`run_trademark_precheck -> 显著性 ${tm.distinctiveness}`);

const list = await call("list_1518_tools", {});
assert.equal(list.count, tools.length - 2); // list reports domain tools; listTools includes the 2 meta tools
ok(`list_1518_tools -> ${list.count} 工具`);

const schema = await call("get_1518_tool_schema", { toolName: "run_name_test" });
assert.ok(schema.inputs.find((i) => i.name === "fullName"));
ok(`get_1518_tool_schema -> ${schema.inputs.length} 个入参`);

const search = await call("search_1518_content", { query: "公司" });
assert.ok(search.count >= 1);
ok(`search_1518_content "公司" -> ${search.count} 命中`);

await client.close();
console.log(`\nAll ${pass} checks passed ✅`);
