// 姓名分析引擎 — executes the website's REAL name-engine.js in a Node sandbox.
//
// Instead of re-implementing the scoring (which drifts whenever the site's
// calcNameQuality / calcConfidence / calcSound / weights change), we run the
// vendored copy of assets/name-engine.js verbatim with the same globals the
// browser provides (Solar, NameSharedData, KANGXI_DB). Output is therefore
// byte-identical to the website by construction.
//
// Parity sample: 王小明 1990-06-15 午时 -> 五格 5/7/11/9/15, 八字 庚午壬午辛亥甲午.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import vm from "node:vm";
import { Solar, Lunar } from "lunar-javascript";
import { NUMEROLOGY, LEVELS, COMMON_STROKES } from "./data.js";
import { KANGXI_DB } from "./kangxi-db.js";

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(resolve(here, "site-name-engine.js"), "utf8");

// Reproduce the browser globals the engine reads.
const sandboxWindow = { Solar, Lunar, NameSharedData: { NUMEROLOGY, LEVELS, COMMON_STROKES }, KANGXI_DB };
vm.runInNewContext(src, { window: sandboxWindow, console }, { filename: "site-name-engine.js" });
const NameEngine = sandboxWindow.NameEngine;
if (!NameEngine || typeof NameEngine.build !== "function") {
  throw new Error("site-name-engine.js did not expose window.NameEngine.build");
}

function getGrade(score) {
  if (score >= 92) return "优秀";
  if (score >= 86) return "大吉";
  if (score >= 80) return "吉";
  if (score >= 70) return "中吉";
  return "待优化";
}

export function analyzeName(data) {
  const cleaned = Array.from(String(data.fullName || "").trim()).filter((c) => /[㐀-鿿]/u.test(c));
  if (cleaned.length < 2) throw new Error("请输入 2-8 个中文姓名。");

  // Normalize across the vm realm boundary so results are plain main-realm objects
  // (vm-realm arrays/objects carry foreign prototypes that break deepStrictEqual).
  const r = JSON.parse(JSON.stringify(NameEngine.build(data))); // the site's exact computation
  const estimated = r.strokes.filter((s) => s.source === "缺字估算").map((s) => s.char);
  return {
    fullName: r.fullName,
    surname: r.surname,
    given: r.given,
    gender: data.reportGender || null,
    birthDate: data.birthDate || null,
    birthHour: data.birthHour || null,
    birthPlace: data.birthPlace || null,
    total: r.total,
    grade: getGrade(r.total),
    confidence: r.confidence,
    scores: r.scores,
    grids: r.gridRows.map((g) => ({ label: g.label, number: g.number, element: g.element, level: g.numerology.level, title: g.numerology.title, meaning: g.meaning })),
    strokes: r.strokes,
    bazi: r.bazi, // null when birth date/hour missing — site does not fabricate
    sancai: r.sancai,
    elementFit: r.elementFit,
    sound: r.sound,
    quality: r.quality ? { commonScore: r.quality.commonScore, zodiacScore: r.quality.zodiacScore, notes: r.quality.notes } : null,
    accuracy: {
      strokesEstimated: estimated,
      note: estimated.length
        ? `字符 ${estimated.join("、")} 不在本地康熙笔画库中，按 10 画估算，五格结果可能有偏差。`
        : "全部用字命中本地康熙笔画库。",
    },
    baziNote: r.bazi ? undefined : "未提供完整出生日期/时辰，按站点规则不排八字（不伪造四柱）。",
    disclaimer: "结果为传统文化与命名参考，非命运预测或专业建议。",
  };
}
