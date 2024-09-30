"use client";
import { useEffect, useRef, useState } from "react";

import Styles from "./header.module.scss";
import { Logout } from "./logout";
import { Search } from "./search";
import { HeaderMenu } from "../menu";
import { ArrowBack, Search as SearchIcon } from "@/components/icons";
import ButtonStyles from "@/styles/button.module.scss";

type props = {
  className?: string;
};

const MobileHeader = ({ className }: props) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsInputActive(false);
  }, [location.href]);

  const onSearchButtonClick = () => {
    setIsInputActive(true);
    inputRef.current?.focus();
  };

  const closeSearch = () => setIsInputActive(false);

  return (
    <header className={`${className} ${Styles.container}`}>
      <div className={Styles.leftSideWrapper}>
        <HeaderMenu />
      </div>
      <div className={Styles.rightSideWrapper}>
        <div
          className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
          onClick={onSearchButtonClick}
        >
          <SearchIcon />
        </div>
        <Logout />
      </div>
      <div
        className={`${Styles.inputWrapper} ${isInputActive && Styles.active}`}
      >
        <div
          className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
          onClick={closeSearch}
        >
          <ArrowBack />
        </div>
        <Search className={Styles.input} ref={inputRef} />
        <div className={Styles.background} onClick={closeSearch} />
      </div>
    </header>
  );
};

export { MobileHeader };
