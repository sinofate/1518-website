// 工商/商标预查 — 本地规则预审（非官方核名）。对应 about.html 描述的“静态站本地规则
// 预审：行政区划、组织形式、禁限词、敏感行业、商标显著性、通用词”。
// 边界：仅降低重名/近似/禁限词风险，能否注册以官方受理、检索、审查为准。

const ADMIN_REGIONS = ["北京", "上海", "天津", "重庆", "广州", "深圳", "杭州", "南京", "成都", "武汉", "西安", "苏州", "广东", "江苏", "浙江", "山东", "四川", "福建", "湖北", "湖南", "河南", "河北", "安徽", "辽宁", "陕西", "中国", "中华"];
const ORG_SUFFIXES = ["有限责任公司", "股份有限公司", "有限公司", "集团有限公司", "集团", "合伙企业", "个人独资企业", "中心", "工作室", "事务所"];
const FORBIDDEN_WORDS = ["中国", "中华", "全国", "国家", "国际", "最高", "央", "人民"];
const LICENSED_INDUSTRY = [
  { re: /银行/, license: "银保监会" }, { re: /证券|期货/, license: "证监会" },
  { re: /保险/, license: "银保监会" }, { re: /基金管理/, license: "证监会" },
  { re: /大学|学院/, license: "教育主管部门" }, { re: /医院/, license: "卫健委" },
  { re: /小额贷款|融资担保|交易所/, license: "地方金融监管" },
];
// 商标显著性：通用词 / 描述性词缺乏显著性
const GENERIC_TERMS = ["科技", "网络", "信息", "服务", "实业", "商贸", "贸易", "电子", "数字", "智能", "优选", "优品", "严选", "旗舰", "官方", "正品"];

function splitCompanyName(name) {
  const clean = name.trim();
  const region = ADMIN_REGIONS.find((r) => clean.startsWith(r)) || null;
  const suffix = ORG_SUFFIXES.find((s) => clean.endsWith(s)) || null;
  let core = clean;
  if (region) core = core.slice(region.length);
  if (suffix) core = core.slice(0, core.length - suffix.length);
  return { region, suffix, core: core.trim() };
}

export function companyRegistryPrecheck({ name }) {
  if (!name || !name.trim()) throw new Error("请输入公司名(name)。");
  const { region, suffix, core } = splitCompanyName(name);
  const flags = [];
  if (!suffix) flags.push({ level: "warn", code: "no_org_form", msg: "未识别到标准组织形式（如“有限公司/集团”），工商名称需含组织形式。" });
  if (!core || core.length < 2) flags.push({ level: "error", code: "weak_core", msg: "字号过短或缺失，需 2 字以上具显著性的字号。" });
  // 禁限词须对整名检查：冠以“中国/中华/全国/国家/国际”等即便作为前缀，也需国务院级核准。
  const forbidden = FORBIDDEN_WORDS.filter((w) => name.includes(w));
  if (forbidden.length) flags.push({ level: "error", code: "forbidden_word", msg: `名称含禁限词 ${forbidden.join("、")}，需国务院/总局级别核准。` });
  const licensed = LICENSED_INDUSTRY.filter((x) => x.re.test(name)).map((x) => x.license);
  if (licensed.length) flags.push({ level: "warn", code: "licensed_industry", msg: `含敏感行业表述，需前置许可：${[...new Set(licensed)].join("、")}。` });
  const verdict = flags.some((f) => f.level === "error") ? "高风险" : flags.length ? "需注意" : "结构合规";
  return {
    input: name.trim(),
    parsed: { region, core, organizationForm: suffix },
    verdict,
    flags,
    nextSteps: [
      "在国家企业信用信息公示系统检索同行政区划+同行业的近似字号。",
      "字号显著性不足时，更换为臆造词或独特组合以降低驳回率。",
    ],
    officialCheck: "https://www.gsxt.gov.cn/",
    disclaimer: "本地规则预审，非工商核名承诺；最终以登记机关核准为准。",
  };
}

export function trademarkPrecheck({ name, trademarkClass }) {
  if (!name || !name.trim()) throw new Error("请输入品牌/商标名(name)。");
  const clean = name.trim();
  const flags = [];
  const region = ADMIN_REGIONS.find((r) => clean.includes(r));
  if (region) flags.push({ level: "warn", code: "geo_name", msg: `含县级以上行政区划名“${region}”，作为商标显著部分通常不予注册。` });
  const generic = GENERIC_TERMS.filter((t) => clean.includes(t));
  const coreLen = clean.replace(new RegExp(GENERIC_TERMS.join("|"), "g"), "").trim().length;
  if (generic.length && coreLen < 2) flags.push({ level: "error", code: "no_distinctiveness", msg: `主要由通用/描述性词（${generic.join("、")}）构成，缺乏显著性。` });
  else if (generic.length) flags.push({ level: "info", code: "generic_part", msg: `含通用词 ${generic.join("、")}，显著性主要由其余部分承担。` });
  if (clean.length <= 1) flags.push({ level: "warn", code: "too_short", msg: "单字商标显著性与可保护性较弱。" });
  const distinctiveness = flags.some((f) => f.level === "error") ? "弱" : flags.some((f) => f.level === "warn") ? "中" : "较强";
  return {
    input: clean,
    trademarkClass: trademarkClass || null,
    distinctiveness,
    flags,
    nextSteps: [
      "在中国商标网按读音/字形/含义做近似检索（同类别+关联类别）。",
      trademarkClass ? `确认第 ${trademarkClass} 类是否覆盖实际经营，必要时跨类布局。` : "先确定核心商品/服务对应的尼斯分类号。",
    ],
    officialCheck: "https://wcjs.sbj.cnipa.gov.cn",
    disclaimer: "本地显著性与禁用条款预审，非商标检索/审查结论；近似判断以商标局为准。",
  };
}
