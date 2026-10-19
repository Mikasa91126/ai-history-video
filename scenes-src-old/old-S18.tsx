import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { FadeText } from "../comps/Text";
import { Counter } from "../comps/Counter";
import { DrawPath } from "../comps/wire";
import { COLORS, ERA, FONTS } from "../theme";
import { clamp01 } from "../lib/anim";

/** S18 · R1 惊雷（3:04–3:08.5 · 270f）｜墨色
 *  终副歌起拍硬切墨场：K 线瀑布 + -16.97% / -$589B 砸落。 */

export const S18 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const inP = clamp01(frame / 10);
  const outOp = 1 - clamp01((frame - (dur - 12)) / 12);

  return (
    <PaperStage dur={dur} tone="medium">
      <AbsoluteFill style={{ backgroundColor: COLORS.ink, opacity: inP * outOp }} />

      <div style={{ opacity: outOp }}>
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          <DrawPath
            d="M 220 330 L 560 372 L 760 420 L 900 470 L 1030 640 L 1150 760 L 1360 790 L 1700 806"
            start={12}
            dur={64}
            stroke={ERA.sky}
            width={4}
            opacity={0.85}
          />
          <circle cx={1030} cy={640} r={5} fill={ERA.sky} />
          <circle cx={1360} cy={790} r={5} fill={ERA.sky} />
        </svg>

        <div style={{ position: "absolute", left: 220, top: 150 }}>
          <FadeText start={44}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 96,
                color: ERA.sky,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <Counter
                from={0}
                to={-16.97}
                start={52}
                dur={56}
                format={(v) => v.toFixed(2)}
                suffix="%"
              />
            </div>
          </FadeText>
          <FadeText start={92} style={{ marginTop: 6 }}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 22,
                letterSpacing: "0.16em",
                color: "rgba(232,230,220,0.6)",
              }}
            >
              NVIDIA · ONE DAY · 2025.01.27
            </div>
          </FadeText>
        </div>

        <div style={{ position: "absolute", left: 220, top: 420 }}>
          <FadeText start={118}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 168,
                lineHeight: 1,
                color: COLORS.paperWhite,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              −$<Counter from={0} to={589} start={126} dur={52} suffix="B" />
            </div>
          </FadeText>
          <FadeText start={150} style={{ marginTop: 18 }}>
            <div style={{ ...TYPE.sub, fontSize: 30, color: "rgba(232,230,220,0.72)" }}>
              一周之内，英伟达单日市值蒸发约 5,890 亿美元（美股单日纪录）
            </div>
          </FadeText>
          <FadeText start={176} style={{ marginTop: 10 }}>
            <div
              style={{
                fontFamily: FONTS.serifLatin,
                fontStyle: "italic",
                fontSize: 26,
                color: "rgba(232,230,220,0.5)",
              }}
            >
              The world reprices cheaper intelligence.
            </div>
          </FadeText>
        </div>

        <Sequence from={4}>
          <Audio src={staticFile("sfx/low-hit.wav")} />
        </Sequence>
        <Sequence from={126}>
          <Audio src={staticFile("sfx/coin-chime.wav")} />
        </Sequence>
      </div>
    </PaperStage>
  );
};
