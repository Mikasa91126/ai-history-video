/**
 * S16 · 屏息·第二处（170s–172s · 120f）｜黑场
 * 全黑两秒，只留极淡的纸纹颗粒；无文案、无音效——R1 登场前的静默。
 */
import { AbsoluteFill } from "remotion";
import { PaperStage } from "../comps/PaperStage";

const NOISE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>` +
      `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/>` +
      `<feColorMatrix type='saturate' values='0'/></filter>` +
      `<rect width='220' height='220' filter='url(#n)'/></svg>`,
  );

export const S16 = ({ dur }: { dur: number }) => (
  <PaperStage dur={dur} tone="deep" glow={false} grain={false} creep="none">
    <AbsoluteFill
      style={{
        backgroundColor: "#020202",
        background: "radial-gradient(ellipse 64% 58% at 50% 50%, #070707 0%, #030303 62%, #000000 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundRepeat: "repeat",
          opacity: 0.028,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  </PaperStage>
);
