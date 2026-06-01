(function () {
  const ELEMENTS = ["木", "火", "土", "金", "水"];
  const ZODIACS = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
  const ZODIAC_BRANCH = {
    鼠: "子", 牛: "丑", 虎: "寅", 兔: "卯", 龙: "辰", 蛇: "巳", 马: "午", 羊: "未", 猴: "申", 鸡: "酉", 狗: "戌", 猪: "亥"
  };
  const GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  const GAN_ELEMENT = { 甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土", 己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水" };
  const ZHI_ELEMENT = { 子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火", 午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水" };
  const NAYIN = [
    "海中金", "海中金", "炉中火", "炉中火", "大林木", "大林木", "路旁土", "路旁土", "剑锋金", "剑锋金",
    "山头火", "山头火", "涧下水", "涧下水", "城头土", "城头土", "白蜡金", "白蜡金", "杨柳木", "杨柳木",
    "泉中水", "泉中水", "屋上土", "屋上土", "霹雳火", "霹雳火", "松柏木", "松柏木", "长流水", "长流水",
    "沙中金", "沙中金", "山下火", "山下火", "平地木", "平地木", "壁上土", "壁上土", "金箔金", "金箔金",
    "覆灯火", "覆灯火", "天河水", "天河水", "大驿土", "大驿土", "钗钏金", "钗钏金", "桑柘木", "桑柘木",
    "大溪水", "大溪水", "沙中土", "沙中土", "天上火", "天上火", "石榴木", "石榴木", "大海水", "大海水"
  ];
  const ZODIAC_RELATIONS = {
    六合: [["鼠", "牛"], ["虎", "猪"], ["兔", "狗"], ["龙", "鸡"], ["蛇", "猴"], ["马", "羊"]],
    三合: [["猴", "鼠", "龙"], ["蛇", "鸡", "牛"], ["虎", "马", "狗"], ["猪", "兔", "羊"]],
    六冲: [["鼠", "马"], ["牛", "羊"], ["虎", "猴"], ["兔", "鸡"], ["龙", "狗"], ["蛇", "猪"]],
    六害: [["鼠", "羊"], ["牛", "马"], ["虎", "蛇"], ["兔", "龙"], ["猴", "猪"], ["鸡", "狗"]]
  };
  const SIGNS = [
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
  const BLOODS = {
    A: { core: "谨慎、重秩序、责任感强", work: "适合流程、管理、研究和需要长期耐心的岗位", love: "慢热，重视承诺和安全感" },
    B: { core: "自由、直接、兴趣驱动强", work: "适合创意、销售、产品探索和灵活协作", love: "需要空间，喜欢轻松自然的关系" },
    O: { core: "行动力强、目标感重、外向担当", work: "适合带团队、做业务、开拓市场和整合资源", love: "表达直接，喜欢清晰稳定的互动" },
    AB: { core: "理性与感性并存，边界感强", work: "适合策略、审美、咨询、技术和跨界工作", love: "重视精神共鸣，也需要独处空间" }
  };
  const NAME_CHARS = {
    boy: ["承", "远", "景", "皓", "峻", "铭", "泽", "宇", "宸", "睿", "晟", "知"],
    girl: ["若", "芷", "清", "诗", "晴", "瑶", "宁", "悦", "汐", "安", "嘉", "予"],
    brand: ["星", "辰", "云", "禾", "元", "启", "森", "瑞", "达", "知", "澄", "一"]
  };
  const DEFAULT_REGISTRY_API = {
    companyEndpoint: "/api/registry/company-name-check",
    trademarkEndpoint: "/api/registry/trademark-check",
    timeoutMs: 6000,
    official: {
      companyNameDeclaration: "https://wsdj.samr.gov.cn/saicmcdjweb/",
      companyCreditSearch: "https://www.gsxt.gov.cn/",
      trademarkSearch: "https://so.cnipa.cn/"
    }
  };

  const TOOLS = [
    {
      id: "baby",
      nav: "个人起名",
      title: "个人起名",
      intro: "结合姓氏、性别、出生时间、五行补益、音形义和生肖用字，生成个人名字候选报告。",
      fields: [
        ["surname", "姓氏", "text", "王"],
        ["gender", "性别", "select", "男", ["男", "女"]],
        ["birthDate", "出生日期", "date", "2026-06-02"],
        ["birthHour", "出生时辰", "select", "午时", ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"]],
        ["length", "名字字数", "select", "三字名", ["二字名", "三字名"]]
      ],
      build: buildNamingReport
    },
    {
      id: "company",
      nav: "公司起名",
      title: "公司起名",
      intro: "按行业、地域、主体偏好和易经数理，生成公司商号候选与注册全称结构。",
      fields: [
        ["region", "注册地域", "text", "上海"],
        ["industry", "所属行业", "select", "科技互联网", ["科技互联网", "金融投资", "餐饮消费", "教育康养", "外贸出海", "咨询服务", "地产建筑"]],
        ["keyword", "偏好字/关键词", "text", "智能"],
        ["suffix", "组织后缀", "select", "有限公司", ["有限公司", "有限责任公司", "股份有限公司", "集团有限公司"]]
      ],
      build: buildCompanyNamingReport
    },
    {
      id: "brand",
      nav: "品牌起名",
      title: "品牌起名",
      intro: "面向产品、店铺、商标和新媒体账号，生成短、亮、易传播的品牌名。",
      fields: [
        ["category", "品类/赛道", "text", "AI 学习工具"],
        ["audience", "目标用户", "text", "中小企业老板"],
        ["tone", "品牌气质", "select", "专业可信", ["专业可信", "年轻活泼", "高端克制", "国风雅致", "科技未来"]],
        ["keyword", "核心关键词", "text", "增长"],
        ["trademarkClass", "商标类别", "select", "第35类 广告销售", ["第09类 科学仪器", "第35类 广告销售", "第41类 教育娱乐", "第42类 科技服务", "第43类 餐饮住宿"]]
      ],
      build: buildBrandNamingReport
    },
    {
      id: "brand-test",
      nav: "品牌名测试",
      title: "品牌名测试",
      intro: "检查品牌名的传播力、品类联想、音节节奏、数理和基础风险。",
      fields: [
        ["brandName", "品牌名", "text", "星禾智造"],
        ["category", "品类", "text", "智能硬件"],
        ["audience", "目标用户", "text", "企业客户"],
        ["trademarkClass", "商标类别", "select", "第09类 科学仪器", ["第09类 科学仪器", "第35类 广告销售", "第41类 教育娱乐", "第42类 科技服务", "第43类 餐饮住宿"]]
      ],
      build: buildBrandTestReport
    },
    {
      id: "dream",
      nav: "周公解梦",
      title: "周公解梦",
      intro: "按梦境关键词生成传统梦书解释、现代心理参考和现实提醒。",
      fields: [
        ["keyword", "梦境关键词", "text", "梦见蛇"],
        ["scene", "梦境情境", "select", "生活类", ["自然类", "动物类", "人物类", "生活类", "建筑类", "身体类", "情爱类", "孕妇类"]]
      ],
      build: buildDreamReport
    },
    {
      id: "zodiac",
      nav: "生肖查询",
      title: "生肖查询",
      intro: "按出生年份查询生肖、地支、五行倾向、六合三合和年度参考。",
      fields: [
        ["year", "出生年份", "number", "1990"]
      ],
      build: buildZodiacReport
    },
    {
      id: "match",
      nav: "生肖配对",
      title: "生肖配对",
      intro: "按十二生肖六合、三合、六冲、六害关系生成配对报告。",
      fields: [
        ["zodiacA", "你的生肖", "select", "马", ZODIACS],
        ["zodiacB", "TA 的生肖", "select", "羊", ZODIACS]
      ],
      build: buildZodiacMatchReport
    },
    {
      id: "astro",
      nav: "星座查询",
      title: "星座查询",
      intro: "按生日查询太阳星座、四象属性、守护星和性格倾向。",
      fields: [
        ["birthday", "出生日期", "date", "1990-06-15"]
      ],
      build: buildAstroReport
    },
    {
      id: "astro-match",
      nav: "星座配对",
      title: "星座配对",
      intro: "按星座四象、节奏与关系需求生成配对指数。",
      fields: [
        ["signA", "你的星座", "select", "巨蟹座", SIGNS.map((item) => item[0])],
        ["signB", "TA 的星座", "select", "天秤座", SIGNS.map((item) => item[0])]
      ],
      build: buildAstroMatchReport
    },
    {
      id: "birthday",
      nav: "生日密码",
      title: "生日密码",
      intro: "按生日生成性格关键词、优势挑战、关系建议和幸运元素。",
      fields: [
        ["birthday", "生日", "date", "1990-06-15"]
      ],
      build: buildBirthdayReport
    },
    {
      id: "fengshui",
      nav: "风水查询",
      title: "风水查询",
      intro: "以空间类型、朝向和使用场景生成家居/办公风水体检报告。",
      fields: [
        ["space", "空间类型", "select", "住宅", ["住宅", "办公室", "商铺", "书房", "卧室"]],
        ["direction", "主要朝向", "select", "坐北朝南", ["坐北朝南", "坐南朝北", "坐东朝西", "坐西朝东", "坐东北朝西南", "坐西南朝东北"]],
        ["focus", "重点问题", "select", "财位与动线", ["财位与动线", "睡眠健康", "办公效率", "门窗冲煞", "采光通风"]]
      ],
      build: buildFengshuiReport
    },
    {
      id: "blood",
      nav: "血型分析",
      title: "血型分析",
      intro: "按 ABO 血型输出性格、人际、职场和关系参考。",
      fields: [
        ["blood", "血型", "select", "A", ["A", "B", "O", "AB"]]
      ],
      build: buildBloodReport
    },
    {
      id: "blood-match",
      nav: "血型配对",
      title: "血型配对",
      intro: "按 ABO 血型互补关系生成沟通、情感和协作建议。",
      fields: [
        ["bloodA", "你的血型", "select", "A", ["A", "B", "O", "AB"]],
        ["bloodB", "TA 的血型", "select", "O", ["A", "B", "O", "AB"]]
      ],
      build: buildBloodMatchReport
    },
    {
      id: "wuyun",
      nav: "五运六气",
      title: "五运六气",
      intro: "按年份和日期输出岁运、节气阶段、气候与养生参考。",
      fields: [
        ["date", "查询日期", "date", "2026-06-02"]
      ],
      build: buildWuyunReport
    },
    {
      id: "phone",
      nav: "手机号测算",
      title: "手机号测算",
      intro: "按号码尾数、数字五行、易经数理和重复结构生成号码报告。",
      fields: [
        ["number", "手机号码", "tel", "13800138000"]
      ],
      build: buildNumberReport
    },
    {
      id: "plate",
      nav: "车牌测算",
      title: "车牌测算",
      intro: "按车牌数字、字母、尾号和易经数理生成车牌参考报告。",
      fields: [
        ["plate", "车牌号码", "text", "沪A8X518"]
      ],
      build: buildPlateReport
    }
  ];

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    }[char]));
  }

  function hashScore(text, min = 72, max = 96) {
    const chars = Array.from(String(text || "1518"));
    const sum = chars.reduce((total, char, index) => total + char.charCodeAt(0) * (index + 3), 0);
    return min + (sum % (max - min + 1));
  }

  function normalize81(total) {
    const mod = Math.abs(total) % 81;
    return mod === 0 ? 81 : mod;
  }

  function numerology(number) {
    const data = window.NameSharedData;
    const normalized = normalize81(number);
    const row = data?.NUMEROLOGY?.[normalized];
    if (!row) return { number: normalized, title: "数理参考", level: "平吉", score: 68, text: "该数理暂以基础规则解释。", advice: "建议接入完整易经数理库。" };
    const level = data.LEVELS?.[row[1]] || { label: row[1], score: 68 };
    return { number: normalized, title: row[0], level: level.label, score: level.score, text: row[2], advice: row[3] };
  }

  function strokeOfText(text) {
    const common = window.NameSharedData?.COMMON_STROKES || {};
    return Array.from(String(text || "")).reduce((sum, char) => {
      if (/[\u3400-\u9fff]/u.test(char)) return sum + (common[char] || 10);
      if (/\d/.test(char)) return sum + Number(char);
      if (/[a-z]/i.test(char)) return sum + (char.toUpperCase().charCodeAt(0) - 64);
      return sum;
    }, 0);
  }

  function grade(score) {
    if (score >= 92) return "优秀";
    if (score >= 86) return "大吉";
    if (score >= 78) return "吉";
    if (score >= 68) return "中吉";
    return "待优化";
  }

  function fieldHtml(field) {
    const [name, label, type, value, options] = field;
    if (type === "select") {
      return `<label><span>${label}</span><select name="${name}">${options.map((option) => `<option value="${escapeHtml(option)}"${option === value ? " selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></label>`;
    }
    return `<label><span>${label}</span><input name="${name}" type="${type}" value="${escapeHtml(value)}" autocomplete="off"></label>`;
  }

  function collect(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  function scoreCards(items) {
    return `<div class="score-grid">${items.map(([label, score, note]) => `
      <div class="report-score-card"><span>${escapeHtml(label)}</span><strong>${score}</strong><em>${escapeHtml(note || grade(score))}</em></div>
    `).join("")}</div>`;
  }

  function table(rows) {
    return `<table class="report-table"><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  function page(title, body, footer = "1518 栏目报告") {
    return `<section class="report-section report-pdf-page"><h3>${title}</h3>${body}<footer class="report-page-footer">${footer}</footer></section>`;
  }

  function cover(title, subject, scores, meta) {
    const total = Math.round(scores.reduce((sum, item) => sum + item[1], 0) / scores.length);
    return `<section class="report-cover report-pdf-page">
      <div><p class="report-logo">1518</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(meta)}</p><p>综合评分：${total}分（${grade(total)}） · ${new Date().toLocaleDateString("zh-CN")}</p></div>
      <div class="name-hero"><div class="name-large"><span>${escapeHtml(subject)}</span></div><div class="pinyin">1518 report system</div><div class="score-ring"><strong>${total}</strong><span>综合评分</span><em>${grade(total)}</em></div></div>
      ${scoreCards(scores)}
    </section>`;
  }

  function resultShell(tool, data, pages) {
    return `<article class="report-page column-report">${pages.join("")}</article>`;
  }

  function officialRegistryLinks() {
    const api = { ...DEFAULT_REGISTRY_API, ...(window.RegistryApiConfig || {}) };
    return api.official;
  }

  function buildRegistryPanel(kind, items, context = {}) {
    const links = officialRegistryLinks();
    const payload = encodeURIComponent(JSON.stringify({ kind, items, context }));
    const rows = items.map((name) => `
      <div class="registry-check-row" data-check-name="${escapeHtml(name)}">
        <strong>${escapeHtml(name)}</strong>
        <span class="registry-status pending">等待预查</span>
        <p>正在连接注册数据源；若未配置后端 API，将显示官方核验入口。</p>
      </div>
    `).join("");
    const title = kind === "company" ? "工商注册可用性预查" : "商标注册可用性预查";
    const primaryLink = kind === "company" ? links.companyNameDeclaration : links.trademarkSearch;
    const secondaryLink = kind === "company" ? links.companyCreditSearch : links.trademarkSearch;
    const sourceText = kind === "company" ? "国家市场监管总局企业名称申报系统 + 国家企业信用信息公示系统" : "国家知识产权局商标检索系统";
    return `
      <section class="registry-check-panel" data-registry-check="${kind}" data-registry-payload="${payload}">
        <div class="registry-check-head">
          <div>
            <p class="company-eyebrow">${sourceText}</p>
            <h4>${title}</h4>
          </div>
          <span>最终以官方受理和审查为准</span>
        </div>
        <div class="registry-check-list">${rows}</div>
        <div class="registry-check-actions">
          <a href="${primaryLink}" target="_blank" rel="noopener">打开官方申报/检索</a>
          <a href="${secondaryLink}" target="_blank" rel="noopener">复核已注册主体</a>
        </div>
        <p class="registry-check-note">预查用于降低重名、近似和类别冲突风险，不构成工商核名、商标注册或法律可注册承诺。</p>
      </section>
    `;
  }

  function buildNamingReport(tool, data) {
    const pool = data.gender === "女" ? NAME_CHARS.girl : NAME_CHARS.boy;
    const surname = (data.surname || "王").slice(0, 2);
    const seed = hashScore(`${surname}${data.birthDate}${data.birthHour}`, 1, 999);
    const names = Array.from({ length: 8 }, (_, index) => {
      const a = pool[(seed + index * 2) % pool.length];
      const b = data.length === "二字名" ? "" : NAME_CHARS.brand[(seed + index * 3) % NAME_CHARS.brand.length];
      const name = `${surname}${a}${b}`;
      const n = numerology(strokeOfText(name));
      return { name, score: Math.min(99, Math.round(n.score * 0.72 + hashScore(name, 10, 25))), n };
    });
    const scores = [["八字补益", hashScore(data.birthDate, 82, 96)], ["五格数理", names[0].score], ["音形义", hashScore(names[0].name, 80, 96)], ["生肖用字", hashScore(data.birthHour, 78, 92)]];
    const pages = [
      cover("个人起名方案报告", `${surname}氏个人起名`, scores, `${data.gender} · ${data.birthDate} · ${data.birthHour}`),
      page("候选名字与数理", `<div class="column-name-list">${names.map((item) => `<div><strong>${item.name}</strong><span>${item.score}分 · ${item.n.number}画 ${item.n.title}</span><p>${item.n.text}</p></div>`).join("")}</div>`, "1518 个人起名 · 2/3"),
      page("取名建议", `<p>建议优先选择读音清楚、书写成本低、寓意正向且与八字喜用方向不冲突的名字。</p>${table([["五格", "取候选名总笔画换算易经数理，避开大凶数"], ["音义", "避免生僻字、拗口连读和负面谐音"], ["生肖", "先看中性安全，再结合八字五行补益"], ["后续升级", "接入全量康熙笔画、拼音多音字、诗词库后可做深度筛选"]])}`, "1518 个人起名 · 3/3")
    ];
    return resultShell(tool, data, pages);
  }

  function buildCompanyNamingReport(tool, data) {
    const bases = ["星辰", "瑞禾", "云启", "元达", "知远", "森合", "澄明", "一诺"];
    const names = bases.map((base, index) => {
      const subject = `${data.region}${base}${data.industry.replace(/互联网|投资|消费|康养|服务|建筑/g, "")}${data.suffix}`;
      const n = numerology(strokeOfText(subject));
      return { subject, base, score: Math.min(99, n.score + (index % 4) * 2), n };
    }).sort((a, b) => b.score - a.score).slice(0, 6);
    const scores = [["商号数理", names[0].score], ["行业适配", hashScore(data.industry, 82, 96)], ["传播清晰", hashScore(data.keyword, 78, 92)], ["注册友好", hashScore(data.region, 74, 90)]];
    const pages = [
      cover("公司起名方案报告", data.industry, scores, `${data.region} · ${data.keyword} · ${data.suffix}`),
      page("候选公司名", `<div class="column-name-list">${names.map((item) => `<div><strong>${item.subject}</strong><span>${item.score}分 · ${item.n.number}数 ${item.n.title}</span><p>${item.n.text}</p></div>`).join("")}</div>`, "1518 公司起名 · 2/3"),
      page("注册与传播建议", `<p>公司名称建议先确认行政区划、行业表述、组织形式，再围绕主体字号做商标、同名企业和负面舆情排查。</p>${buildRegistryPanel("company", names.map((item) => item.subject), { region: data.region, industry: data.industry, suffix: data.suffix })}${table([["行业定位", escapeHtml(data.industry)], ["主体字号", "控制在 2-4 个汉字，降低记忆成本"], ["风险提示", "预查不替代工商核名和商标检索"], ["下一步", "接入企业名称库、商标近似检索和行业禁限词库"]])}`, "1518 公司起名 · 3/3")
    ];
    return resultShell(tool, data, pages);
  }

  function buildBrandNamingReport(tool, data) {
    const fragments = ["星禾", "云问", "知见", "元启", "澄光", "森答", "瑞行", "一策"];
    const names = fragments.map((name) => {
      const score = hashScore(`${name}${data.category}${data.tone}`, 78, 96);
      return { name, score, n: numerology(strokeOfText(name)) };
    }).sort((a, b) => b.score - a.score);
    const scores = [["记忆度", names[0].score], ["品类联想", hashScore(data.category, 80, 95)], ["传播节奏", hashScore(data.tone, 78, 94)], ["商标风险", hashScore(data.keyword, 70, 88)]];
    return resultShell(tool, data, [
      cover("品牌起名方案报告", data.category, scores, `${data.audience} · ${data.tone}`),
      page("品牌候选名", `<div class="column-name-list">${names.map((item) => `<div><strong>${item.name}</strong><span>${item.score}分 · ${item.n.title}</span><p>适合${escapeHtml(data.tone)}气质，名称短、便于口头传播。正式使用前需做商标近似和同品类检索。</p></div>`).join("")}</div>${buildRegistryPanel("trademark", names.map((item) => item.name), { category: data.category, audience: data.audience, trademarkClass: data.trademarkClass })}`, "1518 品牌起名 · 2/2")
    ]);
  }

  function buildBrandTestReport(tool, data) {
    const n = numerology(strokeOfText(data.brandName));
    const scores = [["传播力", hashScore(data.brandName, 78, 96)], ["品类联想", hashScore(data.category, 76, 93)], ["数理参考", n.score], ["受众匹配", hashScore(data.audience, 74, 92)]];
    return resultShell(tool, data, [
      cover("品牌名测试报告", data.brandName, scores, `${data.category} · ${data.audience}`),
      page("品牌诊断", `<p>${escapeHtml(data.brandName)} 的数理为 ${n.number}，属于「${n.title}」：${n.text}</p>${buildRegistryPanel("trademark", [data.brandName], { category: data.category, audience: data.audience, trademarkClass: data.trademarkClass })}${table([["音节", "建议保持 2-4 个汉字，方便搜索、记忆和口播"], ["联想", `当前更偏向${escapeHtml(data.category)}，需避免跨品类误读`], ["风险", "需补充商标近似、同名品牌、负面谐音和多语种含义检查"], ["建议", n.advice]])}`, "1518 品牌名测试 · 2/2")
    ]);
  }

  function localRegistryRisk(name, kind) {
    const length = Array.from(name).filter((char) => /[\u3400-\u9fff]/u.test(char)).length;
    const genericWords = /(中国|中华|国家|全国|国际|集团|银行|证券|保险|大学|医院|协会|中心)/u;
    const genericBrand = /(优选|精选|天下|中国|国际|官方|第一|旗舰)/u;
    if (kind === "company" && genericWords.test(name)) return { status: "review", label: "需人工复核", note: "名称包含可能受限制或需证明材料的表述，建议先走官方名称申报系统。", conflicts: [] };
    if (kind === "trademark" && genericBrand.test(name)) return { status: "review", label: "近似风险", note: "品牌词较通用或宣传性较强，需要按商标类别做近似检索。", conflicts: [] };
    if (length < 2) return { status: "review", label: "识别度偏低", note: "名称过短，重名和近似概率较高。", conflicts: [] };
    return { status: "unknown", label: "待官方核验", note: "本地规则未发现明显禁用词，仍需连接官方或授权数据源做重名/近似检索。", conflicts: [] };
  }

  async function fetchRegistry(endpoint, payload, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  function normalizeRegistryResults(items, remote, kind) {
    const rows = Array.isArray(remote?.results) ? remote.results : [];
    return items.map((name) => {
      const remoteRow = rows.find((item) => item.name === name);
      return remoteRow || { name, ...localRegistryRisk(name, kind) };
    });
  }

  function renderRegistryStatus(row, data) {
    const statusMap = {
      available: ["可继续申报", "available"],
      clear: ["未见明显冲突", "available"],
      conflict: ["发现冲突", "conflict"],
      unavailable: ["不可用", "conflict"],
      review: ["需人工复核", "review"],
      unknown: ["待官方核验", "pending"]
    };
    const [label, className] = statusMap[row.status] || [row.label || "待官方核验", "pending"];
    const conflicts = Array.isArray(row.conflicts) && row.conflicts.length ? `疑似冲突：${row.conflicts.map(escapeHtml).join("、")}` : row.note || "请以官方查询和最终审查为准。";
    data.status.className = `registry-status ${className}`;
    data.status.textContent = row.label || label;
    data.text.textContent = conflicts;
  }

  async function runRegistrationChecks(scope = document) {
    const panels = [...scope.querySelectorAll("[data-registry-check]")];
    const api = { ...DEFAULT_REGISTRY_API, ...(window.RegistryApiConfig || {}) };
    await Promise.all(panels.map(async (panel) => {
      const kind = panel.dataset.registryCheck;
      const payload = JSON.parse(decodeURIComponent(panel.dataset.registryPayload || "%7B%7D"));
      const rows = [...panel.querySelectorAll(".registry-check-row")].map((row) => ({
        row,
        name: row.dataset.checkName,
        status: row.querySelector(".registry-status"),
        text: row.querySelector("p")
      }));
      const endpoint = kind === "company" ? api.companyEndpoint : api.trademarkEndpoint;
      try {
        const remote = await fetchRegistry(endpoint, payload, api.timeoutMs);
        normalizeRegistryResults(payload.items || [], remote, kind).forEach((result) => {
          const target = rows.find((item) => item.name === result.name);
          if (target) renderRegistryStatus(result, target);
        });
      } catch (error) {
        rows.forEach((item) => renderRegistryStatus({ name: item.name, ...localRegistryRisk(item.name, kind), note: "当前未连接后端注册数据接口，已提供官方核验入口。" }, item));
      }
    }));
  }

  function buildDreamReport(tool, data) {
    const keyword = data.keyword || "梦境";
    const tone = /蛇|虎|血|追|掉牙|火|水/.test(keyword) ? "梦境信息较强，说明近期情绪、压力或关系议题较容易被潜意识放大。" : "梦境信息偏中性，更多像是日常经验、记忆和情绪的整理。";
    const scores = [["梦境强度", hashScore(keyword, 70, 96)], ["现实关联", hashScore(data.scene, 68, 92)], ["情绪波动", hashScore(`${keyword}${data.scene}`, 60, 88)], ["化解建议", 86]];
    return resultShell(tool, data, [
      cover("周公解梦报告", keyword, scores, data.scene),
      page("传统解释与现代参考", `<p><b>传统梦书角度：</b>${escapeHtml(keyword)}常被视为对人事变化、情绪起伏或外部机会的象征，需结合梦中情绪和现实处境判断。</p><p><b>现代心理角度：</b>${tone}</p>${table([["梦境类别", escapeHtml(data.scene)], ["关键变量", "梦中情绪、人物关系、地点变化、醒后感受"], ["行动建议", "记录梦境后对照近期压力源，不因单一梦境做重大决定"], ["内容边界", "解梦不是医学或心理诊断"]])}`, "1518 周公解梦 · 2/2")
    ]);
  }

  function zodiacFromYear(year) {
    return ZODIACS[(Number(year) - 4) % 12];
  }

  function ganzhiFromYear(year) {
    const offset = Number(year) - 1984;
    const index = ((offset % 60) + 60) % 60;
    const gan = GAN[((Number(year) - 4) % 10 + 10) % 10];
    const zhi = ZHI[((Number(year) - 4) % 12 + 12) % 12];
    return {
      index,
      gan,
      zhi,
      label: `${gan}${zhi}`,
      ganElement: GAN_ELEMENT[gan],
      zhiElement: ZHI_ELEMENT[zhi],
      nayin: NAYIN[index]
    };
  }

  function buildZodiacReport(tool, data) {
    const z = zodiacFromYear(data.year);
    const gz = ganzhiFromYear(data.year);
    const element = `${gz.ganElement}/${gz.zhiElement}，纳音${gz.nayin}`;
    const scores = [["年度活力", hashScore(data.year, 76, 95)], ["贵人关系", hashScore(z, 75, 93)], ["事业行动", hashScore(`${z}${element}`, 72, 91)], ["情绪稳定", hashScore(element, 70, 90)]];
    return resultShell(tool, data, [
      cover("生肖查询报告", `${data.year}年 · ${z}`, scores, `${gz.label} · ${element}`),
      page("生肖结构", `${table([["生肖", z], ["年份干支", gz.label], ["地支", ZODIAC_BRANCH[z]], ["五行参考", element], ["六合", relationList(z, "六合")], ["三合", relationList(z, "三合")], ["六冲", relationList(z, "六冲")]])}<p>生肖用于民俗参考；年份生肖通常按农历年或节气分界，若生日在春节/立春附近，应输入完整出生日期后按八字四柱复核。</p>`, "1518 生肖查询 · 2/2")
    ]);
  }

  function relationList(zodiac, type) {
    const rows = ZODIAC_RELATIONS[type].filter((group) => group.includes(zodiac));
    return rows.length ? rows.map((group) => group.join("、")).join("；") : "无";
  }

  function matchZodiac(a, b) {
    if (a === b) return ["同气相求", 82, "彼此节奏相近，优点容易共振，缺点也容易互相放大。"];
    if (ZODIAC_RELATIONS.六合.some((pair) => pair.includes(a) && pair.includes(b))) return ["六合贵人", 94, "互相扶持度高，沟通阻力较小，适合长期协作。"];
    if (ZODIAC_RELATIONS.三合.some((group) => group.includes(a) && group.includes(b))) return ["三合助力", 90, "目标感和资源互补较好，适合共同推进项目。"];
    if (ZODIAC_RELATIONS.六冲.some((pair) => pair.includes(a) && pair.includes(b))) return ["六冲磨合", 62, "节奏差异明显，需要建立规则和边界。"];
    if (ZODIAC_RELATIONS.六害.some((pair) => pair.includes(a) && pair.includes(b))) return ["六害提醒", 66, "容易在细节和误会中消耗，需要主动沟通。"];
    return ["平稳相处", 78, "关系没有明显冲合，关键看价值观、沟通和现实协作。"];
  }

  function buildZodiacMatchReport(tool, data) {
    const [label, score, text] = matchZodiac(data.zodiacA, data.zodiacB);
    return resultShell(tool, data, [
      cover("生肖配对报告", `${data.zodiacA} × ${data.zodiacB}`, [["综合匹配", score], ["沟通指数", Math.min(99, score + 2)], ["事业协作", Math.max(55, score - 3)], ["关系稳定", hashScore(label, 70, 95)]], label),
      page("配对详解", `<p>${text}</p>${table([["关系类型", label], ["你的地支", `${data.zodiacA} · ${ZODIAC_BRANCH[data.zodiacA]}`], ["对方地支", `${data.zodiacB} · ${ZODIAC_BRANCH[data.zodiacB]}`], ["建议", "生肖配对只看年支，不能替代八字合盘和现实了解"]])}`, "1518 生肖配对 · 2/2")
    ]);
  }

  function signFromDate(dateText) {
    const [, m, d] = String(dateText).split("-").map(Number);
    const md = `${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return SIGNS.find(([name, , , start, end]) => start <= end ? md >= start && md <= end : md >= start || md <= end) || SIGNS[0];
  }

  function signInfo(name) {
    return SIGNS.find((item) => item[0] === name) || SIGNS[0];
  }

  function buildAstroReport(tool, data) {
    const sign = signFromDate(data.birthday);
    const scores = [["表达力", hashScore(sign[0], 76, 96)], ["情绪感知", hashScore(sign[1], 70, 95)], ["行动节奏", hashScore(sign[2], 72, 92)], ["关系需求", hashScore(data.birthday, 74, 93)]];
    return resultShell(tool, data, [
      cover("星座查询报告", sign[0], scores, `${data.birthday} · ${sign[1]} · 守护星${sign[2]}`),
      page("星座性格", `<p>${sign[0]}属于${sign[1]}，守护星为${sign[2]}。太阳星座主要描述外在表达、基本意志和自我认同。</p>${table([["日期范围", `${sign[3]} 至 ${sign[4]}`], ["优势", "目标清楚时执行力强，容易形成鲜明个人风格"], ["挑战", "压力状态下可能放大本星座的惯性反应"], ["升级方向", "接入出生时间、地点后可生成完整星盘"]])}`, "1518 星座查询 · 2/2")
    ]);
  }

  function buildAstroMatchReport(tool, data) {
    const a = signInfo(data.signA);
    const b = signInfo(data.signB);
    const same = a[1] === b[1];
    const score = same ? 88 : hashScore(`${a[1]}${b[1]}`, 68, 92);
    return resultShell(tool, data, [
      cover("星座配对报告", `${data.signA} × ${data.signB}`, [["综合匹配", score], ["吸引力", hashScore(data.signA, 74, 96)], ["沟通", hashScore(data.signB, 70, 94)], ["长期稳定", same ? 86 : 76]], `${a[1]} × ${b[1]}`),
      page("配对详解", `<p>${same ? "两者同属一个元素，节奏和需求较容易理解。" : "两者元素不同，吸引和摩擦会同时存在，关键看沟通方式。"} 星座配对只看太阳星座，完整关系判断还需要月亮、金星、火星与上升星座。</p>${table([["你的星座", `${data.signA} · ${a[1]} · ${a[2]}`], ["对方星座", `${data.signB} · ${b[1]} · ${b[2]}`], ["建议", "把星座当作沟通语言，不把它当作关系判决书"]])}`, "1518 星座配对 · 2/2")
    ]);
  }

  function buildBirthdayReport(tool, data) {
    const [, month, day] = data.birthday.split("-").map(Number);
    const number = normalize81(month * 31 + day);
    const n = numerology(number);
    const keyword = ["洞察", "表达", "秩序", "创造", "行动", "协调"][day % 6];
    return resultShell(tool, data, [
      cover("生日密码报告", `${month}月${day}日`, [["人格能量", n.score], ["表达优势", hashScore(keyword, 78, 96)], ["关系敏感", hashScore(data.birthday, 72, 92)], ["成长潜力", hashScore(`${month}${day}`, 76, 95)]], `生日数理 ${number} · ${keyword}`),
      page("生日解析", `<p>${month}月${day}日的生日关键词是「${keyword}」。${n.text}</p>${table([["优势", "能在熟悉领域形成稳定个人风格"], ["挑战", "避免被单一标签限制，需结合真实经历观察"], ["关系建议", "把自己的需求说清楚，比猜测对方更有效"], ["幸运元素", `${ELEMENTS[number % 5]} · 数字 ${number % 9 + 1}`]])}`, "1518 生日密码 · 2/2")
    ]);
  }

  function buildFengshuiReport(tool, data) {
    const score = hashScore(`${data.space}${data.direction}${data.focus}`, 72, 94);
    return resultShell(tool, data, [
      cover("风水查询报告", data.space, [["格局通气", score], ["采光动线", hashScore(data.direction, 70, 92)], ["功能匹配", hashScore(data.focus, 76, 95)], ["调整空间", 84]], `${data.direction} · ${data.focus}`),
      page("空间体检", `<p>${escapeHtml(data.space)}以「${escapeHtml(data.focus)}」为重点时，应先看入口动线、采光通风、坐卧/办公位置和杂物堆积。</p>${table([["朝向", escapeHtml(data.direction)], ["宜", "保持入口明亮、动线顺畅、核心区域整洁"], ["忌", "门窗直冲、长期阴暗、床桌背后无靠、杂物压财位"], ["边界", "风水建议不能替代建筑安全、消防、医学和法律判断"]])}`, "1518 风水查询 · 2/2")
    ]);
  }

  function buildBloodReport(tool, data) {
    const b = BLOODS[data.blood];
    return resultShell(tool, data, [
      cover("血型分析报告", `${data.blood} 型`, [["性格稳定", hashScore(data.blood, 76, 94)], ["职场适配", 84], ["关系表达", hashScore(b.core, 70, 92)], ["自我觉察", 88]], "ABO 性格民俗参考"),
      page("血型性格", `<p>${data.blood} 型常见描述为：${b.core}。</p>${table([["职场", b.work], ["情感", b.love], ["建议", "血型性格属于流行文化分类，不能替代心理测评和医学判断"]])}`, "1518 血型分析 · 2/2")
    ]);
  }

  function buildBloodMatchReport(tool, data) {
    const same = data.bloodA === data.bloodB;
    const score = same ? 86 : hashScore(`${data.bloodA}${data.bloodB}`, 70, 94);
    return resultShell(tool, data, [
      cover("血型配对报告", `${data.bloodA} × ${data.bloodB}`, [["综合匹配", score], ["沟通", same ? 88 : 78], ["互补", same ? 74 : 86], ["稳定", hashScore(data.bloodA, 72, 92)]], "ABO 关系参考"),
      page("配对建议", `<p>${same ? "同血型容易理解彼此的反应模式，也要避免同类惯性一起放大。" : "不同血型更容易形成互补，但也需要给彼此留出表达差异的空间。"}</p>${table([["你的特点", BLOODS[data.bloodA].core], ["对方特点", BLOODS[data.bloodB].core], ["关系建议", "把血型作为聊天入口，不作为判断一个人的标准"]])}`, "1518 血型配对 · 2/2")
    ]);
  }

  function buildWuyunReport(tool, data) {
    const [year, month] = data.date.split("-").map(Number);
    const gz = ganzhiFromYear(year);
    const yunByGan = { 甲: "土运", 己: "土运", 乙: "金运", 庚: "金运", 丙: "水运", 辛: "水运", 丁: "木运", 壬: "木运", 戊: "火运", 癸: "火运" };
    const yun = yunByGan[gz.gan];
    const qi = ["厥阴风木", "少阴君火", "少阳相火", "太阴湿土", "阳明燥金", "太阳寒水"][month % 6];
    return resultShell(tool, data, [
      cover("五运六气报告", `${year}年`, [["岁运参考", hashScore(yun, 76, 94)], ["节气适应", hashScore(qi, 70, 92)], ["作息建议", 86], ["风险提醒", 82]], `${yun} · ${qi}`),
      page("运气结构", `<p>${year} 年为 ${gz.label} 年，按天干五运规则显示为 ${yun}，查询月份对应气候倾向为 ${qi}。正式版还应接入完整司天、在泉、主客气和节气交接推算表。</p>${table([["查询日期", data.date], ["年份干支", gz.label], ["岁运", yun], ["阶段气", qi], ["养生提示", "顺应季节，关注睡眠、饮食、运动和情绪稳定"], ["边界", "五运六气不能替代医学诊断和治疗"]])}`, "1518 五运六气 · 2/2")
    ]);
  }

  function digitReport(value) {
    const digits = Array.from(String(value || "")).filter((char) => /\d/.test(char)).map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    const tail = digits.slice(-4).join("") || "0000";
    const n = numerology(sum + Number(tail.slice(-2) || 0));
    const repeats = Object.entries(digits.reduce((map, d) => ({ ...map, [d]: (map[d] || 0) + 1 }), {})).filter(([, count]) => count >= 3).map(([d]) => d);
    return { digits, sum, tail, n, repeats };
  }

  function buildNumberReport(tool, data) {
    const r = digitReport(data.number);
    const score = Math.min(99, Math.round(r.n.score * 0.72 + hashScore(data.number, 10, 25)));
    return resultShell(tool, data, [
      cover("手机号测算报告", data.number, [["综合数理", score], ["尾号气质", hashScore(r.tail, 74, 94)], ["数字均衡", r.repeats.length ? 72 : 88], ["使用稳定", hashScore(data.number, 70, 92)]], `${r.tail} · ${r.n.number}数`),
      page("号码结构", `<p>号码数字和为 ${r.sum}，尾四位为 ${r.tail}，换算易经数理为 ${r.n.number}「${r.n.title}」。${r.n.text}</p>${table([["重复数字", r.repeats.length ? r.repeats.join("、") : "无明显三连重复"], ["建议", r.n.advice], ["边界", "号码测算为传统数理参考，不能决定真实财运、信用或事业结果"]])}`, "1518 手机号测算 · 2/2")
    ]);
  }

  function buildPlateReport(tool, data) {
    const r = digitReport(data.plate);
    const letters = Array.from(data.plate).filter((char) => /[a-z]/i.test(char)).join("");
    const score = Math.min(99, Math.round(r.n.score * 0.7 + hashScore(data.plate, 12, 24)));
    return resultShell(tool, data, [
      cover("车牌测算报告", data.plate, [["综合数理", score], ["尾号气场", hashScore(r.tail, 74, 95)], ["字母结构", hashScore(letters, 70, 90)], ["出行稳定", r.repeats.length ? 74 : 86]], `${r.tail} · ${r.n.number}数`),
      page("车牌结构", `<p>车牌数字和为 ${r.sum}，字母段为 ${escapeHtml(letters || "无")}，易经数理为 ${r.n.number}「${r.n.title}」。${r.n.text}</p>${table([["尾号", r.tail], ["重复数字", r.repeats.length ? r.repeats.join("、") : "无明显三连重复"], ["建议", "车牌重点仍是合法合规、清晰易记和行车安全"], ["边界", "测算不代表交通风险预测"]])}`, "1518 车牌测算 · 2/2")
    ]);
  }

  function renderTools() {
    const root = document.getElementById("columnToolPages");
    if (!root) return;
    root.innerHTML = TOOLS.filter((tool) => tool.id !== "baby").map((tool) => `
      <section class="column-tool-card" id="${tool.id}" data-tool-id="${tool.id}">
        <div class="column-tool-head">
          <div><p class="company-eyebrow">1518 栏目工具</p><h2>${tool.title}</h2><p>${tool.intro}</p></div>
        </div>
        <form class="column-tool-form">${tool.fields.map(fieldHtml).join("")}<button type="submit">生成报告</button></form>
        <div class="column-tool-output" hidden></div>
      </section>
    `).join("");

    root.querySelectorAll(".column-tool-card").forEach((section) => {
      const tool = TOOLS.find((item) => item.id === section.dataset.toolId);
      const form = section.querySelector("form");
      const output = section.querySelector(".column-tool-output");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        output.hidden = false;
        output.innerHTML = tool.build(tool, collect(form));
        document.body.classList.add("column-report-active");
        runRegistrationChecks(output);
        output.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    const companyTail = document.getElementById("companyNamingTail");
    const companyCard = document.getElementById("company");
    if (companyTail && companyCard) {
      companyTail.appendChild(companyCard);
    }
  }

  window.ColumnTools = {
    tools: TOOLS,
    runRegistrationChecks,
    open(id, preset = {}) {
      const section = document.getElementById(id);
      if (!section) return false;
      const form = section.querySelector("form");
      Object.entries(preset).forEach(([key, value]) => {
        if (form?.elements[key]) form.elements[key].value = value;
      });
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    },
    submit(id, preset = {}) {
      if (!this.open(id, preset)) return false;
      const form = document.querySelector(`#${id} form`);
      if (form) form.requestSubmit();
      return true;
    }
  };

  renderTools();
})();
