/**
 * S02 · 1956 达特茅斯（420f · REF=600 · k=0.7）
 * 深色档案 + 黑板：暖白粉笔字「Artificial Intelligence」落拍，
 * 下方两排十人座次；所有节拍按旧版 600f 等比收紧。时代色：sepia。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

const REF = 600;
/** 慢歌重拍网格（旧版镜内）：37.7f 起，每拍 56.25f；按 k 收紧 */
const beat = (i: number, k: number): number => Math.round((37.7 + i * 56.25) * k);

const TEN = [
  "John McCarthy",
  "Marvin Minsky",
  "Claude Shannon",
  "Nathaniel Rochester",
  "Allen Newell",
  "Herbert Simon",
  "Arthur Samuel",
  "Ray Solomonoff",
  "Oliver Selfridge",
  "Trenchard More",
] as const;

const ACCENT = ERA.sepia;

export const S02 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const k = dur / REF;

  const fadeIn = prog(frame, 0, Math.max(6, Math.round(12 * k)));
  const fadeOut = prog(frame, dur - 14, 14);
  const fade = Math.min(fadeIn, 1 - fadeOut);

  const copy = Math.min(prog(frame, 130 * k, 24), 1 - fadeOut);
  const copyEn = Math.min(prog(frame, 150 * k, 24), 1 - fadeOut);

  const b0 = beat(0, k);
  const b1 = beat(1, k);
  const b2 = beat(2, k);
  const b3 = beat(3, k);
  const b4 = beat(4, k);

  return (
    <PaperStage dur={dur} tone="medium" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 粉笔粗糙滤镜 */}
        <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
          <defs>
            <filter id="s02-chalk" x="-6%" y="-18%" width="112%" height="136%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.82"
                numOctaves="2"
                seed="11"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.35"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

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
          规则时代 · 1956
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
            transform: `scaleX(${EASE.outExpo(prog(frame, 10 * k, 32))})`,
          }}
        />

        {/* ---------------- 黑板 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 172,
            width: 1640,
            height: 424,
            background: "linear-gradient(164deg, #080807 0%, #030303 66%, #070706 100%)",
            border: `8px solid ${ACCENT}`,
            borderRadius: 5,
            boxSizing: "border-box",
            boxShadow:
              "0 34px 80px rgba(0,0,0,0.58), inset 0 0 110px rgba(0,0,0,0.82)",
            overflow: "hidden",
          }}
        >
          {/* 粉笔擦痕 */}
          <div
            style={{
              position: "absolute",
              left: 60,
              top: -44,
              width: 560,
              height: 210,
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(243,240,231,0.07), rgba(243,240,231,0) 70%)",
              filter: "blur(16px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 90,
              bottom: -56,
              width: 600,
              height: 230,
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(243,240,231,0.05), rgba(243,240,231,0) 72%)",
              filter: "blur(18px)",
            }}
          />

          {/* 粉笔主标 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 92,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ChalkWord text="Artificial" start={b0} frame={frame} size={112} k={k} />
            <ChalkWord text="Intelligence" start={b1} frame={frame} size={112} k={k} />
            <div style={{ position: "relative", width: 792, height: 42, marginTop: 2 }}>
              <svg width={792} height={42} viewBox="0 0 792 42">
                <DrawPath
                  d="M 10 20 C 172 11, 520 33, 780 17"
                  start={b2}
                  dur={Math.round(30 * k)}
                  stroke={COLORS.ivory}
                  width={2.6}
                  opacity={0.62}
                  endDot={false}
                />
                <DrawPath
                  d="M 28 28 C 250 21, 556 38, 754 26"
                  start={b2 + Math.round(7 * k)}
                  dur={Math.round(32 * k)}
                  stroke={COLORS.ivory}
                  width={1.5}
                  opacity={0.3}
                  endDot={false}
                />
              </svg>
            </div>
          </div>

          {/* 粉笔槽 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 12,
              backgroundColor: "rgba(243,240,231,0.045)",
              borderTop: "1px solid rgba(243,240,231,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 116,
              bottom: 4,
              width: 132,
              height: 7,
              borderRadius: 4,
              backgroundColor: "rgba(243,240,231,0.42)",
              transform: "rotate(-1.4deg)",
            }}
          />
        </div>

        {/* ---------------- 十人座次 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 626,
            width: 1640,
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: Math.min(1, prog(frame, b3 - Math.round(12 * k), 18) * 1.5),
          }}
        >
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              letterSpacing: "0.2em",
              color: ACCENT,
            }}
          >
            THE TEN · 座次
          </span>
          <span style={{ flex: 1, height: 1, backgroundColor: "rgba(201,168,118,0.24)" }} />
        </div>

        <div
          style={{
            position: "absolute",
            left: 140,
            top: 664,
            width: 1640,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            columnGap: 30,
            rowGap: 12,
          }}
        >
          {TEN.map((name, i) => (
            <Seat
              key={name}
              name={name}
              index={i}
              frame={frame}
              start={
                b3 +
                Math.round((i % 5) * 8 * k) +
                (i < 5 ? 0 : b4 - b3)
              }
            />
          ))}
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
            1956 年夏天，十个人给这件事起了名字：人工智能。
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
            Summer 1956 — ten scientists name it: Artificial Intelligence.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：粉笔主标落拍 / 座次浮现 */}
      <Sequence from={b0} durationInFrames={70}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.62} />
      </Sequence>
      <Sequence from={b3} durationInFrames={55}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.3} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 粉笔字 */

const ChalkWord = ({
  text,
  start,
  frame,
  size,
  k,
}: {
  text: string;
  start: number;
  frame: number;
  size: number;
  k: number;
}) => {
  const p = EASE.outExpo(prog(frame, start, Math.max(12, Math.round(26 * k))));
  const op = Math.min(1, prog(frame, start, Math.max(5, Math.round(7 * k))) * 1.5);
  const dust = makeDust(text.length * 131 + start, 12);

  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 1.02 }}>
      <div
        style={{
          fontFamily: FONTS.serifLatin,
          fontWeight: 500,
          fontSize: size,
          letterSpacing: "-0.012em",
          color: "rgba(243,240,231,0.95)",
          opacity: op,
          transform: `translateY(${(1 - p) * -16}px) scale(${1 + (1 - p) * 0.055}) rotate(${
            -0.35 + (1 - p) * 0.4
          }deg)`,
          textShadow:
            "0 0 1px rgba(243,240,231,0.9), 0 0 16px rgba(243,240,231,0.15), 1px 1px 0 rgba(243,240,231,0.1)",
          filter: "url(#s02-chalk)",
        }}
      >
        {text}
      </div>
      {dust.map((d, i) => {
        const dp = prog(frame, start + 2, Math.max(10, Math.round(22 * k)));
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.r,
              height: d.r,
              borderRadius: 99,
              backgroundColor: "rgba(243,240,231,0.55)",
              opacity: (1 - dp) * d.o * (frame >= start ? 1 : 0),
              transform: `translate(${d.dx * dp}px, ${d.dy * dp - dp * 4}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

const makeDust = (seed: number, n: number) => {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, () => ({
    x: 4 + rnd() * 92,
    y: 18 + rnd() * 70,
    r: 1.4 + rnd() * 2.4,
    o: 0.25 + rnd() * 0.55,
    dx: (rnd() - 0.5) * 18,
    dy: (rnd() - 0.5) * 15,
  }));
};

/* ---------------------------------------------------------------- 座次剪影 */

const Seat = ({
  name,
  index,
  frame,
  start,
}: {
  name: string;
  index: number;
  frame: number;
  start: number;
}) => {
  const p = EASE.outExpo(prog(frame, start, 24));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 58,
        opacity: Math.min(1, p * 1.8),
        transform: `translateY(${(1 - p) * 14}px)`,
      }}
    >
      <span
        style={{
          width: 20,
          fontFamily: FONTS.mono,
          fontSize: 12,
          letterSpacing: "0.08em",
          color: ACCENT,
          opacity: 0.8,
          textAlign: "right",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <svg width={30} height={36} viewBox="0 0 30 36" style={{ flexShrink: 0 }}>
        <circle cx={15} cy={10.5} r={6.1} fill={ACCENT} opacity={0.9} />
        <path
          d="M 4.5 33.5 C 5.6 23.2, 9.5 19.2, 15 19.2 C 20.5 19.2, 24.4 23.2, 25.5 33.5 Z"
          fill={ACCENT}
          opacity={0.82}
        />
      </svg>
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 16.5,
          letterSpacing: "0.01em",
          color: COLORS.ink,
          whiteSpace: "nowrap",
          opacity: 0.92,
        }}
      >
        {name}
      </span>
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
