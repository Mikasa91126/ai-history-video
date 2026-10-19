/**
 * S03 · 感知机与 ELIZA（24.5s–35s · 630f）
 * 左：1958 感知机手绘电路图（输入 → 加权和 → 阈值 → 输出）；
 * 右：1966 ELIZA 对话纸带，「HELLO, I AM ELIZA」逐字打印。时代色：sepia。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const B = (i: number): number => Math.round(37.7 + i * 56.25);
const TAPE = Math.round(262.7);
const TYPE_START = TAPE + 62;
const SECOND_START = 472;

/** 每拍一次的柔和脉冲（输出节点 / 对话光标） */
const pulse = (frame: number, start: number, interval = 56.25): number => {
  if (frame < start) return 0;
  const local = (frame - start) % interval;
  return Math.exp(-local / 11);
};

export const S03 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = Math.min(prog(frame, 0, 12), 1 - prog(frame, dur - 14, 14));
  const copy = Math.min(prog(frame, 146, 26), 1 - prog(frame, dur - 14, 14));
  const copyEn = Math.min(prog(frame, 166, 26), 1 - prog(frame, dur - 14, 14));

  const glow = pulse(frame, 160) * (1 - prog(frame, dur - 20, 20) * 0.5);

  return (
    <PaperStage dur={dur} tone="medium" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 手绘粗糙滤镜 */}
        <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
          <defs>
            <filter id="s03-rough" x="-8%" y="-12%" width="116%" height="124%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.024"
                numOctaves="2"
                seed="19"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2.1"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* 章节标签 */}
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          规则时代 · 1958–1966 ｜ THE RULE ERA
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

        {/* ---------------- 面板标题 ---------------- */}
        <PanelTitle x={140} top={190} no="01" title="PERCEPTRON" year="1958" frame={frame} start={16} />
        <div
          style={{
            position: "absolute",
            left: 950,
            top: 210,
            width: 1,
            height: 500,
            backgroundColor: ERA.sepia,
            opacity: prog(frame, 90, 30) * 0.18,
          }}
        />
        <PanelTitle x={980} top={190} no="02" title="ELIZA" year="1966" frame={frame} start={TAPE - 34} />

        {/* ---------------- 左：感知机电路 ---------------- */}
        <div style={{ position: "absolute", left: 140, top: 240, width: 780, height: 440 }}>
          {/* 输出节点辉光 */}
          <div
            style={{
              position: "absolute",
              left: 710 - 90,
              top: 200 - 90,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${ERA.sepia} 0%, rgba(138,106,69,0) 66%)`,
              opacity: (0.1 + glow * 0.45) * prog(frame, 150, 26),
              filter: "blur(6px)",
              pointerEvents: "none",
            }}
          />
          <svg width={780} height={440} viewBox="0 0 780 440">
            {/* 蓝图底稿（静态淡线，保证入场即有结构） */}
            <g opacity={0.14 * prog(frame, 0, 18)} stroke={COLORS.ink} strokeWidth={1.2} fill="none">
              <path d="M 118 100 L 382 174" />
              <path d="M 118 200 L 372 200" />
              <path d="M 118 300 L 382 226" />
              <path d="M 468 200 L 550 200" />
              <path d="M 626 200 L 680 200" />
              <circle cx={90} cy={100} r={28} />
              <circle cx={90} cy={200} r={28} />
              <circle cx={90} cy={300} r={28} />
              <circle cx={420} cy={200} r={48} />
              <circle cx={590} cy={200} r={36} />
              <circle cx={710} cy={200} r={26} />
            </g>
            <g filter="url(#s03-rough)">
              {/* 输入 → 加权和 */}
              <DrawPath d="M 118 100 L 382 174" start={30} dur={50} stroke={COLORS.ink} width={2.2} opacity={0.8} endDot={false} />
              <DrawPath d="M 118 200 L 372 200" start={42} dur={50} stroke={COLORS.ink} width={2.2} opacity={0.8} endDot={false} />
              <DrawPath d="M 118 300 L 382 226" start={54} dur={50} stroke={COLORS.ink} width={2.2} opacity={0.8} endDot={false} />

              {/* 加权和 → 阈值 → 输出 */}
              <DrawPath d="M 468 200 L 550 200" start={126} dur={30} stroke={COLORS.ink} width={2.2} opacity={0.8} endDot={false} />
              <DrawPath d="M 626 200 L 680 200" start={154} dur={26} stroke={COLORS.ink} width={2.2} opacity={0.8} endDot={false} />

              {/* 箭头 */}
              <polygon points="548,194 562,200 548,206" fill={COLORS.ink} opacity={prog(frame, 154, 14) * 0.8} />
              <polygon points="678,194 692,200 678,206" fill={COLORS.ink} opacity={prog(frame, 180, 14) * 0.8} />

              {/* 手绘辅助线 */}
              <path
                d="M 372 200 L 384 198"
                stroke={ERA.sepia}
                strokeWidth={1.4}
                opacity={prog(frame, 118, 12) * 0.3}
                fill="none"
              />
              <path
                d="M 42 354 C 64 366, 116 366, 138 354"
                stroke={ERA.sepia}
                strokeWidth={1.2}
                opacity={prog(frame, 190, 20) * 0.3}
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* 输入节点 */}
            {[
              { x: 90, y: 100, label: "x1" },
              { x: 90, y: 200, label: "x2" },
              { x: 90, y: 300, label: "x3" },
            ].map((n, i) => {
              const p = prog(frame, 18 + i * 12, 24);
              return (
                <g key={n.label} opacity={p}>
                  <circle cx={n.x} cy={n.y} r={28} fill={COLORS.paperWhite} stroke={COLORS.ink} strokeWidth={2} />
                  <circle cx={n.x + 1.4} cy={n.y - 1.2} r={28} fill="none" stroke={ERA.sepia} strokeWidth={0.9} opacity={0.45} />
                  <text x={n.x} y={n.y + 7} textAnchor="middle" fontFamily={FONTS.mono} fontSize={21} fill={COLORS.ink}>
                    {n.label}
                  </text>
                </g>
              );
            })}

            {/* 权重标注 */}
            {[
              { x: 236, y: 118, label: "w1 = +0.8" },
              { x: 228, y: 238, label: "w2 = −0.4" },
              { x: 242, y: 325, label: "w3 = +0.9" },
            ].map((w, i) => (
              <text
                key={w.label}
                x={w.x}
                y={w.y}
                fontFamily={FONTS.mono}
                fontSize={15.5}
                fill={ERA.sepia}
                letterSpacing="0.06em"
                opacity={prog(frame, 86 + i * 12, 20) * 0.9}
              >
                {w.label}
              </text>
            ))}

            {/* 求和节点 */}
            <g opacity={prog(frame, 102, 26)}>
              <circle cx={420} cy={200} r={48} fill={COLORS.paper} stroke={COLORS.ink} strokeWidth={2} />
              <circle cx={421} cy={199} r={48} fill="none" stroke={ERA.sepia} strokeWidth={1} opacity={0.4} />
              <text x={420} y={214} textAnchor="middle" fontFamily={FONTS.serifLatin} fontSize={44} fill={COLORS.ink}>
                Σ
              </text>
            </g>

            {/* 阈值节点 */}
            <g opacity={prog(frame, 130, 26)}>
              <circle cx={590} cy={200} r={36} fill={COLORS.paperWhite} stroke={COLORS.ink} strokeWidth={2} />
              <circle cx={591} cy={199} r={36} fill="none" stroke={ERA.sepia} strokeWidth={0.9} opacity={0.4} />
              <text x={590} y={213} textAnchor="middle" fontFamily={FONTS.serifLatin} fontSize={35} fill={COLORS.ink}>
                θ
              </text>
            </g>

            {/* 输出节点 */}
            <g opacity={prog(frame, 160, 26)}>
              <circle cx={710} cy={200} r={26} fill={ERA.sepia} fillOpacity={0.15} stroke={ERA.sepia} strokeWidth={2.4} />
              <text x={710} y={208} textAnchor="middle" fontFamily={FONTS.mono} fontSize={19} fill={COLORS.ink}>
                y
              </text>
            </g>

            {/* 版式注 */}
            <text
              x={772}
              y={38}
              textAnchor="end"
              fontFamily={FONTS.mono}
              fontSize={15}
              fill={COLORS.grey}
              letterSpacing="0.04em"
              opacity={prog(frame, 100, 22) * 0.75}
            >
              y = 1 if Σw·x &gt; θ
            </text>

            {/* 底部注 */}
            <g fontFamily={FONTS.mono} fontSize={13} letterSpacing="0.14em" fill={COLORS.grey}>
              <text x={90} y={372} textAnchor="middle" opacity={prog(frame, 48, 20) * 0.75}>
                INPUTS
              </text>
              <text x={420} y={278} textAnchor="middle" opacity={prog(frame, 118, 20) * 0.75}>
                WEIGHTED SUM
              </text>
              <text x={590} y={258} textAnchor="middle" opacity={prog(frame, 146, 20) * 0.75}>
                THRESHOLD
              </text>
              <text x={710} y={244} textAnchor="middle" opacity={prog(frame, 180, 20) * 0.75}>
                OUT
              </text>
            </g>
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            left: 140,
            top: 712,
            fontFamily: FONTS.mono,
            fontSize: 17,
            letterSpacing: "0.08em",
            color: ERA.sepia,
            opacity: prog(frame, 238, 26) * 0.9,
          }}
        >
          Δw = η · (y − ŷ) · x
          <span style={{ marginLeft: 22, color: COLORS.grey, opacity: 0.7, letterSpacing: "0.16em" }}>
            A NEURON THAT LEARNS
          </span>
        </div>

        {/* ---------------- 右：ELIZA 纸带 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 980,
            top: 258,
            width: 760,
            height: 390,
            perspective: 1600,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: COLORS.paperWhite,
              border: `1px solid ${COLORS.line}`,
              boxShadow: "0 26px 60px rgba(31,30,29,0.12)",
              transformOrigin: "50% 50%",
              transform: `translateY(${(1 - EASE.outExpo(prog(frame, TAPE, 38))) * 56}px) rotate(${
                -3.2 + EASE.outExpo(prog(frame, TAPE, 38)) * 1.6
              }deg)`,
              opacity: Math.min(1, prog(frame, TAPE, 12) * 1.5),
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 纸带穿孔 */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 40,
                backgroundImage: `radial-gradient(circle, rgba(138,106,69,0.34) 3.2px, rgba(138,106,69,0) 3.8px)`,
                backgroundSize: "40px 30px",
                backgroundPosition: "center 8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 40,
                backgroundImage: `radial-gradient(circle, rgba(138,106,69,0.34) 3.2px, rgba(138,106,69,0) 3.8px)`,
                backgroundSize: "40px 30px",
                backgroundPosition: "center 8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 40,
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: ERA.sepia,
                opacity: 0.16,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 40,
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: ERA.sepia,
                opacity: 0.16,
              }}
            />

            <div style={{ position: "absolute", left: 72, right: 72, top: 34 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  fontFamily: FONTS.mono,
                  fontSize: 15,
                  letterSpacing: "0.16em",
                  color: COLORS.grey,
                }}
              >
                <span>ELIZA · MIT · 1966</span>
                <span style={{ opacity: 0.7 }}>TELETYPE / SESSION 001</span>
              </div>
              <div style={{ height: 1, backgroundColor: COLORS.line, marginTop: 14 }} />

              <div style={{ marginTop: 54, display: "flex", alignItems: "flex-start", gap: 16 }}>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 22,
                    letterSpacing: "0.1em",
                    color: ERA.sepia,
                    lineHeight: "44px",
                  }}
                >
                  ELIZA
                </span>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 22,
                    color: COLORS.grey,
                    lineHeight: "44px",
                  }}
                >
                  &gt;
                </span>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 33,
                    letterSpacing: "0.045em",
                    color: COLORS.ink,
                    lineHeight: "44px",
                    whiteSpace: "pre",
                  }}
                >
                  <Typed
                    text="HELLO, I AM ELIZA"
                    start={TYPE_START}
                    cps={11}
                    frame={frame}
                    caret={frame < SECOND_START - 8}
                  />
                </span>
              </div>

              <div
                style={{
                  marginTop: 26,
                  marginLeft: 99,
                  fontFamily: FONTS.mono,
                  fontSize: 18.5,
                  lineHeight: 1.65,
                  letterSpacing: "0.03em",
                  color: COLORS.graphite,
                  opacity: prog(frame, SECOND_START, 22) * 0.82,
                }}
              >
                <Typed
                  text="HOW DO YOU DO. PLEASE TELL ME YOUR PROBLEM."
                  start={SECOND_START}
                  cps={27}
                  frame={frame}
                  caret
                  caretColor={ERA.sepia}
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  left: 99,
                  top: 246,
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  letterSpacing: "0.16em",
                  color: COLORS.grey,
                  opacity: prog(frame, 520, 24) * 0.65,
                }}
              >
                SCRIPTED DIALOGUE · PATTERN MATCHING
              </div>
            </div>
          </div>
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
            会学习的神经元，和第一场「对话」——机器第一次像人。
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
            A neuron that learns, and the first chatbot — the machine begins to feel human.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：输出点亮 / 纸带 / 打字机 / 第二行 */}
      <Sequence from={166} durationInFrames={60}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.36} />
      </Sequence>
      <Sequence from={TAPE} durationInFrames={70}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.46} />
      </Sequence>
      <Sequence from={TYPE_START - 4} durationInFrames={110}>
        <Audio src={staticFile("sfx/key-type.wav")} volume={0.52} />
      </Sequence>
      <Sequence from={SECOND_START} durationInFrames={50}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.22} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 面板标题 */

const PanelTitle = ({
  x,
  top,
  no,
  title,
  year,
  frame,
  start,
}: {
  x: number;
  top: number;
  no: string;
  title: string;
  year: string;
  frame: number;
  start: number;
}) => {
  const p = prog(frame, start, 26);
  return (
    <div style={{ position: "absolute", left: x, top, opacity: p }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: "0.18em", color: ERA.sepia }}>
          {no}
        </span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 22, letterSpacing: "0.18em", color: COLORS.ink }}>
          {title}
        </span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 15, letterSpacing: "0.12em", color: COLORS.grey }}>
          · {year}
        </span>
      </div>
      <div
        style={{
          width: 300,
          height: 1,
          backgroundColor: ERA.sepia,
          opacity: 0.3,
          marginTop: 10,
          transformOrigin: "left center",
          transform: `scaleX(${p})`,
        }}
      />
    </div>
  );
};

/* ---------------------------------------------------------------- 逐字打印 */

const Typed = ({
  text,
  start,
  cps,
  frame,
  caret = false,
  caretColor = ERA.sepia,
}: {
  text: string;
  start: number;
  cps: number;
  frame: number;
  caret?: boolean;
  caretColor?: string;
}) => {
  const n = Math.max(0, Math.min(text.length, Math.floor(((frame - start) * cps) / 60)));
  const done = start + (text.length * 60) / cps;
  const show = caret && frame >= start - 2 && frame <= done + 160;
  const blink = Math.floor(frame / 20) % 2 === 0;
  return (
    <span style={{ whiteSpace: "pre" }}>
      {text.slice(0, n)}
      {show ? (
        <span style={{ opacity: blink ? 0.85 : 0.12, color: caretColor }}>▍</span>
      ) : null}
    </span>
  );
};
