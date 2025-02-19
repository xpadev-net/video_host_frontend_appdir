import { Options } from "@xpadev-net/niconicomments";
import { useAtom, useSetAtom } from "jotai";
import { FC, useEffect, useRef } from "react";

import {
  NiconicommentsConfigAtom,
  PlayerConfigAtom,
  PlayerSettingAtom,
} from "@/atoms/Player";
import {
  ChatBubble,
  Filter9,
  KeyboardArrowLeft,
  PictureInPictureAlt,
  SelectAll,
  SixtyFpsSelect,
} from "@/components/icons";
import { MenuProps } from "../";
import { Switch } from "@/components/switch";

import Styles from "./pages.module.scss";

const Comments: FC<MenuProps> = ({ className, updateScale }) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const [niconicommentsConfig, setNiconicommentsConfig] = useAtom(
    NiconicommentsConfigAtom,
  );
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    updateScale?.(ref.current);
  }, [updateScale]);

  const backToMain = () => {
    setPlayerSetting((prev) => prev.filter((page) => page !== "comments"));
  };

  const toggleCommentActive = () => {
    setPlayerConfig((prev) => ({
      ...prev,
      isNiconicommentsEnable: !prev.isNiconicommentsEnable,
    }));
  };

  const toggleNiconicommentsConfig = (key: keyof Options) => {
    setNiconicommentsConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const togglePipEnable = () => {
    setPlayerConfig((prev) => ({
      ...prev,
      isPipEnable: !prev.isPipEnable,
    }));
  };

  return (
    <div className={`${Styles.wrapper} ${className}`} ref={ref}>
      <div className={`${Styles.item} ${Styles.header}`} onClick={backToMain}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <KeyboardArrowLeft />
          </div>
          <span className={Styles.text}>コメント</span>
        </div>
      </div>
      <div className={Styles.item} onClick={toggleCommentActive}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <ChatBubble />
          </div>
          <span className={Styles.text}>コメント</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.isNiconicommentsEnable} />
          </div>
        </div>
      </div>
      <div
        className={Styles.item}
        onClick={() => toggleNiconicommentsConfig("showFPS")}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <SixtyFpsSelect />
          </div>
          <span className={Styles.text}>FPS表示</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={!!niconicommentsConfig.showFPS} />
          </div>
        </div>
      </div>
      <div
        className={Styles.item}
        onClick={() => toggleNiconicommentsConfig("showCollision")}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <SelectAll />
          </div>
          <span className={Styles.text}>当たり判定表示</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={!!niconicommentsConfig.showCollision} />
          </div>
        </div>
      </div>
      <div
        className={Styles.item}
        onClick={() => toggleNiconicommentsConfig("showCommentCount")}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <Filter9 />
          </div>
          <span className={Styles.text}>コメント数表示</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={!!niconicommentsConfig.showCommentCount} />
          </div>
        </div>
      </div>
      <div className={Styles.item} onClick={togglePipEnable}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <PictureInPictureAlt />
          </div>
          <span className={Styles.text}>PiP</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.isPipEnable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Comments };
