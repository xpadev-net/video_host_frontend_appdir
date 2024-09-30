import Styles from "./header.module.scss";
import { HeaderMenu } from "../menu";

import { Logout } from "./logout";
import { Search } from "./search";

type props = {
  className?: string;
};

const DesktopHeader = ({ className }: props) => {
  return (
    <header className={`${className} ${Styles.container}`}>
      <div className={Styles.leftSideWrapper}>
        <HeaderMenu />
      </div>
      <div className={Styles.centerWrapper}>
        <Search />
      </div>
      <div className={Styles.rightSideWrapper}>
        <Logout />
      </div>
    </header>
  );
};

export { DesktopHeader };
