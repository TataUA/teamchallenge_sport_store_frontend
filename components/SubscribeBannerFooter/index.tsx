"use client";

// utils
import { cn } from "@/services/utils/cn";

import FormBanerFooter from "./FormBannerFooter";
import ImageBannerFooter from "./ImageBannerFooter";

// assets
import bannerMobile from "../../public/images/footer/special-proposition-mobile.jpg";
import bannerDesk from "../../public/images/footer/special-proposition-desk.jpg";

const SubscribeBannerFooter = () => {
  return (
    <section className="relative h-[396px] xl:h-[469px]">
      <div className="absolute z-[1] w-[100%] h-[100%] md:hidden">
        <ImageBannerFooter img={bannerMobile} />
      </div>
      <div className="md:hidden">
        <div className=" collor-substrate absolute left-0 top-0 w-full h-full z-[5]  bg-[#151515]  opacity-60 "></div>
        <div
          className={cn(
            "pt-[42px] px-6 pb-[42px] min-h-[396px] relative z-[10] text-white ",
          )}
        >
          <FormBanerFooter />
        </div>
      </div>
    </section>
  );
};

export default SubscribeBannerFooter;
