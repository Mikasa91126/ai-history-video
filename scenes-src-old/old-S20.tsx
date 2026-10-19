import { Img, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { FadeText } from "../comps/Text";
import { COLORS, EASE, FONTS } from "../theme";
import { clamp01 } from "../lib/anim";
import {
  THANKS_LOGOS,
  THANKS_NAMES,
  THANKS_QUOTE,
  THANKS_QUOTE_EN,
} from "../data/thanks";

/** S20 · 致谢（3:38.5–3:47 · 510f）｜暖白
 *  七枚官方 logo + 公司/实验室/开源项目名墙 + 感谢开发者与使用者的金句。 */

export const S20 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  return (
    <PaperStage dur={dur} tone="light" glow>
      <div style={{ position: "absolute", top: 104, width: "100%", textAlign: "center" }}>
        <FadeText start={8}>
          <div style={{ ...TYPE.label, letterSpacing: "0.44em" }}>THANKS · 致谢</div>
        </FadeText>
      </div>

      {/* 官方 logo 行 */}
      <div
        style={{
          position: "absolute",
          top: 196,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 52,
        }}
      >
        {THANKS_LOGOS.map((c, i) => {
          const p = EASE.outExpo(clamp01((frame - (28 + i * 9)) / 26));
          return (
            <div
              key={c.name}
              style={{
                textAlign: "center",
                opacity: p,
                transform: `translateY(${(1 - p) * 12}px)`,
              }}
            >
              <Img
                src={staticFile(`logos/${c.logo}.svg`)}
                style={{ width: 42, height: 42, objectFit: "contain" }}
              />
              <div
                style={{
                  marginTop: 8,
                  fontFamily: FONTS.mono,
                  fontSize: 13,
                  letterSpacing: "0.05em",
                  color: COLORS.grey,
                }}
              >
                {c.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* 名墙 */}
      <div
        style={{
          position: "absolute",
          top: 344,
          left: 240,
          right: 240,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {THANKS_NAMES.map((n, i) => {
          const p = clamp01((frame - (86 + i * 5.5)) / 18);
          return (
            <span
              key={n}
              style={{
                fontFamily: FONTS.mono,
                fontSize: 16,
                letterSpacing: "0.04em",
                color: COLORS.graphite,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 7,
                padding: "6px 13px",
                backgroundColor: "rgba(250,249,245,0.62)",
                opacity: p * 0.9,
              }}
            >
              {n}
            </span>
          );
        })}
      </div>

      {/* 金句 */}
      <div style={{ position: "absolute", top: 640, width: "100%", textAlign: "center" }}>
        <FadeText start={214} dur={40}>
          <div style={{ ...TYPE.quote, fontSize: 54, textAlign: "center" }}>
            {THANKS_QUOTE}
          </div>
        </FadeText>
        <FadeText start={272} style={{ marginTop: 18 }}>
          <div style={{ ...TYPE.enItalic, fontSize: 31 }}>{THANKS_QUOTE_EN}</div>
        </FadeText>
      </div>

      {/* 开发者与使用者 */}
      <div style={{ position: "absolute", top: 872, width: "100%", textAlign: "center" }}>
        <FadeText start={330}>
          <div
            style={{
              fontFamily: FONTS.sansCN,
              fontSize: 27,
              letterSpacing: "0.22em",
              color: COLORS.grey,
            }}
          >
            感谢广大开发者与使用者
          </div>
        </FadeText>
      </div>
    </PaperStage>
  );
};
