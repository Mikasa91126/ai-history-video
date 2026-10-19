import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, ERA, EASE, FONTS } from "../theme";
import { clamp01 } from "../lib/anim";
import { MONTAGE, companyLogo, type MontageItem } from "../data/montage";

/** S19 · 模型编年快闪（3:08.5–3:38.5 · 1800f）｜每拍一个名字 × 32
 *  严格按日期顺序；硬切对齐拍点（槽宽 = 1800/32 ≈ 56.25f）。 */

const accentFor = (item: MontageItem): string => {
  if (item.accent) return item.accent;
  const y = item.date.slice(0, 4);
  if (y === "2023") return ERA.indigo;
  if (y === "2024") return ERA.mauve;
  if (y === "2025") return ERA.sky;
  return COLORS.clay;
};

export const S19 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const N = Math.max(1, MONTAGE.length);
  const slotStart = (i: number) => Math.round((i * dur) / N);

  let idx = 0;
  for (let i = 0; i < N; i++) {
    if (frame >= slotStart(i)) idx = i;
  }
  const item = MONTAGE[idx];
  if (!item) {
    return (
      <PaperStage dur={dur} tone="light" creep="none">
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...TYPE.label }}>MONTAGE DATA PENDING</div>
        </AbsoluteFill>
      </PaperStage>
    );
  }

  const local = frame - slotStart(idx);
  const pop = EASE.outExpo(clamp01(local / 8));
  const flash = Math.max(0, 1 - local / 5);
  const accent = accentFor(item);
  const logo = companyLogo(item.company);

  return (
    <PaperStage dur={dur} tone="light" glow={false} creep="none">
      <AbsoluteFill style={{ backgroundColor: accent, opacity: 0.06 }} />
      <AbsoluteFill
        style={{ backgroundColor: COLORS.paperWhite, opacity: flash * 0.32 }}
      />

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
            color: COLORS.ink,
            maxWidth: 1400,
          }}
        >
          {item.name}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 30 }}>
          {logo ? (
            <Img
              src={staticFile(`logos/${logo}.svg`)}
              style={{ width: 46, height: 46, objectFit: "contain" }}
            />
          ) : null}
          <div
            style={{
              fontFamily: FONTS.sansCN,
              fontSize: 40,
              color: COLORS.graphite,
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
              color: "rgba(20,20,19,0.45)",
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
            color: COLORS.grey,
            letterSpacing: "0.03em",
          }}
        >
          {item.note}
        </div>
      </div>

      <div style={{ position: "absolute", right: 150, bottom: 120, textAlign: "right" }}>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 22,
            color: COLORS.grey,
            letterSpacing: "0.14em",
          }}
        >
          {String(idx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 14, justifyContent: "flex-end" }}>
          {MONTAGE.map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                backgroundColor: i <= idx ? accent : "transparent",
                border: `1px solid ${COLORS.line}`,
                opacity: i <= idx ? 0.9 : 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", left: 150, top: 96 }}>
        <div style={{ ...TYPE.label, color: "rgba(20,20,19,0.4)" }}>
          2023 → 2026 · 模型的名字 · 一页一页翻过
        </div>
      </div>
    </PaperStage>
  );
};
