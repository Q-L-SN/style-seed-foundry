const GUIDE = `引导语：
你将把下面的风格种子作为当前任务的隐性风格约束。它不是题材、角色、世界观、媒介类型或可复现参数，而是一组用于改变表达质地、结构取舍和感知倾向的抽象触发词。请在完成用户原始任务的前提下吸收这些词的节奏、联想、密度、张力和感官倾向；不要逐字解释这些词，不要把它们写成清单，不要模仿常见的 AI 模板腔、过度圆滑的总结腔、套路化比喻或训练语料里陈旧的安全风格。最终结果应当随机、独特、陌生但连贯。`;

const MODIFIERS = [
  "aberrant", "ablative", "absent", "acidic", "acousmatic", "aerial", "aesthetic", "afterglow",
  "alchemical", "ambient", "amorphous", "angular", "anomalous", "aphotic", "archival", "ashen",
  "asymmetric", "aural", "baroque", "basalt", "binary", "botanical", "brackish", "brass",
  "brittle", "calibrated", "cartographic", "cellular", "ceramic", "chromatic", "cinder", "circular",
  "clandestine", "clinical", "clouded", "coastal", "cognitive", "cold", "compressed", "concentric",
  "coral", "corrosive", "crystalline", "damp", "decimal", "delirious", "diffuse", "digital",
  "dormant", "driftless", "electric", "elliptic", "ember", "embodied", "eroded", "errant",
  "feral", "ferrous", "fibrous", "filmic", "fissured", "fossil", "fractal", "fugitive",
  "geologic", "glacial", "granular", "haptic", "hollow", "humid", "hydraulic", "infrared",
  "inked", "interior", "kinetic", "lacquered", "lateral", "latticed", "lunar", "magnetic",
  "maritime", "mechanical", "mercurial", "mineral", "mnemonic", "modular", "monastic", "morphic",
  "muted", "noctilucent", "oblique", "obsidian", "ocular", "orbital", "oxidized", "papery",
  "percussive", "porous", "prismatic", "procedural", "quartz", "radial", "recursive", "residual",
  "salted", "satellite", "saturated", "seismic", "serpentine", "signal", "silicate", "skeletal",
  "slanted", "solar", "spectral", "staccato", "static", "stray", "striated", "submerged",
  "sulfur", "tactile", "thermal", "tidal", "topographic", "translucent", "ultraviolet", "unruly",
  "velvet", "verdant", "vespertine", "visceral", "voltaic", "weathered", "xenial", "zinc"
];

const CONCEPTS = [
  "absence", "abstraction", "acceleration", "afterimage", "ambiguity", "amplitude", "anxiety", "apparition",
  "architecture", "archive", "ascent", "asymmetry", "aura", "balance", "behavior", "breath",
  "cadence", "calm", "cartography", "chance", "clarity", "coherence", "collision", "composition",
  "contour", "contradiction", "current", "decay", "density", "depth", "deviation", "diffraction",
  "distance", "distortion", "drift", "duration", "echo", "edge", "elasticity", "emergence",
  "entropy", "erosion", "excess", "friction", "gesture", "glimmer", "gravity", "haze",
  "horizon", "impulse", "inertia", "interval", "intuition", "latency", "lattice", "limit",
  "logic", "memory", "migration", "mirror", "murmur", "mutation", "noise", "orbit",
  "pattern", "periphery", "pressure", "pulse", "rupture", "sequence", "silence", "signal",
  "texture", "threshold", "topology", "trace", "velocity", "vibration", "void", "weather"
];

const EXTRA_WORDS = [
  "abeyance", "absorption", "accretion", "adumbration", "aeration", "affordance", "alluvium", "anabasis",
  "anaphora", "aperture", "apophenia", "aporia", "arabesque", "arborescence", "arcature", "assemblage",
  "ataraxia", "autotelic", "bandwidth", "becoming", "belatedness", "bifurcation", "bricolage", "cathexis",
  "chiaroscuro", "chiasmus", "cipher", "circumference", "coalescence", "coda", "concordance", "continuum",
  "counterpoint", "crepuscule", "defamiliarization", "diapason", "diaspora", "dissonance", "elegy", "ellipsis",
  "enigma", "ephemera", "equilibrium", "evanescence", "fidelity", "filament", "fugue", "glossolalia",
  "heuristic", "hypostasis", "iconoclasm", "immanence", "interstice", "isomorph", "kinesis", "lacuna",
  "liminality", "manifold", "metonymy", "mimesis", "negative-space", "noesis", "obliquity", "palimpsest",
  "parallax", "penumbra", "phosphor", "polyphony", "prosody", "quiddity", "remainder", "reverie",
  "rhizome", "saccade", "schema", "semantic-drift", "simulacrum", "synapse", "syncope", "tessellation",
  "tremor", "umbrage", "valence", "vector", "verisimilitude", "vortex", "wavelength", "zeugma"
];

const WORD_BANK = buildWordBank();
const elements = {
  bankCount: document.querySelector("#bankCount"),
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
let generatedCount = 0;
let currentSeed = null;
let toastTimer = 0;

elements.bankCount.textContent = WORD_BANK.length.toLocaleString("en-US");
drawCanvas(["latent", "signal", "texture"]);

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

elements.generateBtn.addEventListener("click", () => {
  const keywords = pickUnique(WORD_BANK, selectedCount);
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

function buildWordBank() {
  const compoundWords = MODIFIERS.flatMap((modifier) =>
    CONCEPTS.map((concept) => `${modifier}-${concept}`)
  );
  return [...new Set([...compoundWords, ...MODIFIERS, ...CONCEPTS, ...EXTRA_WORDS])].sort();
}

function buildPrompt(keywords) {
  const rows = keywords.map((keyword, index) => `| ${index + 1} | ${keyword} |`).join("\n");

  return `${GUIDE}

关键词表：
| # | Keyword |
|---|---|
${rows}`;
}

function buildSkillMarkdown(seed) {
  return `---
name: style-seed-${seed.id}
description: Apply this generated style seed when an LLM task needs a distinct, non-template style shaped by abstract English keywords.
---

# Style Seed ${seed.id}

Use this skill when an LLM task needs a random and unusual style direction.

## Style Seed Prompt

${seed.prompt}
`;
}

function pickUnique(source, count) {
  const picked = new Set();
  while (picked.size < count) {
    picked.add(source[randomInt(source.length)]);
  }
  return [...picked];
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
    ...keywords.map((keyword) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = keyword;
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

function drawCanvas(keywords) {
  const canvas = elements.seedCanvas;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const palette = makePalette(keywords.join("|"));

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

  const seed = hashString(keywords.join(""));
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
  keywords.forEach((keyword, index) => {
    const y = 72 + index * 54;
    const x = 54 + seededNoise(seed + index * 97) * 150;
    const lineWidth = 230 + seededNoise(seed + index * 47) * 370;

    context.strokeStyle = palette[index % palette.length];
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(x + 90, y - 42, x + lineWidth - 110, y + 44, x + lineWidth, y);
    context.stroke();

    context.font = "700 28px Georgia, serif";
    context.fillStyle = "#fffdf8";
    context.fillText(keyword, x + 12, y - 14);
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
