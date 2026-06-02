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
    boy: ["承", "远", "景", "皓", "峻", "铭", "泽", "宇", "宸", "睿", "晟", "知", "清", "言", "嘉", "安"],
    girl: ["若", "芷", "清", "诗", "晴", "瑶", "宁", "悦", "汐", "安", "嘉", "予", "书", "禾", "知", "言"],
    brand: ["星", "辰", "云", "禾", "元", "启", "森", "瑞", "达", "知", "澄", "一", "光", "合", "问", "策"]
  };
  const BIRTH_HOURS = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"];
  const HOUR_TO_NUMBER = { 子时: 0, 丑时: 2, 寅时: 4, 卯时: 6, 辰时: 8, 巳时: 10, 午时: 12, 未时: 14, 申时: 16, 酉时: 18, 戌时: 20, 亥时: 22 };
  const DAILY_MATTERS = {
    起名改名: { keywords: ["祈福", "求嗣", "开光", "纳采"], element: "木", advice: "适合整理姓名方案、筛选用字和确定长期称呼；若当日忌项较重，可先做方案，不急于正式启用。" },
    开业签约: { keywords: ["开市", "交易", "纳财", "立券"], element: "火", advice: "适合看开局气势、签约节奏和对外发布；若日课不稳，宜先确认合同、预算和关键责任。" },
    搬家出行: { keywords: ["出行", "移徙", "入宅", "安床"], element: "土", advice: "适合看动线、方位和安定感；若冲煞明显，宜避开冲方，先做整理和准备。" },
    婚嫁订盟: { keywords: ["嫁娶", "订盟", "纳采", "会亲友"], element: "水", advice: "适合看关系和合、沟通节奏与双方家庭配合；若忌项较多，宜先沟通安排，择更和顺之日定大事。" },
    学习考试: { keywords: ["入学", "赴任", "求嗣", "祈福"], element: "木", advice: "适合定学习计划、报名考试、整理资料；若当日偏耗神，宜做复盘和轻量推进。" },
    求财合作: { keywords: ["交易", "纳财", "立券", "开市"], element: "金", advice: "适合看财位、合同、交易与合作边界；若与八字忌神相触，宜先守风控，再谈收益。" }
  };
  const DAILY_MATTER_NAMES = Object.keys(DAILY_MATTERS);
  const AUSPICIOUS_EVENTS = {
    结婚嫁娶: { matter: "婚嫁订盟", keywords: ["嫁娶", "订盟", "纳采", "会亲友"], element: "水", focus: "以和合、稳定、亲友顺承为先，避开冲克双方生肖和沟通容易起波澜的日课。" },
    开业开市: { matter: "开业签约", keywords: ["开市", "交易", "纳财", "立券"], element: "火", focus: "以开张气势、客流启动、财位生发为先，适合选所宜命中且吉时清朗的日期。" },
    签约交易: { matter: "求财合作", keywords: ["交易", "纳财", "立券", "开市"], element: "金", focus: "以边界清楚、权责明白、财务稳健为先，黄历之外还要复核合同条款与履约条件。" },
    搬家入宅: { matter: "搬家出行", keywords: ["移徙", "入宅", "安床", "出行"], element: "土", focus: "以安定、入宅、动线顺畅为先，避开冲煞方向，先定人、物、路线与安床时段。" },
    出行赴任: { matter: "搬家出行", keywords: ["出行", "赴任", "移徙", "会亲友"], element: "木", focus: "以启程顺利、行程清楚、人事衔接为先，适合选交通与时辰都稳的日期。" },
    起名改名: { matter: "起名改名", keywords: ["祈福", "求嗣", "开光", "纳采"], element: "木", focus: "以启用新名、确定称呼、建立长期气象为先，先取其意，再合其数。" }
  };
  const AUSPICIOUS_EVENT_NAMES = Object.keys(AUSPICIOUS_EVENTS);
  const CHAR_ELEMENT = {
    木: ["若", "芷", "禾", "森", "林", "景", "嘉", "元", "启", "策", "荣", "栩"],
    火: ["晟", "晴", "知", "星", "辰", "明", "光", "昕", "曜", "煦", "达"],
    土: ["安", "宇", "宸", "峻", "远", "予", "一", "辰", "垣", "坤"],
    金: ["铭", "书", "诗", "睿", "承", "钧", "锐", "锦", "铎"],
    水: ["泽", "清", "汐", "云", "澄", "言", "涵", "沐", "渊"]
  };
  const INDUSTRY_PROFILE = {
    科技互联网: { element: "火", terms: ["智", "云", "数", "元", "星", "启", "达"], avoid: /(金融|证券|银行|保险|医院|大学)/u },
    金融投资: { element: "金", terms: ["信", "金", "衡", "瑞", "恒", "稳", "策"], avoid: /(银行|证券|交易所|国家|中国)/u },
    餐饮消费: { element: "土", terms: ["禾", "味", "安", "悦", "合", "鲜", "暖"], avoid: /(医疗|药|金融|证券)/u },
    教育康养: { element: "木", terms: ["知", "书", "森", "清", "安", "仁", "和"], avoid: /(医院|大学|国家|官方)/u },
    外贸出海: { element: "金", terms: ["远", "达", "通", "海", "辰", "航", "瑞"], avoid: /(中国|国家|海关|银行)/u },
    咨询服务: { element: "金", terms: ["策", "知", "衡", "明", "和", "信", "达"], avoid: /(律所|会计师事务所|证券)/u },
    地产建筑: { element: "土", terms: ["城", "安", "筑", "坤", "泰", "合", "承"], avoid: /(银行|保险|国家|中国)/u }
  };
  const BRAND_TONE_PROFILE = {
    专业可信: ["信", "衡", "知", "策", "明", "安"],
    年轻活泼: ["悦", "星", "小", "萌", "轻", "元"],
    高端克制: ["澄", "一", "和", "白", "简", "清"],
    国风雅致: ["云", "禾", "予", "山", "清", "知"],
    科技未来: ["星", "元", "启", "智", "云", "光"]
  };
  const REGISTRY_RULES = {
    companyRestricted: /(中国|中华|国家|全国|中央|人民|国际|集团|控股|银行|证券|保险|基金|信托|交易所|大学|学院|医院|协会|商会|研究院|中心)/u,
    companySensitiveIndustry: /(金融|证券|保险|医疗|医药|教育|基金|支付|征信|拍卖|典当|劳务派遣)/u,
    companySuffix: /(有限公司|有限责任公司|股份有限公司|集团有限公司)$/u,
    trademarkGeneric: /(优选|精选|天下|中国|国际|官方|第一|旗舰|中心|集团|控股|正品|认证|专供)/u,
    trademarkWeak: /(好|优|美|新|大|小|云|智|家|帮)$/u,
    latinOrDigitOnly: /^[a-z0-9\s-]+$/i
  };
  const DEFAULT_REGISTRY_API = {
    enabled: false,
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
        ["surname", "姓氏", "text", ""],
        ["gender", "性别", "select", "", ["男", "女"]],
        ["birthDate", "出生日期", "date", ""],
        ["birthHour", "出生时辰", "select", "", ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"]],
        ["length", "名字字数", "select", "", ["二字名", "三字名"]]
      ],
      build: buildNamingReport
    },
    {
      id: "daily",
      nav: "每日宜忌",
      title: "每日宜忌",
      intro: "按查询日期读取黄历宜忌、干支、冲煞、吉神凶煞、方位和时辰，再结合用户八字喜用给出当日行动建议。",
      fields: [
        ["queryDate", "查询日期", "date", todayIso()],
        ["birthDate", "出生日期", "date", ""],
        ["birthHour", "出生时辰", "select", "", BIRTH_HOURS],
        ["matter", "关注事项", "select", "", DAILY_MATTER_NAMES]
      ],
      build: buildDailyAlmanacReport
    },
    {
      id: "auspicious",
      nav: "黄道吉日",
      title: "黄道吉日",
      intro: "面向结婚、开业、签约、搬家等重要事项，在候选日期中结合黄历宜忌、冲煞、吉神凶煞、个人八字喜用和吉时排序。",
      fields: [
        ["eventType", "事件类型", "select", "", AUSPICIOUS_EVENT_NAMES],
        ["startDate", "开始日期", "date", todayIso()],
        ["rangeDays", "查询范围", "select", "", ["7天", "15天", "30天", "60天"]],
        ["birthDate", "出生日期", "date", ""],
        ["birthHour", "出生时辰", "select", "", BIRTH_HOURS]
      ],
      build: buildAuspiciousDateReport
    },
    {
      id: "company",
      nav: "公司起名",
      title: "公司起名",
      intro: "按行业、地域、主体偏好和易经数理，生成公司商号候选与注册全称结构。",
      fields: [
        ["region", "注册地域", "text", ""],
        ["industry", "所属行业", "select", "", ["科技互联网", "金融投资", "餐饮消费", "教育康养", "外贸出海", "咨询服务", "地产建筑"]],
        ["keyword", "偏好字/关键词", "text", ""],
        ["suffix", "组织后缀", "select", "", ["有限公司", "有限责任公司", "股份有限公司", "集团有限公司"]]
      ],
      build: buildCompanyNamingReport
    },
    {
      id: "brand",
      nav: "品牌起名",
      title: "品牌起名",
      intro: "面向产品、店铺、商标和新媒体账号，生成短、亮、易传播的品牌名。",
      fields: [
        ["category", "品类/赛道", "text", ""],
        ["audience", "目标用户", "text", ""],
        ["tone", "品牌气质", "select", "", ["专业可信", "年轻活泼", "高端克制", "国风雅致", "科技未来"]],
        ["keyword", "核心关键词", "text", ""],
        ["trademarkClass", "商标类别", "select", "", ["第09类 科学仪器", "第35类 广告销售", "第41类 教育娱乐", "第42类 科技服务", "第43类 餐饮住宿"]]
      ],
      build: buildBrandNamingReport
    },
    {
      id: "brand-test",
      nav: "品牌名测试",
      title: "品牌名测试",
      intro: "检查品牌名的传播力、品类联想、音节节奏、数理和基础风险。",
      fields: [
        ["brandName", "品牌名", "text", ""],
        ["category", "品类", "text", ""],
        ["audience", "目标用户", "text", ""],
        ["trademarkClass", "商标类别", "select", "", ["第09类 科学仪器", "第35类 广告销售", "第41类 教育娱乐", "第42类 科技服务", "第43类 餐饮住宿"]]
      ],
      build: buildBrandTestReport
    },
    {
      id: "dream",
      nav: "周公解梦",
      title: "周公解梦",
      intro: "按梦境关键词生成传统梦书解释、现代心理参考和现实提醒。",
      fields: [
        ["keyword", "梦境关键词", "text", ""],
        ["scene", "梦境情境", "select", "", ["自然类", "动物类", "人物类", "生活类", "建筑类", "身体类", "情爱类", "孕妇类"]]
      ],
      build: buildDreamReport
    },
    {
      id: "zodiac",
      nav: "生肖查询",
      title: "生肖查询",
      intro: "按出生年份查询生肖、地支、五行倾向、六合三合和年度参考。",
      fields: [
        ["year", "出生年份", "number", ""]
      ],
      build: buildZodiacReport
    },
    {
      id: "match",
      nav: "生肖配对",
      title: "生肖配对",
      intro: "按十二生肖六合、三合、六冲、六害关系生成配对报告。",
      fields: [
        ["zodiacA", "你的生肖", "select", "", ZODIACS],
        ["zodiacB", "TA 的生肖", "select", "", ZODIACS]
      ],
      build: buildZodiacMatchReport
    },
    {
      id: "astro",
      nav: "星座查询",
      title: "星座查询",
      intro: "按生日查询太阳星座、四象属性、守护星和性格倾向。",
      fields: [
        ["birthday", "出生日期", "date", ""]
      ],
      build: buildAstroReport
    },
    {
      id: "astro-match",
      nav: "星座配对",
      title: "星座配对",
      intro: "按星座四象、节奏与关系需求生成配对指数。",
      fields: [
        ["signA", "你的星座", "select", "", SIGNS.map((item) => item[0])],
        ["signB", "TA 的星座", "select", "", SIGNS.map((item) => item[0])]
      ],
      build: buildAstroMatchReport
    },
    {
      id: "birthday",
      nav: "生日密码",
      title: "生日密码",
      intro: "按生日生成性格关键词、优势挑战、关系建议和幸运元素。",
      fields: [
        ["birthday", "生日", "date", ""]
      ],
      build: buildBirthdayReport
    },
    {
      id: "fengshui",
      nav: "风水查询",
      title: "风水查询",
      intro: "以空间类型、朝向和使用场景生成家居/办公风水体检报告。",
      fields: [
        ["space", "空间类型", "select", "", ["住宅", "办公室", "商铺", "书房", "卧室"]],
        ["direction", "主要朝向", "select", "", ["坐北朝南", "坐南朝北", "坐东朝西", "坐西朝东", "坐东北朝西南", "坐西南朝东北"]],
        ["focus", "重点问题", "select", "", ["财位与动线", "睡眠健康", "办公效率", "门窗冲煞", "采光通风"]]
      ],
      build: buildFengshuiReport
    },
    {
      id: "blood",
      nav: "血型分析",
      title: "血型分析",
      intro: "按 ABO 血型输出性格、人际、职场和关系参考。",
      fields: [
        ["blood", "血型", "select", "", ["A", "B", "O", "AB"]]
      ],
      build: buildBloodReport
    },
    {
      id: "blood-match",
      nav: "血型配对",
      title: "血型配对",
      intro: "按 ABO 血型互补关系生成沟通、情感和协作建议。",
      fields: [
        ["bloodA", "你的血型", "select", "", ["A", "B", "O", "AB"]],
        ["bloodB", "TA 的血型", "select", "", ["A", "B", "O", "AB"]]
      ],
      build: buildBloodMatchReport
    },
    {
      id: "wuyun",
      nav: "五运六气",
      title: "五运六气",
      intro: "按年份和日期输出岁运、节气阶段、气候与养生参考。",
      fields: [
        ["date", "查询日期", "date", ""]
      ],
      build: buildWuyunReport
    },
    {
      id: "phone",
      nav: "测手机号",
      title: "测手机号",
      intro: "按号码尾数、数字五行、易经数理和重复结构生成号码报告。",
      fields: [
        ["number", "手机号码", "tel", ""]
      ],
      build: buildNumberReport
    },
    {
      id: "plate",
      nav: "车牌测算",
      title: "车牌测算",
      intro: "按车牌数字、字母、尾号和易经数理生成车牌参考报告。",
      fields: [
        ["plate", "车牌号码", "text", ""]
      ],
      build: buildPlateReport
    }
  ];

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    }[char]));
  }

  function todayIso() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function parseIsoDate(value) {
    const parts = String(value || "").split("-").map(Number);
    if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return null;
    return { year: parts[0], month: parts[1], day: parts[2] };
  }

  function isoToDate(value) {
    const parsed = parseIsoDate(value);
    if (!parsed) return null;
    return new Date(parsed.year, parsed.month - 1, parsed.day);
  }

  function dateToIso(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function addDaysIso(value, days) {
    const date = isoToDate(value);
    if (!date) return value;
    date.setDate(date.getDate() + days);
    return dateToIso(date);
  }

  function rangeDays(value) {
    const match = String(value || "").match(/\d+/);
    return match ? Number(match[0]) : 30;
  }

  function asList(value) {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === "string") return value.split(/[、,\s]+/).filter(Boolean);
    return [];
  }

  function listItems(items, className = "") {
    const safe = asList(items).slice(0, 12);
    return `<div class="daily-tag-list ${className}">${safe.map((item) => `<span>${escapeHtml(item)}</span>`).join("") || "<span>今日资料待补</span>"}</div>`;
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

  function clamp(number, min = 0, max = 100) {
    return Math.max(min, Math.min(max, Math.round(number)));
  }

  function chineseChars(text) {
    return Array.from(String(text || "")).filter((char) => /[\u3400-\u9fff]/u.test(char));
  }

  function elementOfChar(char) {
    const hit = Object.entries(CHAR_ELEMENT).find(([, chars]) => chars.includes(char));
    if (hit) return hit[0];
    const stroke = strokeOfText(char) || 10;
    return ["水", "木", "木", "火", "火", "土", "土", "金", "金", "水"][stroke % 10];
  }

  function uniqueItems(items) {
    return [...new Set(items.filter(Boolean))];
  }

  function candidateNameScore(fullName, birthData = {}) {
    const engine = window.NameEngine?.build?.({
      fullName,
      reportGender: birthData.gender || "男",
      birthDate: birthData.birthDate,
      birthHour: birthData.birthHour,
      birthPlace: birthData.birthPlace || ""
    });
    const n = numerology(strokeOfText(fullName));
    const chars = chineseChars(fullName);
    const elements = chars.slice(1).map(elementOfChar);
    const useful = engine?.bazi?.useful || [];
    const avoid = engine?.bazi?.avoid || [];
    const baziFit = elements.reduce((score, element) => score + (useful.includes(element) ? 8 : 0) - (avoid.includes(element) ? 6 : 0), 72);
    const repeatPenalty = new Set(chars).size < chars.length ? 6 : 0;
    const rarePenalty = chars.some((char) => strokeOfText(char) >= 20) ? 4 : 0;
    const riskScore = 90 - repeatPenalty - rarePenalty - (engine?.quality?.negative?.length ? 18 : 0) - (engine?.quality?.estimated?.length ? engine.quality.estimated.length * 4 : 0);
    const total = clamp((engine?.total || n.score) * 0.42 + n.score * 0.18 + clamp(baziFit, 45, 98) * 0.24 + clamp(riskScore, 35, 96) * 0.16, 35, 99);
    return {
      name: fullName,
      score: total,
      n,
      engine,
      elements,
      useful,
      avoid,
      baziFit: clamp(baziFit, 45, 98),
      note: `喜用${useful.join("、") || "中和"}；用字五行${elements.join("、") || "未识别"}；五格${engine?.scores?.fiveGrid || n.score}分，三才${engine?.scores?.sancai || "参考"}分，置信度${engine?.confidence || 70}分。`
    };
  }

  function companyNameScore(subject, base, data) {
    const profile = INDUSTRY_PROFILE[data.industry] || INDUSTRY_PROFILE.科技互联网;
    const n = numerology(strokeOfText(subject));
    const shortN = numerology(strokeOfText(base));
    const length = chineseChars(base).length;
    const keywordFit = profile.terms.some((term) => base.includes(term) || String(data.keyword || "").includes(term)) ? 92 : 78;
    const elementFit = chineseChars(base).some((char) => elementOfChar(char) === profile.element) ? 90 : 76;
    const lengthScore = length >= 2 && length <= 4 ? 92 : length === 5 ? 82 : 66;
    const suffixPenalty = REGISTRY_RULES.companySuffix.test(subject) ? 0 : 8;
    const restrictedPenalty = /(中国|中华|国家|全国|国际|集团|银行|证券|保险|大学|医院|协会|中心)/u.test(subject) ? 14 : 0;
    const industryPenalty = profile.avoid.test(subject) ? 18 : 0;
    const shortPenalty = length < 2 ? 12 : 0;
    const riskPenalty = suffixPenalty + restrictedPenalty + industryPenalty + shortPenalty;
    const score = clamp(n.score * 0.30 + shortN.score * 0.25 + keywordFit * 0.16 + elementFit * 0.14 + lengthScore * 0.10 + ((n.score + shortN.score) / 2) * 0.05 - riskPenalty, 20, 99);
    return { subject, base, score, n, shortN, keywordFit, elementFit, lengthScore, riskPenalty, profile };
  }

  function brandNameScore(name, data) {
    const n = numerology(strokeOfText(name));
    const length = chineseChars(name).length;
    const toneWords = BRAND_TONE_PROFILE[data.tone] || BRAND_TONE_PROFILE.专业可信;
    const toneFit = toneWords.some((word) => name.includes(word)) ? 93 : 78;
    const categoryText = `${data.category || ""}${data.keyword || ""}`;
    const categoryFit = chineseChars(categoryText).some((char) => name.includes(char)) ? 90 : 76;
    const lengthScore = length >= 2 && length <= 4 ? 94 : length === 5 ? 82 : 64;
    const uniqueRatio = length ? new Set(chineseChars(name)).size / length : 0;
    const pronounceScore = uniqueRatio >= 1 ? 88 : uniqueRatio >= .75 ? 80 : 68;
    const genericPenalty = REGISTRY_RULES.trademarkGeneric.test(name) ? 18 : 0;
    const weakPenalty = REGISTRY_RULES.trademarkWeak.test(name) ? 6 : 0;
    const distinctiveness = clamp(lengthScore * 0.45 + pronounceScore * 0.35 + (100 - genericPenalty - weakPenalty) * 0.20, 35, 96);
    const score = clamp(n.score * 0.24 + toneFit * 0.20 + categoryFit * 0.18 + lengthScore * 0.16 + pronounceScore * 0.10 + distinctiveness * 0.12 - genericPenalty - weakPenalty, 20, 99);
    return { name, score, n, toneFit, categoryFit, lengthScore, pronounceScore, genericPenalty, weakPenalty, distinctiveness };
  }

  function similarity(a, b) {
    const left = new Set(chineseChars(a));
    const right = new Set(chineseChars(b));
    if (!left.size || !right.size) return 0;
    const overlap = [...left].filter((char) => right.has(char)).length;
    return overlap / Math.max(left.size, right.size);
  }

  function officialSearchUrl(kind, name) {
    const links = officialRegistryLinks();
    if (kind === "company") return `${links.companyCreditSearch}?keyword=${encodeURIComponent(name)}`;
    return `${links.trademarkSearch}?keyword=${encodeURIComponent(name)}`;
  }

  function fieldHtml(field) {
    const [name, label, type, value, options] = field;
    if (type === "select") {
      return `<label><span>${label}</span><select name="${name}"><option value=""${value ? "" : " selected"}>请选择${label}</option>${options.map((option) => `<option value="${escapeHtml(option)}"${option === value ? " selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></label>`;
    }
    return `<label><span>${label}</span><input name="${name}" type="${type}" value="${escapeHtml(value)}" placeholder="请输入${label}" autocomplete="off"></label>`;
  }

  function collect(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  function validateRequired(tool, data) {
    const missing = tool.fields
      .filter((field) => !String(data[field[0]] || "").trim())
      .map((field) => field[1]);
    return missing.length ? `请先填写或选择：${missing.join("、")}。` : "";
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
        <div class="registry-checklist">
          <span>本地预审项</span>
          <b>${kind === "company" ? "行政区划 / 组织形式 / 禁限词 / 行业许可 / 近似主体" : "显著性 / 通用词 / 类别冲突 / 近似商标 / 负面含义"}</b>
        </div>
        <div class="registry-check-actions">
          <a href="${primaryLink}" target="_blank" rel="noopener">打开官方申报/检索</a>
          <a href="${secondaryLink}" target="_blank" rel="noopener">复核已注册主体</a>
        </div>
        <p class="registry-check-note">预查用于降低重名、近似和类别冲突风险，不构成工商核名、商标注册或法律可注册承诺。</p>
      </section>
    `;
  }

  function buildNamingReport(tool, data) {
    const surname = (data.surname || "王").slice(0, 2);
    const pool = data.gender === "女" ? NAME_CHARS.girl : NAME_CHARS.boy;
    const seedSource = window.NameEngine?.calcBazi?.({ birthDate: data.birthDate, birthHour: data.birthHour })?.useful || [];
    const usefulPool = uniqueItems([...seedSource.flatMap((element) => CHAR_ELEMENT[element] || []), ...pool, ...NAME_CHARS.brand]);
    const rawNames = [];
    usefulPool.forEach((a, index) => {
      if (data.length === "二字名") rawNames.push(`${surname}${a}`);
      else {
        const tailPool = uniqueItems([...(CHAR_ELEMENT[seedSource[1]] || []), ...NAME_CHARS.brand, ...pool]);
        tailPool.slice(index % 3, index % 3 + 8).forEach((b) => {
          if (a !== b) rawNames.push(`${surname}${a}${b}`);
        });
      }
    });
    const names = uniqueItems(rawNames).map((name) => candidateNameScore(name, {
      gender: data.gender === "女" ? "女" : "男",
      birthDate: data.birthDate,
      birthHour: data.birthHour
    })).sort((a, b) => b.score - a.score).slice(0, 8);
    const best = names[0];
    const scores = [["八字补益", best.baziFit], ["五格数理", best.engine?.scores?.fiveGrid || best.n.score], ["三才配置", best.engine?.scores?.sancai || 76], ["音形义安全", best.engine?.scores?.sound || 86]];
    const pages = [
      cover("个人起名方案报告", `${surname}氏个人起名`, scores, `${data.gender} · ${data.birthDate} · ${data.birthHour}`),
      page("候选名字与数理", `<div class="column-name-list">${names.map((item) => `<div><strong>${item.name}</strong><span>${item.score}分 · ${item.n.number}数 ${item.n.title}</span><p>${item.note}</p><p>${item.n.text}</p></div>`).join("")}</div>`, "1518 个人起名 · 2/3"),
      page("取名建议", `<p>本次候选名按八字喜用、五格数理、三才配置、用字五行、重复字和高笔画风险综合排序。优先选择评分高且解释清楚的名字，再结合家庭偏好做最后筛选。</p>${table([["喜用神", best.useful.join("、") || "中和"], ["推荐用字五行", best.elements.join("、") || "未识别"], ["五格", "逐个候选名调用姓名测试引擎复算，避开明显凶数和三才冲克"], ["音义", "优先短、清、正向、低生僻度的用字组合"]])}`, "1518 个人起名 · 3/3")
    ];
    return resultShell(tool, data, pages);
  }

  function buildCompanyNamingReport(tool, data) {
    const profile = INDUSTRY_PROFILE[data.industry] || INDUSTRY_PROFILE.科技互联网;
    const bases = uniqueItems([`${data.keyword}${profile.terms[0]}`, `${profile.terms[1]}${data.keyword}`, `${profile.terms[2]}${profile.terms[3]}`, "星辰", "瑞禾", "云启", "元达", "知远", "森合", "澄明", "一诺"]);
    const names = bases.map((base) => {
      const subject = `${data.region}${base}${data.industry.replace(/互联网|投资|消费|康养|服务|建筑/g, "")}${data.suffix}`;
      return companyNameScore(subject, base, data);
    }).sort((a, b) => b.score - a.score).slice(0, 6);
    const scores = [["商号数理", names[0].shortN.score], ["行业适配", names[0].elementFit], ["传播清晰", names[0].lengthScore], ["综合可用", names[0].score]];
    const pages = [
      cover("公司起名方案报告", data.industry, scores, `${data.region} · ${data.keyword} · ${data.suffix}`),
      page("候选公司名", `<div class="column-name-list">${names.map((item) => `<div><strong>${item.subject}</strong><span>${item.score}分 · 全称${item.n.number}数 ${item.n.title} · 商号${item.shortN.number}数</span><p>${item.n.text}</p><p>行业元素${item.profile.element}，行业字根匹配${item.keywordFit}分，传播长度${item.lengthScore}分${item.riskPenalty ? "，含需复核词" : ""}。</p></div>`).join("")}</div>`, "1518 公司起名 · 2/3"),
      page("注册与传播建议", `<p>公司名称建议先确认行政区划、行业表述、组织形式，再围绕主体字号做商标、同名企业和负面舆情排查。本页排序同时考虑全称数理、商号数理、行业元素、关键词适配、传播长度和禁限词风险。</p>${buildRegistryPanel("company", names.map((item) => item.subject), { region: data.region, industry: data.industry, suffix: data.suffix })}${table([["行业定位", escapeHtml(data.industry)], ["行业优先字根", profile.terms.join("、")], ["主体字号", "控制在 2-4 个汉字，降低记忆成本"], ["风险提示", "预查不替代工商核名和商标检索"]])}`, "1518 公司起名 · 3/3")
    ];
    return resultShell(tool, data, pages);
  }

  function buildBrandNamingReport(tool, data) {
    const toneWords = BRAND_TONE_PROFILE[data.tone] || BRAND_TONE_PROFILE.专业可信;
    const categoryChars = chineseChars(`${data.category}${data.keyword}`).slice(0, 4);
    const fragments = uniqueItems([...toneWords.map((word, index) => `${word}${categoryChars[index % Math.max(1, categoryChars.length)] || "星"}`), ...categoryChars.map((char, index) => `${char}${toneWords[index % toneWords.length]}`), "星禾", "云问", "知见", "元启", "澄光", "森答", "瑞行", "一策"]);
    const names = fragments.map((name) => brandNameScore(name, data)).sort((a, b) => b.score - a.score).slice(0, 8);
    const scores = [["记忆度", names[0].lengthScore], ["品类联想", names[0].categoryFit], ["传播节奏", names[0].toneFit], ["综合可用", names[0].score]];
    return resultShell(tool, data, [
      cover("品牌起名方案报告", data.category, scores, `${data.audience} · ${data.tone}`),
      page("品牌候选名", `<div class="column-name-list">${names.map((item) => `<div><strong>${item.name}</strong><span>${item.score}分 · ${item.n.number}数 ${item.n.title}</span><p>气质匹配${item.toneFit}分，品类联想${item.categoryFit}分，名称长度${item.lengthScore}分。正式使用前需做商标近似和同品类检索。</p></div>`).join("")}</div>${buildRegistryPanel("trademark", names.map((item) => item.name), { category: data.category, audience: data.audience, trademarkClass: data.trademarkClass })}`, "1518 品牌起名 · 2/2")
    ]);
  }

  function buildBrandTestReport(tool, data) {
    const item = brandNameScore(data.brandName, { ...data, tone: "专业可信", keyword: data.category });
    const n = item.n;
    const scores = [["传播力", item.lengthScore], ["品类联想", item.categoryFit], ["数理参考", n.score], ["受众匹配", item.pronounceScore]];
    return resultShell(tool, data, [
      cover("品牌名测试报告", data.brandName, scores, `${data.category} · ${data.audience}`),
      page("品牌诊断", `<p>${escapeHtml(data.brandName)} 的数理为 ${n.number}，属于「${n.title}」：${n.text}</p>${buildRegistryPanel("trademark", [data.brandName], { category: data.category, audience: data.audience, trademarkClass: data.trademarkClass })}${table([["综合评分", `${item.score}分`], ["音节长度", `${item.lengthScore}分，建议保持 2-4 个汉字，方便搜索、记忆和口播`], ["品类联想", `${item.categoryFit}分，当前更偏向${escapeHtml(data.category)}，需避免跨品类误读`], ["传播风险", item.genericPenalty ? "含较通用或宣传性词，需要重点商标复核" : "未见明显通用词风险"], ["建议", n.advice]])}`, "1518 品牌名测试 · 2/2")
    ]);
  }

  function localRegistryRisk(name, kind, context = {}, allItems = []) {
    const length = chineseChars(name).length;
    const reasons = [];
    const conflicts = allItems.filter((item) => item !== name && similarity(item, name) >= 0.72).slice(0, 3);
    let risk = 18;
    if (length < 2) {
      risk += 35;
      reasons.push("名称过短，显著性不足");
    }
    if (conflicts.length) {
      risk += 18;
      reasons.push("候选列表内存在较高近似名称");
    }
    if (kind === "company") {
      if (!REGISTRY_RULES.companySuffix.test(name)) {
        risk += 10;
        reasons.push("组织形式不完整或不常见");
      }
      if (REGISTRY_RULES.companyRestricted.test(name)) {
        risk += 28;
        reasons.push("含可能需要资质或前置审批的限制性表述");
      }
      if (REGISTRY_RULES.companySensitiveIndustry.test(name)) {
        risk += 16;
        reasons.push("涉及敏感行业词，需确认许可和经营范围");
      }
      if (context.region && !name.startsWith(context.region)) {
        risk += 8;
        reasons.push("行政区划与输入地域不完全一致");
      }
    } else {
      if (REGISTRY_RULES.trademarkGeneric.test(name)) {
        risk += 28;
        reasons.push("含通用、宣传性或来源暗示词，商标显著性偏弱");
      }
      if (REGISTRY_RULES.trademarkWeak.test(name)) {
        risk += 10;
        reasons.push("尾字偏通用，近似概率较高");
      }
      if (REGISTRY_RULES.latinOrDigitOnly.test(name)) {
        risk += 14;
        reasons.push("纯英文/数字标识需重点查近似读音和图形组合");
      }
      if (!context.trademarkClass) {
        risk += 8;
        reasons.push("未指定商标类别，无法判断同类冲突");
      }
    }
    const score = clamp(100 - risk, 5, 95);
    const status = risk >= 62 ? "conflict" : risk >= 36 ? "review" : "unknown";
    const label = risk >= 62 ? "高风险" : risk >= 36 ? "需人工复核" : "待官方核验";
    return {
      status,
      label,
      score,
      note: reasons.length ? reasons.join("；") : "本地规则未发现明显禁限词或结构问题，仍需进入官方系统做重名/近似检索。",
      conflicts,
      sourceUrl: officialSearchUrl(kind, name),
      checkedAt: new Date().toISOString()
    };
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
    const score = Number.isFinite(row.score) ? `本地预审 ${row.score}分。` : "";
    const conflicts = Array.isArray(row.conflicts) && row.conflicts.length ? `疑似近似：${row.conflicts.map(escapeHtml).join("、")}。${row.note || ""}` : row.note || "请以官方查询和最终审查为准。";
    data.status.className = `registry-status ${className}`;
    data.status.textContent = row.label || label;
    data.text.textContent = `${score}${conflicts}`;
    if (row.sourceUrl) data.row.dataset.sourceUrl = row.sourceUrl;
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
      if (!api.enabled) {
        rows.forEach((item) => renderRegistryStatus({ name: item.name, ...localRegistryRisk(item.name, kind, payload.context || {}, payload.items || []) }, item));
        return;
      }
      try {
        const remote = await fetchRegistry(endpoint, payload, api.timeoutMs);
        normalizeRegistryResults(payload.items || [], remote, kind).forEach((result) => {
          const target = rows.find((item) => item.name === result.name);
          if (target) renderRegistryStatus(result, target);
        });
      } catch (error) {
        rows.forEach((item) => renderRegistryStatus({ name: item.name, ...localRegistryRisk(item.name, kind, payload.context || {}, payload.items || []), note: "后端注册数据接口暂未返回结果，已使用本地预审并提供官方核验入口。" }, item));
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

  function getAlmanacContext(queryDate) {
    const date = parseIsoDate(queryDate);
    if (!date || !window.Solar) return null;
    const solar = window.Solar.fromYmdHms(date.year, date.month, date.day, 12, 0, 0);
    const lunar = solar.getLunar();
    const dayGan = lunar.getDayGan?.() || "";
    const dayZhi = lunar.getDayZhi?.() || "";
    const monthGanZhi = lunar.getMonthInGanZhi?.() || "";
    const dayGanZhi = lunar.getDayInGanZhi?.() || `${dayGan}${dayZhi}`;
    return {
      date,
      lunar,
      lunarText: `${lunar.getMonthInChinese?.() || ""}月${lunar.getDayInChinese?.() || ""}`,
      yearGanZhi: lunar.getYearInGanZhi?.() || "",
      monthGanZhi,
      dayGanZhi,
      dayGan,
      dayZhi,
      dayElement: GAN_ELEMENT[dayGan] || ZHI_ELEMENT[dayZhi] || "土",
      dayZhiElement: ZHI_ELEMENT[dayZhi] || "土",
      yi: asList(lunar.getDayYi?.(2) || lunar.getDayYi?.()),
      ji: asList(lunar.getDayJi?.(2) || lunar.getDayJi?.()),
      jiShen: asList(lunar.getDayJiShen?.()),
      xiongSha: asList(lunar.getDayXiongSha?.()),
      chong: lunar.getChongDesc?.() || "",
      chongZodiac: lunar.getChongShengXiao?.() || "",
      sha: lunar.getSha?.() || "",
      pengzu: [lunar.getPengZuGan?.(), lunar.getPengZuZhi?.()].filter(Boolean).join("；"),
      positions: {
        喜神: lunar.getDayPositionXiDesc?.() || lunar.getPositionXiDesc?.() || "",
        财神: lunar.getDayPositionCaiDesc?.() || lunar.getPositionCaiDesc?.() || "",
        福神: lunar.getDayPositionFuDesc?.() || lunar.getPositionFuDesc?.() || ""
      }
    };
  }

  function matterKeywordScore(matter, yi, ji) {
    const profile = DAILY_MATTERS[matter] || DAILY_MATTERS.起名改名;
    const yiHit = profile.keywords.filter((keyword) => yi.includes(keyword));
    const jiHit = profile.keywords.filter((keyword) => ji.includes(keyword));
    return {
      profile,
      yiHit,
      jiHit,
      score: clamp(76 + yiHit.length * 8 - jiHit.length * 12, 42, 96)
    };
  }

  function baziDayFit(bazi, ctx, matterProfile) {
    if (!bazi) {
      return {
        score: 68,
        label: "待补充",
        text: "出生日期和时辰用于计算八字喜用。本次若无法排出四柱，只保留通用黄历判断。",
        advice: "补齐出生时间后，可进一步看当日五行是否补益日主。"
      };
    }
    const usefulHit = bazi.useful.includes(ctx.dayElement) || bazi.useful.includes(ctx.dayZhiElement);
    const avoidHit = bazi.avoid.includes(ctx.dayElement) || bazi.avoid.includes(ctx.dayZhiElement);
    const matterHit = bazi.useful.includes(matterProfile.element);
    const score = clamp(76 + (usefulHit ? 10 : 0) + (matterHit ? 6 : 0) - (avoidHit ? 10 : 0), 50, 96);
    const label = usefulHit ? "补益明显" : avoidHit ? "需要节制" : "平稳可用";
    const text = `你的日主为${bazi.dayGan}${bazi.dayElement}，八字喜用倾向为${bazi.useful.join("、")}；查询日为${ctx.dayGanZhi}日，日课五行以${ctx.dayElement}/${ctx.dayZhiElement}为主，判为${label}。`;
    const advice = usefulHit
      ? "今日可把重要事项放在清晰、主动、可执行的步骤上，顺势推进。"
      : avoidHit
        ? "今日适合稳中求进，重要决定先复核条件、预算和人事边界。"
        : "今日可做常规推进，若是大事，建议再结合事项、时辰和现实条件复核。";
    return { score, label, text, advice };
  }

  function buildTimeSlots(queryDate, matter, usefulElements = []) {
    const date = parseIsoDate(queryDate);
    if (!date || !window.Solar) return [];
    const profile = DAILY_MATTERS[matter] || DAILY_MATTERS.起名改名;
    return BIRTH_HOURS.map((hourName) => {
      const solar = window.Solar.fromYmdHms(date.year, date.month, date.day, HOUR_TO_NUMBER[hourName], 0, 0);
      const lunar = solar.getLunar();
      const timeGanZhi = lunar.getTimeInGanZhi?.() || "";
      const gan = timeGanZhi.slice(0, 1);
      const zhi = timeGanZhi.slice(1, 2);
      const element = GAN_ELEMENT[gan] || ZHI_ELEMENT[zhi] || "土";
      const yi = asList(lunar.getTimeYi?.());
      const ji = asList(lunar.getTimeJi?.());
      const matterHit = profile.keywords.some((keyword) => yi.includes(keyword));
      const usefulHit = usefulElements.includes(element);
      const score = clamp(70 + (matterHit ? 10 : 0) + (usefulHit ? 8 : 0) - Math.min(16, ji.length * 2), 42, 96);
      return { hourName, timeGanZhi, element, yi, ji, score, label: score >= 86 ? "优先" : score >= 76 ? "可用" : "谨慎" };
    }).sort((a, b) => b.score - a.score);
  }

  function evaluateAuspiciousDate(queryDate, data, bazi) {
    const ctx = getAlmanacContext(queryDate);
    if (!ctx) return null;
    const event = AUSPICIOUS_EVENTS[data.eventType] || AUSPICIOUS_EVENTS.签约交易;
    const matter = matterKeywordScore(event.matter, ctx.yi, ctx.ji);
    const fit = baziDayFit(bazi, ctx, { ...DAILY_MATTERS[event.matter], element: event.element });
    const yiHit = event.keywords.filter((keyword) => ctx.yi.includes(keyword));
    const jiHit = event.keywords.filter((keyword) => ctx.ji.includes(keyword));
    const directScore = clamp(76 + yiHit.length * 10 - jiHit.length * 14, 38, 98);
    const clashPenalty = bazi?.shengxiao && ctx.chongZodiac === bazi.shengxiao ? 14 : 0;
    const deityScore = clamp(74 + Math.min(10, ctx.jiShen.length * 2) - Math.min(14, ctx.xiongSha.length), 45, 96);
    const bestTimes = buildTimeSlots(queryDate, event.matter, bazi?.useful || []).slice(0, 3);
    const timeScore = bestTimes[0]?.score || 70;
    const total = clamp(directScore * 0.32 + fit.score * 0.30 + deityScore * 0.18 + timeScore * 0.14 + matter.score * 0.06 - clashPenalty, 30, 99);
    const reason = [
      yiHit.length ? `所宜命中${yiHit.join("、")}` : "未直接命中事项，可作为备选",
      jiHit.length ? `所忌含${jiHit.join("、")}，需避重就轻` : "未见事项直接落入所忌",
      clashPenalty ? `冲${ctx.chongZodiac}，与本人生肖相冲` : `冲煞为${ctx.chong || "待查"}，可按方位规避`,
      fit.label
    ].join("；");
    return { date: queryDate, ctx, event, matter, fit, yiHit, jiHit, deityScore, directScore, timeScore, bestTimes, clashPenalty, total, reason };
  }

  function buildAuspiciousDateReport(tool, data) {
    if (!window.Solar) return `<div class="report-error">当前黄历库未加载完成，请刷新后重试。</div>`;
    const bazi = window.NameEngine?.calcBazi?.({ birthDate: data.birthDate, birthHour: data.birthHour });
    const days = rangeDays(data.rangeDays);
    const candidates = Array.from({ length: days }, (_, index) => evaluateAuspiciousDate(addDaysIso(data.startDate, index), data, bazi))
      .filter(Boolean)
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
    const best = candidates[0];
    if (!best) return `<div class="report-error">暂未生成候选日期，请检查开始日期。</div>`;
    const scores = [
      ["事项命中", best.directScore],
      ["八字补益", best.fit.score],
      ["吉神时辰", clamp((best.deityScore + best.timeScore) / 2, 30, 99)],
      ["综合择日", best.total]
    ];
    const rows = candidates.slice(0, 6).map((item, index) => [
      `第${index + 1}候选`,
      `${item.date} · ${item.ctx.dayGanZhi}日`,
      `${item.total}分 · ${grade(item.total)}`,
      item.reason
    ]);
    const bestTimeRows = best.bestTimes.map((slot) => [
      `${slot.hourName} ${slot.timeGanZhi}`,
      `${slot.score}分 · ${slot.label}`,
      `${slot.element}行${(bazi?.useful || []).includes(slot.element) ? "，补喜用" : ""}`,
      `宜：${slot.yi.slice(0, 5).join("、") || "平常事"}`
    ]);
    return resultShell(tool, data, [
      cover("黄道吉日筛选报告", data.eventType, scores, `${data.startDate} 起 · ${data.rangeDays} · 八字择日参考`),
      page("候选吉日排序", `
        <p>本次围绕「${escapeHtml(data.eventType)}」从 ${escapeHtml(data.startDate)} 起筛选 ${days} 天，优先看黄历所宜是否命中事项，再看个人八字喜用、冲煞、吉神凶煞和可用吉时。</p>
        ${table(rows)}
        <p class="muted-line">排序越高，表示传统黄历与个人八字条件更顺；若现实条件不允许，可优先选择前 3 个候选日，并避开冲煞方位和不利时段。</p>
      `, "1518 黄道吉日 · 2/4"),
      page("八字择日逻辑", `
        <p>${escapeHtml(best.fit.text)}</p>
        ${bazi ? table([["四柱", bazi.pillars.map((pillar) => `${pillar.label}${pillar.value}`).join(" · ")], ["生肖", bazi.shengxiao], ["日主", `${bazi.dayGan}${bazi.dayElement}（${bazi.strength}）`], ["喜用倾向", bazi.useful.join("、")], ["需节制", bazi.avoid.join("、")]]) : table([["八字", "未能排出四柱"], ["建议", "补齐出生日期和出生时辰后再测"]])}
        ${table([["最佳候选", `${best.date} · ${best.ctx.dayGanZhi}日`], ["黄历所宜", best.ctx.yi.slice(0, 10).join("、") || "待查"], ["黄历所忌", best.ctx.ji.slice(0, 10).join("、") || "待查"], ["冲煞", `${best.ctx.chong || "待查"}，煞${best.ctx.sha || "方位待查"}`]])}
      `, "1518 黄道吉日 · 3/4"),
      page("事项与执行建议", `
        <p>${escapeHtml(best.event.focus)}</p>
        <p><b>建议日期：</b>${escapeHtml(best.date)}。<b>建议时辰：</b>${best.bestTimes.map((slot) => escapeHtml(slot.hourName)).join("、") || "待查"}。</p>
        <div class="daily-time-grid">${best.bestTimes.map((slot) => `<div><strong>${escapeHtml(slot.hourName)}</strong><span>${escapeHtml(slot.timeGanZhi)} · ${slot.element}行</span><em>${slot.score}分 · ${slot.label}</em></div>`).join("")}</div>
        ${table(bestTimeRows)}
        <p class="muted-line">黄道吉日用于传统文化择日参考，不替代婚姻登记、合同审查、工商办理、天气交通、场地档期、医疗安全和法律意见。大事定日，宜“天时、人和、现实条件”三者同看。</p>
      `, "1518 黄道吉日 · 4/4")
    ]);
  }

  function buildDailyAlmanacReport(tool, data) {
    const ctx = getAlmanacContext(data.queryDate);
    if (!ctx) return `<div class="report-error">当前黄历库未加载完成，请刷新后重试。</div>`;
    const bazi = window.NameEngine?.calcBazi?.({ birthDate: data.birthDate, birthHour: data.birthHour });
    const matter = matterKeywordScore(data.matter, ctx.yi, ctx.ji);
    const fit = baziDayFit(bazi, ctx, matter.profile);
    const timeSlots = buildTimeSlots(data.queryDate, data.matter, bazi?.useful || []);
    const bestTimes = timeSlots.slice(0, 4);
    const dayScore = clamp(74 + Math.min(12, ctx.yi.length) - Math.min(12, ctx.ji.length) + (ctx.jiShen.length ? 4 : 0), 45, 95);
    const clashText = bazi?.shengxiao && ctx.chongZodiac === bazi.shengxiao
      ? `今日冲${ctx.chongZodiac}，与你的生肖相冲，宜把重要事项放慢一拍，先复核再行动。`
      : `今日冲煞为${ctx.chong || "待查"}，煞${ctx.sha || "方位待查"}，按事项避开对应方向即可。`;
    const scores = [
      ["黄历日课", dayScore],
      ["八字补益", fit.score],
      ["事项适配", matter.score],
      ["吉时选择", bestTimes[0]?.score || 72]
    ];
    const timeRows = bestTimes.map((slot) => [
      `${slot.hourName} ${slot.timeGanZhi}`,
      `${slot.score}分 · ${slot.label}`,
      `${slot.element}行${(bazi?.useful || []).includes(slot.element) ? "，补喜用" : ""}`,
      `宜：${slot.yi.slice(0, 5).join("、") || "平常事"}；忌：${slot.ji.slice(0, 4).join("、") || "少见明显忌项"}`
    ]);
    return resultShell(tool, data, [
      cover("每日宜忌报告", data.queryDate, scores, `${ctx.lunarText} · ${ctx.dayGanZhi}日 · ${escapeHtml(data.matter)}`),
      page("今日黄历总览", `
        <div class="daily-overview">
          <div><span>公历</span><strong>${escapeHtml(data.queryDate)}</strong><p>${ctx.lunarText} · ${ctx.yearGanZhi}年 ${ctx.monthGanZhi}月 ${ctx.dayGanZhi}日</p></div>
          <div><span>冲煞</span><strong>${escapeHtml(ctx.chong || "待查")}</strong><p>煞${escapeHtml(ctx.sha || "方位待查")}。${escapeHtml(clashText)}</p></div>
          <div><span>方位</span><strong>财 ${escapeHtml(ctx.positions.财神 || "待查")}</strong><p>喜神${escapeHtml(ctx.positions.喜神 || "待查")}，福神${escapeHtml(ctx.positions.福神 || "待查")}。</p></div>
        </div>
        <h4 class="report-subtitle">今日所宜</h4>${listItems(ctx.yi, "good")}
        <h4 class="report-subtitle">今日所忌</h4>${listItems(ctx.ji, "danger")}
        <p class="muted-line">彭祖百忌：${escapeHtml(ctx.pengzu || "待补")}。宜忌为传统黄历参考，真实安排仍需结合天气、交通、合同和个人状态。</p>
      `, "1518 每日宜忌 · 2/4"),
      page("八字个性化判断", `
        <p>${escapeHtml(fit.text)}</p>
        <p><b>调和建议：</b>${escapeHtml(fit.advice)}</p>
        ${bazi ? table([["四柱", bazi.pillars.map((pillar) => `${pillar.label}${pillar.value}`).join(" · ")], ["日主", `${bazi.dayGan}${bazi.dayElement}（${bazi.strength}）`], ["喜用倾向", bazi.useful.join("、")], ["需节制", bazi.avoid.join("、")], ["关注事项", `${escapeHtml(data.matter)}偏${matter.profile.element}行：${escapeHtml(matter.profile.advice)}`]]) : table([["八字", "未能排出四柱"], ["建议", "补齐出生日期和出生时辰后再测"]])}
      `, "1518 每日宜忌 · 3/4"),
      page("吉时与行动建议", `
        <div class="daily-time-grid">${bestTimes.map((slot) => `<div><strong>${escapeHtml(slot.hourName)}</strong><span>${escapeHtml(slot.timeGanZhi)} · ${slot.element}行</span><em>${slot.score}分 · ${slot.label}</em></div>`).join("")}</div>
        ${table(timeRows)}
        <h4 class="report-subtitle">吉神凶煞参考</h4>
        ${table([["吉神", ctx.jiShen.slice(0, 8).join("、") || "待查"], ["凶煞", ctx.xiongSha.slice(0, 8).join("、") || "待查"], ["事项命中", matter.yiHit.length ? `黄历所宜含 ${matter.yiHit.join("、")}` : "关注事项未明显命中今日所宜，可先做准备或轻量推进"], ["风险提醒", matter.jiHit.length ? `今日所忌含 ${matter.jiHit.join("、")}，大事宜缓` : "未见关注事项直接落入所忌，但仍需现实条件配合"]])}
      `, "1518 每日宜忌 · 4/4")
    ]);
  }

  function digitReport(value) {
    const digits = Array.from(String(value || "")).filter((char) => /\d/.test(char)).map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    const tail = digits.slice(-4).join("") || "0000";
    const n = numerology(sum + Number(tail.slice(-2) || 0));
    const repeats = Object.entries(digits.reduce((map, d) => ({ ...map, [d]: (map[d] || 0) + 1 }), {})).filter(([, count]) => count >= 3).map(([d]) => d);
    const uniqueCount = new Set(digits).size;
    const balanceScore = digits.length ? clamp(58 + uniqueCount * 4 - repeats.length * 8, 35, 94) : 35;
    const ascending = digits.length >= 4 && digits.slice(-4).every((digit, index, arr) => index === 0 || digit === arr[index - 1] + 1);
    const descending = digits.length >= 4 && digits.slice(-4).every((digit, index, arr) => index === 0 || digit === arr[index - 1] - 1);
    const sequencePenalty = ascending || descending ? 6 : 0;
    const validityScore = digits.length >= 7 ? 90 : digits.length >= 4 ? 72 : 45;
    return { digits, sum, tail, n, repeats, balanceScore, sequencePenalty, validityScore };
  }

  function buildNumberReport(tool, data) {
    const r = digitReport(data.number);
    const score = clamp(r.n.score * 0.52 + r.balanceScore * 0.22 + r.validityScore * 0.16 + hashScore(data.number, 6, 14) - r.sequencePenalty, 20, 99);
    return resultShell(tool, data, [
      cover("手机号测算报告", data.number, [["综合数理", score], ["尾号气质", hashScore(r.tail, 74, 94)], ["数字均衡", r.balanceScore], ["输入完整度", r.validityScore]], `${r.tail} · ${r.n.number}数`),
      page("号码结构", `<p>号码数字和为 ${r.sum}，尾四位为 ${r.tail}，换算易经数理为 ${r.n.number}「${r.n.title}」。${r.n.text}</p>${table([["重复数字", r.repeats.length ? r.repeats.join("、") : "无明显三连重复"], ["顺逆连号", r.sequencePenalty ? "尾号存在明显顺连/倒连，容易被记住，也需防止过度解读" : "未见明显顺连/倒连"], ["建议", r.n.advice], ["边界", "号码测算为传统数理参考，不能决定真实财运、信用或事业结果"]])}`, "1518 手机号测算 · 2/2")
    ]);
  }

  function buildPlateReport(tool, data) {
    const r = digitReport(data.plate);
    const letters = Array.from(data.plate).filter((char) => /[a-z]/i.test(char)).join("");
    const letterScore = letters ? hashScore(letters, 70, 90) : 64;
    const score = clamp(r.n.score * 0.50 + r.balanceScore * 0.20 + letterScore * 0.14 + r.validityScore * 0.10 + hashScore(data.plate, 4, 12) - r.sequencePenalty, 20, 99);
    return resultShell(tool, data, [
      cover("车牌测算报告", data.plate, [["综合数理", score], ["尾号气场", hashScore(r.tail, 74, 95)], ["字母结构", letterScore], ["数字均衡", r.balanceScore]], `${r.tail} · ${r.n.number}数`),
      page("车牌结构", `<p>车牌数字和为 ${r.sum}，字母段为 ${escapeHtml(letters || "无")}，易经数理为 ${r.n.number}「${r.n.title}」。${r.n.text}</p>${table([["尾号", r.tail], ["重复数字", r.repeats.length ? r.repeats.join("、") : "无明显三连重复"], ["顺逆连号", r.sequencePenalty ? "尾号存在明显顺连/倒连，适合记忆但不代表现实风险变化" : "未见明显顺连/倒连"], ["建议", "车牌重点仍是合法合规、清晰易记和行车安全"], ["边界", "测算不代表交通风险预测"]])}`, "1518 车牌测算 · 2/2")
    ]);
  }

  function renderTools() {
    const root = document.getElementById("columnToolPages");
    if (!root) return;
    root.innerHTML = TOOLS.filter((tool) => tool.id !== "baby").map((tool) => `
      <section class="column-tool-card" id="${tool.id}" data-tool-id="${tool.id}">
        <div class="column-tool-head">
          <div><p class="company-eyebrow">1518 在线工具</p><h2>${tool.title}</h2><p>${tool.intro}</p></div>
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
        const data = collect(form);
        const error = validateRequired(tool, data);
        output.hidden = false;
        if (error) {
          output.innerHTML = `<div class="report-error">${error}</div>`;
          output.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        output.innerHTML = tool.build(tool, data);
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
