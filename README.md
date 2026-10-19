# 《把回忆拼好》· AI 简史 1950–2026（Remotion 工程）

> 232.25s（13,935 帧 @60fps）· 1920×1080 · 中文主文案 + 英文点缀
> 片长 = BGM 曲长：《把回忆拼好给你》DJ 降调 0.9x 完整版（B 站 BV15qQNYyE1u）

## 快速开始

```bash
cd B:/ai-history-video
npm run dev                 # 预览工作室（Film / SceneLab）
npm run render              # 渲染成片 → out/Remembering-AI-232s.mp4
npx remotion still SceneLab out/lab/S19-f900.png --frame=900 --props='{"scene":19}'
```

## 结构

```
DESIGN.md            设计规范：21 镜分镜、音乐实测锚点与卡点规则、视觉/动效/事实政策
src/theme.ts         色板 + 时代色 + 21 镜时长表（合计 13,935 帧，与音乐逐秒对齐）
src/scenes/S01–S21   21 个镜头
src/data/montage.ts  模型编年快闪名录（32 条，按日期排序；数据来自事实手册核查版）
src/data/thanks.ts   致谢名单（7 官方 logo + 26 个公司/实验室/开源项目）
src/comps/           复用零件库（PaperStage / NodeNet / Cursor / UI 复刻 / TypeIn / DrawPath / PuzzleHUD…）
src/docs/KIT.md      零件 API 与场景制作规范
public/audio/        film-music.wav（0.9x 版，-3dB + 0.8s 淡入，232.25s）
public/sfx/          11 枚程序合成音效（无第三方素材）
public/logos/        品牌官方 SVG（Anthropic / OpenAI / Google / DeepSeek / 豆包 / Kimi / Manus）
tools/sheet.py       检查用拼图大表生成器
assets/music/        候选曲目与来源/分析文档（audition-A/B/C + SOURCES + ANALYSIS）
```

## 卡点说明

BPM ≈ 63.9（每拍 0.9375s）。全片段落锚点：52s 学习时代 / 76s GAN / 94s Transformer /
108s GPT / 122s 屏息 / 136s ChatGPT / 160s 开源 / **170–172s 全曲最静** / 172s R1 抬升 /
184s 终副歌 / **188.5–218.5s 模型编年快闪（32 拍 × 每拍一个名字）** / 218.5s 致谢 / 227s 落版。

## 素材与声明

- BGM：《把回忆拼好给你》0.9x（网友二次制作，B 站 BV15qQNYyE1u）；原唱 王贰浪；原曲《願い～あの頃のキミへ～》。个人分享用途，片尾已署名。
- 商标：本片为独立科普创作，不代表任何公司立场，亦未获任何公司赞助或背书；所有名称与标识归各自权利人，仅用于识别、介绍、评论与历史说明。
- 事实：时间线/模型名录/数字口径来自《事实手册》核查版（见交付说明）；部分数字已标注「官方口径 / 论文口径 / 估算」。
