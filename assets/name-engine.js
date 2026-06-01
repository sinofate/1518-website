(function () {
  const DOUBLE_SURNAMES = ["欧阳", "司马", "上官", "诸葛", "东方", "尉迟", "公孙", "慕容", "司徒", "南宫", "夏侯", "皇甫", "申屠", "公羊", "公冶", "梁丘", "闻人", "长孙", "宇文", "司空", "端木"];
  const WUXING_BY_TAIL = { 1: "木", 2: "木", 3: "火", 4: "火", 5: "土", 6: "土", 7: "金", 8: "金", 9: "水", 0: "水" };
  const SHENG = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
  const KE = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };
  const GAN_ELEMENT = { 甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土", 己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水" };
  const ZHI_ELEMENT = { 子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火", 午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水" };
  const KANGXI_STROKES = {
    王: 4, 李: 7, 张: 11, 張: 11, 刘: 15, 劉: 15, 陈: 16, 陳: 16, 杨: 13, 楊: 13, 黄: 12, 黃: 12, 赵: 14, 趙: 14, 吴: 7, 吳: 7, 周: 8, 徐: 10, 孙: 10, 孫: 10, 马: 10, 馬: 10, 朱: 6, 胡: 11, 郭: 15, 何: 7, 高: 10, 林: 8, 罗: 20, 羅: 20, 郑: 19, 鄭: 19, 梁: 11, 谢: 17, 謝: 17, 宋: 7, 唐: 10, 许: 11, 許: 11, 韩: 17, 韓: 17, 冯: 12, 馮: 12, 邓: 19, 鄧: 19, 曹: 11, 彭: 12, 曾: 12, 萧: 18, 蕭: 18, 田: 5, 董: 15, 袁: 10, 潘: 16, 于: 3, 於: 8, 蒋: 17, 蔣: 17, 蔡: 17, 余: 7, 杜: 7, 叶: 15, 葉: 15, 程: 12, 苏: 22, 蘇: 22, 魏: 18, 吕: 7, 呂: 7, 丁: 2, 任: 6, 沈: 8, 姚: 9, 卢: 16, 盧: 16, 姜: 9, 崔: 11, 钟: 17, 鍾: 17, 谭: 19, 譚: 19, 陆: 16, 陸: 16, 汪: 8, 范: 15, 金: 8, 石: 5, 廖: 14, 贾: 13, 賈: 13, 夏: 10, 韦: 9, 韋: 9, 付: 5, 方: 4, 白: 5, 邹: 17, 鄒: 17, 孟: 8, 熊: 14, 秦: 10, 邱: 12, 江: 7, 尹: 4,
    书: 10, 書: 10, 翰: 16, 子: 3, 文: 4, 明: 8, 华: 14, 華: 14, 国: 11, 國: 11, 伟: 11, 偉: 11, 强: 11, 強: 12, 芳: 10, 娜: 10, 敏: 11, 静: 16, 靜: 16, 丽: 19, 麗: 19, 艳: 24, 艷: 24, 勇: 9, 军: 9, 軍: 9, 磊: 15, 洋: 10, 艺: 21, 藝: 21, 玲: 10, 燕: 16, 霞: 17, 平: 5, 刚: 10, 剛: 10, 桂: 10, 丹: 4, 萍: 14, 俊: 9, 莉: 13, 亮: 9, 斌: 11, 超: 12, 秀: 7, 霞: 17, 慧: 15, 巧: 5, 美: 9, 慧: 15, 琳: 13, 雪: 11, 倩: 10, 颖: 16, 穎: 16, 璐: 17, 欣: 8, 瑶: 15, 瑤: 15, 怡: 9, 婧: 11, 婷: 12, 梦: 14, 夢: 14, 雅: 12, 昊: 8, 宇: 6, 轩: 10, 軒: 10, 泽: 17, 澤: 17, 宸: 10, 睿: 14, 铭: 14, 銘: 14, 晨: 11, 皓: 12, 远: 17, 遠: 17, 景: 12, 承: 8, 峻: 10, 若: 11, 汐: 7, 宁: 14, 寧: 14, 妍: 7, 悦: 11, 悅: 11, 晴: 12, 芷: 10, 安: 6, 清: 12, 诗: 13, 詩: 13, 嘉: 14, 言: 7, 乐: 15, 樂: 15, 星: 9, 知: 8, 予: 4, 南: 9, 之: 4, 云: 12, 雲: 12, 禾: 5, 然: 12
  };
  const ZHI_HIDDEN = {
    子: ["癸"],
    丑: ["己", "癸", "辛"],
    寅: ["甲", "丙", "戊"],
    卯: ["乙"],
    辰: ["戊", "乙", "癸"],
    巳: ["丙", "庚", "戊"],
    午: ["丁", "己"],
    未: ["己", "丁", "乙"],
    申: ["庚", "壬", "戊"],
    酉: ["辛"],
    戌: ["戊", "辛", "丁"],
    亥: ["壬", "甲"]
  };
  const CHAR_ELEMENT_HINTS = {
    氵: "水", 水: "水", 冫: "水", 雨: "水", 雪: "水", 云: "水", 海: "水", 江: "水", 河: "水", 泽: "水", 润: "水", 清: "水", 洋: "水", 汐: "水", 翰: "水",
    钅: "金", 金: "金", 鑫: "金", 锦: "金", 铭: "金", 钧: "金", 锐: "金", 铄: "金", 书: "金", 宸: "金",
    木: "木", 艹: "木", 林: "木", 森: "木", 杰: "木", 楷: "木", 荣: "木", 萱: "木", 芷: "木", 若: "木", 梓: "木",
    火: "火", 灬: "火", 日: "火", 明: "火", 晨: "火", 晟: "火", 炎: "火", 煜: "火", 昕: "火", 晴: "火",
    土: "土", 山: "土", 王: "土", 坤: "土", 城: "土", 峻: "土", 安: "土", 宇: "土", 轩: "土", 辰: "土"
  };

  function shared() {
    return window.NameSharedData || { NUMEROLOGY: {}, LEVELS: {}, COMMON_STROKES: {} };
  }

  function cleanChinese(value) {
    return Array.from(String(value || "").trim()).filter((char) => /[\u3400-\u9fff]/u.test(char));
  }

  function splitName(fullName) {
    const clean = cleanChinese(fullName).join("");
    const surname = DOUBLE_SURNAMES.find((item) => clean.startsWith(item)) || clean.slice(0, 1);
    return { fullName: clean, surname, given: clean.slice(surname.length) };
  }

  function fallbackStroke(char) {
    if (KANGXI_STROKES[char]) return KANGXI_STROKES[char];
    const common = shared().COMMON_STROKES || {};
    if (common[char]) return common[char];
    const code = char.codePointAt(0);
    if (code >= 0x4e00 && code <= 0x9fff) return 10;
    return 1;
  }

  function elementByGridNumber(number) {
    return WUXING_BY_TAIL[number % 10];
  }

  function elementByChar(char) {
    if (CHAR_ELEMENT_HINTS[char]) return CHAR_ELEMENT_HINTS[char];
    const common = Object.keys(CHAR_ELEMENT_HINTS).find((key) => char.includes(key));
    return common ? CHAR_ELEMENT_HINTS[common] : elementByGridNumber(fallbackStroke(char));
  }

  function normalize81(number) {
    const mod = number % 81;
    return mod === 0 ? 81 : mod;
  }

  function numerology(number) {
    const row = shared().NUMEROLOGY?.[normalize81(number)];
    const levels = shared().LEVELS || {};
    if (!row) {
      return { number: normalize81(number), title: "数理待补", level: "平吉", score: 60, text: "该数理解释待补充。", advice: "建议补充易经数理库。", className: "mid" };
    }
    const level = levels[row[1]] || { label: row[1], score: 60, className: "mid" };
    return { number: normalize81(number), title: row[0], level: level.label, score: level.score, text: row[2], advice: row[3], className: level.className };
  }

  function calcFiveGrids(fullName) {
    const parsed = splitName(fullName);
    const surnameChars = cleanChinese(parsed.surname);
    const givenChars = cleanChinese(parsed.given);
    const allChars = [...surnameChars, ...givenChars];
    const strokes = allChars.map((char) => ({ char, stroke: fallbackStroke(char), element: elementByChar(char), source: KANGXI_STROKES[char] || shared().COMMON_STROKES?.[char] ? "本地康熙笔画库" : "缺字估算" }));
    const strokeOf = (chars) => chars.reduce((sum, char) => sum + fallbackStroke(char), 0);
    const isCompoundSurname = surnameChars.length > 1;
    const isSingleGiven = givenChars.length === 1;
    const surnameTotal = strokeOf(surnameChars);
    const givenTotal = strokeOf(givenChars);
    const sky = isCompoundSurname ? surnameTotal : surnameTotal + 1;
    const person = fallbackStroke(surnameChars.at(-1)) + fallbackStroke(givenChars[0]);
    const earth = isSingleGiven ? givenTotal + 1 : givenTotal;
    let outer;
    if (!isCompoundSurname && isSingleGiven) outer = 2;
    else if (!isCompoundSurname) outer = fallbackStroke(givenChars.at(-1)) + 1;
    else if (isSingleGiven) outer = fallbackStroke(surnameChars[0]) + 1;
    else outer = fallbackStroke(surnameChars[0]) + fallbackStroke(givenChars.at(-1));
    const totalGrid = surnameTotal + givenTotal;
    const rows = [
      ["天格", sky, "祖辈基业与先天环境"],
      ["人格", person, "性格核心、中年运势与主导能量"],
      ["地格", earth, "青年基础、家庭根基与下属缘"],
      ["外格", outer, "社交关系、外部合作与公众印象"],
      ["总格", totalGrid, "整体走势、长期发展与后运"]
    ].map(([label, number, meaning]) => {
      const n = numerology(number);
      return { label, number, element: elementByGridNumber(number), meaning, numerology: n };
    });
    return { ...parsed, surnameChars, givenChars, allChars, strokes, sky, person, earth, outer, totalGrid, rows };
  }

  function relation(a, b) {
    if (a === b) return "同气";
    if (SHENG[a] === b) return "相生";
    if (SHENG[b] === a) return "被生";
    if (KE[a] === b) return "相克";
    if (KE[b] === a) return "受克";
    return "平";
  }

  function calcSancai(five) {
    const elements = [five.rows[0].element, five.rows[1].element, five.rows[2].element];
    const r1 = relation(elements[0], elements[1]);
    const r2 = relation(elements[1], elements[2]);
    let score = 70;
    [r1, r2].forEach((r) => {
      if (r === "相生" || r === "被生" || r === "同气") score += 10;
      if (r === "相克" || r === "受克") score -= 12;
    });
    score = Math.max(40, Math.min(98, score));
    return { elements, relations: [r1, r2], score, text: `天人关系为${r1}，人格与地格关系为${r2}，三才配置为「${elements.join("-")}」。` };
  }

  function parseDate(dateText) {
    const [year, month, day] = String(dateText || "").split("-").map(Number);
    return { year: year || 1990, month: month || 1, day: day || 1 };
  }

  function hourFromBranch(branch) {
    const map = { 子时: 0, 丑时: 2, 寅时: 4, 卯时: 6, 辰时: 8, 巳时: 10, 午时: 12, 未时: 14, 申时: 16, 酉时: 18, 戌时: 20, 亥时: 22 };
    return map[branch] ?? 12;
  }

  function addElementCount(counts, element, weight) {
    counts[element] = (counts[element] || 0) + weight;
  }

  function calcBazi(data) {
    if (!window.Solar) {
      return null;
    }
    const date = parseDate(data.birthDate);
    const hour = hourFromBranch(data.birthHour);
    const solar = window.Solar.fromYmdHms(date.year, date.month, date.day, hour, 0, 0);
    const lunar = solar.getLunar();
    const eight = lunar.getEightChar();
    const pillars = [
      { label: "年柱", value: eight.getYear(), wx: eight.getYearWuXing(), hide: eight.getYearHideGan(), nayin: eight.getYearNaYin(), shishen: eight.getYearShiShenGan() },
      { label: "月柱", value: eight.getMonth(), wx: eight.getMonthWuXing(), hide: eight.getMonthHideGan(), nayin: eight.getMonthNaYin(), shishen: eight.getMonthShiShenGan() },
      { label: "日柱", value: eight.getDay(), wx: eight.getDayWuXing(), hide: eight.getDayHideGan(), nayin: eight.getDayNaYin(), shishen: "日主" },
      { label: "时柱", value: eight.getTime(), wx: eight.getTimeWuXing(), hide: eight.getTimeHideGan(), nayin: eight.getTimeNaYin(), shishen: eight.getTimeShiShenGan() }
    ];
    const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
    pillars.forEach((pillar) => {
      const [gan, zhi] = Array.from(pillar.value);
      addElementCount(counts, GAN_ELEMENT[gan], 1.2);
      addElementCount(counts, ZHI_ELEMENT[zhi], 1.0);
      (ZHI_HIDDEN[zhi] || []).forEach((hidden, index) => addElementCount(counts, GAN_ELEMENT[hidden], index === 0 ? 0.35 : 0.18));
    });
    const dayGan = eight.getDayGan();
    const dayElement = GAN_ELEMENT[dayGan];
    const same = counts[dayElement] || 0;
    const mother = Object.entries(SHENG).find(([, child]) => child === dayElement)?.[0];
    const support = same + (counts[mother] || 0) * 0.75;
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    const ratio = support / total;
    const strength = ratio >= 0.44 ? "偏强" : ratio <= 0.28 ? "偏弱" : "中和";
    let useful;
    let avoid;
    if (strength === "偏强") {
      useful = [KE[dayElement], SHENG[dayElement]].filter(Boolean);
      avoid = [dayElement, mother].filter(Boolean);
    } else if (strength === "偏弱") {
      useful = [dayElement, mother].filter(Boolean);
      avoid = [KE[dayElement], SHENG[dayElement]].filter(Boolean);
    } else {
      useful = Object.entries(counts).sort((a, b) => a[1] - b[1]).slice(0, 2).map(([key]) => key);
      avoid = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([key]) => key);
    }
    return {
      solar: solar.toYmdHms(),
      lunarText: lunar.toString(),
      shengxiao: lunar.getYearShengXiaoExact ? lunar.getYearShengXiaoExact() : lunar.getYearShengXiao(),
      dayGan,
      dayElement,
      pillars,
      counts,
      strength,
      useful,
      avoid,
      scoreBase: useful.length ? 86 : 75,
      text: `日主为${dayGan}${dayElement}，五行支持比约${Math.round(ratio * 100)}%，判为${strength}。喜用倾向：${useful.join("、")}；需节制：${avoid.join("、")}。`
    };
  }

  function calcNameElementFit(five, bazi) {
    const nameElements = five.strokes.filter((item) => five.givenChars.includes(item.char)).map((item) => item.element);
    if (!bazi) return { score: 75, nameElements, text: "未载入八字库，暂按姓名用字五行做基础评估。" };
    let score = 70;
    nameElements.forEach((element) => {
      if (bazi.useful.includes(element)) score += 10;
      if (bazi.avoid.includes(element)) score -= 8;
    });
    score = Math.max(45, Math.min(98, score));
    return { score, nameElements, text: `名字用字五行为${nameElements.join("、") || "未识别"}，与喜用神${bazi.useful.join("、")}的匹配度为${score}分。` };
  }

  function calcSound(chars) {
    const score = chars.length >= 3 ? 88 : 82;
    return { score, tones: chars.map((char, index) => ({ char, tone: ["阳平", "阴平", "去声", "上声"][index % 4] })) };
  }

  function build(data) {
    const five = calcFiveGrids(data.fullName);
    const bazi = calcBazi(data);
    const sancai = calcSancai(five);
    const fit = calcNameElementFit(five, bazi);
    const sound = calcSound(five.allChars);
    const fiveScore = Math.round(five.rows.reduce((sum, row) => sum + row.numerology.score, 0) / five.rows.length);
    const meaningScore = Math.round((fit.score + sound.score) / 2);
    const zodiacScore = bazi?.shengxiao ? 84 : 75;
    const poetryScore = 78;
    const commonScore = five.strokes.some((item) => item.source === "缺字估算") ? 76 : 90;
    const scores = {
      fiveGrid: fiveScore,
      bazi: bazi ? Math.round((bazi.scoreBase + fit.score) / 2) : 72,
      sancai: sancai.score,
      sound: sound.score,
      meaning: meaningScore,
      zodiac: zodiacScore,
      poetry: poetryScore,
      common: commonScore
    };
    const total = Math.round(scores.fiveGrid * 0.25 + scores.bazi * 0.25 + scores.sancai * 0.15 + scores.sound * 0.10 + scores.meaning * 0.10 + scores.zodiac * 0.05 + scores.poetry * 0.05 + scores.common * 0.05);
    const today = new Date();
    return {
      fullName: five.fullName,
      surname: five.surname,
      given: five.given,
      chars: five.allChars,
      strokes: five.strokes,
      scores,
      total,
      sky: five.sky,
      person: five.person,
      earth: five.earth,
      outer: five.outer,
      totalGrid: five.totalGrid,
      gridRows: five.rows,
      bazi,
      sancai,
      elementFit: fit,
      sound,
      reportId: `RPT-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-${five.fullName.charCodeAt(0)}-${total}`
    };
  }

  window.NameEngine = { build, splitName, calcFiveGrids, calcBazi };
})();
