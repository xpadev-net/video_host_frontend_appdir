import { ReactNode} from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { useIsMobile } from "@/libraries/isMobile";

import Styles from "./app.module.scss";

type props = {
  children: ReactNode;
  showSidebar?: boolean;
};

const App = ({ children, showSidebar }: props) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Header className={Styles.header} />
      <div className={`${Styles.main} ${isMobile && Styles.mobile}`}>
        <div className={Styles.sidebar}>
          <Sidebar showSidebar={showSidebar??true} />
        </div>
        <div className={Styles.container}>{children}</div>
      </div>
    </>
  );
};

export { App };
