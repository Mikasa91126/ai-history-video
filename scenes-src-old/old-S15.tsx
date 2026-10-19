/**
 * S15 · 开源与 AutoGPT（160s–170s · 600f）｜天空蓝
 * 左：Llama 权重下载条走满 → 开源分支向三方展开；
 * 右：AutoGPT「想 → 做 → 看」自主循环，光点按拍绕环行进。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const SKY = ERA.sky;
const INK = COLORS.ink;

/** 下载条在 225.24f（第 4 拍）走满，与自主循环起拍同一刻 */
const DL_START = 45.24;
const DL_DUR = 180;
const CYCLE_AT = 112.74;
const PACKETS_AT = 225.24;
const BEAT = 56.25;
const COPY_AT = 337.74;

const CX = 1370;
const CY = 500;
const R = 180;

const NODES = [
  { cn: "想", en: "THINK", angle: -90 },
  { cn: "做", en: "ACT", angle: 30 },
  { cn: "看", en: "OBSERVE", angle: 150 },
] as const;

const nodeXY = (angle: number): [number, number] => [
  CX + R * Math.cos((angle * Math.PI) / 180),
  CY + R * Math.sin((angle * Math.PI) / 180),
];

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
        stroke={ERA.sky}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M18 38 H46" stroke={ERA.sky} strokeWidth={1} strokeOpacity={0.3} strokeDasharray="2 4" />
    </svg>
  );
};

const BranchNode = ({
  x,
  y,
  label,
  p,
}: {
  x: number;
  y: number;
  label: string;
  p: number;
}) => {
  if (p <= 0) return null;
  return (
    <g>
      <rect
        x={x - 23}
        y={y - 23}
        width={46}
        height={46}
        rx={10}
        fill={COLORS.paperWhite}
        stroke={SKY}
        strokeWidth={1.6}
        opacity={p}
        transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * p}) translate(${-x} ${-y})`}
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontFamily={FONTS.mono}
        fontSize={14}
        letterSpacing="0.08em"
        fill={SKY}
        opacity={p}
      >
        {label}
      </text>
    </g>
  );
};

export const S15 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const fade = Math.min(prog(frame, 0, 10), 1 - prog(frame, dur - 14, 14));

  const cardIn = EASE.outExpo(prog(frame, 10, 32));
  const dl = EASE.ink(prog(frame, DL_START, DL_DUR));
  const done = dl > 0.995;

  const drawP = EASE.draw(prog(frame, CYCLE_AT, 50));
  const centerIn = EASE.outExpo(prog(frame, 180, 24));
  const copyIn = EASE.outExpo(prog(frame, COPY_AT, 34));
  const ghostIn = EASE.outExpo(prog(frame, 22, 28));

  const live = frame >= PACKETS_AT;
  const phase = live ? ((frame - PACKETS_AT) / BEAT) % 3 : 0;

  const nodeP = (i: number) => EASE.outExpo(prog(frame, 130 + i * 15, 22));

  const glow = (i: number) => {
    if (!live) return 0;
    const d = Math.abs(phase - i);
    const dist = Math.min(d, 3 - d);
    return Math.max(0, 1 - dist * 2.4);
  };

  const packet = (offset: number) => {
    if (!live) return null;
    const ph = (((phase + offset) % 3) + 3) % 3;
    const angle = (-90 + ph * 120) * (Math.PI / 180);
    return [CX + R * Math.cos(angle), CY + R * Math.sin(angle)] as const;
  };

  const main = packet(0);
  const trail = [0.07, 0.14, 0.21].map((d) => packet(-d));

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          开源与 Agent · 2023
        </div>

        {/* ---------------- 左：开源权重 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 190,
            width: 760,
            height: 600,
            padding: 32,
            backgroundColor: COLORS.paperWhite,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 18,
            boxShadow: "0 24px 60px rgba(31,30,29,0.10)",
            opacity: cardIn,
            transform: `translateY(${(1 - cardIn) * 26}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 56,
                lineHeight: 1,
                color: INK,
              }}
            >
              Llama
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 15,
                letterSpacing: "0.16em",
                color: done ? COLORS.paperWhite : SKY,
                backgroundColor: done ? SKY : "rgba(106,155,204,0.10)",
                border: `1px solid ${SKY}`,
                borderRadius: 7,
                padding: "6px 12px",
                marginBottom: 6,
              }}
            >
              {done ? "OPEN WEIGHTS" : "DOWNLOADING"}
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: FONTS.mono,
                fontSize: 17,
                letterSpacing: "0.2em",
                color: COLORS.grey,
                opacity: 0.6,
                marginBottom: 8,
              }}
            >
              2023
            </span>
          </div>

          <div
            style={{
              marginTop: 10,
              fontFamily: FONTS.mono,
              fontSize: 16,
              letterSpacing: "0.18em",
              color: COLORS.grey,
              opacity: 0.7,
            }}
          >
            权重下载 · 开源分支 / WEIGHTS & FORK
          </div>

          {/* 下载进度 */}
          <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 17,
                letterSpacing: "0.16em",
                color: COLORS.grey,
              }}
            >
              权重 / WEIGHTS
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: FONTS.mono,
                fontSize: 22,
                color: SKY,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round(dl * 100)}%
            </span>
          </div>
          <div
            style={{
              marginTop: 10,
              height: 16,
              borderRadius: 8,
              backgroundColor: COLORS.paperDeep,
              border: `1px solid ${COLORS.lineSoft}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${dl * 100}%`,
                height: "100%",
                borderRadius: 8,
                backgroundColor: SKY,
                opacity: 0.9,
              }}
            />
          </div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "space-between",
              fontFamily: FONTS.mono,
              fontSize: 14,
              letterSpacing: "0.18em",
              color: done ? SKY : COLORS.grey,
              opacity: 0.8,
            }}
          >
            <span>{done ? "已开放 / OPEN" : "下载中 / DOWNLOADING"}</span>
            <span>LLAMA · WEIGHTS</span>
          </div>

          {/* 开源分支 */}
          <svg viewBox="0 0 696 270" width={696} height={270} style={{ marginTop: 22, overflow: "visible" }}>
            {/* 蓝图虚线 */}
            <g opacity={0.8 * ghostIn}>
              <path
                d="M 30 136 H 240"
                fill="none"
                stroke="rgba(20,20,19,0.24)"
                strokeWidth={1.3}
                strokeDasharray="4 6"
              />
              <path
                d="M 240 136 C 340 136 380 56 535 56"
                fill="none"
                stroke="rgba(106,155,204,0.45)"
                strokeWidth={1.3}
                strokeDasharray="4 6"
              />
              <path
                d="M 240 136 C 360 136 430 136 575 136"
                fill="none"
                stroke="rgba(106,155,204,0.45)"
                strokeWidth={1.3}
                strokeDasharray="4 6"
              />
              <path
                d="M 240 136 C 340 136 380 216 535 216"
                fill="none"
                stroke="rgba(106,155,204,0.45)"
                strokeWidth={1.3}
                strokeDasharray="4 6"
              />
              {[
                [535, 56],
                [575, 136],
                [535, 216],
              ].map(([x, y]) => (
                <rect
                  key={`${x}-${y}`}
                  x={x - 23}
                  y={y - 23}
                  width={46}
                  height={46}
                  rx={10}
                  fill="none"
                  stroke="rgba(106,155,204,0.4)"
                  strokeWidth={1.3}
                  strokeDasharray="3 5"
                />
              ))}
            </g>

            <DrawPath d="M 30 136 H 240" start={100} dur={26} stroke={INK} width={2} opacity={0.38} endDot={false} />
            <DrawPath
              d="M 240 136 C 340 136 380 56 535 56"
              start={116}
              dur={36}
              stroke={SKY}
              width={2.2}
              opacity={0.8}
              endDot={false}
            />
            <DrawPath
              d="M 240 136 C 360 136 430 136 575 136"
              start={130}
              dur={36}
              stroke={SKY}
              width={2.2}
              opacity={0.8}
              endDot={false}
            />
            <DrawPath
              d="M 240 136 C 340 136 380 216 535 216"
              start={144}
              dur={36}
              stroke={SKY}
              width={2.2}
              opacity={0.8}
              endDot={false}
            />
            <circle cx={240} cy={136} r={8 * EASE.outExpo(prog(frame, 104, 18))} fill={SKY} />
            <BranchNode x={535} y={56} label="01" p={EASE.outExpo(prog(frame, 165, 22))} />
            <BranchNode x={575} y={136} label="02" p={EASE.outExpo(prog(frame, 181, 22))} />
            <BranchNode x={535} y={216} label="03" p={EASE.outExpo(prog(frame, 197, 22))} />
          </svg>
        </div>

        {/* ---------------- 右：AutoGPT 自主循环 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 170,
            width: 820,
            height: 620,
          }}
        >
          <svg width={820} height={620} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {/* 蓝图虚线：循环尚在形成时先给出结构，实线画成后淡去 */}
            <g opacity={0.9 * ghostIn * (1 - 0.85 * drawP)}>
              <circle
                cx={CX - 960}
                cy={CY - 170}
                r={R}
                fill="none"
                stroke="rgba(20,20,19,0.16)"
                strokeWidth={1.2}
                strokeDasharray="4 8"
              />
              {NODES.map((n) => {
                const [x, y] = nodeXY(n.angle);
                return (
                  <circle
                    key={`ghost-${n.en}`}
                    cx={x - 960}
                    cy={y - 170}
                    r={46}
                    fill="none"
                    stroke="rgba(106,155,204,0.4)"
                    strokeWidth={1.3}
                    strokeDasharray="3 5"
                  />
                );
              })}
            </g>
            <circle
              cx={CX - 960}
              cy={CY - 170}
              r={R}
              fill="none"
              stroke={INK}
              strokeOpacity={0.14}
              strokeWidth={1.4}
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - drawP}
            />
            {/* 方向箭头 */}
            {[-30, 90, 210].map((a) => {
              const rad = (a * Math.PI) / 180;
              const x = CX - 960 + R * Math.cos(rad);
              const y = CY - 170 + R * Math.sin(rad);
              const rot = (Math.atan2(Math.cos(rad), -Math.sin(rad)) * 180) / Math.PI;
              return (
                <path
                  key={a}
                  d="M -5 -4 L 5 0 L -5 4 Z"
                  fill={SKY}
                  opacity={0.6 * drawP}
                  transform={`translate(${x} ${y}) rotate(${rot})`}
                />
              );
            })}
            {/* 光点 */}
            {live && main ? (
              <>
                {trail.map((pt, i) =>
                  pt ? (
                    <circle
                      key={i}
                      cx={pt[0] - 960}
                      cy={pt[1] - 170}
                      r={6 - i * 1.2}
                      fill={SKY}
                      opacity={0.3 - i * 0.07}
                    />
                  ) : null,
                )}
                <circle cx={main[0] - 960} cy={main[1] - 170} r={17} fill={SKY} opacity={0.14} />
                <circle cx={main[0] - 960} cy={main[1] - 170} r={8} fill={SKY} />
                <circle cx={main[0] - 960} cy={main[1] - 170} r={3} fill={COLORS.paperWhite} />
              </>
            ) : null}
          </svg>

          {NODES.map((n, i) => {
            const [x, y] = nodeXY(n.angle);
            const p = nodeP(i);
            if (p <= 0) return null;
            const g = glow(i);
            return (
              <div
                key={n.en}
                style={{
                  position: "absolute",
                  left: x - 960,
                  top: y - 170,
                  width: 0,
                  height: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: -46,
                    top: -46,
                    width: 92,
                    height: 92,
                    borderRadius: "50%",
                    backgroundColor: g > 0.45 ? SKY : COLORS.paperWhite,
                    border: `2px solid ${g > 0.45 ? SKY : "rgba(106,155,204,0.55)"}`,
                    boxShadow:
                      g > 0.05
                        ? `0 0 0 ${10 * g}px rgba(106,155,204,${(0.12 * g).toFixed(3)}), 0 16px 36px rgba(31,30,29,0.10)`
                        : "0 12px 30px rgba(31,30,29,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONTS.serifCN,
                    fontSize: 38,
                    color: g > 0.45 ? COLORS.paperWhite : INK,
                    opacity: p,
                    transform: `scale(${(0.78 + 0.22 * p) * (1 + 0.05 * g)})`,
                    transition: "background-color 80ms linear",
                  }}
                >
                  {n.cn}
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: -90,
                    top: n.angle === -90 ? -82 : 58,
                    width: 180,
                    textAlign: "center",
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    letterSpacing: "0.22em",
                    color: COLORS.grey,
                    opacity: p * 0.8,
                  }}
                >
                  {n.en}
                </div>
              </div>
            );
          })}

          {/* 中心标识 */}
          <div
            style={{
              position: "absolute",
              left: CX - 960,
              top: CY - 170,
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              opacity: centerIn,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 46,
                lineHeight: 1.1,
                color: INK,
              }}
            >
              AutoGPT
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: FONTS.mono,
                fontSize: 16,
                letterSpacing: "0.24em",
                color: SKY,
              }}
            >
              2023 · AUTONOMOUS LOOP
            </div>
          </div>
        </div>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 62,
            width: 1560,
            opacity: copyIn,
            transform: `translateY(${(1 - copyIn) * 22}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 35, lineHeight: 1.6 }}>
            2023，开源权重与 AutoGPT——每个人都能拥有、能驱使的智能。
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
            2023 — open weights, and agents that act.
          </div>
        </div>

        <LandPiece frame={frame} dur={dur} />
      </AbsoluteFill>

      <Sequence from={Math.round(PACKETS_AT + BEAT)} durationInFrames={50}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.38} />
      </Sequence>
      <Sequence from={Math.round(PACKETS_AT + BEAT * 2)} durationInFrames={50}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.38} />
      </Sequence>
      <Sequence from={Math.round(CYCLE_AT)} durationInFrames={50}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.42} />
      </Sequence>
      <Sequence from={Math.round(PACKETS_AT)} durationInFrames={60}>
        <Audio src={staticFile("sfx/success-chime.wav")} volume={0.45} />
      </Sequence>
    </PaperStage>
  );
};
