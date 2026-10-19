/**
 * S04 · 1966 ELIZA（360f）｜规则时代
 * 深色电传纸带：「HELLO, I AM ELIZA」逐字打印，纸带孔位与光标呼吸；
 * 左上 ELIZA 标题，右侧 1966.01。时代色：sepia。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const ACCENT = ERA.sepia;
const TAPE_AT = 30;
const TYPE_AT = 70;
const SECOND_AT = 170;

export const S04 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = prog(frame, 0, 7);
  const titleP = EASE.outExpo(prog(frame, 8, 30));
  const dateP = EASE.outExpo(prog(frame, 16, 30));
  const tapeP = EASE.outExpo(prog(frame, TAPE_AT, 34));
  const copy = Math.min(prog(frame, 252, 24), 1);
  const copyEn = Math.min(prog(frame, 272, 24), 1);

  return (
    <PaperStage dur={dur} tone="medium" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
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
          规则时代 · 1966.01
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
            transform: `scaleX(${EASE.outExpo(prog(frame, 10, 32))})`,
          }}
        />

        {/* 标题 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 174,
            fontFamily: FONTS.serifLatin,
            fontWeight: 500,
            fontSize: 120,
            lineHeight: 1,
            letterSpacing: "0.06em",
            color: COLORS.ink,
            opacity: titleP,
            transform: `translateY(${(1 - titleP) * 20}px)`,
            textShadow: "0 0 34px rgba(243,240,231,0.08)",
          }}
        >
          ELIZA
        </div>

        {/* 日期 */}
        <div
          style={{
            position: "absolute",
            right: 180,
            top: 214,
            textAlign: "right",
            opacity: dateP,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 72,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: ACCENT,
            }}
          >
            1966.01
          </div>
          <div
            style={{
              marginTop: 16,
              marginLeft: "auto",
              width: 300,
              height: 1,
              backgroundColor: ACCENT,
              opacity: 0.38,
              transformOrigin: "right center",
              transform: `scaleX(${EASE.outExpo(prog(frame, 26, 34))})`,
            }}
          />
        </div>

        {/* ---------------- 电传纸带 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 342,
            width: 1640,
            height: 356,
            perspective: 1800,
            opacity: Math.min(1, prog(frame, TAPE_AT, 12) * 1.4),
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(168deg, #1A1A18 0%, #151513 58%, #10100F 100%)",
              border: `1px solid ${COLORS.line}`,
              borderTop: `2px solid ${ACCENT}33`,
              borderBottom: `2px solid ${ACCENT}33`,
              boxShadow: "0 34px 84px rgba(0,0,0,0.48), inset 0 0 90px rgba(0,0,0,0.24)",
              transformOrigin: "50% 50%",
              transform: `translateY(${(1 - tapeP) * 52}px) rotate(${
                -1.8 + tapeP * 1.1
              }deg)`,
              overflow: "hidden",
            }}
          >
            {/* 纸带孔位 */}
            <Holes y={18} />
            <Holes y={325} />

            {/* 端边压线 */}
            <div
              style={{
                position: "absolute",
                left: 38,
                top: 46,
                bottom: 46,
                width: 1,
                backgroundColor: "rgba(243,240,231,0.06)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 38,
                top: 46,
                bottom: 46,
                width: 1,
                backgroundColor: "rgba(243,240,231,0.06)",
              }}
            />

            <div style={{ position: "absolute", left: 116, right: 116, top: 96 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 24,
                    letterSpacing: "0.1em",
                    color: ACCENT,
                    lineHeight: "62px",
                  }}
                >
                  ELIZA
                </span>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 24,
                    color: COLORS.grey,
                    lineHeight: "62px",
                  }}
                >
                  &gt;
                </span>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 54,
                    letterSpacing: "0.045em",
                    color: COLORS.ink,
                    lineHeight: "62px",
                    whiteSpace: "pre",
                    textShadow: "0 0 22px rgba(243,240,231,0.12)",
                  }}
                >
                  <Typed
                    text="HELLO, I AM ELIZA"
                    start={TYPE_AT}
                    cps={14}
                    frame={frame}
                    caret={frame < SECOND_AT - 6}
                  />
                </span>
              </div>

              <div
                style={{
                  marginTop: 34,
                  marginLeft: 101,
                  fontFamily: FONTS.mono,
                  fontSize: 28,
                  lineHeight: 1.6,
                  letterSpacing: "0.03em",
                  color: COLORS.graphite,
                  opacity: prog(frame, SECOND_AT, 22) * 0.9,
                }}
              >
                <Typed
                  text="HOW DO YOU DO. PLEASE TELL ME YOUR PROBLEM."
                  start={SECOND_AT}
                  cps={30}
                  frame={frame}
                  caret
                  caretColor={ACCENT}
                />
              </div>
            </div>
          </div>
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
            1966，ELIZA：第一次有人对着机器说话。
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
            1966: the first chatbot — a script that felt alive.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：纸带落下 / 打字机 */}
      <Sequence from={TAPE_AT} durationInFrames={65}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.46} />
      </Sequence>
      <Sequence from={TYPE_AT} durationInFrames={210}>
        <Audio src={staticFile("sfx/key-type.wav")} volume={0.48} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 纸带孔位 */

const Holes = ({ y }: { y: number }) => (
  <div
    style={{
      position: "absolute",
      left: 54,
      right: 54,
      top: y,
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    {Array.from({ length: 41 }, (_, i) => (
      <span
        key={i}
        style={{
          width: 17,
          height: 9,
          borderRadius: 3,
          backgroundColor: COLORS.paper,
          boxShadow: "inset 0 0 0 1px rgba(243,240,231,0.11)",
        }}
      />
    ))}
  </div>
);

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
  const show = caret && frame >= start - 2 && frame <= done + 140;
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
