"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import { SeriesResponse } from "@/@types/api";
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
  const { data: result } = useSWR<SeriesResponse>(
    `/series/${query}`,
    request,
  );
  if (!result) {
    return <></>;
  }
  if (result.code === "401") {
    router.push(`/login?callback=${encodeURIComponent(location.pathname)}`);
    return <></>;
  }
  if (result.code === "404") {
    return (
      <div>
        <h2>見つかりませんでした</h2>
      </div>
    );
  }
  if (!result.data.seriesTitle) {
    return (
      <>
        <Head>
          <title>{`検索 - ${SiteName}`}</title>
        </Head>
        <Error title={"条件に合致するものが見つかりませんでした"} />
      </>
    );
  }
  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`${result.data.seriesTitle} - ${SiteName}`}</title>
      </Head>
      <div className={Styles.moviesWrapper}>
        <h1>{result.data.seriesTitle}</h1>
        <div className={Styles.moviesContainer}>
          <MovieList movies={result.data.movies} type={"column"} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
