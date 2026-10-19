/**
 * PaperStage —— 场景舞台（深色版 + 暖白版双基座）：
 * tone: "light" | "medium" | "deep" → 深色档案三级；"bright" → 暖白（致谢/落版/快闪收尾用）。
 * 附带左上柔光、可选点阵网格、颗粒、单镜 camera creep。
 */
import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, LIGHT } from "../theme";
import { Grain } from "./fx";

export const PaperStage = ({
  dur,
  tone = "medium",
  grid = false,
  glow = true,
  grain = true,
  creep = "push",
  children,
}: {
  dur: number;
  /** light/medium/deep = 深色档案三级；bright = 暖白 */
  tone?: "light" | "medium" | "deep" | "bright";
  /** 24px 点阵网格 */
  grid?: boolean;
  /** 左上柔光 */
  glow?: boolean;
  grain?: boolean;
  /** push = 缓推 ｜ drift = 横向漂移 ｜ none */
  creep?: "push" | "drift" | "none";
  children: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const scale =
    creep === "none"
      ? 1
      : interpolate(frame, [0, dur], [1.002, creep === "push" ? 1.018 : 1.01]);
  const driftX = creep === "drift" ? interpolate(frame, [0, dur], [-8, 8]) : 0;
  const bright = tone === "bright";

  const bg = bright
    ? LIGHT.paperWhite
    : tone === "light"
      ? COLORS.paperWhite
      : tone === "deep"
        ? COLORS.paperDeep
        : COLORS.paper;

  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      {glow ? (
        <AbsoluteFill
          style={{
            background: bright
              ? `radial-gradient(ellipse 62% 52% at 16% 6%, ${LIGHT.paperWhite} 0%, rgba(250,249,245,0) 60%)`
              : "radial-gradient(ellipse 62% 52% at 16% 6%, rgba(243,240,231,0.055) 0%, rgba(243,240,231,0) 62%)",
          }}
        />
      ) : null}
      {grid ? (
        <AbsoluteFill
          style={{
            backgroundImage: bright
              ? "radial-gradient(circle, rgba(20,20,19,0.055) 1.1px, transparent 1.1px)"
              : "radial-gradient(circle, rgba(243,240,231,0.05) 1.1px, transparent 1.1px)",
            backgroundSize: "24px 24px",
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{ transform: `scale(${scale}) translateX(${driftX}px)` }}
      >
        {children}
      </AbsoluteFill>
      {grain ? <Grain opacity={bright ? 0.05 : 0.07} /> : null}
    </AbsoluteFill>
  );
};
