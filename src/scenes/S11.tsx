/**
 * S11 · 2012 AlexNet（480f，自 old-S06 拆页）
 * 错误率断崖曲线 +「15.3%」落拍。关键落点沿用 37.7f 起每 56.25f 的重拍网格。
 * 深色舞台 + 像素绿；不添加口径脚注或边角说明。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const G = ERA.pixel;
const rgba = (a: number): string => `rgba(127,176,138,${a})`;

const B = (i: number): number => 37.7 + i * 56.25;
const YEAR = Math.round(B(0));
const CHART = Math.round(B(1));
const HIT = Math.round(B(3));
const COPY = Math.round(B(4));

const CURVE = "M 250 108 L 610 142 L 960 258";

/** 镜末拼图块落位（全片母题） */
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
        stroke={G}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M18 38 H46"
        stroke={G}
        strokeWidth={1}
        strokeOpacity={0.3}
        strokeDasharray="2 4"
      />
    </svg>
  );
};

export const S11 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = prog(frame, 0, 7);
  const yearP = EASE.outExpo(prog(frame, YEAR, 24));
  const chartIn = EASE.outExpo(prog(frame, 52, 30));
  const hitP = EASE.outExpo(prog(frame, HIT, 24));
  const copy = Math.min(prog(frame, COPY, 28), 1);
  const copyEn = Math.min(prog(frame, COPY + 16, 28), 1);

  const pointIn = (at: number): number => EASE.outExpo(prog(frame, at, 18));
  const pulse = frame >= HIT ? 0.5 + 0.5 * Math.sin(((frame - HIT) / 56.25) * Math.PI * 2) : 0;

  return (
    <PaperStage dur={dur} tone="medium" creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 左上 kicker */}
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          学习时代 · 2012 ｜ THE LEARNING ERA
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 136,
            width: 300,
            height: 1,
            backgroundColor: G,
            opacity: 0.42,
            transformOrigin: "left center",
            transform: `scaleX(${EASE.outExpo(prog(frame, 10, 40))})`,
          }}
        />

        {/* 左：年份与模型名 */}
        <div
          style={{
            position: "absolute",
            left: 132,
            top: 202,
            fontFamily: FONTS.mono,
            fontSize: 230,
            lineHeight: 1,
            letterSpacing: "-0.055em",
            color: G,
            fontVariantNumeric: "tabular-nums",
            opacity: Math.min(1, prog(frame, YEAR, 7) * 1.5),
            transform: `translateY(${(1 - yearP) * 22}px) scale(${1 + (1 - yearP) * 0.06})`,
            transformOrigin: "left center",
          }}
        >
          2012
        </div>
        <div
          style={{
            position: "absolute",
            left: 142,
            top: 456,
            width: 460,
            height: 1,
            backgroundColor: G,
            opacity: 0.34 * yearP,
            transformOrigin: "left center",
            transform: `scaleX(${yearP})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 480,
            opacity: prog(frame, YEAR + 18, 24),
            transform: `translateY(${(1 - EASE.outExpo(prog(frame, YEAR + 18, 24))) * 10}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.serifLatin,
              fontWeight: 500,
              fontSize: 58,
              lineHeight: 1,
              letterSpacing: "0.01em",
              color: COLORS.ink,
            }}
          >
            ALEXNET
          </div>
        </div>

        {/* 右：错误率断崖 */}
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 178,
            width: 1080,
            height: 400,
            opacity: chartIn,
            transform: `translateY(${(1 - chartIn) * 14}px)`,
          }}
        >
          <svg width={1080} height={400} viewBox="0 0 1080 400">
            {/* 网格与坐标轴 */}
            <g stroke="rgba(243,240,231,0.16)" strokeWidth={1} opacity={prog(frame, 42, 24)}>
              <line x1={100} y1={42} x2={100} y2={350} />
              <line x1={100} y1={350} x2={1024} y2={350} />
              <line
                x1={100}
                y1={65}
                x2={1024}
                y2={65}
                strokeDasharray="2 7"
                opacity={0.72}
              />
              <line
                x1={100}
                y1={175}
                x2={1024}
                y2={175}
                strokeDasharray="2 7"
                opacity={0.72}
              />
              <line
                x1={100}
                y1={285}
                x2={1024}
                y2={285}
                strokeDasharray="2 7"
                opacity={0.72}
              />
            </g>

            <g
              fontFamily={FONTS.mono}
              fontSize={13}
              fill={COLORS.grey}
              letterSpacing="0.06em"
              opacity={prog(frame, 48, 24) * 0.92}
            >
              <text x={88} y={69} textAnchor="end">30%</text>
              <text x={88} y={179} textAnchor="end">20%</text>
              <text x={88} y={289} textAnchor="end">10%</text>
              <text x={250} y={382} textAnchor="middle">2010</text>
              <text x={610} y={382} textAnchor="middle">2011</text>
              <text x={960} y={382} textAnchor="middle">2012</text>
            </g>

            <text
              x={100}
              y={20}
              fontFamily={FONTS.mono}
              fontSize={15}
              letterSpacing="0.2em"
              fill={COLORS.grey}
              opacity={prog(frame, 52, 24) * 0.82}
            >
              TOP-5 ERROR · ILSVRC
            </text>

            {/* 断崖下淡影 */}
            <path
              d="M 610 142 L 960 258 L 960 350 L 610 350 Z"
              fill={G}
              opacity={prog(frame, CHART + 36, 42) * 0.06}
            />

            {/* 2012 竖直基准线 */}
            <line
              x1={960}
              y1={44}
              x2={960}
              y2={350}
              stroke={G}
              strokeWidth={1.2}
              strokeDasharray="3 6"
              opacity={prog(frame, HIT - 16, 28) * 0.46}
            />

            {/* 曲线 */}
            <g style={{ filter: "drop-shadow(0 0 9px rgba(127,176,138,0.32))" }}>
              <DrawPath
                d={CURVE}
                start={CHART}
                dur={72}
                stroke={G}
                width={3.6}
                opacity={0.96}
                endDot={false}
              />
            </g>

            {/* 数据点 */}
            {[
              { x: 250, y: 108, at: CHART },
              { x: 610, y: 142, at: CHART + 32 },
              { x: 960, y: 258, at: HIT },
            ].map((d) => {
              const p = pointIn(d.at);
              return (
                <circle
                  key={`${d.x}-${d.y}`}
                  cx={d.x}
                  cy={d.y}
                  r={4.5 * p}
                  fill={COLORS.paper}
                  stroke={G}
                  strokeWidth={2.2}
                  opacity={p}
                />
              );
            })}

            {/* 终点光晕 */}
            <circle
              cx={960}
              cy={258}
              r={16 + pulse * 5}
              fill="none"
              stroke={G}
              strokeWidth={1.2}
              opacity={prog(frame, HIT, 20) * (0.26 + pulse * 0.15)}
            />
            <circle
              cx={960}
              cy={258}
              r={9}
              fill={G}
              opacity={prog(frame, HIT, 20) * 0.18}
            />
          </svg>
        </div>

        {/* 15.3% 落拍 */}
        <div
          style={{
            position: "absolute",
            left: 754,
            top: 594,
            opacity: Math.min(1, prog(frame, HIT, 8) * 1.6),
            transform: `translateY(${(1 - hitP) * 20}px) scale(${1 + (1 - hitP) * 0.06})`,
            transformOrigin: "left bottom",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 150,
              lineHeight: 0.98,
              letterSpacing: "-0.055em",
              color: G,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            15.3%
          </div>
          <div
            style={{
              width: 530 * hitP,
              height: 2,
              marginTop: 13,
              backgroundColor: G,
              opacity: 0.42,
            }}
          />
        </div>

        {/* 主文案 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 74,
            maxWidth: 1360,
            borderLeft: `3px solid ${G}`,
            paddingLeft: 26,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 38, lineHeight: 1.5 }}>
            2012，AlexNet 把错误率砍到 15.3%——深度学习元年。
          </div>
          <div
            style={{
              ...TYPE.en,
              fontStyle: "italic",
              fontSize: 30,
              color: COLORS.grey,
              marginTop: 8,
              opacity: copyEn,
            }}
          >
            2012: AlexNet drops the error rate to 15.3% — deep learning takes off.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：曲线起笔 / 15.3% 落拍 */}
      <Sequence from={CHART} durationInFrames={70}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.24} />
      </Sequence>
      <Sequence from={HIT} durationInFrames={80}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.72} />
      </Sequence>
    </PaperStage>
  );
};
