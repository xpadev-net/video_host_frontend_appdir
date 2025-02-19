import { useState } from "react";

import { MovieItem } from "@/@types/api";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlaylistPlay,
} from "@/components/icons";
import { MovieList } from "@/components/movie-list";
import Styles from "./play-list.module.scss";

type props = {
  data: MovieItem;
  className?: string;
  maxHeight?: number;
};

const PlayList = ({ data, className, maxHeight }: props) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`${Styles.wrapper} ${className}`}
      style={{
        maxHeight: maxHeight ? `${maxHeight}px` : "none",
      }}
    >
      <div
        className={`${Styles.header} ${isOpen && Styles.open}`}
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <PlaylistPlay />
        <div className={Styles.textWrapper}>
          {data.next && !isOpen && (
            <span className={Styles.nextTitle}>次: {data.next.title}</span>
          )}
          <span className={Styles.title}>{data.movie.seriesTitle}</span>
        </div>
        {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </div>
      {isOpen && (
        <MovieList
          movies={data.playlist}
          type={"minColumn"}
          active={data.movie.url}
          className={Styles.list}
        />
      )}
    </div>
  );
};

export { PlayList };
