/**
 * S06 · ImageNet 与 AlexNet（52s–63.5s · 690f）
 * 像素绿：程序绘制的抽象图片一张张钉进「教科书」网格（40 格，按拍逐行），
 * 右栏 AlexNet 错误率断崖，「15.3%」落拍。不得使用真实照片。
 */
import type { CSSProperties } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

const B = (i: number): number => Math.round(37.7 + i * 56.25);
const CHART = B(4);
const HIT = B(6);
const G = ERA.pixel;
const rgba = (a: number): string => `rgba(74,124,89,${a})`;

const COLS = 8;
const ROWS = 5;
const CARD_W = 104;
const CARD_H = 92;
const GAP = 10;
const GRID_W = COLS * CARD_W + (COLS - 1) * GAP;

export const S06 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = Math.min(prog(frame, 0, 12), 1 - prog(frame, dur - 14, 14));
  const copy = Math.min(prog(frame, 120, 26), 1 - prog(frame, dur - 14, 14));
  const copyEn = Math.min(prog(frame, 140, 26), 1 - prog(frame, dur - 14, 14));
  const hitP = EASE.outExpo(prog(frame, HIT, 26));

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 章节标签 */}
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          学习时代 · 2009–2012 ｜ THE LEARNING ERA
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

        {/* ---------------- 左：ImageNet 网格 ---------------- */}
        <div style={{ position: "absolute", left: 140, top: 190, width: GRID_W }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11.5,
              letterSpacing: "0.2em",
              color: COLORS.grey,
              opacity: prog(frame, 12, 24) * 0.9,
            }}
          >
            CHAPTER 01 · A TEXTBOOK OF IMAGES
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 16 }}>
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 46,
                letterSpacing: "0.02em",
                color: COLORS.ink,
                opacity: prog(frame, 14, 28),
              }}
            >
              IMAGENET
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 19,
                letterSpacing: "0.12em",
                color: G,
                opacity: prog(frame, 24, 24),
              }}
            >
              2009
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: FONTS.mono,
                fontSize: 11,
                letterSpacing: "0.12em",
                color: COLORS.grey,
                opacity: prog(frame, 30, 24) * 0.85,
              }}
            >
              14M IMAGES · 1,000 CLASSES
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 140,
            top: 266,
            width: GRID_W,
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, ${CARD_W}px)`,
            gridAutoRows: `${CARD_H}px`,
            gap: GAP,
            opacity: prog(frame, 0, 18),
          }}
        >
          {Array.from({ length: COLS * ROWS }, (_, i) => (
            <Tile key={i} index={i} frame={frame} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 772,
            width: GRID_W,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: FONTS.mono,
            fontSize: 10.5,
            letterSpacing: "0.16em",
            color: COLORS.grey,
            opacity: prog(frame, 60, 30) * 0.75,
          }}
        >
          <span>PINNED BY PEOPLE · LABELLED BY HAND</span>
          <span>IMAGE 001 / 040</span>
        </div>

        {/* ---------------- 右：AlexNet 曲线 ---------------- */}
        <div style={{ position: "absolute", left: 1120, top: 190, width: 660 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11.5,
              letterSpacing: "0.2em",
              color: COLORS.grey,
              opacity: prog(frame, 14, 24) * 0.9,
            }}
          >
            IMAGE CLASSIFICATION · ILSVRC
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 16 }}>
            <span
              style={{
                fontFamily: FONTS.serifLatin,
                fontWeight: 500,
                fontSize: 46,
                letterSpacing: "0.02em",
                color: COLORS.ink,
                opacity: prog(frame, 18, 28),
              }}
            >
              ALEXNET
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 19,
                letterSpacing: "0.12em",
                color: G,
                opacity: prog(frame, 26, 24),
              }}
            >
              2012
            </span>
          </div>

          <div style={{ position: "relative", marginTop: 22, width: 660, height: 300 }}>
            <svg width={660} height={300} viewBox="0 0 660 300">
              {/* 坐标轴 / 网格 */}
              <g stroke={COLORS.ink} strokeWidth={1} opacity={prog(frame, 16, 24) * 0.2}>
                <line x1={50} y1={24} x2={50} y2={270} />
                <line x1={50} y1={270} x2={634} y2={270} />
                <line x1={50} y1={50} x2={634} y2={50} strokeDasharray="2 6" />
                <line x1={50} y1={150} x2={634} y2={150} strokeDasharray="2 6" />
                <line x1={50} y1={250} x2={634} y2={250} strokeDasharray="2 6" />
              </g>
              <g
                fontFamily={FONTS.mono}
                fontSize={11}
                fill={COLORS.grey}
                opacity={prog(frame, 22, 24) * 0.9}
              >
                <text x={38} y={54} textAnchor="end">30%</text>
                <text x={38} y={154} textAnchor="end">20%</text>
                <text x={38} y={254} textAnchor="end">10%</text>
                <text x={100} y={290} textAnchor="middle">2010</text>
                <text x={310} y={290} textAnchor="middle">2011</text>
                <text x={570} y={290} textAnchor="middle">2012</text>
              </g>

              {/* 断崖下方淡影 */}
              <path
                d="M 310 92 L 570 197 L 570 270 L 310 270 Z"
                fill={G}
                opacity={prog(frame, CHART + 30, 40) * 0.08}
              />

              {/* 2012 竖虚线 */}
              <line
                x1={570}
                y1={44}
                x2={570}
                y2={270}
                stroke={G}
                strokeWidth={1.2}
                strokeDasharray="3 5"
                opacity={prog(frame, CHART + 20, 30) * 0.42}
              />

              {/* 断崖箭头 */}
              <g
                stroke={G}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                opacity={prog(frame, CHART + 10, 20) * 0.55}
              >
                <path d="M 452 106 L 452 184" />
                <path d="M 445 174 L 452 186 L 459 174" />
              </g>

              {/* 错误率曲线 */}
              <DrawPath
                d="M 100 68 L 310 92 L 570 197"
                start={CHART}
                dur={92}
                stroke={G}
                width={3.4}
                opacity={0.95}
                endDot={false}
              />

              {/* 数据点 */}
              {[
                { x: 100, y: 68, at: CHART },
                { x: 310, y: 92, at: CHART + 30 },
                { x: 570, y: 197, at: CHART + 80 },
              ].map((d) => (
                <circle
                  key={`${d.x}-${d.y}`}
                  cx={d.x}
                  cy={d.y}
                  r={4.5}
                  fill={COLORS.paperWhite}
                  stroke={G}
                  strokeWidth={2.2}
                  opacity={prog(frame, d.at, 20)}
                />
              ))}
              <circle
                cx={570}
                cy={197}
                r={10}
                fill="none"
                stroke={G}
                strokeWidth={1.2}
                opacity={prog(frame, CHART + 80, 24) * 0.45}
              />
            </svg>
          </div>

          <div
            style={{
              marginTop: 6,
              fontFamily: FONTS.mono,
              fontSize: 12,
              letterSpacing: "0.2em",
              color: COLORS.grey,
              opacity: Math.min(1, prog(frame, HIT - 16, 20) * 1.4),
            }}
          >
            TOP-5 ERROR · 2012
          </div>

          <div
            style={{
              marginTop: 2,
              fontFamily: FONTS.mono,
              fontWeight: 400,
              fontSize: 138,
              lineHeight: 0.98,
              letterSpacing: "-0.05em",
              color: G,
              fontVariantNumeric: "tabular-nums",
              opacity: Math.min(1, prog(frame, HIT, 8) * 1.6),
              transform: `translateY(${(1 - hitP) * 20}px) scale(${1 + (1 - hitP) * 0.065})`,
              transformOrigin: "left bottom",
            }}
          >
            15.3%
          </div>
          <div
            style={{
              width: 545,
              height: 2,
              backgroundColor: G,
              opacity: Math.min(1, prog(frame, HIT + 18, 24) * 0.45),
              marginTop: 12,
            }}
          />
          <div
            style={{
              marginTop: 9,
              fontFamily: FONTS.sansCN,
              fontSize: 15,
              letterSpacing: "0.03em",
              color: COLORS.grey,
              opacity: Math.min(0.72, prog(frame, HIT + 18, 24) * 0.72),
            }}
          >
            论文口径 · 7 模型集成（官方 16.4%）
          </div>
        </div>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 96,
            maxWidth: 1570,
            borderLeft: `3px solid ${G}`,
            paddingLeft: 26,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 40, lineHeight: 1.5 }}>
            2009 一本给机器的「教科书」；2012 它开始自己学会「看」。
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
            2009: a textbook of images. 2012: the machine starts to see.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：图钉 / 第二行 / 曲线 / 15.3% */}
      <Sequence from={B(0)} durationInFrames={60}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={B(2)} durationInFrames={60}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.22} />
      </Sequence>
      <Sequence from={CHART} durationInFrames={90}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.32} />
      </Sequence>
      <Sequence from={HIT} durationInFrames={90}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.7} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 网格单格 */

const Tile = ({ index, frame }: { index: number; frame: number }) => {
  const row = Math.floor(index / COLS);
  const col = index % COLS;
  const start = B(row) + col * 2.5;
  const p = EASE.outExpo(prog(frame, start, 24));

  const card: CSSProperties = {
    width: CARD_W,
    height: CARD_H,
    position: "relative",
    backgroundColor: COLORS.paperWhite,
    border: `1px solid ${COLORS.line}`,
    borderRadius: 4,
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(31,30,29,0.05)",
  };

  return (
    <div style={card}>
      {/* 空位标记 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: (1 - p) * 0.35,
        }}
      >
        <svg width={16} height={16} viewBox="0 0 16 16">
          <path d="M 8 3 L 8 13 M 3 8 L 13 8" stroke={G} strokeWidth={1.2} opacity={0.5} />
        </svg>
      </div>

      {/* 抽象缩略图 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: p,
          transform: `translateY(${(1 - p) * 8}px) scale(${0.97 + p * 0.03})`,
        }}
      >
        <Thumb index={index} />
        <div
          style={{
            position: "absolute",
            left: 6,
            bottom: 4,
            fontFamily: FONTS.mono,
            fontSize: 7.5,
            letterSpacing: "0.08em",
            color: COLORS.graphite,
            opacity: 0.55,
          }}
        >
          {String(index + 1).padStart(4, "0")}
        </div>
      </div>

      {/* 图钉 */}
      <div
        style={{
          position: "absolute",
          left: CARD_W / 2 - 3.5,
          top: -4,
          width: 7,
          height: 7,
          borderRadius: 99,
          backgroundColor: G,
          border: `1px solid ${COLORS.paperWhite}`,
          boxShadow: "0 1px 3px rgba(20,20,19,0.35)",
          opacity: Math.min(1, p * 1.5),
          transform: `translateY(${(1 - p) * -6}px)`,
        }}
      />
    </div>
  );
};

/* ---------------------------------------------------------------- 抽象缩略图 */

const Thumb = ({ index }: { index: number }) => {
  const kind = index % 10;
  const rnd = mulberry32(2009 + index * 97);
  const ink = COLORS.ink;

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width={100} height={90} fill={rgba(0.025)} />
      {kind === 0 ? (
        <>
          <circle cx={50} cy={46} r={30} fill="none" stroke={G} strokeWidth={1.6} opacity={0.55} />
          <circle cx={50} cy={46} r={21} fill="none" stroke={G} strokeWidth={1.6} opacity={0.7} />
          <circle cx={50} cy={46} r={12} fill={G} opacity={0.16} />
          <circle cx={50} cy={46} r={3.2} fill={G} />
          <line x1={50} y1={16} x2={50} y2={76} stroke={ink} strokeWidth={0.8} opacity={0.16} />
        </>
      ) : null}
      {kind === 1 ? (
        <>
          <circle cx={70} cy={27} r={10} fill={G} opacity={0.3} stroke={G} strokeWidth={1.4} />
          <path d="M 4 78 L 34 34 L 54 60 L 68 46 L 98 78 Z" fill={G} fillOpacity={0.14} stroke={G} strokeWidth={1.5} />
          <path d="M 20 78 L 46 48 L 64 68 L 80 56 L 98 78" fill="none" stroke={ink} strokeWidth={0.9} opacity={0.28} />
          <line x1={0} y1={80} x2={100} y2={80} stroke={ink} strokeWidth={1} opacity={0.18} />
        </>
      ) : null}
      {kind === 2 ? (
        <>
          {Array.from({ length: 24 }, (_, i) => {
            const x = 14 + (i % 6) * 14;
            const y = 16 + Math.floor(i / 6) * 16;
            return <circle key={i} cx={x} cy={y} r={2.2} fill={G} opacity={0.2 + rnd() * 0.45} />;
          })}
          <line x1={8} y1={80} x2={92} y2={10} stroke={ink} strokeWidth={1} opacity={0.24} />
        </>
      ) : null}
      {kind === 3 ? (
        <>
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={i}
              x1={-30 + i * 18}
              y1={96}
              x2={24 + i * 18}
              y2={-6}
              stroke={i % 3 === 0 ? ink : G}
              strokeWidth={i % 3 === 0 ? 1 : 4}
              opacity={0.12 + (i % 3) * 0.11}
            />
          ))}
          <rect x={20} y={20} width={60} height={50} fill={COLORS.paperWhite} opacity={0.36} />
        </>
      ) : null}
      {kind === 4 ? (
        <>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={24 + i * 7}
              y={18 + i * 7}
              width={52 - i * 14}
              height={54 - i * 14}
              fill="none"
              stroke={G}
              strokeWidth={1.5}
              opacity={0.7 - i * 0.12}
              transform={`rotate(${8 + i * 3} 50 45)`}
            />
          ))}
          <circle cx={50} cy={45} r={4} fill={ink} opacity={0.22} />
        </>
      ) : null}
      {kind === 5 ? (
        <>
          <path d="M 2 45 C 16 16, 30 74, 44 45 S 72 16, 86 45 S 94 60, 98 45" fill="none" stroke={G} strokeWidth={2} opacity={0.75} />
          <path d="M 2 61 C 16 32, 30 90, 44 61 S 72 32, 86 61 S 94 76, 98 61" fill="none" stroke={ink} strokeWidth={0.9} opacity={0.22} />
          <path d="M 2 29 C 16 0, 30 58, 44 29 S 72 0, 86 29 S 94 44, 98 29" fill="none" stroke={G} strokeWidth={1} opacity={0.35} />
        </>
      ) : null}
      {kind === 6 ? (
        <>
          {Array.from({ length: 16 }, (_, i) => {
            const c = i % 4;
            const r = Math.floor(i / 4);
            const v = rnd();
            return (
              <rect
                key={i}
                x={22 + c * 14}
                y={16 + r * 14}
                width={14}
                height={14}
                fill={r === 2 && c === 1 ? ink : G}
                opacity={r === 2 && c === 1 ? 0.18 : 0.08 + v * 0.35}
              />
            );
          })}
        </>
      ) : null}
      {kind === 7 ? (
        <>
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={50 + Math.cos(a) * 12}
                y1={45 + Math.sin(a) * 12}
                x2={50 + Math.cos(a) * 42}
                y2={45 + Math.sin(a) * 38}
                stroke={G}
                strokeWidth={1.3}
                opacity={0.28 + (i % 3) * 0.16}
              />
            );
          })}
          <circle cx={50} cy={45} r={9} fill="none" stroke={ink} strokeWidth={0.9} opacity={0.22} />
          <circle cx={50} cy={45} r={3} fill={G} />
        </>
      ) : null}
      {kind === 8 ? (
        <>
          <path d="M 12 60 A 20 20 0 0 1 52 60 Z" fill={G} opacity={0.3} />
          <path d="M 34 60 A 24 24 0 0 1 82 60 Z" fill={ink} opacity={0.1} />
          <path d="M 52 30 A 16 16 0 0 1 84 30 Z" fill={G} opacity={0.16} />
          <line x1={8} y1={60} x2={92} y2={60} stroke={ink} strokeWidth={0.9} opacity={0.22} />
        </>
      ) : null}
      {kind === 9 ? (
        <>
          <line x1={50} y1={12} x2={50} y2={78} stroke={ink} strokeWidth={0.9} opacity={0.22} />
          <line x1={12} y1={45} x2={88} y2={45} stroke={ink} strokeWidth={0.9} opacity={0.22} />
          <circle cx={50} cy={45} r={17} fill="none" stroke={G} strokeWidth={1.4} opacity={0.55} />
          {Array.from({ length: 10 }, (_, i) => (
            <circle
              key={i}
              cx={16 + rnd() * 68}
              cy={16 + rnd() * 58}
              r={1.4 + rnd() * 2.2}
              fill={G}
              opacity={0.2 + rnd() * 0.4}
            />
          ))}
        </>
      ) : null}
    </svg>
  );
};
