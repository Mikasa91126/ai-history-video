/**
 * S18 · ChatGPT 时刻（126s–136s · 600f）｜对话·靛
 * 副歌强拍（镜内 15.2f）对话框亮起，三句对话依次落下；
 * 右侧用户曲线陡升，「100,000,000」滚动落定（两个月，一亿人）。
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { Counter } from "../comps/Counter";
import { MiniWindow } from "../comps/ui";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

/** 副歌起拍：镜内 0–56f 的强拍 */
const LIGHT = 15.24;
const USER_AT = 36;
const AI_AT = 94;
/** 127.74 = 镜内第 3 拍；数字在拍上起滚，约第 5 拍落定 */
const NUM_AT = 127.74;
const COPY_AT = 296.49;

const CHAT = "我是 ChatGPT。可以陪你聊天、解释概念，也能帮你把事情写下来。";

const StreamText = ({
  text,
  start,
  cps = 20,
}: {
  text: string;
  start: number;
  cps?: number;
}) => {
  const frame = useCurrentFrame();
  const n = Math.min(text.length, Math.floor((Math.max(0, frame - start) * cps) / 60));
  const done = start + (text.length * 60) / cps;
  const caret = frame < done + 24 && Math.floor(frame / 18) % 2 === 0;
  return (
    <span style={{ whiteSpace: "pre-wrap" }}>
      {text.slice(0, n)}
      {n < text.length && caret ? (
        <span style={{ color: ERA.indigo, opacity: 0.8 }}>▍</span>
      ) : null}
    </span>
  );
};

const Bubble = ({
  children,
  side,
  start,
  frame,
  label,
  style,
}: {
  children: ReactNode;
  side: "left" | "right";
  start: number;
  frame: number;
  label: string;
  style?: CSSProperties;
}) => {
  const p = EASE.outExpo(prog(frame, start, 26));
  if (p <= 0) return null;
  const right = side === "right";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: right ? "flex-end" : "flex-start",
        opacity: p,
        transform: `translateX(${(1 - p) * (right ? 40 : -40)}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 13,
          letterSpacing: "0.18em",
          color: COLORS.grey,
          opacity: 0.8,
          marginBottom: 6,
          paddingLeft: right ? 0 : 4,
          paddingRight: right ? 4 : 0,
        }}
      >
        {label}
      </div>
      <div
        style={{
          maxWidth: 560,
          padding: "15px 20px",
          fontSize: 27,
          lineHeight: 1.55,
          fontFamily: FONTS.sansCN,
          color: right ? COLORS.paperWhite : COLORS.ink,
          backgroundColor: right ? ERA.indigo : COLORS.paper,
          border: right ? "1px solid rgba(70,91,130,0.4)" : `1px solid ${COLORS.line}`,
          borderRadius: right ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
          boxShadow: right
            ? "0 10px 24px rgba(70,91,130,0.16)"
            : "0 8px 20px rgba(0,0,0,0.05)",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Typing = ({ frame, start }: { frame: number; start: number }) => {
  const p = EASE.outExpo(prog(frame, start, 20));
  if (p <= 0 || frame >= AI_AT) return null;
  return (
    <div
      style={{
        alignSelf: "flex-start",
        padding: "16px 22px",
        borderRadius: "4px 16px 16px 16px",
        border: `1px solid ${COLORS.line}`,
        backgroundColor: COLORS.paper,
        display: "flex",
        gap: 8,
        opacity: p,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 99,
            backgroundColor: ERA.indigo,
            opacity: 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(frame / 5 + i * 0.9)),
          }}
        />
      ))}
    </div>
  );
};

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

export const S18 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const fade = prog(frame, 0, 7);
  const fromBlack = 1 - prog(frame, 0, 12);

  const winIn = EASE.outExpo(prog(frame, 8, 30));
  const glow = Math.max(0, 1 - prog(frame, LIGHT, 42));
  const copyIn = EASE.outExpo(prog(frame, COPY_AT, 32));

  const curveP = EASE.draw(prog(frame, NUM_AT, 112));
  const dotP = EASE.outExpo(prog(frame, NUM_AT + 100, 20));
  const dropP = EASE.draw(prog(frame, NUM_AT + 108, 36));

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      {/* 从黑场淡入（承接 S11 的屏息） */}
      <AbsoluteFill style={{ backgroundColor: "#050505", opacity: fromBlack, pointerEvents: "none" }} />

      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          对话 · 2022
        </div>

        {/* ---------------- 左：ChatGPT 窗口 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 168,
            width: 820,
            transform: `scale(${0.985 + 0.015 * winIn})`,
            transformOrigin: "50% 60%",
            opacity: winIn,
            filter: `drop-shadow(0 26px 70px rgba(70,91,130,${(0.10 + 0.22 * glow).toFixed(3)}))`,
          }}
        >
          <MiniWindow
            title="ChatGPT — chat.openai.com"
            variant="light"
            width={820}
            height={590}
            bodyStyle={{ padding: "16px 22px", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingBottom: 12,
                borderBottom: `1px solid ${COLORS.lineSoft}`,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 99,
                  backgroundColor: ERA.indigo,
                  boxShadow: `0 0 0 ${4 * glow}px rgba(70,91,130,0.14)`,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 15,
                  letterSpacing: "0.16em",
                  color: COLORS.grey,
                }}
              >
                NEW CHAT · 2022.11.30
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  letterSpacing: "0.12em",
                  color: COLORS.grey,
                  opacity: 0.72,
                }}
              >
                ONLINE
              </span>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 16,
                padding: "14px 0 16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  alignSelf: "center",
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color: COLORS.grey,
                  opacity: 0.68,
                }}
              >
                TODAY
              </div>

              <Bubble side="left" start={LIGHT} frame={frame} label="CHATGPT">
                你好！有什么可以帮你？
              </Bubble>

              {frame >= USER_AT ? (
                <Bubble side="right" start={USER_AT} frame={frame} label="你 / YOU">
                  你好，你是谁？
                </Bubble>
              ) : null}

              <Typing frame={frame} start={72} />

              {frame >= AI_AT ? (
                <Bubble side="left" start={AI_AT} frame={frame} label="CHATGPT">
                  <StreamText text={CHAT} start={AI_AT + 4} cps={22} />
                </Bubble>
              ) : null}
            </div>

            {/* 输入条 */}
            <div
              style={{
                height: 58,
                flexShrink: 0,
                border: `1px solid ${frame >= USER_AT ? "rgba(70,91,130,0.35)" : COLORS.line}`,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                padding: "0 10px 0 20px",
                gap: 12,
                backgroundColor: COLORS.paperWhite,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.sansCN,
                  fontSize: 21,
                  color: COLORS.grey,
                  opacity: 0.65,
                }}
              >
                Message ChatGPT…
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: ERA.indigo,
                  color: COLORS.ink,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONTS.sansCN,
                  fontSize: 20,
                }}
              >
                ↑
              </span>
            </div>
          </MiniWindow>

          {/* 亮起瞬间的柔光 */}
          {glow > 0.01 ? (
            <div
              style={{
                position: "absolute",
                inset: -40,
                borderRadius: 30,
                background:
                  "radial-gradient(ellipse at 50% 45%, rgba(70,91,130,0.16) 0%, rgba(70,91,130,0) 68%)",
                opacity: glow,
                pointerEvents: "none",
              }}
            />
          ) : null}
        </div>

        {/* ---------------- 右：用户曲线 ---------------- */}
        <div style={{ position: "absolute", left: 1000, top: 138, width: 800 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              letterSpacing: "0.22em",
              color: COLORS.grey,
              opacity: 0.72,
            }}
          >
            两个月 / TWO MONTHS
          </div>
          <div style={{ marginTop: 6 }}>
            <Counter
              from={0}
              to={100000000}
              start={NUM_AT}
              dur={112}
              format={(v) => Math.round(v).toLocaleString("en-US")}
              style={{
                fontFamily: FONTS.mono,
                fontSize: 92,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: ERA.indigo,
                fontVariantNumeric: "tabular-nums",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 4,
              fontFamily: FONTS.mono,
              fontSize: 17,
              letterSpacing: "0.22em",
              color: COLORS.grey,
              opacity: 0.75,
            }}
          >
            用户 / USERS
          </div>
        </div>

        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* 网格 */}
          {[440, 540, 640, 720].map((y) => (
            <line
              key={y}
              x1={1000}
              y1={y}
              x2={1780}
              y2={y}
              stroke="rgba(243,240,231,0.08)"
              strokeWidth={1}
            />
          ))}
          {/* 基线 */}
          <line x1={1000} y1={760} x2={1780} y2={760} stroke="rgba(243,240,231,0.26)" strokeWidth={1.4} />
          {/* 曲线 */}
          <path
            d="M 1020 752 C 1320 748 1440 742 1540 700 C 1630 662 1670 480 1700 340"
            fill="none"
            stroke={ERA.indigo}
            strokeWidth={3.2}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - curveP}
            opacity={0.92}
          />
          {/* 终点竖虚线 */}
          <line
            x1={1700}
            y1={340}
            x2={1700}
            y2={760}
            stroke={ERA.indigo}
            strokeWidth={1.3}
            strokeDasharray="4 7"
            opacity={0.3 * dropP}
          />
          {/* 终点 */}
          {dotP > 0 ? (
            <g>
              <circle cx={1700} cy={340} r={20 * dotP} fill={ERA.indigo} opacity={0.13 * dotP} />
              <circle cx={1700} cy={340} r={7 * dotP} fill={ERA.indigo} />
              <circle cx={1700} cy={340} r={2.6 * dotP} fill={COLORS.paperWhite} />
            </g>
          ) : null}
          {/* 起点 */}
          <circle cx={1020} cy={752} r={4} fill={COLORS.ink} opacity={0.45} />
        </svg>

        {/* 主文案 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 66,
            width: 1520,
            opacity: copyIn,
            transform: `translateY(${(1 - copyIn) * 22}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 35, lineHeight: 1.6 }}>
            2022 年 11 月 30 日，ChatGPT 发布——两个月，约一亿人第一次和 AI 对话。
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
            Two months, about 100 million people — the world starts talking to AI.
          </div>
        </div>
      </AbsoluteFill>

      <Sequence from={Math.round(LIGHT)} durationInFrames={50}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={Math.round(NUM_AT)} durationInFrames={60}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.6} />
      </Sequence>
    </PaperStage>
  );
};
