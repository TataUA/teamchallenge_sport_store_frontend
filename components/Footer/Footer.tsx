"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

//services
import { HIDE_PAGE_PATH } from "@/services/hide-page-path.data";

//hooks
import { useIsMobile } from "@/hooks/useIsMobile";

// components
import InfoSectionFooter from "./InfoSectionFooter";

const Footer = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [shouldHideFooter, setShouldHideFooter] = useState(false);

  useEffect(() => {
    const shouldHide = HIDE_PAGE_PATH.some((page) => {
      if (typeof page.path === "function") {
        const regex = new RegExp(
          `^${page.path(".*").replace("[activation_key]", "[^/]+")}$`,
        );
        return regex.test(pathname);
      } else {
        const regex = new RegExp(`^${page.path.replace("[token]", "[^/]+")}$`);
        return regex.test(pathname);
      }
    });
    setShouldHideFooter(shouldHide);
  }, [pathname, isMobile]);

  if (shouldHideFooter && isMobile) {
    return null;
  }

  return (
    <footer>
      <div className="p-8 xl:py-0 xl:px-[60px] mt-auto max-[767px]:px-6 max-[767px]:py-5">
        <InfoSectionFooter />
      </div>
    </footer>
  );
};

export default Footer;
