"use client";
import { useAtomValue, useSetAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {FC, useEffect, useState} from "react";

import { MovieRes, MovieResponse, notFoundError } from "@/@types/api";
import {
  PlayerConfigAtom,
  VideoMetadataAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { MovieInfo } from "@/components/movie-info";
import { Player } from "@/components/player";
import { PlayList } from "@/components/play-list";
import { SiteName } from "@/contexts/env";
import { useIsMobile } from "@/libraries/isMobile";
import { request } from "@/libraries/request";
import Styles from "./page.module.scss";

type Props = {
  params: {
    slug: string;
  }
}

const MoviePage:FC<Props> = ({params}) => {
  const router = useRouter();
  const query = params.slug;
  const { isTheatre } = useAtomValue(PlayerConfigAtom);
  const setVideoMetadata = useSetAtom(VideoMetadataAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);
  const [playlistMaxHeight, setPlaylistMaxHeight] = useState<
    number | undefined
  >();
  const [result, setResult] = useState<MovieRes | notFoundError | undefined>();
  const isMobile = useIsMobile();
  useEffect(() => {
    void (async () => {
      setVideoMetadata((prev) => ({ ...prev, isLoading: true }));
      const result: MovieResponse = await request(
        `/movie/${encodeURIComponent(query)}`,
      );
      if (result.code === "401") {
        router.push(
          `/login?callback=${encodeURIComponent(location.pathname)}`,
        );
        return <></>;
      }
      setResult(result);
    })();
  }, [query]);
  useEffect(() => {
    if (!wrapperRef) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const wrapper = entries[0];
      if (!wrapper) return;
      setPlaylistMaxHeight(wrapper.contentRect.height);
    });
    resizeObserver.observe(wrapperRef);
    return () => {
      resizeObserver.disconnect();
    };
  }, [wrapperRef]);
  if (!result) return <></>;
  if (result.code === "404") {
    return (
      <div>
        <h2>見つかりませんでした</h2>
      </div>
    );
  }
  return (
    <div
      className={`${Styles.wrapper} ${isTheatre && Styles.theatre} ${
        isMobile && Styles.mobile
      }`}
    >
      <Head>
        <title>{`${result.data.movie.title} / ${result.data.movie.seriesTitle} - ${SiteName}`}</title>
      </Head>
      <div className={Styles.container}>
        <div className={Styles.playerWrapper}>
          <Player data={result.data} />
        </div>
        <MovieInfo className={Styles.metadata} data={result?.data} />
        <div className={Styles.playlistWrapper}>
          <PlayList
            className={Styles.playlist}
            data={result.data}
            maxHeight={playlistMaxHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
