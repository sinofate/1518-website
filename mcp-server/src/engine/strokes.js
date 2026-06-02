// Kangxi-stroke lookup. Mirrors the website's fallback chain exactly:
//   name-engine.js fallbackStroke(): KANGXI_STROKES -> COMMON_STROKES -> CJK?10 : 1
// so MCP results match the live site. `estimated` flags chars that fell back to
// the flat 10-stroke guess — these are the names whose 五格 the site cannot yet
// compute precisely (the Kangxi-coverage gap noted in docs/algorithm-qa-report).
import { KANGXI_STROKES, COMMON_STROKES, WUXING_BY_TAIL, CHAR_ELEMENT_HINTS } from "./data.js";
import { KANGXI_DB } from "./kangxi-db.js";

export function cleanChinese(value) {
  return Array.from(String(value || "").trim()).filter((ch) => /[㐀-鿿]/u.test(ch));
}

export function strokeInfo(char) {
  if (KANGXI_STROKES[char] != null) return { stroke: KANGXI_STROKES[char], source: "康熙笔画库" };
  if (COMMON_STROKES[char] != null) return { stroke: COMMON_STROKES[char], source: "常用字笔画库" };
  if (KANGXI_DB[char] != null) return { stroke: KANGXI_DB[char], source: "康熙笔画库(扩展)" };
  const code = char.codePointAt(0);
  if (code >= 0x4e00 && code <= 0x9fff) return { stroke: 10, source: "缺字估算", estimated: true };
  return { stroke: 1, source: "非常用字", estimated: true };
}

export function strokeOf(char) {
  return strokeInfo(char).stroke;
}

export function elementByGridNumber(number) {
  return WUXING_BY_TAIL[number % 10];
}

export function elementByChar(char) {
  if (CHAR_ELEMENT_HINTS[char]) return CHAR_ELEMENT_HINTS[char];
  const key = Object.keys(CHAR_ELEMENT_HINTS).find((k) => char.includes(k));
  return key ? CHAR_ELEMENT_HINTS[key] : elementByGridNumber(strokeOf(char));
}
