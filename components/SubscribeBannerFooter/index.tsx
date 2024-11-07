"use client";

// utils
import { cn } from "@/services/utils/cn";

import FormBanerFooter from "./FormBannerFooter";

import Image from "next/image";
// assets
import bannerMobile from "../../public/images/footer/special-proposition-mobile.jpg";
import bannerDesk from "../../public/images/footer/special-proposition-desk.jpg";

const SubscribeBannerFooter = () => {
  return (
    <section className="relative h-[396px] md:h-[469px]">
      <div className="absolute z-[1] w-[100%]  h-[100%] md:hidden">
        <Image
          src={bannerMobile}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="image"
          loading="lazy"
        />
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
      <div className="hidden md:block  md:p-10 md:h-full md:w-full ">
        <div className="flex justify-center w-full h-full space-x-6">
          <div className="relative overflow-hidden rounded-2xl  w-[50%] h-full  ">
            <div className="xl:hidden">
              <Image
                src={bannerMobile}
                alt="image"
                fill={true}
                objectFit="cover"
                loading="lazy"
              />
            </div>
            <div className="hidden xl:block">
              <Image
                src={bannerDesk}
                alt="image"
                fill={true}
                objectFit="cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="text-gray w-[50%]  h-full">
            <FormBanerFooter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeBannerFooter;
