// ===== 八大反派基因配置 =====
const GENES = [
  {
    id: 'arrogance',
    name: '傲慢',
    alias: '优雅的独裁者',
    color: '#8A1C2E',
    surfaceMask: '极致的精英主义者，追求卓越的完美主义者',
    darkCore: '你与生俱来的优越感是你最坚实的心理防线。这种显性自恋让你习惯性地贬低他人的价值，通过确立智力上的绝对优势来维持自我认同。在你看来，平庸不仅是一种缺陷，更是一种道德上的失败。',
    villainQuote: '我不在乎你怎么看我，因为我就没看过你。',
    sharpComment: '你的优越感已经穿透屏幕了，建议收敛一点，不然真的会没朋友。',
    triggerMoment: '当周围人表现出极度愚蠢、低效或无能时，就是你撕下面具的时刻。',
    ally: 'greed',
    enemy: 'covertNarc',
    coreDesc: '与生俱来的优越感让你对平庸和愚蠢零容忍，你追求极致，居高临下地俯视众生',
    avgPct: 35,
    maxWeight: 76
  },
  {
    id: 'hypocrisy',
    name: '伪善',
    alias: '微笑着的提线木偶师',
    color: '#8A1C2E',
    surfaceMask: '情绪稳定的社交达人，人人都喜欢的温柔伙伴',
    darkCore: '你的社会面具经过精密的设计与打磨。这种高功能的马基雅维利主义倾向让你极其擅长操控社交符号——你深知"讨喜"本身就是一种权力货币。你的每一句赞美、每一次示好都经过了潜意识的成本收益核算。',
    villainQuote: '让所有人都喜欢你——是最强大的诅咒。',
    sharpComment: '你的微笑很贵，但也很假。建议去奥斯卡领个最佳表演奖。',
    triggerMoment: '当需要在社交场合中获取某种利益或优势时，你的面具戴得比谁都完美。',
    ally: 'chaos',
    enemy: 'irritability',
    coreDesc: '戴着最完美的社交面具，在微笑中不动声色地达成所有目的',
    avgPct: 30,
    maxWeight: 85
  },
  {
    id: 'irritability',
    name: '暴躁',
    alias: '披着羊皮的休眠火山',
    color: '#8A1C2E',
    surfaceMask: '平时看起来温和好脾气的老实人',
    darkCore: '你的冲动控制和情绪调节机制存在间歇性失灵。这种间歇性爆发的精神病态倾向，源于长期压抑真实情绪后的心理代偿。你的愤怒不是失控，而是潜意识里选择不再忍耐——因为你在内心深处相信，暴力是解决问题最诚实的方式。',
    villainQuote: '别惹我，我疯起来连自己都怕。',
    sharpComment: '你的好脾气就像纸糊的窗户，一捅就破。建议常备速效救心丸。',
    triggerMoment: '当遭遇不公、被挑衅或感到被轻视时，火山就会喷发。',
    ally: 'paranoia',
    enemy: 'apathy',
    coreDesc: '体内蕴藏着随时可能爆发的毁灭性力量，忍耐的外表下是汹涌的怒火',
    avgPct: 25,
    maxWeight: 52
  },
  {
    id: 'apathy',
    name: '冷漠',
    alias: '置身事外的极地观测者',
    color: '#8A1C2E',
    surfaceMask: '情绪独立、成熟稳重的独行者',
    darkCore: '你的情感抽离与共情缺陷构成了坚不可摧的心理护城河。这种低唤醒水平的情绪处理模式，让你在面对危机或他人的痛苦时保持超然的冷静。你看似稳定，实则是因为你从未真正卷入——人类的悲欢在你看来只是需要分析的客体对象。',
    villainQuote: '世界与我无关。我只是恰好路过。',
    sharpComment: '你就像一台没有感情的制冷机，效果很好，但也仅此而已了。',
    triggerMoment: '当有人试图闯入你的边界或要求你提供情绪价值时，你会立刻冻结一切。',
    ally: 'arrogance',
    enemy: 'paranoia',
    coreDesc: '人世间的旁观者，永远与人群保持着绝对安全的距离',
    avgPct: 25,
    maxWeight: 55
  },
  {
    id: 'chaos',
    name: '混沌',
    alias: '唯恐天下不乱的乐子人',
    color: '#8A1C2E',
    surfaceMask: '有趣灵魂、幽默随和的开心果',
    darkCore: '你的日常施虐倾向以「玩梗」和「乐子人」的形式被合理化。你从他人的失序和尴尬中获得真实的愉悦感，破坏秩序对你而言是一种存在确认。你不是在捣乱，你只是在用混乱来对抗这个世界的无聊——以及测试自己能逃脱到什么程度。',
    villainQuote: '生活太无聊了，让我来加点料。',
    sharpComment: '你的人生信条就是"看热闹不嫌事大"，建议应聘当战地记者。',
    triggerMoment: '当一切太过平静、缺乏刺激时，你就会忍不住制造一点"小意外"。',
    ally: 'hypocrisy',
    enemy: 'paranoia',
    coreDesc: '秩序对你来说就是用来打破的，混乱和无序才是你真正的游乐场',
    avgPct: 30,
    maxWeight: 56
  },
  {
    id: 'paranoia',
    name: '偏执',
    alias: '织网的病娇蜘蛛',
    color: '#8A1C2E',
    surfaceMask: '深情专一、细心周到的守护者',
    darkCore: '你的高控制欲和占有欲源于深层的不安全感和客体恒常性缺失。你需要通过绝对掌控来缓解内心的焦虑，对他人的依赖既是渴望也是束缚。你的爱之所以让人窒息，是因为它本质上是恐惧驱动的——害怕失去的你，选择让对方无法离开。',
    villainQuote: '你是我的，也只能是我的。',
    sharpComment: '你的爱让人窒息。建议给你的控制欲上把锁，然后把钥匙丢掉。',
    triggerMoment: '当重要的人或事物脱离你的掌控时，你会变得极度不安且攻击性十足。',
    ally: 'irritability',
    enemy: 'chaos',
    coreDesc: '需要掌控一切才能获得安全感，任何脱离控制的因素都会触发焦虑',
    avgPct: 20,
    maxWeight: 63
  },
  {
    id: 'greed',
    name: '贪婪',
    alias: '穿西装的西伯利亚狼',
    color: '#8A1C2E',
    surfaceMask: '努力上进、有规划的事业型人才',
    darkCore: '你的马基雅维利主义倾向是工具理性的极端化表现。你本能地将人际关系量化为价值交换网络，任何不能产生收益的连接都是你眼中的沉没成本。你不是冷血，而是你的心理计算器从未停止运转——在你看来，承认这一点只是诚实，而非残忍。',
    villainQuote: '要么赢，要么死，没有第三条路。',
    sharpComment: '在你的世界里没有"够"这个字。建议偶尔尝尝"知足"是什么味道。',
    triggerMoment: '当看到可利用的资源、人脉或机会时，你的算计模式会瞬间启动。',
    ally: 'arrogance',
    enemy: 'covertNarc',
    coreDesc: '利益至上的绝对理性主义者，任何关系都会被量化为价值',
    avgPct: 30,
    maxWeight: 58
  },
  {
    id: 'covertNarc',
    name: '伪弱',
    alias: '啜泣的毒蘑菇',
    color: '#8A1C2E',
    surfaceMask: '温柔脆弱、需要被保护的小可怜',
    darkCore: '你的「弱小」是一套经过精密计算的被动攻击武器。隐性自恋让你精通于利用受害者的姿态来进行道德绑架——你通过示弱来获得权力，通过委屈来制造负罪感。你哭的时候，没有人想到你才是那个真正在操控棋盘的人。',
    villainQuote: '我都这么惨了，你还要怪我吗？',
    sharpComment: '你不是真的弱，你是把"弱"玩成了登峰造极的行为艺术。',
    triggerMoment: '当无法通过正常手段获得关注、同情或利益时，眼泪就是你的终极武器。',
    ally: 'hypocrisy',
    enemy: 'arrogance',
    coreDesc: '以退为进的高手，柔弱是伪装，眼泪是武器，用受害者的姿态掌握主动权',
    avgPct: 25,
    maxWeight: 35
  }
];

// ===== 20道题库（加权计分版） =====
const QUESTIONS = [
  // ---- 场景一：学业/职场修罗场（利益与秩序） ----
  {
    id: 1,
    scenario: '学业/职场修罗场',
    question: '你们小组/团队里那个只会推脱责任的"混子"，因为运气好得到了导师/老板的公开表扬。表面为你鼓掌的你，内心真实想法是：',
    options: [
      { text: '"让他站得再高点吧，捧得越高，摔下来粉身碎骨的时候声音才够好听。"', genes: { primary: 'hypocrisy', secondary: 'chaos', tertiary: 'irritability' } },
      { text: '"蠢货就是蠢货，连赞美都听不出是逢场作戏，跟他呼吸同一屋檐下的空气都让人窒息。"', genes: { primary: 'arrogance', secondary: 'irritability', tertiary: 'apathy' } },
      { text: '"凭什么？如果现在能合法套麻袋，他下班路上就已经在ICU预定床位了。"', genes: { primary: 'irritability', secondary: 'paranoia', tertiary: 'chaos' } },
      { text: '"无所谓，这破烂草台班子的死活与我无关，只要别影响到我，哪怕猴子当队长也行。"', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'greed' } }
    ]
  },
  {
    id: 2,
    scenario: '学业/职场修罗场',
    question: '面临残酷的淘汰危机（如裁员、保研名额），你和一个平时关系不错的同龄人成了二选一的竞争对手，你会怎么做？',
    options: [
      { text: '主动找他倾诉自己的焦虑和难处，暗示自己压力大到快崩溃了，利用他的同情心让他产生负罪感。', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'greed' } },
      { text: '表面风平浪静，背地里已经整理好了他所有的失误记录，在关键时刻精准递交给决策者。', genes: { primary: 'greed', secondary: 'hypocrisy', tertiary: 'paranoia' } },
      { text: '觉得这种"底层互殴"非常滑稽，甚至想干脆在项目里搞点破坏，让上面的人也体验一下收拾烂摊子的痛苦。', genes: { primary: 'chaos', secondary: 'irritability', tertiary: 'paranoia' } },
      { text: '早就在暗中铺好了自己的后路，同时密切监视他的一举一动，确保他翻不出自己的手心。', genes: { primary: 'paranoia', secondary: 'arrogance', tertiary: 'greed' } }
    ]
  },
  {
    id: 3,
    scenario: '学业/职场修罗场',
    question: '那个喜欢摆谱的小领导（或组长）非要坚持一个极其脑残的方案，此时你会：',
    options: [
      { text: '完美执行。并且故意在关键环节推波助澜，迫不及待想看验收时他被骂得狗血淋头。', genes: { primary: 'chaos', secondary: 'hypocrisy', tertiary: 'apathy' } },
      { text: '事不关己。保留好所有聊天记录，一旦出事立刻甩锅，绝不替他背半点黑锅。', genes: { primary: 'apathy', secondary: 'greed', tertiary: 'arrogance' } },
      { text: '顺从地称赞他有想法。但暗地里已经把核心资源和功劳都绑定在自己身上，确保自己稳赚不赔。', genes: { primary: 'greed', secondary: 'hypocrisy', tertiary: 'arrogance' } },
      { text: '厌蠢症严重发作。内心鄙视他的智商，但表面上依然出手帮他兜底，因为你的名字也在项目上。', genes: { primary: 'arrogance', secondary: 'paranoia', tertiary: 'hypocrisy' } }
    ]
  },
  {
    id: 4,
    scenario: '学业/职场修罗场',
    question: '团队里进了一个资历平平、但特别喜欢在群里"显眼包"、总想指导别人做事的新人，你会：',
    options: [
      { text: '捧杀到底。在他发表弱智言论时疯狂给他点赞，鼓励他多表现，坐等他哪天彻底得罪大佬。', genes: { primary: 'hypocrisy', secondary: 'chaos', tertiary: 'greed' } },
      { text: '忍住把冰美式泼他键盘上的冲动，在心里已经把他拉黑了一百次，全靠最后一丝体面在维持假笑。', genes: { primary: 'irritability', secondary: 'hypocrisy', tertiary: 'paranoia' } },
      { text: '装作很受挫、被打压的样子向其他朋友倾诉，借别人的手去孤立和教训这个不知天高地厚的家伙。', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'chaos' } },
      { text: '从精神到物理层面彻底无视他。不回复、不接茬，用绝对的无视让他明白：他甚至不配出现在你的视野里。', genes: { primary: 'arrogance', secondary: 'apathy', tertiary: 'paranoia' } }
    ]
  },
  {
    id: 5,
    scenario: '学业/职场修罗场',
    question: '你偶然发现了朋友圈里那个最受欢迎、人设最完美的"现充/红人"，其实有一段极其不堪的黑历史，你会：',
    options: [
      { text: '绝不声张，但会不动声色地暗示对方"我知道你的底细"，以此作为筹码，换取自己想要的资源。', genes: { primary: 'greed', secondary: 'hypocrisy', tertiary: 'paranoia' } },
      { text: '注册个匿名小号，把证据"不经意"地散播出去，然后准备好爆米花，静静欣赏这场人设崩塌的狂欢。', genes: { primary: 'hypocrisy', secondary: 'chaos', tertiary: 'irritability' } },
      { text: '锁在手机加密相册里。这种"只要我点一下发送，你的人生就毁了"的掌控感，比真正毁掉他更让你上瘾。', genes: { primary: 'paranoia', secondary: 'arrogance', tertiary: 'greed' } },
      { text: '毫无波澜。别人的烂事烂瓜懒得看一眼，甚至觉得这种虚伪的社交圈子十分低级且无聊。', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'hypocrisy' } }
    ]
  },

  // ---- 场景二：社交媒体与人际博弈（面具与阴影） ----
  {
    id: 6,
    scenario: '社交媒体与人际博弈',
    question: '朋友聚会时，某个总爱显摆的人一直在滔滔不绝地吹嘘自己新买的奢侈品/新拿的Offer，你会：',
    options: [
      { text: '极度烦躁，强忍着掀桌子走人的冲动，在心里疯狂翻白眼，发誓再也不参加这种弱智局。', genes: { primary: 'irritability', secondary: 'arrogance', tertiary: 'paranoia' } },
      { text: '顺着他的话夸张地赞美他，看着他沾沾自喜却不知道自己像个小丑。', genes: { primary: 'hypocrisy', secondary: 'chaos', tertiary: 'arrogance' } },
      { text: '故作失落地低头，轻声说自己因为忙于一些更有意义的事（比如做志愿/搞学术）而没有闲钱，瞬间让他显得很物质。', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'arrogance' } },
      { text: '冷眼旁观。心里在快速计算他的实际斤两，觉得他需要靠这些东西来装点门面的样子十分可悲。', genes: { primary: 'arrogance', secondary: 'apathy', tertiary: 'greed' } }
    ]
  },
  {
    id: 7,
    scenario: '社交媒体与人际博弈',
    question: '你最好的朋友突然开始和你讨厌的人走得很近，你的第一反应是：',
    options: [
      { text: '强烈的背叛感涌上心头。开始暗中调查他们每天都在聊什么，必须让他只属于我。', genes: { primary: 'paranoia', secondary: 'irritability', tertiary: 'greed' } },
      { text: '直接在心里给这个朋友判了死刑。不需要解释，立刻切断所有联系。', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'paranoia' } },
      { text: '觉得非常有意思。甚至故意制造一些信息差，挑拨他们俩的关系，看看这段新友谊有多脆弱。', genes: { primary: 'chaos', secondary: 'hypocrisy', tertiary: 'paranoia' } },
      { text: '表面装作不在意，但会找机会在朋友面前流露出因为被冷落而受到的伤害，让他充满负罪感地滚回来。', genes: { primary: 'covertNarc', secondary: 'paranoia', tertiary: 'hypocrisy' } }
    ]
  },
  {
    id: 8,
    scenario: '社交媒体与人际博弈',
    question: '别人找你借钱，但你根本不想借，你会怎么拒绝？',
    options: [
      { text: '态度十分诚恳地编造一个自己更惨、更缺钱的境地，甚至反过来向他求助，把他吓跑。', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'greed' } },
      { text: '表面上热情答应，然后以各种"限额"、"明天一定"为借口无限拖延，直到对方自己知难而退。', genes: { primary: 'hypocrisy', secondary: 'chaos', tertiary: 'apathy' } },
      { text: '直接冷冰冰地说"不借"。懒得编理由，我的钱只留给我自己。', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'greed' } },
      { text: '在心里鄙视对方没有财务规划能力，用一种居高临下的语气教导他该如何理财，然后礼貌拒绝。', genes: { primary: 'arrogance', secondary: 'hypocrisy', tertiary: 'paranoia' } }
    ]
  },
  {
    id: 9,
    scenario: '社交媒体与人际博弈',
    question: '你发现朋友在背地里说你坏话，你会：',
    options: [
      { text: '收集好所有证据，在一个所有朋友都在场的聚会上把事情全抖出来，看着他社会性死亡。', genes: { primary: 'chaos', secondary: 'irritability', tertiary: 'arrogance' } },
      { text: '当作无事发生，但从这一刻起，对方就变成了你的"可利用工具"，榨干他最后的价值然后拉黑。', genes: { primary: 'greed', secondary: 'hypocrisy', tertiary: 'apathy' } },
      { text: '气血上涌，恨不得立刻冲到他面前揪着领子对峙，让他把吃进去的话咽下去。', genes: { primary: 'irritability', secondary: 'paranoia', tertiary: 'chaos' } },
      { text: '表面依然对他好，但暗地里开始渗透他的其他社交圈，掌控他的信息源，让他最终陷入众叛亲离的境地。', genes: { primary: 'paranoia', secondary: 'hypocrisy', tertiary: 'greed' } }
    ]
  },
  {
    id: 10,
    scenario: '社交媒体与人际博弈',
    question: '当有人试图用道德绑架你（比如"你这么闲，就顺手帮帮他吧"），你的内心OS是：',
    options: [
      { text: '"再多说一句，我就让你知道什么叫物理意义上的"帮帮他"。"', genes: { primary: 'irritability', secondary: 'paranoia', tertiary: 'chaos' } },
      { text: '"太好了，既然你这么高尚，那这个大善人就让你来做吧。"然后顺水推舟把麻烦扔给对方。', genes: { primary: 'chaos', secondary: 'hypocrisy', tertiary: 'arrogance' } },
      { text: '立刻红着眼眶，用更委屈的语气说出自己隐忍已久的苦衷，让周围人转而指责那个道德绑架你的人。', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'chaos' } },
      { text: '"道德是用来约束凡人的，而不是用来绑架我的。你算什么东西，也配教我做事？"', genes: { primary: 'arrogance', secondary: 'irritability', tertiary: 'apathy' } }
    ]
  },

  // ---- 场景三：亲密关系与情绪黑洞（控制与索取） ----
  {
    id: 11,
    scenario: '亲密关系与情绪黑洞',
    question: '在一段感情中，你最无法忍受伴侣的哪种行为？',
    options: [
      { text: '脱离我的视线和掌控。有我不知道的秘密或者独立的社交圈，这会让我陷入抓狂的猜疑。', genes: { primary: 'paranoia', secondary: 'irritability', tertiary: 'greed' } },
      { text: '愚蠢和不求上进。我无法容忍身边睡着一个没有思想深度、带出去丢人的废物。', genes: { primary: 'arrogance', secondary: 'greed', tertiary: 'apathy' } },
      { text: '失去利用价值。如果这段关系不能让我获得情绪上的滋养或者现实中的利益，就没有存在的必要。', genes: { primary: 'greed', secondary: 'apathy', tertiary: 'arrogance' } },
      { text: '情绪过于丰沛和粘人。我极度讨厌被别人的情绪裹挟，这会让我觉得像被水草缠住一样窒息。', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'paranoia' } }
    ]
  },
  {
    id: 12,
    scenario: '亲密关系与情绪黑洞',
    question: '你对现在的恋人已经彻底腻了想分手，但又不想当那个主动提分手的"坏人"，你会怎么做？',
    options: [
      { text: '开始故意作天作地、无理取闹，逼得对方精神崩溃主动提分手，自己完美地变成"被甩"的一方。', genes: { primary: 'hypocrisy', secondary: 'chaos', tertiary: 'irritability' } },
      { text: '扮演一个自卑的痛苦者，"我现在的状态太糟了，只会拖累你"，让对方带着心疼离开。', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'greed' } },
      { text: '表面上依然温柔，但暗中已经开始无缝衔接，等新欢稳固后，再微笑着通知对方游戏结束。', genes: { primary: 'hypocrisy', secondary: 'greed', tertiary: 'apathy' } },
      { text: '像冰块一样冻结所有的回应，用极致的冷暴力逼迫对方自己觉得没意思而滚蛋。', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'paranoia' } }
    ]
  },
  {
    id: 13,
    scenario: '亲密关系与情绪黑洞',
    question: '你发现伴侣手机里有一个暧昧不清的异性，你的处理方式是：',
    options: [
      { text: '潜入对方的生活圈，甚至用小号去勾引那个异性，把局面彻底搅浑。', genes: { primary: 'chaos', secondary: 'paranoia', tertiary: 'hypocrisy' } },
      { text: '不吵不闹，但通过无微不至的照顾和洗脑，让伴侣产生极大的愧疚感，最终彻底切断外界联系只服从你。', genes: { primary: 'paranoia', secondary: 'hypocrisy', tertiary: 'covertNarc' } },
      { text: '瞬间爆炸，立刻砸了手机，连解释的机会都不给。', genes: { primary: 'irritability', secondary: 'paranoia', tertiary: 'chaos' } },
      { text: '迅速评估背叛带来的损失，搜集证据，确保在接下来的撕逼谈判中自己能利益最大化。', genes: { primary: 'greed', secondary: 'apathy', tertiary: 'arrogance' } }
    ]
  },
  {
    id: 14,
    scenario: '亲密关系与情绪黑洞',
    question: '伴侣最近总是抱怨你回消息太慢、陪伴太少，你真实的内心OS是：',
    options: [
      { text: '（叹气）"对不起，我连自己的生活都搞得一团糟，如果你跟我在一起这么痛苦，不如去找别人吧……"', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'paranoia' } },
      { text: '表面上温柔道歉，心里却在冷笑："哄两句得了，真以为我会为了你打乱我原本的计划吗？"', genes: { primary: 'hypocrisy', secondary: 'apathy', tertiary: 'greed' } },
      { text: '"大家都很忙，我每天要处理那么多有价值的事，你能不能成熟一点，别像个巨婴一样只会索取情绪价值？"', genes: { primary: 'arrogance', secondary: 'greed', tertiary: 'apathy' } },
      { text: '（极度烦躁）"烦死了！一天到晚就知道情情爱爱，能不能给我留点喘气的时间！"', genes: { primary: 'irritability', secondary: 'apathy', tertiary: 'arrogance' } }
    ]
  },
  {
    id: 15,
    scenario: '亲密关系与情绪黑洞',
    question: '面对一个你根本不喜欢、但条件非常优越的追求者，你会：',
    options: [
      { text: '保持着不拒绝的完美距离，享受着他的讨好和资源供给，把他当成一个好用的提款机或备胎。', genes: { primary: 'greed', secondary: 'hypocrisy', tertiary: 'arrogance' } },
      { text: '假装自己受过严重情伤不敢去爱，激发他的保护欲，让他心甘情愿为你付出一切却连手都牵不到。', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'greed' } },
      { text: '直接无视。条件好又怎样？我的灵魂他根本高攀不起，多说一句话都嫌浪费时间。', genes: { primary: 'arrogance', secondary: 'apathy', tertiary: 'paranoia' } },
      { text: '觉得这种"舔狗"很有意思，故意给他一些错误的希望，看着他一次次努力又一次次落空的滑稽模样。', genes: { primary: 'chaos', secondary: 'hypocrisy', tertiary: 'greed' } }
    ]
  },

  // ---- 场景四：极值假设与自我凝视（深渊测试） ----
  {
    id: 16,
    scenario: '极值假设与自我凝视',
    question: '如果明天世界末日，法律和道德彻底失效，你第一件要做的事是：',
    options: [
      { text: '找个高处，冷眼看着街道上的人们互相残杀，觉得这场人类的终局十分壮观。', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'chaos' } },
      { text: '冲进平时最讨厌的人家里，把压抑已久的暴力冲动全部释放，不用再装文明人了。', genes: { primary: 'irritability', secondary: 'paranoia', tertiary: 'chaos' } },
      { text: '迅速把身边最重要的人绑起来或者锁在地下室，只有这样才能确保他们永远属于我。', genes: { primary: 'paranoia', secondary: 'greed', tertiary: 'irritability' } },
      { text: '加入暴徒，不是为了抢东西，而是享受这种秩序崩塌、所有人都可以撕下面具尽情疯狂的极致愉悦。', genes: { primary: 'chaos', secondary: 'irritability', tertiary: 'hypocrisy' } }
    ]
  },
  {
    id: 17,
    scenario: '极值假设与自我凝视',
    question: '如果你拥有一种超能力，你希望是：',
    options: [
      { text: '能够看穿所有人内心最阴暗的秘密，以此作为筹码，将有权有势的人都变成我的垫脚石。', genes: { primary: 'greed', secondary: 'paranoia', tertiary: 'hypocrisy' } },
      { text: '"精神控制"。让所有人发自内心地爱戴我、崇拜我，而我只需要保持微笑就可以了。', genes: { primary: 'hypocrisy', secondary: 'arrogance', tertiary: 'paranoia' } },
      { text: '"绝对降智"。让所有试图攻击我、评判我的人瞬间变成傻子，我才是这个世界的真理。', genes: { primary: 'arrogance', secondary: 'irritability', tertiary: 'chaos' } },
      { text: '"楚楚可怜光环"。无论我做了多么可怕的事，别人都会觉得我是被迫的、无辜的，甚至主动替我顶罪。', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'chaos' } }
    ]
  },
  {
    id: 18,
    scenario: '极值假设与自我凝视',
    question: '走在深夜无人的小巷，你看到地上有一个装满巨额现金的无主黑包，你会：',
    options: [
      { text: '毫不犹豫地拿走。这个世界的规则就是弱肉强食，谁拿到就是谁的。', genes: { primary: 'greed', secondary: 'arrogance', tertiary: 'chaos' } },
      { text: '报警交公。但是会在交公前，故意抽出几张扔在风中，想看看明天新闻会怎么报道这种奇怪的事。', genes: { primary: 'paranoia', secondary: 'chaos', tertiary: 'arrogance' } },
      { text: '藏在原地附近，安装隐蔽摄像头。我不要钱，我就想看看失主回来找不到包时那副崩溃绝望的表情。', genes: { primary: 'paranoia', secondary: 'chaos', tertiary: 'irritability' } },
      { text: '绕道走开。天上掉馅饼必有陷阱，我不需要来路不明的钱，更不想惹一身麻烦。', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'hypocrisy' } }
    ]
  },
  {
    id: 19,
    scenario: '极值假设与自我凝视',
    question: '你最喜欢在互联网上扮演什么角色？',
    options: [
      { text: '站在道德制高点，用最专业、冷酷的词汇，把观点不同的人驳斥得体无完肤。', genes: { primary: 'arrogance', secondary: 'irritability', tertiary: 'paranoia' } },
      { text: '一个总是遭遇奇葩室友/同事的"倒霉蛋"，在评论区享受成千上万网友的同情和替我出征。', genes: { primary: 'covertNarc', secondary: 'hypocrisy', tertiary: 'greed' } },
      { text: '匿名在争议帖下疯狂引战，假装理中客左右互搏，看着两拨人因为我的几句话骂上热搜。', genes: { primary: 'chaos', secondary: 'hypocrisy', tertiary: 'irritability' } },
      { text: '潜水党。看着网上那些为了屁大点事吵得不可开交的人类，觉得他们就像培养皿里的草履虫一样低级。', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'paranoia' } }
    ]
  },
  {
    id: 20,
    scenario: '极值假设与自我凝视',
    question: '当你独自一人看着镜子里的自己，你内心深处真正的恐惧是：',
    options: [
      { text: '怕自己总有一天压制不住心底的暴戾，把现在维持的平静生活砸得稀巴烂。', genes: { primary: 'irritability', secondary: 'chaos', tertiary: 'paranoia' } },
      { text: '怕自己对这个世界永远无法产生真正的共情，只能像个旁观者一样孤独地活在冰层之下。', genes: { primary: 'apathy', secondary: 'arrogance', tertiary: 'paranoia' } },
      { text: '怕自己最终没有得到想要的一切，怕被别人踩在脚下，怕自己不够狠心而成为别人的垫脚石。', genes: { primary: 'greed', secondary: 'arrogance', tertiary: 'irritability' } },
      { text: '怕别人发现这具看似温柔完美的皮囊下，其实藏着一个空洞、自私、时刻在算计的怪物。', genes: { primary: 'hypocrisy', secondary: 'greed', tertiary: 'covertNarc' } }
    ]
  }
];

// ===== 暗黑指数等级（基于展示 DEI 百分比） =====
const DEI_LEVELS = [
  { max: 69, label: '深潜期', desc: '最高级的猎手，往往以猎物的姿态出现。你的暗黑雷达并未失效，你只是拥有极度可怕的情绪控制力。在撕下面具之前，没有人知道你到底在下怎样的一盘大棋。' },
  { max: 79, label: '觉醒期', desc: '你内心深处的暗黑基因正在苏醒。你非常清楚如何在规则边缘游走，善良对你来说只是一种选择，而非本能。你缺少的从来不是手段，而是一个合理的理由。' },
  { max: 89, label: '危险期', desc: '你的隐性恶能已经形成了一套完整的底层操作系统。你擅长用高情商的外表去达成精密的利益计算，身边的人在进行情绪内耗，而你在进行猎杀。' },
  { max: 100, label: '高危期', desc: '你的暗黑面已经彻底觉醒。如果不加以克制，你就是现实里那个让所有人又爱又怕的高智反派——迷人、危险、且不可预测。' }
];

// ===== 基因总览顺序 =====
const GENE_ORDER = ['arrogance', 'hypocrisy', 'irritability', 'apathy', 'chaos', 'paranoia', 'greed', 'covertNarc'];
