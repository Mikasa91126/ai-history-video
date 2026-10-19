/**
 * PuzzleHUD —— 全片常驻「回忆拼图」进度格（21 格，随片逐镜填充）。
 * 放在 Film 层（序列之上），读全局帧计算进度；克制、低存在感。
 */
import { useCurrentFrame } from "remotion";
import { COLORS, SCENE_DURATIONS } from "../theme";
import { clamp01 } from "../lib/anim";

export const PuzzleHUD = () => {
  const frame = useCurrentFrame();
  const starts: number[] = [];
  let acc = 0;
  for (const d of SCENE_DURATIONS) {
    starts.push(acc);
    acc += d;
  }
  // 当前镜序号 + 镜内进度
  let idx = 0;
  for (let i = 0; i < starts.length; i++) {
    if (frame >= starts[i]) idx = i;
  }
  const frac = clamp01(
    (frame - starts[idx]) / Math.max(1, SCENE_DURATIONS[idx]),
  );
  const progress = idx + frac;

  return (
    <div
      style={{
        position: "absolute",
        right: 64,
        bottom: 56,
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity: 0.85,
      }}
    >
      <span
        style={{
          fontFamily: "'Fragment Mono', monospace",
          fontSize: 13,
          letterSpacing: "0.22em",
          color: "rgba(243,240,231,0.38)",
        }}
      >
        MEMORY {String(Math.min(idx + 1, SCENE_DURATIONS.length)).padStart(2, "0")}/
        {String(SCENE_DURATIONS.length).padStart(2, "0")}
      </span>
      <div style={{ display: "flex", gap: 4 }}>
        {SCENE_DURATIONS.map((_, i) => {
          const fill = clamp01(progress - i);
          return (
            <div
              key={i}
              style={{
                width: 11,
                height: 11,
                borderRadius: 3,
                border: `1px solid ${COLORS.line}`,
                backgroundColor:
                  fill > 0
                    ? `rgba(217,119,87,${(0.18 + 0.5 * fill).toFixed(3)})`
                    : "transparent",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
