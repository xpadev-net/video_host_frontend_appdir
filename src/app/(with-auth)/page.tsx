"use client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";

import { recentUpdatesRes, recentUpdatesResponse } from "@/@types/api";
import { MovieList } from "@/components/movie-list";
import { SiteName } from "@/contexts/env";
import { useIsomorphicEffect } from "@/libraries/IsomorphicEffect";
import { request } from "@/libraries/request";
import Styles from "./page.module.scss";

const Index = () => {
  const router = useRouter();

  const [width, setWidth] = useState(360);
  const wrapper = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver>();
  const [updates, setUpdates] = useState<recentUpdatesRes | undefined>();
  const isomorphicEffect = useIsomorphicEffect();
  const handleResize = () => {
    const width = wrapper.current?.clientWidth || 1920;
    const cardCount = Math.floor(width / 380) + 1;
    setWidth(width / cardCount - 20);
  };
  isomorphicEffect(() => {
    if (!observer.current) observer.current = new ResizeObserver(handleResize);
    if (!wrapper.current) return;
    handleResize();
    observer.current?.observe(wrapper.current);
  }, [wrapper.current]);
  useEffect(() => {
    void (async () => {
      const data = await request<recentUpdatesResponse>("/recentUpdates/");
      if (data.status === "fail") {
        void router.push(
          `/login?callback=${encodeURIComponent(location.href)}`,
        );
        return;
      }
      setUpdates(data);
    })();
  }, []);
  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{SiteName}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div ref={wrapper} style={{ "--width": `${width}px` } as CSSProperties}>
        {updates?.data.map((update) => {
          return (
            <div key={update.seriesUrl}>
              <Link
                href={`/series/${update.seriesUrl}`}
                className={Styles.title}
              >
                {update.seriesTitle}
              </Link>
              <MovieList movies={update.movies} type={"row"} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
