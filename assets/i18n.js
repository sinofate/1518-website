(function () {
  const STORE_KEY = "1518_lang";
  const SUPPORTED = new Set(["zh", "en"]);
  const textSources = new WeakMap();
  const attrSources = new WeakMap();
  let currentLang = "zh";
  let applying = false;

  const exact = {
    "起名网": "Naming",
    "中文": "ZH",
    "手机网页": "Mobile",
    "首页": "Home",
    "个人起名": "Personal Naming",
    "公司起名": "Company Naming",
    "品牌起名": "Brand Naming",
    "姓名测试": "Name Test",
    "公司测名": "Company Name Test",
    "品牌测试": "Brand Test",
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
    "测手机号": "Phone Test",
    "车牌测算": "Plate Number Test",
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
    "请选择姓氏类型": "Select surname type",
    "请选择历法": "Select calendar",
    "请选择年份": "Select year",
    "请选择月份": "Select month",
    "请选择日期": "Select day",
    "请选择时辰": "Select hour",
    "请选择分钟": "Select minute",
    "起名姓氏": "Surname",
    "出生时间": "Birth Time",
    "公历": "Solar Calendar",
    "农历": "Lunar Calendar",
    "取名字数": "Name Length",
    "二字名": "2 Characters",
    "三字名": "3 Characters",
    "开始起名": "Start Naming",
    "公司全称": "Full Company Name",
    "公司名称": "Company Name",
    "商号简称": "Trade Name",
    "所属行业": "Industry",
    "请选择行业": "Select industry",
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
    "1518 在线工具": "1518 Online Tool",
    "专注精准姓名测算": "Focused on Accurate Chinese Name Analysis",
    "深耕在线测评20年，千万用户验证的权威姓名测试网站": "20 years in online assessment, trusted by millions of users for authoritative name testing",
    "20年中文起名测名工具站": "20-Year Chinese Naming Tool Site",
    "20年": "20 Years",
    "孔力": "Kong Li",
    "1518.com 权威测名工具": "1518.com Authoritative Name Testing Tools",
    "1518 起名网": "1518 Naming",
    "关于我们": "About Us",
    "请选择性别": "Select gender",
    "请选择出生时辰": "Select birth hour",
    "1518.com 长期服务中文起名、测名和传统文化查询用户。本版本由《易经》专家孔力担任产品顾问，围绕姓名、公司名、品牌名、生肖星座和号码测算建立可解释的参考体系。": "1518.com has long served Chinese naming, name testing and traditional culture users. This version has I Ching expert Kong Li as product advisor and builds explainable reference systems for personal names, company names, brand names, zodiac tools and number tests.",
    "1518.com 长期服务中文起名、测名和传统文化查询用户。本版本由孔力（又名孔令森）担任产品顾问，围绕姓名、公司名、品牌名、生肖星座、号码测算和注册预查建立可解释的参考体系。": "1518.com has long served Chinese naming, name testing and traditional culture users. This version is advised by Kong Li, also known as Kong Lingsen, and builds explainable systems for personal names, company names, brand names, zodiac tools, number tests and registration prechecks.",
    "长期运营": "Long Running",
    "产品顾问": "Product Advisor",
    "易学顾问": "I Ching Advisor",
    "机器可读": "Machine Readable",
    "Agent 友好": "Agent Friendly",
    "本地预审项": "Local Precheck Items",
    "生成报告": "Generate Report",
    "注册地域": "Registration Region",
    "行业": "industry",
    "姓氏类型": "surname type",
    "历法": "calendar",
    "年份": "year",
    "月份": "month",
    "日期": "day",
    "时辰": "hour",
    "分钟": "minute",
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
    "联系人姓名": "Contact Name",
    "注册预查": "Registration Precheck",
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
    "亥时": "Hai Hour",
    "国家企业信用信息公示系统": "National Enterprise Credit Information Publicity System",
    "中国商标网查询": "China Trademark Online Search",
    "国家知识产权局": "CNIPA",
    "企查查商标 API": "Qichacha Trademark API",
    "天眼查开放平台": "Tianyancha Open Platform",
    "知擎者商标近似": "Zhiqingzhe Trademark Similarity",
    "梦见蛇": "Snake dream",
    "梦见狗": "Dog dream",
    "梦见旅行": "Travel dream",
    "梦见被追赶": "Being chased",
    "梦见鱼": "Fish dream",
    "梦见猫": "Cat dream",
    "梦见血": "Blood dream",
    "梦见钱财": "Money dream",
    "梦见地震": "Earthquake dream",
    "梦见结婚": "Wedding dream",
    "梦见老虎": "Tiger dream",
    "梦见怀孕": "Pregnancy dream"
  };

  const attr = {
    "1518 起名网首页": "1518 Home",
    "请输入姓名": "Enter a name",
    "请选择性别": "Select gender",
    "请选择出生时辰": "Select birth hour",
    "请输入出生地（可选）": "Enter birthplace (optional)",
    "请输入车牌号": "Enter a plate number",
    "请输入手机号码": "Enter a phone number",
    "请输入公司名全称": "Enter the full company name",
    "请输入公司名": "Enter a company name",
    "请输入商号简称（可选）": "Enter trade name (optional)",
    "请输入姓氏": "Enter surname"
  };

  const phrases = [
    ["1518 起名网 - 20年中文起名测名工具", "1518 Naming - Chinese Name and Culture Tools Since 2006"],
    ["1518 起名网是长期运营20年的中文起名测名工具站，由《易经》专家孔力担任产品顾问，提供姓名测试、公司名测试、个人起名、公司起名、品牌起名、周公解梦、生肖星座、号码测算等传统文化参考服务。", "1518 Naming is a 20-year Chinese naming and cultural reference site with I Ching expert Kong Li as product advisor, offering name tests, company name tests, personal naming, company naming, brand naming, dream interpretation, zodiac tools and number tests."],
    ["1518 起名网提供姓名测试、个人起名、公司起名、公司名测试、周公解梦、生肖星座和号码测算等在线工具。", "1518 provides online tools for name testing, personal naming, company naming, company name testing, dream interpretation, zodiac and number tests."],
    ["每个栏目都采用与“姓名测试”“公司名测试”一致的报告页风格，保持统一的输入、测算和报告体验，后续再逐栏接入更大的数据库和更细算法。", "Each tool follows the same report-style workflow as Name Test and Company Name Test, with consistent inputs, calculations and report output. Larger datasets and deeper algorithms can be connected later."],
    ["适合从姓名测试结果继续生成个人名字候选。", "Useful for generating personal name candidates after reviewing a name test result."],
    ["易经数理 · 商业命名诊断", "I Ching Numerology · Business Naming Diagnosis"],
    ["公司名测试说明", "Company Name Test Notes"],
    ["按公司全称、商号简称、所属行业和易经数理，生成商业命名诊断。重点看品牌传播力、行业适配、融资扩张、现金流稳定与经营风险。", "Generate a business naming diagnosis from the full company name, trade name, industry and I Ching numerology, focusing on brand communication, industry fit, expansion, cash-flow stability and operating risk."],
    ["预查用于降低重名、近似和类别冲突风险，不构成工商核名、商标注册或法律可注册承诺。", "The precheck helps reduce duplicate, similar-name and class-conflict risk. It is not a legal promise of company name approval or trademark registration."],
    ["当前未连接后端注册数据接口，已提供官方核验入口。", "The backend registry data API is not connected yet. Official verification links are provided."],
    ["当前静态站版本未启用后端注册数据接口，已提供官方核验入口。", "The static site version has not enabled the backend registry data API. Official verification links are provided."],
    ["本地规则未发现明显禁用词，仍需连接官方或授权数据源做重名/近似检索。", "Local rules found no obvious restricted wording, but official or licensed data is still required for duplicate and similarity checks."],
    ["公司名称建议先确认行政区划、行业表述、组织形式，再围绕主体字号做商标、同名企业和负面舆情排查。", "For company names, confirm the region, industry wording and entity suffix first, then check the core trade name against trademarks, existing entities and negative associations."],
    ["正式使用前需做商标近似和同品类检索。", "Before official use, run similar trademark and same-category searches."],
    ["孔力（又名孔令森）", "Kong Li, also known as Kong Lingsen"],
    ["易经泰斗潘汝钧（潘汝汮）嫡传弟子，孔子第76代传人，易医合参实战派易学权威。1518.com 以其姓名学、命理、五行和企业命名方法为顾问基础，将传统易学经验转化为可解释的在线测名与起名工具。", "Kong Li is a direct disciple of I Ching master Pan Rujun, also written Pan Rujun, and a 76th-generation descendant of Confucius. 1518.com uses his naming, numerology, Five Elements and business naming methods as advisory foundations, turning traditional practice into explainable online name testing and naming tools."],
    ["孔子第76代传人", "76th-generation descendant of Confucius"],
    ["易医合参", "I Ching and medicine combined"],
    ["姓名学", "Name studies"],
    ["企业命名", "Business naming"],
    ["师承渊源", "Lineage"],
    ["师从潘汝钧（潘汝汮）：中国太易玄空学第十三代唯一传人、“太易玄空风水泰斗”、中国易经协会副会长、广西堪舆学院院长。", "Studied under Pan Rujun, the 13th-generation sole inheritor of Taiyi Xuankong studies, a recognized Xuankong Feng Shui master, vice president of the China I Ching Association, and dean of Guangxi Kanyu College."],
    ["完整承袭潘汝钧太易玄空学、命理、奇门、大六壬、姓名学核心体系，得其真传。", "Inherited the core systems of Taiyi Xuankong, destiny analysis, Qimen, Da Liu Ren and name studies from Pan Rujun."],
    ["师承体系强调象、数、理、气并参，用于姓名、企业命名、风水布局与战略预测场景。", "The lineage emphasizes image, number, principle and qi, and is applied to personal names, business naming, Feng Shui layout and strategic prediction."],
    ["身份与资历", "Identity and Credentials"],
    ["孔子第76代嫡孙，中共党员，易医双修，兼具医学专业训练与家传易学背景。", "A 76th-generation direct descendant of Confucius and a CPC member, with training in both medicine and family I Ching practice."],
    ["国际易学联合会理事、中国易经协会专家委员、玄元书院副院长。", "Council member of the International I Ching Federation, expert committee member of the China I Ching Association, and vice dean of Xuanyuan Academy."],
    ["深耕易学30余年，遍访民间名师，精研《周易》《易隐》《奇门遁甲》《玄空风水》等典籍。", "Has studied I Ching practice for more than 30 years, visiting folk masters and studying classics such as Zhouyi, Yiyin, Qimen Dunjia and Xuankong Feng Shui."],
    ["学术与实战成就", "Academic and Practical Work"],
    ["创立“孔力易学数理预测体系”，将中医阴阳五行与易经象数融合，强调精准度与实用性。", "Created the Kong Li I Ching Numerology Prediction System, combining Yin-Yang and Five Elements concepts from Chinese medicine with I Ching image-number theory."],
    ["擅长玄空风水布局、企业战略预测、八字命理、奇门运筹、大六壬决策、姓名学。", "Specializes in Xuankong Feng Shui layout, business strategy prediction, BaZi, Qimen planning, Da Liu Ren decision support and name studies."],
    ["为国内外500强企业、上市公司、政要家族提供顾问服务，案例遍布海内外。", "Has provided advisory services to Fortune 500 companies, listed companies and prominent families in China and overseas."],
    ["传承并推广太易玄空学，培养易学人才数百人，推动易学文化科学化、实用化传播。", "Continues and promotes Taiyi Xuankong studies, training hundreds of practitioners and encouraging practical dissemination of I Ching culture."],
    ["行业地位", "Industry Position"],
    ["当代易医合参代表人物，太易玄空学重要传承者。", "A contemporary representative of combined I Ching and medical thinking and an important inheritor of Taiyi Xuankong studies."],
    ["兼具学术深度、实战落地和正统师承的易学专家。", "An I Ching expert combining academic depth, practical work and orthodox lineage."],
    ["被誉为“南派易学实战领军人物”。", "Recognized as a leading practical figure in southern-school I Ching studies."],
    ["公司商标注册预查", "Company and Trademark Registration Precheck"],
    ["真实数据源接入路线", "Real Data Source Integration Roadmap"],
    ["当前静态站已完成本地规则预审、官方核验入口和 Agent 工具协议。下一步可先接“可查到已有重复名/重复品牌”的替代数据源，再升级到官方或授权数据源。", "The static site now supports local rule prechecks, official verification links and Agent tool schemas. The next step is to connect alternative data sources that can find existing duplicate company or brand names, then upgrade to official or licensed data sources."],
    ["第一阶段：可落地替代源", "Phase 1: Practical Alternative Sources"],
    ["接入企查查、天眼查、启信宝等企业搜索接口，用公司名关键词查询存量企业、经营状态、行业和地区；商标侧可接企查查商标接口或知擎者近似商标接口，先覆盖已有重复名、近似品牌和同类商标风险。", "Connect enterprise search APIs such as Qichacha, Tianyancha and Qixinbao to query existing companies, operating status, industry and region by company-name keywords. For trademarks, connect Qichacha trademark APIs or Zhiqingzhe similarity APIs to cover duplicate names, similar brands and same-class trademark risks."],
    ["第二阶段：官方检索辅助", "Phase 2: Official Search Assistance"],
    ["保留国家企业信用信息公示系统、中国商标网、国家知识产权公共服务平台入口。用户可跳转官方系统做最终复核，站内报告展示“待官方核验”而不是“保证可注册”。", "Keep links to the National Enterprise Credit Information Publicity System, China Trademark Online Search and CNIPA public service resources. Users can jump to official systems for final verification, while site reports show official check needed rather than guaranteed registrable."],
    ["第三阶段：自建缓存库", "Phase 3: Local Cache Index"],
    ["商标数据可基于公开数据下载或授权数据建立本地索引，按名称、拼音、字形、行业类别、申请人和状态做近似排序；企业名可按地区、字号、行业表述和组织形式拆解后做相似主体检索。", "Trademark data can be indexed from public downloads or licensed data, then ranked by name, pinyin, character shape, class, applicant and status. Company names can be split by region, trade name, industry wording and entity suffix for similar-entity search."],
    ["算法说明", "Algorithm Notes"],
    ["1518 测名与起名评分框架", "1518 Name Testing and Naming Scoring Framework"],
    ["1518.com 的结果定位为传统文化、命名灵感和初步风险排查参考。系统会把姓名学、易经数理、五行、音形义、行业传播和注册预查拆成可解释维度，不输出不可验证的绝对结论。", "1518.com results are positioned as traditional culture reference, naming inspiration and preliminary risk screening. The system breaks name studies, I Ching numerology, Five Elements, sound-shape-meaning, industry messaging and registration prechecks into explainable dimensions, without making unverifiable absolute claims."],
    ["五格数理、三才配置、八字喜用、生肖用字、音韵字义、常用度综合评分。", "Scores Five Grid numerology, Three-Talent configuration, BaZi useful elements, zodiac character fit, sound and meaning, and common usage."],
    ["按姓氏、性别、出生时间和喜用神生成候选名，并逐个复算五格、三才、音形义和用字风险。", "Generates candidate names from surname, gender, birth time and useful elements, then recalculates Five Grid, Three-Talent, sound-shape-meaning and character risks."],
    ["拆分公司全称、商号简称、行业属性和组织形式，评估商号数理、行业适配、传播记忆、扩张稳定和禁限词风险。", "Splits full company name, trade name, industry attributes and entity form, then assesses trade-name numerology, industry fit, memorability, expansion stability and restricted-word risks."],
    ["检查显著性、通用宣传词、品类联想、商标类别、近似风险和传播节奏。", "Checks distinctiveness, generic promotional words, category association, trademark class, similarity risk and communication rhythm."],
    ["先用本地规则识别行政区划、组织形式、敏感行业、禁限词和近似度；接入数据源后再补充真实企业/商标命中记录。", "First uses local rules to identify region wording, entity suffix, sensitive industries, restricted terms and similarity. After data-source integration, it will add real company and trademark hits."],
    ["承四柱、合八字，结合音形义、生肖与数理给出名字参考。", "Combines Four Pillars, BaZi, sound-shape-meaning, zodiac fit and numerology for name references."],
    ["结合经营者信息、行业方向和地域后缀生成公司名方案。", "Generates company name ideas from operator context, industry direction and regional suffix."],
    ["面向产品、店铺与商标场景，生成易记、易传播的品牌名。", "Creates memorable and communicable brand names for products, shops and trademarks."],
    ["按梦境关键词给出传统文化解释和心理参考。", "Provides traditional and psychological references from dream keywords."],
    ["根据车牌数字组合生成数理参考分与说明。", "Generates numerology reference scores and notes from license plate numbers."],
    ["分析手机号数字组合的寓意和参考评分。", "Analyzes phone-number digit combinations and reference scores."],
    ["对公司全称进行结构、音韵、行业匹配度分析。", "Analyzes full company name structure, sound and industry fit."],
    ["展示星座之间的性格互补、沟通和情感指数。", "Shows personality complementarity, communication and relationship indicators between signs."],
    ["按行业、地域、主体偏好和易经数理，生成公司商号候选与注册全称结构。", "Generates company trade-name candidates and full registered-name structures from industry, region, preferences and I Ching numerology."],
    ["面向产品、店铺、商标和新媒体账号，生成短、亮、易传播的品牌名。", "Generates short, distinctive and easy-to-share brand names for products, shops, trademarks and social media accounts."],
    ["检查品牌名的传播力、品类联想、音节节奏、数理和基础风险。", "Checks a brand name's communication strength, category association, syllable rhythm, numerology and basic risk."],
    ["按梦境关键词生成传统梦书解释、现代心理参考和现实提醒。", "Generates traditional dream-book interpretations, modern psychological references and practical reminders from dream keywords."],
    ["按出生年份查询生肖、地支、五行倾向、六合三合和年度参考。", "Looks up Chinese zodiac, earthly branch, Five Elements tendency, compatible relations and annual reference by birth year."],
    ["按十二生肖六合、三合、六冲、六害关系生成配对报告。", "Generates compatibility reports from Chinese zodiac harmony, trine, clash and harm relationships."],
    ["按生日查询太阳星座、四象属性、守护星和性格倾向。", "Looks up sun sign, element, ruling planet and personality tendency from birthday."],
    ["按星座四象、节奏与关系需求生成配对指数。", "Generates compatibility indicators from zodiac element, rhythm and relationship needs."],
    ["按生日生成性格关键词、优势挑战、关系建议和幸运元素。", "Generates personality keywords, strengths, challenges, relationship advice and lucky elements from birthday."],
    ["以空间类型、朝向和使用场景生成家居/办公风水体检报告。", "Generates home or office Feng Shui check reports from space type, direction and use case."],
    ["按 ABO 血型输出性格、人际、职场和关系参考。", "Outputs personality, interpersonal, workplace and relationship references from ABO blood type."],
    ["按 ABO 血型互补关系生成沟通、情感和协作建议。", "Generates communication, emotional and collaboration advice from ABO blood-type complementarity."],
    ["按年份和日期输出岁运、节气阶段、气候与养生参考。", "Outputs annual movement, seasonal phase, climate and wellness references from year and date."],
    ["按号码尾数、数字五行、易经数理和重复结构生成号码报告。", "Generates phone-number reports from tail digits, digit elements, I Ching numerology and repetition patterns."],
    ["按车牌数字、字母、尾号和易经数理生成车牌参考报告。", "Generates license plate reports from digits, letters, tail number and I Ching numerology."],
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
    ["测手机号", "Phone Test"],
    ["车牌测算报告", "Plate Number Report"]
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
    ["测手机号", "Phone Test"],
    ["车牌测算", "Plate Number Test"]
  ].forEach((item) => phrases.push(item));

  const routeMeta = {
    home: ["1518 Naming - Chinese Name and Culture Tools Since 2006", "1518 起名网 - 20年中文起名测名工具"],
    about: ["About 1518.com - Authority, Advisor and Data Roadmap", "关于我们 - 1518.com 权威姓名测试与起名测名工具"],
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
    phone: ["Phone Number Test - 1518 Naming", "测手机号_手机号码吉凶_号码测试 - 1518 起名网"],
    plate: ["License Plate Number Test - 1518 Naming", "车牌测算_车牌号码吉凶_车牌号测试 - 1518 起名网"],
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
    "坐东北朝西南": "Northeast to Southwest",
    "坐西南朝东北": "Southwest to Northeast",
    "财位与动线": "Wealth Area & Flow",
    "睡眠健康": "Sleep & Health",
    "办公效率": "Office Efficiency",
    "门窗冲煞": "Doors & Windows",
    "采光通风": "Light & Ventilation",
    "有限公司": "Co., Ltd.",
    "有限责任公司": "Limited Liability Company",
    "股份有限公司": "Joint Stock Co., Ltd.",
    "集团有限公司": "Group Co., Ltd.",
    "未知": "Unknown",
    "鼠": "Rat",
    "牛": "Ox",
    "虎": "Tiger",
    "兔": "Rabbit",
    "龙": "Dragon",
    "蛇": "Snake",
    "马": "Horse",
    "羊": "Goat",
    "猴": "Monkey",
    "鸡": "Rooster",
    "狗": "Dog",
    "猪": "Pig",
    "摩羯座": "Capricorn",
    "水瓶座": "Aquarius",
    "双鱼座": "Pisces",
    "白羊座": "Aries",
    "金牛座": "Taurus",
    "双子座": "Gemini",
    "巨蟹座": "Cancer",
    "狮子座": "Leo",
    "处女座": "Virgo",
    "天秤座": "Libra",
    "天蝎座": "Scorpio",
    "射手座": "Sagittarius"
  };

  function translateText(value) {
    if (!value || currentLang === "zh") return value;
    const trimmed = value.trim();
    if (!trimmed) return value;
    if (trimmed === "专注精准测名") return value.replace(trimmed, "Focused Name Testing");
    if (/^\d{4}年$/.test(trimmed)) return value.replace(trimmed, trimmed.replace("年", ""));
    if (/^\d+月$/.test(trimmed)) return value.replace(trimmed, trimmed.replace("月", ""));
    if (/^\d+日$/.test(trimmed)) return value.replace(trimmed, trimmed.replace("日", ""));
    if (/^\d+时$/.test(trimmed)) return value.replace(trimmed, `${trimmed.replace("时", "")}:00`);
    if (/^\d+分$/.test(trimmed)) return value.replace(trimmed, `${trimmed.replace("分", "")} min`);
    if (trimmed === "未知时" || trimmed === "未知分") return value.replace(trimmed, "Unknown");
    if (trimmed.startsWith("请输入")) {
      const label = trimmed.slice(3);
      return value.replace(trimmed, `Enter ${translateText(label).toLowerCase()}`);
    }
    if (trimmed.startsWith("请选择")) {
      const label = trimmed.slice(3);
      return value.replace(trimmed, `Select ${translateText(label).toLowerCase()}`);
    }
    const exactLong = {
      "完整承袭潘汝钧太易玄空学、命理、奇门、大六壬、姓名学核心体系，得其真传。": "Inherited the core systems of Pan Rujun's Taiyi Xuankong studies, destiny analysis, Qimen, Da Liu Ren and name studies.",
      "师承体系强调象、数、理、气并参，用于姓名、企业命名、风水布局与战略预测场景。": "The lineage emphasizes image, number, principle and qi, and is applied to personal names, business naming, Feng Shui layout and strategic prediction.",
      "擅长玄空风水布局、企业战略预测、八字命理、奇门运筹、大六壬决策、姓名学。": "Specializes in Xuankong Feng Shui layout, business strategy prediction, BaZi, Qimen planning, Da Liu Ren decision support and name studies.",
      "当代易医合参代表人物，太易玄空学重要传承者。": "A contemporary representative of combined I Ching and medical thinking and an important inheritor of Taiyi Xuankong studies.",
      "1518.com 的结果定位为传统文化、命名灵感和初步风险排查参考。系统会把姓名学、易经数理、五行、音形义、行业传播和注册预查拆成可解释维度，不输出不可验证的绝对结论。": "1518.com results are positioned as traditional culture reference, naming inspiration and preliminary risk screening. The system breaks name studies, I Ching numerology, Five Elements, sound-shape-meaning, industry messaging and registration prechecks into explainable dimensions, without making unverifiable absolute claims."
    };
    if (exactLong[trimmed]) return value.replace(trimmed, exactLong[trimmed]);
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
    root.querySelectorAll?.(".brand-tagline").forEach((node) => {
      if (currentLang === "zh") {
        node.innerHTML = ["专", "注", "精", "准", "测", "名"].map((char) => `<span>${char}</span>`).join("");
        return;
      }
      node.textContent = "I Ching · Decide Your Path";
    });

    root.querySelectorAll?.(".main-nav a").forEach((node) => {
      if (currentLang === "zh") return;
      const href = node.getAttribute("href") || "";
      if (href.endsWith("#name-test") || href === "#name-test") node.textContent = "Name";
      if (href.endsWith("#brand-test") || href === "#brand-test") node.textContent = "Brand";
      if (href.endsWith("#baby") || href === "#baby") node.textContent = "Personal";
      if (href.endsWith("#company") || href === "#company") node.textContent = "Company";
    });

    root.querySelectorAll?.(".mini-form button").forEach((node) => {
      if (currentLang === "zh") return;
      const tool = node.closest(".mini-form")?.dataset.tool || "";
      if (tool === "姓名测试") node.textContent = "Name";
      if (tool === "车牌测算") node.textContent = "Plate";
      if (tool === "测手机号" || tool === "手机号测算") node.textContent = "Phone";
      if (tool === "公司测名") node.textContent = "Company";
    });

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
    const route = window.location.pathname.endsWith("about.html") ? "about" : (window.location.hash.replace(/^#/, "") || "home");
    const meta = routeMeta[route] || routeMeta.home;
    const description = document.querySelector('meta[name="description"]');
    if (currentLang === "zh") {
      document.documentElement.lang = "zh-CN";
      document.body.classList.remove("lang-en");
      document.title = meta[1];
      if (description) description.content = "1518 起名网是长期运营20年的中文起名测名工具站，由《易经》专家孔力担任产品顾问，提供姓名测试、公司名测试、个人起名、公司起名、品牌起名、周公解梦、生肖星座、号码测算等传统文化参考服务。";
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

  function updateNavigationMode() {
    document.querySelectorAll(".main-nav").forEach((nav) => {
      const isEnglishNav = nav.classList.contains("main-nav-en");
      if (currentLang === "en") {
        nav.style.display = isEnglishNav ? "flex" : "none";
      } else {
        nav.style.display = isEnglishNav ? "none" : "";
      }
    });
  }

  function updateDateInputs() {
    document.querySelectorAll('input[name="birthDate"], input[type="date"]').forEach((input) => {
      if (!input.dataset.originalType) input.dataset.originalType = input.getAttribute("type") || "text";
      if (currentLang === "en") {
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "YYYY-MM-DD");
        input.setAttribute("inputmode", "numeric");
      } else {
        input.setAttribute("type", input.dataset.originalType);
        input.removeAttribute("placeholder");
        input.removeAttribute("inputmode");
      }
    });
  }

  function applyLanguage(lang) {
    currentLang = SUPPORTED.has(lang) ? lang : "zh";
    applying = true;
    updateMeta();
    translateNode(document.body);
    updateNavigationMode();
    updateDateInputs();
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
