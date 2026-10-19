/**
 * S07 · 1986 反向传播（300f）｜规则时代
 * 墨线计算图：输入 → 隐藏层 → 输出，合成误差；误差沿虚线反向流动。
 * 右上《Nature》论文卡一角。时代色：newsprint。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const ACCENT = ERA.newsprint;

const INPUTS = [
  { x: 120, y: 140, label: "x1", at: 30 },
  { x: 120, y: 300, label: "x2", at: 40 },
];
const HIDDEN = [
  { x: 470, y: 100, label: "h1", at: 48 },
  { x: 470, y: 230, label: "h2", at: 56 },
  { x: 470, y: 360, label: "h3", at: 64 },
];
const OUTPUT = { x: 820, y: 230, label: "ŷ", at: 136 };
const TARGET = { x: 820, y: 360, label: "y", at: 148 };
const ERROR = { x: 1030, y: 300, label: "E", at: 168 };

const FORWARD = [
  { d: "M 152 140 C 260 130, 360 108, 434 102", at: 42 },
  { d: "M 152 144 C 260 160, 360 210, 434 226", at: 48 },
  { d: "M 152 150 C 280 220, 360 330, 434 352", at: 54 },
  { d: "M 152 286 C 280 180, 360 120, 434 110", at: 60 },
  { d: "M 152 300 C 260 290, 360 240, 434 234", at: 66 },
  { d: "M 152 312 C 260 330, 360 350, 434 358", at: 72 },
  { d: "M 504 112 C 620 130, 720 180, 786 214", at: 134 },
  { d: "M 504 230 C 620 230, 700 228, 786 230", at: 140 },
  { d: "M 504 348 C 620 330, 720 280, 786 246", at: 146 },
  { d: "M 856 238 C 920 255, 970 280, 1000 292", at: 168 },
  { d: "M 850 360 C 920 350, 970 325, 1000 310", at: 174 },
];

const BACKWARD = [
  { d: "M 1002 282 C 830 180, 640 70, 510 94", at: 184 },
  { d: "M 1000 294 C 820 260, 620 230, 510 226", at: 194 },
  { d: "M 1000 312 C 820 340, 640 370, 510 360", at: 204 },
  { d: "M 438 218 C 330 200, 260 175, 158 150", at: 222 },
  { d: "M 438 242 C 330 260, 260 292, 158 296", at: 232 },
];

export const S07 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = prog(frame, 0, 7);
  const dateP = EASE.outExpo(prog(frame, 6, 30));
  const paperP = EASE.outExpo(prog(frame, 20, 36));
  const copy = Math.min(prog(frame, 208, 24), 1);
  const copyEn = Math.min(prog(frame, 228, 24), 1);

  const errLocal = frame < ERROR.at ? 0 : ((frame - ERROR.at) % 52) / 52;
  const errRing = frame < ERROR.at ? 0 : 34 + errLocal * 44;
  const errRingO = frame < ERROR.at ? 0 : (1 - errLocal) * 0.38;

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
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
          规则时代 · 1986
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

        {/* 年份 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 168,
            fontFamily: FONTS.mono,
            fontSize: 108,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: ACCENT,
            opacity: dateP,
            transform: `translateY(${(1 - dateP) * 16}px)`,
          }}
        >
          1986
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 286,
            width: 300,
            height: 1,
            backgroundColor: ACCENT,
            opacity: 0.36,
            transformOrigin: "left center",
            transform: `scaleX(${EASE.outExpo(prog(frame, 24, 36))})`,
          }}
        />

        {/* ---------------- 《Nature》论文卡 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 1390,
            top: 154,
            width: 390,
            height: 332,
            background: "linear-gradient(154deg, #1C1C1A 0%, #151513 62%, #111110 100%)",
            border: `1px solid ${COLORS.line}`,
            borderTop: `2px solid ${ACCENT}66`,
            boxShadow: "0 26px 62px rgba(0,0,0,0.46)",
            padding: "28px 30px",
            boxSizing: "border-box",
            opacity: paperP,
            transform: `translateY(${(1 - paperP) * 28}px) rotate(${2.4 - paperP * 1.1}deg)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 58,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: COLORS.ink,
              }}
            >
              Nature
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                letterSpacing: "0.14em",
                color: ACCENT,
              }}
            >
              1986
            </span>
          </div>
          <div
            style={{
              height: 1,
              backgroundColor: COLORS.line,
              marginTop: 18,
              marginBottom: 16,
            }}
          />
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11.5,
              letterSpacing: "0.12em",
              color: COLORS.grey,
            }}
          >
            VOL. 323 · 9 OCTOBER 1986
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: FONTS.serifLatin,
              fontWeight: 500,
              fontSize: 26,
              lineHeight: 1.28,
              letterSpacing: "-0.01em",
              color: COLORS.ink,
            }}
          >
            Learning representations
            <br />
            by back-propagating
            <br />
            errors
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: FONTS.mono,
              fontSize: 11.5,
              lineHeight: 1.6,
              letterSpacing: "0.08em",
              color: COLORS.grey,
            }}
          >
            RUMELHART · HINTON
            <br />
            WILLIAMS
          </div>
        </div>

        {/* ---------------- 计算图 ---------------- */}
        <div style={{ position: "absolute", left: 140, top: 306, width: 1200, height: 448 }}>
          <svg width={1200} height={448} viewBox="0 0 1200 448" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <marker
                id="s07-arrow-fwd"
                viewBox="0 0 10 10"
                refX="8.5"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 Z" fill={COLORS.ink} />
              </marker>
              <marker
                id="s07-arrow-back"
                viewBox="0 0 10 10"
                refX="8.5"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 Z" fill={ACCENT} />
              </marker>
            </defs>

            {/* 列标签 */}
            <g
              fontFamily={FONTS.mono}
              fontSize={12}
              letterSpacing="0.18em"
              fill={COLORS.grey}
              opacity={prog(frame, 18, 24) * 0.72}
            >
              <text x={120} y={26} textAnchor="middle">INPUT</text>
              <text x={470} y={26} textAnchor="middle">HIDDEN</text>
              <text x={820} y={26} textAnchor="middle">OUTPUT</text>
              <text x={1030} y={26} textAnchor="middle">ERROR</text>
            </g>

            {/* 前向边 */}
            {FORWARD.map((e, i) => {
              const p = EASE.draw(prog(frame, e.at, 34));
              return (
                <path
                  key={`f-${i}`}
                  d={e.d}
                  fill="none"
                  stroke={COLORS.ink}
                  strokeWidth={1.35}
                  strokeOpacity={0.42}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={1 - p}
                  markerEnd={p > 0.82 ? "url(#s07-arrow-fwd)" : "none"}
                />
              );
            })}

            {/* 反向误差流 */}
            {BACKWARD.map((e, i) => {
              const p = prog(frame, e.at, 18);
              const flow = Math.max(0, frame - e.at) * 1.5;
              return (
                <path
                  key={`b-${i}`}
                  d={e.d}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth={2}
                  strokeOpacity={p * 0.66}
                  strokeLinecap="round"
                  strokeDasharray="9 11"
                  strokeDashoffset={-flow}
                  markerEnd={p > 0.18 ? "url(#s07-arrow-back)" : "none"}
                />
              );
            })}

            {/* 误差节点辉光 */}
            <circle
              cx={ERROR.x}
              cy={ERROR.y}
              r={errRing}
              fill="none"
              stroke={ACCENT}
              strokeWidth={1.6}
              opacity={errRingO}
            />
            <circle
              cx={ERROR.x}
              cy={ERROR.y}
              r={52}
              fill={ACCENT}
              opacity={
                (0.03 + 0.12 * Math.exp(-(((frame - ERROR.at) % 52) / 12))) *
                prog(frame, ERROR.at, 22)
              }
            />

            {/* 节点 */}
            {INPUTS.map((n) => (
              <Node key={n.label} {...n} frame={frame} />
            ))}
            {HIDDEN.map((n) => (
              <Node key={n.label} {...n} frame={frame} />
            ))}
            <Node {...OUTPUT} frame={frame} accent />
            <Node {...TARGET} frame={frame} />
            <Node {...ERROR} frame={frame} accent />
          </svg>
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
            1986，《Nature》上的反向传播——机器学会了「纠错」。
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
            1986: backpropagation, in Nature — machines learn by correcting errors.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：图线起笔 / 误差抵达 */}
      <Sequence from={36} durationInFrames={60}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.32} />
      </Sequence>
      <Sequence from={ERROR.at} durationInFrames={55}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.4} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 计算图节点 */

const Node = ({
  x,
  y,
  label,
  at,
  frame,
  accent = false,
}: {
  x: number;
  y: number;
  label: string;
  at: number;
  frame: number;
  accent?: boolean;
}) => {
  const p = prog(frame, at, 22);
  const r = accent ? 36 : 32;
  return (
    <g opacity={p}>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={COLORS.paperDeep}
        stroke={accent ? ACCENT : COLORS.ink}
        strokeWidth={accent ? 2.4 : 1.8}
        strokeOpacity={accent ? 0.95 : 0.72}
      />
      {accent ? (
        <circle
          cx={x + 1}
          cy={y - 1}
          r={r}
          fill="none"
          stroke={ACCENT}
          strokeWidth={0.8}
          strokeOpacity={0.28}
        />
      ) : null}
      <text
        x={x}
        y={y + 7}
        textAnchor="middle"
        fontFamily={FONTS.mono}
        fontSize={accent ? 21 : 19}
        fill={COLORS.ink}
      >
        {label}
      </text>
    </g>
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
