// Tool registry for the 1518 MCP server. Each tool declares a zod input shape
// and a handler returning a plain object (serialized to JSON for the agent).
import { z } from "zod";
import { analyzeName } from "./engine/name.js";
import { analyzeCompanyName, INDUSTRY_KEYS } from "./engine/company.js";
import { lookupZodiac } from "./engine/zodiac.js";
import { companyRegistryPrecheck, trademarkPrecheck } from "./engine/registry.js";

const BIRTH_HOURS = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"];

// Content catalog for search_1518_content (mirrors ai-readiness.json routes).
const CONTENT = [
  { id: "name-test", title: "姓名测试", url: "https://www.1518.com/#name-test", keywords: "姓名测试 姓名打分 五格 三才 八字 喜用 音律" },
  { id: "baby", title: "个人起名", url: "https://www.1518.com/#baby", keywords: "个人起名 宝宝起名 生辰八字 改名 五行" },
  { id: "company-test", title: "公司名测试", url: "https://www.1518.com/#company-test", keywords: "公司测名 企业测名 商号 行业适配 数理" },
  { id: "company", title: "公司起名", url: "https://www.1518.com/#company", keywords: "公司起名 企业起名 商号起名 取名" },
  { id: "brand", title: "品牌起名", url: "https://www.1518.com/#brand", keywords: "品牌起名 商标起名 店铺 产品 传播" },
  { id: "zodiac", title: "生肖查询", url: "https://www.1518.com/#zodiac", keywords: "生肖 属相 干支 纳音 六合三合" },
  { id: "dream", title: "周公解梦", url: "https://www.1518.com/#dream", keywords: "周公解梦 梦境 解梦" },
  { id: "astro", title: "星座查询", url: "https://www.1518.com/#astro", keywords: "星座 太阳星座 守护星" },
];

export const TOOLS = [
  {
    name: "run_name_test",
    title: "姓名测试",
    description: "对中文姓名做五格数理、三才配置、八字喜用神与音律分析，返回综合评分与各维度结构化结果。结果为传统文化参考，非命运预测。",
    inputSchema: {
      fullName: z.string().min(2).max(8).describe("中文姓名，2-8 字"),
      reportGender: z.enum(["男", "女"]).optional().describe("性别"),
      birthDate: z.string().regex(/^\d{4}-\d{1,2}-\d{1,2}$/).optional().describe("出生日期 YYYY-MM-DD，可选；缺省则不排八字（不伪造）"),
      birthHour: z.enum(BIRTH_HOURS).optional().describe("出生时辰，子时至亥时，可选；与出生日期同时提供才排八字"),
      birthPlace: z.string().optional().describe("出生地，可选"),
    },
    outputFields: ["total", "grade", "confidence", "scores", "grids(五格)", "bazi(八字,缺生辰为null)", "sancai(三才)", "elementFit(喜用)", "quality(用字吉凶/生肖偏旁)", "accuracy(缺字标注)"],
    handler: (a) => analyzeName(a),
  },
  {
    name: "run_company_name_test",
    title: "公司名测试",
    description: "对公司全称与商号简称做易经数理、行业吉数适配、商号传播结构与禁限词风险诊断，返回综合评分。能否注册以官方核名为准。",
    inputSchema: {
      companyName: z.string().min(2).describe("公司全称"),
      industry: z.enum(INDUSTRY_KEYS).describe(`所属行业，枚举：${INDUSTRY_KEYS.join("/")}`),
      shortName: z.string().optional().describe("商号简称，可选；缺省自动从全称抽取（去地域/行业/组织形式词）"),
    },
    outputFields: ["totalScore", "grade", "shortName(自动抽取)", "fullName(总格)", "tradeName(商号格)", "industryFit", "risk(禁限词/敏感行业/组织形式)", "accuracy"],
    handler: (a) => analyzeCompanyName(a),
  },
  {
    name: "run_zodiac_lookup",
    title: "生肖查询",
    description: "按年份或完整出生日期查询生肖、年干支、天干/地支五行、纳音及六合三合六冲六害关系。",
    inputSchema: {
      year: z.number().int().min(1900).max(2100).optional().describe("出生年份"),
      birthDate: z.string().regex(/^\d{4}-\d{1,2}-\d{1,2}$/).optional().describe("完整出生日期，更准确"),
    },
    outputFields: ["animal", "ganZhi", "element", "nayin", "relations(六合三合六冲六害)"],
    handler: (a) => lookupZodiac(a),
  },
  {
    name: "run_company_registry_precheck",
    title: "公司名工商预查",
    description: "本地规则预审公司名的行政区划、组织形式、禁限词与敏感行业风险。非工商核名，仅降低驳回与重名风险。",
    inputSchema: { name: z.string().min(2).describe("拟用公司全称") },
    outputFields: ["verdict", "parsed", "flags", "nextSteps", "officialCheck"],
    handler: (a) => companyRegistryPrecheck(a),
  },
  {
    name: "run_trademark_precheck",
    title: "商标显著性预查",
    description: "本地规则预审品牌/商标名的显著性、通用词与禁用条款（行政区划名等）。非商标检索/审查结论。",
    inputSchema: {
      name: z.string().min(1).describe("拟用品牌/商标名"),
      trademarkClass: z.string().optional().describe("尼斯分类号，可选，如 35"),
    },
    outputFields: ["distinctiveness", "flags", "nextSteps", "officialCheck"],
    handler: (a) => trademarkPrecheck(a),
  },
  {
    name: "search_1518_content",
    title: "站内内容检索",
    description: "在 1518 栏目目录中按关键词检索匹配的工具入口与 URL。",
    inputSchema: { query: z.string().min(1).describe("检索关键词") },
    outputFields: ["matches[{id,title,url}]"],
    handler: ({ query }) => {
      const q = String(query).toLowerCase();
      const matches = CONTENT.filter((c) => (c.title + " " + c.keywords).toLowerCase().includes(q))
        .map(({ id, title, url }) => ({ id, title, url }));
      return { query, count: matches.length, matches };
    },
  },
];

// Meta tools operate over the registry above.
export const META_TOOLS = [
  {
    name: "list_1518_tools",
    title: "列出 1518 工具",
    description: "返回本 MCP server 当前可调用的全部工具及简介。",
    inputSchema: {},
    outputFields: ["tools[{name,title,description}]"],
    handler: () => ({
      site: "1518 起名网",
      canonical: "https://www.1518.com/",
      count: TOOLS.length,
      tools: TOOLS.map((t) => ({ name: t.name, title: t.title, description: t.description })),
      boundary: "结果仅供传统文化、命名灵感与初步风险排查参考。",
    }),
  },
  {
    name: "get_1518_tool_schema",
    title: "获取工具 Schema",
    description: "按工具名返回其输入参数说明与输出字段。",
    inputSchema: { toolName: z.string().describe("工具名，如 run_name_test") },
    outputFields: ["name", "inputs", "outputFields"],
    handler: ({ toolName }) => {
      const t = TOOLS.find((x) => x.name === toolName);
      if (!t) throw new Error(`未知工具：${toolName}。可用：${TOOLS.map((x) => x.name).join(", ")}`);
      const inputs = Object.entries(t.inputSchema).map(([key, zt]) => ({
        name: key,
        type: zt._def?.typeName?.replace(/^Zod/, "").toLowerCase() || "string",
        required: !zt.isOptional?.(),
        description: zt.description || "",
      }));
      return { name: t.name, title: t.title, description: t.description, inputs, outputFields: t.outputFields };
    },
  },
];

export const ALL_TOOLS = [...META_TOOLS, ...TOOLS];
