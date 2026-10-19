/**
 * S05 · 1997 深蓝（45s–52s · 420f）
 * 棋盘棕：8×8 棋盘、深蓝（墨）与卡斯帕罗夫（纸白）的残局，
 * 白王倾倒 + 「1997」落拍重击。时代色：sepia 深调。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const B = (i: number): number => Math.round(37.7 + i * 56.25);
const SLAM = B(0);
const PIECES_AT = B(1) + 8;
const TOPPLE = B(2);
const MATE = B(3);

const BOARD = 660;
const PAD = 26;
const CELL = (BOARD - PAD * 2) / 8;
const DARK = "#6B5137";
const LIGHT = "#EFEADF";

type Kind = "king" | "queen" | "rook" | "bishop" | "pawn";
type Side = "ink" | "paper";

const SETUP: { c: number; r: number; kind: Kind; side: Side; at: number; toppled?: boolean }[] = [
  { c: 6, r: 1, kind: "king", side: "ink", at: PIECES_AT },
  { c: 5, r: 2, kind: "queen", side: "ink", at: PIECES_AT + 10 },
  { c: 7, r: 2, kind: "rook", side: "ink", at: PIECES_AT + 20 },
  { c: 7, r: 4, kind: "bishop", side: "ink", at: PIECES_AT + 30 },
  { c: 5, r: 4, kind: "pawn", side: "ink", at: PIECES_AT + 40 },
  { c: 2, r: 4, kind: "queen", side: "paper", at: PIECES_AT + 14 },
  { c: 1, r: 5, kind: "rook", side: "paper", at: PIECES_AT + 24 },
  { c: 3, r: 3, kind: "pawn", side: "paper", at: PIECES_AT + 34 },
  { c: 3, r: 6, kind: "pawn", side: "paper", at: PIECES_AT + 44 },
  { c: 4, r: 6, kind: "pawn", side: "paper", at: PIECES_AT + 54 },
  { c: 5, r: 5, kind: "king", side: "paper", at: PIECES_AT + 4, toppled: true },
];

export const S05 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = Math.min(prog(frame, 0, 12), 1 - prog(frame, dur - 14, 14));
  const boardP = EASE.outExpo(prog(frame, 0, 32));
  const yearP = EASE.outExpo(prog(frame, SLAM, 24));
  const copy = Math.min(prog(frame, 80, 26), 1 - prog(frame, dur - 14, 14));
  const copyEn = Math.min(prog(frame, 100, 26), 1 - prog(frame, dur - 14, 14));
  const toppleP = EASE.ink(prog(frame, TOPPLE, 34));
  const mateP = EASE.outExpo(prog(frame, MATE, 24));

  return (
    <PaperStage dur={dur} tone="medium" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 章节标签 */}
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

        {/* ---------------- 左：年份 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 188,
            fontFamily: FONTS.mono,
            fontSize: 13.5,
            letterSpacing: "0.22em",
            color: COLORS.grey,
            opacity: prog(frame, 14, 22) * 0.85,
          }}
        >
          NEW YORK · MAY 1997
        </div>

        <div
          style={{
            position: "absolute",
            left: 134,
            top: 218,
            fontFamily: FONTS.mono,
            fontSize: 220,
            lineHeight: 1,
            letterSpacing: "-0.05em",
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
            top: 462,
            width: 560,
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
            top: 480,
            fontFamily: FONTS.mono,
            fontSize: 24,
            letterSpacing: "0.16em",
            color: COLORS.ink,
            opacity: prog(frame, SLAM + 16, 24),
          }}
        >
          DEEP BLUE × KASPAROV
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 520,
            fontFamily: FONTS.mono,
            fontSize: 13,
            letterSpacing: "0.16em",
            color: COLORS.grey,
            opacity: prog(frame, SLAM + 24, 24) * 0.8,
          }}
        >
          GAME 6 · 11 MAY 1997 · BRUTE FORCE
        </div>

        {/* 棋子图例 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 572,
            display: "flex",
            gap: 32,
            alignItems: "center",
            opacity: prog(frame, PIECES_AT, 26) * 0.9,
          }}
        >
          <LegendDot fill={COLORS.ink} dark />
          <span style={{ fontFamily: FONTS.mono, fontSize: 13, letterSpacing: "0.16em", color: COLORS.graphite }}>
            DEEP BLUE
          </span>
          <LegendDot fill={COLORS.paperWhite} />
          <span style={{ fontFamily: FONTS.mono, fontSize: 13, letterSpacing: "0.16em", color: COLORS.graphite }}>
            KASPAROV
          </span>
        </div>

        {/* 胜负印章 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 646,
            border: `2px solid ${ERA.sepia}`,
            backgroundColor: "rgba(250,249,245,0.9)",
            color: ERA.sepia,
            padding: "13px 22px 12px",
            opacity: Math.min(1, mateP * 1.7),
            transform: `rotate(-7deg) scale(${1 + (1 - mateP) * 0.14})`,
            transformOrigin: "left center",
            boxShadow: "inset 0 0 0 1px rgba(138,106,69,0.3)",
          }}
        >
          <div style={{ fontFamily: FONTS.mono, fontSize: 27, letterSpacing: "0.18em", lineHeight: 1.05 }}>
            CHECKMATE
          </div>
          <div style={{ marginTop: 6, fontFamily: FONTS.mono, fontSize: 11, letterSpacing: "0.2em", opacity: 0.8 }}>
            DEEP BLUE WINS
          </div>
        </div>

        {/* ---------------- 右：棋盘 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 1120,
            top: 160,
            width: BOARD,
            height: BOARD,
            opacity: Math.min(1, prog(frame, 0, 18) * 1.4),
            transform: `translateY(${(1 - boardP) * 22}px)`,
            filter: "drop-shadow(0 34px 54px rgba(20,20,19,0.16))",
          }}
        >
          <svg width={BOARD} height={BOARD} viewBox={`0 0 ${BOARD} ${BOARD}`}>
            <defs>
              <linearGradient id="s05-wood" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7A5C3E" />
                <stop offset="55%" stopColor={DARK} />
                <stop offset="100%" stopColor="#5E4630" />
              </linearGradient>
              <radialGradient id="s05-light" cx="24%" cy="12%" r="82%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" />
                <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 木质外框 */}
            <rect x={0} y={0} width={BOARD} height={BOARD} rx={5} fill="url(#s05-wood)" />
            <rect x={0} y={0} width={BOARD} height={BOARD} rx={5} fill="url(#s05-light)" />

            {/* 棋格 */}
            {Array.from({ length: 64 }, (_, i) => {
              const c = i % 8;
              const r = Math.floor(i / 8);
              const x = PAD + c * CELL;
              const y = PAD + r * CELL;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  fill={(c + r) % 2 === 0 ? DARK : LIGHT}
                />
              );
            })}

            {/* 坐标 */}
            <g fontFamily={FONTS.mono} fontSize={11} letterSpacing="0.08em" fill="rgba(250,249,245,0.66)">
              {Array.from({ length: 8 }, (_, c) => (
                <text key={`f${c}`} x={PAD + c * CELL + CELL / 2} y={BOARD - 7} textAnchor="middle">
                  {String.fromCharCode(97 + c)}
                </text>
              ))}
              {Array.from({ length: 8 }, (_, r) => (
                <text key={`r${r}`} x={13} y={PAD + r * CELL + CELL / 2 + 4} textAnchor="middle">
                  {8 - r}
                </text>
              ))}
            </g>

            {/* 棋子 */}
            {SETUP.map((pc, i) => {
              const cx = PAD + pc.c * CELL + CELL / 2;
              const cy = PAD + pc.r * CELL + CELL / 2;
              const p = EASE.outExpo(prog(frame, pc.at, 24));
              const isToppled = pc.toppled === true;
              const angle = isToppled ? toppleP * -74 : 0;
              const dx = isToppled ? toppleP * 10 : 0;
              const dy = isToppled ? toppleP * 6 : 0;
              const fill = pc.side === "ink" ? COLORS.ink : COLORS.paperWhite;
              const stroke = pc.side === "ink" ? "rgba(250,249,245,0.48)" : COLORS.ink;
              return (
                <g key={i}>
                  <ellipse
                    cx={cx + 2}
                    cy={cy + 29}
                    rx={20}
                    ry={5}
                    fill={COLORS.ink}
                    opacity={p * (pc.side === "ink" ? 0.18 : 0.13)}
                  />
                  <g
                    opacity={Math.min(1, p * 1.6)}
                    transform={`translate(${cx - 20 + dx} ${cy - 34 + dy + (1 - p) * -16}) rotate(${angle} 20 34)`}
                  >
                    <PieceShape kind={pc.kind} fill={fill} stroke={stroke} />
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 96,
            maxWidth: 1020,
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
              fontSize: 32,
              color: COLORS.grey,
              marginTop: 8,
              opacity: copyEn,
            }}
          >
            1997 — Deep Blue beats Kasparov. Brute force, not understanding.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：1997 重击 / 棋子 / 倾王 / 将死 */}
      <Sequence from={SLAM} durationInFrames={90}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.82} />
      </Sequence>
      <Sequence from={PIECES_AT + 10} durationInFrames={60}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={TOPPLE} durationInFrames={100}>
        <Audio src={staticFile("sfx/timer-bell.wav")} volume={0.42} />
      </Sequence>
      <Sequence from={MATE} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.5} />
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

/* ---------------------------------------------------------------- 图例 */

const LegendDot = ({ fill, dark = false }: { fill: string; dark?: boolean }) => (
  <span
    style={{
      width: 14,
      height: 14,
      borderRadius: 99,
      backgroundColor: fill,
      border: `1.5px solid ${dark ? COLORS.ink : ERA.sepia}`,
      display: "inline-block",
      marginRight: -22,
    }}
  />
);
