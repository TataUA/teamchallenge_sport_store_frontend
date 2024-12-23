import Image from "next/image";

import { cn } from "@/services/utils/cn";
import FormBanerFooter from "@/components/SubscribeBannerFooter/FormBannerFooter";
import bannerMobile from "@/public/images/footer/special-proposition-mobile.jpg";
import bannerDesk from "@/public/images/footer/footerBaner628-272.jpg";

const SubscribeBannerFooter = () => {
  return (
    <section className="relative h-[396px] md:h-[469px] xl:h-[336px]">
      <div className="absolute z-[1] w-full h-full md:hidden md:relative">
        <Image
          src={bannerMobile}
          alt="image"
          quality={100}
          fill
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
      </div>
      <div className="md:hidden">
        <div className="collor-substrate absolute left-0 top-0 w-full h-full z-[5] bg-[#151515] opacity-60 "></div>
        <div
          className={cn(
            "pt-[42px] px-6 pb-[42px] min-h-[396px] relative z-[10] text-white ",
          )}
        >
          <FormBanerFooter />
        </div>
      </div>
      <div className="hidden md:block md:px-[60px] md:py-[40px] md:h-full md:w-full xl:h-[336px]  xl:px-[82px] xl:py-8 xl:bg-[#f3f3f3] ">
        <div className="flex justify-center w-full h-full space-x-6 xl:space-x-5 xl:container xl:mx-auto xl:px-[82px]">
          <div className="relative overflow-hidden rounded-2xl w-[50%] h-full xl:py-8  ">
            <div className="block xl:hidden">
              <Image
                src={bannerMobile}
                alt="image"
                quality={100}
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
            <div className="xl:block">
              <Image
                src={bannerDesk}
                alt="image"
                quality={100}
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="text-gray w-[50%] xl:pl-2 h-full font-pangram">
            <FormBanerFooter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeBannerFooter;
