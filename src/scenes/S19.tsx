/**
 * S19 · 生图浪潮（136s–149s · 780f）｜品红
 * 「AI 作品墙」全部为程序生成的抽象画（渐变 / 圆环 / 网格 / 色块，无真实图片）；
 * DALL·E → Midjourney → Stable Diffusion 标签逐拍翻页，六张墙上小作随后逐拍落位。
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

const MAUVE = ERA.mauve;
const INK = COLORS.ink;
const PAPER = COLORS.paperWhite;

const FLIP1 = 90.24;
const FLIP2 = 146.49;
const WALL0 = 202.74;
const WALL_BEAT = 56.25;
const COPY_AT = 540.24;

const TOOLS = [
  { name: "DALL·E", year: "2022" },
  { name: "Midjourney", year: "2022" },
  { name: "Stable Diffusion", year: "2022" },
] as const;

/* ------------------------------------------------------------------ 生成画作 */

const Art = ({
  variant,
  seed,
  style,
}: {
  variant: number;
  seed: number;
  style?: CSSProperties;
}) => {
  const rnd = mulberry32(seed);
  const uid = `art${seed}`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: PAPER,
        overflow: "hidden",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        <defs>
          <radialGradient id={`${uid}-r`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={MAUVE} stopOpacity={0.95} />
            <stop offset="55%" stopColor={MAUVE} stopOpacity={0.32} />
            <stop offset="100%" stopColor={MAUVE} stopOpacity={0} />
          </radialGradient>
          <linearGradient id={`${uid}-l`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={MAUVE} stopOpacity={0.3} />
            <stop offset="100%" stopColor={MAUVE} stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.35} />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>

        <rect width={600} height={400} fill={PAPER} />

        {variant === 0 ? (
          <g>
            <rect width={600} height={400} fill={`url(#${uid}-l)`} />
            <circle cx={420} cy={176} r={230} fill={`url(#${uid}-r)`} />
            <circle cx={420} cy={176} r={88} fill={MAUVE} opacity={0.92} />
            <circle cx={420} cy={176} r={62} fill={PAPER} opacity={0.14} />
            {Array.from({ length: 10 }, (_, i) => (
              <line
                key={i}
                x1={0}
                y1={286 + i * 9}
                x2={600}
                y2={286 + i * 9}
                stroke={INK}
                strokeOpacity={0.1}
              />
            ))}
            <circle cx={148} cy={118} r={26} fill={INK} opacity={0.82} />
            <circle cx={148} cy={118} r={8} fill={PAPER} opacity={0.75} />
          </g>
        ) : null}

        {variant === 1 ? (
          <g>
            {Array.from({ length: 11 }, (_, i) => (
              <circle
                key={i}
                cx={238}
                cy={200}
                r={26 + i * 26}
                fill="none"
                stroke={i % 3 === 0 ? INK : MAUVE}
                strokeWidth={i % 3 === 0 ? 2.2 : 1.2}
                opacity={i % 3 === 0 ? 0.34 : 0.55 - i * 0.03}
              />
            ))}
            <circle cx={238} cy={200} r={9} fill={INK} />
            <rect x={436} y={0} width={164} height={400} fill={`url(#${uid}-l)`} opacity={0.9} />
            <line x1={436} y1={0} x2={436} y2={400} stroke={INK} strokeOpacity={0.22} />
          </g>
        ) : null}

        {variant === 2 ? (
          <g>
            {Array.from({ length: 15 * 10 }, (_, i) => {
              const c = i % 15;
              const r = Math.floor(i / 15);
              const v = rnd();
              return (
                <rect
                  key={i}
                  x={c * 40}
                  y={r * 40}
                  width={39}
                  height={39}
                  fill={v > 0.87 ? INK : MAUVE}
                  opacity={v > 0.87 ? 0.5 : 0.06 + v * 0.38}
                />
              );
            })}
            <rect x={120} y={80} width={360} height={240} fill={PAPER} opacity={0.12} />
            <circle cx={300} cy={200} r={118} fill={PAPER} opacity={0.94} />
            <circle
              cx={300}
              cy={200}
              r={118}
              fill="none"
              stroke={MAUVE}
              strokeWidth={2.2}
              opacity={0.72}
            />
            <circle cx={300} cy={200} r={9} fill={INK} />
            <rect
              x={120}
              y={80}
              width={360}
              height={240}
              fill="none"
              stroke={PAPER}
              strokeOpacity={0.75}
              strokeWidth={2}
            />
          </g>
        ) : null}

        {variant === 3 ? (
          <g>
            <path d="M 60 400 A 240 240 0 0 1 540 400" fill="none" stroke={MAUVE} strokeWidth={54} opacity={0.2} />
            <path d="M 118 400 A 182 182 0 0 1 482 400" fill="none" stroke={MAUVE} strokeWidth={30} opacity={0.48} />
            <path d="M 168 400 A 132 132 0 0 1 432 400" fill="none" stroke={INK} strokeWidth={15} opacity={0.55} />
            <path d="M 218 400 A 82 82 0 0 1 382 400" fill="none" stroke={MAUVE} strokeWidth={8} opacity={0.92} />
            <line x1={0} y1={330} x2={600} y2={330} stroke={INK} strokeOpacity={0.22} />
            <circle cx={300} cy={330} r={10} fill={INK} />
          </g>
        ) : null}

        {variant === 4 ? (
          <g>
            {Array.from({ length: 9 }, (_, i) => {
              const y = 82 + i * 33;
              return (
                <path
                  key={i}
                  d={`M -20 ${y} C 120 ${y - 34}, 220 ${y + 30}, 320 ${y - 6} S 520 ${y - 22}, 620 ${y + 8}`}
                  fill="none"
                  stroke={i === 4 ? INK : MAUVE}
                  strokeWidth={i === 4 ? 3 : 1.4}
                  opacity={i === 4 ? 0.72 : 0.36}
                />
              );
            })}
            <path
              d="M 0 400 L 0 330 C 120 300 220 350 330 320 S 520 300 600 330 L 600 400 Z"
              fill={MAUVE}
              opacity={0.14}
            />
          </g>
        ) : null}

        {variant === 5 ? (
          <g>
            <rect x={64} y={62} width={222} height={212} fill={MAUVE} opacity={0.8} />
            <rect x={320} y={48} width={220} height={120} fill={INK} opacity={0.82} />
            <rect x={330} y={200} width={210} height={142} fill={MAUVE} opacity={0.22} />
            <circle cx={188} cy={320} r={54} fill={INK} opacity={0.16} />
            <line x1={64} y1={330} x2={540} y2={330} stroke={INK} strokeOpacity={0.3} />
            <circle cx={444} cy={110} r={26} fill={PAPER} opacity={0.9} />
            <circle cx={444} cy={110} r={10} fill={MAUVE} />
          </g>
        ) : null}

        {variant === 6 ? (
          <g>
            {Array.from({ length: 6 }, (_, i) => (
              <ellipse
                key={i}
                cx={300}
                cy={200}
                rx={258 - i * 7}
                ry={92 - i * 6}
                fill="none"
                stroke={i % 2 === 1 ? MAUVE : INK}
                strokeWidth={i === 0 ? 2 : 1.2}
                opacity={0.46 - i * 0.045}
                transform={`rotate(${-24 + i * 12} 300 200)`}
              />
            ))}
            <circle cx={300} cy={200} r={13} fill={MAUVE} />
            <circle cx={300} cy={200} r={4} fill={PAPER} />
            <circle cx={522} cy={108} r={5} fill={INK} />
            <circle cx={92} cy={296} r={7} fill={MAUVE} opacity={0.7} />
          </g>
        ) : null}

        {variant === 7 ? (
          <g>
            {Array.from({ length: 15 * 10 }, (_, i) => {
              const c = i % 15;
              const r = Math.floor(i / 15);
              const x = 32 + c * 38;
              const y = 28 + r * 36;
              const d = Math.hypot(x - 448, y - 108);
              const rad = Math.max(1.4, 15 - d / 27);
              return <circle key={i} cx={x} cy={y} r={rad} fill={MAUVE} opacity={0.52} />;
            })}
            <circle cx={118} cy={312} r={72} fill={INK} opacity={0.9} />
            <circle cx={118} cy={312} r={40} fill={PAPER} opacity={0.18} />
          </g>
        ) : null}

        {variant === 8 ? (
          <g>
            {Array.from({ length: 16 }, (_, i) => {
              const y0 = 38 + i * 21;
              const y1 = y0 + (rnd() - 0.5) * 92;
              return (
                <path
                  key={i}
                  d={`M -20 ${y0} C 140 ${y0 + (rnd() - 0.5) * 84}, 300 ${y1}, 620 ${
                    y1 + (rnd() - 0.5) * 42
                  }`}
                  fill="none"
                  stroke={MAUVE}
                  strokeWidth={i % 5 === 0 ? 2.2 : 1}
                  opacity={i % 5 === 0 ? 0.6 : 0.26}
                />
              );
            })}
            <path d="M -20 262 C 140 142, 300 342, 620 158" stroke={INK} strokeWidth={3} fill="none" opacity={0.72} />
          </g>
        ) : null}

        <rect width={600} height={400} fill={`url(#${uid}-sheen)`} opacity={0.35} />
      </svg>
    </div>
  );
};

/* ---------------------------------------------------------------- 局部零件 */

const Frame = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      backgroundColor: PAPER,
      border: `1px solid ${COLORS.line}`,
      boxShadow: "0 20px 46px rgba(0,0,0,0.10)",
      ...style,
    }}
  >
    {children}
  </div>
);

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
        stroke={ERA.mauve}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M18 38 H46" stroke={ERA.mauve} strokeWidth={1} strokeOpacity={0.3} strokeDasharray="2 4" />
    </svg>
  );
};

/* ---------------------------------------------------------------- 主场景 */

export const S19 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const fade = prog(frame, 0, 7);

  /* 首张画作的翻入 + 两次逐拍翻页 */
  const p0 = EASE.outExpo(prog(frame, 33.99, 26));
  const f1 = EASE.ink(prog(frame, FLIP1, 24));
  const f2 = EASE.ink(prog(frame, FLIP2, 24));

  const rot0 = frame < FLIP1 ? 96 * (1 - p0) : -96 * f1;
  const rot1 = frame < FLIP2 ? 96 * (1 - f1) : -96 * f2;
  const rot2 = 96 * (1 - f2);

  const pageIdx = frame < FLIP1 ? 0 : frame < FLIP2 ? 1 : 2;
  const labelAt = [33.99, FLIP1, FLIP2][pageIdx];
  const labelP = EASE.outExpo(prog(frame, labelAt, 20));

  const copyIn = EASE.outExpo(prog(frame, COPY_AT, 34));

  const pageStyle = (rot: number, z: number, visible: boolean): CSSProperties => ({
    position: "absolute",
    inset: 0,
    transformOrigin: "0% 50%",
    transform: `rotateY(${rot.toFixed(2)}deg)`,
    backfaceVisibility: "hidden",
    zIndex: z,
    display: visible ? "block" : "none",
    boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
  });

  /* 墙上六张作品 */
  const WALL = [
    { variant: 3, seed: 303 },
    { variant: 4, seed: 404 },
    { variant: 7, seed: 707 },
    { variant: 5, seed: 505 },
    { variant: 6, seed: 606 },
    { variant: 8, seed: 808 },
  ];

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          生成革命 · 2022
        </div>
        {/* ---------------- 左：翻页的主作 ---------------- */}
        <Frame
          style={{
            position: "absolute",
            left: 140,
            top: 200,
            width: 620,
            height: 650,
            padding: 24,
            opacity: EASE.outExpo(prog(frame, 16, 26)),
          }}
        >
          <div
            style={{
              position: "relative",
              width: 572,
              height: 538,
              perspective: 2200,
              overflow: "hidden",
              backgroundColor: COLORS.paperDeep,
            }}
          >
            {frame >= 33.99 && f1 < 1 ? (
              <div style={pageStyle(rot0, 3, true)}>
                <Art variant={0} seed={101} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to left, rgba(0,0,0,0.42), rgba(0,0,0,0))",
                    opacity: 0.55 * Math.sin((Math.abs(rot0) * Math.PI) / 180),
                  }}
                />
              </div>
            ) : null}

            {frame >= FLIP1 && f2 < 1 ? (
              <div style={pageStyle(rot1, 2, true)}>
                <Art variant={1} seed={202} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to left, rgba(0,0,0,0.42), rgba(0,0,0,0))",
                    opacity: 0.55 * Math.sin((Math.abs(rot1) * Math.PI) / 180),
                  }}
                />
              </div>
            ) : null}

            {frame >= FLIP2 ? (
              <div style={pageStyle(rot2, 1, true)}>
                <Art variant={2} seed={303} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to left, rgba(0,0,0,0.42), rgba(0,0,0,0))",
                    opacity: 0.55 * Math.sin((Math.abs(rot2) * Math.PI) / 180),
                  }}
                />
              </div>
            ) : null}
          </div>

          {/* 标签铭牌 */}
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: labelP,
              transform: `translateY(${(1 - labelP) * 8}px)`,
            }}
          >
            <span style={{ width: 3, height: 30, backgroundColor: MAUVE, opacity: 0.85 }} />
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontSize: 29,
                color: INK,
                letterSpacing: "0.01em",
              }}
            >
              {TOOLS[pageIdx].name}
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 17,
                letterSpacing: "0.18em",
                color: COLORS.grey,
              }}
            >
              {TOOLS[pageIdx].year}
            </span>
          </div>
        </Frame>

        {/* ---------------- 右：作品墙 ---------------- */}
        {/* 先挂好六个空画框，作品逐拍落位 */}
        {WALL.map((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const ghostIn = EASE.outExpo(prog(frame, 58 + i * 5, 28));
          return (
            <div
              key={`ghost-${i}`}
              style={{
                position: "absolute",
                left: 840 + col * 320,
                top: 200 + row * 320,
                width: 300,
                height: 300,
                padding: 12,
                border: "1px dashed rgba(168,104,143,0.3)",
                backgroundColor: "rgba(243,240,231,0.06)",
                opacity: ghostIn,
              }}
            >
            </div>
          );
        })}
        {WALL.map((w, i) => {
          const start = WALL0 + i * WALL_BEAT;
          const p = EASE.outExpo(prog(frame, start, 30));
          if (p <= 0) return null;
          const col = i % 3;
          const row = Math.floor(i / 3);
          const drift = Math.sin((frame + i * 53) / 240) * 5;
          return (
            <Frame
              key={w.seed}
              style={{
                position: "absolute",
                left: 840 + col * 320,
                top: 200 + row * 320,
                width: 300,
                height: 300,
                padding: 12,
                opacity: p,
                transform: `translateY(${(1 - p) * 26}px) scale(${0.98 + 0.02 * p})`,
              }}
            >
              <div style={{ position: "relative", width: 276, height: 276, overflow: "hidden" }}>
                <Art
                  variant={w.variant}
                  seed={w.seed}
                  style={{
                    transform: `scale(1.04) translate(${drift}px, ${-drift * 0.6}px)`,
                  }}
                />
              </div>
            </Frame>
          );
        })}

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 62,
            width: 1500,
            opacity: copyIn,
            transform: `translateY(${(1 - copyIn) * 22}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 35, lineHeight: 1.6 }}>
            2022，AI 开始画画——想象力被外包。
          </div>
          <div
            style={{
              ...TYPE.en,
              fontStyle: "italic",
              fontSize: 25,
              color: COLORS.grey,
              marginTop: 9,
            }}
          >
            2022 — AI starts to draw.
          </div>
        </div>
      </AbsoluteFill>

      <Sequence from={Math.round(FLIP1)} durationInFrames={70}>
        <Audio src={staticFile("sfx/page-flip.wav")} volume={0.55} />
      </Sequence>
      <Sequence from={Math.round(FLIP2)} durationInFrames={70}>
        <Audio src={staticFile("sfx/page-flip.wav")} volume={0.55} />
      </Sequence>
    </PaperStage>
  );
};
