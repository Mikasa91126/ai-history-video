/**
 * S08 · 第二次 AI 寒冬（300f）｜规则时代
 * 深色图表：Lisp 机市场单次下坠 + WINTER II 印章；
 * 巨字 1987 压住画面左侧。时代色：sepia。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const ACCENT = ERA.sepia;
const CRASH_AT = 104;
const STAMP_AT = 150;

const CURVE =
  "M 64 96 C 180 92, 260 82, 332 88 C 402 96, 424 132, 482 300 C 512 360, 562 372, 642 374 L 1108 376";
const AREA = `${CURVE} L 1108 408 L 64 408 Z`;

export const S08 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = prog(frame, 0, 7);
  const yearP = EASE.outExpo(prog(frame, 6, 32));
  const panelP = EASE.outExpo(prog(frame, 0, 34));
  const copy = Math.min(prog(frame, 168, 24), 1);
  const copyEn = Math.min(prog(frame, 188, 24), 1);
  const crashP = EASE.outExpo(prog(frame, CRASH_AT, 22));

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
          规则时代 · 1987–1993
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

        {/* 巨字年份 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 176,
            fontFamily: FONTS.mono,
            fontSize: 168,
            lineHeight: 1,
            letterSpacing: "-0.06em",
            color: ACCENT,
            opacity: yearP,
            transform: `translateY(${(1 - yearP) * 22}px)`,
          }}
        >
          1987
        </div>
        <div
          style={{
            position: "absolute",
            left: 146,
            top: 372,
            width: 356,
            height: 1,
            backgroundColor: ACCENT,
            opacity: 0.3,
            transformOrigin: "left center",
            transform: `scaleX(${EASE.outExpo(prog(frame, 24, 34))})`,
          }}
        />

        {/* ---------------- 第二段下跌图 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 600,
            top: 226,
            width: 1180,
            height: 486,
            background:
              "linear-gradient(164deg, #1B1B19 0%, #161614 60%, #111110 100%)",
            border: `1px solid ${COLORS.line}`,
            borderTop: `3px solid ${ACCENT}`,
            boxShadow: "0 34px 90px rgba(0,0,0,0.46)",
            opacity: Math.min(1, prog(frame, 0, 14) * 1.4),
            transform: `translateY(${(1 - panelP) * 24}px)`,
            overflow: "hidden",
          }}
        >
          <svg
            width={1180}
            height={486}
            viewBox="0 0 1180 486"
            style={{ position: "absolute", inset: 0 }}
          >
            <rect
              x={482}
              y={38}
              width={626}
              height={370}
              fill={ACCENT}
              opacity={prog(frame, 26, 28) * 0.045}
            />

            {/* 标题 */}
            <text
              x={64}
              y={36}
              fontFamily={FONTS.mono}
              fontSize={14}
              letterSpacing="0.18em"
              fill={COLORS.ink}
              opacity={prog(frame, 22, 24) * 0.9}
            >
              LISP MACHINE MARKET
            </text>
            <text
              x={1108}
              y={36}
              textAnchor="end"
              fontFamily={FONTS.mono}
              fontSize={13}
              letterSpacing="0.12em"
              fill={COLORS.grey}
              opacity={prog(frame, 22, 24) * 0.8}
            >
              1983–1993
            </text>

            {/* 坐标轴 / 网格 */}
            <g
              stroke={COLORS.ink}
              strokeWidth={1}
              opacity={prog(frame, 20, 24) * 0.2}
            >
              <line x1={64} y1={58} x2={64} y2={408} />
              <line x1={64} y1={408} x2={1120} y2={408} />
              <line x1={64} y1={150} x2={1120} y2={150} strokeDasharray="2 6" opacity={0.55} />
              <line x1={64} y1={238} x2={1120} y2={238} strokeDasharray="2 6" opacity={0.55} />
              <line x1={64} y1={326} x2={1120} y2={326} strokeDasharray="2 6" opacity={0.55} />
            </g>

            <path d={AREA} fill={ACCENT} opacity={prog(frame, 152, 34) * 0.06} />

            <g opacity={prog(frame, 42, 18)}>
              <DrawPath
                d={CURVE}
                start={56}
                dur={112}
                stroke={ACCENT}
                width={3.4}
                opacity={0.95}
                endDot={false}
              />
            </g>

            {/* 崩盘点 */}
            <g opacity={crashP * 0.85}>
              <line
                x1={482}
                y1={58}
                x2={482}
                y2={408}
                stroke={ACCENT}
                strokeWidth={1}
                strokeDasharray="3 5"
                opacity={0.36}
              />
              <path
                d="M 482 208 L 482 300"
                stroke={ACCENT}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
              <path
                d="M 474 290 L 482 304 L 490 290"
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </g>

            <g
              fontFamily={FONTS.mono}
              fontSize={12}
              fill={COLORS.grey}
              letterSpacing="0.08em"
              opacity={prog(frame, 32, 22) * 0.9}
            >
              <text x={64} y={434} textAnchor="middle">1983</text>
              <text x={482} y={434} textAnchor="middle">1987</text>
              <text x={1108} y={434} textAnchor="middle">1993</text>
            </g>
          </svg>

          <WinterStamp frame={frame} />

          <div
            style={{
              position: "absolute",
              left: 508,
              top: 250,
              fontFamily: FONTS.mono,
              fontSize: 14,
              letterSpacing: "0.12em",
              color: ACCENT,
              opacity: crashP * 0.9,
            }}
          >
            1987 · LISP CRASH
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
              fontSize: 38,
              lineHeight: 1.5,
              letterSpacing: "0.01em",
              color: COLORS.ink,
            }}
          >
            1987，Lisp 机崩盘——第二次寒冬，长得让人绝望。
          </div>
          <div
            style={{
              fontFamily: FONTS.serifLatin,
              fontStyle: "italic",
              fontSize: 30,
              lineHeight: 1.4,
              color: COLORS.grey,
              marginTop: 8,
              opacity: copyEn,
            }}
          >
            1987: the second winter — and it lingers.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：崩盘 / 印章落定 */}
      <Sequence from={CRASH_AT} durationInFrames={60}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.56} />
      </Sequence>
      <Sequence from={STAMP_AT} durationInFrames={55}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.36} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 寒冬印章 */

const WinterStamp = ({ frame }: { frame: number }) => {
  const p = EASE.outExpo(prog(frame, STAMP_AT, 26));
  return (
    <div
      style={{
        position: "absolute",
        left: 760,
        top: 108,
        padding: "16px 24px 14px",
        border: `3px solid ${ACCENT}`,
        backgroundColor: COLORS.paperDeep,
        color: ACCENT,
        opacity: Math.min(1, p * 1.8),
        transform: `rotate(-7deg) scale(${1 + (1 - p) * 0.18})`,
        boxShadow: "inset 0 0 0 1px rgba(201,168,118,0.24)",
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 38,
          lineHeight: 1,
          letterSpacing: "0.12em",
        }}
      >
        WINTER II
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: FONTS.mono,
          fontSize: 14,
          letterSpacing: "0.18em",
          opacity: 0.82,
        }}
      >
        1987–1993
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
