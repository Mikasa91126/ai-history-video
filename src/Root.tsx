import { Composition } from "remotion";
import "./lib/fonts";
import { Film } from "./Film";
import { SceneLab } from "./SceneLab";
import { DURATION_IN_FRAMES, FPS } from "./theme";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Film"
        component={Film}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="SceneLab"
        component={SceneLab}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ scene: 1 }}
      />
    </>
  );
};
