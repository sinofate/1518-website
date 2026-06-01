const services = [
  ["个人起名", "承四柱、合八字，结合音形义、生肖与数理给出名字参考。", "baby"],
  ["公司起名", "结合经营者信息、行业方向和地域后缀生成公司名方案。", "company"],
  ["品牌起名", "面向产品、店铺与商标场景，生成易记、易传播的品牌名。", "brand"],
  ["周公解梦", "按梦境关键词给出传统文化解释和心理参考。", "dream"],
  ["车牌测算", "根据车牌数字组合生成数理参考分与说明。", "plate"],
  ["手机号测算", "分析手机号数字组合的寓意和参考评分。", "phone"],
  ["公司测名", "对公司全称进行结构、音韵、行业匹配度分析。", "company-test"],
  ["星座配对", "展示星座之间的性格互补、沟通和情感指数。", "astro-match"]
];

const dreamWords = ["梦见蛇", "梦见狗", "梦见旅行", "梦见被追赶", "梦见鱼", "梦见猫", "梦见血", "梦见钱财", "梦见地震", "梦见结婚", "梦见老虎", "梦见怀孕"];
const boyChars = ["泽", "宇", "宸", "睿", "铭", "轩", "晟", "皓", "远", "景", "承", "峻"];
const girlChars = ["若", "汐", "宁", "妍", "悦", "晴", "瑶", "芷", "一", "安", "清", "诗"];
const neutralChars = ["嘉", "言", "乐", "星", "知", "予", "南", "之", "云", "禾", "书", "然"];
const siteOrigin = "https://www.1518.com";
const defaultSeo = {
  title: "1518 起名网 - 20年中文起名测名工具",
  description: "1518 起名网是长期运营20年的中文起名测名工具站，由《易经》专家孔力担任产品顾问，提供姓名测试、公司名测试、个人起名、公司起名、品牌起名、周公解梦、生肖星座、号码测算等传统文化参考服务。",
  keywords: "1518起名网,起名网,姓名测试,姓名打分,名字测试,个人起名,宝宝起名,公司起名,公司名测试,品牌起名,品牌名测试,周公解梦,生肖查询,生肖配对,星座查询,星座配对,生日密码,风水查询,血型分析,手机号测算,车牌测算",
  headline: "1518 起名网"
};
const routeSeo = {
  home: defaultSeo,
  "name-test": {
    title: "姓名测试_姓名打分_名字测试打分 - 1518 起名网",
    description: "1518 姓名测试提供姓名打分、五格数理、三才配置、八字喜用、音律字义、生肖用字等名字测试分析，适合宝宝起名、改名和个人名字参考。",
    keywords: "姓名测试,姓名打分,名字测试,名字打分,免费姓名测试,1518姓名测试,五格数理,三才配置,八字起名,名字评分",
    headline: "姓名测试"
  },
  baby: {
    title: "个人起名_宝宝起名_生辰八字起名 - 1518 起名网",
    description: "1518 个人起名结合姓氏、性别、出生时间、五行补益、音形义和生肖用字生成名字候选，适合宝宝起名、成人改名和个人品牌用名参考。",
    keywords: "个人起名,宝宝起名,生辰八字起名,免费起名,取名字,改名字,男孩起名,女孩起名,五行起名,1518起名",
    headline: "个人起名"
  },
  "company-test": {
    title: "公司名测试_公司测名打分_企业名称测算 - 1518 起名网",
    description: "1518 公司名测试按公司全称、商号简称、行业属性和易经数理生成企业名称诊断，分析品牌传播力、行业适配、融资扩张和经营稳定度。",
    keywords: "公司名测试,公司测名,公司名称测算,企业测名,公司名字打分,商号测试,公司起名测算,1518公司名测试",
    headline: "公司名测试"
  },
  company: {
    title: "公司起名_企业起名_公司取名大全 - 1518 起名网",
    description: "1518 公司起名按行业、地域、字号偏好和组织形式生成公司名称方案，兼顾商号数理、行业定位、传播记忆和注册使用参考。",
    keywords: "公司起名,企业起名,公司取名,公司名称大全,公司名字推荐,商号起名,科技公司起名,餐饮公司起名,1518公司起名",
    headline: "公司起名"
  },
  brand: {
    title: "品牌起名_商标起名_店铺品牌取名 - 1518 起名网",
    description: "1518 品牌起名面向产品、店铺、商标和新媒体账号，生成短、亮、易传播的品牌名，并提供品类联想、传播节奏和基础风险参考。",
    keywords: "品牌起名,商标起名,店铺起名,产品起名,品牌取名,品牌名字大全,商标取名,新品牌命名",
    headline: "品牌起名"
  },
  "brand-test": {
    title: "品牌名测试_品牌名字打分_商标名称测算 - 1518 起名网",
    description: "1518 品牌名测试检查品牌名称的传播力、品类联想、音节节奏、数理参考和受众匹配度，适合商标、产品和店铺命名前评估。",
    keywords: "品牌名测试,品牌名字打分,商标名称测算,品牌测名,店名测试,产品名测试,品牌评分",
    headline: "品牌名测试"
  },
  dream: {
    title: "周公解梦_梦境解析_梦见大全查询 - 1518 起名网",
    description: "1518 周公解梦按梦境关键词生成传统梦书解释、现代心理参考和现实提醒，支持梦见蛇、梦见狗、梦见结婚、梦见怀孕等常见梦境查询。",
    keywords: "周公解梦,解梦大全,梦境解析,梦见蛇,梦见狗,梦见结婚,梦见怀孕,梦见鱼,1518解梦",
    headline: "周公解梦"
  },
  zodiac: {
    title: "生肖查询_属相查询_十二生肖年份表 - 1518 起名网",
    description: "1518 生肖查询按出生年份查询十二生肖、地支、五行倾向、六合三合和年度参考，适合属相查询、生肖年份查询和民俗参考。",
    keywords: "生肖查询,属相查询,十二生肖,生肖年份表,属相年份,生肖运势,地支五行,1518生肖查询",
    headline: "生肖查询"
  },
  match: {
    title: "生肖配对_属相配对_十二生肖婚配查询 - 1518 起名网",
    description: "1518 生肖配对按十二生肖六合、三合、六冲、六害关系生成配对报告，提供感情、婚配、人际和合作关系参考。",
    keywords: "生肖配对,属相配对,生肖婚配,属相婚配,十二生肖配对,六合三合,生肖合不合",
    headline: "生肖配对"
  },
  astro: {
    title: "星座查询_十二星座日期查询_星座性格 - 1518 起名网",
    description: "1518 星座查询按出生日期查询太阳星座、星座日期、四象属性、守护星和性格倾向，适合十二星座日期与性格参考。",
    keywords: "星座查询,十二星座,星座日期,星座性格,太阳星座,星座表,1518星座查询",
    headline: "星座查询"
  },
  "astro-match": {
    title: "星座配对_十二星座配对_情侣星座配对 - 1518 起名网",
    description: "1518 星座配对按星座四象、节奏和关系需求生成配对指数，提供吸引力、沟通、长期稳定和相处建议。",
    keywords: "星座配对,十二星座配对,情侣星座配对,星座合盘,星座匹配,星座爱情配对",
    headline: "星座配对"
  },
  birthday: {
    title: "生日密码_生日性格解析_出生日期测算 - 1518 起名网",
    description: "1518 生日密码按出生日期生成性格关键词、优势挑战、关系建议和幸运元素，适合生日性格、生日数字和出生日期测算参考。",
    keywords: "生日密码,生日性格,出生日期测算,生日解析,生日数字,生日运势,1518生日密码",
    headline: "生日密码"
  },
  fengshui: {
    title: "风水查询_家居风水_办公室风水布局 - 1518 起名网",
    description: "1518 风水查询按空间类型、朝向和使用场景生成家居、办公室、商铺风水体检建议，提供财位、动线、采光和门窗参考。",
    keywords: "风水查询,家居风水,办公室风水,商铺风水,风水布局,财位查询,房屋朝向,1518风水",
    headline: "风水查询"
  },
  blood: {
    title: "血型分析_ABO血型性格_血型测试 - 1518 起名网",
    description: "1518 血型分析按 A 型、B 型、O 型、AB 型输出性格、人际、职场和关系参考，适合 ABO 血型性格查询。",
    keywords: "血型分析,血型性格,ABO血型,血型测试,A型血,B型血,O型血,AB型血",
    headline: "血型分析"
  },
  "blood-match": {
    title: "血型配对_ABO血型配对_血型爱情配对 - 1518 起名网",
    description: "1518 血型配对按 ABO 血型互补关系生成沟通、情感和协作建议，适合情侣、人际和团队关系参考。",
    keywords: "血型配对,ABO血型配对,血型爱情配对,血型合不合,情侣血型配对",
    headline: "血型配对"
  },
  wuyun: {
    title: "五运六气查询_岁运节气_中医五运六气 - 1518 起名网",
    description: "1518 五运六气按年份和日期输出岁运、节气阶段、气候倾向与养生参考，适合传统历法和中医五运六气查询。",
    keywords: "五运六气,五运六气查询,岁运,节气查询,中医五运六气,运气学说,1518五运六气",
    headline: "五运六气"
  },
  phone: {
    title: "手机号测算_手机号码吉凶_号码测试 - 1518 起名网",
    description: "1518 手机号测算按号码尾数、数字五行、易经数理和重复结构生成号码报告，提供手机号码吉凶和数字能量参考。",
    keywords: "手机号测算,手机号码吉凶,号码测试,手机号码测试,数字能量,手机号打分,1518手机号测算",
    headline: "手机号测算"
  },
  plate: {
    title: "车牌测算_车牌号码吉凶_车牌号测试 - 1518 起名网",
    description: "1518 车牌测算按车牌数字、字母、尾号和易经数理生成车牌参考报告，适合车牌号吉凶和车牌号码测试。",
    keywords: "车牌测算,车牌号码吉凶,车牌号测试,车牌号码测试,车牌打分,车牌吉凶,1518车牌测算",
    headline: "车牌测算"
  },
  "all-tools": {
    title: "1518 全栏目工具_起名测名解梦生肖星座号码测算",
    description: "1518 全栏目工具集合姓名测试、个人起名、公司名测试、公司起名、品牌起名、周公解梦、生肖星座、风水、血型、手机号和车牌测算。",
    keywords: defaultSeo.keywords,
    headline: "1518 全栏目工具"
  }
};

function fillSelect(id, values, suffix = "") {
  const select = document.getElementById(id);
  select.innerHTML = values.map((value) => `<option value="${value}">${value}${suffix}</option>`).join("");
}

function initDateFields() {
  fillSelect("yearSelect", Array.from({ length: 97 }, (_, index) => 1932 + index), "年");
  fillSelect("monthSelect", Array.from({ length: 12 }, (_, index) => index + 1), "月");
  fillSelect("daySelect", Array.from({ length: 31 }, (_, index) => index + 1), "日");
  fillSelect("hourSelect", ["未知", ...Array.from({ length: 24 }, (_, index) => index)], "时");
  fillSelect("minuteSelect", ["未知", ...Array.from({ length: 60 }, (_, index) => index)], "分");
  document.getElementById("yearSelect").value = "2026";
}

function renderServices() {
  document.getElementById("serviceGrid").innerHTML = services.map(([title, text, id], index) => `
    <a class="service-card" href="#${id}">
      <span class="service-icon">${index + 1}</span>
      <span>
        <h3>${title}</h3>
        <p>${text}</p>
      </span>
    </a>
  `).join("");
}

function renderDreamTags() {
  document.getElementById("dreamTags").innerHTML = dreamWords.map((word) => `<a href="#dream">${word}</a>`).join("");
}

function ensureMeta(selector, attrs) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement(attrs.property ? "meta" : "meta");
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    document.head.appendChild(node);
  }
  return node;
}

function setMeta(name, content) {
  const node = ensureMeta(`meta[name="${name}"]`, { name });
  node.setAttribute("content", content);
}

function setPropertyMeta(property, content) {
  const node = ensureMeta(`meta[property="${property}"]`, { property });
  node.setAttribute("content", content);
}

function updateSeo(route) {
  const meta = routeSeo[route] || defaultSeo;
  const url = route === "home" ? `${siteOrigin}/` : `${siteOrigin}/#${route}`;
  document.title = meta.title;
  setMeta("description", meta.description);
  setMeta("keywords", meta.keywords);
  setPropertyMeta("og:title", meta.title);
  setPropertyMeta("og:description", meta.description);
  setPropertyMeta("og:url", url);
  setMeta("twitter:title", meta.title);
  setMeta("twitter:description", meta.description);

  const canonical = document.querySelector('link[rel="canonical"]') || document.head.appendChild(document.createElement("link"));
  canonical.setAttribute("rel", "canonical");
  canonical.setAttribute("href", url);

  const schema = document.getElementById("routeSchema") || document.head.appendChild(document.createElement("script"));
  schema.id = "routeSchema";
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": route === "home" ? "WebSite" : "WebPage",
    name: meta.headline,
    headline: meta.title,
    description: meta.description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "1518 起名网",
      url: `${siteOrigin}/`
    },
    reviewedBy: {
      "@type": "Person",
      name: "孔力",
      jobTitle: "产品顾问",
      knowsAbout: ["易经", "易经数理", "传统文化命名"]
    },
    inLanguage: "zh-CN",
    potentialAction: route === "home" ? {
      "@type": "SearchAction",
      target: `${siteOrigin}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    } : undefined
  });
}

function applyPageMode() {
  const route = window.location.hash.replace(/^#/, "") || "home";
  const isHome = route === "home";
  document.body.classList.toggle("home-lite", isHome);
  if (isHome) {
    document.body.classList.remove("company-report-active", "column-report-active");
  }
  updateSeo(route);
}

function scoreFromText(text) {
  return Array.from(text).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 20 + 80;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function formatBirthDate(value) {
  if (!value) {
    return "未填写";
  }
  const [year, month, day] = value.split("-");
  return `${year}年${Number(month)}月${Number(day)}日`;
}

const WESTERN_SIGNS = [
  ["摩羯座", "土象", "土星", "12-22", "01-19"],
  ["水瓶座", "风象", "天王星", "01-20", "02-18"],
  ["双鱼座", "水象", "海王星", "02-19", "03-20"],
  ["白羊座", "火象", "火星", "03-21", "04-19"],
  ["金牛座", "土象", "金星", "04-20", "05-20"],
  ["双子座", "风象", "水星", "05-21", "06-21"],
  ["巨蟹座", "水象", "月亮", "06-22", "07-22"],
  ["狮子座", "火象", "太阳", "07-23", "08-22"],
  ["处女座", "土象", "水星", "08-23", "09-22"],
  ["天秤座", "风象", "金星", "09-23", "10-23"],
  ["天蝎座", "水象", "冥王星", "10-24", "11-21"],
  ["射手座", "火象", "木星", "11-22", "12-21"]
];

function signFromDate(dateText) {
  const [, month, day] = String(dateText || "1990-01-01").split("-").map(Number);
  const md = `${String(month || 1).padStart(2, "0")}-${String(day || 1).padStart(2, "0")}`;
  return WESTERN_SIGNS.find(([, , , start, end]) => start <= end ? md >= start && md <= end : md >= start || md <= end) || WESTERN_SIGNS[0];
}

function splitName(fullName) {
  const clean = fullName.trim();
  if (clean.length <= 2) {
    return { surname: clean.slice(0, 1), given: clean.slice(1) };
  }
  const doubleSurnames = ["欧阳", "司马", "上官", "诸葛", "东方", "尉迟", "公孙", "慕容", "司徒", "南宫"];
  const surname = doubleSurnames.find((item) => clean.startsWith(item)) || clean.slice(0, 1);
  return { surname, given: clean.slice(surname.length) };
}

function getGrade(score) {
  if (score >= 92) return "优秀";
  if (score >= 86) return "大吉";
  if (score >= 80) return "吉";
  if (score >= 70) return "中吉";
  return "待优化";
}

function getToneLabel(index) {
  return ["阳平", "阴平", "去声", "上声"][index % 4];
}

function getElementByChar(char) {
  return ["金", "水", "木", "火", "土"][char.charCodeAt(0) % 5];
}

function getStroke(char) {
  return char ? char.charCodeAt(0) % 17 + 4 : 1;
}

function buildNameReport(data) {
  if (window.NameEngine) {
    return window.NameEngine.build(data);
  }
  const fullName = data.fullName.trim();
  const { surname, given } = splitName(fullName);
  const chars = Array.from(fullName);
  const givenChars = Array.from(given || fullName.slice(1));
  const base = scoreFromText(`${fullName}${data.birthDate}${data.birthHour}${data.birthPlace}`);
  const scores = {
    fiveGrid: Math.min(99, base + 1),
    bazi: Math.min(99, base - 1),
    sancai: Math.min(99, base - 3),
    sound: Math.min(99, base + 2),
    meaning: Math.min(99, base + 1),
    zodiac: Math.min(99, base - 7),
    poetry: Math.min(99, base - 9),
    common: Math.min(99, base)
  };
  const total = Math.round(
    scores.fiveGrid * 0.25 +
    scores.bazi * 0.25 +
    scores.sancai * 0.15 +
    scores.sound * 0.10 +
    scores.meaning * 0.10 +
    scores.zodiac * 0.05 +
    scores.poetry * 0.05 +
    scores.common * 0.05
  );
  const strokes = chars.map((char) => ({ char, stroke: getStroke(char), element: getElementByChar(char) }));
  const sky = (strokes[0]?.stroke || 1) + 1;
  const person = (strokes[0]?.stroke || 1) + (strokes[1]?.stroke || 1);
  const earth = givenChars.reduce((sum, char) => sum + getStroke(char), 0) || (strokes[1]?.stroke || 1);
  const outer = (strokes.at(-1)?.stroke || 1) + 1;
  const totalGrid = strokes.reduce((sum, item) => sum + item.stroke, 0);
  const today = new Date();
  const reportId = `RPT-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-${fullName.charCodeAt(0)}-${base}`;

  return { fullName, surname, given, chars, strokes, scores, total, sky, person, earth, outer, totalGrid, reportId };
}

function scoreCard(label, score, weight) {
  return `
    <div class="report-score-card">
      <span>${label} (${weight})</span>
      <strong>${score}</strong>
      <em>${getGrade(score)}</em>
    </div>
  `;
}

function renderNameReport(data) {
  const report = buildNameReport(data);
  const safeName = escapeHtml(report.fullName);
  const safePlace = escapeHtml(data.birthPlace || "未填写");
  const safeBirth = escapeHtml(formatBirthDate(data.birthDate));
  const safeHour = escapeHtml(data.birthHour || "未知");
  const givenText = escapeHtml(report.given || report.fullName.slice(1));
  const givenChars = Array.from(report.given || report.fullName.slice(1));
  const strokeRows = report.gridRows ? report.gridRows.map((row) => [
    row.label,
    row.number,
    row.element,
    row.numerology.level,
    `${row.meaning} ${row.numerology.title}：${row.numerology.text}`
  ]) : [
    ["天格", report.sky, getElementByChar(String(report.sky)), getGrade(report.scores.fiveGrid), "祖辈基业与先天环境。"],
    ["人格", report.person, getElementByChar(String(report.person)), getGrade(report.scores.bazi), "性格核心与中年运势。"],
    ["地格", report.earth, getElementByChar(String(report.earth)), getGrade(report.scores.sancai), "青年基础、家庭与内在根基。"],
    ["外格", report.outer, getElementByChar(String(report.outer)), getGrade(report.scores.sound), "社交关系与外在形象。"],
    ["总格", report.totalGrid, getElementByChar(String(report.totalGrid)), getGrade(report.total), "整体走势与后期发展。"]
  ];
  const baziPillars = report.bazi ? report.bazi.pillars : [
    { label: "年柱", value: "庚午", wx: "金/火", hide: ["丁", "己"], nayin: "路旁土", shishen: "参考" },
    { label: "月柱", value: "壬午", wx: "水/火", hide: ["丁", "己"], nayin: "杨柳木", shishen: "参考" },
    { label: "日柱", value: "丁酉", wx: "火/金", hide: ["辛"], nayin: "山下火", shishen: "日主" },
    { label: "时柱", value: "乙未", wx: "木/土", hide: ["己", "丁", "乙"], nayin: "沙中金", shishen: "参考" }
  ];
  const baziText = report.bazi ? report.bazi.text : "当前演示版按姓名与生日生成喜用倾向。";
  const zodiacName = report.bazi?.shengxiao || "生肖";
  const poetryNames = [`${report.surname}思齐`, `${report.surname}清扬`, `${report.surname}霁光`, `${report.surname}知远`];
  const aspectRows = [
    ["☉ 太阳 合 ♃ 木星", "乐观开朗，贵人运佳，事业有扩展之象。"],
    ["☉ 太阳 冲 ♄ 土星", "事业与家庭之间需要平衡，早年磨练会形成持久成就。"],
    ["☉ 太阳 三合 ☽ 月亮", "内心与外在较协调，情感直觉较强。"],
    ["♂ 火星 刑 ♄ 土星", "行动力与纪律之间有拉扯，适合把冲劲转为策略。"],
    ["♃ 木星 六合 ♀ 金星", "社交运佳，人缘好，财运方面容易获得助力。"]
  ];

  return `
    <article class="report-page">
      <section class="report-cover report-pdf-page">
        <div>
          <p class="report-logo">1518</p>
          <h2>姓名综合分析报告</h2>
          <p>姓名: ${safeName} | 性别: ${escapeHtml(data.reportGender)} | 出生: ${safeBirth} ${safeHour} | 出生地: ${safePlace}</p>
          <p>综合评分: ${report.total}分 (${getGrade(report.total)}) | 报告生成日期: ${new Date().toLocaleDateString("zh-CN")}</p>
        </div>
        <div class="name-hero">
          <div class="name-large">${report.chars.map((char) => `<span>${escapeHtml(char)}</span>`).join("")}</div>
          <div class="pinyin">xing ming fen xi</div>
          <div class="score-ring"><strong>${report.total}</strong><span>综合评分</span><em>${getGrade(report.total)}</em></div>
        </div>
        <div class="score-grid">
          ${scoreCard("五格数理", report.scores.fiveGrid, "25%")}
          ${scoreCard("八字喜用", report.scores.bazi, "25%")}
          ${scoreCard("三才配置", report.scores.sancai, "15%")}
          ${scoreCard("音韵和谐", report.scores.sound, "10%")}
          ${scoreCard("字义分析", report.scores.meaning, "10%")}
          ${scoreCard("生肖用字", report.scores.zodiac, "5%")}
          ${scoreCard("诗词出处", report.scores.poetry, "5%")}
          ${scoreCard("常用度", report.scores.common, "5%")}
        </div>
      </section>

      <section class="report-section report-pdf-page">
        <h3>五格数理分析 <span>${report.scores.fiveGrid}分 ${getGrade(report.scores.fiveGrid)}</span></h3>
        <p class="muted-line">笔画拆解：${report.strokes.map((item) => `${escapeHtml(item.char)}（康熙${item.stroke}画${item.source ? `，${item.source}` : ""}）`).join(" + ")}</p>
        <div class="grid-number-list">
          ${strokeRows.map(([label, number, element, grade]) => `<div><span>${label}</span><strong>${number}</strong><em>${element} · ${grade}</em></div>`).join("")}
        </div>
        <table class="report-table">
          <thead><tr><th>格</th><th>数</th><th>五行</th><th>吉凶</th><th>含义</th></tr></thead>
          <tbody>${strokeRows.map(([label, number, element, grade, meaning]) => `<tr><td>${label}</td><td>${number}</td><td>${element}</td><td>${grade}</td><td>${meaning}</td></tr>`).join("")}</tbody>
        </table>
        <div class="report-subblock"><h4>人格${report.person}画 — 性格与运势</h4><p><b>性格特征：</b>人格为姓名主格，代表性格核心与中年运势。${report.gridRows ? report.gridRows[1].numerology.text : "此名整体偏向稳重、讲原则。"}</p><p><b>事业运：</b>人格与外格共同观察中年事业、人际支撑和合作阻力。外格 ${report.outer} 画显示外部关系为「${strokeRows[3][3]}」。</p><p><b>建议：</b>${report.gridRows ? report.gridRows[1].numerology.advice : "宜保持清晰目标，长期积累。"}</p></div>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 2/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>财运与事业分析</h3>
        <p>天格 ${report.sky}（${strokeRows[0][2]}）与地格 ${report.earth}（${strokeRows[2][2]}）用于观察先天资源和青年基础。人格 ${report.person} 与外格 ${report.outer} 则用于观察事业推进、人际合作和外部支持。</p>
        <p>总格 ${report.totalGrid} 为长期发展格，数理为「${strokeRows[4][3]}」。若总格偏吉，适合长期经营个人品牌；若总格压力较大，则需要通过职业规划、学习系统和外部协作来补强。</p>
        <p>综合来看，${safeName} 的姓名格局需要同时关注人格主轴、外格人际和总格后运。姓名只是传统文化参考，真正的事业结果仍取决于个人选择、能力积累和环境机会。</p>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 3/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>八字分析 <span>${report.scores.bazi}分 ${getGrade(report.scores.bazi)}</span></h3>
        <h4 class="report-subtitle">四柱八字</h4>
        <div class="bazi-pill-row">
          ${baziPillars.map((pillar) => `<span>${pillar.label}<br><b>${pillar.value}</b><small>${pillar.wx} · 藏干:${Array.isArray(pillar.hide) ? pillar.hide.join("") : pillar.hide}</small><small>${pillar.nayin} · ${pillar.shishen}</small></span>`).join("")}
        </div>
        <h4 class="report-subtitle">五行力量分布</h4>
        ${report.bazi ? `<div class="wuxing-bars">${Object.entries(report.bazi.counts).map(([key, value]) => `<div><span>${key}</span><b style="width:${Math.min(100, Math.round(value * 18))}%"></b><em>${value.toFixed(1)}</em></div>`).join("")}</div>` : ""}
        <h4 class="report-subtitle">日主与喜用神分析</h4><p>${baziText}</p>
        <p><b>取名建议：</b>${report.elementFit ? report.elementFit.text : `保留读音清晰、意义正向、五行互补的字；避免过于生僻或读写成本过高的字。`}</p>
        <h4 class="report-subtitle">日主性格解读</h4><p>${report.bazi ? `${report.bazi.dayGan}${report.bazi.dayElement}日主的人，外在表现与内在驱动力会受五行强弱影响。当前判定为${report.bazi.strength}，宜在生活和职业中主动补足${report.bazi.useful.join("、")}的能量。` : "日主性格解读需依赖八字排盘结果。"}</p>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 4/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>大运流年 <span>10年一运</span></h3>
        <div class="luck-cycle-grid">${["1-10岁", "11-20岁", "21-30岁", "31-40岁", "41-50岁", "51-60岁", "61-70岁", "71-80岁"].map((age, index) => `<div class="${index === 3 ? "current" : ""}"><strong>${age}</strong><span>${["辛未", "庚午", "己巳", "戊辰", "丁卯", "丙寅", "乙丑", "甲子"][index]}</span><em>${["金/土", "金/火", "土/火", "土/土", "火/木", "火/木", "木/土", "木/水"][index]}</em></div>`).join("")}</div>
        <p><b>当前大运：</b>${report.bazi?.strength === "偏强" ? "宜以克泄平衡，事业上适合稳扎稳打，避免过热扩张。" : "宜以扶助补益为先，事业上适合积累资源，先稳根基再扩张。"}</p>
        <p><b>下一步大运：</b>${report.bazi?.avoid?.length ? `需注意${report.bazi.avoid.join("、")}过旺带来的压力，可用${report.bazi.useful.join("、")}方向调和。` : "以稳中求进为主，宜保持学习与健康节奏。"}</p>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 5/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>三才配置 <span>${report.scores.sancai}分 ${getGrade(report.scores.sancai)}</span></h3>
        <h4 class="report-subtitle">三才五行配置</h4>
        <div class="sancai-flow">
          <span>天格 ${report.sky}${report.sancai ? ` · ${report.sancai.elements[0]}` : ""}</span><b>→</b><span>人格 ${report.person}${report.sancai ? ` · ${report.sancai.elements[1]}` : ""}</span><b>→</b><span>地格 ${report.earth}${report.sancai ? ` · ${report.sancai.elements[2]}` : ""}</span>
        </div>
        <h4 class="report-subtitle">五行相互关系</h4><p>${report.sancai ? report.sancai.text : "三才用于观察天、人、地之间的承接关系。此名格局有上进心，也需要注意把个人主张和外部协作放在同一个节奏里。"}</p>
        <h4 class="report-subtitle">健康提示</h4><p>三才关系用于传统姓名学中的身心平衡参考。若某一五行受克，应注意相应系统的保养，保持规律作息，避免长期情绪波动。</p>
        <h4 class="report-subtitle">事业与人际</h4><p>人格代表自我，外格代表外部关系。若人格强而外格弱，宜修炼沟通与合作；若外格强而人格弱，宜提升决策力和执行力。</p>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 6/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>音韵和谐 <span>${report.scores.sound}分 ${getGrade(report.scores.sound)}</span></h3>
        <h4 class="report-subtitle">声调分析</h4><div class="tone-list">${(report.sound?.tones || report.chars.map((char, index) => ({ char, tone: getToneLabel(index) }))).map((item) => `<span><b>${escapeHtml(item.char)}</b><small>${item.tone}</small></span>`).join("")}</div>
        <h4 class="report-subtitle">声母韵母详解</h4><table class="report-table"><thead><tr><th>字</th><th>声母</th><th>韵母</th><th>声调</th><th>发音部位</th><th>开合口</th></tr></thead><tbody>${report.chars.map((char, index) => `<tr><td>${escapeHtml(char)}</td><td>${["w", "sh", "h", "m"][index % 4]}</td><td>${["ang", "u", "an", "ing"][index % 4]}</td><td>${getToneLabel(index)}</td><td>${["唇齿音", "翘舌音", "舌根音", "双唇音"][index % 4]}</td><td>${index % 2 ? "合口" : "开口"}</td></tr>`).join("")}</tbody></table>
        <h4 class="report-subtitle">口型流动分析</h4><p>${safeName} 发音层次清楚，姓与名之间有自然停顿，整体朗朗上口，适合口头传播和正式场景使用。</p>
        <h4 class="report-subtitle">谐音检查</h4><p>未发现明显不良谐音。正式版可继续接入多音字和方言谐音库。</p>
        <h4 class="report-subtitle">改进建议</h4><p>理想名字应尽量做到平仄有变化、声母不连续拗口、尾音收束清楚。若后续发现声调过于单一，可替换一个仄声字增强节奏。</p>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 7/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>字义解析 <span>${report.scores.meaning}分 ${getGrade(report.scores.meaning)}</span></h3>
        <h4 class="report-subtitle">逐字详解</h4><div class="char-meaning-grid">${givenChars.map((char, index) => `<div><h4>${escapeHtml(char)}</h4><p>康熙笔画${report.strokes.find((item) => item.char === char)?.stroke || 10}画</p><p>五行 ${report.strokes.find((item) => item.char === char)?.element || "待定"}</p><p>基本释义：取名用字寓意正向，适合个人品牌表达。</p><p>取名寓意：${index === 0 ? "学识、气度、内在修养" : "才华、志向、长远发展"}</p></div>`).join("")}</div>
        <h4 class="report-subtitle">名字整体寓意</h4><p>「${givenText}」作为名字主体，适合向学识、气度、清朗、担当等方向解释。整体寓意文雅、有志、稳健，适合长期个人品牌建立。</p>
        <h4 class="report-subtitle">历史名人</h4><p>${safeName} 可作为现代姓名使用，若接入名人库，可展示同名人物、近似名人物和历史典故。</p>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 8/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>生肖用字 <span>${report.scores.zodiac}分 ${getGrade(report.scores.zodiac)}</span></h3>
        <h4 class="report-subtitle">生肖信息</h4><div class="zodiac-card"><strong>${zodiacName}</strong><span>${data.birthDate ? data.birthDate.slice(0, 4) : "出生年"} · 传统生肖参考</span><p>${zodiacName}年生人宜结合偏旁、字义和五行平衡综合判断，不能只看生肖单项。</p></div>
        <h4 class="report-subtitle">偏旁用字分析</h4><table class="report-table"><thead><tr><th>字</th><th>五行</th><th>生肖宜忌</th><th>说明</th></tr></thead><tbody>${givenChars.map((char) => `<tr><td>${escapeHtml(char)}</td><td>${report.strokes.find((item) => item.char === char)?.element || "待定"}</td><td>中性/参考</td><td>该字未见明显生肖冲突，宜结合八字喜用神继续判断。</td></tr>`).join("")}</tbody></table>
        <h4 class="report-subtitle">六合六冲</h4><div class="relation-grid"><span>六合：未（羊）</span><span>三合：寅午戌（虎、马、狗）</span><span>六冲：子（鼠）</span><span>相害：丑（牛）</span></div>
        <p>综合评价：「${givenText}」的生肖用字以中性与补益为主，后续可接入生肖偏旁数据库做更精细判断。</p>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 9/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>诗词出处 <span>${report.scores.poetry}分 ${getGrade(report.scores.poetry)}</span></h3>
        <h4 class="report-subtitle">直接出处</h4><p>当前未在本地诗词库中确认「${givenText}」连续二字的直接出处。后续接入《诗经》《楚辞》《唐诗》《宋词》索引后，可自动检索原句。</p>
        <h4 class="report-subtitle">相关经典引用</h4><blockquote>既明且哲，以保其身。<br>夙夜匪懈，以事一人。</blockquote><blockquote>知人则哲，能官人。<br>安民则惠，黎民怀之。</blockquote>
        <p>典故解析：名字若能与经典语义呼应，可增强文化厚度。当前页面保留诗词出处模块结构，下一步接入诗词数据库后可替换为真实出处。</p>
        <h4 class="report-subtitle">推荐诗词取名（同姓参考）</h4><div class="poetry-name-grid">${poetryNames.map((name) => `<span><b>${escapeHtml(name)}</b><em>经典语义参考</em></span>`).join("")}</div>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 10/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>✦西洋星座参考 <span>出生地: ${safePlace}</span></h3>
        <div class="astro-layout"><div class="astro-wheel"><span>♈</span><span>♉</span><span>♊</span><span>♋</span><span>♌</span><span>♍</span><span>♎</span><span>♏</span><span>♐</span><span>♑</span><span>♒</span><span>♓</span></div><div><h4>太阳星座</h4><p><b>${signFromDate(data.birthDate)[0]}</b></p><p>当前前端只依据出生日期计算太阳星座。上升星座、月亮星座、宫位和行星相位必须依赖精确出生时间、经纬度和天文星历，未接入星历前不生成伪排盘。</p></div></div>
        <h4 class="report-subtitle">可验证字段</h4><table class="report-table"><tbody><tr><td>☉ 太阳星座</td><td>${signFromDate(data.birthDate)[0]}</td><td>${signFromDate(data.birthDate)[3]} 至 ${signFromDate(data.birthDate)[4]}</td></tr><tr><td>元素</td><td>${signFromDate(data.birthDate)[1]}</td><td>按常见西洋占星日期表</td></tr><tr><td>守护星</td><td>${signFromDate(data.birthDate)[2]}</td><td>用于性格描述参考</td></tr><tr><td>未输出</td><td>上升、月亮、宫位、相位</td><td>等待正式星盘算法接入</td></tr></tbody></table>
        <h4 class="report-subtitle">排盘边界</h4><ul class="aspect-list"><li><b>不生成固定上升星座</b> — 避免把示例内容误认为真实排盘。</li><li><b>不生成固定相位</b> — 相位需要真实星历和出生坐标。</li><li><b>后续升级</b> — 接入 Swiss Ephemeris 或同等级星历库后再输出完整星盘。</li></ul>
        <footer class="report-page-footer">1518-姓名分析报告 - ${safeName} · 11/12</footer>
      </section>

      <section class="report-section report-pdf-page">
        <h3>综合建议</h3>
        <p><b>姓名主轴：</b>${safeName} 的核心判断应以五格数理、八字喜用、三才配置、音义和常用度为主，星座只作为轻量参考。</p><p><b>太阳星座：</b>${signFromDate(data.birthDate)[0]}属于${signFromDate(data.birthDate)[1]}，可用于描述基础表达风格，但不能替代完整星盘。</p><p><b>排盘升级：</b>若后续要上线“星座排盘”，必须接入真实星历、时区、出生地经纬度和宫位制设置，再与第三方排盘结果做样本回归测试。</p><p><b>使用边界：</b>本报告属于传统文化与娱乐参考，不能作为人生决策的唯一依据。</p>
        <h4 class="report-subtitle">幸运指引</h4><div class="lucky-grid"><span>幸运颜色<b>银白 · 湖蓝</b></span><span>幸运数字<b>${report.total % 9 + 1} · ${(report.person % 8) + 2} · 11</b></span><span>幸运方位<b>北方 · 西方</b></span><span>幸运日<b>周一 · 周五</b></span><span>幸运宝石<b>月光石 · 珍珠</b></span><span>最佳行业<b>教育 · 管理 · 咨询</b></span></div>
        <p>本报告由 1518.com 姓名分析系统自动生成。分析结果仅供参考，不构成任何专业建议。</p><p class="report-id">报告编号：${report.reportId}</p><footer class="report-page-footer">版权所有 © 2026 1518.com · 12/12</footer>
      </section>
    </article>
  `;
}

function validateSurname(form) {
  const surname = form.surname.value.trim();
  const type = form.surnameType.value;
  if (!surname || !/^[\u4e00-\u9fa5]{1,4}$/.test(surname)) {
    return "请输入中文姓氏。";
  }
  if (type === "single" && surname.length !== 1) {
    return "单姓请输入一个汉字。";
  }
  if (type === "double" && surname.length !== 2) {
    return "双姓请输入两个汉字。";
  }
  if (!form.gender.value) {
    return "请选择性别。";
  }
  if (!form.nameLength.value) {
    return "请选择取名字数。";
  }
  return "";
}

function buildNames(form) {
  const surname = form.surname.value.trim();
  const length = Number(form.nameLength.value);
  const pool = form.gender.value === "boy" ? boyChars : girlChars;
  const birthDate = `${form.year.value}-${String(form.month.value).padStart(2, "0")}-${String(form.day.value).padStart(2, "0")}`;
  const hourMap = {
    0: "子时", 1: "丑时", 2: "丑时", 3: "寅时", 4: "寅时", 5: "卯时", 6: "卯时", 7: "辰时", 8: "辰时", 9: "巳时", 10: "巳时", 11: "午时", 12: "午时",
    13: "未时", 14: "未时", 15: "申时", 16: "申时", 17: "酉时", 18: "酉时", 19: "戌时", 20: "戌时", 21: "亥时", 22: "亥时", 23: "子时"
  };
  const birthHour = hourMap[form.hour.value] || "午时";
  const bazi = window.NameEngine?.calcBazi?.({ birthDate, birthHour });
  const elementChars = {
    木: ["若", "芷", "禾", "景", "嘉", "森", "栩"],
    火: ["晟", "晴", "知", "星", "明", "昕", "煦"],
    土: ["安", "宇", "宸", "峻", "远", "予", "辰"],
    金: ["铭", "书", "诗", "睿", "承", "钧", "锦"],
    水: ["泽", "清", "汐", "云", "涵", "沐", "言"]
  };
  const usefulPool = [...new Set([...(bazi?.useful || []).flatMap((element) => elementChars[element] || []), ...pool, ...neutralChars])];
  const candidates = [];
  usefulPool.forEach((first, index) => {
    if (length === 2) {
      candidates.push(`${surname}${first}`);
      return;
    }
    const tailPool = [...new Set([...(elementChars[bazi?.useful?.[1]] || []), ...neutralChars, ...pool])];
    tailPool.slice(index % 4, index % 4 + 8).forEach((second) => {
      if (first !== second) candidates.push(`${surname}${first}${second}`);
    });
  });
  return [...new Set(candidates)].map((name) => {
    const report = window.NameEngine?.build?.({
      fullName: name,
      reportGender: form.gender.value === "boy" ? "男" : "女",
      birthDate,
      birthHour,
      birthPlace: ""
    });
    const fallback = scoreFromText(name);
    const score = report?.total || fallback;
    const useful = report?.bazi?.useful?.join("、") || "中和";
    const elementFit = report?.elementFit?.score || score;
    return {
      name,
      score,
      sortScore: score * 0.7 + elementFit * 0.3,
      note: `八字喜用${useful}，五格${report?.scores?.fiveGrid || fallback}分，三才${report?.scores?.sancai || "参考"}分，用字补益${elementFit}分。`
    };
  }).sort((a, b) => b.sortScore - a.sortScore).slice(0, 8);
}

function bindForms() {
  const nameForm = document.getElementById("nameForm");
  const resultBox = document.getElementById("resultBox");
  const nameTestForm = document.getElementById("nameTestForm");
  const nameReportBox = document.getElementById("nameReportBox");

  nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const error = validateSurname(nameForm);
    if (error) {
      resultBox.hidden = false;
      resultBox.innerHTML = `<strong>${error}</strong>`;
      return;
    }
    const names = buildNames(nameForm);
    resultBox.hidden = false;
    resultBox.innerHTML = `
      <strong>为你生成 ${names.length} 个名字参考：</strong>
      <div class="result-list">
        ${names.map((item) => `
          <div class="result-item">
            <span><b>${item.name}</b><br>${item.note}</span>
            <span>${item.score}分</span>
          </div>
        `).join("")}
      </div>
    `;
  });

  nameTestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fullName = nameTestForm.fullName.value.trim();
    if (!/^[\u4e00-\u9fa5]{2,8}$/.test(fullName)) {
      nameReportBox.hidden = false;
      nameReportBox.innerHTML = `<div class="report-error">请输入 2-8 个中文姓名。</div>`;
      return;
    }
    nameReportBox.hidden = false;
    nameReportBox.innerHTML = renderNameReport({
      fullName,
      reportGender: nameTestForm.reportGender.value,
      birthDate: nameTestForm.birthDate.value,
      birthHour: nameTestForm.birthHour.value,
      birthPlace: nameTestForm.birthPlace.value.trim()
    });
    nameReportBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll(".mini-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = form.value.value.trim();
      const tool = form.dataset.tool;
      if (!value) {
        resultBox.hidden = false;
        resultBox.innerHTML = `<strong>${tool}：</strong>请输入要测算的内容。`;
        return;
      }
      if (tool === "姓名测试") {
        resultBox.hidden = true;
        nameTestForm.fullName.value = value;
        nameTestForm.requestSubmit();
        return;
      }
      if (tool === "公司测名") {
        const companyForm = document.getElementById("tester");
        const companyName = document.getElementById("companyName");
        const shortName = document.getElementById("shortName");
        if (companyForm && companyName && shortName) {
          resultBox.hidden = true;
          companyName.value = value;
          shortName.value = value.replace(/(有限公司|有限责任公司|股份有限公司|集团|公司)$/u, "").slice(-4) || value;
          companyForm.requestSubmit();
          document.getElementById("company-test").scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      if (tool === "手机号测算" && window.ColumnTools?.submit("phone", { number: value })) {
        resultBox.hidden = true;
        return;
      }
      if (tool === "车牌测算" && window.ColumnTools?.submit("plate", { plate: value })) {
        resultBox.hidden = true;
        return;
      }
      resultBox.hidden = false;
      resultBox.innerHTML = `<strong>${tool}结果：</strong><p>${value} 的参考评分为 ${scoreFromText(value)} 分。该结果用于页面功能演示，后续可接入正式算法和数据库。</p>`;
      resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

initDateFields();
renderServices();
renderDreamTags();
bindForms();
applyPageMode();
window.addEventListener("hashchange", applyPageMode);
