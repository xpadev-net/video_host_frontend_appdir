import { useAtomValue } from "jotai";

import { PlayerStateAtom } from "@/atoms/Player";
import { TimeDisplay } from "./time-display";
import { AutoPlayButton } from "../../shared/controller/auto-play-button";
import { FullscreenButton } from "../../shared/controller/fullscreen-button";
import { PlayPauseButton } from "../../shared/controller/play-pause-button";
import { PrevNextButton } from "../../shared/controller/prev-next-button";
import { SettingButton } from "../../shared/controller/setting-button";
import { Setting } from "../../shared/setting";

import Styles from "./Controller.module.scss";
import { Slider } from "./slider";

type props = {
  className?: string;
};

const Controller = ({ className }: props) => {
  const state = useAtomValue(PlayerStateAtom);
  return (
    <div className={`${className} ${Styles.wrapper}`}>
      <div className={Styles.top}>
        <AutoPlayButton className={Styles.button} />
        <SettingButton className={Styles.button} />
      </div>
      <div className={Styles.middle}>
        <div className={Styles.buttonWrapper}>
          <PrevNextButton type={"prev"} className={Styles.button} />
        </div>
        <PlayPauseButton className={Styles.playPauseButton} />
        <div className={Styles.buttonWrapper}>
          <PrevNextButton type={"next"} className={Styles.button} />
        </div>
      </div>
      <div className={Styles.bottom}>
        <TimeDisplay />
        <Slider className={Styles.slider} />
        <FullscreenButton className={Styles.button} />
      </div>
      <Setting className={Styles.setting} />
      {state.isSetting && <div className={Styles.settingBackground} />}
    </div>
  );
};

export { Controller };
