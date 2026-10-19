# KIT ——《把回忆拼好》零件库 API（场景制作必读）

> 规范见根目录 `DESIGN.md`。**只允许改自己的 `src/scenes/SXX.tsx`**，不得改零件库/theme/Film/Root/index。

## 0. 场景规范

```tsx
import { AbsoluteFill } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { ERA, COLORS } from "../theme";

/** S06 · ImageNet 与 AlexNet（690f） */
export const S06 = ({ dur }: { dur: number }) => (
  <PaperStage dur={dur} tone="medium">
    {/* 画面层 */}
  </PaperStage>
);
```
- 帧号镜内从 0 起；确定性（禁 Math.random/Date.now，随机用 mulberry32）
- 色彩纪律：任一帧最多「纸底 + 墨 + 一个时代色/陶土强调」
- 文案按 DESIGN §2 原文；上屏事实以《事实手册》核查版为准（特别 2023 后的日期/归属）

## 1. 零件

```tsx
<PaperStage dur tone="light|medium|deep" grid glow creep="push|drift|none" />
<TYPE：h1 h1cn h2cn quote body sub en enItalic label num term>   // src/comps/type.ts
<Card / MiniWindow(dark|light) / TermLine / TaskCard / Chip>       // src/comps/ui.tsx
<Cursor path clicks />                                            // 角色光标
<NodeNet nodes edges packets />                                   // 光网节点
<TypeIn text start cps />                                         // 逐字敲入
<DrawPath d start dur />（放在 <svg> 内）                          // 墨线绘制
<Counter from to start dur format prefix suffix />                // 数字滚动
```
动画工具：`prog / clamp01 / mulberry32 / stagger`（src/lib/anim.ts）、`EASE.outExpo / exit / ink / draw`（theme）。

## 2. 音效（public/sfx/，11 枚）

`paper-drop / page-flip / key-type / enter-click / ui-ping / success-chime / coin-chime / timer-bell / low-hit / confirm-click / whoosh`

```tsx
<Sequence from={f}><Audio src={staticFile("sfx/ui-ping.wav")} /></Sequence>
```

## 3. 自检命令

```bash
cd B:/ai-history-video
npx remotion still SceneLab out/lab/S06-f100.png --frame=100 --props='{"scene":6}'
```
渲染后用 Read **亲眼看图**，至少迭代 2 轮；每镜检查约 5% / 30% / 60% / 90% 帧位。
版式网格：页边距 140；左上 `TYPE.label`；主文案左下或居中（幕内一致）；Logo ≤56–80px 放角落。

## 4. 快闪与致谢（仅 S19/S20 使用）

- 快闪数据在 `src/data/montage.ts`（`MONTAGE` 数组：date / name / company / kind / note / accent?）
- 每拍 56.25 帧 → 用 `Math.round(i * 1800 / 32)` 计算切点，硬切对齐拍点
- 致谢名单在 `src/data/thanks.ts`；Logo 用 `<Img src={staticFile("logos/xxx.svg")} />`
