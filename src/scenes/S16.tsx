/**
 * S16 · 2020 GPT-3 与缩放定律（114s–122s · 480f）｜注意力靛
 * 三代模型方块按 37.7f 起每 56.25f 一拍长高，能力曲线同步抬升；
 * 175B 在第四拍滚动落定，右侧缩放定律曲线随后画出「更大，更聪明」的预言。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { Counter } from "../comps/Counter";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const IND = ERA.indigo;
const BEAT = 56.25;
const T0 = 37.7;
const GPT2_AT = T0 + BEAT; // 93.95
const GPT3_AT = T0 + BEAT * 2; // 150.20
const NUM_AT = T0 + BEAT * 3; // 206.45
const SCALE_AT = T0 + BEAT * 4; // 262.70
const COPY_AT = T0 + BEAT * 5; // 318.95
const BASE = 760;

const BARS = [
  { name: "GPT-1", year: "2018", x: 380, w: 170, h: 140, start: T0 },
  { name: "GPT-2", year: "2019", x: 650, w: 200, h: 240, start: GPT2_AT },
  { name: "GPT-3", year: "2020", x: 940, w: 240, h: 360, start: GPT3_AT },
] as const;

const CURVE = [
  { d: "M 250 682 C 300 658 335 640 380 620", start: T0 - 20, dur: 30 },
  { d: "M 380 620 C 475 585 555 552 650 520", start: GPT2_AT, dur: 34 },
  { d: "M 650 520 C 760 480 855 440 940 400", start: GPT3_AT, dur: 34 },
  { d: "M 940 400 C 1010 370 1060 345 1110 326", start: NUM_AT, dur: 34 },
] as const;

const DOTS = [
  { x: 380, y: 620, at: T0 + 12 },
  { x: 650, y: 520, at: GPT2_AT + 12 },
  { x: 940, y: 400, at: GPT3_AT + 12 },
] as const;

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
        stroke={IND}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M18 38 H46" stroke={IND} strokeWidth={1} strokeOpacity={0.3} strokeDasharray="2 4" />
    </svg>
  );
};

const Bar = ({
  bar,
  index,
  frame,
}: {
  bar: (typeof BARS)[number];
  index: number;
  frame: number;
}) => {
  const p = EASE.outExpo(prog(frame, bar.start, 30));
  const ghostIn = EASE.outExpo(prog(frame, 14 + index * 7, 24));
  const top = BASE - bar.h;
  return (
    <>
      {/* 蓝图虚线：预告最终体量，随实体长高而隐去 */}
      <div
        style={{
          position: "absolute",
          left: bar.x - bar.w / 2,
          top,
          width: bar.w,
          height: bar.h,
          border: "1px dashed rgba(143,166,217,0.28)",
          borderRadius: "3px 3px 0 0",
          opacity: ghostIn * (1 - p),
        }}
      />
      {p > 0 ? (
        <div
          style={{
            position: "absolute",
            left: bar.x - bar.w / 2,
            top,
            width: bar.w,
            height: bar.h,
            transform: `scaleY(${p})`,
            transformOrigin: "50% 100%",
            backgroundColor: "rgba(143,166,217,0.10)",
            border: "1px solid rgba(143,166,217,0.42)",
            borderRadius: "3px 3px 0 0",
            overflow: "hidden",
            boxShadow: "0 16px 34px rgba(0,0,0,0.18)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 6,
              backgroundColor: IND,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 6,
              backgroundImage:
                "repeating-linear-gradient(to top, rgba(243,240,231,0.06) 0 1px, transparent 1px 26px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 16,
              bottom: 12,
              fontFamily: FONTS.mono,
              fontSize: 15,
              letterSpacing: "0.2em",
              color: "rgba(243,240,231,0.42)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: bar.x - bar.w / 2,
          top: top - 54,
          width: bar.w,
          textAlign: "center",
          opacity: p,
          transform: `translateY(${(1 - p) * 12}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.serifLatin,
            fontWeight: 500,
            fontSize: 38,
            letterSpacing: "0.01em",
            color: COLORS.ink,
          }}
        >
          {bar.name}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: bar.x - 90,
          top: BASE + 20,
          width: 180,
          textAlign: "center",
          fontFamily: FONTS.mono,
          fontSize: 19,
          letterSpacing: "0.18em",
          color: COLORS.grey,
          opacity: 0.45 + 0.45 * p,
        }}
      >
        {bar.year}
      </div>
    </>
  );
};

export const S16 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const fade = prog(frame, 0, 7);

  const numberIn = EASE.outExpo(prog(frame, NUM_AT, 26));
  const copyIn = EASE.outExpo(prog(frame, COPY_AT, 32));
  const scaleIn = EASE.outExpo(prog(frame, SCALE_AT, 26));
  const predictIn = EASE.outExpo(prog(frame, SCALE_AT + 92, 24));

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          缩放定律 · 2018–2020
        </div>

        {/* ---------------- 三代模型方块 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 230,
            top: BASE,
            width: 900,
            height: 1,
            backgroundColor: "rgba(243,240,231,0.22)",
          }}
        />
        {[300, 420, 540, 660].map((y) => (
          <div
            key={y}
            style={{
              position: "absolute",
              left: 260,
              top: y,
              width: 870,
              height: 1,
              backgroundColor: "rgba(243,240,231,0.055)",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 195,
            top: 480,
            transform: "rotate(-90deg)",
            transformOrigin: "0% 50%",
            fontFamily: FONTS.mono,
            fontSize: 15,
            letterSpacing: "0.24em",
            color: COLORS.grey,
            opacity: 0.6,
            whiteSpace: "nowrap",
          }}
        >
          CAPABILITY
        </div>
        <div
          style={{
            position: "absolute",
            left: 1010,
            top: BASE + 22,
            fontFamily: FONTS.mono,
            fontSize: 15,
            letterSpacing: "0.24em",
            color: COLORS.grey,
            opacity: 0.55,
          }}
        >
          TIME →
        </div>

        {BARS.map((bar, i) => (
          <Bar key={bar.name} bar={bar} index={i} frame={frame} />
        ))}

        {/* 能力曲线 */}
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {CURVE.map((s, i) => (
            <DrawPath
              key={i}
              d={s.d}
              start={s.start}
              dur={s.dur}
              stroke={IND}
              width={3}
              opacity={0.92}
              endDot={false}
            />
          ))}
          {DOTS.map((dot) => {
            const p = EASE.outExpo(prog(frame, dot.at, 16));
            if (p <= 0) return null;
            return (
              <g key={`${dot.x}-${dot.y}`}>
                <circle cx={dot.x} cy={dot.y} r={18 * p} fill={IND} opacity={0.13 * p} />
                <circle cx={dot.x} cy={dot.y} r={6.5 * p} fill={IND} />
                <circle cx={dot.x} cy={dot.y} r={2.4 * p} fill={COLORS.paperWhite} />
              </g>
            );
          })}
          {(() => {
            const p = EASE.outExpo(prog(frame, NUM_AT + 34, 16));
            if (p <= 0) return null;
            return (
              <g>
                <circle cx={1110} cy={326} r={14 * p} fill={IND} opacity={0.12 * p} />
                <circle cx={1110} cy={326} r={4.5 * p} fill="none" stroke={IND} strokeWidth={1.8} />
              </g>
            );
          })()}
        </svg>

        {/* 175B 落拍 */}
        <div
          style={{
            position: "absolute",
            left: 680,
            top: 112,
            width: 480,
            textAlign: "center",
            opacity: numberIn,
            transform: `translateY(${(1 - numberIn) * 18}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              letterSpacing: "0.22em",
              color: COLORS.grey,
              opacity: 0.8,
            }}
          >
            GPT-3 · 参数 / PARAMETERS
          </div>
          <div style={{ marginTop: 8 }}>
            <Counter
              from={0}
              to={175}
              start={NUM_AT}
              dur={84}
              suffix="B"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 128,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: IND,
                fontVariantNumeric: "tabular-nums",
              }}
            />
          </div>
        </div>

        {/* ---------------- 右：缩放定律曲线 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 1190,
            top: 140,
            width: 590,
            height: 600,
            opacity: scaleIn,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 14,
              fontFamily: FONTS.mono,
              fontSize: 17,
              letterSpacing: "0.2em",
              color: COLORS.grey,
              opacity: 0.85,
            }}
          >
            缩放定律 / SCALING LAW
          </div>

          <svg width={590} height={600} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {/* 对数感网格 */}
            {[120, 240, 360, 480, 580].map((y) => (
              <line
                key={`h-${y}`}
                x1={50}
                y1={y}
                x2={560}
                y2={y}
                stroke="rgba(243,240,231,0.065)"
                strokeWidth={1}
              />
            ))}
            {[50, 180, 310, 440, 560].map((x) => (
              <line
                key={`v-${x}`}
                x1={x}
                y1={100}
                x2={x}
                y2={580}
                stroke="rgba(243,240,231,0.045)"
                strokeWidth={1}
              />
            ))}

            {/* 实线：已知的缩放 */}
            <DrawPath
              d="M 50 560 C 150 540 230 460 300 370 C 370 280 450 200 520 160"
              start={SCALE_AT}
              dur={92}
              stroke={IND}
              width={3}
              opacity={0.9}
              endDot={false}
            />

            {/* 虚线：向更远处的预言 */}
            <path
              d="M 520 160 C 545 140 560 125 575 112"
              fill="none"
              stroke={IND}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeDasharray="5 8"
              opacity={0.55 * predictIn}
            />
            {predictIn > 0 ? (
              <g opacity={predictIn}>
                <circle cx={575} cy={112} r={10} fill={IND} opacity={0.12} />
                <circle
                  cx={575}
                  cy={112}
                  r={4.5}
                  fill="none"
                  stroke={IND}
                  strokeWidth={1.8}
                />
              </g>
            ) : null}

            {/* 轴标 */}
            <text
              x={560}
              y={596}
              textAnchor="end"
              fontFamily={FONTS.mono}
              fontSize={13}
              letterSpacing="0.2em"
              fill={COLORS.grey}
              opacity={0.62}
            >
              规模 / SCALE →
            </text>
            <text
              x={16}
              y={112}
              fontFamily={FONTS.mono}
              fontSize={13}
              letterSpacing="0.16em"
              fill={COLORS.grey}
              opacity={0.62}
            >
              能力 ↑
            </text>
          </svg>
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
          <div style={{ ...TYPE.body, fontSize: 35, lineHeight: 1.62 }}>
            2020，GPT-3：1750 亿参数——缩放定律写下预言：更大，更聪明。
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
            2020: 175B parameters — the scaling law makes a promise.
          </div>
        </div>
      </AbsoluteFill>

      <Sequence from={Math.round(T0)} durationInFrames={60}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.66} />
      </Sequence>
      <Sequence from={Math.round(NUM_AT)} durationInFrames={60}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.72} />
      </Sequence>
    </PaperStage>
  );
};
