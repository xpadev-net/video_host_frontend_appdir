import Link from "next/link";

import { OverlaySidebar } from "./overlay-sidebar";
import Styles from "./sidebar.module.scss";
import { History, Home } from "@/components/icons";
import { useIsMobile } from "@/libraries/isMobile";
import {FC} from "react";

type Props = {
  showSidebar: boolean;
}

const Sidebar:FC<Props> = ({showSidebar}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`${Styles.wrapper} ${isMobile && Styles.mobile} ${
        !showSidebar && Styles.disable
      }`}
    >
      <div className={Styles.container}>
        <Link className={Styles.buttonWrapper} href={"/"}>
          <Home />
          <span className={Styles.text}>ホーム</span>
        </Link>
        <Link className={Styles.buttonWrapper} href={"/history"}>
          <History />
          <span className={Styles.text}>履歴</span>
        </Link>
      </div>
      <div className={Styles.spacer}></div>
      <OverlaySidebar />
    </div>
  );
};

export { Sidebar };
