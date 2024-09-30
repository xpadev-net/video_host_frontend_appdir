import type {FC} from "react";

import { SiteName } from "@/contexts/env";

import Styles from "./history.module.scss";
import {HistoryList} from "./HistoryList";

export const metadata = {
  title: `履歴 - ${SiteName}`
}

const History:FC = () => {
  return <div className={Styles.wrapper}>
    <HistoryList/>
  </div>
}

export default History;
