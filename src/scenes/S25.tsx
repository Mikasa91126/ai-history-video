import { AbsoluteFill, Img, interpolateColors, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, ERA, EASE, FONTS, LIGHT } from "../theme";
import { clamp01 } from "../lib/anim";
import { MONTAGE_PRIMARY, companionFor, companyLogo, type MontageItem } from "../data/montage";

/** S25 · 模型编年快闪（3:08.5–3:38.5 · 1800f）｜每拍一个名字 × 32
 *  严格按日期顺序；硬切对齐拍点。本镜承担「黎明」：底色随年份从夜黑渐变为暖白。 */

const accentFor = (item: MontageItem): string => {
  if (item.accent) return item.accent;
  const y = item.date.slice(0, 4);
  if (y === "2023") return ERA.indigo;
  if (y === "2024") return ERA.mauve;
  if (y === "2025") return ERA.sky;
  return COLORS.clay;
};

/** 深色字形 logo：暗底时反白 */
const DARK_GLYPHS = new Set(["openai", "kimi", "manus", "bfl", "midjourney", "runway", "xai"]);

const smooth = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

export const S25 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const N = Math.max(1, MONTAGE_PRIMARY.length);
  const slotStart = (i: number) => Math.round((i * dur) / N);

  let idx = 0;
  for (let i = 0; i < N; i++) {
    if (frame >= slotStart(i)) idx = i;
  }
  const item = MONTAGE_PRIMARY[idx];
  const companions = companionFor(idx);
  if (!item) {
    return (
      <PaperStage dur={dur} tone="medium" creep="none">
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...TYPE.label }}>MONTAGE DATA PENDING</div>
        </AbsoluteFill>
      </PaperStage>
    );
  }

  const local = frame - slotStart(idx);
  const pop = 0.28 + 0.72 * EASE.outExpo(clamp01(local / 5));
  const flash = Math.max(0, 1 - local / 5);
  const accent = accentFor(item);
  const logo = companyLogo(item.company);

  // 黎明：从第 8 张起开始提亮，到第 27 张完全天亮
  const dawn = smooth((idx - 8) / (N - 11));
  const bg = interpolateColors(dawn, [0, 1], [COLORS.paper, LIGHT.paper]);
  const ink = interpolateColors(dawn, [0, 1], [COLORS.ink, LIGHT.ink]);
  const graphite = interpolateColors(dawn, [0, 1], [COLORS.graphite, LIGHT.graphite]);
  const grey = interpolateColors(dawn, [0, 1], [COLORS.grey, LIGHT.grey]);
  const muted = interpolateColors(dawn, [0, 1], [
    "rgba(243,240,231,0.45)",
    "rgba(20,20,19,0.45)",
  ]);
  const lineColor = interpolateColors(dawn, [0, 1], [COLORS.line, LIGHT.line]);
  const flashColor = interpolateColors(dawn, [0, 1], ["#F3F0E7", "#FAF9F5"]);
  const darkLogo = logo !== null && DARK_GLYPHS.has(logo) && dawn < 0.55;

  return (
    <PaperStage dur={dur} tone="medium" glow={false} creep="none">
      {/* 黎明底色（覆盖舞台底） */}
      <AbsoluteFill style={{ backgroundColor: bg }} />
      <AbsoluteFill style={{ backgroundColor: accent, opacity: 0.05 }} />
      <AbsoluteFill style={{ backgroundColor: flashColor, opacity: flash * 0.10 }} />

      <div
        style={{
          position: "absolute",
          left: 150,
          top: 190,
          opacity: pop,
          transform: `translateY(${(1 - pop) * 14}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 118,
            lineHeight: 1,
            color: accent,
            letterSpacing: "0.02em",
          }}
        >
          {item.date}
        </div>

        <div
          style={{
            marginTop: 52,
            fontFamily: FONTS.serifLatin,
            fontWeight: 600,
            fontSize: 132,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: ink,
            maxWidth: 1400,
          }}
        >
          {item.name}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 30 }}>
          {logo ? (
            <Img
              src={staticFile(`logos/${logo}.svg`)}
              style={{
                width: 46,
                height: 46,
                objectFit: "contain",
                filter: darkLogo ? "brightness(0) invert(1)" : undefined,
              }}
            />
          ) : null}
          <div
            style={{
              fontFamily: FONTS.sansCN,
              fontSize: 40,
              color: graphite,
              letterSpacing: "0.04em",
            }}
          >
            {item.company}
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 20,
              letterSpacing: "0.16em",
              color: muted,
            }}
          >
            {item.kind.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            fontFamily: FONTS.sansCN,
            fontSize: 30,
            color: grey,
            letterSpacing: "0.03em",
          }}
        >
          {item.note}
        </div>

        {companions.length > 0 ? (
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 4 }}>
            {companions.slice(0, 8).map((c, j) => {
              const cp = clamp01((local - 4 - j * 3) / 10);
              return (
                <div
                  key={c.name}
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 16,
                    letterSpacing: "0.03em",
                    color: muted,
                    opacity: cp,
                  }}
                >
                  ＋ {c.date}　{c.name} · {c.company}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div style={{ position: "absolute", right: 150, bottom: 120, textAlign: "right" }}>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 22,
            color: grey,
            letterSpacing: "0.14em",
          }}
        >
          {String(idx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 14, justifyContent: "flex-end" }}>
          {MONTAGE_PRIMARY.map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                backgroundColor: i <= idx ? accent : "transparent",
                border: `1px solid ${lineColor}`,
                opacity: i <= idx ? 0.9 : 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", left: 150, top: 96 }}>
        <div style={{ ...TYPE.label, color: muted }}>
          2023 → 2026 · 模型编年
        </div>
      </div>
    </PaperStage>
  );
};
