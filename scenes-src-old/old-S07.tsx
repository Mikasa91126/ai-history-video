/**
 * S07 · GAN·生成的开端（63.5s–76s · 750f）
 * 像素绿：六张程序生成的抽象图从噪声里逐拍显影（扫描线揭示），
 * 右侧「造假者 G × 鉴定者 D」双圆对抗环。全部图像为程序绘制。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

const B = (i: number): number => Math.round(37.7 + i * 56.25);
const LOOP = B(6);
const G = ERA.pixel;
const rgba = (a: number): string => `rgba(74,124,89,${a})`;

const CARD_W = 320;
const CARD_H = 250;
const GAP = 22;

const pulse = (frame: number, start: number, interval = 112.5): number => {
  if (frame < start) return 0;
  const local = (frame - start) % interval;
  return Math.exp(-local / 14);
};

export const S07 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = Math.min(prog(frame, 0, 12), 1 - prog(frame, dur - 14, 14));
  const copy = Math.min(prog(frame, 120, 26), 1 - prog(frame, dur - 14, 14));
  const copyEn = Math.min(prog(frame, 140, 26), 1 - prog(frame, dur - 14, 14));
  const loopP = EASE.outExpo(prog(frame, LOOP, 30));
  const ghostP = prog(frame, 24, 30);

  const pG = pulse(frame, LOOP);
  const pD = pulse(frame, LOOP + 56.25);

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 章节标签 */}
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          学习时代 · 2014 ｜ THE LEARNING ERA
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 136,
            width: 300,
            height: 1,
            backgroundColor: G,
            opacity: 0.42,
            transformOrigin: "left center",
            transform: `scaleX(${EASE.outExpo(prog(frame, 10, 40))})`,
          }}
        />

        {/* ---------------- 左：样本墙 ---------------- */}
        <div style={{ position: "absolute", left: 140, top: 180, width: 1008 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11.5,
              letterSpacing: "0.2em",
              color: COLORS.grey,
              opacity: prog(frame, 12, 24) * 0.9,
            }}
          >
            CHAPTER 02 · SAMPLES FROM NOISE
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 16 }}>
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 44,
                letterSpacing: "0.02em",
                color: COLORS.ink,
                opacity: prog(frame, 14, 28),
              }}
            >
              FROM NOISE
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 19,
                letterSpacing: "0.12em",
                color: G,
                opacity: prog(frame, 24, 24),
              }}
            >
              2014
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: FONTS.mono,
                fontSize: 11,
                letterSpacing: "0.12em",
                color: COLORS.grey,
                opacity: prog(frame, 30, 24) * 0.85,
              }}
            >
              64 × 64 PX · SIX SAMPLES
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 140,
            top: 270,
            width: 1008,
            display: "grid",
            gridTemplateColumns: `repeat(3, ${CARD_W}px)`,
            gridAutoRows: `${CARD_H}px`,
            gap: GAP,
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Sample key={i} index={i} frame={frame} />
          ))}
        </div>

        {/* ---------------- 右：对抗双圆 ---------------- */}
        <div style={{ position: "absolute", left: 1300, top: 180, width: 480, height: 620 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11.5,
              letterSpacing: "0.2em",
              color: COLORS.grey,
              opacity: prog(frame, 24, 24) * 0.9,
            }}
          >
            ADVERSARIAL LOOP · 2014
          </div>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              opacity: prog(frame, 30, 28),
            }}
          >
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 46,
                lineHeight: 1,
                color: COLORS.ink,
              }}
            >
              G × D
            </span>
            <span
              style={{
                fontFamily: FONTS.sansCN,
                fontSize: 19,
                letterSpacing: "0.1em",
                color: COLORS.grey,
              }}
            >
              造假者 × 鉴定者
            </span>
          </div>

          {/* 幽灵圆（结构预告） */}
          {[
            { top: 90 },
            { top: 350 },
          ].map((c) => (
            <div
              key={c.top}
              style={{
                position: "absolute",
                left: 140,
                top: c.top,
                width: 200,
                height: 200,
                borderRadius: "50%",
                border: `1.5px dashed ${rgba(0.4)}`,
                opacity: ghostP * (1 - loopP * 0.75),
              }}
            />
          ))}

          {/* 脉冲光 */}
          <div
            style={{
              position: "absolute",
              left: 100,
              top: 50,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${rgba(0.28)} 0%, rgba(74,124,89,0) 66%)`,
              opacity: (0.12 + pG * 0.42) * loopP,
              filter: "blur(12px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 100,
              top: 310,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${rgba(0.28)} 0%, rgba(74,124,89,0) 66%)`,
              opacity: (0.12 + pD * 0.42) * loopP,
              filter: "blur(12px)",
            }}
          />

          {/* G */}
          <CircleLabel
            top={90}
            letter="G"
            cn="造假者"
            en="GENERATOR"
            op={loopP}
            pulse={pG}
            start={LOOP}
            frame={frame}
          />
          {/* D */}
          <CircleLabel
            top={350}
            letter="D"
            cn="鉴定者"
            en="DISCRIMINATOR"
            op={loopP}
            pulse={pD}
            start={LOOP + 10}
            frame={frame}
          />

          {/* 对抗箭头 */}
          <svg
            width={480}
            height={620}
            viewBox="0 0 480 620"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <g opacity={loopP}>
              <DrawPath d="M 366 234 L 366 406" start={LOOP + 10} dur={44} stroke={G} width={1.8} opacity={0.65} endDot={false} />
              <DrawPath d="M 114 406 L 114 234" start={LOOP + 24} dur={44} stroke={G} width={1.8} opacity={0.65} endDot={false} />
              <polygon
                points="360,400 366,412 372,400"
                fill={G}
                opacity={prog(frame, LOOP + 52, 14) * 0.65}
              />
              <polygon
                points="108,240 114,228 120,240"
                fill={G}
                opacity={prog(frame, LOOP + 66, 14) * 0.65}
              />
              <g fontFamily={FONTS.mono} fontSize={9} letterSpacing="0.2em" fill={G} opacity={prog(frame, LOOP + 70, 20) * 0.65}>
                <text x={0} y={0} transform="translate(377 320) rotate(90)" textAnchor="middle">
                  FAKE
                </text>
                <text x={0} y={0} transform="translate(103 320) rotate(-90)" textAnchor="middle">
                  GRADIENT
                </text>
              </g>
              {/* 循环数据点 */}
              {frame > LOOP + 64 ? (
                <>
                  <MovingDot x={366} from={234} to={406} frame={frame} phase={0} />
                  <MovingDot x={114} from={406} to={234} frame={frame} phase={56.25} />
                </>
              ) : null}
              <text
                x={240}
                y={588}
                textAnchor="middle"
                fontFamily={FONTS.mono}
                fontSize={11}
                letterSpacing="0.12em"
                fill={COLORS.grey}
                opacity={prog(frame, LOOP + 52, 22) * 0.75}
              >
                min max V(D, G)
              </text>
            </g>
          </svg>
        </div>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 96,
            maxWidth: 1570,
            borderLeft: `3px solid ${G}`,
            paddingLeft: 26,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 40, lineHeight: 1.5 }}>
            2014，机器学会「想象」——从噪声里画出不存在的东西。
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
            2014 — machines learn to imagine.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：样本显影 / 对抗环 */}
      <Sequence from={14} durationInFrames={70}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={B(1)} durationInFrames={55}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={B(3)} durationInFrames={55}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.22} />
      </Sequence>
      <Sequence from={B(5)} durationInFrames={55}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={LOOP} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.55} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 双圆 */

const CircleLabel = ({
  top,
  letter,
  cn,
  en,
  op,
  pulse,
  start,
  frame,
}: {
  top: number;
  letter: string;
  cn: string;
  en: string;
  op: number;
  pulse: number;
  start: number;
  frame: number;
}) => {
  const p = EASE.outExpo(prog(frame, start, 28));
  return (
    <div
      style={{
        position: "absolute",
        left: 140,
        top,
        width: 200,
        height: 200,
        borderRadius: "50%",
        border: `2px solid ${G}`,
        backgroundColor: COLORS.paperWhite,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        opacity: Math.min(1, op * 1.5),
        transform: `scale(${0.92 + p * 0.08 + pulse * 0.018})`,
        boxShadow: `0 18px 40px rgba(31,30,29,0.08), 0 0 0 ${pulse * 5}px ${rgba(0.06)}`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.serifLatin,
          fontSize: 74,
          lineHeight: 0.9,
          color: G,
        }}
      >
        {letter}
      </span>
      <span
        style={{
          fontFamily: FONTS.sansCN,
          fontSize: 21,
          letterSpacing: "0.12em",
          color: COLORS.ink,
          marginTop: 6,
        }}
      >
        {cn}
      </span>
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 9,
          letterSpacing: "0.16em",
          color: COLORS.grey,
          marginTop: 3,
        }}
      >
        {en}
      </span>
    </div>
  );
};

const MovingDot = ({
  x,
  from,
  to,
  frame,
  phase,
}: {
  x: number;
  from: number;
  to: number;
  frame: number;
  phase: number;
}) => {
  const period = 112.5;
  const t = (((frame - LOOP - phase) % period) + period) % period / period;
  const y = from + (to - from) * t;
  return (
    <>
      <circle cx={x} cy={y} r={7} fill={G} opacity={0.14} />
      <circle cx={x} cy={y} r={3.4} fill={G} opacity={0.9} />
    </>
  );
};

/* ---------------------------------------------------------------- 样本卡 */

const Sample = ({ index, frame }: { index: number; frame: number }) => {
  const start = B(index);
  const p = EASE.outExpo(prog(frame, start, 28));
  const inP = EASE.outExpo(prog(frame, 8 + index * 3, 24));
  const flash = Math.max(0, 1 - Math.abs(frame - (start + 20)) / 14) * (p > 0.5 ? 1 : 0);

  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        border: `1px solid ${rgba(0.22 + flash * 0.55)}`,
        boxShadow:
          flash > 0.05
            ? `0 0 ${18 + flash * 26}px ${rgba(0.22 * flash)}, 0 12px 28px rgba(20,20,19,0.18)`
            : "0 12px 28px rgba(20,20,19,0.16)",
        opacity: Math.min(1, inP * 1.5),
        transform: `translateY(${(1 - inP) * 16}px)`,
      }}
    >
      {/* 噪声 */}
      <div style={{ position: "absolute", inset: 0, opacity: (1 - p) * 0.95 }}>
        <Noise index={index} frame={frame} />
      </div>

      {/* 显影图像（自左向右扫描揭示） */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: Math.min(1, p * 1.3),
          clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
        }}
      >
        <Art index={index} />
      </div>

      {/* 扫描线 */}
      {p > 0.015 && p < 0.985 ? (
        <div
          style={{
            position: "absolute",
            left: `${p * 100}%`,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: G,
            boxShadow: `0 0 14px ${G}, 0 0 4px ${G}`,
            opacity: 0.85,
          }}
        />
      ) : null}

      {/* 角标 */}
      <div
        style={{
          position: "absolute",
          left: 12,
          top: 10,
          fontFamily: FONTS.mono,
          fontSize: 9,
          letterSpacing: "0.18em",
          color: G,
        }}
      >
        <span style={{ opacity: (1 - p) * 0.6 }}>NOISE</span>
        <span style={{ position: "absolute", left: 0, top: 0, opacity: p * 0.75 }}>SAMPLE</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 12,
          top: 10,
          fontFamily: FONTS.mono,
          fontSize: 8,
          letterSpacing: "0.14em",
          color: COLORS.paperWhite,
          opacity: p * 0.5,
        }}
      >
        64×64
      </div>
      <div
        style={{
          position: "absolute",
          left: 12,
          bottom: 9,
          fontFamily: FONTS.mono,
          fontSize: 9,
          letterSpacing: "0.14em",
          color: COLORS.paperWhite,
          opacity: p * 0.65,
        }}
      >
        G(z) · 0{index + 1}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- 噪声 */

const Noise = ({ index, frame }: { index: number; frame: number }) => {
  const rnd = mulberry32(4200 + index * 131);
  const dx = ((frame * 7 + index * 11) % 6) - 3;
  const dy = ((frame * 11 + index * 17) % 6) - 3;
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 250" preserveAspectRatio="none" aria-hidden>
      <rect width={320} height={250} fill={COLORS.ink} />
      <g transform={`translate(${dx} ${dy})`}>
        {Array.from({ length: 16 * 13 }, (_, i) => {
          const col = i % 16;
          const row = Math.floor(i / 16);
          const v = rnd();
          const paper = rnd() > 0.9;
          return (
            <rect
              key={i}
              x={col * 20 + 1}
              y={row * 20 + 1}
              width={18}
              height={18}
              fill={paper ? COLORS.paperWhite : G}
              opacity={0.03 + v * (paper ? 0.22 : 0.38)}
            />
          );
        })}
      </g>
      <rect width={320} height={250} fill={`url(#s07-noise-vignette-${index})`} />
      <defs>
        <radialGradient id={`s07-noise-vignette-${index}`} cx="50%" cy="50%" r="72%">
          <stop offset="55%" stopColor="#141413" stopOpacity="0" />
          <stop offset="100%" stopColor="#141413" stopOpacity="0.42" />
        </radialGradient>
      </defs>
    </svg>
  );
};

/* ---------------------------------------------------------------- 生成图 */

const Art = ({ index }: { index: number }) => {
  const id = (s: string): string => `s07-${index}-${s}`;
  const kind = index % 6;

  return (
    <svg width="100%" height="100%" viewBox="0 0 320 250" preserveAspectRatio="none" aria-hidden>
      <rect width={320} height={250} fill={COLORS.ink} />
      {kind === 0 ? (
        <>
          <defs>
            <radialGradient id={id("orb")} cx="50%" cy="50%" r="58%">
              <stop offset="0%" stopColor="#8DBE9A" stopOpacity="0.95" />
              <stop offset="38%" stopColor={G} stopOpacity="0.55" />
              <stop offset="100%" stopColor={G} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={160} cy={125} r={118} fill={`url(#${id("orb")})`} />
          <circle cx={160} cy={125} r={82} fill="none" stroke={G} strokeWidth={1.4} opacity={0.45} />
          <circle cx={160} cy={125} r={54} fill="none" stroke={G} strokeWidth={1.8} opacity={0.65} />
          <circle cx={160} cy={125} r={25} fill="none" stroke={COLORS.paperWhite} strokeWidth={1} opacity={0.32} />
          <circle cx={166} cy={117} r={6} fill={COLORS.paperWhite} opacity={0.8} />
        </>
      ) : null}
      {kind === 1 ? (
        <>
          <defs>
            <linearGradient id={id("flow")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={G} stopOpacity="0.05" />
              <stop offset="48%" stopColor="#8DBE9A" stopOpacity="0.55" />
              <stop offset="100%" stopColor={G} stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path
            d="M -30 190 C 42 52, 108 246, 186 120 S 300 42, 366 148 L 366 260 L -30 260 Z"
            fill={`url(#${id("flow")})`}
          />
          <path
            d="M -30 172 C 52 70, 110 228, 190 132 S 296 60, 360 140"
            fill="none"
            stroke="#9CC7A6"
            strokeWidth={1.6}
            opacity={0.7}
          />
          <path
            d="M -30 206 C 58 112, 120 252, 200 160 S 300 94, 360 166"
            fill="none"
            stroke={G}
            strokeWidth={1.1}
            opacity={0.5}
          />
        </>
      ) : null}
      {kind === 2 ? (
        <>
          {Array.from({ length: 8 * 6 }, (_, i) => {
            const rnd = mulberry32(8800 + index * 99 + i * 31);
            const c = i % 8;
            const r = Math.floor(i / 8);
            const band = Math.exp(-Math.pow((c - r * 1.2 - 1) / 2.3, 2));
            const v = rnd() * 0.55 + band * 0.35;
            return (
              <rect
                key={i}
                x={18 + c * 36}
                y={18 + r * 36}
                width={32}
                height={32}
                fill={v > 0.62 ? "#9CC7A6" : G}
                opacity={0.08 + v * 0.6}
              />
            );
          })}
          <circle cx={230} cy={78} r={7} fill={COLORS.paperWhite} opacity={0.35} />
        </>
      ) : null}
      {kind === 3 ? (
        <>
          <defs>
            <radialGradient id={id("halo")} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#9CC7A6" stopOpacity="0.3" />
              <stop offset="100%" stopColor={G} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={130} cy={120} r={100} fill={`url(#${id("halo")})`} />
          <circle cx={128} cy={118} r={76} fill={G} opacity={0.14} />
          <circle cx={196} cy={134} r={62} fill={G} opacity={0.2} />
          <circle cx={196} cy={134} r={62} fill="none" stroke="#9CC7A6" strokeWidth={1.2} opacity={0.55} />
          <circle cx={158} cy={92} r={40} fill={COLORS.paperWhite} opacity={0.06} />
          <circle cx={158} cy={92} r={40} fill="none" stroke={COLORS.paperWhite} strokeWidth={0.9} opacity={0.28} />
          <circle cx={110} cy={168} r={5} fill={COLORS.paperWhite} opacity={0.55} />
        </>
      ) : null}
      {kind === 4 ? (
        <>
          <defs>
            <linearGradient id={id("beam")} x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0%" stopColor={G} stopOpacity="0.04" />
              <stop offset="65%" stopColor="#8DBE9A" stopOpacity="0.32" />
              <stop offset="100%" stopColor={G} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <polygon points="30,250 118,0 196,0 108,250" fill={`url(#${id("beam")})`} />
          <polygon points="150,250 238,0 274,0 186,250" fill={G} opacity={0.1} />
          <polygon points="236,250 296,88 320,88 320,250" fill="#9CC7A6" opacity={0.08} />
          <line x1={6} y1={224} x2={314} y2={26} stroke={COLORS.paperWhite} strokeWidth={0.8} opacity={0.26} />
          <line x1={70} y1={250} x2={292} y2={44} stroke={G} strokeWidth={1.1} opacity={0.4} />
        </>
      ) : null}
      {kind === 5 ? (
        <>
          {[26, 50, 74, 98, 122].map((r, i) => (
            <circle
              key={r}
              cx={160}
              cy={125}
              r={r}
              fill="none"
              stroke={i % 2 === 0 ? G : "#9CC7A6"}
              strokeWidth={i % 2 === 0 ? 2.2 : 1}
              opacity={0.62 - i * 0.08}
              strokeDasharray={`${40 + i * 12} ${16 + i * 8}`}
              transform={`rotate(${i * 28} 160 125)`}
            />
          ))}
          <circle cx={160} cy={125} r={7} fill={COLORS.paperWhite} opacity={0.85} />
          <circle cx={160} cy={125} r={16} fill="none" stroke={G} strokeWidth={1} opacity={0.5} />
        </>
      ) : null}
    </svg>
  );
};
