/**
 * S14 · Transformer（94s–107s · 780f）｜注意力靛
 * 论文标题在 94s 乐段边界后的第一拍（镜内 37.7f）落下；
 * 6×6 注意力矩阵与词间连线逐拍点亮；主文案在段落中后段浮出。
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

const TOKENS = ["The", "cat", "sat", "on", "the", "mat"];
const CELL = 80;
const GAP = 7;
const MATRIX_X = 1160;
const MATRIX_Y = 250;
const MATRIX_W = TOKENS.length * CELL + (TOKENS.length - 1) * GAP;

const TITLE_BEAT = 37.7;
const BEAT = 56.25;
const ROW0 = TITLE_BEAT + BEAT; // 93.95

/** 确定性注意力权重（对角线略强，其余带结构化的强弱） */
const WEIGHTS = (() => {
  const rnd = mulberry32(2017);
  return TOKENS.map((_, r) =>
    TOKENS.map((_, c) => (r === c ? 1 : 0.08 + rnd() * 0.62)),
  );
})();

const STRIP_X = 140;
const STRIP_Y = 600;
const TOK_W = 96;
const TOK_GAP = 18;
const tokCx = (i: number) => STRIP_X + i * (TOK_W + TOK_GAP) + TOK_W / 2;

const ClipLine = ({
  children,
  p,
  style,
}: {
  children: ReactNode;
  p: number;
  style?: CSSProperties;
}) => (
  <div style={{ overflow: "hidden", ...style }}>
    <div
      style={{
        transform: `translateY(${(1 - p) * 112}%)`,
        opacity: Math.min(1, p * 2.2),
      }}
    >
      {children}
    </div>
  </div>
);

/** 镜末拼图块落位（全片母题，克制的小面积点缀） */
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
      <path
        d="M18 38 H46"
        stroke={ERA.indigo}
        strokeWidth={1}
        strokeOpacity={0.3}
        strokeDasharray="2 4"
      />
    </svg>
  );
};

export const S14 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = prog(frame, 0, 7);

  /* 标题落拍：提前起势，正好在 37.7f 落定 */
  const line1 = EASE.outExpo(prog(frame, 9, 28));
  const line2 = EASE.outExpo(prog(frame, 14, 24));
  const eyebrow = EASE.outExpo(prog(frame, 4, 22));
  const underline = EASE.draw(prog(frame, 18, 20));
  const land = 1 + 0.012 * (1 - EASE.outExpo(prog(frame, TITLE_BEAT, 16)));

  /* 矩阵 / 词带 */
  const matrixIn = EASE.outExpo(prog(frame, 66, 30));
  const stripIn = EASE.outExpo(prog(frame, 66, 30));
  const copyIn = EASE.outExpo(prog(frame, 487.7, 32));

  const queryRaw = Math.floor((frame - ROW0) / BEAT);
  const query = Math.max(-1, Math.min(TOKENS.length - 1, queryRaw));
  const rowP = (r: number) => EASE.outExpo(prog(frame, ROW0 + r * BEAT, 18));

  const arcPath = (a: number, b: number): string => {
    const x1 = tokCx(a) - STRIP_X;
    const x2 = tokCx(b) - STRIP_X;
    const lift = 40 + Math.abs(x2 - x1) * 0.1;
    return `M ${x1} 94 Q ${(x1 + x2) / 2} ${94 - lift} ${x2} 94`;
  };

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 左上标签 */}
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          Transformer · 2017
        </div>

        {/* 论文标题 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 172,
            width: 1000,
            transform: `scale(${land})`,
            transformOrigin: "0% 50%",
          }}
        >
          <div style={{ opacity: eyebrow, transform: `translateY(${(1 - eyebrow) * 10}px)` }}>
            <span style={{ ...TYPE.label, fontSize: 20, letterSpacing: "0.24em" }}>
              2017 · 论文 / PAPER
            </span>
            <span
              style={{
                display: "inline-block",
                width: 52,
                height: 2,
                marginLeft: 18,
                marginBottom: 6,
                backgroundColor: ERA.indigo,
                opacity: 0.7,
              }}
            />
          </div>

          <ClipLine p={line1} style={{ marginTop: 22 }}>
            <div
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 126,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: COLORS.ink,
              }}
            >
              Attention
            </div>
          </ClipLine>
          <ClipLine p={line2} style={{ marginTop: 2 }}>
            <div
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 300,
                fontSize: 118,
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
                color: COLORS.ink,
              }}
            >
              Is All You Need
            </div>
          </ClipLine>
          <div
            style={{
              marginTop: 20,
              width: 660 * underline,
              height: 4,
              backgroundColor: ERA.indigo,
              opacity: 0.85,
            }}
          />
        </div>

        {/* 词与词的注意力连线 */}
        <div
          style={{
            position: "absolute",
            left: STRIP_X,
            top: STRIP_Y - 96,
            width: 760,
            height: 150,
            opacity: stripIn,
          }}
        >
          <svg width={760} height={150} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {query >= 0
              ? TOKENS.map((_, c) => {
                  if (c === query) return null;
                  const p = EASE.draw(prog(frame, ROW0 + query * BEAT + 10, 20));
                  return (
                    <path
                      key={`arc-${query}-${c}`}
                      d={arcPath(query, c)}
                      fill="none"
                      stroke={ERA.indigo}
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      opacity={0.18 + 0.5 * p}
                      pathLength={1}
                      strokeDasharray="1 1"
                      strokeDashoffset={1 - p}
                    />
                  );
                })
              : null}
          </svg>
          {TOKENS.map((t, i) => {
            const active = query === i;
            return (
              <div
                key={`${t}-${i}`}
                style={{
                  position: "absolute",
                  left: i * (TOK_W + TOK_GAP),
                  top: 96,
                  width: TOK_W,
                  height: 46,
                  borderRadius: 9,
                  border: `1px solid ${active ? ERA.indigo : COLORS.line}`,
                  backgroundColor: active ? ERA.indigo : "rgba(243,240,231,0.06)",
                  color: active ? COLORS.paperWhite : COLORS.ink,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONTS.mono,
                  fontSize: 23,
                  letterSpacing: "0.02em",
                  transition: "background-color 120ms linear",
                  boxShadow: active ? `0 8px 22px rgba(70,91,130,0.18)` : "none",
                }}
              >
                {t}
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 154,
              ...TYPE.label,
              fontSize: 17,
              letterSpacing: "0.2em",
              color: COLORS.grey,
              opacity: 0.75,
            }}
          >
            SELF-ATTENTION · 从当前词看向整句
          </div>
        </div>

        {/* 注意力矩阵 */}
        <div
          style={{
            position: "absolute",
            left: MATRIX_X,
            top: MATRIX_Y,
            width: MATRIX_W,
            height: MATRIX_W,
            opacity: matrixIn,
            transform: `translateY(${(1 - matrixIn) * 18}px)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: -66,
              ...TYPE.label,
              fontSize: 17,
              letterSpacing: "0.2em",
              color: COLORS.grey,
            }}
          >
            注意力矩阵 · 6 × 6
          </div>

          {/* 列标签 */}
          {TOKENS.map((t, c) => {
            const lit = query >= 0 && WEIGHTS[query][c] > 0.5;
            return (
              <div
                key={`col-${c}`}
                style={{
                  position: "absolute",
                  left: c * (CELL + GAP) - 12,
                  top: -34,
                  width: CELL + 24,
                  textAlign: "center",
                  fontFamily: FONTS.mono,
                  fontSize: 18,
                  letterSpacing: "0.04em",
                  color: lit ? ERA.indigo : COLORS.grey,
                  opacity: lit ? 0.95 : 0.55,
                }}
              >
                {t}
              </div>
            );
          })}

          {/* 行标签 */}
          {TOKENS.map((t, r) => {
            const p = rowP(r);
            return (
              <div
                key={`row-${r}`}
                style={{
                  position: "absolute",
                  left: -138,
                  top: r * (CELL + GAP) + (CELL - 24) / 2,
                  width: 120,
                  textAlign: "right",
                  fontFamily: FONTS.mono,
                  fontSize: 18,
                  letterSpacing: "0.04em",
                  color: p > 0.4 ? ERA.indigo : COLORS.grey,
                  opacity: 0.45 + 0.5 * p,
                }}
              >
                {t}
              </div>
            );
          })}

          {/* 单元格 */}
          {TOKENS.map((_, r) =>
            TOKENS.map((_, c) => {
              const p = rowP(r);
              const w = WEIGHTS[r][c];
              return (
                <div
                  key={`cell-${r}-${c}`}
                  style={{
                    position: "absolute",
                    left: c * (CELL + GAP),
                    top: r * (CELL + GAP),
                    width: CELL,
                    height: CELL,
                    border: `1px solid ${
                      p > 0.3 ? "rgba(143,166,217,0.24)" : COLORS.lineSoft
                    }`,
                    backgroundColor:
                      p > 0
                        ? `rgba(143,166,217,${(0.06 + 0.46 * w * p).toFixed(3)})`
                        : "transparent",
                  }}
                />
              );
            }),
          )}

          {/* 对角落款 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: MATRIX_W + 18,
              fontFamily: FONTS.mono,
              fontSize: 17,
              letterSpacing: "0.18em",
              color: COLORS.grey,
              opacity: 0.6,
            }}
          >
            Q · K · V — ALL-TO-ALL ATTENTION
          </div>
        </div>

        {/* 主文案 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 76,
            width: 1240,
            opacity: copyIn,
            transform: `translateY(${(1 - copyIn) * 22}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 35, lineHeight: 1.66 }}>
            2017，《Attention Is All You Need》——一眼看全所有词，注意力成为方法。
          </div>
          <div
            style={{
              ...TYPE.en,
              fontStyle: "italic",
              fontSize: 25,
              color: COLORS.grey,
              marginTop: 10,
            }}
          >
            2017 — Attention Is All You Need.
          </div>
        </div>
      </AbsoluteFill>

      <Sequence from={Math.round(TITLE_BEAT)} durationInFrames={60}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.72} />
      </Sequence>
      <Sequence from={Math.round(ROW0)} durationInFrames={40}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.4} />
      </Sequence>
    </PaperStage>
  );
};
