import { useRouter } from "next/navigation";

import { ExitToApp } from "@/components/icons";
import { request } from "@/libraries/request";
import ButtonStyles from "@/styles/button.module.scss";

const Logout = () => {
  const router = useRouter();
  const logout = () => {
    void (async () => {
      await request("/logout/");
      router.push(`/login?callback=${encodeURIComponent(location.href)}`);
    })();
  };
  return (
    <div
      className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
      onClick={logout}
    >
      <ExitToApp />
    </div>
  );
};

export { Logout };
