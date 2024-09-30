import {FC} from "react";
import {LoginForm} from "@/app/login/components/form";
import styles from "./login.module.scss";

const LoginPage:FC = () => {

  return (
    <div className={styles.wrapper}>
      <LoginForm/>
    </div>
  )
}

export default LoginPage;