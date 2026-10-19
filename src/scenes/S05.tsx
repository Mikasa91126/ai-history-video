/**
 * S05 · 第一次 AI 寒冬（360f）｜规则时代
 * 深色报纸头版：1969《Perceptrons》判决 + 1973 Lighthill 经费寒冬，
 * 右侧只画本页的一次下跌。时代色：newsprint。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const ACCENT = ERA.newsprint;
const DROP_AT = 150;

const CURVE = "M 80 96 C 160 92, 212 88, 272 98 C 334 108, 366 142, 432 302 L 720 308";
const AREA = `${CURVE} L 720 334 L 80 334 Z`;

export const S05 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = prog(frame, 0, 7);
  const sheetP = EASE.outExpo(prog(frame, 0, 36));
  const copy = Math.min(prog(frame, 172, 24), 1);
  const copyEn = Math.min(prog(frame, 192, 24), 1);
  const dropP = EASE.outExpo(prog(frame, DROP_AT, 24));

  return (
    <PaperStage dur={dur} tone="medium" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 章节标签 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 96,
            fontFamily: FONTS.mono,
            fontSize: 24,
            letterSpacing: "0.2em",
            color: ACCENT,
          }}
        >
          规则时代 · 1969–1973
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 136,
            width: 300,
            height: 1,
            backgroundColor: ACCENT,
            opacity: 0.42,
            transformOrigin: "left center",
            transform: `scaleX(${EASE.outExpo(prog(frame, 10, 32))})`,
          }}
        />

        {/* ---------------- 报纸头版 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 176,
            width: 1640,
            height: 590,
            background:
              "linear-gradient(168deg, #1A1A18 0%, #161614 58%, #111110 100%)",
            border: `1px solid ${COLORS.line}`,
            boxShadow: "0 34px 90px rgba(0,0,0,0.46)",
            opacity: Math.min(1, prog(frame, 0, 14) * 1.4),
            transform: `translateY(${(1 - sheetP) * 26}px) rotate(${
              -0.45 + (1 - sheetP) * 0.3
            }deg)`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(243,240,231,0.02), rgba(243,240,231,0) 22%, rgba(243,240,231,0) 78%, rgba(243,240,231,0.018))",
              pointerEvents: "none",
            }}
          />

          {/* 报头 */}
          <div
            style={{
              position: "absolute",
              left: 56,
              right: 56,
              top: 30,
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 62,
                lineHeight: 1,
                letterSpacing: "0.035em",
                color: COLORS.ink,
              }}
            >
              THE FIRST WINTER
            </span>
          </div>
          <Rule top={110} />
          <Rule top={115} />

          {/* 左栏：1969 判决 / 1973 报告 */}
          <div style={{ position: "absolute", left: 56, top: 144, width: 700 }}>
            <div
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 48,
                lineHeight: 1.04,
                letterSpacing: "-0.01em",
                color: COLORS.ink,
              }}
            >
              A BOOK SAYS
              <br />
              MACHINES CAN'T
            </div>
            <div style={{ width: 620, height: 1, backgroundColor: COLORS.line, marginTop: 22 }} />

            <div style={{ display: "flex", gap: 24, marginTop: 32 }}>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 34,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: ACCENT,
                }}
              >
                1969
              </span>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.serifLatin,
                    fontStyle: "italic",
                    fontSize: 30,
                    lineHeight: 1.1,
                    color: COLORS.ink,
                  }}
                >
                  《Perceptrons》
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    letterSpacing: "0.16em",
                    color: COLORS.grey,
                  }}
                >
                  MINSKY &amp; PAPER
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 24, marginTop: 34 }}>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 34,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: ACCENT,
                }}
              >
                1973
              </span>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.serifLatin,
                    fontStyle: "italic",
                    fontSize: 30,
                    lineHeight: 1.1,
                    color: COLORS.ink,
                  }}
                >
                  Lighthill Report
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    letterSpacing: "0.16em",
                    color: COLORS.grey,
                  }}
                >
                  FUNDING CUT
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 804,
              top: 144,
              bottom: 42,
              width: 1,
              backgroundColor: COLORS.lineSoft,
            }}
          />

          {/* 右栏：第一次下跌 */}
          <div style={{ position: "absolute", left: 846, top: 140, width: 738, height: 408 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  letterSpacing: "0.18em",
                  color: COLORS.ink,
                }}
              >
                FUNDING &amp; FAITH
              </span>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  color: COLORS.grey,
                }}
              >
                1969–1976
              </span>
            </div>

            <div style={{ position: "relative", marginTop: 8, width: 738, height: 370 }}>
              <svg
                width={738}
                height={370}
                viewBox="0 0 738 370"
                style={{ position: "absolute", inset: 0 }}
              >
                <rect
                  x={420}
                  y={26}
                  width={282}
                  height={278}
                  fill={ACCENT}
                  opacity={prog(frame, 24, 26) * 0.045}
                />
                <g
                  stroke={COLORS.ink}
                  strokeWidth={1}
                  opacity={prog(frame, 18, 22) * 0.22}
                >
                  <line x1={54} y1={28} x2={54} y2={304} />
                  <line x1={54} y1={304} x2={700} y2={304} />
                  <line x1={54} y1={104} x2={700} y2={104} strokeDasharray="2 6" opacity={0.55} />
                  <line x1={54} y1={192} x2={700} y2={192} strokeDasharray="2 6" opacity={0.55} />
                  <line x1={54} y1={280} x2={700} y2={280} strokeDasharray="2 6" opacity={0.55} />
                </g>

                <path
                  d={AREA}
                  fill={ACCENT}
                  opacity={prog(frame, 170, 30) * 0.055}
                />

                <g opacity={prog(frame, 52, 16)}>
                  <DrawPath
                    d={CURVE}
                    start={70}
                    dur={96}
                    stroke={ACCENT}
                    width={3.2}
                    opacity={0.95}
                    endDot={false}
                  />
                </g>

                {/* 1973 下跌标记 */}
                <g opacity={dropP * 0.8}>
                  <line
                    x1={432}
                    y1={28}
                    x2={432}
                    y2={304}
                    stroke={ACCENT}
                    strokeWidth={1}
                    strokeDasharray="3 5"
                    opacity={0.4}
                  />
                  <path
                    d="M 432 142 L 432 214"
                    stroke={ACCENT}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <path
                    d="M 425 204 L 432 216 L 439 204"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </g>

                <g
                  fontFamily={FONTS.mono}
                  fontSize={12}
                  fill={COLORS.grey}
                  letterSpacing="0.08em"
                  opacity={prog(frame, 30, 22) * 0.9}
                >
                  <text x={80} y={330} textAnchor="middle">1969</text>
                  <text x={432} y={330} textAnchor="middle">1973</text>
                  <text x={700} y={330} textAnchor="middle">1976</text>
                </g>
              </svg>

              <div
                style={{
                  position: "absolute",
                  left: 148,
                  top: 248,
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  letterSpacing: "0.12em",
                  color: ACCENT,
                  opacity: dropP * 0.95,
                }}
              >
                1973 · LIGHTHILL
              </div>

              <WinterStamp
                label="WINTER I"
                sub="1974–1980"
                left={518}
                top={134}
                rotate={-7}
                start={DROP_AT + 8}
                frame={frame}
              />
            </div>
          </div>
        </div>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 92,
            maxWidth: 1450,
            borderLeft: `3px solid ${ACCENT}`,
            paddingLeft: 28,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sansCN,
              fontWeight: 400,
              fontSize: 34,
              lineHeight: 1.5,
              letterSpacing: "0.01em",
              color: COLORS.ink,
            }}
          >
            「机器做不到常识。」1969 的判决、1973 的经费寒冬——第一次 AI 寒冬。
          </div>
          <div
            style={{
              fontFamily: FONTS.serifLatin,
              fontStyle: "italic",
              fontSize: 28,
              lineHeight: 1.4,
              color: COLORS.grey,
              marginTop: 8,
              opacity: copyEn,
            }}
          >
            1969: a book says machines can't; 1973: the funding dries up — the first AI
            winter.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：翻报 / 第一次下跌 */}
      <Sequence from={0} durationInFrames={60}>
        <Audio src={staticFile("sfx/page-flip.wav")} volume={0.36} />
      </Sequence>
      <Sequence from={DROP_AT} durationInFrames={65}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.52} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 报纸零件 */

const Rule = ({ top }: { top: number }) => (
  <div
    style={{
      position: "absolute",
      left: 56,
      right: 56,
      top,
      height: 1,
      backgroundColor: COLORS.ink,
      opacity: 0.45,
    }}
  />
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
  const p = EASE.outExpo(prog(frame, start, 22));
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        border: `2px solid ${ACCENT}`,
        backgroundColor: COLORS.paperDeep,
        color: ACCENT,
        padding: "9px 15px 8px",
        opacity: Math.min(1, p * 1.8),
        transform: `rotate(${rotate}deg) scale(${1 + (1 - p) * 0.16})`,
        boxShadow: "inset 0 0 0 1px rgba(181,176,164,0.22)",
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 18,
          letterSpacing: "0.14em",
          lineHeight: 1.1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 5,
          fontFamily: FONTS.mono,
          fontSize: 11,
          letterSpacing: "0.16em",
          opacity: 0.8,
        }}
      >
        {sub}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- 拼图落位 */

const LandPiece = ({ frame, dur }: { frame: number; dur: number }) => {
  const p = EASE.outExpo(prog(frame, dur - 46, 30));
  if (p <= 0) return null;
  return (
    <svg
      width={54}
      height={54}
      viewBox="0 0 64 64"
      aria-hidden
      style={{
        position: "absolute",
        right: 168,
        bottom: 108,
        opacity: 0.9 * p,
        transform: `translateY(${(1 - p) * -30}px) rotate(${(1 - p) * -8}deg)`,
        transformOrigin: "50% 50%",
      }}
    >
      <path
        d="M10 16 H24 c0-10 12-10 12 0 H54 V28 c10 0 10 12 0 12 v14 H10 Z"
        fill={COLORS.paperDeep}
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M18 38 H46"
        stroke={ACCENT}
        strokeWidth={1}
        strokeOpacity={0.32}
        strokeDasharray="2 4"
      />
    </svg>
  );
};
