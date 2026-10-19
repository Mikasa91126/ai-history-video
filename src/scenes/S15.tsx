/**
 * S15 · 2018 GPT-1 与 BERT（107s–114s · 420f）｜注意力靛
 * 预训练 → 微调的小流程图：语料进入预训练，分叉为 GPT 自回归与 BERT 双向掩码，
 * 再汇入微调。2018.06 / 2018.10 分别落在两条分支上；所有落点贴 56.25f 拍网格。
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { DrawPath } from "../comps/wire";
import { COLORS, EASE, ERA, FONTS } from "../theme";
import { prog } from "../lib/anim";

const IND = ERA.indigo;
const BEAT = 56.25;
const T0 = 37.7;
const GPT_AT = T0 + BEAT; // 93.95
const BERT_AT = T0 + BEAT * 2; // 150.20
const TUNE_AT = T0 + BEAT * 3; // 206.45
const COPY_AT = T0 + BEAT * 4; // 262.70

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
        stroke={IND}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M18 38 H46" stroke={IND} strokeWidth={1} strokeOpacity={0.3} strokeDasharray="2 4" />
    </svg>
  );
};

const Token = ({
  children,
  active = false,
  style,
}: {
  children: ReactNode;
  active?: boolean;
  style?: CSSProperties;
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: 34,
      padding: "0 10px",
      borderRadius: 6,
      border: `1px solid ${active ? IND : COLORS.line}`,
      backgroundColor: active ? "rgba(143,166,217,0.18)" : "rgba(243,240,231,0.04)",
      color: active ? IND : COLORS.ink,
      fontFamily: FONTS.mono,
      fontSize: 17,
      letterSpacing: "0.02em",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </span>
);

const NextArrow = () => (
  <span
    style={{
      color: IND,
      fontFamily: FONTS.mono,
      fontSize: 16,
      opacity: 0.7,
      padding: "0 5px",
    }}
  >
    →
  </span>
);

/** 双向箭头（BERT 看两边） */
const BiArrow = () => (
  <svg width={24} height={12} viewBox="0 0 24 12" style={{ flexShrink: 0, opacity: 0.8 }}>
    <path d="M 2 6 H 22" stroke={IND} strokeWidth={1.4} fill="none" />
    <path d="M 2 6 L 7 2 M 2 6 L 7 10" stroke={IND} strokeWidth={1.4} fill="none" />
    <path d="M 22 6 L 17 2 M 22 6 L 17 10" stroke={IND} strokeWidth={1.4} fill="none" />
  </svg>
);

const ArrowHead = ({ x, y, p }: { x: number; y: number; p: number }) => {
  if (p <= 0) return null;
  return (
    <g transform={`translate(${x} ${y})`} opacity={p}>
      <path d="M -8 -5 L 2 0 L -8 5 Z" fill={IND} />
    </g>
  );
};

const BranchCard = ({
  name,
  date,
  mode,
  caption,
  top,
  p,
  children,
}: {
  name: string;
  date: string;
  mode: string;
  caption: string;
  top: number;
  p: number;
  children: ReactNode;
}) => {
  if (p <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 980,
        top,
        width: 470,
        height: 186,
        borderRadius: 8,
        border: `1px solid ${COLORS.line}`,
        backgroundColor: "rgba(143,166,217,0.055)",
        boxShadow: "0 18px 44px rgba(0,0,0,0.18)",
        opacity: p,
        transform: `translateX(${(1 - p) * 26}px)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: IND,
          opacity: 0.85,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          padding: "14px 22px 0 24px",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.serifLatin,
            fontWeight: 500,
            fontSize: 38,
            lineHeight: 1.1,
            color: COLORS.ink,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 18,
            letterSpacing: "0.12em",
            color: IND,
            whiteSpace: "nowrap",
          }}
        >
          {date}
        </span>
      </div>
      <div
        style={{
          padding: "5px 24px 0",
          fontFamily: FONTS.mono,
          fontSize: 13,
          letterSpacing: "0.15em",
          color: COLORS.grey,
          opacity: 0.85,
          whiteSpace: "nowrap",
        }}
      >
        {mode}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "14px 22px 0 24px",
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 12,
          fontFamily: FONTS.mono,
          fontSize: 12.5,
          letterSpacing: "0.16em",
          color: COLORS.grey,
          opacity: 0.75,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

export const S15 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const fade = prog(frame, 0, 7);

  const corpusIn = EASE.outExpo(prog(frame, 8, 30));
  const preIn = EASE.outExpo(prog(frame, T0, 30));
  const preBar = EASE.outExpo(prog(frame, T0, 24));
  const gptP = EASE.outExpo(prog(frame, GPT_AT, 28));
  const bertP = EASE.outExpo(prog(frame, BERT_AT, 28));
  const tuneIn = EASE.outExpo(prog(frame, TUNE_AT, 30));
  const copyIn = EASE.outExpo(prog(frame, COPY_AT, 32));

  const corpusLine = EASE.draw(prog(frame, T0 - 16, 24));
  const forkUp = EASE.draw(prog(frame, GPT_AT - 12, 26));
  const forkDown = EASE.draw(prog(frame, BERT_AT - 12, 26));
  const tuneInPath = EASE.draw(prog(frame, TUNE_AT - 28, 28));
  const tuneFinal = EASE.draw(prog(frame, TUNE_AT - 8, 22));

  const corpusLines = [220, 250, 170, 232, 148, 202];

  return (
    <PaperStage dur={dur} tone="medium" grid creep="push">
      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: "absolute", left: 140, top: 96, ...TYPE.label }}>
          预训练 → 微调 · 2018
        </div>

        {/* ---------------- 左：语料 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 350,
            width: 300,
            height: 300,
            borderRadius: 8,
            border: `1px solid ${COLORS.line}`,
            backgroundColor: "rgba(243,240,231,0.03)",
            opacity: corpusIn,
            transform: `translateY(${(1 - corpusIn) * 18}px)`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "17px 22px 0",
              fontFamily: FONTS.mono,
              fontSize: 14,
              letterSpacing: "0.18em",
              color: COLORS.grey,
              opacity: 0.85,
            }}
          >
            语料 / CORPUS
          </div>
          <div style={{ position: "relative", margin: "24px 22px 0", height: 200 }}>
            {corpusLines.map((w, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  top: i * 29,
                  width: w,
                  height: 7,
                  borderRadius: 3,
                  backgroundColor:
                    i === 3 ? "rgba(143,166,217,0.42)" : "rgba(243,240,231,0.15)",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                display: "flex",
                gap: 7,
              }}
            >
              {Array.from({ length: 7 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 2,
                    backgroundColor: i === 4 ? IND : "rgba(243,240,231,0.18)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- 中：预训练 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 548,
            top: 400,
            width: 270,
            height: 200,
            borderRadius: 8,
            border: `1.5px solid rgba(143,166,217,0.55)`,
            backgroundColor: "rgba(143,166,217,0.10)",
            boxShadow: "0 18px 44px rgba(0,0,0,0.22)",
            opacity: preIn,
            transform: `translateY(${(1 - preIn) * 20}px) scale(${0.96 + 0.04 * preIn})`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 6,
              backgroundColor: IND,
              opacity: 0.9,
              transform: `scaleX(${preBar})`,
              transformOrigin: "0% 50%",
            }}
          />
          <div style={{ padding: "30px 24px 0" }}>
            <div
              style={{
                fontFamily: FONTS.serifCN,
                fontWeight: 500,
                fontSize: 38,
                lineHeight: 1.15,
                letterSpacing: "0.04em",
                color: COLORS.ink,
              }}
            >
              预训练
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: FONTS.mono,
                fontSize: 13,
                letterSpacing: "0.22em",
                color: IND,
              }}
            >
              PRETRAIN
            </div>
            <div
              style={{
                marginTop: 16,
                fontFamily: FONTS.sansCN,
                fontSize: 15,
                lineHeight: 1.5,
                color: COLORS.grey,
              }}
            >
              从大规模文本里学习结构
            </div>
          </div>
        </div>

        {/* ---------------- 分支 ---------------- */}
        <BranchCard
          name="GPT-1"
          date="2018.06"
          mode="自回归 / AUTOREGRESSIVE"
          caption="下一词 / NEXT TOKEN"
          top={272}
          p={gptP}
        >
          <Token>The</Token>
          <NextArrow />
          <Token>cat</Token>
          <NextArrow />
          <Token>sat</Token>
          <NextArrow />
          <Token active>?</Token>
        </BranchCard>

        <BranchCard
          name="BERT"
          date="2018.10"
          mode="双向掩码 / BIDIRECTIONAL MASK"
          caption="看两边 / BOTH SIDES"
          top={542}
          p={bertP}
        >
          <Token>The</Token>
          <BiArrow />
          <Token active>[MASK]</Token>
          <BiArrow />
          <Token>sat</Token>
        </BranchCard>

        {/* ---------------- 右：微调 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 1550,
            top: 415,
            width: 230,
            height: 170,
            borderRadius: 8,
            border: `1.5px solid rgba(143,166,217,0.6)`,
            backgroundColor: "rgba(143,166,217,0.06)",
            opacity: tuneIn,
            transform: `translateY(${(1 - tuneIn) * 20}px) scale(${0.95 + 0.05 * tuneIn})`,
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 4,
              backgroundColor: IND,
              opacity: 0.9,
            }}
          />
          <div style={{ padding: "30px 14px 0" }}>
            <div
              style={{
                fontFamily: FONTS.serifCN,
                fontWeight: 500,
                fontSize: 34,
                lineHeight: 1.15,
                letterSpacing: "0.04em",
                color: COLORS.ink,
              }}
            >
              微调
            </div>
            <div
              style={{
                marginTop: 5,
                fontFamily: FONTS.mono,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: IND,
              }}
            >
              FINE-TUNE
            </div>
            <div
              style={{
                margin: "16px auto 0",
                width: 130,
                height: 1,
                backgroundColor: COLORS.line,
              }}
            />
            <div
              style={{
                marginTop: 12,
                fontFamily: FONTS.sansCN,
                fontSize: 14,
                lineHeight: 1.5,
                color: COLORS.grey,
              }}
            >
              分类 · 问答 · 推理
            </div>
          </div>
        </div>

        {/* ---------------- 连接线 ---------------- */}
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
        >
          <DrawPath
            d="M 440 500 H 540"
            start={T0 - 16}
            dur={24}
            stroke={IND}
            width={2}
            opacity={0.62}
            endDot={false}
          />
          <ArrowHead x={548} y={500} p={corpusLine} />
          <DrawPath
            d="M 818 500 H 900"
            start={T0 + 4}
            dur={22}
            stroke={IND}
            width={2}
            opacity={0.62}
            endDot={false}
          />
          <DrawPath
            d="M 900 500 V 365 H 970"
            start={GPT_AT - 12}
            dur={26}
            stroke={IND}
            width={2}
            opacity={0.62}
            endDot={false}
          />
          <DrawPath
            d="M 900 500 V 635 H 970"
            start={BERT_AT - 12}
            dur={26}
            stroke={IND}
            width={2}
            opacity={0.62}
            endDot={false}
          />
          <ArrowHead x={978} y={365} p={forkUp} />
          <ArrowHead x={978} y={635} p={forkDown} />
          <DrawPath
            d="M 1450 365 H 1500 V 500"
            start={TUNE_AT - 28}
            dur={28}
            stroke={IND}
            width={2}
            opacity={0.55}
            endDot={false}
          />
          <DrawPath
            d="M 1450 635 H 1500 V 500"
            start={TUNE_AT - 28}
            dur={28}
            stroke={IND}
            width={2}
            opacity={0.55}
            endDot={false}
          />
          <DrawPath
            d="M 1500 500 H 1542"
            start={TUNE_AT - 8}
            dur={22}
            stroke={IND}
            width={2}
            opacity={0.62}
            endDot={false}
          />
          <ArrowHead x={1548} y={500} p={tuneFinal} />
          <circle
            cx={1500}
            cy={500}
            r={4.5 * tuneInPath}
            fill={IND}
            opacity={0.85 * tuneInPath}
          />
        </svg>

        {/* ---------------- 主文案 ---------------- */}
        <div
          style={{
            position: "absolute",
            left: 140,
            bottom: 66,
            width: 1540,
            opacity: copyIn,
            transform: `translateY(${(1 - copyIn) * 22}px)`,
          }}
        >
          <div style={{ ...TYPE.body, fontSize: 35, lineHeight: 1.62 }}>
            2018，GPT-1 与 BERT——先预训练，再微调，语言模型开始「通」。
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
            2018: pretrain, then fine-tune — language models start to generalize.
          </div>
        </div>
      </AbsoluteFill>

      <Sequence from={Math.round(T0)} durationInFrames={60}>
        <Audio src={staticFile("sfx/low-hit.wav")} volume={0.66} />
      </Sequence>
      <Sequence from={Math.round(BERT_AT)} durationInFrames={50}>
        <Audio src={staticFile("sfx/paper-drop.wav")} volume={0.5} />
      </Sequence>
    </PaperStage>
  );
};
