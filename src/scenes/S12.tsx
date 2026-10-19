/**
 * S12 · 2014 GAN（540f）
 * REF 750f → k = dur / 750。噪声 → 图像显影、G × D 对抗环均按 k 收紧。
 * 深色舞台 + 像素绿；去掉旧版边角注释，只留必要标记。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

const REF = 750;
const BASE_B = (i: number): number => 37.7 + i * 56.25;
const G = ERA.pixel;
const rgba = (a: number): string => `rgba(127,176,138,${a})`;

const CARD_W = 320;
const CARD_H = 250;
const GAP = 22;

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
        stroke={G}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M18 38 H46"
        stroke={G}
        strokeWidth={1}
        strokeOpacity={0.3}
        strokeDasharray="2 4"
      />
    </svg>
  );
};

const pulse = (frame: number, start: number, interval: number): number => {
  if (frame < start) return 0;
  const local = (frame - start) % interval;
  return Math.exp(-local / (interval * 0.17));
};

export const S12 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const k = dur / REF;
  const at = (f: number): number => Math.round(f * k);

  const LOOP = at(BASE_B(6));
  const PULSE = 112.5 * k;

  const fade = prog(frame, 0, 7);
  const copy = Math.min(prog(frame, at(120), 26), 1);
  const copyEn = Math.min(prog(frame, at(140), 26), 1);
  const loopP = EASE.outExpo(prog(frame, LOOP, 30 * k));
  const ghostP = prog(frame, 18, 28);
  const panelIn = EASE.outExpo(prog(frame, 20, 30));

  const pG = pulse(frame, LOOP, PULSE);
  const pD = pulse(frame, LOOP + PULSE * 0.5, PULSE);

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 左上 kicker */}
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

        {/* 左：样本墙 */}
        <div style={{ position: "absolute", left: 140, top: 174, width: 1008 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              opacity: EASE.outExpo(prog(frame, 12, 28)),
              transform: `translateY(${(1 - EASE.outExpo(prog(frame, 12, 28))) * 10}px)`,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 48,
                letterSpacing: "0.015em",
                color: COLORS.ink,
              }}
            >
              FROM NOISE
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 19,
                letterSpacing: "0.14em",
                color: G,
              }}
            >
              2014
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 140,
            top: 252,
            width: 1008,
            display: "grid",
            gridTemplateColumns: `repeat(3, ${CARD_W}px)`,
            gridAutoRows: `${CARD_H}px`,
            gap: GAP,
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Sample key={i} index={i} frame={frame} at={at} />
          ))}
        </div>

        {/* 右：G × D 对抗环 */}
        <div
          style={{
            position: "absolute",
            left: 1290,
            top: 174,
            width: 490,
            height: 650,
            opacity: panelIn,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              transform: `translateY(${(1 - panelIn) * 10}px)`,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 56,
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
                letterSpacing: "0.08em",
                color: COLORS.grey,
              }}
            >
              造假者 × 鉴定者
            </span>
          </div>

          {/* 结构预告：双圆虚线 */}
          {[100, 370].map((top) => (
            <div
              key={top}
              style={{
                position: "absolute",
                left: 145,
                top,
                width: 200,
                height: 200,
                borderRadius: "50%",
                border: `1.5px dashed ${rgba(0.38)}`,
                opacity: ghostP * (1 - loopP * 0.8),
              }}
            />
          ))}

          {/* 脉冲光 */}
          <div
            style={{
              position: "absolute",
              left: 105,
              top: 60,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${rgba(0.26)} 0%, rgba(127,176,138,0) 66%)`,
              opacity: (0.08 + pG * 0.42) * loopP,
              filter: "blur(12px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 105,
              top: 330,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${rgba(0.26)} 0%, rgba(127,176,138,0) 66%)`,
              opacity: (0.08 + pD * 0.42) * loopP,
              filter: "blur(12px)",
            }}
          />

          <CircleLabel
            top={100}
            letter="G"
            cn="造假者"
            op={loopP}
            pulse={pG}
            start={LOOP}
            frame={frame}
          />
          <CircleLabel
            top={370}
            letter="D"
            cn="鉴定者"
            op={loopP}
            pulse={pD}
            start={LOOP + 10 * k}
            frame={frame}
          />

          {/* 对抗箭头 */}
          <svg
            width={490}
            height={650}
            viewBox="0 0 490 650"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <g opacity={loopP}>
              <DrawPath
                d="M 365 244 L 365 426"
                start={LOOP + 10 * k}
                dur={44 * k}
                stroke={G}
                width={1.8}
                opacity={0.62}
                endDot={false}
              />
              <DrawPath
                d="M 124 426 L 124 244"
                start={LOOP + 24 * k}
                dur={44 * k}
                stroke={G}
                width={1.8}
                opacity={0.62}
                endDot={false}
              />
              <polygon
                points="359,420 365,432 371,420"
                fill={G}
                opacity={prog(frame, LOOP + 52 * k, 14) * 0.62}
              />
              <polygon
                points="118,250 124,238 130,250"
                fill={G}
                opacity={prog(frame, LOOP + 66 * k, 14) * 0.62}
              />
              {frame > LOOP + 64 * k ? (
                <>
                  <MovingDot
                    x={365}
                    from={244}
                    to={426}
                    frame={frame}
                    phase={0}
                    period={PULSE}
                    start={LOOP}
                  />
                  <MovingDot
                    x={124}
                    from={426}
                    to={244}
                    frame={frame}
                    phase={PULSE / 2}
                    period={PULSE}
                    start={LOOP}
                  />
                </>
              ) : null}
            </g>
          </svg>
        </div>

        {/* 主文案 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 76,
            maxWidth: 1420,
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
              fontSize: 31,
              color: COLORS.grey,
              marginTop: 8,
              opacity: copyEn,
            }}
          >
            2014 — machines learn to imagine.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：第一张显影 / 对抗环闭合 */}
      <Sequence from={at(BASE_B(0))} durationInFrames={50}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={LOOP} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.52} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 双圆 */

const CircleLabel = ({
  top,
  letter,
  cn,
  op,
  pulse: pulseV,
  start,
  frame,
}: {
  top: number;
  letter: string;
  cn: string;
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
        left: 145,
        top,
        width: 200,
        height: 200,
        borderRadius: "50%",
        border: `2px solid ${G}`,
        backgroundColor: COLORS.paperDeep,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        opacity: Math.min(1, op * 1.5),
        transform: `scale(${0.92 + p * 0.08 + pulseV * 0.018})`,
        boxShadow: `0 22px 48px rgba(0,0,0,0.46), 0 0 0 ${pulseV * 5}px ${rgba(
          0.06,
        )}`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.serifLatin,
          fontSize: 78,
          lineHeight: 0.9,
          color: G,
        }}
      >
        {letter}
      </span>
      <span
        style={{
          fontFamily: FONTS.sansCN,
          fontSize: 22,
          letterSpacing: "0.14em",
          color: COLORS.ink,
          marginTop: 7,
        }}
      >
        {cn}
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
  period,
  start,
}: {
  x: number;
  from: number;
  to: number;
  frame: number;
  phase: number;
  period: number;
  start: number;
}) => {
  const local = (((frame - start - phase) % period) + period) % period;
  const t = local / period;
  const y = from + (to - from) * t;
  return (
    <>
      <circle cx={x} cy={y} r={7} fill={G} opacity={0.14} />
      <circle cx={x} cy={y} r={3.4} fill={G} opacity={0.9} />
    </>
  );
};

/* ---------------------------------------------------------------- 样本卡 */

const Sample = ({
  index,
  frame,
  at,
}: {
  index: number;
  frame: number;
  at: (f: number) => number;
}) => {
  const start = at(BASE_B(index));
  const p = EASE.outExpo(prog(frame, start, 28));
  const inP = EASE.outExpo(prog(frame, 8 + index * 4, 24));
  const flash = Math.max(0, 1 - Math.abs(frame - (start + 18)) / 14) * (p > 0.5 ? 1 : 0);

  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: COLORS.deep,
        border: `1px solid ${rgba(0.2 + flash * 0.55)}`,
        boxShadow:
          flash > 0.05
            ? `0 0 ${18 + flash * 28}px ${rgba(0.2 * flash)}, 0 22px 40px rgba(0,0,0,0.45)`
            : "0 22px 40px rgba(0,0,0,0.4)",
        opacity: Math.min(1, inP * 1.5),
        transform: `translateY(${(1 - inP) * 16}px)`,
      }}
    >
      {/* 噪声 */}
      <div style={{ position: "absolute", inset: 0, opacity: (1 - p) * 0.96 }}>
        <Noise index={index} frame={frame} />
      </div>

      {/* 显影图像 */}
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
            boxShadow: `0 0 16px ${G}, 0 0 4px ${G}`,
            opacity: 0.85,
          }}
        />
      ) : null}

      {/* 卡片内衬 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 7,
          border: "1px solid rgba(243,240,231,0.06)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

/* ---------------------------------------------------------------- 噪声 */

const Noise = ({ index, frame }: { index: number; frame: number }) => {
  const rnd = mulberry32(4200 + index * 131);
  const dx = ((frame * 7 + index * 11) % 6) - 3;
  const dy = ((frame * 11 + index * 17) % 6) - 3;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 320 250"
      preserveAspectRatio="none"
      aria-hidden
    >
      <rect width={320} height={250} fill="#0A0A09" />
      <g transform={`translate(${dx} ${dy})`}>
        {Array.from({ length: 16 * 13 }, (_, i) => {
          const col = i % 16;
          const row = Math.floor(i / 16);
          const v = rnd();
          const warmPixel = rnd() > 0.9;
          return (
            <rect
              key={i}
              x={col * 20 + 1}
              y={row * 20 + 1}
              width={18}
              height={18}
              fill={warmPixel ? COLORS.ink : G}
              opacity={0.025 + v * (warmPixel ? 0.2 : 0.34)}
            />
          );
        })}
      </g>
      <rect width={320} height={250} fill={`url(#s12-noise-${index})`} />
      <defs>
        <radialGradient id={`s12-noise-${index}`} cx="50%" cy="50%" r="72%">
          <stop offset="55%" stopColor="#0A0A09" stopOpacity="0" />
          <stop offset="100%" stopColor="#0A0A09" stopOpacity="0.55" />
        </radialGradient>
      </defs>
    </svg>
  );
};

/* ---------------------------------------------------------------- 生成图 */

const Art = ({ index }: { index: number }) => {
  const id = (s: string): string => `s12-${index}-${s}`;
  const kind = index % 6;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 320 250"
      preserveAspectRatio="none"
      aria-hidden
    >
      <rect width={320} height={250} fill="#0C0C0B" />
      {kind === 0 ? (
        <>
          <defs>
            <radialGradient id={id("orb")} cx="50%" cy="50%" r="58%">
              <stop offset="0%" stopColor="#A3D4AF" stopOpacity="0.95" />
              <stop offset="38%" stopColor={G} stopOpacity="0.55" />
              <stop offset="100%" stopColor={G} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={160} cy={125} r={118} fill={`url(#${id("orb")})`} />
          <circle cx={160} cy={125} r={82} fill="none" stroke={G} strokeWidth={1.4} opacity={0.45} />
          <circle cx={160} cy={125} r={54} fill="none" stroke={G} strokeWidth={1.8} opacity={0.65} />
          <circle cx={160} cy={125} r={25} fill="none" stroke={COLORS.ink} strokeWidth={1} opacity={0.32} />
          <circle cx={166} cy={117} r={6} fill={COLORS.ink} opacity={0.85} />
        </>
      ) : null}
      {kind === 1 ? (
        <>
          <defs>
            <linearGradient id={id("flow")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={G} stopOpacity="0.05" />
              <stop offset="48%" stopColor="#A3D4AF" stopOpacity="0.55" />
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
            stroke="#A3D4AF"
            strokeWidth={1.6}
            opacity={0.72}
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
                fill={v > 0.62 ? "#A3D4AF" : G}
                opacity={0.08 + v * 0.6}
              />
            );
          })}
          <circle cx={230} cy={78} r={7} fill={COLORS.ink} opacity={0.4} />
        </>
      ) : null}
      {kind === 3 ? (
        <>
          <defs>
            <radialGradient id={id("halo")} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#A3D4AF" stopOpacity="0.3" />
              <stop offset="100%" stopColor={G} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={130} cy={120} r={100} fill={`url(#${id("halo")})`} />
          <circle cx={128} cy={118} r={76} fill={G} opacity={0.14} />
          <circle cx={196} cy={134} r={62} fill={G} opacity={0.2} />
          <circle cx={196} cy={134} r={62} fill="none" stroke="#A3D4AF" strokeWidth={1.2} opacity={0.55} />
          <circle cx={158} cy={92} r={40} fill={COLORS.ink} opacity={0.07} />
          <circle cx={158} cy={92} r={40} fill="none" stroke={COLORS.ink} strokeWidth={0.9} opacity={0.3} />
          <circle cx={110} cy={168} r={5} fill={COLORS.ink} opacity={0.6} />
        </>
      ) : null}
      {kind === 4 ? (
        <>
          <defs>
            <linearGradient id={id("beam")} x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0%" stopColor={G} stopOpacity="0.04" />
              <stop offset="65%" stopColor="#A3D4AF" stopOpacity="0.32" />
              <stop offset="100%" stopColor={G} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <polygon points="30,250 118,0 196,0 108,250" fill={`url(#${id("beam")})`} />
          <polygon points="150,250 238,0 274,0 186,250" fill={G} opacity={0.1} />
          <polygon points="236,250 296,88 320,88 320,250" fill="#A3D4AF" opacity={0.08} />
          <line x1={6} y1={224} x2={314} y2={26} stroke={COLORS.ink} strokeWidth={0.8} opacity={0.28} />
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
              stroke={i % 2 === 0 ? G : "#A3D4AF"}
              strokeWidth={i % 2 === 0 ? 2.2 : 1}
              opacity={0.62 - i * 0.08}
              strokeDasharray={`${40 + i * 12} ${16 + i * 8}`}
              transform={`rotate(${i * 28} 160 125)`}
            />
          ))}
          <circle cx={160} cy={125} r={7} fill={COLORS.ink} opacity={0.9} />
          <circle cx={160} cy={125} r={16} fill="none" stroke={G} strokeWidth={1} opacity={0.5} />
        </>
      ) : null}
    </svg>
  );
};
