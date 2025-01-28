import Image from "next/image";

import { FormBanerFooter } from "@/components/SubscribeBannerFooter/FormBannerFooter";
import bannerMobile from "@/public/images/footer/special-proposition-mobile.jpg";
import bannerDesk from "@/public/images/footer/footerBaner628-272.jpg";

export const SubscribeBannerFooter = () => {
  return (
    <section className="relative h-[396px] xl:h-[336px]">
      <div className="absolute z-[1] xl:hidden w-full h-full">
        <Image
          src={bannerMobile}
          alt="Хлопець та дівчина в спортивному одязі"
          quality={100}
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div className="absolute left-0 top-0 z-[5] w-full h-full collor-substrate bg-[#151515] opacity-60 "></div>
        <div className="relative z-[10] px-6 py-4 370:py-[42px]">
          <FormBanerFooter />
        </div>
      </div>

      <div className="hidden xl:block w-full h-full xl:bg-[#f3f3f3] ">
        <div className="flex gap-5 w-full h-full xl:container xl:px-[82px]">
          <div className="py-8">
            <Image
              src={bannerDesk}
              alt="Хлопець та дівчина в спортивному одязі"
              width={628}
              height={272}
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="py-12">
            <FormBanerFooter />
          </div>
        </div>
      </div>
    </section>
  );
};
