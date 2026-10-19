/**
 * SceneLab —— 单镜检视台。props.scene 选镜（1–21），用 0 基帧渲染该镜。
 * 用法：npx remotion still SceneLab out/lab/S09-f120.png --frame=120 --props='{"scene":9}'
 */
import { SCENES } from "./scenes";
import { SCENE_DURATIONS } from "./theme";

export const SceneLab = ({ scene = 1 }: { scene?: number }) => {
  const idx = Math.min(Math.max(scene, 1), SCENES.length) - 1;
  const Comp = SCENES[idx];
  return <Comp dur={SCENE_DURATIONS[idx]} />;
};
