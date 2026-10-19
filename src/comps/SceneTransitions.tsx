/**
 * SceneTransitions —— 镜头边界的「柔光呼吸」。
 * 不做模糊（模糊会让 4K 画面发灰、失去锐度），只在边界 ±10 帧叠一层极淡的径向暖光，
 * 与各场景自身的 7f 淡入 / 9f 淡出配合，给切点一次自然的曝光呼吸。
 * 快闪段与三个高潮硬切点除外。
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SCENE_DURATIONS, sceneStart } from "../theme";

const HALF = 10; // 过渡半窗（帧）
const MONTAGE_START = sceneStart(25);
const MONTAGE_END = MONTAGE_START + SCENE_DURATIONS[24];
/** 保留硬切的高潮点（帧）：R1 登场 / 终副歌惊雷 / 快闪第一拍 */
const HARD_CUTS = new Set<number>([sceneStart(23), sceneStart(24), MONTAGE_START]);

const BOUNDARIES: number[] = (() => {
  const out: number[] = [];
  for (let i = 2; i <= SCENE_DURATIONS.length; i++) out.push(sceneStart(i));
  return out;
})();

export const SceneTransitions = () => {
  const frame = useCurrentFrame();
  if (frame >= MONTAGE_START && frame < MONTAGE_END) return null;

  let nearest: number | null = null;
  let dist = Infinity;
  for (const b of BOUNDARIES) {
    if (HARD_CUTS.has(b)) continue;
    const d = Math.abs(frame - b);
    if (d < dist) {
      dist = d;
      nearest = b;
    }
  }
  if (nearest === null || dist > HALF) return null;

  const p = 1 - dist / HALF; // 边界处 = 1
  const isDark = nearest < MONTAGE_START;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isDark
            ? `radial-gradient(ellipse 72% 58% at 50% 46%, rgba(243,240,231,${(
                0.045 * p
              ).toFixed(4)}), rgba(243,240,231,0) 70%)`
            : `radial-gradient(ellipse 72% 58% at 50% 46%, rgba(20,20,19,${(
                0.025 * p
              ).toFixed(4)}), rgba(20,20,19,0) 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};
