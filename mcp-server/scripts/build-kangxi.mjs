// build-kangxi.mjs — 生成 3000+ 字的康熙笔画共用数据表，回灌站点 + MCP。
//
// 数据来源（权威、可复现）：
//   1. Unicode Unihan 14.0 的 kRSKangXi —— 字在《康熙字典》中的「部首.部首外笔画」索引，
//      用 214 部首的标准笔画 + 部首外笔画还原出康熙总笔画（自带氵→水4、艹→艸6 等部首还原）。
//   2. OpenCC STCharacters —— 简体→繁体映射（五格按繁体康熙笔画计）。
//   3. 字集：GB2312（6763 常用字）∪ 站点已有字。
//
// 合并策略：**站点已有值优先**（保证与线上逐项一致 / 100% parity），仅对新字写入推导值；
// 所有"推导值 ≠ 站点值"的分歧都写进 data/kangxi-report.json 供人工复核（不静默改既有值）。
//
// 运行：cd mcp-server && node scripts/build-kangxi.mjs
// 依赖：curl、unzip（macOS/Linux 自带）。缓存于 scripts/.cache/。
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { KANGXI_STROKES, COMMON_STROKES } from "../src/engine/data.js";

const here = dirname(fileURLToPath(import.meta.url));
const cache = resolve(here, ".cache");
const assetsOut = resolve(here, "../../assets/kangxi-strokes.js");
const reportOut = resolve(here, "../data/kangxi-report.json");
if (!existsSync(cache)) mkdirSync(cache, { recursive: true });
if (!existsSync(resolve(here, "../data"))) mkdirSync(resolve(here, "../data"), { recursive: true });

const cp = (hex) => String.fromCodePoint(parseInt(hex.replace("U+", ""), 16));

// ---- 1. ensure data deps (download + cache) ----
function ensure(file, fetchCmd) {
  const p = resolve(cache, file);
  if (existsSync(p)) return p;
  console.error(`fetching ${file} ...`);
  execSync(fetchCmd, { cwd: cache, stdio: ["ignore", "ignore", "inherit"] });
  if (!existsSync(p)) throw new Error(`failed to obtain ${file}`);
  return p;
}
const rskFile = ensure(
  "Unihan_RadicalStrokeCounts.txt",
  "curl -sSL -o U14.zip https://www.unicode.org/Public/14.0.0/ucd/Unihan.zip && unzip -o U14.zip Unihan_RadicalStrokeCounts.txt >/dev/null && rm -f U14.zip"
);
const stFile = ensure(
  "STCharacters.txt",
  "curl -sSL -o STCharacters.txt https://raw.githubusercontent.com/BYVoid/OpenCC/master/data/dictionary/STCharacters.txt"
);

// ---- 2. canonical Kangxi-radical stroke table (derived from standard stroke-group ranges) ----
const RANGES = [[1,6,1],[7,29,2],[30,60,3],[61,94,4],[95,117,5],[118,146,6],[147,166,7],[167,175,8],[176,186,9],[187,194,10],[195,200,11],[201,204,12],[205,208,13],[209,210,14],[211,211,15],[212,213,16],[214,214,17]];
const radStroke = {};
for (const [a, b, s] of RANGES) for (let r = a; r <= b; r++) radStroke[r] = s;

// ---- 3. parse sources ----
const rsk = new Map(); // char -> "radical.residue"
for (const line of readFileSync(rskFile, "utf8").split("\n")) {
  if (line.startsWith("#") || !line.includes("kRSKangXi")) continue;
  const [code, , val] = line.split("\t");
  rsk.set(cp(code), val.trim().split(" ")[0].replace(/[^0-9.]/g, ""));
}
const s2t = new Map(); // simplified -> traditional (OpenCC, first value)
for (const line of readFileSync(stFile, "utf8").split("\n")) {
  if (!line.trim() || !line.includes("\t")) continue;
  const [s, tvals] = line.split("\t");
  if (s && tvals) s2t.set(s, tvals.trim().split(" ")[0]);
}

// 五格惯例：一至十按数目计；王作姓名字按 4 画（部首玉=5 仅用于合体字）。
const OVERRIDE = { 一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9,十:10, 王:4 };

function deriveKangxi(char) {
  if (OVERRIDE[char] != null) return { value: OVERRIDE[char], source: "五格惯例" };
  const t = s2t.get(char) || char;
  const rs = rsk.get(t) || rsk.get(char);
  if (!rs) return null;
  const [r, residue] = rs.split(".").map(Number);
  if (radStroke[r] == null || !Number.isFinite(residue)) return null;
  return { value: radStroke[r] + residue, source: t === char ? "康熙(本字)" : `康熙(繁体${t})` };
}

// ---- 4. character universe ∪ site chars ----
// CHARSET=gbk（默认，约2万字，含 玥/璟/喆 等起名生僻字）| gb2312（约6763字，更精简）
const dec = new TextDecoder("gb18030");
const charset = new Set();
const leanGB2312 = process.env.CHARSET === "gb2312";
const leadStart = leanGB2312 ? 0xB0 : 0x81;
const trailStart = leanGB2312 ? 0xA1 : 0x40;
for (let lead = leadStart; lead <= 0xFE; lead++)
  for (let trail = trailStart; trail <= 0xFE; trail++) {
    if (trail === 0x7F) continue;
    const ch = dec.decode(Uint8Array.of(lead, trail));
    if (ch.length === 1 && /[一-鿿]/.test(ch)) charset.add(ch);
  }
const site = { ...COMMON_STROKES, ...KANGXI_STROKES }; // KANGXI_STROKES wins on overlap
Object.keys(site).forEach((c) => charset.add(c));

// ---- 5. merge: existing site value wins; new chars take derived value ----
const db = {};
const meta = {};
const conflicts = [];
let fromSite = 0, derived = 0, unresolved = [];
for (const char of [...charset].sort()) {
  const ex = site[char];
  const dv = deriveKangxi(char);
  if (ex != null) {
    db[char] = ex; meta[char] = "站点已有"; fromSite++;
    if (dv && dv.value !== ex) conflicts.push({ char, site: ex, derived: dv.value, source: dv.source });
  } else if (dv) {
    db[char] = dv.value; meta[char] = dv.source; derived++;
  } else {
    unresolved.push(char);
  }
}

// ---- 6. emit shared table + report ----
const sortedEntries = Object.keys(db).sort().map((c) => `${JSON.stringify(c)}:${db[c]}`);
const js = `// AUTO-GENERATED by mcp-server/scripts/build-kangxi.mjs — do not edit by hand.
// 共用康熙笔画表（站点 + MCP）。来源：Unihan 14.0 kRSKangXi + OpenCC STCharacters + GB2312 字集。
// 站点已有值优先；推导值见 mcp-server/data/kangxi-report.json。
// 字数：${Object.keys(db).length}（站点已有 ${fromSite} + 新增推导 ${derived}）。
const KANGXI_DB = {${sortedEntries.join(",")}};
if (typeof window !== "undefined") window.KANGXI_DB = KANGXI_DB;
if (typeof module !== "undefined") module.exports = KANGXI_DB;
`;
writeFileSync(assetsOut, js, "utf8");

const report = {
  generatedFrom: { unihan: "14.0 kRSKangXi", opencc: "STCharacters", charset: "GB2312 (6763) ∪ site" },
  policy: "existing site values win; derived values fill new chars; conflicts listed for review",
  counts: { total: Object.keys(db).length, fromSite, derived, unresolved: unresolved.length, conflicts: conflicts.length },
  unresolvedChars: unresolved,
  conflicts,
};
writeFileSync(reportOut, JSON.stringify(report, null, 2), "utf8");

console.log(`✅ wrote ${assetsOut}`);
console.log(`   total ${report.counts.total} chars = site ${fromSite} + derived ${derived}`);
console.log(`   conflicts (site≠derived, site kept): ${conflicts.length}  | unresolved: ${unresolved.length}`);
console.log(`   report -> ${reportOut}`);
