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
  top: { label: "大吉", stars: "★★★★★", score: 96, className: "good" },
  great: { label: "大吉", stars: "★★★★", score: 88, className: "good" },
  good: { label: "吉", stars: "★★★", score: 78, className: "mid" },
  halfGood: { label: "半吉半凶", stars: "★★★", score: 68, className: "mid" },
  flat: { label: "中吉", stars: "★★", score: 66, className: "mid" },
  halfBad: { label: "半凶半吉", stars: "★★", score: 52, className: "bad" },
  bad: { label: "凶", stars: "★", score: 36, className: "bad" },
  fatal: { label: "大凶", stars: "✖", score: 18, className: "bad" }
};

const NUMEROLOGY = {
  1:["太极开泰","top","太极初分，万象开端，主根基清明、起势有力；用于姓名，见开创心与主见，用于品牌，见先发气象。","宜把优势落到一件主事上，先立根基，再求扩展，开局之吉便能转为长久之稳。"],
  2:["混沌未定","fatal","此数气机未定，容易一边想聚、一边又散；并非无路，只是早期更怕目标分散、人事不齐。","宜用更明确的字义、稳定的节奏和外部制度来聚气；若可调整名字，优先补入明朗、端正、能定方向的字。"],
  3:["进取繁荣","top","生发之象明朗，进取心足，遇事多能借势而上；人名见才气与表达，商名见人气与增长。","宜保持谦和与节制，越是顺势，越要把承诺、交付和复盘做好，使繁荣有根。"],
  4:["四象休止","fatal","此数提示停滞与折损之象，常见想法多而承接弱，推进中容易遇到反复。","宜以减法破局：少开支线、少换方向，多借贵人、规则和长期计划补其不足；若可改名，建议调整一字或字数。"],
  5:["福禄成门","top","五行得中，气象宽厚，主承载、信用与福泽；用于姓名多见稳健，用于公司多见包容与长久。","宜守正而行，避免贪多求快；把口碑、专业和持续积累放在前面，福气才不散。"],
  6:["安稳余庆","top","余庆之数，主平顺、照拂与安定，人际多得助力，事务较容易形成秩序。","宜珍惜稳定局面，在平顺中继续提升能力与标准；不因顺而懈，便能久安。"],
  7:["刚毅果断","good","此数刚健，有决断、有锋芒，适合破题攻坚；但刚气太盛时，也容易显得急。","宜以柔济刚，多听不同意见，把锋芒用于解决问题，而不是消耗关系。"],
  8:["勤勉发展","good","意志坚实，重执行、重积累，适合靠专业和耐力一步步向前。","宜慢火细养，少求一夜成名；以稳定节奏积累信用，后劲会更清楚。"],
  9:["兴尽凶始","bad","此数有盛极转折之象，常提示情绪、资源或节奏容易过度消耗。","宜提前设边界、留余量，不把全部希望压在单点上；若用于核心姓名或商号，可通过补字、别名或品牌副名缓和。"],
  10:["终局损耗","bad","此数像一轮事到尽头，提示延续力不足，容易有开始热、后续弱的情况。","宜重建长期路径，先保基本盘，再谈突破；名称可补入生发、承载、光明之意来续气。"],
  11:["早苗逢雨","top","枯苗得雨，主稳中复兴，遇阻之后反能得助，属于温润而有生机的吉象。","宜顺势生长，不急于证明；把基础打厚，贵人与机会自然更容易靠近。"],
  12:["掘井无泉","bad","此数提示心力易散，计划看似深远，却可能暂时未见水源。","宜先缩小目标，找到可验证的小成果；名字上可补清朗、专注、持久之意。"],
  13:["智略多才","top","才智开明，灵感与表达力较强，适合创意、策划、传播与学习。","宜把聪明落为作品和流程，避免只停在想法；才华有承载，吉象更显。"],
  14:["天涯失意","bad","此数有漂泊与烦闷之象，容易外界牵动多、内心安定少。","宜先安身心，再定方向；用稳定关系、规律作息和清晰计划来补，不必把一时不顺看成定局。"],
  15:["福寿兴家","top","福寿双全之象，主厚道、安定、立身兴家，适合长期经营。","宜以德立名，以信养名；稳稳做深，比急着放大更能见福。"],
  16:["贵人兴业","top","贵人相助，能聚资源、得信任，适合承接责任与开创事业。","宜把贵人缘转为真实能力和规则意识，越守信用，越能成局。"],
  17:["刚柔突破","great","突破万难之数，刚中有韧，遇压力反能磨出本领。","宜避免孤勇，多配合柔和表达与团队协同；刚柔并用，路会更宽。"],
  18:["有志竟成","great","志气坚实，越经打磨越见锋芒，适合靠技术、专业和毅力成事。","宜长期精进，少被短期评价扰动；一件事磨透，便能化阻为功。"],
  19:["机敏先声","flat","反应快、感知敏锐，能先一步看到变化；但心绪和节奏也容易被变化牵动。","宜用计划和复盘稳住敏感度，把快反应变成准判断，而不是焦虑。"],
  20:["深藏不露","flat","此数不重外显，像水在深处，才力有时不易马上被看见。","宜降低虚耗，强化作品、证据和口碑；让实力被看见，便能转暗为明。"],
  21:["明月权威","top","明月中天，主独立、权威与担当，有掌局和立名之象。","宜权责分明，刚正中带温度；能容人，权威便不孤。"],
  22:["秋草逢霜","halfGood","此数有秋霜之象，才华和愿望不弱，但早期容易遇冷、遇慢。","宜先养根，再求花开；通过学习、贵人、平台和稳定节奏，可把寒意转为韧性。"],
  23:["旭日东升","top","旭日东升，气势明亮，主上升、热度与突破，适合开局和扩张。","宜同步修内功，光芒越盛，越要有规则、耐心和善意来承接。"],
  24:["家门余庆","top","财库渐丰，主积累、安定与家业余庆，适合细水长流。","宜重视储蓄、口碑和长期关系；慢慢聚，反而最稳。"],
  25:["英俊刚毅","great","资性聪敏，刚毅中带机巧，适合靠才智和专业立身。","宜少一点固执，多一点圆融；才气若能听劝，发展更顺。"],
  26:["变怪豪侠","halfGood","气象多变，胆识强、起伏也强，容易有不按常规的经历。","宜先稳底盘，再谈冒险；把变化纳入计划，波动就能成为历练。"],
  27:["先苦后甜","halfBad","足智多谋，但早期多要经过辛苦和磨合，容易先难后成。","宜放慢扩张，先把一条路走通；苦处若能沉住气，后味会变甜。"],
  28:["阔水浮萍","bad","此数有漂浮离散之象，根基感较弱，容易关系、资源或方向不稳。","宜先定根据地、定核心人、定长期目标；名称可补土、木、安定之意来固本。"],
  29:["智谋难足","halfGood","智谋足，欲望也强，适合谋划大事，但容易因想得太多而不满足。","宜设止盈止损，给野心配纪律；能知足，智谋才不伤身。"],
  30:["绝处逢生","halfBad","一成一败之象，起落分明，低处也藏转机。","宜保留退路，分阶段推进；不怕慢，怕无准备，准备足则可逢生。"],
  31:["智勇得志","top","智勇兼备，心想事成之象，主做事有方向、有助力。","宜继续积德修身，把成功感转成长期责任；越稳越吉。"],
  32:["权贵惠泽","top","意外惠泽之数，主得人相助、资源临门，适合借力成事。","宜感恩而不依赖，借来的势要化成自己的能力。"],
  33:["才德开展","top","才德开展，声势隆昌，有开疆拓土、名声外扬之象。","宜在扩张中守住谦逊与合规，声势越大，根基越要厚。"],
  34:["破损危险","bad","此数提示破损与压力，容易在关键处遇到消耗、冲突或判断失准。","宜及时止损、重做结构，不硬扛；若可调整姓名或商号，建议优先避开此数。"],
  35:["温和平静","top","温和优雅，主稳定发展、修养与耐心，适合服务、教育、文化与长期陪伴。","宜把温和变成专业标准，不因安稳而降低追求。"],
  36:["风浪侠义","halfBad","风浪不息，重义气、敢承担，但容易劳心劳力。","宜先照顾自己，再照顾局面；边界清楚，侠义才不会变成负担。"],
  37:["权威显达","top","权威显达，主信服力、执行力与贵人照拂，适合自立成局。","宜刚正不刚愎，威信配合仁心，发展会更长。"],
  38:["磨铁成针","halfBad","刻意经营之数，才艺、技术、耐性可成，但进展常需时间。","宜走专精路线，不急于求大；一技深耕，也能磨铁成针。"],
  39:["荣华多变","halfGood","富贵荣华之象中带变化，格局大，但也要承受起伏。","宜以风控配机会，以长期心守住成果；大格局更要会收。"],
  40:["谨慎保安","halfGood","此数胆识与谨慎并存，能守，也想进，关键在分寸。","宜先保安定，再择机突破；每一步留余地，反而能走远。"],
  41:["德望如意","top","德高望重，事事如意之象，主名望、信任与长久助力。","宜以德养名，以专业护名；越真诚，越能聚众。"],
  42:["十艺不成","bad","才艺不少，但容易分心，样样触及、样样未深。","宜做减法，选一个主轴深耕；把杂才收束成专长，便有转机。"],
  43:["外祥内苦","halfBad","外表看似顺，内里可能有压力、损耗或散财之象。","宜重视现金流、情绪和真实负担；把漂亮门面变成扎实内功。"],
  44:["力量受限","bad","此数提示力量受限、伸展不易，常有想做而资源不足之感。","宜少硬拼，多借势；如果用于核心名号，建议通过改字、改简称或副品牌来调和。"],
  45:["顺风扬帆","top","顺风扬帆，万事泰和，主转机、新生与顺势推进。","宜趁势立规矩，把好运转成体系；有章法，风才不会散。"],
  46:["罗网系身","halfGood","此数有受牵制之象，容易被旧关系、旧结构或外部限制缠住。","宜清理负担、厘清合同与权责；轻装之后，反而容易成家立业。"],
  47:["点铁成金","top","开花结果，点铁成金，主转化力强，能把资源变成果实。","宜珍惜可变现的能力，也要守住品质；成果越多，越需节制。"],
  48:["德智兼备","top","青松方鹤，德智兼备，气质清贵，适合以专业和品格立名。","宜保持清醒、克制与审美，慢慢累积高信任关系。"],
  49:["吉凶难分","bad","此数变化多端，吉凶难分，常有辛劳不断之象。","宜减少赌性，凡事留证据、留预算、留退路；不确定处越要稳。"],
  50:["小舟入海","halfGood","小舟入海，吉凶参半，外界浪大时容易感到承载不足。","宜先强船体，再入大海；团队、资金、规则齐备后再扩张。"],
  51:["盛衰交加","halfGood","盛衰交加，努力可见成果，但成果也需要维护。","宜在高处想低处，在顺境做储备；能守，便不怕一时回落。"],
  52:["先见实现","good","先见之明，理想实现之象，适合规划、研究、投资和长线布局。","宜把远见拆成阶段行动，理想有路径，便能落地。"],
  53:["先苦后甜","halfGood","忧思较多，前路并非一帆风顺，但苦中有甜，后段可渐转。","宜把眼前压力拆小处理；先稳身心，再求成果，转机往往在坚持之后。"],
  54:["难望成功","bad","此数提示多难与阻力，努力容易被环境抵消，成事成本偏高。","宜换方法、换结构、换节奏，不把自己困在同一条难路里。"],
  55:["外祥内苦","bad","表面和顺，内里压力不轻，容易有别人看不见的辛苦。","宜真实盘点资源和情绪，不只顾体面；把隐忧说清，问题就有解法。"],
  56:["浪里行舟","bad","浪里行舟，四周障碍较多，事情推进常需绕行。","宜分段过关，先避大浪，再寻顺水；稳住一小段，就是改善。"],
  57:["寒雪青松","good","寒雪青松，越冷越见骨力，主耐力、名誉与后劲。","宜坚持正路，不因一时冷清而自疑；守得住，便显青松之姿。"],
  58:["晚行遇月","halfGood","先苦后甘，晚行遇月，前期辛苦，后期渐见宽和。","宜给自己时间，不急着否定；把经验沉淀下来，后运会更稳。"],
  59:["时运不济","bad","此数提示时机不顺，努力容易被大环境压住。","宜先等风、先蓄力，避免逆势硬冲；换时机、换赛道，也是解法。"],
  60:["黑暗无光","bad","争名夺利而光不足，容易陷入消耗和方向不明。","宜回到初心，减少虚名竞争；把目标改成可执行的小事，光会慢慢回来。"],
  61:["名利双收","good","修炼积德，名利双收之象，主长期努力有回响。","宜继续修德修业，不靠侥幸；名利相随时，更要守住本心。"],
  62:["基础虚弱","bad","基础虚弱，承载力不足，容易在关键处显出疲态。","宜先补基础：健康、技能、现金流、团队和规则，哪一项弱就先补哪一项。"],
  63:["身心安泰","top","富贵荣华，身心安泰，主安乐、丰足与顺遂。","宜以安泰之势做长期积累，少贪虚浮，福气更能留住。"],
  64:["骨肉分离","bad","此数有离散之象，关系、团队或资源容易各走各路。","宜主动修复关系、明确边界和共同目标；聚合力，就是最好的化解。"],
  65:["富贵长寿","top","光明正大，富贵长寿之象，主安定、开阔与久远。","宜走正道、重信用，越透明越长久，越厚道越有福。"],
  66:["内外不和","bad","内外不和，多欲失福，容易因分歧、欲望或管理不清而消耗。","宜先统一价值和规则，少一点贪多，多一点共识。"],
  67:["财路亨通","good","志气坚强，财路亨通，适合靠执行和信用打开局面。","宜守住诚信与节奏，不为短利损长名；路通之后仍要稳行。"],
  68:["兴家立业","good","宽容好运，兴家立业，主整合、包容与成事能力。","宜以宽厚聚人，以制度成事；好人缘配好规则，更能兴家立业。"],
  69:["坐立不安","bad","外界牵动多，心绪难安，容易焦虑、反复或被突发事打乱。","宜先安内心，再安外局；规律、储备和清晰边界，能把不安降下来。"],
  70:["家运衰退","bad","此数提示后劲不足，原有优势容易慢慢消退。","宜及时更新能力和资源，不恋旧红利；补新气，旧局也能再活。"],
  71:["劳而少实","halfGood","耗神而劳，付出不少，但成果感来得慢。","宜提高方法效率，不只靠苦撑；会借工具、借团队，劳苦可减半。"],
  72:["先甜后苦","bad","先甜后苦，初看顺利，后续可能出现成本与阻力。","宜在顺的时候就做储备，不等问题出现才补救；提前规划就是解法。"],
  73:["志高力微","halfGood","志向高远，但力量一时未足，容易心大而手中资源少。","宜把大愿拆成小步，先成一件，再成一片；力会在行动中长出来。"],
  74:["沉沦逆境","bad","此数有逆境沉滞之象，外部阻力较重。","宜不恋低谷，主动换环境、换方法、换伙伴；路不通时，转弯也是进。"],
  75:["守者可安","halfGood","守成可安，发迹较迟，适合稳守，不宜急攻。","宜把慢当优势，先守住质量和生活秩序；迟来的成就也很扎实。"],
  76:["倾覆离散","bad","倾覆离散，虽劳无功之象，提示结构不稳、合力不足。","宜先修结构，再谈扩大；人、财、责归位后，损耗会明显下降。"],
  77:["半吉半凶","halfGood","家中有悦，吉凶参半，顺处有温情，难处也需经营。","宜珍惜已有关系和小成就，同时补短板；好处守住，难处慢慢化开。"],
  78:["晚境荣光","halfGood","前路较劳，后段仍有功德与光彩，只是来得不快。","宜不急于求成，把经验、名誉和作品慢慢留下，后劲会显。"],
  79:["挽回乏力","bad","此数提示身心易疲，挽回成本高，常有力不从心之感。","宜及时休整，不把疲惫当失败；先恢复力量，再重新选择。"],
  80:["清本缩小","bad","凶星入度，宜清本缩小，提示需要收束、整理和止损。","宜做减法，砍掉无效消耗；缩小不是退败，是为下一轮留元气。"],
  81:["万物回春","top","万物回春，还原复始，主圆满之后再生新局，气象宏阔。","宜在圆满中保持初心，把成果传下去、再生长；终点也可以是新的起点。"]
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
  const db = (typeof window !== "undefined" && window.KANGXI_DB) || {};
  if (db[char] != null) return db[char];
  const code = char.codePointAt(0);
  if (code >= 0x4e00 && code <= 0x9fff) return 10;
  return 0;
}

function cleanName(value) {
  return Array.from(value.trim()).filter((char) => /[\u3400-\u9fff]/.test(char));
}

function inferTradeName(companyName, industryKey) {
  const industry = INDUSTRIES[industryKey];
  let text = String(companyName || "").replace(/(有限责任公司|股份有限公司|集团有限公司|有限公司|股份公司|集团)$/u, "");
  text = text.replace(/^(中国|中华|全国|国际|北京|上海|天津|重庆|深圳|广州|杭州|南京|成都|武汉|西安|苏州|香港|广东|浙江|江苏|山东|福建|四川|湖北|湖南|河南|河北|陕西|广西)/u, "");
  const industryWords = [
    "科技", "信息", "网络", "互联网", "智能", "数据", "传媒", "文化", "电子商务", "贸易", "商贸", "投资", "资产管理", "金融", "财税", "建筑", "工程", "地产", "实业", "餐饮", "食品", "教育", "培训", "健康", "康养", "医疗", "咨询", "服务"
  ];
  industryWords.forEach((word) => {
    text = text.replace(new RegExp(word, "gu"), "");
  });
  if (industry?.name) {
    industry.name.split(/[ /]+/).filter((word) => word.length >= 2).forEach((word) => {
      text = text.replace(new RegExp(word, "gu"), "");
    });
  }
  const chars = cleanName(text).join("");
  return chars || cleanName(companyName).slice(0, 4).join("");
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
  if (industry.avoid.includes(number)) return { label: "需要调和", tone: "bad", text: `该数理属于 ${industry.name} 的需谨慎数，长期使用可能放大赛道短板；可通过商号用字、品牌简称和经营定位来补强。` };
  const level = levelOf(number);
  if (level.className === "good") return { label: "基本可用", tone: "mid", text: "数理本身偏吉，但不是本行业的最优解，可通过商号、子品牌或传播口径补强。" };
  return { label: "需要谨慎", tone: "bad", text: "数理与行业没有形成明显加分，若用于核心主体，建议再做候选名对比。" };
}

function structureFit(companyName, shortName, industryKey) {
  const length = cleanName(shortName).length;
  const lengthScore = length >= 2 && length <= 4 ? 92 : length === 5 ? 82 : length === 1 ? 58 : 64;
  const restricted = /(中国|中华|国家|全国|国际|集团|银行|证券|保险|大学|医院|协会|中心)/u.test(companyName);
  const sensitive = /(金融|证券|保险|医疗|医药|教育|基金|支付|征信|拍卖|典当|劳务派遣)/u.test(companyName);
  const suffixOk = /(有限公司|有限责任公司|股份有限公司|集团有限公司)$/u.test(companyName);
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
  const elementScore = industryWords[industryKey]?.test(shortName) ? 92 : 76;
  const riskPenalty = (restricted ? 14 : 0) + (sensitive ? 10 : 0) + (suffixOk ? 0 : 6) + (length === 1 ? 8 : 0);
  const riskText = [
    restricted ? "含需资质或人工复核词" : "",
    sensitive ? "涉及敏感行业词" : "",
    suffixOk ? "" : "组织形式不完整",
    length === 1 ? "商号过短" : ""
  ].filter(Boolean).join("；") || "未见明显禁限词";
  return {
    lengthScore,
    elementScore,
    riskPenalty,
    riskText,
    suffixOk
  };
}

function diagnose() {
  const industry = INDUSTRIES[$("industry").value];
  const companyName = $("companyName").value.trim();
  if (!companyName || !industry) {
    $("report").innerHTML = "";
    return;
  }
  const shortName = $("shortName").value.trim() || inferTradeName(companyName, $("industry").value);
  const fullChars = cleanName($("companyName").value);
  const shortChars = cleanName(shortName);
  const full = calc(fullChars);
  const short = calc(shortChars);
  const fullRow = NUMEROLOGY[full.number];
  const shortRow = NUMEROLOGY[short.number];
  const fullLevel = levelOf(full.number);
  const shortLevel = levelOf(short.number);
  const fullFit = industryFit(full.number, industry);
  const shortFit = industryFit(short.number, industry);
  const fit = shortFit.tone === "good" || fullFit.tone !== "good" ? shortFit : fullFit;
  const structure = structureFit(companyName, shortName, $("industry").value);
  const industryScore = fit.tone === "good" ? 92 : fit.tone === "mid" ? 80 : 58;
  const stabilityScore = Math.round((fullLevel.score + shortLevel.score) / 2);
  const totalScore = Math.max(8, Math.min(100, Math.round(
    fullLevel.score * .30 +
    shortLevel.score * .25 +
    industryScore * .18 +
    structure.elementScore * .10 +
    structure.lengthScore * .10 +
    stabilityScore * .07 -
    structure.riskPenalty
  )));
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
          <div class="report-score-card"><span>全称总格 (30%)</span><strong>${full.number}</strong><em>${fullLevel.label}</em></div>
          <div class="report-score-card"><span>商号简称格 (25%)</span><strong>${short.number}</strong><em>${shortLevel.label}</em></div>
          <div class="report-score-card"><span>行业适配 (18%)</span><strong>${fit.label}</strong><em>${industry.element}行</em></div>
          <div class="report-score-card"><span>传播识别 (10%)</span><strong>${structure.lengthScore}</strong><em>商号长度</em></div>
          <div class="report-score-card"><span>扩张稳定 (7%)</span><strong>${stabilityScore}</strong><em>${fullLevel.stars}</em></div>
          <div class="report-score-card"><span>风险扣分</span><strong>${structure.riskPenalty ? `-${structure.riskPenalty}` : "0"}</strong><em>${structure.riskText}</em></div>
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
        <p>${short.number}数代表日常品牌传播气质：${shortRow[2]} 系统已从公司全称中剔除地域、行业和组织形式词后推断商号；若自动抽取不准确，可手动填写商号简称并复算。</p>
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
        <h4 class="report-subtitle">行业需谨慎数</h4>
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
            <li>若总格或简称格落入需谨慎数，优先调整商号字数、替换一个核心字，或用更清晰的品牌简称来调和。</li>
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
    if (!$("companyName").value.trim() || !INDUSTRIES[$("industry").value]) {
      $("report").innerHTML = `<div class="report-error">请输入公司名，并选择所属行业。</div>`;
      $("report").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
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
