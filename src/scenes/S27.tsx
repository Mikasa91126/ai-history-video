import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { CharReveal, FadeText } from "../comps/Text";
import { LIGHT, EASE, FONTS } from "../theme";
import { clamp01 } from "../lib/anim";

/** S27 · 落版（3:47–3:52.25 · 315f）｜暖白
 *  终屏文案：「静待 AGI 到来的前夜」+ 年代刻度 + 曲目署名与免责小字；跟随音乐淡出完全静止。 */

const YEARS = [1950, 1970, 1990, 2010, 2026];

export const S27 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const lineP = EASE.outExpo(clamp01((frame - 96) / 60));

  return (
    <PaperStage dur={dur} tone="bright" glow={false} creep="none">
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}
      >
        <FadeText start={8}>
          <div
            style={{
              ...TYPE.label,
              color: LIGHT.grey,
              textAlign: "center",
              letterSpacing: "0.42em",
            }}
          >
            EPILOGUE · 把回忆拼好
          </div>
        </FadeText>

        <div style={{ marginTop: 40 }}>
          <CharReveal
            text="静待 AGI 到来的前夜"
            start={24}
            staggerFrames={3.2}
            charFrames={40}
            style={{
              ...TYPE.h1cn,
              color: LIGHT.ink,
              fontSize: 104,
              justifyContent: "center",
              letterSpacing: "0.08em",
            }}
          />
        </div>

        <FadeText start={150} style={{ marginTop: 26 }}>
          <div style={{ ...TYPE.enItalic, fontSize: 30 }}>
            On the eve of AGI.
          </div>
        </FadeText>

        <FadeText start={100} style={{ marginTop: 30 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 22,
              letterSpacing: "0.32em",
              color: LIGHT.grey,
              textAlign: "center",
            }}
          >
            AI 简史 · 1950 — 2026
          </div>
        </FadeText>

        <div
          style={{
            marginTop: 56,
            width: 900 * lineP,
            height: 1.5,
            backgroundColor: LIGHT.ink,
            opacity: 0.5,
            position: "relative",
          }}
        >
          {YEARS.map((y, i) => {
            const p = clamp01((frame - 104 - i * 10) / 20);
            return (
              <div
                key={y}
                style={{
                  position: "absolute",
                  left: `${(i / (YEARS.length - 1)) * 100}%`,
                  top: -4,
                  transform: "translateX(-50%)",
                  opacity: p,
                }}
              >
                <div
                  style={{
                    width: 1.5,
                    height: 9,
                    backgroundColor: LIGHT.ink,
                    margin: "0 auto",
                  }}
                />
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: FONTS.mono,
                    fontSize: 16,
                    letterSpacing: "0.12em",
                    color: LIGHT.grey,
                  }}
                >
                  {y}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ position: "absolute", bottom: 68, width: "100%" }}>
          <FadeText start={214} y={4}>
            <div
              style={{
                textAlign: "center",
                fontFamily: FONTS.mono,
                fontSize: 15,
                letterSpacing: "0.1em",
                color: "rgba(20,20,19,0.34)",
              }}
            >
              BGM《把回忆拼好给你》0.9x · 王贰浪
            </div>
          </FadeText>
        </div>
      </AbsoluteFill>
    </PaperStage>
  );
};
