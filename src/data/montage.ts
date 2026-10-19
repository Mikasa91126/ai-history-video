/**
 * 模型编年快闪名录 —— 数据来自《事实手册》核查版（2026-10-17）
 * 与补充核查（2026-10-17，均带来源；快手/Kling 已按用户要求移除）。
 * primary: true = 32 个「主名字」，每拍一个（1800f / 32 ≈ 56.25f，与 BPM 63.9 对齐）；
 * primary: false = 「同期」伴随名单，挂在相邻主名字那一拍上一起展示。
 */
export type MontageItem = {
  date: string;
  name: string;
  company: string;
  kind: "model" | "product" | "research" | "video" | "image" | "agent";
  note: string;
  primary?: boolean;
  accent?: string;
};

export const MONTAGE: MontageItem[] = [
  { date: "2023.03", name: "GPT-4", company: "OpenAI", kind: "model", note: "多模态旗舰", primary: true },
  { date: "2023.03", name: "Midjourney v5", company: "Midjourney", kind: "image", note: "第五代图像模型", primary: true },
  { date: "2023.07", name: "Llama 2", company: "Meta", kind: "model", note: "开放权重三档", primary: true },
  { date: "2024.02", name: "Sora（预览）", company: "OpenAI", kind: "video", note: "文本生成视频预览", primary: true },
  { date: "2024.05", name: "GPT-4o", company: "OpenAI", kind: "model", note: "全模态实时交互", primary: true },
  { date: "2024.06", name: "Claude 3.5 Sonnet", company: "Anthropic", kind: "model", note: "Anthropic 中坚", primary: true },
  { date: "2024.07", name: "Llama 3.1 405B", company: "Meta", kind: "model", note: "405B 开放权重", primary: true },
  { date: "2024.08", name: "FLUX.1", company: "Black Forest Labs", kind: "image", note: "开放权重图像模型", primary: true },
  { date: "2024.09", name: "o1-preview", company: "OpenAI", kind: "model", note: "推理模型预览", primary: true },
  { date: "2024.12", name: "DeepSeek-V3", company: "DeepSeek", kind: "model", note: "开放权重旗舰", primary: true },
  { date: "2025.01", name: "DeepSeek-R1", company: "DeepSeek", kind: "model", note: "纯 RL 推理 · MIT", primary: true },
  { date: "2025.02", name: "Claude Code", company: "Anthropic", kind: "agent", note: "终端编码 agent", primary: true },
  { date: "2025.03", name: "Manus", company: "蝴蝶效应", kind: "agent", note: "通用任务 agent", primary: true },
  { date: "2025.04", name: "Qwen3", company: "阿里巴巴", kind: "model", note: "235B-A22B · Apache 2.0", primary: true },
  { date: "2025.05", name: "Veo 3", company: "Google DeepMind", kind: "video", note: "原生音画同出", primary: true },
  { date: "2025.07", name: "Kimi K2", company: "月之暗面", kind: "model", note: "1T MoE 开放权重", primary: true },
  { date: "2025.08", name: "GPT-5", company: "OpenAI", kind: "model", note: "OpenAI 第五代", primary: true },
  { date: "2025.08", name: "Nano Banana", company: "Google DeepMind", kind: "image", note: "Gemini 图像模型", primary: true },
  { date: "2025.09", name: "Claude Sonnet 4.5", company: "Anthropic", kind: "model", note: "Anthropic 4.5 中坚", primary: true },
  { date: "2025.09", name: "Sora 2", company: "OpenAI", kind: "video", note: "新一代视频生成", primary: true },
  { date: "2025.11", name: "Gemini 3 Pro", company: "Google DeepMind", kind: "model", note: "Google 第三代旗舰", primary: true },
  { date: "2025.11", name: "Claude Opus 4.5", company: "Anthropic", kind: "model", note: "Anthropic 旗舰", primary: true },
  { date: "2026.02", name: "GLM-5", company: "智谱", kind: "model", note: "744B MoE 开放权重", primary: true },
  { date: "2026.02", name: "Qwen3.5", company: "阿里巴巴", kind: "model", note: "397B-A17B 多模态", primary: true },
  { date: "2026.04", name: "DeepSeek-V4", company: "DeepSeek", kind: "model", note: "1.6T MoE · 1M（Pro）", primary: true },
  { date: "2026.06", name: "Claude Fable 5", company: "Anthropic", kind: "model", note: "Anthropic Mythos 级", primary: true },
  { date: "2026.07", name: "Kimi K3", company: "月之暗面", kind: "model", note: "2.8T MoE · 1M", primary: true },
  { date: "2026.09", name: "GPT-6 Astra", company: "OpenAI", kind: "model", note: "电脑操作 · 安全", primary: true },
  { date: "2026.09", name: "DeepSeek-V4.1 Flash", company: "DeepSeek", kind: "model", note: "高效稀疏架构", primary: true },
  { date: "2026.10", name: "Gemini 4 Argon", company: "Google DeepMind", kind: "model", note: "深度编码 · 安全", primary: true },
  { date: "2023.07", name: "SDXL 1.0", company: "Stability AI", kind: "image", note: "开源生图换代" },
  { date: "2023.09", name: "DALL·E 3", company: "OpenAI", kind: "image", note: "OpenAI 生图", primary: true },
  { date: "2023.11", name: "GPT-4 Turbo", company: "OpenAI", kind: "model", note: "128K 上下文" },
  { date: "2023.12", name: "Gemini 1.0", company: "Google DeepMind", kind: "model", note: "Google 多模态" },
  { date: "2024.02", name: "Gemini 1.5 Pro", company: "Google DeepMind", kind: "model", note: "百万级上下文" },
  { date: "2024.03", name: "Claude 3", company: "Anthropic", kind: "model", note: "长上下文与视觉" },
  { date: "2024.05", name: "DeepSeek-V2", company: "DeepSeek", kind: "model", note: "MLA · 缓存骤降", primary: true },
  { date: "2024.05", name: "Veo", company: "Google DeepMind", kind: "video", note: "Google 视频模型" },
  { date: "2024.06", name: "Runway Gen-3", company: "Runway", kind: "video", note: "新一代视频生成" },
  { date: "2024.08", name: "Hailuo", company: "MiniMax", kind: "video", note: "MiniMax 视频模型" },
  { date: "2025.02", name: "Claude 3.7 Sonnet", company: "Anthropic", kind: "model", note: "混合推理" },
  { date: "2025.03", name: "Gemini 2.5 Pro", company: "Google DeepMind", kind: "model", note: "Google 推理旗舰" },
  { date: "2026.04", name: "GPT-5.5", company: "OpenAI", kind: "model", note: "新一代基座" },
  { date: "2026.05", name: "Gemini Omni", company: "Google DeepMind", kind: "video", note: "对话式视频编辑" },
  { date: "2023.12", name: "Midjourney v6", company: "Midjourney", kind: "image", note: "写实与文字" },
  { date: "2024.03", name: "Grok-1", company: "xAI", kind: "model", note: "314B 开源" },
  { date: "2025.03", name: "Runway Gen-4", company: "Runway", kind: "video", note: "角色跨镜一致" },
  { date: "2025.04", name: "Midjourney v7", company: "Midjourney", kind: "image", note: "个性化与草稿" },
  { date: "2025.07", name: "Grok-4", company: "xAI", kind: "model", note: "原生工具调用" },
  { date: "2025.10", name: "Veo 3.1", company: "Google DeepMind", kind: "video", note: "一分钟音画" },
  { date: "2025.10", name: "Hailuo 2.3", company: "MiniMax", kind: "video", note: "复杂物理动作" },
  { date: "2025.12", name: "Tencent HY 2.0", company: "腾讯", kind: "model", note: "混元更名 HY" },
  { date: "2026.01", name: "Claude Cowork", company: "Anthropic", kind: "agent", note: "办公文件 agent" },
  { date: "2026.01", name: "Kimi K2.5", company: "月之暗面", kind: "model", note: "Agent 集群" },
  { date: "2026.02", name: "Step 3.5 Flash", company: "阶跃星辰", kind: "model", note: "开源 Agent 基座" },
  { date: "2026.02", name: "MiniMax M2.5", company: "MiniMax", kind: "model", note: "生产级 Agent" },
  { date: "2026.02", name: "Seedance 2.0", company: "字节跳动", kind: "video", note: "2K 原生音画" },
  { date: "2026.02", name: "Doubao 2.0", company: "字节跳动", kind: "model", note: "首次跨代升级" },
  { date: "2026.02", name: "Gemini 3.1 Pro", company: "Google DeepMind", kind: "model", note: "核心推理升级" },
  { date: "2026.05", name: "Antigravity 2.0", company: "Google", kind: "product", note: "智能体 IDE" },
  { date: "2026.05", name: "Gemini 3.5 Flash", company: "Google DeepMind", kind: "model", note: "Agent 默认模型" },
  { date: "2026.06", name: "Claude Sonnet 5", company: "Anthropic", kind: "model", note: "百万上下文" },
  { date: "2026.07", name: "Grok 4.5", company: "SpaceXAI", kind: "model", note: "Opus 级编程" },
  { date: "2026.07", name: "Claude Opus 5", company: "Anthropic", kind: "model", note: "半价 Fable 级" },
  { date: "2026.08", name: "Qwen3.8-Max", company: "阿里巴巴", kind: "model", note: "2.4T 开放权重" },
  { date: "2026.09", name: "Muse Spark 1.3", company: "Meta MSL", kind: "model", note: "编程 Agent" },
  { date: "2026.09", name: "Claude Opus 5.5", company: "Anthropic", kind: "model", note: "旗舰提速降价" },
  { date: "2026.09", name: "ChatGPT Space", company: "OpenAI", kind: "product", note: "团队协作空间" },
];

/** 主名字序列（32 拍，严格按日期排序） */
export const MONTAGE_PRIMARY: MontageItem[] = MONTAGE.filter((m) => m.primary).sort(
  (a, b) => a.date.localeCompare(b.date),
);

/** 第 i 拍挂载的「同期」名单（日期落在上一主名字之后、当前主名字之前） */
export const companionFor = (i: number): MontageItem[] => {
  const cur = MONTAGE_PRIMARY[i];
  if (!cur) return [];
  const prevDate = i > 0 ? MONTAGE_PRIMARY[i - 1].date : "0000";
  return MONTAGE
    .filter((m) => !m.primary && m.date > prevDate && m.date <= cur.date)
    .sort((a, b) => a.date.localeCompare(b.date));
};

/** 公司 → 官方 logo 文件名（public/logos/xxx.svg）；没有则返回 null */
export const companyLogo = (company: string): string | null => {
  const map: Record<string, string> = {
    Anthropic: "claude",
    Claude: "claude",
    OpenAI: "openai",
    Google: "google",
    "Google DeepMind": "google",
    DeepSeek: "deepseek",
    Meta: "meta",
    "Meta MSL": "meta",
    Midjourney: "midjourney",
    "Stability AI": "stability",
    "Black Forest Labs": "bfl",
    "阿里巴巴": "qwen",
    "智谱": "zhipu",
    MiniMax: "minimax",
    Runway: "runway",
    xAI: "xai",
    SpaceXAI: "xai",
    "字节跳动": "doubao",
    ByteDance: "doubao",
    Doubao: "doubao",
    "月之暗面": "kimi",
    Moonshot: "kimi",
    Kimi: "kimi",
    Manus: "manus",
  };
  return map[company] ?? null;
};
