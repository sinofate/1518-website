// 公司名分析引擎 — faithful Node port of assets/company-name-test.js diagnose()
// (accuracy-90 baseline). 易经数理(81) + 行业吉数适配(全称/商号双取) + 商号自动抽取
// + 传播结构 + 禁限词/敏感行业/组织形式风险。与站点同一套打分公式与数据。
import { INDUSTRIES, NUMEROLOGY, LEVELS } from "./data.js";
import { cleanChinese, strokeOf, strokeInfo } from "./strokes.js";

export const INDUSTRY_KEYS = Object.keys(INDUSTRIES);

function normalize81(total) {
  if (total <= 0) return 1;
  const mod = total % 81;
  return mod === 0 ? 81 : mod;
}

function calc(chars) {
  const total = chars.reduce((sum, c) => sum + strokeOf(c), 0);
  return { total, number: normalize81(total) };
}

function levelOf(number) {
  return LEVELS[NUMEROLOGY[number][1]];
}

function industryFit(number, industry) {
  if (industry.best.includes(number)) return { label: "高度契合", tone: "good", text: `该数理正好位于 ${industry.name} 的优先吉数池，容易把行业优势转化为品牌势能。` };
  if (industry.avoid.includes(number)) return { label: "需要调和", tone: "bad", text: `该数理属于 ${industry.name} 的需谨慎数，长期使用可能放大赛道短板；可通过商号用字、品牌简称和经营定位来补强。` };
  const level = levelOf(number);
  if (level.className === "good") return { label: "基本可用", tone: "mid", text: "数理本身偏吉，但不是本行业的最优解，可通过商号、子品牌或传播口径补强。" };
  return { label: "需要谨慎", tone: "bad", text: "数理与行业没有形成明显加分，若用于核心主体，建议再做候选名对比。" };
}

const INDUSTRY_WORDS = {
  ai: /智|云|数|元|星|启|达/u,
  finance: /信|金|衡|瑞|恒|稳|策/u,
  realestate: /城|安|筑|坤|泰|合|承/u,
  media: /星|云|火|声|影|播|达/u,
  consumer: /禾|味|安|悦|合|鲜|暖/u,
  health: /知|书|森|清|安|仁|和/u,
  crossborder: /远|达|通|海|辰|航|瑞/u,
  chain: /合|联|达|元|盛|瑞|众/u,
  consulting: /策|知|衡|明|和|信|达/u,
  legacy: /安|泰|和|承|德|恒|瑞/u,
};

const INFER_INDUSTRY_WORDS = ["科技", "信息", "网络", "互联网", "智能", "数据", "传媒", "文化", "电子商务", "贸易", "商贸", "投资", "资产管理", "金融", "财税", "建筑", "工程", "地产", "实业", "餐饮", "食品", "教育", "培训", "健康", "康养", "医疗", "咨询", "服务"];

function cleanName(value) {
  return Array.from(String(value || "").trim()).filter((char) => /[㐀-鿿]/.test(char));
}

function inferTradeName(companyName, industryKey) {
  const industry = INDUSTRIES[industryKey];
  let text = String(companyName || "").replace(/(有限责任公司|股份有限公司|集团有限公司|有限公司|股份公司|集团)$/u, "");
  text = text.replace(/^(中国|中华|全国|国际|北京|上海|天津|重庆|深圳|广州|杭州|南京|成都|武汉|西安|苏州|香港|广东|浙江|江苏|山东|福建|四川|湖北|湖南|河南|河北|陕西|广西)/u, "");
  INFER_INDUSTRY_WORDS.forEach((word) => { text = text.replace(new RegExp(word, "gu"), ""); });
  if (industry?.name) {
    industry.name.split(/[ /]+/).filter((word) => word.length >= 2).forEach((word) => { text = text.replace(new RegExp(word, "gu"), ""); });
  }
  const chars = cleanName(text).join("");
  return chars || cleanName(companyName).slice(0, 4).join("");
}

function structureFit(companyName, shortName, industryKey) {
  const length = cleanName(shortName).length;
  const lengthScore = length >= 2 && length <= 4 ? 92 : length === 5 ? 82 : length === 1 ? 58 : 64;
  const restricted = /(中国|中华|国家|全国|国际|集团|银行|证券|保险|大学|医院|协会|中心)/u.test(companyName);
  const sensitive = /(金融|证券|保险|医疗|医药|教育|基金|支付|征信|拍卖|典当|劳务派遣)/u.test(companyName);
  const suffixOk = /(有限公司|有限责任公司|股份有限公司|集团有限公司)$/u.test(companyName);
  const elementScore = INDUSTRY_WORDS[industryKey]?.test(shortName) ? 92 : 76;
  const riskPenalty = (restricted ? 14 : 0) + (sensitive ? 10 : 0) + (suffixOk ? 0 : 6) + (length === 1 ? 8 : 0);
  const riskText = [
    restricted ? "含需资质或人工复核词" : "",
    sensitive ? "涉及敏感行业词" : "",
    suffixOk ? "" : "组织形式不完整",
    length === 1 ? "商号过短" : "",
  ].filter(Boolean).join("；") || "未见明显禁限词";
  return { lengthScore, elementScore, riskPenalty, riskText, suffixOk };
}

export function analyzeCompanyName({ companyName, industry: industryKey, shortName }) {
  const industry = INDUSTRIES[industryKey];
  if (!companyName || !companyName.trim()) throw new Error("请输入公司名。");
  if (!industry) throw new Error(`请选择有效行业，可选：${INDUSTRY_KEYS.join(", ")}`);
  const provided = shortName && shortName.trim();
  const short = provided || inferTradeName(companyName, industryKey);
  const fullChars = cleanName(companyName);
  const shortChars = cleanName(short);
  const full = calc(fullChars);
  const shortCalc = calc(shortChars);
  const fullRow = NUMEROLOGY[full.number];
  const shortRow = NUMEROLOGY[shortCalc.number];
  const fullLevel = levelOf(full.number);
  const shortLevel = levelOf(shortCalc.number);
  const fullFit = industryFit(full.number, industry);
  const shortFit = industryFit(shortCalc.number, industry);
  const fit = shortFit.tone === "good" || fullFit.tone !== "good" ? shortFit : fullFit;
  const structure = structureFit(companyName, short, industryKey);
  const industryScore = fit.tone === "good" ? 92 : fit.tone === "mid" ? 80 : 58;
  const stabilityScore = Math.round((fullLevel.score + shortLevel.score) / 2);
  const totalScore = Math.max(8, Math.min(100, Math.round(
    fullLevel.score * 0.30 + shortLevel.score * 0.25 + industryScore * 0.18 +
    structure.elementScore * 0.10 + structure.lengthScore * 0.10 + stabilityScore * 0.07 - structure.riskPenalty
  )));
  const estimated = fullChars.map((c) => ({ c, ...strokeInfo(c) })).filter((x) => x.estimated).map((x) => x.c);
  return {
    companyName: companyName.trim(),
    shortName: short,
    shortNameInferred: !provided,
    industry: industry.name,
    industryElement: industry.element,
    totalScore,
    grade: fullLevel.label,
    fullName: { strokes: full.total, number: full.number, title: fullRow[0], level: fullLevel.label, score: fullLevel.score, text: fullRow[2], advice: fullRow[3] },
    tradeName: { strokes: shortCalc.total, number: shortCalc.number, title: shortRow[0], level: shortLevel.label, score: shortLevel.score, text: shortRow[2] },
    industryFit: { ...fit, industryScore, bestNumbers: industry.best, avoidNumbers: industry.avoid, advice: industry.advice },
    spread: { lengthScore: structure.lengthScore, elementScore: structure.elementScore, stabilityScore },
    risk: { penalty: structure.riskPenalty, text: structure.riskText, suffixOk: structure.suffixOk, needsReview: structure.riskPenalty > 0 },
    accuracy: { strokesEstimated: estimated, note: estimated.length ? `字符 ${estimated.join("、")} 按 10 画估算，可逐字校正。` : "全部用字命中本地笔画库。" },
    disclaimer: "数理仅供命名灵感与初步风险排查；能否注册以工商核名、商标检索与官方审查为准。",
  };
}
