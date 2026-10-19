/**
 * S13 · 2016 AlphaGo（900f）
 * REF 1080f → k = dur / 1080。棋盘、4:1 与五局记分按 k 收紧。
 * 全片 79–94s 为本镜；84–94s 的音乐安静段落在镜内 ≈300–900f：
 * 长考屏息，仅保留两枚棋子与呼吸环。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { breathe, mulberry32, prog } from "../lib/anim";

const REF = 1080;
const BASE_B = (i: number): number => 37.7 + i * 56.25;

const BOARD = 660;
const PAD = 26;
const CELL = (BOARD - PAD * 2) / 18;

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

/** 镜末拼图块落位（全片母题） */
const LandPiece = ({ frame, dur }: { frame: number; dur: number }) => {
  const p = EASE.outExpo(prog(frame, dur - 46, 30));
  if (p <= 0) return null;
  return (
    <svg
      width={54}
      height={54}
      viewBox="0 0 64 64"
      style={{
        position: "absolute",
        right: 168,
        bottom: 112,
        opacity: 0.85 * p,
        transform: `translateY(${(1 - p) * -30}px) rotate(${(1 - p) * -8}deg)`,
        transformOrigin: "50% 50%",
      }}
    >
      <path
        d="M10 16 H24 c0-10 12-10 12 0 H54 V28 c10 0 10 12 0 12 v14 H10 Z"
        fill={COLORS.paperWhite}
        stroke={ERA.sepia}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M18 38 H46"
        stroke={ERA.sepia}
        strokeWidth={1}
        strokeOpacity={0.3}
        strokeDasharray="2 4"
      />
    </svg>
  );
};

export const S13 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const k = dur / REF;
  const at = (f: number): number => Math.round(f * k);

  const FOUR = at(BASE_B(3));
  const Q1 = at(504);
  const Q2 = at(888);

  const fade = prog(frame, 0, 7);
  const boardP = EASE.outExpo(prog(frame, 0, 32 * k));
  const copy = Math.min(prog(frame, at(180), 28), 1);
  const copyEn = Math.min(prog(frame, at(202), 28), 1);
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
        {/* 左上 kicker */}
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

        {/* 左：4:1 */}
        <div
          style={{
            position: "absolute",
            left: 132,
            top: 204,
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
            top: 476,
            width: 560,
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
            top: 500,
            fontFamily: FONTS.mono,
            fontSize: 23,
            letterSpacing: "0.16em",
            color: COLORS.ink,
            opacity: prog(frame, FOUR + at(10), 26),
          }}
        >
          ALPHAGO × LEE SEDOL
        </div>

        {/* 五局记分 */}
        <div
          style={{
            position: "absolute",
            left: 142,
            top: 566,
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: prog(frame, FOUR + at(20), 26) * 0.95,
          }}
        >
          <div style={{ display: "flex", gap: 18 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const win = i !== 3;
              const p = EASE.outExpo(prog(frame, FOUR + at(22 + i * 9), 22));
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    opacity: Math.min(1, p * 1.7),
                    transform: `translateY(${(1 - p) * 8}px) scale(${0.9 + p * 0.1})`,
                  }}
                >
                  <div
                    style={{
                      width: 17,
                      height: 17,
                      borderRadius: 99,
                      backgroundColor: win ? ERA.sepia : "transparent",
                      border: `1.5px solid ${ERA.sepia}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 9,
                      letterSpacing: "0.08em",
                      color: COLORS.grey,
                    }}
                  >
                    G{i + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右：深色棋局卡 */}
        <div
          style={{
            position: "absolute",
            left: 1120,
            top: 160,
            width: BOARD,
            height: BOARD,
            opacity: Math.min(1, prog(frame, 0, 18) * 1.4),
            transform: `translateY(${(1 - boardP) * 20}px)`,
            filter: "drop-shadow(0 38px 66px rgba(0,0,0,0.55))",
          }}
        >
          <svg width={BOARD} height={BOARD} viewBox={`0 0 ${BOARD} ${BOARD}`}>
            <defs>
              <linearGradient id="s13-card" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1B1813" />
                <stop offset="55%" stopColor={COLORS.deep} />
                <stop offset="100%" stopColor="#0E0E0C" />
              </linearGradient>
              <radialGradient id="s13-sheen" cx="22%" cy="10%" r="88%">
                <stop offset="0%" stopColor="#F3F0E7" stopOpacity="0.075" />
                <stop offset="58%" stopColor="#F3F0E7" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="s13-ink" cx="35%" cy="28%" r="78%">
                <stop offset="0%" stopColor="#45413A" />
                <stop offset="55%" stopColor="#1C1B18" />
                <stop offset="100%" stopColor="#080807" />
              </radialGradient>
              <radialGradient id="s13-paper" cx="36%" cy="26%" r="82%">
                <stop offset="0%" stopColor="#FFFDF6" />
                <stop offset="58%" stopColor="#F4F0E6" />
                <stop offset="100%" stopColor="#D2C9B7" />
              </radialGradient>
            </defs>

            <rect x={0} y={0} width={BOARD} height={BOARD} rx={7} fill="url(#s13-card)" />
            <rect x={0} y={0} width={BOARD} height={BOARD} rx={7} fill="url(#s13-sheen)" />
            <rect
              x={12}
              y={12}
              width={BOARD - 24}
              height={BOARD - 24}
              rx={2}
              fill="none"
              stroke="rgba(201,168,118,0.24)"
            />

            {/* 木纹的暗色残影 */}
            <g stroke={COLORS.ink} strokeWidth={0.8} opacity={0.025}>
              {Array.from({ length: 13 }, (_, i) => {
                const rnd = mulberry32(2016 + i * 31);
                const y = 18 + rnd() * (BOARD - 36);
                return (
                  <line
                    key={i}
                    x1={8}
                    y1={y}
                    x2={BOARD - 8}
                    y2={y + (rnd() - 0.5) * 6}
                  />
                );
              })}
            </g>

            {/* 19×19 线 */}
            <g stroke="rgba(201,168,118,0.38)" strokeWidth={1}>
              {Array.from({ length: 19 }, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={PAD + i * CELL}
                  y1={PAD}
                  x2={PAD + i * CELL}
                  y2={BOARD - PAD}
                />
              ))}
              {Array.from({ length: 19 }, (_, i) => (
                <line
                  key={`h${i}`}
                  x1={PAD}
                  y1={PAD + i * CELL}
                  x2={BOARD - PAD}
                  y2={PAD + i * CELL}
                />
              ))}
            </g>

            {/* 星位 */}
            <g fill={ERA.sepia} opacity={0.8}>
              {[3, 9, 15].flatMap((c) =>
                [3, 9, 15].map((r) => (
                  <circle key={`${c}-${r}`} cx={PAD + c * CELL} cy={PAD + r * CELL} r={2.7} />
                )),
              )}
            </g>

            {/* 坐标 */}
            <g fontFamily={FONTS.mono} fontSize={8.5} fill={COLORS.ink} opacity={0.34}>
              {Array.from({ length: 19 }, (_, i) => (
                <text
                  key={`l${i}`}
                  x={PAD + i * CELL}
                  y={BOARD - 7}
                  textAnchor="middle"
                >
                  {String.fromCharCode(65 + (i >= 8 ? i + 1 : i))}
                </text>
              ))}
              {Array.from({ length: 19 }, (_, i) => (
                <text
                  key={`n${i}`}
                  x={12}
                  y={PAD + i * CELL + 3}
                  textAnchor="middle"
                >
                  {19 - i}
                </text>
              ))}
            </g>

            {/* 前段落子（按 k 收紧） */}
            {GROUPS.flatMap((g) =>
              g.stones.map((s, i) => {
                const atStone = at(g.at + i * 3.5);
                const p = EASE.outExpo(prog(frame, atStone, 18));
                const cx = PAD + s[0] * CELL;
                const cy = PAD + s[1] * CELL;
                const ink = s[2] === "ink";
                return (
                  <g
                    key={`${g.at}-${i}`}
                    opacity={Math.min(1, p * 1.7)}
                    transform={`translate(0 ${(1 - p) * -5})`}
                  >
                    <ellipse cx={cx + 1.5} cy={cy + 4} rx={14} ry={4.6} fill="#000000" opacity={0.45} />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={14.4}
                      fill={ink ? "url(#s13-ink)" : "url(#s13-paper)"}
                      stroke={ink ? "rgba(201,168,118,0.5)" : "rgba(20,20,19,0.55)"}
                      strokeWidth={0.9}
                    />
                    <circle
                      cx={cx - 4.2}
                      cy={cy - 4.6}
                      r={3.1}
                      fill={COLORS.ink}
                      opacity={ink ? 0.16 : 0.62}
                    />
                  </g>
                );
              }),
            )}

            {/* 屏息段：两枚棋子 + 呼吸环 */}
            <QuietStone c={13} r={8} at={Q1} frame={frame} side="paper" />
            <QuietStone c={11} r={8} at={Q2} frame={frame} side="ink" />
            <circle
              cx={PAD + latest.c * CELL}
              cy={PAD + latest.r * CELL}
              r={18 + br * 2.8}
              fill="none"
              stroke={COLORS.ink}
              strokeWidth={1}
              opacity={frame >= Q1 ? 0.055 + br * 0.11 : 0}
            />
            <circle
              cx={q1.x}
              cy={q1.y}
              r={16 + EASE.outExpo(ring1P) * 52}
              fill="none"
              stroke={COLORS.ink}
              strokeWidth={1}
              opacity={frame >= Q1 ? (1 - ring1P) * 0.4 : 0}
            />
            <circle
              cx={q2.x}
              cy={q2.y}
              r={16 + EASE.outExpo(ring2P) * 52}
              fill="none"
              stroke={COLORS.ink}
              strokeWidth={1}
              opacity={frame >= Q2 ? (1 - ring2P) * 0.4 : 0}
            />
          </svg>
        </div>

        {/* 主文案 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 80,
            maxWidth: 1080,
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
              fontSize: 30,
              color: COLORS.grey,
              marginTop: 8,
              opacity: copyEn,
            }}
          >
            2016 — AlphaGo 4–1 Lee Sedol. Intuition, learned.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：4:1 落拍 / 屏息段第一枚棋子 */}
      <Sequence from={FOUR} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.76} />
      </Sequence>
      <Sequence from={Q1} durationInFrames={70}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.28} />
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
      <ellipse cx={x + 1.5} cy={y + 4} rx={14} ry={4.6} fill="#000000" opacity={0.45} />
      <circle
        cx={x}
        cy={y}
        r={14.4}
        fill={ink ? "url(#s13-ink)" : "url(#s13-paper)"}
        stroke={ink ? "rgba(201,168,118,0.5)" : "rgba(20,20,19,0.55)"}
        strokeWidth={0.9}
      />
      <circle
        cx={x - 4.2}
        cy={y - 4.6}
        r={3.1}
        fill={COLORS.ink}
        opacity={ink ? 0.16 : 0.62}
      />
    </g>
  );
};
