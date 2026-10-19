/**
 * S02 · 1956 达特茅斯（14.5s–24.5s · 600f）
 * 档案纸 + 黑板：粉笔字「Artificial Intelligence」落重拍（37.7f 起每 56.25f 一拍），
 * 下方两排十人座次剪影。时代色：sepia。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

/** 慢歌重拍网格（镜内）：37.7f 起，每拍 56.25f */
const B = (i: number): number => Math.round(37.7 + i * 56.25);

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

export const S02 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fadeIn = prog(frame, 0, 12);
  const fadeOut = prog(frame, dur - 14, 14);
  const fade = Math.min(fadeIn, 1 - fadeOut);

  const copy = Math.min(prog(frame, 130, 26), 1 - fadeOut);
  const copyEn = Math.min(prog(frame, 150, 26), 1 - fadeOut);

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
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          规则时代 · 1956 ｜ THE RULE ERA
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 136,
            width: 300,
            height: 1,
            backgroundColor: ERA.sepia,
            opacity: 0.36,
            transformOrigin: "left center",
            transform: `scaleX(${EASE.outExpo(prog(frame, 10, 40))})`,
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
            backgroundColor: COLORS.ink,
            border: `10px solid ${ERA.sepia}`,
            borderRadius: 5,
            boxSizing: "border-box",
            boxShadow:
              "0 34px 80px rgba(20,20,19,0.20), inset 0 0 110px rgba(0,0,0,0.42)",
            overflow: "hidden",
          }}
        >
          {/* 粉笔擦痕（低对比） */}
          <div
            style={{
              position: "absolute",
              left: 60,
              top: -40,
              width: 520,
              height: 190,
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(250,249,245,0.07), rgba(250,249,245,0) 70%)",
              filter: "blur(12px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 80,
              bottom: -50,
              width: 560,
              height: 210,
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(250,249,245,0.05), rgba(250,249,245,0) 70%)",
              filter: "blur(16px)",
            }}
          />

          {/* 黑板小标 */}
          <div
            style={{
              position: "absolute",
              left: 58,
              top: 38,
              fontFamily: FONTS.mono,
              fontSize: 18,
              letterSpacing: "0.22em",
              color: "rgba(250,249,245,0.48)",
              opacity: prog(frame, 20, 30),
            }}
          >
            DARTMOUTH COLLEGE · SUMMER 1956
          </div>

          {/* 粉笔主标 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 96,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ChalkWord text="Artificial" start={B(0)} frame={frame} size={112} />
            <ChalkWord text="Intelligence" start={B(1)} frame={frame} size={112} />
            <div style={{ position: "relative", width: 780, height: 42, marginTop: 2 }}>
              <svg width={780} height={42} viewBox="0 0 780 42">
                <DrawPath
                  d="M 10 20 C 168 11, 512 33, 768 17"
                  start={B(2)}
                  dur={36}
                  stroke={COLORS.paperWhite}
                  width={2.6}
                  opacity={0.65}
                  endDot={false}
                />
                <DrawPath
                  d="M 28 28 C 246 21, 548 38, 742 26"
                  start={B(2) + 10}
                  dur={40}
                  stroke={COLORS.paperWhite}
                  width={1.5}
                  opacity={0.32}
                  endDot={false}
                />
              </svg>
            </div>
          </div>

          {/* 左下 chalk 公式 */}
          <div
            style={{
              position: "absolute",
              left: 56,
              bottom: 30,
              fontFamily: FONTS.serifLatin,
              fontSize: 24,
              letterSpacing: "0.06em",
              color: "rgba(250,249,245,0.42)",
              opacity: prog(frame, B(2) + 22, 26),
              fontStyle: "italic",
            }}
          >
            Σ w·x &gt; θ
          </div>

          {/* 右下 chalk 年份 */}
          <div
            style={{
              position: "absolute",
              right: 60,
              bottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: prog(frame, B(2) + 14, 22) * 0.8,
            }}
          >
            <span
              style={{
                width: 26,
                height: 1,
                backgroundColor: "rgba(250,249,245,0.5)",
              }}
            />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 24,
                letterSpacing: "0.2em",
                color: "rgba(250,249,245,0.7)",
              }}
            >
              1956
            </span>
          </div>

          {/* 粉笔槽 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 12,
              backgroundColor: "rgba(250,249,245,0.055)",
              borderTop: "1px solid rgba(250,249,245,0.09)",
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
              backgroundColor: "rgba(250,249,245,0.55)",
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
            opacity: prog(frame, B(3) - 12, 22),
          }}
        >
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 17,
              letterSpacing: "0.2em",
              color: ERA.sepia,
            }}
          >
            THE TEN · 座次
          </span>
          <span style={{ flex: 1, height: 1, backgroundColor: "rgba(138,106,69,0.3)" }} />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 14,
              letterSpacing: "0.16em",
              color: COLORS.grey,
              opacity: 0.7,
            }}
          >
            DARTMOUTH, SUMMER 1956
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            left: 140,
            top: 664,
            width: 1640,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            columnGap: 34,
            rowGap: 14,
          }}
        >
          {TEN.map((name, i) => (
            <Seat
              key={name}
              name={name}
              index={i}
              frame={frame}
              start={B(3) + (i % 5) * 11 + (i < 5 ? 0 : B(4) - B(3))}
            />
          ))}
        </div>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 96,
            maxWidth: 1570,
            borderLeft: `3px solid ${ERA.sepia}`,
            paddingLeft: 26,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 40, lineHeight: 1.5 }}>
            1956 年夏天，十个人给这件事起了名字：人工智能。
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
            Summer 1956 — ten scientists name it: Artificial Intelligence.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：粉笔落重拍 / 座次浮现 */}
      <Sequence from={B(0)} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.72} />
      </Sequence>
      <Sequence from={B(1)} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.58} />
      </Sequence>
      <Sequence from={B(2)} durationInFrames={70}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={B(3)} durationInFrames={60}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.34} />
      </Sequence>
      <Sequence from={B(4)} durationInFrames={60}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.28} />
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
}: {
  text: string;
  start: number;
  frame: number;
  size: number;
}) => {
  const p = EASE.outExpo(prog(frame, start, 26));
  const op = Math.min(1, prog(frame, start, 7) * 1.5);
  const dust = makeDust(text.length * 131 + start, 13);

  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 1.02 }}>
      <div
        style={{
          fontFamily: FONTS.serifLatin,
          fontWeight: 500,
          fontSize: size,
          letterSpacing: "-0.012em",
          color: "rgba(250,249,245,0.94)",
          opacity: op,
          transform: `translateY(${(1 - p) * -16}px) scale(${1 + (1 - p) * 0.055}) rotate(${-0.35 + (1 - p) * 0.4}deg)`,
          textShadow:
            "0 0 1px rgba(250,249,245,0.9), 0 0 14px rgba(250,249,245,0.16), 1px 1px 0 rgba(250,249,245,0.10)",
          filter: "url(#s02-chalk)",
        }}
      >
        {text}
      </div>
      {dust.map((d, i) => {
        const dp = prog(frame, start + 2, 22);
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
              backgroundColor: "rgba(250,249,245,0.6)",
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
  const p = EASE.outExpo(prog(frame, start, 28));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
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
          color: ERA.sepia,
          opacity: 0.8,
          textAlign: "right",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <svg width={30} height={36} viewBox="0 0 30 36" style={{ flexShrink: 0 }}>
        <circle cx={15} cy={10.5} r={6.1} fill={ERA.sepia} opacity={0.9} />
        <path
          d="M 4.5 33.5 C 5.6 23.2, 9.5 19.2, 15 19.2 C 20.5 19.2, 24.4 23.2, 25.5 33.5 Z"
          fill={ERA.sepia}
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
