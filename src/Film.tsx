import { Fragment } from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { COLORS, SCENE_DURATIONS, sceneStart } from "./theme";
import { SCENES } from "./scenes";
import { PuzzleHUD } from "./comps/PuzzleHUD";
import { SceneWrap } from "./comps/SceneWrap";

/** 深色段的最后一页（S24 = R1 惊雷）；之后是快闪/致谢/落版 */
const DARK_LAST = 24;
/** 交叉溶解时长（帧） */
const XFADE = 12;
/**
 * 保留硬切的边界（这些场景的「起点帧」处不做溶解）：
 * S23 R1 登场（屏息 → 抬升）、S24 R1 惊雷（终副歌砸落）、S25 模型快闪（第一拍）。
 */
const HARD_CUTS = new Set<number>([
  sceneStart(23),
  sceneStart(24),
  sceneStart(25),
]);

/**
 * 《把回忆拼好》AI 简史 1950–2026 · 总装（深色版 · 前暗后亮）
 *
 * TransitionSeries 在指定边界插入 12 帧交叉溶解；有溶解的镜头在尾部多留 12 帧作为
 * 溶解尾巴（场景组件仍收原始 dur，内部贴拍动画不变）。总时长严格 = ΣSCENE_DURATIONS = 13,935 帧。
 */
export const Film = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.abyss }}>
      <Audio src={staticFile("audio/film-music.wav")} />
      <TransitionSeries>
        {SCENES.map((Comp, i) => {
          const dur = SCENE_DURATIONS[i];
          const isLast = i === SCENES.length - 1;
          // 场景 i 与其后一镜之间是否有溶解
          const hasFade = !isLast && !HARD_CUTS.has(sceneStart(i + 2));
          return (
            <Fragment key={i}>
              <TransitionSeries.Sequence
                durationInFrames={dur + (hasFade ? XFADE : 0)}
              >
                {i + 1 <= DARK_LAST ? (
                  <SceneWrap dur={dur}>
                    <Comp dur={dur} />
                  </SceneWrap>
                ) : (
                  <Comp dur={dur} />
                )}
              </TransitionSeries.Sequence>
              {hasFade ? (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: XFADE })}
                />
              ) : null}
            </Fragment>
          );
        })}
      </TransitionSeries>
      <PuzzleHUD />
    </AbsoluteFill>
  );
};
