/**
 * S10 · 2009 ImageNet（300f，自 old-S06 拆页）
 * 40 格「教科书」网格的前半段：蓝图槽位渐入，前 20 张抽象图逐拍钉入。
 * 不出现 AlexNet 错误率曲线；深色舞台 + 像素绿时代色。
 */
import type { CSSProperties } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

const G = ERA.pixel;
const rgba = (a: number): string => `rgba(127,176,138,${a})`;

const COLS = 8;
const ROWS = 5;
const TOTAL = COLS * ROWS;
const SHOWN = 20;
const CARD_W = 112;
const CARD_H = 100;
const GAP = 10;
const GRID_W = COLS * CARD_W + (COLS - 1) * GAP;
const B = (i: number): number => 37.7 + i * 56.25;

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

export const S10 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const fade = prog(frame, 0, 7);
  const copy = Math.min(prog(frame, 128, 26), 1);
  const copyEn = Math.min(prog(frame, 145, 26), 1);
  const dataIn = EASE.outExpo(prog(frame, 32, 30));
  const gridIn = EASE.outExpo(prog(frame, 16, 28));

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        {/* 左上 kicker */}
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          学习时代 · 2009 ｜ THE LEARNING ERA
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

        {/* 标题 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 188,
            display: "flex",
            alignItems: "baseline",
            gap: 20,
            opacity: EASE.outExpo(prog(frame, 14, 28)),
            transform: `translateY(${(1 - EASE.outExpo(prog(frame, 14, 28))) * 12}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.serifLatin,
              fontWeight: 500,
              fontSize: 58,
              letterSpacing: "0.015em",
              color: COLORS.ink,
            }}
          >
            IMAGENET
          </span>
          <span
            style={{
              width: 72,
              height: 2,
              marginBottom: 9,
              backgroundColor: G,
              opacity: 0.75,
            }}
          />
        </div>

        {/* 40 格教科书网格 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 272,
            width: GRID_W,
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, ${CARD_W}px)`,
            gridAutoRows: `${CARD_H}px`,
            gap: GAP,
            opacity: gridIn,
          }}
        >
          {Array.from({ length: TOTAL }, (_, i) => (
            <Tile key={i} index={i} frame={frame} />
          ))}
        </div>

        {/* 右：日期 / 数据 */}
        <div
          style={{
            position: "absolute",
            left: 1212,
            top: 198,
            width: 560,
            paddingLeft: 32,
            borderLeft: `1px solid ${rgba(0.24)}`,
            opacity: dataIn,
            transform: `translateY(${(1 - dataIn) * 16}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 30,
              letterSpacing: "0.18em",
              color: G,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            2009.06
          </div>
          <div
            style={{
              width: 190,
              height: 1,
              marginTop: 20,
              backgroundColor: G,
              opacity: 0.35,
            }}
          />
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "baseline",
              fontFamily: FONTS.mono,
              fontSize: 158,
              lineHeight: 0.92,
              letterSpacing: "-0.055em",
              color: COLORS.ink,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            14<span style={{ color: G }}>M</span>
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: FONTS.mono,
              fontSize: 18,
              lineHeight: 1.6,
              letterSpacing: "0.16em",
              color: COLORS.grey,
            }}
          >
            IMAGES
            <br />
            1,000 CLASSES
          </div>
        </div>

        {/* 主文案 */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 78,
            maxWidth: 1380,
            borderLeft: `3px solid ${G}`,
            paddingLeft: 26,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 40, lineHeight: 1.5 }}>
            2009，李飞飞团队给机器备好一本教科书：1400 万张图。
          </div>
          <div
            style={{
              ...TYPE.en,
              fontStyle: "italic",
              fontSize: 31,
              color: COLORS.grey,
              marginTop: 8,
              opacity: copyEn,
            }}
          >
            2009: a textbook of 14 million images.
          </div>
        </div>
      </AbsoluteFill>

      {/* SFX：前半段钉图，两枚 */}
      <Sequence from={Math.round(B(0))} durationInFrames={50}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={Math.round(B(2))} durationInFrames={50}>
        <Audio src={staticFile("sfx/ui-ping.wav")} volume={0.2} />
      </Sequence>
    </PaperStage>
  );
};

/* ---------------------------------------------------------------- 网格单格 */

const Tile = ({ index, frame }: { index: number; frame: number }) => {
  const pinned = index < SHOWN;
  const row = Math.floor(index / COLS);
  const col = index % COLS;
  const start = B(row) + col * 3.2;
  const p = pinned ? EASE.outExpo(prog(frame, start, 22)) : 0;
  const ghost = EASE.outExpo(prog(frame, 20 + index * 0.8, 30));

  const card: CSSProperties = {
    width: CARD_W,
    height: CARD_H,
    position: "relative",
  };

  return (
    <div style={card}>
      {/* 蓝图槽位 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `1px dashed ${rgba(0.24)}`,
          borderRadius: 4,
          opacity: ghost * (pinned ? 0.55 * (1 - p * 0.5) : 0.9),
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 22,
            height: 1,
            backgroundColor: G,
            opacity: 0.28,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 1,
            height: 22,
            backgroundColor: G,
            opacity: 0.28,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* 钉入的抽象图 */}
      {pinned ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: 4,
            backgroundColor: COLORS.deep,
            border: `1px solid ${rgba(0.2 + p * 0.26)}`,
            boxShadow: `0 ${(1 - p) * 8 + 6}px ${14 + p * 8}px rgba(0,0,0,0.32)`,
            opacity: Math.min(1, p * 1.4),
            transform: `translateY(${(1 - p) * -10}px) scale(${0.97 + p * 0.03})`,
          }}
        >
          <Thumb index={index} />
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
              boxShadow: `0 1px 4px rgba(0,0,0,0.55), 0 0 ${8 + p * 8}px ${rgba(
                0.18 * p,
              )}`,
              opacity: Math.min(1, p * 1.5),
              transform: `translateY(${(1 - p) * -7}px)`,
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

/* ---------------------------------------------------------------- 抽象缩略图 */

const Thumb = ({ index }: { index: number }) => {
  const kind = index % 10;
  const rnd = mulberry32(2009 + index * 97);
  const warm = COLORS.ink;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 90"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width={100} height={90} fill="rgba(243,240,231,0.035)" />
      {kind === 0 ? (
        <>
          <circle cx={50} cy={46} r={30} fill="none" stroke={G} strokeWidth={1.6} opacity={0.53} />
          <circle cx={50} cy={46} r={21} fill="none" stroke={G} strokeWidth={1.6} opacity={0.68} />
          <circle cx={50} cy={46} r={12} fill={G} opacity={0.18} />
          <circle cx={50} cy={46} r={3.2} fill={G} />
          <line x1={50} y1={16} x2={50} y2={76} stroke={warm} strokeWidth={0.8} opacity={0.2} />
        </>
      ) : null}
      {kind === 1 ? (
        <>
          <circle cx={70} cy={27} r={10} fill={G} opacity={0.3} stroke={G} strokeWidth={1.4} />
          <path
            d="M 4 78 L 34 34 L 54 60 L 68 46 L 98 78 Z"
            fill={G}
            fillOpacity={0.16}
            stroke={G}
            strokeWidth={1.5}
          />
          <path
            d="M 20 78 L 46 48 L 64 68 L 80 56 L 98 78"
            fill="none"
            stroke={warm}
            strokeWidth={0.9}
            opacity={0.3}
          />
          <line x1={0} y1={80} x2={100} y2={80} stroke={warm} strokeWidth={1} opacity={0.2} />
        </>
      ) : null}
      {kind === 2 ? (
        <>
          {Array.from({ length: 24 }, (_, i) => {
            const x = 14 + (i % 6) * 14;
            const y = 16 + Math.floor(i / 6) * 16;
            return <circle key={i} cx={x} cy={y} r={2.2} fill={G} opacity={0.2 + rnd() * 0.45} />;
          })}
          <line x1={8} y1={80} x2={92} y2={10} stroke={warm} strokeWidth={1} opacity={0.26} />
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
              stroke={i % 3 === 0 ? warm : G}
              strokeWidth={i % 3 === 0 ? 1 : 4}
              opacity={0.12 + (i % 3) * 0.11}
            />
          ))}
          <rect x={20} y={20} width={60} height={50} fill={COLORS.paperDeep} opacity={0.52} />
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
          <circle cx={50} cy={45} r={4} fill={warm} opacity={0.25} />
        </>
      ) : null}
      {kind === 5 ? (
        <>
          <path
            d="M 2 45 C 16 16, 30 74, 44 45 S 72 16, 86 45 S 94 60, 98 45"
            fill="none"
            stroke={G}
            strokeWidth={2}
            opacity={0.75}
          />
          <path
            d="M 2 61 C 16 32, 30 90, 44 61 S 72 32, 86 61 S 94 76, 98 61"
            fill="none"
            stroke={warm}
            strokeWidth={0.9}
            opacity={0.24}
          />
          <path
            d="M 2 29 C 16 0, 30 58, 44 29 S 72 0, 86 29 S 94 44, 98 29"
            fill="none"
            stroke={G}
            strokeWidth={1}
            opacity={0.35}
          />
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
                fill={r === 2 && c === 1 ? warm : G}
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
          <circle cx={50} cy={45} r={9} fill="none" stroke={warm} strokeWidth={0.9} opacity={0.24} />
          <circle cx={50} cy={45} r={3} fill={G} />
        </>
      ) : null}
      {kind === 8 ? (
        <>
          <path d="M 12 60 A 20 20 0 0 1 52 60 Z" fill={G} opacity={0.3} />
          <path d="M 34 60 A 24 24 0 0 1 82 60 Z" fill={warm} opacity={0.12} />
          <path d="M 52 30 A 16 16 0 0 1 84 30 Z" fill={G} opacity={0.16} />
          <line x1={8} y1={60} x2={92} y2={60} stroke={warm} strokeWidth={0.9} opacity={0.24} />
        </>
      ) : null}
      {kind === 9 ? (
        <>
          <line x1={50} y1={12} x2={50} y2={78} stroke={warm} strokeWidth={0.9} opacity={0.24} />
          <line x1={12} y1={45} x2={88} y2={45} stroke={warm} strokeWidth={0.9} opacity={0.24} />
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
