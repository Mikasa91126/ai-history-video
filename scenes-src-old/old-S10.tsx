/**
 * S10 · GPT 与缩放定律（107s–122s · 900f）｜注意力靛
 * GPT-1 / GPT-2 / GPT-3 三代方块逐拍长高，能力曲线同步抬升；
 * 「175B」踩在 GPT-3 落拍的同一拍上滚动落定。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { Counter } from "../comps/Counter";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const BASE = 790;

const GPT1 = 86.49;
const GPT2 = 198.99;
const GPT3 = 311.49;
const COPY = 480.24;

const BARS = [
  { name: "GPT-1", year: "2018", x: 500, w: 250, h: 150, start: GPT1 },
  { name: "GPT-2", year: "2019", x: 980, w: 285, h: 250, start: GPT2 },
  { name: "GPT-3", year: "2020", x: 1460, w: 320, h: 370, start: GPT3 },
] as const;

const CURVE = [
  { d: "M 300 720 C 400 700 440 660 500 640", start: 72, dur: 44 },
  { d: "M 500 640 C 640 596 840 570 980 540", start: 180, dur: 46 },
  { d: "M 980 540 C 1160 500 1320 460 1460 420", start: 290, dur: 48 },
  { d: "M 1460 420 C 1580 388 1660 340 1740 310", start: 330, dur: 64 },
] as const;

const DOTS = [
  { x: 500, y: 640, at: 108 },
  { x: 980, y: 540, at: 220 },
  { x: 1460, y: 420, at: 332 },
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
        stroke={ERA.indigo}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M18 38 H46" stroke={ERA.indigo} strokeWidth={1} strokeOpacity={0.3} strokeDasharray="2 4" />
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
  const ghostIn = EASE.outExpo(prog(frame, 16 + index * 7, 24));
  const top = BASE - bar.h;
  return (
    <>
      {/* 蓝图虚线：预告三代模型的最终体量，随实体长高而隐去 */}
      <div
        style={{
          position: "absolute",
          left: bar.x - bar.w / 2,
          top,
          width: bar.w,
          height: bar.h,
          border: "1px dashed rgba(70,91,130,0.36)",
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
            backgroundColor: "rgba(70,91,130,0.10)",
            border: `1px solid rgba(20,20,19,0.20)`,
            borderRadius: "3px 3px 0 0",
            overflow: "hidden",
            boxShadow: "0 16px 34px rgba(31,30,29,0.06)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 6,
              backgroundColor: ERA.indigo,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 6,
              backgroundImage:
                "repeating-linear-gradient(to top, rgba(20,20,19,0.055) 0 1px, transparent 1px 26px)",
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
              color: "rgba(20,20,19,0.36)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      ) : null}

      {/* 名称 */}
      <div
        style={{
          position: "absolute",
          left: bar.x - bar.w / 2,
          top: top - 58,
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
            fontSize: 40,
            letterSpacing: "0.01em",
            color: COLORS.ink,
          }}
        >
          {bar.name}
        </span>
      </div>

      {/* 年份轴 */}
      <div
        style={{
          position: "absolute",
          left: bar.x - 90,
          top: BASE + 18,
          width: 180,
          textAlign: "center",
          fontFamily: FONTS.mono,
          fontSize: 20,
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

export const S10 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const fade = Math.min(prog(frame, 0, 10), 1 - prog(frame, dur - 14, 14));

  const numberIn = EASE.outExpo(prog(frame, GPT3, 26));
  const copyIn = EASE.outExpo(prog(frame, COPY, 32));
  const connector = EASE.draw(prog(frame, GPT3 + 16, 34));

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          缩放定律 · 2018–2020
        </div>

        {/* 坐标轴 */}
        <div
          style={{
            position: "absolute",
            left: 200,
            top: BASE,
            width: 1580,
            height: 1,
            backgroundColor: "rgba(20,20,19,0.22)",
          }}
        />
        {[320, 440, 560, 680].map((y) => (
          <div
            key={y}
            style={{
              position: "absolute",
              left: 230,
              top: y,
              width: 1550,
              height: 1,
              backgroundColor: "rgba(20,20,19,0.05)",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 186,
            top: 520,
            transform: "rotate(-90deg)",
            transformOrigin: "0% 50%",
            fontFamily: FONTS.mono,
            fontSize: 16,
            letterSpacing: "0.24em",
            color: COLORS.grey,
            opacity: 0.55,
            whiteSpace: "nowrap",
          }}
        >
          CAPABILITY
        </div>
        <div
          style={{
            position: "absolute",
            left: 1630,
            top: BASE + 24,
            fontFamily: FONTS.mono,
            fontSize: 16,
            letterSpacing: "0.24em",
            color: COLORS.grey,
            opacity: 0.5,
          }}
        >
          TIME →
        </div>

        {/* 三代模型方块 */}
        {BARS.map((bar, i) => (
          <Bar key={bar.name} bar={bar} index={i} frame={frame} />
        ))}

        {/* 能力曲线（与方块同拍生长） */}
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
              stroke={ERA.indigo}
              width={3}
              opacity={0.9}
              endDot={false}
            />
          ))}
          {DOTS.map((dot) => {
            const p = EASE.outExpo(prog(frame, dot.at, 16));
            if (p <= 0) return null;
            return (
              <g key={`${dot.x}-${dot.y}`}>
                <circle cx={dot.x} cy={dot.y} r={18 * p} fill={ERA.indigo} opacity={0.12 * p} />
                <circle cx={dot.x} cy={dot.y} r={6.5 * p} fill={ERA.indigo} />
                <circle cx={dot.x} cy={dot.y} r={2.4 * p} fill={COLORS.paperWhite} />
              </g>
            );
          })}
          {/* 曲线继续上扬的端点 */}
          {frame >= 390 ? (
            <circle
              cx={1740}
              cy={310}
              r={4.5 * EASE.outExpo(prog(frame, 390, 18))}
              fill={ERA.indigo}
              opacity={0.65}
            />
          ) : null}
        </svg>

        {/* 175B 落拍 */}
        <div
          style={{
            position: "absolute",
            left: 1460 - 200,
            top: 138,
            width: 400,
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
              opacity: 0.75,
            }}
          >
            GPT-3 · 参数 / PARAMETERS
          </div>
          <div style={{ marginTop: 8 }}>
            <Counter
              from={0}
              to={175}
              start={GPT3}
              dur={84}
              suffix="B"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 132,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: ERA.indigo,
                fontVariantNumeric: "tabular-nums",
              }}
            />
          </div>
        </div>

        {/* 175B → GPT-3 方块连线 */}
        <div
          style={{
            position: "absolute",
            left: 1600,
            top: 302,
            width: 2,
            height: 118,
            backgroundColor: ERA.indigo,
            opacity: 0.38 * connector,
            transform: `scaleY(${connector})`,
            transformOrigin: "50% 0%",
          }}
        />

        {/* 主文案 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 66,
            width: 1280,
            opacity: copyIn,
            transform: `translateY(${(1 - copyIn) * 22}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 35, lineHeight: 1.64 }}>
            2018–2020，模型越大，越像「懂」了——缩放定律写下预言。
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
            Bigger models, smarter curves — the scaling law makes a promise.
          </div>
        </div>

        <LandPiece frame={frame} dur={dur} />
      </AbsoluteFill>

      <Sequence from={Math.round(GPT1)} durationInFrames={50}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={Math.round(GPT2)} durationInFrames={50}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={Math.round(GPT3)} durationInFrames={60}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.7} />
      </Sequence>
    </PaperStage>
  );
};
