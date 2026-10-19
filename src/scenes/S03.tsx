/**
 * S03 · 1958 感知机（420f）｜规则时代
 * 深色蓝图：x1–x3 → Σ → θ → y 的感知机电路逐线绘制，输出节点脉冲；
 * 右侧 1958.07 与玫瑰式图元。时代色：newsprint。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const ACCENT = ERA.newsprint;

const ROSE = (() => {
  const cx = 240;
  const cy = 240;
  const R = 204;
  const pts: string[] = [];
  for (let i = 0; i <= 360; i++) {
    const t = (i / 360) * Math.PI * 2;
    const r = R * Math.abs(Math.cos(4 * t));
    pts.push(`${(cx + Math.cos(t) * r).toFixed(2)} ${(cy + Math.sin(t) * r).toFixed(2)}`);
  }
  return `M ${pts[0]} L ${pts.slice(1).join(" L ")} Z`;
})();

const OUTPUT_AT = 196;

const pulse = (frame: number, start: number, interval = 48): number => {
  if (frame < start) return 0;
  return Math.exp(-((frame - start) % interval) / 10);
};

export const S03 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = prog(frame, 0, 7);
  const copy = Math.min(prog(frame, 256, 24), 1);
  const copyEn = Math.min(prog(frame, 276, 24), 1);

  const glow = pulse(frame, 220) * (1 - prog(frame, dur - 22, 22) * 0.45);
  const local = frame < 220 ? 0 : ((frame - 220) % 48) / 48;
  const ringR = 34 + local * 46;
  const ringO = frame < 220 ? 0 : (1 - local) * 0.4;

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 手绘粗糙滤镜 */}
        <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
          <defs>
            <filter id="s03-rough" x="-8%" y="-12%" width="116%" height="124%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.022"
                numOctaves="2"
                seed="19"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.7"
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
          规则时代 · 1958.07
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

        {/* ---------------- 右：日期 + 玫瑰图元 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 1150,
            top: 178,
            width: 620,
            opacity: prog(frame, 18, 28),
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 84,
              lineHeight: 1,
              letterSpacing: "-0.015em",
              color: ACCENT,
              textAlign: "right",
            }}
          >
            1958.07
          </div>
          <div
            style={{
              marginTop: 18,
              marginLeft: "auto",
              width: 440,
              height: 1,
              backgroundColor: ACCENT,
              opacity: 0.38,
              transformOrigin: "right center",
              transform: `scaleX(${EASE.outExpo(prog(frame, 30, 34))})`,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: 1190,
            top: 306,
            width: 480,
            height: 480,
            opacity: prog(frame, 26, 30) * 0.95,
          }}
        >
          <svg width={480} height={480} viewBox="0 0 480 480">
            <circle
              cx={240}
              cy={240}
              r={228}
              fill="none"
              stroke={ACCENT}
              strokeWidth={1}
              opacity={0.12}
            />
            <circle
              cx={240}
              cy={240}
              r={104}
              fill="none"
              stroke={ACCENT}
              strokeWidth={1}
              opacity={0.12}
            />
            <DrawPath
              d={ROSE}
              start={38}
              dur={86}
              stroke={ACCENT}
              width={1.5}
              opacity={0.42}
              endDot={false}
            />
            <circle cx={240} cy={240} r={3.6} fill={ACCENT} opacity={0.75} />
          </svg>
        </div>

        {/* ---------------- 左：感知机电路 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 200,
            width: 960,
            height: 560,
            background:
              "linear-gradient(180deg, rgba(243,240,231,0.025), rgba(243,240,231,0.008))",
            border: `1px solid ${COLORS.lineSoft}`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <svg width={960} height={560} viewBox="0 0 960 560" style={{ position: "absolute", inset: 0 }}>
            {/* 蓝图底稿 */}
            <g opacity={0.1 * prog(frame, 0, 18)} stroke={COLORS.ink} strokeWidth={1} fill="none">
              <path d="M 140 170 L 392 244" />
              <path d="M 140 260 L 392 260" />
              <path d="M 140 350 L 392 276" />
              <path d="M 508 260 L 626 260" />
              <path d="M 714 260 L 818 260" />
              <circle cx={110} cy={170} r={30} />
              <circle cx={110} cy={260} r={30} />
              <circle cx={110} cy={350} r={30} />
              <circle cx={450} cy={260} r={58} />
              <circle cx={670} cy={260} r={44} />
              <circle cx={850} cy={260} r={32} />
            </g>

            <g filter="url(#s03-rough)">
              {/* 输入 → 加权和 */}
              <DrawPath
                d="M 140 170 L 392 244"
                start={58}
                dur={38}
                stroke={COLORS.ink}
                width={2.3}
                opacity={0.84}
                endDot={false}
              />
              <DrawPath
                d="M 140 260 L 392 260"
                start={70}
                dur={38}
                stroke={COLORS.ink}
                width={2.3}
                opacity={0.84}
                endDot={false}
              />
              <DrawPath
                d="M 140 350 L 392 276"
                start={82}
                dur={38}
                stroke={COLORS.ink}
                width={2.3}
                opacity={0.84}
                endDot={false}
              />

              {/* 加权和 → 阈值 → 输出 */}
              <DrawPath
                d="M 508 260 L 626 260"
                start={136}
                dur={24}
                stroke={COLORS.ink}
                width={2.3}
                opacity={0.84}
                endDot={false}
              />
              <DrawPath
                d="M 714 260 L 818 260"
                start={172}
                dur={24}
                stroke={COLORS.ink}
                width={2.3}
                opacity={0.84}
                endDot={false}
              />

              {/* 方向箭头 */}
              <polygon
                points="620,253 634,260 620,267"
                fill={COLORS.ink}
                opacity={prog(frame, 156, 12) * 0.85}
              />
              <polygon
                points="812,253 826,260 812,267"
                fill={COLORS.ink}
                opacity={prog(frame, OUTPUT_AT, 12) * 0.85}
              />

              {/* 手绘辅助线 */}
              <path
                d="M 392 244 L 402 242"
                stroke={ACCENT}
                strokeWidth={1.3}
                opacity={prog(frame, 120, 12) * 0.32}
                fill="none"
              />
            </g>

            {/* 输入节点 */}
            {[
              { x: 110, y: 170, label: "x1", at: 32 },
              { x: 110, y: 260, label: "x2", at: 44 },
              { x: 110, y: 350, label: "x3", at: 56 },
            ].map((n) => (
              <g key={n.label} opacity={prog(frame, n.at, 22)}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={30}
                  fill={COLORS.paperDeep}
                  stroke={COLORS.ink}
                  strokeWidth={2}
                />
                <circle
                  cx={n.x + 1.2}
                  cy={n.y - 1.2}
                  r={30}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth={0.9}
                  opacity={0.42}
                />
                <text
                  x={n.x}
                  y={n.y + 8}
                  textAnchor="middle"
                  fontFamily={FONTS.mono}
                  fontSize={22}
                  fill={COLORS.ink}
                >
                  {n.label}
                </text>
              </g>
            ))}

            {/* 权重 */}
            {[
              { x: 236, y: 182, label: "w1 = +0.8" },
              { x: 232, y: 242, label: "w2 = −0.4" },
              { x: 260, y: 342, label: "w3 = +0.9" },
            ].map((w, i) => (
              <text
                key={w.label}
                x={w.x}
                y={w.y}
                fontFamily={FONTS.mono}
                fontSize={16.5}
                fill={COLORS.graphite}
                letterSpacing="0.04em"
                opacity={prog(frame, 92 + i * 10, 18) * 0.95}
              >
                {w.label}
              </text>
            ))}

            {/* Σ 节点 */}
            <g opacity={prog(frame, 116, 24)}>
              <circle
                cx={450}
                cy={260}
                r={58}
                fill={COLORS.paperWhite}
                stroke={COLORS.ink}
                strokeWidth={2}
              />
              <circle
                cx={451}
                cy={259}
                r={58}
                fill="none"
                stroke={ACCENT}
                strokeWidth={1}
                opacity={0.4}
              />
              <text
                x={450}
                y={278}
                textAnchor="middle"
                fontFamily={FONTS.serifLatin}
                fontSize={54}
                fill={COLORS.ink}
              >
                Σ
              </text>
            </g>

            {/* θ 节点 */}
            <g opacity={prog(frame, 152, 24)}>
              <circle
                cx={670}
                cy={260}
                r={44}
                fill={COLORS.paperDeep}
                stroke={COLORS.ink}
                strokeWidth={2}
              />
              <circle
                cx={671}
                cy={259}
                r={44}
                fill="none"
                stroke={ACCENT}
                strokeWidth={0.9}
                opacity={0.4}
              />
              <text
                x={670}
                y={276}
                textAnchor="middle"
                fontFamily={FONTS.serifLatin}
                fontSize={38}
                fill={COLORS.ink}
              >
                θ
              </text>
            </g>

            {/* 输出辉光 + 节点 */}
            <circle
              cx={850}
              cy={260}
              r={90}
              fill={ACCENT}
              opacity={(0.04 + glow * 0.16) * prog(frame, 196, 20)}
            />
            <circle
              cx={850}
              cy={260}
              r={ringR}
              fill="none"
              stroke={ACCENT}
              strokeWidth={2}
              opacity={ringO}
            />
            <g opacity={prog(frame, OUTPUT_AT, 24)}>
              <circle
                cx={850}
                cy={260}
                r={32}
                fill={COLORS.paperDeep}
                stroke={ACCENT}
                strokeWidth={2.6}
              />
              <text
                x={850}
                y={268}
                textAnchor="middle"
                fontFamily={FONTS.mono}
                fontSize={22}
                fill={COLORS.ink}
              >
                y
              </text>
            </g>

            {/* 必要的数据标签 */}
            <g
              fontFamily={FONTS.mono}
              fontSize={13}
              letterSpacing="0.14em"
              fill={COLORS.grey}
              opacity={prog(frame, 92, 24) * 0.72}
            >
              <text x={110} y={420} textAnchor="middle">
                INPUTS
              </text>
              <text x={450} y={352} textAnchor="middle">
                Σ w·x
              </text>
              <text x={670} y={332} textAnchor="middle">
                THRESHOLD
              </text>
              <text x={850} y={326} textAnchor="middle">
                OUT
              </text>
            </g>
          </svg>
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
            1958，感知机：第一个会学习的神经元。
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
            1958: the perceptron — the first neuron that learns.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：页入 / 输出节点点亮 */}
      <Sequence from={0} durationInFrames={50}>
        <Audio src={staticFile("sfx/page-flip.wav")} volume={0.32} />
      </Sequence>
      <Sequence from={OUTPUT_AT} durationInFrames={55}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.38} />
      </Sequence>
    </PaperStage>
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
