import { Easing } from "remotion";

/**
 * 视觉系统 ——《把回忆拼好》AI 简史（232.25s）
 * 深色版（前暗后亮）：前段黑场档案（#0A0A09 基底 + 暖白文字），
 * 模型编年快闪段向暖白渐变，致谢/落版回到原来的暖白。
 * 深色阶段：同一设计系统的「夜间版」，不是反色滤镜——所有色值逐项调过。
 */
export const COLORS = {
  /* 深色纸三级（由深到略浅） */
  paperWhite: "#131312",
  paper: "#0D0D0C",
  paperDeep: "#181817",
  /* 文字（暖白系） */
  ink: "#F3F0E7",
  graphite: "#CFC9BC",
  grey: "#A29C8F",
  /* 主强调 */
  clay: "#D97757",
  clayDark: "#C6613F",
  /* 画线 */
  line: "rgba(243,240,231,0.16)",
  lineSoft: "rgba(243,240,231,0.08)",
  /* 终端 */
  terminal: "#181817",
  termGreen: "#8FBF7A",
  termText: "#E8E6DC",

  /* 别名（兼容零件库旧键） */
  abyss: "#0A0A09",
  deep: "#141413",
  brand: "#D97757",
  bright: "#D97757",
  ice: "#D4A27F",
  mist: "#B9B3A6",
  ivory: "#F3F0E7",
  white: "#FFFFFF",
} as const;

/** 暖白版（用于快闪段的「黎明」终点 / 致谢与落版场景） */
export const LIGHT = {
  paperWhite: "#FAF9F5",
  paper: "#F0EEE6",
  paperDeep: "#E8E6DC",
  ink: "#141413",
  graphite: "#3D3D3A",
  grey: "#5E5D59",
  line: "rgba(20,20,19,0.16)",
  lineSoft: "rgba(20,20,19,0.08)",
} as const;

/** 时代色（深色版：整体提亮一档，保证黑底对比） */
export const ERA = {
  sepia: "#C9A876",
  newsprint: "#B5B0A4",
  pixel: "#7FB08A",
  indigo: "#8FA6D9",
  mauve: "#D18FB4",
  sky: "#8FB8E8",
  agent: "#D97757",
} as const;

export const BRAND_COLORS = {
  clay: "#D97757",
  openai: "#141413",
  deepseek: "#6A9BCC",
  google: "#629987",
  cn: "#D97757",
} as const;

export const FONTS = {
  serifLatin: "'Source Serif 4', Georgia, 'Times New Roman', serif",
  serifCN: "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif",
  sansCN: "'Noto Sans SC', 'Source Han Sans SC', 'Microsoft YaHei', sans-serif",
  body: "'DM Sans', 'Noto Sans SC', sans-serif",
  slogan: "'Montserrat', 'Noto Sans SC', sans-serif",
  mono: "'Fragment Mono', 'JetBrains Mono', monospace",
} as const;

/** 动效参数（沿用丝滑底座） */
export const EASE = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  exit: Easing.bezier(0.55, 0, 1, 0.45),
  charReveal: Easing.bezier(0.22, 1, 0.36, 1),
  ink: Easing.bezier(0.65, 0, 0.35, 1),
  draw: Easing.bezier(0.65, 0, 0.35, 1),
} as const;

export const FPS = 60;
/** 13935 帧 = 232.25s（= BGM 实测曲长，精确对齐） */
export const DURATION_IN_FRAMES = 13935;

/**
 * 27 镜时长（帧），总和 = 13935（232.25s）——「加页提速」版
 * 音乐锚点保持不动：170s 屏息Ⅱ/172s R1/184s 终副歌/188.5–218.5s 快闪/218.5s 致谢/227s 落版。
 * 前期 0–94s：13 页（原 8 页拆细：感知机/ELIZA、寒冬Ⅰ/专家系统/反向传播/寒冬Ⅱ、ImageNet/AlexNet…）
 */
export const SCENE_DURATIONS = [
  540, 420, 420, 360, 360, 360, 300, 300, 360, 300, 480, 540, 900, // 0–94s 十三页
  780, 420, 480, 240, 600, 780, 660, 600, // 94–170s 八个
  120, 720, 270, 1800, 510, 315, // 170–232.25s 六个
] as const;

export const SCENE_TITLES = [
  "序章·机器能思考吗",
  "1956 达特茅斯",
  "1958 感知机",
  "1966 ELIZA",
  "第一次 AI 寒冬",
  "专家系统年代",
  "1986 反向传播",
  "第二次 AI 寒冬",
  "1997 深蓝",
  "2009 ImageNet",
  "2012 AlexNet",
  "2014 GAN",
  "2016 AlphaGo",
  "2017 Transformer",
  "2018 GPT-1 与 BERT",
  "2020 GPT-3 与缩放定律",
  "屏息·第一处",
  "2022 ChatGPT 时刻",
  "2022 生图浪潮",
  "2024 生视频",
  "2023 开源与 AutoGPT",
  "屏息·第二处",
  "2025 DeepSeek R1",
  "R1 惊雷",
  "模型编年快闪",
  "致谢",
  "落版",
] as const;

/** 第 id 镜（1 起）的起始帧 */
export const sceneStart = (id: number): number =>
  SCENE_DURATIONS.slice(0, id - 1).reduce((a, b) => a + b, 0);
