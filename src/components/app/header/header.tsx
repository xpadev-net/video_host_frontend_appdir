import { useIsMobile } from "@/libraries/isMobile";

import { DesktopHeader } from "./desktop-header";
import { MobileHeader } from "./mobile-header";

type props = {
  className?: string;
};

const Header = ({ className }: props) => {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileHeader className={className} />;
  return <DesktopHeader className={className} />;
};

export { Header };
