"use client";
import {useAtomValue} from "jotai";
import type {FC} from "react";

import {watchedHistoryAtom} from "@/atoms/WatchedHistory";
import {MovieList} from "@/components/movie-list";

const HistoryList:FC = () => {
  const history = useAtomValue(watchedHistoryAtom);
  const historyList = Object.keys(history).map((key) => {
    return history[key].movie.movie;
  }).toReversed();
  return <MovieList movies={historyList} type={"column"} />
}

export {HistoryList};
