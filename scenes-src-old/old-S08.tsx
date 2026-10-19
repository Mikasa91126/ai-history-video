/**
 * S08 · AlphaGo（76s–94s · 1080f）
 * 棋盘棕：19×19 棋局与「4:1」。镜内 480–1080f（全片 84–94s）为音乐安静段：
 * 长考屏息——动作极少，只有两枚棋子落定与呼吸感，结尾柔和退场。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { breathe, mulberry32, prog } from "../lib/anim";

const B = (i: number): number => Math.round(37.7 + i * 56.25);
const FOUR = B(3);
const Q1 = 504;
const Q2 = 888;

const BOARD = 660;
const PAD = 26;
const CELL = (BOARD - PAD * 2) / 18;
const WOOD = "#5E4630";

type Side = "ink" | "paper";
type Group = { at: number; stones: [number, number, Side][] };

const GROUPS: Group[] = [
  {
    at: 38,
    stones: [
      [3, 3, "ink"], [15, 3, "paper"], [3, 15, "ink"], [15, 15, "paper"],
      [6, 6, "ink"], [12, 6, "paper"], [6, 12, "paper"], [12, 12, "ink"],
    ],
  },
  {
    at: 94,
    stones: [
      [9, 9, "ink"], [8, 4, "paper"], [10, 5, "ink"], [4, 8, "paper"],
      [14, 8, "ink"], [8, 14, "paper"], [16, 10, "ink"], [5, 5, "paper"],
    ],
  },
  {
    at: 150,
    stones: [
      [7, 8, "ink"], [11, 11, "paper"], [9, 12, "ink"], [10, 8, "paper"],
      [4, 10, "ink"], [14, 12, "paper"], [16, 12, "ink"], [11, 15, "paper"],
    ],
  },
  {
    at: 207,
    stones: [
      [6, 7, "ink"], [7, 6, "paper"], [13, 6, "ink"], [12, 7, "paper"],
      [8, 10, "ink"], [10, 9, "paper"], [5, 12, "ink"], [13, 13, "paper"],
    ],
  },
  {
    at: 263,
    stones: [
      [9, 6, "ink"], [9, 7, "paper"], [14, 9, "ink"], [13, 10, "paper"],
      [6, 9, "ink"], [7, 10, "paper"], [15, 7, "ink"], [14, 6, "paper"],
    ],
  },
  {
    at: 319,
    stones: [
      [11, 7, "ink"], [12, 8, "paper"], [10, 11, "ink"], [11, 10, "paper"],
      [5, 7, "ink"], [4, 6, "paper"], [16, 8, "ink"], [15, 9, "paper"],
    ],
  },
];

const FLAT = GROUPS.flatMap((g) => g.stones.map((s, i) => ({ c: s[0], r: s[1], side: s[2], at: g.at + i * 3.5 })));

export const S08 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = Math.min(prog(frame, 0, 12), 1 - prog(frame, dur - 14, 14));
  const boardP = EASE.outExpo(prog(frame, 0, 32));
  const copy = Math.min(prog(frame, 180, 28), 1 - prog(frame, dur - 14, 14));
  const copyEn = Math.min(prog(frame, 202, 28), 1 - prog(frame, dur - 14, 14));
  const fourP = EASE.outExpo(prog(frame, FOUR, 26));
  const br = breathe(frame, 225);
  const latest = frame >= Q2 ? { c: 11, r: 8 } : { c: 13, r: 8 };

  const q1 = stoneXY(13, 8);
  const q2 = stoneXY(11, 8);
  const ring1P = prog(frame, Q1, 85);
  const ring2P = prog(frame, Q2, 85);

  return (
    <PaperStage dur={dur} tone="medium" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 章节标签 */}
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          学习时代 · 2016 ｜ THE LEARNING ERA
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 136,
            width: 300,
            height: 1,
            backgroundColor: ERA.sepia,
            opacity: 0.42,
            transformOrigin: "left center",
            transform: `scaleX(${EASE.outExpo(prog(frame, 10, 40))})`,
          }}
        />

        {/* ---------------- 左：比分 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 186,
            fontFamily: FONTS.mono,
            fontSize: 13.5,
            letterSpacing: "0.22em",
            color: COLORS.grey,
            opacity: prog(frame, 24, 22) * 0.85,
          }}
        >
          SEOUL · MARCH 2016
        </div>

        <div
          style={{
            position: "absolute",
            left: 133,
            top: 214,
            fontFamily: FONTS.mono,
            fontSize: 236,
            lineHeight: 1,
            letterSpacing: "-0.055em",
            color: ERA.sepia,
            fontVariantNumeric: "tabular-nums",
            opacity: Math.min(1, prog(frame, FOUR, 8) * 1.6),
            transform: `translateY(${(1 - fourP) * 20}px) scale(${1 + (1 - fourP) * 0.05})`,
            transformOrigin: "left center",
          }}
        >
          4:1
        </div>

        <div
          style={{
            position: "absolute",
            left: 144,
            top: 468,
            width: 570,
            height: 1,
            backgroundColor: ERA.sepia,
            opacity: 0.4 * fourP,
            transformOrigin: "left center",
            transform: `scaleX(${fourP})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 486,
            fontFamily: FONTS.mono,
            fontSize: 23,
            letterSpacing: "0.16em",
            color: COLORS.ink,
            opacity: prog(frame, FOUR + 10, 26),
          }}
        >
          ALPHAGO × LEE SEDOL
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 524,
            fontFamily: FONTS.mono,
            fontSize: 12.5,
            letterSpacing: "0.16em",
            color: COLORS.grey,
            opacity: prog(frame, FOUR + 18, 26) * 0.8,
          }}
        >
          FIVE GAMES · 19 × 19 · NO HANDICAP
        </div>

        {/* 五局记分 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 574,
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: prog(frame, FOUR + 20, 26) * 0.95,
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const win = i !== 3;
              const p = EASE.outExpo(prog(frame, FOUR + 22 + i * 9, 22));
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 5,
                    opacity: Math.min(1, p * 1.7),
                    transform: `translateY(${(1 - p) * 8}px) scale(${0.9 + p * 0.1})`,
                  }}
                >
                  <div
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 99,
                      backgroundColor: win ? ERA.sepia : "transparent",
                      border: `1.5px solid ${ERA.sepia}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 8,
                      letterSpacing: "0.06em",
                      color: COLORS.grey,
                    }}
                  >
                    G{i + 1}
                  </span>
                </div>
              );
            })}
          </div>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              letterSpacing: "0.16em",
              color: COLORS.grey,
              opacity: 0.75,
            }}
          >
            4 WINS · 1 LOSS
          </span>
        </div>

        {/* ---------------- 右：棋局 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 1120,
            top: 160,
            width: BOARD,
            height: BOARD,
            opacity: Math.min(1, prog(frame, 0, 18) * 1.4),
            transform: `translateY(${(1 - boardP) * 20}px)`,
            filter: "drop-shadow(0 34px 54px rgba(20,20,19,0.16))",
          }}
        >
          <svg width={BOARD} height={BOARD} viewBox={`0 0 ${BOARD} ${BOARD}`}>
            <defs>
              <linearGradient id="s08-wood" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6E5339" />
                <stop offset="55%" stopColor={WOOD} />
                <stop offset="100%" stopColor="#513B28" />
              </linearGradient>
              <radialGradient id="s08-light" cx="22%" cy="10%" r="88%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.14" />
                <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="s08-ink" cx="35%" cy="28%" r="78%">
                <stop offset="0%" stopColor="#454440" />
                <stop offset="55%" stopColor="#1C1B19" />
                <stop offset="100%" stopColor="#0B0B0A" />
              </radialGradient>
              <radialGradient id="s08-paper" cx="36%" cy="26%" r="82%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="58%" stopColor="#F4F0E6" />
                <stop offset="100%" stopColor="#CFC7B6" />
              </radialGradient>
            </defs>

            <rect x={0} y={0} width={BOARD} height={BOARD} rx={5} fill="url(#s08-wood)" />
            {/* 木纹 */}
            <g stroke={COLORS.paperWhite} strokeWidth={0.8} opacity={0.03}>
              {Array.from({ length: 13 }, (_, i) => {
                const rnd = mulberry32(2016 + i * 31);
                const y = 18 + rnd() * (BOARD - 36);
                return <line key={i} x1={8} y1={y} x2={BOARD - 8} y2={y + (rnd() - 0.5) * 6} />;
              })}
            </g>
            <rect x={0} y={0} width={BOARD} height={BOARD} rx={5} fill="url(#s08-light)" />
            <rect x={8} y={8} width={BOARD - 16} height={BOARD - 16} rx={2} fill="none" stroke={COLORS.paperWhite} strokeOpacity={0.1} />

            {/* 19×19 线 */}
            <g stroke={COLORS.paperWhite} strokeOpacity={0.34} strokeWidth={1}>
              {Array.from({ length: 19 }, (_, i) => (
                <line key={`v${i}`} x1={PAD + i * CELL} y1={PAD} x2={PAD + i * CELL} y2={BOARD - PAD} />
              ))}
              {Array.from({ length: 19 }, (_, i) => (
                <line key={`h${i}`} x1={PAD} y1={PAD + i * CELL} x2={BOARD - PAD} y2={PAD + i * CELL} />
              ))}
            </g>

            {/* 星位 */}
            <g fill={COLORS.paperWhite} opacity={0.58}>
              {[3, 9, 15].flatMap((c) => [3, 9, 15].map((r) => (
                <circle key={`${c}-${r}`} cx={PAD + c * CELL} cy={PAD + r * CELL} r={2.6} />
              )))}
            </g>

            {/* 坐标 */}
            <g fontFamily={FONTS.mono} fontSize={8.5} fill={COLORS.paperWhite} opacity={0.4}>
              {Array.from({ length: 19 }, (_, i) => (
                <text key={`l${i}`} x={PAD + i * CELL} y={BOARD - 7} textAnchor="middle">
                  {String.fromCharCode(65 + (i >= 8 ? i + 1 : i))}
                </text>
              ))}
              {Array.from({ length: 19 }, (_, i) => (
                <text key={`n${i}`} x={12} y={PAD + i * CELL + 3} textAnchor="middle">
                  {19 - i}
                </text>
              ))}
            </g>

            {/* 棋子 */}
            {FLAT.map((s, i) => {
              const cx = PAD + s.c * CELL;
              const cy = PAD + s.r * CELL;
              const p = EASE.outExpo(prog(frame, s.at, 18));
              const ink = s.side === "ink";
              return (
                <g key={i} opacity={Math.min(1, p * 1.7)} transform={`translate(0 ${(1 - p) * -5})`}>
                  <ellipse cx={cx + 1.5} cy={cy + 4} rx={14} ry={4.6} fill={COLORS.ink} opacity={0.32} />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={14.4}
                    fill={ink ? "url(#s08-ink)" : "url(#s08-paper)"}
                    stroke={ink ? "rgba(250,249,245,0.16)" : "rgba(20,20,19,0.38)"}
                    strokeWidth={0.9}
                  />
                  <circle cx={cx - 4.2} cy={cy - 4.6} r={3.1} fill={COLORS.paperWhite} opacity={ink ? 0.16 : 0.65} />
                </g>
              );
            })}

            {/* 安静段落：两枚棋子落定 + 呼吸环 */}
            <QuietStone c={13} r={8} at={Q1} frame={frame} side="paper" />
            <QuietStone c={11} r={8} at={Q2} frame={frame} side="ink" />
            <circle
              cx={PAD + latest.c * CELL}
              cy={PAD + latest.r * CELL}
              r={18 + br * 2.8}
              fill="none"
              stroke={COLORS.paperWhite}
              strokeWidth={1}
              opacity={frame >= Q1 ? 0.055 + br * 0.11 : 0}
            />
            <circle
              cx={q1.x}
              cy={q1.y}
              r={16 + EASE.outExpo(ring1P) * 52}
              fill="none"
              stroke={COLORS.paperWhite}
              strokeWidth={1}
              opacity={frame >= Q1 ? (1 - ring1P) * 0.42 : 0}
            />
            <circle
              cx={q2.x}
              cy={q2.y}
              r={16 + EASE.outExpo(ring2P) * 52}
              fill="none"
              stroke={COLORS.paperWhite}
              strokeWidth={1}
              opacity={frame >= Q2 ? (1 - ring2P) * 0.42 : 0}
            />
          </svg>
        </div>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 96,
            maxWidth: 1060,
            borderLeft: `3px solid ${ERA.sepia}`,
            paddingLeft: 26,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 38, lineHeight: 1.5 }}>
            2016，AlphaGo 4:1 李世石——直觉，被机器学会。
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
            2016 — AlphaGo 4–1 Lee Sedol. Intuition, learned.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：入场 / 落子 / 4:1 / 屏息段两枚棋子 */}
      <Sequence from={0} durationInFrames={70}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.2} />
      </Sequence>
      <Sequence from={38} durationInFrames={70}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={FOUR} durationInFrames={90}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={Q1} durationInFrames={70}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={Q2} durationInFrames={70}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.2} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 棋子定位 */

function stoneXY(c: number, r: number): { x: number; y: number } {
  return { x: PAD + c * CELL, y: PAD + r * CELL };
}

/* ---------------------------------------------------------------- 屏息落子 */

const QuietStone = ({
  c,
  r,
  at,
  frame,
  side,
}: {
  c: number;
  r: number;
  at: number;
  frame: number;
  side: Side;
}) => {
  const p = EASE.outExpo(prog(frame, at, 30));
  if (frame < at) return null;
  const { x, y } = stoneXY(c, r);
  const ink = side === "ink";
  return (
    <g opacity={Math.min(1, p * 1.5)} transform={`translate(0 ${(1 - p) * -3})`}>
      <ellipse cx={x + 1.5} cy={y + 4} rx={14} ry={4.6} fill={COLORS.ink} opacity={0.32} />
      <circle
        cx={x}
        cy={y}
        r={14.4}
        fill={ink ? "url(#s08-ink)" : "url(#s08-paper)"}
        stroke={ink ? "rgba(250,249,245,0.16)" : "rgba(20,20,19,0.38)"}
        strokeWidth={0.9}
      />
      <circle cx={x - 4.2} cy={y - 4.6} r={3.1} fill={COLORS.paperWhite} opacity={ink ? 0.16 : 0.65} />
    </g>
  );
};
