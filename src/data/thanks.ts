/**
 * 致谢名单 —— 数据来自《事实手册》核查版（2026-10-17）+ 用户要求：
 * 按「开源 / 闭源」分组，并加入「华为昇腾」（CANN 于 2025-08 宣布全面开源开放，归入开源组）。
 */
export type ThanksEntry = { name: string; note?: string; logo?: string };

export const THANKS_LOGOS: ThanksEntry[] = [
  { name: "OpenAI", logo: "openai" },
  { name: "Google DeepMind", logo: "google" },
  { name: "Anthropic", logo: "claude" },
  { name: "DeepSeek", logo: "deepseek" },
  { name: "字节跳动 · 豆包", logo: "doubao" },
  { name: "月之暗面 · Kimi", logo: "kimi" },
  { name: "Manus", logo: "manus" },
];

/** 开源 · OPEN：开放权重、开源项目与社区 */
export const THANKS_OPEN: string[] = [
  "Meta · Llama",
  "DeepSeek · 开放权重",
  "Qwen · 通义千问",
  "GLM · 智谱",
  "Kimi K2 / K3 · 月之暗面",
  "Mistral AI",
  "Stability AI",
  "FLUX · Black Forest Labs",
  "PyTorch",
  "Hugging Face",
  "llama.cpp",
  "vLLM",
  "MCP",
  "DeepSeek Harness",
  "LAION-5B",
  "EleutherAI",
  "AutoGPT",
  "华为昇腾 · CANN",
];

/** 闭源 · CLOSED：闭源前沿模型与产品 */
export const THANKS_CLOSED: string[] = [
  "OpenAI",
  "Google DeepMind",
  "Anthropic",
  "IBM · Deep Blue",
  "Microsoft Research · ResNet",
  "NVIDIA · CUDA",
  "Midjourney",
  "Runway",
  "MiniMax",
  "豆包 · 字节跳动",
  "Manus · 蝴蝶效应",
];

export const THANKS_QUOTE = "把回忆拼好，谢谢每一个把它拼起来的人。";
export const THANKS_QUOTE_EN = "Thanks to everyone who pieced it together.";
