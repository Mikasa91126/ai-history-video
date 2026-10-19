/**
 * S14 · 生视频（149s–160s · 660f）｜品红
 * 一张静态的抽象画在按下播放后「动起来」：山脊 / 云 / 粒子分层视差；
 * Sora 2024 标签落拍；右侧视频墙缓慢滚动。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

const MAUVE = ERA.mauve;
const INK = COLORS.ink;
const PAPER = COLORS.paperWhite;

const LIVE = 41.49;
const WALL_AT = 118;
/** 322.74 = 镜内第 6 拍，主文案落在拍上 */
const COPY_AT = 322.74;

/* --------------------------------------------------------------- 小张生成画 */

const MiniArt = ({ variant, seed }: { variant: number; seed: number }) => {
  const uid = `mini${seed}`;
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: PAPER, overflow: "hidden" }}>
      <svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <radialGradient id={`${uid}-r`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={MAUVE} stopOpacity={0.9} />
            <stop offset="100%" stopColor={MAUVE} stopOpacity={0} />
          </radialGradient>
          <linearGradient id={`${uid}-l`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={MAUVE} stopOpacity={0.3} />
            <stop offset="100%" stopColor={MAUVE} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <rect width={600} height={300} fill={PAPER} />
        {variant === 0 ? (
          <g>
            {Array.from({ length: 9 }, (_, i) => (
              <circle
                key={i}
                cx={210}
                cy={150}
                r={22 + i * 22}
                fill="none"
                stroke={i % 3 === 0 ? INK : MAUVE}
                strokeWidth={i % 3 === 0 ? 2 : 1.2}
                opacity={0.5 - i * 0.035}
              />
            ))}
            <circle cx={210} cy={150} r={8} fill={INK} />
            <rect x={430} y={0} width={170} height={300} fill={`url(#${uid}-l)`} />
          </g>
        ) : null}
        {variant === 1 ? (
          <g>
            {Array.from({ length: 8 }, (_, i) => {
              const y = 56 + i * 26;
              return (
                <path
                  key={i}
                  d={`M -20 ${y} C 120 ${y - 28}, 220 ${y + 24}, 320 ${y - 5} S 520 ${y - 18}, 620 ${y + 7}`}
                  fill="none"
                  stroke={i === 3 ? INK : MAUVE}
                  strokeWidth={i === 3 ? 2.6 : 1.3}
                  opacity={i === 3 ? 0.7 : 0.36}
                />
              );
            })}
            <circle cx={490} cy={92} r={52} fill={`url(#${uid}-r)`} />
          </g>
        ) : null}
        {variant === 2 ? (
          <g>
            <rect x={48} y={44} width={190} height={150} fill={MAUVE} opacity={0.8} />
            <rect x={270} y={36} width={200} height={94} fill={INK} opacity={0.82} />
            <rect x={290} y={160} width={220} height={104} fill={MAUVE} opacity={0.22} />
            <circle cx={500} cy={238} r={46} fill={INK} opacity={0.16} />
            <line x1={48} y1={260} x2={540} y2={260} stroke={INK} strokeOpacity={0.3} />
            <circle cx={398} cy={82} r={20} fill={PAPER} opacity={0.9} />
          </g>
        ) : null}
        {variant === 3 ? (
          <g>
            {Array.from({ length: 14 * 7 }, (_, i) => {
              const c = i % 14;
              const r = Math.floor(i / 14);
              const x = 30 + c * 40;
              const y = 24 + r * 38;
              const d = Math.hypot(x - 460, y - 70);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={Math.max(1.3, 13 - d / 26)}
                  fill={MAUVE}
                  opacity={0.5}
                />
              );
            })}
            <circle cx={110} cy={236} r={54} fill={INK} opacity={0.88} />
            <circle cx={110} cy={236} r={28} fill={PAPER} opacity={0.16} />
          </g>
        ) : null}
        <rect width={600} height={300} fill={`url(#${uid}-l)`} opacity={0.18} />
      </svg>
    </div>
  );
};

/* --------------------------------------------------------------- 主视频画面 */

const VideoScene = ({ frame }: { frame: number }) => {
  const live = EASE.outExpo(prog(frame, LIVE, 52));
  const t = Math.max(0, frame - LIVE);

  const cloud = (i: number) => ((t * (0.16 + i * 0.05) + i * 210) % 1180) - 110;
  const ridge = (i: number) =>
    Math.sin(t / (280 + i * 70) + i * 1.7) * (6 + i * 5) * live;

  return (
    <svg viewBox="0 0 972 542" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAF9F5" />
          <stop offset="62%" stopColor="#F1E9E6" />
          <stop offset="100%" stopColor="#E7D8DB" />
        </linearGradient>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={MAUVE} stopOpacity={0.95} />
          <stop offset="55%" stopColor={MAUVE} stopOpacity={0.45} />
          <stop offset="100%" stopColor={MAUVE} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={MAUVE} stopOpacity={0.12} />
          <stop offset="100%" stopColor={MAUVE} stopOpacity={0.3} />
        </linearGradient>
      </defs>

      <rect width={972} height={542} fill="url(#sky)" />

      {/* 太阳 */}
      <circle cx={706} cy={188 + Math.sin(t / 300) * 5 * live} r={150} fill="url(#sun)" />
      <circle cx={706} cy={188 + Math.sin(t / 300) * 5 * live} r={74} fill={MAUVE} opacity={0.86} />
      <circle cx={706} cy={188 + Math.sin(t / 300) * 5 * live} r={74} fill="none" stroke={PAPER} strokeOpacity={0.25} />

      {/* 云带 */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={cloud(i)}
          y={96 + i * 62}
          width={180 + i * 70}
          height={2.5}
          rx={2}
          fill={INK}
          opacity={0.13 - i * 0.025}
        />
      ))}

      {/* 飞鸟 */}
      {[0, 1, 2].map((i) => {
        const x = 220 + i * 92 + Math.sin(t / 220 + i) * 24 * live;
        const y = 148 + i * 24 + Math.cos(t / 260 + i) * 10 * live;
        return (
          <path
            key={i}
            d={`M ${x} ${y} q 10 -8 20 0 q 10 -8 20 0`}
            fill="none"
            stroke={INK}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.38}
          />
        );
      })}

      {/* 三层山脊 */}
      <g transform={`translate(${ridge(0)} 0)`}>
        <path
          d="M0 362 L120 300 L220 340 L330 282 L460 350 L580 302 L720 360 L860 312 L972 350 L972 542 L0 542 Z"
          fill={INK}
          opacity={0.09}
        />
      </g>
      <g transform={`translate(${ridge(1)} 0)`}>
        <path
          d="M0 420 L150 352 L280 400 L420 342 L560 412 L700 350 L830 412 L972 372 L972 542 L0 542 Z"
          fill={INK}
          opacity={0.17}
        />
      </g>
      <g transform={`translate(${ridge(2)} 0)`}>
        <path
          d="M0 482 L180 422 L330 470 L500 412 L650 472 L800 432 L972 482 L972 542 L0 542 Z"
          fill={INK}
          opacity={0.3}
        />
      </g>

      {/* 水面 */}
      <rect y={498} width={972} height={44} fill="url(#water)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={120 + ((t * 0.25 + i * 160) % 760)}
          y1={508 + i * 6}
          x2={120 + ((t * 0.25 + i * 160) % 760) + 60}
          y2={508 + i * 6}
          stroke={PAPER}
          strokeOpacity={0.34}
          strokeWidth={1.2}
        />
      ))}

      {/* 上升粒子 */}
      {Array.from({ length: 16 }, (_, i) => {
        const rnd = mulberry32(900 + i);
        const baseX = rnd() * 940;
        const y = 542 - ((t * (0.16 + rnd() * 0.2) + rnd() * 520) % 560);
        return (
          <circle
            key={i}
            cx={baseX + Math.sin(t / 180 + i) * 8 * live}
            cy={y}
            r={1.4 + rnd() * 1.8}
            fill={MAUVE}
            opacity={0.35 * live}
          />
        );
      })}
    </svg>
  );
};

/* --------------------------------------------------------------- 局部零件 */

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

const WALL = [
  { variant: 0, seed: 911 },
  { variant: 1, seed: 912 },
  { variant: 2, seed: 913 },
  { variant: 3, seed: 914 },
];

export const S14 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const fade = Math.min(prog(frame, 0, 10), 1 - prog(frame, dur - 14, 14));

  const playerIn = EASE.outExpo(prog(frame, 10, 34));
  const chipP = EASE.outExpo(prog(frame, LIVE, 24));
  const playOut = prog(frame, LIVE, 20);
  const wallIn = EASE.outExpo(prog(frame, WALL_AT, 34));
  const copyIn = EASE.outExpo(prog(frame, COPY_AT, 34));

  const progress = prog(frame, LIVE, dur - LIVE);
  const scroll = frame > WALL_AT ? (frame - WALL_AT) * 0.42 : 0;
  const loop = scroll % 314;

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          生成视频 · 2024
        </div>

        {/* ---------------- 左：主播放器 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 190,
            width: 1000,
            height: 570,
            padding: 14,
            backgroundColor: PAPER,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 18,
            boxShadow: "0 26px 64px rgba(31,30,29,0.12)",
            opacity: playerIn,
            transform: `translateY(${(1 - playerIn) * 26}px)`,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 972,
              height: 542,
              overflow: "hidden",
              borderRadius: 10,
              backgroundColor: COLORS.paperDeep,
            }}
          >
            <VideoScene frame={frame} />

            {/* Sora 标签 */}
            <div
              style={{
                position: "absolute",
                left: 26,
                top: 24,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 16px",
                backgroundColor: "rgba(250,249,245,0.9)",
                border: `1px solid ${ERA.mauve}`,
                borderRadius: 8,
                boxShadow: "0 8px 22px rgba(31,30,29,0.12)",
                opacity: chipP,
                transform: `scale(${0.92 + 0.08 * chipP})`,
                transformOrigin: "0% 50%",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 99, backgroundColor: ERA.mauve }} />
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 21,
                  letterSpacing: "0.2em",
                  color: COLORS.ink,
                }}
              >
                SORA · 2024
              </span>
            </div>

            {/* 播放遮罩 */}
            {playOut < 1 ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `rgba(20,20,19,${0.08 * (1 - playOut)})`,
                  opacity: 1 - playOut,
                }}
              >
                <div
                  style={{
                    width: 108,
                    height: 108,
                    borderRadius: "50%",
                    backgroundColor: "rgba(250,249,245,0.88)",
                    border: `1px solid ${COLORS.line}`,
                    boxShadow: "0 16px 40px rgba(31,30,29,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      marginLeft: 7,
                      borderTop: "17px solid transparent",
                      borderBottom: "17px solid transparent",
                      borderLeft: `26px solid ${ERA.mauve}`,
                    }}
                  />
                </div>
              </div>
            ) : null}

            {/* 播放进度 */}
            <div
              style={{
                position: "absolute",
                left: 22,
                right: 22,
                bottom: 18,
                height: 3,
                borderRadius: 2,
                backgroundColor: "rgba(20,20,19,0.18)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress * 100}%`,
                  height: "100%",
                  backgroundColor: ERA.mauve,
                  opacity: 0.9,
                }}
              />
            </div>
          </div>
        </div>

        {/* ---------------- 右：视频墙 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 1200,
            top: 190,
            width: 580,
            height: 660,
            overflow: "hidden",
            opacity: wallIn,
            transform: `translateX(${(1 - wallIn) * 34}px)`,
          }}
        >
          <div style={{ transform: `translateY(${-loop}px)` }}>
            {WALL.map((w, i) => (
              <div
                key={w.seed}
                style={{
                  position: "relative",
                  width: 580,
                  height: 290,
                  marginBottom: 24,
                  padding: 12,
                  backgroundColor: PAPER,
                  border: `1px solid ${COLORS.line}`,
                  boxShadow: "0 16px 38px rgba(31,30,29,0.09)",
                }}
              >
                <div style={{ position: "relative", width: 556, height: 266, overflow: "hidden" }}>
                  <MiniArt variant={w.variant} seed={w.seed} />
                  <span
                    style={{
                      position: "absolute",
                      left: 10,
                      top: 10,
                      fontFamily: FONTS.mono,
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: COLORS.ink,
                      backgroundColor: "rgba(250,249,245,0.82)",
                      border: `1px solid ${COLORS.lineSoft}`,
                      borderRadius: 4,
                      padding: "3px 7px",
                    }}
                  >
                    CLIP {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      left: 12,
                      bottom: 12,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      backgroundColor: "rgba(250,249,245,0.82)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        marginLeft: 2,
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: `8px solid ${ERA.mauve}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 上下渐隐 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 54,
              background: `linear-gradient(to bottom, ${COLORS.paper}, rgba(240,238,230,0))`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 54,
              background: `linear-gradient(to top, ${COLORS.paper}, rgba(240,238,230,0))`,
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: 1200,
            top: 150,
            fontFamily: FONTS.mono,
            fontSize: 17,
            letterSpacing: "0.22em",
            color: COLORS.grey,
            opacity: 0.55 * wallIn,
          }}
        >
          视频墙 / VIDEO WALL
        </div>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 66,
            width: 1540,
            opacity: copyIn,
            transform: `translateY(${(1 - copyIn) * 22}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 35, lineHeight: 1.6 }}>
            2024，Sora 惊鸿一瞥——视频，也成了被生成的东西。
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
            2024 — video becomes generated, too.
          </div>
        </div>

        <LandPiece frame={frame} dur={dur} />
      </AbsoluteFill>

      <Sequence from={14} durationInFrames={50}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={Math.round(LIVE)} durationInFrames={60}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.65} />
      </Sequence>
      <Sequence from={WALL_AT} durationInFrames={44}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.45} />
      </Sequence>
    </PaperStage>
  );
};
