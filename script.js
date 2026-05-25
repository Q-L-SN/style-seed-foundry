const GUIDE = `引导语：
你将把下面的风格种子作为当前任务的隐性风格约束。它不是题材、角色、世界观、媒介类型或可复现参数，而是一组来自不同词库的触发词/短语，用于改变表达质地、结构取舍、感知倾向和陌生化方向。请在完成用户原始任务的前提下吸收这些词的节奏、联想、密度、张力和感官倾向；不要逐字解释这些词，不要把它们写成清单，不要模仿常见的 AI 模板腔、过度圆滑的总结腔、套路化比喻或训练语料里陈旧的安全风格。最终结果应当随机、独特、陌生但连贯。`;

const RAW_BANKS = [
  {
    id: "real",
    label: "现实词库",
    description: "可直接改变外观、质感、界面、色彩、技术时代感和约束条件的词。",
    seeds: [
      "柠檬黄", "赛博朋克风格", "无圆角", "暗黑风格", "金属拉丝", "磨砂玻璃", "低饱和",
      "高对比", "霓虹边缘", "报纸排版", "热敏纸", "像素字体", "工业灰", "荧光绿",
      "黑白摄影", "陶土红", "蓝图线框", "硬阴影", "窄边框", "高密度信息"
    ],
    left: [
      "柠檬黄", "钴蓝", "荧光绿", "钛白", "煤黑", "番茄红", "薄荷青", "电光紫",
      "琥珀橙", "石墨灰", "孔雀蓝", "赭石", "银箔", "铜绿", "柏油黑", "奶油白",
      "霓虹粉", "钢蓝", "砂岩黄", "夜航蓝", "冷杉绿", "警示橙", "旧纸色", "冰川白"
    ],
    right: [
      "极细描边", "无圆角", "大圆角", "暗黑风格", "赛博朋克风格", "低多边形",
      "硬栅格", "粗颗粒", "玻璃拟态", "金属拉丝", "塑料外壳", "陶瓷质感",
      "电路纹理", "胶片颗粒", "街机按钮", "工业标签", "仪表盘", "纸张折痕",
      "高密度排版", "极简留白", "等宽字体", "窄屏比例", "低照度", "强反差",
      "扫描线", "复印机噪点", "机械铆钉", "液晶残影", "热敏纸", "手册插图"
    ]
  },
  {
    id: "image",
    label: "意象词库",
    description: "偏画面、情绪、物象、空气感和感官记忆的词。",
    seeds: [
      "权力", "和风细雨", "记忆", "柴火", "潮湿楼梯", "旧窗帘", "雾里灯塔",
      "纸鸢", "盐粒", "空椅子", "雨后铁轨", "药草味", "凌晨钟声", "远处犬吠",
      "碎瓷片", "船舱木纹", "未寄出的信", "火盆余温", "低垂云层", "旧照片背面"
    ],
    left: [
      "权力", "记忆", "柴火", "雨声", "潮汐", "灯塔", "炉灰", "窗帘", "庭院",
      "雾气", "铜铃", "纸鸢", "河岸", "落雪", "稻田", "旧照片", "盐粒", "药草",
      "木门", "茶水", "夜航", "空椅子", "碎瓷", "钟声", "桥洞", "风铃"
    ],
    right: [
      "和风细雨", "被擦亮", "缓慢下沉", "暗自发热", "停在门口", "反复回潮",
      "带着裂纹", "隔着雾", "像旧信", "低声回响", "贴近皮肤", "被风吹散",
      "藏在袖口", "有炭火味", "铺满灰尘", "靠近水面", "微微失焦", "留有余温",
      "过早成熟", "半明半暗", "尚未命名", "在远处闪烁", "沉默地扩散", "慢慢变轻",
      "被雨打湿", "像一口井", "背光站立", "迟迟不响"
    ]
  },
  {
    id: "drift",
    label: "抽象偏移词库",
    description: "八竿子打不着的制度、身份、成语、地点和关系词，用来打断惯性。",
    seeds: [
      "治理", "游客", "殃及池鱼", "洛阳纸贵", "备案号", "抽样误差", "临时工",
      "排队系统", "债务重组", "斡旋", "旁听席", "粮票", "县志", "误伤友军",
      "滞纳金", "围魏救赵", "候车室", "月度汇报", "异地登录", "边境口岸"
    ],
    left: [
      "治理", "游客", "备案号", "抽样误差", "临时工", "排队系统", "债务重组", "旁听席",
      "粮票", "县志", "滞纳金", "听证会", "预算表", "通行证", "审计", "口岸",
      "暗号", "税目", "水印", "代理人", "样本", "驿站", "公函", "码头",
      "勘误", "仲裁", "目录", "库存"
    ],
    right: [
      "殃及池鱼", "洛阳纸贵", "围魏救赵", "借壳上市", "异地登录", "误伤友军",
      "临门一脚", "因噎废食", "朝令夕改", "缓期执行", "跨区调拨", "就地取材",
      "纸面合规", "暗箱校准", "旁路生效", "无人认领", "临时备案", "反向报销",
      "迟到的许可", "虚线管辖", "过期样本", "候补名单", "旧账重提", "低频扰动",
      "第二现场", "灰色流程", "边界溢出", "名义缺席"
    ]
  }
];

const WORD_BANKS = buildBanks(RAW_BANKS);
const ALL_WORDS = WORD_BANKS.flatMap((bank) => bank.words.map((word) => ({ ...word, bank })));
const elements = {
  bankCount: document.querySelector("#bankCount"),
  bankHint: document.querySelector("#bankHint"),
  bankOptions: document.querySelectorAll(".bank-option"),
  copyBtn: document.querySelector("#copyBtn"),
  generateBtn: document.querySelector("#generateBtn"),
  keywordChips: document.querySelector("#keywordChips"),
  promptOutput: document.querySelector("#promptOutput"),
  resultActions: document.querySelector("#resultActions"),
  saveBtn: document.querySelector("#saveBtn"),
  seedCanvas: document.querySelector("#seedCanvas"),
  seedCount: document.querySelector("#seedCount"),
  seedTitle: document.querySelector("#seedTitle"),
  segments: document.querySelectorAll(".segment"),
  toast: document.querySelector("#toast")
};

let selectedCount = 3;
let selectedBankMode = "mixed";
let generatedCount = 0;
let currentSeed = null;
let toastTimer = 0;

elements.bankCount.textContent = ALL_WORDS.length.toLocaleString("en-US");
updateBankHint();
drawCanvas([
  { value: "柠檬黄 无圆角", bankId: "real", bankLabel: "现实词库", bank: WORD_BANKS[0] },
  { value: "记忆 有炭火味", bankId: "image", bankLabel: "意象词库", bank: WORD_BANKS[1] },
  { value: "治理 洛阳纸贵", bankId: "drift", bankLabel: "抽象偏移词库", bank: WORD_BANKS[2] }
]);

elements.segments.forEach((segment) => {
  segment.addEventListener("click", () => {
    selectedCount = Number(segment.dataset.count);
    elements.segments.forEach((item) => {
      const active = item === segment;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-checked", String(active));
    });
  });
});

elements.bankOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectedBankMode = option.dataset.bankMode;
    elements.bankOptions.forEach((item) => {
      const active = item === option;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-checked", String(active));
    });
    updateBankHint();
  });
});

elements.generateBtn.addEventListener("click", () => {
  const keywords = pickSeedItems(selectedCount, selectedBankMode);
  const id = makeSeedId();
  const prompt = buildPrompt(keywords);

  currentSeed = { id, keywords, prompt };
  generatedCount += 1;

  elements.seedCount.textContent = String(generatedCount);
  elements.seedTitle.textContent = `Seed ${id}`;
  elements.promptOutput.textContent = prompt;
  elements.promptOutput.classList.remove("is-new");
  void elements.promptOutput.offsetWidth;
  elements.promptOutput.classList.add("is-new");
  elements.resultActions.hidden = false;
  renderChips(keywords);
  drawCanvas(keywords);

  elements.generateBtn.classList.remove("is-spinning");
  void elements.generateBtn.offsetWidth;
  elements.generateBtn.classList.add("is-spinning");
});

elements.copyBtn.addEventListener("click", async () => {
  if (!currentSeed) return;
  try {
    await copyText(currentSeed.prompt);
    showToast("提示词已复制");
  } catch {
    elements.promptOutput.focus();
    showToast("复制失败，请手动选择文本");
  }
});

elements.saveBtn.addEventListener("click", async () => {
  if (!currentSeed) return;
  const content = buildSkillMarkdown(currentSeed);
  const filename = `style-seed-${currentSeed.id}-SKILL.md`;

  try {
    if ("showSaveFilePicker" in window) {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: "Markdown Skill",
            accept: { "text/markdown": [".md"] }
          }
        ]
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      showToast("Skill 已保存");
      return;
    }

    downloadText(filename, content);
    showToast("Skill 文件已下载");
  } catch (error) {
    if (error.name !== "AbortError") {
      downloadText(filename, content);
      showToast("已改用下载保存");
    }
  }
});

function buildBanks(rawBanks) {
  const seen = new Set();

  return rawBanks.map((bank) => {
    const phrases = bank.left.flatMap((left) => bank.right.map((right) => `${left} ${right}`));
    const words = [];

    [...bank.seeds, ...bank.left, ...bank.right, ...phrases].forEach((rawValue) => {
      const value = normalizeWord(rawValue);
      if (value && !value.includes("-") && !seen.has(value)) {
        seen.add(value);
        words.push({ value, bankId: bank.id, bankLabel: bank.label });
      }
    });

    words.sort((a, b) => a.value.localeCompare(b.value, "zh-Hans-CN"));

    return { ...bank, words };
  });
}

function normalizeWord(value) {
  return value.trim().replace(/\s+/g, " ");
}

function updateBankHint() {
  const active = getActiveBanks();
  elements.bankHint.textContent = active
    .map((bank) => `${bank.label} ${bank.words.length.toLocaleString("en-US")}`)
    .join(" / ");
}

function getActiveBanks() {
  if (selectedBankMode === "mixed") return WORD_BANKS;
  return WORD_BANKS.filter((bank) => bank.id === selectedBankMode);
}

function pickSeedItems(count, mode) {
  const picked = new Set();
  const items = [];
  const banks = mode === "mixed" ? shuffle(WORD_BANKS) : getActiveBanks();

  while (items.length < count) {
    const bank = banks[items.length % banks.length];
    const word = bank.words[randomInt(bank.words.length)];
    const key = `${bank.id}:${word.value}`;
    if (picked.has(key)) continue;
    picked.add(key);
    items.push({ ...word, bank });
  }

  return shuffle(items);
}

function buildPrompt(keywords) {
  const rows = keywords
    .map((item, index) => `${index + 1} | ${item.bankLabel} | ${item.value}`)
    .join("\n");

  return `${GUIDE}

关键词/短语表：
# | 词库 | Keyword
${rows}`;
}

function buildSkillMarkdown(seed) {
  return `---
name: style-seed-${seed.id}
description: Apply this generated multi-bank style seed when an LLM task needs a distinct, non-template style direction.
---

# Style Seed ${seed.id}

Use this skill when an LLM task needs a random and unusual style direction.

## Style Seed Prompt

${seed.prompt}
`;
}

function shuffle(source) {
  const items = [...source];
  for (let index = items.length - 1; index > 0; index -= 1) {
    const target = randomInt(index + 1);
    [items[index], items[target]] = [items[target], items[index]];
  }
  return items;
}

function randomInt(max) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % max;
}

function makeSeedId() {
  const bytes = new Uint8Array(3);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function renderChips(keywords) {
  elements.keywordChips.replaceChildren(
    ...keywords.map((item) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.dataset.bank = item.bankId;
      chip.textContent = `${item.bankLabel} · ${item.value}`;
      return chip;
    })
  );
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the legacy copy path when browser permissions block Clipboard API.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "-999px auto auto -999px";
  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) {
    throw new Error("copy failed");
  }
}

function downloadText(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 1800);
}

function drawCanvas(items) {
  const canvas = elements.seedCanvas;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const seedText = items.map((item) => item.value).join("|");
  const palette = makePalette(seedText);

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#151515";
  context.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y += 22) {
    context.strokeStyle = `rgba(255,253,248,${0.055 + (y / height) * 0.04})`;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(width, y + 0.5);
    context.stroke();
  }

  const seed = hashString(seedText);
  for (let i = 0; i < 180; i += 1) {
    const a = seededNoise(seed + i * 19);
    const b = seededNoise(seed + i * 31);
    const c = seededNoise(seed + i * 43);
    const x = a * width;
    const y = b * height;
    const size = 1.5 + c * 4;

    context.fillStyle = palette[i % palette.length];
    context.globalAlpha = 0.18 + seededNoise(seed + i * 7) * 0.62;
    context.fillRect(x, y, size, size);
  }

  context.globalAlpha = 0.95;
  items.forEach((item, index) => {
    const y = 72 + index * 54;
    const x = 54 + seededNoise(seed + index * 97) * 150;
    const lineWidth = 230 + seededNoise(seed + index * 47) * 370;
    const text = `${item.bankLabel}: ${item.value}`;

    context.strokeStyle = palette[index % palette.length];
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(x + 90, y - 42, x + lineWidth - 110, y + 44, x + lineWidth, y);
    context.stroke();

    context.font = "700 25px Georgia, 'Microsoft YaHei', serif";
    context.fillStyle = "#fffdf8";
    context.fillText(text, x + 12, y - 14, 720);
  });

  context.globalAlpha = 1;
  context.strokeStyle = "rgba(255,253,248,0.28)";
  context.lineWidth = 1;
  context.strokeRect(28.5, 28.5, width - 57, height - 57);
}

function makePalette(seedText) {
  const palettes = [
    ["#d94a36", "#e3b341", "#176f8f", "#f7f4ec"],
    ["#47785a", "#c25745", "#5b7fb2", "#f3d36b"],
    ["#e36f3e", "#2f8a88", "#f0c74f", "#f6efe3"],
    ["#bd3f55", "#347c65", "#d4a92f", "#8aa6d6"]
  ];
  return palettes[hashString(seedText) % palettes.length];
}

function hashString(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededNoise(value) {
  const x = Math.sin(value) * 10000;
  return x - Math.floor(x);
}
