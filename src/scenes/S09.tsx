/**
 * S09 · 1997 深蓝（360f）
 * REF 420f → k = dur / 420。棋盘、年份、倾王与 CHECKMATE 按 k 收紧。
 * 深色舞台：棋盘卡使用 deep 卡面，暖白文字 + 少量 sepia 时代色。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const REF = 420;
const B = (i: number): number => 37.7 + i * 56.25;

const BOARD = 660;
const PAD = 26;
const CELL = (BOARD - PAD * 2) / 8;
const DARK_SQ = "#2B231A";
const LIGHT_SQ = "#3B3125";

type Kind = "king" | "queen" | "rook" | "bishop" | "pawn";
type Side = "ink" | "paper";

/** 基准 420f 的棋子落位（at 会在镜内按 k 缩放） */
const SETUP: { c: number; r: number; kind: Kind; side: Side; at: number; toppled?: boolean }[] = [
  { c: 6, r: 1, kind: "king", side: "ink", at: B(1) + 8 },
  { c: 5, r: 2, kind: "queen", side: "ink", at: B(1) + 18 },
  { c: 7, r: 2, kind: "rook", side: "ink", at: B(1) + 28 },
  { c: 7, r: 4, kind: "bishop", side: "ink", at: B(1) + 38 },
  { c: 5, r: 4, kind: "pawn", side: "ink", at: B(1) + 48 },
  { c: 2, r: 4, kind: "queen", side: "paper", at: B(1) + 22 },
  { c: 1, r: 5, kind: "rook", side: "paper", at: B(1) + 32 },
  { c: 3, r: 3, kind: "pawn", side: "paper", at: B(1) + 42 },
  { c: 3, r: 6, kind: "pawn", side: "paper", at: B(1) + 52 },
  { c: 4, r: 6, kind: "pawn", side: "paper", at: B(1) + 62 },
  { c: 5, r: 5, kind: "king", side: "paper", at: B(1) + 12, toppled: true },
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

export const S09 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const k = dur / REF;
  const at = (f: number): number => Math.round(f * k);

  const SLAM = at(B(0));
  const TOPPLE = at(B(2));
  const MATE = at(B(3));

  const fade = prog(frame, 0, 7);
  const boardP = EASE.outExpo(prog(frame, 0, 30 * k));
  const yearP = EASE.outExpo(prog(frame, SLAM, 24));
  const copy = Math.min(prog(frame, at(78), 26), 1);
  const copyEn = Math.min(prog(frame, at(98), 26), 1);
  const toppleP = EASE.ink(prog(frame, TOPPLE, 34));
  const mateP = EASE.outExpo(prog(frame, MATE, 24));

  return (
    <PaperStage dur={dur} tone="medium" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 左上 kicker */}
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          规则时代 · 1997 ｜ THE RULE ERA
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 136,
            width: 300,
            height: 1,
            backgroundColor: ERA.sepia,
            opacity: 0.4,
            transformOrigin: "left center",
            transform: `scaleX(${EASE.outExpo(prog(frame, 10, 40))})`,
          }}
        />

        {/* 左：年份 */}
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 204,
            fontFamily: FONTS.mono,
            fontSize: 232,
            lineHeight: 1,
            letterSpacing: "-0.055em",
            color: ERA.sepia,
            fontVariantNumeric: "tabular-nums",
            opacity: Math.min(1, prog(frame, SLAM, 7) * 1.5),
            transform: `translateY(${(1 - yearP) * 22}px) scale(${1 + (1 - yearP) * 0.06})`,
            transformOrigin: "left center",
          }}
        >
          1997
        </div>

        <div
          style={{
            position: "absolute",
            left: 144,
            top: 476,
            width: 545,
            height: 1,
            backgroundColor: ERA.sepia,
            opacity: 0.4 * yearP,
            transformOrigin: "left center",
            transform: `scaleX(${yearP})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 498,
            fontFamily: FONTS.mono,
            fontSize: 23,
            letterSpacing: "0.16em",
            color: COLORS.ink,
            opacity: prog(frame, SLAM + 14, 24),
          }}
        >
          DEEP BLUE × KASPAROV
        </div>

        {/* 胜负印章：只保留必要读数 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 588,
            border: `2px solid ${ERA.sepia}`,
            backgroundColor: "rgba(201,168,118,0.055)",
            color: ERA.sepia,
            padding: "14px 24px 13px",
            opacity: Math.min(1, mateP * 1.7),
            transform: `rotate(-7deg) scale(${1 + (1 - mateP) * 0.14})`,
            transformOrigin: "left center",
            boxShadow: "inset 0 0 0 1px rgba(201,168,118,0.18)",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 29,
              letterSpacing: "0.18em",
              lineHeight: 1.05,
            }}
          >
            CHECKMATE
          </div>
        </div>

        {/* 右：深色棋盘卡 */}
        <div
          style={{
            position: "absolute",
            left: 1120,
            top: 166,
            width: BOARD,
            height: BOARD,
            opacity: Math.min(1, prog(frame, 0, 18) * 1.4),
            transform: `translateY(${(1 - boardP) * 22}px)`,
            filter: "drop-shadow(0 36px 64px rgba(0,0,0,0.55))",
          }}
        >
          <svg width={BOARD} height={BOARD} viewBox={`0 0 ${BOARD} ${BOARD}`}>
            <defs>
              <linearGradient id="s09-card" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1B1915" />
                <stop offset="52%" stopColor={COLORS.deep} />
                <stop offset="100%" stopColor="#0E0E0D" />
              </linearGradient>
              <radialGradient id="s09-sheen" cx="24%" cy="10%" r="88%">
                <stop offset="0%" stopColor="#F3F0E7" stopOpacity="0.075" />
                <stop offset="58%" stopColor="#F3F0E7" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="s09-black" cx="35%" cy="28%" r="80%">
                <stop offset="0%" stopColor="#3A342B" />
                <stop offset="55%" stopColor="#12110F" />
                <stop offset="100%" stopColor="#070706" />
              </radialGradient>
              <radialGradient id="s09-ivory" cx="35%" cy="26%" r="82%">
                <stop offset="0%" stopColor="#FFFDF6" />
                <stop offset="56%" stopColor="#EFEADF" />
                <stop offset="100%" stopColor="#CFC6B3" />
              </radialGradient>
            </defs>

            <rect x={0} y={0} width={BOARD} height={BOARD} rx={7} fill="url(#s09-card)" />
            <rect x={0} y={0} width={BOARD} height={BOARD} rx={7} fill="url(#s09-sheen)" />
            <rect
              x={12}
              y={12}
              width={BOARD - 24}
              height={BOARD - 24}
              rx={2}
              fill="none"
              stroke="rgba(201,168,118,0.24)"
              strokeWidth={1}
            />

            {/* 棋格 */}
            {Array.from({ length: 64 }, (_, i) => {
              const c = i % 8;
              const r = Math.floor(i / 8);
              return (
                <rect
                  key={i}
                  x={PAD + c * CELL}
                  y={PAD + r * CELL}
                  width={CELL}
                  height={CELL}
                  fill={(c + r) % 2 === 0 ? DARK_SQ : LIGHT_SQ}
                />
              );
            })}

            {/* 坐标 */}
            <g
              fontFamily={FONTS.mono}
              fontSize={10}
              letterSpacing="0.08em"
              fill="rgba(243,240,231,0.42)"
            >
              {Array.from({ length: 8 }, (_, c) => (
                <text
                  key={`f${c}`}
                  x={PAD + c * CELL + CELL / 2}
                  y={BOARD - 8}
                  textAnchor="middle"
                >
                  {String.fromCharCode(97 + c)}
                </text>
              ))}
              {Array.from({ length: 8 }, (_, r) => (
                <text
                  key={`r${r}`}
                  x={13}
                  y={PAD + r * CELL + CELL / 2 + 3.5}
                  textAnchor="middle"
                >
                  {8 - r}
                </text>
              ))}
            </g>

            {/* 棋子 */}
            {SETUP.map((pc, i) => {
              const cx = PAD + pc.c * CELL + CELL / 2;
              const cy = PAD + pc.r * CELL + CELL / 2;
              const p = EASE.outExpo(prog(frame, at(pc.at), 24 * k));
              const isToppled = pc.toppled === true;
              const angle = isToppled ? toppleP * -74 : 0;
              const dx = isToppled ? toppleP * 10 : 0;
              const dy = isToppled ? toppleP * 6 : 0;
              const fill = pc.side === "ink" ? "url(#s09-black)" : "url(#s09-ivory)";
              const stroke =
                pc.side === "ink" ? "rgba(201,168,118,0.72)" : "rgba(20,20,19,0.72)";
              return (
                <g key={i}>
                  <ellipse
                    cx={cx + 2}
                    cy={cy + 29}
                    rx={20}
                    ry={5}
                    fill="#000000"
                    opacity={p * 0.42}
                  />
                  <g
                    opacity={Math.min(1, p * 1.6)}
                    transform={`translate(${cx - 20 + dx} ${
                      cy - 34 + dy + (1 - p) * -16
                    }) rotate(${angle} 20 34)`}
                  >
                    <PieceShape kind={pc.kind} fill={fill} stroke={stroke} />
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 主文案 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 82,
            maxWidth: 1000,
            borderLeft: `3px solid ${ERA.sepia}`,
            paddingLeft: 26,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 36, lineHeight: 1.5 }}>
            1997，深蓝赢下棋王——靠的是蛮力计算，不是理解。
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
            1997 — Deep Blue beats Kasparov. Brute force, not understanding.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：1997 落拍 / 将死 */}
      <Sequence from={SLAM} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.78} />
      </Sequence>
      <Sequence from={MATE} durationInFrames={70}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.38} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 棋子 */

const PieceShape = ({
  kind,
  fill,
  stroke,
}: {
  kind: Kind;
  fill: string;
  stroke: string;
}) => (
  <g fill={fill} stroke={stroke} strokeWidth={1.3} strokeLinejoin="round">
    {kind === "pawn" ? (
      <>
        <circle cx={20} cy={19} r={6.4} />
        <rect x={14} y={27} width={12} height={4.5} rx={2.2} />
        <path d="M 15.5 52 C 13 42, 15.5 33, 20 31 C 24.5 33, 27 42, 24.5 52 Z" />
        <path d="M 11 58 L 29 58 L 26 52.5 L 14 52.5 Z" />
        <rect x={7.5} y={58} width={25} height={4} rx={2} />
      </>
    ) : null}
    {kind === "rook" ? (
      <>
        <path d="M 11 8 L 11 18 L 15 18 L 15 12 L 19 12 L 19 18 L 21 18 L 21 12 L 25 12 L 25 18 L 29 18 L 29 8 Z" />
        <path d="M 13 19 L 27 19 L 25 51 L 15 51 Z" />
        <rect x={12.5} y={19} width={15} height={4} rx={1.5} />
        <path d="M 11 58 L 29 58 L 26 51.5 L 14 51.5 Z" />
        <rect x={7.5} y={58} width={25} height={4} rx={2} />
      </>
    ) : null}
    {kind === "bishop" ? (
      <>
        <path d="M 20 7 C 27 15, 26 23, 20 27 C 14 23, 13 15, 20 7 Z" />
        <line x1={20} y1={12} x2={20} y2={21} stroke={stroke} strokeWidth={1} opacity={0.55} />
        <rect x={15} y={27} width={10} height={4} rx={2} />
        <path d="M 15 31 C 13 40, 15 47, 16 52 L 24 52 C 25 47, 27 40, 25 31 Z" />
        <path d="M 11 58 L 29 58 L 26 52 L 14 52 Z" />
        <rect x={7.5} y={58} width={25} height={4} rx={2} />
      </>
    ) : null}
    {kind === "queen" ? (
      <>
        <path d="M 10 20 L 12 8 L 16 15 L 20 6 L 24 15 L 28 8 L 30 20 Z" />
        <circle cx={12} cy={7.5} r={1.7} />
        <circle cx={20} cy={5.5} r={1.9} />
        <circle cx={28} cy={7.5} r={1.7} />
        <rect x={10.5} y={20} width={19} height={4.5} rx={2} />
        <path d="M 12.5 25 L 27.5 25 L 25 52 L 15 52 Z" />
        <path d="M 11 58 L 29 58 L 26 52 L 14 52 Z" />
        <rect x={7.5} y={58} width={25} height={4} rx={2} />
      </>
    ) : null}
    {kind === "king" ? (
      <>
        <path d="M 18 3 L 22 3 L 22 7 L 26 7 L 26 10 L 22 10 L 22 14 L 18 14 L 18 10 L 14 10 L 14 7 L 18 7 Z" />
        <path d="M 10 24 L 10 15 L 16 20 L 20 12 L 24 20 L 30 15 L 30 24 Z" />
        <rect x={10} y={24} width={20} height={4.5} rx={2} />
        <path d="M 12.5 29 L 27.5 29 L 25 52 L 15 52 Z" />
        <path d="M 11 58 L 29 58 L 26 52 L 14 52 Z" />
        <rect x={7.5} y={58} width={25} height={4} rx={2} />
      </>
    ) : null}
  </g>
);
