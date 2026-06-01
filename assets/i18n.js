(function () {
  const STORE_KEY = "1518_lang";
  const SUPPORTED = new Set(["zh", "en"]);
  const textSources = new WeakMap();
  const attrSources = new WeakMap();
  let currentLang = "zh";
  let applying = false;

  const exact = {
    "起名网": "Naming",
    "手机网页": "Mobile",
    "首页": "Home",
    "个人起名": "Personal Naming",
    "公司起名": "Company Naming",
    "品牌起名": "Brand Naming",
    "姓名测试": "Name Test",
    "周公解梦": "Dream Dictionary",
    "公司名测试": "Company Name Test",
    "品牌名测试": "Brand Name Test",
    "生肖查询": "Chinese Zodiac",
    "生肖配对": "Zodiac Match",
    "星座查询": "Western Zodiac",
    "星座配对": "Zodiac Compatibility",
    "生日密码": "Birthday Code",
    "风水查询": "Feng Shui",
    "血型分析": "Blood Type",
    "血型配对": "Blood Match",
    "五运六气": "Five Movements & Six Qi",
    "手机号测算": "Phone Number Test",
    "车牌测算": "Plate Number Test",
    "订单查询": "Order Lookup",
    "姓名": "Name",
    "性别": "Gender",
    "出生日期": "Birth Date",
    "出生时辰": "Birth Hour",
    "出生地": "Birth Place",
    "生成分析报告": "Generate Report",
    "男": "Male",
    "女": "Female",
    "单姓": "Single Surname",
    "双姓": "Compound Surname",
    "起名姓氏": "Surname",
    "出生时间": "Birth Time",
    "公历": "Solar Calendar",
    "农历": "Lunar Calendar",
    "取名字数": "Name Length",
    "二字名": "2 Characters",
    "三字名": "3 Characters",
    "开始起名": "Start Naming",
    "公司全称": "Full Company Name",
    "商号简称": "Trade Name",
    "所属行业": "Industry",
    "立即生成诊断": "Generate Diagnosis",
    "笔画校正": "Stroke Check",
    "逐字复核后，报告更像专业交付": "Review each character stroke count for a more professional report.",
    "总格": "Total Grid",
    "商号格": "Trade Name Grid",
    "行业格": "Industry Fit",
    "营业执照全称笔画和": "Full legal name stroke total",
    "日常传播简称笔画和": "Short trade name stroke total",
    "数理气质与赛道匹配": "Numerology tone matched to business sector",
    "1518 全栏目工具": "1518 Tools",
    "其他栏目功能页": "Other Tool Pages",
    "热门服务": "Popular Services",
    "快速测算": "Quick Tests",
    "热门解梦": "Popular Dreams",
    "本站内容基于传统文化与民俗资料整理，仅供娱乐参考。": "Content is based on traditional culture and folklore materials, for entertainment and reference only.",
    "公司起名方案报告": "Company Naming Report",
    "品牌起名方案报告": "Brand Naming Report",
    "品牌名测试报告": "Brand Name Test Report",
    "个人起名方案报告": "Personal Naming Report",
    "候选公司名": "Candidate Company Names",
    "品牌候选名": "Candidate Brand Names",
    "候选名字与数理": "Candidate Names & Numerology",
    "注册与传播建议": "Registration & Messaging Advice",
    "品牌诊断": "Brand Diagnosis",
    "工商注册可用性预查": "Business Registration Availability Precheck",
    "商标注册可用性预查": "Trademark Availability Precheck",
    "最终以官方受理和审查为准": "Final result depends on official acceptance and review",
    "等待预查": "Waiting",
    "待官方核验": "Official Check Needed",
    "需人工复核": "Manual Review",
    "近似风险": "Similarity Risk",
    "发现冲突": "Conflict Found",
    "识别度偏低": "Low Distinctiveness",
    "打开官方申报/检索": "Open Official Filing/Search",
    "复核已注册主体": "Check Existing Registrations",
    "国家市场监管总局企业名称申报系统 + 国家企业信用信息公示系统": "SAMR Name Filing System + National Enterprise Credit Information System",
    "国家知识产权局商标检索系统": "CNIPA Trademark Search System",
    "1518 栏目工具": "1518 Tool",
    "生成报告": "Generate Report",
    "注册地域": "Registration Region",
    "偏好字/关键词": "Preferred Word / Keyword",
    "组织后缀": "Entity Suffix",
    "品类/赛道": "Category / Sector",
    "目标用户": "Target Users",
    "品牌气质": "Brand Tone",
    "核心关键词": "Core Keyword",
    "商标类别": "Trademark Class",
    "品牌名": "Brand Name",
    "品类": "Category",
    "梦境关键词": "Dream Keyword",
    "梦境情境": "Dream Scene",
    "出生年份": "Birth Year",
    "你的生肖": "Your Zodiac",
    "TA 的生肖": "Their Zodiac",
    "你的星座": "Your Sign",
    "TA 的星座": "Their Sign",
    "生日": "Birthday",
    "空间类型": "Space Type",
    "主要朝向": "Main Direction",
    "重点问题": "Focus Area",
    "血型": "Blood Type",
    "你的血型": "Your Blood Type",
    "TA 的血型": "Their Blood Type",
    "查询日期": "Query Date",
    "手机号码": "Phone Number",
    "车牌号码": "Plate Number",
    "订单号/手机号": "Order No. / Phone",
    "联系人姓名": "Contact Name",
    "子时": "Zi Hour",
    "丑时": "Chou Hour",
    "寅时": "Yin Hour",
    "卯时": "Mao Hour",
    "辰时": "Chen Hour",
    "巳时": "Si Hour",
    "午时": "Wu Hour",
    "未时": "Wei Hour",
    "申时": "Shen Hour",
    "酉时": "You Hour",
    "戌时": "Xu Hour",
    "亥时": "Hai Hour"
  };

  const attr = {
    "1518 起名网首页": "1518 Home",
    "请输入姓名": "Enter a name",
    "请输入车牌号": "Enter a plate number",
    "请输入手机号码": "Enter a phone number",
    "请输入公司名全称": "Enter the full company name",
    "例如：王书翰": "Example: Wang Shuhan",
    "例如：上海": "Example: Shanghai",
    "输入姓氏": "Enter surname"
  };

  const phrases = [
    ["1518 起名网 - 20年中文起名测名工具", "1518 Naming - Chinese Name and Culture Tools Since 2006"],
    ["1518 起名网是长期运营的中文起名测名工具站，提供姓名测试、公司名测试、个人起名、公司起名、品牌起名、周公解梦、生肖星座、号码测算等传统文化参考服务。", "1518 Naming is a long-running Chinese naming and cultural reference site, offering name tests, company name tests, personal naming, company naming, brand naming, dream interpretation, zodiac tools and number tests."],
    ["1518 起名网提供姓名测试、个人起名、公司起名、公司名测试、周公解梦、生肖星座和号码测算等在线工具。", "1518 provides online tools for name testing, personal naming, company naming, company name testing, dream interpretation, zodiac and number tests."],
    ["每个栏目都采用与“姓名测试”“公司名测试”一致的报告页风格，保持统一的输入、测算和报告体验，后续再逐栏接入更大的数据库和更细算法。", "Each tool follows the same report-style workflow as Name Test and Company Name Test, with consistent inputs, calculations and report output. Larger datasets and deeper algorithms can be connected later."],
    ["放在姓名测试页尾，适合从测试结果继续生成个人名字候选。", "Placed at the end of the Name Test page, useful for generating personal name candidates after reviewing a test result."],
    ["易经数理 · 商业命名诊断", "I Ching Numerology · Business Naming Diagnosis"],
    ["按公司全称、商号简称、所属行业和易经数理，生成商业命名诊断。重点看品牌传播力、行业适配、融资扩张、现金流稳定与经营风险。", "Generate a business naming diagnosis from the full company name, trade name, industry and I Ching numerology, focusing on brand communication, industry fit, expansion, cash-flow stability and operating risk."],
    ["预查用于降低重名、近似和类别冲突风险，不构成工商核名、商标注册或法律可注册承诺。", "The precheck helps reduce duplicate, similar-name and class-conflict risk. It is not a legal promise of company name approval or trademark registration."],
    ["当前未连接后端注册数据接口，已提供官方核验入口。", "The backend registry data API is not connected yet. Official verification links are provided."],
    ["本地规则未发现明显禁用词，仍需连接官方或授权数据源做重名/近似检索。", "Local rules found no obvious restricted wording, but official or licensed data is still required for duplicate and similarity checks."],
    ["公司名称建议先确认行政区划、行业表述、组织形式，再围绕主体字号做商标、同名企业和负面舆情排查。", "For company names, confirm the region, industry wording and entity suffix first, then check the core trade name against trademarks, existing entities and negative associations."],
    ["正式使用前需做商标近似和同品类检索。", "Before official use, run similar trademark and same-category searches."],
    ["前端已收到查询，后端订单 API 待接入", "The frontend has received the query; the backend order API is not connected yet."],
    ["综合评分", "Overall Score"],
    ["报告生成日期", "Report Date"],
    ["姓名综合分析报告", "Comprehensive Name Analysis Report"],
    ["五格数理分析", "Five Grid Numerology"],
    ["八字分析", "Eight Characters Analysis"],
    ["三才配置", "Three-Talent Configuration"],
    ["音韵和谐", "Sound Harmony"],
    ["字义解析", "Character Meaning"],
    ["生肖用字", "Zodiac Character Fit"],
    ["西洋星座参考", "Western Zodiac Reference"],
    ["综合建议", "Overall Advice"],
    ["周公解梦报告", "Dream Interpretation Report"],
    ["生肖查询报告", "Chinese Zodiac Report"],
    ["星座查询报告", "Western Zodiac Report"],
    ["手机号测算报告", "Phone Number Report"],
    ["车牌测算报告", "Plate Number Report"],
    ["订单查询结果", "Order Lookup Result"]
  ];

  [
    ["个人起名", "Personal Naming"],
    ["公司起名", "Company Naming"],
    ["品牌起名", "Brand Naming"],
    ["姓名测试", "Name Test"],
    ["公司名测试", "Company Name Test"],
    ["品牌名测试", "Brand Name Test"],
    ["周公解梦", "Dream Dictionary"],
    ["生肖查询", "Chinese Zodiac"],
    ["生肖配对", "Zodiac Match"],
    ["星座查询", "Western Zodiac"],
    ["星座配对", "Zodiac Compatibility"],
    ["生日密码", "Birthday Code"],
    ["风水查询", "Feng Shui"],
    ["血型分析", "Blood Type"],
    ["血型配对", "Blood Match"],
    ["五运六气", "Five Movements & Six Qi"],
    ["手机号测算", "Phone Number Test"],
    ["车牌测算", "Plate Number Test"],
    ["订单查询", "Order Lookup"]
  ].forEach((item) => phrases.push(item));

  const routeMeta = {
    home: ["1518 Naming - Chinese Name and Culture Tools Since 2006", "1518 起名网 - 20年中文起名测名工具"],
    "name-test": ["Name Test and Chinese Name Score - 1518 Naming", "姓名测试_姓名打分_名字测试打分 - 1518 起名网"],
    baby: ["Personal Naming and Baby Names - 1518 Naming", "个人起名_宝宝起名_生辰八字起名 - 1518 起名网"],
    "company-test": ["Company Name Test and Business Name Score - 1518 Naming", "公司名测试_公司测名打分_企业名称测算 - 1518 起名网"],
    company: ["Company Naming and Business Name Ideas - 1518 Naming", "公司起名_企业起名_公司取名大全 - 1518 起名网"],
    brand: ["Brand Naming and Trademark Name Ideas - 1518 Naming", "品牌起名_商标起名_店铺品牌取名 - 1518 起名网"],
    "brand-test": ["Brand Name Test and Trademark Name Check - 1518 Naming", "品牌名测试_品牌名字打分_商标名称测算 - 1518 起名网"],
    dream: ["Dream Interpretation Dictionary - 1518 Naming", "周公解梦_梦境解析_梦见大全查询 - 1518 起名网"],
    zodiac: ["Chinese Zodiac Lookup - 1518 Naming", "生肖查询_属相查询_十二生肖年份表 - 1518 起名网"],
    match: ["Chinese Zodiac Compatibility - 1518 Naming", "生肖配对_属相配对_十二生肖婚配查询 - 1518 起名网"],
    astro: ["Western Zodiac Sign Lookup - 1518 Naming", "星座查询_十二星座日期查询_星座性格 - 1518 起名网"],
    "astro-match": ["Western Zodiac Compatibility - 1518 Naming", "星座配对_十二星座配对_情侣星座配对 - 1518 起名网"],
    birthday: ["Birthday Code and Personality - 1518 Naming", "生日密码_生日性格解析_出生日期测算 - 1518 起名网"],
    fengshui: ["Feng Shui Check - 1518 Naming", "风水查询_家居风水_办公室风水布局 - 1518 起名网"],
    blood: ["Blood Type Personality - 1518 Naming", "血型分析_ABO血型性格_血型测试 - 1518 起名网"],
    "blood-match": ["Blood Type Compatibility - 1518 Naming", "血型配对_ABO血型配对_血型爱情配对 - 1518 起名网"],
    wuyun: ["Five Movements and Six Qi Lookup - 1518 Naming", "五运六气查询_岁运节气_中医五运六气 - 1518 起名网"],
    phone: ["Phone Number Test - 1518 Naming", "手机号测算_手机号码吉凶_号码测试 - 1518 起名网"],
    plate: ["License Plate Number Test - 1518 Naming", "车牌测算_车牌号码吉凶_车牌号测试 - 1518 起名网"],
    orders: ["Order Lookup - 1518 Naming", "订单查询_起名报告查询_1518订单状态 - 1518 起名网"],
    "all-tools": ["1518 Tools - Naming, Dream, Zodiac and Number Tests", "1518 全栏目工具_起名测名解梦生肖星座号码测算"]
  };

  const optionLabels = {
    "AI / 科技互联网": "AI / Technology",
    "金融投资 / 财税资管": "Finance / Investment",
    "地产建筑 / 工程实业": "Real Estate / Construction",
    "电商直播 / 传媒新媒体": "E-commerce / Media",
    "餐饮实体 / 民生消费": "Food / Consumer",
    "教育培训 / 康养健康": "Education / Health",
    "外贸出海 / 跨境商贸": "Cross-border Trade",
    "连锁加盟 / 品牌总部": "Franchise / Brand HQ",
    "律所咨询 / 高端商务": "Legal / Consulting",
    "家族企业 / 传承老店": "Family Business",
    "科技互联网": "Technology",
    "金融投资": "Finance",
    "餐饮消费": "Food & Consumer",
    "教育康养": "Education & Health",
    "外贸出海": "Cross-border",
    "咨询服务": "Consulting",
    "地产建筑": "Real Estate",
    "专业可信": "Professional",
    "年轻活泼": "Young & Lively",
    "高端克制": "Premium",
    "国风雅致": "Chinese Classic",
    "科技未来": "Tech Future",
    "第09类 科学仪器": "Class 09 Scientific Instruments",
    "第35类 广告销售": "Class 35 Advertising & Sales",
    "第41类 教育娱乐": "Class 41 Education & Entertainment",
    "第42类 科技服务": "Class 42 Technology Services",
    "第43类 餐饮住宿": "Class 43 Food & Hospitality",
    "自然类": "Nature",
    "动物类": "Animals",
    "人物类": "People",
    "生活类": "Life",
    "建筑类": "Buildings",
    "身体类": "Body",
    "情爱类": "Love",
    "孕妇类": "Pregnancy",
    "住宅": "Home",
    "办公室": "Office",
    "商铺": "Shop",
    "书房": "Study",
    "卧室": "Bedroom",
    "坐北朝南": "North to South",
    "坐南朝北": "South to North",
    "坐东朝西": "East to West",
    "坐西朝东": "West to East",
    "财位与动线": "Wealth Area & Flow",
    "睡眠健康": "Sleep & Health",
    "办公效率": "Office Efficiency",
    "门窗冲煞": "Doors & Windows",
    "采光通风": "Light & Ventilation"
  };

  function translateText(value) {
    if (!value || currentLang === "zh") return value;
    const trimmed = value.trim();
    if (!trimmed) return value;
    const mapped = exact[trimmed] || optionLabels[trimmed];
    if (mapped) return value.replace(trimmed, mapped);
    let next = value;
    phrases.forEach(([zh, en]) => {
      next = next.split(zh).join(en);
    });
    return next;
  }

  function originalText(node) {
    if (!textSources.has(node)) textSources.set(node, node.nodeValue);
    return textSources.get(node);
  }

  function originalAttr(node, name) {
    let store = attrSources.get(node);
    if (!store) {
      store = {};
      attrSources.set(node, store);
    }
    if (!(name in store)) store[name] = node.getAttribute(name);
    return store[name];
  }

  function translateNode(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      node.nodeValue = translateText(originalText(node));
    });

    root.querySelectorAll?.("[placeholder], [aria-label], [title]").forEach((node) => {
      ["placeholder", "aria-label", "title"].forEach((name) => {
        if (!node.hasAttribute(name)) return;
        const source = originalAttr(node, name);
        const mapped = currentLang === "zh" ? source : (attr[source] || translateText(source));
        node.setAttribute(name, mapped);
      });
    });
  }

  function updateMeta() {
    const route = window.location.hash.replace(/^#/, "") || "home";
    const meta = routeMeta[route] || routeMeta.home;
    const description = document.querySelector('meta[name="description"]');
    if (currentLang === "zh") {
      document.documentElement.lang = "zh-CN";
      document.body.classList.remove("lang-en");
      document.title = meta[1];
      if (description) description.content = "1518 起名网是长期运营的中文起名测名工具站，提供姓名测试、公司名测试、个人起名、公司起名、品牌起名、周公解梦、生肖星座、号码测算等传统文化参考服务。";
      return;
    }
    document.documentElement.lang = "en";
    document.body.classList.add("lang-en");
    document.title = meta[0];
    if (description) description.content = "1518 Naming provides Chinese name tests, company name checks, personal naming, company naming, brand naming, dream interpretation, zodiac tools and number tests.";
  }

  function updateButtons() {
    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.langSwitch === currentLang ? "true" : "false");
    });
  }

  function applyLanguage(lang) {
    currentLang = SUPPORTED.has(lang) ? lang : "zh";
    applying = true;
    updateMeta();
    translateNode(document.body);
    updateButtons();
    applying = false;
    localStorage.setItem(STORE_KEY, currentLang);
  }

  function setUrlLang(lang) {
    const url = new URL(window.location.href);
    if (lang === "zh") url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function init() {
    const url = new URL(window.location.href);
    const urlLang = url.searchParams.get("lang");
    const stored = localStorage.getItem(STORE_KEY);
    applyLanguage(SUPPORTED.has(urlLang) ? urlLang : stored || "zh");
    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      button.addEventListener("click", () => {
        const lang = button.dataset.langSwitch;
        setUrlLang(lang);
        applyLanguage(lang);
      });
    });
    const observer = new MutationObserver((mutations) => {
      if (applying || currentLang === "zh") return;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) translateNode(node);
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) node.nodeValue = translateText(originalText(node));
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("hashchange", () => setTimeout(() => applyLanguage(currentLang), 0));
    window.I18n1518 = { applyLanguage, get currentLang() { return currentLang; } };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
