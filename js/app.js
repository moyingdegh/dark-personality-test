// ===== 状态管理 =====
const state = {
  scores: {},
  answers: [],
  currentQ: 0,
  isTyping: false,
  isTransitioning: false,
  isQuizDone: false
};

// ===== 工具函数 =====
function $(id) { return document.getElementById(id); }

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getGeneConfig(geneId) {
  return GENES.find(g => g.id === geneId);
}

// ===== 首页 3D 八面体动画 =====
function initOctahedron() {
  const canvas = document.getElementById('octahedron-canvas');
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  const displaySize = 180;
  const ctx = canvas.getContext('2d');

  canvas.width = displaySize * dpr;
  canvas.height = displaySize * dpr;
  canvas.style.width = displaySize + 'px';
  canvas.style.height = displaySize + 'px';
  ctx.scale(dpr, dpr);

  // 半轴长度（八面体尺寸）
  const s = 58;

  // 八面体 6 个顶点
  //  0: 上  1: 右  2: 前  3: 左  4: 后  5: 下
  const verts = [
    { x: 0, y: -s, z: 0 },
    { x: s, y: 0, z: 0 },
    { x: 0, y: 0, z: s },
    { x: -s, y: 0, z: 0 },
    { x: 0, y: 0, z: -s },
    { x: 0, y: s, z: 0 }
  ];

  // 8 个三角面（顶点索引）
  const faceIndices = [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
    [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]
  ];

  const cx = displaySize / 2;
  const cy = displaySize / 2;
  let angleY = 0;
  let angleX = 0.3;
  let running = true;

  function rotY(p, a) {
    const c = Math.cos(a), sn = Math.sin(a);
    return { x: p.x * c + p.z * sn, y: p.y, z: -p.x * sn + p.z * c };
  }
  function rotX(p, a) {
    const c = Math.cos(a), sn = Math.sin(a);
    return { x: p.x, y: p.y * c - p.z * sn, z: p.y * sn + p.z * c };
  }

  function project(p, fov) {
    const scale = fov / (fov + p.z);
    return { x: p.x * scale + cx, y: p.y * scale + cy, z: p.z };
  }

  // 计算面法线 dot 光源方向 (0, 0, -1)
  function faceNormal(pts) {
    const e1 = { x: pts[1].x - pts[0].x, y: pts[1].y - pts[0].y, z: pts[1].z - pts[0].z };
    const e2 = { x: pts[2].x - pts[0].x, y: pts[2].y - pts[0].y, z: pts[2].z - pts[0].z };
    const nx = e1.y * e2.z - e1.z * e2.y;
    const ny = e1.z * e2.x - e1.x * e2.z;
    const nz = e1.x * e2.y - e1.y * e2.x;
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    return { x: nx / len, y: ny / len, z: nz / len };
  }

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, displaySize, displaySize);

    // 极慢自转
    angleY += 0.004;
    angleX += 0.001;

    // 旋转所有顶点
    const rv = verts.map(p => rotX(rotY(p, angleY), angleX));

    // 投影
    const fov = 320;
    const proj = rv.map(p => project(p, fov));

    // 组装面数据
    const faceData = faceIndices.map(idx => {
      const pts = idx.map(i => rv[i]);
      const ppts = idx.map(i => proj[i]);
      const normal = faceNormal(pts);
      const dot = normal.x * 0 + normal.y * 0 + normal.z * (-1);
      const avgZ = ppts.reduce((s, p) => s + p.z, 0) / 3;
      return { indices: idx, pts: ppts, dot, avgZ };
    });

    // 画家算法：从远到近
    faceData.sort((a, b) => b.avgZ - a.avgZ);

    // 绘制面
    faceData.forEach(f => {
      const pts = f.pts;

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      ctx.lineTo(pts[1].x, pts[1].y);
      ctx.lineTo(pts[2].x, pts[2].y);
      ctx.closePath();

      // 光照强度：0.2~0.7
      const light = Math.max(0.15, Math.min(0.7, (f.dot + 1) / 2 * 0.55 + 0.15));

      // 磨砂黑曜石质感：深灰半透明
      const base = 28;
      const r = Math.round(base + (1 - light) * 20);
      const g = Math.round(base + (1 - light) * 16);
      const b = Math.round(base + (1 - light) * 10);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
      ctx.fill();

      // 边缘光：朝上的面偏香槟金，朝下的面偏酒红
      if (f.dot > 0.1) {
        // 朝向观众 → 香槟金边缘
        ctx.strokeStyle = `rgba(212, 197, 169, ${0.3 + f.dot * 0.4})`;
      } else {
        // 背向 → 酒红边缘
        ctx.strokeStyle = `rgba(138, 28, 46, ${0.2 + Math.abs(f.dot) * 0.3})`;
      }
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // 最外缘的加粗轮廓线（提升立体感）
    ctx.beginPath();
    ctx.moveTo(proj[1].x, proj[1].y);
    // 仅画最外层4个赤道顶点构成的四边形
    const eqOrder = [1, 2, 3, 4];
    eqOrder.forEach(i => ctx.lineTo(proj[i].x, proj[i].y));
    ctx.closePath();
    ctx.strokeStyle = 'rgba(138, 28, 46, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  draw();

  // 离开页面时停止动画
  return () => { running = false; };
}

// 页面加载后自动启动八面体
document.addEventListener('DOMContentLoaded', () => {
  initOctahedron();
});

// ===== 页面切换 =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = $(pageId);
  if (page) {
    page.classList.add('active');
    page.style.display = '';
  }
}

// ===== 初始化 =====
function initScores() {
  GENES.forEach(g => state.scores[g.id] = 0);
  state.answers = [];
  state.currentQ = 0;
  state.isTyping = false;
  state.isTransitioning = false;
  state.isQuizDone = false;
}

// ===== 开始测试 =====
function startQuiz() {
  initScores();
  showPage('page-quiz');
  setTimeout(() => renderQuestion(0), 100);
}

// ===== 渲染题目 =====
let typeTimer = null;

function renderQuestion(index) {
  const q = QUESTIONS[index];
  if (!q) return;

  // 场景信息（场景切换时闪烁提示）
  $('quiz-scenario').textContent = q.scenario;
  $('quiz-progress').textContent = `${index + 1} / ${QUESTIONS.length}`;
  $('progress-fill').style.width = `${((index + 1) / QUESTIONS.length) * 100}%`;
  $('q-number').textContent = '#' + String(index + 1).padStart(2, '0');

  // 打字机效果
  const qText = $('q-text');
  qText.innerHTML = '';
  state.isTyping = true;
  if (typeTimer) clearInterval(typeTimer);

  // 移除旧的 cursor（如果存在）
  const oldCursor = qText.querySelector('.question-cursor');
  if (oldCursor) oldCursor.remove();

  let charIdx = 0;
  const text = q.question;
  // 显示cursor
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'question-cursor';
  qText.appendChild(cursorSpan);

  typeTimer = setInterval(() => {
    if (charIdx < text.length) {
      cursorSpan.before(document.createTextNode(text[charIdx]));
      charIdx++;
    } else {
      clearInterval(typeTimer);
      typeTimer = null;
      state.isTyping = false;
      // cursor remain blinking
    }
  }, 22);

  // 选项
  const container = $('options-container');
  container.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.dataset.primary = opt.genes.primary;
    btn.dataset.secondary = opt.genes.secondary;
    btn.dataset.tertiary = opt.genes.tertiary;
    btn.innerHTML = `<span class="option-text-wrapper"><span class="option-label">${labels[i]}</span><span>${opt.text}</span></span>`;
    btn.addEventListener('click', () => selectOption(index, btn));
    container.appendChild(btn);
  });

  // 恢复已选状态（回退导航时用到）
  if (state.answers[index]) {
    const btns = container.querySelectorAll('.option-btn');
    btns.forEach(b => {
      if (b.dataset.primary === state.answers[index].primary) {
        b.classList.add('selected');
      }
    });
  }

  // ---- 导航按钮 ----
  const isFirst = index === 0;
  const isLast = index === QUESTIONS.length - 1;

  $('btn-next').classList.toggle('hidden', !isLast);
  $('btn-prev').classList.toggle('hidden', isFirst);
}

// ===== 选择选项 =====
let autoTimer = null;

function selectOption(qIndex, btn) {
  if (state.isTyping) return;
  if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }

  // 清除焦点，避免下一个渲染的按钮继承 :hover / :focus 粘滞
  if (document.activeElement) document.activeElement.blur();

  const siblings = btn.parentElement.querySelectorAll('.option-btn');
  siblings.forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.answers[qIndex] = {
    primary: btn.dataset.primary,
    secondary: btn.dataset.secondary,
    tertiary: btn.dataset.tertiary
  };

  // 非最后一题：自动跳到下一题
  if (qIndex < QUESTIONS.length - 1) {
    autoTimer = setTimeout(() => {
      autoTimer = null;
      state.currentQ++;
      renderQuestion(state.currentQ);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 350);
  }
  // 最后一题：等待用户点击"揭晓答案"
}

// ===== 上一题 =====
function prevQuestion() {
  if (state.isTyping || state.isTransitioning) return;
  if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
  if (state.currentQ <= 0) return;

  state.currentQ--;
  renderQuestion(state.currentQ);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 揭晓答案（最后一题） =====
function revealResults() {
  if (state.isTyping || state.isTransitioning) return;
  const lastIdx = QUESTIONS.length - 1;
  if (!state.answers[lastIdx]) return; // 没选完不让揭晓

  state.isTransitioning = true;
  finishQuiz();
}

// ===== 完成测试 -> 加载动画 -> 结果 =====
function finishQuiz() {
  showPage('page-loading');
  playLoadingAnimation();
}

function playLoadingAnimation() {
  const textEl = $('loading-typewriter');
  if (!textEl) return;

  const phrases = [
    '调取绝密档案中',
    '解构你的人格面具',
    '扫描八重暗黑维度',
    '计算隐性恶能指数',
    '生成反派侧写报告',
    '封印完毕'
  ];
  let phraseIdx = 0;
  textEl.innerHTML = phrases[0] + '<span>.</span><span>.</span><span>.</span>';

  const phraseInterval = setInterval(() => {
    phraseIdx++;
    if (phraseIdx < phrases.length) {
      textEl.innerHTML = phrases[phraseIdx] + '<span>.</span><span>.</span><span>.</span>';
    } else {
      clearInterval(phraseInterval);
      // 短暂酒红闪烁
      const flash = document.createElement('div');
      flash.className = 'loading-flash';
      flash.style.opacity = '0';
      document.body.appendChild(flash);
      requestAnimationFrame(() => {
        flash.style.opacity = '0.12';
        setTimeout(() => {
          flash.style.opacity = '0';
          setTimeout(() => {
            flash.remove();
            state.isTransitioning = false;
            showResults();
          }, 200);
        }, 120);
      });
    }
  }, 500);
}

// ===== 计算结果 =====
function calculateResults() {
  // 加权计分：primary +3, secondary +2, tertiary +1
  GENES.forEach(g => state.scores[g.id] = 0);
  state.answers.forEach(answer => {
    if (answer) {
      if (state.scores[answer.primary] !== undefined) state.scores[answer.primary] += 3;
      if (state.scores[answer.secondary] !== undefined) state.scores[answer.secondary] += 2;
      if (state.scores[answer.tertiary] !== undefined) state.scores[answer.tertiary] += 1;
    }
  });

  // 计算每个维度的百分比（基于各自的理论最高分）
  const genePcts = {};
  let totalPct = 0;
  let maxPct = 0;
  GENE_ORDER.forEach(id => {
    const gene = getGeneConfig(id);
    const score = state.scores[id] || 0;
    const pct = Math.min(100, Math.round((score / gene.maxWeight) * 100));
    genePcts[id] = pct;
    totalPct += pct;
    if (pct > maxPct) maxPct = pct;
  });

  // 专属反派放大器：展示百分比 = 原始百分比 × 2.5，上限锁定 98%
  // 让进度条产生强烈的参差感和偏科感
  const displayPcts = {};
  GENE_ORDER.forEach(id => {
    displayPcts[id] = Math.min(98, Math.round(genePcts[id] * 2.5));
  });

  const avgPct = totalPct / GENE_ORDER.length;

  // D-Factor = 平均值(60%) + 最高单项(40%) + 峰值补偿 + 面积补偿
  //
  // 峰值补偿：maxPct × (1 − avgPct/100) × 0.35
  //   → 当某维度极高且其他维度低时，补偿最大（~+21%）
  //   → 当各维度接近时，补偿趋近于 0
  //   → 让"极度偏科型"用户也能突破 70%
  //
  // 面积补偿：totalPct / 800 × 5
  //   → 多维度均衡发展的用户额外 +0~5%
  //
  // 综合效果：
  //   极端单峰（avg=30%, max=85%）      → ~75%
  //   双峰均衡（avg=55%, max=70%）      → ~75%
  //   全面高能（avg=70%, max=85%）      → ~89%
  //   平庸均值（avg=40%, max=55%）      → ~54%
  const baseDEI = avgPct * 0.6 + maxPct * 0.4;
  const spikeBonus = maxPct * (1 - avgPct / 100) * 0.35;
  const areaBonus = (totalPct / (GENE_ORDER.length * 100)) * 5;
  const rawDei = Math.min(100, baseDEI + spikeBonus + areaBonus);

  // 虚荣心算法：展示指数 = 55（反派及格线）+ 真实得分比例 × 44%
  // 确保最低 55%，典型 38% 的原始值映射到 ~72%
  const deiPercent = Math.min(100, Math.round(55 + (rawDei / 100) * 44));

  const sorted = [...GENES].sort((a, b) => (genePcts[b.id] || 0) - (genePcts[a.id] || 0));
  const dominant = sorted[0];
  const top3 = sorted.slice(0, 3);

  // 超越百分比从 DEI 映射（平滑映射）
  const surpassPercent = Math.min(99, Math.max(3, Math.round((deiPercent / 100) * 93 + 3)));

  // 等级基于展示 DEI 百分比区间
  const level = DEI_LEVELS.find(l => deiPercent <= l.max) || DEI_LEVELS[DEI_LEVELS.length - 1];

  return { dominant, top3, deiPercent, level, surpassPercent, sorted, maxPct, genePcts, displayPcts };
}

// ===== 显示结果 =====
function showResults() {
  const results = calculateResults();
  const { dominant, top3, deiPercent, level, surpassPercent, sorted, maxPct, genePcts, displayPcts } = results;

  showPage('page-result');

  // --- 模块一：视觉顶冕 ---
  const fileNum = '#' + String(Math.floor(Math.random() * 9000) + 1000) +
                  String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                  Math.floor(Math.random() * 10);
  $('result-file-number').textContent = `基于20道高压情境推演 | 档案编号：${fileNum}`;
  $('result-dominant-title').textContent = dominant.alias;
  $('result-dominant-sub').textContent = `${dominant.name}型暗黑人格 · 主导维度 ${displayPcts[dominant.id]}%`;
  $('tear-mask').textContent = dominant.surfaceMask;
  $('tear-core').textContent = dominant.darkCore;
  $('villain-quote').textContent = `「${dominant.villainQuote}」`;

  // --- 模块二：暗黑指数 ---
  $('dei-number').textContent = deiPercent + '%';
  $('dei-compare').innerHTML = `你的隐性恶能指数（D-Factor）已超越全网 <span class="highlight">${surpassPercent}%</span> 的伪装者，处于 <span class="highlight">${level.label}</span> 等级。`;
  // 显示等级描述（移除旧的防止重复）
  const oldLevelDesc = document.querySelector('.dei-level-desc');
  if (oldLevelDesc) oldLevelDesc.remove();
  const levelDescEl = document.createElement('div');
  levelDescEl.className = 'dei-level-desc';
  levelDescEl.textContent = level.desc;
  const compareEl = $('dei-compare');
  compareEl.parentNode.insertBefore(levelDescEl, compareEl.nextSibling);

  // --- 模块三：雷达图 ---
  drawRadar(displayPcts);

  // --- 模块四：Top 3 ---
  const top3List = $('top3-list');
  top3List.innerHTML = '';
  const rankLabels = ['🏆 TOP 1', '🥈 TOP 2', '🥉 TOP 3'];

  top3.forEach((g, i) => {
    const pct = displayPcts[g.id];
    const dominateTag = i === 0 ? ' <span class="top3-dominate">[ 绝对主导 ]</span>' : '';
    const item = document.createElement('div');
    item.className = 'top3-item';
    item.innerHTML = `
      <div class="top3-rank">${rankLabels[i]}</div>
      <div class="top3-body">
        <div class="top3-name">${g.name} <span class="alias">${g.alias}</span> <span class="top3-pct">${pct}%</span>${dominateTag}</div>
        <div class="top3-comment">${g.sharpComment}</div>
      </div>
    `;
    top3List.appendChild(item);
  });

  // 化学反应
  $('chemistry-text').textContent = generateChemistry(top3);

  // --- 模块五：全维度展开 ---
  const genesContainer = $('all-genes-container');
  genesContainer.innerHTML = '';

  GENE_ORDER.forEach((geneId, index) => {
    const gene = getGeneConfig(geneId);
    const pct = displayPcts[geneId];
    const barPercent = Math.max(pct, 2);

    const row = document.createElement('div');
    row.className = 'gene-row';
    row.style.animationDelay = `${index * 0.08}s`;
    row.innerHTML = `
      <div class="gene-header">
        <span class="gene-name">${gene.name}</span>
        <span class="gene-score-text">${pct}%</span>
      </div>
      <div class="gene-bar-track">
        <div class="gene-bar-fill" style="width:0%"></div>
      </div>
      <div class="gene-comment">${gene.sharpComment}</div>
    `;
    genesContainer.appendChild(row);

    // 延迟动画
    setTimeout(() => {
      const fill = row.querySelector('.gene-bar-fill');
      fill.style.width = barPercent + '%';
    }, index * 80);
  });

  // --- 模块六：社交彩蛋 ---
  $('egg-trigger').textContent = dominant.triggerMoment;
  // 共犯
  const allyGene = getGeneConfig(dominant.ally);
  $('egg-ally').textContent = allyGene ? `${allyGene.alias}（${allyGene.name}）` : '无';
  // 宿敌
  const enemyGene = getGeneConfig(dominant.enemy);
  $('egg-enemy').textContent = enemyGene ? `${enemyGene.alias}（${enemyGene.name}）` : '无';
  // 等级
  $('egg-level').textContent = level.label;

  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 生成化学反应文案 =====
function generateChemistry(top3) {
  const [g1, g2, g3] = top3;

  // 每種基因的角色描述
  const roles = {
    arrogance: '用冷眼看世界的底气，赋予了你对平庸的零容忍和对卓越的绝对追求',
    hypocrisy: '用最完美的社交面具为你提供了最无懈可击的保护色',
    irritability: '体内涌动的怒火是你最诚实的武器——当忍无可忍时，你选择毁灭一切阻碍',
    apathy: '让你永远保持绝对冷静的旁观者视角，不被任何情绪裹挟',
    chaos: '让混乱成为你最擅长的棋局——秩序崩塌之时，就是你收割愉悦之际',
    paranoia: '驱使你织出一张密不透风的网，掌控是你在不确定的世界里唯一的安全感来源',
    greed: '让利益计算成为你的本能反应——每一步棋都经过了精准的投入产出比评估',
    covertNarc: '教会你"示弱"是最强大的进攻，眼泪和柔软是你最锋利的匕首'
  };

  // 组合类型判定（生成更精准的 combo 名称和总结）
  const combos = {
    arrogance_greed_hypocrisy: {
      title: '高智感猎手组合',
      summary: '你极其擅长用高情商的外表去榨取他人的价值。别人在进行情绪内耗，而你在进行精准的利益计算。在任何修罗场里，你都是那个兵不血刃就能拿到最多筹码的人。'
    },
    hypocrisy_greed_arrogance: {
      title: '高智感猎手组合',
      summary: '你极其擅长用高情商的外表去榨取他人的价值。别人在进行情绪内耗，而你在进行精准的利益计算。在任何修罗场里，你都是那个兵不血刃就能拿到最多筹码的人。'
    },
    paranoia_irritability_greed: {
      title: '偏执暴君组合',
      summary: '你的爱和恨都极度浓烈，不能掌控的就必须摧毁。你在关系中追求绝对的权力不对等，任何脱离你预期的波动都会触发你的攻击性。和你打交道的人需要时刻小心——因为你随时可能把柔情变成锁链。'
    },
    covertNarc_hypocrisy_paranoia: {
      title: '暗影操盘手组合',
      summary: '你是一个披着受害者外衣的权力玩家。你从不正面冲突，但总能在暗处操纵局面向你倾斜。你的武器是愧疚感、道德优势和隐秘的信息差——当你红着眼眶说"没关系"的时候，真正的猎杀才刚刚开始。'
    },
    chaos_hypocrisy_irritability: {
      title: '混沌破坏者组合',
      summary: '规则和法律在你眼里只是供人取乐的参考指南。你享受在失控的边缘反复试探的快感，他人的震惊和愤怒是你最好的精神食粮。你不是在捣乱——你只是觉得这个世界太无聊了，需要你来加点料。'
    },
    apathy_arrogance_greed: {
      title: '冰血贵族组合',
      summary: '你站在云端俯视众生，既不参与也不辩解。你的冷漠让你在危机中永远保持最优决策力，而你的傲慢让你不屑于解释任何选择。对周围的人而言，你像一座冰山——遥远、美丽，但靠近就会有危险。'
    }
  };

  // 查找匹配的 combo
  const comboKey = `${g1.id}_${g2.id}_${g3.id}`;
  const reversedKey = `${g3.id}_${g2.id}_${g1.id}`;
  const combo = combos[comboKey] || combos[reversedKey];

  if (combo) {
    return `【${combo.title}】\n${roles[g1.id]}。${roles[g2.id]}。${roles[g3.id]}。\n\n${combo.summary}`;
  }

  // 未匹配预定义组合则动态生成
  return `你的${g1.name}、${g2.name}与${g3.name}三种特质形成了独特的化学反应：\n${roles[g1.id]}。${roles[g2.id]}。${roles[g3.id]}。\n\n这种组合让你在现实中极具杀伤力——你不是传统意义上的"坏人"，而是一个让对手永远猜不透下一步的存在。`;
}

// ===== 绘制雷达图（动态最大值归一化） =====
function drawRadar(displayPcts) {
  const canvas = $('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const W = 320, H = 320;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);
  const cx = W / 2, cy = H / 2;
  const R = 125;
  const n = GENE_ORDER.length;

  // 直接使用经 2.5× 放大器处理后的展示百分比
  const userPcts = GENE_ORDER.map(id => displayPcts[id] || 0);

  // 人群均分百分比
  const avgPcts = GENE_ORDER.map(id => {
    const gene = getGeneConfig(id);
    return gene ? gene.avgPct : 25;
  });

  // 动态最大值归一化：以用户最高分作为雷达图外圈
  // 确保即使所有维度都很低的用户，其最高维度也能推到边缘
  const userMax = Math.max(...userPcts);
  const ceiling = Math.max(userMax, 25); // 最小 25%，防止数字太低时图形诡异

  // 辅助函数：百分比 → 画布坐标
  function getPoint(i, pct) {
    const angle = i * (2 * Math.PI / n) - Math.PI / 2;
    const r = (pct / ceiling) * R;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  ctx.clearRect(0, 0, W, H);

  // ---- 网格 ----
  const levels = 5;
  for (let lv = 1; lv <= levels; lv++) {
    const r = (R / levels) * lv;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const angle = idx * (2 * Math.PI / n) - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = lv === levels ? '#E5E2DB' : '#EFEDE8';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ---- 辐射线 ----
  for (let i = 0; i < n; i++) {
    const angle = i * (2 * Math.PI / n) - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
    ctx.strokeStyle = '#EFEDE8';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ---- 基因名称标签 ----
  const geneNames = GENE_ORDER.map(id => getGeneConfig(id).name);
  for (let i = 0; i < n; i++) {
    const angle = i * (2 * Math.PI / n) - Math.PI / 2;
    const lr = R + 22;
    const x = cx + lr * Math.cos(angle);
    const y = cy + lr * Math.sin(angle);
    ctx.shadowColor = 'rgba(249, 248, 245, 0.8)';
    ctx.shadowBlur = 4;
    ctx.fillStyle = i === 0 ? '#8A1C2E' : '#5A5550';
    ctx.font = 'bold 13px "Noto Sans SC", "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(geneNames[i], x, y);
    ctx.shadowBlur = 0;
  }

  // ---- 人群均分线（浅冷灰虚线） ----
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const pt = getPoint(idx, avgPcts[idx]);
    i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
  }
  ctx.closePath();
  ctx.strokeStyle = '#C4C0BA';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // ---- 用户得分线（勃艮第酒红实线） ----
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const pt = getPoint(idx, userPcts[idx]);
    i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
  }
  ctx.closePath();

  // 填充
  ctx.fillStyle = 'rgba(138, 28, 46, 0.30)';
  ctx.fill();
  // 描边
  ctx.strokeStyle = '#8A1C2E';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // ---- 用户数据点 ----
  for (let i = 0; i < n; i++) {
    const pt = getPoint(i, userPcts[i]);

    // 外发光
    const gradient = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 8);
    gradient.addColorStop(0, 'rgba(138, 28, 46, 0.5)');
    gradient.addColorStop(1, 'rgba(138, 28, 46, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 8, 0, 2 * Math.PI);
    ctx.fill();

    // 实心点
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#8A1C2E';
    ctx.fill();
    ctx.strokeStyle = '#F9F8F5';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

// ===== 分享为图片 =====
async function shareResult() {
  const btn = document.querySelector('.share-btn');
  const origText = btn.textContent;
  btn.textContent = '生成海报中...';
  btn.disabled = true;

  // 检查 html2canvas 是否可用
  if (typeof html2canvas === 'undefined') {
    btn.textContent = '⚠ 加载分享库失败，请手动截图保存';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = origText; }, 2000);
    return;
  }

  try {
    const container = $('result-container');
    // 临时增大宽度以确保截图完整
    const origWidth = container.style.maxWidth;
    container.style.maxWidth = '390px';

    const canvas = await html2canvas(container, {
      backgroundColor: '#0B0C10',
      scale: 2,
      useCORS: true,
      logging: false,
      width: 390,
      windowWidth: 390
    });

    container.style.maxWidth = origWidth;

    const link = document.createElement('a');
    link.download = '暗黑人格鉴定报告.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    btn.textContent = '✅ 海报已生成';
    setTimeout(() => { btn.textContent = origText; }, 2000);
  } catch (e) {
    console.error('Share error:', e);
    btn.textContent = '⚠ 生成失败，请尝试截图保存';
    setTimeout(() => { btn.textContent = origText; }, 2000);
  }

  btn.disabled = false;
}

// ===== 重新测试 =====
function resetTest() {
  if (confirm('确定要重新测试吗？当前结果将丢失。')) {
    // 清除多余的等级描述
    const extraDesc = document.querySelector('.dei-level-desc');
    if (extraDesc) extraDesc.remove();
    startQuiz();
  }
}
