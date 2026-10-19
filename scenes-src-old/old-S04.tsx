/**
 * S04 · 两次寒冬与专家系统（35s–45s · 600f）
 * 报纸灰：头版「THE AI WINTER」+ 经费曲线两次清晰下跌，
 * 1980s 专家系统短暂回暖，随后第二次寒冬。整体去饱和。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const B = (i: number): number => Math.round(37.7 + i * 56.25);
const STAMP_I = B(3);
const HUM = B(5);
const STAMP_II = B(7);
const N = ERA.newsprint;

/** 经费曲线：1974–1993（x 已映射到 60–760，y 为画布坐标） */
const PTS: [number, number][] = [
  [60, 105],
  [96.8, 92],
  [133.7, 210],
  [207.4, 272],
  [281.1, 258],
  [354.7, 212],
  [428.4, 178],
  [502.1, 198],
  [538.9, 238],
  [612.6, 310],
  [686.3, 322],
  [760, 326],
];
const CURVE = PTS.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
const AREA = `${CURVE} L 760 330 L 60 330 Z`;

export const S04 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = Math.min(prog(frame, 0, 12), 1 - prog(frame, dur - 14, 14));
  const sheetP = EASE.outExpo(prog(frame, 0, 40));
  const copy = Math.min(prog(frame, 108, 26), 1 - prog(frame, dur - 14, 14));
  const copyEn = Math.min(prog(frame, 128, 26), 1 - prog(frame, dur - 14, 14));

  return (
    <PaperStage dur={dur} tone="deep" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 章节标签 */}
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          规则时代 · 1974–1993 ｜ THE RULE ERA
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 136,
            width: 300,
            height: 1,
            backgroundColor: N,
            opacity: 0.4,
            transformOrigin: "left center",
            transform: `scaleX(${EASE.outExpo(prog(frame, 10, 40))})`,
          }}
        />

        {/* ---------------- 报纸头版 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 150,
            width: 1640,
            height: 680,
            backgroundColor: COLORS.paperWhite,
            border: `1px solid ${COLORS.line}`,
            boxShadow: "0 30px 70px rgba(31,30,29,0.14)",
            opacity: Math.min(1, prog(frame, 0, 14) * 1.5),
            transform: `translateY(${(1 - sheetP) * 28}px) rotate(${
              -0.55 + (1 - sheetP) * 0.35
            }deg)`,
            overflow: "hidden",
          }}
        >
          {/* 版面纤维 / 折痕 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(20,20,19,0.02), rgba(20,20,19,0) 22%, rgba(20,20,19,0) 78%, rgba(20,20,19,0.025))",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: "rgba(20,20,19,0.035)",
            }}
          />

          {/* 报头 */}
          <div
            style={{
              position: "absolute",
              left: 48,
              right: 48,
              top: 24,
              display: "flex",
              justifyContent: "space-between",
              fontFamily: FONTS.mono,
              fontSize: 11.5,
              letterSpacing: "0.18em",
              color: COLORS.grey,
            }}
          >
            <span>ARCHIVE EDITION · NO. 02</span>
            <span>THE RULE ERA · SPECIAL REPORT</span>
          </div>
          <Rule top={52} />
          <Rule top={57} />

          <div
            style={{
              position: "absolute",
              left: 48,
              right: 48,
              top: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
            }}
          >
            <Snowflake />
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 76,
                lineHeight: 1,
                letterSpacing: "0.035em",
                color: COLORS.ink,
              }}
            >
              THE AI WINTER
            </span>
            <Snowflake />
          </div>

          <div
            style={{
              position: "absolute",
              left: 48,
              right: 48,
              top: 154,
              textAlign: "center",
              fontFamily: FONTS.mono,
              fontSize: 12.5,
              letterSpacing: "0.2em",
              color: COLORS.grey,
            }}
          >
            VOL. II · NO. 2 ｜ 1974 — 1993 ｜ FUNDING &amp; FAITH
          </div>
          <Rule top={180} />
          <Rule top={185} />

          {/* ---------------- 左栏：报道 ---------------- */}
          <div style={{ position: "absolute", left: 48, top: 202, width: 700 }}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: N,
                opacity: 0.9,
              }}
            >
              SPECIAL REPORT · TWO DECADES
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 52,
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                color: COLORS.ink,
              }}
            >
              TWO DECADES
              <br />
              IN THE COLD
            </div>
            <div
              style={{
                marginTop: 16,
                fontFamily: FONTS.serifLatin,
                fontStyle: "italic",
                fontSize: 24,
                lineHeight: 1.35,
                color: COLORS.graphite,
              }}
            >
              Promises outran results — twice.
            </div>

            {/* 两栏短文 */}
            <div style={{ marginTop: 26, display: "flex", gap: 22 }}>
              <div style={{ width: 328 }}>
                <Article
                  year="1974"
                  text="The first winter. After years of bold predictions, funding is cut and the field goes quiet."
                />
                <Article
                  year="1980s"
                  text="Expert systems sell. For a moment, rules look like a business."
                  last
                />
              </div>
              <div style={{ width: 1, backgroundColor: COLORS.lineSoft }} />
              <div style={{ width: 328 }}>
                <Article
                  year="1987"
                  text="The second winter. The money leaves again, and it stays away."
                />
                <Article
                  year="1993"
                  text="The cold ends — but the machine still follows rules, not common sense."
                  last
                />
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                paddingTop: 14,
                borderTop: `1px solid ${N}`,
                width: 660,
                opacity: 0.92,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.serifLatin,
                  fontStyle: "italic",
                  fontSize: 21,
                  letterSpacing: "0.02em",
                  color: COLORS.ink,
                }}
              >
                “Rules alone could not teach common sense.”
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: FONTS.mono,
                  fontSize: 10.5,
                  letterSpacing: "0.18em",
                  color: COLORS.grey,
                }}
              >
                — THE RULE-ERA LESSON
              </div>
            </div>
          </div>

          {/* ---------------- 右栏：经费曲线 ---------------- */}
          <div style={{ position: "absolute", left: 792, top: 202, width: 800 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 13,
                  letterSpacing: "0.18em",
                  color: COLORS.ink,
                }}
              >
                FUNDING &amp; FAITH, 1974–1993
              </span>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  color: COLORS.grey,
                }}
              >
                INDEXED / ARCHIVE
              </span>
            </div>

            <div style={{ position: "relative", marginTop: 10, width: 800, height: 380 }}>
              <svg width={800} height={380} viewBox="0 0 800 380" style={{ position: "absolute", inset: 0 }}>
                {/* 两次寒冬的浅灰底带 */}
                <rect x={133} y={30} width={149} height={300} fill={N} opacity={prog(frame, 24, 30) * 0.055} />
                <rect x={538} y={30} width={222} height={300} fill={N} opacity={prog(frame, 24, 30) * 0.055} />

                {/* 坐标轴 / 网格 */}
                <g stroke={COLORS.ink} strokeWidth={1} opacity={prog(frame, 18, 24) * 0.22}>
                  <line x1={60} y1={30} x2={60} y2={330} />
                  <line x1={60} y1={330} x2={770} y2={330} />
                  <line x1={60} y1={120} x2={770} y2={120} strokeDasharray="2 6" opacity={0.6} />
                  <line x1={60} y1={210} x2={770} y2={210} strokeDasharray="2 6" opacity={0.6} />
                  <line x1={60} y1={300} x2={770} y2={300} strokeDasharray="2 6" opacity={0.6} />
                </g>

                {/* 曲线下方淡影 */}
                <path d={AREA} fill={N} opacity={prog(frame, 280, 45) * 0.07} />

                {/* 主曲线 */}
                <g opacity={prog(frame, 80, 16)}>
                  <DrawPath d={CURVE} start={90} dur={260} stroke={N} width={3.2} opacity={0.92} endDot={false} />
                </g>

                {/* 刻度 */}
                <g
                  fontFamily={FONTS.mono}
                  fontSize={12}
                  fill={COLORS.grey}
                  letterSpacing="0.08em"
                  opacity={prog(frame, 28, 24) * 0.9}
                >
                  <text x={60} y={350} textAnchor="middle">1974</text>
                  <text x={281} y={350} textAnchor="middle">1980</text>
                  <text x={539} y={350} textAnchor="middle">1987</text>
                  <text x={760} y={350} textAnchor="middle">1993</text>
                </g>
                <text
                  x={20}
                  y={180}
                  transform="rotate(-90 20 180)"
                  textAnchor="middle"
                  fontFamily={FONTS.mono}
                  fontSize={10.5}
                  letterSpacing="0.2em"
                  fill={COLORS.grey}
                  opacity={prog(frame, 30, 24) * 0.8}
                >
                  FUNDING
                </text>

                {/* 第一次下跌箭头 */}
                <g
                  stroke={N}
                  fill="none"
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={prog(frame, STAMP_I - 12, 16) * 0.55}
                >
                  <path d="M 170 130 L 170 236" />
                  <path d="M 163 226 L 170 238 L 177 226" />
                </g>
                {/* 专家系统回暖标注 */}
                <g opacity={prog(frame, HUM - 12, 18)}>
                  <path d="M 428 178 L 428 158" stroke={N} strokeWidth={1.4} opacity={0.6} fill="none" />
                  <circle cx={428} cy={178} r={4} fill={N} opacity={0.8} />
                  <rect x={300} y={108} width={206} height={48} rx={6} fill={COLORS.paperWhite} stroke={N} strokeOpacity={0.3} />
                  <text x={314} y={126} fontFamily={FONTS.mono} fontSize={12} letterSpacing="0.13em" fill={N}>
                    EXPERT SYSTEMS
                  </text>
                  <text x={314} y={141} fontFamily={FONTS.mono} fontSize={10.5} letterSpacing="0.1em" fill={COLORS.grey}>
                    BRIEF REBOUND · 1980s
                  </text>
                </g>
                {/* 第二次下跌箭头 */}
                <g
                  stroke={N}
                  fill="none"
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={prog(frame, STAMP_II - 12, 16) * 0.55}
                >
                  <path d="M 555 205 L 555 290" />
                  <path d="M 548 280 L 555 292 L 562 280" />
                </g>

                {/* 终点 */}
                <circle
                  cx={760}
                  cy={326}
                  r={4.5}
                  fill={COLORS.paperWhite}
                  stroke={N}
                  strokeWidth={2}
                  opacity={prog(frame, 340, 24)}
                />
              </svg>

              {/* 寒冬印章 */}
              <WinterStamp
                label="WINTER I"
                sub="1974–1980"
                left={104}
                top={196}
                rotate={-7}
                start={STAMP_I}
                frame={frame}
              />
              <WinterStamp
                label="WINTER II"
                sub="1987–1993"
                left={512}
                top={246}
                rotate={-5}
                start={STAMP_II}
                frame={frame}
              />
            </div>
          </div>

          {/* 页脚 */}
          <div
            style={{
              position: "absolute",
              left: 48,
              right: 48,
              top: 640,
              borderTop: `1px solid ${COLORS.line}`,
              paddingTop: 10,
              display: "flex",
              justifyContent: "space-between",
              fontFamily: FONTS.mono,
              fontSize: 10.5,
              letterSpacing: "0.16em",
              color: COLORS.grey,
            }}
          >
            <span>THE AI WINTER · PAGE A1</span>
            <span>TWO DECADES · TWO WINTERS</span>
          </div>
        </div>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 96,
            maxWidth: 1570,
            borderLeft: `3px solid ${N}`,
            paddingLeft: 26,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 40, lineHeight: 1.5 }}>
            两次寒冬，二十年冷板凳——规则喂得再多，机器仍不懂常识。
          </div>
          <div
            style={{
              ...TYPE.en,
              fontStyle: "italic",
              fontSize: 32,
              color: COLORS.grey,
              marginTop: 8,
              opacity: copyEn,
            }}
          >
            Two AI winters — rules alone could not teach common sense.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：翻报 / 两次下跌 / 回暖 */}
      <Sequence from={0} durationInFrames={80}>
        <Audio src={staticFile("sfx/page-flip.wav")} volume={0.45} />
      </Sequence>
      <Sequence from={STAMP_I} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={HUM} durationInFrames={60}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={STAMP_II} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.68} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 报纸零件 */

const Rule = ({ top }: { top: number }) => (
  <div
    style={{
      position: "absolute",
      left: 48,
      right: 48,
      top,
      height: 1,
      backgroundColor: COLORS.ink,
      opacity: 0.5,
    }}
  />
);

const Snowflake = () => (
  <svg width={30} height={30} viewBox="0 0 30 30" aria-hidden>
    <g stroke={ERA.newsprint} strokeWidth={1.2} strokeLinecap="round" opacity={0.85}>
      <line x1="15" y1="3" x2="15" y2="27" />
      <line x1="4.6" y1="9" x2="25.4" y2="21" />
      <line x1="4.6" y1="21" x2="25.4" y2="9" />
      <path d="M 11.6 6 L 15 9 L 18.4 6" fill="none" />
      <path d="M 11.6 24 L 15 21 L 18.4 24" fill="none" />
      <path d="M 6.4 12.6 L 10.4 13.6 L 8.4 17.2" fill="none" />
      <path d="M 23.6 17.4 L 19.6 16.4 L 21.6 12.8" fill="none" />
      <path d="M 6.4 17.4 L 10.4 16.4 L 8.4 12.8" fill="none" />
      <path d="M 23.6 12.6 L 19.6 13.6 L 21.6 17.2" fill="none" />
    </g>
  </svg>
);

const Article = ({ year, text, last = false }: { year: string; text: string; last?: boolean }) => (
  <div style={{ marginBottom: last ? 0 : 14 }}>
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize: 13,
        letterSpacing: "0.08em",
        color: ERA.newsprint,
        marginRight: 8,
      }}
    >
      {year}
    </span>
    <span
      style={{
        fontFamily: FONTS.sansCN,
        fontSize: 15.5,
        lineHeight: 1.6,
        color: COLORS.grey,
      }}
    >
      {text}
    </span>
  </div>
);

const WinterStamp = ({
  label,
  sub,
  left,
  top,
  rotate,
  start,
  frame,
}: {
  label: string;
  sub: string;
  left: number;
  top: number;
  rotate: number;
  start: number;
  frame: number;
}) => {
  const p = EASE.outExpo(prog(frame, start, 24));
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        border: `2px solid ${ERA.newsprint}`,
        backgroundColor: "rgba(250,249,245,0.88)",
        color: ERA.newsprint,
        padding: "8px 14px 7px",
        opacity: Math.min(1, p * 1.8),
        transform: `rotate(${rotate}deg) scale(${1 + (1 - p) * 0.16})`,
        boxShadow: "inset 0 0 0 1px rgba(107,102,92,0.28)",
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 16,
          letterSpacing: "0.14em",
          lineHeight: 1.1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 4,
          fontFamily: FONTS.mono,
          fontSize: 10.5,
          letterSpacing: "0.16em",
          opacity: 0.8,
        }}
      >
        {sub}
      </div>
    </div>
  );
};
