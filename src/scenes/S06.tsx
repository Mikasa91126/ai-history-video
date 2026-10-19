/**
 * S06 · 专家系统年代（360f）｜规则时代
 * 深色档案：XCON 工单卡（1978.12 启动 / 1980.01 DEC Salem 首装）
 * + 规则流入机器的流程图，短暂回暖。时代色：sepia。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const ACCENT = ERA.sepia;
const COPY_AT = 204;

export const S06 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = prog(frame, 0, 7);
  const dateP = EASE.outExpo(prog(frame, 8, 30));
  const cardP = EASE.outExpo(prog(frame, 22, 36));
  const copy = Math.min(prog(frame, COPY_AT, 24), 1);
  const copyEn = Math.min(prog(frame, COPY_AT + 20, 24), 1);
  const glowP = prog(frame, 120, 50);

  return (
    <PaperStage dur={dur} tone="medium" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 回暖的环境光 */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse 42% 46% at 72% 55%, rgba(201,168,118,0.14), rgba(201,168,118,0) 70%)",
            opacity: glowP,
            pointerEvents: "none",
          }}
        />

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
          规则时代 · 1980s
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

        {/* 年代 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 176,
            fontFamily: FONTS.mono,
            fontSize: 104,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: ACCENT,
            opacity: dateP,
            transform: `translateY(${(1 - dateP) * 16}px)`,
          }}
        >
          1980s
        </div>

        {/* ---------------- 左：XCON 工单卡 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 340,
            width: 760,
            height: 418,
            background:
              "linear-gradient(160deg, #1B1B19 0%, #161614 62%, #111110 100%)",
            border: `1px solid ${COLORS.line}`,
            borderTop: `3px solid ${ACCENT}`,
            boxShadow: "0 34px 80px rgba(0,0,0,0.46)",
            opacity: Math.min(1, prog(frame, 22, 12) * 1.4),
            transform: `translateY(${(1 - cardP) * 26}px) rotate(${
              -0.5 + (1 - cardP) * 0.35
            }deg)`,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", left: 44, right: 44, top: 34 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.serifLatin,
                    fontWeight: 600,
                    fontSize: 58,
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    color: COLORS.ink,
                  }}
                >
                  XCON
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontFamily: FONTS.mono,
                    fontSize: 13,
                    letterSpacing: "0.2em",
                    color: ACCENT,
                  }}
                >
                  EXPERT SYSTEM · WORK ORDER
                </div>
              </div>
            </div>

            <div
              style={{
                height: 1,
                backgroundColor: COLORS.line,
                marginTop: 28,
                marginBottom: 26,
              }}
            />

            <Field label="START" value="1978.12" />
            <Field label="FIRST INSTALL" value="1980.01" />
            <Field label="SITE" value="DEC · SALEM" last />
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 10,
              backgroundColor: "rgba(201,168,118,0.10)",
              borderTop: "1px solid rgba(201,168,118,0.22)",
            }}
          />
        </div>

        {/* ---------------- 右：规则流程图 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 980,
            top: 296,
            width: 800,
            height: 462,
            opacity: prog(frame, 30, 24),
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              fontFamily: FONTS.mono,
              fontSize: 14,
              letterSpacing: "0.2em",
              color: COLORS.grey,
            }}
          >
            RULES IN
          </div>

          {/* 箭头 */}
          <svg
            width={800}
            height={462}
            viewBox="0 0 800 462"
            style={{ position: "absolute", inset: 0 }}
          >
            {[
              { d: "M 300 114 C 342 114, 360 170, 408 198", start: 74 },
              { d: "M 300 204 C 344 204, 366 212, 408 222", start: 88 },
              { d: "M 300 294 C 344 294, 366 270, 408 246", start: 102 },
              { d: "M 610 228 L 686 228", start: 150 },
            ].map((a, i) => (
              <g key={i}>
                <DrawPath
                  d={a.d}
                  start={a.start}
                  dur={30}
                  stroke={ACCENT}
                  width={1.6}
                  opacity={0.55}
                  endDot={false}
                />
                <polygon
                  points={
                    i < 3
                      ? "404,190 416,198 404,206"
                      : "680,221 694,228 680,235"
                  }
                  fill={ACCENT}
                  opacity={prog(frame, a.start + 24, 12) * 0.8}
                />
              </g>
            ))}
          </svg>

          {/* 规则卡 */}
          {[0, 1, 2].map((i) => {
            const p = EASE.outExpo(prog(frame, 48 + i * 12, 26));
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 82 + i * 90,
                  width: 300,
                  height: 64,
                  backgroundColor: COLORS.paperDeep,
                  border: `1px solid ${COLORS.line}`,
                  borderLeft: `2px solid ${ACCENT}`,
                  borderRadius: 4,
                  padding: "12px 16px",
                  boxSizing: "border-box",
                  opacity: p,
                  transform: `translateX(${(1 - p) * -18}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    letterSpacing: "0.16em",
                    color: ACCENT,
                  }}
                >
                  RULE {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <span style={{ width: 160, height: 1, backgroundColor: COLORS.line }} />
                  <span style={{ width: 60, height: 1, backgroundColor: COLORS.lineSoft }} />
                </div>
              </div>
            );
          })}

          {/* XCON 节点 */}
          <div
            style={{
              position: "absolute",
              left: 408,
              top: 160,
              width: 202,
              height: 138,
              backgroundColor: COLORS.paperDeep,
              border: `1.5px solid ${ACCENT}`,
              borderRadius: 6,
              boxShadow: `0 0 ${Math.round(24 + glowP * 26)}px rgba(201,168,118,0.14)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: prog(frame, 126, 26),
              transform: `scale(${0.96 + EASE.outExpo(prog(frame, 126, 26)) * 0.04})`,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 600,
                fontSize: 38,
                letterSpacing: "0.04em",
                color: COLORS.ink,
              }}
            >
              XCON
            </span>
            <span
              style={{
                marginTop: 8,
                fontFamily: FONTS.mono,
                fontSize: 11,
                letterSpacing: "0.2em",
                color: ACCENT,
              }}
            >
              RULE ENGINE
            </span>
          </div>

          {/* 配置输出 */}
          <div
            style={{
              position: "absolute",
              left: 694,
              top: 190,
              width: 84,
              height: 76,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paperDeep,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              opacity: prog(frame, 170, 24),
            }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: 26, color: ACCENT }}>✓</span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 10,
                letterSpacing: "0.12em",
                color: COLORS.grey,
              }}
            >
              CONFIG
            </span>
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
              fontSize: 36,
              lineHeight: 1.5,
              letterSpacing: "0.01em",
              color: COLORS.ink,
            }}
          >
            1980s，专家系统走进工厂——把专家规则喂给机器，短暂回暖。
          </div>
          <div
            style={{
              fontFamily: FONTS.serifLatin,
              fontStyle: "italic",
              fontSize: 29,
              lineHeight: 1.4,
              color: COLORS.grey,
              marginTop: 8,
              opacity: copyEn,
            }}
          >
            The 80s: expert systems go to work — rules, shipped at scale.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：工单卡落下 / 规则配置完成 */}
      <Sequence from={22} durationInFrames={55}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={170} durationInFrames={45}>
        <Audio src={staticFile("sfx/confirm-click.wav")} volume={0.42} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 工单字段 */

const Field = ({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: last ? "none" : `1px solid ${COLORS.lineSoft}`,
    }}
  >
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize: 13,
        letterSpacing: "0.18em",
        color: COLORS.grey,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize: 24,
        letterSpacing: "0.02em",
        color: COLORS.ink,
      }}
    >
      {value}
    </span>
  </div>
);

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
