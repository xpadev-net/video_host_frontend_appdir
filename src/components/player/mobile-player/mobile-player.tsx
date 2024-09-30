import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import { LoadingIcon } from "@/components/icons/LoadingIcon";
import {
  MovieItemAtom,
  PlayerConfigAtom,
  PlayerStateAtom,
  VideoRefAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { Controller } from "./controller";
import Styles from "./mobile-player.module.scss";
import { CommentCanvas } from "../shared/comment-canvas";
import { KeyboardHandler } from "../shared/keyboard-handler";
import { MediaSessionHandler } from "../shared/media-session-handler";
import { Video } from "../shared/video";
import { ApiEndpoint, EnableComments } from "@/contexts/env";

type props = {
  className?: string;
};

const MobilePlayer = ({ className }: props) => {
  const data = useAtomValue(MovieItemAtom);
  const { isLoading, isFullscreen } = useAtomValue(PlayerStateAtom);
  const { isNiconicommentsEnable } = useAtomValue(PlayerConfigAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const setVideoAtom = useSetAtom(VideoRefAtom);
  const setWrapperAtom = useSetAtom(WrapperRefAtom);
  const [isAfk, setIsAfk] = useState(false);
  const afkTimeout = useRef(-1);

  useEffect(() => {
    setIsAfk(false);
    clearTimeout(afkTimeout.current);
    afkTimeout.current = window.setTimeout(() => {
      setIsAfk(true);
    }, 3000);
    return () => {
      clearTimeout(afkTimeout.current);
    };
  }, []);

  const toggleAfk = () => {
    setIsAfk((pv) => !pv);
  };

  useEffect(() => {
    setVideoAtom(videoRef.current);
    setWrapperAtom(wrapperRef.current);
  }, [videoRef, wrapperRef]);

  return (
    <div
      className={`${className} ${Styles.wrapper} ${isAfk && Styles.inactive} ${
        isFullscreen && Styles.fullscreen
      }`}
      onClick={toggleAfk}
      ref={wrapperRef}
    >
      <div className={Styles.videoWrapper}>
        {isLoading && data && (
          <>
            <div className={Styles.loadingWrapper}>
              <LoadingIcon className={Styles.icon} />
            </div>
            <img
              src={`${ApiEndpoint}/img/${data.movie.url}`}
              alt={""}
              className={Styles.thumbnail}
            />
          </>
        )}
        {isNiconicommentsEnable && EnableComments && (
          <CommentCanvas
            key={data?.movie.url}
            url={data?.movie.url}
            className={Styles.canvas}
            videoRef={videoRef.current}
            pipVideoRef={null}
          />
        )}
        <Video className={Styles.video} videoRef={videoRef} movie={data} />
      </div>
      <Controller className={Styles.controller} />
      <KeyboardHandler />
      <MediaSessionHandler />
    </div>
  );
};

export { MobilePlayer };
