/**
 * SceneWrap —— 深色段的镜头进出位移。
 * 入场时自下方 8px 浮起、退场时向上 8px 离开，与场景自身的淡入淡出同步；
 * 配合边界柔光呼吸，让切点像一次「纸页翻过」的方向性过渡，而不是纯硬切。
 * 仅用于深色段（S01–S24）；快闪/致谢/落版不做位移（背景为暖白，位移会露底）。
 */
import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { clamp01 } from "../lib/anim";

/** 进/出各 12 帧，位移 8px */
const T = 12;
const D = 8;

export const SceneWrap = ({
  dur,
  children,
}: {
  dur: number;
  children: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const inP = clamp01(frame / T);
  const outP = clamp01((frame - (dur - T)) / T);
  const easeIn = 1 - Math.pow(1 - inP, 3);
  const y = (1 - easeIn) * D - outP * D;

  return (
    <AbsoluteFill style={{ transform: `translateY(${y.toFixed(2)}px)` }}>
      {children}
    </AbsoluteFill>
  );
};
