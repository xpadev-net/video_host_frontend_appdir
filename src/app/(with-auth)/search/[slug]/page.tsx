"use client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import { SearchResponse } from "@/@types/api";
import { Error } from "@/components/error";
import { MovieList } from "@/components/movie-list";
import { SiteName } from "@/contexts/env";
import { request } from "@/libraries/request";
import Styles from "./page.module.scss";
import {FC} from "react";

type Props = {params:{slug:string}};

const SearchPage:FC<Props> = ({params}) => {
  const router = useRouter();
  const query = params.slug;
  const { data: result } = useSWR<SearchResponse>(
    `/search/${query}`,
    request,
  );
  if (!result) {
    return <></>;
  }
  if (result.status === "fail") {
    router.push(`/login?callback=${encodeURIComponent(location.pathname)}`);
    return <></>;
  }
  if (result.data.movies.length < 1 && result.data.series.length < 1) {
    return (
      <>
        <Head>
          <title>{`検索: ${query} - ${SiteName}`}</title>
        </Head>
        <Error title={"条件に合致するものが見つかりませんでした"} />
      </>
    );
  }
  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`検索: ${query} - ${SiteName}`}</title>
      </Head>
      <div className={Styles.seriesWrapper}>
        <h1>シリーズ</h1>
        <div className={Styles.seriesContainer}>
          {result.data.series.map((series) => (
            <Link href={`/series/${series.seriesUrl}`} key={series.seriesUrl}>
              <h2 className={Styles.text}>{series.seriesTitle}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className={Styles.moviesWrapper}>
        <h1>動画</h1>
        <div className={Styles.moviesContainer}>
          <MovieList movies={result.data.movies} type={"column"} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
