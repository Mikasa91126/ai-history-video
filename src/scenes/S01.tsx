import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { FadeText } from "../comps/Text";
import { TypeIn } from "../comps/TypeIn";
import { COLORS, ERA, EASE, FONTS } from "../theme";
import { clamp01 } from "../lib/anim";

/** S01 · 序章·机器能思考吗（0:00–0:14.5 · 870f）｜档案纸
 *  打字机纸页上敲出图灵之问；末段第一块「回忆拼图」落位。BPM 63.9 → 每拍 56.25f。 */

const RULED: CSSProperties = {
  backgroundImage: `repeating-linear-gradient(180deg, transparent 0 54px, rgba(138,106,69,0.10) 54px 55px)`,
};

/** 单块拼图（右侧带一个凹口，evenodd 挖出） */
const PIECE_D =
  "M 10 4 H 86 A 6 6 0 0 1 92 10 V 38 A 12 12 0 1 0 92 62 V 86 A 6 6 0 0 1 86 92 H 10 A 6 6 0 0 1 4 86 V 10 A 6 6 0 0 1 10 4 Z";

export const S01 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();
  const k = dur / 870; // 新时长 540f，按 870f 基准等比压缩节拍

  // 拼图块落位（带一次"盖章"的压缩回弹）
  const snapStart = 620 * k;
  const snapP = EASE.outExpo(clamp01((frame - snapStart) / 26));
  const snapScale = 1 + Math.sin(clamp01((frame - snapStart) / 30) * Math.PI) * 0.06;

  const outOp = 1;

  return (
    <PaperStage dur={dur} tone="medium" glow>
      {/* 纸页（压边、横向阴影） */}
      <AbsoluteFill style={{ opacity: 0.9 }}>
        <div
          style={{
            position: "absolute",
            left: 120,
            right: 120,
            top: 70,
            bottom: 70,
            backgroundColor: COLORS.paperWhite,
            boxShadow: "0 30px 80px rgba(0,0,0,0.10)",
            borderRadius: 4,
            ...RULED,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 176,
            top: 70,
            bottom: 70,
            width: 1.5,
            backgroundColor: "rgba(198,97,63,0.22)",
          }}
        />
      </AbsoluteFill>

      <div style={{ opacity: outOp }}>
        <div style={{ position: "absolute", left: 240, top: 150 }}>
          <FadeText start={16}>
            <div style={{ ...TYPE.label, color: ERA.sepia }}>
              PROLOGUE · 1950
            </div>
          </FadeText>
        </div>

        {/* 图灵之问（打字机） */}
        <div style={{ position: "absolute", left: 300, top: 360, maxWidth: 1320 }}>
          <TypeIn
            text="机器能思考吗？"
            start={38 * k}
            cps={4.2}
            caretHold={70}
            style={{
              ...TYPE.h1cn,
              fontFamily: FONTS.serifCN,
              fontWeight: 500,
              fontSize: 132,
              letterSpacing: "0.04em",
              color: COLORS.ink,
            }}
          />
          <div style={{ marginTop: 34 }}>
            <TypeIn
              text="Can machines think?"
              start={196 * k}
              cps={13}
              caret={false}
              style={{
                fontFamily: FONTS.serifLatin,
                fontStyle: "italic",
                fontSize: 42,
                color: COLORS.graphite,
              }}
            />
          </div>
          <FadeText start={330 * k} style={{ marginTop: 40 }}>
            <div
              style={{
                fontFamily: FONTS.sansCN,
                fontSize: 32,
                color: COLORS.grey,
                letterSpacing: "0.08em",
              }}
            >
              —— 艾伦·图灵，1950
            </div>
          </FadeText>
        </div>

        {/* 齿轮暗影（极淡） */}
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0, opacity: 0.1 }}
        >
          <circle cx={1560} cy={230} r={120} fill="none" stroke={ERA.sepia} strokeWidth={2} strokeDasharray="10 14" />
          <circle cx={1560} cy={230} r={74} fill="none" stroke={ERA.sepia} strokeWidth={2} />
          <circle cx={1560} cy={230} r={10} fill={ERA.sepia} />
        </svg>

        

        {/* SFX */}
        <Sequence from={38 * k}>
          <Audio src={staticFile("sfx/key-type.wav")} />
        </Sequence>
        <Sequence from={196 * k}>
          <Audio src={staticFile("sfx/key-type.wav")} />
        </Sequence>
        <Sequence from={snapStart}>
          <Audio src={staticFile("sfx/confirm-click.wav")} />
        </Sequence>
      </div>
    </PaperStage>
  );
};
