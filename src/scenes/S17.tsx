/**
 * S17 · 屏息·第一处（122s–126s · 240f）｜黑场
 * 黑场中一页日历缓缓翻过，露出小小的「2022」；除此之外近乎静止。
 * 音乐在这里短暂安静，画面只保留纸与影子。
 */
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PaperStage } from "../comps/PaperStage";
import { EASE, FONTS } from "../theme";
import { mulberry32, prog } from "../lib/anim";

const PAGE_W = 560;
const PAGE_H = 720;

/** 日历网格：7 × 5 个空格，不带数字 */
const Grid = ({ ink = 0.16 }: { ink?: number }) => (
  <div
    style={{
      position: "absolute",
      left: (PAGE_W - (7 * 58 + 6 * 8)) / 2,
      top: 196,
      width: 7 * 58 + 6 * 8,
      height: 5 * 82 + 4 * 8,
    }}
  >
    {Array.from({ length: 5 }, (_, r) =>
      Array.from({ length: 7 }, (_, c) => (
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: c * (58 + 8),
            top: r * (82 + 8),
            width: 58,
            height: 82,
            border: `1px solid rgba(243,240,231,${ink})`,
            borderRadius: 3,
          }}
        />
      )),
    )}
    {/* 一个被圈住的日子，仅作图形锚点 */}
    <div
      style={{
        position: "absolute",
        left: 3 * (58 + 8) + 29 - 13,
        top: 2 * (82 + 8) + 41 - 13,
        width: 26,
        height: 26,
        borderRadius: "50%",
        border: "1.5px solid rgba(243,240,231,0.62)",
      }}
    />
  </div>
);

const PageFace = ({
  showYear = true,
  shade = 0,
}: {
  showYear?: boolean;
  shade?: number;
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: 3,
      overflow: "hidden",
      background: "linear-gradient(158deg, #26231F 0%, #1B1916 58%, #121110 100%)",
      boxShadow:
        "0 40px 90px rgba(0,0,0,0.62), inset 0 0 90px rgba(0,0,0,0.38)",
    }}
  >
    {showYear ? (
      <>
        <div
          style={{
            position: "absolute",
            top: 62,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: FONTS.mono,
            fontSize: 26,
            letterSpacing: "0.42em",
            color: "rgba(243,240,231,0.88)",
            textIndent: "0.42em",
          }}
        >
          2022
        </div>
        <div
          style={{
            position: "absolute",
            top: 124,
            left: PAGE_W / 2 - 90,
            width: 180,
            height: 1,
            backgroundColor: "rgba(243,240,231,0.22)",
          }}
        />
      </>
    ) : null}
    <Grid ink={showYear ? 0.16 : 0.13} />
    {/* 纸张边缘与压暗 */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to right, rgba(243,240,231,0.04), rgba(0,0,0,0) 9%, rgba(0,0,0,0) 91%, rgba(243,240,231,0.045))",
      }}
    />
    {shade > 0 ? (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.1))",
          opacity: shade,
        }}
      />
    ) : null}
  </div>
);

export const S17 = ({ dur }: { dur: number }) => {
  const frame = useCurrentFrame();

  /** 翻页：绕上边缘掀起，0.9 → 3.0s */
  const flip = EASE.ink(prog(frame, 88, 96));
  const angle = -176 * flip;
  const shade = Math.sin((Math.abs(angle) * Math.PI) / 180);

  const pageIn = EASE.outExpo(prog(frame, 0, 18));
  const pageOut = 1 - prog(frame, 210, 26);
  const shadowIn = Math.min(1, flip * 3) * (1 - prog(frame, 160, 26));

  return (
    <PaperStage dur={dur} tone="deep" glow={false} grain={false} creep="none">
      {/* 黑场 */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 44%, #0C0C0B 0%, #060606 62%, #030303 100%)",
        }}
      >
        {/* 桌面阴影 */}
        <div
          style={{
            position: "absolute",
            left: 960 - 460,
            top: 540 - 420,
            width: 920,
            height: 840,
            background:
              "radial-gradient(ellipse 50% 46% at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 70%)",
            opacity: pageIn * pageOut,
          }}
        />

        <div style={{ position: "absolute", inset: 0, perspective: 2200 }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: PAGE_W,
              height: PAGE_H,
              marginLeft: -PAGE_W / 2,
              marginTop: -PAGE_H / 2,
              opacity: pageIn * pageOut,
            }}
          >
            {/* 纸页厚度 */}
            {[10, 6, 3].map((off) => (
              <div
                key={off}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `translate(${off * 0.8}px, ${off}px)`,
                  backgroundColor: off === 3 ? "#3A352F" : off === 6 ? "#2A2722" : "#1D1B18",
                  borderRadius: 3,
                  opacity: 0.62 - off * 0.04,
                  boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
                }}
              />
            ))}

            {/* 底下的一页：翻过后留下「2022」 */}
            <div style={{ position: "absolute", inset: 0 }}>
              <PageFace />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  opacity: 0.25 * shadowIn,
                }}
              />
            </div>

            {/* 正在翻起的一页 */}
            {flip < 1 ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transformOrigin: "50% 0%",
                  transform: `rotateX(${angle.toFixed(2)}deg)`,
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                }}
              >
                <PageFace shade={0.42 * shade} />
              </div>
            ) : null}

            {/* 顶部装订暗线 */}
            <div
              style={{
                position: "absolute",
                left: 26,
                right: 26,
                top: 14,
                height: 2,
                backgroundColor: "rgba(243,240,231,0.16)",
                opacity: 0.6,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>

      <Sequence from={96} durationInFrames={90}>
        <Audio src={staticFile("sfx/page-flip.wav")} volume={0.75} />
      </Sequence>
    </PaperStage>
  );
};
