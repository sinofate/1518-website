(function () {
const INDUSTRIES = {
  ai: {
    name: "AI / 科技互联网",
    element: "火",
    best: [1, 13, 21, 23, 33, 45, 52],
    avoid: [4, 9, 10, 22, 44, 59],
    advice: "适合强调技术突破、产品迭代、融资速度与平台化增长。名字宜有开创感、智能感和扩张感。"
  },
  finance: {
    name: "金融投资 / 财税资管",
    element: "金",
    best: [8, 16, 29, 32, 41, 48],
    avoid: [19, 20, 43, 50],
    advice: "最重要的是信任、风控、资金安全和长期复利。名字宜稳、准、厚，不宜过度激进。"
  },
  realestate: {
    name: "地产建筑 / 工程实业",
    element: "土",
    best: [7, 16, 24, 37, 63],
    avoid: [28, 34, 56, 66],
    advice: "重在项目交付、资源整合、政府合作和资产沉淀。名字宜厚重、有承载力。"
  },
  media: {
    name: "电商直播 / 传媒新媒体",
    element: "火",
    best: [13, 23, 32, 47, 67],
    avoid: [14, 36, 42, 60],
    advice: "传播效率、爆款能力和流量转化是核心。名字宜短、亮、有记忆点。"
  },
  consumer: {
    name: "餐饮实体 / 民生消费",
    element: "土",
    best: [5, 6, 15, 24, 35],
    avoid: [2, 12, 53],
    advice: "看重客流、复购、口碑和现金流。名字宜亲近、顺口、让人愿意重复消费。"
  },
  health: {
    name: "教育培训 / 康养健康",
    element: "木",
    best: [15, 31, 41, 57],
    avoid: [22, 44, 74],
    advice: "信任、耐心、长期陪伴和口碑积累很关键。名字宜温润、专业、有守护感。"
  },
  crossborder: {
    name: "外贸出海 / 跨境商贸",
    element: "金",
    best: [17, 29, 45, 68],
    avoid: [20, 26, 50],
    advice: "需要开拓新市场、跨文化表达与周期判断。名字宜国际化、利落、有行动力。"
  },
  chain: {
    name: "连锁加盟 / 品牌总部",
    element: "木",
    best: [3, 23, 32, 63, 81],
    avoid: [27, 40, 76],
    advice: "核心是复制、招商、培训和多点运营。名字宜标准化、强识别、容易被加盟商记住。"
  },
  consulting: {
    name: "律所咨询 / 高端商务",
    element: "金",
    best: [18, 25, 48, 61],
    avoid: [12, 46, 70],
    advice: "专业背书、智力价值和高端客户信任是核心。名字宜克制、清晰、显得可靠。"
  },
  legacy: {
    name: "家族企业 / 传承老店",
    element: "土",
    best: [15, 41, 65, 81],
    avoid: [22, 34, 62],
    advice: "看重长期稳定、代际传承、资产守成与品牌信用。名字宜端正、耐看、有时间感。"
  }
};

const LEVELS = {
  top: { label: "顶级大吉", stars: "★★★★★", score: 96, className: "good" },
  great: { label: "大吉", stars: "★★★★", score: 88, className: "good" },
  good: { label: "吉", stars: "★★★", score: 78, className: "mid" },
  halfGood: { label: "半吉", stars: "★★★", score: 68, className: "mid" },
  flat: { label: "平吉", stars: "★★", score: 60, className: "mid" },
  halfBad: { label: "半凶", stars: "★★", score: 48, className: "bad" },
  bad: { label: "凶", stars: "★", score: 36, className: "bad" },
  fatal: { label: "大凶", stars: "✖", score: 18, className: "bad" }
};

const NUMEROLOGY = {
  1:["太极启元","top","开局鼎盛，基业始发，适合新品牌、新项目抢占市场先机，尤其利于科技、创投、文创和新兴赛道。","稳步布局，不宜一开始就过度铺摊子。"],
  2:["两仪未开","bad","气场偏弱，格局分散，客源不稳，合作易生分歧，项目推进常有阻滞。","长期实体公司慎用，需强化主业与现金流纪律。"],
  3:["三才和合","great","三才聚势，人脉通达，上下游合作顺畅，团队凝聚力强，适合复制扩张。","适合连锁、商贸、供应链与服务行业。"],
  4:["四象破败","fatal","运营阻碍重重，客源流失、投资亏损、内部纷争风险较高，商业竞争力偏弱。","盈利企业不建议使用，已有品牌宜考虑升级。"],
  5:["五行俱权","great","五行周全，生意圆融，抗风险能力强，跨界经营较顺，客户关系稳定。","适合多元实业、餐饮、民生消费与综合商贸。"],
  6:["六六大顺","great","营商和顺，客流旺盛，口碑传播力强，财务收支平稳，稳中增收。","适合实体店、商超、美业和生活服务。"],
  7:["七政之数","good","行事果决，执行力强，擅长攻坚破局，在同业竞争中容易打出差异。","团队管理要柔一点，避免强执行变成内耗。"],
  8:["八卦稳财","good","财运稳健，步步递增，理财与风控意识较强，适合长期积累。","适合金融咨询、资管、仓储物流等稳健行业。"],
  9:["破舟进海","fatal","走势起伏极端，投资踩雷和重大决策失误概率偏高，营商风险很重。","企业字号应尽量避开。"],
  10:["乌云蔽月","fatal","事业容易停滞衰败，客源流失、合作终止、渠道断裂，延续力不足。","新公司和核心品牌禁用。"],
  11:["早苗逢雨","great","枯木逢春，逆风翻盘，适合转型、重整和老牌企业焕新。","遇到行业变化时反而容易抓住第二曲线。"],
  12:["掘井无泉","fatal","拓客艰难，渠道闭塞，投入大回报小，商业模式较难跑通。","创业初创公司不建议使用。"],
  13:["春日牡丹","great","商业智谋与创意策划能力强，易打造爆款、网红品牌和高传播产品。","需补强供应链、交付和利润模型。"],
  14:["浮沉不定","fatal","市场沉浮不定，品牌热度难持久，合作伙伴易背离，缺少长期根基。","不适合作为长期公司主体。"],
  15:["福寿圆满","great","商誉厚重，行业认可度高，客源稳固，适合长期稳健经营。","适合老字号、教育、健康和高端服务。"],
  16:["厚重载德","top","厚德聚财，贵人资源足，政企合作顺畅，具备集团化发展与大项目承接格局。","尤其适合地产建筑、集团公司、大宗贸易。"],
  17:["刚健开拓","good","强势突破，敢于开拓异地与海外市场，自主创业容易打出一片天地。","适合外贸出海、区域代理和渠道开拓。"],
  18:["铁镜重磨","good","复盘修正能力强，破旧立新，商业模式越磨越专业，盈利稳步提升。","适合精密制造、技术优化与维保行业。"],
  19:["风波损耗","fatal","商业风波较多，同行打压、资金紧张、突发损耗风险偏高。","不建议用于核心字号。"],
  20:["虚实难守","fatal","暗藏亏损隐患，账面看似平稳但隐性成本、隐藏负债较多。","尤其不利金融、贸易和重资产行业。"],
  21:["首领格局","top","具备行业领军气场，统筹管理能力强，适合总部、控股平台和头部品牌。","权责体系要清晰，避免权力过集中。"],
  22:["秋草逢霜","fatal","抱负难落地，项目蓝图宏大但市场认可度不足，投入产出失衡。","科创、教育和合伙公司尤其应避开。"],
  23:["升腾旺运","top","事业蒸蒸日上，品牌热度快速攀升，市场占有率持续上涨。","适合互联网平台、快消品和风口行业。"],
  24:["白手聚财","great","从零起家聚财能力强，低成本创业、细水长流、务实积累。","适合实体加工、日用品和轻资产创业。"],
  25:["资质稳进","good","经营思路清晰，稳中求进，依靠专业实力逐步占领市场。","适合律所、财税、技术咨询和专业服务。"],
  26:["大起大落","bad","格局波动大，兴盛时声势强，低谷时滑落快，稳定性不足。","短线项目可观察，平稳企业慎用。"],
  27:["贪多失焦","bad","野心过重，容易盲目扩张和跨界，副业拖累主业。","专注型企业不宜使用。"],
  28:["阔水浮萍","fatal","根基漂浮，合作多变，投资多波折，资金链承压。","所有长期经营主体应避开。"],
  29:["深谋周期","good","商业谋略深远，预判市场风向较准，资本运作灵活，适合把握周期红利。","要有强风控，避免聪明反被周期吞噬。"],
  30:["成败无常","halfBad","经营状态不稳定，顺境盈利、逆境亏损，难形成长期稳定模式。","保守型企业慎用。"],
  31:["内外同心","great","商运和顺，内外同心，品牌口碑佳，合作长久稳固。","适合文旅、康养、母婴和民生产业。"],
  32:["宝马金鞍","top","贵人招财，融资顺利，投资人与合作资源容易靠近，借力发展效率高。","适合科创公司、加盟总部和平台型企业。"],
  33:["旭日东升","top","声势鼎盛，名扬四方，品牌影响力强，具备全国布局和上市格局。","扩张很强，也要同步建设治理与合规。"],
  34:["破损危局","fatal","重大投资失利、内部矛盾和根基受损风险高，容易出现经营危机。","严禁企业核心主体使用。"],
  35:["温和平顺","good","经营温和，适合精细化运营，服务体验佳，客源稳定。","适合美容养生、烘焙花艺和私域服务。"],
  36:["劳而少获","fatal","行业风浪不断，经营劳心费力，辛苦投入难获得对等收益。","不适合长期扩张型企业。"],
  37:["威信自立","great","商业威信足，行业话语权强，合作方信服，适合自立门户。","适合实业工厂、自主品牌和区域龙头。"],
  38:["专精立业","halfGood","依靠技术、手艺和专业服务立足，适合专精路线，规模化较慢。","小众高专业行业可用。"],
  39:["财势雄厚","good","商业体量大，多领域布局能力强，但运势伴随起伏。","适合大型集团，需懂得风控守成。"],
  40:["守成慎攻","fatal","宜守不宜攻，盲目扩张容易招损，市场布局易失误。","扩张型企业禁用。"],
  41:["圆满德福","top","客源、财源、人脉三者齐全，长久经营基业稳固，属于全行业稳妥吉数。","适合希望长期做品牌的主体。"],
  42:["动力不足","fatal","进取心弱，模式老旧僵化，难以顺应市场变化。","容易被行业淘汰，禁用。"],
  43:["来去难守","fatal","守财艰难，盈利留不住资产，开支损耗较大。","现金流行业尤其不宜。"],
  44:["烦闷郁结","fatal","内外皆阻，项目停滞、客源断绝、纠纷频发，是企业命名第一避凶数。","所有商业主体绝对禁用。"],
  45:["顺势乘风","great","踩中行业风口快速崛起，转型顺利，新旧业务衔接平稳。","适合风口赛道、跨境新业态和转型企业。"],
  46:["华而不实","fatal","外表光鲜但内里虚空，项目易有陷阱，投资入局被套风险高。","禁用。"],
  47:["点势成金","great","资源变现能力强，渠道转化高效，盈利逻辑简单顺畅。","适合流量变现、资源对接、中介平台。"],
  48:["智业富贵","great","依靠智慧、谋略和专业学识立业，高端商务合作顺畅。","适合智库咨询、商学院、知识产权。"],
  49:["机会风险","halfBad","吉凶对半，行情好则大发，行情差则大亏，依赖外部环境。","周期行业慎用，稳定实体不用。"],
  50:["漂浮不定","fatal","主业时常变动，产业难扎根，经营缺少长期固定赛道。","禁用。"],
  51:["一盛一衰","halfBad","阶段性红火后容易回落，难维持长期高营收。","网红短期业态慎用。"],
  52:["远见投资","top","眼光长远，能提前布局未来赛道，适合科技前瞻和产业投资。","需要耐心资本与长期主义。"],
  53:["虚旺不实","fatal","外表繁华内里空虚，营收好看但利润薄，泡沫感较重。","禁用。"],
  54:["逆境重重","fatal","行业打压、政策限制、市场排挤接连不断，发展吃力。","禁用。"],
  55:["顺逆交织","halfGood","顺境可稳步发展，逆境容易陷入困局，需保守谨慎。","小微企业可谨慎使用。"],
  56:["行路多阻","fatal","签约、物流、渠道、交易多波折，营商不顺。","贸易物流企业禁用。"],
  57:["抗周期强","great","历经寒冬仍能坚挺，越经历市场洗牌越稳固。","适合传统硬核实业和耐周期产业。"],
  58:["先难后稳","halfGood","前期劳碌波折，中后期商运逐步走高，盈利趋稳。","长期深耕实业可用。"],
  59:["进退两难","fatal","转型无路、坚守无力，卡在行业夹层，上下无空间。","禁用。"],
  60:["定位迷茫","fatal","赛道选择失误，经营方向混乱，整体布局缺少章法。","禁用。"],
  61:["名利双收","great","行业名望与实际收益同步提升，口碑和营收齐升。","适合品牌实体与区域龙头。"],
  62:["根基衰弱","fatal","原有优势逐步消退，市场份额持续缩减，事业走下坡。","禁用。"],
  63:["版图扩张","great","产业兴旺，多点布局顺利，商业版图持续扩张。","适合全国招商、加盟连锁。"],
  64:["人脉离散","fatal","合作伙伴分道扬镳，团队人心涣散，难以凝聚合力。","禁用。"],
  65:["安稳传承","great","营商安稳长久，资产稳固，适合世代传承经营。","适合家族企业、长久老店。"],
  66:["内外失和","fatal","股东分歧、管理矛盾频发，合伙与股份结构容易受制。","合伙公司禁用。"],
  67:["商路通达","great","客源自来、合作自来、贵人自来，财路较通。","适合渠道招商、引流型企业。"],
  68:["白手兴家","great","资源整合能力强，从零做起条理清晰，创业成功率较高。","适合草根创业和轻资产实体。"],
  69:["焦虑内耗","fatal","经营常年焦虑内耗，决策摇摆，容易错失机会。","禁用。"],
  70:["红利耗尽","fatal","原有红利耗尽，无新增长点补充，事业日渐消沉。","禁用。"],
  71:["劳碌成事","halfGood","能成事但劳碌重，靠辛苦换收益，少有轻松求财机会。","体力密集型行业慎用。"],
  72:["劳而少获","fatal","付出与收益不对等，营商性价比低。","禁用。"],
  73:["志大力弱","halfGood","志向远大但落地不足，守成尚可，扩张力度不足。","守业可用，创业扩张不用。"],
  74:["长期劣势","fatal","竞争被动，难抢主流市场，发展长期失意。","禁用。"],
  75:["只宜守成","halfGood","守业安稳，向外扩张容易招损。","老店守成可用。"],
  76:["离散衰败","fatal","分支门店易拆分倒闭，资产分散流失，难抱团做大。","连锁分公司禁用。"],
  77:["后劲不足","halfGood","前期尚可，中后期走平下滑，缺少长期增长力。","长期规划企业慎用。"],
  78:["先劳后安","halfGood","前期劳碌，熬过创业期后趋于平稳，安稳有余、宏图不足。","小型实体店可用。"],
  79:["才华受限","fatal","优质项目难落地，市场处处受限，才华被埋没。","科创创意企业禁用。"],
  80:["收官落幕","fatal","事业有收尾转型之势，缺少新活力，不适合全新创业。","新公司严禁使用。"],
  81:["归元圆满","top","九九归元，气运圆满，历经周期仍能屹立，属于终极圆满商业吉数。","适合集团总部、百年企业、旗舰品牌。"]
};

const COMMON_STROKES = {
  北:5, 京:8, 上:3, 海:11, 深:12, 圳:6, 广:15, 州:6, 香:9, 港:13, 中:4, 国:11, 華:14, 华:14,
  有:6, 限:14, 公:4, 司:5, 股:10, 份:6, 集:12, 團:14, 团:14, 控:12, 科:9, 技:8, 智:12, 能:12,
  信:9, 息:10, 網:14, 网:14, 絡:12, 络:12, 互:4, 聯:17, 联:17, 雲:12, 云:12, 數:15, 数:15,
  據:17, 据:17, 算:14, 法:9, 星:9, 辰:7, 未:5, 來:8, 来:8, 元:4, 宇:6, 宙:8, 光:6, 明:8,
  金:8, 融:16, 投:7, 資:13, 资:13, 產:11, 产:11, 管:14, 理:12, 財:10, 财:10, 稅:12, 税:12,
  建:9, 築:16, 筑:16, 工:3, 程:12, 實:14, 实:14, 業:13, 业:13, 地:6, 置:13, 貿:12, 贸:12,
  易:8, 跨:13, 境:14, 傳:13, 传:13, 媒:12, 文:4, 化:4, 餐:16, 飲:13, 饮:13, 品:9, 牌:12,
  教:11, 育:10, 健:11, 康:11, 醫:18, 医:18, 咨:9, 詢:13, 询:13, 律:9, 務:11, 务:11,
  服:8, 零:13, 售:11, 美:9, 家:10, 族:11, 老:6, 店:8, 新:13, 創:12, 创:12, 達:16, 达:16,
  盛:12, 安:6, 瑞:14, 泰:9, 龍:16, 龙:16, 祥:11, 仁:4, 和:8, 盈:9, 合:6, 億:15, 亿:15,
  佳:8, 優:17, 优:17, 麥:11, 麦:11, 田:5, 森:12, 林:8, 源:14, 泉:9, 山:3, 水:4, 火:4,
  木:4, 土:3, 大:3, 小:3, 天:4, 人:2, 一:1, 二:2, 三:3, 四:4, 五:5, 六:6, 七:7, 八:8, 九:9
};

const state = { strokes: new Map() };

const $ = (id) => document.getElementById(id);

function normalizeNumber(total) {
  if (total <= 0) return 1;
  const mod = total % 81;
  return mod === 0 ? 81 : mod;
}

function fallbackStroke(char) {
  if (COMMON_STROKES[char]) return COMMON_STROKES[char];
  const code = char.codePointAt(0);
  if (code >= 0x4e00 && code <= 0x9fff) return 10;
  return 0;
}

function cleanName(value) {
  return Array.from(value.trim()).filter((char) => /[\u3400-\u9fff]/.test(char));
}

function getStroke(char) {
  return state.strokes.get(char) ?? fallbackStroke(char);
}

function calc(chars) {
  const total = chars.reduce((sum, char) => sum + getStroke(char), 0);
  return { total, number: normalizeNumber(total) };
}

function renderStrokeEditor() {
  const chars = [...new Set([...cleanName($("companyName").value), ...cleanName($("shortName").value)])];
  chars.forEach((char) => {
    if (!state.strokes.has(char)) state.strokes.set(char, fallbackStroke(char));
  });
  $("strokeEditor").innerHTML = chars.map((char) => `
    <label class="stroke-item">
      <b>${char}</b>
      <input type="number" min="1" max="40" value="${getStroke(char)}" data-char="${char}" aria-label="${char} 康熙笔画">
    </label>
  `).join("");
}

function levelOf(number) {
  const row = NUMEROLOGY[number];
  return LEVELS[row[1]];
}

function industryFit(number, industry) {
  if (industry.best.includes(number)) return { label: "高度契合", tone: "good", text: `该数理正好位于 ${industry.name} 的优先吉数池，容易把行业优势转化为品牌势能。` };
  if (industry.avoid.includes(number)) return { label: "明显冲突", tone: "bad", text: `该数理属于 ${industry.name} 的重点避坑数，长期使用会放大赛道短板。` };
  const level = levelOf(number);
  if (level.className === "good") return { label: "基本可用", tone: "mid", text: "数理本身偏吉，但不是本行业的最优解，可通过商号、子品牌或传播口径补强。" };
  return { label: "需要谨慎", tone: "bad", text: "数理与行业没有形成明显加分，若用于核心主体，建议再做候选名对比。" };
}

function structureFit(companyName, shortName, industry) {
  const length = cleanName(shortName).length;
  const lengthScore = length >= 2 && length <= 4 ? 92 : length === 5 ? 82 : 64;
  const restricted = /(中国|中华|国家|全国|国际|集团|银行|证券|保险|大学|医院|协会|中心)/u.test(companyName);
  const industryWords = {
    ai: /智|云|数|元|星|启|达/u,
    finance: /信|金|衡|瑞|恒|稳|策/u,
    realestate: /城|安|筑|坤|泰|合|承/u,
    media: /星|云|火|声|影|播|达/u,
    consumer: /禾|味|安|悦|合|鲜|暖/u,
    health: /知|书|森|清|安|仁|和/u,
    crossborder: /远|达|通|海|辰|航|瑞/u,
    chain: /合|联|达|元|盛|瑞|众/u,
    consulting: /策|知|衡|明|和|信|达/u,
    legacy: /安|泰|和|承|德|恒|瑞/u
  };
  const elementScore = industryWords[$("industry").value]?.test(shortName) ? 92 : 76;
  return {
    lengthScore,
    elementScore,
    riskPenalty: restricted ? 14 : 0,
    riskText: restricted ? "含需资质或人工复核词" : "未见明显禁限词"
  };
}

function diagnose() {
  const industry = INDUSTRIES[$("industry").value];
  const companyName = $("companyName").value.trim();
  const shortName = $("shortName").value.trim() || companyName;
  const fullChars = cleanName($("companyName").value);
  const shortChars = cleanName($("shortName").value || $("companyName").value);
  const full = calc(fullChars);
  const short = calc(shortChars);
  const fullRow = NUMEROLOGY[full.number];
  const shortRow = NUMEROLOGY[short.number];
  const fullLevel = levelOf(full.number);
  const shortLevel = levelOf(short.number);
  const fit = industryFit(full.number, industry);
  const structure = structureFit(companyName, shortName, industry);
  const totalScore = Math.max(8, Math.min(100, Math.round(fullLevel.score * .42 + shortLevel.score * .24 + (fit.tone === "good" ? 14 : fit.tone === "mid" ? 8 : 0) + structure.lengthScore * .10 + structure.elementScore * .10 - structure.riskPenalty)));
  const candidateText = industry.best.map((n) => `${n}数`).join("、");
  const today = new Date().toLocaleDateString("zh-CN");
  const strokeRows = fullChars.map((char) => `<tr><td>${char}</td><td>${getStroke(char)}</td><td>${shortChars.includes(char) ? "商号/全称" : "全称"}</td></tr>`).join("");

  $("report").innerHTML = `
    <article class="report-page company-pdf-report">
      <section class="report-cover report-pdf-page company-pdf-page">
        <div>
          <p class="report-logo">1518</p>
          <h2>公司名综合分析报告</h2>
          <p>公司全称: ${companyName} | 商号简称: ${shortName} | 所属行业: ${industry.name}</p>
          <p>综合评分: ${totalScore}分 (${fullLevel.label}) | 报告生成日期: ${today}</p>
        </div>
        <div class="name-hero company-name-hero">
          <div class="name-large">${shortName}</div>
          <div class="pinyin">business name analysis</div>
          <div class="score-ring"><strong>${totalScore}</strong><span>综合评分</span><em>${fullLevel.label}</em></div>
        </div>
        <div class="score-grid">
          <div class="report-score-card"><span>全称总格 (35%)</span><strong>${full.number}</strong><em>${fullLevel.label}</em></div>
          <div class="report-score-card"><span>商号简称格 (25%)</span><strong>${short.number}</strong><em>${shortLevel.label}</em></div>
          <div class="report-score-card"><span>行业适配 (20%)</span><strong>${fit.label}</strong><em>${industry.element}行</em></div>
          <div class="report-score-card"><span>传播识别 (10%)</span><strong>${structure.lengthScore}</strong><em>商号长度</em></div>
          <div class="report-score-card"><span>扩张稳定 (5%)</span><strong>${fullLevel.score}</strong><em>${fullLevel.stars}</em></div>
          <div class="report-score-card"><span>风险提示 (5%)</span><strong>${structure.riskPenalty ? "需复核" : "可控"}</strong><em>${structure.riskText}</em></div>
        </div>
        <footer class="report-page-footer">1518-公司名分析报告 - ${shortName} · 1/5</footer>
      </section>

      <section class="report-section report-pdf-page company-pdf-page">
        <h3>易经数理诊断 <span>${full.number}数 · ${fullRow[0]} · ${fullLevel.label}</span></h3>
        <div class="name-hero company-number-hero">
          <div class="name-large">${full.number}<span>数</span></div>
          <div class="pinyin">${fullRow[0]} · ${fullLevel.label}</div>
          <div class="score-ring"><strong>${fullLevel.score}</strong><span>数理评分</span><em>${fullLevel.stars}</em></div>
        </div>
        <div class="score-grid company-number-score-grid">
          <div class="report-score-card"><span>全称总格</span><strong>${full.number}</strong><em>${full.total}画 · ${fullLevel.label}</em></div>
          <div class="report-score-card"><span>商号简称格</span><strong>${short.number}</strong><em>${short.total}画 · ${shortLevel.label}</em></div>
          <div class="report-score-card"><span>企业气质</span><strong>${fullRow[0]}</strong><em>${fullLevel.stars}</em></div>
          <div class="report-score-card"><span>传播稳定</span><strong>${shortLevel.score}</strong><em>${shortRow[0]}</em></div>
        </div>
        <h4 class="report-subtitle">总格解释</h4>
        <div class="report-subblock"><h4>${full.number}数 · ${fullRow[0]}</h4><p>${fullRow[2]}</p><p><b>建议：</b>${fullRow[3]}</p></div>
        <h4 class="report-subtitle">商号传播</h4>
        <table class="report-table">
          <thead><tr><th>项目</th><th>笔画</th><th>换算数理</th><th>等级</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td>公司全称</td><td>${full.total}画</td><td>${full.number}数</td><td>${fullLevel.label}</td><td>${fullRow[0]}：观察企业长期经营与主体气场。</td></tr>
            <tr><td>商号简称</td><td>${short.total}画</td><td>${short.number}数</td><td>${shortLevel.label}</td><td>${shortRow[0]}：观察客户记忆、口碑传播与市场识别。</td></tr>
          </tbody>
        </table>
        <p>${short.number}数代表日常品牌传播气质：${shortRow[2]} 若简称比全称更常被客户记住，应优先保证简称数理不拖后腿。</p>
        <footer class="report-page-footer">1518-公司名分析报告 - ${shortName} · 2/5</footer>
      </section>

      <section class="report-section report-pdf-page company-pdf-page">
        <h3>行业适配分析 <span>${industry.name}</span></h3>
        <div class="company-industry-panel">
          <strong>${industry.element}行 · ${fit.label}</strong>
          <p>${fit.text}</p>
          <p>${industry.advice}</p>
        </div>
        <h4 class="report-subtitle">行业优先吉数</h4>
        <div class="company-number-tags">${industry.best.map((n) => `<span>${n}数</span>`).join("")}</div>
        <h4 class="report-subtitle">行业避坑数</h4>
        <div class="company-number-tags danger">${industry.avoid.map((n) => `<span>${n}数</span>`).join("")}</div>
        <p>行业适配不是单看吉凶，而是看数理气质能否服务商业模式。科技类重增长和迭代，金融类重信任和风控，实体消费重口碑与现金流。</p>
        <footer class="report-page-footer">1518-公司名分析报告 - ${shortName} · 3/5</footer>
      </section>

      <section class="report-section report-pdf-page company-pdf-page">
        <h3>笔画校正与结构分析</h3>
        <h4 class="report-subtitle">公司全称笔画拆解</h4>
        <table class="report-table"><thead><tr><th>字</th><th>康熙笔画</th><th>归属</th></tr></thead><tbody>${strokeRows}</tbody></table>
        <h4 class="report-subtitle">结构判断</h4>
        <div class="company-detail-grid">
          <div class="company-detail"><span>地域/前缀</span><p>${companyName.slice(0, 2)} 可作为地域或品牌前置识别。</p></div>
          <div class="company-detail"><span>商号主体</span><p>${shortName} 是客户最常记住的部分，应重点优化读音、含义和数理。</p></div>
          <div class="company-detail"><span>行业字根</span><p>当前商号行业元素匹配 ${structure.elementScore} 分，用于判断名字是否贴合赛道气质。</p></div>
          <div class="company-detail"><span>组织后缀</span><p>有限公司、集团、科技等后缀影响总格，但传播中弱于商号。</p></div>
        </div>
        <footer class="report-page-footer">1518-公司名分析报告 - ${shortName} · 4/5</footer>
      </section>

      <section class="report-section report-pdf-page company-pdf-page">
        <h3>命名建议与风险提示</h3>
        <div class="company-suggestions">
          <h4>命名建议</h4>
          <ul>
            <li>若计划长期做品牌、融资或扩规模，建议把全称总格优先调向：${candidateText}。</li>
            <li>商号简称最好至少保持“大吉/吉”，因为它直接影响客户记忆、招商引流和市场传播。</li>
            <li>数理只作为传统文化与品牌语言参考，不替代真实的行业趋势、商业模式、财务风控与团队管理。</li>
          </ul>
        </div>
        <h4 class="report-subtitle">下一步优化方向</h4>
        <ul>
          <li>保留行业识别强、读音顺、客户容易复述的商号。</li>
          <li>若总格或简称格落入避坑数，优先调整商号字数或替换一个核心字。</li>
          <li>正式注册前，还需要检查工商重名、商标近似、域名可用性和品牌传播风险。</li>
        </ul>
        <p>本报告由 1518.com 公司名分析系统自动生成。分析结果仅供参考，不构成商业、法律或财务建议。</p>
        <p class="report-id">报告编号：COM-${Date.now().toString().slice(-8)}-${full.number}-${short.number}</p>
        <footer class="report-page-footer">版权所有 © 2026 1518.com · 5/5</footer>
      </section>
    </article>
  `;
}

function boot() {
  renderStrokeEditor();
  diagnose();
  $("tester").addEventListener("submit", (event) => {
    event.preventDefault();
    document.body.classList.add("company-report-active");
    renderStrokeEditor();
    diagnose();
    $("report").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  ["companyName", "shortName", "industry"].forEach((id) => {
    $(id).addEventListener("input", () => {
      renderStrokeEditor();
      diagnose();
    });
  });
  $("strokeEditor").addEventListener("input", (event) => {
    const input = event.target.closest("input[data-char]");
    if (!input) return;
    state.strokes.set(input.dataset.char, Math.max(1, Number(input.value) || 1));
    diagnose();
  });
}

window.NameSharedData = {
  NUMEROLOGY,
  LEVELS,
  COMMON_STROKES
};

boot();

})();
