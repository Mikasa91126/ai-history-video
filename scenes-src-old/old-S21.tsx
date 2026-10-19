import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { CharReveal, FadeText } from "../comps/Text";
import { COLORS, EASE, FONTS } from "../theme";
import { clamp01 } from "../lib/anim";

/** S21 · 落版（3:47–3:52.25 · 315f）｜暖白
 *  片名 + 年代刻度 + 曲目署名与免责小字；跟随音乐淡出完全静止。 */

const YEARS = [1950, 1970, 1990, 2010, 2026];

export const S21 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const lineP = EASE.outExpo(clamp01((frame - 84) / 60));

  return (
    <PaperStage dur={dur} tone="light" glow={false} creep="none">
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}
      >
        <FadeText start={8}>
          <div style={{ ...TYPE.label, textAlign: "center", letterSpacing: "0.42em" }}>
            EPILOGUE · 把回忆拼好
          </div>
        </FadeText>

        <div style={{ marginTop: 40 }}>
          <CharReveal
            text="把回忆拼好"
            start={26}
            staggerFrames={3.4}
            charFrames={40}
            style={{
              ...TYPE.h1cn,
              fontSize: 124,
              justifyContent: "center",
              letterSpacing: "0.1em",
            }}
          />
        </div>

        <FadeText start={110} style={{ marginTop: 26 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 24,
              letterSpacing: "0.36em",
              color: COLORS.grey,
              textAlign: "center",
            }}
          >
            AI 简史 · 1950 — 2026
          </div>
        </FadeText>

        <div
          style={{
            marginTop: 64,
            width: 900 * lineP,
            height: 1.5,
            backgroundColor: COLORS.ink,
            opacity: 0.5,
            position: "relative",
          }}
        >
          {YEARS.map((y, i) => {
            const p = clamp01((frame - 92 - i * 10) / 20);
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
                    backgroundColor: COLORS.ink,
                    margin: "0 auto",
                  }}
                />
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: FONTS.mono,
                    fontSize: 17,
                    letterSpacing: "0.12em",
                    color: COLORS.grey,
                  }}
                >
                  {y}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ position: "absolute", bottom: 64, width: "100%" }}>
          <FadeText start={200} y={4}>
            <div
              style={{
                textAlign: "center",
                fontFamily: FONTS.mono,
                fontSize: 16,
                letterSpacing: "0.08em",
                color: "rgba(20,20,19,0.42)",
                lineHeight: 1.9,
              }}
            >
              BGM《把回忆拼好给你》0.9x · 原唱 王贰浪 · 原曲《願い～あの頃のキミへ～》
              <br />
              本片为个人向概念科普 · 商标归各自公司所有 · 2026
            </div>
          </FadeText>
        </div>
      </AbsoluteFill>
    </PaperStage>
  );
};
