import { Img, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { FadeText } from "../comps/Text";
import { LIGHT, EASE, FONTS } from "../theme";
import { clamp01 } from "../lib/anim";
import {
  THANKS_LOGOS,
  THANKS_OPEN,
  THANKS_CLOSED,
  THANKS_QUOTE,
  THANKS_QUOTE_EN,
} from "../data/thanks";

/** S26 · 致谢（3:38.5–3:47 · 510f）｜暖白
 *  七枚官方 logo + 「开源 / 闭源」两组名单（含华为昇腾·CANN）+ 金句。 */

const chip = (start: number): React.CSSProperties => ({
  fontFamily: FONTS.mono,
  fontSize: 15,
  letterSpacing: "0.03em",
  color: LIGHT.graphite,
  border: `1px solid ${LIGHT.line}`,
  borderRadius: 7,
  padding: "5px 11px",
  backgroundColor: "rgba(255,255,255,0.55)",
  opacity: clamp01(start),
});

export const S26 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  return (
    <PaperStage dur={dur} tone="bright" glow>
      <div style={{ position: "absolute", top: 92, width: "100%", textAlign: "center" }}>
        <FadeText start={8}>
          <div style={{ ...TYPE.label, color: LIGHT.grey, letterSpacing: "0.44em" }}>
            THANKS · 致谢
          </div>
        </FadeText>
      </div>

      {/* 官方 logo 行 */}
      <div
        style={{
          position: "absolute",
          top: 168,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 46,
        }}
      >
        {THANKS_LOGOS.map((c, i) => {
          const p = EASE.outExpo(clamp01((frame - (24 + i * 8)) / 24));
          return (
            <div
              key={c.name}
              style={{
                textAlign: "center",
                opacity: p,
                transform: `translateY(${(1 - p) * 10}px)`,
              }}
            >
              <Img
                src={staticFile(`logos/${c.logo}.svg`)}
                style={{ width: 38, height: 38, objectFit: "contain" }}
              />
              <div
                style={{
                  marginTop: 7,
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  color: LIGHT.grey,
                }}
              >
                {c.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* 两组名单 */}
      {[
        {
          title: "开源 · OPEN",
          items: THANKS_OPEN,
          x: 240,
          start: 84,
        },
        {
          title: "闭源 · CLOSED",
          items: THANKS_CLOSED,
          x: 1120,
          start: 132,
        },
      ].map((col) => (
        <div
          key={col.title}
          style={{ position: "absolute", left: col.x, top: 292, width: 660 }}
        >
          <FadeText start={col.start - 8}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 17,
                letterSpacing: "0.28em",
                color: LIGHT.ink,
              }}
            >
              {col.title}
            </div>
          </FadeText>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 9 }}>
            {col.items.map((n, i) => {
              const p = clamp01((frame - (col.start + i * 4)) / 16);
              return (
                <span key={n} style={chip(p)}>
                  {n}
                </span>
              );
            })}
          </div>
        </div>
      ))}

      {/* 金句 */}
      <div style={{ position: "absolute", top: 700, width: "100%", textAlign: "center" }}>
        <FadeText start={238} dur={40}>
          <div
            style={{
              ...TYPE.quote,
              color: LIGHT.ink,
              fontSize: 52,
              textAlign: "center",
            }}
          >
            {THANKS_QUOTE}
          </div>
        </FadeText>
        <FadeText start={292} style={{ marginTop: 16 }}>
          <div style={{ ...TYPE.enItalic, fontSize: 29 }}>{THANKS_QUOTE_EN}</div>
        </FadeText>
      </div>

      {/* 开发者与使用者 */}
      <div style={{ position: "absolute", top: 880, width: "100%", textAlign: "center" }}>
        <FadeText start={344}>
          <div
            style={{
              fontFamily: FONTS.sansCN,
              fontSize: 26,
              letterSpacing: "0.22em",
              color: LIGHT.grey,
            }}
          >
            感谢广大开发者与使用者
          </div>
        </FadeText>
      </div>
    </PaperStage>
  );
};
