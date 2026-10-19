import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { TYPE } from "../comps/type";
import { CharReveal, FadeText } from "../comps/Text";
import { Chip } from "../comps/ui";
import { COLORS, ERA, EASE, FONTS } from "../theme";
import { clamp01 } from "../lib/anim";

/** S17 · DeepSeek R1（2:52–3:04 · 720f）｜天空蓝
 *  「纯强化学习长出推理」的思考链逐拍生长；开放权重 + 低成本。 */

const BEAT = 56.25;
const STEPS = [
  { cn: "问题", en: "PROMPT" },
  { cn: "思考", en: "THINK · 推理链" },
  { cn: "自我验证", en: "CHECK" },
  { cn: "答案", en: "ANSWER" },
];

export const S17 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  const stepP = (i: number) =>
    EASE.outExpo(clamp01((frame - (56 + i * BEAT)) / 26));

  const outOp = 1 - clamp01((frame - (dur - 16)) / 16);

  return (
    <PaperStage dur={dur} tone="medium" glow>
      <div style={{ opacity: outOp }}>
        <div style={{ position: "absolute", left: 140, top: 96 }}>
          <FadeText start={10}>
            <div style={{ ...TYPE.label, color: ERA.sky }}>
              开源与推理 · 2025.01.20
            </div>
          </FadeText>
        </div>

        {/* 左：标题 */}
        <div style={{ position: "absolute", left: 140, top: 250, maxWidth: 900 }}>
          <CharReveal
            text="DeepSeek R1"
            start={30}
            staggerFrames={3}
            charFrames={34}
            style={{
              fontFamily: FONTS.serifLatin,
              fontWeight: 600,
              fontSize: 104,
              letterSpacing: "-0.01em",
              color: COLORS.ink,
            }}
          />
          <FadeText start={120} style={{ marginTop: 30 }}>
            <div style={{ ...TYPE.h2cn, fontSize: 54 }}>纯强化学习长出的推理</div>
          </FadeText>
          <FadeText start={168} style={{ marginTop: 14 }}>
            <div style={{ ...TYPE.en, fontStyle: "italic", fontSize: 32 }}>
              Reasoning grown from pure reinforcement learning.
            </div>
          </FadeText>
          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            <FadeText start={330}>
              <Chip style={{ borderColor: "rgba(106,155,204,0.55)", color: ERA.sky }}>
                开放权重
              </Chip>
            </FadeText>
            <FadeText start={352}>
              <Chip style={{ borderColor: "rgba(106,155,204,0.55)", color: ERA.sky }}>
                可本地部署
              </Chip>
            </FadeText>
            <FadeText start={374}>
              <Chip style={{ borderColor: "rgba(106,155,204,0.55)", color: ERA.sky }}>
                低成本
              </Chip>
            </FadeText>
          </div>
        </div>

        {/* 右：思考链（逐拍生长） */}
        <div style={{ position: "absolute", right: 150, top: 190, width: 620 }}>
          {STEPS.map((s, i) => {
            const p = stepP(i);
            if (p <= 0) return null;
            return (
              <div key={s.cn} style={{ display: "flex", alignItems: "flex-start", gap: 22 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 30,
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      backgroundColor: i === 3 ? COLORS.clay : ERA.sky,
                      border: `1.5px solid ${i === 3 ? COLORS.clay : ERA.sky}`,
                      transform: `scale(${0.7 + 0.3 * p})`,
                      opacity: 0.85 * p + 0.15,
                    }}
                  />
                  {i < STEPS.length - 1 ? (
                    <div
                      style={{
                        width: 1.5,
                        height: 84 * stepP(i + 1),
                        backgroundColor: ERA.sky,
                        opacity: 0.4,
                      }}
                    />
                  ) : null}
                </div>
                <div style={{ paddingBottom: 44, opacity: p }}>
                  <div
                    style={{
                      fontFamily: FONTS.sansCN,
                      fontSize: 30,
                      color: COLORS.ink,
                      transform: `translateY(${(1 - p) * 10}px)`,
                    }}
                  >
                    {s.cn}
                    <span
                      style={{
                        marginLeft: 12,
                        fontFamily: FONTS.mono,
                        fontSize: 17,
                        letterSpacing: "0.14em",
                        color: COLORS.grey,
                      }}
                    >
                      {s.en}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
                    {[0.86, 0.72, 0.55].map((w, j) => (
                      <div
                        key={j}
                        style={{
                          width: 360 * w * p,
                          height: 3,
                          borderRadius: 2,
                          backgroundColor:
                            i === 3 ? "rgba(217,119,87,0.75)" : "rgba(70,91,130,0.35)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <AbsoluteFill style={{ opacity: 0.06 }}>
          <div
            style={{
              position: "absolute",
              left: 120,
              right: 120,
              bottom: 120,
              height: 1,
              backgroundColor: ERA.sky,
            }}
          />
        </AbsoluteFill>

        {/* SFX */}
        {STEPS.map((_, i) => (
          <Sequence key={i} from={56 + i * BEAT}>
            <Audio src={staticFile("sfx/ui-ping.wav")} />
          </Sequence>
        ))}
      </div>
    </PaperStage>
  );
};
