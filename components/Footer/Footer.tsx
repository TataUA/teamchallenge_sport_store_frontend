"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { HIDE_PAGE_PATH } from "@/services/hide-page-path.data";

import { useIsMobile } from "@/hooks/useIsMobile";
import { SubscribeBannerFooter } from "@/components/SubscribeBannerFooter";
import InfoSectionFooter from "./InfoSectionFooter";

const Footer = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [shouldHideFooter, setShouldHideFooter] = useState(false);

  useEffect(() => {
    const shouldHide = HIDE_PAGE_PATH.some((page) => {
      const pathWithTokenOrKey = page.path
        .replace("[token]", "[^/]+")
        .replace("[activation_key]", "[^/]+");

      const regex = new RegExp(`^${pathWithTokenOrKey}$`);
      return regex.test(pathname);
    });
    setShouldHideFooter(shouldHide);
  }, [pathname, isMobile]);

  if ((shouldHideFooter && isMobile) || pathname === '/order/success') {
    return null;
  }

  return (
    <footer>
      <SubscribeBannerFooter />
      <div className="font-pangram p-6 xl:py-0 xl:px-[82px] mt-auto max-[767px]:px-6 max-[767px]:py-5 xl:container xl:mx-auto">
        <InfoSectionFooter />
      </div>
    </footer>
  );
};

export default Footer;
